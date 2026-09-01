#!/usr/bin/env python3
"""Build the FOMSCU (Suez Canal University) Year 1 source manifest.

Phase-0 S0 Intake. Scope: the organized `Year 1/` tree plus the faculty-root
`00 Administration` (whole-program bylaws/handbook that document Year 1 marks
and codes) and `_Staging/Telegram Year 1` (a 395-file raw Telegram dump not
yet placed into the organized tree -- inventoried so nothing is lost, but
flagged `unsorted` and excluded from module/tier classification since it has
not been triaged into subject folders the way the rest of the corpus has).

One row per file: sha256, size, ext, module id (SCU-<code> or null),
folder-derived kind and tier. Exact-duplicate files (same sha256) are
collapsed: every row after the first instance of a given sha256 carries
`duplicateOf` pointing at the first row's sourceId and is excluded from the
per-module counts in the companion markdown.

No OCR, no page-count probe (that is S1b, via pagetext.mjs). No content read.
"""
import hashlib
import json
import os
from datetime import date

REPO = "/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse"
WT = os.path.join(REPO, ".claude", "worktrees", "fomscu-y1-phase0")
FACULTY_ROOT = "/Users/doitrous/Desktop/Universities/FOMSCU/Faculty of Medicine"
OUTDIR = os.path.join(WT, "docs", "FOMSCU-Source-Imports", "manifest")

UNIVERSITY = "scu"
YEAR_ID = "SCU_Y1"

# Observed folder name -> module id (Internal Bylaw 2023, matched against the
# locally organized Year 1 folder names -- see academic/SCU-Y1-modules.md).
MODULE_OF_FOLDER = {
    "Foundation 1": "SCU-FBS102",
    "Foundation 2": "SCU-FBS103",
    "Foundation 3": "SCU-FBS104",
    "Musculoskeletal": "SCU-MS105",
}

# kindFolder -> (kind, tier)
KIND_TIER_OF_KINDFOLDER = {
    "06 EOM Exams": ("paper", 1),
    "07 EOY Exams": ("paper", 1),
    "03 Questions and QBank": ("bank", 2),
    "01 University Material": ("lecture", 3),
    "04 Practical and OSCE": ("practical", 3),
    "05 Notes and Textbooks": ("other", 4),
    "00 Module-wide": ("other", 5),
    "_Needs Review - Related FOMNINU": ("other", 6),
}

SKIP_NAMES = {".DS_Store"}


