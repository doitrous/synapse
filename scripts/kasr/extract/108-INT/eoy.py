#!/usr/bin/env python3
"""Structure the four end-of-year papers of Kasr Al Ainy module 108 INT.

Two sittings, each supplied twice — a "solved" copy and an "unsolved" copy of
the same paper. The obvious way to read that pair is to lift an answer key off
the solved copy, and it does not work: the cached text of the 2025 solved copy
is byte-identical to the unsolved one, and the 2024 solved copy differs from its
twin only in dropped fi/fl ligatures and indentation.

The reason, established by rendering the pages, is that the answer key on these
papers is a **pink highlight drawn over the correct option** — a drawing
overlay with no text of its own. The solved copies are complete answer keys;
the marking is simply invisible to anything reading a text layer, which is all
this script reads. So every answer here is null, but null for two different
reasons that the output keeps apart: on a solved copy the answer exists in the
document and is out of this script's reach (`answerkey.json`, built by
rasterising the highlights, is where it comes from), and on an unsolved copy no
answer is marked at all. A reader who sees only "150 questions, no answers"
would draw the wrong conclusion about this module, so the totals separate the
two and so does every question record.

The other thing it refuses to do is tidy the papers. The 2025 paper numbers two
different questions `9` and never prints a `10`; its practical section restarts
at `1)` with no heading. Those are recorded literally, alongside a separate
sequential index, and listed under `anomalies`. A reader who wants to know what
the paper actually says should be able to find out from this file.

That fault is also why `questionId` is positional rather than printed. The two
questions numbered `9` sit on the same page of the same file, so the obvious
join key — source, page, printed number — addresses both of them at once, and
anything merging answers on it would silently put one answer on two questions.
`answerKeyJoin` in the output names the safe key, and lists every tuple on which
the unsafe ones collide.

Because each sitting is present twice, the row count is twice the question
count. `totals.rows` and `totals.distinctQuestions` are both reported and every
duplicate row carries `duplicateOfQuestionId`.

Failure mode: it reads only the cached page text under
`scripts/kasr/extract/pagetext/<sourceId>.json`. A question that lives in an
image — every practical plate here, and the option list of the one matching
item — is present as its prompt and absent as its content, and is flagged
`usesImage` rather than dropped. Pages and lines that yielded nothing are
counted and sampled, so "nothing there" stays distinguishable from "parser
missed it".

    python3 scripts/kasr/extract/108-INT/eoy.py
"""
import difflib
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")
TEXTCACHE = os.path.join(REPO, "scripts/kasr/extract/pagetext")
OUT = os.path.join(HERE, "eoy.json")

MODULE_ID = "108 INT"
UNIVERSITY_ID = "kau"
SOURCE_CATEGORY = "EOY"

# The module declares exactly two subjects by the empty directories in the
# corpus (assumption A-04 of KASR-SOURCE-EXTRACTION-PLAN.md). The manifest's own
# `subject` column says "Pathology" for all four files, which is a folder-level
# guess and demonstrably wrong for half of every paper; it is recorded as a
# finding rather than used.
SUBJECTS = ["Pathology", "Pharmacology"]

# Batch number -> sitting year, as the manifest records it. Kept explicit so the
# two are visibly the same claim rather than two independent guesses.
BATCH_OF_YEAR = {2025: "199", 2024: "198"}


# --------------------------------------------------------------- normalisation
def deligature(text):
    """Lowercase, drop everything but letters and digits, then drop fi/fl.

    The 2024 unsolved copy lost its fi/fl ligature glyphs in extraction, so it
    prints "ef cacy" where its twin prints "efficacy". Deleting the ligature
    from both sides makes the two spellings the same string, which is what lets
    the pair be matched on text instead of on position alone. It is applied to
    keywords too, so a keyword list written in ordinary English still hits the
    damaged copy.
    """
    flat = re.sub(r"[^a-z0-9]+", "", text.lower())
    return flat.replace("fi", "").replace("fl", "")


def tidy(text):
    """Collapse whitespace. The literal wording is otherwise left alone."""
    return re.sub(r"\s+", " ", text.replace(" ", " ")).strip()


def similarity(a, b):
    return round(difflib.SequenceMatcher(None, deligature(a), deligature(b)).ratio(), 4)


# ------------------------------------------------------------------- line kinds
SECTION = re.compile(r"^\[?\s*Section\s+(\d+)\s*[:\-]\s*([^\]]+?)\s*\]?$", re.I)
SUBJECT_SUBSECTION = re.compile(r"^\(?([IVXivx]{1,4})\)\s*(Pathology|Pharmacology)\s*:?\s*$", re.I)
QUESTION_WORD = re.compile(r"^QUESTION\s+(\d+)\s*[:.\-]?\s*(.*)$", re.I)
ROMAN = re.compile(r"^\(?([IVX]{1,4})\)\s*(.*)$")
LETTER = re.compile(r"^\(?([a-hA-H])\s*[.)]\s*(.*)$")
# The `(?!\d)` is load-bearing: without it "(0.5 marks each)" reads as question
# zero with the stem "5 marks each)", which then swallows the exam instructions
# and the paper's real question 1.
ARABIC = re.compile(r"^\(?(\d{1,2})\s*[.)](?!\d)\s*(.*)$")
BULLET = re.compile(r"^[-•·–]\s*(.+)$")

# A line that is only dots or ellipses is the space a student writes in.
RULE = re.compile(r"^[\s.…·_•–\-]+$")
# pdftotext leaves the ligature glyphs it could not place as their own lines.
LIGATURE_CRUMB = re.compile(r"^[\s﻿]*(?:ffi|ffl|fi|fl)(?:[\s﻿]*(?:ffi|ffl|fi|fl))*[\s﻿]*$")
PAGE_NUMBER = re.compile(r"^\d{1,3}$")
RUNNING_HEAD = re.compile(r"^\{INT-108\}\s*\d+\s+\d{4}\s*[-–]\s*\d{4}$")
END_MARK = re.compile(r"^[\"“”\s]*(?:End of Exam|End of exam|Best of wishes)[\"“”\s.]*$", re.I)
TOTAL_MARK = re.compile(r"^Total\s*=\s*\d+(?:\.\d+)?\s*marks?$", re.I)
ARABIC_SCRIPT = re.compile(r"[؀-ۿ]")

MARKS_EACH_TOTAL = re.compile(r"(\d+(?:\.\d+)?)\s*marks?\s*each\s*=\s*(\d+(?:\.\d+)?)\s*marks?", re.I)
MARKS_EACH = re.compile(r"(\d+(?:\.\d+)?)\s*marks?\s*each", re.I)
MARKS_ANY = re.compile(r"(\d+(?:\.\d+)?)\s*(?:marks?|degrees?)", re.I)

# Answer markers this repo's 101 extractors recognise. None of them fire on
# these four files; the detector stays so that the zero is a measurement.
ANS_LINE = re.compile(
    r"(?i)^\s*(?:the\s+)?(?:correct\s+)?(?:answer|ans|key)\s*(?:is)?\s*[:\-–)]?\s*[\[(]?([a-eA-E])[\])]?\s*$")
ANS_INLINE = re.compile(r"(?i)\b(?:answer|ans|key)\s*(?:is)?\s*[:\-–)]?\s*[\[(]?([a-eA-E])[\])]?(?![a-z])")
STARRED_OPTION = re.compile(r"^\s*\*")


