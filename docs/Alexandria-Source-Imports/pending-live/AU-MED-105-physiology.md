<!--
  Sparse updates for AU-MED-105 (Physiology) onto concept ids that exist only in
  Kasr Year 1's unimported batches, per LANE-BRIEF.md §16 (mint freeze fully lifted,
  law 1) and §19 (an update-shaped row for an id that is not live and not in the same
  batch folder is an ERROR unless validated `--with` the Kasr file it targets).

  Validate with:
    npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/AU-MED-105-physiology.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md

  Do not apply this file until the Kasr file each record targets (named per record
  below, and in INDEX.md) is live. Omar imports Kasr Year 1 before Alexandria.
-->

# Item

## id
CON-NEU-1E66BE533E894C

## label
The Na⁺–K⁺ pump is ATP-driven primary active transport of three sodium out for two potassium in, which makes it electrogenic

## definition
The Na⁺–K⁺ pump is the standard example of primary active transport. Its α subunit carries the ATP-binding site, two potassium sites on the outer aspect and three sodium sites on the inner; its β subunit has the ATPase activity that splits ATP into ADP, phosphate and energy. It moves three sodium out for every two potassium in, so more positive charge leaves than enters and the pump is electrogenic, contributing about −4 mV to the resting membrane potential. It also re-establishes the sodium and potassium concentration gradients after an action potential, which is a different job from generating the spike.

## explicit_objective
Classify the Na⁺–K⁺ pump as primary active transport, give its stoichiometry, and separate its contribution to the resting potential from its role in restoring gradients.

## arabic_label
مضخة الصوديوم والبوتاسيوم

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-mcq-vitamins-nerve-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md

---

# Item

## id
CON-NEU-7A30FECF042995

## label
The depolarisation phase of the nerve action potential is a regenerative sodium influx

## definition
Depolarisation happens in two steps. A stimulus first drives the membrane slowly from −90 mV to the firing level of −65 mV, opening some sodium activation gates; the sodium that enters depolarises the membrane further and opens more gates, so the process feeds itself. At the firing level all voltage-gated sodium channels open and rapid depolarisation carries the potential through zero to an overshoot of +35 mV, giving a spike amplitude of 125 mV, after which the sodium channels rapidly inactivate.

## explicit_objective
Describe the ionic basis of the depolarisation phase of the nerve action potential, separating the slow phase from the rapid phase and naming the voltage values that bound each.

## arabic_label
الأساس الأيوني لطور إزالة الاستقطاب في جهد الفعل

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md
overshootFact: This record's own definition already states the +35 mV overshoot magnitude the AU bank's "reversal of polarity" question needs — the triage's OWED concern that it might not is resolved by reading the full record (line 59: "an overshoot of +35 mV, giving a spike amplitude of 125 mV"). No addition needed.

---

# Item

## id
CON-NEU-DD9033DCA3AAF1

## label
Repolarisation is sodium inactivation plus a delayed potassium efflux, and the slow closure of those potassium channels is what causes hyperpolarisation

## definition
Two events together end the spike. Inactivation of the voltage-gated sodium channels stops the sodium influx and terminates depolarisation, while the potassium channels — which open shortly after the sodium ones, more slowly and for longer — carry potassium out and complete the return to the resting level. Repolarisation is rapid for its first 70 per cent and slow for the remaining 30 per cent. The potassium channels then close slowly, so potassium keeps leaving after it should have stopped and the membrane overshoots into hyperpolarisation, which lasts 35 to 40 msec against the spike's 2 msec; leak potassium channels return it to rest.

## explicit_objective
Give both ionic events of repolarisation, the proportions of its rapid and slow phases, and the cause and duration of the hyperpolarising after-potential.

## arabic_label
طور إعادة الاستقطاب وفرط الاستقطاب

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-mcq-vitamins-nerve-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md

---

# Item

## id
CON-NEU-18D07BA4202CDA

