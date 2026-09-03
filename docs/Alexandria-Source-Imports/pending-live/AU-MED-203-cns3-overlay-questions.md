<!--
  3 MCQs on the 3 HIT-PENDING ASU-CNS-3 concepts sparse-updated in
  AU-MED-203-cns3-overlay-concepts.md (CON-NEU-B0F7899B8DFF50 prefrontal cortex,
  CON-NEU-D479D9227D90F9 inferior petrosal sinus, CON-NEU-94513EC37B29B8 cavernous sinus
  lateral wall), per LANE-CARD-Y2 §6: "check ASU-CNS-3 first, reuse via sparse overlay with tag
  additions only — never a twin." All three concepts and their teaching articles are live only
  in the Ain Shams lane's own batch (docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-anatomy-mcq-concepts.md
  + docs/Ain-Shams-Source-Imports/article/ASU-CNS-3-anatomy-mcq-articles.md), not yet imported
  to production. Omar applies this file, and its sibling concept-overlay file, only after that
  ASU-CNS-3 batch is live. Triage: AU-MED-203 Workshop Quiz 2 Q24 and Q28, and Week 1 EOM Final
  Q149 (coverage/AU-MED-203-triage.md's per-item search-before-mint law; verified via
  find-existing.mjs before minting was even considered).

  Validate:
    node scripts/content/gate.mjs batch docs/Alexandria-Source-Imports/pending-live/AU-MED-203-cns3-overlay-questions.md \
      --with docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-anatomy-mcq-concepts.md \
      --with docs/Ain-Shams-Source-Imports/article/ASU-CNS-3-anatomy-mcq-articles.md
    node scripts/content/gate.mjs simulate \
      docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-anatomy-mcq-concepts.md \
      docs/Ain-Shams-Source-Imports/article/ASU-CNS-3-anatomy-mcq-articles.md \
      docs/Alexandria-Source-Imports/pending-live/AU-MED-203-cns3-overlay-concepts.md \
      docs/Alexandria-Source-Imports/pending-live/AU-MED-203-cns3-overlay-questions.md
-->

# Item

## id
QST-NEU-AU203-PREFRONTAL-PERSONALITY-001
## title
Frontal lobe lesions and personality change
## question
Changes in personality and judgment are often associated with a lesion in:
## subject
neuro
## status
Draft
## owner
Claude
## answer_a
Frontal lobe
## explanation_a
Correct. The prefrontal cortex, the association area of the frontal lobe anterior to the premotor and motor strips, governs executive function, judgement, social behaviour and personality. Damage here — from trauma, tumour or degenerative disease — classically produces disinhibition, impaired judgement and personality change, historically illustrated by the case of Phineas Gage, without necessarily causing weakness, since this area lies anterior to the motor cortex proper. This is why frontal lobe lesions are notorious for being missed on a routine motor/sensory neurological exam despite producing dramatic changes noticed by family members.
## answer_b
Parietal lobe
## explanation_b
Incorrect. Parietal lobe lesions more classically produce sensory neglect, spatial disorientation or apraxia/agnosia syndromes, not the primary personality and judgement change tested here.
## answer_c
Broca's area
## explanation_c
Incorrect. Broca's area (inferior frontal gyrus) governs expressive (motor) language production; its lesion causes non-fluent aphasia, not a primary personality change.
## answer_d
Wernicke's area
## explanation_d
Incorrect. Wernicke's area (superior temporal gyrus) governs receptive language comprehension; its lesion causes fluent aphasia with poor comprehension, not a primary personality change.
## format
single best answer
## correct_answer
A

## main_concept
CON-NEU-B0F7899B8DFF50
## topic
Cerebral cortex and higher function
## subtopic
Prefrontal cortex and personality
## difficulty
Moderate
## question_type
Recall
## cognitive_effort
Low
## cognitive_effort_score
0.25
## setting
Academic
## reasoning_level
1
## inferred_difficulty
50
## exam_relevance
4
## clinical_relevance
0.3
## academic_relevance
0.8
## exam_weight_by_year
AU_Y2=moderate
## years
AU_Y2
## universities
au
## module
AU-MED-203
## module_subject
AU-MED-203 > Nervous System > Workshop Quiz 2
## library_ids
ART-NEU-ASU-CNS3-PREFRONTAL-CORTEX-PERSONALITY-BEHAVIOR-CHANGE
## contextual_concept_ids

## question_only_for

