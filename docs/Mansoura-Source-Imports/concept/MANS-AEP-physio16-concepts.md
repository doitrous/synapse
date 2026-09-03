# Item

## label
Whether a neurotransmitter is excitatory or inhibitory is set by the postsynaptic receptor it binds, not by the transmitter itself: an excitatory synapse opens ligand-gated Na+ channels to produce an EPSP, while an inhibitory synapse opens Cl- channels to hyperpolarise the membrane and produce an IPSP

## id
CON-NEU-2AB42FC2BEFE10

## canonical_key
nerve.synapse.excitatory-inhibitory-mechanism

## aliases
EPSP mechanism
IPSP mechanism
Excitatory postsynaptic potential
Inhibitory postsynaptic potential
Ligand-gated ion channels at the synapse

## arabic_label


## arabic_aliases
[clear]

## definition
At a chemical synapse the postsynaptic action of a neurotransmitter — whether it excites or inhibits the postsynaptic neuron — is determined by the function (the ion selectivity) of the postsynaptic receptor the transmitter binds, not by any property of the transmitter molecule itself; the same transmitter can be excitatory at one receptor and inhibitory at another. At an excitatory synapse, transmitter binding opens ligand-gated cation channels that let Na+ enter the postsynaptic neuron, depolarising it toward threshold; this depolarisation is the excitatory postsynaptic potential (EPSP). At an inhibitory synapse, transmitter binding instead opens ligand-gated Cl- channels, so Cl- enters the postsynaptic neuron and hyperpolarises it, moving it further from threshold; this hyperpolarisation is the inhibitory postsynaptic potential (IPSP).

## explicit_objective
State that the postsynaptic receptor, not the transmitter, decides whether a synapse is excitatory or inhibitory, and describe the ion channel and potential change (EPSP vs IPSP) each type produces.

## pitfalls
Assuming a given neurotransmitter is always excitatory or always inhibitory. The same transmitter binds different receptor subtypes in different locations, and it is the receptor's ion selectivity — Na+ entry for excitation, Cl- entry for inhibition — that fixes the effect at that particular synapse, not any fixed property of the transmitter.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-ANA-T01

## secondary_node_ids
SYS-NEU

## topic
Physiology

## subtopic
Synaptic Transmission

## microtopic
[clear]

## nanotopic
[clear]

## modules
MANS-AEP

## module_subject
MANS-AEP > Physiology > Synaptic Transmission

## universities
mans

## learner_years
1

## exam_signal
src_eb99c23b4006e7c6e7d3 | question_book | | p25-26 | MANS-AEP

## article_ids
ART-MANS-AEP-SYNAPTIC-TRANSMISSION

## related_article_ids
[clear]

## related_concept_ids
CON-NEU-7FA13B2FD8AF7C

## resource_ids
src_eb99c23b4006e7c6e7d3

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
When an excitatory neurotransmitter is released, it may lead to: [answer: EPSP]. The excitatory or inhibitory action of a neurotransmitter is determined by which of the following? [answer: function of its postsynaptic receptor]. Which of the following is characteristic of the events occurring at an excitatory synapse? [answer: ligand-gated channels are opened to allow sodium entry into the postsynaptic neuron]. Drugs which open Cl channels in synapses: [answer: cause hyperpolarization of postsynaptic membrane].

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent physiology reference not yet cross-checked; the receptor-determines-sign and Na+/Cl- channel mechanism are standard textbook (Guyton) facts and uncontested.

## owner
Claude

## reviewer


## final_publisher


## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been researched; left empty rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: SYS-NEU noted as the system placement; no second reviewed leaf identified this pass.
relatedArticleIds: The one article that teaches this concept is on article_ids; no further-reading article exists yet for this module.
relatedConceptIds: CON-NEU-7FA13B2FD8AF7C (presynaptic Ca2+-triggered vesicle release, same lecture family) is the presynaptic half of the same synaptic-transmission story this concept covers postsynaptically; cross-linked, typed edge not authored here.
resourceOccurrenceIds: Hand-authored from the source PDF; no corpus extraction record exists.
sourceCandidateIds: grep -ril "EPSP|IPSP|postsynaptic|excitatory synapse" across docs/Kasr-Source-Imports/concept and docs/Mansoura-Source-Imports/concept — no live concept states the receptor-determines-sign fact or the Na+/Cl- channel mechanism for a CNS chemical synapse; the nearest record, CON-NEU-64B329335E9489 (neuromuscular transmission properties), is scoped to the neuromuscular junction specifically (ACh, end plate) and does not state this general CNS-synapse receptor mechanism.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-NEU-64B329335E9489 read in full and rejected as a merge target — it states neuromuscular junction properties (delay, fatigue, ACh, curariform drugs), not the postsynaptic receptor-determines-sign mechanism this concept states.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the synapse-related concepts already minted for MANS-AEP (CON-NEU-4DEBC99A5D71DD, synapse types; CON-NEU-7FA13B2FD8AF7C, vesicle location) — neither states the excitatory/inhibitory receptor mechanism; this concept fills that gap.

