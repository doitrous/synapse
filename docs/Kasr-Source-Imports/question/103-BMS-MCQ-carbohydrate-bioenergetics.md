<!--
  103 BMS · Biochemistry · 116 single-best-answer MCQs on carbohydrate
  metabolism, bioenergetics and the citric acid cycle.

  WHERE THEY COME FROM. The 102 INT lane extracted 391 MCQs from the department
  question book (src_07f0a0ff41addf826c7f, "DPT BOOK MCQ D book bio 102&103 mcq")
  and tagged each with the module that teaches it. This file is the 112 items it
  tagged 103 BMS in three chapters — Bioenergetics 21, Tricarboxylic Acid Cycle
  13, Carbohydrate Metabolism 78 — plus four printed questions the extraction
  lost and this lane recovered from the pages:

    TCA printed q5   (file page 87)   swallowed into option d of q4
    Carb printed q55 (file page 98)   swallowed into option d of q54
    Carb printed q75 (file page 101)  swallowed into option d of q74
    Carb printed q78 (file page 102)  swallowed into option d of q77

  Each of those four exists in the book, has a printed answer in the key table,
  and was lost because the OCR ran two questions together. They are authored
  here with the same deterministic ID scheme as the rest, so nothing is
  duplicated if the extraction is ever repaired.

  TWELVE ITEMS ARRIVED WITH correct: null and every one was recovered from the
  printed key rather than inferred. The three key tables are on file pages 86
  (Bioenergetics), 89 (TCA) and 103 (Carbohydrate Metabolism); each was opened
  and read. No key in this file is a guess, and no item was dropped.

  EIGHT ITEMS CARRIED A suspect FLAG and each was resolved against the page —
  five "option ran on", three "option count". Every repair is recorded in that
  item's author_notes, naming what the extraction held and what the page prints.

  THE ANSWER IS ALWAYS THE BOOK'S PRINTED KEY, never this lane's judgement. Two
  items are worth a faculty reviewer's eye and say so in their own notes:
  carbohydrate q46, whose key requires AMP to activate glycogen phosphorylase b
  where the department textbook prints only ATP and glucose 6-phosphate; and
  carbohydrate q48, where two options both read as true against the textbook and
  the key selects the fatty-acid one.

  CONCEPTS. 107 of the 116 test one of the 36 concepts minted in
  ../concept/103-BMS-mcq-carbohydrate-concepts.md.
  The other nine point at six concepts the 2025 exam lane already authored, and are
  not re-minted:
  CON-FND-037BF052DDFC0D, CON-FND-B928DE79E08882, CON-FND-D8A41B5C23B148,
  CON-HEM-A1EF4D20C85878, CON-HEM-4F64967BBFBB6F and CON-HEM-095C9C97B56CCA.
  Every library_ids entry names an article whose related_concepts lists that
  question's main_concept, and the build refuses to emit an item where it does
  not.

  IDs are minted, never invented:
    sha256("kau:103 BMS:src_07f0a0ff41addf826c7f:<file page>:<printed number>")
  taken to twelve uppercase hex characters behind QM-103-.

  status is Draft throughout. These need a faculty reviewer.

  Import: Admin › Bulk import → question. Questions land last.
-->

# Item

## id
QM-103-9F2476D8D7FA

## title
Breaking of the terminal phosphate of ATP releases about ……Kcal of energy.

## question
Breaking of the terminal phosphate of ATP releases about ……Kcal of energy.

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
6.1

## explanation_a
6.1 is below the threshold the book uses, and a bond releasing less than 7.3 kcal/mole is by definition a low-energy bond that cannot generate ATP. Choosing it makes ATP's own bond low energy, which would leave the classification with nothing to be measured against.

## answer_b
6.3

## explanation_b
It is the near-miss designed to catch a student who remembers "about six point something". The figure is not approximate in this book: 7.3 kcal/mole is both the value for ATP and the line that separates high-energy from low-energy bonds, so a number below it cannot be right.

## answer_c
7.1

## explanation_c
This is the digit-transposition distractor — 7.1 for 7.3 — and it catches recall without understanding. Nothing in the chapter turns on 7.1, whereas 7.3 is quoted twice: once as the yield of each terminal ATP bond and once as the class boundary.

## answer_d
7.3

## explanation_d
Each of the two terminal phosphate groups of ATP is joined to the rest of the molecule by a high-energy pyrophosphate bond, and on hydrolysis each releases **7.3 kcal/mole** of free energy. That number does more work than any other in the chapter, because the book then uses it to sort every hydrolysable bond in the body into two classes: bonds liberating less than 7.3 kcal/mole are low energy — the phosphate esters, carboxyl esters, glycosidic and peptide bonds — and cannot generate ATP, while bonds liberating 7.3 or more are high energy and are written with a curved double dash. ATP, 2-phosphoenolpyruvate, creatine phosphate and S-adenosylmethionine are the examples. The thing to hold is that ATP is not merely one high-energy compound among many; it is the standard the others are judged against.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-7228237A5897B5

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
5

## clinical_relevance
0.3

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## resource_ids
[clear]

## learning_objective
State the free-energy figure that separates high-energy from low-energy bonds, and sort a list of phosphorylated compounds into the two groups.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 1, file page 83. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p83-q1. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-F2996E31E6D5

## title
The major source of energy to perform cellular functions such as movement, and transmission of nerve impulses is ………

## question
The major source of energy to perform cellular functions such as movement, and transmission of nerve impulses is ………

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Adenosine Triphosphate (ATP)

## explanation_a
ATP is the immediate energy source for every kind of cellular work the book lists: mechanical work such as muscle contraction, electrical work such as the transmission of nerve impulses, chemical work such as building proteins, and osmotic work such as absorption, secretion and active transport. It is produced by catabolism and spent by anabolism, and the ATP–ADP cycle is what links the two. The detail worth carrying away is how little of it a cell holds — enough for only a few seconds of activity — which is why the cycle turns over so fast and why the surplus has to be stored as something else.

## answer_b
Flavin Adenine Dinucleotide (FAD)

## explanation_b
FAD is a coenzyme that carries reducing equivalents to the respiratory chain, not a currency that pays for work. It picks the student who has learned that FADH2 "gives ATP" and has stopped one step short: the FADH2 is spent to make ATP, and it is the ATP that drives the pump or the myosin head.

## answer_c
Adenosine monophosphate (AMP)

## explanation_c
AMP has no pyrophosphate bond left to hydrolyse at all — it is what remains after both high-energy bonds have been spent. It functions as a signal that the cell is short of energy, which is why it activates PFK-1, not as a source of energy.

## answer_d
Adenosine Dinucleotide (ADP)

## explanation_d
ADP does still carry one high-energy bond. ADP is the product left after ATP has done work and the substrate that oxidative phosphorylation recharges; it is a stage in the cycle, not the molecule that powers the nerve impulse. Note also that the option miscalls it "Adenosine Dinucleotide", which is not its name.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-6B7241CD9F3C42

## concept_ids
CON-FND-7228237A5897B5

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
5

## clinical_relevance
0.35

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## resource_ids
[clear]

## learning_objective
Name the storage form of high-energy phosphate in muscle, name the enzyme that makes and breaks it, and explain why ATP itself cannot be the store.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 2, file page 83. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p83-q2. correctSource, verbatim: "none".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Answer key recovered by reading the printed key table on file page 86, which gives 2. a for Bioenergetics printed question 2. The extraction recorded correct: null with correctSource "none".

---

# Item

## id
QM-103-BBF285E2940A

## title
Which of the following acts as a storage form of high energy phosphate?

## question
Which of the following acts as a storage form of high energy phosphate?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Glucose-6-phosphate

## explanation_a
It catches the belief that any phosphorylated compound holds energy. Glucose 6-phosphate carries a phosphate *ester* bond, which liberates less than 7.3 kcal/mole and is therefore low energy. It is a metabolic crossroads, not a store.

## answer_b
Phosphoenolpyruvate

## explanation_b
This is the harder distractor because phosphoenolpyruvate genuinely is a high-energy compound — the book lists it beside ATP and creatine phosphate. But it is a transient glycolytic intermediate that exists for one step before pyruvate kinase spends it. A store is something a cell holds in reserve, which is exactly what an intermediate is not.

## answer_c
Creatine phosphate

## explanation_c
Cells do not store energy as ATP: the amount present in any cell would maintain its activity for only a few seconds, which is why the ATP–ADP cycle turns over so rapidly. **Creatine phosphate is the major storage form of energy in muscle.** In energy-rich states creatine kinase transfers a phosphate from ATP to creatine; in energy-poor states the same reversible reaction runs the other way, and it does so within two to seven seconds. That timing is worth holding, because it is roughly the length of the effort the store covers — the first few seconds of a sprint, before any pathway has had time to respond.

## answer_d
Glycerol phosphate

## explanation_d
Glycerol 3-phosphate is another phosphate ester and therefore low energy; its job is to accept fatty acyl groups in triacylglycerol and phospholipid synthesis. It appears here for the same reason as glucose 6-phosphate — to catch the student sorting by the presence of a phosphate rather than by the energy of the bond.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-6B7241CD9F3C42

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
5

## clinical_relevance
0.35

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## resource_ids
[clear]

## learning_objective
Name the storage form of high-energy phosphate in muscle, name the enzyme that makes and breaks it, and explain why ATP itself cannot be the store.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 3, file page 83. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p83-q3. correctSource, verbatim: "none".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Answer key recovered by reading the printed key table on file page 86, which gives 3. c for Bioenergetics printed question 3. The extraction recorded correct: null with correctSource "none".

---

# Item

## id
QM-103-DF3C8617E075

## title
Which of the following is considered as high energy compound?

## question
Which of the following is considered as high energy compound?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
AMP

## explanation_a
This is the option that separates a student who has counted the bonds from one who has not. AMP is adenosine with a single phosphate attached by an ester linkage: both pyrophosphate bonds have already been spent, so there is nothing high energy left in it. It is the end of the line, not a source.

## answer_b
ADP

## explanation_b
A high-energy bond is one whose hydrolysis liberates 7.3 kcal/mole or more, and ADP still carries one such pyrophosphate bond — the second of the two that ATP has. ATP has two terminal phosphates joined by high-energy pyrophosphate bonds; hydrolysing the first gives ADP, which retains the second; hydrolysing that gives AMP, which retains none. So of the four options only ADP has a bond above the threshold. The other three — AMP, glycerol 3-phosphate and glucose 6-phosphate — are all phosphate esters, and the phosphate ester bond is the book's own worked example of a *low*-energy bond. Carrying a phosphate and being high energy are different things, and this question exists to prise them apart.

## answer_c
Glycerol 3-phosphate

## explanation_c
Glycerol 3-phosphate is a phosphate ester and therefore low energy. It is chosen by students who reason that a phosphate group is a phosphate group; the energy is in the type of bond, not in the atom.

## answer_d
Glucose 6-phosphate

## explanation_d
It is the book's own illustration of a low-energy phosphate ester bond — it is printed as the labelled example in the figure. Choosing it here is choosing the textbook's counter-example.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-7228237A5897B5

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
5

## clinical_relevance
0.3

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## resource_ids
[clear]

## learning_objective
State the free-energy figure that separates high-energy from low-energy bonds, and sort a list of phosphorylated compounds into the two groups.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 4, file page 83. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p83-q4. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-3C86ABBFFD51

## title
Name the type of pathway which is involved in the synthesis of compounds.

## question
Name the type of pathway which is involved in the synthesis of compounds.

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Anabolic pathway

## explanation_a
Anabolism is the biosynthesis of large complex molecules from smaller precursors, and it **consumes** energy; the book notes that anabolic reactions accelerate during growth and the regeneration of cellular material. Its counterpart, catabolism, breaks large molecules down with energy production and accelerates during fasting, physical or mental activity and stress. ATP is what links the two: it is a product of catabolism and a requirement of anabolism. Holding the pair as a direction rather than as two lists is what makes the rest of metabolism legible — every pathway in the course is one, the other, or explicitly both.

## answer_b
Catabolic pathway

## explanation_b
It is the exact opposite. Catabolism breaks complex molecules down into simpler ones and releases energy. A student who picks it has read "pathway involved in compounds" without registering the word *synthesis*.

## answer_c
Amphibolic pathway

## explanation_c
It is the most defensible wrong answer. An amphibolic pathway does both — the citric acid cycle is the example, because it oxidises acetyl-CoA while also exporting intermediates for synthesis. But the question asks for the pathway type defined by synthesis alone, and "amphibolic" is defined by doing two things, not one.

## answer_d
Anaplerotic pathway

## explanation_d
Anaplerotic means *refilling* — topping up a cycle intermediate that has been drawn off, as pyruvate carboxylase does when it replaces oxaloacetate. It is chosen by students who see a similar-looking word beginning with "ana" and assume it is a synonym for anabolic. It is not: replacing an intermediate to keep a cycle turning is not the same as building a new compound.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-9D5F6458F68D4B

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
4

## clinical_relevance
0.25

## academic_relevance
0.75

## exam_weight_by_year
KAU_Y1=0.35

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics

## question_only_for
[clear]

## library_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## resource_ids
[clear]

## learning_objective
Classify a named pathway as anabolic, catabolic or amphibolic, and say which of the three catabolic stages traps no energy.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 5, file page 83. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p83-q5. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-DB1B8019F92A

## title
What is the name of the molecule which donates its electrons?

## question
What is the name of the molecule which donates its electrons?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Reducing agent

## explanation_a
The vocabulary runs the opposite way to most people's intuition, which is the whole reason the question is set. The molecule that **donates** electrons is the **reducing agent**: it reduces its partner, and in doing so is itself oxidised. The molecule that accepts them is the oxidising agent, and it is itself reduced. Applied to the respiratory chain, NADH is the reducing agent at complex I and oxygen is the ultimate oxidising agent at complex IV. If you can only remember one anchor, use that one: NADH gives electrons away and is oxidised to NAD⁺, so a donor is a reducing agent.

## answer_b
Oxidative agent

## explanation_b
An oxidative agent — more usually written oxidising agent — is the acceptor, not the donor. It picks the student who reasons that the donor "is oxidised" and therefore must be the oxidising agent. Being oxidised and being an oxidising agent are opposite roles.

## answer_c
Standard reduction potential

## explanation_c
It is not a molecule at all. Standard reduction potential is a *property*: a number expressing how readily a carrier accepts electrons. It appears here to catch a student matching on familiar words from the chapter rather than reading what the question asks for.

## answer_d
Oxidant

## explanation_d
It is the same error as option B under a shorter name. An oxidant accepts electrons. Note that the question has offered the acceptor twice, in two wordings, which is a deliberate trap for anyone who has the pair reversed — they will find their answer twice and pick either.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-8771AB893CA4C3

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
5

## clinical_relevance
0.3

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
Identify the electron donor in a redox pair, rank NAD, FMN, FAD and oxygen by redox potential, and name the product formed at the end of the chain.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 6, file page 83. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p83-q6. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-58715A4CC317

## title
Which out of the following compounds has the highest redox potential?

## question
Which out of the following compounds has the highest redox potential?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
NAD

## explanation_a
NAD sits at the *low* end of the scale, which is precisely why NADH is the chain's starting point: electrons flow from low redox potential to high, so the carrier with the lowest potential is the first donor, not the last acceptor.

## answer_b
FMN

## explanation_b
FMN is the prosthetic group of complex I, which receives electrons from NADH and passes them on. It sits above NAD and below the cytochromes — a stage in the middle of the fall, not its floor.

## answer_c
FAD

## explanation_c
FAD is the prosthetic group of complex II, and it too is an intermediate carrier. Because FADH2 enters the chain later than NADH — at coenzyme Q rather than complex I — students sometimes read it as being "further along" and therefore highest. Further along is still not the end.

## answer_d
O2

## explanation_d
Electrons travel down the respiratory chain from carriers of low redox potential to carriers of high redox potential, and **oxygen has the highest of all**, which is exactly why it sits at the end of the chain as the terminal acceptor. At complex IV the electrons arriving from cytochrome c are transferred to oxygen, which combines with two protons to form water. The fall in potential from NADH to oxygen is what releases the energy that pumps protons at complexes I, III and IV, so this ordering is not a piece of trivia — it is the reason the chain runs in one direction and the reason oxygen is required at all.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-8771AB893CA4C3

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
5

## clinical_relevance
0.3

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
Identify the electron donor in a redox pair, rank NAD, FMN, FAD and oxygen by redox potential, and name the product formed at the end of the chain.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 7, file page 83. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p83-q7. correctSource, verbatim: "none".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Answer key recovered by reading the printed key table on file page 86, which gives 7. d for Bioenergetics printed question 7. The extraction recorded correct: null with correctSource "none".

---

# Item

## id
QM-103-2A6037F935FA

## title
Cytochromes are:

## question
Cytochromes are:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Hydrogen atoms transporters

## explanation_a
This is the misconception the question exists to catch. Hydrogen atoms are carried in the first half of the chain — complex I moves two hydrogens from NADH to coenzyme Q, and complex II moves two from FADH2 to coenzyme Q. At complex III the currency changes: two *electrons* pass from CoQH2 to cytochrome c, and the two protons are released separately. Everything after coenzyme Q carries electrons only.

## answer_b
Proton acceptors

## explanation_b
A proton acceptor would be a base. Protons in this system are pumped across the membrane by complexes I, III and IV and travel back through the F0 channel of ATP synthase — a route entirely separate from the cytochromes, which is what makes the gradient possible in the first place.

## answer_c
Hydrogen ions acceptors

## explanation_c
It is the same claim as option B in different words — a hydrogen ion is a proton. Offering the wrong answer twice is deliberate: a student who thinks cytochromes handle protons will find two options that fit and no way to choose between them, which is the signal that the premise is wrong.

## answer_d
Electron acceptors

## explanation_d
Cytochromes are haemoproteins whose iron alternates between the ferrous and ferric states, and that is a one-electron change — so they accept and pass on **electrons**, not hydrogen atoms and not protons. The book's own table describes complex III, made of cytochromes b and c1, as transferring two electrons from CoQH2 to cytochrome c while two hydrogen ions are released, and complex IV, made of cytochromes a and a3 with two copper atoms, as transferring electrons from cytochrome c to oxygen. That separation of the electron from its proton at coenzyme Q is what creates the pumped protons in the first place, so the fact that cytochromes carry electrons alone is not a labelling detail — it is the mechanism of the gradient.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-A3BC299ED2C7C9

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
8

## clinical_relevance
0.4

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
Trace an electron from NADH and from FADH2 to oxygen, naming each carrier in order, and state which prosthetic group belongs to complex I and to complex II.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 8, file page 84. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p84-q8. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-CDD628AA327D

## title
In the ETC, which route does an electron take from NADH?

## question
In the ETC, which route does an electron take from NADH?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
Complex II, ubiquinone, complex III, complex IV

## explanation_a
It is the single commonest error in this chapter. Complex II is succinate dehydrogenase, the entry point for FADH2 — NADH never passes through it. A student who routes NADH through complex II also cannot explain why NADH yields 2.5 ATP and FADH2 only 1.5, because that difference exists precisely because one of them uses complex I and the other does not.

## answer_b
Complex I, ubiquinone, complex III, complex IV

## explanation_b
NADH is oxidised at **complex I**, NADH dehydrogenase, a flavoprotein carrying FMN and seven iron–sulphur clusters, which transfers two hydrogens to **coenzyme Q (ubiquinone)** to form CoQH2. Coenzyme Q, one of the two mobile carriers, delivers to **complex III**, cytochrome bc1, which passes two electrons to the second mobile carrier, cytochrome c, releasing two protons from CoQH2. Cytochrome c delivers to **complex IV**, cytochrome c oxidase, which hands the electrons to oxygen. Complexes I, III and IV are also the three proton pumps, which is why this route — and not the complex II route — is worth 2.5 ATP per oxygen atom.

## answer_c
Complex I, complex II, cytochrome C, complex IV

## explanation_c
This route puts complex I and complex II in series, when in fact they are two parallel *entrances* to the same chain, both delivering to coenzyme Q. It also omits coenzyme Q entirely, and nothing can get from a complex to cytochrome c without it.

## answer_d
Complex II, ubiquinone, cytochrome C, complex IV

## explanation_d
This starts at the wrong complex for NADH, and it skips complex III, which is the only thing that can load cytochrome c. It catches a student who remembers that there are two mobile carriers but not the order in which they sit.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-A3BC299ED2C7C9

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
8

## clinical_relevance
0.4

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
Trace an electron from NADH and from FADH2 to oxygen, naming each carrier in order, and state which prosthetic group belongs to complex I and to complex II.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 9, file page 84. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p84-q9. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-7F002D07E98A

## title
A flavoprotein contains one FAD moiety; if this is the only electron-acceptor in the flavoprotein, how many electrons can the flavoprotein accept when taking on its fully reduced form?

## question
A flavoprotein contains one FAD moiety; if this is the only electron-acceptor in the flavoprotein, how many electrons can the flavoprotein accept when taking on its fully reduced form?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Two

## explanation_a
FAD is fully reduced to FADH2, and the arithmetic is in that formula: two hydrogen atoms have been added, and each hydrogen atom is one proton plus one electron — so **two electrons**. The book states the same stoichiometry from the other direction when it describes complex II as transferring "2 hydrogens from FADH2 to CoQ", and complex I as transferring two hydrogens from NADH. Flavins are the carriers that can do this in one step or in two, which is why they sit at the junctions of the chain where a two-electron donor like NADH has to be handed on to one-electron carriers like the cytochromes.

## answer_b
Three

## explanation_b
Three would leave an unpaired electron and no stable reduced form; there is no FADH3. It is chosen by students guessing rather than counting the hydrogens in FADH2.

## answer_c
One

## explanation_c
It is the answer for a *cytochrome*, not a flavoprotein. A cytochrome's iron moves between Fe²⁺ and Fe³⁺, which is a one-electron change. Confusing the two carrier types here is the same error as calling cytochromes hydrogen carriers, seen from the other side.

## answer_d
Four

## explanation_d
Four is the number of protons complexes I and III each translocate, and it appears here to catch a student who has memorised the numbers of the chapter without attaching each to its own quantity. The electrons accepted by a flavin and the protons pumped by a complex are different counts.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-A3BC299ED2C7C9

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
8

## clinical_relevance
0.4

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
Trace an electron from NADH and from FADH2 to oxygen, naming each carrier in order, and state which prosthetic group belongs to complex I and to complex II.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 10, file page 84. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p84-q10. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-412178B84F9B

## title
FAD is a prosthetic group of:

## question
FAD is a prosthetic group of:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
Complex I

## explanation_a
It is the near-miss. Complex I is also a flavoprotein, but its flavin is **FMN**, not FAD, and it is bound to NADH dehydrogenase with seven iron–sulphur clusters. Both are flavins; only one is FAD, and the pair FMN-with-complex-I against FAD-with-complex-II is worth learning as a pair rather than separately.

## answer_b
Complex II

## explanation_b
Complex II is **succinate dehydrogenase**, a flavoprotein bound to FAD and two iron–sulphur clusters, and it transfers two hydrogens from FADH2 to coenzyme Q. This complex is worth extra attention because it does two jobs at once: it is a component of the respiratory chain *and* the sixth enzyme of the citric acid cycle — the only cycle enzyme not free in the matrix, and the only one whose coenzyme is FAD. Three questions in this book turn on that single fact, and they look unrelated until you notice that succinate dehydrogenase is the answer to all of them.

## answer_c
Complex III

## explanation_c
Complex III is a haemoprotein — cytochromes b and c1 with one iron–sulphur cluster — and carries no flavin at all. Its currency is electrons.

## answer_d
Complex IV

## explanation_d
Complex IV is cytochrome c oxidase, made of cytochromes a and a3 with two copper atoms. Like complex III it carries no flavin; the copper, not a flavin, is what distinguishes it.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-A3BC299ED2C7C9

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
8

## clinical_relevance
0.4

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
Trace an electron from NADH and from FADH2 to oxygen, naming each carrier in order, and state which prosthetic group belongs to complex I and to complex II.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 11, file page 84. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p84-q11. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
OCR repair: the extraction read option b as "Complex IT". Repaired to "Complex II" from the page, where the printed option reads "Complex II" and the answer key gives b.

---

# Item

## id
QM-103-80637F086621

## title
Coenzyme Q transfers its electrons to:

## question
Coenzyme Q transfers its electrons to:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Complex I

## explanation_a
This is the direction of travel reversed. Complex I transfers hydrogens *to* coenzyme Q, not the other way round. A student who picks it has the chain running backwards, which would also make oxygen the donor and NADH the acceptor.

## answer_b
Complex II

## explanation_b
The same error. Complex II also feeds *into* coenzyme Q, delivering the hydrogens from FADH2. Coenzyme Q is the collection point for both entry routes, so neither complex can be its destination.

## answer_c
Matrix

## explanation_c
It confuses the electron route with the proton route. Protons end up back in the matrix, through the F0 channel of ATP synthase; electrons stay on the carriers until oxygen takes them. The matrix is not an electron acceptor.

## answer_d
Cytochrome c

## explanation_d
With one step in between that the option compresses. Coenzyme Q, reduced to CoQH2, hands its electrons to **complex III**, cytochrome bc1, which passes two electrons on to **cytochrome c** and releases two protons. Cytochrome c is the second of the two mobile carriers and shuttles those electrons to complex IV. The pattern worth holding is the alternation: fixed complex, mobile carrier, fixed complex, mobile carrier, fixed complex — complex I or II, then coenzyme Q, then complex III, then cytochrome c, then complex IV. The mobile carriers exist because the complexes cannot touch each other.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-A3BC299ED2C7C9

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
8

## clinical_relevance
0.4

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
Trace an electron from NADH and from FADH2 to oxygen, naming each carrier in order, and state which prosthetic group belongs to complex I and to complex II.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 12, file page 84. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p84-q12. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-E48931F50446

## title
Which of the following complexes of ETC does not account for the pumping out of protons from the mitochondrial matrix?

## question
Which of the following complexes of ETC does not account for the pumping out of protons from the mitochondrial matrix?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Complex I

## explanation_a
Complex I is a proton pump, and one of the two larger ones — it translocates four protons out of the matrix for every pair of electrons it passes to coenzyme Q.

## answer_b
Complex III

## explanation_b
Complex III also translocates four protons. Between them complexes I and III account for eight of the ten pumped when NADH is oxidised.

## answer_c
Complex II

## explanation_c
**Complex II is the only one of the four that pumps no protons.** Complexes I and III each translocate four and complex IV translocates two, so ten protons are pumped for every NADH oxidised — and only six for every FADH2, because FADH2 enters at complex II and therefore misses complex I. That is the entire reason NADH is worth 2.5 ATP per oxygen atom and FADH2 only 1.5. So this is not an isolated fact to memorise: the absence of a proton pump at complex II is what the P:O ratios are made of, and a student who holds it can derive the yields instead of recalling them.

## answer_d
Complex IV

## explanation_d
Complex IV pumps too, though only two protons — half as many as complexes I and III. Being the smallest pump is not the same as being no pump.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-0CA8047810DF78

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
State which complexes pump protons and which does not, and explain why the P:O ratio for FADH2 is lower than for NADH.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 13, file page 84. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p84-q13. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-D73ACFAC2CE3

## title
The final acceptor of electrons in the respiratory chain is:

## question
The final acceptor of electrons in the respiratory chain is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
NADH

## explanation_a
It is the chain reversed. NADH is the principal *donor*: it is where the electrons come from, at complex I. Choosing it here is the same error as calling a reducing agent an oxidant.

## answer_b
Cytochrome a3

## explanation_b
This is the thoughtful wrong answer. Cytochrome a3 is part of complex IV and is genuinely the last *carrier* the electrons sit on before they leave the chain — but it hands them straight to oxygen, so it is a penultimate step, not the final acceptor. The question asks what accepts them out of the system altogether.

## answer_c
Water

## explanation_c
It confuses the acceptor with the product. Water is what is formed *after* oxygen has accepted the electrons and combined with two protons. Naming the product as the acceptor is the same slip as naming carbon dioxide the substrate of a decarboxylation.

## answer_d
Oxygen

## explanation_d
**Oxygen is the terminal electron acceptor**, and it is so because it has the highest redox potential in the chain — electrons fall from low potential to high, and oxygen is the floor. At complex IV, cytochrome c oxidase transfers electrons from cytochrome c to oxygen, which combines with two protons to form water. This is what "aerobic" means at the biochemical level, and it is why a cell without oxygen cannot use the chain at all: with nothing to accept the electrons, every carrier upstream stays reduced, NADH accumulates, and glycolysis must find another way to regenerate NAD⁺ — which is where lactate comes from.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-8771AB893CA4C3

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
5

## clinical_relevance
0.3

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
Identify the electron donor in a redox pair, rank NAD, FMN, FAD and oxygen by redox potential, and name the product formed at the end of the chain.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 14, file page 84. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p84-q14. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-CF209ED2CA60

## title
At the end of the electron transport chain, the hydrogen ions and electrons are combined to O₂ to form:

## question
At the end of the electron transport chain, the hydrogen ions and electrons are combined to O₂ to form:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
glucose

## explanation_a
It inverts the whole of metabolism. Glucose is a fuel that is oxidised to release electrons; the chain is where those electrons end up. Making glucose at the end of the respiratory chain would be photosynthesis, not respiration.

## answer_b
water

## explanation_b
Complex IV transfers electrons from cytochrome c to oxygen, and the oxygen combines with two protons to form **water**. The book's own definition of the chain closes on this: it "catalyzes the transfer of hydrogen atoms and/or electrons from reduced coenzymes to oxygen to form H2O and ATP". Two things follow that are worth carrying. First, this water is metabolic water — a genuine daily contribution to fluid balance. Second, it explains why the chain stops instantly without oxygen: there is nothing else with a high enough redox potential to take the electrons, so every carrier upstream stays reduced and the whole chain backs up.

