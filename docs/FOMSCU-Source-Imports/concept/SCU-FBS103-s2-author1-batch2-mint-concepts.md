<!--
  SCU-FBS103 · Foundation 2 — S2 minting pass, first author lane
  (scu-fbs103-author1), second batch. 14 concepts genuinely new to the
  corpus after re-verification: `find-existing.mjs` on the final canonical
  key AND a `grep -ril` of 2-3 distinctive terms across every
  `docs/*-Source-Imports/concept/`, `pending-live/` directory, plus a read
  of every hit body.

  Two of these (pathology-necrosis, pathology-pathogenesis) surfaced
  automated "live" hits from this same triage pass that did NOT survive a
  closer read — both were homonym collisions (a generic word matching an
  unrelated specific-disease record) already documented in
  `coverage/SCU-FBS103-triage.md`'s manual-QA table and repeated here in
  each record's own field_notes.

  Ids minted with `mint-concept-id.mjs`, checked against the live snapshot
  and the taken-id scan; none derived for a concept that already exists.
  `atomic_claim_ids` is `[clear]` on every record — this lane is scoped to
  concept, article and question files, and mints no evidence claim or
  citation records, matching the standing convention already documented in
  Kasr's 103-BMS-mcq-lipid-concepts.md. The evidence chain is owed and named
  in the hand-off report, not concealed.

  `primary_node_id` is left blank with a field_note on every record: the
  canonical DIS-* taxonomy nodes could not be resolved from this worktree in
  the time this lane had. `module_subject` carries FOMSCU's own placement
  instead.

  Sources: FOMSCU Foundation 2 own-source quiz-app JSON, keys and stems read
  directly from `06 EOM Exams/*.json` and `07 EOY Exams/*.json` (question
  numbers cited per record) — printed keys stand; every explanation is
  written fresh in the platform's own voice from standard textbook fact,
  never translated from the source JSON's own (FOMNINU-sourced) Arabic
  explanation field.
-->

# Item

## label
Synaptic fatigue during prolonged stimulation results from presynaptic neurotransmitter depletion

## id
CON-NEU-187212984D2D39

## canonical_key
physiology.synaptic-fatigue.neurotransmitter-depletion

## aliases
Synaptic fatigue mechanism
Neurotransmitter store depletion

## arabic_label


## arabic_aliases


## definition
Synaptic fatigue — the progressive decline in the size of the postsynaptic response during prolonged, intense, repetitive stimulation of a synapse — occurs primarily because the readily releasable pool of neurotransmitter-containing vesicles in the presynaptic terminal becomes depleted faster than it can be replenished. With fewer vesicles available to release per action potential, less neurotransmitter reaches the postsynaptic membrane and the postsynaptic response progressively weakens. This is a protective mechanism against runaway excitation such as a seizure, since fatigue at the synapse acts as an automatic brake on excessive circuit activity.

## explicit_objective
State that synaptic fatigue results from depletion of the presynaptic neurotransmitter (vesicle) store, distinct from postsynaptic ATP depletion, calcium accumulation, or receptor inactivation.

## pitfalls
Attributing fatigue to postsynaptic mechanisms (ATP depletion, receptor inactivation) rather than the presynaptic vesicle-pool depletion that is the actual textbook cause.

## concept_type
directly_taught_fact

## status
under review

## subject
neuro

## topic
Physiology

## subtopic
Synaptic transmission: synaptic fatigue

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PHY-SYNAPTIC-TRANSMISSION

## related_article_ids


## related_concept_ids
CON-NEU-53839F781995A8 | CON-NEU-59D9EB48CC5685 | CON-NEU-4A8E746367C011

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Physiology > Nerve Physiology > Synaptic Transmission

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q7 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the primary cause of synaptic fatigue during prolonged and intense neuronal stimulation? ... Exhaustion of the neurotransmitter storage" (FOMSCU Foundation 2 EOM MID 2026, Q7)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "synaptic fatigue" and "neurotransmitter depletion" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Ligand-gated potassium channel opening (K+ efflux) generates an IPSP

