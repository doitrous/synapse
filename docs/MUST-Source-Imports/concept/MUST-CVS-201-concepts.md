<!--
  MUST-CVS-201 concept batch — tranche 1 (first-module authoring, S3).
  8 records: 1 sparse LIVE update, 7 new mints. See LANE-CARD-Y2.md and
  coverage/MUST-CVS-201-triage.md for the triage this batch authors from.
  Sources: src_240262ce3fe62cc799c0 (module-wide EOM written paper, Fall 2024,
  11 Qs) and src_7e15214661e511773a7a (Pathology EOM written paper by
  Dr.Maria, 8 Qs). Both native-text, no OCR needed.

  Validate:
    node scripts/content/gate.mjs batch docs/MUST-Source-Imports/concept/MUST-CVS-201-concepts.md \\
      --with docs/MUST-Source-Imports/article/MUST-CVS-201-articles.md
-->

# Item

## label
Acute rheumatic fever follows pharyngitis when anti-M-protein antibodies cross-react with joint, heart, and brain antigens

## id
CON-INF-311E67B2C55A90

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Pathology > Rheumatic Heart Disease > Rheumatic Fever Pathogenesis

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested as MW-Q2, "Explain the pathological mechanism responsible for the development of rheumatic fever" — printed answer: occurs 2-4 weeks after streptococcal pharyngitis (S. pyogenes); cross-reactive antibodies against streptococcal M protein react with heart, joint and brain tissue (molecular mimicry, type II hypersensitivity), src_240262ce3fe62cc799c0 p2.

---

# Item

## label
Amiodarone is a class III anti-arrhythmic that blocks potassium, calcium, alpha and beta receptors, with multi-organ toxicity

## id
CON-FND-C96DA44323A6B8

## canonical_key
amiodarone.class-iii-antiarrhythmic-moa-adverse-effects

## definition
Amiodarone is a broad-spectrum class III anti-arrhythmic drug that prolongs the effective refractory period and action potential duration mainly by blocking potassium channels; it also blocks calcium channels and alpha- and beta-adrenergic receptors, which is why it is described as broad-spectrum rather than a pure class III agent. Its important adverse effects span multiple organs: pulmonary toxicity, hepatic cirrhosis, corneal micro-deposits, thyroid dysfunction (an enlarged thyroid with hypo- or hyperthyroidism), photosensitivity, GIT upset and neurological side effects.

## explicit_objective
State amiodarone's antiarrhythmic class and mechanism of action, and list its important adverse effects across the organs it affects.

## pitfalls
Treating amiodarone as a pure class III (potassium-channel) drug. Its added calcium-channel and alpha/beta-receptor blockade is exactly why it is called broad-spectrum and why its adverse-effect profile spans so many organs rather than the heart alone.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id


## secondary_node_ids


## aliases
Amiodarone mechanism of action | Amiodarone adverse effects

## arabic_label


## arabic_aliases
[clear]

## topic
Pharmacology

## subtopic
Anti-arrhythmic drugs

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-FND-AMIODARONE

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_240262ce3fe62cc799c0

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-FND-AMIODARONE-MOA-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Pharmacology > Anti-arrhythmic Drugs > Amiodarone

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.7

## clinical_relevance
0.7

## academic_relevance
0.9

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[EOM MCQs - CVS201 Written Questions (Final) Fall 2024, p2] It's a Class III anti-arrhythmic drug that prolongs ERP & APD by blocking K+ & Ca+ channels also blocks Alpha & Beta receptors (Broad Spectrum anti-arrythmic drug). Adverse effects: Pulmonary toxicity, Hepatic cirrhosis, Corneal micro-deposits, enlarged thyroid with hypo- or hyperthyroidism, Photosensitivity, GIT upset and neurological side effects.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 1; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer sheet by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed written-question paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
moduleIds: MUST-CVS-201 is this concept's first module tag; no other lane has claimed it yet.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Atherosclerosis risk factors include hyperlipidaemia, hypertension, smoking, diabetes, age, male sex, obesity and stress

## id
CON-CVS-F44EBF69D14F3B

## canonical_key
atherosclerosis.risk-factors

## definition
Atherosclerosis — disease of large and medium arteries marked by atheromatous plaques in the intima — is predisposed to by hyperlipidaemia (raised LDL, lowered HDL), hypertension, smoking, diabetes mellitus, advancing age, male sex, obesity, stress, family history and lack of exercise.

## explicit_objective
List the factors that predispose to atherosclerosis, grouped as lipid, vascular, metabolic and lifestyle factors.

## pitfalls
Naming only hyperlipidaemia as "the" risk factor. Atherosclerosis is multifactorial; hypertension, smoking and diabetes each independently damage the endothelium and are tested as separately creditable risk factors.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Predisposing factors for atherosclerosis | Risk factors for atheroma

## arabic_label


## arabic_aliases
[clear]

## topic
Pathology

## subtopic
Atherosclerosis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-ATHEROSCLEROSIS-RISK-FACTORS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_240262ce3fe62cc799c0
src_7e15214661e511773a7a

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-ATHEROSCLEROSIS-RISK-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Pathology > Atherosclerosis > Risk Factors

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.7

## clinical_relevance
0.7

## academic_relevance
0.9

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[EOM MCQs - CVS201 Written Questions (Final) Fall 2024, p2] Hyperlipidemia (up LDL, down HDL), Hypertension, Smoking, Diabetes mellitus, Advancing age, Male sex, Obesity, Stress. [EOM MCQs - written pathology final by dr.maria, p1] Risk factors: Age, male sex, hyperlipidemia (LDL), smoking, hypertension, obesity, stress, family history, lack of exercise.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 1; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer sheet by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed written-question paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
moduleIds: MUST-CVS-201 is this concept's first module tag; no other lane has claimed it yet.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Malignant hypertension is severe progressive hypertension with fibrinoid necrosis, and its commonest cause of death is renal failure

## id
CON-CVS-8BFFDE83CC4617

## canonical_key
hypertension.malignant-definition-and-mortality-order

## definition
Malignant hypertension is severe, progressive hypertension, classically above 280/180 mmHg, with retinal haemorrhage, papilloedema and renal impairment. Its kidney changes are fibrinoid necrosis and onion-skin thickening of the arterioles. Untreated, it causes death, in order of frequency, from renal failure, heart failure, coronary heart disease and cerebral haemorrhage.

## explicit_objective
Define malignant hypertension, name its retinal, renal and arteriolar (kidney) changes, and give the causes of death in order of frequency.

## pitfalls
Treating malignant hypertension as only a very high number. The diagnosis requires acute target-organ damage — retinal haemorrhage/papilloedema and the fibrinoid-necrosis/onion-skin renal arteriolar change — not the blood pressure reading alone.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Accelerated hypertension | Malignant nephrosclerosis

## arabic_label


## arabic_aliases
[clear]

## topic
Pathology

## subtopic
Hypertension

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-MALIGNANT-HYPERTENSION

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_240262ce3fe62cc799c0
src_7e15214661e511773a7a

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-MALIGNANT-HTN-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Pathology > Hypertension > Malignant Hypertension

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.7

## clinical_relevance
0.8

## academic_relevance
0.9

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[EOM MCQs - CVS201 Written Questions (Final) Fall 2024, p3] Renal failure, Heart failure, Coronary heart disease, Cerebral hemorrhage. (in order of most common). [EOM MCQs - written pathology final by dr.maria, p2] Definition: Severe progressive hypertension (>280/180). Features: Retinal hemorrhage, papilledema, renal impairment. Kidney changes: Fibrinoid necrosis, onion-skin thickening. Causes of death: Renal failure, heart failure, cerebral hemorrhage.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 1; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer sheet by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed written-question paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
moduleIds: MUST-CVS-201 is this concept's first module tag; no other lane has claimed it yet. relatedConceptIds: CON-CVS-7A36E91351075C ("Hypertension is defined by the risk it carries", SYS-CVS-CONCEPT-T07.md, pending in another lane) is the general hypertension-definition concept; this record is the specific malignant/accelerated subtype with its own mortality-order fact and is not a duplicate.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Smooth muscle fibres are spindle-shaped, non-striated, non-branched cells with a single central nucleus and no T-tubules

