<!--
  ASU-LOCO Physiology MCQs -- third pass on excitation-contraction coupling, fibre-type
  metabolism, motor-unit composition and the force-velocity relationship (13 items,
  printed questions 23, 24, 29, 30, 32, 33, 34, 35, 37, 40, 42, 45, 46). Every stem, option
  and correct answer letter is verbatim from the native-text ASU Locomotor Physiology MCQ
  paper ("MCQs - Locomotor Physiology Questions.pdf", manifest src_3be9856ba9380e79cb01),
  extracted with pdftotext -layout and cross-checked against the printed answer key on PDF
  pages 22-23. Printed question numbers are kept in ## derived_from and ## source_citation.
  Import: Admin > Bulk import > question. status: Draft throughout; these need a faculty
  reviewer.

  Fifth authoring pass on this paper -- see ASU-LOCO-msk-physiology-triad-contractile-
  proteins-2-mcq.md for the running tally (13 authored there) and PROGRESS.md on branch
  asu-loco-author3 for the full count. Reuses the same 20 pending-live overlay concepts
  the first authoring pass minted -- no new concept minted this pass either.

  Validate with:
    npm run medical:batch -- <this file> \
      --with docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md \
      --with docs/Ain-Shams-Source-Imports/pending-live/ASU-LOCO-msk-physiology.md \
      --with docs/Ain-Shams-Source-Imports/concept/ASU-LOCO-msk-new-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-physiology.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-vitamins-nerve.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-histology.md \
      --with docs/Ain-Shams-Source-Imports/pending-live/ASU-LOCO-msk-articles.md \
      --with docs/Ain-Shams-Source-Imports/article/ASU-LOCO-msk-new-articles.md \
      --with docs/Ain-Shams-Source-Imports/resource/ASU-LOCO-msk-inf-resources.md

  npm run medical:simulate takes these same files as POSITIONAL arguments, never --with.
-->

# Item

## id
QM-ASULOCO-B8D1F8EEF7B3

## title
Which statement about calcium in skeletal muscle is incorrect?

## question
Which of the following about Ca++ is incorrect:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares five statements about calcium's role in contraction and relaxation and must find the one that wrongly claims skeletal muscle needs extracellular calcium to contract.

## format
single best answer

## derived_from
Printed question 23 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
Skeletal muscle needs influx of ECF Ca++ to contract.

## explanation_a
Correct -- this is the false statement. Skeletal muscle's contraction-triggering calcium is released entirely from the sarcoplasmic reticulum's internal store; it does not depend on calcium entering from the extracellular fluid the way cardiac muscle does. This is exactly why a skeletal muscle fibre isolated in a calcium-free bath can still contract when stimulated, whereas a cardiac fibre in the same bath cannot.

## answer_b
Ca++ binds to troponin C.

## explanation_b
This is a true statement, not the answer sought -- troponin C is the calcium-binding subunit of the troponin complex.

## answer_c
For relaxation, active Ca++ reuptake into the sarcoplasmic reticulum occurs.

## explanation_c
This is a true statement, not the answer sought -- the SERCA pump actively transports calcium back into the sarcoplasmic reticulum, using ATP, to end the contraction.

## answer_d
Ca++ is the link between electrical and mechanical events in the muscle.

## explanation_d
This is a true statement, not the answer sought -- calcium is exactly the intermediary that couples the electrical action potential to the mechanical cross-bridge cycling, which is why the whole process is named excitation-contraction coupling.

## answer_e
Activation of DHP leads to conformational changes that lead to opening of ryanodine receptors.

## explanation_e
This is a true statement, not the answer sought -- the dihydropyridine receptor's voltage-triggered conformational change is what mechanically opens the adjacent ryanodine receptor channel on the sarcoplasmic reticulum.

## topic
Physiology

## subtopic
Excitation-contraction coupling

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Discrimination

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
52

## exam_relevance
9

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that skeletal muscle's contraction-triggering calcium comes entirely from the sarcoplasmic reticulum, unlike cardiac muscle's dependence on extracellular calcium entry.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 23; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed answer key: A.

---

# Item

## id
QM-ASULOCO-DD20286741E4

