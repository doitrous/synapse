#!/usr/bin/env python3
"""The practical atlas and the written-question source for module 108 INT.

    python3 scripts/kasr/extract/108-INT/practical.py

Two files carry the practical side of 108 INT: the department's `Atlas of
Practical General Pathology` (12 pages, filed twice in the corpus under one
sha256) and a pharmacology file the corpus filed under `Written Questions`.
This script turns both into `108-INT/practical.json` — teaching items, the
images those items need but the repository does not have, and an honest count
of what every page yielded.

Neither source arrived usable, and the two ways they failed are the two things
a later reader most needs told.

The atlas's cached page text is not empty, it is *unreadable*: pdftotext
returns 6,075 glyphs across the 12 pages and every one of them decodes to
U+0001, because the embedded fonts carry no usable ToUnicode map. A parser
reading `pagetext/src_a2ffe25e8362fe840ceb.json` sees whitespace and would
conclude the atlas is blank. It is not blank — it is a scanned-and-relaid book
whose glyphs cannot be decoded, and the only way to read it is to rasterise the
pages and OCR them. This script therefore keeps its own OCR cache under
`108-INT/pagetext-ocr/` rather than trusting, or touching, the shared one.

The pharmacology file is not a question paper. It is named `PHARMA WRITTEN
Crash Kinetics Highlighted`, it sits in a `Written Questions` folder, and it
contains four pages of revision notes with no question on any of them: no
stem, no part, no mark, no interrogative. `05-questions.md` makes the rule
absolute — a written question may only be derived from an existing written
question, never from a textbook passage — so this script emits zero written
questions and records why, instead of manufacturing questions out of prose
that would look right and train a student for an exam nobody sets. What the
file does carry is 31 PDF highlight annotations, and those are captured
verbatim: the highlighting is the only importance signal the source supplies,
and it survives as annotation geometry even though it leaves no trace in the
text layer.

The item table below is a transcription, not a regex parse. The atlas prints
its captions inside bordered boxes beside photographs; OCR recovers the words
but not reliably the box boundaries, so a regex parser would silently mix a
caption into its neighbour. Every item was read off the rendered page and
typed out here, and the script then verifies each one against the OCR text: if
an anchor phrase stops appearing, the run says so in `verification` rather
than quietly emitting a stale record.

Failure mode: if `pdftoppm`/`tesseract` are missing, or the corpus PDFs are not
mounted at the manifest's `absolutePath`, the OCR cache cannot be built and the
run aborts with a message naming what was missing. Nothing is guessed.
"""
import json
import os
import re
import subprocess
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")
SHARED_PAGETEXT = os.path.join(REPO, "scripts/kasr/extract/pagetext")
OCR_CACHE = os.path.join(HERE, "pagetext-ocr")
HL_CACHE = os.path.join(HERE, "highlights")
OUT = os.path.join(HERE, "practical.json")

MODULE = "108 INT"
UNIVERSITY = "kau"
ATLAS = "src_a2ffe25e8362fe840ceb"
PHARMA = "src_9aecfa4812d20259fe5a"

# ---------------------------------------------------------------- manifest --

def manifest_rows():
    """Every 108 INT row for our two sources, keyed by sourceId.

    The atlas is filed twice under one sha256 — once in the module folder and
    once in the cross-module practical folder — so a source maps to a list of
    rows, not to one row. Filtering on universityId as well as moduleId is
    deliberate: the corpus also holds `PAT 108` files from MTI University, a
    different school whose module codes collide with Kasr Al Ainy's.
    """
    with open(MANIFEST, encoding="utf-8") as fh:
        rows = json.load(fh)["sources"]
    out = {}
    for row in rows:
        if row.get("moduleId") != MODULE or row.get("universityId") != UNIVERSITY:
            continue
        if row["sourceId"] in (ATLAS, PHARMA):
            out.setdefault(row["sourceId"], []).append(row)
    return out

# ------------------------------------------------------- the broken layer --

def shared_pagetext(source_id):
    path = os.path.join(SHARED_PAGETEXT, source_id + ".json")
    if not os.path.exists(path):
        return None
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def glyph_census(pages):
    """Why the cached atlas text is unusable, stated per page in numbers.

    U+0001 is what pdftotext emits for a glyph it cannot map to a character.
    Counting them separates 'this page is blank' from 'this page is full of
    text nobody can read', which are the same thing to a naive parser and
    opposite things to a human deciding whether to re-OCR.
    """
    census = []
    for i, text in enumerate(pages, 1):
        undecodable = text.count("\x01")
        readable = re.sub(r"[\s\x01\x0c]", "", text)
        census.append({
            "page": i,
            "undecodableGlyphs": undecodable,
            "readableCharacters": len(readable),
            "verdict": ("no text on the page" if undecodable == 0 and not readable
                        else "text present but no glyph decoded" if not readable
                        else "readable"),
        })
    return census

# -------------------------------------------------------------- OCR cache --

def tool_missing(*names):
    return [n for n in names if subprocess.run(["which", n], capture_output=True).returncode]


def ocr_page(pdf, page, dpi=300):
    with tempfile.TemporaryDirectory() as td:
        stub = os.path.join(td, "p")
        r = subprocess.run(["pdftoppm", "-f", str(page), "-l", str(page), "-r", str(dpi),
                            "-png", "-singlefile", pdf, stub], capture_output=True, timeout=300)
        png = stub + ".png"
        if r.returncode != 0 or not os.path.exists(png):
            return ""
        r = subprocess.run(["tesseract", png, "stdout", "-l", "eng", "--psm", "6"],
                           capture_output=True, timeout=420)
        return r.stdout.decode("utf-8", "replace")


def ocr_cache(source_id, pdf, pages, force=False):
    """Rasterise-and-OCR every page once, then reuse. Re-runs are free.

    Kept under 108-INT/ on purpose. The shared pagetext cache belongs to the
    101 pass and to every other lane reading it; rewriting an entry there to
    fix one broken file would change what four other extractors see.
    """
    os.makedirs(OCR_CACHE, exist_ok=True)
    path = os.path.join(OCR_CACHE, source_id + ".json")
    if os.path.exists(path) and not force:
        with open(path, encoding="utf-8") as fh:
            return json.load(fh)
    missing = tool_missing("pdftoppm", "tesseract")
    if missing:
        sys.exit("cannot build the OCR cache: %s not on PATH" % ", ".join(missing))
    if not os.path.exists(pdf):
        sys.exit("cannot build the OCR cache: %s is not mounted" % pdf)
    with ThreadPoolExecutor(max_workers=4) as pool:
        texts = list(pool.map(lambda p: ocr_page(pdf, p), range(1, pages + 1)))
    data = {"sourceId": source_id, "file": os.path.basename(pdf), "mode": "ocr",
            "dpi": 300, "psm": 6, "lang": "eng", "pages": texts,
            "why": "the native text layer decodes every glyph to U+0001",
            "emptyPages": [i for i, t in enumerate(texts, 1) if not t.strip()]}
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=1, ensure_ascii=False)
    return data

# ------------------------------------------------------------- highlights --

