<!--
  103 BMS · concepts the MCQ lane had to mint — Vitamins and Nerve and Muscle.

  TWELVE RECORDS, ALL PHYSIOLOGY. None is a vitamins concept, and that is the
  result rather than an omission. All 44 vitamins MCQs in
  ../question/103-BMS-MCQ-vitamins.md map onto concepts that already exist:

    CON-FND-46B9F239340ED9  fat-soluble vitamins, each matched to its reaction and deficiency
    CON-FND-C9E5128193029E  water-soluble vitamins as coenzymes, and the reaction each runs
    CON-FND-1A4A49607783A9  folate antagonists

  Those three were authored from the 2025 end-of-year paper's own matching
  question, ten vitamins against twelve functions, and that is exactly what this
  chapter of the question book tests, item for item. Minting a concept per
  vitamin would have fragmented a student's mastery across fourteen records
  where the examiner assesses one skill.

  For Nerve and Muscle, 43 of the 55 MCQs likewise point at records that already
  exist — six in ../concept/103-BMS-physiology-concepts.md and twenty live ones
  taught by ART-NEU-TOP-5A8339CA4A, ART-MSK-TOP-17872815ED and
  ART-MSK-TOP-B54C248DF1. These twelve cover what nothing covered: myelination,
  saltatory conduction, repolarisation and hyperpolarisation, the local response,
  the factors affecting excitability, the sodium pump, neuromuscular
  transmission, myasthenia gravis, excitation-contraction coupling, the fibre
  types, the compound action potential and the biphasic recording.

  CARDIAC RECORDS ARE NOT MERGED. Live state holds many CON-CVS action-potential
  records, and a nerve action potential is not a myocyte one — no plateau, no
  calcium phase, a far shorter refractory period. Five are recorded in
  `rejected_merge_candidate_ids` with the reason, per 00-START-HERE §4, and none
  is used as a main_concept on any question in this lane.

  EVIDENCE. Every record names one claim in
  ../evidence/103-BMS-mcq-claims.md, and every claim carries a citation in
  ../evidence/103-BMS-mcq-citations.md quoting `Dpt Book Physiology 103.pdf`
  (src_59643edb9d371bcefa2c) with an exact page locator. The live evidence store
  was searched first: none of its 1,741 claims asserts what any of these twelve
  says.

  EXCLUDED TOPICS. Three of the twelve sit on sections the Physiology department
  excludes from the 2025-2026 final theoretical exam — the sodium pump, under
  Transport through the cell membrane; the compound action potential; and the
  monophasic and biphasic recording. Each carries blueprint_weight 0.15,
  exam_weight_by_year KAU_Y1=0.15 and weight_confidence 0.2, with a
  `blueprintWeight` field note saying so in words. They are authored rather than
  dropped, because the question book still asks them and a student may still meet
  them. Nothing in this file claims they are examined.

  `[clear]` is written only on list columns. Text columns that are deliberately
  empty — microtopic, nanotopic, last_reviewed, review_due, exclusion_reason —
  carry the key with an empty body, because `[clear]` on a text column is stored
  verbatim as four characters and would pass every gate while holding a wrong
  value.

  Import order: sources → concepts → claims → citations → questions.
-->

# Item

## label
Myelinated versus unmyelinated nerve fibres

## id
CON-NEU-5664D7AB68AD8D

## canonical_key
nerve.myelination.schwann-cells

## aliases
Types of nerve fibres regarding myelination
Myelinated and non-myelinated nerve fibres
Myelin sheath
Nodes of Ranvier
Schwann cell

## arabic_label
أنواع الألياف العصبية من حيث النخاعين

## arabic_aliases
الغمد النخاعي وعقد رانفييه
خلايا شوان

## definition
The **neuron** is the structural and functional unit of the nervous system.

In a **myelinated fibre** its axon is wrapped in a **myelin sheath** secreted by Schwann cells, an excellent insulator that decreases ion flow across the membrane, and the sheath is interrupted at the **nodes of Ranvier**, where the membrane is exposed and ions cross with little resistance.

In an **unmyelinated fibre** the axon is simply surrounded by Schwann cells with no sheath formed, so __there are no nodes__.

## explicit_objective
Distinguish a myelinated from an unmyelinated nerve fibre by what the Schwann cell does to the axon, and state where ion flow is permitted in each.

## pitfalls
Treating the Schwann cell as present only in myelinated fibres. It surrounds the axon in both; what differs is whether it forms a sheath. The second half of the same mistake is reading the nodes as places where ion flow is blocked, when they are the only places along the internode where it is possible.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU

## topic
Neurophysiology

## subtopic


## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Types of nerve fibers regarding myelination
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > The Neuron

## article_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-NEU-A0C8307D2825A6 | CON-NEU-372B07D041D0AD

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.5

## academic_relevance
0.85

## weight_confidence
0.35

## confidence
0.9

## exam_signal
src_2093c80b1f9c25f9c0a4 | department_question_book | undated | p35 | 103 BMS

## atomic_claim_ids
CLM-NEU-MYELINATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology MCQ 8] The myelinated nerve fiber has an outer layer of: Schwann cells
[Physiology MCQ 9] The myelin sheath of the nerve: Prevents ionic escape
[Physiology MCQ 19] Unmyelinated nerves differ from myelinated nerves in that they: Have no nodes of Ranvier

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-NEU-EBD57894496834

## conflicts
[clear]

## uncertainty
The book does not say how many Schwann cells wrap one internode, nor the internodal length in micrometres, so neither figure is carried here.

## evidence_gaps
Supported by the Kasr Al Ainy Physiology department book only, through CLM-NEU-MYELINATION-01 and its citation. No independent verification against an international physiology reference has been attached.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The book's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level to hold it.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department book; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched the corpus for "myelin", "Schwann" and "node of Ranvier" — the only live records are spinal grey and white matter and two schwannoma records, and none is a candidate for this concept.
rejectedMergeCandidateIds: CON-NEU-EBD57894496834, "Spinal white matter contains myelinated nerve fibers and neuroglia", names myelinated fibres but is a statement about the composition of a CNS region, not about what myelination is. Not merged; cross-linked instead.
exclusionReason: Checked against the department's list of topics not included in the 2025-2026 final theoretical exam. "Types of nerve fibers regarding myelination" is not on it.
relationships: Walked the 14 live concepts under ART-NEU-TOP-5A8339CA4A and the 6 in the pending 103 physiology batch. Two loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file, and a prerequisite_of edge from this concept to saltatory conduction is owed.

