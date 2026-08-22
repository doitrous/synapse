<!--
  103 BMS · Biochemistry · the 28 atomic claims the subject's concepts name.

  One kind, one file: every record here is a claim. The citations that support
  them are the sibling file ./103-BMS-biochemistry-citations.md and the article
  spans that quote them are ./103-BMS-biochemistry-spans.md. Do not merge them —
  the validator reads the first record and judges the whole file against it.

  WHERE THE IDs COME FROM. Not one ID in this file was minted here. Every `id`
  is already named in an `atomic_claim_ids` list in
  ../concept/103-BMS-biochemistry-concepts.md, and every `concept_id` is the
  concept that names it. All 28 are also named in the `claim_ids` of one of the
  eleven articles in ../article/103-BMS-biochemistry.md. The set is closed:
  28 in, 28 out, none renamed, none added, none skipped.

  FIVE CLAIMS ARE NOT HERE ON PURPOSE. CLM-HEM-A1EF4D20C85878,
  CLM-HEM-4F64967BBFBB6F, CLM-HEM-F2B664C215C912, CLM-REN-31708150F8B722 and
  CLM-REN-E5BAEF03791C8F are live records re-typed by the five concept updates
  in that same concept file. They already exist; authoring them again here would
  create a second version of each.

  THE SOURCE. Every medical statement below comes from one book:

    src_300847a5fa64809d6c07  Dpt book Biochemistry 103.pdf  160 pp

  already an evidence record in ./103-BMS-sources.md. The 2025 end-of-year paper
  says what is examined; it is `is_assessment: yes` and is cited by nothing.

  RISK CLASS. Twenty-five are `foundational_stable`. Three are
  `treatment_or_action` and must not auto-publish:

    CLM-FND-PKU-DIETARY-TREATMENT-01   the phenylalanine-free diet
    CLM-REN-URICOSURIC-DRUGS-01        the uricosuric class
    CLM-REN-ALLOPURINOL-MECHANISM-01   allopurinol

  Those three are the only ones that tell a reader to do something. Note that
  CON-FND-1A4A49607783A9 raises, in its own `evidence_gaps`, whether
  CLM-FND-FOLATE-ANTAGONISTS-01 should join them. It is written
  `foundational_stable` here because the book teaches sulfonamides and
  methotrexate as the biochemistry of folate — a mechanism at an enzyme, with no
  dose, no indication and no prescribing advice — and because the concept files
  the point under vitamins, not under therapeutics. A reviewer who disagrees
  should change one field, not rewrite the claim.

  NO DOSE APPEARS ANYWHERE IN THIS FILE, because no dose appears anywhere in the
  book. No brand name appears either: availability in Egypt could not be
  verified from any source in this corpus.

  CLM-REN-URICOSURIC-DRUGS-01 NAMES NO DRUG. The book prints the bare heading
  "Drugs increasing the excretion of uric acid (Uricosuric drugs)" with one
  precaution and no member of the class, and the examiner's own model answer on
  the solved paper does the same. Naming a member from general knowledge would
  be inventing a fact in the highest-risk category there is, so the claim
  asserts that the class exists and what it does, and stops there. Allopurinol
  is a separate claim because the book names it.

  VERIFICATION STATUS. All 28 are `needs_evidence`, matching the
  `publication_status` on the concepts that name them. Twenty-five carry a
  citation with an exact page locator; no human has reviewed the chain, and
  review is what promotes a claim to `verified`.

  THREE CLAIMS CARRY NO CITATION, and that is a finding, not an oversight:

    CLM-FND-HMP-NADPH-01            CLM-REN-URICOSURIC-DRUGS-01
    CLM-REN-GOUT-TOPHI-DIAGNOSIS-01

  The articles' `callout_evidence` blocks name 25 citation IDs and these three
  are not among them. All three ARE quotable from the book — pages 38, 131 and
  130 respectively — but the citation IDs are fixed by the articles, and no ID
  is minted in this batch. They are named in the hand-off report with the
  wording and page each would use.

  WHAT THE BOOK DOES NOT SAY, and is therefore not asserted anywhere below:
   · No epidemiology of any kind. No prevalence for PKU, gout, jaundice,
     familial hypercholesterolaemia or G6PD deficiency. The book calls G6PD
     deficiency "the most common human enzymopathy" and gives no figure.
   · It does not name the renal transporter that lactate and urate compete for.
   · It does not name the bacterial enzyme that sulfonamides inhibit — only
     "the enzyme needed to incorporate PABA to form folic acid by bacteria".
   · It records no enzyme change for haemolytic jaundice. Its own summary table
     on file page 125 has no enzyme column at all, and its prose on haemolytic
     jaundice names no enzyme. That is a blank, not a "normal".

  Import order: sources → articles → concepts → claims → citations → spans.
  This file lands after the concept batch and before the citation batch.
