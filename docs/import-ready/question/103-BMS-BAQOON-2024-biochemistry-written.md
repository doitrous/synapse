<!--
  103 BMS · Biochemistry · Baqoon (second-sitting resit), year 2024.

  Source: EOY BIO Final 103 exam - 2024 دور ثاني with Bio. Answers (2).pdf,
  manifest src_6ca3fcffebc33baa2c92 — Kasr Al Ainy module 103 BMS, Baqoon
  (second round). Page 1 is headed "196 - 103 INT (BAKOON) 9 - 7 - 2024" — the
  printed batch code is 196, which the validated sitting-year rule
  (batchCode + 1827) would read as 2023, but page 1 also prints an explicit
  calendar date, 9 July 2024. Per the brief's tie-break rule, a printed date
  wins over the batch-code inference, so this paper is authored as the 2024
  sitting, matching both the source filename and the manifest's own calendar
  label. Flagged here rather than silently resolved, since it is the one
  paper in this set where the two rules disagree.

  Page 1: Anatomy, then Biochemistry (Explain, Enumerate, Cases headers).
  Page 2: Physiology (out of scope). Page 3: the same three Biochemistry
  Cases repeated as blank answer space, then "Histology:- all MCQ" (out of
  scope, no MCQ content printed on this paper). The model-answer content for
  the Biochemistry section is an image overlay on page 1, not in the cached
  text layer — read by opening the PDF directly.

  THE PAPER PRINTS NO MARKS for the Biochemistry section (contrast its own
  Physiology section, which prices each item in Marks). Nominal 2-mark
  placeholders are used throughout and flagged in author_notes, the same
  convention as the sibling 2023 Baqoon file in this folder.

  "Cataract may occur in cases of DM" is crossed out with no answer box
  anywhere in the solved copy — the exam's own key does not answer it. The
  department book does cover the mechanism (the polyol pathway trapping
  glucose as sorbitol in the lens), so it is authored here from the book
  rather than skipped, with the crossing-out noted in author_notes.

  Status: Draft throughout, needs faculty review, in particular of the
  nominal marks and of whether "Cataract...DM" was actually asked or struck
  from this sitting.

  Validate with:
    npm run medical:batch -- docs/Kasr-Source-Imports/written/103-BMS-BAQOON-2024-biochemistry-written.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-lipid-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-aminoacid-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-heme-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-biochemistry.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-carbohydrate.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-lipid.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-aminoacid.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-heme.md
-->

# Item

## id
QST-103-BIO-BAQOON2024-01

## title
Explain: ammonia toxicity, DM and cataract, cyanide, alcohol and gout, vitamin B6 deficiency anaemia

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## question
Explain each of the following on its biochemical basis.

## format
multipart_written

## written_parts
### (a) 2 marks
Ammonia is very toxic to the brain.
Expects: Ammonia shifts α-ketoglutarate towards glutamate formation, depleting α-ketoglutarate and decreasing ATP production, which can lead to coma and death
Expects: Convulsions follow from a resulting deficiency of GABA, the inhibitory neurotransmitter formed from glutamate by decarboxylation
Expects: Brain oedema follows from osmotic imbalance caused by high levels of ammonia and glutamine in astrocytes
Concept: CON-FND-880D165894A5EC

### (b) 2 marks
Cataract may occur in cases of diabetes mellitus.
Expects: Aldose reductase converts glucose to sorbitol by the polyol pathway, and the lens (like the nerve) is one of the tissues that cannot refuse this route
Expects: Sorbitol does not diffuse out of the lens easily and is osmotically active, so it draws in water, and the resulting osmotic damage to the lens fibres produces cataract
Concept: CON-END-5D8DA0351D0C94

### (c) 2 marks
Cyanide is toxic to the tissues.
Expects: Cyanide, together with carbon monoxide and hydrogen sulfide, is a powerful poison that inhibits cytochrome c oxidase (complex IV of the respiratory chain), which inhibits ATP production
Expects: Low amounts cause dizziness, breathlessness, numbness and headache; high levels cause convulsions, coma and death
Concept: CON-FND-A3BC299ED2C7C9

