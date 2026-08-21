<!--
  103 BMS · Biochemistry · article evidence spans · the 19 spans the eleven
  biochemistry articles already name in their `span_ids`, and which nothing had
  yet written.

  Spans only. `detectKind` reads the first record and validates the whole file
  against it, so claims and citations stay in their own files:
  ./103-BMS-biochemistry-claims.md and ./103-BMS-biochemistry-citations.md.

  WHERE THE IDs COME FROM. Every `id` below is already listed in a `## span_ids`
  block in ../article/103-BMS-biochemistry.md, and each span's `article_id` is
  the article that names it. Nothing here is minted. 19 named, 19 written.

  `section_id` IS DERIVED, NEVER FREE TEXT. The importer builds it in
  `parseSections(values.sections, id.toLowerCase())` as
  `<article-id-lowercased>-<slugified heading>`, deduplicated `-2`, `-3` where a
  heading repeats. So the `Mechanism` section of ART-103-BIO-TCA-KEY-ENZYMES is
  `art-103-bio-tca-key-enzymes-mechanism`, and the
  `Aetiology and risk factors` section of ART-103-BIO-GOUT-AND-HYPERURICAEMIA is
  `art-103-bio-gout-and-hyperuricaemia-aetiology-and-risk-factors`. Every section
  ID below was computed from the article file with the importer's own `slugify`
  from src/data/subjectsImport.ts, not typed by hand. Rename a heading and the
  ID moves with it.

  EVERY `text` WAS CHECKED AGAINST THE ARTICLE. Each string below was matched,
  character for character, inside the body of the section it names, using the
  same parse the importer performs. A span whose text is not in its section
  imports without error and points a student's evidence at a sentence that does
  not exist, which is the failure this check exists to prevent.

  Eleven of the nineteen take their text from a `## annotations` block whose
  `Quote:` covers the same teaching. The importer verifies those quotes against
  the body itself, so for those eleven the two records point at one sentence and
  a transcription error is impossible. The other eight were selected from the
  section prose because the article's annotation covered a different concept, or
  because a longer run of sentences was needed to carry the whole claim.

  `text_hash` is omitted throughout. It is derived from the text when absent, so
  a reflow of the prose cannot silently detach a span from its sentence.

  CITATION IDs ARE THE ARTICLES' OWN. Every `citation_ids` value here is a
  record in ./103-BMS-biochemistry-citations.md and is the same ID the article's
  `callout_evidence` block names for that claim. This is worth stating because
  the other three subjects' articles invented their citation IDs and every one
  had to be repointed afterwards; here the articles were right first.

  ONE SPAN CARRIES NO CITATION. SPN-BIO-HMP-NADPH-01 names
  CLM-FND-HMP-NADPH-01, for which no citation exists in this batch — the
  articles' `callout_evidence` blocks name none, and no citation ID is minted
  here. The claim is quotable from the book, on file page 38, and the hand-off
  report says so. The `citation_ids` key is omitted on that record rather than
  left blank, because an empty block parses as absent anyway.

  Import: Admin › Evidence › Import. Spans land last — the order the simulator
  applies is resource → article → concept → claim → citation → span.
-->

# Item

## id
SPN-BIO-ROS-DEFENCE-01

## article_id
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE

## section_id
art-103-bio-ros-antioxidant-defence-mechanism

## text
And metabolic end products do it: bilirubin and uric acid function as antioxidants, and are oxidised into biliverdin and allantoin respectively.

## claim_ids
CLM-FND-ROS-ANTIOXIDANT-DEFENCE-01

## citation_ids
CIT-KA-BIO103-ROS-DEFENCE-01

---

# Item

## id
SPN-BIO-H2O2-FATE-01

## article_id
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE

## section_id
art-103-bio-ros-antioxidant-defence-mechanism

## text
Glutathione peroxidase, a selenium enzyme, reduces it to two molecules of water while oxidising two reduced glutathione into the disulphide, and glutathione reductase, an FAD enzyme, then reduces that disulphide back using NADPH+H⁺.

## claim_ids
CLM-FND-H2O2-DISPOSAL-01

## citation_ids
CIT-KA-BIO103-H2O2-FATE-01

---

# Item

## id
SPN-BIO-HMP-NADPH-01

## article_id
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## section_id
art-103-bio-hmp-pathway-and-g6pd-definition

## text
The pentose phosphate pathway is another route for glucose oxidation, with two major functions: the supply of NADPH and of ribose 5-phosphate.

## claim_ids
CLM-FND-HMP-NADPH-01

---

# Item

## id
SPN-BIO-FAVISM-01

## article_id
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## section_id
art-103-bio-hmp-pathway-and-g6pd-mechanism