-->

# Item

## id
CLM-FND-ROS-ANTIOXIDANT-DEFENCE-01

## concept_id
CON-FND-5F0DC4407DEC51

## subject
Bilirubin and uric acid, the two metabolic end products the book names among the scavenger antioxidants

## predicate
function as

## object
Antioxidants, and are themselves oxidised to biliverdin and allantoin respectively

## display_text
Among the scavenger antioxidants that deal with existing reactive oxygen species, the book names two metabolic end products: bilirubin and uric acid function as antioxidants, and are oxidised into biliverdin and allantoin respectively. The scavenger enzyme it names is superoxide dismutase, widely distributed in tissues.

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
scope: undergraduate bioenergetics, module 103 BMS
category: scavenging of existing ROS, not prevention of their generation
count: two metabolic end products, and one scavenger enzyme

---

# Item

## id
CLM-FND-H2O2-DISPOSAL-01

## concept_id
CON-FND-D8A41B5C23B148

## subject
Hydrogen peroxide, a normal metabolite of flavoprotein oxidases and of the superoxide dismutase reaction

## predicate
is disposed of by

## object
Catalase, which splits it to water and oxygen, and glutathione peroxidase, whose glutathione is regenerated by an NADPH-dependent glutathione reductase

## display_text
Hydrogen peroxide is removed by two routes. Catalase splits it into water and oxygen. Glutathione peroxidase, a selenium enzyme, reduces it to two molecules of water while oxidising two reduced glutathione to the disulphide, and glutathione reductase, an FAD enzyme, then reduces that disulphide back using NADPH+H⁺ — so the glutathione route runs only for as long as NADPH keeps arriving.

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
scope: undergraduate bioenergetics, module 103 BMS
polarity: glutathione reductase regenerates the glutathione and does not itself touch the peroxide
dependency: the glutathione arm consumes NADPH; the catalase arm does not

---

# Item

## id
CLM-FND-KREBS-KEY-ENZYMES-01

## concept_id
CON-FND-037BF052DDFC0D

## subject
The three irreversible steps of the Krebs cycle

## predicate
are catalysed by

## object
Citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase, which are the rate-controlling key enzymes of the cycle

## display_text
The Krebs cycle has three irreversible steps, catalysed by citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase. Those three are the rate-controlling key enzymes of the cycle.

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
count: three irreversible steps, three key enzymes
scope: undergraduate TCA cycle, module 103 BMS
sense: "key enzyme" here means rate-controlling, which is the sense the book's own chapter uses

---

# Item

## id
CLM-FND-HMP-NADPH-01

## concept_id
CON-FND-B928DE79E08882

## subject
The hexose monophosphate (pentose phosphate) pathway

## predicate
is

## object
The main source of NADPH, and also the source of the ribose 5-phosphate needed for nucleotides and nucleic acids

## display_text
The hexose monophosphate pathway is another route for glucose oxidation and has two functions: it is the main source of NADPH, required by the many reductases and hydroxylases the book lists, and it provides the ribose 5-phosphate needed for the synthesis of nucleotides and nucleic acids. Its oxidative phase is irreversible.

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
scope: undergraduate carbohydrate metabolism, module 103 BMS
site: cytosolic; active in liver, thyroid, adrenal cortex, adipose tissue, gonads, retina, lactating mammary gland and red cells
evidence: no citation in this batch — the articles name none for this claim, though the book states it on file page 38

---

# Item

## id
CLM-HEM-G6PD-HMP-KEY-ENZYME-01

## concept_id
CON-HEM-A1EF4D20C85878

## subject
Glucose 6-phosphate dehydrogenase (G6PD)

## predicate
catalyses

## object
The first step of the oxidative phase of the hexose monophosphate pathway, and is the pathway's regulated enzyme — inhibited by NADPH and induced by insulin

