<!--
  HU-GIT-301 biochemistry (scripts/helwan/extract/HU-GIT-301/mcq-bank-biochemistry.json,
  24 items across two department-book chapters: "Biochemistry of Digestion
  and Absorption" and "Liver Metabolism and Fatty Liver"). This is the
  module's only biochemistry chunk and closes HU-GIT-301's entire authoring
  backlog. 21 new concepts, minted GIT-system (23 keys
  covered: 21 net-new + 2 reused, since chapter-1 items #14/#15 share one
  key/concept). find-existing.mjs was run against every distinctive term in
  this chunk (trypsin, pepsin, chylomicron, lactase, GLUT-2, GLUT-5,
  SGLT-1, gluten, AFP, prothrombin time, fatty liver, lipotropic, coeliac
  disease, pancreatic lipase, gastric lipase, steatorrhoea, nucleoprotein,
  hormone-sensitive lipase, apo C-II) -- the flagged Kasr 206-DIG/GIT
  biochemistry reuse family surfaced 8 real live/pending hits. Two are
  exact-scope reuses, not twins (see the build script's reuse map): item 9
  (chylomicrons) reuses a pending Kasr 103-BMS concept via a sparse
  pending-live overlay row; item 22 (AFP in liver cancer) reuses this
  lane's own pathology-ch2 concept directly. The other six real hits (three
  pepsin concepts, two trypsin concepts, one nucleoprotein concept, two
  fatty-liver-cause concepts, two lipotropic-factor concepts, one
  apo-C-II/lipoprotein-lipase concept, one hormone-sensitive-lipase
  concept) are near-misses at a different scope or altitude from this
  chunk's specific tested facts (mostly "except"/exception framings not
  covered by the narrower live/pending records) -- documented in each
  concept's rejected_merge_candidate_ids rather than merged; see each
  concept's field_notes for the specific reasoning. This closes HU-GIT-301's
  parasitology+biochemistry backlog entirely -- the module has no remaining
  authored-content gap in the 281-key triage.
-->

# Item

## id
CON-GIT-9A8B6EEFF23FBA

## label
Disaccharides are hydrolysed by enzymes present in pancreatic juice, not saliva, bile or gastric juice

## canonical_key
disaccharide-digestion.pancreatic-enzymes.not-saliva-bile-gastric-juice

## aliases
Disaccharide hydrolysis
Disaccharidases

## arabic_label
هضم السكريات الثنائية بإنزيمات العصارة البنكرياسية

## arabic_aliases


## definition
The disaccharidases that hydrolyse dietary disaccharides (sucrase, lactase, maltase) are secreted into the pancreatic juice and act in the small intestine, or, in the case of the terminal brush-border disaccharidases, are anchored on the intestinal mucosal surface fed by pancreatic secretion, not present in saliva, bile or gastric juice. Salivary amylase and pancreatic amylase act only on starch (a polysaccharide) into smaller oligosaccharides and disaccharides, not on disaccharides themselves, while bile contains no digestive enzymes at all, only bile salts for fat emulsification, and gastric juice's only enzyme (pepsin) is a protease with no carbohydrate-digesting activity.

## explicit_objective
State that disaccharide-hydrolysing enzymes are present in pancreatic juice, not saliva, bile or gastric juice.

## pitfalls
Assuming any digestive secretion with enzymatic activity can hydrolyse disaccharides; saliva and pancreatic amylase only break down starch into disaccharides, bile has no enzymes at all, and gastric juice's pepsin is a protease, not a carbohydrase.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-DISACCHARIDE-DIGESTION-P-01

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
CON-GIT-889A9E638A79E5

## label
Intestinal digestion of lactose by lactase gives glucose and galactose, not glucose and fructose, glucose and mannose, or galactose and mannose

## canonical_key
lactase.hydrolysis-products.glucose-and-galactose

## aliases
Lactose hydrolysis
Lactase products
Glucose and galactose

## arabic_label
نواتج هضم اللاكتوز بإنزيم اللاكتيز

## arabic_aliases


## definition
Lactase, a brush-border disaccharidase, hydrolyses the disaccharide lactose into its two constituent monosaccharides: glucose and galactose. This is distinct from sucrase's hydrolysis of sucrose into glucose and fructose, and from any pairing involving mannose, which is not a lactose hydrolysis product at all.

## explicit_objective
State that lactase hydrolyses lactose into glucose and galactose specifically, not glucose and fructose or any mannose-containing pair.

## pitfalls
Confusing lactose's hydrolysis products (glucose and galactose) with sucrose's hydrolysis products (glucose and fructose); each disaccharide yields a specific, non-interchangeable pair of monosaccharides.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-LACTASE-HYDROLYSIS-PRODU-01

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
CON-GIT-54B94F3BF16D1D

