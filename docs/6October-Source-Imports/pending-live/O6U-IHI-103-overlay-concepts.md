<!--
  O6U-IHI-103 -- pending-live sparse CONCEPT overlay, three hits from Histology MCQ HID.pdf
  reused per 00-START-HERE.md §3/§4 (search-before-mint; "pending" Kasr/Alexandria hits are
  LIVE in production, ahead of this checkout's local server/data/medical-library-v1.json
  snapshot -- find-existing.mjs and medical:simulate see them only in the sibling university's
  own unimported batch files named below). Apply this file ONLY after the named source
  concept file for each id is live.

  Sibling overlay-articles.md carries the article half. Every row restates ## label verbatim;
  universities/learner_years/modules are true ID-list columns (+o6u/+1/+O6U-<CODE> --
  learner_years is numeric on concepts, not the O6U_Y1 id form questions/articles use);
  module_subject fully replaces on every write, so each restates the source's existing path
  plus O6U's own.

  Source files:
    A. docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md -- university kau, module 101 ISK
    B. docs/Alexandria-Source-Imports/concept/AU-MED-103-physiology-concepts.md -- university au, module AU-MED-103
    C. docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md -- university kau, module 101 ISK

  Simulate together with the source file each block targets, e.g.:
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IHI-103-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-103-physiology-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --emit /tmp/sim-O6U-IHI-103-pending-concepts.json
-->

# Item

## id
CON-HEM-CF325DABA0EA62

## label
Bone marrow is identified by its fat cells and by the megakaryocyte, recognised by its size and its single multilobed nucleus

## universities
+o6u

## learner_years
+1

## modules
+O6U-IHI-103

## module_subject
O6U-IHI-103 > Blood and Hemopoiesis > Bone marrow and hemopoiesis
101 ISK > Histology > Blood and hemopoiesis > Identification

## field_notes
o6u: Tested as Q10 ("Found only in bone marrow?", answer: Megakaryocytes), Histology MCQ
HID.pdf p3, per its own printed "Key answer" table p7. Target C.

---

# Item

## id
CON-HEM-09BC500E55C1AA

## label
A raised white-cell count on the CBC is leukocytosis, normally 4,000-10,000 cells/mm3

## universities
+o6u

## learner_years
+1

## modules
+O6U-IHI-103

## module_subject
O6U-IHI-103 > Blood and Hemopoiesis > Blood cells
AU-MED-103 > Physiology > Blood > CBC parameters

## field_notes
o6u: Tested as Q11 ("Leukocytosis is:", answer: An increase of WBCs count), Histology MCQ
HID.pdf p3, per its own printed "Key answer" table p7. Target A.

---

# Item

## id
CON-FND-5EFDEADAA559B8

## label
A vital stain stains living cells inside the living animal, a supravital stain stains living cells outside the body

## universities
+o6u

## learner_years
+1

## modules
+O6U-IHI-103

## module_subject
O6U-IHI-103 > Blood and Hemopoiesis > Erythrocyte and erythroblast maturation
101 ISK > Histology > Introduction > Microtechniques

## field_notes
o6u: Tested as Q18 ("The name of the reticulocytes is due to:", answer: Polyribosomes --
the supravital stain shows the reticulocyte's reticulum, which is residual ribosomal RNA),
Histology MCQ HID.pdf p5, per its own printed "Key answer" table p7. Target D.

---
