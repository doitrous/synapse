#!/usr/bin/env python3
"""Check whether a paper the corpus calls "solved" actually carries answers.

`scripts/corpus-intake/manifest.py` decides `solvedStatus` from the filename: a
name containing "solved" or "answers" is solved, one containing "unsolved" is
not. That is the only evidence available at intake, and for 101 ISK it is wrong
twice. `EOY (ISK - 101) 198 {Solved}` is ten pages of question stems and 217
rows of dotted answer rules; `EOY (ISK - 101) 199 Solved` is fifteen pages and
422 of them. Neither holds a single answer. Anyone looking for the examiner's
own mark scheme is sent to a blank page, and the mark schemes in the seeded
batches had to be built from the department book instead.

This script is deliberately timid, because the first version of it was not and
was wrong.

A solved paper's answers are written onto the rules by hand, and the text layer
catches them unevenly. `EOY (BMS - 103) 199 [Solved]` plainly holds answers —
"superoxide dismutase", "citrate synthase" — yet the counts separating it from a
blank paper are 8 answered rules against 473, and 63 short lines against 31 on
the blank one. Those distributions overlap. Any threshold that calls the BMS
paper solved also calls a blank paper solved, and the first version duly
proposed marking it unsolved. There is no reliable discriminator in the text
layer.

So this corrects in ONE direction only, and only on evidence that admits no
argument: a paper with dozens of answer rules and essentially nothing written on
any of them is blank whatever its name says. It never marks anything `solved` —
a name already claiming that, plus evidence that cannot separate it from a blank
paper, is not a finding. Everything else is reported for a human to open, and
left exactly as it is.

    python3 scripts/kasr/verify-solved.py          # report only
    python3 scripts/kasr/verify-solved.py --write  # apply what it is sure of
"""
import json
import os
import re
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")

# A line that is only dots or underscores is somewhere for a candidate to write.
RULE = re.compile(r"^[….\s_]+$")
# A run of dots anywhere in a line, so a rule someone has written an answer on
# is still recognised as a rule.
DOTTED = re.compile(r"[….]{4,}")
QUESTION = re.compile(r"^\s*\d{1,3}\s*[).\-]")

# How many rules a paper must have before its emptiness means anything, and how
# many may carry text before "blank" stops being the obvious reading.
ENOUGH_RULES = 50
STILL_BLANK = 2


def read(path):
    """What the file holds: `unsolved`, or None when it cannot be told."""
    try:
        text = subprocess.run(["pdftotext", "-layout", "-q", path, "-"],
                              capture_output=True, text=True, timeout=300).stdout
    except Exception as reason:
        return None, {"reason": f"could not be read ({reason})"}

    lines = [line.strip() for line in text.split("\n") if line.strip()]
    if len(lines) < 5:
        return None, {"reason": "no text layer to read"}

    rules = sum(1 for line in lines if RULE.match(line))
    questions = sum(1 for line in lines if QUESTION.match(line))
    # A rule with text on it is an answer someone wrote; a rule that is only
    # dots is one nobody did. This is the signal that matters, and the first
    # version of this script did not measure it at all.
    written = sum(1 for line in lines
                  if DOTTED.search(line) and not RULE.match(line)
                  and len(re.sub(r"[….\s_-]", "", line)) > 2)

    evidence = {"lines": len(lines), "questions": questions,
                "answerRules": rules, "answeredRules": written}

    if questions < 3:
        return None, {**evidence, "reason": "fewer than three numbered questions found — "
                                            "the layout was not understood well enough to judge"}
    if rules >= ENOUGH_RULES and written <= STILL_BLANK:
        return "unsolved", evidence
    return None, {**evidence,
                  "reason": f"{written} of {rules} answer rules carry text — not separable "
                            "from a blank paper by reading alone"}


def main():
    write = "--write" in sys.argv
    manifest = json.load(open(MANIFEST, encoding="utf-8"))
    claimed = [s for s in manifest["sources"] if s.get("solvedStatus")]

    print(f"{len(claimed)} sources carry a solvedStatus taken from their filename\n")
    corrected = unchecked = 0
    review = []

    for source in claimed:
        path = source.get("absolutePath")
        if not path or not os.path.exists(path) or source.get("fileType") != "pdf":
            continue
        verdict, evidence = read(path)
        claim = source["solvedStatus"]

        if verdict == "unsolved" and claim == "solved":
            corrected += 1
            print(f"  CORRECTED  {source['fileName']}")
            print(f"             the name says solved; {evidence['answeredRules']} of "
                  f"{evidence['answerRules']} answer rules carry any text, over "
                  f"{evidence['questions']} questions")
            if write:
                source["solvedStatusClaimed"] = claim
                source["solvedStatus"] = "unsolved"
                source["solvedStatusChecked"] = (
                    f"the filename claims solved; the file is blank — {evidence['answeredRules']} "
                    f"of {evidence['answerRules']} answer rules carry any text, over "
                    f"{evidence['questions']} questions")
            continue

        unchecked += 1
        if claim == "solved" and evidence.get("answerRules", 0) >= ENOUGH_RULES:
            review.append((source["fileName"], evidence))
        if write:
            source["solvedStatusChecked"] = (
                f"not verified by reading: {evidence.get('reason', 'inconclusive')}. "
                "solvedStatus is still the filename's claim.")

    if review:
        print(f"\n{len(review)} more claim to be solved and could not be confirmed by reading. "
              "Someone should open them:")
        for name, evidence in review:
            print(f"  {evidence['answeredRules']:>3} of {evidence['answerRules']:>3} rules written on   {name}")

    print(f"\n{corrected} corrected, {unchecked} left as the filename has them")
    if write:
        json.dump(manifest, open(MANIFEST, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
        print(f"written -> {MANIFEST}")
    else:
        print("(report only — pass --write to apply)")


if __name__ == "__main__":
    main()
