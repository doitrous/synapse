<!--
  INDEX: apply this file's rows only after their named dependency is live.

  CON-GIT-4952149F99782D (carcinoid tumour) — dependency:
  docs/Kasr-Source-Imports/concept/103-BMS-mcq-aromatic-concepts.md. That
  concept is authored but not yet imported; this sparse update (+hu, +HU_Y3,
  +HU-GIT-301, plus the appendix-site fact) must be applied after the Kasr
  file lands live, never before, or the importer creates a near-empty stub
  under this id per 00-START-HERE §2's stub-create guard.

  CON-FND-A0BC07E35554B1 (alcoholic hepatic steatosis pathogenesis) and
  CON-FND-B9A3C8B28B1443 (primary haemochromatosis) — dependency:
  docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md. Both
  concepts are authored but not yet imported; these sparse updates (+hu,
  +HU_Y3, +HU-GIT-301, plus a fact addition each) must be applied after the
  Kasr file lands live, never before, or the importer creates near-empty
  stubs under these ids per 00-START-HERE §2's stub-create guard.
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

---

# Item

## id
CON-FND-A0BC07E35554B1

## label
Hepatic steatosis follows four routes: more fat in, less oxidised, more made, less exported

## definition
Steatosis arises from excessive entry or defective metabolism of lipids, by four routes, each with an example: increased fatty acids entering the liver, as in starvation and corticosteroid excess; decreased fatty acid oxidation, as in hypoxia; increased triglyceride formation, as with alcohol; and impaired lipoprotein secretion from the liver, also alcohol. Alcohol therefore contributes to steatosis at two of the four routes: it raises triglyceride formation and it impairs lipoprotein export, while it decreases, not increases, fatty acid oxidation.

## explicit_objective
Discuss the four routes of hepatic steatosis pathogenesis and identify which of them alcohol works through.

## aliases
Pathogenesis of fatty liver
Fatty liver mechanism
Alcohol and fatty liver
Mechanism of steatosis
Alcoholic steatosis

## universities
+hu

## learner_years
+3

## modules
+HU-GIT-301

## module_subject
HU-GIT-301 > Pathology > Liver, GB and Pancreas > Alcoholic liver disease

## exam_weight_by_year
HU_Y3=0.4

## field_notes
universities: Adding hu/HU_Y3/HU-GIT-301 as an overlay; this id is not yet live — written to pending-live with an apply-after header naming its dependency file, per 00-START-HERE §4.
content: Definition and explicit_objective expanded to add the explicit alcohol-acts-at-two-of-four-routes reading tested by HU-GIT-301-B item #13 (an "except" stem naming increased fatty acid oxidation as the false route) alongside the four-route pathogenesis already on the pending record — one steatosis-pathogenesis concept, not two.

---

# Item

## id
CON-FND-B9A3C8B28B1443

## label
Primary haemochromatosis is a chromosome-6 defect that loads the body with iron

## definition
Primary haemochromatosis is the commonest form of iron overload, a congenital chromosome-6 gene defect that increases intestinal iron absorption; only homozygotes reach dangerous iron levels. Iron deposition produces a slightly enlarged, dense, chocolate-brown liver, with fibrous septa developing slowly into a micronodular pigmented cirrhosis — the specific type of cirrhosis caused by haemochromatosis, distinct from post-necrotic, nutritional or alcoholic cirrhosis. In advanced disease, iron also deposits in the pancreas, adrenal, pituitary and thyroid, and bronze diabetes follows iron damage to the pancreatic islets together with increased pituitary melanotropin.

## explicit_objective
Name pigmented cirrhosis as the specific cirrhosis type caused by haemochromatosis and explain the iron-loading mechanism behind it.

## aliases
Haemochromatosis
Hemochromatosis
Bronze diabetes
Primary haemochromatosis
Iron overload
Pigmented cirrhosis

## universities
+hu

## learner_years
+3

## modules
+HU-GIT-301

## module_subject
HU-GIT-301 > Pathology > Liver, GB and Pancreas > Haemochromatosis

## exam_weight_by_year
HU_Y3=0.4

## field_notes
universities: Adding hu/HU_Y3/HU-GIT-301 as an overlay; this id is not yet live — written to pending-live with an apply-after header naming its dependency file, per 00-START-HERE §4.
content: Definition and explicit_objective expanded to name "pigmented cirrhosis" explicitly as the cirrhosis-classification-scheme answer tested by HU-GIT-301-B item #15, alongside the bronze-diabetes/iron-overload mechanism already on the pending record — one haemochromatosis concept, not two.
