<!--
  ASU-ENDO-2 · first MCQ-authoring pass on this module (module previously had
  only a small histology concept/article slice, no questions). Source: "EOM
  MCQs - Endocrine Final MCQ Collection.pdf" (src_f3b44cd466398c8953b9), a
  17-page, 7-subject-block (Anatomy/Pharma/Bio/Histo/Physio/Patho/Community)
  student compilation covering exam sittings 2018/19/20, native text, no OCR.
  Embedded-answer format ("N-question?\n<bare answer>", no printed
  distractors) — this batch authors its own options and explanations from the
  stated answer/topic, per this lane's standing convention (see
  LANE-CARD-Y2-3.md §4).

  This pass authors the Anatomy (13 items) and Community (6 items) blocks
  only — the smallest, lowest clinical-judgement-risk sections of a large
  paper — and holds the rest of the paper (Pharma/Bio/Histo/Physio/Patho, and
  one within-Anatomy cross-lane duplicate) for a follow-on session; see
  coverage/ASU-ENDO-2-LEDGER.md.

  14 new concepts (12 anatomy + 6 community minus... see below) minted with
  the manual's unsalted tool (mint-concept-id.mjs), each checked with
  find-existing.mjs first. Several facts are near-duplicates of existing
  "kau" (Kasr) lane concepts on the same fact from a different course; those
  are cross-referenced via related_concept_ids rather than reused directly,
  since the kau records are not scoped to ASU-ENDO-2/asu/ASU_Y2. One fact
  (inferior parathyroid gland from the 3rd pharyngeal pouch) is an exact
  duplicate of this university's own pending ASU-CNS-3-finalpaper2-2024
  concept and is held rather than re-minted (see LEDGER).

  Import: Admin › Bulk import → concept.
-->

# Item

## label
The external laryngeal nerve accompanies the superior thyroid artery and is at risk during upper-pole ligation in thyroidectomy

## id
CON-END-2EE25A7B08EAAD

## canonical_key
larynx.external-laryngeal-nerve.superior-thyroid-artery-relation

## definition
The external (motor) branch of the superior laryngeal nerve descends closely applied to the superior thyroid artery as the artery runs to the upper pole of the thyroid gland, before the nerve turns medially to supply the cricothyroid muscle. Because the nerve and artery run together over this final stretch, ligating the superior thyroid artery pedicle high and away from the gland (rather than flush with the upper pole) is the standard manoeuvre taught to avoid injuring the nerve during thyroidectomy.

## explicit_objective
State that the external laryngeal nerve accompanies the superior thyroid artery to the upper pole of the thyroid gland, and that this relation is the reason superior pedicle ligation is kept close to the gland capsule.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-ANA-T06

## secondary_node_ids
SYS-END
DIS-ANA

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Anatomy > Thyroid vascular pedicle and nerve relations

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
0.85

## confidence
0.85

## topic
Anatomy

## subtopic
Thyroid gland relations

## microtopic


## nanotopic


## aliases
External branch of superior laryngeal nerve
Cricothyroid motor nerve

## pitfalls
Confusing the external laryngeal nerve (motor to cricothyroid, runs with the superior thyroid artery) with the recurrent laryngeal nerve (runs with the inferior thyroid artery/in the tracheoesophageal groove, motor to the other intrinsic laryngeal muscles).

## article_ids
ART-END-ASUENDO2EFC-EXTERNAL-LARYNGEAL-NERVE-SUPERIOR-THYROID-ARTERY

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Anatomy item 1: "The Superior thyroid artery is accompanied by which nerve? External laryngeal nerve."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent anatomy reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-NEU-20E60BB8BB7BA8

## related_article_ids
ART-END-ASUENDO2EFC-THYROID-ISTHMUS-TRACHEAL-RING-LEVEL


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
CON-NEU-20E60BB8BB7BA8

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
asu: Tested as Anatomy item 1 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
relatedConceptIds: CON-NEU-20E60BB8BB7BA8 ("External laryngeal motor supply", kau/neuro) states the identical fact from a different university's course; not reused directly because it carries no ASU/ASU-ENDO-2/asu scope and its subject/placement (neuro) does not match this endocrine-surgical-anatomy grain — cross-referenced instead of merged.
rejectedMergeCandidateIds: CON-NEU-20E60BB8BB7BA8 was read and rejected as a direct reuse target for the reason above; kept as a related concept, not merged.

---

# Item

## label
The pituitary fossa (hypophyseal fossa) is bounded anteriorly by the tuberculum sellae

## id
CON-END-CFEECB4CBC6FA1

## canonical_key
pituitaryfossa.tuberculum-sellae.anterior-relation

## definition
The hypophyseal (pituitary) fossa, the saddle-shaped depression on the upper surface of the body of the sphenoid bone that houses the pituitary gland, is bounded anteriorly by the tuberculum sellae, posteriorly by the dorsum sellae, and inferiorly by the body of the sphenoid (which is hollowed out by the sphenoidal air sinuses). The tuberculum sellae is the low ridge immediately in front of the fossa, separating it from the optic groove/chiasmatic sulcus that lies further anteriorly.

