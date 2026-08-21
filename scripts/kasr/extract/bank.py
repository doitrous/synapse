#!/usr/bin/env python3
"""Deduplicate mcq.json into a question bank + write the human report.

Same question  = same normalised stem AND same normalised option SET.
Same stem, different options = a VARIANT, kept on the row, never collapsed.
Different answers for the same question = CONFLICT, never silently resolved.
Answers are compared by option TEXT, not by letter, so a reordered option list
does not fake a conflict.
"""
import json, os, re, hashlib, collections
import leaves

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "mcq.json")
BANK = os.path.join(HERE, "mcq-bank.json")
REPORT = os.path.join(HERE, "mcq-report.md")
RANK = {"high": 3, "medium": 2, "low": 1}


def norm(s):
    s = re.sub(r"[^a-z0-9 ]", " ", (s or "").lower())
    return re.sub(r"\s+", " ", s).strip()


def sig(options):
    return "|".join(sorted(norm(v) for v in options.values() if norm(v)))


def slug(stem, salt):
    base = re.sub(r"[^a-z0-9]+", "-", norm(stem))[:60].strip("-")
    return f"{base or 'q'}-{hashlib.sha1((norm(stem)+salt).encode()).hexdigest()[:8]}"


def blank_kind(row, ocr_files):
    """Is an option-less row a real fill-in-the-blank, or an OCR failure?"""
    if re.search(r"\.{3,}|…|_{3,}|…", row["stem"]):
        return "fill-in-the-blank"
    if row["file"] in ocr_files or row["ocrNoise"]:
        return "ocr-failure"
    if len(row["stem"]) < 25:
        return "ocr-failure"
    return "short-answer-or-unparsed"


def main():
    with open(SRC, encoding="utf-8") as fh:
        doc = json.load(fh)
    ocr_files = {f["file"] for f in doc["files"] if f["method"] == "ocr"}

    mcqs = [q for q in doc["questions"] if q["questionType"] == "mcq"]
    noopt = [q for q in doc["questions"] if q["questionType"] != "mcq"]
    blanks = collections.Counter(blank_kind(q, ocr_files) for q in noopt)

    # group: normalised stem -> option-signature -> rows
    stems = collections.defaultdict(lambda: collections.defaultdict(list))
    for q in mcqs:
        n = norm(q["stem"])
        if not n:
            continue
        stems[n][sig(q["options"])].append(q)

    bank = []
    conflicts = []
    for nstem, groups in stems.items():
        # dominant option set = the canonical question; the rest are variants
        ordered = sorted(groups.items(), key=lambda kv: (-len(kv[1]), kv[0]))
        main_sig, rows = ordered[0]
        variants = []
        for other_sig, orows in ordered[1:]:
            r = orows[0]
            opts = " ".join(f"{k}) {v}" for k, v in sorted(r["options"].items()))
            variants.append(f"[{r['file']} p{r['page']} #{r['number']}] {r['stem']} :: {opts}")

        rep = sorted(rows, key=lambda r: (RANK[r["confidence"]], not r["ocrNoise"],
                                          len(r["options"]), len(r["stem"])))[-1]

        # answers compared by option text, not by letter
        seen = {}
        for r in rows:
            a = r.get("answer")
            if not a:
                continue
            text = norm(r["options"].get(a, "")) or f"letter:{a}"
            seen.setdefault(text, []).append(r)

        answer = None
        conflicting = None
        if len(seen) == 1:
            text = next(iter(seen))
            src = seen[text]
            for letter, val in rep["options"].items():
                if norm(val) == text:
                    answer = letter
                    break
            if answer is None and text.startswith("letter:"):
                answer = text.split(":")[1]
            conf = "keyed" if any(r["answerSource"] == "answer-key" for r in src) else "same-file"
        elif len(seen) > 1:
            conf = "conflicting"
            conflicting = []
            for text, rs in seen.items():
                for r in rs:
                    conflicting.append({"answer": r["answer"],
                                        "answerText": r["options"].get(r["answer"], ""),
                                        "file": r["file"], "page": r["page"],
                                        "number": r["number"], "answerSource": r["answerSource"]})
        else:
            conf = "none"

        topics = collections.Counter(r["topic"] for r in rows if r["topic"] != "unknown")
        subj, chap, leaf = leaves.classify(rep["stem"] + " " + " ".join(rep["options"].values()))

        row = {
            "key": slug(rep["stem"], main_sig),
            "stem": rep["stem"],
            "options": rep["options"],
            "answer": answer,
            "answerConfidence": conf,
            "occurrences": [{"sourceId": r["sourceId"], "file": r["file"],
                             "page": r["page"], "number": r["number"]} for r in rows],
            "timesAsked": len(rows),
            "topic": topics.most_common(1)[0][0] if topics else "unknown",
            "confidence": max((r["confidence"] for r in rows), key=lambda c: RANK[c]),
            "variants": variants,
            "subject": subj, "chapter": chap, "leaf": leaf,
        }
        if conflicting:
            row["conflictingAnswers"] = conflicting
            conflicts.append(row)
        bank.append(row)

    bank.sort(key=lambda r: (-r["timesAsked"], r["key"]))
    out = {
        "generatedFrom": "scripts/kasr/extract/mcq.json (Kasr Al Ainy 101 ISK instructor material)",
        "distinctQuestions": len(bank),
        "fromRows": len(mcqs),
        "duplicateRowsCollapsed": len(mcqs) - len(bank),
        "answerConflicts": len(conflicts),
        "withAnswer": sum(1 for r in bank if r["answer"]),
        "excludedNoOptionRows": {"total": len(noopt), **dict(blanks)},
        "questions": bank,
    }
    with open(BANK, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)
    print(f"bank: {len(bank)} distinct from {len(mcqs)} rows; conflicts={len(conflicts)}")
    write_report(doc, out, bank, conflicts, blanks, noopt)


