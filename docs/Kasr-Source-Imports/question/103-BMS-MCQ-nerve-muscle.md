<!--
  103 BMS · Physiology · Nerve and Muscle — 55 single-best-answer MCQs.

  Source: the Kasr Al Ainy Physiology department question book `Physio MCQ First Year.pdf`,
  manifest src_2093c80b1f9c25f9c0a4, chapter Nerve and Muscle, PDF pages 34-44
  (printed 28-38), printed questions 1-56. Extracted by the 102 INT lane into
  scripts/kasr/extract/103-BMS/mcq-bank.json and tagged as taught by 103 BMS; this lane
  did not re-read the book to extract, only to verify the answer key and repair options.

  THE KEY. Every answer is the book's own printed key on PDF page 44 (printed 38), which
  was opened with the Read tool and read visually. It agrees with the letter the 102 lane
  recorded for all 49 items that carried one, and it supplied the six the bank left null
  (printed 1, 2, 5, 40, 53, 55). No answer here was inferred.

  ONE EXTRACTION DEFECT, CORRECTED. The bank's MCQ-102-2093c80b-p39-q26 is printed
  question 27, not 26: printed 26, "Concerning isometric and isotonic muscle contractions",
  was swallowed into option D of printed 25 and never became an item, so the bank read key
  row 26 against printed 27 and recorded C. The printed key row for 27 is B, which is also
  the physiologically correct option. That item is authored here as printed question 27
  with correct_answer B, and its ID is hashed from the corrected printed number.

  Printed 26 itself is also authored, as its own record. It was recovered by opening PDF
  page 39 with the Read tool, where it is printed in full with four options, and its key is
  key row 26 (c) — which is what made the misalignment provable in the first place, since
  that row matches the swallowed item and not the item the bank attached it to. Its ID is
  minted from its own printed number and its own page. Reconciled: 55 bank items, 56
  records, 0 bank items unauthored, 0 duplicate question IDs.

  PLACEMENT. Nerve and Muscle is a part of Physiology, not the whole subject — every page
  of the department book carries it as a running head — so every module_subject path here
  carries the extra level:

      103 BMS > Physiology > Nerve and Muscle > <division> > <section>

  Each path was checked segment by segment against
  docs/Kasr-Source-Imports/academic/103-BMS-structure.md. The bank's modulePathGuess was no
  help: it is null on all 55 of these items and on all 391 items in the bank.

  EXCLUDED TOPICS. Four items fall on sections the Physiology department excludes from the
  2025-2026 final theoretical exam: printed 14 (Transport through the cell membrane),
  48 (Types of Skeletal Muscle Contraction), 54 (Monophasic and Biphasic Action Potential)
  and 55 (Compound Action Potential). They are authored, because the question book still
  asks them and a student may still meet them, but exam_relevance is 2 and
  exam_weight_by_year is KAU_Y1=0.15 on each, with the exclusion stated in author_notes.
  Nothing here claims they are examined.

  CONCEPTS. Most items point at concepts that already exist — six in the pending 103
  physiology batch and twenty live records taught by ART-NEU-TOP-5A8339CA4A,
  ART-MSK-TOP-17872815ED and ART-MSK-TOP-B54C248DF1. Twelve new concepts were minted for
  the material nothing covered, and they are in
  ../concept/103-BMS-mcq-vitamins-nerve-concepts.md. Live cardiac action-potential records
  (CON-CVS-*) are used nowhere here: a nerve action potential is not a myocyte one, and
  they are recorded as deliberate non-merges on the new concepts.

  Import: Admin > Bulk import > question. status: Draft throughout; these need a faculty
  reviewer.
-->

# Item

## id
QM-103-CF215CAC67F8

## title
Which statement concerning the nerve action potential is correct?

## question
Which statement concerning the nerve action potential is correct?

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked to check four statements about the phases of the nerve action potential.

## format
single best answer

## derived_from
Question 1 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p34-q1 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
The firing level is the level at which the slow depolarisation begins

## explanation_a
It inverts the definition. Slow depolarisation is the first 25 mV, running from −90 mV up to the firing level; the firing level, at −65 mV, is where slow depolarisation ends and rapid depolarisation begins. A student who reads "firing level" as "where the response starts" rather than "where it becomes all-or-none" picks this.

## answer_b
The rapid repolarisation represents 30% of the repolarisation process

## explanation_b
The two percentages are swapped. The rapid phase is the first 70 per cent of repolarisation and the slow phase the remaining 30 per cent. The numbers are worth memorising in the right order precisely because a swapped pair is the easiest distractor to write.

## answer_c
During hyperpolarisation the membrane is more negative due to slow closure of K+ channels

## explanation_c
After repolarisation reaches the resting level the membrane potential overshoots slightly in the hyperpolarising direction, becoming more negative than the resting membrane potential, and this is caused by the slow closure of the voltage-gated potassium channels: potassium keeps leaving after it should have stopped. Leak potassium channels then drive potassium inwards and the membrane returns to the resting level. The spike itself lasts about 2 msec while this hyperpolarisation lasts 35 to 40 msec, so most of the action potential’s duration is its tail.

## answer_d
The absolute refractory period is the period from the firing level until repolarisation is completed

## explanation_d
The absolute refractory period runs from the firing level to the early part of repolarisation, not until repolarisation is complete. What continues to the end of repolarisation is the relative refractory period, which begins where the absolute one ends and terminates when the membrane potential returns to its resting level.

## topic
Neurophysiology

## subtopic
Ionic basis of action potential

## main_concept
CON-NEU-DD9033DCA3AAF1

## concept_ids
CON-NEU-2235199E9F4373

## contextual_concept_ids


## difficulty
Challenging

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.75

## setting
Academic

## reasoning_level
4

## inferred_difficulty
38

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Ionic basis of action potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Identify the cause of the hyperpolarising after-potential and give the correct proportions and boundaries of the repolarisation phases and refractory periods.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 34 (printed page 28), printed question 1; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
75

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p34-q1 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "none".
The bank carried correct: null for this item. The printed answer key on PDF page 44 (printed page 38) was opened with the Read tool and read visually; it names this letter. The answer was not inferred.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-8499A47AD2B3

## title
Which statement about the local response is correct?

## question
Which statement about the local response is correct?

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A nerve is stimulated repeatedly with stimuli below threshold, and a small, non-propagated change in membrane potential is recorded.

## format
single best answer

## derived_from
Question 2 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p34-q2 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
It is characterised by decreased excitability

## explanation_a
The direction is reversed. During the local response nerve excitability is increased, because the membrane potential has moved towards the firing level and less additional depolarisation is now needed. Decreased excitability belongs to the refractory periods, which the local response does not have.

## answer_b
It jumps from one node of Ranvier to the next

## explanation_b
Jumping from node to node is saltatory conduction of a full action potential in a myelinated fibre. The local response is non-propagated: its magnitude is too small to generate another local response nearby and it fades within 1 to 2 mm.

## answer_c
It obeys the all-or-none law

## explanation_c
It is the definitional error. The local response does not obey the all-or-none law; it is graded, so its magnitude and duration vary with the size and strength of the stimulus. Only the action potential is all-or-none.

## answer_d
It can be summated

## explanation_d
The local excitatory state is a local partial depolarisation produced by a subthreshold stimulus, when some sodium activation gates open and sodium entry depolarises the membrane without reaching the firing level. It can be summated by rapid repeated subthreshold stimuli until the firing level is reached and an action potential is generated. Its five characters run together: it does not obey the all-or-none law, it is non-propagated, it is graded, it has no refractory period, and excitability is increased during it. Summation is possible precisely because there is no refractory period to prevent a second stimulus from adding to the first.

## topic
Neurophysiology

## subtopic
Local excitatory state (Local Response)

## main_concept
CON-NEU-7E784A50D2BBAF

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

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
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Local excitatory state (Local Response)

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
List the characters of the local response and explain why the absence of a refractory period is what allows summation.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 34 (printed page 28), printed question 2; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p34-q2 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b) read differently by different OCR passes (a/d)".
The bank carried correct: null for this item. The printed answer key on PDF page 44 (printed page 38) was opened with the Read tool and read visually; it names this letter. The answer was not inferred.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-C156AFC38BD2

## title
Which statement about neuromuscular transmission is correct?

## question
Which statement about neuromuscular transmission is correct?

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A nerve impulse arrives at a motor nerve ending and the events at the motor end plate are traced in order.

## format
single best answer

## derived_from
Question 3 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p34-q3 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Binding of transmitter to its receptors leads to decreased permeability of the postsynaptic membrane to anions

## explanation_a
The acetylcholine receptor is a ligand-gated channel that opens to small cations, not one that closes to anions. Decreased anion permeability is a description imported from inhibitory synapses, where chloride matters, and it does not describe the excitatory end plate.

## answer_b
The effect of acetylcholine is maintained by the action of acetylcholine esterase

## explanation_b
The verb is the error. Acetylcholinesterase, bound to the basal lamina in the synaptic cleft, hydrolyses acetylcholine and therefore terminates its effect; degradation is necessary to prevent it causing multiple muscle contractions. A student who knows the enzyme is present but not what it does to the transmitter picks this.

## answer_c
Acetylcholine activates presynaptic K+ channels after its release

## explanation_c
What the arriving impulse opens presynaptically are voltage-gated calcium channels, and the calcium entry is what ruptures the vesicles and causes exocytosis of acetylcholine. Substituting potassium for calcium here removes the trigger for release altogether.

## answer_d
Binding of transmitter to its receptors increases permeability of the membrane to both Na+ and K+

## explanation_d
Acetylcholine crosses the cleft and binds its receptor on the motor end plate, which is a ligand-gated channel; the channel opens, sodium flows in, and the end plate depolarises. This is the end-plate potential, a graded, non-propagated response which acts as a stimulus and depolarises the adjacent muscle membrane to its firing level; action potentials are then generated on either side of the end plate and propagate in both directions along the fibre, and the muscle action potential initiates contraction. The channel is a cation channel, so it is permeable to both sodium and potassium, and the net inward sodium current is what produces the depolarisation.

## topic
Neurophysiology

## subtopic
Sequence of events during neuromuscular transmission

## main_concept
CON-MSK-77D955AAB4D0FA

## concept_ids


## contextual_concept_ids


## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
3

## inferred_difficulty
50

## exam_relevance
9

## clinical_relevance
0.7

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Sequence of Events during Neuromuscular Transmission

## question_only_for


## library_ids
ART-103-PHY-NEUROMUSCULAR-TRANSMISSION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Put the events of neuromuscular transmission in order and state which ion channel opens at each step.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 34 (printed page 28), printed question 3; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p34-q3 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-15748A433A91

## title
Which statement regarding excitation–contraction coupling in skeletal muscle is correct?

## question
Which statement regarding excitation–contraction coupling in skeletal muscle is correct?

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked to check four statements about what happens between the muscle action potential and the development of tension.

## format
single best answer

## derived_from
Question 4 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p34-q4 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Ca2+ binds to tropomyosin causing troponin to uncover myosin binding sites on actin

## explanation_a
The two proteins are swapped. Calcium binds troponin C, which has a strong affinity for calcium; troponin then changes conformation and tropomyosin moves away from the myosin-binding site on actin. Troponin is the calcium sensor and tropomyosin is the cover — reverse them and the mechanism cannot be described.

## answer_b
The calcium pump of the sarcoplasmic reticulum pumps Ca2+ back to the cytoplasm

## explanation_b
The direction is reversed. The calcium pump on the sarcoplasmic reticulum membrane removes calcium from the cytoplasm back into the reticulum, and that is what ends contraction: troponin returns to its original conformation, tropomyosin re-covers the binding site and cross-bridge cycling stops.

## answer_c
Detachment of the cross-bridge from the thin filament is a passive process

## explanation_c
This is the most expensive misconception in muscle physiology. Detachment is not passive: ADP and inorganic phosphate must leave the cross-bridge and a new molecule of ATP must take their place, and it is that new ATP which reduces the affinity of the cross-bridge for the active site. If no ATP is available the thick and thin filaments cannot be separated, which is muscle contracture, and is why rigor mortis follows the loss of ATP after death.

## answer_d
Both ATP and its hydrolysing enzyme ATPase are attached to the cross-bridge

## explanation_d
The myosin head is the cross-bridge, and it carries three sites: an actin-binding site, an ATP-binding site and an ATPase site. So both the fuel and the enzyme that hydrolyses it sit on the head itself. The cycle then runs in four steps: actin and myosin bind spontaneously once calcium has bound troponin C and tropomyosin has moved; the cross-bridge bends and slides the actin filament, the energy coming from hydrolysis of ATP by that ATPase into ADP and phosphate; the cross-bridge detaches when a new ATP replaces the products; and the head returns upright for another cycle. Cycling continues as long as calcium is on troponin C and ATP is available.

## topic
Neurophysiology

## subtopic
Excitation–contraction coupling

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids
CON-MSK-AC42FE7AB41DF2

## contextual_concept_ids


## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.65

## setting
Academic

## reasoning_level
3

## inferred_difficulty
47

## exam_relevance
9

## clinical_relevance
0.6

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Changes Following Skeletal Muscle Stimulation

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Describe excitation–contraction coupling from T-tubule to cross-bridge, and state why detachment requires a fresh ATP.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 34 (printed page 28), printed question 4; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
80

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p34-q4 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-24DEA17BBD67

## title
Which statement about the absolute refractory period is correct?

## question
Which statement about the absolute refractory period is correct?

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A nerve is stimulated a second time at increasing strengths during the ascending limb of its spike, and no second action potential can be produced at any strength.

## format
single best answer

## derived_from
Question 5 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p35-q5 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
It lasts throughout the action potential

## explanation_a
It runs from the firing level to the early part of repolarisation only. The rest of the action potential is the relative refractory period, and treating the whole spike as absolutely refractory makes it impossible to explain how a strong stimulus can fire a second impulse late in repolarisation.

## answer_b
It is associated with normal or increased nerve excitability

## explanation_b
It is the opposite of the definition. Excitability is increased only during the initial depolarisation up to the firing level; from there on the neurone is refractory, and during the absolute refractory period no stimulus of any strength will work.

## answer_c
It corresponds to the time of opening of Na+ activation gates

## explanation_c
It is the trap the question is built around. Opening of the activation gates is what produces depolarisation, not what prevents a second response. The channel has two gates and they are shut in different ways: the activation gate is closed at rest and opens on depolarisation; the inactivation gate is open at rest and closes shortly after.

## answer_d
It corresponds to the time of closure of Na+ inactivation gates

## explanation_d
During the absolute refractory period all the voltage-gated sodium channels have opened and then been rapidly inactivated by the inner gate, and an inactivated channel must return to the resting state before it can open again. No increase in stimulus strength substitutes for that recovery, which is exactly why the period is absolute. Refractoriness is useful rather than a defect: it protects the nerve from extremely rapid repetitive stimulation and ensures one-way forward propagation of the impulse.

## topic
Neurophysiology

## subtopic
There are two refractory periods

## main_concept
CON-NEU-2235199E9F4373

## concept_ids
CON-NEU-157E05FAF3B100

## contextual_concept_ids


## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
3

## inferred_difficulty
50

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > There are two refractory periods

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Attribute the absolute refractory period to sodium channel inactivation and distinguish the inactivation gate from the activation gate.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 35 (printed page 29), printed question 5; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p35-q5 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b) read differently by different OCR passes (c/d)".
The bank carried correct: null for this item. The printed answer key on PDF page 44 (printed page 38) was opened with the Read tool and read visually; it names this letter. The answer was not inferred.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-0341AFD987DF

## title
Which statement concerning action potentials is correct?

## question
Which statement concerning action potentials is correct?

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked to check four statements about the ionic basis and the propagation of the nerve action potential.

## format
single best answer

## derived_from
Question 6 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p35-q6 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Repolarisation is caused by efflux of K+

