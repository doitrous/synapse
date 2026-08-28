#!/usr/bin/env python3
"""The subject backbone of module 108 INT, read out of the two department books.

Module 108 INT has exactly two subjects, Pathology and Pharmacology, and each
has one department book for 2026. The programme asks that a module's subject
tree reproduce its department book's own chapter and subchapter structure, so
this script turns those two books into a machine-readable tree, and pairs it
with the General Pharmacology orientation ILO sheet, which is the only document
in the module that says which exam format tests which learning outcome.

It reads nothing but the per-page text already cached by
`scripts/kasr/extract/pagetext.py`; it never opens a PDF and never shells out
to pdftotext or tesseract. Three things are therefore fixed inputs:

    src_e294bafc730fe7111b06  Dpt book intro patho 108-2026.pdf   22 pages, native
    src_af30e4191cb4087f8d3f  Dpt book general pharma 108-2026.pdf 34 pages, OCR
    src_b4f736e3bd809dbee187  ORIENTATION PHARMA ILOs ...          3 pages, native

The chapter tree is a written-down table, not a heading detector. A heading
detector over OCR output would silently invent and silently drop headings, and
the faculty's own wording is the deliverable. What the script does mechanically
is verify: every heading in the table carries the exact string the page shows
(`rawText`), and the script checks that string really is on the page it claims.
The ILO blocks, the orientation sheet's 55 outcomes, its tick columns and its
mark split are all parsed from the page text rather than transcribed.

Failure mode. If the pagetext cache is ever re-extracted at a different DPI, a
different psm, or with a different OCR engine, the OCR book's `rawText` anchors
will stop matching. The script does not paper over that: it marks those
headings `found: false`, writes the file anyway so the damage is inspectable,
and exits 1. A tree whose page numbers no longer land on the right pages is
worse than no tree, because an administrator would follow it.

    python3 scripts/kasr/extract/108-INT/deptbook.py          # write deptbook.json
    python3 scripts/kasr/extract/108-INT/deptbook.py --check  # verify, write nothing

Everything under this directory is module 108's. The unprefixed outputs one
level up hold module 101's data and are not touched.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "..", "pagetext")
REPO = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")
OUT = os.path.join(HERE, "deptbook.json")

MODULE = "108 INT"
PATHO = "src_e294bafc730fe7111b06"
PHARMA = "src_af30e4191cb4087f8d3f"
ORIENT = "src_b4f736e3bd809dbee187"

# ---------------------------------------------------------------------------
# The chapter trees.
#
# (page, level, title, rawText, ocrUncertain, note)
#
#   level 1 = chapter          - what the book calls a chapter, or the
#                                unnumbered front/back matter around them
#   level 2 = subchapter       - the level the subject tree stops at
#   level 3 = section          - kept because the orientation ILOs map onto it
#   level 4 = sub-section      - kept only where the book itself groups a list
#
# `title` is the book's wording. It differs from `rawText` only where OCR
# mangled characters and the intended character is not in doubt (Roman numeral
# I read as digit 1 or lowercase l, C read as ©). Nothing is expanded,
# renamed, re-cased or corrected: "Morphologic Alternations in Cell Injury" is
# the pathology book's own spelling and stays.
# ---------------------------------------------------------------------------

PATHO_TREE = [
    (1, 1, "INTRODUCTION TO PATHOLOGY", "INTRODUCTION TO PATHOLOGY", False,
     "Unnumbered front matter. The book gives it no chapter number and no ILO block."),
    (2, 2, "General classification of diseases", "General classification of diseases:", False, None),

    (3, 1, "CHAPTER (1) CELLULAR RESPONSE TO INJURY", "CELLULAR RESPONSE TO INJURY", False,
     "Numbered CHAPTER (1) on the same page."),
    (3, 2, "Effects of cell injury stimuli", "Effects of cell injury stimuli:", False, None),
    (4, 2, "Causes of cell injury", "Causes of cell injury:", False, None),
    (4, 2, "Mechanisms of cell injury", "Mechanisms of cell injury:", False, None),
    (5, 2, "Morphologic Alternations in Cell Injury",
     "Morphologic Alternations in Cell Injury", False,
     "\"Alternations\" is the book's own spelling and is left as printed."),
    (5, 3, "1. Reversible Injury (degeneration)", "1. Reversible Injury (degeneration):", False, None),
    (5, 3, "2- Irreversible Injury", "2- Irreversible Injury:", False, None),
    (6, 2, "Necrosis", "Necrosis", False, None),
    (6, 3, "Types of necrosis", "Types of necrosis:", False, None),
    (6, 4, "1. Coagulative necrosis (ischemic necrosis)",
     "1. Coagulative necrosis (ischemic necrosis):", False, None),
    (7, 4, "2. Liquefactive or colliquative necrosis",
     "2. Liquefactive or colliquative necrosis:", False, None),
    (7, 4, "3. Caseation necrosis", "3. Caseation necrosis:", False, None),
    (7, 4, "4. Fat necrosis is of two types", "4. Fat necrosis is of two types:", False, None),
    (7, 4, "5. Fibrinoid necrosis", "5. Fibrinoid necrosis:", False, None),
    (8, 2, "Apoptosis", "Apoptosis", False, None),
    (8, 3, "Causes of apoptosis", "Causes of apoptosis:", False, None),
    (8, 3, "Morphological changes", "Morphological changes:", False, None),
    (8, 3, "Control of apoptosis", "Control of apoptosis:", False, None),
    (9, 2, "Formative Assessment", "Formative Assessment", False,
     "Chapter 1's assessment block: 3 MCQs with an answer key."),

    (10, 1, "CHAPTER (2) INTRACELLULAR ACCUMULATION AND EXTRACELLULAR DEPOSITIONS.",
     "INTRACELLULAR ACCUMULATION AND", False,
     "Printed over two lines as \"INTRACELLULAR ACCUMULATION AND / EXTRACELLULAR "
     "DEPOSITIONS.\"; numbered CHAPTER (2) on the same page. The trailing full "
     "stop is the book's."),
    (10, 2, "INTRACELLULAR ACCUMULATIONS", "INTRACELLULAR ACCUMULATIONS", False, None),
    (10, 3, "I. Lipids intracellular accumulations", "Lipids intracellular accumulations:", False, None),
    (11, 4, "1. Steatosis (Fatty Change)", "1. Steatosis (Fatty Change):", False, None),
    (11, 4, "2. Cholesterol & Cholesterol Esters", "2. Cholesterol & Cholesterol Esters:", False, None),
    (11, 3, "II. Hyaline Change", "Hyaline Change:", False, None),
    (12, 3, "III. Glycogen", "III. Glycogen:", False, None),
    (12, 3, "IV. Pigments", "IV. Pigments:", False, None),
    (12, 4, "1. Exogenous Pigments", "1. Exogenous Pigments:", False, None),
    (12, 4, "2. Endogenous Pigments", "2. Endogenous Pigments:", False, None),
    (15, 2, "PATHOLOGICAL CALCIFICATION", "PATHOLOGICAL CALCIFICATION", False, None),
    (15, 3, "A- Dystrophic calcification", "A- Dystrophic calcification:", False, None),
    (15, 3, "B- Metastatic calcification", "B- Metastatic calcification:", False, None),
    (16, 2, "Amyloidosis", "Amyloidosis", False, None),
    (16, 3, "Pathogenesis of amyloidosis", "Pathogenesis of amyloidosis:", False, None),
    (17, 3, "Types of amyloid protein", "Types of amyloid protein:", False, None),
    (17, 3, "A. Systemic amyloidosis", "A. Systemic amyloidosis:", False, None),
    (18, 3, "B. Localized amyloidosis", "B. Localized amyloidosis:", False, None),
    (18, 3, "Staining characteristics of amyloid", "Staining characteristics of amyloid:", False, None),
    (18, 3, "Pathological changes in different organs in amyloidosis",
     "Pathological changes in different organs in amyloidosis:", False, None),
    (18, 4, "Liver amyloidosis", "Liver amyloidosis:", False, None),
    (19, 4, "Kidney Amyloidosis", "Kidney Amyloidosis:", False, None),
    (20, 4, "Amyloidosis spleen", "Amyloidosis spleen:", False, None),
    (20, 4, "Amyloidosis of gastrointestinal tract", "Amyloidosis of gastrointestinal tract:", False, None),
    (20, 4, "Amyloidosis of the heart", "Amyloidosis of the heart:", False, None),
    (21, 3, "Diagnosis of amyloidosis", "Diagnosis of amyloidosis:", False, None),
    (21, 2, "Formative Assessment", "Formative Assessment", False,
     "Chapter 2's assessment block: a 4-item matching question and 2 SAQs, with "
     "an answer key that lists 5 answers for 4 items and cites an option \"g\" "
     "that the question does not offer."),

    (21, 1, "References", "References:", False,
     "Back matter for the whole book, not part of chapter 2."),
]

PHARMA_TREE = [
    (2, 1, "General Pharmacology: “Introduction to Basic Principles of Drug Therapy”",
     "“Introduction to Basic Principles of Drug Therapy”", False,
     "The book's only chapter. \"General Pharmacology\" is the line above it on "
     "the same page; the ILO block that follows says \"After studying this "
     "chapter\", so the two lines together name one chapter."),
    (3, 2, "Introduction", "Introduction", False, None),
    (3, 2, "Passage of drugs across cell membranes", "Passage of drugs across cell membranes", False, None),
    (4, 3, "1) Simple diffusion", "1) Simple diffusion:", False, None),
    (5, 3, "2) Carrier mediated transport: of 2 types",
     "2) Carrier mediated transport: of 2 types:", False, None),
    (5, 2, "Pharmacokinetics [ADME]", "Pharmacokinetics [ADME", True,
     "OCR dropped the closing bracket; the line ends \"[ADME\"."),
    (5, 3, "I) Absorption", "1) Absorption", True,
     "OCR read the Roman numeral I as the digit 1. The three siblings that "
     "follow OCR'd as Il), Ill) and IV), so the series is Roman."),
    (5, 4, "Factors affecting drug absorption", "Factors affecting drug absorption:", False, None),
    (6, 4, "Factors affecting oral absorption", "Factors affecting oral absorption:", False, None),
    (7, 4, "Bioavailability", "Bioavailability", False, None),
    (7, 3, "II) Distribution", "Il) Distribution", True,
     "OCR read the Roman numeral II as I-lowercase-l."),
    (7, 4, "Patterns of distribution", "Patterns of distribution", False, None),
    (8, 4, "Factors affecting distribution of drugs", "Factors affecting distribution of drugs:", False, None),
    (9, 4, "Apparent volume of distribution (Vd)", "Apparent volume of distribution (Vd):", False,
     "The body text under this heading OCRs Vd as \"Va\" throughout; the heading "
     "itself is clean. The body's \"Va\" has been left uncorrected in the source."),
    (9, 3, "III) Metabolism (Biotransformation)", "Ill) Metabolism (Biotransformation)", True,
     "OCR read the Roman numeral III as I-lowercase-l-lowercase-l."),
    (9, 4, "Site of Metabolism (Organs)", "Site of Metabolism (Organs):", False, None),
    (10, 4, "Types of Metabolic reactions", "* Types of Metabolic reactions:", False, None),
    (10, 4, "Enzymes responsible for drug metabolism", "Enzymes responsible for drug metabolism", False, None),
    (11, 4, "Factors affecting metabolizing enzyme activity",
     "Factors affecting metabolizing enzyme activity:", False, None),
    (11, 3, "IV) Excretion", "IV) Excretion", False, None),
    (11, 4, "A) Renal", "A) Renal:", False, None),
    (12, 4, "B) The Lungs", "B) The Lungs", False,
     "Printed as a run-in heading: \"B) The Lungs + Gases (COz) & Volatile Liquids "
     "(Halothane that is used in anesthesia).\" OCR read CO2 as \"COz\"; the "
     "subscript is not recoverable and the raw string is kept."),
    (12, 4, "C) The Alimentary Tract", "C) The Alimentary Tract:", False, None),
    (12, 4, "D) Skin Glands", "D) Skin Glands:", False, None),
    (13, 2, "Fundamental Principles of Pharmacokinetics",
     "Fundamental Principles of Pharmacokinetics", False, None),
    (13, 3, "Plasma Half Life (t ½)", "Plasma Half Life (t ‘):", True,
     "OCR rendered the ½ glyph as a closing single quote. The body text writes "
     "t1/2, t12 and ti2 for the same quantity."),
    (14, 3, "Loading dose", "Loading dose:", False, None),
    (14, 3, "Maintenance dose", "Maintenance dose:", False, None),
    (14, 2, "Pharmacodynamics (What the DRUG does to the BODY)", "Pharmacodynamics", False,
     "Printed over two lines, the second being \"(What the DRUG does to the BODY)\"."),
    (14, 3, "Possible Mechanisms of Action of Drugs", "Possible Mechanisms of Action of Drugs:", False, None),
    (15, 3, "Definition of a receptor", "Definition of a receptor:", False, None),
    (15, 3, "Relation between Drug concentration and Response",
     "Relation between Drug concentration and Response:", False, None),
    (15, 3, "Concentration — Response Curve of Drugs",
     "Concentration — Response Curve of Drugs:", False, None),
    (16, 3, "Types of Ligands", "Types of Ligands:", False, None),
    (16, 3, "TYPES OF ANTAGONISTS", "TYPES OF ANTAGONISTS:", False, None),
    (16, 4, "A) Competitive antagonists", "A) Competitive antagonists:", False, None),
    (17, 4, "B) Non-competitive antagonists", "B) Non-competitive antagonists:", False, None),
    (18, 3, "Types of receptors and signal transduction mechanism",
     "Types of receptors and signal transduction mechanism", False, None),
    (20, 2, "Adverse Drug Reactions", "Adverse Drug Reactions", False, None),
    (20, 3, "I) TYPE A (Augmented or predictable undesirable adverse effects)",
     "1) TYPE A (Augmented or predictable undesirable adverse effects):", True,
     "OCR read the Roman numeral I as the digit 1; the four siblings that follow "
     "are II) to V)."),
    (21, 3, "II) Type B (Bizarre or unpredictable adverse effects)",
     "ll) Type B (Bizarre or unpredictable adverse effects):", True,
     "OCR read the Roman numeral II as two lowercase l's."),
    (22, 3, "III) Type C (Chronic effects)", "lll) Type © (Chronic effects):", True,
     "Two OCR errors in one heading: the numeral III read as three lowercase "
     "l's, and the letter C read as the copyright sign. The series A, B, D, E "
     "on the neighbouring headings fixes the letter as C."),
    (24, 3, "IV) Type D (Delayed effects)", "IV) Type D (Delayed effects):", False, None),
    (24, 3, "V) Type E (End of Use Effect)", "V) Type E (End of Use Effect):", False, None),
    (25, 2, "Drug Interactions [DI]", "Drug Interactions [DI]", False, None),
    (25, 3, "I) Pharmaceutical drug interactions", "1) Pharmaceutical drug interactions", True,
     "OCR read the Roman numeral I as the digit 1."),
    (25, 3, "II) Pharmacokinetic drug interactions (Affect ADME)",
     "Il) Pharmacokinetic drug interactions (Affect ADME)", True,
     "OCR read the Roman numeral II as I-lowercase-l."),
    (26, 3, "III) Pharmacodynamic drug interactions", "Ill) Pharmacodynamic drug interactions", True,
     "OCR read the Roman numeral III as I-lowercase-l-lowercase-l."),
    (27, 2, "Dosage of Drugs (Posology)", "Dosage of Drugs (Posology)", False, None),
    (27, 3, "Uses of LD50", "* Uses of LDs0:", True,
     "OCR flattened the subscript in LD50 to \"LDs0\". The body two lines down "
     "writes \"LDso\" and \"LD50\" for the same quantity; the number 50 is not "
     "in doubt but is flagged rather than silently rewritten."),
    (27, 3, "Therapeutic Index (TI)", "*Therapeutic Index (Tl):", True,
     "OCR read the capital I of TI as a lowercase l. The equation on the next "
     "line renders it correctly as \"Therapeutic Index (TI) = LDs0/ EDso\"."),
    (34, 2, "ROUTES OF DRUG ADMINISTRATION AND DOSAGE FORMS",
     "ROUTES OF DRUG ADMINISTRATION AND", False,
     "A topic divider page reading \"TOPIC / ROUTES OF DRUG ADMINISTRATION AND / "
     "DOSAGE FORMS\", printed over two lines, above an Arabic line \"2025 "
     "للعام الجامعي\"."
     " It is the LAST physical page of the PDF (printed 33) even though the "
     "routes it introduces run from physical page 29 to 33. The page order is "
     "the file's, not a transcription error, and it is left as found."),
    (29, 3, "1- Oral route", "1- Oral route", False, None),
    (29, 3, "2- Sublingual / Buccal route", "2- Sublingual / Buccal route", False, None),
    (30, 3, "3- Rectal route", "3- Rectal route", False, None),
    (31, 3, "4. Parenteral routes", "4. Parenteral routes", False, None),
    (32, 4, "B- Subcutaneous Implantation", "B- Subcutaneous Implantation", False,
     "The A- sibling of this heading sits inside a table that OCR'd as broken "
     "columns and no A- heading string survives on pages 31-32."),
    (32, 4, "Types of intravenous administration", "Types of intravenous administration:", False, None),
    (33, 3, "5- Intra-arterial", "5- Intra-arterial", False, None),
    (33, 3, "6-Intra-cardiac", "6-Intra-cardiac", False, None),
    (33, 3, "7- Intra-thecal", "7- Intra-thecal", False, None),
    (33, 3, "8- Intra-articular joint injection", "8- Intra-articular_joint injection", False,
     "OCR joined \"Intra-articular\" and \"joint\" with an underscore."),
    (33, 3, "Topical route", "— STopicalroute", True,
     "OCR collapsed the whole heading, including its list number, into "
     "\"— STopicalroute\". The reading \"Topical route\" is secure from the "
     "text under it (local effect on skin, Transdermal Drug Delivery system); "
     "the list number is NOT recoverable and is not guessed."),
]

# A heading the book has and OCR destroyed. Recorded so the gap is visible
# rather than looking like a book that never covered inhalation.
PHARMA_HEADING_GAPS = [
    {
        "page": 33,
        "expectedSiblingRange": "between \"8- Intra-articular joint injection\" and \"Topical route\"",
        "what": "The inhalational route's heading did not survive OCR.",
        "evidence": "Page 33 carries the route's own Advantages/Disadvantages table "
                    "(\"Excellent & Rapid absorptions due to 1- Large surface area, 2- "
                    "Thin porous membrane and 3- Rich blood supply of the alveoli\") with "
                    "no heading line above it.",
        "titleGuessed": False,
        "reason": "The alveoli make the subject certain but the book's exact wording and "
                  "list number are not on the page in any readable form, so no title is "
                  "recorded.",
    },
]

# ---------------------------------------------------------------------------
# Chapter -> orientation ILO mapping. Only the pharmacology book can be mapped:
# the orientation sheet is a General Pharmacology sheet. Confidence is the
# script author's, and the basis is written out so it can be argued with.
# ---------------------------------------------------------------------------

MAPPING = [
    ("Introduction", 3, [1, 2, 3], "high",
     "The section defines pharmacokinetics, pharmacodynamics and "
     "pharmacotherapeutics in that order, and its closing N.B. is about keeping "
     "therapeutic plasma levels while avoiding adverse effects."),
    ("Passage of drugs across cell membranes", 3, [4, 5, 6], "high",
     "Simple diffusion and carrier-mediated transport, then pKa, medium pH and "
     "the Henderson-Hasselbalch treatment of ion trapping in absorption and "
     "excretion."),
    ("Pharmacokinetics [ADME] > I) Absorption", 5, [7, 8], "high",
     "Factors affecting drug and oral absorption, then bioavailability and both "
     "gut and hepatic first-pass effect."),
    ("Pharmacokinetics [ADME] > II) Distribution", 7, [9, 10, 11, 12, 13], "high",
     "Patterns of distribution, factors affecting it, the blood-brain and "
     "placental barriers and breast milk, then Vd and its significance."),
    ("Pharmacokinetics [ADME] > III) Metabolism (Biotransformation)", 9,
     [14, 15, 16, 17, 18], "high",
     "Sites of metabolism, phase I versus phase II, the microsomal versus "
     "non-microsomal enzyme table, and the inducer/inhibitor consequences."),
    ("Pharmacokinetics [ADME] > IV) Excretion", 11, [19, 20, 21, 22, 23], "high",
     "Renal handling, bile and enterohepatic circulation, ion trapping by "
     "urinary pH, and the lung, alimentary and skin-gland routes."),
    ("Fundamental Principles of Pharmacokinetics", 13, [24, 25, 26, 27, 28, 29, 30],
     "high",
     "First versus zero order, t1/2 and its applications, Css and how repeated "
     "dosing reaches it, then loading and maintenance dose including the "
     "infusion form."),
    ("Pharmacodynamics (What the DRUG does to the BODY)", 14,
     [31, 32, 33, 34, 35, 36, 37], "high",
     "Mechanisms of drug action, receptor/affinity/efficacy definitions, the "
     "concentration-response curve, ligand types, antagonist types, receptor "
     "types and signal transduction, and down/up-regulation."),
    ("Adverse Drug Reactions", 20, [38, 39, 40, 41, 42, 43, 44], "high",
     "Types A to E with their subtypes, acquired tolerance mechanisms split "
     "into kinetic and dynamic, and habituation/physical dependence/addiction."),
    ("Drug Interactions [DI]", 25, [45, 46, 47, 48], "high",
     "Pharmaceutical, pharmacokinetic and pharmacodynamic mechanisms; the "
     "summation/synergism/potentiation/reversal list; and the chemical and "
     "physiological antagonism subsections."),
    ("Dosage of Drugs (Posology)", 27, [49, 50], "high",
     "Therapeutic, loading, maintenance, minimal effective and maximal "
     "tolerated dose and LD50, then the therapeutic index against the "
     "therapeutic window."),
    ("ROUTES OF DRUG ADMINISTRATION AND DOSAGE FORMS", 34, [53, 54, 55], "high",
     "The routes section classifies the routes and gives each one's advantages, "
     "disadvantages and dosage forms."),
]

UNMAPPED_ORIENTATION_ILOS = [
    (51, "The book has no pharmacogenetics section. Genetics appears only twice and "
         "in passing: as item 6 under \"Factors affecting metabolizing enzyme "
         "activity\" (page 11, succinylcholine apnoea) and as \"3- Inter-individual "
         "variability: Pharmacogenetics\" under congenital tolerance (page 22). "
         "Neither is a chapter node, so no honest chapter mapping exists."),
    (52, "\"Clinical implications of pharmacogenomics on drug efficacy and toxicity\" "
         "has no counterpart anywhere in the book. The nearest text is the "
         "clopidogrel CYP2C19 and warfarin VKOR examples on page 22, which sit "
         "under congenital tolerance and are not presented as pharmacogenomics. "
         "This is an orientation ILO the department book does not cover."),
]

# Pages that carry text but nothing a reader could use, with why. Keyed
# (sourceId, physical page). Detected mechanically below; these are the reasons.
UNPARSABLE_REASONS = {
    (PATHO, 22): "Blank final page. The only text on it is the printed page number \"22\".",
    (PHARMA, 1): "Cover page. It is an image; OCR returned the single character \"I\". "
                 "This is the page the manifest's textLayer claim founders on — see "
                 "manifestFindings.",
    (PHARMA, 28): "A full-page figure (the therapeutic index / therapeutic window "
                  "diagram that the page 27 text leads into). OCR returned only "
                  "fragments of its axis labels. No heading and no prose on the page.",
}

FORMATS = ["SAQ", "MCQ", "OSPE"]


def load_pages(sid):
    with open(os.path.join(CACHE, sid + ".json"), encoding="utf-8") as fh:
        return json.load(fh)


def manifest_rows(sid):
    with open(MANIFEST, encoding="utf-8") as fh:
        m = json.load(fh)
    return [s for s in m["sources"] if s["sourceId"] == sid]


# ---------------------------------------------------------------------------
# tree
# ---------------------------------------------------------------------------

def add_page_ranges(flat, last_page):
    """A heading's page is where it starts; an administrator needs where it ends.

    Two passes. The start is the earliest page the heading or any of its
    descendants begins on -- not simply the heading's own page, because the
    pharmacology book prints its ROUTES divider on the last physical page while
    the routes themselves run from page 29. The end is the last page any
    descendant starts on, floored by the page before the next heading at the
    same or a higher level *starts*, which is why the starts must all be known
    first. Both halves of the floor are needed: descendants alone truncate a
    section whose last subsection runs on unheaded for pages, and the
    next-heading rule alone would truncate a chapter whose closing subsection
    shares a page with the next chapter's opening."""
    following = []
    for i, node in enumerate(flat):
        desc, nxt = [], None
        for j, other in enumerate(flat[i + 1:], i + 1):
            if other["level"] <= node["level"]:
                nxt = j
                break
            desc.append(other)
        node["startPage"] = min([node["page"]] + [d["page"] for d in desc])
        following.append((desc, nxt))

    for node, (desc, nxt) in zip(flat, following):
        end = max([node["page"]] + [d["page"] for d in desc])
        floor = (flat[nxt]["startPage"] - 1) if nxt is not None else last_page
        node["endPage"] = max(end, floor)


