#!/usr/bin/env python3
"""Build one Ain Shams year's source manifest from inventory + probe + plan.

Schema kept field-identical to Kasr's (scripts/corpus-intake/manifest.py):
every key that manifest emits is present here with the same name and the
same meaning, so the two universities can be compared. Ain Shams conventions
Kasr does not have (no NOTE...NOTE, no batch codes) leave those fields null
rather than repurposed. New keys the Ain Shams corpus needs that Kasr's
schema has no room for (moduleFolder, term, subjectFolder, kindFolder,
subFolder, textLayerWordRatio, controlCharDetected, probeStatus,
probeOcrChars, twinOf, nameTwinOf, twinPreferred) are appended — see
docs/Ain-Shams-Source-Imports/LANE-BRIEF.md and scripts/asu/intake/README.md.

Duplicate/twin detection reads ALL THREE years' inventory files (whichever
exist) so a file's cross-year twin is found regardless of which year is
being emitted right now — LANE-BRIEF.md §3 flags Year 2 Term 2 / Year 3
holding the same CNS/Endocrine/Special Senses/Research Methodology material.
`duplicateOf` lists every other path (any year) sharing the sha256;
`twinOf` is the subset of those in a *different* year, each carrying the
other year's sourceId/yearId/moduleId, because that is specifically the
curriculum-move signal the extraction lanes need to read a paper once.

A second, separate pass catches NON-byte-identical re-exports — a re-scan, a
CamScanner copy, a "Copy of ..." — that `duplicateOf` cannot see because
their sha256 differs. Per the orchestrator (2026-08-22, citing the
Alexandria lane's finding that 0/20 sampled "[from ... Updated]"-style
re-exports were byte-identical): normalise each filename (strip emoji,
"Copy of", "(1)"-style counters, bracketed tags, a trailing "_<hash>"
suffix, case and whitespace) and group PDF rows by (normalised title,
pageCount). A group of 2+ DIFFERENT-sha256 rows is recorded as `nameTwinOf`
on every member — flagged only, nothing dropped or excluded. A follow-up
instruction (2026-08-22, Alexandria's full data: 1,424/2,163 name-twin pairs
DISAGREE on textLayer — the re-exported copy often lost its native text
layer) adds `twinPreferred`: exactly one `true` per group, chosen by
`pick_preferred()` — native text layer first, then larger pageCount, then no
copy-marker in the filename — which is NOT always the file a human would
pick from the filename alone (see `pick_human_choice()` and index.py's
README call-out for where the two disagree).

Usage: python3 manifest.py --year y1|y2|y3
"""
import argparse
import json
import os
import re
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from asu_config import ROOT, REPO, OUTDIR, HERE, UNIVERSITY, YEARS, module_id_for, source_id

IMAGE_EXTS = {"jpg", "jpeg", "png"}

# Emoji / pictographic ranges commonly found decorating a filename
# ("DPT BOOK MCQs - LABELLED \U0001F3F7️ physio female" is a real one
# in this corpus).
EMOJI_RX = re.compile(
    "[\U0001F000-\U0001FFFF\U00002190-\U000021FF\U00002300-\U000023FF"
    "\U00002B00-\U00002BFF\U00002600-\U000027BF️]+")
COPY_OF_RX = re.compile(r"\bcopy\s+of\b", re.I)
PAREN_COUNTER_RX = re.compile(r"\(\s*\d+\s*\)")
BRACKET_TAG_RX = re.compile(r"\[[^\]]*\]")
HASH_SUFFIX_RX = re.compile(r"_[0-9a-fA-F]{8,}\b")
NON_WORD_RX = re.compile(r"[_\-]+")
MULTI_SPACE_RX = re.compile(r"\s+")


def normalize_title(name):
    """Collapse a filename to something a re-scan / CamScanner copy /
    "Copy of ..." re-export would still share with the original, so
    near-duplicates ("name twins") group even though their bytes differ."""
    stem = os.path.splitext(name)[0]
    s = EMOJI_RX.sub("", stem)
    s = COPY_OF_RX.sub("", s)
    s = PAREN_COUNTER_RX.sub("", s)
    s = BRACKET_TAG_RX.sub("", s)
    s = HASH_SUFFIX_RX.sub("", s)
    s = NON_WORD_RX.sub(" ", s)
    s = MULTI_SPACE_RX.sub(" ", s).strip().lower()
    return s


