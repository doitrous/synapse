#!/usr/bin/env python3
"""Recover the options the first parse dropped.

Copied from `scripts/kasr/extract/repair-options.py`. Two independent
mechanisms are in this file, and only one travels:

  1. Label-position resolution (`resolve`, `options_after`, `LINE_CASES`,
     the OCR-mangled-glyph handling) is format logic — an OCR pass can turn
     `d.` into `0.` or `c.` into `¢.` on any corpus, and recovering the
     letter from its position in the sequence rather than its shape is
     sound everywhere. Unchanged here.
  2. Watermark stripping (`WATERMARKS`) is specific to one publisher and is
     destructive when misapplied — see the table below. `WATERMARKS` starts
     **empty**: Kasr's `101 ISK` entry strips `ViP`/`Vi`/`Ac`/`ad`/`em`/`P`/`y`
     fragments of that corpus's own "ViP Academy" overlay, and running it
     against Ain Shams text would delete real words (`P` wave, `P50`, `y`
     descent) with no error and no visible sign — the shared manual documents
     this exact failure at length ("A `repair-options.py` finding").

    python3 scripts/asu/extract/repair-options.py --module "ASU-CVS" \
        [--dry-run | --self-test]

`--module` is required — Ain Shams has no default bank/page-cache pair to
fall back to (unlike Kasr's `101 ISK`, whose accidental omission once
repaired module 104's rows into module 101's bank — exactly the failure a
required argument prevents).
"""
import json
import os
import re
import sys

import asu_module

HERE = os.path.dirname(os.path.abspath(__file__))

# Watermarks are a property of a PUBLISHER, not of the format.
#
# 101's question books are watermarked "ViP Academy", set rotated across the
# page, and `pdftotext` lays its glyphs down wherever they fall — so it arrives
# not as one token but as fragments: `Vi`, `P`, `Ac`, `ad`, `y`, `em`,
# sometimes split across two lines mid-word. Stripping those recovers 505
# options here.
#
# Applied to a corpus that is NOT watermarked, the same list is destructive and
# silent:
#
#   "It is initiated by the P wave of the ECG"  ->  "the  wave of the ECG"
#   "The normal P50 for human is 27 mmHg"       ->  "The normal 50 for human"
#   "The y descent follows the v wave"          ->  "The  descent follows"
#
# Each still parses, still reads as English, and is now wrong — and the damage
# is indistinguishable from a source that never said it. A parallel module
# measured 146 fragment matches across 46 sources and not one real watermark
# token: `P` was the P wave, P50 and PaO2; `y` was the y descent.
#
# So it is a per-corpus table, and `None` is a real value meaning "this corpus
# has no watermark; pass every line through untouched". A corpus not listed
# here gets `None`, because assuming a watermark that is not there deletes
# content while assuming none that is there merely fails to recover it. The
# first is silent and the second is visible in the option counts.
# >>> FILL IN PER MODULE, only after confirming a watermark actually renders
# on a page — do not assume one exists. See the discussion above for the
# check ("assume None until you have seen one" — SHARED-TOOLCHAIN.md). Kasr's
# `101 ISK` entry is not copied here: `ViP Academy` is that corpus's own
# publisher watermark and would delete real content from Ain Shams text —
# `P`, `y`, `ad`, `em` are ordinary word fragments (P wave, P50, y descent)
# wherever a real watermark is not confirmed present.
WATERMARKS: dict[str, "re.Pattern[str] | None"] = {}


def paths(module):
    """(bank, page cache) for a module — always namespaced, no unprefixed default."""
    return asu_module.out_path(module, "mcq-bank.json"), asu_module.out_path(module, "pagetext")

# `a- text`, `a. text`, `a) text`, with any indent.
#
# The leading `[^A-Za-z]*` and optional short word are the fix: a fragment of
# the watermark lands *on the option's own line*, ahead of its label —
# `Vi    a- Subclavian vein.` — and an anchored parse skips the option
# entirely rather than erroring. Which is why options went missing from every
# letter position and not just the last.
# The glyphs a scan puts where an option label should be, measured across one
# module's eighteen OCR'd sources rather than guessed: `6`x29, `0`x25, `©`x8,
# `¢`x3, `@`x1. They are only ever read as "a label is here" — which letter it
# is still comes from position, never from the shape.
MANGLED = "06¢©®€@"

