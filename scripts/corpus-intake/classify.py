#!/usr/bin/env python3
"""Decide what every file is, and what evidence says so.

    python3 scripts/corpus-intake/classify.py            # y1, unchanged
    python3 scripts/corpus-intake/classify.py --year y2

Two different jobs live behind one `--year` flag, because the two corpora
arrive in two different states.

**y1 (default, `run_y1_legacy`)** arrived as a pile of loose files with no
reliable structure, so the module and type were read from the document's own
content first and the filename second — nine exam papers were sitting under
the wrong module folder and only the text said so. This is the original
implementation, unedited: same `MODULES`, `MODULE_RX`, `SUBJECTS`,
`SECONDARY`, `OVERRIDES`, same detection functions, same output shape.

**y2 onward (`run_priority_folder`)** arrives already organised by the owner
into `<Module>/<Subject> <Dpt|Dr.|Other|Team> [Nth priority]/<Kind>/<file>`
(plus `<Module>/<EOY|EOM|Orientation>/<file>`) — see
docs/Kasr-Source-Imports/manifest/README-y2.md for the full grammar this
reads. The module, subject, instructor and priority are almost always
*structural* facts here (which folder a file sits in), not facts to infer
from content — so this reads the path first and only reaches for the
filename or the probed text when the path alone is ambiguous or when the
filename plainly contradicts the folder (a misfiled subject, a doctor's bank
sitting inside a department folder). Emits `plan-y2.json` keyed by
**corpus-relative path**, not sha256 — unlike y1's content-driven plan, two
paths that happen to share bytes here (the 190 archived exact duplicates)
can legitimately classify differently, because *where a copy sits* is part
of what is being read.
"""
import argparse
import json
import os
import re
import unicodedata

from year_config import ROOT, year_cfg, require_implemented, needs_ocr

HERE = os.path.dirname(os.path.abspath(__file__))

# ===========================================================================
# y1 — original implementation, unedited except for --year plumbing.
# ===========================================================================

Y1_MODULES = ["101 ISK", "102 INT", "103 BMS", "104 CPS", "108 INT"]

Y1_MODULE_RX = {
    "101 ISK": re.compile(r"\b(ISK[\s\-–—_]*101|101[\s\-–—_]*ISK)\b", re.I),
    "102 INT": re.compile(r"\b(INT[\s\-–—_]*102|102[\s\-–—_]*INT)\b", re.I),
    "103 BMS": re.compile(r"\b(BMS[\s\-–—_]*103|103[\s\-–—_]*BMS)\b", re.I),
    "104 CPS": re.compile(r"\b(CPS[\s\-–—_]*104|104[\s\-–—_]*CPS)\b", re.I),
    "108 INT": re.compile(r"\b(INT[\s\-–—_]*108|108[\s\-–—_]*INT)\b", re.I),
}

Y1_SUBJECTS = [
    ("Anatomy", r"anatom|embryo|upper limb|lower limb|thorax|femoral|brachial|radiolog"),
    ("Histology", r"histo|epitheli|connective tissue|cytolog|slide|هستو"),
    ("Physiology", r"physio|فسيو|membrane potential|neuromuscular|cardiac output|\bECG\b"),
    ("Biochemistry", r"biochem|\bbio\b|enzyme|metabolis"),
    ("Pathology", r"patho|necrosis|apoptosis"),
    ("Pharmacology", r"pharma|kinetics"),
]

# The secondary-module streams, with the module codes their own papers state.
Y1_SECONDARY = [
    ("Communication Skills (MPC 126, formerly CMS 129)",
     r"communicat|MPC[\s\-]*126|CMS[\s\-—]*129|\bCMs\b|شرح communication"),
    ("EPE 130 Family Medicine", r"\bEPE\b|EPE[\s\-]*130|family medicine|patient education|consultation|counsc?elling|HE packages|health education|healthy life style"),
    ("Medical Terminology", r"\bTER\b|terminolog"),
    ("Critical Thinking", r"critical.?think|كريتيكال"),
]

