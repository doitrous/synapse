#!/usr/bin/env python3
"""Build a module's practical.json from the transcribed raw text.

    python3 scripts/kasr/extract/build_practical.py [--module "104 CPS"]

All titles, stains, features and prompts below are TRANSCRIBED from the raw
dumps in scripts/kasr/extract/raw/ (see practical.py). Nothing is inferred:
where the source states no stain / no magnification the field is null, and
where a page carried no recoverable text it is listed in illegiblePages.

Because every record below is a transcription of a 101 ISK page, this script
only builds 101. `--module` is accepted so the whole extract/ chain takes the
same argument, and refuses any other module rather than filing 101's slides
under another module's name — the transcription tables have to be written
first, per book, by whoever read that book.
"""
import json, os, sys

from kasr_module import DEFAULT_MODULE, out_dir, out_path, parse_module

MODULE, _ARGV = parse_module(sys.argv[1:])
if "--help" in _ARGV or "-h" in _ARGV:
    print(__doc__)
    raise SystemExit(0)
if MODULE != DEFAULT_MODULE:
    raise SystemExit(
        "build_practical.py holds transcribed %s pages only; module %r has no "
        "transcription tables yet, so there is nothing to build for it."
        % (DEFAULT_MODULE, MODULE))

OUT = out_dir(MODULE)
SRC_PRAC = "src_b4cb8bf9f0c7a6584b4b"   # DPT Practical Histo 101 (1).pdf
SRC_DPT1 = "src_05a0b0c29acc94017b8f"   # DPT 1- ISK 101 - Final Revision (1).pdf
SRC_RAD  = "src_177a341938732f599a47"   # Radiology (X-Ray) Orientation  (1).pdf
SRC_ZAH  = "src_f8f2a1993403c9ee07b0"   # EOY HISTOLOGY WRITTEN 101 ... Dr.Zahra
SRC_GAL  = "src_fc7ea5960363431009ed"   # NOTE ... Dr. Galal's final revision

F_PRAC = "DPT Practical Histo 101 (1).pdf"
F_DPT1 = "DPT 1- ISK 101 - Final Revision (1).pdf"
F_RAD  = "Radiology (X-Ray) Orientation  (1).pdf"
F_ZAH  = "EOY HISTOLOGY WRITTEN 101 histo written Dr.Zahra 2025 (1).pdf"
F_GAL  = ("NOTE this is Dr. Galal's final revision pdf use it accordingly NOTE "
          "101  final revision last all-1(3)-نسخ (1).pdf")

CYT = "101 ISK > Histology > Cytology"
EPI = "101 ISK > Histology > Epithelium"
CT  = "101 ISK > Histology > Connective Tissue"
BLD = "101 ISK > Histology > Blood"

PLATE_DESC = ("Full-page teaching plate captioned \"%s\"; the micrograph itself is a "
              "raster image whose visual content is not recoverable from the PDF text layer.")

# ---------------------------------------------------------------- slides
slides = []

def slide(sid, f, page, title, sub, feats=None, asked=None, stain=None,
          mag=None, desc=None, extra=None):
    s = {"sourceId": sid, "file": f, "page": page, "title": title,
         "stain": stain, "magnification": mag,
         "identifyingFeatures": feats or [], "askedAs": asked or [],
         "subjectPath": sub, "hasImage": True,
         "imageDescription": desc or (PLATE_DESC % title)}
    if extra:
        s.update(extra)
    slides.append(s)

# --- A. DPT Practical Histo 101, teaching plates (pp 2-31), titles only ---
TEACH = [
    (2,  "EM of Cell Membrane", CYT), (3,  "Mitochondria", CYT),
    (4,  "EM of Mitochondria", CYT),  (5,  "Golgi apparatus", CYT),
    (6,  "EM of Golgi apparatus", CYT),
    (7,  "Golgi apparatus in nerve cells", CYT),
    (8,  "Golgi apparatus in secretory cells", CYT),
    (9,  "Negative Golgi apparatus", CYT),
    (10, "EM of Rough Endoplasmic Reticulum", CYT),
    (11, "EM of Smooth Endoplasmic Reticulum", CYT),
    (12, "EM of Smooth Endoplasmic Reticulum & Mitochondrion", CYT),
    (13, "EM of Smooth & Rough Endoplasmic Reticulum", CYT),
    (14, "EM of Primary Lysosome", CYT),
    (15, "EM of Secondary lysosome - Multivesicular body", CYT),
    (16, "EM of Secondry lysosomes (Heterolysosomes)", CYT),
    (17, "EM of Secondry Lysosome (Autolysosome)", CYT),
    (18, "Nissl´s granules in nerve cell", CYT),
    (20, "Centrioles", CYT),
    (21, "T.S. of centriole - Direction of microtubules", CYT),
    (22, "EM of Cilia (L.S. & T.S.)", CYT),
    (23, "EM of Microvilli (L.S & T.S)", CYT),
    (28, "EM of Nucleus", CYT),
    (29, "EM of Euchromatic nucleus", CYT),
    (30, "EM of Heterochromatic Nucleus", CYT),
    (31, "EM of Nuclear Membrane", CYT),
    (70, "E.M. of Mitochondria", CYT),
    (71, "E.M. of rER", CYT),
    (72, "E.M. of Golgi apparatus", CYT),
    (75, "Erythrocytes (RBCs)", BLD),
]
for p, t, sub in TEACH:
    slide(SRC_PRAC, F_PRAC, p, t, sub)

slide(SRC_PRAC, F_PRAC, 19, "Ribosome (labelled diagram)", CYT,
      feats=["large ribosomal subunit", "small ribosomal subunit", "P-site",
             "A-site", "amino acid chain (protein)", "tRNA", "mRNA", "codon"],
      desc="Stock labelled schematic of a ribosome on mRNA, not a micrograph; the "
           "printed labels are transcribed under identifyingFeatures.")
slide(SRC_PRAC, F_PRAC, 24, "Inclusions - Stored food: CHO", CYT,
      stain="PAS / Best's carmine",
      desc=PLATE_DESC % "Inclusions - Stored food: CHO (PAS, Best's carmine)")
slide(SRC_PRAC, F_PRAC, 25, "Inclusions - Fat cells", CYT, stain="H&E")
slide(SRC_PRAC, F_PRAC, 26, "Inclusions - Fat cells", CYT, stain="Sudan III")
slide(SRC_PRAC, F_PRAC, 27, "LM of open & closed face nuclei", CYT,
      feats=["open face nucleus", "closed face nucleus"])
