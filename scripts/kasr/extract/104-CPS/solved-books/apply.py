#!/usr/bin/env python3
"""Apply solved-book-recovered answers onto mcq-bank.json.

This is the generator-input pattern (see BOARD.md hazards: never hand-edit a
generated batch): `recovered-answers.json` is the checked-in, reproducible
source data (produced by match_recover.py / fuzzy_stem_pass.py /
token_overlap_pass.py from the 5 solved-book extractions); this script is the
rerunnable step that folds it onto `mcq-bank.json`'s `answer` field. If
`bank.py` is ever rerun from a refreshed `mcq.json`, rerun this script
afterward to reapply the recovered keys — never hand-edit the regenerated
bank file directly.

Only fills rows that are still `answer: null`. Never overwrites an existing
printed/OCR answer — that is a different ruling (ANSWER-KEY GAPS: printed key
stands; a wrong bank key gets a field note, not a silent overwrite).
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
BANK_PATH = os.path.join(HERE, "..", "mcq-bank.json")
REC_PATH = os.path.join(HERE, "recovered-answers.json")


def main():
    bank = json.load(open(BANK_PATH, encoding="utf-8"))
    rec = json.load(open(REC_PATH, encoding="utf-8"))

    merged = {}
    for bucket in ("recovered", "fuzzyStemRecovered", "tokenOverlapRecovered"):
        merged.update(rec.get(bucket, {}))

    applied = 0
    skipped_already_keyed = 0
    for q in bank["questions"]:
        info = merged.get(q["key"])
        if not info:
            continue
        if q.get("answer"):
            skipped_already_keyed += 1
            continue
        q["answer"] = info["answer"]
        q["answerConfidence"] = "external-solved-book-recovered"
        q["recoveredFrom"] = {
            "method": info["confidence"],
            "agreeingBooks": info.get("agreeingBooks"),
            "occurrences": info["occurrences"],
        }
        applied += 1

    bank["withAnswer"] = sum(1 for q in bank["questions"] if q.get("answer"))
    bank["withExternalSolvedBookRecoveredAnswer"] = applied

    with open(BANK_PATH, "w", encoding="utf-8") as fh:
        json.dump(bank, fh, ensure_ascii=False, indent=1)

    print(f"applied {applied} recovered answers to mcq-bank.json "
          f"(skipped {skipped_already_keyed} already-keyed collisions); "
          f"withAnswer now {bank['withAnswer']}/{len(bank['questions'])}")


if __name__ == "__main__":
    main()
