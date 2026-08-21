<!--
  103 BMS · Biochemistry · the concepts the carbohydrate metabolism, bioenergetics
  and citric acid cycle MCQs test, where nothing already authored covers them.

  THIRTY-SIX NEW CONCEPTS. Thirteen for bioenergetics and the citric acid cycle,
  twenty-three for carbohydrate metabolism. They exist because the 391-item
  department question book (src_07f0a0ff41addf826c7f) examines this material at a
  depth the 2025 end-of-year paper never reached, and the twenty-eight concepts in
  ./103-BMS-biochemistry-concepts.md cover only seven of the 116 items in
  ../question/103-BMS-MCQ-carbohydrate-bioenergetics.md.

  WHAT WAS MAPPED RATHER THAN MINTED. Seven of the seven existing concepts that do
  cover an item are pointed at directly and are NOT re-authored here:

    CON-FND-037BF052DDFC0D  key enzymes of the Krebs cycle
    CON-FND-B928DE79E08882  the HMP pathway is the main source of NADPH
    CON-FND-D8A41B5C23B148  fate of hydrogen peroxide, and the NADPH it needs
    CON-HEM-A1EF4D20C85878  glucose 6-phosphate dehydrogenase
    CON-HEM-4F64967BBFBB6F  favism
    CON-HEM-095C9C97B56CCA  glycolysis is the red cell's only source of ATP
    CON-FND-5F0DC4407DEC51  antioxidant defences (contextual only)

  Twelve live records were found by find-existing.mjs, examined against
  00-START-HERE §4, and deliberately not merged. Each is named in the
  rejected_merge_candidate_ids of the concept it nearly matched, with the reason.
  Two of them — CON-MSK-8D38E9DA424285 (muscle lactate to hepatic glucose) and
  CON-MSK-10DF05A8B81781 (phosphorylase activated by calcium, epinephrine and AMP)
  — are close enough that a reviewer may reasonably prefer to fold this batch's
  concept into the live record instead. That call is flagged, not taken.

  EVIDENCE. Every atomic_claim_id below is authored in
  ../evidence/103-BMS-mcq-carbohydrate-claims.md and every claim carries a citation
  in ../evidence/103-BMS-mcq-carbohydrate-citations.md quoting one book:

    src_300847a5fa64809d6c07  Dpt book Biochemistry 103.pdf  160 pp

  The question book says what is examined and is recorded in exam_signal only. An
  exam paper — or a question book — is evidence about what a faculty asks, never
  evidence that something is medically true.

  THREE CONCEPTS CARRY A CONFLICT the book does not resolve, and it is recorded on
  the record rather than decided here: the cycle's ATP yield (9 in the diagram, 10
  in the text), the glucose yield (32 in this book, 36-38 in older teaching), and
  AMP activation of glycogen phosphorylase b, which the question book's key asserts
  and this department book does not print.

  Import: Admin › Concepts › Import. Order: article → concept → claim → citation.
-->

# Item

## label
A bond is high energy when hydrolysis releases 7.3 kcal/mol or more, which is what each terminal phosphate bond of ATP yields

## id
CON-FND-7228237A5897B5

## canonical_key
bioenergetics.bonds.high-energy-threshold

## aliases
High energy bonds
Low energy bonds
High energy compounds
High energy phosphate bond
Pyrophosphate bond of ATP

## arabic_label
الروابط عالية الطاقة والروابط منخفضة الطاقة

## arabic_aliases
المركبات عالية الطاقة
رابطة البيروفوسفات في الأدينوسين ثلاثي الفوسفات

## definition
Every hydrolysable bond in the body falls into one of two groups by the free energy it releases. A low-energy bond liberates less than 7.3 kcal/mol, which is not enough to generate ATP; the book's examples are the phosphate ester, carboxyl ester, glycosidic and peptide bonds, and glucose 6-phosphate is the standard low-energy phosphate. A high-energy bond liberates 7.3 kcal/mol or more and is written with a curved double dash; the examples are ATP, 2-phosphoenolpyruvate, creatine phosphate and S-adenosylmethionine. The two terminal phosphates of ATP are joined by high-energy pyrophosphate bonds, and each releases 7.3 kcal/mol on hydrolysis.

## explicit_objective
State the free-energy figure that separates high-energy from low-energy bonds, and sort a list of phosphorylated compounds into the two groups.

## pitfalls
Assuming that carrying a phosphate makes a compound high energy. Glucose 6-phosphate and glycerol 3-phosphate are phosphate esters and are low energy. AMP has no pyrophosphate bond left to break at all, which is why ADP — not AMP — is the high-energy answer when both appear in the same option list.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T03

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## article_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## related_article_ids
ART-103-BIO-RESPIRATORY-CHAIN

## related_concept_ids
CON-FND-6B7241CD9F3C42 | CON-FND-5253967A0E3786

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p83 q1 and q4 | 103 BMS

## atomic_claim_ids
CLM-FND-HIGH-ENERGY-BONDS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"These are bonds that upon hydrolysis liberate ≥ 7.3 kcal/mole as free energy. For example: ATP, 2-phosphoenolpyruvate, creatine phosphate, and S-adenosyl-methionine."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-EAED404BB7FE10

## conflicts
[clear]

## uncertainty
The book states 7.3 kcal/mole both as the boundary between the two classes and as the yield of each terminal ATP bond, without naming the conditions the figure is measured under. Textbooks that print −7.3 kcal/mol are giving the standard free-energy change; the value inside a living cell is larger. The book does not make that distinction and neither does the examiner.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T01 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "high energy", "ATP", "phosphate bond" and "creatine phosphate". The only ATP records are CON-MSK-EAED404BB7FE10 on exercise fatigue and the two pending 101 mitochondrion concepts; none classifies bonds by free energy.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-MSK-EAED404BB7FE10 says depletion of ATP, glycogen and creatine phosphate contributes to fatigue. Not merged — that is an exercise-physiology observation about depletion, while this concept is the free-energy classification of a bond. A question could test either without the other.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the 24 live concepts that carry a bioenergetics or mitochondrial label, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of and mechanism_step_before edges across the bioenergetics chain are named here as owed.

---

# Item

## label
Cells do not store energy as ATP; creatine phosphate is the store, and the ATP–ADP cycle turns over in seconds

## id
CON-FND-6B7241CD9F3C42

## canonical_key
bioenergetics.atp-adp-cycle.creatine-phosphate-store

## aliases
ATP-ADP cycle
Creatine phosphate
Storage form of high energy phosphate
Creatine kinase
ATP as energy currency

## arabic_label
دورة ATP-ADP وفوسفات الكرياتين كصورة تخزين الطاقة

## arabic_aliases
فوسفات الكرياتين
إنزيم كيناز الكرياتين

## definition
ATP is the product of catabolism and the fuel of anabolism, and it is what pays for mechanical work in muscle, electrical work in nerve, chemical work in biosynthesis and osmotic work in transport. The ATP a cell holds would keep it going for only a few seconds, so the ATP–ADP cycle turns over very fast and the cell does not store energy as ATP at all. Creatine phosphate is the major storage form of energy in muscle: in energy-rich states creatine kinase transfers the phosphate from ATP to creatine, and in energy-poor states the reaction runs the other way within two to seven seconds.

## explicit_objective
Name the storage form of high-energy phosphate in muscle, name the enzyme that makes and breaks it, and explain why ATP itself cannot be the store.

## pitfalls
Answering "ATP" when asked for the storage form of high-energy phosphate. ATP is the currency, not the savings account — a cell holds only seconds of it. Also naming glucose 6-phosphate or phosphoenolpyruvate here: phosphoenolpyruvate is a high-energy compound but a glycolytic intermediate, not a store.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T03

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## article_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## related_article_ids
ART-103-BIO-RESPIRATORY-CHAIN

## related_concept_ids
CON-FND-7228237A5897B5 | CON-FND-9D5F6458F68D4B

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.35

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p83 q2 and q3 | 103 BMS

## atomic_claim_ids
CLM-FND-ATP-ADP-CYCLE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Cells do not store energy as ATP molecules. Creatine phosphate is the major storage form of energy in muscles."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-EAED404BB7FE10

## conflicts
[clear]

## uncertainty
The book names creatine phosphate as the store "in muscles" and does not say what, if anything, plays that role in other tissues. Nothing beyond muscle is claimed here.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T01 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "creatine phosphate", "ATP", "energy store" and "creatine kinase". Only CON-MSK-EAED404BB7FE10 came back, and it is about fatigue rather than about the store itself.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-MSK-EAED404BB7FE10 names creatine phosphate only as one of three things whose depletion causes fatigue. Not merged, and cross-linked instead: that record answers "why does a muscle tire", this one answers "where is high-energy phosphate stored".
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the 24 live concepts that carry a bioenergetics or mitochondrial label, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of and mechanism_step_before edges across the bioenergetics chain are named here as owed.

---

# Item

## label
Anabolism builds and consumes energy; catabolism breaks down and releases it, in three stages that converge on acetyl-CoA

## id
CON-FND-9D5F6458F68D4B

## canonical_key
bioenergetics.metabolism.anabolism-catabolism

## aliases
Anabolism
Catabolism
Anabolic pathway
Catabolic pathway
Stages of catabolism
Amphibolic pathway

## arabic_label
البناء والهدم في الأيض

## arabic_aliases
المسارات البنائية
المسارات الهدمية
مراحل الهدم الثلاث

## definition
Metabolism is the sum of the chemical changes foodstuffs undergo in the body, and it has two halves. Anabolism is the biosynthesis of large molecules from smaller precursors and consumes energy; it accelerates during growth and regeneration. Catabolism is the breakdown of large molecules into small ones with energy production, and it accelerates during fasting, physical or mental activity and stress. Catabolism runs in three stages: stage 1 degrades macromolecules to monosaccharides, amino acids, glycerol and fatty acids and traps no energy; stage 2 converts those products to acetyl-CoA with reduced coenzymes and some ATP; stage 3 oxidises acetyl-CoA in the citric acid cycle. A pathway that serves both halves at once is amphibolic.

## explicit_objective
Classify a named pathway as anabolic, catabolic or amphibolic, and say which of the three catabolic stages traps no energy.

## pitfalls
Reading "anaplerotic" as a synonym for "anabolic" because the words look alike. Anaplerotic means refilling a cycle intermediate — pyruvate carboxylase topping up oxaloacetate is anaplerotic and is not the same as synthesis of a new compound.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T03

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics

## article_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## related_article_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## related_concept_ids
CON-FND-8ADE222FBB57B2 | CON-FND-6B7241CD9F3C42

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.25

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p83 q5 | 103 BMS

## atomic_claim_ids
CLM-FND-ANABOLISM-CATABOLISM-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"I- Anabolism (Energy-Utilizing Pathways): -Biosynthesis of large complex molecules from smaller precursors with consumption of energy."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book defines anaplerotic nowhere, although the question book offers it as a distractor. It is defined here from the citric acid cycle chapter's own description of pyruvate carboxylase topping up oxaloacetate, which is the only anaplerotic reaction the book actually teaches.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T01 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "anabolism", "catabolism", "metabolism" and "amphibolic". Nothing defines the two halves of metabolism; the amphibolic hit is the pending 103 Krebs key-enzymes record, which uses the word without defining it.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the 24 live concepts that carry a bioenergetics or mitochondrial label, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of and mechanism_step_before edges across the bioenergetics chain are named here as owed.

---

# Item

## label
The reducing agent is the electron donor, and oxygen has the highest redox potential, which is why it sits at the end of the chain

## id
CON-FND-8771AB893CA4C3

## canonical_key
bioenergetics.redox.reducing-agent-and-oxygen-terminal-acceptor

## aliases
Reducing agent
Oxidising agent
Redox potential
Standard reduction potential
Terminal electron acceptor
Final acceptor of electrons

## arabic_label
الأكسدة والاختزال وجهد الاختزال

## arabic_aliases
العامل المختزل
العامل المؤكسد
المستقبل النهائي للإلكترونات

## definition
A reducing agent is the molecule that donates its electrons and is itself oxidised; an oxidising agent accepts them. Electrons move down the respiratory chain from carriers of low redox potential to carriers of high redox potential, and oxygen has the highest of all, which is why it is the terminal acceptor. At complex IV the electrons arriving from cytochrome c are handed to oxygen, which combines with two protons to form water. Water, not glucose, is the product at the end of the chain.

## explicit_objective
Identify the electron donor in a redox pair, rank NAD, FMN, FAD and oxygen by redox potential, and name the product formed at the end of the chain.

## pitfalls
Calling the electron donor the "oxidant". The donor is oxidised, so it is the reducing agent; the language runs the opposite way to the intuition and is the single commonest slip in this chapter.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T03

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## article_ids
ART-103-BIO-RESPIRATORY-CHAIN

## related_article_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## related_concept_ids
CON-FND-A3BC299ED2C7C9 | CON-FND-0CA8047810DF78

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p83 q6, q7; p84 q14; p85 q15 | 103 BMS

## atomic_claim_ids
CLM-FND-REDOX-TERMINAL-ACCEPTOR-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"It transfers electrons from cytochrome c to oxygen which combines with the two protons to form water."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book never prints a table of standard redox potentials, so the ranking of NAD, FMN, FAD and oxygen is taken from the direction of electron flow the book does print rather than from stated numbers. That the flow is towards oxygen is explicit; the individual values are not.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T01 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "redox", "reducing agent", "electron" and "oxidation". Nothing in the concept graph defines a redox pair or names a terminal electron acceptor.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the 24 live concepts that carry a bioenergetics or mitochondrial label, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of and mechanism_step_before edges across the bioenergetics chain are named here as owed.

