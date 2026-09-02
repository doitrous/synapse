<!--
  ASU-LOCO Physiology MCQs -- second pass on excitation-contraction coupling, the
  sarcomere's structural bands, contractile-protein roles and ATP's dual role (13 items,
  printed questions 5, 7, 9, 10, 12, 14, 15, 16, 17, 18, 19, 20, 22). Every stem, option
  and correct answer letter is verbatim from the native-text ASU Locomotor Physiology MCQ
  paper ("MCQs - Locomotor Physiology Questions.pdf", manifest src_3be9856ba9380e79cb01),
  extracted with pdftotext -layout and cross-checked against the printed answer key on PDF
  pages 22-23. Printed question numbers are kept in ## derived_from and ## source_citation.
  Import: Admin > Bulk import > question. status: Draft throughout; these need a faculty
  reviewer.

  This is the fourth authoring pass on this paper: 37 questions were authored in three
  earlier files (see ASU-LOCO-msk-physiology-{ecc-sarcomere,electrical-contraction-types,
  grading-fibertypes-fatigue}-mcq.md); this file plus its three siblings (see PROGRESS.md
  on branch asu-loco-author3) complete the remaining 53, covering every printed question
  1-90 across the four files. Concept ids are the same 20 pending-live-overlay concepts the
  first three files used -- no new concept was minted for this pass.

  Validate with:
    npm run medical:batch -- <this file> \
      --with docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md \
      --with docs/Ain-Shams-Source-Imports/pending-live/ASU-LOCO-msk-physiology.md \
      --with docs/Ain-Shams-Source-Imports/concept/ASU-LOCO-msk-new-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-physiology.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-vitamins-nerve.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-histology.md \
      --with docs/Ain-Shams-Source-Imports/pending-live/ASU-LOCO-msk-articles.md \
      --with docs/Ain-Shams-Source-Imports/article/ASU-LOCO-msk-new-articles.md \
      --with docs/Ain-Shams-Source-Imports/resource/ASU-LOCO-msk-inf-resources.md
-->

# Item

## id
QM-ASULOCO-1FF569E59BD4

## title
Which statement about the muscle is correct?

## question
Which is correct regarding the muscle:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student lists five statements about calcium handling and the membrane systems of skeletal muscle and must pick the one that is actually true.

## format
single best answer

## derived_from
Printed question 5 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
T-tubules store Ca++.

## explanation_a
Incorrect. T-tubules are invaginations of the sarcolemma continuous with the extracellular fluid; they conduct the action potential into the fibre's depth but do not themselves store calcium. Calcium is stored in the terminal cisternae of the sarcoplasmic reticulum, the membrane immediately adjacent to (not part of) the T-tubule.

## answer_b
Troponin T binds with Ca++.

## explanation_b
Incorrect. Calcium binds troponin C, not troponin T; troponin T's job is structural -- anchoring the whole troponin complex to tropomyosin -- so this swaps the calcium-binding subunit for the anchoring one.

## answer_c
Tropomyosin covers the active sites of actin.

## explanation_c
Correct. At rest, tropomyosin lies in the groove of the actin helix and physically blocks the myosin-binding sites along actin, which is why it is called the relaxing protein. Calcium binding troponin C pulls the troponin-tropomyosin complex aside, uncovering those sites so a cross-bridge can form. This covering-and-uncovering step is the actual "switch" that turns contraction on and off once an action potential has already released calcium.

## answer_d
Sarcoplasmic reticulum transmits action potential to the inside of muscle fiber.

## explanation_d
Incorrect. It is the T-tubule system that carries the action potential inward from the sarcolemma; the sarcoplasmic reticulum's role is to release calcium in response to that signal, not to conduct the electrical impulse itself.

## answer_e
Thick filament is composed of actin molecules.

## explanation_e
Incorrect. The thick filament is composed of myosin; actin is the thin filament's main protein. This reverses which filament belongs to which category.

## topic
Physiology

## subtopic
Contractile proteins