## display_text
Glucose 6-phosphate dehydrogenase dehydrogenates glucose 6-phosphate to 6-phosphogluconolactone, the first step of the oxidative phase of the hexose monophosphate pathway and the step that generates the first NADPH+H⁺. It is the enzyme the pathway is regulated at: NADPH is a feedback inhibitor of it, and insulin induces it and increases its synthesis.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
scope: undergraduate carbohydrate metabolism, module 103 BMS
wording: the book does not print the phrase "key enzyme" for G6PD; it is the only enzyme of this pathway it gives regulation for, and its figure labels G6PD as the enzyme of the first step and marks that step "Block in cases of Favism"
polarity: NADPH inhibits, insulin induces

---

# Item

## id
CLM-HEM-FAVISM-HAEMOLYSIS-01

## concept_id
CON-HEM-4F64967BBFBB6F

## subject
G6PD deficiency (favism), in which too little NADPH is made to regenerate reduced glutathione

## predicate
causes

## object
Lysis of the fragile red cell on exposure to an oxidant, with haemolytic anaemia and jaundice

## display_text
In G6PD deficiency the red cell's capacity to protect itself from oxidative damage is markedly decreased, because there is too little NADPH for glutathione reductase to regenerate the reduced glutathione that glutathione peroxidase needs to remove hydrogen peroxide. Peroxide then peroxidises membrane lipids and raises membrane fragility, and exposure to an oxidant — primaquine, aspirin or sulfonamides, or fava beans — lyses the cells, giving haemolytic anaemia and jaundice.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
mechanism: failure of reducing power, not of ATP — glycolysis is intact in these cells
triggers: primaquine, aspirin, sulfonamides, fava beans, as named by the book
epidemiology: none — the book calls it the most common human enzymopathy and gives no figure, and none is supplied

---

# Item

## id
CLM-HEM-RBC-GLYCOLYSIS-ATP-01

## concept_id
CON-HEM-095C9C97B56CCA

## subject
Glycolysis in the red blood cell, which has no mitochondria

## predicate
is

## object
The only source of ATP for that cell, produced by substrate-level phosphorylation

## display_text
Because red cells lack mitochondria, glycolysis is their only source of ATP, produced by substrate-level phosphorylation. The NADH+H⁺ made at the glyceraldehyde 3-phosphate dehydrogenase step does a second job: it maintains the iron of haemoglobin in the ferrous state, because ferric haem gives methaemoglobin, which cannot carry oxygen.

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
population: mature red blood cells
state: anaerobic net yield only — two ATP per glucose, because there is no electron transport chain
scope: undergraduate carbohydrate metabolism, module 103 BMS

---

# Item

## id
CLM-HEM-BPG-SHUNT-NO-ATP-01

## concept_id
CON-HEM-7FBB4829A4A4EC

## subject
The 2,3-bisphosphoglycerate shunt in the red cell

## predicate
yields

## object
No net ATP, because 2,3-bisphosphoglycerate mutase bypasses the phosphoglycerate kinase reaction, which is the site of ATP yield

## display_text
2,3-bisphosphoglycerate mutase converts 1,3-bisphosphoglycerate into 2,3-bisphosphoglycerate, bypassing the reaction catalysed by phosphoglycerate kinase, which is the site of ATP yield. A molecule that takes the shunt rejoins glycolysis below the step that would have paid it, so the cell gains no net ATP from the detour.

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
population: red blood cells
polarity: negative — the shunt costs the cell the ATP that step would have made
scope: undergraduate carbohydrate metabolism, module 103 BMS

---

# Item

## id
CLM-HEM-BPG-OXYGEN-AFFINITY-01

## concept_id
CON-HEM-6B557A065A8D90

## subject
2,3-bisphosphoglycerate, the product of the BPG shunt

## predicate
decreases

## object
The affinity of haemoglobin for oxygen, favouring delivery of oxygen to the tissues

## display_text
2,3-BPG binds to haemoglobin and decreases its affinity for oxygen, so oxygen is given up more readily and delivery to the tissues is favoured. That is the return the red cell gets for a shunt that yields it no ATP.

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
polarity: negative — affinity falls, delivery rises
scope: undergraduate carbohydrate metabolism, module 103 BMS
limit: the book states no position of the oxygen dissociation curve and no rise in 2,3-BPG at altitude or in anaemia, so neither is asserted

---

# Item

## id
CLM-GIT-CHYLOMICRON-VLDL-FUNCTION-01

