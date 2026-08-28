#!/usr/bin/env python3
# Copied from scripts/corpus-intake/manifest.py @ 6b32fa6 (Kasr Alainy
# corpus-intake lane). Rewritten for the Helwan lane: same field names so a
# Kasr-shaped tool can read this manifest, but the derivations differ because
# Helwan's corpus is already organised (see classify.py's header) rather than
# loose, and because Helwan's `Batch N` marker has no known code->year formula
# the way Kasr's did — it is recorded raw and never used to invent a year.
"""Build the Helwan Years 1-3 source manifest.

One row per file in /Users/doitrous/Desktop/helwan, carrying the identity,
placement and exam signals every later authoring stage needs, so no stage has
to re-derive them from a path and quietly disagree with the last one.

Deliberate choices worth knowing:

  * `moduleId` is null only for year-level Administration/Reference Library
    and for rows classify.py could not place — every null carries a
    `disposition` saying why, never a silent gap.
  * A `Batch N` filename token is kept as `batchCode` raw. Unlike Kasr's
    batch codes (192-200, each mapped to a known calendar year by a table
    Omar built by reading the papers), Helwan's batch numbers have no
    verified formula, so `examSittingYear` stays null and
    `examSittingYearSource` is "unknown" rather than a guess.
  * A scanned file, or a text layer that fails the word-forming-character
    ratio guard, is marked `ocr-needed`, never "empty".
  * Answer-bearing and answer-free twins are paired by normalised stem
    within the same folder; the pairing is best-effort (`pairedWith`), not a
    guarantee every twin was found.
  * Name twins (`nameTwinOf`/`twinPreferred`) are a separate, corpus-wide
    pass keyed on filename alone, deliberately blind to page count and
    textLayer, because a "[Updated]" re-upload can silently change either —
    Alexandria found 1,424/2,163 such pairs disagree on textLayer. Report
    only; every row survives.
"""
import hashlib
import json
import os
import re
import unicodedata
from datetime import date

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = "/Users/doitrous/Desktop/helwan"
REPO = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
OUTDIR = os.path.join(REPO, "docs", "Helwan-Source-Imports", "manifest")

UNIVERSITY = "hu"

# Orchestrator ruling 2026-08-22: the stored module id is a global string
# `HU-<CODE>`, not the faculty's own folder label. The folder label is kept
# on the row as `moduleLabel` (and is what the README tables print).
MODULE_ID_MAP = {
    "BMS 101": "HU-BMS-101",
    "BMS 102": "HU-BMS-102",
    "LCS 103": "HU-LCS-103",
    "PSY 104": "HU-PSY-104",
    "INH 201": "HU-INH-201",
    "Community 202": "HU-COMMUNITY-202",
    "NSS 203": "HU-NSS-203",
    "CRS 204": "HU-CRS-204",
    "GIT 301": "HU-GIT-301",
    "URS 303": "HU-URS-303",
    "FTF 304": "HU-FTF-304",
    "ORL 305": "HU-ORL-305",
}

NEAR_DUP_STRIP_WORDS_RX = re.compile(r"\b(updated|copy|from|new|old|final|latest|revised)\b", re.I)
NEAR_DUP_BRACKET_RX = re.compile(r"\[[^\]]*\]|\([^)]*\)")
NEAR_DUP_PUNCT_RX = re.compile(r"[^\w\s]", re.UNICODE)


def normalized_title_for_near_dup(name):
    """Loose title match for re-uploaded twins that are not byte-identical:
    same words, same page count, different bytes (recompressed, re-exported,
    a bracketed "[Updated]" tag added). Alexandria sampled 20 such pairs and
    found 0/20 byte-identical, so sha256 dedupe alone misses them.
    """
    stem = os.path.splitext(name)[0]
    stem = NEAR_DUP_BRACKET_RX.sub(" ", stem)
    stem = NEAR_DUP_STRIP_WORDS_RX.sub(" ", stem)
    stem = NEAR_DUP_PUNCT_RX.sub(" ", stem)
    stem = unicodedata.normalize("NFKC", stem).lower()
    return re.sub(r"\s+", " ", stem).strip()


# Orchestrator ruling 2026-08-22 (urgent): "[Updated]" re-uploads frequently
# DISAGREE with the original on textLayer (Alexandria found 1,424/2,163 such
# pairs disagree) — so a name-twin pass has to run independently of page
# count and independently of textLayer, or it would hide exactly the
# disagreement it exists to surface. Only brackets/parens and the bare words
# "copy"/"modified" are stripped — "answer"/"answered"/"unanswered" are left
# alone on purpose so a solved copy and its unsolved twin stay separate rows
# (that pairing already exists via `pairedWith`, above).
NAME_TWIN_BRACKET_RX = re.compile(r"\[[^\]]*\]|\([^)]*\)")
NAME_TWIN_WORDS_RX = re.compile(r"\b(copy|modified)\b", re.I)
NAME_TWIN_PUNCT_RX = re.compile(r"[^\w\s]", re.UNICODE)