## main_concept
CON-MSK-287D88DF2F6B8C

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Recall/discrimination

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that tropomyosin acts as the relaxing protein by covering actin's myosin-binding sites at rest, and distinguish this from the roles of troponin C, troponin T and the T-tubule/sarcoplasmic-reticulum system.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 5; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: C.

---

# Item

## id
QM-ASULOCO-0D9FCCCEDB8D

## title
Which statement about skeletal muscle contraction is correct?

## question
Concerning the skeletal muscles:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked to identify the one true statement among five that each misstate a detail of sarcomere shortening, calcium entry or the energy requirement of contraction and relaxation.

## format
single best answer

## derived_from
Printed question 7 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
E

## answer_a
Distance between two Z lines remains constant during contraction

## explanation_a
Incorrect. The distance between two Z lines is the sarcomere length, and it decreases during contraction as the Z lines are pulled closer together by cross-bridge cycling -- it does not stay constant.

## answer_b
Length of the (A) band is decreased during contraction

## explanation_b
Incorrect. The A band's length is fixed by the length of the myosin filament and does not change during contraction; it is the I band and H zone that shorten as the thin filaments slide further in.

## answer_c
Myosin filaments move along actin filaments.

## explanation_c
Incorrect. It is the actin (thin) filaments that slide along the stationary myosin (thick) filaments, pulled by the cycling cross-bridges -- the direction is reversed here.

## answer_d
T-tubules open to allow entry of Ca++ from ECF.

## explanation_d
Incorrect. Skeletal muscle's contraction-triggering calcium is released from the sarcoplasmic reticulum's internal store, not admitted through the T-tubules from extracellular fluid; obligatory extracellular calcium entry through a channel is instead the hallmark of cardiac muscle's calcium-induced calcium release.

## answer_e
ATP is needed for both contraction and relaxation processes.

## explanation_e
Correct. ATP hydrolysis on the myosin head energises the power stroke and is what allows the head to detach from actin at the end of each cross-bridge cycle -- both contraction steps. Relaxation is equally ATP-dependent: the SERCA calcium pump actively transports calcium back into the sarcoplasmic reticulum using ATP, which is why a dead muscle deprived of ATP can do neither -- it stays locked in rigor rather than relaxing. Holding both uses of ATP in mind at once is the point of this question, because a student who only remembers the power-stroke role tends to assume relaxation is a passive process that needs no energy at all.

## topic
Physiology

## subtopic
Cross-bridge cycling

## main_concept
CON-MSK-AC42FE7AB41DF2

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Discrimination

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
9

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that ATP is required for both the contraction (power stroke, cross-bridge detachment) and relaxation (active calcium reuptake) phases of skeletal muscle activity.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 7; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
55

## randomise_answers
yes

## author_notes
Printed answer key: E.

---

# Item

## id
QM-ASULOCO-DABF84C410EF

## title
Which of these does NOT occur during skeletal muscle contraction?

## question
Which of the following does NOT occur during skeletal muscle contraction?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student lists five events said to happen during a contraction cycle and must find the one that misdescribes where calcium actually binds.

## format
single best answer

## derived_from
Printed question 9 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
The sarcomere shorten and H zones disappear.

## explanation_a
This genuinely occurs, so it is not the answer sought -- as thin filaments slide further into the A band, the H zone (the myosin-only central region) narrows and can disappear at full shortening.

## answer_b
Calcium binds to myosin heads.

## explanation_b
Correct -- this does NOT occur. Calcium binds troponin C on the thin filament, not the myosin head; the myosin head instead carries the ATP-binding/ATPase site. Confusing calcium's binding target with ATP's binding target is the specific trap here, and it is worth fixing firmly because the same confusion, left uncorrected, makes several later questions about the sequence of excitation-contraction coupling harder than they need to be.

## answer_c
ATP is hydrolyzed

## explanation_c
This genuinely occurs, so it is not the answer sought -- ATP hydrolysis on the myosin head energises the power stroke of each cross-bridge cycle.

## answer_d
Myosin heads bind to actin.

## explanation_d
This genuinely occurs, so it is not the answer sought -- once tropomyosin has moved aside, the energised myosin head attaches to an exposed site on actin, forming the cross-bridge.

