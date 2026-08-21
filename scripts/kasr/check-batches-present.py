#!/usr/bin/env python3
"""Whether the batches a module's coverage ledger claims still exist.

    python3 scripts/kasr/check-batches-present.py                    # every ledger
    python3 scripts/kasr/check-batches-present.py "108 INT"          # one module
    python3 scripts/kasr/check-batches-present.py --self-test

Every other check in this repository reads the batches that are there. None of
them can notice one that is gone, and a missing batch satisfies all of them at
once: `medical:batch` inspects what it is given, `medical:citations` finds no
unresolvable token in a file that does not exist, and the field audit cannot
report a blank field on an absent record. **A file that no longer exists is not
a file that fails.**

Two batches were deleted from `main` by a commit about something else, in a
different module, mentioning neither. Both were merged and both were green. The
loss was found because a shell glob stopped matching — the batch loop that ran
minutes later reported every batch it inspected as passing, and was telling the
truth.

The fix is an expectation held outside the tree being checked. Each module's
`coverage/<MODULE>-coverage.md` already prints an *Authored so far* table naming
every batch and its item count, generated when the module was built and
committed alongside it. That table is the only record in the repository of what
*should* be there, so this reads it back and fails when reality is short of it.

It compares counts as well as paths, because a batch truncated to a third of
itself is the same failure as one deleted and is harder to see. Counting is the
`---`-separated-chunks-containing-`# Item` rule the ledgers use, so the two
agree by construction.

**This cannot tell you the ledger is right, and it fails in both directions.**

A ledger regenerated *after* a loss records the loss as normal, and the missing
rows stop being missing. So **run this before regenerating a ledger, not after**
— once regenerated, the shortfall is gone as a fact and not only as content.

The converse happened too, and is subtler. A ledger regenerated from a working
tree records what is in that tree, committed or not. `101 ISK`'s ledger went
from 1,123 claims to 1,134 in a commit that touched **only the two coverage
files** and neither batch, so eleven claims and three citations were counted at
regeneration and never committed. The ledger is now the only evidence they were
ever written. That is not a deletion and this script cannot tell the two apart:
it reports a disagreement between a record and a tree, and which one is wrong is
a question for whoever owns the module.

Both failures have one cause — the ledger and the batches were written at
different moments. They are committed together for that reason, and regenerating
one without the other is what breaks the guarantee.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
IMPORTS = os.path.join(REPO, "docs/Kasr-Source-Imports")
COVERAGE = os.path.join(IMPORTS, "coverage")

ROW = re.compile(r"^\|\s*`([^`]+)`\s*\|\s*(\d+)\s*\|\s*$", re.M)


def expectations(ledger_path):
    """`(batch path, item count)` for every row of the ledger's authored table."""
    with open(ledger_path, encoding="utf-8") as fh:
        text = fh.read()
    section = re.search(r"^## Authored so far\s*$(.*?)^## ", text, re.M | re.S)
    if not section:
        return None
    return [(m.group(1), int(m.group(2))) for m in ROW.finditer(section.group(1))]


def items_in(path):
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    return sum(1 for chunk in re.split(r"^\s*---\s*$", text, flags=re.M)
               if "# Item" in chunk)


def check(ledger_path):
    module = os.path.basename(ledger_path).replace("-coverage.md", "")
    expected = expectations(ledger_path)
    if expected is None:
        return ["%s: ledger has no 'Authored so far' table — nothing to check "
                "against, which is not the same as nothing being wrong" % module]
    if not expected:
        return ["%s: ledger's authored table is empty; if this module has "
                "batches, the ledger is stale" % module]

    problems = []
    for relative, count in expected:
        path = os.path.join(IMPORTS, relative)
        if not os.path.exists(path):
            problems.append("%s: %s is in the ledger and MISSING from the tree "
                            "(%d items)" % (module, relative, count))
            continue
        found = items_in(path)
        if found != count:
            problems.append("%s: %s holds %d items, ledger says %d"
                            % (module, relative, found, count))
    return problems


SELF_TEST_LEDGER = """# X — source coverage

## Authored so far

| Batch | Items |
| --- | --- |
| `concept/definitely-not-a-real-batch.md` | 7 |

## Something else
"""


def self_test():
    """Prove the check can fail before trusting a clean run."""
    import tempfile
    with tempfile.TemporaryDirectory() as tmp:
        path = os.path.join(tmp, "SELFTEST-coverage.md")
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(SELF_TEST_LEDGER)
        problems = check(path)
    if len(problems) == 1 and "MISSING from the tree" in problems[0]:
        print("PASS  probe ledger names a batch that does not exist and the "
              "check reports it")
        return 0
    print("FAIL  expected 1 missing-batch problem, got %d: %s"
          % (len(problems), problems))
    return 1


def main(argv):
    if "--self-test" in argv:
        return self_test()

    wanted = [a for a in argv if not a.startswith("-")]
    if not os.path.isdir(COVERAGE):
        print("no coverage directory at %s" % os.path.relpath(COVERAGE, REPO))
        return 2

    ledgers = sorted(os.path.join(COVERAGE, n) for n in os.listdir(COVERAGE)
                     if n.endswith("-coverage.md")
                     and (not wanted or any(w.replace(" ", "-").lower()
                                            in n.lower() for w in wanted)))
    if not ledgers:
        # No ledger means no expectation, and reporting a clean run here would
        # be the same vacuous pass this script exists to prevent.
        print("no coverage ledger matched %s — nothing was checked"
              % (wanted or "anything"))
        return 2

    problems = []
    for ledger in ledgers:
        problems += check(ledger)

    for problem in problems:
        print("  %s" % problem)
    print("%d ledger(s) checked, %d problem(s)" % (len(ledgers), len(problems)))
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
