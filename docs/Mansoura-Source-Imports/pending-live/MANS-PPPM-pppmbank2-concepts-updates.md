<!--
  Sparse updates only. Every ## id below targets a concept that already exists in
  another university's pending (or, for CON-FND-6B5BC774037EBC, Assiut's pending)
  batch -- none of these ids are in server/data/medical-library-v1.json yet. Apply
  each record ONLY after its target file (named per record) is live.

  Per this lane's own brief and the Alexandria AU-MED-103-histology.md precedent:
  `## label` is restated verbatim (a blank label on an update row would blank the
  live concept's real label on merge -- conceptFromRow defaults label to '' rather
  than undefined). `## canonical_key` is written too, as the discriminator.
  `## module_subject` is deliberately NOT written here -- it is not an append-safe
  column (a bare value replaces wholesale), and every target record below already
  carries its own real module_subject naming its home module; writing one here
  would silently erase that placement on merge. The Mansoura module attachment
  survives on `## modules` (a genuine append-safe list column) instead, and the
  Mansoura exam appearance (source, page, cluster) is recorded in `field_notes`
  `universityNotes:` prose, where it cannot collide with anything.

  `## universities`, `## modules` and `## learner_years` are append-safe list
  columns: `+mans`, `+MANS-PPPM`, `+1` add without disturbing the target record's
  existing kau/asu, 108 INT/AUN-MPT-104, or learner-year tags.

  Lane mans-pppm-author2 (cluster pppmbank2, Pharmacology p.7-16 + Pathology p.17
  of PPPM Exam Bank ( 61, 60, 59, 58).pdf, src_111bbd078054dc30d3af). Gate is
  `medical:batch` with every target file named via --with -- run once without
  --with (expect the "does not exist" refusal) and once with (expect a clean
  pass); these `## id`s are not live, so `medical:simulate` cannot resolve them
  yet and is not the gate here:

  node scripts/content/gate.mjs batch "docs/Mansoura-Source-Imports/pending-live/MANS-PPPM-pppmbank2-concepts-updates.md" \
    --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md \
    --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md \
    --with docs/Assiut-Source-Imports/concept/AUN-MPT-104-concepts.md
-->

# Item

## id
CON-FND-CF40F32A8A74A0

## canonical_key
teaching.pharma.bioavailability.first-pass

## label
Bioavailability is the fraction of an oral dose that reaches the systemic circulation, and first-pass metabolism is what removes the rest

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pharmacology p.7, p.12 (twice) tests this same bioavailability/first-pass record three times in this lane's pppmbank2 cluster -- "what does first-pass metabolism mean" (p.7, keyed A), "which of the following describes bioavailability" (p.12, keyed C, affected by liver disease), and "most important organ responsible for first-pass metabolism" (p.12, keyed C, liver) -- three angles of the same definition, none needing a new fact added to it.

---

# Item

## id
CON-FND-6B5BC774037EBC

## canonical_key
teaching.pharmacology.ans.edrophonium-diagnostic-use

## label
Edrophonium's brief, fast-onset acetylcholinesterase inhibition makes it the diagnostic ("Tensilon") test to distinguish myasthenic crisis (undertreatment) from cholinergic crisis (overtreatment)

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pharmacology p.7, tests this same fact directly -- "which of the following drugs is used to diagnose myasthenia gravis", keyed E, edrophonium -- no new fact added.

---

# Item

## id
CON-FND-BB0DBAE1BC802B

## canonical_key
teaching.pharma.posology.therapeutic-index

## label
The therapeutic index is the ratio of the toxic dose to the effective dose, and it is a measure of safety, not of potency

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pharmacology p.8, tests this same definition directly -- "which parameter defines the relation between the desired therapeutic effect and its toxic effect", keyed C, therapeutic index -- no new fact added.

---

# Item

## id
CON-FND-4388E0D8A75FD4

## canonical_key
teaching.pharma.ligands.types

## label
A ligand may be a full agonist, a partial agonist, an inverse agonist or an antagonist, according to what its binding does to the receptor

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pharmacology p.12, tests the partial-agonist branch of this record directly -- "which ligand gives submaximal response even at full concentration and never gives Emax", keyed B, partial agonist -- no new fact added.

---

# Item

## id
CON-FND-DF726F864C8BC3

## canonical_key
cell.adaptation.hypertrophy-hyperplasia-atrophy-metaplasia

## label
Adaptation takes four forms: hypertrophy, hyperplasia, atrophy and metaplasia

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.17, tests this record's own pitfalls text directly -- "an increase in organ size caused by an increase in the size of each cell is called", keyed A, hypertrophy, distinguishing it from hyperplasia -- no new fact added.

---

# Item

## id
CON-FND-5B3B6BA12670C7

## canonical_key
necrosis.caseation.tuberculous-cheese-like

## label
Caseation necrosis is the cheese-like necrosis of tuberculosis

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.17, tests this record directly under an oddly-worded stem -- "fibrinoid caseation necrosis usually results from", keyed D, tuberculosis; the stem's pairing of 'fibrinoid' with 'caseation' does not match this necrosis type's standard name and is flagged as a probable source wording slip, not a new fact -- no new fact added to the concept itself.

---

# Item

## id
CON-FND-A0BC07E35554B1

## canonical_key
steatosis.hepatic.pathogenesis-four-routes

## label
Hepatic steatosis follows four routes: more fat in, less oxidised, more made, less exported

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pathology p.17, tests the starvation example this record's own definition already names -- "which of the following can cause steatosis by increasing fatty acid entry into the liver cells", keyed C, starvation -- no new fact added.

---

# Item

## id
CON-FND-6BB35F11EBD54B

## canonical_key
teaching.pharma.scope.kinetics-vs-dynamics

## label
Pharmacokinetics is what the body does to the drug; pharmacodynamics is what the drug does to the body

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: this lane's own lane-1 cluster (pppmbank-q04/q13) already exercised this record's two branches directly; this lane's pppmbank2 cluster adds a third angle from PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Pharmacology p.16 -- "what does pharmacokinetics include", keyed C, excretion of substances -- no new fact added.
