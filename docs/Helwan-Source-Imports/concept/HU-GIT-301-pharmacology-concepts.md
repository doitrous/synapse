<!--
  HU-GIT-301 pharmacology (scripts/helwan/extract/HU-GIT-301/mcq-bank-pharmacology.json,
  52 items, plus the one shared-bank item this lane claimed — Q40 of
  mcq-bank-shared-triage.json, an omeprazole mechanism item reused here
  rather than minting a second proton-pump-inhibitor concept). 22 new
  concepts, minted GIT-system. Search performed via find-existing.mjs before
  every mint; one near-miss (three live GIT-system "purgatives" concepts,
  canonical_key teaching.pharm23.*, a mild-laxative/potent-cathartic
  classification) recorded in rejected_merge_candidate_ids on the
  purgatives-and-laxatives concept below, with reasoning.
-->

# Item

## id
CON-GIT-6D48CB2F136312

## label
Dimenhydrinate is the antihistamine of choice for preventing and treating motion sickness

## canonical_key
antiemetics.motion-sickness.dimenhydrinate

## aliases
Dimenhydrinate
Motion sickness antiemetic

## arabic_label
الديمنهيدرينات ودوار الحركة

## arabic_aliases


## definition
Dimenhydrinate, an H1-antihistamine with central anticholinergic activity, is the drug of choice for preventing and treating the nausea and vomiting of motion sickness. It works by blocking the histaminergic and cholinergic signalling of the vestibular pathways that drive motion-triggered vomiting.

## explicit_objective
Name dimenhydrinate as the antihistamine of choice for motion sickness.

## pitfalls
Reaching for a dopamine-antagonist antiemetic (metoclopramide, chlorpromazine) for motion sickness; that mechanism targets the chemoreceptor trigger zone, not the vestibular pathway dimenhydrinate’s antihistamine action blocks.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ANTIEMETICS-MOTION-SICKN-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-DD2C322C78B158

## label
Metoclopramide is a dopamine D2-receptor antagonist with dual antiemetic and prokinetic action, useful in diabetic gastroparesis

## canonical_key
metoclopramide.dual-antiemetic-prokinetic-d2-antagonist

## aliases
Metoclopramide
D2-receptor antagonist prokinetic
Diabetic gastroparesis treatment

## arabic_label
الميتوكلوبراميد

## arabic_aliases


## definition
Metoclopramide is a dopamine D2-receptor antagonist that blocks D2 receptors in the chemoreceptor trigger zone for its antiemetic effect and enhances gastric motility and emptying for its prokinetic effect. This dual action makes it useful for diabetic gastroparesis, where delayed gastric emptying causes bloating and distress, and wherever both nausea control and prokinetic benefit are wanted at once.

## explicit_objective
State metoclopramide's D2-antagonist mechanism and its dual antiemetic-prokinetic use, including diabetic gastroparesis.

## pitfalls
Treating metoclopramide as a pure antiemetic like ondansetron; its D2-receptor blockade also drives a genuine prokinetic effect on gastric emptying that a pure 5-HT3 antagonist lacks.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-METOCLOPRAMIDE-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-70B7BCBE9B074C

## label
Purgatives are classed as physical/lubricant (liquid paraffin, which risks fat-soluble vitamin malabsorption), osmotic, or irritant (castor oil, acting by increasing peristalsis), and are contraindicated in gastroenteritis

## canonical_key
purgatives.classification-liquid-paraffin-and-contraindications

## aliases
Purgatives
Laxative classification
Liquid paraffin
Castor oil
Irritant laxative

## arabic_label
المسهلات وتصنيفها

## arabic_aliases


