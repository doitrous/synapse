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
    """`(losses, notes)` — only a loss should stop a merge.

    The distinction matters because this runs in CI and an over-eager failure
    blocks every lane. A batch that has grown past what its ledger records is a
    stale ledger, not a missing batch, and a module whose ledger keeps its
    inventory in a shape this cannot read has no protection but has lost
    nothing. Both are worth saying and neither is worth blocking on.
    """
    module = os.path.basename(ledger_path).replace("-coverage.md", "")
    expected = expectations(ledger_path)
    if expected is None:
        return [], [], ["%s: no 'Authored so far' table in its ledger, so **every batch "
                        "in this module can be deleted without this check noticing**. "
                        "Add the table and its batches become protected." % module]
    if not expected:
        return [], [], ["%s: its authored table is empty, so nothing in this module is "
                        "protected. If it has batches, the ledger is stale." % module]

    losses, notes = [], []
    for relative, count in expected:
        path = os.path.join(IMPORTS, relative)
        if not os.path.exists(path):
            losses.append("%s: %s is in the ledger and MISSING from the tree "
                          "(%d items)" % (module, relative, count))
            continue
        found = items_in(path)
        if found < count:
            losses.append("%s: %s holds %d items, ledger says %d — %d short"
                          % (module, relative, found, count, count - found))
        elif found > count:
            notes.append("%s: %s holds %d items, ledger says %d — the batch grew "
                         "and the ledger was not regenerated"
                         % (module, relative, found, count))
    return losses, notes, []


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
        losses, notes, unguarded = check(path)
    if (len(losses) == 1 and "MISSING from the tree" in losses[0]
            and not notes and not unguarded):
        print("PASS  probe ledger names a batch that does not exist and the "
              "check reports it as a loss")
        return 0
    print("FAIL  expected 1 loss, 0 notes, 0 unguarded; got %d/%d/%d: %s"
          % (len(losses), len(notes), len(unguarded), losses + notes + unguarded))
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

    losses, notes, unguarded = [], [], []
    for ledger in ledgers:
        found, noted, bare = check(ledger)
        losses += found
        notes += noted
        unguarded += bare

    for loss in losses:
        print("  LOSS       %s" % loss)
    # Its own severity because "note" read as cosmetic and it is not: a module
    # with no table is one where every batch can be deleted and this check will
    # say nothing. Verified by hiding two of 102 INT's written batches — both
    # deletions passed. It still does not fail the build, because the module has
    # lost nothing and blocking six lanes over a ledger's shape would be the
    # over-eager failure this script was already corrected for once.
    for bare in unguarded:
        print("  UNGUARDED  %s" % bare)
    for note in notes:
        print("  note       %s" % note)
    print("%d ledger(s) checked, %d loss(es), %d unguarded module(s), %d note(s)"
          % (len(ledgers), len(losses), len(unguarded), len(notes)))
    # Only a loss fails. A stale ledger and an unreadable inventory are both
    # worth printing and neither is a batch going missing, which is the one
    # thing this exists to stop.
    return 1 if losses else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
