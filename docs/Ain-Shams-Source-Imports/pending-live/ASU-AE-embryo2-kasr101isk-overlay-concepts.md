<!--
  ASU-AE · Embryo 2 MCQ cluster (src_a7e3b821ab294015c05f, "MCQs - Embryo 2.pdf")
  — pending-live sparse CONCEPT overlay.

  The ## id below targets a concept that exists ONLY in Kasr's unimported
  101-ISK batch — not yet in server/data/medical-library-v1.json.
  find-existing.mjs "chorion frondosum" surfaced this exact fact already
  minted there. One canonical key, one id, university-blind — this row
  overlays ASU's own tags onto it rather than re-minting.

  Apply this file ONLY after the named source file is live:
    A. docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md —
       university `kasr`, module `101-ISK` (Anatomy, Placenta > Chorionic villi).

  Per LANE-BRIEF §6 rule 1/2 and the concepts manual: `## module_subject`
  fully replaces on every write (no `+` form) — the row below restates the
  source's existing line plus ASU's own. `## universities`, `## learner_years`
  and `## modules` are true ID-list columns and take `+asu` / `+1` / `+ASU-AE`.

  Simulate together with the source file this block targets:
  node scripts/content/gate.mjs simulate \
    docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-embryo2-kasr101isk-overlay-concepts.md \
    docs/Ain-Shams-Source-Imports/question/ASU-AE-embryo2-mcq.md
-->

# Item

## id
CON-DEV-E099FAA01BEAEB

## label
Chorionic villi run primary to secondary to tertiary, and the chorion that carries them splits into frondosum and laeve

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > Placenta > Chorionic villi
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Tested directly in the ASU-AE Embryo 2 MCQ bank — "The fetal part of placenta is derived from:" with the correct option "Chorion frondosum". "MCQs - Embryo 2.pdf" p.2 Q5, printed answer table p.13 row 5 (d/chorion frondosum). This record's own definition already states "the chorion carrying well-developed villi is the chorion frondosum, which persists as the fetal part of the placenta", covering this fact directly.
