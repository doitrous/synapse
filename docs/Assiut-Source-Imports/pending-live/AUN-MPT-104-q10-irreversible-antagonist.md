<!--
  Question on the irreversible-antagonist concept (CON-FND-390F2D9EC3D6DC), which is
  live only in the Kasr Year-1 lane's unimported batch
  (docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md /
  docs/import-ready/concept/108-INT-concepts-pharmacology.md). Omar applies this file
  only after that Kasr batch AND
  AUN-MPT-104-q10-irreversible-antagonist-concept.md (the sparse `+aun` overlay) are
  live.

  Import order: 1) the Kasr 108-INT concept batch, 2) the sibling
  -concept.md overlay file, 3) this question file -- Admin › Concepts import twice,
  then Admin › Bulk import → question.

  Validate:
    medical:batch --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md \
                   --with docs/Assiut-Source-Imports/evidence/AUN-MPT-104-final-2022-resources.md \
                   docs/Assiut-Source-Imports/pending-live/AUN-MPT-104-q10-irreversible-antagonist.md
    medical:simulate docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md \
                      docs/Assiut-Source-Imports/evidence/AUN-MPT-104-final-2022-resources.md \
                      docs/Assiut-Source-Imports/pending-live/AUN-MPT-104-q10-irreversible-antagonist.md
-->

# Item

## id
QST-AUNMPT104-FINAL2022-Q10

## title
Novamine reduces Emax without shifting EC50 at low agonist concentration

## question
A study was carried out in isolated intestinal smooth muscle preparations to determine the action of a new drug "Drug A," which in separate studies bound to the same receptors as acetylcholine. In the absence of other drugs, acetylcholine caused contraction of the muscle. In the presence of a low concentration of Drug A, the EC50 of acetylcholine was unchanged, but the Emax was reduced. In the presence of a high concentration of novamine, extremely high concentrations of acetylcholine had no effect. Which of the following expressions best describes novamine?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
A chemical antagonist

## explanation_a
Incorrect. A chemical antagonist neutralises the agonist directly in solution (protamine binding heparin is the classic example) rather than acting at the receptor at all, so it would not be described by an experiment that specifically manipulates receptor occupancy and Emax.

## answer_b
An irreversible antagonist

## explanation_b
Correct. An irreversible antagonist binds the receptor covalently, so the block cannot be reversed by adding more agonist. At a low concentration of the antagonist, only some receptors are permanently occupied, so the maximum achievable response (Emax) falls while the remaining free receptors still reach half-maximal occupancy at roughly the same acetylcholine concentration (EC50 unchanged). At a high enough antagonist concentration, essentially all receptors are covalently blocked, so no amount of acetylcholine, however high, can produce a response — exactly the pattern described.

## answer_c
A physiologic agonist

## explanation_c
Incorrect. A physiologic agonist produces an opposing effect through a separate receptor and physiological pathway (e.g., epinephrine relaxing bronchial smooth muscle that histamine constricts); it does not compete for or block the acetylcholine receptor itself, so it could not produce a rightward Emax reduction or a ceiling effect at the same receptor.

## answer_d
Physiologic antagonist

## explanation_d
Incorrect. A physiologic antagonist is the same idea as C under a different name — an opposing effect through an unrelated receptor and pathway — and does not explain a drug that occupies the acetylcholine receptor itself and abolishes its Emax.

## topic
Pharmacodynamics

## subtopic
Antagonism

## main_concept
CON-FND-390F2D9EC3D6DC

## concept_ids
CON-FND-390F2D9EC3D6DC

## contextual_concept_ids

## difficulty
Moderate

## question_type
Application

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
AUN_Y1=high

## years
AUN_Y1

## universities
aun

## module
AUN-MPT-104

## module_subject
AUN-MPT-104 > Pharmacology > Pharmacodynamics

## question_only_for

## library_ids
ART-108-PHA-PHARMACODYNAMICS

## resource_ids
src_1c24cca66364c8f2fcbb

## learning_objective
Distinguish an irreversible antagonist's effect on Emax and EC50 from chemical and physiologic antagonism.

## source_citation
MPT final exam 17/7/2022, p.2

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: circled B, printed exam p.2
pendingConcept: CON-FND-390F2D9EC3D6DC is pending in docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md and docs/import-ready/concept/108-INT-concepts-pharmacology.md -- this question and its +aun overlay apply only after Omar imports that Kasr batch