## text
The red cell's capacity to protect itself is markedly decreased because NADPH is low, and NADPH is what glutathione reductase needs to regenerate reduced glutathione for the removal of hydrogen peroxide by glutathione peroxidase. Exposure of red cells to oxidising agents then produces lysis and the development of haemolytic anaemia and jaundice.

## claim_ids
CLM-HEM-FAVISM-HAEMOLYSIS-01

## citation_ids
CIT-KA-BIO103-FAVISM-01

---

# Item

## id
SPN-BIO-KREBS-KEY-01

## article_id
ART-103-BIO-TCA-KEY-ENZYMES

## section_id
art-103-bio-tca-key-enzymes-definition

## text
The cycle has three irreversible steps, and the enzymes that catalyse them are citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase.

## claim_ids
CLM-FND-KREBS-KEY-ENZYMES-01

## citation_ids
CIT-KA-BIO103-KREBS-KEY-01

---

# Item

## id
SPN-BIO-RBC-GLYCOLYSIS-01

## article_id
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT

## section_id
art-103-bio-rbc-glycolysis-and-bpg-shunt-mechanism

## text
As RBCs lack mitochondria, glycolysis is the only source of ATP through substrate level phosphorylation.

## claim_ids
CLM-HEM-RBC-GLYCOLYSIS-ATP-01

## citation_ids
CIT-KA-BIO103-RBC-GLYCOLYSIS-01

---

# Item

## id
SPN-BIO-BPG-SHUNT-01

## article_id
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT

## section_id
art-103-bio-rbc-glycolysis-and-bpg-shunt-mechanism

## text
2,3-bisphosphoglycerate mutase catalyses the conversion of 1,3-bisphosphoglycerate into 2,3-bisphosphoglycerate, bypassing the reaction catalysed by phosphoglycerate kinase, which is the site of ATP yield. 2,3-bisphosphoglycerate phosphatase then hydrolyses the product to 3-phosphoglycerate, releasing inorganic phosphate rather than transferring it to ADP. A molecule that takes the shunt therefore rejoins glycolysis below the step that would have paid it, and the cell gains no net ATP from the detour.

## claim_ids
CLM-HEM-BPG-SHUNT-NO-ATP-01

## citation_ids
CIT-KA-BIO103-BPG-SHUNT-01

---

# Item

## id
SPN-BIO-LIPOPROTEIN-FUNCTION-01

## article_id
ART-103-BIO-PLASMA-LIPOPROTEINS

## section_id
art-103-bio-plasma-lipoproteins-mechanism

## text
Chylomicrons are formed by intestinal cells and transport absorbed dietary lipids to the lymphatics and then to the systemic circulation.

## claim_ids
CLM-GIT-CHYLOMICRON-VLDL-FUNCTION-01

## citation_ids
CIT-KA-BIO103-LIPOPROTEIN-FUNCTION-01

---

# Item

## id
SPN-BIO-LOW-VLDL-01

## article_id
ART-103-BIO-PLASMA-LIPOPROTEINS

## section_id
art-103-bio-plasma-lipoproteins-key-determinants

## text
A low plasma VLDL means the liver has no way to export the triacylglycerol it synthesises, and that is what a fatty liver is.

## claim_ids
CLM-GIT-LOW-VLDL-FATTY-LIVER-01

## citation_ids
CIT-KA-BIO103-LOW-VLDL-01

---

# Item

## id
SPN-BIO-KETOSIS-01

## article_id
ART-103-BIO-KETOSIS

## section_id
art-103-bio-ketosis-definition

## text
Ketosis occurs in conditions where the rate of ketogenesis exceeds the rate of ketolysis.

## claim_ids
CLM-END-KETOSIS-CAUSES-01

## citation_ids
CIT-KA-BIO103-KETOSIS-01

---

# Item

## id
SPN-BIO-NITROGEN-BALANCE-01

## article_id
ART-103-BIO-NITROGEN-BALANCE

## section_id
art-103-bio-nitrogen-balance-mechanism

## text
Negative nitrogen balance has three causes, and the book gives clinical examples under each.

## claim_ids
CLM-FND-NEGATIVE-NITROGEN-BALANCE-01

## citation_ids
CIT-KA-BIO103-NITROGEN-BALANCE-01

---

# Item

## id
SPN-BIO-PKU-ENZYME-01

## article_id
ART-103-BIO-PHENYLKETONURIA

## section_id
art-103-bio-phenylketonuria-aetiology-and-risk-factors

## text
Deficiency of phenylalanine hydroxylase, or in the minority of cases deficiency of its coenzyme tetrahydrobiopterin.

## claim_ids
CLM-FND-PKU-ENZYME-DEFECT-01

## citation_ids
CIT-KA-BIO103-PKU-ENZYME-01

