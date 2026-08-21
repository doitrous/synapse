<!--
  103 BMS · Biochemistry · the seven library articles that teach the thirty-six
  concepts minted for the carbohydrate metabolism, bioenergetics and citric acid
  cycle MCQs.

    ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS  → 4 concepts
    ART-103-BIO-RESPIRATORY-CHAIN                    → 4
    ART-103-BIO-CITRIC-ACID-CYCLE                    → 5
    ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE              → 8
    ART-103-BIO-GLYCOGEN-METABOLISM                  → 4
    ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE       → 5
    ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS            → 6

  WHY SEVEN AND NOT MORE. A question's library_ids must name an article whose
  related_concepts lists that question's main_concept, so every new concept needs
  a home. Seven is the number of book sections the 116 MCQs actually range over,
  and the build refuses to write this file unless every concept in
  ../concept/103-BMS-mcq-carbohydrate-concepts.md is listed by exactly the
  article it names in its own article_ids, in both directions.

  SEVEN OF THE 116 QUESTIONS ARE NOT SERVED BY THIS FILE, deliberately. They
  test concepts the 2025 exam lane already authored, and they name that lane's
  articles instead — ART-103-BIO-TCA-KEY-ENZYMES, ART-103-BIO-HMP-PATHWAY-AND-G6PD,
  ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT and ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE.
  Nothing here duplicates them; each is cross-referenced in related_articles.

  ALL PROSE IS FROM ONE BOOK: src_300847a5fa64809d6c07, Dpt book Biochemistry
  103.pdf, file pages 3 to 21 and 22 to 57. Nothing is asserted that the book does
  not say, and where the book is silent the article says so — in the text, in
  evidence_gaps, and on the concept. The department question book
  (src_07f0a0ff41addf826c7f) establishes what is examined and is never cited as
  evidence that something is true.

  THREE CONFLICTS ARE RECORDED RATHER THAN DECIDED: the cycle's ATP yield (9 in
  the book's diagram, 10 in its text), the glucose yield (32 here, 36-38 in older
  teaching), and AMP activation of glycogen phosphorylase b, which the question
  book's key requires and this book does not print.

  MEDIA. Fifteen assets are requested across the seven articles and none is
  supplied; this repository holds no medical images. Six are Priority: required,
  and each of those is a figure whose spatial content the prose can assert but not
  carry — the absence of a proton arrow at complex II, where a poison sits on the
  citric acid wheel, which transporter is on which tissue. No URL is invented
  anywhere, and `## media` is present and empty on every record with a
  field_notes reason: [clear] there would parse as a media block with no URL and
  be reported as one that would be dropped.

  Import: Admin › Bulk import → article. Articles land before concepts.
-->

# Item

## id
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## title
Bioenergetics: high-energy bonds, the ATP–ADP cycle, and making ATP without the chain

## arabic_title
الطاقة الحيوية: الروابط عالية الطاقة ودورة ATP-ADP

## aliases
High energy bonds
ATP-ADP cycle
Creatine phosphate
Substrate level phosphorylation
Anabolism and catabolism
Generation of high energy phosphate bonds

## subject
fnd

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic
Generation of High Energy Phosphate Bonds

## nanotopic


## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T03

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

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
Medical team, Admin team

## final_publisher
Admin team

## summary
Everything in bioenergetics hangs off one number. A bond that yields 7.3 kcal per mole or more on hydrolysis is called high energy, and that figure is exactly what each of ATP's two terminal pyrophosphate bonds releases — so ATP sets the standard by which every other bond is judged. From there the chapter is short: catabolism makes ATP, anabolism spends it, the cell holds only seconds of it and stores the surplus in muscle as creatine phosphate, and there are precisely three reactions in the whole of metabolism that make ATP without the respiratory chain.

## sections
### Definition
Bioenergetics is energy metabolism — its production, consumption and storage — in living systems. Cells need energy for mechanical work such as muscle contraction, electrical work such as the transmission of nerve impulses, chemical work such as building proteins, and osmotic work such as absorption, secretion and active transport. The fuel is ingested or stored carbohydrate, lipid and protein; vitamins and minerals are not sources of energy, though the process of generating it cannot run without them.

Metabolism divides into anabolism and catabolism. Anabolism builds large complex molecules from smaller precursors and consumes energy, and it accelerates during growth and the regeneration of cellular material. Catabolism breaks large molecules down into small ones with energy production, and it accelerates during fasting, physical or mental activity, and stress.

Catabolism runs in three stages, and the first of them is the one students forget. In stage 1 the macromolecules are degraded to monosaccharides, amino acids, glycerol and fatty acids by breaking low-energy bonds, and **no free energy is trapped as ATP at all**. In stage 2 those products are converted to acetyl-CoA, and reduced coenzymes and some ATP appear. In stage 3 acetyl-CoA is oxidised in the citric acid cycle. All the reduced coenzymes from stages 2 and 3 are then oxidised through the electron transport chain to give water and energy — energy that is partly captured as ATP and partly kept as body temperature.

### Mechanism
ATP is the product of catabolism and the fuel of anabolism, and it is what links the two. Its two terminal phosphate groups are joined to the rest of the molecule by high-energy pyrophosphate bonds, and on hydrolysis each of them releases 7.3 kcal per mole as free energy.

That figure is then used to sort every hydrolysable bond in the body into two classes. A **low-energy bond** liberates less than 7.3 kcal per mole, which is not enough to generate ATP; the book writes it with an ordinary dash and gives the phosphate ester, carboxyl ester, glycosidic and peptide bonds as its examples — glucose 6-phosphate is the worked case of a phosphate ester. A **high-energy bond** liberates 7.3 kcal per mole or more, is written with a curved double dash, and the examples are ATP, 2-phosphoenolpyruvate, creatine phosphate and S-adenosylmethionine.

Two things follow that are worth holding. The first is that carrying a phosphate does not make a compound high energy: glucose 6-phosphate and glycerol 3-phosphate are esters and sit on the low side of the line. The second is that AMP has no pyrophosphate bond left at all, so in a list of AMP, ADP, glycerol 3-phosphate and glucose 6-phosphate the high-energy compound is ADP.

The ATP–ADP cycle connects the energy-producing and energy-utilising sides of metabolism, and it turns over very fast, because the ATP present in any cell is enough to maintain its activity for only a few seconds. That is the reason **cells do not store energy as ATP**. In muscle the store is creatine phosphate: in energy-rich states creatine kinase transfers a phosphate from ATP to creatine, and in energy-poor states the same reversible reaction runs the other way, within two to seven seconds.

### Key determinants
High-energy phosphate bonds are generated in only two ways, and the whole of the rest of the bioenergetics chapter is the first of them. **A — the electron transport chain**, which is taught in its own article. **B — substrate level phosphorylation**, which is here.

Substrate level phosphorylation is the oxidation of a substrate to a product that carries a high-energy bond, whose energy is then used to phosphorylate ADP or GDP directly, without the respiratory chain. It occurs at three reactions in two pathways, and the list is short enough to learn outright:

In **glycolysis**, the high-energy phosphate bond of 1,3-bisphosphoglycerate is transferred to ADP by **phosphoglycerate kinase**, and the high-energy phosphate bond of 2-phosphoenolpyruvate is transferred to ADP by **pyruvate kinase**.

In the **citric acid cycle**, the high-energy thioester bond of succinyl-CoA is cleaved by **succinate thiokinase**, and that energy makes the ATP.

Two consequences make this more than a list. The first is that substrate level phosphorylation needs no oxygen, which is why a red cell — with no mitochondria at all — can still make ATP, and why anaerobic glycolysis still nets two ATP. The second is that succinate thiokinase is the *only* reaction inside the citric acid cycle that makes ATP this way; every other ATP the cycle is credited with comes later, when its NADH and FADH2 reach the chain.

### Clinical significance
The 7.3 kcal figure is where the exam usually starts, and it is worth knowing that the book states it as a standard value without naming the conditions it was measured under. Textbooks that print −7.3 kcal/mol are quoting the standard free-energy change; inside a living cell the value is larger. That distinction is not made in this course and is not asked.

The creatine phosphate system is the reason a sprinter can accelerate before any pathway has time to respond: the store is discharged in two to seven seconds, which is roughly the length of the effort it covers. Creatine kinase leaking from damaged muscle is also the enzyme measured after crush injury and in muscular dystrophy, though the department book does not take it there.

The three substrate-level reactions matter clinically because they are what survives when oxidative phosphorylation fails. In cyanide or carbon monoxide poisoning, which the book teaches as inhibition of complex IV, the chain stops and every ATP the cell can still make comes from these three reactions — which is why tissues that depend on oxidative phosphorylation, above all the brain and the heart, fail first.

## published_summary


## published_sections


## hold_these
A bond is high energy when hydrolysis releases 7.3 kcal/mole or more; below that it is low energy and cannot generate ATP.
The high-energy examples are ATP, 2-phosphoenolpyruvate, creatine phosphate and S-adenosylmethionine.
Cells do not store energy as ATP. Creatine phosphate is the major storage form in muscle, made and broken by creatine kinase.
Substrate level phosphorylation happens at exactly three reactions: phosphoglycerate kinase, pyruvate kinase, and succinate thiokinase.
Succinate thiokinase is the only reaction in the citric acid cycle that makes ATP at substrate level.
Stage 1 of catabolism traps no free energy as ATP.

## lose_the_mark
Answering ATP when the question asks for the storage form of high-energy phosphate.
Calling glucose 6-phosphate or glycerol 3-phosphate a high-energy compound because it carries a phosphate.
Naming isocitrate dehydrogenase or α-ketoglutarate dehydrogenase as the cycle's substrate-level step.
Choosing AMP over ADP as the high-energy compound.

## callout_evidence
### A bond is high energy when hydrolysis releases 7.3 kcal/mole or more; below that it is low energy and cannot generate ATP.
Claims: CLM-FND-HIGH-ENERGY-BONDS-01
Citations: CIT-KA-BIO103-HIGH-ENERGY-BONDS-01
Reviewed by: 
Reviewed at: 

### Cells do not store energy as ATP. Creatine phosphate is the major storage form in muscle, made and broken by creatine kinase.
Claims: CLM-FND-ATP-ADP-CYCLE-01
Citations: CIT-KA-BIO103-ATP-ADP-CYCLE-01
Reviewed by: 
Reviewed at: 

### Stage 1 of catabolism traps no free energy as ATP.
Claims: CLM-FND-ANABOLISM-CATABOLISM-01
Citations: CIT-KA-BIO103-ANABOLISM-CATABOLISM-01
Reviewed by: 
Reviewed at: 

### Substrate level phosphorylation happens at exactly three reactions: phosphoglycerate kinase, pyruvate kinase, and succinate thiokinase.
Claims: CLM-FND-SUBSTRATE-LEVEL-PHOSPHORYLATION-01
Citations: CIT-KA-BIO103-SUBSTRATE-LEVEL-PHOSPHORYLATION-01
Reviewed by: 
Reviewed at: 

## related_concepts
CON-FND-7228237A5897B5 | CON-FND-6B7241CD9F3C42 | CON-FND-9D5F6458F68D4B | CON-FND-5253967A0E3786

## related_articles
ART-103-BIO-RESPIRATORY-CHAIN: the other route to a high-energy phosphate bond, and where the reduced coenzymes made in stages 2 and 3 of catabolism are spent
ART-103-BIO-CITRIC-ACID-CYCLE: stage 3 of catabolism, and the home of the third substrate-level reaction
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE: the home of the other two substrate-level reactions

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-FND-HIGH-ENERGY-BONDS-01 | CLM-FND-ATP-ADP-CYCLE-01 | CLM-FND-ANABOLISM-CATABOLISM-01 | CLM-FND-SUBSTRATE-LEVEL-PHOSPHORYLATION-01

## span_ids
SPN-BIO103-HIGH-ENERGY-BONDS-01 | SPN-BIO103-ATP-ADP-CYCLE-01 | SPN-BIO103-ANABOLISM-CATABOLISM-01 | SPN-BIO103-SUBSTRATE-LEVEL-PHOSPHORYLATION-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## university_notes
kau: The Biochemistry department's own orientation for 2025-2026 cancels eleven items from the end-of-module and final exams, among them the whole Uronic Acid Pathway and Metabolic Integrations. Nothing taught in this article is on that cancelled list, and the department question book examines all of it.

## annotations
### definition_of · CON-FND-7228237A5897B5
Quote: A **high-energy bond** liberates 7.3 kcal per mole or more, is written with a curved double dash, and the examples are ATP, 2-phosphoenolpyruvate, creatine phosphate and S-adenosylmethionine.
Block: body

### definition_of · CON-FND-6B7241CD9F3C42
Quote: That is the reason **cells do not store energy as ATP**. In muscle the store is creatine phosphate: in energy-rich states creatine kinase transfers a phosphate from ATP to creatine, and in energy-poor states the same reversible reaction runs the other way, within two to seven seconds.
Block: body

### definition_of · CON-FND-9D5F6458F68D4B
Quote: Anabolism builds large complex molecules from smaller precursors and consumes energy, and it accelerates during growth and the regeneration of cellular material. Catabolism breaks large molecules down into small ones with energy production, and it accelerates during fasting, physical or mental activity, and stress.
Block: body

### definition_of · CON-FND-5253967A0E3786
Quote: Substrate level phosphorylation is the oxidation of a substrate to a product that carries a high-energy bond, whose energy is then used to phosphorylate ADP or GDP directly, without the respiratory chain.
Block: body

## media


## media_recommendations
### diagram · The ATP–ADP cycle with the creatine phosphate arm
Brief: The book's page 3 figure redrawn: ATP and ADP on a closed loop, with the energy-consuming arrow leaving ATP labelled muscle contraction, active transport, nerve impulses, anabolism and phosphorylation of compounds, and the energy-producing arrow into ADP labelled oxidative phosphorylation; a side loop through creatine and creatine phosphate marked CK in both directions and labelled "muscles"
Purpose: Teaches CON-FND-6B7241CD9F3C42. The reason creatine phosphate is a store and ATP is not is a statement about which loop is fast and which is a reservoir, and prose has to assert it where the figure shows it.
Priority: strongly helpful
Status: needed
Section: Mechanism
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### comparison table · The three substrate-level phosphorylation reactions
Brief: A three-row table: substrate carrying the high-energy bond, enzyme, product, pathway — 1,3-bisphosphoglycerate / phosphoglycerate kinase / 3-phosphoglycerate / glycolysis; 2-phosphoenolpyruvate / pyruvate kinase / enolpyruvate / glycolysis; succinyl-CoA / succinate thiokinase / succinate / citric acid cycle
Purpose: Teaches CON-FND-5253967A0E3786. The exam asks which enzyme, and a student who has read the three reactions as prose in two different chapters never sees them as one set of three.
Priority: strongly helpful
Status: needed
Section: Key determinants
Kind: comparison table
Source direction: original table built from the department book's own three reaction schemes
Rights: original work

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter I "Bioenergetics", file pages 3 to 5, 6 and 12.
The 391-item department question book (src_07f0a0ff41addf826c7f) establishes which of this material is examined and how, and is cited as curriculum signal only, never as evidence that a statement is medically true.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book states 7.3 kcal/mole as both the class boundary and the yield of an ATP terminal bond without naming the standard conditions the figure refers to.
It names creatine phosphate as the store "in muscles" and says nothing about any other tissue.
The clinical remarks about creatine kinase after muscle damage are not in this book and are not asserted as its teaching — they are flagged as context a reviewer may remove.

