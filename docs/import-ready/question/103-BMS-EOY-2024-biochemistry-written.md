<!--
  103 BMS · Biochemistry · EOY, first sitting, year 2024.

  Source: EOY BIO Final 103 exam - 2024 دور أول with Bio. Answers (2).pdf,
  manifest src_120a632946013b7e5f55 — Kasr Al Ainy module 103 BMS, end of
  year, first round. The paper's own header reads "103 BMS Final 197" — it
  prints the batch code (197) but no calendar year. Per the validated
  sitting-year rule, batchCode + 1827 = 197 + 1827 = 2024, which matches the
  manifest's own calendar-year label (from the source filename) with no
  conflict, so no tie-break was needed here (contrast the sibling 2024 Baqoon
  file, where a printed date did override the batch code).

  Page 1: Anatomy, Physiology, Histology (out of scope). Page 2: Biochemistry
  — Diagrams (topic names only, no printed blanks), Explain, and a 13-option
  extended matching question. Page 3: Biochemistry Cases, printed twice —
  first as a bare list of sub-question stems with no clinical vignette, then
  (in the same reference material) as fuller illustrated cases with full
  vignettes that match the sub-questions 1:1. The fuller vignettes are used
  below as this is clearly the department's own worked illustration of the
  same case list, not a different exam.

  The matching question (Group 13→10, "each option can be used once, or more,
  or not at all") is authored separately in
  docs/Kasr-Source-Imports/question/103-BMS-EOY-2024-biochemistry-mcq.md,
  per the brief's written vs question split.

  "Uncontrolled diabetes cause cataract" (Explain, item 4) is crossed out
  with no answer box on this paper's key — authored from the department book
  the same way as the equivalent item on the sibling 2024 Baqoon file.
  "Explain treatment by lactulose / L-ornithine L-aspartate" (hyperammonaemia
  case, part 3) has no book-page support in the cached department book text
  (searched "lactulose" and "ornithine...aspartate", no hit) — authored with
  an explicit non-answer rather than invented from outside pharmacology
  knowledge.

  No marks are printed anywhere in this paper's Biochemistry section.

  Status: Draft throughout, needs faculty review of marks, of the cataract
  item, and of the lactulose mechanism.

  Validate with:
    npm run medical:batch -- docs/Kasr-Source-Imports/written/103-BMS-EOY-2024-biochemistry-written.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-lipid-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-aminoacid-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-protein-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-biochemistry.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-carbohydrate.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-lipid.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-aminoacid.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-nitrogen.md
-->

# Item

## id
QST-103-BIO-EOY2024-01

## title
Diagrams: ketogenesis pathway, and the pyruvate dehydrogenase complex

## subject
fnd

## status
Draft

## owner
Claude

## vignette
Two pathway diagrams are set: the ketogenesis pathway from fatty-acid β-oxidation to the three ketone bodies, and the pyruvate dehydrogenase complex with its five coenzymes and its regulation.

## question
Reproduce and label each of the two diagrams below, naming its enzymes and coenzymes.

## format
multipart_written

## written_parts
### (a) 3 marks
Draw and label the ketogenesis pathway.
Expects: Acyl-CoA is β-oxidised to acetyl-CoA (with ketogenic amino acids as a second source)
Expects: Ketothiolase condenses two acetyl-CoA to acetoacetyl-CoA
Expects: HMG-CoA synthase adds a third acetyl-CoA to give HMG-CoA (3-hydroxy-3-methylglutaryl-CoA); HMG-CoA lyase then cleaves it to acetoacetate
Expects: Acetoacetate is spontaneously decarboxylated to acetone (expired air and urine) or reduced by 3-hydroxybutyrate dehydrogenase to 3-hydroxybutyrate
Concept: CON-END-2E748A37DA660A

### (b) 3 marks
Draw and label the pyruvate dehydrogenase complex.
Expects: Pyruvate dehydrogenase is an irreversible, multi-enzyme complex requiring five coenzymes: thiamine pyrophosphate (TPP), lipoate, CoA-SH, FAD and NAD+
Expects: It oxidatively decarboxylates pyruvate to acetyl-CoA, releasing CO2 and reducing NAD+ to NADH+H+
Expects: It is activated by insulin and by ADP/Ca2+, and inhibited by its own products, acetyl-CoA and NADH
Concept: CON-FND-229C78C9EB0E78

## derived_from

## topic
Biochemistry

## subtopic
Ketone body metabolism and pyruvate dehydrogenase

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-END-2E748A37DA660A | CON-FND-229C78C9EB0E78

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)
103 BMS > Biochemistry > Carbohydrate Metabolism > Conversion of Pyruvate to Active Acetate