## definition
Purgatives are classified by mechanism: physical/lubricant agents such as liquid paraffin and dioctyl sodium sulphosuccinate soften or lubricate the stool, osmotic agents draw water into the lumen, and irritant (stimulant) agents such as castor oil and bisacodyl act by increasing peristaltic activity through direct mucosal stimulation. Liquid paraffin, taken chronically, interferes with absorption of the fat-soluble vitamins (A, D, E, K). Purgatives are used before operations, after anti-helminthic treatment, and in oral drug poisoning to hasten elimination, but they are contraindicated in gastroenteritis, where they would worsen fluid loss and irritate an already inflamed bowel.

## explicit_objective
Classify a purgative as physical, osmotic or irritant, name liquid paraffin’s fat-soluble vitamin risk, and state that purgatives are contraindicated in gastroenteritis.

## pitfalls
Assuming purgatives are safe or indicated in every setting of bowel upset; they are specifically contraindicated in gastroenteritis, where the bowel is already inflamed and fluid loss already excessive.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-PURGATIVES-AND-LAXATIVES-01

## resource_occurrence_ids


## source_candidate_ids


## original_wording


## merge_ids


## rejected_merge_candidate_ids
CON-GIT-65B0E24C6DD829
CON-GIT-9857FD8C762A67
CON-GIT-83CBA651E6992A

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
rejectedMergeCandidateIds: CON-GIT-83CBA651E6992A ("Purgatives increase gastrointestinal motility and evacuation and are classified as mild laxatives or potent cathartics", canonical_key teaching.pharm23.purgative.definition), CON-GIT-65B0E24C6DD829 ("Bulk-forming purgatives increase bowel bulk...", teaching.pharm23.bulk-forming.mechanism) and CON-GIT-9857FD8C762A67 ("Intestinal evacuants include purgatives, cleansing enemas, and glycerin suppositories", teaching.pharm23.evacuant.types) are all thin, unscoped ("teaching.pharm23.*", no universities/modules set) live records using a mild-laxative-vs-potent-cathartic classification scheme. This concept instead tests the physical/osmotic/irritant classification, liquid paraffin’s specific fat-soluble vitamin malabsorption risk, and the gastroenteritis contraindication — none of which the three live records state. Overlaying onto any of them would either staple an unrelated classification scheme onto this one or silently drop the vitamin-malabsorption and contraindication facts this cluster’s three items actually test. Not merged; distinct objective.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-E62D2209A2A605

## label
Antidiarrhoeal management uses antimicrobials, fluid replacement, adsorbents and opioid-derived antimotility drugs; cholinergic/muscarinic stimulants and the diuretic indapamide play no part

## canonical_key
antidiarrhoeal-drugs.classification-and-exclusions

## aliases
Antidiarrhoeal drugs
Neostigmine and diarrhoea
Indapamide
Diphenoxylate

## arabic_label
الأدوية المضادة للإسهال

## arabic_aliases


## definition
Diarrhoea is treated with antimicrobial agents when infective, fluid and electrolyte replacement, adsorbents such as kaolin, and antimotility opioid-derivative drugs such as loperamide and diphenoxylate. Drugs that stimulate cholinergic or muscarinic activity, such as the cholinesterase inhibitor neostigmine or a direct muscarinic agonist, increase peristalsis and secretion and are never used to treat diarrhoea. Indapamide is a thiazide-like diuretic, unrelated to gastrointestinal motility, and is not an antidiarrhoeal agent.

## explicit_objective
List the genuine categories of antidiarrhoeal treatment and exclude cholinergic/muscarinic stimulants and indapamide from them.

## pitfalls
Assuming any drug that affects gut function is a candidate antidiarrhoeal; a cholinergic stimulant such as neostigmine would worsen diarrhoea by increasing motility and secretion, and indapamide is simply a diuretic with no GI motility action at all.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ANTIDIARRHOEAL-DRUGS-CLA-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-24C04F5BDAA140

## label
Loperamide, an antidiarrhoeal opioid derivative related to meperidine, is available without prescription and is the treatment of choice for travellers’ diarrhoea

## canonical_key
loperamide.opioid-derivative-otc-travellers-diarrhoea

