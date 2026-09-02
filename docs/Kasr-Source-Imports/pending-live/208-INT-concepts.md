<!--
  Sparse updates only. The one ## id below targets a concept that exists ONLY in
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
