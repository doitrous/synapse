<!--
  ASU-LOCO Physiology MCQs -- fourth pass, covering sarcomere/fibre-type recall, ATP's
  role in contracture, fatigue and the three energy systems, twitch/Treppe/tetanus timing,
  and the two contractile-protein questions this paper repeats in a different guise (13
  items, printed questions 47, 49, 51, 53, 55, 56, 57, 59, 61, 63, 64, 66, 67). Every stem,
  option and correct answer letter is verbatim from the native-text ASU Locomotor
  Physiology MCQ paper ("MCQs - Locomotor Physiology Questions.pdf", manifest
  src_3be9856ba9380e79cb01), extracted with pdftotext -layout and cross-checked against
  the printed answer key on PDF pages 22-23. Printed question numbers are kept in
  ## derived_from and ## source_citation. Import: Admin > Bulk import > question.
  status: Draft throughout; these need a faculty reviewer.

  Sixth authoring pass on this paper -- see the two prior files (triad-contractile-
  proteins-2, motorunit-forcevelocity) for the running tally and PROGRESS.md on branch
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
QM-ASULOCO-4436405D5B63

## title
Which statement about skeletal muscle is correct?

## question
In skeletal muscle:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student reviews five statements about tropomyosin, actin, myosin, troponin and the immediate energy source for contraction, and must identify the one genuinely correct claim.

## format
single best answer

## derived_from
Printed question 47 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
Tropomyosin is made up of 3 subunits

## explanation_a
Incorrect. It is troponin, not tropomyosin, that is made up of three subunits (troponin C, I and T); tropomyosin is a single elongated coiled-coil protein without this three-part structure.

## answer_b
The heads of actin contain ATP hydrolysis sites

## explanation_b
Incorrect. ATP hydrolysis takes place at the myosin head, not on actin; actin's role is to provide the binding site the myosin head attaches to, with no ATPase activity of its own.

## answer_c
The myosin is contained within the A band

## explanation_c
Correct. The A band's length is defined by the length of the myosin (thick) filament, so myosin occupies the A band throughout its length, including the central H zone where no actin overlaps it. This is exactly why the A band's overall length stays constant during contraction even as the I band and H zone change -- the myosin filaments that define it are not sliding relative to each other.

## answer_d
Troponin T inhibits the interaction with myosin

## explanation_d
Incorrect. The inhibitory subunit is troponin I, which binds actin and holds the complex in the blocking position; troponin T's job is instead to anchor the whole troponin complex to tropomyosin, not to inhibit the actin-myosin interaction itself.

## answer_e
The immediate energy source for contraction is GTP.

## explanation_e
Incorrect. ATP, not GTP, is the immediate energy source hydrolysed by the myosin head to power the cross-bridge cycle; GTP is used elsewhere in cell metabolism but is not the fuel for skeletal muscle contraction.

## topic
Physiology

## subtopic
Sarcomere structure

## main_concept
CON-MSK-0824FE988ADA00

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
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that myosin occupies the full length of the A band, and reject four common misattributions of subunit count, ATPase location, inhibitory role and immediate energy source.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 47; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Printed answer key: C.

---

# Item

## id
QM-ASULOCO-782C08E402CF

## title
What characterises type IIb skeletal muscle fibres?

## question
Type IIb skeletal muscle fibers:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked which statement correctly describes type IIb (fast glycolytic) fibres, having just contrasted them with the oxidative type I fibres.

## format
single best answer

## derived_from
Printed question 49 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
Are the major muscle fiber of white muscle

## explanation_a
Correct. Type IIb (fast glycolytic, "white") fibres are the predominant fibre type of pale, white muscle -- they are large in diameter, rich in glycolytic enzymes and glycogen, and built for powerful, brief contractions rather than sustained activity. Their pallor is itself a clue to their metabolism: unlike red type I fibres, they carry little myoglobin and depend on anaerobic glycolysis rather than oxidative phosphorylation, which is also why they tire quickly.

## answer_b
Have a long latent period

