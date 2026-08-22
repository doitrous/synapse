<!--
  103 BMS · Biochemistry · the 36 atomic claims the carbohydrate metabolism,
  bioenergetics and citric acid cycle MCQ concepts name.

  One kind, one file. The citations that support these claims are the sibling
  file ./103-BMS-mcq-carbohydrate-citations.md.

  WHERE THE IDs COME FROM. Not one ID here is minted freely: every 'id' is
  already written in an atomic_claim_ids list in
  ../concept/103-BMS-mcq-carbohydrate-concepts.md, and every concept_id is the
  concept that names it. The set is closed — 36 concepts in, 36 claims out, none
  renamed, none added, none skipped, and the build refuses to write the file if
  the two sets differ.

  THE SOURCE. Every medical statement below comes from one book:

    src_300847a5fa64809d6c07  Dpt book Biochemistry 103.pdf  160 pp

  The 391-item department question book (src_07f0a0ff41addf826c7f) says what is
  examined and is cited by nothing here. A question book is evidence about what a
  faculty asks, never evidence that something is medically true.

  RISK CLASS. Thirty-five are foundational_stable. One is treatment_or_action and
  must not auto-publish:

    CLM-END-HYPOGLYCAEMIA-CAUSES-01   names insulin overdose as a cause of
                                      hypoglycaemia

  It is the only claim in the file that touches a medication at all. No dose, no
  route, no brand name and no treatment protocol appears anywhere below, because
  none appears in the book. The question book's own scenario has an emergency
  technician giving glucagon; that is recorded as the question's wording and is
  asserted by no claim.

  WHERE THE BOOK IS SILENT the claim says so in its own qualifiers rather than
  filling the gap. Four are worth a reviewer's eye:

    · pyruvate kinase deficiency is not named in this book at all — the claim
      asserts only the arithmetic that follows from the book's own ATP accounting
    · disaccharidase deficiency is not named either — the claim asserts only that
      the end products of digestion are monosaccharides
    · AMP activation of glycogen phosphorylase b is not printed in this book,
      although the question book's key requires it
    · the citric acid cycle's ATP yield is printed twice, as 9 in the diagram and
      10 in the text

  VERIFICATION STATUS. All 36 are needs_evidence, matching the publication_status
  of the concepts that name them. All 36 carry a citation with an exact page
  locator; no human has reviewed the chain, and review is what promotes a claim
  to verified.

  This file lands after the concept batch and before the citation batch.
-->

# Item

## id
CLM-FND-HIGH-ENERGY-BONDS-01

## concept_id
CON-FND-7228237A5897B5

## subject
A hydrolysable bond that liberates 7.3 kcal/mole or more as free energy

## predicate
is classified as

## object
A high energy bond, the class that includes ATP, 2-phosphoenolpyruvate, creatine phosphate and S-adenosylmethionine

## display_text
The body's hydrolysable bonds are divided at 7.3 kcal/mole. Below it are the low energy bonds — phosphate ester, carboxyl ester, glycosidic and peptide — which cannot generate ATP. At or above it are the high energy bonds, written with a curved double dash: ATP, 2-phosphoenolpyruvate, creatine phosphate and S-adenosylmethionine. Each of the two terminal pyrophosphate bonds of ATP releases 7.3 kcal/mole on hydrolysis.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
boundary: 7.3 kcal/mole of free energy on hydrolysis
notation: high energy bonds written with a curved double dash, low energy with an ordinary dash

---

# Item

## id
CLM-FND-ATP-ADP-CYCLE-01

## concept_id
CON-FND-6B7241CD9F3C42

## subject
Creatine phosphate, formed from ATP by creatine kinase in energy-rich states

## predicate
is

## object
The major storage form of energy in muscle, because cells do not store energy as ATP

## display_text
A cell holds only a few seconds' worth of ATP, so the ATP–ADP cycle turns over very fast and energy is not stored as ATP at all. In muscle it is stored as creatine phosphate, made from ATP by creatine kinase when energy is plentiful and broken down again within two to seven seconds when it is not.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
tissue: muscle, which is the only tissue the book names for this store
enzyme: creatine kinase, catalysing a reversible reaction

---

# Item

## id
CLM-FND-ANABOLISM-CATABOLISM-01

## concept_id
CON-FND-9D5F6458F68D4B

## subject
Anabolism, the biosynthesis of large complex molecules from smaller precursors