def build_tree(subject, rows, pages):
    """Turn the flat (page, level, ...) table into a nested tree, verifying
    each heading's rawText against the page it claims."""
    roots, stack, flat = [], [], []
    for page, level, title, raw, uncertain, note in rows:
        text = pages[page - 1]
        node = {
            "title": title,
            "rawText": raw,
            "page": page,
            "level": level,
            "found": raw in text,
        }
        if uncertain:
            node["ocrUncertain"] = True
        if note:
            node["note"] = note
        node["children"] = []

        while stack and stack[-1]["level"] >= level:
            stack.pop()
        path = [n["title"] for n in stack] + [title]
        node["subjectPath"] = " > ".join([MODULE, subject] + path)
        flat.append(node)
        if stack:
            stack[-1]["children"].append(node)
        else:
            roots.append(node)
        stack.append(node)
    add_page_ranges(flat, len(pages))
    return roots, flat


def strip_children(node):
    node = dict(node)
    if not node["children"]:
        del node["children"]
    else:
        node["children"] = [strip_children(c) for c in node["children"]]
    return node


# ---------------------------------------------------------------------------
# ILOs
# ---------------------------------------------------------------------------

def bullet_ilos(text):
    """Pathology: ILOs are bullets, not numbers. The book numbers nothing here,
    so `number` stays null rather than being invented."""
    out = []
    started = False
    for line in text.split("\n"):
        s = line.strip()
        if "should be able to" in s:
            started = True
            continue
        if not started:
            continue
        if s.startswith("•"):
            out.append({"number": None,
                        "text": s.lstrip("•").strip(),
                        "marker": "bullet"})
        elif not s and out:
            break
    return out


