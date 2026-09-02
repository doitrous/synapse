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


---

# Item

## label
Pericardial effusion is classified by the character of the fluid, and lymphatic obstruction produces a transudative effusion

## id
CON-CVS-197847608085B6

## canonical_key
pericarditis.effusion-classification-by-fluid-type

## definition
Pericardial effusion is classified by the character of the accumulated fluid: transudative (low-protein, from obstruction of lymphatic drainage, heart failure or hypoproteinaemia), exudative (protein-rich, from inflammation or infection), haemorrhagic (blood, from trauma, malignancy or dissection) or suppurative (frank pus, from pyogenic infection). Obstruction of pericardial lymphatic drainage specifically produces a transudative effusion rather than an inflammatory one.

## explicit_objective
Classify pericardial effusion by fluid character and identify obstructed lymphatic drainage as a cause of the transudative type specifically.

## pitfalls
Assuming every pericardial effusion is inflammatory. A transudate reflects a mechanical or hydrostatic problem — lymphatic obstruction or a systemic fluid-balance disturbance — not pericardial disease itself.

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
Pericardial effusion types | Transudative pericardial effusion

## arabic_label


## arabic_aliases
[clear]

## topic
Pathology

## subtopic
Pericardial Disease

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-PERICARDIAL-EFFUSION-CLASSIFICATION

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-PERICARDIAL-EFFUSION-CLASSIFICATION-01

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
MUST-CVS-201 > Pathology > Pericardial Disease > Pericardial Effusion Classification

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q6, key p.16] Pericardial effusion due to obstruction of lymphatic drainage is classified as: B) Transudative.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Tuberculous pericarditis characteristically produces a fibrinous and haemorrhagic exudate

## id
CON-CVS-70D38691002F4A

## canonical_key
pericarditis.tb-exudate-character

## definition
Tuberculous pericarditis characteristically produces a fibrinous and haemorrhagic exudate, reflecting caseating granulomatous inflammation and vascular involvement of the pericardium, distinct from the clear, serous fluid of viral pericarditis and the frank pus of pyogenic (suppurative) pericarditis.

## explicit_objective
Name the characteristic exudate of tuberculous pericarditis and distinguish it from the serous and purulent patterns of other causes.

## pitfalls
Expecting TB pericarditis to look like TB pleural effusion (typically serous/straw-coloured). The pericardial disease is fibrinous and haemorrhagic, not clear.

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
TB pericarditis exudate | Tuberculous pericardial exudate

## arabic_label


## arabic_aliases
[clear]

## topic
Pathology

## subtopic
Pericardial Disease

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-TB-PERICARDITIS-EXUDATE

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-TB-PERICARDITIS-EXUDATE-01

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
MUST-CVS-201 > Pathology > Pericardial Disease > Tuberculous Pericarditis

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q9, key p.16] A patient with TB pericarditis is likely to have pericardial exudate that is: C) Fibrinous and hemorrhagic.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Suppurative pericarditis follows direct pyogenic contamination (e.g. a penetrating wound) and produces purulent exudate

## id
CON-CVS-BE0B74CF459B26

## canonical_key
pericarditis.suppurative-cause-and-exudate

## definition
Suppurative (purulent) pericarditis follows direct pyogenic bacterial contamination of the pericardial sac — classically a penetrating chest wound, but also contiguous spread from pneumonia or empyema, or haematogenous seeding — and produces frank purulent exudate. It carries a high risk of subsequent constrictive pericarditis as the purulent exudate organises into dense fibrous scar.

## explicit_objective
Name a penetrating chest wound as a cause of suppurative pericarditis and purulent exudate as its characteristic finding.

## pitfalls
Confusing suppurative with fibrinous pericarditis. Fibrinous pericarditis gives a rough "bread and butter" surface with serofibrinous fluid; suppurative pericarditis is frank pus, from direct bacterial contamination.

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
Purulent pericarditis | Penetrating-wound pericarditis

## arabic_label


## arabic_aliases
[clear]

## topic
Pathology

## subtopic
Pericardial Disease

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-SUPPURATIVE-PERICARDITIS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-SUPPURATIVE-PERICARDITIS-01

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
MUST-CVS-201 > Pathology > Pericardial Disease > Suppurative Pericarditis

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q49, key p.16] Which type of pericarditis is most likely to follow a penetrating chest wound?: B) Suppurative pericarditis. [Q53, key p.16] Which of the following is a feature of suppurative pericarditis?: C) Purulent exudate.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
The fibrous atheromatous plaque, the basic lesion of atherosclerosis, sits in the tunica intima with a fibrous cap, lipid zone and basal zone

## id
CON-CVS-217CCB33D34DB0

## canonical_key
atherosclerosis.plaque-structure-and-layer

## definition
The fibrous atheromatous plaque is the basic lesion of atherosclerosis, developing from the fatty streak within the tunica intima. It has three zones: a fibrous cap (collagen and smooth muscle cells) covering a lipid zone (foam cells, extracellular lipid and cholesterol), overlying a basal zone (collagen, smooth muscle cells and macrophages). Atherosclerosis is by definition an intimal disease — the plaque does not primarily involve the tunica media or adventitia.

## explicit_objective
Name the fibrous atheromatous plaque as the basic lesion of atherosclerosis, locate it in the tunica intima, and describe its three zones.

## pitfalls
Confusing the lipid zone with the fibrous cap. The lipid zone holds the foam cells, extracellular lipid and cholesterol; the fibrous cap is the collagen-and-smooth-muscle layer that covers it, and does not itself contain collagen as a lipid-zone component.

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
Fibrous atheromatous plaque | Atheroma zones | Basic lesion of atherosclerosis

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
ART-CVS-ATHEROMA-PLAQUE-STRUCTURE

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-ATHEROMA-PLAQUE-STRUCTURE-01

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
MUST-CVS-201 > Pathology > Atherosclerosis > Plaque Structure

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q14, key p.16] The basic lesion of atherosclerosis is the: B) Fibrous atheromatous plaque. [Q15] Which zone... contains foam cells and cholesterol?: B) Lipid zone. [Q31] In which Layers does atherosclerosis occurs?: A) Tunica intima. [Q44] The lipid zone... contains all EXCEPT: A) Collagen.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Atherosclerotic plaques complicate by thromboembolism, rupture/haemorrhage, calcification, aneurysm formation and organ-specific ischaemia