## aliases
Loperamide
Traveller's diarrhoea treatment
OTC antidiarrhoeal

## arabic_label
اللوبيراميد

## arabic_aliases


## definition
Loperamide is an antidiarrhoeal agent, chemically related to the strong opioid analgesic meperidine (pethidine), that slows gut motility by acting on opioid receptors in the bowel wall. Because it penetrates the central nervous system poorly at normal doses, it produces little to no central opioid effect, which is why it can be sold over the counter, and it is the standard treatment of choice for travellers’ diarrhoea.

## explicit_objective
Classify loperamide as an antidiarrhoeal opioid derivative, explain its OTC status, and name it as the standard choice for travellers’ diarrhoea.

## pitfalls
Assuming loperamide, being opioid-related, needs the same prescription control and produces the same CNS effects as meperidine; its poor CNS penetration at normal doses is exactly what allows its OTC availability.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-LOPERAMIDE-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-69B6ACF6CACB30

## label
Colloidal bismuth is a mucosal protective agent for peptic ulcer that causes harmless black staining of the mouth and stool

## canonical_key
colloidal-bismuth.mucosal-protection-black-staining

## aliases
Colloidal bismuth
Bismuth subcitrate
Bismuth subsalicylate

## arabic_label
البزموت الغرواني

## arabic_aliases


## definition
Colloidal bismuth compounds are mucosal protective agents effective in peptic ulcer treatment, forming a protective coating over the ulcer base and also contributing to Helicobacter pylori eradication regimens. A well-known, harmless side effect is black discoloration of the tongue, mouth cavity and stool, from bismuth sulfide formation.

## explicit_objective
Identify colloidal bismuth as a mucosal protective anti-ulcer agent and name its characteristic black-staining side effect.

## pitfalls
Mistaking colloidal bismuth’s black staining of the mouth and stool for a sign of gastrointestinal bleeding; it is a harmless pigment effect of the bismuth itself.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-COLLOIDAL-BISMUTH-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-752166EB547A26

## label
Omeprazole, a proton pump inhibitor, irreversibly blocks the parietal cell H+/K+-ATPase, giving the most complete acid suppression for severe GERD and Zollinger-Ellison syndrome

## canonical_key
proton-pump-inhibitors.omeprazole-mechanism-and-indications

## aliases
Omeprazole
Proton pump inhibitor
PPI
H+/K+-ATPase inhibitor

## arabic_label
مثبطات مضخة البروتون

## arabic_aliases


## definition
Omeprazole is a proton pump inhibitor that irreversibly blocks the H+/K+-ATPase (the proton pump) of the gastric parietal cell, the final common step of acid secretion. This gives proton pump inhibitors the most complete and long-lasting gastric acid suppression of the available anti-secretory drug classes, making omeprazole the preferred choice both for full acid suppression in severe GERD and for the marked acid hypersecretion of Zollinger-Ellison syndrome, where H2-receptor blockers are usually insufficient.

## explicit_objective
State the H+/K+-ATPase mechanism of proton pump inhibitors and their preferred use for full acid suppression in severe GERD and Zollinger-Ellison syndrome.

## pitfalls
Assuming an H2-receptor blocker gives the same degree of acid suppression as a proton pump inhibitor; PPIs block the parietal cell’s final common secretory step and so suppress acid more completely than H2 blockade alone.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-PROTON-PUMP-INHIBITORS-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-EA3180FBD10BA7

## label
H2-receptor blockers act by blocking histamine H2 receptors on parietal cells; famotidine promotes duodenal ulcer healing and ranitidine is used for maintenance therapy to prevent relapse

## canonical_key
h2-receptor-blockers.mechanism-ulcer-healing-and-maintenance

## aliases
H2 receptor antagonist
Ranitidine
Famotidine
H2 blocker maintenance therapy

## arabic_label
حاصرات مستقبلات الهيستامين H2

