<!--
  103 BMS · Biochemistry · the 36 citations that tie the carbohydrate metabolism,
  bioenergetics and citric acid cycle MCQ claims to the department book.

  One kind, one file. The claims are the sibling file
  ./103-BMS-mcq-carbohydrate-claims.md; the source record is
  ./103-BMS-sources.md, which already carries src_300847a5fa64809d6c07.

  WHERE THE IDs COME FROM. One citation per claim, named
  CIT-KA-BIO103-<SLUG>-01 against CLM-<SYSTEM>-<SLUG>-01, and both are emitted
  from the same table so a slug cannot drift between the two files. The article
  callout_evidence blocks in ../article/103-BMS-mcq-carbohydrate.md name these
  same IDs.

  THE SOURCE, and nothing else:

    src_300847a5fa64809d6c07  Dpt book Biochemistry 103.pdf  160 pp

  locator_page is the PDF page. The book's printed page number is two lower —
  PDF page 22 carries printed page 20 — and every locator_detail names the
  printed page so a student holding the paper book can find the span.

  EVERY SPAN IS THE BOOK'S OWN WORDS, taken from the native text layer cached at
  scripts/kasr/extract/pagetext/src_300847a5fa64809d6c07.json and transcribed as
  printed rather than smoothed. Where the book is misspelt it is quoted that way,
  and the four that matter are flagged in their own context_note:

    · p. 5   — "catalized", for catalysed
    · p. 21  — "Fluroacetate", for fluoroacetate, and the heading "Invitro"
    · p. 30  — "PFK1" unhyphenated in the regulation section, "PFK-1" elsewhere
    · p. 27  — "Mg+2", for Mg²⁺

  An ellipsis inside a span always stands for a figure, a table or an intervening
  heading, and what it stands for is named in locator_detail. Nothing is elided
  to make a quotation say more than it does.

  ALL 36 ARE counts_as_claim_evidence: yes, WITH locator_type page AND AN EXACT
  locator_page, which is what that flag requires.
-->

# Item

## id
CIT-KA-BIO103-HIGH-ENERGY-BONDS-01

## claim_id
CLM-FND-HIGH-ENERGY-BONDS-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"II -High Energy Bonds [represented by a double curved dash (~)] These are bonds that upon hydrolysis liberate ≥ 7.3 kcal/mole as free energy. For example: ATP, 2-phosphoenolpyruvate, creatine phosphate, and S-adenosyl- methionine."

## locator_type
page

## locator_page
5

## locator_section
Bioenergetics · ATP Links Energy-Producing and Energy-Utilizing Systems · classification of hydrolysable bonds

## locator_detail
Heading II on printed page 3, immediately under heading I for low energy bonds.

## context_note
The paragraph above, on printed page 2, gives the same figure from the other direction: "Upon hydrolysis, each of these high energy bonds releases 7.3 Kcal/mole as free energy." Heading I, immediately above the span, lists the low energy bonds and gives glucose 6-phosphate as the worked example of a phosphate ester. The book states no conditions for the figure.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-ATP-ADP-CYCLE-01

## claim_id
CLM-FND-ATP-ADP-CYCLE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Cells do not store energy as ATP molecules. Creatine phosphate is the major storage form of energy in muscles. - In energy-rich states, creatine phosphate is formed from ATP in muscles. This requires a reversible reaction catalized by creatine kinase (CK). - In energy-poor states, the reverse occurs rapidly (2 to 7 seconds)."

## locator_type
page

## locator_page
5

## locator_section
Bioenergetics · ATP-ADP Cycle and Creatine Phosphate

## locator_detail
Third to sixth bullets under the heading, printed page 3. The book prints "catalized" for catalysed.

## context_note
The two bullets above the span establish why: "The amount of ATP present in any cell is sufficient to maintain its activity for only a few seconds, therefore the cycle occurs at a very rapid rate." The book names no store for any tissue other than muscle.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-ANABOLISM-CATABOLISM-01

## claim_id
CLM-FND-ANABOLISM-CATABOLISM-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"I- Anabolism (Energy-Utilizing Pathways): -Biosynthesis of large complex molecules from smaller precursors with consumption of energy. -Such reactions are accelerated at periods of growth or regeneration of cellular material. II- Catabolism (Energy-Producing Pathways): -Breakdown of large complex molecules (ingested food stuff or their stored forms) into smaller molecules with energy production."

## locator_type
page

## locator_page
3

## locator_section
Bioenergetics · Metabolism · I- Anabolism and II- Catabolism

## locator_detail
The two headings on printed page 1, under "Metabolism: It involves the chemical changes that various foodstuffs undergo inside the body."