## explanation_a
Repolarisation has two components acting together. Inactivation of the sodium channels stops the sodium influx and terminates depolarisation; and the potassium channels, which open shortly after the sodium ones, more slowly and for longer, carry potassium out of the fibre and complete the return to the resting level. Their slow closure then overshoots into hyperpolarisation. Nothing is pumped during any of this — the Na+–K+ pump re-establishes the concentration gradients afterwards.

## answer_b
Propagation is in one direction only and requires a direct source of ATP

## explanation_b
Both halves are mistaken here, which is what makes it instructive. An axon can conduct in either direction: an impulse started in the middle sets up two impulses travelling in opposite directions, and one-way traffic in the living animal is imposed by the synapses, not by the axon, since antidromic impulses die at the first synapse they meet. And propagation itself is passive local-circuit current flow, not an ATP-driven process; the ATP is spent afterwards, restoring the gradients.

## answer_c
Depolarisation is caused by efflux of Na+

## explanation_c
The direction is reversed. Sodium enters the fibre during depolarisation, down its electro-concentration gradient, and that influx is regenerative — the more sodium enters, the more channels open. Efflux is what potassium does during repolarisation.

## answer_d
Transmission occurs at the same speed in small and large neurones

## explanation_d
The speed of propagation is proportional to the square root of the fibre diameter, and myelination adds saltatory conduction on top of that, increasing velocity up to fifty-fold. The nerve fibre types are classified by exactly this: A fibres, 2 to 20 µ, conduct at 20 to 120 m/sec; B fibres, 1 to 5 µ, at 5 to 15 m/sec; C fibres, under 1 µ, at 0.5 to 2 m/sec.

## topic
Neurophysiology

## subtopic
Ionic basis of action potential

## main_concept
CON-NEU-DD9033DCA3AAF1

## concept_ids
CON-NEU-A0C8307D2825A6

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Ionic basis of action potential
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Conduction [Propagation] of the Action Potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
State which ion moves in which direction at each phase, and give the two determinants of conduction velocity.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 35 (printed page 29), printed question 6; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p35-q6 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-1B6EBF84B44D

## title
The functional and structural unit of a nerve is a:

## question
The functional and structural unit of a nerve is a:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked to name the cell that is both the structural building block of the nervous system and the unit in which excitation actually happens.

## format
single best answer

## derived_from
Question 7 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p35-q7 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Nephron

## explanation_a
The nephron is the structural and functional unit of the kidney. It is offered because the phrase "structural and functional unit" is used identically in several systems, and a student answering by phrase rather than by organ can pick the wrong one.

## answer_b
Receptor

## explanation_b
A receptor is where a stimulus is transduced, and it is a part of a sensory neurone or a specialised cell attached to one, not the unit of the nerve itself.

## answer_c
Neuron

## explanation_c
The neuron is the structural and functional unit of the nervous system, and it is one of the two most excitable cell types in the body, the other being the muscle cell. Its axon may be myelinated, wrapped by a myelin sheath secreted by Schwann cells, or non-myelinated, simply surrounded by Schwann cells with no sheath formed. Everything else in this chapter — the resting potential, the action potential, conduction — is a property of this one cell.

## answer_d
Myofibril

## explanation_d
The myofibril is a contractile element inside a muscle fibre, and the equivalent unit in muscle physiology is the sarcomere or the muscle fibre. This option belongs to the second half of the same chapter, which is why it is offered here.

## topic
Neurophysiology

## subtopic
The neuron

## main_concept
CON-NEU-5664D7AB68AD8D

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
88

## exam_relevance
6

## clinical_relevance
0.4

## academic_relevance
0.7

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > The Neuron

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Name the neuron as the structural and functional unit of the nervous system.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 35 (printed page 29), printed question 7; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
30

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p35-q7 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the stem was extracted as "Tne functional and structural unit". Read as "The functional and structural unit"; the same T-for-Tn substitution recurs through this book.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-57D84E279B2F

## title
The myelinated nerve fibre has an outer layer of:

## question
The myelinated nerve fibre has an outer layer of:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked which cell produces the insulating wrapping of a peripheral myelinated axon.

## format
single best answer

## derived_from
Question 8 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p35-q8 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Nerve cells

## explanation_a
The nerve cell supplies the axon that is wrapped, not the wrapping. Keeping the axon and its sheath as products of two different cells is what makes the difference between a myelinated and a non-myelinated fibre intelligible.

## answer_b
Schwann cells

## explanation_b
In a myelinated nerve fibre the axon is surrounded by a myelin sheath secreted by Schwann cells, and the sheath is an excellent insulator that decreases ion flow across the membrane. It is interrupted at the nodes of Ranvier, where ions can move across the membrane with little resistance and where the voltage-gated sodium channels are concentrated. In a non-myelinated fibre the axon is simply surrounded by Schwann cells with no sheath formed — so Schwann cells are present in both, and it is the myelin they do or do not make that separates the two.

## answer_c
Plasma cells

## explanation_c
Plasma cells are antibody-secreting cells of the immune system. They are offered as a plausible-sounding secretory cell for a student matching on the word "secreted".

## answer_d
Epithelial cells

## explanation_d
Epithelial cells line surfaces and have no role in the peripheral nerve sheath. This option catches a student who pictures the sheath as a covering membrane rather than as the product of one cell wrapped repeatedly around the axon.

## topic
Neurophysiology

## subtopic
Types of nerve fibres regarding myelination

## main_concept
CON-NEU-5664D7AB68AD8D

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Anatomy

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
82

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Types of nerve fibers regarding myelination

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Name the Schwann cell as the source of peripheral myelin and state what distinguishes a myelinated from a non-myelinated fibre.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 35 (printed page 29), printed question 8; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
35

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p35-q8 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-138D81297286

## title
The myelin sheath of the nerve:

## question
The myelin sheath of the nerve:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked what the myelin sheath does electrically, given that conduction in a myelinated fibre is far faster than in an unmyelinated one of the same diameter.

## format
single best answer

## derived_from
Question 9 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p35-q9 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Allows fast ionic movement

## explanation_a
It confuses the result with the mechanism. What is fast in a myelinated fibre is the impulse, not the ions: the sheath decreases ion flow across the membrane, and it is precisely by preventing ionic movement along the internode that it makes the impulse quick.

## answer_b
Prevents ionic escape

## explanation_b
The myelin sheath is an excellent insulator that decreases ion flow across the membrane. Because current cannot leak out along the internode, the local circuit set up by an active node reaches the next node still strong enough to depolarise it to threshold, so action potentials are generated only at the nodes and the signal jumps from node to node. This also conserves energy: little sodium enters and little potassium leaves, so the Na+–K+ pump has less to restore.

## answer_c
Behaves as a good conductor

## explanation_c
It is the exact inversion. Myelin is an insulator, not a conductor. A student who reasons "conduction is faster, so the sheath must conduct better" arrives here, and the reasoning is backwards — the sheath speeds conduction by refusing to conduct across the membrane.

## answer_d
Contains nodes of Ranvier in between, which prevent the flow of ions

## explanation_d
It reverses the role of the nodes. The nodes are the gaps where the membrane is exposed to extracellular fluid, carries numerous voltage-gated sodium channels, and ions move with little resistance. They are where ion flow is permitted, not prevented.

## topic
Neurophysiology

## subtopic
Types of nerve fibres regarding myelination

## main_concept
CON-NEU-5664D7AB68AD8D

## concept_ids
CON-NEU-A0C8307D2825A6

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
64

## exam_relevance
8

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Types of nerve fibers regarding myelination

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Explain how insulation of the internode and exposure at the nodes together produce fast, economical conduction.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 35 (printed page 29), printed question 9; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p35-q9 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-44D17D8FE4AB

## title
The chronaxie:

## question
The chronaxie:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A strength–duration curve is plotted for two nerves, and their chronaxies are compared.

## format
single best answer

## derived_from
Question 10 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p35-q10 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Is the threshold stimulus

## explanation_a
The threshold stimulus is the rheobase — the minimum intensity needed to excite the nerve. Chronaxie is a time, not an intensity, and confusing the two axes of the strength–duration curve is what this option catches.

## answer_b
Is twice the rheobase

## explanation_b
It is the commonest slip on this topic. Chronaxie is not twice the rheobase; it is the time needed by a current of twice the rheobase to produce a response. The factor of two applies to the strength of the test current, and what is measured is its duration.

## answer_c
Can be used as a measure of excitability

## explanation_c
Chronaxie is used as an index of excitability: because it is measured at a fixed multiple of each nerve’s own rheobase, it compares nerves fairly and a shorter chronaxie means a more excitable fibre. It sits on the strength–duration curve, which shows the inverse relationship between stimulus intensity and the duration for which it must be applied — within limits the stronger the stimulus the shorter the duration needed, extremely brief stimuli cannot excite however intense they are, and subthreshold intensities produce only a local response.

## answer_d
Is the time needed to excite a nerve by a current strength equal to the rheobase

## explanation_d
This describes the utilisation time, which is the time needed for the rheobase itself to give a response. Utilisation time and chronaxie are two adjacent definitions on the same curve, differing only in whether the current is one or two times rheobase, and swapping them is the error this option is written for.

## topic
Neurophysiology

## subtopic
The strength-duration curve

## main_concept
CON-NEU-105A7842809DC1

## concept_ids
CON-NEU-9A0B222F3474E4

## contextual_concept_ids


## difficulty
Moderate

## question_type
Investigation

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
8

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > The Strength-Duration Curve

## question_only_for


## library_ids
ART-NEU-TOP-5A8339CA4A

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Define chronaxie against rheobase and utilisation time, and say why it is used as an index of excitability.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 35 (printed page 29), printed question 10; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p35-q10 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-164D6E0523E4

## title
Acetylcholinesterase:

## question
Acetylcholinesterase:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A patient is given neostigmine, which inactivates this enzyme, and acetylcholine accumulates at the junction.

## format
single best answer

## derived_from
Question 11 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p36-q11 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Produces acetylcholine

## explanation_a
The suffix gives the answer away once it is noticed: an esterase hydrolyses an ester, it does not synthesise one. Acetylcholine is made in the nerve ending and packaged into vesicles; the enzyme in the cleft destroys it.

## answer_b
Is the acetylcholine receptor in muscle tissue

## explanation_b
The receptor is a separate molecule, a ligand-gated ion channel on the motor end plate, and the enzyme is bound to the basal lamina in the synaptic cleft. Keeping them apart matters clinically: myasthenia gravis attacks the receptor, while neostigmine acts on the enzyme, and the treatment works because the two are different targets.

## answer_c
Is responsible for smooth but not skeletal muscle contraction

## explanation_c
Acetylcholinesterase acts wherever acetylcholine is released, and the neuromuscular junction of skeletal muscle is its classic site. This option catches a student who associates acetylcholine only with autonomic, smooth-muscle innervation.

## answer_d
Degrades the neurotransmitter which is found in the neuromuscular junction

## explanation_d
Acetylcholinesterase is bound to the basal lamina in the synaptic cleft, and it hydrolyses acetylcholine once the transmitter has dissociated from its receptor. That degradation is necessary: without it, acetylcholine would remain and cause multiple muscle contractions from a single nerve impulse. This is why drugs that inactivate cholinesterase — neostigmine, physostigmine, di-isopropyl fluorophosphate — allow extreme amounts of acetylcholine to accumulate and repetitively stimulate the fibre, and why neostigmine is used to treat myasthenia gravis.

## topic
Neurophysiology

## subtopic
Sequence of events during neuromuscular transmission

## main_concept
CON-MSK-77D955AAB4D0FA

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
78

## exam_relevance
8

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Sequence of Events during Neuromuscular Transmission

## question_only_for


## library_ids
ART-103-PHY-NEUROMUSCULAR-TRANSMISSION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
State that acetylcholinesterase terminates transmitter action in the cleft, and explain why anticholinesterases prolong it.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 36 (printed page 30), printed question 11; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p36-q11 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-CA9AF0853F73

## title
The resting membrane potential of a cell:

## question
The resting membrane potential of a cell:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked why the inside of a resting nerve fibre is about 90 mV negative to the outside.

## format
single best answer

## derived_from
Question 12 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p36-q12 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Is dependent on the permeability of the cell membrane to K+ being greater than to Na+

## explanation_a
Diffusion is the main factor determining the resting membrane potential. Potassium is the main intracellular cation and sodium the main extracellular one, and both leak through non-gated channels down their concentration gradients — but the resting membrane is about 100 times more permeable to potassium than to sodium, because there are far more potassium leak channels. Potassium outflow therefore greatly exceeds sodium inflow, the impermeant intracellular protein anions are left behind on the inner surface, and a potential difference is created with the inside negative. The Goldman equation, which weights each ion by its permeability as well as its concentration, predicts about −86 mV from selective permeability alone, roughly 95 per cent of the resting potential.

## answer_b
Falls to zero if Na+/K+ ATPase in the membrane is inhibited

## explanation_b
The pump is electrogenic and contributes only about −4 mV directly, and only a prolonged blockade would affect the resting potential and the genesis of the action potential, by running the concentration gradients down. An immediate collapse to zero would require the gradients themselves to disappear at once, which they do not.

## answer_c
Is equal to the equilibrium potential for K+

## explanation_c
It is the most instructive wrong answer. If potassium were the only ion moving, the membrane potential would be the potassium equilibrium potential, −94 mV by the Nernst equation. The measured resting potential is about −90 mV — close to it, because permeability to potassium dominates, but not equal to it, because sodium also leaks in and the pump contributes.

## answer_d
Is equal to the equilibrium potential of Na+

## explanation_d
It is far off in the other direction. The sodium equilibrium potential is about +61 mV. The membrane approaches it only at the peak of the action potential, when sodium permeability briefly dominates — which is why the overshoot reaches +35 mV.

## topic
Neurophysiology

## subtopic
Causes of resting membrane potential: ionic basis

## main_concept
CON-NEU-763D2F7A1571C9

## concept_ids
CON-NEU-A370E390388CA5 | CON-NEU-EE995C43B2751E

## contextual_concept_ids


## difficulty
Challenging

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.75

## setting
Academic

## reasoning_level
4

## inferred_difficulty
38

## exam_relevance
10

## clinical_relevance
0.6

## academic_relevance
1

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Causes of Resting Membrane Potential: ionic basis of RMP
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Relative Contributions of Ion Fluxes & Na+-K+ Pump to RMP

## question_only_for


## library_ids
ART-NEU-TOP-5A8339CA4A

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Explain the resting membrane potential from selective permeability, and say why it is near but not equal to the potassium equilibrium potential.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 36 (printed page 30), printed question 12; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
80

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p36-q12 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-E6EB6F6FB312

## title
The absolute refractory period:

## question
The absolute refractory period:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked what makes a nerve completely inexcitable during the ascending limb of its spike.

## format
single best answer

## derived_from
Question 13 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p36-q13 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Is due to hyperpolarisation

## explanation_a
Hyperpolarisation comes after repolarisation is complete and is caused by slow closure of the potassium channels; the absolute refractory period is long over by then. Both make the fibre harder to excite, which is why they are confused, but they occupy different parts of the trace and have different causes.

## answer_b
Refers to a normal or increased excitability state

## explanation_b
Excitability is increased only during the initial depolarisation up to the firing level. Once the firing level is passed the neurone is refractory, and during the absolute refractory period no stimulus of any strength will produce a second action potential.

## answer_c
Is due to inactivation of Na+ channels

## explanation_c
All the voltage-gated sodium channels open at the firing level and are then rapidly inactivated by the inner gate, and an inactivated channel must return to the resting state before it can open again. Since a stronger stimulus cannot force a channel out of inactivation, the period is absolute rather than relative. Contrast the relative refractory period, which has two causes: some sodium channels have returned to the resting state and are available, while the potassium channels opened during repolarisation are still carrying potassium outwards and opposing the sodium coming in.