## arabic_aliases


## definition
H2-receptor antagonists such as ranitidine and famotidine reduce gastric acid secretion by blocking histamine H2 receptors on gastric parietal cells, not H1 or M1 receptors, and not by direct acid neutralisation. Famotidine promotes healing of duodenal ulcer, and ranitidine is used in maintenance treatment to prevent ulcer relapse once an ulcer has healed.

## explicit_objective
State the H2-receptor mechanism of this drug class and its uses for duodenal ulcer healing and relapse-prevention maintenance therapy.

## pitfalls
Attributing H1-receptor blockade or direct acid neutralisation to an H2-receptor blocker such as ranitidine; its mechanism is specifically histamine H2-receptor blockade on the parietal cell.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-H2-RECEPTOR-BLOCKERS-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-30993F476C9C94

## label
H. pylori eradication uses triple therapy — a proton pump inhibitor plus clarithromycin and amoxicillin — not rifampicin

## canonical_key
h-pylori-eradication.triple-therapy-regimen

## aliases
H. pylori eradication
Triple therapy
Clarithromycin
Amoxicillin for H. pylori

## arabic_label
العلاج الثلاثي لاستئصال الملوية البوابية

## arabic_aliases


## definition
Helicobacter pylori eradication is achieved with combination regimens, classically a two-week course of triple therapy: a proton pump inhibitor (such as omeprazole) plus two antibiotics, most often clarithromycin and amoxicillin (metronidazole and tetracycline are alternative components in other regimens). Rifampicin, an antitubercular drug, plays no role in standard H. pylori eradication regimens.

## explicit_objective
Name the standard PPI + clarithromycin + amoxicillin triple therapy for H. pylori eradication and exclude rifampicin from it.

## pitfalls
Including rifampicin among the H. pylori eradication antibiotics because it is a familiar antibacterial; it is reserved for tuberculosis and other specific indications, not H. pylori regimens.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-H-PYLORI-ERADICATION-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-72B8C2320F4820

## label
Cimetidine is an H2- (not H1-) receptor antagonist that can cause mental confusion, hepatic dysfunction and gynaecomastia, and inhibits cytochrome P450 to raise levels of theophylline, warfarin, quinidine and phenytoin

## canonical_key
cimetidine.mechanism-adverse-effects-and-cyp450-interactions

## aliases
Cimetidine
H2 blocker adverse effects
Gynaecomastia
Cytochrome P450 inhibition

## arabic_label
السيميتيدين

## arabic_aliases


## definition
Cimetidine is a histamine H2-receptor antagonist, not an H1-receptor antagonist, useful in duodenal ulcer treatment. It can cause mental confusion (particularly in the elderly), hepatic dysfunction, and gynaecomastia through a weak anti-androgenic effect. Cimetidine is also a potent inhibitor of hepatic cytochrome P450 enzymes, raising serum concentrations, and the risk of toxicity, of drugs such as theophylline, warfarin, quinidine and phenytoin — an interaction far less prominent with the newer H2 blockers such as famotidine, ranitidine or nizatidine.

## explicit_objective
Correct cimetidine's receptor target to H2, list its mental confusion/hepatic dysfunction/gynaecomastia adverse effects, and explain its cytochrome P450 drug interactions.

## pitfalls
Calling cimetidine an H1-receptor antagonist because "anti-histamine" is a familiar label; its actual target, like the rest of its drug class, is the H2 receptor, and its most clinically important adverse effects are its CYP450 drug interactions, not classic antihistamine effects.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-CIMETIDINE-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-166FD596C40EF6

## label
Digoxin, misoprostol and metformin can cause diarrhoea as a side effect; codeine instead causes constipation

## canonical_key
drug-induced-diarrhoea.codeine-causes-constipation-not-diarrhoea

## aliases
Drug-induced diarrhoea
Codeine and constipation
Misoprostol diarrhoea side effect

