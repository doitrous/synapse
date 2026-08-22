#!/usr/bin/env python3
"""Per-university traceability of every Kasr Year 1 record.

Omar's order (2026-08-23): a shared record must say, for each university and
each of its years, that it belongs — never "empty means everyone". For Kasr
Year 1 every concept, article, question, written and practical record must
carry universities=kau, years=KAU_Y1, module=<module id>, a Kasr module_subject
path, exam_weight_by_year keyed by a Kasr sitting year, and a university_notes
line starting `kau:`. Sparse update rows are judged only on the fields they
name (they patch a record that already carries the rest).

    python3 scripts/kasr/check-university-tags.py            # summary per module and kind
    python3 scripts/kasr/check-university-tags.py --list     # every failing record id with its missing fields
"""
import glob
import re
import sys

ROOT = 'docs/Kasr-Source-Imports'
MODULES = {'101-ISK': '101 ISK', '102-INT': '102 INT', '103-BMS': '103 BMS', '104-CPS': '104 CPS', '108-INT': '108 INT'}
KINDS = ('concept', 'article', 'question', 'written', 'practical')
FULL_FIELDS = ('universities', 'years', 'module', 'module_subject', 'exam_weight_by_year', 'university_notes')


def parse(path):
    text = open(path, encoding='utf-8').read()
    for block in re.split(r'^# Item\s*$', text, flags=re.M)[1:]:
        block = block.split('\n---\n')[0]
        yield dict(re.findall(r'^## (\S+)\s*\n(.*?)(?=^## |\Z)', block, flags=re.S | re.M))


def is_sparse(row):
    return bool(row.get('id', '').strip()) and ('definition' not in row and 'sections' not in row and 'question' not in row and 'written_parts' not in row and 'lab_questions' not in row and 'mark_scheme' not in row)


def check(row, module):
    missing = []
    v = lambda k: (row.get(k) or '').strip()
    if 'kau' not in [x.strip() for x in re.split(r'[|;\n]', v('universities'))]:
        missing.append('universities=kau')
    yrs = v('years') or v('learner_years')
    if not (re.search(r'\bKAU_Y\d\b', yrs) or re.fullmatch(r'(Year\s*)?[1-5]', yrs.strip())):
        missing.append('years=KAU_Yn')
    if v('module') != module and module not in [x.strip() for x in re.split(r'[|;\n]', v('modules'))]:
        missing.append('module')
    if not v('module_subject').startswith(module):
        missing.append('module_subject(kau path)')
    if not re.search(r'\bKAU_Y\d\s*=|20\d\d', v('exam_weight_by_year')):
        missing.append('exam_weight_by_year(KAU_Yn=)')
    if not re.search(r'^kau\s*:', v('university_notes'), flags=re.M):
        missing.append('university_notes kau:')
    return missing


def main():
    list_them = '--list' in sys.argv
    total_bad = 0
    print(f"{'module':8} {'kind':9} {'records':>7} {'complete':>8} {'sparse':>6}  missing-field counts")
    for slug, module in MODULES.items():
        for kind in KINDS:
            files = glob.glob(f'{ROOT}/{kind}/{slug}-*.md')
            n = ok = sparse = 0
            counts = {}
            for path in files:
                for row in parse(path):
                    if not row:
                        continue
                    n += 1
                    if is_sparse(row):
                        sparse += 1
                        continue
                    miss = check(row, module)
                    if miss:
                        for m in miss:
                            counts[m] = counts.get(m, 0) + 1
                        if list_them:
                            print(f'  {path.split("/")[-1]}  {row.get("id", "?").strip()}  -> {", ".join(miss)}')
                    else:
                        ok += 1
            if n:
                bad = n - sparse - ok
                total_bad += bad
                summary = ', '.join(f'{k} {v}' for k, v in sorted(counts.items(), key=lambda x: -x[1]))
                print(f'{module:8} {kind:9} {n:7} {ok:8} {sparse:6}  {summary}')
    sys.exit(1 if total_bad else 0)


if __name__ == '__main__':
    main()
