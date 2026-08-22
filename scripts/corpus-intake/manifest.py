#!/usr/bin/env python3
"""Build the Kasr Alainy source manifest.

    python3 scripts/corpus-intake/manifest.py            # y1, unchanged
    python3 scripts/corpus-intake/manifest.py --year y2

One row per file in the corpus, carrying the identity, placement and exam
signals every later stage needs, so that no stage has to re-derive them from a
filename and quietly disagree with the last one.

Deliberate choices worth knowing, true of every year:

  * Batch code and calendar year are both kept, always, and the disagreement
    between them is recorded rather than erased. `examSittingYear` says which
    one recency should use, and `examSittingYearSource` says how it was decided,
    so a later reader can disagree with the call without having to re-derive it.
  * A scanned file with no text layer is marked `ocr_required`, never "empty".
  * `sourceId` is content-addressed (`src_` + first 20 hex of the sha256), so
    the same bytes filed under two paths — or two modules — share one ID.

**y1 (default, `run_y1_legacy`)** is the original implementation, unedited
beyond reading its constants from `year_config.Y1` instead of module-level
globals: same `MODULE_OF_DIR`, `TIER`, `BATCH_YEAR`-shaped table, same
instructor/year/sitting/solved detectors, same row shape, same
`moduleSubjectDeclarations` walk for the owner's `NOTE … NOTE` folders.

**y2 onward (`run_priority_folder`)** merges `classify.py`'s plan (keyed by
path — see its docstring for why) with `inventory.json`'s identity fields.
Almost every semantic decision — module, subject, tier, category, evidence —
was already made in the plan; this adds sourceId/paths, year-signal
computation (the batch-code math lives in `year_config.batch_year`, not
hand-copied here), textLayer/processingStatus (using the sturdier
word-forming-ratio guard — see `year_config.needs_ocr`), and the
sha256-based `duplicateOf` cross-linking.
"""
import argparse
import json
import os
import re
import unicodedata
from datetime import date

from year_config import ROOT, REPO, OUTDIR, year_cfg, needs_ocr

HERE = os.path.dirname(os.path.abspath(__file__))
UNIVERSITY = "kau"

# ===========================================================================
# y1 — original implementation, unedited except for --year plumbing.
# ===========================================================================

Y1_YEAR_ID = "KAU_Y1"

Y1_BATCH_YEAR = {200: 2026, 199: 2025, 198: 2024, 197: 2023, 196: 2022, 195: 2021,
              194: 2020, 193: 2019, 192: 2018}

Y1_MODULE_OF_DIR = {
    "101 ISK": "101 ISK", "102 INT": "102 INT", "103 BMS": "103 BMS",
    "104 CPS": "104 CPS", "108 INT": "108 INT",
}

# The absolute priority hierarchy, lowest number = strongest.
Y1_TIER = {
    "Orientation": 1,
    "EOM": 2, "EOY": 2,
    "Baqoon": 3,
    "Department Book": 4,
    "Department Questions": 5, "Practical": 5,
    "Written Questions": 5,
    "Important & Summaries": 7,
    "Exams": 2, "Book": 4, "Questions": 5, "Notes": 7,
}

NOTE_RX = re.compile(r"\bNOTE\b(.+?)\bNOTE\b", re.I | re.S)
Y1_PRIORITY_RX = re.compile(r"\[\s*(1st|2nd|3rd|4th|5th|first|second|third|last)\s*priority\s*\]", re.I)


def norm(s):
    return unicodedata.normalize("NFC", s or "")


def source_id(sha):
    return "src_" + sha[:20]


def notes_on_path(rel):
    out = []
    for part in rel.split(os.sep):
        for m in NOTE_RX.finditer(part):
            out.append(norm(m.group(1)).strip())
    return out


def strip_notes(name):
    return NOTE_RX.sub("", name).strip()


def y1_year_signals(rel, text):
    hay = norm(os.path.basename(rel))
    batch = None
    for m in re.finditer(r"\b(19[2-9]|200)\b", hay):
        value = int(m.group(1))
        if value in Y1_BATCH_YEAR:
            batch = value
            break
    cal = None
    for m in re.finditer(r"\b(19[89]\d|20[0-3]\d)\b", hay):
        cal = int(m.group(1))
        break
    implied = Y1_BATCH_YEAR.get(batch) if batch else None
    conflict = None
    if implied and cal and implied != cal:
        conflict = {"batchCode": batch, "batchImpliesYear": implied,
                    "calendarLabel": cal, "differenceYears": cal - implied}
    return batch, implied, cal, conflict