## id
CON-NEU-53839F781995A8

## canonical_key
physiology.ipsp.ligand-gated-potassium-channels

## aliases
IPSP potassium mechanism
GABA-B receptor hyperpolarisation

## arabic_label


## arabic_aliases


## definition
One of the two classic mechanisms for generating an inhibitory postsynaptic potential (IPSP) is the opening of ligand-gated (neurotransmitter-gated) potassium channels — for example by GABA acting at GABA-B receptors — which lets K+ flow out of the cell down its electrochemical gradient. This outward movement of positive charge hyperpolarises the membrane, moving the membrane potential further from threshold and making the neuron less likely to fire.

## explicit_objective
State that ligand-gated potassium channel opening (K+ efflux, hyperpolarisation) is one classic mechanism generating an IPSP, alongside chloride influx via a separate channel.

## pitfalls
Confusing ligand-gated (neurotransmitter-triggered) potassium channels with voltage-gated potassium channels, which instead drive the action potential's repolarisation phase.

## concept_type
directly_taught_fact

## status
under review

## subject
neuro

## topic
Physiology

## subtopic
Synaptic transmission: inhibitory postsynaptic potentials

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PHY-SYNAPTIC-TRANSMISSION

## related_article_ids


## related_concept_ids
CON-NEU-59D9EB48CC5685 | CON-NEU-4A8E746367C011

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Physiology > Nerve Physiology > Synaptic Transmission

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q8 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Inhibitory postsynaptic potentials (IPSPs) are most likely caused by the opening of which of the following channels? ... Ligand-gated potassium channels" (FOMSCU Foundation 2 EOM MID 2026, Q8)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "IPSP potassium channel" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The peripheral nervous system links the CNS with the rest of the body

## id
CON-NEU-34B9628127826B

## canonical_key
physiology.pns.definition

## aliases
PNS definition
Cranial and spinal nerves

## arabic_label


## arabic_aliases


## definition
The peripheral nervous system (PNS) comprises all the neural structures outside the brain and spinal cord — the cranial and spinal nerves, their ganglia, and peripheral receptors. Its defining role is to carry sensory information from the body into the CNS and carry motor commands from the CNS out to muscles and glands, making it the structure that links the CNS with every other part of the body. The autonomic and enteric nervous systems are best understood as functional subdivisions within the PNS, not separate parallel systems.

## explicit_objective
State that the peripheral nervous system links the CNS with the rest of the body, with the autonomic and enteric nervous systems as its own functional subdivisions.

## pitfalls
Treating the autonomic or enteric nervous system as the general CNS-to-body link, rather than recognising them as subdivisions of the broader peripheral nervous system.

## concept_type
directly_taught_fact

## status
under review

## subject
neuro

## topic
Physiology

## subtopic
Nervous system organisation

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PHY-SYNAPTIC-TRANSMISSION

## related_article_ids


## related_concept_ids
CON-NEU-2E84668E9F281C

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.3

## exam_weight_by_year
SCU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Physiology > Nerve Physiology > Nervous System Organisation

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q37 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The nervous system division that links the Central Nervous System with all other parts of the body is the: ... Peripheral nervous system (PNS)" (FOMSCU Foundation 2 EOM MID 2026, Q37)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "peripheral nervous system definition" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Voltage-gated K+ channel opening lets K+ leave the neuron, causing hyperpolarisation

## id
CON-NEU-4A8E746367C011

## canonical_key
physiology.resting-neuron.voltage-gated-potassium-hyperpolarization

## aliases
Potassium efflux hyperpolarisation
Repolarisation mechanism

## arabic_label


## arabic_aliases