## id
CON-MSK-FA3FAEDF08014F

## canonical_key
muscle.smooth-histological-features

## definition
Smooth muscle fibres are distinguished histologically by five features: they are spindle-shaped; non-striated (their actin and myosin filaments are not arranged into visible cross-striations); non-branched; each fibre has a single, centrally placed nucleus; and they have no T-tubule system.

## explicit_objective
List the histological features that distinguish smooth muscle fibres from skeletal and cardiac muscle.

## pitfalls
Assuming smooth muscle has no internal organisation because it is non-striated. "Non-striated" describes the light-microscopic appearance of the contractile filaments, not their absence; smooth muscle still contracts by actin-myosin sliding.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id


## secondary_node_ids


## aliases
Smooth muscle histological features | Distinguishing smooth muscle fibres

## arabic_label


## arabic_aliases
[clear]

## topic
Histology

## subtopic
Muscle tissue

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-MSK-SMOOTH-MUSCLE-HISTOLOGY

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_240262ce3fe62cc799c0

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-MSK-SMOOTH-MUSCLE-HISTOLOGY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Histology > Muscle Tissue > Smooth Muscle

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.6

## clinical_relevance
0.4

## academic_relevance
0.9

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[EOM MCQs - CVS201 Written Questions (Final) Fall 2024, p3] Spindle-shaped cells, Non-striated (Non-arranged actin and myosin filaments), Non-branched, Single centrally placed nucleus, No T-tubules (No tubular system).

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 1; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer sheet by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed written-question paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
moduleIds: MUST-CVS-201 is this concept's first module tag; no other lane has claimed it yet. subjectId: Placed under msk (histology of muscle tissue types) rather than cvs, matching the same placement Kasr 103-BMS used for its own skeletal/cardiac/smooth muscle comparison concept (CON-MSK-B080975D6171CF, docs/Kasr-Source-Imports/written/103-BMS-histology-department-written.md) even though it is taught inside a cardiovascular module here.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Fibrinous pericarditis is the commonest type of pericarditis, giving a bread-and-butter gross appearance

## id
CON-CVS-D7459E7855802A

## canonical_key
pericarditis.fibrinous-definition-and-causes

## definition
Fibrinous pericarditis is the commonest type of pericarditis, producing a rough, shaggy 'bread and butter' gross appearance on the pericardial surfaces. It follows rheumatic fever, lobar pneumonia, tuberculosis, uraemia, or as a complication over a myocardial infarction.

## explicit_objective
Name fibrinous pericarditis as the commonest type of pericarditis by its bread-and-butter gross appearance, and list its causes.

## pitfalls
Assuming pericarditis is always infective. Uraemia and post-myocardial-infarction (Dressler-type) pericarditis are both sterile causes of the same fibrinous, bread-and-butter appearance.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Bread and butter pericarditis

## arabic_label


## arabic_aliases
[clear]

## topic
Pathology

## subtopic
Pericardial disease

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-FIBRINOUS-PERICARDITIS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_7e15214661e511773a7a

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-FIBRINOUS-PERICARDITIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Pathology > Pericardial Disease > Fibrinous Pericarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.6

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[EOM MCQs - written pathology final by dr.maria, p1] Definition: Commonest type of pericarditis (bread and butter appearance). Causes: Rheumatic fever, lobar pneumonia, TB, anemia, over myocardial infarction.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 1; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer sheet by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed written-question paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
moduleIds: MUST-CVS-201 is this concept's first module tag; no other lane has claimed it yet. originalWording: The source paper prints "anemia" among the causes (as does the printed page, transcribed verbatim rather than silently corrected to the clinically expected "uraemia") — printed keys stand per LANE-CARD.md rule 2, so the definition text above keeps the printed word.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
The fatty streak is the earliest grossly visible lesion of atherosclerosis, made of lipid-laden foam cells

## id
CON-CVS-E87E4CDC5DE594

## canonical_key
atherosclerosis.fatty-streak-earliest-lesion

## definition
The fatty streak is the first grossly visible lesion in developing atherosclerosis, seen as flat yellow streaks in the arterial intima. Microscopically it is composed of foam cells — lipid-laden macrophages and smooth muscle cells. It occurs characteristically at the aortic valve and in the thoracic aorta.

## explicit_objective
Identify the fatty streak as the earliest grossly visible atherosclerotic lesion, describe its gross and microscopic appearance, and name its characteristic sites.

## pitfalls
Assuming the fatty streak is unique to smokers or the elderly. It is found even in children in some populations and is reversible, which is why it is taught as the earliest lesion rather than as disease itself.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Lipid streak | Earliest atherosclerotic lesion

## arabic_label


## arabic_aliases
[clear]

## topic
Pathology

## subtopic
Atherosclerosis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-FATTY-STREAK

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_7e15214661e511773a7a

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-FATTY-STREAK-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Pathology > Atherosclerosis > Fatty Streak

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.6

## clinical_relevance
0.5

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[EOM MCQs - written pathology final by dr.maria, p2] Definition: First grossly visible lesion in developing atherosclerosis. Gross: Flat yellow streaks in intima. Microscopy: Foam cells (lipid-laden macrophages and smooth muscle cells). Sites: Aortic valve and thoracic aorta.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 1; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer sheet by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed written-question paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
moduleIds: MUST-CVS-201 is this concept's first module tag; no other lane has claimed it yet. relatedConceptIds: CON-CVS-F44EBF69D14F3B (atherosclerosis risk factors, this same batch) is the predisposing-factors concept; this record is the specific earliest-lesion morphology and is not a duplicate.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Long-term arterial blood pressure regulation acts through the renin-angiotensin system, atrial natriuretic peptide and vasopressin control of ECF volume

## id
CON-CVS-A531FD56A171D7

## canonical_key
bloodpressure.long-term-regulation-ras-anp-vasopressin

## definition
Long-term arterial blood pressure (ABP) is regulated mainly by renal and endocrine mechanisms that control extracellular fluid (ECF, mainly plasma) volume, through three pathways. (1) The renin-angiotensin system: a fall in ABP causes renal ischaemia, which triggers renin secretion and angiotensin II formation; angiotensin II raises ABP by systemic vasoconstriction, catecholamine secretion, and ADH and aldosterone secretion. (2) Atrial natriuretic peptide (ANP): an increased ECF volume stretches atrial muscle fibres, triggering ANP secretion; ANP increases renal Na+ excretion and enhances the pressure-natriuresis mechanism, returning ECF volume and blood pressure to normal. (3) Vasopressin: a decreased ECF volume reduces the discharge of atrial low-pressure receptors, increasing vasopressin secretion, which decreases renal water excretion (water retention) to limit any further fall in ECF volume and arterial pressure.

## explicit_objective
Name the three mechanisms of long-term arterial blood pressure regulation and trace each from its trigger to its effect on ECF volume and blood pressure.

## pitfalls
Treating RAS, ANP and vasopressin as three independent systems rather than three levers on the same variable — ECF (plasma) volume. RAS and vasopressin both raise ABP by retaining fluid/promoting vasoconstriction when ECF volume falls, while ANP is the opposing, natriuretic mechanism triggered when ECF volume rises.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Long-term blood pressure regulation | Renin-angiotensin-ANP-vasopressin regulation of ABP

