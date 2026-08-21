#!/usr/bin/env python3
"""Recover the options the first parse dropped.

Seven hundred and fifty of the bank's 2,704 questions came out with fewer than
four options. The obvious explanation — OCR mangling the `d.` label — is not
what happened. The options are present and correct in the text layer:

    23- All of the following are stabilizing factors ... except: (2019)    Ac ad
                                                          Ac
     ad         ad       ad
          a- A tight capsule.
          b- Tendons that fuse with the capsule of the joint.
          c- Presence of glenohumeral and coracohumeral ligaments.


                                                   ad        ad
    ViP   d- Presence of labrum glenoidale.

The books are watermarked. "ViP" and scattered "Ac"/"ad" fragments land between
the options and on the same line as them, and the blank lines the watermark
leaves behind end a parse that assumes options are contiguous. Which letter goes
depends on where the watermark falls, so options are lost from every position —
not just the last, and the answer distribution among intact questions is even
(A 346, B 337, C 337, D 333 of 1,353), so nothing about the answer key is skewed.

That matters because it means these are recoverable by re-reading the cached page
text rather than by re-running OCR: no page is re-rendered here.

    python3 scripts/kasr/extract/repair-options.py [--dry-run | --self-test]
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
BANK = os.path.join(HERE, "mcq-bank.json")
PAGETEXT = os.path.join(HERE, "pagetext")

# The watermark. It is "ViP Academy" set rotated across the page, and pdftotext
# lays its glyphs down wherever they fall — so it arrives not as one token but
# as fragments: `Vi`, `P`, `Ac`, `ad`, `y`, `em`, sometimes split across two
# lines mid-word. Matched only as whole tokens, so a real word ending in "ad"
# survives.
WATERMARK = re.compile(r"(?<![A-Za-z])(?:ViP|VIP|Vi|Ac|AC|ad|AD|em|[Py])(?![A-Za-z])")

# `a- text`, `a. text`, `a) text`, with any indent.
#
# The leading `[^A-Za-z]*` and optional short word are the fix: a fragment of
# the watermark lands *on the option's own line*, ahead of its label —
# `Vi    a- Subclavian vein.` — and an anchored parse skips the option
# entirely rather than erroring. Which is why options went missing from every
# letter position and not just the last.
OPTION = re.compile(r"^[^A-Za-z]*(?:[A-Za-z]{1,3}\s+)?\(?([a-eA-E])\s*[-.)]\s+(\S.*)$")
# `23-`, `23.`, `23)`, `Q23.` — where the next question starts.
NUMBER = re.compile(r"^\s*(?:Q(?:uestion)?\s*)?(\d{1,3})\s*[-.)]\s*\S")

# A label that begins an option part-way through a line: two options typeset on
# one line, which the layout does often enough to matter.
#
# `0` and `¢` are here because the scan really does mangle a label sometimes —
# `d.` reads as `0.` and `c.` as `¢.`. Rather than guess which letter a mangled
# label is, they are resolved by position: labels run in order, so a mangled one
# following `c` is `d`. Guessing by shape would put an option under the wrong
# letter, which is worse than dropping it, because the answer key is by letter.
INLINE = re.compile(r"(?<=\s)([a-e0¢6])\s*[-.]\s+(?=[A-Z(])")

# A lone digit or symbol left at the end of an option by the watermark.
TRAILING_JUNK = re.compile(r"[\s.]+[0-9¢|_]{1,2}\s*$")

LETTERS = 'ABCDE'


def split_inline(line):
    """One line holding two options becomes two lines."""
    return INLINE.sub(lambda m: f"\n{m.group(1)}- ", line)


def resolve(found):
    """Give mangled labels the letter their position says they have.

    `found` is a list of `(label, text)` in the order the page prints them. A
    label the scan recognised keeps its letter; one it did not takes the letter
    after the last recognised one.
    """
    out = {}
    expected = 0
    for label, text in found:
        upper = label.upper()
        if upper in LETTERS:
            index = LETTERS.index(upper)
            # A letter out of order is the watermark faking one — skip it
            # rather than letting it overwrite a real option.
            if index < expected - 1:
                continue
            expected = index + 1
        else:
            if expected >= len(LETTERS):
                continue
            index = expected
            expected += 1
        letter = LETTERS[index]
        if letter not in out:
            out[letter] = text
    return out


def clean(line):
    """A line with the watermark taken out, or None if that is all it was."""
    stripped = WATERMARK.sub(" ", line)
    return stripped if stripped.strip() else None


def options_after(lines, start, stop_number):
    """Read the options following a stem, tolerating watermark gaps.

    Stops at the next question number rather than at the first blank line, which
    is the heart of the fix: the blank lines are the watermark's, not the
    author's, and treating one as the end of the options is what dropped them.
    """
    found = []
    for raw in lines[start:]:
        for piece in split_inline(raw).split("\n"):
            line = clean(piece)
            if line is None:
                continue

            number = NUMBER.match(line)
            if number and int(number.group(1)) == stop_number:
                return resolve(tidy(found))

            match = OPTION.match(line)
            if match:
                found.append([match.group(1), match.group(2).strip()])
                continue

            # A continuation of the option above, but only while it looks like
            # prose rather than the start of the next question's stem.
            # Watermark debris is short and letterless once cleaned; a genuine
            # continuation is neither.
            if (found and not number and 3 < len(line.strip()) < 90
                    and found[-1][1][-1:] not in '.?'):
                found[-1][1] = f"{found[-1][1]} {line.strip()}".strip()

    return resolve(tidy(found))


def tidy(found):
    """Trim the debris the watermark leaves on the end of an option."""
    cleaned = [(label, re.sub(r'\s{2,}', ' ', TRAILING_JUNK.sub('', text)).strip())
               for label, text in found]
    return [(label, text) for label, text in cleaned if text]


def self_test():
    """Prove position-resolution survives a run of corrupted labels.

    The case that matters is two mangled labels in a row: if the resolver
    anchored on "the letter after the last one I recognised", a run would
    resolve everything after it one place short. It does not — `expected`
    advances per label, recognised or not — but a parallel corpus read entirely
    by OCR has runs of three and four, so this is worth a test rather than a
    reading of the code.

    Wrong-letter is worse than absent here, because the answer key is by letter.
    """
    cases = {
        "clean": [("a", "A1"), ("b", "B1"), ("c", "C1"), ("d", "D1")],
        "single corruption": [("a", "A1"), ("b", "B1"), ("0", "C1"), ("d", "D1")],
        "double, c and d": [("a", "A1"), ("b", "B1"), ("6", "C1"), ("0", "D1")],
        "first label mangled": [("6", "A1"), ("b", "B1"), ("c", "C1"), ("d", "D1")],
        "triple run": [("a", "A1"), ("0", "B1"), ("6", "C1"), ("\u00a2", "D1")],
        "every label mangled": [("0", "A1"), ("6", "B1"), ("\u00a2", "C1"), ("0", "D1")],
    }
    failed = 0
    for name, found in cases.items():
        out = resolve(found)
        ok = len(out) == 4 and all(out.get(letter) == f"{letter}1" for letter in "ABCD")
        print(f"{'PASS' if ok else 'FAIL'}  {name:<22} {dict(sorted(out.items()))}")
        failed += 0 if ok else 1

    # A label out of order is the watermark faking one and must not overwrite.
    out = resolve([("a", "A1"), ("b", "B1"), ("a", "JUNK"), ("c", "C1")])
    ok = out.get("A") == "A1"
    print(f"{'PASS' if ok else 'FAIL'}  a repeated letter does not overwrite the first")
    failed += 0 if ok else 1

    return failed


def main():
    if "--self-test" in sys.argv:
        sys.exit(1 if self_test() else 0)
    dry = "--dry-run" in sys.argv
    bank = json.load(open(BANK))
    cache = {}

    repaired = 0
    unchanged = 0
    still_short = 0
    gained = 0

    for row in bank["questions"]:
        filled = [k for k, v in row["options"].items() if v and v.strip()]
        if len(filled) >= 4:
            continue

        best = dict(row["options"])
        for where in row["occurrences"]:
            source = where["sourceId"]
            if source not in cache:
                path = os.path.join(PAGETEXT, f"{source}.json")
                cache[source] = json.load(open(path))["pages"] if os.path.exists(path) else None
            pages = cache[source]
            if not pages:
                continue

            index = where["page"] - 1
            if not (0 <= index < len(pages)):
                continue
            text = pages[index]
            if isinstance(text, dict):
                text = text.get("text", "")
            lines = text.split("\n")

            # Find this question's number on the page, then read past it.
            for position, raw in enumerate(lines):
                line = clean(raw)
                if not line:
                    continue
                number = NUMBER.match(line)
                if number and int(number.group(1)) == where["number"]:
                    found = options_after(lines, position + 1, where["number"] + 1)
                    if len([v for v in found.values() if v.strip()]) > len([v for v in best.values() if v and v.strip()]):
                        best = found
                    break

        after = [k for k, v in best.items() if v and v.strip()]
        if len(after) > len(filled):
            gained += len(after) - len(filled)
            row["options"] = best
            row["optionsRepaired"] = True
            row["optionsBefore"] = filled
            repaired += 1
            if len(after) < 4:
                still_short += 1
        else:
            unchanged += 1
            if len(filled) < 4:
                still_short += 1

    bank["optionRepair"] = {
        "cause": "publisher watermark ('ViP', 'Ac', 'ad') interleaved with the options, "
                 "leaving blank lines that ended a parse assuming options are contiguous",
        "rowsRepaired": repaired,
        "optionsRecovered": gained,
        "stillUnderFour": still_short,
        "note": "Re-read from cached page text. No page was re-rendered and no OCR was re-run.",
    }

    print(f"repaired {repaired} rows, recovered {gained} options, "
          f"{still_short} still under four, {unchanged} unchanged")
    if not dry:
        json.dump(bank, open(BANK, "w"), indent=1, ensure_ascii=False)
        print(f"written -> {BANK}")


if __name__ == "__main__":
    main()
