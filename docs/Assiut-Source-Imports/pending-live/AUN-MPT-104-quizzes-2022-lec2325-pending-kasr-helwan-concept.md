<!--
  Sparse overlays on two pending concepts -- one Kasr 208-INT, one Helwan
  HU-BMS-102 -- that AUN-MPT-104 Lecture 23/25 quiz rows reuse instead of
  minting twins. id + canonical_key + only the overlay fields being appended
  (`+aun` / `+1` / `+AUN-MPT-104`), never a full record, per the concept-id
  overlay rule (00-START-HERE.md §4).

  Added by the sixth AUN-MPT-104 author lane -- see
  coverage/seeds/AUN-MPT-104/quizzes-2022-lec2325-pending-kasr-helwan.json.

  Apply after: docs/Kasr-Source-Imports/concept/208-INT-concepts.md AND
  docs/Helwan-Source-Imports/concept/HU-BMS-102-pathology-family8-part4-concepts.md.
  Import: Admin > Concepts import. Then apply
  AUN-MPT-104-quizzes-2022-lec2325-pending-kasr-helwan-questions.md.
-->

# Item

## id
CON-FND-685D424733A1DB

## canonical_key
chronicinflammation.cells.lymphocytes-plasmacells-macrophages

## universities
+aun

## learner_years
+1

## modules
+AUN-MPT-104

---

# Item

## id
CON-INF-F3A31EB59340B9

## canonical_key
pathology.inflammation.granuloma-type-four-hypersensitivity

## universities
+aun

## learner_years
+1

## modules
+AUN-MPT-104

## article_ids
+ART-FND-AUN-MPT104-CHRONIC-INFLAMMATION-GRANULOMA

## field_notes
This concept's own article, ART-HU-BMS102-PAT-F8P4-GRANULOMA-PATHOGENESIS, does not exist anywhere in the corpus (a dangling reference inside the Helwan family-8-part-4 concept batch itself, not something this lane can author on Helwan's behalf) -- so the AUN-MPT-104 questions reusing this concept cite the AUN-MPT-104 chronic-inflammation-and-granuloma article instead, appended here as a second article_ids entry so the library_ids-coverage check has a real article to point to.
