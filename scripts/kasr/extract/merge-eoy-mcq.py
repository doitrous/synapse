#!/usr/bin/env python3
"""Put the end-of-year multiple-choice sections into the bank.

68 questions off three sat end-of-year papers, read from the page images
because those pages carry no text layer. None were in the bank: it was built
from the question books and then the end-of-module papers, and the end-of-year
papers' Section B was never collected.

Matched against the existing bank first, because the question books reprint
these — a row already there gains an occurrence naming the sitting rather than
a duplicate, which is what makes `timesAsked` mean the exam rather than the
reprint.
"""
import hashlib
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
BANK = os.path.join(HERE, "mcq-bank.json")
READ = os.path.join(HERE, "eoy-mcq-read.json")

tight = lambda t: re.sub(r"[^a-z0-9]", "", t.lower())
words = lambda t: set(re.findall(r"[a-z]{4,}", t.lower()))


def main():
    bank = json.load(open(BANK, encoding="utf-8"))
    field = "questions" if "questions" in bank else "rows"
    rows = bank[field]
    read = json.load(open(READ, encoding="utf-8"))

    # Keyed on the WHOLE stem, not its first forty characters.
    #
    # The two 2022 sittings are parallel papers built from one blueprint, so
    # their questions share long prefixes — "Microtubules, microfilaments, and
    # intermediate filaments are components of" is identical in both. A
    # forty-character key collides there, the dict keeps whichever came last,
    # and six questions were handed an occurrence on a row that was a different
    # question. That inflates `timesAsked`, which is the number a student's
    # revision priority is derived from.
    by_tight = {tight(r["stem"]): r for r in rows}
    row_words = [(r, words(r["stem"])) for r in rows]

    matched = added = already = 0
    for q in read["questions"]:
        found = by_tight.get(tight(q["stem"]))
        if not found:
            want = words(q["stem"])
            best, score = None, 0.0
            for row, have in row_words:
                if not want:
                    break
                overlap = len(want & have) / len(want)
                if overlap > score:
                    best, score = row, overlap
            if score >= 0.75:
                found = best

        occurrence = {"sourceId": q["sourceId"], "file": q["file"], "page": q["page"],
                      "number": q["number"], "satOn": str(q["satYear"]), "sitting": True}

        if found:
            occ = found.setdefault("occurrences", [])
            if any(o.get("sourceId") == q["sourceId"] and o.get("number") == q["number"] for o in occ):
                already += 1
                continue
            occ.append(occurrence)
            found["timesAsked"] = len(occ)
            found["satOn"] = sorted({*(found.get("satOn") or []), str(q["satYear"])})
            matched += 1
            continue

        # A row added by THIS run must be visible to the questions after it.
        #
        # The two 2022 sittings share some questions word for word — "Regarding
        # the exocrine gland:", "Silver staining is used to demonstrate:" — and
        # the key is minted from the stem, so processing them independently
        # appended two rows carrying one key. `build-batches` would then see a
        # duplicate key, and the second run of this script handed the first
        # sitting's occurrence to whichever row the dict happened to keep.
        # One row per distinct stem, gathering both sittings' occurrences.
        fresh = {
            "key": f'{re.sub(r"[^a-z0-9]+", "-", q["stem"].lower()).strip("-")[:60].strip("-")}'
                   f'-{hashlib.sha1(tight(q["stem"]).encode()).hexdigest()[:8]}',
            "stem": q["stem"], "options": dict(q["options"]),
            "answer": None, "answerConfidence": "none",
            "occurrences": [occurrence], "timesAsked": 1, "satOn": [str(q["satYear"])],
            "topic": None, "confidence": "high", "questionType": "mcq",
            "variants": [], "fromSitting": True, "readBy": "image",
        }
        rows.append(fresh)
        by_tight[tight(q["stem"])] = fresh
        row_words.append((fresh, words(q["stem"])))
        added += 1

    bank[field] = rows
    json.dump(bank, open(BANK, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print(f"{matched} bank rows gained an end-of-year occurrence, {added} added, {already} already had it")
    print(f"bank is now {len(rows)} rows")


if __name__ == "__main__":
    main()