## predicate
is distinguished from catabolism by

## object
Consuming energy rather than producing it, and accelerating during growth rather than during fasting and stress

## display_text
Metabolism has two halves. Anabolism builds large molecules from small ones and consumes energy, and accelerates during growth and regeneration. Catabolism breaks large molecules down and produces energy, and accelerates during fasting, activity and stress; it runs in three stages, of which the first traps no energy as ATP at all.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
stages: catabolism in three stages, the first trapping no free energy as ATP
contrast: a pathway serving both halves at once is amphibolic

---

# Item

## id
CLM-FND-REDOX-TERMINAL-ACCEPTOR-01

## concept_id
CON-FND-8771AB893CA4C3

## subject
Oxygen, at complex IV of the respiratory chain

## predicate
acts as

## object
The terminal acceptor of the electrons carried down the chain, combining with two protons to form water

## display_text
Electrons pass down the respiratory chain from carrier to carrier and are handed at complex IV to oxygen, which combines with two protons to form water. Oxygen is the terminal acceptor because it has the highest redox potential in the chain; the molecule that donates electrons at any step is the reducing agent, and it is itself oxidised.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
site: complex IV, cytochrome c oxidase
product: water, not glucose or any other reduced species

---

# Item

## id
CLM-FND-ETC-COMPONENTS-01

## concept_id
CON-FND-A3BC299ED2C7C9

## subject
The electron transport chain of the inner mitochondrial membrane

## predicate
is composed of

## object
Four protein complexes, two mobile carriers — ubiquinone and cytochrome c — and complex V, ATP synthase

## display_text
The respiratory chain is four integral protein complexes, two mobile electron carriers (ubiquinone and cytochrome c) and complex V, ATP synthase. NADH enters at complex I on FMN; FADH2 enters at complex II, succinate dehydrogenase, on FAD. Both hand their hydrogens to coenzyme Q, so complex II is not on the NADH route.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
site: inner mitochondrial membrane
entry points: NADH at complex I, FADH2 at complex II, both converging on coenzyme Q

---

# Item

## id
CLM-FND-CHEMIOSMOSIS-01

## concept_id
CON-FND-0CA8047810DF78

## subject
Complexes I, III and IV of the respiratory chain

## predicate
act as

## object
Proton pumps that build the gradient which drives ATP synthesis, complexes I and III moving four protons each and complex IV two

## display_text
The energy released by electron transport pumps protons out of the matrix into the intermembrane space, which becomes electropositive. Complexes I, III and IV are the pumps; complex II is not. The inner membrane is impermeable to protons, so the gradient — the proton motive force — can only be discharged through ATP synthase, and that is what drives ATP synthesis.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
stoichiometry: complexes I and III translocate four protons each, complex IV two, and four protons through F0 make one ATP
exclusion: complex II pumps no protons

---

# Item

## id
CLM-FND-UNCOUPLERS-01

## concept_id
CON-FND-C3CB859E560A18

## subject
An uncoupler of oxidative phosphorylation

## predicate
causes

## object
Oxidation in the respiratory chain to continue without ATP synthesis, with the energy released as heat

## display_text
Uncouplers make the inner mitochondrial membrane permeable to protons and abolish the electrochemical gradient. Oxidation therefore continues while phosphorylation stops, and the energy leaves as heat. Thermogenin in brown adipose tissue does this physiologically for non-shivering thermogenesis; high thyroxine, intravenous calcium and aspirin overdose do it as a side effect, which is why each is felt as heat.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
mechanism: increased proton permeability of the inner mitochondrial membrane
physiological example: thermogenin of brown adipose tissue

---

# Item

## id
CLM-FND-SUBSTRATE-LEVEL-PHOSPHORYLATION-01

## concept_id
CON-FND-5253967A0E3786

## subject
Substrate level phosphorylation

## predicate
occurs at

## object
Three reactions in two pathways: phosphoglycerate kinase and pyruvate kinase in glycolysis, and succinate thiokinase in the citric acid cycle

## display_text
Substrate level phosphorylation is the oxidation of a substrate to a product carrying a high energy bond, whose energy phosphorylates ADP or GDP directly. It happens at exactly three reactions: phosphoglycerate kinase and pyruvate kinase in glycolysis, and succinate thiokinase in the citric acid cycle, which is the only reaction in that cycle to make ATP this way.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
count: three reactions in two pathways
contrast: independent of the respiratory chain, so it still runs anaerobically