## explanation_b
Incorrect. Fast fibres such as type IIb have a SHORT latent period and short contraction time compared with slow (type I) fibres, not a long one -- speed is exactly what distinguishes them.

## answer_c
Have a high oxidative capacity

## explanation_c
Incorrect. High oxidative capacity, with abundant mitochondria and myoglobin, describes the slow, red type I fibres; type IIb fibres are glycolytic and comparatively poor in oxidative capacity, which is why they fatigue quickly.

## answer_d
Are the major muscle fiber of the long muscles of the back

## explanation_d
Incorrect. The long postural muscles of the back are dominated by slow, fatigue-resistant type I fibres suited to sustained low-intensity activity, not by fast, quickly-fatiguing type IIb fibres.

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
Recall

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
State that type IIb fibres are the fast-glycolytic, powerful, quickly-fatiguing fibres of white muscle, contrasting them with the oxidative type I fibres of postural muscle.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 49; printed answer key pp.22-23.

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
QM-ASULOCO-B5ACBB8E41FD

## title
In which step does ATP have no role?

## question
ATP does not have a role in:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student lists four steps of the contraction-relaxation cycle and must identify the one that is triggered by a receptor's conformational change rather than by ATP hydrolysis.

## format
single best answer

## derived_from
Printed question 51 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
Energizing the cross bridge to perform the power stroke

## explanation_a
This genuinely does depend on ATP, so it is not the answer sought -- ATP hydrolysis on the myosin head is what energises the head before it can perform the power stroke.

## answer_b
Detachment of the cross bridge from the actin binding site

## explanation_b
This genuinely does depend on ATP, so it is not the answer sought -- a fresh ATP binding the myosin head is exactly what allows it to release from actin at the end of a cycle.

## answer_c
Reuptake of Ca++ actively into the sarcoplasmic reticulum for relaxation

## explanation_c
This genuinely does depend on ATP, so it is not the answer sought -- the SERCA pump uses ATP to actively transport calcium back into the sarcoplasmic reticulum during relaxation.

## answer_d
Release of Ca++ from the terminal cisternae.

## explanation_d
Correct -- ATP plays no role here. Calcium release from the terminal cisternae is triggered by the ryanodine receptor opening in response to the mechanical signal from the T-tubule's dihydropyridine receptor, not by ATP hydrolysis. This is a voltage-triggered conformational event, unlike the three other ATP-dependent steps in this list, and it is exactly why a fibre poisoned so that it cannot make ATP can still, briefly, release calcium and attempt a contraction before locking into rigor.

## topic
Physiology

## subtopic
Cross-bridge cycling

## main_concept
CON-MSK-AC42FE7AB41DF2

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
Distinguish the ATP-dependent steps of the contraction-relaxation cycle (power stroke, cross-bridge detachment, calcium reuptake) from calcium release itself, which is triggered mechanically, not by ATP hydrolysis.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 51; printed answer key pp.22-23.

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
QM-ASULOCO-4B16AE32BBD2

## title
Which of these is NOT a cause of contracture?

## question
The cause of contracture is NOT:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares four proposed causes of muscle contracture -- a sustained, painful shortening without accompanying electrical activity -- and must identify the one that instead describes a different ATP-failure state.

## format
single best answer

## derived_from
Printed question 53 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
Increase intracellular Ca++

## explanation_a
This genuinely is a recognised cause of contracture, so it is not the answer sought -- any process that keeps myoplasmic calcium persistently elevated sustains cross-bridge cycling without the muscle relaxing.

## answer_b
Increase Ca++ release

## explanation_b
This genuinely is a recognised cause of contracture, so it is not the answer sought -- excessive release of calcium from the sarcoplasmic reticulum, as in malignant hyperthermia, drives sustained contraction of this kind.

## answer_c
Decrease Ca++ reuptake

## explanation_c
This genuinely is a recognised cause of contracture, so it is not the answer sought -- if SERCA cannot pump calcium back into the sarcoplasmic reticulum fast enough, myoplasmic calcium stays elevated and the muscle cannot relax.

