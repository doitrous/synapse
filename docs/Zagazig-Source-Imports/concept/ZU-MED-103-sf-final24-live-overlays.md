<!--
  ZU-MED-103 (Structure and Function) — 3 sparse LIVE concept overlays.

  All 3 ids below are already LIVE in server/data/medical-library-v1.json —
  confirmed directly against the JSON. Per the concept-id overlay rule
  (00-START-HERE.md §3) and LANE-CARD.md §7: OVERLAY onto the live id,
  sparse rows only, never a full record.

  `## learner_years` is a plain-number ID-list field on concepts
  (`learnerYears`, not a scoped id like `ZU_Y1`) — `+1` is the real shape.

  Import: Admin › Concepts › Import, with "Update matching items" on.
-->

# Item

## id
CON-HEM-3DC3EAA5D4D84B

## label
Bone-marrow megakaryocytes produce platelets

## universities
+zu

## learner_years
+1

## modules
+ZU-MED-103

## module_subject
ZU-MED-103 > Structure and Function > Hematology

## exam_weight_by_year
ZU_Y1=0.55

## field_notes
zu: Final S&F 2024 .pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q8, "Platelets are formed from what type of cell?" (answer: Megakaryocyte, hand-drawn-ink key). Direct match — the live concept's own label states exactly this fact. Found by `find-existing.mjs "megakaryocyte"`.

---

# Item

## id
CON-HEM-88860E0417E50F

## label
Hereditary spherocytosis produces less-flexible spherical RBCs that hemolyze readily because of membrane-protein mutations

## universities
+zu

## learner_years
+1

## modules
+ZU-MED-103

## module_subject
ZU-MED-103 > Structure and Function > Hematology

## exam_weight_by_year
ZU_Y1=0.55

## field_notes
zu: Final S&F 2024 .pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q19, "Which of the following is best describe congenital spherocytosis disease?" (answer: It is regarded as a type of hemolytic anemia, hand-drawn-ink key). Direct match — the live concept's own definition states this membrane-defect-causes-hemolysis mechanism. Found by `find-existing.mjs "hereditary spherocytosis"`.

---

# Item

## id
CON-GIT-CFF765C2EF7ED9

## label
Lactulose is an unabsorbed synthetic fructose-galactose disaccharide that retains bowel water and is metabolized by colonic bacteria to lactic acid

## universities
+zu

## learner_years
+1

## modules
+ZU-MED-103

## module_subject
ZU-MED-103 > Structure and Function > Biochemistry

## exam_weight_by_year
ZU_Y1=0.5

## field_notes
zu: Final S&F 2024 .pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q23, "Which of the following disaccharides is used in treatment of constipation and hepatic encephalopathy?" (answer: Lactulose, hand-drawn-ink key). The live concept's own mechanism (retains bowel water — osmotic laxative effect for constipation; colonic bacterial fermentation to lactic acid — ammonia-trapping effect used in hepatic encephalopathy) already implies both therapeutic uses ZU's question names, without needing a full-record rewrite. A Helwan pending concept (HU-GIT-301, "Lactulose... used to relieve hepatic encephalopathy") states one of the two uses explicitly but this live record was preferred as the overlay target: already live, and its mechanism-level definition covers both facts without becoming two stapled records. Found by `find-existing.mjs "lactulose"`.
