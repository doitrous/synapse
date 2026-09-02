<!--
  1 MCQ on the 1 HIT-PENDING ASU-CNS-3 concept sparse-updated in
  AU-MED-203-cns3-final2024-overlay-concepts.md (CON-NEU-44845BF496BE5F trochlear nerve /
  superior cerebellar peduncle decussation), per LANE-CARD-Y2 §6: "check ASU-CNS-3 first, reuse
  via sparse overlay with tag additions only — never a twin." The concept and its teaching
  article are live only in the Ain Shams lane's own batch
  (docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-final2024-mcq-concepts.md +
  docs/Ain-Shams-Source-Imports/article/ASU-CNS-3-final2024-mcq-articles.md), not yet imported
  to production. Omar applies this file, and its sibling concept-overlay file, only after that
  ASU-CNS-3 batch is live. Triage: AU-MED-203 Week 2 EOM Final Q5 (coverage/AU-MED-203-triage.md's
  per-item search-before-mint law; verified via find-existing.mjs before minting was even
  considered).

  Validate:
    node scripts/content/gate.mjs batch docs/Alexandria-Source-Imports/pending-live/AU-MED-203-cns3-final2024-overlay-questions.md \
      --with docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-final2024-mcq-concepts.md \
      --with docs/Ain-Shams-Source-Imports/article/ASU-CNS-3-final2024-mcq-articles.md
    node scripts/content/gate.mjs simulate \
      docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-final2024-mcq-concepts.md \
      docs/Ain-Shams-Source-Imports/article/ASU-CNS-3-final2024-mcq-articles.md \
      docs/Alexandria-Source-Imports/pending-live/AU-MED-203-cns3-final2024-overlay-concepts.md \
      docs/Alexandria-Source-Imports/pending-live/AU-MED-203-cns3-final2024-overlay-questions.md
-->

# Item

## id
QST-NEU-AU203-TROCHLEAR-CONTRALATERAL-NUCLEUS-001
## title
The cranial nerve originating from a contralateral nucleus
## question
Which of the following cranial nerves originates from Contralateral nucleus to its side?
## subject
neuro
## status
Draft
## owner
Claude
## answer_a
Trochlear nerve
## explanation_a
Correct. The trochlear nerve is the only cranial nerve whose fibers fully decussate within the brainstem before emerging, at the inferior (inferior collicular) level of the midbrain, and the only cranial nerve to exit the brainstem dorsally. Because of this crossing, the LEFT trochlear nucleus supplies the RIGHT superior oblique muscle, meaning the nerve effectively originates from a nucleus contralateral to the side it supplies, the same decussation this module's ASU-CNS-3 sibling concept records for the trochlear nerve and the superior cerebellar peduncle together at this same inferior midbrain level.
## answer_b
Facial nerve
## explanation_b
Incorrect. The facial nerve's motor nucleus supplies the SAME (ipsilateral) side of the face; it does not decussate before exiting the pons.
## answer_c
Abducent nerve
## explanation_c
Incorrect. The abducent nerve's nucleus supplies the ipsilateral lateral rectus directly, with no crossing before the nerve exits the pontomedullary junction.
## answer_d
Glossopharyngeal nerve
## explanation_d
Incorrect. The glossopharyngeal nerve's nuclei (nucleus ambiguus, solitary tract, inferior salivatory) supply ipsilateral structures without this dorsal midbrain decussation.
## format
single best answer
## correct_answer
A

## main_concept
CON-NEU-44845BF496BE5F
## topic
Brainstem cranial nerve nuclei
## subtopic
Trochlear nerve decussation
## difficulty
Hard
## question_type
Recall
## cognitive_effort
High
## cognitive_effort_score
0.75
## setting
Academic
## reasoning_level
3
## inferred_difficulty
62
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
AU-MED-203 > Nervous System > Week 2 EOM Final
## library_ids
ART-NEU-ASU-CNS3-THE-TROCHLEAR-NERVE-AND-THE-SUPERIOR-CEREBELLAR-PEDUNCLE
## contextual_concept_ids

## question_only_for

## learning_objective
Identify the trochlear nerve as the cranial nerve that originates from a nucleus contralateral to the side it supplies, since its fibers decussate at the inferior midbrain level before exiting dorsally.
## source_citation
AU-MED-203 Week 2 EOM Final (src_70b2ac8853db17b047ea), p2 q5, inline per-page answer line (key: a).
## estimated_seconds
60
## randomise_answers
yes
## author_notes
Tests the same trochlear-nerve-decussation concept authored by the ASU-CNS-3 lane in CON-NEU-44845BF496BE5F (docs/Ain-Shams-Source-Imports/concept/ASU-CNS-3-final2024-mcq-concepts.md), verified an exact hit via find-existing.mjs ("trochlear nerve") before minting was even considered; this lane adds no new concept, only the AU-MED-203 exam signal and this question, plus the sparse overlay in AU-MED-203-cns3-final2024-overlay-concepts.md. keySource: inline per-page answer line, p2.