## id
CON-CVS-E03F9800584C73

## canonical_key
atherosclerosis.complications-and-ischaemic-consequences

## definition
Complications of atherosclerosis include thromboembolism, plaque rupture and haemorrhage, dystrophic calcification (which hardens rather than softens the vessel wall), aneurysm formation, and downstream ischaemia specific to the artery involved — popliteal-artery atherosclerosis causes intermittent limb claudication, and atherosclerotic renal artery stenosis causes both hypertension (via reduced renal perfusion activating the renin-angiotensin system) and renal infarction. Hypertrophic cardiomyopathy is a primary sarcomere disease, not a complication of atherosclerosis.

## explicit_objective
List the complications of an atherosclerotic plaque and apply them to site-specific presentations — popliteal claudication and renal artery stenosis.

## pitfalls
Assuming calcification of a plaque softens the vessel. Dystrophic calcification hardens the wall, reducing compliance and contributing to the vessel’s brittleness. Also, not confusing atherosclerosis (an intimal, vessel-wall disease) with a primary myocardial disease such as hypertrophic cardiomyopathy — they are not causally linked.

## concept_type
clinical_consequence

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Atherosclerosis complications | Limb claudication | Atherosclerotic renal artery stenosis

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
ART-CVS-ATHEROSCLEROSIS-COMPLICATIONS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-ATHEROSCLEROSIS-COMPLICATIONS-01

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
MUST-CVS-201 > Pathology > Atherosclerosis > Complications

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q16, key p.16] Complications of atherosclerosis include all EXCEPT: C) Hypertrophic cardiomyopathy. [Q17] Limb claudication is primarily due to atherosclerosis in the: C) Popliteal artery. [Q37 vignette] smoker+HTN+calf claudication -> B) Atherosclerosis of popliteal artery. [Q51] Dystrophic calcification leads to: B) Hardening of vessels. [Q52] Atherosclerotic renal artery stenosis can lead to: C) Both (hypertension and renal infarction).

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Benign hypertension is sustained pressure below about 200/110 mmHg, producing hyaline arteriolosclerosis from plasma-protein deposition and death chiefly from congestive heart failure

## id
CON-CVS-F7B45A1E821B0A

## canonical_key
hypertension.benign-definition-renal-change-and-mortality-order

## definition
Benign hypertension is chronic, sustained blood pressure characteristically below about 200/110 mmHg. Its characteristic renal arteriolar change is hyaline arteriolosclerosis — pink, structureless, homogeneous thickening of the arteriolar wall from the deposition of an abnormal (plasma) protein, seen also in diabetes and in otherwise-normotensive elderly patients as an ageing change. In benign hypertension, death occurs, in order of frequency, from congestive heart failure, coronary infarction, cerebral haemorrhage, and then renal failure.

## explicit_objective
Define benign hypertension by its blood-pressure range, name hyaline arteriolosclerosis and its protein basis as its renal change, and give the order of causes of death.

## pitfalls
Interchanging hyaline and hyperplastic ("onion-skin") arteriolosclerosis. Hyaline change is the benign-hypertension (and diabetic, and senescent) pattern from protein deposition; hyperplastic change with fibrinoid necrosis is specific to malignant hypertension.

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
Benign essential hypertension | Hyaline arteriolosclerosis

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
ART-CVS-BENIGN-HYPERTENSION

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-BENIGN-HYPERTENSION-01

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
MUST-CVS-201 > Pathology > Hypertension > Benign Hypertension

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q21, key p.16] Benign hypertension is characterized by a blood pressure below: B) 200/110 mmHg. [Q22] In benign hypertension, the kidney may show: B) Hyaline arteriolosclerosis. [Q24] The most common cause of death in benign hypertension is: C) Congestive heart failure. [Q36] Hyaline arteriolosclerosis is characteristic of: A) Benign hypertension. [Q42] order of death causes -> D) CHF -> Coronary infarction -> Cerebral hemorrhage -> Renal Failure. [Q48] Hyaline changes... due to deposition of: C) Abnormal protein. [Q55] Hyaline arteriolosclerosis is seen in: D) All of the above (malignant hypertension, diabetes, elderly normotensives).

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Pre-eclampsia risk is raised by first pregnancy, older maternal age and pre-existing diabetes

## id
CON-CVS-C400BC47E85D70

## canonical_key
hypertension.preeclampsia-risk-factors

## definition
Pre-eclampsia — new-onset hypertension with proteinuria after 20 weeks of pregnancy — has its risk raised by nulliparity (first pregnancy), older maternal age, and pre-existing diabetes mellitus, among other factors (multiple gestation, obesity, chronic hypertension, autoimmune disease).

## explicit_objective
List first pregnancy, older age and diabetes as risk factors for pre-eclampsia.

## pitfalls
Treating pre-eclampsia risk as tied to only one factor. It is multifactorial, and a first pregnancy, older maternal age and diabetes are each independently creditable risk factors on their own.

## concept_type
clinical_consequence

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Pre-eclampsia risk factors | Pregnancy-induced hypertension risk

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
ART-CVS-PREECLAMPSIA-HYPERTENSION-RISK

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-PREECLAMPSIA-HYPERTENSION-RISK-01

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
MUST-CVS-201 > Pathology > Hypertension > Pre-eclampsia

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q46, key p.16] Pre-eclampsia is associated with: D) All of the above (First pregnancy, Old age, Diabetes).

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Obstructive sleep apnoea is a risk factor for hypertension, stroke and heart attack

