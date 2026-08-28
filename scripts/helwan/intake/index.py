#!/usr/bin/env python3
# Copied from scripts/corpus-intake/index.py @ 6b32fa6 (Kasr Alainy
# corpus-intake lane). Rewritten for the Helwan lane's three-year corpus and
# its own required sections (per-module table, per-year totals, text-layer
# counts, duplicates, excluded rows, and the module x subject gap table that
# feeds the Telegram fetch list).
"""Render the Helwan Years 1-3 manifest as something a person can check."""
import collections
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
SRC = os.path.join(REPO, "docs/Helwan-Source-Imports/manifest/helwan-y1-3-sources.json")
OUT = os.path.join(REPO, "docs/Helwan-Source-Imports/manifest/README.md")

MODULES_BY_YEAR = {
    "HU_Y1": ["BMS 101", "BMS 102", "LCS 103", "PSY 104"],
    "HU_Y2": ["INH 201", "Community 202", "NSS 203", "CRS 204"],
    "HU_Y3": ["GIT 301", "URS 303", "FTF 304", "ORL 305"],
}

d = json.load(open(SRC))
s = d["sources"]
L = []
w = L.append


def has(cat_or_sub, needle):
    hay = " ".join(x for x in (cat_or_sub or "",) if x)
    return needle.lower() in hay.lower()


w("# Helwan University — Years 1-3 source manifest\n")
w(f"Generated {d['generatedOn']} from `{d['corpusRoot']}`. "
  f"**{d['count']} files.** Machine-readable copy: "
  f"[`helwan-y1-3-sources.json`](helwan-y1-3-sources.json).\n")
w("Every file in the corpus has a row. A row is the only place a later stage "
  "should learn a file's module, subject, category, exam type or sitting "
  "year, mirroring the Kasr manifest's field names so a Kasr-shaped tool can "
  "read this one.\n")

w("## Per-year totals\n")
w("| Year | Files | Modules |")
w("|---|--:|---|")
for yid, mods in MODULES_BY_YEAR.items():
    n = sum(1 for x in s if x["yearId"] == yid)
    w(f"| `{yid}` | {n} | {', '.join(f'`{m}`' for m in mods)} |")
w(f"| — (no year: corpus-wide index) | {sum(1 for x in s if x['yearId'] is None)} | — |")

w("\n## By module\n")
w("| Module | Year | Files | Dept books | Dept MCQ books | MCQ collections | EOM | EOY | Practical | Core notes |")
w("|---|---|--:|--:|--:|--:|--:|--:|--:|--:|")
for yid, mods in MODULES_BY_YEAR.items():
    for mod in mods:
        rows = [x for x in s if x["moduleLabel"] == mod]
        dept_book = sum(1 for x in rows if x["isDepartmentBook"] and x["bookKind"] == "theoretical")
        dept_mcq = sum(1 for x in rows if x["isDepartmentBook"] and x["bookKind"] == "question")
        mcq = sum(1 for x in rows if x["bookKind"] == "question" and not x["isDepartmentBook"])
        eom = sum(1 for x in rows if x["examType"] == "EOM")
        eoy = sum(1 for x in rows if x["examType"] == "EOY")
        practical = sum(1 for x in rows if has(x["sourceCategory"], "practical") or has(x.get("subfolder"), "practical"))
        core = sum(1 for x in rows if has(x["sourceCategory"], "core notes") or has(x["sourceCategory"], "official course files"))
        w(f"| `{mod}` | `{yid}` | {len(rows)} | {dept_book} | {dept_mcq} | {mcq} | {eom} | {eoy} | {practical} | {core} |")

w("\n## Text-layer state\n")
c = collections.Counter(x["textLayer"] for x in s)
w(f"- **{c['native']}** files carry a usable native text layer (word-forming-character ratio > 0.6).")
w(f"- **{c['ocr-needed']}** files failed that ratio guard (scanned pages, or a text layer that is present but "
  "undecodable) and were OCR'd on their first page for classification.")
w(f"- **{c['none']}** files are images with no text layer at all (OCR'd directly).")
w(f"- **{c['n/a']}** files carry no text-layer concept (`.apkg`, `.csv`, `.md`).")
if c.get("unknown"):
    w(f"- **{c['unknown']}** files could not be probed by any handled path.")

w("\n## Duplicates\n")
dupes = [x for x in s if x.get("duplicateOf")]
w(f"**{len(dupes)}** files share their bytes with another path in the corpus.")
if dupes:
    w("\n| File | Also at |")
    w("|---|---|")
    seen = set()
    for x in dupes:
        key = tuple(sorted([x["corpusRelativePath"]] + x["duplicateOf"]))
        if key in seen:
            continue
        seen.add(key)
        w(f"| `{x['corpusRelativePath']}` | {', '.join(f'`{p}`' for p in x['duplicateOf'])} |")

