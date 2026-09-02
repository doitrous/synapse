<!--
  SCU-FBS102 · Foundation 1 — S2 minting pass, fifth author lane
  (scu-fbs102-author5), physiology + genetics cluster, authored from the
  reconciled true remainder (see LEDGER.md and the hand-off report). 37
  concepts, covering 44 distinct triage-key candidates and 46 authored
  questions (some raw source questions collapsed onto a shared concept
  where the two source papers asked near-identical stems about the same
  fact — e.g. the four fever
  set-point questions all test one concept, `physiology-pumps-constantly-active`
  and `physiology-the-pumps-are-constantly-active-in-all-c` share one
  concept — same reuse-within-lane pattern the sibling
  `pending-live-reuse-batch1/2.json` seeds already used for duplicate-key
  questions).

  Every candidate re-verified before minting: `find-existing.mjs` run with
  full multi-word context (not the bare answer word this lane's own
  triage.md §7 warns collides on homonyms — `conduction`, `repolarization`
  etc.), plus `grep -ril` of distinctive terms across every
  `docs/*-Source-Imports/{concept,pending-live}` and `docs/import-ready`
  directory, with every hit's body read in full, not just its filename.
  Hits that surfaced were consistently a different, system-specific fact
  (Kasr's `103-BMS`/`104-CPS` cardiac-electrophysiology and refractory-period
  concepts describe the same channel biology in a CVS-course context, not
  this Foundation-level generic-neuron fact) — judged genuinely new, not a
  duplicate, and none minted where a closer read showed the same fact.

  Ids minted with `mint-concept-id.mjs`, checked against the live snapshot
  and the taken-id scan at mint time; no collision on any of the 35.
  `atomic_claim_ids` is `[clear]` on every record — this lane is scoped to
  concept, article and question files, no evidence claim or citation
  records, matching lane 3/4's own convention; the evidence chain is owed
  and named in the hand-off report.

  `primary_node_id` is left blank on every record — the canonical DIS-*
  taxonomy nodes could not be resolved from this worktree in the time this
  lane had, same gap lane 3/4 named; `module_subject` carries FOMSCU's own
  placement instead.

  Sources: FOMSCU Foundation 1 own-source quiz-app JSON, keys and stems read
  directly from `03 Questions and QBank/*.json`, `06 EOM Exams/*.json` and
  `07 EOY Exams/*.json` (question numbers cited per record in `exam_signal`)
  — printed keys stand; every explanation and every option is written fresh
  in the platform's own voice from the underlying textbook fact, never
  translated from the source JSON's own Arabic explanation field. A small
  number of source MCQ option lists were themselves truncated or garbled by
  the upstream scrape (noted per-record in `field_notes`/question
  `author_notes` where it applies) — reconstructed to the standard textbook
  fact the question is clearly testing, per LANE-CARD guidance that printed
  keys stand even where option wording needs recovery.
-->

# Item

## label
Repolarization of a neuronal action potential is driven by voltage-gated potassium channels opening

## id
CON-NEU-59E4FF70ED6A9F

## canonical_key
physiology.action-potential.repolarization-potassium-channels

## aliases
Potassium efflux causes action potential repolarization

## arabic_label

## arabic_aliases

## definition
The falling (repolarization) phase of a neuronal action potential is produced by the delayed opening of voltage-gated potassium channels. These channels open in response to the same depolarization that opened the fast voltage-gated sodium channels, but with a lag, so their outward K+ current becomes dominant only after the sodium channels have already inactivated. The resulting efflux of K+ down its electrochemical gradient drives the membrane potential back toward, and briefly past, the resting potential, restoring the cell's negative interior before the cycle can repeat.

## explicit_objective
State that the repolarization phase of an action potential is produced by the opening of voltage-gated potassium channels, not by sodium channel activity.

## pitfalls
Attributing repolarization to sodium channels closing rather than to potassium channels actively opening — sodium channel inactivation ends depolarization, but it is the delayed K+ efflux that actively drives the membrane back down.

## concept_type
fact_recall

## status
under review

## subject
neuro

## topic
Physiology

## subtopic
Nerve physiology: the action potential

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-ACTION-POTENTIAL-IONIC-BASIS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Nerve and Muscle Physiology > Action Potential

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q8, Formative and Past Exams 2023 Q8

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q8, Formative and Past Exams 2023 Q8.

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

---

# Item

## label
Total body water, as a fraction of body weight, is lower in adult females than in adult males

## id
CON-FND-4B53B516BB9F34

## canonical_key
physiology.body-fluids.total-body-water-lower-in-females

## aliases
Sex difference in total body water

## arabic_label

## arabic_aliases

## definition
Total body water makes up roughly 60% of body weight in an average adult male but only about 50% in an average adult female. The difference is explained by body composition rather than any difference in fluid regulation: adipose tissue holds very little water compared with lean tissue, and adult females carry a proportionally higher percentage of body fat than adult males of comparable weight. The same logic explains why total body water, expressed as a fraction of weight, also falls with increasing adiposity in either sex.

## explicit_objective
State that total body water as a percentage of body weight is lower in adult females than adult males, and attribute the difference to higher average body fat, not to fluid intake or renal handling.

## pitfalls
Assuming the sex difference reflects different fluid intake or kidney function rather than the underlying difference in body fat percentage.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Physiology

## subtopic
Body fluid compartments

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-CELL-MEMBRANE-AND-FLUID-BASICS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Body Fluids > Total Body Water

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q17, Formative and Past Exams 2023 Q17

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q17, Formative and Past Exams 2023 Q17.

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

---

# Item

## label
Fever is produced by pyrogens resetting the hypothalamic thermoregulatory set point upward

## id
CON-FND-B8F05CD464D977

## canonical_key
physiology.thermoregulation.fever-pyrogen-resets-set-point-up

## aliases
Pyrogens raise the hypothalamic set point; fever mechanism

## arabic_label

## arabic_aliases

## definition
Fever is not a failure of thermoregulation but a deliberate, regulated shift in it. Pyrogens — exogenous agents such as bacterial products, or endogenous cytokines such as IL-1, IL-6 and TNF-alpha released during infection — act on the hypothalamic thermoregulatory center to raise (reset) its set point above the normal value, around 37 degrees Celsius. Because the body's actual core temperature is now below this new, higher set point, the hypothalamus drives heat-gain and heat-conservation responses — shivering, cutaneous vasoconstriction, and behavioural heat-seeking — exactly as it would if a normal set point were too cold, and core temperature climbs until it matches the new, elevated set point.

## explicit_objective
Explain fever as pyrogen-mediated resetting of the hypothalamic set point upward, and state that the ensuing shivering and vasoconstriction are the normal response to a body temperature that is now below the new set point.

## pitfalls
Describing fever as a breakdown of thermoregulation, or as a passive rise in temperature, rather than as the hypothalamus actively defending a new, higher target.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Physiology

## subtopic
Thermoregulation and fever

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-THERMOREGULATION-FEVER

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Homeostasis > Thermoregulation

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q20, Formative and Past Exams 2021 Q28, Formative and Past Exams 2022 Q8, Formative and Past Exams 2021 Q69, Formative and Past Exams 2023 Q20

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q20, Formative and Past Exams 2021 Q28, Formative and Past Exams 2022 Q8, Formative and Past Exams 2021 Q69, Formative and Past Exams 2023 Q20.

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

---

# Item

## label
The body's structural hierarchy runs chemicals, cells, tissues, organs, systems, whole body

## id
CON-FND-18EB8629EEA015

## canonical_key
physiology.body-organization.levels-chemicals-to-whole-body

