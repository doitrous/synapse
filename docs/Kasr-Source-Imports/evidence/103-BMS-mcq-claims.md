<!--
  103 BMS · the 12 atomic claims the MCQ-lane concepts name.

  One kind, one file: every record here is a claim. The citations that support
  them are the sibling file ./103-BMS-mcq-citations.md — do not merge the two,
  the validator reads the first record and judges the whole file against it.

  WHY THIS FILE EXISTS. `atomic_claim_ids` must carry a value on a concept and
  `field_notes` cannot excuse it. The twelve concepts in
  ../concept/103-BMS-mcq-vitamins-nerve-concepts.md are new, and the live
  evidence store holds no claim that asserts what any of them says — 1,741 live
  claims were searched by display text for saltatory conduction, myelin,
  acetylcholine, troponin, tropomyosin, the T tubule, the compound action
  potential, myasthenia and periodic paralysis, and the thirteen that matched
  are all bound to other subjects. So these are authored rather than borrowed,
  which is what 02-concepts.md prescribes when the concept rests on a source
  that can be quoted.

  WHERE THE IDs COME FROM. Every `id` here is already named in an
  `atomic_claim_ids` list in that concept file, and every `concept_id` is the
  concept that names it. Twelve in, twelve out, none renamed.

  ONE BOOK. All twelve are quotable from `Dpt Book Physiology 103.pdf`,
  src_59643edb9d371bcefa2c, 51 pages, already an evidence record in
  ./103-BMS-sources.md. The two question books the MCQs come from are cited on
  the questions themselves as provenance; they are never cited here, because a
  question book is evidence about what a faculty asks, not that something is
  medically true.

  VERIFICATION STATUS. All twelve are `needs_evidence`, matching the
  `publication_status: needs_evidence` on the concepts that name them. Each has
  a citation with an exact page locator, but no human has reviewed the chain,
  and review is what promotes a claim to `verified`.

  RISK CLASS. All twelve are `foundational_stable`. CLM-MSK-MYASTHENIA-GRAVIS-01
  comes closest to treatment — the book names neostigmine — but it states what
  the disease is and what relieves it, not a dose or an action to take, and the
  claim is written in that register.

  Import order: sources → concepts → claims → citations.
-->

# Item

## id
CLM-NEU-MYELINATION-01

## concept_id
CON-NEU-5664D7AB68AD8D

## subject
The myelinated nerve fibre

## predicate
has

## object
An axon surrounded by a myelin sheath secreted by Schwann cells, insulating the internode and interrupted at the nodes of Ranvier

## display_text
In a myelinated nerve fibre the axon is surrounded by a myelin sheath secreted by Schwann cells, which is an excellent insulator that decreases ion flow across the membrane and is interrupted at the nodes of Ranvier where ions cross with little resistance; in a non-myelinated fibre the axon is simply surrounded by Schwann cells with no sheath formed.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: peripheral nerve fibre
level: undergraduate general physiology

---

# Item

## id
CLM-NEU-SALTATORY-CONDUCTION-01

## concept_id
CON-NEU-A0C8307D2825A6

## subject
Saltatory conduction

## predicate
has

## object
Propagation of the action potential from node to node, increasing conduction velocity up to fifty-fold and conserving the energy the Na+-K+ pump would spend

## display_text
Because myelin insulates the internode and the voltage-gated sodium channels are concentrated at the nodes of Ranvier, action potentials are generated only at the nodes and the impulse jumps from one node to the next; this saltatory conduction increases the velocity of the nerve impulse up to fifty-fold and conserves energy, because little is needed to re-establish the sodium and potassium concentration differences.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: myelinated peripheral nerve fibre
comparison: against continuous conduction in unmyelinated axons

---

# Item

## id
CLM-NEU-REPOLARISATION-01

## concept_id
CON-NEU-DD9033DCA3AAF1

## subject
Repolarisation of the nerve action potential

## predicate
caused_by

## object
Inactivation of the sodium channels together with activation of the potassium channels, whose slow closure then produces hyperpolarisation

## display_text
Repolarisation is produced by inactivation of the sodium channels, which stops the sodium influx and terminates depolarisation, together with activation of the potassium channels, which open shortly after the sodium channels, more slowly and for longer, and whose efflux completes repolarisation; slow closure of those potassium channels then carries the membrane past the resting level into hyperpolarisation.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: nerve action potential
sequence: follows depolarisation, precedes the hyperpolarising after-potential