def parse_marks(text):
    """(total, each) as the paper prints them. Never computed, only read."""
    both = MARKS_EACH_TOTAL.search(text)
    if both:
        return float(both.group(2)), float(both.group(1))
    each = MARKS_EACH.search(text)
    if each:
        return None, float(each.group(1))
    any_marks = MARKS_ANY.search(text)
    if any_marks:
        return float(any_marks.group(1)), None
    return None, None


# ---------------------------------------------------------------------- subject
# Prefixes, matched against the deligatured text, so "necro" catches necrosis
# and necrotic and "calcific" catches calcification. Only terms that belong to
# one of the two subjects unambiguously in this corpus are listed; a question
# that matches neither falls through to its neighbours rather than being guessed.
PATHOLOGY_TERMS = [
    "necro", "apoptos", "amyloid", "calcific", "pyknos", "karyorrhex", "karyolys",
    "infarct", "steatos", "fattychange", "fattyliver", "haemosider", "hemosider",
    "lipofuscin", "anthracos", "melanin", "hyalin", "xanthom", "russellbod", "russelbod",
    "caseat", "caseous", "coagulative", "liquefactive", "brinoid", "cellinjury",
    "atroph", "pigment", "congored", "birefringen", "neurobromatos", "aulait",
    "hemochromatos", "haemochromatos", "bronzediabetes", "myeloma", "granulom",
    "abscess", "grossly", "microscopic", "diagnos", "caspes", "caspas", "reperfusion",
    "cloudyswelling", "chloasma", "keloid", "arteriolosclerosis", "hemozoin",
    "haemozoin", "ulcerativecolitis", "osteomyelitis", "wilsondisease", "antitrypsin",
    "tuberculos", "pancreatitis", "freeradical", "glycogenaccumulation",
]
PHARMACOLOGY_TERMS = [
    "drug", "dose", "dosing", "dosage", "receptor", "agonist", "antagonis",
    "bioavailab", "pharmacokinet", "pharmacodynam", "pharmacogenom", "clearance",
    "volumeofdistribution", "steadystate", "absorb", "absorption", "metaboli",
    "microsomal", "rstpass", "excret", "elimination", "toleran", "idiosyncras",
    "potency", "efficacy", "affinity", "therapeuticindex", "therapeuticdose", "teratogen",
    "mutagen", "supersensitiv", "hypersensitiv", "intravenous", "injection",
    "routeofadministration", "intrathecal", "intraarterial", "loadingdose",
    "maintenancedose", "emax", "ed50", "probenecid", "penicillin", "glucuronidation",
    "transducessignal", "activetransport", "plasmaprotein", "antagonism", "infusion",
    "bolus", "vaccine", "sensitivitytest", "plasmaconcentration", "plasmaha",
    "carrier", "rstorder", "parentalinjection", "irritantdrug", "physiologicalanta",
]


# The lists above are written in ordinary English; both sides of the comparison
# go through the same normalisation so a term spelt "calcific" still finds the
# copy that lost its ligature.
PATHOLOGY_KEYS = sorted({deligature(t) for t in PATHOLOGY_TERMS} - {""})
PHARMACOLOGY_KEYS = sorted({deligature(t) for t in PHARMACOLOGY_TERMS} - {""})


def subject_vote(text):
    """(subject, evidence) from the wording, or (None, []) when it says nothing."""
    flat = deligature(text)
    patho = [t for t in PATHOLOGY_KEYS if t in flat]
    pharma = [t for t in PHARMACOLOGY_KEYS if t in flat]
    if len(patho) > len(pharma):
        return "Pathology", patho
    if len(pharma) > len(patho):
        return "Pharmacology", pharma
    return None, sorted(patho + pharma)


# ------------------------------------------------------------------- line model
def load_lines(doc):
    """[(page, text)] over a cached pagetext document, blank lines dropped."""
    out = []
    for page, text in enumerate(doc["pages"], start=1):
        for raw in text.splitlines():
            line = tidy(raw)
            if line:
                out.append((page, line))
    return out


def is_furniture(line):
    """Page apparatus that carries no question: heads, folios, ligature crumbs."""
    if RUNNING_HEAD.match(line) or PAGE_NUMBER.match(line):
        return True
    if LIGATURE_CRUMB.match(line) or END_MARK.match(line) or TOTAL_MARK.match(line):
        return True
    if ARABIC_SCRIPT.search(line) and len(line) < 40:
        return True
    return False


def note_furniture(section, file_report, page, line):
    """Record a furniture line, keeping the ones that state a section's total."""
    if TOTAL_MARK.match(line) or END_MARK.match(line):
        section.setdefault("notes", []).append({"page": page, "text": line})
    file_report["furniture"].append({"page": page, "text": line})


# ------------------------------------------------------------------- sectioning
def split_sections(lines, file_report):
    """Cut the paper at its own `Section N:` headings. Anything before is preamble."""
    sections = []
    preamble = []
    current = None
    for page, line in lines:
        head = SECTION.match(line)
        if head:
            current = {
                "index": int(head.group(1)),
                "heading": tidy(line.strip("[]")),
                "title": tidy(head.group(2)),
                "page": page,
                "instructions": [],
                "lines": [],
            }
            sections.append(current)
            continue
        if current is None:
            preamble.append({"page": page, "text": line})
            continue
        current["lines"].append((page, line))
    file_report["preamble"] = preamble
    return sections


def classify_section(section):
    """mcq or written, decided by what the section's own lines look like.

    An MCQ section is numbered items each trailing a run of lettered options and
    no ruled answer space. The written sections have the ruled space and, where
    they use letters at all, use them for marked subparts rather than choices.
    """
    rule_lines = 0
    runs = 0
    numbered = [i for i, (_p, l) in enumerate(section["lines"]) if ARABIC.match(l)]
    for _page, line in section["lines"]:
        if RULE.match(line):
            rule_lines += 1
    for i in numbered:
        letters = []
        for j in range(i + 1, min(len(section["lines"]), i + 14)):
            text = section["lines"][j][1]
            if ARABIC.match(text) or RULE.match(text):
                break
            mo = LETTER.match(text)
            if mo:
                letters.append(mo.group(1).lower())
        if {"a", "b", "c"} <= set(letters):
            runs += 1
    kind = "mcq" if rule_lines == 0 and runs >= 3 else "written"
    section["kind"] = kind
    section["kindBasis"] = (
        "%d of %d numbered items carry an a/b/c option run and the section has %d ruled "
        "answer lines" % (runs, len(numbered), rule_lines))
    return kind


