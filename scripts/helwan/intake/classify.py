#!/usr/bin/env python3
# Copied from scripts/corpus-intake/classify.py @ 5d26054 (Kasr Alainy
# corpus-intake lane). Rewritten for the Helwan lane: the Kasr version had to
# *guess* a module and document type from filenames and content because that
# corpus was a pile of loose files. Helwan's corpus (see
# /Users/doitrous/Desktop/helwan/00 Organization Summary.md) is already
# organised as Year/Module/Subject/Category, so classify.py's job here is to
# read that structure off the path and layer Omar's filename conventions
# (`EOM -`, `EOY -`, `DPT BOOK -`, `MCQs -`, solved/unsolved, university hints,
# batch codes) on top of it — not to infer placement from content.
"""Decide module/subject/category and exam-paper signals for every Helwan file.

Emits cache/plan.json: one row per file (keyed by sha256) with everything that
comes from the *path* and the *filename*, evidenced. manifest.py joins this
with cache/inventory.json and cache/probe.json to emit the final manifest.

Nothing is moved or renamed here, and nothing under the corpus is touched.
"""
import json
import os
import re
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
PROBE = os.path.join(HERE, "cache", "probe.json")
OUT = os.path.join(HERE, "cache", "plan.json")

YEAR_OF_DIR = {"Year 1": "HU_Y1", "Year 2": "HU_Y2", "Year 3": "HU_Y3"}

MODULES = [
    "BMS 101", "BMS 102", "LCS 103", "PSY 104",
    "INH 201", "Community 202", "NSS 203", "CRS 204",
    "GIT 301", "URS 303", "FTF 304", "ORL 305",
]

YEAR_LEVEL_SHARED = ("Administration", "Reference Library")

# Category-folder tokens that fold their child folder into a compound
# category value ("Assessments/Exams", "Administration/Instructions") rather
# than treating the child as a lecture-style subfolder.
FOLDING_CATEGORY_HEADS = ("Assessments", "Administration")

ADMIN_KEYWORDS_RX = re.compile(r"schedule|mark|distribution|portfolio|logbook|absence", re.I)

INDEX_FILE_RX = re.compile(r"^00\s+.*(index|organization summary)", re.I)

EOM_RX = re.compile(r"^EOM\s*-\s*", re.I)
EOY_RX = re.compile(r"^EOY\s*-\s*", re.I)
DPT_BOOK_MCQ_RX = re.compile(r"^DPT BOOK MCQs\s*-\s*", re.I)
DPT_BOOK_RX = re.compile(r"^DPT BOOK\s*-\s*", re.I)
MCQ_PREFIX_RX = re.compile(r"MCQs\s*-\s*", re.I)

UNSOLVED_RX = re.compile(r"\bun[\s-]?answered\b|without\s+answers?\b|no\s+answers?\b|\[unsolved\]|\bunsolved\b", re.I)
SOLVED_RX = re.compile(r"answer\s*key|with\s+answers?\b|\banswered\b|\banswers?\b|\.noted\b|\bحل\b", re.I)

BATCH_RX = re.compile(r"\bBatch\s*(\d+)\b", re.I)
CAL_YEAR_RX = re.compile(r"\b(19[89]\d|20[0-3]\d)\b")

# Filename tells that another university's material is inside Helwan's corpus,
# because Helwan students used it. universityId stays "hu" — this is a hint,
# not a reclassification.
UNIVERSITY_HINTS = [
    (re.compile(r"kasr|القصر|\[108\]|\[103\]", re.I), "Kasr Alainy"),
    (re.compile(r"ain\s*shams|عين\s*شمس", re.I), "Ain Shams"),
    (re.compile(r"zagazig|الزقازيق", re.I), "Zagazig"),
    (re.compile(r"\balex(andria)?\b", re.I), "Alexandria"),
    (re.compile(r"@Medicine_Way2", re.I), "Medicine Way 2 (Telegram channel)"),
]

# Administrative document types that never carry teaching content, per the
# lane brief and 00 Organization Summary.md's own naming rules.
ADMIN_FILENAME_RX = re.compile(
    r"\bschedule\b|\bmark(s|sheet)?\b|\bdistribution\b|\bportfolio\b|\blogbook\b|\babsence\b",
    re.I,
)


def norm(s):
    return unicodedata.normalize("NFC", s or "")


def split_path(rel):
    return rel.split(os.sep)