## definition
When voltage-gated K+ channels open, potassium flows down its electrochemical gradient out of the neuron, since intracellular K+ concentration is high relative to extracellular. This outward movement of positive charge makes the inside of the membrane more negative than it already was at rest — hyperpolarisation — moving the membrane potential further from threshold. This is the mechanism behind the repolarisation and after-hyperpolarisation phases that follow an action potential's depolarising upstroke.

## explicit_objective
State that voltage-gated K+ channel opening lets K+ leave the neuron, hyperpolarising the membrane, distinct from sodium's depolarising entry.

## pitfalls
Reversing the direction of ion flow or the resulting membrane-potential change — K+ leaves and the membrane hyperpolarises, it does not enter and depolarise.

## concept_type
directly_taught_fact

## status
under review

## subject
neuro

## topic
Physiology

## subtopic
Resting membrane potential and repolarisation

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PHY-SYNAPTIC-TRANSMISSION

## related_article_ids


## related_concept_ids
CON-NEU-53839F781995A8 | CON-NEU-59D9EB48CC5685

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Physiology > Nerve Physiology > Resting Membrane Potential

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q39 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What happens when voltage-gated potassium (K+) channels open in a resting neuron? ... K+ leaves the neuron causing hyperpolarization" (FOMSCU Foundation 2 EOM MID 2026, Q39)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "voltage-gated potassium hyperpolarization" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Beta-2 receptors predominate in bronchial smooth muscle and mediate bronchodilation

## id
CON-NEU-2E84668E9F281C

## canonical_key
physiology.beta2-receptors.bronchial-smooth-muscle

## aliases
Beta-2 adrenergic receptors, lung
Bronchodilation receptor

## arabic_label


## arabic_aliases


## definition
Beta-2 receptors are the predominant sympathetic receptor subtype in bronchial (airway) smooth muscle, and their activation causes bronchodilation (smooth muscle relaxation). This is the physiological basis for why beta-2 agonists (such as salbutamol) are the mainstay bronchodilator drug class for asthma and COPD, and why non-selective beta-blockers can precipitate bronchospasm in susceptible patients by removing that tonic beta-2-mediated relaxation.

## explicit_objective
State that beta-2 receptors predominate in bronchial smooth muscle and mediate bronchodilation, distinct from cardiac beta-1, vascular alpha-1, and parasympathetic muscarinic receptors.

## pitfalls
Confusing beta-2 (lung, relaxant) with beta-1 (heart, chronotropic/inotropic) or alpha-1 (vasculature, constrictor) receptor territories.

## concept_type
directly_taught_fact

## status
under review

## subject
neuro

## topic
Physiology

## subtopic
Autonomic nervous system: adrenergic receptors

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PHY-SYNAPTIC-TRANSMISSION

## related_article_ids


## related_concept_ids
CON-NEU-34B9628127826B

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.5

## exam_weight_by_year
SCU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.4

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Physiology > Autonomic Nervous System > Adrenergic Receptors

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY 2025 Q1 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which type of sympathetic autonomic nervous system receptors is predominantly present in the smooth muscles of the lungs? ... Beta-2 receptors" (FOMSCU Foundation 2 EOY 2025, Q1)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "beta-2 receptors lung" and "bronchial smooth muscle receptors" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Chloride influx generates an IPSP

## id
CON-NEU-59D9EB48CC5685

## canonical_key
physiology.ipsp.chloride-influx

## aliases
IPSP chloride mechanism
GABA-A/glycine receptor hyperpolarisation

## arabic_label


## arabic_aliases


## definition
The other classic mechanism for generating an IPSP, alongside K+ efflux through ligand-gated potassium channels, is the inward movement of chloride ions — for example through GABA-A receptor-linked chloride channels, or glycine receptors in the spinal cord. Because extracellular Cl- is higher than intracellular Cl-, opening a chloride channel lets negatively charged Cl- flow into the cell, hyperpolarising the membrane and moving it further from the threshold needed to fire an action potential.

## explicit_objective
State that chloride influx (e.g. via GABA-A or glycine receptor-linked channels) is one classic mechanism generating an IPSP, alongside potassium efflux via a separate channel.