# ------------------------------------------------------------------ MCQ parsing
def parse_mcq_section(section, file_report):
    """Numbered stems with lettered options. Literal numbers are never repaired."""
    questions = []
    current = None
    target = None            # where a wrapped line continues: "stem" or an option letter
    seen_enumerator = False

    for page, line in section["lines"]:
        if is_furniture(line):
            note_furniture(section, file_report, page, line)
            continue

        answer_only = ANS_LINE.match(line)
        if answer_only and current is not None:
            current["answer"] = answer_only.group(1).upper()
            current["answerSource"] = "answer line in the solved copy"
            continue

        option = LETTER.match(line)
        if option and current is not None:
            letter = option.group(1).lower()
            if letter not in current["options"]:
                current["options"][letter] = tidy(option.group(2))
                if STARRED_OPTION.match(line):
                    current["answer"] = letter.upper()
                    current["answerSource"] = "starred option in the solved copy"
                target = letter
                continue

        number = ARABIC.match(line)
        # A new question only where the one in hand already has its options; that
        # is what lets the paper print `9` twice without the second being read as
        # a stray numeral inside the first.
        if number and len(tidy(number.group(2))) >= 6 and (current is None or len(current["options"]) >= 2):
            seen_enumerator = True
            if current is not None:
                questions.append(current)
            current = {
                "page": page, "number": number.group(1), "stem": tidy(number.group(2)),
                "options": {}, "answer": None, "answerSource": "none",
            }
            target = "stem"
            continue

        if not seen_enumerator:
            section["instructions"].append({"page": page, "text": line})
            continue

        if current is None:
            file_report["unparsed"].append({"page": page, "text": line, "why": "no question open"})
            continue

        inline = ANS_INLINE.search(line)
        if inline:
            current["answer"] = inline.group(1).upper()
            current["answerSource"] = "inline answer marker in the solved copy"
            line = tidy(line[:inline.start()])
            if not line:
                continue
        if target == "stem":
            current["stem"] = tidy(current["stem"] + " " + line)
        elif target in current["options"]:
            current["options"][target] = tidy(current["options"][target] + " " + line)
        else:
            file_report["unparsed"].append({"page": page, "text": line, "why": "no continuation target"})

    if current is not None:
        questions.append(current)
    return questions


# -------------------------------------------------------------- written parsing
def parse_written_section(section, file_report):
    """Instruction groups and their marked subparts.

    The two papers disagree about which enumerator is the group. 2025 writes
    `1.Define:` over items `a.`/`b.`; 2024 writes `I) Define:` over items `1)`
    and `a)`. So roman numerals are always groups, letters are always subparts,
    and arabic numerals are groups until a roman one shows up in the same scope
    and demotes them. `QUESTION 1:` is always a group. Nothing is renumbered.
    """
    groups = []
    current = None
    part = None
    target = None
    subsection = None
    subsection_instruction = None
    arabic_is_group = True
    seen_enumerator = False

    def open_group(page, label, label_kind, prompt):
        nonlocal current, part, target
        current = {
            "page": page, "number": label, "numberKind": label_kind,
            "prompt": tidy(prompt), "parts": [], "bullets": [],
            "subsection": subsection,
            "subsectionInstruction": subsection_instruction,
        }
        groups.append(current)
        part = None
        target = current

    for page, line in section["lines"]:
        if is_furniture(line):
            note_furniture(section, file_report, page, line)
            continue
        if RULE.match(line):
            continue

        subject_head = SUBJECT_SUBSECTION.match(line)
        if subject_head:
            subsection = tidy(line)
            subsection_instruction = None
            arabic_is_group = True
            current = part = target = None
            seen_enumerator = True
            continue

        qword = QUESTION_WORD.match(line)
        if qword:
            seen_enumerator = True
            open_group(page, qword.group(1), "question-word", qword.group(2))
            continue

        roman = ROMAN.match(line)
        if roman and not LETTER.match(line):
            seen_enumerator = True
            arabic_is_group = False
            open_group(page, roman.group(1), "roman", roman.group(2))
            continue

        letter = LETTER.match(line)
        if letter and current is not None:
            part = {"label": letter.group(1).lower(), "prompt": tidy(letter.group(2)),
                    "marks": None, "marksEach": None}
            current["parts"].append(part)
            target = part
            continue

        number = ARABIC.match(line)
        if number:
            seen_enumerator = True
            if arabic_is_group or current is None:
                open_group(page, number.group(1), "arabic", number.group(2))
            else:
                part = {"label": number.group(1), "prompt": tidy(number.group(2)),
                        "marks": None, "marksEach": None}
                current["parts"].append(part)
                target = part
            continue

        bullet = BULLET.match(line)
        if bullet:
            text = tidy(bullet.group(1))
            if current is None:
                # A standing instruction for a whole subsection, e.g. 2024's
                # "Write Description and Diagnosis of the following: [1.5 Mark each]",
                # which wraps, so it has to stay a live continuation target.
                subsection_instruction = {"text": text}
                target = subsection_instruction
                continue
            current["bullets"].append({"text": text, "marks": parse_marks(text)[0]})
            target = current["bullets"][-1]
            continue

        if not seen_enumerator:
            section["instructions"].append({"page": page, "text": line})
            continue
        if target is None:
            file_report["unparsed"].append({"page": page, "text": line, "why": "no group open"})
            continue
        key = "text" if "text" in target else "prompt"
        target[key] = tidy(target[key] + " " + line)

    # Marks are read only after every wrapped line has been joined on: "[0.5
    # Mark]" routinely lands on the line after the prompt it belongs to, and
    # reading it at creation time silently loses it.
    for group in groups:
        held = group["subsectionInstruction"]
        group["subsectionInstruction"] = held["text"] if held else None
        group["marks"], group["marksEach"] = parse_marks(group["prompt"])
        for item in group["parts"]:
            item["marks"], item["marksEach"] = parse_marks(item["prompt"])
            item["marksEachFromGroup"] = group["marksEach"] if item["marks"] is None else None
        for bullet in group["bullets"]:
            bullet["marks"] = parse_marks(bullet["text"])[0]
    return groups


# ------------------------------------------------------------------- formatting
DEMAND_VERB = re.compile(
    r"(?i)\b(describe|describ|diagnos|identify|mention|enumerate|define|de\s?ne|give|write|match|differentiate|compare)")


def classify_format(record):
    """The repo's own vocabulary — src/data/questionFormat.ts — and why."""
    if record["options"]:
        return "mcq_single_best", (
            "numbered stem with lettered options and a section instruction to choose "
            "one answer per question")
    text = " ".join([record["stem"]] + [p["prompt"] for p in record["parts"]]
                    + [b["text"] for b in record["bullets"]])
    if re.search(r"(?i)\bmatch\b", record["stem"]):
        return "matching", "the prompt asks the candidate to match one list against another"
    if len(record["parts"]) >= 2:
        return "multipart_written", "%d separately labelled marked subparts" % len(record["parts"])
    # A stem that carries its own marks is itself a demand, so a stem plus one
    # marked follow-on is two marked demands, not a short answer.
    demands = (1 if record["marks"] else 0) + sum(1 for p in record["parts"] if p["marks"])
    if demands >= 2:
        return "multipart_written", "%d separately marked demands" % demands
    verbs = len(set(m.group(1).lower() for m in DEMAND_VERB.finditer(text)))
    marks = record["marks"] or record["marksEach"] or 0
    if verbs >= 2 or marks >= 2:
        return "structured_written", (
            "one prompt demanding %d distinct things, worth %s marks" % (verbs, marks or "unstated"))
    return "short_answer", "a single prompt with a single demand, worth %s marks" % (marks or "unstated")


# Only demonstratives — "this route", "the red arrows" — because they are the
# ones that cannot be answered from the words on the page. A generic "of the
# following:" introduces a written list just as often as a plate.
IMAGE_CUE = re.compile(
    r"(?i)(this picture|following picture|red arrows|identify the organ|this route|"
    r"this dosage form|previous routes|the following graph)")