## context_note
The three stages of catabolism follow immediately: stage 1 breaks macromolecules down "via breaking down low energy bonds" and "During this stage no free energy is trapped as ATP"; stage 2 makes acetyl-CoA with reduced coenzymes; stage 3 oxidises acetyl-CoA in the citric acid cycle. The book defines "amphibolic" only later, in the citric acid cycle chapter, and defines "anaplerotic" nowhere.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-REDOX-TERMINAL-ACCEPTOR-01

## claim_id
CLM-FND-REDOX-TERMINAL-ACCEPTOR-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Complex IV Cytochrome c Oxidase (Cytochrome a-a3) Hemoprotein composed of Cyt a, Cyt a3, and 2 Cu atoms It transfers electrons from cytochrome c to oxygen which combines with the two protons to form water."

## locator_type
page

## locator_page
7

## locator_section
Bioenergetics · Components of the Respiratory Chain · Complex IV, Cytochrome c Oxidase

## locator_detail
The complex IV row of the components table, printed page 5.

## context_note
The book prints no table of standard redox potentials anywhere, so that oxygen has the highest is inferred from the direction of flow this table sets out rather than from stated values. The chapter introduction on printed page 4 states the same end point: the chain "catalyzes the transfer of hydrogen atoms and/or electrons from reduced coenzymes (NADH+ H+ and FADH2) to oxygen to form H2O and ATP."

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-ETC-COMPONENTS-01

## claim_id
CLM-FND-ETC-COMPONENTS-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Components of the Respiratory Chain - Four protein complexes (integral proteins) called complexes I, II, III and IV. - Two mobile electron carriers called ubiquinone (CoQ) and cytochrome c (Cyt c). - In addition, complex V (ATP synthase) which catalyzes ATP generation."

## locator_type
page

## locator_page
6

## locator_section
Bioenergetics · A- Electron Transport Chain (ETC) (Respiratory Chain) · Components of the Respiratory Chain

## locator_detail
The three bullets under the heading, printed page 4.

## context_note
The components table on the next page assigns FMN to complex I and FAD to complex II and states that complex I "transfers 2 hydrogens from NADH to coenzyme Q" while complex II "transfers 2 hydrogens from FADH2 to CoQ". Complex III transfers electrons, not hydrogens, which is the basis for saying cytochromes are electron carriers.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-CHEMIOSMOSIS-01

## claim_id
CLM-FND-CHEMIOSMOSIS-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Complexes I, III and IV act as proton pumps. Complexes I and III translocate 4 protons, while complex IV translocates 2 protons only. - The inner mitochondrial membrane is impermeable to protons. The movement of protons creates an electrochemical gradient across the membrane, which is often called the “proton motive force” or the “proton gradient”. This proton gradient drives the synthesis of ATP by ATP-synthase complex."

## locator_type
page

## locator_page
8

## locator_section
Bioenergetics · The Chemiosmotic Theory of ATP Synthesis

## locator_detail
Second and third bullets on printed page 6, continuing the chemiosmotic theory section that opens on printed page 5.

## context_note
The complex V row of the components table states that four protons through the F0 subunit are required for one ATP and that F1, in the matrix, is the site of synthesis. The P:O section on printed page 7 gives 2.5 ATP per NADH and 1.5 per FADH2, and attributes the difference to FADH2 entering at CoQ and so missing complex I.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-UNCOUPLERS-01

## claim_id
CLM-FND-UNCOUPLERS-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"They dissociate or uncouple oxidation in respiratory chain from phosphorylation. So, the oxidation takes place without ATP synthesis and energy is released as heat. - These substances increase the permeability of the inner mitochondrial membrane to protons. Thus, abolish electrochemical gradient across the membrane."

## locator_type
page

## locator_page
10

## locator_section
Bioenergetics · Uncouplers

## locator_detail
The two opening bullets of the Uncouplers section, printed page 8.

## context_note
The regulation section on printed page 7 supplies the other half of this concept: coupling is normally tight, and the rate of oxidation depends on the availability of ADP, "the activator of the ATP synthase". The book names thyroxine, intravenous calcium and aspirin overdose as uncouplers and gives no mechanism for any of the three; it does not name dinitrophenol, which the question book uses as its type example.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-SUBSTRATE-LEVEL-PHOSPHORYLATION-01

## claim_id
CLM-FND-SUBSTRATE-LEVEL-PHOSPHORYLATION-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"It is oxidation of the substrate that results in generation of high energy bond which is utilized for phosphorylation of ADP or GDP to form ATP or GTP directly. - Substrate level phosphorylation occurs by three reactions in two pathways:"

## locator_type
page

## locator_page
12

## locator_section
Bioenergetics · B- Substrate Level Phosphorylation

## locator_detail
The two opening bullets of the section, printed page 10, followed by the three numbered reactions.