## label
SGLT-1 is incorrect to describe as present in muscle and adipose tissue: it is an intestinal and renal transporter

## canonical_key
sglt-1.tissue-distribution.intestine-and-kidney-not-muscle-or-adipose

## aliases
SGLT-1
Sodium-glucose cotransporter 1
Intestinal glucose transport

## arabic_label
ناقل الجلوكوز الصوديومي SGLT-1 وتوزيعه النسيجي

## arabic_aliases


## definition
Sodium-dependent glucose transporter-1 (SGLT-1) is present in the intestinal brush border and the renal proximal tubule, not in muscle or adipose tissue; this makes "present in muscles and adipose tissue" the incorrect statement about SGLT-1 among a set of otherwise-true statements. SGLT-1 causes active (secondary active, sodium-cotransport-driven) uptake of glucose against its own concentration gradient by transporting sodium down its concentration gradient, and it is insulin-independent, unlike the muscle/adipose glucose transporter GLUT-4, which is both insulin-dependent and genuinely expressed in those tissues.

## explicit_objective
Identify that SGLT-1 is not present in muscle or adipose tissue, distinguishing it from the insulin-dependent GLUT-4 that is.

## pitfalls
Confusing SGLT-1's intestinal/renal distribution with GLUT-4's muscle/adipose distribution; SGLT-1 is a secondary active, insulin-independent, sodium-cotransport glucose transporter restricted to intestine and kidney.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-SGLT1-TISSUE-DISTRIBUTIO-01

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
CON-GIT-FD54F93ECD5A37

## label
SGLT-1, GLUT-2 and GLUT-5 are present in the small intestine; GLUT-4 is not

## canonical_key
glucose-transporters.intestinal-scglt1-glut2-glut5-not-glut4

## aliases
Intestinal glucose transporters
GLUT-4 exclusion
Enterocyte sugar transport

## arabic_label
نواقل الجلوكوز في الأمعاء الدقيقة

## arabic_aliases


## definition
The small intestinal enterocyte expresses SGLT-1 (apical, sodium-coupled glucose/galactose uptake), GLUT-5 (apical, fructose uptake) and GLUT-2 (basolateral, exit of glucose, galactose and fructose into the bloodstream), but not GLUT-4, which is instead the insulin-responsive glucose transporter of skeletal muscle and adipose tissue and is not expressed in the intestinal epithelium.

## explicit_objective
List SGLT-1, GLUT-2 and GLUT-5 as the glucose transporters present in the small intestine, and exclude GLUT-4 from that list.

## pitfalls
Assuming GLUT-4, being a well-known glucose transporter, is present everywhere glucose is transported; it is restricted to insulin-responsive tissues (muscle, adipose) and is absent from the intestinal epithelium.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-GLUCOSE-TRANSPORTERS-INT-01

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
CON-GIT-2BA0730361E78F

## label
Fructose is absorbed in the small intestine through GLUT-5, not SGLT-1, GLUT-3 or GLUT-4

## canonical_key
fructose-absorption.glut-5.not-sglt1-glut3-glut4

## aliases
GLUT-5
Fructose transport
Intestinal fructose absorption

## arabic_label
امتصاص الفركتوز عبر ناقل GLUT-5

## arabic_aliases


## definition
Fructose crosses the apical membrane of the small intestinal enterocyte via GLUT-5, a facilitated-diffusion transporter specific to fructose, not via SGLT-1 (which is sodium-coupled and specific to glucose/galactose), GLUT-3 (the high-affinity neuronal glucose transporter) or GLUT-4 (the insulin-responsive muscle/adipose glucose transporter). Once inside the enterocyte, fructose exits into the bloodstream via the basolateral GLUT-2 transporter, the same exit route shared with glucose and galactose.

## explicit_objective
State that GLUT-5 is the apical fructose transporter of the small intestine, distinguishing it from SGLT-1, GLUT-3 and GLUT-4.

## pitfalls
Assuming fructose shares SGLT-1's sodium-coupled uptake mechanism with glucose; fructose absorption is instead by facilitated diffusion through the fructose-specific GLUT-5 transporter.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-FRUCTOSE-ABSORPTION-GLUT-01

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
CON-GIT-B433FB672E9305

## label
GLUT2 transports glucose from the intestinal cell into the bloodstream, not GLUT4, SGLT1 or SGLT2

## canonical_key
glut-2.basolateral-sugar-exit.intestinal-cell-to-bloodstream

## aliases
GLUT2
Basolateral glucose exit
Enterocyte sugar export

## arabic_label
ناقل GLUT2 لخروج الجلوكوز من الخلية المعوية إلى الدم

## arabic_aliases