## arabic_label


## arabic_aliases
[clear]

## topic
Physiology

## subtopic
Arterial blood pressure regulation

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-LONG-TERM-BP-REGULATION

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_240262ce3fe62cc799c0

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-LONG-TERM-BP-REG-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Cardiovascular System > Arterial Blood Pressure Regulation

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.7

## clinical_relevance
0.6

## academic_relevance
0.9

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[EOM MCQs - CVS201 Written Questions (Final) Fall 2024, p3] The most important mechanism (Renal & Endocrine) regulates ABP by regulation of ECF (mainly plasma). 1- Renin-angiotensin-system (RAS): Drop of ABP causes renal ischemia which leads to renin secretion -> form Angiotensin II which elevate ABP by multiple mechanisms -> systemic VC, catecholamines secretion, ADH & Aldosterone secretion. 2- Atrial natriuretic peptides (ANP) secretion: Increased ECF volume stretches atrial muscle fiber leading to secretion of ANP. ANP increases Na+ excretion by the kidney and the volume of ECF decreases to normal. Blood pressure returns to normal. ANP enhances the activity of pressure natriuresis mechanism. 3- Vasopressin secretion: Decreased ECF volume results in decreased discharge of atrial low-pressure receptors. This leads to increased secretion of vasopressin which decreases water excretion by the kidneys (water retention).

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 1; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer sheet by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed written-question paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
moduleIds: MUST-CVS-201 is this concept's first module tag; no other lane has claimed it yet. relatedConceptIds: CON-CVS-56A68328FD03C7 ("local blood flow regulation, myogenic and metabolic autoregulation", docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md, pending in another lane) is short-term, local, intrinsic flow regulation; this record is the long-term, systemic, hormonal control of ABP itself and is not a duplicate.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Varicose veins are enlarged, tortuous superficial veins from chronically raised venous pressure and incompetent valves

## id
CON-CVS-F048262BCB7EED

## canonical_key
varicoseveins.definition-and-superficial-vein-dilation

## definition
A varicose vein is a superficial vein that has become permanently dilated and tortuous, most often in the leg, from sustained increase in venous pressure combined with weakness or incompetence of its valves. Once a valve fails, blood refluxes and pools in the segment below it, raising the pressure there and progressively distending and lengthening the vein wall, so the vessel is thrown into visible, palpable tortuous loops beneath the skin. Predisposing factors include prolonged standing, pregnancy, obesity and a family history of weak vein walls, all of which raise venous pressure or strain the valves over time.

## explicit_objective
Define a varicose vein and state the mechanism — raised venous pressure with valve incompetence — that produces its tortuous, dilated appearance.

## pitfalls
Confusing varicose veins (a chronic, valve-failure disorder of superficial veins) with deep vein thrombosis (an acute clot in a deep vein) — both are common "leg vein" exam stems, but one is a structural/valvular disorder and the other a thrombotic/inflammatory one, tested against different vignettes in this same source paper.

## concept_type
clinical_correlation

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Varicosities | Varicose vein disease

## arabic_label


## arabic_aliases
[clear]

## topic
Histology

## subtopic
Cardiovascular System

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-VARICOSE-VEINS

## related_article_ids


## related_concept_ids
CON-CVS-B29610035B568D | CON-CVS-92BB03F3D57E33

## resource_ids
src_0511bc2ebb43a689a4c6

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-VARICOSE-VEINS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Histology > Cardiovascular System > Veins > Varicose Veins

## universities
must

## learner_years
2

## blueprint_weight
0.15

## exam_weight_by_year
MUST_Y2=0.6

## clinical_relevance
0.7

## academic_relevance
0.8

## exam_signal
src_0511bc2ebb43a689a4c6 | end_of_module | 2024 | p1 | MUST-CVS-201

## weight_confidence
0.4

## confidence
0.7

## original_wording
[Histology CVS201 Questions (Final), Q8] A patient presents with enlarged, tortuous superficial veins in the leg. This is most likely due to: A) Atherosclerosis B) Varicose veins C) Arteritis D) Phlebosclerosis — printed answer B.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
relatedConceptIds: CON-CVS-B29610035B568D (vein classification; valves are the structure that fails here) is a pending Kasr 104-CPS concept, sparse-updated in pending-live/MUST-CVS-201-histology-concepts-overlay.md. CON-CVS-92BB03F3D57E33 (DVT/thrombophlebitis) is this same source paper's other leg-vein disorder, minted alongside this one, kept separate per the pitfalls note above rather than merged — they are different pathologies (valvular incompetence vs thrombosis) despite both testing "leg vein" recognition.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Deep vein thrombosis follows Virchow's triad (stasis, hypercoagulability, endothelial injury); inflamed clot is thrombophlebitis

## id
CON-CVS-92BB03F3D57E33

## canonical_key
dvt.risk-factors-and-thrombophlebitis-diagnosis

## definition
Deep vein thrombosis (DVT) is thrombus formation within a deep vein, classically in the leg, arising from Virchow's triad: venous stasis (immobility, prolonged bed rest, long-haul travel, varicose veins), hypercoagulability (pregnancy, malignancy, oral contraceptives, inherited thrombophilia) and endothelial injury (trauma, surgery, catheterisation). When the thrombosed segment also becomes inflamed — presenting with leg pain, swelling, warmth and redness over a palpable venous cord — the clinical diagnosis is thrombophlebitis, distinguishing it from a silent, asymptomatic DVT. Untreated, DVT's principal danger is embolisation of the clot to the pulmonary circulation as a pulmonary embolism.

## explicit_objective
State Virchow's triad as the mechanism behind DVT, name a risk factor from each arm (including that varicose veins themselves are a stasis-arm risk factor), and recognise the clinical picture of thrombophlebitis.

## pitfalls
Treating "risk factor for DVT" questions as if only immobility counts. Varicose veins are themselves a recognised DVT risk factor through the venous-stasis arm of Virchow's triad, which is why one source paper can test both facts as separate questions without contradiction — post-surgical bed rest (Q20) and pre-existing varicose veins are two different routes to the same stasis mechanism.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Deep vein thrombosis | Thrombophlebitis | DVT

## arabic_label


## arabic_aliases
[clear]

## topic
Histology

## subtopic
Cardiovascular System

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-DVT-THROMBOPHLEBITIS

## related_article_ids


## related_concept_ids
CON-CVS-F048262BCB7EED

## resource_ids
src_0511bc2ebb43a689a4c6

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-DVT-THROMBOPHLEBITIS-01
CLM-CVS-DVT-THROMBOPHLEBITIS-02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Histology > Cardiovascular System > Veins > Deep Vein Thrombosis

## universities
must

## learner_years
2

## blueprint_weight
0.15

## exam_weight_by_year
MUST_Y2=0.6

## clinical_relevance
0.75

## academic_relevance
0.8

## exam_signal
src_0511bc2ebb43a689a4c6 | end_of_module | 2024 | p6,p12 | MUST-CVS-201

## weight_confidence
0.4

## confidence
0.7

## original_wording
[Histology CVS201 Questions (Final), Q20] A patient with long bed rest after surgery develops deep vein thrombosis. Which condition is a risk factor? A) Varicose veins B) Arteriosclerosis C) Frostbite D) Hypertension — printed answer A. [Q46] A patient presents with leg pain, swelling, and redness. Ultrasound reveals a blood clot in a deep leg vein with inflammation. What is the most likely diagnosis? A) Varicose veins B) Thrombophlebitis C) Atherosclerosis D) Aneurysm — printed answer B.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the two claims minted alongside this concept (risk factors; thrombophlebitis diagnosis).
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
relatedConceptIds: CON-CVS-F048262BCB7EED (varicose veins) is this same source paper's other leg-vein disorder and is also named as one of this concept's own stasis-arm risk factors; kept separate per the pitfalls note — different pathologies (valvular incompetence vs thrombosis) even though one is a risk factor for the other.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Orcein is the histologic stain used to clearly visualise elastic laminae in the arterial wall