def y1_sitting(rel, text):
    hay = norm(os.path.basename(rel)) + " " + norm(text)[:1500]
    if re.search(r"الدور\s*الثالث|دور\s*ثالث|third", hay):
        return "third"
    if re.search(r"الدور\s*الثاني|دور\s*(تاني|ثاني)|second|redo", hay, re.I):
        return "second"
    if re.search(r"الدور\s*الأول|دور\s*أول|first", hay):
        return "first"
    return None


def y1_solved(rel):
    hay = norm(os.path.basename(rel))
    if re.search(r"unsolved|not\s*answer|no\s*answers|without\s*answers|\[unsolved\]", hay, re.I):
        return "unsolved"
    if re.search(r"solved|answers?\b|answered|\bحل\b", hay, re.I):
        return "solved"
    return None


def run_y1_legacy(cfg):
    inv = {x["sha256"]: x for x in json.load(open(os.path.join(HERE, cfg["inventoryName"])))["files"]}
    files = json.load(open(os.path.join(HERE, cfg["inventoryName"])))["files"]
    probe = {x["sha256"]: x for x in json.load(open(os.path.join(HERE, cfg["probeName"])))}
    plan = {x["sha256"]: x for x in json.load(open(os.path.join(HERE, cfg["planName"])))}

    rows = []
    for f in files:
        rel = f["rel"]
        name = f["name"]
        if name == ".DS_Store":
            continue

        parts = rel.split(os.sep)
        module = next((Y1_MODULE_OF_DIR[p] for p in parts if p in Y1_MODULE_OF_DIR), None)
        secondary = None
        if "2ry Modules" in parts:
            i = parts.index("2ry Modules")
            secondary = parts[i + 1] if len(parts) > i + 1 else None

        instructor = None
        for part in parts:
            m = re.search(r"(?:^|\s)(?:Dr\.?|DR\.?|dr\.?)\s*([A-Za-z]+)", part)
            if m and "priority" not in part.lower() or (m and "priority" in part.lower()):
                instructor = m.group(1).title()
                break
        if "VIP Academy" in rel:
            instructor = "VIP Academy"
        # One teacher, spelled both ways across the corpus.
        instructor = {"Jalal": "Galal", "Fawzy": "Fawzi"}.get(instructor, instructor)

        pl = plan.get(f["sha256"])
        pr = probe.get(f["sha256"])
        text = (pr or {}).get("text", "")
        ftype = (pl or {}).get("type")
        if not ftype:
            # Files that were never loose keep the type their folder states.
            folder = parts[-2] if len(parts) > 1 else ""
            ftype = folder if folder in Y1_TIER else "Instructor material"
        if ftype.startswith("Doctors/"):
            # "Doctors/Dr. Zahra Histology" names the same person as the
            # "Histology Dr. Zahra Histology [3rd priority]" folder does.
            m = re.search(r"Dr\.?\s*([A-Za-z]+)", ftype)
            instructor = m.group(1).title() if m else instructor
            ftype = "Instructor material"

        cross_module = "PRACTICAL FIRST YEAR" in parts
        if cross_module:
            # The practical folder spans modules; take one from the filename
            # where the file names it, and mark it cross-module either way.
            m = re.search(r"\b(101|102|103|104|108)\b", norm(name))
            if m and not module:
                module = next(v for k, v in Y1_MODULE_OF_DIR.items() if k.startswith(m.group(1)))
        administrative = parts[0] == "Marks"

        old_system = bool(re.search(r"OLD\s*SYSTEM", norm(name), re.I))
        batch, implied, cal, conflict = y1_year_signals(rel, text)
        prio = Y1_PRIORITY_RX.search(rel)
        no_text = f["ext"] == ".pdf" and (f["text_chars"] or 0) < 60

        rows.append({
            "sourceId": source_id(f["sha256"]),
            "sha256": f["sha256"],
            "absolutePath": os.path.join(cfg["corpusRoot"], rel),
            "corpusRelativePath": rel,
            "fileName": name,
            "fileNameWithoutInstructions": strip_notes(name),
            "universityId": UNIVERSITY,
            "yearId": Y1_YEAR_ID,
            "moduleId": module,
            "secondaryModule": secondary,
            "moduleSubjectPath": None,
            "sourceCategory": "Administrative (student marks)" if administrative else ftype,
            "instructor": instructor,
            "crossModulePractical": cross_module,
            "subject": (pl or {}).get("subject"),
            "examType": ftype if ftype in ("Orientation", "EOM", "EOY", "Baqoon") else None,
            "bookKind": ("theoretical" if ftype in ("Department Book", "Book")
                         else "question" if ftype in ("Department Questions", "Questions")
                         else "practical" if ftype == "Practical" else None),
            "sourceTier": Y1_TIER.get(ftype, 8),
            "folderPriorityLabel": prio.group(0) if prio else None,
            "examSitting": y1_sitting(rel, text),
            "rawYearCode": batch,
            "batchImpliesCalendarYear": implied,
            "calendarYearLabel": cal,
            "yearConflict": conflict,
            # The year a paper was actually sat, which is what recency means.
            #
            # Settled by reading the papers rather than by rule. Twelve
            # filenames carry both a batch code and a calendar year and disagree;
            # five of those twelve print an exam date in their own header, and in
            # all five the calendar label matches the document and the batch code
            # does not — 197/"2024" is dated 14 July 2024, 196/"2021" is dated
            # 26/12/2021, 195/"2022" is dated 22 and 24 September 2022.
            #
            # So the batch code names the cohort, not a year. It is kept, because
            # "which cohort sat this" is a real question, but it is not a date and
            # is only used to derive one when nothing better exists.
            "examSittingYear": cal if cal else implied,
            "examSittingYearSource": ("calendar label on the file" if cal
                                      else "derived from batch code" if implied
                                      else None),
            "solvedStatus": y1_solved(rel),
            "oldSystemExcluded": old_system,
            "exclusionReason": ("superseded_curriculum_old_system" if old_system
                                else "administrative_not_medical_source" if administrative
                                else None),
            "appliedNoteInstructions": notes_on_path(rel),
            "fileType": f["ext"].lstrip(".") or "unknown",
            "pageCount": f["pages"],
            "textLayer": "none" if no_text else ("native" if f["ext"] == ".pdf" else "n/a"),
            "processingStatus": "ocr_required" if no_text else "pending",
            "extractionDisposition": None,
        })

    # Files sharing bytes are the same source seen twice; say so on both.
    by_sha = {}
    for r in rows:
        by_sha.setdefault(r["sha256"], []).append(r)
    for group in by_sha.values():
        if len(group) > 1:
            paths = [g["corpusRelativePath"] for g in group]
            for g in group:
                g["duplicateOf"] = [p for p in paths if p != g["corpusRelativePath"]]

    # The owner's `NOTE … NOTE` declarations sit on empty directories, so no
    # file row can carry them. They state which subjects a module has, which is
    # exactly the constraint every later tagging step needs.
    declarations = []
    for dirpath, dirnames, filenames in os.walk(cfg["corpusRoot"]):
        for d in dirnames:
            full = os.path.join(dirpath, d)
            rel_d = os.path.relpath(full, cfg["corpusRoot"])
            parts_d = rel_d.split(os.sep)
            mod = next((Y1_MODULE_OF_DIR[p] for p in parts_d if p in Y1_MODULE_OF_DIR), None)
            note = NOTE_RX.search(d)
            if note:
                declarations.append({
                    "moduleId": mod, "kind": "explicit NOTE instruction",
                    "literalText": norm(d),
                    "instruction": norm(note.group(1)).strip(),
                    "path": rel_d,
                })
            elif mod and not os.listdir(full) and d in (
                    "Anatomy", "Histology", "Physiology", "Biochemistry",
                    "Pathology", "Pharmacology"):
                declarations.append({
                    "moduleId": mod, "kind": "empty subject folder",
                    "literalText": d, "instruction": f"module has subject {d}",
                    "path": rel_d,
                })

    os.makedirs(OUTDIR, exist_ok=True)
    doc = {
        "schemaVersion": "kasr-source-manifest/1.0.0",
        "generatedOn": date.today().isoformat(),
        "universityId": UNIVERSITY,
        "yearId": Y1_YEAR_ID,
        "corpusRoot": cfg["corpusRoot"],
        "note": ("Batch code and calendar year are both recorded and never merged. "
                 "See yearConflict, and the open question in "
                 "docs/medical-library-program/KASR-SOURCE-EXTRACTION-PLAN.md §8."),
        "moduleSubjectDeclarations": sorted(declarations, key=lambda x: (x["moduleId"] or "", x["literalText"])),
        "count": len(rows),
        "sources": sorted(rows, key=lambda r: r["corpusRelativePath"]),
    }
    out = os.path.join(OUTDIR, cfg["manifestName"])
    json.dump(doc, open(out, "w"), indent=1, ensure_ascii=False)
    print(f"{len(rows)} sources -> {out}")
    return doc