## id
CON-CVS-E0908501269680

## canonical_key
hypertension.sleep-apnoea-cardiovascular-risk

## definition
Obstructive sleep apnoea causes repeated nocturnal hypoxia and sympathetic surges that raise systemic blood pressure over time, and is an independent risk factor for hypertension, stroke and myocardial infarction (heart attack).

## explicit_objective
Name sleep apnoea as a risk factor across hypertension, stroke and heart attack, not for one alone.

## pitfalls
Treating sleep apnoea as only a sleep-quality issue. Its repeated hypoxic and sympathetic surges make it an independent cardiovascular risk factor across multiple endpoints.

## concept_type
clinical_consequence

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Obstructive sleep apnoea and hypertension | Sleep apnoea cardiovascular risk

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
ART-CVS-SLEEP-APNEA-HYPERTENSION-RISK

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-SLEEP-APNEA-HYPERTENSION-RISK-01

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
MUST-CVS-201 > Pathology > Hypertension > Sleep Apnoea

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q47, key p.16] Sleep apnea is a risk factor for: D) All of the above (Hypertension, Stroke, Heart attack).

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
A true aneurysm carries all vessel-wall layers and is either fusiform (entire circumference) or saccular (part of it); atherosclerotic aneurysms characteristically form in the abdominal aorta and can rupture, embolise or compress

## id
CON-CVS-F3E95B92367825

## canonical_key
vascular.true-aneurysm-classification-site-and-complications

## definition
A true aneurysm is an abnormal, localised dilation whose wall is formed of the complete, though often weakened, vessel wall layers — distinguishing it from a false (pseudo-) aneurysm, whose wall is adjacent connective tissue around a contained rupture. A fusiform aneurysm dilates the entire circumference of the vessel; a saccular aneurysm dilates only part of the circumference, as a sac-like outpouching. Atherosclerotic aneurysms characteristically form in the abdominal aorta. Aneurysm complications include thromboembolism, rupture and haemorrhage, and pressure effects on surrounding organs; an aneurysm does not improve blood flow.

## explicit_objective
Define a true aneurysm by its wall composition, distinguish fusiform from saccular shape, name the abdominal aorta as the classic atherosclerotic-aneurysm site, and list aneurysm complications.

## pitfalls
Confusing a true aneurysm with a false aneurysm (contained rupture, wall of surrounding tissue only) or assuming any aneurysm improves downstream flow — a dilated, turbulent segment predisposes to thrombus and embolism rather than to better perfusion.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
True vs false aneurysm | Fusiform and saccular aneurysm | Abdominal aortic aneurysm

## arabic_label


## arabic_aliases
[clear]

## topic
Pathology

## subtopic
Aneurysms

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-ANEURYSM-CLASSIFICATION

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-ANEURYSM-CLASSIFICATION-01

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
MUST-CVS-201 > Pathology > Aneurysms > Classification, Site and Complications

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q26, key p.16] A true aneurysm is defined as having a wall composed of: B) Complete vessel wall layers. [Q27] Fusiform aneurysm involves: B) The entire circumference. [Q28] The most common site for an atherosclerotic aneurysm is the: B) Abdominal aorta. [Q32] Complications of aneurysms include all EXCEPT: B) Improved blood flow. [Q56] A saccular aneurysm involves: B) Part of circumference.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Dissecting aortic aneurysm is associated with Marfan syndrome, presents with tearing pain and hypotension, and can erode adjacent bone to cause pain

## id
CON-CVS-4A3DD926C2BCE4

## canonical_key
vascular.dissecting-aneurysm-association-and-presentation

## definition
Dissecting aortic aneurysm — a tear in the intima allowing blood to track within the media, creating a false lumen — is most strongly associated with Marfan syndrome (cystic medial degeneration weakening the aortic wall), though hypertension and atherosclerosis also predispose. It classically presents with sudden, severe "tearing" chest or back pain and hypotension from blood loss into the false lumen or pericardium. A descending aortic aneurysm, dissecting or not, can erode adjacent vertebral bone and cause back pain from that direct pressure effect.

## explicit_objective
Name Marfan syndrome as the association tested for dissecting aneurysm, recognise its tearing-pain-and-hypotension presentation, and explain bone erosion as a cause of back pain in a descending aortic aneurysm.

## pitfalls
Defaulting to atherosclerosis as the answer for every aneurysm question. Dissection specifically points to a wall-weakening connective-tissue disorder such as Marfan syndrome, distinct from the atherosclerotic mechanism tested for fusiform, abdominal-aortic aneurysms.

## concept_type
clinical_consequence

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Aortic dissection | Marfan syndrome and aortic aneurysm

## arabic_label


## arabic_aliases
[clear]

## topic
Pathology

## subtopic
Aneurysms

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-DISSECTING-AORTIC-ANEURYSM

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-DISSECTING-AORTIC-ANEURYSM-01

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
MUST-CVS-201 > Pathology > Aneurysms > Dissecting Aneurysm

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q29, key p.16] Dissecting aneurysm is most associated with: C) Marfan syndrome. [Q40 vignette] atherosclerosis+tearing back pain+hypotension -> C) Dissecting aortic aneurysm. [Q59] In descending aortic aneurysm, bone erosion may cause: B) Back pain.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
A Rasmussen aneurysm is a pulmonary artery aneurysm within a tuberculous lung cavity

## id
CON-CVS-0FFB81F3C1CC4B

## canonical_key
vascular.rasmussen-aneurysm-tb-pulmonary-artery

## definition
A Rasmussen aneurysm is a pseudoaneurysm of a pulmonary artery branch, forming within the wall of a chronic tuberculous cavity as the vessel is progressively weakened by adjacent caseous necrosis and inflammation. Its rupture is a classic cause of life-threatening haemoptysis in pulmonary tuberculosis.