## definition
GLUT2, located on the basolateral membrane of the small intestinal enterocyte, transports glucose (along with galactose and fructose) out of the cell and into the bloodstream by facilitated diffusion, completing transepithelial sugar absorption after apical uptake by SGLT1 (glucose/galactose) or GLUT5 (fructose). GLUT4 is instead the insulin-responsive transporter of muscle and adipose tissue, and SGLT2 is the sodium-glucose cotransporter of the renal proximal tubule (the target of SGLT2-inhibitor diabetes drugs), neither of which mediates intestinal basolateral sugar exit.

## explicit_objective
Identify GLUT2 as the basolateral transporter moving glucose (and other absorbed sugars) from the enterocyte into the bloodstream.

## pitfalls
Confusing GLUT2's intestinal basolateral role with SGLT2's renal role or GLUT4's muscle/adipose role; each glucose transporter has a distinct tissue location and direction of transport.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-GLUT2-BASOLATERAL-EXIT-01

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
CON-GIT-F0DA58ADEF8EC2

## label
Lactose intolerance is caused by deficiency of lactase, not galactokinase, UDP-galactose-4-epimerase or galactose-1-phosphate uridyl transferase

## canonical_key
lactose-intolerance.lactase-deficiency.not-galactokinase-epimerase-transferase

## aliases
Lactose intolerance
Lactase deficiency
Galactosaemia differential

## arabic_label
عدم تحمل اللاكتوز الناتج عن نقص إنزيم اللاكتيز

## arabic_aliases


## definition
Lactose intolerance results from deficiency of lactase, the brush-border enzyme that hydrolyses lactose into glucose and galactose; without it, undigested lactose remains in the gut lumen, drawing water osmotically and being fermented by colonic bacteria to produce the bloating, cramping and diarrhoea of lactose intolerance. Galactokinase, UDP-galactose-4-epimerase and galactose-1-phosphate uridyl transferase are instead enzymes of the intracellular galactose metabolism (Leloir) pathway, whose deficiencies cause the distinct disease galactosaemia, not lactose intolerance.

## explicit_objective
Distinguish lactase deficiency (causing lactose intolerance) from deficiencies of the galactose-metabolism enzymes (causing galactosaemia).

## pitfalls
Confusing lactose intolerance (a brush-border digestive enzyme deficiency) with galactosaemia (an intracellular galactose-metabolism enzyme deficiency); the two conditions and their causative enzymes are entirely distinct.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-LACTOSE-INTOLERANCE-LACT-01

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
CON-GIT-1ED73C8C997923

## label
Pancreatic lipase requires colipase, bile salts and phospholipids for its activity, but not apo C-II

## canonical_key
pancreatic-lipase.cofactors.colipase-bile-salts-phospholipids-not-apo-c-ii

## aliases
Pancreatic lipase cofactors
Colipase
Fat digestion enzymes

## arabic_label
العوامل المساعدة لإنزيم الليباز البنكرياسي

## arabic_aliases


## definition
Pancreatic lipase requires colipase (which anchors the enzyme to the lipid-water interface and prevents its displacement by bile salts), bile salts (which emulsify dietary fat into a large-surface-area interface the enzyme can act on), and phospholipids (which contribute to micelle formation aiding substrate presentation) for its digestive activity in the intestinal lumen. Apo C-II is not required by pancreatic lipase; it is instead the cofactor required by lipoprotein lipase, an entirely different enzyme that hydrolyses triacylglycerol within circulating chylomicrons and VLDL at the capillary endothelium, not within the gut lumen.

## explicit_objective
List colipase, bile salts and phospholipids as pancreatic lipase's cofactors, and identify apo C-II as the cofactor of the unrelated enzyme lipoprotein lipase instead.

## pitfalls
Confusing pancreatic lipase's luminal digestive cofactors (colipase, bile salts, phospholipids) with lipoprotein lipase's plasma cofactor (apo C-II); the two lipases act in different compartments and require different cofactors.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-PANCREATIC-LIPASE-COFACT-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids
CON-GIT-6CB618DBA50596

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
content: find-existing.mjs surfaced CON-GIT-6CB618DBA50596 (pending, Kasr 103-BMS: "Lipoprotein lipase empties triacylglycerol-rich particles at the capillary wall; apo C-II activates it, insulin induces it, and heparin displaces it"). That concept states apo C-II's role for lipoprotein lipase (plasma, capillary) — a real but different enzyme and compartment from this item's pancreatic lipase (gut lumen), so it is not merged; this item's specific claim is the negative one (apo C-II is NOT pancreatic lipase's cofactor).
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-2D675701EAA724

## label
Gastric lipase is of significance in infants, but it is not the main digestive lipase, does not need colipase, and does not need a low pH for its action

## canonical_key
gastric-lipase.significance-in-infants.not-main-digestive-lipase-no-colipase-no-low-ph-requirement

## aliases
Gastric lipase
Infant fat digestion
Chief cell lipase

## arabic_label
أهمية ليباز المعدة عند الرضع

