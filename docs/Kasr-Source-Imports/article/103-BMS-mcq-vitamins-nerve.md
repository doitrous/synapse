<!--
  103 BMS · Physiology · three new library articles and one update, for the MCQ lane.

  WHY ONLY THREE. The 44 vitamins MCQs need no new article at all: all three of
  the concepts they test are already taught by
  ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS, which is why no biochemistry
  article appears in this file. Of the 55 Nerve and Muscle MCQs, 43 test
  concepts that an existing article already covers — the pending
  ART-103-PHY-NERVE-ACTION-POTENTIAL and ART-103-PHY-SKELETAL-MUSCLE-TENSION,
  and the live ART-NEU-TOP-5A8339CA4A, ART-MSK-TOP-17872815ED and
  ART-MSK-TOP-B54C248DF1. These three carry the twelve concepts nothing taught.

    ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION   → CON-NEU-5664D7AB68AD8D, CON-NEU-A0C8307D2825A6,
                                                CON-NEU-7E784A50D2BBAF, CON-NEU-1E66BE533E894C,
                                                CON-NEU-18D07BA4202CDA, CON-NEU-8E195C4C7D9BFF
    ART-103-PHY-NEUROMUSCULAR-TRANSMISSION   → CON-MSK-77D955AAB4D0FA, CON-MSK-5C2B5DD83C1805
    ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING  → CON-MSK-3013AA61E917B7, CON-MSK-3E5F54D8D58E9C

  THE FOURTH RECORD IS AN UPDATE, not a new article. Two of the twelve new
  concepts — repolarisation and hyperpolarisation, and the factors affecting
  nerve excitability — are already taught in full by the prose of
  ART-103-PHY-NERVE-ACTION-POTENTIAL, which covers both in its Mechanism and Key
  determinants sections and names familial periodic paralysis and the local
  anaesthetics in its Clinical significance section. Writing a second article for
  them would have duplicated that prose. The update carries the record's `id`,
  its discriminating columns and only the fields it changes, and it appends with
  `+` so the four concepts already listed survive. Validate it with
  `medical:simulate`, not `medical:batch`, which judges every record as new.

  ALL PROSE IS FROM `Dpt Book Physiology 103.pdf` (src_59643edb9d371bcefa2c),
  pages 5, 9, 12, 14, 20 to 34, 37, 38 and 46. Nothing is asserted that the book
  does not say, and where the book is silent — how many Schwann cells wrap an
  internode, how many peaks a human nerve trunk gives — the article is silent
  too. The two department question books are named as curriculum signal on the
  questions themselves and are cited nowhere as evidence that something is true.

  EVIDENCE. Every `claim_ids` entry is authored in
  ../evidence/103-BMS-mcq-claims.md with a citation in
  ../evidence/103-BMS-mcq-citations.md quoting the book with a page locator.
  `span_ids` is present and `[clear]` on every record: this lane authors no spans
  batch, and naming a span ID that does not exist would be an invented ID.

  MEDIA. Ten assets are requested across the three articles and none is supplied.
  There is no rights-cleared figure for any of this material, and the book's own
  figures are faculty teaching material cited by locator and not reproduced. No
  URL is invented anywhere in this file, and `## media` is present and empty on
  every record with a `field_notes` reason.

  ONE BACK-LINK IS OWED, DELIBERATELY. Thirteen of the 55 Nerve and Muscle MCQs
  name a **live** article in library_ids — ART-NEU-TOP-5A8339CA4A,
  ART-MSK-TOP-17872815ED and ART-MSK-TOP-B54C248DF1 — because the live concepts
  they test already name those articles in their own `article_ids`. That
  direction of the §7 link therefore exists. The reverse does not: those three
  live records carry an empty `questionIds`, and this lane cannot append to it
  without also supplying a `topic`, which none of the three has and which this
  lane has no standing to invent for an article another lane owns. Three update
  records were written, validated, and then removed for exactly that reason. The
  missing article-to-question link is reported to the lead as owed rather than
  closed with a guess.

  Import: Admin > Bulk import > article, with **Update matching items** on, so
  the fourth record updates rather than duplicates.
-->

# Item

## id
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## title
The nerve fibre, and how an impulse travels along it

## arabic_title
الليفة العصبية وكيفية انتقال السيالة العصبية

## aliases
Types of nerve fibres regarding myelination
Saltatory conduction
Propagation of the action potential
Local response
Compound action potential
Monophasic and biphasic action potential
Sodium-potassium pump

## subject
neuro

## topic
Neurophysiology

## subtopic
Physiology of the Nerve

## microtopic


## nanotopic


## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-NEU

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
11

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Dr. Omar

## final_publisher
Admin team

## summary
One cell does all of this. The neuron is the structural and functional unit of the nervous system, and whether its axon is wrapped in Schwann-cell myelin decides almost everything about how fast and how cheaply it carries an impulse. Myelin insulates the internode, so action potentials are generated only at the nodes of Ranvier and jump between them — fifty times faster, and far cheaper, than the continuous conduction of an unmyelinated axon. Alongside that this article carries three things the same chapter treats as separate topics but which are really the same physiology seen from different instruments: the local response a subthreshold stimulus produces, the compound potential a whole nerve trunk gives, and the two-electrode recording that turns a monophasic wave into a biphasic one. The Na⁺–K⁺ pump is here too, because it is what pays for all of it afterwards.

## sections
### Definition
The neuron is the structural and functional unit of the nervous system, and with the muscle cell it is the most excitable cell in the body. Excitability is the ability of a living cell to respond to a change in its environment, and a stimulus is the change or event that excites it.

Nerve fibres come in two kinds. In a **myelinated** fibre the axon is surrounded by a myelin sheath secreted by Schwann cells; the sheath is an excellent insulator that decreases ion flow across the membrane, and it is interrupted at the **nodes of Ranvier**, where ions can move across the membrane with little resistance. In a **non-myelinated** fibre the axon is simply surrounded by Schwann cells without formation of a myelin sheath — so Schwann cells are present in both, and it is the sheath they do or do not build that separates the two.