slide(SRC_PRAC, F_PRAC, 73, "E.M. of Nucleus (labelled)", CYT,
      feats=["outer nuclear layer", "inner nuclear layer"])
slide(SRC_PRAC, F_PRAC, 76, "Erythrocytes (RBCs) - LM & EM", BLD,
      feats=["LM panel", "EM panel"])
slide(SRC_PRAC, F_PRAC, 78, "Barr body in neutrophil / platelets", BLD,
      feats=["Barr body attached to the segmented nucleus of a neutrophil (green arrow)",
             "platelets (red arrow)"],
      desc="Blood-film micrograph with a green arrow on a Barr body attached to the "
           "segmented nucleus of a neutrophil and a red arrow on platelets.")

# --- B. DPT Practical Histo 101, DATA SHOW MODEL EXAM (p32 divider) ---
def qa_desc(marks):
    return ("Micrograph carrying coloured examiner markers (%s); the facing answer "
            "page identifies each marked structure." % marks)

MODEL = [
 (33, 34, "EM of cell membrane between two cells", CYT,
  ["green arrow: 2 cell membranes", "red arrow: intercellular space", "star: cytoplasm"],
  ["Green arrows point to ...", "Red arrow points to ..."], "green arrows, red arrow, star"),
 (35, 36, "EM of cell membrane of 2 adjacent cells", CYT,
  ["2 dark & 1 pale layers (trilamellar)", "cytoplasm (blue star)",
   "intercellular space (green arrow)"],
  ["Structure outlined by red rectangle is ...", "Give 1 visible character of A",
   "Mention the structure marked by blue star", "Green arrow point to ..."],
  "red rectangle, blue star, green arrow"),
 (37, 38, "Mitochondrion (EM)", CYT,
  ["blue arrows: cristae", "red arrowhead: matrix"],
  ["The organelle is called ...", "Blue arrows point to ...", "Arrowhead points to ..."],
  "blue arrows, arrowhead"),
 (39, 40, "Mitochondrion and rER (EM)", CYT,
  ["cristae (red arrows)", "matrix (green arrow)", "rER (yellow arrows)",
   "rER: parallel tubules / covered by ribosomes"],
  ["Organelle pointed to by blue star is called ...",
   "Red arrows point to ... & green arrow points to ...",
   "Organelle pointed to by the yellow arrows is ...",
   "Mention 1 visible character for C"], "blue star, red arrows, green arrow, yellow arrows"),
 (41, 42, "rER with ribosomes", CYT,
  ["arrows: ribosomes", "function: protein synthesis"],
  ["Arrows point to ..., its main function ..."], "arrows"),
 (43, 44, "rER and mitochondria", CYT,
  ["red arrow: rER", "green arrow: mitochondria", "cristae"],
  ["Red arrows point to ...", "Green arrow points to ..., name a stain for it & one visible feature"],
  "red arrows, green arrow", "Iron hematoxylin or Janus green"),
 (45, 46, "sER", CYT,
  ["smooth surface", "no ribosomes", "vesicles of different size and shape"],
  ["Name the organelle pointed to by the yellow arrow", "Mention one visible feature"],
  "yellow arrow"),
 (47, 48, "Golgi apparatus in nerve cell", CYT,
  ["fine fibrils or granules", "perinuclear position", "nucleus central / rounded"],
  ["Red arrow demonstrates ...", "One visible feature of organelle is ... & its position is ...",
   "It is stained ... with ... stain", "Green arrow points to ... & 1 visible feature is ..."],
  "red arrow, green arrow", "silver (brown)"),
 (49, 50, "Golgi apparatus in secretory cells", CYT,
  ["fine fibrils or granules", "apical position", "cell membrane (green arrows)"],
  ["Red arrows demonstrate ... in ... cells",
   "One visible feature of organelle is ... & its position is ...",
   "It is stained ... with ... stain", "Green arrows point to ..."],
  "red arrows, green arrows", "silver (brown)"),
 (51, 52, "Golgi apparatus (EM) - secretory apparatus", CYT,
  ["Golgi saccules parallel / stacked (yellow star)", "cytoplasm (blue star)",
   "transfer vesicles (red arrow)", "secretory vesicles (green arrow)"],
  ["Organelle is called ... & its nickname is ...",
   "Yellow star marks ... & 1 visible feature ...", "Name structure marked by blue star",
   "Red arrow points to ... green arrow points to ..."],
  "yellow star, blue star, red arrow, green arrow"),
 (53, 54, "Golgi apparatus with vesicles", CYT,
  ["green arrow: secretory vesicle", "yellow arrow: transfer vesicle"],
  ["Name structure pointed by red arrow", "Green arrow points to ...",
   "Yellow one points to ..."], "red arrow, green arrow, yellow arrow"),
 (55, 56, "Centriole", CYT,
  ["red arrow: microtubules", "arranged as 9 triplets"],
  ["The organelle is called ...", "Red arrows point to ..., arranged as ..."],
  "red arrows"),
 (57, 58, "Axoneme (shaft) of cilium", CYT,
  ["yellow arrows: microtubules as 9 doublets", "blue arrows: two singlets of microtubules"],
  ["This organelle is called ...", "Yellow arrows point to ...", "Blue arrow points to ..."],
  "yellow arrows, blue arrow"),
 (59, 60, "Cilia and microvilli (EM)", CYT,
  ["shaft of cilium / axoneme formed of ~20 microtubules (red square)",
   "singlets, 2 microtubules (blue arrow)", "peripheral doublet microtubules (red arrow)",
   "microvilli: no microtubules, pale core, small (blue square)",
   "cell membrane (yellow arrows)"],
  ["Red square surrounds ..., give 1 character",
   "Blue arrow points to ... & red arrow points to ...",
   "Blue square surrounds ..., give 1 character", "Yellow arrows point to ..."],
  "red square, blue square, blue arrow, red arrow, yellow arrows"),
 (61, 62, "Cytoplasmic inclusions - glycogen and fat", CYT,
  ["fig a: glycogen, red granules, liver cells",
   "fig b: lipid/fat, large orange droplet, fat cells (adipocytes)"],
  ["Identify inclusions in fig. a & b", "Name the used stains for fig. a & b",
   "Give visible character for fig. a & b", "Name the cell in fig. a & b"],
  "two lettered figures a and b",
  "fig a: Best's carmine or PAS; fig b: Sudan III"),
 (63, 64, "Nucleus - nucleolus and nuclear membrane", CYT,
  ["blue arrow: nucleolus", "red arrow: nuclear membrane"],
  ["Blue arrow points to ...", "Red arrow points to ..."], "blue arrow, red arrow"),
 (65, 66, "Heterochromatic nucleus (EM)", CYT,
  ["peripheral heterochromatin (red arrow)", "chromatin island (green arrow)",
   "nucleolus associated chromatin (yellow arrow)",
   "nuclear sap / euchromatin (yellow star)", "nuclear membrane (arrowhead)"],
  ["Identify the structure (be specific)", "Identify red arrow & green arrow",
   "Identify yellow arrow & yellow star", "Arrow head points to ..."],
  "red arrow, green arrow, yellow arrow, yellow star, arrowhead"),
 (67, 68, "Euchromatic nucleus (EM)", CYT,
  ["peripheral heterochromatin (red arrow)", "chromatin island (green arrow)",
   "nucleolus (yellow arrow)", "nuclear sap / euchromatin (yellow star)",
   "nuclear membrane (black arrow)", "nuclear pore (arrowhead)"],
  ["Identify the structure (be specific)", "Identify red arrow & green arrow",
   "Yellow arrow points to ... & yellow star marks ...",
   "Identify black arrow & arrow head"],
  "red arrow, green arrow, yellow arrow, yellow star, black arrow, arrowhead"),
]
for row in MODEL:
    qp, ap, title, sub, feats, asked, marks = row[:7]
    stain = row[7] if len(row) > 7 else None
    slide(SRC_PRAC, F_PRAC, qp, title, sub, feats, asked, stain,
          desc=qa_desc(marks),
          extra={"answerPage": ap, "section": "DATA SHOW MODEL EXAM (divider p.32)"})

