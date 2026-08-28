<!--
  ASU-LOCO Physiology MCQs -- fifth and final pass completing the native-text physiology
  paper, covering the remaining sliding-filament/cross-bridge mechanics, excitation-
  contraction coupling recall, contraction-type properties, the length-tension
  relationship's descending limb, and the last two gradation/energy-adaptation items (14
  items, printed questions 68, 69, 71, 72, 73, 75, 76, 77, 80, 81, 83, 86, 87, 90). Every
  stem, option and correct answer letter is verbatim from the native-text ASU Locomotor
  Physiology MCQ paper ("MCQs - Locomotor Physiology Questions.pdf", manifest
  src_3be9856ba9380e79cb01), extracted with pdftotext -layout and cross-checked against
  the printed answer key on PDF pages 22-23. Printed question numbers are kept in
  ## derived_from and ## source_citation. Import: Admin > Bulk import > question.
  status: Draft throughout; these need a faculty reviewer.

  This is the fifth and final authoring pass on this paper. Combined with the prior four
  files (37 in the original pass, then 13+13+13 in
  ASU-LOCO-msk-physiology-{triad-contractile-proteins-2,motorunit-forcevelocity,
  fibertype-energy-twitch}-mcq.md), all 90 printed MCQs from this paper are now authored:
  37+13+13+13+14 = 90. See PROGRESS.md on branch asu-loco-author3 for the consolidated
  count. Reuses the same 20 pending-live overlay concepts the first authoring pass minted
  -- no new concept minted across any of the five passes.

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
QM-ASULOCO-0B9734D3D0BD

## title
What actually shortens during skeletal muscle fibre contraction?

## question
The shortening of a skeletal muscle fiber during contraction involves which of the following?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked to name the structure that truly gets shorter during contraction, having just learned that neither the thick nor the thin filaments themselves change length.

## format
single best answer

## derived_from
Printed question 68 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
The thick filaments shortening

## explanation_a
Incorrect. The thick (myosin) filament does not change its own length during contraction; only the degree of its overlap with the thin filaments changes as the two slide past one another.

## answer_b
The thin filaments shortening

## explanation_b
Incorrect. The thin (actin) filament likewise keeps a constant length during contraction; it slides further into the A band rather than shrinking.

## answer_c
The sarcomeres shortening

## explanation_c
Correct. Neither filament actually changes length; instead, the thin filaments slide further past the thick filaments, pulling the Z lines at either end of each sarcomere closer together. Because a myofibril is simply many sarcomeres joined end to end, this per-sarcomere shortening adds up along the whole fibre's length, and it is this summed shortening of every sarcomere in series that produces the muscle's visible shortening.

## answer_d
The A bands shortening

## explanation_d
Incorrect. The A band's length is set by the myosin filament and stays constant during contraction; it is the I band and H zone that narrow, not the A band.

## answer_e
The Z lines not changing their position

## explanation_e
Incorrect. The Z lines move, they do not stay still -- they are pulled closer together as the sarcomere shortens, which is the entire visible signature of contraction on a micrograph.

## topic
Physiology

## subtopic
Sarcomere structure

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
State that sarcomere shortening, produced by filament sliding rather than filament shrinkage, is what actually shortens during skeletal muscle contraction.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 68; printed answer key pp.22-23.

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
QM-ASULOCO-433D8A87D605

## title
What happens to the thick and thin filaments as a muscle shortens?

## question
During skeletal muscle contraction, as the muscle shortens, the thick and thin filaments:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student must name what the two filament types actually do to one another as the whole muscle visibly shortens, rather than describing a change in either filament's own length.

## format
single best answer

## derived_from
Printed question 69 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
Shorten

## explanation_a
Incorrect. Neither filament shortens; both the thick (myosin) and thin (actin) filaments keep a constant length throughout contraction.

## answer_b
Slide past one another

## explanation_b
Correct. The sliding-filament mechanism is exactly this: the thin filaments are pulled past the stationary thick filaments by cycling cross-bridges, increasing their zone of overlap. Because both filaments keep their own length fixed, sliding rather than shrinking is the only way the sarcomere can shorten, which is why the theory is named for the sliding rather than for any change in the filaments themselves.

## answer_c
Do not interact

