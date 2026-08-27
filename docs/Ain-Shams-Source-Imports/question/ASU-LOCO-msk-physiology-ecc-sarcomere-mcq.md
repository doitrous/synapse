<!--
  ASU-LOCO Physiology MCQs -- excitation-contraction coupling, sarcomere structure, cross-bridge cycling (13 items). Every stem, option and the
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
QM-ASULOCO-5CE358374D7E

## title
Which of the following is not involved in excitation-contraction coupling of skeletal muscle?

## question
Which of the following is not involved in Excitation contraction coupling of skeletal muscle?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is listing the sequence of events that links an action potential at the muscle membrane to the appearance of tension in the muscle fibre, and is asked to spot the one step that is stated backwards.

## format
single best answer

## derived_from
Printed question 1 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
Release of Ca++ from troponin.

## explanation_a
Correct -- this is the step stated backwards, so it is NOT a true event of excitation-contraction coupling. Calcium is released from the terminal cisternae of the sarcoplasmic reticulum and then BINDS TO troponin C; it is never released FROM troponin as an event of the coupling sequence. Reversing the direction of this interaction is the classic trap in this question.

## answer_b
Formation of cross bridges linkages between actin and myosin.

## explanation_b
Incorrect as an answer to "not involved" -- cross-bridge formation between actin and myosin genuinely is part of excitation-contraction coupling. Once calcium has bound troponin C and tropomyosin has moved off the actin active site, the myosin head can attach to actin and form a cross-bridge.

## answer_c
Spread of depolarization along the transverse tubules.

## explanation_c
Incorrect as an answer -- depolarization does spread inward along the T-tubules, carrying the action potential from the sarcolemma to the depth of the fibre where it activates the dihydropyridine receptors.

## answer_d
Hydrolysis of ATP to ADP.

## explanation_d
Incorrect as an answer -- ATP hydrolysis to ADP and inorganic phosphate is what energises the myosin head for the power stroke, a genuine step in the coupling-to-contraction sequence.

## answer_e
Opening of Ryanodine receptors.

## explanation_e
Incorrect as an answer -- opening of the ryanodine receptor channel on the sarcoplasmic reticulum, triggered by the T-tubule's dihydropyridine receptor, is exactly how calcium is released into the cytoplasm; it is a true step of the sequence.

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
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State the correct direction of the calcium-troponin interaction in excitation-contraction coupling and identify a reversed-direction distractor.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 1; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: A. The trap tests whether the student notices the interaction is stated backwards (released FROM troponin) rather than forwards (released from SR, binds TO troponin).

---

# Item

## id
QM-ASULOCO-EB2253FBC1C1

## title
What two receptors interact to raise cytoplasmic calcium during excitation-contraction coupling?

## question
Increases in the amount of cytoplasmic calcium required to initiate a muscle contraction are mediated by the interaction between a ________ on the T tubule and a ________ on the membrane of the sarcoplasmic reticulum.

## subject
msk

## status
Draft

## owner
Claude

## vignette
A physiology tutor draws the T-tubule and the adjacent terminal cisterna side by side and asks the class to name the receptor sitting in each membrane and how one talks to the other.

## format
single best answer

## derived_from
Printed question 74 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
Dihydropyridine receptor : calcium pump

## explanation_a
Incorrect. The T-tubule receptor named here is right (dihydropyridine receptor), but its sarcoplasmic-reticulum partner is wrong: the calcium pump (SERCA) is what actively removes calcium during relaxation, not what opens to release it during activation.

## answer_b
Dihydropyridine receptor : ryanodine receptor

## explanation_b
Correct. The voltage-sensitive dihydropyridine receptor sits on the T-tubule membrane and senses the spreading depolarisation; through direct mechanical coupling (foot processes) it opens the ryanodine receptor calcium-release channel on the adjacent terminal cisterna of the sarcoplasmic reticulum, letting stored calcium flood into the cytoplasm. This DHP-to-ryanodine-receptor link is the physical basis of excitation-contraction coupling in skeletal muscle.

## answer_c
Ryanodine receptor : calcium pump

## explanation_c
Incorrect. This pairing has both receptors on the wrong side or performing the wrong job: it names the ryanodine receptor as the T-tubule sensor (it is actually the SR release channel) and the calcium pump as its SR partner (which removes, not releases, calcium).