---

# Item

## id
CLM-FND-TCA-SITE-01

## concept_id
CON-FND-BCCBDEC637795A

## subject
Succinate dehydrogenase, alone among the enzymes of the citric acid cycle

## predicate
is bound to

## object
The inner mitochondrial membrane, where it forms complex II of the respiratory chain

## display_text
The enzymes of the citric acid cycle sit in the mitochondrial matrix, with one exception: succinate dehydrogenase is tightly bound to the inner mitochondrial membrane and is complex II of the respiratory chain. It is correspondingly the only cycle enzyme whose coenzyme is FAD; isocitrate dehydrogenase, the α-ketoglutarate dehydrogenase complex and malate dehydrogenase all use NAD⁺.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
exception: one enzyme of eight
coenzyme: FAD at succinate dehydrogenase, NAD⁺ at the other three dehydrogenase steps

---

# Item

## id
CLM-FND-TCA-OXALOACETATE-01

## concept_id
CON-FND-8F8B3EF0763399

## subject
The oxidation of malate to oxaloacetate by malate dehydrogenase, the eighth step of the cycle

## predicate
regenerates

## object
The oxaloacetate consumed at step one, which is what makes the pathway a cycle

## display_text
Citrate synthase consumes oxaloacetate at the first step and malate dehydrogenase remakes it at the last, so the starting compound is restored and can take up the next acetyl group. That regeneration is the cyclic character of the Krebs cycle. Citrate is not regenerated, and three of the cycle's steps are irreversible, so reversibility is not what closes it.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
step: eight of eight, malate dehydrogenase
not: reversibility — three steps of the cycle are irreversible

---

# Item

## id
CLM-FND-TCA-YIELD-01

## concept_id
CON-FND-9420F608039B74

## subject
One turn of the Krebs cycle, oxidising one acetyl group

## predicate
yields

## object
Two molecules of CO2, three of NADH, one of FADH2 and one of ATP, worth ten ATP in total

## display_text
One turn of the citric acid cycle releases two molecules of CO2 and produces three NADH, one FADH2 and one ATP at substrate level. Passed through the respiratory chain the reduced coenzymes give 7.5 and 1.5 ATP, so oxidation of one acetyl group through the cycle yields ten ATP.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
accounting: 2.5 ATP per NADH and 1.5 per FADH2, as stated in the bioenergetics chapter
carbon: two CO2, from isocitrate dehydrogenase and from the α-ketoglutarate dehydrogenase complex

---

# Item

## id
CLM-FND-TCA-AMPHIBOLIC-01

## concept_id
CON-FND-8ADE222FBB57B2

## subject
The citric acid cycle

## predicate
is called

## object
An amphibolic pathway, because it participates in both catabolism and anabolism through intermediates that leave it

## display_text
The cycle is amphibolic: it oxidises acetyl-CoA and at the same time exports intermediates for synthesis. Citrate leaves for fatty acid and cholesterol synthesis, α-ketoglutarate is transaminated to glutamate, succinyl-CoA goes to haem synthesis and ketolysis, malate can become pyruvate with NADPH, and oxaloacetate becomes aspartate or, through PEPCK in the cytosol, phosphoenolpyruvate for gluconeogenesis.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
anabolic exports: citrate, α-ketoglutarate, succinyl-CoA, malate and oxaloacetate
not: reversibility, and not presence in every cell — the red cell has no cycle

---

# Item

## id
CLM-FND-TCA-INHIBITORS-01

## concept_id
CON-FND-F9CE11670992CE

## subject
Fluoroacetate, converted in the body to fluorocitrate, and arsenic compounds

## predicate
inhibit

## object
Aconitase and α-ketoglutarate dehydrogenase respectively, arsenic by complexing the thiol groups of lipoic acid

## display_text
Two named poisons stop the citric acid cycle. Fluoroacetate, a rodenticide, is converted in the body to fluorocitrate, which inhibits aconitase. Arsenic compounds inhibit α-ketoglutarate dehydrogenase by forming a stable complex with the thiol groups of lipoic acid, making the cofactor unavailable — the same mechanism that blocks pyruvate dehydrogenase.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
mechanism: fluoroacetate acts after conversion to fluorocitrate; arsenic acts on lipoate thiols
distinguish: fluoride, a different poison, inhibits enolase in glycolysis

---

# Item