---

# Item

## id
SPN-BIO-PKU-TREATMENT-01

## article_id
ART-103-BIO-PHENYLKETONURIA

## section_id
art-103-bio-phenylketonuria-management

## text
The treatment of classic PKU consists of dietary restriction of phenylalanine, using a phenylalanine-free milk formula, with tyrosine supplementation.

## claim_ids
CLM-FND-PKU-DIETARY-TREATMENT-01

## citation_ids
CIT-KA-BIO103-PKU-TREATMENT-01

---

# Item

## id
SPN-BIO-ALCOHOL-URATE-01

## article_id
ART-103-BIO-GOUT-AND-HYPERURICAEMIA

## section_id
art-103-bio-gout-and-hyperuricaemia-aetiology-and-risk-factors

## text
The elevation of blood lactate decreases the excretion of uric acid from the kidneys, because both lactic acid and uric acid occupy the same transporter in the renal tubules.

## claim_ids
CLM-REN-ALCOHOL-LACTATE-URATE-01

## citation_ids
CIT-KA-BIO103-ALCOHOL-URATE-01

---

# Item

## id
SPN-BIO-GOUT-DRUGS-01

## article_id
ART-103-BIO-GOUT-AND-HYPERURICAEMIA

## section_id
art-103-bio-gout-and-hyperuricaemia-management

## text
It has a structural similarity to hypoxanthine; it is oxidised by xanthine oxidase to oxypurinol, and oxypurinol binds tightly to xanthine oxidase, inhibiting its ability to oxidise hypoxanthine and xanthine, and so decreasing uric acid formation.

## claim_ids
CLM-REN-ALLOPURINOL-MECHANISM-01

## citation_ids
CIT-KA-BIO103-ALLOPURINOL-01

---

# Item

## id
SPN-BIO-OBSTRUCTIVE-JAUNDICE-01

## article_id
ART-103-BIO-JAUNDICE-AND-BILIRUBIN

## section_id
art-103-bio-jaundice-and-bilirubin-pathophysiology

## text
Stercobilin disappears from the faeces leading to clay coloured stool. Conjugated bilirubin becomes excreted in the urine, which becomes dark brown in colour, and the urine also contains bile salts.

## claim_ids
CLM-GIT-OBSTRUCTIVE-JAUNDICE-STOOL-URINE-01

## citation_ids
CIT-KA-BIO103-OBSTRUCTIVE-JAUNDICE-01

---

# Item

## id
SPN-BIO-JAUNDICE-TABLE-01

## article_id
ART-103-BIO-JAUNDICE-AND-BILIRUBIN

## section_id
art-103-bio-jaundice-and-bilirubin-classification

## text
Unconjugated hyperbilirubinaemia covers haemolytic jaundice, physiological neonatal jaundice and Gilbert syndrome. Conjugated hyperbilirubinaemia is obstructive jaundice. The mixed type is hepatocellular jaundice, which the book also calls toxic hyperbilirubinaemia and, in its summary table, hepatotoxic jaundice.

## claim_ids
CLM-GIT-JAUNDICE-CLASSIFICATION-01 | CLM-HEM-HAEMOLYTIC-JAUNDICE-BILIRUBIN-01

## citation_ids
CIT-KA-BIO103-JAUNDICE-TABLE-01 | CIT-KA-BIO103-HAEMOLYTIC-JAUNDICE-01

---

# Item

## id
SPN-BIO-VITAMINS-SUMMARY-01

## article_id
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## section_id
art-103-bio-vitamins-and-folate-antagonists-mechanism

## text
Vitamin D is hydroxylated in the liver by 25-hydroxylase to calcidiol and in the kidney by 1-hydroxylase to calcitriol, which is the active form.

## claim_ids
CLM-FND-FAT-SOLUBLE-VITAMINS-01

## citation_ids
CIT-KA-BIO103-FAT-SOLUBLE-VIT-01

---

# Item

## id
SPN-BIO-FOLATE-ANTAGONISTS-01

## article_id
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## section_id
art-103-bio-vitamins-and-folate-antagonists-key-determinants

## text
Sulfonamides are competitive inhibitors of the enzyme that incorporates PABA to form folic acid in bacteria, so bacterial multiplication stops; they do not affect human DNA or RNA synthesis, because mammalian cells cannot synthesise folic acid at all. Methotrexate is an anticancer drug and a competitive inhibitor of dihydrofolate reductase, so folic acid is not activated, and DNA synthesis and cell division of malignant cells stop — the conversion of dUMP to dTMP requires methylene-THF.

## claim_ids
CLM-FND-FOLATE-ANTAGONISTS-01

## citation_ids
CIT-KA-BIO103-FOLATE-ANTAGONISTS-01