## title
Which of the following does not occur in the sliding filament theory?

## question
Which of the following does not occur in sliding filament theory:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student lists five changes said to happen as a sarcomere shortens and must identify the one that describes the I band changing in the wrong direction.

## format
single best answer

## derived_from
Printed question 24 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
E

## answer_a
Sarcomere length is reduced.

## explanation_a
This genuinely occurs, so it is not the answer sought -- shortening the sarcomere is the defining outcome of the sliding-filament mechanism.

## answer_b
H zone disappear.

## explanation_b
This genuinely occurs, so it is not the answer sought -- as thin filaments slide further toward the sarcomere's centre, the myosin-only H zone narrows and can vanish at full contraction.

## answer_c
A band length remains constant.

## explanation_c
This genuinely occurs, so it is not the answer sought -- the A band's length is fixed by the myosin filament's own length, which does not change as filaments slide.

## answer_d
Z lines come closer to each others.

## explanation_d
This genuinely occurs, so it is not the answer sought -- the Z lines bounding the sarcomere are pulled toward one another as cross-bridge cycling shortens the sarcomere.

## answer_e
I band length increased.

## explanation_e
Correct -- this does NOT occur. The I band, made of actin only, is pulled further into the A band during contraction, so its length DECREASES, not increases. A student who answers "increased" has the direction of the I band change backwards, and the same confusion, left unfixed, tends to carry over into misreading the H zone's change in the opposite direction as well.

## topic
Physiology

## subtopic
Cross-bridge cycling

## main_concept
CON-MSK-B2B106C1D81C30

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Discrimination

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that the I band shortens, rather than lengthens, during skeletal muscle contraction.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 24; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: E.

---

# Item

## id
QM-ASULOCO-91BAC4EFB3D1

## title
Excitation-contraction coupling involves all of the following except which?

## question
Excitation contraction coupling involves all the following except:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student revising the excitation-contraction sequence is given four steps and must spot the one that reverses the true direction of the calcium-troponin interaction, echoing an earlier question on the same paper.

## format
single best answer

## derived_from
Printed question 29 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
Release of Ca++ from troponin.

## explanation_a
Correct -- this is the step that does NOT occur, because it is stated backwards. Calcium is released from the sarcoplasmic reticulum and then binds TO troponin C; it is never released FROM troponin as a step of excitation-contraction coupling. The paper repeats this exact reversed-direction trap as its very first question, which shows how deliberately the department tests this specific misconception.

## answer_b
Formation of cross bridges between actin and myosin.

## explanation_b
This genuinely is part of the coupling sequence, so it is not the answer sought -- once calcium has uncovered actin's binding site, the energised myosin head attaches to form a cross-bridge.

## answer_c
Spread of depolarization along the transverse tubules.

## explanation_c
This genuinely is part of the coupling sequence, so it is not the answer sought -- the T-tubules carry the action potential from the sarcolemma into the fibre's depth, close to the triads.

## answer_d
Hydrolysis of ATP to ADP.

## explanation_d
This genuinely is part of the coupling sequence, so it is not the answer sought -- ATP hydrolysis on the myosin head energises the power stroke that follows cross-bridge formation.

## topic
Physiology

## subtopic
Excitation-contraction coupling

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Recall/discrimination

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
9

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State the correct direction of the calcium-troponin interaction in excitation-contraction coupling, recognising a reversed-direction distractor whether it appears as question 1 or question 29 of the same paper.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 29; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: A. Near-duplicate of printed question 1 (same trap, four options instead of five) -- kept as a separate record because it is a distinct printed item with its own answer-key row, per the "same printed question sat twice is one record" rule applying only to a genuine repeat of the identical item, not a shortened restatement of it.

---

# Item

## id
QM-ASULOCO-2040503BA9D5

## title
What is muscle fatigue due to?

## question
Muscle fatigue is due to:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked, in a shorter four-option form of an earlier question on the same paper, to name the single best explanation for why a repeatedly stimulated muscle's contractions weaken.

## format
single best answer

## derived_from
Printed question 30 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
Inability of the action potential to spread over the muscle.