## explanation_c
Incorrect. The two filament types interact constantly during contraction, through the cyclical attachment of myosin heads to actin -- this interaction is the entire mechanical basis of force generation.

## answer_d
Elongate

## explanation_d
Incorrect. Elongation describes what happens to a muscle being stretched, not what happens to its filaments during active shortening.

## answer_e
Lengthen

## explanation_e
Incorrect, for the same reason as elongation above -- the filaments keep a constant length; they neither lengthen nor shorten during contraction.

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
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that thick and thin filaments slide past one another, without either changing its own length, during skeletal muscle contraction.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 69; printed answer key pp.22-23.

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
QM-ASULOCO-2B3C506AE6A4

## title
What does the release of energy from the myosin molecule directly produce?

## question
The release of energy from the myosin molecule directly results in which of the following?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked to name the mechanical event that immediately follows myosin's own energy release, as distinct from the earlier ATP-binding and cross-bridge-formation steps.

## format
single best answer

## derived_from
Printed question 71 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
Development of rigor

## explanation_a
Incorrect. Rigor develops from a failure to release energy (specifically, a failure of fresh ATP to bind and allow detachment), not from the normal release of energy during an active cycle.

## answer_b
Power stroke

## explanation_b
Correct. Once the myosin head has hydrolysed its bound ATP, the energy released drives the head's conformational change -- the power stroke -- which pulls the attached actin filament past the myosin filament. This is the single mechanical event that energy release from myosin directly produces, and it is the step responsible for actually generating tension and movement, as distinct from the earlier binding step or the later detachment step.

## answer_c
Detachment of the myosin head

## explanation_c
Incorrect. Detachment happens later in the cycle, when a NEW ATP molecule binds the myosin head -- it is not the direct result of the energy already released to power the preceding stroke.

## answer_d
Binding of actin to myosin

## explanation_d
Incorrect. Binding occurs before energy release, when the already-energised myosin head first attaches to an exposed site on actin; it is a precondition for the power stroke, not its result.

## answer_e
Breaking of the actin myosin complex

## explanation_e
Incorrect. Breaking the actin-myosin complex is detachment, which (as in option C) requires a fresh ATP binding, not the release of the energy already stored from the previous ATP hydrolysis.

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
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

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
State that the power stroke, not detachment or binding, is the direct mechanical result of energy release from the myosin head.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 71; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed answer key: B.

---

# Item

## id
QM-ASULOCO-42A6A2928BCA

## title
What breaks the actin-myosin complex so cross-bridge cycling can continue?

## question
In order for crossbridge cycling to occur, the actin-myosin complex must be broken by which of the following?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student must name the specific molecular event that detaches the myosin head from actin at the end of one cross-bridge cycle, allowing the cycle to repeat.

## format
single best answer

## derived_from
Printed question 72 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
E

## answer_a
Binding of tropomyosin to myosin

## explanation_a
Incorrect. Tropomyosin does not bind myosin at all; it regulates access to actin's binding site from the thin-filament side, and it plays no part in detaching an already-formed cross-bridge.

## answer_b
Binding of ATP to actin

## explanation_b
Incorrect. Actin has no ATP-binding site; ATP binds the myosin head, not actin, so this option assigns the binding event to the wrong filament.

## answer_c
Binding of the troponin complex to actin

## explanation_c
Incorrect. Troponin's binding to actin (via troponin I) is part of the resting, relaxed state's regulatory arrangement; it does not break an already-attached cross-bridge during active cycling.

## answer_d
Conformational change that occurs as the myosin head changes from the high to low energy state

## explanation_d
Incorrect. This describes the power stroke itself -- the head moving from its high-energy, "cocked" conformation to its low-energy, bent conformation while still attached to actin -- not the separate, subsequent event that releases the head from actin.

## answer_e
Binding of ATP to myosin

## explanation_e
Correct. Once the power stroke is complete, a fresh ATP molecule binding the myosin head is what breaks the actin-myosin cross-bridge, releasing the head so it can be re-energised and reattach at a new site. Without this ATP-binding step the head stays locked onto actin, which is exactly the mechanism behind rigor mortis when ATP production has permanently stopped.

## topic
Physiology

## subtopic
Cross-bridge cycling

