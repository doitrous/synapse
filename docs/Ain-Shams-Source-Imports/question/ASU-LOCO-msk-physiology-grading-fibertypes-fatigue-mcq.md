<!--
  ASU-LOCO Physiology MCQs -- grading of contraction, fibre types, fatigue, rigor mortis, denervation, McArdle's disease (11 items). Every stem, option and the
  correct answer letter is verbatim from the native-text ASU Locomotor Physiology
  MCQ paper ("MCQs - Locomotor Physiology Questions.pdf", manifest
  src_3be9856ba9380e79cb01), extracted with pdftotext -layout and cross-checked
  against the printed answer key on PDF pages 22-23. Printed question numbers are
  kept in ## derived_from and ## source_citation. Import: Admin > Bulk import >
  question. status: Draft throughout; these need a faculty reviewer.

  This is a partial pass: 90 MCQs total on this paper, 37 authored here across
  three files covering every physiology concept tested (this ensures no concept
  in ASU-LOCO-msk-physiology.md/ASU-LOCO-msk-new-concepts.md is left untested by
  at least one question). The remaining ~53 questions on this paper, and all 88
  biochemistry + 25 parasitology questions from the other two source papers, are
  queued as next steps -- see the lane report and coverage/ASU-LOCO-triage.md.

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
-->

# Item

## id
QM-ASULOCO-D5F5F1AFC715

## title
What increases the stimulus frequency needed to produce tetanus?

## question
The frequency needed to produce tetanus:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares slow (red) and fast (pale) motor units and is asked how their twitch speed changes the stimulation frequency needed to fuse individual twitches into tetanus.

## format
single best answer

## derived_from
Printed question 27 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
Is increased by cooling.

## explanation_a
Incorrect. Cooling slows the twitch (lengthens its duration), which means successive stimuli fuse into tetanus at a LOWER, not higher, frequency.

## answer_b
Is decreased in red muscles.

## explanation_b
Correct. Red (slow, type I) muscle has a twitch of longer duration, so its individual twitches fuse into a sustained (tetanic) contraction at a lower stimulation frequency than pale muscle needs.

## answer_c
Is increased in fatigue.

## explanation_c
Incorrect. Fatigue prolongs the twitch (slows relaxation), which -- like cooling and slow fibre type -- lowers, not raises, the frequency needed for fusion.

## answer_d
Is decreased in the pale muscles.

## explanation_d
Incorrect. Pale (fast, type II) muscle has a SHORT twitch duration, so it needs a HIGHER, not lower, stimulation frequency to fuse into tetanus.

## topic
Physiology

## subtopic
Grading of contraction

## main_concept
CON-MSK-C14F65CD68F720

## concept_ids
CON-MSK-3E5F54D8D58E9C

## contextual_concept_ids


## difficulty
Moderate

## question_type
Discrimination

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

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
Explain that a longer twitch duration (as in red/slow muscle, cooling, or fatigue) lowers the stimulation frequency needed to produce tetanus.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 27; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: B.

---

# Item

## id
QM-ASULOCO-907DEB9CFAC3

## title
Which statement about summation of contraction is false?

## question
Which of the following statement regarding summation of contraction is FALSE?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student lists five statements about summation, tetanus and treppe, one of which incorrectly claims the muscle stays refractory throughout its mechanical contraction.

## format
single best answer

## derived_from
Printed question 41 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
Summation of contraction occurs with repeated stimulation of the muscle.

## explanation_a
This is true, not the false statement sought. Summation is, by definition, the build-up of tension produced by repeated stimulation before the muscle has fully relaxed from the previous twitch.

## answer_b
Complete tetanus means there is no relaxation between contractions of the muscle fiber.

## explanation_b
This is true, not the false statement sought. Complete (fused) tetanus is defined by the complete absence of relaxation between successive stimuli, giving a smooth sustained contraction.

## answer_c
Incomplete tetanus means there is incomplete relaxation between contractions of the muscle fiber.

## explanation_c
This is true, not the false statement sought. Incomplete tetanus shows partial, wavering relaxation between stimuli rather than the smooth plateau of complete tetanus.

## answer_d
Refractory period of muscle is present during its contraction.