## clinical_relevance
0.5

## academic_relevance
0.95

## cognitive_effort_score
0.5

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
ART-103-BIO-KETONE-BODY-METABOLISM | ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE

## resource_ids

## learning_objective
Reproduce the ketogenesis pathway from acetyl-CoA to the three ketone bodies, and the pyruvate dehydrogenase complex with its five coenzymes and its hormonal and product regulation.

## media_recommendations
### diagram · Question stem
Brief: The department's own ketogenesis pathway diagram (acyl-CoA/ketogenic amino acids to acetyl-CoA, ketothiolase to acetoacetyl-CoA, HMG-CoA synthase to HMG-CoA, HMG-CoA lyase to acetoacetate, then acetone or 3-hydroxybutyrate) and the pyruvate dehydrogenase complex diagram (pyruvate to acetyl-CoA with its five coenzymes and its insulin/ADP/Ca2+ activation)
Purpose: The paper sets these as diagram-labelling items; a text-only prompt cannot show the branch points a diagram makes obvious
Priority: required
Status: needed
Source direction: the department's own reference diagrams, or an openly licensed redraw
Rights: must be CC-BY or public domain if redrawn from another source

## source_citation
EOY BIO Final 103 exam - 2024 دور أول with Bio. Answers (2).pdf ("103 BMS Final 197") — Kasr Al Ainy, module 103 BMS, end of year, first round, batch 197 (year 2024 by the validated sitting-year rule), Biochemistry, "Diagrams" block, p2, two items (Ketogenesis, PDH). Manifest src_120a632946013b7e5f55. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "Bio: *Diagrams: Ketogenesis / PDH". No blanks or sub-question letters are printed for these two diagram topics on this paper (contrast the labelled-blank diagrams on the already-authored 199 EOY paper) — authored as one "reproduce and label" part per diagram instead of inventing blank positions the paper does not show.
No marks are printed for this block; the 3-mark-per-part placeholder is nominal.

## estimated_seconds
360

## randomise_answers
no

---

# Item

## id
QST-103-BIO-EOY2024-02

## title
Explain: iron deficiency and the ETC, alcohol and gout, fluoroacetate poisoning, diabetic cataract

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## question
Explain each of the following.

## format
multipart_written

## written_parts
### (a) 2 marks
Why iron deficiency affects the electron transport chain (ETC).
Expects: Complexes I and II are flavoproteins carrying iron-sulfur (Fe-S) clusters; complexes III and IV are haemoproteins built on iron-containing cytochromes
Expects: Iron deficiency therefore impairs assembly and function of these iron-dependent complexes, slowing electron transport and ATP production
Concept: CON-FND-A3BC299ED2C7C9

### (b) 2 marks
Why does alcohol lead to gouty arthritis?
Expects: Oxidation of alcohol (ethanol) to acetaldehyde generates significant NADH, raising the NADH/NAD+ ratio and shifting the LDH reaction toward lactate formation
Expects: Lactic and uric acid share the same renal tubular transporter; the elevated, more soluble lactate succeeds in binding it in preference to uric acid, so uric acid is retained, causing gout; alcohol also causes dehydration
Concept: CON-REN-0460ED67059E66

### (c) 2 marks
Fluoroacetate causes poisoning.
Expects: Fluoroacetate (a rodenticide) is converted in the body to fluorocitrate
Expects: Fluorocitrate inhibits aconitase, blocking the citric acid cycle
Concept: CON-FND-F9CE11670992CE

### (d) 2 marks
Uncontrolled diabetes causes cataract.
Expects: Aldose reductase converts glucose to sorbitol by the polyol pathway, and the lens (like peripheral nerve) cannot avoid this route
Expects: Sorbitol does not diffuse out of the lens easily and is osmotically active, drawing in water and osmotically damaging the lens fibres, producing cataract
Concept: CON-END-5D8DA0351D0C94