# Decisions taken by reading the document, where no rule could be trusted.
# Each records the evidence that settled it.
Y1_OVERRIDES = {
    # keyed NFC; see the lookup in main()
    "y1/IMPORTANT NUMBERS imp numbers physio.pdf": (
        "104 CPS", "Important & Summaries",
        "content is cardiorespiratory values — alveolar pressure 760 mmHg, PCO2 40, stroke volume, athlete heart rate"),
    "y1/UII1G11_01_2026_08_57_51_260111_122933 (2).pdf": (
        "102 INT", "Important & Summaries",
        "content is transport through the cell membrane — general cell physiology, which 102 INT examines"),
    "y1/UII1G11_01_2026_08_59_08_260111_132417 (2).pdf": (
        "103 BMS", "Written Questions",
        "content is resting membrane potential in nerve and skeletal muscle — the N&MS material 103 BMS examines"),
    "y1/physiology muscle final  (1).pdf": (
        "103 BMS", "Written Questions",
        "content is neuromuscular transmission and muscle, written Q&A form — 103 BMS N&MS"),
    "y1/102 INT/102  2024 (1).pdf": (
        "102 INT", "EOM",
        "header reads Module Code INT-102, dated 28/11/2024 — inside the teaching term, so an end-of-module sitting"),
    # A document naming two modules is shared, not misfiled. Both folders hold a
    # copy already; leave each where it is.
    "y1/103 BMS/PHYSIOLOGY 102, 103 ORIENTATION EOM AND EOY physiology (2) (1).pdf": (
        "103 BMS", "Orientation", "shared 102+103 orientation; a copy belongs under each"),
    "y1/102 INT/PHYSIOLOGY 102, 103 ORIENTATION EOM AND EOY physiology (2) (1).pdf": (
        "102 INT", "Orientation", "shared 102+103 orientation; a copy belongs under each"),
    # An MCQ collection carrying a doctor's name is that doctor's question bank,
    # whatever exam it is labelled as being useful for. The corpus's own
    # dominant convention is a folder per teacher, so they join it; the EOY/EOM
    # prefix stays in the filename and is carried separately on the manifest.
    "y1/104 CPS/EOY Anatomy MCQ by Dr.Jalal [Thorax].pdf": (
        "104 CPS", "Doctors/Dr. Galal Anatomy",
        "Dr Galal's thorax MCQ bank, not a 104 exam paper — no sitting or batch code anywhere in it"),
    "y1/104 CPS/EOY Anatomy MCQ by Dr.Jalal [Thorax] Without Answers.pdf": (
        "104 CPS", "Doctors/Dr. Galal Anatomy",
        "the unanswered twin of the same bank"),
    "y1/104 CPS/HISTO WRITTEN BY DR ZAHRA.pdf": (
        "104 CPS", "Doctors/Dr. Zahra Histology",
        "Dr Zahra's written histology collection"),
    "y1/101 ISK/EOY HISTOLOGY WRITTEN 101 histo written Dr.Zahra 2025 (1).pdf": (
        "101 ISK", "Doctors/Dr. Zahra Histology",
        "Dr Zahra's 2025 written histology collection; 101 ISK already keeps a folder for her"),
    "y1/101 ISK/ملخص أسئلة سنين101  (3)IMPORTANT SUMMARY.pdf": (
        "101 ISK", "Important & Summaries",
        "content is anatomy muscle tables (attachments, nerve supply, action) — a revision sheet, not a question book"),
    "y1/102 INT/DPT BOOK MCQ D book bio 102&103 mcq (1).pdf": (
        "102 INT", "Department Questions", "shared 102+103 department MCQ book; filed under 102 where it sits"),
}


def norm(s):
    return unicodedata.normalize("NFKC", s or "")


def y1_modules_named(text):
    return [m for m, rx in Y1_MODULE_RX.items() if rx.search(text)]


def y1_detect_module(name, text, current_dir):
    body, n = norm(text)[:2500], norm(name)
    inside = y1_modules_named(body)
    named = y1_modules_named(n)
    if len(named) > 1 or len(inside) > 1:
        base = os.path.basename(current_dir)
        if base in Y1_MODULES:
            return base, "names more than one module — shared, left where it is"
    if inside:
        return inside[0], f"content states {inside[0]}"
    if named:
        return named[0], f"filename states {named[0]}"
    m = re.search(r"\b(101|102|103|104|108)\b", n)
    if m:
        mod = next(x for x in Y1_MODULES if x.startswith(m.group(1)))
        return mod, f"filename carries bare module code {m.group(1)}"
    base = os.path.basename(current_dir)
    if base in Y1_MODULES:
        return base, "inherited from its current folder"
    return None, "no module signal"