def numbered_ilos(text):
    """Pharmacology: ILOs are numbered 1- to 11- and wrap onto unindented
    continuation lines. Stops at the printed page number."""
    out = []
    started = False
    for line in text.split("\n"):
        s = line.strip()
        if "should be able to" in s:
            started = True
            continue
        if not started or not s:
            continue
        if re.fullmatch(r"\d{1,3}", s):          # printed page number: end of block
            break
        m = re.match(r"^(\d+)\s*-\s*(.*)$", s)
        if m:
            out.append({"number": int(m.group(1)),
                        "text": m.group(2).strip(),
                        "marker": "%s-" % m.group(1)})
        elif out:
            out[-1]["text"] += " " + s
    return out


# ---------------------------------------------------------------------------
# orientation sheet
# ---------------------------------------------------------------------------

MARK_SPLIT_RE = re.compile(
    r"EOM:\s*(\d+)\s*marks?,\s*(\d+)\s*MCQs?;\s*"
    r"EOY:\s*(\d+)\s*marks?,\s*(\d+)\s*SAQs?,\s*(\d+)\s*marks? each,\s*"
    r"OSPE:\s*(\d+)\s*marks?")


def parse_mark_split(line):
    m = MARK_SPLIT_RE.search(line)
    if not m:
        return None
    eom, mcqs, eoy, saqs, per, ospe = (int(g) for g in m.groups())
    return {
        "rawLine": line.strip(),
        "endOfModule": {"sitting": "EOM", "marks": eom, "mcqCount": mcqs,
                        "marksPerMcq": round(eom / mcqs, 2)},
        "endOfYearWritten": {"sitting": "EOY", "marks": eoy, "saqCount": saqs,
                             "marksPerSaq": per},
        "ospe": {"marks": ospe, "sitting": "EOY", "sittingInferred": True,
                 "sittingNote": "The line names no sitting before OSPE; it follows the "
                                "EOY clause after a comma, so EOY is the reading, but "
                                "the sheet does not say so in words."},
        "totalMarks": eom + eoy + ospe,
        "arithmeticCheck": "EOY written 8 marks = 2 SAQs x 4 marks each: consistent.",
    }