### (d) 2 marks
Alcohol intake may precipitate an acute attack of gouty arthritis.
Expects: Oxidation of alcohol (ethanol) to acetaldehyde generates a significant amount of NADH, and the raised NADH/NAD+ ratio shifts the lactate dehydrogenase reaction toward lactate formation
Expects: The raised blood lactate decreases renal excretion of uric acid, since lactic acid and uric acid occupy the same transporter in the renal tubules and lactate, being higher in concentration and more soluble, succeeds in binding the transporter in preference to uric acid, which is retained, causing gout
Expects: Alcohol intake also causes dehydration, which independently raises the risk of an acute attack
Concept: CON-REN-0460ED67059E66

### (e) 2 marks
Vitamin B6 deficiency may lead to anaemia.
Expects: Pyridoxal phosphate, the active form of vitamin B6, is the coenzyme for ALA synthase, the first and rate-limiting enzyme of haem synthesis
Expects: Without it, haem synthesis fails and the result is a microcytic, hypochromic (sideroblastic-type) anaemia, distinct from the anaemias of iron or folate deficiency
Concept: CON-FND-C9E5128193029E

## derived_from

## topic
Biochemistry

## subtopic
Ammonia toxicity, diabetic complications, the respiratory chain, gout and vitamin B6

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-FND-880D165894A5EC | CON-END-5D8DA0351D0C94 | CON-FND-A3BC299ED2C7C9 | CON-REN-0460ED67059E66 | CON-FND-C9E5128193029E

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolism of Ammonia (Fate & Sources)
103 BMS > Biochemistry > Carbohydrate Metabolism > Diabetes Mellitus
103 BMS > Biochemistry > Bioenergetics > Respiratory Chain (Electron Transport Chain)
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Disorders of Purine Metabolism
103 BMS > Biochemistry > Vitamins > Vitamin B6 (Pyridoxine)

## clinical_relevance
0.75

## academic_relevance
0.9

## cognitive_effort_score
0.45

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for
KAU_Y1

## concept_ids

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
7

## contextual_concept_ids

## library_ids
ART-103-BIO-AMMONIA-METABOLISM | ART-103-BIO-DIABETES-MELLITUS | ART-103-BIO-RESPIRATORY-CHAIN | ART-103-BIO-GOUT-AND-HYPERURICAEMIA | ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids

## learning_objective
Explain, on their biochemical basis, why ammonia is neurotoxic, how the polyol pathway causes diabetic cataract, why cyanide poisons the respiratory chain, how alcohol precipitates gout through lactate competing for the renal urate transporter, and why vitamin B6 deficiency causes anaemia.

## media_recommendations

## source_citation
EOY BIO Final 103 exam - 2024 دور ثاني with Bio. Answers (2).pdf — Kasr Al Ainy, module 103 BMS, Baqoon (second round), 9 July 2024 (printed date; page also prints batch code 196), Biochemistry, "Explain" block, p1, five items. Manifest src_6ca3fcffebc33baa2c92. Model answer for parts (a), (c), (d) from the same file's overlaid answer boxes, p1, read by opening the PDF directly; part (b) has no answer box on this paper (its item is crossed out on the key) and is sourced from the department book instead; part (e) from the department book. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "Explain: Ammonia is very toxic to the brain / Cataract may occur in cases of DM / Cyanid is toxic to the tissues / Alcohol intake may precipitate an acute attack if gouty arthritis / Vitamin B6 deficiency may lead to anemia" (paper's own spellings "Cyanid", "if gouty arthritis" for "of gouty arthritis" not reproduced above).
Part (b), "Cataract may occur in cases of DM", is marked with a large X on the solved copy and carries no answer box anywhere in the file — the exam's own key does not answer it. The department book does cover the mechanism (aldose reductase / polyol pathway damage to the lens), so it is authored from the book rather than skipped; a faculty reviewer should confirm whether this item was actually asked on the day or struck before the sitting.
No marks are printed for the Biochemistry section of this paper (contrast its own Physiology section, which prices "Action Potential... 8 Marks" etc.); every written_parts mark above is a nominal 2-mark placeholder, not a transcribed value.
This paper's page 1 header reads "196 - 103 INT (BAKOON) 9 - 7 - 2024" — batch code 196 alone would read as 2023 under the validated batchCode+1827 rule, but the explicit printed date "9-7-2024" wins per the brief's tie-break rule, so this file is named for 2024.

