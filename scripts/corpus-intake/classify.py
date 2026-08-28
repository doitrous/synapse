#!/usr/bin/env python3
"""Decide what every loose file is, and where it belongs.

Filenames here are mostly honest but not always, and a handful carry no type at
all. So the module is taken from the document's own header where it states one
— nine papers sit under the wrong module folder and only the text says so — and
the type from filename tokens confirmed against content.

Emits plan.json: one row per file with target, confidence and the evidence.
Nothing is moved here.
"""
import json
import os
import re
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
PROBE = os.path.join(HERE, "probe.json")
OUT = os.path.join(HERE, "plan.json")

MODULES = ["101 ISK", "102 INT", "103 BMS", "104 CPS", "108 INT"]

MODULE_RX = {
    "101 ISK": re.compile(r"\b(ISK[\s\-–—_]*101|101[\s\-–—_]*ISK)\b", re.I),
    "102 INT": re.compile(r"\b(INT[\s\-–—_]*102|102[\s\-–—_]*INT)\b", re.I),
    "103 BMS": re.compile(r"\b(BMS[\s\-–—_]*103|103[\s\-–—_]*BMS)\b", re.I),
    "104 CPS": re.compile(r"\b(CPS[\s\-–—_]*104|104[\s\-–—_]*CPS)\b", re.I),
    "108 INT": re.compile(r"\b(INT[\s\-–—_]*108|108[\s\-–—_]*INT)\b", re.I),
}

SUBJECTS = [
    ("Anatomy", r"anatom|embryo|upper limb|lower limb|thorax|femoral|brachial|radiolog"),
    ("Histology", r"histo|epitheli|connective tissue|cytolog|slide|هستو"),
    ("Physiology", r"physio|فسيو|membrane potential|neuromuscular|cardiac output|\bECG\b"),
    ("Biochemistry", r"biochem|\bbio\b|enzyme|metabolis"),
    ("Pathology", r"patho|necrosis|apoptosis"),
    ("Pharmacology", r"pharma|kinetics"),
]

# The secondary-module streams, with the module codes their own papers state.
SECONDARY = [
    ("Communication Skills (MPC 126, formerly CMS 129)",
     r"communicat|MPC[\s\-]*126|CMS[\s\-—]*129|\bCMs\b|شرح communication"),
    ("EPE 130 Family Medicine", r"\bEPE\b|EPE[\s\-]*130|family medicine|patient education|consultation|counsc?elling|HE packages|health education|healthy life style"),
    ("Medical Terminology", r"\bTER\b|terminolog"),
    ("Critical Thinking", r"critical.?think|كريتيكال"),
]

# Decisions taken by reading the document, where no rule could be trusted.
# Each records the evidence that settled it.
OVERRIDES = {
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


def modules_named(text):
    return [m for m, rx in MODULE_RX.items() if rx.search(text)]


def detect_module(name, text, current_dir):
    body, n = norm(text)[:2500], norm(name)
    inside = modules_named(body)
    named = modules_named(n)
    if len(named) > 1 or len(inside) > 1:
        base = os.path.basename(current_dir)
        if base in MODULES:
            return base, "names more than one module — shared, left where it is"
    if inside:
        return inside[0], f"content states {inside[0]}"
    if named:
        return named[0], f"filename states {named[0]}"
    m = re.search(r"\b(101|102|103|104|108)\b", n)
    if m:
        mod = next(x for x in MODULES if x.startswith(m.group(1)))
        return mod, f"filename carries bare module code {m.group(1)}"
    base = os.path.basename(current_dir)
    if base in MODULES:
        return base, "inherited from its current folder"
    return None, "no module signal"


def detect_type(name, text):
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

    # Written/free-response material, which is not an MCQ paper and not a book.
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


def detect_subject(name, text):
    hay = (norm(name) + " " + norm(text)[:2000]).lower()
    hits = [(s, len(re.findall(rx, hay, re.I))) for s, rx in SUBJECTS]
    hits = [h for h in hits if h[1] > 0]
    if not hits:
        return None
    hits.sort(key=lambda x: -x[1])
    return hits[0][0]


def detect_secondary(name, text):
    hay = norm(name) + " " + norm(text)[:2500]
    hits = [(s, len(re.findall(rx, hay, re.I))) for s, rx in SECONDARY]
    hits = [h for h in hits if h[1] > 0]
    if not hits:
        return None
    hits.sort(key=lambda x: -x[1])
    return hits[0][0]


def secondary_bucket(name, text):
    n, body = norm(name), norm(text)[:2000]
    if re.search(r"exam|past ?paper|\btrial\b|امتحان", n, re.I) or \
       re.search(r"time allowed|total marks|exam instructions", body, re.I):
        return "Exams"
    if re.search(r"\bdpt\b|dept|department|handout|book", n, re.I):
        return "Book"
    if re.search(r"questions?\b|\bmcq\b|أسئلة|revision", n, re.I):
        return "Questions"
    return "Notes"


def main():
    probe = json.load(open(PROBE))
    rows = []
    for x in probe:
        name, text, d, rel = x["name"], x["text"], x["dir"], x["rel"]

        key = unicodedata.normalize("NFC", rel)
        if key in OVERRIDES:
            mod, ttype, why = OVERRIDES[key]
            rows.append({**x, "module": mod, "subject": detect_subject(name, text),
                         "type": ttype, "target_dir": f"y1/{mod}/{ttype}",
                         "confidence": 0.95, "wrong_module": os.path.basename(d) != mod and os.path.basename(d) in MODULES,
                         "evidence": ["read by hand: " + why]})
            continue

        if d == "y1/PRACTICAL FIRST YEAR":
            subject = detect_subject(name, text)
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
            stream = detect_secondary(name, text)
            bucket = secondary_bucket(name, text)
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

        module, mev = detect_module(name, text, d)
        ttype, ev, conf = detect_type(name, text)
        rows.append({**x, "module": module, "subject": detect_subject(name, text),
                     "type": ttype,
                     "target_dir": f"y1/{module}/{ttype}" if module else "y1/_Unsorted",
                     "confidence": conf if module else min(conf, 0.3),
                     "wrong_module": bool(module) and os.path.basename(d) in MODULES and module != os.path.basename(d),
                     "evidence": [mev] + ev})

    json.dump(rows, open(OUT, "w"), indent=1)
    print(f"{len(rows)} classified -> {OUT}")


if __name__ == "__main__":
    main()
