<!--
  Questions testing the HIT-PENDING concept CON-NEU-489FA78A649E37 (ciliary ganglion / near-
  response pathway, among cranial nerves III/VII/IX parasympathetic relay), per LANE-BRIEF.md
  §21: authored now, not deferred. The concept and its teaching article are live only in the
  Kasr Year-1 lane's own batch (docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md +
  docs/Kasr-Source-Imports/article/102-INT-physiology.md, mirrored at
  docs/import-ready/concept/102-INT-mcq-concepts.md), not yet imported to production. Omar
  applies this file only after that Kasr batch is live. Triage: coverage/AU-MED-203-triage.md
  "Confirmed HIT-PENDING (2)" — Quiz 1 Q4 (below), plus its Quiz 2 Q3 sibling (LANE-CARD-Y2 §6:
  "a known HIT-PENDING → append to the existing pending-live file with the same apply-after
  header").

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

---

# Item

## id
QST-NEU-AU203-EW-NEAR-RESPONSE-001
## title
Light-near dissociation and the near response's pretectal-region relay
## question
If the light reflex is present and the accommodation (near) reflex is absent, the lesion is most likely in the:
## subject
neuro
## status
Draft
## owner
Claude
## answer_a
Pretectal nucleus
## explanation_a
Correct. This describes the less commonly tested, reverse pattern of light-near dissociation from the classic Argyll-Robertson pupil (light absent, near preserved): here, a lesion affecting the near-response's own relay circuitry near the pretectal region selectively abolishes accommodation while sparing the separate direct pretecto-Edinger-Westphal relay that subserves the pupillary light reflex, so the light reflex remains intact. Because the near response also depends on cortical (frontal/parietal) input converging near this same midbrain region before reaching the Edinger-Westphal nucleus, a lesion here can disrupt accommodation specifically without touching the more direct light-reflex pathway. This question and Quiz 2's very next item test the two directions of light-near dissociation side by side, and are best learned as a contrasting pair rather than in isolation.
## answer_b
Ganglion cells
## explanation_b
Incorrect. Retinal ganglion cells are the first-order neurons of the entire visual and pupillary afferent pathway; a lesion here would impair the light reflex (an afferent-limb problem), not selectively spare it while abolishing only accommodation.
## answer_c
Edinger-Westphal nucleus
## explanation_c
Incorrect. A true lesion of the Edinger-Westphal nucleus itself would abolish BOTH the light reflex and the near response, since it is the shared final common efferent nucleus for both pathways' parasympathetic outflow to the ciliary ganglion — it cannot selectively spare one while abolishing the other.
## answer_d
Visual cortex
## explanation_d
Incorrect. An isolated visual cortex lesion produces cortical visual field loss, not a selective pupillary near-response deficit with a preserved light reflex; the pupillary light and near reflexes are subcortical (brainstem) circuits that do not require visual cortex.
## format
single best answer
## correct_answer
A

## main_concept
CON-NEU-489FA78A649E37
## topic
Pupillary reflexes
## subtopic
Light-near dissociation
## difficulty
Moderate
## question_type
Classification
## cognitive_effort
Moderate
## cognitive_effort_score
0.45
## setting
Academic
## reasoning_level
2
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
AU-MED-203 > Nervous System > Workshop Quiz 2
## library_ids
ART-102-PHY-PARASYMPATHETIC-NERVOUS-SYSTEM
## contextual_concept_ids
CON-NEU-16E1FDD95745B6
## question_only_for

## learning_objective
Contrast the reverse light-near dissociation (light present, near absent, a pretectal-region near-response lesion) with the classic Argyll-Robertson pattern (light absent, near present), and state that neither localises to the Edinger-Westphal nucleus itself.
## source_citation
AU-MED-203 Nervous System Workshop Quiz 2 (src_e0ce8dbbc37fcf3b12e9), p2 q3, answer table p10 (key: a).
## estimated_seconds
60
## randomise_answers
yes
## author_notes
Sibling of the Quiz 1 Q4 ciliary-ganglion question above; tests the same III/VII/IX cranial-nerve-ganglion/near-response concept authored by the Kasr 102-INT lane in CON-NEU-489FA78A649E37 — this lane adds no new concept, only the AU-MED-203 exam signal and this question. contextual_concept_ids names quiz2-q04's own new Argyll-Robertson-pupil concept (CON-NEU-16E1FDD95745B6, live in this lane's own quiz2-mcq batch) as the natural contrasting pair, per LANE-CARD-Y2 §6. keySource: printed answer table p10.