## conflicts
[clear]

## last_reviewed


## review_due


## notes
Written to carry the twenty-one Bioenergetics MCQs and the substrate-level phosphorylation item from the TCA chapter of the department question book. TPL-CONCEPT rather than TPL-CONDITION because the subject is a set of mechanisms, not a disease. The electron transport chain, which is section A of the same book chapter, is a separate article because it carries three times as much examined material.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T01 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
questionIds: The 116 MCQs that test this article are authored in ../question/103-BMS-MCQ-carbohydrate-bioenergetics.md and name this article in their library_ids. The back-reference is owed and is listed in the hand-off report; it is left empty rather than filled with IDs before that file is applied.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations; the department book’s own figures are faculty teaching material, cited by locator and not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-RESPIRATORY-CHAIN

## title
The respiratory chain: four complexes, a proton gradient, and what happens when they come uncoupled

## arabic_title
السلسلة التنفسية والفسفرة التأكسدية

## aliases
Electron transport chain
ETC
Oxidative phosphorylation
Chemiosmotic theory
Uncouplers
Respiratory control
P:O ratio
ATP synthase

## subject
fnd

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic
A- Electron Transport Chain (Respiratory Chain)

## nanotopic


## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T03

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

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
Medical team, Admin team

## final_publisher
Admin team

## summary
The respiratory chain is where almost all of the body's ATP is made, and it is examined as four separate questions: what the carriers are and in what order, which of them pump protons, how the gradient turns into ATP, and what happens when the two halves come apart. The through-line is that oxidation and phosphorylation are separate processes tied together by one thing — a proton gradient across a membrane that protons cannot cross. Everything the chapter teaches, from the P:O ratio to brown fat to why a working muscle burns faster than a resting one, follows from that single tether.

## sections
### Definition
The electron transport chain sits in the inner mitochondrial membrane. It is a series of hydrogen and electron carriers, and it catalyses the transfer of hydrogen atoms or electrons from the reduced coenzymes NADH+H⁺ and FADH2 to oxygen, forming water and ATP.

Before the components, one piece of vocabulary decides several exam questions. The molecule that **donates** its electrons is the **reducing agent**, and it is itself oxidised in the process; the molecule that accepts them is the oxidising agent, or oxidant. The language runs opposite to the intuition, and "which molecule donates its electrons?" is answered *reducing agent*, not *oxidant*.

Electrons move down the chain from carriers of low redox potential to carriers of high redox potential. Oxygen has the highest of all, which is why it sits at the end: at complex IV the electrons arriving from cytochrome c are handed to oxygen, which combines with two protons to form **water**. Water is the product at the end of the chain — not glucose, and not any sugar.

### Mechanism
The chain is built from four protein complexes, two mobile carriers, and a fifth complex that is not a carrier at all.

**Complex I, NADH dehydrogenase**, is a flavoprotein of NADH dehydrogenase bound to FMN and seven iron–sulphur clusters. It transfers two hydrogens from NADH to coenzyme Q, forming CoQH2.

**Complex II, succinate dehydrogenase**, is a flavoprotein bound to **FAD** and two iron–sulphur clusters. It transfers two hydrogens from FADH2 to coenzyme Q. This is the point students most often get wrong: NADH does *not* pass through complex II. NADH enters at complex I; complex II is the separate entry point used by FADH2, and the two routes converge at coenzyme Q.

**Complex III, cytochrome bc1**, is a haemoprotein of cytochrome b, cytochrome c1 and one iron–sulphur cluster. It transfers two **electrons** from CoQH2 to cytochrome c, and two protons are released from CoQH2 in the process. Note the change of currency: up to here the chain has been carrying hydrogen atoms, and from here it carries electrons. Cytochromes are electron acceptors, not hydrogen carriers.

**Complex IV, cytochrome c oxidase**, is a haemoprotein of cytochrome a, cytochrome a3 and two copper atoms, and it hands the electrons to oxygen.

**Coenzyme Q (ubiquinone)** and **cytochrome c** are the two mobile carriers, and the direction of traffic is fixed: coenzyme Q collects from complexes I and II and delivers to complex III; cytochrome c collects from complex III and delivers to complex IV.

**Complex V, ATP synthase**, has two subunits. F0 is embedded in the membrane and is a proton channel; F1 sits in the matrix and is the site of ATP synthesis. Four protons through F0 are needed to make one ATP from ADP and inorganic phosphate.

### Key determinants
By the **chemiosmotic theory**, the energy released as electrons travel down the chain is used to pump protons out of the matrix into the intermembrane space, which becomes electropositive. Three complexes are pumps and one is not: **complexes I, III and IV pump; complex II does not.** Complexes I and III translocate four protons each and complex IV translocates two.

The inner mitochondrial membrane is impermeable to protons, so the gradient persists. It is called the proton motive force, and its only route of discharge is back through the F0 channel of ATP synthase — which is what makes the ATP. Note what the theory does *not* say: nothing accumulates in the matrix, and no electron gradient is generated. Protons are pumped **out**, and the electropositive side is the intermembrane space.

The **P:O ratio** — ATP made per atom of oxygen consumed — falls straight out of that arithmetic. NADH gives its hydrogens at complex I, so ten protons are pumped and the ratio is 2.5. FADH2 gives its hydrogens directly to coenzyme Q and never passes complex I, so only six protons are pumped and the ratio is 1.5. The whole reason FADH2 is worth less than NADH is that it misses one pump.

**Respiratory control** is the other consequence of the tether. Once the electrochemical gradient is established it inhibits further electron transport unless the protons are discharged, and they can only be discharged through ATP synthase, which needs ADP — ADP is the activator of ATP synthase. So during work, ATP is consumed, ADP rises, ATP synthase is activated, protons flow back, the backpressure on the pumps falls, and oxidation speeds up. During rest, ADP falls, ATP synthase is inhibited, protons accumulate in the intermembrane space, backpressure rises and oxidation slows. The cellular condition that favours a fast chain is therefore a **high ADP concentration**.

### Clinical significance
**Uncouplers** dissociate oxidation in the respiratory chain from phosphorylation. They increase the permeability of the inner membrane to protons and so abolish the gradient: oxidation continues but no ATP is made, and the energy is released as heat.

Predicting what an uncoupler does is a favourite exam item, and the intuitive answer is wrong. Electron flow does not slow — with the backpressure gone it runs *faster*. ATP synthesis stops. Heat production rises. A student who assumes that "uncoupled" means everything stops answers all three the wrong way round.

The book gives two groups of examples. Thyroxine at high levels, intravenous calcium injection and aspirin overdose all uncouple, and their uncoupling explains the increased heat sensation that goes with those states. **Thermogenin**, the uncoupling protein, is found only in mammalian brown adipose tissue and is responsible for cold-induced non-shivering thermogenesis; brown fat is very rich in mitochondria and its inner membranes carry a great deal of thermogenin, which opens a proton channel that bypasses ATP synthase entirely so the energy leaves as heat.

The other clinical correlation in this chapter is poisoning of complex IV. Cyanide, carbon monoxide and hydrogen sulfide all inhibit cytochrome c oxidase and stop ATP production; carbon monoxide comes from vehicle exhaust and hydrogen sulfide from oil drilling and natural gas. Low exposures give dizziness, breathlessness, numbness and headache; high ones give convulsions, coma and death.

## published_summary


## published_sections


## hold_these
Four complexes, two mobile carriers — ubiquinone and cytochrome c — and complex V, ATP synthase.
NADH enters at complex I on FMN; FADH2 enters at complex II on FAD. Both deliver to coenzyme Q.
Cytochromes carry electrons, not hydrogen atoms.
Complexes I, III and IV pump protons. Complex II does not.
Protons are pumped out of the matrix; the intermembrane space is the electropositive side.
NADH gives a P:O ratio of 2.5 and FADH2 of 1.5, because FADH2 bypasses complex I.
Oxygen is the final electron acceptor and water is the product.
An uncoupler lets oxidation continue, stops ATP synthesis, and releases the energy as heat.
A high ADP concentration is what accelerates the chain, because ADP activates ATP synthase.

## lose_the_mark
Sending NADH through complex II.
Saying protons accumulate in the matrix, or that an electron gradient is generated.
Predicting that an uncoupler slows electron flow or reduces heat production.
Answering "oxidant" when asked which molecule donates its electrons.

## callout_evidence
### Four complexes, two mobile carriers — ubiquinone and cytochrome c — and complex V, ATP synthase.
Claims: CLM-FND-ETC-COMPONENTS-01
Citations: CIT-KA-BIO103-ETC-COMPONENTS-01
Reviewed by: 
Reviewed at: 

### Oxygen is the final electron acceptor and water is the product.
Claims: CLM-FND-REDOX-TERMINAL-ACCEPTOR-01
Citations: CIT-KA-BIO103-REDOX-TERMINAL-ACCEPTOR-01
Reviewed by: 
Reviewed at: 

### Complexes I, III and IV pump protons. Complex II does not.
Claims: CLM-FND-CHEMIOSMOSIS-01
Citations: CIT-KA-BIO103-CHEMIOSMOSIS-01
Reviewed by: 
Reviewed at: 

### An uncoupler lets oxidation continue, stops ATP synthesis, and releases the energy as heat.
Claims: CLM-FND-UNCOUPLERS-01
Citations: CIT-KA-BIO103-UNCOUPLERS-01
Reviewed by: 
Reviewed at: 

## related_concepts
CON-FND-8771AB893CA4C3 | CON-FND-A3BC299ED2C7C9 | CON-FND-0CA8047810DF78 | CON-FND-C3CB859E560A18

## related_articles
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS: the other route to a high-energy phosphate bond, and what the ATP made here is spent on
ART-103-BIO-CITRIC-ACID-CYCLE: where three of the four NADH and the one FADH2 per acetyl group come from, and the cycle enzyme that is also complex II
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE: superoxide is generated at this chain when oxygen is reduced by one electron instead of two

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-FND-ETC-COMPONENTS-01 | CLM-FND-REDOX-TERMINAL-ACCEPTOR-01 | CLM-FND-CHEMIOSMOSIS-01 | CLM-FND-UNCOUPLERS-01

## span_ids
SPN-BIO103-ETC-COMPONENTS-01 | SPN-BIO103-REDOX-TERMINAL-ACCEPTOR-01 | SPN-BIO103-CHEMIOSMOSIS-01 | SPN-BIO103-UNCOUPLERS-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Generation of High Energy Phosphate Bonds

## university_notes
kau: The Biochemistry department's own orientation for 2025-2026 cancels eleven items from the end-of-module and final exams, among them the whole Uronic Acid Pathway and Metabolic Integrations. Nothing taught in this article is on that cancelled list, and the department question book examines all of it.

## annotations
### definition_of · CON-FND-A3BC299ED2C7C9
Quote: NADH does *not* pass through complex II. NADH enters at complex I; complex II is the separate entry point used by FADH2, and the two routes converge at coenzyme Q.
Block: body

### definition_of · CON-FND-8771AB893CA4C3
Quote: The molecule that **donates** its electrons is the **reducing agent**, and it is itself oxidised in the process; the molecule that accepts them is the oxidising agent, or oxidant.
Block: body

### definition_of · CON-FND-0CA8047810DF78
Quote: Three complexes are pumps and one is not: **complexes I, III and IV pump; complex II does not.** Complexes I and III translocate four protons each and complex IV translocates two.
Block: body

### definition_of · CON-FND-C3CB859E560A18
Quote: Electron flow does not slow — with the backpressure gone it runs *faster*. ATP synthesis stops. Heat production rises.
Block: body

## media


## media_recommendations
### diagram · The respiratory chain with both entry routes and the three proton pumps
Brief: The book's page 6 figure redrawn as a single membrane cross-section: matrix below, intermembrane space above, complexes I to IV in the membrane with coenzyme Q and cytochrome c as mobile carriers between them, NADH entering at complex I and FADH2 at complex II, proton arrows out of complexes I, III and IV labelled 4H⁺, 4H⁺ and 2H⁺, no arrow at complex II, oxygen and water at complex IV, and ATP synthase with F0 in the membrane and F1 in the matrix carrying 4H⁺ back in
Purpose: Teaches CON-FND-A3BC299ED2C7C9 and CON-FND-0CA8047810DF78. Two of the commonest errors in this chapter — routing NADH through complex II, and thinking complex II pumps — are errors about position, and a student cannot correct a spatial error from a list of sentences. The absence of a proton arrow at complex II is the single most examinable thing on the figure.
Priority: required
Status: needed
Section: Mechanism
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### graph · Respiratory control: oxygen consumption against ADP availability
Brief: A two-state comparison, rest against work, showing ADP concentration, ATP synthase activity, proton backpressure and rate of oxidation moving together, following the two bullet lists the book prints for "During work" and "During rest"
Purpose: Teaches CON-FND-C3CB859E560A18. The chain of five consequences the book lists is a causal loop, and reading it as a list makes it look like five separate facts to memorise instead of one mechanism with an obvious direction.
Priority: strongly helpful
Status: needed
Section: Key determinants
Kind: flowchart
Source direction: original figure built from the department book's own two bullet lists
Rights: original work

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter I "Bioenergetics", file pages 6 to 11.
The 391-item department question book (src_07f0a0ff41addf826c7f) establishes which of this material is examined and how, and is cited as curriculum signal only, never as evidence that a statement is medically true.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book prints no table of standard redox potentials, so the ranking of NAD, FMN, FAD and oxygen is taken from the direction of electron flow it does state rather than from stated values.
It names thyroxine, intravenous calcium and aspirin overdose as uncouplers and gives a mechanism for none of the three. It does not name dinitrophenol at all, although the question book uses it as the type example.
The four-protons-per-ATP figure and the ten-protons-per-NADH figure are both stated, and the book never shows that they are consistent, nor mentions the extra proton spent importing inorganic phosphate.

## conflicts
[clear]

## last_reviewed


## review_due


## notes
Carries the majority of the twenty-one Bioenergetics MCQs in the department question book. Written as section A of the book's "Generation of High Energy Phosphate Bonds" chapter; section B, substrate level phosphorylation, is in ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS. The gas poisoning correlation is included because the book prints it as a boxed clinical correlation in this chapter, not because a question in this batch tests it.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T01 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
questionIds: The 116 MCQs that test this article are authored in ../question/103-BMS-MCQ-carbohydrate-bioenergetics.md and name this article in their library_ids. The back-reference is owed and is listed in the hand-off report; it is left empty rather than filled with IDs before that file is applied.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations; the department book’s own figures are faculty teaching material, cited by locator and not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-CITRIC-ACID-CYCLE

