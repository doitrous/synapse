#!/usr/bin/env python3
"""Build the Mansoura University Year 1 source manifest.

Phase-0 S0 Intake. Scope: the organized `Year 1/` tree (almost entirely empty
placeholder folders today -- see below) plus the faculty-root Official
Guides (2020-2021, 2021-2022 -- the only local evidence for Year 1 module
codes/marks) and `_Staging/Telegram Year 1` (the 1,344-academic-file raw
Telegram archive, organized by *cohort Telegram channel label*, not by
canonical module -- AEP/HBG/PPPM/MSS/HIS are archive-group labels, not
module ids; see `_Catalog/Curriculum Map.md`).

One row per file: sha256, size, ext, archive group, module id (MANS-<CODE> or
null where the group is ambiguous), folder/filename-derived kind and tier.
Exact-duplicate files (same sha256) are collapsed: every row after the first
instance of a given sha256 carries `duplicateOf` pointing at the first row's
sourceId and is excluded from the per-group counts in the companion markdown.

No OCR, no page-count probe (that is S1b, via pagetext.mjs). No content read.
Kind is a **filename heuristic only** for the staging corpus (1,344 files,
too many to open individually in Phase-0) -- directional, refined at S1
triage per module, not a content-verified classification.
"""
import hashlib
import json
import os
import re
from datetime import date

REPO = "/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse"
WT = os.path.join(REPO, ".claude", "worktrees", "mansoura-y1-phase0")
UNI_ROOT = "/Users/doitrous/Desktop/Universities/Mansoura University"
OUTDIR = os.path.join(WT, "docs", "Mansoura-Source-Imports", "manifest")

UNIVERSITY = "mans"
YEAR_ID = "MANS_Y1"

SKIP_NAMES = {".DS_Store"}

# Organized Year 1 tree: Semester -> "Modules - <version>" -> "<CODE> - <Name>"
# folder name -> module code. Baseline (2021-2022 guide) S1 folders carry
# bare codes; the 2023-2024 S2 schedule folders already carry the official
# hyphenated code. The old-baseline S2 folders (CVS/RESP/IBL/RAU/ELE1) are
# superseded for the current cohort per Curriculum Map.md and are recorded
# with moduleVersion="baseline-2021-2022-superseded".
FOLDER_TO_CODE = {
    "HR - Human Rights": "HR",
    "MT - Medical Terminology": "MT",
    "PAEHC - Principles of Anatomy, Embryology, General Histology and Cell Biology": "PAEHC",
    "PBBG - Principles of Biochemistry and Basis of Genetics": "PBBG",
    "PPMIP - Principles of Pathology, Microbiology, Immunology and Parasitology": "PPMIP",
    "PPP - Principles of Physiology and Pharmacology": "PPP",
    "CVS - Cardiovascular System": "CVS",
    "ELE1 - Elective I": "ELE1",
    "IBL - Immune, Blood and Lymphatic Systems": "IBL",
    "RAU - Renal and Urinary System": "RAU",
    "RESP - Respiratory System": "RESP",
    "ECE-204 - Early Clinical Experience": "ECE-204",
    "HIS-203 - Hematopoietic and Immune System": "HIS-203",
    "MSS-202 - Musculoskeletal System": "MSS-202",
    "PPPM-201 - Principles of Pathology, Microbiology, Parasitology and Pharmacology": "PPPM-201",
    "UNI-204 - Community Issues": "UNI-204",
}

