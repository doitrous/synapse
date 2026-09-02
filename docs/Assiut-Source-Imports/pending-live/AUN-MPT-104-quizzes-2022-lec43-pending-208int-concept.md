<!--
  Sparse overlay on 3 pending Kasr 208-INT pathology concepts, which are
  live only in the Kasr Year-1 lane's unimported batch
  (docs/Kasr-Source-Imports/concept/208-INT-concepts.md). Omar applies this
  file only after that Kasr batch is live -- id + canonical_key + only the
  overlay fields being appended (`+aun` / `+1` / `+AUN-MPT-104`), never a
  full record. Covers the AUN-MPT-104 Lecture 43 (Neoplasia: Routes of
  spread of malignant tumors) Q1-Q5 rows of the quizzes-2022 batch -- see
  coverage/AUN-MPT-104-triage.md, section S3b, and
  coverage/seeds/AUN-MPT-104/quizzes-2022-lec43-pending-208int.json.

  Apply after: the Kasr 208-INT-concepts.md batch. Import: Admin > Concepts
  import. Then apply
  AUN-MPT-104-quizzes-2022-lec43-pending-208int-questions.md.
-->

# Item

## id
CON-FND-91B66B24922754

## canonical_key
neoplasia.carcinoma-in-situ.definition

## universities
+aun

## learner_years
+1

## modules
+AUN-MPT-104

---

# Item

## id
CON-FND-471F90B10E495A

## canonical_key
neoplasia.locally-malignant.intermediate-tumors

## universities
+aun

## learner_years
+1

## modules
+AUN-MPT-104

---

# Item

## id
CON-FND-E795DC3D0573A3

## canonical_key
neoplasia.hematogenous-spread.tumor-emboli-fate

## universities
+aun

## learner_years
+1

## modules
+AUN-MPT-104