# --- C. DPT 1 - ISK 101 - Final Revision (question page -> answer page) ---
DPT1 = [
 (4, 5, "Cell membrane of 2 adjacent cells (EM)", CYT,
  ["2 dark & 1 pale layers / trilamellar", "cytoplasm (blue star)",
   "intercellular space (green arrow)"],
  ["Structure outlined by red rectangle is ...", "Give 1 visible character of A",
   "Mention the structure marked by blue star", "Green arrow point to ..."],
  "red rectangle, blue star, green arrow", None),
 (6, 7, "Mitochondrion and rER (EM)", CYT,
  ["cristae (red arrows)", "matrix (green arrow)",
   "rER parallel tubules / covered by ribosomes (yellow arrows)"],
  ["Organelle pointed to by blue star is called ...",
   "Red arrows point to ... & green arrow points to ...",
   "Organelle pointed to by the yellow arrows is ...",
   "Mention 1 visible character for C"],
  "blue star, red arrows, green arrow, yellow arrows", None),
 (8, 9, "sER", CYT,
  ["smooth surface", "no ribosomes", "vesicles of different size and shape"],
  ["Name the organelle pointed to by the yellow arrow", "Mention one visible feature"],
  "yellow arrow", None),
 (10, 11, "Golgi apparatus in nerve cell", CYT,
  ["fine fibrils or granules", "perinuclear position", "nucleus central / rounded"],
  ["Red arrow demonstrates ...", "One visible feature of organelle is ... & its position is ...",
   "It is stained ... with ... stain", "Green arrow points to ... & 1 visible feature is ..."],
  "red arrow, green arrow", "silver (brown)"),
 (12, 13, "Golgi apparatus in secretory cells", CYT,
  ["fine fibrils or granules", "apical position", "cell membrane (green arrows)"],
  ["Red arrows demonstrate ... in ... cells",
   "One visible feature of organelle is ... & its position is ...",
   "It is stained ... with ... stain", "Green arrows point to ..."],
  "red arrows, green arrows", "silver (brown)"),
 (14, 15, "Golgi apparatus (EM) - secretory apparatus", CYT,
  ["Golgi saccules parallel / stacked (yellow star)", "cytoplasm (blue star)",
   "transfer vesicles (red arrow)", "secretory vesicles (green arrow)"],
  ["Organelle is called ... & its nickname is ...",
   "Yellow star marks ... & 1 visible feature ...", "Name structure marked by blue star",
   "Red arrow points to ... green arrow points to ..."],
  "yellow star, blue star, red arrow, green arrow", None),
 (16, 17, "Centriole", CYT, ["red arrow: microtubules", "arranged as 9 triplets"],
  ["The organelle is called ...", "Red arrows point to ..., arranged as ..."],
  "red arrows", None),
 (18, 19, "Cilia and microvilli (EM)", CYT,
  ["shaft of cilium / axoneme, ~20 microtubules (red square)",
   "singlets (blue arrow)", "peripheral doublets (red arrow)",
   "microvilli, no microtubules, pale core (blue square)", "cell membrane (yellow arrows)"],
  ["Red square surrounds ..., give 1 character",
   "Blue arrow points to ... & red arrow points to ...",
   "Blue square surrounds ..., give 1 character", "Yellow arrows point to ..."],
  "red square, blue square, blue arrow, red arrow, yellow arrows", None),
 (20, 21, "Cytoplasmic inclusions - glycogen and fat", CYT,
  ["fig a: glycogen, red granules, liver cells",
   "fig b: lipid/fat, large orange droplet, fat cells (adipocytes)"],
  ["Identify inclusions in fig. a & b", "Name the used stains for fig. a & b",
   "Give visible character for fig. a & b", "Name the cell in fig. a & b"],
  "two lettered figures a and b", "fig a: Best's carmine or PAS; fig b: Sudan III"),
 (22, 23, "Heterochromatic nucleus (EM)", CYT,
  ["peripheral heterochromatin (red arrow)", "chromatin island (green arrow)",
   "nucleolus associated chromatin (yellow arrow)",
   "nuclear sap / euchromatin (yellow star)", "nuclear membrane (arrowhead)"],
  ["Identify the structure (be specific)", "Identify red arrow & green arrow",
   "Identify yellow arrow & yellow star", "Arrow head points to ..."],
  "red arrow, green arrow, yellow arrow, yellow star, arrowhead", None),
 (24, 25, "Euchromatic nucleus (EM)", CYT,
  ["peripheral heterochromatin (red arrow)", "chromatin island (green arrow)",
   "nucleolus (yellow arrow)", "nuclear sap / euchromatin (yellow star)",
   "nuclear membrane (black arrow)", "nuclear pore (arrowhead)"],
  ["Identify the structure (be specific)", "Identify red arrow & green arrow",
   "Yellow arrow points to ... & yellow star marks ...",
   "Identify black arrow & arrow head"],
  "red arrow, green arrow, yellow arrow, yellow star, black arrow, arrowhead", None),
 (27, 28, "Simple squamous and simple cubical epithelium", EPI,
  ["simple squamous: flat cells, one layer", "nuclei flat / single / central (blue arrows)",
   "simple cubical: square shape, short cells, single layer",
   "nuclei rounded / central / single (red arrows)"],
  ["Identify epithelium in a ... & 1 feature", "Blue arrows point to ... & give 1 feature",
   "Identify epithelium in b ... & 1 feature",
   "Give 1 feature to structure pointed by red arrows"],
  "labelled fields a and b, blue arrows, red arrows, a marked blood vessel", None),
 (29, 30, "Simple columnar epithelium", EPI,
  ["tall cells", "one layer", "oval basal nuclei"],
  ["Identify type of epithelium", "Mention 1 visible feature for A",
   "Name the structure pointed to by yellow arrow", "Mention 1 visible feature for B"],
  "yellow arrow", None),
 (31, 32, "Pseudostratified columnar ciliated epithelium", EPI,
  ["tall cells", "1 cell layer", "crowded nuclei", "cilia (blue arrow)",
   "basement membrane (green arrow)", "goblet cell (red arrow)",
   "connective tissue (star)"],
  ["Identify the epithelium", "Mention 2 visible characters",
   "Blue arrow points to ... & green arrow ...",
   "Cell pointed by red arrow is ... & star marks ..."],
  "blue arrow, green arrow, red arrow, red star", None),
 (33, 34, "Keratinized stratified squamous epithelium", EPI,
  ["horny layer / keratin, acidophilic condensed layers (yellow arrow)",
   "intermediate layers, polyhedral cells with rounded nuclei (green arrow)",
   "connective tissue (blue star)"],
  ["Identify the epithelium", "Yellow arrow points to ... & give 1 feature",
   "Green arrow points to ... & give 1 feature", "Name tissue marked by blue star"],
  "yellow arrow, green arrow, blue star", None),
 (35, 36, "Non-keratinized stratified squamous epithelium", EPI,
  ["1: squamous cells / superficial layer", "2: columnar cells / basal layer"],
  ["Identify epithelial type", "1 & 2 point to ..."], "numbered labels 1 and 2", None),
 (37, 38, "Transitional epithelium", EPI,
  ["superficial layer: cuboidal or dome shaped cells, rounded nuclei (yellow arrow)",
   "intermediate layers: polyhedral cells, rounded nuclei (green arrow)",
   "connective tissue (blue star)"],
  ["This type of epithelium is called ...", "Yellow arrow points to ... & give 1 feature",
   "Green arrow points to ... & give 1 feature", "Name tissue marked by blue star"],
  "yellow arrow, green arrow, blue star", None),
 (40, 41, "Loose areolar connective tissue", CT,
  ["collagen fibers: condensed fibers / bundles / acidophilic (blue arrow)",
   "elastic fibers: singly, thin, zigzag, acidophilic (green arrow)",
   "fibroblast cell or nucleus (arrowhead)", "matrix (star)"],
  ["Identify the tissue (be specific)", "Name fiber pointed by blue arrow & 1 character",
   "Name fiber pointed by green arrow & 1 character",
   "Arrow head points to ... & star marks ..."],
  "blue arrow, green arrow, arrowhead, star", None),
 (42, 43, "Mast cells and plasma cells", CT,
  ["mast cells (yellow circles)", "plasma cells (green circles)",
   "granules (yellow arrow)", "nucleus (green arrow)",
   "negative Golgi image (black arrow)",
   "plasma cell nucleus: eccentric, single, cart-wheel appearance (red arrow)"],
  ["Cells surrounded by yellow circles ... & green circles ...",
   "Yellow arrow points to ... & green arrow to ...", "Black arrow points to ...",
   "Mention 2 visible characters to nucleus pointed by red arrow"],
  "yellow circles, green circles, yellow arrow, green arrow, black arrow, red arrow", None),
 (44, 45, "White adipose connective tissue (unilocular fat cells)", CT,
  ["unilocular fat cells", "large / oval cells with a single fat droplet",
   "fat droplet (blue stars)", "thin rim of cytoplasm (red arrow)"],
  ["Identify type of this C.T. ... formed of ... cells",
   "The cells can be stained by ... & ...", "Mention 2 visible characters of cells",
   "Blue stars mark ... & red arrow points to ..."],
  "blue stars, red arrow", "H&E and Sudan III"),
 (46, 47, "Brown adipose connective tissue (multilocular fat cells)", CT,
  ["multilocular fat cells", "small / rounded cells with many fat droplets",
   "nuclei (blue arrows)", "blood vessels (black arrows)"],
  ["Identify type of this C.T. ... formed of ... cells",
   "The cells can be stained by ... & ...", "Mention 2 visible characters of cells",
   "Blue arrows mark ... & black arrows point to ..."],
  "blue arrows, black arrows", "H&E and Sudan III"),
 (48, 49, "Reticular connective tissue", CT,
  ["reticular fibers (red arrows)", "brown", "thin", "branch & anastomose"],
  ["Identify type of C.T. ... & stain ...", "Red arrows point to ...",
   "Mention characters for B"], "red arrows", "silver"),
 (50, 51, "Elastic connective tissue", CT,
  ["yellow in the fresh state", "elastic fibers (red arrows)",
   "singly / thin / zigzag shape / acidophilic"],
  ["Type of C.T. is ... & in fresh state is ... colour",
   "It is stained ... colour with ... stain", "Red arrows demonstrate ...",
   "Give 2 visible characters for C"], "red arrows", "orcein (stains brown)"),
 (52, 53, "Regular fibrous connective tissue", CT,
  ["white in the fresh state", "nuclei of fibroblasts / fibrocytes (black arrows)",
   "collagen fibers (red arrows)",
   "parallel / regular bundles / thick bundles / acidophilic"],
  ["Type of C.T. is ... & in fresh state is ... colour", "Black arrows point to ...",
   "Red arrows demonstrate ...", "Give 2 visible characters for C"],
  "black arrows, red arrows", None),
 (54, 55, "Irregular fibrous connective tissue", CT,
  ["white in the fresh state", "nuclei of fibroblasts / fibrocytes (black arrows)",
   "collagen fibers (blue arrows)",
   "irregularly arranged bundles / thick bundles / acidophilic"],
  ["Type of C.T. is ... & in fresh state is ... colour", "Black arrows point to ...",
   "Blue arrows demonstrate ...", "Give 2 visible characters for C"],
  "black arrows, blue arrows", None),
 (57, 58, "Blood film - neutrophil, platelet, RBC, crenated RBC", BLD,
  ["neutrophil: segmented / multilobed nucleus (red arrow)", "platelet (black arrow)",
   "RBC with central pallor (green arrow)", "crenated RBC (blue arrow)"],
  ["This is a ..., stained by ...",
   "Red arrow points to ... characterized by ..., black arrow points to ...",
   "Green arrow points to ..., characterized by ...", "Blue arrow points to ..."],
  "red arrow, black arrow, green arrow, blue arrow", "Leishman"),
 (59, 60, "Blood film - eosinophil", BLD,
  ["eosinophil: eosinophilic granules & bilobed nucleus (blue arrow)",
   "RBC with central pallor (black arrow)", "platelet (green arrow)"],
  ["This is a ..., stained with ...",
   "Blue arrow points to ..., characterized by ... granules & ... nucleus",
   "Black arrow points to ..., characterized by ...", "Green arrow points to ..."],
  "blue arrow, black arrow, green arrow", "Leishman"),
 (61, 62, "Blood film - monocyte", BLD,
  ["monocyte: kidney shaped nucleus, frosted glass cytoplasm (blue arrow)",
   "lymphocyte (red arrow)", "RBC with central pallor (black arrow)"],
  ["This is a ..., stained with ...",
   "Blue arrow points to ..., characterized by ... nucleus and the cytoplasm shows ... appearance",
   "Red arrow points to ...", "Black arrow points to ... which is characterized by ..."],
  "blue arrow, red arrow, black arrow", "Leishman"),
 (63, 64, "Blood film - basophils", BLD,
  ["basophils: basophilic / large granules (blue arrows)",
   "RBC with central pallor (blue arrowhead)",
   "neutrophil with multilobed nucleus (red arrow)"],
  ["This is a ..., stained with ...",
   "Blue arrows point to ..., characterized by ... granules",
   "Blue arrowhead points to ..., characterized by ...",
   "Red arrow points to ..., characterized by ..."],
  "blue arrows, blue arrowhead, red arrow", "Leishman"),
 (65, 66, "Bone marrow", BLD,
  ["fat cells / adipocytes (red arrows)", "megakaryocyte (blue arrow)"],
  ["Identify the tissue", "The red arrows point to ...", "The blue arrow points to ..."],
  "red arrows, blue arrow", None),
 (67, 68, "Blood film - reticulocytes (supravital preparation)", BLD,
  ["cresyl blue is a supravital stain"],
  ["This is a ... stained with ... which is a ... stain"],
  "unmarked blood film", "cresyl blue (supravital)"),
]
for qp, ap, title, sub, feats, asked, marks, stain in DPT1:
    slide(SRC_DPT1, F_DPT1, qp, title, sub, feats, asked, stain,
          desc=qa_desc(marks), extra={"answerPage": ap})