---

# Item

## label
The respiratory chain has four complexes and two mobile carriers, and NADH and FADH2 enter it at different points

## id
CON-FND-A3BC299ED2C7C9

## canonical_key
bioenergetics.etc.components-and-two-entry-routes

## aliases
Electron transport chain
ETC
Respiratory chain
Components of ETC
Coenzyme Q
Ubiquinone
Cytochrome c
Cytochromes

## arabic_label
سلسلة نقل الإلكترون ومكوناتها

## arabic_aliases
السلسلة التنفسية
الإنزيم المساعد كيو
السيتوكرومات

## definition
The electron transport chain lies in the inner mitochondrial membrane and carries hydrogen atoms and electrons from NADH+H⁺ and FADH2 to oxygen, forming water and ATP. It is built from four protein complexes, two mobile carriers — ubiquinone (coenzyme Q) and cytochrome c — and complex V, ATP synthase. Complex I is a flavoprotein on FMN and passes two hydrogens from NADH to CoQ. Complex II is succinate dehydrogenase on FAD and passes two hydrogens from FADH2 to CoQ, bypassing complex I. Complex III, a haemoprotein of cytochromes b and c1, passes two electrons from CoQH2 to cytochrome c. Complex IV, cytochromes a and a3 with two copper atoms, passes them to oxygen. Cytochromes carry electrons, not hydrogen atoms.

## explicit_objective
Trace an electron from NADH and from FADH2 to oxygen, naming each carrier in order, and state which prosthetic group belongs to complex I and to complex II.

## pitfalls
Sending NADH through complex II. NADH enters at complex I on FMN; complex II is the entry point for FADH2 and is not on the NADH route at all. The second slip is calling cytochromes hydrogen carriers — they are electron carriers, and the protons travel separately.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T03

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## article_ids
ART-103-BIO-RESPIRATORY-CHAIN

## related_article_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## related_concept_ids
CON-FND-0CA8047810DF78 | CON-FND-8771AB893CA4C3 | CON-FND-BCCBDEC637795A

## resource_ids
src_300847a5fa64809d6c07

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
0.4

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p84 q8 to q12 | 103 BMS

## atomic_claim_ids
CLM-FND-ETC-COMPONENTS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"- Four protein complexes (integral proteins) called complexes I, II, III and IV. - Two mobile electron carriers called ubiquinone (CoQ) and cytochrome c (Cyt c)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-B845AC57451E7F

## conflicts
[clear]

## uncertainty
The book's table says a flavoprotein "transfers 2 hydrogens", which is two hydrogen atoms and therefore two electrons plus two protons. It never states the electron count of a fully reduced flavin directly, so the answer that FAD accepts two electrons is read off the stoichiometry the book prints rather than from a sentence.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T01 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "electron transport", "respiratory chain", "cytochrome" and "ubiquinone" — no match at all for the first, second and fourth. The pending 101 record CON-FND-B845AC57451E7F places oxidative phosphorylation on the cristae but names no carrier.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-FND-B845AC57451E7F is a pending 101 ISK histology concept locating the Krebs cycle in the matrix and oxidative phosphorylation on the cristae. Not merged — it teaches where the machinery sits in an organelle, this teaches what the machinery is made of and in what order it works.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the 24 live concepts that carry a bioenergetics or mitochondrial label, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of and mechanism_step_before edges across the bioenergetics chain are named here as owed.

---

# Item

## label
Complexes I, III and IV pump the protons; the gradient they build is what drives ATP synthase

## id
CON-FND-0CA8047810DF78

## canonical_key
bioenergetics.chemiosmosis.proton-pumps-and-atp-synthase

## aliases
Chemiosmotic theory
Proton motive force
Proton gradient
ATP synthase
Complex V
Oxidative phosphorylation
P:O ratio

## arabic_label
نظرية التناضح الكيميائي وتخليق ATP

## arabic_aliases
القوة الدافعة البروتونية
إنزيم تخليق ATP
الفسفرة التأكسدية

## definition
By the chemiosmotic theory, the energy released as electrons travel down the chain is used to pump protons out of the matrix into the intermembrane space, which becomes electropositive. Complexes I, III and IV are the pumps — complexes I and III move four protons each and complex IV moves two. Complex II pumps none. The inner membrane is impermeable to protons, so the gradient persists as the proton motive force, and protons can return only through the F0 channel of ATP synthase; four of them drive the synthesis of one ATP at the F1 subunit in the matrix. Oxidation of NADH yields 2.5 ATP per oxygen atom and of FADH2 1.5, because FADH2 bypasses complex I and so misses one pump.

## explicit_objective
State which complexes pump protons and which does not, and explain why the P:O ratio for FADH2 is lower than for NADH.

## pitfalls
Saying that protons accumulate in the matrix. They are pumped *out* of the matrix; the intermembrane space is the electropositive side, and the return through F0 into the matrix is what makes the ATP. The other slip is thinking an electron gradient is built — it is a proton gradient.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T03

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## article_ids
ART-103-BIO-RESPIRATORY-CHAIN

## related_article_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## related_concept_ids
CON-FND-A3BC299ED2C7C9 | CON-FND-C3CB859E560A18

## resource_ids
src_300847a5fa64809d6c07

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
0.4

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p84 q13; p85 q16 and q17 | 103 BMS

## atomic_claim_ids
CLM-FND-CHEMIOSMOSIS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Complexes I, III and IV act as proton pumps. Complexes I and III translocate 4 protons, while complex IV translocates 2 protons only."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-B845AC57451E7F

## conflicts
[clear]

## uncertainty
The book says four protons pass through F0 per ATP and separately that ten protons are pumped per NADH for a P:O ratio of 2.5. Ten divided by four is 2.5, so the two figures agree, but the book does not show that they do and does not mention the extra proton spent importing phosphate. Nothing beyond its own numbers is claimed.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T01 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "chemiosmotic", "proton", "ATP synthase" and "oxidative phosphorylation". Only the pending 101 mitochondrion record carries "ATP synthase", as an alias.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-FND-B845AC57451E7F names ATP synthase as the thing on the cristae that makes ATP. Not merged — it is a histology record about organelle structure and does not state the proton mechanism, which is the whole of this concept.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the 24 live concepts that carry a bioenergetics or mitochondrial label, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of and mechanism_step_before edges across the bioenergetics chain are named here as owed.

---

# Item

## label
An uncoupler lets oxidation continue while ATP synthesis stops, and the energy leaves as heat; ADP availability is what normally sets the rate

## id
CON-FND-C3CB859E560A18

## canonical_key
bioenergetics.uncouplers.respiratory-control

## aliases
Uncouplers
Dinitrophenol
Thermogenin
Uncoupling protein
Respiratory control
Brown adipose tissue
Non-shivering thermogenesis

## arabic_label
فاصلات الاقتران والتحكم التنفسي

## arabic_aliases
ثنائي نيتروفينول
الثيرموجينين
التوليد الحراري بدون ارتعاش

## definition
Uncouplers dissociate oxidation in the respiratory chain from phosphorylation: they make the inner membrane permeable to protons and abolish the gradient, so oxidation continues but no ATP is made and the energy is released as heat. Thyroxine at high levels, intravenous calcium and aspirin overdose all uncouple, which is why each is felt as heat. Thermogenin, the uncoupling protein of brown adipose tissue, opens a proton channel that bypasses ATP synthase and is how non-shivering thermogenesis works. Coupling is otherwise tight: the gradient blocks further electron transport until protons return through ATP synthase, and that depends on ADP, so working muscle with plenty of ADP speeds the chain and resting muscle with little ADP slows it.

## explicit_objective
Predict what happens to electron flow, to ATP synthesis and to heat production when an uncoupler is added, and name the cellular signal that normally accelerates the chain.

## pitfalls
Expecting an uncoupler to slow electron flow. It does the opposite — with the proton backpressure gone the chain runs faster, and it is only the phosphorylation that stops. A student who assumes "uncoupled means everything stops" also predicts less heat, when the whole point is more.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T03

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## article_ids
ART-103-BIO-RESPIRATORY-CHAIN

## related_article_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## related_concept_ids
CON-FND-0CA8047810DF78 | CON-FND-A3BC299ED2C7C9

## resource_ids
src_300847a5fa64809d6c07

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
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p85 q18, q19 and q21 | 103 BMS

## atomic_claim_ids
CLM-FND-UNCOUPLERS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"They dissociate or uncouple oxidation in respiratory chain from phosphorylation. So, the oxidation takes place without ATP synthesis and energy is released as heat."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-B845AC57451E7F

## conflicts
[clear]

## uncertainty
The book lists thyroxine, intravenous calcium and aspirin overdose as uncouplers without giving a mechanism for any of the three, and names dinitrophenol nowhere even though the question book uses it as the type example. Dinitrophenol is treated here as an uncoupler on the question book's authority and the department book's definition, and no clinical use of it is stated anywhere.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T01 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "uncoupler", "thermogenin", "brown fat" and "dinitrophenol". No live record matches any of them. The pending 101 concept CON-FND-B845AC57451E7F mentions thermogenin in brown fat.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-FND-B845AC57451E7F mentions thermogenin as one detail of a mitochondrion concept for 101 ISK histology. Not merged — that record is about the organelle, this is about what uncoupling does to oxidation, phosphorylation and heat, and about respiratory control, which it does not mention.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the 24 live concepts that carry a bioenergetics or mitochondrial label, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of and mechanism_step_before edges across the bioenergetics chain are named here as owed.

---

# Item

## label
Substrate-level phosphorylation makes ATP directly at three reactions: two in glycolysis and one in the citric acid cycle

## id
CON-FND-5253967A0E3786

## canonical_key
bioenergetics.substrate-level-phosphorylation.three-reactions

## aliases
Substrate level phosphorylation
Phosphoglycerate kinase
Pyruvate kinase
Succinate thiokinase
Succinyl-CoA synthetase
Direct ATP formation

## arabic_label
الفسفرة على مستوى الركيزة

## arabic_aliases
التخليق المباشر لـ ATP
إنزيم ثيوكيناز السكسينات

## definition
Substrate-level phosphorylation is the oxidation of a substrate to a product carrying a high-energy bond, whose energy then phosphorylates ADP or GDP directly to ATP or GTP without the respiratory chain. It happens at exactly three reactions in two pathways. In glycolysis, phosphoglycerate kinase takes the high-energy phosphate of 1,3-bisphosphoglycerate, and pyruvate kinase takes that of 2-phosphoenolpyruvate. In the citric acid cycle, succinate thiokinase cleaves the high-energy thioester bond of succinyl-CoA — the only reaction in the whole cycle that makes ATP at substrate level.

## explicit_objective
Name the three substrate-level phosphorylation reactions and the pathway each belongs to, and distinguish them from ATP made by oxidative phosphorylation.

## pitfalls
Naming isocitrate dehydrogenase or α-ketoglutarate dehydrogenase as the cycle's ATP-making step. Those are the two dehydrogenases either side of it and they yield NADH, whose ATP is made later in the chain. The ATP made *inside* the cycle comes only from succinate thiokinase.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T03

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## article_ids
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## related_article_ids
ART-103-BIO-CITRIC-ACID-CYCLE | ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_concept_ids
CON-FND-0F4A45886203EF | CON-FND-9420F608039B74 | CON-FND-7228237A5897B5

## resource_ids
src_300847a5fa64809d6c07

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
0.3

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p85 q20; p87 q4 | 103 BMS

## atomic_claim_ids
CLM-FND-SUBSTRATE-LEVEL-PHOSPHORYLATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"It is oxidation of the substrate that results in generation of high energy bond which is utilized for phosphorylation of ADP or GDP to form ATP or GTP directly."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book writes the succinate thiokinase product as ATP in the cycle diagram and as "ATP (or GTP)" in the bioenergetics chapter. The nucleotide is not settled in the text and is not settled here either; what is asserted is that this is the cycle's only substrate-level step.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T01 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "substrate level", "phosphorylation", "thiokinase" and "phosphoglycerate kinase" — no live or pending record matches any of them.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the 24 live concepts that carry a bioenergetics or mitochondrial label, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of and mechanism_step_before edges across the bioenergetics chain are named here as owed.

---

# Item

## label
Every citric acid cycle enzyme is in the mitochondrial matrix except succinate dehydrogenase, which is complex II of the respiratory chain

## id
CON-FND-BCCBDEC637795A

## canonical_key
tca.site.matrix-except-succinate-dehydrogenase

## aliases
Site of TCA cycle
Succinate dehydrogenase
Membrane bound enzyme of the citric acid cycle
Coenzymes of the Krebs cycle
FAD in the TCA cycle

## arabic_label
موقع دورة حمض الستريك ونازعة هيدروجين السكسينات

## arabic_aliases
الإنزيم المرتبط بالغشاء في دورة كريبس
الإنزيمات المساعدة في الدورة