## answer_d
Is equal in skeletal and cardiac muscles

## explanation_d
Cardiac muscle has a much longer refractory period than skeletal muscle, because its action potential carries a prolonged plateau; that is why cardiac muscle cannot be tetanised and skeletal muscle can. Assuming that a mechanism shared by two tissues gives the same numbers in both is the error here.

## topic
Neurophysiology

## subtopic
There are two refractory periods

## main_concept
CON-NEU-2235199E9F4373

## concept_ids
CON-NEU-157E05FAF3B100

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
66

## exam_relevance
9

## clinical_relevance
0.6

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > There are two refractory periods

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Attribute the absolute refractory period to sodium channel inactivation and contrast its duration with cardiac muscle.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 36 (printed page 30), printed question 13; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p36-q13 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
Option D touches cardiac muscle, and live state holds many CON-CVS action-potential records. None is named here: a cardiac action potential is a different record from a nerve one, and the distractor is answered from the nerve side. The cardiac records are recorded as deliberate non-merges on CON-NEU-DD9033DCA3AAF1 in the concept file rather than being cross-tagged onto this question.

---

# Item

## id
QM-103-3C56BB78CBBA

## title
Concerning the sodium pump, it:

## question
Concerning the sodium pump, it:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked how the Na+–K+ pump differs from the passive routes across the same membrane.

## format
single best answer

## derived_from
Question 14 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p36-q14 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Requires a high energy phosphate bond

## explanation_a
The Na+–K+ pump is the best example of primary active transport: its activity is energy dependent and the energy comes from ATP. The pump has two subunits — the α subunit carries the ATP-binding site, two potassium sites on the outer aspect and three sodium sites on the inner, and the β subunit has the ATPase activity that splits ATP into ADP, phosphate and energy. It moves three sodium out for every two potassium in, so more positive charge leaves than enters and the pump is electrogenic, contributing about −4 mV to the resting membrane potential and re-establishing the gradients after each action potential.

## answer_b
Is the pumping of Na+ from outside to inside the cell

## explanation_b
The direction is reversed. The pump transports sodium out of the cell and potassium in, which is what maintains the low intracellular sodium and high intracellular potassium that every other part of this chapter depends on.

## answer_c
Is an example of facilitated diffusion

## explanation_c
This is the classification error the question exists to catch. Facilitated diffusion is passive, moves substances down their concentration gradient and needs no ATP; it is how glucose and amino acids cross. The pump moves both ions against their gradients and consumes ATP, which is the definition of active transport.

## answer_d
Is independent of K+ influx

## explanation_d
The two movements are coupled in the same cycle — three sodium out for two potassium in — so the pump cannot be independent of potassium influx. The fixed 3:2 stoichiometry is exactly what makes it electrogenic.

## topic
Neurophysiology

## subtopic
Active transport

## main_concept
CON-NEU-1E66BE533E894C

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
74

## exam_relevance
2

## clinical_relevance
0.5

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.15

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Transport through the cell membrane > Active transport

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Classify the Na+-K+ pump as primary active transport, give its 3:2 stoichiometry, and say why it is electrogenic.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 36 (printed page 30), printed question 14; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p36-q14 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
Excluded topic: the Physiology department excludes this section from the 2025-2026 final theoretical exam by its own announcement. The question book still asks it and a student may still meet it, so it is authored — but exam_relevance and exam_weight_by_year are set low deliberately and must not be read as evidence that it is examined.

---

# Item

## id
QM-103-4C8B2D57C766

## title
The local response in a single nerve fibre:

## question
The local response in a single nerve fibre:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
Subthreshold stimuli are applied to a nerve fibre in rapid succession and the membrane potential is watched as it creeps towards −65 mV.

## format
single best answer

## derived_from
Question 15 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p36-q15 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Is produced by a cathodal current of threshold intensity

## explanation_a
A local response is produced by a subthreshold stimulus, one below the rheobase. A stimulus of threshold intensity produces an action potential, not a local response, and the word "threshold" is the error.

## answer_b
Is associated with increased K+ permeability

## explanation_b
The ionic event is that some sodium activation gates open and sodium enters, giving a partial depolarisation; repolarisation then follows rapidly. Increased potassium permeability would hyperpolarise the membrane and move it away from the firing level, which is the opposite of what a local response does.

## answer_c
Is not dependent on the intensity of the stimulus

## explanation_c
It contradicts one of the five characters of the response. The local response is graded: its magnitude and duration vary with the size and strength of the stimulus. Independence from stimulus intensity is the property of the action potential, which obeys the all-or-none law.

## answer_d
Can produce an action potential if the membrane potential reaches −65 mV

## explanation_d
The local response can be summated by rapid repeated subthreshold stimuli, and when summation carries the membrane potential to the firing level of −65 mV an action potential is generated. This is the bridge between the two kinds of response in this chapter: a subthreshold stimulus gives a graded, non-propagated, non-refractory local change, and enough of them arriving quickly enough produce the all-or-none event. It is also why excitability is increased during a local response — the membrane is already partway to the firing level.

## topic
Neurophysiology

## subtopic
Local excitatory state (Local Response)

## main_concept
CON-NEU-7E784A50D2BBAF

## concept_ids
CON-NEU-7A30FECF042995

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
60

## exam_relevance
8

## clinical_relevance
0.45

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Local excitatory state (Local Response)

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Explain how summated local responses reach the firing level, and give the ionic basis of the local response.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 36 (printed page 30), printed question 15; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p36-q15 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-F769C7C1C03F

## title
Which statement concerning the nerve resting membrane potential is correct?

## question
Which statement concerning the nerve resting membrane potential is correct?

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked to check four statements about the distribution of sodium and potassium across a resting nerve membrane.

## format
single best answer

## derived_from
Question 16 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p37-q16 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
The extracellular sodium concentration is less than its intracellular concentration

## explanation_a
It inverts the gradient. Sodium is the main extracellular cation: sodium sits at 14 inside and 140 outside, a ratio of 0.1. It is potassium that is higher inside, 140 against 4, a ratio of 35.

## answer_b
The concentration gradient for potassium tends to move potassium out of the cell

## explanation_b
Potassium is the main intracellular cation, so its concentration gradient drives it outwards through the non-gated leak channels, while sodium’s drives it inwards. Because the resting membrane is about 100 times more permeable to potassium than to sodium, potassium outflow greatly exceeds sodium inflow, and with the impermeant protein anions trapped inside, the interior is left negative. Each ion tends towards its own equilibrium potential, the point at which its influx equals its efflux.

## answer_c
If the resting potential is moved to a more negative value, the cell becomes more excitable

## explanation_c
The direction is reversed. Making the resting potential more negative is hyperpolarisation, which moves the membrane further from the firing level and therefore decreases excitability — which is what a fall in extracellular potassium does. Depolarising the membrane, as hyperkalaemia does, increases excitability.

## answer_d
The sodium pump moves sodium in and potassium out of the cell

## explanation_d
This is the same reversal as in the sodium pump question. The pump moves three sodium out and two potassium in. Since sodium is being pumped against a gradient that drives it inwards, moving it inwards would need no pump at all.

## topic
Neurophysiology

## subtopic
Causes of resting membrane potential: ionic basis

## main_concept
CON-NEU-FE158971E5522D

## concept_ids
CON-NEU-BA127208F5318E | CON-NEU-D8701340C2EAA0

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
62

## exam_relevance
9

## clinical_relevance
0.55

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Causes of Resting Membrane Potential: ionic basis of RMP

## question_only_for


## library_ids
ART-NEU-TOP-5A8339CA4A

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
State the direction of the sodium and potassium gradients at rest and predict how a change in resting potential changes excitability.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 37 (printed page 31), printed question 16; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p37-q16 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-B989E6B3403B

## title
The firing level of a stimulated nerve fibre:

## question
The firing level of a stimulated nerve fibre:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A nerve fibre is depolarised progressively from its resting −90 mV, and the point at which the response becomes explosive is identified.

## format
single best answer

## derived_from
Question 17 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p37-q17 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Is reached at a membrane potential of −65 mV

## explanation_a
Slow depolarisation carries the membrane from −90 mV to −65 mV, the first 25 mV, and −65 mV is the firing level or threshold. At that point all the voltage-gated sodium channels open and rapid depolarisation follows — the ascending limb of the spike — carrying the potential to zero and then reversing to an overshoot of +35 mV, so the amplitude of the action potential is 125 mV. An action potential will not occur until depolarisation reaches the firing level, which is what makes the process all-or-none rather than graded.

## answer_b
Is reached at the end of the spike

## explanation_b
The firing level is where the spike begins, not where it ends. What happens at the end of the spike is the return of the membrane potential towards rest and the start of the hyperpolarising after-potential.

## answer_c
Is the membrane potential when the membrane permeability to K+ ions is increased

## explanation_c
Increased potassium permeability belongs to repolarisation, which happens after the peak. At the firing level the event is sodium: the activation gates all open at once.

## answer_d
Is the time when repolarisation starts

## explanation_d
Two things are off here. The firing level is a membrane potential, not a time, and repolarisation begins after the overshoot, not at the firing level. This option catches a student who has learned the sequence of events but not which axis each landmark sits on.

## topic
Neurophysiology

## subtopic
Ionic basis of action potential

## main_concept
CON-NEU-7A30FECF042995

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Ionic basis of action potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Give the firing level as −65 mV and state what happens to the sodium channels at that potential.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 37 (printed page 31), printed question 17; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p37-q17 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-6464B45502AA

## title
The relative refractory period:

## question
The relative refractory period:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
Late in repolarisation a second stimulus is applied. A threshold stimulus fails; a stronger one succeeds.

## format
single best answer

## derived_from
Question 18 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p37-q18 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Occurs during depolarisation

## explanation_a
Depolarisation up to the firing level is the one part of the action potential where excitability is increased; from the firing level to the early part of repolarisation the fibre is absolutely refractory. The relative refractory period begins where that ends and runs until the membrane potential is back at rest.

## answer_b
Is characterised by the inability of any stimulus to generate an action potential

## explanation_b
This is the definition of the absolute refractory period, not the relative one. During the relative period an action potential can be produced — by a stimulus stronger than threshold. Swapping the two definitions is the commonest error in this topic.

## answer_c
Is due to inactivation of all voltage-gated Na+ channels

## explanation_c
The word "all" is what makes it wrong. When all the sodium channels are inactivated, no stimulus of any strength works and the period is absolute. The relative period exists because some channels have already returned to the resting state and are available for activation.

## answer_d
Is due to inactivation of some voltage-gated Na+ channels, while voltage-gated K+ channels are wide open

## explanation_d
Note that it gives both causes. Some sodium channels have recovered to the resting state, so a response is possible; but the potassium channels opened during repolarisation are still carrying potassium outwards, and that outward current opposes the inward sodium current. A stronger-than-threshold stimulus is therefore needed to overcome the opposition with the reduced number of available sodium channels. Giving only the sodium half of the answer is how most marks are lost here.

## topic
Neurophysiology

## subtopic
There are two refractory periods

## main_concept
CON-NEU-F119674A8DFD8D

## concept_ids
CON-NEU-DD9033DCA3AAF1

## contextual_concept_ids


## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
3

## inferred_difficulty
50

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > There are two refractory periods

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Give both causes of the relative refractory period and distinguish it from the absolute refractory period.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 37 (printed page 31), printed question 18; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p37-q18 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-085B50E481E1

## title
Unmyelinated nerves differ from myelinated nerves in that they:

## question
Unmyelinated nerves differ from myelinated nerves in that they:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
Two peripheral fibres of similar diameter are compared, one wrapped in myelin and one not.

## format
single best answer

## derived_from
Question 19 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p37-q19 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Are more excitable

## explanation_a
Excitability is a property of the membrane and its channels, and myelination changes the speed and economy of conduction rather than the threshold of the fibre. This option catches a student who treats "faster" and "more excitable" as the same statement.

## answer_b
Conduct impulses by saltatory conduction

## explanation_b
It is exactly backwards. Saltatory conduction is what myelinated fibres do, because myelin insulates the internode so that action potentials are generated only at the nodes and the signal jumps between them. An unmyelinated axon conducts continuously, each active patch depolarising the patch next to it.

## answer_c
Have no nodes of Ranvier

## explanation_c
In an unmyelinated fibre the axon is simply surrounded by Schwann cells without formation of a myelin sheath, so there are no interruptions in a sheath that does not exist — no nodes of Ranvier. In the myelinated fibre the sheath is interrupted at the nodes, where the membrane is exposed to extracellular fluid, carries numerous voltage-gated sodium channels, and lets ions move with little resistance. No sheath means no nodes, and no nodes means no saltatory conduction.

## answer_d
Are not capable of regeneration

## explanation_d
Regeneration is not the distinguishing feature between the two fibre types; Schwann cells are present in both, and it is the presence or absence of the sheath they make that separates them.

## topic
Neurophysiology

## subtopic
Types of nerve fibres regarding myelination

## main_concept
CON-NEU-5664D7AB68AD8D

## concept_ids
CON-NEU-A0C8307D2825A6

## contextual_concept_ids


## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
76

## exam_relevance
8

## clinical_relevance
0.5

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Types of nerve fibers regarding myelination

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
State that unmyelinated fibres have no nodes of Ranvier and therefore conduct continuously rather than saltatorily.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 37 (printed page 31), printed question 19; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p37-q19 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-39C75529A5B6

## title
Saltatory conduction:

## question
Saltatory conduction:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A myelinated fibre and an unmyelinated fibre are compared for speed and for the metabolic cost of restoring their ionic gradients.

## format
single best answer

## derived_from
Question 20 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p37-q20 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Occurs in unmyelinated nerve fibres

## explanation_a
Saltatory conduction requires a myelin sheath with nodes in it; an unmyelinated axon has neither, and conducts by continuous local circuits along its whole length.

## answer_b
Is slower than non-saltatory conduction

## explanation_b
It is the reverse of the point. Saltatory conduction increases the velocity of the nerve impulse up to fifty-fold. That is its first advantage, and it is why the largest, most heavily myelinated fibres conduct at 120 m/sec while the smallest unmyelinated C fibres manage 0.5 to 2 m/sec.

## answer_c
Conserves energy for the axon

## explanation_c
Because action potentials are generated only at the nodes, sodium enters and potassium leaves over a small fraction of the membrane rather than along its entire length. Little energy is then needed by the Na+–K+ pump to re-establish the sodium and potassium concentration differences. So myelination buys two things at once — speed, up to fifty-fold, and economy — and the economy is the half students forget.

## answer_d
The action potentials are generated at the nodes and the internodal spaces

## explanation_d
It contradicts the mechanism it is trying to describe. Action potentials are generated only at the nodes; the internodal membrane is insulated by myelin and does not generate them. If it did, conduction would be continuous and there would be nothing for the impulse to jump.

## topic
Neurophysiology

## subtopic
Conduction [Propagation] of the action potential

## main_concept
CON-NEU-A0C8307D2825A6

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Conduction [Propagation] of the Action Potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Give the two advantages of saltatory conduction and state where action potentials are generated in a myelinated fibre.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 37 (printed page 31), printed question 20; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p37-q20 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-39CBA46ED028

## title
All the following statements are correct, EXCEPT:

## question
All the following statements are correct, EXCEPT:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked to find the single false statement among four about the resting potential, the strength–duration curve and the refractory period.

## format
single best answer

## derived_from
Question 21 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p38-q21 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
The RMP is caused by selective permeability of the nerve membrane and the Na+/K+ pump

## explanation_a
True, so not the answer. The resting membrane potential has two causes: selective permeability, which diffusion makes the main factor and which the Goldman equation predicts contributes about 95 per cent, and the electrogenic Na+–K+ pump, which contributes about −4 mV directly.