## answer_c
sugar

## explanation_c
It is option A in a vaguer form. Offering the same wrong idea twice is a check on whether the student is reading the chemistry or matching familiar words.

## answer_d
amino acids

## explanation_d
Amino acids are made by transamination and other biosynthetic routes, and they contain nitrogen, which appears nowhere in the respiratory chain. It picks a student answering from a general sense that "the cell builds things" rather than from the reaction.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-8771AB893CA4C3

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
5

## clinical_relevance
0.3

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
Identify the electron donor in a redox pair, rank NAD, FMN, FAD and oxygen by redox potential, and name the product formed at the end of the chain.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 15, file page 85. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p85-q15. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
OCR repair: the extraction read the stem as "combined to QO to form". Repaired to "O₂" from the page, which prints "combined to O2 to form".

---

# Item

## id
QM-103-C372715B1E59

## title
The Chemiosmotic theory of oxidative phosphorylation states that:

## question
The Chemiosmotic theory of oxidative phosphorylation states that:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
The energy of a proton gradient is utilized for the synthesis of ATP

## explanation_a
The chemiosmotic theory says that the energy released as electrons travel down the respiratory chain is used to pump protons out of the matrix into the intermembrane space, which becomes electropositive. Because the inner membrane is impermeable to protons, that gradient persists as the **proton motive force**, and it can only be discharged by protons returning through the F0 channel of ATP synthase — four of them per ATP made at the F1 subunit in the matrix. The insight the theory contains is that oxidation and phosphorylation are two separate processes joined by nothing but a gradient across a membrane. Everything else in the chapter follows from that: the P:O ratios, respiratory control, and what an uncoupler does.

## answer_b
An electron gradient is generated at the internal mitochondrial membrane

## explanation_b
What is generated is a *proton* gradient, not an electron gradient. Electrons are not accumulated anywhere — they are passed from carrier to carrier and handed to oxygen. This option catches a student who remembers "gradient" and "electron transport chain" and has fused the two.

## answer_c
Hydrolysis of ATP is used for the formation of an energy rich proton gradient

## explanation_c
It runs the energy backwards. ATP hydrolysis does not build the gradient; the gradient builds ATP. The confusion is understandable because ATP synthase can in principle run either way, but the theory describes the physiological direction, in which oxidation pays for the gradient and the gradient pays for the ATP.

## answer_d
Protons accumulate in the mitochondrial matrix and are then pumped out through the complex Fo-F1

## explanation_d
Both halves of this option are mistaken, and it is the most instructive distractor. Protons do not accumulate in the matrix — they are pumped *out* of it, and the intermembrane space is the electropositive side. And the F0-F1 complex is the route protons take *back in*, not the route out; the pumps are complexes I, III and IV. A student who picks this has the geography of the whole mechanism inverted.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-0CA8047810DF78

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
State which complexes pump protons and which does not, and explain why the P:O ratio for FADH2 is lower than for NADH.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 16, file page 85. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p85-q16. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-7F25C1515325

## title
ATP synthesis by ATP synthase is driven by the movement of:

## question
ATP synthesis by ATP synthase is driven by the movement of:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Protons

## explanation_a
ATP synthase is complex V, and it has two parts: **F0**, embedded in the inner membrane, which is a proton channel, and **F1**, in the matrix, which is the site of ATP synthesis. The passage of four **protons** through F0, driven by the electrochemical gradient the chain has built, is what powers the formation of one ATP from ADP and inorganic phosphate. Notice how completely this separates the two halves of oxidative phosphorylation: the electrons never come near ATP synthase, and the protons never come near oxygen. The only thing connecting the oxidation to the phosphorylation is the gradient — which is exactly why a molecule that lets protons leak across the membrane abolishes ATP synthesis while leaving oxidation running.

## answer_b
NADH

## explanation_b
NADH delivers its electrons at complex I and takes no further part; it never reaches complex V. This picks the student who knows NADH is "worth" 2.5 ATP and has short-circuited the mechanism into NADH driving the synthase directly.

## answer_c
Electrons

## explanation_c
It is the commonest version of the same short circuit. Electrons drive the *pumps*; the pumps build the gradient; the gradient drives the synthase. Removing the middle two steps loses the reason uncouplers work.

## answer_d
FADH2

## explanation_d
For the same reason as option B. FADH2 delivers its electrons at complex II. Its lower ATP yield comes from entering the chain past one pump, not from any different relationship with ATP synthase.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-0CA8047810DF78

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
State which complexes pump protons and which does not, and explain why the P:O ratio for FADH2 is lower than for NADH.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 17, file page 85. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p85-q17. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-11C61763F29D

## title
If an uncoupler of oxidative phosphorylation such as dinitrophenol is added:

## question
If an uncoupler of oxidative phosphorylation such as dinitrophenol is added:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Electron flow will continue but ATP synthesis will not occur

## explanation_a
It is the whole point of the word "uncoupler". These substances increase the permeability of the inner mitochondrial membrane to protons, which abolishes the electrochemical gradient. Oxidation in the respiratory chain therefore continues — indeed it speeds up, because the proton backpressure that normally restrains the pumps has gone — while ATP synthesis stops, since there is no gradient left to drive protons through F0. The energy that would have been captured as ATP is released as **heat**. That is not a pathological curiosity: thermogenin in brown adipose tissue does exactly this on purpose, to generate heat in the cold, and high thyroxine, intravenous calcium and aspirin overdose do it as a side effect, which is why each is associated with an increased sensation of heat.

## answer_b
Electron flow will continue but ATP synthesis will be increased

## explanation_b
Electron flow does continue, so the first half is right — but ATP synthesis cannot increase when the gradient that drives it has been dissipated. This catches a student who has understood that the chain speeds up and has assumed that everything downstream speeds up with it.

## answer_c
Electron flow will decrease but ATP synthesis will continue

## explanation_c
It is the mechanism exactly backwards. Electron flow does not decrease; it increases. And ATP synthesis is the one thing that stops. This is what a *complex IV inhibitor* such as cyanide would look like if it also spared the synthase, which nothing does.

## answer_d
Both electron flow and ATP synthesis will be decreased

## explanation_d
It is the intuitive answer that this question exists to defeat. "Uncoupled" sounds like "broken", and a student reasoning from the word alone predicts that everything stops. Only the coupling stops; the two processes it was joining carry on separately, one faster than before and one not at all.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-C3CB859E560A18

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.55

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
Predict what happens to electron flow, to ATP synthesis and to heat production when an uncoupler is added, and name the cellular signal that normally accelerates the chain.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 18, file page 85. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p85-q18. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-6E5DCF8C857C

## title
If the oxidative phosphorylation was uncoupled in the mitochondria, then there is a/an:

## question
If the oxidative phosphorylation was uncoupled in the mitochondria, then there is a/an:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Decreased concentration of ADP in the mitochondria

## explanation_a
It is the wrong direction. With no ATP being made, ADP is not being consumed and accumulates rather than falling. A rising ADP would normally accelerate ATP synthase further, which in an uncoupled mitochondrion achieves nothing.

## answer_b
Decreased oxidative rate

## explanation_b
Oxidation *increases*, because the proton gradient that normally restrains the pumps has been abolished and the backpressure is gone. A student who picks this is treating an uncoupler as though it were a chain inhibitor.

## answer_c
Decreased phosphorylation rate

## explanation_c
Uncoupling separates the two halves of oxidative phosphorylation, and it is the phosphorylation half that fails. Oxidation in the respiratory chain runs on — faster, in fact, once the proton backpressure is removed — while the rate of ATP formation falls, because the gradient that drives protons back through the F0 channel has been dissipated. The energy has not vanished: it is released as heat. So of the four things the question offers, only the phosphorylation rate goes down. Oxidation goes up, ADP accumulates because nothing is consuming it, and heat production rises. Getting this question right is really a test of whether "uncoupled" has been read as "disconnected" rather than as "stopped".

## answer_d
Decreased production of heat

## explanation_d
It is the opposite of what happens. Heat production rises — that is the defining consequence, and the reason brown adipose tissue uses thermogenin to uncouple deliberately for non-shivering thermogenesis. The book explicitly attributes the increased heat sensation of thyrotoxicosis, intravenous calcium and aspirin overdose to their uncoupling effect.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-C3CB859E560A18

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.55

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
Predict what happens to electron flow, to ATP synthesis and to heat production when an uncoupler is added, and name the cellular signal that normally accelerates the chain.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 19, file page 85. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p85-q19. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-24FBDD80A372

## title
Which of the following takes place in substrate level phosphorylation?

## question
Which of the following takes place in substrate level phosphorylation?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
The oxidation of NADPH instead of NADH

## explanation_a
NADPH is the reducing power of biosynthesis and of the glutathione defence, and it is not oxidised by the respiratory chain at all. Substituting one nucleotide for another does not describe a mechanism.

## answer_b
Inhibition of the respiratory chain

## explanation_b
It contains a grain of something true. Substrate level phosphorylation is *independent* of the respiratory chain — which is why it still works anaerobically and why a red cell can make ATP without mitochondria. But independence is not inhibition; nothing about the mechanism blocks the chain.

## answer_c
Only mitochondrial reactions participate in ATP formation

## explanation_c
It is the reverse of the truth on the arithmetic. Of the three substrate level phosphorylation reactions, **two are cytosolic** — phosphoglycerate kinase and pyruvate kinase, both in glycolysis — and only one, succinate thiokinase in the citric acid cycle, is mitochondrial. A student who picks this has probably fused substrate level phosphorylation with oxidative phosphorylation, which genuinely is confined to mitochondria.

## answer_d
Substrate reacts to form a product containing a high energy bond

## explanation_d
It is the book's own definition. Substrate level phosphorylation is the oxidation of a substrate to give a product carrying a **high energy bond**, whose energy is then used to phosphorylate ADP or GDP directly, with no respiratory chain involved. There are exactly three such reactions in two pathways, and the list is short enough to learn outright: in glycolysis, phosphoglycerate kinase takes the high-energy phosphate of 1,3-bisphosphoglycerate, and pyruvate kinase takes that of 2-phosphoenolpyruvate; in the citric acid cycle, succinate thiokinase cleaves the high-energy thioester bond of succinyl-CoA. Because none of them needs oxygen, they are the whole of anaerobic ATP production and the only source of ATP a red blood cell has.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-5253967A0E3786

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## resource_ids
[clear]

## learning_objective
Name the three substrate-level phosphorylation reactions and the pathway each belongs to, and distinguish them from ATP made by oxidative phosphorylation.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 20, file page 85. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p85-q20. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-3C94E38663DC

## title
What cellular condition favors the increased activity of ETC and oxidative phosphorylation?

## question
What cellular condition favors the increased activity of ETC and oxidative phosphorylation?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
High ADP concentration

## explanation_a
The reasoning is the whole of respiratory control. The electrochemical gradient, once established, inhibits further transport of reducing equivalents unless it is discharged — and the only way to discharge it is by protons returning through ATP synthase, which requires **ADP**, the activator of the enzyme. So during work the sequence is: ATP is consumed, ADP rises, ATP synthase is activated, protons flow back into the matrix, the backpressure on the pumps falls, the pumps are released, and the rate of oxidation and phosphorylation rises together. At rest the same chain runs in reverse — ADP falls, the synthase is inhibited, protons accumulate in the intermembrane space, backpressure rises and oxidation slows. The chain is not regulated by how much fuel is available but by how much ATP has been spent, which is a far more useful thing to know.

## answer_b
High NAD⁺ concentration

## explanation_b
It is the mirror image of a real signal. A high NAD⁺ concentration means the coenzymes are already oxidised — the chain has nothing waiting to feed it. It is the *reduced* form that is the substrate.

## answer_c
Low NADH concentration

## explanation_c
For the same reason. NADH is what the chain oxidises, so a low NADH is a shortage of substrate, not a stimulus. Options B and C are two statements of the same wrong idea, which is a signal that the axis being tested is not the redox one.

## answer_d
Low oxygen concentration

## explanation_d
It is the opposite. Oxygen is the terminal electron acceptor; a low oxygen concentration is precisely what stops the chain, backs up every carrier in the reduced state, and forces the cell into anaerobic glycolysis.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-C3CB859E560A18

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
7

## clinical_relevance
0.55

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN

## resource_ids
[clear]

## learning_objective
Predict what happens to electron flow, to ATP synthesis and to heat production when an uncoupler is added, and name the cellular signal that normally accelerates the chain.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Bioenergetics", printed question 21, file page 85. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 86.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p85-q21. correctSource, verbatim: "printed key (p86)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
OCR repair: the extraction read option b as "High NAD* concentration". Repaired to "High NAD⁺ concentration" from the page, which prints the superscript plus.

---

# Item

## id
QM-103-4BCC4FAB1E91

## title
The only membrane bound enzyme in the citric acid cycle is:

## question
The only membrane bound enzyme in the citric acid cycle is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Succinate dehydrogenase

## explanation_a
Every enzyme of the citric acid cycle is a soluble enzyme of the mitochondrial matrix except **succinate dehydrogenase**, which is tightly bound to the inner mitochondrial membrane — where it also serves as complex II of the respiratory chain. That double identity explains a second fact the exam tests separately: succinate dehydrogenase is the only cycle enzyme whose coenzyme is FAD, while the three matrix dehydrogenases all use NAD⁺. It is also why the book notes that the cycle enzymes sit close to the chain enzymes: the reduced coenzymes are handed straight on for reoxidation, and in this one case the handover needs no diffusion at all.

## answer_b
NADH dehydrogenase

## explanation_b
It is the trap the question is built around. NADH dehydrogenase *is* membrane bound — it is complex I — but it is not an enzyme of the citric acid cycle. The question asks which *cycle* enzyme is also in the membrane, and complex I never touches a cycle intermediate.

## answer_c
ATP synthase

## explanation_c
The same error. ATP synthase is complex V and sits in the inner membrane, but it belongs to oxidative phosphorylation, not to the cycle. Its F1 head is in the matrix, which is where the cycle runs, but proximity is not membership.

## answer_d
Acyl Co-A dehydrogenase

## explanation_d
Acyl-CoA dehydrogenase is an enzyme of fatty acid β-oxidation, not of the citric acid cycle at all. It appears here because it is another FAD-linked dehydrogenase with a similar name, which catches a student sorting on the word "dehydrogenase" instead of on the pathway.

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## main_concept
CON-FND-BCCBDEC637795A

## concept_ids
CON-FND-A3BC299ED2C7C9

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.3

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## question_only_for
[clear]

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## resource_ids
[clear]

## learning_objective
Name the one membrane-bound enzyme of the cycle, say which respiratory complex it is, and match each dehydrogenase step of the cycle to its coenzyme.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 1, file page 87. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p87-q1. correctSource, verbatim: "none".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Answer key recovered by reading the printed key table on file page 89, which gives 1. a. The extraction recorded correct: null with correctSource "none".

---

# Item

## id
QM-103-580CD2F0F57E

## title
The only TCA cycle enzyme which requires FAD is:

## question
The only TCA cycle enzyme which requires FAD is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Isocitrate dehydrogenase

## explanation_a
Isocitrate dehydrogenase uses NAD⁺ and produces the first NADH+H⁺ of the cycle, releasing the first CO2 as it does so. It needs magnesium or manganese for the decarboxylation, but no flavin.

## answer_b
α-Ketoglutarate dehydrogenase

## explanation_b
It is by far the best wrong answer, because the α-ketoglutarate dehydrogenase complex genuinely does contain FAD — among five cofactors, along with thiamine pyrophosphate, lipoate, coenzyme A and NAD⁺. But the FAD there is internal to the complex; the coenzyme that is *reduced and passed to the chain* is NAD⁺, and the question is asking which enzyme requires FAD as its working coenzyme. Succinate dehydrogenase is the one that hands FADH2 on.

## answer_c
Malate dehydrogenase

## explanation_c
Malate dehydrogenase uses NAD⁺ and produces the third NADH+H⁺ of the cycle as it regenerates oxaloacetate. This is also the answer to the separate question about what accepts hydrogen from malate.

## answer_d
Succinate dehydrogenase

## explanation_d
Succinate dehydrogenase dehydrogenates succinate to fumarate, and its coenzyme is **FAD**, which becomes FADH2. It is the only enzyme in the cycle to use a flavin as its working coenzyme, and that is not a coincidence — it is also the only cycle enzyme bound to the inner mitochondrial membrane, where it is complex II of the respiratory chain, and complex II is by definition the FAD entry point. So the site and the coenzyme are the same fact seen twice. The consequence is quantitative: this one step's FADH2 yields 1.5 ATP through the chain, while each of the three NADH yields 2.5, which is how the cycle's ten-ATP total is assembled.

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## main_concept
CON-FND-BCCBDEC637795A

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
7

## clinical_relevance
0.3

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## question_only_for
[clear]

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## resource_ids
[clear]

## learning_objective
Name the one membrane-bound enzyme of the cycle, say which respiratory complex it is, and match each dehydrogenase step of the cycle to its coenzyme.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 2, file page 87. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p87-q2. correctSource, verbatim: "printed key (p89)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-5B814776AB98

## title
The cyclic character of the Krebs cycle implies that:

## question
The cyclic character of the Krebs cycle implies that:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Oxaloacetate is regenerated at each round of the cycle

## explanation_a
The cycle opens when citrate synthase condenses the two-carbon acetyl group of acetyl-CoA with four-carbon **oxaloacetate**, and it closes when malate dehydrogenase oxidises malate back to oxaloacetate. That final step restores the molecule the first step consumed, leaving it free to take up the next acetyl group — which is precisely what makes the pathway a cycle rather than a line. The practical consequence is that oxaloacetate is catalytic: a very small amount can oxidise an unlimited quantity of acetyl-CoA, provided none is drawn off. When some *is* drawn off — into gluconeogenesis during starvation, for instance — the cycle slows, acetyl-CoA accumulates, and ketone bodies appear. Pyruvate carboxylase exists to prevent exactly that.

## answer_b
All reactions are reversible

## explanation_b
It is a factual error as well as a conceptual one. Three of the cycle's reactions are **irreversible** — citrate synthase, isocitrate dehydrogenase and the α-ketoglutarate dehydrogenase complex — and those three are precisely the rate-controlling key enzymes. A pathway does not need reversible steps to be a cycle; it needs a step that regenerates its starting material.

## answer_c
Coenzymes can be re-used

## explanation_c
It is true in itself. Coenzymes are indeed re-used — NAD⁺ and FAD are reoxidised by the respiratory chain and return. But that is true of every NAD-linked pathway in the cell, including strictly linear ones such as glycolysis, so it cannot be what makes *this* pathway cyclic.

## answer_d
Citrate is regenerated at each round of the cycle

## explanation_d
It names the wrong molecule. Citrate is *formed* at the first step and consumed on the way round; it is never regenerated. A student who picks it has taken the cycle's name for the compound that closes it.

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## main_concept
CON-FND-8F8B3EF0763399

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
5

## clinical_relevance
0.25

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.45

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## question_only_for
[clear]

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## resource_ids
[clear]

## learning_objective
Explain what the cyclic character of the Krebs cycle actually means, and name the step and enzyme that restore the starting compound.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 3, file page 87. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p87-q3. correctSource, verbatim: "printed key (p89)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-3EBCA32CED9A

## title
Substrate-level phosphorylation happens at which of the following TCA cycle enzyme?

## question
Substrate-level phosphorylation happens at which of the following TCA cycle enzyme?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Aconitase enzyme

## explanation_a
Aconitase merely isomerises citrate to isocitrate, using reduced glutathione and ferrous iron; no energy is captured at that step at all. It is memorable for a different reason — it is the enzyme fluoroacetate poisons.

## answer_b
Isocitrate dehydrogenase

## explanation_b
Isocitrate dehydrogenase produces the first NADH+H⁺ and releases the first CO2. Its ATP arrives later, in the respiratory chain, not at the enzyme itself — which is the distinction the question is testing.

## answer_c
Succinate thiokinase

## explanation_c
Succinate thiokinase cleaves the **high-energy thioester bond of succinyl-CoA**, and the energy of that bond is used to phosphorylate ADP directly to ATP. It is the **only reaction in the whole citric acid cycle** that generates ATP at substrate level; everything else the cycle is credited with comes from reduced coenzymes passing down the respiratory chain afterwards. Across the whole of metabolism there are just three substrate level phosphorylation reactions, and knowing all three answers several questions at once: phosphoglycerate kinase and pyruvate kinase in glycolysis, and this one in the cycle.

## answer_d
α-Ketoglutarate dehydrogenase

## explanation_d
It is the near-miss, because the α-ketoglutarate dehydrogenase complex is the step immediately before — it is what *makes* the succinyl-CoA whose bond is then cashed. It produces the second NADH+H⁺ and the second CO2, but no ATP directly. One step's difference is exactly what this option is designed to expose.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-5253967A0E3786

## concept_ids
CON-FND-9420F608039B74

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## question_only_for
[clear]

## library_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## resource_ids
[clear]

## learning_objective
Name the three substrate-level phosphorylation reactions and the pathway each belongs to, and distinguish them from ATP made by oxidative phosphorylation.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 4, file page 87. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p87-q4. correctSource, verbatim: "printed key (p89)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Suspect flag "option ran on": the extraction merged printed question 5 into option d and produced a spurious option e. Repaired from file page 87, where the printed options are a) Aconitase enzyme, b) Isocitrate dehydrogenase, c) Succinate thiokinase, d) α-Ketoglutarate dehydrogenase. Printed question 5 is authored separately.

---

# Item

## id
QM-103-F2DDD401DEB6

## title
………accepts hydrogen from malate in TCA cycle.

## question
………accepts hydrogen from malate in TCA cycle.

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
FAD

## explanation_a
FAD is the coenzyme of succinate dehydrogenase, two steps earlier in the cycle, and it is the only flavin the cycle uses. Choosing it here is a plausible slip because both reactions are dehydrogenations of four-carbon acids, but only one of them is membrane bound and flavin-linked.

## answer_b
NAD

## explanation_b
Malate dehydrogenase oxidises malate to oxaloacetate using **NAD⁺**, producing the third NADH+H⁺ of the cycle and regenerating the oxaloacetate that will condense with the next acetyl-CoA. Three of the cycle's four dehydrogenation steps use NAD⁺ — isocitrate dehydrogenase, the α-ketoglutarate dehydrogenase complex and malate dehydrogenase — and only succinate dehydrogenase uses FAD. That three-to-one split is what produces the yield of three NADH and one FADH2 per turn, and so the 7.5 + 1.5 + 1 arithmetic that totals ten ATP.

## answer_c
NADP

## explanation_c
NADP⁺ is the coenzyme of reductive biosynthesis and of the pentose phosphate pathway, not of the citric acid cycle. As a rule of thumb in this course, NAD⁺ belongs to catabolism and NADPH to anabolism, and a catabolic cycle will not be using NADP⁺.

## answer_d
FMN

## explanation_d
FMN is the flavin of complex I of the respiratory chain, not of any cycle enzyme. It is included to catch a student who knows the cycle involves a flavin somewhere and reaches for the wrong one.

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## main_concept
CON-FND-BCCBDEC637795A

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
7

## clinical_relevance
0.3

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## question_only_for
[clear]

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## resource_ids
[clear]

## learning_objective
Name the one membrane-bound enzyme of the cycle, say which respiratory complex it is, and match each dehydrogenase step of the cycle to its coenzyme.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 5, file page 87. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Not present in the 102 INT lane’s extraction: the printed question was swallowed by an OCR run-on into a neighbouring item. Recovered in full from the page. correctSource, established here: "printed key (file page 89)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
This item is not in the extracted bank: the 102 lane's OCR merged its stem and first two options into option d of printed question 4, and its remaining options into a spurious option e. Recovered in full from file page 87, and its key read from the printed table on file page 89, which gives 5. b.

---

# Item

## id
QM-103-76DE7583ABF9

## title
One of the key enzymes of the TCA cycle is:

## question
One of the key enzymes of the TCA cycle is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Aconitase

## explanation_a
Aconitase catalyses a freely reversible isomerisation and is not a control point. It is worth remembering for a different reason — it is the enzyme inhibited by the fluorocitrate formed from fluoroacetate — but an inhibitable enzyme is not the same as a regulatory one.

## answer_b
Malate dehydrogenase

## explanation_b
Malate dehydrogenase is the eighth step and regenerates oxaloacetate, but its reaction is reversible and it is not rate-controlling. Students choose it because it is the step that closes the cycle, and importance in one sense is being confused with regulation in another.

## answer_c
Succinate thiokinase

## explanation_c
It is the most distinctive enzyme in the cycle for another reason: it is the only one that makes ATP at substrate level. Being unique is not the same as being a key enzyme, and the question is asking which step the cycle is controlled at.

## answer_d
Citrate synthase

## explanation_d
The cycle has three irreversible steps, and those three are its rate-controlling key enzymes: **citrate synthase, isocitrate dehydrogenase and the α-ketoglutarate dehydrogenase complex**. Citrate synthase is the first of them and is regulated by the availability of both its substrates — which is why pyruvate carboxylase, allosterically activated by acetyl-CoA, exists to keep oxaloacetate topped up. All three are inhibited by a high ATP/ADP ratio, the two dehydrogenases are inhibited by a high NADH/NAD⁺ ratio (which is why the cycle only runs aerobically), succinyl-CoA feeds back on citrate synthase and α-ketoglutarate dehydrogenase, and calcium released during muscle contraction activates all three so a working muscle gets its ATP.

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## main_concept
CON-FND-037BF052DDFC0D

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## question_only_for
[clear]

## library_ids
ART-103-BIO-TCA-KEY-ENZYMES

## resource_ids
[clear]

## learning_objective
Name the three key enzymes of the citric acid cycle and state what activates and inhibits each.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 6, file page 87. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p87-q6. correctSource, verbatim: "printed key (p89)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-1E8AB220E80E

## title
How many molecules of CO2 are produced by an acetyl group of acetyl-CoA in a citric acid cycle?

## question
How many molecules of CO2 are produced by an acetyl group of acetyl-CoA in a citric acid cycle?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
3

## explanation_a
It is the commonest wrong number, usually reached by counting three decarboxylations. There are only two inside the cycle. The third one students are thinking of is the pyruvate dehydrogenase step, which releases CO2 *before* the cycle begins and is not part of it.

## answer_b
5

## explanation_b
Five is not a decarboxylation count at all; it is the number of coenzymes the pyruvate dehydrogenase and α-ketoglutarate dehydrogenase complexes each require. It is here to catch a student matching remembered numbers to the nearest question.

## answer_c
1

## explanation_c
One would leave the cycle unbalanced: two carbons enter as the acetyl group of acetyl-CoA at every turn, so two must leave, or the intermediates would accumulate indefinitely.

## answer_d
2

## explanation_d
One turn of the cycle releases **two molecules of CO2**, at the two decarboxylation steps: isocitrate dehydrogenase releases the first, and the α-ketoglutarate dehydrogenase complex releases the second. That balances the two carbons entering as the acetyl group, which is what allows the cycle to run indefinitely without accumulating anything. One refinement worth knowing, though the exam does not ask it: on the first turn the two carbon atoms leaving are not the two that entered — they come from the oxaloacetate part of citrate — but the count is unaffected, and it is the count that keeps the cycle balanced. The full yield of one turn is two CO2, three NADH, one FADH2 and one ATP.

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## main_concept
CON-FND-9420F608039B74

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
7

## clinical_relevance
0.3

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## question_only_for
[clear]

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## resource_ids
[clear]

## learning_objective
State the CO2, NADH, FADH2 and ATP yield of one turn of the cycle, and show how the ten-ATP total is assembled from them.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 7, file page 88. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p88-q7. correctSource, verbatim: "none".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Answer key recovered by reading the printed key table on file page 89, which gives 7. d. The extraction recorded correct: null with correctSource "none". OCR repair: the stem's "Co2" is written CO2.

---

# Item

## id
QM-103-4405784344FE

## title
What is the approximate total yield of ATP that is produced via the Krebs cycle and subsequent oxidative phosphorylation of a single molecule of acetyl CoA?

## question
What is the approximate total yield of ATP that is produced via the Krebs cycle and subsequent oxidative phosphorylation of a single molecule of acetyl CoA?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
32

## explanation_a
It is the number for a whole *glucose*, completely oxidised — the book's figure of 32 ATP per mole of glucose. One glucose gives two acetyl-CoA, and the cycle is only the last stage of its oxidation, so 32 cannot be the yield of a single acetyl group.

## answer_b
10

## explanation_b
The arithmetic is worth carrying rather than the number. One turn of the cycle yields three NADH, one FADH2 and one ATP made at substrate level by succinate thiokinase. Through the respiratory chain the three NADH give 3 × 2.5 = 7.5 ATP and the FADH2 gives 1.5, and adding the substrate-level ATP gives **7.5 + 1.5 + 1 = 10 ATP** per acetyl group. Note that the book's own cycle diagram marks "9 ATP" against the chain arrow, which is the older accounting of 3 ATP per NADH and 2 per FADH2; its text and its answer key both use ten, and ten is what this course teaches.

## answer_c
20

## explanation_c
Twenty is what two acetyl groups would yield, which is the cycle's contribution to one glucose — a plausible slip for a student who has learned the glucose figures and forgotten to halve them for a single acetyl-CoA.

## answer_d
16

## explanation_d
Sixteen corresponds to no step in either accounting system. It catches a student estimating rather than assembling the total from three NADH, one FADH2 and one ATP.

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## main_concept
CON-FND-9420F608039B74

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.3

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## question_only_for
[clear]

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## resource_ids
[clear]

