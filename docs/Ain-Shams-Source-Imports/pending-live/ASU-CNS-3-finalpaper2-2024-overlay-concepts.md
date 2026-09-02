<!--
  ASU-CNS-3 · EOM - CNS final paper 2 2024 — pending-live sparse CONCEPT
  overlay for one fact that duplicates an existing pending record rather
  than needing a new mint:

    1. CON-FND-88508ABAB84A67 (PENDING, docs/Kasr-Source-Imports/concept/
       108-INT-concepts-pathology.md) — liquefactive/colliquative necrosis
       in the CNS, whose own definition already states "Liquefactive or
       colliquative necrosis occurs in central nervous system infarction,
       where the tissue is rich in lipid, soft and lacking supporting
       stroma" — the same fact tested by this paper's Patho item 3
       ("Cerebral infarction is which type of necrosis? - Liquefactive
       necrosis").

  The row restates ## label verbatim (discriminating column) and adds
  only overlay fields (## universities +asu, ## learner_years +3,
  ## modules +ASU-CNS-3, ## module_subject, ## field_notes) — never a full
  record, per 00-START-HERE.md §3 "the concept-id overlay rule". Apply
  after docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md is
  itself live.

  Simulate together with the source file, e.g.:
  node scripts/content/gate.mjs simulate \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-CNS-3-finalpaper2-2024-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md
-->

# Item

## id
CON-FND-88508ABAB84A67

## label
Liquefactive necrosis turns the dead tissue to fluid, in the brain and in pus

## universities
+asu

## learner_years
+3

## modules
+ASU-CNS-3

## module_subject
ASU-CNS-3 > Pathology > CNS infarction necrosis type

## field_notes
asu: Kasr 108-INT pending concept already states liquefactive/colliquative necrosis occurs in CNS infarction (the brain's lipid-rich, poorly-supported tissue liquefies rather than retaining its architecture like a solid-organ coagulative infarct) — the same lowest-level fact this cluster's item tests. Tested as Patho item 3 of the ASU-CNS-3 EOM - CNS final paper 2 2024.pdf compilation (src_b67868be37571f92a53f).