## derived_from

## topic
Biochemistry

## subtopic
The respiratory chain, gout, TCA cycle poisons and diabetic complications

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-FND-A3BC299ED2C7C9 | CON-REN-0460ED67059E66 | CON-FND-F9CE11670992CE | CON-END-5D8DA0351D0C94

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Respiratory Chain (Electron Transport Chain)
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Disorders of Purine Metabolism
103 BMS > Biochemistry > Citric acid cycle
103 BMS > Biochemistry > Carbohydrate Metabolism > Diabetes Mellitus

## clinical_relevance
0.65

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
58

## exam_relevance
7

## contextual_concept_ids

## library_ids
ART-103-BIO-RESPIRATORY-CHAIN | ART-103-BIO-GOUT-AND-HYPERURICAEMIA | ART-103-BIO-CITRIC-ACID-CYCLE | ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
Explain why iron deficiency impairs the respiratory chain, why alcohol precipitates gout through lactate competing for the renal urate transporter, why fluoroacetate poisons the citric acid cycle at aconitase, and why uncontrolled diabetes causes cataract through the polyol pathway.

## media_recommendations

## source_citation
EOY BIO Final 103 exam - 2024 دور أول with Bio. Answers (2).pdf ("103 BMS Final 197") — Kasr Al Ainy, module 103 BMS, end of year, first round, batch 197 (year 2024), Biochemistry, "Explain" block, p2, four items. Manifest src_120a632946013b7e5f55. Model answers for (a)–(c) from the same file's reference boxes, p2, read by opening the PDF directly; (d) has no answer box on this paper. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "*Explain: 1-Why iron deficiency affects ETC / 2-why does alcohol lead to gouty arthritis / 3-fluroacetate cause poisoning / 4-uncontrolled diabetes cause cataract" (paper's spelling "fluroacetate" not reproduced).
Part (d) is crossed with an X on the answer key and has no printed answer; authored from the department book's polyol-pathway content, the same treatment used for the equivalent item on the sibling 2024 Baqoon file (both papers ask the identical question and neither answers it on its own key).
No marks are printed for this block; the 2-mark-per-part placeholder is nominal.

## estimated_seconds
360

## randomise_answers
no

---

# Item

## id
QST-103-BIO-EOY2024-03

## title
Case: a woman with right hypochondrial pain, clay-coloured stool and cancer of the head of the pancreas

## subject
gi

## status
Draft

## owner
Claude

## vignette
A 65-year-old female has pain in the right hypochondrium; her stool is clay coloured, her serum conjugated bilirubin is elevated, and she is diagnosed with cancer of the head of the pancreas.

## question
Answer the three parts below about this patient: the type of jaundice, the elevated serum enzyme, and the cause of the clay-coloured stool.

## format
multipart_written

## written_parts
### (a) 1 marks
What is the type of jaundice?
Expects: Obstructive jaundice (conjugated hyperbilirubinaemia), from tumour obstruction of the biliary passages
Concept: CON-GIT-A265DD7A7CC8EF

### (b) 1 marks
What is the expected elevated serum enzyme?
Expects: Alkaline phosphatase (ALP)
Concept: CON-HEM-C87C15A849F158
Depends on: a

### (c) 1 marks
What is the cause of the clay-coloured stool?
Expects: Absence of stercobilin in the stool, because conjugated bilirubin cannot reach the intestine to be converted to it
Concept: CON-GIT-A265DD7A7CC8EF
Depends on: a

## derived_from

## topic
Biochemistry

## subtopic
Obstructive jaundice

## difficulty
Moderate

## question_type
Diagnosis

## main_concept
CON-GIT-A265DD7A7CC8EF | CON-HEM-C87C15A849F158

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Jaundice (Icterus or Hyperbilirubinemia)

## clinical_relevance
0.9

## academic_relevance
0.85

## cognitive_effort_score
0.35

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
62

## exam_relevance
7

## contextual_concept_ids

## library_ids
ART-103-BIO-JAUNDICE-AND-BILIRUBIN | ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN

## resource_ids