## learning_objective
State the CO2, NADH, FADH2 and ATP yield of one turn of the cycle, and show how the ten-ATP total is assembled from them.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 8, file page 88. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p88-q8. correctSource, verbatim: "printed key (p89)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-8B9107EEBAAD

## title
The Krebs cycle is considered an amphibolic pathway because:

## question
The Krebs cycle is considered an amphibolic pathway because:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
All its reactions are reversible

## explanation_a
It is false in itself: three of the cycle's reactions are irreversible, and they are the regulated ones. It also mistakes the meaning of the word — amphibolic describes what a pathway is *for*, not the thermodynamics of its steps.

## answer_b
It is present in all cells of the body

## explanation_b
It is factually wrong as well. The cycle is absent from the **red blood cell**, which has no mitochondria at all — a fact the question book tests directly elsewhere in this chapter. Even if it were universal, ubiquity is not amphibolism.

## answer_c
Its metabolites participate in the cell's anabolism as well as catabolism

## explanation_c
**Amphibolic** means the pathway serves catabolism and anabolism at once, and the citric acid cycle is the type example. Catabolically it is the final common pathway for the oxidation of carbohydrate, fat and protein, because all three converge on acetyl-CoA. Anabolically, five of its intermediates leave to build something: citrate is exported and split to give acetyl-CoA for fatty acids and cholesterol; α-ketoglutarate is transaminated to glutamate and so to the amino acids; succinyl-CoA goes to haem synthesis and ketone body oxidation; malate can be decarboxylated to pyruvate by malic enzyme, yielding NADPH; and oxaloacetate becomes aspartate, or, through PEPCK in the cytosol, phosphoenolpyruvate for gluconeogenesis. Because of that traffic, anything that draws an intermediate off slows the cycle unless it is replaced — which is what anaplerotic reactions such as pyruvate carboxylase are for.

## answer_d
All its reactions are irreversible

## explanation_d
It is the mirror image of option A. Only three of the eight reactions are irreversible. Offering both extremes catches a student who is guessing about thermodynamics because the actual meaning of "amphibolic" is not known.

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## main_concept
CON-FND-8ADE222FBB57B2

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## question_only_for
[clear]

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## resource_ids
[clear]

## learning_objective
Explain what amphibolic means, and match each cycle intermediate that leaves the cycle to the anabolic pathway it feeds.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 9, file page 88. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p88-q9. correctSource, verbatim: "none".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Answer key recovered by reading the printed key table on file page 89, which gives 9. c. The extraction recorded correct: null with correctSource "none".

---

# Item

## id
QM-103-58BD2448B5DD

## title
The following TCA intermediate is used for heme synthesis:

## question
The following TCA intermediate is used for heme synthesis:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
succinyl CoA

## explanation_a
**Succinyl-CoA** leaves the cycle for haem synthesis, where it condenses with glycine in the first and rate-limiting step of the porphyrin pathway; the book also names it as the intermediate used in the oxidation of ketone bodies. This is one of the clearest illustrations of what "amphibolic" means: the same molecule that is an intermediate in the oxidation of acetyl-CoA is also the starting material for a biosynthetic pathway in a different chapter. It is worth linking to two other facts about succinyl-CoA — it is the product of the α-ketoglutarate dehydrogenase complex, and its high-energy thioester bond is what succinate thiokinase cashes for the cycle's only substrate-level ATP.

## answer_b
Malate

## explanation_b
Malate leaves the cycle for a different purpose: it can be oxidatively decarboxylated to pyruvate by malic enzyme, which is one of the cell's sources of NADPH. Nothing about haem.

## answer_c
Citrate

## explanation_c
Citrate is exported from the mitochondrion and split by ATP-citrate lyase into oxaloacetate and acetyl-CoA, and that acetyl-CoA is the precursor of fatty acids and cholesterol. It is the *lipid* export route, and students who have learned "citrate leaves the cycle" without the destination pick it here.

## answer_d
α-Ketoglutarate

## explanation_d
α-Ketoglutarate is transaminated to glutamate, which is the cycle's gateway to amino acid synthesis. Since haem needs glycine — an amino acid — this looks defensible, but the carbon skeleton that enters the porphyrin ring comes from succinyl-CoA, not from α-ketoglutarate.

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## main_concept
CON-FND-8ADE222FBB57B2

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## question_only_for
[clear]

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## resource_ids
[clear]

## learning_objective
Explain what amphibolic means, and match each cycle intermediate that leaves the cycle to the anabolic pathway it feeds.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 10, file page 88. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p88-q10. correctSource, verbatim: "printed key (p89)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-4050113B1081

## title
The following TCA cycle intermediate is used for the formation of amino acids

## question
The following TCA cycle intermediate is used for the formation of amino acids

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Citric acid

## explanation_a
Citrate leaves for lipid synthesis: exported to the cytosol and split by ATP-citrate lyase, it supplies the acetyl-CoA from which fatty acids and cholesterol are built. Different exit, different destination.

## answer_b
Malic acid

## explanation_b
Malate's anabolic role is to be decarboxylated to pyruvate by malic enzyme, producing NADPH. Note that malate's neighbour oxaloacetate *is* transaminated, to aspartate — so a student who is thinking of the four-carbon end of the cycle is one step away from a right answer.

## answer_c
Isocitric acid

## explanation_c
Isocitrate is a transient intermediate between aconitase and isocitrate dehydrogenase and has no anabolic exit of its own. It is offered because it sits immediately before the correct answer in the sequence.

## answer_d
α-ketoglutaric acid

## explanation_d
**α-Ketoglutarate** is converted by aminotransferase into **glutamate**, and glutamate is the hub of amino acid metabolism: it is itself an amino acid, and by transamination it passes its amino group on to other keto acids to make the rest. That single reaction is the cycle's main door into protein metabolism, and it runs both ways — which is also how glucogenic amino acids re-enter the cycle when they are being burned for fuel. Two related exits are worth holding beside it: oxaloacetate is transaminated by AST to aspartate, and succinyl-CoA leaves for haem synthesis.

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## main_concept
CON-FND-8ADE222FBB57B2

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## question_only_for
[clear]

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## resource_ids
[clear]

## learning_objective
Explain what amphibolic means, and match each cycle intermediate that leaves the cycle to the anabolic pathway it feeds.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 11, file page 88. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p88-q11. correctSource, verbatim: "none".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Answer key recovered by reading the printed key table on file page 89, which gives 11. d. The extraction recorded correct: null with correctSource "none".

---

# Item

## id
QM-103-CF3DA651CF14

## title
The citric acid cycle doesn't provide energy for:

## question
The citric acid cycle doesn't provide energy for:

## subject
haem

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
liver

## explanation_a
The liver is metabolically among the most active tissues in the body and runs a full citric acid cycle; it is also where the cycle's intermediates are most heavily drawn on for gluconeogenesis and lipogenesis.

## answer_b
RBCs

## explanation_b
The mature red blood cell has **no mitochondria**, and every enzyme of the citric acid cycle is mitochondrial — in the matrix, except for succinate dehydrogenase in the inner membrane. With no mitochondrion there is no cycle, no respiratory chain and no oxidative phosphorylation, so the red cell's entire ATP supply comes from glycolysis, by substrate level phosphorylation at phosphoglycerate kinase and pyruvate kinase. Two consequences follow that the exam tests elsewhere. Glucose is the red cell's only fuel in every condition, fed or fasting, which is part of why gluconeogenesis exists. And a defect in either substrate-level step — pyruvate kinase deficiency is the example — leaves the cell with no net ATP at all and it haemolyses.

## answer_c
Brain

## explanation_c
The brain is if anything the opposite case: it is highly dependent on oxidative metabolism and is the tissue most quickly damaged when the cycle or the chain fails, as in congenital pyruvate dehydrogenase deficiency.

## answer_d
Muscle

## explanation_d
Muscle runs the cycle continuously, and calcium released during contraction actively stimulates its three key enzymes to supply the working fibre with ATP.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-HEM-095C9C97B56CCA

## concept_ids
CON-FND-BCCBDEC637795A

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
6

## clinical_relevance
0.7

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT

## resource_ids
[clear]

## learning_objective
Explain why glycolysis is the red cell’s only source of ATP, and what follows from the absence of mitochondria.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 12, file page 88. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p88-q12. correctSource, verbatim: "printed key (p89)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-59DBCD2428E7

## title
Fluoroacetate may inhibit which of the following TCA cycle enzymes?

## question
Fluoroacetate may inhibit which of the following TCA cycle enzymes?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Aconitase enzyme

## explanation_a
Fluoroacetate is a toxic compound used as a rodenticide. In the body it is converted to **fluorocitrate**, and fluorocitrate is what inhibits **aconitase** — the enzyme that isomerises citrate to isocitrate. The mechanism is worth following because it explains the biochemical picture: the block sits one step past citrate, so citrate accumulates behind it. Two neighbouring facts are commonly confused with this one and should be kept apart. Arsenic inhibits α-ketoglutarate dehydrogenase, by complexing the thiol groups of lipoic acid. And **fluoride** — a different substance entirely — inhibits enolase in glycolysis, which is why sodium fluoride goes into a blood tube before a glucose measurement.

## answer_b
Isocitrate dehydrogenase

## explanation_b
Isocitrate dehydrogenase is the step immediately after aconitase, and it is a key regulatory enzyme, but nothing in this chapter poisons it. It picks the student who knows the block is somewhere near citrate but not exactly where.

## answer_c
α-Ketoglutarate dehydrogenase

## explanation_c
It is the answer to the *other* poison question in this chapter. α-Ketoglutarate dehydrogenase is inhibited by arsenic compounds. Swapping the two poisons is the commonest error here, and the question book sets both to find out whether they have been learned as a pair.

## answer_d
Citrate synthase

## explanation_d
Citrate synthase makes the citrate; fluorocitrate acts on the enzyme that consumes it. If citrate synthase were the target, citrate would fall rather than accumulate, which is the opposite of what happens.

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## main_concept
CON-FND-F9CE11670992CE

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.55

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## question_only_for
[clear]

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## resource_ids
[clear]

## learning_objective
Match fluoroacetate and arsenic to the cycle enzyme each inhibits, and give the mechanism by which arsenic does it.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 13, file page 88. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p88-q13. correctSource, verbatim: "printed key (p89)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
OCR repair: the extraction appended the running footer "—— TCA Cycle 82 =" to option d. Removed; the printed option is "Citrate synthase".

---

# Item

## id
QM-103-BA147050A5A3

## title
The TCA cycle enzyme "α-ketoglutarate dehydrogenase" is inhibited by which of the following compounds?

## question
The TCA cycle enzyme "α-ketoglutarate dehydrogenase" is inhibited by which of the following compounds?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Fluoride

## explanation_a
It belongs to a different pathway. Fluoride inhibits **enolase**, in glycolysis, by binding the magnesium in its active site — which is why sodium fluoride is added to blood samples before glucose estimation. The similarity of the names fluoride and fluoroacetate is exactly what this option set is testing.

## answer_b
Iodoacetate

## explanation_b
It too belongs to glycolysis. Iodoacetate inhibits glyceraldehyde 3-phosphate dehydrogenase by blocking the SH group in its active site — the same target arsenic attacks there, which is why the two are listed together in the glycolysis chapter.

## answer_c
Arsenic

## explanation_c
**Arsenic compounds** inhibit the α-ketoglutarate dehydrogenase complex by forming a stable complex with the **thiol groups of lipoic acid**, making that cofactor unavailable. The mechanism is worth holding because it predicts the rest of the clinical picture: lipoate is shared by three enzyme complexes, so arsenic also blocks pyruvate dehydrogenase and the branched-chain keto acid dehydrogenase. Blocking pyruvate dehydrogenase is why arsenic poisoning raises lactate — pyruvate cannot go on to acetyl-CoA and is diverted to lactate instead.

## answer_d
Fluoroacetate

## explanation_d
It is the paired poison. Fluoroacetate is converted in the body to fluorocitrate, which inhibits **aconitase**, not α-ketoglutarate dehydrogenase. The two cycle poisons and their two enzymes should be learned as a matched pair, because the question book asks them in both directions.

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## main_concept
CON-FND-F9CE11670992CE

## concept_ids
CON-FND-229C78C9EB0E78

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.55

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## question_only_for
[clear]

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## resource_ids
[clear]

## learning_objective
Match fluoroacetate and arsenic to the cycle enzyme each inhibits, and give the mechanism by which arsenic does it.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Tricarboxylic Acid Cycle (TCA)", printed question 14, file page 89. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 89.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p89-q14. correctSource, verbatim: "printed key (p89)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-0F6E26B1684B

## title
After digestion of a piece of cake that contains flour, milk, and sucrose as its primary ingredients, the major carbohydrate products entering the blood are which one of the following?

## question
After digestion of a piece of cake that contains flour, milk, and sucrose as its primary ingredients, the major carbohydrate products entering the blood are which one of the following?

## subject
gi

## status
Draft

## owner
Claude

## vignette
A piece of cake is made with flour, milk and sucrose as its primary ingredients — that is, with starch, lactose and sucrose.

## format
single best answer

## correct_answer
D

## answer_a
Glucose and lactose

## explanation_a
Because lactose is a disaccharide and disaccharides are never absorbed. Lactose is split at the brush border into glucose and galactose, and it is those two that cross into blood.

## answer_b
Galactose and sucrose

## explanation_b
The same reason applies here: sucrose is a disaccharide. It is split into glucose and fructose before absorption, so sucrose itself never appears in the portal blood.

## answer_c
Sucrose and glucose

## explanation_c
Half of this answer is right and half is a disaccharide, which is the commonest shape of error here: a student names the products of one sugar correctly and forgets to finish digesting the others.

## answer_d
Glucose, fructose, and galactose

## explanation_d
Digestion of carbohydrate starts in the mouth, continues in the stomach and finishes in the small intestine, and **the end products are mainly glucose, galactose and fructose** — only monosaccharides are absorbed. Work the meal through and every product is accounted for: starch gives glucose, lactose gives glucose and galactose, sucrose gives glucose and fructose. So all three monosaccharides appear, and no disaccharide does. This is worth doing as a derivation rather than as recall, because the same reasoning answers the next question in the book — if the disaccharidases fail, what accumulates is the *disaccharides*, and they appear in the stool rather than the blood.

## topic
Carbohydrate metabolism

## subtopic
Introduction to Carbohydrate Metabolism

## main_concept
CON-GIT-E43BAB1EBDEBE6

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
4

## clinical_relevance
0.6

## academic_relevance
0.7

## exam_weight_by_year
KAU_Y1=0.4

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Introduction to Carbohydrate Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the three monosaccharides that enter the blood after a mixed carbohydrate meal, and predict what appears in the stool when the brush-border disaccharidases are deficient.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 1, file page 90. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p90-q1. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-B24AAA040B7B

## title
After eating a bowl of milk and oatmeal sweetened with table sugar, this patient will have higher levels of which one of the following?

## question
After eating a bowl of milk and oatmeal sweetened with table sugar, this patient will have higher levels of which one of the following?

## subject
gi

## status
Draft

## owner
Claude

## vignette
A patient has a genetic defect that causes intestinal epithelial cells to produce disaccharidases of much lower activity than normal. He eats a bowl of milk and oatmeal sweetened with table sugar — that is, lactose, starch and sucrose.

## format
single best answer

## correct_answer
A

## answer_a
Maltose, sucrose, and lactose in the stool

## explanation_a
The brush-border disaccharidases catalyse the *last* step of carbohydrate digestion, and only monosaccharides can be absorbed. If those enzymes are deficient, the disaccharides are never split: maltose from starch digestion, sucrose from the table sugar and lactose from the milk all remain in the lumen and pass into the stool. Note that the meal has to be traced through two stages to answer this — amylase is unaffected, so starch is still broken down normally *to maltose*, and it is at that point that the process halts. The osmotic load of the unabsorbed disaccharides, and their fermentation by colonic bacteria, are what produce the diarrhoea and bloating of a clinical disaccharidase deficiency.

## answer_b
Starch in the stool

## explanation_b
This is the option that catches a student who has not asked which enzyme is missing. Salivary and pancreatic amylase are not disaccharidases and are working normally, so starch is digested as usual — to maltose and other small oligosaccharides. The block is one step further on.

## answer_c
Galactose and fructose in the blood

## explanation_c
It is the opposite of what happens. Galactose and fructose are released only when lactose and sucrose are split, which is exactly what cannot happen here. Their blood levels would fall, not rise.

## answer_d
Glucose in the stool

## explanation_d
Free glucose in the diet is absorbed normally, and glucose released from disaccharides is not released at all. Choosing this suggests a general sense that "sugar ends up in the stool" without tracing which sugar.

## topic
Carbohydrate metabolism

## subtopic
Introduction to Carbohydrate Metabolism

## main_concept
CON-GIT-E43BAB1EBDEBE6

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
4

## clinical_relevance
0.6

## academic_relevance
0.7

## exam_weight_by_year
KAU_Y1=0.4

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Introduction to Carbohydrate Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the three monosaccharides that enter the blood after a mixed carbohydrate meal, and predict what appears in the stool when the brush-border disaccharidases are deficient.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 2, file page 90. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p90-q2. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-09BB488D1D5F

## title
Which of the Following Glucose Transporters (GLUTs) is Important in Insulin-Dependent Glucose Uptake?

## question
Which of the Following Glucose Transporters (GLUTs) is Important in Insulin-Dependent Glucose Uptake?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
GLUT1

## explanation_a
GLUT-1 is a constitutive transporter that supplies basal glucose to tissues such as the red cell and the blood–brain barrier. It works whatever the insulin level, which is precisely why those tissues never go short.

## answer_b
GLUT2

## explanation_b
It is the most attractive wrong answer, because GLUT-2 sits on the pancreatic β-cell — the cell that secretes insulin. But GLUT-2 is not insulin *dependent*: it takes glucose up rapidly in proportion to the blood level, in liver, kidney, β-cells and the basal border of the enterocyte. It is the sensor arm of the system, not the effector arm.

## answer_c
GLUT3

## explanation_c
GLUT-3 is another constitutive transporter, and like GLUT-1 it is insulin independent. It is offered to catch a student choosing by number rather than by tissue.

## answer_d
GLUT4

## explanation_d
**GLUT-4**, in heart, skeletal muscle and adipose tissue, is the only insulin-dependent glucose transporter. Insulin promotes its translocation from an intracellular pool to the outer cell membrane, increasing the number of transporters at the surface and so the rate of uptake; in the absence of insulin those transporters are endocytosed back into the pool and uptake falls **regardless of the extracellular glucose concentration**. That last clause is the clinically important part: it is why an untreated type 1 diabetic can have a very high blood glucose and muscle that is nevertheless starved of it, and why exercise — which mobilises GLUT-4 through a calcium-dependent route — lowers blood glucose even when insulin is absent.

## topic
Carbohydrate metabolism

## subtopic
Introduction to Carbohydrate Metabolism

## main_concept
CON-FND-E9C3C98FA0388C

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
6

## clinical_relevance
0.75

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Introduction to Carbohydrate Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the insulin-dependent glucose transporter and its tissues, and explain how glucosuria can occur in a person who is not diabetic.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 3, file page 90. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p90-q3. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
OCR repair: the extraction read option a as "GLUTI". Repaired to "GLUT1" from file page 90, where the printed option is "GLUT1".

---

# Item

## id
QM-103-18FCD38AB30C

## title
This patient's glucosuria is most probably caused by a deficiency in which of the following?

## question
This patient's glucosuria is most probably caused by a deficiency in which of the following?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A 22-year-old soldier collapses from dehydration during manoeuvres in the desert and is sent to hospital. Investigations reveal a high level of glucose in the urine. Further tests determine that he is not diabetic.

## format
single best answer

## correct_answer
D

## answer_a
GLUT 2

## explanation_a
GLUT-2 handles glucose uptake into liver, kidney and β-cells in proportion to the blood level; it is not the tubular reabsorption transporter, and a defect in it would not spill glucose into urine at a normal blood glucose.

## answer_b
GLUT 4

## explanation_b
GLUT-4 is the insulin-dependent transporter of muscle, heart and fat. A defect there would impair peripheral uptake and raise the blood glucose — which is the diabetic mechanism the vignette has explicitly excluded.

## answer_c
SGLT1

## explanation_c
It is the near-miss the question is built on. SGLT-1 is a sodium-dependent cotransporter, but it is present mainly in the **small intestine**, where it absorbs glucose from the lumen at two sodium to one glucose, and only to a small extent in the kidney. A defect in it causes malabsorption, not glucosuria.

## answer_d
SGLT2

## explanation_d
**SGLT-2** sits primarily in the proximal renal tubule and accomplishes about **90% of the reabsorption of filtered glucose**, at one sodium to one glucose. If it is deficient, glucose is lost in the urine even though the blood glucose is entirely normal — which is what the vignette is telling you when it says the patient is not diabetic. The book classifies this as **normoglycaemic or renal glucosuria**, and distinguishes it from hyperglycaemic glucosuria, which occurs only when the blood glucose exceeds the renal threshold of 180 mg/dL. Two clinical anchors are worth carrying: pregnancy also lowers the renal threshold and can produce the same finding, and the SGLT-2 inhibitors used in type 2 diabetes work by reproducing this defect deliberately.

## topic
Carbohydrate metabolism

## subtopic
Introduction to Carbohydrate Metabolism

## main_concept
CON-FND-E9C3C98FA0388C

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Diagnosis

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
6

## clinical_relevance
0.75

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Introduction to Carbohydrate Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the insulin-dependent glucose transporter and its tissues, and explain how glucosuria can occur in a person who is not diabetic.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 4, file page 90. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p90-q4. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-129ED1638385

## title
The conversion of glucose to glucose 6-phosphate (via glucokinase) is induced by………. and the conversion of glucose-6-phosphate to glucose (via glucose 6-phosphatase) is activated during ………….

## question
The conversion of glucose to glucose 6-phosphate (via glucokinase) is induced by………. and the conversion of glucose-6-phosphate to glucose (via glucose 6-phosphatase) is activated during ………….

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Insulin; Feeding

## explanation_a
The second half is the problem. Insulin is right as the inducer of glucokinase, but glucose 6-phosphatase releases free glucose into the blood, and that is the last thing the body wants after a meal. The two halves of this answer pull in the same direction, when the enzymes pull in opposite ones.

## answer_b
Glucagon; Feeding

## explanation_b
Both halves are mistaken here. Glucagon *represses* glucokinase rather than inducing it, and feeding is the wrong state for glucose 6-phosphatase. This option is the exact inverse of the truth.

## answer_c
Insulin; Fasting

## explanation_c
The pair is deliberately opposed. Glucokinase traps glucose inside the hepatocyte as glucose 6-phosphate, which is a fed-state job — so it is **induced by insulin**, and repressed by glucagon. Glucose 6-phosphatase does the reverse reaction, releasing free glucose into the blood, which is a fasting-state job — so it is **activated during fasting**. The question is testing whether a student has read the two enzymes as a futile-cycle pair whose members must never be active together, rather than as two isolated facts. The same logic recurs at PFK-1 against fructose 1,6-bisphosphatase, and at pyruvate kinase against pyruvate carboxylase with PEPCK.

## answer_d
Glucagon; Fasting

## explanation_d
The first half is the problem. Fasting is right for glucose 6-phosphatase, but glucagon represses glucokinase; it does not induce it. A student who picks this has understood the fasting half and applied the same hormone to both enzymes.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-FND-EA1BA37ACB643B

## concept_ids
CON-END-0B615572003514

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Contrast hexokinase and glucokinase by site, Km, Vmax, product inhibition and hormonal control, and predict which is active at a given blood glucose.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 5, file page 90. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p90-q5. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
OCR repair: the extraction read the stem as "is induced evens ata and". Repaired from file page 90, which prints "is induced by………. and the conversion of glucose-6-phosphate to glucose (via glucose 6-phosphatase) is activated during ………….".

---

# Item

## id
QM-103-6F0B5E64A3CF

## title
Glucokinase is an isoenzyme of hexokinase that has high Km and Vmax. Which of the following organs expresses glucokinase?

## question
Glucokinase is an isoenzyme of hexokinase that has high Km and Vmax. Which of the following organs expresses glucokinase?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Heart

## explanation_a
The heart uses hexokinase, with its low Km and high affinity, because cardiac muscle must be able to take up glucose even when the blood level is low. It cannot afford an enzyme that only works after meals.

## answer_b
Muscle

## explanation_b
For the same reason. Skeletal muscle uses hexokinase and is regulated by product inhibition from glucose 6-phosphate — a control glucokinase does not have.

## answer_c
Liver

## explanation_c
Glucokinase is expressed in the **liver** and in the pancreatic β-cells. Its high Km means a *low* affinity for glucose, so it is largely idle at fasting concentrations and only becomes active when portal glucose is high after a meal; its high Vmax then lets the liver clear a large load quickly. That kinetic profile is the point of the enzyme: it makes the liver a glucose buffer that takes up the excess and leaves the rest for the tissues. In the β-cell the same kinetics make glucokinase the glucose sensor that sets the rate of insulin secretion. Note that a high Km means a low affinity — reading it the other way round makes the whole design look backwards.

## answer_d
Brain

## explanation_d
It would be dangerous if it were true. The brain depends on glucose in almost all conditions and uses hexokinase with its high affinity, so that uptake continues even when blood glucose falls.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-FND-EA1BA37ACB643B

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Contrast hexokinase and glucokinase by site, Km, Vmax, product inhibition and hormonal control, and predict which is active at a given blood glucose.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 6, file page 91. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p91-q6. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-9237968F5DF7

## title
In glycolysis, the conversion of 1 mol of fructose-1,6-bisphosphate to 2 mol of pyruvate results in net production of

## question
In glycolysis, the conversion of 1 mol of fructose-1,6-bisphosphate to 2 mol of pyruvate results in net production of

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
1 mol NAD⁺ and 2 mol of ATP

## explanation_a
It names the wrong species: the pathway *consumes* NAD⁺ and produces NADH at the glyceraldehyde 3-phosphate dehydrogenase step. It also halves the ATP.

## answer_b
1 mol NADH and 1 mol of ATP

## explanation_b
These are the figures for a single triose, and fructose 1,6-bisphosphate gives two of them. It catches a student who has correctly worked out one half of the molecule and forgotten to double.

## answer_c
2 mol NADH and 2 mol of ATP

## explanation_c
This is the answer for a whole glucose. Two ATP are spent in phase I, before fructose 1,6-bisphosphate exists, so the *net* for glucose is two — but the question starts after that expenditure, so nothing has been spent.

## answer_d
2 mol NADH and 4 mol of ATP

## explanation_d
The reason is where the question starts. Phase II of glycolysis runs once per triose, and fructose 1,6-bisphosphate gives two of them, so everything doubles: glyceraldehyde 3-phosphate dehydrogenase yields **2 NADH**, phosphoglycerate kinase yields 2 ATP and pyruvate kinase yields 2 ATP, making **4 ATP**. Crucially the two ATP that glucokinase and PFK-1 spend were spent *before* fructose 1,6-bisphosphate was formed, so from this starting point nothing is deducted. That is the whole trick of the question: for a glucose the net is 2 ATP and 2 NADH, and for a fructose 1,6-bisphosphate it is 4 ATP and 2 NADH.

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## main_concept
CON-FND-0F4A45886203EF

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
8

## clinical_relevance
0.35

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Calculate the ATP yield of glucose oxidation under aerobic and anaerobic conditions, and adjust the figure for glucose entering from glycogen.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 7, file page 91. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p91-q7. correctSource, verbatim: "none".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Answer key recovered by reading the printed key table on file page 103, which gives 7. d. The extraction recorded correct: null with correctSource "none". OCR repair: option a's "1 mol NAD*" is written NAD⁺.

---

# Item

## id
QM-103-A9B5BAA590A4

## title
Which of the following enzymes catalyzes an energy-utilizing step of glycolysis:

## question
Which of the following enzymes catalyzes an energy-utilizing step of glycolysis:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Glucokinase

## explanation_a
Glycolysis divides into two phases, and the first — the **energy utilisation phase** — spends two ATP. Glucokinase (or hexokinase) spends the first to make glucose 6-phosphate, trapping the sugar inside the cell, and phosphofructokinase-1 spends the second to make fructose 1,6-bisphosphate. Only after aldolase has split that molecule does the energy production phase begin. Holding the two phases apart is what makes the yield arithmetic derivable rather than memorised: two spent, four made, net two.

## answer_b
Lactate dehydrogenase

## explanation_b
Lactate dehydrogenase neither spends nor makes ATP; it reduces pyruvate to lactate in order to regenerate NAD⁺. Students who assume it must cost something because it happens "at the end" are looking for an energy transaction where there is none.

## answer_c
Phosphoglycerate kinase

## explanation_c
It is one of the two ATP-*producing* steps. Phosphoglycerate kinase transfers the high-energy phosphate of 1,3-bisphosphoglycerate to ADP by substrate level phosphorylation. The word "kinase" is what misleads here — a kinase moves a phosphate, and the direction depends on the reaction, not on the name.

## answer_d
Pyruvate kinase

## explanation_d
It is the other ATP-producing step, taking the high-energy phosphate of 2-phosphoenolpyruvate. Two of the four options are named "kinase" and produce ATP while one is named "kinase" and consumes it, which is exactly the discrimination being tested.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-FND-853096A349FFBD

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
7

## clinical_relevance
0.35

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Name the committed step of glycolysis with its enzyme and product, list the three irreversible reactions, and give the substrate of aldolase.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 8, file page 91. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p91-q8. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-3D651F1AE566