---

# Item

## id
CLM-NEU-LOCAL-RESPONSE-01

## concept_id
CON-NEU-7E784A50D2BBAF

## subject
The local excitatory state (local response)

## predicate
has

## object
A graded, non-propagated partial depolarisation with no refractory period, summable by rapid repeated subthreshold stimuli to the firing level

## display_text
A subthreshold stimulus opens some sodium activation gates and produces a partial depolarisation that does not reach the firing level. It does not obey the all-or-none law, is non-propagated and fades within one to two millimetres, is graded with the strength of the stimulus, has no refractory period, and raises excitability; and because it has no refractory period it can be summated by rapid repeated subthreshold stimuli until the firing level is reached and an action potential is generated.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: single nerve fibre
contrast: against the all-or-none action potential

---

# Item

## id
CLM-NEU-EXCITABILITY-FACTORS-01

## concept_id
CON-NEU-77596C8A899A7E

## subject
Nerve excitability

## predicate
modified_by

## object
Anything altering sodium permeability — raised by veratridine and hypocalcaemia, lowered by hypercalcaemia and local anaesthetics — and by extracellular potassium acting on the resting potential

## display_text
Any condition that increases membrane permeability to sodium increases nerve excitability, such as veratridine and a low extracellular calcium; any condition that decreases it stabilises the membrane and lowers excitability, such as a high extracellular calcium and local anaesthetics like cocaine. Potassium acts instead on the resting potential: hyperkalaemia depolarises the membrane and raises excitability, while a fall in extracellular potassium hyperpolarises it and lowers excitability, which is the mechanism of familial periodic paralysis.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: nerve fibre excitability
clinical: familial periodic paralysis is the book’s worked example of the potassium arm

---

# Item

## id
CLM-NEU-SODIUM-POTASSIUM-PUMP-01

## concept_id
CON-NEU-1E66BE533E894C

## subject
The Na+-K+ pump

## predicate
has

## object
ATP-dependent primary active transport of three sodium out for every two potassium in, leaving a net excess of positive charge outside

## display_text
The Na+-K+ pump is the standard example of primary active transport: its activity depends on energy derived from ATP, and it moves three sodium ions out of the cell for every two potassium ions it moves in. More positive charge therefore leaves than enters, which makes the pump electrogenic and contributes about minus four millivolts to the resting membrane potential, and it is what re-establishes the concentration gradients after an action potential.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: excitable cell membrane
stoichiometry: 3 Na+ out to 2 K+ in

---

# Item

## id
CLM-MSK-NMJ-TRANSMISSION-01

## concept_id
CON-MSK-77D955AAB4D0FA

## subject
Neuromuscular transmission

## predicate
has

## object
A sequence from presynaptic calcium entry and acetylcholine exocytosis, through a ligand-gated cation channel on the motor end plate and the end-plate potential, to a propagated muscle action potential terminated by acetylcholinesterase

## display_text
Arrival of the nerve impulse opens voltage-gated calcium channels; calcium enters the nerve ending and ruptures the vesicles, releasing acetylcholine. The transmitter crosses the cleft and binds a ligand-gated channel in the motor end plate, which opens and admits sodium, depolarising the end plate. This end-plate potential is graded and non-propagated and carries the adjacent muscle membrane to its firing level, so action potentials are generated on either side of the end plate and propagate along the fibre. Acetylcholine then dissociates and is hydrolysed by acetylcholinesterase in the cleft, which is necessary to prevent multiple contractions.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: alpha motor neurone to skeletal muscle fibre
delay: about 0.5 msec, stated under Properties on file page 28

---

# Item

## id
CLM-MSK-MYASTHENIA-GRAVIS-01

## concept_id
CON-MSK-5C2B5DD83C1805

## subject
Myasthenia gravis

## predicate
caused_by

## object
Autoantibodies against the acetylcholine receptors of the motor end plate, treated with anticholinesterase drugs

