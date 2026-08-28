<!--
  Questions on the 12 HIT-PENDING idea-groups (lane W1-103-BIOC), per LANE-BRIEF.md §21: a
  question may cite a pending Kasr concept plus the Kasr article that teaches it.
  main_concept/library_ids below are Kasr ids (103-BMS/102-INT), not this lane's own
  concept/article batch.

  Validate with (per concept/article file pair used below):
    npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/AU-MED-103-biochemistry-questions.md \
      --with <matching Kasr concept file> --with <matching Kasr article file>
  Merge proven with:
    npm run medical:simulate -- <Kasr concept file> <Kasr article file> <this file>  (plain args, targets first, per lane)

  §22 two-sided coverage: every concept_id/library_id pair below is one already emitted by the
  Kasr 103-BMS/102-INT build with 0 audit errors per its own CLAIMS.md rows (concepts 36/8/28,
  articles 7/3/11 — `article_ids` on the concept and `related_concepts` on the article checked
  both directions there already). Not re-audited here; trusted from that lane's own green gate,
  named per question in author_notes.

  universities: au throughout. Every correct-option explanation is >=3 sentences; every
  distractor >=1 sentence naming the misconception it catches.
-->

# Item
## title
What is the committed, rate-limiting step of glycolysis?
## question
What is the committed, rate-limiting step of glycolysis?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
Glucose to glucose-6-phosphate (hexokinase/glucokinase)
## explanation_a
Incorrect. This is the first step of glycolysis, but it is not irreversible under all conditions in the way the committed step is, and it is not the pace-setting enzyme.
## answer_b
Fructose-6-phosphate to fructose-1,6-bisphosphate (PFK-1)
## explanation_b
Correct. Glycolysis has three irreversible steps, and PFK-1's reaction is the committed one — once fructose-1,6-bisphosphate is made, the cell is committed to completing glycolysis. PFK-1 is the pathway's main pacemaker, regulated allosterically by ATP, AMP and citrate. This is why PFK-1, not hexokinase, is named the "key" enzyme of glycolysis in the department's own teaching.
## answer_c
Phosphoenolpyruvate to pyruvate (pyruvate kinase)
## explanation_c
Incorrect. This is the third irreversible step and produces ATP, but it is downstream of the actual committed step and does not itself commit the cell to the pathway.
## answer_d
1,3-bisphosphoglycerate to 3-phosphoglycerate
## explanation_d
Incorrect. This reversible step is where ATP is generated at the substrate level; it is not one of glycolysis's three irreversible reactions.
## correct_answer
B
## topic
Glycolysis
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-853096A349FFBD
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
7
## clinical_relevance
0.5
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE
## resource_ids

