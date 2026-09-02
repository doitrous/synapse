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