## context_note
The citric acid cycle chapter states the same fact from its own side on printed page 15: succinate thiokinase "is the only reaction in the TCA cycle that generates ATP at substrate level phosphorylation." The bioenergetics chapter writes the succinate thiokinase product as ATP while offering "ATP or GTP" in its definition; the nucleotide is not settled in the book.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-TCA-SITE-01

## claim_id
CLM-FND-TCA-SITE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"The enzymes of the TCA cycle are found in the mitochondrial matrix except succinate dehydrogenase which is tightly bound to the inner mitochondrial membrane (forms complex II of the respiratory chain). The enzymes of the TCA cycle are close to the enzymes of the respiratory chain."

## locator_type
page

## locator_page
16

## locator_section
TCA Cycle · Site

## locator_detail
The whole of the Site paragraph, printed page 14.

## context_note
Step 8 on printed page 15 gives malate dehydrogenase's coenzyme as NAD⁺ — "This produces the third NADH+H+ of the cycle" — which is what makes NAD⁺ the acceptor of hydrogen from malate. Step 6 gives succinate dehydrogenase's: "The coenzyme is FAD; that is converted to FADH2."

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-TCA-OXALOACETATE-01

## claim_id
CLM-FND-TCA-OXALOACETATE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Malate is dehydrogenated to oxaloacetate (C4) by the enzyme malate dehydrogenase. This produces the third NADH+H+ of the cycle. This reaction regenerates oxaloacetate, which is linked to a new acetyl molecule of acetyl-CoA to repeat the cycle again."

## locator_type
page

## locator_page
17

## locator_section
TCA Cycle · Steps of TCA Cycle · 8- Regeneration of oxaloacetate

## locator_detail
Step 8, printed page 15.

## context_note
The regulation section on printed page 18 names the three irreversible steps — citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase — which is why the cycle cannot be described as a set of reversible reactions.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-TCA-YIELD-01

## claim_id
CLM-FND-TCA-YIELD-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Thus, the overall reactions of one turn of the Krebs' cycle yield two molecules of CO2, three molecules of NADH, one molecule of FADH2 and one molecule of ATP."

## locator_type
page

## locator_page
17

## locator_section
TCA Cycle · summary of one turn, and Importance of Citric Acid Cycle · II. Energy production

## locator_detail
The closing sentence of the Steps section, printed page 15. The ten-ATP total is on printed page 17: "The oxidation of one mole of the acetyl group of acetyl-CoA through Krebsʹ cycle yields 10 moles of ATP", itemised as 7.5 + 1.5 + 1.

## context_note
The cycle diagram on printed page 16 marks "9 ATP" against the ETC arrow, which is the older 3-and-2 accounting. The prose on printed pages 15 and 17 gives ten, and the question book's printed key follows ten. Both figures are inside the same book and the discrepancy is recorded on the concept rather than resolved here.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-TCA-AMPHIBOLIC-01

## claim_id
CLM-FND-TCA-AMPHIBOLIC-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"The citric acid cycle is called an amphibolic pathway because it participates in both catabolism and anabolism. […] 3- Succinyl-CoA It is used for heme synthesis and oxidation of ketone bodies (Ketolysis)."

## locator_type
page

## locator_page
19

## locator_section
TCA Cycle · Importance of Citric Acid Cycle · III. Formation of important intermediates (anabolic function)

## locator_detail
The opening sentence of the Importance section on printed page 17 and entry 3 of the intermediates list on the same page. The ellipsis stands for the intervening headings I, II and the first two numbered intermediates.

## context_note
Entry 2 of the same list routes α-ketoglutarate to glutamate by aminotransferase, which is the book's only statement connecting a cycle intermediate to amino acid formation; the question book asks the looser question of which intermediate is used "for the formation of amino acids". Entry 5 gives the oxaloacetate-to-PEP step as "an important step in gluconeogenesis".

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-TCA-INHIBITORS-01

## claim_id
CLM-FND-TCA-INHIBITORS-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"1) Fluroacetate is a toxic compound used as rodenticide. In the body, it is converted to fluorocitrate which in turn inhibits the activity of aconitase. 2) α-ketoglutarate dehydrogenase is inhibited by arsenic compounds. They form a stable complex with the thiol groups of lipoic acid making it unavailable for enzyme activity."

## locator_type
page

## locator_page
21

## locator_section
TCA Cycle · Invitro inhibitors of Citric Acid Cycle

## locator_detail
The two numbered entries of the section, printed page 19. The book prints "Fluroacetate" and "Invitro".

## context_note
The book's own heading says "Invitro" while the text says the conversion happens "In the body", and the carbohydrate chapter on printed page 32 describes arsenic poisoning as a clinical event affecting pyruvate dehydrogenase, α-ketoglutarate dehydrogenase and the branched chain keto acid dehydrogenase. The contradiction is recorded in the concept's conflicts field. No dose, clinical picture or management is given by the book for either poisoning.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-CARBOHYDRATE-DIGESTION-01