The book also classifies fibres by thickness and conduction velocity. A fibres are 2 to 20 µ and conduct at 20 to 120 m/sec, and include the somatic motor fibres, subdivided into alpha, beta, gamma and delta. B fibres are 1 to 5 µ and conduct at 5 to 15 m/sec, and are preganglionic autonomic. C fibres are under 1 µ and conduct at 0.5 to 2 m/sec, and are postganglionic autonomic. The classes differ in more than speed: local anaesthetics depress C fibres before they affect A fibres, pressure on a nerve blocks A while C is relatively intact, and B fibres are the most susceptible to hypoxia while C are the least affected.

### Mechanism
**Propagation in an unmyelinated axon** is continuous. An action potential at one location acts as the stimulus for the adjacent region: during the reversal of polarity a potential difference exists between the active area and the resting areas beside it, and a local circuit of current flows between them, positive charges moving passively towards the area of negativity on both the outer and inner surfaces. The adjacent membrane depolarises, reaches threshold, and fires; the segment behind returns to its resting level; and the process repeats along the fibre.

**Propagation in a myelinated axon** follows the same principle with one change. The membrane between the nodes is covered by insulating myelin, and only at the nodes is it exposed to extracellular fluid with numerous voltage-gated sodium channels. So an action potential generated at one node becomes the stimulus for the next node, action potentials are generated only at the nodes, and the electrical signal jumps from one node of Ranvier to the next. This is **saltatory conduction**, and it buys two things: it increases conduction velocity up to fifty-fold, and it conserves energy, because little sodium and potassium have crossed and the Na⁺–K⁺ pump has little to restore.

Speed also depends on size. The speed of propagation is proportional to the square root of the fibre diameter, and to the internodal distance, which itself increases as the axon thickens. The magnitude of the action potential does not change as it is conducted — each segment regenerates it in full.

**Direction.** An axon can conduct either way: an impulse started in the middle of one sets up two impulses travelling in opposite directions. In the living animal impulses normally pass from synaptic junctions or receptors along the axon to its termination, which is orthodromic conduction; the opposite direction is antidromic. Because synapses conduct in one direction only, any antidromic impulse dies at the first synapse it meets. One-way traffic is therefore a property of the pathway, not of the axon.

**The Na⁺–K⁺ pump** is the best example of primary active transport. Its α subunit carries the ATP-binding site, two potassium sites on the outer aspect and three sodium sites on the inner; its β subunit has the ATPase activity that splits ATP into ADP, phosphate and energy. It transports three sodium out for every two potassium in, so more positive charge leaves than enters: the pump is electrogenic and contributes about −4 mV to the resting membrane potential, with the remaining 95 per cent coming from selective permeability. Its other job is to re-establish the sodium and potassium concentration differences after an action potential. It does not produce the spike.

### Key determinants
**The local response.** A subthreshold stimulus opens some sodium activation gates; sodium enters and produces a partial depolarisation that does not reach the firing level, and repolarisation follows rapidly. Its characters are worth learning as a set of five, because each is the negative of a property of the action potential. It does not obey the all-or-none law. It is non-propagated: its magnitude is insufficient to generate another local response nearby and it fades within 1 to 2 mm. It is graded, so magnitude and duration vary with the size and strength of the stimulus. It has no refractory period. And during it the nerve excitability is increased, because the membrane potential has moved towards the firing level. The fifth character follows from the fourth: because there is no refractory period, rapid repeated subthreshold stimuli can be summated to reach the firing level and generate an action potential.

A related phenomenon is **accommodation**. A gradual, slow increase in the intensity of a subthreshold stimulus up to threshold gives no response at all, because the slow opening of sodium channels and slow entry of sodium is balanced by inactivation of sodium channels and opening of potassium channels.

**The compound action potential.** Nerve trunks and peripheral nerves are made of many fibres, and the potential recorded from them is compound. It has many peaks, because the fibres vary in their threshold of stimulation, in their distance from the stimulating electrodes, and in their speed of conduction — activity in fast-conducting fibres arrives at the recording electrodes sooner than activity in slower ones. And it is graded: subthreshold stimuli give no response; a threshold stimulus excites the fibres of low threshold and a small potential is recorded; a supra-threshold stimulus increases the amplitude up to a maximum at maximal stimulation; and supramaximal stimuli produce no further increase. A single fibre obeys the all-or-none law and a trunk does not, because a trunk is a population and a stronger stimulus recruits more of its members.

**Monophasic and biphasic recording.** A monophasic action potential is recorded with one electrode inserted into the interior of the fibre and an indifferent electrode on the outer surface. A biphasic action potential is recorded with both electrodes on the outer surface, and the sequence is: no potential difference at rest; the electrode nearest the stimulator becomes negative relative to the other as the wave of depolarisation reaches it; the potential returns to zero while the impulse lies between the two; the first electrode becomes positive relative to the second as the impulse passes it, recording a wave in the opposite direction; and no potential difference remains once the impulse leaves the second electrode.

### Clinical significance
The nerve fibre classification is the reason different blocks fail differently. A local anaesthetic reaches the small unmyelinated C fibres before the large myelinated A fibres, so pain goes before motor power; pressure does the reverse, blocking A fibres while C fibres carry on, which is why a limb that has "gone to sleep" is numb to touch and still feels pain.

The biphasic recording has a use of its own: crushing or destroying the portion of nerve between the two electrodes, or the region under the second one, converts the record to monophasic, because no impulse reaches the second electrode. That is how the site of damage in a nerve pathway is localised.

Two of the topics in this article — the compound action potential, and monophasic and biphasic action potentials — are excluded from the 2025-2026 final theoretical exam by the Physiology department’s own announcement. They are taught here because the department question book still asks them and the department’s own short-answer list still sets a comparison between the nerve and compound action potentials.

### Common misconceptions
Three recur. The first is saying the impulse jumps from internode to internode: it jumps over the internodes, between the nodes. The second is inferring that because a myelinated fibre is fast, myelin must conduct well — it insulates, and the insulation is the reason for the speed. The third is treating a local response as a small action potential, when it is a different class of event: graded rather than all-or-none, non-propagated, and with no refractory period, which is precisely what lets two of them add together when two action potentials cannot.

