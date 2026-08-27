"""Keyword rules mapping a question stem onto a leaf of a module's subject tree.

Copied from `scripts/kasr/extract/leaves.py` as a shape, emptied of Kasr's
`TREE_101`/`TREE_104` keyword tables — both are hand-built vocabularies read
off Kasr's own department-book chapter headings and mean nothing against Ain
Shams's corpus. See that file for the full rationale behind the approach
(approximate scoring, one table per module because a module's own chapters
decide its vocabulary, `leaf=None` where a book has only two levels).

Unlike Kasr's copy, there is no default tree to fall back to — `TREE_101`
existed because 101 was the first module and every early caller assumed it.
Ain Shams has no such caller, so `classify()` and `tree_for()` return an
empty result for an unknown module rather than silently scoring against
whichever module happened to be filled in first, which would file a stem
under the wrong module's vocabulary exactly the way this file's own
docstring in Kasr warns against for 104 scored against 101's tree.

Fill `TREES["<module>"]` in as a module's leaves are read off its own
`docs/Ain-Shams-Source-Imports/academic/<slug>-structure.md`.
"""

# >>> FILL IN PER MODULE <<<
# One entry per module: a list of (subject, chapter, leaf, keywords) tuples,
# `leaf` is None where the book prints only two levels.
TREES: dict[str, list[tuple[str, str, str | None, list[str]]]] = {}

# Module-level `TREE`, kept for call-site compatibility with Kasr's copy —
# `bank.py` reads `leaves.TREE` directly rather than going through a function.
# Starts empty rather than bound to any one module's tree, unlike Kasr's copy
# (bound to `TREE_101` at import), because there is no first module here for
# every caller to have assumed. `use(module)` points it at that module's
# tree — or at an empty list, honestly, for a module with none yet.
TREE: list[tuple[str, str, str | None, list[str]]] = []


def use(module):
    """Point the module-level `TREE` at `module`'s leaves and return it."""
    global TREE
    TREE = TREES.get(module, [])
    return TREE


def tree_for(module):
    return TREES.get(module, [])


def classify(text, module=None):
    if not module or module not in TREES:
        return (None, None, None)
    low = text.lower()
    best, score = None, 0
    for subj, chap, leaf, keys in TREES[module]:
        s = sum(1 for k in keys if k in low)
        if s > score:
            best, score = (subj, chap, leaf), s
    return best if best else (None, None, None)
