#!/usr/bin/env python3
"""Shared constants and path-decomposition for the Ain Shams intake toolchain.

Adapted from scripts/corpus-intake/ (Kasr Alainy). Kept as a stand-alone copy
per the Ain Shams lane brief — never import from scripts/corpus-intake or
scripts/kasr, and never edit those.

The Ain Shams corpus is organised on one grammar (see docs/Ain-Shams-Source-Imports/
LANE-BRIEF.md):

    <Year N>/<Term K>/<Module>/<Subject>/<Kind>/[<doctor or Slides or ...>/]<file>
    <Year N>/<Term K>/<Module>/All Subjects/<Kind>/...
    <Year N>/[Term K/]Administration/Schedules/<file>

There is no NOTE...NOTE convention and no batch-code system here — those are
Kasr-specific and do not apply.
"""
import os
import re

ROOT = "/Users/doitrous/Desktop/Ain Shams"
HERE = os.path.dirname(os.path.abspath(__file__))
# scripts/asu/intake -> repo root is three levels up. Computed rather than
# hardcoded so this runs correctly inside the git worktree this lane
# actually works in (.../.claude/worktrees/<branch>), not just a bare
# checkout — a hardcoded main-repo path silently wrote outputs outside the
# worktree the first time this was run.
REPO = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
OUTDIR = os.path.join(REPO, "docs", "Ain-Shams-Source-Imports", "manifest")

UNIVERSITY = "asu"

YEARS = {
    "y1": {"yearId": "ASU_Y1", "walkRoot": "Year 1", "outName": "asu-y1-sources.json"},
    "y2": {"yearId": "ASU_Y2", "walkRoot": "Year 2", "outName": "asu-y2-sources.json"},
    "y3": {"yearId": "ASU_Y3", "walkRoot": "Year 3", "outName": "asu-y3-sources.json"},
}

# Folder name (as it appears on disk, exactly, under a Module) -> minted
# module ID, keyed per yearId because the same folder name recurs across
# years with a DIFFERENT module ID (CNS, Endocrine, Special Senses, Research
# Methodology appear in both Year 2 Term 2 and Year 3 — see LANE-BRIEF.md
# §3), the same way Kasr's Year 4/5 use "SURG 4" / "SURG 5". Sent by the
# orchestrator 2026-08-22 once the catalogue lane minted IDs in
# src/data/universities.ts (ASU_MODULES) / docs/import-ready/academic/
# asu-modules.md. IDs containing a space (e.g. "CNS 2") are kept verbatim,
# exactly like Kasr's "101 ISK" — a slug with the space removed ("CNS2") is
# only for filenames a later lane derives, never for this field.
# "Administration" never gets a real module ID (moduleId stays null; the
# row is excluded via exclusionReason="administrative_schedule" instead).
MODULE_FOLDERS = {
    "ASU_Y1": {
        # Term 1
        "Immunology": "ASU-IMM",
        "Introduction to Anatomy and Embryology": "ASU-AE",
        "Introduction to Histology and Cell Biology": "ASU-HCB",
        "Introduction to Medical Biochemistry": "ASU-IBM-1",
        "Molecular Biology and Medical Genetics": "ASU-MBG",
        # Term 2
        "Basic Life Support, History Taking and Clinical Examination": "ASU-BLS",
        "General Pathology": "ASU-GPATH",
        "General Pharmacology": "ASU-GPHARM",
        "Infection": "ASU-INF",
        "Locomotor System": "ASU-LOCO",
        "Administration": None,
    },
    "ASU_Y2": {
        # Term 1
        "Blood": "ASU-BLOOD",
        "Cardiovascular System": "ASU-CVS",
        "Respiratory System": "ASU-RESP",
        # Term 2
        "Central Nervous System": "ASU-CNS-2",
        "Endocrine System": "ASU-ENDO-2",
        "Research Methodology": "ASU-RM-2",
        "Special Senses": "ASU-SS-2",
        "Administration": None,
    },
    "ASU_Y3": {
        # Term 1
        "Central Nervous System": "ASU-CNS-3",
        "Clinical Neurosciences and Special Senses": "ASU-CLIN-NEURO",
        "Communication Skills": "ASU-COMM",
        "Research Methodology": "ASU-RM-3",
        "Special Senses": "ASU-SS-3",
        # Term 2
        "Clinical Endocrinology": "ASU-CLIN-ENDO",
        "Clinical Urogenital Medicine": "ASU-CLIN-UG",
        "Endocrine System": "ASU-ENDO-3",
        "Urogenital System": "ASU-UG",
        "Administration": None,
    },
}
# This exact list was collected by walking all three years' inventory
# output (inventory-y1.json / -y2 / -y3) on 2026-08-22; a moduleFolder that
# shows up later and is not a key under its yearId here is a genuine new
# finding, not a bug — module_id_for() returns None for it rather than
# guessing. IDs corrected 2026-08-22 by the orchestrator to carry an
# "ASU-" prefix throughout, with hyphens (never spaces) separating a
# year-suffixed module's number — e.g. "ASU-CNS-2", not "CNS 2". Since no
# ID contains a space any more, module_id_slug() below is the identity
# function for every current ID; it is kept only in case a future ID
# reintroduces a space.