---

# Item

## label
Synaptic transmission is exquisitely sensitive to pH and oxygenation: alkalosis raises neuronal excitability, while acidosis — including the CO2 retention produced by hypoventilation — and O2 lack both depress synaptic transmission

## id
CON-NEU-3A35E5F9E6BA1F

## canonical_key
nerve.synapse.ph-oxygen-modulation

## aliases
Acidosis and synaptic transmission
Alkalosis and synaptic transmission
Hypoventilation and neuronal activity
Oxygen lack and synaptic transmission

## arabic_label


## arabic_aliases
[clear]

## definition
Synaptic transmission at a CNS chemical synapse is markedly sensitive to the blood's acid-base state and oxygenation. A shift toward alkalosis increases neuronal excitability and facilitates synaptic transmission — clinically, a sufficiently severe alkalosis can even provoke seizures. A shift toward acidosis has the opposite, depressant effect, reducing neuronal activity and inhibiting synaptic transmission; hypoventilation depresses neuronal activity by exactly this route, since retained CO2 drives the blood toward acidosis. Oxygen lack (hypoxia) also inhibits synaptic transmission, since neurons depend on continuous oxidative metabolism to maintain the ionic pumps and transmitter synthesis synaptic signalling requires; even a few seconds of complete anoxia can abolish neuronal excitability.

## explicit_objective
State that alkalosis facilitates and acidosis (including hypoventilation-driven acidosis) and O2 lack both inhibit synaptic transmission and neuronal activity.

## pitfalls
Reversing which acid-base shift stimulates and which inhibits. Alkalosis is the facilitating/excitatory shift (it can precipitate seizures), while acidosis is the depressant one — the opposite pairing is a common mix-up, and hypoventilation's CO2 retention is a route to acidosis, not alkalosis.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-ANA-T01

## secondary_node_ids
SYS-NEU

## topic
Physiology

## subtopic
Synaptic Transmission

## microtopic
[clear]

## nanotopic
[clear]

## modules
MANS-AEP

## module_subject
MANS-AEP > Physiology > Synaptic Transmission

## universities
mans

## learner_years
1

## exam_signal
src_eb99c23b4006e7c6e7d3 | question_book | | p24-27 | MANS-AEP

## article_ids
ART-MANS-AEP-SYNAPTIC-TRANSMISSION

## related_article_ids
[clear]

## related_concept_ids
[clear]

## resource_ids
src_eb99c23b4006e7c6e7d3

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Synaptic transmission can be inhibited by: [answer: acidosis]. Synaptic transmission: [answer: is stimulated by alkalosis]. Hypoventilation has which of the following effects on neuronal activity? [answer: depresses neuronal activity]. Synaptic transmission is inhibited by all the following except: [answer: alkalosis].

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent physiology reference not yet cross-checked; the alkalosis-facilitates/acidosis-and-hypoxia-depress pairing is a standard textbook (Guyton) fact and uncontested.

## owner
Claude

## reviewer


## final_publisher


## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been researched; left empty rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: SYS-NEU noted as the system placement; no second reviewed leaf identified this pass.
relatedArticleIds: The one article that teaches this concept is on article_ids; no further-reading article exists yet for this module.
relatedConceptIds: No same-topic live concept states an acid-base or oxygenation modifier of synaptic transmission; none cross-linked.
resourceOccurrenceIds: Hand-authored from the source PDF; no corpus extraction record exists.
sourceCandidateIds: grep -ril "acidosis|alkalosis|hypoventilation|synaptic transmission" across docs/Kasr-Source-Imports/concept and docs/Mansoura-Source-Imports/concept — no live concept states a pH or oxygenation effect on synaptic transmission.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: The searches run before minting returned no near-miss to decide against.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the synapse-related concepts already minted for MANS-AEP; none states an acid-base or oxygenation modifier of transmission, so this concept fills a genuine gap rather than restating one.

---

# Item

