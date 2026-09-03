<!--
  ASU-ENDO-2 · follow-on MCQ-authoring pass on the same source as
  ASU-ENDO-2-eom-final-collection-mcq-concepts.md (Anatomy+Community, prior
  commit). This pass authors the Pharma block (22 items) of "EOM MCQs -
  Endocrine Final MCQ Collection.pdf" (src_f3b44cd466398c8953b9). Embedded-
  answer format ("N-question?\n<bare answer>", no printed distractors) — this
  lane authors its own options and explanations from the stated answer/topic.

  Item 15 ("Which of the following is true about vasopressin preparation?
  intra nasal desmopressin in ttt of Diabetes insipidus") is held as a
  near-exact restatement of item 13 (same question type, same drug, same
  indication) within this same source; not re-authored (see
  coverage/ASU-ENDO-2-LEDGER.md).

  19 new concepts minted with the manual's unsalted tool
  (mint-concept-id.mjs), each checked with find-existing.mjs first. Two
  concepts each back two source items that test the same underlying fact
  from different angles (methimazole peroxidase inhibition: items 11+19;
  bisphosphonate GI contraindications: items 8+12) rather than minting near-
  duplicate concepts. One fact (conivaptan given IV) is adjacent to, but
  distinct from, a pending ASU-UG (urogenital) lane concept about conivaptan's
  contraindication in hypovolemic hyponatremia (CON-END-50951A4C7ADB32,
  different fact, different module) — cross-referenced via
  related_concept_ids rather than merged.

  Endocrine-drug-class concepts are placed under the relevant SYS-END disease
  topic node as primary (this module's own precedent for the Community
  block already does this) with a DIS-PHA pharmacology-discipline topic node
  as secondary, per SYS-END.md's own scope note that endocrine drug classes
  are out of its primary-inventory scope.

  Import: Admin › Bulk import → concept.
-->

# Item

## label
Denosumab is a RANKL inhibitor

## id
CON-END-D695BFC3B85ADB

## canonical_key
pharmacology.denosumab-rankl-inhibitor

## definition
Denosumab is a human monoclonal antibody that binds RANKL (receptor activator of nuclear factor kappa-B ligand), preventing it from activating its receptor RANK on osteoclast precursors. By blocking RANKL, denosumab inhibits osteoclast formation, function and survival, reducing bone resorption; it is given as a subcutaneous injection and used in osteoporosis and bone metastases.

## explicit_objective
State that denosumab acts by inhibiting RANKL, thereby blocking osteoclast-mediated bone resorption.

## concept_type
mechanism

## status
under review

## subject
endo

## primary_node_id
SYS-END-T04

## secondary_node_ids
DIS-PHA-T02

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Bone and calcium metabolism drugs

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## confidence
0.85

## topic
Pharmacology

## subtopic
Bone and calcium metabolism drugs

## microtopic


## nanotopic


## aliases
RANKL monoclonal antibody
Anti-RANKL therapy for osteoporosis

## pitfalls
Confusing denosumab (a RANKL-targeting monoclonal antibody) with bisphosphonates, which inhibit osteoclasts by a different mechanism (binding hydroxyapatite and inducing osteoclast apoptosis) rather than by antibody-mediated RANKL blockade.

## article_ids
ART-END-ASUENDO2EFC-DENOSUMAB-RANKL-INHIBITOR

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 1: "What's the mechanism of action of denosumab? RANKL inhibitor."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-BD62923FBCF865

## related_article_ids
ART-END-ASUENDO2EFC-BISPHOSPHONATES-RENAL-CAUTION

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 1 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Beta blockers in hyperthyroidism block sympathetic overactivity and are cardioprotective

## id
CON-END-0C9013D06AC434

## canonical_key
pharmacology.beta-blockers-hyperthyroidism-symptom-control

## definition
In hyperthyroidism, beta-adrenergic blockers (typically propranolol) are used as adjunct symptomatic therapy: they block the peripheral sympathetic manifestations of excess thyroid hormone (tremor, tachycardia, palpitations, anxiety, heat intolerance) and are cardioprotective by reducing heart rate and myocardial oxygen demand, lowering the risk of tachyarrhythmia. They do not reduce thyroid hormone synthesis and are not curative; propranolol additionally has a modest inhibitory effect on peripheral T4-to-T3 conversion at high doses.

## explicit_objective
State that beta blockers in hyperthyroidism act by blocking sympathetic overactivity symptoms and providing cardioprotection, without reducing thyroid hormone synthesis.

## concept_type
mechanism

## status
under review

## subject
endo

## primary_node_id
SYS-END-T03-S01

## secondary_node_ids
DIS-PHA-T02

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Thyroid drugs

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## confidence
0.85

## topic
Pharmacology

## subtopic
Thyroid drugs

## microtopic


## nanotopic


## aliases
Propranolol in thyrotoxicosis
Adjunct symptomatic therapy for hyperthyroidism

## pitfalls
Believing beta blockers cure hyperthyroidism or reduce thyroid hormone synthesis — that is the role of thionamides such as methimazole/PTU; beta blockers are purely symptomatic/cardioprotective adjuncts.

## article_ids
ART-END-ASUENDO2EFC-BETA-BLOCKERS-HYPERTHYROIDISM

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 2: "Which of the following is true about BB in hyperthyroidism ttt? Block sympathetic and Cardio protective."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-19D8D0697959D6

## related_article_ids
ART-END-ASUENDO2EFC-LUGOLS-IODINE-PREOP-THYROIDECTOMY

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 2 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Lugol's iodine is given before subtotal thyroidectomy to reduce thyroid size and vascularity

## id
CON-END-19D8D0697959D6

## canonical_key
pharmacology.lugols-iodine-preoperative-thyroidectomy

## definition
Lugol's iodine (strong iodine solution) is given for 7-10 days immediately before subtotal/near-total thyroidectomy in hyperthyroid patients. High-dose iodine transiently inhibits thyroid hormone release and reduces the size and vascularity of the hyperplastic gland, making surgery technically easier and reducing intraoperative blood loss; it is not used as long-term definitive therapy because the suppressive effect is temporary (escape from the acute inhibitory iodine effect occurs).

## explicit_objective
State that Lugol's iodine's correct clinical use is short-term preoperative preparation before thyroidectomy to reduce gland size and vascularity.

## concept_type
application

## status
under review

## subject
endo

## primary_node_id
SYS-END-T03-S01

## secondary_node_ids
DIS-PHA-T02

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Thyroid drugs

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## confidence
0.85

## topic
Pharmacology

## subtopic
Thyroid drugs

## microtopic


## nanotopic


## aliases
Preoperative iodine for thyroidectomy
Strong iodine solution before thyroid surgery

## pitfalls
Using Lugol's iodine as chronic/definitive treatment for hyperthyroidism instead of a short preoperative course — the antithyroid effect is transient.

## article_ids
ART-END-ASUENDO2EFC-LUGOLS-IODINE-PREOP-THYROIDECTOMY

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 3: "What's the correct use of lugol's iodine? Before subtotal thyroidectomy to reduce size and vascularity of the gland."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-0C9013D06AC434

## related_article_ids
ART-END-ASUENDO2EFC-BETA-BLOCKERS-HYPERTHYROIDISM

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 3 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Methimazole is not contraindicated in all stages of pregnancy

## id
CON-END-5C85EE4EB52DE0

## canonical_key
pharmacology.methimazole-pregnancy-trimester-choice

## definition
Methimazole is avoided in the first trimester of pregnancy because of an association with rare embryopathy (including aplasia cutis and choanal/oesophageal atresia), so propylthiouracil (PTU) is preferred for first-trimester hyperthyroidism management despite PTU's own hepatotoxicity risk. From the second trimester onward, methimazole is generally preferred over PTU because of PTU's greater hepatotoxicity risk. Because its use is trimester-dependent rather than avoided throughout pregnancy, the statement that methimazole is "contraindicated in all stages of pregnancy" is false.

## explicit_objective
State that methimazole's pregnancy safety is trimester-dependent (avoided in the first trimester in favour of PTU, preferred from the second trimester onward) rather than contraindicated throughout pregnancy.

## concept_type
application

## status
under review

## subject
endo

## primary_node_id
SYS-END-T03-S01

## secondary_node_ids
DIS-PHA-T08

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Thyroid drugs

## universities
asu

## learner_years
2

## blueprint_weight
0.35

## exam_weight_by_year
ASU_Y2=0.35

## clinical_relevance
0.5

## academic_relevance
0.7

## confidence
0.8

## topic
Pharmacology

## subtopic
Thyroid drugs

## microtopic


## nanotopic


## aliases
Methimazole vs PTU in pregnancy
Antithyroid drug choice by trimester

## pitfalls
Assuming methimazole is banned throughout pregnancy, or conversely using it unmodified in the first trimester without switching to PTU.

## article_ids
ART-END-ASUENDO2EFC-METHIMAZOLE-PREGNANCY-TRIMESTER

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 4: "Which of the following is not true about methimazole? Contraindicated in all stages of pregnancy."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-4ACC5BF62E8252

## related_article_ids
ART-END-ASUENDO2EFC-METHIMAZOLE-PEROXIDASE-INHIBITION

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 4 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Bromocriptine is an orally active dopamine agonist

## id
CON-END-45998037152143

## canonical_key
pharmacology.bromocriptine-oral-dopamine-agonist

## definition
Bromocriptine is an ergot-derived dopamine D2 receptor agonist that is orally active. By activating dopamine receptors on lactotroph cells, it mimics the tonic inhibitory action of hypothalamic dopamine on prolactin secretion, making it a first-line drug for hyperprolactinaemia (e.g., prolactinoma); it has also been used in Parkinson disease and to suppress lactation.

## explicit_objective
State that bromocriptine is an orally active dopamine agonist used to suppress prolactin secretion.

## concept_type
classification

## status
under review

## subject
endo

## primary_node_id
SYS-END-T02-S01

## secondary_node_ids
DIS-PHA-T02

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Pituitary hormone drugs

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## confidence
0.85

## topic
Pharmacology

## subtopic
Pituitary hormone drugs

## microtopic


## nanotopic


## aliases
Ergot dopamine agonist for hyperprolactinaemia
Oral dopamine agonist for prolactinoma

## pitfalls
Confusing bromocriptine's oral route/dopamine-agonist mechanism with somatostatin analogues such as octreotide, which are used for acromegaly (not hyperprolactinaemia) and given by injection.

## article_ids
ART-END-ASUENDO2EFC-BROMOCRIPTINE-DOPAMINE-AGONIST

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 5: "Regarding Bromocriptine? Oral active dopamine agonist."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-135FD0F7E869D1

## related_article_ids
ART-END-ASUENDO2EFC-DESMOPRESSIN-CENTRAL-DI

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 5 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Conivaptan, a vasopressin receptor antagonist, is given intravenously

## id
CON-END-DAA857855249C4

## canonical_key
pharmacology.conivaptan-intravenous-route

## definition
Conivaptan is a non-selective vasopressin V1a/V2 receptor antagonist ("vaptan") used to treat euvolaemic and hypervolaemic hyponatraemia (e.g., in SIADH). Unlike tolvaptan, which is taken orally, conivaptan is formulated and administered only by intravenous infusion, which limits it to short-term inpatient use.

## explicit_objective
State that conivaptan, unlike the oral vaptan tolvaptan, is administered intravenously.

## concept_type
classification

## status
under review

## subject
endo

## primary_node_id
SYS-END-T02-S02

## secondary_node_ids
DIS-PHA-T01

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Antidiuretic hormone analogues and antagonists

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## confidence
0.85

## topic
Pharmacology

## subtopic
Antidiuretic hormone analogues and antagonists

## microtopic


## nanotopic


## aliases
Vaptan IV route
Conivaptan vs tolvaptan route of administration

## pitfalls
Confusing conivaptan's IV-only route with tolvaptan, the oral vaptan.

## article_ids
ART-END-ASUENDO2EFC-CONIVAPTAN-IV-ROUTE

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 6: "What's true about ADH antagonists? Conivaptan taken IV."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-50951A4C7ADB32

## related_article_ids
ART-END-ASUENDO2EFC-DESMOPRESSIN-CENTRAL-DI

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 6 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
relatedConceptIds: CON-END-50951A4C7ADB32 ("Conivaptan is contraindicated in hypovolemic hyponatremia", ASU-UG/urogenital lane) is a different fact about the same drug (a contraindication, not a route of administration) from a module this record is not scoped to; cross-referenced rather than merged or reused.

---

# Item

## label
Bisphosphonates are not safe to take in the presence of significant renal impairment

## id
CON-END-BD62923FBCF865

## canonical_key
pharmacology.bisphosphonates-renal-impairment-caution

## definition
Bisphosphonates are renally cleared and are not safely given in patients with significant renal impairment (commonly cited around a creatinine clearance below approximately 30-35 mL/min, drug-specific), because reduced clearance raises the risk of nephrotoxicity — including acute tubular necrosis, especially with rapid intravenous administration — and because impaired renal handling of calcium/phosphate compounds the risk of hypocalcaemia. The statement that bisphosphonates are "safely taken renally" is therefore false; dose adjustment or avoidance is required in renal impairment.

## explicit_objective
State that bisphosphonates require caution and dose adjustment, rather than being simply "safe", in patients with significant renal impairment.

## concept_type
application

## status
under review

## subject
endo

## primary_node_id
SYS-END-T04

## secondary_node_ids
DIS-PHA-T01

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Bone and calcium metabolism drugs

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.5

## academic_relevance
0.7

## confidence
0.8

## topic
Pharmacology

## subtopic
Bone and calcium metabolism drugs

## microtopic


## nanotopic


## aliases
Bisphosphonate renal caution
Bisphosphonates in renal impairment

## pitfalls
Assuming bisphosphonates can be given without reviewing renal function; also confusing this renal caution with the separate GI contraindications (peptic ulcer disease, oesophageal disorders).

## article_ids
ART-END-ASUENDO2EFC-BISPHOSPHONATES-RENAL-CAUTION

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 7: "Which of the following is untrue regarding Bisphosphonate? Safely taken renally."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-90F73C83C9396B

## related_article_ids
ART-END-ASUENDO2EFC-BISPHOSPHONATES-GI-CONTRAINDICATIONS

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 7 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Bisphosphonates are contraindicated in active peptic ulcer disease and oesophageal disorders

## id
CON-END-90F73C83C9396B

## canonical_key
pharmacology.bisphosphonates-gi-contraindications

## definition
Oral bisphosphonates are directly irritant to the upper gastrointestinal mucosa and are contraindicated in active peptic ulcer disease and in oesophageal disorders (stricture, achalasia, or any condition that delays oesophageal emptying, and in patients unable to sit or stand upright for 30-60 minutes after dosing), because they can cause or worsen oesophagitis, oesophageal ulceration and erosion. This is why patients are instructed to take oral bisphosphonates with a full glass of water, on an empty stomach, and to remain upright afterwards.

## explicit_objective
State that active peptic ulcer disease and oesophageal disorders are contraindications to oral bisphosphonate therapy because of direct mucosal irritation.

## concept_type
application

## status
under review

## subject
endo

## primary_node_id
SYS-END-T04

## secondary_node_ids
DIS-PHA-T08

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Bone and calcium metabolism drugs

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.5

## academic_relevance
0.7

## confidence
0.85

## topic
Pharmacology

## subtopic
Bone and calcium metabolism drugs

## microtopic


## nanotopic


## aliases
Bisphosphonate GI contraindications
Oral bisphosphonate dosing precautions

## pitfalls
Confusing the GI contraindication (direct mucosal irritation from oral dosing) with the separate renal-impairment caution (a pharmacokinetic issue, based on renal clearance).

## article_ids
ART-END-ASUENDO2EFC-BISPHOSPHONATES-GI-CONTRAINDICATIONS

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 8: "Which of the following is a contradiction for Bisphosphonates? Peptic ulcer." Also backs Pharma item 12: "Esophageal disorder Contraindicated with? Bisphosphonates."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-BD62923FBCF865

## related_article_ids
ART-END-ASUENDO2EFC-BISPHOSPHONATES-RENAL-CAUTION

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma items 8 and 12 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own. One concept backs both questions (same underlying contraindication, tested from two angles).

---

# Item

## label
Octreotide can cause gallstones as an adverse effect

## id
CON-END-2A38B7A0752835

## canonical_key
pharmacology.octreotide-gallstones-adverse-effect

## definition
Octreotide, a somatostatin analogue used in acromegaly, carcinoid tumour symptom control and variceal bleeding, inhibits gallbladder contractility and biliary/pancreatic secretion. With prolonged use this promotes bile stasis and cholesterol supersaturation, predisposing to gallstone (cholelithiasis) formation, one of its most characteristic adverse effects.

## explicit_objective
State that gallstone formation is a characteristic adverse effect of octreotide, caused by reduced gallbladder motility.

## concept_type
mechanism

## status
under review

## subject
endo

## primary_node_id
SYS-END-T01

## secondary_node_ids
DIS-PHA-T08

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Somatostatin analogues

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.5

## academic_relevance
0.7

## confidence
0.85

## topic
Pharmacology

## subtopic
Somatostatin analogues

## microtopic


## nanotopic


## aliases
Octreotide cholelithiasis risk
Somatostatin analogue biliary adverse effect

## pitfalls
Attributing octreotide's gallstone risk to a direct cholesterol effect rather than to reduced gallbladder contractility/bile stasis.

## article_ids
ART-END-ASUENDO2EFC-OCTREOTIDE-GALLSTONES

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 9: "Adverse effects In Carcinoid tumor ttt (Octreotide)? Gallstones."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-91FAFE54D16548

## related_article_ids
ART-END-ASUENDO2EFC-OCTREOTIDE-B12-DEFICIENCY

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 9 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Felypressin is preferred over epinephrine as a vasoconstrictor in local anaesthetic for cardiac patients

## id
CON-END-B367ADE7C3FFF6

## canonical_key
pharmacology.felypressin-cardiac-patient-vasoconstrictor

## definition
Felypressin is a synthetic vasopressin analogue used as the vasoconstrictor additive in local (particularly dental) anaesthetic solutions. Because it acts on vascular V1 receptors rather than adrenergic receptors, it lacks the cardiac beta-adrenergic stimulant effects of epinephrine (tachycardia, arrhythmia risk), and its local vasoconstriction prolongs the duration of the anaesthetic effect by slowing systemic absorption, making it the preferred vasoconstrictor for patients with cardiac disease. At high doses it can still cause coronary vasoconstriction, so caution is required in severe ischaemic heart disease.

## explicit_objective
State that felypressin, by acting on vascular V1 receptors rather than adrenergic receptors, is used as a cardiac-safer vasoconstrictor that prolongs local anaesthesia in cardiac patients.

## concept_type
application

## status
under review

## subject
endo

## primary_node_id
SYS-END-T02-S02

## secondary_node_ids
DIS-PHA-T02

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Antidiuretic hormone analogues and antagonists

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.5

## academic_relevance
0.7

## confidence
0.8

## topic
Pharmacology

## subtopic
Antidiuretic hormone analogues and antagonists

## microtopic


## nanotopic


## aliases
Felypressin as vasoconstrictor in dental anaesthesia
Vasopressin analogue local anaesthetic additive

## pitfalls
Assuming felypressin is entirely free of cardiovascular risk — at high doses it can still cause coronary vasoconstriction, so it is preferred, not risk-free, in cardiac patients.

## article_ids
ART-END-ASUENDO2EFC-FELYPRESSIN-CARDIAC-PATIENT

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 10: "Which of the following is true regarding Vasopressin analogues? Felypressin prolongs local anesthesia in cardiac patient."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-DAA857855249C4

## related_article_ids
ART-END-ASUENDO2EFC-CONIVAPTAN-IV-ROUTE

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 10 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Methimazole inhibits thyroid peroxidase, blocking iodide oxidation and organification

## id
CON-END-4ACC5BF62E8252

## canonical_key
pharmacology.methimazole-thyroid-peroxidase-inhibition

## definition
Methimazole is a thionamide antithyroid drug that inhibits the enzyme thyroid peroxidase (TPO), blocking the oxidation of iodide to its active form and its organification (incorporation) onto tyrosine residues of thyroglobulin, and blocking the coupling of iodotyrosines into T3 and T4. By inhibiting these iodination steps, methimazole reduces new thyroid hormone synthesis; unlike PTU, it does not inhibit peripheral T4-to-T3 conversion.

## explicit_objective
State that methimazole's mechanism of action is inhibition of thyroid peroxidase, blocking iodide oxidation/organification and thyroid hormone synthesis.

## concept_type
mechanism

## status
under review

## subject
endo

## primary_node_id
SYS-END-T03-S01

## secondary_node_ids
DIS-PHA-T02

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Thyroid drugs

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## confidence
0.85

## topic
Pharmacology

## subtopic
Thyroid drugs

## microtopic


## nanotopic


## aliases
Methimazole mechanism of action
Thyroid peroxidase inhibitor

## pitfalls
Confusing methimazole's peroxidase-inhibition mechanism (blocking hormone synthesis) with iodine's own transient inhibitory effect on hormone release, or with PTU's additional peripheral deiodinase-inhibiting action, which methimazole lacks.

## article_ids
ART-END-ASUENDO2EFC-METHIMAZOLE-PEROXIDASE-INHIBITION

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 11: "Which of the following inhibits the synthesis of thyroid hormone by inhibiting peroxidase activity? Methimazole." Also backs Pharma item 19: "Which of the following is the action of Methimazole? Iodine oxidation."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-5C85EE4EB52DE0

## related_article_ids
ART-END-ASUENDO2EFC-METHIMAZOLE-PREGNANCY-TRIMESTER

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma items 11 and 19 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own. One concept backs both questions (same mechanism, tested from two angles).

---

# Item

## label
Desmopressin is used to treat central diabetes insipidus

## id
CON-END-135FD0F7E869D1

## canonical_key
pharmacology.desmopressin-central-diabetes-insipidus

## definition
Desmopressin (DDAVP) is a synthetic vasopressin analogue selective for the V2 receptor, given orally, intranasally, or parenterally. It is the treatment of choice for central (cranial) diabetes insipidus, where it replaces deficient endogenous ADH to restore renal water reabsorption in the collecting duct, reducing polyuria and correcting polydipsia. It is not effective in nephrogenic diabetes insipidus, where the renal V2 receptor response itself is defective.

## explicit_objective
State that desmopressin is the treatment of choice for central diabetes insipidus, replacing deficient endogenous ADH.

## concept_type
application

## status
under review

## subject
endo

## primary_node_id
SYS-END-T02-S02

## secondary_node_ids
DIS-PHA-T02

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Antidiuretic hormone analogues and antagonists

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.5

## academic_relevance
0.7

## confidence
0.85

## topic
Pharmacology

## subtopic
Antidiuretic hormone analogues and antagonists

## microtopic


## nanotopic


## aliases
DDAVP for central diabetes insipidus
Desmopressin V2-selective vasopressin analogue

## pitfalls
Using desmopressin for nephrogenic diabetes insipidus, where the renal receptor defect makes it ineffective.

## article_ids
ART-END-ASUENDO2EFC-DESMOPRESSIN-CENTRAL-DI

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 13: "Which of the following is true about vasopressin preparations? Desmopressin with Diabetes insipidus." (Item 15, a near-restatement of the same fact with a specified intranasal route, is held rather than re-authored — see LEDGER.)

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-DAA857855249C4

## related_article_ids
ART-END-ASUENDO2EFC-CONIVAPTAN-IV-ROUTE

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 13 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Octreotide can cause vitamin B12 deficiency as an adverse effect

## id
CON-END-91FAFE54D16548

## canonical_key
pharmacology.octreotide-b12-deficiency-adverse-effect

## definition
Octreotide inhibits pancreatic exocrine secretion and gastrointestinal motility as part of its broad somatostatin-analogue action. With prolonged use this reduces the pancreatic and gastric secretions needed for normal cobalamin (vitamin B12) release from dietary protein and its binding to intrinsic factor, resulting in vitamin B12 deficiency as a recognised adverse effect of long-term octreotide therapy, alongside gallstones and steatorrhoea from fat malabsorption.

## explicit_objective
State that vitamin B12 deficiency is a recognised adverse effect of long-term octreotide therapy, related to its suppression of pancreatic exocrine function.

## concept_type
mechanism

## status
under review

## subject
endo

## primary_node_id
SYS-END-T01

## secondary_node_ids
DIS-PHA-T08

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Somatostatin analogues

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.5

## academic_relevance
0.7

## confidence
0.8

## topic
Pharmacology

## subtopic
Somatostatin analogues

## microtopic


## nanotopic


## aliases
Octreotide vitamin B12 deficiency
Somatostatin analogue pancreatic exocrine suppression

## pitfalls
Overlooking vitamin B12 deficiency and steatorrhoea as consequences of octreotide's broad suppression of pancreatic exocrine function, distinct from its gallstone risk (a biliary motility effect).

## article_ids
ART-END-ASUENDO2EFC-OCTREOTIDE-B12-DEFICIENCY

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 14: "What's an adverse effect of octreotide? Vit B12 deficiency."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-2A38B7A0752835

## related_article_ids
ART-END-ASUENDO2EFC-OCTREOTIDE-GALLSTONES

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 14 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Regular insulin given as an intravenous infusion is used to control diabetic ketoacidosis

## id
CON-END-FEB69730AAB783

## canonical_key
pharmacology.regular-insulin-iv-dka-management

## definition
Diabetic ketoacidosis is managed with a continuous intravenous infusion of regular (short-acting, soluble) insulin, alongside fluid resuscitation and potassium replacement. The IV route gives a rapid, titratable and predictable onset of action, unlike subcutaneous long-acting insulins, whose slow and variable absorption in a dehydrated, acidotic patient makes them unsuitable for acute DKA management. IV regular insulin switches metabolism away from ketogenesis toward glucose utilisation, suppressing further ketone production.

## explicit_objective
State that continuous intravenous regular insulin infusion, not subcutaneous or long-acting insulin, is the mainstay of diabetic ketoacidosis management.

## concept_type
application

## status
under review

## subject
endo

## primary_node_id
SYS-END-T06

## secondary_node_ids
DIS-PHA-T02

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Diabetes drugs

## universities
asu

## learner_years
2

## blueprint_weight
0.35

## exam_weight_by_year
ASU_Y2=0.35

## clinical_relevance
0.5

## academic_relevance
0.7

## confidence
0.85

## topic
Pharmacology

## subtopic
Diabetes drugs

## microtopic


## nanotopic


## aliases
IV regular insulin in DKA
Insulin infusion for diabetic ketoacidosis

## pitfalls
Using subcutaneous or long-acting insulin (e.g., glargine) in acute DKA, where absorption is unpredictable in a dehydrated, hypoperfused patient.

## article_ids
ART-END-ASUENDO2EFC-REGULAR-INSULIN-IV-DKA

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 16: "Which of the following is used for controlling DKA? regular insulin IV infusion."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-CD0EA12A23CA75

## related_article_ids
ART-END-ASUENDO2EFC-INSULIN-GLARGINE-ONCE-DAILY

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 16 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Canagliflozin is an SGLT2 inhibitor

## id
CON-END-37937A813E8DC4

## canonical_key
pharmacology.canagliflozin-sglt2-inhibitor

## definition
Canagliflozin belongs to the sodium-glucose cotransporter-2 (SGLT2) inhibitor class of oral antidiabetic drugs, which act in the proximal renal tubule to block SGLT2-mediated glucose reabsorption, causing glucosuria and lowering blood glucose independent of insulin secretion or action. The class also has recognised cardiovascular and renal-protective benefits in type 2 diabetes.

## explicit_objective
Classify canagliflozin as an SGLT2 inhibitor that lowers blood glucose by blocking renal tubular glucose reabsorption.

## concept_type
classification

## status
under review

## subject
endo

## primary_node_id
SYS-END-T06

## secondary_node_ids
DIS-PHA-T02

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Diabetes drugs

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## confidence
0.85

## topic
Pharmacology

## subtopic
Diabetes drugs

## microtopic


## nanotopic


## aliases
SGLT2 inhibitor class recognition
Gliflozin class member

## pitfalls
Confusing SGLT2 inhibitors (canagliflozin, empagliflozin, dapagliflozin — renal glucose reabsorption blockers) with GLP-1 receptor agonists or DPP-4 inhibitors, which act through the incretin pathway.

## article_ids
ART-END-ASUENDO2EFC-CANAGLIFLOZIN-SGLT2-INHIBITOR

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 17: "Which of the following is a SGLT 2 inhibitor? Canagliflozin."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-EA04C7FA344ACF

## related_article_ids
ART-END-ASUENDO2EFC-METFORMIN-HEPATIC-GLUCOSE

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 17 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Corticosteroids reduce the production of proinflammatory cytokines

## id
CON-END-9F2B8569A41D4E

## canonical_key
pharmacology.corticosteroids-proinflammatory-cytokine-suppression

## definition
Glucocorticoids exert their anti-inflammatory and immunosuppressive action largely by binding intracellular glucocorticoid receptors and modulating gene transcription: they induce anti-inflammatory proteins (e.g., annexin-1/lipocortin-1, which inhibits phospholipase A2) and, more centrally, inhibit the transcription factors NF-kB and AP-1, reducing the production of proinflammatory cytokines such as IL-1, IL-2, IL-6 and TNF-alpha, as well as other inflammatory mediators. This transcriptional suppression of proinflammatory cytokines underlies their broad anti-inflammatory effect.

## explicit_objective
State that corticosteroids act, in part, by reducing the transcription of proinflammatory cytokines via inhibition of NF-kB/AP-1.

## concept_type
mechanism

## status
under review

## subject
endo

## primary_node_id
SYS-END-T05

## secondary_node_ids
DIS-PHA-T02

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Corticosteroid pharmacology

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## confidence
0.85

## topic
Pharmacology

## subtopic
Corticosteroid pharmacology

## microtopic


## nanotopic


## aliases
Glucocorticoid anti-inflammatory mechanism
Corticosteroid cytokine suppression

## pitfalls
Reducing corticosteroid action to only "membrane stabilisation" without recognising the genomic, transcription-factor-mediated suppression of proinflammatory cytokine genes as the principal anti-inflammatory mechanism.

## article_ids
ART-END-ASUENDO2EFC-CORTICOSTEROIDS-CYTOKINE-SUPPRESSION

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 18: "What is the action of Corticosteroids? reduce proinflammatory cytokines."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-F31C0E317C654C

## related_article_ids
ART-END-ASUENDO2EFC-ANTENATAL-DEXAMETHASONE-FETAL-LUNG

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 18 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Dexamethasone is used antenatally to accelerate fetal lung maturation before preterm delivery

## id
CON-END-F31C0E317C654C

## canonical_key
pharmacology.antenatal-dexamethasone-fetal-lung-maturity

## definition
Dexamethasone (with betamethasone, the other antenatal corticosteroid in clinical use) is given intramuscularly to pregnant women at risk of preterm delivery to accelerate fetal lung maturation, by inducing type II pneumocyte surfactant production and structural lung maturation, which reduces the incidence and severity of neonatal respiratory distress syndrome. Dexamethasone crosses the placenta relatively unmetabolised by placental 11-beta-hydroxysteroid dehydrogenase, which is what allows it (unlike cortisol) to reach and act on the fetus.

## explicit_objective
State that antenatal dexamethasone is given before anticipated preterm delivery to accelerate fetal lung (surfactant) maturation.

## concept_type
application

## status
under review

## subject
endo

## primary_node_id
SYS-END-T05

## secondary_node_ids
DIS-PHA-T02

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Corticosteroid pharmacology

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.5

## academic_relevance
0.7

## confidence
0.8

## topic
Pharmacology

## subtopic
Corticosteroid pharmacology

## microtopic


## nanotopic


## aliases
Antenatal corticosteroids for fetal lung maturity
Dexamethasone for neonatal RDS prevention

## pitfalls
Confusing antenatal corticosteroid use (fetal lung maturation before anticipated preterm birth) with tocolytic therapy, which merely delays labour rather than maturing the fetal lungs.

## article_ids
ART-END-ASUENDO2EFC-ANTENATAL-DEXAMETHASONE-FETAL-LUNG

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 20: "A female patient had premature term labor. Which drug could be used for induction of lungs? Dexamethasone." (Source wording; the clinical meaning is antenatal corticosteroid administration before anticipated preterm delivery to accelerate fetal lung maturation.)

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology/obstetric reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-9F2B8569A41D4E

## related_article_ids
ART-END-ASUENDO2EFC-CORTICOSTEROIDS-CYTOKINE-SUPPRESSION

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 20 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Insulin glargine is a long-acting basal insulin analogue that can be dosed once daily

## id
CON-END-CD0EA12A23CA75

## canonical_key
pharmacology.insulin-glargine-once-daily-basal

## definition
Insulin glargine is a recombinant long-acting insulin analogue engineered (by amino acid substitution and, in the formulation, an acidic pH that causes microprecipitation in subcutaneous tissue) to be released slowly and continuously from the injection site, producing a relatively flat, peakless plasma insulin profile that lasts approximately 20-24 hours. This pharmacokinetic profile is what allows once-daily dosing as basal insulin replacement, in contrast to intermediate-acting insulins such as NPH, which typically require twice-daily dosing and have a more pronounced peak.

## explicit_objective
State that insulin glargine's prolonged, relatively peakless absorption profile is what allows once-daily basal dosing.

## concept_type
mechanism

## status
under review

## subject
endo

## primary_node_id
SYS-END-T06

## secondary_node_ids
DIS-PHA-T01

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Diabetes drugs

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## confidence
0.85

## topic
Pharmacology

## subtopic
Diabetes drugs

## microtopic


## nanotopic


## aliases
Once-daily basal insulin
Long-acting insulin analogue kinetics

## pitfalls
Assuming any long-acting insulin can be mixed in the same syringe as short-acting insulin — glargine's acidic formulation precludes mixing, unlike NPH.

## article_ids
ART-END-ASUENDO2EFC-INSULIN-GLARGINE-ONCE-DAILY

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 21: "Which of the following insulin preparations can be used once daily? Insulin glargine."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-FEB69730AAB783

## related_article_ids
ART-END-ASUENDO2EFC-REGULAR-INSULIN-IV-DKA

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 21 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Metformin's primary glucose-lowering action is to decrease hepatic glucose production

## id
CON-END-EA04C7FA344ACF

## canonical_key
pharmacology.metformin-hepatic-glucose-production

## definition
Metformin, a biguanide, lowers blood glucose primarily by activating AMP-activated protein kinase (AMPK) in hepatocytes, which suppresses gluconeogenesis and glycogenolysis and thereby decreases hepatic glucose output. It also modestly increases peripheral (skeletal muscle) glucose uptake and reduces intestinal glucose absorption, but its dominant mechanism, and the reason it does not cause hypoglycaemia as monotherapy, is this insulin-independent reduction of hepatic glucose production.

## explicit_objective
State that metformin's dominant glucose-lowering mechanism is decreasing hepatic glucose production via AMPK-mediated suppression of gluconeogenesis.

## concept_type
mechanism

## status
under review

## subject
endo

## primary_node_id
SYS-END-T06

## secondary_node_ids
DIS-PHA-T02

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Pharmacology > Diabetes drugs

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## confidence
0.85

## topic
Pharmacology

## subtopic
Diabetes drugs

## microtopic


## nanotopic


## aliases
Metformin mechanism of action
Biguanide hepatic glucose suppression

## pitfalls
Attributing metformin's main effect to increased insulin secretion (it does not stimulate insulin release, unlike sulfonylureas) rather than to decreased hepatic glucose output.

## article_ids
ART-END-ASUENDO2EFC-METFORMIN-HEPATIC-GLUCOSE

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Pharma item 22: "Which of the following is true about the action of Metformin? Decrease hepatic glucose production."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent pharmacology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-37937A813E8DC4

## related_article_ids
ART-END-ASUENDO2EFC-CANAGLIFLOZIN-SGLT2-INHIBITOR

## resource_ids
src_f3b44cd466398c8953b9

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids


## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

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
authored_from_local_exam_bank_needs_independent_evidence

## weight_confidence
0.35

## field_notes
arabicLabel: Arabic terminology has not been reviewed; left empty rather than guessed.
arabicAliases: No reviewed Arabic aliases were supplied.
microtopicId: No verified microtopic ID exists below the selected discipline/system placement for this ASU source slice; the prose subtopic is retained for human review.
nanotopicId: No verified nanotopic exists below the selected placement for this ASU source slice.
approvedFileResourceIds: The source is corpus-indexed but not rights-cleared as an approved student file.
approvedVideoResourceIds: No video source was supplied.
lastReviewed: No reviewer has completed review yet.
reviewDue: Set after the first review is completed.
resourceOccurrenceIds: No pipeline occurrence record was generated for this hand-authored ASU exam-bank slice.
sourceCandidateIds: The source is known exactly from the ASU manifest and evidence source row; no unverified candidates are listed.
asu: Tested as Pharma item 22 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
