<!--
  ASU-HCB · Cell biology MCQ bank ("Cell MCQ set2", Dr. Hegazy, sourceId
  src_6c35f6fae7691b0bdcc8) — pending-live sparse CONCEPT overlay.

  Every ## id below targets a concept that exists ONLY in an unimported Kasr
  batch (checked directly against server/data/medical-library-v1.json — none
  of these ids is live yet), found by find-existing.mjs / direct grep of:

    A. docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md — university
       `kau`, module `101 ISK` (Histology cytology). Kasr's 101-ISK cytology
       chapter tests the same generic organelle/cytoskeleton/nucleus facts as
       this ASU-HCB bank, fact for fact.
    B. docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md —
       university `kau`, module `108 INT` (necrosis morphology — pyknosis).

  Each record names which target (A/B) it applies to. Per the concepts manual
  and CLAIMS.md precedent (2026-08-22/23 AU-MED-102/103 entries): `## label`
  is restated verbatim (the merge key), `## universities` / `## learner_years`
  / `## modules` are true ID-list columns and take `+asu` / `+1` / `+ASU-HCB`,
  while `## module_subject` and `## exam_signal` do NOT take `+` — both are
  written here as the existing value plus this lane's own new line, never as
  a bare replacement (checked directly against each target record before
  writing, so nothing existing is erased).

  Four cytology facts already have narrower ASU-HCB-specific concepts minted
  in concept/ASU-HCB-foundations-concepts.md from a *lecture* source (proton
  pump lumen acidification cell.lysosome.lumen-acidification, membrane
  protection cell.lysosome.membrane-protection, rER-Golgi hydrolase routing
  cell.lysosome.formation-rer-golgi-endosome, autophagy
  cell.lysosome.autophagy-old-organelles) — those are REUSED directly by this
  MCQ batch's questions (already `asu`-tagged, no overlay needed) rather than
  duplicated here; see the question seed's concept_ids for where each is used
  (cell-q06, cell-q08).

  Simulate together with the source files each block targets, e.g.:
  npm run medical:simulate -- "docs/Ain-Shams-Source-Imports/pending-live/ASU-HCB-cell-mcq-overlay-concepts.md" \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md
-->

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

## exam_signal
src_d1414701d8fcb55932b6 | question_book | | p5 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p22 | 101 ISK
src_6846577508f49244d715 | question_book | | p4 | 101 ISK
src_6846577508f49244d715 | question_book | | p14 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p11 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p4 | 101 ISK
src_6846577508f49244d715 | question_book | | p24 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p24 | 101 ISK
src_6846577508f49244d715 | question_book | | p1 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p7 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p18 | 101 ISK
src_16f747e1171423933757 | question_book | | p2 | 101 ISK
src_6846577508f49244d715 | question_book | | p5 | 101 ISK
src_6846577508f49244d715 | question_book | | p6 | 101 ISK
src_6846577508f49244d715 | question_book | | p25 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p4 | 101 ISK
src_6846577508f49244d715 | question_book | | p13 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p1 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p1 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q01 (zymogen granule formation, p1), cell-q03 (transfer vesicles rER→Golgi, p1) and cell-q14 (clathrin-coated vesicles pinch off the plasma membrane, contrasted with Golgi coated-vesicle output, p3) of the ASU-HCB cell MCQ bank.

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

## exam_signal
src_4a8ddb5edfab86d624d8 | question_book | | p3 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p26 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p8 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p21 | 101 ISK
src_6846577508f49244d715 | question_book | | p21 | 101 ISK
src_6846577508f49244d715 | question_book | | p20 | 101 ISK
src_6846577508f49244d715 | question_book | | p22 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p20 | 101 ISK
src_6846577508f49244d715 | question_book | | p5 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p1 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q04 (lysosomes digest phagocytosed bacteria, p1) and cell-q09 (lysosome demonstrated by histochemical/acid-phosphatase stain, p2) of the ASU-HCB cell MCQ bank.

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