# ---------------------------------------------------------------------- records
def build_records(entry, doc, file_report):
    """One row per question in one paper, provenance attached, nothing renumbered."""
    lines = load_lines(doc)
    sections = split_sections(lines, file_report)
    is_solved, solved_basis = solved_copy(entry)
    file_report["isSolvedCopy"] = is_solved
    file_report["solvedStatusBasis"] = solved_basis
    records = []
    seq = 0

    for section in sections:
        kind = classify_section(section)
        section_marks, section_marks_each = parse_marks(
            " ".join([section["heading"]] + [i["text"] for i in section["instructions"]]))
        if kind == "mcq":
            parsed = parse_mcq_section(section, file_report)
        else:
            parsed = parse_written_section(section, file_report)
        # instructions can be appended during parsing, so re-read the marks
        if section_marks_each is None:
            section_marks, section_marks_each = parse_marks(
                " ".join([section["heading"]] + [i["text"] for i in section["instructions"]]))

        for local, item in enumerate(parsed, start=1):
            seq += 1
            if kind == "mcq":
                record = {
                    "stem": item["stem"], "options": item["options"],
                    "parts": [], "bullets": [], "subsection": None,
                    "subsectionInstruction": None,
                    "marks": section_marks_each, "marksEach": None,
                    "marksSource": ("section heading/instructions: %s"
                                    % tidy(" ".join([section["heading"]]
                                                    + [i["text"] for i in section["instructions"]]))[:120]
                                    if section_marks_each is not None else None),
                    "answer": item["answer"], "answerSource": item["answerSource"],
                    "number": item["number"], "page": item["page"], "numberKind": "arabic",
                    "stemSource": "printed with the question",
                }
            else:
                record = {
                    "stem": item["prompt"], "options": None,
                    "parts": item["parts"], "bullets": item["bullets"],
                    "subsection": item["subsection"],
                    "subsectionInstruction": item["subsectionInstruction"],
                    "marks": item["marks"], "marksEach": item["marksEach"],
                    "marksSource": "printed beside the question" if item["marks"] or item["marksEach"] else None,
                    "answer": None, "answerSource": "none",
                    "number": item["number"], "page": item["page"],
                    "numberKind": item["numberKind"],
                }
                if record["marks"] is None and record["marksEach"] is None and item["subsectionInstruction"]:
                    total, each = parse_marks(item["subsectionInstruction"])
                    record["marks"], record["marksEach"] = total, each
                    if total is not None or each is not None:
                        record["marksSource"] = ("subsection instruction: %s"
                                                 % item["subsectionInstruction"][:120])
                record["stemSource"] = "printed with the question"
                if not record["stem"] and item["subsectionInstruction"]:
                    record["stem"] = item["subsectionInstruction"]
                    record["stemSource"] = (
                        "the standing instruction for this subsection; the paper prints nothing "
                        "beside the item number itself")
                elif not record["stem"]:
                    record["stemSource"] = (
                        "the paper prints only the item label; the question is carried entirely by "
                        "its subparts and by the plate beside them")

            record["format"], record["formatBasis"] = classify_format(record)
            if record["format"] == "matching":
                prompts = [b["text"] for b in record["bullets"] if b["marks"] is None]
                extra = [b for b in record["bullets"] if b["marks"] is not None]
                record["matchingPrompts"] = prompts
                record["matchingOptions"] = None
                record["matchingOptionsReason"] = (
                    "the list to match against is printed as an image and is absent from the "
                    "text layer; it is not reconstructed")
                for bullet in extra:
                    record["parts"].append({"label": None, "prompt": bullet["text"],
                                            "marks": bullet["marks"], "marksEach": None})
                record["bullets"] = []
            else:
                for bullet in list(record["bullets"]):
                    if bullet["marks"] is not None:
                        record["parts"].append({"label": None, "prompt": bullet["text"],
                                                "marks": bullet["marks"], "marksEach": None})
                        record["bullets"].remove(bullet)

            # Re-read the format now the marked follow-on bullets have become
            # parts; before the promotion a two-demand question looks like one.
            if record["format"] != "matching":
                record["format"], record["formatBasis"] = classify_format(record)

            pool = " ".join([record["stem"]] + list((record["options"] or {}).values())
                            + [p["prompt"] for p in record["parts"]]
                            + [b["text"] for b in record["bullets"]]
                            + record.get("matchingPrompts", [])
                            + [record["subsection"] or "", record["subsectionInstruction"] or ""])
            if record["subsection"]:
                named = re.search(r"(?i)(Pathology|Pharmacology)", record["subsection"])
                record["subject"] = named.group(1).title()
                record["subjectSource"] = "subsection heading printed in the paper"
                record["subjectEvidence"] = [tidy(record["subsection"])]
            else:
                subject, evidence = subject_vote(pool)
                record["subject"] = subject
                record["subjectSource"] = "content keywords" if subject else None
                record["subjectEvidence"] = evidence

            record.update({
                "questionId": "%s:s%d:%d" % (entry["sourceId"], section["index"], local),
                "moduleId": MODULE_ID,
                "sourceId": entry["sourceId"],
                "file": entry["fileName"],
                "solvedStatus": entry.get("solvedStatus"),
                "isSolvedCopy": is_solved,
                "solvedStatusBasis": solved_basis,
                "examSittingYear": entry.get("examSittingYear"),
                "examSittingBatch": BATCH_OF_YEAR.get(entry.get("examSittingYear")),
                "section": {"index": section["index"], "heading": section["heading"],
                            "kind": kind, "subsection": record.pop("subsection")},
                "sequentialIndex": seq,
                "sectionSequentialIndex": local,
                "answerNote": None,
                "pairedWith": None,
                "crossSittingLinks": [],
            })

            cue = IMAGE_CUE.search(pool)
            if kind == "mcq":
                record["usesImage"], record["usesImageBasis"] = False, None
            elif cue:
                record["usesImage"] = True
                record["usesImageBasis"] = ("the wording points at something not in the text: %r"
                                            % cue.group(1))
            elif record["stemSource"] != "printed with the question" and not record["parts"]:
                record["usesImage"] = True
                record["usesImageBasis"] = ("the paper prints no prompt of the question's own; what "
                                            "is being asked about is the plate beside the item")
            elif record["format"] == "matching" and not record.get("matchingOptions"):
                record["usesImage"] = True
                record["usesImageBasis"] = "the list to match against is not in the text layer"
            else:
                record["usesImage"], record["usesImageBasis"] = False, None
            records.append(record)

        section["parsedCount"] = len(parsed)

    file_report["sections"] = [
        {"index": s["index"], "heading": s["heading"], "kind": s["kind"],
         "kindBasis": s["kindBasis"], "page": s["page"], "questions": s["parsedCount"],
         "instructions": [i["text"] for i in s["instructions"]],
         "notes": [n["text"] for n in s.get("notes", [])]}
        for s in sections
    ]
    return records, lines