## arabic_label
الإسهال الناجم عن الأدوية

## arabic_aliases


## definition
Several drugs can cause diarrhoea as a side effect, including digoxin, misoprostol (through its prostaglandin-driven increase in intestinal motility and secretion), and metformin. Codeine, an opioid, instead classically causes constipation through opioid receptor-mediated reduction of gut motility, the opposite effect from these diarrhoea-causing drugs.

## explicit_objective
List drugs that cause diarrhoea as a side effect and identify codeine as instead causing constipation.

## pitfalls
Grouping codeine with the diarrhoea-causing drugs because it is a commonly prescribed medication with GI side effects; its opioid mechanism causes constipation, the opposite direction of bowel disturbance.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-DRUG-INDUCED-DIARRHOEA-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-432E87ACC7433C

## label
Chlorpromazine, domperidone and ondansetron control vomiting; apomorphine is a dopamine agonist that instead induces vomiting

## canonical_key
antiemetics.apomorphine-is-an-emetic-not-antiemetic

## aliases
Antiemetic drugs
Apomorphine
Emetic drugs

## arabic_label
الأدوية المضادة للقيء والأبومورفين

## arabic_aliases


## definition
Drugs useful to control vomiting include chlorpromazine (a dopamine D2 antagonist), domperidone (a peripheral D2 antagonist) and ondansetron (a 5-HT3 antagonist). Apomorphine is a dopamine agonist that stimulates the chemoreceptor trigger zone and induces, rather than controls, vomiting; it was historically used as an emetic in the management of poisoning.

## explicit_objective
List genuine antiemetic drugs and identify apomorphine as an emetic, not an antiemetic.

## pitfalls
Assuming any drug acting on the dopaminergic chemoreceptor trigger zone must be an antiemetic; apomorphine is a dopamine agonist there and stimulates, rather than blocks, the vomiting pathway.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ANTIEMETICS-CLASSIFICATI-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-4A441C6FB51E0D

## label
Ondansetron and granisetron are 5-HT3 receptor antagonists used for chemotherapy-induced nausea and vomiting, often with a corticosteroid adjunct such as dexamethasone

## canonical_key
5ht3-receptor-antagonists.chemotherapy-induced-vomiting-and-adjuncts

## aliases
Ondansetron
Granisetron
5-HT3 antagonist
Chemotherapy-induced nausea and vomiting
Dexamethasone antiemetic adjunct

## arabic_label
مضادات مستقبلات السيروتونين 5-HT3

## arabic_aliases


## definition
Ondansetron and granisetron are 5-HT3 (serotonin) receptor antagonists, blocking serotonin receptors both centrally in the chemoreceptor trigger zone and peripherally on vagal afferents in the gut. Ondansetron’s primary indication is chemotherapy-induced nausea and vomiting, not motion sickness or pregnancy-related vomiting, and a corticosteroid such as dexamethasone is commonly added as an adjunct to enhance antiemetic control in chemotherapy regimens.

## explicit_objective
Name the 5-HT3 mechanism of ondansetron and granisetron, their chemotherapy-induced vomiting indication, and the corticosteroid adjunct role.

## pitfalls
Choosing ondansetron for motion sickness or pregnancy-related vomiting; its licensed strength and classic indication is chemotherapy-induced nausea and vomiting, a different clinical setting from the vestibular or hormonal triggers those other conditions involve.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-5HT3-RECEPTOR-ANTAGONIST-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-DDEABD470E0C94

## label
Direct (musculotropic) spasmolytics such as mebeverine, papaverine and aminophylline act directly on GI smooth muscle, unlike the anticholinergic antispasmodic atropine

## canonical_key
antispasmodics.direct-vs-anticholinergic-classification

## aliases
Direct spasmolytics
Musculotropic antispasmodic
Mebeverine
Anticholinergic antispasmodic

