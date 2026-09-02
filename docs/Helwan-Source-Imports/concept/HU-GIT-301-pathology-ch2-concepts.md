<!--
  HU-GIT-301 pathology, Chapter 2: "Liver, GB and Pancreas"
  (scripts/helwan/extract/HU-GIT-301/mcq-bank-pathology.json). 22 new
  concepts, minted GIT-system. Two facts (alcoholic hepatic steatosis
  mechanism, haemochromatosis pigmented cirrhosis) reuse near-exact pending
  Kasr 108-INT pathology concepts via a sparse pending-live overlay instead
  of minting twins — see docs/Helwan-Source-Imports/pending-live/HU-GIT-301-questions.md.
  Search performed via find-existing.mjs before every mint; the one
  near-miss (live GIT-system "purgatives" concepts, a different
  classification scheme) is recorded on the pharmacology cluster's purgative
  concept, not this file.
-->

# Item

## id
CON-GIT-37FAA76C62AA7A

## label
Hepatic zone 3 (centrilobular) is the most vulnerable to ischaemic injury

## canonical_key
liver-zonation.zone-3-ischaemic-vulnerability

## aliases
Centrilobular zone
Zone 3 hepatocytes
Liver acinar zonation

## arabic_label
المنطقة الكبدية الثالثة (حول الوريد المركزي)

## arabic_aliases


## definition
The liver acinus is divided into three zones by distance from the portal tract blood supply. Zone 1 (periportal) receives the most oxygenated blood and is the most resistant to ischaemia. Zone 3 (centrilobular, pericentral) is farthest from the portal supply and receives the least oxygenated blood, making it the zone most susceptible to injury from vascular insufficiency; it is also the zone richest in cytochrome P450 enzymes, so it is also most exposed to toxic drug metabolites.

## explicit_objective
Identify zone 3 as the centrilobular zone most vulnerable to ischaemic and hypoxic liver injury.

## pitfalls
Assuming zone 1, which is closest to the incoming portal blood, is the vulnerable zone; it is in fact the best-oxygenated and most ischaemia-resistant zone, the reverse of zone 3.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-LIVER-ZONATION-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-EC33259BDED4C0

## label
Hepatitis D virus is a defective virus that requires simultaneous HBV infection to replicate, producing HBV-HDV coinfection

## canonical_key
viral-hepatitis.hbv-hdv-coinfection

## aliases
Hepatitis D virus
Delta virus
HDV coinfection
Defective hepatitis virus

## arabic_label
العدوى المشتركة بفيروسي التهاب الكبد B و D

## arabic_aliases


## definition
Hepatitis D virus (HDV) is a defective RNA virus that requires the hepatitis B surface antigen (HBsAg) coat to replicate and cause infection. It therefore only infects a person already infected with, or being infected at the same time by, HBV. Simultaneous infection with both viruses is termed coinfection, usually producing a self-limited acute hepatitis with a low risk of chronicity.

## explicit_objective
Explain why HDV infection requires HBV infection and name HBV-HDV as the pairing that produces coinfection.

## pitfalls
Pairing HDV with HAV, HCV or HEV as a coinfection; only HBV supplies the HBsAg coat HDV is defective without, so HDV coinfection is specifically with HBV.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-VIRAL-HEPATITIS-COINFECT-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-5AB213EBD752FC

## label
Hepatitis E virus is enterically (faecal-oral) transmitted and can cause fatal fulminant hepatitis in pregnant women

## canonical_key
hev.transmission-and-pregnancy-risk

## aliases
HEV
Hepatitis E
Enteric hepatitis virus
Fulminant hepatitis in pregnancy

## arabic_label
فيروس التهاب الكبد E

## arabic_aliases


## definition
Hepatitis E virus (HEV) is transmitted enterically, by the faecal-oral route, typically through contaminated water, in the same pattern as hepatitis A virus. Unlike the other hepatitis viruses, HEV carries a distinctive risk in pregnancy: infection in a pregnant woman, particularly in the third trimester, can progress to fatal fulminant hepatitis.

## explicit_objective
State that HEV spreads enterically and name it as the hepatitis virus with a specific fulminant-hepatitis risk in pregnancy.