def module_id_for(year_id, module_folder):
    return MODULE_FOLDERS.get(year_id, {}).get(module_folder)


def module_id_slug(module_id):
    """The filename-safe form of a module ID — spaces removed, per
    LANE-BRIEF.md's instruction for any filename a later lane derives.
    Not used in the manifest itself; moduleId is kept verbatim there."""
    return module_id.replace(" ", "") if module_id else module_id

# Known "kind" folder tokens (the level under Subject, or under "All
# Subjects"). Anything else encountered is still recorded (kindFolder is
# whatever the folder is actually named) but flagged as unrecognised so the
# README can report it. Collected the same way as MODULE_FOLDERS above.
KNOWN_KIND_FOLDERS = {
    "Lectures", "Practical", "Questions", "Assessments", "Compilations",
    "Notes", "Department Books", "Schedules", "General", "Revision",
    "Summaries",
}

TERM_RX = re.compile(r"^Term [12]$")


def decompose(rel_parts):
    """Split a file's path (relative to the year's walk root, directories
    only) into term / moduleFolder / subjectFolder / kindFolder / subFolder.

    rel_parts: list of directory component strings (no filename).
    Returns a dict with keys term, moduleFolder, subjectFolder, kindFolder,
    subFolder (subFolder is the remaining path joined with " / ", or None).
    """
    parts = list(rel_parts)
    idx = 0
    term = None
    if idx < len(parts) and TERM_RX.match(parts[idx]):
        term = parts[idx]
        idx += 1

    module_folder = parts[idx] if idx < len(parts) else None
    if module_folder == "Administration":
        idx += 1
        kind_folder = parts[idx] if idx < len(parts) else None
        idx += 1
        sub_folder = " / ".join(parts[idx:]) if idx < len(parts) else None
        return {
            "term": term, "moduleFolder": "Administration", "subjectFolder": None,
            "kindFolder": kind_folder, "subFolder": sub_folder,
        }
    idx += 1

    subject_folder = parts[idx] if idx < len(parts) else None
    idx += 1
    kind_folder = parts[idx] if idx < len(parts) else None
    idx += 1
    sub_folder = " / ".join(parts[idx:]) if idx < len(parts) else None

    return {
        "term": term, "moduleFolder": module_folder, "subjectFolder": subject_folder,
        "kindFolder": kind_folder, "subFolder": sub_folder,
    }


def source_id(sha):
    return "src_" + sha[:20]


PDF_MAGIC = b"%PDF-"


def sniff_is_pdf(path):
    """Files with no recognisable extension (e.g. '...Dr.Omar') were found by
    hand to be PDFs missing their extension entirely. Confirm by magic bytes
    rather than trust the name."""
    try:
        with open(path, "rb") as fh:
            return fh.read(5) == PDF_MAGIC
    except OSError:
        return False