## estimated_seconds
360

## randomise_answers
no

---

# Item

## id
QST-103-BIO-BAQOON2024-02

## title
Enumerate: key glycolytic enzymes, causes of ketosis, hypercholesterolaemia, glycine derivatives, vitamin A functions, negative nitrogen balance

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## question
Enumerate each of the following.

## format
multipart_written

## written_parts
### (a) 2 marks
Three key enzymes of glycolysis.
Expects: Glucokinase (in liver and β-cells) or hexokinase (elsewhere)
Expects: Phosphofructokinase-1 (PFK-1)
Expects: Pyruvate kinase (PK)
Concept: CON-FND-853096A349FFBD

### (b) 2 marks
Three causes of ketosis.
Expects: Starvation
Expects: A low-carbohydrate, high-fat diet
Expects: Severe uncontrolled diabetes mellitus — every cause of ketosis is a state of high anti-insulin to insulin ratio
Concept: CON-END-CC450A236ABF50

### (c) 2 marks
Four causes of hypercholesterolaemia.
Expects: Familial hyperlipoproteinaemias
Expects: Hypothyroidism, since thyroid hormone normally increases oxidation of cholesterol and its conversion to bile acids
Expects: Obesity, and dietary causes — a diet rich in saturated fat, carbohydrate and cholesterol
Expects: Obstructive jaundice, which blocks the pathway for excretion of cholesterol and bile acids, or diabetes mellitus, through increased lipolysis and fatty acid oxidation raising hepatic cholesterol synthesis
Concept: CON-GIT-E6AEB25F31B529

### (d) 2 marks
Three derivatives of glycine.
Expects: Glutathione
Expects: Haem (glycine and succinyl-CoA condense to form δ-aminolevulinic acid, the first step of haem synthesis)
Expects: Purines and creatine — glycine also feeds the one-carbon pool and is required for the synthesis of bile salts
Concept: CON-FND-38F3A09255526F

### (e) 2 marks
Three functions of vitamin A.
Expects: Forms part of the visual pigments of the rod and cone cells of the retina, as 11-cis-retinal bound to opsin
Expects: Promotes synthesis of glycoproteins in mucous membranes and induces synthesis of the glycoproteins of connective tissue matrix
Expects: Needed for normal growth of bone and eruption of teeth, and has an antioxidant action
Concept: CON-FND-46B9F239340ED9

### (f) 2 marks
Causes of negative nitrogen balance.
Expects: Inadequate protein intake — starvation, malnutrition, or deficiency of an essential amino acid
Expects: Loss of protein — chronic haemorrhage, albuminuria, lactation on an inadequate diet
Expects: Increased protein catabolism — diabetes mellitus, Cushing's syndrome, hyperthyroidism, infectious fevers
Concept: CON-FND-B320D24EC35D30

## derived_from

## topic
Biochemistry

## subtopic
Glycolysis, ketosis, cholesterol, glycine, vitamin A and nitrogen balance

## difficulty
Easy

## question_type
Classification

## main_concept
CON-FND-853096A349FFBD | CON-END-CC450A236ABF50 | CON-GIT-E6AEB25F31B529 | CON-FND-38F3A09255526F | CON-FND-46B9F239340ED9 | CON-FND-B320D24EC35D30

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis
103 BMS > Biochemistry > Lipid Metabolism > Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)
103 BMS > Biochemistry > Lipid Metabolism > Cholesterol
103 BMS > Biochemistry > Individual amino acid Metabolism > Glycine
103 BMS > Biochemistry > Vitamins > Vitamin A (Retinol, Antixerophthalmia)
103 BMS > Biochemistry > General protein Metabolism

## clinical_relevance
0.5

## academic_relevance
0.95

## cognitive_effort_score
0.3

## exam_weight_by_year
KAU_Y1=0.75

