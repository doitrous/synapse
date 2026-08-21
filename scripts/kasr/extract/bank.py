#!/usr/bin/env python3
"""Deduplicate mcq.json into a question bank + write the human report.

    python3 scripts/kasr/extract/bank.py [--module "104 CPS"]

Same question  = same normalised stem AND same normalised option SET.
Same stem, different options = a VARIANT, kept on the row, never collapsed.
Different answers for the same question = CONFLICT, never silently resolved.
Answers are compared by option TEXT, not by letter, so a reordered option list
does not fake a conflict.

Matching blocks are not MCQs and are not deduplicated against them: they carry a
prompt column and an option bank with spare options, and collapsing them by
"stem plus option set" would compare two things that have neither. They are
carried through to the bank whole, in `matching`.
"""
import json, os, re, sys, hashlib, collections
import leaves
from kasr_module import DEFAULT_MODULE, out_path, parse_module

MODULE = DEFAULT_MODULE
SRC = out_path(MODULE, "mcq.json")
BANK = out_path(MODULE, "mcq-bank.json")
REPORT = out_path(MODULE, "mcq-report.md")
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


def main(argv=()):
    global MODULE, SRC, BANK, REPORT
    MODULE, rest = parse_module(list(argv))
    if rest:
        raise SystemExit("unexpected arguments: %s" % " ".join(rest))
    SRC = out_path(MODULE, "mcq.json")
    BANK = out_path(MODULE, "mcq-bank.json")
    REPORT = out_path(MODULE, "mcq-report.md")
    # The leaf table is per-module for the same reason the source categories
    # are. Left on 101's, every 104 stem scores zero against upper limb and
    # cytology and the coverage table reads as an empty corpus.
    leaves.use(MODULE)

    with open(SRC, encoding="utf-8") as fh:
        doc = json.load(fh)
    ocr_files = {f["file"] for f in doc["files"] if f["method"] == "ocr"}

    # Rows from a file that is not a question book. mcq.py keeps them so the
    # file does not read as unopened; they are not questions, so they are not
    # banked. Counted and named in the report rather than dropped in silence.
    prose = [q for q in doc["questions"] if q.get("notAQuestionBook")]
    rows = [q for q in doc["questions"] if not q.get("notAQuestionBook")]

    matching = [q for q in rows if q["questionType"] == "matching"]
    mcqs = [q for q in rows if q["questionType"] == "mcq"]
    noopt = [q for q in rows if q["questionType"] not in ("mcq", "matching")]
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
            # Where the answer came from, kept distinct because the reader's
            # trust in it differs. An answer read off a pen ring on a scan is
            # not an answer the paper printed, and a bank that called both
            # "same-file" would hide that from every reviewer downstream.
            asrcs = {r["answerSource"] for r in src}
            if "answer-key" in asrcs:
                conf = "keyed"
            elif asrcs == {"handwritten-recovered"}:
                conf = "handwritten-recovered"
            elif "handwritten-recovered" in asrcs:
                conf = "printed-and-handwritten-agree"
            else:
                conf = "same-file"
            hand = [r for r in src if r.get("handwrittenAnswer")]
        elif len(seen) > 1:
            conf = "conflicting"
            hand = [r for r in rows if r.get("handwrittenAnswer")]
            conflicting = []
            for text, rs in seen.items():
                for r in rs:
                    conflicting.append({"answer": r["answer"],
                                        "answerText": r["options"].get(r["answer"], ""),
                                        "file": r["file"], "page": r["page"],
                                        "number": r["number"], "answerSource": r["answerSource"]})
        else:
            conf = "none"
            hand = []

        topics = collections.Counter(r["topic"] for r in rows if r["topic"] != "unknown")
        subj, chap, leaf = leaves.classify(rep["stem"] + " " + " ".join(rep["options"].values()),
                                           MODULE)

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
        if hand:
            # The reader's own confidence in the mark, worst case across the
            # copies that carry it: one question in the 2023 EOM has a bold ring
            # on one option and a fainter mark near another, and it must not
            # read as certainly as the other 119.
            row["handwrittenConfidence"] = min(
                (r["handwrittenConfidence"] for r in hand), key=lambda c: RANK[c])
            row["handwrittenReadFrom"] = [
                {"file": r["file"], "page": r["page"], "number": r["number"],
                 "answer": r["handwrittenAnswer"], "markForm": r["handwrittenMarkForm"],
                 "confidence": r["handwrittenConfidence"]} for r in hand]
        if conflicting:
            row["conflictingAnswers"] = conflicting
            conflicts.append(row)
        bank.append(row)

    bank.sort(key=lambda r: (-r["timesAsked"], r["key"]))
    match_bank = build_matching(matching)
    excluded_files = collections.Counter(q["file"] for q in prose)
    out = {
        "generatedFrom": "%s (Kasr Al Ainy %s, %s)"
                         % (os.path.relpath(SRC, os.path.dirname(os.path.abspath(__file__))),
                            MODULE, " + ".join(doc.get("sourceCategories", []))),
        "module": MODULE,
        "distinctQuestions": len(bank),
        "fromRows": len(mcqs),
        "duplicateRowsCollapsed": len(mcqs) - len(bank),
        "answerConflicts": len(conflicts),
        "withAnswer": sum(1 for r in bank if r["answer"]),
        "withHandwrittenRecoveredAnswer":
            sum(1 for r in bank if r["answerConfidence"] == "handwritten-recovered"),
        "handwrittenAnswersNotHighConfidence":
            sum(1 for r in bank
                if r.get("handwrittenConfidence") and r["handwrittenConfidence"] != "high"),
        "excludedNoOptionRows": {"total": len(noopt), **dict(blanks)},
        "excludedNotQuestionBooks": {"total": len(prose), **dict(excluded_files)},
        "distinctMatchingBlocks": len(match_bank),
        "questions": bank,
        "matching": match_bank,
    }
    with open(BANK, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)
    print(f"bank: {len(bank)} distinct from {len(mcqs)} rows; conflicts={len(conflicts)}; "
          f"matching={len(match_bank)} distinct from {len(matching)}")
    write_report(doc, out, bank, conflicts, blanks, noopt, match_bank, prose)