## definition
The enzymes of the citric acid cycle are soluble enzymes of the mitochondrial matrix, with one exception: succinate dehydrogenase is tightly bound to the inner mitochondrial membrane, where it is complex II of the respiratory chain. That is also why it is the only cycle enzyme whose coenzyme is FAD; the three dehydrogenase steps in the matrix — isocitrate dehydrogenase, the α-ketoglutarate dehydrogenase complex and malate dehydrogenase — all use NAD⁺, so NAD⁺ is what accepts hydrogen from malate. Sitting the cycle beside the respiratory chain is what lets the reduced coenzymes be reoxidised at once.

## explicit_objective
Name the one membrane-bound enzyme of the cycle, say which respiratory complex it is, and match each dehydrogenase step of the cycle to its coenzyme.

## pitfalls
Choosing NADH dehydrogenase or ATP synthase as the cycle's membrane-bound enzyme. Both are in the inner membrane, but neither belongs to the citric acid cycle — they are respiratory-chain components, and the question is asking which cycle enzyme is also a chain component.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## article_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## related_article_ids
ART-103-BIO-RESPIRATORY-CHAIN

## related_concept_ids
CON-FND-037BF052DDFC0D | CON-FND-A3BC299ED2C7C9 | CON-FND-9420F608039B74

## resource_ids
src_300847a5fa64809d6c07

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
0.3

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p87 q1, q2 and q5 | 103 BMS

## atomic_claim_ids
CLM-FND-TCA-SITE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The enzymes of the TCA cycle are found in the mitochondrial matrix except succinate dehydrogenase which is tightly bound to the inner mitochondrial membrane (forms complex II of the respiratory chain)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
None material. The book states the site, the exception and the coenzyme of each step directly.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "succinate", "citric acid", "Krebs" and "mitochondrial matrix". The only citric-acid-cycle record is the pending CON-FND-037BF052DDFC0D on key enzymes, which is about regulation and not about site.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md and the four other citric-acid-cycle concepts minted beside this one. CON-FND-037BF052DDFC0D, the live key-enzymes concept, is the parent of the whole group and is listed as a loose neighbour on each. No typed edges are written; this batch authors no relations file and the part_of edges into the cycle are owed.

---

# Item

## label
The cycle is cyclic because oxaloacetate is regenerated at every turn, not because its reactions are reversible

## id
CON-FND-8F8B3EF0763399

## canonical_key
tca.cycle.oxaloacetate-regeneration

## aliases
Regeneration of oxaloacetate
Cyclic character of the Krebs cycle
Malate dehydrogenase
Why the citric acid cycle is a cycle

## arabic_label
إعادة تكوين الأوكسالوأسيتات في الدورة

## arabic_aliases
الطبيعة الدورية لدورة كريبس

## definition
The cycle opens with citrate synthase condensing the two-carbon acetyl group of acetyl-CoA with four-carbon oxaloacetate to make six-carbon citrate, and it closes with malate dehydrogenase oxidising malate back to oxaloacetate. That last step is what makes the pathway a cycle: the oxaloacetate consumed at the start is remade at the end and is free to take up the next acetyl group. Citrate is not regenerated — it is consumed on the way round — and three of the cycle's steps are irreversible, so reversibility is not what makes it cyclic either.

## explicit_objective
Explain what the cyclic character of the Krebs cycle actually means, and name the step and enzyme that restore the starting compound.

## pitfalls
Answering that all the reactions are reversible. Three of them — citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase — are irreversible, and they are precisely the regulated steps. The cycle is closed by regeneration, not by running backwards.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## article_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## related_article_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## related_concept_ids
CON-FND-037BF052DDFC0D | CON-FND-CA0F9E019BC5BA | CON-FND-BCCBDEC637795A

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.45

## exam_weight_by_year
KAU_Y1=0.45

## clinical_relevance
0.25

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p87 q3 | 103 BMS

## atomic_claim_ids
CLM-FND-TCA-OXALOACETATE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"This reaction regenerates oxaloacetate, which is linked to a new acetyl molecule of acetyl-CoA to repeat the cycle again."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
None material. The book states the regeneration at step 8 and the three irreversible steps in the regulation section.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "oxaloacetate", "Krebs", "citrate" and "malate dehydrogenase". "Oxaloacetate" returns nothing at all in live state; the Krebs hits are the pending 103 key-enzymes concept and the pending 101 mitochondrion concept.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md and the four other citric-acid-cycle concepts minted beside this one. CON-FND-037BF052DDFC0D, the live key-enzymes concept, is the parent of the whole group and is listed as a loose neighbour on each. No typed edges are written; this batch authors no relations file and the part_of edges into the cycle are owed.

---

# Item

## label
One turn of the cycle releases two CO2 and yields ten ATP: three NADH, one FADH2 and one substrate-level ATP

## id
CON-FND-9420F608039B74

## canonical_key
tca.yield.two-co2-and-ten-atp

## aliases
Yield of the citric acid cycle
ATP from Krebs cycle
Two CO2 per acetyl-CoA
Energy production of TCA cycle

## arabic_label
حصيلة دورة حمض الستريك من الطاقة

## arabic_aliases
إنتاج ثاني أكسيد الكربون في الدورة
عشر جزيئات ATP لكل أستيل

## definition
One turn of the citric acid cycle oxidises one acetyl group and yields two molecules of CO2, three of NADH, one of FADH2 and one ATP made at substrate level. The two CO2 come from the two decarboxylations — isocitrate dehydrogenase releases the first and the α-ketoglutarate dehydrogenase complex the second. Passed through the respiratory chain, three NADH give 7.5 ATP and one FADH2 gives 1.5, which with the substrate-level ATP makes ten ATP per acetyl-CoA.

## explicit_objective
State the CO2, NADH, FADH2 and ATP yield of one turn of the cycle, and show how the ten-ATP total is assembled from them.

## pitfalls
Counting the two carbons entering as acetyl-CoA as the two carbons leaving as CO2. They are not the same atoms on the first turn — the CO2 comes from the oxaloacetate part of citrate — but the arithmetic still works, because two carbons in and two out is what keeps the cycle balanced. The number to hold is two, not three.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## article_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## related_article_ids
ART-103-BIO-RESPIRATORY-CHAIN | ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_concept_ids
CON-FND-5253967A0E3786 | CON-FND-0F4A45886203EF | CON-FND-BCCBDEC637795A

## resource_ids
src_300847a5fa64809d6c07

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
0.3

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p88 q7 and q8 | 103 BMS

## atomic_claim_ids
CLM-FND-TCA-YIELD-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Thus, the overall reactions of one turn of the Krebs' cycle yield two molecules of CO2, three molecules of NADH, one molecule of FADH2 and one molecule of ATP."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
The department book prints two totals. The cycle diagram on file page 18 marks "9 ATP" against the ETC arrow; the importance section on file page 19 states "10 moles of ATP" and itemises 7.5 + 1.5 + 1. The question book's printed key follows ten. Ten is taught here and the nine is recorded so a reviewer can see both.

## uncertainty
The cycle diagram in the book labels the chain output "9 ATP" while the importance section totals ten. Nine is the older 3/2 accounting for NADH and FADH2; ten follows the 2.5/1.5 figures the bioenergetics chapter states and is what the summary text and the answer key both use. The discrepancy is inside one book and is recorded rather than resolved.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "Krebs", "citric acid", "acetyl-CoA" and "ATP yield". Nothing states a yield for the cycle.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md and the four other citric-acid-cycle concepts minted beside this one. CON-FND-037BF052DDFC0D, the live key-enzymes concept, is the parent of the whole group and is listed as a loose neighbour on each. No typed edges are written; this batch authors no relations file and the part_of edges into the cycle are owed.

---

# Item

## label
The cycle is amphibolic: its intermediates leave to build haem, amino acids, fatty acids and glucose

## id
CON-FND-8ADE222FBB57B2

## canonical_key
tca.amphibolic.intermediates-for-anabolism

## aliases
Amphibolic pathway
Importance of the citric acid cycle
Succinyl-CoA and heme synthesis
Alpha-ketoglutarate and glutamate
Anabolic function of the Krebs cycle

## arabic_label
الدورة كمسار مزدوج الاتجاه (أمفيبولي)

## arabic_aliases
الوظيفة البنائية لدورة كريبس
سكسينيل مرافق الإنزيم أ وتخليق الهيم

## definition
The citric acid cycle is called amphibolic because it serves catabolism and anabolism at once. Citrate leaves the mitochondrion and is split by ATP-citrate lyase to give acetyl-CoA for fatty acid and cholesterol synthesis. α-Ketoglutarate is transaminated to glutamate, which is the route from the cycle to the amino acids. Succinyl-CoA is used for haem synthesis and for ketone body oxidation. Malate can be decarboxylated to pyruvate by malic enzyme, one of the sources of NADPH. Oxaloacetate is transaminated to aspartate, and in the cytosol is converted by PEPCK to phosphoenolpyruvate, which is a step of gluconeogenesis.

## explicit_objective
Explain what amphibolic means, and match each cycle intermediate that leaves the cycle to the anabolic pathway it feeds.

## pitfalls
Explaining "amphibolic" by saying the reactions are reversible, or that the cycle occurs in every cell. Neither is what the word means and neither is true — three steps are irreversible, and the red cell has no cycle at all. Amphibolic means the same pathway does catabolic and anabolic work.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## article_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## related_article_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## related_concept_ids
CON-FND-9D5F6458F68D4B | CON-FND-8F8B3EF0763399 | CON-FND-C2C88203E4A918

## resource_ids
src_300847a5fa64809d6c07

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
0.3

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p88 q9, q10 and q11 | 103 BMS

## atomic_claim_ids
CLM-FND-TCA-AMPHIBOLIC-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The citric acid cycle is called an amphibolic pathway because it participates in both catabolism and anabolism."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book routes α-ketoglutarate to glutamate specifically, and the question book asks more loosely which intermediate is used "for the formation of amino acids". Glutamate is an amino acid and is the gateway to the others by transamination, so the two agree; but the book does not itself say "α-ketoglutarate makes amino acids" in those words.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "amphibolic", "succinyl", "heme synthesis" and "glutamate". The only amphibolic hit is the pending 103 Krebs key-enzymes record, which uses the word in an alias without teaching what the intermediates do.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md and the four other citric-acid-cycle concepts minted beside this one. CON-FND-037BF052DDFC0D, the live key-enzymes concept, is the parent of the whole group and is listed as a loose neighbour on each. No typed edges are written; this batch authors no relations file and the part_of edges into the cycle are owed.

---

# Item

## label
Fluoroacetate poisons the cycle at aconitase and arsenic poisons it at α-ketoglutarate dehydrogenase

## id
CON-FND-F9CE11670992CE

## canonical_key
tca.inhibitors.fluoroacetate-and-arsenic

## aliases
Inhibitors of the citric acid cycle
Fluoroacetate
Fluorocitrate
Arsenic poisoning
Aconitase inhibition
Rodenticide poisoning

## arabic_label
مثبطات دورة حمض الستريك

## arabic_aliases
التسمم بالفلوروأسيتات
التسمم بالزرنيخ

## definition
Two poisons stop the cycle at named enzymes. Fluoroacetate, used as a rodenticide, is converted in the body to fluorocitrate, which inhibits aconitase, so citrate accumulates behind the block. Arsenic compounds inhibit α-ketoglutarate dehydrogenase by forming a stable complex with the thiol groups of lipoic acid, making the cofactor unavailable; the same mechanism inhibits pyruvate dehydrogenase and the branched-chain keto acid dehydrogenase, which is why arsenic poisoning is not confined to one pathway.

## explicit_objective
Match fluoroacetate and arsenic to the cycle enzyme each inhibits, and give the mechanism by which arsenic does it.

## pitfalls
Swapping the two. Fluoroacetate hits aconitase, one step past citrate; arsenic hits the lipoate-dependent dehydrogenases. Fluoride is a third poison altogether and belongs to glycolysis, where it inhibits enolase — a student who has learnt "fluor- blocks the cycle" gets both wrong.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## article_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## related_article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_concept_ids
CON-FND-037BF052DDFC0D | CON-FND-229C78C9EB0E78 | CON-FND-0D6BFD870813B7

## resource_ids
src_300847a5fa64809d6c07

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
0.6

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p88 q13; p89 q14 | 103 BMS

## atomic_claim_ids
CLM-FND-TCA-INHIBITORS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"1) Fluroacetate is a toxic compound used as rodenticide. In the body, it is converted to fluorocitrate which in turn inhibits the activity of aconitase. 2) α-ketoglutarate dehydrogenase is inhibited by arsenic compounds."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
The book's heading calls these "Invitro inhibitors", yet its own text describes fluoroacetate as a rodenticide converted to fluorocitrate "in the body". Both poisonings are clinical, so the heading is not followed here; a reviewer should decide whether "Invitro" is a slip for "in vivo".

## uncertainty
The book gives no dose, no clinical picture and no management for either poisoning, and none is asserted here. It also prints "Fluroacetate" for fluoroacetate; the spelling is the book's.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "fluoroacetate", "arsenic", "aconitase" and "rodenticide". No live or pending record matches any of the four.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md and the four other citric-acid-cycle concepts minted beside this one. CON-FND-037BF052DDFC0D, the live key-enzymes concept, is the parent of the whole group and is listed as a loose neighbour on each. No typed edges are written; this batch authors no relations file and the part_of edges into the cycle are owed.

---

# Item

## label
Carbohydrate digestion ends in glucose, galactose and fructose, so a disaccharidase deficiency leaves the disaccharides in the stool

