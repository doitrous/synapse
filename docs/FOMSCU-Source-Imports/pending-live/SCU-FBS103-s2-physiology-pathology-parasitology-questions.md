<!--
  SCU-FBS103 S2 minting lane 1 (scu-fbs103-author1) — cluster 'physiology-pathology-parasitology-mints'. 14 genuinely new concepts (re-verified with find-existing.mjs on the final canonical key plus a grep -ril read of every hit body — none matched) plus 2 sparse reuses of existing pending concepts (mycelium and continuous cell line, both minted in Ain Shams's/6October's own corpus). Covers synaptic/nerve physiology, general pathology definitions, and parasitology/microbiology basics from FOMSCU Foundation 2's own MID 2026 and EOY 2025 papers. Keys and stems read from the FOMSCU own-source quiz-app JSON; explanations written fresh in house voice, never pasted from the source JSON's own (FOMNINU-sourced) Arabic explanation field. Ids minted with mint-concept-id.mjs, checked against the live snapshot and taken-id scan. No claim/citation/media record minted — scoped to concept, article and question files, matching the standing convention (Kasr's 103-BMS-mcq-lipid-concepts.md); the evidence chain is owed and named in the hand-off report.

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-SCUFBS103-S2-PHYSIOLOGY-SYNAPTICFATIGUE

## title
Cause of synaptic fatigue during prolonged stimulation

## question
What is the primary cause of synaptic fatigue during prolonged and intense neuronal stimulation?

## subject
neuro

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Depletion of ATP in the postsynaptic neuron

## explanation_a
Incorrect. Postsynaptic ATP is not the limiting factor in ordinary synaptic transmission; ATP is consumed by the presynaptic terminal for vesicle recycling and neurotransmitter synthesis, not primarily by the postsynaptic cell during a single train of stimuli.

## answer_b
Accumulation of calcium in the presynaptic terminal

## explanation_b
Incorrect. Calcium influx into the presynaptic terminal is what triggers vesicle release in the first place — a normal, necessary step of transmission, not the cause of fatigue; if anything, excessive residual calcium can facilitate (not fatigue) subsequent release in the short term.

## answer_c
Inactivation of postsynaptic receptors

## explanation_c
Incorrect. Postsynaptic receptors do not become significantly inactivated by ordinary rates of stimulation over the timescale relevant to synaptic fatigue — receptor desensitisation is a separate, generally slower phenomenon and not the primary driver here.

## answer_d
Exhaustion of the neurotransmitter storage

## explanation_d
Correct. Synaptic fatigue — the progressive decline in the size of the postsynaptic response during prolonged, intense, repetitive stimulation of a synapse — occurs primarily because the readily releasable pool of neurotransmitter-containing vesicles in the presynaptic terminal becomes depleted faster than it can be replenished. With fewer vesicles available to release per action potential, less neurotransmitter reaches the postsynaptic membrane, and the postsynaptic response progressively weakens; this is a protective mechanism against the runaway excitation of a seizure, since fatigue at the synapse acts as an automatic brake on excessive circuit activity.

## topic
Physiology

## subtopic
Synaptic transmission: synaptic fatigue

## main_concept
CON-NEU-187212984D2D39

## concept_ids
CON-NEU-187212984D2D39

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PHY-SYNAPTIC-TRANSMISSION

## resource_ids

## learning_objective
State that synaptic fatigue during prolonged stimulation results from depletion of the presynaptic neurotransmitter (vesicle) store, distinct from postsynaptic ATP depletion, calcium accumulation, or receptor inactivation.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q7

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'Exhaustion of the neurotransmitter storage', FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q7; source-JSON extraction.

---

# Item

## id
QST-SCUFBS103-S2-PHYSIOLOGY-IPSPPOTASSIUM

## title
Channel opening that causes IPSPs (potassium route)

## question
Inhibitory postsynaptic potentials (IPSPs) are most likely caused by the opening of which of the following channels?

## subject
neuro

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Ligand-gated sodium channels

## explanation_a
Incorrect. Opening sodium channels lets the positively charged Na+ ion flow into the cell down its electrochemical gradient, depolarising the membrane — this is the mechanism of an excitatory, not inhibitory, postsynaptic potential.

## answer_b
Ligand-gated potassium channels

## explanation_b
Correct. One of the two classic mechanisms for generating an IPSP is the opening of ligand-gated (neurotransmitter-gated) potassium channels — for example by GABA acting at GABA-B receptors — which lets K+ flow out of the cell down its electrochemical gradient. This outward positive-charge movement makes the inside of the membrane more negative (hyperpolarises it), moving the membrane potential further from threshold and making the neuron less likely to fire — the defining feature of an IPSP.

## answer_c
Voltage-gated sodium channels

## explanation_c
Incorrect. Voltage-gated sodium channels are the channels responsible for the rapid depolarising upstroke of the action potential itself, not for generating an inhibitory postsynaptic potential.

## answer_d
Voltage-gated calcium channels

## explanation_d
Incorrect. Voltage-gated calcium channels at the presynaptic terminal trigger vesicle release (a step common to both excitatory and inhibitory transmission) — they are not themselves the postsynaptic channel that generates the IPSP.

## topic
Physiology

## subtopic
Synaptic transmission: inhibitory postsynaptic potentials

## main_concept
CON-NEU-53839F781995A8

## concept_ids
CON-NEU-53839F781995A8

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PHY-SYNAPTIC-TRANSMISSION

## resource_ids

## learning_objective
State that ligand-gated potassium channel opening (K+ efflux, hyperpolarisation) is one classic mechanism generating an IPSP, alongside chloride influx via a separate channel.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q8

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'Ligand-gated potassium channels', FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q8; source-JSON extraction.

---

# Item

## id
QST-SCUFBS103-S2-PHYSIOLOGY-PNSDEFINITION

## title
Division linking the CNS with the rest of the body

## question
The nervous system division that links the Central Nervous System with all other parts of the body is the:

## subject
neuro

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Autonomic nervous system (ANS)

## explanation_a
Incorrect. The autonomic nervous system is a functional subdivision of the peripheral nervous system specifically controlling involuntary functions (heart rate, digestion, glandular secretion) — it is one part of the PNS's own territory, not the whole link between CNS and body.

## answer_b
Enteric nervous system (ENS)

## explanation_b
Incorrect. The enteric nervous system is a further, semi-independent subdivision confined to the gut wall itself — a small specialised part of the broader peripheral network, not the general CNS-to-body link.

## answer_c
Peripheral nervous system (PNS)

## explanation_c
Correct. The peripheral nervous system (PNS) comprises all the neural structures outside the brain and spinal cord — the cranial and spinal nerves, their ganglia, and peripheral receptors — and its defining role is to carry sensory information from the body into the CNS and carry motor commands from the CNS out to muscles and glands. It is this two-way cabling role that makes the PNS the structure linking the CNS with every other part of the body, and the autonomic and enteric systems are best understood as functional subdivisions within it.

## answer_d
Central nervous system (CNS)

## explanation_d
Incorrect. The central nervous system is the brain and spinal cord themselves — the receiving and processing end of the link, not the connecting structure that reaches out to the rest of the body.

## topic
Physiology

## subtopic
Nervous system organisation

## main_concept
CON-NEU-34B9628127826B

## concept_ids
CON-NEU-34B9628127826B

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
75

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PHY-SYNAPTIC-TRANSMISSION

## resource_ids

## learning_objective
State that the peripheral nervous system links the CNS with the rest of the body, with the autonomic and enteric nervous systems as its own functional subdivisions.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q37

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'Peripheral nervous system (PNS)', FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q37; source-JSON extraction.

---

# Item

## id
QST-SCUFBS103-S2-PHYSIOLOGY-VGKCHYPERPOLARIZATION

## title
Effect of voltage-gated potassium channel opening at rest

## question
What happens when voltage-gated potassium (K+) channels open in a resting neuron?

## subject
neuro

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Na+ leaves the neuron causing hyperpolarization

## explanation_a
Incorrect. Sodium's concentration gradient at rest favours Na+ entering, not leaving, the neuron — opening a sodium channel produces depolarisation, and sodium is not the ion these particular channels conduct.

## answer_b
K+ leaves the neuron causing hyperpolarization

## explanation_b
Correct. When voltage-gated K+ channels open, potassium flows down its electrochemical gradient out of the neuron (intracellular K+ concentration is high relative to extracellular). This outward movement of positive charge makes the inside of the membrane more negative than it already was at rest — hyperpolarisation — moving the membrane potential further from threshold. This is exactly the mechanism behind the repolarisation and after-hyperpolarisation phases that follow an action potential's depolarising upstroke.

## answer_c
K+ enters the neuron causing depolarization

## explanation_c
Incorrect. Potassium's electrochemical gradient at rest drives it out of, not into, the cell — K+ channel opening cannot produce depolarisation by K+ entry under normal resting conditions.

## answer_d
Na+ enters the neuron causing depolarization

## explanation_d
Incorrect. Sodium entering the neuron does cause depolarisation, but that requires sodium channels to open, not potassium channels — this option names the wrong ion for the channel type in the question.

## topic
Physiology

## subtopic
Resting membrane potential and repolarisation

## main_concept
CON-NEU-4A8E746367C011

## concept_ids
CON-NEU-4A8E746367C011

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PHY-SYNAPTIC-TRANSMISSION

## resource_ids

## learning_objective
State that voltage-gated K+ channel opening lets K+ leave the neuron, hyperpolarising the membrane, distinct from sodium's depolarising entry.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q39

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'K+ leaves the neuron causing hyperpolarization', FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q39; source-JSON extraction.

---

# Item

## id
QST-SCUFBS103-S2-PHYSIOLOGY-BETA2RECEPTORSLUNG

## title
Sympathetic receptor predominant in bronchial smooth muscle

## question
Which type of sympathetic autonomic nervous system receptors is predominantly present in the smooth muscles of the lungs?

## subject
neuro

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Beta-1 receptors

## explanation_a
Incorrect. Beta-1 receptors predominate in the heart, where their sympathetic stimulation increases heart rate and contractility — not the primary receptor of the bronchial smooth muscle.

## answer_b
Alpha-1 receptors

## explanation_b
Incorrect. Alpha-1 receptors predominate in vascular smooth muscle, where their stimulation causes vasoconstriction — a different tissue and a different (contractile, not relaxant) action from what dominates in the lungs.

## answer_c
Beta-2 receptors

## explanation_c
Correct. Beta-2 receptors are the predominant sympathetic receptor subtype in bronchial (airway) smooth muscle, and their activation causes bronchodilation (smooth muscle relaxation) — the physiological basis for why beta-2 agonists (such as salbutamol) are the mainstay bronchodilator drug class for asthma and COPD. This selective beta-2 dominance in the lung is also why non-selective beta-blockers can precipitate bronchospasm in susceptible patients, by removing that tonic beta-2-mediated relaxation.

## answer_d
Muscarinic receptors

## explanation_d
Incorrect. Muscarinic receptors are the receptors of the parasympathetic (not sympathetic) nervous system in the airway, and their stimulation causes bronchoconstriction — the opposite tissue response, and the wrong autonomic division entirely for this question.

## topic
Physiology

## subtopic
Autonomic nervous system: adrenergic receptors

## main_concept
CON-NEU-2E84668E9F281C

## concept_ids
CON-NEU-2E84668E9F281C

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PHY-SYNAPTIC-TRANSMISSION

## resource_ids

## learning_objective
State that beta-2 receptors predominate in bronchial smooth muscle and mediate bronchodilation, distinct from cardiac beta-1, vascular alpha-1, and parasympathetic muscarinic receptors.

## source_citation
FOMSCU Foundation 2, EOY 2025, Q1

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'Beta-2 receptors', FOMSCU Foundation 2 QBank
fomscu: EOY 2025 Q1; source-JSON extraction.

---

# Item

## id
QST-SCUFBS103-S2-PHYSIOLOGY-IPSPCHLORIDE

## title
Ion movement that generates an IPSP (chloride route)

## question
An inhibitory postsynaptic potential (IPSP) is primarily generated by which of the following ion movements?

## subject
neuro

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Inward movement of sodium ions

## explanation_a
Incorrect. Sodium entering the cell depolarises the membrane, the opposite of the hyperpolarisation an IPSP requires — this is the mechanism of an excitatory, not inhibitory, postsynaptic potential.

## answer_b
Inward movement of calcium ions

## explanation_b
Incorrect. Calcium's main role in fast synaptic transmission is presynaptic, triggering vesicle release when it enters the presynaptic terminal — postsynaptic calcium influx is not the classic IPSP mechanism.

## answer_c
Inward movement of chloride ions

## explanation_c
Correct. The other classic mechanism for generating an IPSP (alongside K+ efflux through ligand-gated potassium channels) is the inward movement of chloride ions — for example through GABA-A receptor-linked chloride channels, or glycine receptors in the spinal cord. Because extracellular Cl- is higher than intracellular Cl-, opening a chloride channel lets negatively charged Cl- flow into the cell, making the inside of the membrane more negative (hyperpolarising it) and moving the membrane potential further from the threshold needed to fire an action potential.

## answer_d
Outward movement of sodium ions

## explanation_d
Incorrect. Sodium does not move outward under normal physiological gradients — its concentration gradient favours entry, not exit, so this describes a movement that does not occur at a resting or inhibited synapse.

## topic
Physiology

## subtopic
Synaptic transmission: inhibitory postsynaptic potentials

## main_concept
CON-NEU-59D9EB48CC5685

## concept_ids
CON-NEU-59D9EB48CC5685

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PHY-SYNAPTIC-TRANSMISSION

## resource_ids

## learning_objective
State that chloride influx (e.g. via GABA-A or glycine receptor-linked channels) is one classic mechanism generating an IPSP, alongside potassium efflux via a separate channel.

## source_citation
FOMSCU Foundation 2, EOY 2025, Q8

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'Inward movement of chloride ions', FOMSCU Foundation 2 QBank
fomscu: EOY 2025 Q8; source-JSON extraction.

---

# Item

## id
QST-SCUFBS103-S2-PATHOLOGY-CASPASESAPOPTOSIS

## title
Feature distinguishing apoptosis from necrosis

## question
Which of the following is considered a characteristic sign of apoptosis but NOT necrosis?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Cellular swelling

## explanation_a
Incorrect. Cellular swelling (oncosis) is a hallmark of necrosis, caused by failure of membrane ion pumps and osmotic water influx — it is not a feature of apoptosis, where cells characteristically shrink instead.

## answer_b
Severe inflammatory response

## explanation_b
Incorrect. A severe inflammatory response is a hallmark of necrosis, triggered when a ruptured plasma membrane spills intracellular contents into the surrounding tissue — apoptosis, by contrast, is specifically designed to avoid triggering inflammation, since the cell is packaged into membrane-bound apoptotic bodies before it is cleared.

## answer_c
Activation of caspases

## explanation_c
Correct. Activation of caspases — a cascade of cysteine-aspartic proteases — is the defining biochemical signature of apoptosis, the programmed, energy-dependent form of cell death. Caspases execute the ordered dismantling of the cell (DNA fragmentation, chromatin condensation, membrane blebbing into apoptotic bodies) without ever rupturing the plasma membrane, in sharp contrast to necrosis, which is an unregulated, energy-independent process with no caspase activation, ending in membrane rupture and the inflammatory response that follows.

## answer_d
Rupture of the plasma membrane

## explanation_d
Incorrect. Rupture of the plasma membrane is a hallmark of necrosis, releasing intracellular contents and triggering inflammation — apoptotic cells instead keep their membrane intact until they are cleared by phagocytes, packaged inside apoptotic bodies.

## topic
Pathology

## subtopic
Cell death: apoptosis versus necrosis

## main_concept
CON-FND-B73A14B982823D

## concept_ids
CON-FND-B73A14B982823D

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PATH-GENERAL-PATHOLOGY

## resource_ids

## learning_objective
Identify caspase activation as the defining feature of apoptosis, distinct from necrosis's swelling, membrane rupture, and inflammatory response.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q11

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'Activation of caspases', FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q11; source-JSON extraction.

---

# Item

## id
QST-SCUFBS103-S2-PATHOLOGY-PROGNOSISDEFINITION

## title
Definition of prognosis

## question
The definition of prognosis in pathology refers to:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
The structural changes in cells

## explanation_a
Incorrect. The structural changes in cells is the domain of morphology (or pathologic anatomy) — what a disease looks like under the microscope or to the naked eye, not what its future course will be.

## answer_b
The expected further outcome of a disease

## explanation_b
Correct. Prognosis is the expected further outcome of a disease — a forecast of its likely course, including the chances of recovery, the risk of complications, and expected survival, based on the natural history of the condition and the patient's own clinical picture. It is one of the distinct pillars of general pathology's vocabulary, standing apart from etiology (cause), pathogenesis (the mechanistic sequence from stimulus to disease), and morphology (structural change).

## answer_c
The underlying mechanism of the disease

## explanation_c
Incorrect. The underlying mechanism of the disease is pathogenesis — the sequence of cellular and molecular events from the initial stimulus to the disease's full expression — a different concept describing how the disease develops, not how it will end.

## answer_d
The primary cause of the disease

## explanation_d
Incorrect. The primary cause of the disease is etiology — what starts the disease process — a different pathology concept from prognosis, which instead concerns what happens after the disease is already established.

## topic
Pathology

## subtopic
General pathology terminology

## main_concept
CON-FND-7D011E24749B51

## concept_ids
CON-FND-7D011E24749B51

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
75

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PATH-GENERAL-PATHOLOGY

## resource_ids

## learning_objective
Define prognosis as a disease's expected future outcome, distinguishing it from etiology (cause), pathogenesis (mechanism), and morphology (structural change).

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q43

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'The expected further outcome of a disease', FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q43; source-JSON extraction.

---

# Item

## id
QST-SCUFBS103-S2-PATHOLOGY-NECROSISALWAYSPATHOLOGICAL

## title
Whether necrosis is physiological or pathological

## question
Which of the following statements is true regarding necrosis?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
It is only a physiological process

## explanation_a
Incorrect. Necrosis is never a normal, programmed part of physiological tissue turnover — that role belongs to apoptosis, which is a controlled, energy-dependent process built into normal development and homeostasis.

## answer_b
It is only a pathological process

## explanation_b
Correct. Necrosis is only a pathological process — it is always the result of an external injurious insult (ischaemia, toxins, infection, trauma, extreme temperature) overwhelming the cell's ability to survive, and it is never a normal or programmed physiological event. This is exactly what separates it from apoptosis, which the body uses routinely and deliberately (e.g. clearing cells during development, or turning over cells with limited lifespans) as a physiological process alongside its pathological uses (e.g. eliminating damaged cells).

## answer_c
It can be physiological or pathological

## explanation_c
Incorrect. Unlike apoptosis, which genuinely can be either physiological or pathological, necrosis has no physiological role at all — it is exclusively a response to cell injury.

## answer_d
It occurs without an inflammatory response

## explanation_d
Incorrect. Necrosis characteristically does trigger an inflammatory response, because the ruptured plasma membrane releases intracellular contents that act as damage signals recruiting inflammatory cells — the opposite of what this option claims.

## topic
Pathology

## subtopic
Cell death: apoptosis versus necrosis

## main_concept
CON-FND-55871BD453F7D5

## concept_ids
CON-FND-55871BD453F7D5

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PATH-GENERAL-PATHOLOGY

## resource_ids

## learning_objective
State that necrosis is exclusively a pathological process (unlike apoptosis, which can be physiological or pathological), and that it characteristically triggers inflammation.

## source_citation
FOMSCU Foundation 2, EOY 2025, Q29

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'It is only a pathological process', FOMSCU Foundation 2 QBank
fomscu: EOY 2025 Q29; source-JSON extraction.

---

# Item

## id
QST-SCUFBS103-S2-PATHOLOGY-HEPATOCYTENECROSIS

## title
Cell injury shown by hepatocyte eosinophilia and pyknosis

## question
Upon microscopic examination of a hepatocyte from a female patient with viral hepatitis, the cell displays increased cytoplasmic eosinophilia and nuclear pyknosis. What type of cell injury does this represent?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Apoptosis

## explanation_a
Incorrect. Apoptosis typically shows cell shrinkage and chromatin condensation into sharply demarcated fragments (not pyknosis of a single intact nucleus), with membrane-bound apoptotic bodies forming — a distinct picture from the increased eosinophilia this stem describes.

## answer_b
Fatty change

## explanation_b
Incorrect. Fatty change (steatosis) shows cytoplasmic vacuoles of accumulated lipid displacing the nucleus, not increased eosinophilia and nuclear pyknosis.

## answer_c
Cloudy swelling

## explanation_c
Incorrect. Cloudy swelling is an early, reversible form of cell injury showing pale, swollen cytoplasm from water accumulation — the opposite histological appearance from the increased (deepened) eosinophilia described here, which signals a later, irreversible stage.

## answer_d
Necrosis

## explanation_d
Correct. Increased cytoplasmic eosinophilia reflects denatured, coagulated cytoplasmic proteins binding more of the pink eosin stain, with loss of the basophilic ribosomal RNA that normally offsets it. Nuclear pyknosis — shrinkage and hyperchromatic condensation of the nucleus — is one of necrosis's three characteristic nuclear changes, alongside karyorrhexis and karyolysis. Together, these two findings are the classic light-microscopic picture of coagulative necrosis, exactly the pattern of irreversible hepatocyte injury seen in viral hepatitis.

## topic
Pathology

## subtopic
Cell injury: histological features of necrosis

## main_concept
CON-FND-13B9A84358220C

## concept_ids
CON-FND-13B9A84358220C

## contextual_concept_ids

## difficulty
Hard

## question_type
Application

## cognitive_effort
High

## cognitive_effort_score
0.8

## setting
Academic

## reasoning_level
3

## inferred_difficulty
30

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PATH-GENERAL-PATHOLOGY

## resource_ids

## learning_objective
Recognise increased cytoplasmic eosinophilia and nuclear pyknosis as the histological signature of necrosis (coagulative pattern), distinct from apoptosis, fatty change, and cloudy swelling.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q44

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'Necrosis', FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q44; source-JSON extraction. Note: the automated find-existing.mjs pass returned several live 'necrosis' hits (respiratory, endocrine, TB, malaria contexts) — re-read against this question, none matched this specific hepatocyte/viral-hepatitis histological fact, so this concept is minted fresh.

---

# Item

## id
QST-SCUFBS103-S2-PATHOLOGY-PATHOGENESISDEFINITION

## title
Definition of pathogenesis

## question
The sequence of events in the response of cells or tissues to an etiologic agent, from the initial stimulus to the ultimate expression of the disease, is defined as:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Pathogenesis

## explanation_a
Correct. Pathogenesis is the sequence of events in the response of cells or tissues to an etiologic agent, from the initial stimulus all the way to the ultimate expression of the disease — the mechanistic story of how a disease develops, step by step, once its cause has already acted. It is one of general pathology's four core concepts alongside etiology (cause), morphology (structural change) and clinical significance/prognosis (outcome), and it is commonly the single most exam-tested of the four because it is where the actual biological mechanism is described.

## answer_b
Morphology

## explanation_b
Incorrect. Morphology describes the structural changes (gross and microscopic) that result from the disease process — the visible end-result, not the sequence of events leading up to it.

## answer_c
Epidemiology

## explanation_c
Incorrect. Epidemiology is the study of disease distribution and determinants across populations — who gets a disease and how often, not the mechanistic sequence within an individual patient.

## answer_d
Etiology

## explanation_d
Incorrect. Etiology is the initiating cause of the disease (the agent itself) — the starting point that pathogenesis then describes the consequences of, not the sequence of events that follows it.

## topic
Pathology

## subtopic
General pathology terminology

## main_concept
CON-FND-9781724BEA638B

## concept_ids
CON-FND-9781724BEA638B

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
75

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PATH-GENERAL-PATHOLOGY

## resource_ids

## learning_objective
Define pathogenesis as the mechanistic sequence from etiologic stimulus to disease expression, distinguishing it from etiology, morphology, and epidemiology.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q12

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'Pathogenesis', FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q12; source-JSON extraction. Note: the automated find-existing.mjs pass returned live hits about specific-disease pathogenesis (rheumatic fever, fatty liver) — re-read against this question, none matched this general-definition fact, so this concept is minted fresh.

---

# Item

## id
QST-SCUFBS103-S2-PARASITOLOGY-PARASITEDEFINITION

## title
Definition of a parasite

## question
A living organism that depends temporarily or permanently upon another organism for its survival is called a:

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Paratenic host

## explanation_a
Incorrect. A paratenic host is a transport host that a parasite passes through without developing further — it is a role a host organism plays, not the definition of the parasite itself.

## answer_b
Free-living organism

## explanation_b
Incorrect. A free-living organism is, by definition, one that does not depend on another organism for survival — the exact opposite of what the question describes.

## answer_c
Parasite

## explanation_c
Correct. A parasite is a living organism that depends, temporarily or permanently, upon another organism (the host) for its survival, typically at the host's expense. This dependency spectrum — temporary (as in a mosquito taking a blood meal) or permanent (as in an intestinal helminth living its whole life cycle in one host) — is the defining feature of parasitism, distinguishing it from free-living organisms and from other ecological relationships such as vectorship.

## answer_d
Vector

## explanation_d
Incorrect. A vector is an organism (typically an arthropod) that transmits a pathogen or parasite from one host to another — a transmission role, not a definition of dependency-based survival on a host.

## topic
Parasitology

## subtopic
General parasitology: definitions

## main_concept
CON-INF-63C6092E5624B7

## concept_ids
CON-INF-63C6092E5624B7

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
75

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PARA-BASICS

## resource_ids

## learning_objective
Define a parasite as an organism dependent on a host for survival (temporarily or permanently), distinct from a paratenic host, free-living organism, or vector.

## source_citation
FOMSCU Foundation 2, EOY 2025, Q26

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'Parasite', FOMSCU Foundation 2 QBank
fomscu: EOY 2025 Q26; source-JSON extraction. Note: the automated find-existing.mjs pass returned a live citation about eosinophil defence against helminthic parasites — re-read against this question, that is a different specific fact (immune defence mechanism, not the definition of 'parasite'), so this concept is minted fresh.

---

# Item

## id
QST-SCUFBS103-S2-PARASITOLOGY-SCOLEXHEAD

## title
Name for the head of a tapeworm

## question
The head of a tapeworm is called:

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Strobila

## explanation_a
Incorrect. The strobila is the entire chain of segments (proglottids) making up the tapeworm's body, not its head — the whole ribbon-like body, not one structure at one end.

## answer_b
Scolex

## explanation_b
Correct. The scolex is the head of a tapeworm (cestode) — the anterior attachment organ that anchors the worm to the host's intestinal wall, typically bearing suckers and, in armed species, hooks (or, in some genera, sucking grooves called bothria). It is the structure the tapeworm uses to hold on, and it is also clinically significant because passage of the scolex in a stool sample after treatment is taken as confirmation of successful, complete expulsion of the worm — a retained scolex can regenerate the entire strobila.

## answer_c
Bothrium

## explanation_c
Incorrect. A bothrium is one specific type of attachment structure — a sucking groove — found on the scolex of certain tapeworms (such as Diphyllobothrium latum); it is a feature of the scolex, not a synonym for the whole head.

## answer_d
Proglottid

## explanation_d
Incorrect. A proglottid is one individual segment of the tapeworm's body (the strobila is the chain of these), each capable of producing eggs — not the head of the worm.

## topic
Parasitology

## subtopic
Cestodes: tapeworm anatomy

## main_concept
CON-INF-5044125F542E57

## concept_ids
CON-INF-5044125F542E57

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
75

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PARA-BASICS

## resource_ids

## learning_objective
Identify the scolex as the tapeworm's head/attachment organ, distinguishing it from the strobila (whole body), bothrium (a groove on the scolex), and proglottid (a segment).

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q34

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'Scolex', FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q34; source-JSON extraction.

---

# Item

## id
QST-SCUFBS103-S2-PARASITOLOGY-DIAGNOSTICSTAGEDEFINITION

## title
Definition of the diagnostic stage of a parasite

## question
The specific stage of a parasite that is detected in laboratory specimens to identify the organism is known as the:

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Infective stage

## explanation_a
Incorrect. The infective stage is the form of the parasite capable of entering and establishing infection in a new host — a role defined by transmission capability, not by being the form a laboratory happens to detect (though the two can sometimes coincide, they are conceptually distinct).

## answer_b
Diagnostic stage

## explanation_b
Correct. The diagnostic stage is the specific form of a parasite — an egg, a larva, a cyst, a trophozoite, or an adult, depending on the species — that is detected in laboratory specimens (commonly stool, blood, or tissue) to identify the organism and confirm infection. Different parasites are identified by different diagnostic stages: for most soil-transmitted helminths it is the egg found in stool, while for Strongyloides stercoralis it is instead the rhabditiform larva, since that species characteristically releases larvae rather than eggs into the faeces.

## answer_c
Pathogenic stage

## explanation_c
Incorrect. The pathogenic stage would describe the form of the parasite responsible for causing disease/damage in the host — a description of harm, not of what a laboratory test detects to make the diagnosis.

## answer_d
Free-living stage

## explanation_d
Incorrect. The free-living stage describes a parasite life-cycle phase spent outside any host in the external environment — unrelated to which stage a laboratory specimen is searched for.

## topic
Parasitology

## subtopic
General parasitology: definitions

## main_concept
CON-INF-9862785477EDDA

## concept_ids
CON-INF-9862785477EDDA

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PARA-BASICS

## resource_ids

## learning_objective
Define the diagnostic stage as the parasite form detected in lab specimens to confirm infection, distinguishing it from the infective, pathogenic, and free-living stages.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q6

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'Diagnostic stage', FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q6; source-JSON extraction. Note: automated find-existing.mjs hits were all about specific worms' own diagnostic stages (Strongyloides, Taenia, Hymenolepis), not a general definition of the term itself, so this concept is minted fresh; those specific-worm facts are cross-referenced in related_concept_ids where already minted (rhabditiform larvae, scolex).

---

# Item

## id
QST-SCUFBS103-S2-MICROBIOLOGY-MYCELIUM

## title
Name for a mass of fungal hyphae

## question
A mass of hyphae forming the vegetative portion of a fungus is called:

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Pseudohyphae

## explanation_a
Incorrect. Pseudohyphae are chains of elongated budding yeast cells that fail to separate completely, resembling true hyphae without being a mass of hyphae themselves — a different structural feature, seen for example in Candida species.

## answer_b
Septate hyphae

## explanation_b
Incorrect. Septate hyphae describes hyphae that are divided into individual cells by cross-walls (septa), as opposed to non-septate (coenocytic) hyphae — a description of one hyphal structural type, not the name for a mass of hyphae as a whole.

## answer_c
Mycelium

## explanation_c
Correct. When individual fungal hyphae aggregate into a visible mass, the resulting macroscopic structure is called the mycelium. It is the vegetative (feeding, growing) portion of a mould-type fungus, distinct from a yeast form or a single hyphal filament. It is also distinct from fungal spores, which are the reproductive structures the mycelium eventually produces for dispersal.

## answer_d
Spore

## explanation_d
Incorrect. A spore is the fungus's reproductive structure, produced by the mycelium for dispersal and propagation — the output of the mycelium's activity, not the mass of hyphae itself.

## topic
Microbiology

## subtopic
Mycology: fungal morphology

## main_concept
CON-INF-7213E96DAD38D1

## concept_ids
CON-INF-7213E96DAD38D1

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
75

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-INF-FUNGAL-MORPHOLOGY-CELL-WALL

## resource_ids

## learning_objective
Identify the mycelium as the macroscopic mass of fungal hyphae, distinct from pseudohyphae, septate hyphae, and spores.

## source_citation
FOMSCU Foundation 2, EOY 2025, Q23

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'Mycelium', FOMSCU Foundation 2 QBank
fomscu: EOY 2025 Q23; source-JSON extraction. Apply after docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md.

---

# Item

## id
QST-SCUFBS103-S2-MICROBIOLOGY-CONTINUOUSCELLLINE

## title
Cell culture type supporting extended viral replication

## question
A type of cell culture that can reproduce for an extended number of generations and is used to support viral replication is called a:

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Primary cell culture

## explanation_a
Incorrect. A primary cell culture is taken directly from tissue and, unlike a continuous cell line, can only be passaged a limited number of times before the cells senesce and stop dividing — the opposite of the extended-generations culture the question describes.

## answer_b
Continuous cell line

## explanation_b
Correct. Continuous cell culture lines used for viral isolation are immortalized cells (for example, tumour-derived cell lines) capable of indefinite serial passage, unlike primary cell cultures, which are taken directly from tissue and can only be passaged a limited number of times before senescing. This capacity for essentially unlimited, extended-generation reproduction is exactly why continuous cell lines (such as HeLa cells) are the standard laboratory workhorse for supporting viral replication in diagnostic and research virology.

## answer_c
Diploid fibroblast cell

## explanation_c
Incorrect. Diploid fibroblast cell strains sit between primary cultures and continuous lines: they can be passaged for many more generations than a primary culture but are still finite (not immortal, unlike a true continuous line) before senescing.

## answer_d
Connective tissue culture

## explanation_d
Incorrect. Connective tissue culture is not a standard virology cell-culture category at all — it names a tissue type, not a defined culture class with a known passage capacity.

## topic
Microbiology

## subtopic
Virology: cell culture methods

## main_concept
CON-INF-5B65FB27C77C1C

## concept_ids
CON-INF-5B65FB27C77C1C

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-O6U-IMP-VIROLOGY-ESSENTIALS

## resource_ids

## learning_objective
Identify the continuous (immortalized) cell line as the culture type capable of extended-generation reproduction used for viral replication, distinct from primary cultures and diploid fibroblast strains.

## source_citation
FOMSCU Foundation 2, EOY 2025, Q24

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer 'Continuous cell line', FOMSCU Foundation 2 QBank
fomscu: EOY 2025 Q24; source-JSON extraction. Apply after docs/6October-Source-Imports/concept/O6U-IMP-106-new-concepts.md.