## id
CLM-GIT-CARBOHYDRATE-DIGESTION-01

## concept_id
CON-GIT-E43BAB1EBDEBE6

## subject
Digestion of dietary carbohydrate, which begins in the mouth and finishes in the small intestine

## predicate
yields

## object
Mainly glucose, galactose and fructose, the monosaccharides that are absorbed into blood

## display_text
Carbohydrate digestion ends in monosaccharides — mainly glucose, galactose and fructose — and only monosaccharides are absorbed. When the final disaccharide-splitting step fails, the disaccharides themselves are never released as monosaccharides and stay in the lumen; starch is still degraded to that point, because amylase is unaffected.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
end products: glucose, galactose, fructose
inference: what accumulates in disaccharidase deficiency follows from the book's statement that only monosaccharides are absorbed; the book names no deficiency

---

# Item

## id
CLM-FND-GLUCOSE-TRANSPORTERS-01

## concept_id
CON-FND-E9C3C98FA0388C

## subject
GLUT-4, present in heart, skeletal muscle and adipose tissue

## predicate
is

## object
The insulin-dependent glucose transporter, translocated to the cell surface by insulin and endocytosed without it

## display_text
Glucose crosses membranes on facilitative transporters (GLUT-1 to GLUT-5) and sodium-dependent cotransporters (SGLT-1 and SGLT-2). GLUT-4, in heart, skeletal muscle and adipose tissue, is the insulin-dependent one: insulin moves it to the surface and without insulin it is endocytosed, so uptake falls whatever the blood glucose. SGLT-2, in the proximal renal tubule, actively reabsorbs about 90% of filtered glucose.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
insulin dependence: GLUT-4 only; every other transporter the book lists is insulin independent
renal: SGLT-2 reabsorbs about 90% of filtered glucose at one sodium to one glucose

---

# Item

## id
CLM-FND-HEXOKINASE-GLUCOKINASE-01

## concept_id
CON-FND-EA1BA37ACB643B

## subject
Glucokinase, present in liver and pancreatic β-cells

## predicate
differs from hexokinase by

## object
Having a high Km and therefore a low affinity for glucose with a high Vmax, no product inhibition, and induction by insulin

## display_text
Hexokinase is in every tissue, has a low Km and high affinity with a low Vmax, and is inhibited by its own product glucose 6-phosphate, which guarantees every tissue a supply at low blood glucose. Glucokinase is confined to liver and pancreatic β-cells, has a high Km and low affinity with a high Vmax, is not product inhibited, and is induced by insulin and repressed by glucagon — so it works after a meal.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
kinetics: high Km means low affinity, which is what confines glucokinase to the fed state
hormonal: insulin induces and glucagon represses glucokinase; neither affects hexokinase

---

# Item

## id
CLM-FND-GLYCOLYSIS-COMMITTED-STEP-01

## concept_id
CON-FND-853096A349FFBD

## subject
Phosphofructokinase-1, which converts fructose 6-phosphate to fructose 1,6-bisphosphate

## predicate
is

## object
The most important control site of glycolysis and its first irreversible reaction unique to the pathway

## display_text
Glycolysis has three irreversible steps — glucokinase or hexokinase, PFK-1 and pyruvate kinase — and PFK-1 is the committed one, because it is the first irreversible reaction that belongs to glycolysis alone. It is inhibited by ATP, by citrate and by low pH, and activated by AMP. Aldolase A acts on its product, cleaving fructose 1,6-bisphosphate into two triose phosphates.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
commitment: glucose 6-phosphate can still leave for glycogen or the HMP pathway, so nothing is committed at the kinase step
effectors: inhibited by ATP, citrate and low pH; activated by AMP

---

# Item

## id
CLM-FND-GLYCOLYSIS-YIELD-01

## concept_id
CON-FND-0F4A45886203EF

## subject
Complete oxidation of one mole of glucose

## predicate
yields

## object
Up to 32 moles of ATP aerobically and 2 moles anaerobically

## display_text
Glycolysis spends two ATP and makes four at substrate level, a net two; aerobically the two NADH add five more, making seven for glycolysis alone, and complete oxidation of the glucose yields 32 ATP. Anaerobically the NADH is spent on lactate and only the net two remain. A glucosyl unit taken from glycogen saves the hexokinase ATP and yields one more.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
accounting: 2.5 ATP per NADH and 1.5 per FADH2
distinguish: four ATP made at substrate level in glycolysis against a net gain of two