## pitfalls
Grouping HEV with the blood-borne or sexually transmitted hepatitis viruses (HBV, HCV, HDV); HEV instead follows the enteric, faecal-oral pattern of HAV, with its own added pregnancy-specific fulminant risk.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-HEPATITIS-E-VIRUS-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-0DCD5FDFB2F268

## label
HDV, unlike HAV, is capable of causing chronic hepatitis, particularly through HBV superinfection

## canonical_key
viral-hepatitis.clinicopathological-syndromes

## aliases
Viral hepatitis carrier state
Chronic hepatitis D
HDV superinfection

## arabic_label
المتلازمات السريرية المرضية لالتهاب الكبد الفيروسي

## arabic_aliases


## definition
Across the viral hepatitides, HAV and HBV infections are frequently subclinical, the carrier state is commonly caused by HBV or HCV, and acute symptomatic cases share a broadly similar clinical picture despite each virus having its own incubation period. HAV never causes chronic disease, but HDV can, particularly when it superinfects a person already a chronic HBV carrier, so HAV and HDV cannot be grouped together as both incapable of chronic disease.

## explicit_objective
Separate HAV, which never causes chronic hepatitis, from HDV, which can, especially via superinfection of a chronic HBV carrier.

## pitfalls
Assuming every hepatitis virus that is 'not chronic like HBV/HCV' behaves like HAV; HDV, unlike HAV, can and does establish chronic infection when it superinfects an existing HBV carrier.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-VIRAL-HEPATITIS-CLINICOP-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-31B12984BA100D

## label
Viral infection is the commonest cause of chronic hepatitis, and its recognised metabolic causes are alpha-1 antitrypsin deficiency, haemochromatosis and Wilson disease, not "cryptogenic"

## canonical_key
chronic-hepatitis.causes-and-commonest-cause

## aliases
Chronic hepatitis metabolic causes
Cryptogenic hepatitis
Chronic viral hepatitis

## arabic_label
أسباب التهاب الكبد المزمن

## arabic_aliases


## definition
Chronic hepatitis is caused most often by chronic viral infection (HBV or HCV), ahead of autoimmune, drug-induced and metabolic causes. The metabolic causes are specific genetic diseases — alpha-1 antitrypsin deficiency, haemochromatosis and Wilson disease. "Cryptogenic" is not itself a metabolic cause; it is the label given when no cause, metabolic or otherwise, can be identified.

## explicit_objective
Name viral infection as the commonest cause of chronic hepatitis and list its genuine metabolic causes, excluding "cryptogenic".

## pitfalls
Listing 'cryptogenic' alongside the genuine metabolic causes of chronic hepatitis; cryptogenic hepatitis is a diagnosis of exclusion, not a discrete metabolic disease category like haemochromatosis or Wilson disease.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-CHRONIC-HEPATITIS-CAUSES-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-ACA94E671B96AA

## label
Pyaemic (haematogenous) seeding produces multiple liver abscesses, and acute cholangitic abscesses are themselves multiple small portal-tract abscesses, not one single abscess

## canonical_key
liver-abscess.pyaemic-multiplicity-and-cholangitic-morphology

## aliases
Pyogenic liver abscess
Multiple liver abscess
Acute cholangitic abscess
Ascending cholangitis abscess

## arabic_label
الخراج الكبدي المتعدد والخراج الوعائي الصفراوي الحاد

## arabic_aliases


## definition
Multiple liver abscesses classically follow pyaemic (haematogenous) seeding of the liver by mixed flora from a distant septic focus, spreading via the portal or arterial circulation, in contrast to a solitary abscess from a traumatic, hydatid, or direct cholecystitis-related source. Acute cholangitic (ascending) abscesses, arising when mixed flora ascend the bile ducts, are themselves multiple small abscesses distributed through the portal tract areas around the bile ducts, not one single yellow abscess, with the bile ducts showing the full features of acute suppurative inflammation.

## explicit_objective
Attribute multiple liver abscesses to pyaemic seeding, and describe acute cholangitic abscesses as themselves multiple and portal-tract distributed.