## answer_d
Calcium pump : ryanodine receptor

## explanation_d
Incorrect. The calcium pump does not sit on the T-tubule and does not initiate calcium release; it is the SR-membrane protein that reuptakes calcium for relaxation, the opposite job to what this question is asking about.

## answer_e
Calcium-induced calcium release channel : dihydropyridine receptor

## explanation_e
Incorrect. A calcium-induced calcium release channel describes the cardiac muscle mechanism, where a small trigger influx of extracellular calcium opens the ryanodine receptor; skeletal muscle instead uses direct mechanical (not calcium-triggered) coupling between the DHP and ryanodine receptors, so this option describes the wrong muscle type's mechanism.

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
Recall

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
Name the dihydropyridine receptor and ryanodine receptor as the T-tubule/sarcoplasmic-reticulum pair that mediates calcium release in skeletal muscle.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 74; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Printed answer key: B.

---

# Item

## id
QM-ASULOCO-20361E52AD91

## title
Which statement about the sarcotubular system is not true?

## question
Which of the following is not true regarding the sarcotubular system:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A first-year student writes five statements about the T-tubules and triads of skeletal muscle while revising for a physiology quiz, and one statement quietly swaps in the mechanism used by cardiac, not skeletal, muscle.

## format
single best answer

## derived_from
Printed question 21 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
E

## answer_a
T tubules are present at the A-I junction.

## explanation_a
This is true, not the answer sought. In skeletal muscle the T-tubules invaginate at the A-I band junction (two per sarcomere), which is a genuine structural fact.

## answer_b
T tubules contain ECF and voltage gated calcium sensors (DHP).

## explanation_b
This is true, not the answer sought. T-tubules are continuous with the sarcolemma, so they carry extracellular fluid into the fibre's depth, and their membrane carries the voltage-gated dihydropyridine receptors that sense depolarisation.

## answer_c
Activation of DHP by action potential leads to opening of ryanodine receptors on the sarcoplasmic reticulum.

## explanation_c
This is true, not the answer sought. Depolarisation activates the DHP receptor, which mechanically opens the ryanodine receptor channel on the adjacent terminal cisterna, releasing calcium.

## answer_d
The T tubule and its adjacent terminal cisternae are called TRIAD.

## explanation_d
This is true, not the answer sought. A T-tubule flanked by two terminal cisternae of the sarcoplasmic reticulum is, by definition, a triad.

## answer_e
Ca++ needed for muscle contraction enters through T tubules.

## explanation_e
Correct -- this is the false statement. In skeletal muscle the calcium that triggers contraction comes from the sarcoplasmic reticulum's internal store, released through the ryanodine receptor; it is NOT extracellular calcium entering through the T-tubules. That obligatory extracellular-calcium-entry step is instead a feature of cardiac muscle's calcium-induced calcium release mechanism, and confusing the two muscle types here is the trap.

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
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
62

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
State that skeletal muscle's contraction-triggering calcium is released from the sarcoplasmic reticulum, not admitted from extracellular fluid through the T-tubules.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 21; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed answer key: E.

---

# Item

## id
QM-ASULOCO-E43D5FA515F9

## title
What is the function of tropomyosin in skeletal muscle?

## question
The function of tropomyosin in skeletal muscle include:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked to describe what tropomyosin is doing at rest and during contraction, since several answer choices assign it jobs that actually belong to troponin or myosin.

## format
single best answer

## derived_from
Printed question 3 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
Binding to myosin during contraction

## explanation_a
Incorrect. Tropomyosin's job at rest is to block, not bind, myosin's access to actin; it is myosin itself that binds actin once tropomyosin has moved aside, not tropomyosin binding to myosin.

## answer_b
Acting as a relaxing protein at rest by covering actin.

## explanation_b
Correct. At rest, tropomyosin lies along the actin filament's groove and physically covers the myosin-binding sites on actin, preventing cross-bridge formation -- this is exactly why it is called a relaxing protein. When calcium binds troponin C, troponin pulls tropomyosin aside and exposes the sites, allowing contraction to begin.

## answer_c
Sliding on actin to produce shortening.

