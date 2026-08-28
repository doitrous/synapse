#!/usr/bin/env python3
"""Merge pages 81-210 of DPT Practical Histo 101 into practical.json."""
import json, os

OUT = os.path.dirname(os.path.abspath(__file__))
SRC = "src_b4cb8bf9f0c7a6584b4b"
F = "DPT Practical Histo 101 (1).pdf"
BLD = "101 ISK > Histology > Blood"
CT  = "101 ISK > Histology > Connective Tissue"
EPI = "101 ISK > Histology > Epithelium"
PLATE = ('Full-page teaching plate captioned "%s"; the micrograph itself is a raster '
         'image whose visual content is not recoverable from the PDF text layer.')

doc = json.load(open(os.path.join(OUT, "practical.json")))
new = []

def plate(page, title, sub, feats=None, stain=None, desc=None, extra=None):
    s = {"sourceId": SRC, "file": F, "page": page, "title": title, "stain": stain,
         "magnification": None, "identifyingFeatures": feats or [], "askedAs": [],
         "subjectPath": sub, "hasImage": True, "imageDescription": desc or (PLATE % title)}
    if extra: s.update(extra)
    new.append(s)

def qa(qp, ap, title, sub, feats, asked, markers, stain=None, extra=None):
    s = {"sourceId": SRC, "file": F, "page": qp, "title": title, "stain": stain,
         "magnification": None, "identifyingFeatures": feats, "askedAs": asked,
         "subjectPath": sub, "hasImage": True, "answerPage": ap,
         "imageDescription": ("Micrograph carrying coloured examiner markers (%s); the "
                              "facing answer page identifies each marked structure." % markers)}
    if extra: s.update(extra)
    new.append(s)

# ---- Blood teaching plates (74-89 block; 74-78 already catalogued) ----
plate(77, "Neutrophil", BLD,
      ["cytoplasm", "granules", "multilobulated nucleus"],
      desc=("Labelled neutrophil plate; the printed labels (cytoplasm, granules, "
            "multilobulated nucleus) were recovered only at 400 dpi OCR."),
      extra={"ocrNote": "title and labels recovered at 400 dpi / --psm 11; illegible at 120 dpi"})
plate(79, "Eosinophil", BLD, ["membrane", "secretion granule", "cytoplasm"],
      desc="Labelled eosinophil plate; labels recovered at 300 dpi OCR.",
      extra={"ocrNote": "recovered at 300 dpi / --psm 4"})
plate(80, "Basophil", BLD, [],
      desc="Basophil plate; the heading was recovered at 400 dpi OCR, no further labels legible.",
      extra={"ocrNote": "title recovered at 400 dpi / --psm 11"})
plate(81, "Lymphocyte", BLD, ["narrow rim of cytoplasm"],
      extra={"ocrNote": "title recovered at 350 dpi / --psm 11"})
plate(82, "Monocyte", BLD, [], extra={"ocrNote": "title recovered at 350 dpi / --psm 11"})
plate(83, "A blood film showing different blood elements", BLD,
      ["neutrophil", "eosinophil", "basophil"],
      desc=("Blood-film overview plate with printed leader labels naming the "
            "leucocyte types visible in the field."))
plate(84, "Platelet", BLD, [], extra={"ocrNote": "title recovered at 350 dpi / --psm 11"})
plate(85, "Blood/bone-marrow plate (heading not legible)", BLD, [],
      desc=("Plate whose heading did not resolve; the page prints an external image "
            "source URL, transcribed under sourceUrlOnPage."),
      extra={"sourceUrlOnPage": "http://www.lab.anhb.uwa.edu.au/mb140/CorePages/Blood/images/bma11he.jpg",
             "rightsFlag": "third-party image credited on the plate; licence unverified"})
plate(86, "Megakaryocyte (annotated)", BLD, ["blue arrow = megakaryocyte"],
      desc="Marrow plate already annotated on the page: the blue arrow marks a megakaryocyte.")
plate(87, "Megakaryocyte", BLD, [])
plate(88, "Untitled blood plate", BLD, [],
      desc=("Plate with no recoverable caption at 120 or 350 dpi; recorded as a "
            "caption-less micrograph rather than guessed at."),
      extra={"captionLegible": False})