## concept_id
CON-GIT-33EAF87333AAD5

## subject
Chylomicrons and VLDL, the two triacylglycerol-carrying lipoproteins

## predicate
differ in

## object
Where the triacylglycerol came from — chylomicrons carry absorbed dietary lipid from the intestine to lymphatics and then the systemic circulation, VLDL carries hepatic triacylglycerol from liver to extrahepatic tissue

## display_text
Both particles carry triacylglycerol, and the difference is its origin. Chylomicrons are formed by intestinal cells and transport absorbed dietary lipids to the lymphatics and then to the systemic circulation. VLDL is formed by liver cells and transports triacylglycerol from the liver to extrahepatic tissue.

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
composition: chylomicron 98 per cent lipid with apo B-48; VLDL 90 per cent lipid with apo B-100
scope: undergraduate plasma lipids and lipoproteins, module 103 BMS

---

# Item

## id
CLM-GIT-LDL-RECEPTOR-DEFECT-01

## concept_id
CON-GIT-8C5125A491B189

## subject
Familial hypercholesterolaemia

## predicate
is due to

## object
A defect in the LDL receptors of the liver and other tissues, which produces a marked increase in LDL in blood

## display_text
Familial hypercholesterolaemia is a hyperlipoproteinaemia caused by a defect in the LDL receptors of the liver and other tissues. LDL is made normally but cannot be taken up, so it accumulates and blood LDL rises markedly. LDL is normally cleared by binding specific apo B-100 receptors, 70 per cent of them in the liver and 30 per cent in extrahepatic tissues.

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
class: hyperlipoproteinaemia
scope: undergraduate plasma lipids and lipoproteins, module 103 BMS
epidemiology: none — the book gives no prevalence, and none is supplied
treatment: none — the book's lipoprotein chapter names no drug for this disease, so none is written

---

# Item

## id
CLM-GIT-LOW-VLDL-FATTY-LIVER-01

## concept_id
CON-GIT-38CC5CC7716DB7

## subject
A low plasma VLDL

## predicate
results in

## object
A fatty liver, because VLDL is the only vehicle the liver has for exporting the triacylglycerol it makes

## display_text
VLDL transports triacylglycerol from the liver to extrahepatic tissue, so when plasma VLDL is low that export fails and triacylglycerol is stranded in the hepatocytes as a fatty liver. The book's worked case is abetalipoproteinaemia, where apo-B is not synthesised: defective formation of chylomicrons leads to fatty diarrhoea, and defective formation of VLDL leads to fatty liver.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.8

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
support_mode: inferred — the book states the consequence only inside the abetalipoproteinaemia example and never writes the general sentence
scope: undergraduate plasma lipids and lipoproteins, module 103 BMS
evidence: the citation quotes both places, the VLDL function line and the abetalipoproteinaemia line

---

# Item

## id
CLM-END-KETOSIS-CAUSES-01

## concept_id
CON-END-CC450A236ABF50

## subject
Ketosis, that is ketonaemia with ketonuria

## predicate
occurs in

## object
Conditions where the rate of ketogenesis exceeds the rate of ketolysis — starvation, a low-carbohydrate high-fat diet, severe uncontrolled diabetes mellitus, prolonged administration of anti-insulin hormones, and prolonged severe muscular exercise

## display_text
Ketosis is increased ketone bodies in blood and urine, and it occurs whenever the rate of ketogenesis exceeds the rate of ketolysis. The book lists five such conditions: starvation, a low-carbohydrate high-fat diet, severe uncontrolled diabetes mellitus, prolonged administration of anti-insulin hormones, and prolonged and severe muscular exercise.

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
count: five causes
numbers: blood ketone bodies normally 0.5-3 mg/dL, urinary output normally under 15 mg/day
scope: undergraduate lipid metabolism, module 103 BMS
treatment: none — management of diabetic ketoacidosis is in no 103 BMS source and is not asserted

---

# Item

## id
CLM-FND-NEGATIVE-NITROGEN-BALANCE-01

## concept_id
CON-FND-B320D24EC35D30

## subject
Negative nitrogen balance, which exists when nitrogen output exceeds intake

## predicate
is due to

## object
One of three causes — inadequate protein intake, loss of protein, or increased protein catabolism

