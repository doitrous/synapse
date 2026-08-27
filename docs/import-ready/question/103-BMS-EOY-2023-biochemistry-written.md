<!--
  103 BMS · Biochemistry · EOY, first sitting, year 2023.

  Source: EOY BIO Final 103 exam - 2023 دور أول with Bio. Answers (2).pdf,
  manifest src_276d2aaab46f564b4b49 — Kasr Al Ainy module 103 BMS, end of
  year, first round. Page 1 prints "Module BMS 103 EXAM 2023" — the year is
  printed directly, so no batch-code inference is needed. Page 1:
  Anatomy, Physiology, then Biochemistry Explain/Enumerate headers (no marks
  printed anywhere in Biochemistry). Pages 2–4: reference/model-answer
  material as image boxes, keyed to the circled numbers on page 1, not in
  the cached text layer — read by opening the PDF directly. Page 5: the tail
  of Enumerate ("Three importance of beta oxidation") then a "CASES" section
  with three cases and their own printed answer boxes.

  Two Explain items are marked with an X on the answer key and carry no
  answer box anywhere in the file: "Obesity is the common cause of insulin
  resistance" and "Four outlines for treatment of hyperammonemia". The
  department book's cached text (src_300847a5fa64809d6c07) was searched for
  "insulin resistance" and "insulin sensitivity" and returns no hit; the book
  states only that obesity is usually associated with hypercholesterolaemia
  (p75), not a mechanism for insulin resistance. Both items are authored
  Draft with the available Expects content flagged as thin, per author_notes,
  rather than skipped or invented.

  Status: Draft throughout, needs faculty review of marks (none printed) and
  of the two X-marked items above.

  Validate with:
    npm run medical:batch -- docs/Kasr-Source-Imports/written/103-BMS-EOY-2023-biochemistry-written.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-lipid-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-aromatic-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-biochemistry.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-carbohydrate.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-lipid.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-aromatic.md
-->

# Item

## id
QST-103-BIO-EOY2023-01

## title
Explain: Von Gierke's hypoglycaemia, obesity and insulin resistance, CO/cyanide toxicity, ketogenesis/ketolysis sites, ammonia's low blood level, vitamin C anaemia

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
Fasting hypoglycaemia for Von Gierke's disease.
Expects: Von Gierke's disease is a defect of hepatic glucose-6-phosphatase, so glucose 6-phosphate released by glycogenolysis and made by gluconeogenesis cannot be dephosphorylated to free glucose, and fasting hypoglycaemia results
Concept: CON-FND-1BE461A57AB76D

### (b) 2 marks
Obesity is the common cause of insulin resistance.
Expects: The department book states that obesity is usually associated with hypercholesterolaemia; a specific mechanism connecting obesity to insulin resistance is not given in the cached department book text and this paper's own answer key carries no answer for this item either
Concept: CON-END-85750744126501

### (c) 2 marks
Carbon monoxide and cyanide are toxic for tissue.
Expects: Cyanide (CN), carbon monoxide (CO, automobile exhaust) and hydrogen sulfide (H2S, oil drilling operations) are powerful poisons that inhibit cytochrome c oxidase (complex IV) and inhibit ATP production
Expects: Low amounts cause dizziness, breathlessness, numbness and headache; high levels cause convulsions, coma and death
Concept: CON-FND-A3BC299ED2C7C9

### (d) 2 marks
Ketogenesis occurs in liver only, while ketolysis occurs in extrahepatic tissue.
Expects: Ketogenesis builds ketone bodies from acetyl-CoA (from β-oxidation of fatty acids and ketogenic amino acids) using HMG-CoA synthase and lyase, present in the mitochondria of the liver
Expects: Ketolysis oxidises ketone bodies to CO2 and H2O in the mitochondria of extrahepatic tissues, which have high thiophorase (succinyl-CoA acetoacetate CoA-transferase) activity — an enzyme the liver lacks
Concept: CON-END-2E748A37DA660A