## title
The citric acid cycle: where it runs, what it yields, and what it hands out on the way

## arabic_title
دورة حمض الستريك (دورة كريبس)

## aliases
Citric acid cycle
Krebs cycle
TCA cycle
Tricarboxylic acid cycle
Amphibolic pathway
Succinate dehydrogenase
Fluoroacetate poisoning

## subject
fnd

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## microtopic
Steps, Importance and Regulation of the Citric Acid Cycle

## nanotopic


## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

## reading_time
9

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
The citric acid cycle is the final common pathway for the oxidation of carbohydrate, fat and protein, because all three converge on acetyl-CoA. Four things about it are examined again and again, and none of them is the list of eight steps: the one enzyme that is not in the matrix, the step that closes the cycle, the yield of a single turn, and the intermediates that leave to build something else. The fifth is the pair of poisons that stop it at named enzymes, which is how the exam tests whether a student knows the sequence or has only memorised the diagram.

## sections
### Definition
The citric acid cycle is a series of reactions responsible for the complete oxidation of the acetyl group of acetyl-CoA. It is the final common pathway for the oxidation of carbohydrates, lipids and proteins, because glucose, fatty acids and the carbon skeletons of all the amino acids are metabolised either to acetyl-CoA or to an intermediate of the cycle. During its reactions the coenzymes NAD⁺ and FAD are reduced, and they are then reoxidised by the respiratory chain with the formation of ATP.

The enzymes of the cycle are in the **mitochondrial matrix**, with one exception. **Succinate dehydrogenase** is tightly bound to the inner mitochondrial membrane, where it forms complex II of the respiratory chain. That single exception is examined more often than any other fact about the cycle, and it explains a second one: succinate dehydrogenase is also the only cycle enzyme whose coenzyme is FAD. The three dehydrogenase steps in the matrix — isocitrate dehydrogenase, the α-ketoglutarate dehydrogenase complex and malate dehydrogenase — all use NAD⁺, so the coenzyme that accepts hydrogen from malate is NAD⁺.

Note what the question is asking when it says "the only membrane-bound enzyme in the citric acid cycle". NADH dehydrogenase and ATP synthase are also in the inner membrane, but neither belongs to the cycle; the question is which *cycle* enzyme is also a chain component.

### Mechanism
The cycle opens when **citrate synthase** condenses the two-carbon acetyl group of acetyl-CoA with four-carbon **oxaloacetate** to give six-carbon citrate. **Aconitase**, which requires reduced glutathione and ferrous iron, converts citrate to isocitrate. **Isocitrate dehydrogenase** dehydrogenates and then decarboxylates isocitrate to five-carbon α-ketoglutarate, producing the first NADH+H⁺ and releasing the first CO2. The **α-ketoglutarate dehydrogenase complex** — which needs thiamine pyrophosphate, lipoate, CoASH, FAD and NAD⁺ — oxidatively decarboxylates α-ketoglutarate to succinyl-CoA, producing the second NADH+H⁺ and the second CO2.

**Succinate thiokinase** then cleaves the high-energy thioester bond of succinyl-CoA and uses that energy to make ATP; this is the only reaction in the cycle that generates ATP at substrate level. **Succinate dehydrogenase**, on the inner membrane, dehydrogenates succinate to fumarate with FAD becoming FADH2. **Fumarase** hydrates fumarate to malate. **Malate dehydrogenase** oxidises malate to oxaloacetate, producing the third NADH+H⁺ — and regenerating the oxaloacetate that a new acetyl-CoA will condense with to repeat the cycle.

That last step is what the phrase "the cyclic character of the Krebs cycle" actually means: **oxaloacetate is regenerated at every turn**. Citrate is not — it is consumed on the way round. And the cycle is not cyclic because its reactions are reversible; three of them are irreversible, and those three are precisely the regulated steps.

The yield of one turn is worth learning as a single line: **two CO2, three NADH, one FADH2, and one ATP**. Through the respiratory chain the three NADH give 7.5 ATP and the one FADH2 gives 1.5, so oxidation of one acetyl group through the cycle yields **ten ATP**.

### Key determinants
The cycle is called an **amphibolic** pathway because it participates in both catabolism and anabolism. That word is worth defining carefully, because two of the wrong answers offered against it — that all its reactions are reversible, and that it is present in every cell — are both simply false. Three of its steps are irreversible, and the red cell has no cycle at all, because it has no mitochondria.

Five intermediates leave the cycle for anabolic work, and each has a destination worth naming:

**Citrate** is exported to the cytosol and split by ATP-citrate lyase into oxaloacetate and acetyl-CoA, and that acetyl-CoA is the precursor for fatty acids and cholesterol. **α-Ketoglutarate** is transaminated to glutamate, which is how the cycle feeds amino acid synthesis. **Succinyl-CoA** is used for haem synthesis and for the oxidation of ketone bodies. **Malate** can be re-oxidised to oxaloacetate, or oxidatively decarboxylated to pyruvate by malic enzyme — one of the sources of NADPH. **Oxaloacetate** is transaminated by AST to aspartate, and in the cytosol is converted by PEPCK to 2-phosphoenolpyruvate, which is an important step in gluconeogenesis.

The CO2 the cycle produces is not simply waste either: it goes into the bicarbonate buffer system, into carboxylation reactions, and into the synthesis of purines, pyrimidines and urea.

Regulation sits on the three irreversible steps — citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase, which are the rate-controlling key enzymes. Oxaloacetate availability drives citrate synthase, and pyruvate carboxylase keeps oxaloacetate topped up under allosteric activation by acetyl-CoA. Succinyl-CoA feeds back on citrate synthase and α-ketoglutarate dehydrogenase. A high NADH/NAD⁺ ratio inhibits both dehydrogenases, which is why the cycle only runs aerobically. A high ATP/ADP ratio inhibits all three. And calcium released during muscle contraction activates all three, so that a contracting muscle gets its ATP.

### Clinical significance
Two poisons stop the cycle at named enzymes, and telling them apart is the point of the questions about them.

**Fluoroacetate** is a toxic compound used as a rodenticide. In the body it is converted to fluorocitrate, and fluorocitrate inhibits **aconitase** — one step past citrate, which is why citrate accumulates behind the block.

**Arsenic compounds** inhibit **α-ketoglutarate dehydrogenase**, by forming a stable complex with the thiol groups of lipoic acid and making the cofactor unavailable to the enzyme. The same mechanism blocks the pyruvate dehydrogenase complex and the branched-chain keto acid dehydrogenase, which is why arsenic poisoning is not confined to one pathway and why it raises lactate.

The confusion to guard against is with **fluoride**, which is a different poison in a different pathway: fluoride inhibits enolase, in glycolysis. A student who has learned "the fluor- one blocks the cycle" answers both the cycle question and the glycolysis question wrongly.

Finally, the cycle's absolute dependence on mitochondria has a clinical face. The red cell has none, so the citric acid cycle provides it with no energy at all — which is why a question that asks which tissue the cycle does not supply is answered *red blood cells*, and not brain, liver or muscle.

## published_summary


## published_sections


## hold_these
All cycle enzymes are in the matrix except succinate dehydrogenase, which is bound to the inner membrane and is complex II.
Succinate dehydrogenase is the only cycle enzyme using FAD; NAD⁺ accepts hydrogen from malate.
The cycle is cyclic because oxaloacetate is regenerated at every turn, not because its reactions are reversible.
One turn yields two CO2, three NADH, one FADH2 and one ATP — ten ATP in all.
Succinate thiokinase is the only substrate-level ATP in the cycle.
Amphibolic means the pathway serves catabolism and anabolism at once.
Succinyl-CoA goes to haem synthesis; α-ketoglutarate goes to glutamate and so to the amino acids.
Fluoroacetate inhibits aconitase; arsenic inhibits α-ketoglutarate dehydrogenase through lipoate.
The cycle gives the red cell no energy at all, because the red cell has no mitochondria.

## lose_the_mark
Naming NADH dehydrogenase or ATP synthase as the cycle's membrane-bound enzyme.
Explaining "amphibolic" as reversibility, or as presence in every cell.
Swapping fluoroacetate and arsenic, or confusing either with fluoride in glycolysis.
Answering three CO2 per turn instead of two.

## callout_evidence
### All cycle enzymes are in the matrix except succinate dehydrogenase, which is bound to the inner membrane and is complex II.
Claims: CLM-FND-TCA-SITE-01
Citations: CIT-KA-BIO103-TCA-SITE-01
Reviewed by: 
Reviewed at: 

### The cycle is cyclic because oxaloacetate is regenerated at every turn, not because its reactions are reversible.
Claims: CLM-FND-TCA-OXALOACETATE-01
Citations: CIT-KA-BIO103-TCA-OXALOACETATE-01
Reviewed by: 
Reviewed at: 

### One turn yields two CO2, three NADH, one FADH2 and one ATP — ten ATP in all.
Claims: CLM-FND-TCA-YIELD-01
Citations: CIT-KA-BIO103-TCA-YIELD-01
Reviewed by: 
Reviewed at: 

### Amphibolic means the pathway serves catabolism and anabolism at once.
Claims: CLM-FND-TCA-AMPHIBOLIC-01
Citations: CIT-KA-BIO103-TCA-AMPHIBOLIC-01
Reviewed by: 
Reviewed at: 

### Fluoroacetate inhibits aconitase; arsenic inhibits α-ketoglutarate dehydrogenase through lipoate.
Claims: CLM-FND-TCA-INHIBITORS-01
Citations: CIT-KA-BIO103-TCA-INHIBITORS-01
Reviewed by: 
Reviewed at: 

## related_concepts
CON-FND-BCCBDEC637795A | CON-FND-8F8B3EF0763399 | CON-FND-9420F608039B74 | CON-FND-8ADE222FBB57B2 | CON-FND-F9CE11670992CE

## related_articles
ART-103-BIO-TCA-KEY-ENZYMES: the three rate-controlling enzymes and what turns them, authored from the 2025 end-of-year paper
ART-103-BIO-RESPIRATORY-CHAIN: where the cycle's reduced coenzymes are spent, and where succinate dehydrogenase does its second job
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE: how acetyl-CoA arrives, and where oxaloacetate is topped up from

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-FND-TCA-SITE-01 | CLM-FND-TCA-OXALOACETATE-01 | CLM-FND-TCA-YIELD-01 | CLM-FND-TCA-AMPHIBOLIC-01 | CLM-FND-TCA-INHIBITORS-01

## span_ids
SPN-BIO103-TCA-SITE-01 | SPN-BIO103-TCA-OXALOACETATE-01 | SPN-BIO103-TCA-YIELD-01 | SPN-BIO103-TCA-AMPHIBOLIC-01 | SPN-BIO103-TCA-INHIBITORS-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## university_notes
kau: The Biochemistry department's own orientation for 2025-2026 cancels eleven items from the end-of-module and final exams, among them the whole Uronic Acid Pathway and Metabolic Integrations. Nothing taught in this article is on that cancelled list, and the department question book examines all of it.

## annotations
### definition_of · CON-FND-BCCBDEC637795A
Quote: **Succinate dehydrogenase** is tightly bound to the inner mitochondrial membrane, where it forms complex II of the respiratory chain.
Block: body

### definition_of · CON-FND-8F8B3EF0763399
Quote: That last step is what the phrase "the cyclic character of the Krebs cycle" actually means: **oxaloacetate is regenerated at every turn**.
Block: body

### definition_of · CON-FND-9420F608039B74
Quote: The yield of one turn is worth learning as a single line: **two CO2, three NADH, one FADH2, and one ATP**.
Block: body

### definition_of · CON-FND-8ADE222FBB57B2
Quote: The cycle is called an **amphibolic** pathway because it participates in both catabolism and anabolism.
Block: body

### definition_of · CON-FND-F9CE11670992CE
Quote: In the body it is converted to fluorocitrate, and fluorocitrate inhibits **aconitase** — one step past citrate, which is why citrate accumulates behind the block.
Block: body

## media


## media_recommendations
### diagram · The citric acid cycle with the two CO2, the four reduced coenzymes and the two poison blocks marked
Brief: The book's page 18 wheel redrawn: the eight intermediates round the circle with their enzymes, NADH marked at isocitrate dehydrogenase, α-ketoglutarate dehydrogenase and malate dehydrogenase, FADH2 at succinate dehydrogenase, ATP at succinate thiokinase, CO2 leaving at the two decarboxylations, and two red bars marking fluoroacetate at aconitase and arsenic at α-ketoglutarate dehydrogenase
Purpose: Teaches CON-FND-9420F608039B74 and CON-FND-F9CE11670992CE. Where a poison acts is a question about position on a circle, and a student who has read the two inhibitors as a paragraph at the end of the chapter cannot see that one of them is one step past citrate.
Priority: required
Status: needed
Section: Mechanism
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### diagram · Where the five intermediates go when they leave the cycle
Brief: The cycle as a simple ring with five arrows leaving it — citrate to fatty acids and cholesterol, α-ketoglutarate to glutamate and the amino acids, succinyl-CoA to haem and ketolysis, malate to pyruvate with NADPH, oxaloacetate to aspartate and to PEP for gluconeogenesis
Purpose: Teaches CON-FND-8ADE222FBB57B2. Amphibolic is an abstraction until the exits are visible; the exam asks which intermediate goes where, and the answer is a shape, not a list.
Priority: strongly helpful
Status: needed
Section: Key determinants
Kind: diagram
Source direction: original figure built from the department book's own numbered list of intermediates
Rights: original work

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter II "Tricarboxylic Acid Cycle (TCA)", file pages 16 to 21.
The 391-item department question book (src_07f0a0ff41addf826c7f) establishes which of this material is examined and how, and is cited as curriculum signal only, never as evidence that a statement is medically true.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book gives no dose, clinical picture or management for fluoroacetate or arsenic poisoning, and none is asserted here.
It routes α-ketoglutarate specifically to glutamate — the question book asks more loosely which intermediate is used "for the formation of amino acids", and the two are treated as the same statement.

## conflicts
The department book prints two totals for the cycle's ATP yield. Its cycle diagram on file page 18 marks "9 ATP" against the ETC arrow — the older accounting of 3 ATP per NADH and 2 per FADH2 — while its own summary text and its Importance section give ten, itemised as 7.5 + 1.5 + 1. The question book's printed key follows ten. Ten is taught here — the nine is recorded so a reviewer can see both and a student who spots the diagram is not left thinking they have misread it.

## last_reviewed


## review_due