## learning_objective
Recognise obstructive jaundice from right hypochondrial pain and clay-coloured stool, name alkaline phosphatase as the raised enzyme, and explain the clay stool from missing stercobilin.

## media_recommendations

## source_citation
EOY BIO Final 103 exam - 2024 دور أول with Bio. Answers (2).pdf ("103 BMS Final 197") — Kasr Al Ainy, module 103 BMS, end of year, first round, batch 197 (year 2024), Biochemistry, "Cases", obstructive jaundice, p3. Manifest src_120a632946013b7e5f55. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
The paper's own case list on p3 prints only the abstract sub-questions ("Obstructive jaundice: 1-type of jaundice, 2-which enzyme is elevated, 3-why does stool have clay color, 4-what are the abnormalities in the urine"); the same page's reference material illustrates the identical sub-question set with the fuller vignette used above (Case (2), 65-year-old female, pancreatic head cancer) — used here as the department's own worked version of the same case, not a different question. A fourth sub-question, urine abnormalities, is on the abstract list but has no answer in the fuller reference case; left unauthored rather than invented (dark urine from conjugated bilirubin follows the same logic as the sibling neonatal-jaundice case in this folder, but is not stated for this specific case).
No marks are printed for this case; nominal marks are used.

## estimated_seconds
270

## randomise_answers
no

---

# Item

## id
QST-103-BIO-EOY2024-04

## title
Case: a child with lower-limb thrombosis and a dislocated lens (homocystinuria)

## subject
fnd

## status
Draft

## owner
Claude

## vignette
A child was presented to the emergency room with lower limb thrombosis; ophthalmic examination revealed a dislocated lens, and urine examination revealed an increased homocystine level.

## question
Answer the parts below about this child: the diagnosis, the deficient enzyme, the deficient vitamin, the manifestations, and the treatment.

## format
multipart_written

## written_parts
### (a) 1 marks
What is the most likely diagnosis?
Expects: Homocystinaemia and homocystinuria
Concept: CON-FND-E8A570D41E7B8F

### (b) 1 marks
Mention the deficient enzyme in this case.
Expects: Cystathionine synthase
Concept: CON-FND-E8A570D41E7B8F
Depends on: a

### (c) 1 marks
Mention the deficient vitamin in this case.
Expects: Vitamin B6 (pyridoxal phosphate, the coenzyme for cystathionine synthase), folic acid or vitamin B12
Concept: CON-FND-E8A570D41E7B8F
Depends on: a

### (d) 2 marks
Mention the manifestations of this case.
Expects: High levels of homocysteine and methionine in tissues and blood (homocystinaemia), and excreted in urine (homocystinuria)
Expects: A high level of homocysteine causes a modification in LDL and collagen, leading to endothelial injury, atherogenesis, coronary artery disease, thromboembolic disorders and hypertension
Expects: It also causes osteoporosis, mental retardation, and dislocation or complete detachment of the eye lens
Expects: If the disease is due to deficiency of cystathionine synthase, cysteine becomes an essential amino acid, since it can no longer be made from methionine
Concept: CON-FND-E8A570D41E7B8F
Depends on: a

### (e) 1 marks
Mention the treatment.
Expects: A diet rich in cysteine, but with restriction of methionine
Expects: Vitamin B6, B12 and folate supplementation
Concept: CON-FND-E8A570D41E7B8F
Depends on: b

## derived_from

## topic
Biochemistry

## subtopic
Homocystinuria

## difficulty
Challenging

## question_type
Diagnosis

## main_concept
CON-FND-E8A570D41E7B8F

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Sulfur-containing Amino Acids (Methionine and Cysteine)

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
ART-103-BIO-SULFUR-AMINO-ACIDS

## resource_ids

## learning_objective
Diagnose homocystinuria from thrombosis and a dislocated lens, name cystathionine synthase as the deficient enzyme and its three cofactor vitamins, list the vascular, skeletal and ocular manifestations, and give the dietary and vitamin treatment.

## media_recommendations

