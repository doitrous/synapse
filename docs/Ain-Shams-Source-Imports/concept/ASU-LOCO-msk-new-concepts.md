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
Creatine synthesis begins in the kidney, where arginine:glycine amidinotransferase (AGAT) transfers the amidino group of arginine to glycine, releasing ornithine and forming guanidinoacetate (GAA). GAA travels in the blood to the liver, where guanidinoacetate methyltransferase (GAMT) methylates it using S-adenosylmethionine (SAM) as the methyl donor, producing creatine (and S-adenosylhomocysteine). Creatine is then taken up by muscle and brain via a specific creatine transporter and phosphorylated by creatine kinase to creatine phosphate, the rapid-buffer store for regenerating ATP.

## explicit_objective
Sequence creatine synthesis from arginine and glycine through AGAT and GAMT, naming the organ of each step and the methyl donor.

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