## main_concept
CON-MSK-AC42FE7AB41DF2

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
State that a fresh ATP binding the myosin head, not tropomyosin, troponin or actin's own binding, is what detaches the cross-bridge and allows cycling to continue.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 72; printed answer key pp.22-23.

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
QM-ASULOCO-E0D6901DC3D1

## title
What is the sequence linking the action potential to changes in muscle force called?

## question
The sequence of events that links the action potential to changes in skeletal muscle force development is called what?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student must name the overarching process that connects an electrical action potential to the mechanical outcome of force generation, distinguishing it from the narrower cross-bridge cycle nested within it.

## format
single best answer

## derived_from
Printed question 73 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
The sliding-filament model

## explanation_a
Incorrect. The sliding-filament model describes how the thin and thick filaments move relative to one another to shorten the sarcomere; it is the mechanical consequence that follows once calcium has already been released, not the name for the whole electrical-to-mechanical sequence.

## answer_b
Crossbridge cycling

## explanation_b
Incorrect. Cross-bridge cycling is the specific, repeating molecular cycle of myosin attaching, pulling and detaching from actin -- one component nested inside the broader sequence being asked about, not the name of the whole sequence itself.

## answer_c
Myosin-actin coupling

## explanation_c
Incorrect. This is not the standard term used for either the specific cross-bridge interaction or the broader electrical-to-mechanical sequence.

## answer_d
Excitation-contraction coupling

## explanation_d
Correct. Excitation-contraction coupling is the full sequence linking the electrical excitation (the action potential) to the mechanical response of contraction: depolarisation spreads along the T-tubules, the dihydropyridine receptor activates the ryanodine receptor, calcium is released and binds troponin, and only then does cross-bridge cycling and filament sliding follow. It is this whole chain, not any single step within it, that the term names.

## answer_e
Oxidative phosphorylation

## explanation_e
Incorrect. Oxidative phosphorylation is a mitochondrial energy-production pathway, unrelated to the electrical-to-mechanical signalling sequence the question is asking about.

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
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
58

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
Name excitation-contraction coupling as the full sequence from action potential to force development, distinguishing it from the narrower cross-bridge cycle and sliding-filament mechanism nested within it.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 73; printed answer key pp.22-23.

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
QM-ASULOCO-78D5CBC1FCBD

## title
Which receptor is the voltage sensor that raises cytoplasmic calcium?

## question
Which of the following is the voltage sensor that initiates an increase in cytoplasmic calcium in response to an action potential?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student must correctly identify which of two closely related T-tubule and sarcoplasmic-reticulum receptors is the one that actually senses voltage, as opposed to the one that only releases calcium once triggered.

## format
single best answer

## derived_from
Printed question 75 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
Dihydropyridine receptor

## explanation_a
Correct. The dihydropyridine receptor sits on the T-tubule membrane and is the true voltage sensor of excitation-contraction coupling: it detects the spreading depolarisation and, through direct mechanical coupling, triggers the ryanodine receptor on the adjacent sarcoplasmic reticulum to open. It is this receptor's voltage-sensing role, not the ryanodine receptor's calcium-releasing role, that the question is testing.

## answer_b
Ryanodine receptor

## explanation_b
Incorrect. The ryanodine receptor is the calcium-release channel on the sarcoplasmic reticulum; it opens in response to the dihydropyridine receptor's mechanical signal, but it is not itself the voltage sensor.

## answer_c
Calcium pump

## explanation_c
Incorrect. The calcium pump (SERCA) actively removes calcium from the cytoplasm during relaxation; it has no voltage-sensing role and does not raise cytoplasmic calcium.

## answer_d
Calcium-induced calcium release channel

## explanation_d
Incorrect. This mechanism, where a small trigger calcium influx opens further calcium release, is the cardiac muscle pattern; skeletal muscle instead uses direct mechanical coupling between the dihydropyridine and ryanodine receptors, with no voltage-sensing role for a calcium-induced channel.

## answer_e
Sodium channel

## explanation_e
Incorrect. Voltage-gated sodium channels generate the action potential's depolarising phase on the sarcolemma and T-tubule, but they are not the receptor that couples that depolarisation to calcium release from the sarcoplasmic reticulum.

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
52

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
Identify the dihydropyridine receptor as the voltage sensor of excitation-contraction coupling, distinct from the ryanodine receptor it triggers.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 75; printed answer key pp.22-23.

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
QM-ASULOCO-5E28728CB810