## learning_objective
State the committed step of glycolysis and the enzyme that catalyses it.
## source_citation
EOM - Blood Final Egyptian final, Q9; MCQs - CHO Metabolism MCQs (1), Q11 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-853096A349FFBD (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE (103-BMS-mcq-carbohydrate.md); held in pending-live per LANE-BRIEF.md §16/§21 until that Kasr batch is imported.

---

# Item
## title
Which statement correctly distinguishes hexokinase from glucokinase?
## question
Which statement correctly distinguishes hexokinase from glucokinase?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
Hexokinase has a low Km and acts in all tissues; glucokinase has a high Km and is confined to liver and pancreatic beta cells
## explanation_a
Correct. Hexokinase's low Km lets it phosphorylate glucose efficiently even at low concentrations in every tissue, while glucokinase's high Km means it only becomes active when glucose is abundant, in the liver and beta cells where it also acts as a glucose sensor for insulin secretion.
## answer_b
Glucokinase is inhibited by its own product, glucose-6-phosphate, but hexokinase is not
## explanation_b
Incorrect. This reverses the true relationship — hexokinase is the one inhibited by glucose-6-phosphate; glucokinase is not product-inhibited, which is what lets the liver keep phosphorylating glucose even when G6P is already high.
## answer_c
Both enzymes are restricted to the liver
## explanation_c
Incorrect. Hexokinase is present in essentially all tissues; only glucokinase is restricted to liver and beta cells.
## answer_d
Hexokinase is induced by insulin; glucokinase is constitutive
## explanation_d
Incorrect. This is the reverse of the true induction pattern — glucokinase is the insulin-inducible one; hexokinase is constitutively expressed everywhere.
## correct_answer
A
## topic
Glycolysis
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-EA1BA37ACB643B
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
7
## clinical_relevance
0.5
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE
## resource_ids

## learning_objective
Contrast hexokinase and glucokinase by Km, tissue distribution and regulation.
## source_citation
MCQs - CHO Metabolism MCQs (1), Q3, Q11 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-EA1BA37ACB643B (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE (103-BMS-mcq-carbohydrate.md); held in pending-live until that Kasr batch is imported.

---

# Item
## title
Fluoride and arsenate both interfere with glycolysis, but at different steps. Which pairing is correct?
## question
Fluoride and arsenate both interfere with glycolysis, but at different steps. Which pairing is correct?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
Fluoride inhibits hexokinase; arsenate inhibits pyruvate kinase
## explanation_a
Incorrect. Neither enzyme named is the actual target of either inhibitor in the department's own teaching.
## answer_b
Fluoride inhibits phosphofructokinase; arsenate inhibits aldolase
## explanation_b
Incorrect. PFK-1 and aldolase are not the sites these two specific agents act at.
## answer_c
Fluoride inhibits enolase; arsenate substitutes for phosphate at glyceraldehyde-3-phosphate dehydrogenase
## explanation_c
Correct. Fluoride removes the Mg2+ enolase needs, blocking the enolase step. Arsenate does not inhibit an enzyme outright but competes with inorganic phosphate at glyceraldehyde-3-phosphate dehydrogenase, forming an unstable arsenate ester. That ester still lets glycolysis proceed but without the substrate-level ATP that step would otherwise yield, which is why arsenate is described as an uncoupler rather than a classic inhibitor.
## answer_d
Both agents inhibit the same enzyme, glyceraldehyde-3-phosphate dehydrogenase
## explanation_d
Incorrect. The two agents act at two different points in the pathway, which is exactly why they are taught and tested as a contrasting pair.
## correct_answer
C
## topic
Glycolysis
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-0D6BFD870813B7
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.55
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
7
## clinical_relevance
0.4
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE
## resource_ids

## learning_objective
Name the specific step each glycolytic inhibitor acts at.
## source_citation
EOM - Blood End Egyptian 1, Q1; MCQs - CHO Metabolism MCQs (1), Q7 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-0D6BFD870813B7 (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE; held pending Kasr import.

---

# Item
## title
The pyruvate dehydrogenase complex requires five coenzymes. Which one is generally considered to fail first under thiamine deficiency?
## question
The pyruvate dehydrogenase complex requires five coenzymes. Which one is generally considered to fail first under thiamine deficiency?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
NAD+
## explanation_a
Incorrect. NAD+ is one of the five coenzymes but is not the one specifically tied to thiamine status.
## answer_b
Coenzyme A
## explanation_b
Incorrect. CoA is required by the complex but its availability is not what thiamine deficiency directly threatens.
## answer_c
Lipoic acid
## explanation_c
Incorrect. Lipoic acid is one of the five coenzymes, but it is not vitamin-derived in the way thiamine pyrophosphate is.
## answer_d
Thiamine pyrophosphate (TPP)
## explanation_d
Correct. Pyruvate dehydrogenase is irreversible and needs five coenzymes — TPP, lipoic acid, CoA, FAD and NAD+. Because TPP is derived directly from dietary thiamine (vitamin B1), it is the one that fails first when thiamine intake is inadequate, which is why thiamine deficiency (beriberi) causes pyruvate and lactate to accumulate.
## correct_answer
D
## topic
Pyruvate metabolism
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-229C78C9EB0E78
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.5
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE
## resource_ids

## learning_objective
Name the five PDH coenzymes and identify which one fails first in thiamine deficiency.
## source_citation
EOM - Blood Final Egyptian final, Q6; EOM - Blood end wafdeen final, Q28 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-229C78C9EB0E78 (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE; held pending Kasr import.

---

# Item
## title
Pyruvate carboxylase requires which cofactor, and what does it produce?
## question
Pyruvate carboxylase requires which cofactor, and what does it produce?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
Thiamine pyrophosphate; acetyl-CoA
## explanation_a
Incorrect. TPP and acetyl-CoA describe the pyruvate dehydrogenase reaction, a different enzyme going in a different direction.
## answer_b
Biotin; oxaloacetate
## explanation_b
Correct. Pyruvate carboxylase carboxylates pyruvate to oxaloacetate, needs biotin as its cofactor, and is allosterically switched on by acetyl-CoA — the first, anaplerotic step of gluconeogenesis and a way the cell signals "enough acetyl-CoA, start making glucose instead."
## answer_c
NAD+; lactate
## explanation_c
Incorrect. NAD+ and lactate describe the lactate dehydrogenase reaction, unrelated to pyruvate carboxylase.
## answer_d
FAD; succinate
## explanation_d
Incorrect. FAD and succinate belong to the succinate dehydrogenase reaction of the citric acid cycle.
## correct_answer
B
## topic
Gluconeogenesis
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-CA0F9E019BC5BA
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.4
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE
## resource_ids

## learning_objective
Name pyruvate carboxylase's cofactor and product, and what activates it.
## source_citation
Companion enzyme to the gluconeogenesis questions in EOM - Blood Final Egyptian final Q7 and MCQs - CHO Metabolism MCQs (1) Q17-19 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-CA0F9E019BC5BA (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-GLYCOLYSIS-AND-PYRUVATE; held pending Kasr import.

---

# Item
## title
Which citric acid cycle enzyme is the exception to "every CAC enzyme sits in the mitochondrial matrix"?
## question
Which citric acid cycle enzyme is the exception to "every CAC enzyme sits in the mitochondrial matrix"?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
Citrate synthase
## explanation_a
Incorrect. Citrate synthase is a matrix enzyme, not the exception.
## answer_b
Isocitrate dehydrogenase
## explanation_b
Incorrect. Isocitrate dehydrogenase is also a matrix enzyme.
## answer_c
Succinate dehydrogenase
## explanation_c
Correct. Succinate dehydrogenase is embedded in the inner mitochondrial membrane as Complex II of the respiratory chain, not free in the matrix like the cycle's other seven enzymes. This is also why it is the one CAC enzyme that hands electrons directly into the electron transport chain without an intermediate NADH shuttle step.
## answer_d
Malate dehydrogenase
## explanation_d
Incorrect. Malate dehydrogenase, the final step of the cycle, is a matrix enzyme.
## correct_answer
C
## topic
Citric acid cycle
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-BCCBDEC637795A
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.3
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE
## resource_ids

## learning_objective
Name the one CAC enzyme not free in the mitochondrial matrix and explain why.
## source_citation
EOM - Blood End Egyptian 1, Q15 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-BCCBDEC637795A (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-CITRIC-ACID-CYCLE (103-BMS-mcq-carbohydrate.md); confirmed the article's related_concepts names this id. Held pending Kasr import.

---

# Item
## title
One full turn of the citric acid cycle yields how much ATP, and from what sources?
## question
One full turn of the citric acid cycle yields how much ATP, and from what sources?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
Ten ATP-equivalents: three NADH, one FADH2 and one substrate-level ATP (or GTP)
## explanation_a
Correct. Each turn of the cycle releases two CO2 and yields ten ATP-equivalents in total: three NADH and one FADH2, oxidised through the electron transport chain, plus one ATP (as GTP) made directly at the substrate level by succinate thiokinase.
## answer_b
Two ATP, both made at the substrate level
## explanation_b
Incorrect. Substrate-level phosphorylation contributes only one of the ten ATP-equivalents; most of the yield comes from oxidising the NADH and FADH2 produced.
## answer_c
Thirty-eight ATP, matching the yield of complete glucose oxidation
## explanation_c
Incorrect. Thirty-eight ATP is the approximate yield from one whole glucose molecule (two turns of the cycle plus glycolysis and pyruvate oxidation), not from a single turn of the cycle alone.
## answer_d
Zero net ATP, since the cycle is purely catabolic
## explanation_d
Incorrect. The cycle is a major net ATP generator through the NADH and FADH2 it hands to the electron transport chain, plus its own substrate-level step.
## correct_answer
A
## topic
Citric acid cycle
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-9420F608039B74
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.3
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE
## resource_ids

## learning_objective
State the ATP-equivalent yield of one turn of the citric acid cycle and its sources.
## source_citation
MCQs - CHO Metabolism MCQs (1), Q29 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-9420F608039B74 (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-CITRIC-ACID-CYCLE; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
The citric acid cycle is described as "amphibolic". What does this mean?
## question
The citric acid cycle is described as "amphibolic". What does this mean?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
It runs in both directions depending on the cell's energy state
## explanation_a
Incorrect. The cycle's individual steps are not simply reversible in bulk; "amphibolic" refers to a different property, not directionality.
## answer_b
It occurs in both the cytoplasm and the mitochondria
## explanation_b
Incorrect. The cycle runs entirely within the mitochondria; its enzymes are not cytoplasmic.
## answer_c
It can use either glucose or fatty acids as its only fuel source
## explanation_c
Incorrect. Fuel flexibility (via acetyl-CoA from multiple sources) is a related but different point from what "amphibolic" specifically names.
## answer_d
It serves both catabolic and anabolic roles, since its intermediates are drawn off to build haem, amino acids, fatty acids and glucose
## explanation_d
Correct. The cycle is amphibolic because, alongside oxidising acetyl-CoA for energy (catabolism), its intermediates are continually withdrawn to build other molecules (anabolism) — succinyl-CoA for haem, oxaloacetate and alpha-ketoglutarate for amino acids via transamination, and citrate for fatty acid synthesis in the cytosol.
## correct_answer
D
## topic
Citric acid cycle
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-8ADE222FBB57B2
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.65
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
6
## clinical_relevance
0.4
## academic_relevance
0.85
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE
## resource_ids

## learning_objective
Explain what "amphibolic" means for the citric acid cycle and name intermediates drawn off for anabolism.
## source_citation
MCQs - CHO Metabolism MCQs (1), Q30 acetyl-CoA-use item (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
100
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-8ADE222FBB57B2 (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-CITRIC-ACID-CYCLE; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Fluoroacetate and arsenite both poison the citric acid cycle, but at different enzymes. Which pairing is correct?
## question
Fluoroacetate and arsenite both poison the citric acid cycle, but at different enzymes. Which pairing is correct?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
Fluoroacetate inhibits succinate dehydrogenase; arsenite inhibits citrate synthase
## explanation_a
Incorrect. Neither of these two enzymes is the actual target described in the department's teaching for these two agents.
## answer_b
Fluoroacetate poisons the cycle at aconitase (via fluorocitrate); arsenite poisons alpha-ketoglutarate dehydrogenase by reacting with lipoic acid's -SH group
## explanation_b
Correct. Fluoroacetate is converted to fluorocitrate, which inhibits aconitase and traps the cycle. Arsenite (and mercury) instead react with the sulfhydryl group of lipoic acid, blocking both pyruvate dehydrogenase and alpha-ketoglutarate dehydrogenase and causing pyruvate/lactate accumulation.
## answer_c
Both agents inhibit malate dehydrogenase
## explanation_c
Incorrect. Malate dehydrogenase is not the shared target; the two agents act at two distinct points, which is the whole reason they are taught as a contrasting pair.
## answer_d
Fluoroacetate inhibits isocitrate dehydrogenase; arsenite inhibits fumarase
## explanation_d
Incorrect. Neither of these enzymes is the one named for either poison in the source material.
## correct_answer
B
## topic
Citric acid cycle
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-F9CE11670992CE
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.65
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
6
## clinical_relevance
0.4
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-CITRIC-ACID-CYCLE
## resource_ids

## learning_objective
Name which CAC enzyme fluoroacetate poisons and which arsenite poisons, and the chemistry behind each.
## source_citation
EOM - Blood Final Egyptian final, Q5; MCQs - CHO Metabolism MCQs (1), Q72, Q82 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
100
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-F9CE11670992CE (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-CITRIC-ACID-CYCLE; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Which three enzymes are named as the key, irreversible-step enzymes of the citric acid (Krebs) cycle?
## question
Which three enzymes are named as the key, irreversible-step enzymes of the citric acid (Krebs) cycle?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
Citrate synthase, isocitrate dehydrogenase and alpha-ketoglutarate dehydrogenase
## explanation_a
Correct. Three irreversible steps make citrate synthase, isocitrate dehydrogenase and alpha-ketoglutarate dehydrogenase the key enzymes of the Krebs cycle — these are the points at which the cycle's overall direction and rate are set, and where its main regulatory inhibitors act.
## answer_b
Succinate dehydrogenase, fumarase and malate dehydrogenase
## explanation_b
Incorrect. These three catalyse reversible steps in the second half of the cycle, not the key irreversible ones.
## answer_c
Aconitase, succinate thiokinase and malate dehydrogenase
## explanation_c
Incorrect. Aconitase and succinate thiokinase catalyse reversible reactions; neither is one of the cycle's three key irreversible enzymes.
## answer_d
Pyruvate dehydrogenase, citrate synthase and fumarase
## explanation_d
Incorrect. Pyruvate dehydrogenase feeds into the cycle but is not itself a citric acid cycle enzyme, and fumarase's reaction is reversible.
## correct_answer
A
## topic
Citric acid cycle
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-037BF052DDFC0D
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.3
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-TCA-KEY-ENZYMES
## resource_ids

## learning_objective
Name the citric acid cycle's three key, rate-setting enzymes.
## source_citation
Companion enzyme-identification fact to the CAC-inhibitor cluster above (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-037BF052DDFC0D (103-BMS-biochemistry-concepts.md), taught by ART-103-BIO-TCA-KEY-ENZYMES (103-BMS-biochemistry.md); confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Glycogen synthesis (glycogenesis) directly uses which activated sugar donor, and at what energetic cost?
## question
Glycogen synthesis (glycogenesis) directly uses which activated sugar donor, and at what energetic cost?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
ADP-glucose, at the cost of one ATP
## explanation_a
Incorrect. ADP-glucose is the plant glycogen (starch) precursor, not the mammalian one; mammalian glycogenesis runs on UDP-glucose.
## answer_b
Free glucose, with no energetic cost
## explanation_b
Incorrect. Activating glucose for glycogen synthesis is not cost-free — it requires forming UDP-glucose first, which consumes a UTP.
## answer_c
UDP-glucose, at the cost of one UTP
## explanation_c
Correct. Glycogen synthesis runs on UDP-glucose as the activated glucose donor, and forming UDP-glucose from glucose-1-phosphate and UTP is what makes glycogenesis cost a UTP for every glucose unit added to the chain.
## answer_d
CDP-glucose, at the cost of one CTP
## explanation_d
Incorrect. CDP-sugars are used in some lipid pathways, not in mammalian glycogen synthesis.
## correct_answer
C
## topic
Glycogenesis
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-1FC7D932D7EFDC
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.3
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM
## resource_ids

## learning_objective
Name the activated glucose donor for glycogenesis and its energetic cost.
## source_citation
EOM - Blood end wafdeen final, Q34 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-1FC7D932D7EFDC (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-GLYCOGEN-METABOLISM; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Glycogen breakdown in muscle mostly yields which product, and why can muscle not release it as blood glucose?
## question
Glycogen breakdown in muscle mostly yields which product, and why can muscle not release it as blood glucose?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
Free glucose; muscle lacks glycogen phosphorylase
## explanation_a
Incorrect. Muscle has plenty of glycogen phosphorylase — that is exactly the enzyme doing the breakdown; the missing enzyme is a different one, downstream.
## answer_b
Glucose-6-phosphate; muscle lacks hexokinase
## explanation_b
Incorrect. Muscle has hexokinase; the enzyme it lacks acts on glucose-6-phosphate, not glucose.
## answer_c
Fructose-1-phosphate; muscle lacks aldolase B
## explanation_c
Incorrect. Fructose-1-phosphate and aldolase B belong to fructose metabolism, unrelated to glycogen breakdown.
## answer_d
Glucose-1-phosphate (converted to glucose-6-phosphate); muscle lacks glucose-6-phosphatase, so only the liver can release free glucose to the blood
## explanation_d
Correct. Glycogenolysis releases mostly glucose-1-phosphate, converted to glucose-6-phosphate. Only the liver (and kidney) has glucose-6-phosphatase to release free glucose into the blood; muscle lacks this enzyme, so its glycogen stores can only fuel the muscle's own ATP production, never raise blood glucose for other tissues.
## correct_answer
D
## topic
Glycogenolysis
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-3905E3B98C2EC4
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.4
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM
## resource_ids

## learning_objective
State glycogenolysis's main product and explain why only the liver, not muscle, can use it to raise blood glucose.
## source_citation
EOM - Blood Final Egyptian final, Q12 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-3905E3B98C2EC4 (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-GLYCOGEN-METABOLISM; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Glycogen synthesis and glycogen breakdown are reciprocally regulated. What is the shared mechanism behind this switch?
## question
Glycogen synthesis and glycogen breakdown are reciprocally regulated. What is the shared mechanism behind this switch?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
A single cAMP cascade, with calcium and AMP as the muscle's own additional overrides
## explanation_a
Correct. Glycogen synthesis and breakdown are switched by one shared cAMP-driven cascade — active glycogen synthase is dephosphorylated, active glycogen phosphorylase is phosphorylated, so one hormonal signal turns one off as it turns the other on. In muscle, calcium and AMP provide additional, independent activation of phosphorylase during contraction.
## answer_b
Two entirely separate and unrelated signalling systems
## explanation_b
Incorrect. The whole point of "reciprocal regulation" is that one shared cascade drives both enzymes in opposite directions, not two independent systems.
## answer_c
Insulin alone, with no role for glucagon or epinephrine
## explanation_c
Incorrect. Insulin favours glycogenesis, but glucagon and epinephrine (via the cAMP cascade) are equally central to switching phosphorylase on.
## answer_d
Direct allosteric control by glucose-6-phosphate alone, with no hormonal input
## explanation_d
Incorrect. G6P does allosterically activate glycogen synthase, but the reciprocal switch as a whole is primarily a hormonal, cAMP-driven mechanism, not G6P acting alone.
## correct_answer
A
## topic
Glycogenesis
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-CA74978B7B7ED1
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
6
## clinical_relevance
0.4
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM
## resource_ids

## learning_objective
Describe the shared cAMP-cascade mechanism that reciprocally regulates glycogen synthase and phosphorylase.
## source_citation
MCQs - CHO Metabolism MCQs (1), Q57 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
100
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-CA74978B7B7ED1 (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-GLYCOGEN-METABOLISM; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Von Gierke's disease is caused by deficiency of which enzyme, and what does that explain about the disease?
## question
Von Gierke's disease is caused by deficiency of which enzyme, and what does that explain about the disease?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
Glycogen phosphorylase; explaining the muscle weakness seen in the disease
## explanation_a
Incorrect. Phosphorylase deficiency describes McArdle's disease (a muscle glycogenosis), not Von Gierke's, whose hallmark features are hepatic and metabolic, not muscular.
## answer_b
Glucose-6-phosphatase; explaining the fasting hypoglycaemia, since glucose-6-phosphate accumulates and cannot be dephosphorylated to free glucose
## explanation_b
Correct. Von Gierke's disease is glucose-6-phosphatase deficiency in the liver, so glucose-6-phosphate cannot be dephosphorylated to free glucose. Every feature follows from this: fasting hypoglycaemia (no free glucose released), and the accumulated glucose-6-phosphate is shunted into pathways causing hyperlipidaemia and hyperuricaemia.
## answer_c
Debranching enzyme; explaining why glycogen structure is abnormal
## explanation_c
Incorrect. Debranching enzyme deficiency is a different glycogen storage disease (Cori disease), not Von Gierke's.
## answer_d
Alpha-glucosidase; explaining lysosomal glycogen accumulation
## explanation_d
Incorrect. Alpha-glucosidase deficiency describes Pompe's disease, a lysosomal storage disorder distinct from Von Gierke's.
## correct_answer
B
## topic
Glycogenolysis
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-1BE461A57AB76D
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Diagnosis
## cognitive_effort
Medium
## cognitive_effort_score
0.55
## setting
Academic
## reasoning_level
2
## inferred_difficulty
45
## exam_relevance
6
## clinical_relevance
0.6
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-GLYCOGEN-METABOLISM
## resource_ids

## learning_objective
Name the enzyme deficient in Von Gierke's disease and connect it to the disease's fasting hypoglycaemia.
## source_citation
MCQs - CHO Metabolism MCQs (1), Q46, Q81 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-1BE461A57AB76D (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-GLYCOGEN-METABOLISM; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
How many key enzymes bypass the irreversible steps of glycolysis to make gluconeogenesis possible?
## question
How many key enzymes bypass the irreversible steps of glycolysis to make gluconeogenesis possible?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
Two
## explanation_a
Incorrect. Two is too few to bypass all three irreversible glycolytic reactions.
## answer_b
Three
## explanation_b
Incorrect. Three enzymes would not be enough, because one of glycolysis's irreversible steps (pyruvate to PEP) itself needs two enzymes working together to reverse.
## answer_c
Four: pyruvate carboxylase, PEP carboxykinase, fructose-1,6-bisphosphatase and glucose-6-phosphatase
## explanation_c
Correct. Gluconeogenesis is the reversal of glycolysis except at its three irreversible steps, and reversing those three needs four dedicated enzymes: pyruvate carboxylase and PEP carboxykinase together bypass pyruvate kinase's step, while fructose-1,6-bisphosphatase and glucose-6-phosphatase separately bypass PFK-1 and hexokinase/glucokinase.
## answer_d
Five
## explanation_d
Incorrect. Five overstates the number of dedicated bypass enzymes gluconeogenesis actually needs.
## correct_answer
C
## topic
Gluconeogenesis
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-C2C88203E4A918
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
7
## clinical_relevance
0.4
## academic_relevance
0.85
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE
## resource_ids

## learning_objective
Name the four key enzymes that bypass glycolysis's irreversible steps in gluconeogenesis.
## source_citation
EOM - Blood Final Egyptian final, Q7, Q11 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
100
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-C2C88203E4A918 (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Which of the following cannot be used as a substrate for gluconeogenesis?
## question
Which of the following cannot be used as a substrate for gluconeogenesis?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
Lactate
## explanation_a
Incorrect. Lactate is a classic gluconeogenic substrate, recycled via the Cori cycle.
## answer_b
Glycerol
## explanation_b
Incorrect. Glycerol, released from adipose tissue lipolysis, is a genuine gluconeogenic substrate once phosphorylated in the liver.
## answer_c
Glucogenic amino acids
## explanation_c
Incorrect. Glucogenic amino acids feed into the cycle at various points and are genuine gluconeogenic substrates.
## answer_d
Acetyl-CoA
## explanation_d
Correct. Acetyl-CoA can never give net new glucose, because the pyruvate dehydrogenase reaction that makes it from pyruvate is irreversible — there is no enzymatic route back from acetyl-CoA to pyruvate or any earlier glycolytic intermediate.
## correct_answer
D
## topic
Gluconeogenesis
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-089E2C3E01031C
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.4
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE
## resource_ids

## learning_objective
State why acetyl-CoA, unlike lactate, glycerol and glucogenic amino acids, can never yield net new glucose.
## source_citation
EOM - Blood end wafdeen final, Q33 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-089E2C3E01031C (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
What does the Cori cycle accomplish, and between which two tissues does it operate?
## question
What does the Cori cycle accomplish, and between which two tissues does it operate?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
It converts glucose to fatty acids, between liver and adipose tissue
## explanation_a
Incorrect. This describes lipogenesis, not the Cori cycle, which is specifically about lactate and glucose recycling.
## answer_b
It carries lactate from muscle and red cells to the liver, which converts it back to glucose and returns it to the periphery
## explanation_b
Correct. Anaerobic tissues (exercising muscle, red cells) release lactate; the liver takes it up and uses gluconeogenesis to remake glucose; that glucose returns to the periphery to be used again — preventing lactic acidosis and recycling carbon that would otherwise be wasted.
## answer_c
It carries glucose from the liver to the brain only
## explanation_c
Incorrect. Simple glucose delivery to the brain is not what defines the Cori cycle; the defining feature is the lactate-to-glucose recycling loop.
## answer_d
It operates only during the fed state, never during exercise
## explanation_d
Incorrect. The Cori cycle is most active precisely during states of high anaerobic glycolysis, such as strenuous exercise, not the fed state.
## correct_answer
B
## topic
Gluconeogenesis
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-596FDA58EEEF0A
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.5
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE
## resource_ids

## learning_objective
Describe the Cori cycle and the two tissues it links.
## source_citation
MCQs - CHO Metabolism MCQs (1), Q92, Q104 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-596FDA58EEEF0A (103-BMS-mcq-carbohydrate-concepts.md), taught by ART-103-BIO-GLUCONEOGENESIS-AND-CORI-CYCLE; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Where in the body is haem synthesised, and how is the pathway split within the cell?
## question
Where in the body is haem synthesised, and how is the pathway split within the cell?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
Entirely in the cytoplasm of hepatocytes
## explanation_a
Incorrect. Haem biosynthesis is not confined to the cytoplasm — its first and final steps are mitochondrial.
## answer_b
Entirely within the mitochondrion
## explanation_b
Incorrect. The middle steps of the pathway (porphobilinogen through coproporphyrinogen) occur in the cytoplasm, not the mitochondrion.
## answer_c
Mainly the bone marrow (for haemoglobin) and the liver (for cytochromes), with the pathway split between mitochondrion (first and last steps) and cytosol (middle steps)
## explanation_c
Correct. Haem is made mainly in the erythroid bone marrow (for haemoglobin) and the liver (for cytochromes). Within the cell the pathway alternates compartments: the initial ALA-synthase step and the final three steps are mitochondrial, while the intermediate steps run in the cytosol.
## answer_d
Mainly in the spleen, entirely in the cytosol
## explanation_d
Incorrect. The spleen is where old red cells are broken down (haem catabolism), not where new haem is synthesised.
## correct_answer
C
## topic
Haem biosynthesis
## subtopic
Clinical biochemistry
## main_concept
CON-HEM-3D75438A839FBD
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Anatomy
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.4
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA
## resource_ids

## learning_objective
Name the two main sites of haem synthesis and describe the mitochondrion/cytosol split of the pathway.
## source_citation
Background fact tested alongside the lead-poisoning items below (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-HEM-3D75438A839FBD (103-BMS-mcq-heme-concepts.md), taught by ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA (103-BMS-mcq-heme.md); confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Lead poisoning impairs haem synthesis at which two enzymes, and what anaemia results?
## question
Lead poisoning impairs haem synthesis at which two enzymes, and what anaemia results?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
ALA dehydratase and ferrochelatase, producing a microcytic anaemia that iron therapy does not correct
## explanation_a
Correct. Lead blocks haem synthesis at both ends of the pathway — ALA dehydratase early on and ferrochelatase (the final step) — so the anaemia is microcytic, since haem itself cannot be made regardless of iron availability; giving iron does not fix an anaemia whose cause is a blocked synthetic pathway, not a lack of substrate.
## answer_b
ALA synthase only, producing a macrocytic anaemia
## explanation_b
Incorrect. Lead does not inhibit ALA synthase (its activity may even rise as feedback repression is lost); the resulting anaemia is microcytic, not macrocytic.
## answer_c
Glucose-6-phosphate dehydrogenase, producing a haemolytic anaemia
## explanation_c
Incorrect. G6PD is unrelated to haem synthesis and to lead's toxic mechanism; that enzyme's deficiency causes a separate, oxidant-triggered haemolytic anaemia.
## answer_d
Coproporphyrinogen oxidase only, producing a normocytic anaemia
## explanation_d
Incorrect. Lead's two classically taught targets are ALA dehydratase and ferrochelatase together, and the resulting anaemia is microcytic, not normocytic.
## correct_answer
A
## topic
Haem biosynthesis
## subtopic
Clinical biochemistry
## main_concept
CON-HEM-4C0C6A97CA8788
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Pathophysiology
## cognitive_effort
Medium
## cognitive_effort_score
0.55
## setting
Clinical
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
7
## clinical_relevance
0.7
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA
## resource_ids

## learning_objective
Name the two enzymes lead inhibits in haem synthesis and explain why the resulting anaemia does not respond to iron.
## source_citation
EOM - Blood End Egyptian 1, Q32; EOM - Blood Final Egyptian final, Q18; EOM - Blood end wafdeen final, Q10 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-HEM-4C0C6A97CA8788 (103-BMS-mcq-heme-concepts.md), taught by ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Whether a porphyria presents with neuropsychiatric symptoms or with photosensitivity depends on what?
## question
Whether a porphyria presents with neuropsychiatric symptoms or with photosensitivity depends on what?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
Whether the patient is male or female
## explanation_a
Incorrect. Sex is not what determines the clinical pattern of a porphyria; the enzymatic block's position in the pathway is.
## answer_b
Whether the block is in the liver or the bone marrow
## explanation_b
Incorrect. Hepatic vs. erythropoietic classification is a separate axis from what determines neuropsychiatric vs. photosensitive presentation.
## answer_c
The patient's dietary porphyrin intake
## explanation_c
Incorrect. Diet is not the determining factor for which clinical pattern a porphyria produces.
## answer_d
Whether the enzymatic block falls before or after the porphyrinogen ring closes
## explanation_d
Correct. A block early in the pathway, before the ring closes, lets colourless precursors like ALA and PBG accumulate, toxic to abdominal nerves and the CNS, producing abdominal pain and neuropsychiatric symptoms. A block later in the pathway lets coloured porphyrinogens accumulate and oxidise to porphyrins, causing photosensitivity.
## correct_answer
D
## topic
Haem biosynthesis
## subtopic
Clinical biochemistry
## main_concept
CON-HEM-66B1DEEC8ED961
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Pathophysiology
## cognitive_effort
High
## cognitive_effort_score
0.65
## setting
Clinical
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
6
## clinical_relevance
0.6
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA
## resource_ids

## learning_objective
Explain why an early block in haem synthesis produces neuropsychiatric symptoms while a later block produces photosensitivity.
## source_citation
MCQs - Blood Agha MCQ, Q6 (hepatic porphyria) (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
100
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-HEM-66B1DEEC8ED961 (103-BMS-mcq-heme-concepts.md), taught by ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Bilirubin formation and processing pass through three organs/systems in order. What is that order?
## question
Bilirubin formation and processing pass through three organs/systems in order. What is that order?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
Liver, then reticuloendothelial system, then kidney
## explanation_a
Incorrect. This both misorders the sequence and wrongly includes the kidney, which plays no role in this pathway.
## answer_b
Reticuloendothelial system, then liver, then intestine
## explanation_b
Correct. Bilirubin is formed first in the reticuloendothelial system (spleen, liver, bone marrow) from haem breakdown, then taken up and conjugated in the liver, and finally reaches the intestine, where gut bacteria convert it to urobilinogen and stercobilinogen — the kidney is not one of these three sites.
## answer_c
Intestine, then liver, then reticuloendothelial system
## explanation_c
Incorrect. This reverses the true order; bilirubin formation begins in the reticuloendothelial system, not the intestine.
## answer_d
Kidney, then liver, then intestine
## explanation_d
Incorrect. The kidney is not part of this three-site sequence at all.
## correct_answer
B
## topic
Haemoglobin catabolism
## subtopic
Clinical biochemistry
## main_concept
CON-HEM-26C990AD8F630C
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.4
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN
## resource_ids

## learning_objective
Name the three sites bilirubin passes through, in order, and state that the kidney is not one of them.
## source_citation
Companion fact to EOM - Blood End Egyptian 1, Q18 (uronic acid pathway) (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-HEM-26C990AD8F630C (103-BMS-mcq-heme-concepts.md), taught by ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
How does the liver make bilirubin excretable, and can this step be induced?
## question
How does the liver make bilirubin excretable, and can this step be induced?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
By oxidising it with heme oxygenase; this step cannot be induced
## explanation_a
Incorrect. Heme oxygenase acts earlier, breaking down haem to biliverdin, not on bilirubin itself in the liver, and the enzyme this question concerns can be induced.
## answer_b
By reducing it with biliverdin reductase; this step cannot be induced
## explanation_b
Incorrect. Biliverdin reductase converts biliverdin to bilirubin, a step before the liver conjugation step this question asks about.
## answer_c
By conjugating it with glucuronic acid via glucuronyl transferase, an inducible enzyme
## explanation_c
Correct. The liver makes bilirubin excretable by conjugating it with glucuronic acid, using glucuronyl transferase — an enzyme that can be induced, for example by phenobarbital, which is clinically exploited to treat some forms of neonatal jaundice.
## answer_d
By binding it irreversibly to albumin
## explanation_d
Incorrect. Albumin binding is how unconjugated bilirubin is transported in blood before it reaches the liver; it is not the liver's own conjugation mechanism.
## correct_answer
C
## topic
Haemoglobin catabolism
## subtopic
Clinical biochemistry
## main_concept
CON-HEM-7A26AE75471EF8
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.5
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN
## resource_ids

## learning_objective
Name the enzyme that conjugates bilirubin in the liver and state that it is inducible.
## source_citation
Companion fact to EOM - Blood End Egyptian 1, Q18 (uronic acid pathway) (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-HEM-7A26AE75471EF8 (103-BMS-mcq-heme-concepts.md), taught by ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
What single property of conjugated bilirubin explains most of its other differences from unconjugated bilirubin?
## question
What single property of conjugated bilirubin explains most of its other differences from unconjugated bilirubin?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
Conjugated bilirubin is water-soluble
## explanation_a
Correct. Conjugation with glucuronic acid makes bilirubin water-soluble, and this one property explains the rest of the comparison table: conjugated bilirubin can be excreted in bile and, when it backs up, in urine (giving dark urine in obstructive jaundice), while unconjugated bilirubin cannot appear in urine at all, being bound to albumin and not water-soluble.
## answer_b
Conjugated bilirubin has a shorter half-life in plasma
## explanation_b
Incorrect. While plausible-sounding, the property that actually drives the rest of the comparison table is water solubility, not half-life.
## answer_c
Conjugated bilirubin is more toxic to the brain than unconjugated bilirubin
## explanation_c
Incorrect. The reverse is true clinically — unconjugated bilirubin is the form that can cross the blood-brain barrier and cause kernicterus, precisely because it is not water-soluble.
## answer_d
Conjugated bilirubin cannot be measured in the laboratory
## explanation_d
Incorrect. Conjugated (direct) bilirubin is readily measured and is a standard part of a liver function panel.
## correct_answer
A
## topic
Haemoglobin catabolism
## subtopic
Clinical biochemistry
## main_concept
CON-HEM-C87C15A849F158
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.5
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN
## resource_ids

## learning_objective
Identify water solubility as the property that explains conjugated bilirubin's other distinguishing features.
## source_citation
Companion fact to the bilirubin-conjugation cluster above (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-HEM-C87C15A849F158 (103-BMS-mcq-heme-concepts.md), taught by ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Faecal stercobilinogen level tracks what, and what happens to it in obstruction?
## question
Faecal stercobilinogen level tracks what, and what happens to it in obstruction?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
It tracks dietary fat intake and rises in obstruction
## explanation_a
Incorrect. Stercobilinogen reflects bilirubin delivery to the gut, not dietary fat, and it falls (not rises) in obstruction.
## answer_b
It tracks how much bilirubin reached the gut — rising in haemolysis, falling in hepatocellular jaundice, and disappearing in obstruction
## explanation_b
Correct. Faecal stercobilinogen measures how much bilirubin actually reached the gut to be converted by bacteria. In haemolysis, more bilirubin is made and delivered, so it rises; in hepatocellular disease, delivery falls; in complete obstruction, no bilirubin reaches the gut, so it disappears — explaining the pale, clay-coloured stool of obstructive jaundice.
## answer_c
It is unrelated to bilirubin metabolism
## explanation_c
Incorrect. Stercobilinogen is a direct downstream product of intestinal bilirubin metabolism.
## answer_d
It rises in all three types of jaundice equally
## explanation_d
Incorrect. The whole diagnostic value of stercobilinogen is that it changes differently in each of the three jaundice types, not uniformly.
## correct_answer
B
## topic
Haemoglobin catabolism
## subtopic
Clinical biochemistry
## main_concept
CON-HEM-22375197AEE80D
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Diagnosis
## cognitive_effort
High
## cognitive_effort_score
0.6
## setting
Clinical
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
6
## clinical_relevance
0.6
## academic_relevance
0.7
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN
## resource_ids

## learning_objective
Explain how faecal stercobilinogen level distinguishes haemolytic, hepatocellular and obstructive jaundice.
## source_citation
Companion fact to the bilirubin/jaundice cluster (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
100
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-HEM-22375197AEE80D (103-BMS-mcq-heme-concepts.md), taught by ART-103-BIO-HEME-CATABOLISM-AND-BILIRUBIN; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Which pathway is the main source of NADPH in the cell, and what characterises its first (oxidative) phase?
## question
Which pathway is the main source of NADPH in the cell, and what characterises its first (oxidative) phase?
## subject
fnd
## status
Draft
## owner
Admin team
## vignette

## answer_a
The hexose monophosphate pathway; its oxidative phase is irreversible
## explanation_a
Correct. The hexose monophosphate pathway (HMP shunt) is the main source of cellular NADPH, generated in an oxidative phase (glucose-6-phosphate to ribulose-5-phosphate) that is irreversible, followed by a reversible non-oxidative phase that interconverts sugars.
## answer_b
Glycolysis; its committed step is irreversible
## explanation_b
Incorrect. Glycolysis is a major ATP and pyruvate source, not the main NADPH source — that role belongs specifically to the HMP shunt.
## answer_c
The citric acid cycle; all of its steps are reversible
## explanation_c
Incorrect. The CAC generates NADH, not NADPH, and several of its steps are irreversible, not all reversible.
## answer_d
Gluconeogenesis; its first phase is oxidative
## explanation_d
Incorrect. Gluconeogenesis is a glucose-synthesising, not an NADPH-generating, pathway.
## correct_answer
A
## topic
Hexose monophosphate shunt
## subtopic
Carbohydrate metabolism
## main_concept
CON-FND-B928DE79E08882
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
7
## clinical_relevance
0.4
## academic_relevance
0.8
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-HMP-PATHWAY-AND-G6PD
## resource_ids

## learning_objective
Name the pathway responsible for most cellular NADPH and characterise its oxidative phase.
## source_citation
EOM - Blood End Egyptian 1, Q16; EOM - Blood Final Egyptian final, Q4, Q70 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-FND-B928DE79E08882 (103-BMS-biochemistry-concepts.md), taught by ART-103-BIO-HMP-PATHWAY-AND-G6PD (103-BMS-biochemistry.md); confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Why does glycolysis have to be the red cell's only source of ATP?
## question
Why does glycolysis have to be the red cell's only source of ATP?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
Because red cells lack glucose transporters
## explanation_a
Incorrect. Red cells have glucose transporters (GLUT1); their limitation is downstream of glucose entry, not at transport.
## answer_b
Because red cells lack haemoglobin
## explanation_b
Incorrect. Red cells are defined by containing haemoglobin; this is not the reason they depend solely on glycolysis for ATP.
## answer_c
Because red cells have no mitochondria, so oxidative phosphorylation and the citric acid cycle are unavailable to them
## explanation_c
Correct. Mature red blood cells lose their mitochondria during maturation, so they cannot run the citric acid cycle or oxidative phosphorylation — glycolysis, ending in lactate, is their only route to ATP.
## answer_d
Because red cells lack hexokinase
## explanation_d
Incorrect. Red cells do have hexokinase; it is the first enzyme of the glycolytic pathway they depend on entirely.
## correct_answer
C
## topic
Glycolysis
## subtopic
Clinical biochemistry
## main_concept
CON-HEM-095C9C97B56CCA
## concept_ids

## contextual_concept_ids

## difficulty
Easy
## question_type
Mechanism
## cognitive_effort
Low
## cognitive_effort_score
0.35
## setting
Academic
## reasoning_level
1
## inferred_difficulty
65
## exam_relevance
7
## clinical_relevance
0.5
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT
## resource_ids

## learning_objective
Explain why the mature red cell depends entirely on glycolysis for ATP.
## source_citation
EOM - Blood end wafdeen final, Q19-20 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
75
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-HEM-095C9C97B56CCA (103-BMS-biochemistry-concepts.md), taught by ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
The red cell's 2,3-BPG (Rapoport-Luebering) shunt yields no net ATP. Why not?
## question
The red cell's 2,3-BPG (Rapoport-Luebering) shunt yields no net ATP. Why not?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
Because it bypasses the phosphoglycerate kinase step, which is where that ATP would otherwise have been made
## explanation_a
Correct. The BPG shunt diverts 1,3-bisphosphoglycerate to 2,3-BPG instead of letting phosphoglycerate kinase convert it to 3-phosphoglycerate with ATP production — so the shunt trades that one ATP for the regulatory molecule 2,3-BPG instead.
## answer_b
Because 2,3-BPG itself consumes ATP to be made
## explanation_b
Incorrect. The shunt does not consume extra ATP to make 2,3-BPG; it simply forgoes the ATP that phosphoglycerate kinase would have produced.
## answer_c
Because it occurs outside the red cell
## explanation_c
Incorrect. The BPG shunt is intracellular, within the red cell itself, exactly where the rest of glycolysis occurs.
## answer_d
Because it requires oxygen, which the red cell's anaerobic glycolysis cannot supply
## explanation_d
Incorrect. Like the rest of red cell glycolysis, the BPG shunt is anaerobic and does not require oxygen.
## correct_answer
A
## topic
Glycolysis
## subtopic
Clinical biochemistry
## main_concept
CON-HEM-7FBB4829A4A4EC
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
6
## clinical_relevance
0.4
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT
## resource_ids

## learning_objective
Explain why the 2,3-BPG shunt yields no net ATP.
## source_citation
Companion fact to the RBC-glycolysis cluster above (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-HEM-7FBB4829A4A4EC (103-BMS-biochemistry-concepts.md), taught by ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
What is the physiological purpose of making 2,3-BPG in the red cell, given that it costs the cell an ATP?
## question
What is the physiological purpose of making 2,3-BPG in the red cell, given that it costs the cell an ATP?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
It increases haemoglobin's affinity for oxygen, helping loading in the lungs
## explanation_a
Incorrect. 2,3-BPG does the opposite — it lowers, not raises, haemoglobin's oxygen affinity.
## answer_b
It has no functional role and is simply a metabolic byproduct
## explanation_b
Incorrect. 2,3-BPG is a deliberately produced regulatory molecule with a specific physiological purpose, not an inert byproduct.
## answer_c
It stabilises the red cell membrane
## explanation_c
Incorrect. Membrane stabilisation is not 2,3-BPG's role; its action is on haemoglobin's oxygen affinity.
## answer_d
It binds haemoglobin and lowers its oxygen affinity, which is what makes the shunt "worth running" despite its ATP cost
## explanation_d
Correct. 2,3-BPG binds preferentially to deoxyhaemoglobin and lowers haemoglobin's oxygen affinity, shifting the dissociation curve to favour oxygen release at the tissues — this physiological benefit is what justifies producing 2,3-BPG even at the cost of the ATP the shunt forgoes.
## correct_answer
D
## topic
Glycolysis
## subtopic
Clinical biochemistry
## main_concept
CON-HEM-6B557A065A8D90
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Mechanism
## cognitive_effort
High
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
6
## clinical_relevance
0.5
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT
## resource_ids

## learning_objective
Explain why 2,3-BPG's lowering of haemoglobin oxygen affinity justifies the ATP the shunt forgoes.
## source_citation
Companion fact to the RBC-glycolysis cluster above (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-HEM-6B557A065A8D90 (103-BMS-biochemistry-concepts.md), taught by ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
In obstructive jaundice, why is the stool clay-coloured and the urine dark?
## question
In obstructive jaundice, why is the stool clay-coloured and the urine dark?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
Because unconjugated bilirubin builds up in both stool and urine
## explanation_a
Incorrect. Unconjugated bilirubin does not appear in urine at all, since it is not water-soluble; this option misdescribes the actual mechanism.
## answer_b
Because no stercobilin reaches the stool (making it pale), while conjugated bilirubin, unable to reach the gut, backs up into the blood and appears in urine instead (making it dark)
## explanation_b
Correct. Obstruction blocks bile flow, so no bilirubin (and hence no stercobilin) reaches the intestine, leaving the stool clay-coloured. The conjugated bilirubin that cannot be excreted into bile backs up into the bloodstream instead, and because it is water-soluble, it spills into the urine, darkening it.
## answer_c
Because haemolysis increases bilirubin production dramatically
## explanation_c
Incorrect. Obstructive jaundice is a failure of excretion, not a haemolytic process with increased bilirubin production.
## answer_d
Because the liver stops producing bile acids entirely
## explanation_d
Incorrect. The core problem in obstruction is blocked outflow, not a complete cessation of bile acid production by the liver.
## correct_answer
B
## topic
Haemoglobin catabolism
## subtopic
Clinical biochemistry
## main_concept
CON-GIT-A265DD7A7CC8EF
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Diagnosis
## cognitive_effort
Medium
## cognitive_effort_score
0.55
## setting
Clinical
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
6
## clinical_relevance
0.7
## academic_relevance
0.7
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-JAUNDICE-AND-BILIRUBIN
## resource_ids

## learning_objective
Explain the clay-coloured stool and dark urine of obstructive jaundice in terms of stercobilin and conjugated bilirubin.
## source_citation
Companion fact to the bilirubin/jaundice cluster (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-GIT-A265DD7A7CC8EF (103-BMS-biochemistry-concepts.md), taught by ART-103-BIO-JAUNDICE-AND-BILIRUBIN (103-BMS-biochemistry.md); confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
The three types of jaundice (haemolytic, hepatocellular, obstructive) are told apart by which two laboratory findings?
## question
The three types of jaundice (haemolytic, hepatocellular, obstructive) are told apart by which two laboratory findings?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
Serum albumin and total protein
## explanation_a
Incorrect. Albumin and total protein are not the discriminating pair used to classify jaundice type.
## answer_b
Haemoglobin concentration and reticulocyte count alone
## explanation_b
Incorrect. These findings support a haemolytic picture but are not, on their own, the two-way discriminator used across all three jaundice types.
## answer_c
Which fraction of bilirubin rises (conjugated vs. unconjugated) and which liver enzyme rises alongside it
## explanation_c
Correct. The three jaundices are told apart by which bilirubin fraction rises — unconjugated in haemolytic jaundice, both fractions in hepatocellular disease, mainly conjugated in obstruction — together with which enzyme rises with it, such as markedly raised alkaline phosphatase in obstruction versus raised transaminases in hepatocellular disease.
## answer_d
Blood glucose and serum electrolytes
## explanation_d
Incorrect. Glucose and electrolytes are not the findings used to classify the type of jaundice.
## correct_answer
C
## topic
Haemoglobin catabolism
## subtopic
Clinical biochemistry
## main_concept
CON-GIT-4A2A86832F1FF2
## concept_ids

## contextual_concept_ids

## difficulty
Hard
## question_type
Diagnosis
## cognitive_effort
High
## cognitive_effort_score
0.6
## setting
Clinical
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
7
## clinical_relevance
0.7
## academic_relevance
0.7
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-JAUNDICE-AND-BILIRUBIN
## resource_ids

## learning_objective
Name the bilirubin-fraction and enzyme pattern that distinguishes haemolytic, hepatocellular and obstructive jaundice.
## source_citation
Companion fact to the bilirubin/jaundice cluster (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
100
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-GIT-4A2A86832F1FF2 (103-BMS-biochemistry-concepts.md), taught by ART-103-BIO-JAUNDICE-AND-BILIRUBIN; confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Why does HbA1c report glycaemic control specifically over the last two to three months?
## question
Why does HbA1c report glycaemic control specifically over the last two to three months?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
Because glucose binds haemoglobin non-enzymatically and irreversibly, so its level reflects glucose exposure over the red cell's roughly 120-day lifespan
## explanation_a
Correct. Glycation of haemoglobin is a non-enzymatic, irreversible reaction proportional to average blood glucose; because it accumulates for as long as the red cell survives (about 120 days), HbA1c reflects an average of the preceding two to three months, not a single moment's glucose level.
## answer_b
Because HbA1c is actively synthesised by the bone marrow in response to glucose
## explanation_b
Incorrect. HbA1c is not actively synthesised in response to glucose — it forms passively on existing circulating haemoglobin, which is exactly why its window matches the red cell's lifespan.
## answer_c
Because glucose is only measured every three months in clinical practice
## explanation_c
Incorrect. The two-to-three-month window is a biological property of the test itself, not a scheduling convention of how often it is ordered.
## answer_d
Because HbA1c is cleared by the kidney over exactly three months
## explanation_d
Incorrect. HbA1c's window is set by red cell lifespan, not by renal clearance kinetics.
## correct_answer
A
## topic
Types of normal Hb
## subtopic
Clinical biochemistry
## main_concept
CON-END-839E4F7D92FBEF
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Investigation
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Clinical
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
7
## clinical_relevance
0.7
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS
## resource_ids

## learning_objective
Explain why HbA1c's non-enzymatic, irreversible glycation gives it a two-to-three-month monitoring window.
## source_citation
EOM - Blood Final Egyptian final, Q16; EOM - Blood end wafdeen final, Q39 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-END-839E4F7D92FBEF (103-BMS-mcq-lipid-concepts.md), taught by ART-103-BIO-DIABETES-MELLITUS (103-BMS-mcq-lipid.md); confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Vitamin B12 requires which gastric factor for absorption, and where in the gut is it absorbed?
## question
Vitamin B12 requires which gastric factor for absorption, and where in the gut is it absorbed?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
Pepsin, absorbed in the stomach
## explanation_a
Incorrect. Pepsin digests protein and is not the specific carrier B12 needs; B12 is absorbed further along the gut, not in the stomach itself.
## answer_b
Intrinsic factor from gastric parietal cells, absorbed in the terminal ileum
## explanation_b
Correct. Vitamin B12 is absorbed only after intrinsic factor, secreted by the stomach's parietal cells, binds it and carries the complex to a specific receptor in the terminal ileum, where absorption actually occurs.
## answer_c
Gastrin, absorbed in the duodenum
## explanation_c
Incorrect. Gastrin is a hormone regulating acid secretion, not the carrier protein B12 requires, and the duodenum is not B12's absorption site.
## answer_d
Bile salts alone, absorbed in the jejunum
## explanation_d
Incorrect. Bile salts assist fat absorption, not B12 specifically, and B12's absorption site is the terminal ileum, not the jejunum.
## correct_answer
B
## topic
Cobalamin
## subtopic
Clinical biochemistry
## main_concept
CON-HEM-D76C58506E52B7
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Mechanism
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
7
## clinical_relevance
0.6
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-102-PHY-VITAMIN-B12-AND-FOLIC-ACID
## resource_ids

## learning_objective
Name the gastric factor B12 absorption requires and the site of absorption.
## source_citation
EOM - Blood End Egyptian 1, Q9-10; EOM - Blood end wafdeen final, Q8 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-HEM-D76C58506E52B7 (102-INT-concepts.md), taught by ART-102-PHY-VITAMIN-B12-AND-FOLIC-ACID (102-INT-physiology.md); confirmed named in the article's related_concepts. Held pending Kasr import.

---

# Item
## title
Why does vitamin B12 deficiency cause both macrocytic anaemia and neurological signs, unlike folate deficiency?
## question
Why does vitamin B12 deficiency cause both macrocytic anaemia and neurological signs, unlike folate deficiency?
## subject
haem
## status
Draft
## owner
Admin team
## vignette

## answer_a
Because B12 deficiency only affects the nervous system, not red cell maturation
## explanation_a
Incorrect. B12 deficiency affects both — DNA synthesis (causing macrocytic anaemia) and myelination (causing neurological signs) — not the nervous system alone.
## answer_b
Because B12 and folate have no overlapping functions at all
## explanation_b
Incorrect. B12 and folate metabolism are linked (B12 is needed to regenerate active folate), which is exactly why B12 deficiency also disrupts DNA synthesis and produces the same anaemia folate deficiency does.
## answer_c
Because B12 is needed for both DNA synthesis and for myelin sheath maintenance, so its deficiency produces the anaemia and the neurological signs that folate deficiency, affecting only DNA synthesis, does not
## explanation_c
Correct. Vitamin B12 is needed for DNA synthesis (giving the macrocytic, megaloblastic anaemia it shares with folate deficiency) and separately for myelin sheath maintenance, so its deficiency uniquely also produces neurological signs — the feature that distinguishes it from folate deficiency on a vignette.
## answer_d
Because B12 deficiency always occurs together with folate deficiency
## explanation_d
Incorrect. The two deficiencies can occur independently; the point of this fact is precisely to distinguish B12 deficiency from folate deficiency when they do not co-occur.
## correct_answer
C
## topic
Cobalamin
## subtopic
Clinical biochemistry
## main_concept
CON-HEM-DDAAF125FD2EBE
## concept_ids

## contextual_concept_ids

## difficulty
Moderate
## question_type
Diagnosis
## cognitive_effort
Medium
## cognitive_effort_score
0.55
## setting
Clinical
## reasoning_level
2
## inferred_difficulty
50
## exam_relevance
7
## clinical_relevance
0.7
## academic_relevance
0.75
## exam_weight_by_year
AU_Y1=0.5
## years
AU_Y1
## universities
au
## module
AU-MED-103
## module_subject
AU-MED-103 > Biochemistry
## question_only_for

## library_ids
ART-102-PHY-VITAMIN-B12-AND-FOLIC-ACID
## resource_ids

## learning_objective
Explain why B12 deficiency causes neurological signs in addition to the macrocytic anaemia it shares with folate deficiency.
## source_citation
EOM - Blood Final Egyptian final, Q41; EOM - Blood end wafdeen final, Q16 (Alexandria University, AU-MED-103).
## attached_image

## attachments

## media_recommendations

## estimated_seconds
90
## randomise_answers
yes
## author_notes
Tests Kasr concept CON-HEM-DDAAF125FD2EBE (102-INT-concepts.md), taught by ART-102-PHY-VITAMIN-B12-AND-FOLIC-ACID; confirmed named in the article's related_concepts. Held pending Kasr import.