## notes
Carries all fourteen TCA-chapter MCQs in the department question book, including the item recovered from the run-on option on file page 87. The three rate-controlling enzymes already have their own article and concept from the 2025 end-of-year paper and are summarised rather than re-taught here, with the cross-reference in related_articles.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
questionIds: The 116 MCQs that test this article are authored in ../question/103-BMS-MCQ-carbohydrate-bioenergetics.md and name this article in their library_ids. The back-reference is owed and is listed in the hand-off report; it is left empty rather than filled with IDs before that file is applied.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations; the department book’s own figures are faculty teaching material, cited by locator and not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## title
Glycolysis and the fates of pyruvate

## arabic_title
تحلل السكر ومصائر البيروفات

## aliases
Glycolysis
Hexokinase and glucokinase
PFK-1
Committed step of glycolysis
Energy yield of glucose
Pyruvate dehydrogenase
Pyruvate carboxylase
Lactate dehydrogenase
Pyruvate kinase deficiency

## subject
fnd

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## microtopic
Steps, Importance and Regulation of Glycolysis

## nanotopic


## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

## reading_time
12

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
Glycolysis is the main pathway for glucose oxidation, it runs in the cytosol of every cell, and it is the only pathway a red blood cell has. Most of what is examined about it comes down to four things: which enzyme catalyses which step, which three steps are irreversible and therefore regulated, exactly how much ATP comes out under each condition, and what happens to the pyruvate at the end. The fourth question is really three, because pyruvate has three fates — acetyl-CoA, oxaloacetate and lactate — and each of them is a separate exam item with a separate enzyme and a separate failure.

## sections
### Definition
Glycolysis is the main pathway for glucose oxidation, in which one molecule of glucose is converted either to two molecules of pyruvate in the presence of oxygen, or to two molecules of lactate in its absence. Every enzyme of the pathway is in the cytosol, and it proceeds in the cytosol of all cells.

It has two phases. **Phase I, energy utilisation**, spends two ATP. Hexokinase or glucokinase phosphorylates glucose to glucose 6-phosphate, trapping it inside the cell; phosphohexose isomerase converts that to fructose 6-phosphate; phosphofructokinase-1 spends the second ATP to make fructose 1,6-bisphosphate; and aldolase A cleaves fructose 1,6-bisphosphate into glyceraldehyde 3-phosphate and dihydroxyacetone phosphate, which phosphotriose isomerase interconverts.

**Phase II, energy production**, happens twice over, once per triose. Glyceraldehyde 3-phosphate dehydrogenase oxidises and phosphorylates its substrate using inorganic phosphate rather than ATP, generating NADH+H⁺. Phosphoglycerate kinase then makes ATP at substrate level. Phosphoglycerate mutase and enolase rearrange and dehydrate, and pyruvate kinase makes the second substrate-level ATP as phosphoenolpyruvate becomes enolpyruvate, which isomerises spontaneously to pyruvate.

Three of these reactions are irreversible — **glucokinase or hexokinase, PFK-1 and pyruvate kinase** — and those three are the key enzymes.

### Mechanism
**The first step has two enzymes, and the difference between them is the whole of hepatic glucose handling.** Hexokinase is in all tissue cells, has a low Km — a high affinity for glucose — with a low Vmax, and is allosterically inhibited by its own product, glucose 6-phosphate. That combination guarantees every tissue a supply of glucose 6-phosphate even when blood glucose is low. Glucokinase, also called hexokinase D, is only in liver and pancreatic β-cells, has a high Km — a *low* affinity — with a high Vmax, and is not inhibited by glucose 6-phosphate. It therefore only works when glucose is plentiful, which lets the liver mop up an excess after a meal and lets the β-cell respond to a high glucose by secreting insulin. Insulin induces glucokinase and glucagon represses it; neither hormone touches hexokinase.

**The committed step is PFK-1.** The book calls it the most important control site in the mammalian glycolytic pathway, and gives the reason: it is the first irreversible reaction *unique* to glycolysis. Nothing is committed at the hexokinase step, because glucose 6-phosphate can still leave for glycogen or the pentose phosphate pathway; once fructose 1,6-bisphosphate exists, the molecule is going down glycolysis. PFK-1 is inhibited allosterically by ATP, by citrate — a sign the citric acid cycle is saturated — and by low pH, which protects an anaerobically working muscle from its own lactic acid, and it is activated by AMP.

**The energy arithmetic is worth setting out once and then holding.** Two ATP are spent in phase I. Four are made at substrate level in phase II, two each by phosphoglycerate kinase and pyruvate kinase — so the substrate-level total is four and the net is two. Aerobically, the two NADH from glyceraldehyde 3-phosphate dehydrogenase are oxidised by the chain for five more, and the book gives the net gain of glycolysis alone as seven ATP per glucose. **Complete oxidation of one mole of glucose yields 32 moles of ATP aerobically and 2 anaerobically.**

Because phase II happens once per triose, half-molecule questions follow directly: one glyceraldehyde 3-phosphate to one pyruvate gives **2 ATP and 1 NADH**; one fructose 1,6-bisphosphate to two pyruvates gives **4 ATP and 2 NADH**, with nothing spent because both ATP were spent earlier.

### Key determinants
**Pyruvate has three fates, and each is a separate enzyme.**

*To acetyl-CoA.* Pyruvate is carried into the mitochondrion and oxidatively decarboxylated by the **pyruvate dehydrogenase complex**, which requires five coenzymes — thiamine pyrophosphate, lipoate, coenzyme A, FAD and NAD⁺. The reaction is **irreversible, and no enzyme can reverse it**, which is the single fact that makes fat unable to become glucose. PDH is inhibited by its products acetyl-CoA and NADH and by ATP, and activated by pyruvate, NAD⁺, CoA, ADP, insulin, and by calcium during exercise — which is why physical activity increases glucose utilisation in a diabetic regardless of insulin status.

*To oxaloacetate.* **Pyruvate carboxylase**, a mitochondrial enzyme, adds CO2 to pyruvate using ATP, biotin and magnesium. It is a carboxylation, not a decarboxylation and not an oxidation. Acetyl-CoA is its allosteric activator, which guarantees the citric acid cycle its oxaloacetate; anti-insulin hormones induce it and insulin represses it.

*To lactate.* Under anaerobic conditions **lactate dehydrogenase** reduces pyruvate to lactate using the NADH from the glyceraldehyde 3-phosphate dehydrogenase step. The purpose is not the lactate — it is the NAD⁺. Glyceraldehyde 3-phosphate dehydrogenase cannot work without NAD⁺, and with the chain stopped there is no other way to regenerate it. This is what lets glycolysis run in red cells, which have no mitochondria, and in muscle during severe prolonged exercise.

Two enzymes of the pathway have named inhibitors, and both are examined. **Glyceraldehyde 3-phosphate dehydrogenase** is inhibited by arsenic and by iodoacetate, which block the SH group in its active site. **Enolase** is inhibited irreversibly by **fluoride**, which binds the magnesium in its active site — which is exactly why sodium fluoride is added to a blood sample before glucose estimation. Oxalate, citrate and heparin are anticoagulants; none of them stops glycolysis, so none of them protects the sample.

Finally, three glycolytic intermediates have destinations of their own: glucose 6-phosphate is the junction of five pathways, dihydroxyacetone phosphate becomes glycerol 3-phosphate for triacylglycerol and phospholipid synthesis, and 3-phosphoglycerate can become serine.

### Clinical significance
The red cell is where glycolysis stops being an academic pathway. It has no mitochondria, so **glycolysis is its only source of ATP**, and both substrate-level steps have to work for there to be any net gain at all.

That is why **pyruvate kinase deficiency** produces a haemolytic anaemia. Pyruvate kinase makes two of the four ATP; without it the two spent by hexokinase and PFK-1 are never repaid and the **net yield falls from two to zero**. The cell cannot run its membrane pumps and it lyses. Two secondary consequences are examined alongside: the ADP-to-ATP ratio rises above normal, and **lactate is not made** — because lactate comes from pyruvate, and there is no pyruvate. Glucose, oxaloacetate and acetyl-CoA are not the missing products, because a red cell never made any of them.

**Pyruvate dehydrogenase fails in three ways, and all three raise lactate.** Congenital deficiency of the complex is the commonest cause of congenital lactic acidosis; pyruvate accumulates and is converted to lactate, and the condition is fatal and produces brain damage, because the brain depends on glucose and is particularly sensitive to acidosis. Thiamine deficiency does the same thing by removing TPP. Arsenic poisoning does it by tying up the thiol groups of lipoate, and because lipoate is shared it blocks α-ketoglutarate dehydrogenase and the branched-chain keto acid dehydrogenase too.

The trap in the anaerobic question is worth naming. When a question says that in anaerobic conditions pyruvate cannot be oxidised to acetyl-CoA, the blocked enzyme is **pyruvate dehydrogenase** — not lactate dehydrogenase, which is the enzyme that is working, and is precisely what disposes of the pyruvate instead.

## published_summary


## published_sections


## hold_these
Glycolysis is cytosolic and occurs in all cells; it gives pyruvate aerobically and lactate anaerobically.
Three irreversible steps: glucokinase or hexokinase, PFK-1, pyruvate kinase. PFK-1 is the committed step.
Hexokinase has a low Km and is inhibited by glucose 6-phosphate; glucokinase has a high Km, sits in liver and β-cells, and is induced by insulin.
Four ATP are made at substrate level and two are spent, so the net is two; aerobic total for complete oxidation is 32 and anaerobic is 2.
One glyceraldehyde 3-phosphate to one pyruvate gives 2 ATP and 1 NADH.
Lactate is made to regenerate NAD⁺, not to make ATP.
Pyruvate dehydrogenase is irreversible and needs TPP, lipoate, CoA, FAD and NAD⁺.
Pyruvate carboxylase is a carboxylation, needs biotin, and is activated by acetyl-CoA.
Fluoride inhibits enolase, which is why it goes in the glucose tube; arsenic inhibits glyceraldehyde 3-phosphate dehydrogenase.
Pyruvate kinase deficiency leaves a red cell with no net ATP and causes haemolytic anaemia.

## lose_the_mark
Reading a high Km as a high affinity.
Calling the hexokinase step the committed step.
Answering the net two when the question asks how many ATP are made by substrate level phosphorylation.
Naming lactate dehydrogenase as the blocked enzyme when pyruvate cannot become acetyl-CoA anaerobically.
Choosing an anticoagulant for the glucose sample tube instead of fluoride.

## callout_evidence
### Hexokinase has a low Km and is inhibited by glucose 6-phosphate; glucokinase has a high Km, sits in liver and β-cells, and is induced by insulin.
Claims: CLM-FND-HEXOKINASE-GLUCOKINASE-01
Citations: CIT-KA-BIO103-HEXOKINASE-GLUCOKINASE-01
Reviewed by: 
Reviewed at: 

### Three irreversible steps: glucokinase or hexokinase, PFK-1, pyruvate kinase. PFK-1 is the committed step.
Claims: CLM-FND-GLYCOLYSIS-COMMITTED-STEP-01
Citations: CIT-KA-BIO103-GLYCOLYSIS-COMMITTED-STEP-01
Reviewed by: 
Reviewed at: 

### Four ATP are made at substrate level and two are spent, so the net is two; aerobic total for complete oxidation is 32 and anaerobic is 2.
Claims: CLM-FND-GLYCOLYSIS-YIELD-01
Citations: CIT-KA-BIO103-GLYCOLYSIS-YIELD-01
Reviewed by: 
Reviewed at: 

### Fluoride inhibits enolase, which is why it goes in the glucose tube; arsenic inhibits glyceraldehyde 3-phosphate dehydrogenase.
Claims: CLM-FND-GLYCOLYSIS-INHIBITORS-01
Citations: CIT-KA-BIO103-GLYCOLYSIS-INHIBITORS-01
Reviewed by: 
Reviewed at: 

### Pyruvate kinase deficiency leaves a red cell with no net ATP and causes haemolytic anaemia.
Claims: CLM-HEM-PYRUVATE-KINASE-DEFICIENCY-01
Citations: CIT-KA-BIO103-PYRUVATE-KINASE-DEFICIENCY-01
Reviewed by: 
Reviewed at: 

### Lactate is made to regenerate NAD⁺, not to make ATP.
Claims: CLM-FND-ANAEROBIC-LACTATE-01
Citations: CIT-KA-BIO103-ANAEROBIC-LACTATE-01
Reviewed by: 
Reviewed at: 

### Pyruvate dehydrogenase is irreversible and needs TPP, lipoate, CoA, FAD and NAD⁺.
Claims: CLM-FND-PDH-COMPLEX-01
Citations: CIT-KA-BIO103-PDH-COMPLEX-01
Reviewed by: 
Reviewed at: 

### Pyruvate carboxylase is a carboxylation, needs biotin, and is activated by acetyl-CoA.
Claims: CLM-FND-PYRUVATE-CARBOXYLASE-01
Citations: CIT-KA-BIO103-PYRUVATE-CARBOXYLASE-01
Reviewed by: 
Reviewed at: 

## related_concepts
CON-FND-EA1BA37ACB643B | CON-FND-853096A349FFBD | CON-FND-0F4A45886203EF | CON-FND-0D6BFD870813B7 | CON-HEM-585B833F845F62 | CON-FND-403D06D1FB129F | CON-FND-229C78C9EB0E78 | CON-FND-CA0F9E019BC5BA

## related_articles
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT: the red cell's own version of this pathway, and the shunt that costs it an ATP
ART-103-BIO-CITRIC-ACID-CYCLE: where the acetyl-CoA goes, and where the second half of the 32 ATP is made
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE: the reverse of this pathway and the four enzymes that get round its three irreversible steps
ART-103-BIO-HMP-PATHWAY-AND-G6PD: the other route out of glucose 6-phosphate

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-FND-HEXOKINASE-GLUCOKINASE-01 | CLM-FND-GLYCOLYSIS-COMMITTED-STEP-01 | CLM-FND-GLYCOLYSIS-YIELD-01 | CLM-FND-GLYCOLYSIS-INHIBITORS-01 | CLM-HEM-PYRUVATE-KINASE-DEFICIENCY-01 | CLM-FND-ANAEROBIC-LACTATE-01 | CLM-FND-PDH-COMPLEX-01 | CLM-FND-PYRUVATE-CARBOXYLASE-01

## span_ids
SPN-BIO103-HEXOKINASE-GLUCOKINASE-01 | SPN-BIO103-GLYCOLYSIS-COMMITTED-STEP-01 | SPN-BIO103-GLYCOLYSIS-YIELD-01 | SPN-BIO103-GLYCOLYSIS-INHIBITORS-01 | SPN-BIO103-PYRUVATE-KINASE-DEFICIENCY-01 | SPN-BIO103-ANAEROBIC-LACTATE-01 | SPN-BIO103-PDH-COMPLEX-01 | SPN-BIO103-PYRUVATE-CARBOXYLASE-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## university_notes
kau: The Biochemistry department's own orientation for 2025-2026 cancels eleven items from the end-of-module and final exams, among them the whole Uronic Acid Pathway and Metabolic Integrations. Nothing taught in this article is on that cancelled list, and the department question book examines all of it.

