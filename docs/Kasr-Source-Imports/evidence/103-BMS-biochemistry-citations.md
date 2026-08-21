<!--
  103 BMS · Biochemistry · the 25 citations that tie this subject's claims to
  the department book.

  One kind, one file: every record here is a citation. The claims they support
  are the sibling file ./103-BMS-biochemistry-claims.md and the source they name
  is ./103-BMS-sources.md. Nothing here mints a claim ID or a source ID.

  WHERE THE IDs COME FROM. Every `id` below is already written down in a
  `callout_evidence` block in ../article/103-BMS-biochemistry.md. The articles
  were authored first and point at these citations by name, so the citations are
  authored to match the articles rather than to a scheme invented here. All 25
  are used, none is renamed, and nothing else is added.

  This is deliberate, and it is the correction of a known mistake. The other
  three subjects' articles were written before their citations existed and
  invented all eighteen citation IDs — `CIT-ANA103-…` where the real records
  turned out to be `CIT-KA-ANAT-…`. Nothing in the validator checks a
  `callout_evidence` ID, so those would have shipped as evidence links pointing
  at nothing.

  25 CITATIONS, 28 CLAIMS. Three claims are left with no citation because the
  articles name none for them:

    CLM-FND-HMP-NADPH-01             CLM-REN-URICOSURIC-DRUGS-01
    CLM-REN-GOUT-TOPHI-DIAGNOSIS-01

  All three are quotable from the book — file pages 38, 131 and 130 — and the
  hand-off report gives the wording and page each would need. They are not
  written here because no citation ID exists for them and no ID is minted in
  this batch.

  THE SOURCE, and nothing else:

    src_300847a5fa64809d6c07  Dpt book Biochemistry 103.pdf  160 pp

  The two 2025 end-of-year papers in ./103-BMS-sources.md are `is_assessment:
  yes` and are cited by nothing here. An exam paper is evidence about what a
  faculty examines, never evidence that something is medically true.

  EVERY SPAN IS THE BOOK'S OWN WORDS, transcribed as printed and not smoothed.
  Each was found in the cached page text at
  scripts/kasr/extract/pagetext/src_300847a5fa64809d6c07.json and then read back
  off the rendered page before being written down. Where the book is
  misspelt or ungrammatical it is quoted that way, and the four that matter are
  flagged in their own `context_note`:

    · p. 159 — "α-Tochopherol", for α-tocopherol
    · p. 137 — "1,25 dihydroxycholecolciferol", for cholecalciferol
    · p. 125 — the summary table's "Hepatotoxic Jaundice" against the prose's
               "hepatocellular jaundice" on p. 124
    · p. 82  — "Transport TAG from liver to extrahepatic tissue", singular
               "tissue" in the table where p. 79 has the plural

  Bullet markers and numbering are kept as printed, including the book's own
  "‐" (U+2010) bullet; where a span crosses a line or a list item the pieces are
  joined with a single space. Justification whitespace inside a printed line is
  normalised to one space, because it is typesetting and not wording. Nothing is
  added. Where a table row is quoted, the cells are read left to right in the
  column order the table prints, and `locator_detail` names that order.

  LOCATORS. `locator_page` is the page number **in the file**, which is what the
  field means. This book's printed folio runs TWO behind its file page — file
  page 15 is printed "13" — so every `locator_detail` names the printed folio as
  well, for a reader holding the paper book. Every citation carries a page:
  `counts_as_claim_evidence: yes` requires an exact locator or the audit rejects
  it at rest.

  EVIDENCE ROLE. All 25 are `local_curriculum`. This is the faculty's own
  department book — the authority of record for what this module teaches, not
  independent verification of a general medical fact. Nothing here has been
  checked against an international reference and no citation claims it has.

  THREE CITATIONS BACK TREATMENT CLAIMS (PKU diet, allopurinol) or sit beside
  one. None quotes a dose, because the book states none anywhere. The uricosuric
  class has no citation at all, for the reason given above; note that the
  book's heading for it names no member of the class, and neither does the
  examiner's model answer.

  Import order: sources → articles → concepts → claims → citations → spans.
-->

# Item

## id
CIT-KA-BIO103-ROS-DEFENCE-01

## claim_id
CLM-FND-ROS-ANTIOXIDANT-DEFENCE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"2) Scavenger antioxidants that deal with the existing ROS: a) Vitamins: ascorbic acid (vitamin C), tocopherols (vitamin E), carotenes (provitamin A) and pyridoxine (vitamin B6). b) Enzymes: superoxide dismutase that is widely distributed in tissues. c) Proteins: owing to their content of free thiol group (derived from the amino acid cysteine). Cysteine, itself, is an antioxidant and its derivative acetylcysteine is used therapeutically as an antioxidant. d) Metabolic end-products: bilirubin and uric acid function as antioxidants. They are oxidized into biliverdin and allantoin respectively."

