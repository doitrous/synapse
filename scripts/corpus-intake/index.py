#!/usr/bin/env python3
"""Render the manifest as something a person can read and check."""
import collections, json, os
REPO = "/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse"
SRC = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")
OUT = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/README.md")
d = json.load(open(SRC)); s = d["sources"]
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
for mod in ["101 ISK","102 INT","103 BMS","104 CPS","108 INT"]:
    rows=[x for x in s if x["moduleId"]==mod]
    c=collections.Counter(x["sourceCategory"] for x in rows)
    w(f"| `{mod}` | {len(rows)} | {c['Orientation']} | {c['EOM']} | {c['EOY']} | {c['Baqoon']} "
      f"| {c['Department Book']} | {c['Department Questions']} | {c['Practical']} |")
sec=[x for x in s if x["secondaryModule"]]
w(f"\nSecondary modules: {len(sec)} files across "
  + ", ".join(f"`{k}` ({v})" for k,v in sorted(collections.Counter(x['secondaryModule'] for x in sec).items())) + ".")
xm=[x for x in s if x["crossModulePractical"]]
w(f"\nCross-module practical folder: {len(xm)} files.")
w("\n## Processing state\n")
c=collections.Counter(x["processingStatus"] for x in s)
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
w("\n## Year-code conflicts\n")
conf=[x for x in s if x["yearConflict"]]
w(f"{len(conf)} filenames carry a batch code and a calendar year that disagree. "
  "Both are kept; neither is overwritten.\n")
w("| Batch | Implies | Calendar label | Δ | File |")
w("|--:|--:|--:|--:|---|")
for x in sorted(conf, key=lambda y: y["yearConflict"]["differenceYears"]):
    c2=x["yearConflict"]
    w(f"| {c2['batchCode']} | {c2['batchImpliesYear']} | {c2['calendarLabel']} | {c2['differenceYears']:+d} | `{x['fileName'][:58]}` |")
plus=sum(1 for x in conf if x["yearConflict"]["differenceYears"]>0)
w(f"\n{plus} of {len(conf)} differ by **+1 year**. That is the pattern you would see if the "
  "batch code named the year a cohort *entered* and the calendar label the year they *sat* "
  "the paper. Until an owner settles which is authoritative, nothing here collapses them — "
  "see §8 of [the plan](../../medical-library-program/KASR-SOURCE-EXTRACTION-PLAN.md).")
open(OUT,"w").write("\n".join(L)+"\n")
print("wrote", OUT)