# Telegram archive-group label -> resolved module id, or None where the
# group spans more than one canonical module and cannot be split without
# per-file evidence (Curriculum Map.md, "Telegram label crosswalk"). The
# Telegram "PPPM" label is a false-friend: it spans the *old-baseline S1*
# PPP + PPMIP, NOT the current-cohort S2 module also (coincidentally) coded
# PPPM-201 -- do not conflate the two.
ARCHIVE_GROUP_TO_MODULE = {
    "AEP": None,   # spans PAEHC + PPP (S1, old-baseline)
    "HBG": None,   # spans PAEHC + PBBG (S1, old-baseline)
    "PPPM": None,  # spans PPP + PPMIP (S1, old-baseline) -- NOT S2 PPPM-201
    "MSS": "MANS-MSS-202",  # direct: S2, 2023-2024 schedule
    "HIS": "MANS-HIS-203",  # direct: S2, 2023-2024 schedule
}

KIND_TIER_OF_ORGANIZED_FOLDER = {
    "00 Module-wide": ("other", 5),
    "Schedules": ("other", 9),
    "Plans and Mark Distribution": ("other", 9),
}

# Filename heuristics for the (otherwise unsorted) staging corpus. Checked in
# this order; first match wins. Directional only -- see module docstring.
PAPER_RE = re.compile(r"\b(exam|written|model\s*answer|past\s*years?)\b", re.I)
PAPER_RE_AR = re.compile(r"تجميعات")
BANK_RE = re.compile(r"\b(mcq|qbank|questions?|q\s*&\s*a)\b", re.I)
BANK_RE_AR = re.compile(r"أسئلة")
PRACTICAL_RE = re.compile(r"\b(practical|ospe|osce|dissection)\b", re.I)
LECTURE_RE = re.compile(r"\b(lec(ture)?s?|hand\s*out|seminar|cbl|l\d{1,3}\b)", re.I)
DEPTBOOK_RE = re.compile(r"\b(book|summary|summaries|atlas|continuous|cont\b|notes?)\b", re.I)


def classify_kind_tier(filename):
    if PAPER_RE.search(filename) or PAPER_RE_AR.search(filename):
        return "paper", 1
    if BANK_RE.search(filename) or BANK_RE_AR.search(filename):
        return "bank", 2
    if PRACTICAL_RE.search(filename):
        return "practical", 3
    if LECTURE_RE.search(filename):
        return "lecture", 3
    if DEPTBOOK_RE.search(filename):
        return "dept-book", 4
    return "other", 5


def sha256_of(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def source_id(sha):
    return "src_" + sha[:20]


def build_row(abspath, rel, corpus, archiveGroup, moduleId, moduleVersion,
              kindFolder, kind, tier, unsorted=False):
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
        "archiveGroup": archiveGroup,
        "moduleId": moduleId,
        "moduleVersion": moduleVersion,
        "kindFolder": kindFolder,
        "kind": kind,
        "sourceTier": tier,
        "size": size,
        "ext": ext,
        "duplicateOf": None,
    }


def walk_year1():
    root = os.path.join(UNI_ROOT, "Year 1")
    rows = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames.sort()
        for fn in sorted(filenames):
            if fn in SKIP_NAMES:
                continue
            abspath = os.path.join(dirpath, fn)
            rel = "Year 1/" + os.path.relpath(abspath, root)
            parts = rel.split("/")
            # Year 1/Semester N/00 Administration/<Schedules|Plans.../...
            # Year 1/Semester N/Modules - <version>/<CODE - Name>/<00 Module-wide|Subject>/...
            moduleId = None
            moduleVersion = None
            kindFolder = parts[2] if len(parts) > 2 else None
            kind, tier = "other", 9
            if len(parts) > 2 and parts[2] == "00 Administration":
                sub = parts[3] if len(parts) > 3 else None
                kind, tier = KIND_TIER_OF_ORGANIZED_FOLDER.get(sub, ("other", 9))
                kindFolder = sub
            elif len(parts) > 3 and parts[2].startswith("Modules - "):
                version_folder = parts[2]
                module_folder = parts[3]
                code = FOLDER_TO_CODE.get(module_folder)
                moduleId = f"MANS-{code}" if code else None
                moduleVersion = ("2023-2024-schedule" if "2023-2024" in version_folder
                                  else "baseline-2021-2022-superseded" if code in
                                  ("CVS", "ELE1", "IBL", "RAU", "RESP")
                                  else "baseline-2021-2022")
                rest = parts[4:]
                if rest:
                    sub = rest[0]
                    kind, tier = KIND_TIER_OF_ORGANIZED_FOLDER.get(sub, ("other", 9))
                    kindFolder = sub
            rows.append(build_row(abspath, rel, "year1", None, moduleId, moduleVersion,
                                   kindFolder, kind, tier))
    return rows


