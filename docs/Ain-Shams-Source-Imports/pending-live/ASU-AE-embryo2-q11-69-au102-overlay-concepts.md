<!--
  ASU-AE · Embryo 2 MCQ cluster (src_a7e3b821ab294015c05f, "MCQs - Embryo 2.pdf"),
  Q11-69 pass (lane 10) — pending-live sparse CONCEPT overlay.

  The ## id below targets a concept that exists ONLY in Alexandria's
  unimported AU-MED-102 embryology batch — not yet in
  server/data/medical-library-v1.json. find-existing.mjs "capacitation"
  surfaced this exact fact already minted there (its own definition opens
  "In the female genital tract, the sperm undergoes capacitation"), and
  ASU-AE's own lane 9 pass already overlaid onto it once for Embryo 1's
  capacitation-timing question — this file adds Embryo 2's Q11-69 capacitation
  questions (site and essentiality) onto the same record rather than
  re-minting.

  Apply this file ONLY after the named source file is live:
    A. docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md —
       university `au`, module `AU-MED-102` (Embryology, Fertilization).

  Per LANE-BRIEF §6 rule 1/2 and the concepts manual: `## module_subject`
  fully replaces on every write (no `+` form) — the row below restates the
  source's existing line plus ASU's own. `## universities`, `## learner_years`
  and `## modules` are true ID-list columns and take `+asu` / `+1` / `+ASU-AE`.

  Simulate together with the source file this block targets:
  node scripts/content/gate.mjs simulate \
    docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-embryo1-au102-overlay-concepts.md \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-embryo2-q11-69-au102-overlay-concepts.md \
    docs/Ain-Shams-Source-Imports/question/ASU-AE-embryo2-mcq.md
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
asu: Tested four times in the ASU-AE Embryo 2 MCQ bank Q11-69 pass, all on where capacitation happens or how essential it is. "The process of sperm capacitation takes place within the:" and its near-duplicate "Where does the process of sperm capacitation take place?" (correct option "Female genital tract" each time; two further worded-differently repeats of this same question are held as duplicates), "Sperm capacitation occurs in the:" (correct option "Uterus," the only female-tract option among otherwise male-tract distractors), and "As regards sperm capacitation, choose the CORRECT statement:" (correct option "Is essential for fertilization"). "MCQs - Embryo 2.pdf" p.4 Q18, p.5 Q21/Q28, p.6 Q33, p.11 Q65; printed answer table rows 18 (p.13, OCR-recovered via remark-text match after two re-OCR passes at 400/600 dpi, corroborated by rows 28/33's identical fact on the clean p.14 render), 21 (p.14 row 21 = e), 28 (p.14 row 28 = c), 33 (p.14 row 33 = e), 65 (p.15 row 65 = b). This record's own definition already opens "In the female genital tract, the sperm undergoes capacitation," covering both the site and (via "is a prerequisite for the acrosome reaction") the essentiality fact directly.