def normalized_title_for_name_twin(name):
    stem = os.path.splitext(name)[0]
    stem = NAME_TWIN_BRACKET_RX.sub(" ", stem)
    stem = NAME_TWIN_WORDS_RX.sub(" ", stem)
    stem = NAME_TWIN_PUNCT_RX.sub(" ", stem)
    stem = unicodedata.normalize("NFKC", stem).lower()
    return re.sub(r"\s+", " ", stem).strip()


def mtime_of(path):
    try:
        return os.path.getmtime(path)
    except OSError:
        return None


TWIN_STRIP_RX = re.compile(
    r"\s*[\(\[]?\s*(with\s+answers?|without\s+answers?|un[\s-]?answered|answered|"
    r"answers?|answer\s*key|unsolved|solved|\.noted)\s*[\)\]]?\s*",
    re.I,
)
PAREN_NUM_RX = re.compile(r"\s*\(\d+\)\s*$")
INSTRUCTOR_RX = re.compile(r"(?:^|[\s_/])(?:Dr\.?|DR\.?)\s*([A-Za-z]+)")


def source_id(sha):
    return "src_" + sha[:20]


def normalized_stem(name):
    stem = os.path.splitext(name)[0]
    stem = TWIN_STRIP_RX.sub(" ", stem)
    stem = PAREN_NUM_RX.sub("", stem)
    stem = unicodedata.normalize("NFKC", stem).strip().lower()
    stem = re.sub(r"\s+", " ", stem)
    return stem


def detect_instructor(*texts):
    for t in texts:
        if not t:
            continue
        m = INSTRUCTOR_RX.search(t)
        if m:
            return m.group(1).title()
    return None


TIER_RX_ORDER = [
    (lambda r: r["isDepartmentBook"], 1),
    (lambda r: r["examType"] in ("EOM", "EOY"), 2),
    (lambda r: r["bookKind"] == "question", 3),
    (lambda r: (r["sourceCategory"] or "").split("/")[0] in
        ("Core Notes", "Official Course Files", "Theoretical", "All Subjects"), 4),
    (lambda r: (r["sourceCategory"] or "").split("/")[0] in ("Practical", "Practical Labs"), 5),
    (lambda r: (r["sourceCategory"] or "").split("/")[0] in ("Revision", "Notes and Summaries"), 6),
    (lambda r: r["exclusionReason"] == "excluded-administrative", 7),
    (lambda r: r["sourceCategory"] in ("index", "root", "year-root", "Reference"), 8),
]


def source_tier(row):
    for pred, tier in TIER_RX_ORDER:
        if pred(row):
            return tier
    return 9