## locator_type
page

## locator_page
15

## locator_section
Bioenergetics · Mechanisms of combating free radicals · 2) Scavenger antioxidants that deal with the existing ROS

## locator_detail
The four lettered entries a) to d) under heading 2, printed page 13.

## context_note
Heading 1 immediately above this span, "Prevention of generation", is the other half of the mechanism and lists chelation and the enzymes catalase, peroxidases and glutathione peroxidase; the span quoted here is scavenging only. The 2025 paper's question I-1 asks for one enzyme and one metabolic end product, which are entries b) and d). The book asserts that bilirubin and uric acid "function as antioxidants" without giving the reactions, the conditions, or what share of antioxidant capacity they account for, and nothing beyond its words is claimed.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-H2O2-FATE-01

## claim_id
CLM-FND-H2O2-DISPOSAL-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Fate of Hydrogen Peroxide Hydrogen peroxide (H2O2) is a normal metabolite produced by either flavoprotein oxidases or superoxide dismutase reaction. Hydrogen peroxide is metabolized in more physiological fashion by catalase and peroxidases e.g. glutathione peroxidase."

## locator_type
page

## locator_page
14

## locator_section
Bioenergetics · Fate of Hydrogen Peroxide

## locator_detail
The heading and the two sentences beneath it, printed page 12. The figure immediately below is the one the 2025 paper reproduced for Diagram (1).

## context_note
The prose names the two routes; the selenium cofactor of glutathione peroxidase, the FAD of glutathione reductase, and the NADPH+H⁺/NADP⁺ couple that closes the glutathione loop appear only in the figure printed beneath this text, labelled "Glutathione peroxidase / Se", "Catalase", "2 G – SH", "G-S – S-G" and "Glutathione reductase (FAD)". The book prints the same figure a second time on file page 38 without the catalase branch. The claim's point — that the glutathione arm consumes NADPH and the catalase arm does not — is read off the figure, not off the sentences.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-KREBS-KEY-01

## claim_id
CLM-FND-KREBS-KEY-ENZYMES-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"In the Krebs' cycle there are three irreversible steps. They are catalyzed by citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase, which are the rate-controlling key enzymes of the cycle."

## locator_type
page

## locator_page
20

## locator_section
TCA Cycle · Regulation of Citric Acid Cycle

## locator_detail
The opening two sentences of the section, printed page 18.

## context_note
The paragraphs that follow, lettered A) onwards, give the regulation of each of the three: availability of oxaloacetate and acetyl-CoA for citrate synthase, feedback inhibition by succinyl-CoA, and the ATP/ADP and NADH/NAD⁺ ratios. The claim asserts only the identification of the three enzymes as the irreversible, rate-controlling steps, which is what this span states.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-G6PD-01

## claim_id
CLM-HEM-G6PD-HMP-KEY-ENZYME-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Regulation of Pentose Phosphate Pathway I-Allosteric regulation NADPH is a feedback inhibitor of glucose 6-phosphate dehydrogenase. II-Hormonal regulation Insulin acts as an inducer for G6PD and increases its synthesis."

## locator_type
page

## locator_page
39

## locator_section
Carbohydrate Metabolism · Regulation of Pentose Phosphate Pathway

## locator_detail
The whole of that section, both headings and both sentences, printed page 37.

## context_note
The book never prints the phrase "key enzyme" for G6PD, although the 2025 paper's Diagram (1) b asks for "the key enzyme of this pathway". Two things in the book carry that identification. This span is the entire regulation of the pathway and it concerns G6PD alone, which is what "key enzyme" means in this book's usage — the chapter on glycolysis defines its key enzymes as the irreversible, regulated ones. And the "Oxidative Phase of HMP" figure on file page 37, printed page 35, labels the first step "G-6-phosphate Dehydrogenase (G6PD)" and marks it "Block in cases of Favism". The claim states the position and the regulation and does not put the book's words in a form it did not print.

## confidence
0.85

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-FAVISM-01

## claim_id
CLM-HEM-FAVISM-HAEMOLYSIS-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Mechanism: - Red cells are liable for oxidative damage by H2O2 due to their role in oxygen transport. H2O2 causes lipid peroxidation, which increases the cell membrane fragility. - The red cell capacity to protect itself from oxidative damage is markedly decreased due to decreased concentration of NADPH which is required by glutathione reductase for the regeneration of reduced glutathione (GSH) for removal of H2O2 (by glutathione peroxidase). - Exposure of red cells to oxidizing agents produces lysis of red cells and development of hemolytic anemia and jaundice. - Administration of certain drugs (primaquine, aspirin or sulfonamides) or eating Fava beans (containing oxidants), stimulate the production of H2O2 and produce lysis of the fragile red cells."

## locator_type
page

## locator_page
39

## locator_section
Carbohydrate Metabolism · Favism · Mechanism

