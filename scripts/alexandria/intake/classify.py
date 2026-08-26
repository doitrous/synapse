#!/usr/bin/env python3
"""Decide what every file is and flag anything that looks misfiled.

Adapted from scripts/corpus-intake/classify.py (commit 5d26054). The Kasr
version has to *decide* a file's module because Kasr's loose files carry no
reliable folder signal at all. Alexandria is the opposite case: the corpus is
already organised into `<CODE> - <Name>` module folders that the owner placed
by hand, so — per the brief — the module comes from the folder first here.
What Kasr's classify.py still teaches us is not to stop there: nine of Kasr's
papers sat under the wrong folder and only the header text said so, so this
script still reads the header and flags `moduleMismatch` when the text names a
different module than the folder does. It does not overrule the folder.

Emits plan.json: one row per file (keyed by sha256) with category, evidence,
and every exam signal (cohort year, stream, sitting year, resit marker) the
manifest needs. Nothing is moved; this corpus is never touched.
"""
import json
import os
import re
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
INV = os.path.join(HERE, "inventory.json")
PROBE = os.path.join(HERE, "probe.json")
OCR = os.path.join(HERE, "ocr_results.json")
OUT = os.path.join(HERE, "plan.json")

CATEGORIES = [
    "Department Book", "Lecture Slides", "Department Questions",
    "End of Module paper", "End of Module answers", "End of Year paper",
    "Practical", "Orientation/Schedule", "Administrative", "Atlas/Reference",
    "Unknown",
]

# The organiser's own classification prefixes. Reliable — used as strong
# evidence, per the brief, not overridden by weaker signals below.
PREFIX_RX = [
    (re.compile(r"^\s*EOM\s*MCQs?\s*-", re.I), "Department Questions", "EOM MCQs - prefix"),
    (re.compile(r"^\s*EOM\s*-", re.I), "End of Module paper", "EOM - prefix"),
    (re.compile(r"^\s*EOY\s*-", re.I), "End of Year paper", "EOY - prefix"),
    (re.compile(r"^\s*MCQs?\s*-", re.I), "Department Questions", "MCQs - prefix"),
    (re.compile(r"^\s*DPT\s*BOOK\s*-", re.I), "Department Book", "DPT BOOK - prefix"),
]

MODULE_CODE_RX = re.compile(r"\b((?:MED|UNI|E)\s?\d{3})\b", re.I)

# The module IDs this corpus actually uses (the lane brief's fixed identity
# list). A "module named in text" hit is only trusted as evidence of a
# mismatch when it names one of these — plenty of OCR'd exam-paper noise
# matches the bare shape `E \d{3}` or `MED \d{3}` (page numbers, "E. coli",
# stray digits) without naming a real module at all, and none of Alexandria's
# own modules are named "E 200" or similar, so an untrusted hit is far more
# likely OCR garbage than a real signal.
KNOWN_MODULE_CODES = {
    "MED 101", "MED 102", "MED 103", "MED 105", "MED 106", "UNI 104", "UNI 107",
    "MED 201", "MED 202", "MED 203", "MED 204", "MED 205",
    "MED 301", "MED 302", "MED 303", "MED 305", "MED 307", "MED 308", "MED 309",
    "UNI 310", "UNI 311", "E 304", "E 306",
}

STREAM_RX = [("egyptian", re.compile(r"مصريين")), ("international", re.compile(r"وافدين"))]
COHORT_RX = re.compile(r"\b(202[7-9]|2030)\b")
# A four-digit number is a cohort per the brief's rule above, UNLESS the
# document's own header explicitly prints a dated exam sitting, which is the
# only thing that is allowed to set sittingYear.
DATE_RX = re.compile(
    r"\b(\d{1,2})\s*[/\-]\s*(\d{1,2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s*[/\-]\s*((?:19|20)\d{2})\b",
    re.I)
MONTHS = {"jan": 1, "feb": 2, "mar": 3, "apr": 4, "may": 5, "jun": 6, "jul": 7,
          "aug": 8, "sep": 9, "oct": 10, "nov": 11, "dec": 12}


def norm(s):
    return unicodedata.normalize("NFKC", s or "")