# ===========================================================================
# y2 onward — merges classify.py's path-keyed plan with inventory identity.
# ===========================================================================

def y2_year_signals(name, cfg):
    hay = unicodedata.normalize("NFKC", name or "")
    batch = None
    for m in re.finditer(r"\b(19[0-9]|200)\b", hay):
        v = int(m.group(1))
        if v in cfg["batchYear"]:
            batch = v
            break
    cal = None
    for m in re.finditer(r"\b(19[89]\d|20[0-3]\d)\b", hay):
        cal = int(m.group(1))
        break
    implied = cfg["batchYear"].get(batch) if batch else None
    conflict = None
    if implied and cal and implied != cal:
        conflict = {"batchCode": batch, "batchImpliesYear": implied,
                    "calendarLabel": cal, "differenceYears": cal - implied}
    return batch, implied, cal, conflict


def y2_sitting_year(exam_type, cal, implied):
    """The academic year straddles the calendar year — EOM sits in December,
    EOY in June/July, a resit in September — so a batch code only implies a
    single calendar year for the sittings that are anchored to the *end* of
    the academic year (EOY, Baqoon, and the combined EOM & EOY compilations).
    An EOM paper with no printed calendar year is left unresolved rather than
    guessed, because the batch's academic year began in the *previous*
    calendar year for anything sat before January. A printed calendar label
    always wins outright, for any exam type. See README-y<N>.md for the
    worked examples this rule is read off.
    """
    if cal:
        return cal, "calendar label on the file"
    if exam_type == "EOM":
        return (None, "batch code only; EOM may fall in the preceding calendar year") if implied else (None, None)
    if implied:
        return implied, "derived from batch code (EOY rule)"
    return None, None