## pitfalls
Picturing an acute cholangitic abscess as one discrete yellow abscess; ascending cholangitis instead produces multiple small suppurative abscesses strung along the portal tracts around the bile ducts.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-LIVER-ABSCESS-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-33EA73205E1DB4

## label
Tuberculosis, primary biliary cirrhosis and sarcoidosis are granulomatous liver diseases; non-alcoholic steatohepatitis (NASH) is not

## canonical_key
granulomatous-liver-disease.exclusion-nash

## aliases
Hepatic granuloma
Granulomatous hepatitis
NASH

## arabic_label
أمراض الكبد الورمية الحبيبية

## arabic_aliases


## definition
Granulomatous liver disease includes tuberculosis, primary biliary cirrhosis and sarcoidosis, all of which can produce hepatic granulomas. Non-alcoholic steatohepatitis (NASH) is a fatty liver disease with inflammation and hepatocyte injury, not a granuloma-forming process, so it is not classed among the granulomatous liver diseases.

## explicit_objective
List the classic granulomatous liver diseases and exclude NASH from them.

## pitfalls
Assuming any inflammatory liver disease, including NASH, forms granulomas; NASH is defined by steatosis with hepatocellular injury and inflammation, not by granuloma formation.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-GRANULOMATOUS-LIVER-DISE-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-BAA581552697A7

## label
Budd-Chiari syndrome is thrombosis of the hepatic veins, followed by congestion, fibrosis and cirrhosis

## canonical_key
budd-chiari-syndrome.hepatic-vein-thrombosis

## aliases
Hepatic vein thrombosis
Budd-Chiari syndrome

## arabic_label
متلازمة بود-كياري

## arabic_aliases


## definition
Budd-Chiari syndrome is thrombosis of the hepatic veins (the large veins draining the liver into the inferior vena cava), producing severe hepatic venous congestion that, if it persists, progresses to centrilobular fibrosis and cirrhosis. It is a postsinusoidal cause of portal hypertension, distinct from bile duct obstruction, from chronic passive congestion of heart failure, and from the small-venule injury of veno-occlusive disease.

## explicit_objective
Define Budd-Chiari syndrome as hepatic vein thrombosis and trace its progression to congestion, fibrosis and cirrhosis.

## pitfalls
Confusing Budd-Chiari syndrome's large hepatic-vein thrombosis with the small central-venule injury of veno-occlusive disease, or with chronic passive congestion from right heart failure; the level of venous obstruction differs between all three.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-BUDD-CHIARI-SYNDROME-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-BC0275FBF83417

## label
Cholesterol gallstones are predisposed to by obesity, diabetes and pregnancy, pigment stones by haemolytic anaemia, and gallstones can be complicated by secondary biliary cirrhosis

## canonical_key
gallstones.risk-factors-and-complications

## aliases
Cholesterol gallstones
Pigment gallstones
Secondary biliary cirrhosis
Cholelithiasis

## arabic_label
حصوات المرارة

## arabic_aliases


## definition
Cholesterol gallstones form when bile becomes supersaturated with cholesterol, favoured by obesity, diabetes and pregnancy. Pure pigment stones instead form from excess bilirubin turnover and are classically caused by chronic haemolytic anaemia. Whatever their type, gallstones that chronically obstruct bile flow can be complicated by secondary biliary cirrhosis.

## explicit_objective
Separate the risk factors for cholesterol stones (obesity, diabetes, pregnancy) from those for pigment stones (haemolytic anaemia), and name secondary biliary cirrhosis as a complication of chronic obstruction.

## pitfalls
Attributing haemolytic anaemia to cholesterol stone risk; haemolysis raises bilirubin turnover and drives pigment stone formation, a different pathway from the cholesterol-supersaturation route of obesity, diabetes and pregnancy.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-GALLSTONES-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-2A304391D21909

## label
Cirrhotic regeneration nodules show disordered, irregular architecture rather than the normal one-cell-thick radiating liver plates, and alcoholic cirrhosis can be micronodular, macronodular or mixed

## canonical_key
cirrhosis.regeneration-nodule-and-alcoholic-gross-features