## id
CON-CVS-0AD4BCDFB88035

## canonical_key
elasticlamina.orcein-stain-for-arterial-wall-histology

## definition
Ordinary haematoxylin and eosin (H&E) staining does not clearly resolve the elastic laminae of an artery wall, so a special elastic stain is used instead. Orcein is the stain named for this purpose in the module's histology teaching: it selectively colours elastic fibres, so the internal and external elastic laminae and the concentric elastic membranes of the tunica media stand out sharply from the surrounding collagen and smooth muscle — the basis for counting elastic laminae to distinguish an elastic from a muscular artery, and for demonstrating the internal elastic lamina's fenestrations.

## explicit_objective
Name Orcein as the special stain used to visualise elastic laminae in the arterial wall, and state why H&E is insufficient for this purpose.

## pitfalls
Assuming any routine stain shows elastic fibres well. H&E stains the general tissue architecture but does not selectively highlight elastic fibres the way Orcein (or an equivalent elastic stain such as Verhoeff-Van Gieson) does, which is why counting elastic laminae to classify an artery specifically requires the special stain.

## concept_type
structural_description

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Elastic stain | Orcein stain

## arabic_label


## arabic_aliases
[clear]

## topic
Histology

## subtopic
Cardiovascular System

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-ELASTIC-LAMINA-STAIN

## related_article_ids


## related_concept_ids
CON-CVS-712BA581C8AF88

## resource_ids
src_0511bc2ebb43a689a4c6

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-ELASTIC-LAMINA-STAIN-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Histology > Cardiovascular System > Arteries > Elastic-Lamina Stain

## universities
must

## learner_years
2

## blueprint_weight
0.08

## exam_weight_by_year
MUST_Y2=0.4

## clinical_relevance
0.1

## academic_relevance
0.7

## exam_signal
src_0511bc2ebb43a689a4c6 | end_of_module | 2024 | p4 | MUST-CVS-201

## weight_confidence
0.4

## confidence
0.65

## original_wording
[Histology CVS201 Questions (Final), Q15] Which stain is used to clearly visualize elastic laminae in arteries? A) H&E B) Orcein C) PAS D) Masson's trichrome — printed answer B.

## evidence_gaps
Evidence must be attached before publication; only one source paper's printed key supports this, and Orcein's mechanism (why it selectively stains elastin) has not been independently verified against a histology reference text.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
relatedConceptIds: CON-CVS-712BA581C8AF88 (artery classification; a pending Kasr 104-CPS concept, sparse-updated in pending-live/MUST-CVS-201-histology-concepts-overlay.md) is the classification this stain is used to demonstrate — kept as a separate, narrower histotechnique fact rather than folded into it, since the printed source tests the stain name on its own.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
The short abdominal oesophagus is supplied by oesophageal branches of the left gastric artery, continuous with the coeliac-trunk supply of the stomach it joins

## id
CON-GIT-1817A46BEDC8BD

## canonical_key
esophagus.abdominal-part.left-gastric-artery-supply

## definition
The abdominal part of the oesophagus is its shortest segment, only about 1.25 cm long, running from the diaphragm's oesophageal hiatus in the right crus to the cardiac orifice of the stomach. Unlike the thoracic oesophagus above it, which receives oesophageal branches directly from the descending thoracic aorta, this short abdominal segment is supplied instead by oesophageal branches of the left gastric artery, itself the first and largest branch of the coeliac trunk — the same artery that supplies the lesser curvature of the stomach the abdominal oesophagus is continuous with.

## explicit_objective
State that the abdominal oesophagus is supplied by the left gastric artery, distinct from the thoracic oesophagus's direct aortic branches.

## pitfalls
Assuming the aorta's own thoracic oesophageal branches continue to supply the abdominal segment below the diaphragm. The hand-off to the coeliac-trunk-derived left gastric artery occurs exactly at the diaphragm, mirroring the same transition on the venous side (azygos system above, portal system below) that underlies oesophageal varices in portal hypertension.

## concept_type
structural_description

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id


## secondary_node_ids


## aliases
Abdominal oesophagus blood supply | Left gastric artery oesophageal branches

## arabic_label


## arabic_aliases
[clear]

## topic
Anatomy

## subtopic
Esophagus

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-GIT-ABDOMINAL-ESOPHAGUS-BLOOD-SUPPLY

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_ac0704bd16ff99889463

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-GIT-ABDOMINAL-ESOPHAGUS-SUPPLY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Anatomy > Esophagus > Abdominal Part

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.8

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Anatomy CVS201 Questions (Final), Esophagus Q15, p.22] The abdominal part of the esophagus is supplied by which artery? A) Inferior thyroid artery B) Descending thoracic aorta C) Left gastric artery D) Splenic artery — printed answer C, key p.24.

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
moduleIds: MUST-CVS-201 is this concept's first module tag; no other lane has claimed it yet.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
searchedBeforeMint: find-existing.mjs "left gastric artery", "abdominal esophagus" and "blood supply of abdominal esophagus" all returned no hit; a direct check of docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md's own oesophagus concept (CON-GIT-4E4EC465826CF2) confirmed it is scoped to the thoracic segment's constrictions and relations only, not the abdominal segment's blood supply — genuinely new, not a reuse miss.

---

# Item

## label
Staphylococcus aureus is the most common cause of acute infective endocarditis, including in intravenous drug users

## id
CON-INF-B85BC8B6AAB51A

## canonical_key
endocarditis.acute.staph-aureus-ivdu

## definition
Staphylococcus aureus is the leading cause of acute bacterial endocarditis. It classically infects a previously normal valve (often the tricuspid valve in intravenous drug users, via right-sided seeding from injection-site bacteraemia) and produces a fulminant illness with high fever, rapidly progressive valve destruction and a new regurgitant murmur within days, in contrast to the indolent course of subacute endocarditis.

## explicit_objective
State that staphylococcus aureus is the most common cause of acute infective endocarditis, including in intravenous drug users.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Infective Endocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-STAPH-AUREUS-ACUTE-ENDOCARDITIS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-B85BC8B6AAB51A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Infective Endocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p1] A 32-year-old IV drug user is admitted with high fever, chills and a rapidly progressive new regurgitant murmur. Which organism is most likely responsible for acute endocarditis in this setting? Answer: B. Staphylococcus aureus

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Staphylococcal sepsis progressing to acute valve destruction with embolic phenomena is the pattern of acute S. aureus endocarditis

## id
CON-INF-5CE506A0EE2F49

## canonical_key
endocarditis.acute.staph-aureus-embolic-valve-destruction

## definition
When Staphylococcus aureus bacteraemia is followed by rapid valve destruction and embolic lesions in distant organs such as the brain or spleen, this clinical pattern is characteristic of acute S. aureus endocarditis rather than the slower, less destructive course of subacute endocarditis due to Viridans streptococci.

## explicit_objective
State that staphylococcal sepsis progressing to acute valve destruction with embolic phenomena is the pattern of acute S. aureus endocarditis.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Infective Endocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-STAPH-AUREUS-EMBOLIC-PATTERN

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-5CE506A0EE2F49

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Infective Endocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p2] A hospitalized patient with staphylococcal sepsis later develops acute valve destruction with embolic phenomena to the brain and spleen. This pattern is most consistent with: Answer: B. Acute endocarditis due to Staphylococcus aureus

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Viridans streptococci adhere to damaged heart valves by synthesising a dextran biofilm from glucose