## explanation_c
Incorrect. It is myosin (the thick filament) that generates the sliding movement over actin via cross-bridge cycling; tropomyosin is a regulatory protein and does not itself slide to produce shortening.

## answer_d
Releasing Ca++ after propagation of action potential.

## explanation_d
Incorrect. Calcium is released from the sarcoplasmic reticulum's terminal cisternae via the ryanodine receptor, not by tropomyosin, which has no calcium-releasing role.

## answer_e
Conduction of action potential from the cell membrane to the sarcomere.

## explanation_e
Incorrect. Conduction of the action potential into the fibre's depth is the job of the T-tubule system, not tropomyosin, which is a thin-filament regulatory protein with no electrical conduction function.

## topic
Physiology

## subtopic
Contractile proteins

## main_concept
CON-MSK-287D88DF2F6B8C

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
40

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
State that tropomyosin acts as a relaxing protein by covering actin's myosin-binding sites at rest.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 3; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
40

## randomise_answers
yes

## author_notes
Printed answer key: B.

---

# Item

## id
QM-ASULOCO-3A86009434B0

## title
Which statement about troponin is correct?

## question
With respect to troponin:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student reviews the three troponin subunits -- C, I and T -- and is asked to correctly match each one to its single job.

## format
single best answer

## derived_from
Printed question 48 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
Troponin C inhibits the interaction of actin and myosin

## explanation_a
Incorrect. Troponin C is the calcium-binding subunit, not the inhibitory one; when calcium binds troponin C it triggers the conformational change that RELIEVES inhibition, rather than causing it.

## answer_b
Troponin T contains the binding sites for calcium

## explanation_b
Incorrect. Calcium binds troponin C, not troponin T; troponin T's job is to bind and anchor the whole troponin complex to tropomyosin.

## answer_c
Troponin I binds to actin

## explanation_c
Correct. Troponin I is the inhibitory subunit, and at rest it binds actin directly, holding the troponin-tropomyosin complex in the blocking position over the myosin-binding site. When calcium binds troponin C, troponin I's grip on actin is released, allowing tropomyosin to shift and expose the site.

## answer_d
Head of troponin I catalyses ATP to allow myosin to move on actin molecules

## explanation_d
Incorrect. No troponin subunit has ATPase activity; ATP hydrolysis for cross-bridge cycling happens in the myosin head itself, not in troponin I.

## answer_e
It is the main protein of the thick filament.

## explanation_e
Incorrect. Troponin is a thin-filament (actin-associated) regulatory protein complex, not the main protein of the thick filament -- that role belongs to myosin.

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
Recall/discrimination

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
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Assign the correct role to each troponin subunit: C binds calcium, I binds actin and inhibits, T anchors to tropomyosin.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 48; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: C.

---

# Item

## id
QM-ASULOCO-D5320809D1A0

## title
Which statement about the sarcomere is not true?

## question
Which is not true about the Sarcomere:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is defining the sarcomere for an upcoming histology-physiology integrated exam and must spot the one definition that describes the wrong pair of landmarks.

## format
single best answer

## derived_from
Printed question 4 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
Is the distance between myosin and actin.

## explanation_a
Correct -- this is the false statement. The sarcomere is defined as the segment between two adjacent Z lines, not as "the distance between myosin and actin"; myosin and actin are the two filament types that lie within the sarcomere and overlap, but their spacing is not what defines the sarcomere's boundaries.

## answer_b
Is the distance between two “Z” lines.

## explanation_b
Incorrect as an answer -- this is the actual, correct definition of the sarcomere, and is exactly what option A misstates.

## answer_c
Is the contractile unit of the muscle.

## explanation_c
Incorrect as an answer -- the sarcomere genuinely is the basic contractile unit of striated muscle, the smallest segment that can shorten.

## answer_d
Shorten when the muscle contracts.

## explanation_d
Incorrect as an answer -- the sarcomere does shorten during contraction, as the Z lines are pulled closer together by cross-bridge cycling.

## answer_e
It has a dark area in its center and light areas on its periphery.

## explanation_e
Incorrect as an answer -- this correctly describes the banding pattern: the A band (dark, containing myosin) sits centrally and the I bands (light, actin only) sit peripherally within the sarcomere.