---

# Item

## id
CLM-FND-GLYCOLYSIS-INHIBITORS-01

## concept_id
CON-FND-0D6BFD870813B7

## subject
Fluoride, which binds the magnesium in the active site of enolase

## predicate
inhibits

## object
Enolase irreversibly, which is why fluoride is added to a blood sample before glucose estimation

## display_text
Glyceraldehyde 3-phosphate dehydrogenase is inhibited by arsenic and by iodoacetate, both blocking the SH group of its active site. Enolase is inhibited irreversibly by fluoride, which binds the magnesium in its active site — and that is why sodium fluoride goes into the tube before a blood glucose is measured, so the cells cannot consume the glucose in the sample.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
mechanism: fluoride binds active-site Mg²⁺; arsenic and iodoacetate block an active-site SH group
practical: fluoride is a glycolysis inhibitor in the tube, not an anticoagulant

---

# Item

## id
CLM-HEM-PYRUVATE-KINASE-DEFICIENCY-01

## concept_id
CON-HEM-585B833F845F62

## subject
The red blood cell, which lacks mitochondria

## predicate
depends entirely on

## object
Glycolysis and its substrate level phosphorylation for ATP, so loss of pyruvate kinase leaves it with no net ATP at all

## display_text
Glycolysis is the red cell's only source of ATP, and both of its substrate-level steps are needed for any net gain. Pyruvate kinase supplies two of the four ATP, so without it the two spent at the start are never repaid: the net yield falls to zero, no lactate is made, the ADP-to-ATP ratio rises, and the cell lyses.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
inference: the zero net yield follows from the book's own arithmetic; the book names no pyruvate kinase deficiency
not claimed: inheritance, prevalence, or any treatment

---

# Item

## id
CLM-FND-ANAEROBIC-LACTATE-01

## concept_id
CON-FND-403D06D1FB129F

## subject
Reduction of pyruvate to lactate by lactate dehydrogenase in the absence of oxygen

## predicate
serves to

## object
Regenerate the NAD⁺ that the glyceraldehyde 3-phosphate dehydrogenase step requires, allowing glycolysis to continue

## display_text
Without oxygen the respiratory chain cannot reoxidise NADH, and glycolysis stalls at glyceraldehyde 3-phosphate dehydrogenase for want of NAD⁺. Lactate dehydrogenase solves this by reducing pyruvate to lactate with that NADH, returning NAD⁺ to the pathway. The lactate is the by-product; the NAD⁺ is the point. It happens in red cells, which have no mitochondria, and in muscle during severe prolonged exercise.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
purpose: cofactor regeneration, not energy capture — no ATP is made at this step
sites: red cells continuously; skeletal muscle during severe prolonged exercise

---

# Item

## id
CLM-FND-PDH-COMPLEX-01

## concept_id
CON-FND-229C78C9EB0E78

## subject
The pyruvate dehydrogenase complex, which converts pyruvate to acetyl-CoA

## predicate
requires

## object
Five coenzymes — thiamine pyrophosphate, lipoate, coenzyme A, FAD and NAD⁺ — in an irreversible reaction

## display_text
Pyruvate entering the mitochondrion is oxidatively decarboxylated to acetyl-CoA by the pyruvate dehydrogenase complex. The reaction is irreversible and needs five coenzymes: thiamine pyrophosphate, lipoate, coenzyme A, FAD and NAD⁺. Congenital deficiency of the complex is the commonest cause of congenital lactic acidosis; thiamine deficiency and arsenic poisoning block the same step and raise lactate the same way.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
irreversibility: no enzyme reverses it, which is why acetyl-CoA cannot give glucose
failure modes: congenital deficiency, thiamine deficiency, arsenic poisoning

---

# Item

## id
CLM-FND-PYRUVATE-CARBOXYLASE-01

## concept_id
CON-FND-CA0F9E019BC5BA

## subject
Conversion of pyruvate to oxaloacetate

## predicate
is catalysed by

## object
Mitochondrial pyruvate carboxylase, an irreversible carboxylation requiring biotin, ATP and magnesium and activated allosterically by acetyl-CoA

