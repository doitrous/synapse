<!--
  Sparse overlays on pending Kasr 108-INT pathology concepts, which are
  live only in the Kasr Year-1 lane's unimported batch
  (docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md /
  docs/import-ready/concept/108-INT-concepts-pathology.md). Omar applies this
  file only after that Kasr batch is live -- id + canonical_key + only the
  overlay fields being appended (`+aun` / `+1` / `+AUN-MPT-104`), never a
  full record.

  Third item (CON-FND-DF726F864C8BC3, cell.adaptation) added by the fourth
  AUN-MPT-104 author lane, reusing the same pending Kasr 108-INT pathology
  concept for the Lecture 11/13 "cellular adaptation" quiz rows (Quiz 11
  Q2-3, Quiz 13 Q1-2) rather than re-minting -- see
  coverage/seeds/AUN-MPT-104/quizzes-2022-pending-108int-path.json.

  Apply after: the Kasr 108-INT-concepts-pathology.md batch. Import: Admin >
  Concepts import. Then apply this file. Then apply
  AUN-MPT-104-quizzes-2022-pending-108int-path-questions.md.
-->

# Item

## id
CON-FND-D53E254A82F334

## canonical_key
cell.stress.adaptation-reversible-irreversible-continuum

## universities
+aun

## learner_years
+1

## modules
+AUN-MPT-104

---

# Item

## id
CON-FND-375B9454502DE8

## canonical_key
cell.injury.mechanism-atp-depletion

## universities
+aun

## learner_years
+1

## modules
+AUN-MPT-104

---

# Item

## id
CON-FND-DF726F864C8BC3

## canonical_key
cell.adaptation.hypertrophy-hyperplasia-atrophy-metaplasia

## universities
+aun

## learner_years
+1

## modules
+AUN-MPT-104