## topic
Physiology

## subtopic
Sarcomere structure

## main_concept
CON-MSK-0824FE988ADA00

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Discrimination

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

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
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Define the sarcomere as the segment between two Z lines, not as the actin-myosin spacing.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 4; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
40

## randomise_answers
yes

## author_notes
Printed answer key: A.

---

# Item

## id
QM-ASULOCO-7B4DF101AB7B

## title
Which bands appear dark in the sarcomere?

## question
The dark bands are:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is looking at a longitudinal electron micrograph of a myofibril and must name the band that appears dark under the light microscope.

## format
single best answer

## derived_from
Printed question 13 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
A bands

## explanation_a
Correct. The A band is dark because it contains the full overlap of thick (myosin) and thin (actin) filaments, giving it the greatest optical density -- "A" is commonly (if coincidentally) remembered as the "dArk" band.

## answer_b
I bands

## explanation_b
Incorrect. The I band is light, because it contains only thin (actin) filaments with no myosin overlap.

## answer_c
H zone

## explanation_c
Incorrect. The H zone is the paler central region within the A band, where only myosin (no actin overlap) is present -- lighter than the surrounding A band, not the dark band itself.

## answer_d
Z line

## explanation_d
Incorrect. The Z line is a thin structural disc that anchors actin filaments and defines the sarcomere boundary; it is not the broad dark band being described here.

## answer_e
DHP

## explanation_e
Incorrect. DHP (dihydropyridine receptor) is a T-tubule membrane protein, not a band visible on light microscopy of the sarcomere.

## topic
Physiology

## subtopic
Sarcomere structure

## main_concept
CON-MSK-0824FE988ADA00

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
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Identify the A band as the dark band of the sarcomere, formed by thick-thin filament overlap.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 13; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
30

## randomise_answers
yes

## author_notes
Printed answer key: A.

---

# Item

## id
QM-ASULOCO-EE4AB47CF82A

## title
Which statement about the contractile response in skeletal muscle is correct?

## question
The contractile response in skeletal muscle:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked to pick the single true statement about how skeletal muscle contracts, out of five statements that each subtly misstate a step of the sliding-filament mechanism.

## format
single best answer

## derived_from
Printed question 6 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
Occurs when the muscle cells spontaneously depolarizes itself sufficiently to reach threshold for firing.

## explanation_a
Incorrect. Skeletal muscle fibres do not spontaneously depolarise to threshold on their own; they are triggered externally by an action potential travelling down the motor neuron and released via acetylcholine at the neuromuscular junction, not by spontaneous self-depolarisation.

## answer_b
Occurs when actin filaments slide along myosin filaments.

## explanation_b
Correct. Contraction is produced by the thin (actin) filaments sliding along the stationary thick (myosin) filaments, pulled by cycling cross-bridges -- the sliding-filament mechanism.

## answer_c
Needs Ca++ entry from extracellular fluid.

## explanation_c
Incorrect. Skeletal muscle's contraction-triggering calcium comes from the sarcoplasmic reticulum's internal store, not from extracellular fluid entering the cell; extracellular calcium entry is a cardiac muscle feature.

## answer_d
Contraction produces action potential in the muscle membrane.

## explanation_d
Incorrect. The causal order is reversed: the action potential in the muscle membrane comes first and triggers the mechanical contraction, not the other way around.

## answer_e
During which, the distance between Z lines become longer.

## explanation_e
Incorrect. During contraction the sarcomere shortens, so the distance between Z lines DECREASES, not increases.

## topic
Physiology

## subtopic
Sliding filament mechanism

## main_concept
CON-MSK-0824FE988ADA00

## concept_ids
CON-MSK-B2B106C1D81C30

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
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that skeletal muscle contraction is produced by actin sliding along myosin, triggered by an externally arriving action potential.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 6; printed answer key pp.22-23.

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
QM-ASULOCO-B2379E9918E9

## title
In the sliding filament theory, which two filaments overlap during shortening?

## question
In the sliding filament theory, the myofilaments slide over each other, resulting in the overlapping of ……. And …….:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is filling in the blanks of a sentence describing the sliding filament theory and must name the two structures whose overlap increases as the sarcomere shortens.

