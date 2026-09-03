<!--
  Sparse overlay on 1 pending Kasr 208-INT pathology concept, which is live
  only in the Kasr Year-1 lane's unimported batch
  (docs/Kasr-Source-Imports/concept/208-INT-concepts.md). Omar applies this
  file only after that Kasr batch is live -- id + canonical_key + only the
  overlay fields being appended (`+aun` / `+1` / `+AUN-MPT-104`), never a
  full record. Covers the AUN-MPT-104 Lecture 51 (Mesenchymal tumors: benign
  and malignant and developmental tumors) Q13/Q15 rows of the quizzes-2022
  batch -- see coverage/AUN-MPT-104-triage.md, section S3b, and
  coverage/seeds/AUN-MPT-104/quizzes-2022-lec51-newconcepts.json. Per the
  standing two-sided-coverage fix, this lane's own article
  (ART-FND-AUN-MPT104-MESENCHYMAL-TUMORS) lists this concept in
  related_concepts -- the questions' library_ids point to that own article,
  not the foreign Kasr one.

  Apply after: the Kasr 208-INT-concepts.md batch. Import: Admin > Concepts
  import. Then apply
  AUN-MPT-104-quizzes-2022-lec51-pending-208int-questions.md.
-->

# Item

## id
CON-FND-7A8E6E9B14047B

## canonical_key
neoplasia.embryonic-tumors.classification

## universities
+aun

## learner_years
+1

## modules
+AUN-MPT-104
