<!--
  INDEX: apply this file's rows only after their named dependency is live.

  CON-GIT-4952149F99782D (carcinoid tumour) — dependency:
  docs/Kasr-Source-Imports/concept/103-BMS-mcq-aromatic-concepts.md. That
  concept is authored but not yet imported; this sparse update (+hu, +HU_Y3,
  +HU-GIT-301, plus the appendix-site fact) must be applied after the Kasr
  file lands live, never before, or the importer creates a near-empty stub
  under this id per 00-START-HERE §2's stub-create guard.
-->

# Item

## id
CON-GIT-4952149F99782D

## label
Carcinoid tumour overproduces serotonin, so blood and urine 5-HIAA rise — and pellagra may develop because tryptophan is diverted away from nicotinic acid

## definition
Carcinoid tumour overproduces serotonin, raising blood and urine 5-HIAA, and can cause pellagra because tryptophan is diverted away from nicotinic acid synthesis. Within the gastrointestinal tract the appendix is its commonest site.

## explicit_objective
State carcinoid tumour’s serotonin/5-HIAA/pellagra syndrome and name the appendix as its commonest GI site.

## aliases
Carcinoid tumour
Argentaffinoma
5-HIAA
5-hydroxyindole-acetic acid
Appendiceal carcinoid

## universities
+hu

## learner_years
+3

## modules
+HU-GIT-301

## module_subject
HU-GIT-301 > Pathology > Diseases of the Oral Cavity and the Gastrointestinal Tract > Colon and rectum

## exam_weight_by_year
HU_Y3=0.4

## field_notes
universities: Adding hu/HU_Y3/HU-GIT-301 as an overlay; this id is not yet live — written to pending-live with an apply-after header naming its dependency file, per 00-START-HERE §4.
content: Definition and explicit_objective expanded to add the appendix-as-commonest-site fact tested by HU-GIT-301-B item #47, alongside the serotonin/5-HIAA/pellagra fact already on the pending record — one carcinoid-tumour concept, not two.