## pitfalls
Treating the potassium-efflux and chloride-influx IPSP mechanisms as mutually exclusive or interchangeable rather than two distinct receptor-linked routes to the same hyperpolarising outcome.

## concept_type
directly_taught_fact

## status
under review

## subject
neuro

## topic
Physiology

## subtopic
Synaptic transmission: inhibitory postsynaptic potentials

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PHY-SYNAPTIC-TRANSMISSION

## related_article_ids


## related_concept_ids
CON-NEU-53839F781995A8 | CON-NEU-4A8E746367C011

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Physiology > Nerve Physiology > Synaptic Transmission

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY 2025 Q8 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"An inhibitory postsynaptic potential (IPSP) is primarily generated by which of the following ion movements? ... Inward movement of chloride ions" (FOMSCU Foundation 2 EOY 2025, Q8)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "IPSP chloride" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Caspase activation is the defining feature of apoptosis, absent in necrosis

## id
CON-FND-B73A14B982823D

## canonical_key
pathology.apoptosis-vs-necrosis.caspase-activation

## aliases
Apoptosis biochemical signature
Caspase cascade

## arabic_label


## arabic_aliases


## definition
Activation of caspases — a cascade of cysteine-aspartic proteases — is the defining biochemical signature of apoptosis, the programmed, energy-dependent form of cell death. Caspases execute the ordered dismantling of the cell (DNA fragmentation, chromatin condensation, membrane blebbing into apoptotic bodies) without ever rupturing the plasma membrane. This is in sharp contrast to necrosis, which is an unregulated, energy-independent process with no caspase activation, ending in membrane rupture and the inflammatory response that follows.

## explicit_objective
Identify caspase activation as the defining feature of apoptosis, distinct from necrosis's swelling, membrane rupture, and inflammatory response.

## pitfalls
Attributing caspase activation or another apoptosis-specific feature (controlled dismantling, no inflammation) to necrosis, or vice versa.

## concept_type
directly_taught_fact

## status
under review

## subject
fnd

## topic
Pathology

## subtopic
Cell death: apoptosis versus necrosis

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PATH-GENERAL-PATHOLOGY

## related_article_ids


## related_concept_ids
CON-FND-55871BD453F7D5 | CON-FND-13B9A84358220C

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Pathology > Cell Injury and Death > Apoptosis versus Necrosis

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q11 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following is considered a characteristic sign of apoptosis but NOT necrosis? ... Activation of caspases" (FOMSCU Foundation 2 EOM MID 2026, Q11)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "caspase activation apoptosis" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Prognosis is the expected further outcome of a disease

## id
CON-FND-7D011E24749B51

## canonical_key
pathology.prognosis.definition

## aliases
Prognosis definition
Expected disease course

## arabic_label


## arabic_aliases


## definition
Prognosis is the expected further outcome of a disease — a forecast of its likely course, including the chances of recovery, the risk of complications, and expected survival, based on the natural history of the condition and the patient's own clinical picture. It is one of the distinct pillars of general pathology's vocabulary, standing apart from etiology (cause), pathogenesis (the mechanistic sequence from stimulus to disease), and morphology (structural change).

## explicit_objective
Define prognosis as a disease's expected future outcome, distinguishing it from etiology (cause), pathogenesis (mechanism), and morphology (structural change).

## pitfalls
Confusing prognosis (future outcome) with pathogenesis (mechanism leading to the disease) — both describe a disease's "story" but at opposite ends of the timeline.

## concept_type
definition

## status
under review

## subject
fnd

## topic
Pathology

## subtopic
General pathology terminology

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PATH-GENERAL-PATHOLOGY

## related_article_ids


## related_concept_ids
CON-FND-9781724BEA638B

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.3