## claim_id
CLM-GIT-CARBOHYDRATE-DIGESTION-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"‐ Digestion of carbohydrates starts in the mouth, then in the stomach to end in the small intestine. ‐ The end products of carbohydrate digestion are mainly glucose, galactose, and fructose. ‐ These monosaccharides are absorbed by different mechanisms from the intestine to the blood."

## locator_type
page

## locator_page
22

## locator_section
Carbohydrate Metabolism · Introduction to Carbohydrate Metabolism · Digestion and Absorption of Dietary Carbohydrates

## locator_detail
The three bullets of the section, printed page 20.

## context_note
The book names the dietary carbohydrates in the paragraph above — monosaccharides, disaccharides including maltose, lactose and sucrose, and polysaccharides including starch and cellulose. It does not describe the brush-border disaccharidases as a step, name a deficiency, or give any clinical picture or prevalence, and none is asserted.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-GLUCOSE-TRANSPORTERS-01

## claim_id
CLM-FND-GLUCOSE-TRANSPORTERS-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"GLUT-4 is insulin dependent, i.e. insulin promotes translocation of glucose transporters to the outer cell membrane surface, thus increasing the number of transporters and stimulates glucose uptake by these tissues. - In absence of insulin, the transporters are endocytosed to form intracellular pool and glucose uptake is reduced regardless of its extracellular concentration."

## locator_type
page

## locator_page
22

## locator_section
Carbohydrate Metabolism · Glucose Uptake by Different Tissues · I- Facilitative Transporters · b) Glucose transporter 4 (GLUT-4)

## locator_detail
The second and third bullets under GLUT-4, printed page 20.

## context_note
SGLT-2 is described on the following page: "Present primarily in the proximal renal tubules. ‐ It allows active uptake for about 90% of renal reabsorption of glucose from glomerular filtrate." The blood glucose chapter on printed page 52 adds the renal threshold of 180 mg/dL and lists "defects in renal tubular mechanism for reabsorption of glucose" among the causes of normoglycaemic glucosuria; the book names no SGLT-2 disease and no gene.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-HEXOKINASE-GLUCOKINASE-01

## claim_id
CLM-FND-HEXOKINASE-GLUCOKINASE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Has high Km i.e. low affinity for glucose and high Vmax. ‐ This allows the liver to utilize excess glucose for oxidation and storage. ‐ Also, it allows the β-cells of pancreas to respond to excess glucose by insulin secretion to lower the blood glucose to normal level."

## locator_type
page

## locator_page
30

## locator_section
Carbohydrate Metabolism · Regulation of Glycolysis · I- Allosteric Regulations · 1) Hexokinase (HK) and Glucokinase (GK or hexokinase D)

## locator_detail
The glucokinase column of the comparison table, "Affinity for glucose" row, printed page 28.

## context_note
The same table gives hexokinase "low Km i.e. high affinity for glucose and low Vmax", makes glucose 6-phosphate an allosteric inhibitor of hexokinase and states "No effect" for glucokinase, and records insulin as an inducer and glucagon as a repressor of glucokinase only. The book gives glucokinase's site as liver and pancreatic β-cells and does not mention the kidney.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-GLYCOLYSIS-COMMITTED-STEP-01

## claim_id
CLM-FND-GLYCOLYSIS-COMMITTED-STEP-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"PFK1 is the most important control site in the mammalian glycolytic pathway. This step is subject to extensive regulation because it is the first irreversible reaction unique to the glycolytic pathway. - PFK1 is allosterically inhibited by high levels of ATP but it is allosterically activated by AMP."

## locator_type
page

## locator_page
30

## locator_section
Carbohydrate Metabolism · Regulation of Glycolysis · I- Allosteric Regulations · 2) Phosphofructokinase-1 (PFK-1)

## locator_detail
The first two bullets under heading 2, printed pages 28 and 29.

## context_note
The steps section on printed page 23 gives aldolase A its substrate: it "catalyzes cleavage of fructose 1,6-bisphosphate into two triose phosphates". The book never uses the phrase "committed step", which is the question book's wording for the same idea.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-GLYCOLYSIS-YIELD-01

## claim_id
CLM-FND-GLYCOLYSIS-YIELD-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Complete oxidation of one mole of glucose yields up to 32 moles of ATP under aerobic conditions, but 2 moles only under anaerobic conditions."

## locator_type
page

## locator_page
36

## locator_section
Carbohydrate Metabolism · Energy Yield from Glucose Oxidation

## locator_detail
The opening sentence of the section, printed page 34, above the itemised table that totals 32 and 2.