# The comma is a separator too — `a, It has low electric resistance…` runs to
# 78 lines in one physiology book alone, and without it every one of those
# options is invisible rather than merely mislabelled.
OPTION = re.compile(r"^[^A-Za-z]*(?:[A-Za-z]{1,3}\s+)?\(?([a-eA-E]|[" + MANGLED
                    + r"])\s*[-.,)]\s+(\S.*)$")
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
# A comma is a separator here too — `a, It has low electric resistance…` runs to
# 78 lines in one physiology book alone.
INLINE = re.compile(r"(?<=\s)([a-e" + MANGLED + r"])\s*[-.,]\s+(?=[A-Z(])")

# How a question's stem ends: the punctuation that introduces its options. A
# mangled label carrying this is a lost question number, not an option.
STEM_TAIL = re.compile(r"[:?]\s*$")

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


def clean(line, watermark=None):
    """A line with the watermark taken out, or None if that is all it was.

    With no watermark for this corpus the line is returned untouched, which is
    the whole point of the table above: the default must be to change nothing.
    """
    if watermark is None:
        return line if line.strip() else None
    stripped = watermark.sub(" ", line)
    return stripped if stripped.strip() else None


def options_after(lines, start, stop_number, watermark=None):
    """Read the options following a stem, tolerating watermark gaps.

    Stops at the next question number rather than at the first blank line, which
    is the heart of the fix: the blank lines are the watermark's, not the
    author's, and treating one as the end of the options is what dropped them.
    """
    found = []
    for raw in lines[start:]:
        for piece in split_inline(raw).split("\n"):
            line = clean(piece, watermark)
            if line is None:
                continue

            number = NUMBER.match(line)
            if number and int(number.group(1)) == stop_number:
                return resolve(tidy(found))

            match = OPTION.match(line)
            if match:
                text = match.group(2).strip()
                if match.group(1) in MANGLED:
                    # A mangled glyph at the head of the block, or one carrying
                    # a stem's punctuation, is a question number the scan lost —
                    # not this question's option A. Reading it as an option
                    # files the next question's stem inside this one, which is
                    # a wrong answer rather than a missing one. Decided by
                    # position and by the line's own shape, never by which
                    # glyph it happens to be.
                    if not found:
                        continue
                    if STEM_TAIL.search(text) and len(text) > 40:
                        return resolve(tidy(found))
                found.append([match.group(1), text])
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


