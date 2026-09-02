<!--
  O6U-IHI-103 -- pending-live sparse ARTICLE overlay (sibling overlay-concepts.md carries the
  concept half). Apply each row ONLY after its named source article file is live. Every row
  restates ## title verbatim. universities/years/module are true ID-list columns; module_subject
  and university_notes fully replace on every write, so each restates the source's existing
  path/note plus O6U's own.

  Source files:
    A. docs/Kasr-Source-Imports/article/101-ISK-identification.md -- university kau, module 101 ISK
    B. docs/Alexandria-Source-Imports/article/AU-MED-103-physiology-articles.md -- university au, module AU-MED-103
    C. docs/Kasr-Source-Imports/article/101-ISK-histology.md -- university kau, module 101 ISK

  Simulate together with the source file each block targets, e.g.:
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IHI-103-overlay-articles.md \
    --with docs/Kasr-Source-Imports/article/101-ISK-identification.md \
    --with docs/Alexandria-Source-Imports/article/AU-MED-103-physiology-articles.md \
    --with docs/Kasr-Source-Imports/article/101-ISK-histology.md \
    --emit /tmp/sim-O6U-IHI-103-pending-articles.json
-->

# Item

## id
ART-101-HIS-ID-BONE-MARROW-AND-RETICULOCYTE

## title
The two blood preparations that are not a Leishman film: bone marrow and the supravital smear

## subject
fnd

## topic
Blood and hemopoiesis

## summary
Two blood-related preparations are read differently from the standard Leishman film: a bone
marrow section, identified by its fat cells and its megakaryocytes, and a supravital smear,
which shows the reticulocyte's reticulum only because the stain is applied to still-living
cells outside the body.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IHI-103

## module_subject
O6U-IHI-103 > Blood and Hemopoiesis > Bone marrow and hemopoiesis
101 ISK > Histology > Blood and hemopoiesis > Identification

## university_notes
o6u: Reused for Q10 (megakaryocyte/bone marrow identification), Histology MCQ HID.pdf p3.
Target A. related_concepts on the source record covers CON-HEM-CF325DABA0EA62 only, not the
reticulocyte/supravital concept tested at Q18 -- that one's covering article is
ART-101-HIS-CONNECTIVE-TISSUE-CELLS (below) instead.

---

# Item

## id
ART-101-HIS-CONNECTIVE-TISSUE-CELLS

## title
Connective tissue cells

## subject
fnd

## topic
Connective tissue

## summary
Connective tissue proper holds nine named cell types, seven resident and two transient, and
the identification exam turns on telling apart the two that look most alike. The macrophage
is demonstrated by vital staining in the living animal, contrasted with the reticulocyte's
own residual-RNA reticulum, seen only under a supravital stain applied outside the body.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IHI-103

## module_subject
O6U-IHI-103 > Blood and Hemopoiesis > Erythrocyte and erythroblast maturation
101 ISK > Histology > Introduction > Microtechniques

## university_notes
o6u: Reused for Q18 (reticulocyte name from residual ribosomal RNA under supravital stain),
Histology MCQ HID.pdf p5. Target D. Its related_concepts field is the one that covers
CON-FND-5EFDEADAA559B8, not the bone-marrow-identification article above.

---

# Item

## id
ART-HEM-CBC-READING

## title
Reading the full blood count: plasma, haematocrit, red-cell indices, ESR and the white-cell count

## subject
medical

## topic
Blood

## summary
Reading the full blood count: plasma, haematocrit, red-cell indices, ESR and the white-cell
count is a concise reading workspace built from individually reviewed, source-linked
concepts. Select any factual line to inspect every resource and exact locator.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IHI-103

## module_subject
O6U-IHI-103 > Blood and Hemopoiesis > Blood cells
AU-MED-103 > Physiology > Blood > CBC parameters

## university_notes
o6u: Reused for Q11 (leukocytosis definition, raised WBC count), Histology MCQ HID.pdf p3.
Target B.

---
