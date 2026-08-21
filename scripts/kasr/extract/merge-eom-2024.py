#!/usr/bin/env python3
"""Put the read 2024 paper into the bank, over the OCR of it.

The bank holds 77 rows off this paper with clean-ish stems and no options at
all, because a candidate's pen crossed the option letters. `eom-2024-read.json`
holds all 120 read off the page images, with every option.

Rows are matched by the paper's own question number, and updated **in place**
keeping their existing `key`. That matters: seed files already cite these keys —
thirty of them in exclusion entries written when the options were missing — and
re-keying on the corrected stem would break every one of those references
silently, which is the failure the exclusions exist to prevent.

The 43 questions OCR never found are added as new rows.

An updated row keeps its old stem on `ocrStem` rather than discarding it. The
exclusions written against these rows quote the mangled text as their reason,
and a reviewer reading "the options leaked into the stem" needs to be able to
see the stem that happened to.
"""
import hashlib
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
BANK = os.path.join(HERE, "mcq-bank.json")
READ = os.path.join(HERE, "eom-2024-read.json")


def key_for(stem):
    slug = re.sub(r"[^a-z0-9]+", "-", stem.lower()).strip("-")[:60].strip("-")
    tight = re.sub(r"[^a-z0-9]", "", stem.lower())
    return f"{slug}-{hashlib.sha1(tight.encode()).hexdigest()[:8]}"


def main():
    bank = json.load(open(BANK, encoding="utf-8"))
    field = "questions" if "questions" in bank else "rows"
    rows = bank[field]
    read = json.load(open(READ, encoding="utf-8"))
    source = read["questions"][0]["sourceId"]

    # The bank's rows off this paper, by the printed question number.
    by_number = {}
    for row in rows:
        for occurrence in row.get("occurrences", []):
            if occurrence.get("sourceId") == source:
                by_number[occurrence.get("number")] = row

    updated = added = unchanged = 0
    for question in read["questions"]:
        found = by_number.get(question["number"])
        if found:
            if found.get("readBy") == "image":
                unchanged += 1
                continue
            found["ocrStem"] = found.get("stem")
            found["stem"] = question["stem"]
            found["options"] = dict(question["options"])
            found["questionType"] = "mcq"
            found["confidence"] = "high"
            found["readBy"] = "image"
            # The flag that said the options were stuck in the stem. They are
            # not any more, and leaving it set would keep telling authors to
            # skip a row that is now the best-read row on the paper.
            found.pop("optionsInStem", None)
            updated += 1
            continue

        rows.append({
            "key": key_for(question["stem"]),
            "stem": question["stem"], "options": dict(question["options"]),
            "answer": None, "answerConfidence": "none",
            "occurrences": [{"sourceId": source, "file": question["file"],
                             "page": question["page"], "number": question["number"],
                             "satOn": question["satOn"], "sitting": True}],
            "timesAsked": 1, "satOn": [question["satOn"]], "topic": None,
            "confidence": "high", "questionType": "mcq",
            "variants": [], "fromSitting": True, "readBy": "image",
        })
        added += 1

    bank[field] = rows
    json.dump(bank, open(BANK, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print(f"{updated} rows given their options, {added} added, {unchanged} already read")
    print(f"bank is now {len(rows)} rows")


if __name__ == "__main__":
    main()