def y1_detect_type(name, text):
    n, body = norm(name), norm(text)[:3000]
    hay = n + " " + body

    if re.search(r"orientation|\bILOs\b", n, re.I):
        return "Orientation", ["filename says orientation"], 0.95
    if re.search(r"practical|عملى|عملي|station|data ?show", n, re.I) and not re.search(r"\bEOM\b|\bEOY\b", n, re.I):
        return "Practical", ["filename says practical"], 0.85
    if re.search(r"baqoon|bakoon|باقون|دور\s*(تاني|ثاني|ثالث)|الدور\s*(الثاني|الثالث)", hay, re.I):
        return "Baqoon", ["resit/baqoon marker"], 0.9

    is_dept = re.search(r"\b(dpt|dept|department)\b", n, re.I)
    has_q = re.search(r"\bmcq|questions?\b|أسئلة|\bحل\b", n, re.I)
    if is_dept and has_q:
        return "Department Questions", ["department question/MCQ book"], 0.9
    if is_dept:
        return "Department Book", ["department book, no question marker"], 0.9

    eom = re.search(r"\bEOM\b|end of module|end\s*10\d", n, re.I)
    eoy = re.search(r"\bEOY\b|final written|final exam|\bfinals?\b|end of year", n, re.I)
    if eom and eoy:
        return "EOY", ["names both EOM and EOY — a compilation, filed with the finals"], 0.6
    if eom:
        return "EOM", ["filename says EOM"], 0.9
    if eoy:
        return "EOY", ["filename says EOY"], 0.9

    if re.search(r"\bwritten\b|assessment|\bcases?\b", n, re.I):
        return "Written Questions", ["written / assessment material"], 0.8
    if re.search(r"\bmcq\b|questions?\b|أسئلة", n, re.I):
        return "Department Questions", ["question material in the module root"], 0.6

    if re.search(r"end of module|\bEOM\b", body, re.I):
        return "EOM", ["content says end of module"], 0.75
    if re.search(r"final written|end of year|\bEOY\b", body, re.I):
        return "EOY", ["content says end of year"], 0.75
    if re.search(r"module code|module name|time allowed|total marks|answer sheet", body, re.I):
        m = re.search(r"date\s*:?\s*(\d{1,2})[/\s\-]+(\w+|\d{1,2})[/\s\-]+(\d{4})", body, re.I)
        if m:
            month = m.group(2).lower()
            months = {"jan":1,"feb":2,"mar":3,"apr":4,"may":5,"jun":6,"jul":7,"aug":8,"sep":9,"oct":10,"nov":11,"dec":12}
            num = int(month) if month.isdigit() else next((v for k,v in months.items() if month.startswith(k)), 0)
            ev = [f"exam paper dated {m.group(0)}"]
            return ("EOY" if num in (5,6,7,8) else "EOM"), ev, 0.7
        return "Exams (unsorted)", ["exam paper, sitting not stated"], 0.4
    if re.search(r"important|summary|ملخص|revision|\bnotes?\b|handout|شرح|lecture", n, re.I):
        return "Important & Summaries", ["revision/summary material"], 0.75
    return "Other", ["no type signal"], 0.3


def y1_detect_subject(name, text):
    hay = (norm(name) + " " + norm(text)[:2000]).lower()
    hits = [(s, len(re.findall(rx, hay, re.I))) for s, rx in Y1_SUBJECTS]
    hits = [h for h in hits if h[1] > 0]
    if not hits:
        return None
    hits.sort(key=lambda x: -x[1])
    return hits[0][0]


def y1_detect_secondary(name, text):
    hay = norm(name) + " " + norm(text)[:2500]
    hits = [(s, len(re.findall(rx, hay, re.I))) for s, rx in Y1_SECONDARY]
    hits = [h for h in hits if h[1] > 0]
    if not hits:
        return None
    hits.sort(key=lambda x: -x[1])
    return hits[0][0]


def y1_secondary_bucket(name, text):
    n, body = norm(name), norm(text)[:2000]
    if re.search(r"exam|past ?paper|\btrial\b|امتحان", n, re.I) or \
       re.search(r"time allowed|total marks|exam instructions", body, re.I):
        return "Exams"
    if re.search(r"\bdpt\b|dept|department|handout|book", n, re.I):
        return "Book"
    if re.search(r"questions?\b|\bmcq\b|أسئلة|revision", n, re.I):
        return "Questions"
    return "Notes"


def run_y1_legacy(cfg):
    probe = json.load(open(os.path.join(HERE, cfg["probeName"])))
    rows = []
    for x in probe:
        name, text, d, rel = x["name"], x["text"], x["dir"], x["rel"]

        key = unicodedata.normalize("NFC", rel)
        if key in Y1_OVERRIDES:
            mod, ttype, why = Y1_OVERRIDES[key]
            rows.append({**x, "module": mod, "subject": y1_detect_subject(name, text),
                         "type": ttype, "target_dir": f"y1/{mod}/{ttype}",
                         "confidence": 0.95, "wrong_module": os.path.basename(d) != mod and os.path.basename(d) in Y1_MODULES,
                         "evidence": ["read by hand: " + why]})
            continue

        if d == "y1/PRACTICAL FIRST YEAR":
            subject = y1_detect_subject(name, text)
            # Read by hand: an opaque Telegram export whose stations are buffer
            # solutions and pH — biochemistry, though nothing in the name says so.
            if name.startswith("Telegram (15)"):
                subject = "Biochemistry"
            rows.append({**x, "module": None, "subject": subject, "type": "Practical",
                         "target_dir": f"y1/PRACTICAL FIRST YEAR/{(subject or 'GENERAL').upper()}",
                         "confidence": 0.8 if subject else 0.5, "wrong_module": False,
                         "evidence": ["cross-module practical folder", f"subject={subject or 'not stated — GENERAL'}"]})
            continue

        if d == "y1/2ry Modules":
            stream = y1_detect_secondary(name, text)
            bucket = y1_secondary_bucket(name, text)
            # Read by hand: an EPE paper behind a meaningless filename —
            # "EPE 197 32 questions: 12 MCQ / 20 Matching".
            if name.startswith("1000317173"):
                bucket = "Questions"
            target = f"y1/2ry Modules/{stream}/{bucket}" if stream else "y1/2ry Modules/_Unsorted"
            rows.append({**x, "module": stream, "subject": None, "type": bucket,
                         "target_dir": target, "confidence": 0.85 if stream else 0.3,
                         "wrong_module": False,
                         "evidence": [f"stream={stream or 'none identified'}", f"bucket={bucket}"]})
            continue

        module, mev = y1_detect_module(name, text, d)
        ttype, ev, conf = y1_detect_type(name, text)
        rows.append({**x, "module": module, "subject": y1_detect_subject(name, text),
                     "type": ttype,
                     "target_dir": f"y1/{module}/{ttype}" if module else "y1/_Unsorted",
                     "confidence": conf if module else min(conf, 0.3),
                     "wrong_module": bool(module) and os.path.basename(d) in Y1_MODULES and module != os.path.basename(d),
                     "evidence": [mev] + ev})

    out = os.path.join(HERE, cfg["planName"])
    json.dump(rows, open(out, "w"), indent=1)
    print(f"{len(rows)} classified -> {out}")