---

# Item

## label
Saltatory conduction and conduction velocity

## id
CON-NEU-A0C8307D2825A6

## canonical_key
nerve.saltatory-conduction.velocity

## aliases
Saltatory conduction
Propagation in myelinated axons
Conduction velocity of nerve fibres
Node-to-node conduction

## arabic_label
التوصيل القفزي

## arabic_aliases
انتشار جهد الفعل في الألياف النخاعية
سرعة التوصيل العصبي

## definition
In a myelinated axon the internodal membrane is insulated, and only at the **nodes of Ranvier** is it exposed and richly supplied with voltage-gated sodium channels.

An action potential at one node is the stimulus for the next, so __action potentials are generated only at the nodes and the signal jumps between them__. This increases conduction velocity up to fifty-fold and conserves energy, because little sodium and potassium have to be pumped back.

Speed also rises with **fibre size** — it is proportional to the square root of the fibre diameter, and the internodal distance increases with diameter.

## explicit_objective
Explain how insulating the internode speeds conduction, and list the three determinants of conduction velocity.

## pitfalls
Saying that the impulse jumps from internode to internode. It jumps over the internodes, between the nodes — the internode is the insulated stretch where no action potential is generated. The mirror-image error is reasoning that because conduction is faster, myelin must be a good conductor; it is an insulator, and that is precisely why conduction is fast.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU

## topic
Neurophysiology

## subtopic


## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Conduction [Propagation] of the Action Potential

## article_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-NEU-5664D7AB68AD8D | CON-NEU-7A30FECF042995

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.7

## exam_weight_by_year
KAU_Y1=0.7

## clinical_relevance
0.55

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.92

## exam_signal
src_2093c80b1f9c25f9c0a4 | department_question_book | undated | p37 | 103 BMS

## atomic_claim_ids
CLM-NEU-SALTATORY-CONDUCTION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology MCQ 20] Saltatory conduction: Conserves energy for the axon
[Physiology MCQ 34] Which of the following will increase the velocity of action potential propagation? Myelination of the axon
[Physiology MCQ 37] In saltatory conduction, the nerve impulse: jumps from one node to another node
[Physiology MCQ 51] speed of conduction is directly proportional to the square root of the fiber diameter

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-CVS-2AD0E4A433C94D
CON-CVS-7763A99040CEB7

## conflicts
[clear]

## uncertainty
The book gives the velocity gain as "up to 50-fold" without saying against what baseline, and states the speed as proportional to the square root of the diameter in one place and to the diameter and internodal distance in another. Both are quoted rather than reconciled.

## evidence_gaps
Supported by the Kasr Al Ainy Physiology department book only, through CLM-NEU-SALTATORY-CONDUCTION-01 and its citation. No independent verification against an international physiology reference has been attached.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The book's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level to hold it.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department book; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched the corpus for "saltatory", "conduction velocity" and "propagation" — no concept candidate record exists for this idea in a nerve fibre.
rejectedMergeCandidateIds: CON-CVS-2AD0E4A433C94D and CON-CVS-7763A99040CEB7 describe how activation spreads between working cardiac myocytes, which is cell-to-cell current through gap junctions at about 0.5 m/s, not saltatory conduction along an axon. 00-START-HERE §4 requires two subjects that mean different things by the same words to be disambiguated rather than merged. Cross-linked here, not merged.
exclusionReason: Checked against the department's exclusion list. "Conduction [Propagation] of the Action Potential" is not on it.
relationships: Walked the same 20 neighbours. Two are in related_concept_ids. A prerequisite_of edge from myelination to this concept and a contrasts_with edge to the cardiac conduction records are owed to a relations batch this lane does not write.

---

# Item

## label
Repolarisation and hyperpolarisation of the action potential

## id
CON-NEU-DD9033DCA3AAF1

## canonical_key
nerve.repolarisation.potassium-efflux

## aliases
Repolarisation phase of the action potential
Hyperpolarisation
After-potential
Potassium efflux in the action potential
Descending limb of the spike

## arabic_label
طور إعادة الاستقطاب وفرط الاستقطاب

## arabic_aliases
الطور الهابط لجهد الفعل
تدفق البوتاسيوم إلى الخارج

## definition
Two events together end the spike. Inactivation of the voltage-gated **sodium channels** stops the sodium influx and terminates depolarisation, while the **potassium channels** — which open shortly after the sodium ones, more slowly and for longer — carry potassium out and complete the return to the resting level.

Repolarisation is rapid for its first 70 per cent and slow for the remaining 30 per cent.

The potassium channels then close slowly, so potassium keeps leaving after it should have stopped and __the membrane overshoots into hyperpolarisation__, which lasts 35 to 40 msec against the spike's 2 msec; leak potassium channels return it to rest.

## explicit_objective
Give both ionic events of repolarisation, the proportions of its rapid and slow phases, and the cause and duration of the hyperpolarising after-potential.

## pitfalls
Explaining repolarisation by potassium alone and leaving out sodium inactivation, or the reverse. Both are needed, and a student who gives one half cannot then explain the absolute refractory period, which is the sodium half in another guise. The second common error is putting the rapid and slow phases the wrong way round: rapid is the first 70 per cent, not the last.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU

## topic
Neurophysiology

## subtopic


## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Ionic basis of action potential

## article_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-NEU-7A30FECF042995 | CON-NEU-157E05FAF3B100 | CON-NEU-2235199E9F4373 | CON-NEU-F119674A8DFD8D

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.75

## exam_weight_by_year
KAU_Y1=0.75

## clinical_relevance
0.5

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.92

## exam_signal
src_2093c80b1f9c25f9c0a4 | department_question_book | undated | p34 | 103 BMS

