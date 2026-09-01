#!/usr/bin/env python3
"""Build the MUST Year 2 source manifest (Phase-0, S0 Intake).

One row per file under `/Users/doitrous/Desktop/Universities/MUST/Year 2/`.
Schema kept close to the FOMSCU/Ain-Shams manifests (13-orchestration.md S0):
path, sha256, size, ext, module, kind, tier <= 5, twins collapsed via
duplicateOf (exact sha256 match, any location in this corpus).

Module id: `MUST-<CODE>` where CODE is the faculty's own printed module
folder name with spaces turned to hyphens, e.g. `CVS 201` -> `MUST-CVS-201`.
Kind/tier come from the `NN Kind Name` folder immediately inside a
module/subject folder — same convention as MUST Year 1's organized tree.

Usage: python3 scripts/must/intake/manifest_y2.py
"""
import hashlib
import json
import os
import unicodedata
from datetime import date

REPO = "/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse"
ROOT = "/Users/doitrous/Desktop/Universities/MUST/Year 2"
OUTDIR = os.path.join(REPO, ".claude", "worktrees", "must-y2-phase0", "docs", "MUST-Source-Imports", "manifest")

UNIVERSITY = "must"
YEAR_ID = "MUST_Y2"

# kind folder name (without its leading "NN ") -> (kind, tier)
KIND_TIER = {
    "University Material": ("lecture", 4),
    "DPT BOOK": ("book", 3),
    "Practical and OSPE": ("practical", 4),
    "Summaries and Revision": ("summary", 5),
    "MCQs": ("bank", 2),
    "EOM Exams": ("paper", 1),
    "EOY Exams": ("paper", 1),
    "Midterm Exams": ("paper", 2),
}
ADMIN_KIND = ("admin", 9)
MODULE_WIDE_DEFAULT_KIND = ("other", 5)


def norm(s):
    return unicodedata.normalize("NFC", s or "")


def sha256_of(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def source_id(sha):
    return "src_" + sha[:20]


def module_id_for(folder):
    if folder is None:
        return None
    code = folder.strip().replace(" ", "-").upper()
    return f"MUST-{code}"


def classify(parts):
    """parts = path components under ROOT, e.g.
    ['Semester 201', 'CVS 201', 'Anatomy', '05 MCQs', 'file.pdf']
    Returns (semester, moduleFolder, subjectFolder, kindFolder, kind, tier)."""
    semester = parts[0] if parts else None
    if len(parts) < 2:
        return semester, None, None, None, "other", 9

    moduleFolder = parts[1]
    if moduleFolder == "00 Administration":
        return semester, None, None, "/".join(parts[1:-1]), *ADMIN_KIND

    rest = parts[2:-1]  # directories between module and the file, excluding filename
    if not rest:
        # file sits directly in the module folder
        return semester, moduleFolder, None, None, *MODULE_WIDE_DEFAULT_KIND

    subjectFolder = rest[0]
    kindFolder = rest[1] if len(rest) > 1 else None

    if subjectFolder in ("00 Module-wide",):
        subjectFolder = None
        kindFolder = rest[1] if len(rest) > 1 else None
    elif subjectFolder.startswith("00 "):
        subjectFolder = None

    if kindFolder is None:
        return semester, moduleFolder, subjectFolder, None, *MODULE_WIDE_DEFAULT_KIND

    # strip leading "NN " numbering
    label = kindFolder.split(" ", 1)[1] if kindFolder[:2].isdigit() else kindFolder
    kind, tier = KIND_TIER.get(label, ("other", 6))
    return semester, moduleFolder, subjectFolder, kindFolder, kind, tier


def main():
    rows = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames.sort()
        for name in sorted(filenames):
            if name == ".DS_Store":
                continue
            full = os.path.join(dirpath, name)
            rel = os.path.relpath(full, ROOT)
            parts = rel.split(os.sep)
            ext = os.path.splitext(name)[1].lstrip(".").lower() or "unknown"
            size = os.path.getsize(full)
            sha = sha256_of(full)

            semester, moduleFolder, subjectFolder, kindFolder, kind, tier = classify(parts)
            module_id = module_id_for(moduleFolder)

            rows.append({
                "sourceId": source_id(sha),
                "sha256": sha,
                "absolutePath": full,
                "corpusRelativePath": rel,
                "fileName": norm(name),
                "universityId": UNIVERSITY,
                "yearId": YEAR_ID,
                "semester": semester,
                "moduleFolder": moduleFolder,
                "moduleId": module_id,
                "subjectFolder": subjectFolder,
                "kindFolder": kindFolder,
                "kind": kind,
                "sourceTier": tier,
                "size": size,
                "ext": ext,
                "duplicateOf": None,
            })

    by_sha = {}
    for r in rows:
        by_sha.setdefault(r["sha256"], []).append(r)
    dup_groups = 0
    dup_files = 0
    for group in by_sha.values():
        if len(group) > 1:
            dup_groups += 1
            paths = sorted(g["corpusRelativePath"] for g in group)
            for g in group:
                g["duplicateOf"] = [p for p in paths if p != g["corpusRelativePath"]]
                dup_files += 1

    os.makedirs(OUTDIR, exist_ok=True)
    doc = {
        "schemaVersion": "must-source-manifest/1.0.0",
        "generatedOn": date.today().isoformat(),
        "universityId": UNIVERSITY,
        "yearId": YEAR_ID,
        "corpusRoot": ROOT,
        "note": ("S0 Intake for MUST Year 2 Phase-0. One row per file under the organized "
                 "Desktop tree (Semester 201 + Semester 202). Twins are exact sha256 "
                 "duplicates only (duplicateOf); no cross-year or near-duplicate (name-twin) "
                 "pass has been run yet. moduleId is MUST-<printed module code>, spaces to "
                 "hyphens, e.g. MUST-CVS-201. kind/sourceTier come from the NN-numbered kind "
                 "folder (01 University Material..08 Midterm Exams); tier 1 = EOM/EOY papers, "
                 "2 = MCQ banks / midterm papers, 3 = department book, 4 = lecture/practical, "
                 "5 = summaries or unclassified module-wide file, 9 = administration."),
        "count": len(rows),
        "duplicateGroups": dup_groups,
        "duplicateFiles": dup_files,
        "sources": sorted(rows, key=lambda r: r["corpusRelativePath"]),
    }
    out = os.path.join(OUTDIR, "y2-sources.json")
    json.dump(doc, open(out, "w"), indent=1, ensure_ascii=False)
    print(f"{len(rows)} sources ({dup_groups} duplicate groups, {dup_files} duplicate files) -> {out}")
    return doc


if __name__ == "__main__":
    main()