def highlight_cache(source_id, pdf, force=False):
    """The 31 highlight annotations, and the text each one covers.

    The brief asked whether the "Highlighted" in the filename survives into the
    text layer. It does not — pdftotext returns the same characters whether or
    not they are highlighted. But the highlights are real PDF annotations with
    quad geometry, so the covered text can be read back exactly. That is a
    recovered signal, not an inferred one.
    """
    os.makedirs(HL_CACHE, exist_ok=True)
    path = os.path.join(HL_CACHE, source_id + ".json")
    if os.path.exists(path) and not force:
        with open(path, encoding="utf-8") as fh:
            return json.load(fh)
    try:
        import pymupdf
    except ImportError:
        try:
            import fitz as pymupdf
        except ImportError:
            return {"sourceId": source_id, "available": False,
                    "reason": "PyMuPDF is not installed, so annotation geometry cannot be read; "
                              "the highlight spans are unrecovered, not absent."}
    if not os.path.exists(pdf):
        return {"sourceId": source_id, "available": False,
                "reason": "the PDF is not mounted at the manifest path"}
    doc = pymupdf.open(pdf)
    spans, other = [], {}
    for pno, page in enumerate(doc, 1):
        for annot in page.annots() or []:
            kind = annot.type[1]
            if kind != "Highlight":
                other[kind] = other.get(kind, 0) + 1
                continue
            quads = annot.vertices or []
            parts = []
            for i in range(0, len(quads), 4):
                rect = pymupdf.Quad(quads[i:i + 4]).rect
                chunk = page.get_textbox(rect).strip()
                if chunk:
                    parts.append(re.sub(r"\s+", " ", chunk))
            colour = annot.colors.get("stroke")
            spans.append({
                "page": pno,
                "index": len(spans) + 1,
                "colour": [round(c, 4) for c in colour] if colour else None,
                "text": " ".join(parts),
            })
    data = {"sourceId": source_id, "available": True, "highlightCount": len(spans),
            "otherAnnotationTypes": other, "spans": spans}
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=1, ensure_ascii=False)
    return data

# ------------------------------------------------------------ the atlas ----
# Transcribed from the rendered pages, verified against the OCR text by the
# `anchor` field. `page` is the PDF page; `printedPage` is the number the book
# prints on it, and the two disagree because this file is an extract.
#
# A field the book does not state is null and carries its own reason. The
# atlas names a stain exactly once (Prussian blue, with H&E named as the
# comparison); everywhere else it describes a colour — "homogenous pink",
# "blue basophilic" — which is a cue to a stain, not a statement of one, and
# is recorded under `stainEvidence` so a pathologist can decide.

NO_STAIN = "the caption names no stain"
NO_MAG = "the atlas prints no magnification on any plate"

