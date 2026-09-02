<!--
  HU-GIT-301 parasitology, Part 2: "Intestinal nematodes"
  (scripts/helwan/extract/HU-GIT-301/mcq-bank-parasitology.json, items
  #60-111, pp.14-19 of "MCQs - Para MCQ [GIT].pdf"). 41 new
  concepts, minted GIT-system. find-existing.mjs was run against every
  distinctive organism/term in this chunk (Ascaris lumbricoides, Enterobius
  vermicularis, Strongyloides stercoralis, Trichuris trichiura, Ancylostoma
  duodenale, Capillaria philippinensis, larva currens, ground itch, hookworm,
  Necator americanus, zoonotic dog, Trichinella spiralis, rhabditiform larva,
  double bulbed, Graham, perianal swab, pruritus ani, retroinfection,
  Loeffler, pulmonary migration, egg maturation in soil, ivermectin, duodenal
  aspiration, portal of entry skin, smallest intestinal nematode, airborne
  egg, under the finger nail, ectopic egg deposition, bipolar plugs, rectal
  prolapse, mucosal attachment, large intestine habitat, sanitation control,
  liver biopsy, adult worm diagnostic stage, helminth-scope, oxyuriasis,
  plano-convex, cutaneous larva migrans, nocturnal enuresis) before minting.
  Two hits were real near-misses, resolved without a twin: a live KAU
  hematology concept (CON-HEM-F1B029CB7BD806, canonical_key
  teaching.iron-deficiency.chronic-loss, "Hookworm, peptic-ulcer/pile
  bleeding, and menorrhagia can cause iron-deficiency anemia") groups
  hookworm with unrelated non-parasitic causes of anemia at a different
  scope than this cluster's hookworm-vs-Ancylostoma-caninum fact — recorded
  in rejected_merge_candidate_ids on the nematode-anemia concept, not
  merged; and an Ain Shams pending Trichinella spiralis morphology concept
  and a pending Ain Shams cutaneous larva migrans concept are distinct facts
  from anything minted here, so no merge. Two other hits
  (docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-concepts.md's
  own appendicitis and Heterophyes-myocarditis concepts, and its Fasciola
  duodenal-aspiration concept) are this lane's own Part 1 records: the
  appendicitis/myocarditis facts are reused directly via the build script's
  combined root->id map (see HU-GIT-301-parasitology-part2-build.mjs), not
  re-minted, and the duodenal-aspiration hit is a different organism
  (Fasciola vs. this chunk's Strongyloides), so it was minted separately. No
  overlay updates in this chunk. Biochemistry (23 keys) remains untouched
  for a follow-on lane.
-->

# Item

## id
CON-GIT-55B7FFBCC3813D

## label
Liver biopsy is a diagnostic tool for visceral larva migrans (Toxocara), not for the GIT-301 hepatic/intestinal flukes

## canonical_key
liver-biopsy.parasitic-diagnosis.visceral-larva-migrans

## aliases
Visceral larva migrans diagnosis
Toxocara liver biopsy

## arabic_label
خزعة الكبد لتشخيص الهجرة اليرقية الحشوية

## arabic_aliases


## definition
Liver biopsy is used to diagnose visceral larva migrans, the tissue-migrating larval infection caused by the dog/cat ascarid Toxocara, in which histology can demonstrate the larva and its surrounding eosinophilic granulomatous reaction directly in liver tissue. The hepatic and intestinal trematodes covered elsewhere in this bank (Fasciola hepatica, Fasciola gigantica, Clonorchis sinensis) are instead diagnosed by stool or duodenal-aspirate egg examination and serology, not by liver biopsy.

## explicit_objective
State that liver biopsy is the diagnostic tool for visceral larva migrans among the options tested here, not for the hepatic/biliary flukes.

## pitfalls
Assuming liver biopsy is the standard diagnostic step for any hepatobiliary parasite; among these options it specifically applies to tissue-migrating Toxocara larvae, while the flukes are diagnosed by egg examination and serology instead.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-LIVER-BIOPSY-DIAGNOSIS-01

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
CON-GIT-3812D763B83D17

## label
Enterobius vermicularis infects by ingestion of its egg, unlike Capillaria philippinensis and Trichostrongylus, whose larvae are ingested

## canonical_key
enterobius-vermicularis.mode-of-infection.egg-ingestion-not-larva-penetration

## aliases
Enterobius vermicularis infective stage
Egg vs larva ingestion

## arabic_label
طريقة عدوى الدودة الدبوسية بالبيض لا اليرقة

## arabic_aliases


## definition
Capillaria philippinensis and Trichostrongylus both infect man by ingestion of infective larvae (with food or water), a mode of infection Enterobius vermicularis does not share: E. vermicularis instead infects by ingestion of its egg, which hatches in the small intestine to release a larva that matures there, not by any larval-ingestion route. This egg-ingestion pattern is also what makes E. vermicularis capable of both airborne transmission and retroinfection, mechanisms not available to larva-ingesting nematodes.

## explicit_objective
State that Enterobius vermicularis is infective as an egg, not a larva, unlike Capillaria philippinensis and Trichostrongylus.

## pitfalls
Assuming every intestinal nematode is infective at the same life-cycle stage; Enterobius is the egg-ingestion exception among nematodes whose infection is otherwise typically described by larval ingestion or penetration.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTEROBIUS-MODE-OF-INFEC-01

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
CON-GIT-14D35B1D4C4F4E

## label
Ancylostoma duodenale, Necator americanus and Trichuris trichiura cause iron-deficiency anemia; Ancylostoma caninum, a dog-only hookworm, does not

## canonical_key
intestinal-nematodes.iron-deficiency-anemia.hookworms-and-trichuris-not-ancylostoma-caninum

## aliases
Hookworm anemia
Iron-deficiency anemia (parasitic)
Ancylostoma caninum exception

## arabic_label
فقر الدم بنقص الحديد الناتج عن الديدان الشصية والسوطية

## arabic_aliases


## definition
The human intestinal hookworms Ancylostoma duodenale and Necator americanus, together with Trichuris trichiura, cause iron-deficiency anemia by chronic blood loss from their feeding sites on the intestinal mucosa. Ancylostoma caninum is a dog hookworm whose filariform larvae can penetrate human skin but cannot mature into an adult, blood-feeding worm in man, so it causes cutaneous larva migrans rather than intestinal blood loss and does not produce iron-deficiency anemia.

## explicit_objective
Distinguish the human-pathogenic hookworms and Trichuris trichiura, which cause iron-deficiency anemia through chronic intestinal blood loss, from the dog-only Ancylostoma caninum, which does not.

## pitfalls
Treating every organism with "hookworm" in its name as an equally significant cause of human anemia; Ancylostoma caninum cannot complete its life cycle in man and is the standard exception in this bank's "except" items on helminth-associated anemia.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-NEMATODE-ANEMIA-01

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
CON-GIT-34829890F3985C

## label
Autoinfection occurs with Hymenolepis nana, Enterobius vermicularis, Strongyloides stercoralis and Capillaria philippinensis, but not with Ancylostoma duodenale

## canonical_key
autoinfection.parasite-scope.hnana-enterobius-strongyloides-capillaria-not-ancylostoma

## aliases
Autoinfection (parasitology)
Self-perpetuating helminth infection

## arabic_label
العدوى الذاتية في الطفيليات المعوية

## arabic_aliases


## definition
Autoinfection — re-infection of the same host without the parasite ever leaving the body — is a recognised feature of Hymenolepis nana (direct cysticercoid development in intestinal villi), Enterobius vermicularis (retroinfection from perianal eggs migrating back through the anus), Strongyloides stercoralis (rhabditiform larvae converting to infective filariform larvae within the gut or on perianal skin) and Capillaria philippinensis (internal autoinfective cycle that drives its characteristic massive worm burden). Ancylostoma duodenale requires external soil development of its eggs into infective filariform larvae before a new host can be infected, so it cannot autoinfect.

## explicit_objective
List the intestinal parasites capable of autoinfection and state that Ancylostoma duodenale is the exception, since its egg must develop externally in soil.

## pitfalls
Assuming autoinfection is a shared feature of every intestinal helminth in this cluster; Ancylostoma duodenale specifically requires external soil development, ruling it out.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-AUTOINFECTION-SCOPE-01

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
CON-GIT-A2A06601B4D8A4

## label
The adult worm itself can be a diagnostic finding in ascariasis, strongyloidiasis and enterobiasis, but ancylostomiasis is diagnosed by eggs, not the adult worm

## canonical_key
intestinal-nematodes.diagnostic-stage.adult-worm-not-ancylostomiasis

## aliases
Adult worm diagnosis
Ancylostomiasis diagnostic stage

## arabic_label
الطور التشخيصي: الدودة البالغة

## arabic_aliases


## definition
Ascaris lumbricoides adult worms may be passed in stool or vomited and directly identified; Strongyloides stercoralis larvae (its usual diagnostic stage) can occasionally be accompanied by adult-worm recovery in heavy infection; and adult Enterobius vermicularis worms are sometimes seen on perianal skin or in stool. Ancylostomiasis (hookworm disease from Ancylostoma duodenale), by contrast, is diagnosed in routine practice by finding eggs on stool examination, since the adult worms remain firmly attached to the intestinal mucosa and are not a practical stool finding.

## explicit_objective
Identify ancylostomiasis as the exception among these nematode infections where the adult worm is not the practical diagnostic finding.

## pitfalls
Assuming adult-worm recovery is equally practical across all intestinal nematode infections; hookworm disease is routinely diagnosed by its egg, not by seeing the adult worm.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ADULT-WORM-DIAGNOSTIC-ST-01

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
CON-GIT-652CB5E7405E53

## label
Trichuris trichiura is a whip-like worm with an oviparous female that anchors in the caecum by its attenuated end, and has no migratory phase outside the intestine

## canonical_key
trichuris-trichiura.no-migratory-phase-and-attachment-anatomy

## aliases
Whipworm biology
Trichuris trichiura life cycle

## arabic_label
الدودة السوطية: لا توجد هجرة رئوية

## arabic_aliases


## definition
Trichuris trichiura, the whipworm, is named for its whip-like shape, with an oviparous (egg-laying, not live-birth) female, and it lives with its thin attenuated anterior end threaded into the mucosa of the caecum and adjacent bowel. Unlike Ascaris lumbricoides and the hookworms, whose larvae migrate through the lungs before establishing intestinal infection, Trichuris trichiura has no extra-intestinal migratory phase at all: the ingested egg's larva develops directly within the intestine.

## explicit_objective
State that Trichuris trichiura has no migratory phase outside the intestine, unlike Ascaris and the hookworms, while listing its other basic morphological and habitat features.

## pitfalls
Assuming every soil-transmitted helminth shares the Ascaris/hookworm pulmonary migration pattern; Trichuris trichiura develops entirely within the intestine without ever leaving it.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-TRICHURIS-NO-MIGRATION-01

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
CON-GIT-BFD2D52A353171

## label
Stool examination diagnoses Necator americanus, Ascaris lumbricoides and Strongyloides stercoralis, but not Ancylostoma caninum, which does not establish adult intestinal infection in man

## canonical_key
stool-examination.helminth-scope.excludes-ancylostoma-caninum

## aliases
Stool examination scope
Helminth diagnosis by stool

## arabic_label
نطاق فحص البراز في تشخيص الديدان

## arabic_aliases


## definition
Stool examination is a standard diagnostic tool for Necator americanus, Ascaris lumbricoides and Strongyloides stercoralis, whose eggs or larvae are shed into the gut lumen by an established adult (or larval, for Strongyloides) worm population living there. Ancylostoma caninum, a dog hookworm, cannot mature into an adult worm within the human intestine after its larvae penetrate skin, so it never establishes the intestinal infection that would produce eggs to find on stool examination.

## explicit_objective
State why Ancylostoma caninum is the exception among these nematodes for stool-based diagnosis, given it does not establish adult intestinal infection in man.

## pitfalls
Expecting a positive stool examination for any organism causing human skin penetration by a hookworm-type larva; Ancylostoma caninum causes only cutaneous larva migrans, never an egg-shedding intestinal infection in man.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-STOOL-EXAM-SCOPE-01

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
CON-GIT-14ABC9FF549976

## label
Larva currens is a rapidly migrating urticarial skin track caused by autoinfective filariform larvae of Strongyloides stercoralis penetrating perianal skin

## canonical_key
strongyloides-stercoralis.larva-currens.autoinfective-filariform-larva-in-skin

## aliases
Larva currens
Strongyloides autoinfective larva skin track

## arabic_label
اليرقة الجارية (لارفا كورنس)

## arabic_aliases


## definition
Larva currens ("running larva") is a distinctive, rapidly advancing (several centimetres per hour) urticarial track in the skin, typically around the buttocks, groin or trunk, caused by the autoinfective filariform larvae of Strongyloides stercoralis re-penetrating the perianal or perineal skin. Its speed of migration is far faster than the cutaneous larva migrans track produced by animal hookworm larvae, and it is a hallmark clinical clue to ongoing Strongyloides autoinfection.

## explicit_objective
Define larva currens as the fast urticarial skin track caused by Strongyloides stercoralis autoinfective larvae, distinguishing it from other skin-migrating larval conditions.

## pitfalls
Confusing larva currens's rapid migration (Strongyloides autoinfection) with the much slower serpiginous track of cutaneous larva migrans caused by animal hookworm larvae.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-LARVA-CURRENS-01

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
CON-GIT-DCC6D015826D41

## label
The rhabditiform larva of Strongyloides stercoralis is identified by a short mouth cavity and a large, prominent genital primordium

## canonical_key
strongyloides-stercoralis.rhabditiform-larva.large-genital-primordium

## aliases
Rhabditiform larva morphology
Strongyloides larva identification

## arabic_label
شكل اليرقة الرابدية للديدان الحلقية المعوية

## arabic_aliases


## definition
The rhabditiform (first-stage) larva of Strongyloides stercoralis, the diagnostic stage typically found in stool, has a short buccal (mouth) cavity — shorter than that of hookworm rhabditiform larvae, which is a key differentiating feature — and a comparatively large, prominent genital primordium visible on microscopy. These features distinguish it from hookworm rhabditiform larvae, which have a longer buccal cavity and a smaller genital primordium, an important distinction when hookworm and Strongyloides infections are both suspected.

## explicit_objective
Identify the rhabditiform larva of Strongyloides stercoralis by its short buccal cavity and large genital primordium, in contrast to hookworm larvae.

## pitfalls
Confusing the short-buccal-cavity, large-genital-primordium pattern of Strongyloides rhabditiform larvae with the longer buccal cavity and smaller genital primordium of hookworm rhabditiform larvae.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-RHABDITIFORM-LARVA-MORPH-01

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
CON-GIT-72B74B588567C3

## label
This bank's printed key names Enterobius vermicularis, not Strongyloides stercoralis, as the nematode with a double-bulbed oesophagus

## canonical_key
enterobius-vermicularis.oesophagus.double-bulbed-per-printed-key

## aliases
Double bulbed oesophagus
Nematode oesophagus morphology

## arabic_label
المريء ثنائي الانتفاخ

## arabic_aliases


## definition
A double-bulbed (bulb-shaped, dilated at two points) oesophagus is the morphological feature this bank's printed key attributes to Enterobius vermicularis. Standard parasitology teaching more commonly describes the rhabditiform larva of Strongyloides stercoralis by its short buccal cavity and large genital primordium (see the companion concept), and it is instead the rhabditoid oesophagus generally, with its characteristic bulb, that is a shared nematode larval feature; this item's printed key names Enterobius specifically, and it is kept as printed.

## explicit_objective
Record the bank's printed answer for this item (Enterobius vermicularis) as printed, alongside the standard teaching association of a bulbed oesophagus with rhabditiform nematode larvae generally.

## pitfalls
Assuming this item's printed key follows the more commonly taught Strongyloides-oesophagus pairing; the bank's own answer grid names Enterobius vermicularis for this specific item, and the doubt is recorded rather than silently corrected.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-DOUBLE-BULBED-OESOPHAGUS-01

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
content: The printed key (p.26) selects option "b", Enterobius vermicularis, for item #69 ("Double bulbed oesophagus is a characteristic feature of:"). Standard undergraduate parasitology teaching more commonly attributes a bulbed rhabditiform oesophagus to Strongyloides stercoralis larvae (see the sibling concept strongyloides-stercoralis.rhabditiform-larva.large-genital-primordium), not to Enterobius. The printed key is kept as printed per the lane's standing instruction; the doubt is recorded here rather than silently corrected.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-58E2DC3BCDB569

## label
Trichuris trichiura maintains its intestinal position by penetrating the mucosa with its thin, attenuated anterior portion, not by cephalic alae or cutting plates

## canonical_key
trichuris-trichiura.mucosal-attachment.penetrating-with-attenuated-anterior-portion

## aliases
Whipworm attachment
Trichuris intestinal penetration

## arabic_label
آلية تثبيت الدودة السوطية في الأمعاء باختراق الغشاء المخاطي

## arabic_aliases


## definition
Trichuris trichiura maintains its position in the intestinal tract by threading its thin, whip-like attenuated anterior portion through and into the superficial epithelium of the caecal and adjacent bowel mucosa, a penetrating mode of attachment rather than a surface-grip. This distinguishes its attachment mechanism from nematodes such as Ancylostoma duodenale, which grips the mucosa with buccal cutting plates, or from worms using cephalic alae, neither of which describes how the whipworm anchors itself in place.

## explicit_objective
State that Trichuris trichiura maintains its intestinal position by penetrating the mucosa with its attenuated anterior portion, per this bank's printed key, not by cephalic alae or cutting plates.

## pitfalls
Assuming every intestinal nematode attaches by a grasping structure such as cutting plates or cephalic alae; Trichuris trichiura instead threads its thin anterior end directly into the mucosal epithelium.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-TRICHURIS-MUCOSAL-ATTACH-01

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
CON-GIT-4E44AA38D16CB4

## label
Trichuris trichiura and Enterobius vermicularis both inhabit the large intestine, unlike the small-intestinal Strongyloides stercoralis

## canonical_key
nematodes.large-intestine-habitat.trichuris-and-enterobius

## aliases
Nematode habitat by intestinal segment
Large intestine nematodes

## arabic_label
الديدان الخيطية الساكنة في الأمعاء الغليظة

## arabic_aliases


## definition
Trichuris trichiura (caecum and adjacent large bowel) and Enterobius vermicularis (caecum, appendix and adjacent colon, with gravid females migrating to the perianal region to deposit eggs) both inhabit the large intestine as their primary habitat. Strongyloides stercoralis, by contrast, inhabits the small intestine (chiefly the duodenum and jejunum), so a question asking which nematodes are found in the large intestine correctly selects both Trichuris and Enterobius together, not either alone.

## explicit_objective
List Trichuris trichiura and Enterobius vermicularis as large-intestine-dwelling nematodes, in contrast to the small-intestinal Strongyloides stercoralis.

## pitfalls
Selecting only one of Trichuris trichiura or Enterobius vermicularis as a large-intestine nematode when both correctly share that habitat, unlike Strongyloides.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-NEMATODES-LARGE-INTESTIN-01

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
CON-GIT-709E28E2095B5A

## label
The barrel-shaped egg of Trichuris trichiura has bipolar mucoid plugs, distinguishing it from the eggs of Enterobius, hookworm and Ascaris

## canonical_key
trichuris-trichiura.egg-morphology.barrel-shaped-bipolar-mucoid-plugs

## aliases
Trichuris egg morphology
Bipolar plug egg
Whipworm egg

## arabic_label
شكل بيضة الدودة السوطية ذات السدادتين المخاطيتين

## arabic_aliases


## definition
The egg of Trichuris trichiura is barrel-shaped (elongated, with a thick brown shell) and bears a translucent mucoid plug at each pole, a feature unique among the intestinal nematode eggs covered in this cluster. This bipolar-plug, barrel shape readily distinguishes it on stool microscopy from the plano-convex Enterobius vermicularis egg, the thin-shelled ovoid hookworm egg, and the thick-shelled, mamillated (or decorticated) Ascaris lumbricoides egg.

## explicit_objective
Identify the barrel-shaped, bipolar-mucoid-plugged egg as diagnostic of Trichuris trichiura, distinct from Enterobius, hookworm and Ascaris eggs.

## pitfalls
Confusing Trichuris's bipolar mucoid plugs with the coarsely mamillated shell of Ascaris lumbricoides or the plano-convex shape of Enterobius vermicularis; each egg morphology is species-specific.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-TRICHURIS-EGG-BIPOLAR-PL-01

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
CON-GIT-5DEAC87AB891C0

## label
Rectal prolapse is a recognised complication of heavy Trichuris trichiura infection in children

## canonical_key
trichuris-trichiura.complication.rectal-prolapse-in-heavy-infection

## aliases
Trichuriasis complications
Rectal prolapse (parasitic)

## arabic_label
هبوط المستقيم كمضاعفة لعدوى الدودة السوطية الشديدة

## arabic_aliases


## definition
Heavy Trichuris trichiura infection, with a large worm burden anchored in the rectal and colonic mucosa, can cause chronic straining, tenesmus and mucosal irritation that predispose to rectal prolapse, particularly in malnourished children with dense worm loads. This complication is specific to Trichuris among the nematodes in this cluster and reflects the worm's large-bowel/rectal habitat and its irritant effect on the mucosa it anchors into.

## explicit_objective
State rectal prolapse as a recognised complication of heavy Trichuris trichiura infection, particularly in children.

## pitfalls
Attributing rectal prolapse to a small-intestinal or perianal-migrating nematode; the complication specifically follows Trichuris trichiura's heavy rectal/colonic worm burden and chronic mucosal irritation.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-TRICHURIS-RECTAL-PROLAPS-01

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
CON-GIT-D377EBA78DD37E

## label
Corticosteroid therapy is contraindicated without prior screening for Strongyloides stercoralis, which it can convert into life-threatening hyperinfection

## canonical_key
strongyloides-stercoralis.corticosteroid-hyperinfection-risk.pre-treatment-screening

## aliases
Strongyloides hyperinfection syndrome
Corticosteroid screening
Disseminated strongyloidiasis

## arabic_label
خطر فرط العدوى بالستيرونجيلويدس عند استخدام الكورتيزون

## arabic_aliases


## definition
Before starting corticosteroid therapy, a patient from or with exposure history to an endemic area must be screened for Strongyloides stercoralis, because corticosteroids suppress the host immune response that normally limits the autoinfective cycle, allowing massive, potentially fatal hyperinfection or disseminated strongyloidiasis. This screening requirement is specific to Strongyloides among the nematodes in this cluster, because only Strongyloides has the internal autoinfective larval cycle that corticosteroid-induced immunosuppression can catastrophically amplify.

## explicit_objective
State why corticosteroid therapy requires prior Strongyloides stercoralis screening, given the risk of hyperinfection from immunosuppressing the autoinfective cycle.

## pitfalls
Assuming corticosteroid-related hyperinfection risk applies broadly to intestinal nematodes; it is specific to Strongyloides stercoralis because of its unique internal autoinfective cycle.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-STRONGYLOIDES-CORTICOSTE-01

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
CON-GIT-663BF173017BE0

## label
Capillaria philippinensis is acquired by eating insufficiently cooked fish, not by improperly washed vegetables, and causes watery diarrhoea diagnosed by its egg

## canonical_key
capillaria-philippinensis.mode-of-infection.fish-not-vegetables

## aliases
Capillaria philippinensis
Intestinal capillariasis

## arabic_label
طريقة العدوى بالكابيلاريا الفلبينية عبر الأسماك

## arabic_aliases


## definition
Capillaria philippinensis infection is acquired by eating insufficiently cooked fresh-water fish carrying the infective larval stage, not by improperly washed vegetables, which is not a transmission route for this nematode. The infection causes a protein-losing enteropathy with severe watery diarrhoea, driven by the parasite's internal autoinfective cycle that can build a massive intestinal worm burden, and is diagnosed by finding its characteristic peanut-shaped, striated-shell egg in stool.

## explicit_objective
State the fish-borne (not vegetable-borne) transmission route of Capillaria philippinensis, its watery diarrhoea presentation and its egg-based diagnosis.

## pitfalls
Attributing Capillaria philippinensis transmission to contaminated vegetables, the route instead associated with soil-transmitted nematode eggs; its infective larva is specifically fish-borne.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-CAPILLARIA-MODE-OF-INFEC-01

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
CON-GIT-8617D2CDC85CB6

## label
Autoinfection (retroinfection) occurs in Enterobius vermicularis when perianally deposited eggs hatch and the larvae migrate back through the anus into the rectum

## canonical_key
enterobius-vermicularis.retroinfection.autoinfection-mechanism

## aliases
Enterobius retroinfection
Perianal autoinfection

## arabic_label
العدوى الذاتية الرجعية للدودة الدبوسية

## arabic_aliases


## definition
Autoinfection in Enterobius vermicularis, also called retroinfection, occurs when eggs deposited on the perianal skin by the gravid female hatch there and the released larvae migrate backward through the anal canal into the rectum, re-establishing infection without ever leaving the host or requiring hand-to-mouth transfer. This mechanism, alongside the more familiar faecal-oral and airborne/fomite routes, is a distinctive feature of Enterobius among the intestinal nematodes and helps explain why enterobiasis can persist despite hygiene measures aimed only at hand-to-mouth transmission.

## explicit_objective
Explain retroinfection as the mechanism by which perianally hatched Enterobius vermicularis larvae re-enter the rectum through the anus.

## pitfalls
Assuming Enterobius autoinfection always requires the egg to be swallowed; retroinfection specifically describes larvae migrating back through the anus without ever being ingested.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTEROBIUS-RETROINFECTIO-01

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
CON-GIT-C4679409F59219

## label
Loeffler's syndrome, with chest symptoms and high eosinophilia during pulmonary larval migration, accompanies Ascaris, hookworm and Strongyloides infection alike

## canonical_key
ascaris-lumbricoides.loefflers-syndrome.hookworm-and-strongyloides-shared

## aliases
Loeffler's syndrome
Pulmonary eosinophilia (parasitic)

## arabic_label
متلازمة لوفلر المصاحبة لهجرة اليرقات الرئوية

## arabic_aliases


## definition
Loeffler's syndrome — chest troubles (cough, wheeze, transient pulmonary infiltrates) with high eosinophilia — accompanies the pulmonary migratory phase shared by Ascaris lumbricoides, the hookworms and Strongyloides stercoralis, all of whose larvae pass through the lungs en route to the small intestine. The syndrome reflects a hypersensitivity reaction to migrating larvae in lung tissue and is not specific to any one of these three nematodes, distinguishing it from symptoms such as loss of appetite, alternating diarrhoea/constipation or periodic fever with lymphadenopathy, which do not describe it.

## explicit_objective
State that Loeffler's syndrome (chest troubles with high eosinophilia) accompanies the shared pulmonary larval migration of Ascaris, hookworm and Strongyloides.

## pitfalls
Restricting Loeffler's syndrome to Ascaris alone; hookworm and Strongyloides larvae also migrate through the lungs and can equally produce it.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ASCARIS-LOEFFLERS-SYNDRO-01

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
CON-GIT-AE947A0DB988BC

## label
Ascaris lumbricoides lays an egg containing a single cell when passed, requiring further development in soil before becoming infective

## canonical_key
ascaris-lumbricoides.egg-morphology.single-cell-when-laid

## aliases
Ascaris egg morphology
Ascaris lumbricoides egg development

## arabic_label
بيضة الأسكاريس أحادية الخلية عند الطرح

## arabic_aliases


## definition
The fertilised egg of Ascaris lumbricoides contains a single cell (undivided ovum) at the time it is passed in stool, distinguishing it from eggs of other nematodes in this cluster that may already contain a developing embryo or larva when laid. This single-cell egg must then undergo a period of development in favourable soil conditions, over roughly two to four weeks, before it becomes infective by acquiring an embryonated larva within the shell.

## explicit_objective
State that the freshly passed Ascaris lumbricoides egg contains a single cell and requires soil development before it becomes infective.

## pitfalls
Assuming the freshly passed Ascaris egg is already infective; it contains only a single cell when laid and needs a period of soil development before its larva matures to the infective stage.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ASCARIS-EGG-SINGLE-CELL-01

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
CON-GIT-82D069F854C57A

## label
Ascaris lumbricoides larvae pass through the lungs during their developmental migration through the human body, unlike Enterobius, Trichuris and Ancylostoma caninum

## canonical_key
ascaris-lumbricoides.pulmonary-migration.lung-passage-in-development

## aliases
Ascaris pulmonary migration
Ascaris lumbricoides life cycle

## arabic_label
الهجرة الرئوية ليرقات الأسكاريس

## arabic_aliases


## definition
After hatching in the small intestine, Ascaris lumbricoides larvae penetrate the intestinal wall, enter the bloodstream, and migrate through the liver to the lungs, where they break into the alveoli, ascend the bronchial tree and are swallowed to re-enter and mature in the small intestine — the same pulmonary migration pattern shared with the hookworms and Strongyloides. Enterobius vermicularis and Trichuris trichiura develop entirely within the intestine with no such migratory phase, and Ancylostoma caninum cannot mature or migrate meaningfully in the human body at all, since it is a dog-only hookworm confined to causing cutaneous larva migrans in man.

## explicit_objective
State that Ascaris lumbricoides passes through the lungs during its developmental migration, in contrast to Enterobius, Trichuris and Ancylostoma caninum.

## pitfalls
Assuming every intestinal nematode listed alongside Ascaris shares its pulmonary migration; Enterobius and Trichuris develop entirely intestinally, and Ancylostoma caninum cannot complete development in man at all.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ASCARIS-PULMONARY-MIGRAT-01

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
CON-GIT-BD99E16F832BA8

## label
Heavy Ascaris lumbricoides infection can cause acute appendicitis, intestinal obstruction and bile duct obstruction from bulk worm masses

## canonical_key
ascaris-lumbricoides.complications.appendicitis-intestinal-and-biliary-obstruction

## aliases
Ascariasis complications
Ascaris obstruction

## arabic_label
مضاعفات الانسداد الناتجة عن عدوى الأسكاريس الشديدة

## arabic_aliases


## definition
A heavy burden of adult Ascaris lumbricoides worms in the small intestine can obstruct the appendiceal lumen (causing acute appendicitis), form a bolus that obstructs the intestinal lumen itself (intestinal obstruction, especially in children), or migrate into and obstruct the common bile duct (biliary obstruction with cholangitis or pancreatitis). These three mechanical complications all follow from the same underlying cause: a large worm mass or a wandering adult worm physically blocking a narrow lumen, a complication pattern not typically produced by the smaller worm burdens of Strongyloides stercoralis, Hymenolepis nana or the dog-restricted Ancylostoma caninum.

## explicit_objective
List acute appendicitis, intestinal obstruction and bile duct obstruction as the mechanical complications of heavy Ascaris lumbricoides infection.

## pitfalls
Attributing these bulk-obstruction complications to a nematode without Ascaris's characteristic large size and heavy worm burden; Strongyloides, Hymenolepis nana and Ancylostoma caninum are not typically implicated in this way.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ASCARIS-COMPLICATIONS-OB-01

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
CON-GIT-A134E72614DE00

## label
The Ascaris lumbricoides egg requires favourable soil conditions, not fresh water, an intermediate host, or exposure to gastric acidity, to mature into an infective form

## canonical_key
ascaris-lumbricoides.egg-maturation.favourable-soil-conditions

## aliases
Ascaris egg soil maturation
Ascaris direct life cycle

## arabic_label
نضج بيضة الأسكاريس في التربة

## arabic_aliases


## definition
For the single-cell Ascaris lumbricoides egg to become infective, it needs favourable environmental conditions in soil — adequate moisture, warmth, shade and oxygen — over a period of roughly two to four weeks, during which the larva develops and moults within the shell. It does not require dilution by fresh water, an intermediate host (Ascaris has a direct life cycle with no intermediate host), or exposure to stomach acid, which instead describes how some other organisms' infective forms are triggered or activated.

## explicit_objective
State that favourable soil conditions, not fresh water, an intermediate host or gastric acid exposure, are what the Ascaris egg needs to mature into an infective form.

## pitfalls
Assuming Ascaris requires an intermediate host like the flukes or Taenia species; Ascaris lumbricoides has a direct life cycle, needing only soil maturation of its egg before it becomes infective by ingestion.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ASCARIS-EGG-MATURATION-S-01

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
CON-GIT-9FE3EF6E432ECF

## label
Ivermectin is the drug of choice for strongyloidiasis, not for trichinosis or trichuriasis

## canonical_key
strongyloides-stercoralis.treatment.ivermectin-drug-of-choice

## aliases
Ivermectin
Strongyloidiasis treatment

## arabic_label
الإيفرمكتين علاج الاختيار لداء الستيرونجيلويدس

## arabic_aliases


## definition
Ivermectin is the drug of choice for treating Strongyloides stercoralis infection, working by opening glutamate-gated chloride channels unique to invertebrate nerve and muscle cells and causing paralysis and death of the parasite. It is not the standard treatment for trichinosis (managed with albendazole/mebendazole plus corticosteroids for the inflammatory phase) or trichuriasis (treated with mebendazole or albendazole), so ivermectin's drug-of-choice role in this bank is specific to strongyloidiasis.

## explicit_objective
Name ivermectin as the drug of choice for strongyloidiasis, and exclude trichinosis and trichuriasis from that specific role.

## pitfalls
Generalising ivermectin's drug-of-choice role to other nematode infections; among the options here, it is specific to Strongyloides stercoralis.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-STRONGYLOIDES-TREATMENT--01

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
CON-GIT-E7E6A0569C00BC

## label
Stool culture, which allows rhabditiform larvae to develop and move, aids diagnosis of strongyloidiasis specifically among fascioliasis, trichinosis and ascariasis

## canonical_key
strongyloides-stercoralis.diagnosis.stool-culture-larval-development

## aliases
Stool culture technique
Strongyloidiasis diagnosis

## arabic_label
زرع البراز في تشخيص داء الستيرونجيلويدس

## arabic_aliases


## definition
Stool culture techniques (such as the Harada-Mori filter-paper culture or agar plate culture) help diagnose strongyloidiasis by allowing motile rhabditiform larvae passed in low numbers to develop and multiply over several days, increasing detection sensitivity beyond a single direct stool smear. Fascioliasis and ascariasis are instead diagnosed by direct or concentrated egg examination, and trichinosis is diagnosed by muscle biopsy and serology, not by stool culture, since Trichinella's life cycle does not pass a free larval or egg stage through the human gut lumen.

## explicit_objective
State that stool culture specifically aids diagnosis of strongyloidiasis, and exclude fascioliasis, trichinosis and ascariasis from that specific role.

## pitfalls
Assuming stool culture is a general helminth diagnostic technique; it specifically exploits the motile, developing rhabditiform larva unique to Strongyloides stercoralis among these options.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-STRONGYLOIDES-STOOL-CULT-01

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
CON-GIT-72E984BC493430

## label
Duodenal aspiration is used to diagnose Strongyloides stercoralis, whose small-intestinal habitat is directly sampled, not Ascaris, Ancylostoma duodenale or Enterobius vermicularis

## canonical_key
strongyloides-stercoralis.diagnosis.duodenal-aspiration-not-ascaris-ancylostoma-enterobius

## aliases
Duodenal aspiration (Strongyloides)
String test

## arabic_label
شفط الاثنى عشر لتشخيص الستيرونجيلويدس

## arabic_aliases


## definition
Duodenal aspiration (or the string test) recovers Strongyloides stercoralis rhabditiform larvae directly from the duodenal/jejunal mucosa it inhabits, offering higher sensitivity than a single stool examination when infection intensity is low. Ascaris lumbricoides and Ancylostoma duodenale, though also small-intestinal in part, are reliably diagnosed by routine stool egg examination without needing duodenal sampling, and Enterobius vermicularis, a large-intestine and perianal parasite, is not diagnosed by any duodenal or small-intestinal sampling technique at all.

## explicit_objective
State that duodenal aspiration specifically aids diagnosis of Strongyloides stercoralis, distinguishing it from the stool-diagnosed Ascaris and Ancylostoma duodenale and the perianal-swab-diagnosed Enterobius vermicularis.

## pitfalls
Assuming duodenal aspiration is a generic small-intestinal nematode diagnostic; it specifically improves detection of Strongyloides, while Ascaris and hookworm are adequately diagnosed by stool, and Enterobius is not a small-intestinal parasite at all.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-STRONGYLOIDES-DUODENAL-A-01

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
CON-GIT-5D42E39D871090

## label
The usual portal of entry of Strongyloides stercoralis into the human body is the skin, penetrated by its infective filariform larva

## canonical_key
strongyloides-stercoralis.portal-of-entry.skin-penetration-by-filariform-larva

## aliases
Strongyloides portal of entry
Filariform larva skin penetration

## arabic_label
منفذ دخول الستيرونجيلويدس عبر الجلد

## arabic_aliases


## definition
The usual portal of entry for Strongyloides stercoralis is the skin, typically of the feet or lower legs on contact with contaminated soil, where the infective filariform larva actively penetrates through to enter the subcutaneous tissue and bloodstream, beginning its migratory route to the lungs and then the small intestine. This skin-penetration route parallels that of the hookworms, in contrast to nematodes such as Ascaris, Enterobius and Trichuris, whose usual portal of entry is oral ingestion of the egg.

## explicit_objective
State that the skin, penetrated by the infective filariform larva, is the usual portal of entry for Strongyloides stercoralis.

## pitfalls
Assuming Strongyloides stercoralis is acquired orally like Ascaris or Enterobius; its usual portal of entry is instead active skin penetration by the filariform larva, the same route used by the hookworms.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-STRONGYLOIDES-PORTAL-OF--01

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
CON-GIT-9041A06C9B074B

## label
The rhabditiform larva, not egg or filariform larva, is the diagnostic stage of Strongyloides stercoralis found in stool

## canonical_key
strongyloides-stercoralis.diagnostic-stage.rhabditiform-larva-in-stool

## aliases
Strongyloides diagnostic stage
Rhabditiform larva in stool

## arabic_label
اليرقة الرابدية هي الطور التشخيصي في البراز

## arabic_aliases


## definition
The rhabditiform (first-stage, non-infective) larva is the diagnostic stage of Strongyloides stercoralis found in stool, since the eggs hatch within the intestinal mucosa before being passed, so eggs themselves are essentially never seen in stool. The filariform (infective, third-stage) larva instead typically develops later, outside the body in soil or, in autoinfection, within the gut or on perianal skin, and is not the routine stool-diagnostic finding.

## explicit_objective
State that the rhabditiform larva, not the egg or the filariform larva, is the stage of Strongyloides stercoralis routinely found in stool for diagnosis.

## pitfalls
Expecting to find Strongyloides eggs in stool; the egg hatches within the mucosa before passage, leaving the rhabditiform larva, not the egg, as the practical diagnostic finding.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-STRONGYLOIDES-DIAGNOSTIC-01

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
CON-GIT-C963D99A43B1D0

## label
The life cycle of Strongyloides stercoralis can proceed by a direct cycle, an indirect (free-living) cycle, or internal autoinfection

## canonical_key
strongyloides-stercoralis.life-cycle-forms.direct-indirect-and-autoinfective

## aliases
Strongyloides life cycle
Free-living cycle (Strongyloides)

## arabic_label
دورة حياة الستيرونجيلويدس: مباشرة وغير مباشرة وذاتية

## arabic_aliases


## definition
Strongyloides stercoralis has an unusually flexible life cycle among human intestinal nematodes: a direct cycle, in which rhabditiform larvae passed in stool develop directly into infective filariform larvae in soil; an indirect (free-living) cycle, in which rhabditiform larvae instead develop into free-living adult males and females that reproduce in soil for one or more generations before eventually producing infective filariform larvae; and internal autoinfection, in which rhabditiform larvae convert to filariform larvae within the gut or on perianal skin and re-infect the same host. This combination of routes, unmatched by any other GIT-301 nematode, is why Strongyloides infection can persist for decades without re-exposure.

## explicit_objective
List the direct, indirect (free-living) and autoinfective routes that together make up the Strongyloides stercoralis life cycle.

## pitfalls
Assuming Strongyloides has a single, fixed life-cycle route like most other intestinal nematodes; its direct, indirect and autoinfective options together explain both its transmission flexibility and its capacity for lifelong persistence.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-STRONGYLOIDES-LIFE-CYCLE-01

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
CON-GIT-BF9B52E4E0D9D6

## label
Ground itch is caused by penetration of human skin by the infective filariform larva of Ancylostoma duodenale

## canonical_key
ancylostoma-duodenale.ground-itch.filariform-larva-skin-penetration

## aliases
Ground itch
Hookworm dermatitis

## arabic_label
حكة الأرض عند اختراق يرقة الديدان الشصية للجلد

## arabic_aliases


## definition
Ground itch is a pruritic, papulovesicular skin reaction that develops at the site where the infective filariform larva of Ancylostoma duodenale actively penetrates the skin, typically on the feet of a person walking barefoot on contaminated soil. This local skin reaction is the earliest clinical sign of hookworm infection, occurring before the larva migrates through the bloodstream, lungs and airway to reach the small intestine and mature into an adult worm.

## explicit_objective
State that ground itch is the local skin reaction at the site of filariform larva penetration in Ancylostoma duodenale infection.

## pitfalls
Confusing ground itch with larva currens (Strongyloides autoinfection) or cutaneous larva migrans (Ancylostoma caninum); ground itch specifically marks the entry-site skin reaction of the human hookworm Ancylostoma duodenale.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ANCYLOSTOMA-GROUND-ITCH-01

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
CON-GIT-A37E9AD9E27B49

## label
Airborne transmission is possible for Enterobius vermicularis, whose light eggs shed from bedding and clothing can become airborne and be inhaled or ingested

## canonical_key
enterobius-vermicularis.airborne-egg-transmission.light-shed-eggs

## aliases
Enterobius airborne transmission
Pinworm egg dispersal

## arabic_label
انتقال بيض الدودة الدبوسية عبر الهواء

## arabic_aliases


## definition
Enterobius vermicularis eggs, deposited on perianal skin and subsequently shed onto bedding, clothing and household dust, are light enough to become airborne when disturbed, allowing transmission by inhalation or environmental ingestion in addition to the more familiar direct hand-to-mouth route. This airborne/fomite route, together with retroinfection, helps explain why enterobiasis spreads readily among household and institutional contacts even with reasonable hand hygiene.

## explicit_objective
State that Enterobius vermicularis eggs can become airborne from bedding and clothing, adding a transmission route beyond direct hand-to-mouth contact.

## pitfalls
Assuming Enterobius vermicularis transmission is limited to direct hand-to-mouth contact with perianal skin; its light eggs can also become airborne from shed bedding and clothing.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTEROBIUS-AIRBORNE-TRAN-01

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
CON-GIT-6D88AE14B064AF

## label
Enterobius vermicularis eggs may be found under a patient's fingernails from scratching the itchy perianal area where they were deposited

## canonical_key
enterobius-vermicularis.egg-under-fingernails.scratching-transfer

## aliases
Enterobius vermicularis fingernail eggs
Pinworm hand-to-mouth transfer

## arabic_label
وجود بيض الدودة الدبوسية تحت أظافر المريض

## arabic_aliases


## definition
Because the gravid female Enterobius vermicularis migrates to deposit her eggs on the perianal skin, causing intense perianal pruritus, a patient scratching that area transfers eggs onto the fingers and under the fingernails, where they can be recovered on examination and from where they are readily transferred to the mouth or to fomites. This scratch-to-fingernail-to-mouth cycle is a key driver of both self-reinfection and household transmission of enterobiasis.

## explicit_objective
State that Enterobius vermicularis eggs can be found under a patient's fingernails as a result of scratching the perianal area.

## pitfalls
Overlooking the fingernail as a practical site of Enterobius egg transfer; scratching the itchy perianal deposition site readily carries eggs under the nails, from where they are re-ingested or spread to others.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTEROBIUS-EGG-UNDER-FIN-01

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
CON-GIT-41D12793AF4B79

## label
Strongyloides stercoralis is the smallest intestinal nematode infecting man, smaller than Ancylostoma duodenale, Enterobius vermicularis and Trichinella spiralis

## canonical_key
strongyloides-stercoralis.smallest-intestinal-nematode.size-comparison

## aliases
Strongyloides stercoralis size
Smallest intestinal nematode

## arabic_label
الستيرونجيلويدس أصغر الديدان الخيطية المعوية

## arabic_aliases


## definition
The adult female Strongyloides stercoralis, at roughly 2 to 2.5 mm in length, is the smallest of the intestinal nematodes infecting man covered in this cluster, smaller than the adult hookworm Ancylostoma duodenale, the pinworm Enterobius vermicularis, and the adult Trichinella spiralis. Its diminutive size, together with its unique parthenogenetic female reproduction and internal autoinfective cycle, distinguishes Strongyloides from the other soil-transmitted and intestinal nematodes in this bank.

## explicit_objective
State that Strongyloides stercoralis is the smallest intestinal nematode infecting man among the options compared in this bank.

## pitfalls
Assuming a more commonly discussed nematode such as Enterobius vermicularis is the smallest; by adult length, Strongyloides stercoralis is smaller still.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-STRONGYLOIDES-SMALLEST-N-01

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
CON-GIT-4D6FA79ED5D91F

## label
Enterobius vermicularis eggs may be found in the urine of a female patient, from ectopic migration of the gravid worm into the urethra or vagina

## canonical_key
enterobius-vermicularis.ectopic-egg-deposition.urine-vaginal-migration

## aliases
Enterobius ectopic migration
Pinworm vulvovaginitis

## arabic_label
الهجرة الشاذة لبيض الدودة الدبوسية إلى المسالك البولية التناسلية

## arabic_aliases


## definition
A gravid female Enterobius vermicularis, migrating from the anus to deposit eggs on perianal skin, can wander ectopically into the female urogenital tract, entering the vagina, uterus or urethra, so that its eggs may then be found in vaginal discharge or in a urine sample. This ectopic migration is a recognised, if uncommon, complication specific to Enterobius among the intestinal nematodes and can also produce vulvovaginitis or granulomatous pelvic lesions when worms or eggs lodge in pelvic tissue.

## explicit_objective
State that ectopic migration of gravid Enterobius vermicularis worms can deposit eggs in the female urogenital tract, including the urine.

## pitfalls
Assuming Enterobius eggs are confined to the perianal skin and stool; ectopic migration into the female urethra or vagina is a recognised route by which its eggs reach the urine.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTEROBIUS-ECTOPIC-EGG-D-01

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
CON-GIT-45DA03F58B4D64

## label
Enterobius vermicularis infection classically presents with perianal pruritus and, in children, nocturnal enuresis

## canonical_key
enterobius-vermicularis.clinical-features.perianal-pruritus-and-nocturnal-enuresis

## aliases
Pinworm clinical presentation
Perianal pruritus

## arabic_label
حكة الشرج والتبول اللاإرادي الليلي في عدوى الدودة الدبوسية

## arabic_aliases


## definition
Enterobius vermicularis infection classically presents with perianal (and sometimes perineal or vulvar) pruritus, worst at night when the gravid female migrates to deposit eggs, and this itching-driven sleep disturbance is a recognised contributor to nocturnal enuresis in affected children. This clinical picture — nocturnal itching plus enuresis — is a distinctive presentation among the intestinal nematodes covered here and is a common reason for a caregiver to seek medical evaluation.

## explicit_objective
State perianal pruritus and nocturnal enuresis as the classic clinical presentation of Enterobius vermicularis infection in children.

## pitfalls
Attributing nocturnal enuresis and perianal itching to a different intestinal nematode; this specific nocturnal symptom pairing is characteristic of Enterobius vermicularis, driven by its nighttime perianal egg-deposition behaviour.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTEROBIUS-PERIANAL-PRUR-01

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
CON-GIT-FF0177C35FE48E

## label
The egg of Enterobius vermicularis is plano-convex (flattened on one side) with a double-walled shell, not mamillated, barrel-shaped or thin with blunt rounded poles

## canonical_key
enterobius-vermicularis.egg-morphology.plano-convex-double-walled-shell

## aliases
Enterobius egg morphology
Pinworm egg shape

## arabic_label
شكل بيضة الدودة الدبوسية المسطحة المحدبة

## arabic_aliases


## definition
The egg of Enterobius vermicularis is plano-convex — flattened along one side and convex on the other — with a thin, colourless, double-walled shell, distinguishing it from the coarsely mamillated shell of Ascaris lumbricoides, the barrel shape with bipolar plugs of Trichuris trichiura, and the thin, blunt-rounded-pole shape of hookworm eggs. This asymmetric plano-convex outline is the specific morphological feature examiners test to identify an Enterobius egg on a perianal swab or stool smear.

## explicit_objective
Identify the Enterobius vermicularis egg by its plano-convex, double-walled shell shape, distinct from Ascaris, Trichuris and hookworm eggs.

## pitfalls
Confusing the plano-convex Enterobius egg with the coarsely mamillated Ascaris egg, the barrel-shaped bipolar-plugged Trichuris egg, or the thin blunt-ended hookworm egg; each shape is a specific identifying feature.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTEROBIUS-EGG-MORPHOLOG-01

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
CON-GIT-5D164711B23268

## label
Routine stool examination is not the recommended diagnostic method for Enterobius vermicularis, because the gravid female deposits eggs on perianal skin rather than releasing them into the gut lumen

## canonical_key
enterobius-vermicularis.diagnosis.not-reliably-by-routine-stool-examination

## aliases
Enterobius diagnosis limitations
Stool examination not recommended

## arabic_label
فحص البراز غير موصى به لتشخيص الدودة الدبوسية

## arabic_aliases


## definition
Unlike Hymenolepis nana, Strongyloides stercoralis and Ancylostoma duodenale, whose eggs or larvae are released into the intestinal lumen and pass with stool, Enterobius vermicularis eggs are deposited externally on perianal skin by the migrating gravid female, so they are rarely present in appreciable numbers within the faecal stream itself. A perianal swab (such as the Graham cellophane-tape technique), not routine stool examination, is therefore the recommended diagnostic method for enterobiasis.

## explicit_objective
State why routine stool examination is unreliable for Enterobius vermicularis, given its perianal, not intraluminal, egg-deposition site.

## pitfalls
Sending a routine stool sample as the first-line test for suspected enterobiasis; because the eggs are deposited on perianal skin rather than shed into the gut lumen, a perianal swab is the appropriate test instead.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTEROBIUS-DIAGNOSIS-NOT-01

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
CON-GIT-A674A67B72C1B6

## label
A perianal swab is a reliable method for diagnosing enterobiasis, unlike stool examination, rectal snip or the Kato-Katz technique

## canonical_key
enterobius-vermicularis.diagnosis.perianal-swab-reliable-method

## aliases
Perianal swab
Graham cellophane tape test

## arabic_label
مسحة حول الشرج طريقة موثوقة لتشخيص داء الدودة الدبوسية

## arabic_aliases


## definition
A perianal swab, collected in the early morning before bathing or defecation when the gravid female has had overnight opportunity to deposit eggs, is the reliable diagnostic method for enterobiasis, since it directly samples the perianal skin site where Enterobius vermicularis eggs are actually deposited. Stool examination is unreliable for the reasons already noted, rectal snip is instead used for diagnosing schistosomiasis by finding ova within rectal mucosal tissue, and the Kato-Katz technique is a quantitative stool method used for soil-transmitted helminth and schistosome egg counts, not for Enterobius.

## explicit_objective
Name the perianal swab as the reliable diagnostic method for enterobiasis, and exclude stool examination, rectal snip and Kato-Katz from that role.

## pitfalls
Reaching for a stool-based or rectal-tissue-based test to diagnose enterobiasis; the perianal swab, sampling the egg-deposition site directly, is the reliable method instead.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTEROBIUS-DIAGNOSIS-PER-01

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
CON-GIT-4730BBC83E073F

## label
Oxyuriasis is another name for Enterobius vermicularis infection (enterobiasis, pinworm infection)

## canonical_key
enterobius-vermicularis.identity.oxyuriasis-synonym

## aliases
Oxyuriasis
Enterobiasis
Pinworm infection

## arabic_label
داء الأوكسيوريس مرادف لعدوى الدودة الدبوسية

## arabic_aliases


## definition
Oxyuriasis is a synonym for enterobiasis, the disease caused by Enterobius vermicularis, reflecting the worm's older taxonomic classification within the genus Oxyuris and its common name, pinworm, from its pin-like tapering tail. Ascaris lumbricoides, Dracunculus medinensis and Trichuris trichiura are each distinct nematodes with their own disease names (ascariasis, dracunculiasis/Guinea worm disease, and trichuriasis respectively) and are not synonyms for oxyuriasis.

## explicit_objective
State that oxyuriasis is the synonym for Enterobius vermicularis infection, distinguishing it from ascariasis, dracunculiasis and trichuriasis.

## pitfalls
Confusing oxyuriasis with a different nematode disease name; the term specifically refers to Enterobius vermicularis (pinworm) infection.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTEROBIUS-IDENTITY-01

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
CON-GIT-8EB50F77A2A565

## label
Graham's cellophane swab technique detects the eggs, not the female worm or whipworm eggs, of Enterobius vermicularis

## canonical_key
enterobius-vermicularis.diagnosis.graham-cellophane-swab-detects-eggs

## aliases
Graham swab technique
Cellophane tape test

## arabic_label
تقنية مسحة جراهام اللاصقة للكشف عن بيض الدودة الدبوسية

## arabic_aliases


## definition
The Graham swab (cellophane-tape) technique is applied to the perianal skin, usually in the early morning, to pick up and detect Enterobius vermicularis eggs adherent to the skin surface where the gravid female deposited them overnight, and the tape is then examined directly under the microscope. It detects the egg, not the adult female worm itself (which may occasionally also be seen but is not the technique's primary target) and not whipworm (Trichuris trichiura) eggs or hydatid sand, which are unrelated findings from entirely different organisms and specimens.

## explicit_objective
State that Graham's cellophane swab technique is used to detect Enterobius vermicularis eggs specifically, not the female worm, whipworm eggs, or hydatid sand.

## pitfalls
Assuming the Graham swab targets the adult worm rather than the egg, or confusing its target with whipworm eggs or hydatid sand, which come from unrelated organisms and specimen types.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ENTEROBIUS-DIAGNOSIS-GRA-01

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
CON-GIT-F4D22596A3C1DA

## label
Adequate disposal of stool is essential in the control of Ascaris lumbricoides and other soil-transmitted helminths, but not of Enterobius vermicularis, which spreads independently of soil contamination

## canonical_key
soil-transmitted-helminths.sanitation-control.ascaris-and-related-species

## aliases
Soil-transmitted helminth control
Sanitation and Ascaris control

## arabic_label
التخلص السليم من البراز في مكافحة الديدان المنقولة عبر التربة

## arabic_aliases


## definition
Adequate disposal of human stool, preventing environmental soil contamination, is a core public-health control measure for Ascaris lumbricoides and the other soil-transmitted helminths (hookworms, Trichuris trichiura) whose eggs or larvae must develop in soil before becoming infective. Enterobius vermicularis, by contrast, is transmitted directly from person to person by hand-to-mouth contact, airborne eggs and retroinfection without any soil-development stage, so improved stool disposal alone does little to control its spread; hygiene measures targeting direct contact and fomites are needed instead.

## explicit_objective
State that stool disposal is essential for controlling soil-transmitted helminths such as Ascaris, but not for Enterobius vermicularis, which spreads without a soil stage.

## pitfalls
Applying sanitation-based control measures uniformly to every intestinal nematode; Enterobius vermicularis specifically escapes stool-disposal control because its transmission does not depend on soil contamination.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-SOIL-TRANSMITTED-HELMINT-01

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
CON-GIT-535A1F8E179D91

## label
Toxocariasis and hydatid disease are both parasites that infect man through direct or indirect contact with dogs

## canonical_key
parasites.direct-dog-contact-transmission.toxocariasis-and-hydatid-disease

## aliases
Zoonotic dog-transmitted parasites
Dog-to-human parasite transmission

## arabic_label
الطفيليات المنقولة من الكلاب للإنسان: داء التوكسوكارا وداء الكيس العدري

## arabic_aliases


## definition
Toxocariasis (visceral larva migrans, from the dog ascarid Toxocara canis) and hydatid disease (from the larval stage of Echinococcus granulosus, whose adult worm lives in the dog intestine) are both acquired by man through contact with dogs or with soil and food contaminated by dog faeces carrying their infective eggs. Ancylostomiasis caninum, by contrast, is transmitted by skin penetration with a larva shed from contaminated soil, producing only cutaneous larva migrans rather than a systemic or hepatic disease, so it is not grouped with toxocariasis and hydatid disease as a direct-contact dog-transmitted systemic parasite in this item.

## explicit_objective
State that toxocariasis and hydatid disease are both parasitic diseases man acquires through contact with dogs or dog-contaminated soil/food.

## pitfalls
Assuming every dog-associated parasite in this option list shares the same transmission and disease pattern; Ancylostoma caninum causes only local cutaneous larva migrans, a distinct picture from the systemic toxocariasis and hepatic hydatid disease this item groups together.

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
Intestinal nematodes of the GI tract

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PARA-NEMATODES

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
0.5

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ZOONOTIC-DOG-TRANSMITTED-01

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

