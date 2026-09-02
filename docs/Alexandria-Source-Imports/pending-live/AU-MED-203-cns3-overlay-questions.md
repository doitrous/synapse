<!--
  2 MCQs on the 2 HIT-PENDING ASU-CNS-3 concepts sparse-updated in
  AU-MED-203-cns3-overlay-concepts.md (CON-NEU-B0F7899B8DFF50 prefrontal cortex,
  CON-NEU-D479D9227D90F9 inferior petrosal sinus), per LANE-CARD-Y2 §6: "check ASU-CNS-3
  first, reuse via sparse overlay with tag additions only — never a twin." Both concepts and
  their teaching articles are live only in the Ain Shams lane's own batch
  (docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-anatomy-mcq-concepts.md +
  docs/Ain-Shams-Source-Imports/article/ASU-CNS-3-anatomy-mcq-articles.md), not yet imported
  to production. Omar applies this file, and its sibling concept-overlay file, only after that
  ASU-CNS-3 batch is live. Triage: AU-MED-203 Workshop Quiz 2 Q24 and Q28
  (coverage/AU-MED-203-triage.md's per-item search-before-mint law; verified via
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