# ---- Blood Q/A pairs 90-115 ----
LEISH = "Leishman"
qa(90, 91, "Blood film - neutrophil, platelet, RBC, crenated RBC", BLD,
   ["neutrophil: segmented / multilobed nucleus (red arrow)", "platelet (black arrow)",
    "RBC with central pallor (green arrow)", "crenated RBC (blue arrow)"],
   ["This is a ..., stained by ...",
    "Red arrow points to ... characterized by ..., while black arrow points to ...",
    "Green arrow points to ..., characterized by ...", "Blue arrow points to ..."],
   "red, black, green, blue arrows", LEISH)
qa(92, 93, "Blood film - neutrophil with Barr body", BLD,
   ["neutrophil: segmented / multilobed nucleus (red arrow)", "Barr body (green arrow)",
    "RBC with central pallor (black arrow)", "platelets (yellow arrow)"],
   ["This is a ..., stained by ...",
    "Red arrow points to ... characterized by ..., while the green arrow points to ...",
    "Black arrow points to ..., characterized by ...", "Yellow arrow points to ..."],
   "red, green, black, yellow arrows", LEISH)
qa(94, 95, "Blood film - eosinophil", BLD,
   ["eosinophil: eosinophilic granules & bilobed nucleus (blue arrow)",
    "RBC with central pallor (black arrow)", "platelet (green arrow)"],
   ["This is a ..., stained with ...",
    "Blue arrow points to ..., characterized by ... granules & ... nucleus",
    "Black arrow points to ..., characterized by ...", "Green arrow points to ..."],
   "blue, black, green arrows", LEISH)
qa(96, 97, "Blood film - basophil", BLD,
   ["basophil: basophilic granules, nucleus S-shaped / masked by granules (red arrow)",
    "RBC with central pallor (black arrow)", "platelet (yellow arrow)"],
   ["This is a ..., stained with ...",
    "Red arrow points to ..., characterized by ... granules & nucleus is ...",
    "Black arrow points to ..., which is characterized by ...", "Yellow arrow points to ..."],
   "red, black, yellow arrows", LEISH)
qa(98, 99, "Blood film - basophil (single marker)", BLD, ["basophil"],
   ["This is a ..., stained with ...", "The arrow points to ..."], "one arrow", LEISH)
qa(100, 101, "Blood film - lymphocyte", BLD,
   ["lymphocyte: dark nucleus, thin rim / little cytoplasm (red arrow)",
    "RBC with central pallor (yellow arrow)", "platelet (black arrowheads)"],
   ["This is a ..., stained with ...",
    "Red arrow points to ..., characterized by ... nucleus surrounded by ... cytoplasm",
    "Yellow arrow points to ..., characterized by ...", "Black arrowheads point to ..."],
   "red arrow, yellow arrow, black arrowheads", LEISH)
qa(102, 103, "Blood film - platelets and lymphocytes (two fields)", BLD,
   ["platelets (arrow in field A)", "lymphocytes (boxed area in field B)"],
   ["The arrow in A points to ...", "The boxed area in B shows ..."],
   "two lettered fields A and B, one arrow, one box")
qa(104, 105, "Blood film - monocyte", BLD,
   ["monocyte: kidney shaped nucleus, frosted glass cytoplasm (blue arrow)",
    "lymphocyte (red arrow)", "RBC with central pallor (black arrow)"],
   ["This is a ..., stained with ...",
    "Blue arrow points to ..., characterized by ... nucleus and the cytoplasm shows ... appearance",
    "Red arrow points to ..., while black arrow points to ... which is characterized by ..."],
   "blue, red, black arrows", LEISH)
qa(106, 107, "Blood film - basophils", BLD,
   ["basophils: basophilic / large granules (blue arrows)",
    "RBC with central pallor (blue arrowhead)",
    "neutrophil with multilobed nucleus (red arrow)"],
   ["This is a ..., stained with ...",
    "Blue arrows point to ..., characterized by ... granules",
    "Blue arrowhead points to ..., characterized by ...",
    "Red arrow points to ..., characterized by ..."],
   "blue arrows, blue arrowhead, red arrow", LEISH)