## annotations
### definition_of · CON-FND-EA1BA37ACB643B
Quote: Glucokinase, also called hexokinase D, is only in liver and pancreatic β-cells, has a high Km — a *low* affinity — with a high Vmax, and is not inhibited by glucose 6-phosphate.
Block: body

### definition_of · CON-FND-853096A349FFBD
Quote: Nothing is committed at the hexokinase step, because glucose 6-phosphate can still leave for glycogen or the pentose phosphate pathway; once fructose 1,6-bisphosphate exists, the molecule is going down glycolysis.
Block: body

### definition_of · CON-FND-0F4A45886203EF
Quote: **Complete oxidation of one mole of glucose yields 32 moles of ATP aerobically and 2 anaerobically.**
Block: body

### definition_of · CON-FND-0D6BFD870813B7
Quote: **Enolase** is inhibited irreversibly by **fluoride**, which binds the magnesium in its active site — which is exactly why sodium fluoride is added to a blood sample before glucose estimation.
Block: body

### definition_of · CON-HEM-585B833F845F62
Quote: Pyruvate kinase makes two of the four ATP; without it the two spent by hexokinase and PFK-1 are never repaid and the **net yield falls from two to zero**.
Block: body

### definition_of · CON-FND-403D06D1FB129F
Quote: The purpose is not the lactate — it is the NAD⁺. Glyceraldehyde 3-phosphate dehydrogenase cannot work without NAD⁺, and with the chain stopped there is no other way to regenerate it.
Block: body

### definition_of · CON-FND-229C78C9EB0E78
Quote: The reaction is **irreversible, and no enzyme can reverse it**, which is the single fact that makes fat unable to become glucose.
Block: body

### definition_of · CON-FND-CA0F9E019BC5BA
Quote: It is a carboxylation, not a decarboxylation and not an oxidation.
Block: body

## media


## media_recommendations
### diagram · The ten steps of glycolysis with the three irreversible reactions marked
Brief: The book's page 27 scheme redrawn: glucose to pyruvate with every enzyme named, ATP spent at glucokinase and PFK-1 and made at phosphoglycerate kinase and pyruvate kinase, NAD⁺ and NADH marked at glyceraldehyde 3-phosphate dehydrogenase, the anaerobic branch to lactate at the foot, and heavy one-way arrows on the three irreversible steps
Purpose: Teaches CON-FND-853096A349FFBD and CON-FND-0F4A45886203EF. Which step is irreversible and where each ATP enters or leaves are questions about position in a sequence; a student reading the ten steps as prose cannot see that the two ATP are spent before the split and the four are made after it, which is the whole of the yield arithmetic.
Priority: required
Status: needed
Section: Definition
Kind: flowchart
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### diagram · The three fates of pyruvate on one figure
Brief: The book's page 36 figure redrawn: pyruvate at the centre with three arrows — to lactate by lactate dehydrogenase with NADH and NAD⁺, to oxaloacetate by pyruvate carboxylase with biotin, Mg²⁺, ATP and CO2, and to active acetate by pyruvate dehydrogenase with TPP, lipoate and FAD, releasing CO2 and NADH — plus the transamination arrow to alanine
Purpose: Teaches CON-FND-229C78C9EB0E78, CON-FND-CA0F9E019BC5BA and CON-FND-403D06D1FB129F. The exam repeatedly asks which enzyme acts on pyruvate in a given condition, and a student who has met the three enzymes in three different sections never sees that they are competing for one substrate.
Priority: required
Status: needed
Section: Key determinants
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### comparison table · Hexokinase against glucokinase
Brief: The book's page 30 table reproduced as a clean comparison: site, substrate, Km and Vmax, effect of glucose 6-phosphate, effect of insulin and glucagon, effect of fasting and of glucose feeding
Purpose: Teaches CON-FND-EA1BA37ACB643B. Six paired facts are what the exam draws its distractors from, and a paired table is the only form in which a student can see that every row runs in opposite directions.
Priority: strongly helpful
Status: needed
Section: Mechanism
Kind: comparison table
Source direction: original table built from the department book's own comparison table
Rights: original work

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter III "Carbohydrate Metabolism", the Glycolysis and pyruvate sections, file pages 25 to 36.
The 391-item department question book (src_07f0a0ff41addf826c7f) establishes which of this material is examined and how, and is cited as curriculum signal only, never as evidence that a statement is medically true.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
Pyruvate kinase deficiency is not named as a disease anywhere in this book. What is asserted is the arithmetic consequence that follows from the book's own ATP accounting and its statement that the red cell has no other source — no inheritance pattern, prevalence or treatment is claimed.
The book does not distinguish arsenate from arsenite at the glyceraldehyde 3-phosphate dehydrogenase step, and neither does the question book.
The question book sets a thiamine-deficient patient with heart disease — this book covers beriberi in its vitamins chapter and does not connect the cardiac failure to pyruvate dehydrogenase.

## conflicts
Older textbooks and older teaching give 36 to 38 ATP per glucose, using 3 ATP per NADH and 2 per FADH2. The department book uses 2.5 and 1.5 and totals 32, and the question book's key follows the book. Thirty-two is taught here — the older figure is recorded so a student who meets it elsewhere knows why it differs.

## last_reviewed


## review_due


## notes
The largest article in this batch: it carries roughly a third of the 81 carbohydrate-chapter MCQs in the department question book. Glycolysis and the fates of pyruvate are kept in one article rather than two because the exam crosses between them constantly — the anaerobic question is a pyruvate dehydrogenase question, and the pyruvate kinase questions are red-cell energy questions.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
questionIds: The 116 MCQs that test this article are authored in ../question/103-BMS-MCQ-carbohydrate-bioenergetics.md and name this article in their library_ids. The back-reference is owed and is listed in the hand-off report; it is left empty rather than filled with IDs before that file is applied.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations; the department book’s own figures are faculty teaching material, cited by locator and not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-GLYCOGEN-METABOLISM

## title
Glycogen metabolism: one cascade, two directions, and the disease that proves the point

## arabic_title
أيض الجليكوجين

## aliases
Glycogenesis
Glycogenolysis
Glycogen synthase
Glycogen phosphorylase
UDP-glucose
Von Gierke disease
Glycogen storage disease
McArdle syndrome

## subject
fnd

## topic
Carbohydrate metabolism

## subtopic
Glycogen Metabolism

## microtopic
Glycogenesis, Glycogenolysis and Glycogen Storage Diseases

## nanotopic


## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

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
Medical team, Admin team

## final_publisher
Admin team

## summary
Glycogen metabolism is two pathways that must never run at once, and the exam is almost entirely about the machinery that stops them. One cAMP cascade phosphorylates both key enzymes and, because phosphorylation activates one and inactivates the other, a single hormone switches the whole system. The second theme is the difference between liver and muscle, which comes down to one enzyme that muscle does not have — and the disease that removes it from the liver as well produces four apparently unrelated abnormalities, all of them derivable from that one block.

## sections
### Definition
Glycogen is a highly branched polymer of α-D-glucose, with α1,4-glucosidic linkages along the branches and α1,6 linkages at the branch points; the branches carry thirteen to fourteen residues. It is the main storage form of carbohydrate in animals, and it is found mainly in liver — 8 to 10% of its wet weight — and in muscle, at 2%. Because muscle is so much larger, its total glycogen store is three to four times the liver's.

The two stores do different jobs. **Liver glycogen maintains blood glucose between meals**, and after 12 to 18 hours of fasting it is almost totally depleted. **Muscle glycogen does not directly maintain blood glucose, because muscle lacks glucose 6-phosphatase**; it can supply a limited amount indirectly through the Cori cycle, and its real job is to supply the contracting muscle itself.

**Glycogenesis** is the synthesis of glycogen from glucose, in the cytosol of liver and muscle. **Glycogenolysis** is the breakdown of glycogen into glucose or glucose 1-phosphate, in the same compartment.

### Mechanism
**Glycogenesis begins by activating the sugar, and that is where the exam question is.** Glucose is phosphorylated to glucose 6-phosphate by glucokinase or hexokinase, spending an ATP. A mutase converts that to glucose 1-phosphate. Then UDP-glucose pyrophosphorylase condenses glucose 1-phosphate with **UTP** to make **UDP-glucose**, which is the immediate precursor for glycogen synthesis. The nucleotide the question is asking about is UTP, not the ATP spent two steps earlier.

Chain elongation is then done by **glycogen synthase**, the key enzyme, which transfers glucosyl units from UDP-glucose onto a glycogen primer in α1,4 linkage, elongating each branch to at least eleven residues. The **branching enzyme** transfers segments of six to eight residues to the nearest chain, making a new α1,6 branch point, and glycogen synthase then elongates the new branches.

**Glycogenolysis is not the reverse of that.** **Glycogen phosphorylase** cleaves the α1,4 linkages phosphorolytically, releasing **glucose 1-phosphate**, and stops about four residues from each branch point. The **debranching enzyme** then does two jobs: its glucosyl transferase activity moves the outer three residues to the nearest chain, and its glucosidase activity hydrolyses the single remaining residue at the branch point, releasing one **free glucose**. Because only that one residue per branch point comes off free, **the major product of glycogen breakdown is glucose 1-phosphate**, and there is more glucose 1-phosphate than glucose.

Phosphoglucomutase then converts glucose 1-phosphate to glucose 6-phosphate, and there the two tissues part company. In **liver**, glucose 6-phosphatase dephosphorylates it and free glucose goes to the blood. In **muscle**, which has no glucose 6-phosphatase, it can only enter glycolysis and supply the contracting fibre. That one missing enzyme is the whole reason muscle glycogen cannot raise blood glucose — muscle has the phosphorylase and the debranching enzyme perfectly well.

One consequence is worth the arithmetic: because a glucosyl unit from glycogen arrives as glucose 1-phosphate and needs no hexokinase ATP, complete oxidation of a glucose taken from muscle glycogen yields **33 ATP** rather than 32.

### Key determinants
The two key enzymes are regulated in exactly opposite senses by exactly the same modification, and this is the elegant part of the chapter.

**Glycogen synthase** is active when **dephosphorylated** and inactive when phosphorylated. **Glycogen phosphorylase** is inactive when dephosphorylated and active when **phosphorylated**. So one kinase, acting once, turns synthesis off and breakdown on.

The cascade runs like this. Glucagon in liver, and epinephrine in liver and muscle, raise **cAMP**, which activates **protein kinase A**. Protein kinase A phosphorylates glycogen synthase directly, inactivating it — and phosphorylates **phosphorylase kinase**, activating it. Phosphorylase kinase then phosphorylates **glycogen phosphorylase**, activating that. Note the extra step: protein kinase A does *not* phosphorylate glycogen phosphorylase itself, and "which enzyme is responsible for direct covalent modification of glycogen phosphorylase" is answered *phosphorylase kinase*.

Insulin reverses the whole arrangement twice over. It activates **phosphodiesterase**, which degrades cAMP and so prevents activation of protein kinase A, and it activates **protein phosphatase-1**, which dephosphorylates both enzymes — activating the synthase and inactivating the phosphorylase. A large glucose load therefore enhances glycogen synthase activity in the liver.

On top of the covalent layer sit allosteric controls. **Glucose 6-phosphate** activates glycogen synthase and inhibits glycogen phosphorylase, so a cell with plenty of it stores rather than mobilises. **ATP** inhibits the phosphorylase in both tissues. And in contracting muscle, a rise in **intracellular calcium** activates the inactive phosphorylase kinase *without any phosphorylation at all* — a route that bypasses the hormones entirely and supplies the working fibre.

The book states that a high blood glucose is a negative signal for glycogen breakdown, and that cyclic AMP, epinephrine and calcium are all positive ones.

### Clinical significance
The glycogen storage diseases are inherited disorders in which a mutation in one enzyme of glycogenesis or glycogenolysis leads to deposition of large amounts, or abnormal forms, of glycogen — mainly in liver and skeletal muscle. More than twelve forms exist. Two are named in this course.

**Von Gierke's disease, type I**, is a defect in **glucose 6-phosphatase** in the liver, and it is worth deriving rather than memorising, because all four of its features come out of one block. Both glycogenolysis and gluconeogenesis end in glucose 6-phosphate, so with the phosphatase gone neither can release glucose: hence **fasting hypoglycaemia**, and an enlarged liver. The glucose 6-phosphate that accumulates goes down glycolysis to lactate: hence **lactic acidosis**. Some of it goes through the pentose phosphate pathway to excess purine synthesis, and the purines are degraded to urate — while the lactate competes with urate for renal excretion: hence **hyperuricaemia**, doubly. And the severe hypoglycaemia drives epinephrine, epinephrine drives lipolysis, and the fatty acids reaching the liver are esterified: hence **hyperlipidaemia** and a fatty liver. The book's only management statement is that patients should eat frequently during the day, especially carbohydrate-containing food.

That derivation is also how the diagnosis is made in an exam vignette. An infant with hypoglycaemia and hepatomegaly could have a liver phosphorylase defect; it is the raised **lactate and urate** that point specifically at the phosphatase, because a phosphorylase defect never makes the glucose 6-phosphate in the first place.

**McArdle's syndrome, type V**, is a deficiency of **muscle phosphorylase**. The patient cannot tolerate exercise — painful cramps, weakness and early fatigue — the muscles have an abnormally high glycogen content, and there is little or no rise in blood lactate after exercise, because the glycogen cannot be mobilised to supply glucose 6-phosphate for glycolysis.

## published_summary


## published_sections


## hold_these
UDP-glucose is the immediate precursor for glycogen synthesis, and making it costs a UTP.
The major product of glycogenolysis is glucose 1-phosphate; only the branch-point residue comes off as free glucose.
Muscle lacks glucose 6-phosphatase, which is why muscle glycogen cannot raise blood glucose.
Glycogen synthase is active dephosphorylated; glycogen phosphorylase is active phosphorylated.
Protein kinase A phosphorylates phosphorylase kinase, and phosphorylase kinase phosphorylates glycogen phosphorylase.
Insulin acts through phosphodiesterase and protein phosphatase-1; a high blood glucose is a negative signal for breakdown.
Calcium activates phosphorylase kinase in contracting muscle without phosphorylation.
Von Gierke's disease is glucose 6-phosphatase deficiency, with hypoglycaemia, lactic acidosis, hyperlipidaemia and hyperuricaemia.
A glucose taken from muscle glycogen yields 33 ATP, one more than a free glucose.

## lose_the_mark
Answering ATP when the question asks what activates glucose for glycogen synthesis.
Naming protein kinase A as the enzyme that directly phosphorylates glycogen phosphorylase.
Naming phosphorylase or the debranching enzyme as the enzyme muscle lacks.
Choosing a phosphorylase defect for an infant with hypoglycaemia, lactic acidosis and hyperuricaemia.