## aliases
Regeneration nodule
Cirrhotic nodule architecture
Alcoholic cirrhosis gross features
Laennec's cirrhosis

## arabic_label
عقيدات التجدد الكبدي والتليف الكبدي الكحولي

## arabic_aliases


## definition
Regenerating nodules in cirrhosis show disordered architecture: irregular sinusoids with a central vein that may be absent or eccentric, hepatocytes that may be binucleated or dysplastic, and other changes such as necrotic foci, fatty change or hydropic change. This is the opposite of the normal liver plate, which is one cell thick and regularly radiates from the central vein; that regular radiating pattern is lost, not preserved, in a regenerating nodule. Alcoholic cirrhosis characteristically begins micronodular but can become macronodular or mixed as nodules coalesce, and its liver is typically firm, with irregular rather than rounded edges.

## explicit_objective
Contrast the disordered architecture of a cirrhotic regeneration nodule with the normal, regular liver plate, and describe the micro/macro/mixed nodular spectrum of alcoholic cirrhosis.

## pitfalls
Describing a regenerating nodule as preserving the normal one-cell-thick, centrally radiating liver plate architecture; that regular pattern is exactly what cirrhotic nodular regeneration disrupts.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-CIRRHOSIS-PATHOLOGICAL-F-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-8CDFF4B518D3B0

## label
Primary biliary cirrhosis is an autoimmune disease that predominantly affects middle-aged women, not men

## canonical_key
primary-biliary-cirrhosis.female-predominance

## aliases
PBC
Primary biliary cholangitis
Antimitochondrial antibody

## arabic_label
التليف الصفراوي الأولي

## arabic_aliases


## definition
Primary biliary cirrhosis is a chronic autoimmune disease of the intrahepatic bile ducts. Serum antimitochondrial antibodies are detected in most cases, and it predominantly affects middle-aged women rather than men. Grossly, the liver is enlarged, green from bile stasis, with a micronodular cut surface.

## explicit_objective
State that primary biliary cirrhosis predominantly affects middle-aged women and name its antimitochondrial antibody marker.

## pitfalls
Assuming primary biliary cirrhosis, like many other cirrhosis causes, affects men more; it is one of the classically female-predominant autoimmune liver diseases.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-PRIMARY-BILIARY-CIRRHOSI-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-32BEC60C00CAFA

## label
Portal hypertension is classified by the level of obstruction: presinusoidal (e.g. schistosomal portal tract fibrosis), sinusoidal (e.g. cirrhosis), or postsinusoidal (e.g. Budd-Chiari syndrome, veno-occlusive disease)

## canonical_key
portal-hypertension.presinusoidal-sinusoidal-postsinusoidal

## aliases
Presinusoidal portal hypertension
Portal hypertension classification
Schistosomal portal fibrosis

## arabic_label
تصنيف ارتفاع ضغط الدم البابي

## arabic_aliases


## definition
Portal hypertension is classified by where the resistance to portal flow arises. Presinusoidal causes obstruct before the sinusoid, the classic example being portal tract fibrosis from schistosomiasis. Sinusoidal causes, chiefly cirrhosis, distort the sinusoids themselves. Postsinusoidal causes obstruct after the sinusoid, at the level of the hepatic venules (veno-occlusive disease) or larger hepatic veins (Budd-Chiari syndrome).

## explicit_objective
Classify a cause of portal hypertension as presinusoidal, sinusoidal or postsinusoidal, naming schistosomiasis as the classic presinusoidal cause.

## pitfalls
Grouping schistosomal portal fibrosis with cirrhosis as a sinusoidal cause; schistosomiasis obstructs the portal tracts before blood ever reaches the sinusoid, which is what makes it presinusoidal rather than sinusoidal.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-PORTAL-HYPERTENSION-CLAS-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-2FA306EC2F7D04

## label
Liver cell adenoma is a benign hepatocyte tumour associated with oral contraceptive use in young women

## canonical_key
liver-cell-adenoma.oral-contraceptive-association

## aliases
Hepatocellular adenoma
Liver cell adenoma
Oral contraceptive liver tumour

## arabic_label
ورم الخلايا الكبدية الغدي الحميد