## question_only_for
KAU_Y1

## concept_ids

## years
KAU_Y1

## universities
kau

## cognitive_effort
Low

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

## exam_relevance
7

## contextual_concept_ids

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE | ART-103-BIO-KETOSIS | ART-103-BIO-CHOLESTEROL-METABOLISM | ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN | ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS | ART-103-BIO-NITROGEN-BALANCE

## resource_ids

## learning_objective
Recall, as bare lists, the key irreversible enzymes of glycolysis, the causes of ketosis, the causes of hypercholesterolaemia, three derivatives of glycine, three functions of vitamin A, and the causes of negative nitrogen balance.

## media_recommendations

## source_citation
EOY BIO Final 103 exam - 2024 دور ثاني with Bio. Answers (2).pdf — Kasr Al Ainy, module 103 BMS, Baqoon (second round), 2024, Biochemistry, "Enumerate" block, p1, six items. Manifest src_6ca3fcffebc33baa2c92. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "Enumerate: 3 Key enzymes of glycolysis / 3 Causes of ketosis / 4 Causes of hypercholesterolemia / 3 derivatives of glycine / 3 Functions of vit.A / Cuases of negative netirogen balance" (paper's own misspellings "Cuases", "netirogen" not reproduced above).
No marks are printed for this block; the 2-mark-per-part placeholder is nominal, as on the sibling Explain record for this paper.

## estimated_seconds
420

## randomise_answers
no

---

# Item

## id
QST-103-BIO-BAQOON2024-03

## title
Case: an infant with pale skin, mousy urine and mental retardation (PKU)

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A 5-year-old child presents with mental retardation and hypopigmentation. Blood examination reveals an elevated phenylalanine level.

## question
Answer the three parts below about this child: the diagnosis, the deficient enzyme, and the causes of the mental retardation and hypopigmentation.

## format
multipart_written

## written_parts
### (a) 1 marks
What is the most likely diagnosis?
Expects: Phenylketonuria (PKU)
Concept: CON-FND-D7BB8C3AFB54CC

### (b) 1 marks
Mention the enzyme deficient in this case.
Expects: Phenylalanine hydroxylase (PAH)
Expects: In 1–2% of cases the deficiency is instead of its coenzyme, tetrahydrobiopterin (BH4)
Concept: CON-FND-D7BB8C3AFB54CC
Depends on: a

### (c) 2 marks
Explain the causes of the mental retardation and hypopigmentation in this child.
Expects: Elevated phenylalanine and its metabolites interfere with transport of tyrosine and tryptophan to the brain, leading to their deficiency there, and decreased tyrosine impairs neurotransmitter synthesis in the brain — this explains why an untreated patient shows mental retardation manifest by the age of one year
Expects: Hypopigmentation of hair, skin and iris of the eye follows from deficiency of tyrosine (the substrate melanin is made from) and from high levels of phenylalanine competitively inhibiting the tyrosinase enzyme
Concept: CON-FND-587B0A39D3C0BD | CON-FND-1DF6B985CB77A1
Depends on: a

## derived_from

## topic
Biochemistry

## subtopic
Aromatic amino acid metabolism

## difficulty
Moderate

## question_type
Diagnosis

## main_concept
CON-FND-D7BB8C3AFB54CC | CON-FND-587B0A39D3C0BD | CON-FND-1DF6B985CB77A1

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Aromatic Amino Acids (Phenylalanine and Tyrosine)

## clinical_relevance
0.9

## academic_relevance
0.9

## cognitive_effort_score
0.45

## exam_weight_by_year
KAU_Y1=0.85

## question_only_for
KAU_Y1

## concept_ids

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids

## library_ids
ART-103-BIO-PHENYLKETONURIA

## resource_ids

## learning_objective
Recognise phenylketonuria from mental retardation and hypopigmentation with a raised phenylalanine level, name the deficient enzyme (and its rarer coenzyme variant), and explain the neurological and pigmentary features as two separate consequences of the same blocked hydroxylation.

## media_recommendations

## source_citation
EOY BIO Final 103 exam - 2024 دور ثاني with Bio. Answers (2).pdf — Kasr Al Ainy, module 103 BMS, Baqoon (second round), 2024, Biochemistry, Cases block, "PKU", p1 (listed) / p3 (repeated as blank answer space); model answer overlay p1, Case (7). Manifest src_6ca3fcffebc33baa2c92. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper's Cases list: "PKU". The overlaid model answer (Case (7) on the solved copy) supplies the full case wording used for the vignette and parts above: "A 5-years old child presents with mental retardation, hypopigmentation blood examination revealed elevated phenylalanine level? a) What is most likely the diagnosis? b) Mention the enzyme deficient in this case? c) Explain the causes of mental retardation, hypopigmentation in this child?" (paper's own wording; minor grammar not corrected in the vignette above beyond normalising into full sentences).
No marks are printed for this case; nominal marks are used, consistent with the sibling records for this paper.