## locator_detail
The four bulleted steps under "Mechanism" in the boxed Favism panel, printed page 37.

## context_note
The panel opens "It is the most common human enzymopathy" and gives no prevalence figure; none is supplied, and a local Egyptian figure should be attached before publication rather than a Western one imported. The book's own treatment line, quoted here only as context, is "The only treatment is to avoid the above factors and by blood transfusion during the attack of hemolysis" — no drug is named to treat favism and none is written into any claim. The mechanism is a failure of reducing power and not of ATP: G6PD makes no ATP, and red cell glycolysis is intact.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-RBC-GLYCOLYSIS-01

## claim_id
CLM-HEM-RBC-GLYCOLYSIS-ATP-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"II- Importance in RBCs: - As RBCs lack mitochondria, glycolysis is the only source of ATP through substrate level phosphorylation. - NADH+H+ generated by glyceraldehyde 3-P dehydrogenase step maintains iron of hemoglobin in the ferrous state (Fe2+). Fe2+ of heme when oxidized to Fe3+, Hb becomes metHb which is inactive as oxygen carrier."

## locator_type
page

## locator_page
28

## locator_section
Carbohydrate Metabolism · Importance of Glycolysis · II- Importance in RBCs

## locator_detail
The first two bullets under heading II, printed page 26.

## context_note
Section I immediately above gives the energy arithmetic the claim's qualifier refers to: seven ATP per glucose aerobically, two anaerobically because the NADH is not oxidised by the electron transport chain. A red cell only ever gets the anaerobic figure, and the book states the reason — no mitochondria — in the first bullet of this span.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-BPG-SHUNT-01

## claim_id
CLM-HEM-BPG-SHUNT-NO-ATP-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"2,3-bisphosphoglycerate mutase catalyzes the conversion of 1,3-bisphosphoglycerate into 2,3-bisphosphoglycerate (2,3-BPG) bypassing the reaction catalyzed by phosphoglycerate kinase (site of ATP yield)."

## locator_type
page

## locator_page
28

## locator_section
Carbohydrate Metabolism · Importance of Glycolysis · II- Importance in RBCs

## locator_detail
The third bullet under heading II, printed page 26, with the "BPG Shunt in Red Blood Cells" figure directly beneath it.

## context_note
The book does not print the sentence "the shunt yields no net ATP". It prints the bypass and, in the same parenthesis, identifies the bypassed step as the "site of ATP yield"; the figure below shows the phosphoglycerate kinase arm carrying ADP to ATP and the shunt arm rejoining at 3-phosphoglycerate through 2,3-bisphosphoglycerate phosphatase, which releases Pi rather than transferring it. The 2025 paper's Diagram (2) a asks the student to derive the no-net-ATP conclusion from exactly this figure, which is the strongest available evidence that the derivation is the intended reading. The claim is one inferential step beyond the quoted words and is written to stay within that step.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-BPG-AFFINITY-01

## claim_id
CLM-HEM-BPG-OXYGEN-AFFINITY-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"2,3-BPG binds to hemoglobin and decreases its affinity to oxygen, favoring delivery of oxygen to tissues."

## locator_type
page

## locator_page
28

## locator_section
Carbohydrate Metabolism · Importance of Glycolysis · II- Importance in RBCs

## locator_detail
The sentence closing the third bullet under heading II, printed page 26.

## context_note
This is the whole of what the 103 BMS corpus says about the consequence. No 103 BMS source states the position of the oxygen dissociation curve, or that 2,3-BPG rises in anaemia or at altitude, so none of that is asserted anywhere in the chain. The book writes "affinity to oxygen" where a British text would write "affinity for oxygen"; the span is quoted as printed.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-LIPOPROTEIN-FUNCTION-01

## claim_id
CLM-GIT-CHYLOMICRON-VLDL-FUNCTION-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Chylomicrons (2%) Apo A & B-48 in nascent, and C & E in mature (98%) (Mainly TAG) Formed by intestinal cells Transport absorbed dietary lipids to lymphatics then to systemic circulation. VLDL (10%) Apo B-100 in nascent, and C & E in mature (90%) (Mainly TAG) Formed by liver cells Transport TAG from liver to extrahepatic tissue."

## locator_type
page

## locator_page
82

## locator_section
Plasma lipids and lipoproteins · Main Characteristics of Different Lipoproteins

## locator_detail
The Chylomicrons and VLDL rows of the summary table, printed page 80, cells read left to right in the table's own column order: Lipoprotein, Protein content, Lipids Content, Source, Main Function.

## context_note
The table prints "extrahepatic tissue" in the singular where the body text on file page 79, printed page 77, has the plural: "VLDLs transport TAG from liver to extrahepatic tissues." Both are the book's own wording and the table version is what is quoted here. The corresponding chylomicron sentence in the body text is on file page 78. Lipoprotein lipase hydrolyses about 90 per cent of the chylomicron's triacylglycerol and about 50 per cent of the VLDL's, which is stated in the "Fate" lines of the two body-text entries and not in this table.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-FAMILIAL-HYPERCHOL-01