## title
Which of the following statements best describes an aspect of glycolysis?

## question
Which of the following statements best describes an aspect of glycolysis?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
ATP is formed by oxidative phosphorylation only

## explanation_a
It is the reverse of the truth. The ATP made *by glycolysis itself* is made entirely by substrate level phosphorylation, at phosphoglycerate kinase and pyruvate kinase — which is exactly why glycolysis still works without oxygen and why a red cell can live on it.

## answer_b
2 ATPs are utilized in the beginning of the pathway

## explanation_b
Phase I of glycolysis spends **two ATP** before any is recovered: one at glucokinase or hexokinase to make glucose 6-phosphate, and one at phosphofructokinase-1 to make fructose 1,6-bisphosphate. Those two are the investment that makes the rest possible — phosphorylating the sugar traps it in the cell, and phosphorylating it twice makes a symmetrical molecule that aldolase can split into two phosphorylated trioses. Phase II then makes four ATP, two per triose, so the net gain is two. Every ATP question in this chapter is answered by keeping "two spent, four made" in mind and reading carefully whether the question asks for the gross figure or the net one.

## answer_c
Pyruvate kinase catalyzes the committed step

## explanation_c
The committed step is **PFK-1**, because it is the first irreversible reaction unique to glycolysis; glucose 6-phosphate can still leave for glycogen or the pentose phosphate pathway, so nothing is committed before it. Pyruvate kinase is irreversible and regulated, but it comes at the very end, long after the commitment was made.

## answer_d
6 CO2 molecules are produced from oxidation of one glucose molecule

## explanation_d
Glycolysis produces no CO2 at all — it stops at pyruvate. The six CO2 belong to the complete oxidation of glucose, released one at pyruvate dehydrogenase and two in the citric acid cycle, per pyruvate.

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## main_concept
CON-FND-0F4A45886203EF

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
8

## clinical_relevance
0.35

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Calculate the ATP yield of glucose oxidation under aerobic and anaerobic conditions, and adjust the figure for glucose entering from glycogen.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 9, file page 91. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p91-q9. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-DB6EFBFE6BBD

## title
Aldolase is an enzyme whose substrate is:

## question
Aldolase is an enzyme whose substrate is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Glucose-6-phosphate

## explanation_a
Glucose 6-phosphate is the substrate of phosphohexose isomerase, which converts it to fructose 6-phosphate — two steps before aldolase acts.

## answer_b
Fructose-6-phosphate

## explanation_b
It is the near-miss. Fructose 6-phosphate is the substrate of **PFK-1**, which phosphorylates it to fructose 1,6-bisphosphate. Only then can aldolase act. The single phosphate difference is the point: a molecule with one phosphate cannot be split into two phosphorylated trioses.

## answer_c
Fructose

## explanation_c
Free fructose is a dietary sugar metabolised mainly by the liver through its own route; it is not a glycolytic intermediate and aldolase does not act on it in this pathway.

## answer_d
Fructose-1, 6-bisphosphate

## explanation_d
Aldolase A — fructose 1,6-bisphosphate aldolase — catalyses the cleavage of **fructose 1,6-bisphosphate** into two triose phosphates, glyceraldehyde 3-phosphate and dihydroxyacetone phosphate. Phosphotriose isomerase then interconverts the two, so that both carbons proceed down the pathway as glyceraldehyde 3-phosphate. This is the hinge of glycolysis: everything before it is counted per glucose, and everything after it happens twice, which is why the ATP and NADH figures of phase II are all doubled. The enzyme's full name contains its own answer, which is worth noticing.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-FND-853096A349FFBD

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
7

## clinical_relevance
0.35

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Name the committed step of glycolysis with its enzyme and product, list the three irreversible reactions, and give the substrate of aldolase.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 10, file page 91. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p91-q10. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-4852E60FA277

## title
Which of the following is used while estimating blood glucose to inhibit glycolysis?

## question
Which of the following is used while estimating blood glucose to inhibit glycolysis?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Oxalate

## explanation_a
Oxalate is an anticoagulant — it chelates calcium and stops the sample clotting. It does nothing to the glycolytic enzymes, so the red cells in the tube go on consuming glucose and the measured value falls.

## answer_b
Citrate

## explanation_b
For the same reason. Citrate is also a calcium-chelating anticoagulant. There is an irony here: citrate is an allosteric *inhibitor* of PFK-1 inside a cell, but at the concentrations in a blood tube and from outside the cell it is not what preserves the sample.

## answer_c
Na Fluoride

## explanation_c
Sodium fluoride is added to the tube because **fluoride inhibits enolase irreversibly**, by binding the magnesium in its active site. Enolase sits near the end of glycolysis, so blocking it halts the pathway and stops the red cells in the sample from consuming the glucose you are trying to measure. Without it, the glucose in a tube left standing falls steadily and the laboratory reports a value lower than the patient's. This is the practical face of a piece of pure biochemistry, and it is the reason a fluoride–oxalate tube contains both: the fluoride preserves the glucose and the oxalate stops the clot.

## answer_d
Heparin

## explanation_d
Heparin is an anticoagulant that works by potentiating antithrombin, and again it leaves glycolysis untouched. Three of the four options are anticoagulants, which is the point of the question — the tube for glucose is chosen for a metabolic reason, not a haematological one.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-FND-0D6BFD870813B7

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Investigation

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
5

## clinical_relevance
0.7

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Match fluoride and arsenic to the glycolytic enzyme each inhibits, and explain why a glucose sample is collected into a fluoride tube.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 11, file page 91. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p91-q11. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-5A1341547331

## title
Which among the following glycolytic enzymes is inhibited during arsenate poisoning?

## question
Which among the following glycolytic enzymes is inhibited during arsenate poisoning?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Glyceraldehyde-3-phosphate dehydrogenase

## explanation_a
**Glyceraldehyde 3-phosphate dehydrogenase** is inhibited by arsenic and by iodoacetate, both of which block the SH group in its active site. That target is worth linking across chapters: arsenic attacks thiol groups wherever it finds them, which is also how it inhibits the lipoate-dependent complexes — pyruvate dehydrogenase, α-ketoglutarate dehydrogenase and the branched-chain keto acid dehydrogenase. So arsenic poisoning is not one lesion but several, and the raised lactate it produces comes from the pyruvate dehydrogenase block rather than from this one.

## answer_b
3-phosphoglycerate mutase

## explanation_b
Phosphoglycerate mutase simply moves the phosphate from carbon 3 to carbon 2 and has no reactive thiol at its active site; no inhibitor of it is taught in this course.

## answer_c
Enolase

## explanation_c
It is the paired answer to the *other* inhibitor question in this chapter. Enolase is inhibited by **fluoride**, which binds its active-site magnesium — the reason fluoride goes into a glucose tube. Swapping the two inhibitors is the commonest error, and the book sets both questions to find it.

## answer_d
Pyruvate kinase

## explanation_d
Pyruvate kinase is heavily regulated — inhibited by ATP, activated by fructose 1,6-bisphosphate, and phosphorylated to inactivity by protein kinase A under glucagon — but it is not the target of arsenic.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-FND-0D6BFD870813B7

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
5

## clinical_relevance
0.7

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Match fluoride and arsenic to the glycolytic enzyme each inhibits, and explain why a glucose sample is collected into a fluoride tube.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 12, file page 91. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p91-q12. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-06A3298AAFFC

## title
Starting with one molecule of glyceraldehyde-3-phosphate and synthesizing one molecule of pyruvate, the net yield of ATP and NADH would be which of the following?

## question
Starting with one molecule of glyceraldehyde-3-phosphate and synthesizing one molecule of pyruvate, the net yield of ATP and NADH would be which of the following?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
1 ATP, 1 NADH

## explanation_a
The ATP count is off. There are two substrate level phosphorylation steps between glyceraldehyde 3-phosphate and pyruvate, not one — phosphoglycerate kinase and pyruvate kinase — and each yields an ATP per triose.

## answer_b
1 ATP, 2 NADH

## explanation_b
The NADH count is off. Only one dehydrogenation happens on this stretch, at glyceraldehyde 3-phosphate dehydrogenase, so one NADH per triose. Two NADH is the figure for a whole glucose, which gives two trioses.

## answer_c
1 ATP, 4 NADH

## explanation_c
Both counts are off, and four NADH corresponds to nothing in the pathway. It is here to catch a student guessing rather than tracing the steps.

## answer_d
2 ATP, 1 NADH

## explanation_d
It is best derived rather than recalled. Between glyceraldehyde 3-phosphate and pyruvate there are exactly three energy events per triose: glyceraldehyde 3-phosphate dehydrogenase produces **one NADH**, phosphoglycerate kinase produces **one ATP**, and pyruvate kinase produces **one more ATP** — so 2 ATP and 1 NADH. Nothing is spent, because both ATP investments were made earlier, in phase I. Doubling this for the two trioses of one glucose gives 4 ATP and 2 NADH, which is the figure for the whole of phase II, and subtracting the two spent gives the familiar net of 2. Every version of the ATP question in this chapter is this one arithmetic read from a different starting point.

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## main_concept
CON-FND-0F4A45886203EF

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
8

## clinical_relevance
0.35

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Calculate the ATP yield of glucose oxidation under aerobic and anaerobic conditions, and adjust the figure for glucose entering from glycogen.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 13, file page 92. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p92-q13. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-893E31FE4873

## title
Which of the following products may not be made in appropriate amounts in the RBCs because of the pyruvate kinase deficiency?

## question
Which of the following products may not be made in appropriate amounts in the RBCs because of the pyruvate kinase deficiency?

## subject
haem

## status
Draft

## owner
Claude

## vignette
A young man with haemolytic anaemia is found to have pyruvate kinase deficiency in his red blood cells.

## format
single best answer

## correct_answer
D

## answer_a
Glucose

## explanation_a
A red cell never makes glucose under any circumstances — gluconeogenesis needs glucose 6-phosphatase and several mitochondrial steps, and the red cell has neither. Nothing has been lost here because nothing was there.

## answer_b
Oxaloacetate

## explanation_b
For the same reason. Oxaloacetate is made by pyruvate carboxylase, a mitochondrial enzyme, and the red cell has no mitochondria.

## answer_c
acetyl-CoA

## explanation_c
Again the premise fails. Acetyl-CoA is the product of the pyruvate dehydrogenase complex, which is mitochondrial. Options A, B and C are all products the red cell was never able to make, which is what makes them a coherent trap: they punish a student who is reasoning about a generic cell rather than about this one.

## answer_d
Lactate

## explanation_d
**Lactate** is the answer because it is the only one of the four that a red cell normally makes at all. Pyruvate kinase catalyses the last step of glycolysis, converting phosphoenolpyruvate to pyruvate; without it there is no pyruvate, and lactate dehydrogenase has no substrate. That has a second consequence worth holding: it is the lactate dehydrogenase reaction that regenerates NAD⁺ for the glyceraldehyde 3-phosphate dehydrogenase step, so the deficiency stalls the pathway twice over — no ATP from pyruvate kinase, and no NAD⁺ recycling either. The red cell, whose sole source of ATP is glycolysis, cannot maintain its membrane pumps and haemolyses.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-HEM-585B833F845F62

## concept_ids
CON-FND-403D06D1FB129F

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.8

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Explain why pyruvate kinase deficiency causes haemolysis, and state the net ATP yield and the products that fail to appear in a red cell that lacks the enzyme.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 14, file page 92. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p92-q14. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-5AA51806EEBA

## title
In the RBCs if there is a deficiency in pyruvate kinase, which of the following would be expected?

## question
In the RBCs if there is a deficiency in pyruvate kinase, which of the following would be expected?

## subject
haem

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
ADP to ATP ratios would be elevated above normal

## explanation_a
Pyruvate kinase supplies two of the four ATP that glycolysis makes at substrate level, and glycolysis is the red cell's only source of ATP. Without the enzyme the two ATP invested by hexokinase and PFK-1 are never repaid, so ATP falls, ADP accumulates, and the **ADP-to-ATP ratio rises above normal**. That is not a laboratory curiosity: the falling ATP is what stops the membrane cation pumps, and the cell loses its shape, its deformability and finally its integrity — which is the haemolysis. Read the ratio carefully in questions like this one; the same fact stated as "the ATP-to-ADP ratio would rise" would be false.

## answer_b
NADP⁺ would increase relative to NADPH

## explanation_b
NADP⁺ and NADPH belong to the pentose phosphate pathway, which branches off at glucose 6-phosphate — *upstream* of the block and quite untouched by it. If anything, glucose 6-phosphate accumulating behind the stall would push more substrate that way.

## answer_c
Ribulose 5-phosphate levels would decrease

## explanation_c
It is the same error. Ribulose 5-phosphate is a pentose phosphate pathway intermediate, again upstream of pyruvate kinase. Nothing about a block at the last step of glycolysis starves the branch that leaves at the first.

## answer_d
NADPH to NADP⁺ ratios would decrease

## explanation_d
This is the answer to a different disease. A falling NADPH-to-NADP⁺ ratio is what happens in **G6PD deficiency**, and it is why those red cells cannot regenerate reduced glutathione and lyse under oxidative stress. Both diseases give a haemolytic anaemia, which is exactly why the examiner offers this option — the two are told apart by which pathway fails and what the cell then cannot do.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-HEM-585B833F845F62

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Pathophysiology

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
6

## clinical_relevance
0.8

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Explain why pyruvate kinase deficiency causes haemolysis, and state the net ATP yield and the products that fail to appear in a red cell that lacks the enzyme.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 15, file page 92. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p92-q15. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
OCR repair: the extraction read option b as "NADP* would increase relative to NADPH" and option d as "NADPH to NADP* ratios". Repaired to the superscript plus from file page 92.

---

# Item

## id
QM-103-0BDFE58554C3

## title
In an embryo with a complete deficiency of pyruvate kinase, how many net moles of ATP are generated in the RBCs during the conversion of 1 mole of glucose through the glycolytic pathway?

## question
In an embryo with a complete deficiency of pyruvate kinase, how many net moles of ATP are generated in the RBCs during the conversion of 1 mole of glucose through the glycolytic pathway?

## subject
haem

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
0

## explanation_a
The arithmetic is the whole answer. Glycolysis spends **two** ATP in phase I, at hexokinase and PFK-1, and makes **four** in phase II, two at phosphoglycerate kinase and two at pyruvate kinase — a net of two. Remove pyruvate kinase entirely and the four becomes two, so two are made and two are spent: the **net yield is zero**. The cell can still run the pathway, but it gains nothing from it. Since the red cell has no mitochondria and no other source of ATP, a complete deficiency is incompatible with the cell's survival, which is why the real disease is a partial deficiency producing chronic haemolysis rather than an absence of red cells altogether.

## answer_b
1

## explanation_b
One would require losing only a single ATP-producing step, but pyruvate kinase acts once per triose and therefore twice per glucose. Losing it costs two ATP, not one.

## answer_c
2

## explanation_c
Two is the *normal* net yield, with pyruvate kinase intact. Choosing it means the deficiency has not been subtracted.

## answer_d
4

## explanation_d
Four is the gross production at substrate level in a normal cell, before the two spent in phase I are deducted, and before this deficiency is applied. It is the answer to a different question in this same book, which asks how many ATP are synthesised from ADP by substrate level phosphorylation.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-HEM-585B833F845F62

## concept_ids
CON-FND-0F4A45886203EF

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Pathophysiology

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
6

## clinical_relevance
0.8

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Explain why pyruvate kinase deficiency causes haemolysis, and state the net ATP yield and the products that fail to appear in a red cell that lacks the enzyme.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 16, file page 92. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p92-q16. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Suspect flag "option count": the extraction produced two options, the second reading "1 ey 2 d) 4". Repaired from file page 92, where the printed options are a) 0, b) 1, c) 2, d) 4. The printed key on file page 103 gives 16. a.

---

# Item

## id
QM-103-C53253369424

## title
How many moles of ATP are generated by the aerobic oxidation of 1 mole of glucose to 6 moles of CO2?

## question
How many moles of ATP are generated by the aerobic oxidation of 1 mole of glucose to 6 moles of CO2?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
7

## explanation_a
It is the most instructive wrong answer, because 7 is a real figure from this book — it is the net gain of **glycolysis alone** under aerobic conditions, once the five ATP from the two NADH are added to the net two. But the question asks for oxidation all the way to six CO2, which requires pyruvate dehydrogenase and two turns of the citric acid cycle as well.

## answer_b
12.5

## explanation_b
12.5 is not a total for anything; it looks like a fragment of the 2.5-per-NADH accounting. It catches a student pattern-matching on a decimal that appears in the chapter.

## answer_c
2

## explanation_c
Two is the **anaerobic** net, where the NADH is spent on lactate instead of being sent to the chain. The word "aerobic" in the stem is what distinguishes them.

## answer_d
32

## explanation_d
The book's own table totals the complete oxidation of one mole of glucose at **32 moles of ATP** aerobically, and 2 anaerobically. The itemisation is worth having: from glycolysis, +5 for two NADH through the chain, +2 at phosphoglycerate kinase, +2 at pyruvate kinase and −2 spent; from pyruvate dehydrogenase, +5 for two NADH; and from two turns of the citric acid cycle, +5 at isocitrate dehydrogenase, +5 at α-ketoglutarate dehydrogenase, +2 at succinate thiokinase, +3 for two FADH2 and +5 at malate dehydrogenase. Note that older textbooks give 36 to 38 using 3 ATP per NADH and 2 per FADH2; this course uses 2.5 and 1.5 and therefore 32.

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## main_concept
CON-FND-0F4A45886203EF

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
8

## clinical_relevance
0.35

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Calculate the ATP yield of glucose oxidation under aerobic and anaerobic conditions, and adjust the figure for glucose entering from glycogen.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 17, file page 92. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p92-q17. correctSource, verbatim: "printed key (p103) names option d, which this question does not have".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Answer key recovered by reading the printed key table on file page 103, which gives 17. d. The extraction recorded correct: null, its correctSource noting that the key named an option d the extracted question did not have. Suspect flag "option count": the extraction produced three options, the third reading "2 ad) 32". Repaired from file page 92, where the printed options are a) 7, b) 12.5, c) 2, d) 32.

---

# Item

## id
QM-103-14C5D38065C5

## title
Which one of the following is a regulatory mechanism employed by muscles for glycolysis?

## question
Which one of the following is a regulatory mechanism employed by muscles for glycolysis?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
Inhibition of PFK-1 by AMP

## explanation_a
The sign is wrong. AMP **activates** PFK-1, it does not inhibit it — a rise in AMP means the cell is short of energy, and the appropriate response is to burn more glucose. ATP is the inhibitor of PFK-1, and citrate and a low pH are the others.

## answer_b
Inhibition of hexokinase by Its product

## explanation_b
Hexokinase is the muscle's glucose-phosphorylating enzyme, and it is **allosterically inhibited by its own product, glucose 6-phosphate**. That is a genuine and characteristically muscular control: if glucose 6-phosphate is accumulating, the fibre does not need more, and phosphorylating further glucose would waste ATP and trap sugar the rest of the body could use. It is also exactly the control glucokinase lacks, which is what allows the liver to keep taking glucose up after a meal when muscle has stopped. Notice that the question says *muscles* — it is testing whether the hexokinase/glucokinase division of labour has been learned as a tissue difference rather than as two isolated enzymes.

## answer_c
Activation of pyruvate kinase when glucagon levels are elevated.

## explanation_c
Two things are off here. Glucagon acts primarily on the liver and barely on skeletal muscle, which lacks the receptor; and where it does act it **inactivates** pyruvate kinase, by raising cAMP, activating protein kinase A and phosphorylating the enzyme. The option has the tissue and the direction both wrong.

## answer_d
Inhibition of aldolase by fructose-1,6-bisphosphate

## explanation_d
Fructose 1,6-bisphosphate is aldolase's **substrate**, not an inhibitor of it, and aldolase is not a regulated step at all. Fructose 1,6-bisphosphate does have an allosteric role elsewhere — it stimulates pyruvate kinase, feeding forward down the pathway.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-FND-EA1BA37ACB643B

## concept_ids
CON-FND-853096A349FFBD

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Contrast hexokinase and glucokinase by site, Km, Vmax, product inhibition and hormonal control, and predict which is active at a given blood glucose.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 18, file page 92. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p92-q18. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-577B3C0F351F

## title
What is the committed step in glycolysis?

## question
What is the committed step in glycolysis?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
Conversion of glucose to glucose-6-phosphate

## explanation_a
This is the answer the word "first" tempts a student into. The hexokinase or glucokinase step is irreversible, but it commits the glucose to nothing: glucose 6-phosphate stands at the junction of five pathways and can still leave for glycogen synthesis, the pentose phosphate pathway or gluconeogenesis in reverse. Commitment means having nowhere else to go.

## answer_b
Conversion of fructose-6-phosphate to fructose-1,6-bisphosphate

## explanation_b
Phosphofructokinase-1 converts fructose 6-phosphate to fructose 1,6-bisphosphate, and the book calls it **the most important control site in the mammalian glycolytic pathway** because it is the **first irreversible reaction unique to glycolysis**. Both halves of that phrase matter: irreversible, so the molecule cannot go back; and unique to glycolysis, so it cannot go anywhere else either. That is why the regulation is concentrated here — PFK-1 is inhibited by ATP, by citrate (a signal that the citric acid cycle is saturated) and by a low pH (which protects an anaerobically working muscle from its own lactic acid), and activated by AMP. Recognising a committed step by these two criteria generalises: the same reasoning identifies acetyl-CoA carboxylase in fatty acid synthesis.

## answer_c
Conversion of glyceraldehydes-3-phosphate to 1,3 bisphosphoglycerate

## explanation_c
The glyceraldehyde 3-phosphate dehydrogenase step is the first energy-*yielding* reaction, producing NADH, and it is highly important — but it is reversible and not a control point.

## answer_d
Conversion of 3-phosphoglycerate to 2-phosphoglycerate

## explanation_d
Phosphoglycerate mutase merely relocates a phosphate within the molecule. It is reversible, unregulated, and the least eventful step in the pathway.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-FND-853096A349FFBD

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.35

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Name the committed step of glycolysis with its enzyme and product, list the three irreversible reactions, and give the substrate of aldolase.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 19, file page 93. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p93-q19. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-796D6303E9CE

## title
How many total molecules of ATP are synthesized from ADP (substrate level phosphorylation) via glycolysis of a single molecule of glucose?

## question
How many total molecules of ATP are synthesized from ADP (substrate level phosphorylation) via glycolysis of a single molecule of glucose?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
32

## explanation_a
32 is the yield of the *complete* oxidation of glucose to CO2 and water, which involves pyruvate dehydrogenase, the citric acid cycle and the respiratory chain. The question is confined to glycolysis and to substrate level phosphorylation.

## answer_b
2

## explanation_b
It is the trap this question is built around. Two is the **net** gain — four made minus two spent. The stem asks how many are *synthesised*, which is the gross figure. Reading "total synthesised" as "net" is the single commonest error in this chapter, and the examiner has written the stem to reward whoever notices.

## answer_c
4

## explanation_c
Glycolysis makes **four** ATP by substrate level phosphorylation per glucose: two at phosphoglycerate kinase and two at pyruvate kinase, each acting once per triose and therefore twice per glucose. Two are spent earlier, at hexokinase or glucokinase and at PFK-1, so the net gain is two — but that is a different number answering a different question. The discipline worth building here is to read whether a stem says *net*, *synthesised*, *by substrate level phosphorylation*, or *total including the chain*, because this book asks all four versions.

## answer_d
36

## explanation_d
36 belongs to the older accounting of complete glucose oxidation, which gave 3 ATP per NADH and 2 per FADH2; this book uses 2.5 and 1.5 and totals 32. Either way it is not a glycolytic substrate-level figure.

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## main_concept
CON-FND-0F4A45886203EF

## concept_ids
CON-FND-5253967A0E3786

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
8

## clinical_relevance
0.35

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Calculate the ATP yield of glucose oxidation under aerobic and anaerobic conditions, and adjust the figure for glucose entering from glycogen.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 20, file page 93. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p93-q20. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-7F606B4010CC

## title
The highest energy-yielding step in the glycolytic pathway is catalyzed by:

## question
The highest energy-yielding step in the glycolytic pathway is catalyzed by:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Glyceraldehyde-3p-dehydrogenase

## explanation_a
The answer turns on counting the ATP each step is ultimately worth rather than the ATP each step makes directly. Glyceraldehyde 3-phosphate dehydrogenase makes no ATP at all — it produces **NADH**, one per triose and therefore two per glucose. Passed through the respiratory chain at 2.5 ATP each, those two NADH are worth **five ATP**, which is more than either substrate-level step yields: phosphoglycerate kinase and pyruvate kinase give two apiece. The book's own energy table lays this out explicitly, crediting +5 to glyceraldehyde 3-phosphate dehydrogenase against +2 for each kinase. The lesson generalises across the whole of metabolism — the dehydrogenases, not the kinases, are where most of the energy is captured.

## answer_b
Phosphoglycerate kinase

## explanation_b
Phosphoglycerate kinase yields two ATP per glucose by substrate level phosphorylation. It is chosen by students who read "energy-yielding" as "ATP-forming" and stop there.

## answer_c
Pyruvate kinase

## explanation_c
For the same reason: two ATP per glucose. It is also the most heavily regulated step of the pathway, which makes it feel important, but regulation and yield are different things.

## answer_d
Phosphoglycerate phosphoglucomutase

## explanation_d
The name in the printed option is a conflation of two enzymes. Phosphoglycerate mutase moves a phosphate within 3-phosphoglycerate and yields no energy; phosphoglucomutase belongs to glycogen metabolism, converting glucose 1-phosphate to glucose 6-phosphate.

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## main_concept
CON-FND-0F4A45886203EF

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
8

## clinical_relevance
0.35

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Calculate the ATP yield of glucose oxidation under aerobic and anaerobic conditions, and adjust the figure for glucose entering from glycogen.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 21, file page 93. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p93-q21. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-70CD618712AC

## title
Erythrocytes Undergo Glycolysis for Production of ATP. The Deficiency of which enzyme leads to hemolytic anemia:

## question
Erythrocytes Undergo Glycolysis for Production of ATP. The Deficiency of which enzyme leads to hemolytic anemia:

## subject
haem

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Glucokinase

## explanation_a
The premise fails: glucokinase is expressed only in liver and pancreatic β-cells. A red cell uses hexokinase, so it cannot be deficient in an enzyme it does not have.

## answer_b
Phosphofructokinase

## explanation_b
This does not fit here. PFK-1 deficiency does exist and does cause a glycogen storage disorder with exercise intolerance, but it is not the enzyme this course pairs with red-cell haemolysis, and the book teaches pyruvate kinase in the red cell.

## answer_c
Phosphoglucomutase

## explanation_c
Phosphoglucomutase belongs to glycogen metabolism, interconverting glucose 1-phosphate and glucose 6-phosphate. It is not a glycolytic enzyme at all, which the stem's own wording rules out.

## answer_d
Pyruvate Kinase

## explanation_d
**Pyruvate kinase** catalyses the last step of glycolysis, and glycolysis is the red cell's only source of ATP, because it has no mitochondria and therefore no citric acid cycle and no respiratory chain. Pyruvate kinase supplies two of the four substrate-level ATP, so losing it takes the net yield from two to zero: the cell can no longer power the cation pumps that maintain its shape and volume, and it haemolyses. Two other haemolytic mechanisms are worth keeping distinct from this one. In **G6PD deficiency** the ATP is fine but the NADPH is not, so the cell cannot regenerate reduced glutathione and lyses under oxidative stress. In hereditary spherocytosis the fault is structural. All three present as haemolytic anaemia and are told apart by mechanism.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-HEM-585B833F845F62

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Pathophysiology

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Clinical

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
6

## clinical_relevance
0.8

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Explain why pyruvate kinase deficiency causes haemolysis, and state the net ATP yield and the products that fail to appear in a red cell that lacks the enzyme.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 22, file page 93. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p93-q22. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-5F9C803A660B

## title
In absence of oxygen, pyruvate is converted into lactate in muscles because:

## question
In absence of oxygen, pyruvate is converted into lactate in muscles because:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Lactate is the substrate from the downstream pathway.

## explanation_a
Lactate is a dead end in the muscle — there is no downstream pathway for it there. Its only fate is to leave the cell and travel to the liver, where the Cori cycle turns it back into glucose. It is an export, not a substrate.

## answer_b
Lactate acts as a substrate for the formation of amino acid

## explanation_b
The pyruvate-to-amino-acid route is transamination to **alanine**, not reduction to lactate, and that is a separate fate with a separate enzyme. Alanine is indeed how muscle exports nitrogen to the liver, but it is not what this reaction does.

## answer_c
During the product of lactate two ATP are produced

## explanation_c
It is the most tempting wrong answer, because anaerobic glycolysis does net two ATP. But those two come from phosphoglycerate kinase and pyruvate kinase, upstream; the lactate dehydrogenase reaction itself yields **no ATP at all**. It is what makes the two possible, not what produces them.

## answer_d
During lactate formation, NADH is reconverted into NAD

## explanation_d
It is the point of the whole reaction. Glyceraldehyde 3-phosphate dehydrogenase requires **NAD⁺**, and a cell holds very little of it, so glycolysis can only continue for as long as NADH is being reoxidised. Aerobically the respiratory chain does that job. Without oxygen the chain stops, and lactate dehydrogenase steps in: it reduces pyruvate to lactate using the NADH that the dehydrogenase step produced, returning NAD⁺ to the pathway. The lactate is a by-product; the NAD⁺ is the purpose. That is why this reaction is indispensable in the red cell, which has no mitochondria at all, and in muscle during severe prolonged exercise when oxygen is relatively deficient.

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## main_concept
CON-FND-403D06D1FB129F

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.6

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.55

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Explain why pyruvate is reduced to lactate when oxygen is absent, naming the enzyme and the cofactor that has to be regenerated.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 23, file page 93. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p93-q23. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-7845CA32547B