## atomic_claim_ids
CLM-NEU-REPOLARISATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology MCQ 1] During hyperpolarization the membrane is more negative due to slow closure of K+ channels
[Physiology MCQ 6] Repolarization is caused by efflux of K+
[Physiology MCQ 36] Repolarization: Results from closure of sodium and opening of potassium channels
[Physiology MCQ 21] During the descending limb of the spike there is increased permeability of the nerve fiber to Na+ — the EXCEPT option, and false

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-CVS-8AC3AE83A9DFA9
CON-CVS-B4232A29680959
CON-CVS-C09D8C1327DFB7

## conflicts
[clear]

## uncertainty
The book gives the 70:30 split of the rapid and slow repolarisation phases without a source or a range, and other undergraduate texts do not quote the split at all. Whether a marker expects the figures is a local convention.

## evidence_gaps
Supported by the Kasr Al Ainy Physiology department book only, through CLM-NEU-REPOLARISATION-01 and its citation. No independent verification against an international physiology reference has been attached.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The book's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level to hold it.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department book; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched the corpus for "repolarization", "hyperpolarization" and "potassium efflux" — the live matches are cardiac afterdepolarisation records and none is a candidate for the nerve repolarisation mechanism.
rejectedMergeCandidateIds: CON-CVS-8AC3AE83A9DFA9, CON-CVS-B4232A29680959 and CON-CVS-C09D8C1327DFB7 are afterdepolarisation records in working and pacemaker cardiac myocytes. A nerve action potential is not a myocyte one — it has no plateau, no calcium phase and a far shorter refractory period — so these are cross-linked as near-misses and deliberately not merged, per 00-START-HERE §4.
exclusionReason: Checked against the department's exclusion list. "Ionic basis of action potential" is not on it; the two action-potential sections that are on it are Monophasic and Biphasic Action Potential and Compound Action Potential.
relationships: Walked the 6 concepts in the pending 103 physiology batch and the 14 live ones under ART-NEU-TOP-5A8339CA4A. Four are in related_concept_ids. A mechanism_step_before edge from depolarisation to this concept, and a causes edge from this concept to the relative refractory period, are owed to a relations batch.

---

# Item

## label
The local response: graded and summatable

## id
CON-NEU-7E784A50D2BBAF

## canonical_key
nerve.local-response.graded-summation

## aliases
Local response
Local excitatory state
Subthreshold response
Graded potential in nerve
Summation of subthreshold stimuli

## arabic_label
الاستجابة الموضعية

## arabic_aliases
الحالة الاستثارية الموضعية
الجهد المتدرج في العصب

## definition
A subthreshold stimulus opens some sodium activation gates; sodium enters and partially depolarises the membrane without reaching the firing level, and repolarisation then follows rapidly.

The response does not obey the all-or-none law; it is **non-propagated** and fades within one to two millimetres; it is **graded**, so its size and duration vary with the stimulus; it has __no refractory period__; and excitability is increased during it, because the membrane has moved towards the firing level.

Because there is no refractory period, rapid repeated subthreshold stimuli **summate**, and when summation reaches −65 mV an action potential is generated.

## explicit_objective
List the characters of the local response and explain why the absence of a refractory period is what makes summation possible.

## pitfalls
Calling the local response a small action potential. It is a different kind of event: an action potential is all-or-none, propagated and refractory, and a local response is none of those three. The practical consequence students miss is that two local responses can add and two action potentials cannot.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU

## topic
Neurophysiology

## subtopic


## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Local excitatory state (Local Response)

## article_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-NEU-7A30FECF042995 | CON-NEU-105A7842809DC1 | CON-NEU-DF016B86DF56FF

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.45

## academic_relevance
0.95

## weight_confidence
0.35

## confidence
0.92

## exam_signal
src_2093c80b1f9c25f9c0a4 | department_question_book | undated | p34 | 103 BMS

## atomic_claim_ids
CLM-NEU-LOCAL-RESPONSE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology MCQ 2] The local response: Can be summated
[Physiology MCQ 15] The local response in a single nerve fiber: Can produce an action potential if the membrane potential reaches - 65mV

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives the fading distance as 1 to 2 mm without stating the fibre or the temperature it was measured in.

## evidence_gaps
Supported by the Kasr Al Ainy Physiology department book only, through CLM-NEU-LOCAL-RESPONSE-01 and its citation. No independent verification against an international physiology reference has been attached.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The book's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level to hold it.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department book; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched the corpus for "local response", "local excitatory" and "subthreshold" — no concept candidate record exists.
rejectedMergeCandidateIds: Nothing was rejected. No live or pending record states the characters of the local response, so there was no merge candidate to decline.
exclusionReason: Checked against the department's exclusion list. "Local excitatory state (Local Response)" is not on it, and the department's own short-answer list asks students to clarify its characters.
relationships: Walked the same 20 neighbours. Three are in related_concept_ids. A prerequisite_of edge from this concept to the depolarisation concept is owed to a relations batch.

---

# Item

## label
Factors affecting nerve excitability

## id
CON-NEU-77596C8A899A7E

## canonical_key
nerve.excitability.factors

## aliases
Factors that affect the excitability of the nerve
Membrane stabilisers
Local anaesthetic action on nerve
Familial periodic paralysis
Effect of calcium and potassium on excitability

## arabic_label
العوامل المؤثرة على استثارة العصب

## arabic_aliases
مثبتات الغشاء والمخدر الموضعي
الشلل الدوري العائلي

## definition
Anything that **increases** membrane permeability to sodium increases excitability — veratridine, and a low extracellular calcium. Anything that **decreases** it stabilises the membrane and lowers excitability — a high extracellular calcium, and **local anaesthetics** such as cocaine, which make the membrane depolarise too slowly to reach the firing level.

A fall in extracellular sodium shrinks the action potential with little effect on the resting potential, and **tetrodotoxin** blocks the sodium channels so that no action potential can be elicited.

**Potassium** acts on the resting potential instead: hyperkalaemia depolarises and raises excitability, __hypokalaemia hyperpolarises and lowers it__, which is the mechanism of familial periodic paralysis.

## explicit_objective
Predict the direction excitability moves when sodium permeability, extracellular calcium or extracellular potassium changes, and apply it to a local anaesthetic and to familial periodic paralysis.