## answer_d
Inability to use glycogen to form ATP

## explanation_d
Correct -- this is NOT how contracture, in the sense this paper is testing, is caused. Contracture here is defined as a calcium-driven state -- persistently elevated myoplasmic calcium keeping cross-bridges cycling despite normal ATP availability. A failure to generate ATP from glycogen, as in McArdle's disease, instead causes the ATP-depletion state associated with rigor-type failure of cross-bridge detachment -- a related but distinct mechanism the paper tests separately, and the reason this option is grouped with rigor rather than with the other three calcium-based causes.

## topic
Physiology

## subtopic
Cross-bridge cycling

## main_concept
CON-MSK-AC42FE7AB41DF2

## concept_ids


## contextual_concept_ids


## difficulty
Challenging

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
30

## exam_relevance
8

## clinical_relevance
0.5

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
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Distinguish calcium-driven contracture (from increased release, increased entry or decreased reuptake) from an ATP-generation failure such as McArdle's disease, which the paper tests as a separate mechanism.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 53; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
70

## randomise_answers
yes

## author_notes
Printed answer key: D. This item sits close to printed question 54 (McArdle's disease, already authored) and to the rigor mortis item elsewhere on this paper; the department appears to be testing that students can tell calcium-driven contracture, McArdle's exercise-induced contracture, and rigor mortis apart as three related but distinct ATP/calcium failure states. Recorded as printed, not reconciled against the fact that McArdle's disease itself also classically causes an exercise contracture -- the printed key's own taxonomy is followed here rather than overridden.

---

# Item

## id
QM-ASULOCO-07EE7CEFEF22

## title
Which statement about muscle fatigue is FALSE?

## question
Regarding muscle fatigue, which sentence is FALSE:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student reviews four statements about the causes and character of muscle fatigue and must find the one that gets the fibre-type pattern of fatigue onset backwards.

## format
single best answer

## derived_from
Printed question 55 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
It may be due to decrease CNS activity

## explanation_a
This is a true statement, not the answer sought -- central fatigue, a reduction in the central nervous system's drive to the motor neurons, is a recognised contributor to overall fatigue alongside the peripheral, muscle-based causes.

## answer_b
It leads to a weak prolonged twitch

## explanation_b
This is a true statement, not the answer sought -- a fatigued muscle's twitches become both weaker and longer in duration, with relaxation left incomplete.

## answer_c
It is of rapid onset in slow fibers

## explanation_c
Correct -- this is the false statement. Slow (red, oxidative) fibres are specifically fatigue-RESISTANT, built with abundant mitochondria and capillaries to sustain aerobic activity for long periods. It is the fast (pale, glycolytic) fibres that fatigue rapidly once their limited anaerobic energy supply and lactic acid tolerance are exhausted, which is the reverse of what this statement claims.

## answer_d
It may be due to depletion of acetylcholine vesicles at the neuromuscular junction.

## explanation_d
This is a true statement, not the answer sought -- impaired neuromuscular transmission, including depletion of readily releasable acetylcholine vesicles with sustained high-frequency stimulation, is one of the recognised causes of fatigue.

## topic
Physiology

## subtopic
Fatigue and metabolism

## main_concept
CON-MSK-2E4061334D52EA

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
0.35

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
State that slow (red) fibres are fatigue-resistant, not rapidly fatiguing, and name the four recognised causes of muscle fatigue.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 55; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed answer key: C.

---

# Item

## id
QM-ASULOCO-59516F6B822B

## title
Which adaptation does sprinting NOT produce?

## question
Sprinting activities lead to all of the following adaptations EXCEPT-

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares four training adaptations attributed to sprint (anaerobic, high-intensity) training and must find the one that is instead the hallmark of endurance training.

## format
single best answer

## derived_from
Printed question 56 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
Increase muscle contractile proteins

## explanation_a
This genuinely is a sprint-training adaptation, so it is not the answer sought -- high-intensity, high-force training increases the amount of actin and myosin in the fibre, producing hypertrophy.

## answer_b
Increase muscle enzymes

## explanation_b
This genuinely is a sprint-training adaptation, so it is not the answer sought -- sprint training raises the activity of the glycolytic enzymes the fast fibres depend on for rapid, anaerobic ATP production.

## answer_c
Increase muscle fiber diameter and glycogen content

## explanation_c
This genuinely is a sprint-training adaptation, so it is not the answer sought -- fast fibres hypertrophy and increase their glycogen stores in response to repeated high-intensity effort.

## answer_d
Increase capillaries of muscle

## explanation_d
Correct -- this is the exception. A substantial increase in capillary density is the signature adaptation of endurance (aerobic) training, which builds the oxygen-delivery capacity that sustained oxidative metabolism depends on. Sprint training's adaptations are instead aimed at rapid force and anaerobic energy production, not at improving blood supply, so this is the one adaptation that belongs to the other training mode.

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
Distinguish sprint-training adaptations (contractile protein and glycogen increase, fibre hypertrophy) from endurance-training's signature capillary-density increase.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 56; printed answer key pp.22-23.

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
QM-ASULOCO-C52396DF9477

## title
Which adaptation does regular endurance training NOT produce?

## question
Regular endurance activities lead to all of the following adaptations EXCEPT:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares four training adaptations attributed to endurance (aerobic) training and must find the one that actually belongs to sprint or resistance training instead.

## format
single best answer

## derived_from
Printed question 57 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
Increase number of cross bridges

## explanation_a
Correct -- this is the exception. Increasing the number of cross-bridges reflects an increase in contractile-protein content, the hallmark of resistance or sprint-style hypertrophy training. Endurance training's adaptations instead centre on the oxidative delivery and metabolic machinery -- myoglobin, capillaries and mitochondria -- not on adding more myosin heads, so this option names the wrong training mode's signature change.

## answer_b
Increase myoglobin of muscle

## explanation_b
This genuinely is an endurance-training adaptation, so it is not the answer sought -- more myoglobin improves the muscle's own oxygen buffering for sustained oxidative work.

## answer_c
Increase capillaries of muscle

## explanation_c
This genuinely is an endurance-training adaptation, so it is not the answer sought -- greater capillary density improves oxygen and substrate delivery for prolonged aerobic activity.

## answer_d
Increase mitochondria of muscle

## explanation_d
This genuinely is an endurance-training adaptation, so it is not the answer sought -- more mitochondria raise the muscle's capacity for aerobic ATP production, exactly what sustained endurance activity depends on.

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
52

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
Distinguish endurance-training's oxidative adaptations (myoglobin, capillaries, mitochondria) from the contractile-protein increase that instead marks resistance or sprint training.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 57; printed answer key pp.22-23.

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
QM-ASULOCO-1E5B88EEFA3B

## title
What characterises isotonic contraction?

## question
Isotonic contraction is characterized by:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares four statements about isotonic contraction and must identify the one that correctly describes its energy cost relative to isometric contraction.

## format
single best answer

## derived_from
Printed question 59 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
The muscle tension is increased

## explanation_a
Incorrect. In isotonic contraction the tension stays constant, at the level of the load, once the muscle begins to shorten -- tension does not keep rising the way it does throughout an isometric contraction.

## answer_b
The mechanical efficiency of the muscle is zero

## explanation_b
Incorrect. Isotonic contraction is precisely where the muscle does external mechanical work (moving the load), so its efficiency is not zero; zero mechanical efficiency instead describes isometric contraction, where no external work is done despite tension being generated and energy consumed.

## answer_c
The muscle length is constant

## explanation_c
Incorrect. It is isometric contraction, not isotonic, that keeps muscle length constant; isotonic contraction is defined by the muscle actually shortening once its tension matches the load.

## answer_d
Utilizes more energy and releases more heat than isometric contraction

## explanation_d
Correct. Because isotonic contraction does external work in addition to generating tension, it consumes more total energy and releases more heat than an isometric contraction developing the same tension. The extra cost is the price of actually moving the load rather than merely holding it, which is also why isometric holding can be sustained for longer than an equivalent isotonic effort before fatigue sets in.

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
State that isotonic contraction consumes more energy and releases more heat than isometric contraction, because it does external work that isometric contraction does not.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 59; printed answer key pp.22-23.

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
QM-ASULOCO-F0FDBDFE9668

## title
Which statement about the Treppe phenomenon is NOT correct?

## question
Which sentence about Treppe phenomenon is not correct:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student describing the staircase phenomenon in a rested muscle must find the one statement that wrongly claims it can be produced with a single stimulus.

## format
single best answer

## derived_from
Printed question 61 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
It is the staircase phenomenon

## explanation_a
This is a true statement, not the answer sought -- "Treppe" is literally German for "staircase," describing the step-wise rise in twitch tension.

## answer_b
The successive contractions increase in amplitude till reaching their maximal

## explanation_b
This is a true statement, not the answer sought -- each successive twitch in a rested muscle given repeated identical stimuli grows larger until a plateau is reached.

## answer_c
It is due to increase Ca++ availability

## explanation_c
This is a true statement, not the answer sought -- Treppe is attributed to a progressive rise in available intracellular calcium (and warming of the muscle) over the first few stimuli of a rested muscle.

## answer_d
Is produced by applying a single adequate stimulus to the muscle

## explanation_d
Correct -- this is the incorrect statement. Treppe specifically requires a SERIES of repeated stimuli delivered to an initially rested muscle. A single stimulus produces only one simple twitch and cannot, by definition, show a staircase of increasing amplitude, since a staircase needs at least a few steps to be visible at all.

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
ART-103-PHY-GRADING-LENGTH-LOAD

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that the Treppe (staircase) phenomenon requires a series of repeated stimuli, not a single one, to demonstrate the progressive rise in twitch amplitude.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 61; printed answer key pp.22-23.

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
QM-ASULOCO-41907C995786

## title
Which effect of warming on a simple muscle twitch is NOT seen?

## question
The effects of warming on simple muscle twitch do not include:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student lists four effects said to follow warming a muscle and must find the one that describes the twitch lasting longer rather than shorter.

## format
single best answer

## derived_from
Printed question 63 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
Rapid contraction

## explanation_a
This genuinely is an effect of warming, so it is not the answer sought -- warming speeds the chemical reactions of the cross-bridge cycle, producing a faster contraction phase.

## answer_b
Strong contraction

## explanation_b
This genuinely is an effect of warming, so it is not the answer sought -- moderate warming improves the efficiency of excitation-contraction coupling and cross-bridge cycling, increasing twitch strength.

## answer_c
High amplitude contraction

## explanation_c
This genuinely is an effect of warming, so it is not the answer sought -- this follows from the same increase in twitch strength described above.

## answer_d
Long twitch duration

## explanation_d
Correct -- this is the effect that is NOT seen. Warming speeds up both the contraction and relaxation phases of the twitch, so the overall twitch duration SHORTENS, not lengthens. A longer duration is instead what cooling produces, by slowing the same enzymatic and ionic reactions down, which is the opposite temperature effect from the one this option describes.

## topic
Physiology

## subtopic
Muscle twitch

## main_concept
CON-MSK-242998842BE25C

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
8

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
State that warming shortens, rather than lengthens, the duration of a simple muscle twitch, alongside speeding and strengthening it.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 63; printed answer key pp.22-23.

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
QM-ASULOCO-F8B163199B10

## title
What is tetanus, in terms of muscle contraction?

## question
Tetanus is:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares four candidate definitions and must pick the one that correctly names tetanus as sustained maximal contraction from repeated high-frequency stimulation.

## format
single best answer

## derived_from
Printed question 64 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
Treppe increase in amplitude of contractions till reaching maximal

## explanation_a
Incorrect. This describes Treppe (the staircase phenomenon in a rested muscle), a distinct process from tetanus, which is instead a sustained fusion of contractions at high stimulation frequency.

## answer_b
Contractions with incomplete relaxation of the muscle

## explanation_b
Incorrect as the definition of tetanus itself, though it describes incomplete tetanus along the way -- full (complete) tetanus is defined by no relaxation at all between stimuli, a smooth sustained plateau, not merely incomplete relaxation.

## answer_c
Jerky visible contractions in a group of muscle fibers

## explanation_c
Incorrect. This describes fasciculation, the visible, involuntary twitching of a motor unit's fibres seen in denervating disease, not tetanus.

## answer_d
Summation of contractions

## explanation_d
Correct. Tetanus results from the summation of successive twitches when stimuli arrive faster than the muscle can fully relax between them. At a high enough frequency the individual twitches fuse completely into one smooth, sustained maximal contraction, which is the form of contraction the nervous system actually uses for most voluntary movements rather than relying on isolated twitches.

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
Recall/discrimination

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
ART-103-PHY-GRADING-LENGTH-LOAD

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Define tetanus as the summation and fusion of successive twitches under high-frequency stimulation, distinguishing it from Treppe and fasciculation.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 64; printed answer key pp.22-23.

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
QM-ASULOCO-985D5B5F4C7E

## title
What protein forms the contractile portion of the thin filament?

## question
The contractile portion of the thin filament is composed of what protein?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked to name the specific protein of the thin filament that actually interacts with myosin to generate force, as opposed to the regulatory proteins that sit alongside it.

## format
single best answer

## derived_from
Printed question 66 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
Myosin

## explanation_a
Incorrect. Myosin is the thick filament's own protein, not a component of the thin filament.

## answer_b
Tropomyosin

## explanation_b
Incorrect. Tropomyosin is a regulatory protein that covers and uncovers actin's binding site; it does not itself interact with myosin to generate force.

## answer_c
Troponin

## explanation_c
Incorrect. Troponin is the calcium-sensing regulatory complex that controls tropomyosin's position; like tropomyosin, it is regulatory rather than the force-generating component.

## answer_d
Actin

## explanation_d
Correct. Actin is the protein that actually forms the contractile core of the thin filament and binds the myosin head to form cross-bridges. Troponin and tropomyosin are the accessory proteins that regulate when that binding is permitted, sitting alongside actin rather than taking part in the mechanical interaction with myosin themselves.

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
Identify actin as the contractile (force-generating) protein of the thin filament, distinct from the regulatory troponin-tropomyosin complex.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 66; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
35

## randomise_answers
yes

## author_notes
Printed answer key: D.

---

# Item

## id
QM-ASULOCO-2A0F715A591D

## title
Which thin-filament protein binds calcium to initiate contraction?

## question
What is the protein component of the thin filament that binds to calcium thereby initiating skeletal muscle contraction?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student must specifically name the calcium-sensing protein of the thin filament, distinguishing it from actin and tropomyosin, which are also part of the thin filament but do not bind calcium themselves.

## format
single best answer

## derived_from
Printed question 67 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
Myosin

## explanation_a
Incorrect. Myosin belongs to the thick filament, not the thin filament, and it does not bind calcium.

## answer_b
Tropomyosin

## explanation_b
Incorrect. Tropomyosin is a thin-filament protein, but it does not itself bind calcium -- it is moved by troponin's calcium-triggered conformational change rather than sensing calcium directly.

## answer_c
Troponin

## explanation_c
Correct. Troponin, specifically its troponin C subunit, is the calcium-binding component of the thin filament. When calcium binds troponin C, the whole troponin-tropomyosin complex shifts, exposing actin's myosin-binding site and permitting contraction to begin, which is why troponin C is often described as the calcium sensor that switches the whole thin filament from a blocking to a permissive state.

## answer_d
Actin

## explanation_d
Incorrect. Actin is the thin filament's main structural and force-generating protein, but it is not the calcium sensor -- that role belongs specifically to troponin C.

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
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Identify troponin (via its troponin C subunit) as the calcium-binding protein of the thin filament that initiates contraction.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 67; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
35

## randomise_answers
yes

## author_notes
Printed answer key: C.