# ===========================================================================
# y2 onward — folder-grammar detector. See module docstring.
# ===========================================================================

PRIORITY_RX = re.compile(r"\[\s*(\d+(?:st|nd|rd|th)|first|second|third|last)\s*priority\s*\]", re.I)

# The exact catalogue module IDs a filename can name for itself — used both
# to resolve a module from a folder name and to build `moduleHints` for rows
# with no module of their own (2ry Modules, Practical 2nd Year).
MODULE_CODE_TO_ID = {
    "205": "205 NEU", "206": "206 DIG", "207": "207 END",
    "208": "208 INT", "210": "210 PAT", "213": "213 PSY",
}
MODULE_HINT_RX = re.compile(r"\b(205|206|207|208|210|213)\b")

SUBJECT_PATTERNS = [
    ("Anatomy", r"\banatom"),
    ("Histology", r"\bhisto(?:log)?y?\b|هستو"),
    ("Physiology", r"\bphysio|فسيو"),
    ("Biochemistry", r"\bbio\s*chem|\bbiochem|\bbio\b"),
    ("Pathology", r"\bpatho"),
    ("Pharmacology", r"\bpharma"),
    ("Parasitology", r"\bpara(?:sit)?\b"),
    ("Psychology", r"\bpsych|سايكو|نفس"),
    ("Microbiology", r"\bmicro"),
]

ORIENTATION_RX = re.compile(
    r"orientation|\bILOs?\b|study\s*guide|exams?\s*instructions?|drug\s*index", re.I)

# A doctor/team/academy/textbook/commercial product named in a filename —
# the signal that a file inside a Dpt folder is not department-authored, and
# (secondarily) a fallback source of `instructor` when no priority-instructor
# folder governs the file.
NAMED_SOURCE_RX = re.compile(
    r"\bDr\.?\s*([A-Za-z؀-ۿ][A-Za-z؀-ۿ.\-]*)"
    r"|\b(Abolmagd|Kholoud\s*Ayman|Easier\s*Team|MedMap|Rushmed|VIP\s*Academy|Guyton|Pretest|ABC|"
    r"SMOOTHIE|SYMPHONY OF PINK\s*&\s*PURPLE|Notes\s*of\s*Choice|الوافي)\b",
    re.I)

DEPT_MARK_RX = re.compile(r"\bDpt\b", re.I)
OTHER_MARK_RX = re.compile(r"^Other$", re.I)

# "2nd"/"1st"/"3rd" are everywhere in this corpus meaning something other than
# a sitting — "2nd year", "2nd Grade", "[1st priority]", "[3rd priority]" — so
# the ordinal only counts as a sitting marker when it is *not* immediately
# followed by one of those. `EOY - SMOOTHIE 2nd year (1).pdf` is the file that
# found this: without the exclusion it read as a second-sitting Baqoon paper.
_NOT_A_SITTING = r"(?!\s*(?:year|grade|priority))"
SITTING_RX = {
    "third": re.compile(r"الدور\s*الثالث|دور\s*ثالث|\bthird\b" + _NOT_A_SITTING + r"|\b3rd\b" + _NOT_A_SITTING, re.I),
    "second": re.compile(r"الدور\s*الثاني|دور\s*(تاني|ثاني)|\bsecond\b" + _NOT_A_SITTING + r"|\b2nd\b" + _NOT_A_SITTING + r"|\bredo\b", re.I),
    "first": re.compile(r"الدور\s*الأول|دور\s*أول|\bfirst\b" + _NOT_A_SITTING + r"|\b1st\b" + _NOT_A_SITTING, re.I),
}
SOLVED_RX = re.compile(r"unsolved|not\s*answer|no\s*answers|without\s*answers|\[unsolved\]", re.I)
UNSOLVED_RX = SOLVED_RX
SOLVED_YES_RX = re.compile(r"solved|answer(?:ed|s)?\b|\bحل\b|بعد\s*الشرح|\bans\b", re.I)

