<!--
  Questions testing the 2 HIT-PENDING concepts in pending-live/AU-MED-102-terminology.md
  (CON-HEM-785718A47454E8, CON-MSK-EFD497A9922A4D), per LANE-BRIEF.md §21: authored now,
  not deferred. Both concepts and their teaching articles are live only in the Kasr Year-1
  lane's unimported batch — Omar applies this file only after both Kasr files below are live.

  Validate:
    medical:batch --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
                  --with docs/Kasr-Source-Imports/article/101-ISK-histology-2.md \
                  --with docs/Kasr-Source-Imports/article/101-ISK-anatomy-2.md \
                  docs/Alexandria-Source-Imports/pending-live/AU-MED-102-terminology-questions.md
    medical:simulate docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
                      docs/Kasr-Source-Imports/article/101-ISK-histology-2.md \
                      docs/Kasr-Source-Imports/article/101-ISK-anatomy-2.md \
                      docs/Alexandria-Source-Imports/pending-live/AU-MED-102-terminology-questions.md
-->

# Item

## id
QST-HEM-LEUKOCYTE-TYPES-001
## title
Monocyte, lymphocyte and basophil are all leukocytes. How do they split into the two leukocyte groups?
## question
Monocyte, lymphocyte and basophil are all leukocytes. How do they split into the two leukocyte groups?
## subject
haem
## status
Draft
## owner
Dr. Omar
## answer_a
Basophil is granular; monocyte and lymphocyte are non-granular
## explanation_a
Correct. The granular leukocytes — named for their specific stainable granules and segmented nuclei — are the neutrophil, eosinophil and basophil. The non-granular leukocytes are the monocyte and lymphocyte, whose only granules are azurophil (lysosomal), not the specific granules that define a granulocyte. The thing to hold is that "non-granular" describes just these two cell types, not basophil, which is one of the three granular ones.
## answer_b
All three are non-granular leukocytes
## explanation_b
Incorrect. This picks the student who has grouped every leukocyte that is not a neutrophil as "non-granular" — but the basophil carries its own specific granules and a segmented nucleus, making it one of the three granular leukocytes alongside the neutrophil and eosinophil.
## answer_c
All three are granular leukocytes
## explanation_c
Incorrect. Monocyte and lymphocyte carry no specific granules and an unsegmented nucleus — they are the non-granular leukocytes. Only basophil, of the three named here, is granular.
## answer_d
Monocyte is granular; lymphocyte and basophil are non-granular
## explanation_d
Incorrect. This reverses the actual split: monocyte is one of the two non-granular leukocytes, while basophil — not lymphocyte — is one of the three granular ones.
## format
single best answer
## correct_answer
A

## main_concept
CON-HEM-785718A47454E8
## topic
Histology
## subtopic
Blood
## difficulty
Easy
## question_type
Classification
## cognitive_effort
Low
## cognitive_effort_score
0.25
## setting
Academic
## reasoning_level
1
## inferred_difficulty
75
## exam_relevance
4
## clinical_relevance
0.3
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.4
## years
AU_Y1
## universities
au
## module
AU-MED-102
## module_subject
AU-MED-102 > Medical Terminology > Terminology > Word building
## library_ids
ART-101-HIS-NON-GRANULAR-LEUKOCYTES
## contextual_concept_ids

## question_only_for

## learning_objective
Recognise monocyte, lymphocyte and basophil as leukocytes, and sort the five leukocyte types into the granular and non-granular groups.
## source_citation
AU-MED-102 Medical Terminology MCQ bank 6, Lecture 4, item 110 (answer key: 110 = A).
## estimated_seconds
30
## randomise_answers
yes
## author_notes
Tests the same granular/non-granular concept authored by the Kasr 101-ISK lane in 101-ISK-mcq-concepts.md; this lane adds no new concept, only the AU-MED-102 exam signal and this question.

---

# Item

## id
QST-MSK-LONGBONE-REGIONS-001
## title
The epiphyses are the enlarged ends of a long bone — which ends, and is the epiphysis itself long or short?
## question
The epiphyses are the enlarged ends of a long bone — which ends, and is the epiphysis itself long or short?
## subject
msk
## status
Draft
## owner
Dr. Omar
## answer_a
Both the proximal and distal ends; a long bone
## explanation_a
Correct. The epiphyses are the expanded upper (proximal) and lower (distal) ends of a long bone, carrying the articular surfaces and covered by hyaline cartilage — both ends, not one. And "epiphysis" only ever describes the end of a long bone: it is the diaphysis (shaft) that runs between the two epiphyses, and short, flat and irregular bones have no diaphysis/epiphysis structure at all. The thing to hold is the whole-bone picture: epiphysis-diaphysis-epiphysis, always in a long bone.
## answer_b
Only the proximal end; a short bone
## explanation_b
Incorrect on both counts. It picks the student who assumes only one end of a long bone is expanded (both ends are), and who has swapped which bone category carries an epiphysis at all — the term applies to long bones, not short ones.
## answer_c
Only the distal end; a long bone
## explanation_c
Incorrect. This is half right — a long bone is correct — but wrong on which end: both the proximal and distal ends are epiphyses, not only the distal one.
## answer_d
Both the proximal and distal ends; a short bone
## explanation_d
Incorrect. This is half right — both ends is correct — but wrong on the bone type: the epiphysis/diaphysis/metaphysis structure belongs to a long bone, not a short one.
## format
single best answer
## correct_answer
A

## main_concept
CON-MSK-EFD497A9922A4D
## topic
Anatomy
## subtopic
Basis of Anatomy
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
2
## inferred_difficulty
60
## exam_relevance
5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
AU_Y1=0.4
## years
AU_Y1
## universities
au
## module
AU-MED-102
## module_subject
AU-MED-102 > Medical Terminology > Terminology > Word building
## library_ids
ART-101-ANA-SKELETAL-SYSTEM
## contextual_concept_ids

## question_only_for

## learning_objective
Name the region of a long bone from a description of it, and state that the epiphysis/diaphysis/metaphysis structure is exclusive to long bones.
## source_citation
AU-MED-102 Medical Terminology MCQ bank 6, Lecture 5, items 180-181 (answer key: 180 = C, 181 = B).
## estimated_seconds
45
## randomise_answers
yes
## author_notes
Combines the bank's two separate items (180: which ends; 181: long vs short bone) into one question, since both test the same concept and neither alone is a full single-best-answer item as printed (180 already has "proximal and distal" as its own correct option; 181 is binary long/short). Distractors c/d are half-right/half-wrong combinations of the bank's own two dimensions, not invented facts.