## aliases
Levels of structural organization of the human body

## arabic_label

## arabic_aliases

## definition
Human structure is organized into six ascending levels of increasing complexity. Chemicals (atoms and molecules) combine to form cells, the smallest living units; cells of a similar type and function group into tissues; two or more tissue types combine to form organs, each performing specific tasks; organs that cooperate toward a common physiological goal form organ systems; and the systems together constitute the whole organism. Each level is built from, and depends on, the level below it — a tissue cannot exist without cells, and a system cannot function if its constituent organs fail.

## explicit_objective
State the correct ascending order of structural organization: chemicals, cells, tissues, organs, systems, whole body.

## pitfalls
Placing organs before tissues, or cells before chemicals — each level is built strictly from the one immediately below it.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Physiology

## subtopic
Introduction to physiology

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-HOMEOSTASIS-CONTROL-SYSTEMS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Homeostasis > Levels of Organization

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q26, Formative and Past Exams 2022 Q6

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q26, Formative and Past Exams 2022 Q6.

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

---

# Item

## label
Synaptic fatigue (exhaustion) is caused by depletion of releasable neurotransmitter at a repeatedly stimulated synapse

## id
CON-NEU-89D6CDB4D82195

## canonical_key
physiology.synapse.synaptic-fatigue-neurotransmitter-depletion

## aliases
Neurotransmitter depletion causes synaptic fatigue

## arabic_label

## arabic_aliases

## definition
When a synapse is stimulated repeatedly and at a high frequency for a sustained period, its postsynaptic response progressively weakens — a phenomenon called synaptic fatigue or exhaustion. The principal cause is depletion of the readily releasable pool of neurotransmitter vesicles in the presynaptic terminal: mobilization and release of vesicles cannot keep pace with the rate of stimulation, so less neurotransmitter reaches the synaptic cleft per action potential and the postsynaptic depolarization shrinks accordingly. Fatigue is a protective phenomenon in the nervous system — for example, it helps prevent seizure activity from spreading unchecked — and it resolves once the terminal has had time to replenish its vesicle stores.

## explicit_objective
State that synaptic fatigue (exhaustion) after repetitive stimulation is caused chiefly by depletion of presynaptic neurotransmitter stores, not by receptor damage or oxygen lack.

## pitfalls
Attributing synaptic fatigue to postsynaptic receptor inactivation or to local hypoxia rather than to presynaptic neurotransmitter depletion.

## concept_type
fact_recall

## status
under review

## subject
neuro

## topic
Physiology

## subtopic
Synaptic transmission

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-ACTION-POTENTIAL-IONIC-BASIS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Nerve and Muscle Physiology > Synaptic Transmission

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q31, Formative and Past Exams 2022 Q11

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q31, Formative and Past Exams 2022 Q11.

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

---

# Item

## label
Carbon dioxide crosses the plasma membrane by simple diffusion through the lipid bilayer

## id
CON-FND-E4107B60CD0342

## canonical_key
physiology.membrane-transport.co2-simple-diffusion

## aliases
CO2 simple diffusion across the cell membrane

## arabic_label

## arabic_aliases

## definition
Simple diffusion allows a molecule to cross the plasma membrane directly through the lipid bilayer, with no carrier protein and no energy expenditure, provided the molecule is small, uncharged and reasonably lipid soluble. Carbon dioxide satisfies all three conditions: it is a small, nonpolar gas that dissolves readily in the hydrophobic interior of the bilayer, so it moves freely down its partial-pressure gradient between cell and interstitium. Polar or charged solutes such as glucose and amino acids, by contrast, cannot cross the hydrophobic core unassisted and require a specific membrane transporter.

## explicit_objective
State that carbon dioxide crosses the plasma membrane by simple diffusion through the lipid bilayer because it is small, nonpolar and lipid soluble.

## pitfalls
Assuming any small molecule needs a channel or carrier to cross the membrane — simple diffusion applies specifically to small, uncharged, lipid-soluble molecules such as O2 and CO2.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Physiology

## subtopic
Cell membrane transport

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-CELL-MEMBRANE-AND-FLUID-BASICS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Cell Physiology > Membrane Transport

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q43, Formative and Past Exams 2022 Q23

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q43, Formative and Past Exams 2022 Q23.

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

---

# Item

## label
Maximal strenuous exercise raises systolic blood pressure while diastolic pressure changes little

## id
CON-CVS-69FF62DF5B6F9B

## canonical_key
physiology.exercise.systolic-pressure-increases-with-exertion

## aliases
Exercise-induced rise in systolic blood pressure

## arabic_label

## arabic_aliases

## definition
During dynamic strenuous exercise, cardiac output rises sharply because of an increased heart rate and stroke volume, driven by sympathetic activation and increased venous return from the working muscles' skeletal-muscle pump. This surge in cardiac output raises systolic blood pressure substantially. Diastolic pressure, in contrast, stays roughly the same or falls slightly, because exercising skeletal muscle vasodilates markedly, lowering total peripheral resistance and offsetting the effect of the higher cardiac output on the diastolic trough.

## explicit_objective
State that maximal exercise raises systolic blood pressure substantially, mainly through increased cardiac output, while diastolic pressure remains relatively unchanged because of exercising-muscle vasodilation.

## pitfalls
Assuming both systolic and diastolic pressure rise together with exercise — the fall in peripheral resistance from muscle vasodilation keeps diastolic pressure from climbing.

## concept_type
fact_recall

## status
under review

## subject
cvs

## topic
Physiology

## subtopic
Cardiovascular response to exercise

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-CVS-EXERCISE-AND-CAPILLARY-DYNAMICS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Cardiovascular Physiology > Exercise Physiology

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q49, Formative and Past Exams 2022 Q29

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q49, Formative and Past Exams 2022 Q29.

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

---

# Item

## label
Afterhyperpolarization following an action potential is caused by delayed closure of voltage-gated potassium channels

## id
CON-NEU-5F2CC7790C106F

## canonical_key
physiology.action-potential.afterhyperpolarization-delayed-potassium-closure

## aliases
Delayed potassium channel closure causes the after-hyperpolarization

## arabic_label

## arabic_aliases

## definition
After a neuron's action potential repolarizes back to the resting potential, the membrane briefly becomes even more negative than rest — the afterhyperpolarization, or undershoot. This occurs because the voltage-gated potassium channels responsible for repolarization close more slowly than they opened: they remain open for a short interval after the membrane has already returned to resting potential, so K+ continues to leave the cell and drives the membrane potential transiently past rest, toward the potassium equilibrium potential, before the channels finally close and the resting potential is restored.

## explicit_objective
State that the afterhyperpolarization following an action potential is caused by the delayed closure of the same voltage-gated potassium channels that produced repolarization.

## pitfalls
Attributing afterhyperpolarization to calcium or chloride channel activity rather than to the lingering open state of the repolarizing potassium channels.

## concept_type
fact_recall

## status
under review

## subject
neuro

## topic
Physiology

## subtopic
Nerve physiology: the action potential

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-ACTION-POTENTIAL-IONIC-BASIS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Nerve and Muscle Physiology > Action Potential

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q53, Formative and Past Exams 2022 Q33

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q53, Formative and Past Exams 2022 Q33.

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

---

# Item

## label
Aldosterone decreases urinary sodium excretion by promoting sodium reabsorption in the distal nephron

## id
CON-REN-EE968B3D8E6398

## canonical_key
physiology.aldosterone.decreases-sodium-excretion

## aliases
Aldosterone promotes renal sodium reabsorption

## arabic_label

## arabic_aliases

