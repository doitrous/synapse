<!--
  ZU-MED-107 (GIT and Nutrition) — 1 sparse LIVE concept overlay for the
  git-summer24 cluster.

  CON-GIT-E10E05FE786B9A is already LIVE in
  server/data/medical-library-v1.json — confirmed directly against the JSON
  (id, articleIds, universityIds, moduleIds, learnerYears checked one by
  one; `kau`-only with `moduleIds: []` today). Per the concept-id overlay
  rule (00-START-HERE.md §3): OVERLAY onto the live id, sparse rows only,
  never a full record.

  `## learner_years` is a plain-number ID-list field on concepts
  (`learnerYears`, not a scoped id like `ZU_Y1`) — `+1` is the real shape.

  Import: Admin › Concepts › Import, with "Update matching items" on.
-->

# Item

## id
CON-GIT-E10E05FE786B9A

## label
Chief cells secrete pepsin as inactive pepsinogen

## universities
+zu

## learner_years
+1

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > GI histology

## exam_weight_by_year
ZU_Y1=0.5

## field_notes
zu: Fakous GIT Summer 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q36, "One of the following features describe Chief cells: d. Secrete pepsinogen" (hand-drawn-ink key, render-confirmed). Direct match — the live concept's own label states exactly this secretory fact, distinct from the ultrastructural (apical zymogen granule) fact this lane's own git-final24 cluster tests separately under CON-GIT-107BE9DF149635. Found by `find-existing.mjs "pepsinogen"`.
