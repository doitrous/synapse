<!--
  ZU-MED-103 (Structure and Function) — 5 sparse PENDING-LIVE concept
  overlays, covering 6 questions (CON-FND-3660CDEFA054C3 is targeted by both
  Q1 and Q28).

  Every ## id below targets a concept that exists ONLY in another lane's
  unimported batch — none is in server/data/medical-library-v1.json yet
  (checked directly against the live JSON). Apply this file ONLY after the
  named source file (Kasr 101-ISK / 102-INT, or Ain Shams ASU-IMM) is live.

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
CON-FND-3660CDEFA054C3

## label
Histones are lysine- and arginine-rich basic proteins that condense DNA into nucleosomes — an octamer core of H2A, H2B, H3 and H4 wrapped by about 140 bp of DNA, connected by H1-bound linker DNA into a beads-on-a-string chromatin fibre

## universities
+zu

## modules
+ZU-MED-103

## module_subject
ZU-MED-103 > Structure and Function > Cell biology
102 INT > Biochemistry > Nucleic acids

## field_notes
zu: Final S&F 2024 .pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q1, "What is the first level of DNA packing in metaphase chromosome?" (answer: Nucleosome, hand-drawn-ink key) and Q28, "Which one of the following proteins binds to DNA?" (answer: Histone, hand-drawn-ink key). Both questions land on the same underlying fact this Kasr 102-INT concept already states in full (histones bind/condense DNA into nucleosomes) — one concept answers both without becoming two stapled facts, same pattern as ZU-MED-106's Q14/Q17 and ZU-MED-107's Q6/Q9/Q13. Found by `find-existing.mjs "nucleosome"`.

---

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