## answer_b
Chronaxie is the time needed by a current which is double the rheobase to excite

## explanation_b
True, so not the answer. Chronaxie is the time needed by a current of twice the rheobase to produce a response, and it is used as an index of excitability.

## answer_c
During the descending limb of the spike there is increased permeability of the nerve fibre to Na+

## explanation_c
False, and therefore the answer. The descending limb of the spike is repolarisation, and sodium permeability is falling there, not rising: the sodium channels have been inactivated, which stops the influx, while the potassium channels are open and carrying potassium out. Increased sodium permeability belongs to the ascending limb. A student who remembers only that "sodium makes the spike" and does not separate its two limbs picks the true statements instead.

## answer_d
The absolute refractory period of the nerve coincides with the ascending limb of the spike and the first third of the descending limb

## explanation_d
True, so not the answer. The absolute refractory period runs from the firing level to the early part of repolarisation, which is the ascending limb plus the first part of the descending limb; the relative refractory period then runs to the end of repolarisation.

## topic
Neurophysiology

## subtopic
Excitability changes during action potential

## main_concept
CON-NEU-DD9033DCA3AAF1

## concept_ids
CON-NEU-2235199E9F4373 | CON-NEU-105A7842809DC1

## contextual_concept_ids


## difficulty
Challenging

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.75

## setting
Academic

## reasoning_level
4

## inferred_difficulty
38

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Ionic basis of action potential
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > There are two refractory periods

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Identify which limb of the spike carries a rising sodium permeability, and place the two refractory periods on the trace.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 38 (printed page 32), printed question 21; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
80

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p38-q21 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the stem was extracted as "All the following statements are correct, EACEPT" and options carried "tnere" for "there" and "1° third" for "1st third". Repaired against PDF page 38, which was opened with the Read tool.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-E4585F8B835F

## title
The resting membrane potential of a nerve fibre:

## question
The resting membrane potential of a nerve fibre:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
Two microelectrodes are placed, one on the outer surface of an unstimulated fibre and one inside it, and the voltmeter reads −90 mV.

## format
single best answer

## derived_from
Question 22 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p38-q22 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Includes all the changes in membrane potential during conduction of the nerve impulse

## explanation_a
The changes during conduction are the action potential, which is a different recording made from the same two electrodes after an adequate stimulus. The resting potential is what is recorded under resting, unstimulated conditions.

## answer_b
Is the potential difference between the inside and outside of the resting membrane

## explanation_b
The resting membrane potential is the difference in electrical potential, in millivolts, between the inner and outer surfaces of the membrane under resting conditions. Its magnitude is about −90 mV in large nerve fibres and large skeletal muscle fibres, −70 mV in medium-sized neurones, and only −20 to −40 mV in less excitable cells such as red blood cells and epithelial cells. Measuring it needs two microelectrodes, one on the surface of the fibre and one inside it, both connected to a sensitive voltmeter.

## answer_c
Is always around zero

## explanation_c
Zero potential difference is the isopotential point passed through transiently during the rapid depolarisation of an action potential, on the way to the overshoot. A resting excitable cell is polarised, not neutral.

## answer_d
Is due to the presence of negative ions on the outer surface of the membrane in relation to its inner surface

## explanation_d
The sign is inverted. The negative sign means the inside of the membrane is negative relative to the outside: potassium leaves faster than sodium enters, and the impermeant protein anions remain on the inner surface. Putting the negative charge outside reverses every subsequent statement about depolarisation.

## topic
Neurophysiology

## subtopic
Resting membrane potential (RMP): polarized state

## main_concept
CON-NEU-A6D30CFB5F997B

## concept_ids
CON-NEU-763D2F7A1571C9

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
8

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Resting Membrane Potential (RMP): Polarized State

## question_only_for


## library_ids
ART-NEU-TOP-5A8339CA4A

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Define the resting membrane potential, give its magnitude in different cells, and state what its negative sign means.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 38 (printed page 32), printed question 22; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p38-q22 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-3A67ED5D1169

## title
During depolarisation:

## question
During depolarisation:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked which channels are open, and in which direction ions are moving, during the ascending limb of the spike.

## format
single best answer

## derived_from
Question 23 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p38-q23 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
K+ ions diffuse outside

## explanation_a
Potassium efflux belongs to repolarisation: the potassium gates open shortly after the sodium ones, more slowly and for longer, and their outward current completes the return to rest. Placing it in depolarisation makes the upstroke impossible.

## answer_b
The membrane becomes impermeable to Na+

## explanation_b
It inverts the permeability change. The membrane becomes far more permeable to sodium during depolarisation; it becomes effectively impermeable to sodium a moment later, when the channels inactivate, and that is what terminates depolarisation.

## answer_c
When the membrane potential reaches −65 mV, Na+ and K+ channels open at the same time

## explanation_c
The word "at the same time" is the error. The potassium gates open shortly after the sodium gates, not simultaneously, and that delay is what allows a full overshoot to develop before repolarisation begins. Simultaneous opening would give a much smaller spike.

## answer_d
Activated voltage-gated Na+ channels open

## explanation_d
A stimulus first decreases the membrane potential from −90 mV towards the firing level; some sodium activation gates open, sodium enters down its electro-concentration gradient, and that inflow depolarises further and opens more channels — a positive-feedback, regenerative process. At −65 mV all the voltage-gated sodium channels are open and rapid depolarisation carries the potential to zero and then to an overshoot of +35 mV. The channels then inactivate rapidly and remain so for a few milliseconds before returning to the resting state.

## topic
Neurophysiology

## subtopic
Ionic basis of action potential

## main_concept
CON-NEU-7A30FECF042995

## concept_ids
CON-NEU-157E05FAF3B100

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Ionic basis of action potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Describe depolarisation as a regenerative opening of voltage-gated sodium channels and state why potassium opens later.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 38 (printed page 32), printed question 23; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p38-q23 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-DFB0A3C9A1BE

## title
Which statement regarding the relative refractory period is correct?

## question
Which statement regarding the relative refractory period is correct?

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student compares what a threshold stimulus and a supra-threshold stimulus each do late in repolarisation.

## format
single best answer

## derived_from
Question 24 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p38-q24 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
During it the nerve excitability is increased

## explanation_a
Excitability is decreased, which is what "refractory" means; it is increased only during the initial depolarisation up to the firing level and during a local response. The relative period is a state of reduced, not raised, excitability.

## answer_b
A stimulus stronger than threshold is required to generate an action potential

## explanation_b
The relative refractory period is the period during which another action potential can be produced, but only by a stimulus stronger than the threshold. Its two causes explain the requirement: only some sodium channels have returned to the resting state and are available for activation, and the potassium channels opened during repolarisation are still carrying potassium outwards, opposing the inward sodium movement. It begins at the end of the absolute refractory period and terminates when the membrane potential returns to its resting level.

## answer_c
It occupies all the descending limb of the action potential

## explanation_c
The first part of the descending limb is still absolutely refractory — the absolute period runs from the firing level through the early part of repolarisation — so the relative period occupies the rest of the descending limb, not all of it.

## answer_d
During it all voltage-gated K+ channels are closed

## explanation_d
It removes one of the two causes. The potassium channels are open during the relative refractory period; it is their outward current that opposes depolarisation and makes a stronger stimulus necessary. If they were closed, only the sodium half of the explanation would remain.

## topic
Neurophysiology

## subtopic
There are two refractory periods

## main_concept
CON-NEU-F119674A8DFD8D

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
73

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > There are two refractory periods

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Define the relative refractory period by the stimulus strength it requires and give its two causes.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 38 (printed page 32), printed question 24; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p38-q24 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-9A16ABD005BD

## title
Excitability of the nerve is:

## question
Excitability of the nerve is:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A dental patient is given a local anaesthetic and the nerve supplying the tooth stops conducting altogether.

## format
single best answer

## derived_from
Question 25 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p38-q25 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Increased if the membrane potential becomes more negative

## explanation_a
The direction is reversed. A more negative membrane potential is hyperpolarisation, which moves the membrane away from the firing level and decreases excitability. That is what a fall in extracellular potassium does.

## answer_b
Increased by increased K+ efflux

## explanation_b
Increased potassium efflux hyperpolarises the membrane and therefore lowers excitability, for the same reason as option A. The resting potential depends primarily on the potassium concentration gradient, so anything that drives more potassium out takes the cell further from firing.

## answer_c
Increased during the relative refractory period

## explanation_c
Excitability is decreased during both refractory periods; in the relative period an action potential is possible but only with a stronger-than-threshold stimulus, which is by definition reduced excitability. It is increased only during the initial depolarisation to the firing level and during a local response.

## answer_d
Completely lost by local anaesthetic drugs

## explanation_d
Local anaesthetics such as cocaine decrease the membrane permeability to sodium; the membrane depolarises slowly and cannot reach the firing level, so they act as membrane stabilisers and excitability is lost. The same framework covers the rest of the factors: anything raising sodium permeability raises excitability — veratridine, and a low extracellular calcium — while anything lowering it stabilises, as a high extracellular calcium does; a fall in extracellular sodium reduces the size of the action potential with little effect on the resting potential; tetrodotoxin blocks the sodium channels outright so no action potential can be elicited; and potassium acts on the resting potential instead, hyperkalaemia depolarising and raising excitability, hypokalaemia hyperpolarising and lowering it.

## topic
Neurophysiology

## subtopic
Factors that affect the excitability of the nerve

## main_concept
CON-NEU-77596C8A899A7E

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Pharmacology

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
64

## exam_relevance
9

## clinical_relevance
0.85

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Factors that affect the excitability of the nerve

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Predict how a change in sodium permeability, in extracellular calcium or in extracellular potassium changes nerve excitability.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 38 (printed page 32), printed question 25; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p38-q25 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction ran text from the next printed page into option D, which arrived as "Completely lost by local anesthetic drugs z2c- Goncerning isometric and isotonic muscle contractions: ..." plus a spurious fifth option. PDF page 38 was opened with the Read tool: option D is printed as "Completely lost by local anesthetic drugs" and ends there. The trailing text is printed question 26, which begins on PDF page 39. Option D trimmed; the item has four options, as printed.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-4CEED3E80F60

## title
After release from the neuromuscular junction, acetylcholine:

## question
After release from the neuromuscular junction, acetylcholine:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
Acetylcholine has just crossed the synaptic cleft and reached the motor end plate.

## format
single best answer

## derived_from
Question 27 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p39-q26 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Activates presynaptic potassium channels

## explanation_a
What the arriving nerve impulse opens presynaptically are voltage-gated calcium channels, and it is calcium entry that ruptures the vesicles and releases the transmitter. Acetylcholine acts postsynaptically, on the end plate, not back on the nerve ending.

## answer_b
Causes postsynaptic depolarisation

## explanation_b
Acetylcholine binds its receptor on the motor end plate, which is a ligand-gated channel; the channel opens, sodium flows in, and the end plate depolarises. That depolarisation is the end-plate potential, a graded, non-propagated response that acts as a stimulus and carries the adjacent muscle membrane to its firing level. Action potentials are then generated on either side of the end plate and propagate in both directions along the fibre, initiating contraction.

## answer_c
Enters the sarcoplasmic reticulum

## explanation_c
It confuses two compartments. The sarcoplasmic reticulum lies inside the muscle fibre and stores calcium; acetylcholine never enters the fibre at all — it acts on receptors in the surface membrane of the end plate. The link between the two is indirect: the muscle action potential that the end-plate potential triggers travels down the T tubules and opens the calcium channels of the terminal cisternae.

## answer_d
Is triggered by acetylcholinesterase

## explanation_d
The relationship is backwards. Acetylcholinesterase does not trigger acetylcholine; it hydrolyses it in the cleft after it dissociates from the receptor, and that degradation is what prevents one impulse causing multiple contractions.

## topic
Neurophysiology

## subtopic
Sequence of events during neuromuscular transmission

## main_concept
CON-MSK-77D955AAB4D0FA

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
66

## exam_relevance
9

## clinical_relevance
0.7

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Sequence of Events during Neuromuscular Transmission

## question_only_for


## library_ids
ART-103-PHY-NEUROMUSCULAR-TRANSMISSION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
State that acetylcholine depolarises the motor end plate, and place the end-plate potential between transmitter binding and the muscle action potential.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 39 (printed page 33), printed question 27; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p39-q26 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
The bank recorded correct: c for this item, and that is wrong. The bank numbered it printed question 26; PDF page 39 was opened with the Read tool and the item is printed as question 27, because printed question 26 — "Concerning isometric and isotonic muscle contractions" — was swallowed into option D of printed question 25 during extraction and never became an item. The bank therefore read key row 26 (c) against printed question 27. Key row 27 is b, which is also the physiologically correct answer, and key row 26 (c) matches the swallowed isometric/isotonic item. This item is authored as printed question 27 with correct_answer B, and its ID is hashed from the corrected printed number.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
This is the one item in this file whose printed number and printed key both differ from what the bank recorded. The correction is set out in full in the key note above and is reported to the lead as a defect in the extraction, not in the book.

---

# Item

## id
QM-103-9EE98F800F57

## title
At the neuromuscular junction, binding of transmitter to postsynaptic receptors leads to:

## question
At the neuromuscular junction, binding of transmitter to postsynaptic receptors leads to:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked which membrane changes its permeability, and to what, when acetylcholine binds at the end plate.

## format
single best answer

## derived_from
Question 28 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p39-q28 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
A decreased permeability of the postsynaptic membrane to anions

## explanation_a
The acetylcholine receptor is a ligand-gated cation channel that opens; it does not close an anion pathway. Decreased anion permeability describes inhibitory synapses, where chloride carries the current, and importing that here reverses the sign of the response.

## answer_b
An increased permeability of the postsynaptic membrane to Ca2+

## explanation_b
It is the right ion in the wrong membrane. Calcium entry belongs to the presynaptic nerve ending, where it triggers vesicle rupture. The postsynaptic channel passes small cations, principally sodium inwards.

## answer_c
An increased permeability of the presynaptic membrane to Ca2+

## explanation_c
This is the strongest distractor because the statement itself is true — the arriving impulse does open voltage-gated calcium channels in the nerve ending. But that is what happens before the transmitter is released, not what binding of transmitter to postsynaptic receptors leads to. Reading the stem to the end is what separates this from the answer.

## answer_d
An increased permeability of the postsynaptic membrane to small cations

## explanation_d
The receptor is a ligand-gated channel in the motor end plate; when acetylcholine binds, the channel opens and becomes permeable to small cations, giving a net sodium influx and depolarisation of the end plate. The resulting end-plate potential is graded and non-propagated, and it depolarises the adjacent muscle membrane to its firing level, at which point a propagated muscle action potential is generated.

## topic
Neurophysiology

## subtopic
Sequence of events during neuromuscular transmission

## main_concept
CON-MSK-77D955AAB4D0FA

## concept_ids


## contextual_concept_ids


## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.6

## setting
Academic

## reasoning_level
3

## inferred_difficulty
50

## exam_relevance
9

## clinical_relevance
0.65

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Sequence of Events during Neuromuscular Transmission

## question_only_for


## library_ids
ART-103-PHY-NEUROMUSCULAR-TRANSMISSION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Distinguish the presynaptic calcium step from the postsynaptic cation step of neuromuscular transmission.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 39 (printed page 33), printed question 28; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p39-q28 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-C6C2A6B46D22

## title
An overlap of actin and myosin filaments occurs in the:

## question
An overlap of actin and myosin filaments occurs in the:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A longitudinal section of a resting sarcomere is examined, and the band in which thick and thin filaments lie side by side is identified.

## format
single best answer

## derived_from
Question 29 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p39-q29 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
A Band

