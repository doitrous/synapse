<!--
  ASU-AE · "youssef1" spinal-nerve/circulatory MCQ cluster (src_043fae682fac40076fd6,
  "MCQs - Bg Mcq dr.youssef.pdf", pp.18-19 spinal-nerve/ANS block + pp.22-25
  circulatory/lymphatic block) — pending-live sparse CONCEPT overlay.

  The ## id below targets a concept that exists ONLY in an unimported batch from
  another lane (Alexandria) — not in server/data/medical-library-v1.json yet.
  find-existing.mjs "sympathetic outflow" surfaced this exact fact (sympathetic
  outflow = thoracolumbar) already minted under Alexandria's AU-MED-102
  (Physiology). One canonical key, one id, university-blind — this row overlays
  ASU's own tags onto it rather than re-minting.

  Apply this file ONLY after the named source file is live:
    A. docs/Alexandria-Source-Imports/concept/AU-MED-102-physiology-concepts.md —
       university `au`, module `AU-MED-102` (Physiology, Autonomic nervous system).

  Per LANE-BRIEF §6 rule 1/2 and the concepts manual: `## module_subject` fully
  replaces on every write (no `+` form) — the row below restates the source's
  existing line plus ASU's own. `## universities`, `## learner_years` and
  `## modules` are true ID-list columns and take `+asu` / `+1` / `+ASU-AE`.
  `## exam_signal` is a full-replace multi-line field (parsed by
  parseExamAppearances, not the `+` list directive) — omitted here rather than
  risking silently dropping the source's own existing appearance rows; the ASU
  source and page are recorded in `field_notes` instead, per the manual.

  Simulate together with the source file this block targets:
  node scripts/content/gate.mjs simulate \
    docs/Alexandria-Source-Imports/concept/AU-MED-102-physiology-concepts.md \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-youssef1-spinal-circ-overlay-concepts.md \
    docs/Ain-Shams-Source-Imports/question/ASU-AE-youssef1-spinal-circ-mcq.md
-->

# Item

## id
CON-NEU-67C437462712E4

## label
The sympathetic outflow arises from the lateral horn of the thoracolumbar spinal cord

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
AU-MED-102 > Physiology > Autonomic nervous system
ASU-AE > Anatomy > Questions > MCQ

## field_notes
asu: Tested directly in the ASU-AE youssef1 MCQ bank (target A) — "The sympathetic outflow is:" with the correct option "Thoraco-lumbar". youssef1 "MCQs - Bg Mcq dr.youssef.pdf" p.18 Q3, printed answer key p.19 (row 3 = e), rendered and read by eye (OCR scattered the table's letters onto the wrong lines). No independent Anatomy article exists in this ASU-AE pass for this fact; the question cites Alexandria's own AU-MED-102 Physiology article (ART-NEU-PHYSIO-AUTONOMIC-NS) via `library_ids`, since the underlying fact is identical.

---