### (e) 2 marks
Although ammonia is secreted in a continuous state by tissue, it is present in low concentration in blood.
Expects: The liver's formation of urea is the most important disposal route for ammonia; small amounts are also converted to glutamine by glutamine synthetase
Expects: The brain synthesises glutamine from glutamate and ammonia (its major mechanism for removing ammonia), transports it to the kidneys and liver, where glutaminase hydrolyses it back to glutamate and ammonia
Expects: The kidneys excrete ammonia in urine — about 60% from the action of glutaminase and 40% from deamination of amino acids in the kidney
Expects: Muscle converts amino acid nitrogen to alanine (via ALT), transported to the liver by the glucose-alanine cycle, where transdeamination removes the nitrogen for urea synthesis
Concept: CON-FND-880D165894A5EC

### (f) 2 marks
Causes of anaemia due to vitamin C deficiency.
Expects: Haemorrhagic blood loss, giving a normocytic anaemia
Expects: Defective iron absorption, giving a microcytic anaemia — vitamin C keeps dietary iron in the reduced, absorbable ferrous state
Expects: Decreased activity of dihydrofolate reductase, giving a macrocytic anaemia
Concept: CON-FND-C9E5128193029E

## derived_from

## topic
Biochemistry

## subtopic
Glycogen storage disease, diabetes, respiratory chain poisons, ketone body metabolism, ammonia and vitamin C

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-FND-1BE461A57AB76D | CON-END-85750744126501 | CON-FND-A3BC299ED2C7C9 | CON-END-2E748A37DA660A | CON-FND-880D165894A5EC | CON-FND-C9E5128193029E

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycogen Storage Diseases
103 BMS > Biochemistry > Carbohydrate Metabolism > Diabetes Mellitus
103 BMS > Biochemistry > Bioenergetics > Respiratory Chain (Electron Transport Chain)
103 BMS > Biochemistry > Lipid Metabolism > Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)
103 BMS > Biochemistry > Metabolism of Ammonia (Fate & Sources)
103 BMS > Biochemistry > Vitamins > Vitamin C (Ascorbic Acid)

## clinical_relevance
0.7

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
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM | ART-103-BIO-DIABETES-MELLITUS | ART-103-BIO-RESPIRATORY-CHAIN | ART-103-BIO-KETONE-BODY-METABOLISM | ART-103-BIO-AMMONIA-METABOLISM | ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids

## learning_objective
Explain, on their biochemical basis, why Von Gierke's disease causes fasting hypoglycaemia, why CO and cyanide poison the respiratory chain, why ketogenesis and ketolysis sit in different tissues, why ammonia stays low in blood despite continuous production, and the three mechanisms of anaemia in vitamin C deficiency.

## media_recommendations

## source_citation
EOY BIO Final 103 exam - 2023 دور أول with Bio. Answers (2).pdf — Kasr Al Ainy, module 103 BMS, end of year, first round, 2023 (printed), Biochemistry, "Explain on biochemical basis" block, p1, six items. Manifest src_276d2aaab46f564b4b49. Model answers from the same file's reference boxes, pp2–3, read by opening the PDF directly (not in the cached text layer); part (b) has no answer box on this paper. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07 (p75 for part (b)'s one confirmed fact).

## attachments

## attached_image