## claim_id
CLM-GIT-LDL-RECEPTOR-DEFECT-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"1) Hyperlipoproteinemias: This is a group of disorders characterized by increased plasma levels of lipoproteins. For example: ‐ Familial Hypercholesterolemia: It is due to defect in LDL receptors in liver and other tissues, which produces marked increase in LDL in blood."

## locator_type
page

## locator_page
82

## locator_section
Plasma lipids and lipoproteins · Disorders of plasma lipoproteins (Dyslipoproteinemias) · 1) Hyperlipoproteinemias

## locator_detail
The first entry of the boxed Dyslipoproteinemias panel, printed page 80.

## context_note
The normal clearance route the defect breaks is stated separately, in the LDL entry on file page 80, printed page 78: "LDLs bind to specific apo B-100 receptors, in both the liver (70%) and the extrahepatic tissues (30%) where they are endocytosed. Inside the cells, cholesterol is released for biosynthetic purposes." That is the source of the 70/30 split in the claim. The book gives no prevalence for familial hypercholesterolaemia and names no drug for it anywhere in this chapter, so neither appears in the claim.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-LOW-VLDL-01

## claim_id
CLM-GIT-LOW-VLDL-FATTY-LIVER-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"2) Hypolipoproteinemias: This is a group of disorders characterized by decreased plasma levels of lipoproteins. For example: ‐ Abetalipoproteinemia It is due to failure of synthesis of apo-B, defective formation of chylomicrons (leads to fatty diarrhea), defective formation of VLDL (leads to fatty liver) and LDL." — and, on file page 79, printed page 77 — "Function: VLDLs transport TAG from liver to extrahepatic tissues."

## locator_type
page

## locator_page
82

## locator_section
Plasma lipids and lipoproteins · Disorders of plasma lipoproteins (Dyslipoproteinemias) · 2) Hypolipoproteinemias

## locator_detail
The second entry of the boxed Dyslipoproteinemias panel, printed page 80; and the "Function" line of the "II- Very low-density lipoproteins (VLDL)" entry on file page 79, printed page 77.

## context_note
Two places are quoted because the claim is `support_mode: inferred` and neither place carries it alone. The book never writes the general sentence "low plasma VLDL causes fatty liver". It writes what VLDL is for, on file page 79, and it writes the consequence of VLDL not being formed, inside the abetalipoproteinaemia example on file page 82. The general statement is the two put together, and the 2025 paper's Diagram (3) c — "What is the effect of low VLDL in plasma" — asks for exactly that join. A reader should treat the general form as the book's implication, not its sentence.

## confidence
0.8

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-KETOSIS-01

## claim_id
CLM-END-KETOSIS-CAUSES-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Causes of Ketosis Ketosis occurs in conditions where the rate of ketogenesis exceeds the rate of ketolysis i.e., in conditions where there is marked stimulation of ketogenesis, as in the following: ‐ Starvation. ‐ Low carbohydrate high fat diet. ‐ Severe uncontrolled diabetes mellitus. ‐ Prolonged administration of anti-insulin hormones. ‐ Prolonged and severe muscular exercise."

## locator_type
page

## locator_page
72

## locator_section
Lipid Metabolism · KETOSIS · Causes of Ketosis

## locator_detail
The heading, the defining sentence and all five bullets, printed page 70.

## context_note
The two lines directly above the span give the numbers quoted in the claim's qualifiers: "Normally ketone bodies in blood range from 0.5-3mg/dL. In urine, it is less than 15mg/day." The section directly below gives the effects: "The increased production of 3-hydroxybutyrate and acetoacetate leads to acidosis and may lead to coma and death." No 103 BMS source describes the management of diabetic ketoacidosis, and none is asserted.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-NITROGEN-BALANCE-01

## claim_id
CLM-FND-NEGATIVE-NITROGEN-BALANCE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"3) Negative nitrogen balance It exists when output exceeds intake. This may be due to one of the following causes: a) Inadequate protein intake. This occurs in cases of starvation, malnutrition, deficiency of one or more of the essential amino acids and gastrointestinal diseases. b) Loss of protein. This occurs in cases of chronic hemorrhage, albuminuria, and during lactation on an inadequate diet. c) Increased protein catabolism. This occurs in cases of diabetes mellitus, Cushing's syndrome, hyperthyroidism, and infectious fevers."

## locator_type
page

## locator_page
84

## locator_section
General Aspects of Protein Metabolism · Nitrogen balance · 3) Negative nitrogen balance

## locator_detail
The whole of entry 3, its three lettered causes and their clinical examples, printed page 82.