near = [x for x in s if x.get("nearDuplicateOf")]
w(f"\n**{len(near)}** files are near-duplicates not caught by sha256: same normalised "
  "title (brackets/punctuation/words like \"updated\"/\"copy\" stripped) and the same page "
  "count, but different bytes — a re-upload or re-export. Report only; no row was dropped.")
if near:
    w("\n| File | Near-duplicate of |")
    w("|---|---|")
    seen_near = set()
    for x in near:
        key = tuple(sorted([x["sourceId"]] + x["nearDuplicateOf"]))
        if key in seen_near:
            continue
        seen_near.add(key)
        w(f"| `{x['corpusRelativePath']}` | {', '.join(x['nearDuplicateOf'])} |")

w("\n## Solved/unsolved twins paired\n")
paired = [x for x in s if x.get("pairedWith")]
w(f"**{len(paired)}** files were paired with a solved/unsolved twin by normalised filename "
  "within the same folder (best-effort — a twin using very different wording will not be found).")

w("\n## Name twins\n")
w("Orchestrator ruling 2026-08-22 (urgent): `[Updated]` re-uploads frequently disagree with "
  "the original on `textLayer` (Alexandria found 1,424/2,163 such pairs disagree), so this pass "
  "runs on filename alone — corpus-wide, blind to page count and text layer, since those are "
  "exactly what a re-upload can silently change. Extension, bracketed tags (`[Updated]`, `(1)`, "
  "`[Part.1]`, ...) and the bare words `copy`/`modified` are stripped before matching. "
  "`answer`/`answered`/`unanswered` are deliberately **not** stripped, so a solved copy and its "
  "unsolved twin stay separate name-twin rows (they are already paired above via `pairedWith`). "
  "One preferred copy per group: `textLayer: native` first, then the larger page count, then the "
  "older file-modification time. Report only — `nameTwinOf`/`twinPreferred` are added, no row is "
  "ever dropped or merged.\n")
name_twinned = [x for x in s if x.get("nameTwinOf")]
name_twin_groups = collections.defaultdict(list)
for x in name_twinned:
    name_twin_groups[x["nameTwinOf"]].append(x)
w(f"**{len(name_twinned)}** files fall into **{len(name_twin_groups)}** name-twin groups.")
layer_disagree = sum(
    1 for members in name_twin_groups.values()
    if len({m["textLayer"] for m in members}) > 1
)
w(f"**{layer_disagree}** of those groups disagree with each other on `textLayer`.\n")
w("Caveat: stripping bracketed tags cannot distinguish an `[Updated]` re-upload from genuine "
  "part-numbering (`[Part.1]` / `[Part.2]`), so a few groups below are sequential parts of the "
  "same lecture rather than true duplicates — left in since this pass is report-only.\n")

mismatches = []
for pref_id, members in name_twin_groups.items():
    preferred = next((m for m in members if m["twinPreferred"]), None)
    if not preferred:
        continue
    alpha_first = min(members, key=lambda r: r["fileName"].lower())
    if alpha_first["corpusRelativePath"] != preferred["corpusRelativePath"]:
        mismatches.append((preferred, alpha_first, members))

w(f"**{len(mismatches)}** groups where the preferred copy is not the one a folder reader "
  "would open first (alphabetically-first filename):\n")
w("| Preferred copy | Textlayer | Pages | Folder's first pick | Textlayer | Pages |")
w("|---|---|--:|---|---|--:|")
for preferred, alpha_first, members in mismatches:
    w(f"| `{preferred['corpusRelativePath']}` | {preferred['textLayer']} | {preferred['pageCount'] or '—'} "
      f"| `{alpha_first['corpusRelativePath']}` | {alpha_first['textLayer']} | {alpha_first['pageCount'] or '—'} |")

w("\n## Excluded (administrative)\n")
excl = [x for x in s if x["exclusionReason"] == "excluded-administrative"]
w(f"**{len(excl)}** files are schedules, mark sheets, student-distribution lists, "
  "portfolios/logbooks, or absence lists — administrative, not teaching content.")
by_mod = collections.Counter((x["yearId"], x["moduleLabel"] or "(year-level)") for x in excl)
w("\n| Year | Module | Excluded files |")
w("|---|---|--:|")
for (yid, mod), n in sorted(by_mod.items(), key=lambda kv: (str(kv[0][0]), str(kv[0][1]))):
    w(f"| `{yid}` | `{mod}` | {n} |")