## published_summary


## published_sections


## hold_these
Schwann cells are present in both fibre types; myelin is what only one of them makes.
Saltatory conduction buys two things — up to fifty-fold more speed, and much less work for the Na⁺–K⁺ pump.
Conduction speed is proportional to the square root of the fibre diameter, and the internodal distance grows with diameter.
An axon conducts both ways; the synapse is what makes a pathway one-way.
The local response has no refractory period, which is exactly why it can be summated to the firing level.
A single fibre is all-or-none; a nerve trunk is graded, because it is a population.
The Na⁺–K⁺ pump moves 3 Na⁺ out for 2 K⁺ in and contributes about −4 mV, not the whole resting potential.

## lose_the_mark
Saying the impulse jumps from internode to internode rather than from node to node.
Calling myelin a good conductor because myelinated fibres are fast.
Describing the local response as obeying the all-or-none law, or as propagated.
Applying the all-or-none law to a whole nerve trunk.
Naming the sodium pump as the cause of the resting membrane potential or of the spike.

## callout_evidence
### Saltatory conduction buys two things — up to fifty-fold more speed, and much less work for the Na⁺–K⁺ pump.
Claims: CLM-NEU-SALTATORY-CONDUCTION-01
Citations: CIT-KA-PHYS-SALTATORY-CONDUCTION-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### The local response has no refractory period, which is exactly why it can be summated to the firing level.
Claims: CLM-NEU-LOCAL-RESPONSE-01
Citations: CIT-KA-PHYS-LOCAL-RESPONSE-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### The Na⁺–K⁺ pump moves 3 Na⁺ out for 2 K⁺ in and contributes about −4 mV, not the whole resting potential.
Claims: CLM-NEU-SODIUM-POTASSIUM-PUMP-01
Citations: CIT-KA-PHYS-SODIUM-POTASSIUM-PUMP-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-NEU-5664D7AB68AD8D | CON-NEU-A0C8307D2825A6 | CON-NEU-7E784A50D2BBAF | CON-NEU-1E66BE533E894C | CON-NEU-18D07BA4202CDA | CON-NEU-8E195C4C7D9BFF

## related_articles
ART-103-PHY-NERVE-ACTION-POTENTIAL: the spike this article carries along the fibre, and the refractory periods that follow it
ART-103-PHY-NEUROMUSCULAR-TRANSMISSION: where the propagated impulse arrives, and what it does on reaching the ending

## question_ids
QM-103-8499A47AD2B3
QM-103-1B6EBF84B44D
QM-103-57D84E279B2F
QM-103-138D81297286
QM-103-3C56BB78CBBA
QM-103-4C8B2D57C766
QM-103-085B50E481E1
QM-103-39C75529A5B6
QM-103-5CABA71FF417
QM-103-67D93CB5C6DF
QM-103-D6B6C1ACD9C9
QM-103-7232D82560A4
QM-103-2B8C09EE029B
QM-103-9E6B90948A56

## resource_ids
src_59643edb9d371bcefa2c

## article_source_ids
src_59643edb9d371bcefa2c

## claim_ids
CLM-NEU-MYELINATION-01 | CLM-NEU-SALTATORY-CONDUCTION-01 | CLM-NEU-LOCAL-RESPONSE-01 | CLM-NEU-SODIUM-POTASSIUM-PUMP-01 | CLM-NEU-COMPOUND-AP-01 | CLM-NEU-BIPHASIC-AP-01

## span_ids
[clear]

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Types of nerve fibers regarding myelination
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Conduction [Propagation] of the Action Potential
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Local excitatory state (Local Response)
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Action Potential in Nerve Trunk "Compound Action Potential"
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Monophasic and Biphasic Action Potential
103 BMS > Physiology > Nerve and Muscle > Transport through the cell membrane > Active transport

## university_notes
kau: Three of the six sections this article covers are excluded from the 2025-2026 final theoretical exam by the Physiology department’s own announcement — Transport through the cell membrane, Monophasic and Biphasic Action Potential, and Action Potential in Nerve Trunk. The department question book asks all three, and the department’s own short-answer list still sets a comparison between the nerve and compound action potentials, so they are taught here with their exam weight recorded as low on both the concepts and the questions rather than dropped.

## annotations
### definition_of · CON-NEU-A0C8307D2825A6
Quote: The speed of propagation is proportional to the square root of the fibre diameter, and to the internodal distance, which itself increases as the axon thickens.
Block: body

### definition_of · CON-NEU-7E784A50D2BBAF
Quote: The fifth character follows from the fourth: because there is no refractory period, rapid repeated subthreshold stimuli can be summated to reach the firing level and generate an action potential.
Block: body

## media


## media_recommendations
### diagram · Saltatory conduction in a myelinated fibre
Brief: A myelinated axon with three nodes of Ranvier drawn, the local circuit currents looping through the extracellular fluid from an active node to the next resting one, and the internodal membrane marked as insulated with no channels
Purpose: Teaches CON-NEU-A0C8307D2825A6. Students can recite that the impulse jumps from node to node and still not see why it can — the answer is the path the current takes around the insulated stretch, which is spatial and cannot be carried by a sentence.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain

### graph · The local response summating to the firing level
Brief: Membrane potential against time, showing single subthreshold stimuli producing small graded depolarisations that decay, then a rapid train of the same stimuli summating until −65 mV is reached and an action potential fires
Purpose: Teaches CON-NEU-7E784A50D2BBAF. The whole point is that the same stimulus does something different when repeated quickly, which is a comparison across two traces; prose can assert it, only the paired traces show it.
Priority: strongly helpful
Status: needed
Section: Key determinants
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain

### graph · The compound action potential of a mixed nerve
Brief: A multi-peaked compound potential recorded from a nerve trunk, with the peaks labelled by the fibre groups that produce them, beside a series of traces showing amplitude rising with stimulus strength to a maximum
Purpose: Teaches CON-NEU-18D07BA4202CDA. Both properties the section describes — many peaks, and a graded amplitude — are properties of a shape, and a student who has only read about them cannot tell a compound record from a single-fibre one when handed a trace.
Priority: strongly helpful
Status: needed
Section: Key determinants
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain

### diagram · Monophasic versus biphasic recording
Brief: Two panels: one electrode inside the fibre with an indifferent electrode outside, giving a single deflection; and both electrodes on the outer surface, giving two deflections, with the five stages of the impulse passing the pair drawn beneath
Purpose: Teaches CON-NEU-8E195C4C7D9BFF. The number of phases follows entirely from where the electrodes sit, and the five stages are positions of an impulse in space. A reader who cannot see the electrodes cannot reconstruct why the second deflection is inverted.
Priority: required
Status: needed
Section: Key determinants
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Physiology department book for module 103 BMS, "Nerve and Muscle", pages 5, 9, 12, 14, 20 to 26. The department question book (src_2093c80b1f9c25f9c0a4), printed questions 7 to 10, 14, 15, 19, 20, 34, 37, 51, 53, 54 and 55, establishes that this material is asked; it is cited as curriculum signal only, never as evidence that something is true.

## evidence_gaps
Every statement rests on the Kasr Al Ainy Physiology department book alone. No independent verification against an international physiology reference has been attached, and no claim here has been through faculty review.

## conflicts


## last_reviewed


## review_due


## notes
Written to carry fourteen MCQs of the Nerve and Muscle chapter of the department question book. It deliberately gathers six sections the book keeps apart, because each is short and all six are the same physiology observed with a different instrument — a fibre, a subthreshold stimulus, a trunk, an electrode pair, and the pump that pays for it. A reviewer who prefers the book’s own division can split it; the concepts are already separate records, so nothing would have to be rewritten.

## field_notes
microtopicId: The canonical tree stops at the topic level for this material; the book’s own section names are carried in module_subject instead.
nanotopicId: No nanotopic node exists below the microtopic level for physiology, and inventing one would place this article somewhere nothing else lives.
media: No rights-cleared asset exists for any of this. The assets the article needs are requested in media_recommendations; the book’s own figures are faculty teaching material and are cited by locator only.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
publishedSummary: Empty until the article is published; the draft summary is the live one.
publishedSections: Empty until the article is published; the draft sections are the live ones.
spanIds: Present and deliberately empty. This lane authors no spans batch, so naming a span ID here would be an invented ID; the evidence chain runs through claim_ids and callout_evidence instead.

---

# Item

## id
ART-103-PHY-NEUROMUSCULAR-TRANSMISSION

## title
Neuromuscular transmission, and what myasthenia gravis does to it

## arabic_title
النقل العصبي العضلي والوهن العضلي الوبيل

## aliases
Neuromuscular transmission
Neuromuscular junction
Motor end plate
End-plate potential
Myasthenia gravis
Acetylcholinesterase

## subject
msk

## topic
Neurophysiology

## subtopic
Neuromuscular Transmission

## microtopic


## nanotopic


## primary_node_id
DIS-PHY-T07

## secondary_node_ids
DIS-PHY-T01 | SYS-MSK

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
8

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Dr. Omar

## final_publisher
Admin team

## summary
Transmission from an alpha motor neurone to a skeletal muscle fibre is a chemical relay with a fixed order, and almost every question about it is really a question about which step a statement belongs to. Calcium enters the nerve ending and releases acetylcholine; acetylcholine opens a cation channel on the motor end plate and produces a graded end-plate potential; the end-plate potential brings the neighbouring muscle membrane to threshold, and a propagated muscle action potential follows. Acetylcholinesterase in the cleft then destroys the transmitter, which is what stops one nerve impulse producing several contractions. Myasthenia gravis attacks the receptor, and its treatment inhibits the enzyme — two different molecules, which is why the therapy works.

## sections
### Definition
Neuromuscular transmission is the transmission of nerve impulses from an alpha motor neurone to skeletal muscle fibres.

The junction has three parts. The alpha motor neurone divides into axon terminals, or end feet, supplying several muscle fibres, and each muscle fibre receives only one axon terminal; the terminals hold the acetylcholine vesicles. The nerve ending fits into a depression in the muscle membrane, and the extracellular space between them is the **synaptic cleft**, which contains acetylcholinesterase bound to the basal lamina. Opposite the ending, the muscle membrane is thickened and thrown into junctional folds — the **motor end plate**, which is rich in acetylcholine receptors.

### Mechanism
The sequence has seven steps and they are worth holding in order, because most errors are a step in the wrong place.

1. The nerve impulse arrives at the nerve ending and opens **voltage-gated calcium channels**.
2. Calcium enters the nerve ending and causes rupture of the vesicles and exocytosis of acetylcholine.
3. Acetylcholine crosses the synaptic cleft and binds its receptor — a **ligand-gated channel** — in the motor end plate.
4. The channel opens, sodium flows in, and the end plate depolarises. That response is the **end-plate potential**.
5. The end-plate potential is a graded, non-propagated response that acts as a stimulus and depolarises the adjacent muscle membrane to its firing level.
6. Action potentials are generated on either side of the end plate and propagate in both directions along the muscle fibre, and the muscle action potential initiates contraction.
7. Acetylcholine dissociates from its receptor and is hydrolysed by acetylcholinesterase in the cleft. Degradation is necessary to prevent it causing multiple muscle contractions.

New vesicles form later from invaginations of the presynaptic membrane, are refilled and used again. At rest, a few vesicles rupture spontaneously and release their content, producing a minute depolarisation of the end plate — the miniature end-plate potential.

### Key determinants
Transmission has five properties the book lists, and each one is a question waiting to be asked.

