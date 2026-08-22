#!/usr/bin/env python3
"""Render each Alexandria manifest as markdown a person can check.

Adapted from scripts/corpus-intake/index.py (commit 6b32fa6). Kasr's version
renders a single file (one module list); this renders one page per manifest
(y1/y2/y3/general), since the brief asks for "index.py's human-readable
markdown per year", plus a combined top table across all four so a reader
doesn't have to open four files to see the whole corpus at a glance.
"""
import collections
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
MANIFEST_DIR = os.path.join(REPO, "docs", "Alexandria-Source-Imports", "manifest")

FILES = [
    ("au-y1-sources.json", "au-y1-index.md", "Year 1"),
    ("au-y2-sources.json", "au-y2-index.md", "Year 2"),
    ("au-y3-sources.json", "au-y3-index.md", "Year 3"),
    ("au-general-sources.json", "au-general-index.md", "General Resources"),
]

CATEGORIES = [
    "Department Book", "Lecture Slides", "Department Questions",
    "End of Module paper", "End of Module answers", "End of Year paper",
    "Practical", "Orientation/Schedule", "Administrative", "Atlas/Reference",
    "Unknown",
]


def render_one(src_path, title):
    d = json.load(open(src_path))
    s = d["sources"]
    L = []
    w = L.append

    w(f"# Alexandria University — {title} source index\n")
    w(f"Generated {d['generatedOn']} from `{d['corpusRoot']}/{d['corpusSubfolder']}`. "
      f"**{d['count']} distinct sources** (by sha256; see manifest/README.md "
      f"\"Deduplication reality\" for why this is not one row per file).\n")
    w(f"Machine-readable copy: [`{os.path.basename(src_path)}`](./{os.path.basename(src_path)})\n")

    w("## By module\n")
    mods = sorted({x["moduleId"] for x in s if x["moduleId"]})
    w("| Module | Module name | Files | Distinct depts |")
    w("|---|---|--:|--:|")
    for mod in mods:
        rows = [x for x in s if x["moduleId"] == mod]
        name = rows[0]["moduleName"] if rows else ""
        depts = len({x["departmentFolder"] for x in rows})
        w(f"| `{mod}` | {name} | {len(rows)} | {depts} |")
    no_mod = [x for x in s if not x["moduleId"]]
    if no_mod:
        w(f"\nNon-module containers (`containerKind` set, `moduleId: null` — material spans "
          f"modules, so it is never assigned to one): {len(no_mod)} files, "
          + ", ".join(f"`{k}` ({v})" for k, v in
                       sorted(collections.Counter(x['containerKind'] for x in no_mod).items())) + ".")

    w("\n## By department (across all modules in this file)\n")
    c = collections.Counter(x["departmentFolder"] for x in s)
    w("| Department | Files |")
    w("|---|--:|")
    for dept, n in c.most_common():
        w(f"| {dept} | {n} |")

    w("\n## By category\n")
    c = collections.Counter(x["category"] for x in s)
    w("| Category | Files |")
    w("|---|--:|")
    for cat in CATEGORIES:
        w(f"| {cat} | {c.get(cat, 0)} |")

    w("\n## Module x category\n")
    w("| Module | " + " | ".join(CATEGORIES) + " |")
    w("|---|" + "--:|" * len(CATEGORIES))
    for mod in mods:
        rows = [x for x in s if x["moduleId"] == mod]
        c = collections.Counter(x["category"] for x in rows)
        w(f"| `{mod}` | " + " | ".join(str(c.get(cat, 0)) for cat in CATEGORIES) + " |")

    w("\n## Text layer\n")
    c = collections.Counter(x["textLayer"] for x in s)
    w("| textLayer | Files |")
    w("|---|--:|")
    for k in ("native", "none", "unprobed", "n/a"):
        if k in c:
            w(f"| {k} | {c[k]} |")

    w("\n## Probe status (top values)\n")
    def bucket(status):
        return (status or "").split(":")[0]
    c = collections.Counter(bucket(x["probeStatus"]) for x in s)
    w("| probeStatus (bucketed) | Files |")
    w("|---|--:|")
    for k, n in c.most_common():
        w(f"| {k} | {n} |")

    w("\n## File type (by magic bytes, not extension)\n")
    c = collections.Counter(x["fileType"] for x in s)
    w("| fileType | Files |")
    w("|---|--:|")
    for k, n in c.most_common():
        w(f"| {k} | {n} |")
    renamed = [x for x in s if x.get("extensionNote")]
    if renamed:
        w(f"\n{len(renamed)} files have a misleading extension (magic bytes disagree with the "
          "filename's claimed type) — see each row's `extensionNote`.")

    w("\n## Module mismatches (folder vs header text)\n")
    mism = [x for x in s if x["moduleMismatch"]]
    if mism:
        w("| File | Folder says | Evidence |")
        w("|---|---|---|")
        for x in mism:
            w(f"| `{x['fileName']}` | `{x['moduleId']}` | {x['moduleMismatchEvidence']} |")
    else:
        w("None in this file.")

    w("\n## Exam signals\n")
    cohorts = [x for x in s if x["examSignals"]["cohortSignal"]]
    streams = [x for x in s if x["examSignals"]["streamSignal"]]
    sat = [x for x in s if x["examSignals"]["sittingYear"]]
    w(f"- **{len(cohorts)}** files carry a graduating-cohort number in the filename "
      "(2027-2030) — recorded as `cohortSignal`, never treated as a sitting year.")
    stream_counts = collections.Counter(x['examSignals']['streamSignal'] for x in streams)
    w(f"- **{len(streams)}** files are stream-specific "
      f"({', '.join(f'{v} {k}' for k, v in stream_counts.items())}).")
    w(f"- **{len(sat)}** files had a sitting year read from the document's own printed date "
      "(never from a filename number).")

    w("\n## Duplicates and name-twins\n")
    dup_hash = [x for x in s if x["duplicatePathCount"] > 1]
    twins = [x for x in s if x.get("nameTwinOf")]
    preferred = [x for x in twins if x.get("twinPreferred")]
    w(f"- **{len(dup_hash)}** sources are byte-identical copies filed under more than one path.")
    w(f"- **{len(twins)}** sources have a `nameTwinOf` link — a same-folder sibling with the same "
      "normalised name (bracket suffix and punctuation stripped) whose bytes differ. "
      f"**{len(preferred)}** of those are the `twinPreferred` one (more extracted text; ties go "
      "to the '[from Alexandria University Updated]' copy). See manifest/README.md "
      "'Deduplication reality' — these are never merged, only cross-referenced.")

    return "\n".join(L) + "\n", d


def main():
    combined = []
    combined.append("# Alexandria University — corpus source index (all years)\n")
    combined.append("One page per manifest below; this page is just the roll-up table.\n")
    combined.append("| File | Distinct sources | Modules | Departments |")
    combined.append("|---|--:|--:|--:|")

    for src_name, out_name, title in FILES:
        src_path = os.path.join(MANIFEST_DIR, src_name)
        if not os.path.exists(src_path):
            continue
        text, d = render_one(src_path, title)
        out_path = os.path.join(MANIFEST_DIR, out_name)
        open(out_path, "w").write(text)
        print("wrote", out_path)
        s = d["sources"]
        n_mods = len({x["moduleId"] for x in s if x["moduleId"]})
        n_depts = len({x["departmentFolder"] for x in s})
        combined.append(f"| [`{out_name}`](./{out_name}) | {d['count']} | {n_mods} | {n_depts} |")

    combined_path = os.path.join(MANIFEST_DIR, "au-index.md")
    open(combined_path, "w").write("\n".join(combined) + "\n")
    print("wrote", combined_path)


if __name__ == "__main__":
    main()