w("\n## University-origin hints\n")
w("Filenames naming another university's material, kept in Helwan's corpus because Helwan "
  "students used it. `universityId` stays `hu`; the hint is carried for the authoring lane to weigh.\n")
hint_counts = collections.Counter()
for x in s:
    for h in (x.get("originUniversityHint") or []):
        hint_counts[h] += 1
if hint_counts:
    w("| Origin hint | Files |")
    w("|---|--:|")
    for h, n in sorted(hint_counts.items(), key=lambda kv: -kv[1]):
        w(f"| {h} | {n} |")
else:
    w("None found.")

w("\n## Sources-of-links, not content\n")
w("- `Year 3/URS 303/Administration/00 Source availability note.md` — records that the supplied "
  "channel returned no schedule/marks/orientation results for URS 303; a note, not a source to extract.")
w("- `Year 2/00 Telegram Channel Index.md` and `Year 3/00 Telegram Sources Index.md` — link indexes "
  "into the private cohort Telegram channels the corpus was pulled from, not teaching content "
  "themselves. Both carry `sourceCategory: index`.")

w("\n## needs-decision rows\n")
needs = [x for x in s if (x.get("disposition") or "").startswith("needs-decision")]
if needs:
    w(f"**{len(needs)}** rows could not be placed by any rule above and were left for a human call:\n")
    w("| File | Why |")
    w("|---|---|")
    for x in needs:
        w(f"| `{x['corpusRelativePath']}` | {x['disposition']} |")
else:
    w("None. Every row that is not module-owned carries a `disposition` explaining why "
      "(year-level Administration/Reference Library, or a corpus-wide index).")

w("\n## What each module lacks\n")
w("Per module x subject: whether the corpus already holds (a) a department book or official "
  "course files, (b) an EOM/EOY paper, (c) an MCQ bank, (d) practical material. `Administration` "
  "is left out — it is not an academic subject. A subject folder that exists on disk but holds "
  "zero files is flagged `(empty folder)` rather than silently omitted, since that is the "
  "clearest possible gap. This is the input to the Telegram fetch list — read `✗` as "
  "\"go get one\".\n")
w("| Module | Subject | Dept book / official files | EOM/EOY paper | MCQ bank | Practical |")
w("|---|---|:--:|:--:|:--:|:--:|")

YEAR_DIR_OF_ID = {"HU_Y1": "Year 1", "HU_Y2": "Year 2", "HU_Y3": "Year 3"}


def empty_subject_folders(year_dir, mod):
    """Subject-level folders that exist on disk but hold not one file —
    the Kasr manifest recorded these as owner declarations; an empty folder
    says just as clearly what a module lacks as a populated one does.
    """
    mod_path = os.path.join(d["corpusRoot"], year_dir, mod)
    empties = []
    if not os.path.isdir(mod_path):
        return empties
    for entry in sorted(os.listdir(mod_path)):
        full = os.path.join(mod_path, entry)
        if not os.path.isdir(full) or entry == "Administration":
            continue
        has_file = any(files for _, _, files in os.walk(full))
        if not has_file:
            empties.append(entry)
    return empties


for yid, mods in MODULES_BY_YEAR.items():
    for mod in mods:
        rows = [x for x in s if x["moduleLabel"] == mod]
        subjects = sorted({x["subject"] for x in rows if x["subject"] and x["subject"] != "Administration"})
        for subj in subjects:
            srows = [x for x in rows if x["subject"] == subj]
            has_book = any(
                x["isDepartmentBook"] or has(x["sourceCategory"], "official course files")
                or has(x["sourceCategory"], "department books")
                for x in srows
            )
            has_exam = any(x["examType"] in ("EOM", "EOY") for x in srows)
            has_mcq = any(x["bookKind"] == "question" for x in srows)
            has_prac = any(
                has(x["sourceCategory"], "practical") or has(x.get("subfolder"), "practical")
                for x in srows
            )
            mark = lambda b: "✓" if b else "✗"
            w(f"| `{mod}` | {subj} | {mark(has_book)} | {mark(has_exam)} | {mark(has_mcq)} | {mark(has_prac)} |")
        for empty_subj in empty_subject_folders(YEAR_DIR_OF_ID[yid], mod):
            if empty_subj in subjects:
                continue
            w(f"| `{mod}` | {empty_subj} (empty folder) | ✗ | ✗ | ✗ | ✗ |")

open(OUT, "w").write("\n".join(L) + "\n")
print("wrote", OUT)
