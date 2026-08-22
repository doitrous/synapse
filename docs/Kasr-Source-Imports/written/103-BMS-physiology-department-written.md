<!--
  103 BMS · Physiology department-bank written questions, from three of the department's
  own revision sets, none of them a sitting:

    1. "physiology muscle final", manifest src_a77e5bb70ba8a518d491, 8 pages, clean text
       layer — 11 numbered essay questions (NMT, EC coupling, muscle fibre types, motor
       unit and grading, length-tension, load-velocity, fatigue, rigor mortis, smooth
       muscle mechanism and control) plus unlabelled trailing sub-topics (plasticity,
       single-unit/multi-unit smooth muscle, smooth muscle AP/calcium channels, the
       contractile proteins, and a closing skeletal-muscle overview). 18 records.

    2. "Physiology of the Nerve" by Dr. MHR, manifest src_ff96361efb03c2396c4c, 8 pages.
       The text layer is badly OCR-corrupted (garbled numerals, missing symbols, Arabic
       fragments) — this is the trap SHARED-TOOLCHAIN.md/kasr-pdf-extraction-traps warns
       about, a text layer present but undecodable — so the source was read visually with
       the Read tool, page-image by page-image, and every fact below is taken off the
       rendered page, not the extracted text. 11 numbered questions (RMP, Nernst/Goldman,
       AP definition and phases, ionic basis, refractory periods, factors affecting
       excitability, myelinated/unmyelinated conduction, local response, strength-duration
       curve, monophasic/biphasic AP, compound action potential) plus unlabelled trailing
       topics (accommodation, nerve fibre types A/B/C, orthodromic/antidromic conduction,
       neurotrophins). 15 records.

    3. The "Nerve & Muscle Qs" solved/unsolved twin, manifest src_54494af664079a117412
       (solved) and src_b162ed799281e5558abe (unsolved). The manifest's sourceCategory
       reads "EOY", but the file itself is undated: no batch code, no printed sitting
       year, and its own cover states it is a student-made set of "ideas of questions in
       the same design as the exam", dedicated "as charity" to Dr. Amr El Abd — a revision
       bank, not a sitting, so the sitting-year rule (batchCode + 1827 / printed date) does
       not apply. The solved copy's text layer carries only the printed question, not the
       handwritten answer overlay, so both copies were read visually (Read tool, all 25
       pages). All 24 of its questions were checked against the two files above: 23
       duplicate a topic already authored there from a cleaner source, and are not
       re-authored a third time from a third paper of the same revision-set family. One
       genuinely new topic remained — isometric versus isotonic contraction — authored as
       1 record, with exam_relevance lowered because the department's own 2025-2026
       exclusion list (named in question/103-BMS-MCQ-nerve-muscle.md's header) excludes
       "Types of Skeletal Muscle Contraction" from the theoretical exam.

  Every "Written Questions"/practice-bank record's source_citation and author_notes name
  it explicitly as a department-bank item, never as a sitting, per the lane instruction.
  Marks per part are not printed in files 1 and 2; they are estimated from answer depth.
  File 3 does print marks, carried through unchanged for its one record.

  34 records total. Every main_concept is an existing, live-pending concept from
  concept/103-BMS-physiology-concepts.md or concept/103-BMS-mcq-vitamins-nerve-concepts.md,
  and every library_ids entry an existing article from article/103-BMS-physiology.md or
  article/103-BMS-mcq-vitamins-nerve.md — no new concept or article was minted for this
  file. Two concepts used here (CON-NEU-DD9033DCA3AAF1, CON-NEU-77596C8A899A7E) reach
  ART-103-PHY-NERVE-ACTION-POTENTIAL only through an UPDATE ROW appended to that article in
  article/103-BMS-mcq-vitamins-nerve.md (its own related_concepts block, `+CON-...` lines)
  — pass that file's --with alongside the base physiology article file so the simulated
  state carries the append.

  Status Draft throughout; these need a faculty reviewer. Import: Admin > Bulk import >
  question, after the physiology concept and article files.

  Validate with:
    npm run medical:batch -- docs/Kasr-Source-Imports/written/103-BMS-physiology-department-written.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-physiology.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-vitamins-nerve.md
-->

# Item

## id
QW-103-43820AA963BB

## title
Mechanism and steps of neuromuscular transmission

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the mechanism and steps of neuromuscular transmission.

## format
structured_written

## written_parts
### (a) 8 marks
Describe the mechanism and steps of neuromuscular transmission.
Expects: Definition: transmission of the impulse from the alpha motor neuron to the muscle fibre
Expects: An action potential opens voltage-gated Ca2+ channels at the nerve terminal; Ca2+ inflow triggers exocytosis of acetylcholine
Expects: Acetylcholine binds ligand-gated channels on the motor end plate, opening the channel and causing Na+ influx and depolarisation
Expects: The end-plate potential is graded and acts as a stimulus, depolarising the adjacent muscle membrane to firing level and producing action potentials that cause muscle contraction
Expects: Acetylcholine is hydrolysed by acetylcholinesterase in the synaptic cleft, preventing multiple contractions; new vesicles later form from invaginations of the presynaptic membrane and are refilled
Expects: The miniature end-plate potential: at rest, a few vesicles rupture spontaneously, releasing a small amount of acetylcholine and producing minute depolarisation at the motor end plate
Concept: CON-MSK-77D955AAB4D0FA

## derived_from


## topic
Neuromuscular Transmission

## subtopic
Mechanism of NMT

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-77D955AAB4D0FA

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Sequence of Events during Neuromuscular Transmission

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.8

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids


## library_ids
ART-103-PHY-NEUROMUSCULAR-TRANSMISSION

## resource_ids


## learning_objective
List, in order, the four steps of neuromuscular transmission from the arrival of the nerve action potential to acetylcholine hydrolysis.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p2.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 1; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p2 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-7D7A81BDCB9D

## title
Properties of neuromuscular transmission

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
State the properties of neuromuscular transmission.

## format
structured_written

## written_parts
### (a) 8 marks
State the properties of neuromuscular transmission.
Expects: Unidirectional: from nerve to muscle
Expects: Synaptic delay of about 0.5 msec, the time needed for acetylcholine release, sodium inflow and depolarisation
Expects: Fatigue: repeated stimulation depletes acetylcholine
Expects: Effect of ions: raised Ca2+ raises transmission; raised Mg2+ lowers transmission
Expects: Effect of drugs: drugs that stimulate neuromuscular transmission act either by acetylcholine-like action and are not destroyed by acetylcholinesterase (methacholine, small-dose nicotine) or by inactivating (anti-) cholinesterase (neostigmine, physostigmine, fluorophosphate); curare-type drugs block transmission by competing with acetylcholine for its receptors on the motor end plate
Concept: CON-NEU-64B329335E9489

## derived_from


## topic
Neuromuscular Transmission

## subtopic
Properties of NMT

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-NEU-64B329335E9489

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission > Properties of Neuromuscular Transmission

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.8

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids


## library_ids
ART-103-PHY-NMT

## resource_ids


## learning_objective
List the five properties of neuromuscular transmission and give one drug example that stimulates it and one that blocks it.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p2.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 2; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p2 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-EE951F4D5DCC

## title
Myasthenia gravis: cause, manifestations and treatment

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Give the cause, manifestations and treatment of myasthenia gravis, and describe the anatomy of the neuromuscular junction it affects.

## format
structured_written

## written_parts
### (a) 8 marks
Give the cause, manifestations and treatment of myasthenia gravis, and describe the anatomy of the neuromuscular junction it affects.
Expects: Cause: an autoimmune disease in which antibodies form against acetylcholine receptors
Expects: Manifestations: weakness of skeletal muscles, and death from paralysis of the respiratory muscles in severe cases
Expects: Treatment: an anticholinesterase (neostigmine), which raises acetylcholine at the neuromuscular junction
Expects: Anatomy of the junction: the alpha motor neuron ends on many axon terminals containing acetylcholine vesicles; the motor end plate is a depression in the skeletal muscle fibre with a thickened, folded membrane carrying acetylcholine receptors; the synaptic cleft, between the axon terminal and the muscle membrane, carries acetylcholinesterase
Concept: CON-MSK-5C2B5DD83C1805

## derived_from


## topic
Neuromuscular Transmission

## subtopic
Myasthenia gravis

## difficulty
Moderate

## question_type
Pathophysiology

## main_concept
CON-MSK-5C2B5DD83C1805

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Neuromuscular Transmission

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-PHY-NEUROMUSCULAR-TRANSMISSION

## resource_ids


## learning_objective
State the antibody target in myasthenia gravis, its most severe complication, and why an anticholinesterase relieves it.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p2.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 3; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p2 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-FCB3BFE77F7C

## title
Excitation-contraction coupling of skeletal muscle: molecular mechanism and electrical changes

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the molecular mechanism of excitation-contraction coupling of skeletal muscle, and its electrical and excitability changes.

## format
structured_written

## written_parts
### (a) 8 marks
Describe the molecular mechanism of excitation-contraction coupling of skeletal muscle, and its electrical and excitability changes.
Expects: Release of Ca2+: the action potential travels from the motor end plate to the T-tubules, opening Ca2+ channels on the sarcoplasmic reticulum, so Ca2+ flows into the cytoplasm
Expects: Activation of muscle proteins: Ca2+ binds troponin C, causing a conformational change that moves tropomyosin away, uncovering the myosin-binding sites on actin
Expects: Generation of tension by cross-bridge cycling: binding of actin and myosin; bending of the cross-bridges and sliding of actin across myosin, needing energy from ATP hydrolysis; detachment of the cross-bridges from actin, needing a new ATP (no ATP causes muscle contracture); and return of the cross-bridges to their original upright position to take part in another cycle — cycling continues as long as Ca2+ is bound to troponin and ATP is available, and tension is transmitted through actin to the Z line, tendon and bone
Expects: Relaxation is by removal of Ca2+ through the Ca2+ pump on the sarcoplasmic reticulum, lowering intracellular Ca2+, so troponin returns to its original position, tropomyosin moves back to cover the active sites, and cross-bridge cycling stops
Expects: Electrical changes: the resting membrane potential is -90 mV; the action potential lasts 2 to 4 msec and precedes muscle contraction, conducted along the fibre at about 5 m/sec
Expects: Excitability changes: the fibre is refractory to restimulation during the action potential; as the muscle begins to contract it regains excitability and can respond to restimulation (tetanisation)
Concept: CON-MSK-3013AA61E917B7 | CON-MSK-3B9143FBE075E4

## derived_from


## topic
Skeletal Muscle

## subtopic
Excitation-contraction coupling

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-3013AA61E917B7 | CON-MSK-3B9143FBE075E4

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Changes Following Skeletal Muscle Stimulation

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.9

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
9

## contextual_concept_ids


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## resource_ids


## learning_objective
List the four steps of cross-bridge cycling and state why the fibre can be tetanised despite its own action potential lasting only 2 to 4 msec.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p3.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 4; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p3 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-D7BE90CFFC17

## title
Factors affecting muscle contraction: comparing slow (red) and fast (pale) fibres

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Compare slow (red, type I) and fast (pale, type IIb) skeletal muscle fibres by size, innervation, colour, myoglobin, mitochondria, enzymes, ATPase activity, fatigue resistance and typical use.

## format
comparison_table

## written_parts
### (a) 6 marks
Compare slow (red, type I) and fast (pale, type IIb) skeletal muscle fibres by size, innervation, colour, myoglobin, mitochondria, enzymes, ATPase activity, fatigue resistance and typical use.
Expects: Slow (red) fibres are small, innervated by a small, slowly conducting neuron, red from a high blood supply and rich in myoglobin, with a high mitochondrial volume and large numbers of oxidative enzymes (large capacity for aerobic metabolism)
Expects: Fast (pale) fibres are large, innervated by a large, rapidly conducting neuron, pale from a lower blood supply and less myoglobin, with fewer mitochondria and large numbers of glycolytic enzymes, plus extensive sarcoplasmic reticulum for rapid Ca2+ release
Expects: Slow fibres have low ATPase activity and a slow contractile mechanism, highly resistant to fatigue, used for maintaining posture (soleus, back muscles); fast fibres have high ATPase activity and a rapid contractile mechanism, less resistant to fatigue, used for fine skilled movements (hand muscles)
Expects: With ageing there is loss of muscle mass, loss of fast fibres, and a relative rise in slow fibres
Concept: CON-MSK-3E5F54D8D58E9C

## derived_from


## topic
Skeletal Muscle

## subtopic
Fibre types

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-MSK-3E5F54D8D58E9C

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids


## learning_objective
Compare red and pale skeletal muscle fibres by ATPase activity, oxidative versus glycolytic enzyme content and fatigue resistance.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p3.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 5; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p3 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-53D972B41DBA

## title
The motor unit, and its role in grading muscular activity

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Define the motor unit and explain its role in grading muscular activity.

## format
structured_written

## written_parts
### (a) 6 marks
Define the motor unit and explain its role in grading muscular activity.
Expects: A motor unit is a motor neuron and the muscle fibres it innervates; a fine-movement motor unit (hand muscles, ocular muscles) has 3 to 6 fibres, while a gross-movement motor unit (back, leg muscles) has 100 to 200 fibres
Expects: Stimulus strength: a rise in strength raises the number of motor units recruited, gradually raising the force of contraction; a maximal stimulus activates all motor units, and a supramaximal stimulus produces no further response, per the all-or-none law
Expects: With minimal activity only a few motor units discharge; with rising effort, both the number of motor units recruited and the frequency of discharge rise; at moderate intensity the rate of discharge produces clonic contraction, and the motor units contract asynchronously, merging into smooth contraction
Concept: CON-MSK-C14F65CD68F720

## derived_from


## topic
Skeletal Muscle

## subtopic
Grading of contraction

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-C14F65CD68F720

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-PHY-GRADING-LENGTH-LOAD

## resource_ids


## learning_objective
Define a motor unit, contrast its size in a fine-movement muscle with a gross-movement muscle, and explain how recruitment grades force.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p4.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 6; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p4 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-8E203EDCED89

## title
Effect of stimulation frequency on muscular activity

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Explain the effect of a change in the frequency of muscle stimulation on muscular activity.

## format
structured_written

## written_parts
### (a) 6 marks
Explain the effect of a change in the frequency of muscle stimulation on muscular activity.
Expects: A rise in frequency releases more Ca2+ from the sarcoplasmic reticulum, raising the force of contraction
Expects: Low frequency gives separate twitches; medium frequency gives clonus (incomplete tetanus), a contraction with incomplete relaxation; high frequency gives tetanus, a continuous contraction with no relaxation, whose tension is about four times a separate twitch because of the raised Ca2+
Expects: Treppe (the staircase phenomenon) is a progressive rise in the magnitude of contraction to a plateau value during repetitive stimulation, caused by rising free Ca2+ release from the sarcoplasmic reticulum
Expects: The all-or-none law applies to a single skeletal muscle fibre: it contracts maximally or not at all, and a threshold stimulus already produces the maximal single-fibre contraction, provided experimental conditions stay the same
Concept: CON-MSK-C14F65CD68F720

## derived_from


## topic
Skeletal Muscle

## subtopic
Grading of contraction

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-C14F65CD68F720

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-PHY-GRADING-LENGTH-LOAD

## resource_ids


## learning_objective
Name the three grades of response to rising stimulation frequency (twitch, clonus, tetanus) and define Treppe.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p4.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 7; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p4 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-2AA52385D00D

## title
The length-tension relationship of skeletal muscle (Starling's law)

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
With the help of a diagram, describe the length-tension relationship of skeletal muscle (Starling's law).

## format
structured_written

## written_parts
### (a) 8 marks
With the help of a diagram, describe the length-tension relationship of skeletal muscle (Starling's law).
Expects: At minimal fibre length, active tension is zero; within limits, raising muscle length (stretch) raises the active tension developed during isometric contraction; a further rise in muscle length beyond the limit lowers the active tension
Expects: At a sarcomere length of 2.2 micrometres — the resting muscle length inside the body — there is optimal overlap between the thick and thin filaments, giving maximal force
Expects: At a sarcomere length greater than 2.2 micrometres the overlap between thick and thin filaments falls, lowering the force
Expects: At a sarcomere length less than 2.2 micrometres, the two ends of the actin filaments from opposite halves of the sarcomere overlap each other, again lowering the force
Concept: CON-MSK-01E9132FDDF9F2

## derived_from


## topic
Skeletal Muscle

## subtopic
Length-tension relationship

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-01E9132FDDF9F2

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.8

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids


## library_ids
ART-103-PHY-GRADING-LENGTH-LOAD

## resource_ids


## learning_objective
State the optimal sarcomere length for maximal active tension and explain, by filament overlap, why tension falls on either side of it.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p5.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 8; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p5 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-532EE3EF77A9

## title
The load-velocity relationship of skeletal muscle

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
With the help of a diagram, describe the load-velocity relationship of skeletal muscle.

## format
structured_written

## written_parts
### (a) 5 marks
With the help of a diagram, describe the load-velocity relationship of skeletal muscle.
Expects: Afterload is the load applied after the muscle starts to contract
Expects: A rise in afterload lowers the velocity of shortening and lowers the amount of shortening
Expects: Vmax is the maximal velocity of shortening, occurring only at zero external load
Concept: CON-MSK-B7A8FEB348BC9E

## derived_from


## topic
Skeletal Muscle

## subtopic
Load-velocity relationship

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-B7A8FEB348BC9E

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-PHY-GRADING-LENGTH-LOAD

## resource_ids


## learning_objective
Define afterload and Vmax, and state how a rise in afterload changes shortening velocity.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p5.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 9; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p5 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-B555898414DC

## title
Muscle fatigue

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe muscle fatigue: its effect on contraction and its causes.

## format
structured_written

## written_parts
### (a) 4 marks
Describe muscle fatigue: its effect on contraction and its causes.
Expects: Muscle fatigue lowers the strength of contraction, prolongs the duration of contraction, and leaves relaxation incomplete (contracture)
Expects: Causes: accumulation of lactic acid, falling blood flow and oxygen, and falling ATP, glycogen and acetylcholine
Concept: CON-MSK-2E4061334D52EA

## derived_from


## topic
Skeletal Muscle

## subtopic
Muscle fatigue

## difficulty
Moderate

## question_type
Pathophysiology

## main_concept
CON-MSK-2E4061334D52EA

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Factors Affecting Skeletal Muscle Contraction

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-PHY-FATIGUE-METABOLISM

## resource_ids


## learning_objective
State the three effects of muscle fatigue on contraction and give two metabolic causes.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p5.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 9 (continued); not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p5 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-FCB4FE284AE7

## title
Rigor mortis

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Define rigor mortis, give its cause, and state its medicolegal importance.

## format
structured_written

## written_parts
### (a) 4 marks
Define rigor mortis, give its cause, and state its medicolegal importance.
Expects: Definition: muscle rigidity (contracture) that occurs several hours after death
Expects: Cause: loss of the ATP needed for relaxation; the muscle remains in rigor until the muscle proteins are destroyed 15 to 25 hours later by bacterial putrefaction
Expects: Importance: medicolegal, in determining the time of death
Concept: CON-MSK-6087C9C091ED85

## derived_from


## topic
Skeletal Muscle

## subtopic
Rigor mortis

## difficulty
Moderate

## question_type
Pathophysiology

## main_concept
CON-MSK-6087C9C091ED85

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Rigor Mortis

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-PHY-INJURY-DEATH

## resource_ids


## learning_objective
State the cause of rigor mortis, when it resolves, and its medicolegal use.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p5.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 9 (continued); not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p5 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-E1500D0A09EE

## title
Mechanism of smooth muscle contraction (excitation-contraction coupling)

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the mechanism of smooth muscle contraction — excitation-contraction coupling.

## format
structured_written

## written_parts
### (a) 6 marks
Describe the mechanism of smooth muscle contraction — excitation-contraction coupling.
Expects: Ca2+ inflow is electrochemical, via voltage-gated Ca2+ channels (opened by depolarisation), ligand-gated Ca2+ channels (opened by hormones or neurotransmitters), or Ca2+-gated or IP3-gated Ca2+ channels on the sarcoplasmic reticulum
Expects: Ca2+ binds calmodulin, which activates myosin light-chain kinase (MLCK); MLCK phosphorylates the myosin head, which then interacts with actin, and the cross-bridges cycle
Expects: Relaxation is by removal of Ca2+, through slow-acting Ca2+ pumps into the extracellular fluid or into the sarcoplasmic reticulum — this slow pump is why smooth muscle contraction lasts longer than skeletal — plus inactivation of MLCK and removal of the myosin phosphate by phosphatase, which stops the cycle
Expects: Latch bridges are dephosphorylated cross-bridges that remain attached to actin, maintaining tone
Expects: Smooth muscle is fatigue-resistant: its contraction uses less ATP than skeletal muscle
Concept: CON-MSK-CF9EFE4EA3C90B

## derived_from


## topic
Smooth Muscle

## subtopic
Excitation-contraction coupling

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-CF9EFE4EA3C90B

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Smooth Muscles > Excitation-Contraction Coupling of smooth muscle

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.8

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids


## library_ids
ART-103-PHY-SMOOTH-COUPLING-PLASTICITY

## resource_ids


## learning_objective
Name the protein Ca2+ binds to trigger smooth muscle contraction, the kinase it activates, and what a latch bridge is.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p6.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 10; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p6 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-ABFD83C1B1E6

## title
Factors controlling contraction of smooth muscle

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Mention the factors controlling contraction of smooth muscle.

## format
structured_written

## written_parts
### (a) 6 marks
Mention the factors controlling contraction of smooth muscle.
Expects: Smooth muscle shows spontaneous contractions, rhythmic or tetanic, controlled by many factors
Expects: Stretch raises contraction: a hollow organ automatically contracts and evacuates when distended
Expects: Local factors: acids, raised CO2 and lowered oxygen relax it; alkalis and raised K+ contract it
Expects: Cold raises contraction
Expects: Humoral factors: binding of a ligand to excitatory receptors raises cytoplasmic Ca2+ and causes contraction; binding to inhibitory receptors lowers cytoplasmic Ca2+ and causes relaxation, mediated by activation of K+ channels (which inhibits Ca2+ influx) and by raised active transport of calcium
Expects: Nerve supply: a dual supply from the autonomic nervous system, which does not initiate activity but modifies it
Concept: CON-MSK-A22F7D478A747E | CON-MSK-D97EA196E6719C

## derived_from


## topic
Smooth Muscle

## subtopic
Factors controlling contraction

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-A22F7D478A747E | CON-MSK-D97EA196E6719C

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Smooth Muscles > Control of Contractions of Smooth Muscle

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-PHY-SMOOTH-MUSCLE-CONTROL

## resource_ids


## learning_objective
List the five groups of factors that modify smooth muscle contraction, and state whether the autonomic nerves initiate or only modify its activity.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p6.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 11; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p6 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-937346709C30

## title
Plasticity of smooth muscle

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the plasticity (length-to-tension relation) of smooth muscle and its benefit.

## format
structured_written

## written_parts
### (a) 4 marks
Describe the plasticity (length-to-tension relation) of smooth muscle and its benefit.
Expects: On sudden stretch, tension rises at first
Expects: On maintained stretch, tension gradually falls again, from readjustment of the position of the myosin cross-bridges on the thin filaments
Expects: Benefit: urine can accumulate in the urinary bladder without much rise in intravesical pressure
Concept: CON-MSK-18743CBD569602

## derived_from


## topic
Smooth Muscle

## subtopic
Plasticity

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-18743CBD569602

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Smooth Muscles > Relation of Length to Tension: Plasticity

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-PHY-SMOOTH-COUPLING-PLASTICITY

## resource_ids


## learning_objective
Describe what happens to smooth muscle tension on sudden versus maintained stretch, and give the clinical benefit.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p6.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (unlabelled, after question 11; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p6 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-FF01EA911BBC

## title
Comparing visceral (single-unit) and multi-unit smooth muscle

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Compare visceral (single-unit) smooth muscle and multi-unit smooth muscle.

## format
comparison_table

## written_parts
### (a) 6 marks
Compare visceral (single-unit) smooth muscle and multi-unit smooth muscle.
Expects: Visceral (single-unit) smooth muscle has gap junctions between cells, so action potentials spread easily from one fibre to another (a syncytium) and the whole muscle acts as one unit, obeying the all-or-none law; it is only superficially innervated, is spontaneously active and is controlled by hormones and chemicals, and is found in the walls of hollow viscera such as the gut, ureter and blood vessels
Expects: Multi-unit smooth muscle is made of individual units without gap junctions, so an action potential does not spread from one fibre to another; the muscle acts as separate units, each single fibre obeying the all-or-none law on its own, and it is densely innervated, under neural control, found in the ciliary muscle and iris of the eye, the vas deferens and the erector pili muscles
Concept: CON-MSK-62FCA91F4981B2

## derived_from


## topic
Smooth Muscle

## subtopic
Types of smooth muscle

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-MSK-62FCA91F4981B2

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Smooth Muscles > Electrical Activity of Smooth Muscle

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-PHY-SMOOTH-ELECTRICAL

## resource_ids


## learning_objective
State which type of smooth muscle has gap junctions and behaves as a syncytium, and give a site of each type.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p7.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (unlabelled, "Compare Types of smooth muscles?"; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p7 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-5930386DE16D

## title
Electrical activity and the role of calcium channels in the smooth muscle action potential

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the electrical activity of smooth muscle and the role of calcium channels in its action potential.

## format
structured_written

## written_parts
### (a) 6 marks
Describe the electrical activity of smooth muscle and the role of calcium channels in its action potential.
Expects: The resting membrane potential of smooth muscle is unstable, about -50 to -60 mV
Expects: Slow waves are not themselves action potentials and do not cause contraction; when a slow wave reaches about -35 mV it triggers an action potential
Expects: Spike potentials occur as in skeletal muscle, or on top of the slow waves, or rhythmically as pacemaker potentials, with a spike duration of about 50 msec; action potentials with a plateau depolarise as a spike does but repolarise only after a delay of hundreds of milliseconds, and the plateau prolongs the period of contraction
Expects: The cell membrane has more voltage-gated Ca2+ channels than voltage-gated Na+ channels, so Ca2+ inflow is mainly responsible for the action potential; the Ca2+ channels open more slowly than Na+ channels, which is why smooth muscle action potentials are slow
Concept: CON-MSK-A10AC6BAF27F00

## derived_from


## topic
Smooth Muscle

## subtopic
Electrical activity

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-A10AC6BAF27F00

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Smooth Muscles > Action potentials of smooth muscle occur in 2 different forms

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-PHY-SMOOTH-ELECTRICAL

## resource_ids


## learning_objective
State the two forms the smooth muscle action potential can take and explain, by channel type, why it rises more slowly than a nerve action potential.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p7.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (unlabelled, "Electrical Activity of Smooth Muscle"; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p7 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-02C0B55E2958

## title
The muscle proteins: myosin, actin, tropomyosin and troponin

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the structure of the muscle proteins myosin, actin, tropomyosin and troponin.

## format
structured_written

## written_parts
### (a) 6 marks
Describe the structure of the muscle proteins myosin, actin, tropomyosin and troponin.
Expects: Myosin is a helix with two arms and two globular heads (the cross-bridges); each head carries three binding sites, for actin, ATP and ATPase, and is flexible at two hinges — between the arm and the body, and between the head and the arm
Expects: Actin is a helix carrying an active site
Expects: Tropomyosin covers the active site on actin during rest
Expects: Troponin is a globular protein that attaches tropomyosin to actin, with three subunits: troponin I, which has affinity for actin; troponin T, which has affinity for tropomyosin; and troponin C, which has affinity for Ca2+
Concept: CON-MSK-287D88DF2F6B8C

## derived_from


## topic
Skeletal Muscle

## subtopic
Contractile proteins

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-287D88DF2F6B8C

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > The Muscle Proteins

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## resource_ids


## learning_objective
Name the three troponin subunits and state the binding partner each has affinity for.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p8.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (unlabelled, "The muscle proteins"; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p8 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-A76416C6AC5B

## title
Skeletal muscle: overview and functions

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
State how many skeletal muscles there are, what their contraction depends on, and their four functions.

## format
structured_written

## written_parts
### (a) 4 marks
State how many skeletal muscles there are, what their contraction depends on, and their four functions.
Expects: There are more than 400 voluntary skeletal muscles, and their contraction depends on nerve supply
Expects: Functions: locomotion and breathing; maintaining posture and stabilising joints; heat production; and helping venous drainage
Concept: CON-MSK-43CD79301071ED

## derived_from


## topic
Skeletal Muscle

## subtopic
Overview

## difficulty
Easy

## question_type
Mechanism

## main_concept
CON-MSK-43CD79301071ED

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Skeletal Muscles

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.5

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
5

## contextual_concept_ids


## library_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## resource_ids


## learning_objective
State the number of skeletal muscles in the body and list their four functions.

## media_recommendations


## source_citation
"physiology muscle final" (Kasr Al Ainy Physiology department revision set, Nerve and Muscle chapter), manifest src_a77e5bb70ba8a518d491, p8.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (unlabelled, closing summary; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p8 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-7A5CEC3E244E

## title
Resting membrane potential: definition and causes

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Define the resting membrane potential and discuss its causes.

## format
structured_written

## written_parts
### (a) 3 marks
Define the resting membrane potential and discuss its causes.
Expects: Definition: the potential difference between the inside (negative) and the outside of the membrane at rest — about -90 mV in large nerve and skeletal muscle fibres, and about -70 mV in medium-sized neurons
Expects: Recording: two electrodes, one inside and one outside the nerve fibre, connected to a voltmeter
Expects: Selective permeability of the membrane (the main factor): intracellular K+ exceeds extracellular K+; intracellular Na+ is less than extracellular Na+; each ion tries to reach its own equilibrium potential; the resting membrane is more permeable to K+ than Na+ (K+ outflow exceeds Na+ inflow) via non-gated channels; the membrane is impermeable to intracellular anions (protein); the net effect makes the inside negative to the outside, causing about -86 mV
Expects: The Na+-K+ pump: an electrogenic pump that moves 3 Na+ out for every 2 K+ in, against their concentration gradients, contributing a further -4 mV
Concept: CON-NEU-8319D639D05322

## derived_from


## topic
Nerve

## subtopic
Resting membrane potential

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-NEU-8319D639D05322

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Resting Membrane Potential (RMP): Polarized State

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.8

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids


## library_ids
ART-103-PHY-RMP-EQUATIONS

## resource_ids


## learning_objective
State the resting membrane potential of a large nerve fibre, and give the two mechanisms (selective permeability and the Na-K pump) that produce it and their approximate contributions.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p2.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 1; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p2 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-60108BE1DF36

## title
The Nernst and Goldman equations, and the relative contribution of ion fluxes and the Na-K pump to RMP

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Describe the role of the Nernst and Goldman equations in demonstrating the relative contribution of ion fluxes and the Na-K pump to the resting membrane potential.

## format
structured_written

## written_parts
### (a) 8 marks
Describe the role of the Nernst and Goldman equations in demonstrating the relative contribution of ion fluxes and the Na-K pump to the resting membrane potential.
Expects: The Nernst equation calculates the equilibrium potential of a single ion: E = ±61 x log(concentration inside / concentration outside)
Expects: If K+ alone diffused across the membrane, RMP would equal the K+ equilibrium potential, about -94 mV; if Na+ alone diffused, RMP would equal the Na+ equilibrium potential, about +61 mV
Expects: The Goldman equation calculates the RMP more accurately by involving the concentration and the relative permeability of every ion (Na+, K+, Cl-) together
Expects: The calculated RMP is about -86 mV, near to the K+ equilibrium potential, which is why a change in K+ concentration has marked effects on the resting potential
Expects: The Na+-K+ pump is only a minor, additional contributor to the resting potential beyond the selective-permeability component that the Nernst and Goldman equations describe
Concept: CON-NEU-8CC845C16CE133

## derived_from


## topic
Nerve

## subtopic
Nernst and Goldman equations

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-NEU-8CC845C16CE133

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Relative Contributions of Ion Fluxes & Na+-K+ Pump to RMP

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-PHY-RMP-EQUATIONS

## resource_ids


## learning_objective
State what the Nernst equation calculates for a single ion and why the Goldman equation gives a more accurate resting potential, and explain why RMP sits close to the K+ equilibrium potential.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p2.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 2; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p2 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-FA658E033730

## title
Definition and phases of the action potential

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Define the action potential and, with the help of a diagram, describe its different phases.

## format
structured_written

## written_parts
### (a) 9 marks
Define the action potential and, with the help of a diagram, describe its different phases.
Expects: Definition: a rapid change in potential following stimulation by a threshold stimulus; recording is as for the resting potential
Expects: Latent period: the isoelectric interval between application of the stimulus and the start of the action potential — the time taken for the impulse to travel from the stimulating to the recording electrode, whose duration depends on the distance between the two electrodes and the speed of conduction; velocity of conduction equals the distance between the two electrodes divided by the latent period
Expects: The action potential has three phases. Depolarisation (ascending limb): a slow phase from -90 to -65 mV (the firing level), then a rapid phase from -65 mV through zero to an overshoot of +35 mV; the amplitude of the action potential is 125 mV
Expects: Repolarisation (descending limb): a rapid phase covering the first 70%, then a slow phase covering the remaining 30%
Expects: Hyperpolarisation: the potential overshoots in the opposite direction, forming a slight, prolonged hyperpolarisation, before the resting potential is reached gradually; the spike lasts about 2 msec, the hyperpolarisation about 40 msec
Concept: CON-NEU-751C4921A154CC | CON-NEU-DD9033DCA3AAF1

## derived_from


## topic
Nerve

## subtopic
Action potential phases

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-NEU-751C4921A154CC

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Action Potential

## clinical_relevance
0.5

## academic_relevance
0.95

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.9

## question_only_for


## concept_ids
CON-NEU-DD9033DCA3AAF1

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
9

## contextual_concept_ids


## library_ids
ART-103-PHY-AP-SHAPE-CONDUCTION

## resource_ids


## learning_objective
Name the three phases of the nerve action potential with their voltage ranges, and state the amplitude of the action potential and the duration of the spike and the hyperpolarisation.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p3.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 3; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p3 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-5EA077668177

## title
The ionic basis of the action potential: voltage-gated sodium and potassium channels

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Describe the ionic basis of the action potential, and the voltage-gated sodium and potassium channels in nerve and their role in the action potential.

## format
structured_written

## written_parts
### (a) 9 marks
Describe the ionic basis of the action potential, and the voltage-gated sodium and potassium channels in nerve and their role in the action potential.
Expects: Depolarisation is caused by Na+ inflow; repolarisation is caused by K+ outflow
Expects: The voltage-gated Na+ channel has two gates — an outer activation gate and an inner inactivation gate — while the voltage-gated K+ channel has only one, inner, activation gate
Expects: With stimulation the gates move in sequence. Slow phase (-90 to -65 mV): the stimulus causes initial depolarisation, opening Na+ channels, so Na+ inflow causes further depolarisation, opening more gates until the firing level (-65 mV) is reached
Expects: Rapid phase (-65 to +35 mV): all Na+ channels open, causing a rush of Na+ in
Expects: Repolarisation is caused by inactivation of the Na+ channels and activation of the K+ channels, giving K+ outflow, and the Na+ channels then recover
Expects: Hyperpolarisation is caused by the slow closure of the K+ channels; the leakage K+ channel is a voltage-sensitive channel that drives K+ in only during hyperpolarisation; the Na+ and K+ gradients are then re-established after the action potential by the Na+-K+ pump; the action potential obeys the all-or-none rule, propagating with the same amplitude and shape once produced, regardless of stimulus strength at or above threshold
Concept: CON-NEU-7A30FECF042995 | CON-NEU-157E05FAF3B100

## derived_from


## topic
Nerve

## subtopic
Ionic basis of the action potential

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-NEU-7A30FECF042995 | CON-NEU-157E05FAF3B100

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Ionic basis of action potential

## clinical_relevance
0.5

## academic_relevance
0.95

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.9

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
9

## contextual_concept_ids


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
State the number of gates on the voltage-gated Na+ channel against the K+ channel, and explain how their sequential opening and closing produces depolarisation, repolarisation and hyperpolarisation.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p3.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 4; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p3 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-B976A4349F65

## title
Changes in excitability during nerve stimulation: the two refractory periods

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Describe the changes in excitability during nerve stimulation, including the two refractory periods.

## format
comparison_table

## written_parts
### (a) 8 marks
Describe the changes in excitability during nerve stimulation, including the two refractory periods.
Expects: From initial depolarisation to the firing level, excitability rises
Expects: The remainder of the action potential carries two refractory periods, which ensure the one-way, forward propagation of the action potential and protect the nerve from repetitive stimulation
Expects: The absolute refractory period: excitability is zero; the nerve cannot be stimulated whatever the stimulus strength; it runs from the firing level to early repolarisation; the Na+ channels are inactivated by closure of the inner gate
Expects: The relative refractory period: excitability is below normal; the nerve cannot be stimulated unless the stimulus exceeds threshold; it runs from the end of the absolute refractory period to the end of the action potential (rest); some Na+ channels have returned to the active state and the K+ channels are open
Concept: CON-NEU-2235199E9F4373 | CON-NEU-F119674A8DFD8D

## derived_from


## topic
Nerve

## subtopic
Refractory periods

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-NEU-2235199E9F4373 | CON-NEU-F119674A8DFD8D

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > There are two refractory periods

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.8

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
Compare the absolute and relative refractory periods by excitability, the stimulus each will accept, and the state of the Na+ and K+ channels.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p3.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 5; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p3 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-B574B3465865

## title
Factors affecting nerve excitability

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Explain the factors affecting nerve excitability: the role of Na+, K+ and the Na-K pump.

## format
structured_written

## written_parts
### (a) 8 marks
Explain the factors affecting nerve excitability: the role of Na+, K+ and the Na-K pump.
Expects: Role of Na+: raised Na+ permeability raises excitability (veratridine, lowered extracellular Ca2+); lowered Na+ permeability lowers excitability, i.e. stabilises the membrane (local anaesthetics such as cocaine, raised extracellular Ca2+); blockade of Na+ channels by tetrodotoxin abolishes the action potential; a fall in extracellular Na+ lowers the size of the action potential
Expects: Role of K+: raised extracellular K+ (hyperkalaemia) causes depolarisation and raises excitability; lowered extracellular K+ (hypokalaemia) causes hyperpolarisation and lowers excitability — familial periodic paralysis is hereditary hypokalaemia causing paralysis, treated by intravenous K+
Expects: Role of the Na+-K+ pump: only prolonged blockade affects the resting potential and the genesis of the action potential
Expects: The local response: as the membrane potential moves closer to the firing level, excitability rises, so a subthreshold stimulus can bring on an action potential
Concept: CON-NEU-77596C8A899A7E

## derived_from


## topic
Nerve

## subtopic
Factors affecting excitability

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-NEU-77596C8A899A7E

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Factors that affect the excitability of the nerve

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.8

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids


## library_ids
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids


## learning_objective
Predict which direction excitability moves when Na+ permeability, extracellular Ca2+ or extracellular K+ changes, and apply it to a local anaesthetic and to familial periodic paralysis.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p3.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 6; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p3 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-CF6F619E6531

## title
Propagation of the nerve impulse: unmyelinated against myelinated nerves

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Compare the propagation of the nerve impulse in unmyelinated and myelinated nerves.

## format
comparison_table

## written_parts
### (a) 8 marks
Compare the propagation of the nerve impulse in unmyelinated and myelinated nerves.
Expects: Conduction in an unmyelinated nerve (continuous, passive conduction): the action potential generated at one area acts as a stimulus for a new action potential on the adjacent area; during the reversal of polarity a potential difference forms between the stimulated, depolarised area and the adjacent resting area; positive charge flows passively to the negative area on both the outer and inner surfaces (a local circuit of current flow); the adjacent area depolarises to the firing level and produces an action potential
Expects: Conduction in a myelinated nerve (saltatory conduction, not continuous) is the same as unmyelinated conduction except that the cell membrane is exposed to extracellular fluid only at the node of Ranvier, which carries numerous voltage-gated Na+ channels; the action potential is generated only at the node and acts as a stimulus for a new action potential at the adjacent node, and positive charge jumps from the resting node to the stimulated one; a larger fibre diameter raises the internodal distance and so the speed of propagation
Expects: Importance of saltatory conduction: it raises the velocity of conduction, and it conserves energy, because only the nodes depolarise, so little energy is spent re-establishing the Na+ and K+ gradients by the Na+-K+ pump
Expects: Velocity of conduction rises with fibre diameter and with myelination
Concept: CON-NEU-76D490DA0BA0E6 | CON-NEU-A0C8307D2825A6

## derived_from


## topic
Nerve

## subtopic
Conduction of the impulse

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-NEU-76D490DA0BA0E6 | CON-NEU-A0C8307D2825A6

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Conduction [Propagation] of the Action Potential

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.8

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids


## library_ids
ART-103-PHY-AP-SHAPE-CONDUCTION
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids


## learning_objective
Contrast continuous conduction in an unmyelinated fibre with saltatory conduction in a myelinated fibre, and state the two benefits saltatory conduction gives.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p5.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 7; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p5 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-5085334F6C1C

## title
The local response: definition, cause, mechanism and characters, compared with the action potential

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Define the local response and discuss its cause, mechanism and characters, comparing it with the action potential.

## format
comparison_table

## written_parts
### (a) 5 marks
Define the local response and discuss its cause, mechanism and characters, comparing it with the action potential.
Expects: Definition: a local, partial depolarisation
Expects: Cause: a subthreshold stimulus
Expects: Mechanism: a few Na+ channels open, giving a slight depolarisation followed by rapid repolarisation
Expects: The local response differs from the action potential: it is not propagated, does not obey the all-or-none rule, and has no refractory period
Expects: It is graded (its magnitude is proportional to the strength of the stimulus), and it can be summated by rapid, repeated subthreshold stimuli to reach the firing level and generate an action potential
Expects: Excitability rises during the local response, as the membrane potential moves closer to the firing level
Concept: CON-NEU-7E784A50D2BBAF

## derived_from


## topic
Nerve

## subtopic
Local response

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-NEU-7E784A50D2BBAF

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Local excitatory state (Local Response)

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.8

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids


## learning_objective
List the four characters that distinguish the local response from the action potential (propagation, all-or-none, refractory period, grading).

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p5.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 8; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p5 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-D9C8D048B7C8

## title
The strength-duration curve and the factors affecting the effectiveness of a stimulus

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Draw the strength-duration curve and discuss the factors affecting the effectiveness of a stimulus.

## format
structured_written

## written_parts
### (a) 8 marks
Draw the strength-duration curve and discuss the factors affecting the effectiveness of a stimulus.
Expects: Definition: the inverse relationship between the strength of a stimulus and the duration needed to produce an active response
Expects: Strength (intensity): a threshold stimulus (rheobase) is the minimal intensity able to excite the nerve and produce an action potential; a subthreshold stimulus produces only a local response
Expects: Duration: the utilisation time is the time needed by a stimulus of rheobase strength to excite the nerve; the chronaxie is the time needed by a stimulus of double the rheobase strength to excite the nerve, and it is an index of nerve excitability
Expects: Within limits, the stronger the stimulus, the shorter the duration needed; a stimulus of extremely short duration produces no response, whatever its strength
Expects: Rate of rise of intensity: a rapidly rising stimulus intensity to threshold produces a response; a slowly rising stimulus produces no response — nerve accommodation
Concept: CON-NEU-BC5C6F99B13676

## derived_from


## topic
Nerve

## subtopic
Strength-duration curve

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-NEU-BC5C6F99B13676

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > The Strength-Duration Curve

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.8

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids


## library_ids
ART-103-PHY-NEURON-EXCITABILITY

## resource_ids


## learning_objective
Define rheobase, utilisation time and chronaxie, and state which is used as the index of nerve excitability.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p4.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 9; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p4 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-92CCB875FB14

## title
Accommodation of the nerve fibre

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Define accommodation of the nerve fibre and give its cause.

## format
structured_written

## written_parts
### (a) 3 marks
Define accommodation of the nerve fibre and give its cause.
Expects: Definition: a slow rise in the intensity of a subthreshold stimulus to threshold level produces no response
Expects: Cause: slow activation of the Na+ channels is balanced by inactivation of the Na+ channels and opening of the K+ channels
Concept: CON-NEU-FEC3C15273EB2F

## derived_from


## topic
Nerve

## subtopic
Accommodation

## difficulty
Moderate

## question_type
Pathophysiology

## main_concept
CON-NEU-FEC3C15273EB2F

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Accommodation of Nerve Fiber

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-PHY-NERVE-PROPERTIES

## resource_ids


## learning_objective
Define accommodation and explain, by channel behaviour, why a slowly rising stimulus fails to excite the nerve.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p5.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (unlabelled, "Accommodation of Nerve Fiber"; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p5 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-4091AB770FC0

## title
Monophasic against biphasic action potential

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Compare the monophasic and the biphasic action potential.

## format
comparison_table

## written_parts
### (a) 5 marks
Compare the monophasic and the biphasic action potential.
Expects: The monophasic action potential is recorded by inserting one electrode inside the fibre and the other outside; the biphasic action potential is recorded with both electrodes outside the fibre
Expects: At rest there is zero potential difference between the two electrodes in both methods
Expects: For the biphasic recording: when the impulse reaches the first electrode, that electrode becomes negative relative to the second, and a wave is recorded; when the impulse is between the two electrodes there is again zero potential difference; when the impulse reaches the second electrode, the first electrode becomes positive relative to the second, and a wave is recorded in the opposite direction; when the impulse leaves the second electrode there is no potential difference
Expects: A nerve can be made to give a monophasic recording with two outside electrodes by crushing or destroying the nerve between the two electrodes
Concept: CON-NEU-8E195C4C7D9BFF

## derived_from


## topic
Nerve

## subtopic
Monophasic and biphasic action potential

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-NEU-8E195C4C7D9BFF

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Monophasic and Biphasic Action Potential

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids


## learning_objective
State the electrode placement that gives a monophasic recording against a biphasic one, and describe why the biphasic wave has two deflections.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p6.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 10; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p6 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-44E61D6FC3E6

## title
The compound action potential of a nerve trunk

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Discuss the action potential recorded from a nerve trunk — the compound action potential.

## format
structured_written

## written_parts
### (a) 5 marks
Discuss the action potential recorded from a nerve trunk — the compound action potential.
Expects: Definition: an action potential recorded from nerve trunks or peripheral nerves, which are made of many nerve fibres
Expects: It has many peaks, because the fibres in the nerve vary in threshold, in distance from the stimulating electrodes, and in speed of conduction according to fibre thickness
Expects: It is graded: with a subthreshold stimulus, none of the fibres are stimulated and there is no response; with a threshold stimulus, only the low-threshold fibres respond, giving a small action potential; as the stimulus intensity further rises, the action potential rises in amplitude up to a maximum; a supramaximal stimulus produces no further rise in amplitude
Concept: CON-NEU-18D07BA4202CDA

## derived_from


## topic
Nerve

## subtopic
Compound action potential

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-NEU-18D07BA4202CDA

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Action Potential in Nerve Trunk "Compound Action Potential"

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids


## learning_objective
Explain why the compound action potential of a nerve trunk is multi-peaked and graded, rather than the single-peaked, all-or-none potential of one fibre.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p6.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (question 11; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p6 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-E58876FD36B9

## title
Types of nerve fibres, by myelination and by thickness/velocity

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Classify nerve fibres by myelination, and by thickness, velocity and sensitivity to environmental factors.

## format
comparison_table

## written_parts
### (a) 6 marks
Classify nerve fibres by myelination, and by thickness, velocity and sensitivity to environmental factors.
Expects: By myelination: a myelinated (thick) nerve has its axon surrounded by a myelin sheath (Schwann cells), with myelin acting as an insulator and the nodes of Ranvier as non-insulated areas; an unmyelinated (thin) nerve has its axon surrounded by Schwann cells without myelin formation
Expects: By thickness, velocity and sensitivity: type A fibres (alpha, beta, gamma, delta) have a diameter of about 20 microns, a velocity of 120 m/sec, a spike duration of 0.5 msec, are exemplified by somatic motor fibres, and are blocked by pressure
Expects: Type B fibres have a diameter of about 5 microns, a velocity of 5 m/sec, a spike duration of 1 msec, are exemplified by preganglionic autonomic fibres, and are blocked by hypoxia
Expects: Type C fibres have a diameter under 1 micron, a velocity of 0.5 m/sec, a spike duration of 2 msec, are exemplified by postganglionic autonomic fibres, and are blocked by anaesthesia
Concept: CON-NEU-3F92C1DEAFFF01 | CON-NEU-5664D7AB68AD8D

## derived_from


## topic
Nerve

## subtopic
Nerve fibre classification

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-NEU-3F92C1DEAFFF01

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Nerve fiber types are classified into 3 types according to their thickness and velocity of conduction

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids
CON-NEU-5664D7AB68AD8D

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-PHY-NERVE-PROPERTIES
ART-103-PHY-NERVE-FIBRE-AND-CONDUCTION

## resource_ids


## learning_objective
Give the diameter, velocity and typical example of type A, B and C nerve fibres, and state what blocks each preferentially.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p7.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (unlabelled, "Types of nerve fibers"; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p7 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-04D5F3AE8ADE

## title
Orthodromic and antidromic conduction

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Describe orthodromic and antidromic conduction.

## format
structured_written

## written_parts
### (a) 4 marks
Describe orthodromic and antidromic conduction.
Expects: When an action potential is initiated in the middle of an axon, it travels in both directions
Expects: In a living animal, conduction normally travels in one direction only — from the synapse, along the axon, to its termination — which is orthodromic conduction
Expects: Conduction in the opposite direction is antidromic conduction
Expects: The synapse, unlike the axon, permits conduction in one direction only, so any antidromic impulse fails to pass the first synapse and dies out at that point
Concept: CON-NEU-788EA161C3F6FD

## derived_from


## topic
Nerve

## subtopic
Orthodromic and antidromic conduction

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-NEU-788EA161C3F6FD

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Orthodromic and Antidromic Conduction

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-PHY-AP-SHAPE-CONDUCTION

## resource_ids


## learning_objective
Define orthodromic and antidromic conduction, and explain why an antidromic impulse cannot cross the first synapse it meets.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p7.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (unlabelled, "Orthodromic and antidromic conduction"; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p7 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-CC6D8B85A960

## title
Neurotrophins

## subject
neuro

## status
Draft

## owner
Claude

## vignette


## question
Define neurotrophins and state their source, route and function.

## format
structured_written

## written_parts
### (a) 3 marks
Define neurotrophins and state their source, route and function.
Expects: Neurotrophins are certain proteins secreted by glial cells
Expects: They are internalised and transported (retrogradely) to the neuronal cell body
Expects: Function: they support neuronal development and growth
Concept: CON-NEU-47AD27F1B2D234

## derived_from


## topic
Nerve

## subtopic
Neurotrophins

## difficulty
Easy

## question_type
Mechanism

## main_concept
CON-NEU-47AD27F1B2D234

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Neurotrophins

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.4

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
4

## contextual_concept_ids


## library_ids
ART-103-PHY-NERVE-PROPERTIES

## resource_ids


## learning_objective
State what secretes neurotrophins, how they reach the neuronal cell body, and what they support.

## media_recommendations


## source_citation
"Physiology of the Nerve" by Dr. MHR (Kasr Al Ainy Physiology department revision set), manifest src_ff96361efb03c2396c4c, p6.

## attachments


## attached_image


## author_notes
From the department's own Physiology revision set (unlabelled, closing definitions; not a sitting — no printed date or batch code, a student-compiled bank in the exam's own question design). The model answer on p6 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-75F5C30DA212

## title
Isometric against isotonic contraction

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
List the two types of skeletal muscle contraction and compare them.

## format
comparison_table

## written_parts
### (a) 5 marks
List the two types of skeletal muscle contraction and compare them.
Expects: Isometric contraction: a too-heavy load is attached at the muscle's lower end; length is constant (no shortening), though the sarcomeres shorten slightly (less sliding) while the elastic elements stretch; tension rises to maximum; duration is shorter
Expects: Isotonic contraction: a smaller load is attached to the muscle; length falls (shortening), with more sliding; tension stays constant; duration is longer
Expects: Isometric contraction does no external work, since the load is not moved, so its mechanical efficiency (percentage of energy input converted to work) is zero, and it uses less energy; isometric contraction maintains posture against gravity and tenses part of the body
Expects: Isotonic contraction does external work, since the load is moved a distance, with a mechanical efficiency of about 25%, and uses more energy as the load moves; isotonic contraction moves part or the whole of the body, or moves a smaller load
Concept: CON-MSK-8CD0C1C03D5333 | CON-MSK-87D5C5A48AB5D9

## derived_from


## topic
Skeletal Muscle

## subtopic
Isometric and isotonic contraction

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-MSK-8CD0C1C03D5333

## module
103 BMS

## module_subject
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Basic differences between isometric and isotonic contractions

## clinical_relevance
0.35

## academic_relevance
0.6

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.4

## question_only_for


## concept_ids
CON-MSK-87D5C5A48AB5D9

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
4

## contextual_concept_ids


## library_ids
ART-103-PHY-CONTRACTION-TYPES

## resource_ids


## learning_objective
Compare isometric and isotonic contraction by whether length or tension is held constant, and by mechanical efficiency.

## media_recommendations


## source_citation
"Nerve & Muscle Qs" solved/unsolved twin (Kasr Al Ainy Physiology department revision set, dedicated to Dr. Amr El Abd — an undated student practice bank in the exam's own design, not a sitting), manifest src_54494af664079a117412 (solved) and src_b162ed799281e5558abe (unsolved), p25.

## attachments


## attached_image


## author_notes
From an undated Physiology department practice bank ("Nerve & Muscle Qs", solved and unsolved twin, dedicated to Dr. Amr El Abd — sourceCategory reads "EOY" in the manifest but the file itself carries no printed date or batch code and states on its own cover that it is student-made "ideas of questions in the same design as the exam", not a sitting; the sitting-year rule (batchCode + 1827 / printed date) has nothing to apply to). Both copies were opened and read visually with the Read tool, since the text layer of the solved copy carries only the printed question, not the handwritten/overlaid model answer. Almost every one of the pair's 24 questions duplicates a topic already authored from "physiology muscle final" or "Physiology of the Nerve" (RMP, AP phases and ionic basis, refractory periods, myelinated/unmyelinated conduction, local response, NMT mechanism and properties, EC coupling, length-tension, load-velocity, smooth muscle mechanism and factors) — those are not re-authored a third time from a third paper of the same student's revision set. This isometric-versus-isotonic comparison is the one topic the pair carries that neither of the other two files does; exam_relevance is lowered because "Types of Skeletal Muscle Contraction" is on the department's own 2025-2026 exclusion list (per the MCQ-nerve-muscle batch header), the same convention that batch used for its own excluded items.

## estimated_seconds
240

## randomise_answers
no