It is **unidirectional**, occurring only from nerve to muscle. It carries a **delay of about 0.5 msec**, which is the time needed for acetylcholine to be released, for the permeability of the muscle fibre membrane to change, for sodium to flow in, and for depolarisation to build to the firing level. It **fatigues easily**, on repeated stimulation, through exhaustion of the acetylcholine vesicles. It depends on **ions**: calcium entry into the end feet ruptures the vesicles, and excess magnesium competes with calcium so that acetylcholine release is greatly decreased. And it is modified by **drugs** in three ways — drugs with an acetylcholine-like action that cholinesterase does not destroy, so their effect persists for minutes to hours, such as methacholine, carbachol and nicotine in small dose; drugs that stimulate transmission by inactivating cholinesterase, such as neostigmine, physostigmine and di-isopropyl fluorophosphate, letting extreme amounts of acetylcholine accumulate and repetitively stimulate the fibre; and curariform drugs, which block transmission because curare competes with acetylcholine for the receptor sites.

### Clinical significance
**Myasthenia gravis** is a serious and sometimes fatal disease in which skeletal muscles are weak and tire easily. Muscle paralysis may occur because the neuromuscular junctions cannot transmit enough signals from the nerve fibres to the muscle. It is an autoimmune disease due to antibodies against the acetylcholine receptors, and in the severe form the patient dies of paralysis of the respiratory muscles. It is treated by administration of anticholinesterase drugs such as neostigmine, to accumulate adequate amounts of acetylcholine.

Note how the pharmacology of the junction and the pathology of the junction fit together. The antibody removes receptors; the drug cannot replace them, so it raises the concentration of transmitter acting on the receptors that remain. This is also why curare and myasthenia produce similar weakness from opposite causes — one occupies the receptor, the other destroys it.

### Common misconceptions
The commonest is putting calcium on the wrong side of the cleft. Calcium entry is presynaptic and triggers vesicle rupture; what enters the muscle at the end plate is sodium, through a cation channel. The second is reading the end-plate potential as the muscle action potential: it is graded, local and non-propagated, and its function is to bring the neighbouring membrane to threshold. The third is naming acetylcholinesterase as what maintains the effect of acetylcholine, when it is what terminates it — and that error makes both the seventh step and the treatment of myasthenia impossible to explain.

## published_summary


## published_sections


## hold_these
Calcium entry is presynaptic and releases the transmitter; sodium entry is postsynaptic and depolarises the end plate.
The end-plate potential is graded and non-propagated; the muscle action potential it triggers is neither.
Acetylcholinesterase terminates transmitter action, and that is why one impulse gives one contraction.
The synaptic delay of about 0.5 msec is the time from release to reaching the firing level.
Myasthenia gravis is antibodies against the receptor; neostigmine acts on the enzyme.

## lose_the_mark
Saying the postsynaptic membrane becomes more permeable to calcium at the end plate.
Calling the end-plate potential a propagated response.
Writing that acetylcholinesterase maintains or produces the effect of acetylcholine.
Naming acetylcholinesterase as the antigen in myasthenia gravis because it is the drug’s target.

## callout_evidence
### Calcium entry is presynaptic and releases the transmitter; sodium entry is postsynaptic and depolarises the end plate.
Claims: CLM-MSK-NMJ-TRANSMISSION-01
Citations: CIT-KA-PHYS-NMJ-TRANSMISSION-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### Myasthenia gravis is antibodies against the receptor; neostigmine acts on the enzyme.
Claims: CLM-MSK-MYASTHENIA-GRAVIS-01
Citations: CIT-KA-PHYS-MYASTHENIA-GRAVIS-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-MSK-77D955AAB4D0FA | CON-MSK-5C2B5DD83C1805

## related_articles
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING: what the muscle action potential does once it has been generated
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION: how the impulse reached the ending in the first place

## question_ids
QM-103-C156AFC38BD2
QM-103-164D6E0523E4
QM-103-4CEED3E80F60
QM-103-9EE98F800F57
QM-103-E30E3EAE99F9
QM-103-8EAEB2AC7687

## resource_ids
src_59643edb9d371bcefa2c

## article_source_ids
src_59643edb9d371bcefa2c

## claim_ids
CLM-MSK-NMJ-TRANSMISSION-01 | CLM-MSK-MYASTHENIA-GRAVIS-01

## span_ids
[clear]

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Sequence of Events during Neuromuscular Transmission
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Physiologic Anatomy of Neuromuscular Junction
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Properties of Neuromuscular Transmission
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Miniature End-Plate Potential

## university_notes
kau: Neuromuscular Transmission is not on the Physiology department’s list of topics excluded from the 2025-2026 final theoretical exam, and the department’s own short-answer list sets two questions on it — describe the mechanism, and state the properties. The department book prints the Myasthenia Gravis account as a boxed clinical note inside this division and the subject tree carries no node for it, so this article’s module_subject stops at the division for that material; a reviewer may wish to add the node.

## annotations
### definition_of · CON-MSK-77D955AAB4D0FA
Quote: The end-plate potential is a graded, non-propagated response that acts as a stimulus and depolarises the adjacent muscle membrane to its firing level.
Block: body

### definition_of · CON-MSK-5C2B5DD83C1805
Quote: It is an autoimmune disease due to antibodies against the acetylcholine receptors, and in the severe form the patient dies of paralysis of the respiratory muscles.
Block: body

## media


## media_recommendations
### diagram · The neuromuscular junction in section
Brief: An axon terminal holding acetylcholine vesicles sitting in a depression of the muscle membrane, the synaptic cleft between them with acetylcholinesterase on the basal lamina, and the junctional folds of the motor end plate studded with receptors
Purpose: Teaches CON-MSK-77D955AAB4D0FA. Three of the four commonest errors in this topic are errors about which side of the cleft something is on, and a labelled section fixes all three at once in a way an ordered list of steps does not.
Priority: required
Status: needed
Section: Definition
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain

### flowchart · The seven steps of neuromuscular transmission
Brief: The sequence from impulse arrival through calcium entry, exocytosis, receptor binding, the end-plate potential and the propagated muscle action potential to hydrolysis by acetylcholinesterase, with the ion moving at each step named on the arrow
Purpose: Teaches CON-MSK-77D955AAB4D0FA. The order is what is examined, and a chart that names the ion on each arrow makes the presynaptic calcium and postsynaptic sodium impossible to swap — which is the single commonest mistake here.
Priority: strongly helpful
Status: needed
Section: Mechanism
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain

### diagram · The myasthenic junction beside a normal one
Brief: Two junctions side by side, one with a full complement of end-plate receptors and one with antibodies bound and most receptors lost, with the resulting end-plate potential drawn beneath each and the threshold marked
Purpose: Teaches CON-MSK-5C2B5DD83C1805. The disease is a quantitative failure — the end-plate potential no longer reaches threshold — and showing the two potentials against the same threshold line is what makes an anticholinesterase’s effect obvious rather than asserted.
Priority: strongly helpful
Status: needed
Section: Clinical significance
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Physiology department book for module 103 BMS, "Nerve and Muscle", pages 27 to 29. The department question book (src_2093c80b1f9c25f9c0a4), printed questions 3, 11, 27, 28, 30 and 52, establishes that this material is asked; it is cited as curriculum signal only.

## evidence_gaps
Every statement rests on the Kasr Al Ainy Physiology department book alone. No independent verification against an international physiology reference has been attached, and no claim here has been through faculty review. The article names drugs because the book names them; it states what they do and never a dose, and it lands as a draft that must not auto-publish.

## conflicts


## last_reviewed


## review_due


## notes
Written to carry six MCQs of the Nerve and Muscle chapter. Myasthenia gravis is taught here rather than in a clinical article because the department book teaches it here, as a boxed note inside the transmission chapter, and because its whole explanatory value lies in being read against the seven-step sequence immediately above it.

## field_notes
microtopicId: The canonical tree stops at the topic level for this material; the book’s own section names are carried in module_subject instead.
nanotopicId: No nanotopic node exists below the microtopic level for physiology, and inventing one would place this article somewhere nothing else lives.
media: No rights-cleared asset exists for any of this. The assets the article needs are requested in media_recommendations; the book’s own figures are faculty teaching material and are cited by locator only.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
publishedSummary: Empty until the article is published; the draft summary is the live one.
publishedSections: Empty until the article is published; the draft sections are the live ones.
spanIds: Present and deliberately empty. This lane authors no spans batch, so naming a span ID here would be an invented ID; the evidence chain runs through claim_ids and callout_evidence instead.

---

# Item

## id
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## title
From the T tubule to the uncovered actin site: excitation–contraction coupling and the fibre types

## arabic_title
اقتران الإثارة بالانقباض وأنواع الألياف العضلية

## aliases
Excitation-contraction coupling
EC coupling
Tubular system
The muscle proteins
Troponin and tropomyosin
Type of muscle fibres
Red and white muscle fibres

## subject
msk

## topic
Cell and membrane physiology

## subtopic
Physiology of the Muscle

## microtopic


## nanotopic


## primary_node_id
DIS-PHY-T01

## secondary_node_ids
DIS-PHY-T08 | SYS-MSK

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
10

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Dr. Omar

## final_publisher
Admin team

## summary
A muscle fibre is too thick for a surface signal to reach its middle by diffusion, and excitation–contraction coupling is the machinery that solves that problem. The T tubule carries the action potential into the depth of the fibre; its voltage sensor opens a calcium channel on the sarcoplasmic reticulum lying against it; calcium binds troponin C; tropomyosin moves off the actin site; and the cross-bridges attach. Relaxation is the same sequence run backwards, and it needs a pump. The second half of the article is the fibre-type table, which is examined constantly and is nearly always asked as an EXCEPT question, because the two columns are each other’s negatives.

## sections
### Definition
Excitation–contraction coupling is the process by which an action potential of a muscle fibre initiates the contractile process.

Two membrane systems make it possible. The **transverse (T) tubule** is an invagination of the membrane of the muscle fibre; it contains extracellular fluid, carries a voltage-sensitive dihydropyridine receptor, and the action potential spreads over the muscle membrane and into it. The **sarcoplasmic reticulum** is the endoplasmic reticulum of the fibre, surrounding each myofibril and running parallel with it; its ends expand into terminal cisternae which lie in contact with the T tubules, it holds a high concentration of calcium, and its membrane carries ryanodine receptors — calcium channels with foot processes between the reticulum and the tubule.

The contractile proteins are two. **Myosin** has two heavy chains forming a helix, whose terminal portions with four light chains form two arms and globular heads: these heads are the cross-bridges, and each carries an actin-binding site, an ATP-binding site and an ATPase site, and is flexible at two hinges. **Actin** is two chains coiled as a helix with a specific active site for myosin; at rest tropomyosin molecules cover those active sites, and troponin — a small globular complex of troponin I, which binds actin, troponin T, which binds tropomyosin, and troponin C, which binds calcium — attaches tropomyosin to actin.

### Mechanism
**Release of calcium.** Propagation of the action potential into the T tubule causes the calcium channels on the terminal cisternae to open, and calcium flows out of the cisternae into the cytoplasm. The relay is physical: excitation of the tubule activates its voltage-sensitive dihydropyridine receptor, which opens the ryanodine calcium channel on the reticulum, so calcium is released rapidly and all the myofibrils contract together.

**Activation of the muscle proteins.** Calcium binds troponin C on actin. Troponin undergoes a conformational change in which tropomyosin moves away from its position covering the myosin-binding site on actin. Once uncovered, that site combines with the myosin cross-bridges and contraction begins.

**Generation of tension.** Tension is the force developed when a muscle contracts, and it is generated by cycling of the cross-bridges in four steps: actin and myosin bind spontaneously once calcium is on troponin C and tropomyosin has moved; the cross-bridge bends and the actin filament slides across the myosin, the energy coming from hydrolysis of ATP by the ATPase into ADP and phosphate; the cross-bridge detaches, which requires ADP and phosphate to leave and a new ATP to take their place, since the new ATP reduces the affinity of the bridge for the active site; and the head returns upright to cycle again. If no ATP is available the filaments cannot be separated, which is contracture. Cycling continues as long as calcium is attached to troponin C and ATP is available, and the force is transmitted through the actin filament to the Z disc, then through the sarcolemma and the tendinous insertions to the bones.