ITEMS = [
    dict(
        itemId="INT108-PRAC-PATHO-S07", label="SLIDE (7)", number=7, delivery="numbered slide",
        title="Hyaline degeneration, spleen", page=6, printedPage=2,
        topic="Cellular accumulation and deposition", section="Practical histopathology",
        anchor="hyaline degeneration",
        depicts="Section from the spleen.",
        features=[
            "The splenic capsule and fibrous trabeculae show hyalinosis (thickened, structureless, homogenous pink).",
            "Hyaline degeneration (hyalinosis) of the central arterioles of lymphoid follicles.",
            "The arteriolar wall is thickened, and their lumen is narrowed.",
        ],
        diagnosis="Hyaline degeneration (hyalinosis), spleen.",
        stain=None, stainReason=NO_STAIN,
        stainEvidence="the caption calls the hyalinosis \"homogenous pink\", a colour cue only",
        preparation=None, preparationReason="the caption states no preparation",
        magnification=None, magnificationReason=NO_MAG,
        markers=["a leader line from the caption to the splenic capsule on the photograph"],
    ),
    dict(
        itemId="INT108-PRAC-PATHO-S09", label="SLIDE (9)", number=9, delivery="numbered slide",
        title="Fatty degeneration (steatosis), liver", page=6, printedPage=2,
        topic="Cellular accumulation and deposition", section="Practical histopathology",
        anchor="fatty degeneration",
        depicts="Section from the liver.",
        features=[
            "The hepatocytes are distended by empty cytoplasmic vacuoles which push the nucleus "
            "to one side giving the cell a signet ring appearance.",
            "The vacuole is the site of fat accumulating in the hepatocytes and dissolved in xylol "
            "and alcohol during the preparation of the paraffin section, leaving these empty vacuoles.",
        ],
        diagnosis="Fatty degeneration (steatosis), liver.",
        stain=None, stainReason=NO_STAIN,
        stainEvidence=None,
        preparation="paraffin section",
        preparationReason=None,
        magnification=None, magnificationReason=NO_MAG,
        markers=[],
    ),
    dict(
        itemId="INT108-PRAC-PATHO-DS01", label="DATA SHOW", number=None, delivery="data show",
        title="Traumatic fat necrosis", page=7, printedPage=3,
        topic="Cellular accumulation and deposition", section="Practical histopathology",
        anchor="traumatic fat",
        depicts="Section from adipose tissue.",
        features=[
            "Ghosts of fat cells surrounded by foamy macrophages (engulf the fat) and "
            "multinucleated giant cells.",
        ],
        diagnosis="Traumatic fat necrosis.",
        stain=None, stainReason=NO_STAIN, stainEvidence=None,
        preparation=None, preparationReason="the caption states no preparation",
        magnification=None, magnificationReason=NO_MAG,
        markers=[],
    ),
    dict(
        itemId="INT108-PRAC-PATHO-DS02", label="DATA SHOW", number=None, delivery="data show",
        title="Infarction, kidney", page=7, printedPage=3,
        topic="Cellular accumulation and deposition", section="Practical histopathology",
        anchor="infarction kidney",
        depicts="Section of kidney tissue.",
        features=[
            "A renal infarct with coagulative necrosis showing maintained architecture (arrow) "
            "and adjacent viable renal tissue.",
            "Inflammatory cells are present at its margin.",
        ],
        diagnosis="Renal infarction with coagulative necrosis.",
        stain=None, stainReason=NO_STAIN, stainEvidence=None,
        preparation=None, preparationReason="the caption states no preparation",
        magnification=None, magnificationReason=NO_MAG,
        markers=["an arrow on the photograph indicating the zone of maintained architecture"],
    ),
    dict(
        itemId="INT108-PRAC-PATHO-DS03", label="DATA SHOW", number=None, delivery="data show",
        title="Dystrophic calcification", page=8, printedPage=4,
        topic="Cellular accumulation and deposition", section="Practical histopathology",
        anchor="dystrophic calcification",
        depicts="Section in fibrotic tissue.",
        features=[
            "It showed dystrophic calcification and some inflammatory cells.",
            "Calcification is seen as blue basophilic deposition.",
            "Ragged and torn foci are noted due to difficult cutting by microtome knife.",
        ],
        diagnosis="Dystrophic calcification in fibrotic tissue.",
        stain=None, stainReason=NO_STAIN,
        stainEvidence="the caption calls the calcification \"blue basophilic\", a colour cue only",
        preparation=None,
        preparationReason="the caption states no preparation, but notes microtome tearing at the "
                          "calcified foci, which implies a cut section",
        magnification=None, magnificationReason=NO_MAG,
        markers=[],
    ),
    dict(
        itemId="INT108-PRAC-PATHO-DS04", label="DATA SHOW", number=None, delivery="data show",
        title="Prussian blue — hepatic haemochromatosis", page=8, printedPage=4,
        topic="Cellular accumulation and deposition", section="Practical histopathology",
        anchor="prussian blue",
        depicts="Section in hepatic hemochromatosis.",
        features=[
            "In Prussian Blue stained section, the cells show blue stained hemosiderin pigments.",
            "In H&E section, these pigments appear brown.",
        ],
        diagnosis="Hepatic haemochromatosis — haemosiderin deposition.",
        stain="Prussian blue, with H&E named as the comparison section",
        stainReason=None,
        stainEvidence="the only plate in the extract that names its stain",
        preparation=None, preparationReason="the caption states no preparation",
        magnification=None, magnificationReason=NO_MAG,
        markers=[],
    ),
    dict(
        itemId="INT108-PRAC-PATHO-C18-1", label="C18-1", number=None, delivery="gross specimen",
        title="Brown atrophy of the heart", page=10, printedPage=23,
        topic="Cellular accumulation and deposition", section="Gross surgical pathology",
        anchor="c18-1",
        depicts="Heart with open left side.",
        features=[
            "Heart is reduced in size (compare to the size of the aorta).",
            "The myocardium is dark brown.",
            "Coronaries (seen at the outer surface) are tortuous.",
            "Pericardial fat is replaced by serous tissue (serous atrophy of fat).",
            "Aorta shows yellow atherosclerotic patches.",
        ],
        diagnosis="1. Brown atrophy of the heart and serous atrophy of pericardial fat. "
                  "2. Aortic atherosclerosis.",
        stain=None, stainReason="a gross specimen is not stained", stainEvidence=None,
        preparation="museum specimen — the preface records the Cairo University pathology museum "
                    "of about 1400 specimens as the source of the gross material",
        preparationReason=None,
        magnification=None, magnificationReason="a gross specimen has no magnification",
        markers=["the plate is headed with the specimen code \"C18-1\"",
                 "three pink arrows on the photograph, labelled \"Aorta\", "
                 "\"Serous atrophy of fat\" and \"Deep brown myocardium\""],
    ),
    dict(
        itemId="INT108-PRAC-PATHO-C19-1", label="C19-1", number=None, delivery="gross specimen",
        title="Fatty change of the heart (tabby cat)", page=10, printedPage=23,
        topic="Cellular accumulation and deposition", section="Gross surgical pathology",
        anchor="c19-1",
        depicts="Heart with open chambers.",
        features=[
            "The myocardium is yellow in color. The Columnae Carnae show brown dots alternating "
            "with yellow ones (Tabby cat appearance).",
            "The left ventricle shows hypertrophy and dilatation.",
            "The aorta and mitral valve shows yellow atherosclerotic patches.",
        ],
        diagnosis="1. Fatty change of the heart (Tabby cat). 2. Hypertrophy and dilatation of "
                  "right ventricle. 3. Atherosclerosis of aorta and mitral valve.",
        stain=None, stainReason="a gross specimen is not stained", stainEvidence=None,
        preparation="museum specimen", preparationReason=None,
        magnification=None, magnificationReason="a gross specimen has no magnification",
        markers=["printed labels on the plate: \"Aorta\", \"Yellow atherosclerosis\", "
                 "\"Tabby cat appearance\", \"L.V.\""],
        defect="The description says the LEFT ventricle is hypertrophied and dilated; the "
               "diagnosis under it says the RIGHT ventricle. The plate's own label reads "
               "\"L.V.\". One of the two lines is wrong in the book and a pathologist must "
               "decide which before this specimen is published. The diagnosis list also ends "
               "with an empty numbered item \"4.\" — a fourth diagnosis was intended and never "
               "written. Both defects are in the source, not in the OCR: they were confirmed "
               "against the rendered page.",
    ),
    dict(
        itemId="INT108-PRAC-PATHO-D105-2", label="D105-2", number=None, delivery="gross specimen",
        title="Liver steatosis (fatty change)", page=11, printedPage=24,
        topic="Cellular accumulation and deposition", section="Gross surgical pathology",
        anchor="d105-2",
        depicts="Slice of liver.",
        features=[
            "Cut surface of the liver slice shows diffuse yellow coloration.",
            "The borders are rounded indicating soft consistency.",
        ],
        diagnosis="Liver steatosis (fatty change).",
        stain=None, stainReason="a gross specimen is not stained", stainEvidence=None,
        preparation="museum specimen", preparationReason=None,
        magnification=None, magnificationReason="a gross specimen has no magnification",
        markers=["printed labels on the plate: \"Yellow color\", \"Round border\""],
    ),
    dict(
        itemId="INT108-PRAC-PATHO-S10-1", label="S10-1", number=None, delivery="gross specimen",
        title="Subcutaneous fibroma with dystrophic calcification", page=11, printedPage=24,
        topic="Cellular accumulation and deposition", section="Gross surgical pathology",
        # Not "s10-1": tesseract reads the specimen code's S as a dollar sign,
        # so the anchor is taken from the caption body instead.
        anchor="sectioned tumor mass",
        depicts="Sectioned tumor mass.",
        features=[
            "The tumor mass is rounded and capsulated.",
            "Cut section of the mass is grayish white and shows granular chalky white foci of "
            "calcification.",
        ],
        diagnosis="Subcutaneous fibroma with dystrophic calcification.",
        stain=None, stainReason="a gross specimen is not stained", stainEvidence=None,
        preparation="museum specimen", preparationReason=None,
        magnification=None, magnificationReason="a gross specimen has no magnification",
        markers=["printed labels on the plate: \"Fibrous capsule\", \"Chalky white calcification\""],
    ),
]

# Pages that teach a method rather than a specimen. Recorded because a reader
# counting items would otherwise see pages 5 and 9 in the "yielded nothing"
# column, which would be false — they yielded the examination scheme the whole
# practical is graded against.
GUIDANCE = [
    dict(itemId="INT108-PRAC-PATHO-INTRO-HISTO", page=5, printedPage=1, anchor="practical histopathology",
         title="Practical histopathology — introduction",
         body=["Steps to examine a histopathology slide are: naked eye examination before looking "
               "into microscope; low power examination to identify tissue type, lesion and pattern; "
               "high power to determine specific cellular features.",
               "For microscopic description of slides: Section in ....... (Tissue?); Lesion "
               "(Pattern, cells, fibers, blood vessels).",
               "Final diagnosis includes pathological lesion and organ."]),
    dict(itemId="INT108-PRAC-PATHO-INTRO-GROSS", page=9, printedPage=22, anchor="gross surgical pathology",
         title="Gross surgical pathology — introduction",
         body=["To make a pathological diagnosis, we should first identify and describe the lesion.",
               "Gross educational specimens can be in jars or fresh samples. For gross description, "
               "we comment on: Specimen; Size (normal, increased or decreased); Shape; Surface "
               "(smooth, irregular, nodular); Consistency in fresh specimens (hard, firm, soft) / "
               "Borders in jars (round, sharp); Cut surface (color, cavity, cyst, mass).",
               "Final diagnosis includes pathological lesion and organ."]),
]