## format
single best answer

## derived_from
Printed question 11 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
Troponin and Tropomyosin

## explanation_a
Incorrect. Troponin and tropomyosin are both regulatory proteins of the thin filament that move relative to each other to expose or cover the myosin-binding site; they are not the filaments that slide over one another in the sliding-filament mechanism.

## answer_b
Troponin and Actin

## explanation_b
Incorrect. Troponin sits on the thin filament alongside actin, but it is actin sliding relative to myosin (the thick filament), not to troponin, that produces shortening.

## answer_c
Actin and Myosin

## explanation_c
Correct. The sliding filament theory describes the thin actin filaments sliding along the thick myosin filaments (pulled by cross-bridge cycling), which increases their zone of overlap and shortens the sarcomere without either filament itself changing length.

## answer_d
Myosin and Tropomyosin

## explanation_d
Incorrect. Tropomyosin is a thin-filament regulatory protein, not the structure that overlaps with myosin during sliding; that role belongs to actin.

## answer_e
Tropomyosin and Actin

## explanation_e
Incorrect. Tropomyosin runs along actin but does not itself independently slide relative to myosin; the sliding interaction described by the theory is specifically between actin and myosin.

## topic
Physiology

## subtopic
Sliding filament mechanism

## main_concept
CON-MSK-0824FE988ADA00

## concept_ids
CON-MSK-B2B106C1D81C30

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
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Name actin and myosin as the two filaments whose overlap increases in the sliding-filament mechanism.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 11; printed answer key pp.22-23.

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
QM-ASULOCO-2B9D110BA295

## title
What is the correct sequence of the cross-bridge cycle?

## question
Cross bridge cycling sequence is:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked to put the four steps of one cross-bridge cycle -- bending, binding, detachment and repositioning -- into their correct order.

## format
single best answer

## derived_from
Printed question 50 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
Bending, binding, repositioning, detachment

## explanation_a
Incorrect order. This starts with bending (the power stroke), which cannot happen before the cross-bridge has first bound to actin.

## answer_b
Repositioning, binding, detachment, bending

## explanation_b
Incorrect order. This places detachment before bending, but the myosin head must complete its power stroke (bending) while still attached before it can detach.

## answer_c
Binding, bending, detachment, repositioning

## explanation_c
Correct. The cycle runs: binding (the energised myosin head attaches to an exposed actin site) -> bending (the power stroke, pulling actin past myosin) -> detachment (a fresh ATP binds myosin and releases it from actin) -> repositioning (the head re-cocks to its high-energy state, ready to bind again).

## answer_d
Detachment, repositioning, binding, bending

## explanation_d
Incorrect order. This starts with detachment before any binding has occurred, which is impossible -- the head must first attach before it can detach.

## topic
Physiology

## subtopic
Cross-bridge cycling

## main_concept
CON-MSK-B2B106C1D81C30

## concept_ids
CON-MSK-AC42FE7AB41DF2

## contextual_concept_ids


## difficulty
Moderate

## question_type
Sequencing

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
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Sequence the four steps of the cross-bridge cycle: binding, bending (power stroke), detachment, repositioning.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 50; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: C.

---

# Item

## id
QM-ASULOCO-C5108C7867E1

## title
What is the name for the repeated actin-myosin interaction that generates force?

## question
The repeated, oscillating interaction between actin and myosin that results in the generation of force by a skeletal muscle cell is called what?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A lecturer asks the class for the single term that names the whole repeating cycle of myosin attaching, pulling and detaching from actin.

## format
single best answer

## derived_from
Printed question 70 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
Crossbridge cycling

## explanation_a
Correct. Cross-bridge cycling is the specific name for the repeated attach-pull-detach-reset sequence between myosin heads and actin that generates tension; each cycle uses one ATP.

## answer_b
The sliding-filament model

## explanation_b
Incorrect. The sliding-filament model is the broader description of how the thin and thick filaments slide past one another to shorten the sarcomere; cross-bridge cycling is the molecular mechanism that drives that sliding, so the sliding-filament model is the outcome/theory, not the name of the repeating molecular interaction itself.

## answer_c
Z line interaction

## explanation_c
Incorrect. The Z line is a structural anchor point for actin filaments; it is not a term describing the actin-myosin interaction.

