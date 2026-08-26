<!--
  AU-MED-105 Physiology · questions whose main_concept is a Kasr Year 1 id that
  exists only in docs/Kasr-Source-Imports/ (HIT-PENDING per the triage), per
  LANE-BRIEF §21 ("questions on a HIT-PENDING concept are authored now, not
  deferred"). Each record's main_concept is a sparse-updated id in
  pending-live/AU-MED-105-physiology.md; library_ids names the real Kasr
  article that already covers it — verified both ways (concept.article_ids
  AND article.related_concepts name each other; LANE-BRIEF §22's two-sided
  coverage rule), not merely inherited from the concept's own pointer:
    - CON-NEU-7A30FECF042995, CON-NEU-2235199E9F4373, CON-NEU-F119674A8DFD8D,
      CON-NEU-DD9033DCA3AAF1, CON-NEU-77596C8A899A7E ->
      ART-103-PHY-NERVE-ACTION-POTENTIAL (103-BMS-physiology.md /
      103-BMS-mcq-vitamins-nerve.md)
    - CON-NEU-1E66BE533E894C, CON-NEU-18D07BA4202CDA, CON-NEU-7E784A50D2BBAF,
      CON-NEU-A0C8307D2825A6, CON-NEU-5664D7AB68AD8D ->
      ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION (103-BMS-mcq-vitamins-nerve.md)
    - CON-MSK-3E5F54D8D58E9C -> ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING
      (103-BMS-mcq-vitamins-nerve.md)

  Apply only after pending-live/AU-MED-105-physiology.md's own targets
  (docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md and
  103-BMS-mcq-vitamins-nerve-concepts.md) are live. Omar imports Kasr Year 1
  before Alexandria (pending-live/INDEX.md carries the exact line).

  Validate with --with the Kasr concept AND article files:
    npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/AU-MED-105-physiology-questions.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-physiology.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-vitamins-nerve.md
  Prove the merge with medical:simulate, Kasr targets as plain args first:
    npm run medical:simulate -- docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md \
      docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md \
      docs/Kasr-Source-Imports/article/103-BMS-physiology.md \
      docs/Kasr-Source-Imports/article/103-BMS-mcq-vitamins-nerve.md \
      docs/Alexandria-Source-Imports/pending-live/AU-MED-105-physiology.md \
      docs/Alexandria-Source-Imports/pending-live/AU-MED-105-physiology-questions.md \
      --emit /tmp/sim-AU-105-PHYS-pending.json
-->

# Item

## title
Voltage-gated sodium channels are opened during which phase of the nerve action potential?

## question
Voltage-gated sodium channels are opened during which phase of the nerve action potential?

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
D

## answer_a
Isopotential state

## explanation_a
Incorrect. There is no distinct "isopotential state" phase in the standard description of the nerve action potential; this distractor names a state that does not correspond to a real point on the trace.

## answer_b
Descending limb

## explanation_b
Incorrect. The descending limb is repolarisation, driven by potassium efflux through voltage-gated potassium channels after the sodium channels have already inactivated, not by sodium channels opening.

## answer_c
Latent period

## explanation_c
Incorrect. The latent period is the delay between stimulus application and the first detectable membrane change, before any voltage-gated channel has opened; it precedes the action potential rather than being a phase of it.

## answer_d
Ascending limb

## explanation_d
Correct. The ascending (depolarising) limb of the nerve action potential is produced by the opening of voltage-gated sodium channels once the membrane reaches threshold, letting sodium rush in down its steep electrochemical gradient. This regenerative sodium influx is what drives the membrane potential rapidly from rest toward, and briefly past, zero. It is the defining event that distinguishes an actual action potential from a graded local response, which never opens these channels in a self-reinforcing way.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

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
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Action potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
State that voltage-gated sodium channel opening produces the ascending (depolarising) limb of the nerve action potential.

## source_citation
Alexandria University AU-MED-105 Physiology, Day 1 revision physiology MSK.pdf, p1.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
What is the state of the Na+ and K+ channels during the relative refractory period?

## question
What is the state of the Na+ and K+ channels during the relative refractory period?

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
C

## answer_a
K+ channels are closed but Na+ channels are opened

## explanation_a
Incorrect. This reverses the true picture: it is the potassium channels, not the sodium channels, that are still open at this point, while sodium channels are only partly recovered rather than fully open.

## answer_b
Both Na+ and K+ channels are opened

## explanation_b
Incorrect. If both channel types were fully open simultaneously the membrane would be held in an unstable, non-physiological state; the relative refractory period is specifically characterised by persisting potassium conductance against recovering, not fully open, sodium channels.

## answer_c
Na+ channels are closed but K+ channels are opened

## explanation_c
Correct. During the relative refractory period most voltage-gated sodium channels have returned from inactivation toward their resting (closed but available) state, while the voltage-gated potassium channels that repolarised the membrane are still open and conducting an elevated outward current. Because that ongoing potassium efflux keeps the membrane hyperpolarised and because only a fraction of sodium channels have recovered, a second action potential can still be fired but only by a stronger-than-threshold stimulus. This is exactly what makes the relative refractory period "relative" rather than absolute: excitability is reduced, not abolished.

## answer_d
Both Na+ and K+ channels are closed

## explanation_d
Incorrect. Both channel types closed describes the resting state between action potentials, not the relative refractory period, during which potassium channels are still actively open.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## main_concept
CON-NEU-F119674A8DFD8D

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
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Refractory periods

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
Describe the channel states underlying the relative refractory period.

## source_citation
Alexandria University AU-MED-105 Physiology, Day 1 revision physiology MSK.pdf, p4.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
The action potential of a neuron:

## question
The action potential of a neuron:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
B

## answer_a
Is not associated with any net movement of Na+ or K+ across the cell membrane.

## explanation_a
Incorrect. The action potential is defined precisely by net ionic movement: sodium moves in during depolarisation and potassium moves out during repolarisation, even though the bulk intracellular and extracellular ion concentrations barely change with any single impulse.

## answer_b
Is terminated by efflux of K+.

## explanation_b
Correct. Repolarisation, which ends the action potential and returns the membrane toward its resting potential, is produced by the efflux of potassium ions through voltage-gated potassium channels once sodium channels have inactivated. This potassium efflux carries positive charge back out of the cell, reversing the depolarisation produced moments earlier by sodium entry. It is this K+-driven termination, together with sodium channel inactivation, that limits the action potential's duration and allows the cycle to repeat.

## answer_c
Declines in amplitude as it moves along the axon.

## explanation_c
Incorrect. A nerve action potential is all-or-none and propagates without decrement along the axon; its amplitude does not decline with distance, unlike a graded local (electrotonic) potential.

## answer_d
Is initiated by efflux of Na+.

## explanation_d
Incorrect. The action potential is initiated by an influx, not an efflux, of Na+ through voltage-gated sodium channels opening at threshold.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## main_concept
CON-NEU-DD9033DCA3AAF1

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
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Repolarisation

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
State that repolarisation of the nerve action potential is produced by potassium efflux.

## source_citation
Alexandria University AU-MED-105 Physiology, Day 1 revision physiology MSK.pdf, p5.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
The local excitatory state is characterised by all of the following except:

## question
The local excitatory state is characterised by all of the following except:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
B

## answer_a
Does not obey the all-or-none rule.

## explanation_a
Incorrect as an exception, because this statement is true of the local response: unlike the all-or-none action potential, its size varies with stimulus strength, so it genuinely does not obey the all-or-none rule.

## answer_b
Propagated without decrement.

## explanation_b
Correct, this is the exception. The local (local excitatory) response is a graded, decremental potential: it spreads only a short, passive distance from its site of origin and dies away with distance rather than being regenerated and propagated without decrement the way a full action potential is. That non-propagated, decaying spread is exactly what distinguishes a local response from a true, self-regenerating action potential, even though both arise from the same excitable membrane.

## answer_c
Its magnitude is directly proportional to the intensity of the sub-minimal stimulus.

## explanation_c
Incorrect as an exception, because this statement is true: a sub-threshold (sub-minimal) stimulus produces a local response whose magnitude scales with that stimulus's intensity, which is the defining graded property of the response.

## answer_d
Can be summated.

## explanation_d
Incorrect as an exception, because local responses genuinely can summate, spatially or temporally, and enough summation can bring the membrane to threshold and trigger a true action potential.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

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
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Local response

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids


## learning_objective
Identify that the local excitatory state, unlike the action potential, is not propagated without decrement.

## source_citation
Alexandria University AU-MED-105 Physiology, Day 1 revision physiology MSK.pdf, p7.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
All of the following is true about the sodium-potassium pump except:

## question
All of the following is true about the sodium-potassium pump except:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
C

## answer_a
It helps to maintain normal ionic distribution across the nerve membrane.

## explanation_a
Incorrect as an exception, because maintaining the normal transmembrane distribution of sodium (low inside) and potassium (high inside) against their concentration gradients is exactly what the pump does, and is the basis for the resting membrane potential being sustainable over time.

## answer_b
It requires energy from ATP.

## explanation_b
Incorrect as an exception, because the pump is a primary active transporter that hydrolyses ATP directly to move both ions uphill against their electrochemical gradients.

## answer_c
It couples sodium and potassium transport in a ratio of 1:1.

## explanation_c
Correct, this is the exception. The Na+-K+ pump is not a 1:1 exchanger: for every cycle of ATP hydrolysis it extrudes three sodium ions and imports only two potassium ions, a 3:2 ratio. That unequal exchange of charge is precisely why the pump is electrogenic rather than electrically silent, which makes this option internally inconsistent with the true (d).

## answer_d
It is electrogenic.

## explanation_d
Incorrect as an exception, because the unequal 3-for-2 exchange of positive charge per cycle makes the pump net current-generating, i.e. electrogenic, contributing a small hyperpolarising component to the resting potential.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## main_concept
CON-NEU-1E66BE533E894C

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
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Sodium-potassium pump

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids


## learning_objective
Identify that the Na+-K+ pump exchanges ions in a 3:2, not 1:1, ratio.

## source_citation
Alexandria University AU-MED-105 Physiology, Day 1 revision physiology MSK.pdf, p8.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
The absolute refractory period coincides with:

## question
The absolute refractory period coincides with:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
A

## answer_a
The ascending limb of the spike and the upper third of the descending limb

## explanation_a
Correct. The absolute refractory period spans the entire ascending (depolarising) limb of the spike, where sodium channels are open or inactivating, and continues through roughly the upper third of the descending (repolarising) limb, while enough sodium channels remain inactivated that no stimulus of any strength can trigger a second action potential. Only once repolarisation has progressed far enough for a usable fraction of sodium channels to recover from inactivation does the absolute refractory period end and the relative refractory period begin. This timing is why the nerve's maximum possible firing frequency is limited by the duration of the action potential itself.

## answer_b
The whole of the descending limb only

## explanation_b
Incorrect. This understates the absolute refractory period, which begins earlier, at the start of the ascending limb, not only once repolarisation begins.

## answer_c
The interval between the end of one action potential and the start of the next

## explanation_c
Incorrect. That quiet interval is outside any refractory period at all; the absolute refractory period is defined within the spike itself, not in the gap between spikes.

## answer_d
The plateau of the cardiac action potential only

## explanation_d
Incorrect. A plateau is a feature of the cardiac, not the nerve, action potential; this question concerns the nerve fibre's own absolute refractory period, which has no plateau phase to coincide with.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## main_concept
CON-NEU-2235199E9F4373

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
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Refractory periods

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
State which portion of the nerve action potential coincides with the absolute refractory period.

## source_citation
Alexandria University AU-MED-105 Physiology, Day 1 revision physiology MSK.pdf, p9.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
Compared with an unmyelinated fibre of similar diameter, a myelinated nerve fibre:

## question
Compared with an unmyelinated fibre of similar diameter, a myelinated nerve fibre:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
B

## answer_a
Conducts more slowly, because the myelin sheath adds resistance to current spread

## explanation_a
Incorrect. Myelination is specifically what raises conduction velocity above that of an equivalent unmyelinated fibre, by enabling saltatory rather than continuous point-to-point conduction; the sheath speeds conduction rather than slowing it.

## answer_b
Has the highest conduction velocity, by conducting in a saltatory (node-to-node) fashion

## explanation_b
Correct. Myelinated fibres conduct by saltatory conduction, in which the action potential regenerates only at the nodes of Ranvier and the intervening myelinated internode is passively, almost instantaneously, depolarised by local current spread. Skipping from node to node rather than depolarising every patch of membrane in sequence is what gives myelinated fibres a much higher conduction velocity than unmyelinated fibres of comparable diameter, alongside a lower energy cost per impulse. This is the physiological basis for demyelinating disease slowing conduction so markedly.

## answer_c
Conducts at the same velocity, because conduction velocity depends only on fibre diameter

## explanation_c
Incorrect. Diameter is only one determinant of conduction velocity; myelination is a second, independent determinant, which is exactly why a myelinated and an unmyelinated fibre of the same diameter still conduct at very different speeds.

## answer_d
Conducts by continuous, point-to-point conduction, the same mechanism as an unmyelinated fibre

## explanation_d
Incorrect. Continuous, point-to-point conduction is specifically the unmyelinated fibre's mechanism; a myelinated fibre conducts by the opposite mechanism, saltatory conduction between nodes of Ranvier.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

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
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Conduction of the nerve impulse

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids


## learning_objective
State that myelinated fibres conduct faster than unmyelinated fibres because of saltatory conduction.

## source_citation
Alexandria University AU-MED-105 Physiology, Day 1 revision physiology MSK.pdf, p10.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
Which fibre type sustains an athlete through hours of marathon running or cycling?

## question
Which fibre type sustains an athlete through hours of marathon running or cycling?

## subject
msk

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
A

## answer_a
Type I (slow, red, oxidative) fibres

## explanation_a
Correct. Endurance events such as marathon running rely predominantly on type I (slow, red, oxidative) fibres, which are rich in mitochondria and myoglobin and resist fatigue over long, low-to-moderate intensity efforts. Type II (fast, pale, glycolytic) fibres generate powerful, rapid contractions but fatigue quickly, which makes them suited to short bursts of high-intensity activity such as sprinting, not sustained hours-long endurance exercise. Recruiting mainly type I fibres for a marathon is exactly why endurance athletes' muscle biopsies show a predominance of that fibre type.

## answer_b
Type II (fast, pale, glycolytic) fibres

## explanation_b
Incorrect. Type II fibres are the fast, fatigue-prone, glycolytic fibres suited to brief powerful efforts, which is the opposite of what sustains hours of endurance exercise.

## answer_c
Both fibre types contribute equally, with no predominance either way

## explanation_c
Incorrect. Endurance performance is specifically associated with a predominance of type I fibres in the muscles used, not an even split between the two types.

## answer_d
Neither type; endurance exercise is sustained mainly by smooth muscle activity

## explanation_d
Incorrect. Locomotion during running or cycling is produced by skeletal, not smooth, muscle; smooth muscle plays no role in sustaining the limb movements of endurance exercise.

## topic
Musculoskeletal Physiology

## subtopic
Skeletal Muscle

## main_concept
CON-MSK-3E5F54D8D58E9C

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
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Skeletal muscle physiology > Fibre types

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids


## learning_objective
Identify that endurance exercise is sustained mainly by fatigue-resistant type I, not type II, muscle fibres.

## source_citation
Alexandria University AU-MED-105 Physiology, Day 1 revision physiology MSK.pdf, p11.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
Regarding the physiology of the active (Na-K) pump, which of the following is true:

## question
Regarding the physiology of the active (Na-K) pump, which of the following is true:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
E

## answer_a
It is a trans-membrane protein showing a large number of binding sites on its interior aspect

## explanation_a
Incomplete alone. This is true of the pump, but so are the other statements, which is why "all is true" rather than any single option is the complete answer.

## answer_b
Inner ATPase activity is concerned with producing a conformational change followed by 2 K+ pumped inside

## explanation_b
Incomplete alone. This correctly describes the ATPase-driven conformational change, but it is only one step of the full mechanism the other options also describe correctly.

## answer_c
Ions migrate uphill against both concentration and electrical gradients

## explanation_c
Incomplete alone. This is true — both ions move uphill — but selecting only this option omits the equally correct mechanistic detail in the others.

## answer_d
Binding of Na and K to their respective binding sites is followed by activation of the inner ATPase

## explanation_d
Incomplete alone. This correctly describes what triggers ATPase activation, but the complete answer requires recognising every listed statement as true.

## answer_e
All is true

## explanation_e
Correct. Every statement listed is an accurate part of the Na+-K+ pump's mechanism: it is a transmembrane protein with interior-facing binding sites, binding of Na+ and K+ to those sites activates its inner ATPase, ATP hydrolysis drives a conformational change that completes transport (extruding three Na+ and importing two K+ per cycle), and because both ions are moved against their combined concentration and electrical gradients, the whole process is active transport requiring direct ATP energy. Taken together these four statements describe the same single pump cycle from binding through hydrolysis to ion translocation.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## main_concept
CON-NEU-1E66BE533E894C

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
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Sodium-potassium pump

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids


## learning_objective
Recognise that the Na+-K+ pump's binding, ATPase activation, conformational change and uphill ion transport are all correct parts of one mechanism.

## source_citation
Alexandria University AU-MED-105 Physiology, lec 1&2 physiology MSK.pdf, p1.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
The main cause of depolarization of the nerve is:

## question
The main cause of depolarization of the nerve is:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
B

## answer_a
K efflux

## explanation_a
Incorrect. Potassium efflux produces repolarisation, the falling limb that follows depolarisation, not depolarisation itself.

## answer_b
Na influx

## explanation_b
Correct. Depolarisation of the nerve membrane is produced by the influx of sodium ions once voltage-gated Na+ channels open at threshold, driving the membrane potential rapidly from its negative resting value toward, and briefly past, zero. This regenerative Na+ entry is the defining event of the ascending limb of the action potential.

## answer_c
Cl efflux

## explanation_c
Incorrect. Chloride movement is not the driver of nerve depolarisation; the depolarising current is carried by sodium influx through voltage-gated channels.

## answer_d
None of the above

## explanation_d
Incorrect. Sodium influx is a well-established, correct cause of depolarisation, so "none of the above" is wrong.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

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
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Action potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
State that sodium influx is the main cause of nerve depolarisation.

## source_citation
Alexandria University AU-MED-105 Physiology, lec 1&2 physiology MSK.pdf, p2.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
Reversal of polarity: which of the following is true:

## question
Reversal of polarity: which of the following is true:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
A

## answer_a
Outer membrane is more negative than inner membrane.

## explanation_a
Correct. Reversal of polarity is exactly what its name says: once the action potential's upstroke overshoots zero, the normal resting arrangement flips, so that the outer surface of the membrane becomes electrically more negative than the inner surface, the reverse of the polarity at rest. This overshoot, commonly to around +35 mV of interior positivity in a typical nerve fibre, is the peak of the spike before repolarisation begins.

## answer_b
Action potential is -50 mV

## explanation_b
Incorrect. -50 mV is not the peak (overshoot) value of the nerve action potential; it is in the range of a pacemaker cell's threshold, not the reversed-polarity peak this question asks about.

## answer_c
Potential magnitude is +35 mV

## explanation_c
Incorrect. This states the correct approximate overshoot magnitude, but the true-false test here is about the polarity relationship (outer versus inner membrane charge), which option (a) states correctly and directly.

## answer_d
None of the above

## explanation_d
Incorrect. Option (a) is a correct description of reversal of polarity, so "none of the above" is wrong.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

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
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Action potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
Describe reversal of polarity as the outer membrane becoming more negative than the inner membrane at the peak of the action potential.

## source_citation
Alexandria University AU-MED-105 Physiology, lec 1&2 physiology MSK.pdf, p4.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
Repolarization of the nerve coincides with:

## question
Repolarization of the nerve coincides with:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
B

## answer_a
Influx of Na

## explanation_a
Incorrect. Sodium influx produces depolarisation, the phase that precedes repolarisation, not repolarisation itself.

## answer_b
Outflux of K

## explanation_b
Correct. Repolarisation of the nerve action potential coincides with the efflux of potassium through voltage-gated potassium channels, which carries positive charge back out of the cell once sodium channels have inactivated, returning the membrane toward its resting potential. This K+ efflux is the direct counterpart to the Na+ influx that produced depolarisation moments earlier.

## answer_c
Outflux of Cl

## explanation_c
Incorrect. Chloride efflux is not the ion movement associated with nerve repolarisation; that role belongs to potassium efflux.

## answer_d
Impermeability of the membrane to protein

## explanation_d
Incorrect. Protein impermeability is a constant structural feature contributing to the resting potential, not an event that coincides specifically with the repolarisation phase.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## main_concept
CON-NEU-DD9033DCA3AAF1

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
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Repolarisation

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
State that repolarisation of the nerve coincides with potassium efflux.

## source_citation
Alexandria University AU-MED-105 Physiology, lec 1&2 physiology MSK.pdf, p5.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
The ascending limb of the nerve action potential is due to Na movement through:

## question
The ascending limb of the nerve action potential is due to Na movement through:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
C

## answer_a
Leak channels

## explanation_a
Incorrect. Leak channels are always open at a low, constant rate and contribute to the resting potential; they are not the channels responsible for the rapid depolarising Na+ influx of the ascending limb.

## answer_b
Ligand gated channels

## explanation_b
Incorrect. Ligand-gated channels open in response to a chemical transmitter, as at a synapse or neuromuscular junction, not in response to the membrane voltage change that drives the ascending limb along an axon.

## answer_c
Voltage gated channels

## explanation_c
Correct. The rapid, regenerative sodium influx that produces the ascending (depolarising) limb of the action potential moves through voltage-gated sodium channels, which open in response to the membrane reaching threshold and close (inactivate) again shortly afterward. This voltage-dependent gating is what makes the ascending limb an all-or-none, self-reinforcing event rather than a passive, graded one.

## answer_d
None of the above

## explanation_d
Incorrect. Voltage-gated Na+ channels correctly explain the ascending limb, so "none of the above" is wrong.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

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
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Action potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
State that the ascending limb of the nerve action potential is due to Na+ movement through voltage-gated channels.

## source_citation
Alexandria University AU-MED-105 Physiology, lec 1&2 physiology MSK.pdf, p6.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
Which of the following is false regarding the compound action potential:

## question
Which of the following is false regarding the compound action potential:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
C

## answer_a
The largest the diameter the fastest the velocity of conduction

## explanation_a
Incorrect as the false statement, because this is true: within a compound action potential, the largest-diameter fibres conduct with the fastest velocity, forming the earliest peak.

## answer_b
Myelinated (medullated) nerves are faster than non-myelinated

## explanation_b
Incorrect as the false statement, because this is true: myelination enables saltatory conduction, which is faster than the continuous conduction of unmyelinated fibres of comparable diameter.

## answer_c
The larger the diameter the longer the duration of the spike

## explanation_c
Correct, this is the false statement. Within a compound action potential, larger-diameter fibres actually produce a shorter, not a longer, spike duration: larger fibres conduct faster and complete their depolarisation-repolarisation cycle more quickly. This inverse relationship between diameter and spike duration is part of why a nerve trunk's compound action potential separates into distinct peaks by fibre-group diameter, velocity and, inversely, duration, rather than arriving as one single, uniform wave. Remembering that larger fibres are faster and briefer, not faster and more prolonged, is what stops this exact statement being mistaken for a true one.

## answer_d
The larger the diameter the bigger the magnitude of action potential

## explanation_d
Incorrect as the false statement, because this is true: larger-diameter fibres, having more membrane area and ion channels contributing, produce a compound response of bigger magnitude in a mixed nerve trunk recording.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## main_concept
CON-NEU-18D07BA4202CDA

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
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Compound action potential

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids


## learning_objective
Identify that larger-diameter fibres in a compound action potential have a shorter, not longer, spike duration.

## source_citation
Alexandria University AU-MED-105 Physiology, lec 1&2 physiology MSK.pdf, p7.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
The main cause of after-hyperpolarization is:

## question
The main cause of after-hyperpolarization is:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
C

## answer_a
Delayed Na channel closure

## explanation_a
Incorrect. Sodium channels inactivate, and their gates close, well before after-hyperpolarisation occurs; delayed closure of voltage-gated K+ channels, not Na+ channels, is responsible for it.

## answer_b
Massive inward movement of Cl ions

## explanation_b
Incorrect. Chloride movement is not the mechanism named for after-hyperpolarisation; the extra hyperpolarising current is carried by continuing potassium efflux through slowly-closing K+ channels.

## answer_c
Delayed voltage-gated K channels closure

## explanation_c
Correct. After-hyperpolarisation follows because the voltage-gated potassium channels that repolarised the membrane close more slowly than they opened, so potassium efflux continues briefly past the point where the membrane reaches its normal resting potential, driving it transiently more negative still. Only once these delayed K+ channels finally close does the membrane settle back to its true resting value.

## answer_d
Na-K pump activation

## explanation_d
Incorrect. The Na+-K+ pump helps restore ionic gradients over a longer timescale but is not the direct, immediate cause of the brief after-hyperpolarisation dip, which is an ion-channel gating phenomenon.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## main_concept
CON-NEU-DD9033DCA3AAF1

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
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Repolarisation

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
Explain after-hyperpolarisation as a consequence of delayed closure of voltage-gated potassium channels.

## source_citation
Alexandria University AU-MED-105 Physiology, lec 1&2 physiology MSK.pdf, p8.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
Which of the following is false regarding local response (local excitatory state):

## question
Which of the following is false regarding local response (local excitatory state):

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
C

## answer_a
There is a decrease in RMP

## explanation_a
Incorrect as the false statement, because this is true: a sub-threshold depolarising stimulus does produce a local decrease in the resting membrane potential (a partial depolarisation).

## answer_b
There is an increase in excitability

## explanation_b
Incorrect as the false statement, because this is true: the local response's partial depolarisation brings the membrane closer to threshold, transiently increasing local excitability.

## answer_c
It is a propagated potential

## explanation_c
Correct, this is the false statement. The local response is specifically a graded, non-propagated potential that decays with distance from its site of origin, unlike the action potential, which regenerates itself and travels the full length of the fibre without decrement. Calling it "propagated" is exactly the error this question is testing for.

## answer_d
Caused by sub-threshold stimuli

## explanation_d
Incorrect as the false statement, because this is true: the local response is, by definition, produced by stimuli too weak (sub-threshold, sub-minimal) to trigger a full action potential.

## answer_e
Can be summated

## explanation_e
Incorrect as the false statement, because this is true: local responses can summate, spatially or temporally, and enough summation can bring the membrane to threshold and trigger an action potential.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

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
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Local response

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids


## learning_objective
Identify that the local response, unlike the action potential, is not a propagated potential.

## source_citation
Alexandria University AU-MED-105 Physiology, lec 1&2 physiology MSK.pdf, p11.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
Which of the following is not a membrane stabilizer:

## question
Which of the following is not a membrane stabilizer:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
C

## answer_a
Procaine

## explanation_a
Incorrect. Procaine is a local anaesthetic that blocks voltage-gated Na+ channels, which is exactly what makes it a membrane stabiliser, not the exception.

## answer_b
Hypoxia

## explanation_b
Incorrect. Hypoxia reduces the nerve's excitability (it is a recognised membrane stabiliser/depressant in this teaching), so it is not the tissue-destabilising exception the question asks for.

## answer_c
Alkalosis

## explanation_c
Correct. Local anaesthetics such as procaine and novocaine stabilise the nerve membrane by blocking voltage-gated Na+ channels, and hypoxia also reduces excitability, but alkalosis does the opposite: a rise in extracellular pH increases sodium permeability and raises excitability rather than stabilising the membrane. This bank's own source page is truncated at exactly this option, so the correct choice is recorded here from the source's own printed word order (Procaine, Hypoxia, Alkalosis, Novocaine) together with the physiology, rather than being invented; see the field note on this record.

## answer_d
Novocaine

## explanation_d
Incorrect. Novocaine, like procaine, is a local anaesthetic that blocks voltage-gated Na+ channels and stabilises the membrane, not the exception.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## main_concept
CON-NEU-77596C8A899A7E

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
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Factors affecting nerve excitability

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
Identify alkalosis, not procaine, novocaine or hypoxia, as the factor that raises rather than stabilises nerve excitability.

## source_citation
Alexandria University AU-MED-105 Physiology, lec 3 physiology MSK.pdf, p1.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
Which of the following is true regarding conduction of myelinated nerve fibers:

## question
Which of the following is true regarding conduction of myelinated nerve fibers:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
C

## answer_a
It is a continuous conduction

## explanation_a
Incorrect. Continuous, patch-by-patch conduction describes unmyelinated fibres; myelinated fibres conduct by the opposite mechanism, saltatory (jumping) conduction.

## answer_b
It is slower than that of unmyelinated fibers

## explanation_b
Incorrect. Myelinated fibres conduct faster, not slower, than unmyelinated fibres of comparable diameter, precisely because saltatory conduction skips the internodal membrane.

## answer_c
It is in the form of jumping conduction

## explanation_c
Correct. Myelinated fibres conduct by saltatory ("jumping") conduction: the myelin sheath insulates the internode so that the impulse regenerates only at the exposed nodes of Ranvier, effectively jumping from node to node rather than depolarising every patch of membrane in sequence. This is what makes myelinated conduction both faster and more energy-efficient than continuous conduction.

## answer_d
None of the above

## explanation_d
Incorrect. Option (c) correctly names jumping (saltatory) conduction as the mechanism in myelinated fibres, so "none of the above" is wrong.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

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
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Conduction of the nerve impulse

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids


## learning_objective
State that myelinated nerve fibres conduct by saltatory (jumping) conduction.

## source_citation
Alexandria University AU-MED-105 Physiology, lec 3 physiology MSK.pdf, p3.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
Which of the following is the most excitable area of a myelinated nerve fiber:

## question
Which of the following is the most excitable area of a myelinated nerve fiber:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
C

## answer_a
The terminal axon

## explanation_a
Incorrect. The terminal axon is a functionally distinct region (often specialised for transmitter release) and is not the site named for saltatory regeneration along a myelinated internodal fibre.

## answer_b
Cell body

## explanation_b
Incorrect. The cell body is not part of the myelinated axon's conduction pathway and is not the most excitable site for propagating an action potential along the fibre.

## answer_c
Nodes of Ranvier

## explanation_c
Correct. The nodes of Ranvier are the only points along a myelinated fibre where the axolemma is exposed and densely packed with voltage-gated sodium channels. That combination of exposure and channel density is exactly what makes them the most excitable regions of the fibre, and the only sites where the action potential actually regenerates during saltatory conduction. Everywhere else along the fibre the axolemma is insulated by myelin, so the nodes are also the only points a clinician's or examiner's diagram should mark as capable of firing a fresh action potential.

## answer_d
The internodal areas

## explanation_d
Incorrect. The internodal areas are insulated by myelin and have a very low density of voltage-gated channels; they are the least, not the most, excitable parts of a myelinated fibre.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

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
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Conduction of the nerve impulse

## question_only_for


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids


## learning_objective
Identify the nodes of Ranvier as the most excitable region of a myelinated nerve fibre.

## source_citation
Alexandria University AU-MED-105 Physiology, lec 3 physiology MSK.pdf, p4.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments


---

# Item

## title
The first point of repolarization is:

## question
The first point of repolarization is:

## subject
neuro

## status
Draft

## owner
Alexandria content lane (W1-105-PHYS)

## vignette


## correct_answer
B

## answer_a
The last point depolarized

## explanation_a
Incorrect. The last point to be depolarised is, by the same logic, the last point to repolarise, not the first; this option reverses the true sequence.

## answer_b
The first point stimulated (depolarized)

## explanation_b
Correct. Because the first point of the membrane to depolarise is also the first to have its voltage-gated sodium channels inactivate and its voltage-gated potassium channels open, it is the first point to begin repolarising as well. Repolarisation therefore follows depolarisation across the membrane in the same sequence that depolarisation itself occurred, point by point, rather than starting somewhere else.

## answer_c
The myelinated area

## explanation_c
Incorrect. "The myelinated area" is not a defined point of depolarisation or repolarisation in this context; the internodal myelinated membrane is not where regeneration occurs at all.

## answer_d
None of the above

## explanation_d
Incorrect. Option (b) correctly identifies the first point stimulated as the first to repolarise, so "none of the above" is wrong.

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## main_concept
CON-NEU-DD9033DCA3AAF1

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
55

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.5

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Physiology > Nerve physiology > Repolarisation

## question_only_for


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
State that the first point of the membrane depolarised is also the first point to repolarise.

## source_citation
Alexandria University AU-MED-105 Physiology, lec 3 physiology MSK.pdf, p5.

## format
single best answer

## derived_from
Transcribed from the named Alexandria University AU-MED-105 Physiology bank; not derived.

## author_notes
Key confirmed by rendering the source page at 150 dpi per SHARED-TOOLCHAIN.md; see coverage/AU-MED-105-physiology-triage.md.

## estimated_seconds
90

## randomise_answers
yes

## attached_image


## attachments

