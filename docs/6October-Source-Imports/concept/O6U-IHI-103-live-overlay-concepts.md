<!--
  O6U-IHI-103 -- sparse overlay updates on FIVE already-LIVE concepts
  (server/data/medical-library-v1.json, nishany-concept-graph-v2), per 00-START-HERE.md §3/§4
  "a hit in live state -> a sparse update". Each restates ## label verbatim (required even on
  an update) and adds only the O6U overlay: +o6u, +1 (learner_years is numeric on concepts,
  not the O6U_Y1 id form questions/articles use), +O6U-IHI-103, and a module_subject cell
  restating the existing path(s) plus O6U's own (this field fully replaces on every write, no
  + form -- 00-START-HERE §3).

  Simulate together with live state (no --with needed -- these ids are already live):
  npm run medical:simulate -- docs/6October-Source-Imports/concept/O6U-IHI-103-live-overlay-concepts.md --emit /tmp/sim-O6U-IHI-103-live-concepts.json
-->

# Item

## id
CON-HEM-60C24B6F5C0EC2

## label
Average circulating RBC lifespan is about 120 days

## universities
+o6u

## learner_years
+1

## modules
+O6U-IHI-103

## module_subject
O6U-IHI-103 > Blood and Hemopoiesis > Blood cells

## field_notes
o6u: Tested as Q4 ("The life span of an erythrocyte in the circulation is:", answer: 4
months, i.e. ~120 days), Histology MCQ HID.pdf p2, per its own printed "Key answer" table p7.
Target D.

---

# Item

## id
CON-HEM-6E7493F79E9DF7

## label
Bone marrow is classified as active red marrow or inactive yellow marrow

## universities
+o6u

## learner_years
+1

## modules
+O6U-IHI-103

## module_subject
O6U-IHI-103 > Blood and Hemopoiesis > Bone marrow and hemopoiesis

## field_notes
o6u: Tested as Q8 ("The active bone marrow is:", answer: Red), Histology MCQ HID.pdf p3, per
its own printed "Key answer" table p7. Target A.

---

# Item

## id
CON-HEM-DC720AB51077EE

## label
Erythrocytes are circular biconcave anucleate discs

## universities
+o6u

## learner_years
+1

## modules
+O6U-IHI-103

## module_subject
O6U-IHI-103 > Blood and Hemopoiesis > Blood cells

## field_notes
o6u: Tested as Q3 ("Regarding adaptation of erythrocytes:", answer: All of the above --
absence of nucleus & organelles, biconcave disc-shape, flexible membrane), Histology MCQ
HID.pdf p1, per its own printed "Key answer" table p7. Target D; covers two of the three
listed adaptations (anucleate, biconcave shape), sibling concept below covers the third
(membrane flexibility).

---

# Item

## id
CON-HEM-23E454BD997B29

## label
Biconcavity increases flexibility through small capillaries

## universities
+o6u

## learner_years
+1

## modules
+O6U-IHI-103

## module_subject
O6U-IHI-103 > Blood and Hemopoiesis > Blood cells

## field_notes
o6u: Tested as Q3 ("Regarding adaptation of erythrocytes:", answer: All of the above --
covers the "cell membrane is flexible" option), Histology MCQ HID.pdf p1, per its own
printed "Key answer" table p7. Target D.

---

# Item

## id
CON-HEM-3DC3EAA5D4D84B

## label
Bone-marrow megakaryocytes produce platelets

## universities
+o6u

## learner_years
+1

## modules
+O6U-IHI-103

## module_subject
O6U-IHI-103 > Blood and Hemopoiesis > Bone marrow and hemopoiesis

## field_notes
o6u: Tested as Q14 ("Megakaryocytes:", answer: None of the above -- they are not
multinuclear, not macrophage precursors, not haploid, and not mainly in the spleen; this
concept's own facts, single polyploid nucleus / platelet precursor / bone-marrow location,
are what rule out options a, b and d) and Q19 (same stem, 4-option variant, same answer),
Histology MCQ HID.pdf pp4,5, per its own printed "Key answer" table p7. Target E / D.

---
