#!/usr/bin/env python3
"""Two-sided coverage of every tested concept, per module.

The validator's coverage rule is a union: a question's main concept counts as
covered by article A if A sits in the concept's own `article_ids` OR the concept
sits in A's `related_concepts`, and A is in the question's `library_ids`. The
concept side of that union is written by build-article-links.ts from term
overlap, so it can pass on a heuristic alone. The publish gate (2026-08-23)
requires the TWO-SIDED link: the article names the concept back, and a reader
agrees it teaches it.

    python3 scripts/kasr/check-two-sided-coverage.py            # all five modules
    python3 scripts/kasr/check-two-sided-coverage.py "101 ISK" --list

`--list` prints every tested concept whose only link is concept-side, with its
label and the article ids it points at, so a reading lane can work the list.
"""
import collections
import glob
import re
import sys

ROOT = 'docs/Kasr-Source-Imports'
SLUGS = {'101 ISK': '101-ISK', '102 INT': '102-INT', '103 BMS': '103-BMS', '104 CPS': '104-CPS', '108 INT': '108-INT'}


def parse(path):
    text = open(path, encoding='utf-8').read()
    out = []
    for block in re.split(r'^# Item\s*$', text, flags=re.M)[1:]:
        block = block.split('\n---\n')[0]
        out.append(dict(re.findall(r'^## (\S+)\s*\n(.*?)(?=^## |\Z)', block, flags=re.S | re.M)))
    return out


def ids(value):
    return [x.strip() for x in re.split(r'[|;\n]', (value or '').replace('[clear]', '')) if x.strip()]


def check(module, list_them=False):
    slug = SLUGS[module]
    concept_side, labels = {}, {}
    for path in glob.glob(f'{ROOT}/concept/{slug}-*.md'):
        for row in parse(path):
            cid = row.get('id', '').strip()
            if not cid:
                continue
            concept_side.setdefault(cid, set()).update(ids(row.get('article_ids')))
            if row.get('label'):
                labels[cid] = row['label'].strip()
    article_side = collections.defaultdict(set)
    for path in glob.glob(f'{ROOT}/article/{slug}-*.md'):
        for row in parse(path):
            for cid in ids(row.get('related_concepts')):
                article_side[cid].add(row.get('id', '').strip())
    tested = set()
    for path in glob.glob(f'{ROOT}/question/{slug}-*.md') + glob.glob(f'{ROOT}/written/{slug}-*.md'):
        for row in parse(path):
            tested.update(ids(row.get('main_concept')))
    both = [c for c in tested if concept_side.get(c) and article_side.get(c)]
    concept_only = [c for c in tested if concept_side.get(c) and not article_side.get(c)]
    article_only = [c for c in tested if not concept_side.get(c) and article_side.get(c)]
    none = [c for c in tested if not concept_side.get(c) and not article_side.get(c)]
    print(f'{module}: tested {len(tested)} | two-sided {len(both)} | concept-side only {len(concept_only)} '
          f'| article-side only {len(article_only)} | no link {len(none)}')
    if list_them:
        for cid in sorted(concept_only):
            print(f'  {cid}  {labels.get(cid, "?")[:60]:60}  -> {" | ".join(sorted(concept_side[cid]))}')
        for cid in sorted(none):
            print(f'  {cid}  {labels.get(cid, "?")[:60]:60}  -> (no link at all)')
    return len(concept_only) + len(none)


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    list_them = '--list' in sys.argv
    modules = args or list(SLUGS)
    open_total = sum(check(m, list_them) for m in modules)
    sys.exit(1 if open_total else 0)