## estimated_seconds
300

## randomise_answers
no

---

# Item

## id
QST-103-BIO-BAQOON2024-04

## title
Case: a newborn with yellowish skin and sclera in the first days of life (physiological neonatal jaundice)

## subject
haem

## status
Draft

## owner
Claude

## vignette
A newborn baby is suffering from yellowish colour of the sclera and skin in the first few days of life. Blood examination shows an elevated serum bilirubin level and signs of haemolytic anaemia.

## question
Answer the four parts below about this newborn: the diagnosis, the bilirubin fraction expected to be elevated, the expected colour of the urine, and the treatment.

## format
multipart_written

## written_parts
### (a) 1 marks
What is the most probable diagnosis?
Expects: Physiological neonatal jaundice
Concept: CON-HEM-167E007FE3D9EC

### (b) 1 marks
Which type of bilirubin is expected to be elevated, conjugated or unconjugated?
Expects: Unconjugated bilirubin
Concept: CON-HEM-167E007FE3D9EC
Depends on: a

### (c) 1 marks
Comment on the expected colour of urine.
Expects: Urine colour will be normal, because unconjugated bilirubin is water-insoluble and so is not excreted by the kidney
Concept: CON-HEM-C87C15A849F158
Depends on: b

### (d) 2 marks
How can you treat this condition?
Expects: Exposure to blue fluorescent light (phototherapy), which converts insoluble unconjugated bilirubin to more soluble photoisomers that are excreted into bile without needing conjugation to glucuronic acid
Expects: Phenobarbital, which induces synthesis of glucuronyl transferase
Concept: CON-HEM-7A26AE75471EF8
Depends on: a

## derived_from

## topic
Biochemistry

## subtopic
Neonatal jaundice and bilirubin conjugation

## difficulty
Moderate

## question_type
Diagnosis

## main_concept
CON-HEM-167E007FE3D9EC | CON-HEM-C87C15A849F158 | CON-HEM-7A26AE75471EF8

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Jaundice (Icterus or Hyperbilirubinemia)
103 BMS > Biochemistry > Heme Metabolism > Blood Bilirubin

## clinical_relevance
0.85

## academic_relevance
0.85

## cognitive_effort_score
0.4

## exam_weight_by_year
KAU_Y1=0.8

## question_only_for
KAU_Y1

## concept_ids

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## contextual_concept_ids

## library_ids
ART-103-BIO-HYPERBILIRUBINAEMIA-SYNDROMES | ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN

## resource_ids

## learning_objective
Diagnose physiological neonatal jaundice, reason from the unconjugated bilirubin fraction to a normal urine colour, and give the two mechanisms — phototherapy and phenobarbital — by which it is treated.

## media_recommendations

## source_citation
EOY BIO Final 103 exam - 2024 دور ثاني with Bio. Answers (2).pdf — Kasr Al Ainy, module 103 BMS, Baqoon (second round), 2024, Biochemistry, Cases block, "Neonatal physiological jaundice", p1 (listed) / p3 (repeated as blank answer space); model answer overlay p1, Case (1). Manifest src_6ca3fcffebc33baa2c92. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper's Cases list: "Neonatal phsiological jaundice" (paper's spelling). The overlaid model answer (Case (1) on the solved copy) supplies the full case wording and four sub-questions used above, matching the same case that appears on the sibling 103-BMS-EOY-2023-biochemistry-written.md file's Case record (same case, drawn from the department's own reference bank) — authored independently here since it is this paper's own listed case.
No marks are printed for this case; nominal marks are used, consistent with the sibling records for this paper.

