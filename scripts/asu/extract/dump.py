#!/usr/bin/env python3
"""Print the questions dumped by an extraction pass.

Copied from `scripts/kasr/extract/dump.py`, which hardcodes the bare
`scripts/kasr/questions.json` — a per-run, unprefixed result path
(`SHARED-TOOLCHAIN.md` §1 names it as exactly the kind of file that collides
between lanes). This version takes the path as an argument, so it points at
`scripts/asu/extract/<module-slug>/questions.json` — module-namespaced from
day one.

    python3 scripts/asu/extract/dump.py scripts/asu/extract/ASU-CVS/questions.json
"""
import json
import re
import sys

path = sys.argv[1] if len(sys.argv) > 1 else None
if not path:
    raise SystemExit('usage: dump.py <path to questions.json>')

d = json.load(open(path))
qs = d['questions']


def norm(t):
    return re.sub(r'\s+', ' ', t).strip()


for i, q in enumerate(qs):
    print(f"[{i}] {q['category']}|{q.get('year')}|{q.get('section') or '-'}|p{q.get('page')}|n{q.get('number')}|m{q.get('marks')}|{q['file'][:34]}")
    print('    ' + norm(q['text']))