## id
CON-GIT-E43BAB1EBDEBE6

## canonical_key
carbohydrate.digestion.end-products-and-disaccharidase-deficiency

## aliases
Digestion of dietary carbohydrates
End products of carbohydrate digestion
Disaccharidase deficiency
Lactose intolerance
Dietary carbohydrates

## arabic_label
هضم الكربوهيدرات ونواتجه النهائية

## arabic_aliases
نقص إنزيمات السكريات الثنائية
عدم تحمل اللاكتوز

## definition
Dietary carbohydrate is monosaccharide, disaccharide and polysaccharide. Digestion begins in the mouth, continues in the stomach and finishes in the small intestine, and its end products are mainly glucose, galactose and fructose — only monosaccharides are absorbed. The final step is the brush-border disaccharidases, so when their activity is low the disaccharides themselves are never split: maltose, sucrose and lactose stay in the lumen and appear in the stool. Starch is still broken down to disaccharides by amylase, and the monosaccharides that were never released cannot appear in blood.

## explicit_objective
Name the three monosaccharides that enter the blood after a mixed carbohydrate meal, and predict what appears in the stool when the brush-border disaccharidases are deficient.

## pitfalls
Expecting starch in the stool in disaccharidase deficiency. Amylase is unaffected, so starch is still digested down to disaccharides; it is the last step that fails, and the sugars that accumulate are the disaccharides, not the polysaccharide and not the monosaccharides.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-GIT-T06 | DIS-BIO-T03

## topic
Carbohydrate metabolism

## subtopic
Introduction to Carbohydrate Metabolism

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Introduction to Carbohydrate Metabolism

## article_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## related_article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_concept_ids
CON-FND-E9C3C98FA0388C | CON-FND-051CF62C7920A3

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.6

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p90 q1 and q2 | 103 BMS

## atomic_claim_ids
CLM-GIT-CARBOHYDRATE-DIGESTION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The end products of carbohydrate digestion are mainly glucose, galactose, and fructose."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-GIT-CFF765C2EF7ED9

## conflicts
[clear]

## uncertainty
The book names the end products and says the monosaccharides are absorbed by different mechanisms, but it does not describe the brush-border disaccharidases as a step, name a deficiency, or give a clinical picture. That a deficiency leaves the disaccharides unabsorbed follows from the book's statement that only monosaccharides are absorbed, and is the question book's own scenario; no prevalence or management is asserted.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "disaccharid", "lactose", "digestion" and "amylase". The only hit is CON-GIT-CFF765C2EF7ED9 on lactulose, a laxative.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-GIT-CFF765C2EF7ED9 is about lactulose, a synthetic disaccharide given as a laxative because it is not absorbed. Not merged — it is a pharmacology record, though it rests on the same fact that an unsplit disaccharide stays in the lumen.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
GLUT-4 is the only insulin-dependent glucose transporter, and SGLT-2 is what reabsorbs filtered glucose in the proximal tubule

## id
CON-FND-E9C3C98FA0388C

## canonical_key
glucose.transport.glut-and-sglt-carriers

## aliases
Glucose transporters
GLUT-1
GLUT-2
GLUT-4
SGLT-1
SGLT-2
Insulin dependent glucose uptake
Renal glucosuria

## arabic_label
ناقلات الجلوكوز عبر أغشية الخلايا

## arabic_aliases
الناقل GLUT-4 المعتمد على الأنسولين
الناقل المشترك للصوديوم والجلوكوز

## definition
Glucose crosses cell membranes on two families of carrier. The facilitative transporters GLUT-1 to GLUT-5 need no energy; GLUT-2 in liver, kidney, pancreatic β-cells and the basal border of the enterocyte takes glucose up rapidly in proportion to blood level, and GLUT-4 in heart, skeletal muscle and adipose tissue is the only one that is insulin dependent — insulin moves it from an intracellular pool to the surface, and without insulin it is endocytosed and uptake falls whatever the blood glucose. The sodium-dependent cotransporters move glucose against a gradient: SGLT-1 in the small intestine at two sodium to one glucose, and SGLT-2 in the proximal renal tubule at one to one, where it reabsorbs about 90% of filtered glucose. A defect in SGLT-2 therefore spills glucose into urine at a normal blood glucose.

## explicit_objective
Name the insulin-dependent glucose transporter and its tissues, and explain how glucosuria can occur in a person who is not diabetic.

## pitfalls
Picking GLUT-2 for insulin-dependent uptake because GLUT-2 sits on the β-cell that secretes insulin. GLUT-2 is not insulin dependent at all; it is the sensor arm, and GLUT-4 is the effector arm. The second slip is blaming SGLT-1 for renal glucosuria — SGLT-1 is mainly intestinal, and it is SGLT-2 that does the renal work.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Introduction to Carbohydrate Metabolism

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Introduction to Carbohydrate Metabolism

## article_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## related_article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_concept_ids
CON-GIT-E43BAB1EBDEBE6 | CON-END-0B615572003514

## resource_ids
src_300847a5fa64809d6c07

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
0.75

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p90 q3 and q4 | 103 BMS

## atomic_claim_ids
CLM-FND-GLUCOSE-TRANSPORTERS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"GLUT-4 is insulin dependent, i.e. insulin promotes translocation of glucose transporters to the outer cell membrane surface, thus increasing the number of transporters and stimulates glucose uptake by these tissues."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book says SGLT-2 reabsorbs about 90% of filtered glucose but does not name a disease of SGLT-2 or describe familial renal glucosuria. It does list "defects in renal tubular mechanism for reabsorption of glucose" as a cause of normoglycaemic glucosuria, which is the general statement the specific one sits under. No inherited pattern and no gene is claimed.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "glucose transporter", "GLUT", "SGLT" and "glucosuria". The GLUT search returns only unrelated words containing the letters — agglutination, gluten, glutathione — and nothing about glucose carriers.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Hexokinase has a low Km and works everywhere; glucokinase has a high Km, sits in liver and β-cells, and is induced by insulin

## id
CON-FND-EA1BA37ACB643B

## canonical_key
glycolysis.hexokinase-glucokinase.kinetics-and-sites

## aliases
Hexokinase
Glucokinase
Hexokinase D
Km of glucokinase
Product inhibition of hexokinase
Regulation of glycolysis

## arabic_label
إنزيما الهيكسوكيناز والجلوكوكيناز

## arabic_aliases
الفرق بين الهيكسوكيناز والجلوكوكيناز
التثبيط بالناتج

## definition
The first step of glycolysis phosphorylates glucose to glucose 6-phosphate, and two enzymes can do it. Hexokinase is in all tissue cells, has a low Km and therefore a high affinity for glucose with a low Vmax, and is allosterically inhibited by its own product, glucose 6-phosphate; that combination guarantees every tissue a supply even when blood glucose is low. Glucokinase, or hexokinase D, is restricted to liver and pancreatic β-cells, has a high Km and therefore a low affinity with a high Vmax, and is not inhibited by glucose 6-phosphate; it lets the liver take up excess glucose after a meal and lets the β-cell sense a high glucose and secrete insulin. Insulin induces glucokinase and glucagon represses it; neither hormone affects hexokinase.

## explicit_objective
Contrast hexokinase and glucokinase by site, Km, Vmax, product inhibition and hormonal control, and predict which is active at a given blood glucose.

## pitfalls
Reading "high Km" as "high affinity". Km is the substrate concentration at half-maximal velocity, so a high Km means a *low* affinity — glucokinase only works properly when glucose is plentiful, which is exactly what makes it a post-meal enzyme.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_article_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## related_concept_ids
CON-FND-853096A349FFBD | CON-END-0B615572003514 | CON-FND-051CF62C7920A3

## resource_ids
src_300847a5fa64809d6c07

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
0.5

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p90 q5; p91 q6; p92 q18 | 103 BMS

## atomic_claim_ids
CLM-FND-HEXOKINASE-GLUCOKINASE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Has high Km i.e. low affinity for glucose and high Vmax. ‐ This allows the liver to utilize excess glucose for oxidation and storage."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book's comparison table gives glucokinase's site as "liver and pancreatic β cells" and does not mention the kidney, which some international texts include. Only what the book states is taught.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "hexokinase", "glucokinase", "Km" and "glucose 6-phosphate". No live or pending record matches any of them.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Glycolysis has three irreversible steps, and the committed one is PFK-1 making fructose 1,6-bisphosphate

## id
CON-FND-853096A349FFBD

## canonical_key
glycolysis.steps.irreversible-and-committed

## aliases
Steps of glycolysis
Committed step of glycolysis
Phosphofructokinase-1
PFK-1
Aldolase A
Irreversible steps of glycolysis
Energy utilization phase

## arabic_label
خطوات تحلل السكر والخطوة الملزمة

## arabic_aliases
إنزيم الفوسفوفركتوكيناز-1
الخطوات غير العكوسة في تحلل السكر

## definition
Glycolysis runs in the cytosol of every cell and has two phases. In the energy-utilising phase, hexokinase or glucokinase spends one ATP to make glucose 6-phosphate, phosphohexose isomerase converts it to fructose 6-phosphate, phosphofructokinase-1 spends a second ATP to make fructose 1,6-bisphosphate, and aldolase A cleaves that into glyceraldehyde 3-phosphate and dihydroxyacetone phosphate. In the energy-producing phase each triose is oxidised and dephosphorylated to pyruvate. Three steps are irreversible and are the regulated ones: glucokinase or hexokinase, PFK-1 and pyruvate kinase. PFK-1 is the committed step and the most important control site, because it is the first irreversible reaction unique to glycolysis; it is inhibited by ATP, citrate and low pH and activated by AMP.

## explicit_objective
Name the committed step of glycolysis with its enzyme and product, list the three irreversible reactions, and give the substrate of aldolase.

## pitfalls
Calling the hexokinase step the committed step because it comes first. Glucose 6-phosphate can still go to glycogen or the HMP pathway, so nothing is committed there; the molecule is only committed to glycolysis once PFK-1 has made fructose 1,6-bisphosphate. Also naming pyruvate kinase — it is irreversible but is at the end, long past the commitment.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_article_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## related_concept_ids
CON-FND-EA1BA37ACB643B | CON-FND-0F4A45886203EF | CON-FND-C2C88203E4A918

## resource_ids
src_300847a5fa64809d6c07

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
0.35

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p91 q8 and q10; p93 q19 and q21 | 103 BMS

## atomic_claim_ids
CLM-FND-GLYCOLYSIS-COMMITTED-STEP-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"PFK1 is the most important control site in the mammalian glycolytic pathway. This step is subject to extensive regulation because it is the first irreversible reaction unique to the glycolytic pathway."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book calls PFK-1 "the most important control site" and "the first irreversible reaction unique to the glycolytic pathway" but never uses the phrase "committed step", which is the question book's wording. The two mean the same thing and are treated as the same here.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "phosphofructokinase", "glycolysis", "aldolase" and "committed step". The only glycolysis records are the pending 103 red-cell concepts and CON-MSK-CC13A748326880 on anaerobic glycolysis in exercise; none names an enzyme of the pathway.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Glucose yields 32 ATP aerobically and 2 anaerobically, and four of the aerobic ATP are made at substrate level in glycolysis

## id
CON-FND-0F4A45886203EF

## canonical_key
glycolysis.energy-yield.aerobic-and-anaerobic

## aliases
Energy yield of glycolysis
ATP from glucose oxidation
Net gain of glycolysis
Aerobic glycolysis
Anaerobic glycolysis
32 ATP
Yield from muscle glycogen

## arabic_label
حصيلة الطاقة من أكسدة الجلوكوز

## arabic_aliases
الحصيلة اللاهوائية لتحلل السكر
اثنان وثلاثون جزيء ATP

## definition
Glycolysis spends two ATP in phase I and makes four by substrate-level phosphorylation in phase II, at phosphoglycerate kinase and pyruvate kinase, so the substrate-level total is four and the net is two. Aerobically the two NADH from glyceraldehyde 3-phosphate dehydrogenase are oxidised by the chain for five more ATP, making a net seven for glycolysis alone; complete oxidation of one glucose to six CO2 yields 32 ATP. Anaerobically the NADH is spent making lactate instead, and the net is two ATP only. Because half a glucose's work is done per triose, converting one glyceraldehyde 3-phosphate to one pyruvate yields two ATP and one NADH; converting one fructose 1,6-bisphosphate to two pyruvates yields four ATP and two NADH. Glucose taken from glycogen enters as glucose 1-phosphate and costs no ATP to phosphorylate, so a glucosyl unit of muscle glycogen yields 33.

## explicit_objective
Calculate the ATP yield of glucose oxidation under aerobic and anaerobic conditions, and adjust the figure for glucose entering from glycogen.

## pitfalls
Confusing the four ATP made at substrate level in glycolysis with the net two. The question wording decides which is wanted: "synthesised from ADP by substrate level phosphorylation" is four; "net gain" is two. Students who have memorised one number answer both questions with it.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_article_ids
ART-103-BIO-CITRIC-ACID-CYCLE | ART-103-BIO-GLYCOGEN-METABOLISM

## related_concept_ids
CON-FND-5253967A0E3786 | CON-FND-9420F608039B74 | CON-FND-403D06D1FB129F

## resource_ids
src_300847a5fa64809d6c07

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
0.35

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p91 q7 and q9; p92 q13 and q17; p93 q20 and q21; p96 q40 | 103 BMS

