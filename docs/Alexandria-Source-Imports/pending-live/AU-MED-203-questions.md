<!--
  Question testing the HIT-PENDING concept CON-NEU-489FA78A649E37 (ciliary ganglion, among
  cranial nerves III/VII/IX parasympathetic relay), per LANE-BRIEF.md §21: authored now, not
  deferred. The concept and its teaching article are live only in the Kasr Year-1 lane's own
  batch (docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md +
  docs/Kasr-Source-Imports/article/102-INT-physiology.md, mirrored at
  docs/import-ready/concept/102-INT-mcq-concepts.md), not yet imported to production. Omar
  applies this file only after that Kasr batch is live. Triage: coverage/AU-MED-203-triage.md
  "Confirmed HIT-PENDING (2)" — Quiz 1 Q4.

  Validate:
    node scripts/content/gate.mjs batch docs/Alexandria-Source-Imports/pending-live/AU-MED-203-questions.md \
      --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
      --with docs/Kasr-Source-Imports/article/102-INT-physiology.md
    node scripts/content/gate.mjs simulate \
      docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
      docs/Kasr-Source-Imports/article/102-INT-physiology.md \
      docs/Alexandria-Source-Imports/pending-live/AU-MED-203-questions.md
-->

# Item

## id
QST-NEU-AU203-CILIARY-GANGLION-001
## title
Nerve to inferior oblique and the ciliary ganglion
## question
Which branch of the following nerves synapses in the ciliary ganglion?
## subject
neuro
## status
Draft
## owner
Claude
## answer_a
Abducent nerve
## explanation_a
Incorrect. The abducens nerve (CN VI) supplies only the lateral rectus muscle and carries no parasympathetic fibers to the ciliary ganglion; it plays no role in pupillary or accommodation reflexes.
## answer_b
Nerve to inferior oblique
## explanation_b
Correct. The oculomotor nerve's (CN III) branch to inferior oblique carries the preganglionic parasympathetic fibers, originating in the Edinger-Westphal nucleus, that synapse in the ciliary ganglion. Postganglionic fibers then travel as short ciliary nerves to the sphincter pupillae (producing miosis) and the ciliary muscle (increasing lens power for near vision). This pathway is the anatomical basis of both the pupillary light reflex and the accommodation reflex, and is the same relay tested for the facial and glossopharyngeal nerves' own parasympathetic ganglia (pterygopalatine/submandibular and otic, respectively).
## answer_c
Nerve to superior oblique
## explanation_c
Incorrect. The superior oblique muscle is supplied by the trochlear nerve (CN IV), a purely motor nerve with no parasympathetic fibers and no relation to the ciliary ganglion.
## answer_d
Ophthalmic
## explanation_d
Incorrect. The ophthalmic nerve (CN V1) contributes a sensory root to the ciliary ganglion (carrying corneal and ocular sensation back to the trigeminal ganglion), but it is the oculomotor nerve's branch to inferior oblique that carries the parasympathetic fibers that actually synapse in the ganglion.
## format
single best answer
## correct_answer
B

## main_concept
CON-NEU-489FA78A649E37
## topic
Cranial nerves
## subtopic
Autonomic ganglia of the head
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
AU-MED-203 > Nervous System > Workshop Quiz 1
## library_ids
ART-102-PHY-PARASYMPATHETIC-NERVOUS-SYSTEM
## contextual_concept_ids

## question_only_for

## learning_objective
Identify the oculomotor nerve's branch to inferior oblique as the route of preganglionic parasympathetic fibers that synapse in the ciliary ganglion, distinguishing it from the facial and glossopharyngeal nerves' own cranial parasympathetic ganglia.
## source_citation
AU-MED-203 Nervous System Workshop Quiz 1 (src_9a9b871f19d313ffca54), p3 q4, answer table p10 (key: b).
## estimated_seconds
45
## randomise_answers
yes
## author_notes
Tests the same III/VII/IX cranial-nerve-ganglion concept authored by the Kasr 102-INT lane in CON-NEU-489FA78A649E37 (docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md); this lane adds no new concept, only the AU-MED-203 exam signal and this question. keySource: printed answer table p10.