## id
CON-INF-5D7344B6B2EC3C

## canonical_key
endocarditis.viridans.dextran-biofilm-adherence

## definition
The virulence factor that lets Viridans streptococci colonise damaged or prosthetic heart valves is their ability to synthesise dextran, a sticky extracellular polysaccharide, from dietary glucose. This dextran biofilm lets the organism adhere firmly to fibrin-platelet deposits on an already-abnormal valve surface, rather than relying on toxins such as coagulase or Protein A used by staphylococci.

## explicit_objective
State that viridans streptococci adhere to damaged heart valves by synthesising a dextran biofilm from glucose.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Infective Endocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-VIRIDANS-DEXTRAN-ADHERENCE

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-5D7344B6B2EC3C

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Infective Endocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p1] Which virulence property explains why Viridans streptococci adhere to damaged valves? Answer: B. Dextran (biofilm) synthesis from glucose

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Serial blood cultures drawn before starting antibiotics are the best initial diagnostic test for suspected infective endocarditis

## id
CON-INF-DDBD3BC0EBA46E

## canonical_key
endocarditis.diagnosis.serial-blood-cultures-before-antibiotics

## definition
The single most important initial investigation in suspected infective endocarditis is a set of at least three serial blood cultures, drawn from separate venepuncture sites before any antibiotic is given. Because the bacteraemia of endocarditis is continuous rather than intermittent, serial sampling before treatment reliably identifies the causative organism and its susceptibilities, which a single sample or a sample taken after antibiotics have already been started may miss.

## explicit_objective
State that serial blood cultures drawn before starting antibiotics are the best initial diagnostic test for suspected infective endocarditis.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Infective Endocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-ENDOCARDITIS-BLOOD-CULTURE-DIAGNOSIS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-DDBD3BC0EBA46E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Infective Endocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p1] A patient with suspected infective endocarditis -- best initial diagnostic specimen/test is: Answer: C. Serial blood cultures before antibiotics

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Janeway lesions are painless micro-embolic macular lesions on the palms and soles seen in acute infective endocarditis

## id
CON-INF-9E294C0B1846C2

## canonical_key
endocarditis.janeway-lesions.palms-soles-microembolic

## definition
Janeway lesions are small, painless, erythematous or haemorrhagic macules found on the palms and soles. They result from septic micro-emboli thrown off an infected valve lodging in cutaneous small vessels, and are classically associated with the more aggressive, embolising course of acute endocarditis (in contrast to Osler nodes, which are painful and immune-complex mediated).

## explicit_objective
State that janeway lesions are painless micro-embolic macular lesions on the palms and soles seen in acute infective endocarditis.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Infective Endocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-JANEWAY-LESIONS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-9E294C0B1846C2

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Infective Endocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p1] Which clinical sign is described as a micro-embolic lesion on the palms/soles in acute endocarditis? Answer: A. Janeway lesions

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Empiric antimicrobial therapy for suspected infective endocarditis targets bacterial pathogens (MRSA, Viridans streptococci, enterococci), not viruses

## id
CON-INF-E7C02DE64681D8

## canonical_key
endocarditis.empiric-therapy.bacterial-coverage-not-viral

## definition
Empirical antimicrobial regimens for suspected infective endocarditis are chosen to cover the bacteria that overwhelmingly cause the disease -- Staphylococcus aureus (including MRSA), Viridans streptococci and enterococci -- while blood cultures are pending. Because infective endocarditis is essentially always bacterial (rare fungal cases aside), this empirical cover has no activity against a virus such as Coxsackievirus B, which instead causes viral myocarditis, a distinct disease.

## explicit_objective
State that empiric antimicrobial therapy for suspected infective endocarditis targets bacterial pathogens (MRSA, Viridans streptococci, enterococci), not viruses.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Infective Endocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-ENDOCARDITIS-EMPIRIC-THERAPY-TARGETS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-E7C02DE64681D8

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Infective Endocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p2] Empiric antimicrobial coverage for suspected endocarditis should include activity against each of the following EXCEPT: Answer: D. Coxsackievirus B

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Oral amoxicillin before a dental procedure is the recommended antibiotic prophylaxis for a patient at risk of infective endocarditis

## id
CON-INF-96FA06BB80E670

## canonical_key
endocarditis.prophylaxis.amoxicillin-before-dental-procedure

## definition
Patients at elevated risk of infective endocarditis (such as those with a prosthetic valve or damaged native valve) who are undergoing a dental procedure likely to cause bacteraemia are given a single dose of oral amoxicillin shortly before the procedure. This prophylaxis is aimed principally at Viridans streptococci, the oral-flora organism most likely to seed the valve during a dental bacteraemia.

## explicit_objective
State that oral amoxicillin before a dental procedure is the recommended antibiotic prophylaxis for a patient at risk of infective endocarditis.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Infective Endocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-ENDOCARDITIS-DENTAL-PROPHYLAXIS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-96FA06BB80E670

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Infective Endocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p2] A patient with a history of prosthetic valve placement is scheduled for dental extraction. What is the recommended prophylaxis: Answer: B. Oral amoxicillin before the procedure

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Staphylococcus epidermidis causes prosthetic-valve endocarditis by forming a glycocalyx biofilm on the biomedical device surface

## id
CON-INF-921BB840F59775

## canonical_key
endocarditis.epidermidis.glycocalyx-prosthetic-device

## definition
Staphylococcus epidermidis, a coagulase-negative skin commensal, is a leading cause of prosthetic-valve endocarditis. It does not invade tissue or produce potent toxins; instead it forms a glycocalyx (slime) biofilm that lets it adhere to and persist on the artificial surface of a prosthetic valve, sheltering it from both host defences and antibiotics.

## explicit_objective
State that staphylococcus epidermidis causes prosthetic-valve endocarditis by forming a glycocalyx biofilm on the biomedical device surface.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Infective Endocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-EPIDERMIDIS-GLYCOCALYX-DEVICE

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-921BB840F59775

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Infective Endocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p2] Which of the following best describes the pathogenesis of prosthetic-valve endocarditis due to S. epidermidis? Answer: B. Glycocalyx formation on biomedical devices

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Coxsackievirus B is the most common viral cause of myocarditis

## id
CON-INF-B5EFF86198FE83

## canonical_key
myocarditis.coxsackie-b.most-common-viral-cause

## definition
Coxsackievirus B, an enterovirus of the family Picornaviridae, is the most common viral cause of myocarditis. It has a particular tropism for cardiac myocytes, and infection can present with acute heart failure, chest pain and electrocardiographic changes, most often in a previously well young person.

## explicit_objective
State that coxsackievirus B is the most common viral cause of myocarditis.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Myocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-COXSACKIE-B-MYOCARDITIS-CAUSE

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-B5EFF86198FE83

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Myocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p2] A 24-year-old presents with dyspnea and signs of heart failure after a recent viral illness. Which organism is listed as the most common viral cause of myocarditis? Answer: B. Coxsackie virus

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Myocarditis is diagnosed from elevated cardiac enzymes together with a heart-failure clinical presentation

## id
CON-INF-605E48CC7E4DE4

## canonical_key
myocarditis.diagnosis.cardiac-enzymes-heart-failure-presentation

## definition
The diagnostic picture emphasised for myocarditis is a combination of elevated cardiac enzymes (such as troponin) with a clinical presentation of heart failure -- dyspnoea, fatigue and signs of reduced cardiac output -- rather than the positive blood cultures and new murmur of endocarditis or the optochin-based bacterial identification tests used elsewhere in cardiovascular microbiology.

