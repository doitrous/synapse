<!--
  ASU-ENDO-2 · follow-on MCQ-authoring pass on the same source as the
  Anatomy+Community and Pharma commits. This pass authors the Histo block
  (23 items) of "EOM MCQs - Endocrine Final MCQ Collection.pdf"
  (src_f3b44cd466398c8953b9). Embedded-answer format ("N-question?\n<bare
  answer>", no printed distractors) — this lane authors its own options and
  explanations from the stated answer/topic.

  Five items are held rather than authored:
  - Item 11 ("Which cell doesn't have secretory function? Spongiocyte") is
    held on factual-accuracy grounds — spongiocytes are the lipid-laden
    clear cells of the adrenal zona fasciculata, which DO secrete
    glucocorticoids; the source's stated answer contradicts standard
    histology teaching and is not propagated.
  - Item 12 ("What's the true order of thyroid hormone release? Release T3&
    T4 after degradation") restates the same fact as item 6 (and the
    existing CON-END-A11F28FA99B94D concept, see below) and is held as a
    within-source duplicate.
  - Items 13 and 16 (large vacuole/numerous sER of zona fasciculata cells;
    excessive mitochondria and golgi as steroid-cell criteria) restate the
    same steroid-secreting-cell-ultrastructure fact as item 2 from two more
    angles; item 2 is authored, 13 and 16 are held.
  - Item 23 ("Which of the following is true about the endocrine pancreas?
    Gap junction of islet of langerhans") restates the same fact as item 22
    and is held.
  See coverage/ASU-ENDO-2-LEDGER.md.

  Item 6 ("Which of the following is true regarding the follicular cells?
  Follicular cells secrete T3 and T4 after lysosomal degradation by
  proteolytic enzyme") is an exact match to this module's own existing
  concept CON-END-A11F28FA99B94D ("Follicular cells synthesize, store and
  release thyroid hormones through thyroglobulin",
  docs/Ain-Shams-Source-Imports/concept/ASU-ENDO-2-histology-foundations-concepts.md)
  and its article ART-END-ASU-ENDO2-THYROID-CELLS-HORMONE-CYCLE — reused
  directly (both already scoped to this module) rather than re-minted; see
  the question batch, not this file.

  15 new concepts minted with the manual's unsalted tool
  (mint-concept-id.mjs), each checked with find-existing.mjs first (no
  cross-module or cross-university hits). Two concepts each back two source
  items testing the same underlying fact from two angles (oxyphil cell
  ultrastructure/staining: items 4+10; chromaffin cell granules/histochemical
  detection: items 14+19) rather than minting near-duplicate concepts.

  Import: Admin › Bulk import → concept.
-->

# Item

## label
Thyroid follicle colloid stains PAS-positive

## id
CON-END-006E0F423E3BEF

## canonical_key
histology.thyroid-follicle-colloid-pas-positive

## definition
The colloid filling the lumen of a thyroid follicle is a glycoprotein-rich store of thyroglobulin, which stains positively with the periodic acid-Schiff (PAS) reaction because of its high carbohydrate content. This PAS positivity is a standard histological feature used to identify thyroid follicular colloid on light microscopy.

## explicit_objective
State that thyroid follicular colloid is PAS-positive because of its glycoprotein (thyroglobulin) content.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Thyroid histology

## universities
asu

## learner_years
2

## blueprint_weight
0.25

## exam_weight_by_year
ASU_Y2=0.25

## clinical_relevance
0.2

## academic_relevance
0.85

## confidence
0.85

## topic
Histology

## subtopic
Thyroid histology

## microtopic


## nanotopic


## aliases
Thyroid colloid PAS staining
Follicular lumen colloid histochemistry

## pitfalls
Confusing colloid PAS positivity (a fixed structural/histochemical feature) with the dynamic amount of colloid, which varies with follicle activity state.

## article_ids
ART-END-ASUENDO2EFC-THYROID-COLLOID-PAS-POSITIVE

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 1: "Which of the following is true about thyroid follicles? Lumen contains PAS + ve colloid."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-AC6999E3ABBC23

## related_article_ids
ART-END-ASU-ENDO2-THYROID-CELLS-HORMONE-CYCLE

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
asu: Tested as Histo item 1 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
relatedConceptIds: CON-END-AC6999E3ABBC23 ("Thyroid follicular epithelium changes with activity state", this module's existing histology-foundations concept) is related (also about follicle histology) but tests a different fact (dynamic epithelium/colloid-amount changes vs fixed colloid PAS positivity); cross-referenced, not merged.

---

# Item

## label
Steroid-secreting cells have abundant smooth endoplasmic reticulum, mitochondria and lipid droplets

## id
CON-END-5E62F256A1955D

## canonical_key
histology.steroid-secreting-cell-ultrastructure-ser-lipid-mitochondria

## definition
Steroid hormone-secreting cells (e.g., adrenal cortical cells, gonadal steroidogenic cells) share a characteristic ultrastructure: abundant smooth endoplasmic reticulum (site of cholesterol-to-steroid enzymatic conversion), numerous mitochondria with tubular/vesicular cristae (site of the initial cholesterol side-chain cleavage step), and cytoplasmic lipid droplets storing cholesterol precursor. This combination of features, rather than any one alone, is what identifies a cell as steroidogenic on electron microscopy.

## explicit_objective
State that steroid-secreting cells are ultrastructurally characterised by abundant smooth ER, mitochondria and lipid droplets.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Adrenal cortex histology

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
0.85

## confidence
0.85

## topic
Histology

## subtopic
Adrenal cortex histology

## microtopic


## nanotopic


## aliases
Steroidogenic cell ultrastructure
Steroid cell smooth ER and lipid droplets

## pitfalls
Naming only one feature (e.g., only lipid droplets) instead of the full ultrastructural triad (smooth ER, tubular mitochondria, lipid droplets) that together identify a steroid-secreting cell.

## article_ids
ART-END-ASUENDO2EFC-STEROID-CELL-ULTRASTRUCTURE

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 2: "What's a characteristic of steroid secreting cell? Contain High lipid + SER." (Items 13 and 16 in the same source restate this fact from two more angles — zona fasciculata cell ultrastructure; steroid-cell criteria as mitochondria and golgi — and are held rather than re-authored.)

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-E22841B7366E1C

## related_article_ids
ART-END-ASUENDO2EFC-CHROMAFFIN-CELL-GRANULES-DICHROMATE

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
asu: Tested as Histo item 2 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
relatedConceptIds: CON-END-E22841B7366E1C (chromaffin cell granules, this batch) is related as the adrenal-medulla counterpart to this adrenal-cortex ultrastructure fact; cross-referenced, not merged.

---

# Item

## label
The adenohypophysis is connected to the hypothalamus by the hypophyseal portal system

## id
CON-END-F9DEA52384ACE9

## canonical_key
histology.hypophyseal-portal-system-adenohypophysis-connection

## definition
The adenohypophysis (anterior pituitary) is connected to the hypothalamus functionally rather than by direct nerve tracts: hypothalamic releasing and inhibiting hormones are secreted into a primary capillary plexus in the median eminence, drain via the hypophyseal portal veins, and reach a secondary capillary plexus in the anterior pituitary, where they act on anterior pituitary cells. This contrasts with the neurohypophysis (posterior pituitary), which is connected to the hypothalamus by a direct neural tract (the hypothalamo-hypophyseal tract of axons from the supraoptic and paraventricular nuclei).

## explicit_objective
State that the adenohypophysis is connected to the hypothalamus by the hypophyseal portal venous system, in contrast with the neurohypophysis's direct neural connection.

## concept_type
mechanism

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Pituitary histology

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
0.85

## confidence
0.85

## topic
Histology

## subtopic
Pituitary histology

## microtopic


## nanotopic


## aliases
Hypophyseal portal system
Hypothalamic-adenohypophyseal vascular link

## pitfalls
Confusing the adenohypophysis's vascular (portal) connection to the hypothalamus with the neurohypophysis's direct neural (axonal tract) connection.

## article_ids
ART-END-ASUENDO2EFC-HYPOPHYSEAL-PORTAL-SYSTEM

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 3: "What's true concerning the connection between Hypothalamus and pituitary gland? Adenohypophysis connected by hypothalamic hypophyseal portal V."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-608F039E17346B

## related_article_ids
ART-END-ASUENDO2EFC-HERRING-BODIES

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
asu: Tested as Histo item 3 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Parathyroid oxyphil cells contain numerous mitochondria, giving deep acidophilic staining

## id
CON-END-701C4E29CC40BF

## canonical_key
histology.parathyroid-oxyphil-cell-mitochondria-acidophilia

## definition
Oxyphil cells are the larger, less numerous of the two parathyroid parenchymal cell types (alongside chief/principal cells). They are packed with numerous mitochondria, which is what gives them their deeply acidophilic (eosinophilic) cytoplasmic staining on light microscopy; their secretory function, if any, is not established with certainty.

## explicit_objective
State that parathyroid oxyphil cells are characterised by numerous mitochondria, which produce their deeply acidophilic staining.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Parathyroid histology

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
0.85

## confidence
0.85

## topic
Histology

## subtopic
Parathyroid histology

## microtopic


## nanotopic


## aliases
Oxyphil cell mitochondria
Parathyroid oxyphil cell acidophilia

## pitfalls
Confusing oxyphil cells (numerous mitochondria, deeply acidophilic, larger) with chief cells (lipid and glycogen content, smaller, polygonal, principal secretory cell).

## article_ids
ART-END-ASUENDO2EFC-OXYPHIL-CELL-MITOCHONDRIA-ACIDOPHILIA

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 4: "What's a characteristic of Oxyphil cells? Numerous mitochondria." Also backs Histo item 10: "Which of the following is true regarding Oxyphil cell? Deeply acidophilic."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-8A7AB3F1F89F80
CON-END-FF5A26F1340889

## related_article_ids
ART-END-ASUENDO2EFC-CHIEF-CELL-LIPID-GLYCOGEN

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
asu: Tested as Histo items 4 and 10 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own. One concept backs both questions (numerous mitochondria and the acidophilic staining they cause are the same underlying fact, tested from two angles).

---

# Item

## label
Pituitary thyrotropes have a sparse count of small secretory granules

## id
CON-END-34F3B9977FA28E

## canonical_key
histology.pituitary-thyrotrope-sparse-granules

## definition
Thyrotropes, the TSH-secreting basophilic cells of the anterior pituitary, are characteristically small, angular cells with a relatively sparse (small) number of small secretory granules compared with other anterior pituitary cell types such as somatotropes, which is a recognised feature distinguishing them on electron microscopy.

## explicit_objective
State that pituitary thyrotropes are characterised by a small, sparse population of secretory granules.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Pituitary histology

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
0.85

## confidence
0.8

## topic
Histology

## subtopic
Pituitary histology

## microtopic


## nanotopic


## aliases
Thyrotrope ultrastructure
TSH-secreting cell granule count

## pitfalls
Confusing thyrotropes' sparse, small granules with somatotropes' large, numerous, densely-packed granules.

## article_ids
ART-END-ASUENDO2EFC-THYROTROPE-SPARSE-GRANULES

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 5: "Which is true regarding thyrotropes? Small count of granules."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-862F28F5405EBB

## related_article_ids
ART-END-ASUENDO2EFC-SOMATOTROPE-LARGE-DENSE-GRANULES

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
asu: Tested as Histo item 5 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Parathyroid chief cells contain lipid droplets and glycogen

## id
CON-END-8A7AB3F1F89F80

## canonical_key
histology.parathyroid-chief-cell-lipid-glycogen-content

## definition
Chief (principal) cells, the main and most numerous parenchymal cell type of the parathyroid gland, secrete parathyroid hormone and contain lipid droplets and glycogen granules in their cytoplasm, in contrast with the mitochondria-packed oxyphil cells, the parathyroid's other, less numerous cell type.

## explicit_objective
State that parathyroid chief cells characteristically contain cytoplasmic lipid and glycogen.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Parathyroid histology

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
0.85

## confidence
0.8

## topic
Histology

## subtopic
Parathyroid histology

## microtopic


## nanotopic


## aliases
Chief cell cytoplasmic content
Principal cell lipid and glycogen

## pitfalls
Confusing chief cells' lipid/glycogen content with oxyphil cells' numerous-mitochondria feature.

## article_ids
ART-END-ASUENDO2EFC-CHIEF-CELL-LIPID-GLYCOGEN

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 7: "Characteristic features of Chief cells in the parathyroid gland? Lipid and glycogen."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-701C4E29CC40BF
CON-END-FF5A26F1340889

## related_article_ids
ART-END-ASUENDO2EFC-OXYPHIL-CELL-MITOCHONDRIA-ACIDOPHILIA

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
asu: Tested as Histo item 7 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Pituitary somatotropes have large, electron-dense secretory granules

## id
CON-END-862F28F5405EBB

## canonical_key
histology.pituitary-somatotrope-large-dense-granules

## definition
Somatotropes, the growth hormone-secreting acidophilic cells of the anterior pituitary and its most numerous cell type, are characterised by large, numerous, electron-dense secretory granules, distinguishing them ultrastructurally from other anterior pituitary cell types such as the sparsely-granulated thyrotropes.

## explicit_objective
State that pituitary somatotropes are characterised by large, electron-dense secretory granules.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Pituitary histology

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
0.85

## confidence
0.85

## topic
Histology

## subtopic
Pituitary histology

## microtopic


## nanotopic


## aliases
Somatotrope ultrastructure
GH-secreting cell granules

## pitfalls
Confusing somatotropes' large, dense, numerous granules with thyrotropes' sparse, small granules.

## article_ids
ART-END-ASUENDO2EFC-SOMATOTROPE-LARGE-DENSE-GRANULES

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 8: "Which of the following is true regarding the somatotropes? Large and electron dense granules."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-34F3B9977FA28E

## related_article_ids
ART-END-ASUENDO2EFC-THYROTROPE-SPARSE-GRANULES

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
asu: Tested as Histo item 8 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Pituicytes are supportive neuroglial cells of the posterior pituitary

## id
CON-END-5F5BD3FA884009

## canonical_key
histology.pituicyte-supportive-glial-cell

## definition
Pituicytes are modified astrocyte-like glial cells of the neurohypophysis (posterior pituitary), providing structural and metabolic support to the unmyelinated axons and axon terminals of the hypothalamo-hypophyseal tract; they are not themselves hormone-secreting cells.

## explicit_objective
State that pituicytes are supportive neuroglial cells of the posterior pituitary, not hormone-secreting cells.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Pituitary histology

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
0.85

## confidence
0.85

## topic
Histology

## subtopic
Pituitary histology

## microtopic


## nanotopic


## aliases
Neurohypophysis glial cells
Posterior pituitary supportive cells

## pitfalls
Confusing pituicytes (supportive glial cells) with the neurosecretory axon terminals they support, which are the actual source of oxytocin/vasopressin release (stored in Herring bodies).

## article_ids
ART-END-ASUENDO2EFC-PITUICYTE-SUPPORTIVE-GLIAL-CELL

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 9: "Regarding Pituicytes, which of the following is true? Supportive neuroglial cells."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-608F039E17346B

## related_article_ids
ART-END-ASUENDO2EFC-HERRING-BODIES

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
asu: Tested as Histo item 9 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Adrenal chromaffin cells store catecholamines in secretory granules, detected by the dichromate (chromaffin) reaction

## id
CON-END-E22841B7366E1C

## canonical_key
histology.adrenal-chromaffin-cell-granules-dichromate-reaction

## definition
Chromaffin cells of the adrenal medulla store catecholamines (epinephrine, norepinephrine) in membrane-bound cytoplasmic secretory granules. When fixed in potassium dichromate, these stored catecholamines are oxidised to a brown-black pigment — the "chromaffin reaction" — a classic histochemical test used to identify chromaffin cells and paraganglia on light microscopy.

## explicit_objective
State that adrenal chromaffin cells store catecholamines in secretory granules, which are the substrate for the brown-staining chromaffin (dichromate) reaction.

## concept_type
mechanism

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Adrenal medulla histology

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
0.85

## confidence
0.85

## topic
Histology

## subtopic
Adrenal medulla histology

## microtopic


## nanotopic


## aliases
Chromaffin reaction
Adrenal medullary catecholamine granules

## pitfalls
Treating the chromaffin (dichromate) reaction and the underlying catecholamine-granule content as unrelated facts rather than recognising the granules as the substrate the dichromate reaction detects.

## article_ids
ART-END-ASUENDO2EFC-CHROMAFFIN-CELL-GRANULES-DICHROMATE

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 14: "Which of the following cells gives a brown color when stained with potassium dichromate? Chromaffin cells." Also backs Histo item 19: "Which of the following statements is true? Chromaffin cells have secretory granules."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-5E62F256A1955D

## related_article_ids
ART-END-ASUENDO2EFC-STEROID-CELL-ULTRASTRUCTURE

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
asu: Tested as Histo items 14 and 19 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own. One concept backs both questions (the histochemical dichromate reaction detects the same catecholamine-containing granules the second item asks about directly).
relatedConceptIds: CON-END-5E62F256A1955D (steroid cell ultrastructure, this batch) is related as the adrenal-cortex counterpart to this adrenal-medulla ultrastructure fact; cross-referenced, not merged.

---

# Item

## label
Herring bodies are aggregations of oxytocin/vasopressin secretory granules in the posterior pituitary

## id
CON-END-608F039E17346B

## canonical_key
histology.posterior-pituitary-herring-bodies

## definition
Herring bodies are dilated, bulbous axon terminals of the hypothalamo-hypophyseal tract within the posterior pituitary (neurohypophysis), formed by large aggregations of neurosecretory granules containing oxytocin or vasopressin (ADH) that have accumulated along the axon before release into the perivascular space.

## explicit_objective
State that Herring bodies are accumulations of oxytocin/vasopressin secretory granules within posterior pituitary axon terminals.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Pituitary histology

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
0.85

## confidence
0.85

## topic
Histology

## subtopic
Pituitary histology

## microtopic


## nanotopic


## aliases
Herring body neurosecretory granule aggregates
Posterior pituitary axon terminal granules

## pitfalls
Confusing Herring bodies (granule aggregates in axon terminals) with pituicytes (the supportive glial cells around them) or with the cell bodies of origin (in the supraoptic/paraventricular nuclei, not the posterior pituitary itself).

## article_ids
ART-END-ASUENDO2EFC-HERRING-BODIES

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 15: "Which of the following is true regarding herring bodies? Large aggregation of secretory granule of vasopressin and oxytocin."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-5F5BD3FA884009
CON-END-F9DEA52384ACE9

## related_article_ids
ART-END-ASUENDO2EFC-PITUICYTE-SUPPORTIVE-GLIAL-CELL

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
asu: Tested as Histo item 15 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Beta cells are centrally located within pancreatic islets of Langerhans

## id
CON-END-507B07128EBE97

## canonical_key
histology.pancreatic-islet-beta-cell-central-location

## definition
Within a pancreatic islet of Langerhans, insulin-secreting beta cells are the most numerous cell type and are classically described as occupying the central (core) region of the islet, with glucagon-secreting alpha cells and other minor cell types (delta, PP) arranged more peripherally — the standard cytoarchitectural description taught at this level.

## explicit_objective
State that pancreatic islet beta cells classically occupy the central region of the islet, with other endocrine cell types more peripheral.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Pancreatic islet histology

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
0.85

## confidence
0.8

## topic
Histology

## subtopic
Pancreatic islet histology

## microtopic


## nanotopic


## aliases
Islet of Langerhans cytoarchitecture
Beta cell central location in islets

## pitfalls
Placing alpha cells (peripheral) at the islet centre or beta cells (central) at the periphery — the standard taught arrangement is beta-cell-central, alpha-cell-peripheral.

## article_ids
ART-END-ASUENDO2EFC-BETA-CELL-CENTRAL-ISLET-LOCATION

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 17: "Which of the following is true about pancreas? Beta cells lie in the center of the islets."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-A79E30FA16931A

## related_article_ids
ART-END-ASUENDO2EFC-ISLET-CELL-GAP-JUNCTIONS

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
asu: Tested as Histo item 17 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Thyroid parafollicular (C) cells lack TSH receptors, unlike follicular cells

## id
CON-END-9E0815C5924274

## canonical_key
histology.thyroid-parafollicular-cell-lacks-tsh-receptor

## definition
Thyroid parafollicular (C) cells secrete calcitonin and are regulated by circulating calcium levels, not by the hypothalamic-pituitary-thyroid axis. Unlike follicular cells, which express TSH receptors and are stimulated by TSH to synthesise and release thyroid hormone, parafollicular cells lack TSH receptors, reflecting their distinct embryological origin (ultimobranchial body/neural crest) and regulatory pathway.

## explicit_objective
State that parafollicular (C) cells, unlike follicular cells, lack TSH receptors and are instead regulated by serum calcium.

## concept_type
classification

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Thyroid histology

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
0.85

## confidence
0.8

## topic
Histology

## subtopic
Thyroid histology

## microtopic


## nanotopic


## aliases
C-cell TSH receptor absence
Parafollicular cell regulation vs follicular cell regulation

## pitfalls
Assuming parafollicular cells are regulated by TSH like follicular cells — they are calcium-regulated instead.

## article_ids
ART-END-ASUENDO2EFC-PARAFOLLICULAR-CELL-LACKS-TSH-RECEPTOR

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 18: "Parafollicular cells differ from follicular cells as it? Lacks TSH receptor."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-9D7093D3BBD435
CON-END-A11F28FA99B94D

## related_article_ids
ART-END-ASU-ENDO2-THYROID-CELLS-HORMONE-CYCLE

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
asu: Tested as Histo item 18 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
relatedConceptIds: CON-END-9D7093D3BBD435 ("Parafollicular C-cells sit outside the follicular lumen and secrete calcitonin", this module's existing histology-foundations concept) covers the same cell type but a different specific fact (location/calcitonin secretion vs TSH-receptor absence/regulation); cross-referenced, not merged. CON-END-A11F28FA99B94D (follicular-cell thyroglobulin hormone cycle, same source file) is the contrasted cell type referenced for context.

---

# Item

## label
Pinealocytes are large cells with long, branching cytoplasmic processes

## id
CON-END-507D31B05C8C64

## canonical_key
histology.pinealocyte-large-branched-morphology

## definition
Pinealocytes, the main secretory (melatonin-producing) cells of the pineal gland, are large cells with round-to-oval, euchromatic nuclei and prominent nucleoli, and characteristically send out long, branching cytoplasmic processes that end in bulbous expansions near the gland's fenestrated capillaries — distinguishing them from the smaller, darker-nucleated, astrocyte-like interstitial (glial) cells of the pineal gland.

## explicit_objective
State that pinealocytes are large cells with long, branching cytoplasmic processes, distinguishing them from the pineal gland's interstitial glial cells.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Pineal gland histology

## universities
asu

## learner_years
2

## blueprint_weight
0.25

## exam_weight_by_year
ASU_Y2=0.25

## clinical_relevance
0.2

## academic_relevance
0.85

## confidence
0.8

## topic
Histology

## subtopic
Pineal gland histology

## microtopic


## nanotopic


## aliases
Pinealocyte morphology
Pineal gland secretory cell processes

## pitfalls
Confusing pinealocytes (large, branched, melatonin-secreting) with the pineal gland's smaller, darker interstitial (astrocyte-like glial) cells, which are supportive rather than secretory.

## article_ids
ART-END-ASUENDO2EFC-PINEALOCYTE-MORPHOLOGY

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 20: "Which of the following is true regarding pinealocytes? Large branched basophils pineal." (Source wording is imprecise; the well-established distinguishing feature is pinealocytes' large size and long branching cytoplasmic processes, which this record states without the unverifiable "basophilic" staining detail.)

## conflicts
Source states pinealocytes as "basophils"; standard histology does not describe pinealocyte staining as a defining basophilic feature, so this record omits that unverified detail and retains only the well-established large/branched-process morphology.

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-5F5BD3FA884009

## related_article_ids
ART-END-ASUENDO2EFC-PITUICYTE-SUPPORTIVE-GLIAL-CELL

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
0.3

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
asu: Tested as Histo item 20 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own, with the unverifiable "basophilic" detail dropped (see conflicts).
relatedConceptIds: CON-END-5F5BD3FA884009 (pituicyte, this batch) is related as another distinctive-morphology supportive/non-classic secretory cell in this same EM/histology cluster; cross-referenced, not merged.

---

# Item

## label
Parathyroid chief cells are small, polygonal cells

## id
CON-END-FF5A26F1340889

## canonical_key
histology.parathyroid-chief-cell-small-polygonal-shape

## definition
Chief (principal) cells, the main parenchymal cell of the parathyroid gland, are small, polygonal cells arranged in cords and clusters, in contrast with the larger, less numerous oxyphil cells of the same gland.

## explicit_objective
State that parathyroid chief cells are characteristically small and polygonal in shape.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Parathyroid histology

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
0.85

## confidence
0.8

## topic
Histology

## subtopic
Parathyroid histology

## microtopic


## nanotopic


## aliases
Chief cell shape
Parathyroid principal cell morphology

## pitfalls
Confusing chief cells' small polygonal shape with oxyphil cells' larger size.

## article_ids
ART-END-ASUENDO2EFC-CHIEF-CELL-SMALL-POLYGONAL

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 21: "Which of the following is a characteristic feature of the principal cells in parathyroid hormone? Small polygonal."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-8A7AB3F1F89F80
CON-END-701C4E29CC40BF

## related_article_ids
ART-END-ASUENDO2EFC-CHIEF-CELL-LIPID-GLYCOGEN

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
asu: Tested as Histo item 21 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Pancreatic endocrine islet cells are connected by gap junctions

## id
CON-END-A79E30FA16931A

## canonical_key
histology.pancreatic-islet-cell-gap-junctions

## definition
The endocrine cells of the pancreatic islets of Langerhans (alpha, beta, delta and other cell types) are interconnected by gap junctions, which allow direct electrical and metabolic coupling between adjacent cells, coordinating the synchronised secretory response of the islet to changes in blood glucose.

## explicit_objective
State that gap junctions couple the endocrine cells within a pancreatic islet, coordinating their secretory response.

## concept_type
mechanism

## status
under review

## subject
endo

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-END

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Histology > Pancreatic islet histology

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
0.85

## confidence
0.85

## topic
Histology

## subtopic
Pancreatic islet histology

## microtopic


## nanotopic


## aliases
Islet of Langerhans cell coupling
Gap junctions between endocrine pancreatic cells

## pitfalls
Confusing gap junctions (direct cell-cell electrical/metabolic coupling) with paracrine signalling between islet cells, which is a separate, diffusion-based mechanism.

## article_ids
ART-END-ASUENDO2EFC-ISLET-CELL-GAP-JUNCTIONS

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Histo item 22: "What is present between the main cells of the pancreas? Gap junction." (Item 23 in the same source, "Which of the following is true about the endocrine pancreas? Gap junction of islet of langerhans", restates this fact and is held rather than re-authored.)

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent histology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-507B07128EBE97

## related_article_ids
ART-END-ASUENDO2EFC-BETA-CELL-CENTRAL-ISLET-LOCATION

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
asu: Tested as Histo item 22 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