## author_notes
Verbatim from the paper: "Explain on biochemical basis: Fasting hypoglycemia for von gierk's disease / Obesity is the common cause of insulin resistance / Carbon monoxide and cyanide are toxic for tissue / Ketogensis occur in liver only, while ketolysis occur in extra hepatic tissue / Although ammonia is secreted in continuous state by tissue, but it present in low concentration in blood / Causes of anaemia due to vitamin C deficiency" (paper's spelling "Ketogensis" not reproduced).
Part (b) is marked with an X on the answer key and carries no answer box in the file; the department book's cached text has no hit for "insulin resistance" or "insulin sensitivity", only the unrelated fact that obesity associates with hypercholesterolaemia (p75). Authored with that one confirmed fact and an explicit note that the mechanism is not established from either source — not invented from outside knowledge.
No marks are printed anywhere in this paper's Biochemistry section; every written_parts mark above is a nominal 2-mark placeholder.

## estimated_seconds
420

## randomise_answers
no

---

# Item

## id
QST-103-BIO-EOY2023-02

## title
Enumerate: gluconeogenic substrates, tryptophan derivatives, vitamin B1 deficiency, apolipoprotein functions, hyperammonaemia treatment, importance of beta-oxidation

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
Three substrates of gluconeogenesis.
Expects: Lactate — from anaerobic glycolysis in red cells and muscle, recycled to glucose in the liver via the Cori cycle
Expects: Glucogenic amino acids — give pyruvate, oxaloacetate, α-ketoglutarate, succinate or fumarate, chiefly alanine via the glucose-alanine cycle
Expects: Glycerol — mobilised from adipose tissue by lipolysis, and (odd-chain fatty acids are a rare fourth substrate, via propionyl-CoA to succinyl-CoA)
Concept: CON-FND-089E2C3E01031C

### (b) 2 marks
Three derivatives of tryptophan.
Expects: Serotonin (5-hydroxytryptamine), then melatonin in the pineal body
Expects: Nicotinic acid (niacin), formed only in the presence of vitamin B6
Expects: Indole and skatole, from bacterial putrefaction in the large intestine
Concept: CON-NEU-6C4A6BDA725F0E

### (c) 2 marks
Manifestations of vitamin B1 (thiamine) deficiency.
Expects: Neurological — peripheral neuritis, poor memory, mental confusion, muscular weakness; when these predominate it is called dry beriberi
Expects: Cardiovascular — cardiac enlargement, weakness, oedema (wet beriberi only), heart failure
Expects: Gastrointestinal — anorexia, nausea, vomiting
Concept: CON-FND-C9E5128193029E

### (d) 2 marks
Four functions of apolipoprotein.
Expects: Structural element in the lipoprotein particles
Expects: Activators for enzymes — apo C-II is an activator for lipoprotein lipase
Expects: Interact with cell-surface receptors — apo B-100 in LDL is specific for uptake of LDL by the LDL receptor
Expects: Transfer of lipid between lipoproteins — apo D transfers triacylglycerol in exchange for cholesterol esters
Concept: CON-GIT-99EF5E989B0C65

### (e) 2 marks
Four outlines for treatment of hyperammonaemia.
Expects: The paper's own key marks this item with an X and carries no printed answer; the department book's cached text was not found to give a discrete four-point treatment outline
Concept: CON-FND-880D165894A5EC

### (f) 2 marks
Three importance of β-oxidation.
Expects: Major source of energy during starvation
Expects: Oxidation of palmitic acid (C16) results in formation of acetyl-CoA
Expects: The acetyl-CoA formed feeds synthesis of cholesterol, synthesis of ketone bodies, and acetylation reactions
Concept: CON-FND-84BDACCA71AF45

## derived_from

## topic
Biochemistry

## subtopic
Gluconeogenesis, tryptophan, vitamin B1, apolipoproteins, ammonia and beta-oxidation

## difficulty
Easy

## question_type
Classification

## main_concept
CON-FND-089E2C3E01031C | CON-NEU-6C4A6BDA725F0E | CON-FND-C9E5128193029E | CON-GIT-99EF5E989B0C65 | CON-FND-880D165894A5EC | CON-FND-84BDACCA71AF45

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis
103 BMS > Biochemistry > Individual amino acid Metabolism > Tryptophan
103 BMS > Biochemistry > Vitamins > Vitamin B1 (Thiamine)
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins
103 BMS > Biochemistry > Metabolism of Ammonia (Fate & Sources)
103 BMS > Biochemistry > Lipid Metabolism > Oxidation of Fatty Acids (Beta Oxidation)

## clinical_relevance
0.5

## academic_relevance
0.9

## cognitive_effort_score
0.3

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
Low

## setting
Academic

## reasoning_level
1

## inferred_difficulty
72

## exam_relevance
6

## contextual_concept_ids

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE | ART-103-BIO-TRYPTOPHAN-AND-HISTIDINE | ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS | ART-103-BIO-LIPOPROTEIN-MACHINERY | ART-103-BIO-AMMONIA-METABOLISM | ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Recall, as bare lists, the substrates of gluconeogenesis, the derivatives of tryptophan, the manifestations of vitamin B1 deficiency, the functions of apolipoproteins, and the importance of β-oxidation; recognise where the paper's own key leaves an item unanswered.

## media_recommendations

## source_citation
EOY BIO Final 103 exam - 2023 دور أول with Bio. Answers (2).pdf — Kasr Al Ainy, module 103 BMS, end of year, first round, 2023, Biochemistry, "Enumerate" block, p1 (items a–e) and p5 (item f, "Three importance of beta oxidation"). Manifest src_276d2aaab46f564b4b49. Model answers from the same file's reference boxes, pp2–4, read by opening the PDF directly; item (e) has no answer box in the file. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "Enumerate: Three substrates of gluconeogensis / Three Derivatives of tryptophan / Manifestation of vitamin B1 deficiency / Four functions of apolipoprotein / Four outlines for treatment of hyperammonemia" (p1), then "Three importance of beta oxidation" (p5, the tail of the same list after the reference boxes). Paper's spelling "gluconeogensis" not reproduced.
Part (e) is marked with an X on the answer key and carries no printed answer anywhere in the file, and no four-point treatment outline for hyperammonaemia was found in the department book's cached text; Expects is left as an explicit non-answer rather than invented. A faculty reviewer should supply the book's own outline if one exists elsewhere in the text.
No marks are printed for this block; the 2-mark-per-part placeholder is nominal.

## estimated_seconds
420

## randomise_answers
no

---

# Item

## id
QST-103-BIO-EOY2023-03

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
Expects: Exposure to blue fluorescent light (phototherapy), which converts insoluble unconjugated bilirubin to more soluble photoisomers, excreted into bile without needing conjugation to glucuronic acid
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
EOY BIO Final 103 exam - 2023 دور أول with Bio. Answers (2).pdf — Kasr Al Ainy, module 103 BMS, end of year, first round, 2023, Biochemistry, "CASES", Case (1), p5. Manifest src_276d2aaab46f564b4b49. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Same case topic and question wording as the sibling case on the 103-BMS-BAQOON-2024-biochemistry-written.md file (the department's own reference bank reuses this exact case) — authored independently here since it is this paper's own printed Case (1).
No marks are printed for this case; nominal marks are used.

## estimated_seconds
300

## randomise_answers
no

---

# Item

## id
QST-103-BIO-EOY2023-04

## title
Case: a child with mental retardation, hypopigmentation and elevated phenylalanine (PKU)

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
What is most likely the diagnosis?
Expects: Phenylketonuria (PKU)
Concept: CON-FND-D7BB8C3AFB54CC

### (b) 1 marks
Mention the enzyme deficient in this case.
Expects: Phenylalanine hydroxylase (PAH)
Expects: In 1–2% of cases the deficiency is instead of its coenzyme, tetrahydrobiopterin (BH4)
Concept: CON-FND-D7BB8C3AFB54CC
Depends on: a

### (c) 2 marks
Explain the causes of mental retardation and hypopigmentation in this child.
Expects: Elevated phenylalanine and its metabolites interfere with transport of tyrosine and tryptophan to the brain, so decreased tyrosine impairs neurotransmitter synthesis, which is why an untreated patient shows mental retardation manifest by the age of one year
Expects: Hypopigmentation of hair, skin and iris of the eye follows from deficiency of tyrosine and from high phenylalanine competitively inhibiting the tyrosinase enzyme
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
Recognise phenylketonuria from mental retardation and hypopigmentation with a raised phenylalanine level, name the deficient enzyme, and explain the neurological and pigmentary features as two separate consequences of the same blocked hydroxylation.

## media_recommendations

## source_citation
EOY BIO Final 103 exam - 2023 دور أول with Bio. Answers (2).pdf — Kasr Al Ainy, module 103 BMS, end of year, first round, 2023, Biochemistry, "CASES", Case (7), p5. Manifest src_276d2aaab46f564b4b49. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Same case topic and question wording as the sibling case on the 103-BMS-BAQOON-2024-biochemistry-written.md file (the department's own reference bank reuses this exact case) — authored independently here since it is this paper's own printed Case (7).
No marks are printed for this case; nominal marks are used.

## estimated_seconds
300

## randomise_answers
no

---

# Item

## id
QST-103-BIO-EOY2023-05

## title
Case: a leukaemic patient with joint pain, renal colic and urate crystals in the urine

## subject
renal

## status
Draft

## owner
Claude

## vignette
A thirty-year-old leukaemic female suffers from severe pain in the joints of her feet and from renal colic. Investigation shows a high serum uric acid level with the presence of urate crystals in her urine.

## question
Answer the three parts below about this patient: the cause of her hyperuricaemia, four other causes of hyperuricaemia, and the drug of choice for treating it and how it acts.

## format
multipart_written

## written_parts
### (a) 1 marks
What is the cause of hyperuricaemia in this patient?
Expects: Secondary metabolic gout, from increased purine catabolism as a result of her leukaemia — cancer, leukaemia and psoriasis all increase purine catabolism and so raise uric acid production
Concept: CON-REN-31708150F8B722

### (b) 2 marks
Four other causes of hyperuricaemia.
Expects: Dietary excess of nucleoprotein-rich food, such as meat, liver and kidney
Expects: Primary metabolic gout — genetic disorders such as PRPP synthetase defects, partial HGPRT deficiency or Von Gierke's disease
Expects: Decreased excretion of uric acid — primary (congenital) or secondary (acquired) renal disease
Expects: Alcohol intake, through the lactate-mediated mechanism that competes with uric acid for renal excretion
Concept: CON-REN-D940C9B3140A40

### (c) 2 marks
What is the drug of choice in treating hyperuricaemia? How does it act?
Expects: Allopurinol is the drug of choice
Expects: It structurally resembles hypoxanthine and is oxidised by xanthine oxidase to oxypurinol, which then binds tightly to xanthine oxidase, inhibiting its ability to oxidise hypoxanthine and xanthine to uric acid, decreasing uric acid formation
Expects: Its reaction with PRPP also lowers the PRPP pool, decreasing de-novo purine synthesis
Concept: CON-REN-E5BAEF03791C8F
Depends on: a

## derived_from

## topic
Biochemistry

## subtopic
Disorders of purine metabolism

## difficulty
Challenging

## question_type
Pathophysiology

## main_concept
CON-REN-31708150F8B722 | CON-REN-D940C9B3140A40 | CON-REN-E5BAEF03791C8F

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Disorders of Purine Metabolism

## clinical_relevance
0.9

## academic_relevance
0.9

## cognitive_effort_score
0.6

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
45

## exam_relevance
8

## contextual_concept_ids

## library_ids
ART-103-BIO-GOUT-AND-HYPERURICAEMIA | ART-103-BIO-URIC-ACID-AND-PURINE-DISORDERS

## resource_ids

## learning_objective
Recognise secondary (leukaemia-driven) gout, list the other causes of hyperuricaemia sorted into overproduction and underexcretion, and give allopurinol's two-point mechanism of action.

## media_recommendations

## source_citation
EOY BIO Final 103 exam - 2023 دور أول with Bio. Answers (2).pdf — Kasr Al Ainy, module 103 BMS, end of year, first round, 2023, Biochemistry, "CASES", case study, p5. Manifest src_276d2aaab46f564b4b49. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
A distinct clinical vignette (leukaemia-associated secondary gout) from the already-authored 199 EOY paper's gout case (which is an alcohol/lactate-driven vignette) — not a duplicate.
No marks are printed for this case; nominal marks are used.

## estimated_seconds
360

## randomise_answers
no