## explanation_a
Incorrect. The action potential continues to spread and invade the fibre even once fatigue has set in; the failure lies downstream, in the muscle's own metabolic and contractile machinery, not in the electrical spread itself.

## answer_b
Failure of muscle to slide actin over myosin.

## explanation_b
Incorrect. Loss of sliding is a consequence of fatigue rather than its cause -- naming it as the cause explains fatigue by restating one of its effects.

## answer_c
Nerve fatigue.

## explanation_c
Incorrect. The neuromuscular junction and motor nerve are comparatively resistant to fatigue and are not the primary site of failure in ordinary skeletal muscle fatigue; the problem is chiefly within the muscle fibre itself.

## answer_d
Depletion of energy stores.

## explanation_d
Correct. Muscle fatigue is driven principally by depletion of ATP, glycogen and creatine phosphate as the muscle's energy systems are outpaced by demand, together with the accumulation of lactic acid this produces. Once these stores run low, cross-bridge cycling can no longer be sustained at its earlier rate, so the strength and speed of contraction fall even though the nerve and its action potential are still functioning normally.

## topic
Physiology

## subtopic
Fatigue and metabolism

## main_concept
CON-MSK-2E4061334D52EA

## concept_ids


## contextual_concept_ids


## difficulty
Easy

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
45

## exam_relevance
9

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-FATIGUE-METABOLISM

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that depletion of the muscle's own energy stores, not a failure of nerve conduction, is the principal driver of skeletal muscle fatigue.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 30; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
40

## randomise_answers
yes

## author_notes
Printed answer key: D. Shorter four-option restatement of printed question 2 (same underlying fact, different option set) -- authored as a separate record for the same reason as question 29 above.

---

# Item

## id
QM-ASULOCO-AF0464C5B8FA

## title
Which is not a characteristic of red (slow) fibres?

## question
Red (slow) fibers are characterized by the following except:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student lists four properties of red slow-twitch fibres and must find the one that actually belongs to pale fast-twitch fibres instead.

## format
single best answer

## derived_from
Printed question 32 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
Contains much blood capillaries.

## explanation_a
This genuinely describes red fibres, so it is not the answer sought -- their rich capillary supply delivers the oxygen their oxidative metabolism depends on.

## answer_b
Glycogen stores is low.

## explanation_b
This genuinely describes red fibres, so it is not the answer sought -- they rely mainly on fatty acids and oxidative phosphorylation rather than stored glycogen for their sustained, lower-intensity work.

## answer_c
Contains high concentration of myoglobin.

## explanation_c
This genuinely describes red fibres, so it is not the answer sought -- their high myoglobin content both gives them their red colour and buffers oxygen for continuous oxidative use.

## answer_d
Depends on anaerobic oxidation.

## explanation_d
Correct -- this is the exception. Red (slow) fibres are built around aerobic, oxidative metabolism -- rich in mitochondria, capillaries and myoglobin -- and are fatigue-resistant precisely because they do not rely on anaerobic glycolysis. Dependence on anaerobic metabolism instead describes pale, fast-twitch fibres, which fatigue quickly because their glycolytic energy supply is limited and lactic-acid-producing.

## topic
Physiology

## subtopic
Fibre types

## main_concept
CON-MSK-3E5F54D8D58E9C

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Discrimination

## cognitive_effort
Medium

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
52

## exam_relevance
9

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that red slow-twitch fibres depend on aerobic, not anaerobic, metabolism, distinguishing them from pale fast-twitch fibres.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 32; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Printed answer key: D.

---

# Item

## id
QM-ASULOCO-BF8588F52AF4

## title
What is the intracellular fluid between the myofibrils called?

## question
Intracellular fluid between the myofibrils is:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked to name the cytoplasm-equivalent fluid that fills the spaces between the myofibrils inside a skeletal muscle fibre.

## format
single best answer

## derived_from
Printed question 33 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
Sarcomere

## explanation_a
Incorrect. The sarcomere is a structural repeating unit within a myofibril, not a fluid compartment between myofibrils.

## answer_b
Sarcoplasm