qa(108, 109, "Bone marrow - fat cells", BLD,
   ["fat cells / adipocytes (red arrows)"],
   ["Identify the tissue", "The red arrows point to ..."], "red arrows")
qa(110, 111, "Bone marrow - megakaryocyte", BLD, ["megakaryocyte (blue arrow)"],
   ["Identify the tissue", "The blue arrow points to ..."], "blue arrow")
qa(112, 113, "Bone marrow - megakaryocytes", BLD, ["megakaryocytes (red arrows)"],
   ["Identify the tissue", "The red arrows point to ..."], "red arrows")
qa(114, 115, "Blood film - reticulocyte (supravital preparation)", BLD,
   ["reticulocyte", "cresyl blue is a supravital stain"],
   ["This is a ... stained with ... which is a ... stain",
    "Name the cell pointed out by red arrow"], "red arrow", "cresyl blue (supravital)")

# ---- Connective tissue teaching plates 118-137 ----
for pg, t in [(118,"Unilocular (White) Fat Cells"),(119,"Multilocular (Brown) Fat Cells"),
              (120,"Macrophage"),(121,"Mast cell"),(122,"Plasma cell"),(123,"Plasma cells"),
              (125,"Collagen fiber"),(126,"Elastic fiber"),(127,"Reticular fiber"),
              (129,"Loose areolar C.T."),(130,"White adipose C.T."),(131,"Brown adipose C.T."),
              (132,"Brown vs White adipose C.T."),(133,"Reticular C.T."),
              (134,"Yellow Elastic C.T."),(135,"Regular white fibrous C.T."),
              (136,"Irregular white fibrous C.T."),(137,"Mucoid C.T.")]:
    plate(pg, t, CT)

# ---- Connective tissue Q/A pairs 139-164 ----
qa(139, 140, "Mast cells", CT, ["numerous basophilic granules"],
   ["Name the cells pointed out by arrow heads", "List a visible character for the cell"],
   "arrowheads")
qa(141, 142, "Loose areolar connective tissue", CT,
   ["collagen fibers: condensed / bundles / acidophilic (blue arrow)",
    "elastic fibers: singly, thin, zigzag, acidophilic (green arrow)",
    "fibroblast cell or nucleus (arrowhead)", "matrix (star)"],
   ["Identify the tissue (be specific)", "Name fiber pointed by blue arrow & 1 character",
    "Name fiber pointed by green arrow & 1 character",
    "Arrow head points to ... & star marks ..."],
   "blue arrow, green arrow, arrowhead, star")
qa(143, 144, "Irregular white fibrous connective tissue", CT,
   ["fibrocyte (or fibroblast) (arrow)", "collagen bundles (arrowhead)"],
   ["Name cell pointed out by arrow", "Arrowhead points to ...",
    "What is the type of tissue (be specific)"], "arrow, arrowhead")
qa(145, 146, "Reticular connective tissue", CT,
   ["brown", "thin", "branching / anastomosing fibers"],
   ["Identify the type of tissue", "Mention a special stain for it",
    "List 2 visible characters for the tissue"], "unmarked field", "silver")
qa(147, 148, "Regular white fibrous connective tissue", CT,
   ["regular fibers", "thick bundles", "acidophilic", "presence of fibroblasts"],
   ["What is the type of tissue (be specific)", "List 2 visible characters"], "unmarked field")
qa(149, 150, "Yellow elastic connective tissue", CT,
   ["thin", "zigzag", "single fibers"],
   ["What is the type of tissue (be specific)", "List one visible character"], "unmarked field")
qa(151, 152, "Mast cells and plasma cells", CT,
   ["mast cells (yellow circles)", "plasma cells (green circles)", "granules (yellow arrow)",
    "nucleus (green arrow)", "negative Golgi image (black arrow)",
    "plasma cell nucleus: eccentric, single, cart-wheel (red arrow)"],
   ["Cells surrounded by yellow circles ... & green circles ...",
    "Yellow arrow points to ... & green arrow to ...", "Black arrow points to ...",
    "Mention 2 visible characters to nucleus pointed by red arrow"],
   "yellow circles, green circles, yellow/green/black/red arrows")