## context_note
Entries 1 and 2, nitrogen equilibrium and positive nitrogen balance, precede this on the previous file page and are not part of the claim. The 16 per cent figure the claim gives for the nitrogen content of protein is from the definition of nitrogen balance earlier in the same section. No Egyptian protein intake reference value exists in this corpus, and none is asserted.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-PKU-ENZYME-01

## claim_id
CLM-FND-PKU-ENZYME-DEFECT-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"1) Phenylketonuria (PKU): Causes: - Most of the cases of PKU are due to the deficiency of the enzyme phenylalanine hydroxylase (PAH). - About 1-2% of PKU cases are due to deficiency of tetrahydrobiopterin (BH4) which is the coenzyme for phenylalanine hydroxylase. Manifestations of classic PKU: a) Elevated phenylalanine: Since phenylalanine cannot be converted to tyrosine, it is metabolized to phenylpyruvate and phenyl lactate. Phenylalanine and its metabolites appear in elevated concentration in tissues, plasma, and urine. These metabolites give urine a characteristic musty (mousy) odor."

## locator_type
page

## locator_page
104

## locator_section
Individual Amino Acid Metabolism · Metabolic Disorder of Phenylalanine and Tyrosine Metabolism · 1) Phenylketonuria (PKU)

## locator_detail
The "Causes" pair of bullets and manifestation a), printed page 102, inside the boxed panel that runs the whole page.

## context_note
The book's prose names only two metabolites here, phenylpyruvate and phenyl lactate; a third, phenyl-acetate, appears on the pathway figure on file page 102, printed page 100, where the blocked reaction is marked "Blocked in phenylketonuria". The 2025 case stem names phenylpyruvate and phenylacetate. The claim keeps to the book's prose. The book gives no incidence for PKU and says nothing about newborn screening in Egypt, so neither is supplied.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-PKU-CNS-01

## claim_id
CLM-FND-PKU-NEUROLOGICAL-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"b) CNS manifestations: The elevated phenylalanine and its metabolites will interfere with the transport of tyrosine and tryptophan to the brain leading to their deficiency. Also decreased tyrosine leads to impaired neurotransmitters synthesis in the brain; and this may explain why untreated patient shows mental retardation that manifest by the age of one year."

## locator_type
page

## locator_page
104

## locator_section
Individual Amino Acid Metabolism · 1) Phenylketonuria (PKU) · Manifestations of classic PKU · b) CNS manifestations

## locator_detail
The whole of manifestation b), printed page 102.

## context_note
The book states this tentatively — "this may explain why" — and the claim keeps the hedge rather than converting it to a settled mechanism. It also does not name which neurotransmitters; the DOPA and catecholamine chain the concept describes is taken from the tyrosine section of the same chapter, not from this span. Nothing here should be published as settled without a second source.

## confidence
0.85

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-PKU-PIGMENT-01

## claim_id
CLM-FND-PKU-HYPOPIGMENTATION-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"c) Hypopigmentation of hair, skin, and iris of the eye due to deficiency of tyrosine. High levels of phenylalanine also competitively inhibit tyrosinase enzyme."

## locator_type
page

## locator_page
104

## locator_section
Individual Amino Acid Metabolism · 1) Phenylketonuria (PKU) · Manifestations of classic PKU · c) Hypopigmentation

## locator_detail
The whole of manifestation c), printed page 102.

## context_note
Two mechanisms in two sentences: too little substrate, and inhibition of the enzyme that would use it. The book's own contrast is on the next file page, where albinism is "due to lack of tyrosinase enzyme" — the same enzyme, absent rather than inhibited — which is why a student who has learnt only "no tyrosinase" mis-attributes the PKU picture.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-PKU-TREATMENT-01

## claim_id
CLM-FND-PKU-DIETARY-TREATMENT-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Treatment: Early diagnosis of PKU is important to avoid mental retardation as the disease is treatable by dietary means. ‐ The treatment of classic PKU consists of dietary restriction of phenylalanine (phenylalanine-free milk formula) with tyrosine supplementation. ‐ In the rare cases due to BH4 deficiency, the treatment is both dietary and supplementation of BH4."

## locator_type
page

## locator_page
104

## locator_section
Individual Amino Acid Metabolism · 1) Phenylketonuria (PKU) · Treatment

## locator_detail
The whole of the Treatment entry, its lead sentence and both bullets, printed page 102.

## context_note
This is the entirety of what the department book says about treating PKU, and the claim says no more. There is no target blood phenylalanine level, no age at which the diet may be relaxed, no statement about diet in pregnancy, and no product name. The availability and cost of a phenylalanine-free formula in Egypt is not stated in any source in this corpus. The examiner's model answer for this part does not extract from the solved copy and was read visually; it reproduces these two sentences word for word.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-ALCOHOL-URATE-01