# Filename evidence that a paper is a real sitting, not a revision sheet.
BATCH_RX = re.compile(r"\b(19[0-9]|200)\b")
MODULE_CALENDAR_RX = re.compile(r"(20[12]\d)")

# Revision / instructor material sitting inside an EOM or EOY folder — not a
# paper, whatever folder it is filed in.
REVISION_RX = re.compile(
    r"revision|workbook|\bq\s*&\s*a\b|\bmatch(?:ing)?\b|explain|\bnotes?\b|most\s*imp|"
    r"oriented\s*matching|questions?\s*collection|written\s*qs\s*by|smoothie|"
    r"symphony\s*of\s*pink", re.I)

# Department-book-shaped filenames inside a Dpt priority folder.
DEPT_BOOK_RX = re.compile(
    r"dept?\.?\s*book|department\s*book|^\s*[A-Za-z]+\s*(?:-\s*)?(?:205|206|207|208|210|213)\b|"
    r"^\s*[A-Za-z]+\s*\(\s*\d", re.I)

TIER_Y2 = {
    "Orientation": 1,
    "EOM": 2, "EOY": 2, "EOM & EOY": 2,
    "Baqoon": 3,
    "Department Book": 4,
    "Department Questions": 5, "Practical": 5, "Written Questions": 5,
    "Instructor material": 6,
    "Exam-section revision material": 6,
    "Important & Summaries": 7,
    "Administrative (student marks)": 8,
    "Needs review": 8,
    "Catalogue (not a source)": 8,
}


def y2_norm(s):
    """NFKC (folds superscript ordinals like `²ⁿᵈ` to `2nd`) plus underscore
    flattening: `\\b` does not cross an underscore (it is a word character),
    so `Dr_Abdallah_Salah_Practical_Pharma_...pdf` — an entirely real
    filename in this corpus — would silently name neither a doctor nor a
    subject without this. Every regex below reads the flattened form."""
    s = unicodedata.normalize("NFKC", s or "")
    return s.replace("_", " ")


def detect_subject(hay):
    hits = [(s, len(re.findall(rx, hay, re.I))) for s, rx in SUBJECT_PATTERNS]
    hits = [h for h in hits if h[1] > 0]
    if not hits:
        return None
    hits.sort(key=lambda x: -x[1])
    return hits[0][0]


def module_hints(name):
    codes = []
    for m in MODULE_HINT_RX.finditer(name):
        code = m.group(1)
        if code not in codes:
            codes.append(code)
    return [MODULE_CODE_TO_ID[c] for c in codes]


def parse_priority_segment(seg):
    """One `<Subject> <Dpt|Dr.|Other|Team> [Nth priority]` folder name.

    Returns (subject, attribution, instructor, priorityLabel) or None if
    `seg` does not carry a `[... priority]` bracket at all.
    """
    m = PRIORITY_RX.search(seg)
    if not m:
        return None
    priority_label = m.group(0)
    head = seg[:m.start()].strip()
    parts = head.split(None, 1)
    subject = parts[0] if parts else None
    remainder = parts[1].strip() if len(parts) > 1 else ""
    if DEPT_MARK_RX.search(remainder):
        return subject, "dept", None, priority_label
    dr = re.match(r"^\s*Dr\.?\s*(.+)$", remainder, re.I)
    if dr:
        return subject, "doctor", dr.group(1).strip(), priority_label
    if OTHER_MARK_RX.match(remainder):
        return subject, "other", None, priority_label
    return subject, "team", remainder or None, priority_label


def named_source_in_filename(name, known_names=None):
    """The first doctor/team/academy/textbook/product a filename plainly names.

    `known_names`, when given, is the set of instructor tokens this corpus's
    own priority folders already established (see `collect_known_instructors`)
    — it is what catches `Tarek_patho 210 (198).pdf` sitting inside a `Dpt`
    Books folder: nothing in that filename says "Dr.", but "Tarek" is a
    doctor this same corpus names explicitly elsewhere (`Pathology Dr. Tarek
    [2nd priority]`), and a doctor's file does not stop being a doctor's file
    just because its own filename dropped the title.
    """
    m = NAMED_SOURCE_RX.search(name)
    if m:
        return (m.group(1) or m.group(2) or "").strip() or None
    if known_names:
        low = name.lower()
        for tok in known_names:
            if re.search(r"\b" + re.escape(tok) + r"\b", low):
                return tok.title()
    return None


