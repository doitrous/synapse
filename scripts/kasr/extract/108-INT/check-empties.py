#!/usr/bin/env python3
"""Whether a deliberately-empty column says so in the form its parser reads.

    python3 scripts/kasr/extract/108-INT/check-empties.py
    python3 scripts/kasr/extract/108-INT/check-empties.py --self-test

`[clear]` is a sentinel to `optionalList()` and four literal characters to
`text()`. So the same intent — "considered, and there is nothing here" — has two
different correct spellings, and each is silently wrong in the other's column:

    text() column, empty body     -> undefined -> null   correct
    text() column, `[clear]`      -> the string "[clear]" stored
    optionalList(), `[clear]`     -> []                  correct
    optionalList(), empty body    -> null

Both wrong forms pass `medical:batch`, pass `medical:simulate`, and satisfy the
field audit, because a field holding `"[clear]"` *has a value* and `hasValue` is
all the audit asks. That is what makes this worth a script: an empty field looks
unfinished and invites a fix, while a field holding a sentinel nothing reads
looks finished and does not.

This module had both faults and neither was visible in the batch files. Its two
concept batches were written by different agents and had diverged from each
other — identical intent stored as `null` in one and `[]` in the other — which
is the shape to expect whenever more than one author works to one brief.

**The self-test is the point.** A checker that reports zero is worth nothing
unless it can be shown to report non-zero, so `--self-test` runs the same code
over a batch built to contain exactly one of each fault and fails if it does not
find them. Run it before believing a clean report.

Column classification is read out of `conceptImport.ts` and `bulkImport.ts`
rather than kept as a list here, because a hand-kept list drifts from the
parsers it describes and drifts silently.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
IMPORTS = os.path.join(REPO, "docs/Kasr-Source-Imports")
MODULE_PREFIX = "108-int"

CONCEPT_KINDS = {"concept"}
BATCH_DIRS = ["concept", "article", "practical", "question", "written"]


def parsers(path):
    """Columns that reach `optionalList()` and columns that reach `text()`.

    Two call shapes, and missing the second is a false clean report rather than
    an error. `conceptImport.ts` writes `text(values.subtopic)`; `bulkImport.ts`
    writes `text('subtopic')`, closing over `values` instead of taking it. An
    earlier version of this script matched only the first and so classified
    **zero** text columns outside concepts — which made the sentinel check
    vacuously pass for all 17 articles and every question. It reported a clean
    zero because it had nothing to look at.

    That is why `main()` refuses to report a clean run for a batch kind whose
    text-column set came back empty: a check that cannot fail must say so
    rather than pass.
    """
    with open(os.path.join(REPO, path), encoding="utf-8") as fh:
        src = fh.read()
    lists = {col for _, col in re.findall(r"(\w+):\s*optionalList\(values\.(\w+)\)", src)}
    lists |= set(re.findall(r"optionalList\(\s*['\"](\w+)['\"]\s*\)", src))
    texts = {col for _, col in re.findall(r"(\w+):\s*text\(values\.(\w+)\)", src)}
    texts |= set(re.findall(r"\btext\(\s*['\"](\w+)['\"]\s*\)", src))
    # A column read by both in different branches is ambiguous, and guessing
    # which branch a given batch takes is exactly the reasoning this script
    # exists to replace. Report it rather than pick.
    return lists, texts, lists & texts


CONCEPT_LISTS, CONCEPT_TEXTS, CONCEPT_BOTH = parsers("src/data/conceptImport.ts")
OTHER_LISTS, OTHER_TEXTS, OTHER_BOTH = parsers("src/data/bulkImport.ts")


def records(text):
    for chunk in re.split(r"^\s*---\s*$", text, flags=re.M):
        if "# Item" in chunk:
            yield chunk


def columns(record):
    for match in re.finditer(r"^## (\w+)\n(.*?)(?=^## |\Z)", record, re.M | re.S):
        yield match.group(1), match.group(2).strip()


def scan(text, kind):
    lists, texts = ((CONCEPT_LISTS, CONCEPT_TEXTS) if kind in CONCEPT_KINDS
                    else (OTHER_LISTS, OTHER_TEXTS))
    sentinel_in_text, blank_in_list = [], []
    for record in records(text):
        rid = next((v for c, v in columns(record) if c == "id"), "?")
        for col, value in columns(record):
            if col in texts and value == "[clear]":
                sentinel_in_text.append((rid, col))
            elif col in lists and value == "":
                blank_in_list.append((rid, col))
    return sentinel_in_text, blank_in_list


def batches():
    for kind in BATCH_DIRS:
        directory = os.path.join(IMPORTS, kind)
        if not os.path.isdir(directory):
            continue
        for name in sorted(os.listdir(directory)):
            if name.lower().endswith(".md") and name.lower().startswith(MODULE_PREFIX):
                yield kind, os.path.join(directory, name)


PROBE = """# Item
## id
CON-PROBE-000000000000
## label
A probe record, not content
## pitfalls
[clear]
## aliases

## definition
Built to contain exactly one fault of each kind.
"""


def self_test():
    """The negative control: prove the checker can fail before trusting a zero."""
    sentinel, blank = scan(PROBE, "concept")
    ok = True
    if len(sentinel) != 1:
        print("FAIL  expected 1 sentinel-in-text-column, got %d" % len(sentinel))
        ok = False
    if len(blank) != 1:
        print("FAIL  expected 1 blank-in-list-column, got %d" % len(blank))
        ok = False
    if ok:
        print("PASS  probe: sentinel-in-text 1, blank-in-list 1 — the checker can fail")
        print("      `pitfalls` is read by text() and `aliases` by optionalList(),")
        print("      which is the pair a hand-written list gets wrong most often.")
    return 0 if ok else 1


def main(argv):
    if "--self-test" in argv:
        return self_test()

    if CONCEPT_BOTH or OTHER_BOTH:
        print("ambiguous columns, classify by hand: %s"
              % ", ".join(sorted(CONCEPT_BOTH | OTHER_BOTH)))

    # A classification that came back empty means the check below cannot fail,
    # and a check that cannot fail must not be allowed to report success.
    for label, lists, texts in (("concept", CONCEPT_LISTS, CONCEPT_TEXTS),
                                ("everything else", OTHER_LISTS, OTHER_TEXTS)):
        if not lists or not texts:
            print("classification for %s came back empty (%d list, %d text) — the "
                  "parser call shape has changed and this check is blind"
                  % (label, len(lists), len(texts)))
            return 2

    total_sentinel = total_blank = 0
    for kind, path in batches():
        with open(path, encoding="utf-8") as fh:
            sentinel, blank = scan(fh.read(), kind)
        total_sentinel += len(sentinel)
        total_blank += len(blank)
        if sentinel or blank:
            print("%s" % os.path.relpath(path, REPO))
            for rid, col in sentinel:
                print("   sentinel in a text column   %-34s %s" % (col, rid))
            for rid, col in blank:
                print("   blank in a list column      %-34s %s" % (col, rid))

    print("%d sentinel-in-text, %d blank-in-list across %d batches"
          % (total_sentinel, total_blank, len(list(batches()))))
    print("classified from the parsers: %d list / %d text columns for concepts, "
          "%d / %d elsewhere"
          % (len(CONCEPT_LISTS), len(CONCEPT_TEXTS), len(OTHER_LISTS), len(OTHER_TEXTS)))
    return 1 if (total_sentinel or total_blank) else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