## arabic_label
مضادات التشنج المباشرة وغير المباشرة

## arabic_aliases


## definition
Antispasmodic drugs for gastrointestinal smooth muscle spasm fall into two classes: anticholinergic agents such as atropine sulfate, which block muscarinic receptors, and direct (musculotropic) spasmolytics such as mebeverine, papaverine and aminophylline, which relax smooth muscle directly, independent of any receptor blockade.

## explicit_objective
Classify a GI antispasmodic as anticholinergic or direct-acting, and exclude atropine from the direct-acting group.

## pitfalls
Listing atropine among the direct spasmolytics because it relieves spasm; its mechanism is anticholinergic receptor blockade, not the direct musculotropic action of mebeverine, papaverine or aminophylline.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-DIRECT-SPASMOLYTICS-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-99C9777DFDBCFB

## label
Chenodeoxycholic acid can dissolve cholesterol gallstones by reducing the cholesterol saturation of bile

## canonical_key
chenodeoxycholic-acid.cholesterol-gallstone-dissolution

## aliases
Chenodeoxycholic acid
Gallstone dissolution therapy
Bile acid therapy

## arabic_label
حمض كينوديوكسيكوليك

## arabic_aliases


## definition
Chenodeoxycholic acid (and the related ursodeoxycholic acid) is a bile acid used to medically dissolve cholesterol gallstones, by reducing the cholesterol saturation of bile rather than by any acid- or protein-based mechanism. It offers an alternative to surgery in selected patients with small, radiolucent cholesterol stones and a functioning gall bladder.

## explicit_objective
Name chenodeoxycholic acid as a bile acid used to dissolve cholesterol gallstones by lowering biliary cholesterol saturation.

## pitfalls
Assuming any acid can dissolve a gallstone through a direct chemical reaction; chenodeoxycholic acid instead works by altering the composition of bile itself, reducing its cholesterol saturation over weeks to months.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-CHENODEOXYCHOLIC-ACID-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-B2EC93D5878C6F

## label
Helicobacter pylori infection is the strongest risk factor for complications of peptic ulcer disease

## canonical_key
peptic-ulcer-disease.h-pylori-strongest-complication-risk-factor

## aliases
Peptic ulcer disease risk factors
H. pylori and ulcer complications

## arabic_label
الملوية البوابية وخطر مضاعفات القرحة الهضمية

## arabic_aliases


## definition
Among the risk factors for peptic ulcer disease, Helicobacter pylori infection is the strongest and most clinically significant predictor of complications such as bleeding and perforation, outweighing obesity, race or age alone.

## explicit_objective
Identify H. pylori infection as the risk factor most predictive of peptic ulcer disease complications.

## pitfalls
Weighing age, race or obesity as equal to H. pylori infection in predicting peptic ulcer complications; H. pylori’s direct mucosal injury and inflammatory effect make it the dominant risk factor.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-PEPTIC-ULCER-H-PYLORI-RI-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-6CAAD2E752A2A9

## label
Magnesium antacids cause diarrhoea and aluminium antacids cause constipation, so combination products pair them to balance bowel effects; systemic sodium bicarbonate risks acid rebound and bleeding, aluminium hydroxide binds dietary phosphate in renal failure, and antacids give the fastest but briefest relief of the anti-ulcer drug classes

## canonical_key
antacids.mg-al-balance-systemic-effects-and-phosphate-binding

## aliases
Antacids
Magnesium hydroxide
Aluminium hydroxide
Sodium bicarbonate antacid
Acid rebound

## arabic_label
مضادات الحموضة

## arabic_aliases