## display_text
Myasthenia gravis is an autoimmune disease caused by antibodies against the acetylcholine receptors. The neuromuscular junctions cannot transmit enough signals from nerve to muscle, so skeletal muscles are weak and tire easily, and in the severe form the patient may die of paralysis of the respiratory muscles. It is treated by an anticholinesterase such as neostigmine, which allows adequate amounts of acetylcholine to accumulate.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: neuromuscular junction disorder
register: the book states what the disease is and what treats it, not how to dose it

---

# Item

## id
CLM-MSK-EC-COUPLING-01

## concept_id
CON-MSK-3013AA61E917B7

## subject
Excitation-contraction coupling in skeletal muscle

## predicate
has

## object
A relay from T-tubule depolarisation to calcium release from the terminal cisternae, calcium binding troponin C, and tropomyosin uncovering the myosin-binding site on actin

## display_text
Propagation of the action potential into the T tubule opens the calcium channels on the terminal cisternae, and calcium flows out into the cytoplasm. Calcium binds troponin C on actin; troponin changes conformation so that tropomyosin moves away from its position covering the myosin-binding site, and once uncovered that site combines with the myosin cross-bridges and contraction begins. Relaxation follows when the calcium pump on the sarcoplasmic reticulum membrane removes calcium from the cytoplasm.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: skeletal muscle fibre
relaxation: calcium removal by the SR calcium pump, file page 34

---

# Item

## id
CLM-MSK-FIBRE-TYPES-01

## concept_id
CON-MSK-3E5F54D8D58E9C

## subject
Human skeletal muscle fibre types

## predicate
has

## object
Slow red type I fibres that are oxidative, capillary-rich, myoglobin-rich and fatigue-resistant, and fast pale type IIb fibres that are glycolytic, high in ATPase and quick to fatigue

## display_text
Slow red type I fibres are small, innervated by small slowly conducting motor neurones, carry large numbers of oxidative enzymes and a high mitochondrial volume, have low ATPase activity, are surrounded by extensive capillaries and contain a high concentration of myoglobin, giving a slow contractile mechanism with a large aerobic capacity and high resistance to fatigue. Fast pale type IIb fibres are larger, innervated by large rapidly conducting motor neurones, carry an extensive sarcoplasmic reticulum and large amounts of glycolytic enzymes with a high ATPase activity, and contain less blood supply, less myoglobin and fewer mitochondria, giving a rapid contractile mechanism with less resistance to fatigue.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: human skeletal muscle
distribution: postural muscles are mainly slow, fine-movement muscles mainly fast

---

# Item

## id
CLM-NEU-COMPOUND-AP-01

## concept_id
CON-NEU-18D07BA4202CDA

## subject
The compound action potential of a nerve trunk

## predicate
has

## object
Multiple peaks, from fibres differing in threshold, distance and conduction speed, and a graded amplitude that rises with stimulus strength to a maximum

## display_text
A nerve trunk is made of many fibres, and the potential recorded from it is compound. It has many peaks, because the fibres differ in their threshold of stimulation, in their distance from the stimulating electrodes, and in their speed of conduction, so activity in fast-conducting fibres reaches the recording electrodes before activity in slower ones. It is also graded: subthreshold stimuli give no response, a threshold stimulus excites the fibres of low threshold and records a small potential, a supra-threshold stimulus increases the amplitude up to a maximum, and supramaximal stimuli produce no further increase.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: mixed peripheral nerve trunk
contrast: a single fibre obeys the all-or-none law; a trunk does not

---

# Item

## id
CLM-NEU-BIPHASIC-AP-01

## concept_id
CON-NEU-8E195C4C7D9BFF

## subject
The biphasic action potential

## predicate
recorded_by

## object
Two electrodes both on the outer surface of the nerve, giving two deflections in opposite directions as the impulse passes each in turn

## display_text
A monophasic action potential is recorded with one electrode inserted into the interior of the fibre and an indifferent electrode on the outer surface. A biphasic action potential is recorded with both electrodes on the outer surface: at rest there is no potential difference between them; as depolarisation reaches the nearer electrode it becomes negative relative to the other; when the impulse lies between them the potential returns to zero; as the impulse passes the second electrode the first becomes positive relative to it and a wave is recorded in the opposite direction; and when the impulse leaves the second electrode no difference remains. Crushing or destroying the nerve between the electrodes makes the record monophasic.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: recording technique on an isolated nerve
clinical: used to localise damage along a nerve pathway