## explicit_objective
State that myocarditis is diagnosed from elevated cardiac enzymes together with a heart-failure clinical presentation.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Myocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-MYOCARDITIS-DIAGNOSTIC-FEATURES

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-605E48CC7E4DE4

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Myocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p2] Which diagnostic features are emphasized for myocarditis? Answer: A. Elevated cardiac enzymes and heart-failure presentation

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Pericarditis classically presents as chest pain that worsens with inspiration and coughing

## id
CON-INF-9D42060DD85811

## canonical_key
pericarditis.clinical-feature.pleuritic-chest-pain

## definition
The classic clinical feature of acute pericarditis is chest pain that is sharp, positional, and worsened by inspiration or coughing (pleuritic in character) and often relieved by sitting forward. This pattern reflects irritation of the pain-sensitive parietal pericardium and is a key clinical clue that distinguishes pericarditis from ischaemic cardiac chest pain.

## explicit_objective
State that pericarditis classically presents as chest pain that worsens with inspiration and coughing.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Pericarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-PERICARDITIS-PLEURITIC-CHEST-PAIN

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-9D42060DD85811

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Pericarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p3] A patient develops chest pain that worsens with inspiration and coughing and has a recent pneumonia. The lecture indicates the most likely diagnosis is: Answer: B. Pericarditis

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Streptococcus pneumoniae is a recognised cause of purulent (infective) pericarditis

## id
CON-INF-710B2DE024DB74

## canonical_key
pericarditis.purulent.strep-pneumoniae-cause

## definition
Purulent (suppurative) pericarditis is bacterial infection of the pericardial space producing frank pus, and Streptococcus pneumoniae is one of the organisms recognised to cause it, typically by direct spread from an adjacent pneumonic focus or by haematogenous seeding during pneumococcal bacteraemia.

## explicit_objective
State that streptococcus pneumoniae is a recognised cause of purulent (infective) pericarditis.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Pericarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-PURULENT-PERICARDITIS-PNEUMOCOCCUS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-710B2DE024DB74

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Pericarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p3] Which pathogen(s) is/are common cause(s) of purulent (infective) pericarditis? Answer: A. Streptococcus pneumoniae

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
An enterovirus isolated from stool in a patient with acute myocarditis is most likely Coxsackievirus B

## id
CON-INF-ABCFBB77F6B9F5

## canonical_key
myocarditis.coxsackie-b.stool-isolation-diagnosis

## definition
When an enterovirus is isolated from a stool specimen in a patient presenting with acute myocarditis (tachycardia, heart failure, ECG changes and cardiomegaly), Coxsackievirus B is the most likely agent recovered, reflecting its faecal-oral transmission and gastrointestinal replication before the cardiotropic phase of infection.

## explicit_objective
State that an enterovirus isolated from stool in a patient with acute myocarditis is most likely Coxsackievirus B.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Myocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-COXSACKIE-B-STOOL-ISOLATION

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-ABCFBB77F6B9F5

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Myocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p3] A 16-year-old male developed chest pain and dyspnea... An enterovirus was isolated from a stool specimen. Which of the following was the agent most likely isolated? Answer: b. Coxsackievirus B

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Most causes of myocarditis have no specific cure and are managed with supportive care

## id
CON-INF-7A4574086BD96A

## canonical_key
myocarditis.management.supportive-care-no-specific-cure

## definition
For the great majority of causes of myocarditis, particularly viral myocarditis, there is no specific antimicrobial cure. Management is supportive: treating heart failure, arrhythmias and haemodynamic complications as they arise while the patient's own immune response clears the underlying infection.

## explicit_objective
State that most causes of myocarditis have no specific cure and are managed with supportive care.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Myocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-MYOCARDITIS-SUPPORTIVE-MANAGEMENT

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-7A4574086BD96A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Myocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p5] In myocarditis, which of the following management statements is correct? Answer: B. Most causes have no specific cure; supportive care is often given

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
The antistreptolysin O (ASO) titer is a specific serologic marker of past streptococcal infection, and a titer above 200 IU/mL supports a diagnosis of rheumatic fever

## id
CON-INF-4C3F7A81008817

## canonical_key
rheumaticfever.diagnosis.aso-titer-specific-for-past-gas-infection

## definition
The antistreptolysin O (ASO) titer measures antibodies against streptolysin O, a toxin produced by group A Streptococcus pyogenes, and is a specific serologic marker of a recent or past streptococcal infection. In a patient with clinical features suggestive of rheumatic fever, an ASO titer above roughly 200 IU/mL provides the laboratory evidence of an antecedent streptococcal infection required to support the diagnosis.

## explicit_objective
State that the antistreptolysin O (ASO) titer is a specific serologic marker of past streptococcal infection, and a titer above 200 IU/mL supports a diagnosis of rheumatic fever.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Rheumatic Fever

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-ASO-TITER-RHEUMATIC-FEVER

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-4C3F7A81008817

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Rheumatic Fever

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p4] Which laboratory test is a specific test for diagnosing past streptococcal infection in suspected rheumatic fever? Answer: A. Antistreptolysin O (ASO) titer >200 IU/mL

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Giving penicillin after the onset of rheumatic fever does not reverse established rheumatic carditis

## id
CON-INF-8D4ADBA83C4DA9

## canonical_key
rheumaticfever.treatment.penicillin-after-onset-no-benefit-for-carditis

## definition
Penicillin given once rheumatic fever has already begun eradicates any remaining group A streptococcal infection but does not reverse carditis that has already been established by the immune-mediated inflammatory process; its value in this setting is preventing further streptococcal exposure and future attacks, not treating the cardiac damage already present.

## explicit_objective
State that giving penicillin after the onset of rheumatic fever does not reverse established rheumatic carditis.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Rheumatic Fever

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-PENICILLIN-TIMING-RHEUMATIC-CARDITIS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-8D4ADBA83C4DA9

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Rheumatic Fever

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p6] A patient with rheumatic carditis arrives late after onset of RF. What is the role of giving penicillin after RF onset? Answer: B. No benefit from penicillin after onset of rheumatic fever

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Viridans streptococci are distinguished from Streptococcus pneumoniae by being optochin-resistant and bile-insoluble

## id
CON-INF-A34594329B91AD

## canonical_key
endocarditis.viridans.optochin-resistant-bile-insoluble-vs-pneumoniae

## definition
Both Viridans streptococci and Streptococcus pneumoniae are alpha-haemolytic on blood agar, but two simple laboratory tests separate them: Viridans streptococci are resistant to optochin and insoluble in bile, whereas S. pneumoniae is optochin-sensitive and soluble in bile (autolyses in the presence of bile salts). This distinction is important because Viridans streptococci are the classic cause of subacute endocarditis, while S. pneumoniae is not.

## explicit_objective
State that viridans streptococci are distinguished from Streptococcus pneumoniae by being optochin-resistant and bile-insoluble.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Infective Endocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-VIRIDANS-VS-PNEUMONIAE-LAB-ID

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_89011691408ee232b5ff

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-A34594329B91AD

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Infective Endocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[CVS Final Microbiology Questions (Mucize Doctors), p4] A 28-year-old with suspected subacute bacterial endocarditis: which agar/biochemical clue helps distinguish Viridans streptococci from S. pneumoniae? Answer: A. Viridans is optochin resistant and bile insoluble

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Coxsackievirus B produces widespread myositis and flaccid paralysis when inoculated into suckling mice

## id
CON-INF-33D503C0F8E835

## canonical_key
coxsackie.experimental.suckling-mice-focal-myositis-encephalitis