## display_text
Pyruvate carboxylase adds CO2 to pyruvate to give oxaloacetate. It is a carboxylation, not an oxidation or a decarboxylation; it is irreversible, mitochondrial, and needs biotin, ATP and magnesium. Acetyl-CoA is its allosteric activator, which guarantees oxaloacetate for the citric acid cycle, and anti-insulin hormones induce it while insulin represses it.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
reaction class: carboxylation
cofactors: biotin and magnesium, with ATP as the energy source
regulation: allosterically activated by active acetate; induced by anti-insulin hormones

---

# Item

## id
CLM-FND-GLYCOGENESIS-UDP-GLUCOSE-01

## concept_id
CON-FND-1FC7D932D7EFDC

## subject
UDP-glucose, formed from glucose 1-phosphate and UTP

## predicate
is

## object
The immediate precursor for glycogen synthesis, from which glycogen synthase transfers glucosyl units onto the primer

## display_text
Glycogenesis begins by activating glucose: glucose 6-phosphate becomes glucose 1-phosphate, and UDP-glucose pyrophosphorylase then condenses that with UTP to give UDP-glucose, the immediate precursor. Glycogen synthase, the key enzyme, transfers glucosyl units from UDP-glucose onto a glycogen primer in α1,4 linkage; the branching enzyme makes the α1,6 branch points.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
nucleotide: UTP, not ATP, GTP or CTP
site: cytosol of liver and muscle mainly

---

# Item

## id
CLM-FND-GLYCOGENOLYSIS-PRODUCT-01

## concept_id
CON-FND-3905E3B98C2EC4

## subject
Muscle glycogen

## predicate
cannot

## object
Directly maintain blood glucose, because muscle lacks glucose 6-phosphatase, though liver glycogen can

## display_text
Glycogen phosphorylase releases glucose 1-phosphate, and only the residue at each branch point comes off as free glucose from the debranching enzyme, so the major product of glycogenolysis is glucose 1-phosphate. Phosphoglucomutase converts it to glucose 6-phosphate; the liver then has glucose 6-phosphatase and releases glucose to blood, while muscle has none and can only send it into glycolysis.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
major product: glucose 1-phosphate, with a single free glucose released per branch point
tissue difference: glucose 6-phosphatase is present in liver and absent in muscle

---

# Item

## id
CLM-FND-GLYCOGEN-REGULATION-01

## concept_id
CON-FND-CA74978B7B7ED1

## subject
Glucagon in liver and epinephrine in liver and muscle, acting through cAMP and protein kinase A

## predicate
phosphorylate

## object
Phosphorylase kinase, which then activates glycogen phosphorylase, while the same cascade phosphorylates and inactivates glycogen synthase

## display_text
One cAMP cascade switches glycogen metabolism in both directions at once. Protein kinase A phosphorylates phosphorylase kinase, which phosphorylates and activates glycogen phosphorylase, and the same kinase phosphorylates and inactivates glycogen synthase. Insulin reverses it through phosphodiesterase and protein phosphatase-1. Glucose 6-phosphate activates the synthase and inhibits the phosphorylase, ATP inhibits the phosphorylase, and calcium activates phosphorylase kinase in contracting muscle without any phosphorylation.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
cascade order: protein kinase A → phosphorylase kinase → glycogen phosphorylase
reciprocity: the same signal inactivates glycogen synthase and activates glycogen phosphorylase
not in this book: AMP as an allosteric activator of phosphorylase b

---

# Item

## id
CLM-FND-VON-GIERKE-01

## concept_id
CON-FND-1BE461A57AB76D

## subject
Von Gierke's disease, type I glycogen storage disease

## predicate
is caused by

## object
A defect in hepatic glucose 6-phosphatase, producing fasting hypoglycaemia, lactic acidosis, hyperlipidaemia and hyperuricaemia

## display_text
Von Gierke's disease is a defect of glucose 6-phosphatase in the liver. Glycogenolysis and gluconeogenesis both end in glucose 6-phosphate, so neither can release glucose and the child has fasting hypoglycaemia. The accumulated glucose 6-phosphate goes to lactate, giving lactic acidosis, and through the pentose phosphate pathway to excess purine synthesis and hyperuricaemia; epinephrine driven by the hypoglycaemia mobilises fat, giving hyperlipidaemia and a fatty liver.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
risk: no dose or drug is stated; the book's only advice is frequent carbohydrate-containing meals
four features: fasting hypoglycaemia, lactic acidosis, hyperlipidaemia, hyperuricaemia

---

# Item

## id
CLM-FND-GLUCONEOGENESIS-KEY-ENZYMES-01