## explicit_objective
Locate the Rasmussen aneurysm in the pulmonary artery within a TB cavity and link it to haemoptysis.

## pitfalls
Confusing a Rasmussen aneurysm with a mycotic aneurysm. Both are infection-related, but a Rasmussen aneurysm is a specific pulmonary-artery lesion within a TB cavity wall, not a systemic-artery aneurysm seeded by bacteraemia from endocarditis.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Rasmussen aneurysm | TB cavity pulmonary artery aneurysm

## arabic_label


## arabic_aliases
[clear]

## topic
Pathology

## subtopic
Aneurysms

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-RASMUSSEN-ANEURYSM

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-RASMUSSEN-ANEURYSM-01

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
MUST-CVS-201 > Pathology > Aneurysms > Rasmussen Aneurysm

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q30, key p.16] Rasmussen aneurysm affects the: B) Pulmonary artery in TB.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
A mycotic aneurysm arises from septic embolisation of infected material, classically from infective endocarditis

## id
CON-CVS-5916244D7A012F

## canonical_key
vascular.mycotic-aneurysm-infective-endocarditis-association

## definition
A mycotic aneurysm is a localised arterial dilation caused by infection of the vessel wall, most commonly from septic embolisation of infected material — classically vegetations shed from infective endocarditis, which seed and weaken a distal artery wall, or from direct bacteraemic seeding of an already-diseased wall. It presents as a pulsatile, tender mass at the affected site, often with systemic signs of the underlying infection (fever, positive blood cultures, a murmur).

## explicit_objective
Link mycotic aneurysm formation to septic embolisation from infective endocarditis and recognise its presentation.

## pitfalls
The name "mycotic" suggesting a fungal cause. It denotes an infected (usually bacterial, from a septic embolus) aneurysm, not specifically a fungal one.

## concept_type
clinical_consequence

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Mycotic aneurysm | Infected aneurysm

## arabic_label


## arabic_aliases
[clear]

## topic
Pathology

## subtopic
Aneurysms

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-MYCOTIC-ANEURYSM

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-MYCOTIC-ANEURYSM-01

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
MUST-CVS-201 > Pathology > Aneurysms > Mycotic Aneurysm

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q41 vignette, key p.16] fever+murmur+pulsating groin mass+Staph+ -> B) Mycotic aneurysm. [Q57] Mycotic aneurysms are most associated with: C) Infective endocarditis.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Takayasu arteritis typically affects young women, involving the aorta and its major branches

## id
CON-CVS-AA3A2E6B6084F2

## canonical_key
vasculitis.takayasu-arteritis-demographic-and-distribution

## definition
Takayasu arteritis is a large-vessel vasculitis typically affecting women of childbearing age, involving the aorta and its major branches with granulomatous inflammation that leads to wall thickening, stenosis and, later, absent or diminished peripheral pulses ("pulseless disease").

## explicit_objective
Name the typical demographic (young women) and the vessel distribution (aorta and its major branches) of Takayasu arteritis.

## pitfalls
Confusing Takayasu arteritis with giant cell (temporal) arteritis, a different large-vessel vasculitis typically affecting elderly patients rather than young women.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Takayasu disease | Aortic arch arteritis

## arabic_label


## arabic_aliases
[clear]

## topic
Pathology

## subtopic
Vasculitis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-TAKAYASU-ARTERITIS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-TAKAYASU-ARTERITIS-01

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
MUST-CVS-201 > Pathology > Vasculitis > Takayasu Arteritis

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q33, key p.16] Takayasu arteritis typically affects: B) Women of childbearing age. [Q58] Takayasu arteritis affects the: B) Aorta and main branches.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Polyarteritis nodosa most commonly involves the medium-sized arteries of the gastrointestinal tract

## id
CON-CVS-00545B736FF8F7

## canonical_key
vasculitis.polyarteritis-nodosa-gi-artery-involvement

## definition
Polyarteritis nodosa is a necrotising vasculitis of medium-sized muscular arteries that most commonly involves the arteries of the gastrointestinal tract, producing segmental, transmural inflammation with fibrinoid necrosis and a classic "beading" of small aneurysms on angiography; renal, musculoskeletal, skin and peripheral-nerve arteries are also frequently affected, but GIT involvement is the printed, most-common site tested here.

## explicit_objective
Name the gastrointestinal tract as the most commonly involved arterial territory in polyarteritis nodosa.

## pitfalls
Assuming the kidney is always named as the single most common site. Polyarteritis nodosa is multi-territory; this source specifically credits the GIT as the most common answer, and the renal, skin and neural territories are also separately examinable.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
PAN | Polyarteritis nodosa distribution

## arabic_label


## arabic_aliases
[clear]

## topic
Pathology

## subtopic
Vasculitis

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-POLYARTERITIS-NODOSA

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_67efbd148b42c6593611

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-POLYARTERITIS-NODOSA-01

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
MUST-CVS-201 > Pathology > Vasculitis > Polyarteritis Nodosa

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
[EOM MCQs - Pathology CVS201 Questions (Final), Q34, key p.16] Polyarteritis nodosa most commonly involves arteries of the: C) GIT.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 6; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Continuous partial vasoconstriction of blood vessels (vasomotor tone) is maintained by ongoing sympathetic discharge

## id
CON-CVS-511A10F77151BC

## canonical_key
vasomotortone.basal-sympathetic-maintenance

## definition
Blood vessels, particularly arterioles, are held in a state of continuous partial constriction called vasomotor tone, produced by ongoing, baseline tonic discharge from sympathetic vasoconstrictor (adrenergic) fibres to vascular smooth muscle, releasing norepinephrine onto alpha-adrenergic receptors even at rest. This resting sympathetic outflow gives arterioles a baseline degree of constriction that can be increased (further sympathetic discharge, raising resistance and pressure) or decreased (withdrawal of sympathetic tone, allowing vasodilation) as a way of regulating vascular resistance and blood pressure. Parasympathetic fibres, by contrast, supply only a limited set of vascular beds and are not the source of this generalised basal tone.

