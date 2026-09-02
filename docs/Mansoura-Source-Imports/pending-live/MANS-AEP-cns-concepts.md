<!--
  Sparse updates only, lane 3 (mans-aep-author3, CNS / Nervous System cluster,
  Anatomy Lectures 4-5, AEP Full Exams (VIP).pdf p.23-29). Every ## id below
  targets a concept that exists ONLY in an unimported Kasr, Assiut or
  Alexandria batch -- none of these ids are in
  server/data/medical-library-v1.json yet (checked directly). Apply each
  record ONLY after its target file (named per record) is live.

  Same conventions as lane 2's MANS-AEP overlay precedent and the
  MANS-MSS-202-concepts.md sparse-update precedent it in turn follows:
  `## label` and `## canonical_key` restated in full on every row (a filled
  label makes the batch validator's stub-create check treat the row as a
  full update rather than a silent stub-create); `## module_subject`
  DELIBERATELY OMITTED (append-unsafe -- would either fail validation
  against this row's own `## modules` or silently erase the source
  university's placement on merge); `## universities` / `## modules` /
  `## learner_years` are append-safe list columns (+mans / +MANS-AEP / +1).

  Gate is `medical:batch` with every target file (and this module's own new
  concept/article files) named via --with:

  node scripts/validate-content-batch.mjs "docs/Mansoura-Source-Imports/pending-live/MANS-AEP-cns-concepts.md" \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md \
    --with docs/Assiut-Source-Imports/concept/AUN-PMS-102-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md
-->

# Item

## id
CON-DEV-4BC4233153C3DC

## canonical_key
neural-plate-and-the-ectodermal-origin-of-the-nervous-system

## label
The neural plate is thickened median ectoderm induced by the notochord beneath it, and it folds into the neural tube

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf tests this concept twice — p.23's "formation of spinal cord is called" (keyed E, neurulation) and p.29's identical repeat (keyed E) — one authored, one held as a literal duplicate.

---

# Item

## id
CON-FND-14D80DE53DE835

## canonical_key
neuron-shape-classes-unipolar-bipolar-and-multipolar

## label
Nerve cells are classed by how many processes leave the cell body: one, two, or more than two

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf p.23 tests "pseudounipolar nerve cells are present in" (keyed C, dorsal root ganglia), the exact fact this concept's own definition already states for spinal/cranial sensory ganglion cells.

---

# Item

## id
CON-NEU-4027FFDDA9C52F

## canonical_key
neuroanatomy.neuron.structural-functional-unit

## label
Neurons are the structural and functional units of the nervous system

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf tests this concept once against the same glial-cell distractor set this record's own pitfall names (keyed C, p.23) — a second, literal-duplicate repeat at p.24 (keyed D) is held.

---

# Item

## id
CON-NEU-93CD087BDE3F7B

## canonical_key
neuroglia.cell-functions.astrocyte-microglia-oligodendrocyte-ependymal

## label
Astrocytes form the blood-brain barrier, microglia phagocytose as the CNS's resident monocyte-derived cell, oligodendrocytes myelinate CNS axons, and ependymal cells line the CSF-filled cavities

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf p.29 tests "ependymal cells?" with the short answer "lining ventricles of brain & Spinal cord", the exact fact this concept's own definition already states for ependymal cells.

---

# Item

## id
CON-NEU-0E451085185E2E

## canonical_key
nerve.myelinating-cells.schwann-versus-oligodendrocyte

## label
A Schwann cell myelinates one internode of one peripheral axon and can support regeneration, while one CNS oligodendrocyte myelinates internodes on several axons and cannot

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf tests the peripheral half of this comparison twice — p.23's "cells synthesize myelin in the peripheral nervous system" and p.23's "myelin producing cells include" (both keyed to Schwann cells) — one authored, one held as a near-duplicate restatement.

---

# Item

## id
CON-NEU-273E2C22C11A97

## canonical_key
nmt.junction.physiologic-anatomy

## label
Each skeletal muscle fibre receives one axon terminal at a motor end plate, separated from it by a synaptic cleft rich in acetylcholinesterase

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf p.25 tests "the motor end plate is the meeting between an axon with" (keyed D, a muscle), the classification fact this concept's own axon-terminal/synaptic-cleft definition already implies.

---

# Item

## id
CON-MSK-59F41C4BAF6181

## canonical_key
spinal-cord-segments-and-structure

## label
The spinal cord is 31 segments — 8 cervical, 12 thoracic, 5 lumbar, 5 sacral and 1 coccygeal — around an H of grey matter

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf tests three separate facts already carried by this concept's own definition — p.23's "number of the cervical nerves" (keyed C, 8), p.29's "number of the thoracic spinal nerves" (keyed E, 12), and p.24's "parasympathetic system arises from" (keyed D, S2/3/4 — the lateral-horn parasympathetic-nuclei fact this record's definition already states).