def collect_known_instructors(cfg):
    """Every instructor/team token this corpus's own priority folders name,
    anywhere under the year's root — used as a second, corpus-grounded pass
    for `named_source_in_filename` (see its docstring). Folder names only;
    this never reads a file's content."""
    known = set()
    for name in cfg.get("modules", {}):
        base = os.path.join(cfg["corpusRoot"], name)
        if not os.path.isdir(base):
            continue
        for dirpath, dirnames, _ in os.walk(base):
            for d in dirnames:
                got = parse_priority_segment(d)
                if not got:
                    continue
                _subject, attribution, instructor, _label = got
                if instructor and attribution in ("doctor", "team"):
                    for tok in re.split(r"\s+", y2_norm(instructor)):
                        if len(tok) >= 4 and tok.isalpha():
                            known.add(tok.lower())
    return known


def exam_evidence(name, head_text, known_names=None):
    """Filename + probed-text evidence that a file is a real exam sitting.

    Returns (evidence: list[str], looks_like_revision: bool).
    """
    hay_name = y2_norm(name)
    ev = []
    batches = [int(x) for x in BATCH_RX.findall(hay_name)]
    if len(set(batches)) == 1:
        ev.append(f"batch code {batches[0]}")
    elif batches:
        ev.append(f"batch range {min(batches)}-{max(batches)}")
    for label, rx in SITTING_RX.items():
        if rx.search(hay_name):
            ev.append(f"{label}-sitting marker")
            break
    if SOLVED_YES_RX.search(hay_name) or UNSOLVED_RX.search(hay_name):
        ev.append("solved/unsolved marker")
    cal = MODULE_CALENDAR_RX.search(hay_name)
    if cal and MODULE_HINT_RX.search(hay_name):
        ev.append(f"module code + calendar year {cal.group(1)}")
    elif cal:
        ev.append(f"calendar year {cal.group(1)} in filename")
    revision = bool(REVISION_RX.search(hay_name)) or bool(named_source_in_filename(hay_name, known_names))
    # A body of probed text that reads like a paper header reinforces weak
    # filename evidence; its absence does not by itself veto strong filename
    # evidence (a scanned cover page may carry nothing but a title).
    if head_text and re.search(
            r"time\s*allowed|total\s*marks|module\s*(code|name)|instructions?\s*to\s*(the\s*)?candidate|"
            r"multiple\s*choice|choose\s*the\s*(one\s*)?best|answer\s*sheet", head_text, re.I):
        ev.append("probed text reads like an exam paper header")
    return ev, revision