# --------------------------------------------------------------- page bookkeeping
def page_yield(doc, lines, records, file_report):
    """One row per page. A page that produced no question says so, with a sample.

    The count is the point. Without it a reader cannot tell a page that holds
    nothing but ruled answer space from a page the parser walked past.
    """
    per_page = {}
    for record in records:
        per_page.setdefault(record["page"], []).append(record["questionId"])
    rows = []
    for page, text in enumerate(doc["pages"], start=1):
        found = per_page.get(page, [])
        sample = tidy(" ".join(text.split()))[:300]
        rows.append({
            "page": page,
            "questionsFound": len(found),
            "questionIds": found,
            "yieldedNothing": not found,
            "textCharacters": len(text.strip()),
            "textSample": sample,
            "note": None if found else (
                "no question heading starts on this page; it carries continuation text, "
                "ruled answer space or an image" if text.strip() else
                "the cached page text is empty"),
        })
    file_report["pageYield"] = rows
    file_report["pagesYieldingNothing"] = [r["page"] for r in rows if r["yieldedNothing"]]


# ------------------------------------------------------------------------ pairs
def pair_sitting(solved, unsolved):
    """Match a solved copy to its unsolved twin, question by question.

    Exact text first, then position within the section. A question with no
    counterpart keeps its record and says so; it is a fact about the pair of
    files, not a parser nuisance.
    """
    remaining = list(unsolved)
    by_text = {}
    for record in remaining:
        by_text.setdefault(deligature(record["stem"]), []).append(record)

    for record in solved:
        key = deligature(record["stem"])
        mate = None
        basis = None
        if by_text.get(key):
            mate = by_text[key].pop(0)
            basis = "identical normalised stem text"
        else:
            for candidate in remaining:
                if candidate.get("_taken"):
                    continue
                if (candidate["section"]["index"] == record["section"]["index"]
                        and candidate["sectionSequentialIndex"] == record["sectionSequentialIndex"]):
                    mate = candidate
                    basis = "same position: section %d, item %d" % (
                        record["section"]["index"], record["sectionSequentialIndex"])
                    break
        if mate is None:
            record["pairedWith"] = None
            record["pairNote"] = "no counterpart found in the unsolved copy of this sitting"
            continue
        mate["_taken"] = True
        ratio = similarity(record["stem"], mate["stem"])
        confidence = ("exact" if ratio == 1.0 else "high" if ratio >= 0.95
                      else "medium" if ratio >= 0.80 else "low")
        link = {"sourceId": mate["sourceId"], "questionId": mate["questionId"],
                "basis": basis, "similarity": ratio, "confidence": confidence,
                "literalNumberMatches": mate["number"] == record["number"]}
        record["pairedWith"] = dict(link)
        mate["pairedWith"] = {"sourceId": record["sourceId"], "questionId": record["questionId"],
                              "basis": basis, "similarity": ratio, "confidence": confidence,
                              "literalNumberMatches": mate["number"] == record["number"]}
        record["pairNote"] = mate["pairNote"] = None

    for record in remaining:
        if not record.get("_taken") and record["pairedWith"] is None:
            record["pairNote"] = "no counterpart found in the solved copy of this sitting"
    for record in remaining:
        record.pop("_taken", None)

    solved_ids = {r["questionId"] for r in solved}
    paired = [r for r in solved if r["pairedWith"]]
    return {
        "solvedSourceId": solved[0]["sourceId"] if solved else None,
        "unsolvedSourceId": unsolved[0]["sourceId"] if unsolved else None,
        "solvedQuestions": len(solved_ids),
        "unsolvedQuestions": len(unsolved),
        "paired": len(paired),
        "unpairedInSolved": [r["questionId"] for r in solved if not r["pairedWith"]],
        "unpairedInUnsolved": [r["questionId"] for r in unsolved if not r["pairedWith"]],
        "confidence": {c: sum(1 for r in paired if r["pairedWith"]["confidence"] == c)
                       for c in ("exact", "high", "medium", "low")},
        "answersRecoveredFromSolvedCopy": sum(1 for r in solved if r["answer"]),
    }


# ------------------------------------------------------------------- anomalies
def numbering_anomalies(records):
    """Every place the paper's own numbering misbehaves.

    Scoped by section, printed subsection heading and enumerator style, because
    a paper that restarts at `1)` under a heading that says `II) Pharmacology:`
    is doing something ordinary, and a paper that restarts at `1)` under no
    heading at all is not. Only the second is a fault.
    """
    out = []
    scopes = {}
    order = []
    for record in records:
        key = (record["sourceId"], record["file"], record["section"]["index"],
               record["section"]["subsection"], record["numberKind"])
        if key not in scopes:
            order.append(key)
        scopes.setdefault(key, []).append(record)

    for key in order:
        source_id, filename, index, subsection, kind = key
        items = scopes[key]
        base = {"sourceId": source_id, "file": filename, "section": index,
                "subsection": subsection, "numberStyle": kind}
        seen = {}
        for item in items:
            seen.setdefault(item["number"], []).append(item)
        for label, dupes in seen.items():
            if len(dupes) > 1:
                out.append(dict(base, kind="duplicate-number",
                                detail="the paper prints %d different questions numbered %s"
                                       % (len(dupes), label),
                                questionIds=[d["questionId"] for d in dupes],
                                pages=sorted({d["page"] for d in dupes})))
        labels = [i["number"] for i in items]
        numeric = [int(l) for l in labels if l.isdigit()]
        if not numeric or len(numeric) != len(labels):
            continue
        missing = sorted(set(range(min(numeric), max(numeric) + 1)) - set(numeric))
        if missing:
            out.append(dict(base, kind="skipped-number",
                            detail="numbers %s never appear, though this run goes %d-%d"
                                   % (", ".join(str(m) for m in missing), min(numeric), max(numeric)),
                            questionIds=[], pages=[]))
        for i in range(1, len(numeric)):
            if numeric[i] <= numeric[i - 1] and labels[i] != labels[i - 1] and subsection is None:
                item = items[i]
                out.append(dict(base, kind="numbering-restart",
                                detail=("numbering restarts at %s on page %d with no printed "
                                        "subsection heading to explain it, after %s"
                                        % (item["number"], item["page"], labels[i - 1])),
                                questionIds=[item["questionId"]], pages=[item["page"]]))

    # A section that changes enumerator style mid-way — 2025's practical goes
    # from "QUESTION 1:" to "1)" on page 13 — is a second paper spliced into the
    # first. Where no heading marks the join, nothing in the text says the second
    # "1" is a different question from the first.
    by_section = {}
    for record in records:
        by_section.setdefault((record["sourceId"], record["file"], record["section"]["index"]), []).append(record)
    for (source_id, filename, index), items in by_section.items():
        for i in range(1, len(items)):
            before, after = items[i - 1], items[i]
            if (before["numberKind"] != after["numberKind"]
                    and before["section"]["subsection"] == after["section"]["subsection"]
                    and after["section"]["subsection"] is None):
                out.append({
                    "sourceId": source_id, "file": filename, "section": index,
                    "subsection": None, "numberStyle": "%s -> %s" % (before["numberKind"],
                                                                    after["numberKind"]),
                    "kind": "unheaded-style-change",
                    "detail": ("the section switches enumerator style from '%s' to '%s' on page %d "
                               "and restarts at %s, with no printed heading marking the join"
                               % (before["number"], after["number"], after["page"], after["number"])),
                    "questionIds": [before["questionId"], after["questionId"]],
                    "pages": [before["page"], after["page"]],
                })
    return out