## title
Conversion of pyruvate to oxaloacetate is an example of which of the following reactions:

## question
Conversion of pyruvate to oxaloacetate is an example of which of the following reactions:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Oxidation

## explanation_a
No electrons are lost: pyruvate and oxaloacetate are at the same oxidation level, and no coenzyme is reduced in the reaction. It picks a student who assumes that any energy-requiring step must be an oxidation.

## answer_b
Decarboxylation

## explanation_b
It is the exact opposite. A decarboxylation removes a carbon as CO2; this reaction **adds** one. The confusion is understandable, because pyruvate's other mitochondrial fate — the pyruvate dehydrogenase reaction — genuinely is an oxidative decarboxylation, and the two enzymes compete for the same substrate.

## answer_c
Dehydrogenation

## explanation_c
A dehydrogenation removes hydrogens onto a coenzyme, and there is no NAD⁺ or FAD in this reaction. Again the neighbouring pyruvate dehydrogenase reaction is what makes this sound plausible.

## answer_d
Carboxylation

## explanation_d
**Pyruvate carboxylase** adds CO2 to pyruvate to form oxaloacetate — a carboxylation. It is a mitochondrial, irreversible reaction requiring ATP, magnesium and **biotin**, which is the carboxyl carrier and the cofactor the exam asks about. Its allosteric activator is acetyl-CoA, an elegant piece of design: a cell with plenty of acetyl-CoA needs oxaloacetate to condense it with, so acetyl-CoA switches on the enzyme that makes it. That reaction is also the first of the two steps by which gluconeogenesis gets round the irreversible pyruvate kinase step.

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## main_concept
CON-FND-CA0F9E019BC5BA

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
6

## clinical_relevance
0.4

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.55

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Classify the pyruvate-to-oxaloacetate reaction, name its enzyme, cofactor and allosteric activator, and say where it sits in gluconeogenesis.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 24, file page 93. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p93-q24. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-3CA18E87D51F

## title
The reaction that is inhibited in thiamine deficiency is:

## question
The reaction that is inhibited in thiamine deficiency is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Pyruvate to acetyl CoA

## explanation_a
Thiamine's active form is **thiamine pyrophosphate**, and the pyruvate dehydrogenase complex requires it — along with lipoate, coenzyme A, FAD and NAD⁺ — to carry out the oxidative decarboxylation of pyruvate to acetyl-CoA. In thiamine deficiency that step slows, pyruvate accumulates and is converted to lactate, and the result is a lactic acidosis. Two things extend the answer usefully. The same cofactor is needed by the α-ketoglutarate dehydrogenase complex in the citric acid cycle, so a second block sits downstream of the first. And the tissue that suffers most is the brain, which depends on glucose oxidation — which is why the deficiency states, beriberi and Wernicke's encephalopathy, are cardiac and neurological.

## answer_b
Citrate to alpha ketoglutarate

## explanation_b
"Citrate to alpha ketoglutarate" is two reactions rather than one — aconitase, then isocitrate dehydrogenase — and neither uses thiamine pyrophosphate. The TPP-dependent step of the cycle is the *next* one, α-ketoglutarate to succinyl-CoA, so this option is one step short of a right answer.

## answer_c
Succinyl CoA to fumarate

## explanation_c
Succinyl-CoA reaches fumarate by way of succinate thiokinase and succinate dehydrogenase, neither of which needs thiamine. Succinate dehydrogenase uses FAD.

## answer_d
Glucose to G-6-P

## explanation_d
Glucose to glucose 6-phosphate is the hexokinase or glucokinase reaction, which needs ATP and magnesium and no vitamin-derived cofactor.

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## main_concept
CON-FND-229C78C9EB0E78

## concept_ids
CON-FND-C9E5128193029E

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Name the enzyme that converts pyruvate to acetyl-CoA, list its coenzymes, and predict what accumulates in blood when it is inhibited by deficiency, by thiamine lack or by arsenic.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 25, file page 93. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p93-q25. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
OCR repair: the extraction appended the running footer "87 jam" to option d. Removed; the printed option is "Glucose to G-6- P".

---

# Item

## id
QM-103-7558C09BD59F

## title
During anerobic glycolysis pyruvate cannot be oxidized to Acetyl CoA. This is due to blockage of which of the following enzymes:

## question
During anerobic glycolysis pyruvate cannot be oxidized to Acetyl CoA. This is due to blockage of which of the following enzymes:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Glucose -6-p dehydrogenase

## explanation_a
Glucose 6-phosphate dehydrogenase is the first and rate-limiting enzyme of the pentose phosphate pathway, producing NADPH. It has nothing to do with pyruvate, and it is not oxygen-dependent.

## answer_b
Glyceraldehyde-3-p dehydrogenase

## explanation_b
It is subtly wrong in an interesting way. Glyceraldehyde 3-phosphate dehydrogenase is the step that would fail if NAD⁺ ran out — but it does not fail anaerobically, precisely because lactate dehydrogenase keeps regenerating the NAD⁺ it needs. It is the step that is *rescued*, not the one that is blocked.

## answer_c
Lactate dehydrogenase

## explanation_c
It is the commonest wrong answer here. Lactate dehydrogenase is the enzyme that is **working**: it is what disposes of the pyruvate that pyruvate dehydrogenase can no longer take, and what returns NAD⁺ to the pathway. A student choosing it has identified the enzyme most active in anaerobiosis and mistaken activity for blockade.

## answer_d
Pyruvate dehydrogenase

## explanation_d
The step from pyruvate to acetyl-CoA is catalysed by the **pyruvate dehydrogenase complex**, and it requires NAD⁺ as one of its five coenzymes. Without oxygen the respiratory chain cannot reoxidise NADH, the NADH/NAD⁺ ratio rises, and pyruvate dehydrogenase is inhibited both by lack of NAD⁺ and directly by the accumulating NADH — which the book lists among its allosteric inhibitors, along with acetyl-CoA and ATP. Pyruvate therefore cannot enter the mitochondrion's oxidative route and is diverted to lactate instead. The general principle is worth extracting: every mitochondrial dehydrogenase is switched off by a high NADH/NAD⁺ ratio, which is the same mechanism that confines the citric acid cycle to aerobic conditions.

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## main_concept
CON-FND-229C78C9EB0E78

## concept_ids
CON-FND-403D06D1FB129F

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Name the enzyme that converts pyruvate to acetyl-CoA, list its coenzymes, and predict what accumulates in blood when it is inhibited by deficiency, by thiamine lack or by arsenic.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 26, file page 94. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p94-q26. correctSource, verbatim: "printed key (p103) read differently by different OCR passes (a/d)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Answer key recovered by reading the printed key table on file page 103, which gives 26. d. The extraction recorded correct: null, its correctSource noting that different OCR passes read the key cell as a or d. The printed cell is unambiguous on the page.

---

# Item

## id
QM-103-2140550DA76F

## title
Which is the most likely defective enzyme?

## question
Which is the most likely defective enzyme?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A newly born infant develops spasms and seizures a few hours after birth. Blood lactate, pyruvate and alanine are greatly elevated. He is diagnosed with congenital lactic acidosis, which may lead to brain damage.

## format
single best answer

## correct_answer
C

## answer_a
Phosphoenolpyruvate carboxykinase

## explanation_a
It is a defensible guess. PEPCK deficiency would impair gluconeogenesis and could raise lactate by preventing its removal — but it would not raise **pyruvate and alanine** as well, and the book names pyruvate dehydrogenase, not PEPCK, as the commonest cause of congenital lactic acidosis.

## answer_b
Phosphofructokinase-1

## explanation_b
A block at PFK-1 sits *above* pyruvate, so pyruvate and lactate would fall rather than rise. PFK-1 deficiency presents as exercise intolerance with a failure of lactate to rise, which is the opposite finding.

## answer_c
Pyruvate dehydrogenase

## explanation_c
The three raised metabolites are what identify it. **Congenital deficiency of the pyruvate dehydrogenase complex is the commonest cause of congenital lactic acidosis.** Pyruvate cannot be converted to acetyl-CoA, so it accumulates — and because pyruvate sits in equilibrium with both lactate (through lactate dehydrogenase) and alanine (through alanine aminotransferase), all three rise together. That triad is the diagnostic signature. The book notes that the condition is fatal and produces brain damage, because the brain depends mainly on glucose for energy and is particularly sensitive to acidosis. Two acquired conditions block the same step and should be held beside it: thiamine deficiency, which removes TPP, and arsenic poisoning, which ties up lipoate.

## answer_d
Pyruvate kinase

## explanation_d
Pyruvate kinase deficiency in the red cell causes haemolytic anaemia; a systemic block there would reduce pyruvate production rather than increase it. The lactate would fall, not rise.

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## main_concept
CON-FND-229C78C9EB0E78

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Diagnosis

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Name the enzyme that converts pyruvate to acetyl-CoA, list its coenzymes, and predict what accumulates in blood when it is inhibited by deficiency, by thiamine lack or by arsenic.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 27, file page 94. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p94-q27. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-0A6760A10F47

## title
The pentose phosphate pathway yields two products, the first being used in some cells for reductive detoxification and the second being used in most cells for nucleotide synthesis. Choose the correct couple:

## question
The pentose phosphate pathway yields two products, the first being used in some cells for reductive detoxification and the second being used in most cells for nucleotide synthesis. Choose the correct couple:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
NADH and ribulose-5-P

## explanation_a
Both halves are off here, and the first half is the important error. The pathway makes **NADPH**, not NADH — the phosphate is what separates the reducing power of biosynthesis from the reducing power of the respiratory chain. Ribulose 5-phosphate is a genuine intermediate, but the product used for nucleotide synthesis is its isomer, ribose 5-phosphate.

## answer_b
FADH2 and ATP

## explanation_b
The pentose phosphate pathway produces no FADH2 and no ATP at all. That is worth stating plainly, because students often assume every oxidative pathway generates ATP; this one is for reducing power and pentoses.

## answer_c
NADPH and ribose-5-P

## explanation_c
The pathway has exactly **two major functions: the supply of NADPH and of ribose 5-phosphate**. NADPH is the reducing power for reductive biosynthesis and for detoxification — fatty acid and steroid synthesis, the NADPH oxidase of the respiratory burst, and above all keeping glutathione reduced so that hydrogen peroxide can be destroyed. Ribose 5-phosphate is the sugar of nucleotides and nucleic acids. Both come from the **oxidative and irreversible** first phase; the second, non-oxidative phase is reversible and can run either way, which is how muscle makes ribose 5-phosphate despite having little of the oxidative enzymes.

## answer_d
NADH and GTP

## explanation_d
Both reasons already given apply here: NADH rather than NADPH, and GTP is a product of succinate thiokinase in the citric acid cycle, not of this pathway.

## topic
Carbohydrate metabolism

## subtopic
Hexose Monophosphate Pathway

## main_concept
CON-FND-B928DE79E08882

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
6

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway (HMP) / Pentose Phosphate Pathway (PPP)

## question_only_for
[clear]

## library_ids
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## resource_ids
[clear]

## learning_objective
State the two products of the hexose monophosphate pathway and say which phase of it is irreversible.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 28, file page 94. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p94-q28. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-18AAE3042686

## title
One of the following is a product of HMP shunt?

## question
One of the following is a product of HMP shunt?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
NADPH

## explanation_a
**NADPH** is the pathway's headline product, and the book calls the hexose monophosphate pathway the main source of it. The oxidative phase produces two NADPH per glucose 6-phosphate, at glucose 6-phosphate dehydrogenase and at 6-phosphogluconate dehydrogenase, and that phase is irreversible. The NADPH is then spent on fatty acid and steroid synthesis, on the NADPH oxidase of phagocytes, on vision, and on keeping glutathione reduced in the red cell. The other product is ribose 5-phosphate, for nucleotides.

## answer_b
FADH

## explanation_b
FADH2 is produced by succinate dehydrogenase in the citric acid cycle and by the acyl-CoA dehydrogenase of β-oxidation, and it feeds the respiratory chain at complex II. It is not made here.

## answer_c
ATP

## explanation_c
It is worth being explicit about: the pentose phosphate pathway generates **no ATP whatever**. Its function is reducing power and pentose sugars, not energy. Students who assume all glucose oxidation makes ATP pick this.

## answer_d
Glutathione

## explanation_d
It is the most instructive distractor because it names something the pathway *supports* rather than makes. Glutathione is a tripeptide synthesised elsewhere; what the pathway supplies is the NADPH that glutathione reductase needs to keep it in the reduced form. Confusing the cofactor with the substance it maintains is precisely the error that makes G6PD deficiency hard to reason about.

## topic
Carbohydrate metabolism

## subtopic
Hexose Monophosphate Pathway

## main_concept
CON-FND-B928DE79E08882

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
6

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway (HMP) / Pentose Phosphate Pathway (PPP)

## question_only_for
[clear]

## library_ids
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## resource_ids
[clear]

## learning_objective
State the two products of the hexose monophosphate pathway and say which phase of it is irreversible.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 29, file page 94. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p94-q29. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-F9E63417718C

## title
NADPH is generated by the action of:

## question
NADPH is generated by the action of:

## subject
haem

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Glucose -6- Phosphate dehydrogenase

## explanation_a
**Glucose 6-phosphate dehydrogenase (G6PD)** catalyses the first and rate-limiting step of the oxidative phase of the hexose monophosphate pathway, oxidising glucose 6-phosphate to 6-phosphogluconolactone and reducing NADP⁺ to NADPH. It is allosterically inhibited by NADPH itself — a clean feedback loop — and induced by insulin. Its clinical importance is out of all proportion to a single dehydrogenase step: in the red cell the NADPH it makes is the only source of reducing power for glutathione reductase, so G6PD deficiency leaves the cell unable to destroy hydrogen peroxide and it haemolyses on exposure to an oxidant. The book calls that deficiency the commonest human enzymopathy.

## answer_b
Glyceraldehyde-3- phosphate dehydrogenase

## explanation_b
Glyceraldehyde 3-phosphate dehydrogenase is a glycolytic enzyme and produces **NADH**, not NADPH. The one-letter difference is the whole distinction between catabolic reducing power that goes to the chain and anabolic reducing power that goes to biosynthesis.

## answer_c
Pyruvate dehydrogenase

## explanation_c
For the same reason: the pyruvate dehydrogenase complex reduces NAD⁺ to NADH.

## answer_d
Glucose -6- Phosphatase

## explanation_d
The name is a trap. Glucose 6-**phosphatase** simply hydrolyses the phosphate off glucose 6-phosphate to release free glucose in liver and kidney; it is not a dehydrogenase and makes no coenzyme. It differs from the correct answer by two syllables and belongs to an entirely different pathway.

## topic
Carbohydrate metabolism

## subtopic
Hexose Monophosphate Pathway

## main_concept
CON-HEM-A1EF4D20C85878

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
6

## clinical_relevance
0.6

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway (HMP) / Pentose Phosphate Pathway (PPP)

## question_only_for
[clear]

## library_ids
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## resource_ids
[clear]

## learning_objective
Name the enzyme that generates NADPH in the oxidative phase of the hexose monophosphate pathway.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 30, file page 94. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p94-q30. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-6AC74562BDA5

## title
What is the most probable mechanism which may lead to this haemolysis?

## question
What is the most probable mechanism which may lead to this haemolysis?

## subject
haem

## status
Draft

## owner
Claude

## vignette
A 34-year-old man takes antimalarial drugs as prophylaxis before travelling. Shortly afterwards he presents with an attack of haemolytic anaemia.

## format
single best answer

## correct_answer
D

## answer_a
Stimulation of autoantibodies against RBCs

## explanation_a
Drug-induced immune haemolysis exists, but it is not the mechanism this course teaches for antimalarials, and it would not explain why only some individuals are affected. The vignette is pointing at an enzymopathy, not at an antibody.

## answer_b
Loss of Energy production by the RBCs

## explanation_b
It is the mechanism of the *other* red-cell enzyme deficiency. Loss of ATP production is what happens in pyruvate kinase deficiency, where glycolysis fails to net any ATP. In G6PD deficiency the glycolytic pathway and the ATP supply are intact; what fails is the defence against oxidation.

## answer_c
Increased formation of reduced glutathione

## explanation_c
It is the reverse of what happens. Reduced glutathione is protective. In this patient it is *not* regenerated, because glutathione reductase cannot work without NADPH. An increase would prevent haemolysis, not cause it.

## answer_d
Increased formation of oxygen free radicals

## explanation_d
The patient has **glucose 6-phosphate dehydrogenase deficiency**, and the antimalarial — primaquine is the book's example, alongside aspirin, sulfonamides and fava beans — is an oxidant that stimulates the production of hydrogen peroxide. A normal red cell disposes of that peroxide through glutathione peroxidase, and regenerates the reduced glutathione it consumes using **NADPH from the hexose monophosphate pathway**. Without G6PD there is too little NADPH, glutathione reductase cannot keep up, peroxide accumulates, and lipid peroxidation of the membrane increases the cell's fragility until it lyses — giving haemolytic anaemia and jaundice. The book adds a neat evolutionary footnote: the same deficiency confers resistance to malaria, because the parasite itself needs reduced glutathione to survive.

## topic
Carbohydrate metabolism

## subtopic
Hexose Monophosphate Pathway

## main_concept
CON-HEM-4F64967BBFBB6F

## concept_ids
CON-FND-5F0DC4407DEC51

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.85

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway (HMP) / Pentose Phosphate Pathway (PPP)

## question_only_for
[clear]

## library_ids
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## resource_ids
[clear]

## learning_objective
Explain why a G6PD-deficient red cell haemolyses on exposure to an oxidant, and name the triggers.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 31, file page 94. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p94-q31. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-BB30AA1C4CAB

## title
Which of the following enzymes may be deficient in these individuals?

## question
Which of the following enzymes may be deficient in these individuals?

## subject
haem

## status
Draft

## owner
Claude

## vignette
In some individuals, ingesting fava beans leads to haemolytic anaemia.

## format
single best answer

## correct_answer
A

## answer_a
Glucose-6-P- dehydrogenase

## explanation_a
This is **favism**, and the book calls it the most common human enzymopathy. Fava beans contain oxidants that stimulate the production of hydrogen peroxide, and a red cell deficient in **glucose 6-phosphate dehydrogenase** cannot make enough NADPH to let glutathione reductase regenerate reduced glutathione. Hydrogen peroxide therefore accumulates, peroxidises the membrane lipids, raises the cell's fragility and lyses it — haemolytic anaemia with jaundice. There is no treatment beyond avoiding the trigger and transfusing during an attack. Note how much of the reasoning is shared with the antimalarial question: the trigger changes, the mechanism does not.

## answer_b
Glucose-6-Phosphatase

## explanation_b
Glucose 6-phosphatase deficiency is **von Gierke's disease** — fasting hypoglycaemia, hepatomegaly, lactic acidosis, hyperlipidaemia and hyperuricaemia. It is a liver disease, and it causes no haemolysis. The names differ by two syllables and the diseases share nothing.

## answer_c
Glucose -6-Phosphate Isomerase

## explanation_c
Glucose 6-phosphate isomerase — phosphohexose isomerase — is the second step of glycolysis. A defect there would impair glycolysis rather than the antioxidant defence.

## answer_d
Glycogen phosphorylase

## explanation_d
Glycogen phosphorylase deficiency in muscle is McArdle's syndrome, with exercise intolerance, cramps and no rise in blood lactate after exercise. Again a different pathway and a different tissue.

## topic
Carbohydrate metabolism

## subtopic
Hexose Monophosphate Pathway

## main_concept
CON-HEM-4F64967BBFBB6F

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Diagnosis

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Clinical

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
7

## clinical_relevance
0.85

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway (HMP) / Pentose Phosphate Pathway (PPP)

## question_only_for
[clear]

## library_ids
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## resource_ids
[clear]

## learning_objective
Explain why a G6PD-deficient red cell haemolyses on exposure to an oxidant, and name the triggers.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 32, file page 95. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p95-q32. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-7080249EF31A

## title
The glutathione cycle is the conversion of oxidized glutathione to reduced glutathione in the presence of NADPH. Which of the following enzymes catalyzes this reaction?

## question
The glutathione cycle is the conversion of oxidized glutathione to reduced glutathione in the presence of NADPH. Which of the following enzymes catalyzes this reaction?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Glutathione peroxidase

## explanation_a
It is the enzyme on the other side of the cycle — which is exactly why it is offered. Glutathione peroxidase, a selenium enzyme, uses reduced glutathione to destroy hydrogen peroxide, producing two molecules of water and **oxidised** glutathione. It consumes reduced glutathione; the question asks which enzyme makes it.

## answer_b
Glutathione dehydrogenase

## explanation_b
No such enzyme is taught here. The name is constructed to be plausible for a student sorting by word shape rather than by direction of reaction.

## answer_c
Glutathione reductase

## explanation_c
**Glutathione reductase**, an FAD-dependent enzyme, reduces the glutathione disulphide back to two molecules of reduced glutathione, and the reducing power it uses is **NADPH+H⁺** — which is where the hexose monophosphate pathway enters the story. The pair is worth holding as a loop: peroxidase spends reduced glutathione to destroy peroxide, reductase remakes it at the cost of NADPH, and G6PD supplies the NADPH. Break any link and the red cell cannot handle oxidative stress, which is the whole pathogenesis of favism. Note also the third route the book gives for hydrogen peroxide — catalase, which splits it into water and oxygen and needs no glutathione at all.

## answer_d
Glutathione synthetase

## explanation_d
Glutathione synthetase builds the tripeptide itself from its amino acids. Making the molecule and recycling its redox state are different operations, and only the second is a cycle.

## topic
Biomolecules

## subtopic
Bioenergetics

## main_concept
CON-FND-D8A41B5C23B148

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
5

## clinical_relevance
0.45

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Reactive Oxygen Species (ROS)

## question_only_for
[clear]

## library_ids
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE

## resource_ids
[clear]

## learning_objective
Name the two routes by which hydrogen peroxide is destroyed, and say which of them consumes NADPH.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 33, file page 95. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p95-q33. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-9692D44BEB65

## title
Glucose-6-phosphate dehydrogenase deficiency leads to a decrease in the efficiency of the glutathione defensive system. How does this affect the red blood cells?

## question
Glucose-6-phosphate dehydrogenase deficiency leads to a decrease in the efficiency of the glutathione defensive system. How does this affect the red blood cells?

## subject
haem

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Hemoglobin will only hold one oxygen molecule

## explanation_a
The oxygen-binding capacity of haemoglobin is a property of its four haem groups and its allosteric behaviour, and it is not set by the glutathione system. The related fact worth knowing is different: NADH from the glyceraldehyde 3-phosphate dehydrogenase step keeps the haem iron ferrous, and when it is oxidised to the ferric state the result is methaemoglobin, which cannot carry oxygen at all.

## answer_b
The cells will shrink

## explanation_b
Cell shrinkage is an osmotic event, and nothing about the glutathione defence is osmotic. The failure here is chemical damage to membrane lipids, not water movement.

## answer_c
The cells will lyse due to influx of glucose

## explanation_c
Glucose influx is not a mechanism of lysis in any case — the red cell takes glucose up through GLUT-1 continuously, since glucose is its only fuel.

## answer_d
The cells will lyse due to oxidative stress

## explanation_d
The red cell is peculiarly exposed to **oxidative damage**, because carrying oxygen is its job. Hydrogen peroxide is normally destroyed by glutathione peroxidase, which spends reduced glutathione; glutathione reductase regenerates that glutathione using NADPH; and the NADPH comes from the hexose monophosphate pathway, whose first enzyme is G6PD. Remove G6PD and the whole chain fails: peroxide accumulates, it peroxidises the membrane lipids, membrane fragility rises, and the cell lyses. The clinical translation is a haemolytic anaemia with jaundice, triggered by an oxidant — primaquine, aspirin, a sulfonamide or fava beans.

## topic
Carbohydrate metabolism

## subtopic
Hexose Monophosphate Pathway

## main_concept
CON-HEM-4F64967BBFBB6F

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Pathophysiology

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Clinical

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
7

## clinical_relevance
0.85

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway (HMP) / Pentose Phosphate Pathway (PPP)

## question_only_for
[clear]

## library_ids
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## resource_ids
[clear]

## learning_objective
Explain why a G6PD-deficient red cell haemolyses on exposure to an oxidant, and name the triggers.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 34, file page 95. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p95-q34. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-AFDE2D858F71

## title
An Essential molecule for the conversion of glucose to glycogen in the liver is:

## question
An Essential molecule for the conversion of glucose to glycogen in the liver is:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
UTP

## explanation_a
Glycogenesis begins by **activating** the sugar, and that is what the question is about. Glucose is phosphorylated to glucose 6-phosphate, a mutase converts it to glucose 1-phosphate, and UDP-glucose pyrophosphorylase then condenses glucose 1-phosphate with **UTP** to form **UDP-glucose**, which the book calls the immediate precursor for glycogen synthesis. Glycogen synthase, the key enzyme, transfers glucosyl units from UDP-glucose onto a glycogen primer in α1,4 linkage, and the branching enzyme makes the α1,6 branch points. The pattern generalises usefully: sugars are activated as UDP derivatives across metabolism — UDP-glucuronate in the uronic acid pathway and in bilirubin conjugation is the same idea.

## answer_b
GTP

## explanation_b
GTP belongs elsewhere — it is what PEPCK spends in gluconeogenesis, and what succinate thiokinase may produce in the citric acid cycle. It is not used in glycogen synthesis.

## answer_c
ATP

## explanation_c
It is the most tempting answer because ATP genuinely *is* required — at the first step, where glucokinase phosphorylates the glucose. But the step the question names is the activation of glucose for polymerisation, and that one takes UTP. Reading the stem for which step is meant is what separates the two.

## answer_d
CTP

## explanation_d
CTP activates the alcohols of phospholipid synthesis, as CDP-choline and CDP-diacylglycerol. Each nucleotide has its own domain, and matching them is what this question tests.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-1FC7D932D7EFDC

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
5

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
Name the nucleotide required to activate glucose for glycogen synthesis and the enzyme that uses the activated form, and put the steps of glycogenesis in order.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 35, file page 95. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p95-q35. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Suspect flag "option count": the extraction produced three options, the third reading "ATP a) ©TP". Repaired from file page 95, where the printed options are a) UTP, b) GTP, c) ATP, d) CTP. The printed key on file page 103 gives 35. a.

---

# Item

## id
QM-103-72C9FA7CF80B

## title
The immediate degradation of glycogen under normal conditions gives rise to which one of the following.

## question
The immediate degradation of glycogen under normal conditions gives rise to which one of the following.

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
More glucose than glucose-1-phosphate

## explanation_a
It inverts the ratio. Free glucose is the minority product, released only at the branch points; most of the polymer is dismantled phosphorolytically.

## answer_b
More glucose-1-phosphate than glucose

## explanation_b
The reason is structural. **Glycogen phosphorylase** cleaves the α1,4 linkages phosphorolytically, releasing **glucose 1-phosphate**, and it works along each branch until about four residues remain on either side of an α1,6 branch point. The **debranching enzyme** then does two things: its glucosyl transferase activity moves the outer three residues onto the nearest chain, and its glucosidase activity hydrolyses the single residue left at the branch point, releasing one molecule of **free glucose**. Since branches carry thirteen to fourteen residues and only one of them comes off free, glucose 1-phosphate greatly predominates. That is why the book calls glucose 1-phosphate the major product, and it is why glycogenolysis is energetically efficient — phosphorolysis captures the phosphate without spending ATP.

## answer_c
Equal amounts of glucose and glucose-1-phosphate

## explanation_c
Equal amounts would require every second residue to be at a branch point, which the structure does not remotely resemble.

## answer_d
Only glucose-1-phosphate

## explanation_d
It is the answer for a student who has learned the phosphorylase and forgotten the debranching enzyme. Some free glucose is always released — one molecule per branch point — so "only" is too strong.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-3905E3B98C2EC4

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
8

## clinical_relevance
0.6

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
State the major product of glycogenolysis, and explain why muscle glycogen cannot raise blood glucose while liver glycogen can.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 36, file page 95. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p95-q36. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-14C5F604EEB4

## title
Muscles cannot maintain blood glucose directly due to the absence of:

## question
Muscles cannot maintain blood glucose directly due to the absence of:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Glucose-6-phosphatase

## explanation_a
Glycogenolysis in both liver and muscle ends at **glucose 6-phosphate**, and a phosphorylated sugar cannot cross the plasma membrane. Only **glucose 6-phosphatase** can remove that phosphate, and it is present in liver and kidney but **absent from muscle**. So muscle glycogen, despite being three to four times the mass of liver glycogen, cannot contribute glucose to the blood directly; its glucose 6-phosphate goes into glycolysis and supplies the contracting fibre itself. Muscle can help indirectly, through the Cori cycle: the lactate it exports is converted back to glucose in the liver. This one absent enzyme is the answer to at least four questions in this chapter, phrased four different ways.

## answer_b
Glucokinase

## explanation_b
True but irrelevant. Muscle does lack glucokinase — it uses hexokinase — but that affects how it takes glucose *up*, not whether it can release it.

## answer_c
Phosphorylase

## explanation_c
Muscle has glycogen phosphorylase in abundance, and mobilises its glycogen vigorously during exercise. Its deficiency is McArdle's syndrome, a different disease entirely.

## answer_d
Phosphoglucomutase

