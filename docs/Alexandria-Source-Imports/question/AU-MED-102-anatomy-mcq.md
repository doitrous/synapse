<!--
  AU-MED-102 Anatomy, keyed EOM-paper questions testing this lane's 3 NEW
  concepts (the only concepts this lane fully controls end to end -- concept,
  article, evidence and question all authored together in this batch, so
  medical:simulate resolves them without a --with chain against another
  lane's still-unimported file). Lane W1-102-ANAT.

  Scope note: this is a first slice, not the whole department's question
  count. The remaining keyed EOM-paper and department-bank items that test
  the 23 pending-live / 3 live-sparse-update concepts are logged with their
  key status in coverage/AU-MED-102-anatomy-triage.md and are OWED --
  authoring them needs a --with proof against 101-ISK-mcq-concepts.md and
  101-ISK-anatomy.md/-anatomy-2.md the same way pending-live/AU-MED-102-anatomy.md
  did, and that is real but separate follow-up work.

  Gates:
  npm run medical:batch -- "docs/Alexandria-Source-Imports/question/AU-MED-102-anatomy-mcq.md" \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-102-anatomy-concepts.md \
    --with docs/Alexandria-Source-Imports/article/AU-MED-102-anatomy-articles.md
  npm run medical:simulate -- docs/Alexandria-Source-Imports/concept/AU-MED-102-anatomy-concepts.md docs/Alexandria-Source-Imports/article/AU-MED-102-anatomy-articles.md docs/Alexandria-Source-Imports/question/AU-MED-102-anatomy-mcq.md --emit /tmp/sim-AU-MED-102-anatomy-questions.json
  npm run medical:audit -- --source /tmp/sim-AU-MED-102-anatomy-questions.json
-->

# Item

## id
QST-MSK-VERTEBRA-CERVICAL-COUNT-01

## title
How many cervical vertebrae are there?

## question
How many cervical vertebrae are there?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
C

## answer_a
Eight

## explanation_a
Incorrect. Eight is the number of cervical *spinal cord segments*, not cervical vertebrae — the two counts genuinely differ because the cord's segments and the vertebral column's bones are not built to the same numbering, which is exactly why the mismatch has to be learnt rather than assumed to match.

## answer_b
Ten

## explanation_b
Incorrect. There is no vertebral region with ten members in the standard count — this option does not correspond to any of the five vertebral regions (7 cervical, 12 thoracic, 5 lumbar, 5 sacral, 3–4 coccygeal).

## answer_c
Seven

## explanation_c
Correct. There are seven cervical vertebrae, the first region of the vertebral column's thirty-three bones (7 cervical, 12 thoracic, 5 lumbar, 5 fused sacral, 3–4 fused coccygeal). Each cervical vertebra is told apart from a thoracic or lumbar one by its own foramen shape (wide and roughly triangular), its foramen transversarium — a hole through the transverse process that the vertebral vessels run through and that no thoracic or lumbar vertebra has — and its comparatively small body. The number to hold onto is seven: it is fixed across virtually all mammals regardless of neck length, which is part of why it is such a reliable exam fact.

## answer_d
Five

## explanation_d
Incorrect. Five is the count for the lumbar region (and, separately, for the fused sacral vertebrae) — this option picks the student who has the right number for the wrong region.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-DBEEE85B8D5613

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Anatomy

## cognitive_effort
Low

## cognitive_effort_score
0.15

## setting
Academic

## reasoning_level
1

## inferred_difficulty
80

## exam_relevance
7

## clinical_relevance
0.3

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Skeletal system

## library_ids
ART-MSK-VERTEBRA-STRUCTURE

## resource_ids
src_3bf4527b51de57464e14
src_413115a28d7dc9914c91

## learning_objective
State that there are seven cervical vertebrae, and distinguish that count from the eight cervical spinal-cord segments.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), End of Module paper "Final foundation 2030" / "Foundation Final Egyptian" (twin papers, question 3 of 112, cohort 2030).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
30

## randomise_answers
yes

## author_notes
This is the module's single most-repeated Anatomy exam fact by occurrence count (see coverage/AU-MED-102-anatomy-triage.md, row 10) — the growing-end question below tests the neighbouring long-bone concept from the same triage row.

---

# Item

## id
QST-MSK-SPLEEN-GASTRIC-IMPRESSION-01

## title
What is the impression above the hilum of the spleen?

## question
What is the impression above the hilum of the spleen?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
A

## answer_a
Gastric

## explanation_a
Correct. The gastric impression lies above the hilum on the spleen's concave visceral surface, faced against the fundus of the stomach. Reading the visceral surface from top to bottom around the hilum — gastric above, then the hilum itself, then renal below it, with the colic impression near the lateral end and the pancreatic impression below that — is the fastest way to hold all four without mixing them up, because the exam tends to ask "which one is above/below the hilum" rather than asking for the full list at once.