DECLARED_COUNT = re.compile(r"(?i)\b(?:each of the\s+)?(\d{1,3})\s+questions\b")


def declared_count_checks(records, file_reports):
    """Where a section states how many questions it holds, check the claim."""
    out = []
    for report in file_reports:
        for section in report.get("sections", []):
            claim = DECLARED_COUNT.search(" ".join(section["instructions"]))
            if not claim:
                continue
            declared, found = int(claim.group(1)), section["questions"]
            section["declaredQuestions"] = declared
            if declared != found:
                out.append({
                    "sourceId": report["sourceId"], "file": report["file"],
                    "section": section["index"], "subsection": None, "numberStyle": None,
                    "kind": "declared-count-mismatch",
                    "detail": "the instructions say %d questions; %d were parsed" % (declared, found),
                    "questionIds": [], "pages": [],
                })
    return out


# ------------------------------------------------------------- cross-sitting
def cross_sitting(records, threshold=0.75):
    """Questions the two sittings share. Both copies are kept and linked."""
    canonical = [r for r in records if r["isSolvedCopy"]]
    by_year = {}
    for record in canonical:
        by_year.setdefault(record["examSittingYear"], []).append(record)
    years = sorted(by_year)
    overlaps = []
    if len(years) < 2:
        return overlaps
    older, newer = by_year[years[0]], by_year[years[-1]]
    for a in newer:
        for b in older:
            ratio = similarity(a["stem"] + " " + " ".join(p["prompt"] for p in a["parts"]),
                               b["stem"] + " " + " ".join(p["prompt"] for p in b["parts"]))
            if ratio >= threshold:
                overlaps.append({
                    "similarity": ratio,
                    "kind": "near-identical" if ratio >= 0.9 else "closely related",
                    "format": a["format"],
                    "subject": a["subject"],
                    "newer": {"sourceId": a["sourceId"], "questionId": a["questionId"],
                              "year": a["examSittingYear"], "section": a["section"]["index"],
                              "number": a["number"], "stem": a["stem"][:160]},
                    "older": {"sourceId": b["sourceId"], "questionId": b["questionId"],
                              "year": b["examSittingYear"], "section": b["section"]["index"],
                              "number": b["number"], "stem": b["stem"][:160]},
                })
                a["crossSittingLinks"].append(
                    {"questionId": b["questionId"], "sourceId": b["sourceId"],
                     "year": b["examSittingYear"], "similarity": ratio})
                b["crossSittingLinks"].append(
                    {"questionId": a["questionId"], "sourceId": a["sourceId"],
                     "year": a["examSittingYear"], "similarity": ratio})
    overlaps.sort(key=lambda o: -o["similarity"])
    return overlaps


# ------------------------------------------------------------------------- main
def sources():
    with open(MANIFEST, encoding="utf-8") as fh:
        data = json.load(fh)
    wanted = [s for s in data["sources"]
              if s.get("moduleId") == MODULE_ID
              and s.get("universityId") == UNIVERSITY_ID
              and s.get("sourceCategory") == SOURCE_CATEGORY
              and s.get("fileType") == "pdf"]
    # The corpus also holds a "PAT 108" from another university; filtering on
    # moduleId and universityId together is what keeps it out.
    by_id = {}
    for entry in wanted:
        by_id.setdefault(entry["sourceId"], entry)
    return sorted(by_id.values(), key=lambda s: (-(s.get("examSittingYear") or 0),
                                                 s.get("solvedStatus") or "zz"))


def join_safety(records):
    """Which keys address exactly one question, and where the tempting ones don't.

    `answerkey.json` has to land each recovered highlight on one question. The
    natural key for that is the one a human would read off the page — source,
    page, the number printed beside the question — and on this module it is
    wrong: the 2025 paper prints two different questions numbered 9, on the same
    page of the same file. A merge keyed on it would put one answer on both.

    So the safe key is computed here rather than assumed, the unsafe ones are
    reported with the exact tuples they collide on, and `questionId` uniqueness
    is asserted instead of hoped for.
    """
    candidates = {
        "questionId": lambda r: (r["questionId"],),
        "sourceId+section+sectionSequentialIndex": lambda r: (
            r["sourceId"], r["section"]["index"], r["sectionSequentialIndex"]),
        "sourceId+sequentialIndex": lambda r: (r["sourceId"], r["sequentialIndex"]),
        "sourceId+page+printedNumber": lambda r: (r["sourceId"], r["page"], r["number"]),
        "sourceId+section+printedNumber": lambda r: (
            r["sourceId"], r["section"]["index"], r["number"]),
    }
    report = []
    for name, key_of in candidates.items():
        seen = {}
        for record in records:
            seen.setdefault(key_of(record), []).append(record)
        clashes = [{"key": list(k), "questionIds": [r["questionId"] for r in v],
                    "pages": sorted({r["page"] for r in v}),
                    "stems": [r["stem"][:80] or "(no printed prompt)" for r in v]}
                   for k, v in seen.items() if len(v) > 1]
        report.append({
            "key": name,
            "unique": not clashes,
            "collisions": len(clashes),
            "collidingKeys": clashes,
        })
    return report


def solved_copy(entry):
    """(is_solved, basis). The manifest leaves one of the four `solvedStatus` null.

    `EOY Exam {INT-108} 198 (3).pdf` has no solvedStatus in the manifest while
    its twin is marked "solved", so reading the column alone would leave the
    2024 pair with one solved copy and one unknown. The filename is the tie
    breaker, and which of the two decided it is recorded.
    """
    declared = entry.get("solvedStatus")
    if declared:
        return declared == "solved", "manifest solvedStatus %r" % declared
    named = "solved" in entry["fileName"].lower()
    return named, ("filename %s the word 'solved'; the manifest leaves solvedStatus null"
                   % ("contains" if named else "does not contain"))


def counts(records, key):
    out = {}
    for record in records:
        value = record[key] if not isinstance(record.get(key), dict) else None
        out[str(value)] = out.get(str(value), 0) + 1
    return dict(sorted(out.items()))


