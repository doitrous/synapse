<!--
  Sparse overlay on one pending Helwan HU-BMS-102 concept (keloid) that the
  AUN-MPT-104 Lecture 29 Quiz 29 Q1 row reuses instead of minting a twin. id +
  canonical_key + only the overlay fields being appended (`+aun` / `+1` /
  `+AUN-MPT-104`), never a full record, per the concept-id overlay rule
  (00-START-HERE.md §4).

  Added by the seventh AUN-MPT-104 author lane -- see
  coverage/seeds/AUN-MPT-104/quizzes-2022-lec29-pending-helwan.json.

  Apply after: docs/Helwan-Source-Imports/concept/HU-BMS-102-pathology-family143-concepts.md.
  Import: Admin > Concepts import. Then apply
  AUN-MPT-104-quizzes-2022-lec29-pending-helwan-questions.md.
-->

# Item

## id
CON-FND-3C513E02CB8362

## canonical_key
keloid-gross-diagnosis

## universities
+aun

## learner_years
+1

## modules
+AUN-MPT-104

## article_ids
+ART-FND-AUN-MPT104-TISSUE-REPAIR-FACTORS

## field_notes
This concept's own article, ART-HU-BMS102-PAT-F143-REPAIR, does not exist anywhere in the corpus (a dangling reference inside the Helwan family-143 concept batch itself, not something this lane can author on Helwan's behalf) -- so the AUN-MPT-104 question reusing this concept cites the AUN-MPT-104 tissue-repair-factors article instead, appended here as a second article_ids entry so the library_ids-coverage check has a real article to point to.