## explicit_objective
Identify the tuberculum sellae as the anterior boundary of the pituitary (hypophyseal) fossa, distinguishing it from the dorsum sellae posteriorly.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-ANA-T06

## secondary_node_ids
SYS-END
DIS-ANA

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Anatomy > Pituitary fossa relations

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.3

## academic_relevance
0.85

## confidence
0.85

## topic
Anatomy

## subtopic
Pituitary gland relations

## microtopic


## nanotopic


## aliases
Hypophyseal fossa boundaries
Sella turcica anterior wall

## pitfalls
Swapping the tuberculum sellae (anterior boundary) with the dorsum sellae (posterior boundary) of the pituitary fossa.

## article_ids
ART-END-ASUENDO2EFC-TUBERCULUM-SELLAE-PITUITARY-RELATION

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Anatomy item 2: "The pituitary gland is related anteriorly to? Tuberculum sellae."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent anatomy reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids


## related_article_ids
ART-END-ASUENDO2EFC-PITUITARY-FOSSA-SPHENOID-RELATION


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
asu: Tested as Anatomy item 2 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
sourceCandidateIds: Duplicate search covered "tuberculum sellae" and "pituitary sphenoid"; no same-grain existing record found.

---

# Item

## label
The infundibular process (part of the neurohypophysis) develops from a downgrowth of the floor of the diencephalon

## id
CON-END-6A12335229F291

## canonical_key
neurohypophysis.infundibular-process.diencephalon-floor-origin

## definition
The infundibular process, together with the rest of the neurohypophysis (posterior pituitary lobe), develops from a neuroectodermal downgrowth of the floor of the diencephalon (the future hypothalamus), distinct from the adenohypophysis (anterior lobe), which develops separately from an upgrowth of oral ectoderm, Rathke's pouch. The two primordia meet and fuse to form the definitive pituitary gland, but each retains a different germ-layer-adjacent origin and a different secretory cell population (neurons/pituicytes versus true glandular epithelium).

## explicit_objective
State that the infundibular process/neurohypophysis develops from a downgrowth of the floor of the diencephalon, as distinct from the adenohypophysis's origin from Rathke's pouch.

## concept_type
process

## status
under review

## subject
endo

## primary_node_id
DIS-ANA-T06

## secondary_node_ids
SYS-END
DIS-ANA

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Anatomy > Pituitary gland embryology

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.3

## academic_relevance
0.85

## confidence
0.85

## topic
Anatomy

## subtopic
Pituitary gland embryology

## microtopic


## nanotopic


## aliases
Neurohypophysis origin
Posterior pituitary embryology

## pitfalls
Attributing the infundibular process to Rathke's pouch/oral ectoderm — that origin belongs to the adenohypophysis (anterior lobe), not the neurohypophysis.

## article_ids
ART-END-ASUENDO2EFC-INFUNDIBULAR-PROCESS-DIENCEPHALON-ORIGIN

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Anatomy item 3: "The Infundibular process is developed from? Floor Diencephalon."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent embryology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-CC394B835F860C

## related_article_ids
ART-END-ASUENDO2EFC-RATHKE-POUCH-PARS-DISTALIS


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
asu: Tested as Anatomy item 3 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
sourceCandidateIds: Duplicate search covered "neurohypophysis diencephalon"; no same-grain existing record found. "adenohypophysis"/"Rathke" searches found related but non-duplicate live kau records on the anterior-lobe side (CON-END-542CD5B22F0151 etc.), cross-referenced via relatedConceptIds on the pars-distalis record instead of here.
relatedConceptIds: CON-END-CC394B835F860C (this batch's own Rathke's-pouch/pars-distalis record) is the complementary anterior-lobe embryology fact.

---

# Item

## label
The pituitary gland as a whole is of ectodermal origin, from two separate ectodermal sources that meet and fuse

## id
CON-END-64A7D77DB559CD

## canonical_key
pituitarygland.ectodermal-origin.dual-lobe

## definition
Both lobes of the definitive pituitary gland are ectodermal in origin, though from two different ectodermal sources: the adenohypophysis (anterior lobe) arises from oral (surface) ectoderm as an upgrowth called Rathke's pouch, while the neurohypophysis (posterior lobe) arises from neuroectoderm as a downgrowth of the floor of the diencephalon. Despite this dual origin, an exam question asking simply "what germ layer does the pituitary gland arise from" is answered "ectoderm" for the whole organ, since no part of it is mesodermal or endodermal.

## explicit_objective
State that the pituitary gland as a whole is ectodermal in origin, recognising that this covers two distinct ectodermal sources (oral ectoderm anteriorly, neuroectoderm posteriorly) rather than a single shared primordium.

## concept_type
classification

## status
under review

## subject
endo

## primary_node_id
DIS-ANA-T06

## secondary_node_ids
SYS-END
DIS-ANA

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Anatomy > Pituitary gland embryology

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.25

## academic_relevance
0.85

## confidence
0.8

## topic
Anatomy

## subtopic
Pituitary gland embryology

## microtopic


## nanotopic


## aliases
Pituitary germ layer
Ectodermal origin of hypophysis