## answer_e
Calcium concentration in the sarcoplasm increases.

## explanation_e
This genuinely occurs, so it is not the answer sought -- calcium released from the terminal cisternae raises sarcoplasmic calcium concentration roughly tenfold, which is what allows it to reach and bind troponin C.

## topic
Physiology

## subtopic
Excitation-contraction coupling

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Discrimination

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
56

## exam_relevance
9

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that calcium binds troponin C, not the myosin head, during excitation-contraction coupling.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 9; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: B.

---

# Item

## id
QM-ASULOCO-793C42889FA5

## title
What structures make up a triad in a skeletal muscle fibre?

## question
Which of the following best describes the composition of the structure known as a triad in a skeletal muscle fiber?

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked to name the three membrane structures that together form a single triad, having just learned that skeletal muscle has two triads per sarcomere.

## format
single best answer

## derived_from
Printed question 10 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
A band, I band, and H band

## explanation_a
Incorrect. These are the light-microscopic bands of the sarcomere itself, not the membrane components of a triad; naming bands answers a different question about striation pattern.

## answer_b
Sarcolemma, sarcoplasm, and sarcoplasmic reticulum

## explanation_b
Incorrect. These are general compartments of the whole muscle fibre -- its outer membrane, its cytoplasm, and its calcium-storing organelle -- not the specific trio of membranes that make up one triad.

## answer_c
Terminal cisterna, transverse tubule, and terminal cistern

## explanation_c
Correct. A triad is one transverse (T-) tubule flanked on either side by a terminal cisterna of the sarcoplasmic reticulum -- two terminal cisternae bracketing one T-tubule, giving the three-part structure its name. This is the physical arrangement that lets the T-tubule's dihydropyridine receptor communicate directly with the ryanodine receptors on both adjacent cisternae. Skeletal muscle has two triads per sarcomere, one at each A-I junction, which is why depolarisation reaches every sarcomere's calcium store almost simultaneously rather than diffusing in from the fibre's surface.

## answer_d
Actin, troponin, and tropomyosin

## explanation_d
Incorrect. These are thin-filament regulatory proteins, part of the contractile apparatus itself, not the membrane systems that make up a triad.

## answer_e
ATP, CP, and glycogen

## explanation_e
Incorrect. These are the muscle's energy stores, unrelated to the membrane structure being asked about here.

## topic
Physiology

## subtopic
Excitation-contraction coupling

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids


## contextual_concept_ids


## difficulty
Hard

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
48

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Name the triad as one T-tubule flanked by two terminal cisternae of the sarcoplasmic reticulum.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 10; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: C. Printed option C reads "Terminal cisterna, transverse tubule, and terminal cistern" -- transcribed verbatim; the intended pairing is two terminal cisternae bracketing one T-tubule.

---

# Item

## id
QM-ASULOCO-0C205E64DF07

## title
What is the functional unit of contraction in a skeletal muscle fibre?

## question
The functional unit of contraction in a skeletal muscle fiber is the:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A first-year student is asked to name the single smallest structure that can, on its own, shorten and generate tension.

## format
single best answer

## derived_from
Printed question 12 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
E

## answer_a
Sarcolemma

## explanation_a
Incorrect. The sarcolemma is the fibre's plasma membrane; it encloses the contractile machinery but does not itself contract.

## answer_b
Myofilament

## explanation_b
Incorrect. A myofilament (an individual actin or myosin strand) is a building block within the sarcomere, one level too small to be called the functional contractile unit on its own.

## answer_c
Sarcoplasmic reticulum

## explanation_c
Incorrect. The sarcoplasmic reticulum stores and releases calcium; it is not itself a contractile structure.

## answer_d
Myofibril

## explanation_d
Incorrect. A myofibril is a long strand made of many sarcomeres joined end to end; it is one level too large to be "the" functional unit, which is the single repeating segment within it.

## answer_e
Sarcomere