## exam_weight_by_year
SCU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Pathology > General Pathology Terminology

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q43 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The definition of prognosis in pathology refers to: ... The expected further outcome of a disease" (FOMSCU Foundation 2 EOM MID 2026, Q43)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "prognosis definition pathology" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Necrosis is exclusively a pathological process

## id
CON-FND-55871BD453F7D5

## canonical_key
pathology.necrosis.always-pathological

## aliases
Necrosis never physiological
Necrosis versus apoptosis physiological role

## arabic_label


## arabic_aliases


## definition
Necrosis is only a pathological process — it always results from an external injurious insult (ischaemia, toxins, infection, trauma, extreme temperature) overwhelming the cell's ability to survive, and it is never a normal or programmed physiological event. This separates it from apoptosis, which the body uses routinely and deliberately (e.g. clearing cells during development, or turning over cells with limited lifespans) as a physiological process alongside its pathological uses. Necrosis also characteristically triggers an inflammatory response, because the ruptured plasma membrane releases intracellular contents that act as damage signals recruiting inflammatory cells.

## explicit_objective
State that necrosis is exclusively a pathological process (unlike apoptosis, which can be physiological or pathological), and that it characteristically triggers inflammation.

## pitfalls
Assuming necrosis, like apoptosis, can be physiological — it cannot; necrosis is always the result of cell injury.

## concept_type
directly_taught_fact

## status
under review

## subject
fnd

## topic
Pathology

## subtopic
Cell death: apoptosis versus necrosis

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PATH-GENERAL-PATHOLOGY

## related_article_ids


## related_concept_ids
CON-FND-B73A14B982823D | CON-FND-13B9A84358220C

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Pathology > Cell Injury and Death > Apoptosis versus Necrosis

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY 2025 Q29 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following statements is true regarding necrosis? ... It is only a pathological process" (FOMSCU Foundation 2 EOY 2025, Q29)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "necrosis pathological process" — 0 genuine matches (automated hits were specific-disease necrosis facts, not this general statement).
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
Increased cytoplasmic eosinophilia and nuclear pyknosis are the histological signature of necrosis

## id
CON-FND-13B9A84358220C

## canonical_key
pathology.necrosis.hepatocyte-viral-hepatitis-pyknosis

## aliases
Coagulative necrosis histology
Hepatocyte necrosis in viral hepatitis

## arabic_label


## arabic_aliases


## definition
Increased cytoplasmic eosinophilia reflects denatured, coagulated cytoplasmic proteins binding more of the pink eosin stain, with loss of the basophilic ribosomal RNA that normally offsets it. Nuclear pyknosis — shrinkage and hyperchromatic condensation of the nucleus — is one of necrosis's three characteristic nuclear changes, alongside karyorrhexis and karyolysis. Together, these two findings are the classic light-microscopic picture of coagulative necrosis, exactly the pattern of irreversible hepatocyte injury seen in viral hepatitis.

## explicit_objective
Recognise increased cytoplasmic eosinophilia and nuclear pyknosis as the histological signature of necrosis (coagulative pattern), distinct from apoptosis, fatty change, and cloudy swelling.

## pitfalls
Confusing coagulative necrosis's eosinophilia/pyknosis picture with apoptosis's cell shrinkage and fragmented chromatin, or with fatty change's cytoplasmic vacuolation.

## concept_type
directly_taught_fact

## status
under review

## subject
fnd

## topic
Pathology

## subtopic
Cell injury: histological features of necrosis

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PATH-GENERAL-PATHOLOGY

## related_article_ids


## related_concept_ids
CON-FND-B73A14B982823D | CON-FND-55871BD453F7D5

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.6

## academic_relevance
0.4

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Pathology > Cell Injury and Death > Histological Features

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q44 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Upon microscopic examination of a hepatocyte from a female patient with viral hepatitis, the cell displays increased cytoplasmic eosinophilia and nuclear pyknosis. What type of cell injury does this represent? ... Necrosis" (FOMSCU Foundation 2 EOM MID 2026, Q44)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
sourceCandidateIds: find-existing.mjs on "necrosis" returned several live hits (respiratory infection, endocrine haemorrhage, TB hypersensitivity, malarial renal failure) — read against this question, none matched this specific hepatocyte/viral-hepatitis histological fact (eosinophilia + pyknosis); not merged.

