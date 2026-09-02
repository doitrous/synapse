<!--
  Sparse overlays on two pending Ain-Shams ASU-INF microbiology concepts,
  which are live only in the Ain-Shams Year-1 lane's unimported batch
  (docs/import-ready/concept/ASU-INF-microbiology-concepts.md /
  docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md).
  Omar applies this file only after that ASU-INF batch is live -- id +
  canonical_key + only the overlay fields being appended (`+aun` / `+1` /
  `+AUN-INI-105`), never a full record. Chosen over re-minting because
  AUN-INI-105's Chapter 5 ("Antimicrobial chemotherapy & Pathogenesis of
  bacterial infections") tests the same intrinsic-vs-acquired resistance
  fact (Mycoplasma/L-forms lacking a cell wall) and the same toxoid
  definition Ain Shams's own infection module already covers (this lane's
  chapter-5 report). Four further chapter-5 questions reuse the
  exotoxin/endotoxin concept (CON-INF-C87DF729E2ADDF) and the growth-curve/
  antibiotic-sensitivity concept (CON-INF-2E629B81136A05), both already
  overlaid for AUN-INI-105 by AUN-INI-105-ch1-asuinf-overlay-concepts.md and
  AUN-INI-105-ch2-asuinf-overlay-concepts.md respectively -- needing no
  further overlay row here.

  Apply after: the ASU-INF-microbiology-concepts.md batch. Import: Admin >
  Concepts import. Then apply this file. Then apply
  AUN-INI-105-ch5-asuinf-questions.md.
-->

# Item

## id
CON-INF-DCD82D2A1D396C

## canonical_key
antibiotic-resistance.acquired-vs-intrinsic-genetic

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---

# Item

## id
CON-INF-F6DC0E99178186

## canonical_key
bacteria.toxoid.formalin-inactivation

## universities
+aun

## learner_years
+1

## modules
+AUN-INI-105

---