## definition
The classic laboratory model for distinguishing the Coxsackievirus groups is inoculation into suckling (newborn) mice: Coxsackievirus B produces widespread (generalised) myositis together with encephalitis and other visceral involvement in these animals, in contrast to Coxsackievirus A, which produces a more focal, flaccid-paralysis-type myositis pattern.

## explicit_objective
State that coxsackievirus B produces widespread myositis and flaccid paralysis when inoculated into suckling mice.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Myocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-COXSACKIE-B-SUCKLING-MICE-MODEL

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-33D503C0F8E835

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Myocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p1] Which of the following is a result of Coxsackie B virus in a suckling mice? Answer: A. Focal myositis and encephalitis

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Pericarditis pathogens typically spread by haematogenous, direct or myocardial routes, not by inhalation of contaminated air

## id
CON-INF-7FF5FE97568DA6

## canonical_key
pericarditis.transmission.hematogenous-direct-not-inhalation

## definition
Organisms reach the pericardium chiefly by haematogenous spread (bloodstream seeding), by direct extension from an adjacent infected thoracic structure such as the lung or pleura, or by direct spread from an already-infected myocardium; inhalation of contaminated air is not a recognised route by which pericarditis pathogens reach the pericardial space.

## explicit_objective
State that pericarditis pathogens typically spread by haematogenous, direct or myocardial routes, not by inhalation of contaminated air.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Pericarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-PERICARDITIS-TRANSMISSION-ROUTES

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-7FF5FE97568DA6

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Pericarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p2] Which of the following is not a typical mode of transmission for pericarditis pathogens? Answer: C. Inhalation of contaminated air

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Coxsackievirus is transmitted by the faecal-oral route

## id
CON-INF-F4CDAB96CB55F9

## canonical_key
coxsackie.transmission.fecal-oral-route

## definition
Like other enteroviruses, Coxsackievirus is transmitted primarily by the faecal-oral route -- ingestion of virus shed in the stool of an infected person, typically via contaminated hands, food or water -- rather than by inhalation, direct skin penetration or any other route.

## explicit_objective
State that coxsackievirus is transmitted by the faecal-oral route.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Myocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-COXSACKIE-FECAL-ORAL-TRANSMISSION

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-F4CDAB96CB55F9

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Myocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p3] How is the mode of transmission of Coxsackie virus? Answer: B. By Fecal-oral route

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Coxsackievirus's primary site of replication is the lymphoid tissue of the gastrointestinal tract

## id
CON-INF-AB05714C0C8981

## canonical_key
coxsackie.replication.gi-lymphoid-tissue-primary-site

## definition
After ingestion, Coxsackievirus replicates primarily in the lymphoid tissue of the gastrointestinal tract (Peyer's patches and associated mucosal lymphoid tissue) before a secondary viraemia disseminates it to target organs such as the heart, meninges, skin and pancreas.

## explicit_objective
State that coxsackievirus's primary site of replication is the lymphoid tissue of the gastrointestinal tract.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Myocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-COXSACKIE-GI-REPLICATION-SITE

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-AB05714C0C8981

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Myocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p3] The primary site of multiplication for Coxsackie viruses is: Answer: C. Lymphoid tissue of the GIT

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Coxsackievirus B is associated with pleurodynia, myocarditis and a role in diabetes mellitus

## id
CON-INF-2608E0642A91AF

## canonical_key
coxsackieb.disease.pleurodynia-myocarditis-diabetes-associations

## definition
Coxsackievirus B is associated with a range of diseases beyond myocarditis: pleurodynia (Bornholm disease, epidemic myalgia with pleuritic chest pain), and it has also been implicated as an environmental trigger contributing to the development of type 1 diabetes mellitus in genetically susceptible individuals, alongside its recognised cardiac disease.

## explicit_objective
State that coxsackievirus B is associated with pleurodynia, myocarditis and a role in diabetes mellitus.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Myocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-COXSACKIE-B-DISEASE-SPECTRUM

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-2608E0642A91AF

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Myocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p4] Which of the following are diseases caused by Coxsackie B virus? Answer: D. All of the above (Pleurodynia, Myocarditis, Diabetes mellitus)

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Streptococcus pyogenes is not a typical causative organism of pericarditis

## id
CON-INF-1FF0B557692436

## canonical_key
pericarditis.etiology.not-strep-pyogenes

## definition
Among the recognised bacterial causes of pericarditis -- which include Staphylococcus aureus, Streptococcus pneumoniae and Mycobacterium tuberculosis -- Streptococcus pyogenes (group A Streptococcus) is not a typical causative organism, even though it is the trigger organism for the separate, immune-mediated condition of rheumatic pericarditis.

## explicit_objective
State that streptococcus pyogenes is not a typical causative organism of pericarditis.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Pericarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-PERICARDITIS-NOT-STREP-PYOGENES

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-1FF0B557692436

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Pericarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p4] Which of the following is not a common causative agent of pericarditis? Answer: D. Streptococcus pyogenes

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
High spiking fever with rigors is not a typical feature of subacute infective endocarditis

## id
CON-INF-8B8271500495E1

## canonical_key
endocarditis.subacute.not-high-spiking-fever-rigors

## definition
Subacute infective endocarditis, classically caused by Viridans streptococci on an already-damaged valve, presents with a low-grade, indolent fever together with night sweats and splinter haemorrhages over weeks to months. High spiking fever with rigors is instead a feature of the fulminant, acute form of endocarditis, typically due to Staphylococcus aureus, not the subacute form.

## explicit_objective
State that high spiking fever with rigors is not a typical feature of subacute infective endocarditis.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Infective Endocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-SUBACUTE-ENDOCARDITIS-FEVER-PATTERN

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-8B8271500495E1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Infective Endocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p5] Which of the following is not a typical clinical feature of subacute endocarditis? Answer: A. High spiking fever with rigors

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Coxsackievirus is classified in the family Picornaviridae

## id
CON-INF-D756F46B795F18

## canonical_key
coxsackie.classification.picornaviridae-family

## definition
Coxsackievirus is an enterovirus within the family Picornaviridae, a family of small, non-enveloped, positive-sense single-stranded RNA viruses that also includes poliovirus, echovirus, rhinovirus and hepatitis A virus.

## explicit_objective
State that coxsackievirus is classified in the family Picornaviridae.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Myocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-COXSACKIE-PICORNAVIRIDAE-CLASSIFICATION

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-D756F46B795F18

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Myocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p5] Coxsackie viruses are classified under which family? Answer: B. Picornaviridae

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Erythrocyte sedimentation rate and C-reactive protein are non-specific tests used in the diagnosis of rheumatic fever

## id
CON-INF-F82B27A0C7E03F

## canonical_key
rheumaticfever.diagnosis.esr-crp-nonspecific-markers

## definition
Erythrocyte sedimentation rate (ESR) and C-reactive protein (CRP) are non-specific acute-phase reactants that rise with any systemic inflammation; in the diagnostic work-up for rheumatic fever they serve as supportive minor criteria of ongoing inflammation, unlike the antistreptolysin O titer, which specifically documents antecedent streptococcal infection.

## explicit_objective
State that erythrocyte sedimentation rate and C-reactive protein are non-specific tests used in the diagnosis of rheumatic fever.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Rheumatic Fever

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-RHEUMATIC-FEVER-NONSPECIFIC-MARKERS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-F82B27A0C7E03F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Rheumatic Fever

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p5] Which test is non-specific for the diagnosis of rheumatic fever? Answer: D. B & C (Erythrocyte sedimentation rate and C-reactive protein)

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Myocarditis is a recognised complication of Corynebacterium diphtheriae infection

## id
CON-INF-963A049A93D8FA

## canonical_key
diphtheria.complication.myocarditis-toxin-mediated