def classify_location(rel):
    """Everything that comes from where the file sits, per the brief:
    module from the 2nd path segment, subject from the 3rd, category from the
    4th (folded with a 5th where the 4th is Assessments/Administration),
    anything deeper kept verbatim as `subfolder` so no path information is
    lost.
    """
    parts = split_path(rel)
    dirs = parts[:-1]

    if not dirs:
        # 00 Organization Summary.md sits above every Year folder.
        return {
            "yearId": None, "moduleId": None, "subject": None,
            "category": "index" if INDEX_FILE_RX.match(parts[-1]) else "root",
            "subfolder": None,
            "disposition": "corpus-wide index, not attached to a year or module",
        }

    year_dir = dirs[0]
    year_id = YEAR_OF_DIR.get(year_dir)
    if year_id is None:
        return {
            "yearId": None, "moduleId": None, "subject": None, "category": None,
            "subfolder": "/".join(dirs[1:]) or None,
            "disposition": f"needs-decision: unrecognised year folder '{year_dir}'",
        }

    if len(dirs) == 1:
        # A file directly under the Year folder — the two Telegram indexes.
        return {
            "yearId": year_id, "moduleId": None, "subject": None,
            "category": "index" if INDEX_FILE_RX.match(parts[-1]) else "year-root",
            "subfolder": None,
            "disposition": ("year-level Telegram source index — links only, "
                            "not content; see the lane's step-5 note"),
        }

    second = dirs[1]

    if second in YEAR_LEVEL_SHARED:
        # Administration / Reference Library at year level: no module owns it.
        sub = dirs[2] if len(dirs) > 2 else None
        if second == "Reference Library":
            disposition = (
                f"year-level Reference Library: shared reference material not "
                f"owned by one module (subject area: {sub or 'unstated'})"
            )
            category = "Reference"
        else:
            disposition = (
                "year-level Administration: shared across every module in "
                f"{year_id}, not owned by one"
            )
            category = sub
        return {
            "yearId": year_id, "moduleId": None, "subject": sub,
            "category": category,
            "subfolder": "/".join(dirs[3:]) or None,
            "disposition": disposition,
        }

    if second not in MODULES:
        return {
            "yearId": year_id, "moduleId": None, "subject": None, "category": None,
            "subfolder": "/".join(dirs[2:]) or None,
            "disposition": f"needs-decision: unrecognised folder '{second}' under {year_dir}",
        }

    module_id = second
    subject = dirs[2] if len(dirs) > 2 else None
    tail = dirs[3:]

    if not tail:
        # File sits directly in the subject folder (e.g. URS 303/Past Exams
        # and MCQs/<file>) — the folder name is doing double duty.
        return {
            "yearId": year_id, "moduleId": module_id, "subject": subject,
            "category": subject, "subfolder": None, "disposition": None,
        }

    head = tail[0]
    if head in FOLDING_CATEGORY_HEADS and len(tail) > 1:
        category = f"{head}/{tail[1]}"
        subfolder = "/".join(tail[2:]) or None
    else:
        category = head
        subfolder = "/".join(tail[1:]) or None

    return {
        "yearId": year_id, "moduleId": module_id, "subject": subject,
        "category": category, "subfolder": subfolder, "disposition": None,
    }


def classify_filename(name, page_text):
    n = norm(name)
    rest = n

    exam_type = None
    if EOM_RX.match(rest):
        exam_type = "EOM"
        rest = EOM_RX.sub("", rest, count=1)
    elif EOY_RX.match(rest):
        exam_type = "EOY"
        rest = EOY_RX.sub("", rest, count=1)

    book_kind = None
    is_dept_book = False
    if DPT_BOOK_MCQ_RX.match(rest):
        book_kind, is_dept_book = "question", True
    elif DPT_BOOK_RX.match(rest):
        book_kind, is_dept_book = "theoretical", True
    elif MCQ_PREFIX_RX.search(rest):
        book_kind = "question"

    if UNSOLVED_RX.search(n):
        solved_copy, unsolved_twin = False, True
    elif SOLVED_RX.search(n):
        solved_copy, unsolved_twin = True, False
    else:
        solved_copy, unsolved_twin = False, False

    origin_hints = sorted({label for rx, label in UNIVERSITY_HINTS if rx.search(n)})

    batch_m = BATCH_RX.search(n)
    batch_code = int(batch_m.group(1)) if batch_m else None
    name_wo_batch = n[:batch_m.start()] + n[batch_m.end():] if batch_m else n
    year_m = CAL_YEAR_RX.search(name_wo_batch)

    if year_m:
        exam_sitting_year, sitting_source = int(year_m.group(1)), "filename"
    elif batch_code is not None:
        exam_sitting_year, sitting_source = None, "unknown"
    else:
        page_m = CAL_YEAR_RX.search((page_text or "")[:1500])
        if page_m:
            exam_sitting_year, sitting_source = int(page_m.group(1)), "page"
        else:
            exam_sitting_year, sitting_source = None, None

    is_admin_filename = bool(ADMIN_FILENAME_RX.search(n))

    return {
        "examType": exam_type,
        "bookKind": book_kind,
        "isDepartmentBook": is_dept_book,
        "solvedCopy": solved_copy,
        "unsolvedTwin": unsolved_twin,
        "originUniversityHint": origin_hints or None,
        "batchCode": batch_code,
        "examSittingYear": exam_sitting_year,
        "examSittingYearSource": sitting_source,
        "adminFilenameSignal": is_admin_filename,
    }


CONVERTER_OF_EXT = {
    ".doc": "textutil -convert txt",
    ".docx": "textutil -convert txt",
    ".pptx": "zip + ppt/slides/slideN.xml text-run extraction",
}


def main():
    probe = json.load(open(PROBE))
    rows = []
    for x in probe:
        rel, name = x["rel"], x["name"]
        loc = classify_location(rel)
        fn = classify_filename(name, x.get("text"))

        category_for_admin_check = loc["category"] or ""
        is_admin_category = bool(ADMIN_KEYWORDS_RX.search(category_for_admin_check))
        excluded_administrative = is_admin_category or fn["adminFilenameSignal"]

        row = {
            "sha256": x["sha256"],
            "rel": rel,
            **loc,
            **fn,
            "excludedAdministrative": excluded_administrative,
            "converterNeeded": CONVERTER_OF_EXT.get(x["ext"]),
            "needsOcr": x.get("textLayerVerdict") == "ocr-needed",
            "wordCharRatio": x.get("wordCharRatio"),
            "textLayerVerdict": x.get("textLayerVerdict"),
            "probeHow": x.get("how"),
        }
        if loc["disposition"] is None and loc["moduleId"] is None and loc["category"] not in ("index", "root", "year-root"):
            row["disposition"] = "needs-decision: no module could be assigned"
        rows.append(row)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(rows, open(OUT, "w"), indent=1, ensure_ascii=False)
    needs_decision = sum(1 for r in rows if (r.get("disposition") or "").startswith("needs-decision"))
    print(f"{len(rows)} classified ({needs_decision} needs-decision) -> {OUT}")


if __name__ == "__main__":
    main()