## explanation_d
Muscle has phosphoglucomutase and uses it to convert glucose 1-phosphate to glucose 6-phosphate. The block is one step further on, at the dephosphorylation.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-3905E3B98C2EC4

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
8

## clinical_relevance
0.6

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
State the major product of glycogenolysis, and explain why muscle glycogen cannot raise blood glucose while liver glycogen can.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 37, file page 95. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p95-q37. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-6AC1AC78258C

## title
In which one of the following enzymes does this child most likely have a mutation?

## question
In which one of the following enzymes does this child most likely have a mutation?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A 3-month-old infant is irritable and becomes quite unconscious between feedings. Physical examination demonstrates an enlarged liver, and blood taken between feedings reveals elevated lactate and uric acid as well as hypoglycaemia.

## format
single best answer

## correct_answer
C

## answer_a
Liver glycogen phosphorylase

## explanation_a
This is the option worth working through, because it explains two of the four findings and not the other two. A liver phosphorylase defect would give fasting hypoglycaemia and hepatomegaly — but the glycogen would never be broken down to glucose 6-phosphate, so there would be no substrate to divert into glycolysis or the pentose phosphate pathway, and neither lactate nor urate would rise.

## answer_b
Glycogen synthase

## explanation_b
It points the wrong way. A glycogen synthase defect means too *little* glycogen is stored, so the liver would be small rather than enlarged, and there would be no accumulation to explain the biochemistry.

## answer_c
Glucose-6-phosphatase

## explanation_c
This is **von Gierke's disease, type I glycogen storage disease**, caused by a defect in hepatic **glucose 6-phosphatase** — and every finding derives from that one block. Both glycogenolysis and gluconeogenesis end at glucose 6-phosphate, so with the phosphatase gone neither can release glucose: hence fasting **hypoglycaemia**, and an enlarged liver stuffed with glycogen that cannot be exported. The glucose 6-phosphate that accumulates is pushed down glycolysis to lactate, giving **lactic acidosis**. Some is pushed through the pentose phosphate pathway into excess purine synthesis, and purine degradation raises **urate** — which the lactate compounds by competing with urate for renal excretion. And the hypoglycaemia drives epinephrine, which drives lipolysis, so free fatty acids reach the liver and become triacylglycerol: hyperlipidaemia and a fatty liver. The book's management advice is to eat frequently, especially carbohydrate.

## answer_d
Muscle glycogen phosphorylase

## explanation_d
The tissue is wrong. A muscle phosphorylase defect is McArdle's syndrome, which presents in older patients with exercise intolerance, cramps and a failure of blood lactate to rise after exercise. It causes neither hypoglycaemia nor hepatomegaly.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-1BE461A57AB76D

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Diagnosis

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
6

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
Name the enzyme defective in von Gierke's disease and derive its four metabolic features — hypoglycaemia, lactic acidosis, hyperuricaemia and hyperlipidaemia — from the one block.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 38, file page 96. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p96-q38. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-063DAF6FA29A

## title
One of the following is a negative signal for glycogen breakdown:

## question
One of the following is a negative signal for glycogen breakdown:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
Cyclic AMP

## explanation_a
It is the central positive signal. Cyclic AMP activates protein kinase A, which phosphorylates phosphorylase kinase, which phosphorylates and activates glycogen phosphorylase. It is the messenger the whole cascade is built on.

## answer_b
High blood glucose levels

## explanation_b
A high blood glucose is the situation in which the body least needs glycogen broken down, and it switches the pathway off at every level. It raises insulin, and insulin activates **phosphodiesterase**, which degrades cAMP and so prevents activation of protein kinase A; insulin also activates **protein phosphatase-1**, which dephosphorylates glycogen phosphorylase to its inactive form and glycogen synthase to its active one. So the same signal stops breakdown and starts synthesis — the reciprocity that runs through this whole topic. Note that glucose 6-phosphate, which rises when glucose is plentiful, reinforces it allosterically: it inhibits the phosphorylase and activates the synthase.

## answer_c
Epinephrine

## explanation_c
Epinephrine is a positive signal, and the one that acts on both liver and muscle — glucagon acts effectively on liver only. It raises cAMP exactly as glucagon does.

## answer_d
Ca²⁺

## explanation_d
It is a positive signal by a route worth knowing. A rise in intracellular calcium during muscle contraction activates the *inactive* phosphorylase kinase **without any phosphorylation at all**, which lets a contracting fibre mobilise its glycogen immediately, independently of any hormone.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-CA74978B7B7ED1

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
9

## clinical_relevance
0.55

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.85

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
Trace the cascade from glucagon or epinephrine to activated glycogen phosphorylase, name the enzyme that does the covalent modification, and predict the direction of both enzymes after a meal and after an overnight fast.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 39, file page 96. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p96-q39. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
OCR repair: the extraction read option d as "Ca?*". Repaired to "Ca²⁺" from file page 96, which prints the superscript charge.

---

# Item

## id
QM-103-D77EF4B5D0AD

## title
What is the yield of ATP from complete oxidation of 1 mol of glucose from muscle glycogen to CO2 and H2O?

## question
What is the yield of ATP from complete oxidation of 1 mol of glucose from muscle glycogen to CO2 and H2O?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
25

## explanation_a
25 corresponds to nothing in either accounting system; it is here to catch a student estimating rather than adjusting the standard figure.

## answer_b
33

## explanation_b
It is one more than the familiar number for a very specific reason. Complete oxidation of one mole of **free glucose** yields 32 ATP, because two are spent in phase I of glycolysis — one at hexokinase and one at PFK-1. A glucosyl unit taken from **glycogen** does not enter as free glucose: glycogen phosphorylase releases it as **glucose 1-phosphate**, and phosphoglucomutase converts that to glucose 6-phosphate **without spending any ATP**. The hexokinase investment is therefore saved, and the yield rises by one, to **33**. That single ATP is the metabolic point of storing glucose as a phosphorylated polymer rather than as free sugar — phosphorolysis captures the bond energy instead of wasting it.

## answer_c
12.5

## explanation_c
12.5 is not a total for anything; it looks like a fragment of the 2.5-per-NADH arithmetic.

## answer_d
32

## explanation_d
It is the near-miss the whole question turns on: 32 is the figure for free glucose. Choosing it means the saved hexokinase ATP has not been noticed, which is exactly what the examiner is testing.

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## main_concept
CON-FND-0F4A45886203EF

## concept_ids
CON-FND-3905E3B98C2EC4

## contextual_concept_ids
[clear]

## difficulty
Challenging

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.85

## setting
Academic

## reasoning_level
4

## inferred_difficulty
28

## exam_relevance
8

## clinical_relevance
0.35

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Calculate the ATP yield of glucose oxidation under aerobic and anaerobic conditions, and adjust the figure for glucose entering from glycogen.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 40, file page 96. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
105

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p96-q40. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Suspect flag "option count": the extraction produced two options, the second reading "33 ce) 125 d) 32". Repaired from file page 96, where the printed options are a) 25, b) 33, c) 12.5, d) 32. The printed key on file page 103 gives 40. b. The 33 figure is not printed in the department textbook; it follows from the book's own statement that glycogenolysis yields glucose 1-phosphate, converted by phosphoglucomutase without ATP.

---

# Item

## id
QM-103-800A6D6C3770

## title
Which of the following enzymes is absent in muscles?

## question
Which of the following enzymes is absent in muscles?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
Liver glycogen contributes to the maintenance of blood glucose, and muscle glycogen does not.

## format
single best answer

## correct_answer
C

## answer_a
Glycogen phosphorylase

## explanation_a
Muscle has glycogen phosphorylase and depends on it heavily during exercise; its absence is McArdle's syndrome, a recognised disease precisely because the enzyme is normally there.

## answer_b
Hexokinase

## explanation_b
Muscle has hexokinase — indeed hexokinase, with its low Km and product inhibition, is the characteristically muscular form. It is glucokinase that muscle lacks, and that concerns uptake, not release.

## answer_c
Glucose-6-phosphatase

## explanation_c
**Glucose 6-phosphatase** is present in liver and kidney and absent from muscle, and that single absence is why muscle glycogen cannot maintain blood glucose. Both tissues break glycogen down to glucose 1-phosphate and then to glucose 6-phosphate, but a phosphorylated sugar cannot leave the cell; only the phosphatase can free it. In liver the glucose goes to the blood; in muscle the glucose 6-phosphate can only enter glycolysis and serve the fibre itself. Muscle glycogen does reach the circulation indirectly, as lactate, through the Cori cycle — but that requires the liver to do the gluconeogenesis, for the same reason.

## answer_d
Debranching enzyme

## explanation_d
Muscle has the debranching enzyme with both its activities, glucosyl transferase and glucosidase. Without it the glycogen could not be dismantled past the first branch point.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-3905E3B98C2EC4

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
8

## clinical_relevance
0.6

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
State the major product of glycogenolysis, and explain why muscle glycogen cannot raise blood glucose while liver glycogen can.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 41, file page 96. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p96-q41. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-A01F340733CE

## title
Which of the following enzymes is responsible for direct covalent modification of glycogen phosphorylase?

## question
Which of the following enzymes is responsible for direct covalent modification of glycogen phosphorylase?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
In response to glucagon and epinephrine, cells undergo a series of changes in signal-transducing molecules that covalently activate glycogen phosphorylase.

## format
single best answer

## correct_answer
B

## answer_a
Protein kinase A

## explanation_a
It is the answer one step too early in the cascade — which is exactly what the word "direct" in the stem is testing. Protein kinase A is activated by cAMP and does phosphorylate two things: glycogen synthase, inactivating it, and **phosphorylase kinase**, activating it. It does not touch glycogen phosphorylase itself.

## answer_b
Phosphorylase kinase

## explanation_b
The cascade runs glucagon or epinephrine → cAMP → protein kinase A → **phosphorylase kinase** → glycogen phosphorylase. Phosphorylase kinase is the enzyme that puts the phosphate onto glycogen phosphorylase, converting it from the inactive dephosphorylated form to the active phosphorylated one. The extra step is not redundant: it is an amplification stage, and it is also where muscle inserts its own control, because a rise in intracellular **calcium** during contraction activates phosphorylase kinase without any phosphorylation at all. That is how a contracting fibre mobilises glycogen instantly, independent of any hormone.

## answer_c
Protein kinase C

## explanation_c
Protein kinase C is activated by diacylglycerol and calcium in a different signalling system and has no role in this cascade.

## answer_d
Protein kinase B

## explanation_d
Protein kinase B, also called Akt, sits in the insulin signalling pathway — on the opposite side of this regulation, promoting storage rather than breakdown.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-CA74978B7B7ED1

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.55

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.85

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
Trace the cascade from glucagon or epinephrine to activated glycogen phosphorylase, name the enzyme that does the covalent modification, and predict the direction of both enzymes after a meal and after an overnight fast.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 42, file page 96. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p96-q42. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-8AA4B328E801

## title
Cyclic AMP increases the rate of glycogenolysis by:

## question
Cyclic AMP increases the rate of glycogenolysis by:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Promoting the formation of phosphorylated form of glycogen phosporylase

## explanation_a
Cyclic AMP is a second messenger, and its whole action here is to activate **protein kinase A**, which phosphorylates phosphorylase kinase, which in turn phosphorylates glycogen phosphorylase. Glycogen phosphorylase is inactive when dephosphorylated and **active when phosphorylated**, so promoting the phosphorylated form is precisely how cAMP accelerates glycogenolysis. The same cAMP simultaneously drives the phosphorylation of glycogen synthase, which is active dephosphorylated and therefore switched off — one messenger turning breakdown on and synthesis off at the same moment. Holding the two enzymes' opposite responses to the same phosphate is the key to this whole section.

## answer_b
Acting as a cofactor for glycogen phosphorylase

## explanation_b
Cyclic AMP never binds glycogen phosphorylase. It binds the regulatory subunits of protein kinase A, and that is where its involvement ends; everything downstream is protein phosphorylation.

## answer_c
Providing phosphate for the phosphorylation of glycogen

## explanation_c
Two things are off here. Glycogen itself is not phosphorylated — the enzyme is. And the phosphate that is transferred comes from ATP, not from cAMP.

## answer_d
Acting as a precursor of 5' AMP which is a cofactor for glycogen phosphorylase

## explanation_d
This is the sophisticated distractor. 5′-AMP *is* an allosteric activator of glycogen phosphorylase b in muscle, so the option contains a true fact — but cAMP is not a precursor of it in any regulatory sense; it is hydrolysed to 5′-AMP by phosphodiesterase as a means of *terminating* the signal. The option attaches a real fact to the wrong mechanism.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-CA74978B7B7ED1

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.55

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.85

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
Trace the cascade from glucagon or epinephrine to activated glycogen phosphorylase, name the enzyme that does the covalent modification, and predict the direction of both enzymes after a meal and after an overnight fast.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 43, file page 96. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p96-q43. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-2E291FE76770

## title
Ingestion of a large amount of glucose in a healthy individual should result in which of the following?

## question
Ingestion of a large amount of glucose in a healthy individual should result in which of the following?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
An enhanced glycogen synthase activity in the liver

## explanation_a
Both the hormonal and the allosteric layers point the same way. A large glucose load raises insulin, and insulin activates **protein phosphatase-1**, which dephosphorylates glycogen synthase — and the dephosphorylated form is the **active** one. Insulin also activates phosphodiesterase, lowering cAMP and so preventing protein kinase A from phosphorylating the synthase back to inactivity. On top of that, the rising **glucose 6-phosphate** is an allosteric activator of glycogen synthase and an allosteric inhibitor of glycogen phosphorylase. Three mechanisms, one direction: after a meal the liver stores.

## answer_b
An increased ratio of glycogen phosphorylase (a) to glycogen phosphorylase (b) in the liver

## explanation_b
It is the reverse. Phosphorylase *a* is the active phosphorylated form and *b* the inactive dephosphorylated one, so a rising a-to-b ratio means more breakdown — the fasting response, not the fed one.

## answer_c
An increased rate of acetyl CoA formation by red blood cells

## explanation_c
The premise is impossible. Red blood cells have no mitochondria, so they form no acetyl-CoA at all; their pyruvate becomes lactate. This option is testing whether the red cell's metabolic limits have been learned.

## answer_d
An inhibition of protein phosphatase-1 activity in the liver

## explanation_d
Again the direction is wrong. Insulin **activates** protein phosphatase-1; that is one of its principal mechanisms. Inhibiting it would leave both enzymes phosphorylated, which is the fasting configuration.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-CA74978B7B7ED1

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.55

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.85

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
Trace the cascade from glucagon or epinephrine to activated glycogen phosphorylase, name the enzyme that does the covalent modification, and predict the direction of both enzymes after a meal and after an overnight fast.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 44, file page 97. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p97-q44. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
OCR repair: the extraction read option a as "Anenhanced glycogen synthase activity". Repaired to "An enhanced" from file page 97.

---

# Item

## id
QM-103-F61E0CA171AA

## title
During regulation of glycogen synthesis/degradation in the liver, glycogen is degraded to glucose-1-phosphate because of ……… glycogen synthase and the …………. of glycogen phosphorylase.

## question
During regulation of glycogen synthesis/degradation in the liver, glycogen is degraded to glucose-1-phosphate because of ……… glycogen synthase and the …………. of glycogen phosphorylase.

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Inhibition; Activation

## explanation_a
It is the definition of reciprocal regulation. If glycogen is being degraded to glucose 1-phosphate, then glycogen phosphorylase must be **activated** and glycogen synthase must be **inhibited** — otherwise the cell would build and dismantle the same polymer simultaneously and burn ATP for nothing. The mechanism that achieves it is a single phosphorylation: protein kinase A, driven by cAMP under glucagon or epinephrine, phosphorylates both enzymes, and phosphorylation activates the phosphorylase while inactivating the synthase. Insulin reverses both through protein phosphatase-1. One modification, two opposite effects — which is why the pathway can never run both ways at once.

## answer_b
Activation; Inhibition

## explanation_b
It is the exact inverse: this is the fed state, in which glycogen is being made. The stem has already told you which way the traffic is going.

## answer_c
Inhibition; Inhibition

## explanation_c
With the phosphorylase inhibited, no glucose 1-phosphate would be produced at all, so the stem's premise would fail.

## answer_d
Activation; Activation

## explanation_d
It describes a futile cycle — synthesis and degradation running together, consuming ATP and achieving nothing. That is precisely the outcome reciprocal regulation exists to prevent.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-CA74978B7B7ED1

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.55

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.85

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
Trace the cascade from glucagon or epinephrine to activated glycogen phosphorylase, name the enzyme that does the covalent modification, and predict the direction of both enzymes after a meal and after an overnight fast.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 45, file page 97. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p97-q45. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
OCR repair: the extraction read the stem as "because of ......... glycogen synthase and the onsinaniths of glycogen phosphorylase". Repaired from file page 97, which prints "because of ……… glycogen synthase and the …………. of glycogen phosphorylase."

---

# Item

## id
QM-103-D14F5C00F381

## title
During muscle contraction increased level of what of the following will allosterically activates glycogen phosphorylase (b)?

## question
During muscle contraction increased level of what of the following will allosterically activates glycogen phosphorylase (b)?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
ATP

## explanation_a
It is the inhibitor. A high ATP concentration tells the fibre it has energy to spare, so ATP allosterically **inhibits** glycogen phosphorylase — along with glucose 6-phosphate, for the same reason. Choosing ATP has the energy logic exactly backwards.

## answer_b
ADP

## explanation_b
ADP is an intermediate signal and is not the allosteric effector named at this enzyme; the adenine nucleotide that reports a genuine energy deficit is AMP, because adenylate kinase converts two ADP into one ATP and one AMP, so AMP rises disproportionately as the cell runs down.

## answer_c
AMP

## explanation_c
**AMP** rises when a contracting fibre has spent its ATP, and it allosterically activates the b form of glycogen phosphorylase — the dephosphorylated form that would otherwise be inactive. That gives muscle a way to mobilise glycogen on the strength of its own energy state, without waiting for a hormone. It sits alongside the other hormone-independent route the book does describe: a rise in intracellular **calcium** during contraction activates phosphorylase kinase without phosphorylation. Note for accuracy: ATP and glucose 6-phosphate are the effectors most often cited for this enzyme, and AMP activation is not always covered in introductory material; the printed answer key requires it, and it is standard in international texts.

## answer_d
UDP-glucose

## explanation_d
UDP-glucose is the activated substrate of glycogen **synthesis**, not a regulator of breakdown. It is offered to catch a student who associates it with glycogen generally.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-CA74978B7B7ED1

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.55

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.85

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
Trace the cascade from glucagon or epinephrine to activated glycogen phosphorylase, name the enzyme that does the covalent modification, and predict the direction of both enzymes after a meal and after an overnight fast.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 46, file page 97. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p97-q46. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
The department textbook does not print AMP as an allosteric activator of glycogen phosphorylase b; it lists ATP and glucose 6-phosphate as inhibitors and calcium as the muscle override. The printed key on file page 103 gives 46. c, and the live concept CON-MSK-10DF05A8B81781 asserts AMP activation. Written to the key and flagged for a faculty reviewer in the concept's conflicts field.

---

# Item

## id
QM-103-3F40A9BC828E

## title
From which one of the following precursors would the patient have very little glucose produced?

## question
From which one of the following precursors would the patient have very little glucose produced?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A patient presents with a bacterial infection that is found to inhibit the PEPCK enzyme.

## format
single best answer

## correct_answer
A

## answer_a
Alanine

## explanation_a
The reasoning is entirely about where each precursor joins the pathway. PEPCK converts oxaloacetate to phosphoenolpyruvate, so it is a gate that only substrates entering **at or below pyruvate** must pass through. **Alanine** is transaminated to pyruvate, pyruvate is carboxylated to oxaloacetate by pyruvate carboxylase, and oxaloacetate then needs PEPCK — so with PEPCK inhibited, alanine is stuck. Every other option enters the pathway downstream of the block and is unaffected. The generalisable move is to ask, for any gluconeogenic substrate, *at which intermediate does this join?* — and then to see whether the blocked enzyme lies above or below that point.

## answer_b
Glycerol

## explanation_b
Glycerol is phosphorylated by glycerol kinase and oxidised to **dihydroxyacetone phosphate**, which is well downstream of PEPCK. It reaches glucose by simple reversal of glycolysis and needs no carboxylation at all.

## answer_c
3-phosphoglycerate

## explanation_c
3-Phosphoglycerate sits between phosphoenolpyruvate and glucose, so it too enters below the block.

## answer_d
PEP

## explanation_d
It is the clearest case: PEP is the **product** of the blocked reaction. Supplying it bypasses the block entirely, which is why a student who has understood the geometry can eliminate this option immediately.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-C2C88203E4A918

## concept_ids
CON-FND-089E2C3E01031C

## contextual_concept_ids
[clear]

## difficulty
Challenging

## question_type
Pathophysiology

## cognitive_effort
High

## cognitive_effort_score
0.85

## setting
Clinical

## reasoning_level
4

## inferred_difficulty
28

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
Name the four key enzymes of gluconeogenesis and the glycolytic step each bypasses, and explain why the conversion of pyruvate to phosphoenolpyruvate is partly mitochondrial and partly cytosolic.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 47, file page 97. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
105

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p97-q47. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-335C3D6A6E69

## title
Which one of the following statements concerning gluconeogenesis is correct?

## question
Which one of the following statements concerning gluconeogenesis is correct?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
It occurs in muscles and adipose tissue

## explanation_a
Gluconeogenesis occurs mainly in the **liver** and to a lesser extent in the **kidney**, because those are the only tissues with glucose 6-phosphatase and fructose 1,6-bisphosphatase. Muscle and adipose tissue have neither and cannot make glucose.

## answer_b
It is stimulated by high glucose levels

## explanation_b
It is the reverse. A high glucose level raises insulin, and insulin decreases the activity of the gluconeogenic key enzymes while increasing the glycolytic ones. Gluconeogenesis is a fasting-state pathway.

## answer_c
It is activated by elevated levels of FFA oxidation

## explanation_c
It is the mechanism the book puts at the centre of the regulation. Fasting and stress raise the anti-insulin hormones, those hormones drive lipolysis, and the free fatty acids that reach the liver are oxidised — and it is that **oxidation** which does the switching. It works twice over: the ATP it produces allosterically inhibits phosphofructokinase-1, pyruvate kinase and pyruvate dehydrogenase, and the acetyl-CoA it produces allosterically stimulates **pyruvate carboxylase** while inhibiting pyruvate dehydrogenase — so pyruvate is pushed towards oxaloacetate and glucose rather than towards acetyl-CoA. In other words the liver makes glucose using energy from fat, which is exactly what allows the brain and red cells to be supplied without consuming the glucose in the process.

## answer_d
It is important to maintain blood glucose during overnight fast

## explanation_d
This is nearly true and deserves care, though it is not the *best* answer. The book's own timing is that gluconeogenesis begins four to six hours after a meal at a slow rate and becomes the **main** source of blood glucose only after 12 to 18 hours, once liver glycogen is depleted. An overnight fast sits on that boundary, and glycogenolysis is still doing most of the work. Option C states a mechanism the book asserts outright, which is why the printed key prefers it.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-7B3B4F0BEBF198

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
9

## clinical_relevance
0.65

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.85

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
Explain how increased fatty acid oxidation activates gluconeogenesis and inhibits glycolysis, and predict which key enzymes rise and which fall in prolonged fasting and in diabetes mellitus.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 48, file page 97. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p97-q48. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-D8899C0B48A1

## title
A common intermediate in the conversion of glycerol and lactate to glucose is which one of the following?

## question
A common intermediate in the conversion of glycerol and lactate to glucose is which one of the following?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Pyruvate

## explanation_a
This is where the two routes differ rather than meet. **Lactate** does pass through pyruvate — lactate dehydrogenase oxidises it back — but **glycerol** does not: it enters at dihydroxyacetone phosphate, several steps above pyruvate, and never touches it.

## answer_b
Oxaloacetate

## explanation_b
For the same reason. Oxaloacetate lies on the lactate route only, as part of the pyruvate carboxylase and PEPCK bypass. Glycerol enters above it.

## answer_c
Malate

## explanation_c
Malate is the carrier that shuttles oxaloacetate out of the mitochondrion in the dicarboxylic acid shuttle, so it too belongs to the lactate route alone.

## answer_d
Glucose-6-phosphate

## explanation_d
The answer is found by asking where the two routes converge rather than what each contains. **Lactate** enters at pyruvate and must climb the whole pathway; **glycerol** is phosphorylated by glycerol kinase and oxidised to dihydroxyacetone phosphate, joining much higher up. From dihydroxyacetone phosphate the two paths run together — through fructose 1,6-bisphosphate, fructose 6-phosphate and **glucose 6-phosphate** — before glucose 6-phosphatase releases free glucose. Of the four options, glucose 6-phosphate is the only intermediate that lies on both routes. It is also, incidentally, the last intermediate before free glucose, which is why its phosphatase is the enzyme lost in von Gierke's disease.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-089E2C3E01031C

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
List the gluconeogenic substrates, name the two amino acids that are purely ketogenic, and explain why acetyl-CoA cannot become glucose.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 49, file page 97. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p97-q49. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-994052B58120

## title
Lactate is transported from muscles to Liver because:

## question
Lactate is transported from muscles to Liver because:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Liver has mitochondria

## explanation_a
It fails to discriminate: muscle has mitochondria too, in quantity. If mitochondria were the issue, muscle could deal with its own lactate.

## answer_b
Lactate is stored in the liver

## explanation_b
Lactate is not stored anywhere; it is a metabolic dead end that must be converted back to pyruvate before anything can be done with it.

## answer_c
Liver has Glucose-6-Phosphatase

## explanation_c
The reason is the same one that explains why muscle glycogen cannot raise blood glucose. Gluconeogenesis, wherever it runs, ends at glucose 6-phosphate, and only **glucose 6-phosphatase** can strip that phosphate and release free glucose into the blood. Liver and kidney have the enzyme; muscle does not. So even if muscle could run the gluconeogenic sequence, it could not export the product — the glucose would be trapped as glucose 6-phosphate. That is why the lactate must travel: the liver converts it to pyruvate with lactate dehydrogenase, makes glucose from it, and sends the glucose back to the muscle and the red cell. That round trip is the **Cori cycle**, and its two purposes are to maintain blood glucose and to prevent lactic acidosis.

## answer_d
Lactate is reduced in the liver

## explanation_d
The chemistry is the wrong way round. In the liver lactate is **oxidised** back to pyruvate, not reduced. It was reduced in the muscle, which is how the NAD⁺ was regenerated there.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-596FDA58EEEF0A

## concept_ids
CON-FND-3905E3B98C2EC4

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.6

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
State the direction of lactate and of glucose in the Cori cycle, name the two tissues it links, and give its two purposes.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 50, file page 98. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p98-q50. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-CC0C2D512D6F

## title
Glucose can't be synthesized from:

## question
Glucose can't be synthesized from:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Amino acids

## explanation_a
Amino acids are the major gluconeogenic substrate in prolonged fasting. All of them are glucogenic **except leucine and lysine**, which are purely ketogenic, and they arrive from muscle largely as alanine through the glucose–alanine cycle.

## answer_b
Glycerol

## explanation_b
Glycerol is a genuine gluconeogenic substrate: released from adipose tissue by lipolysis, phosphorylated by glycerol kinase and oxidised to dihydroxyacetone phosphate. Two glycerols make one glucose. It is the part of a triacylglycerol that *can* become sugar.

## answer_c
Acetoacetate

## explanation_c
The reason is a single irreversible step. Acetoacetate is a ketone body, and ketone bodies are metabolised to **acetyl-CoA** — and **acetyl-CoA can never give glucose, because the pyruvate dehydrogenase reaction is irreversible**. No enzyme reverses it, so once a carbon has passed from pyruvate into acetyl-CoA it cannot come back. The same sentence explains why even-chain fatty acids are not gluconeogenic, since their β-oxidation yields nothing but acetyl-CoA, and why odd-chain fatty acids are the rare exception — their final propionyl-CoA becomes succinyl-CoA and so enters the cycle above the block.

## answer_d
Lactic acid

## explanation_d
Lactic acid is the type example of a gluconeogenic substrate — oxidised to pyruvate by lactate dehydrogenase and carried to glucose by the Cori cycle.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-089E2C3E01031C

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
List the gluconeogenic substrates, name the two amino acids that are purely ketogenic, and explain why acetyl-CoA cannot become glucose.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 51, file page 98. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p98-q51. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-016568E8F104

## title
Which one of the following enzymes is a key enzyme for gluconeogenesis?

## question
Which one of the following enzymes is a key enzyme for gluconeogenesis?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Phosphoglycerate kinase

## explanation_a
Phosphoglycerate kinase catalyses a freely reversible reaction and is used by gluconeogenesis in the reverse direction — but a shared reversible enzyme is not a key enzyme, because it is not a control point and it bypasses nothing.

## answer_b
Pyruvate kinase

## explanation_b
It is on the other side of the ledger: pyruvate kinase is a **glycolytic** key enzyme, and one of the three irreversible steps that gluconeogenesis has to get round.

## answer_c
Phosphoglucomutase

## explanation_c
Phosphoglucomutase belongs to glycogen metabolism, interconverting glucose 1-phosphate and glucose 6-phosphate. It is reversible and not a control point.

## answer_d
Pyruvate carboxylase