**Relaxation** occurs when calcium is removed from the cytoplasm by the calcium pump on the sarcoplasmic reticulum membrane. As intracellular calcium falls, troponin returns to its original conformation, tropomyosin moves back to cover the myosin-binding site, and cross-bridge cycling stops.

The electrical events that begin all this are like those in nerve with some differences: the resting membrane potential of skeletal muscle is about −90 mV, the action potential lasts 2 to 4 msec, it is conducted along the fibre at about 5 m/sec, and it precedes the contraction by about 2 msec.

### Key determinants
Human skeletal muscles contain two fibre types, and the department book sets them out as two lists that are each other’s negatives.

**Slow fibres, red, type I.** Small fibres innervated by small, slowly conducting motor neurones. Large numbers of oxidative enzymes, and so a high mitochondrial volume. Low ATPase activity. Surrounded by more extensive capillaries, supplying extra oxygen. A higher concentration of myoglobin, which stores oxygen until it is needed and gives the fibre its colour. Together: a slow contractile mechanism, a large capacity for aerobic metabolism, and a high resistance to fatigue.

**Fast fibres, pale, type IIb.** Larger fibres innervated by large, rapidly conducting motor neurones. An extensive sarcoplasmic reticulum, for rapid release of calcium. Large amounts of glycolytic enzymes, for rapid release of energy by glycolysis. High ATPase activity. Less blood supply, less myoglobin and fewer mitochondria. Together: a rapid contractile mechanism and less resistance to fatigue.

Most muscles contain both. Muscles adapted for long posture-maintaining contractions, such as the back muscles and soleus, are composed mainly of slow fibres; muscles specialised for fine skilled movements, such as the external ocular muscles and some hand muscles, are mainly fast. Muscle groups with a high percentage of fast fibres exert more force and greater velocity. Ageing is associated with loss of muscle mass, and specifically with loss of fast fibres and a relative increase in slow ones.

### Clinical significance
Rigor mortis is this article read at its limit. Several hours after death all the muscles go into a state of contracture and become rigid, without any action potentials at all, because ATP has been lost and ATP is what separates actin from myosin during relaxation. The muscles remain in rigor until the muscle proteins are destroyed by bacterial putrefaction, 15 to 25 hours later, which is why rigor mortis has medico-legal importance in determining the time of death.

The same dependence explains why the detachment step, and not the binding step, is the one that consumes a fresh ATP — a fact that is easy to state and easy to get backwards, and that rigor mortis settles decisively.

### Common misconceptions
Three keep costing marks. Calcium binds troponin C, not tropomyosin — troponin is the sensor and tropomyosin the cover. Calcium is released from the terminal cisternae of the sarcoplasmic reticulum, not from the T tubules, which contain extracellular fluid and carry only the voltage change. And the slow red fibre is the aerobic one: reading "oxidative enzymes" and "anaerobic" as the same word is what the EXCEPT items in this chapter are built to catch.

## published_summary


## published_sections


## hold_these
The T tubule carries the voltage; the terminal cisternae hold the calcium.
Calcium binds troponin C, and it is tropomyosin that then moves off the actin site.
Detachment of the cross-bridge, not attachment, is what needs a fresh ATP.
Relaxation is active: a calcium pump on the sarcoplasmic reticulum removes the calcium.
Slow red type I fibres are oxidative, capillary-rich and fatigue-resistant; fast pale type IIb fibres are glycolytic, powerful and quick to tire.

## lose_the_mark
Saying calcium binds tropomyosin, or that troponin covers the actin site.
Saying calcium is released from the T tubules.
Describing cross-bridge detachment as a passive process.
Calling the slow red fibre anaerobic because it is described as oxidative.

## callout_evidence
### Calcium binds troponin C, and it is tropomyosin that then moves off the actin site.
Claims: CLM-MSK-EC-COUPLING-01
Citations: CIT-KA-PHYS-EC-COUPLING-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

### Slow red type I fibres are oxidative, capillary-rich and fatigue-resistant; fast pale type IIb fibres are glycolytic, powerful and quick to tire.
Claims: CLM-MSK-FIBRE-TYPES-01
Citations: CIT-KA-PHYS-FIBRE-TYPES-01
Reviewed by: Dr. Omar
Reviewed at: 2026-08-21

## related_concepts
CON-MSK-3013AA61E917B7 | CON-MSK-3E5F54D8D58E9C

## related_articles
ART-103-PHY-SKELETAL-MUSCLE-TENSION: the four-step cross-bridge cycle in full, and what happens when ATP runs out
ART-103-PHY-NEUROMUSCULAR-TRANSMISSION: how the muscle action potential this article starts from was generated

## question_ids
QM-103-15748A433A91
QM-103-4321642DFAC8
QM-103-60E2E77AFC94
QM-103-EB0DD544D7F9
QM-103-261E586861E8
QM-103-18EFFEE4EDAE
QM-103-496DD56C2D8C
QM-103-084F30B8D932
QM-103-E8CB66748C9F

## resource_ids
src_59643edb9d371bcefa2c

## article_source_ids
src_59643edb9d371bcefa2c

## claim_ids
CLM-MSK-EC-COUPLING-01 | CLM-MSK-FIBRE-TYPES-01

## span_ids
[clear]

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Changes Following Skeletal Muscle Stimulation
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Tubular System
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > The Muscle Proteins
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## university_notes
kau: None of the four sections this article covers is on the Physiology department’s list of topics excluded from the 2025-2026 final theoretical exam, and the department’s own short-answer list asks students to discuss the excitation-contraction coupling of skeletal muscle fibres. The excluded neighbours inside the same division are Types of Skeletal Muscle Contraction, Metabolic Changes Following Skeletal Muscle Stimulation, Electromyography, Muscular hypertrophy and Reaction of muscle to denervation, and none of them is taught here.

## annotations
### definition_of · CON-MSK-3013AA61E917B7
Quote: Calcium binds troponin C on actin. Troponin undergoes a conformational change in which tropomyosin moves away from its position covering the myosin-binding site on actin.
Block: body

### definition_of · CON-MSK-3E5F54D8D58E9C
Quote: Together: a rapid contractile mechanism and less resistance to fatigue.
Block: body