## label
Synaptic fatigue — the progressive decline in a synapse's response to repetitive or prolonged stimulation — results mainly from exhaustion of neurotransmitter stores in the presynaptic terminal when the rate of release outpaces the rate of resynthesis, and partly from progressive desensitisation (inactivation) of the postsynaptic receptors

## id
CON-NEU-9FA7E8D63C5C37

## canonical_key
nerve.synapse.fatigue-causes

## aliases
Synaptic fatigue
Presynaptic transmitter depletion
Postsynaptic receptor desensitisation

## arabic_label


## arabic_aliases
[clear]

## definition
Synaptic fatigue is the progressive fall in a synapse's response when it is stimulated repetitively or for a prolonged period. It arises mainly at the presynaptic terminal: with sustained high-frequency use, the rate at which neurotransmitter is released from the presynaptic knobs outpaces the rate at which it can be resynthesised, so the store of releasable transmitter is progressively exhausted — an imbalance between the rates of synthesis and release rather than a simple failure of the presynaptic neuron to fire. A second, smaller contributor is postsynaptic: with sustained transmitter exposure, the postsynaptic receptors themselves can become progressively inactivated (desensitised), reducing the postsynaptic response even when transmitter continues to be released.

## explicit_objective
State that synaptic fatigue is caused mainly by depletion of presynaptic neurotransmitter stores (release outpacing resynthesis), with a secondary contribution from postsynaptic receptor desensitisation.

## pitfalls
Locating synaptic fatigue's principal cause postsynaptically or attributing it to a failure of the presynaptic neuron to discharge at all. The dominant mechanism is presynaptic transmitter depletion in the terminal knobs specifically, from an imbalance between how fast transmitter is released and how fast it is resynthesised — not a failure of the presynaptic neuron to fire, and not primarily a postsynaptic event, though postsynaptic receptor desensitisation does contribute.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-ANA-T01

## secondary_node_ids
SYS-NEU

## topic
Physiology

## subtopic
Synaptic Transmission

## microtopic
[clear]

## nanotopic
[clear]

## modules
MANS-AEP

## module_subject
MANS-AEP > Physiology > Synaptic Transmission

## universities
mans

## learner_years
1

## exam_signal
src_eb99c23b4006e7c6e7d3 | question_book | | p24-27 | MANS-AEP

## article_ids
ART-MANS-AEP-SYNAPTIC-TRANSMISSION

## related_article_ids
[clear]

## related_concept_ids
CON-NEU-64B329335E9489

## resource_ids
src_eb99c23b4006e7c6e7d3

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Fatigue in synapses may be related to which of the following: [answer: progressive inactivation of many of the postsynaptic receptors]. Which of the following is correct: [answer: synaptic fatigue is mainly due to depletion of neurotransmitter in presynaptic knobs]. Synaptic fatigue is due to: [answer: imbalance between the rates of synthesis and release of neurotransmitters].

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Independent physiology reference not yet cross-checked; the transmitter-depletion mechanism of synaptic fatigue is a standard textbook (Guyton) fact and uncontested.

## owner
Claude

## reviewer


## final_publisher


## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been researched; left empty rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: SYS-NEU noted as the system placement; no second reviewed leaf identified this pass.
relatedArticleIds: The one article that teaches this concept is on article_ids; no further-reading article exists yet for this module.
relatedConceptIds: CON-NEU-64B329335E9489 (neuromuscular-junction fatigue from ACh depletion, Kasr 103-BMS) is a same-mechanism neighbour scoped to the NMJ specifically; cross-linked as a related concept rather than reused, since this concept states the general CNS chemical-synapse fact (presynaptic-knob depletion plus postsynaptic desensitisation) the source itself tests, not the NMJ-specific ACh/end-plate wording.
resourceOccurrenceIds: Hand-authored from the source PDF; no corpus extraction record exists.
sourceCandidateIds: grep -ril "synaptic fatigue|fatigue" across docs/Kasr-Source-Imports/concept and docs/Mansoura-Source-Imports/concept — the only live match, CON-NEU-64B329335E9489, is scoped to the neuromuscular junction (ACh vesicles, end plate), not the general CNS chemical synapse this lecture tests; read in full and logged as a related-but-not-matching concept rather than reused, since reusing an NMJ-scoped record for a CNS-synapse question would misstate the tissue context.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-NEU-64B329335E9489 read in full and rejected as a merge target for the reason above (NMJ-scoped, not general CNS synapse).
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the synapse-related concepts already minted for MANS-AEP; none states synaptic fatigue for a general CNS chemical synapse, so this concept fills a genuine gap.

