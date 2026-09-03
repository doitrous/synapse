<!--
  ASU-AE · Embryo 3 MCQ cluster (src_3448fabd352cb8018ed3, "MCQs - Embryo 3.pdf"),
  Q56-104 pass (lane 12) — pending-live sparse CONCEPT overlay.

  The one ## id row below targets a concept that exists ONLY in Kasr's
  unimported general 101-ISK batch (docs/Kasr-Source-Imports/concept/101-ISK-concepts.md
  -- distinct from the 101-ISK-mcq-concepts.md file lane 11's own overlay
  targets) — not yet in server/data/medical-library-v1.json. A grep of that
  file for "folding" surfaced this exact fact already minted there (its own
  definition states the same cranio-caudal folding outcomes this cluster's
  Q78 tests, including the connecting stalk's ventral/cranial repositioning).
  One canonical key, one id, university-blind — this row overlays ASU's own
  tags onto it rather than re-minting.

  Apply this file ONLY after the named source file is live:
    A. docs/Kasr-Source-Imports/concept/101-ISK-concepts.md —
       university `kau`, module `101 ISK` (Anatomy, General Embryology).

  Simulate together with the source file this block targets:
  node scripts/content/gate.mjs simulate \
    docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-embryo3-kasr101isk-general-overlay-concepts.md \
    docs/Ain-Shams-Source-Imports/question/ASU-AE-embryo3-mcq.md
-->

# Item

## id
CON-DEV-44A219B862FFD5

## label
Folding turns a flat disc into a cylinder with a gut inside it and a ring in its belly wall

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Embryonic Period
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Reused as `main_concept` for one ASU-AE Embryo 3 item: Q78 ("All the following are results of folding EXCEPT" -- Connecting stalk becomes dorsal, the false statement, since this record's own definition states the connecting stalk becomes more cranial and *ventral*, not dorsal). "MCQs - Embryo 3.pdf" p.11, printed answer table p.19 row 78.
