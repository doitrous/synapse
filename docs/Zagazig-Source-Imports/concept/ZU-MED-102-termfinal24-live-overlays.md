<!--
  ZU-MED-102 (Medical Terminology) — 1 sparse LIVE concept overlay.

  This id is already LIVE in server/data/medical-library-v1.json — confirmed
  directly against the JSON (learnerYears: [2], universityIds: ["kau"]). Per
  the concept-id overlay rule (00-START-HERE.md §3) and LANE-CARD.md §7:
  OVERLAY onto the live id, sparse rows only, never a full record.

  `## learner_years` is a plain-number ID-list field on concepts
  (`learnerYears`, not a scoped id like `ZU_Y1`) — `+1` is the real shape.

  Import: Admin › Concepts › Import, with "Update matching items" on.
-->

# Item

## id
CON-REN-5D60B4B43BCCC3

## label
Adrenal medulla secretes epinephrine and norepinephrine during fight-flight-fright stress response

## universities
+zu

## learner_years
+1

## modules
+ZU-MED-102

## module_subject
ZU-MED-102 > Medical Terminology > Endocrine terminology

## exam_weight_by_year
ZU_Y1=0.45

## field_notes
zu: Fakous Medical Terminology Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q9, "Which of the following describes Epinephrine?" (answer: "A chemical substance produced by a gland above the kidneys" — digital highlight key, render-confirmed). Direct match — the live concept's own label already states epinephrine is secreted by the adrenal medulla, the gland sitting above the kidney. Found by `find-existing.mjs "epinephrine"`.
