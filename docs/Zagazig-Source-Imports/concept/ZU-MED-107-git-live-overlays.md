<!--
  ZU-MED-107 (GIT and Nutrition) — 3 sparse LIVE concept overlays.

  All 3 ids below are already LIVE in server/data/medical-library-v1.json —
  confirmed directly against the JSON (id, moduleIds, learnerYears,
  universityIds checked one by one, all three `kau`-only with
  `moduleIds: []` today). Per the concept-id overlay rule
  (00-START-HERE.md §3) and the same overlay-not-split logic the
  chief-of-staff ruled for ZU-MED-106's live-partial hits (LANE-CARD.md §7):
  OVERLAY onto the live id, sparse rows only, never a full record.

  `## learner_years` is a plain-number ID-list field on concepts
  (`learnerYears`, not a scoped id like `ZU_Y1`) — `+1` is the real shape.

  Import: Admin › Concepts › Import, with "Update matching items" on.
-->

# Item

## id
CON-GIT-6E386B69AA17CB

## label
Hydrochloric acid activates pepsinogen, after which pepsin autocatalytically activates additional molecules

## universities
+zu

## learner_years
+1

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Gastric secretion

## exam_weight_by_year
ZU_Y1=0.55

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q21, "Regarding pepsinogens, which of the following statements is appropriate?" (answer: their secretions are linked with HCl secretion, hand-drawn-ink key). Direct match — the live concept's own definition states exactly this activation relationship (HCl activates pepsinogen, then pepsin autocatalyses further activation), which is the fact ZU's question tests from the "secretion is linked with HCl secretion" angle. Found by `find-existing.mjs "pepsinogen"`.

---

# Item

## id
CON-GIT-EF1FC3448781A0

## label
CCK contracts the gallbladder wall

## universities
+zu

## learner_years
+1

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Biliary physiology

## exam_weight_by_year
ZU_Y1=0.55

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q27, "Regarding gallbladder Contractility, which one of the following stimulates it?" (answer: CCK, hand-drawn-ink key). Direct match — the live concept's own label/definition states exactly this fact. Found by `find-existing.mjs "CCK"`.

---

# Item

## id
CON-GIT-8D9AD0B22770C0

## label
CCK augments secretin-induced alkaline pancreatic duct secretion

## universities
+zu

## learner_years
+1

## modules
+ZU-MED-107

## module_subject
ZU-MED-107 > GIT and Nutrition > Pancreatic secretion

## exam_weight_by_year
ZU_Y1=0.55

## field_notes
zu: Fakous GIT final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q28, "As regards control of pancreatic secretion, which of the following factors increases the secretion of the exocrine pancreas?" (answer: Secretin, hand-drawn-ink key). Same underlying fact tested from the secretin side rather than the CCK side — the live concept's own definition states secretin drives alkaline pancreatic duct secretion, which CCK augments; ZU's question isolates secretin's own stimulatory role among distractors (Atropine, sympathetic stimulation, VIP) that all inhibit or are unrelated. Found by `find-existing.mjs "secretin"`.
