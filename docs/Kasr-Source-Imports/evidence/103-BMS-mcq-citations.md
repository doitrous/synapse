<!--
  103 BMS · the 12 citations that tie the MCQ-lane claims to their book.

  One kind, one file: every record here is a citation. The claims they support
  are the sibling file ./103-BMS-mcq-claims.md, and the source they name is
  already in ./103-BMS-sources.md. Nothing here mints a claim ID or a source ID.

  One citation per claim, twelve for twelve. No claim in the batch is left
  unevidenced.

  ONE BOOK, and nothing else:

    Physiology   src_59643edb9d371bcefa2c   Dpt Book Physiology 103.pdf   51 pp

  The two department question books the MCQs were extracted from are named on
  the questions as provenance and are cited by nothing here. A question book is
  evidence about what a faculty asks, never evidence that something is true.

  EVERY SPAN IS THE BOOK'S OWN WORDS. Each was located in the cached page text
  at scripts/kasr/extract/pagetext/src_59643edb9d371bcefa2c.json, which is a
  native text layer rather than an OCR pass. Where a span crosses a line, a
  bullet or a numbered item the pieces are joined with a single space; where it
  crosses a heading the heading is quoted with it; where the book is spaced or
  punctuated oddly it is quoted as printed and the oddity is named in
  `context_note`. An ellipsis marks material the claim does not rest on, and
  every ellipsis is accounted for in its own `context_note`. Nothing is added.

  LOCATORS. `locator_page` is the page number in the file. This book's printed
  folio equals its file page throughout, so no offset is carried.

  EVIDENCE ROLE. All twelve are `local_curriculum`. This is the faculty's own
  department book — the authority of record for what module 103 BMS teaches,
  and not independent verification of a general physiological fact. Nothing here
  has been checked against an international reference and no citation claims it
  has.
-->

# Item

## id
CIT-KA-PHYS-MYELINATION-01

## claim_id
CLM-NEU-MYELINATION-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"1- Myelinated Nerve Fibers: The axon is surrounded by a myelin sheath (Fig 12) secreted by Schwann cells. It is an excellent insulator that decreases ion flow across the membrane. Myelin sheath is interrupted at “nodes of Ranvier” where ions can move across the membrane with little resistance. 2- Non - myelinated Nerve Fibers: The axon is simply surrounded by Schwann cells without formation of myelin sheath."

## locator_type
page

## locator_page
9

## locator_section
Types of nerve fibers regarding myelination

## locator_detail
The two numbered fibre-type entries under the heading "Types of nerve fibers regarding myelination", file page 9.

## context_note
The two entries are printed as consecutive bulleted items; the pieces are joined with a single space where the span crosses a line or a bullet. The figure reference "(Fig 12)" is the book’s own and is kept.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-SALTATORY-CONDUCTION-01

## claim_id
CLM-NEU-SALTATORY-CONDUCTION-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"The propagation of the AP from node to node is called saltatory conduction. The speed of propagation is proportional to the diameter of the axon and the internodal distance. Importance of the saltatory conduction: a. It increases the velocity of conduction of nerve impulse up to 50-fold. b. It conserves energy, little energy for reestablishing the Na+ and K+ concentration differences by Na+-K+ pump mechanisms."

## locator_type
page

## locator_page
22

## locator_section
Conduction [Propagation] of the Action Potential · B. Propagation in Myelinated Axons: Saltatory Conduction

## locator_detail
Numbered points 5 and 6 and the two lettered points under "Importance of the saltatory conduction", file page 22.

## context_note
The span joins the end of the numbered list to the lettered list that follows it under its own heading; the heading is quoted with the span. The book’s numbering is kept.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-REPOLARISATION-01

## claim_id
CLM-NEU-REPOLARISATION-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"2. During Repolarization: Inactivation of Na+ channels and activation of K+ channels produce repolarization as follows: a. Inactivation of Na⁺ channels: -Stops Na⁺ influx. -Terminates depolarization. b. Activation of K⁺ channels: Gates open shortly after Na⁺ channels. Opening is slower and more prolonged than Na⁺ channels. K⁺ efflux continues after Na⁺ channel inactivation. K⁺ efflux completes repolarization."

## locator_type
page

## locator_page
17

## locator_section
Ionic basis of action potential · During Repolarization

## locator_detail
The lettered points a and b under "2. During Repolarization", file page 17. The hyperpolarisation half of the claim is on file page 18: "Slow closure of K +channels lead to: hyperpolarization [more negative than RMP]."

## context_note
The book sets the sub-points as bullets under each lettered heading; the pieces are joined with a single space. The spacing oddity "K +channels" on page 18 is the book’s own and is quoted as printed in the locator detail.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-LOCAL-RESPONSE-01