## context_note
The Importance of Glycolysis section on printed page 26 itemises the glycolytic half: two ATP utilised, four produced by substrate level phosphorylation at phosphoglycerate kinase and pyruvate kinase, and five from the two NADH through the chain, "the net gain of chemical energy is 7 ATP molecules per one glucose molecule". The 33 figure for glycogen-derived glucose is not printed in the book; it follows from glycogenolysis yielding glucose 1-phosphate, which phosphoglucomutase converts without spending ATP.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-GLYCOLYSIS-INHIBITORS-01

## claim_id
CLM-FND-GLYCOLYSIS-INHIBITORS-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"It is inhibited irreversibly by fluoride by binding with Mg+2 which is present in the active site of the enzyme. So, fluoride is added to blood samples prior to glucose estimation to prevent glycolysis and to obtain accurate glucose estimation."

## locator_type
page

## locator_page
29

## locator_section
Carbohydrate Metabolism · Importance of Glycolytic Intermediates · Clinical Correlation · 2. Enolase

## locator_detail
Clinical Correlation entry 2, printed page 27.

## context_note
Entry 1 immediately above gives the other inhibitor: glyceraldehyde 3-phosphate dehydrogenase "is inhibited by arsenic (arsenic poisoning) and iodoacetate by blocking the SH group present in the active site of the enzyme." The question book asks about arsenate rather than arsenite; the book does not distinguish the two species at this step and nothing about which is meant is asserted.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-PYRUVATE-KINASE-DEFICIENCY-01

## claim_id
CLM-HEM-PYRUVATE-KINASE-DEFICIENCY-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"- As RBCs lack mitochondria, glycolysis is the only source of ATP through substrate level phosphorylation."

## locator_type
page

## locator_page
28

## locator_section
Carbohydrate Metabolism · Importance of Glycolysis · II- Importance in RBCs

## locator_detail
The first bullet of the RBC section, printed page 26.

## context_note
The energy accounting on the same page gives four ATP produced at substrate level "by phosphoglycerate kinase and pyruvate kinase" against two utilised, so removing the pyruvate kinase pair leaves two produced against two spent. Pyruvate kinase deficiency as a named disease is the question book's, not this book's, and only the arithmetic consequence is claimed here.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-ANAEROBIC-LACTATE-01

## claim_id
CLM-FND-ANAEROBIC-LACTATE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"‐ This reaction allows glycolysis to proceed in the absence of oxygen by regenerating sufficient NAD+ required by glyceraldehyde 3-phosphate dehydrogenase step. - This occurs in red cells (no mitochondria) and in muscles during severe prolonged muscular exercise (relative oxygen deficiency)."

## locator_type
page

## locator_page
26

## locator_section
Carbohydrate Metabolism · Steps of Glycolysis · 10- Lactate dehydrogenase (LDH) (Under anaerobic conditions)

## locator_detail
The second and third bullets of step 10, printed page 24.

## context_note
The anaerobic energy accounting on printed page 26 confirms that no ATP comes from this step: "Under anaerobic state, the net gain of chemical energy is 2 ATP molecules only: NADH+H+ produced is not oxidized by ETC. (4 ATP produced – 2 ATP utilized = 2 ATP)."

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-PDH-COMPLEX-01

## claim_id
CLM-FND-PDH-COMPLEX-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Pyruvate undergoes oxidative decarboxylation to acetyl-CoA (active acetate). - This is an irreversible reaction, and no enzyme can reverse it. - This step is catalyzed by pyruvate dehydrogenase complex (PDH) which requires five coenzymes i.e., thiamine pyrophosphate (TPP), lipoate, CoA, FAD and NAD+."

## locator_type
page

## locator_page
33

## locator_section
Carbohydrate Metabolism · Conversion of Pyruvate to Active Acetate and Oxaloacetate · A- Conversion of Pyruvate to Active Acetate

## locator_detail
The second, third and fourth bullets of the section, printed page 31.

## context_note
The Metabolic Disorders of PDH section on printed page 32 supplies the three failure modes: "1. Congenital deficiency of PDH: the most common cause of congenital lactic acidosis… 2. Thiamine (Vitamin B1) deficiency: It produces accumulation of pyruvate that is converted to lactate, so it leads to lactic acidosis. 3. Arsenic poisoning". The question book sets a thiamine-deficient patient with heart disease; the book covers beriberi separately in its vitamins chapter and does not connect the cardiac failure to this enzyme.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-PYRUVATE-CARBOXYLASE-01

## claim_id
CLM-FND-PYRUVATE-CARBOXYLASE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Irreversible reaction catalyzed by mitochondrial enzyme pyruvate carboxylase. […] Active acetate acts as an allosteric activator of pyruvate carboxylase. This is very important to ensure a sufficient supply of oxaloacetate for the continuation of TCA cycle."