## arabic_aliases


## definition
Liver cell adenoma is a benign neoplasm of hepatocytes (not of bile duct origin) strongly associated with oral contraceptive use, occurring predominantly in young women rather than young men. It does not commonly harbour hepatocellular carcinoma, though a small subset, particularly larger or beta-catenin-mutated adenomas, carries some malignant potential.

## explicit_objective
Identify liver cell adenoma as a benign hepatocyte tumour of young women, associated with oral contraceptive use.

## pitfalls
Calling liver cell adenoma a bile duct tumour or a tumour of young men; it arises from hepatocytes and is characteristically a disease of young women taking oral contraceptives.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-LIVER-CELL-ADENOMA-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-A71F14D56CE891

## label
Alpha-fetoprotein (AFP) is the characteristic serum marker elevated in hepatocellular carcinoma

## canonical_key
hepatocellular-carcinoma.afp-marker

## aliases
AFP
Alpha-fetoprotein
Hepatocellular carcinoma marker

## arabic_label
ألفا فيتوبروتين في سرطان الخلايا الكبدية

## arabic_aliases


## definition
Hepatocellular carcinoma is characterised by elevation of serum alpha-fetoprotein (AFP), an oncofetal protein normally produced by fetal liver and yolk sac. This distinguishes it from CEA (colorectal), PSA (prostate) and CA19-9 (pancreatic/biliary tract, including cholangiocarcinoma).

## explicit_objective
Name AFP as the tumour marker elevated in hepatocellular carcinoma and distinguish it from CEA, PSA and CA19-9.

## pitfalls
Confusing hepatocellular carcinoma's AFP marker with cholangiocarcinoma's CA19-9 marker; the two primary liver cancers, hepatocyte-derived and bile-duct-derived, are tracked by different serum markers.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-HEPATOCELLULAR-CARCINOMA-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-A162570BB3E7A6

## label
Chronic biliary obstruction, liver tumours and liver granulomas can progress to chronic liver failure; Reye syndrome is an acute, not chronic, hepatic failure

## canonical_key
chronic-liver-failure.causes-excluding-reyes

## aliases
Chronic liver failure
Reye's syndrome
Chronic hepatic failure causes

## arabic_label
أسباب الفشل الكبدي المزمن

## arabic_aliases


## definition
Chronic liver failure can result from chronic biliary obstruction, primary or metastatic liver tumours replacing functioning parenchyma, and chronic hepatic granulomas, all of which progressively destroy liver function over time. Reye's syndrome is instead an acute fulminant hepatic failure of childhood, with microvesicular steatosis and encephalopathy classically linked to aspirin use during a viral illness, so it is not a cause of chronic liver failure.

## explicit_objective
List the causes of chronic liver failure and exclude Reye's syndrome, which causes acute rather than chronic failure.

## pitfalls
Listing Reye's syndrome among the chronic liver failure causes because it is severe; it is in fact a rapidly progressive acute hepatic failure of childhood, not a chronic process.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-CHRONIC-LIVER-FAILURE-CA-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-FA65769D66EDFF

## label
Hepatoblastoma is an embryonic tumour of immature hepatocytes that can secrete AFP; vinyl chloride and arsenic are linked to angiosarcoma, not hepatoblastoma

## canonical_key
hepatoblastoma.features-vs-angiosarcoma-risk-factors

## aliases
Hepatoblastoma
Hepatic angiosarcoma risk factors

## arabic_label
الورم الأرومي الكبدي

## arabic_aliases


## definition
Hepatoblastoma is an embryonic tumour of immature hepatocytes, whose stroma may contain fibrous tissue, cartilage or bone, and whose serum AFP level may be raised. Vinyl chloride and arsenic exposure are historically linked to hepatic angiosarcoma, a different, vascular liver malignancy, not to hepatoblastoma.

## explicit_objective
Describe hepatoblastoma as an embryonic hepatocyte tumour and correct the vinyl chloride/arsenic association to angiosarcoma rather than hepatoblastoma.