def main():
    entries = sources()
    if len(entries) != 4:
        print("expected 4 EOY sources for %s, manifest gave %d" % (MODULE_ID, len(entries)),
              file=sys.stderr)

    all_records = []
    file_reports = []
    docs = {}

    for entry in entries:
        cache = os.path.join(TEXTCACHE, entry["sourceId"] + ".json")
        report = {
            "sourceId": entry["sourceId"], "file": entry["fileName"],
            "solvedStatus": entry.get("solvedStatus"),
            "examSittingYear": entry.get("examSittingYear"),
            "examSittingBatch": BATCH_OF_YEAR.get(entry.get("examSittingYear")),
            "manifestSubject": entry.get("subject"),
            "pagesInManifest": entry.get("pageCount"),
            "unparsed": [], "furniture": [], "preamble": [],
        }
        if not os.path.exists(cache):
            report.update({"pagesRead": 0, "questionsFound": 0,
                           "error": "no cached page text at %s" % cache})
            file_reports.append(report)
            continue
        with open(cache, encoding="utf-8") as fh:
            doc = json.load(fh)
        docs[entry["sourceId"]] = doc
        report["textMode"] = doc["mode"]
        report["pagesRead"] = len(doc["pages"])
        report["emptyPages"] = doc["emptyPages"]

        records, lines = build_records(entry, doc, report)
        page_yield(doc, lines, records, report)
        report["linesRead"] = len(lines)
        report["questionsFound"] = len(records)
        report["questionsUnparsed"] = len(report["unparsed"])
        report["unparsedSample"] = report["unparsed"][:20]
        report["furnitureLines"] = len(report["furniture"])
        report["furnitureSample"] = report["furniture"][:10]
        report["ligatureLossDetected"] = any(
            LIGATURE_CRUMB.match(f["text"]) for f in report["furniture"])
        del report["furniture"]
        report["byFormat"] = counts(records, "format")
        report["bySubject"] = counts(records, "subject")
        all_records.extend(records)
        file_reports.append(report)

    # ---- answers -----------------------------------------------------------
    # Null everywhere, but for two different reasons, and conflating them is
    # what would make a reader think this module has no answer key at all.
    for record in all_records:
        if record["answer"] is not None:
            continue
        if record["isSolvedCopy"] and record["options"]:
            record["answerSource"] = "not-in-text-layer"
            record["answerNote"] = (
                "this question IS answered in the document: the paper marks the correct option "
                "with a pink highlight drawn over it. The highlight is a drawing overlay with no "
                "text of its own, so it does not appear in the text layer this extractor reads. "
                "Recovering it is out of scope here; it comes from "
                "scripts/kasr/extract/108-INT/answerkey.json, joined on questionId.")
        elif record["isSolvedCopy"]:
            # A highlight can only mark a lettered option. This question has none,
            # so the same mechanism cannot be carrying its answer, and claiming a
            # recoverable key for it would be an overclaim.
            record["answerSource"] = "no-answer-in-text-layer"
            record["answerNote"] = (
                "this is a written question on the solved copy, and it has no options for a "
                "highlight to mark. Its text layer holds only ruled answer space, the same as the "
                "unsolved copy. Whether the drawing overlay carries a written model answer cannot "
                "be told from the text and is not assumed here; answerkey.json is what would "
                "report it either way.")
        else:
            record["answerSource"] = "not-marked-in-document"
            record["answerNote"] = (
                "this is the unsolved copy of the paper; no answer is marked on it anywhere, in "
                "the text layer or otherwise. Its answer is the one on the paired solved copy.")

    # ---- pair each sitting -------------------------------------------------
    findings = []
    sittings = []
    for year in sorted({r["examSittingYear"] for r in all_records}, reverse=True):
        solved = [r for r in all_records if r["examSittingYear"] == year and r["isSolvedCopy"]]
        unsolved = [r for r in all_records if r["examSittingYear"] == year and not r["isSolvedCopy"]]
        summary = pair_sitting(solved, unsolved)
        summary["examSittingYear"] = year
        summary["examSittingBatch"] = BATCH_OF_YEAR.get(year)
        sittings.append(summary)

    # ---- what the solved copies actually contain ---------------------------
    for year in sorted(docs and {e.get("examSittingYear") for e in entries} or [], reverse=True):
        pair = [e for e in entries if e.get("examSittingYear") == year]
        if len(pair) != 2:
            continue
        a, b = pair
        pa, pb = docs.get(a["sourceId"]), docs.get(b["sourceId"])
        if not pa or not pb:
            continue
        identical = pa["pages"] == pb["pages"]
        differing = [i + 1 for i, (x, y) in enumerate(zip(pa["pages"], pb["pages"])) if x != y]
        deligatured_same = all(deligature(x) == deligature(y)
                               for x, y in zip(pa["pages"], pb["pages"]))
        findings.append({
            "finding": ("the %s sitting's solved copy IS a complete answer key, but marks its "
                        "answers with a pink highlight drawn over the correct option — a drawing "
                        "overlay with no text — so it extracts to the same text as its unsolved "
                        "twin" % BATCH_OF_YEAR.get(year, year)),
            "evidence": ("cached page text is %s across all %d pages%s; the marking was confirmed "
                         "by rendering the pages, and the solved PDF is the larger file because of "
                         "the overlay it carries"
                         % ("byte-identical" if identical else "identical after normalisation"
                            if deligatured_same else "different",
                            len(pa["pages"]),
                            "" if identical else " (pages %s differ only in dropped fi/fl ligatures "
                            "and indentation: %s)" % (
                                ",".join(str(d) for d in differing),
                                "confirmed" if deligatured_same else "NOT confirmed"))),
            "consequence": ("every answer in this extractor's output is null and none was "
                            "inferred; the answers are recovered separately by rasterising the "
                            "highlight rectangles, in "
                            "scripts/kasr/extract/108-INT/answerkey.json, and joined on questionId"),
            "sourceIds": [a["sourceId"], b["sourceId"]],
        })

    findings.append({
        "finding": "the manifest labels all four files subject 'Pathology'; that is wrong for half of each paper",
        "evidence": ("both papers run Pathology then Pharmacology inside every section, and the 2024 "
                     "practical section prints the two as headings 'I) Pathology' and 'II) Pharmacology:'"),
        "consequence": "subject is inferred per question and the basis recorded in subjectSource",
        "sourceIds": [e["sourceId"] for e in entries],
    })
    findings.append({
        "finding": "the 2024 paper prints a reliability caveat on its own title page",
        "evidence": "page 1 reads '(The questions might not be the most accurate)'",
        "consequence": "the 2024 wording is a student transcription, not necessarily the registrar's paper",
        "sourceIds": [e["sourceId"] for e in entries if e.get("examSittingYear") == 2024],
    })
    image_only = [r["questionId"] for r in all_records if r["usesImage"]]
    findings.append({
        "finding": "%d questions depend on a picture that the text layer does not contain" % len(image_only),
        "evidence": "practical plates, dosage-form photographs and the option list of the matching item",
        "consequence": "these carry usesImage true; their prompts are recorded and their content is not invented",
        "sourceIds": sorted({r["sourceId"] for r in all_records if r["usesImage"]}),
    })

    anomalies = numbering_anomalies(all_records) + declared_count_checks(all_records, file_reports)
    overlaps = cross_sitting(all_records)

    # ---- joining, and the canonical copy of each question ------------------
    join = join_safety(all_records)
    ids = [r["questionId"] for r in all_records]
    if len(set(ids)) != len(ids):
        raise SystemExit("questionId is not unique; refusing to write a file that cannot be joined")

    on_page, in_section = {}, {}
    for record in all_records:
        on_page.setdefault((record["sourceId"], record["page"], record["number"]), []).append(record)
        in_section.setdefault(
            (record["sourceId"], record["section"]["index"], record["number"]), []).append(record)
    for record in all_records:
        record["printedNumberUniqueOnPage"] = len(
            on_page[(record["sourceId"], record["page"], record["number"])]) == 1
        record["printedNumberUniqueInSection"] = len(
            in_section[(record["sourceId"], record["section"]["index"], record["number"])]) == 1

    # A question is counted once per sitting. The solved copy is the canonical
    # row; the unsolved row is the same question and says so, so that a reader
    # summing this file does not report 150 questions where there are 75.
    for record in all_records:
        if record["isSolvedCopy"] or record["pairedWith"] is None:
            record["isCanonicalCopy"] = True
            record["duplicateOfQuestionId"] = None
        else:
            record["isCanonicalCopy"] = False
            record["duplicateOfQuestionId"] = record["pairedWith"]["questionId"]
    distinct = [r for r in all_records if r["isCanonicalCopy"]]

    for record in all_records:
        for anomaly in anomalies:
            if record["questionId"] in anomaly["questionIds"]:
                record.setdefault("numberingAnomalies", []).append(anomaly["kind"])

    doc = {
        "moduleId": MODULE_ID,
        "universityId": UNIVERSITY_ID,
        "sourceCategory": SOURCE_CATEGORY,
        "generatedBy": "scripts/kasr/extract/108-INT/eoy.py",
        "generatedFrom": ("cached page text under scripts/kasr/extract/pagetext/, for the four "
                          "sources the manifest lists with moduleId '108 INT', universityId 'kau' "
                          "and sourceCategory 'EOY'"),
        "subjectsDeclared": SUBJECTS,
        "questionFormatVocabulary": "src/data/questionFormat.ts",
        "answerKeyNote": (
            "No answer is recorded in this file, and that does not mean these papers are "
            "unmarked. Two of the four ARE complete answer keys: the correct option is marked "
            "with a pink highlight drawn over it, which is a drawing overlay carrying no text, "
            "so it is absent from the text layer this extractor reads and identical text comes "
            "out of a solved copy and its unsolved twin. Read the counts as: %d rows whose "
            "answer exists in the document and is recovered elsewhere "
            "(scripts/kasr/extract/108-INT/answerkey.json, joined on questionId); %d rows that are "
            "written questions on a solved copy, which have no option for a highlight to mark and "
            "whose text layer holds only ruled answer space; and %d rows on unsolved copies where "
            "nothing is marked at all. Do not read them as %d unanswered questions."
            % (sum(1 for r in all_records if r["answerSource"] == "not-in-text-layer"),
               sum(1 for r in all_records if r["answerSource"] == "no-answer-in-text-layer"),
               sum(1 for r in all_records if r["answerSource"] == "not-marked-in-document"),
               len(all_records))),
        "answerKeyJoin": {
            "recommendedKey": "questionId",
            "questionIdShape": "<sourceId>:s<sectionIndex>:<sectionSequentialIndex>",
            "questionIdIsPositional": True,
            "questionIdExplanation": (
                "sectionSequentialIndex is the question's 1-based position within its section as "
                "the paper lays it out, not the number the paper prints. It is therefore unique "
                "even where the printed number repeats or is skipped."),
            "example": (all_records[0]["questionId"] if all_records else None),
            "doNotJoinOn": [c["key"] for c in join if not c["unique"]],
            "keyAudit": join,
            "warning": (
                "sourceId + page + printed number is NOT unique on this module: the 2025 paper "
                "prints two different questions numbered 9 on page 3 of both copies. Joining on "
                "it would place one recovered answer on two questions. Every question carries "
                "printedNumberUniqueOnPage and printedNumberUniqueInSection so a consumer can "
                "assert this rather than discover it."),
        },
        "totals": {
            "rows": len(all_records),
            "distinctQuestions": len(distinct),
            "duplicateRows": len(all_records) - len(distinct),
            "rowsNote": (
                "Each sitting is present twice — a solved copy and an unsolved copy of the same "
                "paper — so there are %d rows carrying %d distinct questions. Every row that is "
                "the second copy of a question has isCanonicalCopy false and names its twin in "
                "duplicateOfQuestionId; filter on isCanonicalCopy to count questions."
                % (len(all_records), len(distinct))),
            "distinctByFormat": counts(distinct, "format"),
            "distinctBySubject": counts(distinct, "subject"),
            "distinctBySitting": {str(y): sum(1 for r in distinct if r["examSittingYear"] == y)
                                  for y in sorted({r["examSittingYear"] for r in distinct},
                                                  reverse=True)},
            "rowsByFile": {r["file"]: r.get("questionsFound", 0) for r in file_reports},
            "rowsByFormat": counts(all_records, "format"),
            "rowsBySubject": counts(all_records, "subject"),
            "withAnswer": sum(1 for r in all_records if r["answer"]),
            "withoutAnswerBecauseNotInTextLayer": sum(
                1 for r in all_records if r["answerSource"] == "not-in-text-layer"),
            "withoutAnswerBecauseWrittenOnSolvedCopy": sum(
                1 for r in all_records if r["answerSource"] == "no-answer-in-text-layer"),
            "withoutAnswerBecauseNotMarked": sum(
                1 for r in all_records if r["answerSource"] == "not-marked-in-document"),
            "distinctQuestionsWithARecoverableAnswer": sum(
                1 for r in distinct if r["answerSource"] == "not-in-text-layer"),
            "distinctWrittenQuestionsWithNoKeyEither": sum(
                1 for r in distinct if r["answerSource"] == "no-answer-in-text-layer"),
            "usingAnImage": len(image_only),
            "distinctUsingAnImage": sum(1 for r in distinct if r["usesImage"]),
            "pagesRead": sum(r.get("pagesRead", 0) for r in file_reports),
            "pagesYieldingNothing": sum(len(r.get("pagesYieldingNothing", [])) for r in file_reports),
            "linesUnparsed": sum(r.get("questionsUnparsed", 0) for r in file_reports),
        },
        "findings": findings,
        "anomalies": anomalies,
        "sittings": sittings,
        "crossSittingOverlap": overlaps,
        "files": file_reports,
        "questions": all_records,
    }

    tmp = OUT + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(doc, fh, ensure_ascii=False, indent=1, sort_keys=False)
    os.replace(tmp, OUT)

    print("%d questions from %d files -> %s" % (len(all_records), len(file_reports), OUT))
    for report in file_reports:
        print("  %-44s %2s pages  %3d q  %2d unparsed lines  %d blank-yield pages"
              % (report["file"][:44], report.get("pagesRead", "?"), report.get("questionsFound", 0),
                 report.get("questionsUnparsed", 0), len(report.get("pagesYieldingNothing", []))))
    print("  %d rows = %d distinct questions + %d duplicate rows (each sitting supplied twice)"
          % (doc["totals"]["rows"], doc["totals"]["distinctQuestions"],
             doc["totals"]["duplicateRows"]))
    print("  distinct by format:  %s" % doc["totals"]["distinctByFormat"])
    print("  distinct by subject: %s" % doc["totals"]["distinctBySubject"])
    print("  answers in text: %d; recoverable from the pink highlight overlay: %d rows (%d distinct);"
          " written questions with no key either: %d rows"
          % (doc["totals"]["withAnswer"],
             doc["totals"]["withoutAnswerBecauseNotInTextLayer"],
             doc["totals"]["distinctQuestionsWithARecoverableAnswer"],
             doc["totals"]["withoutAnswerBecauseWrittenOnSolvedCopy"]))
    print("  questionId unique over %d rows: %s   unsafe join keys: %s"
          % (doc["totals"]["rows"],
             next(c["unique"] for c in join if c["key"] == "questionId"),
             ", ".join(doc["answerKeyJoin"]["doNotJoinOn"]) or "none"))
    print("  anomalies: %d   cross-sitting overlaps: %d" % (len(anomalies), len(overlaps)))


if __name__ == "__main__":
    main()