## explicit_objective
State that basal vasomotor tone is maintained by continuous (tonic) sympathetic vasoconstrictor discharge, not by parasympathetic activity, autoregulation or basal metabolic rate alone.

## pitfalls
Attributing baseline vessel tone to parasympathetic activity. Parasympathetic vasodilator fibres supply only a few vascular beds (e.g. salivary glands, genital erectile tissue); the generalised, continuous partial constriction of arterioles throughout the body is a sympathetic, not parasympathetic, phenomenon.

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
Vasomotor tone | Basal sympathetic vasoconstrictor tone

## arabic_label


## arabic_aliases
[clear]

## topic
Physiology

## subtopic
Blood Flow

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-VASOMOTOR-TONE

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_165188e079f0f475e54d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-VASOMOTOR-TONE-01

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
MUST-CVS-201 > Physiology > Blood Flow > Vasomotor Tone

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
[EOM MCQs - Physiology CVS201 Questions (Final), Q5, key p.9] The continuous, partial vasoconstriction of blood vessels is maintained by: B) Sympathetic tone.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 7; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Epinephrine from the adrenal medulla acts on both alpha- and beta-adrenergic receptors, constricting most vascular beds but dilating skeletal-muscle vessels

## id
CON-CVS-8EE3B5EE80F342

## canonical_key
epinephrine.dual-adrenoceptor-vascular-action

## definition
Epinephrine, released from the adrenal medulla, is unusual among circulating vasoactive hormones because its net vascular effect depends on which adrenergic receptor subtype predominates in a given vascular bed. Acting on alpha-adrenergic receptors, which predominate in skin, splanchnic and renal vessels, epinephrine causes vasoconstriction, the same effect norepinephrine produces almost everywhere. In skeletal muscle, however, where beta2-adrenergic receptors predominate over alpha receptors, epinephrine instead binds beta2 receptors and causes vasodilation, increasing blood flow to muscle during a "fight or flight" response, precisely when the body needs to shunt blood away from the skin and splanchnic circulation and toward the muscles that will do the fighting or fleeing. Norepinephrine, by contrast, acts almost exclusively on alpha receptors and is a vasoconstrictor in essentially every vascular bed it reaches.

## explicit_objective
State that epinephrine's vascular action is receptor-bed-dependent — vasoconstriction via alpha receptors in most beds, vasodilation via beta2 receptors in skeletal muscle — and contrast this with norepinephrine's near-universal alpha-mediated vasoconstriction.

## pitfalls
Treating epinephrine as a pure vasoconstrictor like norepinephrine. Epinephrine's affinity for beta2 receptors, which predominate in skeletal-muscle vasculature, makes it the one circulating catecholamine capable of vasodilation in a specific vascular bed, not just vasoconstriction everywhere.

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
Epinephrine vascular effects | Adrenal medulla vasoactive hormone | Beta-2 skeletal muscle vasodilation

## arabic_label


## arabic_aliases
[clear]

## topic
Physiology

## subtopic
Blood Flow

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-EPINEPHRINE-DUAL-ACTION

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_165188e079f0f475e54d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-EPINEPHRINE-DUAL-ACTION-01

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
MUST-CVS-201 > Physiology > Blood Flow > Vasoactive Hormones

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
0.9

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[EOM MCQs - Physiology CVS201 Questions (Final), Q7 & Q23, key p.9] During a "fight or flight" response, epinephrine causes vasodilation in skeletal muscle by acting on: B) Beta-adrenergic receptors. Which hormone is released from the adrenal medulla and can cause both vasoconstriction and vasodilation? C) Epinephrine.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 7; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Kinins (bradykinin) are potent vasodilators that also increase capillary permeability and directly stimulate pain nerve endings

## id
CON-CVS-AD0D8E768C2018

## canonical_key
kinins.pain-and-permeability-actions

## definition
Kinins, of which bradykinin is the prototype, are short-lived peptides formed locally from plasma kininogen by the enzyme kallikrein. Beyond their well-established action as potent local vasodilators, kinins act directly on capillary and venular endothelium to increase capillary permeability, contributing to the fluid exudation seen in acute inflammation, and they directly stimulate free nerve endings that carry pain sensation, producing pain in inflamed or injured tissue — the source paper's own teaching compares this pain-stimulating action to that of insulin, which can similarly excite pain endings when introduced into tissue. This combination of vasodilation, increased capillary permeability and pain generation makes kinins one of the classic local mediators of inflammation, alongside histamine.

## explicit_objective
State that kinins (bradykinin) both increase capillary permeability and directly stimulate pain sensation, in addition to their vasodilator action.

## pitfalls
Recalling kinins only as vasodilators and missing their independent pain-stimulating and permeability-increasing actions, which this source's bank tests as separate facts from the vasodilation itself.

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
Kinins | Bradykinin | Kinin pain stimulation | Kinin capillary permeability

## arabic_label


## arabic_aliases
[clear]

## topic
Physiology

## subtopic
Blood Flow

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-KININS-PAIN-PERMEABILITY

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_165188e079f0f475e54d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-KININS-PAIN-PERMEABILITY-01

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
The source's own comparison of kinin-induced pain to insulin's pain-stimulating action is stated as fact without further qualification; recorded as the source's own teaching point rather than independently re-derived.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Vasoactive Hormones

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.65

## original_wording
[EOM MCQs - Physiology CVS201 Questions (Final), Q15 & Q25, key p.9] Which of following helps in stimulation of pain sensation like Insulin: A) Kinins. Which of the following is a direct effect of Kinins? C) Increased capillary permeability.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 7; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
moduleIds: MUST-CVS-201 is this concept's first module tag; no other lane has claimed it yet.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: The source's own comparison of kinin-induced pain to insulin's pain-stimulating action is stated as fact without further qualification; recorded as the source's own teaching point rather than independently re-derived.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.