## pitfalls
Attaching vinyl chloride's or arsenic's carcinogenic history to hepatoblastoma; that toxin association belongs to hepatic angiosarcoma, a vascular tumour with a wholly different risk-factor profile from the embryonic hepatoblastoma.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-HEPATOBLASTOMA-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-0C3603E0F5D50B

## label
Cholangiocarcinoma arises from the biliary tree and is associated with primary sclerosing cholangitis, HCV and thorotrast, but not with a rise in alpha-fetoprotein

## canonical_key
cholangiocarcinoma.features-and-afp-not-a-marker

## aliases
Cholangiocarcinoma
Bile duct carcinoma
CA19-9

## arabic_label
سرطان القنوات الصفراوية

## arabic_aliases


## definition
Cholangiocarcinoma arises from the epithelium of the intrahepatic or extrahepatic biliary tree, and is associated with primary sclerosing cholangitis, HCV infection and historical thorotrast administration. Unlike hepatocellular carcinoma, it is not associated with a rise in alpha-fetoprotein; its own tumour marker is CA19-9.

## explicit_objective
State cholangiocarcinoma's biliary-tree origin and risk associations, and correct the tumour-marker confusion with hepatocellular carcinoma's AFP.

## pitfalls
Attributing hepatocellular carcinoma's AFP elevation to cholangiocarcinoma; cholangiocarcinoma is tracked by CA19-9, since AFP reflects hepatocyte, not bile duct, tumour biology.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-CHOLANGIOCARCINOMA-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-2CF40AAD617CF2

## label
Alcohol is the commonest cause of chronic pancreatitis, acting by increasing (not decreasing) the protein content of pancreatic secretions to form calcifying ductal plugs

## canonical_key
chronic-pancreatitis.alcohol-commonest-cause-and-pathogenesis

## aliases
Chronic pancreatitis
Alcoholic pancreatitis
Pancreatic duct protein plugs

## arabic_label
التهاب البنكرياس المزمن الكحولي

## arabic_aliases


## definition
Alcohol is the commonest cause of chronic pancreatitis. It is directly injurious to acinar cells, and it increases, rather than decreases, the protein content of pancreatic secretions; this excess protein forms plugs within the pancreatic ducts that become calcified, obstructing flow and driving the irreversible parenchymal destruction and fibrosis that define chronic pancreatitis.

## explicit_objective
Name alcohol as the commonest cause of chronic pancreatitis and correct its mechanism to increased, not decreased, ductal protein secretion forming calcifying plugs.

## pitfalls
Assuming alcohol reduces pancreatic protein secretion; it in fact increases the protein content of pancreatic juice, and it is this excess protein that plugs and calcifies within the ducts.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-CHRONIC-PANCREATITIS-ALC-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-0C830047DB4947

## label
Chronic pancreatitis is complicated by malabsorption, diabetes mellitus and pseudocyst formation from its exocrine and endocrine destruction

## canonical_key
chronic-pancreatitis.complications

## aliases
Chronic pancreatitis complications
Pancreatic pseudocyst formation
Pancreatic exocrine insufficiency

## arabic_label
مضاعفات التهاب البنكرياس المزمن

## arabic_aliases


## definition
Chronic pancreatitis progressively destroys both the exocrine and endocrine pancreas, producing malabsorption from exocrine insufficiency, diabetes mellitus from endocrine (islet) insufficiency, and pseudocyst formation from ductal disruption. These three follow directly from the irreversible parenchymal destruction that defines the disease.

## explicit_objective
List malabsorption, diabetes mellitus and pseudocyst formation as the direct complications of chronic pancreatitis.

## pitfalls
Treating every long-term association of chronic pancreatitis, including its epidemiological link to later pancreatic cancer risk, as an equivalent direct complication to malabsorption, diabetes and pseudocyst formation; this course's complication list is built from the disease's direct exocrine and endocrine destruction.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-CHRONIC-PANCREATITIS-COM-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-742B5877CEED88

## label
Most pancreatic carcinomas arise in the head of the gland, presenting classically with jaundice, weight loss and back pain

## canonical_key
pancreatic-carcinoma.site-and-presentation

## aliases
Pancreatic carcinoma
Pancreatic head tumour
Pancreatic adenocarcinoma presentation