## explanation_a
The A band is the region occupied by the thick myosin filaments, and the thin actin filaments extend into it from either side, so it is where the two overlap. Its centre carries the pale H zone, bisected by the M line, and that zone is pale precisely because it is the part of the A band the actin filaments do not reach. The A band is anisotropic and dark, the I band isotropic and light, and their alternation is what makes skeletal muscle striated.

## answer_b
I Band

## explanation_b
It is the exact complement of the answer. The I band contains thin filaments only, which is why it is light, and why it shortens during contraction as the actin filaments slide further into the A band.

## answer_c
Z Line

## explanation_c
The Z line is the boundary of the sarcomere and the anchor into which the thin filaments insert; it is a line, not a region of overlap, and the sarcomere is the portion of the myofibril between two Z lines.

## answer_d
H Band

## explanation_d
It is the most instructive wrong answer. The H zone lies in the middle of the A band and is defined by the absence of overlap — thick filaments with no thin filaments beside them. It is abolished during contraction, when the actin filaments slide in far enough to reach the centre.

## topic
Neurophysiology

## subtopic
The sarcomeres

## main_concept
CON-MSK-BBEDCAE76A03B9

## concept_ids
CON-MSK-E36936D62038BF

## contextual_concept_ids


## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
66

## exam_relevance
8

## clinical_relevance
0.4

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > The sarcomeres

## question_only_for


## library_ids
ART-MSK-TOP-B54C248DF1

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Locate the region of thick–thin overlap in the A band and explain why the H zone is pale.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 39 (printed page 33), printed question 29; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p39-q29 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-E30E3EAE99F9

## title
In muscle tissue, neurotransmitter receptors are located:

## question
In muscle tissue, neurotransmitter receptors are located:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked which structure carries the acetylcholine receptors at the neuromuscular junction.

## format
single best answer

## derived_from
Question 30 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p39-q30 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
In synaptic vesicles

## explanation_a
Synaptic vesicles hold the transmitter before release; they are the source of acetylcholine, not its target. This option catches the student who remembers that vesicles and receptors both belong to the junction without separating the two sides of it.

## answer_b
On the motor neuron axon terminals

## explanation_b
The axon terminal is the presynaptic side; what it carries are the vesicles and the voltage-gated calcium channels that trigger their exocytosis. Receptors for the transmitter it releases lie opposite it.

## answer_c
In the synaptic cleft

## explanation_c
It is the nearest miss. What lies in the synaptic cleft is acetylcholinesterase, bound to the basal lamina — an enzyme, not a receptor. Confusing the two is what makes myasthenia gravis and its treatment hard to explain.

## answer_d
On the motor end plate

## explanation_d
Opposite the nerve ending, the muscle membrane is thickened and thrown into junctional folds, forming the motor end plate, which is rich in acetylcholine receptors. The nerve ending fits into a depression in the muscle membrane, and the extracellular space between them is the synaptic cleft. Each muscle fibre receives only one axon terminal.

## topic
Neurophysiology

## subtopic
Physiologic anatomy of the neuromuscular junction

## main_concept
CON-MSK-77D955AAB4D0FA

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Anatomy

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
80

## exam_relevance
8

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Physiologic Anatomy of Neuromuscular Junction

## question_only_for


## library_ids
ART-103-PHY-NEUROMUSCULAR-TRANSMISSION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Locate the acetylcholine receptors on the motor end plate and distinguish the three components of the junction.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 39 (printed page 33), printed question 30; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
40

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p39-q30 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-4321642DFAC8

## title
The action potential of skeletal muscle:

## question
The action potential of skeletal muscle:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A muscle fibre is stimulated and the action potential is followed from the surface membrane into the depth of the fibre.

## format
single best answer

## derived_from
Question 31 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p39-q31 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Has a prolonged plateau phase

## explanation_a
The prolonged plateau belongs to cardiac muscle, and it is what gives cardiac muscle its long refractory period and prevents tetanus. The skeletal muscle action potential lasts only 2 to 4 msec.

## answer_b
Spreads inwards to all parts of the muscle via T tubules

## explanation_b
The transverse tubule is an invagination of the muscle fibre membrane that contains extracellular fluid, and the action potential spreads over the surface membrane and into the T tubules. This is how a signal on the surface reaches the interior of a fibre too thick for diffusion to serve: the T tubule carries a voltage-sensitive dihydropyridine receptor, and excitation of the tubule activates it, which opens the ryanodine calcium channel on the terminal cisterna of the sarcoplasmic reticulum, releasing calcium rapidly and contracting all the myofibrils together.

## answer_c
Is longer than the action potential of cardiac muscle

## explanation_c
It is the same comparison inverted. The skeletal muscle action potential lasts 2 to 4 msec and is conducted along the fibre at about 5 m/sec; the cardiac one is far longer because of its plateau.

## answer_d
Is not essential for muscle contraction

## explanation_d
The action potential precedes the contraction by about 2 msec and is what initiates it; excitation–contraction coupling is by definition the process by which an action potential initiates the contractile process. Without it there is no calcium release and no contraction.

## topic
Neurophysiology

## subtopic
Changes following skeletal muscle stimulation

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids
CON-MSK-BD54A250111D42

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
66

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Changes Following Skeletal Muscle Stimulation
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Tubular System

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Explain how the T tubule carries the action potential into the fibre and give the electrical properties of the skeletal muscle action potential.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 39 (printed page 33), printed question 31; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p39-q31 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-E99B9395B34B

## title
Skeletal muscles:

## question
Skeletal muscles:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked to check four statements about the arrangement of the filaments inside a myofibril.

## format
single best answer

## derived_from
Question 32 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p40-q32 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Have actin filaments which have cross-bridges

## explanation_a
The two filaments are swapped. The cross-bridges are the globular heads of the myosin molecules, projecting from the thick filament and carrying the actin-binding site, the ATP-binding site and the ATPase site. Actin carries the active site the cross-bridge binds to, and at rest that site is covered by tropomyosin.

## answer_b
Have myosin filaments which are attached to the Z-disc

## explanation_b
It is the thin actin filaments that insert into the Z disc; the thick myosin filaments lie in the middle of the sarcomere and are held at the M line. The force developed by the bending cross-bridge is transmitted through the actin filament to the Z disc, then through the sarcolemma and the tendinous insertions to the bone.

## answer_c
Have sarcomeres which are the portions of the muscle between Z discs

## explanation_c
The sarcomere is the portion of the myofibril between two Z lines, and it is the functional unit of contraction. During contraction the sarcomere shortens: the I band narrows, the H zone is abolished, and the A band keeps its length, because the filaments themselves do not shorten — they slide past one another. Maximal force is developed at a sarcomere length of about 2.2 µ, the resting length in the body, where every cross-bridge on the thick filament is opposite an actin molecule.

## answer_d
In the resting state, the actin filaments completely overlap the myosin filaments

## explanation_d
It describes the state at which force falls rather than the resting state. If the sarcomere is shortened below 2.2 µ the ends of the two actin filaments overlap each other as well as the myosin, and force development decreases. At resting length the overlap is optimal, not complete.

## topic
Neurophysiology

## subtopic
The sarcomeres

## main_concept
CON-MSK-70448A9B07D24A

## concept_ids
CON-MSK-7007764CED99C8

## contextual_concept_ids


## difficulty
Moderate

## question_type
Anatomy

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
8

## clinical_relevance
0.4

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > The sarcomeres

## question_only_for


## library_ids
ART-MSK-TOP-B54C248DF1

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Define the sarcomere between Z discs and assign the cross-bridges, the Z-disc insertion and the optimal overlap correctly.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 40 (printed page 34), printed question 32; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p40-q32 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-17B71EC19240

## title
During skeletal muscle contraction:

## question
During skeletal muscle contraction:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A sarcomere is measured before and during contraction, and the lengths of the filaments and of the bands are compared.

## format
single best answer

## derived_from
Question 33 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p40-q33 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Ca2+ is released from T-tubules

## explanation_a
It names the wrong store. Calcium is released from the terminal cisternae of the sarcoplasmic reticulum. The T tubule carries the action potential inwards and its dihydropyridine receptor senses the voltage change, but the calcium itself comes out of the reticulum, through the ryanodine channel.

## answer_b
The A and the I bands do not change in length

## explanation_b
The A band does keep its length, but the I band does not: it shortens as the thin filaments slide inwards, and the H zone is abolished. Extending the true half of the statement to both bands is what makes this option attractive.

## answer_c
The myofilaments do not change in length

## explanation_c
Contraction is a sliding, not a shortening, of filaments. The thick and thin filaments keep their lengths and move past one another, so the sarcomere and the whole fibre shorten while the myofilaments do not. This is why the A band, which is the length of the thick filament, is preserved, while the I band narrows and the H zone disappears.

## answer_d
Cross bridges are formed between actin and troponin

## explanation_d
The binding partner is wrong. The cross-bridges bind the active site on actin, which tropomyosin covers at rest. Troponin is the regulatory complex: troponin I binds actin, troponin T binds tropomyosin, and troponin C binds calcium, and it is calcium binding troponin C that moves tropomyosin off the actin site so the cross-bridge can attach.

## topic
Neurophysiology

## subtopic
The sarcomeres

## main_concept
CON-MSK-70448A9B07D24A

## concept_ids
CON-MSK-3013AA61E917B7

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
62

## exam_relevance
9

## clinical_relevance
0.45

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > The sarcomeres
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Changes Following Skeletal Muscle Stimulation

## question_only_for


## library_ids
ART-MSK-TOP-B54C248DF1

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
State that contraction slides the filaments without shortening them, and name the calcium store and the cross-bridge binding partner.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 40 (printed page 34), printed question 33; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p40-q33 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-5CABA71FF417

## title
Which of the following will increase the velocity of action potential propagation?

## question
Which of the following will increase the velocity of action potential propagation?

## subject
neuro

## status
Draft

## owner
Claude

## vignette
Two axons are compared, and the factors that make one conduct faster than the other are listed.

## format
single best answer

## derived_from
Question 34 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p40-q34 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Myelination of the axon

## explanation_a
Myelination produces saltatory conduction, in which the action potential is regenerated only at the nodes of Ranvier and jumps between them, and this increases the velocity of the nerve impulse up to fifty-fold. It also conserves energy, since only a small area of membrane exchanges ions and the Na+–K+ pump has less to restore. The other determinant is size: the speed of propagation is proportional to the square root of the fibre diameter.

## answer_b
Decrease in axon diameter

## explanation_b
The direction is reversed. A larger diameter conducts faster, which is why A fibres of 2 to 20 µ conduct at 20 to 120 m/sec while C fibres of under 1 µ manage 0.5 to 2 m/sec.

## answer_c
Absence of myelin sheath

## explanation_c
Absence of myelin means continuous conduction along the whole membrane, which is the slow arrangement. It is the same fact as option A stated the other way round, and only one of the two can be the answer.

## answer_d
Short internodal distances

## explanation_d
This is the subtle one. The speed of propagation is proportional to the internodal distance as well as to the diameter, and in general the internodal distance increases as the axon diameter increases. Shortening the internodes therefore slows conduction rather than speeding it.

## topic
Neurophysiology

## subtopic
Conduction [Propagation] of the action potential

## main_concept
CON-NEU-A0C8307D2825A6

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
78

## exam_relevance
9

## clinical_relevance
0.55

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Conduction [Propagation] of the Action Potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
List the determinants of conduction velocity: myelination, fibre diameter and internodal distance.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 40 (printed page 34), printed question 34; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p40-q34 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-7AB722D57B8C

## title
The rapid depolarisation and overshoot of the axonal action potential is due to rapid:

## question
The rapid depolarisation and overshoot of the axonal action potential is due to rapid:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked which channel carries the current that takes the membrane from −65 mV to +35 mV.

## format
single best answer

## derived_from
Question 35 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p40-q35 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Increase in K+ conductance (permeability)

## explanation_a
Increased potassium conductance repolarises and then hyperpolarises the membrane; it is what ends the spike, not what produces it. Choosing potassium here reverses the whole sequence.

## answer_b
Increase in Ca2+ conductance

## explanation_b
Calcium currents matter elsewhere in this chapter — at the nerve ending, where voltage-gated calcium channels trigger transmitter release, and in cardiac muscle, where calcium sustains the plateau — but the axonal upstroke is sodium.

## answer_c
Opening of Na+ channels

## explanation_c
At the firing level all the voltage-gated sodium channels open, sodium rushes in down its electro-concentration gradient, the potential difference falls to zero and then reverses, so the inside becomes positive relative to the outside, to an overshoot of +35 mV. The amplitude of the action potential is therefore 125 mV, from −90 to +35. The process is regenerative: sodium entering depolarises the membrane further, which opens still more sodium channels.

## answer_d
Opening of Cl− channels

## explanation_d
Chloride channels do not generate the axonal action potential; chloride appears in the Goldman equation as a contributor to the resting potential. This option catches a student who answers from a list of ions rather than from the mechanism.

## topic
Neurophysiology

## subtopic
Ionic basis of action potential

## main_concept
CON-NEU-7A30FECF042995

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Ionic basis of action potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Attribute the upstroke and overshoot to voltage-gated sodium channels and give the amplitude of the action potential.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 40 (printed page 34), printed question 35; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
40

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p40-q35 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-BCCFE929B894

## title
Repolarisation:

## question
Repolarisation:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student traces the descending limb of the spike and asks which channels are shutting and which are opening.

## format
single best answer

## derived_from
Question 36 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p40-q36 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Occurs at first gradually then becomes fast

## explanation_a
The two phases are in the wrong order. Repolarisation is rapid first — the rapid phase is the first 70 per cent — and slow afterwards, the remaining 30 per cent, at the end of which the normal resting membrane potential is reached.

## answer_b
Results from closure of sodium and opening of potassium channels

## explanation_b
Two events together produce repolarisation. Inactivation of the sodium channels stops the sodium influx and terminates depolarisation. Activation of the potassium channels, whose gates open shortly after the sodium gates, more slowly and for longer, carries potassium out and completes the return to the resting level. Note that "closure of sodium channels" here is inactivation by the inner gate, which is a different state from the resting closed state — an inactivated channel must return to the resting state before it can open again, which is what makes the absolute refractory period absolute.

## answer_c
Is represented by the ascending limb of the spike

## explanation_c
The ascending limb of the spike is rapid depolarisation, driven by sodium entry. Repolarisation is the descending limb, and mixing the two limbs makes every subsequent statement about refractory periods wrong.

## answer_d
Is followed by the appearance of a local response

## explanation_d
What follows repolarisation is hyperpolarisation, produced by slow closure of the potassium channels, and then a return to the resting level through the leak potassium channels. A local response is what a subthreshold stimulus produces, and it is not part of the action potential at all.

## topic
Neurophysiology

## subtopic
Ionic basis of action potential

## main_concept
CON-NEU-DD9033DCA3AAF1

## concept_ids
CON-NEU-157E05FAF3B100

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Ionic basis of action potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Give the two ionic events of repolarisation and the correct order of its rapid and slow phases.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 40 (printed page 34), printed question 36; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p40-q36 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-67D93CB5C6DF

## title
In saltatory conduction, the nerve impulse:

## question
In saltatory conduction, the nerve impulse:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A myelinated fibre is stimulated and the sites at which the action potential is regenerated are marked along its length.

## format
single best answer

## derived_from
Question 37 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p40-q37 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Jumps from one node to another node

## explanation_a
Only at the nodes of Ranvier is the cell membrane exposed to the extracellular fluid and provided with numerous voltage-gated sodium channels, so action potentials are generated only at the nodes. An action potential at one node becomes the stimulus for the next, and the electrical signal jumps from node to node — which is what saltatory means. The gain is both speed, up to fifty-fold, and economy, since little sodium and potassium have to be pumped back.

## answer_b
Jumps from one internode to another internode

## explanation_b
It names the insulated segments rather than the gaps. The internode is the length covered by myelin, where the membrane is insulated and no action potential is generated; it is what the impulse jumps over, not what it jumps between.

