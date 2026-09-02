<!--
  Sparse updates only. This file now carries TWO overlay blocks, targeting two
  different unimported Year-1 base files -- read each block's own field_notes
  for which base file and gate --with it needs; do not assume both share one
  base file.

  The first ## id below targets a concept that exists ONLY in
  docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md (an unimported Kasr
  Year 1 batch, 0 live yet) -- per the chief-of-staff ruling on 208 INT ("reuse
  live Year-1 ids ... via sparse overlays adding +KAU_Y2 / +208 INT and restating
  the FULL module_subject union"). Apply this file ONLY after
  101-ISK-mcq-concepts.md is live.

  Sparse update = ## id + ## label + ## canonical_key (both discriminators,
  retyped exactly from 101-ISK-mcq-concepts.md) + only the fields being changed:
  `## modules` gets a `+` addition (208 INT joins 101 ISK, both apply), `##
  learner_years` gets a `+` addition (2 joins 1), `## module_subject` is
  restated in FULL as the union of both placements (no `+` -- module_subject has
  no additive semantics in the real importer), and `## exam_weight_by_year`
  states only the new KAU_Y2 entry (the importer merges by key, matching the
  pattern in docs/Ain-Shams-Source-Imports/pending-live/ASU-MBG-molecular-genetics.md).
  `## universities` is NOT restated -- the source record is already `kau`,
  which already covers KAU_Y2, so nothing there changes.

  Gate sequence (own directory, WITH the Year-1 batch it depends on):
    node scripts/content/gate.mjs batch "docs/Kasr-Source-Imports/pending-live/208-INT-concepts.md" \
      --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md
-->

# Item

## id
CON-FND-5AD09BF9FC2420

## label
Metaplasia replaces one epithelium with another, and the cost is whatever the original one did — cilia in the smoker's bronchus, distensibility in the bilharzial bladder

## canonical_key
epithelial-metaplasia-in-smoking-and-bilharziasis

## modules
+208 INT

## learner_years
+2

## module_subject
208 INT > Chapter 3 Disorders of Growth and Neoplasia > Metaplasia
101 ISK > Histology > Epithelial Tissues > Surface Epithelium

## exam_weight_by_year
KAU_Y2=0.35

## field_notes
university: kau — 208 INT EOM 2023 paper Q21, "Squamous metaplasia does not occur in the following site" (a. bronchial epithelium in smokers; b. gall bladder due to gall stones; c. lower end of esophagus; d. urinary bladder in bilharziasis — keyed c, per coverage/208-INT-triage-keys.txt). The Year-1 concept's own definition covers exactly two of this question's four sites (bronchus, bladder) and is reused as the main concept for that overlap; the question's own explanation (docs/Kasr-Source-Imports/question/208-INT-2023-eom-mcq.md) draws on the 208 INT department book page 36 for the gallbladder site and for why the correct EXCEPT answer is the esophagus (Barrett's changes columnar epithelium TO squamous in the reverse direction, intestinal not squamous metaplasia), rather than editing this Year-1 record's own body.

---

# Item

## id
CON-FND-955AD7B6FE6F03

## label
Plasma half-life is the time taken for the plasma concentration to fall by half, and it is fixed only in first-order elimination

## canonical_key
teaching.pharma.halflife.definition

## modules
+208 INT

## learner_years
+2

## module_subject
208 INT > Chapter 10 Pharmacology > General Pharmacology > Pharmacokinetics > Half-Life and Steady State
108 INT > Pharmacology > Fundamental Principles of Pharmacokinetics > Plasma Half Life

## exam_weight_by_year
KAU_Y2=0.8

## field_notes
university: kau — this record targets docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md (NOT 101-ISK-mcq-concepts.md, unlike the CON-FND-5AD09BF9FC2420 overlay above) -- 0 live yet per find-existing.mjs ("plasma half-life": pending hits only in docs/import-ready and docs/Kasr-Source-Imports 108-INT files, no live hit). Apply this block ONLY after 108-INT-concepts-pharmacology.md is live. Gate sequence: node scripts/content/gate.mjs batch "docs/Kasr-Source-Imports/pending-live/208-INT-concepts.md" --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md (both base files, since this one pending-live file now carries overlays for two different Year-1 sources).
208 INT EOM 2023 paper Q64, "The half-life of a drug is about 6 hours. Approximately, how long will it take for blood levels of the drug to reach a steady concentration (plateau)?" (a.12 hours b.24 hours c.48 hours d.4 days — keyed b, per coverage/208-INT-triage-keys.txt). The Year-1 concept's own definition and the four-to-five-half-lives rule it documents (docs/Kasr-Source-Imports/question/108-INT-EOY-mcq.md, QST-108-INT-2025-S1-...) fully ground this calculation; reused as the main concept rather than minting a duplicate half-life concept for 208 INT.