## explanation_e
Correct. The sarcomere, the segment between two adjacent Z lines, is the smallest structure that contains a complete set of interdigitating thick and thin filaments and can shorten on its own -- which is why it is defined as the functional contractile unit of striated muscle. A myofibril is simply many sarcomeres joined end to end in series, so the whole fibre's shortening is the sum of every one of its sarcomeres shortening together.

## topic
Physiology

## subtopic
Sarcomere structure

## main_concept
CON-MSK-0824FE988ADA00

## concept_ids


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
30

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Identify the sarcomere as the functional contractile unit of skeletal muscle, distinct from the myofilament and the myofibril.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 12; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
30

## randomise_answers
yes

## author_notes
Printed answer key: E.

---

# Item

## id
QM-ASULOCO-994D898F75FD

## title
Which area of the sarcomere remains constant in length during contraction?

## question
Which area remains constant during the skeletal muscle contraction:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares four sarcomere landmarks and a membrane protein and must pick the one whose length never changes as the muscle shortens.

## format
single best answer

## derived_from
Printed question 14 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
A

## answer_a
A bands

## explanation_a
Correct. The A band's length equals the length of the myosin (thick) filament, which does not shorten or change during contraction -- only the amount of overlap with the sliding actin filaments changes, not the myosin filament's own length. This is exactly why the A band is the reference landmark used to show that filaments slide rather than shorten: if myosin itself changed length, the sliding-filament model would be wrong.

## answer_b
T- tubules

## explanation_b
Incorrect as an answer to this question. T-tubules are not a sarcomere band whose length is being compared here; they are membrane invaginations, a different category of structure from the A/I/H landmarks the question is testing.

## answer_c
H zone

## explanation_c
Incorrect. The H zone narrows as the thin filaments slide further into the A band during contraction, so its length decreases rather than staying constant.

## answer_d
Z line

## explanation_d
Incorrect. Although the Z line itself is a thin structural disc, the distance BETWEEN two Z lines (the sarcomere length) decreases during contraction, which is the property being tested by contrasting it with the constant A band.

## answer_e
DHP

## explanation_e
Incorrect as an answer to this question. DHP (dihydropyridine receptor) is a T-tubule membrane protein, not a sarcomere band with a length to compare.

## topic
Physiology

## subtopic
Sarcomere structure

## main_concept
CON-MSK-0824FE988ADA00

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Discrimination

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that the A band's length is fixed by the myosin filament and does not change during contraction, unlike the H zone or the Z-line-to-Z-line sarcomere length.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 14; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: A.

---

# Item

## id
QM-ASULOCO-2916F5742887

## title
Which sarcomere region contains only myosin filaments?

## question
Which area contains only myosin filament:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student examining an electron micrograph is asked to name the one region where thin filaments are entirely absent, leaving only thick filaments visible.

## format
single best answer

## derived_from
Printed question 15 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
A bands

## explanation_a
Incorrect. The A band contains myosin throughout its length, but also contains the overlapping ends of the actin filaments at its periphery, so it is not "myosin only."

## answer_b
I bands

## explanation_b
Incorrect. The I band contains only actin (thin filament); this is the opposite of what the question asks.

## answer_c
H zone

## explanation_c
Correct. The H zone is the central portion of the A band that the thin filaments do not reach at resting length, so only myosin filaments (and the M line that cross-links them) occupy it. As the sarcomere shortens and the thin filaments slide further toward the centre, the H zone narrows and can disappear entirely at full contraction, which makes it a useful landmark for judging how far a sarcomere has shortened on a micrograph.

## answer_d
M line

## explanation_d
Incorrect as the answer sought. The M line is a fine protein line within the H zone that cross-links adjacent myosin filaments; it is a structure inside the myosin-only region rather than being "the area" itself, so the broader H zone is the better answer.

## answer_e
Sarcomere

## explanation_e
Incorrect. The sarcomere as a whole contains both actin and myosin overlapping through most of its length; it is not a myosin-only region.

## topic
Physiology

## subtopic
Sarcomere structure

## main_concept
CON-MSK-0824FE988ADA00

## concept_ids


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
35

## exam_relevance
9

## clinical_relevance
0.1

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Identify the H zone as the myosin-only region of the sarcomere, distinct from the M line within it.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 15; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
30