## explanation_b
Correct. Sarcoplasm is the muscle-specific name for the cytoplasm that surrounds and lies between the myofibrils inside a skeletal muscle fibre, carrying glycogen granules, mitochondria and the enzymes of the muscle's energy systems. It is functionally the same kind of compartment as the cytoplasm of any other cell, but the specialised name signals that muscle physiology treats it as its own object of study, distinct from the myofibrils suspended within it.

## answer_c
Cytoplasm

## explanation_c
Incorrect as the specific term sought. "Cytoplasm" is the generic term used across all cell types; the muscle-specific name being tested here is "sarcoplasm."

## answer_d
Matrix

## explanation_d
Incorrect. "Matrix" is not the term used for this compartment in skeletal muscle; it more commonly refers to the interior of a mitochondrion or to extracellular ground substance, neither of which is what the question asks about.

## topic
Physiology

## subtopic
Skeletal muscle overview

## main_concept
CON-MSK-43CD79301071ED

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.15

## setting
Academic

## reasoning_level
1

## inferred_difficulty
55

## exam_relevance
8

## clinical_relevance
0.1

## academic_relevance
0.85

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Name sarcoplasm as the muscle-specific term for the cytoplasm between the myofibrils.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 33; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
30

## randomise_answers
yes

## author_notes
Printed answer key: B.

---

# Item

## id
QM-ASULOCO-DA5D4B3547CC

## title
What is a motor unit?

## question
A motor neuron and all the muscle fibers it supplies is called:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked to name the functional unit that links one spinal motor neuron to the group of muscle fibres it controls.

## format
single best answer

## derived_from
Printed question 34 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
E

## answer_a
Synaptic cleft

## explanation_a
Incorrect. The synaptic cleft is the narrow gap between the nerve terminal and the muscle fibre at the neuromuscular junction, not the neuron-plus-fibres grouping being asked about.

## answer_b
Axon terminal

## explanation_b
Incorrect. The axon terminal is the very end of a single motor neuron's branch, the structure that releases acetylcholine; it does not itself include the muscle fibres it supplies.

## answer_c
Neuromuscular junction

## explanation_c
Incorrect. The neuromuscular junction is the synapse between one nerve terminal and one muscle fibre, a single point of contact -- not the whole neuron together with every fibre it innervates.

## answer_d
Motor end plate

## explanation_d
Incorrect. The motor end plate is the specialised, folded region of the muscle fibre's membrane at the junction, receiving the nerve's signal -- again a single contact point, not the whole unit of neuron plus fibres.

## answer_e
Motor unit

## explanation_e
Correct. A motor unit is defined as one motor neuron together with every muscle fibre it innervates, and it is the smallest unit of contraction the nervous system can independently control. Small motor units (few fibres per neuron) allow fine control, as in the extraocular muscles, while large motor units (many fibres per neuron) favour raw force, as in the gastrocnemius.

## topic
Physiology

## subtopic
Grading of contraction

## main_concept
CON-MSK-C14F65CD68F720

## concept_ids


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
50

## exam_relevance
9

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-GRADING-LENGTH-LOAD

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Define a motor unit as one motor neuron and every muscle fibre it innervates, distinguishing it from the neuromuscular junction and the motor end plate.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 34; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
35

## randomise_answers
yes

## author_notes
Printed answer key: E.

---

# Item

## id
QM-ASULOCO-97FA8AB0D78F

## title
What substance combines with troponin to remove tropomyosin's block on actin?

## question
What is the substance released from the terminal cisternae that combines with troponin and removes the blocking action of tropomyosin, resulting in the formation of cross bridges?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student must name the single substance that, once released from the sarcoplasmic reticulum, binds troponin and starts the chain of events ending in cross-bridge formation.

## format
single best answer

## derived_from
Printed question 35 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
E

## answer_a
Troponin

## explanation_a
Incorrect. Troponin is the target being bound, not the substance released from the terminal cisternae to bind it -- the question asks what acts ON troponin.

## answer_b
Calmodulin

## explanation_b
Incorrect. Calmodulin is a calcium-binding regulatory protein used in other cell types and in some smooth-muscle signalling, but it is not the terminal-cisternae substance that triggers skeletal muscle's contraction; that role belongs to calcium acting on troponin C directly.