# ---------------------------------------------------------------- written
written = []

ZAHRA_INDEX = {  # section -> [(number, text)] transcribed from index pp.2-3
 "Cytology": [
  (1,"Discuss LM & EM of cell membrane (B)"),(2,"Outline types of transport across cell membrane (B)"),
  (3,"Comment on receptor mediated endocytosis (B)"),(4,"Histological structure and functions of cell coat (B)"),
  (5,"Molecular structure cell membrane (B)"),(6,"Histological structure (LM & EM) of mitochondria (A)"),
  (7,"Compare between smooth & rough endoplasmic reticulum (A)"),
  (8,"Comment on LM & EM of Golgi apparatus & enumerate its functions (B)"),
  (9,"Enumerate organelles involved in protein formation and secretion & discuss histological structure of one of them (A)"),
  (10,"Enumerate organelles that share in formation of lysosomes & discuss histological structure of one of them (A)"),
  (11,"Discuss different types of lysosomes (A)"),(12,"Discuss origin of lysosome & enumerate its functions (A)"),
  (13,"Compare between lysosomes & peroxisomes according to origin, content, functions & effect of deficiency (B)"),
  (14,"Comment on LM, EM, origin, types & function of ribosomes (B)"),
  (15,"Enumerate types of intermediate filaments with reference to its sites & its role in tumor diagnosis (A)"),
  (16,"Enumerate structures formed by stable microtubules & discuss one (B)"),
  (17,"Discuss EM structure of cilia and its sites (A)"),
  (18,"Compare between centrioles, cilia & flagella according to sites, structure & function (B)"),
  (19,"Compare between euchromatin & heterochromatin with reference to sites of heterochromatin (A)"),
  (20,"Discuss EM & functions of nuclear envelope (A)"),(21,"Discuss EM of nucleolus (B)"),
  (22,"Compare between microtubules & filaments"),(23,"Cytoplasmic inclusions (stored food & pigments)")],
 "Epithelium": [
  (1,"Enumerate 5 characters of epithelial tissue (B)"),
  (2,"Compare between structure, sites & function of simple epithelium (C)"),
  (3,"Compare between stratified squamous epithelium & transitional epithelium according to BM, sites, structure & function (B)"),
  (4,"Comment on structure, types & function of transitional epithelium (urothelium) (A)"),
  (5,"Comment on pseudostratified columnar epithelium (A)"),
  (6,"Comment on types of glands according to mode of secretion (B)"),
  (7,"Comment on desmosomes (B)"),(8,"Comment on gap junction (B)"),
  (9,"Comment on components of junctional complex and discuss one (B)"),
  (10,"Discuss LM & EM of basement membrane (B)"),(11,"Comment on basal infoldings (B)"),
  (12,"Enumerate cell junctions & discuss one"),
  (13,"Enumerate 5 cell membrane modifications and major difference between them (B)"),
  (14,"Discuss neuro-epithelium & myo-epithelium")],
 "Connective Tissue": [
  (1,"Give an account on fibroblast (A)"),(2,"Compare between unilocular & multilocular adipocytes (B)"),
  (3,"Give an account on macrophages (A)"),(4,"Give an account on mast cells (cell responsible for anaphylaxis) (A)"),
  (5,"Give an account on plasma cells (A)"),(6,"Enumerate fixed CT cells & discuss one (B)"),
  (7,"Enumerate free CT cells & discuss one (B)"),
  (8,"Compare between collagen & elastic & reticular fibers as regard characters, LM, staining & function (A)"),
  (9,"Enumerate different types of collagen with reference to their main sites & cells of origin (B)"),
  (10,"Types of loose & dense connective tissue")],
 "Blood": [
  (1,"Give an account on structure function adaptation of erythrocytes (B)"),
  (2,"Comment on neutrophils (PMNL - microphage) (A)"),(3,"Comment on eosinophil (A)"),
  (4,"Comment on basophil (A)"),(5,"Enumerate cells related to allergy and discuss one (A)"),
  (6,"Give an account on first line of defense in acute pyogenic infections (A)"),
  (7,"Compare between basophils & mast cells (A)"),(8,"Compare between small & large lymphocytes (A)"),
  (9,"Compare between B lymphocytes, T lymphocytes & natural killer cells (A)"),
  (10,"Give an account on monocytes regarding percentage, LM, EM, functions (A)"),
  (11,"Comment on platelets (thrombocytes) regarding origin, LM, EM, pathological decrease (A)"),
  (12,"Give an account on structure of red bone marrow (B)"),(13,"Comment on reticulocytes (B)"),
  (14,"Give an account on types of T lymphocytes & function of each (B)"),
  (15,"Compare between erythrocytes & leukocytes"),(16,"Compare between red & yellow bone marrow")],
}
# answer page per (section, number), read from the model-answer headings
ANSWER_PAGE = {
 ("Cytology",1):4,("Cytology",2):4,("Cytology",3):5,("Cytology",4):5,("Cytology",5):6,
 ("Cytology",6):7,("Cytology",7):8,("Cytology",8):9,("Cytology",9):10,("Cytology",10):10,
 ("Cytology",11):11,("Cytology",12):11,("Cytology",13):12,("Cytology",14):13,("Cytology",15):13,
 ("Cytology",16):14,("Cytology",17):14,("Cytology",18):15,("Cytology",19):16,("Cytology",20):16,
 ("Cytology",21):17,("Cytology",22):17,("Cytology",23):18,
 ("Epithelium",1):19,("Epithelium",2):20,("Epithelium",3):21,("Epithelium",4):22,("Epithelium",5):22,
 ("Epithelium",6):23,("Epithelium",7):23,("Epithelium",8):23,("Epithelium",9):24,("Epithelium",10):24,
 ("Epithelium",11):24,("Epithelium",12):25,("Epithelium",13):25,("Epithelium",14):26,
 ("Connective Tissue",1):27,("Connective Tissue",2):28,("Connective Tissue",3):29,
 ("Connective Tissue",4):30,("Connective Tissue",5):30,("Connective Tissue",6):31,
 ("Connective Tissue",7):31,("Connective Tissue",8):32,("Connective Tissue",9):32,
 ("Connective Tissue",10):33,
 ("Blood",1):34,("Blood",2):34,("Blood",3):36,("Blood",4):37,("Blood",5):38,("Blood",6):38,
 ("Blood",7):38,("Blood",8):38,("Blood",9):39,("Blood",10):39,("Blood",11):40,("Blood",12):41,
 ("Blood",13):41,("Blood",14):42,("Blood",15):42,("Blood",16):42,
}
for sec, items in ZAHRA_INDEX.items():
    for num, text in items:
        written.append({
            "sourceId": SRC_ZAH, "file": F_ZAH,
            "page": ANSWER_PAGE[(sec, num)], "number": num, "text": text,
            "marks": None, "kind": "essay",
            "subjectPath": "101 ISK > Histology > " + sec,
            "indexPage": 2 if sec in ("Cytology", "Epithelium") else 3,
            "priorityTag": (text.rsplit("(", 1)[1][0] if text.endswith(")") and
                            text.rsplit("(", 1)[1][0] in "ABC" else None),
            "modelAnswerPresent": True,
        })