def build_matching(rows):
    """Collapse matching blocks that print the same prompt column.

    The 2023 and undated editions of each department paper set the same tables,
    so the same block arrives twice; they are the same question and are merged
    on their prompt column. The option bank is taken from whichever copy reads
    the most options, because a copy that lost one lost a distractor.
    """
    groups = collections.defaultdict(list)
    for r in rows:
        groups["|".join(sorted(norm(p["text"]) for p in r["matchingPrompts"]))].append(r)
    out = []
    for key, rs in groups.items():
        rep = max(rs, key=lambda r: (len(r["matchingOptions"]), len(r["matchingPrompts"])))
        subj, chap, leaf = leaves.classify(
            " ".join(p["text"] for p in rep["matchingPrompts"]) + " " +
            " ".join(rep["matchingOptions"].values()), MODULE)
        out.append({
            "key": slug(rep["stem"] + key, key),
            "stem": rep["stem"],
            "matchingPrompts": rep["matchingPrompts"],
            "matchingOptions": rep["matchingOptions"],
            "distractorOptions": rep["distractorOptions"],
            "occurrences": [{"sourceId": r["sourceId"], "file": r["file"],
                             "page": r["page"], "printedTableLabel": r.get("printedTableLabel")}
                            for r in rs],
            "timesAsked": len(rs),
            "topic": rep["topic"],
            "confidence": rep["confidence"],
            # No block in this corpus has a readable pairing: every one of these
            # papers prints its key as a grid on the answers page and every one
            # of those grids came back from OCR as broken table rules. Left
            # unanswered rather than guessed.
            "answer": None, "answerConfidence": "none",
            "subject": subj, "chapter": chap, "leaf": leaf,
        })
    out.sort(key=lambda r: (-r["timesAsked"], r["key"]))
    return out