## arabic_label
سرطان البنكرياس

## arabic_aliases


## definition
The majority of pancreatic carcinomas arise in the head of the gland, where their growth obstructs the common bile duct and produces earlier presentation. The classic clinical presentation is jaundice, weight loss and back pain from retroperitoneal nerve invasion; new-onset diabetes can also occur but is not counted among this classic presenting triad.

## explicit_objective
Name the head of the pancreas as the commonest site for pancreatic carcinoma and state its classic jaundice/weight loss/back pain presentation.

## pitfalls
Counting new-onset diabetes as part of pancreatic carcinoma's classic presenting triad; this course's classic presentation is built from jaundice, weight loss and back pain, from the tumour's site in the head of the gland.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-PANCREATIC-CARCINOMA-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-23126DC050F76F

## label
A pancreatic pseudocyst, the commonest pancreatic cystic lesion, is walled by fibrosed granulation tissue rather than a true epithelial lining

## canonical_key
pancreatic-pseudocyst.no-epithelial-lining

## aliases
Pancreatic pseudocyst
Pancreatic cystic lesion

## arabic_label
الكيس الكاذب البنكرياسي

## arabic_aliases


## definition
A pancreatic pseudocyst accounts for most pancreatic cysts and follows a bout of acute pancreatitis or pancreatic trauma. It is encircled by fibrosed granulation tissue rather than a true epithelial lining, which is exactly what distinguishes it, as a "pseudo" cyst, from a true cystic neoplasm of the pancreas.

## explicit_objective
State that a pancreatic pseudocyst lacks a true epithelial lining and explain why that makes it a "pseudo" cyst.

## pitfalls
Describing a pancreatic pseudocyst as lined by epithelium, simple squamous or otherwise; its wall is fibrous granulation tissue, and the absence of any epithelial lining is the defining feature that earns it the name "pseudocyst".

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-PANCREATIC-PSEUDOCYST-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-4E9839EAC4210E

## label
Secondary peritoneal carcinomatosis is commonly derived from ovarian and pancreatic adenocarcinoma

## canonical_key
peritoneal-carcinomatosis.commonest-primary

## aliases
Peritoneal carcinomatosis
Transcoelomic spread
Secondary peritoneal deposits

## arabic_label
الانتشار الصفاقي الثانوي

## arabic_aliases


## definition
Secondary peritoneal deposits (peritoneal carcinomatosis) are commonly derived from ovarian and pancreatic adenocarcinoma, both of which characteristically spread by direct transcoelomic seeding across the peritoneal surface, unlike hepatocellular carcinoma, which spreads chiefly by local and vascular invasion.

## explicit_objective
Name ovarian and pancreatic adenocarcinoma as the classic primaries behind peritoneal carcinomatosis.

## pitfalls
Assuming hepatocellular carcinoma is a common source of peritoneal carcinomatosis because it is an intra-abdominal malignancy; HCC instead spreads chiefly by local and vascular invasion rather than transcoelomic peritoneal seeding.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
Gastrointestinal pathology

## subtopic
Liver, gall bladder and pancreas

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PATH-LIVER-PANCREAS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
3

## universities
hu

## blueprint_weight
0.4

## exam_weight_by_year
HU_Y3=0.4

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-PERITONEAL-CARCINOMATOSI-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: Helwan GIT-301 pathology-cluster sources are not yet in corpus-source-index.json, so no citation chain could be built this pass.

## owner
Helwan Year-3 authoring lane

## reviewer
Medical team, Helwan Pathology faculty

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
moduleIds: HU-GIT-301 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.
resourceIds: Helwan GIT-301 pathology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).
approvedFileResourceIds: No file resource has been rights-cleared for this concept yet.
approvedVideoResourceIds: This module has no video resource distributed yet.
resourceOccurrenceIds: Hand-authored from the GIT-301 pathology MCQ bank triage (scripts/helwan/extract/HU-GIT-301); no corpus extraction record exists for this concept.
sourceCandidateIds: find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
microtopicId: No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.
nanotopicId: No department-level nanotopic subdivision exists below microtopic for this fact.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