## title
What does calcium binding troponin directly cause?

## question
The binding of calcium to troponin will directly cause which of the following?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student must name the immediate structural consequence of calcium binding troponin C, distinguishing the correct actin-binding-site exposure from a plausible but reversed distractor naming the wrong filament's site.

## format
single best answer

## derived_from
Printed question 76 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
The binding of ATP to myosin

## explanation_a
Incorrect. ATP binding to myosin is a separate event in the cross-bridge cycle, governed by the completion of the previous stroke, not a direct consequence of calcium binding troponin.

## answer_b
The further release of calcium into the cytoplasm

## explanation_b
Incorrect. Calcium binding troponin is a downstream consumer of the calcium already released, not a trigger for releasing more of it; there is no positive-feedback loop of this kind in skeletal muscle's calcium handling.

## answer_c
The movement of tropomyosin, thereby exposing the myosin-binding site on the actin molecule

## explanation_c
Correct. Calcium binding troponin C produces a conformational change in the whole troponin complex that pulls tropomyosin away from its blocking position in the groove of the actin helix. This uncovers the myosin-binding site that sits ON actin, which is exactly what allows the myosin head to attach and cross-bridge cycling to begin.

## answer_d
The movement of tropomyosin, thereby exposing the actin-binding site on the myosin molecule

## explanation_d
Incorrect. This reverses which filament owns the binding site: the site being uncovered by tropomyosin's movement is myosin's binding site ON actin, not an "actin-binding site on myosin" -- myosin already presents its own binding surface regardless of tropomyosin's position.

## answer_e
The hydrolysis of ATP

## explanation_e
Incorrect. ATP hydrolysis occurs at the myosin head as part of the cross-bridge cycle once binding has occurred; it is not the direct, immediate structural result of calcium binding troponin.

## topic
Physiology

## subtopic
Contractile proteins

## main_concept
CON-MSK-287D88DF2F6B8C

## concept_ids
CON-MSK-3013AA61E917B7

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
State that calcium binding troponin moves tropomyosin to expose myosin's binding site on actin, and reject the reversed-filament distractor that swaps which molecule owns the site.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 76; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Printed answer key: C.

---

# Item

## id
QM-ASULOCO-1297BABF693B

## title
What is a motor unit, precisely?

## question
What is a motor unit?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares five candidate definitions, several of which swap "motor neuron" for "spinal nerve" or "fascicle," and must select the precise definition of a motor unit.

## format
single best answer

## derived_from
Printed question 77 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
All the muscle fibers in a fascicle

## explanation_a
Incorrect. A fascicle is an anatomical bundle of fibres grouped by connective tissue, without regard to how many motor neurons innervate it; a motor unit is instead defined functionally, by shared innervation from a single neuron, and does not necessarily correspond to one fascicle.

## answer_b
All the myofibrils in a muscle fiber

## explanation_b
Incorrect. Myofibrils are the contractile strands within a single muscle fibre; a motor unit is a much larger grouping involving many whole fibres, not the internal structure of just one.

## answer_c
A muscle fiber and all the motor neurons that innervate it

## explanation_c
Incorrect. Each skeletal muscle fibre is innervated by only one motor neuron under normal conditions (not several), and this option also has the direction backwards: a motor unit groups one neuron with many fibres, not one fibre with many neurons.

## answer_d
A motor neuron and all the muscle fibers it innervates

## explanation_d
Correct. A motor unit is precisely one motor neuron together with every muscle fibre that single neuron supplies, and this pairing forms the smallest unit of force the nervous system can independently activate. Its size varies by function -- a handful of fibres per neuron in muscles needing fine control, hundreds to thousands per neuron in large muscles built for gross force.

## answer_e
A spinal nerve and all the muscle fibers it innervates

## explanation_e
Incorrect. A spinal nerve is a much larger bundle containing many individual motor neurons' axons together; the functional unit relevant to muscle physiology is defined at the level of a single motor neuron, not the whole mixed nerve.

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
ART-103-PHY-GRADING-LENGTH-LOAD

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Define a motor unit precisely as one motor neuron and every fibre it innervates, distinguishing it from a fascicle, a spinal nerve and the myofibrils within one fibre.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 77; printed answer key pp.22-23.

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
QM-ASULOCO-94C74A586837