## locator_type
page

## locator_page
35

## locator_section
Carbohydrate Metabolism · B- Conversion of Pyruvate to Oxaloacetate

## locator_detail
The opening line of the section and the allosteric regulation paragraph beneath the reaction diagram, printed page 33. The ellipsis stands for the reaction scheme, which prints ATP, biotin, CO2 and Mg²⁺ on the arrow.

## context_note
The same page gives the hormonal control: anti-insulin hormones — glucagon, epinephrine and glucocorticoids — act as inducers, and insulin acts as a repressor. The gluconeogenesis chapter names pyruvate carboxylase as one of the four gluconeogenic key enzymes.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-GLYCOGENESIS-UDP-GLUCOSE-01

## claim_id
CLM-FND-GLYCOGENESIS-UDP-GLUCOSE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"1) Activation of glucose: to form uridine diphosphate glucose (UDP-Glc) which is the immediate precursor for glycogen synthesis. […] 2) Chain elongation: by glycogen synthase enzyme. 3) Formation of branches: by the branching enzyme."

## locator_type
page

## locator_page
41

## locator_section
Carbohydrate Metabolism · GLYCOGEN METABOLISM · I- GLYCOGENESIS · Steps

## locator_detail
Steps 1 to 3, printed page 39. The ellipsis stands for the reaction scheme, which prints the UTP and PPi arrows across the UDP-Glc pyrophosphorylase step.

## context_note
The reaction scheme in the span shows the whole activation: glucose to glucose 6-phosphate by glucokinase or hexokinase with ATP, to glucose 1-phosphate by mutase, then to UDP-glucose with UTP. The ATP is spent at the first step and the UTP at the activation step, which is what the question distinguishes.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-GLYCOGENOLYSIS-PRODUCT-01

## claim_id
CLM-FND-GLYCOGENOLYSIS-PRODUCT-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Liver glycogen maintains blood glucose between meals. After 12–18 hours of fasting, liver glycogen is almost totally depleted. Muscle glycogen does not directly maintain blood glucose because muscle lacks glucose 6-phosphatase. However, muscle glycogen can indirectly supply a limited amount of blood glucose via Cori cycle."

## locator_type
page

## locator_page
41

## locator_section
Carbohydrate Metabolism · GLYCOGEN METABOLISM · Function of glycogen

## locator_detail
The Function of glycogen paragraph, printed page 39.

## context_note
The glycogenolysis section on printed page 42 confirms the product and the fate: "The major product of glycogen breakdown is glucose-1-phosphate which is converted to glucose 6-phosphate by phosphoglucomutase. - In liver, glucose 6-phosphate is mainly dephosphorylated by glucose 6-phosphatase releasing glucose to the blood. - In muscles (lack of glucose 6-phosphatase), glucose 6-phosphate undergoes glycolysis." The book gives no ratio of glucose to glucose 1-phosphate.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-GLYCOGEN-REGULATION-01

## claim_id
CLM-FND-GLYCOGEN-REGULATION-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"b) Glucagon (liver) and epinephrine (liver and muscles) (Fasting state): Both phosphorylate (activate) phosphorylase kinase and accordingly activate glycogen phosphorylase which increases the rate of glycogenolysis."

## locator_type
page

## locator_page
44

## locator_section
Carbohydrate Metabolism · II- GLYCOGENOLYSIS · Regulation of Activity of Glycogen Phosphorylase · I- Hormonal regulation

## locator_detail
Entry b under hormonal regulation, printed page 42.

## context_note
The reciprocal summary on printed page 43 completes it: "Insulin activates glycogen synthase and inactivates glycogen phosphorylase; this action is reversed by glucagon in liver and epinephrine in liver and muscles. - Glucose-6-phosphate acts as an allosteric activator of glycogen synthase and allosteric inhibitor of glycogen phosphorylase." The same page gives calcium activating "the inactive phosphorylase kinase without phosphorylation" during muscle contraction. The book nowhere prints AMP as an activator of phosphorylase b, which the question book's key asserts; that gap is recorded in the concept's conflicts field.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-VON-GIERKE-01

## claim_id
CLM-FND-VON-GIERKE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Cause: It is due to defect in glucose-6-phosphatase in liver. -The principal metabolic effects are fasting hypoglycemia, lactic acidosis, hyperlipidemia, and hyperuricemia."

## locator_type
page

## locator_page
46

## locator_section
Carbohydrate Metabolism · Glycogen Storage Diseases (GSD) · Von Gierke's disease (type I GSD)

## locator_detail
The cause and effects lines, printed page 44, above the four biochemical bases.

