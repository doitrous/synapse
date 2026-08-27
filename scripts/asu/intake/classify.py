#!/usr/bin/env python3
"""Decide exam type, instructor, calendar year, solved status and exclusion
for every file in one Ain Shams year, from path and filename tokens only.

Unlike Kasr's classify.py, this step does not read document content and does
not decide the module — the corpus is already organised by module/subject
(LANE-BRIEF.md), so there is no misfiling to correct, and module ID
resolution is deferred entirely to the catalogue lane's MODULE_FOLDERS table.
What this step *does* decide is read straight off the filename and folder
names, per LANE-BRIEF.md: "EOM", "MCQs -", "Formative", "essay", "final",
"assessment", "Checklist", a doctor's name, a year, "[old]".

Emits plan-<year>.json: one row per file, keyed by sha256, with the derived
fields. Nothing here is a document-content claim — see SHARED-TOOLCHAIN.md's
"A year sourced from the filename is not the examiner's date": every year
value produced here is filename-derived and unverified, and examSittingYear
is deliberately left null rather than promoted from it (LANE-BRIEF.md §
"examSittingYear/examSittingYearSource").

Usage: python3 classify.py --year y1|y2|y3
"""
import argparse
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from asu_config import HERE, YEARS

OLD_RX = re.compile(r"\[\s*old\b[^\]]*\]|\bold\s*system\b", re.I)

INSTRUCTOR_RX = re.compile(r"(?:Dr|Prof)\.?\s*([A-Za-z][A-Za-z.\- ]{1,30}?)(?=[\[\]/\\]|$|\s{2,})", re.I)

# Exam-shaped tokens, checked in priority order (most specific first) against
# the filename, then the sub-folder path if the filename is silent.
EXAM_TYPE_RULES = [
    ("Checklist", re.compile(r"\bchecklist\b", re.I)),
    ("Formative", re.compile(r"\bformatives?\b", re.I)),
    ("EOM", re.compile(r"\bEOM\b", re.I)),
    ("Final", re.compile(r"\bfinal\b", re.I)),
    ("Essay", re.compile(r"\bessay\b", re.I)),
    ("MCQ bank", re.compile(r"^\s*MCQs\s*-|\bMCQ\b|\bMCQs\b", re.I)),
    ("Practical exam", re.compile(r"\bpractical\b.*\b(exam|assessment|station)\b|\b(exam|assessment)\b.*\bpractical\b", re.I)),
]

SOLVED_RX = re.compile(r"\bwith\s*answers?\b|\banswer\s*key\b|\bsolved\b|\bwith\s*model\s*answers?\b", re.I)
UNSOLVED_RX = re.compile(r"\bwithout\s*answers?\b|\bunsolved\b|\bno\s*answers?\b", re.I)
ATTEMPT_REVIEW_RX = re.compile(r"\battempt\s*review\b", re.I)

# Batch/resit-style sitting language, kept for completeness though ASU's
# corpus does not use Kasr's دور/باقون convention as far as scoping showed.
SITTING_RX = {
    "second": re.compile(r"الدور\s*الثاني|دور\s*(تاني|ثاني)|\bresit\b|\bsecond\s*sitting\b", re.I),
    "third": re.compile(r"الدور\s*الثالث|دور\s*ثالث|\bthird\s*sitting\b", re.I),
    "first": re.compile(r"الدور\s*الأول|دور\s*أول|\bfirst\s*sitting\b", re.I),
}

# Calendar year on the filename: a 4-digit year, a YYYY-YYYY span, a YY-YY
# span, or a bracketed 2-digit year like "[24]". Kept as the raw matched
# text — LANE-BRIEF.md: "a calendar year printed on the paper wins" but this
# step only ever sees the filename, so examSittingYear stays null regardless
# (see manifest.py).
YEAR_SPAN_4 = re.compile(r"\b(20[0-3]\d)\s*[-–—/]\s*(20[0-3]\d)\b")
YEAR_4 = re.compile(r"\b(20[0-3]\d)\b")
YEAR_SPAN_2 = re.compile(r"\b(\d{2})\s*[-–—](\d{2})\b")
YEAR_BRACKET_2 = re.compile(r"\[\s*(\d{2})\s*\]")


def detect_instructor(dir_parts, name, sub_folder):
    hay_parts = list(dir_parts) + [name]
    for part in hay_parts:
        m = INSTRUCTOR_RX.search(part)
        if m:
            val = re.sub(r"[.\-]+", " ", m.group(1)).strip()
            val = re.sub(r"\s+", " ", val)
            return val.title()
    return None


