#!/usr/bin/env python3
"""Apply editorially-keyed answers onto mcq-bank.json.

Generator-input pattern (see BOARD.md hazards: never hand-edit a generated
batch), same shape as apply.py's solved-book recovery: editorial-answers.json
is the checked-in, reproducible source data (built incrementally, batch by
batch, from subject-matter knowledge under the ANSWER-KEY GAPS ruling, once
TRIAGE APPROVED); this script is the rerunnable step that folds it onto
mcq-bank.json's answer field. If bank.py is ever rerun from a refreshed
mcq.json, rerun this script afterward to reapply the editorial keys — never
hand-edit the regenerated bank file directly.

Only fills rows that are still `answer: null`. Never overwrites an existing
printed/OCR/recovered answer (ANSWER-KEY GAPS: printed/recovered key stands).

`excluded` entries are rows read and judged too OCR-corrupted or
option-incomplete to key confidently — they are flagged on the bank row
(editorialExcluded / editorialExcludeReason) so they read as "reviewed, not
keyable" rather than "not yet looked at", but their `answer` stays null.
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
BANK_PATH = os.path.join(HERE, "..", "mcq-bank.json")
EDITORIAL_PATH = os.path.join(HERE, "editorial-answers.json")


def main():
    bank = json.load(open(BANK_PATH, encoding="utf-8"))
    editorial = json.load(open(EDITORIAL_PATH, encoding="utf-8"))

    by_key = {q["key"]: q for q in bank["questions"]}

    applied = 0
    skipped_already_keyed = 0
    missing = []
    for key, info in editorial.get("keyed", {}).items():
        q = by_key.get(key)
        if not q:
            missing.append(key)
            continue
        if q.get("answer"):
            skipped_already_keyed += 1
            continue
        q["answer"] = info["answer"]
        q["answerConfidence"] = "editorial-no-printed-key"
        q["fieldNotes"] = info.get("fieldNote", "keyed editorially, no printed key")
        q["editorialExplanation"] = {
            "explanation": info["explanation"],
            "distractorNotes": info.get("distractorNotes", {}),
        }
        applied += 1

    excluded_marked = 0
    for key, info in editorial.get("excluded", {}).items():
        q = by_key.get(key)
        if not q:
            missing.append(key)
            continue
        if q.get("answer"):
            continue  # already keyed by another path; leave it alone
        q["editorialExcluded"] = True
        q["editorialExcludeReason"] = info["reason"]
        excluded_marked += 1

    bank["withAnswer"] = sum(1 for q in bank["questions"] if q.get("answer"))
    bank["withEditorialAnswer"] = sum(
        1 for q in bank["questions"] if q.get("answerConfidence") == "editorial-no-printed-key"
    )
    bank["editorialExcludedCount"] = sum(1 for q in bank["questions"] if q.get("editorialExcluded"))

    with open(BANK_PATH, "w", encoding="utf-8") as fh:
        json.dump(bank, fh, ensure_ascii=False, indent=1)

    print(f"applied {applied} editorial answers to mcq-bank.json "
          f"(skipped {skipped_already_keyed} already-keyed collisions); "
          f"marked {excluded_marked} rows editorially-excluded; "
          f"missing lookups: {len(missing)}; "
          f"withAnswer now {bank['withAnswer']}/{len(bank['questions'])}, "
          f"withEditorialAnswer {bank['withEditorialAnswer']}, "
          f"editorialExcludedCount {bank['editorialExcludedCount']}")
    if missing:
        print("MISSING KEYS (not found in bank):", missing)


if __name__ == "__main__":
    main()