def detect_category(name, dept, path_parts, text):
    n = norm(name)
    for rx, cat, why in PREFIX_RX:
        if rx.search(n):
            # An EOM/EOY paper that is also explicitly an answer key.
            if cat == "End of Module paper" and re.search(r"answer|solved|\bkey\b", n, re.I):
                return "End of Module answers", [why, "filename also marks it an answer key"]
            return cat, [why]

    hay_name = n
    hay_path = " / ".join(path_parts)
    hay_body = norm(text)[:3000]

    if re.search(r"\bpractical\b|عملي|عملى|\bosce\b|checklist|station", hay_name + " " + hay_path, re.I):
        return "Practical", ["filename/path names practical/OSCE/checklist material"]
    if re.search(r"\borientation\b|\bschedule\b|\bILOs?\b|timetable", hay_name, re.I):
        return "Orientation/Schedule", ["filename says orientation/schedule/ILOs"]
    if re.search(r"regulation|internal bylaw|اللائحة", hay_name + " " + hay_path, re.I):
        return "Administrative", ["university regulation document"]
    if re.search(r"\batlas\b", hay_name, re.I):
        return "Atlas/Reference", ["filename says atlas"]
    if re.search(r"\bmcq\b|questions?\b|أسئلة|\bقيز\b|quiz", hay_name, re.I):
        return "Department Questions", ["question/MCQ material named in the file, no organiser prefix"]
    if re.search(r"\bbook\b|\bhandout\b", hay_name, re.I) and "dpt" not in hay_name.lower():
        return "Department Book", ["'book'/'handout' in filename, no DPT BOOK prefix"]
    if re.search(r"end of module|module code|time allowed.*module", hay_body, re.I):
        return "End of Module paper", ["content reads like an EOM paper header"]
    if re.search(r"end of year|final written exam", hay_body, re.I):
        return "End of Year paper", ["content reads like an EOY paper header"]

    # Nothing in the filename or content settled it — fall back to the
    # *folder* the file sits directly under. This corpus organises teaching
    # material into folders named for what it is even when the filename
    # itself is just a topic ("Boards", "Portal", "Mind maps <name>",
    # "Lectures", "PPTs", "Tutorial(s)", "Handout", "AFM", "Round ppt") or a
    # question bank filed under a bare "Questions" folder with no MCQ token in
    # the filename. Checked against this run: 1,205 of 2,277 files that would
    # otherwise be "Unknown" carry exactly one of these folder names as their
    # immediate parent or an ancestor.
    parent = path_parts[-2] if len(path_parts) > 1 else ""
    if re.search(r"^questions?$", parent, re.I):
        return "Department Questions", [f"filed directly under a '{parent}' folder"]
    if re.search(r"boards?|lectures?|\bppts?\b|tutorials?|portal|mind ?maps?|handout|\bafm\b|round ?ppt",
                 hay_path, re.I):
        return "Lecture Slides", ["path names a teaching-material folder (Boards/Portal/Mind maps/"
                                   "Lectures/PPTs/Tutorial/Handout/AFM/Round ppt)"]
    return "Unknown", ["no organiser prefix, content, or folder-name signal matched"]


def detect_lecture_slides(real_type, category, name):
    """pptx/ppt is Lecture Slides unless something stronger already applies
    (an MCQ deck saved as pptx, a practical checklist, etc.)."""
    if real_type in ("pptx", "ppt-ole") and category == "Unknown":
        return "Lecture Slides", ["file is a slide deck with no other signal overriding it"]
    return category, None


def module_named_in_text(text):
    hits = set()
    for m in MODULE_CODE_RX.finditer(norm(text)):
        code = re.sub(r"\s+", " ", m.group(1).upper())
        if code in KNOWN_MODULE_CODES:
            hits.add(code)
    return hits


def cohort_signal(name):
    hits = COHORT_RX.findall(norm(name))
    return sorted(set(hits)) or None


def stream_signal(name, text):
    hay = norm(name) + " " + norm(text)[:2000]
    for label, rx in STREAM_RX:
        if rx.search(hay):
            return label
    return None


def sitting_year_from_text(text):
    """Only the document's own printed date sets a sitting year — never a
    filename number, per the brief. Looks for a dd/mm/yyyy-shaped date in the
    first probed text (which is the paper's own header, for exam papers)."""
    body = norm(text)[:3000]
    m = DATE_RX.search(body)
    if not m:
        return None, None
    day, mon, year = m.groups()
    mon_num = int(mon) if mon.isdigit() else MONTHS.get(mon.lower()[:3])
    if not mon_num or not (1 <= mon_num <= 12):
        return None, None
    return int(year), m.group(0)


def main():
    inv_doc = json.load(open(INV))
    inv = {x["sha256"]: x for x in inv_doc["files"]}
    probe = {x["sha256"]: x for x in json.load(open(PROBE))}
    ocr = {}
    if os.path.exists(OCR):
        ocr = {x["sha256"]: x for x in json.load(open(OCR))}

    rows = []
    for sha, f in inv.items():
        pr = probe.get(sha, {})
        oc = ocr.get(sha, {})
        text = pr.get("text") or oc.get("ocrText") or f.get("head") or ""

        name = f["name"]
        path_parts = f["pathParts"]
        module_id = f["moduleId"]
        dept = f["departmentFolder"]

        category, evidence = detect_category(name, dept, path_parts, text)
        category, extra_ev = detect_lecture_slides(f["realType"], category, name)
        if extra_ev:
            evidence = extra_ev

        named = module_named_in_text(text) if text else set()
        module_mismatch = False
        mismatch_evidence = None
        if module_id and named:
            folder_code = re.sub(r"\s+", " ", module_id.upper())
            if folder_code not in named:
                module_mismatch = True
                mismatch_evidence = (f"folder says {module_id}, but header text names "
                                      f"{', '.join(sorted(named))}")

        cohort = cohort_signal(name)
        stream = stream_signal(name, text)
        sitting_year, sitting_evidence = sitting_year_from_text(text)

        rows.append({
            "sha256": sha,
            "rel": f["rel"],
            "category": category,
            "categoryEvidence": evidence,
            "moduleMismatch": module_mismatch,
            "moduleMismatchEvidence": mismatch_evidence,
            "moduleNamedInText": sorted(named) if named else None,
            "cohortSignal": cohort,
            "streamSignal": stream,
            "sittingYear": sitting_year,
            "sittingYearEvidence": sitting_evidence,
        })

    json.dump(rows, open(OUT, "w"), indent=1, ensure_ascii=False)
    print(f"{len(rows)} classified -> {OUT}")
    mismatches = [r for r in rows if r["moduleMismatch"]]
    print(f"{len(mismatches)} rows flagged moduleMismatch")


if __name__ == "__main__":
    main()