## pitfalls
Assuming calcium and potassium act the same way because both are cations of the extracellular fluid. They act on different variables and in opposite senses: a low calcium raises sodium permeability and therefore excitability, while a low potassium hyperpolarises the resting membrane and lowers it. A student who merges them gets the tetany of hypocalcaemia and the paralysis of hypokalaemia the wrong way round.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU

## topic
Neurophysiology

## subtopic


## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Factors that affect the excitability of the nerve

## article_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-NEU-763D2F7A1571C9 | CON-NEU-A370E390388CA5 | CON-NEU-372B07D041D0AD

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.65

## exam_weight_by_year
KAU_Y1=0.65

## clinical_relevance
0.85

## academic_relevance
0.9

## weight_confidence
0.35

## confidence
0.9

## exam_signal
src_2093c80b1f9c25f9c0a4 | department_question_book | undated | p38 | 103 BMS

## atomic_claim_ids
CLM-NEU-EXCITABILITY-FACTORS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology MCQ 25] Excitability of the nerve is: Completely lost by local anesthetic drugs
[Physiology MCQ 56] Familial periodic paralysis is due to: Extracellular K+ concentration is decreased.

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-END-1DC59C7B742D81

## conflicts
[clear]

## uncertainty
The book states that a low extracellular calcium increases sodium permeability without giving the mechanism, and gives cocaine as its example of a local anaesthetic, which is not the agent in current Egyptian clinical use. The pharmacological class is carried here and the individual agent is left to the book.

## evidence_gaps
Supported by the Kasr Al Ainy Physiology department book only, through CLM-NEU-EXCITABILITY-FACTORS-01 and its citation. No independent verification against an international physiology reference has been attached.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The book's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level to hold it.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department book; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched the corpus for "excitability", "membrane stabilizer" and "periodic paralysis" — the one live near-match is an endocrine record about plasma calcium, recorded in rejected_merge_candidate_ids.
rejectedMergeCandidateIds: CON-END-1DC59C7B742D81, "Elevated plasma calcium decreases neuromuscular excitability", states one arm of this concept from the endocrine side, where it belongs to calcium homeostasis. Cross-linked rather than merged: one record answers "what does hypercalcaemia do to a patient" and this one answers "what sets the excitability of a nerve fibre".
exclusionReason: Checked against the department's exclusion list. "Factors that affect the excitability of the nerve" is not on it, and the department's own short-answer list asks students to discuss it.
relationships: Walked the same 20 neighbours. Three are in related_concept_ids. A causes edge from hypokalaemia to reduced excitability, and a treated_by edge from familial periodic paralysis to intravenous potassium, are owed to a relations batch.

---

# Item

## label
The Na⁺–K⁺ pump is electrogenic

## id
CON-NEU-1E66BE533E894C

## canonical_key
membrane.sodium-potassium-pump.electrogenic

## aliases
Sodium pump
Na+/K+ ATPase
Primary active transport
Sodium-potassium pump
Electrogenic pump

## arabic_label
مضخة الصوديوم والبوتاسيوم

## arabic_aliases
النقل النشط الأولي
إنزيم ATPase للصوديوم والبوتاسيوم

## definition
The **Na⁺–K⁺ pump** is the standard example of primary active transport. Its **α subunit** carries the ATP-binding site, two potassium sites on the outer aspect and three sodium sites on the inner; its **β subunit** has the ATPase activity that splits ATP into ADP, phosphate and energy.

It moves __three sodium out for every two potassium in__, so more positive charge leaves than enters and the pump is **electrogenic**, contributing about −4 mV to the resting membrane potential.

It also re-establishes the sodium and potassium concentration gradients after an action potential, which is a different job from generating the spike.

## explicit_objective
Classify the Na⁺–K⁺ pump as primary active transport, give its stoichiometry, and separate its contribution to the resting potential from its role in restoring gradients.

## pitfalls
Naming the pump as the cause of the resting membrane potential, or of the action potential. Diffusion through the leak channels produces about 95 per cent of the resting potential and the pump contributes about −4 mV; and nothing is pumped during the spike, which is passive movement down electro-concentration gradients. The pump pays the bill afterwards.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU

## topic
Neurophysiology

## subtopic


## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Transport through the cell membrane > Active transport
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Relative Contributions of Ion Fluxes & Na+-K+ Pump to RMP

## article_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-NEU-763D2F7A1571C9 | CON-NEU-FE158971E5522D | CON-NEU-A370E390388CA5

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.15

## exam_weight_by_year
KAU_Y1=0.15

## clinical_relevance
0.5

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal
src_2093c80b1f9c25f9c0a4 | department_question_book | undated | p36 | 103 BMS

## atomic_claim_ids
CLM-NEU-SODIUM-POTASSIUM-PUMP-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology MCQ 14] Concerning the sodium pump, it: Requires high energy phosphate bond

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives the pump's contribution as about −4 mV in one place and the permeability contribution as about 95 per cent of the resting potential in another; the two are quoted as printed and not reconciled into a single arithmetic.

## evidence_gaps
Supported by the Kasr Al Ainy Physiology department book only, through CLM-NEU-SODIUM-POTASSIUM-PUMP-01 and its citation. No independent verification against an international physiology reference has been attached.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The book's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level to hold it.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department book; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched the corpus for "sodium pump", "Na+/K+ ATPase" and "active transport" — no concept candidate record exists.
rejectedMergeCandidateIds: Nothing was rejected. No live or pending record states the pump's stoichiometry or its electrogenic contribution, so there was no merge candidate to decline.
blueprintWeight: EXCLUDED TOPIC. "Transport through the cell membrane" is one of the seven topics the Physiology department excludes from the 2025-2026 final theoretical exam. The weight of 0.15 and the exam_weight_by_year of KAU_Y1=0.15 record that this is taught and asked in the department question book but is not examinable in that sitting; they must not be read as evidence that it is examined. weight_confidence is 0.2 for the same reason.
examSignal: The signal is a department question-book appearance, not an exam-paper appearance. The 2025 end-of-year paper does not ask it, and the department excludes the section, so no exam-paper source is named.
exclusionReason: Left empty deliberately — the field records why a concept is not published, and this one is publishable. The exam exclusion is recorded under blueprintWeight above and on the question that tests it.
relationships: Walked the same 20 neighbours. Three are in related_concept_ids. A part_of edge from this concept to the resting membrane potential is owed to a relations batch.