qa(153, 154, "White adipose connective tissue (unilocular fat cells)", CT,
   ["unilocular fat cells", "large / oval, single fat droplet", "fat droplet (blue stars)",
    "thin rim of cytoplasm (red arrow)"],
   ["Identify type of this C.T. ... formed of ... cells", "The cells can be stained by ... & ...",
    "Mention 2 visible characters of cells", "Blue stars mark ... & red arrow points to ..."],
   "blue stars, red arrow", "H&E and Sudan III")
qa(155, 156, "Brown adipose connective tissue (multilocular fat cells)", CT,
   ["multilocular fat cells", "small / rounded, many fat droplets", "nuclei (blue arrows)",
    "blood vessels (black arrows)"],
   ["Identify type of this C.T. ... formed of ... cells", "The cells can be stained by ... & ...",
    "Mention 2 visible characters of cells", "Blue arrows mark ... & black arrows point to ..."],
   "blue arrows, black arrows", "H&E and Sudan III")
qa(157, 158, "Reticular connective tissue", CT,
   ["reticular fibers (red arrows)", "brown", "thin", "branch & anastomose"],
   ["Identify type of C.T. ... & stain ...", "Red arrows point to ...",
    "Mention characters for B"], "red arrows", "silver")
qa(159, 160, "Elastic connective tissue", CT,
   ["yellow in the fresh state", "elastic fibers (red arrows)",
    "singly / thin / zigzag / acidophilic"],
   ["Type of C.T. is ... & in fresh state is ... colour",
    "It is stained ... colour with ... stain", "Red arrows demonstrate ...",
    "Give 2 visible characters for C"], "red arrows", "orcein (stains brown)")
qa(161, 162, "Regular fibrous connective tissue", CT,
   ["white in the fresh state", "nuclei of fibroblasts / fibrocytes (black arrows)",
    "collagen fibers (red arrows)", "parallel / regular / thick bundles / acidophilic"],
   ["Type of C.T. is ... & in fresh state is ... colour", "Black arrows point to ...",
    "Red arrows demonstrate ...", "Give 2 visible characters for C"],
   "black arrows, red arrows")
qa(163, 164, "Irregular fibrous connective tissue", CT,
   ["white in the fresh state", "nuclei of fibroblasts / fibrocytes (black arrows)",
    "collagen fibers (blue arrows)", "irregularly arranged / thick bundles / acidophilic"],
   ["Type of C.T. is ... & in fresh state is ... colour", "Black arrows point to ...",
    "Blue arrows demonstrate ...", "Give 2 visible characters for C"],
   "black arrows, blue arrows")

# ---- Epithelium teaching plates 167-183 ----
for pg, t in [(167,"Simple Squamous Epithelium"),(168,"Simple squamous Epithelium"),
              (169,"Simple Squamous Epithelium (blood vessel)"),
              (171,"Simple Cubical Epithelium - Thyroid follicles"),
              (172,"Simple Cubical Epithelium - Renal tubules"),
              (174,"Simple Columnar Epithelium"),
              (175,"Pseudostratified columnar ciliated epithelium with goblet cells"),
              (176,"Pseudostratified columnar ciliated epithelium with goblet cell"),
              (177,"Pseudostratified columnar ciliated epithelium with stereocilia"),
              (179,"Stratified Squamous epithelium"),
              (180,"Stratified Squamous epithelium - non-keratinized vs keratinized"),
              (181,"Transitional Epithelium"),(182,"Transitional Epithelium")]:
    plate(pg, t, EPI)
for pg, t in [(170,"Simple Cubical Epithelium"),(173,"Simple columnar epithelium"),
              (183,"Transitional Epithelium")]:
    plate(pg, t, EPI, extra={"uncertainPlate": True,
          "note": "carries the bare title without the running page breadcrumb; may be a "
                  "sub-section title slide rather than a specimen plate"})

# ---- Epithelium Q/A pairs 185-210 ----
qa(185, 186, "Simple squamous epithelium", EPI, ["epithelial cells", "simple squamous"],
   ["Arrows point to ..., its type is ..."], "arrows")