## randomise_answers
yes

## author_notes
Printed answer key: C.

---

# Item

## id
QM-ASULOCO-29A7D3D6629E

## title
What does the I band contain?

## question
"I ": band contains:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student labelling a sarcomere diagram must state what fills the pale I band on either side of the Z line.

## format
single best answer

## derived_from
Printed question 16 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
Myosin filaments

## explanation_a
Incorrect. Myosin is entirely absent from the I band, which is exactly why the band appears pale under the light microscope -- there is no thick-filament overlap here.

## answer_b
Actin filaments

## explanation_b
Correct. The I band lies on either side of the Z line and contains only the thin (actin) filaments, with no myosin overlap, which gives it its light appearance. During contraction the I band narrows as the actin filaments are pulled further into the A band, which is the mirror image of what happens to the H zone at the sarcomere's centre.

## answer_c
Interdigitating actin and myosin

## explanation_c
Incorrect. Overlapping actin and myosin describes the A band, not the I band; the I band is defined precisely by the absence of that overlap.

## answer_d
H zone

## explanation_d
Incorrect. The H zone is a sub-region of the A band, on the opposite side of the sarcomere's structure from the I band; the two are not the same region.

## answer_e
Sarcoplasmic reticulum

## explanation_e
Incorrect. The sarcoplasmic reticulum is a membrane system surrounding the myofibril, not a filament content of the I band.

## topic
Physiology

## subtopic
Sarcomere structure

## main_concept
CON-MSK-0824FE988ADA00

## concept_ids


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
32

## exam_relevance
9

## clinical_relevance
0.1

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Identify the I band as the region containing only actin filaments, on either side of the Z line.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 16; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
25

## randomise_answers
yes

## author_notes
Printed answer key: B.

---

# Item

## id
QM-ASULOCO-AA3B1FC374E5

## title
Where is the calcium needed for contraction derived from?

## question
Ca++ needed to contract is derived from:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student is asked to name the immediate source of the calcium that floods the sarcoplasm at the start of a twitch.

## format
single best answer

## derived_from
Printed question 17 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
C

## answer_a
Sarcomere

## explanation_a
Incorrect. The sarcomere is the structural contractile unit; it is not a calcium reservoir.

## answer_b
Sarcoplasm

## explanation_b
Incorrect. Resting sarcoplasmic calcium concentration is low; the sarcoplasm is where calcium ends up after release, not where it is drawn from.

## answer_c
Sarcoplasmic reticulum

## explanation_c
Correct. The terminal cisternae of the sarcoplasmic reticulum store calcium at rest and release it through ryanodine receptor channels when the adjacent T-tubule's dihydropyridine receptor is activated by depolarisation. Once contraction ends, the same calcium is actively pumped back into the sarcoplasmic reticulum by SERCA, so the store is reused twitch after twitch rather than being replenished from outside the cell each time.

## answer_d
Endoplasmic reticulum

## explanation_d
Incorrect. Endoplasmic reticulum is the generic name used in non-muscle cells; the specialised, calcium-storing version in skeletal muscle is specifically called the sarcoplasmic reticulum, and this is the term the question is testing.

## answer_e
T-tubules

## explanation_e
Incorrect. T-tubules conduct the action potential inward and carry extracellular fluid, but they do not store or release the calcium that triggers contraction.

## topic
Physiology

## subtopic
Excitation-contraction coupling

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids


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
40

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that the sarcoplasmic reticulum, not the sarcoplasm, T-tubules or a generic endoplasmic reticulum, is the calcium source for skeletal muscle contraction.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 17; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
35

## randomise_answers
yes

## author_notes
Printed answer key: C.

---

# Item

## id
QM-ASULOCO-AFD5077AEA8B

## title
What removes the inhibitory effect of the troponin-tropomyosin complex on actin?

## question
The inhibitory effect of troponin tropomyosin complex on actin is inhibited by:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student must name the single ion whose binding switches the troponin-tropomyosin complex from blocking to permitting actin-myosin interaction.

## format
single best answer