## atomic_claim_ids
CLM-FND-GLYCOLYSIS-YIELD-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Complete oxidation of one mole of glucose yields up to 32 moles of ATP under aerobic conditions, but 2 moles only under anaerobic conditions."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-CC13A748326880

## conflicts
Older textbooks and older Kasr teaching give 36 to 38 ATP per glucose, using 3 ATP per NADH and 2 per FADH2. The department book uses 2.5 and 1.5 and totals 32, and the question book's key follows the book. Thirty-two is taught; the older figure is recorded so a student who meets it elsewhere knows why it differs.

## uncertainty
The book's own table gives 32 with the 2.5/1.5 accounting. The 33 figure for a glucosyl unit of muscle glycogen is not printed in the book; it follows from its statement that glycogenolysis yields glucose 1-phosphate, which is converted to glucose 6-phosphate by phosphoglucomutase without spending ATP, so the hexokinase ATP is saved. The question book's printed key gives 33 and that arithmetic is what supports it.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "ATP yield", "glycolysis", "32 ATP" and "anaerobic". Only CON-MSK-CC13A748326880 came back, on anaerobic glycolysis supporting brief exercise, with no numbers.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-MSK-CC13A748326880 says brief high-intensity exercise is supported by anaerobic glycolysis. Not merged — that is an exercise-physiology statement about which fuel system covers which effort, while this concept is the ATP arithmetic. Cross-linked instead.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Fluoride stops glycolysis at enolase and arsenic stops it at glyceraldehyde 3-phosphate dehydrogenase

## id
CON-FND-0D6BFD870813B7

## canonical_key
glycolysis.inhibitors.fluoride-and-arsenic

## aliases
Inhibitors of glycolysis
Sodium fluoride
Fluoride tube
Enolase inhibition
Arsenic poisoning
Iodoacetate
Blood glucose sample

## arabic_label
مثبطات تحلل السكر

## arabic_aliases
فلوريد الصوديوم في عينات سكر الدم
تثبيط إنزيم الإينوليز

## definition
Two glycolytic enzymes have named inhibitors. Glyceraldehyde 3-phosphate dehydrogenase is inhibited by arsenic and by iodoacetate, both of which block the SH group in its active site. Enolase is irreversibly inhibited by fluoride, which binds the magnesium in its active site; that is why sodium fluoride is added to a blood tube before glucose estimation — it stops the red cells consuming the glucose in the sample, so the result is the glucose the patient had rather than what is left after the tube has been sitting.

## explicit_objective
Match fluoride and arsenic to the glycolytic enzyme each inhibits, and explain why a glucose sample is collected into a fluoride tube.

## pitfalls
Choosing oxalate, citrate or heparin for the glucose tube because all three are anticoagulants. They stop the blood clotting; none stops glycolysis, so the glucose keeps falling in the tube. Fluoride is chosen for what it does to enolase, not for what it does to clotting.

## concept_type
investigation

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_article_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## related_concept_ids
CON-FND-853096A349FFBD | CON-FND-F9CE11670992CE | CON-FND-229C78C9EB0E78

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.7

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p91 q11 and q12 | 103 BMS

## atomic_claim_ids
CLM-FND-GLYCOLYSIS-INHIBITORS-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"It is inhibited irreversibly by fluoride by binding with Mg+2 which is present in the active site of the enzyme. So, fluoride is added to blood samples prior to glucose estimation to prevent glycolysis and to obtain accurate glucose estimation."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book names arsenic and iodoacetate as inhibitors of glyceraldehyde 3-phosphate dehydrogenase. The question book asks about "arsenate", which chemically is not arsenite; the book does not distinguish them at this step, and neither does the question. Nothing about which arsenic species is meant is asserted.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "fluoride", "enolase", "arsenic" and "iodoacetate". No live or pending record matches any of the four.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
A red cell without pyruvate kinase makes no net ATP from glucose, and the result is haemolytic anaemia

## id
CON-HEM-585B833F845F62

## canonical_key
glycolysis.pyruvate-kinase-deficiency.haemolytic-anaemia

## aliases
Pyruvate kinase deficiency
PK deficiency
Haemolytic anaemia from enzyme deficiency
Non-spherocytic haemolytic anaemia

## arabic_label
نقص إنزيم البيروفات كيناز

## arabic_aliases
فقر الدم الانحلالي بسبب نقص إنزيم
اعتماد كرات الدم الحمراء على تحلل السكر

## definition
The red cell has no mitochondria, so glycolysis is its only source of ATP, and both of glycolysis's substrate-level ATP steps must work for there to be any net gain. Pyruvate kinase makes two of the four ATP; without it the two ATP spent by hexokinase and PFK-1 are never repaid, so the net yield falls from two to zero. The cell cannot run its membrane pumps, and it lyses — a haemolytic anaemia. Because pyruvate is not formed, lactate is not formed either, and the ADP-to-ATP ratio rises above normal.

## explicit_objective
Explain why pyruvate kinase deficiency causes haemolysis, and state the net ATP yield and the products that fail to appear in a red cell that lacks the enzyme.

## pitfalls
Expecting glucose, oxaloacetate or acetyl-CoA to be the missing product. A red cell makes none of those in the first place — it has no mitochondria and does not do gluconeogenesis. The product that goes missing is lactate, because lactate is made from pyruvate.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-HEM-T01 | DIS-BIO-T03

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_article_ids
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT

## related_concept_ids
CON-HEM-095C9C97B56CCA | CON-FND-0F4A45886203EF | CON-HEM-4F64967BBFBB6F

## resource_ids
src_300847a5fa64809d6c07

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
0.8

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p92 q14, q15 and q16; p93 q22 | 103 BMS

## atomic_claim_ids
CLM-HEM-PYRUVATE-KINASE-DEFICIENCY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"As RBCs lack mitochondria, glycolysis is the only source of ATP through substrate level phosphorylation."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-HEM-4F64967BBFBB6F

## conflicts
[clear]

## uncertainty
The department book states that the red cell depends entirely on glycolysis for ATP and that pyruvate kinase makes ATP at substrate level, but it does not name pyruvate kinase deficiency as a disease anywhere. The disease is the question book's, and what is asserted here is the consequence that follows arithmetically from the book's own statements. No inheritance pattern, prevalence or treatment is claimed.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "pyruvate kinase", "haemolytic", "hemolytic anemia" and "glycolysis". The haemolytic hits are the pending 103 records on favism and haemolytic jaundice; neither is about pyruvate kinase.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-HEM-4F64967BBFBB6F is favism — haemolysis from G6PD deficiency and oxidant stress. Not merged: same clinical picture, different mechanism, and a question can hand a student either enzyme. They are cross-linked because telling the two apart is exactly what the exam asks.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Anaerobic glycolysis makes lactate not for the lactate but to regenerate the NAD+ that glyceraldehyde 3-phosphate dehydrogenase needs

## id
CON-FND-403D06D1FB129F

## canonical_key
glycolysis.anaerobic.lactate-regenerates-nad

## aliases
Anaerobic glycolysis
Lactate dehydrogenase
Why pyruvate becomes lactate
NAD regeneration
Lactate formation in muscle

## arabic_label
تحلل السكر اللاهوائي وتجديد NAD

## arabic_aliases
إنزيم نازعة هيدروجين اللاكتات
تكوين اللاكتات في العضلات

## definition
Glyceraldehyde 3-phosphate dehydrogenase needs NAD⁺ and there is very little of it in a cell, so glycolysis can only continue while NADH is being reoxidised. Aerobically the respiratory chain does that. Without oxygen the chain stops, and lactate dehydrogenase reduces pyruvate to lactate using the NADH the dehydrogenase step produced, which returns NAD⁺ to the pathway. The lactate is a by-product; the NAD⁺ is the point. This happens in red cells, which have no mitochondria at all, and in muscle during severe prolonged exercise, where oxygen is relatively deficient.

## explicit_objective
Explain why pyruvate is reduced to lactate when oxygen is absent, naming the enzyme and the cofactor that has to be regenerated.

## pitfalls
Believing lactate is made because two extra ATP come out of it. No ATP is made at the lactate dehydrogenase step at all — the anaerobic yield is two ATP, all of it from glycolysis itself, and lactate formation is what makes those two possible rather than adding to them.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_article_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## related_concept_ids
CON-FND-0F4A45886203EF | CON-FND-596FDA58EEEF0A | CON-HEM-095C9C97B56CCA

## resource_ids
src_300847a5fa64809d6c07

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
0.6

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p93 q23 | 103 BMS

## atomic_claim_ids
CLM-FND-ANAEROBIC-LACTATE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"This reaction allows glycolysis to proceed in the absence of oxygen by regenerating sufficient NAD+ required by glyceraldehyde 3-phosphate dehydrogenase step."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
None material. The book states the purpose of the reaction explicitly.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "lactate", "lactate dehydrogenase", "anaerobic" and "NAD". The lactate hits are CON-MSK-8D38E9DA424285 on hepatic conversion of muscle lactate and CON-REN-3F808243D3CF49 on adrenaline; neither states why lactate is made.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Pyruvate dehydrogenase is irreversible and needs five coenzymes, of which thiamine pyrophosphate is the one that fails first

## id
CON-FND-229C78C9EB0E78

## canonical_key
pyruvate.dehydrogenase.oxidative-decarboxylation-tpp

## aliases
Pyruvate dehydrogenase complex
PDH
Oxidative decarboxylation of pyruvate
Thiamine pyrophosphate
TPP
Congenital lactic acidosis
Active acetate

## arabic_label
مركب إنزيم نازعة هيدروجين البيروفات

## arabic_aliases
نزع الكربوكسيل التأكسدي للبيروفات
ثيامين بيروفوسفات
الحماض اللبني الخلقي

## definition
Pyruvate formed by aerobic glycolysis is carried into the mitochondrion and undergoes oxidative decarboxylation to acetyl-CoA by the pyruvate dehydrogenase complex. The reaction is irreversible — no enzyme reverses it — and it needs five coenzymes: thiamine pyrophosphate, lipoate, coenzyme A, FAD and NAD⁺. It is inhibited by its own products, acetyl-CoA and NADH, and by ATP, and activated by pyruvate, NAD⁺, CoA, ADP, calcium released during exercise, and insulin. When it fails, pyruvate accumulates and is converted to lactate: congenital deficiency of the complex is the commonest cause of congenital lactic acidosis and damages the brain, thiamine deficiency produces the same lactic acidosis, and arsenic poisoning blocks it by tying up the thiol groups of lipoate.

## explicit_objective
Name the enzyme that converts pyruvate to acetyl-CoA, list its coenzymes, and predict what accumulates in blood when it is inhibited by deficiency, by thiamine lack or by arsenic.

## pitfalls
Blaming lactate dehydrogenase when a question says pyruvate cannot be oxidised to acetyl-CoA in anaerobic conditions. Lactate dehydrogenase is the enzyme that is working — it is what disposes of the pyruvate. The step that is blocked is pyruvate dehydrogenase, because the cycle and the chain behind it have stopped.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_article_ids
ART-103-BIO-CITRIC-ACID-CYCLE | ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## related_concept_ids
CON-FND-CA0F9E019BC5BA | CON-FND-F9CE11670992CE | CON-FND-C9E5128193029E

## resource_ids
src_300847a5fa64809d6c07

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
0.8

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p93 q25; p94 q26 and q27; p102 q77 | 103 BMS

## atomic_claim_ids
CLM-FND-PDH-COMPLEX-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"This step is catalyzed by pyruvate dehydrogenase complex (PDH) which requires five coenzymes i.e., thiamine pyrophosphate (TPP), lipoate, CoA, FAD and NAD+."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The question book sets a thiamine-deficient patient with heart disease, which is wet beriberi; the department book covers beriberi in its vitamins chapter and does not connect the cardiac failure to pyruvate dehydrogenase in the carbohydrate chapter. The enzyme link is the book's; the cardiac presentation is the question's, and no mechanism joining the two is asserted.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "pyruvate", "thiamine", "lactic acidosis" and "acetyl-CoA". "Pyruvate" returns nothing at all in live state; the thiamine material is in the pending 103 water-soluble vitamins concept, which is a matching item about active forms and does not teach the enzyme.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Pyruvate carboxylase carboxylates pyruvate to oxaloacetate, needs biotin, and is switched on by acetyl-CoA

## id
CON-FND-CA0F9E019BC5BA

## canonical_key
pyruvate.carboxylase.oxaloacetate-anaplerosis

## aliases
Pyruvate carboxylase
Carboxylation of pyruvate
Biotin
Anaplerotic reaction
Oxaloacetate formation

## arabic_label
إنزيم كربوكسيلاز البيروفات

## arabic_aliases
كربكسلة البيروفات
البيوتين كعامل مساعد

## definition
Pyruvate carboxylase is a mitochondrial enzyme that adds CO2 to pyruvate to make oxaloacetate, using ATP and requiring biotin and magnesium. The reaction is irreversible and is a carboxylation, not an oxidation or a decarboxylation. Acetyl-CoA is its allosteric activator, which is how a cell with plenty of acetyl-CoA guarantees itself the oxaloacetate that citrate synthase needs; anti-insulin hormones induce the enzyme and insulin represses it. The same reaction is the first of the two steps that carry pyruvate to phosphoenolpyruvate in gluconeogenesis.