---

# Item

## label
Electrical synapses, formed by gap junctions that let ionic current pass directly between two neurons without a chemical intermediary, are uncommon in the mammalian CNS; the hippocampus is a classic example of where they occur

## id
CON-NEU-9667ECD08C0140

## canonical_key
nerve.synapse.electrical-gap-junction-cns

## aliases
Electrical synapse
Gap junction synapse
Hippocampus electrical synapse

## arabic_label


## arabic_aliases
[clear]

## definition
Most synapses in the nervous system are chemical, transmitting a signal by neurotransmitter release across a synaptic cleft. An electrical synapse instead is a gap junction — a direct, low-resistance channel between the cytoplasm of two neurons — that lets ionic current, and so electrical activity, pass straight from one cell to the next without any chemical intermediary or synaptic delay. Electrical synapses are common at some non-neural sites (e.g. cardiac and smooth muscle) but are relatively uncommon in the mammalian central nervous system; where they are found in the CNS, the hippocampus is the classic example given.

## explicit_objective
State that electrical synapses are gap junctions permitting direct current flow between neurons, distinguish them from chemical synapses, and identify the hippocampus as a classic CNS site.

## pitfalls
Assuming electrical synapses are the predominant synapse type in the CNS. The great majority of CNS synapses are chemical; electrical (gap-junction) synapses are the exception, found at only a limited number of CNS sites, of which the hippocampus is the one this course names.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-ANA-T01

## secondary_node_ids
SYS-NEU

## topic
Physiology

## subtopic
Synaptic Transmission

## microtopic
[clear]

## nanotopic
[clear]

## modules
MANS-AEP

## module_subject
MANS-AEP > Physiology > Synaptic Transmission

## universities
mans

## learner_years
1

## exam_signal
src_eb99c23b4006e7c6e7d3 | question_book | | p24 | MANS-AEP

## article_ids
ART-MANS-AEP-SYNAPTIC-TRANSMISSION

## related_article_ids
[clear]

## related_concept_ids
CON-NEU-42BB9566BBF6CF

## resource_ids
src_eb99c23b4006e7c6e7d3

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## blueprint_weight
0.2

## exam_weight_by_year
MANS_Y1=0.2

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.6

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The most common site for the electrical synapses in C.N.S; [answer: Hippocampus].

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The source names the hippocampus as the answer to "most common site for the electrical synapses in C.N.S" without further textbook citation; this is recorded as the department's taught fact, not independently verified against a primary physiology reference.

## evidence_gaps
Independent physiology reference not yet cross-checked; the general gap-junction/electrical-synapse mechanism is standard and uncontested, but the specific claim that the hippocampus is the most common CNS site is sourced only to this department exam bank.

## owner
Claude

## reviewer


## final_publisher


## last_reviewed


## review_due


## publication_status
needs_evidence

## editorial_review_status
authored_needs_independent_evidence

## exclusion_reason


## field_notes
arabicLabel: Arabic terminology has not been researched; left empty rather than guessed.
arabicAliases: Same — no Arabic terminology has been reviewed for this concept yet.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
secondaryNodeIds: SYS-NEU noted as the system placement; no second reviewed leaf identified this pass.
relatedArticleIds: The one article that teaches this concept is on article_ids; no further-reading article exists yet for this module.
relatedConceptIds: CON-NEU-42BB9566BBF6CF (Kasr 103-BMS, general intercellular communication via gap junctions) states the general gap-junction mechanism but not its CNS distribution or the hippocampus example; cross-linked rather than reused, since it does not state the fact this question tests.
resourceOccurrenceIds: Hand-authored from the source PDF; no corpus extraction record exists.
sourceCandidateIds: grep -ril "electrical synaps|gap junction" across docs/Kasr-Source-Imports/concept and docs/Mansoura-Source-Imports/concept — CON-NEU-42BB9566BBF6CF found and read in full; it states the general gap-junction mechanism (connexons, up to ~1000 MW, propagation of electrical activity) but never the CNS-distribution/hippocampus fact this question tests, so it is cross-linked rather than reused.
atomicClaimIds: No claim record exists yet; this concept/article batch does not include an evidence pass.
mergeIds: Nothing has been merged into this concept.
rejectedMergeCandidateIds: CON-NEU-42BB9566BBF6CF read in full and rejected as a merge target — it is the general mechanism record, not the CNS-site-specific fact this concept states.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the synapse-related concepts already minted for MANS-AEP; none states the CNS distribution of electrical synapses, so this concept fills a genuine gap.