## learning_objective
Attribute personality and judgement change to a frontal lobe (prefrontal cortex) lesion, distinct from parietal, Broca's or Wernicke's area lesions.
## source_citation
AU-MED-203 Nervous System Workshop Quiz 2 (src_e0ce8dbbc37fcf3b12e9), p7 q24, answer table p10 (key: a).
## estimated_seconds
45
## randomise_answers
yes
## author_notes
Tests the same frontal-lobe-personality concept authored by the ASU-CNS-3 lane in CON-NEU-B0F7899B8DFF50 (docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-anatomy-mcq-concepts.md), verified an exact hit via find-existing.mjs ("prefrontal cortex") before minting was even considered; this lane adds no new concept, only the AU-MED-203 exam signal and this question, plus the sparse overlay in AU-MED-203-cns3-overlay-concepts.md. keySource: printed answer table p10.

---

# Item

## id
QST-NEU-AU203-INFERIOR-PETROSAL-SINUS-001
## title
Inferior petrosal sinus drainage
## question
The inferior petrosal sinus connects the cavernous sinus to the:
## subject
neuro
## status
Draft
## owner
Claude
## answer_a
Straight sinus
## explanation_a
Incorrect. The straight sinus runs along the junction of the falx cerebri and tentorium cerebelli, draining the inferior sagittal sinus and great cerebral vein into the confluence of sinuses — an unrelated drainage route from the cavernous sinus.
## answer_b
Transverse sinus
## explanation_b
Incorrect. The transverse sinus continues from the confluence of sinuses (or superior sagittal sinus) toward the sigmoid sinus; it is not the direct continuation of the inferior petrosal sinus.
## answer_c
Sigmoid sinus
## explanation_c
Incorrect. The sigmoid sinus is the S-shaped continuation of the transverse sinus toward the jugular foramen; the SUPERIOR (not inferior) petrosal sinus is the one that drains into the sigmoid sinus.
## answer_d
Internal jugular vein
## explanation_d
Correct. The inferior petrosal sinus, one of the paired dural venous sinuses, runs along the petro-occipital fissure from the posteroinferior part of the cavernous sinus to drain directly into the internal jugular vein at the jugular foramen, providing one of the cavernous sinus's main outflow routes. This direct connection is clinically relevant because it is one of the routes by which infection or thrombus can spread between the cavernous sinus and the neck's great veins.
## format
single best answer
## correct_answer
D

## main_concept
CON-NEU-D479D9227D90F9
## topic
Venous drainage of the head and neck
## subtopic
Inferior petrosal sinus
## difficulty
Moderate
## question_type
Recall
## cognitive_effort
Low
## cognitive_effort_score
0.25
## setting
Academic
## reasoning_level
1
## inferred_difficulty
52
## exam_relevance
4
## clinical_relevance
0.3
## academic_relevance
0.8
## exam_weight_by_year
AU_Y2=moderate
## years
AU_Y2
## universities
au
## module
AU-MED-203
## module_subject
AU-MED-203 > Nervous System > Workshop Quiz 2
## library_ids
ART-NEU-ASU-CNS3-INFERIOR-PETROSAL-SINUS-DRAINAGE
## contextual_concept_ids

## question_only_for

## learning_objective
State that the inferior petrosal sinus drains the cavernous sinus directly into the internal jugular vein, distinguishing it from the straight, transverse and sigmoid sinuses.
## source_citation
AU-MED-203 Nervous System Workshop Quiz 2 (src_e0ce8dbbc37fcf3b12e9), p8 q28, answer table p10 (key: d).
## estimated_seconds
45
## randomise_answers
yes
## author_notes
Tests the same inferior-petrosal-sinus concept authored by the ASU-CNS-3 lane in CON-NEU-D479D9227D90F9 (docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-anatomy-mcq-concepts.md), verified an exact hit via find-existing.mjs ("inferior petrosal sinus") before minting was even considered; this lane adds no new concept, only the AU-MED-203 exam signal and this question, plus the sparse overlay in AU-MED-203-cns3-overlay-concepts.md. keySource: printed answer table p10.

---

# Item

## id
QST-NEU-AU203-CAVERNOUS-SINUS-LATERAL-WALL-001
## title
Nerve in the lateral wall of the cavernous sinus
## question
Which nerve goes through the lateral side of the cavernous sinus?
## subject
neuro
## status
Draft
## owner
Claude
## answer_a
Optic
## explanation_a
Incorrect. The optic nerve passes through its own separate opening, the optic canal, and has no course through the cavernous sinus or its walls.
## answer_b
Olfactory
## explanation_b
Incorrect. The olfactory nerve fibers pass from the nasal mucosa through the cribriform plate of the ethmoid bone to the olfactory bulb, an entirely different route from the cavernous sinus.
## answer_c
Oculomotor
## explanation_c
Correct. The lateral wall of the cavernous sinus contains, from superior to inferior, the oculomotor nerve (III), trochlear nerve (IV), and the ophthalmic (V1) and maxillary (V2) divisions of the trigeminal nerve, with the mandibular division (V3) excluded since it leaves the trigeminal ganglion for foramen ovale without entering the cavernous sinus region. The oculomotor nerve, the most superior structure in this wall, is therefore the nerve among these four options that genuinely runs through the lateral side of the cavernous sinus. This is the same lateral-wall fact this module's own Week 1 EOM Final paper also tests from the "EXCEPT" angle (week1-q47, held as a near-exact duplicate of this same ASU-CNS-3 concept), here approached through a simpler, single-nerve-identification stem.
## answer_d
Hypoglossal
## explanation_d
Incorrect. The hypoglossal nerve exits the skull through the hypoglossal canal to supply the tongue muscles, unrelated to the cavernous sinus.
## format
single best answer
## correct_answer
C