## claim_id
CLM-NEU-LOCAL-RESPONSE-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"Characters of Local Response: a. It does not obey All or None law. b. It is non-propagated i.e its magnitude is insufficient to generate another local response nearby and it fades away within 1-2 mm. c. It is graded i.e the magnitude and duration of the local response vary with the size and strength of the stimulus. d. It has no refractory period. e. It can be summated by rapid repeated sub-threshold stimuli to reach firing level, and generate an action potential. f. During local response, the nerve excitability is increased, as membrane potential moves towards firing level."

## locator_type
page

## locator_page
23

## locator_section
Local excitatory state (Local Response) · Characters of Local Response

## locator_detail
The six lettered characters a to f under "Characters of Local Response", file page 23.

## context_note
Quoted as printed, including the book’s "i.e" without a full stop. The mechanism above the span states that subthreshold stimuli open some sodium activation gates and that repolarisation then follows rapidly.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-EXCITABILITY-FACTORS-01

## claim_id
CLM-NEU-EXCITABILITY-FACTORS-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"2. Conditions that decrease the membrane permeability to Na + decrease the nerve excitability i.e. slowly depolarized “membrane stabilizers” e.g.: a. High Ca++ concentration in the extracellular fluid (Hypercalcemia) b. Local anesthetics as cocaine. ... B. Role of K+: The resting membrane potential is primarily dependent on the concentration gradient of K+. a. Increase in extracellular K+ [hyperkalemia] makes the resting membrane potential to depolarize and increases its excitability. b. Decrease in extracellular K+ concentration makes the resting membrane potential to hyperpolarize and decreases its excitability."

## locator_type
page

## locator_page
20

## locator_section
Factors that affect the excitability of the nerve

## locator_detail
Point 2 under "A. Role of Na+" and the whole of "B. Role of K+", file page 20. The familial periodic paralysis box sits immediately below on the same page.

## context_note
The ellipsis marks where the span skips points 3 and 4 of the sodium list, on tetrodotoxin and hyponatraemia, which the claim does not rest on. Point 1 of the sodium list, on veratridine and hypocalcaemia, is on file page 19.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-SODIUM-POTASSIUM-PUMP-01

## claim_id
CLM-NEU-SODIUM-POTASSIUM-PUMP-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"2- Sodium-Potassium Pump: Na+-K+ pump actively transports 3 Na+ out and 2 K+ into the cell. Therefore, more positive charges are pumped to the outside than to the inside leaving a net excess of positive ions on the outside (Fig 17)."

## locator_type
page

## locator_page
12

## locator_section
Causes of Resting Membrane Potential: ionic basis of RMP · 2- Sodium-Potassium Pump

## locator_detail
The whole of numbered section 2, file page 12. The electrogenic contribution of about minus 4 mV is stated on file page 14: "The pump is electrogenic and contributes to about - 4 mV of the resting membrane potential."

## context_note
The pump’s classification as primary active transport, and its alpha and beta subunit structure with the ATP binding site and ATPase activity, are on file page 5 under "Types of active transport".

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-NMJ-TRANSMISSION-01

## claim_id
CLM-MSK-NMJ-TRANSMISSION-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"1. Arrival of nerve impulse at nerve ending opens voltage-gated Ca++ channels. 2. Ca2+ enters the nerve endings and causes rupture of vesicles and exocytosis of acetylcholine. 3. Acetylcholine crosses the synaptic cleft and binds to its receptor (which is a ligand-gated channel) in the MEP. 4. The channel is opened and leads to Na + ions influx and depolarization of MEP. The response is called end-plate potential (EPP). 5. The EPP is a graded, non -propagated response that acts as a stimulus and depolarizes the adjacent muscle membrane to its firing level. ... 7. Acetylcholine then dissociates from its receptor and is hydrolyzed by acetylcholine esterase in the synaptic cleft. Degradation of acetylcholine is necessary to prevent it from causing multiple muscle contractions."

## locator_type
page

## locator_page
27

## locator_section
Neuromuscular Transmission · Sequence of Events during Neuromuscular Transmission

## locator_detail
Numbered steps 1 to 5 and step 7 of the seven-step sequence, file page 27.

## context_note
The ellipsis marks step 6, on the generation and bidirectional propagation of the muscle action potential, which the claim states in its own words from the same page. The book writes "acetylcholine esterase" as two words here and "ACHEase" on the same page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-MYASTHENIA-GRAVIS-01

## claim_id
CLM-MSK-MYASTHENIA-GRAVIS-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"Myasthenia gravis is a serious and sometimes fatal disease in which skeletal muscles are weak and tire easily. Muscle paralysis may occur due to inability of the neuromuscular junctions to transmit enough signals from the nerve fibers to the muscle (Fig 38). It is an autoimmune disease due to antibodies against acetylcholine receptors. In severe form of the disease, the patient dies of respiratory muscles paralysis. The disease can be treated by administration of anticholinesterase drugs, such as neostigmine to accumulate adequate amounts of acetylcholine."