## arabic_aliases


## definition
Gastric lipase, secreted by gastric chief cells, has particular significance in infants, whose relatively immature pancreatic lipase secretion makes gastric lipase a proportionally larger contributor to fat digestion of milk fat than in adults; it is not the main digestive lipase overall (pancreatic lipase fills that role in adults), it does not require colipase (a pancreatic-lipase-specific cofactor), and, unlike pepsin, it does not require a low pH for its action, retaining activity across a range of gastric pH.

## explicit_objective
State that gastric lipase is significant in infant fat digestion, while excluding the false statements that it is the main digestive lipase, needs colipase, or needs a low pH.

## pitfalls
Assuming gastric lipase shares pancreatic lipase's colipase requirement or pepsin's low-pH requirement; gastric lipase is a distinct enzyme whose main clinical relevance is specifically its proportionally larger role in infant fat digestion.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-GASTRIC-LIPASE-INFANTS-01

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
CON-GIT-DEA194F2F7E85C

## label
Deficiency of pancreatic lipase, pancreatic duct obstruction and bile duct obstruction all cause steatorrhoea; deficiency of hormone-sensitive lipase does not

## canonical_key
steatorrhoea.causes.pancreatic-lipase-and-duct-obstruction-not-hormone-sensitive-lipase

## aliases
Steatorrhoea causes
Fat malabsorption
Hormone-sensitive lipase exclusion

## arabic_label
أسباب الإسهال الدهني واستثناء الليباز الحساس للهرمونات

## arabic_aliases


## definition
Steatorrhoea (fat malabsorption presenting as pale, bulky, offensive stool) is caused by deficiency of pancreatic lipase enzyme itself, by obstruction of the pancreatic duct (preventing lipase from reaching the gut lumen), or by obstruction of the bile duct (preventing bile-salt-driven fat emulsification) — all three impair luminal fat digestion or emulsification. Hormone-sensitive lipase is an entirely different, intracellular enzyme that mobilises stored triacylglycerol from adipose tissue in response to hormonal signals (such as catecholamines and glucagon); its deficiency has no bearing on luminal fat digestion or absorption and therefore does not cause steatorrhoea.

## explicit_objective
List pancreatic lipase deficiency, pancreatic duct obstruction and bile duct obstruction as causes of steatorrhoea, and exclude hormone-sensitive lipase deficiency, an unrelated intracellular adipose-tissue enzyme.