## concept_id
CON-FND-C2C88203E4A918

## subject
The gluconeogenic key enzymes — glucose 6-phosphatase, fructose 1,6-bisphosphatase, pyruvate carboxylase and PEPCK

## predicate
bypass

## object
The three irreversible kinase steps of glycolysis, and all are cytosolic except mitochondrial pyruvate carboxylase

## display_text
Gluconeogenesis is the reversal of glycolysis except at its three irreversible kinases, which four key enzymes bypass: glucose 6-phosphatase for glucokinase, fructose 1,6-bisphosphatase for PFK-1, and pyruvate carboxylase with PEPCK for pyruvate kinase. That last bypass takes two irreversible reactions and straddles two compartments, because pyruvate carboxylase is mitochondrial and PEPCK cytosolic.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
count: four key enzymes for three glycolytic blocks
site: liver mainly and kidney, the tissues with glucose 6-phosphatase and fructose 1,6-bisphosphatase
compartments: pyruvate carboxylase mitochondrial, the rest cytosolic

---

# Item

## id
CLM-FND-GLUCONEOGENIC-SUBSTRATES-01

## concept_id
CON-FND-089E2C3E01031C

## subject
Acetyl-CoA, and therefore even-chain fatty acids and ketone bodies

## predicate
can never give

## object
Glucose, because the pyruvate dehydrogenase reaction that formed it is irreversible

## display_text
A gluconeogenic substrate is anything giving pyruvate, oxaloacetate or an intermediate of glycolysis or the citric acid cycle: lactate, the glucogenic amino acids — all of them except leucine and lysine — glycerol, and rarely the propionyl-CoA of odd-chain fatty acids. Acetyl-CoA can never give glucose, because pyruvate dehydrogenase is irreversible; so even-chain fatty acids and acetoacetate are not gluconeogenic.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
exclusions: leucine and lysine are purely ketogenic; acetyl-CoA and even-chain fatty acids give no glucose
entry points: lactate at pyruvate, glycerol at dihydroxyacetone phosphate

---

# Item

## id
CLM-FND-CORI-CYCLE-01

## concept_id
CON-FND-596FDA58EEEF0A

## subject
Lactate formed by glycolysis in red cells and in exercising muscle

## predicate
is converted to glucose by

## object
Hepatic gluconeogenesis, and the glucose returns to the muscle and red cell — the Cori cycle

## display_text
Lactate made by red cells continuously and by muscle in severe exercise diffuses into the blood and reaches the liver, where gluconeogenesis converts it to glucose; that glucose goes back to the muscle and the red cell to be used again. The cycle runs muscle to liver, not the other way, and it both maintains blood glucose and prevents lactic acidosis.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
direction: lactate muscle-to-liver, glucose liver-to-muscle
tissues: muscle or red cell, and liver — the brain is not part of it
purposes: maintains blood glucose and prevents lactic acidosis

---

# Item

## id
CLM-FND-GLUCOSE-ALANINE-CYCLE-01

## concept_id
CON-FND-E7214B4A8D8835

## subject
Nitrogen released when muscle degrades amino acids for energy

## predicate
is carried to the liver as

## object
Alanine, formed by transamination onto pyruvate, whose carbon skeleton returns as glucose

## display_text
Muscle transaminates the nitrogen from degraded amino acids onto pyruvate to make alanine, which travels to the liver. There transdeamination removes the nitrogen for the urea cycle and gluconeogenesis converts the pyruvate back to glucose, which returns to the muscle. Protein becomes the main source of blood glucose in prolonged fasting through this cycle.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
carrier: alanine
context: prolonged fasting, when protein becomes the main source of blood glucose

---

# Item

## id
CLM-FND-RECIPROCAL-REGULATION-01

## concept_id
CON-FND-7B3B4F0BEBF198

## subject
Increased oxidation of free fatty acids in the liver

## predicate
stimulates

## object
Gluconeogenesis and inhibits glucose oxidation, by raising ATP and acetyl-CoA at named allosteric sites