## callout_evidence
### UDP-glucose is the immediate precursor for glycogen synthesis, and making it costs a UTP.
Claims: CLM-FND-GLYCOGENESIS-UDP-GLUCOSE-01
Citations: CIT-KA-BIO103-GLYCOGENESIS-UDP-GLUCOSE-01
Reviewed by: 
Reviewed at: 

### Muscle lacks glucose 6-phosphatase, which is why muscle glycogen cannot raise blood glucose.
Claims: CLM-FND-GLYCOGENOLYSIS-PRODUCT-01
Citations: CIT-KA-BIO103-GLYCOGENOLYSIS-PRODUCT-01
Reviewed by: 
Reviewed at: 

### Protein kinase A phosphorylates phosphorylase kinase, and phosphorylase kinase phosphorylates glycogen phosphorylase.
Claims: CLM-FND-GLYCOGEN-REGULATION-01
Citations: CIT-KA-BIO103-GLYCOGEN-REGULATION-01
Reviewed by: 
Reviewed at: 

### Von Gierke's disease is glucose 6-phosphatase deficiency, with hypoglycaemia, lactic acidosis, hyperlipidaemia and hyperuricaemia.
Claims: CLM-FND-VON-GIERKE-01
Citations: CIT-KA-BIO103-VON-GIERKE-01
Reviewed by: 
Reviewed at: 

## related_concepts
CON-FND-1FC7D932D7EFDC | CON-FND-3905E3B98C2EC4 | CON-FND-CA74978B7B7ED1 | CON-FND-1BE461A57AB76D

## related_articles
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE: where muscle glucose 6-phosphate has to go, and the source of the 32 ATP this article adds one to
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS: the hormones this cascade is driven by, and why the liver is the organ of glucose homeostasis
ART-103-BIO-GOUT-AND-HYPERURICAEMIA: the mechanism behind von Gierke's hyperuricaemia, including lactate competing with urate for renal excretion

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-FND-GLYCOGENESIS-UDP-GLUCOSE-01 | CLM-FND-GLYCOGENOLYSIS-PRODUCT-01 | CLM-FND-GLYCOGEN-REGULATION-01 | CLM-FND-VON-GIERKE-01

## span_ids
SPN-BIO103-GLYCOGENESIS-UDP-GLUCOSE-01 | SPN-BIO103-GLYCOGENOLYSIS-PRODUCT-01 | SPN-BIO103-GLYCOGEN-REGULATION-01 | SPN-BIO103-VON-GIERKE-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Metabolism

## university_notes
kau: The Biochemistry department's own orientation for 2025-2026 cancels eleven items from the end-of-module and final exams, among them the whole Uronic Acid Pathway and Metabolic Integrations. Nothing taught in this article is on that cancelled list, and the department question book examines all of it.

## annotations
### definition_of · CON-FND-1FC7D932D7EFDC
Quote: Then UDP-glucose pyrophosphorylase condenses glucose 1-phosphate with **UTP** to make **UDP-glucose**, which is the immediate precursor for glycogen synthesis.
Block: body

### definition_of · CON-FND-3905E3B98C2EC4
Quote: That one missing enzyme is the whole reason muscle glycogen cannot raise blood glucose — muscle has the phosphorylase and the debranching enzyme perfectly well.
Block: body

### definition_of · CON-FND-CA74978B7B7ED1
Quote: Note the extra step: protein kinase A does *not* phosphorylate glycogen phosphorylase itself, and "which enzyme is responsible for direct covalent modification of glycogen phosphorylase" is answered *phosphorylase kinase*.
Block: body

### definition_of · CON-FND-1BE461A57AB76D
Quote: Both glycogenolysis and gluconeogenesis end in glucose 6-phosphate, so with the phosphatase gone neither can release glucose: hence **fasting hypoglycaemia**, and an enlarged liver.
Block: body

## media


## media_recommendations
### diagram · The cAMP cascade with both key enzymes on one figure
Brief: The book's page 45 figure redrawn: glucagon and epinephrine raising cAMP and insulin lowering it, cAMP-dependent protein kinase A in the middle, arrows to phosphorylase kinase (inactive to active) and on to glycogen phosphorylase (inactive to active), a parallel arrow to glycogen synthase (active to inactive), protein phosphatase-1 returning both, and the allosteric inputs marked — Ca²⁺ on phosphorylase kinase in muscle, ATP and glucose 6-phosphate on the phosphorylase, glucose 6-phosphate on the synthase
Purpose: Teaches CON-FND-CA74978B7B7ED1. The reciprocity is the concept, and it only becomes visible when both enzymes are on the same page with the same phosphate moving in opposite senses. Prose has to describe the two halves in sequence, which is exactly what makes students think there are two cascades.
Priority: required
Status: needed
Section: Key determinants
Kind: flowchart
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### flowchart · Von Gierke's disease derived from one block
Brief: Glucose 6-phosphatase crossed out at the centre, with four consequence chains leading away — no free glucose to fasting hypoglycaemia; accumulated glucose 6-phosphate to glycolysis to lactic acidosis; glucose 6-phosphate to the pentose phosphate pathway to purine synthesis to hyperuricaemia, with a second arrow from lactate competing for renal excretion; hypoglycaemia to epinephrine to lipolysis to hepatic triacylglycerol to hyperlipidaemia
Purpose: Teaches CON-FND-1BE461A57AB76D. The four features look unrelated when listed and are one mechanism when drawn, and a student who can draw it can reconstruct the picture in an exam instead of recalling four words.
Priority: strongly helpful
Status: needed
Section: Clinical significance
Kind: flowchart
Source direction: original figure built from the department book's own four biochemical bases
Rights: original work

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter III "Carbohydrate Metabolism", the Glycogen Metabolism section, file pages 41 to 46.
The 391-item department question book (src_07f0a0ff41addf826c7f) establishes which of this material is examined and how, and is cited as curriculum signal only, never as evidence that a statement is medically true.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book gives no ratio of glucose to glucose 1-phosphate in the products of glycogenolysis — "mostly" is as far as it goes and as far as this article goes.
The 33-ATP figure for a glucosyl unit of muscle glycogen is not printed in the book. It follows from the book's own statement that glycogenolysis yields glucose 1-phosphate, which phosphoglucomutase converts without spending ATP, and it is what the question book's key requires.
The book calls von Gierke's disease "one of the most common glycogen storage diseases worldwide" and gives no figure — none is supplied.

## conflicts
The question book's key requires AMP to be an allosteric activator of glycogen phosphorylase b, and the department book does not print that anywhere — it lists only ATP and glucose 6-phosphate as allosteric effectors of the phosphorylase, and calcium as the muscle override. The live concept CON-MSK-10DF05A8B81781 does assert AMP activation. The item is written to the question book's key and flagged for a faculty reviewer.

## last_reviewed


## review_due


## notes
Carries the glycogen block of the department question book — roughly a dozen items, of which half are about the cascade. McArdle's syndrome is included because the book teaches it beside von Gierke's, not because a question in this batch tests it; it is the contrast that makes the tissue difference concrete.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
questionIds: The 116 MCQs that test this article are authored in ../question/103-BMS-MCQ-carbohydrate-bioenergetics.md and name this article in their library_ids. The back-reference is owed and is listed in the hand-off report; it is left empty rather than filled with IDs before that file is applied.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations; the department book’s own figures are faculty teaching material, cited by locator and not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE

## title
Gluconeogenesis: four enzymes round three blocks, and the two cycles that feed it

## arabic_title
استحداث السكر ودورتا كوري والألانين

## aliases
Gluconeogenesis
Cori cycle
Glucose-alanine cycle
Gluconeogenic substrates
PEPCK
Pyruvate carboxylase
Reciprocal regulation
Dicarboxylic acid shuttle

## subject
fnd

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## microtopic
Gluconeogenic Substrates, Importance and Regulation

## nanotopic


## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T01 | SYS-FND-T06

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

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
Medical team, Admin team

## final_publisher
Admin team

## summary
Gluconeogenesis is mostly glycolysis run backwards, which is why the examinable part of it is the exceptions. Three glycolytic steps are irreversible, and getting round them takes four enzymes — not three, because the pyruvate kinase block needs two, and those two sit in different compartments. The second half of the chapter is about where the carbon comes from: lactate from muscle and red cells through the Cori cycle, nitrogen-carrying alanine through the glucose–alanine cycle, glycerol from fat — and never, under any circumstance, acetyl-CoA.

## sections
### Definition
Gluconeogenesis is the synthesis of glucose from non-carbohydrate precursors. Its main function is to supply blood glucose when dietary carbohydrate is short — in prolonged fasting, starvation, and on a low-carbohydrate diet. It starts four to six hours after the last meal at a slow rate, and becomes the **main** source of blood glucose after 12 to 18 hours, when liver glycogen is depleted.

It occurs mainly in the **liver** and to a lesser extent in the **kidneys**, and the reason is enzymatic: those are the tissues that have glucose 6-phosphatase and fructose 1,6-bisphosphatase.

It is mainly the reversal of glycolysis, except at glycolysis's three irreversible kinase reactions. Those are bypassed by four gluconeogenic key enzymes:

| Glycolytic key enzyme | Gluconeogenic key enzyme |
|---|---|
| Glucokinase | Glucose 6-phosphatase |
| Phosphofructokinase-1 | Fructose 1,6-bisphosphatase |
| Pyruvate kinase | Pyruvate carboxylase **and** phosphoenolpyruvate carboxykinase |

That table answers two exam questions at once. **Four** key enzymes are needed to bypass **three** blocks, because the pyruvate kinase block takes two of them — and therefore **two** irreversible reactions are needed to convert pyruvate to phosphoenolpyruvate.

All four are cytosolic **except** pyruvate carboxylase, which is mitochondrial.

### Mechanism
**Phase one, pyruvate to phosphoenolpyruvate, is the compartment problem.** Pyruvate enters the mitochondrion and pyruvate carboxylase converts it to oxaloacetate, using ATP, CO2, biotin and magnesium. But PEPCK is in the cytosol, and oxaloacetate cannot cross the inner mitochondrial membrane. So malate dehydrogenase reduces oxaloacetate to malate, malate crosses, and a cytosolic malate dehydrogenase oxidises it back to oxaloacetate — the **dicarboxylic acid shuttle**. PEPCK then converts cytosolic oxaloacetate to 2-phosphoenolpyruvate, using GTP and releasing the CO2 that was added a moment earlier. That is why "which gluconeogenic conversion occurs partly in the mitochondria and partly in the cytosol" is answered *pyruvate to phosphoenolpyruvate*, and none of the others.

**Phase two, phosphoenolpyruvate to glucose**, is the reversal of glycolysis with two hydrolytic steps substituted: fructose 1,6-bisphosphatase for PFK-1, and glucose 6-phosphatase for glucokinase. Two molecules of 2-PEP, two ATP and two NADH are used to make one molecule of fructose 1,6-bisphosphate and then glucose. The whole process is endergonic: converting two pyruvates to one glucose costs **six ATP and two NADH**, and the ATP comes from fatty acid oxidation.

**The substrates are four, and one non-substrate matters more than all of them.**

*Lactate*, formed by anaerobic glycolysis in red cells continuously and in muscle during severe exercise, diffuses to the blood and to the liver, where it is converted to glucose. That glucose returns to the red cells or the muscle: this is the **Cori cycle**, and its importance is that it maintains blood glucose *and* prevents lactic acidosis. The direction is muscle-to-liver for the lactate and liver-to-muscle for the glucose; the tissues are muscle or red cell and liver, and the brain is not part of it.

*Glucogenic amino acids* are all of them except leucine and lysine, which are purely ketogenic. In prolonged fasting, protein becomes the main source of blood glucose, and it arrives by the **glucose–alanine cycle**: muscle transaminates the nitrogen from degraded amino acids onto pyruvate to make alanine, alanine travels to the liver, transdeamination there strips the nitrogen for urea, and gluconeogenesis returns the carbon as glucose.

*Glycerol*, mobilised from adipose tissue by lipolysis, is phosphorylated by glycerol kinase and oxidised to dihydroxyacetone phosphate, entering the reversed pathway there. Two glycerols make one glucose.

*Odd-chain fatty acids*, rarely, through the propionyl-CoA that their oxidation produces.

**Acetyl-CoA never gives glucose, because the pyruvate dehydrogenase reaction is irreversible.** That single sentence is why even-chain fatty acids are not gluconeogenic, and why acetoacetate — a ketone body — is the correct answer to "glucose cannot be synthesised from…". Note also that lactate enters at pyruvate and glycerol at dihydroxyacetone phosphate, so the first intermediate the two routes share is **glucose 6-phosphate**.

### Key determinants
Glycolysis and gluconeogenesis are **reciprocally regulated**, so that a liver cell never runs both at once and wastes ATP going round in a circle.

The trigger is not what most students expect. Fasting, starvation, stress and severe exercise raise the anti-insulin hormones; those hormones increase lipolysis in adipose tissue; the free fatty acids released reach the liver and are oxidised — and **it is the fatty acid oxidation that does the switching**. It works two ways at once. It raises ATP, which allosterically inhibits phosphofructokinase-1, pyruvate kinase and pyruvate dehydrogenase. And it raises acetyl-CoA, which allosterically stimulates pyruvate carboxylase and inhibits pyruvate dehydrogenase — so pyruvate is directed away from acetyl-CoA and towards oxaloacetate and glucose.

The consequence to hold is that **AMP favours glycolysis, not gluconeogenesis**. AMP activates PFK-1 and inhibits fructose 1,6-bisphosphatase; a rise in AMP is a signal to burn glucose, not to make it. The signal that says "make glucose" is fuel arriving from fat.

Hormonally, insulin decreases the gluconeogenic key enzymes and increases the glycolytic ones. The anti-insulin hormones do the reverse: **glucagon is the main inducer of the gluconeogenic key enzymes**; cortisol increases protein catabolism and so the supply of amino acids; growth hormone induces the liver aminotransferases; and all of them stimulate lipolysis.

One further consequence appears in starvation questions. Oxaloacetate is drawn off into gluconeogenesis, so it is no longer available to condense with acetyl-CoA — which is where ketogenesis comes from, and is why "during starvation oxaloacetate doesn't condense with acetyl-CoA in the liver" is answered by its conversion to **glucose**.

Gluconeogenesis exists because some tissues cannot do without glucose, and the book gives four reasons in order. The **brain** uses glucose as its main fuel and cannot metabolise fatty acids, because they travel as an FFA–albumin complex that cannot cross the blood–brain barrier, and it takes five to six days of starvation before it adapts to ketone bodies. **Red cells** have glucose as their only source of ATP. **Extrahepatic tissues** need a basal glucose supply for oxaloacetate, without which fatty acid and ketone body oxidation cannot proceed. And glucose is needed for the fetus and for lactose synthesis in the lactating breast. Gluconeogenesis also removes the lactate the red cells and muscle produce, and the glycerol that lipolysis releases.

