<!--
  HU-GIT-301 parasitology, Part 3: "Protozoa and mixed-organism clinical
  vignettes" (scripts/helwan/extract/HU-GIT-301/mcq-bank-parasitology.json,
  items #113-146, pp.20-25 of "MCQs - Para MCQ [GIT].pdf", minus #132/#137/
  #140 whose tested_concept_key was already authored by Part 1/Part 2).
  26 new concepts, minted GIT-system. find-existing.mjs was
  run against every distinctive organism/term in this chunk (Fasciola,
  Taenia saginata, Entamoeba histolytica cyst, Cryptosporidium, amoebic
  liver abscess, Giardia lamblia, Toxocara, trichuris rectal prolapse,
  Ancylostoma duodenale, Enterobius vermicularis diagnostic, Ascaris barium,
  Diphyllobothrium latum, Fasciolopsis buski, Heterophyes, Pirenella
  conica), cross-checked against every canonical_key already minted in
  HU-GIT-301-parasitology-part1-data.mjs and -part2-data.mjs. Five real
  same-scope hits were found, all in this lane's own Part 1 (not a twin --
  reused directly via the build script's combined root->id map rather than
  re-minted): the Fasciolopsis buski/B12-anaemia concept (item #138), the
  shared-metacercaria infective-stage concept (item #142), the Heterophyes
  ectopic-egg-embolism/myocarditis concept (item #144, already reused once
  before by Part 2), the Heterophyes stool-concentration concept (item
  #146), and the multi-species parasitic-appendicitis concept (item #135 --
  this vignette's printed key additionally names Entamoeba histolytica, a
  protozoan not in the Part 1 record's helminth list; noted in the
  covering question's explanations rather than expanding the already-landed
  Part 1 file). One near-miss was NOT merged, and is recorded in
  rejected_merge_candidate_ids instead: Part 2's Enterobius
  plano-convex-egg-morphology concept (CON-GIT-FF0177C35FE48E) is narrower
  than this chunk's "diagnostic stage(s)" vignette fact, which additionally
  names the adult female worm as a valid diagnostic finding. All other
  searches (Fasciola, Taenia saginata, Cryptosporidium, amoebic liver
  abscess, Giardia lamblia, Toxocara, Ancylostoma duodenale, Ascaris barium
  sign) returned no same-scope hits. No overlay updates in this chunk.
  Eight items (#116, #119, #121, #123, #129, #130, #139, #146) were printed
  with 2-3 lettered options; a 4th option was added at build time for each
  (see field_notes.optionCount on the corresponding question) -- for #116
  and #146, whose printed correct answer is "all of the above", the added
  option is a genuinely TRUE additional fact so the printed answer stays
  valid; for the other six, the added option is a plausible wrong
  distractor. Printed correct answers unchanged throughout. This closes the
  module's parasitology backlog; biochemistry (23 keys) remains for a
  parallel chunk.
-->

# Item

## id
CON-GIT-55AA6EFD12728B

## label
A young man with right-hypochondrial pain, jaundice, hepatomegaly, eosinophilia and an egg-negative stool most likely has fascioliasis

## canonical_key
fasciola.clinical-vignette-diagnosis.biliary-colic-eosinophilia-egg-negative-stool

## aliases
Fascioliasis vignette
Fasciola hepatica clinical presentation
Acute hepatic fascioliasis

## arabic_label
التشخيص السريري لداء الفاشيولا

## arabic_aliases


## definition
A clinical picture of upper abdominal and right-hypochondrial pain, pruritus, weight loss, fever, tender hepatomegaly, jaundice, anaemia and marked eosinophilia, with stool examination free of ova, is the classic presentation of the acute (hepatic migratory) phase of fascioliasis, caused by Fasciola hepatica or Fasciola gigantica. The stool is typically negative for eggs at this stage because the immature flukes are still migrating through the liver parenchyma toward the bile ducts and have not yet matured into egg-laying adults resident in the biliary tree, which is why egg-negative stool does not exclude the diagnosis in a compatible clinical picture.

## explicit_objective
Recognise the acute hepatic-phase presentation of fascioliasis (right-hypochondrial pain, jaundice, hepatomegaly, marked eosinophilia) even when stool is negative for ova.

## pitfalls
Excluding fascioliasis because the stool is free of ova; the acute migratory phase precedes patent (egg-laying) infection, so a negative stool at this stage is expected, not reassuring.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-FASCIOLA-VIGNETTE-DIAGNO-01

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
CON-GIT-4F7F1B3E506296

## label
Serological detection of specific antibodies confirms fascioliasis when stool examination is negative for ova

## canonical_key
fasciola.diagnosis.serology-when-stool-negative.confirms-acute-phase

## aliases
Fasciola serological diagnosis
Fascioliasis confirmation

## arabic_label
التشخيص المصلي لداء الفاشيولا عند سلبية البراز

## arabic_aliases


## definition
When a patient's clinical picture and eosinophilia suggest fascioliasis but stool examination is negative for ova (as expected during the pre-patent, hepatic migratory phase), serological diagnosis to detect specific anti-Fasciola antibodies is the confirmatory test, since serology becomes positive before the fluke matures and begins shedding eggs. Direct stool examination and duodenal aspiration both depend on the parasite already being a mature, egg-laying adult resident in the bile ducts, so neither is reliable during the acute phase, making serology — not "all of the above" — the correct confirmatory step in this scenario.

## explicit_objective
Identify serology as the confirmatory test for fascioliasis specifically when stool examination is negative, in contrast to direct stool examination or duodenal aspiration, which both require patent (egg-laying) infection.

## pitfalls
Assuming direct stool examination or duodenal aspiration can confirm fascioliasis at any stage; both depend on the fluke already being a mature, egg-shedding adult in the bile ducts, which is not yet true during the acute hepatic phase this vignette describes.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-FASCIOLA-SEROLOGY-DIAGNO-01

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
CON-GIT-DAB2EA01845F37

## label
Recurrent abdominal colic with passage of white, rectangular, fleshy segments in stool points to Taenia saginata, not Taenia solium or Hymenolepis species

## canonical_key
taenia-saginata.clinical-vignette-diagnosis.motile-proglottid-passage

## aliases
Taenia saginata vignette
Beef tapeworm proglottid

## arabic_label
تشخيص عدوى الشريطية العزلاء من قطع البراز المتحركة

## arabic_aliases


## definition
A young patient with recurrent abdominal colic, vomiting, diarrhoea and the passage of white or creamy, rectangular, fleshy segments (roughly 2x1cm) in the stool is describing the motile gravid proglottids characteristic of Taenia saginata, the beef tapeworm, which actively crawl out and detach singly, unlike Taenia solium proglottids, which are typically passed passively in chains. Hymenolepis nana and Hymenolepis diminuta do not produce macroscopic segments of this size at all, since their proglottids are microscopic and not passed as visible fleshy pieces, which excludes them from this vignette.

## explicit_objective
Identify Taenia saginata from the description of motile, rectangular, fleshy proglottid segments passed in stool, distinguishing it from Taenia solium and the Hymenolepis species.

## pitfalls
Confusing Taenia saginata's actively motile, singly-passed proglottids with Taenia solium's more passively passed proglottid chains, or assuming Hymenolepis species could produce macroscopically visible segments, which they do not.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-TAENIA-SAGINATA-VIGNETTE-01

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
CON-GIT-F9461195C94BEF

## label
Taenia saginata infection can be diagnosed in stool both by finding eggs and, after successful treatment, by finding the scolex passed intact

## canonical_key
taenia-saginata.diagnostic-stages.egg-and-post-treatment-scolex

## aliases
Taenia saginata diagnostic stages
Post-treatment scolex recovery

## arabic_label
الأطوار التشخيصية للشريطية العزلاء

## arabic_aliases


## definition
Besides the motile gravid proglottids that first bring a Taenia saginata patient to attention, stool examination can additionally detect the parasite's eggs (indistinguishable microscopically from Taenia solium eggs) shed when a proglottid ruptures, and, specifically after successful anti-helminthic treatment, the scolex itself may be recovered intact in the stool, which is used to confirm that the whole worm — not just a broken chain of segments — has been expelled. Recovering the scolex after treatment is clinically important because a scolex left attached to the intestinal wall means the worm will regenerate and the segments will recur.

## explicit_objective
State that both eggs and, after successful treatment, the scolex are diagnostic findings for Taenia saginata in stool examination.

## pitfalls
Overlooking the scolex as a diagnostic finding; its recovery specifically after treatment confirms cure, since a retained scolex means the tapeworm will regrow.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-TAENIA-SAGINATA-DIAGNOST-01

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
CON-GIT-ABAF5A3E5CAE22

## label
The trophozoite of Entamoeba histolytica, not the cyst, is the stage seen in sigmoidoscopic aspirate from flask-shaped colonic ulcers

## canonical_key
entamoeba-histolytica.diagnosis.sigmoidoscopic-aspirate.trophozoite-not-cyst

## aliases
Amoebic dysentery diagnosis
Entamoeba histolytica trophozoite
Flask-shaped ulcer

## arabic_label
التشخيص بالمنظار السيني لداء الأميبا

## arabic_aliases


## definition
In a patient with amoebic dysentery — fever, abdominal pain, frequent bulky offensive stools with mucus and blood, a tender colon and sigmoidoscopy showing ulcers with a narrow opening and healthy mucosa in between (the classic flask-shaped ulcer appearance) — the material aspirated directly from the ulcer edge at sigmoidoscopy shows the actively invasive trophozoite of Entamoeba histolytica, not the cyst, since the trophozoite is the tissue-invasive form actually present at the ulcer site, whereas the cyst is the environmentally resistant form found in formed (non-dysenteric) stool instead.

## explicit_objective
State that the trophozoite, not the cyst, is the stage of Entamoeba histolytica found in sigmoidoscopic aspirate material from an amoebic colonic ulcer.

## pitfalls
Confusing the trophozoite (the invasive, tissue-destroying stage found at an active ulcer) with the cyst (the resistant, transmissible stage found in formed stool); sigmoidoscopic aspirate from an active lesion specifically shows the trophozoite.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTAMOEBA-SIGMOIDOSCOPIC-01

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
CON-GIT-C293F5D142CA62

## label
The cyst, not the trophozoite, is the infective stage of Entamoeba histolytica

## canonical_key
entamoeba-histolytica.infective-stage.cyst-not-trophozoite

## aliases
Entamoeba histolytica infective stage
Amoebic cyst transmission

## arabic_label
الطور المعدي للأميبا الحالة للنسج

## arabic_aliases


## definition
The infective stage of Entamoeba histolytica is the mature, quadrinucleate cyst, ingested with faecally contaminated food or water, because the cyst's resistant wall allows it to survive gastric acidity and environmental exposure long enough to reach and excyst in the small intestine; the trophozoite, by contrast, is fragile, is destroyed by gastric acid, and cannot survive transmission between hosts, so it is the invasive tissue-dwelling stage rather than the transmissible one.

## explicit_objective
State that the cyst, not the trophozoite, is the infective (transmissible) stage of Entamoeba histolytica, and explain why based on acid resistance.

## pitfalls
Assuming the invasive trophozoite is also the transmissible stage; the trophozoite is acid-labile and cannot survive between hosts, which is precisely why the resistant cyst, not the trophozoite, is the infective stage.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTAMOEBA-INFECTIVE-CYST-01

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
CON-GIT-1BEDFD8DA5EAFE

## label
The oocyst containing 4 sporozoites is the infective stage of Cryptosporidium, diagnosed in AIDS-associated diarrhoea by acid-fast staining of stool

## canonical_key
cryptosporidium.infective-stage.oocyst-with-4-sporozoites

## aliases
Cryptosporidium oocyst
Acid-fast staining (Cryptosporidium)
AIDS-associated diarrhoea diagnosis

## arabic_label
الكيسة البوغية للكريبتوسبوريديوم كطور معدي

## arabic_aliases


## definition
In an AIDS patient with severe watery diarrhoea and dehydration whose stool is positive on acid-fast staining, the infective stage recovered is the Cryptosporidium oocyst, a small, thick-walled, acid-fast structure containing 4 sporozoites, which is why modified acid-fast (Ziehl-Neelsen or Kinyoun) staining, rather than routine wet-mount microscopy, is the standard technique for detecting it in stool. This oocyst is directly infective on ingestion, with no intermediate host or environmental maturation step required, which contributes to Cryptosporidium's efficient person-to-person and waterborne spread in immunocompromised populations.

## explicit_objective
Identify the acid-fast oocyst containing 4 sporozoites as the infective and diagnostic stage of Cryptosporidium in AIDS-associated diarrhoea.

## pitfalls
Expecting Cryptosporidium to be detected on routine stool microscopy like most intestinal protozoa; its small, acid-fast oocyst specifically requires a modified acid-fast stain to be reliably identified.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-CRYPTOSPORIDIUM-OOCYST-I-01

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
CON-GIT-1FB41DF514D690

## label
Strongyloides stercoralis, like Cryptosporidium, is a recognised cause of severe diarrhoea in AIDS patients, unlike Ascaris lumbricoides, Ancylostoma duodenale or Capillaria philippinensis

## canonical_key
cryptosporidium.differential-diarrhoea-in-immunosuppressed.strongyloides-not-ascaris-ancylostoma-capillaria

## aliases
Opportunistic diarrhoea
AIDS diarrhoea differential
Strongyloides in immunosuppression

## arabic_label
الإسهال الشديد في مرضى الإيدز

## arabic_aliases


## definition
Alongside Cryptosporidium, Strongyloides stercoralis is a well-recognised cause of severe, sometimes life-threatening diarrhoeal disease in AIDS and other immunosuppressed patients, because impaired cell-mediated immunity allows its internal autoinfective cycle to escalate into hyperinfection or disseminated strongyloidiasis with a heavy intestinal larval burden. Ascaris lumbricoides and Ancylostoma duodenale cause disease of a broadly similar severity regardless of immune status, and Capillaria philippinensis, while it does cause severe diarrhoea through its own autoinfective cycle, is not the organism classically paired with Cryptosporidium in this immunosuppressed-diarrhoea teaching point.

## explicit_objective
Name Strongyloides stercoralis as another recognised cause of severe diarrhoea in AIDS patients, alongside Cryptosporidium, distinguishing it from Ascaris, Ancylostoma duodenale and Capillaria philippinensis.

## pitfalls
Assuming any intestinal helminth becomes more dangerous in immunosuppression; the escalation to severe, hyperinfective diarrhoea in AIDS is specifically taught for Strongyloides stercoralis (via its autoinfective cycle) alongside Cryptosporidium.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-CRYPTOSPORIDIUM-DIFFEREN-01

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
CON-GIT-42823FF780719F

## label
Fever with rigors, right-hypochondrial pain radiating to the shoulder, tender hepatomegaly, a raised right hemidiaphragm and polymorph leucocytosis point to amoebic liver abscess

## canonical_key
amoebic-liver-abscess.clinical-vignette-diagnosis.fever-tender-hepatomegaly-raised-hemidiaphragm

## aliases
Amoebic liver abscess
Hepatic amoebiasis

## arabic_label
خراج الكبد الأميبي

## arabic_aliases


## definition
A child with fever, rigors, right-hypochondrial pain radiating to the right shoulder and worsened by coughing, a tender enlarged liver, chest X-ray showing a raised right hemidiaphragm with a dense hepatic shadow, and a complete blood count showing polymorph (neutrophilic) leucocytosis has the classic presentation of amoebic liver abscess, a complication of invasive Entamoeba histolytica infection reaching the liver via the portal circulation. Hydatid cyst, the main differential for a hepatic mass, typically has a more indolent course without this acute febrile, neutrophilic picture, and its imaging more often shows a well-defined cystic (rather than abscess) lesion, sometimes with daughter cysts or wall calcification.

## explicit_objective
Recognise amoebic liver abscess from its classic triad of fever/rigors, tender hepatomegaly with shoulder-referred pain, and a raised hemidiaphragm with neutrophilic leucocytosis, distinguishing it from hydatid cyst.

## pitfalls
Mistaking amoebic liver abscess for hydatid cyst; the acute febrile course with neutrophilic leucocytosis and rigors argues for a pyogenic/amoebic process rather than the more indolent, often afebrile course typical of hydatid disease.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-AMOEBIC-LIVER-ABSCESS-VI-01

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
CON-GIT-79C0B5B92282EE

## label
A child with abdominal distension, offensive greasy stool without blood, and no liver or spleen enlargement most likely has giardiasis

## canonical_key
giardia-lamblia.clinical-vignette-diagnosis.malabsorption-greasy-stool-no-organomegaly

## aliases
Giardiasis vignette
Giardia lamblia malabsorption

## arabic_label
تشخيص داء الجيارديا من الإسهال الدهني

## arabic_aliases


## definition
A young child with abdominal distension, epigastric pain, vomiting, diarrhoea, offensive greasy (lentil-soup-like, steatorrhoeic) stool without blood, and being underweight, but with a normal-sized liver and spleen, has the classic malabsorption presentation of giardiasis, caused by Giardia lamblia (G. duodenalis) colonising the upper small intestine and mechanically/functionally interfering with fat absorption. The absence of organomegaly and the absence of blood in the stool both argue against Entamoeba histolytica (which typically causes bloody dysentery, not steatorrhoea) and against Cryptosporidium or Balantidium coli, neither of which classically produces this specific greasy-stool malabsorption picture in a well-nourished-appearing setting.

## explicit_objective
Recognise giardiasis from a malabsorption presentation of offensive greasy stool without blood or organomegaly in a child.

## pitfalls
Attributing greasy, non-bloody, malabsorptive stool to Entamoeba histolytica, whose hallmark is bloody dysentery, not steatorrhoea; the absence of blood and organomegaly here specifically points to Giardia lamblia.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-GIARDIA-VIGNETTE-DIAGNOS-01

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
CON-GIT-2117D169A473CA

## label
Giardia lamblia inhabits the upper part of the small intestine (duodenum and jejunum), not the large intestine or caecum

## canonical_key
giardia-lamblia.habitat.duodenum-jejunum-not-large-intestine-or-caecum

## aliases
Giardia lamblia habitat
Duodenal parasite

## arabic_label
موطن الجيارديا في الاثنى عشر والصائم

## arabic_aliases


## definition
Giardia lamblia trophozoites attach, by their ventral sucking disc, to the mucosal surface of the upper small intestine — specifically the duodenum and jejunum — where they interfere with fat and fat-soluble vitamin absorption across a broad area of mucosa, producing the malabsorptive, greasy-stool picture typical of giardiasis. This upper-small-intestinal habitat distinguishes Giardia from organisms that instead colonise the large intestine or caecum, such as Entamoeba histolytica or Balantidium coli.

## explicit_objective
State that Giardia lamblia inhabits the duodenum and jejunum (upper small intestine), not the large intestine or caecum.

## pitfalls
Assuming all intestinal protozoa share a large-bowel habitat like Entamoeba histolytica; Giardia lamblia is specifically an upper-small-intestinal parasite, attaching to duodenal and jejunal mucosa.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-GIARDIA-HABITAT-DUODENUM-01

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
CON-GIT-9D8DC908CC1F41

## label
A child who plays with stray dogs, with an asthmatic attack, tender hepatomegaly, persistent eosinophilia and hyperglobulinaemia, most likely has toxocariasis (visceral larva migrans)

## canonical_key
toxocara.clinical-vignette-diagnosis.dog-contact-asthma-hepatomegaly-eosinophilia-hyperglobulinaemia

## aliases
Toxocariasis
Visceral larva migrans
Toxocara canis

## arabic_label
التشخيص السريري لداء الديدان الخيطية للكلاب (توكسوكارا)

## arabic_aliases


## definition
A child with a history of playing with stray dogs who presents with an asthmatic attack, a tender enlarged liver, persistent marked eosinophilia and hyperglobulinaemia has the classic presentation of visceral larva migrans caused by Toxocara canis (or, less often, Toxocara cati), in which ingested embryonated eggs hatch and their larvae migrate through host tissues — liver, lungs and elsewhere — provoking an intense eosinophilic granulomatous reaction that accounts for the hepatomegaly, wheeze and marked eosinophilia. Ascariasis, enterobiasis and heterophyiasis do not classically present with this specific dog-contact, tissue-migratory, hyperglobulinaemic picture, making toxocariasis the preliminary diagnosis here.

## explicit_objective
Recognise toxocariasis (visceral larva migrans) from the combination of dog contact, asthma-like symptoms, tender hepatomegaly, marked eosinophilia and hyperglobulinaemia.

## pitfalls
Attributing an asthma-like presentation with hepatomegaly and eosinophilia to a common intestinal nematode such as Ascaris or Enterobius; the dog-contact history and the combination of tissue migration signs specifically point to Toxocara, whose larvae never mature into egg-laying adults in the human gut.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-TOXOCARA-VIGNETTE-DIAGNO-01

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
CON-GIT-C83F835B539603

## label
The infective stage of Toxocara is the embryonated egg containing a 2nd-stage rhabditiform larva, ingested from soil or fomites contaminated by dog faeces

## canonical_key
toxocara.infective-stage.embryonated-egg-with-2nd-stage-rhabditiform-larva

## aliases
Toxocara infective stage
Toxocara egg
Larva migrans transmission

## arabic_label
الطور المعدي لطفيل التوكسوكارا

## arabic_aliases


## definition
The infective stage of Toxocara canis (and Toxocara cati) is the embryonated egg containing a fully developed 2nd-stage rhabditiform larva, which becomes infective only after a period of maturation in soil following passage in dog (or cat) faeces; a child ingests these eggs from contaminated soil, sandboxes, or fomites (not, as in some other nematodes, by skin-penetrating filariform larvae, free rhabditiform larvae, or a cyst stage, none of which describe Toxocara transmission). Once ingested, the larva hatches in the human intestine and migrates through tissues without ever completing its life cycle to an adult worm, which is why human toxocariasis is a dead-end, tissue-migratory (visceral or ocular larva migrans) infection rather than a patent intestinal one.

## explicit_objective
State that the embryonated egg containing a 2nd-stage rhabditiform larva is the infective stage of Toxocara, ingested from soil or fomites contaminated by dog/cat faeces.

## pitfalls
Confusing Toxocara's egg-ingestion route with the skin-penetration route of hookworms or Strongyloides; Toxocara is acquired by ingesting its embryonated egg, and the larva never completes development to an adult worm in the human host.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-TOXOCARA-INFECTIVE-EMBRY-01

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
CON-GIT-D621FB6F16B11A

## label
A child with recurrent dysentery, a bulging perianal mass and rectal prolapse, whose stool shows barrel-shaped bipolar-plugged eggs, has trichuriasis

## canonical_key
trichuris-trichiura.clinical-vignette-diagnosis.dysentery-rectal-prolapse-barrel-egg

## aliases
Trichuriasis vignette
Whipworm dysentery
Barrel-shaped egg

## arabic_label
تشخيص داء السوطيات من هبوط المستقيم

## arabic_aliases


## definition
A 10-year-old child with recurrent severe dysentery, abdominal colic, a bulging perianal mass, a pale toxic appearance, a distended tender colon and rectal prolapse, whose stool analysis reveals the barrel-shaped egg with two mucoid plugs and a single-celled content characteristic of Trichuris trichiura, has heavy trichuriasis. The heavy caecal and rectal worm burden causes chronic mucosal irritation and straining that predisposes to rectal prolapse in malnourished children, distinguishing this picture from Entamoeba histolytica cysts, D-shaped Enterobius eggs, or Balantidium coli cysts, none of which match the barrel-shaped bipolar-plugged egg described.

## explicit_objective
Identify Trichuris trichiura from the barrel-shaped, bipolar-plugged, single-celled egg found in stool from a child with dysentery and rectal prolapse.

## pitfalls
Confusing the barrel-shaped bipolar-plugged Trichuris egg with the D-shaped Enterobius egg or an Entamoeba histolytica cyst; each has a distinct, species-specific stool appearance, and rectal prolapse in a heavily infected child is a Trichuris-specific complication.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-TRICHURIS-VIGNETTE-DIAGN-01

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
CON-GIT-A8BC29E8AB6DDB

## label
Heavy Trichuris trichiura infection can complicate with anemia, appendicitis, peritonitis and growth retardation, all together

## canonical_key
trichuris-trichiura.complications.anemia-appendicitis-peritonitis-growth-retardation

## aliases
Trichuriasis complications
Whipworm disease burden

## arabic_label
مضاعفات عدوى السوطيات الشديدة

## arabic_aliases


## definition
Beyond rectal prolapse, heavy Trichuris trichiura infection is recognised to cause anemia (from chronic mucosal blood loss at the many sites of mucosal attachment), acute appendicitis (from worms obstructing or inflaming the appendiceal lumen), peritonitis (from mucosal breach or secondary bacterial invasion at heavily infected sites), and growth retardation in children (from the combined burden of chronic blood loss, malnutrition and mucosal inflammation) — the correct answer to this vignette's complications question is therefore "all of the above" rather than any single complication in isolation, since heavy trichuriasis is a multi-system, cumulative-burden disease.

## explicit_objective
List anemia, appendicitis, peritonitis and growth retardation together as recognised complications of heavy Trichuris trichiura infection.

## pitfalls
Selecting only one complication of heavy trichuriasis when the vignette's heavy, chronic infection picture supports all four listed complications occurring together as part of the same disease burden.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-TRICHURIS-VIGNETTE-COMPL-01

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
CON-GIT-0AEAEF530A1913

## label
A farmer with fatigue, exertional dyspnoea, dark stool, severe anaemia and low serum albumin, with ova in stool, most likely has ancylostomiasis

## canonical_key
ancylostoma-duodenale.clinical-vignette-diagnosis.farmer-dark-stool-severe-anaemia-hypoalbuminaemia

## aliases
Ancylostomiasis vignette
Hookworm disease
Occult gastrointestinal blood loss

## arabic_label
تشخيص داء الديدان الشصية عند المزارعين

## arabic_aliases


## definition
A farmer with fatigue, exertional dyspnoea, anorexia, abdominal discomfort, recurrent dark (occult-blood-positive) stool, severe pallor, mild lower-limb oedema, ova seen in stool, severe anaemia and decreased serum albumin has the classic presentation of chronic ancylostomiasis (hookworm disease), caused by Ancylostoma duodenale (or Necator americanus), reflecting an occupational exposure (barefoot farming on contaminated soil) leading to chronic intestinal blood loss and consequent protein loss. This combination of occult gastrointestinal blood loss, iron-deficiency anaemia and hypoalbuminaemia-driven oedema is a hallmark of heavy, longstanding hookworm infection, distinguishing it from Fasciolopsis buski, Diphyllobothrium latum or Fasciola gigantica, none of which classically present with this specific occult-blood-loss/hypoalbuminaemia picture in a farmer.

## explicit_objective
Recognise chronic ancylostomiasis (hookworm disease) from an occupational (farming) exposure combined with occult dark stool, severe anaemia and hypoalbuminaemic oedema.

## pitfalls
Attributing occult gastrointestinal blood loss with hypoalbuminaemia in a farmer to a fluke or fish-tapeworm infection; the occupational soil-contact exposure and the combined anaemia-plus-hypoalbuminaemia picture are specifically hookworm disease hallmarks.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ANCYLOSTOMA-VIGNETTE-DIA-01

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
CON-GIT-2B15969DFC3488

## label
Ancylostoma duodenale infection causes iron-deficiency anemia, not vitamin B12-deficiency anemia

## canonical_key
ancylostoma-duodenale.iron-deficiency-anemia.not-b12-deficiency

## aliases
Hookworm anaemia type
Iron-deficiency anemia (hookworm)

## arabic_label
فقر الدم بنقص الحديد في عدوى الديدان الشصية

## arabic_aliases


## definition
The anaemia of ancylostomiasis is iron-deficiency anaemia, caused by chronic loss of iron-containing blood at the hookworm's intestinal mucosal feeding sites, not vitamin B12-deficiency (megaloblastic/pernicious) anaemia, which is instead the mechanism behind the anaemia caused by fish tapeworm (Diphyllobothrium latum) competing for dietary vitamin B12. Recognising which of these two anaemia types accompanies which parasite is a recurring distinction in this bank: hookworm and Trichuris cause iron-deficiency anaemia by blood loss, while Diphyllobothrium latum causes B12-deficiency anaemia by nutrient competition.

## explicit_objective
State that Ancylostoma duodenale causes iron-deficiency anaemia (by chronic blood loss), not vitamin B12-deficiency anaemia.

## pitfalls
Confusing hookworm's blood-loss iron-deficiency anaemia with Diphyllobothrium latum's nutrient-competition vitamin B12-deficiency anaemia; the two parasites cause anaemia by entirely different mechanisms.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ANCYLOSTOMA-IRON-DEFICIE-01

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
CON-GIT-C0C6666A1EAB8A

## label
The infective stage of Ancylostoma duodenale is the 3rd-stage filariform larva, which penetrates skin, not the rhabditiform larva or the egg

## canonical_key
ancylostoma-duodenale.infective-stage.3rd-stage-filariform-larva

## aliases
Hookworm infective stage
Filariform larva (Ancylostoma)

## arabic_label
الطور المعدي لدودة الأنكلستوما الاثنا عشرية

## arabic_aliases


## definition
The infective stage of Ancylostoma duodenale is the 3rd-stage (filariform) larva, which develops from the 1st-stage rhabditiform larva through moults in favourable soil conditions and then actively penetrates intact human skin (typically of the feet), producing ground itch at the entry site before migrating through the bloodstream and lungs to reach the small intestine. Neither the 1st-stage rhabditiform larva (a non-infective, free-living soil stage) nor the egg (passed unembryonated in stool and requiring soil development before even reaching the larval stage) is directly infective to man.

## explicit_objective
State that the 3rd-stage filariform larva, not the rhabditiform larva or the egg, is the infective stage of Ancylostoma duodenale, and that it infects by skin penetration.

## pitfalls
Assuming the egg or the 1st-stage rhabditiform larva is directly infective; both must first develop in soil into the 3rd-stage filariform larva before human infection can occur by skin penetration.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ANCYLOSTOMA-INFECTIVE-FI-01

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
CON-GIT-01290330E2CC13

## label
Nocturnal perianal itching with insomnia, nocturnal enuresis, and a mother's sighting of a thready 1cm worm in stool point to Enterobius vermicularis

## canonical_key
enterobius-vermicularis.clinical-vignette-diagnosis.nocturnal-perianal-itching-thready-worm

## aliases
Enterobiasis vignette
Pinworm infection
Nocturnal perianal pruritus

## arabic_label
تشخيص داء الديدان الدبوسية من الحكة الليلية

## arabic_aliases


## definition
An 8-year-old girl with perianal itching that is worse at night, causing insomnia and occasional nocturnal enuresis, whose mother reports seeing a thready worm about 1cm long in the stool, with multiple perianal and vulval excoriations from scratching but an otherwise unremarkable stool analysis, has the classic presentation of enterobiasis (pinworm infection, Enterobius vermicularis). The nocturnal pattern reflects the gravid female's nighttime migration to the perianal skin to deposit her eggs, which is also why routine stool analysis is typically unremarkable — the diagnostic material is on the perianal skin, not in the stool — distinguishing this presentation from Trichuris trichiura, Taenia saginata, or Trichostrongylus infection.

## explicit_objective
Recognise enterobiasis from nocturnal perianal itching, insomnia, occasional enuresis, and a visible thready worm, with an otherwise unremarkable stool analysis.

## pitfalls
Expecting a positive routine stool analysis in enterobiasis; the gravid female's nocturnal perianal egg-laying means the diagnostic material is found on the perianal skin, not in a stool sample, which is precisely why routine stool analysis here is unremarkable.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTEROBIUS-VIGNETTE-DIAG-01

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
CON-GIT-0639691FC5B030

## label
The D-shaped (plano-convex) egg or the adult female worm itself, recovered from the perianal skin, are the diagnostic stages of Enterobius vermicularis

## canonical_key
enterobius-vermicularis.diagnostic-stage.d-shaped-egg-or-adult-female

## aliases
Enterobius diagnostic stage
Perianal swab (Graham technique)
D-shaped egg

## arabic_label
الطور التشخيصي للدودة الدبوسية: البيضة أو الدودة الأنثى

## arabic_aliases


## definition
The diagnostic stages of Enterobius vermicularis in this vignette are the D-shaped (plano-convex, flattened on one side) egg, best collected by a perianal (Graham) cellophane-tape swab taken in the morning before washing or defaecation, or the adult female worm itself, roughly 1cm long, which may be directly seen migrating on the perianal skin at night or occasionally passed in stool. Neither a round, thick-shelled egg (unlike Enterobius's characteristic D-shape) nor Taenia saginata or Taenia solium gravid segments are correct here, since those describe entirely different organisms' diagnostic findings.

## explicit_objective
State that the D-shaped perianal egg or the adult female worm are the diagnostic stages recovered in enterobiasis.

## pitfalls
Expecting a round, thick-shelled egg for Enterobius vermicularis; its egg is specifically D-shaped (plano-convex), flattened on one side, and best collected by a perianal swab rather than routine stool examination.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTEROBIUS-DXSTAGE-VIGNE-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids
CON-GIT-FF0177C35FE48E

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
content: find-existing.mjs surfaced a live-scope near-miss: CON-GIT-FF0177C35FE48E (Part 2, canonical_key enterobius-vermicularis.egg-morphology.plano-convex-double-walled-shell) already covers the plano-convex egg shape as a standalone morphology fact. This concept is broader — it covers this vignette's "diagnostic stage(s)" question, which names both the egg AND the adult female worm (~1cm) as valid findings, a scope Part 2's egg-only concept does not state — so it is minted separately rather than merged.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-E6EEA1EB7C43B5

## label
A farmer with acute appendicitis, a history of cough/dyspnoea/asthmatic attack, and a linear curved translucent shadow on barium study most likely has ascariasis

## canonical_key
ascaris-lumbricoides.clinical-vignette-diagnosis.farmer-appendicitis-pulmonary-symptoms-barium-shadow

## aliases
Ascariasis vignette
Ascaris barium sign
Loeffler's syndrome (vignette)

## arabic_label
تشخيص داء الأسكاريس من صورة الباريوم

## arabic_aliases


## definition
A farmer presenting with acute abdominal pain and appendicitis, a preceding history of cough, dyspnoea and an asthmatic attack (reflecting the pulmonary larval migration phase), and a barium sulphate meal showing a linear curved translucent shadow (the adult worm outlined by barium within the bowel lumen) has the classic combined presentation of ascariasis, caused by Ascaris lumbricoides. The preceding respiratory symptoms correspond to Loeffler's syndrome during the larva's obligatory pulmonary migration, and the linear translucent barium shadow is a recognised radiological sign of an adult Ascaris worm in the gut, together distinguishing this vignette from Trichuris trichiura, Enterobius vermicularis or Trichostrongylus infection, none of which produce this combined respiratory-plus-radiological picture.

## explicit_objective
Recognise ascariasis from the combination of preceding pulmonary (Loeffler-type) symptoms, acute appendicitis, and a linear curved translucent shadow on barium study.

## pitfalls
Overlooking the barium study's linear translucent shadow as a specific radiological clue to an adult Ascaris worm in the bowel lumen; combined with the preceding pulmonary migration symptoms, it strongly points to Ascaris rather than Trichuris, Enterobius or Trichostrongylus.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ASCARIS-VIGNETTE-DIAGNOS-01

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
CON-GIT-F170E153F0B871

## label
A history of eating raw or undercooked fish (e.g. salmon) with diarrhoea, abdominal pain, anorexia and pernicious anaemia points to Diphyllobothrium latum infection

## canonical_key
diphyllobothrium-latum.clinical-vignette-diagnosis.fish-ingestion-pernicious-anaemia

## aliases
Diphyllobothriasis vignette
Fish tapeworm
Pernicious anaemia (parasitic)

## arabic_label
تشخيص عدوى شريطية السمك من فقر الدم الخبيث

## arabic_aliases


## definition
A woman in an endemic setting (classically described eating salmon in Japan) presenting with diarrhoea, abdominal pain, loss of appetite and pernicious (megaloblastic, vitamin B12-deficiency) anaemia has the classic presentation of diphyllobothriasis, caused by the fish tapeworm Diphyllobothrium latum, acquired by eating raw or undercooked freshwater or anadromous fish harbouring the plerocercoid larval stage. This is distinguished from Fasciolopsis buski (acquired from aquatic vegetation, not fish, and not classically causing pernicious anaemia), Trichuris trichiura, or Ancylostoma duodenale (which causes iron-deficiency, not B12-deficiency, anaemia), by both the fish-ingestion history and the specific type of anaemia.

## explicit_objective
Recognise Diphyllobothrium latum infection from a fish-ingestion history combined with pernicious (vitamin B12-deficiency) anaemia.

## pitfalls
Attributing a fish-ingestion-associated pernicious anaemia to Fasciolopsis buski or Ancylostoma duodenale; Fasciolopsis is acquired from aquatic vegetation rather than fish and Ancylostoma causes iron-deficiency, not B12-deficiency, anaemia, leaving Diphyllobothrium latum as the specific match.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-DIPHYLLOBOTHRIUM-VIGNETT-01

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
CON-GIT-7769B8A270CA6F

## label
The adult Diphyllobothrium latum worm causes pernicious anaemia by directly consuming the host's vitamin B12 and folic acid, not by toxins or malabsorption

## canonical_key
diphyllobothrium-latum.mechanism-of-b12-deficiency-anemia.adult-worm-consumes-b12-and-folic-acid

## aliases
Diphyllobothrium anaemia mechanism
Vitamin B12 consumption by tapeworm

## arabic_label
آلية فقر الدم الخبيث في عدوى شريطية السمك

## arabic_aliases


## definition
Diphyllobothrium latum causes pernicious anaemia because the adult worm, attached high in the small intestine over a large surface area, directly consumes and sequesters the host's dietary vitamin B12 (and, to a lesser extent, folic acid) before the host's own absorptive mechanisms can capture it, effectively starving the host of these haematinics rather than causing anaemia by any toxin the worm secretes or by a primary defect in the host's vitamin B12 absorptive machinery, which is why anaemia resolves once the worm is expelled.

## explicit_objective
State that direct consumption of the host's vitamin B12 (and folic acid) by the adult worm, not toxin effects or malabsorption, is the mechanism of Diphyllobothrium latum-associated pernicious anaemia.

## pitfalls
Attributing Diphyllobothrium latum's anaemia to worm-secreted toxins or a primary host malabsorption defect; the mechanism is direct nutrient competition — the worm consumes the host's vitamin B12 and folic acid before absorption.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-DIPHYLLOBOTHRIUM-MECHANI-01

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
CON-GIT-0D39ACB45BD320

## label
Praziquantel is the drug of choice to treat Diphyllobothrium latum infection, not niclosamide, albendazole or ivermectin

## canonical_key
diphyllobothrium-latum.treatment.praziquantel-drug-of-choice

## aliases
Diphyllobothrium treatment
Praziquantel (cestodes)

## arabic_label
البرازيكوانتيل علاج الاختيار لشريطية السمك

## arabic_aliases


## definition
Praziquantel is the drug of choice for treating Diphyllobothrium latum (fish tapeworm) infection, working by increasing the permeability of the worm's tegumental cell membranes to calcium, causing paralysis and detachment of the scolex from the intestinal wall so the worm is expelled intact. While niclosamide is also historically used against cestodes, praziquantel is the preferred choice in this bank for Diphyllobothrium latum specifically; albendazole and ivermectin are instead the standard choices for nematode (roundworm) infections, not for cestodes like the fish tapeworm.

## explicit_objective
Name praziquantel as the drug of choice for Diphyllobothrium latum infection, distinguishing it from albendazole and ivermectin, which target nematodes instead.

## pitfalls
Reaching for albendazole or ivermectin, which are nematode-active drugs, for a cestode (tapeworm) infection; Diphyllobothrium latum, like other tapeworms in this bank, is treated with praziquantel.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-DIPHYLLOBOTHRIUM-TREATME-01

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
CON-GIT-4FF6DB551A0A27

## label
Freshwater fish such as bolty and boury are the second intermediate host of Heterophyes heterophyes, not Pirenella conica, Cyclops or fleas

## canonical_key
heterophyes.second-intermediate-host.fish-bolty-and-boury

## aliases
Heterophyes second intermediate host
Bolty and boury fish
Fish-borne trematode

## arabic_label
العائل الوسيط الثاني لطفيل الهتيروفييس: الأسماك

## arabic_aliases


## definition
Freshwater and brackish-water fish, classically bolty (tilapia) and boury (mullet) in the Egyptian delta lakes, serve as the second intermediate host of Heterophyes heterophyes, harbouring the encysted metacercaria in their flesh or scales after cercariae released from the first intermediate host (the brackish-water snail Pirenella conica) penetrate and encyst in the fish. Pirenella conica is itself the first intermediate (snail) host, not the second; Cyclops is the intermediate host of entirely unrelated parasites (such as Dracunculus or some Diphyllobothrium species elsewhere), and fleas serve as the intermediate host for Dipylidium caninum and Hymenolepis diminuta, not for Heterophyes.

## explicit_objective
Name freshwater fish (bolty, boury) as the second intermediate host of Heterophyes heterophyes, distinguishing this role from Pirenella conica (first intermediate host), Cyclops, and fleas.

## pitfalls
Confusing Pirenella conica (the first, snail intermediate host) with the second intermediate host of Heterophyes; fish specifically fill the second-intermediate-host role that harbours the infective metacercaria.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-HETEROPHYES-SECOND-INTER-01

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
CON-GIT-4AC9026622D265

## label
Praziquantel is the drug of choice to treat Heterophyes heterophyes infection, not niclosamide, albendazole or ivermectin

## canonical_key
heterophyes.treatment.praziquantel-drug-of-choice

## aliases
Heterophyiasis treatment
Praziquantel (trematodes)

## arabic_label
البرازيكوانتيل علاج الاختيار لداء الهتيروفييس

## arabic_aliases


## definition
Praziquantel is the drug of choice for treating heterophyiasis (Heterophyes heterophyes infection), acting on the fluke's tegument to increase calcium permeability and cause spastic paralysis and expulsion of the worm, and it is also the preferred agent across nearly all the trematode and cestode infections tested in this bank (Fasciola, Diphyllobothrium, Taenia species). Niclosamide, while historically a cestode-active drug, is not the preferred choice here; albendazole and ivermectin are nematode-active drugs and are not the standard treatment for a trematode such as Heterophyes.

## explicit_objective
Name praziquantel as the drug of choice for Heterophyes heterophyes infection, matching the pattern seen for the other trematode and cestode infections in this bank.

## pitfalls
Reaching for albendazole or ivermectin, which target nematodes, for a trematode (fluke) infection; Heterophyes, like this bank's other flukes and tapeworms, is treated with praziquantel.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PAR-T02

## secondary_node_ids


## topic
Gastrointestinal parasitology

## subtopic
Protozoa and mixed-organism clinical vignettes

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-VIGNETTES

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
0.6

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-HETEROPHYES-TREATMENT-PR-01

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