## display_text
Fasting and stress raise anti-insulin hormones, which drive lipolysis; the fatty acids reaching the liver are oxidised, and that oxidation does the switching. The ATP it produces inhibits PFK-1, pyruvate kinase and pyruvate dehydrogenase; the acetyl-CoA it produces activates pyruvate carboxylase and inhibits pyruvate dehydrogenase. Pyruvate is therefore pushed to oxaloacetate and glucose. Insulin reverses the whole arrangement, and glucagon is the main inducer of the gluconeogenic key enzymes.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
allosteric targets: ATP on PFK-1, pyruvate kinase and pyruvate dehydrogenase; acetyl-CoA on pyruvate carboxylase and pyruvate dehydrogenase
hormonal: glucagon the main inducer of gluconeogenic key enzymes; insulin the reverse

---

# Item

## id
CLM-FND-OBLIGATE-GLUCOSE-TISSUES-01

## concept_id
CON-FND-F6450B9D5AB855

## subject
The red cell, and to a lesser degree the brain

## predicate
depend on

## object
A continuing supply of glucose, which is the main function of gluconeogenesis during fasting

## display_text
Glucose is the only source of ATP for red cells, in every condition. The brain uses glucose as its main fuel and cannot metabolise fatty acids, because they travel bound to albumin and cannot cross the blood–brain barrier; it takes five to six days of starvation before it adapts to ketone bodies. Even fat-burning tissues need a basal supply of glucose, because pyruvate is where their oxaloacetate comes from.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
absolute: red cells, which have no mitochondria and never adapt
conditional: the brain, which adapts to ketone bodies over five to six days

---

# Item

## id
CLM-FND-G6P-BRANCH-POINT-01

## concept_id
CON-FND-051CF62C7920A3

## subject
Glucose 6-phosphate

## predicate
sits at

## object
The junction of glycolysis, gluconeogenesis, the pentose phosphate pathway, glycogenesis and glycogenolysis

## display_text
Glucose 6-phosphate is the first product of glucose entering any cell and the intermediate at the junction of five pathways — glycolysis, gluconeogenesis, the pentose phosphate pathway, glycogenesis and glycogenolysis. It is therefore the metabolite every cell uses for glycolysis, glycogen synthesis and the hexose monophosphate shunt alike; in the fed state its major fate is isomerisation to fructose 6-phosphate.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
five pathways: glycolysis, gluconeogenesis, pentose phosphate pathway, glycogenesis, glycogenolysis
limit: hydrolysis to free glucose is possible only in liver and kidney

---

# Item

## id
CLM-END-BLOOD-GLUCOSE-HORMONES-01

## concept_id
CON-END-0B615572003514

## subject
Insulin, secreted by the pancreatic β-cells in response to hyperglycaemia

## predicate
is

## object
The only hypoglycaemic hormone, opposed by glucagon, epinephrine, cortisol, growth hormone and thyroid hormones

## display_text
Insulin is the only hormone that lowers blood glucose: it raises uptake through GLUT-4, raises oxidation, glycogenesis and lipogenesis, and lowers hepatic glycogenolysis and gluconeogenesis, partly by activating phosphodiesterase and so degrading cAMP. Five anti-insulin hormones raise blood glucose — glucagon, which acts mainly on the liver, epinephrine, cortisol, growth hormone and thyroid hormones.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
roster: one hypoglycaemic hormone, five anti-insulin hormones
glucagon: acts mainly on liver, where it stimulates glycogenolysis and gluconeogenesis and inhibits glycolysis and glycogenesis
absent from the list: vasopressin

---

# Item

## id
CLM-END-HYPOGLYCAEMIA-CAUSES-01

## concept_id
CON-END-853A9833B36C99

## subject
Fasting hypoglycaemia from overutilisation of glucose

## predicate
is caused by

## object
Insulinoma, a pancreatic tumour releasing too much insulin, or an overdose of insulin or of a diabetes medication

## display_text
Hypoglycaemia gives hunger, tremors, drowsiness, sweating, a fast heart rate and tingling lips early, and difficulty concentrating, confusion and loss of consciousness as it deepens; below 45 to 50 mg/dL it may be fatal. Fasting hypoglycaemia follows either overutilisation — insulinoma, or an overdose of insulin or diabetes medication — or impaired production, as in severe liver disease, chronic kidney disease, adrenal or pituitary hypofunction, or von Gierke's disease.

## risk_class
treatment_or_action

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.95

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate biochemistry, module 103 BMS, Kasr Al Ainy year 1
risk: names a medication overdose as a cause; no dose, drug name or treatment protocol is stated anywhere
timing: fasting hypoglycaemia after six hours or more; postprandial two to five hours after a meal
diagnosis: estimation of blood glucose is the only evidence