def walk_faculty_guides():
    """The two Official Student Guides -- Year-1-relevant (module codes/marks
    for the 2021-2022 baseline), not Year-1-scoped as a folder."""
    root = os.path.join(UNI_ROOT, "00 Faculty and Program", "Official Guides")
    rows = []
    if not os.path.isdir(root):
        return rows
    for fn in sorted(os.listdir(root)):
        abspath = os.path.join(root, fn)
        if not os.path.isfile(abspath) or fn in SKIP_NAMES:
            continue
        rel = os.path.relpath(abspath, UNI_ROOT)
        rows.append(build_row(abspath, rel, "faculty-admin", None, None, None,
                               "Official Guides", "other", 9))
    return rows


def walk_staging():
    root = os.path.join(UNI_ROOT, "_Staging", "Telegram Year 1")
    rows = []
    if not os.path.isdir(root):
        return rows
    for group_dir in sorted(os.listdir(root)):
        group_path = os.path.join(root, group_dir)
        if not os.path.isdir(group_path):
            continue
        # "AEP Module - 64th" -> "AEP"
        archive_group = group_dir.split(" ")[0]
        module_id = ARCHIVE_GROUP_TO_MODULE.get(archive_group)
        for dirpath, dirnames, filenames in os.walk(group_path):
            dirnames.sort()
            for fn in sorted(filenames):
                if fn in SKIP_NAMES:
                    continue
                abspath = os.path.join(dirpath, fn)
                rel = os.path.relpath(abspath, UNI_ROOT)
                ext = os.path.splitext(fn)[1].lstrip(".").lower()
                if ext in ("apk", "exe"):
                    kind, tier = "other", 9
                else:
                    kind, tier = classify_kind_tier(fn)
                rows.append(build_row(abspath, rel, "staging", archive_group, module_id,
                                       None, group_dir, kind, tier, unsorted=True))
    return rows


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
    rows = walk_year1() + walk_faculty_guides() + walk_staging()
    rows = collapse_duplicates(rows)
    manifest = {
        "schemaVersion": "mans-source-manifest/1.0.0",
        "generatedOn": date.today().isoformat(),
        "universityId": UNIVERSITY,
        "yearId": YEAR_ID,
        "corpusRoot": UNI_ROOT,
        "note": ("Generated from the local Mansoura University source tree without OCR. "
                 "'year1' corpus = the organized Year 1/ tree (almost entirely empty "
                 "placeholder module folders today -- only 2 administration schedule PDFs "
                 "carry real content); 'faculty-admin' = the two Official Student Guides "
                 "at the faculty root, cited directly in academic/MANS-Y1-modules.md for "
                 "S1 module codes/marks; 'staging' = _Staging/Telegram Year 1, organized "
                 "by Telegram cohort-channel label (archiveGroup: AEP/HBG/PPPM/MSS/HIS), "
                 "which are NOT canonical module ids -- see ARCHIVE_GROUP_TO_MODULE in "
                 "this script and _Catalog/Curriculum Map.md. moduleId is resolved only "
                 "for MSS and HIS (direct 1:1 with S2 2023-2024 modules); AEP/HBG/PPPM "
                 "remain unresolved (span 2+ old-baseline S1 modules) pending per-file "
                 "evidence. kind for the staging corpus is a FILENAME HEURISTIC ONLY -- "
                 "no content read -- directional, refined at S1 triage."),
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