FRONT_MATTER = {
    1: "Cover — \"ATLAS OF PRACTICAL GENERAL PATHOLOGY, Modules INT-108 & INT-208, "
       "For Medical Students, Faculty of Medicine Cairo University, 2025-2026\".",
    2: "Title page, repeating the cover.",
    3: "Preface. States that the atlas shows histopathology slides and gross pictures; that some "
       "slides are provided as glass slides for the microscope and others demonstrated as a data "
       "show (DS) slide or picture; that most pictures are original departmental pictures and "
       "\"only few pictures are downloaded from websites\"; and that the museum, begun by the late "
       "Prof. Anwar Mahfouz Elwi (chair 1962-1973), holds around 1400 specimens.",
    4: "Acknowledgements — the histology and gross contributor lists, revised by Prof. Dr Ahmed "
       "Abdel Aziz.",
}

# ------------------------------------------------------- media requests ----
# One request per item, because in this extract no two items share a subject.
# Every one is `required`: a practical station asks the student to identify the
# specimen, and the caption is the answer key, so an item without its image is
# an answer with no question.

MEDIUM_TO_KIND = {"micrograph": "histology", "gross specimen": "clinical photograph",
                  "diagram": "diagram", "radiograph": "imaging example"}

MICRO_SOURCE = ("An original section photographed by the pathology department, Cairo University, "
                "or an openly licensed histopathology teaching collection.")
GROSS_SOURCE = ("An original photograph of the numbered museum specimen held by the pathology "
                "department, Cairo University, or an openly licensed gross-pathology atlas.")
RIGHTS = ("Must be CC-BY, CC0 or public domain, or carry written departmental permission. The "
          "atlas's own preface admits that a few of its pictures were downloaded from websites, "
          "so nothing may be traced back to this PDF and re-hosted without a licence check. "
          "Record the licence and the photographer before release.")

MEDIA = [
    dict(item="INT108-PRAC-PATHO-S07", medium="micrograph",
         brief="Micrograph of spleen in which the capsule and a fibrous trabecula are both in "
               "frame and visibly thickened and structureless, together with a lymphoid follicle "
               "whose central arteriole shows a thickened wall and a narrowed lumen.",
         mustShow=["splenic capsule showing hyalinosis", "fibrous trabecula showing hyalinosis",
                   "lymphoid follicle", "central arteriole with thickened wall and narrowed lumen"],
         priority="required",
         why="The station asks the student to identify the lesion and the organ from the section. "
             "There is no text on the stem to read the answer off."),
    dict(item="INT108-PRAC-PATHO-S09", medium="micrograph",
         brief="Micrograph of liver in which hepatocytes are distended by large empty cytoplasmic "
               "vacuoles with the nucleus displaced to one side, so the signet-ring appearance is "
               "unmistakable at the printed size.",
         mustShow=["hepatocytes with empty cytoplasmic vacuoles", "nuclei pushed to one side "
                   "(signet ring appearance)", "adjacent unaffected hepatocytes for contrast"],
         priority="required",
         why="Identify-the-lesion station; the empty vacuole is the whole teaching point and "
             "cannot be described into existence."),
    dict(item="INT108-PRAC-PATHO-DS01", medium="micrograph",
         brief="Micrograph of adipose tissue showing ghost outlines of dead fat cells ringed by "
               "foamy macrophages, with at least one multinucleated giant cell in the same field.",
         mustShow=["ghosts of fat cells", "foamy macrophages", "multinucleated giant cells"],
         priority="required",
         why="Identify-the-lesion station. The three named cell types are the mark scheme."),
    dict(item="INT108-PRAC-PATHO-DS02", medium="micrograph",
         brief="Micrograph of kidney containing both infarcted and viable tissue in one field, so "
               "the preserved outlines of coagulative necrosis can be compared directly with the "
               "living parenchyma beside them, with the inflammatory margin included.",
         mustShow=["zone of coagulative necrosis with maintained architecture",
                   "adjacent viable renal tissue", "inflammatory cells at the margin",
                   "room for an arrow marker over the necrotic zone"],
         priority="required",
         why="Identify-the-lesion station. The atlas's caption points at the necrotic zone with an "
             "arrow, so the replacement image must leave that marker placeable."),
    dict(item="INT108-PRAC-PATHO-DS03", medium="micrograph",
         brief="Micrograph of fibrotic tissue carrying basophilic calcific deposits, with the "
               "characteristic ragged tearing at the calcified foci left visible rather than "
               "cropped out.",
         mustShow=["basophilic (blue) calcific deposits", "surrounding fibrous tissue",
                   "inflammatory cells", "ragged / torn foci from microtome cutting"],
         priority="required",
         why="Identify-the-lesion station, and the tearing artefact is itself examinable — the "
             "caption explains it, so the image must contain it."),
    dict(item="INT108-PRAC-PATHO-DS04", medium="micrograph",
         brief="Paired plate of the same haemochromatotic liver: one Prussian-blue section in "
               "which the haemosiderin is blue, and one H&E section of comparable field in which "
               "the same pigment is brown. One image of the pair alone teaches half the caption.",
         mustShow=["blue haemosiderin granules in the Prussian-blue section",
                   "brown haemosiderin granules in the H&E section",
                   "hepatocytes in both sections"],
         priority="required",
         why="Identify-the-stain-and-the-pigment station. The caption's teaching point is the "
             "colour change between the two stains, which needs both sections in the plate."),
    dict(item="INT108-PRAC-PATHO-C18-1", medium="gross specimen",
         brief="Photograph of a heart opened on the left side, framed with the aorta in shot so "
               "the reduced cardiac size can be judged against it, showing dark brown myocardium, "
               "tortuous surface coronaries and pericardial fat replaced by gelatinous serous tissue.",
         mustShow=["dark brown myocardium", "heart small relative to the aorta in the same frame",
                   "tortuous coronary arteries on the outer surface",
                   "serous atrophy of pericardial fat", "yellow atherosclerotic patches on the aorta"],
         priority="required",
         why="Identify-the-specimen station. Every one of the five gross findings is read off the "
             "photograph; the size judgement in particular fails if the aorta is cropped out."),
    dict(item="INT108-PRAC-PATHO-C19-1", medium="gross specimen",
         brief="Photograph of a heart with the chambers opened, showing yellow myocardium and "
               "columnae carneae mottled with alternating brown and yellow bands (tabby cat "
               "striping), with the aorta and mitral valve in frame.",
         mustShow=["yellow myocardium", "brown-and-yellow banded columnae carneae (tabby cat)",
                   "hypertrophied and dilated ventricle, labelled to match whichever side the "
                   "department confirms", "yellow atherosclerotic patches on aorta and mitral valve"],
         priority="required",
         why="Identify-the-specimen station. Note the source contradicts itself on left versus "
             "right ventricle; do not caption the sourced photograph until that is resolved."),
    dict(item="INT108-PRAC-PATHO-D105-2", medium="gross specimen",
         brief="Photograph of a liver slice whose cut surface is diffusely yellow, taken from an "
               "angle that keeps the rounded border of the slice visible, since the border is the "
               "evidence of soft consistency.",
         mustShow=["diffusely yellow cut surface", "rounded border of the slice"],
         priority="required",
         why="Identify-the-specimen station. Both gross findings are visual and neither is "
             "recoverable from the caption alone."),
    dict(item="INT108-PRAC-PATHO-S10-1", medium="gross specimen",
         brief="Photograph of a sectioned rounded encapsulated soft-tissue tumour with a greyish "
               "white cut surface bearing granular chalky white calcific foci, with the capsule "
               "visible around the circumference.",
         mustShow=["rounded capsulated mass", "fibrous capsule", "greyish white cut surface",
                   "granular chalky white foci of calcification"],
         priority="required",
         why="Identify-the-specimen station; the diagnosis is made from the capsule plus the "
             "chalky foci."),
]

