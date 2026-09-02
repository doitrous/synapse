<!--
  INDEX: apply this file's rows only after their named dependency is live.

  CON-NEU-3FF95D30CD5825 (corneal transparency factors) — dependency:
  docs/Alexandria-Source-Imports/concept/AU-MED-203-histology-concepts.md.
  That concept is authored but not yet imported; this sparse update (+hu,
  +HU_Y3, +HU-ORL-305) must be applied after the AU-MED-203 batch lands
  live, never before, or the importer creates a near-empty stub under this
  id per 00-START-HERE §2's stub-create guard.
-->

# Item

## id
CON-NEU-3FF95D30CD5825

## label
Corneal transparency depends on few epithelial layers, regular collagen spacing in the stroma, and avascularity

## universities
+hu

## learner_years
+3

## modules
+HU-ORL-305

## module_subject
+HU-ORL-305 > Ophthalmology > Brief anatomy of the eye and its adnexa

## exam_weight_by_year
HU_Y3=0.4

## field_notes
dependency: This concept is pending, not live (docs/Alexandria-Source-Imports/concept/AU-MED-203-histology-concepts.md, AU-MED-203). This sparse overlay (+hu, +HU_Y3, +HU-ORL-305) must be applied only after that batch lands live, per 00-START-HERE §2's stub-create guard — never before.
scope: The existing definition (non-keratinised epithelium, regular stromal collagen spacing, endothelial pump, avascularity) already covers the transparency facts this cluster's Ch1 Q8/Q9/Q12 test; no content change is made here, only university/year/module access.