# The same markers normalize_title() strips are what a human would eyeball
# to avoid picking an obvious copy — used again below, on the raw filename,
# to find "the one a human would pick by filename" for the README call-out.
COPY_MARKER_RX = re.compile(r"copy\s+of|\(\s*\d+\s*\)|camscanner", re.I)


def has_copy_marker(name):
    return bool(COPY_MARKER_RX.search(name))


def pick_preferred(group):
    """Alexandria's finding (2026-08-22, full data: 1,424/2,163 name-twin
    pairs disagree on textLayer — the re-exported copy often lost its native
    text layer): the copy an extraction lane should read is not necessarily
    the one with the cleanest-looking filename. Rank native text layer over
    none, then larger pageCount, then no copy-marker in the filename, then
    corpusRelativePath for a deterministic final tiebreak — exactly one
    preferred member per group. `group` items need textLayer, pageCount,
    fileName, corpusRelativePath, sourceId."""
    def key(m):
        return (
            0 if m["textLayer"] == "native" else 1,
            -(m["pageCount"] or 0),
            0 if not has_copy_marker(m["fileName"]) else 1,
            m["corpusRelativePath"],
        )
    return min(group, key=key)["sourceId"]


def pick_human_choice(group):
    """The member a human would pick going only by filename — the one
    without a "Copy of"/"(1)"/CamScanner marker (ties broken by path).
    Compared against pick_preferred() to find groups where filename intuition
    and actual readability disagree."""
    def key(m):
        return (0 if not has_copy_marker(m["fileName"]) else 1, m["corpusRelativePath"])
    return min(group, key=key)["sourceId"]