_TWIN_STRIP_RX = re.compile(
    r"\[(?:updated|update|new|revised|copy|v\d+|final)\]|\((?:updated|update|new|revised|copy|final)\)|"
    r"\bupdated\b|\bupdate\b|\brevised\b|\bfinal\s*version\b|\bnew\s*version\b|\bcopy\b",
    re.I)


def normalized_title(file_name):
    """Fold a filename to the string two re-uploads of the same paper would
    share: extension gone, an "[Updated]"/"(Revised)"-style marker gone,
    punctuation and case gone. Not applied to `subject`/`instructor` — only to
    this one grouping key, so it cannot leak into anything the manifest
    actually reports."""
    s = os.path.splitext(file_name)[0]
    s = unicodedata.normalize("NFKC", s).replace("_", " ")
    s = _TWIN_STRIP_RX.sub(" ", s)
    s = re.sub(r"[^\w؀-ۿ]+", " ", s, flags=re.UNICODE)
    return re.sub(r"\s+", " ", s).strip().lower()


def mark_name_twins(rows):
    """Group re-uploads of the same paper — same normalised title, same page
    count, different bytes — and mark which copy a module lane should
    actually read.

    Found across universities: a re-upload meant to fix something often loses
    its native text layer (a "cleaner" copy that is actually a photograph of
    the original). Preferred, in order: a native text layer beats none;
    failing that, more pages beats fewer (this grouping holds page count
    equal by construction, so this tier rarely decides anything — it exists
    for the day two papers of truly equal standing differ by a scanned cover
    page); failing that, a copy this corpus itself calls solved beats one it
    does not. Nothing is dropped — both rows stay, `nameTwinOf` points at the
    others in the group, and exactly one member of a resolved group carries
    `twinPreferred: true`.
    """
    groups = {}
    for r in rows:
        if r.get("exclusionReason") or r.get("pageCount") is None:
            continue
        key = (normalized_title(r["fileName"]), r["pageCount"])
        groups.setdefault(key, []).append(r)

    for members in groups.values():
        distinct_sha = {m["sha256"] for m in members}
        if len(distinct_sha) < 2:
            continue  # same title/page-count but identical bytes — that's `duplicateOf`, not a twin
        ids = [m["sourceId"] for m in members]
        for m in members:
            m["nameTwinOf"] = [i for i in ids if i != m["sourceId"]]

        def rank(m):
            return (
                0 if m.get("textLayer") == "native" else 1,
                -(m.get("pageCount") or 0),
                0 if m.get("solvedStatus") == "solved" else 1,
                m["sourceId"],  # stable tiebreak — never an arbitrary pick that varies by run order
            )
        best = min(members, key=rank)
        for m in members:
            m["twinPreferred"] = m["sourceId"] == best["sourceId"]