## answer_c
Acetylcholine

## explanation_c
Incorrect. Acetylcholine is released from the motor neuron terminal at the neuromuscular junction, not from the terminal cisternae of the sarcoplasmic reticulum, and it acts on the sarcolemma to trigger depolarisation, not on troponin.

## answer_d
Myosin

## explanation_d
Incorrect. Myosin is a contractile protein of the thick filament; it is not released from the terminal cisternae and does not itself act on troponin.

## answer_e
Ca++

## explanation_e
Correct. Calcium is stored in the terminal cisternae of the sarcoplasmic reticulum and released through ryanodine receptor channels when the T-tubule's dihydropyridine receptor is activated. It then binds troponin C, producing the conformational change that pulls tropomyosin off actin's myosin-binding site and permits cross-bridge formation.

## topic
Physiology

## subtopic
Excitation-contraction coupling

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids


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
55

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Name calcium as the terminal-cisternae substance that binds troponin C and removes tropomyosin's block on actin, distinguishing it from acetylcholine's separate role at the neuromuscular junction.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 35; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Printed answer key: E.

---

# Item

## id
QM-ASULOCO-D1197637050B

## title
Which statement about skeletal muscle physiology is true?

## question
Which of the following statements is true?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student reviews five statements about the sarcoplasmic reticulum, T-tubules and calcium, and must identify the single one that is actually correct.

## format
single best answer

## derived_from
Printed question 37 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
E

## answer_a
Sarcoplasmic reticulum is in direct continuum with the extracellular space.

## explanation_a
Incorrect. It is the T-tubule system, not the sarcoplasmic reticulum, that is continuous with the extracellular space via the sarcolemma; the sarcoplasmic reticulum is a closed internal membrane system.

## answer_b
Sarcoplasmic reticulum allows rapid transmission of action potential from cell membrane to the sarcomere

## explanation_b
Incorrect. This is the T-tubule system's job; the sarcoplasmic reticulum's role is to store and release calcium in response to the signal the T-tubules carry, not to conduct the action potential itself.

## answer_c
Calcium is important for structure support and strength of myofibril

## explanation_c
Incorrect. Calcium's role in this context is a signalling one -- triggering cross-bridge formation by binding troponin C -- not a structural one; the myofibril's mechanical strength comes from its filament and cytoskeletal proteins, not from calcium.

## answer_d
T tubule system in the skeletal muscle is located at the Z line

## explanation_d
Incorrect. In skeletal muscle, the T-tubules are located at the A-I junction (two per sarcomere), not at the Z line; the Z-line location is instead a feature of cardiac muscle's T-tubule system.

## answer_e
Calcium is stored in the terminal cisternae of sarcoplasmic reticulum.

## explanation_e
Correct. The terminal cisternae, the expanded ends of the sarcoplasmic reticulum that flank each T-tubule in a triad, are the specific site where calcium is held at rest and from which it is released through ryanodine receptor channels on stimulation. The calcium is later pumped back into this same store by SERCA during relaxation, so the terminal cisternae act as a reusable reservoir rather than a one-time source that has to be replenished from outside the cell.

## topic
Physiology

## subtopic
Excitation-contraction coupling

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids


## contextual_concept_ids


## difficulty
Hard

## question_type
Discrimination

## cognitive_effort
High

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
3

## inferred_difficulty
42

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that calcium is stored in the sarcoplasmic reticulum's terminal cisternae, and distinguish the T-tubule's electrical-conduction role from the sarcoplasmic reticulum's calcium-storage role.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 37; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Printed answer key: E.

---

# Item

## id
QM-ASULOCO-C97750AE7AAE

## title
Which statement about skeletal muscle contraction is FALSE?

## question
Which of the following statement regarding skeletal muscle contraction is FALSE?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is given five statements about actin, troponin, calcium and relaxation and must find the one that assigns ATPase activity to the wrong contractile protein.

## format
single best answer

## derived_from
Printed question 40 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
Actin contains ATPase which produces energy for sliding filament mechanisms