## display_text
Negative nitrogen balance exists when output exceeds intake, and the book gives three causes. Inadequate protein intake, in starvation, malnutrition, deficiency of one or more essential amino acids, and gastrointestinal disease. Loss of protein, in chronic haemorrhage, albuminuria, and lactation on an inadequate diet. Increased protein catabolism, in diabetes mellitus, Cushing's syndrome, hyperthyroidism, and infectious fevers.

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
count: three causes, each with the book's own clinical examples
polarity: negative — output exceeds intake
scope: undergraduate general aspects of protein metabolism, module 103 BMS

---

# Item

## id
CLM-FND-PKU-ENZYME-DEFECT-01

## concept_id
CON-FND-D7BB8C3AFB54CC

## subject
Phenylketonuria

## predicate
is due to

## object
Deficiency of phenylalanine hydroxylase in most cases, and of its coenzyme tetrahydrobiopterin in about 1 to 2 per cent

## display_text
Most cases of phenylketonuria are due to deficiency of the enzyme phenylalanine hydroxylase; about 1 to 2 per cent are due to deficiency of tetrahydrobiopterin, which is that enzyme's coenzyme. Phenylalanine that cannot be converted to tyrosine is metabolised instead to phenylpyruvate and phenyl lactate, and it is these metabolites, raised in tissues, plasma and urine, that give the urine its characteristic musty, mousy odour.

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
proportion: about 1-2 per cent of cases are BH4 deficiency rather than PAH deficiency
scope: undergraduate individual amino acid metabolism, module 103 BMS
epidemiology: none — the book gives no incidence and says nothing about newborn screening in Egypt, and neither is supplied

---

# Item

## id
CLM-FND-PKU-NEUROLOGICAL-01

## concept_id
CON-FND-587B0A39D3C0BD

## subject
The mental retardation of untreated phenylketonuria

## predicate
is explained by

## object
Deprivation rather than toxicity — raised phenylalanine and its metabolites block the transport of tyrosine and tryptophan into the brain, and low tyrosine impairs neurotransmitter synthesis

## display_text
The elevated phenylalanine and its metabolites interfere with the transport of tyrosine and tryptophan to the brain, so the brain is short of both; and because phenylalanine cannot be hydroxylated, tyrosine is low to begin with, which impairs synthesis of the neurotransmitters made from it. The book offers this as what may explain why an untreated patient shows mental retardation manifest by the age of one year.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.8

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
certainty: the book states the mechanism tentatively — "this may explain why" — and the claim keeps that hedge
timing: mental retardation manifest by the age of one year in the untreated patient
scope: undergraduate individual amino acid metabolism, module 103 BMS

---

# Item

## id
CLM-FND-PKU-HYPOPIGMENTATION-01

## concept_id
CON-FND-1DF6B985CB77A1

## subject
The hypopigmentation of hair, skin and iris in phenylketonuria

## predicate
is due to

## object
Two things at once — deficiency of tyrosine, and competitive inhibition of tyrosinase by the high level of phenylalanine

## display_text
Hair, skin and the iris of the eye are hypopigmented in phenylketonuria because of deficiency of tyrosine, the substrate melanin is made from. High levels of phenylalanine also competitively inhibit the tyrosinase enzyme. Both act at once, which is why the affected infant is paler than the siblings.

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
count: two mechanisms operating together
sites: hair, skin and iris of the eye
scope: undergraduate individual amino acid metabolism, module 103 BMS

---

# Item

## id
CLM-FND-PKU-DIETARY-TREATMENT-01

## concept_id
CON-FND-81A4F3A9C51B7B

## subject
Classic phenylketonuria

## predicate
is treated by

## object
Dietary restriction of phenylalanine using a phenylalanine-free milk formula, with tyrosine supplementation; and in the rare BH4-deficient cases, by diet plus BH4 supplementation

## display_text
Early diagnosis of PKU matters because the disease is treatable by dietary means and the mental retardation can be avoided. Treatment of classic PKU is dietary restriction of phenylalanine, using a phenylalanine-free milk formula, together with tyrosine supplementation — tyrosine has become an essential amino acid for this patient. In the rare cases due to BH4 deficiency, treatment is both dietary and supplementation of BH4.

## risk_class
treatment_or_action

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
yes

## review_due
2027-08-21

## qualifiers
population: infants and children with classic PKU; the BH4 variant is treated differently
dose: none stated — the book gives no target blood level, no age at which the diet may be relaxed and no statement about diet in pregnancy, and none is supplied
availability: no product or brand name; the availability and cost of a phenylalanine-free formula in Egypt is not stated in any source in this corpus
publication: treatment content, must not auto-publish