## pitfalls
Assuming the whole-gland "ectoderm" answer means both lobes share one embryonic primordium — the anterior and posterior lobes are separate ectodermal downgrowths/upgrowths that only later fuse.

## article_ids
ART-END-ASUENDO2EFC-PITUITARY-GLAND-ECTODERMAL-ORIGIN

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Anatomy item 4: "Pituitary Gland origin? Ectoderm."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent embryology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-542CD5B22F0151
CON-END-6A12335229F291

## related_article_ids
ART-END-ASUENDO2EFC-INFUNDIBULAR-PROCESS-DIENCEPHALON-ORIGIN


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
CON-END-542CD5B22F0151

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
asu: Tested as Anatomy item 4 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
rejectedMergeCandidateIds: CON-END-542CD5B22F0151 ("Adenohypophysis develops from oral ectoderm as Rathke-pouch upward growth from oral roof", live kau) states only the anterior-lobe half of this fact; this record's stem tests the whole-gland germ-layer classification (the source's own separate, simpler MCQ), so it was cross-referenced rather than reused as the sole concept.

---

# Item

## label
The thyroid isthmus overlies the second to fourth tracheal rings

## id
CON-END-20F2AF8E86D719

## canonical_key
thyroidisthmus.tracheal-rings.level

## definition
The isthmus of the thyroid gland, the band of glandular tissue connecting the lower parts of the two lateral lobes, lies anterior to the trachea at the level of the second to fourth tracheal rings, just below the cricoid cartilage.

## explicit_objective
State that the thyroid isthmus overlies the second to fourth tracheal rings.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-ANA-T06

## secondary_node_ids
SYS-END
DIS-ANA

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Anatomy > Thyroid gland relations

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.4

## academic_relevance
0.85

## confidence
0.85

## topic
Anatomy

## subtopic
Thyroid gland relations

## microtopic


## nanotopic


## aliases
Thyroid isthmus level
Isthmus tracheal ring relation

## pitfalls
Placing the isthmus at the level of the cricoid cartilage itself rather than the tracheal rings just below it.