def classify_priority_path(module_id, parts, name, head_text, top_module_folder, known_names=None):
    """The core y2 decision for a file sitting under `<Module>/...`.

    `parts` is the path *inside* the module (after the module folder). See
    the module docstring for the two folder shapes this reads.
    """
    hay = y2_norm(name)

    # Orientation — filename keyword wins over folder, per the owner's own
    # ILOs/study-guide/Exams-Instructions/Drug-Index files sitting inside
    # EOM/EOY folders.
    if ORIENTATION_RX.search(hay) or (parts and parts[0] == "Orientation"):
        return {
            "sourceCategory": "Orientation", "examType": "Orientation", "sourceTier": 1,
            "subject": detect_subject(hay), "folderSubject": None, "subjectSource": "filename" if detect_subject(hay) else None,
            "instructor": named_source_in_filename(hay, known_names), "folderPriorityLabel": None,
            "departmentAuthored": False, "tierEvidence": "Orientation/ILOs/study-guide/Exams-Instructions/Drug-Index signal — tier 1 regardless of folder",
            "examPaperEvidence": None, "examSitting": None,
        }

    if parts and parts[0] in ("EOM", "EOY"):
        folder_kind = parts[0]
        combined = bool(re.search(r"EOM\s*&\s*EOY", hay, re.I))
        ev, revision = exam_evidence(hay, head_text, known_names)
        sitting = next((label for label, rx in SITTING_RX.items() if rx.search(hay)), None)
        solved = ("solved" if SOLVED_YES_RX.search(hay) and not UNSOLVED_RX.search(hay)
                  else "unsolved" if UNSOLVED_RX.search(hay) else None)
        doctor_named = named_source_in_filename(hay, known_names)

        if sitting == "second" or sitting == "third":
            return {
                "sourceCategory": "Baqoon", "examType": "Baqoon", "sourceTier": 3,
                "subject": detect_subject(hay), "folderSubject": None, "subjectSource": "filename" if detect_subject(hay) else None,
                "instructor": doctor_named, "folderPriorityLabel": None,
                "departmentAuthored": False, "tierEvidence": f"resit marker ({sitting}) in {folder_kind} folder",
                "examPaperEvidence": "; ".join(ev) or None, "examSitting": sitting,
                "solvedStatus": solved,
            }
        if ev and not revision:
            exam_type = "EOM & EOY" if combined else folder_kind
            return {
                "sourceCategory": exam_type, "examType": exam_type, "sourceTier": 2,
                "subject": detect_subject(hay), "folderSubject": None, "subjectSource": "filename" if detect_subject(hay) else None,
                "instructor": doctor_named, "folderPriorityLabel": None,
                "departmentAuthored": False, "tierEvidence": f"{folder_kind} folder, evidenced sitting",
                "examPaperEvidence": "; ".join(ev), "examSitting": sitting,
                "solvedStatus": solved,
            }
        return {
            "sourceCategory": "Exam-section revision material", "examType": None, "sourceTier": 6,
            "subject": detect_subject(hay), "folderSubject": None, "subjectSource": "filename" if detect_subject(hay) else None,
            "instructor": doctor_named, "folderPriorityLabel": None,
            "departmentAuthored": False,
            "tierEvidence": f"sits in {folder_kind} folder but reads as revision/instructor material, not a sat paper"
                             + (f" (named source: {doctor_named})" if doctor_named else " (no batch/sitting/solved evidence, or a revision-shaped filename)"),
            "examPaperEvidence": "; ".join(ev) or None, "examSitting": sitting,
            "solvedStatus": solved,
        }

    # Subject-priority folder: <Subject> <Dpt|Dr.|Other|Team> [Nth priority]/<Kind>/<file>
    parsed = None
    kind_folder = None
    folder_subject = None
    priority_label = None
    attribution = None
    folder_instructor = None
    for i, seg in enumerate(parts):
        got = parse_priority_segment(seg)
        if got:
            folder_subject, attribution, folder_instructor, priority_label = got
            kind_folder = parts[i + 1] if len(parts) > i + 1 else None
            parsed = True
            break
    if not parsed:
        # No `[... priority]` folder found on the path at all (e.g. a
        # "Recovered from linked branch" container, or a bare subject bucket
        # with files directly inside it). Treated as unattributed.
        folder_subject = parts[0] if parts and parts[0] not in ("MCQs", "Written Questions", "Files", "Books", "Practical") else None
        attribution = None

    name_subject = detect_subject(hay)
    if name_subject and name_subject != folder_subject:
        subject, subject_source = name_subject, "filename (overrides folder)"
    else:
        subject, subject_source = (folder_subject or name_subject), ("folder" if folder_subject else ("filename" if name_subject else None))

    doctor_named = named_source_in_filename(hay, known_names)
    is_dept_folder = attribution == "dept"
    department_authored = is_dept_folder and not doctor_named
    if is_dept_folder and doctor_named:
        tier_evidence = f"sits in a department priority folder, but the filename names {doctor_named} — a doctor's bank filed under a Dpt folder is still a doctor's bank"
    elif is_dept_folder:
        tier_evidence = "department priority folder ([1st priority] Dpt), nothing in the filename names a doctor/team/textbook/product"
    elif attribution == "doctor":
        tier_evidence = f"instructor priority folder (Dr. {folder_instructor})"
    elif attribution == "team":
        tier_evidence = f"named-team/individual priority folder ({folder_instructor})"
    elif attribution == "other":
        tier_evidence = "'Other' priority folder — not department-authored"
    else:
        tier_evidence = "no Dpt/Dr/Other/team priority folder on this path — unattributed"

    instructor = folder_instructor or doctor_named

    if re.search(r"important|summary|ملخص|revision|\bnotes?\b|handout|شرح|lecture", hay, re.I) and not DEPT_BOOK_RX.search(hay):
        category, tier = "Important & Summaries", TIER_Y2["Important & Summaries"]
    elif department_authored:
        if kind_folder == "Books" or DEPT_BOOK_RX.search(hay):
            category, tier = "Department Book", TIER_Y2["Department Book"]
        elif kind_folder == "Practical":
            category, tier = "Practical", TIER_Y2["Practical"]
        elif kind_folder == "Written Questions":
            category, tier = "Written Questions", TIER_Y2["Written Questions"]
        else:
            category, tier = "Department Questions", TIER_Y2["Department Questions"]
    else:
        category, tier = "Instructor material", TIER_Y2["Instructor material"]

    return {
        "sourceCategory": category, "examType": None, "sourceTier": tier,
        "subject": subject, "folderSubject": folder_subject, "subjectSource": subject_source,
        "instructor": instructor, "folderPriorityLabel": priority_label,
        "departmentAuthored": department_authored if attribution else False,
        "tierEvidence": tier_evidence, "examPaperEvidence": None, "examSitting": None,
        "solvedStatus": ("solved" if SOLVED_YES_RX.search(hay) and not UNSOLVED_RX.search(hay)
                          else "unsolved" if UNSOLVED_RX.search(hay) else None),
    }