---

# Item

## id
CLM-GIT-OBSTRUCTIVE-JAUNDICE-STOOL-URINE-01

## concept_id
CON-GIT-A265DD7A7CC8EF

## subject
Obstructive jaundice, in which conjugated bilirubin regurgitates into blood

## predicate
produces

## object
Clay coloured stool, because stercobilin disappears from the faeces, and dark brown urine, because conjugated bilirubin is excreted in it

## display_text
In obstructive jaundice stercobilin disappears from the faeces, leading to clay coloured stool, and conjugated bilirubin becomes excreted in the urine, which becomes dark brown in colour. The urine also contains bile salts, and serum alkaline phosphatase is elevated because of the biliary obstruction.

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
causes: obstruction of the biliary passages by gallstones, cancer of the head of the pancreas, or inflammation of the pancreas or of the passages
scope: undergraduate heme metabolism, module 103 BMS
epidemiology: none — the book gives no Egyptian epidemiology for biliary obstruction and none is imported

---

# Item

## id
CLM-GIT-JAUNDICE-CLASSIFICATION-01

## concept_id
CON-GIT-4A2A86832F1FF2

## subject
The three jaundices

## predicate
are distinguished by

## object
Which bilirubin fraction rises, and which serum enzyme rises with it — alkaline phosphatase in biliary obstruction, ALT and AST in liver cell damage, and no enzyme recorded in haemolysis

## display_text
Jaundice is classified by the predominant form of bilirubin in serum: unconjugated, conjugated, or both together. Unconjugated hyperbilirubinaemia covers haemolytic jaundice; conjugated hyperbilirubinaemia is obstructive jaundice, where serum alkaline phosphatase is elevated because of the biliary obstruction; and the mixed picture is hepatocellular jaundice, where serum ALT and AST are elevated because of liver cell damage. The book records no enzyme change for haemolytic jaundice.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
The book's summary table on file page 125 labels the third row "Hepatotoxic Jaundice", while its prose on file page 124 calls the same entity "toxic hyperbilirubinemia or hepatocellular jaundice", and the 2025 exam paper prints "Hepatocelluler juandice". One entity, three spellings; the difference is wording, not substance.

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
enzymes: ALP in obstruction, ALT and AST in liver cell damage, none stated for haemolysis
absence: the book's own summary table has no enzyme column at all, and its prose on haemolytic jaundice names no enzyme — that cell is blank, not "normal"
numbers: no reference range for ALP, ALT or AST is given in the book, so no numeric threshold is asserted

---

# Item

## id
CLM-HEM-HAEMOLYTIC-JAUNDICE-BILIRUBIN-01

## concept_id
CON-HEM-F2B664C215C912

## subject
Haemolytic jaundice, where bilirubin production outruns the liver's excretory capacity

## predicate
raises

## object
Serum unconjugated bilirubin, which is albumin-bound and cannot appear in urine — the "acholuric jaundice" of the book

## display_text
In haemolytic jaundice increased haemolysis produces bilirubin beyond the excretory capacity of the liver, so serum bilirubin rises, mainly unconjugated. Stercobilin increases in the faeces, which become dark brown. Because unconjugated bilirubin is bound to plasma albumin it cannot be excreted in the urine, and hence the book's name for it, acholuric jaundice.

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
fraction: unconjugated (indirect) rises; conjugated stays normal
stool: dark brown, not pale — the opposite of obstructive jaundice
causes: abnormal haemoglobin, red cell enzyme deficiency including G6PD and pyruvate kinase, red cell antibodies, and some infections such as malaria

---

# Item

## id
CLM-REN-ALCOHOL-LACTATE-URATE-01

## concept_id
CON-REN-0460ED67059E66

## subject
Alcohol intake, through the rise in NADH and then in blood lactate

## predicate
decreases

## object
Renal excretion of uric acid, because lactate and uric acid occupy the same renal tubular transporter and lactate binds it in preference

## display_text
Oxidation of alcohol to acetaldehyde generates a large amount of NADH; the raised NADH/NAD⁺ ratio shifts the lactate dehydrogenase reaction toward lactate. The elevation of blood lactate decreases the excretion of uric acid from the kidneys, because both occupy the same transporter in the renal tubules, and lactate — higher in concentration and more soluble — succeeds in binding it in favour of uric acid, which is retained, causing gout. Alcohol also causes dehydration.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
category: decreased excretion, that is renal gout — not overproduction
transporter: unnamed — the book says only "the same transporter in renal tubules" and no name is supplied
scope: undergraduate purine metabolism, module 103 BMS

