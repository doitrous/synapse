# AU-MED-102 · Biochemistry · sub-lane A — questions testing a HIT-PENDING (Kasr) concept
# Per LANE-BRIEF §21: authored now, not deferred. Apply only after
# docs/Kasr-Source-Imports/concept/102-INT-concepts.md AND
# docs/Kasr-Source-Imports/article/102-INT-biochemistry.md are both live.
#
# Validate with:
#   npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-structural-questions.md \
#     --with docs/Kasr-Source-Imports/concept/102-INT-concepts.md \
#     --with docs/Kasr-Source-Imports/article/102-INT-biochemistry.md
# Prove the merge with (plain arguments, Kasr files first):
#   npm run medical:simulate -- docs/Kasr-Source-Imports/concept/102-INT-concepts.md \
#     docs/Kasr-Source-Imports/article/102-INT-biochemistry.md \
#     docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-structural-questions.md --emit /tmp/sim-...json

# Item

## id
QST-FND-AU-102-PROT-PENDING-001

## title
During denaturation, which level of protein structure is retained?

## question
During denaturation, proteins will not lose their structure, with regard to:

## subject
fnd

## status
Draft

## owner
Admin team

## vignette


## correct_answer
A

## answer_a
Primary structure

## explanation_a
Correct. Denaturation ruptures the non-covalent (and disulfide) bonds holding secondary, tertiary and quaternary structure, leaving the protein insoluble, more digestible and biologically inactive — but the peptide-bonded amino-acid sequence, the primary structure, is untouched.

## answer_b
Secondary structure

## explanation_b
Incorrect. Secondary structure (alpha helices, beta sheets) is held by hydrogen bonds, which denaturation disrupts.

## answer_c
Tertiary structure

## explanation_c
Incorrect. Tertiary structure is held by non-covalent interactions (and sometimes disulfide bonds), which denaturation disrupts, collapsing the protein's three-dimensional fold.

## answer_d
Quaternary structure

## explanation_d
Incorrect. Quaternary structure (the association of separate polypeptide subunits) is held by non-covalent interactions between subunits, which denaturation disrupts.

## topic
Protein chemistry

## subtopic


## main_concept
CON-FND-2414B3639FD4D3

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.4

## years
AU_Y1

## universities
au

## module


## module_subject
AU-MED-102 > Biochemistry > Protein Chemistry

## question_only_for


## library_ids
ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE

## resource_ids
src_4852d425a88297af190e

## learning_objective
State that a protein's primary structure survives denaturation while its higher-order structure does not.

## source_citation
Alexandria University AU-MED-102 Biochemistry department, Protein MCQ bank (Q18, Q23, Q45, Q63), Dr. Mohamed Agha ("The Genius in Biochemistry").

## author_notes
Tests CON-FND-2414B3639FD4D3, a HIT-PENDING Kasr concept (docs/Kasr-Source-Imports/concept/102-INT-concepts.md), taught by docs/Kasr-Source-Imports/article/102-INT-biochemistry.md's "Proteins of biological importance" section. Filed in pending-live per LANE-BRIEF §21 rather than deferred; apply only after both Kasr files are live. AU-MED-102's own Protein Chemistry article also teaches this fact and cross-references this id (two-sided coverage, brief §22).

## estimated_seconds
60

## randomise_answers
yes

## attached_image


## attachments


## media_recommendations

