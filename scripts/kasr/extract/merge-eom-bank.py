#!/usr/bin/env python3
"""Fold the end-of-module papers into the multiple-choice bank.

The bank was built from the thirty question books. The six end-of-module papers
are sat papers — higher priority than any book, under the programme's own source
rule — and none of their questions were in it.

Two things happen when they go in, and the first matters more than the second.

**197 of the 360 are already there.** The books reproduce past exam questions,
which is what makes them useful, but a book saying a question was asked is
weaker evidence than the paper it was asked on. Those rows gain an occurrence
naming the sitting, so `timesAsked` counts the exam rather than the reprint, and
a question that appeared on three sat papers outranks one a single book prints
three times.

**163 are new.** They were examined and are in no book, so nothing in the bank
knew about them at all.

Writes back to mcq-bank.json, and reports what changed. Idempotent: an
occurrence already recorded is not recorded twice.
"""
import hashlib
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
BANK = os.path.join(HERE, "mcq-bank.json")
EOM = os.path.join(HERE, "eom.json")

WORD = re.compile(r"[a-z]{4,}")
tight = lambda text: re.sub(r"[^a-z0-9]", "", text.lower())


def words(text):
    return set(WORD.findall(text.lower()))


def key_for(question):
    """A bank key for an EOM question: its stem, slugged, plus a short hash tail."""
    slug = re.sub(r"[^a-z0-9]+", "-", question["stem"].lower()).strip("-")[:60].strip("-")
    # sha1, not the built-in hash: `hash()` on a string is salted per process,
    # so the same question would take a different key on every run and the file
    # would never be idempotent — and any seed already citing the old key would
    # break silently the next time this ran.
    tail = hashlib.sha1(tight(question["stem"]).encode()).hexdigest()[:8]
    return f"{slug}-{tail}"


def main():
    bank = json.load(open(BANK, encoding="utf-8"))
    rows = bank.get("questions") or bank.get("rows")
    field = "questions" if "questions" in bank else "rows"
    eom = json.load(open(EOM, encoding="utf-8"))

    sittings = {s["satOn"]: s for s in eom["sittings"]}
    by_tight = {tight(row["stem"])[:40]: row for row in rows}
    row_words = [(row, words(row["stem"])) for row in rows]

    matched = 0
    added = 0
    already = 0

    for question in eom["questions"]:
        found = by_tight.get(tight(question["stem"])[:40])
        if not found:
            want = words(question["stem"])
            if want:
                best, score = None, 0.0
                for row, have in row_words:
                    overlap = len(want & have) / len(want)
                    if overlap > score:
                        best, score = row, overlap
                if score >= 0.7:
                    found = best

        occurrence = {
            "sourceId": question["sourceId"], "file": question["file"],
            "page": question["page"], "number": question["number"],
            # What makes this occurrence worth more than a question book's.
            "satOn": question.get("satOn"),
            "sitting": True,
        }

        if found:
            occurrences = found.setdefault("occurrences", [])
            if any(o.get("sourceId") == occurrence["sourceId"]
                   and o.get("number") == occurrence["number"] for o in occurrences):
                already += 1
                continue
            occurrences.append(occurrence)
            found["timesAsked"] = len(occurrences)
            # Recorded on the row so an author can see, without joining files,
            # that this one was actually sat rather than only printed.
            found["satOn"] = sorted({*(found.get("satOn") or []), question["satOn"]}) \
                if isinstance(found.get("satOn"), list) else [question["satOn"]]
            matched += 1
            continue

        rows.append({
            "key": key_for(question),
            "stem": question["stem"],
            "options": question["options"],
            # The end-of-module answer keys were recovered separately, from the
            # annotation ink on the two solved papers, and are joined in a later
            # pass. Claiming none rather than guessing.
            "answer": None,
            "answerConfidence": "none",
            "occurrences": [occurrence],
            "timesAsked": 1,
            "satOn": [question["satOn"]],
            "topic": None,
            "confidence": question.get("confidence", "medium"),
            "questionType": "mcq" if question["options"] else "no-options",
            # Set where a candidate's pen crossed the option letters, so the
            # options are inside the stem and need a reader to separate them.
            "optionsInStem": question.get("optionsInStem", False),
            "variants": question.get("variants", []),
            "fromSitting": True,
        })
        added += 1

    bank[field] = rows
    json.dump(bank, open(BANK, "w", encoding="utf-8"), indent=1, ensure_ascii=False)

    print(f"{matched} bank rows gained a sitting occurrence")
    print(f"{already} already had it")
    print(f"{added} new questions added from the sat papers")
    print(f"bank is now {len(rows)} rows")
    for date, sitting in sorted(sittings.items()):
        print(f"  {date}  {sitting['moduleCode']}  {sitting['recovered']} questions")


if __name__ == "__main__":
    main()