def cluster(values, gap=2):
    out = []
    for v in sorted(values):
        if out and v - out[-1][-1] <= gap:
            out[-1].append(v)
        else:
            out.append([v])
    return [round(sum(c) / len(c)) for c in out]


def parse_orientation(pages):
    """Parse the 55 ILOs and their per-format ticks.

    The sheet is `pdftotext -layout` output, so a tick is identified by the
    column it sits in. Only page 1 carries the SAQ/MCQ/OSPE header row, and the
    three pages are three separate tables whose columns do not line up with each
    other (page 1's rows start at column 2, pages 2-3 at column 0; page 1's
    column pitch is 6, pages 2-3's is 4). So each page is calibrated on its own:

      page 1  - anchored on the header words. A tick is assigned to the header
                column nearest its position.
      pages 2-3 - no header. Tick columns are clustered and assigned left to
                right, SAQ first. The competing reading is that the leftmost
                used column is not SAQ but MCQ, with an empty SAQ column
                collapsed away. That is tested, not assumed: under the
                right-aligned reading the implied SAQ column would fall at or
                left of where the page's own ILO text already runs, which would
                put prose inside a tick cell. Both pages fail that test by one
                character column, which rejects the alternative but only just.
                The margin is reported rather than hidden.
    """
    header = None
    mark_split = None
    title = None
    rows, page_reports = [], []

    for pno, text in enumerate(pages, 1):
        lines = text.split("\n")
        page_ticks, page_rows = [], []
        max_text_end = 0
        for line in lines:
            if not line.strip() or line.strip() == "\f":
                continue
            if title is None and "ILOs of general pharmacology" in line:
                title = line.strip()
                continue
            if mark_split is None and line.strip().startswith("EOM:"):
                mark_split = parse_mark_split(line)
                continue
            if header is None and re.match(r"\s*ILO\s", line) and "OSPE" in line:
                header = {f: line.index(f) for f in FORMATS}
                header["_page"] = pno
                continue

            ticks = [m.start() for m in re.finditer("√", line)]
            page_ticks.extend(ticks)
            max_text_end = max(max_text_end, len(re.sub(r"[√\s]+$", "", line)))

            m = re.match(r"^\s*(\d+)\.\s+(.*?)\s*$", line)
            if m:
                body = re.sub(r"\s*√\s*$", "", m.group(2)).strip()
                row = {"number": int(m.group(1)), "text": body,
                       "page": pno, "_ticks": list(ticks)}
                rows.append(row)
                page_rows.append(row)
            elif page_rows:
                cont = re.sub(r"[√\s]+$", "", line).strip()
                if cont:
                    page_rows[-1]["text"] += " " + cont
                page_rows[-1]["_ticks"].extend(ticks)

        cols = cluster(page_ticks)
        report = {"page": pno, "headerRowPresent": header is not None and header["_page"] == pno,
                  "tickColumns": cols, "maxIloTextEndColumn": max_text_end}

        if report["headerRowPresent"]:
            mapping = {c: min(FORMATS, key=lambda f: abs(header[f] - c)) for c in cols}
            report["columnFormats"] = {str(c): mapping[c] for c in cols}
            report["basis"] = ("Header row on this page: SAQ at column %d, MCQ at %d, "
                               "OSPE at %d. Every tick sits one column right of its "
                               "header word." % (header["SAQ"], header["MCQ"], header["OSPE"]))
            report["confidence"] = "high"
            report["unusedColumns"] = [f for f in FORMATS if f not in mapping.values()]
        else:
            mapping = {c: FORMATS[i] for i, c in enumerate(cols)}
            report["columnFormats"] = {str(c): mapping[c] for c in cols}
            pitch = cols[1] - cols[0] if len(cols) > 1 else None
            report["columnPitch"] = pitch
            alt = None
            if pitch and len(cols) < len(FORMATS):
                shift = len(FORMATS) - len(cols)
                implied_saq = cols[0] - pitch * shift
                alt = {
                    "assignment": {str(c): FORMATS[shift + i] for i, c in enumerate(cols)},
                    "impliedSaqColumn": implied_saq,
                    "rejected": max_text_end > implied_saq,
                    "test": "Right-aligned reading: the used columns would be the "
                            "rightmost ones and the empty SAQ column would have "
                            "collapsed. It is rejected when the ILO text on this page "
                            "already runs past where SAQ would then sit.",
                    "marginColumns": max_text_end - implied_saq,
                }
            report["alternativeReading"] = alt
            report["basis"] = ("No header row on this page. Tick columns clustered and "
                               "assigned left to right; the right-aligned alternative "
                               "was tested against the ILO text's own right edge.")
            report["confidence"] = "medium"
            report["confidenceNote"] = (
                "The alternative is rejected by a margin of %s character column(s), "
                "which is thin. If it were the true reading, the ticked ILOs on this "
                "page (%s) would be MCQ and OSPE rather than SAQ and MCQ."
                % (alt["marginColumns"] if alt else "n/a",
                   ", ".join(str(r["number"]) for r in page_rows if r["_ticks"]))
                if alt else "Only one tick column on this page.")
        page_reports.append(report)

        for row in page_rows:
            fmts = []
            for t in row["_ticks"]:
                c = min(cols, key=lambda c: abs(c - t))
                fmts.append(mapping[c])
            row["formats"] = sorted(set(fmts), key=FORMATS.index)
            row["testedByAnyListedFormat"] = bool(fmts)
            row["tickColumns"] = row.pop("_ticks")

    return title, mark_split, rows, page_reports, header


