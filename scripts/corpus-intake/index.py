#!/usr/bin/env python3
"""Render the manifest as something a person can read and check."""
import collections
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
SRC = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")
OUT = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/README.md")

d = json.load(open(SRC))
s = d["sources"]
L = []
w = L.append

w("# Kasr Alainy — Year 1 source manifest\n")
w(f"Generated {d['generatedOn']} from `{d['corpusRoot']}`. "
  f"**{d['count']} files.** Machine-readable copy: [`kasr-y1-sources.json`](kasr-y1-sources.json).\n")
w("Every file in the corpus has a row. A row is the only place a later stage should\n"
  "learn a file's module, exam type, priority or year — so that two stages cannot\n"
  "quietly disagree about the same paper.\n")

w("## The owner's declarations\n")
w("`NOTE … NOTE` text on a folder is an instruction, not a filename. Empty\n"
  "subject folders say the same thing implicitly.\n")
w("| Module | How it is stated | What it says |")
w("|---|---|---|")
for x in d["moduleSubjectDeclarations"]:
    w(f"| `{x['moduleId'] or '—'}` | {x['kind']} | {x['instruction']} |")

w("\n## By module\n")
w("| Module | Files | Orientation | EOM | EOY | Baqoon | Dept book | Dept questions | Practical |")
w("|---|--:|--:|--:|--:|--:|--:|--:|--:|")
for mod in ["101 ISK", "102 INT", "103 BMS", "104 CPS", "108 INT"]:
    rows = [x for x in s if x["moduleId"] == mod]
    c = collections.Counter(x["sourceCategory"] for x in rows)
    w(f"| `{mod}` | {len(rows)} | {c['Orientation']} | {c['EOM']} | {c['EOY']} | {c['Baqoon']} "
      f"| {c['Department Book']} | {c['Department Questions']} | {c['Practical']} |")

sec = [x for x in s if x["secondaryModule"]]
w(f"\nSecondary modules: {len(sec)} files across "
  + ", ".join(f"`{k}` ({v})" for k, v in sorted(collections.Counter(x['secondaryModule'] for x in sec).items()))
  + ".")
w(f"\nCross-module practical folder: {sum(1 for x in s if x['crossModulePractical'])} files.")

w("\n## Processing state\n")
c = collections.Counter(x["processingStatus"] for x in s)
w(f"- **{c['ocr_required']}** files have no text layer and must be read by OCR or vision. "
  "A scanned paper that extracts to nothing is not an empty paper.")
w(f"- **{c['pending']}** files have a native text layer.")
w(f"- **{sum(1 for x in s if x.get('duplicateOf'))}** files share their bytes with another path.")

w("\n## Excluded\n")
w("| File | Reason |")
w("|---|---|")
for x in s:
    if x["exclusionReason"]:
        w(f"| `{x['fileName']}` | `{x['exclusionReason']}` |")

w("\n## Which year a paper was sat\n")
conf = [x for x in s if x["yearConflict"]]
w(f"{len(conf)} filenames carry both a batch code and a calendar year and disagree. Five of\n"
  "those print an exam date in their own header, and in **all five** the calendar label\n"
  "matches the document while the batch code does not:\n")
w("| Batch code | Label on the file | What the document itself says |")
w("|--:|--:|---|")
w("| 197 | 2024 | 14 July 2024 |")
w("| 196 | 2021 | 26/12/2021 |")
w("| 195 | 2022 | 22/09/2022 and 24/9/2022 |")
w("\nSo **the batch code names the cohort, not a year**, and the calendar label is the\n"
  "sitting. `examSittingYear` carries that decision and `examSittingYearSource` says how it\n"
  "was reached, so a later reader can disagree with the call without re-deriving it. The\n"
  "batch code is kept — which cohort sat a paper is a real question — and is used to derive\n"
  "a year only when nothing better is on the file.\n")

by_year = collections.Counter(x["examSittingYear"] for x in s if x["examType"])
w("| Sitting year | Exam papers | How the year was known |")
w("|--:|--:|---|")
for year in sorted((y for y in by_year if y), reverse=True):
    srcs = collections.Counter(
        x["examSittingYearSource"] for x in s if x["examType"] and x["examSittingYear"] == year)
    w(f"| {year} | {by_year[year]} | {', '.join(f'{v} {k}' for k, v in srcs.items())} |")
if by_year.get(None):
    w(f"| — | {by_year[None]} | no year on the file |")

latest = sorted((y for y in by_year if y), reverse=True)[:3]
w(f"\n**The latest three years** are {', '.join(str(y) for y in latest)} — "
  f"{sum(by_year[y] for y in latest)} exam papers.")

open(OUT, "w").write("\n".join(L) + "\n")
print("wrote", OUT)