---

# Item

## label
Sequence of neuromuscular transmission

## id
CON-MSK-77D955AAB4D0FA

## canonical_key
muscle.neuromuscular-transmission.sequence

## aliases
Neuromuscular transmission
Sequence of events at the neuromuscular junction
End-plate potential
Motor end plate
Acetylcholinesterase at the junction

## arabic_label
النقل العصبي العضلي

## arabic_aliases
تسلسل الأحداث في الوصل العصبي العضلي
جهد الصفيحة الانتهائية

## definition
Arrival of the nerve impulse opens voltage-gated **calcium channels** in the ending; calcium enters, ruptures the vesicles and releases **acetylcholine** into the cleft.

The transmitter binds a ligand-gated channel in the motor end plate, which opens to small cations so that sodium enters and the end plate depolarises. That **end-plate potential** is graded and non-propagated, and it carries the adjacent muscle membrane to its firing level, so action potentials are generated on either side of the end plate and propagate along the fibre.

Acetylcholine then dissociates and is hydrolysed by **acetylcholinesterase** bound to the basal lamina in the cleft, __which prevents one impulse causing multiple contractions__.

## explicit_objective
Put the seven events of neuromuscular transmission in order, and say which ion moves through which channel at each step.

## pitfalls
Reading the end-plate potential as the muscle action potential. It is graded, non-propagated and local — the same class of event as a nerve local response — and its job is to bring the neighbouring muscle membrane to threshold. The second error is putting calcium on the postsynaptic side: calcium entry is presynaptic and triggers release; what enters postsynaptically is sodium.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-PHY-T07 | SYS-MSK

## topic
Cell and membrane physiology

## subtopic


## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Sequence of Events during Neuromuscular Transmission
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Physiologic Anatomy of Neuromuscular Junction

## article_ids
ART-103-PHY-NEUROMUSCULAR-TRANSMISSION

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-MSK-5C2B5DD83C1805 | CON-MSK-3013AA61E917B7 | CON-NEU-7E784A50D2BBAF

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.75

## exam_weight_by_year
KAU_Y1=0.75

## clinical_relevance
0.75

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.92

## exam_signal
src_2093c80b1f9c25f9c0a4 | department_question_book | undated | p34 | 103 BMS

## atomic_claim_ids
CLM-MSK-NMJ-TRANSMISSION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology MCQ 3] Binding of transmitter to its receptors, increase permeability of the membrane to both Na+ and K+
[Physiology MCQ 11] Acetylcholinesterase: Degrades the neurotransmitter which is found in the neuromuscular junction
[Physiology MCQ 27] After release from the neuromuscular junction, acetylcholine: Causes postsynaptic depolarization
[Physiology MCQ 28] An increased permeability of the postsynaptic membrane to small cations
[Physiology MCQ 30] In muscle tissue, neurotransmitter receptors are located: On the motor end plate

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-CVS-A87E8F7EE8DC58

## conflicts
[clear]

## uncertainty
The book gives the synaptic delay as about 0.5 msec without a range, and does not say how many acetylcholine molecules a vesicle holds or how many vesicles one impulse releases.

## evidence_gaps
Supported by the Kasr Al Ainy Physiology department book only, through CLM-MSK-NMJ-TRANSMISSION-01 and its citation. No independent verification against an international physiology reference has been attached.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The book's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level to hold it.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department book; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched the corpus for "neuromuscular", "acetylcholine" and "end plate" — the live acetylcholine records are cardiac, pancreatic and endocrine, and none is a candidate for transmission at the skeletal neuromuscular junction.
rejectedMergeCandidateIds: CON-CVS-A87E8F7EE8DC58 is acetylcholine binding muscarinic receptors on sinoatrial pacemaker cells, which lowers cAMP and the funny current. Same transmitter, different receptor class, different tissue and opposite effect on excitability. Cross-linked as a near-miss and deliberately not merged.
exclusionReason: Checked against the department's exclusion list. Neuromuscular Transmission is not on it, and the department's own short-answer list asks students to describe its mechanism and state its properties.
relationships: Walked the 13 live concepts under ART-MSK-TOP-17872815ED, the 13 under ART-MSK-TOP-B54C248DF1 and the 2 muscle concepts in the pending 103 batch. Three are in related_concept_ids. A mechanism_step_before edge from this concept to excitation-contraction coupling is owed to a relations batch.

---

# Item

## label
Myasthenia gravis: acetylcholine receptor antibodies

## id
CON-MSK-5C2B5DD83C1805

## canonical_key
muscle.myasthenia-gravis.receptor-antibodies

## aliases
Myasthenia gravis
Acetylcholine receptor antibodies
Autoimmune neuromuscular block
Neostigmine in myasthenia

## arabic_label
الوهن العضلي الوبيل

## arabic_aliases
أجسام مضادة لمستقبلات الأسيتيل كولين

## definition
**Myasthenia gravis** is an autoimmune disease caused by __antibodies against the acetylcholine receptors__ of the motor end plate.

With fewer functioning receptors the neuromuscular junction cannot transmit enough signals from nerve to muscle, so skeletal muscles are weak and tire easily, and in the severe form the patient may die of paralysis of the respiratory muscles.

It is treated by an **anticholinesterase** such as neostigmine, which lets adequate amounts of acetylcholine accumulate to act on the receptors that remain.

## explicit_objective
Name the antigen in myasthenia gravis and explain why inhibiting acetylcholinesterase relieves the weakness.

## pitfalls
Naming acetylcholinesterase as the antigen because it is the drug's target. The antibody is against the receptor; the enzyme is what the treatment inhibits. Holding the two apart is what makes the therapy make sense — raising transmitter concentration compensates for a reduced number of receptors.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-PHY-T07 | SYS-MSK

## topic
Cell and membrane physiology

## subtopic


## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission

## article_ids
ART-103-PHY-NEUROMUSCULAR-TRANSMISSION

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-MSK-77D955AAB4D0FA

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.55

## exam_weight_by_year
KAU_Y1=0.55

## clinical_relevance
0.95

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_2093c80b1f9c25f9c0a4 | department_question_book | undated | p43 | 103 BMS

## atomic_claim_ids
CLM-MSK-MYASTHENIA-GRAVIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology MCQ 52] The Muscle weakness of myasthenia gravis is caused by antibodies against which of the following? Acetylcholine receptors

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not distinguish ocular from generalised myasthenia, does not mention the thymus, and names only neostigmine. Nothing beyond what it states is carried here.

## evidence_gaps
Supported by the Kasr Al Ainy Physiology department book only, through CLM-MSK-MYASTHENIA-GRAVIS-01 and its citation. No independent verification against an international physiology reference has been attached.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The book's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level to hold it.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department book; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched the corpus for "myasthenia" — no live or pending record exists in either the concept graph or the evidence store.
rejectedMergeCandidateIds: Nothing was rejected. No live or pending record covers myasthenia gravis, so there was no merge candidate to decline.
exclusionReason: Left empty. The concept names a drug class, so it lands as needs_evidence and must not auto-publish, but it is not excluded from publication; it states what relieves the disease rather than a dose or an action to take.
moduleSubject: The department book prints the Myasthenia Gravis box inside Neuromuscular Transmission but the subject tree carries no node for it, so the path stops at the division. A reviewer may wish to add the node; the alternative was to file it under a neighbouring section it does not belong to.
relationships: Walked the same 28 muscle-side neighbours. One is in related_concept_ids. A caused_by edge from this concept to the acetylcholine receptor, and a treated_by edge to the anticholinesterases, are owed to a relations batch.

---

# Item

## label
Excitation–contraction coupling in muscle

## id
CON-MSK-3013AA61E917B7

## canonical_key
muscle.excitation-contraction-coupling.calcium-troponin

## aliases
Excitation-contraction coupling
EC coupling
Calcium release from terminal cisternae
Troponin C and tropomyosin
Dihydropyridine and ryanodine receptors

## arabic_label
اقتران الإثارة بالانقباض

## arabic_aliases
تحرر الكالسيوم من الصهاريج الطرفية
تروبونين سي والتروبوميوسين

## definition
The **T tubule** is an invagination of the muscle fibre membrane carrying extracellular fluid into the depth of the fibre, and the action potential spreads over the membrane and into it.

The tubule's voltage-sensitive **dihydropyridine receptor** senses the depolarisation and, through foot processes, opens the **ryanodine calcium channel** on the terminal cisterna of the sarcoplasmic reticulum, so calcium floods the cytoplasm.

Calcium binds **troponin C**; troponin changes conformation, __tropomyosin moves off the myosin-binding site on actin__, and the cross-bridges attach. Relaxation follows when the calcium pump on the reticulum removes calcium and tropomyosin re-covers the site.

## explicit_objective
Trace excitation–contraction coupling from the T tubule to the uncovered actin site, naming the two receptors and the three regulatory proteins.

## pitfalls
Saying that calcium binds tropomyosin, or that calcium is released from the T tubules. Calcium binds troponin C, which then moves tropomyosin; and the calcium comes out of the terminal cisternae of the sarcoplasmic reticulum, while the T tubule carries only the voltage change and extracellular fluid.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-PHY-T07 | SYS-MSK

## topic
Cell and membrane physiology

## subtopic


## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Changes Following Skeletal Muscle Stimulation
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > The Muscle Proteins

## article_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## related_article_ids
ART-MSK-TOP-B54C248DF1 | ART-103-PHY-SKELETAL-MUSCLE-TENSION

## related_concept_ids
CON-MSK-BD54A250111D42 | CON-MSK-1AA4B301236114 | CON-MSK-762A229FC8FE5F | CON-MSK-B2B106C1D81C30

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.8

## exam_weight_by_year
KAU_Y1=0.8

## clinical_relevance
0.55

## academic_relevance
0.95

## weight_confidence
0.45

## confidence
0.93

## exam_signal
src_2093c80b1f9c25f9c0a4 | department_question_book | undated | p34 | 103 BMS

## atomic_claim_ids
CLM-MSK-EC-COUPLING-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology MCQ 4] Both ATP and its hydrolyzing enzyme ATPase are attached to the cross- bridge
[Physiology MCQ 31] Spreads inwards to all parts of the muscle via T tubules
[Physiology MCQ 39] The function of troponin C is: Binding with Ca2+
[Physiology MCQ 40] The release of Ca2+ from the terminal cisternae
[Physiology MCQ 47] Acting as a relaxing protein at rest by covering up the sites where myosin binds to actin
[Physiology MCQ 50] spreads inward to all parts of the muscle via the T tubules

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
Order of ATP hydrolysis in the cross-bridge cycle: the department book takes the energy for phosphorylating the cross-bridge from hydrolysis of ATP at the bending step, while several standard accounts hydrolyse ATP before the head binds and use the release of products to drive the power stroke. The book's order is what this module teaches and is what is carried; the disagreement is recorded rather than settled.

## uncertainty
The book places the hydrolysis of ATP at the bending step of the cross-bridge cycle, which is not the order standard accounts give; that discrepancy is recorded on the article that teaches the cycle and is not resolved here.

## evidence_gaps
Supported by the Kasr Al Ainy Physiology department book only, through CLM-MSK-EC-COUPLING-01 and its citation. No independent verification against an international physiology reference has been attached.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The book's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level to hold it.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department book; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched the corpus for "excitation-contraction", "troponin", "tropomyosin" and "terminal cisternae" — the live matches are the triad and the calcium-slide records, which are cross-linked in related_concept_ids, and no candidate record states the coupling sequence.
rejectedMergeCandidateIds: Nothing was rejected. CON-MSK-BD54A250111D42 and CON-MSK-762A229FC8FE5F state single steps of this sequence and are cross-linked rather than merged, because each could be tested on its own; but neither is a duplicate of the whole relay, so neither is a declined merge.
exclusionReason: Checked against the department's exclusion list. "Changes Following Skeletal Muscle Stimulation" is not on it as a whole; the excluded neighbours are Types of Skeletal Muscle Contraction and Metabolic Changes Following Skeletal Muscle Stimulation, which are different sections. The department's own short-answer list asks students to discuss excitation-contraction coupling.
relationships: Walked the 26 live muscle concepts and the 2 in the pending 103 batch. Four are in related_concept_ids. A mechanism_step_before edge from this concept to cross-bridge tension generation is owed to a relations batch.