## answer_c
Shows continuous conduction

## explanation_c
Continuous conduction is what an unmyelinated axon does, each depolarised patch acting as the stimulus for the patch adjacent to it. Saltatory conduction is defined by being discontinuous.

## answer_d
Has a velocity slower than that of the unmyelinated nerve fibre

## explanation_d
It is the reverse. Saltatory conduction increases velocity up to fifty-fold relative to continuous conduction, which is the reason myelin exists.

## topic
Neurophysiology

## subtopic
Conduction [Propagation] of the action potential

## main_concept
CON-NEU-A0C8307D2825A6

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
82

## exam_relevance
8

## clinical_relevance
0.5

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Conduction [Propagation] of the Action Potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
State that saltatory conduction regenerates the action potential only at the nodes of Ranvier.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 40 (printed page 34), printed question 37; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
40

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p40-q37 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-A98A39DE4DB1

## title
Chronaxie is:

## question
Chronaxie is:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked to separate four adjacent definitions taken from the strength–duration curve.

## format
single best answer

## derived_from
Question 38 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p41-q38 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
The utilisation time

## explanation_a
Utilisation time is the time needed for the rheobase itself to give a response. It and chronaxie differ only in whether the test current is one or two times the rheobase, and that single difference is what makes chronaxie a fair index of excitability across nerves with different thresholds.

## answer_b
The minimal duration of a stimulus that can excite the nerve

## explanation_b
This describes no single point on the curve: extremely short stimuli will not excite the nerve however intense they are, so there is a minimum duration, but chronaxie is defined at a stated current strength rather than as the shortest usable duration.

## answer_c
The time needed by the rheobase to stimulate the nerve

## explanation_c
This is the utilisation time again, written out. Two of the four options therefore say the same wrong thing in different words, which is a warning that the discriminating detail is the multiple of the rheobase.

## answer_d
The time needed by the current twice the rheobase to stimulate the nerve

## explanation_d
Chronaxie is the time needed by a current of double the rheobase to produce a response, and it is used as an index of excitability. The rheobase is the threshold stimulus, the minimum intensity needed to excite the nerve; intensities below it produce only a local response. The whole curve expresses one inverse relationship: within limits, the stronger the stimulus, the shorter the duration it must be applied for.

## topic
Neurophysiology

## subtopic
The strength-duration curve

## main_concept
CON-NEU-105A7842809DC1

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Investigation

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
74

## exam_relevance
8

## clinical_relevance
0.45

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > The Strength-Duration Curve

## question_only_for


## library_ids
ART-NEU-TOP-5A8339CA4A

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Define chronaxie precisely and distinguish it from utilisation time and rheobase.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 41 (printed page 35), printed question 38; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p41-q38 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the stem was extracted as "Crronaxie is". Read as "Chronaxie is", confirmed against PDF page 41, which was opened with the Read tool.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-60E2E77AFC94

## title
The function of troponin C is:

## question
The function of troponin C is:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
Calcium floods the cytoplasm of a muscle fibre, and the first protein it binds is identified.

## format
single best answer

## derived_from
Question 39 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p41-q39 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Binding with Ca2+

## explanation_a
Troponin is a small globular protein complex with three subunits, and each has its own affinity: troponin I binds actin, troponin T binds tropomyosin, and troponin C has a strong affinity for calcium. When calcium combines with troponin C the contraction process is initiated — troponin changes conformation, tropomyosin moves away from the myosin-binding site on actin, and the exposed site combines with the myosin cross-bridge. The letters are worth learning as a mnemonic: I for actIn, T for Tropomyosin, C for Calcium.

## answer_b
Binding with tropomyosin

## explanation_b
That is troponin T, whose strong affinity for tropomyosin is what attaches the complex to it. Swapping the subunits is exactly what this option and the next are written to detect.

## answer_c
Binding with actin

## explanation_c
That is troponin I, which binds actin. Together, troponin I and T anchor the complex; troponin C is the sensor.

## answer_d
Covering active sites of actin

## explanation_d
Covering the active sites on actin at rest is the job of tropomyosin, not of any troponin subunit. Troponin holds tropomyosin in place, and when calcium binds troponin C it is the movement of tropomyosin that uncovers the sites.

## topic
Neurophysiology

## subtopic
The muscle proteins

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
76

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > The Muscle Proteins

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Assign each troponin subunit to its binding partner and name troponin C as the calcium sensor.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 41 (printed page 35), printed question 39; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p41-q39 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-EB0DD544D7F9

## title
The propagation of the action potential along the membrane of the T-tubules causes:

## question
The propagation of the action potential along the membrane of the T-tubules causes:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A muscle action potential travels from the surface membrane into the transverse tubules, and the next event is traced.

## format
single best answer

## derived_from
Question 40 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p41-q40 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
The release of NE from the terminal cisternae

## explanation_a
Noradrenaline is a neurotransmitter of the autonomic nervous system and has no part in skeletal muscle excitation–contraction coupling. The terminal cisternae store calcium, not transmitters, and the option tests whether the student knows what is inside them.

## answer_b
The release of ACh from the terminal cisternae

## explanation_b
It moves acetylcholine to the wrong place. Acetylcholine acts at the neuromuscular junction, on receptors in the motor end plate at the surface. It never enters the fibre, and it certainly is not stored in the sarcoplasmic reticulum.

## answer_c
The pumping of Ca2+ back into the sarcoplasmic reticulum

## explanation_c
The direction is reversed. Pumping calcium back into the reticulum is what the calcium ATPase on the reticulum membrane does during relaxation, once the stimulus is over: cytoplasmic calcium falls, troponin returns to its original conformation, tropomyosin re-covers the binding site and cross-bridge cycling stops. Reading the relaxation step as the excitation step is the commonest error here.

## answer_d
The release of Ca2+ from the terminal cisternae

## explanation_d
Propagation of the action potential into the T tubule activates the voltage-sensitive dihydropyridine receptor on the tubule, which opens the ryanodine calcium channel on the terminal cisterna of the sarcoplasmic reticulum through the foot processes between them; calcium flows out of the cisterna into the cytoplasm. Calcium then binds troponin C, tropomyosin moves off the actin site, and contraction begins. This is the relay that couples an electrical event on the surface to a mechanical event in the depth of the fibre.

## topic
Neurophysiology

## subtopic
Excitation–contraction coupling

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids
CON-MSK-BD54A250111D42

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
64

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Changes Following Skeletal Muscle Stimulation

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Trace the coupling from T-tubule depolarisation through the DHP and ryanodine receptors to calcium release from the terminal cisternae.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 41 (printed page 35), printed question 40; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p41-q40 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b) names option d, which this question does not have".
The bank carried correct: null with the note that the printed key names option d, which the extracted item did not have. PDF page 41 was opened with the Read tool: the book prints four options but letters the fourth "e-" instead of "d-", a typographic slip in the book, and the extraction merged it into option c. The fourth option is restored here as option D, which is the option the printed key names. The answer was read, not inferred.
OCR repair: options c and d arrived merged as one string, "The pumping of Ca** back into the sarcoplasmic reticulum. e- The release of Ca** from the terminal cisternae." Split at the mislettered "e-" and restored as options C and D, matching the four options printed on PDF page 41.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-261E586861E8

## title
Fast skeletal muscle fibres differ from slow fibres in that they:

## question
Fast skeletal muscle fibres differ from slow fibres in that they:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A biopsy from an external ocular muscle is compared with one from soleus.

## format
single best answer

## derived_from
Question 41 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p41-q41 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Are adapted for short rapid muscle contractions

## explanation_a
Fast fibres, pale or type IIb, are larger, innervated by large rapidly conducting motor neurones, and carry an extensive sarcoplasmic reticulum for rapid calcium release and a high ATPase activity. Together these give a rapid contractile mechanism with less resistance to fatigue, which suits short, rapid contractions. Muscles specialised for fine skilled movements, such as the external ocular muscles and some hand muscles, are composed mainly of fast fibres, while muscles that hold posture for long periods, such as the back muscles and soleus, are mainly slow.

## answer_b
Have less glycolytic enzymes

## explanation_b
It inverts one of the defining features. Fast fibres have large amounts of glycolytic enzymes, for rapid release of energy by the glycolytic process. It is the slow fibres that are built for oxidation rather than glycolysis.

## answer_c
Have more extensive blood supply

## explanation_c
Fast fibres contain less blood supply, less myoglobin and fewer mitochondria. It is the slow fibres that are surrounded by more extensive capillaries, to supply the extra oxygen their aerobic metabolism needs.

## answer_d
Contain more mitochondria

## explanation_d
It is the same reversal again. Slow fibres contain large numbers of oxidative enzymes and a high mitochondrial volume; fast fibres have fewer mitochondria. Three of the four options here are the slow fibre described as though it were the fast one, which is a fair test of whether the two columns of the table have been learned against each other.

## topic
Neurophysiology

## subtopic
Type of muscle fibres

## main_concept
CON-MSK-3E5F54D8D58E9C

## concept_ids
CON-MSK-C693745576251C

## contextual_concept_ids


## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
64

## exam_relevance
8

## clinical_relevance
0.55

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Contrast fast and slow skeletal muscle fibres by enzyme profile, blood supply, myoglobin and mitochondrial content.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 41 (printed page 35), printed question 41; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p41-q41 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-351F154FA391

## title
Contraction of skeletal muscles in the case of fatigue:

## question
Contraction of skeletal muscles in the case of fatigue:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A muscle is stimulated repeatedly and strongly, and the strength of successive contractions is measured.

## format
single best answer

## derived_from
Question 42 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p41-q42 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Produces more work when the muscle contracts isometrically than when it contracts isotonically

## explanation_a
It inverts the definition of work. No external work is done in an isometric contraction, because the load is not moved; external work is done in an isotonic contraction, because the load is moved a distance. Isometric contraction produces more tension, not more work — that is the pair of words the examiner is watching.

## answer_b
Depends on external Ca2+

## explanation_b
Skeletal muscle contraction depends on calcium released from the sarcoplasmic reticulum, not on extracellular calcium; the fibre has an extensive internal store and does not need to import calcium to contract. Dependence on external calcium is a property of cardiac and smooth muscle, and importing it here is the error.

## answer_c
Decreases in magnitude with rapid repeated stimulation

## explanation_c
Prolonged and strong contraction leads to fatigue, which decreases the strength of contraction, prolongs its duration and leaves relaxation incomplete. Four causes drive it: accumulation of metabolites such as lactic acid, which raises intracellular acidity; depletion of muscle ATP, glycogen and creatine phosphate; diminished transmission at the neuromuscular junction; and interruption of blood flow through a contracting muscle with loss of nutrients, especially oxygen.

## answer_d
Does not depend on action potential

## explanation_d
The action potential precedes and initiates contraction, by about 2 msec, and it is what triggers calcium release. A contraction that did not depend on an action potential would be a contracture, such as rigor mortis, where the filaments cannot separate because ATP has been lost.

## topic
Neurophysiology

## subtopic
Muscle fatigue

## main_concept
CON-MSK-EAED404BB7FE10

## concept_ids
CON-MSK-83EC879067A0F2 | CON-MSK-06EFD7D3ED206C

## contextual_concept_ids


## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
62

## exam_relevance
8

## clinical_relevance
0.6

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## question_only_for


## library_ids
ART-MSK-TOP-17872815ED

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Give the four causes of muscle fatigue and distinguish tension from work in isometric and isotonic contraction.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 41 (printed page 35), printed question 42; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p41-q42 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-18EFFEE4EDAE

## title
Red (slow) fibres are characterised by the following, EXCEPT:

## question
Red (slow) fibres are characterised by the following, EXCEPT:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked to find the one statement that does not fit a slow, red, fatigue-resistant fibre.

## format
single best answer

## derived_from
Question 43 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p41-q43 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Contains many blood capillaries

## explanation_a
True, so not the answer. Slow fibres are surrounded by more extensive capillaries, which supply the extra oxygen their aerobic metabolism requires.

## answer_b
Glycogen stores are low

## explanation_b
True, so not the answer. Slow fibres do not rely on stored glycogen the way fast fibres do; their large numbers of oxidative enzymes and high mitochondrial volume let them work aerobically on delivered fuel, which is what gives them their high resistance to fatigue.

## answer_c
Contains a high concentration of myoglobin

## explanation_c
True, so not the answer. Slow fibres contain a higher concentration of myoglobin, which stores oxygen until it is needed and gives the fibre its red colour — the property the name records.

## answer_d
Depends on anaerobic oxidation

## explanation_d
False, and therefore the answer. Slow fibres have a large capacity for aerobic metabolism, not anaerobic. Anaerobic glycolysis is the fast fibre’s method, which is why fast fibres fatigue quickly: lactic acid accumulates. A student who sees "oxidation" in the option and matches it to the oxidative enzymes of the slow fibre, without reading the word "anaerobic", picks one of the true statements instead.

## topic
Neurophysiology

## subtopic
Type of muscle fibres

## main_concept
CON-MSK-3E5F54D8D58E9C

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
66

## exam_relevance
8

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Identify the slow red fibre as aerobic and fatigue-resistant, and name the features that follow from that.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 41 (printed page 35), printed question 43; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p41-q43 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-F7609B19A4B7

## title
As regards the sarcomere all is true, EXCEPT:

## question
As regards the sarcomere all is true, EXCEPT:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A sarcomere is photographed at rest and during contraction, and the widths of its bands are measured on both images.

## format
single best answer

## derived_from
Question 44 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p42-q44 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
It is the distance between two Z lines

## explanation_a
True, so not the answer. The sarcomere is the portion of the myofibril between two Z discs, and it is the functional unit of contraction.

## answer_b
It is shortened during contraction

## explanation_b
True, so not the answer. The sarcomere shortens during contraction, as the thin filaments slide further in over the thick ones and pull the Z lines towards each other.

## answer_c
The width of the I band does not change during contraction

## explanation_c
False, and therefore the answer. The I band shortens during contraction: it contains thin filaments only, and as those filaments slide into the A band the light band between them narrows. The H zone is abolished at the same time and for the same reason.

## answer_d
The width of the A band does not change during contraction

## explanation_d
True, so not the answer, and this is the statement most often mistaken for the false one. The A band keeps its length because it is the length of the thick filament, and the filaments themselves do not shorten — they slide. A student who knows that "something does not change" but not which band picks this and loses the mark.

## topic
Neurophysiology

## subtopic
The sarcomeres

## main_concept
CON-MSK-70448A9B07D24A

## concept_ids
CON-MSK-CABCD15AA2B0F2

## contextual_concept_ids


## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
64

## exam_relevance
9

## clinical_relevance
0.4

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > The sarcomeres

## question_only_for


## library_ids
ART-MSK-TOP-B54C248DF1

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
State which bands change and which do not during contraction, and explain both from filament sliding.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 42 (printed page 36), printed question 44; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p42-q44 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the stem was extracted as "As regard the sacromere all is true, EXCEPT". Read as "sarcomere"; the book’s own spelling of the stem is otherwise reproduced.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-AAC2E01A4FB6

## title
As regards transverse tubules all is true, EXCEPT:

## question
As regards transverse tubules all is true, EXCEPT:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student is asked which of four statements about the T tubule belongs instead to the sarcoplasmic reticulum.

## format
single best answer

## derived_from
Question 45 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p42-q45 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
It increases the surface area of the cell membrane

## explanation_a
True, so not the answer. The T tubule is an invagination of the muscle fibre membrane, so it adds to the surface area and carries extracellular fluid deep into the fibre.

## answer_b
It transmits the action potential to the inside of the muscle fibre

## explanation_b
True, so not the answer. The action potential spreads over the muscle membrane and into the T tubules, which is how a surface signal reaches every myofibril at once.

## answer_c
It acts as a Ca2+ store