## definition
Aldosterone, released from the adrenal cortex mainly in response to angiotensin II and rising plasma potassium, acts on principal cells of the late distal tubule and collecting duct. There it upregulates epithelial sodium channels and the basolateral Na+/K+-ATPase, increasing sodium reabsorption from the tubular fluid back into the blood. Because more filtered sodium is reclaimed, less sodium is lost in the urine — aldosterone decreases sodium excretion — and water follows sodium osmotically, so the hormone also expands extracellular fluid volume. The coupled effect on the same channels is increased potassium secretion into the tubule, which is why aldosterone excess causes hypokalemia alongside sodium retention.

## explicit_objective
State that aldosterone decreases urinary sodium excretion by increasing sodium reabsorption in the distal nephron, with a coupled increase in potassium secretion.

## pitfalls
Confusing aldosterone's sodium effect (reabsorption, decreased excretion) with its potassium effect (secretion, increased excretion) — the two ions move in opposite net directions at the same channel.

## concept_type
fact_recall

## status
under review

## subject
renal

## topic
Physiology

## subtopic
Renal regulation of sodium

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-RENAL-ALDOSTERONE

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Renal Physiology > Sodium Regulation

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q54, Formative and Past Exams 2022 Q34

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q54, Formative and Past Exams 2022 Q34.

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

---

# Item

## label
The absolute refractory period occurs because voltage-gated sodium channels are inactivated

## id
CON-NEU-82201BA24E2CE0

## canonical_key
physiology.action-potential.absolute-refractory-sodium-channel-inactivation

## aliases
Sodium channel inactivation underlies the absolute refractory period

## arabic_label

## arabic_aliases

## definition
Voltage-gated sodium channels cycle through three states: closed (resting), open (activated), and inactivated. Once a channel opens during the depolarization phase of an action potential, it rapidly enters the inactivated state, in which its inactivation gate blocks the pore regardless of membrane voltage. While the great majority of sodium channels sit in this inactivated state — spanning depolarization and much of repolarization — no stimulus, however strong, can trigger a second action potential, because there are not enough available (closed, activatable) sodium channels to generate the necessary inward current. Only once the membrane has repolarized far enough for channels to return from inactivated to closed does excitability recover, first partially (the relative refractory period) and then fully.

## explicit_objective
State that the absolute refractory period is caused by voltage-gated sodium channels sitting in the inactivated state, making them unavailable to reopen regardless of stimulus strength.

## pitfalls
Confusing channel inactivation with simple channel closing — an inactivated channel cannot reopen even if depolarized again, unlike a closed (resting) channel.

## concept_type
fact_recall

## status
under review

## subject
neuro

## topic
Physiology

## subtopic
Nerve physiology: the action potential

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-ACTION-POTENTIAL-IONIC-BASIS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Nerve and Muscle Physiology > Action Potential

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q57, Formative and Past Exams 2022 Q37

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q57, Formative and Past Exams 2022 Q37.

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

---

# Item

## label
Bulk flow of fluid across the capillary wall is driven by the hydrostatic pressure gradient between capillary and interstitium

## id
CON-CVS-779450D64D0D1D

## canonical_key
physiology.capillary.bulk-flow-hydrostatic-pressure-gradient

## aliases
Starling forces; capillary bulk flow

## arabic_label

## arabic_aliases

## definition
Bulk flow is the mass movement of water and its dissolved small solutes together, in one direction, through the pores of the capillary wall — distinct from diffusion, which moves individual solute molecules down their own concentration gradients. It is driven by the net balance of the Starling forces: capillary hydrostatic pressure, which is highest at the arteriolar end and pushes fluid outward into the interstitium (filtration), opposed by plasma colloid osmotic (oncotic) pressure, which pulls fluid back into the capillary (reabsorption). Because hydrostatic pressure falls along the length of the capillary while oncotic pressure stays roughly constant, filtration dominates at the arteriolar end and reabsorption typically dominates toward the venular end.

## explicit_objective
State that bulk flow across the capillary wall is driven predominantly by the hydrostatic pressure gradient, and distinguish it from diffusion of individual solutes.

## pitfalls
Confusing bulk flow (mass movement of fluid through pores, driven by pressure) with simple diffusion (movement of individual solute molecules down a concentration gradient).

## concept_type
fact_recall

## status
under review

## subject
cvs

## topic
Physiology

## subtopic
Capillary dynamics

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-CVS-EXERCISE-AND-CAPILLARY-DYNAMICS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Cardiovascular Physiology > Capillary Exchange

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q60, Formative and Past Exams 2022 Q40

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q60, Formative and Past Exams 2022 Q40.

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

---

# Item

## label
Uterine contractions during labor are the classic physiological example of positive feedback

## id
CON-FND-012CF9158E1FCB

## canonical_key
physiology.feedback.positive-feedback-labor-contractions

## aliases
Ferguson reflex; positive feedback in labor

## arabic_label

## arabic_aliases

## definition
Positive feedback amplifies an initial change rather than correcting it, driving a process to completion rather than toward a stable set point. Labor contractions are the textbook physiological example: as the fetal head stretches the cervix, sensory signals travel to the hypothalamus and trigger oxytocin release from the posterior pituitary; oxytocin strengthens uterine contractions, which stretch the cervix further and trigger yet more oxytocin release. Each cycle intensifies the next — the Ferguson reflex — so contractions become progressively stronger and more frequent until delivery interrupts the loop, unlike the negative-feedback loops (thermoregulation, glucose control) that dominate everyday homeostasis and instead act to restore a stable set point.

## explicit_objective
State that progressively strengthening uterine contractions during labor, mediated by the oxytocin-driven Ferguson reflex, are the classic example of positive feedback, and contrast this with negative feedback.

## pitfalls
Classifying labor contractions as negative feedback by analogy with other homeostatic loops — positive feedback amplifies the stimulus instead of correcting it, and is deliberately rare in physiology because it is self-reinforcing rather than self-limiting.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Physiology

## subtopic
Feedback control systems

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-HOMEOSTASIS-CONTROL-SYSTEMS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Homeostasis > Feedback Mechanisms

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q75, Formative and Past Exams 2022 Q54

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q75, Formative and Past Exams 2022 Q54.

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

---

# Item

## label
The Na+/K+-ATPase is constantly active in essentially all cells, continuously pumping sodium out and potassium in

## id
CON-FND-A644A33FBF4FAE

## canonical_key
physiology.membrane-transport.sodium-potassium-pump-constantly-active

## aliases
Na/K pump continuous activity

## arabic_label

## arabic_aliases

## definition
The Na+/K+-ATPase is an active transporter present in the plasma membrane of virtually every cell in the body. On each cycle it hydrolyses one ATP to pump three Na+ ions out of the cell and two K+ ions into the cell, against their concentration gradients — an unequal, electrogenic exchange, not a one-for-one swap. Because leak channels constantly allow some Na+ back in and some K+ back out, the pump must run continuously, not intermittently, simply to hold the resting ionic gradients steady; this baseline activity is a major consumer of the cell's ATP and is what maintains the negative resting membrane potential and the gradients that make action potentials and secondary active transport possible.

## explicit_objective
State that the Na+/K+-ATPase is continuously (not intermittently) active in nearly all cells, pumping 3 Na+ out for every 2 K+ in per cycle, to maintain resting ionic gradients against constant leak.

## pitfalls
Assuming the pump moves equal numbers of sodium and potassium ions, or that it switches off once gradients are established — leak channels make its activity continuous, and its stoichiometry (3 Na+ out : 2 K+ in) is unequal.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Physiology