## explicit_objective
Classify the pyruvate-to-oxaloacetate reaction, name its enzyme, cofactor and allosteric activator, and say where it sits in gluconeogenesis.

## pitfalls
Calling the reaction a decarboxylation because the neighbouring pyruvate dehydrogenase reaction is one. Pyruvate carboxylase adds a carbon; pyruvate dehydrogenase removes one. The two enzymes sit on the same substrate and pull in opposite directions, which is why they are confused.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Oxidation of Glucose

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Oxidation of Glucose

## article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_article_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE | ART-103-BIO-CITRIC-ACID-CYCLE

## related_concept_ids
CON-FND-229C78C9EB0E78 | CON-FND-C2C88203E4A918 | CON-FND-8F8B3EF0763399

## resource_ids
src_300847a5fa64809d6c07

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
0.4

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p93 q24 | 103 BMS

## atomic_claim_ids
CLM-FND-PYRUVATE-CARBOXYLASE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Irreversible reaction catalyzed by mitochondrial enzyme pyruvate carboxylase."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
None material. The book gives the enzyme, the cofactors, the allosteric activator and the hormonal control directly.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "pyruvate", "carboxylase", "biotin" and "oxaloacetate". None of the four returns a live or pending record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Glycogen synthesis runs on UDP-glucose, and making it costs a UTP

## id
CON-FND-1FC7D932D7EFDC

## canonical_key
glycogenesis.udp-glucose.utp-activation

## aliases
Glycogenesis
UDP-glucose
UDP-glucose pyrophosphorylase
Glycogen synthase
Branching enzyme
Activation of glucose

## arabic_label
تخليق الجليكوجين وتنشيط الجلوكوز

## arabic_aliases
يوريدين ثنائي فوسفات الجلوكوز
إنزيم تخليق الجليكوجين

## definition
Glycogenesis is the synthesis of glycogen from glucose, in the cytosol of liver and muscle, and it begins by activating the sugar. Glucose is phosphorylated to glucose 6-phosphate, phosphoglucomutase converts that to glucose 1-phosphate, and UDP-glucose pyrophosphorylase then condenses glucose 1-phosphate with UTP to give UDP-glucose, the immediate precursor for glycogen synthesis. Glycogen synthase, the key enzyme, transfers glucosyl units from UDP-glucose onto a glycogen primer in α1,4 linkage, and the branching enzyme moves segments of six to eight residues to form the α1,6 branch points.

## explicit_objective
Name the nucleotide required to activate glucose for glycogen synthesis and the enzyme that uses the activated form, and put the steps of glycogenesis in order.

## pitfalls
Answering ATP because ATP pays for everything else. ATP does phosphorylate the glucose at the first step, but the step the question is about is activation, and that one takes UTP. GTP belongs to gluconeogenesis at PEPCK, and CTP to phospholipid synthesis.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## article_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## related_article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_concept_ids
CON-FND-3905E3B98C2EC4 | CON-FND-CA74978B7B7ED1 | CON-FND-051CF62C7920A3

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.35

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p95 q35 | 103 BMS

## atomic_claim_ids
CLM-FND-GLYCOGENESIS-UDP-GLUCOSE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"1) Activation of glucose: to form uridine diphosphate glucose (UDP-Glc) which is the immediate precursor for glycogen synthesis."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
None material. The book prints the UTP arrow on the activation step.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "glycogen", "UDP", "glycogen synthase" and "glycogenesis". The glycogen records are exercise-physiology and endocrine concepts about stores and hormones; none teaches the activation step.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Glycogen breakdown yields mostly glucose-1-phosphate, and only the liver can turn it into blood glucose

## id
CON-FND-3905E3B98C2EC4

## canonical_key
glycogenolysis.products.glucose-1-phosphate-and-tissue-fate

## aliases
Glycogenolysis
Glycogen phosphorylase
Debranching enzyme
Glucose-1-phosphate
Why muscle cannot raise blood glucose
Glucose 6-phosphatase in liver

## arabic_label
تكسير الجليكوجين ومصير ناتجه

## arabic_aliases
إنزيم فسفوريليز الجليكوجين
إنزيم إزالة التفرع
غياب الفوسفاتيز في العضلات

## definition
Glycogen phosphorylase cleaves α1,4 linkages phosphorolytically and releases glucose 1-phosphate, stopping about four residues from each branch point. The debranching enzyme then transfers three of those residues with its glucosyl transferase activity and hydrolyses the last one with its glucosidase activity, releasing a single free glucose. Because only the residue at each branch point comes off as free glucose, the major product is glucose 1-phosphate. Phosphoglucomutase converts it to glucose 6-phosphate, and there the two tissues part company: liver has glucose 6-phosphatase and releases free glucose to the blood, while muscle has none, so its glucose 6-phosphate can only enter glycolysis and feed the contracting muscle. That is why liver glycogen maintains blood glucose and muscle glycogen does not.

## explicit_objective
State the major product of glycogenolysis, and explain why muscle glycogen cannot raise blood glucose while liver glycogen can.

## pitfalls
Naming glycogen phosphorylase or the debranching enzyme as the one missing from muscle. Muscle has both, and it breaks its glycogen down perfectly well. The enzyme it lacks is glucose 6-phosphatase, which is the last step and the only one that can free the glucose.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## article_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## related_article_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## related_concept_ids
CON-FND-1FC7D932D7EFDC | CON-FND-1BE461A57AB76D | CON-FND-596FDA58EEEF0A

## resource_ids
src_300847a5fa64809d6c07

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
0.6

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p95 q36 and q37; p96 q41; p100 q67; p101 q69 | 103 BMS

## atomic_claim_ids
CLM-FND-GLYCOGENOLYSIS-PRODUCT-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Muscle glycogen does not directly maintain blood glucose because muscle lacks glucose 6-phosphatase."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book says the major product is glucose 1-phosphate and shows one free glucose released per branch point, but gives no ratio. The proportion is therefore stated as "mostly" rather than as a figure.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "glycogen", "glucose-6-phosphatase", "phosphorylase" and "debranching". CON-MSK-10DF05A8B81781 and CON-MSK-38F07C3ED8023F cover muscle phosphorylase in exercise; neither states the product or the tissue difference in phosphatase.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Glycogen synthesis and breakdown are reciprocally switched by one cAMP cascade, with calcium and AMP as the muscle's own overrides

## id
CON-FND-CA74978B7B7ED1

## canonical_key
glycogen.regulation.camp-cascade-and-allosteric

## aliases
Regulation of glycogen metabolism
cAMP
Protein kinase A
Phosphorylase kinase
Protein phosphatase-1
Reciprocal regulation of glycogen
AMP and phosphorylase b

## arabic_label
تنظيم أيض الجليكوجين

## arabic_aliases
الأدينوسين أحادي الفوسفات الحلقي
إنزيم كيناز الفوسفوريليز
التنظيم المتبادل

## definition
Glucagon in liver and epinephrine in liver and muscle raise cAMP, which activates protein kinase A. Protein kinase A phosphorylates two targets in opposite directions: it phosphorylates glycogen synthase, which inactivates it, and it phosphorylates phosphorylase kinase, which activates it and which in turn phosphorylates glycogen phosphorylase, activating that. So one signal stops synthesis and starts breakdown at once. Insulin reverses the whole cascade by activating phosphodiesterase, which lowers cAMP, and protein phosphatase-1, which dephosphorylates both enzymes — activating the synthase and inactivating the phosphorylase. On top of that sit allosteric controls: glucose 6-phosphate activates glycogen synthase and inhibits phosphorylase, ATP inhibits phosphorylase, AMP activates it, and in contracting muscle a rise in calcium activates phosphorylase kinase without any phosphorylation at all.

## explicit_objective
Trace the cascade from glucagon or epinephrine to activated glycogen phosphorylase, name the enzyme that does the covalent modification, and predict the direction of both enzymes after a meal and after an overnight fast.

## pitfalls
Naming protein kinase A as the enzyme that phosphorylates glycogen phosphorylase. It does not — it phosphorylates phosphorylase kinase, and phosphorylase kinase phosphorylates the phosphorylase. One extra step in the chain is exactly what the question is testing.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## article_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## related_article_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## related_concept_ids
CON-FND-3905E3B98C2EC4 | CON-FND-1FC7D932D7EFDC | CON-END-0B615572003514

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.85

## exam_weight_by_year
KAU_Y1=0.85

## clinical_relevance
0.55

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p96 q39, q42 and q43; p97 q44, q45 and q46; p102 q76 | 103 BMS

## atomic_claim_ids
CLM-FND-GLYCOGEN-REGULATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Glucagon (liver) and epinephrine (liver and muscles) (Fasting state): Both phosphorylate (activate) phosphorylase kinase and accordingly activate glycogen phosphorylase which increases the rate of glycogenolysis."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-10DF05A8B81781 | CON-MSK-38F07C3ED8023F

## conflicts
AMP activation of glycogen phosphorylase b is asserted by the question book's key and by the live concept CON-MSK-10DF05A8B81781, and is absent from the department book, which lists only ATP and glucose 6-phosphate as allosteric effectors of the phosphorylase and calcium as the muscle override. A reviewer should decide whether to teach AMP here or to send it to the physiology of exercise.

## uncertainty
The department book states that ATP and glucose 6-phosphate inhibit the active phosphorylase and that calcium activates phosphorylase kinase in contracting muscle, but it does not print AMP as an allosteric activator of phosphorylase b. That statement is standard in international texts and is the question book's printed key; it is included here and flagged, because it is the one claim in this concept the department book does not itself carry.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "cAMP", "protein kinase A", "phosphorylase kinase" and "glycogen". CON-MSK-10DF05A8B81781 and CON-MSK-38F07C3ED8023F are the near neighbours.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-MSK-10DF05A8B81781 says glycogen phosphorylase is activated by calcium, epinephrine and AMP during sprinting, and CON-MSK-38F07C3ED8023F says epinephrine but not glucagon acts on muscle because muscle has no glucagon receptor. Neither is merged: both are exercise-physiology records about muscle in a named activity, while this concept is the covalent cascade and its reciprocal effect on both enzymes in both tissues. Both are cross-linked, and CON-MSK-38F07C3ED8023F supplies the receptor reason this concept does not state.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Von Gierke's disease is glucose 6-phosphatase deficiency, and every feature follows from glucose 6-phosphate that cannot be dephosphorylated

## id
CON-FND-1BE461A57AB76D

## canonical_key
glycogenosis.von-gierke.glucose-6-phosphatase-deficiency

## aliases
Von Gierke disease
Type I glycogen storage disease
Glucose 6-phosphatase deficiency
Glycogen storage disease
Glycogenosis
Fasting hypoglycaemia in infancy

## arabic_label
مرض فون جيركه

## arabic_aliases
نقص إنزيم الجلوكوز-6-فوسفاتيز
أمراض تخزين الجليكوجين

## definition
Von Gierke's disease is type I glycogen storage disease and is caused by a defect in hepatic glucose 6-phosphatase. Both glycogenolysis and gluconeogenesis end in glucose 6-phosphate, so when it cannot be dephosphorylated no net glucose is formed and the child has fasting hypoglycaemia with an enlarged liver. The accumulated glucose 6-phosphate goes down glycolysis to lactate, giving lactic acidosis, and down the pentose phosphate pathway to excess purine synthesis and so to hyperuricaemia — which the lactate worsens by competing with urate for renal excretion. Severe hypoglycaemia drives epinephrine, epinephrine drives lipolysis, and the free fatty acids reaching the liver become triacylglycerol, so there is hyperlipidaemia and a fatty liver.

## explicit_objective
Name the enzyme defective in von Gierke's disease and derive its four metabolic features — hypoglycaemia, lactic acidosis, hyperuricaemia and hyperlipidaemia — from the one block.

## pitfalls
Choosing liver glycogen phosphorylase or glycogen synthase for the infant with hypoglycaemia, hepatomegaly, lactic acidosis and hyperuricaemia. A phosphorylase defect gives hypoglycaemia and hepatomegaly but no lactic acidosis, because the glucose 6-phosphate is never made; the raised lactate and urate are what point at the phosphatase.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## article_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## related_article_ids
ART-103-BIO-GOUT-AND-HYPERURICAEMIA

## related_concept_ids
CON-FND-3905E3B98C2EC4 | CON-REN-31708150F8B722 | CON-FND-C2C88203E4A918

## resource_ids
src_300847a5fa64809d6c07

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
0.85

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p96 q38; p100 q66 | 103 BMS

## atomic_claim_ids
CLM-FND-VON-GIERKE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Cause: It is due to defect in glucose-6-phosphatase in liver. -The principal metabolic effects are fasting hypoglycemia, lactic acidosis, hyperlipidemia, and hyperuricemia."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book calls it "one of the most common glycogen storage diseases worldwide" and gives no figure, and none is invented. Its only management statement is that patients should eat frequently during the day, especially carbohydrate-containing food; nothing further is asserted, and the record is held at needs_evidence for that reason.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "von Gierke", "glycogen storage", "glucose-6-phosphatase" and "hypoglyc". No live record matches the first three; the hypoglycaemia hits are an adrenaline indication and Addison's disease.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Gluconeogenesis is the reversal of glycolysis except at three irreversible steps, which four key enzymes bypass

## id
CON-FND-C2C88203E4A918

