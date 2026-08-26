<!--
  Sparse updates onto concept ids that exist only in the Kasr Year-1 lane's
  unimported batch (docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md).
  Omar applies that Kasr file first — see pending-live/INDEX.md for the
  apply-order line this file adds.

  Only universities, modules and exam_signal are touched, each with a "+"
  addition, per LANE-BRIEF.md §16/§18/§19. No other field is restated —
  including source_candidate_ids, which must never be copied from a live/pending
  record onto an update row (chief of staff, 2026-08-22).

  A third candidate (CON-DEV-F33BB68138377B, fertilisation/capacitation) was
  triaged as HIT-PENDING in this lane's Step-1 pass but is NOT written here:
  a corrected re-check of every cached Terminology bank page found no occurrence
  of "capacitation" or "glycoprotein" anywhere in the department's six MCQ banks.
  The Step-1 triage's citation for it (MCQ2, Q4) was wrong — that item is about
  "Orchido-", not capacitation. Recorded as a correction, not silently dropped.

  Both remaining ids were found by the mandatory search before writing this file:
  find-existing.mjs (>=4 queries) plus grep -ril across docs/*-Source-Imports/concept/.
  See the lane's report for the exact queries run.
-->

# Item

## id
CON-HEM-785718A47454E8

## label
Leukocytes divide into granular — neutrophil, eosinophil, basophil — and non-granular — monocyte and lymphocyte

## universities
+au

## modules
+AU-MED-102

## exam_signal
src_c6ab1b49dc16762227e1 | question_book | | p3 | 101 ISK
src_5d2dbb44df399f871731 | question_book | | p15 | AU-MED-102

## field_notes
universities: AU-MED-102 Medical Terminology tests this same granular/non-granular classification via its own MCQ bank (Lecture 4, Q110); adding au/AU-MED-102 as an overlay rather than a new record.
examSignal: exam_signal does not take a "+" append (medical:batch: "this column does not take an append"), so the field is restated in full — the one existing line copied verbatim from the live/pending record, plus this lane's own line.

---

# Item

## id
CON-MSK-EFD497A9922A4D

## label
A long bone is an epiphysis at each end, a diaphysis between them, and a metaphysis where the two meet

## universities
+au

## modules
+AU-MED-102

## exam_signal
src_51fef9b6234c5d381f59 | question_book | | p3 | 101 ISK
src_764a2521809818b8abdc | question_book | | p4 | 101 ISK
src_51fef9b6234c5d381f59 | question_book | | p4 | 101 ISK
src_5d2dbb44df399f871731 | question_book | | p24 | AU-MED-102

## field_notes
universities: AU-MED-102 Medical Terminology tests this same long-bone region set via its own MCQ bank (Lecture 5, Q180-181, Q186); adding au/AU-MED-102 as an overlay rather than a new record.
examSignal: exam_signal does not take a "+" append, so the field is restated in full — the three existing lines copied verbatim from the live/pending record, plus this lane's own line.
