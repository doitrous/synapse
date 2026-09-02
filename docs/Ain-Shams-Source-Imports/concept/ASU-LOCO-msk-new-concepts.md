<!--
  New concept mints for ASU-LOCO (Locomotor System, ASU_Y1 Term 2). Every canonical
  key below was searched with find-existing.mjs before minting (see each record's
  field_notes.sourceCandidateIds) with no hit anywhere -- live state, docs/import-ready
  and every docs/*-Source-Imports concept batch. IDs minted with the manual's unsalted
  tool (Instruction Manual for Content Creation/tools/mint-concept-id.mjs).

  9 records: 1 physiology (McArdle's disease, subject msk) + 8 biochemistry
  (subject fnd -- matches the subject already carried by the sibling pending-live
  concepts these extend: collagen, vitamin D, purine, creatine biochemistry is
  foundational science, not msk-specific, per the Kasr precedent these sit beside).

  8 of the 9 records (McArdle aside) are drafted from the triage's organism/topic-
  level summary of the scanned "MCQs - Biochemistry Locomotor MCQs - CA1.pdf" paper
  (src_e4a23646b45bcc340c70) rather than a character-for-character re-read of the
  scanned pages this session -- flagged per-record in evidence_gaps and in the
  BLOCKED note of the lane report. No fact here was invented: content is standard
  biochemistry teaching matched to the triage's named sub-topics.

  article_ids now point at the 5 companion articles authored in
  docs/Ain-Shams-Source-Imports/article/ASU-LOCO-msk-new-articles.md (same commit
  set), closing the "main concept must have an article" gate before questions.
-->

# Item

## label
McArdle's disease is myophosphorylase deficiency, so exercising muscle cannot mobilise its own glycogen and the patient gets early cramp, stiffness and myoglobinuria

## id
CON-MSK-DB9C603AB04EF5

## canonical_key
muscle.mcardle-disease.phosphorylase-deficiency

## definition
McArdle's disease (glycogen storage disease type V) is a deficiency of myophosphorylase (muscle glycogen phosphorylase), the enzyme that cleaves glucose-1-phosphate units from stored glycogen at the start of glycogenolysis. Because exercising skeletal muscle cannot break down its own glycogen store, the patient develops early exercise intolerance, cramp and stiffness within the first few minutes of activity, and rhabdomyolysis with myoglobinuria if pushed further, though a brief rest that lets fatty acids and blood glucose take over (a "second wind") lets many patients continue at reduced intensity. Liver phosphorylase is a different gene product and is unaffected, so blood glucose homeostasis stays normal.

## explicit_objective
State the missing enzyme and substrate block in McArdle's disease, and predict the early exercise-intolerance and myoglobinuria presentation from that block.

## concept_type
clinical_correlation

## status
under review

## subject
msk

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-MSK

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.7

## confidence
0.85

## topic
Physiology

## subtopic
Exercise and environmental physiology

## microtopic
DIS-BIO-T03

## nanotopic

## aliases
Glycogen storage disease type V
Myophosphorylase deficiency
McArdle disease

## pitfalls
Confusing this with a defect further down glycolysis (e.g. phosphofructokinase deficiency, Tarui disease) or with a liver glycogenosis that causes fasting hypoglycaemia. McArdle's spares the liver enzyme and does not cause hypoglycaemia; it is a purely muscle glycogenolysis block that only shows itself on exercise.

## article_ids
ART-MSK-ASU-LOCO-MCARDLE-DISEASE

## support_mode
direct_statement

## original_wording
[Locomotor Physiology MCQ 54] McArdle's phosphorylase deficiency leads to: a) Pain and muscle stiffness during exercise b) Stiffness of muscles after death c) Prolonged contraction without relaxation d) Muscle atrophy and paralysis (printed key: A)

## conflicts


## uncertainty


## evidence_gaps
Supported only by the ASU Locomotor Physiology MCQ paper's single item (Q54, src_3be9856ba9380e79cb01) and standard physiology teaching; no department book chapter or independent clinical reference attached yet.

## arabic_label


## arabic_aliases


## related_concept_ids


## related_article_ids


## resource_ids
src_3be9856ba9380e79cb01

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.5

## field_notes
sourceCandidateIds: Searched find-existing.mjs for "mcardle" -- no existing record anywhere (live or pending); mint is a true new record.
arabicLabel: Not reviewed; left empty rather than guessed.
nanotopicId: No nanotopic exists below this microtopic level.
lastReviewed / reviewDue: Draft has not completed review.
relatedConceptIds: Cross-links to the pending-live muscle.fatigue.causes and muscle.metabolism.three-energy-systems-oxygen-debt overlays (docs/Ain-Shams-Source-Imports/pending-live/ASU-LOCO-msk-physiology.md) are owed once those two land; not added here to avoid pointing at ids before they exist in this file's own batch scope.
approvedFileResourceIds / approvedVideoResourceIds: No rights-cleared resource attached.
microtopicId: The book's/paper's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level for this material.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the source paper/standard teaching; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: No evidentiary claim authored yet in this pass; owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: No article authored for this concept in this batch; the companion article file in this same commit set backlinks to it, and this field will be filled on the next hand-over once the importer round-trips the article's own id back here.


---

# Item

## label
Lysyl oxidase, a copper-dependent enzyme, cross-links collagen fibrils extracellularly by oxidising lysine and hydroxylysine side chains

## id
CON-FND-D8F146476CB0EE

## canonical_key
collagen.crosslinking.lysyloxidase-copper-dependent

## definition
After hydroxylated and glycosylated procollagen is secreted, its N- and C-terminal propeptides are cleaved to give tropocollagen, which self-assembles into fibrils. Lysyl oxidase, a copper-dependent extracellular enzyme, then oxidatively deaminates specific lysine and hydroxylysine residues to aldehydes, which spontaneously condense with neighbouring residues to form covalent cross-links between adjacent tropocollagen molecules. These cross-links are what give mature collagen fibrils their tensile strength; without them collagen is weak and soluble.

## explicit_objective
Name the enzyme and the trace-element cofactor that cross-link collagen extracellularly, and state which two residues it acts on.

## concept_type
mechanism

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-DER

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.5

## academic_relevance
0.85

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Amino acids and proteins

## microtopic
DIS-BIO-T05

## nanotopic

## aliases
Lysyl oxidase
Collagen cross-linking
Copper-dependent collagen maturation

## pitfalls
Confusing lysyl oxidase's copper dependence with the vitamin-C dependence of the earlier intracellular hydroxylation step. Hydroxylation (proline/lysine hydroxylase, vitamin C) is intracellular and precedes secretion; cross-linking (lysyl oxidase, copper) is extracellular and follows it -- a copper (Menkes-type) defect and a scurvy (vitamin C) defect fail collagen at two different steps.

## article_ids
ART-FND-ASU-LOCO-COLLAGEN-MATURATION-DISORDERS

## support_mode
direct_statement

## original_wording
Biochemistry Locomotor MCQs -- Collagen section (canonical key collagen.lysyl-oxidase.copper-dependent-crosslinking per triage table); exact printed stem pending a page-level OCR/render pass of the scanned paper (src_e4a23646b45bcc340c70), not completed this session -- see BLOCKED note in the report.

## conflicts


## uncertainty


## evidence_gaps
Content drafted from standard biochemistry teaching and the triage's Collagen-section topic list; the scanned paper's exact question wording was not re-read character-for-character this session.

## arabic_label


## arabic_aliases


## related_concept_ids


## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.45

## field_notes
sourceCandidateIds: find-existing.mjs "lysyl oxidase" -- no hit anywhere; true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-96FF52D15F67AE (collagen hydroxylation, pending-live overlay in ASU-LOCO-msk-biochemistry.md) is the intracellular step that precedes this one; cross-link owed once both are live.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId: The book's/paper's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level for this material.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the source paper/standard teaching; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: No evidentiary claim authored yet in this pass; owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: No article authored for this concept in this batch; the companion article file in this same commit set backlinks to it, and this field will be filled on the next hand-over once the importer round-trips the article's own id back here.


---

# Item

## label
Ehlers-Danlos syndrome is a group of inherited defects of fibrillar collagen (commonly type I, III or V) causing skin hyperextensibility, joint hypermobility and fragile tissue

## id
CON-FND-987FEBCF7C3205

## canonical_key
ehlersdanlos.mechanism.fibrillar-collagen-defect

## definition
Ehlers-Danlos syndrome comprises inherited disorders of collagen synthesis or structure, most often affecting the fibrillar collagens (type I, III or V) through mutations in the collagen genes themselves or in the enzymes that process them (for example a deficient procollagen peptidase in the dermatosparaxis type, or a deficient lysyl hydroxylase in the kyphoscoliotic type). The shared clinical picture is hyperextensible, fragile skin that heals with thin "cigarette-paper" scars, hypermobile joints prone to dislocation, and fragile blood vessels; the vascular type (type IV, COL3A1) carries the highest risk of arterial and organ rupture.

## explicit_objective
State which collagen types are typically defective in Ehlers-Danlos syndrome and link the joint/skin/vessel triad to a failure of fibrillar collagen structure.

## concept_type
clinical_correlation

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-DER

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.5

## academic_relevance
0.85

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Amino acids and proteins

## microtopic
DIS-BIO-T05

## nanotopic

## aliases
Ehlers-Danlos syndrome
Hypermobility syndrome
Fibrillar collagen defect

## pitfalls
Naming a basement-membrane collagen (type IV) as the defect -- that is Alport syndrome/Goodpasture territory, not Ehlers-Danlos, which is a fibrillar (types I/III/V) collagen disease.

## article_ids
ART-FND-ASU-LOCO-COLLAGEN-MATURATION-DISORDERS

## support_mode
direct_statement

## original_wording
Biochemistry Locomotor MCQs -- Collagen section; exact stem pending OCR/render pass (see BLOCKED note).

## conflicts


## uncertainty


## evidence_gaps
Content drafted from standard biochemistry/genetics teaching and the triage's Collagen-section topic list; scanned paper not re-read character-for-character this session.

## arabic_label


## arabic_aliases


## related_concept_ids


## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.45

## field_notes
sourceCandidateIds: find-existing.mjs "Ehlers Danlos" -- no hit anywhere; true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-D8F146476CB0EE (lysyl oxidase cross-linking, this same batch) and CON-FND-96FF52D15F67AE (collagen hydroxylation, pending-live) are the two collagen-maturation steps this disease's enzyme-defect subtypes can disrupt; cross-link owed.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId: The book's/paper's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level for this material.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the source paper/standard teaching; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: No evidentiary claim authored yet in this pass; owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: No article authored for this concept in this batch; the companion article file in this same commit set backlinks to it, and this field will be filled on the next hand-over once the importer round-trips the article's own id back here.


---

# Item

## label
Vitamin D is activated by two sequential hydroxylations -- 25-hydroxylation in the liver, then 1-alpha-hydroxylation in the kidney -- to give the active hormone calcitriol

## id
CON-FND-49D9C172607D9A

## canonical_key
vitamind.activation.hydroxylation-steps

## definition
Vitamin D (cholecalciferol from skin synthesis or diet) is biologically inactive until it is hydroxylated twice. The liver adds a hydroxyl group at carbon 25 (25-hydroxylase) to give 25-hydroxyvitamin D, the main circulating storage form; the kidney then adds a second hydroxyl at carbon 1 (1-alpha-hydroxylase, in the proximal tubule) to give 1,25-dihydroxyvitamin D (calcitriol), the active hormone that raises intestinal calcium and phosphate absorption and, with parathyroid hormone, mobilises bone calcium. Renal 1-alpha-hydroxylase activity is itself stimulated by parathyroid hormone and by low serum phosphate.

## explicit_objective
Sequence the two hydroxylation steps that activate vitamin D, name the organ and enzyme responsible for each, and identify calcitriol as the active hormone.

## concept_type
mechanism

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T08

## secondary_node_ids
SYS-REN

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.5

## academic_relevance
0.85

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Nutrition

## microtopic
DIS-BIO-T08

## nanotopic

## aliases
Vitamin D activation
Calcitriol synthesis
1-alpha-hydroxylase

## pitfalls
Reversing the organ order (kidney first, then liver) or naming skin as the site of either hydroxylation -- skin only makes the inactive precursor from UV light; both activating hydroxylations are enzymatic and occur in liver then kidney.

## article_ids
ART-FND-ASU-LOCO-CALCIUM-VITAMIN-D

## support_mode
direct_statement

## original_wording
Biochemistry Locomotor MCQs -- Calcium & Vitamin D section; exact stem pending OCR/render pass (see BLOCKED note).

## conflicts


## uncertainty


## evidence_gaps
Content drafted from standard biochemistry/physiology teaching and the triage's Calcium & Vitamin D section topic list; scanned paper not re-read character-for-character this session.

## arabic_label


## arabic_aliases


## related_concept_ids


## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.45

## field_notes
sourceCandidateIds: find-existing.mjs "vitamin D hydroxylation" and "1 alpha hydroxylase" -- no hit anywhere; true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-D5FE7973164258 (calcium homeostasis, this same batch) is the downstream hormonal loop this activated vitamin D feeds into; cross-link owed.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId: The book's/paper's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level for this material.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the source paper/standard teaching; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: No evidentiary claim authored yet in this pass; owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: No article authored for this concept in this batch; the companion article file in this same commit set backlinks to it, and this field will be filled on the next hand-over once the importer round-trips the article's own id back here.


---

# Item

## label
Serum calcium is held constant by three hormones acting in a loop -- parathyroid hormone and calcitriol raise it, calcitonin lowers it

## id
CON-FND-D5FE7973164258

## canonical_key
calcium.homeostasis.regulatory-hormones

## definition
Falling serum calcium is sensed by the parathyroid glands' calcium-sensing receptor and triggers parathyroid hormone (PTH) release. PTH raises calcium by mobilising it from bone (osteoclast activation), increasing renal tubular calcium reabsorption, and stimulating the kidney's 1-alpha-hydroxylase to make more calcitriol, which in turn increases intestinal calcium and phosphate absorption. Calcitonin, from thyroid parafollicular (C) cells, is released when calcium rises and opposes PTH by inhibiting osteoclastic bone resorption, though its physiological role in humans is comparatively minor next to PTH and vitamin D.

## explicit_objective
Name the three calcium-regulating hormones, their glands of origin, and whether each raises or lowers serum calcium.

## concept_type
mechanism

## status
under review

## subject
fnd

## primary_node_id
DIS-PHY-T06

## secondary_node_ids
SYS-END

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.5

## academic_relevance
0.85

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Endocrine and reproductive

## microtopic
DIS-PHY-T06

## nanotopic

## aliases
Calcium homeostasis
Parathyroid hormone
Calcitonin

## pitfalls
Assuming calcitonin is the dominant regulator because it is taught alongside PTH -- in humans PTH and calcitriol do most of the physiological work; calcitonin's effect is real but minor and is not the hormone to reach for first when serum calcium falls.

## article_ids
ART-FND-ASU-LOCO-CALCIUM-VITAMIN-D

## support_mode
direct_statement

## original_wording
Biochemistry Locomotor MCQs -- Calcium & Vitamin D section; exact stem pending OCR/render pass (see BLOCKED note).

## conflicts


## uncertainty


## evidence_gaps
Content drafted from standard physiology/biochemistry teaching and the triage's Calcium & Vitamin D section topic list; scanned paper not re-read character-for-character this session.

## arabic_label


## arabic_aliases


## related_concept_ids


## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.45

## field_notes
sourceCandidateIds: find-existing.mjs "calcium homeostasis" -- no hit anywhere; true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-49D9C172607D9A (vitamin D activation, this same batch) supplies the calcitriol arm of this loop; cross-link owed.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId: The book's/paper's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level for this material.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the source paper/standard teaching; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: No evidentiary claim authored yet in this pass; owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: No article authored for this concept in this batch; the companion article file in this same commit set backlinks to it, and this field will be filled on the next hand-over once the importer round-trips the article's own id back here.


---

# Item

## label
HGPRT deficiency causes Lesch-Nyhan syndrome; adenosine deaminase deficiency causes a form of severe combined immunodeficiency

## id
CON-FND-108D52927380AB

## canonical_key
purine.enzymedeficiency.hgprt-pairing-lna-scid

## definition
Two purine-salvage/catabolism enzyme deficiencies are classically paired with their diseases. Hypoxanthine-guanine phosphoribosyltransferase (HGPRT) salvages hypoxanthine and guanine back to their nucleotides; its near-total deficiency forces purine synthesis down the wasteful de novo pathway, raising uric acid and producing the Lesch-Nyhan syndrome triad of hyperuricaemia/gout, choreoathetosis, and compulsive self-mutilation, inherited X-linked. Adenosine deaminase (ADA) deficiency, unrelated to HGPRT, lets deoxyadenosine accumulate to toxic levels selectively in lymphocytes, destroying developing T and B cells and producing one of the autosomal recessive forms of severe combined immunodeficiency (SCID).

## explicit_objective
Pair HGPRT deficiency with Lesch-Nyhan syndrome and ADA deficiency with SCID, and state the enzyme each is missing.

## concept_type
mechanism

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-IMM

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.5

## academic_relevance
0.85

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Biomolecules

## microtopic
DIS-BIO-T01

## nanotopic

## aliases
Lesch-Nyhan syndrome
HGPRT deficiency
Adenosine deaminase deficiency
SCID

## pitfalls
Swapping the two pairings (HGPRT with SCID, or ADA with Lesch-Nyhan) or assuming both deficiencies raise uric acid -- only the HGPRT block raises uric acid; ADA deficiency's toxicity is lymphocyte-selective and is an immunodeficiency, not a gout syndrome.

## article_ids
ART-FND-ASU-LOCO-PURINE-ENZYME-DEFICIENCIES

## support_mode
direct_statement

## original_wording
Biochemistry Locomotor MCQs -- Purine Catabolism section (per triage, canonical key purine-salvage.enzyme-reaction-pairing-hgprt-pnp-adenosine-deaminase / purine-enzyme-deficiency.disease-pairing-lesch-nyhan-scid); exact stem pending OCR/render pass (see BLOCKED note).

## conflicts


## uncertainty


## evidence_gaps
Content drafted from standard biochemistry teaching and the triage's Purine Catabolism section topic list; scanned paper not re-read character-for-character this session.

## arabic_label


## arabic_aliases


## related_concept_ids


## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.45

## field_notes
sourceCandidateIds: find-existing.mjs "Lesch Nyhan" and "HGPRT" -- no hit anywhere; "purine salvage" hit a different, general pending concept (CON-FND-DB8B4EFEB287DA, already sparse-updated in ASU-LOCO-msk-biochemistry.md) that does not name the HGPRT/ADA enzyme-disease pairing -- this is a distinct, narrower fact and a true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-DB8B4EFEB287DA (general purine salvage, pending-live) and CON-FND-92DD65D96E3FA1 (purine catabolism to uric acid, pending-live) are the broader pathway this enzyme-pairing fact sits inside; cross-link owed once both land.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId: The book's/paper's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level for this material.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the source paper/standard teaching; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: No evidentiary claim authored yet in this pass; owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: No article authored for this concept in this batch; the companion article file in this same commit set backlinks to it, and this field will be filled on the next hand-over once the importer round-trips the article's own id back here.


---

# Item

## label
Creatine is synthesised in two steps from arginine and glycine -- AGAT in the kidney makes guanidinoacetate, GAMT in the liver methylates it to creatine

## id
CON-FND-7B9C2FBCBD3E5D

## canonical_key
creatine.synthesis.pathway-agat-gamt

## definition
Creatine synthesis begins in the kidney, where arginine:glycine amidinotransferase (AGAT) transfers the amidino group of arginine to glycine, releasing ornithine and forming guanidinoacetate (GAA). GAA travels in the blood to the liver, where guanidinoacetate methyltransferase (GAMT) methylates it using S-adenosylmethionine (SAM) as the methyl donor, producing creatine (and S-adenosylhomocysteine). Creatine is then taken up by muscle and brain via a specific creatine transporter and phosphorylated by creatine kinase to creatine phosphate, the rapid-buffer store for regenerating ATP. Creatine kinase itself exists as tissue-specific isoenzymes built from two subunits (M and B): CK-MM (CK3) predominates in skeletal muscle, CK-MB (CK2) is relatively specific to cardiac muscle, and CK-BB (CK1) predominates in brain. A rise in plasma CK-MB is a classic (if now largely superseded by troponin) marker of myocardial infarction, because cardiac injury releases the cardiac-specific isoenzyme into the circulation.

## explicit_objective
Sequence creatine synthesis from arginine and glycine through AGAT and GAMT, naming the organ of each step and the methyl donor, and name CK-MB as the creatine kinase isoenzyme that is relatively specific to cardiac muscle and rises in plasma after myocardial infarction.

## concept_type
mechanism

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-MSK

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.5

## academic_relevance
0.85

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Amino acids and proteins

## microtopic
DIS-BIO-T05

## nanotopic

## aliases
Creatine synthesis
AGAT
GAMT
Guanidinoacetate

## pitfalls
Reversing the organs (liver-then-kidney) or naming SAM as the amidino donor instead of the methyl donor -- arginine donates the amidino group at the kidney step; SAM donates only the methyl group at the liver step.

## article_ids
ART-FND-ASU-LOCO-CREATINE-BIOCHEMISTRY

## support_mode
direct_statement

## original_wording
Biochemistry Locomotor MCQs -- Muscle Energy/Creatine section; exact stem pending OCR/render pass (see BLOCKED note).

## conflicts


## uncertainty


## evidence_gaps
Content drafted from standard biochemistry teaching and the triage's Muscle Energy/Creatine section topic list; scanned paper not re-read character-for-character this session.

## arabic_label


## arabic_aliases


## related_concept_ids


## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.45

## field_notes
sourceCandidateIds: find-existing.mjs "guanidinoacetate" -- no hit anywhere; "creatine phosphate" hit a different, narrower pending concept (CON-FND-6B7241CD9F3C42, energy-buffering role, already sparse-updated) that does not cover the synthesis pathway itself -- true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-6B7241CD9F3C42 (creatine phosphate energy-buffering role, pending-live), CON-FND-280B4FBAE66E3C and CON-FND-2A0A9B8A28A214 (this same batch) are the downstream fate and the deficiency disorder of this pathway; cross-link owed.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId: The book's/paper's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level for this material.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the source paper/standard teaching; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: No evidentiary claim authored yet in this pass; owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: No article authored for this concept in this batch; the companion article file in this same commit set backlinks to it, and this field will be filled on the next hand-over once the importer round-trips the article's own id back here.


---

# Item

## label
Creatinine forms by the non-enzymatic, spontaneous loss of water from muscle creatine/creatine phosphate at a rate proportional to muscle mass, which is why it is used to estimate renal function

## id
CON-FND-280B4FBAE66E3C

## canonical_key
creatinine.clinicalmarker.formation-and-use

## definition
Creatinine is produced non-enzymatically, at a roughly constant daily rate proportional to an individual's muscle mass, by the spontaneous cyclisation and dehydration of creatine and creatine phosphate in muscle. It is released into the blood and cleared almost entirely by glomerular filtration with negligible tubular reabsorption (a little tubular secretion causes a small overestimate of true GFR), which is why serum creatinine and creatinine clearance are used clinically as an index of glomerular filtration rate -- a rising creatinine signals falling renal function, though because production depends on muscle mass, low-muscle-mass patients can have a "normal" creatinine despite reduced GFR.

## explicit_objective
Explain why creatinine formation is proportional to muscle mass and how that makes it a practical, if imperfect, marker of glomerular filtration rate.

## concept_type
mechanism

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-REN

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.5

## academic_relevance
0.85

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Clinical biochemistry

## microtopic
DIS-BIO-T07

## nanotopic

## aliases
Creatinine
Creatinine clearance
GFR marker

## pitfalls
Treating creatinine formation as enzyme-catalysed or hormonally regulated -- it is a spontaneous, non-enzymatic breakdown product, which is exactly why its production rate tracks muscle mass rather than any hormonal control.

## article_ids
ART-FND-ASU-LOCO-CREATINE-BIOCHEMISTRY

## support_mode
direct_statement

## original_wording
Biochemistry Locomotor MCQs -- Muscle Energy/Creatine section; exact stem pending OCR/render pass (see BLOCKED note).

## conflicts


## uncertainty


## evidence_gaps
Content drafted from standard biochemistry/clinical-chemistry teaching and the triage's Muscle Energy/Creatine section topic list; scanned paper not re-read character-for-character this session.

## arabic_label


## arabic_aliases


## related_concept_ids


## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.45

## field_notes
sourceCandidateIds: find-existing.mjs "creatinine clinical marker" -- no hit anywhere; true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-7B9C2FBCBD3E5D (creatine synthesis pathway, this same batch) is the upstream source of creatinine; cross-link owed.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId: The book's/paper's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level for this material.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the source paper/standard teaching; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: No evidentiary claim authored yet in this pass; owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: No article authored for this concept in this batch; the companion article file in this same commit set backlinks to it, and this field will be filled on the next hand-over once the importer round-trips the article's own id back here.


---

# Item

## label
AGAT deficiency blocks creatine synthesis at its first step, producing developmental delay with low muscle and urine creatinine that improves with creatine supplementation

## id
CON-FND-2A0A9B8A28A214

## canonical_key
agat.deficiency.presentation

## definition
Arginine:glycine amidinotransferase (AGAT) deficiency is a rare autosomal recessive cerebral creatine deficiency syndrome that blocks creatine synthesis at its first, kidney step, so guanidinoacetate and downstream creatine are never made. Because creatinine derives from creatine, both muscle creatine and urinary creatinine are low. Patients present with global developmental delay, speech delay, hypotonia and sometimes seizures, reflecting the brain's dependence on locally available creatine for its own phosphagen energy buffering; unlike GAMT deficiency, guanidinoacetate (which is itself neurotoxic) is not elevated, because the block sits upstream of its formation. Oral creatine monohydrate supplementation bypasses the block and improves the clinical picture, which is itself diagnostic.

## explicit_objective
Recognise AGAT deficiency from developmental delay with low creatine/creatinine and normal (not elevated) guanidinoacetate, and explain why creatine supplementation helps.

## concept_type
clinical_correlation

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-DEV

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.5

## academic_relevance
0.85

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Amino acids and proteins

## microtopic
DIS-BIO-T05

## nanotopic

## aliases
AGAT deficiency
Cerebral creatine deficiency syndrome
Guanidinoacetate normal

## pitfalls
Confusing AGAT deficiency with GAMT deficiency -- GAMT deficiency blocks the second (liver) step, so guanidinoacetate accumulates and is itself neurotoxic (contributing to seizures), whereas AGAT deficiency sits upstream of guanidinoacetate formation, so guanidinoacetate stays low/normal rather than elevated.

## article_ids
ART-FND-ASU-LOCO-CREATINE-BIOCHEMISTRY

## support_mode
direct_statement

## original_wording
[Biochemistry Locomotor MCQs, "Important MCQs" clinical vignette] Presentation of developmental delay with low serum/urine creatinine, consistent with a creatine-synthesis disorder (AGAT/creatine synthesis defect case per triage); exact stem pending OCR/render pass (see BLOCKED note).

## conflicts


## uncertainty


## evidence_gaps
Content drafted from standard biochemistry/metabolic-disease teaching and the triage's vignette summary; the scanned paper's exact vignette wording was not re-read character-for-character this session.

## arabic_label


## arabic_aliases


## related_concept_ids


## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.45

## field_notes
sourceCandidateIds: find-existing.mjs "AGAT" -- no relevant hit (only unrelated nerve-conduction question titles); true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-7B9C2FBCBD3E5D (creatine synthesis pathway, this same batch) is the pathway this disorder blocks; cross-link owed.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId: The book's/paper's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level for this material.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the source paper/standard teaching; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: No evidentiary claim authored yet in this pass; owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: No article authored for this concept in this batch; the companion article file in this same commit set backlinks to it, and this field will be filled on the next hand-over once the importer round-trips the article's own id back here.


---

<!--
  BEGIN author6 additions -- 10 new mints backed by a verbatim page-by-page read of
  "MCQs - Biochemistry Locomotor MCQs - CA1.pdf" (src_e4a23646b45bcc340c70), OCR'd
  and cross-checked against the rendered page image for every question cited.
  Every canonical_key below was searched with find-existing.mjs first (per-record
  field_notes.sourceCandidateIds); IDs minted with mint-concept-id.mjs. All 10 are
  backed by an article: 7 extend the existing 4 biochem articles in
  ASU-LOCO-msk-new-articles.md (same commit set), 3 collagen-structure records
  share the collagen article, none needed a brand-new article file.
-->

# Item

## label
Collagen's triple helix is a repeating Gly-X-Y sequence of about 1000 residues per chain, and its tissue-specific fibril packing (parallel bundles, gel, or crystalline array) matches the mechanical job the tissue needs

## id
CON-FND-8A9685D59E3274

## canonical_key
collagen.primary-structure.gly-x-y-repeat-and-helix

## definition
Each collagen alpha-chain is roughly 1000 amino acids long and, unlike a globular protein, is built from an unusually repetitive primary sequence: glycine occupies every third position, giving the repeating motif Gly-X-Y (X is frequently proline, Y frequently hydroxyproline). Glycine's small side chain (a single hydrogen) is essential because it is the only residue small enough to sit at the cramped centre of the three supercoiled chains; a bulky amino acid substituted for glycine there disrupts the triple helix. Proline and hydroxyproline in the X/Y positions restrict rotation and stabilise the helix, but proline's ring structure means collagen cannot form a classical alpha helix (which needs a free backbone NH for its own intrachain hydrogen bonding, one every 3.6 residues) -- collagen's triple helix is a distinct, further-wound structure held together mostly by interchain hydrogen bonds and, once mature, by lysyl-oxidase cross-links. Once assembled, mature collagen fibrils are packed differently in different tissues to match their mechanical role: parallel bundles of fibres in tendon and cornea/teeth (for tensile strength along one axis), a loose gel arrangement in the vitreous humor (for transparency and shock absorption without rigid structure), and near-crystalline packing in the cornea's stroma (for optical transparency via regular fibril spacing).

## explicit_objective
State the Gly-X-Y repeat rule and why glycine's small size is structurally required, explain why collagen cannot form a classical alpha helix, and match collagen's tissue-specific fibril packing (parallel/gel/crystalline) to the tissue's mechanical need.

## concept_type
mechanism

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-DER

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.4

## academic_relevance
0.85

## confidence
0.85

## topic
Biochemistry & Molecular Medicine

## subtopic
Amino acids and proteins

## microtopic
DIS-BIO-T05

## nanotopic


## aliases
Gly-X-Y repeat
Collagen primary structure
Collagen tissue architecture

## pitfalls
Calling collagen's triple helix an "alpha helix" -- proline's ring structure and the requirement for interchain (not intrachain) hydrogen bonding make it a structurally distinct, further-wound helix; a true alpha helix turn contains ~3.6 residues stabilised by intrachain hydrogen bonds, which is a different protein (not collagen) fact often confused with it on the same exam.

## article_ids
ART-FND-ASU-LOCO-COLLAGEN-MATURATION-DISORDERS

## support_mode
direct_statement

## original_wording
[Biochemistry Locomotor MCQs, Collagen section, verbatim page-2/3 read] Q4 "Which of the following is not true about collagen: a) The chain contain approximate 1000 amino acids b) Glycine is repeated every third position c) It has a repeated sequence Gly-X-Y d) Proline disrupt collagen helix as alpha helix" (printed key: d -- collagen is not an alpha helix, so this option is the false statement). Q9/Q10 "The structure of collagen in teeth is / in vitreous humor is: a) Parallel Fibers b) Gel c) Crystalline d) Angles" (printed key: Q9=d, Q10=b). Q23 "Which of the following is the most common amino acid in collagen structure?" (printed key: c, glycine). Q24 "Which of the following statement is true? a) Proline disrupts collagen helix b) In alpha helix, each turn contain three amino acids c) Intrachain hydrogen bond stabilize collagen helix d) Glycine is present in every third position in collagen helix" (printed key: d).

## conflicts


## uncertainty
Q9's printed key (d, "Angles") for "structure of collagen in teeth" does not match any standard textbook description of dentine/tooth collagen architecture (parallel fibre bundles is the standard teaching, which is option a) -- flagged as a probable printed-key error on the source paper rather than a real teaching point; the question is authored testing the well-established parallel-fibre-in-tendon/teeth vs gel-in-vitreous-humor distinction with option (a) as correct for the teeth stem, diverging from this paper's own key, and the divergence is noted per-item in the question's author_notes.

## evidence_gaps
Verbatim page read completed this session (pages 2-4 of src_e4a23646b45bcc340c70, 300-400dpi OCR cross-checked against the rendered image); no independent department textbook citation attached yet.

## arabic_label


## arabic_aliases


## related_concept_ids
CON-FND-D8F146476CB0EE

## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.5

## field_notes
sourceCandidateIds: find-existing.mjs "collagen structure" and "Gly-X-Y" -- no hit on the primary-structure/tissue-architecture fact specifically (only the already-used "collagen synthesis" 4-record hit, which covers a different sub-fact); true new mint.
arabicLabel: Not reviewed; left empty rather than guessed.
relatedConceptIds: CON-FND-D8F146476CB0EE (lysyl oxidase cross-linking, same file) is the next maturation step after this primary-structure fact.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId / nanotopicId: As per the sibling records above -- no finer canonical node exists for this material.
approvedFileResourceIds / approvedVideoResourceIds: No rights-cleared resource attached.
resourceOccurrenceIds: Hand-authored from a direct page read this session; no corpus extraction record.
atomicClaimIds: Owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: Backed by the existing ART-FND-ASU-LOCO-COLLAGEN-MATURATION-DISORDERS article (extended this session to teach this fact); related_article_ids left blank per the sibling records' convention.


---

# Item

## label
Collagen synthesis runs intracellular signal-peptide cleavage, hydroxylation, glycosylation, then secretion, before extracellular propeptide cleavage and lysyl-oxidase cross-linking assemble the mature fibril

## id
CON-FND-C664CAF0B0AFF3

## canonical_key
collagen.synthesis-pathway.step-sequence

## definition
Collagen synthesis and maturation proceeds in a fixed intracellular-then-extracellular order. Inside the rough endoplasmic reticulum: the signal sequence of preprocollagen is cleaved to give the procollagen alpha-chain; proline and lysine residues are hydroxylated (vitamin-C-dependent hydroxylases); some hydroxylysine residues are glycosylated with glucose/galactose; and interchain disulfide bonds form at the C-terminal propeptides, aligning the three chains before they zip into a triple helix (procollagen). Procollagen is then secreted from the cell. Only after secretion do the N- and C-terminal propeptides get cleaved extracellularly (by procollagen peptidases) to yield tropocollagen, which self-assembles into fibrils; lysyl oxidase then cross-links adjacent tropocollagen molecules to give mature, tensile-strength collagen fibrils. Put another way, the overall molecule progresses preprochain (with signal peptide) -> prochain -> procollagen (triple helix, propeptides still attached) -> tropocollagen (propeptides cleaved) -> collagen fibril (cross-linked). Within the intracellular phase, oxidation/hydroxylation of lysyl residues to allysine by lysyl oxidase does NOT occur intracellularly -- lysyl oxidase is an extracellular enzyme, so this is the one "procollagen biosynthesis" event that is the exception to "occurs within cells". Two amino acids are essentially unique to collagen and appear only after these steps: hydroxyproline and hydroxylysine are hydroxylated forms created intracellularly, while cysteine is essentially absent from mature triple-helical collagen (it exists only in the terminal propeptides, which are removed extracellularly).

## explicit_objective
Sequence collagen synthesis from preprochain through to the cross-linked fibril, correctly separate which maturation events are intracellular (signal cleavage, hydroxylation, glycosylation, disulfide-bond chain alignment) from which are extracellular (propeptide cleavage, fibril assembly, lysyl-oxidase cross-linking), and state which amino acid is essentially absent from mature collagen.

## concept_type
mechanism

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-DER

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.4

## academic_relevance
0.85

## confidence
0.85

## topic
Biochemistry & Molecular Medicine

## subtopic
Amino acids and proteins

## microtopic
DIS-BIO-T05

## nanotopic


## aliases
Collagen synthesis sequence
Procollagen processing
Tropocollagen assembly

## pitfalls
Placing lysyl oxidase's cross-linking (and the oxidative deamination of lysine to allysine it performs) inside the cell -- it is an extracellular enzyme, unlike the intracellular prolyl/lysyl hydroxylases that act earlier in the same pathway; confusing "hydroxylation of lysine" (intracellular, produces hydroxylysine) with "oxidation of lysyl residues to allysine" (extracellular, lysyl oxidase) is the recurring trap.

## article_ids
ART-FND-ASU-LOCO-COLLAGEN-MATURATION-DISORDERS

## support_mode
direct_statement

## original_wording
[Biochemistry Locomotor MCQs, Collagen section, verbatim page-2/3/5 read] Q5 "steps of collagen synthesis: 1-Glycosylation of some hydroxylysine 2-Hydroxylation of proline and lysine 3-Cleavage of signal sequence of preprocollagen in RER 4-Extracellular cleavage of procollagen molecules 5-Assembly and secretion of procollagen to extracellular spaces" (printed key: d, 3-2-1-5-4). Q30 "1-Collagen fibril 2-Prochain 3-preprochain 4-procollagen 5-tropocollagen" (printed key: a, 3-2-4-5-1). Q6 "Which of the following is hydroxylated during collagen maturation" (printed key: c, lysine). Q7 "Which event occurs inside the cell during collagen maturation" among options including disulfide bond formation at terminal pro sequences (printed key: e). Q13 "All the following play role in collagen stability EXCEPT" (printed key: b). Q20 "Glycation of collagen occurs in" (printed key: d, hydroxylysine). Q21 "Which amino acid is absent in mature collagen" (printed key: c, cysteine). Q28 "All the following events in procollagen biosynthesis occurs within cells EXCEPT" among options a) Chain alignment b) O-linked glycosylation c) Oxidation of lysyl residues d) Hydroxylation of lysyl residues e) Formation of disulfide bonds (printed key: c -- oxidation of lysyl residues, i.e. lysyl oxidase, is the extracellular exception).

## conflicts


## uncertainty


## evidence_gaps
Verbatim page read completed this session (pages 2-5 of src_e4a23646b45bcc340c70); no independent department textbook citation attached yet.

## arabic_label


## arabic_aliases


## related_concept_ids
CON-FND-D8F146476CB0EE
CON-FND-8A9685D59E3274

## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.5

## field_notes
sourceCandidateIds: find-existing.mjs "collagen synthesis" hit 4 existing pending records (per triage) but none names the full intracellular-vs-extracellular step sequence or the preprochain-to-fibril progression; true new mint for this specific ordering fact.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-D8F146476CB0EE (lysyl oxidase, same file) is the extracellular cross-linking step this sequence ends on; CON-FND-8A9685D59E3274 (primary structure, same file) is the molecule this pathway builds.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId / nanotopicId: As per the sibling records above.
approvedFileResourceIds / approvedVideoResourceIds: No rights-cleared resource attached.
resourceOccurrenceIds: Hand-authored from a direct page read this session; no corpus extraction record.
atomicClaimIds: Owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: Backed by the existing ART-FND-ASU-LOCO-COLLAGEN-MATURATION-DISORDERS article (extended this session).


---

# Item

## label
Osteogenesis imperfecta is usually a missense point mutation that substitutes a bulky amino acid for glycine in type I collagen's Gly-X-Y repeat, weakening the triple helix

## id
CON-FND-D74FE513D2971F

## canonical_key
osteogenesisimperfecta.mutation-type.glycine-substitution

## definition
Osteogenesis imperfecta ("brittle bone disease") most commonly results from a dominant-negative missense point mutation in one of the type I collagen genes (COL1A1/COL1A2) that replaces one of the obligatory glycine residues in the Gly-X-Y repeat with a bulkier amino acid. Because glycine's small side chain is the only one that fits at the crowded centre of the triple helix, this single substitution distorts helix folding at and downstream of the mutation site, and because type I collagen is a heterotrimer assembled from chains contributed by both alleles, even one abnormal chain can poison an entire triple helix (a dominant-negative effect), producing bones that are fragile and fracture easily, alongside variable blue sclerae, hearing loss and dental defects depending on severity/type.

## explicit_objective
State that osteogenesis imperfecta is typically a missense point mutation substituting glycine in type I collagen's Gly-X-Y repeat, and explain why this single substitution is enough to weaken the whole triple helix.

## concept_type
clinical_correlation

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-MSK

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.8

## confidence
0.85

## topic
Biochemistry & Molecular Medicine

## subtopic
Amino acids and proteins

## microtopic
DIS-BIO-T05

## nanotopic


## aliases
Osteogenesis imperfecta
Brittle bone disease
Type I collagen mutation

## pitfalls
Choosing a frameshift or nonsense mutation as the typical cause -- those would truncate the chain rather than produce the single-residue distortion that is characteristic here; the classic, testable mechanism is a missense substitution at a Gly-X-Y glycine, not a mutation type that destroys the reading frame.

## article_ids
ART-FND-ASU-LOCO-COLLAGEN-MATURATION-DISORDERS

## support_mode
direct_statement

## original_wording
[Biochemistry Locomotor MCQs, Collagen section, verbatim page-3 read] Q15 "Osteogenesis imperfecta is due to: a) Missense point mutation b) Silent mutation c) Non-sense mutation d) Frame shift mutation" (printed key: a).

## conflicts


## uncertainty


## evidence_gaps
Verbatim page read completed this session (page 3 of src_e4a23646b45bcc340c70); no independent department textbook citation attached yet.

## arabic_label


## arabic_aliases


## related_concept_ids
CON-FND-8A9685D59E3274

## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.5

## field_notes
sourceCandidateIds: find-existing.mjs "osteogenesis imperfecta" -- no hit anywhere; true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-8A9685D59E3274 (Gly-X-Y primary structure, same file) is the structural rule this disease breaks.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId / nanotopicId: As per the sibling records above.
approvedFileResourceIds / approvedVideoResourceIds: No rights-cleared resource attached.
resourceOccurrenceIds: Hand-authored from a direct page read this session; no corpus extraction record.
atomicClaimIds: Owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: Backed by the existing ART-FND-ASU-LOCO-COLLAGEN-MATURATION-DISORDERS article (extended this session).


---

# Item

## label
Chronic renal failure needs calcitriol itself (the kidney's own activating step is lost), while vitamin-D-resistant rickets from a 1-alpha-hydroxylase defect responds to 1-hydroxy D3

## id
CON-FND-E8F73BC47BCDAE

## canonical_key
vitamind.dosing.renal-failure-vs-resistant-rickets

## definition
Two clinical scenarios test which vitamin D preparation to give when the kidney's own 1-alpha-hydroxylase step cannot be relied on. In chronic renal failure, the diseased kidney cannot perform the second (1-alpha) hydroxylation, so giving plain vitamin D or even 25-hydroxyvitamin D is insufficient -- the patient needs the already-active hormone, calcitriol (1,25-dihydroxyvitamin D), or a close synthetic analogue such as 1-alpha-hydroxycholecalciferol that the liver alone can finish activating. Vitamin-D-dependent rickets type I (often loosely called "vitamin D resistant rickets" in this context) is a genetic deficiency of the renal 1-alpha-hydroxylase enzyme itself; because the block is at the same step, treatment again bypasses it with 1-hydroxy vitamin D3 (calcitriol or its equivalent), not with plain vitamin D3 or 25-hydroxy D3, both of which still require the missing enzyme to become active.

## explicit_objective
State that both chronic renal failure and 1-alpha-hydroxylase-deficient vitamin-D-resistant rickets are treated by bypassing the kidney's activation step with calcitriol or 1-hydroxy vitamin D3, not with plain or 25-hydroxy vitamin D3.

## concept_type
clinical_correlation

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T08

## secondary_node_ids
SYS-REN

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.75

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Nutrition

## microtopic
DIS-BIO-T08

## nanotopic


## aliases
Vitamin D resistant rickets
Renal osteodystrophy dosing
1-alpha-hydroxycholecalciferol

## pitfalls
Prescribing plain vitamin D3 or 25-hydroxy D3 for either scenario -- both still require a functioning renal 1-alpha-hydroxylase, which is exactly the step that is missing in chronic renal failure and in this form of vitamin-D-resistant rickets; only a preparation that is already 1-alpha-hydroxylated (or fully active, i.e. calcitriol) bypasses the block.

## article_ids
ART-FND-ASU-LOCO-CALCIUM-VITAMIN-D

## support_mode
direct_statement

## original_wording
[Biochemistry Locomotor MCQs, Calcium & Vitamin D section, verbatim page-6 read] Q1 "Which one of the following statements concerning vitamin D is correct? a) Chronic renal failure requires the oral administration of 1-alpha hydroxycholecalciferol b) It is required in the diet of individuals exposed to sunlight c) 25-Hydroxycholecalciferol is the active form of the vitamin d) Vitamin D opposes the effect of parathyroid hormone e) A deficiency in vitamin D results in an increased secretion of calcitonin" (printed key: a). Q2 "Which of the following Vitamin D preparation is recommended for a patient with Vit D resistant rickets? a) Vitamin D3 b) 24,25 Vitamin D3 c) 1 Hydroxy D3 d) 25 Hydroxy D3 e) 1,24,25 tri hydroxy D3" (printed key: c).

## conflicts


## uncertainty


## evidence_gaps
Verbatim page read completed this session (page 6 of src_e4a23646b45bcc340c70); no independent department textbook citation attached yet.

## arabic_label


## arabic_aliases


## related_concept_ids
CON-FND-49D9C172607D9A

## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.5

## field_notes
sourceCandidateIds: find-existing.mjs "vitamin D resistant rickets" and "1 alpha hydroxycholecalciferol" -- no hit anywhere; true new mint (narrower clinical-dosing fact than the existing activation-pathway concept).
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-49D9C172607D9A (vitamin D activation pathway, existing) is the mechanism this dosing fact applies clinically.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId / nanotopicId: As per the sibling records above.
approvedFileResourceIds / approvedVideoResourceIds: No rights-cleared resource attached.
resourceOccurrenceIds: Hand-authored from a direct page read this session; no corpus extraction record.
atomicClaimIds: Owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: Backed by the existing ART-FND-ASU-LOCO-CALCIUM-VITAMIN-D article (extended this session).


---

# Item

## label
99% of body calcium is stored in bone; only about 1% is in soft tissue and extracellular fluid, and normal plasma calcium is a small, tightly-held fraction of that 1%

## id
CON-FND-BCCB7323D6E33E

## canonical_key
calcium.distribution.body-compartments

## definition
Calcium is the most abundant mineral in the body, making up roughly 1-2% of total body weight, and its distribution is heavily skewed: about 99% is stored in bone and teeth (as hydroxyapatite, serving both a structural and a mineral-reserve role), while only about 1% is distributed in soft tissue, extracellular fluid and plasma. Of that small non-skeletal fraction, plasma calcium itself is a tightly regulated, narrow-range value (roughly 9-11 mg/dL, about half ionised/free and half protein-bound), held constant moment-to-moment by the parathyroid hormone-calcitriol-calcitonin loop despite the enormous skeletal reservoir sitting alongside it.

## explicit_objective
State the roughly 99%-in-bone versus 1%-in-soft-tissue/plasma split of total body calcium, and recognise why this makes plasma calcium a small, tightly regulated fraction of the total pool.

## concept_type
mechanism

## status
under review

## subject
fnd

## primary_node_id
DIS-PHY-T06

## secondary_node_ids
SYS-END

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.4

## academic_relevance
0.8

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Endocrine and reproductive

## microtopic
DIS-PHY-T06

## nanotopic


## aliases
Calcium distribution
Body calcium pool
Skeletal calcium reserve

## pitfalls
Reversing the split (claiming most calcium sits in soft tissue/plasma, or that only 0.1% is in bone) -- the overwhelming majority (~99%) is skeletal; plasma calcium, though clinically the most-measured value, is a very small slice of the whole-body total.

## article_ids
ART-FND-ASU-LOCO-CALCIUM-VITAMIN-D

## support_mode
direct_statement

## original_wording
[Biochemistry Locomotor MCQs, Calcium & Vitamin D section, verbatim page-6 read] Q6 "Which of the following represents a correct calcium distribution? a) It represents 0.1% of total body weight b) 1.5% of calcium is stored in bones c) 99% of calcium is present in soft tissues d) 0.1% of calcium is present in plasma e) 0.1% of calcium is present in teeth" (printed key: d).

## conflicts


## uncertainty


## evidence_gaps
Verbatim page read completed this session (page 6 of src_e4a23646b45bcc340c70); no independent department textbook citation attached yet.

## arabic_label


## arabic_aliases


## related_concept_ids
CON-FND-D5FE7973164258

## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.5

## field_notes
sourceCandidateIds: find-existing.mjs "calcium distribution" and "calcium body weight" -- no hit anywhere; true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-D5FE7973164258 (calcium homeostasis hormones, existing) regulates the small plasma fraction described here.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId / nanotopicId: As per the sibling records above.
approvedFileResourceIds / approvedVideoResourceIds: No rights-cleared resource attached.
resourceOccurrenceIds: Hand-authored from a direct page read this session; no corpus extraction record.
atomicClaimIds: Owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: Backed by the existing ART-FND-ASU-LOCO-CALCIUM-VITAMIN-D article (extended this session).


---

# Item

## label
Vitamin D3 (cholecalciferol) is a preformed dietary molecule found in cod liver oil, fatty fish and egg yolk; skin only holds its precursor, 7-dehydrocholesterol, until UV light converts it

## id
CON-FND-7296DA274A4004

## canonical_key
vitamind.sources.dietary-and-cutaneous

## definition
Preformed vitamin D3 (cholecalciferol) itself is found in animal dietary sources -- cod liver oil, fatty (oily) fish and egg yolk are classic examples -- which already contain the finished molecule. Skin, by contrast, does not store or contain preformed D3; it holds the inactive precursor 7-dehydrocholesterol, which UVB radiation converts photochemically to previtamin D3 and then D3 itself. Because the skin's contribution is a conversion event rather than a stored/contained molecule, "under the skin" is the odd one out when the question asks where D3 (the finished molecule) is actually present, distinguishing dietary sources of the vitamin from its cutaneous route of synthesis.

## explicit_objective
Name cod liver oil, fatty fish and egg yolk as dietary sources that contain preformed vitamin D3, and explain why skin holds only the precursor (7-dehydrocholesterol) rather than D3 itself until UV conversion occurs.

## concept_type
mechanism

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T08

## secondary_node_ids
SYS-DER

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.4

## academic_relevance
0.75

## confidence
0.75

## topic
Biochemistry & Molecular Medicine

## subtopic
Nutrition

## microtopic
DIS-BIO-T08

## nanotopic


## aliases
Vitamin D3 sources
Cholecalciferol
7-dehydrocholesterol

## pitfalls
Assuming skin "contains" vitamin D3 the same way cod liver oil does -- skin contains only the inactive precursor 7-dehydrocholesterol, and D3 itself only appears there transiently as a photochemical conversion product, not a stored dietary-type reservoir.

## article_ids
ART-FND-ASU-LOCO-CALCIUM-VITAMIN-D

## support_mode
direct_statement

## original_wording
[Biochemistry Locomotor MCQs, Calcium & Vitamin D section, verbatim page-7 read] Q9 "D3 (cholecalciferol) is present in all the following Except? a) Under the skin b) Cod liver oil c) Fatty fish d) Egg yolk e) Beef liver" (printed key: a).

## conflicts


## uncertainty
The printed key names option (a) "Under the skin" as the exception rather than (e) "Beef liver"; beef liver is not a well-known standard dietary source of vitamin D3 in most texts, so a case could be made either way, but the paper's own printed key is followed here (skin holds the precursor, not the finished molecule) and both the correct-option explanation and each distractor's explanation state the reasoning so a reviewer can re-weigh it.

## evidence_gaps
Verbatim page read completed this session (page 7 of src_e4a23646b45bcc340c70); no independent department textbook citation attached yet.

## arabic_label


## arabic_aliases


## related_concept_ids
CON-FND-49D9C172607D9A

## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.45

## field_notes
sourceCandidateIds: find-existing.mjs "vitamin D3 sources" and "7-dehydrocholesterol" -- no hit anywhere; true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-49D9C172607D9A (vitamin D activation pathway, existing) picks up where this sourcing fact leaves off.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId / nanotopicId: As per the sibling records above.
approvedFileResourceIds / approvedVideoResourceIds: No rights-cleared resource attached.
resourceOccurrenceIds: Hand-authored from a direct page read this session; no corpus extraction record.
atomicClaimIds: Owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: Backed by the existing ART-FND-ASU-LOCO-CALCIUM-VITAMIN-D article (extended this session).


---

# Item

## label
Six purine-pathway enzymes each catalyse one specific named reaction -- HGPRT, PNP, 5' nucleotidase, guanase, ADA and xanthine oxidase each convert a distinct substrate to a distinct product

## id
CON-FND-F17B84857CD716

## canonical_key
purine.salvage.enzyme-reaction-catalyzed-pairing

## definition
Purine catabolism and salvage runs through a fixed set of enzyme-catalysed conversions, each of which is separately examinable as an enzyme-to-reaction pairing rather than as a whole-pathway question. Hypoxanthine-guanine phosphoribosyltransferase (HGPRT) salvages the free base hypoxanthine directly to IMP (hypoxanthine -> IMP), using PRPP. Purine nucleoside phosphorylase (PNP) cleaves a nucleoside to its free base plus ribose-1-phosphate (for example guanosine -> guanine + ribose-1-P). 5'-nucleotidase removes the phosphate from a nucleotide to give the corresponding nucleoside (nucleotide -> nucleoside), the reverse direction of phosphorylation. Guanase (guanine deaminase) deaminates guanine to xanthine (guanine -> xanthine). Adenosine deaminase (ADA) deaminates adenosine to inosine (adenosine -> inosine), not a nucleotide-to-nucleoside conversion. Xanthine oxidase oxidises both hypoxanthine to xanthine and xanthine to uric acid (xanthine -> uric acid is its terminal, most commonly tested step). Learning each enzyme's specific substrate and product, rather than only "purine catabolism ends in uric acid" in general, is what a matching-format question or a "which pair is correct" question actually tests.

## explicit_objective
Pair each of HGPRT, PNP, 5'-nucleotidase, guanase, ADA and xanthine oxidase with its own specific substrate-to-product conversion, and distinguish a nucleotide-to-nucleoside step (5'-nucleotidase) from a nucleoside-to-base step (PNP) and from a deamination step (guanase, ADA).

## concept_type
mechanism

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-IMM

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.4

## academic_relevance
0.85

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Biomolecules

## microtopic
DIS-BIO-T01

## nanotopic


## aliases
Purine enzyme reaction matching
Xanthine oxidase reaction
5' nucleotidase reaction
Guanase reaction

## pitfalls
Confusing "nucleotide -> nucleoside" (5'-nucleotidase, a dephosphorylation) with "nucleoside -> base" (PNP, a phosphorolysis that also releases ribose-1-P) -- both sound like generic "breakdown" steps but act on different substrate classes and are the two options most often swapped on a matching question.

## article_ids
ART-FND-ASU-LOCO-PURINE-ENZYME-DEFICIENCIES

## support_mode
direct_statement

## original_wording
[Biochemistry Locomotor MCQs, Purine Catabolism section, verbatim page-9 read] Matching table: "11. HGPRT / 12. PNP nucleoside phosphorylase / 13. 5' nucleotidase / 14. Guanase (guanine deaminase) / 15. ADA / 16. Xanthine oxidase" matched against "a. (nucleotide -> nucleoside) / b. (xanthine -> uric acid) / c. (guanosine -> guanine + ribose1-P) / d. (Adenosine -> inosine) / e. (guanine -> xanthine) / f. (hypoxanthine -> IMP)" (printed key, verbatim from the rendered table: 11=f, 12=c, 13=a, 14=e, 15=d, 16=b). Also [Important MCQs, page 13] Q3 "Which pair of enzyme and its catalyzed reaction is correct? A. HGPRT (guanosine -> guanine + ribose 1-P) B. PNP (Adenosine -> inosine) C. 5' nucleotidase (hypoxanthine -> IMP) D. Guanase (guanine -> xanthine) E. Adenosine deaminase (nucleotide -> nucleoside)" (printed key: D -- the same six reactions re-paired with deliberately swapped, incorrect enzyme names on options A/B/C/E).

## conflicts


## uncertainty


## evidence_gaps
Verbatim page read completed this session (pages 9 and 13 of src_e4a23646b45bcc340c70); no independent department textbook citation attached yet.

## arabic_label


## arabic_aliases


## related_concept_ids
CON-FND-108D52927380AB

## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.5

## field_notes
sourceCandidateIds: find-existing.mjs "purine enzyme reaction" and "xanthine oxidase" -- no hit naming this specific six-enzyme reaction-matching fact (the existing pending "purine salvage" concept covers only the salvage significance/tissue point, not per-enzyme reaction pairing); true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-108D52927380AB (HGPRT/ADA enzyme-deficiency disease pairing, existing) is the clinical-disease side of two of these same enzymes.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId / nanotopicId: As per the sibling records above.
approvedFileResourceIds / approvedVideoResourceIds: No rights-cleared resource attached.
resourceOccurrenceIds: Hand-authored from a direct page read this session; no corpus extraction record.
atomicClaimIds: Owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: Backed by the existing ART-FND-ASU-LOCO-PURINE-ENZYME-DEFICIENCIES article (extended this session).


---

# Item

## label
Allopurinol is a hypoxanthine analogue that inhibits xanthine oxidase, blocking uric acid formation and treating gout

## id
CON-FND-D227A9E8979674

## canonical_key
allopurinol.mechanism.xanthine-oxidase-inhibition

## definition
Allopurinol is a structural analogue of hypoxanthine. It competitively (and, via its metabolite oxypurinol, more durably) inhibits xanthine oxidase, the enzyme that normally oxidises hypoxanthine to xanthine and xanthine to uric acid. By blocking this terminal step of purine catabolism, allopurinol lowers uric acid production, shifting the excreted purine load toward the more soluble precursors hypoxanthine and xanthine -- the basis for its use in gout and in preventing tumour-lysis-associated hyperuricaemia. Uric acid crystal deposition in a joint (classically the first metatarsophalangeal joint / big toe), producing acute gouty arthritis, is the direct clinical consequence of uric-acid overproduction via the de novo purine biosynthesis and catabolism pathway that allopurinol targets.

## explicit_objective
Name allopurinol as a hypoxanthine analogue that inhibits xanthine oxidase, and connect uric-acid overproduction (via purine catabolism/de novo synthesis) to the classic acute gouty big-toe presentation.

## concept_type
mechanism

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-MSK

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.8

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Biomolecules

## microtopic
DIS-BIO-T01

## nanotopic


## aliases
Allopurinol
Xanthine oxidase inhibitor
Gout treatment mechanism

## pitfalls
Naming allopurinol as a xanthine or uric-acid analogue instead of a hypoxanthine analogue, or naming the wrong enzyme (HGPRT, guanase) as its target -- allopurinol's structure mimics hypoxanthine specifically, and its pharmacological target is xanthine oxidase, not a salvage or deamination enzyme.

## article_ids
ART-FND-ASU-LOCO-PURINE-ENZYME-DEFICIENCIES

## support_mode
direct_statement

## original_wording
[Biochemistry Locomotor MCQs, Purine Catabolism section, verbatim page-8 read] Q1 "Patient develops sever pain in right big toe, Uric acid crystals are present in His urine. This patient's pain is directly caused by the overproduction of the end product of which of the following metabolic pathways? A. De novo pyrimidine biosynthesis B. Pyrimidine degradation C. De novo purine biosynthesis D. Purine salvage E. Purine degradation" (printed key: E). Q5 "Allopurinol drug is analogue to which of the following? A. Hypoxanthine B. Gaunine C. Xanthine D. Uric acid" (printed key: A). Q7 "Allopurinol inhibits which of the following enzymes? A. Guanase enzyme B. 5' nucleotidase C. Purine nucleoside phosphorylase D. Xanthine oxidase" (printed key: D).

## conflicts


## uncertainty


## evidence_gaps
Verbatim page read completed this session (page 8 of src_e4a23646b45bcc340c70); no independent department textbook citation attached yet.

## arabic_label


## arabic_aliases


## related_concept_ids
CON-FND-92DD65D96E3FA1

## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.5

## field_notes
sourceCandidateIds: find-existing.mjs "allopurinol" and "xanthine oxidase inhibitor" -- no hit anywhere; true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-92DD65D96E3FA1 (purine catabolism ends at uric acid, pending-live overlay onto AU-MED-102) is the pathway allopurinol interrupts; gate this batch with the Alexandria concept file per the LANE-CARD.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId / nanotopicId: As per the sibling records above.
approvedFileResourceIds / approvedVideoResourceIds: No rights-cleared resource attached.
resourceOccurrenceIds: Hand-authored from a direct page read this session; no corpus extraction record.
atomicClaimIds: Owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: Backed by the existing ART-FND-ASU-LOCO-PURINE-ENZYME-DEFICIENCIES article (extended this session).


---

# Item

## label
ADA deficiency destroys both T and B cells (a SCID), while PNP deficiency selectively spares B cells and causes a T-cell-only immunodeficiency

## id
CON-FND-E9E2A2E6F091C9

## canonical_key
immunodeficiency.ada-vs-pnp-differential

## definition
Two purine-salvage enzyme deficiencies both cause immunodeficiency by letting toxic nucleoside/deoxynucleotide metabolites accumulate selectively in lymphocytes, but they differ in which lymphocyte lineage is hit. Adenosine deaminase (ADA) deficiency lets deoxyadenosine (and its triphosphate, dATP) accumulate, which is toxic to both developing T and B lymphocytes, producing one of the autosomal recessive forms of severe combined immunodeficiency (SCID) -- low T cells and low B cells. Purine nucleoside phosphorylase (PNP) deficiency instead lets deoxyguanosine accumulate, which is selectively toxic to T lymphocytes; B cells are relatively spared because they rely less on the salvage pathway PNP feeds, so the clinical picture is a T-cell-only immunodeficiency with normal or near-normal B-cell numbers/function, rather than the combined defect seen in ADA deficiency.

## explicit_objective
Distinguish ADA deficiency (both T and B cells low, a SCID) from PNP deficiency (T cells low, B cells normal) by the enzyme, the accumulating metabolite, and which lymphocyte lineage each selectively damages.

## concept_type
clinical_correlation

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-IMM

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.8

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Biomolecules

## microtopic
DIS-BIO-T01

## nanotopic


## aliases
ADA deficiency SCID
PNP deficiency
T-cell-only immunodeficiency

## pitfalls
Assuming any purine-salvage enzyme deficiency with recurrent infection must be ADA/SCID -- a normal B-cell count/function alongside low T cells points to PNP deficiency instead, a distinct, narrower immunodeficiency than the combined ADA-SCID picture.

## article_ids
ART-FND-ASU-LOCO-PURINE-ENZYME-DEFICIENCIES

## support_mode
direct_statement

## original_wording
[Biochemistry Locomotor MCQs, Purine Catabolism section, verbatim page-8/9 read] Q4 "A child was noted to have recurrent respiratory infection, his lab demonstrate decrease in T and B cells, the enzyme that is defective in this patient is important in which of the following: A. Convert ribonucleotide to deoxyribonucleotide B. Formation of AMP C. Synthesis of UMP D. Convert adenosine to inosine" (printed key: D -- adenosine deaminase, ADA). Q8 "Immunodeficiency that affects T cells only with normal B cells is due to deficiency of A. Adenosine deaminase enzyme B. 5' nucleotidase C. Purine nucleoside phosphorylase D. Xanthine oxidase" (printed key: C -- PNP).

## conflicts


## uncertainty


## evidence_gaps
Verbatim page read completed this session (pages 8-9 of src_e4a23646b45bcc340c70); no independent department textbook citation attached yet.

## arabic_label


## arabic_aliases


## related_concept_ids
CON-FND-108D52927380AB
CON-FND-F17B84857CD716

## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.5

## field_notes
sourceCandidateIds: find-existing.mjs "PNP deficiency" and "T cell only immunodeficiency" -- no hit anywhere; true new mint, narrower than and complementary to the existing HGPRT/ADA disease-pairing concept.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-108D52927380AB (HGPRT/ADA pairing, existing) and CON-FND-F17B84857CD716 (enzyme-reaction matching, this same batch) are the concepts this differential sits between.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId / nanotopicId: As per the sibling records above.
approvedFileResourceIds / approvedVideoResourceIds: No rights-cleared resource attached.
resourceOccurrenceIds: Hand-authored from a direct page read this session; no corpus extraction record.
atomicClaimIds: Owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: Backed by the existing ART-FND-ASU-LOCO-PURINE-ENZYME-DEFICIENCIES article (extended this session).


---

# Item

## label
Well-fed muscle takes up glucose to replenish glycogen and amino acids to build protein; early-fasting muscle burns fatty acids; and anaerobic muscle relies on glycogen/glucose while the oxidative system draws on glucose, fatty acid and ketone oxidation together

## id
CON-FND-0756BE1431BFA1

## canonical_key
muscle.fuel-metabolism.fed-fasted-states

## definition
Skeletal muscle's fuel choice shifts with nutritional state and oxygen availability. In the well-fed state, insulin-driven muscle takes up circulating glucose to replenish its glycogen store and takes up amino acids to synthesise new contractile/structural protein. In the early fasting state, before muscle has to fall back on protein breakdown, resting muscle preferentially oxidises fatty acids as fuel, sparing glucose for obligate glucose-using tissues. When oxygen is unavailable (anaerobic conditions, e.g. a sprint), muscle can only draw ATP from glycogen/glucose via anaerobic glycolysis, since fatty acid and ketone oxidation both require oxygen; when oxygen is available, the oxidative (aerobic) system draws on all three fuel classes together -- complete oxidation of glucose via the TCA cycle, fatty acid oxidation, and oxidation of ketone bodies -- to regenerate ATP far more efficiently than anaerobic glycolysis alone.

## explicit_objective
State which fuel muscle preferentially uses in the well-fed state (glucose/amino acids), the early-fasting state (fatty acids), under anaerobic conditions (glycogen/glucose only), and under aerobic/oxidative conditions (glucose, fatty acids and ketone bodies together).

## concept_type
mechanism

## status
under review

## subject
fnd

## primary_node_id
DIS-BIO-T02

## secondary_node_ids
SYS-MSK

## modules
ASU-LOCO

## module_subject
ASU-LOCO > Biochemistry

## universities
asu

## learner_years
1

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.85

## confidence
0.8

## topic
Biochemistry & Molecular Medicine

## subtopic
Bioenergetics

## microtopic
DIS-BIO-T02

## nanotopic


## aliases
Muscle fuel selection
Fed-fasted muscle metabolism
Anaerobic vs oxidative fuel

## pitfalls
Naming fatty acids as an anaerobic fuel, or glucose alone as the whole oxidative-system fuel -- fatty acid and ketone-body oxidation are both strictly aerobic (mitochondrial, oxygen-dependent) processes, so under anaerobic conditions glycogen/glucose is the only option, while the aerobic system draws on all three fuel classes, not glucose alone.

## article_ids
ART-FND-ASU-LOCO-CREATINE-BIOCHEMISTRY

## support_mode
direct_statement

## original_wording
[Biochemistry Locomotor MCQs, Muscle Energy section, verbatim page-10 read] Q2 "During well fed state, muscles take up ___ to replenish glycogen & ___ Amino acid to synthesize proteins. a. Fatty acids b. Glucose c. Acetyl CoA d. Pyruvate" (printed key: b). Q3 "In the early fasting state, resting muscle uses ___ as fuel. a. Fatty acids b. Glucose c. Amino acids d. Acetone" (printed key: a). Q5 "In muscle, Oxidative system depend on supply of reduced equivalents from: a. Complete oxidation of glucose in TCA cycle b. FA oxidation c. Oxidation of ketone bodies d. All of the above" (printed key: d). Q11 "Which of the following is a fuel source of energy in absence of oxygen a. Fatty acids b. Ketone bodies c. Creatine d. Glycogen or glucose" (printed key: d).

## conflicts


## uncertainty


## evidence_gaps
Verbatim page read completed this session (page 10 of src_e4a23646b45bcc340c70); no independent department textbook citation attached yet.

## arabic_label


## arabic_aliases


## related_concept_ids
CON-FND-6B7241CD9F3C42

## related_article_ids


## resource_ids
src_e4a23646b45bcc340c70

## approved_file_resource_ids


## approved_video_resource_ids


## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## merge_ids


## rejected_merge_candidate_ids


## exclusion_reason


## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## weight_confidence
0.5

## field_notes
sourceCandidateIds: find-existing.mjs "muscle fuel selection" and "anaerobic glycolysis fuel" -- "muscle fatigue" returned 10 unrelated existing records (per triage) but nothing names this fed/fasted/anaerobic/oxidative fuel-selection fact specifically; true new mint.
arabicLabel: Not reviewed.
relatedConceptIds: CON-FND-6B7241CD9F3C42 (creatine phosphate energy-buffering role, pending-live overlay onto 103-BMS-carbohydrate) is the fast-buffer system this slower fuel-selection picture complements; gate this batch with the Kasr concept file per the LANE-CARD.
lastReviewed / reviewDue: Draft, not yet reviewed.
microtopicId / nanotopicId: As per the sibling records above.
approvedFileResourceIds / approvedVideoResourceIds: No rights-cleared resource attached.
resourceOccurrenceIds: Hand-authored from a direct page read this session; no corpus extraction record.
atomicClaimIds: Owed once the evidence stage (S5) runs on this concept.
articleIds / relatedArticleIds: Backed by the existing ART-FND-ASU-LOCO-CREATINE-BIOCHEMISTRY article (extended this session to also cover fuel selection, not creatine alone).