# ---------------------------------------------------------------------------

def unparsable(pages, sid):
    """A page nobody could parse must look different from a page with nothing
    on it. Empty means the extractor returned "". Unparsable means it returned
    characters that carry no readable content."""
    empty, hard = [], []
    for i, text in enumerate(pages, 1):
        if not text.strip():
            empty.append(i)
            continue
        words = re.findall(r"[A-Za-z]{3,}", text)
        if len(words) < 5:
            hard.append({
                "page": i,
                "wordsOfThreeOrMoreLetters": len(words),
                "sample": text.strip()[:160],
                "reason": UNPARSABLE_REASONS.get(
                    (sid, i),
                    "No reason recorded for this page. It was not one of the pages "
                    "inspected by hand when this table was written."),
            })
    return empty, hard


def main():
    check_only = "--check" in sys.argv

    patho = load_pages(PATHO)
    pharma = load_pages(PHARMA)
    orient = load_pages(ORIENT)

    patho_roots, patho_flat = build_tree("Pathology", PATHO_TREE, patho["pages"])
    pharma_roots, pharma_flat = build_tree("Pharmacology", PHARMA_TREE, pharma["pages"])

    patho_ilos = {
        "CHAPTER (1) CELLULAR RESPONSE TO INJURY": bullet_ilos(patho["pages"][2]),
        "CHAPTER (2) INTRACELLULAR ACCUMULATION AND EXTRACELLULAR DEPOSITIONS.":
            bullet_ilos(patho["pages"][9]),
    }
    pharma_ilos = {
        "General Pharmacology: “Introduction to Basic Principles of Drug Therapy”":
            numbered_ilos(pharma["pages"][1]),
    }
    for chapter, ilos in list(patho_ilos.items()) + list(pharma_ilos.items()):
        for node in patho_flat + pharma_flat:
            if node["title"] == chapter:
                node["ilos"] = ilos
                node["iloCount"] = len(ilos)

    patho_ch2 = next(n for n in patho_flat
                     if n["rawText"] == "INTRACELLULAR ACCUMULATION AND")

    title, mark_split, orows, preports, header = parse_orientation(orient["pages"])
    by_number = {r["number"]: r for r in orows}

    mapping = []
    for node_path, page, ilos, conf, basis in MAPPING:
        mapping.append({
            "subjectPath": "%s > Pharmacology > General Pharmacology: "
                           "“Introduction to Basic Principles of Drug Therapy” "
                           "> %s" % (MODULE, node_path),
            "bookNode": node_path,
            "page": page,
            "orientationIlos": ilos,
            "orientationIloFormats": {
                str(n): by_number[n]["formats"] for n in ilos if n in by_number},
            "confidence": conf,
            "basis": basis,
        })
    mapped = sorted({n for _, _, ns, _, _ in MAPPING for n in ns})

    patho_empty, patho_hard = unparsable(patho["pages"], PATHO)
    pharma_empty, pharma_hard = unparsable(pharma["pages"], PHARMA)
    orient_empty, orient_hard = unparsable(orient["pages"], ORIENT)

    def paths(sid):
        return sorted(r["corpusRelativePath"] for r in manifest_rows(sid))

    doc = {
        "module": MODULE,
        "generatedBy": "scripts/kasr/extract/108-INT/deptbook.py",
        "input": "scripts/kasr/extract/pagetext/<sourceId>.json (no PDF is opened)",
        "subjects": ["Pathology", "Pharmacology"],
        "subjectsBasis": "Declared by the two empty directories 108 INT/Pathology and "
                         "108 INT/Pharmacology in the corpus; assumption A-04 of "
                         "docs/medical-library-program/KASR-SOURCE-EXTRACTION-PLAN.md.",
        "pageNumbering": "Every `page` is a PHYSICAL PDF page, 1-based. Both books "
                         "print their own numbers one lower: physical page n carries "
                         "printed number n-1.",
        "headingLevels": {
            "1": "chapter, as the book numbers or titles it",
            "2": "subchapter — the level the subject tree stops at",
            "3": "section, kept because the orientation ILOs map onto it",
            "4": "sub-section, kept only where the book itself groups a list",
        },
        "contentsPages": {
            "checked": True,
            "finding": "Neither department book has a contents page, a list of "
                       "contents or an index. Both were searched for the words "
                       "CONTENTS / LIST OF CONTENTS / TABLE OF CONTENTS / INDEX and "
                       "for dotted-leader lines ending in a page number; there are no "
                       "hits in either book. (The word \"content\" appears in the "
                       "pharmacology book only inside body text, e.g. \"6- Gut "
                       "contents\" on page 6.) The pathology book opens directly onto "
                       "INTRODUCTION TO PATHOLOGY on physical page 1; the "
                       "pharmacology book's physical page 1 is a cover that OCR'd to "
                       "one character.",
            "consequence": "The chapter trees below are read from the pages "
                           "themselves. There is no contents page to check them "
                           "against, so completeness rests on a page-by-page sweep of "
                           "every heading-shaped line in both books rather than on the "
                           "book's own index.",
        },
        "manifestFindings": [
            {
                "sourceId": PHARMA,
                "field": "textLayer",
                "manifestSays": "native",
                "fileActuallyIs": "no usable text layer; extracted by OCR",
                "evidence": "Physical page 1 of Dpt book general pharma 108-2026.pdf "
                            "yields nothing to pdftotext. pagetext.py fell back to OCR "
                            "and its cache records mode \"ocr\" for this source while "
                            "the manifest row still reads textLayer \"native\".",
                "resolution": "The file wins. Every pharmacology string in this file is "
                              "OCR output and is treated as such. The manifest row "
                              "should be corrected to reflect that this book needed OCR.",
            },
            {
                "sourceIds": [PATHO, PHARMA],
                "field": "corpusRelativePath",
                "finding": "Each department book has two manifest rows under two "
                           "filenames with the same sha256 and the same sourceId. One "
                           "file, two names. Both paths are recorded below; the book is "
                           "counted once.",
            },
        ],
        "files": [
            {
                "sourceId": PATHO,
                "subject": "Pathology",
                "manifestRows": 2,
                "distinctFiles": 1,
                "paths": paths(PATHO),
                "mode": patho["mode"],
                "pagesRead": len(patho["pages"]),
                "headingsFound": sum(1 for n in patho_flat if n["found"]),
                "headingsRecorded": len(patho_flat),
                "headingsNotFoundOnClaimedPage": [
                    {"title": n["title"], "page": n["page"], "rawText": n["rawText"]}
                    for n in patho_flat if not n["found"]],
                "topLevelNodes": sum(1 for n in patho_flat if n["level"] == 1),
                "numberedChapters": sum(1 for n in patho_flat
                                        if n["level"] == 1 and n["title"].startswith("CHAPTER")),
                "topLevelNodesNote": "4 top-level nodes but only 2 numbered chapters: the "
                                     "book opens with an unnumbered INTRODUCTION TO "
                                     "PATHOLOGY and closes with an unnumbered References "
                                     "list.",
                "subchapterNodes": sum(1 for n in patho_flat if n["level"] == 2),
                "ilosFound": sum(len(v) for v in patho_ilos.values()),
                "ilosByChapter": {k: len(v) for k, v in patho_ilos.items()},
                "ocrUncertainHeadings": 0,
                "pagesThatExtractedToNothing": patho_empty,
                "pagesWithNothingParsable": patho_hard,
            },
            {
                "sourceId": PHARMA,
                "subject": "Pharmacology",
                "manifestRows": 2,
                "distinctFiles": 1,
                "paths": paths(PHARMA),
                "mode": pharma["mode"],
                "modeVsManifest": "manifest says native; file needed OCR (see "
                                  "manifestFindings)",
                "pagesRead": len(pharma["pages"]),
                "headingsFound": sum(1 for n in pharma_flat if n["found"]),
                "headingsRecorded": len(pharma_flat),
                "headingsNotFoundOnClaimedPage": [
                    {"title": n["title"], "page": n["page"], "rawText": n["rawText"]}
                    for n in pharma_flat if not n["found"]],
                "topLevelNodes": sum(1 for n in pharma_flat if n["level"] == 1),
                "numberedChapters": 0,
                "topLevelNodesNote": "The book has one chapter and does not number it. "
                                     "Its ILO block says \"After studying this chapter\", "
                                     "which is the only place the word chapter appears.",
                "subchapterNodes": sum(1 for n in pharma_flat if n["level"] == 2),
                "ilosFound": sum(len(v) for v in pharma_ilos.values()),
                "ilosByChapter": {k: len(v) for k, v in pharma_ilos.items()},
                "ocrUncertainHeadings": sum(1 for n in pharma_flat if n.get("ocrUncertain")),
                "headingGaps": PHARMA_HEADING_GAPS,
                "pagesThatExtractedToNothing": pharma_empty,
                "pagesWithNothingParsable": pharma_hard,
            },
            {
                "sourceId": ORIENT,
                "subject": "Pharmacology",
                "kind": "orientation ILO sheet",
                "manifestRows": 1,
                "distinctFiles": 1,
                "paths": paths(ORIENT),
                "mode": orient["mode"],
                "pagesRead": len(orient["pages"]),
                "headingsFound": 0,
                "headingsRecorded": 0,
                "headingsNote": "Not a book. It has a title line, a mark-split line and "
                                "one table, so it contributes no chapter headings.",
                "ilosFound": len(orows),
                "pagesThatExtractedToNothing": orient_empty,
                "pagesWithNothingParsable": orient_hard,
            },
        ],
        "books": [
            {
                "subject": "Pathology",
                "sourceId": PATHO,
                "bookTitle": None,
                "bookTitleReason": "The PDF has no title page. It opens straight onto "
                                   "\"INTRODUCTION TO PATHOLOGY\" on physical page 1, so "
                                   "no title is recorded rather than one invented from "
                                   "the filename.",
                "pages": len(patho["pages"]),
                "chapters": [strip_children(n) for n in patho_roots],
            },
            {
                "subject": "Pharmacology",
                "sourceId": PHARMA,
                "bookTitle": "General Pharmacology",
                "bookTitleSource": "Physical page 2, the line above the chapter title. "
                                   "Physical page 1 is a cover that OCR'd to one "
                                   "character.",
                "pages": len(pharma["pages"]),
                "chapters": [strip_children(n) for n in pharma_roots],
            },
        ],
        "orientation": {
            "sourceId": ORIENT,
            "subject": "Pharmacology",
            "title": title,
            "pages": len(orient["pages"]),
            "markSplit": mark_split,
            "headerRow": {"page": header["_page"],
                          "columns": {f: header[f] for f in FORMATS}} if header else None,
            "headerRowNote": "The SAQ/MCQ/OSPE header appears on page 1 only. Pages 2 "
                             "and 3 are continuation tables with no header, and their "
                             "columns do not line up with page 1's.",
            "columnDetection": preports,
            "iloCount": len(orows),
            "ilos": orows,
            "counts": {
                "total": len(orows),
                "SAQ": sum(1 for r in orows if "SAQ" in r["formats"]),
                "MCQ": sum(1 for r in orows if "MCQ" in r["formats"]),
                "OSPE": sum(1 for r in orows if "OSPE" in r["formats"]),
                "untestedByAnyListedFormat": sum(
                    1 for r in orows if not r["testedByAnyListedFormat"]),
                "untestedIloNumbers": [r["number"] for r in orows
                                       if not r["testedByAnyListedFormat"]],
            },
            "contradictions": [
                {
                    "what": "The header line allots OSPE 6 marks, but under the column "
                            "reading above no ILO on any page carries an OSPE tick.",
                    "whyItMatters": "Either the OSPE column was left unticked when the "
                                    "sheet was written, or the header-less pages 2-3 use "
                                    "the rightmost columns rather than the leftmost and "
                                    "ILOs 53-55 (classify routes, advantages and "
                                    "disadvantages of routes and dosage forms, route of "
                                    "administration of various dosage forms) are the "
                                    "OSPE ones. Those three read like an OSPE station, "
                                    "and the department book ends with a "
                                    "ROUTES OF DRUG ADMINISTRATION AND DOSAGE FORMS "
                                    "divider, which is why the alternative is recorded "
                                    "under columnDetection rather than dismissed.",
                    "resolvedHere": False,
                    "needsFaculty": True,
                },
            ],
        },
        "taxonomyGapEvidence": {
            "why": "Half of the pathology teaching in 108 INT is one chapter, and the "
                   "canonical taxonomy has been separately confirmed to have no node "
                   "anywhere for cellular accumulations or deposits: no match for "
                   "calcif, amyloid, hyalin, xanthom, accumul or deposit across all "
                   "1,883 nodes in all four views. This block states that chapter "
                   "exactly as the book prints it so it can be quoted as evidence "
                   "without anyone re-reading the PDF.",
            "chapter": {
                "subject": "Pathology",
                "sourceId": PATHO,
                "paths": paths(PATHO),
                "titleAsPrinted": patho_ch2["title"],
                "titlePrintedOverTwoLines": ["INTRACELLULAR ACCUMULATION AND",
                                             "EXTRACELLULAR DEPOSITIONS."],
                "titleNote": "The book prints DEPOSITIONS, plural, and ends the title "
                             "with a full stop. Anything citing this chapter as "
                             "\"EXTRACELLULAR DEPOSITION\" has silently singularised "
                             "it.",
                "startPage": patho_ch2["startPage"],
                "endPage": patho_ch2["endPage"],
                "pageRangeNote": "Physical PDF pages. The book prints these as 9 to 20.",
                "iloCount": len(patho_ch2.get("ilos", [])),
                "ilos": [i["text"] for i in patho_ch2.get("ilos", [])],
                "iloNote": "The book bullets these ILOs and does not number them, so "
                           "they are listed in the book's order with no numbers "
                           "attached.",
                "subchapters": [
                    {"title": c["title"], "startPage": c["startPage"],
                     "endPage": c["endPage"],
                     "sections": [g["title"] for g in c.get("children", [])]}
                    for c in patho_ch2.get("children", [])
                ],
                "unfilableSubjects": ["intracellular accumulations", "steatosis / fatty "
                                      "change", "hyaline change", "glycogen storage",
                                      "exogenous and endogenous pigments",
                                      "pathological calcification (dystrophic and "
                                      "metastatic)", "amyloidosis"],
            },
        },
        "chapterToOrientationIlos": {
            "Pathology": {
                "mappable": False,
                "reason": "There is no orientation ILO sheet for pathology in 108 INT. "
                          "The module's only orientation source is the General "
                          "Pharmacology sheet, so no pathology chapter can be mapped to "
                          "an orientation ILO without inventing the link. The pathology "
                          "chapters carry their own in-book ILOs and those are attached "
                          "to the chapters above.",
            },
            "Pharmacology": {
                "mappable": True,
                "mappings": mapping,
                "mappedIlos": mapped,
                "unmappedIlos": [{"number": n, "reason": r}
                                 for n, r in UNMAPPED_ORIENTATION_ILOS],
                "coverage": "%d of %d orientation ILOs map onto a book node."
                            % (len(mapped), len(orows)),
            },
        },
    }

    unmapped_numbers = [n for n, _ in UNMAPPED_ORIENTATION_ILOS]
    missing = [r["number"] for r in orows
               if r["number"] not in mapped and r["number"] not in unmapped_numbers]

    problems = []
    for name, flat in (("Pathology", patho_flat), ("Pharmacology", pharma_flat)):
        for n in flat:
            if not n["found"]:
                problems.append("%s: heading %r not on physical page %d"
                                % (name, n["rawText"], n["page"]))
    if len(orows) != 55:
        problems.append("orientation: parsed %d ILOs, expected 55" % len(orows))
    if mark_split is None:
        problems.append("orientation: the EOM/EOY mark-split line did not parse")
    if missing:
        problems.append("mapping: orientation ILOs %s are neither mapped nor explained"
                        % missing)
    for f in doc["files"]:
        for p in f["pagesWithNothingParsable"]:
            if p["reason"].startswith("No reason recorded"):
                problems.append("%s page %d yielded nothing and has no recorded reason"
                                % (f["sourceId"], p["page"]))
    doc["selfCheck"] = {"problems": problems, "ok": not problems}

    if not check_only:
        with open(OUT, "w", encoding="utf-8") as fh:
            json.dump(doc, fh, indent=2, ensure_ascii=False)
            fh.write("\n")
        print("wrote %s" % OUT)

    print("pathology  : %d headings (%d top-level, %d subchapters), %d ILOs"
          % (len(patho_flat), doc["files"][0]["topLevelNodes"],
             doc["files"][0]["subchapterNodes"], doc["files"][0]["ilosFound"]))
    print("pharmacology: %d headings (%d top-level, %d subchapters), %d ILOs, %d OCR-uncertain"
          % (len(pharma_flat), doc["files"][1]["topLevelNodes"],
             doc["files"][1]["subchapterNodes"], doc["files"][1]["ilosFound"],
             doc["files"][1]["ocrUncertainHeadings"]))
    print("orientation : %d ILOs  SAQ=%d MCQ=%d OSPE=%d untested=%s"
          % (len(orows), doc["orientation"]["counts"]["SAQ"],
             doc["orientation"]["counts"]["MCQ"],
             doc["orientation"]["counts"]["OSPE"],
             doc["orientation"]["counts"]["untestedIloNumbers"]))
    for p in problems:
        print("PROBLEM: %s" % p)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