GALAL = [  # page, topic transcribed from the "Q." markers in Dr. Galal's revision
 (2,"Pectoral muscles (muscles of ant. wall of axilla)"),(2,"Serratus anterior"),
 (2,"Clavipectoral fascia (attachment & structures piercing)"),
 (4,"Trapezius"),(4,"Latissimus dorsi"),(4,"Rotator muscle cuff (musculo-tendinous cuff of shoulder)"),
 (6,"Muscles of post. wall of axilla"),(6,"Intermuscular spaces"),(6,"Deltoid"),
 (6,"Muscles producing abduction of shoulder"),(6,"Axilla: boundaries and contents"),
 (8,"Brachial plexus: formation (stages) & site"),
 (10,"Axillary (circumflex) n."),(10,"Axillary artery"),(10,"Anastomosis around scapula"),
 (12,"Axillary lymph nodes"),(12,"Muscles of front of arm"),(12,"Biceps brachii"),
 (14,"Musculocutaneous n."),(14,"Triceps"),(14,"Brachial artery"),
 (14,"Profunda brachii / nutrient / sup. ulnar collateral branches"),
 (14,"Anastomosis around elbow"),
 (16,"Radial n. in axilla & arm"),(16,"Pronator teres"),(16,"Flexor digitorum superficialis"),
 (18,"Flexor digitorum profundus"),(18,"Pronator quadratus"),
 (18,"Cubital fossa: boundaries and contents"),
 (20,"Median n. in forearm, at wrist and in palm"),(20,"Ulnar n. in forearm, at wrist and in palm"),
 (22,"Nerve injuries above elbow (supracondylar fracture humerus)"),
 (22,"Nerve injuries at elbow (fracture med. epicondyle)"),
 (22,"Nerve injuries at wrist (cut or stab wounds)"),
 (26,"Ant. carpal arch"),(26,"Post. carpal arch"),(26,"Superficial palmar arch"),(26,"Deep palmar arch"),
 (28,"Flexor retinaculum: attachments & structures passing superficial and deep"),
 (28,"Carpal tunnel: boundaries and contents"),(28,"Carpal tunnel syndrome"),
 (30,"Brachio-radialis"),(30,"Supinator"),(30,"Abductor pollicis longus"),
 (30,"Extensor pollicis brevis"),(30,"Extensor pollicis longus"),
 (32,"Extensor retinaculum: attachments and compartments"),
 (32,"Anatomical snuff box: boundaries and contents"),
 (34,"Posterior interosseous n."),(34,"Radial n. injury"),
 (36,"Cutaneous nerve supply: shoulder region, axilla & arm"),(36,"Cutaneous nerve supply: forearm"),
 (38,"Movements & muscles acting on shoulder girdle"),
 (40,"Shoulder joint: articular surfaces, type, ligaments, stability, movements & muscles acting"),
 (42,"Elbow joint: articular surfaces, type, ligaments, movements & muscles acting"),
 (44,"Supination & pronation"),(44,"Interosseous membrane"),
 (46,"Wrist joint: articular surfaces, type, ligaments, movements & muscles acting"),
 (48,"Fertilization: site, mechanism, results"),(48,"Implantation: time, site, mechanism"),
 (50,"Abnormal sites of implantation"),(50,"Decidua: features, parts, fate"),
 (50,"Notochord: development, importance & fate"),
 (52,"Intra-embryonic mesoderm differentiation"),(52,"Somites"),
 (54,"Embryonic folding: time, types, causes, steps (results)"),
 (54,"Trophoblast layers"),(54,"Chorionic villi"),(54,"Parts of chorion"),
 (56,"Placenta: external features, structure, placental circulation"),
 (58,"Placental barrier"),(58,"Placental functions"),(58,"Placental abnormalities"),
 (60,"Amniotic fluid: nature, production and functions"),
 (60,"Umbilical cord: morphology, functions, development, abnormalities"),
 (62,"Bone: functions and classification"),(64,"Long bones"),(66,"Growth of long bones"),
 (66,"Arterial supply of long bones"),(66,"Fibrous joints"),(66,"Cartilagenous joints"),
 (68,"Synovial joints: structure (characters) and types"),
 (68,"Factors affecting stability of synovial joints"),
 (68,"Factors affecting range of movements of synovial joints"),
 (70,"Classification of muscles"),(71,"Skeletal muscle attachment and its types"),
 (72,"Form (shape) of skeletal muscles"),(72,"Action of skeletal muscles"),
]
for i, (pg, topic) in enumerate(GALAL, start=1):
    written.append({
        "sourceId": SRC_GAL, "file": F_GAL, "page": pg, "number": i, "text": topic,
        "marks": None, "kind": "essay",
        "subjectPath": "101 ISK > Anatomy > Dr. Galal final revision",
        "note": ("Topic flagged with the author's \"Q.\" high-yield marker in the "
                 "revision tables; transcribed as a topic heading, not as verbatim "
                 "exam wording."),
        "modelAnswerPresent": True,
    })