## title
Which is a property of isotonic skeletal muscle contraction?

## question
Which of the following is a property of isotonic skeletal muscle contraction?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares five candidate properties of contraction and must find the one that correctly describes the load-versus-force relationship during isotonic contraction.

## format
single best answer

## derived_from
Printed question 80 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
E

## answer_a
Slow increase in force with no change in muscle length

## explanation_a
Incorrect. A rising force with no change in length describes the initial phase of an isometric, not isotonic, contraction, before the muscle has begun to shorten.

## answer_b
Rapid increase in force with no change in muscle length

## explanation_b
Incorrect, for the same reason as option A -- a constant length while force rises is the isometric pattern, regardless of how quickly the force rises.

## answer_c
Muscle length will be increased by contraction

## explanation_c
Incorrect. Isotonic contraction shortens the muscle, it does not lengthen it; lengthening under tension instead describes an eccentric (lengthening) contraction, a different category altogether.

## answer_d
Load is greater than the force generated by the muscle

## explanation_d
Incorrect. If the load exceeds the force the muscle can generate, the muscle cannot shorten at all -- it stays isometric (or is stretched by the load) rather than performing an isotonic contraction.

## answer_e
Load is less than the force generated by the muscle

## explanation_e
Correct. Isotonic contraction begins only once the muscle's developing tension exceeds the load, at which point the muscle shortens while holding tension roughly constant at that load. This is the defining condition that distinguishes isotonic contraction from an isometric one, where the load is instead equal to or greater than the force the muscle can produce.

## topic
Physiology

## subtopic
Contraction types

## main_concept
CON-MSK-87D5C5A48AB5D9

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
ART-103-PHY-CONTRACTION-TYPES

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that isotonic contraction begins once the muscle's generated force exceeds the load, and distinguish this from the load-equals-or-exceeds-force condition of isometric contraction.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 80; printed answer key pp.22-23.

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
QM-ASULOCO-6BAEEFA7973F

## title
Which description best fits an isotonic contraction?

## question
Which of the following best describes an isotonic contraction?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares five descriptions built from the contractile-element/elastic-element model of muscle and must find the one that correctly matches isotonic contraction's defining behaviour.

## format
single best answer

## derived_from
Printed question 81 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
When the contractile elements shorten, they lengthen the elastic elements but do not move the load

## explanation_a
Incorrect. Shortening the contractile element while only stretching the muscle's own elastic elements, without moving the load, describes the isometric phase of contraction -- tension building against a fixed overall length -- not the isotonic phase.

## answer_b
When the contractile elements shorten, they create enough force to move the load.

## explanation_b
Correct. Isotonic contraction is defined by the contractile elements shortening and generating enough force to actually move the external load, once that force exceeds the load's resistance. This is what makes it "isotonic": the tension stays roughly constant at the load's value while shortening does the mechanical work, in contrast to isometric contraction, where the elastic elements absorb the shortening and no load moves at all.

## answer_c
When the contractile elements lengthen, they shorten the elastic elements and move the load.

## explanation_c
Incorrect. The contractile elements do not lengthen during a contraction that moves a load in the shortening direction; lengthening under tension describes eccentric contraction, a distinct category from the isotonic (concentric) contraction this paper is testing.

## answer_d
When the contractile elements lengthen, they lengthen the elastic elements but do not move the load.

## explanation_d
Incorrect, for the same reason as option C -- contractile-element lengthening does not belong to the isotonic-contraction description being tested here.

## answer_e
The contractile elements stay the same length as the elastic elements shorten and move the load.

## explanation_e
Incorrect. It is the contractile elements that actively shorten to generate movement; the elastic elements (tendons and connective tissue) simply transmit that force, they do not shorten and move the load on their own while the contractile machinery stays still.

## topic
Physiology

## subtopic
Contraction types

## main_concept
CON-MSK-87D5C5A48AB5D9

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
ART-103-PHY-CONTRACTION-TYPES

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that isotonic contraction is defined by the contractile elements actively shortening to generate enough force to move the load.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 81; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Printed answer key: B.

---

# Item