## definition
Magnesium-containing antacids such as magnesium trisilicate or magnesium hydroxide commonly cause diarrhoea, since magnesium hydroxide itself is used as an osmotic laxative, while aluminium-containing antacids such as aluminium hydroxide commonly cause constipation; combination products pair magnesium and aluminium salts so that their opposite bowel effects balance one another. Non-absorbable antacids act locally with minimal systemic effects, but sodium bicarbonate is a systemic, absorbable antacid whose rapid neutralisation can produce an acid-rebound effect that, with repeated use in active peptic ulcer disease, raises the risk of further bleeding. Aluminium hydroxide also binds dietary phosphate in the gut, making it useful to reduce phosphate absorption and blood phosphate in patients with renal failure on haemodialysis. As a class, antacids give the fastest, though briefest, symptomatic relief of any anti-ulcer drug class, compared with the slower but longer-acting H2 blockers and proton pump inhibitors.

## explicit_objective
Explain the opposite bowel effects of magnesium and aluminium antacids and why combination products pair them, and state the systemic risks of sodium bicarbonate, the phosphate-binding use of aluminium hydroxide, and the fast/brief onset of antacids as a class.

## pitfalls
Treating all antacids as pharmacologically interchangeable; magnesium and aluminium salts have opposite bowel effects, and only sodium bicarbonate among them is a systemic, absorbable antacid with acid-rebound and bleeding risk.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-ANTACIDS-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-8B0F492ED2EEEA

## label
Sucralfate, pirenzepine and bismuth salts are used in peptic ulcer treatment; corticosteroids are not, and are instead a recognised risk factor for ulcers

## canonical_key
peptic-ulcer-drugs.sucralfate-pirenzepine-bismuth-not-corticosteroids

## aliases
Sucralfate
Pirenzepine
Bismuth salts
Corticosteroids and peptic ulcer

## arabic_label
أدوية القرحة الهضمية الأخرى

## arabic_aliases


## definition
Sucralfate (a mucosal protectant), pirenzepine (a selective M1-anticholinergic that reduces acid secretion) and bismuth salts (mucosal protectants) are all used in peptic ulcer treatment. Corticosteroids such as prednisolone are not used to treat peptic ulcer; by suppressing prostaglandin synthesis and impairing mucosal defence, they are instead a recognised risk factor for causing ulcers, the opposite role from a treatment.

## explicit_objective
List sucralfate, pirenzepine and bismuth salts as peptic ulcer treatments and exclude corticosteroids, which instead predispose to ulcers.

## pitfalls
Assuming corticosteroids, being anti-inflammatory, would help heal a peptic ulcer; they instead impair mucosal defence by suppressing protective prostaglandin synthesis, making them a cause rather than a treatment.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-PEPTIC-ULCER-DRUGS-OTHER-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-454DCB5E7956C6

## label
Diarrhoea in children is best managed by correcting fluid and electrolyte disturbance, not by antimotility or adsorbent drugs

## canonical_key
paediatric-diarrhoea.fluid-electrolyte-correction-mainstay

## aliases
Paediatric diarrhoea
Oral rehydration therapy
Fluid and electrolyte correction

## arabic_label
علاج الإسهال عند الأطفال

## arabic_aliases


## definition
In children, diarrhoea is best managed by correcting fluid and electrolyte disturbance through oral rehydration therapy, rather than by antimotility drugs such as loperamide, anticholinergic agents, or adsorbents such as pectin and kaolin, since the primary life-threatening risk in paediatric diarrhoea is dehydration rather than the diarrhoea itself.

## explicit_objective
State that fluid and electrolyte correction, not an antimotility or adsorbent drug, is the mainstay of managing diarrhoea in children.

## pitfalls
Reaching for loperamide in a young child’s diarrhoea as in an adult; antimotility agents carry particular risks in young children and do not address the dehydration that is the real danger.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-PAEDIATRIC-DIARRHOEA-MAN-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-82E7F579636129

## label
Lactulose, in relatively high doses, is used to relieve hepatic (portosystemic) encephalopathy

## canonical_key
lactulose.hepatic-encephalopathy-treatment

## aliases
Lactulose
Hepatic encephalopathy treatment
Portosystemic encephalopathy

