<!--
  ASU-AE · Embryo 1 MCQ cluster (src_5d3b735488d8c321d5bd, "MCQs - Embryo 1.pdf")
  — pending-live sparse CONCEPT overlay.

  The ## id below targets concepts that exist ONLY in Alexandria's unimported
  AU-MED-102 embryology batch — not yet in server/data/medical-library-v1.json.
  find-existing.mjs "capacitation" and "acrosome reaction" surfaced these exact
  facts already minted under Alexandria's AU-MED-102 (Wagih embryology). One
  canonical key, one id, university-blind — these rows overlay ASU's own tags
  onto them rather than re-minting.

  Apply this file ONLY after the named source file is live:
    A. docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md —
       university `au`, module `AU-MED-102` (Embryology, Fertilization).

  Per LANE-BRIEF §6 rule 1/2 and the concepts manual: `## module_subject`
  fully replaces on every write (no `+` form) — the rows below restate the
  source's existing line plus ASU's own. `## universities`, `## learner_years`
  and `## modules` are true ID-list columns and take `+asu` / `+1` / `+ASU-AE`.

  Simulate together with the source file this block targets:
  node scripts/content/gate.mjs simulate \
    docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-embryo1-au102-overlay-concepts.md \
    docs/Ain-Shams-Source-Imports/question/ASU-AE-embryo1-mcq.md
-->

# Item

## id
CON-DEV-CA422E559742A2

## label
Capacitation strips the glycoprotein coat from the sperm surface before it can fertilise

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
AU-MED-102 > Embryology > Fertilization
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Tested directly in the ASU-AE Embryo 1 MCQ bank — "Before fertilization, the sperm must undergo:" with the correct option "Capacitation". "MCQs - Embryo 1.pdf" p.5 Q28, printed answer table p.8 row 28 — letter column reads "c" (confirmed by a zoomed re-crop of the scan), though the row's own remark text reads "Acrosome formation" (option D's wording, not option C's), a source transcription slip resolved in favour of the letter (full reasoning in the question's own `author_notes`, QST-DEV-ASU-AE-EMBRYO1-CAPACITATION-TIMING). No independent Embryology article exists in this ASU-AE pass for this fact; the question cites Alexandria's own AU-MED-102 article via `library_ids` is not set here since the concept's own `article_ids` already carries it.

---

# Item

## id
CON-DEV-642BA9E28AC8B6

## label
The zona pellucida blocks polyspermy and stops the blastomeres sticking to the tubal wall

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
AU-MED-102 > Embryology > Fertilization
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Tested twice in the ASU-AE Embryo 1 MCQ bank — "The non-cellular layer that is secreted around the ovum is:" (correct option "Zona pellucida") and "The zona pellucida is:" (correct option "A membrane that surrounds the ovum"). "MCQs - Embryo 1.pdf" p.5 Q30-Q31, printed answer table p.9 rows 30-31 (c/zona pellucida is non-cellular, b/zona pellucida surrounds the ovum). This record's own definition already opens "the acellular glycoprotein coat around the oocyte", covering both ASU facts directly; its own stated objective (blocking polyspermy) is left untouched.