## answer_b
Colic

## explanation_b
Incorrect. The colic impression, for the splenic flexure of the colon, sits near the lateral end of the spleen, not immediately above the hilum.

## answer_c
Renal

## explanation_c
Incorrect, and this is the specific swap this question exists to catch. The renal impression, for the left kidney, lies *below* the hilum — a student who places it above has the gastric and renal impressions' positions exactly reversed.

## answer_d
Pancreatic

## explanation_d
Incorrect. The pancreatic impression, for the tail of the pancreas, sits below the lateral end of the spleen, not above the hilum.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-816EE3A5FAFECF

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
1

## inferred_difficulty
55

## exam_relevance
6

## clinical_relevance
0.4

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Lymphatic system

## library_ids
ART-MSK-SPLEEN-GROSS-ANATOMY

## resource_ids
src_3bf4527b51de57464e14
src_413115a28d7dc9914c91

## learning_objective
Name the impression immediately above the splenic hilum, and distinguish it from the renal impression below the hilum.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), End of Module paper "Final foundation 2030" / "Foundation Final Egyptian" (twin papers, question 78 of 112, cohort 2030).

## attached_image

## attachments

## media_recommendations
### diagram · Question stem
Brief: The visceral surface of the spleen with the hilum and its four surrounding impressions labelled
Purpose: The whole question is a spatial "which impression is where" task, and a labelled diagram would let the same stem be asked as a labelling item instead of forcing every position into prose.
Priority: strongly helpful
Status: needed
Source direction: openly licensed anatomy atlas
Rights: must be CC-BY or public domain

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Distractor C is the specific misconception the concept's own `pitfalls` field names (renal swapped for gastric). Distractors B and D are the two impressions from other quadrants of the visceral surface, catching a student who knows the four names but not their positions.

---

# Item

## id
QST-MSK-SPLEEN-INJURY-RIBS-01

## title
Which ribs are at risk in a splenic injury?

## question
A patient sustains a fracture of the left lower ribs in a road traffic accident. Which ribs, if fractured, place the spleen most directly at risk of injury?

## subject
msk

## status
Draft

## owner
Admin team

## vignette

## correct_answer
D

## answer_a
Right 8th, 9th and 10th ribs

## explanation_a
Incorrect on two counts: the spleen lies on the *left* side, not the right, and this option also gives the wrong three ribs for the spleen's own relation (9th, 10th and 11th, not 8th, 9th and 10th).

## answer_b
Right 9th, 10th and 11th ribs

## explanation_b
Incorrect. The rib numbers are right for the spleen's relation, but the side is wrong — the spleen is a left-sided organ, so a right-sided rib fracture does not place it at risk the way a left-sided one does.

## answer_c
Left 8th, 9th and 10th ribs

## explanation_c
Incorrect. The side is right, but the rib numbers are one out — the spleen's diaphragmatic surface relates to the 9th, 10th and 11th ribs, not the 8th, 9th and 10th, which is the relation for a different left upper-quadrant structure.

## answer_d
Left 9th, 10th and 11th ribs

## explanation_d
Correct. The spleen's convex diaphragmatic surface lies along the long axis of the left 9th, 10th and 11th ribs, separated from them only by the diaphragm and the costodiaphragmatic pleural recess. A fracture of one of these three ribs on the left can drive a fragment through the diaphragm into the spleen, which is why this rib relation — not a vague "left upper quadrant" — is the fact a trauma survey actually needs.

## answer_e

## explanation_e

## topic
Anatomy

## subtopic
Basis of Anatomy

## main_concept
CON-MSK-816EE3A5FAFECF

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
7

## clinical_relevance
0.7

## academic_relevance
0.6

## exam_weight_by_year
AU_Y1=0.35

## years
AU_Y1

## universities
au

## module
AU-MED-102

## question_only_for

## module_subject
AU-MED-102 > Anatomy > Lymphatic system

## library_ids
ART-MSK-SPLEEN-GROSS-ANATOMY

## resource_ids
src_3bf4527b51de57464e14
src_413115a28d7dc9914c91

## learning_objective
State the three ribs (left 9th, 10th, 11th) that relate to the spleen's diaphragmatic surface, and explain why a fracture there threatens the spleen.

## source_citation
Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences), End of Module paper "Final foundation 2030" / "Foundation Final Egyptian" (twin papers, question 79 of 112, cohort 2030).

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
All four options recombine the same two variables (side, rib numbers) so that each distractor isolates exactly one wrong component rather than being obviously wrong on sight — a student who has memorised "9, 10, 11" but not the side, or vice versa, is still caught.