## canonical_key
gluconeogenesis.key-enzymes.four-bypasses

## aliases
Gluconeogenesis
Key enzymes of gluconeogenesis
Pyruvate carboxylase
PEPCK
Phosphoenolpyruvate carboxykinase
Fructose 1,6-bisphosphatase
Dicarboxylic acid shuttle

## arabic_label
استحداث السكر وإنزيماته المفتاحية

## arabic_aliases
الإنزيمات الأربعة المفتاحية
مكوك الأحماض ثنائية الكربوكسيل

## definition
Gluconeogenesis is the synthesis of glucose from non-carbohydrate precursors, mainly in liver and to a lesser extent in kidney, which are the only tissues with glucose 6-phosphatase and fructose 1,6-bisphosphatase. It is the reversal of glycolysis except at glycolysis's three irreversible kinase steps, and four key enzymes bypass them: glucose 6-phosphatase reverses glucokinase, fructose 1,6-bisphosphatase reverses PFK-1, and pyruvate carboxylase and phosphoenolpyruvate carboxykinase together reverse pyruvate kinase. That last bypass therefore takes two irreversible reactions, not one, and it straddles two compartments — pyruvate carboxylase is mitochondrial and PEPCK cytosolic, so oxaloacetate leaves the mitochondrion as malate in the dicarboxylic acid shuttle. All four key enzymes are cytosolic except pyruvate carboxylase.

## explicit_objective
Name the four key enzymes of gluconeogenesis and the glycolytic step each bypasses, and explain why the conversion of pyruvate to phosphoenolpyruvate is partly mitochondrial and partly cytosolic.

## pitfalls
Counting three bypass enzymes because there are three irreversible glycolytic steps. The pyruvate kinase step needs two enzymes to get round it, so the answer is four key enzymes for three blocks — and two irreversible reactions to get from pyruvate to phosphoenolpyruvate.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## article_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## related_article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## related_concept_ids
CON-FND-CA0F9E019BC5BA | CON-FND-853096A349FFBD | CON-FND-089E2C3E01031C

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.9

## exam_weight_by_year
KAU_Y1=0.9

## clinical_relevance
0.5

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p97 q47; p98 q52; p99 q56, q57, q59 and q60 | 103 BMS

## atomic_claim_ids
CLM-FND-GLUCONEOGENESIS-KEY-ENZYMES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"All gluconeogenic key enzymes are present in the cytosol except the mitochondrial pyruvate carboxylase."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book prints the four enzymes in a table opposite the three glycolytic kinases and does not itself say "four". The count is read off its own table.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "gluconeogenesis", "PEPCK", "carboxykinase" and "fructose 1,6-bisphosphatase". The two gluconeogenesis records are CON-END-3EA6071BAE8130 and CON-END-FB7FB91A0697C0, both about insulin ratios rather than enzymes.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Lactate, glucogenic amino acids, glycerol and odd-chain fatty acids give glucose; acetyl-CoA never can

## id
CON-FND-089E2C3E01031C

## canonical_key
gluconeogenesis.substrates.acetyl-coa-cannot-give-glucose

## aliases
Gluconeogenic substrates
Glucogenic amino acids
Glycerol as substrate
Why fat cannot make glucose
Ketogenic amino acids
Odd chain fatty acids

## arabic_label
ركائز استحداث السكر

## arabic_aliases
الأحماض الأمينية المولدة للجلوكوز
الجليسرول كركيزة
لماذا لا تتحول الدهون إلى جلوكوز

## definition
A gluconeogenic substrate is anything that gives, directly or indirectly, pyruvate, oxaloacetate or an intermediate of glycolysis or the citric acid cycle. The book names four: lactate, from red cells continuously and from muscle in severe exercise; glucogenic amino acids, which is all of them except leucine and lysine; glycerol, released by lipolysis and entering at dihydroxyacetone phosphate after glycerol kinase and glycerol 3-phosphate dehydrogenase; and, rarely, the propionyl-CoA from odd-chain fatty acids. Acetyl-CoA can never give glucose, because the pyruvate dehydrogenase reaction that made it is irreversible — which is why even-chain fatty acids and ketone bodies such as acetoacetate are not gluconeogenic. Lactate enters at pyruvate and glycerol at dihydroxyacetone phosphate, so the first intermediate they share is glucose 6-phosphate.

## explicit_objective
List the gluconeogenic substrates, name the two amino acids that are purely ketogenic, and explain why acetyl-CoA cannot become glucose.

## pitfalls
Thinking that because fat can be burnt for energy it can also be turned into sugar. Even-chain fatty acids yield only acetyl-CoA, and the step that made it cannot run backwards. The part of a triacylglycerol that does give glucose is the glycerol backbone, not the fatty acids.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## article_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## related_article_ids
ART-103-BIO-KETOSIS

## related_concept_ids
CON-FND-C2C88203E4A918 | CON-FND-596FDA58EEEF0A | CON-END-CC450A236ABF50

## resource_ids
src_300847a5fa64809d6c07

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
0.5

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p97 q49; p98 q51 | 103 BMS

## atomic_claim_ids
CLM-FND-GLUCONEOGENIC-SUBSTRATES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Acetyl CoA never gives glucose because pyruvate dehydrogenase reaction is irreversible."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book calls leucine and lysine "purely ketogenic" and every other amino acid convertible to glucose. Some international sources classify several more as ketogenic and glucogenic at once; the department book's two-name list is what is taught and what the exam follows.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "gluconeogenesis", "glycerol", "glucogenic" and "acetoacetate". Nothing lists substrates; the pending 103 ketosis concept covers ketone bodies from the other direction.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
The Cori cycle carries lactate from muscle and red cells to the liver, which makes glucose from it and sends it back

## id
CON-FND-596FDA58EEEF0A

## canonical_key
lactate.cori-cycle.muscle-liver-recycling

## aliases
Cori cycle
Glucose-lactate cycle
Lactate shuttle to the liver
Removal of lactic acid

## arabic_label
دورة كوري

## arabic_aliases
دورة الجلوكوز واللاكتات
التخلص من حمض اللاكتيك

## definition
Lactate is produced by glycolysis in red cells continuously and in skeletal muscle during severe exercise. It diffuses into the blood and is taken up by the liver, where lactate dehydrogenase turns it back into pyruvate and gluconeogenesis turns the pyruvate into glucose; the glucose returns in the blood to the muscle and the red cell to be used again. The cycle runs muscle to liver, not liver to muscle, and it depends on the liver having glucose 6-phosphatase — muscle cannot do the return leg because it cannot release free glucose. Its importance is twofold: it maintains blood glucose, and it prevents lactic acidosis.

## explicit_objective
State the direction of lactate and of glucose in the Cori cycle, name the two tissues it links, and give its two purposes.

## pitfalls
Running the cycle backwards — describing lactate travelling from liver to muscle for gluconeogenesis. Gluconeogenesis happens in the liver, so the liver must be where the lactate arrives. The brain is not part of the cycle either; the two tissues are muscle or red cell, and liver.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## article_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## related_article_ids
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT

## related_concept_ids
CON-FND-403D06D1FB129F | CON-FND-E7214B4A8D8835 | CON-FND-3905E3B98C2EC4

## resource_ids
src_300847a5fa64809d6c07

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
0.6

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p98 q50, q53 and q55 | 103 BMS

## atomic_claim_ids
CLM-FND-CORI-CYCLE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"In the liver, lactate is converted to glucose by gluconeogenesis. Glucose goes back to the red cells or muscles and is reutilized for production of energy (Cori cycle)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-MSK-8D38E9DA424285

## conflicts
[clear]

## uncertainty
The book states that the Cori cycle prevents lactic acidosis and maintains blood glucose, and gives no figures for how much glucose it accounts for. None is invented.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "Cori", "lactate", "glucose-lactate" and "liver gluconeogenesis". "Cori" returns nothing; the closest live record is CON-MSK-8D38E9DA424285.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-MSK-8D38E9DA424285 states that exercising muscle can release lactate for hepatic conversion to glucose — the same traffic, seen from the muscle. Not merged: that record is an exercise-physiology observation with no return leg, no red cell, no enzyme and no acid-base purpose, and a question could test either without the other. Cross-linked, and a reviewer who prefers one record should fold that one into this rather than the other way round.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
The glucose–alanine cycle carries muscle nitrogen to the liver as alanine and brings the carbon back as glucose

## id
CON-FND-E7214B4A8D8835

## canonical_key
alanine.glucose-alanine-cycle.nitrogen-transport

## aliases
Glucose-alanine cycle
Alanine cycle
Nitrogen transport from muscle
Alanine aminotransferase
Protein as a source of blood glucose

## arabic_label
دورة الجلوكوز والألانين

## arabic_aliases
نقل النيتروجين من العضلات إلى الكبد
الألانين كناقل للنيتروجين

## definition
When muscle degrades amino acids for energy, it must move the nitrogen somewhere safe. It transaminates the resulting amino group onto pyruvate to form alanine, and the alanine travels in the blood to the liver. There transdeamination strips the nitrogen off again for the urea cycle and returns the carbon skeleton as pyruvate, which gluconeogenesis converts to glucose; the glucose goes back to the muscle. Protein becomes the main source of blood glucose in prolonged fasting, and it does so through this cycle.

## explicit_objective
Name the amino acid that carries nitrogen from muscle to liver during starvation, and describe what happens to its nitrogen and to its carbon skeleton on arrival.

## pitfalls
Choosing glutamine because glutamine is also a nitrogen carrier. Glutamine carries ammonia in blood generally; the cycle that pairs nitrogen transport with gluconeogenesis and is named after glucose is the alanine one, and alanine is what the book names for muscle in starvation.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## article_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## related_article_ids
ART-103-BIO-NITROGEN-BALANCE

## related_concept_ids
CON-FND-596FDA58EEEF0A | CON-FND-089E2C3E01031C | CON-FND-B320D24EC35D30

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.45

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p101 q73 | 103 BMS

## atomic_claim_ids
CLM-FND-GLUCOSE-ALANINE-CYCLE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"When muscles degrade amino acids for energy production, the resulting nitrogen is transmitted to pyruvate to form alanine. Then alanine in the liver is converted to pyruvate, which is converted to glucose."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives no figure for the share of gluconeogenic substrate that arrives as alanine, and none is invented.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "alanine cycle", "alanine", "transamination" and "nitrogen". Nothing matches the cycle; the pending 103 nitrogen-balance concept is about intake and loss, not transport.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Glycolysis and gluconeogenesis are reciprocally regulated, and it is fatty acid oxidation that tips the liver towards making glucose

## id
CON-FND-7B3B4F0BEBF198

## canonical_key
gluconeogenesis.regulation.reciprocal-with-glycolysis

## aliases
Reciprocal regulation of glycolysis and gluconeogenesis
Regulation of gluconeogenesis
Effect of fatty acid oxidation
Acetyl-CoA and pyruvate carboxylase
Fasting metabolism

## arabic_label
التنظيم المتبادل لتحلل السكر واستحداث السكر

## arabic_aliases
تأثير أكسدة الأحماض الدهنية
أيض الصيام

## definition
The two pathways are switched in opposite directions by the same signals, so that the liver never runs both at once. Fasting, starvation, a low-carbohydrate diet, stress and severe exercise all raise anti-insulin hormones, which drive lipolysis; the free fatty acids that arrive in the liver are oxidised, and that oxidation is what does the switching. It raises ATP, which allosterically inhibits PFK-1, pyruvate kinase and pyruvate dehydrogenase, and it raises acetyl-CoA, which allosterically stimulates pyruvate carboxylase and inhibits pyruvate dehydrogenase — so pyruvate is pushed towards oxaloacetate and glucose rather than towards acetyl-CoA. Hormonally, insulin raises the glycolytic key enzymes and lowers the gluconeogenic ones, and glucagon is the main inducer of the gluconeogenic key enzymes; cortisol adds amino acids by protein catabolism and growth hormone induces the liver aminotransferases. In starvation, oxaloacetate is drawn off into glucose, which is why it is no longer available to condense with acetyl-CoA.

## explicit_objective
Explain how increased fatty acid oxidation activates gluconeogenesis and inhibits glycolysis, and predict which key enzymes rise and which fall in prolonged fasting and in diabetes mellitus.

## pitfalls
Expecting a rise in AMP to favour gluconeogenesis because AMP means the cell is short of energy. AMP activates PFK-1, so it favours glycolysis; it is the *fall* in AMP with plenty of ATP from fatty acid oxidation that favours gluconeogenesis. The signal that says "make glucose" is fuel arriving from fat, not fuel running out.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## article_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## related_article_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS | ART-103-BIO-KETOSIS

## related_concept_ids
CON-FND-C2C88203E4A918 | CON-END-0B615572003514 | CON-END-CC450A236ABF50

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.85

## exam_weight_by_year
KAU_Y1=0.85

## clinical_relevance
0.65

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p97 q48; p98 q54; p100 q64 and q68; p101 q74 and q75 | 103 BMS

## atomic_claim_ids
CLM-FND-RECIPROCAL-REGULATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Increased fatty acid oxidation stimulates gluconeogenesis and inhibits glucose oxidation in the liver."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-END-3EA6071BAE8130

## conflicts
The question book offers "it is important to maintain blood glucose during overnight fast" as a distractor against "it is activated by elevated levels of FFA oxidation", and marks the second correct. Both are consistent with the department book, which makes glycogenolysis the main source up to about 18 hours; the discrimination rests on the word "overnight". A faculty reviewer should confirm the intended reading before this item is published.