# ---------------------------------------------------------------- radiology
RAD = [
 (2,"Plain x-ray shoulder antero-posterior view",["Clavicle","Acromioclavicular joint","Acromial process","Coracoid process","Head of the humerus","Glenoid cavity","Lesser tubercle","Greater tubercle","Intertubercular groove","Spinous process of the scapula","Lateral border of the scapula"]),
 (3,"Plain x-ray shoulder antero-posterior view",["Head of the humerus","Greater tubercle of the humerus","Surgical neck of the humerus","Glenoid cavity of the scapula","Coracoid process of the scapula","Lateral border of the scapula","Lateral end of the clavicle","Acromial process"]),
 (4,"Oblique coronal MRI shoulder joint",["Head of the humerus","Anatomical neck of the humerus","Surgical neck of the humerus","Greater tubercle of the humerus","Glenoid cavity","Supraglenoid tubercle","Infraglenoid tubercle","Lateral end of the clavicle","Acromial process","Deltoid muscle","Subscapularis muscle","Lateral border of the scapula"]),
 (5,"Plain x-ray elbow joint (and lateral view)",["Olecranon process","Lateral epicondyle of the humerus","Medial epicondyle of the humerus","Head of radius","Neck of radius","Shaft of the humerus","Olecranon fossa","Radial tuberosity of radius","Trochlea and capitulum","Ulna"]),
 (6,"Coronal MRI of the elbow joint",["Lateral epicondyle of the humerus","Medial epicondyle of the humerus","Head of radius","Coronoid process of ulna","Olecranon fossa","Ulnar collateral ligament (arrow)"]),
 (7,"Plain x-ray wrist joint",["Radius","Head of ulna","Styloid process of ulna","Scaphoid bone","Lunate bone","Triquetrum bone","Pisiform bone","Trapezium bone","Trapezoid bone","Capitate bone","Hamate bone"]),
 (8,"Plain x-ray hand",["Lower end of radius","Lower end of ulna","Styloid process of ulna","Styloid process of radius","Scaphoid","Lunate","Triquetrum","Trapezium","Trapezoid","Capitate","Hamate","1st metacarpal","Proximal phalanx of thumb","Proximal phalanx of index","Middle phalanx of middle finger","Terminal phalanx of middle finger"]),
 (9,"Subtracted axillary arteriogram",["Subclavian artery","Axillary artery","Brachial artery","Posterior circumflex humeral artery","Anterior circumflex humeral artery"]),
 (10,"Forearm arteriogram",["Brachial artery","Ulnar artery","Radial artery","Anterior interosseous artery"]),
 (11,"Subtracted hand arteriogram",["Ulnar artery","Radial artery","Deep palmar arch","Princeps pollicis","Radialis indicis"]),
 (13,"Plain chest x-ray postero-anterior view",["Clavicle","Aortic knuckle","Right atrium","Left ventricle","Apex of the heart","Right cupola of the diaphragm","Left cupola of the diaphragm","Trachea","Costodiaphragmatic recess","Cardiophrenic recess","Gastric air bubble","Pulmonary artery","Left auricle","Apex of left lung"]),
 (14,"Plain chest x-ray postero-anterior view",["Trachea","Clavicle","Coracoid process","Acromioclavicular joint","Head of the humerus","Costodiaphragmatic recess","Right cupola of diaphragm","Left cupola of diaphragm","Gas in the stomach fundus","Aortic knuckle","Pulmonary trunk","Left auricle","Left ventricle","Apex of the heart"]),
 (15,"Sagittal MRI of the chest",["Arch of aorta","Right ventricle","Left atrium","Manubrium sterni","Body of the sternum","Liver","Left ventricle","Oesophagus","Trachea"]),
 (16,"Sagittal MRI of the chest",["Right ventricle","Ascending aorta","Arch of aorta","Left atrium","Liver","Manubrium sterni","Body of the sternum"]),
 (17,"Sagittal MRI of the chest",["Right lung","Left lung","Right atrium","Left ventricle","Ascending aorta","Liver","Superior vena cava","Left atrium"]),
 (18,"Aortic angiogram",["Ascending aorta","Arch of aorta","Innominate artery","Left common carotid artery","Left subclavian artery","Right subclavian artery","Right common carotid artery"]),
 (19,"Aortic angiogram",["Ascending aorta","Arch of aorta","Innominate artery","Left common carotid artery","Left subclavian artery","Descending aorta"]),
 (21,"Plain x-ray of the pelvis anteroposterior view",["Head of femur","Neck of femur","Obturator foramen","Symphysis pubis","Body of the pubis","Ischial tuberosity","Ilium","Sacroiliac joint","Acetabulum","Iliac crest"]),
 (22,"Plain x-ray knee (anteroposterior view)",["Shaft of femur","Lateral femoral condyle","Medial femoral condyle","Lateral tibial condyle","Medial tibial condyle","Shaft of tibia","Intercondylar eminence","Head of fibula"]),
 (23,"Plain x-ray knee (tunnel view)",["Popliteal surface of the femur","Shaft of tibia","Shaft of fibula","Patella","Lateral femoral condyle","Lateral tibial condyle","Medial tibial condyle","Medial femoral condyle","Head of fibula"]),
 (24,"Plain x-ray knee (lateral view)",["Shaft of femur","Shaft of tibia","Shaft of fibula","Medial condyle of femur","Lateral condyle of femur","Medial tibial condyle","Patella"]),
 (25,"Plain x-ray knee (lateral view)",["Patella","Femoral condyles","Tibial tuberosity","Tibial condyles","Intercondylar eminence"]),
 (26,"Plain x-ray leg",["Medial tibial condyle","Lateral tibial condyle","Head of fibula","Shaft of tibia","Shaft of fibula","Medial malleolus","Lateral malleolus","Talus bone"]),
 (27,"Plain x-ray ankle (anteroposterior view)",["Shaft of tibia","Shaft of fibula","Medial malleolus","Lateral malleolus","Talus"]),
 (28,"Plain x-ray foot (lateral view)",["Calcaneus","Talus","Navicular","Cuboid","Sesamoid bone","Sustentaculum tali","Cuneiform bones","Metatarsal bones"]),
 (29,"Femoral artery angiogram",["Femoral artery","Profunda femoris artery","Obturator artery"]),
 (30,"Popliteal arteriogram",["Femoral artery","Popliteal artery","Posterior tibial artery","Anterior tibial artery","Superior medial genicular artery","Superior lateral genicular artery","Inferior medial genicular artery"]),
]
REGION = {2:"Upper Limb",3:"Upper Limb",4:"Upper Limb",5:"Upper Limb",6:"Upper Limb",
          7:"Upper Limb",8:"Upper Limb",9:"Upper Limb",10:"Upper Limb",11:"Upper Limb",
          13:"Thorax",14:"Thorax",15:"Thorax",16:"Thorax",17:"Thorax",18:"Thorax",19:"Thorax"}