## locator_type
page

## locator_page
29

## locator_section
Neuromuscular Transmission · Myasthenia Gravis

## locator_detail
The whole of the boxed Myasthenia Gravis note, file page 29.

## context_note
The book prints this as a boxed clinical note between "Properties of Neuromuscular Transmission" and "Miniature End-Plate Potential". The named drug is quoted because the book names it; the claim states the mechanism and does not prescribe.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-EC-COUPLING-01

## claim_id
CLM-MSK-EC-COUPLING-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"1- Release of Ca2+: The propagation of the action potential into the T-tubule causes the Ca2+ channels on the terminal cisternae (TC) to open. Ca2+ flows out of the TC and into the cytoplasm. 2- Activation of muscle proteins: Ca2+ binds to troponin-C on actin. Troponin undergoes a conformational change in which tropomyosin moves away from its position covering the myosin-binding site on actin. Once uncovered, the binding site on actin combines with the myosin cross-bridges and contraction begins."

## locator_type
page

## locator_page
33

## locator_section
Changes Following Skeletal Muscle Stimulation · C- Mechanical Changes · Excitation-Contraction (EC) Coupling

## locator_detail
Numbered sections 1 and 2 of the excitation-contraction coupling account, file page 33.

## context_note
The book defines the process on the same page as "the process by which an action potential of muscle fiber initiates the contractile process". The role of the voltage-sensitive dihydropyridine receptor on the T tubule in opening the ryanodine channel on the reticulum is stated on file page 30.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-FIBRE-TYPES-01

## claim_id
CLM-MSK-FIBRE-TYPES-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"2. Fast Fibers (pale = type II b) characterized by the following: Larger fibers innervated by large rapidly - conducting motor neurons. Contain extensive sarcoplasmic reticulum for rapid release of calcium ions. Have large amounts of glycolytic enzymes for rapid release of energy by the glycolytic process. Have high ATPase activity. Contain less blood supply, less myoglobin content, and fewer mitochondria. These characters provide type II b fibers with rapid contractile mechanisms and less resistance to fatigue."

## locator_type
page

## locator_page
38

## locator_section
Factors Affecting Skeletal Muscle Contraction · I- Type of muscle fibers

## locator_detail
The whole of numbered entry 2, "Fast Fibers (pale = type II b)", file page 38. The matching entry 1 for slow red type I fibres is on file page 37.

## context_note
The book sets each fibre type as a bulleted list closed by a summary arrow; the bullets are joined with a single space. Both halves of the claim come from the same two-entry list, split across the page break between file pages 37 and 38.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-COMPOUND-AP-01

## claim_id
CLM-NEU-COMPOUND-AP-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"The action potential recorded from such nerves is a compound action potential: 1. It has many peaks (Fig 32): this is due to the fact that the fibers vary in: a. Their threshold of stimulation b. Their distance from stimulating electrodes. c. Their speed of conduction according to their thickness. ... 2. Compound AP is graded a. Subthreshold stimuli → no response. b. Threshold stimulus → nerve fibers of low threshold respond → small AP is recorded. c. Suprathreshold stimulus → ↑the amplitude of AP, up to a maximum at maximal stimulation. d. Increasing the intensity of the stimulus above maximum “Supramaximal stimuli” → no further increase in the amplitude of the AP"

## locator_type
page

## locator_page
25

## locator_section
Action Potential in Nerve Trunk "Compound Action Potential"

## locator_detail
Numbered points 1 and 2 with their lettered sub-points, file page 25.

## context_note
The ellipsis marks the sentence explaining that activity in fast-conducting fibres arrives at the recording electrodes sooner than activity in slower fibres, which the claim states in its own words. The arrows and the up-arrow are the book’s own notation.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-BIPHASIC-AP-01

## claim_id
CLM-NEU-BIPHASIC-AP-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"Monophasic action potential is recorded while inserting an electrode into the interior of the fiber and an indifferent electrode is put on the outer surface (Fig 30). Biphasic action potential is recorded while the two recording electrodes are placed on the outer surface of the nerve fiber."

## locator_type
page

## locator_page
24

## locator_section
Monophasic and Biphasic Action Potential

## locator_detail
The two definitions opening the section, file page 24. The five lettered stages a to e of the biphasic record follow immediately on the same page, and the note that crushing the nerve between the electrodes makes the record monophasic is on file page 25.

## context_note
The book indents both definitions under one heading and gives the sequence of changes as lettered points beneath them.

## confidence
0.95

## counts_as_claim_evidence
yes