## article_ids
ART-END-ASUENDO2EFC-THYROID-ISTHMUS-TRACHEAL-RING-LEVEL

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Anatomy item 5: "Level of the thyroid isthmus? tracheal rings."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent anatomy reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors. The source states "tracheal rings" without naming which rings; the 2nd-4th range authored here is standard gross-anatomy teaching (e.g. Gray's/BD Chaurasia), not itself printed in the source.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids


## related_article_ids
ART-END-ASUENDO2EFC-THYROID-ISTHMUS-INFERIOR-BORDER-RELATIONS


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
asu: Tested as Anatomy item 5 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own. The printed answer names only "tracheal rings"; the specific 2nd-4th range is standard-textbook fill-in, flagged in evidenceGaps.
sourceCandidateIds: Duplicate search covered "thyroid isthmus"; found three different-grain live kau records (upper-border arterial anastomosis, isthmus-connects-lobes, lower-border veins) — none states the isthmus's vertical tracheal-ring level, so no duplicate.

---

# Item

## label
The anterior wall of Rathke's pouch thickens to form the pars distalis of the adenohypophysis

## id
CON-END-CC394B835F860C

## canonical_key
rathkepouch.pars-distalis.derivative

## definition
Rathke's pouch, the ectodermal upgrowth from the roof of the primitive oral cavity (stomodeum), gives rise to the entire adenohypophysis (anterior pituitary). Its anterior wall proliferates and thickens to form the pars distalis, the largest and functionally dominant part of the anterior lobe, while its posterior wall stays thin and forms the pars intermedia; a further outgrowth around the infundibular stalk forms the pars tuberalis.

## explicit_objective
State that the pars distalis of the adenohypophysis develops from the thickened anterior wall of Rathke's pouch.

## concept_type
process

## status
under review

## subject
endo

## primary_node_id
DIS-ANA-T06

## secondary_node_ids
SYS-END
DIS-ANA

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Anatomy > Pituitary gland embryology

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.3

## academic_relevance
0.85

## confidence
0.85

## topic
Anatomy

## subtopic
Pituitary gland embryology

## microtopic


## nanotopic


## aliases
Pars distalis origin
Rathke pouch derivatives

## pitfalls
Attributing the pars distalis to the posterior wall of Rathke's pouch — that thin posterior wall forms the pars intermedia, not the pars distalis.

## article_ids
ART-END-ASUENDO2EFC-RATHKE-POUCH-PARS-DISTALIS

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Anatomy item 6: "What structure in the adult human body develops from Ratheck's pouch during embryonic development? pars distalis."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent embryology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-542CD5B22F0151
CON-END-233C23C04836BD
CON-END-6A12335229F291

## related_article_ids
ART-END-ASUENDO2EFC-INFUNDIBULAR-PROCESS-DIENCEPHALON-ORIGIN


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
CON-END-542CD5B22F0151
CON-END-233C23C04836BD

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
asu: Tested as Anatomy item 6 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
rejectedMergeCandidateIds: CON-END-542CD5B22F0151 ("Adenohypophysis develops from oral ectoderm as Rathke-pouch upward growth from oral roof", live kau) and CON-END-233C23C04836BD ("Adenohypophysis comprises pars tuberalis, distalis, and intermedia...", live kau) both sit one grain up (whole-gland origin / whole-lobe composition) from this record's specific pars-distalis-from-anterior-wall derivation fact; cross-referenced rather than reused, since neither is scoped to ASU-ENDO-2/asu.

---

# Item

## label
The inferior border of the thyroid isthmus is related to the inferior thyroid veins and, when present, the thyroid ima artery

## id
CON-END-D9444932874ACF

## canonical_key
thyroidisthmus.inferior-border.vein-artery-relations

## definition
The inferior border of the thyroid isthmus is related to the inferior thyroid veins, which begin here and descend to drain into the left brachiocephalic vein, and, in a variable minority of individuals, to the thyroid ima artery, an inconstant vessel that ascends from the aortic arch or brachiocephalic trunk to reach the isthmus. Surgeons note both structures at this border because they cross the midline low in the neck and can bleed troublesomely if not secured during a tracheostomy or thyroidectomy.

## explicit_objective
List the inferior thyroid veins and the (inconstant) thyroid ima artery as the structures related to the inferior border of the thyroid isthmus.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-ANA-T06

## secondary_node_ids
SYS-END
DIS-ANA

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Anatomy > Thyroid gland relations

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.45

## academic_relevance
0.85

## confidence
0.8

## topic
Anatomy

## subtopic
Thyroid gland relations

## microtopic


## nanotopic


## aliases
Thyroid isthmus lower border relations
Thyroid ima artery

## pitfalls
Naming the superior thyroid arteries (which relate to the upper border of the isthmus) instead of the inferior thyroid veins/thyroid ima artery at the lower border.

## article_ids
ART-END-ASUENDO2EFC-THYROID-ISTHMUS-INFERIOR-BORDER-RELATIONS

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Anatomy item 7: "The inferior border of thyroid isthmus is related to? Inferior thyroid vein & thyroid IMA artery."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent anatomy reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-428AB6DC5204F1

## related_article_ids
ART-END-ASUENDO2EFC-THYROID-ISTHMUS-TRACHEAL-RING-LEVEL


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
CON-END-428AB6DC5204F1

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
asu: Tested as Anatomy item 7 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
rejectedMergeCandidateIds: CON-END-428AB6DC5204F1 ("Inferior thyroid veins at the lower isthmus border", live kau) states only the venous half of this fact, not the thyroid ima artery; cross-referenced rather than reused, since it is not scoped to ASU-ENDO-2/asu and does not cover the full printed answer.

---

# Item

## label
The superior parathyroid glands develop from the fourth pharyngeal pouch

## id
CON-END-79018080C5BA4C

## canonical_key
parathyroidsuperior.pharyngeal-pouch-4.origin

## definition
The superior parathyroid glands develop from the dorsal part of the fourth pharyngeal pouch, alongside the ultimobranchial body, and descend only a short, consistent distance with the developing thyroid gland, which is why their adult position is comparatively constant near the middle of the posterior border of the thyroid lobe. This contrasts with the inferior parathyroid glands, which develop from the third pharyngeal pouch alongside the thymus and undergo a longer, more variable descent.

## explicit_objective
State that the superior parathyroid glands develop from the fourth pharyngeal pouch, contrasted with the third-pouch origin of the inferior parathyroid glands.

## concept_type
process

## status
under review

## subject
endo

## primary_node_id
DIS-ANA-T06

## secondary_node_ids
SYS-END
DIS-ANA

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Anatomy > Parathyroid gland embryology

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.4

## academic_relevance
0.85

## confidence
0.85

## topic
Anatomy

## subtopic
Parathyroid gland embryology

## microtopic


## nanotopic


## aliases
Superior parathyroid origin
Fourth pharyngeal pouch derivatives

## pitfalls
Swapping the superior parathyroid's fourth-pouch origin with the inferior parathyroid's third-pouch origin (the inferior gland travels further and more variably because it migrates with the thymus).

## article_ids
ART-END-ASUENDO2EFC-SUPERIOR-PARATHYROID-FOURTH-POUCH

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Anatomy item 8: "Development of the superior parathyroid gland? 4th pharyngeal pouch."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent embryology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids


## related_article_ids
ART-END-ASUENDO2EFC-RATHKE-POUCH-PARS-DISTALIS


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
asu: Tested as Anatomy item 8 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
sourceCandidateIds: Duplicate search covered "4th pharyngeal pouch" and "superior parathyroid"; no same-grain existing record found. "inferior parathyroid" found this university's own pending ASU-CNS-3-finalpaper2-2024 concept/question on the third-pouch/inferior-parathyroid fact — that is the complementary, not duplicate, fact and is held rather than re-authored here (see LEDGER item Anatomy-q10).

---

# Item

## label
The superior suprarenal (adrenal) arteries arise from the inferior phrenic artery

## id
CON-END-5D46A4787AE40C

## canonical_key
suprarenalsuperior.inferior-phrenic-artery.supply

## definition
Each suprarenal gland has three arterial sources of differing origin: the superior suprarenal arteries (multiple small branches) arise from the inferior phrenic artery, the middle suprarenal artery arises directly from the abdominal aorta, and the inferior suprarenal artery arises from the renal artery. This three-tier supply is a classic exam point because it names a different parent vessel for each tier.

## explicit_objective
State that the superior suprarenal arteries arise from the inferior phrenic artery, as the first tier of the suprarenal gland's three-source arterial supply.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-ANA-T05

## secondary_node_ids
SYS-END
DIS-ANA

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Anatomy > Suprarenal gland vascular supply

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.35

## academic_relevance
0.85

## confidence
0.85

## topic
Anatomy

## subtopic
Suprarenal gland vascular supply

## microtopic


## nanotopic


## aliases
Suprarenal arterial supply
Superior suprarenal artery origin

## pitfalls
Assigning the aorta or the renal artery to the superior suprarenal arteries — those are the origins of the middle and inferior suprarenal arteries respectively, not the superior.

## article_ids
ART-END-ASUENDO2EFC-SUPERIOR-SUPRARENAL-INFERIOR-PHRENIC-ARTERY

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Anatomy item 11: "Which of the following gives supply to the superior suprarenal/adrenal glands? Inferior phrenic artery."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent anatomy reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids


## related_article_ids
ART-END-ASUENDO2EFC-RIGHT-SUPRARENAL-LIVER-RELATION


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
asu: Tested as Anatomy item 11 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
sourceCandidateIds: Duplicate search covered "superior suprarenal artery" and "inferior phrenic artery"; no same-grain existing record found.

---

# Item

## label
The pituitary fossa is related inferiorly to the body of the sphenoid bone and the sphenoidal air sinuses

## id
CON-END-4DE2E7280E31D2

## canonical_key
pituitaryfossa.sphenoid-body.inferior-relation

## definition
The floor of the pituitary (hypophyseal) fossa is formed by the body of the sphenoid bone, which is hollowed out by the paired sphenoidal air sinuses lying immediately inferior to the gland. This thin bony floor is the surgical route for the transsphenoidal approach to the pituitary gland, entering through the sphenoidal sinus from below.

## explicit_objective
State that the pituitary gland is related inferiorly to the body of the sphenoid bone and the sphenoidal air sinuses it contains.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-ANA-T06

## secondary_node_ids
SYS-END
DIS-ANA

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Anatomy > Pituitary fossa relations

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.45

## academic_relevance
0.85

## confidence
0.85

## topic
Anatomy

## subtopic
Pituitary gland relations

## microtopic


## nanotopic


## aliases
Pituitary fossa floor
Sphenoidal sinus pituitary relation

## pitfalls
Naming the optic chiasma (a superior relation) or the cavernous sinus (a lateral relation) instead of the sphenoid body/sphenoidal sinus for the inferior relation of the pituitary gland.

## article_ids
ART-END-ASUENDO2EFC-PITUITARY-FOSSA-SPHENOID-RELATION

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Anatomy item 9: "What's the inferior relation of the pituitary gland? Body of sphenoid / sphenoidal air sinus."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent anatomy reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-CFEECB4CBC6FA1

## related_article_ids
ART-END-ASUENDO2EFC-TUBERCULUM-SELLAE-PITUITARY-RELATION


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
asu: Tested as Anatomy item 9 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
sourceCandidateIds: Duplicate search covered "pituitary sphenoid" and "sphenoidal air sinus"; the latter found only an unrelated pending AU-MED-106 question about sinus drainage, not a duplicate of this fossa-relation fact.
relatedConceptIds: CON-END-CFEECB4CBC6FA1 (this batch's own tuberculum-sellae anterior-relation record) is the complementary boundary fact for the same fossa.

---

# Item

## label
Anterior pituitary gonadotropins (FSH and LH) act on the testes and ovaries

## id
CON-END-010F84429473A0

## canonical_key
anteriorpituitary.gonadotropins.gonad-target

## definition
The anterior pituitary (adenohypophysis) secretes the gonadotropins follicle-stimulating hormone (FSH) and luteinising hormone (LH), which act on the gonads: in the testes, FSH acts on Sertoli cells to support spermatogenesis and LH acts on Leydig cells to stimulate testosterone production; in the ovaries, FSH drives follicular growth and LH triggers ovulation and supports the corpus luteum. Gonadotropin release is itself driven by hypothalamic GnRH and is subject to negative feedback from gonadal sex steroids and inhibin.

## explicit_objective
State that the anterior pituitary's gonadotropins, FSH and LH, act on the testes and ovaries.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
SYS-END-T02-S01

## secondary_node_ids
DIS-ANA

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Anatomy > Anterior pituitary hormone targets

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.4

## academic_relevance
0.85

## confidence
0.85

## topic
Anatomy

## subtopic
Anterior pituitary hormone targets

## microtopic


## nanotopic


## aliases
Gonadotropins
FSH and LH targets

## pitfalls
Confusing gonadotropins (FSH/LH, acting on gonads) with the other anterior pituitary hormones that act on non-gonadal endocrine organs (ACTH on the adrenal cortex, TSH on the thyroid) or directly on peripheral tissue (GH, prolactin).

## article_ids
ART-END-ASUENDO2EFC-ANTERIOR-PITUITARY-GONADOTROPINS

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Anatomy item 12: "The Anterior lobe of the pituitary gland controls? Testes and ovaries."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent physiology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids


## related_article_ids
ART-END-ASUENDO2EFC-PITUITARY-FOSSA-SPHENOID-RELATION


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
asu: Tested as Anatomy item 12 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
sourceCandidateIds: Duplicate search covered "pituitary gonads", "FSH LH gonads" and "gonadotropin" (the last found only unrelated OB/hCG records); no same-grain existing record found.
placement: Primary placement is SYS-END-T02-S01 (anterior pituitary disease subtopic) as the closest disease-tree leaf for anterior pituitary hormone action; secondary is the anatomy discipline root since the source item is framed anatomically ("anterior lobe controls").

---

# Item

## label
The right suprarenal gland is related anteriorly to the bare area of the liver

## id
CON-END-ACD6ECA5E264A8

## canonical_key
suprarenalright.liver.anterior-relation

## definition
The right suprarenal gland, pyramidal in shape and capping the upper pole of the right kidney, is related anteriorly to the bare area of the liver (with a small lower part related to the duodenum) and medially to the inferior vena cava, which the gland lies close against. This contrasts with the left suprarenal gland, which is related anteriorly to the stomach (via the lesser sac), the pancreas and splenic vessels.

## explicit_objective
State that the right suprarenal gland is related anteriorly to the liver, as distinct from the left suprarenal gland's anterior relations to the stomach and pancreas.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
DIS-ANA-T05

## secondary_node_ids
SYS-END
DIS-ANA

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Anatomy > Suprarenal gland relations

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.35

## academic_relevance
0.85

## confidence
0.85

## topic
Anatomy

## subtopic
Suprarenal gland relations

## microtopic


## nanotopic


## aliases
Right suprarenal gland relations
Suprarenal gland side-difference relations

## pitfalls
Applying the left suprarenal gland's anterior relations (stomach, pancreas, splenic vessels) to the right gland, whose anterior relation is the liver, not the stomach.

## article_ids
ART-END-ASUENDO2EFC-RIGHT-SUPRARENAL-LIVER-RELATION

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Anatomy item 13: "Which structure is present in front of the right suprarenal gland? Liver."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent anatomy reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids


## related_article_ids
ART-END-ASUENDO2EFC-SUPERIOR-SUPRARENAL-INFERIOR-PHRENIC-ARTERY


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
asu: Tested as Anatomy item 13 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
sourceCandidateIds: Duplicate search covered "suprarenal gland liver" and "suprarenal liver"; no same-grain existing record found.

---

# Item

## label
Type 2 diabetes mellitus, not type 1, accounts for approximately 90% of diagnosed diabetes cases

## id
CON-END-627E456578FF09

## canonical_key
diabetesmellitus.type2-prevalence.90-percent

## definition
Of the total burden of diagnosed diabetes mellitus, type 2 diabetes accounts for the large majority, approximately 90% of cases, driven mainly by insulin resistance with a background of genetic predisposition, obesity and physical inactivity. Type 1 diabetes, an autoimmune beta-cell-destructive disease, accounts for only a minority of cases (roughly 5-10%); the remainder is made up of gestational and other specific types.

## explicit_objective
State that type 2 diabetes, not type 1, accounts for approximately 90% of diabetes mellitus cases.

## concept_type
classification

## status
under review

## subject
endo

## primary_node_id
SYS-END-T06-S01

## secondary_node_ids
DIS-PHR-T01

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Community Medicine > Diabetes mellitus epidemiology

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
0.75

## confidence
0.85

## topic
Community Medicine

## subtopic
Diabetes mellitus epidemiology

## microtopic


## nanotopic


## aliases
Type 2 diabetes prevalence
Diabetes subtype burden

## pitfalls
Assuming type 1 diabetes is the more common subtype because it is diagnosed earlier in life and taught first — type 2 diabetes carries the large majority of the overall disease burden.

## article_ids
ART-END-ASUENDO2EFC-DIABETES-TYPE2-PREVALENCE

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Community item 1: "Which of the following is true about DM? Type 1 is not 90%."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent epidemiology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids


## related_article_ids
ART-END-ASUENDO2EFC-FAMILY-HISTORY-TYPE2-DIABETES-RISK


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
asu: Tested as Community item 1 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem ("Type 1 is not 90%"), no printed distractors — this batch authors its own, restated affirmatively (type 2 is ~90%) for a clean single-best-answer stem.
sourceCandidateIds: Duplicate search covered "type 2 diabetes 90%" and "family history diabetes"; no same-grain existing record found.

---

# Item

## label
Iodine deficiency is the main risk factor for endemic hypothyroidism

## id
CON-END-FA0BF82B7CEC1D

## canonical_key
hypothyroidism.iodine-deficiency.risk-factor

## definition
Dietary iodine deficiency is the leading cause and main modifiable risk factor for hypothyroidism worldwide, since iodine is an obligatory substrate for thyroid hormone synthesis and its chronic shortage first causes compensatory goitre and, if severe or prolonged, overt hypothyroidism. In iodine-sufficient populations, autoimmune (Hashimoto) thyroiditis becomes the leading cause instead, so the "main risk factor" answer is population-dependent, but iodine deficiency remains the classic community-medicine teaching point for endemic hypothyroidism risk.

## explicit_objective
State that iodine deficiency is the main risk factor for endemic hypothyroidism at the population level.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
SYS-END-T03-S01-M01

## secondary_node_ids
DIS-PHR-T01

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Community Medicine > Thyroid disease risk factors

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
0.75

## confidence
0.8

## topic
Community Medicine

## subtopic
Thyroid disease risk factors

## microtopic


## nanotopic


## aliases
Endemic hypothyroidism risk factor
Iodine deficiency and thyroid disease

## pitfalls
Treating iodine deficiency as the leading cause of hypothyroidism everywhere — in iodine-replete populations, autoimmune (Hashimoto) thyroiditis is the leading cause instead; this record captures the standard community-medicine/endemic-goitre teaching point, not a universal claim.

## article_ids
ART-END-ASUENDO2EFC-IODINE-DEFICIENCY-HYPOTHYROIDISM-RISK

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Community item 2: "What's the main risk factor for hypothyroidism? Iodine deficiency."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent epidemiology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-0B4EA291F331D5

## related_article_ids
ART-END-ASUENDO2EFC-PRIMARY-PREVENTION-THYROID-HEALTH-EDUCATION


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
CON-END-0B4EA291F331D5

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
asu: Tested as Community item 2 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
rejectedMergeCandidateIds: CON-END-0B4EA291F331D5 ("Chronic iodine deficiency can cause hypothyroidism", live kau) states the causal mechanism; this record states the community-medicine "main risk factor" framing of the same underlying fact — cross-referenced rather than reused, since the kau record is not scoped to ASU-ENDO-2/asu and is framed as physiology rather than a risk-factor classification.

---

# Item

## label
Smoking is a modifiable risk factor for thyroid disease

## id
CON-END-BA41062BB9C475

## canonical_key
thyroiddisease.smoking.modifiable-risk-factor

## definition
Cigarette smoking is a modifiable (behavioural) risk factor for thyroid disease: it is associated with an increased risk of Graves disease and, most notably, with more severe and more frequent thyroid-associated (Graves) ophthalmopathy in patients who already have Graves disease, likely via thiocyanate and other combustion-product effects on thyroid autoimmunity and orbital tissue. Because it is a behaviour that can be changed, smoking is classed as a modifiable risk factor, unlike fixed factors such as sex or family history.

## explicit_objective
State that smoking is a modifiable risk factor for thyroid disease, particularly for Graves disease and its ophthalmopathy.

## concept_type
definition

## status
under review

## subject
endo

## primary_node_id
SYS-END-T03-S01-M02

## secondary_node_ids
DIS-PHR-T01

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Community Medicine > Thyroid disease risk factors

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
Community Medicine

## subtopic
Thyroid disease risk factors

## microtopic


## nanotopic


## aliases
Smoking and Graves disease
Modifiable thyroid disease risk factor

## pitfalls
Confusing this modifiable behavioural risk factor (smoking) with unmodifiable risk factors for thyroid disease (such as sex or family history of autoimmune thyroid disease).

## article_ids
ART-END-ASUENDO2EFC-SMOKING-THYROID-DISEASE-RISK

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Community item 3: "Which of the following is a modifiable risk factor for Thyroid diseases? Smoking."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent epidemiology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids


## related_article_ids
ART-END-ASUENDO2EFC-IODINE-DEFICIENCY-HYPOTHYROIDISM-RISK


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
asu: Tested as Community item 3 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
sourceCandidateIds: Duplicate search covered "family history diabetes" and "tertiary prevention"; no same-grain existing record found for this or the sibling community items below.

---

# Item

## label
A family history of type 2 diabetes is an unmodifiable risk factor

## id
CON-END-DD0FF423A1134B

## canonical_key
diabetestype2.family-history.unmodifiable-risk-factor

## definition
A family history of type 2 diabetes mellitus is an unmodifiable (fixed) risk factor, reflecting an inherited polygenic predisposition that cannot be changed by the individual, in contrast with modifiable behavioural/environmental risk factors for type 2 diabetes such as obesity, physical inactivity and diet, which can be targeted by intervention.

## explicit_objective
Classify a family history of type 2 diabetes as an unmodifiable risk factor, distinct from modifiable risk factors such as obesity and inactivity.

## concept_type
classification

## status
under review

## subject
endo

## primary_node_id
SYS-END-T06-S01
## secondary_node_ids
DIS-PHR-T01

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Community Medicine > Diabetes mellitus risk factors

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
Community Medicine

## subtopic
Diabetes mellitus risk factors

## microtopic


## nanotopic


## aliases
Unmodifiable diabetes risk factor
Family history and type 2 diabetes

## pitfalls
Classing family history as modifiable, or confusing it with modifiable risk factors for the same disease (obesity, inactivity, diet).

## article_ids
ART-END-ASUENDO2EFC-FAMILY-HISTORY-TYPE2-DIABETES-RISK

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Community item 4: "Which of the following is an unmodifiable risk factor? Presence of family history for DM type2."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent epidemiology reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids


## related_article_ids
ART-END-ASUENDO2EFC-DIABETES-TYPE2-PREVALENCE


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
asu: Tested as Community item 4 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.

---

# Item

## label
Screening and controlling hypertension in an established diabetic patient is an example of tertiary prevention

## id
CON-END-87CA5C0E17D790

## canonical_key
diabetescomplications.hypertension-control.tertiary-prevention

## definition
In a patient already diagnosed with diabetes mellitus, screening for and controlling coexisting hypertension is an example of tertiary prevention, since it aims to limit the progression of established disease and reduce diabetic complications (particularly nephropathy, retinopathy and cardiovascular disease) rather than to prevent diabetes from occurring (primary prevention) or to detect it at an early asymptomatic stage in someone not yet diagnosed (secondary prevention).

## explicit_objective
Classify hypertension screening/control in an already-diagnosed diabetic patient as tertiary prevention, distinguishing it from primary and secondary prevention.

## concept_type
classification

## status
under review

## subject
endo

## primary_node_id
SYS-END-T06-S01-M04

## secondary_node_ids
DIS-FCM-T03

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Community Medicine > Levels of prevention

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
0.75

## confidence
0.8

## topic
Community Medicine

## subtopic
Levels of prevention

## microtopic


## nanotopic


## aliases
Tertiary prevention example
Diabetes complication prevention

## pitfalls
Confusing tertiary prevention (limiting complications in a patient with established disease) with secondary prevention (early detection by screening in an undiagnosed, asymptomatic person) or primary prevention (stopping the disease occurring at all, e.g. population health education).

## article_ids
ART-END-ASUENDO2EFC-TERTIARY-PREVENTION-DIABETES-HYPERTENSION

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Community item 5: "Which of the following is a 3ry prevention for DM? Check HTN."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent public-health reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-76B785A732EBFB

## related_article_ids
ART-END-ASUENDO2EFC-PRIMARY-PREVENTION-THYROID-HEALTH-EDUCATION


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
asu: Tested as Community item 5 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
relatedConceptIds: CON-END-76B785A732EBFB (this batch's own primary-prevention/health-education record) is the complementary opposite-tier prevention-levels fact.

---

# Item

## label
Community health education on adequate dietary iodine intake is an example of primary prevention for thyroid disease

## id
CON-END-76B785A732EBFB

## canonical_key
thyroiddisease.health-education.primary-prevention

## definition
Community-level health education promoting adequate dietary iodine intake (for example through iodised salt) is an example of primary prevention for thyroid disease, since it acts before disease onset to remove or reduce a population risk factor (iodine deficiency), rather than detecting existing disease early (secondary prevention) or managing established disease (tertiary prevention).

## explicit_objective
Classify community health education on adequate iodine intake as primary prevention for thyroid disease, distinguishing it from secondary and tertiary prevention.

## concept_type
classification

## status
under review

## subject
endo

## primary_node_id
SYS-END-T03-S01
## secondary_node_ids
DIS-FCM-T03

## modules
ASU-ENDO-2

## module_subject
ASU-ENDO-2 > Community Medicine > Levels of prevention

## universities
asu

## learner_years
2

## blueprint_weight
0.3

## exam_weight_by_year
ASU_Y2=0.3

## clinical_relevance
0.45

## academic_relevance
0.75

## confidence
0.8

## topic
Community Medicine

## subtopic
Levels of prevention

## microtopic


## nanotopic


## aliases
Primary prevention example
Iodine health education

## pitfalls
Confusing primary prevention (population-level health education before disease occurs) with secondary prevention (screening to detect thyroid disease early) or tertiary prevention (treating an already-diagnosed thyroid condition).

## article_ids
ART-END-ASUENDO2EFC-PRIMARY-PREVENTION-THYROID-HEALTH-EDUCATION

## support_mode
direct_statement

## original_wording
Endocrine Final MCQ Collection, Community item 6: "Which of the following is a 1ry prevention to thyroid diseases? Health education."

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent public-health reference not yet attached; current support is this ASU exam-bank compilation only, which ships an embedded answer/topic but no printed distractors.

## arabic_label


## arabic_aliases
[clear]

## related_concept_ids
CON-END-87CA5C0E17D790
CON-END-FA0BF82B7CEC1D

## related_article_ids
ART-END-ASUENDO2EFC-TERTIARY-PREVENTION-DIABETES-HYPERTENSION


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
asu: Tested as Community item 6 of the ASU-ENDO-2 EOM MCQ Final Collection (src_f3b44cd466398c8953b9), answer/topic stated before the stem, no printed distractors — this batch authors its own.
relatedConceptIds: CON-END-87CA5C0E17D790 (this batch's own tertiary-prevention record) is the complementary opposite-tier prevention-levels fact; CON-END-FA0BF82B7CEC1D (this batch's own iodine-deficiency-risk-factor record) is the risk factor this health-education intervention targets.