---

# Item

## label
The skin flare reaction is vasodilation via the axon reflex, in which antidromic impulses in sensory nerve branches release local vasodilator peptides

## id
CON-CVS-7F05227FE0970F

## canonical_key
flarereaction.antidromic-vasodilator-fibers

## definition
When skin is injured or firmly stimulated, the red "flare" that spreads beyond the directly stimulated site is produced by the axon reflex: an impulse travelling centrally along one branch of a sensory (nociceptive) afferent fibre from the stimulated site can also travel antidromically — backwards, away from the spinal cord — down neighbouring branches of that same afferent neuron that innervate adjacent skin, triggering the local release of vasodilator neuropeptides from the nerve terminals themselves. This local, peripherally-generated vasodilation, driven by antidromic conduction in sensory ("vasodilator") fibres rather than by any efferent autonomic outflow, is what gives the flare its characteristic spread beyond the point of direct injury, and it forms part of the classic "triple response" of the skin (red line, flare, wheal). The third component, the wheal — the localised swelling seen, for example, after a bee sting or an allergen skin-prick — is driven by a separate mediator, histamine, released locally from mast cells; histamine directly increases capillary permeability, producing the swelling and contributing to the surrounding redness, distinct from the axon-reflex mechanism that produces the flare itself.

## explicit_objective
State that the skin flare reaction is mediated by antidromic conduction in sensory nerve branches (the axon reflex), not by autonomic efferent vasodilator outflow, and that the wheal component of the same triple response is instead mediated by histamine.

## pitfalls
Assuming the flare reflects ordinary efferent parasympathetic vasodilation. The flare's mechanism is antidromic — impulses running backward along collateral branches of the same sensory afferent that carries the stimulus centrally — not a centrally-driven autonomic reflex. Also assuming the whole triple response shares one mechanism: the flare is axon-reflex vasodilation, but the wheal is a separate, histamine-driven increase in capillary permeability.

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
Flare reaction | Axon reflex | Antidromic vasodilator fibres | Triple response of the skin | Wheal | Histamine-mediated wheal

## arabic_label


## arabic_aliases
[clear]

## topic
Physiology

## subtopic
Blood Flow

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-FLARE-REACTION-AXON-REFLEX

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_165188e079f0f475e54d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-FLARE-REACTION-AXON-REFLEX-01 | CLM-CVS-TRIPLE-RESPONSE-HISTAMINE-WHEAL-01

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
Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification. Tranche 8 extended this record's definition to cover the wheal's histamine mechanism (tested by Capillary Circulation & Oedema Q18) alongside the flare's own axon-reflex mechanism (Q6/Blood-Flow Q16), rather than minting a second concept for the same "triple response" source label — the source paper's own bank tests both components as the same named phenomenon.

## last_reviewed


## review_due


## exclusion_reason


## modules
MUST-CVS-201

## module_subject
MUST-CVS-201 > Physiology > Blood Flow > Local Vasodilator Mechanisms

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.3

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[EOM MCQs - Physiology CVS201 Questions (Final), Blood Flow Q16, key p.9] The "flare reaction" in the skin is an example of vasodilation mediated by: B) Antidromic vasodilator fibers.
[EOM MCQs - Physiology CVS201 Questions (Final), Capillary Circulation & Oedema Q18, key p.26] A patient presents after a bee sting with localized swelling, redness, and a pale central wheal. This "triple response" is primarily mediated by: C) Histamine.

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
must-tranche8: Extended for physcap-q06 (spreading-flare mechanism, dual-sourced with this record's original Blood Flow Q16) and physcap-q18 ("triple response...mediated by:", key C, Histamine) — this record's definition now covers both the flare (axon reflex) and wheal (histamine) components tested by the source's Capillary Circulation & Oedema section. src_165188e079f0f475e54d p.26.
arabicLabel: MUST teaching for this module is in English and the source paper prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
arabicAliases: No Arabic label exists for this concept yet, so it can have no Arabic alternates.
microtopicId: The canonical placement and the module-subject path are already finer than any microtopic in the overlay would be.
nanotopicId: The microtopic level is unused here; a nanotopic beneath it would be finer than anything the source distinguishes.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the corpus is a private university collection and nothing in it has been cleared for redistribution.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept; the module corpus holds no video for this fact.
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 7; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Endothelin, released by endothelial cells in response to vessel stretch, is the most potent vasoconstrictor known

## id
CON-CVS-7D26B65DA355A1

## canonical_key
endothelin.stretch-induced-vasoconstrictor

## definition
Endothelin (endothelin-1 being the principal vascular isoform) is a peptide synthesised and released by vascular endothelial cells in response to mechanical stimuli such as stretch of the vessel wall, as well as tissue injury, hypoxia and several circulating hormones (angiotensin II, vasopressin). It acts on endothelin-A receptors on vascular smooth muscle to produce intense, prolonged vasoconstriction, making it one of the most potent vasoconstrictor substances identified, considerably more potent on a molar basis than angiotensin II or norepinephrine. This stretch-triggered release places endothelin alongside nitric oxide as one of the endothelium's own local paracrine signals, but acting in the opposite direction: whereas shear stress and stretch stimulate endothelial nitric oxide release to vasodilate, the same mechanical stimuli can also trigger endothelin release to vasoconstrict, and the balance between the two contributes to local vascular tone regulation.

## explicit_objective
Identify endothelin as an endothelium-derived, stretch-triggered peptide and the most potent vasoconstrictor known, contrasting its release stimulus and direction of action with endothelial nitric oxide.

## pitfalls
Confusing endothelin's stimulus (vessel-wall stretch and shear-related injury) or its direction of action (vasoconstriction) with nitric oxide or prostacyclin, the endothelium's other stretch/shear-responsive but vasodilator signals.

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
Endothelin | Endothelin-1 | ET-1

## arabic_label


## arabic_aliases
[clear]

## topic
Physiology

## subtopic
Blood Flow

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-ENDOTHELIN-VASOCONSTRICTOR

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_165188e079f0f475e54d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-ENDOTHELIN-VASOCONSTRICTOR-01

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
MUST-CVS-201 > Physiology > Blood Flow > Vasoactive Hormones

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
[EOM MCQs - Physiology CVS201 Questions (Final), Q19, key p.9] Which endothelial substance is a potent vasoconstrictor released in response to vessel stretch? C) Endothelin.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 7; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Blood vessels are classified functionally as resistance vessels (arterioles), exchange vessels (capillaries) or capacitance vessels (veins)