### Clinical significance
The clinical face of this chapter is what happens when gluconeogenesis is the only thing keeping a patient alive, and what happens when it fails.

In **prolonged fasting and starvation** it is the sole source of blood glucose once liver glycogen is gone, and the substrate is increasingly protein — which is why prolonged starvation costs muscle mass. The glucose–alanine cycle is the mechanism by which that muscle is spent.

In **severe liver disease and in chronic kidney disease**, gluconeogenesis is impaired, and the book lists both among the causes of fasting hypoglycaemia. In **von Gierke's disease** the block is at the last step both pathways share, so glycogenolysis and gluconeogenesis fail together.

**Diabetes mellitus** is the mirror image: the insulin-to-anti-insulin ratio falls, so the gluconeogenic key enzymes are induced. That is why the activity of **pyruvate carboxylase** rises in diabetes while glucokinase, acetyl-CoA carboxylase and glycogen synthase — all insulin-dependent — fall.

Two enzyme-specific vignettes are worth rehearsing. If **PEPCK** is inhibited, the precursors that cannot be used are those entering *above* it — alanine, which arrives as pyruvate, is blocked, while glycerol, 3-phosphoglycerate and PEP itself all enter downstream and are unaffected. And **glucose 6-phosphatase** is expressed only in liver and kidney, which is both why those are the gluconeogenic organs and why lactate has to travel to the liver rather than being recycled where it is made.

## published_summary


## published_sections


## hold_these
Gluconeogenesis occurs mainly in liver and to a lesser extent in kidney, because those tissues have glucose 6-phosphatase and fructose 1,6-bisphosphatase.
Four key enzymes bypass three irreversible glycolytic steps; pyruvate to PEP takes two of them.
All the gluconeogenic key enzymes are cytosolic except mitochondrial pyruvate carboxylase.
Acetyl-CoA never gives glucose, because pyruvate dehydrogenase is irreversible.
All amino acids are glucogenic except leucine and lysine.
The Cori cycle carries lactate from muscle and red cells to the liver, and glucose back; it prevents lactic acidosis.
The glucose–alanine cycle carries muscle nitrogen to the liver as alanine.
Increased fatty acid oxidation is what activates gluconeogenesis and inhibits glycolysis.
Glucagon is the main inducer of the gluconeogenic key enzymes.
Converting two pyruvates to one glucose costs six ATP and two NADH.

## lose_the_mark
Answering three key enzymes because there are three irreversible glycolytic steps.
Running the Cori cycle liver-to-muscle, or putting the brain in it.
Expecting a rise in AMP to favour gluconeogenesis.
Thinking fatty acids can be converted to glucose because fat can be burnt for energy.

## callout_evidence
### Four key enzymes bypass three irreversible glycolytic steps; pyruvate to PEP takes two of them.
Claims: CLM-FND-GLUCONEOGENESIS-KEY-ENZYMES-01
Citations: CIT-KA-BIO103-GLUCONEOGENESIS-KEY-ENZYMES-01
Reviewed by: 
Reviewed at: 

### Acetyl-CoA never gives glucose, because pyruvate dehydrogenase is irreversible.
Claims: CLM-FND-GLUCONEOGENIC-SUBSTRATES-01
Citations: CIT-KA-BIO103-GLUCONEOGENIC-SUBSTRATES-01
Reviewed by: 
Reviewed at: 

### The Cori cycle carries lactate from muscle and red cells to the liver, and glucose back; it prevents lactic acidosis.
Claims: CLM-FND-CORI-CYCLE-01
Citations: CIT-KA-BIO103-CORI-CYCLE-01
Reviewed by: 
Reviewed at: 

### The glucose–alanine cycle carries muscle nitrogen to the liver as alanine.
Claims: CLM-FND-GLUCOSE-ALANINE-CYCLE-01
Citations: CIT-KA-BIO103-GLUCOSE-ALANINE-CYCLE-01
Reviewed by: 
Reviewed at: 

### Increased fatty acid oxidation is what activates gluconeogenesis and inhibits glycolysis.
Claims: CLM-FND-RECIPROCAL-REGULATION-01
Citations: CIT-KA-BIO103-RECIPROCAL-REGULATION-01
Reviewed by: 
Reviewed at: 

## related_concepts
CON-FND-C2C88203E4A918 | CON-FND-089E2C3E01031C | CON-FND-596FDA58EEEF0A | CON-FND-E7214B4A8D8835 | CON-FND-7B3B4F0BEBF198

## related_articles
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE: the pathway this one reverses, and the three irreversible steps it has to get round
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS: the hormones named here, and which tissues the glucose is being made for
ART-103-BIO-KETOSIS: what happens to the acetyl-CoA that cannot condense with oxaloacetate once oxaloacetate has been drawn into glucose
ART-103-BIO-GLYCOGEN-METABOLISM: the source of blood glucose for the first twelve to eighteen hours, before this one takes over

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-FND-GLUCONEOGENESIS-KEY-ENZYMES-01 | CLM-FND-GLUCONEOGENIC-SUBSTRATES-01 | CLM-FND-CORI-CYCLE-01 | CLM-FND-GLUCOSE-ALANINE-CYCLE-01 | CLM-FND-RECIPROCAL-REGULATION-01

## span_ids
SPN-BIO103-GLUCONEOGENESIS-KEY-ENZYMES-01 | SPN-BIO103-GLUCONEOGENIC-SUBSTRATES-01 | SPN-BIO103-CORI-CYCLE-01 | SPN-BIO103-GLUCOSE-ALANINE-CYCLE-01 | SPN-BIO103-RECIPROCAL-REGULATION-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## university_notes
kau: The Biochemistry department's own orientation for 2025-2026 cancels eleven items from the end-of-module and final exams, among them the whole Uronic Acid Pathway and Metabolic Integrations. Nothing taught in this article is on that cancelled list, and the department question book examines all of it.

## annotations
### definition_of · CON-FND-C2C88203E4A918
Quote: **Four** key enzymes are needed to bypass **three** blocks, because the pyruvate kinase block takes two of them — and therefore **two** irreversible reactions are needed to convert pyruvate to phosphoenolpyruvate.
Block: body

### definition_of · CON-FND-089E2C3E01031C
Quote: **Acetyl-CoA never gives glucose, because the pyruvate dehydrogenase reaction is irreversible.**
Block: body

### definition_of · CON-FND-596FDA58EEEF0A
Quote: That glucose returns to the red cells or the muscle: this is the **Cori cycle**, and its importance is that it maintains blood glucose *and* prevents lactic acidosis.
Block: body

### definition_of · CON-FND-E7214B4A8D8835
Quote: muscle transaminates the nitrogen from degraded amino acids onto pyruvate to make alanine, alanine travels to the liver, transdeamination there strips the nitrogen for urea, and gluconeogenesis returns the carbon as glucose.
Block: body

### definition_of · CON-FND-7B3B4F0BEBF198
Quote: It raises ATP, which allosterically inhibits phosphofructokinase-1, pyruvate kinase and pyruvate dehydrogenase.
Block: body

## media


## media_recommendations
### diagram · The reciprocal regulation of glycolysis and gluconeogenesis on one column
Brief: The book's page 52 figure redrawn: glucose at the top and pyruvate at the bottom, the glycolytic enzymes down the left and the gluconeogenic ones down the right at each of the three bypass points, with the allosteric effectors on the outside — AMP, ATP and citrate on PFK-1 and AMP and ATP on fructose 1,6-bisphosphatase pointing in opposite senses, ATP on pyruvate kinase, acetyl-CoA on pyruvate carboxylase
Purpose: Teaches CON-FND-7B3B4F0BEBF198 and CON-FND-C2C88203E4A918. That AMP and ATP have opposite signs on the two enzymes of a bypass pair is the whole of reciprocal regulation, and it is only legible when the pair is drawn side by side.
Priority: required
Status: needed
Section: Key determinants
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figure cited by locator
Rights: must be CC-BY or public domain

### diagram · The Cori cycle and the glucose–alanine cycle side by side
Brief: Two three-column figures stacked, each with muscle on the left, blood in the middle and liver on the right: the upper one carrying pyruvate to lactate by LDH in muscle, lactate across, lactate to pyruvate to glucose in liver, glucose back; the lower one carrying pyruvate to alanine by transamination in muscle, alanine across, alanine to pyruvate by transdeamination to glucose in liver, glucose back
Purpose: Teaches CON-FND-596FDA58EEEF0A and CON-FND-E7214B4A8D8835. The two cycles have identical shapes and different carriers, and drawing them together is what stops a student answering one when the question asks the other — which is the commonest error on both.
Priority: strongly helpful
Status: needed
Section: Mechanism
Kind: diagram
Source direction: openly licensed biochemistry text, or a redraw commissioned from the department figures cited by locator
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter III "Carbohydrate Metabolism", the Gluconeogenesis section, file pages 47 to 52.
The 391-item department question book (src_07f0a0ff41addf826c7f) establishes which of this material is examined and how, and is cited as curriculum signal only, never as evidence that a statement is medically true.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book prints the four gluconeogenic key enzymes in a table opposite the three glycolytic ones and never itself writes the number four — the count is read off its own table.
It gives no figure for the share of gluconeogenic substrate arriving as lactate or as alanine.
Some international sources classify more amino acids than leucine and lysine as ketogenic — the book's two-name list is what is taught and what the exam follows.

## conflicts
The question book offers "it is important to maintain blood glucose during overnight fast" as a distractor against "it is activated by elevated levels of FFA oxidation", and marks the second correct. Both read as true against this book, which makes glycogenolysis the main source of blood glucose up to about eighteen hours and gluconeogenesis the main source after that — an overnight fast sits on the boundary. A faculty reviewer should confirm the intended reading before the item is published.

## last_reviewed


## review_due


## notes
Carries the gluconeogenesis block of the department question book — about twenty items, including three recovered from run-on options on file pages 98, 101 and 102. The Cori and glucose–alanine cycles are kept in this article rather than given their own because the book teaches both as gluconeogenic substrates, and because the questions about them are gluconeogenesis questions in disguise.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
questionIds: The 116 MCQs that test this article are authored in ../question/103-BMS-MCQ-carbohydrate-bioenergetics.md and name this article in their library_ids. The back-reference is owed and is listed in the hand-off report; it is left empty rather than filled with IDs before that file is applied.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations; the department book’s own figures are faculty teaching material, cited by locator and not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-103-BIO-BLOOD-GLUCOSE-HOMEOSTASIS

## title
Blood glucose: how it gets in, who must have it, and the one hormone that lowers it

## arabic_title
اتزان سكر الدم

## aliases
Blood glucose
Glucose homeostasis
Glucose transporters
GLUT-4
SGLT-2
Insulin
Anti-insulin hormones
Hypoglycaemia
Glucosuria
Insulinoma

## subject
endo

## topic
Carbohydrate metabolism

## subtopic
Blood Glucose

## microtopic
Metabolic and Hormonal Regulation of Blood Glucose

## nanotopic


## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-END-T07 | DIS-BIO-T01

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

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
Medical team, Admin team

## final_publisher
Admin team

## summary
This is the chapter that ties the others together. Glucose has to be digested to a monosaccharide before it can be absorbed, carried across a membrane by one of two families of transporter, and then distributed by a system in which exactly one hormone lowers the blood level and five raise it. What each tissue then does with the glucose depends on which transporter it has and which enzymes; and what a student is asked in an exam is almost always a consequence of one of those two facts — a glucosuria with a normal blood glucose, a diabetic who improves when given glucagon, or a tumour that secretes insulin.

## sections
### Definition
The normal fasting plasma glucose, after 8 to 12 hours without food, is 70 to less than 100 mg/dL; it rises after a meal and returns to under 140 mg/dL two hours after eating. Its sources are dietary carbohydrate, and — during fasting and starvation — glycogenolysis and gluconeogenesis.

Dietary carbohydrate is monosaccharide, disaccharide and polysaccharide. Digestion starts in the mouth, continues in the stomach and finishes in the small intestine, and **the end products are mainly glucose, galactose and fructose**. Only monosaccharides are absorbed, which is why a low disaccharidase activity leaves maltose, sucrose and lactose in the lumen and so in the stool: starch is still degraded, because amylase is unaffected, but the last step never happens and the monosaccharides are never released into blood.

Absorbed glucose goes to the liver and then to the tissues, where its fates are oxidation for energy; conversion to other compounds — other carbohydrates, glycerol 3-phosphate for triacylglycerol and phospholipid, active acetate for cholesterol and fatty acids, non-essential amino acids; and storage, as glycogen in liver and muscle and as triacylglycerol in adipose tissue. It is excreted in urine if plasma glucose exceeds the renal threshold of 180 mg/dL.

### Mechanism
**Glucose crosses membranes on two families of carrier, and the difference between them is examined constantly.**

The **facilitative transporters**, GLUT-1 to GLUT-5, need no energy. **GLUT-2** is in liver, kidney, pancreatic β-cells and the basal border of the intestinal cell; it takes glucose up rapidly and in proportion to blood level, which is what allows the liver and kidney to be the glucose homeostatic organs and the β-cell to sense a hyperglycaemia and secrete insulin. **GLUT-4** is in heart, skeletal muscle and adipose tissue, and it is **the only insulin-dependent transporter**: insulin promotes its translocation to the outer cell surface, and in the absence of insulin the transporters are endocytosed into an intracellular pool and uptake falls *regardless of the extracellular glucose concentration*.

The **sodium-dependent cotransporters** move glucose against a gradient. **SGLT-1** is mainly in the small intestine and allows active uptake from the lumen, at two sodium to one glucose. **SGLT-2** is primarily in the proximal renal tubule, at one sodium to one glucose, and it accomplishes about **90% of renal glucose reabsorption**.

**Glucose 6-phosphate is where every one of these paths converges.** It is the intermediate at the junction of five pathways — glycolysis, gluconeogenesis, the pentose phosphate pathway, glycogenesis and glycogenolysis — which makes it the one metabolite that every cell uses for glycolysis, for glycogen synthesis and for the hexose monophosphate shunt alike. In the fed state its major fate in all tissues is isomerisation to fructose 6-phosphate and so into glycolysis; hydrolysis back to free glucose is possible only in liver and kidney.

**Some tissues cannot do without glucose at all.** The **red cell** has no mitochondria, so glucose is its only source of ATP in every condition, and during fasting that glucose can only come from gluconeogenesis. The **brain** uses glucose as its main fuel and cannot use fatty acids, which travel bound to albumin and cannot cross the blood–brain barrier; it needs five to six days of starvation before it adapts to ketone bodies. Even the tissues that do burn fat need a basal glucose supply, because pyruvate is where their oxaloacetate comes from and the citric acid cycle cannot turn without it.