## label
A nerve trunk gives a compound action potential that is multi-peaked and graded, because it is a population of fibres and not one

## definition
A nerve trunk is made of many fibres, so the potential recorded from it is compound. It has many peaks, because the fibres differ in threshold, in distance from the stimulating electrodes and in conduction speed, so activity in fast fibres arrives before activity in slow ones. It is graded rather than all-or-none: subthreshold stimuli give no response, a threshold stimulus excites the low-threshold fibres and gives a small potential, a supra-threshold stimulus increases the amplitude up to a maximum at maximal stimulation, and supramaximal stimuli add nothing further.

## explicit_objective
Explain why a compound action potential is graded and multi-peaked while a single fibre is all-or-none.

## arabic_label
جهد الفعل المركب

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-mcq-vitamins-nerve-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md

---

# Item

## id
CON-NEU-7E784A50D2BBAF

## label
The local response is graded, non-propagated and has no refractory period, which is exactly why it can be summated to the firing level

## definition
A subthreshold stimulus opens some sodium activation gates; sodium enters and partially depolarises the membrane without reaching the firing level, and repolarisation then follows rapidly. The response does not obey the all-or-none law; it is non-propagated and fades within one to two millimetres; it is graded, so its size and duration vary with the stimulus; it has no refractory period; and excitability is increased during it, because the membrane has moved towards the firing level. Because there is no refractory period, rapid repeated subthreshold stimuli summate, and when summation reaches −65 mV an action potential is generated.

## explicit_objective
List the characters of the local response and explain why the absence of a refractory period is what makes summation possible.

## arabic_label
الاستجابة الموضعية

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-mcq-vitamins-nerve-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md

---

# Item

## id
CON-NEU-77596C8A899A7E

## label
Sodium permeability sets nerve excitability and extracellular potassium sets the resting potential, which is why local anaesthetics silence a nerve and hypokalaemia paralyses a patient

## definition
Anything that increases membrane permeability to sodium increases excitability — veratridine, and a low extracellular calcium. Anything that decreases it stabilises the membrane and lowers excitability — a high extracellular calcium, and local anaesthetics such as cocaine, which make the membrane depolarise too slowly to reach the firing level. A fall in extracellular sodium shrinks the action potential with little effect on the resting potential, and tetrodotoxin blocks the sodium channels so that no action potential can be elicited. Potassium acts on the resting potential instead: hyperkalaemia depolarises and raises excitability, hypokalaemia hyperpolarises and lowers it, which is the mechanism of familial periodic paralysis.

## explicit_objective
Predict the direction excitability moves when sodium permeability, extracellular calcium or extracellular potassium changes, and apply it to a local anaesthetic and to familial periodic paralysis.

## arabic_label
العوامل المؤثرة على استثارة العصب

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-mcq-vitamins-nerve-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md
auTeaching: Alexandria's own Physiology bank (lec 3 physiology MSK Q1) tests alkalosis as a factor that increases excitability (i.e. is not a membrane stabiliser) alongside procaine/novocaine (which are stabilisers) and hypoxia. This record's live text names sodium permeability, potassium and local anaesthetics explicitly but does not name alkalosis by name — recorded here rather than silently assumed covered. Concepts have no `university_notes` column (that field exists on articles only), so this note carries the same information field_notes-side.

---

# Item

## id
CON-NEU-2235199E9F4373

## label
The absolute refractory period is when no stimulus of any strength can fire a second action potential

## definition
The absolute refractory period is the time during which another action potential cannot be produced whatever the strength of the stimulus. It runs from the firing level to the early part of repolarisation, and it exists because all the voltage-gated sodium channels have opened and then been rapidly inactivated by their inner gate, leaving none available to carry a second upstroke.

## explicit_objective
Define the absolute refractory period, state the part of the action potential it occupies, and explain it from the state of the sodium channels.

## arabic_label
فترة الجموح المطلقة

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md

---

# Item