def run_priority_folder(cfg):
    inv = json.load(open(os.path.join(HERE, cfg["inventoryName"])))
    probe_path = os.path.join(HERE, cfg["probeName"])
    probe_by_rel = {}
    if os.path.exists(probe_path):
        for x in json.load(open(probe_path)):
            probe_by_rel[x["rel"]] = x.get("text", "")

    modules = cfg["modules"]  # folder name -> catalogue id
    secondary_folder = cfg.get("secondaryFolder")
    practical_folder = cfg.get("practicalFolder")
    catalog_folder = cfg.get("catalogFolder")
    dup_folder = cfg.get("exactDuplicatesFolder")

    known_names = collect_known_instructors(cfg)
    rows = {}
    for f in inv["files"]:
        if f["name"] == ".DS_Store":
            continue
        rel = f["rel"]
        parts = rel.split(os.sep)
        top = parts[0]
        name = f["name"]
        head_text = f.get("head") or probe_by_rel.get(rel, "")

        # --- catalogue / excluded rows -------------------------------------------------
        if catalog_folder and top == catalog_folder:
            is_dup = dup_folder and rel.startswith(dup_folder + os.sep)
            rows[rel] = {
                "moduleId": None, "secondaryModule": None, "crossModulePractical": False,
                "moduleHints": [], "rawModuleShorthand": None,
                "sourceCategory": "Catalogue (not a source)", "examType": None,
                "sourceTier": TIER_Y2["Catalogue (not a source)"],
                "subject": None, "folderSubject": None, "subjectSource": None,
                "instructor": None, "folderPriorityLabel": None,
                "departmentAuthored": False, "tierEvidence": "under _Catalog — not a corpus source",
                "examPaperEvidence": None, "examSitting": None, "solvedStatus": None,
                "exclusionReason": "exact_duplicate_archived" if is_dup else "catalogue_not_source",
            }
            continue

        # --- module rows -----------------------------------------------------------------
        if top in modules:
            module_id = modules[top]
            inner = parts[1:-1]  # folders between the module and the file
            decision = classify_priority_path(module_id, inner, name, head_text, top, known_names)
            rows[rel] = {
                "moduleId": module_id, "secondaryModule": None, "crossModulePractical": False,
                "moduleHints": [], "rawModuleShorthand": top,
                "exclusionReason": None,
                **decision,
            }
            continue

        # --- secondary modules -------------------------------------------------------------
        if secondary_folder and top == secondary_folder:
            stream = parts[1] if len(parts) > 1 else None
            inner = parts[2:-1]
            decision = classify_priority_path(None, inner, name, head_text, stream, known_names)
            decision["subject"] = None
            decision["folderSubject"] = None
            decision["subjectSource"] = None
            rows[rel] = {
                "moduleId": None, "secondaryModule": stream, "crossModulePractical": False,
                "moduleHints": module_hints(y2_norm(name)), "rawModuleShorthand": None,
                "exclusionReason": None,
                **decision,
            }
            continue

        # --- cross-module practical ---------------------------------------------------------
        if practical_folder and top == practical_folder:
            bucket = parts[1] if len(parts) > 1 else None
            inner = parts[2:-1]
            decision = classify_priority_path(None, inner, name, head_text, bucket, known_names)
            if bucket in ("Anatomy", "Histology", "Physiology", "Pharmacology", "Pathology"):
                if not decision.get("folderSubject"):
                    decision["folderSubject"] = bucket
                if decision.get("subjectSource") is None:
                    decision["subject"], decision["subjectSource"] = bucket, "folder"
            rows[rel] = {
                "moduleId": None, "secondaryModule": None, "crossModulePractical": True,
                "moduleHints": module_hints(y2_norm(name)), "rawModuleShorthand": None,
                "exclusionReason": None,
                **decision,
            }
            continue

        # --- anything else at the corpus root (README.md, unexpected top folders) ----------
        rows[rel] = {
            "moduleId": None, "secondaryModule": None, "crossModulePractical": False,
            "moduleHints": [], "rawModuleShorthand": None,
            "sourceCategory": "Catalogue (not a source)", "examType": None,
            "sourceTier": TIER_Y2["Catalogue (not a source)"],
            "subject": None, "folderSubject": None, "subjectSource": None,
            "instructor": None, "folderPriorityLabel": None,
            "departmentAuthored": False, "tierEvidence": "not under a recognised module/secondary/practical folder",
            "examPaperEvidence": None, "examSitting": None, "solvedStatus": None,
            "exclusionReason": "catalogue_not_source",
        }

    out = os.path.join(HERE, cfg["planName"])
    json.dump(rows, open(out, "w"), indent=1, ensure_ascii=False)
    print(f"{len(rows)} classified -> {out}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--year", default="y1", help="y1 (default) | y2 | y3 | y4 | y5")
    ap.add_argument("--university", default="kau", help="kau (default)")
    args = ap.parse_args()
    cfg = year_cfg(args.year, args.university)
    if cfg["grammar"] == "y1-legacy":
        run_y1_legacy(cfg)
    else:
        require_implemented(cfg)
        run_priority_folder(cfg)


if __name__ == "__main__":
    main()