def detect_exam_type(name, sub_folder, kind_folder):
    hay_name = name
    hay_all = (name or "") + " " + (sub_folder or "")
    for label, rx in EXAM_TYPE_RULES:
        if rx.search(hay_name):
            return label
    for label, rx in EXAM_TYPE_RULES:
        if rx.search(hay_all):
            return label
    return None


def detect_solved(name):
    if ATTEMPT_REVIEW_RX.search(name):
        return "attempt_review"
    if UNSOLVED_RX.search(name):
        return "unsolved"
    if SOLVED_RX.search(name):
        return "solved"
    if re.search(r"\banswers?\b|\bحل\b", name, re.I):
        return "solved"
    return None


def detect_sitting(name):
    for label, rx in SITTING_RX.items():
        if rx.search(name):
            return label
    return None


def detect_calendar_year_label(name):
    m = YEAR_SPAN_4.search(name)
    if m:
        return f"{m.group(1)}-{m.group(2)}"
    m = YEAR_BRACKET_2.search(name)
    if m:
        return m.group(1)
    m = YEAR_SPAN_2.search(name)
    if m:
        a, b = int(m.group(1)), int(m.group(2))
        if 15 <= a <= 35 and 15 <= b <= 35 and b in (a, a + 1):
            return f"{m.group(1)}-{m.group(2)}"
    m = YEAR_4.search(name)
    if m:
        return m.group(1)
    return None


def source_category(kind_folder, module_folder):
    if module_folder == "Administration":
        return "Administrative (schedule)"
    mapping = {
        "Department Books": "Department Book",
        "Compilations": "Compilation",
        "Summaries": "Summary",
        "Revision": "Revision",
        "Schedules": "Administrative (schedule)",
    }
    return mapping.get(kind_folder, kind_folder)


def book_kind(kind_folder, exam_type):
    if kind_folder == "Department Books":
        return "theoretical"
    if exam_type == "MCQ bank" or kind_folder in ("Questions", "Assessments"):
        return "question"
    if kind_folder == "Practical" or exam_type == "Practical exam":
        return "practical"
    return None


SOURCE_TIER_BY_EXAM_TYPE = {
    "EOM": 1, "Final": 1, "Formative": 2, "Essay": 2, "Checklist": 2,
    "MCQ bank": 2, "Practical exam": 2,
}
SOURCE_TIER_BY_KIND = {
    "Assessments": 2, "Department Books": 4, "Questions": 5, "Practical": 5,
    "Compilations": 6, "Summaries": 6, "Revision": 6, "Notes": 7,
    "General": 7, "Lectures": 8, "Schedules": 9,
}


def source_tier(exam_type, kind_folder):
    if exam_type in SOURCE_TIER_BY_EXAM_TYPE:
        return SOURCE_TIER_BY_EXAM_TYPE[exam_type]
    return SOURCE_TIER_BY_KIND.get(kind_folder, 8)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--year", required=True, choices=["y1", "y2", "y3"])
    args = ap.parse_args()

    inv_path = os.path.join(HERE, f"inventory-{args.year}.json")
    out_path = os.path.join(HERE, f"plan-{args.year}.json")
    inv = json.load(open(inv_path))

    rows = []
    for f in inv["files"]:
        name = f["name"]
        dir_parts = f["dirParts"]
        sub_folder = f.get("subFolder")
        kind_folder = f.get("kindFolder")
        module_folder = f.get("moduleFolder")

        instructor = detect_instructor(dir_parts, name, sub_folder)
        exam_type = detect_exam_type(name, sub_folder, kind_folder)
        solved = detect_solved(name)
        sitting = detect_sitting(name)
        cal_year = detect_calendar_year_label(name)
        old_system = bool(OLD_RX.search(name)) or bool(sub_folder and OLD_RX.search(sub_folder))

        exclusion_reason = None
        if module_folder == "Administration":
            exclusion_reason = "administrative_schedule"
        elif f["fileType"] in ("mov", "mp4"):
            exclusion_reason = "video_not_text_source"

        rows.append({
            "sha256": f["sha256"],
            "rel": f["rel"],
            "instructor": instructor,
            "examType": exam_type,
            "solvedStatus": solved,
            "examSitting": sitting,
            "calendarYearLabel": cal_year,
            "oldSystemFlag": old_system,
            "exclusionReason": exclusion_reason,
            "sourceCategory": source_category(kind_folder, module_folder),
            "bookKind": book_kind(kind_folder, exam_type),
            "sourceTier": source_tier(exam_type, kind_folder),
        })

    json.dump({"yearId": inv["yearId"], "count": len(rows), "plan": rows},
               open(out_path, "w"), indent=1, ensure_ascii=False)
    print(f"[{args.year}] {len(rows)} classified -> {out_path}")


if __name__ == "__main__":
    main()