## id
CON-CVS-3E68C888B95668

## canonical_key
vascularsegments.functional-classification-exchange

## definition
Beyond their conducting role, the segments of the vascular tree are classified by their principal physiological function. Arterioles are the resistance vessels: their small lumen and thick smooth-muscle wall let them actively regulate vascular resistance and so control both local blood flow and total peripheral resistance. Capillaries are the exchange vessels: their wall is a single layer of endothelium, thin enough and with a large enough total surface area to allow diffusion of gases, nutrients and waste products between blood and interstitial fluid, which is their primary physiological function; they have no smooth muscle of their own and cannot actively change diameter. Veins are the capacitance vessels: their thin, highly distensible wall and large lumen let them hold a large proportion of total blood volume (roughly 60-70% at rest) with only a small rise in pressure, buffering venous return rather than doing the active flow-control work of arterioles or the exchange work of capillaries.

## explicit_objective
Name capillaries as the exchange vessels of the circulation, and distinguish this functional role from the resistance role of arterioles and the capacitance role of veins.

## pitfalls
Confusing the vessel segment named for a given functional role — assigning "resistance" to capillaries or "exchange" to arterioles, rather than keeping arteriole=resistance, capillary=exchange, vein=capacitance as three distinct, non-overlapping functional labels.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## aliases
Exchange vessels | Resistance vessels | Capacitance vessels | Functional vessel classification

## arabic_label


## arabic_aliases
[clear]

## topic
Physiology

## subtopic
Blood Flow

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-VASCULAR-FUNCTIONAL-CLASSIFICATION

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_165188e079f0f475e54d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-VASCULAR-FUNCTIONAL-CLASSIFICATION-01

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
MUST-CVS-201 > Physiology > Blood Flow > Vessel Function

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_signal


## weight_confidence
0.3

## confidence
0.75

## original_wording
[EOM MCQs - Physiology CVS201 Questions (Final), Q20, key p.9] The primary function of the capillaries is: C) Exchange.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 7; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Prostacyclin (PGI2), synthesised by endothelium from arachidonic acid via cyclooxygenase, is a local vasodilator as well as a platelet-aggregation inhibitor

## id
CON-CVS-487BC301A49AE2

## canonical_key
prostacyclin.endothelial-vasodilator

## definition
Prostacyclin (prostaglandin I2, PGI2) is synthesised by vascular endothelial cells from arachidonic acid via the cyclooxygenase (COX) pathway, the same enzymatic route platelets use to make the opposing eicosanoid thromboxane A2. In the vasculature, prostacyclin acts on vascular smooth muscle to raise intracellular cAMP, relaxing the muscle and producing local vasodilation, an action distinct from — though it works alongside — its better-known role of inhibiting platelet aggregation to keep circulating platelets from adhering to intact endothelium. Because prostacyclin and thromboxane A2 come from the same substrate and the same enzyme family but act in opposite directions — prostacyclin vasodilates and inhibits platelets, thromboxane A2 vasoconstricts and promotes platelet aggregation — the balance between the two contributes both to local vascular tone and to normal haemostatic balance at the vessel wall.

## explicit_objective
Identify prostacyclin as an arachidonic-acid-derived, endothelium-produced local vasodilator, distinct from (though related to) its anti-platelet-aggregation role.

## pitfalls
Recalling prostacyclin only for its anti-platelet action and missing its independent local vasodilator action on vascular smooth muscle, which is the specific fact this source's bank tests.

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
Prostacyclin | PGI2 | Prostaglandin I2

## arabic_label


## arabic_aliases
[clear]

## topic
Physiology

## subtopic
Blood Flow

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-PROSTACYCLIN-VASODILATOR

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_165188e079f0f475e54d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-PROSTACYCLIN-VASODILATOR-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-HEM-2A74F18E1AA1CF (live, "Aspirin inhibits cyclooxygenase and reduces thromboxane A2 and prostacyclin") and the pending 102-INT thromboxane–prostacyclin haemostasis-balance concept were both checked — both state prostacyclin's anti-platelet role via COX inhibition, not its direct vasodilator action on vascular smooth muscle, which is the specific fact this source's bank tests. Judged a different facet, not a duplicate, the same call made elsewhere in this lane for closely related but distinct depths of the same substance.

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
MUST-CVS-201 > Physiology > Blood Flow > Vasoactive Hormones

## universities
must

## learner_years
2

## blueprint_weight
0.2

## exam_weight_by_year
MUST_Y2=0.5

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_signal


## weight_confidence
0.3

## confidence
0.7

## original_wording
[EOM MCQs - Physiology CVS201 Questions (Final), Q28, key p.9] Which substance, derived from arachidonic acid, is a vasodilator produced by the endothelium? C) Prostacyclin.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 7; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
Left ventricular receptors act as both mechanoreceptors and chemoreceptors, and their stimulation (the Bezold-Jarisch reflex) causes bradycardia and hypotension

## id
CON-CVS-E48F6E57CCBB2F

