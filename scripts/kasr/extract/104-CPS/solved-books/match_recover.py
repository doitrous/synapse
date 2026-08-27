#!/usr/bin/env python3
"""Recover keyless 104 CPS MCQ answers from 5 solved-book extractions.

Matching rule: same normalised stem (bank.py's own `norm()`), then a fuzzy
option-set validation so an OCR-garbled bank option (extra characters, merged
distractor from a neighbouring question, missing letter) does not block a
recovery, while two genuinely different questions that happen to share a
generic stem (e.g. "Vasa vasorum:") are correctly rejected because their
option content has near-zero overlap.

For each bank option, the closest solved-book option (by difflib ratio on the
same `norm()` text bank.py uses) is found. The match is accepted only if:
  - at least 3 of the (up to 4-5) option pairs score >= MIN_PAIR_RATIO, and
  - the pair covering the *book's own answer letter* scores >= MIN_PAIR_RATIO
    with a margin over the next-best bank option >= MIN_MARGIN (so we are not
    guessing between two similarly-worded options).

Multiple solved books may hit the same bank row; if they agree on the
recovered bank letter it strengthens confidence, if they disagree the row is
left CONFLICTING (not resolved here — needs a human ruling, same as bank.py's
own `answerConflicts`).

Output: recovered-answers.json (bank `key` -> answer + provenance), consumed
by apply.py to regenerate mcq-bank.json (generator input, not a hand edit).
"""
import json, re, os, glob, collections
from difflib import SequenceMatcher

HERE = os.path.dirname(os.path.abspath(__file__))
BANK_PATH = os.path.join(HERE, "..", "mcq-bank.json")
OUT_PATH = os.path.join(HERE, "recovered-answers.json")
REPORT_PATH = os.path.join(HERE, "recovery-report.md")

MIN_PAIR_RATIO = 0.55
MIN_MARGIN = 0.12
MIN_PAIRS_OK = 3


def norm(s):
    s = re.sub(r"[^a-z0-9 ]", " ", (s or "").lower())
    return re.sub(r"\s+", " ", s).strip()


def ratio(a, b):
    if not a or not b:
        return 0.0
    return SequenceMatcher(None, a, b).ratio()


def try_match(bank_q, book_q):
    """Return (recovered_letter, mean_ratio, pairs_ok) or None."""
    bank_opts = {k: norm(v) for k, v in bank_q["options"].items()}
    book_opts = {k: norm(v) for k, v in book_q["options"].items()}
    book_ans_letter = book_q.get("answer")
    book_ans_text = book_opts.get(book_ans_letter, "")
    if not book_ans_text:
        return None

    # For every bank option, best-matching book option text by ratio.
    best_for_bank = {}
    for bk, bv in bank_opts.items():
        scores = sorted(((ratio(bv, ov), ok) for ok, ov in book_opts.items()), reverse=True)
        best_for_bank[bk] = scores[0] if scores else (0.0, None)

    pairs_ok = sum(1 for s, _ in best_for_bank.values() if s >= MIN_PAIR_RATIO)
    if pairs_ok < min(MIN_PAIRS_OK, len(bank_opts)):
        return None

    # Which bank letter best represents the book's answer text?
    ranked = sorted(((ratio(bv, book_ans_text), bk) for bk, bv in bank_opts.items()), reverse=True)
    if not ranked:
        return None
    top_score, top_letter = ranked[0]
    second_score = ranked[1][0] if len(ranked) > 1 else 0.0
    if top_score < MIN_PAIR_RATIO:
        return None
    if top_score - second_score < MIN_MARGIN:
        return None

    mean_ratio = sum(s for s, _ in best_for_bank.values()) / len(best_for_bank)
    return top_letter, mean_ratio, pairs_ok


def main():
    bank = json.load(open(BANK_PATH, encoding="utf-8"))
    questions = bank["questions"]
    keyless = [q for q in questions if not q.get("answer")]
    print(f"keyless bank rows: {len(keyless)} / {len(questions)}")

    stem_index = collections.defaultdict(list)
    for q in keyless:
        stem_index[norm(q["stem"])].append(q)

    books = sorted(glob.glob(os.path.join(HERE, "*-mcq*.json")))
    hits_by_key = collections.defaultdict(list)  # bank key -> list of (letter, mean_ratio, book, occ)

    for bpath in books:
        book = json.load(open(bpath, encoding="utf-8"))
        bname = os.path.basename(bpath)
        for q in book["questions"]:
            if not q.get("answer"):
                continue
            n = norm(q["stem"])
            cands = stem_index.get(n)
            if not cands:
                continue
            for bank_q in cands:
                m = try_match(bank_q, q)
                if not m:
                    continue
                letter, mean_ratio, pairs_ok = m
                occ = {
                    "book": bname,
                    "sourceBook": book.get("book", bname),
                    "file": book.get("file", bname),
                    "page": q.get("page"),
                    "q": q.get("q"),
                    "answerSource": q.get("answerSource"),
                    "bookConfidence": q.get("confidence"),
                    "meanOptionRatio": round(mean_ratio, 3),
                    "pairsOk": pairs_ok,
                }
                hits_by_key[bank_q["key"]].append((letter, occ))

    recovered = {}
    conflicting = {}
    for key, hits in hits_by_key.items():
        letters = {h[0] for h in hits}
        if len(letters) == 1:
            letter = next(iter(letters))
            recovered[key] = {
                "answer": letter,
                "confidence": "fuzzy-ocr-optionset" if any(
                    h[1]["meanOptionRatio"] < 0.98 for h in hits) else "exact-optionset",
                "agreeingBooks": len({h[1]["book"] for h in hits}),
                "occurrences": [h[1] for h in hits],
            }
        else:
            conflicting[key] = {
                "letters": sorted(letters),
                "occurrences": [h[1] for h in hits],
            }

    still_keyless = [q["key"] for q in keyless if q["key"] not in recovered]

    out = {
        "generatedFrom": "solved-books/*.json + mcq-bank.json, matched by scripts/kasr/extract/104-CPS/solved-books/match_recover.py",
        "keylessBefore": len(keyless),
        "recoveredCount": len(recovered),
        "conflictingCount": len(conflicting),
        "stillKeylessCount": len(still_keyless) - len(conflicting),
        "recovered": recovered,
        "conflicting": conflicting,
        "stillKeylessKeys": [k for k in still_keyless if k not in conflicting],
    }
    with open(OUT_PATH, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)

    print(f"recovered: {len(recovered)}")
    print(f"conflicting (books disagree, left unresolved): {len(conflicting)}")
    print(f"still keyless: {out['stillKeylessCount']}")

    with open(REPORT_PATH, "w", encoding="utf-8") as fh:
        fh.write("# 104 CPS — solved-book key recovery\n\n")
        fh.write(f"- Keyless bank rows before: {len(keyless)}\n")
        fh.write(f"- Recovered from solved books: {len(recovered)}\n")
        fh.write(f"- Conflicting across books (unresolved, needs ruling): {len(conflicting)}\n")
        fh.write(f"- Still keyless (no solved-book match): {out['stillKeylessCount']}\n\n")
        fh.write("## Conflicting rows\n\n")
        for key, c in conflicting.items():
            fh.write(f"- **{key}** — books disagree: {c['letters']}\n")
            for o in c["occurrences"]:
                fh.write(f"    - {o['book']} p{o.get('page')} -> answer\n")


if __name__ == "__main__":
    main()