def write_report(doc, out, bank, conflicts, blanks, noopt, match_bank=(), prose=()):
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
    L.append("# Module %s — MCQ bank report\n" % MODULE)
    L.append("Generated by `scripts/kasr/extract/bank.py` from `mcq.json`. "
             "Transcription only — no question content was authored or completed.\n")
    L.append("## Totals\n")
    L.append(f"- **{out['distinctQuestions']} distinct questions** from {out['fromRows']} extracted MCQ rows "
             f"({out['duplicateRowsCollapsed']} duplicate rows collapsed).")
    L.append(f"- {out['withAnswer']} carry an answer; **{out['answerConflicts']} have conflicting answers** across sources.")
    # An answer someone read off a pen mark is not an answer the paper printed,
    # and the totals line above cannot tell them apart. Named here so a reviewer
    # knows how many of the answers rest on a person's reading of a scan.
    recovered = out.get('withHandwrittenRecoveredAnswer') or 0
    if recovered:
        nothigh = out.get('handwrittenAnswersNotHighConfidence') or 0
        L.append(f"- {recovered} of those answers exist only as **handwritten pen marks** on a scanned "
                 "paper, read off the rendered page by eye — there is no text layer to parse them from. "
                 "They carry `answerConfidence: handwritten-recovered` and a `handwrittenReadFrom` "
                 "record naming the file, page, question number and the form of the mark. "
                 + (f"{nothigh} of them is not high confidence and says so on the row."
                    if nothigh else
                    "Every one of them was read at high confidence."))
    L.append(f"- {sum(len(r['variants']) for r in bank)} option-set variants preserved on their parent question.")
    L.append(f"- {out['excludedNoOptionRows']['total']} option-less rows excluded from the bank: " +
             ", ".join(f"{v} {k}" for k, v in blanks.most_common()) + ".")
    if match_bank:
        L.append(f"- **{len(match_bank)} distinct matching blocks** kept whole, with "
                 f"{sum(r['distractorOptions'] for r in match_bank)} distractor options preserved. "
                 "None carries an answer: every one of these papers prints its pairing as a grid "
                 "on the answers page, and every one of those grids came back from OCR as broken "
                 "table rules.")
    if prose:
        L.append(f"- {len(prose)} rows excluded as **not from a question book** — see below.")
    L.append("")

    L.append("## Every file the module offered\n")
    L.append("A file that was opened and yielded nothing is listed here with a zero, so it "
             "cannot be mistaken for a file nobody opened.\n")
    L.append("| File | Method | Pages read | Rows | MCQ | Matching | Option-less | With answer |")
    L.append("|---|---|---:|---:|---:|---:|---:|---:|")
    for f in sorted(doc["files"], key=lambda f: -f.get("mcqRows", 0)):
        note = " *(not a question book)*" if f.get("notAQuestionBook") else ""
        L.append("| %s%s | %s | %s | %s | %s | %s | %s | %s |"
                 % (f["file"], note, f.get("method", "?"), f.get("pagesRead", 0),
                    f.get("extracted", 0), f.get("mcqRows", 0), f.get("matchingRows", 0),
                    f.get("noOptionRows", 0), f.get("withAnswer", 0)))
    thin_files = [f for f in doc["files"] if f.get("yieldNote")]
    if thin_files:
        L.append("\n### Files that were opened and yielded little\n")
        L.append("Read, and this is what was in them.\n")
        for f in thin_files:
            L.append(f"- **{f['file']}** ({f.get('pagesRead', 0)} pages read, "
                     f"{f.get('mcqRows', 0)} MCQ rows) — {f['yieldNote']}")

    if prose:
        L.append("\n### Excluded as not a question book\n")
        L.append("Each was opened and its whole text searched for a question-paper heading; none "
                 "has one. What the parser found in them is numbered prose with the shape of an "
                 "MCQ and none of the substance, so the rows stay in `mcq.json`, flagged, and out "
                 "of the bank.\n")
        for f in doc["files"]:
            if f.get("notAQuestionBook"):
                L.append(f"- **{f['file']}** — {f['notAQuestionBook']} "
                         f"({f.get('extracted', 0)} rows, {f.get('mcqRows', 0)} of them "
                         "option-bearing, none a question).")
    L.append("")

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

    if match_bank:
        L.append("\n## Matching blocks\n")
        L.append("Kept as `matching` with their prompt column and their whole option bank, "
                 "including the options nothing matches — those spare options are what the "
                 "block tests, and flattening the block into prose loses them.\n")
        L.append("| Block | Prompts | Options | Distractors | Printed in |")
        L.append("|---|---:|---:|---:|---|")
        for r in match_bank:
            where = ", ".join(sorted({o["file"] for o in r["occurrences"]}))
            L.append(f"| {r['stem']} — {r['matchingPrompts'][0]['text'][:40]}… | "
                     f"{len(r['matchingPrompts'])} | {len(r['matchingOptions'])} | "
                     f"{r['distractorOptions']} | {where} |")

    L.append("\n## Coverage against the subject tree\n")
    L.append("Leaf assignment is keyword-based against "
             "`docs/Kasr-Source-Imports/academic/%s-structure.md` and is approximate.\n"
             % MODULE.lower().replace(" ", "-"))
    L.append("| Subject | Chapter | Leaf | Questions |")
    L.append("|---|---|---|---:|")
    for subj, chap, leaf, _k in leaves.TREE:
        L.append(f"| {subj} | {chap} | {leaf or '—'} | {leafc.get((subj, chap, leaf), 0)} |")
    un = leafc.get((None, None, None), 0)
    L.append(f"| — | unmapped | (no keyword matched) | {un} |")

    thin = [(s, c, l, leafc.get((s, c, l), 0)) for s, c, l, _ in leaves.TREE if leafc.get((s, c, l), 0) < 15]
    L.append("\n### Thin leaves (fewer than 15 questions)\n")
    for s, c, l, n in sorted(thin, key=lambda x: x[3]):
        L.append(f"- **{n}** — {s} › {c} › {l or '—'}")

    with open(REPORT, "w", encoding="utf-8") as fh:
        fh.write("\n".join(L) + "\n")
    print("report written")


if __name__ == "__main__":
    main(sys.argv[1:])
