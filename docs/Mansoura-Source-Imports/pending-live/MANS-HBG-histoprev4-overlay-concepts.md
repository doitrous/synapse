<!--
  Sparse updates only. Every ## id below targets a concept that exists ONLY in an
  unimported Kasr or Ain Shams batch (checked directly against every docs/*/concept
  and docs/*/pending-live tree; none of these ids is live in
  server/data/medical-library-v1.json yet). Apply each record ONLY after its target
  file (named in that record's field_notes as applyAfter) is live.

  Same gate-clean form as pending-live/MANS-HBG-histoprev2-overlay-concepts.md:
  `## label` and `## canonical_key` are written on every row (a filled label makes the
  validator treat the row as a full authoring attempt, not a blanking update; the key
  is the discriminator). `## module_subject` is OMITTED on every row deliberately — an
  append row's `## modules` is just `+MANS-HBG` (the delta), and validate-content-
  batch.mjs's catalogueErrors requires module_subject's first segment to name a module
  the row carries, so any restated base path reads as a module the row does not declare.
  MANS-HBG's own placement for each reused concept lives on the question records
  (question/MANS-HBG-histoprev4-mcq.md), which carry their own full module_subject.
  `## universities`, `## modules` and `## learner_years` are the genuine append-safe
  deltas. Labels/keys copied verbatim from the target concept files.
-->

# Item

## id
CON-FND-CC62175DBE7355

## canonical_key
plasma-cell-features-function

## label
The plasma cell is a B lymphocyte turned into an antibody factory, and its nucleus shows it

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
applyAfter: docs/Kasr-Source-Imports/concept/101-ISK-concepts.md (Kasr 101-ISK creates this concept).
mans: Reused in cluster histoprev4 as the main concept of d59-q26 (the negative Golgi image of the plasma cell on L/M, دفعة 59/58/57 block Q26, p35). The concept's own definition already carries the negative-Golgi and clock-face features the question tests.

---

# Item

## id
CON-DER-56784AB396C13E

## canonical_key
dermis.layers.papillary-reticular

## label
The papillary layer of the dermis is thin, loose, cellular and vascular; the reticular layer is thick, dense and less vascular

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
applyAfter: docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md (Kasr 103-BMS creates this concept).
mans: Reused in cluster histoprev4 as the main concept of d59-q32 (Meissner's corpuscle located in the papillary layer of the dermis, دفعة 59/58/57 block Q32, p36).

---

# Item

## id
CON-FND-59E3FDA20F54AD

## canonical_key
zonula-adherens-against-macula-adherens

## label
The zonula adherens is a belt anchoring actin; the macula adherens is a spot anchoring intermediate filaments, and it is the strongest junction

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
applyAfter: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md (Kasr 101-ISK creates this concept).
mans: Reused in cluster histoprev4 as the main concept of d59-q40 (the desmosome/macula adherens fixes cells strongly and prevents their separation, دفعة 59/58/57 block Q40, p37).

---

# Item

## id
CON-FND-FBF032D6A83371

## canonical_key
epithelium.taste-bud.neuroepithelium-classification

## label
Taste buds are an example of neuroepithelium

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
applyAfter: docs/Ain-Shams-Source-Imports/concept/ASU-HCB-epithelium-mcq-concepts.md (Ain Shams ASU-HCB creates this concept).
mans: Reused in cluster histoprev4 as the main concept of d59-q45 (the sensory cells of neuroepithelium bear microvilli, دفعة 59/58/57 block Q45, p38).

---

# Item

## id
CON-FND-0B3CC0A79F9150

## canonical_key
ser-structure-function-steroid-detoxification

## label
Smooth endoplasmic reticulum is invisible in itself and known by the acidophilia it causes and its ribosome-free tubules

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
applyAfter: docs/Kasr-Source-Imports/concept/101-ISK-concepts.md (Kasr 101-ISK creates this concept).
mans: Reused in cluster histoprev4 as the main concept of b4-q10 (smooth ER protects the cell from drugs and toxins, Important MCQ Final Q10, p3) and b4-q12 (smooth-ER destruction in liver disease impairs membrane-lipid synthesis and drug detoxification, Q12, p4). The concept's own key already names steroid synthesis and detoxification. This id is also referenced by cluster histoprev1 (q18) without an overlay row; this record supplies that missing overlay too.

---

# Item

## id
CON-FND-9D325B98FC59A0

## canonical_key
lysosome-types-secondary-fates

## label
A secondary lysosome is named by what the primary lysosome fused with, and all end as residual bodies

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
applyAfter: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md (Kasr 101-ISK creates this concept).
mans: Reused in cluster histoprev4 as the main concept of b4-q17 (a secondary lysosome contains undigested material as a residual body, Important MCQ Final Q17, p5).

---

# Item

## id
CON-FND-F2237ED98E88F3

## canonical_key
cell-coat-glycocalyx-composition-and-functions

## label
The cell coat is the carbohydrate of the outer membrane surface, and it does the cell's recognising, adhering and receiving

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
applyAfter: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md (Kasr 101-ISK creates this concept).
mans: Reused in cluster histoprev4 as the main concept of b4-q03 (the cell coat is formed of glycolipid and glycoprotein, Important MCQ Final Q3, p2).

---