## explanation_a
Correct -- this is the false statement. ATPase activity resides in the myosin head, not in actin; it is myosin that hydrolyses ATP to power the cross-bridge cycle. Actin has no ATPase site of its own -- its role is structural and regulatory, providing the binding site that tropomyosin covers and myosin heads attach to, not an energy-releasing one.

## answer_b
Troponin has binding sites for calcium, actin and tropomyosin

## explanation_b
This is a true statement, not the answer sought -- the troponin complex's three subunits bind calcium (troponin C), actin (troponin I) and tropomyosin (troponin T) respectively.

## answer_c
Actin is covered by tropomyosin in the resting state, so to prevent binding with myosin head

## explanation_c
This is a true statement, not the answer sought -- this is precisely tropomyosin's role as the relaxing protein at rest.

## answer_d
Calcium is a crucial ion in triggering the power stroke mechanism.

## explanation_d
This is a true statement, not the answer sought -- calcium binding troponin C is the trigger that permits the cross-bridge cycle, of which the power stroke is a step, to proceed.

## answer_e
Muscle relaxation is an active process

## explanation_e
This is a true statement, not the answer sought -- relaxation requires ATP-powered active reuptake of calcium by the sarcoplasmic reticulum's SERCA pump.

## topic
Physiology

## subtopic
Contractile proteins

## main_concept
CON-MSK-287D88DF2F6B8C

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Discrimination

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that ATPase activity belongs to the myosin head, not to actin.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 40; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: A.

---

# Item

## id
QM-ASULOCO-881068943623

## title
Which statement about the properties of skeletal muscle contraction is incorrect?

## question
Which of the following statement regarding the properties of skeletal muscle contraction is INCORRECT?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares five statements about length-tension and force-velocity properties and must find the one that gets the afterload-velocity relationship backwards.

## format
single best answer

## derived_from
Printed question 42 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
Active tension of a muscle fiber is maximal at its resting length

## explanation_a
This is a true statement, not the answer sought -- the resting length of skeletal muscle in the body corresponds closely to the length giving maximal filament overlap and therefore maximal active tension.

## answer_b
Total tension of a muscle fiber decreases with increasing stretch of the fiber.

## explanation_b
This is a true statement in the context being tested, not the answer sought -- beyond the optimal length, further stretch pulls the thick and thin filaments apart, reducing the overlap available for cross-bridge formation and so reducing tension.

## answer_c
Shortening of sarcomere during contraction increases total tension in the muscle

## explanation_c
This is a true statement, not the answer sought -- within the ascending part of the length-tension relationship, sarcomere shortening toward the optimal length increases the tension the muscle can generate.

## answer_d
Velocity of contraction is maximal at high afterload

## explanation_d
Correct -- this is the incorrect statement. The force-velocity relationship shows the opposite pattern: shortening velocity is maximal (V-max) at zero afterload and falls progressively as the afterload increases, reaching zero velocity (an isometric contraction) once the load equals the maximum tetanic tension. A high afterload slows contraction, it does not speed it up.

## answer_e
Sarcomere L-max length is 2.2 microns.

## explanation_e
This is a true statement, not the answer sought -- 2.2 micrometres is the sarcomere length at which thick and thin filament overlap is optimal and active tension is maximal.

## topic
Physiology

## subtopic
Force-velocity relationship

## main_concept
CON-MSK-B7A8FEB348BC9E

## concept_ids


## contextual_concept_ids


## difficulty
Hard

## question_type
Discrimination

## cognitive_effort
High

## cognitive_effort_score
0.6

## setting
Academic

## reasoning_level
3

## inferred_difficulty
38

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-GRADING-LENGTH-LOAD

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that shortening velocity is maximal at zero afterload and falls as afterload rises, the inverse of the incorrect statement tested here.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 42; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Printed answer key: D.

---

# Item

## id
QM-ASULOCO-D1832A6B7963

## title
Which statement about motor units is FALSE?

## question
Which of the following statements regarding motor units is FALSE?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student reviews five statements comparing slow and fast motor units and must find the one that wrongly claims every motor unit contains the same number of fibres.

## format
single best answer

## derived_from
Printed question 45 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
The number of fibers in different motor units are uniform (the same)