## estimated_seconds
300

## randomise_answers
no

---

# Item

## id
QST-103-BIO-BAQOON2024-05

## title
Case: Von Gierke's disease — the five H's, and why they occur

## subject
endo

## status
Draft

## owner
Claude

## vignette
A patient shows fasting hypoglycaemia, hepatomegaly, hypertriacylglycerolaemia, hypercholesterolaemia and hyperuricaemia — the "5 H" picture of a glycogen storage disease.

## question
Answer the five questions below about this patient's Von Gierke's disease.

## format
multipart_written

## written_parts
### (a) 1 marks
What is your diagnosis?
Expects: Von Gierke's disease (type I glycogen storage disease), the most common glycogen storage disease worldwide
Concept: CON-FND-1BE461A57AB76D

### (b) 1 marks
What is the defective enzyme?
Expects: Glucose-6-phosphatase, in the liver
Concept: CON-FND-1BE461A57AB76D
Depends on: a

### (c) 2 marks
Comment on the presence of hypoglycaemia.
Expects: Without glucose-6-phosphatase, glucose 6-phosphate released by glycogenolysis and made by gluconeogenesis cannot be dephosphorylated to free glucose, so both glycogenolysis and gluconeogenesis fail to raise blood glucose during fasting
Concept: CON-FND-1BE461A57AB76D
Depends on: b

### (d) 2 marks
Comment on the hypertriacylglycerolaemia and hypercholesterolaemia.
Expects: The severe hypoglycaemia raises epinephrine, which increases lipolysis, releasing FFA and glycerol that the liver re-esterifies to triacylglycerol, raising plasma VLDL and giving hyperlipidaemia and a fatty liver
Concept: CON-FND-1BE461A57AB76D
Depends on: c

### (e) 2 marks
Explain why there is hyperuricaemia in this condition.
Expects: The accumulated glucose 6-phosphate is diverted through the hexose monophosphate pathway, raising purine (adenine, guanine) synthesis and degradation, so more uric acid is formed
Expects: Lactic acidosis (from increased glycolysis of the accumulated glucose 6-phosphate) competes with uric acid for renal tubular excretion, decreasing uric acid excretion and further raising blood uric acid
Concept: CON-FND-1BE461A57AB76D
Depends on: c

## derived_from

## topic
Biochemistry

## subtopic
Glycogen storage disease

## difficulty
Challenging

## question_type
Pathophysiology

## main_concept
CON-FND-1BE461A57AB76D

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Storage Diseases

## clinical_relevance
0.85

## academic_relevance
0.9

## cognitive_effort_score
0.65

## exam_weight_by_year
KAU_Y1=0.85

## question_only_for
KAU_Y1

## concept_ids

## years
KAU_Y1

## universities
kau

## cognitive_effort
High

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
42

## exam_relevance
8

## contextual_concept_ids

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM

## resource_ids

## learning_objective
Trace every one of the five features of Von Gierke's disease — fasting hypoglycaemia, hepatomegaly, hypertriacylglycerolaemia, hypercholesterolaemia and hyperuricaemia — back to the single missing enzyme, glucose-6-phosphatase.

## media_recommendations

## source_citation
EOY BIO Final 103 exam - 2024 دور ثاني with Bio. Answers (2).pdf — Kasr Al Ainy, module 103 BMS, Baqoon (second round), 2024, Biochemistry, Cases block, "VON Geirk disease", p1 (listed) / p3 (repeated as blank answer space); model answer overlay p3, "Von Gierke's disease" reference block. Manifest src_6ca3fcffebc33baa2c92. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper's Cases list: "VON Geirk disease" (paper's spelling). The overlaid answer block on p3 gives the "5 H" characteristics and five numbered questions used above.
No marks are printed for this case; nominal marks are used, consistent with the sibling records for this paper.

## estimated_seconds
420

## randomise_answers
no