qa(187, 188, "Simple cubical epithelium", EPI, ["basement membrane (black arrow)"],
   ["Identify the epithelial type", "Black arrow is pointing to ..."], "black arrow")
qa(189, 190, "Stratified cuboidal (transitional) epithelium", EPI,
   ["nickname: transitional epithelium", "dome-shaped cells", "binucleated cells",
    "1: dome cells / superficial layer",
    "2: basement membrane OR cuboidal cells / basal layer"],
   ["Name type of epithelium & its nickname", "Mention one visible character for it",
    "1 & 2 point to ..."], "numbered labels 1 and 2")
qa(191, 192, "Pseudostratified columnar ciliated epithelium with goblet cells", EPI,
   ["cilia (black arrow)", "goblet cells (yellow arrows)"],
   ["What is the type of epithelium?", "The black arrow points to ...",
    "The yellow arrows point to ..."], "black arrow, yellow arrows")
qa(193, 194, "Simple squamous epithelium", EPI,
   ["nucleus flat / single (arrowhead)", "basement membrane (yellow arrow)"],
   ["Identify type of epithelium in the rectangle", "Arrowhead points to ...",
    "One visible feature for B", "Yellow arrow points to ..."],
   "rectangle, arrowhead, yellow arrow")
qa(195, 196, "Simple cubical epithelium", EPI,
   ["nuclei rounded / central / single (arrowheads)", "basement membrane (yellow arrow)"],
   ["Identify type of epithelium", "Arrowheads point to ...", "One visible feature for B",
    "Yellow arrow points to ..."], "arrowheads, yellow arrow")
qa(197, 198, "Simple squamous and simple cubical epithelium", EPI,
   ["simple squamous: flat cells, one layer", "nuclei flat / single / central (blue arrows)",
    "simple cubical: square shape, short cells, single layer",
    "nuclei rounded / central / single (red arrows)"],
   ["Identify epithelium in a ... & 1 feature", "Blue arrows point to ... & give 1 feature",
    "Identify epithelium in b ... & 1 feature",
    "Give 1 feature to structure pointed by red arrows"],
   "fields a and b, blue arrows, red arrows")
qa(199, 200, "Simple columnar epithelium", EPI,
   ["tall cells", "one layer", "oval basal nuclei"],
   ["Identify type of epithelium", "Mention 1 visible feature for A",
    "Name the structure pointed to by yellow arrow", "Mention 1 visible feature for B"],
   "yellow arrow")
qa(201, 202, "Pseudostratified columnar ciliated epithelium", EPI,
   ["tall cells", "1 cell layer", "crowded nuclei", "cilia (blue arrow)",
    "basement membrane (green arrow)", "goblet cell (red arrow)",
    "connective tissue (star)"],
   ["Identify the epithelium", "Mention 2 visible characters",
    "Blue arrow points to ... & green arrow ...",
    "Cell pointed by red arrow is ... & star marks ..."],
   "blue, green, red arrows and a star")
qa(203, 204, "Keratinized stratified squamous epithelium", EPI,
   ["horny layer / keratin, acidophilic condensed layers (yellow arrow)",
    "intermediate layers, polyhedral cells, rounded nuclei (green arrow)",
    "connective tissue (blue star)"],
   ["Identify the epithelium", "Yellow arrow points to ... & give 1 feature",
    "Green arrow points to ... & give 1 feature", "Name tissue marked by blue star"],
   "yellow arrow, green arrow, blue star")
qa(205, 206, "Non-keratinized stratified squamous epithelium", EPI,
   ["superficial layer: flat cells / flat nuclei (yellow arrow)",
    "intermediate layers: polyhedral cells, rounded nuclei (green arrow)",
    "connective tissue (blue star)"],
   ["Identify the epithelium", "Yellow arrow points to ... & give 1 feature",
    "Green arrow points to ... & give 1 feature", "Name tissue marked by blue star"],
   "yellow arrow, green arrow, blue star")
qa(207, 208, "Non-keratinized stratified squamous epithelium", EPI,
   ["1: squamous cells / superficial layer", "2: columnar cells / basal layer"],
   ["Identify epithelial type", "1 & 2 point to ..."], "numbered labels 1 and 2")
