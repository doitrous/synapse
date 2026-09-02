<!--
  Sparse overlays on five pending Ain-Shams ASU-INF mycology concepts and one
  pending MUST FHB-102-2 mycology concept, which are live only in their own
  university's unimported batch (docs/import-ready/concept/ASU-INF-
  microbiology-concepts.md / docs/Ain-Shams-Source-Imports/concept/ASU-INF-
  microbiology-concepts.md; docs/MUST-Source-Imports/concept/FHB-102-2-
  microbiology-introduction-concepts.md). Omar applies this file only after
  both those batches are live -- id + canonical_key + only the overlay
  fields being appended (`+aun` / `+1` / `+AUN-INI-105`), never a full
  record. Chosen over re-minting because AUN-INI-105's Chapter 7 ("General
  Mycology") tests the same fungal cell wall (chitin, glucan/mannan),
  filamentous-morphology, dimorphism, hyphae/mycelium and yeast-examples
  facts Ain Shams's own microbiology module and MUST's parallel FHB-102-2
  module already cover (this lane's chapter-7 report). A sixth reused
  concept, the Mycoplasma-vs-L-forms record CON-INF-271E9930B4B73A, is
  already overlaid for AUN-INI-105 by AUN-INI-105-ch1-asuinf-overlay-
  concepts.md and needs no second overlay row here.

  Apply after: docs/import-ready/concept/ASU-INF-microbiology-concepts.md
  AND docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-
  concepts.md (or docs/import-ready equivalent once staged). Import: Admin >
  Concepts import. Then apply this file. Then apply
  AUN-INI-105-ch7-asuinf-questions.md.
-->

# Item

## id
CON-INF-37160A7BC0B002

## canonical_key
fungi.cell-wall.glucan-mannan-composition

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-5711F66EFF586F

## canonical_key
fungi.cell-wall.chitin-main-component

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-8D2EDDBECE528D

## canonical_key
fungi.morphology.molds-filamentous

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-44400FF4328CA8

## canonical_key
fungi.dimorphism.mold-vs-yeast-form

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-7213E96DAD38D1

## canonical_key
fungi.morphology.hyphae-mycelium

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-3CCC561E727F2C

## canonical_key
microbiology.mycology.yeast-examples-candida-cryptococcus

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---