## explanation_c
False, and therefore the answer. Calcium is stored in the sarcoplasmic reticulum, whose expanded ends form the terminal cisternae and which holds a high concentration of calcium; the T tubule contains extracellular fluid. The two are in contact — a T tubule between two terminal cisternae forms a triad, and foot processes link the tubule’s dihydropyridine receptor to the reticulum’s ryanodine channel — and it is that intimacy which makes the swap so easy to fall for.

## answer_d
It is absent in smooth muscle fibres

## explanation_d
True, so not the answer. Smooth muscle differs greatly from striated muscle in structure and in excitation–contraction coupling, and it has caveolae rather than a T-tubule system.

## topic
Neurophysiology

## subtopic
Tubular system

## main_concept
CON-MSK-BD54A250111D42

## concept_ids
CON-MSK-3013AA61E917B7

## contextual_concept_ids


## difficulty
Moderate

## question_type
Anatomy

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
8

## clinical_relevance
0.4

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Tubular System

## question_only_for


## library_ids
ART-MSK-TOP-B54C248DF1

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Separate the functions of the T tubule from those of the sarcoplasmic reticulum, and describe the triad that links them.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 42 (printed page 36), printed question 45; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p42-q45 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the stem was extracted as "As regard transverse tubules allis true, EACSPT". Read as "As regards transverse tubules all is true, EXCEPT", confirmed against the pattern of the neighbouring printed items.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-496DD56C2D8C

## title
Pale (fast) fibres:

## question
Pale (fast) fibres:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A sprinter’s muscle is examined and the properties of its predominant fibre type are listed.

## format
single best answer

## derived_from
Question 46 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p42-q46 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Contain many blood capillaries

## explanation_a
Fast fibres contain less blood supply. Extensive capillaries belong to the slow red fibre, which needs a continuous oxygen delivery for its aerobic metabolism.

## answer_b
Do not show fatigue

## explanation_b
It is the reverse of the truth. Fast fibres have less resistance to fatigue, precisely because they work anaerobically and accumulate lactic acid; slow fibres are the fatigue-resistant ones.

## answer_c
Contain a high concentration of myoglobin

## explanation_c
High myoglobin is the property that makes the slow fibre red — myoglobin stores oxygen until it is needed. A pale fibre is pale because it has little of it.

## answer_d
Depend mainly on anaerobic oxidation

## explanation_d
Fast, pale, type IIb fibres carry large amounts of glycolytic enzymes for rapid release of energy by the glycolytic process, along with a high ATPase activity and an extensive sarcoplasmic reticulum for rapid calcium release. They therefore depend mainly on anaerobic metabolism, contract rapidly and powerfully, and fatigue quickly. Note that this item and printed question 43 are the same table asked from opposite sides, so a student who learns one column without the other will get one of the pair wrong.

## topic
Neurophysiology

## subtopic
Type of muscle fibres

## main_concept
CON-MSK-3E5F54D8D58E9C

## concept_ids
CON-MSK-C693745576251C

## contextual_concept_ids


## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
72

## exam_relevance
8

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Identify the pale fast fibre as glycolytic, powerful and quick to fatigue.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 42 (printed page 36), printed question 46; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p42-q46 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the stem was extracted as "Pale (fast) fixer". Read as "Pale (fast) fibre", which is the term used in the neighbouring printed item 43 and in the department book’s own table.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-084F30B8D932

## title
The functions of tropomyosin in skeletal muscle include:

## question
The functions of tropomyosin in skeletal muscle include:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A resting muscle fibre is examined, and the protein that keeps the myosin-binding sites unavailable is identified.

## format
single best answer

## derived_from
Question 47 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p42-q47 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Releasing calcium after initiation of contraction

## explanation_a
Calcium is released from the terminal cisternae of the sarcoplasmic reticulum and taken back by the calcium pump on its membrane. Tropomyosin neither stores nor releases calcium; the protein that binds it is troponin C.

## answer_b
Sliding on actin to produce contraction

## explanation_b
What slides is the actin filament, driven by the bending of the myosin cross-bridges. Tropomyosin lies along the actin filament and moves aside, but it does not itself produce movement.

## answer_c
Acting as a relaxing protein at rest by covering up the sites where myosin binds to actin

## explanation_c
At rest, tropomyosin molecules cover the active sites on actin, so the myosin cross-bridges cannot bind and the muscle stays relaxed — it is a relaxing protein, and relaxation is an actively maintained state rather than a mere absence of stimulus. Troponin molecules attach tropomyosin to actin, and when calcium binds troponin C the complex changes conformation and tropomyosin moves away from the binding site. Once uncovered, the site combines with the cross-bridge and contraction begins.

## answer_d
Binding to myosin during contraction

## explanation_d
The partners are wrong. Myosin binds actin, at the active site tropomyosin has just uncovered. Tropomyosin’s own attachments are to actin, along which it lies, and to troponin T.

## topic
Neurophysiology

## subtopic
The muscle proteins

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids
CON-MSK-B2B106C1D81C30

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
66

## exam_relevance
9

## clinical_relevance
0.45

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > The Muscle Proteins

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Describe tropomyosin as the relaxing protein that covers the actin active site, and state what moves it.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 42 (printed page 36), printed question 47; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p42-q47 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-CF9C1DDC899C

## title
Contraction of skeletal muscle:

## question
Contraction of skeletal muscle:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
The same muscle is made to contract twice, once against a load too heavy to lift and once against a light one.

## format
single best answer

## derived_from
Question 48 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p42-q48 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Starts after the action potential is over

## explanation_a
The action potential precedes contraction by about 2 msec and overlaps it: because the electrical event is over before the mechanical one finishes, the fibre has regained its excitability by the time it begins to contract, which is precisely why skeletal muscle can be tetanised.

## answer_b
Decreases in magnitude with repeated stimulation

## explanation_b
This does not hold as a general statement about contraction. A decrease with repeated stimulation is fatigue, which follows prolonged and strong contraction; the immediate effect of rapidly repeated stimulation on a fresh muscle is the opposite — incomplete or complete tetanus, in which tension rises to about four times that of a single twitch because calcium accumulates in the myofibrils.

## answer_c
Produces more work when the muscle contracts isometrically than when it contracts isotonically

## explanation_c
It is the trap: this option and the correct one differ by a single word. No external work is done in an isometric contraction, because the load is not moved; work requires a distance. Isotonic contraction moves the load and therefore does external work, with a mechanical efficiency of 20 to 25 per cent against zero for isometric.

## answer_d
Produces more tension when the muscle contracts isometrically than when it contracts isotonically

## explanation_d
In an isometric contraction the muscle cannot shorten because the load is too heavy, so the sarcomeres shorten internally, stretch the series elastic elements, and tension inside the muscle rises to its maximum while the length of the whole muscle stays constant. In an isotonic contraction tension stays constant once it is enough to lift the load, and the muscle shortens instead. Hence more tension isometrically, more work isotonically — and note that a real lift starts isometric and becomes isotonic the moment the tension exceeds the load.

## topic
Neurophysiology

## subtopic
Basic differences between isometric and isotonic contractions

## main_concept
CON-MSK-9EA962E7584693

## concept_ids
CON-MSK-44C3DFD7D9FA03

## contextual_concept_ids


## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.6

## setting
Academic

## reasoning_level
3

## inferred_difficulty
48

## exam_relevance
2

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.15

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Basic differences between isometric and isotonic contractions
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Types of Skeletal Muscle Contraction

## question_only_for


## library_ids
ART-MSK-TOP-17872815ED

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Distinguish tension from work across isometric and isotonic contraction, and describe the sequence in a real lift.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 42 (printed page 36), printed question 48; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p42-q48 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: option C was extracted as "when the muscle contracts sometrically". Read as "isometrically"; options C and D are printed as a matched pair differing only in "work" and "tension", which is what the item is testing.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
Excluded topic: the Physiology department excludes this section from the 2025-2026 final theoretical exam by its own announcement. The question book still asks it and a student may still meet it, so it is authored — but exam_relevance and exam_weight_by_year are set low deliberately and must not be read as evidence that it is examined.

---

# Item

## id
QM-103-B6FF1955E08E

## title
Increasing the afterload on a skeletal muscle fibre:

## question
Increasing the afterload on a skeletal muscle fibre:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
The same muscle lifts a series of progressively heavier weights, and the speed and extent of each lift are recorded.

## format
single best answer

## derived_from
Question 49 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p42-q49 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Decreases the velocity of shortening

## explanation_a
The afterload is the weight the muscle must lift, encountered only after it starts to contract. As the afterload increases, the velocity of shortening decreases, because each cross-bridge cycle takes longer. The maximal velocity of shortening occurs at zero load and is theoretical, since a load can never truly be zero. With heavier loads the isometric phase before the lift also lasts longer, since more tension must be built before the load moves.

## answer_b
Increases the velocity of shortening

## explanation_b
It inverts the load–velocity relationship. A student who reasons that a bigger load calls forth a bigger effort and therefore a faster movement is reasoning about voluntary effort rather than about the mechanics of the cross-bridge.

## answer_c
Increases the degree of shortening

## explanation_c
The amount of shortening also decreases as the afterload increases, so both the speed and the extent of the movement fall. Getting one of the two right and the other wrong is a common half-answer here.

## answer_d
Decreases the number of muscle fibres

## explanation_d
The number of fibres in a muscle is fixed; what varies with effort is how many motor units are recruited and how often they discharge. Loading a muscle does not remove fibres from it, and no part of the length–tension or load–velocity relationship concerns fibre number.

## topic
Neurophysiology

## subtopic
Load-velocity relationship

## main_concept
CON-MSK-D5976D2FF54887

## concept_ids
CON-MSK-428DE35CFBFA70

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
66

## exam_relevance
8

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## question_only_for


## library_ids
ART-MSK-TOP-17872815ED

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Define afterload and predict the effect of increasing it on the velocity and extent of shortening.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 42 (printed page 36), printed question 49; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p42-q49 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-E8CB66748C9F

## title
The action potential of skeletal muscle:

## question
The action potential of skeletal muscle:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A student meets the same four statements as in printed question 31, reordered, and must again identify the true one.

## format
single best answer

## derived_from
Question 50 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p43-q50 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Is longer than the action potential of cardiac muscle

## explanation_a
The skeletal muscle action potential lasts 2 to 4 msec; the cardiac one is much longer, because of its plateau. That length is what gives cardiac muscle a refractory period covering almost the whole contraction, so that it cannot be tetanised.

## answer_b
Has a prolonged plateau phase

## explanation_b
The plateau belongs to cardiac muscle. The electrical events in skeletal muscle are like those in nerve with some differences — a resting potential of about −90 mV, a spike of 2 to 4 msec, conduction along the fibre at about 5 m/sec, and the action potential preceding contraction by about 2 msec.

## answer_c
Spreads inward to all parts of the muscle via the T tubules

## explanation_c
The T tubules are invaginations of the surface membrane carrying extracellular fluid into the depth of the fibre, and the action potential spreads over the membrane and into them. This is what allows a single surface event to reach every myofibril simultaneously: the tubule’s dihydropyridine receptor senses the depolarisation and opens the ryanodine calcium channel of the adjacent terminal cisterna.

## answer_d
Causes immediate uptake of Ca2+ into the sarcoplasmic reticulum

## explanation_d
The direction is reversed. What the action potential causes is calcium release from the terminal cisternae into the cytoplasm. Uptake back into the reticulum, by the calcium pump on its membrane, is the relaxation step and happens after the stimulus ends.

## topic
Neurophysiology

## subtopic
Changes following skeletal muscle stimulation

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids
CON-MSK-1AA4B301236114

## contextual_concept_ids


## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
8

## clinical_relevance
0.45

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Changes Following Skeletal Muscle Stimulation

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Give the electrical properties of the skeletal muscle action potential and separate calcium release from calcium reuptake.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 43 (printed page 37), printed question 50; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p43-q50 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
This item repeats printed question 31 of the same chapter with the options reordered and one option replaced. Both are authored, because both are separate occurrences the book prints and a student will meet each; they share a main concept, which is what makes the repetition blueprint evidence rather than duplication.

---

# Item

## id
QM-103-D6B6C1ACD9C9

## title
Which statement concerning propagation of the action potential along the nerve fibre is correct?

## question
Which statement concerning propagation of the action potential along the nerve fibre is correct?

## subject
neuro

## status
Draft

## owner
Claude

## vignette
An action potential is initiated in the middle of an isolated axon and recorded at electrodes on both sides of the stimulating point.

## format
single best answer

## derived_from
Question 51 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p43-q51 and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
The magnitude of the action potential decreases as it is conducted along the axon

## explanation_a
It confuses the action potential with the local response. The magnitude of the action potential does not change as it is conducted along the axon, because each segment regenerates it in full — that is what the all-or-none law means for a propagated impulse. It is the local response that fades, within 1 to 2 mm.

## answer_b
The speed of conduction is directly proportional to the square root of the fibre diameter

## explanation_b
The speed of propagation is proportional to the square root of the fibre diameter, which is why the classification of nerve fibres by thickness is also a classification by velocity: A fibres of 2 to 20 µ conduct at 20 to 120 m/sec, B fibres of 1 to 5 µ at 5 to 15 m/sec, and C fibres of under 1 µ at 0.5 to 2 m/sec. Myelination multiplies this further, since saltatory conduction raises velocity up to fifty-fold and the internodal distance itself increases with diameter.

## answer_c
Conduction occurs in one direction only

## explanation_c
This does not hold for the axon, though it is true of the intact pathway, which is what makes it the best distractor here. If a fibre is stimulated in the middle, the impulse travels in both directions and two impulses are set up. One-way traffic in the living animal is imposed by the synapses, which conduct in one direction only, so antidromic impulses die at the first synapse they meet.

## answer_d
It is an active process depending on ATP

## explanation_d
Propagation itself is passive: local circuits of current flow between the depolarised segment and the adjacent resting ones, depolarising them to threshold. ATP is consumed afterwards, by the Na+–K+ pump re-establishing the concentration differences, not during the conduction of the impulse.

## topic
Neurophysiology

## subtopic
Conduction [Propagation] of the action potential

## main_concept
CON-NEU-A0C8307D2825A6

## concept_ids
CON-NEU-5664D7AB68AD8D

## contextual_concept_ids


## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.6

## setting
Academic

## reasoning_level
3

## inferred_difficulty
50

## exam_relevance
8

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Conduction [Propagation] of the Action Potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
State the relationship between fibre diameter and conduction velocity, and explain why an axon conducts both ways while a pathway does not.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 43 (printed page 37), printed question 51; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p43-q51 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the stem was extracted as "Concerning propagation of action poteniial along the nerve fiver". Read as "action potential along the nerve fibre".
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-8EAEB2AC7687

## title
The muscle weakness of myasthenia gravis is caused by antibodies against which of the following?

## question
The muscle weakness of myasthenia gravis is caused by antibodies against which of the following?

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A woman’s eyelids droop by the end of the day and her limbs tire rapidly. She improves markedly after a dose of neostigmine.

## format
single best answer

## derived_from
Question 52 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p43-q52 and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Acetylcholine

## explanation_a
Acetylcholine is a small molecule released from the nerve ending, not the antigen. The transmitter is released normally in myasthenia gravis; what fails is the response to it.

## answer_b
Nicotine

## explanation_b
Nicotine is an exogenous drug which, in small doses, stimulates neuromuscular transmission by an acetylcholine-like action. It is not present in the body as an antigen, and the option is offered because the receptor at this junction is a nicotinic one.

## answer_c
Acetylcholinesterase

## explanation_c
It is the strongest distractor because the enzyme is central to the treatment. Anticholinesterase drugs such as neostigmine are what relieve the disease, by letting adequate amounts of acetylcholine accumulate. The enzyme is the therapeutic target, not the autoimmune one, and swapping the two makes the treatment inexplicable.