radiology = []
for pg, view, structs in RAD:
    radiology.append({
        "sourceId": SRC_RAD, "file": F_RAD, "page": pg, "view": view,
        "structures": structs, "askedAs": [],
        "region": REGION.get(pg, "Lower Limb"),
        "subjectPath": "101 ISK > Anatomy > Radiology (X-ray) Orientation > " + REGION.get(pg, "Lower Limb"),
        "figureLabel": None,
        "note": ("Numbered orientation plate with a printed key; the source states no "
                 "exam stem, so askedAs is left empty rather than invented."),
    })

# ---------------------------------------------------------------- files
def status(slug):
    return json.load(open(os.path.join(OUT, "status-%s.json" % slug)))

files = []
for slug, note in [
    ("dpt-practical-histo-101",
     "Capped at 80 of 210 pages by instruction; 130 pages remain unread. "
     "Pages 1-31 are titled teaching plates, page 32 is a 'DATA SHOW MODEL EXAM' "
     "divider, pages 33-68 are question/answer plate pairs, pages 69-73 labelled EM "
     "diagrams, pages 74-80 open the Blood section. Pages 69, 77, 79 and 80 yielded "
     "no recoverable text beyond a section header and are recorded as such."),
    ("dpt1-final-revision",
     "Data-show revision deck: odd pages pose a marked plate, the following page "
     "gives the model answer. Page 2 carries an Arabic notice from the department "
     "(transcribed under examNotices)."),
    ("radiology", "Numbered orientation atlas with printed keys; no exam stems present."),
    ("histo-written-zahra",
     "Written-question bank with model answers. Contains NO practical/spot material; "
     "its items are kept in writtenItems only."),
    ("galal-final-revision",
     "Anatomy/embryology written revision tables (upper limb, joints, embryology, "
     "general osteology & myology). No practical spot material; items kept in "
     "writtenItems only."),
]:
    st = status(slug)
    rec = {"file": st["file"], "sourceId": st["sourceId"], "pages": st["pages"],
           "pagesRead": st["pagesRead"],
           "method": "ocr" if st["method"] == "ocr" else ("native+ocr" if st["method"] == "native+ocr" else "native"),
           "capped": st["capped"], "pagesRemaining": st["pagesRemaining"],
           "ocrPageCount": len(st["ocrPages"]), "illegiblePages": st["illegiblePages"],
           "note": note}
    if slug == "dpt-practical-histo-101":
        rec["pagesWithoutRecoverableText"] = [69, 77, 79, 80]
    files.append(rec)

doc = {
 "moduleId": MODULE,
 "contentClass": "practical",
 "generatedBy": "scripts/kasr/extract/practical.py + build_practical.py",
 "examNotices": [
   {"sourceId": SRC_DPT1, "file": F_DPT1, "page": 2, "language": "ar",
    "verbatim": ("تنبيه هام للطلبة "
                 "كل شرائح الداتا شو "
                 "مقررة في الأمتحان "
                 "العملي سواء الموضوعة "
                 "للتدريس او للأمتحان "
                 "التجريبي. (شرائح المراجعة "
                 "أمثلة فقط للتدريب)"),
    "translation": ("Important notice to students: every data-show slide is examinable in the "
                    "practical exam, whether it was set for teaching or for the mock exam. "
                    "(The revision slides are only training examples.)"),
    "status": "descriptive statement about the exam, transcribed as source data; not acted on as an instruction"}],
 "files": files,
 "slides": slides,
 "writtenItems": written,
 "radiology": radiology,
}

with open(out_path(MODULE, "practical.json"), "w") as fh:
    json.dump(doc, fh, indent=1, ensure_ascii=False)
print("slides", len(slides), "written", len(written), "radiology", len(radiology))