## id
QM-ASULOCO-AE16F4380F42

## title
What happens when skeletal muscle is stretched beyond its optimum length?

## question
As skeletal muscle is further stretched beyond the length where optimum force is developed:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student on the descending limb of the length-tension curve must explain why force falls once a muscle is stretched well beyond its optimal sarcomere length.

## format
single best answer

## derived_from
Printed question 83 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
E

## answer_a
The amount of calcium released by the sarcoplasmic reticulum is reduced as length increases

## explanation_a
Incorrect. The length-tension relationship is a purely mechanical, filament-overlap phenomenon; stretching the sarcomere does not itself reduce how much calcium the sarcoplasmic reticulum releases in response to a given action potential.

## answer_b
The thin filaments are pulled away from one another, thereby reducing their ability to interact with myosin

## explanation_b
Incorrect. Thin filaments do not pull away from each other as the sarcomere is stretched; each thin filament instead loses overlap with the myosin filament it was interacting with, which is a different geometric change from thin filaments separating from one another.

## answer_c
The thick filaments are pulled away from one another, thereby reducing their ability to interact with actin

## explanation_c
Incorrect. Thick filaments are anchored centrally at the M line and are not pulled apart from each other by stretch; it is their overlap with the thin filaments that decreases, not their separation from other thick filaments.

## answer_d
The thick filaments overlap one another, thereby reducing their ability to interact with actin

## explanation_d
Incorrect. Thick filaments overlapping each other describes what happens on the opposite, ascending limb at very short sarcomere lengths (excessive shortening), not what happens with stretch beyond the optimum.

## answer_e
The thin filaments overlap one another, thereby reducing their ability to interact with Myosin

## explanation_e
Correct. Beyond the optimal sarcomere length, the thin filaments from opposite ends of the sarcomere are pulled so far apart that they no longer reach far enough into the A band to overlap myosin properly -- and at very extreme stretch, this description in the paper's own answer key reflects the fact that fewer myosin heads have any actin to bind. With less filament overlap available, fewer cross-bridges can form, so active tension falls the further the sarcomere is stretched past its 2.2-micrometre optimum.

## topic
Physiology

## subtopic
Length-tension relationship

## main_concept
CON-MSK-01E9132FDDF9F2

## concept_ids


## contextual_concept_ids


## difficulty
Challenging

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
4

## inferred_difficulty
28

## exam_relevance
8

## clinical_relevance
0.2

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
ART-103-PHY-GRADING-LENGTH-LOAD

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that active tension falls beyond the optimal sarcomere length because reduced thick-thin filament overlap leaves fewer myosin heads able to bind actin.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 83; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
70

## randomise_answers
yes

## author_notes
Printed answer key: E. The printed option's own wording ("thin filaments overlap one another") is transcribed verbatim even though the more standard textbook phrasing for this descending-limb mechanism is "reduced thick-thin filament overlap" rather than the thin filaments overlapping each other; recorded as printed, per the rule against silently correcting a source paper's wording.

---

# Item

## id
QM-ASULOCO-49F1A4A75409

## title
Which adaptation does aerobic training NOT produce in skeletal muscle?

## question
Which of the following is NOT an adaptation of skeletal muscle that would be observed in response to aerobic training?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares four genuine aerobic-training adaptations against one option that instead describes a resistance-training outcome, and must identify the odd one out.

## format
single best answer

## derived_from
Printed question 86 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
An increase in mitochondrial density

## explanation_a
This genuinely is an aerobic-training adaptation, so it is not the answer sought -- more mitochondria per fibre raise the muscle's aerobic ATP-production capacity.

## answer_b
An increase in capillary density

## explanation_b
This genuinely is an aerobic-training adaptation, so it is not the answer sought -- more capillaries improve oxygen and substrate delivery for sustained aerobic work.

## answer_c
An increase in the myoglobin

## explanation_c
This genuinely is an aerobic-training adaptation, so it is not the answer sought -- more myoglobin improves the muscle's own oxygen buffering during oxidative metabolism.

## answer_d
An increase in the diameter of the skeletal muscle fibers