## derived_from
Printed question 18 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
Na+ ions

## explanation_a
Incorrect. Sodium influx depolarises the sarcolemma and initiates the action potential, but sodium does not itself act on the troponin-tropomyosin complex.

## answer_b
Ca++ ions

## explanation_b
Correct. Calcium released from the sarcoplasmic reticulum binds troponin C, producing a conformational change that pulls tropomyosin away from actin's myosin-binding sites -- this is the step that lifts the inhibition and permits cross-bridge formation. When calcium is later pumped back into the sarcoplasmic reticulum and its concentration falls, troponin releases it, tropomyosin swings back over the site, and the inhibition is restored, which is what ends the contraction.

## answer_c
K+ ions

## explanation_c
Incorrect. Potassium efflux drives repolarisation of the membrane; it plays no role in uncovering actin's binding site.

## answer_d
Mg++ ions

## explanation_d
Incorrect. Magnesium is a required cofactor for the myosin ATPase reaction, not the signal that removes tropomyosin's block on actin.

## answer_e
Action potential

## explanation_e
Incorrect. The action potential is the electrical trigger that leads, via the T-tubule and ryanodine receptor, to calcium release -- but it is the calcium itself, not the electrical event directly, that acts on troponin.

## topic
Physiology

## subtopic
Contractile proteins

## main_concept
CON-MSK-287D88DF2F6B8C

## concept_ids
CON-MSK-3013AA61E917B7

## contextual_concept_ids


## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that calcium binding troponin C removes tropomyosin's inhibition of actin, and distinguish this from the upstream electrical trigger.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 18; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Printed answer key: B.

---

# Item

## id
QM-ASULOCO-DB32499206C0

## title
Which characteristic belongs to the myosin protein?

## question
Myosin protein is characterized by:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student compares five statements about myosin, several of which actually describe troponin, tropomyosin or the actin filament instead.

## format
single best answer

## derived_from
Printed question 19 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
E

## answer_a
It can bind calcium.

## explanation_a
Incorrect. Calcium binds troponin C on the thin filament, not myosin.

## answer_b
It is present in the periphery of the sarcomere.

## explanation_b
Incorrect. Myosin occupies the central A band of the sarcomere; it is actin, in the peripheral I band, that sits toward the periphery.

## answer_c
It is attached to the Z line.

## explanation_c
Incorrect. Actin filaments are anchored to the Z line; myosin filaments are held in the centre of the sarcomere by the M line, not attached to the Z line.

## answer_d
It is a relaxation protein that covers actin during rest.

## explanation_d
Incorrect. This describes tropomyosin's role, not myosin's -- myosin is the motor protein being blocked, not the blocker.

## answer_e
Its head has ATPase activity to hydrolyze ATP.

## explanation_e
Correct. The globular head of the myosin molecule carries both the actin-binding site and an intrinsic ATPase, which hydrolyses ATP to energise the power stroke of the cross-bridge cycle. The same head also releases from actin once a fresh ATP molecule binds it, so the one ATPase site is doing the work behind both the power stroke and the subsequent detachment.

## topic
Physiology

## subtopic
Contractile proteins

## main_concept
CON-MSK-287D88DF2F6B8C

## concept_ids


## contextual_concept_ids


## difficulty
Moderate

## question_type
Discrimination

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
52

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
State that the myosin head carries ATPase activity, and distinguish myosin's role and location from those of actin, troponin and tropomyosin.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 19; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
50

## randomise_answers
yes

## author_notes
Printed answer key: E.

---

# Item

## id
QM-ASULOCO-B35C32717572

## title
Which protein covers actin's active site at rest?

## question
Which of the following proteins covers the actin active site:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student must pick, out of the three troponin subunits, tropomyosin and the ryanodine receptor, the one protein that physically sits over actin's myosin-binding site at rest.

## format
single best answer

## derived_from
Printed question 20 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
D

## answer_a
Troponin C.

## explanation_a
Incorrect. Troponin C is the calcium-binding subunit; it does not itself cover actin's active site.

## answer_b
Troponin T.