qa(209, 210, "Transitional epithelium", EPI,
   ["superficial layer: cuboidal / dome shaped cells, rounded nuclei (yellow arrow)",
    "intermediate layers: polyhedral cells, rounded nuclei (green arrow)",
    "connective tissue (blue star)"],
   ["This type of epithelium is called ...", "Yellow arrow points to ... & give 1 feature",
    "Green arrow points to ... & give 1 feature", "Name tissue marked by blue star"],
   "yellow arrow, green arrow, blue star")

# ---- merge: replace the three provisional 77/79/80 stubs if present ----
resolved = {77, 79, 80}
doc["slides"] = [s for s in doc["slides"]
                 if not (s["sourceId"] == SRC and s["page"] in resolved)]
doc["slides"].extend(new)
doc["slides"].sort(key=lambda s: (s["file"], s["page"]))

# ---- update the file record ----
tail = json.load(open(os.path.join(OUT, "status-dpt-practical-histo-101-tail.json")))
for f in doc["files"]:
    if f["sourceId"] == SRC:
        f["pagesRead"] = 210
        f["capped"] = False
        f["pagesRemaining"] = 0
        f["ocrPageCount"] = f["ocrPageCount"] + len(tail["ocrPages"])
        f["illegiblePages"] = []
        f["pagesWithoutRecoverableText"] = [69, 88, 184]
        f["note"] = (
            "Complete: all 210 pages read. The book is organised as four topic blocks "
            "(Cytology pp.1-73, Blood pp.74-115, Connective Tissue pp.116-164, "
            "Epithelium pp.165-210). Each block runs titled teaching plates, then an "
            "explicit test divider (p.32 'DATA SHOW MODEL EXAM', p.89 'BLOOD - Trial "
            "test', p.138 'Test', p.184), then question/answer plate pairs on "
            "consecutive pages. Pages 69, 88 and 184 carry no recoverable caption at "
            "120, 300 or 400 dpi and are recorded as caption-less rather than guessed. "
            "Pages 77, 79 and 80 were illegible at 120 dpi and were resolved by a "
            "300-400 dpi retry (Neutrophil, Eosinophil, Basophil). Page 85 prints a "
            "third-party image source URL, recorded on that slide.")
        f["structure"] = [
            {"pages": "1-31", "block": "Cytology", "type": "teaching plates"},
            {"pages": "32", "block": "Cytology", "type": "divider: DATA SHOW MODEL EXAM"},
            {"pages": "33-68", "block": "Cytology", "type": "question/answer plate pairs"},
            {"pages": "69-73", "block": "Cytology", "type": "labelled EM diagrams"},
            {"pages": "74-88", "block": "Blood", "type": "teaching plates"},
            {"pages": "89", "block": "Blood", "type": "divider: BLOOD - Trial test"},
            {"pages": "90-115", "block": "Blood", "type": "question/answer plate pairs"},
            {"pages": "116-137", "block": "Connective Tissue", "type": "teaching plates"},
            {"pages": "138", "block": "Connective Tissue", "type": "divider: Test"},
            {"pages": "139-164", "block": "Connective Tissue", "type": "question/answer plate pairs"},
            {"pages": "165-183", "block": "Epithelium", "type": "teaching plates"},
            {"pages": "184", "block": "Epithelium", "type": "divider (no recoverable text)"},
            {"pages": "185-210", "block": "Epithelium", "type": "question/answer plate pairs"},
        ]

doc.setdefault("findings", []).append({
    "finding": ("The 'DPT 1- ISK 101 - Final Revision' deck is largely a subset of this "
                "book's question/answer pairs, not independent material. Its epithelium "
                "pairs (pp.27-38) match book pp.197-210, its connective-tissue pairs "
                "(pp.40-55) match book pp.151-164, and its blood pairs (pp.57-64) match "
                "book pp.90-107. A content author should de-duplicate against the book "
                "rather than import both as distinct slides."),
    "evidence": "identical prompts, marker colours and model answers on the matched pages",
})

json.dump(doc, open(os.path.join(OUT, "practical.json"), "w"), indent=1, ensure_ascii=False)
print("slides", len(doc["slides"]), "added", len(new))