## main_concept
CON-NEU-94513EC37B29B8
## topic
Cavernous sinus
## subtopic
Cavernous sinus lateral wall contents
## difficulty
Moderate
## question_type
Recall
## cognitive_effort
Low
## cognitive_effort_score
0.25
## setting
Academic
## reasoning_level
1
## inferred_difficulty
55
## exam_relevance
4
## clinical_relevance
0.3
## academic_relevance
0.8
## exam_weight_by_year
AU_Y2=moderate
## years
AU_Y2
## universities
au
## module
AU-MED-203
## module_subject
AU-MED-203 > Nervous System > Week 1 EOM Final
## library_ids
ART-NEU-ASU-CNS3-CAVERNOUS-SINUS-LATERAL-WALL-CONTENTS
## contextual_concept_ids

## question_only_for

## learning_objective
Identify the oculomotor nerve as the nerve, among optic, olfactory, oculomotor and hypoglossal, that runs through the lateral wall of the cavernous sinus.
## source_citation
AU-MED-203 Week 1 EOM Final (src_f5698c4e06db91539a01), p35 q149, inline per-page answer line (key: c).
## estimated_seconds
45
## randomise_answers
yes
## author_notes
Tests the same cavernous-sinus-lateral-wall concept authored by the ASU-CNS-3 lane in CON-NEU-94513EC37B29B8 (docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-anatomy-mcq-concepts.md), verified via find-existing.mjs ("cavernous sinus lateral wall", "oculomotor") before minting was even considered; this lane adds no new concept, only the AU-MED-203 exam signal and this question, plus the sparse overlay in AU-MED-203-cns3-overlay-concepts.md. keySource: inline per-page answer line, p35. Distinct from week1-q47 (Q51-100 batch, held with no new question authored as a near-exact duplicate of this same concept's own "EXCEPT" framing) — this item's simpler, materially different stem/distractor set earns its own overlay question.

---

# Item

## id
QST-NEU-AU203-PRECENTRAL-GYRUS-MOTOR-001

## title
Precentral gyrus and the first motor area

## question
Which of the following is correct regarding precentral gyrus?

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## correct_answer
C

## answer_a
This gyrus lies between central and the postcentral sulci

## explanation_a
Incorrect. The precentral gyrus lies between the central sulcus and the precentral sulcus, not the postcentral sulcus, which instead bounds the postcentral gyrus behind it.

## answer_b
This gyrus represent area 44 of Brodmann

## explanation_b
Incorrect. Area 44 (part of Broca's area) occupies the inferior frontal gyrus, not the precentral gyrus, which is area 4.

## answer_c
It is considered as first motor area of contralateral side of the body

## explanation_c
Correct. The precentral gyrus, Brodmann area 4, is the primary (first) motor cortex, organised somatotopically as the motor homunculus, and its output (via the corticospinal tract) controls voluntary movement of the contralateral side of the body. In short: identify the precentral gyrus as the primary motor area for the contralateral body.

## answer_d
It is considered with motor mechanisms of speech formulation

## explanation_d
Incorrect. Motor speech formulation is Broca's area's function (inferior frontal gyrus, areas 44/45), not the precentral gyrus's own defining role.

## topic
Cerebral cortex

## subtopic
Precentral gyrus: primary motor cortex

## main_concept
CON-NEU-8F800A1650C2CA

## concept_ids
CON-NEU-8F800A1650C2CA

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y2=moderate

## years
AU_Y2

## universities
au

## module
AU-MED-203

## module_subject

## question_only_for

## library_ids
ART-NEU-ASU-CNS3-PRIMARY-MOTOR-CORTEX-AREA-4-FUNCTION

## resource_ids
src_70b2ac8853db17b047ea

## learning_objective
State that the precentral gyrus is the primary motor area for the contralateral side of the body.

## source_citation
AU-MED-203 Week 2 EOM Final, p20 q91, inline per-page answer line.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: inline per-page answer line, p20. HIT-PENDING: reuses the Ain Shams ASU-CNS-3 concept CON-NEU-8F800A1650C2CA ('The primary motor cortex (Brodmann area 4), in the precentral gyrus, converts motor plans into executed movement'), not yet imported to production, via a sparse `+au`/`+AU_Y2`/`+AU-MED-203` overlay row in pending-live/AU-MED-203-cns3-overlay-concepts.md; not emitted into the main batch. Shares its concept with week2b-q111 (same paper, p24 q111, Brodmann-area-number framing of the same fact).

---

# Item

## id
QST-NEU-AU203-BROCA-SPOKEN-SPEECH-001

## title
Broca's area and spoken speech

## question
Which of the following is true regards Broca's area?

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## correct_answer
C

## answer_a
Located around ascending ramus of lateral sulcus

## explanation_a
Incorrect. Broca's area occupies the pars opercularis and pars triangularis of the inferior frontal gyrus (areas 44/45); it is adjacent to, but not itself defined by, the ascending ramus of the lateral sulcus.

## answer_b
It's concerned with written speech

## explanation_b
Incorrect. Broca's area governs the motor programming of spoken, not written, speech production; written-language function involves other, more posterior parieto-temporal areas.

## answer_c
It's concerned with spoken speech

## explanation_c
Correct. Broca's area, in the posterior inferior frontal gyrus (areas 44/45) of the dominant hemisphere, is responsible for the motor programming of spoken speech production; its damage produces non-fluent (expressive) aphasia with effortful, telegraphic speech but relatively preserved comprehension. In short: identify Broca's area as concerned with spoken, not written, speech.

## answer_d
All of the above

## explanation_d
Incorrect. Only the spoken-speech function (c) is correct; Broca's area is not defined by the ascending ramus of the lateral sulcus (a) nor concerned with written speech (b), so 'all of the above' is wrong.

## topic
Cerebral cortex

## subtopic
Broca's area function

## main_concept
CON-NEU-0FFACE78A09499

## concept_ids
CON-NEU-0FFACE78A09499

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y2=moderate

## years
AU_Y2

## universities
au

## module
AU-MED-203

## module_subject

## question_only_for

## library_ids
ART-NEU-ASU-CNS3-BROCA-AREA-INFERIOR-FRONTAL-GYRUS

## resource_ids
src_70b2ac8853db17b047ea

## learning_objective
State that Broca's area is concerned with spoken (motor) speech, not written speech.

## source_citation
AU-MED-203 Week 2 EOM Final, p22 q110, inline per-page answer line.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: inline per-page answer line, p22. HIT-PENDING: reuses the Ain Shams ASU-CNS-3 concept CON-NEU-0FFACE78A09499 ("Broca's area... is responsible for the motor programming of speech production"), not yet imported to production, via a sparse `+au`/`+AU_Y2`/`+AU-MED-203` overlay row in pending-live/AU-MED-203-cns3-overlay-concepts.md; not emitted into the main batch.

---

# Item

## id
QST-NEU-AU203-PRECENTRAL-GYRUS-AREA4-001

## title
Precentral gyrus's Brodmann area number

## question
Which area of Brodmann does the precentral gyrus represent?

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## correct_answer
B

## answer_a
1

## explanation_a
Incorrect. Area 1 is part of the primary somatosensory cortex, in the postcentral, not precentral, gyrus.

## answer_b
4

## explanation_b
Correct. The precentral gyrus is Brodmann area 4, the primary motor cortex, containing the largest pyramidal (Betz) cells and giving rise to a substantial share of corticospinal fibres that execute voluntary movement. In short: identify area 4 as the Brodmann number of the precentral gyrus.

## answer_c
7

## explanation_c
Incorrect. Area 7, in the superior parietal lobule, is part of the somatosensory association cortex, not the precentral gyrus.

## answer_d
42

## explanation_d
Incorrect. Area 42 is part of the auditory cortex in the superior temporal gyrus, unrelated to the precentral gyrus.

## topic
Cerebral cortex

## subtopic
Precentral gyrus: primary motor cortex

## main_concept
CON-NEU-8F800A1650C2CA

## concept_ids
CON-NEU-8F800A1650C2CA

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Moderate

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y2=moderate

## years
AU_Y2

## universities
au

## module
AU-MED-203

## module_subject

## question_only_for

## library_ids
ART-NEU-ASU-CNS3-PRIMARY-MOTOR-CORTEX-AREA-4-FUNCTION

## resource_ids
src_70b2ac8853db17b047ea

## learning_objective
State that the precentral gyrus corresponds to Brodmann area 4.

## source_citation
AU-MED-203 Week 2 EOM Final, p24 q111, inline per-page answer line.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: inline per-page answer line, p24. HIT-PENDING: reuses the same Ain Shams ASU-CNS-3 concept CON-NEU-8F800A1650C2CA as week2b-q091 (same paper, p20 q91, functional framing of the same fact); the sparse overlay row already added for q91 covers this question too, so no second overlay row is needed. Not emitted into the main batch.