### Key determinants
Six tissues and organs share the work of glucose homeostasis, and the book gives each a job. The **gastro-intestinal tract** protects against a sudden rise by emptying the stomach gradually, by capping absorption at about 1 g per kg per hour, and by secreting hormones on contact with glucose that stimulate insulin before the glucose has even been absorbed — which is why oral glucose produces more insulin than intravenous glucose. The **liver** is the main homeostatic organ: it takes glucose up through GLUT-2 in proportion to blood level, and during feeding it increases oxidation, glycogenesis and lipogenesis while decreasing glycogenolysis and gluconeogenesis. The **kidney** reabsorbs glucose completely below the renal threshold, oxidises more of it during feeding and makes more of it during fasting. **Adipose tissue** and **skeletal muscle** both take glucose up through insulin-dependent GLUT-4 when fed, and in fasting both shift to fatty acids, sparing glucose for the brain and the red cell while sending glycerol and alanine to the liver as gluconeogenic substrate.

**Hormonally the picture is asymmetric, and that asymmetry is the exam question.** There is exactly **one hypoglycaemic hormone — insulin** — and five anti-insulin hormones: **glucagon, epinephrine, cortisol, growth hormone and thyroid hormones**. Vasopressin is not among them and has no effect on serum glucose.

**Insulin**, from the β-cells in response to hyperglycaemia, increases uptake through GLUT-4 in heart, skeletal muscle and adipose tissue; increases oxidation, glycogenesis and lipogenesis; and decreases hepatic glycogenolysis and gluconeogenesis. Its cAMP mechanism is worth naming because a question asks it directly: insulin activates **phosphodiesterase**, which degrades cAMP and so prevents activation of protein kinase A.

**Glucagon**, from the α-cells, is secreted in fasting or hypoglycaemia and **acts primarily on the liver**, where it stimulates glycogenolysis and gluconeogenesis and inhibits glycolysis and glycogenesis. It does not act on skeletal muscle. **Epinephrine** acts on liver much as glucagon does, on muscle by stimulating glycogenolysis, and on adipose tissue by stimulating lipolysis. **Cortisol** stimulates lipolysis and protein catabolism and decreases peripheral glucose use; its excess causes steroid diabetes, as in Cushing syndrome. **Growth hormone** stimulates lipolysis and induces the liver aminotransferases; its excess causes pituitary diabetes, as in acromegaly. **Thyroid hormones** increase every aspect of carbohydrate metabolism, though physiological levels do not alter plasma glucose.

### Clinical significance
**Hypoglycaemia** is a drop of blood glucose below the normal fasting level, and below 45 to 50 mg/dL it may be fatal. Mild hypoglycaemia gives hunger, tremors, drowsiness, sweating, an accelerated heart rate and tingling lips; as it deepens, concentration problems, confusion and loss of consciousness follow. **Estimation of blood glucose is the only evidence of hypoglycaemia** — the symptoms alone never settle it.

It comes in two kinds. **Fasting hypoglycaemia**, after six hours or more, is caused either by overutilisation of glucose — **insulinoma**, a pancreatic tumour releasing too much insulin, or an overdose of insulin or diabetes medication — or by impaired production, in severe liver disease, chronic kidney disease, hypofunction of the adrenal or pituitary glands, or von Gierke's disease. **Postprandial or reactive hypoglycaemia** comes two to five hours after a meal and never during fasting; if it is prolonged it indicates an exaggerated insulin response or reduced anti-insulin hormone activity.

Two vignettes recur, and both are solved by asking what the treatment tells you. A type 1 diabetic on insulin who has tremors, a fast heart rate, poor concentration and dizziness, and who improves when given glucagon, was **hypoglycaemic** — the adrenergic symptoms read like a sympathetic surge because that is exactly what they are, and glucagon would do nothing for a high sugar. And an adult with tremors, palpitations, hunger, headache, weakness and confusion whose laboratory results show a **high insulin with a low glucose** has an **insulinoma**; pheochromocytoma, Cushing syndrome and acromegaly all raise glucose rather than lowering it.

**Glucosuria** is glucose in urine above 30 mg/dL. It comes in two kinds too, and the distinction is the blood level. **Hyperglycaemic glucosuria** occurs when blood glucose exceeds the renal threshold of 180 mg/dL — in diabetes mellitus, in epinephrine excess including phaeochromocytoma, and in alimentary glucosuria after gastrectomy or bariatric surgery. **Normoglycaemic or renal glucosuria** occurs at a normal blood glucose, from a defect in the renal tubular mechanism for reabsorbing glucose, or in pregnancy from a lowered threshold. A dehydrated soldier with glucose in his urine who is not diabetic has the second kind, and the transporter that reabsorbs 90% of the filtered load is **SGLT-2**.

## published_summary


## published_sections


## hold_these
The end products of carbohydrate digestion are glucose, galactose and fructose; only monosaccharides are absorbed.
GLUT-4, in heart, skeletal muscle and adipose tissue, is the only insulin-dependent transporter.
SGLT-2 in the proximal tubule reabsorbs about 90% of filtered glucose; a defect gives glucosuria at a normal blood glucose.
Glucose 6-phosphate is the junction of glycolysis, gluconeogenesis, the pentose phosphate pathway, glycogenesis and glycogenolysis.
The red cell depends on glucose in all conditions; the brain adapts to ketone bodies only after five to six days.
Insulin is the only hypoglycaemic hormone; glucagon, epinephrine, cortisol, growth hormone and thyroid hormones oppose it.
Insulin lowers cAMP through phosphodiesterase; glucagon raises it through adenylyl cyclase.
Glucagon acts primarily on the liver.
The renal threshold for glucose is 180 mg/dL.
A high insulin with a low glucose points to an insulinoma.

## lose_the_mark
Choosing GLUT-2 as the insulin-dependent transporter because it sits on the β-cell.
Blaming SGLT-1 for renal glucosuria.
Naming the brain as the tissue that depends on glucose in all conditions.
Reading tremor, palpitations and sweating in a treated diabetic as hyperglycaemia.
Expecting starch in the stool in disaccharidase deficiency.

## callout_evidence
### The end products of carbohydrate digestion are glucose, galactose and fructose; only monosaccharides are absorbed.
Claims: CLM-GIT-CARBOHYDRATE-DIGESTION-01
Citations: CIT-KA-BIO103-CARBOHYDRATE-DIGESTION-01
Reviewed by: 
Reviewed at: 

### GLUT-4, in heart, skeletal muscle and adipose tissue, is the only insulin-dependent transporter.
Claims: CLM-FND-GLUCOSE-TRANSPORTERS-01
Citations: CIT-KA-BIO103-GLUCOSE-TRANSPORTERS-01
Reviewed by: 
Reviewed at: 

### The red cell depends on glucose in all conditions; the brain adapts to ketone bodies only after five to six days.
Claims: CLM-FND-OBLIGATE-GLUCOSE-TISSUES-01
Citations: CIT-KA-BIO103-OBLIGATE-GLUCOSE-TISSUES-01
Reviewed by: 
Reviewed at: 

### Glucose 6-phosphate is the junction of glycolysis, gluconeogenesis, the pentose phosphate pathway, glycogenesis and glycogenolysis.
Claims: CLM-FND-G6P-BRANCH-POINT-01
Citations: CIT-KA-BIO103-G6P-BRANCH-POINT-01
Reviewed by: 
Reviewed at: 

### Insulin is the only hypoglycaemic hormone; glucagon, epinephrine, cortisol, growth hormone and thyroid hormones oppose it.
Claims: CLM-END-BLOOD-GLUCOSE-HORMONES-01
Citations: CIT-KA-BIO103-BLOOD-GLUCOSE-HORMONES-01
Reviewed by: 
Reviewed at: 

### A high insulin with a low glucose points to an insulinoma.
Claims: CLM-END-HYPOGLYCAEMIA-CAUSES-01
Citations: CIT-KA-BIO103-HYPOGLYCAEMIA-CAUSES-01
Reviewed by: 
Reviewed at: 

## related_concepts
CON-GIT-E43BAB1EBDEBE6 | CON-FND-E9C3C98FA0388C | CON-FND-F6450B9D5AB855 | CON-FND-051CF62C7920A3 | CON-END-0B615572003514 | CON-END-853A9833B36C99

## related_articles
ART-103-BIO-GLYCOGEN-METABOLISM: the cascade these hormones act through, and the disease that removes the liver's last step
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE: where blood glucose comes from once liver glycogen is gone
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE: what a tissue does with the glucose once it is inside
ART-103-BIO-KETOSIS: what the brain lives on once it has adapted, and why that takes five to six days

## question_ids
[clear]

## resource_ids
src_300847a5fa64809d6c07

## article_source_ids
src_300847a5fa64809d6c07

## claim_ids
CLM-GIT-CARBOHYDRATE-DIGESTION-01 | CLM-FND-GLUCOSE-TRANSPORTERS-01 | CLM-FND-OBLIGATE-GLUCOSE-TISSUES-01 | CLM-FND-G6P-BRANCH-POINT-01 | CLM-END-BLOOD-GLUCOSE-HORMONES-01 | CLM-END-HYPOGLYCAEMIA-CAUSES-01

## span_ids
SPN-BIO103-CARBOHYDRATE-DIGESTION-01 | SPN-BIO103-GLUCOSE-TRANSPORTERS-01 | SPN-BIO103-OBLIGATE-GLUCOSE-TISSUES-01 | SPN-BIO103-G6P-BRANCH-POINT-01 | SPN-BIO103-BLOOD-GLUCOSE-HORMONES-01 | SPN-BIO103-HYPOGLYCAEMIA-CAUSES-01

## universities
kau

## years
KAU_Y1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Blood Glucose

## university_notes
kau: The Biochemistry department's own orientation for 2025-2026 cancels eleven items from the end-of-module and final exams, among them the whole Uronic Acid Pathway and Metabolic Integrations. Nothing taught in this article is on that cancelled list, and the department question book examines all of it.

## annotations
### definition_of · CON-GIT-E43BAB1EBDEBE6
Quote: Only monosaccharides are absorbed, which is why a low disaccharidase activity leaves maltose, sucrose and lactose in the lumen and so in the stool
Block: body

### definition_of · CON-FND-E9C3C98FA0388C
Quote: **GLUT-4** is in heart, skeletal muscle and adipose tissue, and it is **the only insulin-dependent transporter**
Block: body

### definition_of · CON-FND-F6450B9D5AB855
Quote: The **red cell** has no mitochondria, so glucose is its only source of ATP in every condition, and during fasting that glucose can only come from gluconeogenesis.
Block: body

### definition_of · CON-FND-051CF62C7920A3
Quote: It is the intermediate at the junction of five pathways — glycolysis, gluconeogenesis, the pentose phosphate pathway, glycogenesis and glycogenolysis
Block: body

### definition_of · CON-END-0B615572003514
Quote: There is exactly **one hypoglycaemic hormone — insulin** — and five anti-insulin hormones: **glucagon, epinephrine, cortisol, growth hormone and thyroid hormones**.
Block: body

### definition_of · CON-END-853A9833B36C99
Quote: an adult with tremors, palpitations, hunger, headache, weakness and confusion whose laboratory results show a **high insulin with a low glucose** has an **insulinoma**
Block: body

## media


## media_recommendations
### diagram · The transporter map: which tissue has which carrier
Brief: A body schematic with the transporters labelled where they sit — GLUT-2 on liver, kidney, pancreatic β-cell and the basal border of the enterocyte; GLUT-4 on heart, skeletal muscle and adipose tissue with an insulin arrow; SGLT-1 on the apical enterocyte at 2Na⁺:1 glucose; SGLT-2 on the proximal renal tubule at 1Na⁺:1 glucose and marked 90% of reabsorption
Purpose: Teaches CON-FND-E9C3C98FA0388C. Every question on this topic is "which transporter in which tissue", and a list of five transporters against seven tissues is exactly the kind of material that a map fixes and prose does not.
Priority: required
Status: needed
Section: Mechanism
Kind: diagram
Source direction: openly licensed physiology or biochemistry text
Rights: must be CC-BY or public domain

### comparison table · One hypoglycaemic hormone against five anti-insulin hormones
Brief: A six-row table: hormone, source, main target tissue, effect on glycogen, effect on gluconeogenesis, effect on lipolysis, and the named diabetes each excess causes where the book gives one — steroid diabetes for cortisol, pituitary diabetes for growth hormone, stress diabetes for catecholamines
Purpose: Teaches CON-END-0B615572003514. The asymmetry — one down, five up — is the answer to several questions at once, and the named diabetes column is what turns a memorised list into something a student can use on a vignette.
Priority: strongly helpful
Status: needed
Section: Key determinants
Kind: comparison table
Source direction: original table built from the department book's own hormone section
Rights: original work

## publication_gate
needs_evidence

## evidence_basis
Kasr Al Ainy Biochemistry department book for module 103 BMS (src_300847a5fa64809d6c07), chapter III "Carbohydrate Metabolism", the Introduction and Blood Glucose sections, file pages 22 to 24 and 53 to 57.
The 391-item department question book (src_07f0a0ff41addf826c7f) establishes which of this material is examined and how, and is cited as curriculum signal only, never as evidence that a statement is medically true.

## evidence_gaps
Every statement rests on one source, the department book. No independent verification against an international biochemistry reference has been attached.
The book names no disaccharidase deficiency and gives no clinical picture for one — what is taught is that only monosaccharides are absorbed, and the consequence follows from that.
It names no SGLT-2 disease and no gene, only "defects in renal tubular mechanism for reabsorption of glucose" as a cause of normoglycaemic glucosuria.
It gives no treatment for hypoglycaemia at all. Glucagon as an emergency measure appears only in the question book's scenario, and no dose, route or protocol is stated anywhere in this article.
That muscle lacks the glucagon receptor is not in this book — it comes from the live concept CON-MSK-38F07C3ED8023F and is attributed there rather than asserted here.

## conflicts
[clear]

## last_reviewed


## review_due


## notes
Carries the blood glucose block of the department question book — about twenty items — together with the four digestion and transporter items that open the chapter. Filed under subject "endo" rather than "fnd" because the hormonal half of it is endocrine material and the two hormone concepts are CON-END records, while the placement stays on DIS-BIO-T03 with SYS-END-T07 as the secondary node.

## field_notes
nanotopicId: The canonical tree stops at DIS-BIO-T03 for this material; the book’s own chapter and section names are carried by module_subject, which is finer than any nanotopic here would be.
questionIds: The 116 MCQs that test this article are authored in ../question/103-BMS-MCQ-carbohydrate-bioenergetics.md and name this article in their library_ids. The back-reference is owed and is listed in the hand-off report; it is left empty rather than filled with IDs before that file is applied.
media: No rights-cleared asset exists for any of this material. What is needed is requested in media_recommendations; the department book’s own figures are faculty teaching material, cited by locator and not reproduced. The key is present and deliberately empty rather than written as [clear], which would parse as a media block with no URL and be reported as one that would be dropped.
publishedSummary: Nothing is published yet. The published fields are filled by the publication step, not by the author.
publishedSections: Nothing is published yet, for the same reason.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
