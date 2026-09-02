<!--
  ASU-HCB · cellhz1 (scanned "CELL MCQ 1 2022" bank, block B) — pending-live
  sparse CONCEPT overlay.

  Every ## id below targets a concept that exists ONLY in an unimported batch
  from another lane — none is in server/data/medical-library-v1.json yet
  (checked via find-existing.mjs and a direct grep of the target file, not
  just a live-state guess). Apply this file ONLY after the named source file
  is live:

    A. docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md — university
       `kau`, module `101 ISK` (Histology/Cytology). block A of this same ASU
       module (cell-mcq-hegazy.pdf, epith-mcq.pdf) tests the same organelle
       and epithelium facts and independently overlays the same Kasr file —
       search-before-mint is university-blind, so the two lanes' overlays are
       expected to name the same handful of concepts without coordinating.

  Per LANE-BRIEF §6 rule 1/2 and the concepts manual (`## module_subject`
  fully replaces on every write — no `+` form): every row restates `## label`
  verbatim; `module_subject` restates the source's existing line plus ASU's
  own. `## universities`, `## learner_years` and `## modules` are true ID-list
  columns and take `+asu` / `+1` / `+ASU-HCB`.

  Every fact below is tested by `MCQs - cell MCQ hegazy 1.pdf` ("CELL MCQ 1
  2022", sourceId src_d2cac67a939cf291cf4b) only. Page numbers are the PDF's
  own printed page numbers (question numbers restart mid-document on p10,
  where Q20-23 print out of numeric sequence — noted per row).

  Simulate together with the source file, e.g.:
  node scripts/content/gate.mjs simulate \
    "docs/Ain-Shams-Source-Imports/pending-live/ASU-HCB-cellhz1-overlay-concepts.md" \
    docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    docs/Kasr-Source-Imports/article/101-ISK-histology.md \
    docs/Kasr-Source-Imports/article/101-ISK-histology-2.md \
    docs/Ain-Shams-Source-Imports/concept/ASU-HCB-cellhz1-mcq-concepts.md \
    docs/Ain-Shams-Source-Imports/article/ASU-HCB-cellhz1-mcq-articles.md \
    docs/Ain-Shams-Source-Imports/resource/ASU-HCB-cellhz1-resources.md \
    docs/Ain-Shams-Source-Imports/question/ASU-HCB-cellhz1-mcq.md
-->

# Item

## id
CON-FND-85CC08A33D0A88

## label
The cell membrane is a phospholipid bilayer with cholesterol, peripheral and integral proteins, and carbohydrate on its outer face

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > The cell
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q1 (ribophorins excluded, p1), Q3 (cholesterol not in cell coat, p1), Q6-Q11 (integral vs peripheral protein properties, p2-3) and Q12 (membrane functions, p3) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-F4B7458F8B8265

## label
The plasma membrane is a 7.5–10 nm trilaminar unit membrane, invisible in H&E and shown only by silver or PAS

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > The cell
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q2 ("unit membrane means", p1) and Q5 (membrane properties except LM visibility, p2) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-F2237ED98E88F3

## label
The cell coat is the carbohydrate of the outer membrane surface, and it does the cell's recognising, adhering and receiving

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > The cell
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q4 (cell coat functions, p1) and Q13-Q14 (cell coat composition, p4) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-29AD7E837E1E1E

## label
A mitochondrion is two membranes — a smooth outer one with porins and an inner one folded into cristae — around a matrix that holds its own DNA

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q16 (LM demonstration methods, p5), Q19 (double-membrane structure, p5) and Q20 (vital vs supravital staining, p10) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-B845AC57451E7F

## label
The mitochondrion makes the cell's ATP — Krebs cycle in the matrix, oxidative phosphorylation on the cristae — and in brown fat makes heat instead

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q17 (matrix contents, p5), Q18 (catalase excluded, p5), Q21 (functions except detoxification, p10) and Q24 (ATP synthase on cristae, p6) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-0B3CC0A79F9150

## label
Smooth endoplasmic reticulum is invisible in itself and known by the acidophilia it causes and its ribosome-free tubules

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q25 (sER functions except protein synthesis, p6), Q26 (EM appearance, p6) and Q27 (steroidogenic cells rich in sER not rER, p6) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-0E38E21957DB05

## label
Rough endoplasmic reticulum is flattened cisternae studded on the outside with ribosomes, and it makes and segregates protein for export

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q28-Q30 (rER role in protein synthesis/export, p7) of the ASU-HCB cellhz1 bank, and cited contextually on Q1 (ribophorins are an rER feature, not a membrane one, p1).

---

# Item

## id
CON-FND-60953640114635

## label
Free ribosomes make protein the cell keeps; attached ribosomes make protein it exports — and both together are why cytoplasm is basophilic

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q49 (diffuse basophilia excludes steroid cells, p13) of the ASU-HCB cellhz1 bank, and cited contextually on Q29 (rER causes localised, not diffuse, basophilia, p7).

---

# Item

## id
CON-FND-405BB5EA3C359E

## label
The Golgi is a stack of flat saccules with an entry and an exit face, and everything it buds off leaves from the exit face

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q33 (Golgi saccule orientation, p8) of the ASU-HCB cellhz1 bank, and cited contextually on Q28 (protein-secreting cells rich in Golgi, p7).

---

# Item

## id
CON-FND-9EBFBDE42AC100

## label
The Golgi apparatus is invisible in H&E except as a pale negative image, and its position follows the direction the cell secretes

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q31 (Golgi general properties, p7), Q32 (negative image in highly protein-secreting cells, p8) and Q34 (staining and polar/nonpolar cell position, p8) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-1ACE68A9080772

## label
A lysosome is a single-membrane bag of hydrolytic enzymes made in the rER, packed by the Golgi, and shown only by histochemistry

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q43 (lysosome properties except catalase staining, p11) and Q44 (acid phosphatase histochemistry, p11) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-9D325B98FC59A0

## label
A secondary lysosome is named by what the primary lysosome fused with, and all end as residual bodies

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q38 (secondary-lysosome acidity, p9), Q48 (lipofuscin as accumulated residual bodies, p12) and Q67 (lipofuscin as the membrane-bound inclusion, p17) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-195407DF67047D

## label
A peroxisome holds oxidases that make hydrogen peroxide and catalase that destroys it

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q47 (peroxisome properties, p12, no printed key — keyed editorially per the missing-key rule) of the ASU-HCB cellhz1 bank, and cited contextually on Q18 and Q43 (catalase belongs to the peroxisome, not the mitochondrion or lysosome, p5/p11).

---

# Item

## id
CON-FND-E66C68C0B80D16

## label
The membrane takes material in by phagocytosis, pinocytosis or receptor-mediated endocytosis, and puts it out by exocytosis

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q39-Q41 (pinocytosis/phagocytosis/exocytosis definitions, p9/p11), Q42 (clathrin coat, p11) and Q46 (coated-vesicle fate, p12) of the ASU-HCB cellhz1 bank, and cited contextually on Q45 (secretory vesicles are the one exception to plasma-membrane-derived vesicles, p12).

---

# Item

## id
CON-FND-0D6F0DC6CBAD60

## label
The proteasome, not the lysosome, destroys abnormal and short-lived proteins inside the cytosol

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Non-membranous organelles

## field_notes
asu: Tested as Q63 (proteasome is non-membranous, p16) of the ASU-HCB cellhz1 bank. No article in the corpus covered this concept before this batch; it is now covered by ART-FND-ASU-HCB-CELLHZ1-EXTRAS (docs/Ain-Shams-Source-Imports/article/ASU-HCB-cellhz1-mcq-articles.md).

---

# Item

## id
CON-FND-6D29BE5A5B1325

## label
The cytoskeleton is microtubules, microfilaments and intermediate filaments — and nothing else

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cytoskeleton

## field_notes
asu: Tested as Q51 (cytoskeleton components exclude myosin, p13) and Q64 (which components are polar structures, p16) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-6268E97A4A9F26

## label
Intermediate filaments are supportive, 8–10 nm, and each tissue has its own protein — which is what makes them diagnostic

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cytoskeleton

## field_notes
asu: Tested as Q52 (properties except polarity, p13) and Q54 (properties except dynein composition, p14) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-DAF4EB4BC63077

## label
A microfilament is a 5–7 nm strand of two coiled chains of actin, and it changes the shape of the cell

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cytoskeleton

## field_notes
asu: Tested as Q53 (properties except 10 nm diameter, p14) and Q55 (properties except mitotic spindle formation, p14) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-05D3B2832089AB

## label
A microtubule is a 24 nm hollow cylinder of thirteen protofilaments of alpha and beta tubulin, grown from the microtubule organising centre

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cytoskeleton

## field_notes
asu: Tested as Q56 (properties except stable non-polarised, p14), Q57 (colchicine and microtubule formation, p15), Q58 (assembly/disassembly at the MTOC, p15) and Q59 (MTOC membership excludes mitochondria, p15) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-F2650956ED1A0C

## label
A centriole is a cylinder of nine microtubule triplets — 27 microtubules — and a pair of them organises the mitotic spindle

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cytoskeleton

## field_notes
asu: Tested as Q60 (centriole structure except doublet count, p15) of the ASU-HCB cellhz1 bank, and cited contextually on Q59 (centriole is a true MTOC, p15).

---

# Item

## id
CON-FND-BBC8959FD63F56

## label
Cilia that cannot beat let secretions accumulate and infection follow, and because the sperm tail has the same axoneme the same defect causes male infertility

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations
ASU-HCB > Histology > Questions > Non-membranous organelles

## field_notes
asu: Cited contextually on Q61-Q62 (ciliary shaft structure and dynein-powered beating, p16) of the ASU-HCB cellhz1 bank as the clinical consequence of the same axoneme/dynein mechanism.

---

# Item

## id
CON-FND-30573B6D0A9AFD

## label
The nucleolus is an unbounded basophilic mass whose three dark parts are the rRNA gene, the new rRNA and the mature rRNA

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Nucleus
ASU-HCB > Histology > Questions > Non-membranous organelles

## field_notes
asu: Tested as Q50 (rRNA synthesis site, p13) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-2560DB7970AF40

## label
Organelles are living and essential, inclusions are not, and organelles divide into membranous and non-membranous

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Cytoplasm
ASU-HCB > Histology > Questions > Cytoplasmic inclusions

## field_notes
asu: Tested as Q66 (hemoglobin as the most numerous endogenous pigment, p17) of the ASU-HCB cellhz1 bank, and cited contextually on Q45 and Q67 (organelle/inclusion classification, p12/p17).

---

# Item

## id
CON-FND-D716C3939DB217

## label
Basal infoldings increase the basal surface area, with mitochondria stacked vertically between them to power active transport

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations
ASU-HCB > Histology > Questions > Cell biology

## field_notes
asu: Tested as Q22 (mitochondrial distribution in ion-transporting cells, p10) of the ASU-HCB cellhz1 bank.

---

# Item

## id
CON-FND-05C930A781CE55

## label
PAS and Best's carmine both show carbohydrate, which is why one pair of stains reddens glycogen, mucus, the basement membrane and the cell coat alike

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Introduction > Microtechniques
ASU-HCB > Histology > Questions > Cytoplasmic inclusions

## field_notes
asu: Cited contextually on Q65 (glycogen alpha/beta particle staining, p17) of the ASU-HCB cellhz1 bank.