---

# Item

## label
Muscle fibre types: red slow versus pale fast

## id
CON-MSK-3E5F54D8D58E9C

## canonical_key
muscle.fibre-types.red-slow-pale-fast

## aliases
Type of muscle fibres
Slow red type I fibres
Fast pale type IIb fibres
Red and white muscle fibres
Myoglobin and muscle fibre type

## arabic_label
أنواع الألياف العضلية الهيكلية

## arabic_aliases
الألياف الحمراء البطيئة والألياف الشاحبة السريعة

## definition
**Slow red type I fibres** are small, innervated by small slowly conducting motor neurones, rich in oxidative enzymes and mitochondria, low in ATPase, surrounded by extensive capillaries and high in **myoglobin**, which stores oxygen; together these give a slow contractile mechanism, a large aerobic capacity and __high resistance to fatigue__.

**Fast pale type IIb fibres** are larger, innervated by large rapidly conducting motor neurones, carry an extensive sarcoplasmic reticulum for rapid calcium release, large amounts of glycolytic enzymes and a high ATPase activity, and have less blood supply, less myoglobin and fewer mitochondria; they __contract rapidly and fatigue quickly__.

Postural muscles such as soleus are mainly slow; muscles of fine skilled movement such as the extraocular muscles are mainly fast.

## explicit_objective
Contrast the two skeletal muscle fibre types by enzyme profile, capillary supply, myoglobin, mitochondria and fatigue resistance, and predict which predominates in a given muscle.

## pitfalls
Reading "oxidative enzymes" in the slow fibre and "anaerobic" in a question stem as the same word. The slow red fibre is aerobic; the fast pale fibre is the one that depends on anaerobic glycolysis, and that single reversal is what the EXCEPT items in this chapter are built on.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
msk

## primary_node_id
DIS-PHY-T08

## secondary_node_ids
DIS-PHY-T07 | SYS-MSK

## topic
Exercise and environmental physiology

## subtopic


## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## article_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## related_article_ids
ART-MSK-TOP-3A09F08EF0

## related_concept_ids
CON-MSK-C693745576251C | CON-MSK-FF570EA5120D41

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.65

## exam_weight_by_year
KAU_Y1=0.65

## clinical_relevance
0.55

## academic_relevance
0.9

## weight_confidence
0.35

## confidence
0.92

## exam_signal
src_2093c80b1f9c25f9c0a4 | department_question_book | undated | p41 | 103 BMS

## atomic_claim_ids
CLM-MSK-FIBRE-TYPES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology MCQ 41] Fast skeletal muscle fibers differ from slow fibers in that they: Are adapted for short rapid muscle contractions.
[Physiology MCQ 43] Red (slow) fibers are characterized by the following, EXCEPT: Depends on anaerobic oxidation
[Physiology MCQ 46] Pale (fast) fibers: Depends mainly on anaerobic oxidation.

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-C693745576251C
CON-MSK-FF570EA5120D41

## conflicts
[clear]

## uncertainty
The book names type I and type IIb and does not mention type IIa, so the intermediate fibre is absent from this account and is not supplied from elsewhere.

## evidence_gaps
Supported by the Kasr Al Ainy Physiology department book only, through CLM-MSK-FIBRE-TYPES-01 and its citation. No independent verification against an international physiology reference has been attached.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The book's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level to hold it.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department book; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched the corpus for "fast fiber", "slow fiber", "myoglobin" and "fiber type" — the two live matches are recorded in rejected_merge_candidate_ids and cross-linked.
rejectedMergeCandidateIds: CON-MSK-C693745576251C states the fast fibre's glycolytic capacity and CON-MSK-FF570EA5120D41 states what endurance training does to slow fibres. Both are metabolic records under a skeletal-muscle metabolism article, and each answers a question this one does not: this concept is the department book's two-column comparison, which is what the question book examines. Cross-linked and deliberately not merged.
exclusionReason: Checked against the department's exclusion list. "Factors Affecting Skeletal Muscle Contraction" is not on it; the excluded muscle sections are Types of Skeletal Muscle Contraction, Metabolic Changes Following Skeletal Muscle Stimulation, Electromyography, Muscular hypertrophy and Reaction of muscle to denervation.
relationships: Walked the 14 live concepts under ART-MSK-TOP-3A09F08EF0 and the 13 under ART-MSK-TOP-17872815ED. Two are in related_concept_ids. A contrasts_with edge between the two fibre types is owed to a relations batch.

---

# Item

## label
The compound action potential of a nerve trunk

## id
CON-NEU-18D07BA4202CDA

## canonical_key
nerve.compound-action-potential.graded

## aliases
Compound action potential
Action potential in nerve trunk
Graded response of a mixed nerve
Recruitment in a nerve trunk

## arabic_label
جهد الفعل المركب

## arabic_aliases
جهد الفعل في جذع العصب
الاستجابة المتدرجة للعصب المختلط

## definition
A nerve trunk is made of **many fibres**, so the potential recorded from it is compound.

It has **many peaks**, because the fibres differ in threshold, in distance from the stimulating electrodes and in conduction speed, so activity in fast fibres arrives before activity in slow ones.

It is __graded rather than all-or-none__: subthreshold stimuli give no response, a threshold stimulus excites the low-threshold fibres and gives a small potential, a supra-threshold stimulus increases the amplitude up to a maximum at maximal stimulation, and supramaximal stimuli add nothing further.

## explicit_objective
Explain why a compound action potential is graded and multi-peaked while a single fibre is all-or-none.

## pitfalls
Applying the all-or-none law to a whole nerve. The law is a property of one fibre; a trunk is a population, and increasing the stimulus recruits more of its members, which is why the recorded amplitude grows. The same error read backwards makes students think a bigger stimulus gives a bigger spike in a single axon, which it does not.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU

## topic
Neurophysiology

## subtopic


## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Action Potential in Nerve Trunk "Compound Action Potential"

## article_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-NEU-7A30FECF042995 | CON-NEU-A0C8307D2825A6 | CON-NEU-DF016B86DF56FF

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.15

## exam_weight_by_year
KAU_Y1=0.15

## clinical_relevance
0.5

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal
src_2093c80b1f9c25f9c0a4 | department_question_book | undated | p44 | 103 BMS

## atomic_claim_ids
CLM-NEU-COMPOUND-AP-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology MCQ 55] Compound action potential: Is a graded potential

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book does not say how many peaks a human peripheral nerve trunk gives, nor which fibre groups they correspond to, so no correspondence is asserted here.

## evidence_gaps
Supported by the Kasr Al Ainy Physiology department book only, through CLM-NEU-COMPOUND-AP-01 and its citation. No independent verification against an international physiology reference has been attached.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The book's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level to hold it.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department book; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched the corpus for "compound action potential" and "nerve trunk" — no concept candidate record exists.
rejectedMergeCandidateIds: Nothing was rejected. No live or pending record covers the compound action potential.
blueprintWeight: EXCLUDED TOPIC. "Compound Action Potential" is one of the seven topics the Physiology department excludes from the 2025-2026 final theoretical exam. The weight of 0.15 and the exam_weight_by_year of KAU_Y1=0.15 record that the question book still asks it while the department does not examine it; they must not be read as evidence that it is examined. weight_confidence is 0.2 for the same reason.
examSignal: A department question-book appearance only. The department's own short-answer list does ask students to compare nerve and compound action potentials, which is why the concept is authored rather than dropped, but the theoretical exam excludes it.
exclusionReason: Left empty deliberately — the field records why a concept is not published, and this one is publishable. The exam exclusion is recorded under blueprintWeight above.
relationships: Walked the same 20 neighbours. Three are in related_concept_ids. A contrasts_with edge between this concept and the single-fibre action potential is the most valuable edge in this set and is owed to a relations batch.

---

# Item

## label
Monophasic versus biphasic action potential recording

## id
CON-NEU-8E195C4C7D9BFF

## canonical_key
nerve.biphasic-action-potential.surface-electrodes

## aliases
Monophasic and biphasic action potential
Biphasic action potential
Surface recording of the action potential
Localising nerve damage by recording

## arabic_label
جهد الفعل أحادي وثنائي الطور

## arabic_aliases
التسجيل السطحي لجهد الفعل

## definition
A **monophasic** action potential is recorded with one electrode inserted into the interior of the fibre and an indifferent electrode on the outer surface.

A **biphasic** action potential is recorded with both electrodes on the outer surface: at rest there is no potential difference; as depolarisation reaches the nearer electrode it becomes negative relative to the other; when the impulse lies between them the potential returns to zero; as the impulse passes the second electrode the first becomes positive relative to it and a wave in the opposite direction is recorded; and when the impulse leaves the second electrode no difference remains.

Crushing or destroying the nerve between the electrodes, or under the second one, makes the record monophasic — __which is what allows the technique to localise damage__.

## explicit_objective
Distinguish a monophasic from a biphasic recording by electrode placement, and explain why damage between the electrodes abolishes the second deflection.

## pitfalls
Believing that a biphasic record means the impulse travels in two directions. Both deflections come from one impulse travelling one way: the first as it passes the near electrode, the second as it passes the far one. The number of phases counts electrodes passed, not directions travelled.

## concept_type
investigation

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU

## topic
Neurophysiology

## subtopic


## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Monophasic and Biphasic Action Potential

## article_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## related_article_ids
ART-NEU-TOP-5A8339CA4A

## related_concept_ids
CON-NEU-7A30FECF042995 | CON-NEU-18D07BA4202CDA

## resource_ids
src_59643edb9d371bcefa2c

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.15

## exam_weight_by_year
KAU_Y1=0.15

## clinical_relevance
0.5

## academic_relevance
0.85

## weight_confidence
0.2

## confidence
0.9

## exam_signal
src_2093c80b1f9c25f9c0a4 | department_question_book | undated | p43 | 103 BMS

## atomic_claim_ids
CLM-NEU-BIPHASIC-AP-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Physiology MCQ 54] Regarding the Bipolar action potential, all are true EXCEPT: One of the recording electrodes is placed on inner, while the other was placed on outer surface of cell membrane

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The question book calls this the "Bipolar action potential" while the department book calls it biphasic. The two terms are used for the same recording here; whether a marker accepts either is a local convention and is flagged for a reviewer.

## evidence_gaps
Supported by the Kasr Al Ainy Physiology department book only, through CLM-NEU-BIPHASIC-AP-01 and its citation. No independent verification against an international physiology reference has been attached.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The book's own section name is already carried by module_subject; the canonical tree has no node finer than the topic level to hold it.
nanotopicId: No nanotopic exists below the microtopic level for this material, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department book; this concept has no corpus extraction record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
sourceCandidateIds: Searched the corpus for "biphasic", "monophasic" and "recording electrode" — no concept candidate record exists.
rejectedMergeCandidateIds: Nothing was rejected. No live or pending record covers monophasic and biphasic recording.
blueprintWeight: EXCLUDED TOPIC. "Monophasic and Biphasic Action Potential" is one of the seven topics the Physiology department excludes from the 2025-2026 final theoretical exam. The weight of 0.15 and the exam_weight_by_year of KAU_Y1=0.15 record that the question book asks it while the department does not examine it, and must not be read as evidence that it is examined. weight_confidence is 0.2 for the same reason.
examSignal: A department question-book appearance only; the 2025 end-of-year paper does not ask it and the department excludes the section.
exclusionReason: Left empty deliberately — the field records why a concept is not published, and this one is publishable. The exam exclusion is recorded under blueprintWeight above.
relationships: Walked the same 20 neighbours. Two are in related_concept_ids. An often_confused_with edge between this concept and the compound action potential is owed to a relations batch; students meet both as "recordings that are not a single-fibre spike".