## id
CON-NEU-F119674A8DFD8D

## label
The relative refractory period is when only a stronger-than-threshold stimulus can fire a second action potential

## definition
The relative refractory period is the time during which another action potential can still be produced, but only by a stimulus stronger than threshold. It begins at the end of the absolute refractory period and ends when the membrane potential returns to its resting level. Two things make it costly: only some sodium channels have returned to the resting state and are available, and the potassium channels opened during repolarisation are carrying potassium outwards, which opposes the inward sodium current.

## explicit_objective
Define the relative refractory period, state where it begins and ends on the action potential, and give both ionic reasons why a larger stimulus is needed.

## arabic_label
فترة الجموح النسبية

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-physiology-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md

---

# Item

## id
CON-NEU-A0C8307D2825A6

## label
Saltatory conduction regenerates the impulse only at the nodes, which buys both speed and economy

## definition
In a myelinated axon the internodal membrane is insulated, and only at the nodes of Ranvier is it exposed and richly supplied with voltage-gated sodium channels. An action potential at one node is the stimulus for the next, so action potentials are generated only at the nodes and the signal jumps between them. This increases conduction velocity up to fifty-fold and conserves energy, because little sodium and potassium have to be pumped back. Speed also rises with fibre size — it is proportional to the square root of the fibre diameter, and the internodal distance increases with diameter.

## explicit_objective
Explain how insulating the internode speeds conduction, and list the three determinants of conduction velocity.

## arabic_label
التوصيل القفزي

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-mcq-vitamins-nerve-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md

---

# Item

## id
CON-NEU-5664D7AB68AD8D

## label
A myelinated fibre is an axon insulated by Schwann-cell myelin and interrupted at the nodes of Ranvier; an unmyelinated one is an axon those cells merely surround

## definition
The neuron is the structural and functional unit of the nervous system. In a myelinated fibre its axon is wrapped in a myelin sheath secreted by Schwann cells, an excellent insulator that decreases ion flow across the membrane, and the sheath is interrupted at the nodes of Ranvier, where the membrane is exposed and ions cross with little resistance. In an unmyelinated fibre the axon is simply surrounded by Schwann cells with no sheath formed, so there are no nodes.

## explicit_objective
Distinguish a myelinated from an unmyelinated nerve fibre by what the Schwann cell does to the axon, and state where ion flow is permitted in each.

## arabic_label
أنواع الألياف العصبية من حيث النخاعين

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-mcq-vitamins-nerve-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md

---

# Item

## id
CON-MSK-3E5F54D8D58E9C

## label
Red slow fibres are oxidative and fatigue-resistant; pale fast fibres are glycolytic, powerful and quick to tire

## definition
Slow red type I fibres are small, innervated by small slowly conducting motor neurones, rich in oxidative enzymes and mitochondria, low in ATPase, surrounded by extensive capillaries and high in myoglobin, which stores oxygen; together these give a slow contractile mechanism, a large aerobic capacity and high resistance to fatigue. Fast pale type IIb fibres are larger, innervated by large rapidly conducting motor neurones, carry an extensive sarcoplasmic reticulum for rapid calcium release, large amounts of glycolytic enzymes and a high ATPase activity, and have less blood supply, less myoglobin and fewer mitochondria; they contract rapidly and fatigue quickly. Postural muscles such as soleus are mainly slow; muscles of fine skilled movement such as the extraocular muscles are mainly fast.

## explicit_objective
Contrast the two skeletal muscle fibre types by enzyme profile, capillary supply, myoglobin, mitochondria and fatigue resistance, and predict which predominates in a given muscle.

## arabic_label
أنواع الألياف العضلية الهيكلية

## universities
+au

## learner_years
+1

## modules
+AU-MED-105

## field_notes
definitionObjectiveArabicLabel: Restated verbatim from the Kasr concept record (103-BMS-mcq-vitamins-nerve-concepts.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
targetFile: docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md