## claim_id
CLM-REN-ALCOHOL-LACTATE-URATE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"B) Decreased Excretion of uric acid (Renal Gout) 3) Alcohol intake: ‐ Oxidation of alcohol (ethanol) to acetaldehyde generates significant amount of NADH. ‐ The increase of NADH/NAD+ ratio shifts lactate dehydrogenase reaction toward lactate formation. ‐ The elevation of blood lactate decreases the excretion of uric acid from the kidneys, as both lactic acid and uric acid occupy the same transporter in renal tubules. ‐ Lactate, being higher in concentration and more soluble, succeeds to bind the transporter in favor of uric acid, which is retained causing gout. ‐ Also, alcohol intake causes dehydration."

## locator_type
page

## locator_page
130

## locator_section
Metabolism of Purines and Pyrimidines · Disorders of Purine Metabolism · I- Hyperuricemia · Causes of Gout · B) Decreased Excretion of uric acid (Renal Gout) · 3) Alcohol intake

## locator_detail
Entry 3 and its five bullets, printed page 128, inside the boxed panel.

## context_note
The heading is quoted with the bullets because where the book files this matters: alcohol is under decreased excretion, that is renal gout, and not under increased production. The book does not name the transporter — it says only "the same transporter in renal tubules" — and no name is supplied from elsewhere. Alcohol intake is uncommon in much of the Egyptian patient population and the book offers no local epidemiology; the same mechanism explains the exercise-induced and hypoxic lactataemia a student is far more likely to meet.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-ALLOPURINOL-01

## claim_id
CLM-REN-ALLOPURINOL-MECHANISM-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"2) Drugs decreasing the production of uric acid: Allopurinol is the drug of choice: - It has a structural similarity to hypoxanthine. Allopurinol is oxidized by xanthine oxidase to oxypurinol. The latter binds tightly to xanthine oxidase, inhibiting its ability to oxidize hypoxanthine and xanthine and decreases uric acid formation. - Also, the reaction of allopurinol with PRPP results in a decrease in PRPP levels and thus decreases de novo purine synthesis."

## locator_type
page

## locator_page
131

## locator_section
Metabolism of Purines and Pyrimidines · Treatment of Gout · B) Drugs · 2) Drugs decreasing the production of uric acid

## locator_detail
Entry 2 of the three drug groups, with both its bullets, printed page 129, inside the boxed panel.

## context_note
Treatment content. The book states the class and the mechanism and no dose, so no dose is written; no brand name is given, because availability in Egypt could not be verified from any source in this corpus. Note what this span does not contain: the live concept record CON-REN-E5BAEF03791C8F carries a caution about using allopurinol with impaired kidney function, and the 103 book does not mention it anywhere. That caution is not evidenced by this citation and a reviewer should trace its source before it is published.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-OBSTRUCTIVE-JAUNDICE-01

## claim_id
CLM-GIT-OBSTRUCTIVE-JAUNDICE-STOOL-URINE-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"B) Conjugated Hyperbilirubinemia (Obstructive Jaundice) ‐ This is caused by obstruction of the biliary passages, e.g., by gallstones, cancer head of pancreas or inflammation of the pancreas or of the biliary passages. ‐ This leads to regurgitation of conjugated bilirubin to the blood. ‐ Serum bilirubin increases mainly conjugated bilirubin. ‐ Stercobilin disappears from the feces leading to clay colored stool. ‐ Conjugated bilirubin becomes excreted in the urine, which becomes dark brown in color. ‐ The urine also contains bile salts. ‐ Due to biliary obstruction, the serum level of the enzyme alkaline phosphatase (ALP) is elevated."

## locator_type
page

## locator_page
124

## locator_section
Heme Metabolism · Jaundice (Icterus or Hyperbilirubinemia) · B) Conjugated Hyperbilirubinemia (Obstructive Jaundice)

## locator_detail
The heading and all seven bullets of section B, printed page 122.

## context_note
Both halves of the 2025 paper's Case (3) b are in this one span: no stercobilin reaching the gut is what makes the stool clay coloured, and conjugated bilirubin being water-soluble and not albumin-bound is what lets the kidney excrete it and darken the urine. The solubility property itself is stated separately, in the comparison table on file page 125, printed page 123, where conjugated bilirubin is "Soluble", "Mostly polar", "Excreted" by the kidney and "No" for binding to albumin. The book gives no Egyptian epidemiology for biliary obstruction and none is imported.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-JAUNDICE-TABLE-01

## claim_id
CLM-GIT-JAUNDICE-CLASSIFICATION-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"‐ Due to biliary obstruction, the serum level of the enzyme alkaline phosphatase (ALP) is elevated. C) Both Conjugated & Unconjugated Hyperbilirubinemia ‐ This is also called toxic hyperbilirubinemia or hepatocellular jaundice. ‐ It is usually due to viral hepatitis, but may also be caused by some toxins, e.g., paracetamol, and chloroform. The capacity of the liver to conjugate bilirubin decreases, leading to unconjugated hyperbilirubinemia. ‐ In addition, liver cells usually swell and block the biliary canaliculi, leading to conjugated hyperbilirubinemia. ‐ Due to liver cell damage, the serum levels of the enzymes ALT and AST are elevated."