## answer_d
Acetylcholine receptors

## explanation_d
Myasthenia gravis is an autoimmune disease caused by antibodies against the acetylcholine receptors of the motor end plate. With fewer functioning receptors the end-plate potential may fail to bring the muscle membrane to its firing level, so the junction cannot transmit enough signals from nerve to muscle: skeletal muscles are weak and tire easily, and in severe disease the patient may die of paralysis of the respiratory muscles. Treatment with an anticholinesterase such as neostigmine works by raising the concentration of transmitter at the reduced number of surviving receptors.

## topic
Neurophysiology

## subtopic
Myasthenia gravis

## main_concept
CON-MSK-5C2B5DD83C1805

## concept_ids
CON-MSK-77D955AAB4D0FA

## contextual_concept_ids


## difficulty
Easy

## question_type
Pathophysiology

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
76

## exam_relevance
9

## clinical_relevance
0.95

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission

## question_only_for


## library_ids
ART-103-PHY-NEUROMUSCULAR-TRANSMISSION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Name the acetylcholine receptor as the antigen in myasthenia gravis and explain why an anticholinesterase relieves it.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 43 (printed page 37), printed question 52; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p43-q52 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-7232D82560A4

## title
Which of the following will increase the velocity of action potential propagation?

## question
Which of the following will increase the velocity of action potential propagation?

## subject
neuro

## status
Draft

## owner
Claude

## vignette
The same question as printed item 34 is asked again, with the fourth option changed from internodal distance to the temperature of the nerve’s environment.

## format
single best answer

## derived_from
Question 53 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p43-q53 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Myelination of the axon

## explanation_a
Myelination gives saltatory conduction, in which the impulse is regenerated only at the nodes of Ranvier and jumps between them, raising the velocity up to fifty-fold and conserving the energy the Na+–K+ pump would otherwise spend. The other determinants of velocity are the fibre diameter, to whose square root the speed is proportional, and the internodal distance, which increases with diameter.

## answer_b
Decrease in axon diameter

## explanation_b
It is the wrong direction. Speed rises with diameter, not with thinness: the thick A fibres conduct at up to 120 m/sec and the thin C fibres at 0.5 to 2 m/sec.

## answer_c
Absence of myelin sheath

## explanation_c
Without a sheath, conduction is continuous along the whole membrane and therefore slow. This is option A restated as its own negation, so the two cannot both be right.

## answer_d
Cold nerve environment

## explanation_d
Cold slows nerve conduction; nothing about the mechanism of propagation offers cooling as a way to speed an impulse, and a student picking it is reasoning from an association between cold and preservation rather than from the mechanism.

## topic
Neurophysiology

## subtopic
Conduction [Propagation] of the action potential

## main_concept
CON-NEU-A0C8307D2825A6

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
80

## exam_relevance
8

## clinical_relevance
0.5

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Conduction [Propagation] of the Action Potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Name myelination as the factor that increases conduction velocity, and rule out reduced diameter and cooling.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 43 (printed page 37), printed question 53; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
40

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p43-q53 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "none".
The bank carried correct: null for this item. The printed answer key on PDF page 44 (printed page 38) was opened with the Read tool and read visually; it names this letter. The answer was not inferred.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
A near-duplicate of printed question 34 of the same chapter, differing only in option D. Both are authored as separate occurrences of the same tested idea; they share a main concept, so the repetition is blueprint evidence rather than duplication.

---

# Item

## id
QM-103-2B8C09EE029B

## title
Regarding the biphasic action potential, all are true EXCEPT:

## question
Regarding the biphasic action potential, all are true EXCEPT:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
Two recording electrodes are placed on a nerve and a wave is recorded that first deflects one way and then the other.

## format
single best answer

## derived_from
Question 54 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p43-q54 and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
One of the recording electrodes is placed on the inner, while the other is placed on the outer surface of the cell membrane

## explanation_a
False, and therefore the answer. That arrangement — one electrode inside the fibre and an indifferent electrode on the outer surface — is how a monophasic action potential is recorded. A biphasic recording has both electrodes on the outside, which is exactly what option C says, so options A and C contradict each other and one of them must be the false statement.

## answer_b
It is used clinically to find the site of damage in a nerve pathway

## explanation_b
True, so not the answer. Because the second phase disappears when the nerve between the electrodes cannot conduct, the recording can be used to localise damage along a pathway.

## answer_c
Recording electrodes are placed on the outer surface of the cell membrane

## explanation_c
True, so not the answer. In a biphasic recording both electrodes sit on the outer surface of the nerve fibre. At rest there is no potential difference between them; as the wave of depolarisation reaches the electrode nearer the stimulator, that electrode becomes negative relative to the other; when the impulse lies between the two, the potential returns to zero; as it passes the second electrode, the first becomes positive relative to the second and a wave is recorded in the opposite direction; and when the impulse leaves the second electrode no potential difference remains. Two deflections, hence biphasic.

## answer_d
It returns to a unipolar AP if the nerve is damaged in between the recording electrodes

## explanation_d
True, so not the answer. Crushing or destroying the portion of nerve between the two electrodes, or the region under the second electrode, makes the recording monophasic — the second deflection never appears because no impulse reaches the second electrode.

## topic
Neurophysiology

## subtopic
Monophasic and biphasic action potential

## main_concept
CON-NEU-8E195C4C7D9BFF

## concept_ids


## contextual_concept_ids


## difficulty
Hard

## question_type
Investigation

## cognitive_effort
High

## cognitive_effort_score
0.6

## setting
Academic

## reasoning_level
3

## inferred_difficulty
48

## exam_relevance
2

## clinical_relevance
0.5

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.15

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Monophasic and Biphasic Action Potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Distinguish monophasic from biphasic recording by electrode placement, and explain the two deflections.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 43 (printed page 37), printed question 54; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p43-q54 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
Excluded topic: the Physiology department excludes this section from the 2025-2026 final theoretical exam by its own announcement. The question book still asks it and a student may still meet it, so it is authored — but exam_relevance and exam_weight_by_year are set low deliberately and must not be read as evidence that it is examined.

---

# Item

## id
QM-103-9E6B90948A56

## title
Compound action potential:

## question
Compound action potential:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A recording is made from a whole peripheral nerve trunk rather than from a single fibre, and the trace has several peaks and grows with stimulus strength.

## format
single best answer

## derived_from
Question 55 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p44-q55 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Is recorded by repetitive stimulation of a single nerve fibre

## explanation_a
A compound action potential is recorded from a nerve trunk, which is made of many fibres; it is the simultaneous activity of a population, not the repeated activity of one fibre. Repetitive stimulation of a single fibre would give a train of identical all-or-none spikes.

## answer_b
Can be obtained by application of subthreshold stimuli to a mixed nerve

## explanation_b
Subthreshold stimuli produce no response at all. The graded behaviour begins at threshold, when the fibres of lowest threshold respond and a small potential is recorded.

## answer_c
Is a graded potential

## explanation_c
The compound action potential is graded: subthreshold stimuli give no response; a threshold stimulus excites the fibres of lowest threshold and a small potential appears; a supra-threshold stimulus increases the amplitude, up to a maximum at maximal stimulation; and supramaximal stimuli produce no further increase. It also has many peaks, because the fibres of a trunk differ in their thresholds, in their distance from the stimulating electrodes, and in their conduction speed, so activity in fast fibres arrives at the recording electrode before activity in slow ones.

## answer_d
Obeys the all-or-none law

## explanation_d
It is the distinction the item exists to draw. A single fibre obeys the all-or-none law; a nerve trunk does not, because it is a population of fibres with different thresholds and increasing the stimulus recruits more of them. Applying a single-fibre law to a whole nerve is the error.

## topic
Neurophysiology

## subtopic
Action potential in nerve trunk "Compound action potential"

## main_concept
CON-NEU-18D07BA4202CDA

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Investigation

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
58

## exam_relevance
2

## clinical_relevance
0.5

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.15

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Action Potential in Nerve Trunk "Compound Action Potential"

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Explain why a compound action potential is graded and multi-peaked while a single fibre is all-or-none.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 44 (printed page 38), printed question 55; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p44-q55 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "none".
The bank carried correct: null for this item. The printed answer key on PDF page 44 (printed page 38) was opened with the Read tool and read visually; it names this letter. The answer was not inferred.
OCR repair: the extraction carries the ion superscripts as stray punctuation throughout this book (Na*, K", Ca**) and misreads some initial capitals (ls for Is, tne for the). Repaired to Na+, K+, Ca2+ and to standard spelling. No word was changed beyond restoring what the printed page shows.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
Excluded topic: the Physiology department excludes this section from the 2025-2026 final theoretical exam by its own announcement. The question book still asks it and a student may still meet it, so it is authored — but exam_relevance and exam_weight_by_year are set low deliberately and must not be read as evidence that it is examined.

---

# Item

## id
QM-103-0F8BFA2767BB

## title
Familial periodic paralysis is due to:

## question
Familial periodic paralysis is due to:

## subject
neuro

## status
Draft

## owner
Claude

## vignette
A young man has recurrent attacks of flaccid weakness. Between attacks he is normal, and each attack resolves after intravenous potassium.

## format
single best answer

## derived_from
Question 56 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as MCQ-102-2093c80b-p44-q56 and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Decreased ATP synthesis in skeletal muscle

## explanation_a
A failure of ATP synthesis would prevent cross-bridge detachment and give contracture, as in rigor mortis, not the flaccid paralysis described. It is offered because ATP depletion is a genuine cause of muscle fatigue, which is a different state.

## answer_b
Decreased release of acetylcholine at the motor end plate

## explanation_b
Reduced acetylcholine release is what excess magnesium produces, by competing with calcium at the nerve ending. This is a real mechanism of weakness, but it is not the one that names this disease or that responds to potassium.

## answer_c
Extracellular K+ concentration is decreased

## explanation_c
Familial periodic paralysis is a hereditary disease in which the extracellular potassium concentration is decreased. Because the resting membrane potential depends primarily on the potassium concentration gradient, a fall in extracellular potassium hyperpolarises the membrane; excitability is greatly reduced, no nerve impulses are produced, and the person becomes paralysed. It is treated by intravenous administration of potassium, which is both the confirmation of the mechanism and the reason the stem’s history is diagnostic.

## answer_d
Decreased calcium concentration in the synaptic cleft

## explanation_d
Calcium entry into the nerve ending triggers vesicle rupture and transmitter release, so a low calcium there would impair transmission — but extracellular hypocalcaemia in fact increases nerve excitability by raising sodium permeability, which is the opposite of paralysis. Two different calcium effects sit close together in this chapter and this option exploits the overlap.

## topic
Neurophysiology

## subtopic
Factors that affect the excitability of the nerve

## main_concept
CON-NEU-77596C8A899A7E

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
3

## inferred_difficulty
62

## exam_relevance
8

## clinical_relevance
0.9

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Factors that affect the excitability of the nerve

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Explain the paralysis of familial periodic paralysis from a low extracellular potassium hyperpolarising the membrane, and give its treatment.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 44 (printed page 38), printed question 56; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as MCQ-102-2093c80b-p44-q56 and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b)".
Read off the printed answer key on PDF page 44 (printed page 38) with the Read tool, and it agrees with the letter the 102 lane recorded.
OCR repair: the extraction ran the whole printed answer key and the chapter’s short-answer question list into options D and E of this item, because they are printed on the same page. PDF page 44 was opened with the Read tool: option D is printed as "Decreased calcium concentration in synaptic cleft" and ends there, and there is no option E. Options trimmed to the four printed. The swallowed key table is what allowed a second, independent reading of every answer in this chapter, and it agrees with the key page in every row.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.

---

# Item

## id
QM-103-588A6DD62914

## title
Which statement concerning isometric and isotonic muscle contractions is correct?

## question
Which statement concerning isometric and isotonic muscle contractions is correct?

## subject
neuro

## status
Draft

## owner
Claude

## vignette
The same muscle is made to contract twice against different loads, and the energy each contraction consumes is measured.

## format
single best answer

## derived_from
Question 26 of the Nerve and Muscle chapter of the Kasr Al Ainy Physiology department question book, extracted by the 102 INT lane as (none — swallowed into option D of MCQ-102-2093c80b-p38-q25) and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Isometric contraction does not require sliding of actin filaments

## explanation_a
It is the subtlest option here. The whole muscle does not shorten in an isometric contraction, but the sarcomeres within the myocytes do shorten, stretching the series elastic elements. Cross-bridges cycle and filaments slide in both kinds of contraction — what differs is whether that internal shortening is spent on the elastic elements or on moving the load. Isometric contraction involves less sliding, not none.

## answer_b
During isometric contraction a load is moved and work is done

## explanation_b
It swaps the two definitions. No external work is done in an isometric contraction, precisely because the load is not moved; work needs a distance. Moving a load is what isotonic contraction does.

## answer_c
During isotonic contraction a greater amount of energy is needed

## explanation_c
Isometric contraction needs less energy since the load is not moved, and isotonic contraction needs greater energy since the load is moved a distance. The mechanical efficiency follows from that — zero for isometric, 20 to 25 per cent for isotonic — because efficiency is the share of energy input converted into work, and isometric contraction converts none. Hold the pair together: isometric develops more tension, isotonic does more work and costs more energy.

## answer_d
During isotonic contraction the muscle length is not changed

## explanation_d
It is the definition of isometric applied to isotonic. In an isotonic contraction tension stays constant while the muscle shortens; in an isometric one length stays constant while tension rises. The names record which quantity is held fixed — iso-metric, same length; iso-tonic, same tension.

## topic
Neurophysiology

## subtopic
Basic differences between isometric and isotonic contractions

## main_concept
CON-MSK-9EA962E7584693

## concept_ids
CON-MSK-44C3DFD7D9FA03

## contextual_concept_ids


## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.6

## setting
Academic

## reasoning_level
3

## inferred_difficulty
50

## exam_relevance
2

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.15

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Basic differences between isometric and isotonic contractions
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Types of Skeletal Muscle Contraction

## question_only_for


## library_ids
ART-MSK-TOP-17872815ED

## resource_ids
src_59643edb9d371bcefa2c


## learning_objective
Contrast isometric and isotonic contraction across tension, length, work, energy and mechanical efficiency.

## source_citation
Kasr Al Ainy, Physiology department question book (Physio MCQ First Year), Nerve and Muscle chapter, PDF page 39 (printed page 33), printed question 26; printed answer key on PDF page 44 (printed page 38). Manifest src_2093c80b1f9c25f9c0a4.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane as (none — swallowed into option D of MCQ-102-2093c80b-p38-q25) and tagged as taught by 103 BMS; this lane did not re-read the PDF to extract it.
correctSource, verbatim from the bank: "printed key (p44 of 2093c80b), read visually".
The printed key on PDF page 44 gives 26. c. Option C is "During Isotonic contraction a greater amount of energy is needed", which is also what the department book's own comparison table states. The answer was read, not inferred.
RECOVERED QUESTION. This item was never extracted: the 102 lane's OCR ran it into option D of printed question 25, which sits on the preceding PDF page, so it has no ID in scripts/kasr/extract/103-BMS/mcq-bank.json. It was recovered by opening PDF page 39 with the Read tool, where it is printed in full as question 26 with four options. Its question ID is minted on the same deterministic scheme as every other item in this file, from its own real printed number and the page it is printed on, so a repaired upstream extraction will mint this same ID rather than a duplicate. Printed question 25 has had the run-on trimmed and is authored separately.
resource_ids now names src_59643edb9d371bcefa2c, the catalogue record for the department Physiology of Nerve and Muscle (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported.
Excluded topic: the Physiology department excludes this section from the 2025-2026 final theoretical exam by its own announcement. The question book still asks it and a student may still meet it, so it is authored — but exam_relevance and exam_weight_by_year are set low deliberately and must not be read as evidence that it is examined.
