<!--
  INDEX: apply this file's row only after its named dependency is live.

  CON-GIT-33EAF87333AAD5 (chylomicron/VLDL transport function) --
  dependency: docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md.
  That concept is authored but not yet imported; this sparse update (+hu,
  +HU_Y3, +HU-GIT-301) must be applied after the Kasr file lands live,
  never before, or the importer creates a near-empty stub under this id per
  00-START-HERE §2's stub-create guard.
-->

# Item

## id
CON-GIT-33EAF87333AAD5

## label
Chylomicrons carry dietary triacylglycerol out of the gut; VLDL carries hepatic triacylglycerol out of the liver

## universities
+hu

## learner_years
+3

## modules
+HU-GIT-301

## module_subject
HU-GIT-301 > Biochemistry > Digestion and Absorption

## exam_weight_by_year
HU_Y3=0.4

## field_notes
universities: Adding hu/HU_Y3/HU-GIT-301 as an overlay; this id is not yet live -- written to pending-live with an apply-after header naming its dependency file, per 00-START-HERE §4. The existing definition already fully covers this item's tested fact (dietary fat is transported in blood as chylomicrons); no content change needed, tags only.
