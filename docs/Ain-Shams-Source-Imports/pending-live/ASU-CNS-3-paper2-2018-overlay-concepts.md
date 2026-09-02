<!--
  ASU-CNS-3 · EOM - CNS paper 2 2018 (cluster 6/author6) — pending-live sparse
  CONCEPT overlay for one fact that duplicates an existing pending Kasr
  record rather than needing a new mint:

    1. CON-FND-AE3618871E840B (PENDING, docs/Kasr-Source-Imports/concept/
       208-INT-concepts.md) — "Rivastigmine is the anticholinesterase used
       for Alzheimer's disease, distinct from anticholinesterases used for
       myasthenia or glaucoma" — the same fact tested by this paper's item
       13 ("Alzheimer ds :Rivastigmine").

  The row restates ## label verbatim (discriminating column) and adds only
  overlay fields (## universities +asu, ## learner_years +3,
  ## modules +ASU-CNS-3, ## module_subject, ## field_notes) — never a full
  record, per 00-START-HERE.md §3 "the concept-id overlay rule". Apply after
  docs/Kasr-Source-Imports/concept/208-INT-concepts.md is itself live.

  Simulate together with the source file, e.g.:
  node scripts/content/gate.mjs simulate \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-CNS-3-paper2-2018-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/208-INT-concepts.md
-->

# Item

## id
CON-FND-AE3618871E840B

## label
Rivastigmine is the anticholinesterase used for Alzheimer's disease, distinct from anticholinesterases used for myasthenia or glaucoma

## universities
+asu

## learner_years
+3

## modules
+ASU-CNS-3

## module_subject
ASU-CNS-3 > Pharmacology > Dementia pharmacology

## field_notes
asu: Kasr 208-INT pending concept already states rivastigmine as the anticholinesterase used specifically for Alzheimer's disease, distinct from pyridostigmine (myasthenia) and echothiophate (glaucoma) — the same fact this cluster's item tests. Tested as item 13 of the ASU-CNS-3 EOM - CNS paper 2 2018.pdf compilation (src_85504e7525d793760af2, "Alzheimer ds :Rivastigmine"). Held from a fresh mint rather than authored as a question in this cluster's own batch, since this pending-live overlay carries the reuse rather than a paired question — no question record was written against this concept id in this cluster's own question batch to avoid double-authoring the same fact.