## context_note
The four biochemical bases follow on the same page and are what let a student derive rather than memorise the picture; the hyperuricaemia is doubly explained, by excess purine synthesis and by lactate competing with urate for renal excretion. The book calls the disease "one of the most common glycogen storage diseases worldwide" and gives no figure.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-GLUCONEOGENESIS-KEY-ENZYMES-01

## claim_id
CLM-FND-GLUCONEOGENESIS-KEY-ENZYMES-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"It occurs mainly in the liver and to a lesser extent in kidneys due to the presence of glucose 6-phosphatase and fructose 1,6-bisphosphatase. It is mainly the reversal of glycolysis, except for the three irreversible kinases […] All gluconeogenic key enzymes are present in the cytosol except the mitochondrial pyruvate carboxylase."

## locator_type
page

## locator_page
47

## locator_section
Carbohydrate Metabolism · GLUCONEOGENESIS · Site and Steps

## locator_detail
The Site and Steps paragraph, printed page 45. The ellipsis stands for the two-column table pairing the three glycolytic key enzymes with the four gluconeogenic ones.

## context_note
The table inside the span is what gives the count of four: glucokinase against glucose 6-phosphatase, phosphofructokinase-1 against fructose 1,6-bisphosphatase, and pyruvate kinase against both pyruvate carboxylase and phosphoenolpyruvate carboxykinase. The book does not itself write the number four. The dicarboxylic acid shuttle diagram on the same page shows oxaloacetate leaving the mitochondrion as malate.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-GLUCONEOGENIC-SUBSTRATES-01

## claim_id
CLM-FND-GLUCONEOGENIC-SUBSTRATES-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Even chain fatty acid oxidation produces multiple molecules of acetyl CoA only. Acetyl CoA never gives glucose because pyruvate dehydrogenase reaction is irreversible."

## locator_type
page

## locator_page
50

## locator_section
Carbohydrate Metabolism · Gluconeogenic Substrates · 4. Odd chain fatty acids (rare)

## locator_detail
The second bullet of entry 4, printed page 48.

## context_note
Entry 2 on printed page 47 gives the amino acid rule: "All amino acids can give glucose except leucine and lysine (purely ketogenic)." Entry 3 on printed page 48 has glycerol entering through glycerol kinase and glycerol 3-phosphate dehydrogenase at dihydroxyacetone phosphate. Some international sources classify more amino acids as ketogenic; the book's two-name list is what is taught.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-CORI-CYCLE-01

## claim_id
CLM-FND-CORI-CYCLE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"In the liver, lactate is converted to glucose by gluconeogenesis. Glucose goes back to the red cells or muscles and is reutilized for production of energy (Cori cycle). […] Importance of Cori Cycle It helps to maintain blood glucose level and prevents lactic acidosis."

## locator_type
page

## locator_page
49

## locator_section
Carbohydrate Metabolism · Gluconeogenic Substrates · 1. Lactate · CORI CYCLE

## locator_detail
The second bullet of entry 1 and the Importance line beneath the cycle diagram, printed page 47. The ellipsis stands for the diagram itself.

## context_note
The first bullet of the same entry establishes the sources: lactate "is formed during anaerobic oxidation of glucose in red blood cells (continuous source) and muscles (during severe exercise) then diffuses to the blood then to the liver." The return leg depends on hepatic glucose 6-phosphatase, which the glycogen chapter on printed page 42 states muscle lacks.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-GLUCOSE-ALANINE-CYCLE-01

## claim_id
CLM-FND-GLUCOSE-ALANINE-CYCLE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"When muscles degrade amino acids for energy production, the resulting nitrogen is transmitted to pyruvate to form alanine. Then alanine in the liver is converted to pyruvate, which is converted to glucose."

## locator_type
page

## locator_page
49

## locator_section
Carbohydrate Metabolism · Gluconeogenic Substrates · 2. Glucogenic amino acids · Glucose-Alanine Cycle

## locator_detail
The two sentences under the Glucose-Alanine Cycle heading, printed page 47, above the cycle diagram.

## context_note
The bullet above states when it matters: "Proteins or amino acids become the main source of blood glucose especially after prolonged fasting by glucose-alanine cycle." The diagram labels the muscle limb transamination and the liver limb transdeamination. No figure is given for the share of substrate arriving as alanine.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-RECIPROCAL-REGULATION-01

## claim_id
CLM-FND-RECIPROCAL-REGULATION-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"- Increased fatty acid oxidation stimulates gluconeogenesis and inhibits glucose oxidation in the liver by the following mechanisms: a) It increases the production of ATP, which produces allosteric inhibition of phosphofructokinase-1, pyruvate kinase and pyruvate dehydrogenase. b) The excess acetyl-CoA, produced by fatty acid oxidation in the liver, allosterically stimulates pyruvate carboxylase and inhibits pyruvate dehydrogenase, thus directs pyruvate to gluconeogenesis."