## pitfalls
Assuming any lipase-related deficiency causes fat malabsorption; hormone-sensitive lipase acts intracellularly within adipocytes to mobilise stored fat, entirely unrelated to luminal fat digestion and absorption.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-STEATORRHOEA-CAUSES-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids
CON-FND-1C668119B3C0BB

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
content: find-existing.mjs surfaced CON-FND-1C668119B3C0BB (pending, Kasr 103-BMS: hormone-sensitive lipase's insulin/anti-insulin-hormone phosphorylation regulation). That concept describes how hormone-sensitive lipase itself is regulated, a different fact from this item's claim (that its deficiency does NOT cause steatorrhoea, unlike the gut-luminal lipase/duct causes) — not merged.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-6814A8272B9D2D

## label
Pepsin is an endopeptidase, not an exopeptidase, formed by the action of HCl on pepsinogen, and is smaller than its precursor

## canonical_key
pepsin.endopeptidase-not-exopeptidase.formed-from-pepsinogen-by-hcl-smaller-than-precursor

## aliases
Pepsin
Endopeptidase vs exopeptidase
Pepsinogen activation

## arabic_label
البيبسين إنزيم داخلي الببتيداز

## arabic_aliases


## definition
Pepsin is an endopeptidase, cleaving peptide bonds within the interior of a protein chain, not at its terminal ends (which is what an exopeptidase does) — describing pepsin as an exopeptidase is therefore the incorrect statement among a set of otherwise-true facts. Pepsin is genuinely formed by the action of hydrochloric acid on its inactive precursor pepsinogen (secreted by gastric chief cells), and, since activation proceeds by proteolytic removal of a segment of the pepsinogen molecule, active pepsin is genuinely smaller than pepsinogen.

## explicit_objective
Identify that pepsin is an endopeptidase, not an exopeptidase, while correctly attributing its HCl-mediated activation from pepsinogen and its smaller size relative to its precursor.

## pitfalls
Assuming pepsin is an exopeptidase because it acts early in protein digestion; pepsin cleaves internal peptide bonds (endopeptidase activity), leaving further terminal trimming to later intestinal exopeptidases such as carboxypeptidases.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-PEPSIN-ENDOPEPTIDASE-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids
CON-GIT-E717E25A1060A4
CON-GIT-E10E05FE786B9A
CON-GIT-6E386B69AA17CB

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
content: find-existing.mjs surfaced three live Kasr concepts about pepsin: CON-GIT-E717E25A1060A4 (gastrin stimulates pepsin secretion), CON-GIT-E10E05FE786B9A (chief cells secrete pepsin as pepsinogen) and CON-GIT-6E386B69AA17CB (HCl activates pepsinogen, then pepsin autocatalyses further activation). All three cover pepsin secretion/activation, not its catalytic classification (endopeptidase vs exopeptidase), which is this item's specific tested fact — not merged.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-ED1EE57CED914A

## label
Trypsin is an endopeptidase, not an exopeptidase, activated from trypsinogen by enteropeptidase, capable of autocatalysis, and able to activate other zymogens such as chymotrypsinogen

## canonical_key
trypsin.endopeptidase-not-exopeptidase.enteropeptidase-activated-autocatalytic-activates-other-zymogens

## aliases
Trypsin
Enteropeptidase activation
Zymogen cascade

## arabic_label
التربسين إنزيم داخلي الببتيداز

## arabic_aliases


## definition
Trypsin is an endopeptidase, cleaving peptide bonds within a protein chain's interior — describing it as an exopeptidase is the false statement among a set of otherwise-true facts about it. Trypsin is genuinely secreted as inactive trypsinogen and activated to trypsin by intestinal enteropeptidase (enterokinase); active trypsin can also act autocatalytically on its own remaining trypsinogen precursor to generate more trypsin, and it further activates other pancreatic zymogens, including chymotrypsinogen (to chymotrypsin) and procarboxypeptidases, making it the master activator of the pancreatic protease cascade.

## explicit_objective
Identify trypsin as an endopeptidase, not an exopeptidase, while correctly attributing enteropeptidase activation, autocatalysis, and its role activating other zymogens.

## pitfalls
Assuming trypsin is an exopeptidase because of its central role in initiating protein digestion; trypsin cleaves internal peptide bonds at specific residues (endopeptidase activity), distinct from the terminal-residue-cleaving exopeptidases.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-TRYPSIN-ENDOPEPTIDASE-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids
CON-GIT-DCE600A449FBC4
CON-GIT-2E93ABAB29A4BC

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
content: find-existing.mjs surfaced two live Kasr concepts about trypsin activation: CON-GIT-DCE600A449FBC4 and CON-GIT-2E93ABAB29A4BC (both: enteropeptidase/brush-border enteropeptidase converts trypsinogen to trypsin). Both cover the activation mechanism, a fact this concept also states, but neither covers trypsin's catalytic classification (endopeptidase vs exopeptidase) or its downstream zymogen-activating role, which are this item's specific tested facts — not merged, since the printed item tests a broader combination of facts than either live record states alone.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-7B3D81B8D77319

## label
Trypsin cleaves polypeptide bonds at the carboxyl end of arginine and lysine, specific to these two basic amino acids

## canonical_key
trypsin.substrate-specificity.arginine-and-lysine-carboxyl-bonds

## aliases
Trypsin substrate specificity
Arginine and lysine cleavage
Protease specificity

## arabic_label
نوعية التربسين لقطع الروابط عند الأرجينين والليسين

## arabic_aliases


## definition
Trypsin's substrate specificity is for peptide bonds formed at the carboxyl (C-terminal) side of the basic amino acids arginine and lysine, cleaving the polypeptide immediately after either residue. This specificity distinguishes trypsin from chymotrypsin (specific for aromatic residues: phenylalanine, tyrosine, tryptophan), pepsin (broader specificity favouring aromatic and other bulky hydrophobic residues), and elastase (specific for small, uncharged residues such as glycine, alanine and serine), together giving the digestive endopeptidases complementary, non-overlapping cleavage patterns across a dietary protein.

## explicit_objective
State that trypsin cleaves polypeptides specifically at the carboxyl end of arginine and lysine, distinguishing this specificity from chymotrypsin, pepsin and elastase.

## pitfalls
Confusing trypsin's arginine/lysine specificity with chymotrypsin's aromatic-residue specificity or elastase's small-residue specificity; each pancreatic endopeptidase targets a distinct set of amino acid side chains.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-TRYPSIN-SUBSTRATE-SPECIF-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids
CON-GIT-DCE600A449FBC4
CON-GIT-2E93ABAB29A4BC

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
content: Same live near-misses as the sibling trypsin-endopeptidase concept (CON-GIT-DCE600A449FBC4, CON-GIT-2E93ABAB29A4BC: trypsinogen activation by enteropeptidase) — neither covers trypsin's substrate specificity, this item's tested fact, so not merged.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-5D78F266B8F5E1

## label
Coeliac disease is immune-mediated damage to the small intestine in response to ingestion of gluten, not keratin, collagen or albumin

## canonical_key
coeliac-disease.gluten-trigger.not-keratin-collagen-albumin

## aliases
Coeliac disease
Gluten trigger
Gluten-sensitive enteropathy

## arabic_label
الغلوتين محفز مرض السيلياك

## arabic_aliases


## definition
Coeliac disease is an immune-mediated (autoimmune-type) disorder in which ingestion of gluten, a protein found in wheat, barley and rye, triggers damage to the small intestinal mucosa, characteristically villous atrophy and crypt hyperplasia, causing malabsorption. Keratin (a structural protein of skin/hair), collagen (a structural extracellular matrix protein) and albumin (a plasma protein) are unrelated dietary or endogenous proteins that do not trigger coeliac disease.

## explicit_objective
State that gluten, not keratin, collagen or albumin, is the dietary trigger for coeliac disease's immune-mediated small intestinal damage.

## pitfalls
Confusing gluten with other structural or plasma proteins; coeliac disease's immune trigger is specifically the gluten protein found in wheat, barley and rye.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-COELIAC-DISEASE-GLUTEN-01

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
CON-GIT-906403B8914D78

## label
Purines and pyrimidines are poorly absorbed from the diet, not well-described by the other statements about nucleic acid source, gastric degradation, or nucleotidase products

## canonical_key
nucleoprotein-digestion.poor-absorption-of-purines-and-pyrimidines.not-legume-source-gastric-degradation-or-nucleotidase-products

## aliases
Nucleoprotein digestion
Purine and pyrimidine absorption
Dietary nucleic acids

## arabic_label
ضعف امتصاص البيورينات والبيريميدينات الغذائية

## arabic_aliases


## definition
Dietary purines and pyrimidines, once released from nucleic acids by intestinal digestion, are poorly absorbed across the intestinal mucosa, so dietary nucleic acids contribute only a minor amount to the body's purine/pyrimidine pool compared with endogenous synthesis. This is the correct statement among a set that also wrongly claims nucleic acids are found mostly in legumes, cereals and vegetables (they are instead concentrated in liver and meat, tissues rich in cell nuclei), wrongly claims dietary nucleoproteins are degraded by gastric enzymes into proteins and nucleic acids (this degradation instead occurs by pancreatic and intestinal enzymes, not gastric ones), and wrongly claims nucleotides are hydrolysed by intestinal nucleosidases/phosphorylases to yield the base and pentose 1-phosphate (nucleotidases instead yield the base and free pentose, not pentose 1-phosphate).

## explicit_objective
State that dietary purines and pyrimidines are poorly absorbed, correcting the false claims about their dietary source, site of nucleoprotein degradation, and nucleotide hydrolysis products.

## pitfalls
Assuming dietary nucleic acid intake meaningfully contributes to the body's purine/pyrimidine pool; poor intestinal absorption means endogenous synthesis, not diet, is the dominant source.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-NUCLEOPROTEIN-DIGESTION--01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids
CON-GIT-762D834A649468

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
content: find-existing.mjs surfaced CON-GIT-762D834A649468 (live Kasr: "Dietary purines and pyrimidines occur mainly in nucleic acids, especially in liver and meat"), which correctly rebuts this item's "legumes, cereals and vegetables" distractor but does not state the item's own tested fact (poor absorption) — a related but distinct fact, so not merged.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-6458A3D847FB3B

## label
Over-mobilisation of fats, decreased apolipoprotein synthesis, and decreased phospholipids for lipoprotein synthesis all cause fatty liver; increased oxidation of fatty acids does not

## canonical_key
fatty-liver.causes.overmobilisation-decreased-apolipoprotein-decreased-phospholipid-not-increased-oxidation

## aliases
Fatty liver causes
Hepatic steatosis pathogenesis
VLDL export failure

## arabic_label
أسباب الكبد الدهني واستثناء زيادة أكسدة الأحماض الدهنية

## arabic_aliases


## definition
Fatty liver (hepatic steatosis) results from an imbalance favouring triacylglycerol accumulation: over-mobilisation of fats from adipose tissue (as during starvation, overwhelming the liver's export capacity), decreased apolipoprotein synthesis (impairing VLDL assembly, which is needed to export triacylglycerol from the liver), and decreased phospholipids available for lipoprotein synthesis (also impairing VLDL assembly and export) are all recognised causes. Increased oxidation of fatty acids, by contrast, would consume fatty acids rather than allow them to accumulate as triacylglycerol, so it does not cause fatty liver — it is decreased, not increased, fatty acid oxidation that is a recognised contributing mechanism.

## explicit_objective
List over-mobilisation of fats, decreased apolipoprotein synthesis and decreased phospholipids as causes of fatty liver, and identify increased fatty acid oxidation as the exception that does not cause it.

## pitfalls
Assuming any perturbation of fatty acid metabolism causes fatty liver; specifically increased (not decreased) fatty acid oxidation would reduce, not increase, hepatic triacylglycerol accumulation, making it the exception among these four options.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-FATTY-LIVER-NOT-INCREASE-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids
CON-GIT-5E17AE710409A4
CON-GIT-ADAE9B3037FA58

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
content: find-existing.mjs surfaced two live Kasr concepts on fatty liver causes: CON-GIT-5E17AE710409A4 (overmobilisation of adipose fat exceeding hepatic VLDL-synthesis capacity) and CON-GIT-ADAE9B3037FA58 (carbohydrate overfeeding beyond glycogen-storage capacity). The first individually covers one of this item's four options (over-mobilisation); neither states the item's combined "except" framing across all four options, including the increased-oxidation exception, so this item is minted separately rather than merged into either narrower record.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-16A9A024EE2514

## label
Essential fatty acids, methionine and folic acid are lipotropic factors; chloroform is not — it is hepatotoxic instead

## canonical_key
lipotropic-factors.chloroform-is-hepatotoxic-not-lipotropic

## aliases
Lipotropic factors
Chloroform hepatotoxicity
Fatty liver prevention

## arabic_label
العوامل المحفزة لإذابة الدهون الكبدية واستثناء الكلوروفورم

## arabic_aliases


## definition
Lipotropic factors — substances that prevent or reverse fatty liver by promoting hepatic triacylglycerol export or reducing its accumulation — include essential fatty acids (needed for phospholipid and lipoprotein synthesis), methionine (a methyl donor supporting phosphatidylcholine synthesis for lipoprotein assembly) and folic acid (supporting methionine regeneration via one-carbon metabolism). Chloroform is not a lipotropic factor at all; it is instead a directly hepatotoxic solvent that damages hepatocytes and can itself cause fatty change and centrilobular necrosis, the opposite effect of a lipotropic agent.

## explicit_objective
List essential fatty acids, methionine and folic acid as lipotropic factors, and identify chloroform as the exception, being directly hepatotoxic instead.

## pitfalls
Assuming every substance grouped in a lipotropic-factor question is genuinely lipotropic; chloroform is the recurring "false lipotropic factor" exception, since it is actually a hepatotoxin, not a protective agent.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-LIPOTROPIC-FACTORS-CHLOR-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids
CON-GIT-2F25DC280014C6
CON-GIT-49C0A180AAED8F

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
content: find-existing.mjs surfaced two live Kasr concepts: CON-GIT-2F25DC280014C6 (lipotropic factors include essential amino acids, essential fatty acids, inositol, methyl donors, vitamin B12 and folate) and CON-GIT-49C0A180AAED8F (lipotropic factors mobilise triacylglycerol from the liver). Both state the positive list/mechanism of genuine lipotropic factors; neither states this item's specific negative fact (chloroform is NOT lipotropic and is instead hepatotoxic), so this item is minted separately rather than merged.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-7992490561C8CA

## label
Alcoholic fatty liver involves a decreased, not increased, NADH/NAD ratio among its manifestations, alongside fat accumulation, alcohol oxidation and decreased fatty acid oxidation

## canonical_key
alcoholic-fatty-liver.mechanisms.decreased-not-increased-nadh-nad-ratio

## aliases
Alcoholic fatty liver
NADH/NAD ratio
Ethanol oxidation

## arabic_label
ارتفاع نسبة NADH/NAD في الكبد الدهني الكحولي

## arabic_aliases


## definition
Alcoholic fatty liver is characterised by accumulation of fat in the liver, driven by the hepatic oxidation of ethanol (via alcohol dehydrogenase and acetaldehyde dehydrogenase), which raises the hepatocyte's NADH/NAD+ ratio, not decreases it; this elevated NADH/NAD+ ratio in turn favours triacylglycerol synthesis and decreases fatty acid oxidation (since beta-oxidation is NAD+-dependent), completing a self-reinforcing cycle of fat accumulation. "Decreased NADH/NAD ratio" is therefore the false statement among these four, since ethanol oxidation genuinely increases, not decreases, this ratio.

## explicit_objective
State that ethanol oxidation increases the hepatic NADH/NAD+ ratio, not decreases it, driving decreased fatty acid oxidation and fat accumulation in alcoholic fatty liver.

## pitfalls
Assuming ethanol metabolism decreases the NADH/NAD+ ratio; oxidation of ethanol to acetaldehyde and then acetate generates NADH, raising, not lowering, this ratio, which is the mechanistic driver of decreased fatty acid oxidation in alcoholic fatty liver.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ALCOHOLIC-FATTY-LIVER-NA-01

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
content: find-existing.mjs surfaced a live Kasr article and concepts on general fatty liver causes/definition (ART-GIT-TOP-E391F29EBF; CON-GIT-2D2709CD4D9A17 definition; CON-GIT-ADAE9B3037FA58 carbohydrate overfeeding; CON-GIT-5E17AE710409A4 adipose overmobilisation) but none states the alcohol-specific NADH/NAD+ mechanism this item tests, so no merge candidate applies here.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-C9966CF102B512

## label
Prothrombin time and concentration is a good index of liver synthetic function, unlike AFP, ALT or plasma ammonia

## canonical_key
liver-function-tests.prothrombin-time-and-concentration.synthetic-function-marker

## aliases
Prothrombin time
Liver synthetic function
Coagulation factor synthesis

## arabic_label
زمن البروثرومبين كمؤشر للوظيفة التخليقية للكبد

## arabic_aliases


## definition
Prothrombin time and concentration reflects the liver's synthetic capacity for clotting factors (II, VII, IX, X), which have short half-lives, making it a sensitive, good index of current liver synthetic function. Serum alpha-fetoprotein (AFP) is instead a tumour marker (elevated in hepatocellular carcinoma), serum alanine aminotransferase (ALT) reflects hepatocellular damage/leakage rather than synthetic capacity, and plasma ammonia level reflects the liver's detoxification (urea cycle) function rather than its protein-synthetic function, so none of the three is the correct marker of synthetic function here.

## explicit_objective
Identify prothrombin time and concentration as the good index of liver synthetic function, distinguishing it from AFP (tumour marker), ALT (hepatocellular damage marker) and ammonia (detoxification marker).

## pitfalls
Confusing markers of hepatocellular damage (ALT, AST) or detoxification (ammonia) with markers of synthetic function; prothrombin time specifically reflects the liver's ongoing capacity to synthesise clotting factors.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-LIVER-FUNCTION-PROTHROMB-01

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
CON-GIT-0CD800519C6A63

## label
Serum transaminases (ALT and AST) indicate hepatocellular damage, not liver cancer, liver failure, or decreased synthetic function

## canonical_key
liver-function-tests.transaminases-alt-ast.indicate-hepatocellular-damage

## aliases
Transaminases
ALT and AST
Hepatocellular damage marker

## arabic_label
إنزيمات الترانس أميناز كمؤشر لتلف خلايا الكبد

## arabic_aliases


## definition
Serum transaminases (alanine aminotransferase, ALT, and aspartate aminotransferase, AST) are intracellular hepatocyte enzymes released into the blood when hepatocyte membranes are damaged, so their elevation indicates hepatocellular damage, not liver cancer specifically (which is better indicated by AFP), not liver failure per se (better reflected by synthetic markers such as prothrombin time), and not decreased liver synthetic function directly (transaminases reflect leakage from damaged cells, not the liver's ongoing capacity to synthesise proteins).

## explicit_objective
State that serum transaminases indicate hepatocellular damage specifically, distinguishing this from liver cancer, liver failure, or decreased synthetic function.

## pitfalls
Treating any abnormal liver enzyme as interchangeable evidence of liver cancer or liver failure; transaminases specifically reflect hepatocyte membrane damage and enzyme leakage, a distinct process from malignancy or synthetic failure.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-LIVER-FUNCTION-TRANSAMIN-01

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
CON-GIT-B4F2ACF85E3BE2

## label
The liver regulates blood glucose, produces bile salts, and stores glycogen; it is not the site of gamma-globulin synthesis

## canonical_key
liver-metabolism.roles.blood-glucose-bile-glycogen-not-gamma-globulin-synthesis

## aliases
Liver metabolic functions
Gamma-globulin synthesis exception
Plasma protein synthesis

## arabic_label
وظائف الكبد الأيضية واستثناء تخليق الغلوبيولينات المناعية

## arabic_aliases


## definition
The liver is the main organ responsible for regulation of blood glucose (via glycogen synthesis/breakdown and gluconeogenesis), it produces bile salts (for fat digestion), and it is the major site of glycogen storage — all genuine liver metabolic roles. Gamma-globulins (immunoglobulins), by contrast, are synthesised by plasma cells (differentiated B lymphocytes) of the immune system, not by the liver, making "site of synthesis of gamma-globulins" the false statement among the liver's otherwise-true metabolic roles; the liver does synthesise most other plasma proteins (albumin, clotting factors, alpha- and beta-globulins), but not gamma-globulins.

## explicit_objective
List blood glucose regulation, bile salt production and glycogen storage as genuine liver roles, and identify gamma-globulin synthesis as the exception, which is instead performed by plasma cells.

## pitfalls
Assuming the liver synthesises all plasma proteins; it synthesises albumin and most other globulin fractions, but gamma-globulins (immunoglobulins) are specifically produced by plasma cells, not hepatocytes.

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
Gastrointestinal biochemistry

## subtopic
Digestion, absorption and liver metabolism

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-BIOCHEM

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
0.8

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-LIVER-METABOLISM-GAMMA-G-01

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