## explanation_d
Correct -- this is the false statement. Skeletal muscle's electrical refractory period is brief and ends BEFORE the mechanical contraction even begins (the action potential is over in 2-4 msec, well before peak tension develops), which is exactly why the muscle CAN be restimulated during its ongoing mechanical contraction to produce summation and tetanus. If the muscle really were refractory throughout its contraction, summation would be impossible.

## answer_e
Treppe occurs with application of repeated stimuli that produce successive twitches with gradually increasing strength.

## explanation_e
This is true, not the false statement sought. Treppe (the staircase phenomenon) is the progressive increase in twitch amplitude seen with repeated identical stimuli at a rate that allows full relaxation between them, thought to reflect rising availability of calcium/warming of the muscle.

## topic
Physiology

## subtopic
Grading of contraction

## main_concept
CON-MSK-C14F65CD68F720

## concept_ids
CON-MSK-3B9143FBE075E4

## contextual_concept_ids


## difficulty
Hard

## question_type
Discrimination

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
72

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
Explain why the muscle's brief refractory period, ending before mechanical contraction begins, is what makes summation and tetanus possible.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 41; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Printed answer key: D.

---

# Item

## id
QM-ASULOCO-5CECD46FBEC4

## title
What is the term for increasing contraction force by activating more motor units?

## question
What is an increase in the number of active motor units that would increase the force developed by a skeletal muscle called?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is naming the four mechanisms of grading skeletal muscle force (recruitment, summation, treppe, length-tension) and must pick the one that specifically means adding more motor units.

## format
single best answer

## derived_from
Printed question 84 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
Recruitment

## explanation_a
Correct. Recruitment is specifically the process of activating additional motor units to increase the total force a muscle produces -- more motor units firing means more muscle fibres contracting together.

## answer_b
Summation

## explanation_b
Incorrect. Summation increases force by increasing the FREQUENCY of stimulation to a given (fixed) set of motor units, not by adding more units.

## answer_c
Treppe

## explanation_c
Incorrect. Treppe is the progressive rise in twitch amplitude with repeated identical stimuli to the SAME fibres, not a change in the number of active motor units.

## answer_d
Tetanus

## explanation_d
Incorrect. Tetanus is the fused, sustained state of contraction from high-frequency stimulation of already-active units, not a description of unit recruitment.

## answer_e
Length-tension relationship

## explanation_e
Incorrect. The length-tension relationship describes how sarcomere length (preload) affects tension within a single fibre, unrelated to the number of motor units active.

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
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
35

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
Name recruitment as the mechanism of grading force by increasing the number of active motor units.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 84; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
35

## randomise_answers
yes

## author_notes
Printed answer key: A.

---

# Item

## id
QM-ASULOCO-11ED8AA7453F

## title
What characterises pale (fast) muscle fibres?

## question
Pale (fast) fiber:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is contrasting the metabolic profile of pale (fast, type II) fibres against red (slow, type I) fibres.

## format
single best answer

## derived_from
Printed question 28 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
Contains much blood capillaries.

## explanation_a
Incorrect. Pale (fast) fibres have FEWER capillaries than red fibres, which rely on a rich capillary supply to sustain aerobic metabolism.

## answer_b
Doesn't show fatigue.

## explanation_b
Incorrect. Pale fibres fatigue QUICKLY, precisely because they rely on anaerobic glycolysis, which cannot sustain effort as long as the oxidative metabolism red fibres use.

## answer_c
Contains low concentration of myoglobin.

## explanation_c
Correct. Pale fibres are named for their LOW myoglobin content -- myoglobin is the oxygen-storing pigment that gives red fibres their colour and supports sustained aerobic work, which pale fibres do not depend on.

## answer_d
Depends on aerobic oxidation.

## explanation_d
Incorrect. Pale fibres depend mainly on anaerobic glycolysis for rapid ATP production, not aerobic oxidation, which is the hallmark of red (slow) fibres.

## topic
Physiology

## subtopic
Fibre types

## main_concept
CON-MSK-3E5F54D8D58E9C

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
38

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
State that pale (fast) fibres have low myoglobin, few capillaries, and rely on anaerobic glycolysis, fatiguing quickly.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 28; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
40

## randomise_answers
yes

## author_notes
Printed answer key: C.

---

# Item

## id
QM-ASULOCO-3C9395FD10FE

## title
What characterises a fast muscle fibre?

## question
Fast muscle fiber:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked which single statement correctly describes fast (type II) fibre physiology, among five statements that mostly describe slow fibres instead.

