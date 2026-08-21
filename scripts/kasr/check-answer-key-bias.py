#!/usr/bin/env python3
"""Find question sources whose printed answer keys cannot be trusted.

A well-set multiple-choice paper spreads its correct answers roughly evenly
across the option letters. Examiners are not perfectly uniform — a mild bias
toward A and away from the last option is normal and human — but a source that
keys 41% of its questions A is not describing its examiner. It is describing an
extraction artefact.

That is exactly what this found in `101 ISK`, and it was worth finding. An
author reading two of the twenty-eight leaves noticed the wrong keys clustering
on the copies watermarked "DEP BOOK", and overwhelmingly on the letter A —
which is what the extractor records when an answer echo leaks into the stem and
is read as the first option. Measured across the whole bank rather than the two
leaves:

    all keyed rows      A 27.6  B 25.6  C 25.3  D 21.2   (n=1716)
    high confidence     A 26    B 23    C 26    D 24     (n=1187)  healthy
    "DEP BOOK" copies   A 41    B 22    C 25    D 12     (n=263)   not

The high-confidence rows are near-uniform, which is what makes the rest
credible: the same extractor on clean pages produces no skew, so the skew is in
the pages, not the method.

Running it across the corpus found three more the leaf-level reading could not
see, and one of them undercuts the tidy explanation: `Cytology Mcq` keys 50% B
and `Histo MCQ by Dr.Zahra [Blood]` keys 38% D. An echo read as the first option
cannot do that. So the skew is the signal and the mechanism has to be read off
each file's own spread — an excess on A with D starved is an echo; an excess on
a middle letter is an answer key misaligned against its question numbers, which
moves every answer in the file together and is the more dangerous of the two.

This does not say which answers are wrong. It says which *sources* to distrust,
which is the actionable thing — an author working a leaf can be told to
re-derive every key from a flagged source rather than accept it.

    python3 scripts/kasr/check-answer-key-bias.py

Exits non-zero when a source is skewed enough to be worth re-deriving.
"""
import collections
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
BANK = os.path.join(HERE, "extract", "mcq-bank.json")

# How far from even a source may sit before it is worth re-deriving. A real
# examiner drifts; 40% on one letter is not drift. Set from the measured
# contrast: clean pages sit at 23-26%, the flagged copies at 41%.
SUSPECT_SHARE = 0.36
# Below this a share means little — three questions keyed A is not a pattern.
MIN_ROWS = 20


def main() -> int:
    bank = json.load(open(BANK))["questions"]
    keyed = [row for row in bank if row.get("answer")]

    # By the file each occurrence came from, since a question appears in several
    # and the question is which *source* to distrust.
    by_file: dict[str, list[str]] = collections.defaultdict(list)
    for row in keyed:
        for where in row.get("occurrences", []):
            by_file[where["file"]].append(row["answer"])

    overall = collections.Counter(row["answer"] for row in keyed)
    total = sum(overall.values())
    print(f"{total} keyed questions across {len(by_file)} source files\n")
    print("  overall:", "  ".join(
        f"{letter} {100 * count / total:.1f}%" for letter, count in sorted(overall.items())))

    for confidence in ("high", "medium", "low"):
        subset = [row["answer"] for row in keyed if row.get("confidence") == confidence]
        if len(subset) < MIN_ROWS:
            continue
        counts = collections.Counter(subset)
        print(f"  {confidence:>6} confidence (n={len(subset)}):", "  ".join(
            f"{letter} {100 * count / len(subset):.0f}%" for letter, count in sorted(counts.items())))

    suspect = []
    for name, answers in sorted(by_file.items()):
        if len(answers) < MIN_ROWS:
            continue
        counts = collections.Counter(answers)
        letter, count = counts.most_common(1)[0]
        share = count / len(answers)
        if share >= SUSPECT_SHARE:
            suspect.append((name, letter, share, len(answers), counts))

    if suspect:
        print(f"\n{len(suspect)} source(s) whose keys are skewed enough to re-derive rather than accept:\n")
        for name, letter, share, rows, counts in sorted(suspect, key=lambda one: -one[2]):
            spread = "  ".join(f"{key} {100 * value / rows:.0f}%" for key, value in sorted(counts.items()))
            print(f"  {name[:58]}")
            print(f"      {rows} keyed, {100 * share:.0f}% answer {letter}   ({spread})")
        print("\nA skew this size is not an examiner's habit. Treat every key from these")
        print("files as unverified and derive it from the options instead.")
        print()
        print("The mechanism differs by file and is worth reading off the spread rather")
        print("than assumed. An excess of A with the last option starved is an answer")
        print("echo leaking into the stem and being read as the first option. An excess")
        print("on a middle letter is not that, and points at the answer key itself —")
        print("a column misaligned against its question numbers, or a key joined one row")
        print("out. The first is recoverable by re-reading the page; the second means")
        print("the whole key is offset and every answer in the file moves together.")
        return 1

    print("\nno source is skewed enough to distrust")
    return 0


if __name__ == "__main__":
    sys.exit(main())