## explanation_a
Correct -- this is the false statement. Motor unit size varies enormously across the body: small motor units of only a few fibres per neuron serve muscles needing fine control, such as the extraocular muscles, while large motor units of hundreds or thousands of fibres per neuron serve muscles needing raw force, such as the gastrocnemius. This range is not incidental -- it is exactly how the nervous system matches each muscle's job to the right balance between precision and power.

## answer_b
Each spinal motor neuron only innervate one kind of muscle fibers

## explanation_b
This is a true statement, not the answer sought -- all the fibres within a single motor unit share the same type (all slow-oxidative or all fast-glycolytic, for example), because they are trophically determined by their shared motor neuron.

## answer_c
Slow motor unit is supplied by small sized motor nerve

## explanation_c
This is a true statement, not the answer sought -- small-diameter motor neurons, with their lower excitation threshold, supply small, slow (type I) motor units.

## answer_d
Fast motor unit is supplied by larger sized motor nerve

## explanation_d
This is a true statement, not the answer sought -- large-diameter motor neurons, needing a stronger stimulus to reach threshold, supply large, fast (type II) motor units.

## answer_e
Slow motor units are recruited faster than fast motor units which need a stronger stimulus.

## explanation_e
This is a true statement, not the answer sought -- this describes the size principle of recruitment: small, slow motor units, with their lower threshold, are recruited first as effort increases, and larger, faster units are added only once a stronger stimulus is needed.

## topic
Physiology

## subtopic
Grading of contraction

## main_concept
CON-MSK-C14F65CD68F720

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Discrimination

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
52

## exam_relevance
9

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-GRADING-LENGTH-LOAD

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that motor unit size varies widely across muscles, and apply the size principle of recruitment (small, slow units recruited before large, fast ones).

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 45; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed answer key: A.

---

# Item

## id
QM-ASULOCO-7CC1D3444C43

## title
Which statement about skeletal muscle contraction is TRUE?

## question
Which of the following statement regarding skeletal muscle contraction is TRUE?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student reviews five statements about preload, recruitment, isotonic versus isometric tension and afterload, and must identify the one genuinely correct claim.

## format
single best answer

## derived_from
Printed question 46 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
Tension developed during muscle contraction is independent on the preload.

## explanation_a
Incorrect. Tension is very much dependent on preload, through the length-tension relationship: stretching a muscle toward its optimal resting length increases the active tension it can develop, up to the point of maximal filament overlap.

## answer_b
Increased recruitment of motor units occur with increased voluntary movements

## explanation_b
Correct. As the intensity of a voluntary contraction increases, the central nervous system recruits progressively more motor units, following the size principle from small, low-threshold units to larger, higher-threshold ones. This recruitment, together with increased firing frequency once most units are already active, is how whole-muscle force is graded smoothly rather than in large, discrete jumps.

## answer_c
Muscle activity is adjusted by fine mechanism through recruitment of muscle fibers

## explanation_c
Incorrect as worded. Grading occurs through recruitment of motor UNITS (a neuron and its group of fibres, recruited together as a whole), not through recruiting individual muscle fibres one at a time independently of their motor unit.

## answer_d
Tension developed in isotonic contraction is more than that during isometric contraction

## explanation_d
Incorrect. For a given muscle and stimulus, isometric contraction develops more tension than isotonic contraction, because in isotonic contraction some of the contractile element's shortening goes into moving the load rather than into building tension against a fixed length.

## answer_e
There is a direct relationship between velocity of shortening and afterload.

## explanation_e
Incorrect. The relationship is inverse, not direct: as afterload increases, shortening velocity falls, reaching zero once the load equals the muscle's maximum tetanic tension.

## topic
Physiology

## subtopic
Grading of contraction

## main_concept
CON-MSK-C14F65CD68F720

## concept_ids


## contextual_concept_ids


## difficulty
Hard

## question_type
Discrimination

## cognitive_effort
High

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
9

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-GRADING-LENGTH-LOAD

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that motor unit recruitment, following the size principle, is how the nervous system grades voluntary contraction force, and reject the other four common misstatements about preload, afterload and contraction type.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 46; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Printed answer key: B.