## subtopic
Cell membrane transport

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-CELL-MEMBRANE-AND-FLUID-BASICS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Cell Physiology > Membrane Transport

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q76, Formative and Past Exams 2022 Q55

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q76, Formative and Past Exams 2022 Q55.

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

---

# Item

## label
Conduction is heat loss by direct transfer to a cooler object or medium in physical contact with the body

## id
CON-FND-B977031D7C0C26

## canonical_key
physiology.thermoregulation.conduction-heat-loss-direct-contact

## aliases
Conductive heat loss

## arabic_label

## arabic_aliases

## definition
The body loses heat to its environment through four physical mechanisms: radiation (infrared emission with no contact needed), convection (heat carried away by moving air or water currents), evaporation (heat consumed as sweat or insensible water changes phase to vapour), and conduction (direct transfer of heat to a cooler object or medium that is in physical contact with the skin). Conduction is markedly accelerated when the contacting medium is water rather than air, because water conducts heat far more efficiently — which is exactly why wet clothing or immersion in cold water causes rapid, dangerous heat loss compared with dry clothing in the same ambient temperature.

## explicit_objective
Define conduction as heat loss by direct transfer to a cooler medium in physical contact with the skin, and state why wet clothing in cold weather accelerates it (water's high thermal conductivity).

## pitfalls
Confusing conduction with convection — conduction requires direct physical contact with the cooler medium, while convection is heat carried away by a moving current of air or water.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Physiology

## subtopic
Thermoregulation and fever

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-THERMOREGULATION-FEVER

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Homeostasis > Thermoregulation

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOM Foundation 1 2026 Q9

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOM Foundation 1 2026 Q9.

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

---

# Item

## label
The effector is the reflex-arc component that carries out the response to a stimulus

## id
CON-NEU-81A4A74CEEA72B

## canonical_key
physiology.reflex-arc.effector-carries-out-response

## aliases
Effector in the reflex arc

## arabic_label

## arabic_aliases

## definition
A reflex arc has five components in sequence: a receptor that detects the stimulus, an afferent (sensory) pathway that carries the signal toward the central nervous system, an integration center (commonly the spinal cord) that processes it, an efferent (motor) pathway that carries the outgoing signal, and the effector — the muscle or gland that actually carries out the response. In the withdrawal reflex triggered by touching a hot stove, the skin thermoreceptors are the receptor, the spinal cord is the integration center, and the arm's flexor muscles that pull the hand away are the effector: the structure that converts the nervous signal into the observable physiological action.

## explicit_objective
Identify the effector as the muscle or gland at the end of a reflex arc that executes the motor response, and distinguish it from the receptor, afferent/efferent pathways and integration center.

## pitfalls
Confusing the effector (which carries out the response) with the receptor (which detects the stimulus) — they sit at opposite ends of the same reflex arc.

## concept_type
fact_recall

## status
under review

## subject
neuro

## topic
Physiology

## subtopic
The reflex arc

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-ACTION-POTENTIAL-IONIC-BASIS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Nerve and Muscle Physiology > Reflex Arc

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOM Foundation 1 2026 Q19

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOM Foundation 1 2026 Q19.

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

---

# Item

## label
Feedforward control anticipates an expected disturbance and responds before it occurs

## id
CON-FND-BF03A19A976CFA

## canonical_key
physiology.control-systems.feedforward-anticipates-change

## aliases
Anticipatory (feedforward) control

## arabic_label

## arabic_aliases

## definition
Most physiological control operates as negative feedback: a variable must actually deviate from its set point before a correcting response is triggered. Feedforward control instead acts pre-emptively, before the controlled variable has changed at all, based on a signal that predicts a disturbance is coming — hence the name, because the response moves 'forward' ahead of the anticipated change rather than reacting after the fact. A familiar example is salivation and a rise in insulin secretion triggered by the sight or smell of food, before any nutrient has actually been absorbed and before blood glucose has risen — the body prepares for the expected change rather than waiting to correct it.

## explicit_objective
Define feedforward control as an anticipatory response triggered before an expected change occurs, and contrast it with negative feedback, which corrects a deviation only after it has happened.

## pitfalls
Treating feedforward as a form of negative feedback — negative feedback reacts to a deviation that has already occurred, while feedforward acts in anticipation of one that has not.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Physiology

## subtopic
Feedback control systems

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-HOMEOSTASIS-CONTROL-SYSTEMS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Homeostasis > Feedback Mechanisms

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOM Foundation 1 2026 Q21

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOM Foundation 1 2026 Q21.

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

---

# Item

## label
The control center is the component of a homeostatic control system that compares the sensed value to the set point and initiates a corrective response

## id
CON-FND-820BADBE514D1B

## canonical_key
physiology.control-systems.control-center-compares-to-set-point

## aliases
Integrating (control) center in a homeostatic loop

## arabic_label

## arabic_aliases

## definition
A homeostatic control loop has three functional components. A receptor senses the current value of the regulated variable; a control center — typically a region of the brain such as the hypothalamus, though it can also be a more local integrating structure — receives that signal, compares it against the desired set point, and, if the two differ, generates an output command; and an effector then carries out the instructed response, whether that is shivering, sweating, or a hormonal secretion. The control center is specifically the comparison-and-decision step of the loop, sitting between sensing and acting.

## explicit_objective
Identify the control center as the component of a homeostatic loop that compares the sensed variable against the set point and issues the corrective command, distinct from the receptor and the effector.

## pitfalls
Confusing the control center with the effector — the control center decides what response is needed; the effector is what actually performs it.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Physiology

## subtopic
Feedback control systems

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-HOMEOSTASIS-CONTROL-SYSTEMS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Homeostasis > Feedback Mechanisms

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOY Foundation 1 2026 Q54

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOY Foundation 1 2026 Q54.

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

---

# Item

## label
When a fever breaks, the hypothalamic set point resets back down to normal, triggering heat-loss responses

## id
CON-FND-BF9E14504963C4

## canonical_key
physiology.thermoregulation.fever-breaks-set-point-resets-down

## aliases
Crisis phase of fever; set point resetting downward

## arabic_label

## arabic_aliases

## definition
Once the pyrogenic stimulus driving a fever subsides — because the infection is controlled, or an antipyretic such as paracetamol blocks prostaglandin-mediated set-point elevation — the hypothalamic set point resets back down toward its normal value. At that instant the body's actual core temperature is now higher than the newly lowered set point, the mirror image of the situation at fever onset, so the hypothalamus switches on heat-loss responses: cutaneous vasodilation (producing the classic flushed appearance) and sweating, which continue until core temperature falls to match the restored normal set point. This abrupt transition is traditionally called the crisis, as opposed to the more gradual return to baseline seen with lysis.

## explicit_objective
Explain that when a fever breaks, the hypothalamic set point resets down to normal, and that the resulting sweating and cutaneous vasodilation are the response to a core temperature that is now above the (now-lower) set point.

## pitfalls
Assuming sweating and flushing when a fever breaks reflect a set point rising further, rather than the set point resetting back down while core temperature briefly lags above it.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Physiology

## subtopic
Thermoregulation and fever

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-THERMOREGULATION-FEVER

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Homeostasis > Thermoregulation

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOM Foundation 1 2026 Q13

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOM Foundation 1 2026 Q13.

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

---

# Item

## label
Normal extracellular fluid osmolarity is approximately 300 mOsm per liter

## id
CON-FND-10FF6A7CC0F85D

## canonical_key
physiology.body-fluids.ecf-osmolarity-300-mosm-per-liter

## aliases
Normal plasma/ECF osmolarity

## arabic_label

## arabic_aliases

## definition
Extracellular fluid osmolarity — the total solute concentration of plasma and interstitial fluid, dominated by sodium and its accompanying anions — is tightly regulated around a normal value of approximately 300 mOsm/L (commonly cited as 275–295 mOsm/L in more precise clinical ranges, but taught in Foundation-level physiology as roughly 300 mOsm/L). Because water moves freely across most cell membranes, intracellular fluid osmolarity equilibrates with extracellular fluid osmolarity at the same value, and this shared osmolarity is what osmoreceptors in the hypothalamus continuously monitor to control thirst and ADH secretion.

## explicit_objective
State that normal extracellular fluid osmolarity is approximately 300 mOsm/L, and that this value is expressed in milliosmoles, not milligrams or osmoles, per liter.

## pitfalls
Confusing the units — osmolarity is expressed in milliosmoles per liter (mOsm/L), not milligrams per deciliter (a concentration unit) or whole osmoles per liter (three orders of magnitude too large).

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Physiology

## subtopic
Body fluid compartments

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-CELL-MEMBRANE-AND-FLUID-BASICS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Body Fluids > Osmolarity

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOY Foundation 1 2026 Q55

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOY Foundation 1 2026 Q55.

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

---

# Item

## label
Large molecules too big for channel proteins leave the cell by exocytosis

## id
CON-FND-2C80755377C8F5

## canonical_key
physiology.membrane-transport.exocytosis-exports-large-molecules

## aliases
Exocytosis exports large molecules

## arabic_label

## arabic_aliases

## definition
Molecules too large or too polar to pass through a membrane channel or carrier protein are instead moved across the plasma membrane in bulk, packaged inside a membrane-bound vesicle. To leave the cell, such a vesicle — formed by the Golgi apparatus and loaded with its cargo — migrates to the plasma membrane and fuses with it, releasing its contents to the exterior; this process is exocytosis. It is an active, energy-requiring process, used both for constitutive secretion (continuous export, such as of plasma proteins) and for regulated secretion triggered by a specific signal (such as calcium-triggered neurotransmitter or hormone release).

## explicit_objective
State that large molecules unable to cross the membrane through a channel or carrier are exported from the cell by exocytosis — vesicle fusion with the plasma membrane.

## pitfalls
Confusing exocytosis (export, vesicle fuses outward) with endocytosis (import, membrane buds inward) — they move cargo in opposite directions using the same basic vesicular strategy.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Physiology

## subtopic
Cell membrane transport

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-CELL-MEMBRANE-AND-FLUID-BASICS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Cell Physiology > Membrane Transport

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q42, Formative and Past Exams 2022 Q22

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q42, Formative and Past Exams 2022 Q22.

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

---

# Item

## label
Atrial natriuretic peptide (ANP) inhibits renal sodium reabsorption, promoting natriuresis

## id
CON-REN-3CA59BCF2866F6

## canonical_key
physiology.anp.inhibits-sodium-reabsorption

## aliases
ANP promotes natriuresis by inhibiting sodium reabsorption

## arabic_label

## arabic_aliases

## definition
Atrial natriuretic peptide (ANP) is secreted by atrial myocytes when a rising central blood volume stretches the atrial wall. It acts on the kidney to inhibit sodium reabsorption in the collecting duct — the direct physiological opposite of aldosterone's action — increasing urinary sodium loss (natriuresis) and, because water follows the unreabsorbed sodium, urinary water loss as well. ANP also promotes vasodilation and suppresses renin and aldosterone secretion, so its overall effect is to lower blood volume and blood pressure whenever the atria sense they are being overfilled — a direct counterweight to the renin-angiotensin-aldosterone system, which raises blood pressure and retains sodium.

## explicit_objective
State that atrial natriuretic peptide inhibits renal sodium reabsorption (promoting natriuresis), and that this is the physiological opposite of aldosterone's sodium-retaining action.

## pitfalls
Confusing ANP's effect with aldosterone's — ANP inhibits sodium reabsorption (promotes excretion) in response to atrial stretch, while aldosterone promotes sodium reabsorption (decreases excretion) in response to angiotensin II/hyperkalemia; the two hormones pull renal sodium handling in opposite directions.

## concept_type
fact_recall

## status
under review

## subject
renal

## topic
Physiology

## subtopic
Renal regulation of sodium

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-PHY-RENAL-ALDOSTERONE

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Physiology > Renal Physiology > Sodium Regulation

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q65, Formative and Past Exams 2022 Q45, EOY Foundation 1 2026 Q56

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q65, Formative and Past Exams 2022 Q45, EOY Foundation 1 2026 Q56.

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
sourceCandidateIds: Kasr's 104-CPS-mcq-concepts.md carries ANP's natriuretic function inside broader CVS-system concepts (hemorrhagic-shock compensatory hormones, RAAS-vs-ANP comparison) — read in full and judged a different fact, not a duplicate: those are system-level comparison/exception concepts, not this Foundation-level isolated hormone-function fact, so minted rather than overlaid.

---

# Item

## label
A secondary spermatocyte carries 23 duplicated chromosomes (46 chromatids), the haploid number still doubled

## id
CON-DEV-77845EA568BC7D

## canonical_key
genetics.spermatogenesis.secondary-spermatocyte-23-duplicated-chromosomes

## aliases
Secondary spermatocyte chromosome complement

## arabic_label

## arabic_aliases

## definition
A primary spermatocyte enters meiosis with 46 chromosomes, each already duplicated into two sister chromatids by the preceding S phase (46 duplicated chromosomes, 92 chromatids). The first meiotic division is reductional: it separates homologous chromosomes, not sister chromatids, halving the chromosome number but leaving each chromosome still duplicated. The result is two secondary spermatocytes, each with 23 duplicated chromosomes — 23 structures, each still made of two sister chromatids joined at the centromere, for 46 chromatids total. Only the second meiotic division, which separates the sister chromatids, converts this into the genuinely haploid, single-chromatid spermatid (23 single chromosomes).

## explicit_objective
State that a secondary spermatocyte has 23 duplicated chromosomes (46 chromatids) — haploid in chromosome number but each chromosome still doubled — and distinguish this from the 23 single chromosomes of the spermatid that follows the second meiotic division.

## pitfalls
Equating 'haploid' with 'single chromatid' — a secondary spermatocyte is already haploid in chromosome number (23) but each of those 23 chromosomes is still duplicated until the second meiotic division separates the chromatids.

## concept_type
fact_recall

## status
under review

## subject
dev

## topic
Genetics

## subtopic
Spermatogenesis

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-MEIOSIS-SPERMATOGENESIS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Gametogenesis > Spermatogenesis

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOY Foundation 1 2026 Q44

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOY Foundation 1 2026 Q44.

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

---

# Item

## label
In a nucleotide, the phosphate group is attached to the 5' carbon of the pentose sugar

## id
CON-FND-28BB941CB8376F

## canonical_key
genetics.nucleotide-structure.phosphate-attached-to-fifth-carbon

## aliases
5' phosphate linkage on the pentose sugar

## arabic_label

## arabic_aliases

## definition
A nucleotide is built from three parts: a nitrogenous base attached to the 1' carbon of a five-carbon (pentose) sugar, and a phosphate group attached to the sugar's 5' carbon. This 5'-phosphate is what links one nucleotide to the next during polymerization: a phosphodiester bond forms between the 5'-phosphate of one nucleotide and the free 3'-hydroxyl group of the preceding nucleotide's sugar, which is why a nucleic acid strand has an inherent 5'-to-3' directionality running from a free 5'-phosphate end to a free 3'-hydroxyl end.

## explicit_objective
State that the phosphate group of a nucleotide is attached to the 5' carbon of the pentose sugar, and that this 5' phosphate is what links successive nucleotides via a phosphodiester bond to the 3' hydroxyl of the next sugar.

## pitfalls
Placing the phosphate on the 3' carbon instead of the 5' — the 3' carbon carries the free hydroxyl that the next nucleotide's 5' phosphate attaches to, giving the strand its 5'-to-3' polarity.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Genetics

## subtopic
Nucleic acid structure

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-MOLECULAR-BIOLOGY-MITOCHONDRIAL

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Molecular Genetics > Nucleotide Structure

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q36, Formative and Past Exams 2022 Q16

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q36, Formative and Past Exams 2022 Q16.

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

---

# Item

## label
Cyclin-dependent kinases (CDKs), activated by cyclins, are internal signals that drive progression through the cell cycle

## id
CON-FND-E4791BA5E06846

## canonical_key
genetics.cell-cycle.cyclin-dependent-kinases-regulate-progression

## aliases
CDKs regulate the cell cycle

## arabic_label

## arabic_aliases

## definition
Progression through the cell cycle is controlled by cyclin-dependent kinases (CDKs), a family of enzymes that are present at a roughly constant level throughout the cycle but are catalytically inactive on their own. Each CDK requires binding to its partner cyclin — a regulatory protein whose concentration rises and falls in a stage-specific pattern — to become active; the resulting cyclin-CDK complex then phosphorylates target proteins that drive the cell past the relevant checkpoint (for example, into S phase or into mitosis). Because different cyclins peak at different times, sequential cyclin-CDK complexes impose an ordered, one-way progression through G1, S, G2 and M.

## explicit_objective
State that cyclin-dependent kinases are internal regulators of cell cycle progression, activated only when bound to their partner cyclin, and that sequential cyclin-CDK complexes drive the cell through successive checkpoints.

## pitfalls
Treating CDKs as active on their own — a CDK is inactive until it binds its specific cyclin partner; cyclin availability, not CDK availability, is what usually varies through the cycle.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Genetics

## subtopic
Cell cycle regulation

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-CELL-CYCLE-BASICS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Cell Cycle > Regulation

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOY Foundation 1 2026 Q41

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOY Foundation 1 2026 Q41.

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

---

# Item

## label
A single primary spermatocyte gives rise to four spermatids (and ultimately four sperm) after completing meiosis

## id
CON-DEV-B8D22B244F1E15

## canonical_key
genetics.spermatogenesis.primary-spermatocyte-yields-four-sperm

## aliases
Spermatogenesis yields four sperm per primary spermatocyte

## arabic_label

## arabic_aliases

## definition
Meiosis in spermatogenesis is a proliferative, equal division at every step, unlike oogenesis. A primary spermatocyte completes the first meiotic division to yield two secondary spermatocytes; each secondary spermatocyte then completes the second meiotic division to yield two spermatids, for four spermatids in total from the one original primary spermatocyte. Each of these four spermatids is genetically distinct — shuffled by crossing-over and independent assortment — and each subsequently matures (spermiogenesis) into a functional sperm, so one primary spermatocyte ultimately produces four mature sperm cells.

## explicit_objective
State that a single primary spermatocyte produces four spermatids/sperm after completing both meiotic divisions, because both divisions in spermatogenesis are equal (no polar bodies are discarded, unlike oogenesis).

## pitfalls
Applying the oogenesis pattern (one ovum plus discarded polar bodies) to spermatogenesis — spermatogenesis is symmetric at every division, so all four products survive as functional gametes.

## concept_type
fact_recall

## status
under review

## subject
dev

## topic
Genetics

## subtopic
Spermatogenesis

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-MEIOSIS-SPERMATOGENESIS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Gametogenesis > Spermatogenesis

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q29, Formative and Past Exams 2022 Q9

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q29, Formative and Past Exams 2022 Q9.

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

---

# Item

## label
Pairing of homologous chromosomes in meiosis I is what makes genetic recombination (crossing-over) possible

## id
CON-DEV-38EEEE71FB6A48

## canonical_key
genetics.meiosis.homologous-pairing-enables-recombination

## aliases
Synapsis enables crossing-over and recombination

## arabic_label

## arabic_aliases

## definition
During prophase of meiosis I, each chromosome must physically pair with its homologous partner — one maternal, one paternal copy of the same chromosome — in a process called synapsis, held together by the synaptonemal complex. This intimate physical pairing is the structural prerequisite for crossing-over: only while homologous chromosomes are aligned in register can non-sister chromatids exchange corresponding segments of DNA at chiasmata. The result is genetic recombination — new combinations of maternal and paternal alleles on the same chromosome — which is the principal source of genetic diversity among gametes beyond that produced by independent assortment alone.

## explicit_objective
State that pairing (synapsis) of homologous chromosomes during meiosis I is the structural requirement that permits crossing-over and thus genetic recombination between maternal and paternal chromatids.

## pitfalls
Assuming recombination could occur between non-homologous chromosomes or between sister chromatids without functional consequence — crossing-over that matters genetically requires alignment of homologous, non-sister chromatids at synapsis.

## concept_type
fact_recall

## status
under review

## subject
dev

## topic
Genetics

## subtopic
Meiosis

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-MEIOSIS-SPERMATOGENESIS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Cell Division > Meiosis

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q68, Formative and Past Exams 2022 Q48, EOY Foundation 1 2026 Q46

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q68, Formative and Past Exams 2022 Q48, EOY Foundation 1 2026 Q46.

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

---

# Item

## label
Homologous chromosomes, not sister chromatids, separate during anaphase I of meiosis

## id
CON-DEV-3E04D89ADD8B11

## canonical_key
genetics.meiosis.anaphase-i-homologous-chromosomes-separate

## aliases
Anaphase I separates homologues

## arabic_label

## arabic_aliases

## definition
Meiosis I and meiosis II differ in exactly what is pulled apart at anaphase. At anaphase I, the spindle pulls each pair of homologous chromosomes apart, sending one full (still-duplicated) homologue to each pole — the sister chromatids of each chromosome remain joined at their centromere throughout this division. It is only at anaphase II, mechanically identical to mitotic anaphase, that the sister chromatids of each chromosome are finally separated from each other. This distinction is what makes meiosis I reductional (halving chromosome number) and meiosis II equational (halving chromatid number without changing chromosome number).

## explicit_objective
State that homologous chromosomes separate at anaphase I of meiosis, while sister chromatids stay joined until they separate at anaphase II.

## pitfalls
Confusing anaphase I with anaphase II — sister chromatid separation happens at anaphase II (and at mitotic anaphase), not anaphase I, which separates homologous pairs instead.

## concept_type
fact_recall

## status
under review

## subject
dev

## topic
Genetics

## subtopic
Meiosis

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-MEIOSIS-SPERMATOGENESIS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Cell Division > Meiosis

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOY Foundation 1 2026 Q47

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOY Foundation 1 2026 Q47.

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

---

# Item

## label
The metaphase (spindle-assembly) checkpoint verifies that every chromosome is correctly attached to the mitotic spindle before anaphase begins

## id
CON-FND-255407988D93D1

## canonical_key
genetics.cell-cycle.metaphase-checkpoint-verifies-spindle-attachment

## aliases
Spindle-assembly checkpoint

## arabic_label

## arabic_aliases

## definition
The cell cycle contains several surveillance checkpoints that block progression until a prior step has been completed correctly. The metaphase checkpoint — also called the spindle-assembly checkpoint — monitors whether every chromosome's kinetochore is properly attached to spindle microtubules from opposite poles, with the chromosomes aligned at the metaphase plate. As long as even a single kinetochore is unattached or improperly attached, the checkpoint generates an inhibitory signal that halts the cell in metaphase, preventing entry into anaphase; only once every chromosome is correctly bi-oriented does the checkpoint release its block, allowing sister chromatids to separate and errors such as nondisjunction to be avoided.

## explicit_objective
State that the metaphase (spindle-assembly) checkpoint verifies correct attachment of every chromosome's kinetochore to the mitotic spindle before allowing the cell to proceed into anaphase.

## pitfalls
Confusing the metaphase checkpoint with the G1 or G2 checkpoints, which monitor cell size, DNA damage and readiness to replicate/divide rather than spindle attachment.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Genetics

## subtopic
Cell cycle regulation

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-CELL-CYCLE-BASICS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Cell Cycle > Checkpoints

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOY Foundation 1 2026 Q42

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOY Foundation 1 2026 Q42.

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

---

# Item

## label
Mitochondria are the cytoplasmic organelle that contains its own DNA

## id
CON-FND-B29858BF9E902A

## canonical_key
genetics.organelles.mitochondria-contain-own-dna

## aliases
Mitochondrial DNA as organelle-specific genetic material

## arabic_label

## arabic_aliases

## definition
Unlike the rough and smooth endoplasmic reticulum and the Golgi complex — all part of the endomembrane system, none of which carry their own genome — mitochondria possess a small, circular, double-stranded DNA genome of their own, distinct from the cell's nuclear DNA. Mitochondrial DNA is inherited exclusively down the maternal line, since sperm mitochondria are eliminated after fertilization, and it encodes a subset of the proteins needed for oxidative phosphorylation along with the rRNAs and tRNAs mitochondria need to translate them. This independent genome is one of the strongest lines of evidence for the endosymbiotic origin of mitochondria from free-living bacteria.

## explicit_objective
State that mitochondria are the cytoplasmic organelle with their own DNA genome, and that this genome is maternally inherited and distinct from nuclear DNA.

## pitfalls
Attributing organelle DNA to the Golgi complex or endoplasmic reticulum — within the cytoplasm, only mitochondria (and, in plants, chloroplasts) carry their own genome.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Genetics

## subtopic
Mitochondrial genetics

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-MOLECULAR-BIOLOGY-MITOCHONDRIAL

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Molecular Genetics > Mitochondrial DNA

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOY Foundation 1 2026 Q37

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOY Foundation 1 2026 Q37.

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

---

# Item

## label
Mitosis is the somatic cell division that produces two genetically identical diploid daughter cells

## id
CON-FND-66DEAA34E40EEA

## canonical_key
genetics.cell-division.mitosis-produces-two-identical-diploid-cells

## aliases
Mitosis yields two identical diploid daughters

## arabic_label

## arabic_aliases

## definition
Mitosis is the type of nuclear division that occurs in somatic cells for growth, tissue turnover and repair. A single diploid parent cell, having replicated its DNA in the preceding S phase, divides once to produce two daughter cells, each diploid and genetically identical to the parent and to each other, because no crossing-over or independent assortment of homologues occurs. This distinguishes mitosis sharply from meiosis, which involves two successive divisions, halves the chromosome number, and — through crossing-over and independent assortment — produces four genetically distinct haploid gametes rather than two identical diploid cells.

## explicit_objective
State that mitosis produces two genetically identical, diploid daughter cells from one diploid parent cell, and contrast this with meiosis, which produces four genetically distinct haploid cells.

## pitfalls
Attributing recombination or a change in ploidy to mitosis — both are meiosis-specific; mitosis strictly preserves the parent cell's diploid chromosome number and genetic content in both daughters.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Genetics

## subtopic
Cell division

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-CELL-CYCLE-BASICS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Cell Cycle > Mitosis

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOM Foundation 1 2026 Q6, EOY Foundation 1 2026 Q40

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOM Foundation 1 2026 Q6, EOY Foundation 1 2026 Q40.

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

---

# Item

## label
Synapsis is the intimate pairing of homologous chromosomes along their entire length during prophase I of meiosis

## id
CON-DEV-4D3DBC3BD2FDCC

## canonical_key
genetics.meiosis.synapsis-pairing-of-homologous-chromosomes

## aliases
Synapsis definition

## arabic_label

## arabic_aliases

## definition
Synapsis is the process, specific to prophase I of meiosis, in which each chromosome aligns with its homologous partner along its full length — not merely at the centromere — and the two are physically held together by a protein scaffold called the synaptonemal complex. The paired structure formed by each homologous pair is called a bivalent (or tetrad, counting all four chromatids). Synapsis is what makes crossing-over possible, because non-sister chromatids can only exchange segments of DNA while their chromosomes are held in this close, length-wise alignment; it has no equivalent step in mitosis, where homologous chromosomes never pair with one another at all.

## explicit_objective
Define synapsis as the length-wise pairing of homologous chromosomes during prophase I of meiosis via the synaptonemal complex, distinct from any pairing of sister chromatids.

## pitfalls
Describing synapsis as pairing only at the centromere, or as pairing of sister chromatids — synapsis is specifically the length-wise pairing of the two homologous (maternal and paternal) chromosomes.

## concept_type
fact_recall

## status
under review

## subject
dev

## topic
Genetics

## subtopic
Meiosis

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-MEIOSIS-SPERMATOGENESIS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Cell Division > Meiosis

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q9, Formative and Past Exams 2023 Q9, EOY Foundation 1 2026 Q45

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q9, Formative and Past Exams 2023 Q9, EOY Foundation 1 2026 Q45.

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

---

# Item

## label
Mitotic division in multicellular organisms serves growth and the repair (replacement) of damaged or lost cells

## id
CON-FND-5EF93A5D978C89

## canonical_key
genetics.cell-division.mitosis-serves-tissue-repair

## aliases
Mitosis for tissue repair and renewal

## arabic_label

## arabic_aliases

## definition
Mitosis serves the body's ongoing need for growth and for the repair and renewal of tissues, replacing cells lost to normal turnover, injury or disease with genetically identical new cells. This is distinct from the purpose of meiosis, which is reserved exclusively for gametogenesis — producing genetically varied haploid gametes for sexual reproduction, not for maintaining tissue mass. Tissues with a high rate of physiological turnover, such as the epidermis, gut epithelium and bone marrow, depend on continuous mitotic activity in their stem/progenitor cell populations to keep pace with normal cell loss.

## explicit_objective
State that mitotic division in multicellular organisms functions in growth and repair/replacement of cells, in contrast to meiosis, whose function is limited to gamete production.

## pitfalls
Attributing reproduction (in the sense of gamete formation) or apoptosis to mitosis — mitosis's role is growth and repair; gamete formation is meiosis's job, and apoptosis is programmed cell death, not division.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Genetics

## subtopic
Cell division

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-CELL-CYCLE-BASICS

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Cell Cycle > Mitosis

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOY Foundation 1 2026 Q38

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOY Foundation 1 2026 Q38.

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

---

# Item

## label
Telomerase is a reverse transcriptase that extends telomeres using its own built-in RNA template

## id
CON-FND-148204C419F5AF

## canonical_key
genetics.enzymes.telomerase-is-a-reverse-transcriptase

## aliases
Telomerase reverse transcriptase (TERT)

## arabic_label

## arabic_aliases

## definition
Telomerase is a ribonucleoprotein enzyme, functionally an RNA-dependent DNA polymerase — a reverse transcriptase — because it synthesizes DNA using an RNA template rather than a DNA template. Unlike other reverse transcriptases (such as retroviral ones), telomerase carries its own intrinsic RNA template as part of the enzyme complex itself, which it uses to add short, repetitive TTAGGG DNA sequences onto the 3' end of chromosomal telomeres. This compensates for the small amount of telomeric DNA that is normally lost with every round of DNA replication (the end-replication problem), and its activity is high in germ cells and stem cells but low or absent in most differentiated somatic cells, which is one reason somatic cells have a finite replicative lifespan.

## explicit_objective
Classify telomerase as a reverse transcriptase that uses its own built-in RNA template to extend telomeric DNA, and explain why this compensates for the end-replication problem.

## pitfalls
Classifying telomerase as a DNA-dependent RNA polymerase or a restriction enzyme — it is specifically an RNA-templated DNA polymerase (reverse transcriptase) that carries its own RNA template.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Genetics

## subtopic
Molecular genetics: enzymes

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-MOLECULAR-BIOLOGY-MITOCHONDRIAL

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Molecular Genetics > Telomerase

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q10, Formative and Past Exams 2023 Q10

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q10, Formative and Past Exams 2023 Q10.

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

---

# Item

## label
The human mitochondrial genome is approximately 16 kilobases in size

## id
CON-FND-BB2CD983F9F0CE

## canonical_key
genetics.mitochondrial-dna.genome-size-sixteen-kilobases

## aliases
Mitochondrial genome size (~16 kb)

## arabic_label

## arabic_aliases

## definition
The human mitochondrial genome is a small, circular, double-stranded DNA molecule of approximately 16 kilobases (precisely 16,569 base pairs), vastly smaller than the roughly 3.2 billion base pairs of the nuclear genome. Despite its small size it is densely packed, encoding 37 genes with essentially no intervening non-coding sequence: 13 protein subunits of the oxidative phosphorylation machinery, 22 transfer RNAs, and 2 ribosomal RNAs — everything the mitochondrion needs to translate its own protein-coding genes independent of the nuclear-cytoplasmic translation machinery.

## explicit_objective
State that the human mitochondrial genome is approximately 16 kilobases (16,569 bp) in size, encoding 37 densely packed genes.

## pitfalls
Confusing the mitochondrial genome's size with the nuclear genome's — 16 kilobases is roughly 200,000 times smaller than the ~3.2 billion base pair nuclear genome.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Genetics

## subtopic
Mitochondrial genetics

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-MOLECULAR-BIOLOGY-MITOCHONDRIAL

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Molecular Genetics > Mitochondrial DNA

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q67, Formative and Past Exams 2022 Q47

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q67, Formative and Past Exams 2022 Q47.

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

---

# Item

## label
A mature human ovum normally contains 22 autosomes plus one X chromosome (22,X)

## id
CON-DEV-6EC970E9533BDA

## canonical_key
genetics.gametogenesis.mature-ovum-22-autosomes-one-x

## aliases
Ovum chromosome complement (22,X)

## arabic_label

## arabic_aliases

## definition
Oogenesis, like spermatogenesis, halves the diploid chromosome number of 46 (44 autosomes plus the XX sex chromosome pair) to the haploid number of 23 through the two meiotic divisions. Because every primary oocyte carries two X chromosomes and no Y chromosome, meiosis in the female can only ever segregate one X chromosome into the mature egg — never a Y — so a mature ovum's normal chromosome complement is 22 autosomes plus a single X chromosome, written 22,X. This is why the sperm's sex chromosome (X or Y), not the egg's, determines the chromosomal sex of the resulting zygote.

## explicit_objective
State that a mature human ovum normally carries 22 autosomes and exactly one X chromosome (never a Y), and explain that the fertilizing sperm therefore determines offspring sex.

## pitfalls
Assuming an ovum could carry a Y chromosome — every oocyte is XX before meiosis, so only an X chromosome can ever be segregated into a mature egg.

## concept_type
fact_recall

## status
under review

## subject
dev

## topic
Genetics

## subtopic
Gametogenesis

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-GAMETOGENESIS-CHROMOSOME-NUMBER

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Gametogenesis > Oogenesis

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOM Foundation 1 2026 Q12

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOM Foundation 1 2026 Q12.

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

---

# Item

## label
DNA replication is semiconservative, producing two daughter DNA molecules from one original molecule

## id
CON-FND-68DE9398BFF917

## canonical_key
genetics.dna-replication.semiconservative-two-daughter-molecules

## aliases
Semiconservative replication yields two daughter molecules

## arabic_label

## arabic_aliases

## definition
DNA replication proceeds semiconservatively: the two original strands of the parent double helix separate, and each serves as a template for synthesis of one new complementary strand. The result is exactly two daughter DNA double helices, each composed of one original (conserved) parental strand paired with one newly synthesized strand — never a single molecule with four strands, and never more than two daughter molecules from one replication event. This 'one old, one new' pairing in each daughter molecule is what the Meselson-Stahl experiment demonstrated, ruling out both fully conservative (two entirely old + two entirely new strands) and dispersive models of replication.

## explicit_objective
State that DNA replication produces exactly two daughter DNA molecules, each semiconservatively composed of one original parental strand and one newly synthesized strand.

## pitfalls
Confusing the number of daughter molecules produced (always two, from one replication event) with the number of strands per molecule, or misremembering the semiconservative model as fully conservative or dispersive.

## concept_type
fact_recall

## status
under review

## subject
fnd

## topic
Genetics

## subtopic
DNA replication

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-MOLECULAR-BIOLOGY-MITOCHONDRIAL

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Molecular Genetics > DNA Replication

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | Formative and Past Exams 2021 Q35, Formative and Past Exams 2022 Q15

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against Formative and Past Exams 2021 Q35, Formative and Past Exams 2022 Q15.

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

---

# Item

## label
A mature human oocyte carries an X chromosome only, never a Y chromosome

## id
CON-DEV-50015F4FFA7A0B

## canonical_key
genetics.gametogenesis.mature-oocyte-x-chromosome-only

## aliases
Oocyte sex chromosome complement is X only

## arabic_label

## arabic_aliases

## definition
Every primary oocyte begins meiosis with the female sex-chromosome pair, XX, and no Y chromosome is ever present in the female germline to be segregated. Consequently, whichever sex chromosome ends up in a mature oocyte after both meiotic divisions can only ever be an X — there is no possible outcome of oogenesis that yields a Y-bearing egg. This is the direct converse of spermatogenesis, in which a primary spermatocyte is XY, so meiosis in the male produces two X-bearing and two Y-bearing sperm, and it is this asymmetry between the sexes' meiotic products that makes the sperm, not the egg, the determinant of a conceptus's chromosomal sex.

## explicit_objective
State that a mature oocyte's sex chromosome is always X, never Y, because the female germline (XX) contains no Y chromosome to segregate.

## pitfalls
Assuming 'either X or Y' applies symmetrically to both gametes — that describes sperm, produced by an XY germline; oocytes, produced by an XX germline, can only ever carry an X.

## concept_type
fact_recall

## status
under review

## subject
dev

## topic
Genetics

## subtopic
Gametogenesis

## microtopic

## nanotopic

## primary_node_id

## secondary_node_ids

## learner_years
1

## universities
scu

## modules
SCU-FBS102

## article_ids
ART-SCU-FBS102-GEN-GAMETOGENESIS-CHROMOSOME-NUMBER

## related_article_ids

## related_concept_ids

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
SCU-FBS102 > Genetics > Gametogenesis > Oogenesis

## exam_signal
FOMSCU Foundation 1 own-source QBank | past_exam | EOY Foundation 1 2026 Q43

## confidence
0.85

## support_mode
direct_statement

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
FOMSCU Foundation 1 own-source QBank, question stem and printed answer verified against EOY Foundation 1 2026 Q43.

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