## source_citation
EOY BIO Final 103 exam - 2024 دور أول with Bio. Answers (2).pdf ("103 BMS Final 197") — Kasr Al Ainy, module 103 BMS, end of year, first round, batch 197 (year 2024), Biochemistry, "Cases", p3, Case 8 in the reference material (paper's own case list names it "Hyper homocysteinuria"). Manifest src_120a632946013b7e5f55. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
The paper's own abstract case list (p3) asks: "1-name the condition, 2-enzyme defect, 3-cause of thrombosis, 4-treatment"; the fuller reference case used above (Case 8) answers a slightly different but overlapping set (diagnosis, enzyme, vitamin, manifestations including thrombosis, treatment) — authored from the fuller version since it is the department's own worked illustration and subsumes the abstract list's four points.
No marks are printed for this case; nominal marks are used.

## estimated_seconds
360

## randomise_answers
no

---

# Item

## id
QST-103-BIO-EOY2024-05

## title
Case: an alcoholic man with cirrhosis, tremors and progressive coma (acquired hyperammonaemia)

## subject
gi

## status
Draft

## owner
Claude

## vignette
A 45-year-old man suffering from advanced alcoholic cirrhosis started to suffer from tremors, vomiting, blurring of vision and somnolence before passing into coma.

## question
Answer the parts below about this patient: the diagnosis, the confirmatory lab tests, the cause of the convulsions, and the treatment by lactulose and L-ornithine L-aspartate.

## format
multipart_written

## written_parts
### (a) 1 marks
What is the possible diagnosis?
Expects: Acquired hyperammonaemia due to liver cirrhosis caused by alcoholism
Concept: CON-FND-880D165894A5EC

### (b) 1 marks
What are the lab tests that help confirm this diagnosis?
Expects: Measurement of ammonia (increased)
Expects: Measurement of urea (decreased)
Expects: Liver function tests, ALT and AST (increased)
Concept: CON-FND-880D165894A5EC
Depends on: a

### (c) 2 marks
Explain the cause of convulsions in this condition.
Expects: Ammonia shifts α-ketoglutarate towards glutamate formation, depleting α-ketoglutarate and decreasing ATP production
Expects: Convulsions follow from the resulting deficiency of GABA, the inhibitory neurotransmitter formed from glutamate by decarboxylation
Concept: CON-FND-880D165894A5EC
Depends on: a

### (d) 2 marks
Explain the treatment of this condition by lactulose and by L-ornithine L-aspartate.
Expects: The department book's cached text has no page discussing lactulose or L-ornithine L-aspartate; this part is authored as an explicit non-answer rather than filled from outside pharmacology knowledge, and needs a faculty-supplied book citation or a field-notes update once one is located
Concept: CON-FND-880D165894A5EC
Depends on: a

## derived_from

## topic
Biochemistry

## subtopic
Acquired hyperammonaemia

## difficulty
Challenging

## question_type
Diagnosis

## main_concept
CON-FND-880D165894A5EC

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolism of Ammonia (Fate & Sources)

## clinical_relevance
0.9

## academic_relevance
0.85

## cognitive_effort_score
0.6

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
High

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
45

## exam_relevance
7

## contextual_concept_ids

## library_ids
ART-103-BIO-AMMONIA-METABOLISM

## resource_ids

## learning_objective
Diagnose acquired hyperammonaemia in an alcoholic cirrhotic patient, name the confirmatory ammonia/urea/liver-enzyme pattern, and explain convulsions through the α-ketoglutarate and GABA mechanism.

## media_recommendations

## source_citation
EOY BIO Final 103 exam - 2024 دور أول with Bio. Answers (2).pdf ("103 BMS Final 197") — Kasr Al Ainy, module 103 BMS, end of year, first round, batch 197 (year 2024), Biochemistry, "Cases", p3, acquired hyperammonaemia (reference material's "Case (2)", distinct from the obstructive-jaundice Case (2) elsewhere on the same page). Manifest src_120a632946013b7e5f55. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
The paper's own abstract case list (p3) asks: "1-type of hyperammonemia, 2-cause of convulsion, 3-explain treatment by lactulose/L-ornithine l-aspartate, 4-mcq: loss of consciousness is due to low ATP" — item 4 is a single-best-answer fact ("low ATP"), not a written part, and is not reproduced as a written_parts entry here since it needs no free-text answer; it is recorded in author_notes only.
No marks are printed for this case; nominal marks are used.

## estimated_seconds
360

## randomise_answers
no