def sha256_of(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def source_id(sha):
    return "src_" + sha[:20]


def classify_year1(rel_parts):
    """rel_parts is the path split under 'Year 1/'. Returns
    (moduleFolder, moduleId, subjectFolder, kindFolder, kind, tier, subject)."""
    if not rel_parts:
        return (None, None, None, None, "other", 9, None)

    top = rel_parts[0]

    if top == "00 Administration":
        return (None, None, None, "00 Administration", "other", 9, None)
    if top == "03 Questions and QBank":
        # Year-1-level (not module-specific) QBank folder.
        return (None, None, None, top, "bank", 2, None)
    if top in ("_Catalog", "_Needs Review"):
        return (None, None, None, top, "other", 9, None)

    if top in ("Semester 1", "Semester 2") and len(rel_parts) > 1:
        module_folder = rel_parts[1]
        module_id = MODULE_OF_FOLDER.get(module_folder)
        rest = rel_parts[2:]
        if not rest:
            return (module_folder, module_id, None, None, "other", 9, None)
        # Either a module-wide kind folder (00/03/06/07/_Needs Review), or a
        # subject folder followed by its own kind folder.
        first = rest[0]
        if first in KIND_TIER_OF_KINDFOLDER:
            kind, tier = KIND_TIER_OF_KINDFOLDER[first]
            return (module_folder, module_id, None, first, kind, tier, None)
        # Subject folder.
        subject_folder = first
        rest2 = rest[1:]
        if not rest2:
            return (module_folder, module_id, subject_folder, None, "other", 9, subject_folder)
        kind_folder = rest2[0]
        kind, tier = KIND_TIER_OF_KINDFOLDER.get(kind_folder, ("other", 9))
        return (module_folder, module_id, subject_folder, kind_folder, kind, tier, subject_folder)

    return (None, None, None, top, "other", 9, None)


def walk_year1():
    root = os.path.join(FACULTY_ROOT, "Year 1")
    rows = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames.sort()
        for fn in sorted(filenames):
            if fn in SKIP_NAMES:
                continue
            abspath = os.path.join(dirpath, fn)
            rel_to_year1 = os.path.relpath(abspath, root)
            rel_parts = rel_to_year1.split(os.sep)[:-1]  # drop filename
            moduleFolder, moduleId, subjectFolder, kindFolder, kind, tier, subject = classify_year1(rel_parts)
            rows.append(build_row(abspath, "Year 1/" + rel_to_year1, moduleFolder, moduleId,
                                   subjectFolder, kindFolder, kind, tier, subject, corpus="year1"))
    return rows


def walk_faculty_administration():
    root = os.path.join(FACULTY_ROOT, "00 Administration")
    rows = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames.sort()
        for fn in sorted(filenames):
            if fn in SKIP_NAMES:
                continue
            abspath = os.path.join(dirpath, fn)
            rel = os.path.relpath(abspath, FACULTY_ROOT)
            rows.append(build_row(abspath, rel, None, None, None,
                                   "00 Administration (faculty)", "other", 9, None,
                                   corpus="faculty-admin"))
    return rows


def walk_staging():
    root = os.path.join(FACULTY_ROOT, "_Staging", "Telegram Year 1")
    rows = []
    if not os.path.isdir(root):
        return rows
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames.sort()
        for fn in sorted(filenames):
            if fn in SKIP_NAMES:
                continue
            abspath = os.path.join(dirpath, fn)
            rel = os.path.relpath(abspath, FACULTY_ROOT)
            rows.append(build_row(abspath, rel, None, None, None, "_Staging", "other", 9, None,
                                   corpus="staging", unsorted=True))
    return rows


def build_row(abspath, rel, moduleFolder, moduleId, subjectFolder, kindFolder, kind, tier,
              subject, corpus, unsorted=False):
    sha = sha256_of(abspath)
    size = os.path.getsize(abspath)
    ext = os.path.splitext(abspath)[1].lstrip(".").lower()
    return {
        "sourceId": source_id(sha),
        "sha256": sha,
        "absolutePath": abspath,
        "corpusRelativePath": rel,
        "fileName": os.path.basename(abspath),
        "universityId": UNIVERSITY,
        "yearId": YEAR_ID,
        "corpus": corpus,
        "unsorted": unsorted,
        "moduleFolder": moduleFolder,
        "moduleId": moduleId,
        "subjectFolder": subjectFolder,
        "kindFolder": kindFolder,
        "kind": kind,
        "sourceTier": tier,
        "subject": subject,
        "size": size,
        "ext": ext,
        "duplicateOf": None,
    }


def collapse_duplicates(rows):
    seen = {}
    for r in rows:
        sha = r["sha256"]
        if sha in seen:
            r["duplicateOf"] = seen[sha]
        else:
            seen[sha] = r["sourceId"]
    return rows


def main():
    rows = walk_year1() + walk_faculty_administration() + walk_staging()
    rows = collapse_duplicates(rows)
    manifest = {
        "schemaVersion": "fomscu-source-manifest/1.0.0",
        "generatedOn": date.today().isoformat(),
        "universityId": UNIVERSITY,
        "yearId": YEAR_ID,
        "corpusRoot": FACULTY_ROOT,
        "note": ("Generated from the local FOMSCU Faculty of Medicine source tree without OCR. "
                 "'year1' corpus = organized Year 1/ tree; 'faculty-admin' = whole-program bylaws/"
                 "handbook at the faculty root (Year-1-relevant, not year-scoped); 'staging' = "
                 "_Staging/Telegram Year 1, a raw unsorted Telegram dump not yet placed into module "
                 "folders (unsorted=true, module/kind left null/other). Exact-duplicate files "
                 "(same sha256) carry duplicateOf pointing at the first row seen with that hash."),
        "count": len(rows),
        "sources": rows,
    }
    os.makedirs(OUTDIR, exist_ok=True)
    out_json = os.path.join(OUTDIR, "y1-sources.json")
    with open(out_json, "w") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"wrote {out_json} ({len(rows)} rows)")


if __name__ == "__main__":
    main()
