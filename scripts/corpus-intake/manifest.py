#!/usr/bin/env python3
"""Build the Kasr Alainy source manifest.

One row per file in the corpus, carrying the identity, placement and exam
signals every later stage needs, so that no stage has to re-derive them from a
filename and quietly disagree with the last one.

Deliberate choices worth knowing:

  * Batch code and calendar year are both kept, always, and the disagreement
    between them is recorded rather than erased. `examSittingYear` says which
    one recency should use, and `examSittingYearSource` says how it was decided,
    so a later reader can disagree with the call without having to re-derive it.
  * `OLD SYSTEM` files are recorded as excluded with a reason, not dropped, so
    they are not rediscovered and reconsidered on every future pass.
  * A scanned file with no text layer is marked `ocr_required`, never "empty".
"""
import hashlib
import json
import os
import re
import unicodedata
from datetime import date

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = "/Users/doitrous/Desktop/Kasr Alainy"
REPO = "/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse"
OUTDIR = os.path.join(REPO, "docs", "Kasr-Source-Imports", "manifest")

UNIVERSITY = "kau"
YEAR_ID = "KAU_Y1"

# Batch code -> the calendar year that code is said to correspond to.
BATCH_YEAR = {200: 2026, 199: 2025, 198: 2024, 197: 2023, 196: 2022, 195: 2021,
              194: 2020, 193: 2019, 192: 2018}

MODULE_OF_DIR = {
    "101 ISK": "101 ISK", "102 INT": "102 INT", "103 BMS": "103 BMS",
    "104 CPS": "104 CPS", "108 INT": "108 INT",
}

# The absolute priority hierarchy, lowest number = strongest.
TIER = {
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
PRIORITY_RX = re.compile(r"\[\s*(1st|2nd|3rd|4th|5th|first|second|third|last)\s*priority\s*\]", re.I)


def norm(s):
    return unicodedata.normalize("NFC", s or "")


def source_id(sha):
    return "src_" + sha[:20]


def notes_on_path(rel):
    """`NOTE … NOTE` text anywhere on the path is an instruction from the owner."""
    out = []
    for part in rel.split(os.sep):
        for m in NOTE_RX.finditer(part):
            out.append(norm(m.group(1)).strip())
    return out


def strip_notes(name):
    return NOTE_RX.sub("", name).strip()


def year_signals(rel, text):
    """Batch code and calendar year, both kept, disagreement recorded."""
    hay = norm(os.path.basename(rel))
    batch = None
    for m in re.finditer(r"\b(19[2-9]|200)\b", hay):
        value = int(m.group(1))
        if value in BATCH_YEAR:
            batch = value
            break
    cal = None
    for m in re.finditer(r"\b(19[89]\d|20[0-3]\d)\b", hay):
        cal = int(m.group(1))
        break
    implied = BATCH_YEAR.get(batch) if batch else None
    conflict = None
    if implied and cal and implied != cal:
        conflict = {"batchCode": batch, "batchImpliesYear": implied,
                    "calendarLabel": cal, "differenceYears": cal - implied}
    return batch, implied, cal, conflict


def sitting(rel, text):
    hay = norm(os.path.basename(rel)) + " " + norm(text)[:1500]
    if re.search(r"الدور\s*الثالث|دور\s*ثالث|third", hay):
        return "third"
    if re.search(r"الدور\s*الثاني|دور\s*(تاني|ثاني)|second|redo", hay, re.I):
        return "second"
    if re.search(r"الدور\s*الأول|دور\s*أول|first", hay):
        return "first"
    return None


def solved(rel):
    hay = norm(os.path.basename(rel))
    if re.search(r"unsolved|not\s*answer|no\s*answers|without\s*answers|\[unsolved\]", hay, re.I):
        return "unsolved"
    if re.search(r"solved|answers?\b|answered|\bحل\b", hay, re.I):
        return "solved"
    return None


def main():
    inv = {x["sha256"]: x for x in json.load(open(os.path.join(HERE, "inventory.json")))["files"]}
    files = json.load(open(os.path.join(HERE, "inventory.json")))["files"]
    probe = {x["sha256"]: x for x in json.load(open(os.path.join(HERE, "probe.json")))}
    plan = {x["sha256"]: x for x in json.load(open(os.path.join(HERE, "plan.json")))}

    rows = []
    for f in files:
        rel = f["rel"]
        name = f["name"]
        if name == ".DS_Store":
            continue

        parts = rel.split(os.sep)
        module = next((MODULE_OF_DIR[p] for p in parts if p in MODULE_OF_DIR), None)
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
            ftype = folder if folder in TIER else "Instructor material"
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
                module = next(v for k, v in MODULE_OF_DIR.items() if k.startswith(m.group(1)))
        administrative = parts[0] == "Marks"

        old_system = bool(re.search(r"OLD\s*SYSTEM", norm(name), re.I))
        batch, implied, cal, conflict = year_signals(rel, text)
        prio = PRIORITY_RX.search(rel)
        no_text = f["ext"] == ".pdf" and (f["text_chars"] or 0) < 60

        rows.append({
            "sourceId": source_id(f["sha256"]),
            "sha256": f["sha256"],
            "absolutePath": os.path.join(ROOT, rel),
            "corpusRelativePath": rel,
            "fileName": name,
            "fileNameWithoutInstructions": strip_notes(name),
            "universityId": UNIVERSITY,
            "yearId": YEAR_ID,
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
            "sourceTier": TIER.get(ftype, 8),
            "folderPriorityLabel": prio.group(0) if prio else None,
            "examSitting": sitting(rel, text),
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
            "solvedStatus": solved(rel),
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
    for dirpath, dirnames, filenames in os.walk(ROOT):
        for d in dirnames:
            full = os.path.join(dirpath, d)
            rel_d = os.path.relpath(full, ROOT)
            parts_d = rel_d.split(os.sep)
            mod = next((MODULE_OF_DIR[p] for p in parts_d if p in MODULE_OF_DIR), None)
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
        "yearId": YEAR_ID,
        "corpusRoot": ROOT,
        "note": ("Batch code and calendar year are both recorded and never merged. "
                 "See yearConflict, and the open question in "
                 "docs/medical-library-program/KASR-SOURCE-EXTRACTION-PLAN.md §8."),
        "moduleSubjectDeclarations": sorted(declarations, key=lambda x: (x["moduleId"] or "", x["literalText"])),
        "count": len(rows),
        "sources": sorted(rows, key=lambda r: r["corpusRelativePath"]),
    }
    out = os.path.join(OUTDIR, "kasr-y1-sources.json")
    json.dump(doc, open(out, "w"), indent=1, ensure_ascii=False)
    print(f"{len(rows)} sources -> {out}")
    return doc


if __name__ == "__main__":
    main()