def load_year_data(ykey):
    cfg = YEARS[ykey]
    inv_path = os.path.join(HERE, f"inventory-{ykey}.json")
    plan_path = os.path.join(HERE, f"plan-{ykey}.json")
    probe_path = os.path.join(HERE, f"probe-{ykey}.json")
    if not os.path.exists(inv_path):
        return None
    inv = json.load(open(inv_path))
    plan = {x["sha256"]: x for x in json.load(open(plan_path))["plan"]} if os.path.exists(plan_path) else {}
    probe = {}
    if os.path.exists(probe_path):
        for x in json.load(open(probe_path))["probed"]:
            probe.setdefault(x["sha256"], x)  # first hit; duplicate sha within a year is rare and immaterial here
    return {"cfg": cfg, "inv": inv, "plan": plan, "probe": probe}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--year", required=True, choices=["y1", "y2", "y3"])
    args = ap.parse_args()

    all_years = {yk: load_year_data(yk) for yk in ("y1", "y2", "y3")}
    target = all_years[args.year]
    if target is None:
        print(f"no inventory-{args.year}.json — run inventory.py first", file=sys.stderr)
        sys.exit(1)
    cfg = target["cfg"]

    # sha256 -> list of (yearId, corpusRelativePath, sourceId, moduleId) across every year loaded.
    sha_index = {}
    # (normalisedTitle, pageCount) -> list of (sha256, sourceId, yearId, corpusRelativePath),
    # PDFs only, pageCount required — the near-duplicate pass.
    title_index = {}
    for yk, data in all_years.items():
        if data is None:
            continue
        for f in data["inv"]["files"]:
            crp = os.path.join(data["cfg"]["walkRoot"], f["rel"])
            mod_id = module_id_for(data["cfg"]["yearId"], f.get("moduleFolder"))
            sha_index.setdefault(f["sha256"], []).append({
                "yearId": data["cfg"]["yearId"], "corpusRelativePath": crp,
                "sourceId": source_id(f["sha256"]), "moduleId": mod_id,
            })
            if f["fileType"] == "pdf" and f.get("pages"):
                key = (normalize_title(f["name"]), f["pages"])
                title_index.setdefault(key, []).append({
                    "sha256": f["sha256"], "sourceId": source_id(f["sha256"]),
                    "yearId": data["cfg"]["yearId"], "corpusRelativePath": crp,
                    "textLayer": f["textLayer"], "pageCount": f["pages"],
                    "fileName": f["name"],
                })

    rows = []
    for f in target["inv"]["files"]:
        sha = f["sha256"]
        pl = target["plan"].get(sha, {})
        pr = target["probe"].get(sha)

        corpus_rel = os.path.join(cfg["walkRoot"], f["rel"])
        abs_path = os.path.join(ROOT, corpus_rel)
        module_folder = f.get("moduleFolder")
        subject_folder = f.get("subjectFolder")
        module_id = module_id_for(cfg["yearId"], module_folder)
        subject = None if subject_folder in (None, "All Subjects") else subject_folder
        no_text = f["fileType"] == "pdf" and f["textLayer"] != "native"

        row = {
            "sourceId": source_id(sha),
            "sha256": sha,
            "absolutePath": abs_path,
            "corpusRelativePath": corpus_rel,
            "fileName": f["name"],
            "fileNameWithoutInstructions": f["name"],  # no NOTE...NOTE convention here
            "universityId": UNIVERSITY,
            "yearId": cfg["yearId"],
            "moduleId": module_id,
            "secondaryModule": None,  # no 2ry-Modules-style cross-cutting stream in this corpus
            "moduleSubjectPath": (f"{module_id} > {subject}" if module_id and subject else None),
            "sourceCategory": pl.get("sourceCategory"),
            "instructor": pl.get("instructor"),
            "crossModulePractical": subject_folder == "All Subjects",
            "subject": subject,
            "examType": pl.get("examType"),
            "bookKind": pl.get("bookKind"),
            "sourceTier": pl.get("sourceTier", 8),
            "folderPriorityLabel": None,  # ASU corpus carries no "[1st priority]" convention (checked)
            "examSitting": pl.get("examSitting"),
            "rawYearCode": None,  # no batch-code system at Ain Shams
            "batchImpliesCalendarYear": None,
            "calendarYearLabel": pl.get("calendarYearLabel"),
            "yearConflict": None,  # nothing to conflict with — no batch code
            # LANE-BRIEF.md: "a printed year wins; Ain Shams has no batch
            # codes — say null rather than derive." calendarYearLabel above
            # is filename-derived and, per SHARED-TOOLCHAIN's "A year sourced
            # from the filename is not the examiner's date", unverified.
            # Promoting it to examSittingYear here would be exactly that
            # mistake, so both stay null until someone reads the page.
            "examSittingYear": None,
            "examSittingYearSource": None,
            "solvedStatus": pl.get("solvedStatus"),
            "oldSystemExcluded": pl.get("oldSystemFlag", False),
            "exclusionReason": pl.get("exclusionReason"),
            "appliedNoteInstructions": [],  # no NOTE...NOTE convention here
            "fileType": f["fileType"],
            "pageCount": f["pages"],
            "textLayer": f["textLayer"],
            "processingStatus": ("ocr_required" if (f["fileType"] == "pdf" and no_text) or f["fileType"] in IMAGE_EXTS
                                  else "pending"),
            "extractionDisposition": None,
            # --- Ain Shams additions, not in Kasr's schema ---
            "moduleFolder": module_folder,
            "term": f.get("term"),
            "subjectFolder": subject_folder,
            "kindFolder": f.get("kindFolder"),
            "subFolder": f.get("subFolder"),
            "extensionSniffed": f.get("extensionSniffed", False),
            "textLayerWordRatio": f.get("wordRatio"),
            "controlCharDetected": f.get("hasControlChar", False),
            "probeStatus": (pr["probeStatus"] if pr else None),
            "probeOcrChars": (pr["ocrChars"] if pr else None),
        }
        rows.append(row)

    # duplicateOf (any year, any path) and twinOf (a different year specifically).
    for r in rows:
        group = [x for x in sha_index.get(r["sha256"], []) if x["corpusRelativePath"] != r["corpusRelativePath"]]
        r["duplicateOf"] = [x["corpusRelativePath"] for x in group] if group else None
        twins = [x for x in group if x["yearId"] != r["yearId"]]
        r["twinOf"] = ([{"sourceId": x["sourceId"], "yearId": x["yearId"], "moduleId": x["moduleId"],
                          "corpusRelativePath": x["corpusRelativePath"]} for x in twins]
                        if twins else None)

    # nameTwinOf: same normalised title + pageCount, DIFFERENT sha256 — a
    # re-scan / CamScanner copy / "Copy of ..." re-export that duplicateOf
    # (sha256-only) cannot see. Flagged only; nothing is dropped or excluded
    # on this basis. Per the orchestrator (2026-08-22, Alexandria's full
    # data: 1,424/2,163 name-twin pairs disagree on textLayer — the
    # re-exported copy often lost its native text layer), every member of a
    # group also gets `twinPreferred`: exactly one `true` per group, chosen
    # by pick_preferred() (native text layer, then larger pageCount, then no
    # copy-marker in the filename, then path) — NOT necessarily the file a
    # human would guess from its name alone.
    for r in rows:
        if r["fileType"] != "pdf" or not r["pageCount"]:
            r["nameTwinOf"] = None
            r["twinPreferred"] = None
            continue
        key = (normalize_title(r["fileName"]), r["pageCount"])
        group = title_index.get(key, [])
        others = [x for x in group if x["sha256"] != r["sha256"]]
        r["nameTwinOf"] = ([{"sourceId": x["sourceId"], "yearId": x["yearId"],
                              "corpusRelativePath": x["corpusRelativePath"]} for x in others]
                            if others else None)
        if others:
            preferred_id = pick_preferred(group)
            r["twinPreferred"] = (r["sourceId"] == preferred_id)
        else:
            r["twinPreferred"] = None  # no twin — the question does not apply

    # moduleSubjectDeclarations: observed (module, subject) pairs in this
    # year's corpus, with file counts — the direct evidence of which
    # subjects a module actually holds, replacing Kasr's NOTE-on-empty-folder
    # convention (which does not exist here) with what is actually on disk.
    decl_counts = {}
    for r in rows:
        if r["moduleFolder"] == "Administration":
            continue
        key = (r["moduleFolder"], r["subjectFolder"])
        decl_counts[key] = decl_counts.get(key, 0) + 1
    declarations = [
        {"moduleId": module_id_for(cfg["yearId"], mf), "moduleFolder": mf, "subjectFolder": sf,
         "kind": "observed subject folder", "fileCount": n}
        for (mf, sf), n in sorted(decl_counts.items(), key=lambda kv: (kv[0][0] or "", kv[0][1] or ""))
    ]

    os.makedirs(OUTDIR, exist_ok=True)
    doc = {
        "schemaVersion": "kasr-source-manifest/1.0.0",
        "generatedOn": date.today().isoformat(),
        "universityId": UNIVERSITY,
        "yearId": cfg["yearId"],
        "corpusRoot": os.path.join(ROOT, cfg["walkRoot"]),
        "note": ("Field semantics kept identical to Kasr's manifest (schemaVersion unchanged) so the "
                 "two universities can be compared. Ain Shams has no NOTE...NOTE convention and no batch "
                 "codes; examSittingYear/examSittingYearSource/rawYearCode/batchImpliesCalendarYear/"
                 "yearConflict/appliedNoteInstructions are therefore always null/[] here, never derived. "
                 "See scripts/asu/intake/README.md for the added fields."),
        "moduleSubjectDeclarations": declarations,
        "count": len(rows),
        "sources": sorted(rows, key=lambda r: r["corpusRelativePath"]),
    }
    out_path = os.path.join(OUTDIR, cfg["outName"])
    json.dump(doc, open(out_path, "w"), indent=1, ensure_ascii=False)
    print(f"[{args.year}] {len(rows)} sources -> {out_path}")


if __name__ == "__main__":
    main()