def main():
    inv_files = json.load(open(os.path.join(HERE, "cache", "inventory.json")))["files"]
    probe_by_sha = {x["sha256"]: x for x in json.load(open(os.path.join(HERE, "cache", "probe.json")))}
    plan_by_sha = {x["sha256"]: x for x in json.load(open(os.path.join(HERE, "cache", "plan.json")))}

    rows = []
    for f in inv_files:
        rel, name, sha = f["rel"], f["name"], f["sha256"]
        pl = plan_by_sha.get(sha, {})
        pr = probe_by_sha.get(sha, {})

        subfolder = pl.get("subfolder")
        instructor = detect_instructor(subfolder, name)

        module_label = pl.get("moduleId")
        module_id = MODULE_ID_MAP.get(module_label) if module_label else None
        subject = pl.get("subject")
        category = pl.get("category")
        module_subject_path = " > ".join(
            p for p in (module_label, subject, category if category != subject else None) if p
        ) or None

        row = {
            "sourceId": source_id(sha),
            "sha256": sha,
            "absolutePath": os.path.join(ROOT, rel),
            "corpusRelativePath": rel,
            "fileName": name,
            "fileNameWithoutInstructions": name,
            "universityId": UNIVERSITY,
            "yearId": pl.get("yearId"),
            "moduleId": module_id,
            "moduleLabel": module_label,
            "secondaryModule": None,
            "moduleSubjectPath": module_subject_path,
            "subject": subject,
            "sourceCategory": category,
            "subfolder": subfolder,
            "instructor": instructor,
            "crossModulePractical": False,
            "examType": pl.get("examType"),
            "bookKind": pl.get("bookKind"),
            "isDepartmentBook": pl.get("isDepartmentBook", False),
            "folderPriorityLabel": None,
            "examSitting": None,
            "rawYearCode": pl.get("batchCode"),
            "batchCode": pl.get("batchCode"),
            "batchImpliesCalendarYear": None,
            "calendarYearLabel": pl.get("examSittingYear") if pl.get("examSittingYearSource") == "filename" else None,
            "yearConflict": None,
            "examSittingYear": pl.get("examSittingYear"),
            "examSittingYearSource": pl.get("examSittingYearSource"),
            "solvedStatus": "solved" if pl.get("solvedCopy") else ("unsolved" if pl.get("unsolvedTwin") else None),
            "solvedCopy": bool(pl.get("solvedCopy")),
            "unsolvedTwin": bool(pl.get("unsolvedTwin")),
            "originUniversityHint": pl.get("originUniversityHint"),
            "oldSystemExcluded": False,
            "exclusionReason": "excluded-administrative" if pl.get("excludedAdministrative") else None,
            "extractionDisposition": "excluded-administrative" if pl.get("excludedAdministrative") else None,
            "disposition": pl.get("disposition"),
            "appliedNoteInstructions": [],
            "fileType": f["ext"].lstrip(".") or "unknown",
            "pageCount": f["pages"],
            "textLayer": pr.get("textLayerVerdict", "unknown"),
            "wordCharRatio": pr.get("wordCharRatio"),
            "converterNeeded": pl.get("converterNeeded"),
            "processingStatus": "ocr_required" if pl.get("needsOcr") else "pending",
            "firstPageSnippet": (pr.get("text") or "")[:600] or None,
        }
        row["sourceTier"] = source_tier(row)
        rows.append(row)

    # Duplicates: same bytes seen at more than one path.
    by_sha = {}
    for r in rows:
        by_sha.setdefault(r["sha256"], []).append(r)
    for group in by_sha.values():
        if len(group) > 1:
            paths = [g["corpusRelativePath"] for g in group]
            for g in group:
                g["duplicateOf"] = [p for p in paths if p != g["corpusRelativePath"]]

    # Solved/unsolved twins: same directory, same normalised stem.
    by_dir_stem = {}
    for r in rows:
        d = os.path.dirname(r["corpusRelativePath"])
        stem = normalized_stem(r["fileName"])
        by_dir_stem.setdefault((d, stem), []).append(r)
    for group in by_dir_stem.values():
        if len(group) > 1 and any(g["solvedCopy"] or g["unsolvedTwin"] for g in group):
            paths = [g["corpusRelativePath"] for g in group]
            for g in group:
                twins = [p for p in paths if p != g["corpusRelativePath"]]
                if twins:
                    g["pairedWith"] = twins

    # Near-duplicates: same normalised title AND same page count, different
    # bytes — a re-upload/re-export sha256 dedupe cannot see. Report only,
    # never drops a row. Restricted to rows with a known page count (real
    # PDFs) so images/notes with pageCount=None don't false-match each other.
    by_title_pages = {}
    for r in rows:
        if r["pageCount"] is None:
            continue
        key = (normalized_title_for_near_dup(r["fileName"]), r["pageCount"])
        if not key[0]:
            continue
        by_title_pages.setdefault(key, []).append(r)
    for group in by_title_pages.values():
        if len(group) > 1:
            for g in group:
                others = [o for o in group if o is not g and o["sha256"] != g["sha256"]]
                if others:
                    g["nearDuplicateOf"] = [o["sourceId"] for o in others]

    # Name twins: same normalised filename regardless of page count or text
    # layer (those are exactly what a re-upload can change) — report only,
    # never drops a row. One preferred copy per group: textLayer=="native"
    # first, then the larger page count, then the older mtime.
    by_name_twin = {}
    for r in rows:
        key = normalized_title_for_name_twin(r["fileName"])
        if not key:
            continue
        by_name_twin.setdefault(key, []).append(r)
    for group in by_name_twin.values():
        if len(group) <= 1:
            continue
        for g in group:
            g["_mtime"] = mtime_of(g["absolutePath"])
        preferred = min(
            group,
            key=lambda r: (
                0 if r["textLayer"] == "native" else 1,
                -(r["pageCount"] if r["pageCount"] is not None else -1),
                r["_mtime"] if r["_mtime"] is not None else float("inf"),
            ),
        )
        for g in group:
            g["nameTwinOf"] = preferred["sourceId"]
            g["twinPreferred"] = g is preferred
            del g["_mtime"]

    os.makedirs(OUTDIR, exist_ok=True)
    doc = {
        "schemaVersion": "helwan-source-manifest/1.0.0",
        "generatedOn": date.today().isoformat(),
        "universityId": UNIVERSITY,
        "yearIds": ["HU_Y1", "HU_Y2", "HU_Y3"],
        "corpusRoot": ROOT,
        "note": (
            "Path gives module (2nd segment), subject (3rd), category (4th, "
            "folded with a 5th under Assessments/Administration) per the "
            "Helwan lane brief; classify.py never guesses placement the way "
            "the Kasr version had to. `Batch N` is kept raw as batchCode and "
            "never translated into a year — no formula for it is known. See "
            "docs/Helwan-Source-Imports/manifest/README.md."
        ),
        "moduleSubjectDeclarations": [],
        "count": len(rows),
        "sources": sorted(rows, key=lambda r: r["corpusRelativePath"]),
    }
    out = os.path.join(OUTDIR, "helwan-y1-3-sources.json")
    json.dump(doc, open(out, "w"), indent=1, ensure_ascii=False)
    print(f"{len(rows)} sources -> {out}")
    return doc


if __name__ == "__main__":
    main()