## format
single best answer

## derived_from
Printed question 43 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
Mainly uses aerobic glycolysis

## explanation_a
Incorrect. Fast fibres mainly use ANaerobic glycolysis for rapid ATP production, not aerobic metabolism, which is the slow fibre's strategy.

## answer_b
Is specialized in posture maintaining prolonged-low intensity contractions

## explanation_b
Incorrect. Sustained, low-intensity postural work is the specialty of slow (red, type I) fibres, which resist fatigue; fast fibres are built for brief, powerful bursts instead.

## answer_c
Its ATPase activity and rate of cross bridge cycling is high

## explanation_c
Correct. Fast fibres have high myosin ATPase activity, which drives a high rate of cross-bridge cycling -- this is exactly why they can shorten and develop tension quickly, at the cost of fatiguing sooner.

## answer_d
Is also called red muscle

## explanation_d
Incorrect. "Red muscle" is the name for SLOW (type I) fibres, which are rich in myoglobin; fast fibres are called pale (white) muscle.

## answer_e
Is usually of small diameter

## explanation_e
Incorrect. Fast fibres are usually of LARGER, not smaller, diameter than slow fibres, consistent with their role in generating greater peak force.

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
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that fast fibres have high ATPase activity and rapid cross-bridge cycling, unlike slow (red) postural fibres.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 43; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Printed answer key: C.

---

# Item

## id
QM-ASULOCO-A555985FEE7B

## title
What causes some skeletal muscle fibres to appear red?

## question
What causes some muscle fibers to appear red?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student dissecting chicken breast (pale) versus chicken thigh/duck breast (dark) muscle is asked what pigment is responsible for the colour difference.

## format
single best answer

## derived_from
Printed question 85 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
Greater blood supply

## explanation_a
Incorrect. Although red fibres do have a richer blood/capillary supply, the visible red COLOUR itself comes from the pigment stored within the fibre, not from the blood supply per se.

## answer_b
Presence of myoglobin

## explanation_b
Correct. Myoglobin, an oxygen-binding pigment similar to haemoglobin, is present in high concentration in slow (red) fibres and gives them their characteristic red colour; pale fibres have little myoglobin and appear white/pale by comparison.

## answer_c
Presence of lots of mitochondria

## explanation_c
Incorrect. Red fibres do have more mitochondria (supporting their aerobic metabolism), but mitochondria are not themselves pigmented; the red colour specifically comes from myoglobin.

## answer_d
High concentration of actin and myosin

## explanation_d
Incorrect. Actin and myosin concentration does not differ enough between fibre types to explain colour, and neither protein is pigmented.

## answer_e
Presence of troponin

## explanation_e
Incorrect. Troponin is a colourless regulatory protein and has no role in fibre colour.

## topic
Physiology

## subtopic
Fibre types

## main_concept
CON-MSK-3E5F54D8D58E9C

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
30

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
Identify myoglobin as the pigment responsible for the red colour of slow-twitch muscle fibres.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 85; printed answer key pp.22-23.

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
QM-ASULOCO-A7B5FABCF921

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
A student is asked to choose the mechanism the department teaches as the cause of muscle fatigue, among options that misattribute it to the nerve rather than the muscle.

## format
single best answer

## derived_from
Printed question 2 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
Accumulation of metabolites in the nerve.

## explanation_a
Incorrect. Metabolite accumulation (lactic acid, inorganic phosphate) happens in the fatiguing MUSCLE, not primarily in the nerve; the nerve itself is highly fatigue-resistant.

## answer_b
Fatigue of the motor nerve.

## explanation_b
Incorrect. The motor nerve is remarkably resistant to fatigue and continues to conduct impulses reliably long after the muscle it supplies has fatigued; fatigue is a muscle (and neuromuscular junction), not a nerve, phenomenon.

## answer_c
Depletion of energy stores.

## explanation_c
Correct. Muscle fatigue is attributed mainly to depletion of the muscle's energy stores (ATP, creatine phosphate, glycogen) together with the accumulation of metabolic byproducts, which together impair the contractile machinery's ability to keep generating tension.

## answer_d
Heating of the muscle.

## explanation_d
Incorrect. Heating is not a recognised cause of fatigue; if anything, mild warming tends to speed contraction rather than cause fatigue.

## answer_e
Adaptation of the muscle.