## arabic_label
اللاكتولوز واعتلال الدماغ الكبدي

## arabic_aliases


## definition
Lactulose is a non-absorbable synthetic disaccharide that, in relatively high doses, is used to relieve the signs and symptoms of hepatic (portosystemic) encephalopathy. Colonic bacteria ferment it to acidic by-products that trap ammonia as the non-absorbable ammonium ion and accelerate its faecal excretion, lowering the blood ammonia thought to drive the encephalopathy.

## explicit_objective
Name lactulose, at relatively high dose, as the treatment for hepatic encephalopathy and explain its ammonia-trapping mechanism.

## pitfalls
Thinking of lactulose only as a mild osmotic laxative for constipation; at the higher doses used in hepatic encephalopathy, its colonic acidification and ammonia-trapping effect is the therapeutically important action.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-LACTULOSE-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-22D8D8B869BFF0

## label
Sulfasalazine, combining sulfapyridine and 5-aminosalicylic acid, is used to treat inflammatory bowel disease

## canonical_key
sulfasalazine.inflammatory-bowel-disease-indication

## aliases
Sulfasalazine
5-aminosalicylic acid
Inflammatory bowel disease treatment

## arabic_label
السلفاسالازين

## arabic_aliases


## definition
Sulfasalazine is a combination of sulfapyridine and 5-aminosalicylic acid (5-ASA), used in the treatment of inflammatory bowel disease, chiefly ulcerative colitis, where the 5-ASA component provides local anti-inflammatory action within the colon.

## explicit_objective
Name sulfasalazine’s two components and its inflammatory bowel disease indication.

## pitfalls
Reaching for sulfasalazine as an antibiotic for an infective bowel process; its therapeutic role is anti-inflammatory, treating the immune-driven inflammation of inflammatory bowel disease, not an infection.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-SULFASALAZINE-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

---

# Item

## id
CON-GIT-9C4494CBE4FEC4

## label
Misoprostol, a synthetic prostaglandin E1 analogue, is used to prevent gastrointestinal ulcers during long-term NSAID therapy

## canonical_key
misoprostol.nsaid-ulcer-prophylaxis-prostaglandin-analogue

## aliases
Misoprostol
Prostaglandin E1 analogue
NSAID ulcer prophylaxis

## arabic_label
الميزوبروستول

## arabic_aliases


## definition
Misoprostol is a synthetic prostaglandin E1 analogue used prophylactically to prevent gastric and duodenal ulcers in patients on long-term NSAID therapy. It replaces the protective mucosal prostaglandins that NSAIDs deplete through cyclooxygenase inhibition, rather than serving as a routine GERD treatment, an H. pylori eradication agent, or a specific acute stress ulcer preventive.

## explicit_objective
Name misoprostol’s prostaglandin-replacement mechanism and its specific NSAID-ulcer prophylaxis indication.

## pitfalls
Prescribing misoprostol for routine GERD or for H. pylori eradication; its established, specific role is prophylaxis of GI ulcers in patients who need long-term NSAID therapy.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-PHA-T07

## secondary_node_ids


## topic
Gastrointestinal pharmacology

## subtopic
Drugs for GI motility, secretory and biliary disorders

## microtopic


## nanotopic


## modules
HU-GIT-301

## article_ids
ART-HU-GIT301-PHARM-GIT-DRUGS

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
0.7

## weight_confidence
0.3

## confidence
0.8

## atomic_claim_ids
CLM-GIT-MISOPROSTOL-01

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
primaryNodeId: DIS-PHA-T07 follows the GIT-system topic-node numbering used by this lane's pathology clusters (DIS-PAT-T07); no separate pharmacology node catalogue entry was found to verify against, so the number is carried across registers rather than invented fresh.
relationships: Same-chapter proximity only this pass; a live-sibling relationship discovery walk under DIS-PAT-T07 is deferred — see WANTED in the lane report.