LINE_CASES = [
    (
        "two options on one line, second label mangled",
        # DPT HISTO MCQ [Respiratory].pdf p2 — `d.` read as `0.`
        ["a. Mucosa. b. Connective tissue corium.",
         "c. Submucosa., 0. Adventitia."],
        1, {"A": "Mucosa.", "B": "Connective tissue corium.",
            "C": "Submucosa.,", "D": "Adventitia."},
    ),
    (
        "adjacent labels both mangled, on their own lines",
        # DPT HISTO MCQ [Lymphatic System].pdf p2 — `c.`→`6.` then `d.`→`0.`
        ["a. Present under the mucus membrane of the nasopharynx.",
         "b. Covered with keratinized stratified squamous epithelium.",
         "6. Mucous glands open into the bases of crypts.",
         "0. Lymphatic tissue includes lymphatic nodules and diffuse tissue."],
        12, {"A": "Present under the mucus membrane of the nasopharynx.",
             "B": "Covered with keratinized stratified squamous epithelium.",
             "C": "Mucous glands open into the bases of crypts.",
             "D": "Lymphatic tissue includes lymphatic nodules and diffuse tissue."},
    ),
    (
        "comma for the separator",
        # DPT BOOK Physio MCQ [104][2022].pdf p1 — 78 lines set `a, text`
        ["a, It has low electric resistance of the membrane at the discs",
         "b. It forms true syncytium .",
         "c, It obeys the all or none law .",
         "0. there is almost a special capillary for each muscle fiber ."],
        3, {"A": "It has low electric resistance of the membrane at the discs",
            "B": "It forms true syncytium .",
            "C": "It obeys the all or none law .",
            "D": "there is almost a special capillary for each muscle fiber ."},
    ),
    (
        "a mangled question number is not the next question's option A",
        # EOY Anatomy MCQ by Dr.Jalal [Thorax].pdf p9 — the number reads `@)`.
        # Nothing distinguishes it from a mangled label except position and the
        # stem's own colon, and calling it option A would file the next
        # question's stem inside this one.
        ["a. the first joins the brachial plexus.",
         "b. the lower five are atypical.",
         "@) Regarding the heart; mark the correct statement, choosing one only:",
         "a. It lies behind the sternum."],
        99, {"A": "the first joins the brachial plexus.",
             "B": "the lower five are atypical."},
    ),
    (
        "a mangled label leading the block is declined, not guessed",
        # Same shape, nothing yet read: which question it belongs to is
        # unknowable, so it is left out rather than filed under A.
        ["©) Which of the following is a typical intercostal nerve:",
         "a. The first.",
         "b. The seventh."],
        99, {"A": "The first.", "B": "The seventh."},
    ),
]


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

    # The cases above exercise `resolve`. These exercise the step before it —
    # whether a mangled label is recognised as a label at all. `resolve` was
    # always correct for these; nothing reached it, because an anchored
    # `[a-eA-E]` never saw the line. Every one is a real line from a scanned
    # paper, cited where it came from.
    for name, lines, stop, expected in LINE_CASES:
        out = options_after(lines, 0, stop)
        ok = out == expected
        print(f"{'PASS' if ok else 'FAIL'}  {name}")
        if not ok:
            print(f"        wanted {expected}")
            print(f"        got    {out}")
        failed += 0 if ok else 1
    failed += 0 if ok else 1

    # A corpus with no watermark profile must come through untouched. This is
    # the destructive case: `P` and `y` are the P wave and the y descent, and
    # stripping them leaves a sentence that still parses, still reads as
    # English, and is now wrong — with nothing to distinguish the damage from a
    # source that never said it.
    medical = [
        "It is initiated by the P wave of the ECG",
        "d- The normal P50 for human is 27 mmHg",
        "The y descent follows the v wave",
        "a- P-wave.",
        "PaO2 and PaCO2 are measured on the same sample",
    ]
    for line in medical:
        got = clean(line, WATERMARKS.get("no-such-module"))
        ok = got == line
        print(f"{'PASS' if ok else 'FAIL'}  untouched with no profile: {line[:44]!r}")
        failed += 0 if ok else 1

    # And a real profile, once one is registered, still does its job.
    # Synthetic here rather than any real corpus's regex, because WATERMARKS
    # starts empty for this toolchain — this proves the `clean()` mechanism
    # itself works, independent of which corpus later fills a profile in.
    synthetic = re.compile(r"(?<![A-Za-z])WMARK(?![A-Za-z])")
    got = clean("WMARK    a- Subclavian vein.", synthetic)
    ok = got is not None and got.strip().startswith("a- Subclavian")
    print(f"{'PASS' if ok else 'FAIL'}  a registered profile still strips its own watermark")
    failed += 0 if ok else 1

    return failed


def main():
    if "--self-test" in sys.argv:
        sys.exit(1 if self_test() else 0)
    dry = "--dry-run" in sys.argv
    module, _ = asu_module.parse_module(sys.argv[1:])
    if module not in WATERMARKS:
        print(f"no watermark profile for {module!r}; lines pass through untouched", file=sys.stderr)
    watermark = WATERMARKS.get(module)
    bank_path, pagetext_dir = paths(module)
    bank = json.load(open(bank_path, encoding="utf-8"))
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
                path = os.path.join(pagetext_dir, f"{source}.json")
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
                line = clean(raw, watermark)
                if not line:
                    continue
                number = NUMBER.match(line)
                if number and int(number.group(1)) == where["number"]:
                    found = options_after(lines, position + 1, where["number"] + 1, watermark)
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

    # Naming the cause matters more than the count: the two corpora lose options
    # for different reasons, and a report that blamed a watermark 104 does not
    # have would send the next reader looking for one.
    cause = ("publisher watermark ('ViP', 'Ac', 'ad') interleaved with the options, "
             "leaving blank lines that ended a parse assuming options are contiguous"
             if watermark is not None else
             "OCR replacing option labels with look-alike glyphs ('0', '6', '\u00a2', "
             "'\u00a9', '\u00ae', '\u20ac', '@'); the letter is recovered from the "
             "label's position in the sequence, never from its shape")
    bank["optionRepair"] = {
        "module": module,
        "cause": cause,
        "rowsRepaired": repaired,
        "optionsRecovered": gained,
        "stillUnderFour": still_short,
        "note": "Re-read from cached page text. No page was re-rendered and no OCR was re-run.",
    }

    print(f"repaired {repaired} rows, recovered {gained} options, "
          f"{still_short} still under four, {unchanged} unchanged")
    if not dry:
        with open(bank_path, "w", encoding="utf-8") as fh:
            json.dump(bank, fh, indent=1, ensure_ascii=False)
        print(f"written -> {bank_path}")


if __name__ == "__main__":
    main()