## exam_signal
src_6846577508f49244d715 | question_book | | p5 | 101 ISK
src_6846577508f49244d715 | question_book | | p22 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p18 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p3 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p9 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p8 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p9 | 101 ISK
src_6846577508f49244d715 | question_book | | p14 | 101 ISK
src_ce4292e31edea7517e7b | question_book | | p1 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p7 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p22 | 101 ISK
src_9487fd713153c573087f | question_book | | p1 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p2 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p2 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q07/cell-q39 (lipofuscin as the age pigment left in the residual body, p2/p7), cell-q10/cell-q11 (primary-vs-secondary lysosome distinction, p2) and cell-q12 (residual body definition, p3) of the ASU-HCB cell MCQ bank.

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

## exam_signal
src_4a8ddb5edfab86d624d8 | question_book | | p3 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p4 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p6 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p9 | 101 ISK
src_6846577508f49244d715 | question_book | | p14 | 101 ISK
src_6846577508f49244d715 | question_book | | p22 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p7 | 101 ISK
src_6846577508f49244d715 | question_book | | p6 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p14 | 101 ISK
src_6846577508f49244d715 | question_book | | p19 | 101 ISK
src_6846577508f49244d715 | question_book | | p25 | 101 ISK
src_6846577508f49244d715 | question_book | | p21 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p5 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p2 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p3 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q15 (oxidative detoxification function, p3) and cell-q16 (kidney/liver tissue distribution, p3) of the ASU-HCB cell MCQ bank.

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

## exam_signal
src_4a8ddb5edfab86d624d8 | question_book | | p3 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p4 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p27 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p2 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p25 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p3 | 101 ISK
src_6846577508f49244d715 | question_book | | p4 | 101 ISK
src_6846577508f49244d715 | question_book | | p3 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p13 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p11 | 101 ISK
src_6846577508f49244d715 | question_book | | p19 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p22 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p11 | 101 ISK
src_6846577508f49244d715 | question_book | | p12 | 101 ISK
src_6846577508f49244d715 | question_book | | p24 | 101 ISK
src_6846577508f49244d715 | question_book | | p9 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p1 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p3 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q17 (free ribosomes form protein used by the cell itself, p3) of the ASU-HCB cell MCQ bank.

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
ASU-HCB > Histology > Questions > Cell biology

## exam_signal
src_6846577508f49244d715 | question_book | | p18 | 101 ISK
src_4a8ddb5edfab86d624d8 | question_book | | p4 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p4 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q18 (mitotic cyclins degraded by the proteasome), cell-q19 (proteasome vs lysosome substrate) and cell-q20 (short-lived abnormal proteins degraded by proteasome), all p4, of the ASU-HCB cell MCQ bank.

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
ASU-HCB > Histology > Questions > Cell biology

## exam_signal
src_d1414701d8fcb55932b6 | question_book | | p21 | 101 ISK
src_6846577508f49244d715 | question_book | | p7 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p11 | 101 ISK
src_6846577508f49244d715 | question_book | | p15 | 101 ISK
src_6846577508f49244d715 | question_book | | p19 | 101 ISK
src_2944234d11e92ac4bbc8 | question_book | | p5 | 101 ISK
src_34c967631e388497dc35 | question_book | | p9 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p9 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p4 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q21 (structures sharing in cytoskeleton formation, p4) of the ASU-HCB cell MCQ bank.

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
ASU-HCB > Histology > Questions > Cell biology

## exam_signal
src_6846577508f49244d715 | question_book | | p16 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p13 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p12 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p1 | 101 ISK
src_9487fd713153c573087f | question_book | | p1 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p5 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p28 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p4 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p4 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q22 (diameter and distribution, p4), cell-q23 (classification excludes actin/myosin, p4) and cell-q28 (lamins line the inner nuclear envelope, p5) of the ASU-HCB cell MCQ bank.

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
ASU-HCB > Histology > Questions > Cell biology

## exam_signal
src_bb081b0479f7a33666cd | question_book | | p4 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p27 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p6 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p30 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p12 | 101 ISK
src_6846577508f49244d715 | question_book | | p20 | 101 ISK
src_6846577508f49244d715 | question_book | | p15 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p11 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p14 | 101 ISK
src_6846577508f49244d715 | question_book | | p9 | 101 ISK
src_6846577508f49244d715 | question_book | | p25 | 101 ISK
src_6846577508f49244d715 | question_book | | p10 | 101 ISK
src_9487fd713153c573087f | question_book | | p4 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p4 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q24 (functions overview, p4) and cell-q27 (13 protofilaments, p5) of the ASU-HCB cell MCQ bank.

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
ASU-HCB > Histology > Questions > Cell biology