## canonical_key
ventricularreceptors.mechano-chemo-bezold-jarisch

## definition
Unlike the arterial baroreceptors (pure mechanoreceptors, stretch-sensitive only) and the peripheral chemoreceptors (pure chemoreceptors, sensitive to blood gases and pH), sensory receptors in the wall of the left ventricle are unusual in responding to both mechanical stimuli (distension or stretch of the ventricular wall) and chemical stimuli (local accumulation of metabolites, or exogenous substances reaching the coronary circulation during myocardial ischaemia). Vagal afferent stimulation of these ventricular receptors produces the Bezold-Jarisch reflex, also called the coronary chemoreflex: a triad of bradycardia, hypotension and coronary vasodilation — the opposite of the usual sympathetic response to a fall in pressure — mediated by a sudden surge of parasympathetic (vagal) outflow to the heart and withdrawal of sympathetic vasoconstrictor tone. Clinically this reflex is invoked to explain the bradycardia and hypotension that can accompany inferior myocardial infarction or reperfusion of an ischaemic coronary territory.

## explicit_objective
Identify left ventricular receptors as both mechano- and chemoreceptors, and state that their reflex (Bezold-Jarisch) produces bradycardia and hypotension via increased vagal outflow.

## pitfalls
Confusing left ventricular receptors with the purely-mechanoreceptor arterial baroreceptors, or assuming the Bezold-Jarisch reflex raises, rather than lowers, heart rate and pressure — it is a paradoxical bradycardic, hypotensive reflex, the opposite of the usual pressor response to a falling pressure.

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
Bezold-Jarisch reflex | Coronary chemoreflex | Left ventricular receptors

## arabic_label


## arabic_aliases
[clear]

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-BEZOLD-JARISCH-REFLEX

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_165188e079f0f475e54d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-BEZOLD-JARISCH-REFLEX-01

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
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Reflex Control

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
[EOM MCQs - Physiology CVS201 Questions (Final), Q5 & Q27, key p.20] Which of the following is both mechano-receptor & chemo-receptor? A) Left ventricular receptors. The Bazold-Jarish reflex (coronary chemoreflex) results in: B) Bradycardia and hypotension.

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 7; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
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
The medullary vasomotor centre has pressor (vasoconstrictor) and depressor (vasodilator) areas, and a separate cardiac inhibitory centre slows the heart via the vagus

## id
CON-CVS-595DFC43B96D7D

## canonical_key
medullarycenters.pressor-and-cardiac-areas

## definition
Cardiovascular control originates in a set of interconnected centres in the reticular formation of the medulla oblongata (and lower pons). The vasomotor centre is divided into a pressor area, which contains the vasoconstrictor centre (VCC) and generates the tonic sympathetic discharge that maintains vasomotor tone and raises arterial pressure when activated, and a depressor area, which inhibits the pressor area's output and so produces vasodilation when activated (rather than actively vasodilating by its own efferent output). A separate cardiac inhibitory centre (CIC), closely linked to the vasomotor centre and to the nucleus of the tractus solitarius (which relays baroreceptor and chemoreceptor afferents into these centres), sends parasympathetic (vagal) efferent impulses to the heart's sinoatrial node, slowing heart rate when activated; a cardiac stimulatory (accelerator) centre conversely raises heart rate and contractility via sympathetic outflow. These centres integrate baroreceptor, chemoreceptor and higher-centre input to set the moment-to-moment balance of heart rate, contractility and vascular resistance.

## explicit_objective
Name the pressor area (containing the vasoconstrictor centre) and the depressor area as the two divisions of the medullary vasomotor centre, and identify the cardiac inhibitory centre as the source of vagal, heart-rate-slowing outflow.

## pitfalls
Confusing the depressor area's mechanism (inhibiting the pressor area's tonic output) with an active vasodilator efferent output of its own, or misattributing the vagal, heart-rate-slowing outflow to the pressor/vasoconstrictor area rather than to the separate cardiac inhibitory centre.

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
Vasomotor centre | Pressor area | Depressor area | Cardiac inhibitory centre | Vasoconstrictor centre

## arabic_label


## arabic_aliases
[clear]

## topic
Physiology

## subtopic
Arterial Blood Pressure Regulation

## microtopic
[clear]

## nanotopic
[clear]

## article_ids
ART-CVS-MEDULLARY-CARDIOVASCULAR-CENTERS

## related_article_ids


## related_concept_ids
[clear]

## resource_ids
src_165188e079f0f475e54d

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## atomic_claim_ids
CLM-CVS-MEDULLARY-CARDIOVASCULAR-CENTERS-01

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
MUST-CVS-201 > Physiology > Arterial Blood Pressure Regulation > Medullary Centres

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
[EOM MCQs - Physiology CVS201 Questions (Final), Q19 & Q20, key p.20] The Vasoconstrictor Center (VCC) is part of which medullary area? C) Pressor Area. Which center sends impulses via the vagus nerve to decrease heart rate? D) Cardiac Inhibitory Center (CIC).

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
atomicClaimIds: This lane is limited to concept/article/evidence records for tranche 7; see evidence/MUST-CVS-201-claims.md for the claim minted alongside this concept.
resourceOccurrenceIds: Read from the printed answer key by hand rather than by an extraction pipeline, so no corpus occurrence record exists to point at.
sourceCandidateIds: The source is known exactly, not a candidate — it is the printed MCQ paper named on resource_ids.
mergeIds: Nothing has been merged into this concept.
moduleIds: MUST-CVS-201 is this concept's first module tag; no other lane has claimed it yet.
conflicts: The source paper states this without qualification; nothing was found to record.
uncertainty: Nothing about this concept is genuinely unsettled at undergraduate level; the source paper states it without qualification.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
exclusionReason: This concept is not excluded; the field is present and empty so that an exclusion later is a change somebody made rather than a field that was always missing.