---

# Item

## label
Pathogenesis is the mechanistic sequence from etiologic stimulus to disease expression

## id
CON-FND-9781724BEA638B

## canonical_key
pathology.pathogenesis.definition

## aliases
Pathogenesis definition
Disease mechanism sequence

## arabic_label


## arabic_aliases


## definition
Pathogenesis is the sequence of events in the response of cells or tissues to an etiologic agent, from the initial stimulus all the way to the ultimate expression of the disease. It is one of general pathology's four core concepts alongside etiology (cause), morphology (structural change) and prognosis (outcome), and it is commonly the single most exam-tested of the four because it describes the actual biological mechanism.

## explicit_objective
Define pathogenesis as the mechanistic sequence from etiologic stimulus to disease expression, distinguishing it from etiology, morphology, and epidemiology.

## pitfalls
Confusing pathogenesis (mechanism) with etiology (the initiating cause) or epidemiology (population-level distribution) — all describe different facets of a disease's story.

## concept_type
definition

## status
under review

## subject
fnd

## topic
Pathology

## subtopic
General pathology terminology

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PATH-GENERAL-PATHOLOGY

## related_article_ids


## related_concept_ids
CON-FND-7D011E24749B51

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Pathology > General Pathology Terminology

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q12 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The sequence of events in the response of cells or tissues to an etiologic agent, from the initial stimulus to the ultimate expression of the disease, is defined as: ... Pathogenesis" (FOMSCU Foundation 2 EOM MID 2026, Q12)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
sourceCandidateIds: find-existing.mjs on "pathogenesis" returned live hits about specific-disease pathogenesis (rheumatic fever, fatty liver) — read against this question, none matched this general-definition fact; not merged.

---

# Item

## label
A parasite depends on a host organism, temporarily or permanently, for survival

## id
CON-INF-63C6092E5624B7

## canonical_key
parasitology.parasite.definition

## aliases
Parasite definition
Host dependency

## arabic_label


## arabic_aliases


## definition
A parasite is a living organism that depends, temporarily or permanently, upon another organism (the host) for its survival, typically at the host's expense. This dependency spectrum — temporary, as in a mosquito taking a blood meal, or permanent, as in an intestinal helminth living its whole life cycle in one host — is the defining feature of parasitism, distinguishing it from free-living organisms and from other ecological relationships such as vectorship.

## explicit_objective
Define a parasite as an organism dependent on a host for survival (temporarily or permanently), distinct from a paratenic host, free-living organism, or vector.

## pitfalls
Confusing a parasite's own definition with the role of a paratenic host (a transport host) or a vector (a transmitting organism) — all appear in parasitology vocabulary but describe different relationships.

## concept_type
definition

## status
under review

## subject
inf

## topic
Parasitology

## subtopic
General parasitology: definitions

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PARA-BASICS

## related_article_ids


## related_concept_ids
CON-INF-5044125F542E57 | CON-INF-9862785477EDDA

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.3

## exam_weight_by_year
SCU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Parasitology > General Parasitology Definitions

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2025 | EOY 2025 Q26 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A living organism that depends temporarily or permanently upon another organism for its survival is called a: ... Parasite" (FOMSCU Foundation 2 EOY 2025, Q26)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.
sourceCandidateIds: find-existing.mjs on "parasite" returned a live citation about eosinophil defence against helminthic parasites — read against this question, that is a different specific fact (immune defence mechanism, not the definition of "parasite" itself); not merged.

---

# Item

## label
The scolex is the head (attachment organ) of a tapeworm

## id
CON-INF-5044125F542E57

## canonical_key
parasitology.tapeworm.scolex-head