## exam_signal
src_6846577508f49244d715 | question_book | | p3 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p20 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p14 | 101 ISK
src_6846577508f49244d715 | question_book | | p22 | 101 ISK
src_6846577508f49244d715 | question_book | | p8 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p18 | 101 ISK
src_6846577508f49244d715 | question_book | | p10 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p28 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p14 | 101 ISK
src_6846577508f49244d715 | question_book | | p4 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p5 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q25 (microtubule assembly initiated near the centrioles, p5) of the ASU-HCB cell MCQ bank.

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
ASU-HCB > Histology > Questions > Cell biology

## exam_signal
src_bb081b0479f7a33666cd | question_book | | p7 | 101 ISK
src_4a8ddb5edfab86d624d8 | question_book | | p7 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p14 | 101 ISK
src_9487fd713153c573087f | question_book | | p1 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p5 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q26 (immotile cilia syndrome caused by lack of dynein arms, p5) of the ASU-HCB cell MCQ bank. Note for a future article pass: this concept's own text does not spell out "dynein arm defect" as the mechanism (it states the downstream infection/infertility picture) — a one-line mechanism addition to an ASU-HCB article would close that teaching gap, logged rather than fixed here since concept `## definition` is Kasr-owned content.

---

# Item

## id
CON-FND-C5C16B3F123155

## label
The nuclear envelope is two membranes with a perinuclear space, pierced by pore complexes of nucleoporin

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
101 ISK > Histology > Cytology > Nucleus
ASU-HCB > Histology > Questions > Cell biology

## exam_signal
src_6846577508f49244d715 | question_book | | p6 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p5 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p14 | 101 ISK
src_6846577508f49244d715 | question_book | | p18 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p16 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p29 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p2 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p5 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q29 (lamin-chromatin anchoring in interphase, p5), cell-q30 (outer envelope continuous with rER, p6), cell-q31 (nuclear pore transport function, p6) and cell-q32 (envelope asymmetry / mitotic disassembly, p6) of the ASU-HCB cell MCQ bank.

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
ASU-HCB > Histology > Questions > Cell biology

## exam_signal
src_bb081b0479f7a33666cd | question_book | | p6 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p29 | 101 ISK
src_ce4292e31edea7517e7b | question_book | | p1 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p30 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p16 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p17 | 101 ISK
src_6846577508f49244d715 | question_book | | p18 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p20 | 101 ISK
src_6846577508f49244d715 | question_book | | p23 | 101 ISK
src_9487fd713153c573087f | question_book | | p2 | 101 ISK
src_9e6aad6c6af097e473d6 | question_book | | p2 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p6 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q33 (EM structure / rRNA role), cell-q34 (prominent in protein-secreting cells), cell-q35 (rRNA synthesis site), cell-q36 (EM appearance, pars fibrosa/granulosa) and cell-q37 (nucleolar organizer region carries the rDNA genes), all p6-7, of the ASU-HCB cell MCQ bank.

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
ASU-HCB > Histology > Questions > Cell biology

## exam_signal
src_6846577508f49244d715 | question_book | | p8 | 101 ISK
src_6846577508f49244d715 | question_book | | p25 | 101 ISK
src_9487fd713153c573087f | question_book | | p2 | 101 ISK
src_6846577508f49244d715 | question_book | | p11 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p1 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p19 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p7 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q40 (PAS-positive pink granules in liver cells identified as a glycogen inclusion, p7) of the ASU-HCB cell MCQ bank.

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