## locator_type
page

## locator_page
124

## locator_section
Heme Metabolism · Jaundice (Icterus or Hyperbilirubinemia) · closing bullet of B) and the whole of C) Both Conjugated & Unconjugated Hyperbilirubinemia

## locator_detail
The last bullet of section B and all five bullets of section C, printed page 122; the classification the claim opens with is on the previous file page.

## context_note
Three things a reader needs. First, the classification itself is on file page 123, printed page 121: "According to the predominant form of bilirubin in serum, jaundice is classified into: (a) Unconjugated hyperbilirubinemia. (b) Conjugated hyperbilirubinemia. (c) Both unconjugated and conjugated hyperbilirubinemia (mixed type)." Second, the book disagrees with itself on the name of the third type: this prose calls it "toxic hyperbilirubinemia or hepatocellular jaundice", its summary table on file page 125, printed page 123, labels the row "Hepatotoxic Jaundice", and the 2025 exam paper prints "Hepatocelluler juandice". One entity, three spellings. Third, and most important: there is NO enzyme stated for haemolytic jaundice anywhere. The summary table on file page 125 has only two columns, unconjugated and conjugated bilirubin, and no enzyme column at all; the haemolytic jaundice prose on file page 123 names no enzyme. That entry is blank in the book, not "normal", and the claim says so rather than filling it in.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-HAEMOLYTIC-JAUNDICE-01

## claim_id
CLM-HEM-HAEMOLYTIC-JAUNDICE-BILIRUBIN-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"A) Unconjugated Hyperbilirubinemia 1) Hemolytic jaundice ‐ In hemolytic jaundice, there is increased hemolysis, leading to increased production of bilirubin beyond the excretory capacity of the liver. ‐ Serum bilirubin increases, mainly unconjugated bilirubin. ‐ Stercobilin increases in feces, which becomes dark brown. ‐ Since unconjugated bilirubin is bound to the plasma albumin, it cannot be excreted in the urine, and hence the name “acholuric jaundice”. Causes of hemolytic jaundice include: a) Abnormal hemoglobin: sickle cell anemia and thalassemias. b) Red cell enzyme deficiency: G6PD & pyruvate kinase. c) Red cell antibodies: incompatible blood transfusion & erythroblastosis fetalis. d) Some infections e.g., malaria."

## locator_type
page

## locator_page
123

## locator_section
Heme Metabolism · Jaundice (Icterus or Hyperbilirubinemia) · A) Unconjugated Hyperbilirubinemia · 1) Hemolytic jaundice

## locator_detail
The whole of entry 1, its four bullets and its four lettered causes, printed page 121. The book's curly quotation marks around "acholuric jaundice" are reproduced as printed.

## context_note
Note that the causes list closes the loop with the HMP article: G6PD is one of the two red cell enzyme deficiencies the book names here, which is how favism and the third case on the 2025 paper are the same fact seen twice. Note also what is absent: this entry states no enzyme change in blood. The book's own summary table on file page 125 has no enzyme column, so the enzyme cell for haemolytic jaundice is blank rather than "normal", and nothing in the chain fills it in.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-FAT-SOLUBLE-VIT-01

## claim_id
CLM-FND-FAT-SOLUBLE-VITAMINS-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"I- Fat-Soluble Vitamins 1- Vitamin A (Retinol) Retinol Retinal Retinoic acid Maintenance of healthy epithelium, vision, reproduction, and gene expression Night blindness, Xerophthalmia and impaired growth 2500 - 5000 IU 2- Vitamin D (Calciferol) 1,25-Dihydroxy-cholecalciferol Maintenance of plasma calcium and calcification of bones Rickets in children and osteomalacia in adults 800 IU 3- Vitamin E α-Tochopherol Antioxidant Increased red cell fragility leads to anemia 8-10 mg 4- Vitamin K Vitamin K hydroquinone γ-carboxylation of glutamate residues of blood clotting factors and other proteins Bleeding 50-100 μg"

## locator_type
page

## locator_page
159

## locator_section
Vitamins · Summary Table for Vitamins · I- Fat-Soluble Vitamins

## locator_detail
All four rows of the fat-soluble half of the summary table, printed page 157, cells read left to right in the table's own column order: Vitamin, Active Form, Main Functions, Deficiency and Manifestations, RDA.