def write_report(doc, out, bank, conflicts, blanks, noopt):
    # overlap between files
    filecount = collections.Counter()
    uniq = collections.Counter()
    pair = collections.Counter()
    for r in bank:
        fs = sorted({o["file"] for o in r["occurrences"]})
        for f in fs:
            filecount[f] += 1
        if len(fs) == 1:
            uniq[fs[0]] += 1
        for i, a in enumerate(fs):
            for b in fs[i + 1:]:
                pair[(a, b)] += 1

    leafc = collections.Counter((r["subject"], r["chapter"], r["leaf"]) for r in bank)

    L = []
    L.append("# Module 101 ISK — MCQ bank report\n")
    L.append("Generated by `scripts/kasr/extract/bank.py` from `mcq.json`. "
             "Transcription only — no question content was authored or completed.\n")
    L.append("## Totals\n")
    L.append(f"- **{out['distinctQuestions']} distinct questions** from {out['fromRows']} extracted MCQ rows "
             f"({out['duplicateRowsCollapsed']} duplicate rows collapsed).")
    L.append(f"- {out['withAnswer']} carry an answer; **{out['answerConflicts']} have conflicting answers** across sources.")
    L.append(f"- {sum(len(r['variants']) for r in bank)} option-set variants preserved on their parent question.")
    L.append(f"- {out['excludedNoOptionRows']['total']} option-less rows excluded from the bank: " +
             ", ".join(f"{v} {k}" for k, v in blanks.most_common()) + ".\n")

    L.append("## Duplication by file\n")
    L.append("| File | Distinct questions | Unique to this file | Shared |")
    L.append("|---|---:|---:|---:|")
    for f, c in filecount.most_common():
        L.append(f"| {f} | {c} | {uniq[f]} | {c - uniq[f]} |")
    L.append("\n### Most overlapping pairs\n")
    L.append("| File A | File B | Shared questions |")
    L.append("|---|---|---:|")
    for (a, b), c in pair.most_common(15):
        L.append(f"| {a} | {b} | {c} |")

    L.append("\n## Answer conflicts\n")
    if not conflicts:
        L.append("None.")
    else:
        L.append("Each of these is asked in more than one book with a **different correct answer**. "
                 "They are left unresolved (`answerConfidence: \"conflicting\"`) and need a human ruling.\n")
        for r in conflicts:
            L.append(f"- **{r['key']}** — {r['stem'][:110]}")
            for c in r["conflictingAnswers"]:
                L.append(f"    - `{c['answer']}` ({c['answerText'][:50]}) — {c['file']} p{c['page']} #{c['number']} [{c['answerSource']}]")

    L.append("\n## Coverage against the subject tree\n")
    L.append("Leaf assignment is keyword-based against "
             "`docs/Kasr-Source-Imports/academic/101-isk-structure.md` and is approximate.\n")
    L.append("| Subject | Chapter | Leaf | Questions |")
    L.append("|---|---|---|---:|")
    for subj, chap, leaf, _k in leaves.TREE:
        L.append(f"| {subj} | {chap} | {leaf} | {leafc.get((subj, chap, leaf), 0)} |")
    un = leafc.get((None, None, None), 0)
    L.append(f"| — | unmapped | (no keyword matched) | {un} |")

    thin = [(s, c, l, leafc.get((s, c, l), 0)) for s, c, l, _ in leaves.TREE if leafc.get((s, c, l), 0) < 15]
    L.append("\n### Thin leaves (fewer than 15 questions)\n")
    for s, c, l, n in sorted(thin, key=lambda x: x[3]):
        L.append(f"- **{n}** — {s} › {c} › {l}")

    with open(REPORT, "w", encoding="utf-8") as fh:
        fh.write("\n".join(L) + "\n")
    print("report written")


if __name__ == "__main__":
    main()