## explanation_d
Gluconeogenesis is largely the reversal of glycolysis, except at glycolysis's three irreversible kinase steps, and four enzymes bypass them: **glucose 6-phosphatase** for glucokinase, **fructose 1,6-bisphosphatase** for PFK-1, and **pyruvate carboxylase together with phosphoenolpyruvate carboxykinase** for pyruvate kinase. Those four are the key enzymes. Pyruvate carboxylase is also the odd one out in another sense — it is the only one that is mitochondrial, all the others being cytosolic, which is what forces the dicarboxylic acid shuttle. And it is the one activated allosterically by acetyl-CoA, which is how fat oxidation switches gluconeogenesis on.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-C2C88203E4A918

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
Name the four key enzymes of gluconeogenesis and the glycolytic step each bypasses, and explain why the conversion of pyruvate to phosphoenolpyruvate is partly mitochondrial and partly cytosolic.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 52, file page 98. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p98-q52. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-DD2C84811448

## title
Which of the following statements is true about Cori Cycle?

## question
Which of the following statements is true about Cori Cycle?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
The Cori cycle involves three tissues: muscle, liver, and brain

## explanation_a
The brain is not part of the cycle. The tissues involved are muscle — or the red cell, which is a continuous source of lactate — and the liver. The brain is a *consumer* of the glucose that results, but it contributes no lactate to the cycle.

## answer_b
It involves the transport of lactate from the liver to skeletal muscle for gluconeogenesis

## explanation_b
It is the cycle running backwards. Gluconeogenesis happens in the liver, so the liver must be where the lactate *arrives*, not where it leaves from. This option is the commonest error on this topic and is worth checking against a single anchor: whichever tissue does the gluconeogenesis is the destination.

## answer_c
It involves the transport of lactate from skeletal muscle to the liver for gluconeogenesis

## explanation_c
Anaerobic glycolysis in exercising skeletal muscle — and continuously in the red cell, which has no mitochondria — produces lactate, which diffuses into the blood and is taken up by the liver. There lactate dehydrogenase oxidises it back to pyruvate and gluconeogenesis converts the pyruvate to glucose, which returns in the blood to be used again. The liver can do this and muscle cannot because only the liver has **glucose 6-phosphatase** to release free glucose. The book gives the cycle two purposes, and both are examinable: it **maintains blood glucose** and it **prevents lactic acidosis**.

## answer_d
It is active during resting stages and in well-fed condition

## explanation_d
The Cori cycle is most active during **severe exercise** and in fasting — states in which muscle is producing lactate and the liver is making glucose. In a well-fed resting person there is little lactate to recycle and gluconeogenesis is suppressed.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-596FDA58EEEF0A

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.6

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
State the direction of lactate and of glucose in the Cori cycle, name the two tissues it links, and give its two purposes.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 53, file page 98. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p98-q53. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-02CFB0D79811

## title
Which one of the following occur during the conversion of pyruvate to glucose by gluconeogenesis?

## question
Which one of the following occur during the conversion of pyruvate to glucose by gluconeogenesis?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Biotin is required as a cofactor

## explanation_a
The first step out of pyruvate is its carboxylation to oxaloacetate by **pyruvate carboxylase**, and that enzyme requires **biotin** as the carrier of the carboxyl group, together with ATP and magnesium. Biotin is the vitamin of carboxylation reactions generally — the same cofactor serves acetyl-CoA carboxylase in fatty acid synthesis — so recognising a carboxylase is usually enough to name its cofactor. Acetyl-CoA is the allosteric activator of this enzyme, which is how a liver oxidising fat directs pyruvate towards glucose.

## answer_b
Energy is utilized only in the form of GTP

## explanation_b
The word "only" is the problem. GTP is indeed spent, at the PEPCK step, but **ATP** is spent too — at pyruvate carboxylase and again at phosphoglycerate kinase running in reverse. The book totals the cost of two pyruvates to one glucose at six ATP and two NADH.

## answer_c
All the reactions occur in the cytosol

## explanation_c
All the gluconeogenic key enzymes are cytosolic **except pyruvate carboxylase**, which is mitochondrial. That single exception is what forces the dicarboxylic acid shuttle, in which oxaloacetate leaves the mitochondrion as malate.

## answer_d
All the reactions occur in the mitochondrion

## explanation_d
It is the opposite error. Only the first step is mitochondrial; everything from PEPCK onwards is cytosolic, and glucose 6-phosphatase is in the endoplasmic reticulum of liver and kidney.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-C2C88203E4A918

## concept_ids
CON-FND-CA0F9E019BC5BA

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
Name the four key enzymes of gluconeogenesis and the glycolytic step each bypasses, and explain why the conversion of pyruvate to phosphoenolpyruvate is partly mitochondrial and partly cytosolic.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 54, file page 98. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p98-q54. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Suspect flag "option ran on": the extraction merged printed question 55 into option d and produced a spurious option e. Repaired from file page 98, where the printed options are a) Biotin is required as a cofactor, b) Energy is utilized only in the form of GTP, c) All the reactions occur in the cytosol, d) All the reactions occur in the mitochondrion. Printed question 55 is authored separately.

---

# Item

## id
QM-103-F63B0A86AF78

## title
Which of the following best summarizes the Cori Cycle?

## question
Which of the following best summarizes the Cori Cycle?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
Gluconeogenesis in kidney → Glucose → Muscle use → Lactate production → Lactate conversion to pyruvate in muscles.

## explanation_a
The last step is where this fails, and that is where it matters. Lactate converted back to pyruvate *in muscle* achieves nothing — muscle cannot make glucose, because it has no glucose 6-phosphatase, so the carbon has nowhere to go. The whole point of the cycle is that the conversion happens in the liver. Naming the kidney rather than the liver is a lesser error, since the kidney does contribute to gluconeogenesis, but the last step is fatal.

## answer_b
Glycolysis in muscles → Muscle use → Lactate production → Lactate conversion to glucose in liver.

## explanation_b
It names each step in the right tissue. **Glycolysis in muscle** (anaerobic, during severe exercise) → the muscle uses the ATP → **lactate is produced** to regenerate NAD⁺ → the lactate travels in the blood to the liver → **it is converted to glucose in the liver** by gluconeogenesis, and the glucose returns to the muscle. Two anchors make this recoverable without memorising the sequence: gluconeogenesis happens where glucose 6-phosphatase is, which is liver and kidney; and lactate is made where oxygen is short, which is muscle and the red cell. Everything else follows.

## answer_c
Glycolysis in liver → Liver use → Lactate production → Lactate conversion to glycogen in liver.

## explanation_c
The liver is not the site of lactate production in this cycle, and converting lactate to glycogen in the liver misses the point — the product is glucose, exported to the tissues that needed it. Glycogen storage is a separate matter.

## answer_d
Gluconeogenesis in liver → Lactate → Muscle use → Glucose production → Glucose conversion to glycogen in liver.

## explanation_d
It inverts the whole cycle: gluconeogenesis is placed before lactate rather than after it, and glucose production is put in muscle. Every arrow points the wrong way.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-596FDA58EEEF0A

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.6

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
State the direction of lactate and of glucose in the Cori cycle, name the two tissues it links, and give its two purposes.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 55, file page 98. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Not present in the 102 INT lane’s extraction: the printed question was swallowed by an OCR run-on into a neighbouring item. Recovered in full from the page. correctSource, established here: "printed key (file page 103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
This item is not in the extracted bank: the 102 lane's OCR merged its stem and first two options into option d of printed question 54, and its remaining options into a spurious option e. Recovered in full from file page 98, and its key read from the printed table on file page 103, which gives 55. b. The printed options use arrows, which the extraction rendered as ">" and "—"; they are transcribed here as arrows.

---

# Item

## id
QM-103-9609F15E4E9C

## title
How many key enzymes in gluconeogenesis are required to bypass the irreversible reactions of glycolysis?

## question
How many key enzymes in gluconeogenesis are required to bypass the irreversible reactions of glycolysis?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
2

## explanation_a
Two is the number of enzymes needed for the *pyruvate kinase* bypass alone — pyruvate carboxylase and PEPCK — not for all three blocks.

## answer_b
3

## explanation_b
It is the trap the question is built on. There are indeed **three** irreversible glycolytic reactions, so three feels like the natural answer; but one of those three blocks takes two enzymes to get round, so the counts do not match.

## answer_c
4

## explanation_c
Glycolysis has three irreversible steps, and **four** gluconeogenic key enzymes bypass them: **glucose 6-phosphatase** reverses glucokinase, **fructose 1,6-bisphosphatase** reverses phosphofructokinase-1, and **pyruvate carboxylase together with phosphoenolpyruvate carboxykinase** reverses pyruvate kinase. The mismatch between three blocks and four enzymes is the whole content of the question. It arises because pyruvate kinase releases so much free energy that reversing it needs two steps and two nucleotides — ATP at the carboxylase and GTP at PEPCK. Note also that these four are the only enzymes unique to gluconeogenesis; every other step is a glycolytic enzyme running backwards.

## answer_d
5

## explanation_d
Five would be one too many, and no fifth unique enzyme exists. It catches a student who counts the enzymes correctly but adds phosphoglucomutase or another shared reversible step.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-C2C88203E4A918

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
Name the four key enzymes of gluconeogenesis and the glycolytic step each bypasses, and explain why the conversion of pyruvate to phosphoenolpyruvate is partly mitochondrial and partly cytosolic.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 56, file page 99. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p99-q56. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-CA158E720328

## title
How many irreversible reactions are required to convert pyruvate to PEP in gluconeogenesis?

## question
How many irreversible reactions are required to convert pyruvate to PEP in gluconeogenesis?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
2

## explanation_a
Getting from pyruvate to phosphoenolpyruvate takes **two** irreversible reactions, in two different compartments. First, **pyruvate carboxylase** in the mitochondrion carboxylates pyruvate to oxaloacetate, using ATP, CO2, biotin and magnesium. Second, **phosphoenolpyruvate carboxykinase** in the cytosol converts oxaloacetate to 2-phosphoenolpyruvate, using GTP and releasing the CO2 that was just added. Between them lies a transport problem rather than a reaction: oxaloacetate cannot cross the inner mitochondrial membrane, so it is reduced to malate, crosses, and is reoxidised — the dicarboxylic acid shuttle. Two enzymes, two nucleotides, two compartments, and a carbon added and removed for no net gain except a great deal of free energy.

## answer_b
3

## explanation_b
Three is the number of irreversible steps in glycolysis as a whole, not the number in this one bypass.

## answer_c
4

## explanation_c
Four is the total number of gluconeogenic key enzymes across the entire pathway, which is a different count again. This question and the one before it are deliberately paired to see whether the two numbers have been kept apart.

## answer_d
6

## explanation_d
Six corresponds to no reaction count. It is the number of ATP the book gives as the cost of making one glucose from two pyruvates.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-C2C88203E4A918

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
Name the four key enzymes of gluconeogenesis and the glycolytic step each bypasses, and explain why the conversion of pyruvate to phosphoenolpyruvate is partly mitochondrial and partly cytosolic.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 57, file page 99. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p99-q57. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-40AB6778104B

## title
Which of the following tissues is solely dependent on gluconeogenesis during fasting?

## question
Which of the following tissues is solely dependent on gluconeogenesis during fasting?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Red blood cells

## explanation_a
The red cell has no mitochondria, so it cannot oxidise fatty acids or ketone bodies and **glucose is its only source of ATP in every condition**. During fasting, once liver glycogen is exhausted, the only glucose available is the glucose gluconeogenesis makes — so the red cell is wholly dependent on it. There is a neat circularity worth noticing: the red cell is also a continuous source of the lactate that the liver uses as gluconeogenic substrate, so it partly supplies the raw material for its own fuel through the Cori cycle.

## answer_b
Liver

## explanation_b
The liver is where gluconeogenesis happens; it is the supplier, not a dependant, and it meets its own energy needs by oxidising fatty acids in fasting.

## answer_c
Skeletal muscle

## explanation_c
Skeletal muscle in fasting shifts largely to fatty acids and ketone bodies, sparing glucose for the tissues that cannot make that switch. It is also exporting alanine and lactate as gluconeogenic substrate rather than consuming glucose.

## answer_d
Cardiac muscle

## explanation_d
Cardiac muscle is a fatty-acid burner by preference and adapts readily to ketone bodies. Like skeletal muscle, it has mitochondria and therefore has alternatives.

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## main_concept
CON-FND-F6450B9D5AB855

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.7

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.55

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the tissue that depends on glucose in all conditions and the tissue that depends on gluconeogenesis during fasting, and explain why fat oxidation still needs some glucose.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 58, file page 99. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p99-q58. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-14EF0C109489

## title
Which of the following gluconeogenic conversions occurs partially in the mitochondria and partially in the cytosol?

## question
Which of the following gluconeogenic conversions occurs partially in the mitochondria and partially in the cytosol?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Pyruvate to phosphoenolpyruvate

## explanation_a
It is the only step in the pathway that crosses a membrane. **Pyruvate carboxylase is mitochondrial** and makes oxaloacetate inside the matrix; **PEPCK is cytosolic** and must act on oxaloacetate outside it. But oxaloacetate cannot cross the inner mitochondrial membrane, so malate dehydrogenase reduces it to malate, malate crosses, and a cytosolic malate dehydrogenase oxidises it back — the **dicarboxylic acid shuttle**. That detour is not decoration: it also carries reducing equivalents into the cytosol as NADH, which gluconeogenesis needs at the glyceraldehyde 3-phosphate dehydrogenase step running in reverse. All the remaining gluconeogenic key enzymes are cytosolic, which is why this is the one conversion split between compartments.

## answer_b
Phosphoenolpyruvate to fructose 1,6-bisphosphate

## explanation_b
Everything from phosphoenolpyruvate up to fructose 1,6-bisphosphate is reversed glycolysis, and every glycolytic enzyme is cytosolic.

## answer_c
Fructose-1,6-bisphosphate to fructose 6-phosphate

## explanation_c
Fructose 1,6-bisphosphatase is a cytosolic enzyme, as its glycolytic counterpart PFK-1 is.

## answer_d
Glucose-6-phosphate to glucose

## explanation_d
Although it is the most interesting near-miss. Glucose 6-phosphatase is not free in the cytosol — it sits in the endoplasmic reticulum — but the endoplasmic reticulum is not the mitochondrion, and the book classes the enzyme with the cytosolic ones.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-C2C88203E4A918

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
Name the four key enzymes of gluconeogenesis and the glycolytic step each bypasses, and explain why the conversion of pyruvate to phosphoenolpyruvate is partly mitochondrial and partly cytosolic.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 59, file page 99. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p99-q59. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-556829B012CC

## title
Which of the following enzymes is important for gluconeogenesis and is expressed exclusively in these tissues?

## question
Which of the following enzymes is important for gluconeogenesis and is expressed exclusively in these tissues?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
Gluconeogenesis occurs in the liver and kidneys.

## format
single best answer

## correct_answer
A

## answer_a
Glucose-6-phosphatase

## explanation_a
The restriction is the reason the tissue list in the stem reads as it does. The book says gluconeogenesis occurs mainly in the liver and to a lesser extent in the kidney **because those tissues have glucose 6-phosphatase and fructose 1,6-bisphosphatase**. Glucose 6-phosphatase is the last step, and without it a cell cannot release free glucose into the blood however much glucose 6-phosphate it has made. That same restriction explains why muscle glycogen cannot raise blood glucose, why lactate has to travel to the liver in the Cori cycle, and why von Gierke's disease — a defect in this enzyme — blocks glycogenolysis and gluconeogenesis together.

## answer_b
Phosphoglycerate kinase

## explanation_b
Phosphoglycerate kinase is a glycolytic enzyme present in every cell, including the red cell, where it makes one of the two substrate-level ATP.

## answer_c
Malate dehydrogenase

## explanation_c
Malate dehydrogenase is a citric acid cycle enzyme and is present in the mitochondria of all tissues that have them; a cytosolic isoform serves the dicarboxylic acid shuttle.

## answer_d
Pyruvate carboxylase

## explanation_d
It is the best wrong answer, because pyruvate carboxylase genuinely is a gluconeogenic key enzyme. But it is not confined to liver and kidney — it is present in other tissues, where it performs the anaplerotic job of replenishing oxaloacetate for the citric acid cycle. Being a key enzyme and being tissue-restricted are two different properties, and only one of them is being asked about.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-C2C88203E4A918

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
Name the four key enzymes of gluconeogenesis and the glycolytic step each bypasses, and explain why the conversion of pyruvate to phosphoenolpyruvate is partly mitochondrial and partly cytosolic.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 60, file page 99. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p99-q60. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-A7BF685CEC8E

## title
Which of the following hormones lowers blood glucose level by inhibition of gluconeogenesis?

## question
Which of the following hormones lowers blood glucose level by inhibition of gluconeogenesis?

## subject
endo

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Nor-epinephrine

## explanation_a
Noradrenaline is a catecholamine and an anti-insulin hormone; with adrenaline it raises blood glucose during stress, and the book notes that catecholamines also inhibit insulin secretion.

## answer_b
Glucagon

## explanation_b
It is the direct opponent of the right answer. Glucagon is the **main inducer of the gluconeogenic key enzymes**, and in the liver it stimulates glycogenolysis and gluconeogenesis while inhibiting glycolysis and glycogenesis.

## answer_c
Insulin

## explanation_c
**Insulin is the only hypoglycaemic hormone**, and the book states it in exactly those words. It lowers blood glucose three ways: by increasing uptake through GLUT-4 in heart, skeletal muscle and adipose tissue; by increasing utilisation through oxidation, glycogenesis and lipogenesis; and by decreasing hepatic output, which means decreasing both glycogenolysis and **gluconeogenesis**. Set against it are five anti-insulin hormones — glucagon, epinephrine, cortisol, growth hormone and thyroid hormones. That asymmetry, one down against five up, is worth carrying: physiologically a fatal hypoglycaemia is a far more urgent threat than a transient hyperglycaemia, and the redundancy is built accordingly.

## answer_d
Epinephrine

## explanation_d
Adrenaline is an anti-insulin hormone acting on liver, muscle and adipose tissue, and it raises blood glucose.

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## main_concept
CON-END-0B615572003514

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
9

## clinical_relevance
0.85

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the only hypoglycaemic hormone and the five anti-insulin hormones, and describe what insulin and glucagon each do to cAMP and to the liver.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 61, file page 99. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p99-q61. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-C0CD8D472D1F

## title
What is the major fate of glucose-6-phosphate in all tissues in the fed state?

## question
What is the major fate of glucose-6-phosphate in all tissues in the fed state?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Isomerization to Fructose-6-phosphate

## explanation_a
The phrase to weigh in the stem is **"in all tissues"**. Glucose 6-phosphate stands at the junction of five pathways — glycolysis, gluconeogenesis, the pentose phosphate pathway, glycogenesis and glycogenolysis — but only one of them runs in every tissue. Isomerisation to fructose 6-phosphate by phosphohexose isomerase carries it into **glycolysis**, which the book calls the main pathway for glucose oxidation and which proceeds in the cytosol of all cells. The alternatives are all tissue-restricted, which is what makes this answer the majority one by default as much as by volume.

## answer_b
Hydrolysis to glucose

## explanation_b
It is restricted to two tissues. Hydrolysis to free glucose requires glucose 6-phosphatase, which only liver and kidney possess — and in any case releasing glucose in the fed state would be the wrong direction entirely.

## answer_c
Conversion to glycogen

## explanation_c
Glycogenesis is a genuine and important fed-state fate, and in liver and muscle a substantial one — but liver and muscle are not "all tissues", and even in them glycolysis handles more of the flux.

## answer_d
Conversion to ribulose-6 phosphate

## explanation_d
This misses twice over. The pentose phosphate pathway is active only in certain tissues — liver, thyroid, adrenal cortex, adipose tissue, gonads, retina, lactating mammary gland and the red cell — and its product is ribulose **5**-phosphate, not ribulose 6-phosphate.

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## main_concept
CON-FND-051CF62C7920A3

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.55

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the metabolite common to glycolysis, glycogen synthesis and the pentose phosphate pathway, and state its major fate in the fed state.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 62, file page 100. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p100-q62. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-78B0C3A81A9E

## title
Which of the following is solely dependent on glucose as fuel in all conditions?

## question
Which of the following is solely dependent on glucose as fuel in all conditions?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Kidney

## explanation_a
The renal cortex readily oxidises fatty acids, and during fasting the kidney becomes an important site of gluconeogenesis rather than a glucose dependant.

## answer_b
Brain

## explanation_b
It is the answer the phrase "in all conditions" is designed to exclude. The brain is heavily glucose-dependent and cannot use fatty acids — they travel bound to albumin and cannot cross the blood–brain barrier — but after five to six days of starvation it **adapts to oxidising ketone bodies**. That adaptation is what makes prolonged starvation survivable, and it is what disqualifies the brain from "all conditions".

## answer_c
Heart

## explanation_c
The heart prefers fatty acids and uses ketone bodies and lactate readily; it is among the least glucose-dependent tissues in the body.

## answer_d
RBCs

## explanation_d
The mature red blood cell has **no mitochondria**, so it has no citric acid cycle, no respiratory chain and no β-oxidation — it cannot burn a fatty acid or a ketone body under any circumstances, however long the starvation. Glucose is its only fuel and glycolysis its only pathway, and the ATP comes from substrate level phosphorylation at phosphoglycerate kinase and pyruvate kinase. That absolute dependence is why the book names supplying the red cell as one of the reasons gluconeogenesis exists, and it is also why a glycolytic enzyme defect such as pyruvate kinase deficiency destroys the cell outright.

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## main_concept
CON-FND-F6450B9D5AB855

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
6

## clinical_relevance
0.7

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.55

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the tissue that depends on glucose in all conditions and the tissue that depends on gluconeogenesis during fasting, and explain why fat oxidation still needs some glucose.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 63, file page 100. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p100-q63. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-8966CD426848

## title
The activity of which of the following enzymes is increased in diabetes mellitus

## question
The activity of which of the following enzymes is increased in diabetes mellitus

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Glucokinase

## explanation_a
It moves the wrong way. Glucokinase is **induced by insulin** and repressed by glucagon, so a low insulin-to-anti-insulin ratio lowers it. That is part of why a diabetic liver takes up so little of the glucose already in the blood.

## answer_b
Acetyl CoA carboxylase

## explanation_b
Acetyl-CoA carboxylase commits acetyl-CoA to fatty acid synthesis and is an insulin-dependent, fed-state enzyme. In diabetes lipogenesis falls and lipolysis rises, which is the opposite direction.

## answer_c
Pyruvate carboxylase

## explanation_c
Untreated diabetes is metabolically a state of exaggerated fasting: the insulin-to-anti-insulin ratio is low, so the anti-insulin hormones dominate. Anti-insulin hormones — glucagon, epinephrine and glucocorticoids — act as **inducers of pyruvate carboxylase**, and the increased fatty acid oxidation of that state raises acetyl-CoA, which is the enzyme's **allosteric activator**. Induction and allosteric activation therefore push the same way, pyruvate is directed to oxaloacetate and on to glucose, and hepatic gluconeogenesis rises — which is a large part of why the blood glucose is high even when the patient is not eating. The general rule this question rewards is that insulin-dependent enzymes fall in diabetes and gluconeogenic ones rise.

## answer_d
Glycogen synthase

## explanation_d
Glycogen synthase is activated by insulin through protein phosphatase-1 and is correspondingly inactive in diabetes; the liver does not store what it is busy exporting.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-7B3B4F0BEBF198

## concept_ids
CON-END-0B615572003514

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Pathophysiology

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
9

## clinical_relevance
0.65

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.85

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
Explain how increased fatty acid oxidation activates gluconeogenesis and inhibits glycolysis, and predict which key enzymes rise and which fall in prolonged fasting and in diabetes mellitus.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 64, file page 100. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p100-q64. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-17063EB3D646

## title
One of the following hormones has no effect on serum glucose level:

## question
One of the following hormones has no effect on serum glucose level:

## subject
endo

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Glucagon

## explanation_a
Glucagon is the principal anti-insulin hormone: secreted by the pancreatic α-cells in fasting or hypoglycaemia, it acts mainly on the liver to stimulate glycogenolysis and gluconeogenesis and to inhibit glycolysis and glycogenesis.

## answer_b
Epinephrine

## explanation_b
Epinephrine is an anti-insulin hormone released in stress, acting on liver as glucagon does, on muscle to stimulate glycogenolysis, and on adipose tissue to stimulate lipolysis. The book adds that catecholamines also inhibit insulin secretion, and that chronic excess can produce a stress diabetes.

## answer_c
Cortisol

## explanation_c
Cortisol is an anti-insulin hormone that stimulates lipolysis, drives protein catabolism to supply amino acids for gluconeogenesis, and reduces glucose utilisation in extrahepatic tissues. Its excess causes steroid diabetes, as in Cushing syndrome.

## answer_d
Vasopressin

## explanation_d
The book's roster of hormones regulating blood glucose is closed and short: **insulin, the only hypoglycaemic hormone**, against five anti-insulin hormones — glucagon, epinephrine, cortisol, growth hormone and thyroid hormones. **Vasopressin appears nowhere on it.** Vasopressin, or antidiuretic hormone, regulates water reabsorption in the collecting duct and, at higher concentrations, vascular tone; it has no established role in carbohydrate metabolism. Questions of this shape are answered by knowing the list, and the list is worth learning as a list — six hormones, one down and five up.

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## main_concept
CON-END-0B615572003514

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
9

## clinical_relevance
0.85

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the only hypoglycaemic hormone and the five anti-insulin hormones, and describe what insulin and glucagon each do to cAMP and to the liver.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 65, file page 100. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p100-q65. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-2268683ED1D8

## title
Glucose-6-phosphatase deficiency is complicated by:

## question
Glucose-6-phosphatase deficiency is complicated by:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
Hypouricemia

## explanation_a
It is the opposite of the truth. Von Gierke's disease produces **hyper**uricaemia, by two routes: the accumulated glucose 6-phosphate is diverted through the pentose phosphate pathway into excess purine synthesis and so into excess urate, and the lactic acid that also accumulates competes with urate for renal excretion.

## answer_b
Hypoglycemia

## explanation_b
Glucose 6-phosphatase deficiency is **von Gierke's disease**, type I glycogen storage disease, and fasting hypoglycaemia is its principal effect. The reason is that glycogenolysis and gluconeogenesis both end at glucose 6-phosphate, so without the phosphatase neither can release free glucose — no net glucose is formed at all, and the liver enlarges with glycogen it cannot export. The other three principal effects follow from the same block: lactic acidosis, because the accumulated glucose 6-phosphate goes down glycolysis; hyperuricaemia, by the two routes above; and hyperlipidaemia with a fatty liver, because the hypoglycaemia drives epinephrine, epinephrine drives lipolysis, and the fatty acids reaching the liver are esterified.

## answer_c
Hemolytic anemia

## explanation_c
It belongs to a different enzyme with a confusingly similar name. Haemolytic anaemia follows glucose 6-phosphate **dehydrogenase** deficiency — favism — where the failure is of NADPH supply and antioxidant defence, not of glucose release.

## answer_d
Hypocholesterolemia

## explanation_d
Again the wrong direction: the condition causes hyperlipidaemia, not hypocholesterolaemia.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-1BE461A57AB76D

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Pathophysiology

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Clinical

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
6

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
Name the enzyme defective in von Gierke's disease and derive its four metabolic features — hypoglycaemia, lactic acidosis, hyperuricaemia and hyperlipidaemia — from the one block.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 66, file page 100. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p100-q66. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-7C02181DBCD3

## title
Skeletal muscle is deficient in:

## question
Skeletal muscle is deficient in:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Glucose-6-phosphatase

## explanation_a
**Glucose 6-phosphatase** is present in liver and kidney and absent from skeletal muscle, and that absence has consequences the book returns to repeatedly. Muscle glycogen cannot maintain blood glucose directly, because glycogenolysis ends at glucose 6-phosphate and a phosphorylated sugar cannot leave the cell. Muscle cannot perform gluconeogenesis to any useful end for the same reason. And the glucose 6-phosphate that muscle does produce has only one destination — glycolysis, supplying the contracting fibre itself. The indirect route, in which muscle exports lactate for the liver to convert to glucose, is the Cori cycle, and it exists precisely because of this missing enzyme.

## answer_b
Hexokinase

## explanation_b
Hexokinase is the *characteristically muscular* enzyme — present in all tissue cells, with a low Km and product inhibition by glucose 6-phosphate. It is glucokinase that muscle lacks.

## answer_c
Isomerase

## explanation_c
Phosphohexose isomerase is a glycolytic enzyme present in every cell that performs glycolysis, which is every cell.

## answer_d
Phosphofructokinase

## explanation_d
PFK-1 is present and is the main control point of glycolysis in muscle, inhibited by ATP and by the low pH of anaerobic work and activated by AMP.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-3905E3B98C2EC4

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
8

## clinical_relevance
0.6

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
State the major product of glycogenolysis, and explain why muscle glycogen cannot raise blood glucose while liver glycogen can.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 67, file page 100. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p100-q67. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-A8FC427F0CFF

## title
The activity of one the following enzymes is decreased in starvation:

## question
The activity of one the following enzymes is decreased in starvation:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Pyruvate kinase

## explanation_a
It is the only glycolytic enzyme in the list. In starvation the insulin-to-anti-insulin ratio falls, and glucagon represses the glycolytic key enzymes — glucokinase, PFK-1 and **pyruvate kinase** — while also phosphorylating pyruvate kinase to its inactive form through cAMP and protein kinase A. On top of that, the increased fatty acid oxidation of starvation raises ATP, which allosterically inhibits the same enzyme. So pyruvate kinase falls by induction and by allostery at once, which is exactly what you would want: a starving liver must not be burning the glucose it is trying to make. The other three options are all gluconeogenic key enzymes, and all rise.

## answer_b
Pyruvate carboxylase