# ------------------------------------------------------------------ build --

def norm(text):
    return re.sub(r"\s+", " ", text).lower()


def verify(items, ocr_pages):
    """Every transcribed item must still be findable on the page it claims.

    A transcription that nobody re-checks rots the first time a source is
    re-exported. This turns that rot into a visible failure.
    """
    results = []
    for it in items:
        page_text = norm(ocr_pages[it["page"] - 1]) if it["page"] <= len(ocr_pages) else ""
        results.append({"itemId": it["itemId"], "page": it["page"], "anchor": it["anchor"],
                        "found": it["anchor"] in page_text})
    return results


def main():
    force = "--force" in sys.argv[1:]
    rows = manifest_rows()
    for sid in (ATLAS, PHARMA):
        if sid not in rows:
            sys.exit("manifest has no %s row for %s under universityId=%s" % (MODULE, sid, UNIVERSITY))

    atlas_rows, pharma_rows = rows[ATLAS], rows[PHARMA]
    atlas_pdf = atlas_rows[0]["absolutePath"]
    pharma_pdf = pharma_rows[0]["absolutePath"]

    atlas_native = shared_pagetext(ATLAS)
    pharma_native = shared_pagetext(PHARMA)
    if atlas_native is None or pharma_native is None:
        sys.exit("the shared pagetext cache is missing one of the two sources")

    census = glyph_census(atlas_native["pages"])
    atlas_ocr = ocr_cache(ATLAS, atlas_pdf, atlas_rows[0]["pageCount"], force=force)
    highlights = highlight_cache(PHARMA, pharma_pdf, force=force)

    ocr_pages = atlas_ocr["pages"]
    checks = verify(ITEMS + GUIDANCE, ocr_pages)
    failed = [c for c in checks if not c["found"]]

    provenance = lambda it, sid, subject: dict(
        sourceId=sid, page=it["page"], moduleId=MODULE, universityId=UNIVERSITY,
        subject=subject, sourcePageLabel=it.get("printedPage"),
        sourceItemLabel=it.get("label"), sourceItemNumber=it.get("number"))

    items = []
    for it in ITEMS:
        rec = dict(it)
        rec.pop("anchor")
        rec["kind"] = "gross specimen" if it["delivery"] == "gross specimen" else "microscopic slide"
        rec["provenance"] = provenance(it, ATLAS, "Pathology")
        items.append(rec)

    guidance = []
    for it in GUIDANCE:
        rec = dict(it)
        rec.pop("anchor")
        rec["kind"] = "method guidance"
        rec["provenance"] = provenance(it, ATLAS, "Pathology")
        guidance.append(rec)

    by_item = {it["itemId"]: it for it in ITEMS}
    media = []
    for i, m in enumerate(MEDIA, 1):
        src = by_item[m["item"]]
        media.append(dict(
            requestId="INT108-MEDIA-%02d" % i,
            ownerKind="practical", ownerItemId=m["item"],
            label=src["title"],
            medium=m["medium"],
            mediaRequestMedium="image",
            kind=MEDIUM_TO_KIND[m["medium"]],
            brief=m["brief"],
            purpose=m["why"],
            stain=src["stain"],
            stainNote=src["stainReason"] or src["stainEvidence"],
            magnification=src["magnification"],
            magnificationNote=src["magnificationReason"],
            structures=m["mustShow"],
            priority=m["priority"],
            status="needed",
            sourceDirection=MICRO_SOURCE if m["medium"] == "micrograph" else GROSS_SOURCE,
            rights=RIGHTS,
            dependsOn=[{"file": atlas_rows[0]["fileName"], "page": src["page"],
                        "printedPage": src["printedPage"]}],
            provenance=dict(sourceId=ATLAS, page=src["page"], moduleId=MODULE,
                            universityId=UNIVERSITY, subject="Pathology",
                            sourceItemLabel=src["label"]),
        ))

    # How much of the book this file is. Every number below is read off the
    # printed page numbers and the printed slide numbers, not estimated from
    # the PDF's length, because the PDF's length is an artefact of whoever
    # made the excerpt.
    printed = {5: 1, 6: 2, 7: 3, 8: 4, 9: 22, 10: 23, 11: 24}
    held = sorted(printed.values())
    gap = [n for n in range(min(held), max(held)) if n not in held]
    teaching_pages = sorted({it["printedPage"] for it in ITEMS})
    per_page = len(ITEMS) / len(teaching_pages)
    # printed 1 and 22 are the two section introductions, so histopathology
    # teaching runs printed 2-21 and gross teaching runs printed 23 onward.
    histo_teaching_total = 21 - 2 + 1
    histo_est = int(histo_teaching_total * per_page)
    coverage = {
        "printedPagesHeld": held,
        "printedPagesMissing": gap,
        "printedPagesMissingCount": len(gap),
        "pdfToPrintedPageMap": {str(k): v for k, v in printed.items()},
        "unnumberedPdfPages": [1, 2, 3, 4, 12],
        "teachingPagesHeld": teaching_pages,
        "itemsPerTeachingPage": per_page,
        "itemsHeld": len(ITEMS),
        "numberedSlidesSeen": sorted({it["number"] for it in ITEMS if it["number"]}),
        "estimatedHistopathologyItems": histo_est,
        "estimatedTotalItems": "at least %d" % (histo_est + len(
            [i for i in ITEMS if i["section"] == "Gross surgical pathology"])),
        "estimatedCoverage": "%d of at least %d, about %d%%" % (
            len(ITEMS), histo_est + 4, round(100 * len(ITEMS) / (histo_est + 4))),
        "howEstimated":
            "The printed page numbers run 1, 2, 3, 4 then 22, 23, 24 — so printed pages 5 to 21 "
            "(%d pages) are absent from this file entirely, and the book carries on past printed "
            "24 by an unknown amount. Printed 1 and 22 are the two section introductions; the "
            "five teaching pages held (printed %s) carry exactly two items each, with no "
            "exceptions, which is what makes the per-page rate safe to project. Applying it to "
            "the %d histopathology teaching pages (printed 2-21) gives roughly %d "
            "histopathology items against the 6 held. The gross section cannot be projected at "
            "all: it begins at printed 23 and this file stops at 24, so its true length is "
            "unknown and the totals below are floors, not estimates."
            % (len(gap), ", ".join(str(n) for n in teaching_pages),
               histo_teaching_total, histo_est),
        "whatToAskTheFacultyFor":
            "The complete Atlas of Practical General Pathology for INT-108 & INT-208 — "
            "specifically printed pages 5-21 and everything after printed page 24.",
    }

    # Pages that produced no item, each with a sample so "empty" can be told
    # from "the parser missed it".
    claimed = {it["page"] for it in ITEMS} | {it["page"] for it in GUIDANCE}
    silent = []
    for p in range(1, atlas_rows[0]["pageCount"] + 1):
        if p in claimed:
            continue
        text = ocr_pages[p - 1] if p <= len(ocr_pages) else ""
        sample = re.sub(r"\s+", " ", text).strip()[:280]
        silent.append({
            "page": p,
            "reason": ("front matter, not a teaching item" if p in FRONT_MATTER else
                       "full-page photographs with no caption anywhere on the page"),
            "detail": FRONT_MATTER.get(p, "The page is a montage of gross photographs. The native "
                                          "text layer holds zero glyphs here — the only page in "
                                          "the file of which that is true — and OCR of the "
                                          "rendered page returns nothing but noise read off the "
                                          "photographs themselves. There is no caption to lose, "
                                          "so the specimens on this page cannot be identified "
                                          "from this file and are not guessed at."),
            "ocrSample": sample,
            "ocrCharacters": len(sample),
            "nativeUndecodableGlyphs": census[p - 1]["undecodableGlyphs"],
        })

    pharma_pages = pharma_native["pages"]
    written_note = (
        "Zero written questions. The file is named \"PHARMA WRITTEN Crash Kinetics Highlighted\" "
        "and the corpus files it under `Written Questions`, but its four pages contain no "
        "question of any kind: a scan of the full text layer finds no question number, no "
        "\"Give/Mention/Enumerate/Compare/Discuss/Define\" instruction, no mark allocation and no "
        "model answer; the only \"?\" characters in the file are the three in the authors' own "
        "aside \"4. pH within the gut:???\". What the file actually is, is a three-column crash "
        "revision summary of General Pharmacology \"Kinetics\" — absorption, distribution, "
        "metabolism, excretion, first-pass effects, Vd, order kinetics, t1/2, loading and "
        "maintenance dose — signed \"YAS\" in the corner of page 1. "
        "`Instruction Manual for Content Creation/05-questions.md` makes the rule absolute: a "
        "written question may only be derived from an existing written question, never from a "
        "textbook passage. Turning these notes into questions would produce items that look "
        "right and train a student for an exam nobody set, so none were written. The prose is "
        "worth importing — as notes or as concepts — but that is a different extractor's job.")

    hl_note = (
        "The filename promises highlighting and the text layer does not carry it: pdftotext "
        "returns identical characters whether or not a run is highlighted, so a reader of "
        "`pagetext/%s.json` alone would have to report the signal lost. It is not lost, and it "
        "is not one thing either. Rendering all four pages and looking at them shows TWO "
        "separate highlighting mechanisms, and only one of them is recoverable here.\n\n"
        "(1) Baked-in shading from the original .docx — yellow behind headings and behind "
        "individual claims, plus green and pink block tints and pink/yellow table-column tints. "
        "It is on all four pages and it is the document's own typography. It is not an "
        "annotation: it is drawn into the page content, so nothing below captures it. Page 1 is "
        "shaded this way and carries no annotation at all, which means a tool that reads only "
        "annotations will report page 1 as unhighlighted when in fact it is the page whose "
        "highlighting is purely baked in.\n\n"
        "(2) %d cyan PDF highlight annotations added over the top by a reader, on pages 2, 3 and "
        "4 only, all in one colour, accompanied by freehand Ink ticks. These ARE recoverable: "
        "the text each one covers has been read back through the annotation quad geometry and "
        "is recorded verbatim below.\n\n"
        "What the cyan marks, judged from the rendered pages, is whole self-contained topic "
        "blocks and definitions — Bioavailability, First pass effects, Factors affecting "
        "distribution, Passage across the BBB, Apparent volume of distribution, Plasma "
        "half-life, Loading dose, Maintenance dose. It marks neither individual key terms nor "
        "mark-scheme points, and it cannot mark answers, because the file contains no questions. "
        "It reads as one reader's revision emphasis: these are the blocks worth learning. That "
        "makes it useful for ranking topics and useless as `Expects:` lines, which have to hang "
        "off a question that exists. Nothing in the file says who highlighted it or why."
        % (PHARMA, highlights.get("highlightCount", 0)))

    doc = {
        "moduleId": MODULE,
        "universityId": UNIVERSITY,
        "yearId": "KAU_Y1",
        "subjects": ["Pathology", "Pharmacology"],
        "contentClass": "practical",
        "generatedBy": "scripts/kasr/extract/108-INT/practical.py",
        "reRunCommand": "python3 scripts/kasr/extract/108-INT/practical.py",
        "readsFrom": {
            "manifest": "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json",
            "sharedPageText": "scripts/kasr/extract/pagetext/ (read only, never written)",
            "ownOcrCache": "scripts/kasr/extract/108-INT/pagetext-ocr/",
            "ownHighlightCache": "scripts/kasr/extract/108-INT/highlights/",
        },
        "sources": [
            {
                "sourceId": ATLAS,
                "sha256": atlas_rows[0]["sha256"],
                "title": "Atlas of Practical General Pathology, Modules INT-108 & INT-208, "
                         "Faculty of Medicine Cairo University, 2025-2026",
                "subject": "Pathology",
                "category": "Practical",
                "pages": atlas_rows[0]["pageCount"],
                "filedTwice": True,
                "paths": [{"corpusRelativePath": r["corpusRelativePath"],
                           "fileName": r["fileName"],
                           "crossModulePractical": r["crossModulePractical"]} for r in atlas_rows],
                "note": "One file, two shelves: the module's own Practical folder and the "
                        "year-wide PRACTICAL FIRST YEAR/PATHOLOGY folder. Same sha256, same "
                        "sourceId, one set of records here. The second row is the one flagged "
                        "crossModulePractical.",
                "isExtract": True,
                "extractNote": "The 12 PDF pages carry printed page numbers 1, 2, 3, 4 then 22, "
                               "23, 24. The book itself is longer and this file is an excerpt of "
                               "it: the start of the histopathology section and the start of the "
                               "gross section. The slide numbering agrees — the histology plates "
                               "present are SLIDE (7) and SLIDE (9), so slides 1-6 and 8 are in "
                               "pages nobody has supplied. Do not read the counts below as the "
                               "practical's full syllabus.",
            },
            {
                "sourceId": PHARMA,
                "sha256": pharma_rows[0]["sha256"],
                "title": "PHARMA WRITTEN Crash Kinetics Highlighted . 2026",
                "subject": "Pharmacology",
                "category": "Written Questions",
                "pages": pharma_rows[0]["pageCount"],
                "filedTwice": False,
                "paths": [{"corpusRelativePath": r["corpusRelativePath"],
                           "fileName": r["fileName"],
                           "crossModulePractical": r["crossModulePractical"]} for r in pharma_rows],
                "note": "Filed as Written Questions; is not written questions. See "
                        "writtenQuestionsNote.",
            },
        ],
        "files": [
            {
                "file": atlas_rows[0]["fileName"],
                "sourceId": ATLAS,
                "pages": atlas_rows[0]["pageCount"],
                "pagesRead": len(ocr_pages),
                "method": "ocr at 300 dpi, psm 6, eng",
                "whyNotNative": "The manifest calls the text layer `native` and pdftotext does "
                                "return %d glyphs, but every one of them decodes to U+0001: the "
                                "embedded fonts carry no usable ToUnicode map. The cached text is "
                                "%d whitespace and control characters and zero readable ones. "
                                "That is why this lane keeps its own OCR cache."
                                % (sum(c["undecodableGlyphs"] for c in census),
                                   sum(len(p) for p in atlas_native["pages"])),
                "nativeGlyphCensus": census,
                "teachingItemsFound": len(ITEMS),
                "guidanceItemsFound": len(GUIDANCE),
                "mediaRequestsRaised": len(media),
                "writtenQuestionsFound": 0,
                "pagesYieldingNoItem": silent,
                "pagesYieldingNoItemCount": len(silent),
                "coverage": coverage,
            },
            {
                "file": pharma_rows[0]["fileName"],
                "sourceId": PHARMA,
                "pages": pharma_rows[0]["pageCount"],
                "pagesRead": len(pharma_pages),
                "method": "native text layer from the shared pagetext cache, plus PDF annotation "
                          "geometry for the highlights",
                "teachingItemsFound": 0,
                "writtenQuestionsFound": 0,
                "highlightSpansFound": highlights.get("highlightCount", 0),
                "pagesYieldingNoItem": [
                    {"page": i,
                     "reason": "revision prose, not questions — nothing here is extractable as a "
                               "written question without inventing it",
                     "detail": "%d characters of readable text, %d highlight spans."
                               % (len(re.sub(r"\s+", "", pharma_pages[i - 1])),
                                  sum(1 for s in highlights.get("spans", []) if s["page"] == i)),
                     "ocrSample": re.sub(r"\s+", " ", pharma_pages[i - 1]).strip()[:280]}
                    for i in range(1, len(pharma_pages) + 1)],
                "pagesYieldingNoItemCount": len(pharma_pages),
            },
        ],
        "frontMatter": [{"page": p, "sourceId": ATLAS, "description": d}
                        for p, d in sorted(FRONT_MATTER.items())],
        "guidance": guidance,
        "items": items,
        "mediaRequests": media,
        "mediaRequestSummary": {
            "total": len(media),
            "byMedium": {m: sum(1 for r in media if r["medium"] == m)
                         for m in sorted({r["medium"] for r in media})},
            "byPriority": {p: sum(1 for r in media if r["priority"] == p)
                           for p in sorted({r["priority"] for r in media})},
            "note": "Every request is `required` because every item is an identify-this station: "
                    "the caption in the atlas is the answer key, so an item shipped without its "
                    "image is an answer with no question. Nothing here is `optional` — there is "
                    "no schematic or redrawable diagram anywhere in the extract, and no item "
                    "whose teaching point survives in prose.",
            "destinationFiles": ["docs/Kasr-Source-Imports/media-requests/108-INT-media-audit.md",
                                 "docs/Kasr-Source-Imports/media-requests/"
                                 "108-INT-practical-media-requests.md"],
        },
        "writtenQuestions": [],
        "writtenQuestionsNote": written_note,
        "writtenSourceEmphasis": {
            "sourceId": PHARMA,
            "note": hl_note,
            "available": highlights.get("available", False),
            "highlightCount": highlights.get("highlightCount", 0),
            "otherAnnotationTypes": highlights.get("otherAnnotationTypes", {}),
            "otherAnnotationNote": "The file also carries freehand Ink annotations — someone's pen "
                                   "marks over the printed notes. Their geometry is recoverable "
                                   "but they cover no text, so there is nothing to transcribe and "
                                   "no way to know what they meant.",
            "spans": highlights.get("spans", []),
            "reasonIfUnavailable": highlights.get("reason"),
        },
        "verification": {
            "method": "every transcribed item carries an anchor phrase that must still appear in "
                      "the OCR of the page it claims; this is what catches a transcription that "
                      "has drifted from a re-exported source",
            "checked": len(checks),
            "failed": failed,
            "allPassed": not failed,
        },
        "findings": [
            {"finding": "BUG IN SHARED TOOLING, not just a local problem with this file: "
                        "`scripts/kasr/extract/pagetext.py` cannot tell an undecodable text "
                        "layer from a decodable one, so it silently caches unreadable output as "
                        "a healthy native extraction. Every lane that reads that cache has this "
                        "hole, not only 108 INT. This lane worked around it inside its own "
                        "directory and edited nothing shared.",
             "evidence":
                 "The condition that fails is the native-vs-OCR guard in `extract()`:\n"
                 "    if mode == \"native\" and len(native_page(pdf, 1).strip()) < 20:\n"
                 "        mode = \"ocr\"\n"
                 "It tests only how MANY characters came back, never whether any of them is a "
                 "character a human could read. When a PDF's embedded fonts carry no usable "
                 "ToUnicode map, pdftotext emits U+0001 for every glyph it cannot map. U+0001 "
                 "is not whitespace, so `.strip()` does not remove it and each one counts "
                 "toward the length. For %s, page 1 returns well over 20 such characters, the "
                 "guard passes, the file is cached as `mode: \"native\"` with a healthy-looking "
                 "character count, and `emptyPages` lists only page 12 — the one page that "
                 "genuinely has no glyphs. The cache therefore reports this book as "
                 "successfully extracted while containing zero readable text: %d glyphs across "
                 "12 pages, every one U+0001, and %d readable characters. OCR of the same pages "
                 "returns the full captions, which is how we know the pages are not blank. "
                 "Note the failure is silent and inverted — the more thoroughly a file is "
                 "unreadable, the more characters it produces and the healthier it looks."
                 % (ATLAS, sum(c["undecodableGlyphs"] for c in census),
                    sum(c["readableCharacters"] for c in census)),
             "suggestedGuard":
                 "Gate on the proportion of word-forming characters, not on length. Something "
                 "of the shape:\n"
                 "    def readable(text):\n"
                 "        t = text.strip()\n"
                 "        if len(t) < 20:\n"
                 "            return False\n"
                 "        good = sum(1 for c in t if c.isalnum() or c.isspace() or c in "
                 "\".,;:!?()[]{}'\\\"/-\")\n"
                 "        return good / len(t) >= 0.8\n"
                 "    if mode == \"native\" and not readable(native_page(pdf, 1)):\n"
                 "        mode = \"ocr\"\n"
                 "This keeps the existing length check as the first clause, so nothing that "
                 "passes today for the right reason changes, and adds the missing question: are "
                 "these characters letters.\n\n"
                 "Measured, not assumed. Against the 8 sources currently sitting in the shared "
                 "cache with `mode: native`, the ratio separates cleanly with a wide margin: "
                 "the broken atlas scores 0.283 on page 1 and 0.582 taking the best of its "
                 "first three pages, while all 7 genuinely-native sources score between 0.993 "
                 "and 1.000. A 0.8 threshold puts nothing near the line and reclassifies "
                 "exactly one file — the broken one. That is a local check on the cache present "
                 "here, not a corpus-wide sweep, so re-measure before rollout.\n\n"
                 "Two cautions for whoever implements it. Sample more than page 1 — a cover "
                 "page is often a bare image and is the least representative page in any book; "
                 "best-of-the-first-three is sturdier and still flags the atlas comfortably. "
                 "And keep the threshold loose enough for Arabic, maths and the corpus's heavy "
                 "use of arrows and box-drawing, all of which are legitimately non-alnum: "
                 "`str.isalnum()` is Unicode-aware and returns True for Arabic letters, so the "
                 "risk is punctuation-dense pages rather than Arabic ones. The two "
                 "Arabic-bearing sources in the sample scored 0.993 and above, but that is a "
                 "small sample and worth re-testing against a known-good Arabic-heavy source "
                 "before it lands.",
             "action": "Passed to the lane that owns `pagetext.py`; this lane must not edit it. "
                       "Once fixed, re-run pagetext.py --force for %s so the shared cache stops "
                       "reporting this book as 12 pages of blank whitespace, and consider a "
                       "sweep for other sources whose cache is `mode: native` with a low "
                       "readable-character ratio — the same silent failure will be sitting in "
                       "any file with a broken ToUnicode map. In the meantime the manifest's "
                       "`textLayer` for this source reads `native` and would be more honest as "
                       "`none`." % ATLAS},
            {"finding": "This practical file is an excerpt, not the practical, and the shortfall "
                        "is large enough to matter: it holds 10 teaching items out of at least "
                        "44 — under a quarter of the book, and the true denominator is higher "
                        "because the gross section's length is unknown.",
             "evidence": "The 12 PDF pages carry printed page numbers 1, 2, 3, 4, then 22, 23, "
                         "24 (the other five PDF pages are unnumbered front matter and one "
                         "caption-less plate). Printed pages 5-21 — seventeen pages — are absent "
                         "outright, and the book continues past printed 24 by an unknown amount. "
                         "Printed 1 and 22 are the two section introductions. All five teaching "
                         "pages held (printed 2, 3, 4, 23, 24) carry exactly two items each with "
                         "no exceptions, so the histopathology section's twenty teaching pages "
                         "(printed 2-21) imply about 40 histopathology items against the 6 held; "
                         "the 4 gross items held are a floor with no ceiling. Separately, the "
                         "atlas numbers its glass slides and the two it describes are SLIDE (7) "
                         "and SLIDE (9), so the department's numbered slide set runs to at least "
                         "9 and this file documents 2 of those numbers. Note that both numbered "
                         "slides sit on printed page 2, immediately after the introduction, which "
                         "means the slide numbers index the department's physical slide box "
                         "rather than a position in the book — do not read them as evidence that "
                         "pages holding slides 1-6 were removed.",
             "action": "Ask the department for the complete Atlas of Practical General Pathology "
                       "for INT-108 & INT-208: printed pages 5-21, and everything after printed "
                       "page 24. Until it arrives, this catalogue is a sample of the practical "
                       "and must not be published or counted as the module's practical syllabus. "
                       "The computed figures are in files[0].coverage."},
            {"finding": "The C19-1 heart specimen contradicts itself: the gross description says "
                        "the left ventricle is hypertrophied and dilated, the diagnosis beneath "
                        "it says the right ventricle, and the plate is labelled \"L.V.\". The "
                        "diagnosis list also ends with an empty item \"4.\".",
             "evidence": "confirmed on the rendered page at 300 dpi, so it is a defect in the "
                         "book and not an OCR error",
             "action": "A pathologist must resolve it before C19-1 publishes. Do not pick one "
                       "silently."},
            {"finding": "The atlas covers both INT-108 and INT-208 and the corpus files it in two "
                        "folders. The same 10 items belong to two modules and, if imported per "
                        "folder, will be created twice.",
             "evidence": "cover reads \"Modules INT-108 & INT-208\"; manifest carries two rows "
                         "with one sha256, the second flagged crossModulePractical",
             "action": "Import once and share, as the crossModulePractical flag intends."},
            {"finding": "PDF page 12 is a caption-less montage of gross photographs. It is the "
                        "only page in the file whose native text layer holds zero glyphs, and OCR "
                        "returns nothing but noise off the photographs.",
             "evidence": "0 undecodable glyphs and 0 readable characters natively; the shared "
                         "cache already lists page 12 in emptyPages",
             "action": "The specimens on it cannot be identified from this file. Recorded as "
                       "unparseable rather than guessed."},
            {"finding": "The manifest categorises `PHARMA WRITTEN Crash Kinetics Highlighted . "
                        "2026` as sourceCategory `Written Questions`. It is not a question set. "
                        "It is a four-page colour-coded crash revision handout on general "
                        "pharmacokinetics, and it contains no question of any kind. This is a "
                        "manifest categorisation error, and it is the reason this module ends "
                        "the run with zero written questions.",
             "evidence": "All four pages were scanned for every marker a written paper leaves: "
                         "no question number, no instruction verb (Give / Mention / Enumerate / "
                         "Compare / Discuss / Define / List / Explain), no mark allocation, no "
                         "model answer, no answer key. The only question marks in the entire "
                         "file are the three in the authors' own aside \"4. pH within the "
                         "gut:???\". What is there instead is continuous exposition — ADME, "
                         "first-pass effects, Vd, order kinetics, t1/2, loading and maintenance "
                         "dose — laid out in three columns and signed \"YAS\" in the corner of "
                         "every page. The word \"WRITTEN\" in the filename describes the "
                         "subject it revises for, not the file's own form.",
             "action": "Three separate things. (1) Correct the manifest: this source's "
                       "sourceCategory should be a notes/revision category, not `Written "
                       "Questions`, so no later lane goes looking for questions in it. (2) Do "
                       "not derive questions from it — `Instruction Manual for Content "
                       "Creation/05-questions.md` makes it absolute that a written question may "
                       "only come from an existing written question, never from a textbook "
                       "passage, and manufacturing items here would train students for an exam "
                       "nobody set. (3) Ask the faculty for the real 108 INT written paper; if "
                       "the module is expected to ship written questions, they are in a file "
                       "nobody has supplied. The handout itself is genuinely good material and "
                       "is worth importing as notes or concepts by a different extractor."},
            {"finding": "The atlas's preface admits that \"only few pictures are downloaded from "
                        "websites\", so the department does not own every image in this book.",
             "evidence": "preface, PDF page 3",
             "action": "Never re-host an image traced back to this PDF without a licence check. "
                       "Every media request below asks for a freshly licensed equivalent."},
        ],
    }

    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(doc, fh, indent=1, ensure_ascii=False)
        fh.write("\n")

    print("wrote", os.path.relpath(OUT, REPO))
    print("  pathology items      ", len(items),
          "(%d microscopic, %d gross)" % (sum(1 for i in items if i["kind"] == "microscopic slide"),
                                          sum(1 for i in items if i["kind"] == "gross specimen")))
    print("  guidance items       ", len(guidance))
    print("  media requests       ", len(media), doc["mediaRequestSummary"]["byMedium"],
          doc["mediaRequestSummary"]["byPriority"])
    print("  written questions    ", 0, "(source carries none)")
    print("  highlight spans      ", highlights.get("highlightCount", 0))
    print("  atlas pages w/o item ", len(silent), sorted(s["page"] for s in silent))
    print("  anchor checks        ", "%d/%d passed" % (len(checks) - len(failed), len(checks)))
    if failed:
        print("  FAILED ANCHORS       ", failed)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