## aliases
Tapeworm attachment organ
Cestode head

## arabic_label


## arabic_aliases


## definition
The scolex is the head of a tapeworm (cestode) — the anterior attachment organ that anchors the worm to the host's intestinal wall, typically bearing suckers and, in armed species, hooks (or, in some genera, sucking grooves called bothria). Passage of the scolex in a stool sample after treatment is taken as confirmation of successful, complete expulsion of the worm, since a retained scolex can regenerate the entire strobila (body).

## explicit_objective
Identify the scolex as the tapeworm's head/attachment organ, distinguishing it from the strobila (whole body), bothrium (a groove on the scolex), and proglottid (a segment).

## pitfalls
Confusing the scolex (the head itself) with a bothrium (one specific attachment structure found on some scolices) or with the strobila (the whole segmented body).

## concept_type
definition

## status
under review

## subject
inf

## topic
Parasitology

## subtopic
Cestodes: tapeworm anatomy

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PARA-BASICS

## related_article_ids


## related_concept_ids
CON-INF-63C6092E5624B7

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Parasitology > Cestodes

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q34 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The head of a tapeworm is called: ... Scolex" (FOMSCU Foundation 2 EOM MID 2026, Q34)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
sourceCandidateIds: find-existing.mjs on "scolex tapeworm head" — 0 hits, safe to create.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

---

# Item

## label
The diagnostic stage is the parasite form detected in lab specimens to confirm infection

## id
CON-INF-9862785477EDDA

## canonical_key
parasitology.diagnostic-stage.definition

## aliases
Diagnostic stage definition
Parasite identification stage

## arabic_label


## arabic_aliases


## definition
The diagnostic stage is the specific form of a parasite — an egg, a larva, a cyst, a trophozoite, or an adult, depending on the species — that is detected in laboratory specimens (commonly stool, blood, or tissue) to identify the organism and confirm infection. Different parasites are identified by different diagnostic stages: for most soil-transmitted helminths it is the egg found in stool, while for Strongyloides stercoralis it is instead the rhabditiform larva, since that species characteristically releases larvae rather than eggs into the faeces.

## explicit_objective
Define the diagnostic stage as the parasite form detected in lab specimens to confirm infection, distinguishing it from the infective, pathogenic, and free-living stages.

## pitfalls
Assuming the diagnostic stage and the infective stage are always the same form — for many parasites they differ (e.g. Strongyloides: rhabditiform larva is diagnostic, filariform larva is infective).

## concept_type
definition

## status
under review

## subject
inf

## topic
Parasitology

## subtopic
General parasitology: definitions

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## learner_years
1

## universities
scu

## modules
SCU-FBS103

## article_ids
ART-SCU-FBS103-PARA-BASICS

## related_article_ids


## related_concept_ids
CON-INF-63C6092E5624B7 | CON-GIT-9041A06C9B074B | CON-INF-5044125F542E57

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## blueprint_weight
0.4

## exam_weight_by_year
SCU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.5

## module_subject
SCU-FBS103 > Parasitology > General Parasitology Definitions

## exam_signal
FOMSCU Foundation 2 own-source QBank | past_exam | 2026 | EOM MID 2026 Q6 | SCU-FBS103

## confidence
0.9

## support_mode
direct_statement

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The specific stage of a parasite that is detected in laboratory specimens to identify the organism is known as the: ... Diagnostic stage" (FOMSCU Foundation 2 EOM MID 2026, Q6)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## exclusion_reason


## field_notes
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
atomicClaimIds: Written [clear] and owed. This lane mints no evidence claim or citation records; the gap is named in the hand-off report.

sourceCandidateIds: find-existing.mjs on "diagnostic stage" returned hits about specific worms' own diagnostic stages (Strongyloides, Taenia, Hymenolepis) — read against this question, none matched a general definition of the term itself; not merged, but the rhabditiform-larvae and scolex concepts are cross-linked as related worked examples.