## explanation_b
Incorrect. Troponin T anchors the troponin complex to tropomyosin but does not directly cover the active site itself.

## answer_c
Myosin.

## explanation_c
Incorrect. Myosin is the molecule being kept away from actin, not the one doing the covering.

## answer_d
Tropomyosin.

## explanation_d
Correct. Tropomyosin lies along the groove of the actin helix and physically blocks the myosin-binding sites at rest, earning its description as the relaxing protein. Troponin's job is to hold tropomyosin in that blocking position until calcium arrives, at which point troponin C's conformational change lets tropomyosin roll aside and expose the site it was covering.

## answer_e
Ryanodine.

## explanation_e
Incorrect. The ryanodine receptor is a calcium-release channel on the sarcoplasmic reticulum, unrelated to actin's binding site.

## topic
Physiology

## subtopic
Contractile proteins

## main_concept
CON-MSK-287D88DF2F6B8C

## concept_ids


## contextual_concept_ids


## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
42

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Identify tropomyosin as the protein covering actin's myosin-binding site at rest.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 20; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
35

## randomise_answers
yes

## author_notes
Printed answer key: D.

---

# Item

## id
QM-ASULOCO-1FC30560633A

## title
Which statement about muscle contraction is incorrect?

## question
Which of the following about muscle contraction is incorrect:

## subject
msk

## status
Draft

## owner
Claude

## vignette
A student reviews five statements about the electrical and mechanical events of contraction and must find the one that misattributes voltage-sensing to the wrong receptor.

## format
single best answer

## derived_from
Printed question 22 of the ASU Locomotor Physiology MCQ paper.

## correct_answer
B

## answer_a
Action potential is conducted to the sarcomere through T tubules.

## explanation_a
This is a true statement, not the answer sought -- the T-tubule system carries the action potential from the sarcolemma into the fibre's depth, close to the sarcomeres.

## answer_b
Ryanodine receptors on sarcoplasmic reticulum are voltage gated Ca++ sensors.

## explanation_b
Correct -- this is the false statement. The ryanodine receptor is a calcium-release channel, opened mechanically by the conformational change of the adjacent dihydropyridine receptor (or, in cardiac muscle, by a small trigger calcium influx) -- it is not itself a voltage sensor. The true voltage sensor sits on the T-tubule: the dihydropyridine receptor.

## answer_c
Contraction occurs by sliding of actin over myosin.

## explanation_c
This is a true statement, not the answer sought -- this is exactly the sliding-filament mechanism.

## answer_d
Troponin and tropomyosin are relaxation protein complex.

## explanation_d
This is a true statement, not the answer sought -- together they hold actin's myosin-binding sites covered at rest, earning the description "relaxation protein complex."

## answer_e
Relaxation of the muscle is an active process that requires energy.

## explanation_e
This is a true statement, not the answer sought -- the SERCA calcium pump actively reuptakes calcium into the sarcoplasmic reticulum using ATP, making relaxation an energy-consuming process.

## topic
Physiology

## subtopic
Excitation-contraction coupling

## main_concept
CON-MSK-3013AA61E917B7

## concept_ids


## contextual_concept_ids


## difficulty
Hard

## question_type
Discrimination

## cognitive_effort
High

## cognitive_effort_score
0.6

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
9

## clinical_relevance
0.2

## academic_relevance
0.9

## exam_weight_by_year
ASU_Y1=0.8

## years
ASU_Y1

## universities
asu

## module
ASU-LOCO

## module_subject
ASU-LOCO > Physiology

## question_only_for


## library_ids
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## resource_ids
src_3be9856ba9380e79cb01

## learning_objective
Distinguish the dihydropyridine receptor (voltage sensor) from the ryanodine receptor (calcium-release channel, not itself voltage-gated) in excitation-contraction coupling.

## source_citation
ASU Year 1 Locomotor System, Physiology department, "MCQs - Locomotor Physiology Questions.pdf" (manifest src_3be9856ba9380e79cb01), printed question 22; printed answer key pp.22-23.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
60

## randomise_answers
yes

## author_notes
Printed answer key: B.