---

# Item

## id
CLM-REN-URICOSURIC-DRUGS-01

## concept_id
CON-REN-38B4BED80BC671

## subject
Uricosuric drugs, the third of the book's three drug groups for gout

## predicate
lower blood uric acid by

## object
Increasing its excretion, and must be taken with plenty of fluid and alkalinisation of the urine to prevent the formation of renal stones

## display_text
Besides anti-inflammatory agents, which relieve joint pain without lowering urate, the book divides urate-lowering drugs in two: those that decrease the production of uric acid, and those that increase its excretion — the uricosuric drugs. The uricosuric group must be taken with plenty of fluid, with alkalinisation of the urine, to prevent the formation of renal stones.

## risk_class
treatment_or_action

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.85

## freshness
stable_local_curriculum_fact

## time_sensitive
yes

## review_due
2027-08-21

## qualifiers
membership: no member of the class is named, because the department book prints the heading with no member and the examiner's own model answer does the same
dose: none stated in either source, and none is supplied
availability: no brand name; local availability in Egypt could not be verified from any source in this corpus
precaution: plenty of fluid and alkalinisation of urine, to prevent renal stones
publication: treatment content, must not auto-publish

---

# Item

## id
CLM-REN-GOUT-TOPHI-DIAGNOSIS-01

## concept_id
CON-REN-31708150F8B722

## subject
Gout, a painful inflammation in one or more joints

## predicate
is characterised by

## object
Deposition of nodular masses of uric acid crystals, tophi, in soft-tissue areas — around the fingers, the tips of the elbows and the big toe — with urates precipitating in the urinary tract as renal stones

## display_text
Gout is a painful inflammation in one or more joints, characterised by deposition of nodular masses of uric acid crystals — tophi — in different soft-tissue areas of the body. In the joints they are most often found as hard nodules around the fingers, at the tips of the elbows, and around the big toe, causing arthritis. Precipitation of urates in the urinary tract may lead to renal stones.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
The 2025 exam stem places the tophus crystals "in urine", while the book describes tophi as deposits in soft tissue and says separately that urate precipitating in the urinary tract forms renal stones. The book's account is what this claim asserts.

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
sites: soft tissue generally; in joints, around the fingers, the tips of the elbows and the big toe
cause: hyperuricaemia, from either overproduction (metabolic) or decreased excretion (renal)
epidemiology: none — the book gives no prevalence, and none is supplied
evidence: no citation in this batch — the articles name none for this claim, though the book states it on file page 130

---

# Item

## id
CLM-REN-ALLOPURINOL-MECHANISM-01

## concept_id
CON-REN-E5BAEF03791C8F

## subject
Allopurinol, the book's drug of choice for decreasing the production of uric acid

## predicate
inhibits

## object
Xanthine oxidase, through its metabolite oxypurinol, and additionally lowers the PRPP pool

## display_text
Allopurinol is the drug of choice among drugs that decrease the production of uric acid. It resembles hypoxanthine closely enough that xanthine oxidase oxidises it to oxypurinol, and oxypurinol then binds tightly to xanthine oxidase, inhibiting its ability to oxidise hypoxanthine and xanthine and so decreasing uric acid formation. The reaction of allopurinol with PRPP also lowers PRPP levels and therefore de-novo purine synthesis. Two points of action, one drug.

## risk_class
treatment_or_action

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
yes

## review_due
2027-08-21

## qualifiers
mechanism: competitive substrate then tight-binding inhibitor of xanthine oxidase, via oxypurinol
second_action: reaction with PRPP lowers the PRPP pool and de-novo purine synthesis
dose: none stated in the book, and none is supplied
caution: the live concept label carries a caution about impaired kidney function that the 103 book does not state; it is not restated as fact here and a reviewer should trace its source
publication: treatment content, must not auto-publish

---

# Item

## id
CLM-FND-FAT-SOLUBLE-VITAMINS-01

## concept_id
CON-FND-46B9F239340ED9

## subject
The four fat-soluble vitamins A, D, E and K

## predicate
each have