## uncertainty
The book says gluconeogenesis "starts 4 to 6 hours after the last meal at a slow rate" and becomes the main source of blood glucose after 12 to 18 hours. An overnight fast therefore sits on the boundary between glycogenolysis and gluconeogenesis, which is why the question book's key for the gluconeogenesis question is the fatty-acid option rather than the overnight-fast option even though both read as true. The boundary is the book's and is recorded rather than resolved.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "gluconeogenesis", "reciprocal", "fatty acid oxidation" and "fasting". CON-END-3EA6071BAE8130 is the near neighbour.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-END-3EA6071BAE8130 says a reduced insulin-to-anti-insulin ratio decreases glucose uptake and use while increasing hepatic glycogenolysis and gluconeogenesis. Not merged: that record is the hormonal ratio seen from endocrinology, while this one is the allosteric mechanism by which fatty acid oxidation does the switching at named enzymes. Cross-linked.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Red cells depend on glucose absolutely, and the brain very nearly so, which is what gluconeogenesis exists to protect

## id
CON-FND-F6450B9D5AB855

## canonical_key
glucose.dependence.obligate-tissues

## aliases
Obligate glucose-dependent tissues
Importance of gluconeogenesis
Brain and glucose
Red cells and glucose
Basal glucose requirement

## arabic_label
الأنسجة المعتمدة على الجلوكوز اعتماداً مطلقاً

## arabic_aliases
أهمية استحداث السكر
اعتماد المخ على الجلوكوز

## definition
Some tissues cannot do without glucose. The red cell has no mitochondria, so glucose is its only source of ATP in every condition, fed or fasting, and during fasting the glucose can only come from gluconeogenesis. The brain uses glucose as its main fuel and cannot use fatty acids at all, because they travel bound to albumin and cannot cross the blood–brain barrier; it takes five to six days of starvation before it adapts to ketone bodies. Even tissues that burn fat need a basal supply of glucose, because pyruvate is where their oxaloacetate comes from, and without oxaloacetate the citric acid cycle cannot turn — so fatty acid and ketone body oxidation cannot proceed without a minimum of glucose.

## explicit_objective
Name the tissue that depends on glucose in all conditions and the tissue that depends on gluconeogenesis during fasting, and explain why fat oxidation still needs some glucose.

## pitfalls
Naming the brain when the question asks which tissue depends on glucose "in all conditions". The brain adapts to ketone bodies after several days of starvation; the red cell never adapts to anything, because it has no mitochondria to burn them in.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## article_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## related_article_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE | ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT

## related_concept_ids
CON-HEM-095C9C97B56CCA | CON-FND-C2C88203E4A918 | CON-END-CC450A236ABF50

## resource_ids
src_300847a5fa64809d6c07

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
0.7

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p99 q58; p100 q63 | 103 BMS

## atomic_claim_ids
CLM-FND-OBLIGATE-GLUCOSE-TISSUES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"‐ In red cells: Glucose is the only source of ATP for red cells."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-HEM-095C9C97B56CCA

## conflicts
[clear]

## uncertainty
The book says brain tissue "takes about 5 to 6 days to adapt for oxidation of ketone bodies during starvation" and gives no figure for how much of its fuel then comes from ketones. Nothing beyond the adaptation time is claimed.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "brain glucose", "red cell", "obligate" and "glucose dependence". The pending 103 record CON-HEM-095C9C97B56CCA states the red cell's dependence from the glycolysis side.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-HEM-095C9C97B56CCA says glycolysis is the only source of ATP in the red cell because it has no mitochondria. Not merged — that record answers "which pathway", this one answers "which tissues must be supplied and why gluconeogenesis exists". Cross-linked, and this concept names it as a loose neighbour.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Glucose 6-phosphate is the crossroads: every tissue makes it, and five pathways lead away from it

## id
CON-FND-051CF62C7920A3

## canonical_key
g6p.branch-point.metabolic-crossroads

## aliases
Glucose 6-phosphate
Metabolic branch point
Fate of glucose 6-phosphate
Junction of metabolic pathways
Phosphohexose isomerase

## arabic_label
الجلوكوز-6-فوسفات كنقطة تفرع أيضية

## arabic_aliases
مصائر الجلوكوز-6-فوسفات
ملتقى المسارات الأيضية

## definition
Glucose 6-phosphate is the first product of glucose entering any cell and the intermediate at the junction of five pathways: glycolysis, gluconeogenesis, the pentose phosphate pathway, glycogenesis and glycogenolysis. It is therefore the one metabolite that every cell uses for glycolysis, for glycogen synthesis and for the hexose monophosphate shunt alike. In the fed state its major fate in all tissues is isomerisation to fructose 6-phosphate by phosphohexose isomerase, which carries it into glycolysis; hydrolysis back to free glucose is possible only in liver and kidney, which have glucose 6-phosphatase.

## explicit_objective
Name the metabolite common to glycolysis, glycogen synthesis and the pentose phosphate pathway, and state its major fate in the fed state.

## pitfalls
Choosing UDP-glucose because it is also a shared activated sugar. UDP-glucose leads only to glycogen and to the uronic acid pathway; it is not a glycolytic or a pentose phosphate intermediate. Glucose 1-phosphate has the same problem — it sits on the glycogen branch, one step off the crossroads.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## article_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## related_article_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE | ART-103-BIO-GLYCOGEN-METABOLISM

## related_concept_ids
CON-FND-853096A349FFBD | CON-FND-1FC7D932D7EFDC | CON-FND-B928DE79E08882

## resource_ids
src_300847a5fa64809d6c07

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
0.35

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p100 q62; p102 q78 | 103 BMS

## atomic_claim_ids
CLM-FND-G6P-BRANCH-POINT-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Glucose 6-phosphate is an important intermediate at the junction of several metabolic pathways (glycolysis, gluconeogenesis, the pentose phosphate pathway, glycogenesis, and glycogenolysis)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book names the five pathways at the junction but does not rank the fates of glucose 6-phosphate in the fed state. That glycolysis is the major fate follows from its statement that glycolysis is the main pathway for glucose oxidation in all cells, and is how the question book's key reads; the ranking itself is not printed.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "glucose 6-phosphate", "branch point", "glucose-6-phosphate" and "isomerase". No live record states the junction.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Insulin is the only hormone that lowers blood glucose; five anti-insulin hormones raise it, and vasopressin is not one of them

## id
CON-END-0B615572003514

## canonical_key
glucose.hormones.insulin-and-anti-insulin

## aliases
Hormonal regulation of blood glucose
Anti-insulin hormones
Insulin
Glucagon
Epinephrine
Cortisol
Growth hormone
Phosphodiesterase

## arabic_label
التنظيم الهرموني لسكر الدم

## arabic_aliases
الهرمونات المضادة للأنسولين
الجلوكاجون
الأنسولين كهرمون خافض وحيد

## definition
Insulin is the only hypoglycaemic hormone. Secreted by the pancreatic β-cells in response to hyperglycaemia, it increases glucose uptake through GLUT-4 in heart, skeletal muscle and adipose tissue, increases oxidation, glycogenesis and lipogenesis, and decreases hepatic glycogenolysis and gluconeogenesis; it works partly by activating phosphodiesterase, which degrades cAMP and so inactivates protein kinase A. Five hormones oppose it. Glucagon, from the α-cells, acts mainly on the liver and is secreted in fasting or hypoglycaemia, stimulating glycogenolysis and gluconeogenesis and inhibiting glycolysis and glycogenesis. Epinephrine acts on liver, muscle and adipose tissue. Cortisol drives protein catabolism and lipolysis and reduces peripheral glucose use. Growth hormone induces the liver aminotransferases. Thyroid hormones increase every aspect of carbohydrate metabolism.

## explicit_objective
Name the only hypoglycaemic hormone and the five anti-insulin hormones, and describe what insulin and glucagon each do to cAMP and to the liver.

## pitfalls
Assuming glucagon acts on muscle as well as liver because epinephrine does. Glucagon acts primarily on the liver; muscle has no glucagon receptor, so a rise in glucagon does not mobilise muscle glycogen at all.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-END-T07 | DIS-BIO-T03

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## article_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## related_article_ids
ART-103-BIO-GLYCOGEN-METABOLISM | ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## related_concept_ids
CON-FND-CA74978B7B7ED1 | CON-FND-7B3B4F0BEBF198 | CON-END-853A9833B36C99

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.9

## exam_weight_by_year
KAU_Y1=0.9

## clinical_relevance
0.85

## academic_relevance
0.95

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p99 q61; p100 q65; p101 q70, q71 and q72; p102 q79 | 103 BMS

## atomic_claim_ids
CLM-END-BLOOD-GLUCOSE-HORMONES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"1. Insulin (The Only Hypoglycemic Hormone) 2. Anti-insulin Hormones - Glucagon - Epinephrine - Cortisol - Growth hormone - Thyroid hormones"

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-END-3EA6071BAE8130 | CON-MSK-38F07C3ED8023F

## conflicts
[clear]

## uncertainty
The book states that muscle responds to epinephrine and that glucagon "affects liver cells mainly", but it never says that muscle lacks the glucagon receptor. That reason comes from the live concept CON-MSK-38F07C3ED8023F and is named as its source rather than asserted from this book. Vasopressin appears nowhere in the book's hormone list, which is the basis for saying it has no effect on serum glucose.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "insulin", "glucagon", "anti-insulin" and "blood glucose". Twelve insulin concepts exist, all of them endocrine records about secretion, structure, receptor signalling and resistance; none enumerates the hypoglycaemic and hyperglycaemic hormones as a set.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
rejectedMergeCandidateIds: CON-END-3EA6071BAE8130 is the insulin-to-anti-insulin ratio and its metabolic consequences; CON-MSK-38F07C3ED8023F is why muscle does not respond to glucagon. Neither is merged: the first is a ratio statement without the roster, and the second is one receptor fact. Both are cross-linked and both are better answers than this concept to the questions they were written for.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.

---

# Item

## label
Hypoglycaemia is adrenergic first and neuroglycopenic later, and in a treated diabetic the cause is usually the insulin

## id
CON-END-853A9833B36C99

## canonical_key
hypoglycaemia.causes.insulinoma-and-insulin-overdose

## aliases
Hypoglycaemia
Fasting hypoglycaemia
Reactive hypoglycaemia
Insulinoma
Insulin overdose
Symptoms of hypoglycaemia
Postprandial hypoglycaemia

## arabic_label
نقص سكر الدم

## arabic_aliases
ورم الخلايا الجزيرية المفرز للأنسولين
الجرعة الزائدة من الأنسولين
أعراض نقص السكر

## definition
Hypoglycaemia is a fall of blood glucose below the normal fasting level, and below 45 to 50 mg/dL it may be fatal. Mild hypoglycaemia gives hunger, tremors, drowsiness, sweating, an accelerated heart rate and tingling lips; as it deepens come difficulty concentrating, confusion and loss of consciousness. Measuring the blood glucose is the only evidence of it. Fasting hypoglycaemia, after six hours or more without food, is caused either by overutilisation of glucose — insulinoma, or an overdose of insulin or of a diabetes medication — or by impaired production, as in severe liver disease, chronic kidney disease, adrenal or pituitary hypofunction, or von Gierke's disease. Postprandial or reactive hypoglycaemia comes two to five hours after a meal and never during fasting. High insulin with a low glucose points to the insulin being the cause.

## explicit_objective
Recognise the symptoms of hypoglycaemia, separate fasting from postprandial causes, and interpret a high insulin with a low glucose.

## pitfalls
Reading tremor, palpitations and sweating in a diabetic patient as a sign that the sugar is too high. Those are the adrenergic symptoms of a sugar that is too low; the giveaway is that glucagon relieves them. A student who answers "hyperglycaemia" has not asked what glucagon would do.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-END-T07 | DIS-BIO-T07

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## article_ids
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## related_article_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## related_concept_ids
CON-END-0B615572003514 | CON-FND-1BE461A57AB76D | CON-FND-7B3B4F0BEBF198

## resource_ids
src_300847a5fa64809d6c07

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
0.95

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | p102 q80; p103 q81 | 103 BMS

## atomic_claim_ids
CLM-END-HYPOGLYCAEMIA-CAUSES-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"a) Insulinoma: A tumor in the pancreas which releases too much insulin. b) Medications: for example, overdose of insulin or diabetes medications."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives the symptom list and the cause list and no treatment beyond naming glucose estimation as the only evidence. Glucagon as emergency treatment appears in the question book's scenario and not in the department book, so no dose, route or protocol is asserted anywhere in this record and it is held at needs_evidence.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any microtopic in the overlay.
nanotopicId: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state for "hypoglyc", "insulinoma", "reactive hypoglycaemia" and "insulin overdose". "Insulinoma" returns nothing; the hypoglycaemia hits are an adrenaline indication and an Addisonian crisis, both from other subjects.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
relationships: Walked the 28 concepts in ../concept/103-BMS-biochemistry-concepts.md, the live concepts returned by find-existing.mjs for glycolysis, glycogen, gluconeogenesis, lactate and insulin, and the 35 minted beside this one. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of, mechanism_step_before and often_confused_with edges across carbohydrate metabolism are named here as owed.