## locator_type
page

## locator_page
51

## locator_section
Carbohydrate Metabolism · Regulation of Gluconeogenesis · I- Allosteric regulation

## locator_detail
The third bullet and its two lettered mechanisms, printed page 49.

## context_note
The chapter opening on printed page 45 sets the timing that decides the exam item: gluconeogenesis "starts 4 to 6 hours after the last meal at a slow rate and continues throughout the fasting state to become the main source of blood glucose after 12-18 hours due to depletion of liver glycogen." An overnight fast therefore sits on the boundary, which is why the question book's key prefers the fatty-acid option over the overnight-fast option; that ambiguity is recorded in the concept's conflicts field.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-OBLIGATE-GLUCOSE-TISSUES-01

## claim_id
CLM-FND-OBLIGATE-GLUCOSE-TISSUES-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"‐ In brain tissue: Glucose is the main source of energy to brain tissue which cannot metabolize fatty acids (fatty acids are transported in the form of FFA-albumin complex which cannot pass the blood-brain barrier). Also, brain tissue takes about 5 to 6 days to adapt for oxidation of ketone bodies during starvation. ‐ In red cells: Glucose is the only source of ATP for red cells."

## locator_type
page

## locator_page
50

## locator_section
Carbohydrate Metabolism · Importance of Gluconeogenesis · 1. Maintenance of blood glucose

## locator_detail
The first two sub-bullets under heading 1, printed page 48.

## context_note
The third sub-bullet gives the basal requirement of every other tissue: glucose "provides these tissues with oxaloacetate (via pyruvate) for optimal activity of citric acid cycle. Therefore, fatty acid and ketone body oxidation cannot proceed without a minimal supply of glucose during fasting or starvation." No figure is given for the share of brain fuel that ketone bodies eventually supply.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-G6P-BRANCH-POINT-01

## claim_id
CLM-FND-G6P-BRANCH-POINT-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Glucose 6-phosphate is an important intermediate at the junction of several metabolic pathways (glycolysis, gluconeogenesis, the pentose phosphate pathway, glycogenesis, and glycogenolysis)."

## locator_type
page

## locator_page
29

## locator_section
Carbohydrate Metabolism · III. Importance of Glycolytic Intermediates · 1)

## locator_detail
Entry 1 of the intermediates list, printed page 27.

## context_note
The book does not rank the fates of glucose 6-phosphate in the fed state. That isomerisation to fructose 6-phosphate is the major one follows from the statement on printed page 22 that glycolysis "is the main pathway for glucose oxidation" in all cells, and from the glycolysis steps section, where phosphohexose isomerase is step 2. The ranking itself is not printed.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-BLOOD-GLUCOSE-HORMONES-01

## claim_id
CLM-END-BLOOD-GLUCOSE-HORMONES-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Hormonal Regulation of Blood Glucose 1. Insulin (The Only Hypoglycemic Hormone) 2. Anti-insulin Hormones - Glucagon - Epinephrine - Cortisol - Growth hormone - Thyroid hormones"

## locator_type
page

## locator_page
55

## locator_section
Carbohydrate Metabolism · BLOOD GLUCOSE · II- Regulation by Hormones

## locator_detail
The two-column figure heading the section, printed page 53.

## context_note
The insulin mechanisms follow immediately, and the glycolysis chapter on printed page 29 gives insulin's cAMP route: it activates "Phosphodiesterase that decreases cAMP synthesis, and thus prevents activation of protein kinase A." Vasopressin appears nowhere in the book's hormone list, which is the basis for saying it does not affect serum glucose. The book says glucagon "affects liver cells mainly" but never states that muscle lacks the glucagon receptor.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-HYPOGLYCAEMIA-CAUSES-01

## claim_id
CLM-END-HYPOGLYCAEMIA-CAUSES-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"a) Insulinoma: A tumor in the pancreas which releases too much insulin. b) Medications: for example, overdose of insulin or diabetes medications."

## locator_type
page

## locator_page
57

## locator_section
Carbohydrate Metabolism · Hypoglycemia · I- Fasting Hypoglycemia · 1. Causes that produce overutilization of glucose

## locator_detail
Entries a and b under cause group 1, printed page 55.

## context_note
The symptom list is on printed page 54: "Early signs and symptoms of mild hypoglycemia usually include hunger, tremors, drowsiness, sweating, accelerated heart rate and tingling lips", and "Estimation of blood glucose is the only evidence of hypoglycemia." The book gives no treatment. Glucagon as an emergency measure appears in the question book's scenario only, and no dose, route or protocol is asserted; the claim is marked treatment_or_action so it cannot auto-publish.

## confidence
0.95

## counts_as_claim_evidence
yes