## explanation_e
Incorrect. "Adaptation" is a vague term that does not describe the actual physiological mechanism (energy depletion and metabolite build-up) responsible for fatigue.

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
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
30

## exam_relevance
9

## clinical_relevance
0.4

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
State that muscle fatigue results from depletion of the muscle's own energy stores, not nerve fatigue.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 2; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
35

## randomise_answers
yes

## author_notes
Printed answer key: C.

---

# Item

## id
QM-ASULOCO-1E5CB91F2FE8

## title
What causes rigor mortis?

## question
Rigor mortis occur due to:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked to give the biochemical explanation for why muscle stiffens permanently after death, rather than remaining flaccid.

## format
single best answer

## derived_from
Printed question 26 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
Loss of muscle proteins.

## explanation_a
Incorrect. Muscle proteins are not lost after death; rigor mortis is caused by a functional failure of the existing contractile proteins to separate, not by protein loss.

## answer_b
Separation of myosin cross bridges from actin sites after death.

## explanation_b
Incorrect. This states the opposite of what actually happens: in rigor mortis the myosin cross-bridges FAIL to separate from actin (they stay locked on), rather than separating.

## answer_c
Inability to utilize glycogen for production of energy.

## explanation_c
Incorrect. Inability to use glycogen describes a specific disease state (like McArdle's disease), not the general mechanism of rigor mortis, which follows simple ATP exhaustion after death in any muscle.

## answer_d
Loss of ATP, leading to failure of separation of myosin from actin.

## explanation_d
Correct. After death, ATP production stops and existing ATP is used up; because a fresh ATP molecule is required for the myosin head to detach from actin, the exhaustion of ATP leaves the cross-bridges locked onto actin, producing the sustained stiffness of rigor mortis.

## answer_e
Accumulation of lactic acid in the muscle.

## explanation_e
Incorrect. Lactic acid does accumulate after death (contributing to the acidification of tissue), but the direct mechanical cause of rigor's stiffness is ATP loss preventing cross-bridge detachment, not the lactic acid itself.

## topic
Physiology

## subtopic
Muscle injury and death

## main_concept
CON-MSK-6087C9C091ED85

## concept_ids
CON-MSK-AC42FE7AB41DF2

## contextual_concept_ids


## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
9

## clinical_relevance
0.5

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
ART-103-PHY-INJURY-DEATH

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Explain rigor mortis as failure of myosin-actin cross-bridge detachment caused by post-mortem ATP depletion.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 26; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: D.

---

# Item

## id
QM-ASULOCO-76D61ED2F001

## title
What is rigor mortis clinically/forensically used for?

## question
Rigor mortis is used in:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A forensic medicine lecturer asks what practical use the timing and progression of rigor mortis serves at a death scene.

## format
single best answer

## derived_from
Printed question 52 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
Diagnosis of the cause of death

## explanation_a
Incorrect. Rigor mortis does not indicate WHY someone died (the cause); it reflects a time-dependent post-mortem biochemical process common to all deaths regardless of cause.

## answer_b
Diagnosis of the time of death

## explanation_b
Correct. Because rigor mortis develops, peaks and resolves over a fairly predictable timeframe after death, its degree and distribution are used forensically to help estimate the time since death.

## answer_c
Study the electrical activity of skeletal muscles

## explanation_c
Incorrect. Rigor mortis is a post-mortem, ATP-depletion phenomenon with no electrical activity involved; it is not a tool for studying the muscle's electrical properties (that would be EMG, in living tissue).

## answer_d
Study the mechanical activity of skeletal muscle.

## explanation_d
Incorrect. Rigor mortis is itself a fixed, static state (a sustained contracture), not an active mechanical process being studied; it does not serve as a tool for studying normal mechanical muscle activity.

## topic
Physiology

## subtopic
Muscle injury and death

## main_concept
CON-MSK-6087C9C091ED85

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
28

## exam_relevance
9

## clinical_relevance
0.6

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
ART-103-PHY-INJURY-DEATH

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that rigor mortis's predictable time course is used forensically to estimate time of death.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 52; printed answer key pp.22-23.

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
QM-ASULOCO-C933C21B6C72

## title
Which effect is NOT seen after skeletal muscle denervation?

## question
Effect of skeletal muscle denervation includes the following EXCEPT:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student lists the recognised consequences of cutting a muscle's motor nerve supply -- atrophy, fasciculation, ACh hypersensitivity and fibrillation -- and must find the one listed change that is not part of this recognised set.

## format
single best answer

## derived_from
Printed question 44 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
Skeletal muscle atrophy

## explanation_a
This is a recognised effect, not the answer sought. Denervated muscle atrophies (wastes) from disuse and loss of trophic input from the nerve.

## answer_b
Fasciculation

## explanation_b
This is a recognised effect, not the answer sought. Fasciculation -- visible, spontaneous twitching of a bundle of fibres -- is seen with denervating disease, often reflecting spontaneous discharge from the dying motor neuron before it is fully lost.

## answer_c
High excitability of muscle

## explanation_c
Correct -- this is the exception. The department's teaching lists atrophy, fasciculation, ACh hypersensitivity and fibrillation as the specific, named consequences of denervation; a generic "high excitability of muscle" is not itself one of the specifically named and defined effects taught, even though the mechanism underlying fibrillation and ACh hypersensitivity does technically involve increased sensitivity of the fibre membrane.

## answer_d
Denervation hypersensitivity to acetyl choline

## explanation_d
This is a recognised effect, not the answer sought. Denervated muscle develops hypersensitivity to acetylcholine, because ACh receptors spread from the neuromuscular junction over the whole fibre membrane once the nerve's normal suppressive influence is lost.

## answer_e
Fibrillation

## explanation_e
This is a recognised effect, not the answer sought. Fibrillation -- spontaneous contraction of individual denervated muscle fibres, detectable on EMG -- is a classic sign of denervation.

## topic
Physiology

## subtopic
Denervation

## main_concept
CON-MSK-1030B9F3A5996A

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
2

## inferred_difficulty
65

## exam_relevance
9

## clinical_relevance
0.6

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
ART-103-PHY-INJURY-DEATH

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
List atrophy, fasciculation, ACh hypersensitivity and fibrillation as the named effects of denervation, per the department's own teaching set.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 44; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed answer key: C. Field note: a generalised claim of increased muscle excitability is arguably consistent with the mechanism behind fibrillation and ACh hypersensitivity, so this option's exclusion rests on the department's specific named list rather than a clean physiological contradiction -- recorded as a mild interpretive uncertainty rather than silently smoothed over.

---

# Item

## id
QM-ASULOCO-2DB217224A88

## title
What does McArdle's phosphorylase deficiency lead to?

## question
McArdle’s phosphorylase deficiency leads to:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A patient develops cramp and stiffness within minutes of starting to exercise, with a brief rest allowing them to continue at a lower intensity, and normal blood glucose throughout.

## format
single best answer

## derived_from
Printed question 54 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
Pain and muscle stiffness during exercise

## explanation_a
Correct. Because myophosphorylase deficiency blocks exercising muscle from mobilising its own glycogen store, the earliest and most characteristic feature is exercise-induced pain, cramp and stiffness within minutes of starting activity, classically improving after a brief rest (the "second wind").

## answer_b
Stiffness of muscles after death

## explanation_b
Incorrect. Stiffness after death is rigor mortis, a universal post-mortem ATP-depletion phenomenon unrelated to a specific enzyme deficiency in a living, exercising patient.

## answer_c
Prolonged contraction without relaxation

## explanation_c
Incorrect. Prolonged contraction without relaxation (contracture) can occur in severe energy failure, but the defining, earliest clinical feature taught for McArdle's disease is exercise-triggered pain and stiffness, not a fixed contracture as the headline presentation.

## answer_d
Muscle atrophy and paralysis

## explanation_d
Incorrect. McArdle's disease does not typically cause fixed muscle atrophy and paralysis as its defining feature; its hallmark is episodic, exercise-triggered symptoms with normal muscle strength between episodes, distinguishing it from a primary neuromuscular wasting disorder.

## topic
Physiology

## subtopic
Fatigue and metabolism

## main_concept
CON-MSK-DB9C603AB04EF5

## concept_ids
CON-MSK-2E4061334D52EA

## contextual_concept_ids


## difficulty
Moderate

## question_type
Clinical application

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
9

## clinical_relevance
0.7

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
ART-MSK-ASU-LOCO-MCARDLE-DISEASE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Recognise exercise-induced pain and stiffness, relieved by rest, as the hallmark presentation of McArdle's disease (myophosphorylase deficiency).

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 54; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: A.