## definition
Corynebacterium diphtheriae produces an exotoxin that, once absorbed systemically, can damage the myocardium, producing toxin-mediated myocarditis as a serious complication of diphtheria, distinct from the local pseudomembrane formation the organism causes in the throat.

## explicit_objective
State that myocarditis is a recognised complication of Corynebacterium diphtheriae infection.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Myocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-DIPHTHERIA-TOXIN-MYOCARDITIS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-963A049A93D8FA

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Myocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p6] Which of the following is a complication of Corynebacterium diphtheriae infection? Answer: A. Myocarditis

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Staphylococcus aureus and Mycobacterium tuberculosis are the most common causes of pericarditis

## id
CON-INF-FD94F6ED59BCBF

## canonical_key
pericarditis.etiology.staph-aureus-tuberculosis-most-common

## definition
Among bacterial causes, Staphylococcus aureus (typically producing purulent pericarditis by haematogenous spread) and Mycobacterium tuberculosis (producing tuberculous pericarditis, especially where tuberculosis is endemic) are cited as the most common causes of pericarditis overall.

## explicit_objective
State that staphylococcus aureus and Mycobacterium tuberculosis are the most common causes of pericarditis.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Pericarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-PERICARDITIS-STAPH-TB-MOST-COMMON

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-FD94F6ED59BCBF

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Pericarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p6] Which of the following is the most common cause of Pericarditis? Answer: A. Staphylococcus aureus and Mycobacterium tuberculosis

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Infective endocarditis is treated with a penicillin (or vancomycin) combined with an aminoglycoside

## id
CON-INF-3F8F9D6E7F52AF

## canonical_key
endocarditis.treatment.penicillin-or-vancomycin-plus-aminoglycosides

## definition
Standard antimicrobial treatment for infective endocarditis combines a cell-wall-active agent -- penicillin (or vancomycin when resistance or allergy requires it) -- with an aminoglycoside, exploiting their synergistic bactericidal action to sterilise the relatively avascular, hard-to-penetrate vegetation more effectively than either drug class alone.

## explicit_objective
State that infective endocarditis is treated with a penicillin (or vancomycin) combined with an aminoglycoside.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Infective Endocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-ENDOCARDITIS-PENICILLIN-AMINOGLYCOSIDE-SYNERGY

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-3F8F9D6E7F52AF

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Infective Endocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p7] Which of the following is the treatment for endocarditis? Answer: A. Penicillin + aminoglycosides

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Coxsackievirus B causes a severe, generalised disease affecting the heart, liver and brain in infants

## id
CON-INF-8C1DE35DE714DD

## canonical_key
coxsackieb.infant.generalized-disease-heart-liver-brain

## definition
In neonates and young infants, Coxsackievirus B infection can cause a severe, generalised disease with multi-organ involvement -- myocarditis, hepatitis and meningoencephalitis together -- rather than the milder, more localised illness typical in older children and adults, reflecting the immature infant immune system's limited ability to contain the virus.

## explicit_objective
State that coxsackievirus B causes a severe, generalised disease affecting the heart, liver and brain in infants.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Myocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-COXSACKIE-B-INFANT-GENERALIZED-DISEASE

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-8C1DE35DE714DD

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Myocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p7] Which of the following is a feature of Coxsackie B virus infection in infants? Answer: B. Generalized disease affecting heart, liver, and brain

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Candida albicans is a recognised cause of myocarditis in immunocompromised patients

## id
CON-INF-A9C4520FA0EB77

## canonical_key
myocarditis.immunocompromised.candida-albicans-cause

## definition
In immunocompromised patients, Candida albicans is a recognised opportunistic cause of myocarditis, reaching the myocardium by haematogenous dissemination during candidaemia when normal host defences are unable to contain the organism, unlike the typically viral aetiology of myocarditis in immunocompetent hosts.

## explicit_objective
State that candida albicans is a recognised cause of myocarditis in immunocompromised patients.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Myocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-CANDIDA-MYOCARDITIS-IMMUNOCOMPROMISED

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-A9C4520FA0EB77

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Myocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p8] Which of the following organisms is a common cause of myocarditis in immunocompromised patients? Answer: A. Candida albicans

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Migratory polyarthritis is not a typical symptom of acute infective endocarditis; it is a feature of rheumatic fever

## id
CON-INF-6E83C5F7AAA95B

## canonical_key
endocarditis.acute.not-migratory-polyarthritis

## definition
Acute infective endocarditis typically presents with high fever, a new heart murmur and painless embolic skin lesions such as Janeway macules, but not with migratory polyarthritis (a large-joint arthritis that moves from joint to joint) -- migratory polyarthritis is instead a major feature of rheumatic fever, a distinct, immune-mediated disease.

## explicit_objective
State that migratory polyarthritis is not a typical symptom of acute infective endocarditis; it is a feature of rheumatic fever.

## pitfalls
Confusing this with a superficially similar cardiovascular-microbiology fact tested elsewhere in this paper; the printed answer key is the authority followed here.

## concept_type
clinical fact

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id


## secondary_node_ids


## aliases


## arabic_label


## arabic_aliases
[clear]

## topic
Microbiology

## subtopic
Infective Endocarditis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-INF-ACUTE-ENDOCARDITIS-NOT-POLYARTHRITIS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_79f275c14b581a4187c2

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-INF-6E83C5F7AAA95B

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The source paper states this without qualification; nothing was found to record.

## uncertainty
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Infective Endocarditis

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[Microbiology CVS201 Questions (Final), p8] Which of the following is not a typical symptom of acute endocarditis? Answer: D. Migratory polyarthritis

## evidence_gaps
Evidence must be attached before publication.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## field_notes
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for this tranche; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed EOM MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
Acute rheumatic fever and acute glomerulonephritis are nonsuppurative immune sequelae after local S. pyogenes infection

## id
CON-INF-2B28DE9528D471

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Rheumatic Fever > Causative Organism

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Sparse LIVE update (Microbiology tranche, author5) -- tested as M1-Q12, a vignette of cardiac manifestations 2-4 weeks after streptococcal pharyngitis with a virulence factor triggering immune cross-reaction and serologic confirmation, printed answer Streptococcus pyogenes. Already live, checked directly against server/data/medical-library-v1.json (universityIds=['kau'], learnerYears=[1,2,3], moduleIds=[]) -- this row adds MUST-CVS-201's own module tag only, same pattern as CON-INF-311E67B2C55A90 above (tranche 1). find-existing.mjs "rheumatic fever" surfaced it directly. src_89011691408ee232b5ff p2.

---

# Item

## label
Acute rheumatic fever features fever, migratory polyarthritis, carditis, and chorea

## id
CON-INF-C8230A1A39D4A9

## modules
+MUST-CVS-201

## module_subject
MUST-CVS-201 > Microbiology > Rheumatic Fever > Clinical Features

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Sparse LIVE update (Microbiology tranche, author5) -- tested three times: M1-Q19 (best statement describing rheumatic fever, printed answer "characterized by inflammatory lesions that may involve the heart, joints, subcutaneous tissues, and CNS"), M1-Q27 (which finding is NOT part of the Jones major criteria, printed answer "painless macular hemorrhages on palms" -- a distractor resembling Janeway lesions, not a rheumatic-fever feature this concept or the true Jones major criteria name) and M2-Q7 (vignette of migratory polyarthritis, fever and recent pharyngitis with elevated ASO, printed answer rheumatic fever). Already live, checked directly against server/data/medical-library-v1.json (universityIds=['kau'], learnerYears=[1,2,3], moduleIds=[]) -- this row adds MUST-CVS-201's own module tag only. find-existing.mjs "rheumatic fever" surfaced it directly. src_89011691408ee232b5ff p4,6; src_79f275c14b581a4187c2 p2.