## explanation_b
It rises. Pyruvate carboxylase is induced by anti-insulin hormones and allosterically activated by the acetyl-CoA that fatty acid oxidation supplies.

## answer_c
Phosphoenolpyruvate carboxykinase

## explanation_c
PEPCK is a gluconeogenic key enzyme and glucagon is its main inducer, so its activity increases in starvation.

## answer_d
Glucose 6-phosphatase

## explanation_d
Glucose 6-phosphatase is the last step of gluconeogenesis and is likewise increased — without it the glucose could not be released.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-7B3B4F0BEBF198

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.65

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.85

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
Explain how increased fatty acid oxidation activates gluconeogenesis and inhibits glycolysis, and predict which key enzymes rise and which fall in prolonged fasting and in diabetes mellitus.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 68, file page 100. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p100-q68. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-0B7EB86286F4

## title
In which of the following tissues does glucose-6-P serve as a source of blood glucose rather than a source of ATP generation?

## question
In which of the following tissues does glucose-6-P serve as a source of blood glucose rather than a source of ATP generation?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Muscle

## explanation_a
Muscle lacks glucose 6-phosphatase, so its glucose 6-phosphate can only go down glycolysis and generate ATP for the contracting fibre. It is the type example of the opposite case.

## answer_b
RBCs

## explanation_b
The red cell is the most extreme opposite case: with no mitochondria at all, glycolysis is its only pathway, and every glucose 6-phosphate it makes exists to generate ATP.

## answer_c
Liver

## explanation_c
The **liver** is the main organ of glucose homeostasis, and it is the only tissue in this list with **glucose 6-phosphatase** — the enzyme that removes the phosphate and lets free glucose leave the cell. In fasting, the liver dephosphorylates the glucose 6-phosphate coming from glycogenolysis and gluconeogenesis and exports the glucose to the blood for the brain and the red cell. Note that this is a matter of the *dietary state* as well as the tissue: after a meal the same liver increases glucose oxidation, glycogenesis and lipogenesis, and decreases glycogenolysis and gluconeogenesis. The kidney is the only other tissue that can do the same job, and it becomes important in prolonged starvation.

## answer_d
Brain

## explanation_d
The brain lacks glucose 6-phosphatase and is a net consumer of glucose in every condition, not a source of it.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-3905E3B98C2EC4

## concept_ids
CON-FND-051CF62C7920A3

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
8

## clinical_relevance
0.6

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
State the major product of glycogenolysis, and explain why muscle glycogen cannot raise blood glucose while liver glycogen can.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 69, file page 101. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p101-q69. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-13D60190D939

## title
Which of the following hormones leads to the degradation of cAMP and the resultant inactivation of protein kinase-A when binds to plasma membrane receptors?

## question
Which of the following hormones leads to the degradation of cAMP and the resultant inactivation of protein kinase-A when binds to plasma membrane receptors?

## subject
endo

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
Cortisol

## explanation_a
It fails on the receptor as well as on the mechanism. Cortisol is a steroid that crosses the membrane and acts on intracellular receptors to change gene transcription; it does not bind a plasma membrane receptor and does not act through cAMP.

## answer_b
Epinephrine

## explanation_b
It does the opposite. Epinephrine activates adenylyl cyclase through its β-receptors, **raising** cAMP and activating protein kinase A in liver and muscle.

## answer_c
Glucagon

## explanation_c
It is the other cAMP-raising hormone. Glucagon activates adenylyl cyclase in the liver, increases cAMP production and so activates protein kinase A — which then phosphorylates and inactivates pyruvate kinase and glycogen synthase, and phosphorylates and activates phosphorylase kinase.

## answer_d
Insulin

## explanation_d
Insulin binds a plasma membrane receptor and, among its other actions, **activates phosphodiesterase**, the enzyme that hydrolyses cAMP to 5′-AMP. Lowering cAMP prevents the activation of protein kinase A, which is how insulin reverses every phosphorylation glucagon has just made. It works in parallel with insulin's second mechanism, activation of **protein phosphatase-1**, which removes phosphates already added. Together these two actions activate pyruvate kinase and glycogen synthase and inactivate phosphorylase kinase and glycogen phosphorylase — the fed-state configuration, produced by one hormone acting on one messenger.

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## main_concept
CON-END-0B615572003514

## concept_ids
CON-FND-CA74978B7B7ED1

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.85

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the only hypoglycaemic hormone and the five anti-insulin hormones, and describe what insulin and glucagon each do to cAMP and to the liver.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 70, file page 101. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p101-q70. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-989AF940DDF4

## title
Which of the following statements best describes the action of glucagon?

## question
Which of the following statements best describes the action of glucagon?

## subject
endo

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
It acts on skeletal muscle, liver, and adipose tissue

## explanation_a
It describes **epinephrine** rather than glucagon. Epinephrine is the hormone effective in liver, muscle and adipose tissue together. Glucagon's reach is far narrower — skeletal muscle does not respond to it, because it has no glucagon receptor, which is why a hypoglycaemic patient given glucagon mobilises hepatic and not muscular glycogen.

## answer_b
It acts primarily on the liver to maintain blood glucose levels

## explanation_b
Glucagon is secreted by the α-cells of the pancreatic islets in response to fasting or to any fall in blood glucose, and the book says it **affects liver cells mainly**. There it stimulates glycogenolysis and gluconeogenesis and inhibits glycolysis and glycogenesis, working through adenylyl cyclase, cAMP and protein kinase A. The insulin-to-glucagon ratio is described as the main regulator of blood glucose, and a fall in it is among the causes of type 2 diabetes. The liver focus is what makes glucagon the emergency treatment for hypoglycaemia: it liberates hepatic glycogen quickly, which is precisely where the reserve of exportable glucose is.

## answer_c
Its concentration in the blood increases after a high-carbohydrate meal

## explanation_c
It is inverted. A high-carbohydrate meal raises blood glucose, which raises insulin and **suppresses** glucagon. Glucagon is a fasting hormone.

## answer_d
Its concentration increases in the blood when insulin levels increase

## explanation_d
For the same reason. Insulin and glucagon move in opposite directions — that reciprocity is what makes their ratio a meaningful signal at all.

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## main_concept
CON-END-0B615572003514

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.85

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the only hypoglycaemic hormone and the five anti-insulin hormones, and describe what insulin and glucagon each do to cAMP and to the liver.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 71, file page 101. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p101-q71. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
OCR repair: the extraction appended the artefact "eeveeseoe" to option d. Removed; the printed option ends "when insulin levels increase".

---

# Item

## id
QM-103-E9DBD0BDB7D0

## title
Glycogenolysis is ……… by glucagon and gluconeogenesis is……..by glucagon.

## question
Glycogenolysis is ……… by glucagon and gluconeogenesis is……..by glucagon.

## subject
endo

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
Inactivated; Inactivated

## explanation_a
It is the insulin response rather than the glucagon one. Insulin decreases hepatic glycogenolysis and gluconeogenesis together, which is how it lowers hepatic glucose output.

## answer_b
Activated; Activated

## explanation_b
Glucagon is a fasting hormone whose task is to raise blood glucose, and it therefore switches on **both** of the liver's routes to producing it. Glycogenolysis is activated through cAMP, protein kinase A and phosphorylase kinase, and it supplies blood glucose for the first twelve to eighteen hours. Gluconeogenesis is activated because glucagon is the **main inducer of the gluconeogenic key enzymes**, and it takes over as the main source once liver glycogen is depleted. The two are sequential rather than alternative, which is why a single hormone drives both. The corresponding pair that glucagon *inhibits* is glycolysis and glycogenesis — the two pathways that would consume glucose or store it.

## answer_c
Inactivated; Activated

## explanation_c
Inactivating glycogenolysis would remove the first and fastest source of glucose, which defeats the purpose of the hormone.

## answer_d
Activated; Inactivated

## explanation_d
Inactivating gluconeogenesis would leave the liver with nothing to fall back on once its glycogen was exhausted, at exactly the point in a fast when glucose matters most.

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## main_concept
CON-END-0B615572003514

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
9

## clinical_relevance
0.85

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the only hypoglycaemic hormone and the five anti-insulin hormones, and describe what insulin and glucagon each do to cAMP and to the liver.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 72, file page 101. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p101-q72. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
OCR repair: the extraction scrambled the stem, recording it as "Glycogenolysis is glucagon" and appending "by glucagon and gluconeogenesis is" to option d. Repaired from file page 101, which prints "Glycogenolysis is ……… by glucagon and gluconeogenesis is……..by glucagon."

---

# Item

## id
QM-103-540D9F2D24D2

## title
In starvation, nitrogen is carried from muscles to the liver in the form of:

## question
In starvation, nitrogen is carried from muscles to the liver in the form of:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
A

## answer_a
Alanine

## explanation_a
When muscle degrades amino acids for energy in starvation, the nitrogen released has to be disposed of safely, and muscle cannot make urea. It transaminates the amino group onto **pyruvate** — which glycolysis is supplying — to form **alanine**, and alanine travels in the blood to the liver. There transdeamination strips the nitrogen off for the urea cycle, and the carbon skeleton, back as pyruvate, is converted to glucose by gluconeogenesis and returned to the muscle. That round trip is the **glucose–alanine cycle**, and the elegance of it is that one molecule carries both the waste nitrogen out and the fuel carbon back. It is also why the book says protein becomes the main source of blood glucose in prolonged fasting.

## answer_b
Serine

## explanation_b
Serine is derived from 3-phosphoglycerate and is glucogenic, but it is not the designated nitrogen carrier from muscle.

## answer_c
Glycine

## explanation_c
Glycine is involved in one-carbon metabolism and in haem synthesis, and it is not the muscle-to-liver nitrogen shuttle.

## answer_d
Asparagine

## explanation_d
It is the most tempting wrong answer because asparagine and glutamine both carry amide nitrogen. Glutamine is indeed a major nitrogen carrier in blood generally — but the cycle that is named after glucose, and that pairs nitrogen transport with gluconeogenesis, uses alanine.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-E7214B4A8D8835

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
5

## clinical_relevance
0.45

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
Name the amino acid that carries nitrogen from muscle to liver during starvation, and describe what happens to its nitrogen and to its carbon skeleton on arrival.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 73, file page 101. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p101-q73. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-D4A3209C3E36

## title
Which body condition favors gluconeogenesis over glycolysis?

## question
Which body condition favors gluconeogenesis over glycolysis?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
High blood sugar

## explanation_a
It is the reverse. A high blood sugar raises insulin, and insulin increases the glycolytic key enzymes while decreasing the gluconeogenic ones. Making more glucose when glucose is already plentiful would be pointless.

## answer_b
Prolonged fasting

## explanation_b
**Prolonged fasting** is the state gluconeogenesis exists for. The book's timing is precise: it begins four to six hours after the last meal at a slow rate and becomes the main source of blood glucose after 12 to 18 hours, once liver glycogen is depleted. The mechanism has two layers. Hormonally, the insulin-to-anti-insulin ratio falls, and glucagon induces the gluconeogenic key enzymes while repressing the glycolytic ones. Allosterically, the anti-insulin hormones drive lipolysis, the free fatty acids reaching the liver are oxidised, and that oxidation raises ATP — inhibiting PFK-1, pyruvate kinase and pyruvate dehydrogenase — and raises acetyl-CoA, which activates pyruvate carboxylase. Fat therefore pays for the manufacture of glucose it cannot itself become.

## answer_c
Increasing cellular level of AMP

## explanation_c
It points the other way. AMP is a signal of energy deficit: it **activates PFK-1** and inhibits fructose 1,6-bisphosphatase, so it favours glycolysis. This is the option that catches a student reasoning that "low energy means make glucose", when in fact low energy means burn glucose.

## answer_d
Low cellular level of pyruvate

## explanation_d
Gluconeogenesis consumes pyruvate, so a shortage of it would limit the pathway rather than favour it.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-7B3B4F0BEBF198

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
9

## clinical_relevance
0.65

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.85

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
Explain how increased fatty acid oxidation activates gluconeogenesis and inhibits glycolysis, and predict which key enzymes rise and which fall in prolonged fasting and in diabetes mellitus.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 74, file page 101. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p101-q74. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Suspect flag "option ran on": the extraction merged printed question 75 into option d and produced a spurious option e. Repaired from file page 101, where the printed options are a) High blood sugar, b) Prolonged fasting, c) Increasing cellular level of AMP, d) Low cellular level of pyruvate. Printed question 75 is authored separately.

---

# Item

## id
QM-103-7D8939DA3DC7

## title
During starvation oxaloacetate doesn't condense with acetyl CoA in the liver. This is due to its conversion to:

## question
During starvation oxaloacetate doesn't condense with acetyl CoA in the liver. This is due to its conversion to:

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
D

## answer_a
pyruvate

## explanation_a
The direction of the traffic is the problem. Oxaloacetate can be decarboxylated to pyruvate — malate can, by malic enzyme — but that is not what consumes it in starvation, and pyruvate is where oxaloacetate comes *from* in this state, by way of pyruvate carboxylase.

## answer_b
citrate

## explanation_b
It is precisely the reaction the stem says is not happening. Citrate is what oxaloacetate forms *when* it condenses with acetyl-CoA at citrate synthase; the question is asking where the oxaloacetate has gone instead.

## answer_c
ketone bodies

## explanation_c
It reverses cause and effect in a way worth naming. Ketone bodies are made from the **acetyl-CoA** that is left over once oxaloacetate is unavailable — they are the consequence of this shortage, not its cause, and they are made from a different molecule.

## answer_d
glucose

## explanation_d
This single fact links three chapters. In starvation the liver is running gluconeogenesis hard, and gluconeogenesis draws oxaloacetate off through PEPCK to make phosphoenolpyruvate and then **glucose**. Since oxaloacetate is what citrate synthase needs to admit acetyl-CoA into the citric acid cycle, the cycle slows. Meanwhile β-oxidation of fatty acids is pouring acetyl-CoA into a liver that can no longer condense it — and the surplus is diverted to **ketogenesis**. That is why starvation, uncontrolled diabetes and a low-carbohydrate diet all produce ketosis: the common factor is a high anti-insulin to insulin ratio, which simultaneously accelerates gluconeogenesis and lipolysis, so that oxaloacetate is consumed at exactly the moment acetyl-CoA becomes abundant.

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## main_concept
CON-FND-7B3B4F0BEBF198

## concept_ids
CON-END-CC450A236ABF50

## contextual_concept_ids
[clear]

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
9

## clinical_relevance
0.65

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.85

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## resource_ids
[clear]

## learning_objective
Explain how increased fatty acid oxidation activates gluconeogenesis and inhibits glycolysis, and predict which key enzymes rise and which fall in prolonged fasting and in diabetes mellitus.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 75, file page 101. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
85

## randomise_answers
yes

## author_notes
Not present in the 102 INT lane’s extraction: the printed question was swallowed by an OCR run-on into a neighbouring item. Recovered in full from the page. correctSource, established here: "printed key (file page 103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
This item is not in the extracted bank: the 102 lane's OCR merged its stem and first two options into option d of printed question 74, and its remaining options into a spurious option e. Recovered in full from file page 101, and its key read from the printed table on file page 103, which gives 75. d.

---

# Item

## id
QM-103-A400518AC0F8

## title
An overnight fast leads to which of the following?

## question
An overnight fast leads to which of the following?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
C

## answer_a
Inhibition of adenylyl cyclase

## explanation_a
It is the fed-state answer. Adenylyl cyclase is *activated* in fasting, by glucagon; it is insulin that opposes cAMP, and it does so through phosphodiesterase rather than by inhibiting the cyclase.

## answer_b
Activation of glycogen synthase

## explanation_b
Glycogen synthase is active when dephosphorylated, and fasting phosphorylates it — so it is **inactivated**. Storing glycogen during a fast would be the wrong direction entirely.

## answer_c
Activation of protein kinase A

## explanation_c
Everything else in the fasting liver follows from it. An overnight fast lowers blood glucose, which raises glucagon; glucagon activates adenylyl cyclase, cAMP rises, and cAMP activates **protein kinase A**. From that one activation the whole fasting configuration is generated: protein kinase A phosphorylates glycogen synthase, inactivating it; phosphorylates phosphorylase kinase, activating it, which then phosphorylates and activates glycogen phosphorylase; and phosphorylates pyruvate kinase, inactivating it and so shutting down glycolysis. One kinase, four consequences, all pointing the same way — release glucose, stop consuming it.

## answer_d
Inhibition of glycogen phosphorylase

## explanation_d
It is the reverse. Glycogen phosphorylase is active when phosphorylated, and fasting phosphorylates it — so it is **activated**, which is how liver glycogen supplies blood glucose overnight.

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## main_concept
CON-FND-CA74978B7B7ED1

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.55

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.85

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids
[clear]

## learning_objective
Trace the cascade from glucagon or epinephrine to activated glycogen phosphorylase, name the enzyme that does the covalent modification, and predict the direction of both enzymes after a meal and after an overnight fast.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 76, file page 102. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p102-q76. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-0D171179E736

## title
Which of the following enzymes is most likely inhibited?

## question
Which of the following enzymes is most likely inhibited?

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A middle-aged man is admitted to hospital with symptoms of heart disease, because of deficiency in vitamin B1 (thiamine). The active form of the vitamin, thiamine pyrophosphate, is a cofactor for certain enzymes.

## format
single best answer

## correct_answer
C

## answer_a
Aconitase

## explanation_a
Aconitase requires ferrous iron and reduced glutathione, not thiamine pyrophosphate. It is memorable as the target of fluorocitrate in fluoroacetate poisoning.

## answer_b
Citrate synthase

## explanation_b
Citrate synthase needs no vitamin-derived cofactor; it is regulated by substrate availability and by feedback from ATP and succinyl-CoA.

## answer_c
Pyruvate dehydrogenase

## explanation_c
The **pyruvate dehydrogenase complex** requires five coenzymes — thiamine pyrophosphate, lipoate, coenzyme A, FAD and NAD⁺ — and TPP is the first of them, so a thiamine deficiency inhibits it. The consequence is that pyruvate accumulates and is converted to lactate, producing a lactic acidosis. Note that a second TPP-dependent complex lies just downstream, the α-ketoglutarate dehydrogenase complex in the citric acid cycle, so the deficiency blocks glucose oxidation at two points. That is why the tissues that suffer are those most dependent on glucose oxidation — the heart, giving the wet beriberi of this vignette, and the nervous system, giving dry beriberi and Wernicke's encephalopathy.

## answer_d
Malate dehydrogenase

## explanation_d
Malate dehydrogenase uses NAD⁺ alone and needs no thiamine.

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## main_concept
CON-FND-229C78C9EB0E78

## concept_ids
CON-FND-C9E5128193029E

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids
[clear]

## learning_objective
Name the enzyme that converts pyruvate to acetyl-CoA, list its coenzymes, and predict what accumulates in blood when it is inhibited by deficiency, by thiamine lack or by arsenic.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 77, file page 102. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p102-q77. correctSource, verbatim: "none".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Answer key recovered by reading the printed key table on file page 103, which gives 77. c. The extraction recorded correct: null with correctSource "none". Suspect flag "option ran on": the extraction merged printed question 78 into option d and produced a spurious option e. Repaired from file page 102, where the printed options are a) Aconitase, b) Citrate synthase, c) Pyruvate dehydrogenase, d) Malate dehydrogenase. Printed question 78 is authored separately.

---

# Item

## id
QM-103-94DDDCD0FBE7

## title
Which one of the following metabolites is used by all cells for glycolysis, glycogen synthesis, and the hexose monophosphate shunt pathway?

## question
Which one of the following metabolites is used by all cells for glycolysis, glycogen synthesis, and the hexose monophosphate shunt pathway?

## subject
fnd

## status
Draft

## owner
Claude

## vignette


## format
single best answer

## correct_answer
B

## answer_a
Glucose-1-phosphate

## explanation_a
Glucose 1-phosphate sits on the glycogen branch — it is what phosphorylase releases and what UDP-glucose pyrophosphorylase consumes — but it is not an intermediate of glycolysis or of the pentose phosphate pathway. It is one step off the crossroads.

## answer_b
Glucose-6-phosphate

## explanation_b
**Glucose 6-phosphate** is the intermediate at the junction of five pathways: glycolysis, gluconeogenesis, the pentose phosphate pathway, glycogenesis and glycogenolysis. Every cell makes it as soon as glucose enters, because hexokinase or glucokinase phosphorylates the sugar at once — which both traps it inside the cell and commits it to metabolism without committing it to any particular pathway. From there the routes diverge: isomerisation to fructose 6-phosphate for glycolysis, conversion to glucose 1-phosphate and then UDP-glucose for glycogen, or oxidation by G6PD for the pentose phosphate pathway. Only in liver and kidney is there a sixth option — hydrolysis by glucose 6-phosphatase to free glucose for export.

## answer_c
UDP-glucose

## explanation_c
UDP-glucose leads only to glycogen and to the uronic acid pathway. It is a committed, activated form, not a branch point.

## answer_d
Fructose-6-phosphate

## explanation_d
It is the near-miss. Fructose 6-phosphate is one step past the junction, already committed to glycolysis — and it lies below the point at which the glycogen and pentose phosphate routes diverge, so it cannot serve them.

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## main_concept
CON-FND-051CF62C7920A3

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.55

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the metabolite common to glycolysis, glycogen synthesis and the pentose phosphate pathway, and state its major fate in the fed state.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 78, file page 102. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Not present in the 102 INT lane’s extraction: the printed question was swallowed by an OCR run-on into a neighbouring item. Recovered in full from the page. correctSource, established here: "printed key (file page 103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
This item is not in the extracted bank: the 102 lane's OCR merged its stem and first two options into option d of printed question 77, and its remaining options into a spurious option e. Recovered in full from file page 102, and its key read from the printed table on file page 103, which gives 78. b.

---

# Item

## id
QM-103-25DC19FC8F24

## title
The patient's glucose level decreased because insulin led to which one of the following?

## question
The patient's glucose level decreased because insulin led to which one of the following?

## subject
endo

## status
Draft

## owner
Claude

## vignette
A 16-year-old patient with type 1 diabetes mellitus is admitted to hospital with a blood glucose of 400 mg/dL. One hour after an insulin infusion is given, her blood glucose has decreased to 230 mg/dL.

## format
single best answer

## correct_answer
B

## answer_a
Stimulation of the transport of glucose across the cell membranes of the liver

## explanation_a
It is a precise trap. Hepatic glucose uptake is through **GLUT-2**, which is *not* insulin dependent — it moves glucose in proportion to the blood concentration whatever the insulin level. GLUT-4, the insulin-dependent transporter, is in heart, skeletal muscle and adipose tissue, not liver. A student who knows insulin promotes glucose uptake but not which transporter it acts on picks this.

## answer_b
Stimulation of the conversion of glucose to glycogen and TAG in the liver

## explanation_b
Insulin lowers blood glucose partly by increasing uptake in the GLUT-4 tissues and partly by increasing **utilisation** — potentiating oxidation, glycogenesis and lipogenesis. In the liver that means the glucose entering through GLUT-2 is committed rather than allowed back out: glycogen synthase is dephosphorylated and activated by protein phosphatase-1, so glucose is stored as glycogen, and lipogenesis converts the surplus to triacylglycerol. At the same time insulin decreases hepatic output by inhibiting glycogenolysis and gluconeogenesis, so the liver stops adding to the problem. Trapping the glucose inside the hepatocyte as glycogen and fat is what actually removes it from the circulation.

## answer_c
Stimulation of glycogenolysis in the liver

## explanation_c
It is the opposite of insulin's action. Glycogenolysis in the liver releases glucose into the blood; insulin inhibits it.

## answer_d
Inhibition of the conversion of muscle glycogen to blood glucose

## explanation_d
The premise is false. Muscle glycogen is never converted to blood glucose in the first place, because muscle lacks glucose 6-phosphatase. Inhibiting a conversion that does not occur cannot lower the blood glucose.

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## main_concept
CON-END-0B615572003514

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
9

## clinical_relevance
0.85

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.9

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Name the only hypoglycaemic hormone and the five anti-insulin hormones, and describe what insulin and glucagon each do to cAMP and to the liver.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 79, file page 102. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p102-q79. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.

---

# Item

## id
QM-103-0B91354569A3

## title
What is the leading cause for the patient's symptoms?

## question
What is the leading cause for the patient's symptoms?

## subject
endo

## status
Draft

## owner
Claude

## vignette
A type 1 diabetic patient who is taking insulin experiences tremors, rapid heartbeats, difficulty concentrating and dizziness. An emergency medical technician administers glucagon, and the symptoms improve.

## format
single best answer

## correct_answer
B

## answer_a
Hyperglycemia

## explanation_a
The treatment given is what rules it out. Glucagon raises blood glucose by stimulating hepatic glycogenolysis and gluconeogenesis; giving it to a hyperglycaemic patient would make matters worse, not better. Whenever a vignette tells you what was given and that it worked, the treatment is a piece of evidence about the diagnosis.

## answer_b
Hypoglycemia

## explanation_b
The symptoms divide neatly in two. Tremor and a rapid heartbeat are **adrenergic**: they are the counter-regulatory sympathetic response to a falling glucose, which is also why sweating, hunger and tingling lips appear on the book's list. Difficulty concentrating and dizziness are **neuroglycopenic**: they are the brain running short of its main fuel, and if the glucose falls further they progress to confusion and loss of consciousness. Insulin overdose is one of the two causes of fasting hypoglycaemia from over-utilisation of glucose that the book names, the other being insulinoma. Glucagon relieves it by liberating hepatic glycogen. Note the book's own caution: estimation of blood glucose is the only evidence of hypoglycaemia, so the symptoms suggest the diagnosis and a measurement confirms it.

## answer_c
Fatty acid release

## explanation_c
Free fatty acid release does accompany hypoglycaemia, since the counter-regulatory hormones drive lipolysis — but it is a downstream event, not the cause of the symptoms, and it would not respond to glucagon in this way.

## answer_d
Cortisol release

## explanation_d
Cortisol is one of the counter-regulatory hormones released *in response to* a low glucose. It is part of the body's answer to the problem, not the problem.

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## main_concept
CON-END-853A9833B36C99

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.95

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Recognise the symptoms of hypoglycaemia, separate fasting from postprandial causes, and interpret a high insulin with a low glucose.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 80, file page 102. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p102-q80. correctSource, verbatim: "none".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
Answer key recovered by reading the printed key table on file page 103, which gives 80. b. The extraction recorded correct: null with correctSource "none". No dose, route or protocol for glucagon is asserted anywhere in this item; the department textbook gives no treatment for hypoglycaemia and the administration is the question's own scenario.

---

# Item

## id
QM-103-5561416460C9

## title
Which of the following would be most consistent with his symptoms and lab results?

## question
Which of the following would be most consistent with his symptoms and lab results?

## subject
endo

## status
Draft

## owner
Claude

## vignette
A 50-year-old man presents with tremors, palpitations, hunger, headache, weakness and confusion. Blood is drawn for various analyses. The laboratory results reveal high insulin and low blood glucose.

## format
single best answer

## correct_answer
A

## answer_a
Insulinoma

## explanation_a
The pair of laboratory results settles it. A **high insulin with a low glucose** is a physiological contradiction: insulin should be suppressed when glucose is low, so an insulin that is high at that moment must be coming from somewhere that is not listening to the glucose. **Insulinoma** — a pancreatic tumour releasing too much insulin — is the book's first named cause of fasting hypoglycaemia from over-utilisation of glucose, the other being an overdose of insulin or of a diabetes medication. The symptoms follow the usual division: tremor, palpitations and hunger are adrenergic counter-regulation, while headache, weakness and confusion are neuroglycopenic.

## answer_b
Pheochromocytoma

## explanation_b
It moves the glucose the wrong way. A phaeochromocytoma secretes catecholamines, which raise blood glucose by stimulating glycogenolysis and gluconeogenesis and by inhibiting insulin secretion — the book lists it as a cause of hyperglycaemic **glucosuria**.

## answer_c
Cushing syndrome

## explanation_c
Again the direction is wrong. Cushing syndrome is glucocorticoid excess, and cortisol raises blood glucose by stimulating protein catabolism and gluconeogenesis and by reducing peripheral glucose use. The book names it as a cause of steroid diabetes.

## answer_d
Acromegaly

## explanation_d
Acromegaly is growth hormone excess, and growth hormone decreases glucose utilisation and induces the liver aminotransferases to drive gluconeogenesis — pituitary diabetes, in the book's phrase. All three wrong options are causes of a *high* glucose, which is what makes them a coherent set: the discrimination rests entirely on reading the laboratory result.

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## main_concept
CON-END-853A9833B36C99

## concept_ids
[clear]

## contextual_concept_ids
[clear]

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.95

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## question_only_for
[clear]

## library_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## resource_ids
[clear]

## learning_objective
Recognise the symptoms of hypoglycaemia, separate fasting from postprandial causes, and interpret a high insulin with a low glucose.

## source_citation
Kasr Alainy, Department of Medical Biochemistry and Molecular Biology, "DPT BOOK MCQ D book bio 102&103 mcq", chapter "Carbohydrate Metabolism", printed question 81, file page 103. Manifest src_07f0a0ff41addf826c7f. Answer key printed on file page 103.

## attached_image


## attachments


## media_recommendations


## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extracted by the 102 INT lane from the department question book and tagged as taught by 103 BMS; the 102 extraction ID is MCQ-102-07f0a0ff-p103-q81. correctSource, verbatim: "printed key (p103)".
resource_ids is present and deliberately empty. It resolves against the catalogue store, not the evidence store the Kasr manifest feeds, so naming src_07f0a0ff41addf826c7f there would error; the source is carried in source_citation instead.