## explanation_d
Correct -- this is the exception. Marked fibre hypertrophy (increased fibre diameter) is the signature adaptation of resistance/strength training, driven by an increase in contractile protein content. Aerobic training instead improves the oxidative delivery machinery around the existing fibres -- more mitochondria, capillaries, myoglobin and oxidative enzymes -- typically without producing substantial hypertrophy of the fibres themselves.

## answer_e
An increase in the concentration of oxidative enzymes

## explanation_e
This genuinely is an aerobic-training adaptation, so it is not the answer sought -- higher oxidative enzyme concentrations raise the rate at which the muscle can process substrates aerobically.

## topic
Physiology

## subtopic
Fatigue and metabolism

## main_concept
CON-MSK-9A2D57D133DB52

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
50

## exam_relevance
8

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
Distinguish aerobic training's oxidative-delivery adaptations (mitochondria, capillaries, myoglobin, oxidative enzymes) from the fibre-hypertrophy adaptation that instead marks resistance training.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 86; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed answer key: D.

---

# Item

## id
QM-ASULOCO-8CBC78E18CA6

## title
Which of these is NOT involved in gradation of skeletal muscle contraction?

## question
Which of the following is NOT involved in gradation of skeletal muscle contraction?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares three genuine moment-to-moment gradation mechanisms against one option that instead describes a slower, long-term training adaptation, and must find the one that does not belong.

## format
single best answer

## derived_from
Printed question 87 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
An increase in number of active motor units

## explanation_a
This genuinely is a gradation mechanism, so it is not the answer sought -- recruiting more motor units, following the size principle, is one of the two chief ways whole-muscle force is graded moment to moment.

## answer_b
An increase in frequency of stimulation

## explanation_b
This genuinely is a gradation mechanism, so it is not the answer sought -- raising the firing frequency of already-active motor units drives summation and, at high enough rates, tetanic fusion, increasing force output.

## answer_c
An increase in the degree of stretch of the muscle

## explanation_c
This genuinely is a gradation mechanism, so it is not the answer sought -- stretching the muscle toward its optimal length raises the active tension it can generate for a given level of activation, per the length-tension relationship.

## answer_d
An increase in the capillary blood supply to the muscle

## explanation_d
Correct -- this is the exception. Capillary density is a slow, structural adaptation that develops over weeks of endurance training. It is not a mechanism the nervous system can call on to grade force from one contraction to the next, unlike recruitment, frequency and length, which all act within a single contraction and require no training at all to be available.

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
Distinguish the moment-to-moment gradation mechanisms (recruitment, frequency, length) from capillary density, a slower structural adaptation rather than a gradation mechanism.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 87; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed answer key: D. Printed with only four options (a-d), consistent with several other items late on this paper.

---

# Item

## id
QM-ASULOCO-012D998C4DA9

## title
What does NOT change during isotonic muscle contraction?

## question
Which of the following is NOT changed in isotonic muscle contraction?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares four properties of isotonic contraction and must find the single one that stays fixed throughout, having already learned that muscle length, work done and contractile-element length all do change.

## format
single best answer

## derived_from
Printed question 90 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
Length of contractile elements

## explanation_a
This genuinely changes, so it is not the answer sought -- the contractile elements (the sarcomeres) shorten as the muscle performs isotonic work.

## answer_b
Length of the muscle

## explanation_b
This genuinely changes, so it is not the answer sought -- overall muscle length shortens once the developed tension exceeds the load, which is the defining feature of isotonic contraction.

## answer_c
Tension of the muscle

## explanation_c
Correct. Once an isotonic contraction begins, the muscle's tension stays fixed at the level of the load throughout the shortening. This constancy of tension against a changing length is exactly what the name "isotonic" (same tension) describes, and it is the mirror image of isometric contraction, where tension changes while length instead stays fixed.

## answer_d
Work done by the muscle

## explanation_d
This genuinely changes, so it is not the answer sought -- work equals force times the distance moved, and since the muscle actually shortens and moves the load in isotonic contraction, work done increases from zero as shortening proceeds.

## topic
Physiology

## subtopic
Contraction types

## main_concept
CON-MSK-8CD0C1C03D5333

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
ART-103-PHY-CONTRACTION-TYPES

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that tension stays constant throughout isotonic contraction, which is the property the name "isotonic" itself describes, while length, contractile-element length and work done all change.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 90; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: C. Printed with only four options (a-d).