## answer_d
Sarcomeric facilitation

## explanation_d
Incorrect. "Sarcomeric facilitation" is not a recognised physiological term for this process.

## answer_e
Calcium cycling

## explanation_e
Incorrect. Calcium cycling refers to calcium's release and reuptake by the sarcoplasmic reticulum, which regulates when cross-bridge cycling can occur, but is a separate process from the actin-myosin mechanical interaction itself.

## topic
Physiology

## subtopic
Cross-bridge cycling

## main_concept
CON-MSK-B2B106C1D81C30

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
40

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
Name cross-bridge cycling as the repeated actin-myosin interaction that generates contractile force.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 70; printed answer key pp.22-23.

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
QM-ASULOCO-D4DEEE380553

## title
Which statement about ATP in muscle contraction is not true?

## question
Which of the following is not true about ATP:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student lists five roles of ATP in the contraction-relaxation cycle and must find the one statement that assigns ATP a storage location it does not occupy.

## format
single best answer

## derived_from
Printed question 25 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
It energizes the power stroke of myosin cross bridges.

## explanation_a
This is true, not the answer sought. ATP hydrolysis on the myosin head provides the energy for the power stroke (the bending step of cross-bridge cycling).

## answer_b
It is responsible for detachment of myosin cross bridges from actin sites.

## explanation_b
This is true, not the answer sought. A fresh ATP binding the myosin head is exactly what allows the head to release (detach) from actin; without it the head stays locked on, which is the basis of rigor.

## answer_c
Is stored in the terminal cisternae.

## explanation_c
Correct -- this is the false statement. The terminal cisternae store calcium, not ATP; ATP is generated and used throughout the sarcoplasm (from glycolysis, oxidative phosphorylation and the creatine phosphate buffer), not stockpiled inside the sarcoplasmic reticulum's terminal cisternae.

## answer_d
Is needed for relaxation by active reuptake of calcium into sarcoplasmic reticulum.

## explanation_d
This is true, not the answer sought. Relaxation is an active, ATP-dependent process: the SERCA calcium pump uses ATP to actively transport calcium back into the sarcoplasmic reticulum.

## answer_e
It has a site in myosin head to bind with.

## explanation_e
This is true, not the answer sought. The myosin head carries an ATP-binding site, which also has ATPase activity to hydrolyse the bound ATP.

## topic
Physiology

## subtopic
Cross-bridge cycling

## main_concept
CON-MSK-AC42FE7AB41DF2

## concept_ids


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
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Distinguish what the terminal cisternae store (calcium) from what ATP does in the contraction-relaxation cycle.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 25; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: C.

---

# Item

## id
QM-ASULOCO-75CC2BDA3F73

## title
What surrounds a skeletal muscle fibre?

## question
A skeletal muscle fiber is surrounded by:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked to name the membrane that forms the outer boundary of a single skeletal muscle fibre, as opposed to the structures found inside it.

## format
single best answer

## derived_from
Printed question 8 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
Sarcolemma.

## explanation_a
Correct. The sarcolemma is the plasma membrane of the muscle fibre -- the structure that surrounds and encloses the whole cell, analogous to the cell membrane of any other cell.

## answer_b
Contractile proteins.

## explanation_b
Incorrect. Contractile proteins (actin, myosin and their regulatory partners) are found INSIDE the fibre, arranged in myofibrils; they do not surround the fibre.

## answer_c
Sarcoplasm.

## explanation_c
Incorrect. Sarcoplasm is the cytoplasm inside the fibre, contained BY the sarcolemma, not the surrounding structure itself.

## answer_d
T-tubules.

## explanation_d
Incorrect. T-tubules are invaginations of the sarcolemma that dip inward into the fibre; they are internal extensions, not the outer surrounding membrane.

## answer_e
Sarcoplasmic reticulum.

## explanation_e
Incorrect. The sarcoplasmic reticulum is an internal membrane network that stores calcium; it lies inside the fibre and does not surround it.

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
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
25

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
Identify the sarcolemma as the plasma membrane surrounding a skeletal muscle fibre.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 8; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
30

## randomise_answers
yes

## author_notes
Printed answer key: A.