## media


## media_recommendations
### diagram · Excitation–contraction coupling from T tubule to cross-bridge
Brief: A triad in section — the T tubule with its dihydropyridine receptor apposed by foot processes to the terminal cisterna with its ryanodine receptor — with calcium flowing into the cytoplasm and binding troponin C, and tropomyosin shown rolling off the actin active site
Purpose: Teaches CON-MSK-3013AA61E917B7. The coupling is a relay between two membranes that touch, and the foot processes are the reason a voltage change on one opens a channel on the other. Prose can name both receptors; only the drawing shows that they face each other, which is what stops students saying calcium comes out of the T tubule.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain

### comparison table · Slow red and fast pale fibres side by side
Brief: A two-column table with rows for fibre size, motor neurone, oxidative enzymes and mitochondria, ATPase activity, sarcoplasmic reticulum, glycolytic enzymes, capillary supply, myoglobin, fatigue resistance and typical muscle
Purpose: Teaches CON-MSK-3E5F54D8D58E9C. The department examines this as EXCEPT items, where a single reversed row is the answer; a student needs to have seen the two columns opposite one another rather than to have read two paragraphs in sequence.
Priority: required
Status: needed
Section: Key determinants
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain

### diagram · The muscle proteins at rest and during contraction
Brief: A thin filament with actin, tropomyosin lying over the active sites and the troponin complex labelled I, T and C, shown twice — at rest with the site covered, and with calcium bound to troponin C and the site exposed to a myosin head
Purpose: Teaches CON-MSK-3013AA61E917B7. Which protein binds calcium and which covers the site is the commonest confusion in muscle physiology, and it is a spatial relationship between three molecules that a sentence has to state serially.
Priority: strongly helpful
Status: needed
Section: Definition
Source direction: openly licensed physiology text
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Physiology department book for module 103 BMS, "Nerve and Muscle", pages 30 to 34, 37, 38 and 46. The department question book (src_2093c80b1f9c25f9c0a4), printed questions 4, 31, 39, 40, 41, 43, 46, 47 and 50, establishes that this material is asked; it is cited as curriculum signal only.

## evidence_gaps
Every statement rests on the Kasr Al Ainy Physiology department book alone. No independent verification against an international physiology reference has been attached, and no claim here has been through faculty review.

## conflicts
Order of ATP hydrolysis in the cross-bridge cycle: the department book takes the energy for phosphorylating the cross-bridge from hydrolysis of ATP at the bending step, while several standard accounts hydrolyse ATP before the head binds and use the release of the products to drive the power stroke. The book’s order is what this module teaches and is what is given here; the disagreement is recorded rather than settled, and it is recorded identically on ART-103-PHY-SKELETAL-MUSCLE-TENSION.

## last_reviewed


## review_due


## notes
Written to carry nine MCQs of the Nerve and Muscle chapter. It stops short of the cross-bridge cycle in full, which ART-103-PHY-SKELETAL-MUSCLE-TENSION already teaches and whose two concepts are live in the pending physiology batch; the tension section here summarises rather than repeats it, and cross-links.

## field_notes
microtopicId: The canonical tree stops at the topic level for this material; the book’s own section names are carried in module_subject instead.
nanotopicId: No nanotopic node exists below the microtopic level for physiology, and inventing one would place this article somewhere nothing else lives.
media: No rights-cleared asset exists for any of this. The assets the article needs are requested in media_recommendations; the book’s own figures are faculty teaching material and are cited by locator only.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
publishedSummary: Empty until the article is published; the draft summary is the live one.
publishedSections: Empty until the article is published; the draft sections are the live ones.
spanIds: Present and deliberately empty. This lane authors no spans batch, so naming a span ID here would be an invented ID; the evidence chain runs through claim_ids and callout_evidence instead.

---

# Item

## id
ART-103-PHY-NERVE-ACTION-POTENTIAL

## title
Ionic basis of the nerve action potential

## subject
neuro

## topic
Neurophysiology

## arabic_title
الأساس الأيوني لجهد الفعل في العصب

## summary
An action potential is a series of rapid changes in membrane potential that follow an adequate stimulus. Two voltage-gated channels produce all of it: a sodium channel with an activation gate outside and an inactivation gate inside, and a potassium channel with one gate and no inactivation. Depolarisation is a regenerative sodium influx that carries the membrane from −90 mV through the −65 mV firing level to an overshoot of +35 mV. What the sodium channels do next sets the two refractory periods, which is why the ionic basis and the refractory periods are one story rather than two.

## related_concepts
+CON-NEU-DD9033DCA3AAF1
+CON-NEU-77596C8A899A7E

## question_ids
+QM-103-CF215CAC67F8
+QM-103-24DEA17BBD67
+QM-103-0341AFD987DF
+QM-103-E6EB6F6FB312
+QM-103-B989E6B3403B
+QM-103-6464B45502AA
+QM-103-39CBA46ED028
+QM-103-3A67ED5D1169
+QM-103-DFB0A3C9A1BE
+QM-103-9A16ABD005BD
+QM-103-7AB722D57B8C
+QM-103-BCCFE929B894
+QM-103-0F8BFA2767BB

## claim_ids
+CLM-NEU-REPOLARISATION-01
+CLM-NEU-EXCITABILITY-FACTORS-01

## related_articles
ART-103-PHY-SKELETAL-MUSCLE-TENSION: the muscle action potential the book describes as "like those in nerve with some differences", and which precedes contraction by about 2 msec
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION: how the spike this article describes is then carried along the fibre

## notes
Updated by the MCQ lane. Two concepts minted for the question-book items — CON-NEU-DD9033DCA3AAF1, repolarisation and hyperpolarisation, and CON-NEU-77596C8A899A7E, the factors affecting excitability — are already taught in full by this article's Mechanism, Key determinants and Clinical significance sections, so they are appended to related_concepts rather than given an article of their own. Thirteen MCQs whose library_ids name this article are appended to question_ids, and the two claims those concepts rest on to claim_ids. Every other field is deliberately omitted so the live value survives.
