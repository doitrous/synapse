<!--
  ZU-MED-103 (Structure and Function) — 4 sparse PENDING-LIVE concept
  overlays, covering 4 questions.

  A 5th candidate, CON-FND-3660CDEFA054C3 (Kasr 102-INT, "Histones... condense
  DNA into nucleosomes"), was found for Q1/Q28 by `find-existing.mjs
  "nucleosome"` but dropped: its own `article_ids` field is empty — no
  authored article covers it anywhere in the corpus, a gap in Kasr's own
  102-INT batch, not fixable from here (same reasoning as ZU-MED-107's own
  dropped Helwan HU-BMS-102 candidate, `pending-live/ZU-MED-107-git-pending-
  overlays.md`). Q1 and Q28 mint a fresh, covered concept instead
  (`CON-FND-9604144A11BB6A`, `concept/ZU-MED-103-sf-final24-concepts.md`).

  Every ## id below targets a concept that exists ONLY in another lane's
  unimported batch — none is in server/data/medical-library-v1.json yet
  (checked directly against the live JSON). Apply this file ONLY after the
  named source file (Kasr 101-ISK, or Ain Shams ASU-IMM) is live.

  Per 00-START-HERE.md §4 ("A hit only in another lane's unimported batch →
  the same sparse update, written into <import root>/pending-live/<slug>.md")
  — same logic ZU-MED-106's and ZU-MED-107's pending-live overlay files
  applied.

  `## label` restates the target's own live-record label verbatim (required
  discriminator). `## universities`/`## modules` are true ID-list columns —
  `+zu`/`+ZU-MED-103`, safe appends. `## module_subject` is a full-replacement
  path list (00-START-HERE.md §3) — every row restates the target's existing
  path plus ZU's own new line, ZU's own line listed first (same reasoning as
  ZU-MED-106's and ZU-MED-107's pending-overlay files: `gate.mjs batch` only
  checks `module_subject`'s very first segment against the modules this row
  *locally* declares). `## learner_years` is a plain-number ID-list field,
  already `1` on every target below, so no addition is needed there.
-->

# Item

## id
CON-FND-0A988681FF1ABF

## label
Glandular epithelium is epithelium modified to secrete, and the presence of a duct divides glands into exocrine, endocrine and mixed

## universities
+zu

## modules
+ZU-MED-103

## module_subject
ZU-MED-103 > Structure and Function > Histology
101 ISK > Histology > Epithelium

## field_notes
zu: Final S&F 2024 .pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q4, "What type of gland secretes its product through a duct or tube?" (answer: Exocrine gland, hand-drawn-ink key). Direct match — the live-pending concept's own definition states the duct/exocrine/endocrine/mixed distinction verbatim. Found by `find-existing.mjs "exocrine gland"`.

---

# Item

## id
CON-FND-D716C3939DB217

## label
Basal infoldings increase the basal surface area, with mitochondria stacked vertically between them to power active transport

## universities
+zu

## modules
+ZU-MED-103

## module_subject
ZU-MED-103 > Structure and Function > Histology
101 ISK > Histology > Epithelium

## field_notes
zu: Final S&F 2024 .pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q5, "What is the type of epithelial cell specialization found in striated ducts of salivary glands for increasing surface area for transport?" (answer: Basal inholdings [infoldings], hand-drawn-ink key). Direct match. Found by `find-existing.mjs "basal infoldings"`.

---

# Item

## id
CON-FND-68DA70C4BBE2A1

## label
Pseudostratified columnar epithelium is simple — every cell reaches the basement membrane — and comes in three forms distinguished by what is on the apex

## universities
+zu

## modules
+ZU-MED-103

## module_subject
ZU-MED-103 > Structure and Function > Histology
101 ISK > Histology > Epithelium

## field_notes
zu: Final S&F 2024 .pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q6, "Pseudostratified columnar epithelium belongs to which type of the following?" (answer: Simple epithelium, hand-drawn-ink key). Direct match. Found by `find-existing.mjs "pseudostratified"`.

---

# Item

## id
CON-IMM-CCB3049ABF5021

## label
Opsonization is the process by which IgG and/or C3b tag antigens for enhanced phagocytosis and destruction by effector cells

## universities
+zu

## modules
+ZU-MED-103

## module_subject
ZU-MED-103 > Structure and Function > Immunology
ASU-IMM > Immunology > Innate-adaptive interface

## field_notes
zu: Final S&F 2024 .pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q22, "Regarding opsonization, which of the following best describe it?" (answer: Making the foreign materials more susceptible for phagocytosis, hand-drawn-ink key). Direct match — the pending concept's own definition states this tagging-for-phagocytosis mechanism. Found by `find-existing.mjs "opsonization"`.