## object
One active form, one main function and one deficiency — A for epithelium and vision with night blindness, D as calcitriol for plasma calcium with rickets and osteomalacia, E as α-tocopherol the antioxidant with red cell fragility, K as the hydroquinone for γ-carboxylation of glutamate with bleeding

## display_text
Vitamin A, active as retinol, retinal and retinoic acid, maintains healthy epithelium, vision, reproduction and gene expression; deficiency gives night blindness, in which the dark adaptation time is increased, and xerophthalmia. Vitamin D is hydroxylated in the liver by 25-hydroxylase to calcidiol and in the kidney by 1-hydroxylase to calcitriol, the active form, which maintains plasma calcium and calcification of bone; deficiency gives rickets and osteomalacia. Vitamin E, as α-tocopherol, is the antioxidant; deficiency increases red cell fragility and leads to anaemia. Vitamin K, as the hydroquinone, γ-carboxylates glutamate residues of the clotting factors and other proteins; deficiency gives bleeding.

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
count: four vitamins, each with one active form, one function and one deficiency
handling: absorbed with dietary fats in chylomicrons, need a carrier protein, are stored, and their deficiencies appear late
epidemiology: none — no Egyptian prevalence for any of these deficiencies exists in the corpus, and vitamin D deficiency in particular should carry a local figure before publication rather than a Western one

---

# Item

## id
CLM-FND-WATER-SOLUBLE-VITAMINS-01

## concept_id
CON-FND-C9E5128193029E

## subject
Vitamin C and the B complex, the water-soluble vitamins

## predicate
act as

## object
Coenzymes, each running one identifiable reaction — thiamine the oxidative decarboxylation of α-keto acids, biotin carboxylation, pantothenic acid the acyl carrier of coenzyme A, folate one-carbon transfer, cobalamin homocysteine to methionine and methylmalonyl-CoA to succinyl-CoA, and vitamin C the water-soluble antioxidant

## display_text
The water-soluble vitamins work as coenzymes, and each is identified by the reaction it runs. Thiamine, as thiamine pyrophosphate, runs oxidative decarboxylation of α-keto acids and transketolase. Riboflavin and niacin are hydrogen carriers. Pantothenic acid is the vitamin of coenzyme A and the acyl carrier. Biotin runs carboxylation, that is CO₂ fixation. Folic acid, as tetrahydrofolate, transfers one-carbon units. Cobalamin converts homocysteine to methionine and methylmalonyl-CoA to succinyl-CoA. Vitamin C is the highly efficient water-soluble antioxidant, and pyridoxal phosphate sits at each catalytic site of muscle glycogen phosphorylase.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
handling: absorbed directly into blood, not stored except folate and B12, and their deficiencies appear rapidly
deficiencies: beriberi for thiamine, pellagra for niacin, megaloblastic anaemia and neural tube defects for folate, subacute combined degeneration for cobalamin, scurvy for vitamin C
numbers: the book's RDA figures are not reproduced here

---

# Item

## id
CLM-FND-FOLATE-ANTAGONISTS-01

## concept_id
CON-FND-1A4A49607783A9

## subject
The two folate antagonists the book names, sulfonamides and methotrexate

## predicate
act at

## object
Two different enzymes — sulfonamides on the bacterial enzyme that incorporates PABA into folic acid, methotrexate on dihydrofolate reductase

## display_text
Sulfonamides are competitive inhibitors of the enzyme bacteria need to incorporate PABA into folic acid, so bacterial multiplication is inhibited; they do not affect human DNA or RNA synthesis, because mammalian cells cannot synthesise folic acid at all. Methotrexate is an anticancer drug and a competitive inhibitor of dihydrofolate reductase, so folic acid is not activated and DNA synthesis and cell division of malignant cells stop — the conversion of dUMP to dTMP requires methylene-THF. That is why one is an antibacterial and the other an anticancer drug.

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.9

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
selectivity: sulfonamides are selective because humans cannot synthesise folate; methotrexate is not, which is why treatment with it is one of the book's listed causes of folate deficiency
enzyme: the bacterial enzyme is not named by the book, only described as "the enzyme needed to incorporate PABA to form folic acid by bacteria"
dose: none stated in the book, and none is supplied
risk_class_note: kept foundational_stable because the book teaches this as the biochemistry of folate, with no dose and no prescribing advice; CON-FND-1A4A49607783A9 records that a reviewer may prefer treatment_or_action