## exam_signal
src_4a8ddb5edfab86d624d8 | question_book | | p6 | 101 ISK
src_6846577508f49244d715 | question_book | | p19 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p20 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p26 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p2 | 101 ISK
src_2944234d11e92ac4bbc8 | question_book | | p6 | 101 ISK
src_51fef9b6234c5d381f59 | question_book | | p16 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p22 | 101 ISK
src_6846577508f49244d715 | question_book | | p3 | 101 ISK
src_6846577508f49244d715 | question_book | | p9 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p1 | 101 ISK
src_2944234d11e92ac4bbc8 | question_book | | p4 | 101 ISK
src_6846577508f49244d715 | question_book | | p1 | 101 ISK
src_4e481d399b2ffd65b97a | question_book | | p5 | 101 ISK
src_9487fd713153c573087f | question_book | | p6 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p7 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q41 (outer leaflet carries the cell coat's receptors/glycoproteins, inner leaflet does not, p7) of the ASU-HCB cell MCQ bank.

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

## exam_signal
src_4a8ddb5edfab86d624d8 | question_book | | p1 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p24 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p21 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p10 | 101 ISK
src_6846577508f49244d715 | question_book | | p19 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p25 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p4 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p2 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p6 | 101 ISK
src_6846577508f49244d715 | question_book | | p4 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p12 | 101 ISK
src_6846577508f49244d715 | question_book | | p21 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p20 | 101 ISK
src_6846577508f49244d715 | question_book | | p25 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p8 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q45 (mitochondria are a double membrane on EM, p8) of the ASU-HCB cell MCQ bank.

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

## exam_signal
src_bb081b0479f7a33666cd | question_book | | p2 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p24 | 101 ISK
src_bb081b0479f7a33666cd | question_book | | p6 | 101 ISK
src_4e481d399b2ffd65b97a | question_book | | p8 | 101 ISK
src_6846577508f49244d715 | question_book | | p9 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p21 | 101 ISK
src_1fb914ce96908301b7b1 | question_book | | p15 | 101 ISK
src_6846577508f49244d715 | question_book | | p22 | 101 ISK
src_6846577508f49244d715 | question_book | | p7 | 101 ISK
src_c30d9391aa0861f41e44 | question_book | | p9 | 101 ISK
src_6846577508f49244d715 | question_book | | p20 | 101 ISK
src_4e481d399b2ffd65b97a | question_book | | p16 | 101 ISK
src_c30d9391aa0861f41e44 | question_book | | p8 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p4 | 101 ISK
src_6846577508f49244d715 | question_book | | p1 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p12 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p8 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q43 (ATP synthase sits on the cristae, p8) and cell-q44 (mitochondria concentrate wherever the cell needs energy, e.g. the apical cytoplasm of ciliated cells, p8) of the ASU-HCB cell MCQ bank.

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

## exam_signal
src_6846577508f49244d715 | question_book | | p1 | 101 ISK
src_d184b8378f4d66d285e0 | question_book | | p7 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p3 | 101 ISK
src_6846577508f49244d715 | question_book | | p23 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p2 | 101 ISK
src_6846577508f49244d715 | question_book | | p24 | 101 ISK
src_6846577508f49244d715 | question_book | | p3 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p5 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p4 | 101 ISK
src_620516ae7327c0f4fc2f | question_book | | p10 | 101 ISK
src_6846577508f49244d715 | question_book | | p15 | 101 ISK
src_6846577508f49244d715 | question_book | | p14 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p25 | 101 ISK
src_6846577508f49244d715 | question_book | | p2 | 101 ISK
src_d1414701d8fcb55932b6 | question_book | | p20 | 101 ISK
src_6c35f6fae7691b0bdcc8 | question_book | | p3 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q13 (pinocytosis = fluid uptake, p3) of the ASU-HCB cell MCQ bank.

---

# Item

## id
CON-FND-8DA30AD870AC1E

## label
Necrosis is recognised by karyolysis, pyknosis and karyorrhexis with a pinker cytoplasm

## universities
+asu

## learner_years
+1

## modules
+ASU-HCB

## module_subject
108 INT > Pathology > Cellular Response to Injury > Necrosis
ASU-HCB > Histology > Questions > Cell biology

## exam_signal
src_e294bafc730fe7111b06 | department_book | 2026 | p6 | 108 INT
src_3deab75f7f81cc5f5260 | end_of_year | 2024 | p1 | 108 INT
src_3f8527b376185eb3c2eb | department_questions | 2025 | p1 | 108 INT
src_6c35f6fae7691b0bdcc8 | question_book | | p7 | ASU-HCB

## field_notes
asu: Tested as ASU-HCB cell-q38 (pyknosis = darkly stained shrunken nucleus, distinguished from karyorrhexis/karyolysis, p7) of the ASU-HCB cell MCQ bank — a Year-1 cytology naming question, reusing the Year-2 necrosis-morphology concept from module 108 INT since the identical pyknosis fact is what is tested.
