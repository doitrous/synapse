<!--
  Question on the ciprofloxacin/DNA-gyrase concept (CON-FND-014D200ED96498), which is
  live only in the Alexandria Year-1 lane's unimported batch
  (docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md /
  docs/import-ready/concept/AU-MED-102-biochem-molecular-concepts.md,
  canonical_key pharmacology.ciprofloxacin.dna-gyrase-inhibition). Omar applies this
  file only after that Alexandria batch AND
  AUN-MPT-104-q40-dna-gyrase-concept.md (the sparse `+aun` overlay) are live.

  Import order: 1) the Alexandria AU-MED-102 concept batch, 2) the sibling
  -concept.md overlay file, 3) this question file -- Admin › Concepts import twice,
  then Admin › Bulk import → question.

  Validate:
    medical:batch --with docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md \
                   --with docs/Assiut-Source-Imports/evidence/AUN-MPT-104-final-2022-resources.md \
                   docs/Assiut-Source-Imports/pending-live/AUN-MPT-104-q40-dna-gyrase.md
    medical:simulate docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md \
                      docs/Assiut-Source-Imports/evidence/AUN-MPT-104-final-2022-resources.md \
                      docs/Assiut-Source-Imports/pending-live/AUN-MPT-104-q40-dna-gyrase.md
-->

# Item

## id
QST-AUNMPT104-FINAL2022-Q40

## title
Ciprofloxacin's mechanism of action in acute bacterial prostatitis

## question
A 65-year-old man is diagnosed with acute bacterial prostatitis and is prescribed ciprofloxacin for 6 weeks. His agent acts by which of the following mechanisms?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Competitive inhibition of para-aminobenzoic acid

## explanation_a
Incorrect. Competitive inhibition of para-aminobenzoic acid (PABA) in the folate-synthesis pathway is the mechanism of the sulfonamides, not a fluoroquinolone; ciprofloxacin does not touch folate metabolism.

## answer_b
Inhibition of bacterial cell wall synthesis

## explanation_b
Incorrect. Inhibition of bacterial cell wall synthesis describes the beta-lactams (penicillins, cephalosporins) and glycopeptides such as vancomycin, which act on peptidoglycan cross-linking, not on DNA replication.

## answer_c
Inhibition of DNA gyrase

## explanation_c
Correct. Ciprofloxacin is a fluoroquinolone: it inhibits bacterial DNA gyrase (topoisomerase II) and, in Gram-positive organisms, topoisomerase IV, both of which are required to relieve supercoiling ahead of the replication fork. Blocking this step halts DNA replication and is bactericidal — the mechanism that makes fluoroquinolones effective for a deep-tissue infection like bacterial prostatitis, where good tissue penetration and a bactericidal action are both needed.

## answer_d
Reversible binding to 50S ribosomal subunit

## explanation_d
Incorrect. Reversible binding to the 50S ribosomal subunit describes macrolides (e.g., erythromycin) and clindamycin, which block protein synthesis — a different target and a different (usually bacteriostatic) class of action from ciprofloxacin's.

## topic
Antimicrobial pharmacology

## subtopic
Fluoroquinolones

## main_concept
CON-FND-014D200ED96498

## concept_ids
CON-FND-014D200ED96498

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

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
AUN-MPT-104 > Pharmacology > Antimicrobial pharmacology

## question_only_for

## library_ids
ART-FND-DNA-REPLICATION-REPAIR-PCR

## resource_ids
src_1c24cca66364c8f2fcbb

## learning_objective
State ciprofloxacin's mechanism of action and distinguish it from the other major antibacterial mechanism classes.

## source_citation
MPT final exam 17/7/2022, p.5

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: circled C, printed exam p.5
pendingConcept: CON-FND-014D200ED96498 is pending in docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md and docs/import-ready/concept/AU-MED-102-biochem-molecular-concepts.md, canonical_key pharmacology.ciprofloxacin.dna-gyrase-inhibition -- this question and its +aun overlay apply only after Omar imports that Alexandria batch