def run_priority_folder(cfg):
    inv = json.load(open(os.path.join(HERE, cfg["inventoryName"])))
    plan = json.load(open(os.path.join(HERE, cfg["planName"])))

    rows = []
    for f in inv["files"]:
        if f["name"] == ".DS_Store":
            continue
        rel = f["rel"]
        name = f["name"]
        p = plan.get(rel)
        if p is None:
            raise SystemExit(f"{rel}: classify.py's plan has no row for this file — rerun classify.py --year matching manifest.py's --year")

        batch, implied, cal, conflict = y2_year_signals(name, cfg)
        sitting_yr, sitting_src = y2_sitting_year(p.get("examType"), cal, implied)
        no_text = f["ext"] == ".pdf" and needs_ocr(f.get("text_chars"), f.get("text_wordforming_ratio"))
        ftype = p.get("sourceCategory")

        rows.append({
            "sourceId": source_id(f["sha256"]),
            "sha256": f["sha256"],
            "absolutePath": os.path.join(cfg["corpusRoot"], rel),
            "corpusRelativePath": rel,
            "fileName": name,
            "fileNameWithoutInstructions": strip_notes(name),
            "universityId": UNIVERSITY,
            "yearId": cfg["yearId"],
            "moduleId": p.get("moduleId"),
            "secondaryModule": p.get("secondaryModule"),
            "moduleHints": p.get("moduleHints") or [],
            "rawModuleShorthand": p.get("rawModuleShorthand"),
            "moduleSubjectPath": None,
            "sourceCategory": ftype,
            "instructor": p.get("instructor"),
            "crossModulePractical": bool(p.get("crossModulePractical")),
            "subject": p.get("subject"),
            "folderSubject": p.get("folderSubject"),
            "subjectSource": p.get("subjectSource"),
            "departmentAuthored": p.get("departmentAuthored"),
            "tierEvidence": p.get("tierEvidence"),
            "examType": p.get("examType"),
            "examPaperEvidence": p.get("examPaperEvidence"),
            "bookKind": ("theoretical" if ftype == "Department Book"
                         else "question" if ftype in ("Department Questions", "Written Questions")
                         else "practical" if ftype == "Practical" else None),
            "sourceTier": p.get("sourceTier", 8),
            "folderPriorityLabel": p.get("folderPriorityLabel"),
            "examSitting": p.get("examSitting"),
            "rawYearCode": batch,
            "batchImpliesCalendarYear": implied,
            "calendarYearLabel": cal,
            "yearConflict": conflict,
            "examSittingYear": sitting_yr,
            "examSittingYearSource": sitting_src,
            "solvedStatus": p.get("solvedStatus"),
            "oldSystemExcluded": False,
            "exclusionReason": p.get("exclusionReason"),
            "appliedNoteInstructions": notes_on_path(rel),
            "fileType": f["ext"].lstrip(".") or "unknown",
            "pageCount": f["pages"],
            "textLayer": "none" if no_text else ("native" if f["ext"] == ".pdf" else "n/a"),
            "processingStatus": "ocr_required" if no_text else "pending",
            "extractionDisposition": None,
        })

    by_sha = {}
    for r in rows:
        by_sha.setdefault(r["sha256"], []).append(r)
    for group in by_sha.values():
        if len(group) > 1:
            paths = [g["corpusRelativePath"] for g in group]
            for g in group:
                g["duplicateOf"] = [p for p in paths if p != g["corpusRelativePath"]]

    mark_name_twins(rows)

    os.makedirs(OUTDIR, exist_ok=True)
    doc = {
        "schemaVersion": "kasr-source-manifest/1.0.0",
        "generatedOn": date.today().isoformat(),
        "universityId": UNIVERSITY,
        "yearId": cfg["yearId"],
        "corpusRoot": cfg["corpusRoot"],
        "note": ("Batch code and calendar year are both recorded and never merged. "
                 "See yearConflict. examSittingYear derivation differs by examType — "
                 "see y2_sitting_year's docstring and " + cfg["readmeName"] + "."),
        "moduleSubjectDeclarations": [],
        "count": len(rows),
        "sources": sorted(rows, key=lambda r: r["corpusRelativePath"]),
    }
    out = os.path.join(OUTDIR, cfg["manifestName"])
    json.dump(doc, open(out, "w"), indent=1, ensure_ascii=False)
    print(f"{len(rows)} sources -> {out}")
    return doc


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--year", default="y1", help="y1 (default) | y2 | y3 | y4 | y5")
    ap.add_argument("--university", default="kau", help="kau (default)")
    args = ap.parse_args()
    cfg = year_cfg(args.year, args.university)
    if cfg["grammar"] == "y1-legacy":
        return run_y1_legacy(cfg)
    return run_priority_folder(cfg)


if __name__ == "__main__":
    main()