## context_note
The book misspells α-tocopherol as "α-Tochopherol" in this table; it is quoted as printed. Two of the four exam matches are not in this table and are quoted here from where the book does state them. The 1-hydroxylase step is on file page 137, printed page 135: "This occurs in the kidney and is catalyzed by 1-hydroxylase which converts calcidiol to 1,25 dihydroxycholecolciferol (calcitriol). - Calcitriol is the active form of vitamin D3." — the book misspells cholecalciferol there too. And dark adaptation is on file page 136, printed page 134: "a) Night blindness (Nyctalopia): The dark adaptation time is increased." No Egyptian prevalence data for any of these deficiencies exists in this corpus, so none is quoted; vitamin D deficiency in particular is common in Egypt and a local figure should be attached before publication rather than a Western one.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-WATER-SOLUBLE-VIT-01

## claim_id
CLM-FND-WATER-SOLUBLE-VITAMINS-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"II- Water-Soluble Vitamins 1- Vitamin C L-ascorbic acid Antioxidant, hydroxylation reaction (lysine and proline) and synthesis of collagen Scurvy (spongy bleeding gums, loose teeth, poor wound healing, bleeding, and anemia) 75 mg 2- Thiamine (Vitamin B1) Thiamine pyrophosphate (TPP) Oxidative decarboxylation of α-keto acids and transketolase enzyme Beriberi (dry beriberi and wet beriberi) 1-1.5 mg 3- Riboflavin (Vitamin B2) FMN & FAD Hydrogen carriers Cheilosis, magenta tongue, seborrheic dermatitis and sunshine eye 1.5 mg 4- Niacin (Vitamin B3) NAD+ & NADP+ Hydrogen carriers Pellagra (dermatitis, diarrhea, and dementia) 14-16 mg 5- Pantothenic acid (Vitamin B5) Coenzyme A Acyl-carrier Rare (fatty liver) 10 mg"

## locator_type
page

## locator_page
159

## locator_section
Vitamins · Summary Table for Vitamins · II- Water-Soluble Vitamins

## locator_detail
Rows 1 to 5 of the water-soluble half of the summary table, printed page 157, cells read left to right in the table's own column order: Vitamin, Active Form, Main Functions, Deficiency and Manifestations, RDA. The table continues onto file page 160, printed page 158, with rows 6 to 9.

## context_note
The four rows the 2025 matching question depends on that are not on this page are on file page 160, printed page 158, and read: "7- Biotin (Vitamin B7) Enzyme bound biotin Carboxylation reaction"; "8- Folic acid (Vitamin B9) Tetrahydrofolate (THF) Transfer of one-carbon units (synthesis of methionine, purines and pyrimidines) Megaloblastic anemia and neural tube defects (after birth)"; "9- Cobalamin (Vitamin B12) Methyl-cobalamin and deoxyadenosyl-cobalamin Coenzyme for the conversion of homocysteine into methionine and methylmalonyl-CoA into succinyl-CoA"; and, for the cobalamin deficiency the paper matched, "subacute combined degeneration of the lateral and posterior column of the spinal cord". The paper's two distractor options are also the book's own wording: "It is a highly efficient water-soluble antioxidant" for vitamin C on file page 144, and "Muscle glycogen phosphorylase has a pyridoxal phosphate at each catalytic site" on file page 152. The book's RDA figures are inside the quoted span but are not asserted by the claim.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-BIO103-FOLATE-ANTAGONISTS-01

## claim_id
CLM-FND-FOLATE-ANTAGONISTS-01

## resource_id
src_300847a5fa64809d6c07

## evidence_role
local_curriculum

## support_span
"Folate Antagonists 1- Sulfonamides act as competitive inhibitors of the enzyme needed to incorporate PABA to form folic acid by bacteria and inhibit bacterial multiplication. Sulfa drugs do not affect human DNA or RNA synthesis because mammalian cells cannot synthesize folic acid. 2- Methotrexate is an anti-cancer drug. It acts as a competitive inhibitor of dihydrofolate reductase. So, it inhibits activation of folic acid, DNA synthesis and cell division of malignant cells (conversion of dUMP to dTMP requires methylene-THF)."

## locator_type
page

## locator_page
156

## locator_section
Vitamins · Folic Acid (Vitamin B9) · Folate Antagonists

## locator_detail
The heading and both numbered entries, printed page 154, above the paired figure "Inhibition of Folic Acid Synthesis by Sulfonamides in Bacteria" and "Inhibition of THF Synthesis by Methotrexate in Human".

## context_note
The book does not name the bacterial enzyme sulfonamides inhibit; it describes it only as "the enzyme needed to incorporate PABA to form folic acid by bacteria", and no name is supplied from elsewhere. The selectivity argument in the second sentence is the whole of the book's account of why a sulfonamide is safe in humans and methotrexate is not. Six lines below this span, in the "Deficiency of Folate" panel on the same page, the book lists "2- Treatment with methotrexate" as a cause of folate deficiency, which is the same mechanism read as a side effect. This span quotes no dose, because the book states none.

## confidence
0.95

## counts_as_claim_evidence
yes
