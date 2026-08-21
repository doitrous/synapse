<!--
  103 BMS · Biochemistry · MCQs · Lipid Metabolism, Biochemistry of Diabetes
  Mellitus, and Metabolic Integration in the Feed-Starve Cycle.

  79 single-best-answer items, all four-option, all from ONE source:

    src_07f0a0ff41addf826c7f
    y1/102 INT/Department Questions/DPT BOOK MCQ D book bio 102&103 mcq (1).pdf
    154 pp, OCR-only, one manifest row and it belongs to 102 INT.

  The extraction is the 102 INT lane's work, copied into
  scripts/kasr/extract/103-BMS/mcq-bank.json and tagged by that lane as taught
  by 103 BMS. This lane did not re-read the book except for the five pages named
  below. Item ids in author_notes are 102's extraction ids, never the imported
  question id.

  ── THE ANSWER KEYS WERE READ OFF THE PAGE, NOT INFERRED ─────────────────────

  Nine of these 79 items came through the extraction with `correct: null` — the
  printed key cell could not be agreed by five OCR passes. None has been filled
  by inference. All three chapter answer-key pages were opened with the Read
  tool and read visually, and every one of the nine was recovered:

    file p114 (printed 107)  Lipid Metabolism, items 1-50
    file p119 (printed 112)  Biochemistry of Diabetes Mellitus, items 1-22
    file p136 (printed 129)  Metabolic integration, items 1-7

  Recovered:  Lipid q1=A  q3=A  q4=D  q5=C  q26=D  q45=D
              Diabetes q19=C
              Metabolic integration q2=B  q7=C

  The same read also re-checked all 70 keys the extraction did report. Every one
  agreed; there is not a single mismatch between the bank and the printed page.
  Each item's author_notes says which of the two it was.

  ── TWO OCR REPAIRS, BOTH READ BACK OFF THE PAGE ─────────────────────────────

  Both items 102 flagged `suspect: "option count"` were opened and repaired:

  · Lipid q8 (file p108, printed 101). Options b, c and d had collapsed into one
    line, "1,2 ey 23 1 d) 1,3". Printed: a) 1, 1  b) 1, 2  c) 2, 1  d) 1, 3.
  · Lipid q45 (file p113, printed 106). Options b, c and d had collapsed into
    "VLDL ce) LDL d) HDL", leaving three options where the key names a fourth.
    Printed: a) Chylomicron  b) VLDL  c) LDL  d) HDL. The key's "d" is HDL, and
    the contradiction noted in correctSource was an artefact of the lost option.

  Three cosmetic spelling repairs are noted on their own items: "Singular" →
  "Singulair", "Apo Al" → "Apo A1", "long chin" → "long chain".

  ── WHAT THE DEPARTMENT TEXTBOOK DOES NOT CONTAIN ────────────────────────────

  The medical content of these explanations is taken from the department's own
  biochemistry book, src_300847a5fa64809d6c07, file pages 53-57 (Blood Glucose),
  58-82 (Lipid Metabolism) and 112-116 (Metabolic integration). Its cached page
  text was searched for every term these questions turn on. The following appear
  NOWHERE in its 160 pages, and each item that rests on one says so in its own
  author_notes:

    LCAT · lecithin · CETP · Lp(a) · eicosanoid · prostaglandin · thromboxane ·
    cyclooxygenase · Zellweger · Refsum · phytanic · sorbitol · aldose reductase ·
    HbA1c · glycated · ketoacidosis · metformin · sulfonylurea · GLP · heparin ·
    the phrase "insulin resistance"

  These are questions the department's own question book sets on material its
  own textbook does not carry. That is a finding for the faculty reviewer, not
  an error in the extraction.

  ── EXAM SIGNAL, AND ONE CANCELLED CHAPTER ───────────────────────────────────

  The Biochemistry department's orientation for 2025-2026 (file
  y1/103 BMS/Orientation/BIO ORIENTATION EOM AND EOY.pdf, src_90b75d63a73cfc7649b9)
  states that the END of MODULE exam "will be MCQs including the following
  chapters only", and its item 4 is "Lipid metabolism". The final exam covers
  "All chapters from Bioenergetics to vitamins ... EXCEPT the cancelled items".
  Eight of the twenty-two named "Diagrams to be studied" are from this chapter:
  Carnitine Shuttle (63), Ketogenesis (67), Ketolysis (68), Metabolism of Ketone
  Bodies (70), Biosynthesis of Bile Acid (74), Metabolism of chylomicron (77),
  Metabolism of VLDL (78), Metabolism of HDL (79). Lipid metabolism is examined
  in both sittings, and in this format.

  Row 10 of the same document's cancelled-items table reads "Metabolic
  integration ... 109-114", cancelled from BOTH the end-of-module and the final
  exam. The seven metabolic-integration items are kept — a cancelled topic still
  appears in the question book and a student may still meet it — but their
  exam_relevance and exam_weight_by_year are written low and do not claim the
  material is examined. Each says so in its own author_notes.

  ── THE DIABETES CHAPTER HAS NO NODE IN THE SUBJECT TREE ─────────────────────

  The 22 "Biochemistry Of Diabetes Mellitus" items carry
  module_subject "103 BMS > Biochemistry" and stop there. The subject tree in
  docs/Kasr-Source-Imports/academic/103-BMS-structure.md was built from the
  department TEXTBOOK's contents page, and that book has no diabetes chapter;
  the QUESTION book has its own eleven-chapter structure and does. No node was
  invented and the items were not filed under Carbohydrate Metabolism or Lipid
  Metabolism to make them fit. This is a decision owed to a faculty reviewer:
  either the tree gains a node the textbook does not name, or these items stay
  at subject level.

  The other two chapters resolve. "Lipid Metabolism" is the tree's own name.
  "Metabolic Integration In Feed-Starve Cycle" is the tree's "Metabolic
  Integrations", and the tree's name is what is written.

  ── PROVENANCE ──────────────────────────────────────────────────────────────

  status: Draft throughout — every item needs a faculty reviewer.
  resource_ids is present and empty on every item: it resolves against the
  catalogue store, not the evidence store the manifest feeds, so naming
  src_07f0a0ff41addf826c7f there would error. Provenance is carried in
  source_citation and derived_from instead.
  Question ids are hashed from "kau:103 BMS:<sourceId>:<page>:<printedNumber>";
  no hex is invented.

  Imports at: Admin › Bulk import → question.
-->


# Item

## id
QM-103-C9FBB9FECDFB

## title
Before a fatty acid can be oxidised it must be activated and then shuttled across the inner mitochondrial membrane. The activating agent and the shuttle molecule, respectively, are:

## question
Before a fatty acid can be oxidised it must be activated and then shuttled across the inner mitochondrial membrane. The activating agent and the shuttle molecule, respectively, are:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 107, printed page 100, printed question 1, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
CoA and carnitine

## explanation_a
Correct. Two separate steps are being asked about and they use two different molecules. Activation happens in the **cytosol**: acyl-CoA synthetase (thiokinase) joins the free fatty acid to coenzyme A, spending one ATP that goes to AMP and pyrophosphate — so the true cost is two high-energy bonds, not one. The product, acyl-CoA, cannot cross the inner mitochondrial membrane if the chain is 12 carbons or longer. That is the job of **carnitine**: carnitine palmitoyl transferase I on the outer membrane swaps CoA for carnitine to make acyl-carnitine, carnitine acyl-carnitine translocase carries it across the inner membrane in exchange for free carnitine, and CPT-II on the inner face swaps carnitine back for CoA so that acyl-CoA is reassembled inside the matrix where β-oxidation runs. Hold the pairing as *CoA activates, carnitine transports*.

## answer_b
CoA and citrate

## explanation_b
Incorrect. Citrate is the shuttle for the opposite journey. It carries acetyl units **out** of the mitochondrion into the cytosol for fatty acid synthesis; it never carries a long-chain acyl group in. A student who has learnt one shuttle and assumes it works both ways picks this.

## answer_c
Acetyl CoA and carnitine

## explanation_c
Incorrect. Acetyl-CoA is a two-carbon **product** of β-oxidation, not the reagent that activates the fatty acid. The activating molecule is free coenzyme A. This option catches the very common habit of writing "acetyl-CoA" whenever CoA is meant.

## answer_d
Acetyl CoA and citrate

## explanation_d
Incorrect on both halves at once — acetyl-CoA does not activate the fatty acid and citrate does not carry it inwards. It is the option for a student who has memorised the two most familiar names in lipid metabolism without the direction of either.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## main_concept
CON-FND-177A829022AC8F

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
58

## exam_relevance
9

## clinical_relevance
0.4

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Separate the activation of a fatty acid from its transport into the mitochondrion, and name the molecule used at each step.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 100 (file page 107), question 1; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p107-q1, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
The extraction recorded correct: null with correctSource "none". The printed answer key on file page 114 (printed 107) was opened with the Read tool and read visually: item 1 is A. Recovered, not inferred.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-7C49A6779666

## title
Long chain fatty acids are first activated to acyl-CoA in:

## question
Long chain fatty acids are first activated to acyl-CoA in:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 107, printed page 100, printed question 2, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Cytosol

## explanation_a
Correct. Acyl-CoA synthetase sits on the outer mitochondrial membrane facing the **cytosol**, so a long-chain fatty acid is activated before it goes anywhere. That ordering is the whole reason the carnitine shuttle exists: activation happens outside, oxidation happens inside, and the inner membrane will not pass acyl-CoA. Note the department book's own qualifier — fatty acids **shorter than 12 carbons** cross the membranes freely and are activated by a matrix enzyme, so the cytosolic answer is specifically about long-chain fatty acids.

## answer_b
Microsomes

## explanation_b
Incorrect. The microsomal (endoplasmic reticulum) system is where fatty acids are **elongated**, from C10 up to C24, using malonyl-CoA and NADPH. It is a synthetic system, not an activating one, and this option catches a student who remembers "microsomes" from the fatty acid chapter without remembering which reaction it belongs to.

## answer_c
Nucleus

## explanation_c
Incorrect. No step of fatty acid metabolism occurs in the nucleus. This is a filler option, and choosing it usually means guessing rather than a specific misconception.

## answer_d
Mitochondria

## explanation_d
Incorrect, and it is the trap. β-oxidation itself is mitochondrial, so the mitochondrion feels like the right answer — but the question asks where activation happens, and if it happened inside there would be no transport problem and no need for carnitine. A student who picks this cannot then explain why carnitine deficiency causes disease.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## main_concept
CON-FND-177A829022AC8F

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
74

## exam_relevance
8

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
State the subcellular site at which a long-chain fatty acid is activated, and explain why that site makes a transport step necessary.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 100 (file page 107), question 2; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p107-q2, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 2 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-B1A09D437AE5

## title
The enzymes of β-oxidation are found in:

## question
The enzymes of β-oxidation are found in:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 107, printed page 100, printed question 3, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Mitochondria

## explanation_a
Correct. The four enzymes of the β-oxidation spiral — acyl-CoA dehydrogenase, enoyl-CoA hydratase, 3-hydroxyacyl-CoA dehydrogenase and β-ketothiolase — all sit in the **mitochondrial matrix**, immediately alongside the citric acid cycle and the electron transport chain. That neighbourhood is the point of the arrangement: the acetyl-CoA produced walks straight into Krebs, and the FADH₂ and NADH walk straight into the respiratory chain. Two consequences follow and are examinable. A red cell has no mitochondria, so it cannot oxidise fatty acids at all; and plasma fatty acids travel bound to albumin, which cannot cross the blood–brain barrier, so nervous tissue does not use them either.

## answer_b
Cytosol

## explanation_b
Incorrect, and this is the mirror-image confusion the question exists to catch. The cytosol is where fatty acids are **synthesised** and where they are activated — the opposite pathway in the opposite compartment. Oxidation and synthesis are deliberately kept apart so they cannot run simultaneously and waste ATP.

## answer_c
Golgi apparatus

## explanation_c
Incorrect. The Golgi apparatus packages and modifies proteins and lipids for export; it runs no step of fatty acid oxidation.

## answer_d
Nucleus

## explanation_d
Incorrect. The nucleus houses no enzyme of β-oxidation. Picking it usually reflects a guess rather than a specific belief.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## main_concept
CON-FND-84BDACCA71AF45

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
80

## exam_relevance
8

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Name the compartment in which β-oxidation runs, and derive from it why red cells and nervous tissue do not use fatty acids for energy.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 100 (file page 107), question 3; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p107-q3, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
The extraction recorded correct: null with correctSource "printed key (p114) read differently by different OCR passes (a/b)". The printed answer key on file page 114 (printed 107) was opened with the Read tool and read visually: item 3 is A. Recovered, not inferred.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-A8A1D8760146

## title
An important feature of Zellweger syndrome is:

## question
An important feature of Zellweger syndrome is:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 107, printed page 100, printed question 4, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Accumulation of oxidised short chain fatty acids

## explanation_a
Incorrect on two counts. Nothing accumulates in its *oxidised* form — the defect is a failure to oxidise — and short-chain fatty acids are not the substrate involved. This option is built to be discarded by a student who reads the adjective as well as the noun.

## answer_b
Accumulation of phytanic acid in tissues

## explanation_b
Incorrect, and it is the intended trap: phytanic acid is the branched-chain fatty acid that accumulates in **Refsum disease**, a defect of α-oxidation. Refsum and Zellweger are both peroxisomal and are taught on the same page, so students routinely swap the two accumulating substances. The discriminator is the shape of the molecule: Refsum has a methyl group in the way (branched), Zellweger has a chain that is simply too long.

## answer_c
Accumulation of short chain fatty acids in tissues

## explanation_c
Incorrect. Short-chain fatty acids cross mitochondrial membranes freely and are handled by ordinary mitochondrial β-oxidation, which is intact here. Nothing in this disease obstructs them.

## answer_d
Accumulation of long chain fatty acids in tissues

## explanation_d
Correct. Peroxisomal β-oxidation exists to **trim very-long-chain fatty acids** down to a length the mitochondrion can handle. Zellweger syndrome is a failure of peroxisome biogenesis, so that trimming step is lost and very-long-chain (long-chain) fatty acids accumulate in tissues, most damagingly in the brain, liver and kidney. Read the pair as a matched set: the peroxisome handles chains that are too *long*, α-oxidation handles chains that are too *branched*, and mitochondrial β-oxidation handles everything else.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## main_concept
CON-FND-F8FE239D334F4F

## concept_ids

## contextual_concept_ids

## difficulty
Hard

## question_type
Pathophysiology

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
6

## clinical_relevance
0.55

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Distinguish the substrate that accumulates in a peroxisomal biogenesis defect from the one that accumulates in an α-oxidation defect.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 100 (file page 107), question 4; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p107-q4, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
The extraction recorded correct: null with correctSource "printed key (p114) read differently by different OCR passes (b/d)". The printed answer key on file page 114 (printed 107) was opened with the Read tool and read visually: item 4 is D. Recovered, not inferred.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
The 103 department biochemistry book names peroxisomal β-oxidation and its function ("mainly for the trimming of very long-chain fatty acids") on file page 64, but does not name Zellweger syndrome anywhere. The disease name comes from the question book only. Flagged for the faculty reviewer.

---

# Item

## id
QM-103-BB62E735538E

## title
Propionyl-CoA formed from oxidation of fatty acids having an odd number of carbon atoms is converted into:

## question
Propionyl-CoA formed from oxidation of fatty acids having an odd number of carbon atoms is converted into:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 107, printed page 100, printed question 5, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Acetyl-CoA

## explanation_a
Incorrect, and it is the option that shows the misconception directly. Propionyl-CoA has **three** carbons and acetyl-CoA has two; there is no reaction that simply shortens it by one. If odd-chain fatty acids ended in acetyl-CoA they would be indistinguishable from even-chain ones, and the whole reason they are taught separately would disappear.

## answer_b
Acetoacetyl-CoA

## explanation_b
Incorrect. Acetoacetyl-CoA is a four-carbon intermediate of ketogenesis, made by condensing two acetyl-CoA molecules. It sits in the ketone body pathway, not in the propionate pathway, and this option catches a student who is pattern-matching on "-acetyl-CoA" endings.

## answer_c
Methyl malonyl-CoA

## explanation_c
Correct. β-oxidation removes two carbons at a time, so an odd-chain fatty acid runs out with a three-carbon residue rather than a two-carbon one: **propionyl-CoA**. Propionyl-CoA carboxylase, a **biotin**-dependent enzyme, then adds CO₂ to give methylmalonyl-CoA, which is rearranged to succinyl-CoA. Succinyl-CoA is a citric acid cycle intermediate, and that is why the department book says the last three carbons of an odd-chain fatty acid *can* be converted to glucose while acetyl-CoA never can — acetyl-CoA enters the cycle after the irreversible pyruvate dehydrogenase step, and succinyl-CoA enters before it.

## answer_d
Butyryl-CoA

## explanation_d
Incorrect. Butyryl-CoA is a four-carbon acyl-CoA, an ordinary intermediate part-way through the β-oxidation of an even-chain fatty acid. It is upstream of the problem, not the answer to it.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## main_concept
CON-FND-84BDACCA71AF45

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

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
52

## exam_relevance
7

## clinical_relevance
0.35

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Explain why an odd-chain fatty acid yields a three-carbon residue, and trace propionyl-CoA to the point where it can become glucose.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 100 (file page 107), question 5; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p107-q5, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
The extraction recorded correct: null with correctSource "none". The printed answer key on file page 114 (printed 107) was opened with the Read tool and read visually: item 5 is C. Recovered, not inferred.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
Evidenced from the department book in two places: file page 50 ("Odd chain fatty acid oxidation produces ... one molecule of propionyl-CoA, which is converted to succinyl-CoA then to glucose") and file page 153, where propionyl-CoA carboxylase is listed among the three biotin-dependent carboxylases.

---

# Item

## id
QM-103-2F32AACA7C98

## title
Refsum disease results from a defect in:

## question
Refsum disease results from a defect in:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 107, printed page 100, printed question 6, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Alpha-oxidation of fatty acids

## explanation_a
Correct. Phytanic acid, which comes from the diet, carries a **methyl group on its β-carbon**. β-oxidation works by attacking that carbon, so a substituent there blocks the pathway outright. α-oxidation exists precisely for this: it removes one carbon from the carboxyl end, which shifts the methyl group off the β-position and lets ordinary β-oxidation take over. Lose α-oxidation and phytanic acid accumulates — the definition of Refsum disease. The rule to hold is *branched chain, α-oxidation*.

## answer_b
Beta-oxidation of fatty acids

## explanation_b
Incorrect, and it is the answer of a student who has not asked why an alternative pathway would exist at all. β-oxidation is intact in Refsum disease; it simply cannot start, because the methyl group is sitting on the carbon it needs to oxidise. Blaming β-oxidation makes the disease indistinguishable from MCAD deficiency, which presents completely differently.

## answer_c
Gamma-oxidation of fatty acids

## explanation_c
Incorrect. There is no γ-oxidation pathway in human fatty acid metabolism. The option exists because α, β and ω are all real and a student filling the Greek series will reach for the missing letter.

## answer_d
Omega-oxidation of fatty acids

## explanation_d
Incorrect. ω-oxidation is a minor microsomal route that oxidises the terminal methyl carbon at the far end of the chain, producing dicarboxylic acids. It is a normally minor pathway that becomes important when β-oxidation is blocked — a consequence of disease, not the lesion in Refsum.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## main_concept
CON-FND-F8FE239D334F4F

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
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## clinical_relevance
0.5

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
State which oxidation pathway handles branched-chain fatty acids and explain why β-oxidation cannot.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 100 (file page 107), question 6; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p107-q6, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 6 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
The department book states the mechanism on file page 64 — α-oxidation is "important for oxidation of fatty acids with a methyl group on the β-carbon (so-called branched chain fatty acids) which blocks β-oxidation" — but does not name Refsum disease. The disease name comes from the question book only.

---

# Item

## id
QM-103-EB5645F34DD7

## title
How many turns of the fatty acid oxidation cycle are needed to oxidise a C14 fatty acid molecule?

## question
How many turns of the fatty acid oxidation cycle are needed to oxidise a C14 fatty acid molecule?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 108, printed page 101, printed question 7, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Six

## explanation_a
Correct, and the arithmetic is worth doing rather than memorising. Each turn of the spiral removes two carbons as acetyl-CoA and leaves a shorter acyl-CoA behind. The **last** turn splits a four-carbon acyl-CoA into two acetyl-CoA at once, so the chain is finished one turn early. For a chain of n carbons the count is therefore (n/2) − 1 turns and n/2 acetyl-CoA. For C14: 14/2 − 1 = **6 turns**, giving 7 acetyl-CoA. The department book works the same sum for palmitate, C16: 7 cycles, 8 acetyl-CoA.

## answer_b
Seven

## explanation_b
Incorrect, and it is the single commonest error on this question — it is n/2, forgetting that the final four-carbon unit yields two acetyl-CoA in one cut rather than needing a turn of its own. Seven is the number of *acetyl-CoA* produced from C14, not the number of turns, so this option catches a student who has learnt the right number attached to the wrong thing.

## answer_c
Twelve

## explanation_c
Incorrect. Twelve is n − 2, which would be the answer if each turn removed a single carbon. β-oxidation removes two.

## answer_d
Fourteen

## explanation_d
Incorrect. Fourteen is simply the carbon count copied back out. It is the answer of a student who has not engaged with the cycle at all.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## main_concept
CON-FND-84BDACCA71AF45

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
57

## exam_relevance
8

## clinical_relevance
0.25

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Calculate the number of β-oxidation turns and acetyl-CoA molecules produced from a fatty acid of a given even chain length.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 101 (file page 108), question 7; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p108-q7, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 7 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-30F8D3BE7286

## title
How many FADH₂ and NADH molecules are produced, respectively, during one turn of the fatty acid oxidation cycle?

## question
How many FADH₂ and NADH molecules are produced, respectively, during one turn of the fatty acid oxidation cycle?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 108, printed page 101, printed question 8, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
1, 1

## explanation_a
Correct, and it follows from the shape of the cycle rather than from memory. Each turn runs four reactions in a fixed order — oxidation, hydration, oxidation, thiolytic cleavage — and only two of them are oxidations. Acyl-CoA dehydrogenase reduces **FAD** to FADH₂; 3-hydroxyacyl-CoA dehydrogenase reduces **NAD⁺** to NADH+H⁺. One each, every turn, whatever the chain length. That is why the book can total palmitate so simply: 7 turns give 7 FADH₂ and 7 NADH, worth 28 ATP through the respiratory chain, while the 8 acetyl-CoA give 80 ATP in the citric acid cycle — 108 in all, less 2 for activation, so a net 106.

## answer_b
1, 2

## explanation_b
Incorrect. This doubles the NADH, which is what happens if a student folds the citric acid cycle into the count — the acetyl-CoA produced does go on to make three NADH each, but that happens *after* the turn, in Krebs, not within β-oxidation.

## answer_c
2, 1

## explanation_c
Incorrect. There is only one FAD-linked step per turn, acyl-CoA dehydrogenase. Two FADH₂ would require a second flavoprotein oxidation that the pathway does not contain.

## answer_d
1, 3

## explanation_d
Incorrect for the same reason as B, taken further: it imports the whole Krebs NADH yield into a single β-oxidation turn. Keeping the two ledgers separate is the point of the question.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## main_concept
CON-FND-84BDACCA71AF45

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
60

## exam_relevance
8

## clinical_relevance
0.25

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
State the reduced cofactors produced per turn of β-oxidation and keep them separate from the yield of the citric acid cycle.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 101 (file page 108), question 8; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p108-q8, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 8 is A, agreeing with the extraction.
OCR repair: The extraction flagged this item suspect for "option count" — options b, c and d had collapsed into one line reading "1,2 ey 23 1 d) 1,3". File page 108 (printed 101) was opened with the Read tool and read visually. The four printed options are a) 1, 1  b) 1, 2  c) 2, 1  d) 1, 3, and they are restored here as printed. The printed key gives a.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-5C2C4EBC3CD5

## title
Which of the following relationships applies to the turns of the fatty acid oxidation cycle?

## question
Which of the following relationships applies to the turns of the fatty acid oxidation cycle?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 108, printed page 101, printed question 9, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
7 turns; 8 acetyl CoA molecules

## explanation_a
Correct, and it is the department book's own worked example for palmitic acid. C16 needs (16/2) − 1 = **7 turns** and yields 16/2 = **8 acetyl-CoA**, because the final turn cleaves a four-carbon acyl-CoA into two acetyl-CoA at once. The pairing to hold is that acetyl-CoA always exceeds the turn count by exactly one.

## answer_b
7 turns; 8 NADH molecules

## explanation_b
Incorrect, and it is the near-miss the question is built around. The turn count is right but the product is wrong: 7 turns give **7** NADH, one per turn, not 8. Only acetyl-CoA gets the extra one, because only acetyl-CoA is produced twice on the last turn. A student who has memorised "7 and 8" without knowing which number belongs to which product picks this.

## answer_c
6 turns; no FADH₂ molecules

## explanation_c
Incorrect twice over. Six turns would suit a C14 chain rather than palmitate, and every turn of β-oxidation produces one FADH₂ at the acyl-CoA dehydrogenase step — there is no version of the cycle that produces none.

## answer_d
5 turns; 6 NADPH molecules

## explanation_d
Incorrect. NADPH is the reductant of fatty acid **synthesis**; oxidation produces NADH and FADH₂ and consumes no NADPH. Choosing this signals that the two pathways have been merged in the student's mind, which is the error that also loses marks on the regulation questions.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## main_concept
CON-FND-84BDACCA71AF45

## concept_ids
CON-FND-4C05D459E80AEF

## contextual_concept_ids

## difficulty
Moderate

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
54

## exam_relevance
8

## clinical_relevance
0.25

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Match the number of β-oxidation turns to the correct product count for palmitate, and reject yields that belong to another pathway.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 101 (file page 108), question 9; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p108-q9, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 9 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-527E54F230AB

## title
What is the biochemical basis of this infant's symptoms?

## question
What is the biochemical basis of this infant's symptoms?

## vignette
A 4-month-old infant presents with convulsions. His mother reports that he has been irritable and lethargic over the past several days. He is found to have a profoundly low serum glucose with a low ketone body level, and is diagnosed with medium chain acyl-CoA dehydrogenase (MCAD) deficiency.

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 108, printed page 101, printed question 10, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
β-oxidation of fatty acid is impaired

## explanation_a
Correct, and the two laboratory values together are what make it certain. Acyl-CoA dehydrogenase catalyses the **first** reaction of every β-oxidation turn, and the medium-chain isoform takes over once longer enzymes have trimmed the chain to medium length. Lose it and the spiral stalls part-way. Three consequences follow, and they are exactly what the infant shows. Hepatic fatty acid oxidation normally supplies the ATP that gluconeogenesis runs on, so gluconeogenesis fails; the body falls back on burning glucose, so liver glycogen is stripped and hypoglycaemia deepens; and because acetyl-CoA is no longer being generated in the liver there is nothing to make ketone bodies from — hence a **low**, not a high, ketone level. That combination, fasting hypoglycaemia *without* ketosis, is the signature of a fatty acid oxidation defect and is why the infant deteriorates over days rather than hours, as fasting between feeds lengthens.

## answer_b
Fatty acid synthesis is impaired

## explanation_b
Incorrect. Fatty acid synthesis is a cytosolic anabolic pathway that runs when insulin is high and fuel is plentiful. A synthetic block would not cause hypoglycaemia, and it certainly would not present during fasting, which is when this infant is worst.

## answer_c
Lipolysis is inhibited

## explanation_c
Incorrect, and it inverts the physiology. Lipolysis in this child is if anything **increased** — falling glucose raises the anti-insulin hormones, which drive fatty acids out of adipose tissue. The fatty acids arrive at the liver perfectly well; the failure is that the liver cannot burn them.

## answer_d
TCA cycle is inhibited

## explanation_d
Incorrect. The citric acid cycle is intact. It is simply short of substrate, because the acetyl-CoA that β-oxidation would have delivered never arrives. Naming the cycle as the lesion misplaces the block one step downstream of where it is.

## topic
Lipid metabolism

## subtopic
Metabolic disorders of β-oxidation

## main_concept
CON-FND-A0F07BE6AD30A5

## concept_ids
CON-FND-84BDACCA71AF45

## contextual_concept_ids

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.6

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
62

## exam_relevance
8

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Explain how a block in β-oxidation produces hypoglycaemia that is accompanied by low rather than high ketone bodies.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 101 (file page 108), question 10; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
90

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p108-q10, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 10 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-41FBCD5C457A

## title
In which of the following is carnitine directly involved?

## question
In which of the following is carnitine directly involved?

## vignette
A 5-year-old boy presents with altered mental status, heart failure and muscle weakness. His serum ketones and glucose are both abnormally low. He is diagnosed with primary carnitine deficiency.

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 108, printed page 101, printed question 11, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Activation of fatty acids

## explanation_a
Incorrect, and it is the distinction the question is built to test. Activation is done by **acyl-CoA synthetase** using coenzyme A and ATP, in the cytosol, and it happens whether or not carnitine is present. Carnitine arrives only afterwards. A student who merges the two steps cannot explain why a carnitine-deficient patient still forms acyl-CoA normally.

## answer_b
Transport of fatty acyl CoA

## explanation_b
Correct. Carnitine is the carrier that gets **long-chain acyl-CoA across the inner mitochondrial membrane**, which is otherwise impermeable to it. CPT-I on the outer membrane exchanges CoA for carnitine, carnitine acyl-carnitine translocase moves the acyl-carnitine inwards against outgoing free carnitine, and CPT-II regenerates acyl-CoA in the matrix. Carnitine itself is made in liver and kidney from lysine and methionine and is stored in skeletal muscle, heart and brain — which is why deficiency strikes exactly those organs. This boy's cardiomyopathy and muscle weakness come from ATP failure in tissues that depend on fatty acids, and his low glucose with low ketones is the same hypoketotic hypoglycaemia any block in this pathway produces.

## answer_c
alpha-Oxidation

## explanation_c
Incorrect. α-oxidation is a peroxisomal route for branched-chain fatty acids such as phytanic acid, and it uses no carnitine. The option catches a student who associates carnitine loosely with "fatty acid oxidation" rather than with one specific transport step.

## answer_d
ω-Oxidation

## explanation_d
Incorrect. ω-oxidation acts on the terminal methyl carbon in the microsomes and is independent of carnitine. It becomes more active when β-oxidation is blocked, so it is a consequence of this disease rather than a pathway carnitine serves.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## main_concept
CON-FND-177A829022AC8F

## concept_ids
CON-FND-A0F07BE6AD30A5

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
Clinical

## reasoning_level
2

## inferred_difficulty
72

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Name the single step of fatty acid catabolism that carnitine serves, and separate it from activation.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 101 (file page 108), question 11; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p108-q11, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 11 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-24B77D8181B5

## title
Which of the following is NOT a manifestation of medium chain acyl-CoA dehydrogenase (MCAD) deficiency?

## question
Which of the following is NOT a manifestation of medium chain acyl-CoA dehydrogenase (MCAD) deficiency?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 108, printed page 101, printed question 12, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Liver glycogen stores are depleted

## explanation_a
This is a real feature, so it is not the answer. With fatty acids unavailable, the body leans harder on glucose to meet its energy needs, and hepatic glycogen is stripped faster than normal — which is part of why the hypoglycaemia is so profound.

## answer_b
Decreased gluconeogenesis

## explanation_b
This is a real feature, so it is not the answer. Gluconeogenesis is expensive and the liver pays for it with ATP generated by oxidising fatty acids. Remove that ATP supply and gluconeogenesis falls, which is the second reason the glucose drops.

## answer_c
Decreased fatty acid oxidation

## explanation_c
This is a real feature, so it is not the answer — it is the primary lesion. MCAD catalyses the first oxidation of each turn once the chain has been trimmed to medium length, so its loss stops the spiral there.

## answer_d
Increased ketone body synthesis

## explanation_d
Correct: this is the one that does **not** occur, and picking it is the whole point of the question. Ketone bodies are built from the acetyl-CoA that β-oxidation supplies. If the liver cannot oxidise fatty acids it has no acetyl-CoA to spare, so ketogenesis **falls**. The resulting picture — fasting hypoglycaemia with inappropriately low ketones — is called *non-ketotic* or hypoketotic hypoglycaemia and is the diagnostic signature of the whole family of fatty acid oxidation defects. A student who reasons "fasting raises ketones, this child is effectively fasting, so ketones must be high" gets this backwards, and it is the same reasoning that would let them miss the diagnosis in a real infant.

## topic
Lipid metabolism

## subtopic
Metabolic disorders of β-oxidation

## main_concept
CON-FND-A0F07BE6AD30A5

## concept_ids
CON-END-2E748A37DA660A

## contextual_concept_ids

## difficulty
Hard

## question_type
Pathophysiology

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
45

## exam_relevance
8

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Predict the direction ketone body synthesis moves in a fatty acid oxidation defect, and justify it from the source of ketone body carbon.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 101 (file page 108), question 12; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p108-q12, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 12 is D, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-F384F726F137

## title
What is the biochemical basis of this non-ketotic hypoglycaemia?

## question
What is the biochemical basis of this non-ketotic hypoglycaemia?

## vignette
A patient is diagnosed with carnitine palmitoyl transferase II (CPT-II) deficiency and presents with non-ketotic hypoglycaemia.

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 109, printed page 102, printed question 13, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Defective peroxisomal oxidation of fatty acids

## explanation_a
Incorrect. Peroxisomal β-oxidation trims very-long-chain fatty acids and is intact here; a defect in it gives the accumulation picture of Zellweger syndrome, not fasting hypoglycaemia. CPT-II is a mitochondrial inner-membrane enzyme and has nothing to do with peroxisomes.

## answer_b
Defective α-oxidation of fatty acids

## explanation_b
Incorrect. α-oxidation handles branched-chain fatty acids such as phytanic acid, and losing it gives Refsum disease. Neither the enzyme nor the clinical picture matches.

## answer_c
Defective β-oxidation of fatty acids

## explanation_c
Correct. CPT-II sits on the inner face of the inner mitochondrial membrane and performs the last step of the carnitine shuttle, handing the acyl group back from carnitine to CoA inside the matrix. Without it, acyl-carnitine arrives but acyl-CoA is never regenerated, so **mitochondrial β-oxidation cannot proceed** even though every enzyme of the spiral is normal. The consequences are the ones shared by every block in this pathway: no hepatic acetyl-CoA, therefore no ketogenesis; no fatty-acid-derived ATP, therefore failing gluconeogenesis; and heavier reliance on glucose, therefore depleted glycogen. Hypoglycaemia with low ketones is the result. The transferable point is that a transport defect and an enzyme defect produce the same syndrome, because the pathway is only as good as its slowest gate.

## answer_d
Defective ω-oxidation of fatty acids

## explanation_d
Incorrect. ω-oxidation is a minor microsomal route on the far end of the chain. It does not depend on CPT-II, and it is upregulated rather than lost when β-oxidation is blocked.

## topic
Lipid metabolism

## subtopic
Metabolic disorders of β-oxidation

## main_concept
CON-FND-A0F07BE6AD30A5

## concept_ids
CON-FND-177A829022AC8F

## contextual_concept_ids

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.6

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
58

## exam_relevance
7

## clinical_relevance
0.8

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Explain why a defect in the carnitine shuttle produces the same hypoketotic hypoglycaemia as a defect in a β-oxidation enzyme.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 102 (file page 109), question 13; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p109-q13, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 13 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-143D777C48E0

## title
Fatty acids are activated to form acyl-CoA by which of the following enzymes?

## question
Fatty acids are activated to form acyl-CoA by which of the following enzymes?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 109, printed page 102, printed question 14, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Acetyl CoA carboxylase

## explanation_a
Incorrect, and the names are close enough to be the trap. Acetyl-CoA **carboxylase** adds CO₂ to acetyl-CoA to make malonyl-CoA — it is the key regulatory enzyme of fatty acid *synthesis*, on the opposite side of the metabolism, and it uses biotin rather than ATP-driven thioester formation.

## answer_b
Acyl CoA synthetase

## explanation_b
Correct. Acyl-CoA synthetase, also called thiokinase, joins a free fatty acid to coenzyme A in the cytosol. It spends one ATP, but cleaves it to **AMP and pyrophosphate** rather than ADP and phosphate, and pyrophosphatase then hydrolyses the pyrophosphate — so two high-energy bonds are consumed and the reaction is pulled irreversibly forward. That is why the book subtracts 2 from the ATP yield of palmitate: 108 gross, 106 net. Remember the ending: a *synthetase* uses a nucleoside triphosphate, and this one is the entry gate to every route a fatty acid can take.

## answer_c
Hormone sensitive lipase

## explanation_c
Incorrect. Hormone-sensitive lipase releases fatty acids from stored triacylglycerol inside the adipocyte — it is the step *before* this one and it produces the free fatty acid that then needs activating. Confusing the two collapses the mobilisation of fat into its activation.

## answer_d
Thioesterase

## explanation_d
Incorrect. A thioesterase does the reverse of activation: it hydrolyses a thioester bond. In fatty acid synthesis it is the activity that releases finished palmitate from the fatty acid synthase complex.

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## main_concept
CON-FND-177A829022AC8F

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
72

## exam_relevance
8

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Name the enzyme that activates a fatty acid and state the energy cost of the reaction.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 102 (file page 109), question 14; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p109-q14, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 14 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-A78C60348661

## title
Which B vitamin is turned into a product that plays a role in fatty acid oxidation but not in fatty acid biosynthesis?

## question
Which B vitamin is turned into a product that plays a role in fatty acid oxidation but not in fatty acid biosynthesis?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 109, printed page 102, printed question 15, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Cobalamine

## explanation_a
Incorrect. Cobalamin (B12) is the coenzyme for methylmalonyl-CoA mutase, so it acts on the three-carbon tail of an odd-chain fatty acid *after* β-oxidation has finished — and its other major role, the methionine synthase reaction, is not lipid metabolism at all. It is not a cofactor of the oxidation spiral itself.

## answer_b
Pantothenic acid

## explanation_b
Incorrect, and it is the trap for a student who stops at "is this vitamin involved in fatty acid metabolism?" rather than reading the second half of the stem. Pantothenic acid becomes coenzyme A, which is used by **both** pathways: oxidation runs on acyl-CoA and acetyl-CoA, and synthesis runs on acetyl-CoA and malonyl-CoA. The question asks for a vitamin used in one and not the other.

## answer_c
Pyridoxamine

## explanation_c
Incorrect. Pyridoxine and its relatives become pyridoxal phosphate, the coenzyme of transamination and of glycogen phosphorylase. Neither pathway of fatty acid metabolism uses it.

## answer_d
Riboflavin

## explanation_d
Correct. Riboflavin becomes **FAD**, and the acyl-CoA dehydrogenase step at the start of every β-oxidation turn is the only flavoprotein reaction in either pathway. Fatty acid synthesis reduces its intermediates with **NADPH**, which is derived from niacin, not riboflavin. The asymmetry is deliberate and worth holding as a rule: catabolism reduces FAD and NAD⁺, anabolism spends NADPH, and keeping the two currencies apart is what lets the cell run both pathways in the same cell without a futile cycle.

## topic
Lipid metabolism

## subtopic
Cofactors of lipid metabolism

## main_concept
CON-FND-4C05D459E80AEF

## concept_ids
CON-FND-84BDACCA71AF45

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
47

## exam_relevance
7

## clinical_relevance
0.35

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Identify the vitamin-derived cofactor unique to fatty acid oxidation, and contrast the redox currencies of oxidation and synthesis.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 102 (file page 109), question 15; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p109-q15, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 15 is D, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-FFFD8DD83CFD

## title
Carboxylation of acetyl-CoA to malonyl-CoA takes place in the presence of which of the following?

## question
Carboxylation of acetyl-CoA to malonyl-CoA takes place in the presence of which of the following?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 109, printed page 102, printed question 16, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
FAD

## explanation_a
Incorrect. FAD is a hydrogen acceptor in oxidation reactions — it takes electrons away. Carboxylation adds a CO₂ group and involves no change in oxidation state of the kind FAD mediates.

## answer_b
Biotin

## explanation_b
Correct. **Every carboxylase in this course runs on biotin**, and acetyl-CoA carboxylase is one of the three the department book names: pyruvate carboxylase (pyruvate to oxaloacetate), acetyl-CoA carboxylase (acetyl-CoA to malonyl-CoA) and propionyl-CoA carboxylase (propionyl-CoA to methylmalonyl-CoA). Biotin is the arm that carries CO₂ to the substrate, and the reaction costs one ATP. Learning the rule *carboxylase means biotin* answers this question and the two that follow it without any further memorising — and it also explains why raw egg white, whose avidin binds biotin, impairs fatty acid synthesis.

## answer_c
NAD

## explanation_c
Incorrect. NAD⁺ is the electron acceptor of dehydrogenase reactions. Naming it here usually means the student has read "-CoA" and reached for the commonest cofactor rather than asking what the reaction actually does to the molecule.

## answer_d
Lipoate

## explanation_d
Incorrect. Lipoate is a cofactor of the oxidative decarboxylation complexes — pyruvate dehydrogenase and α-ketoglutarate dehydrogenase. Note that it works in the opposite direction: those complexes *remove* CO₂, while a carboxylase adds it.

## topic
Lipid metabolism

## subtopic
Synthesis of fatty acids

## main_concept
CON-FND-2F3A652B8E3104

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
70

## exam_relevance
8

## clinical_relevance
0.3

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## question_only_for

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids

## learning_objective
State the cofactor required by acetyl-CoA carboxylase and generalise it to the other carboxylases on the syllabus.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 102 (file page 109), question 16; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p109-q16, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 16 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-200080A26C25

## title
This is due to which of the following?

## question
This is due to which of the following?

## vignette
An individual with biotin deficiency is shown to produce fatty acids at a greatly reduced rate, in the absence of supplements.

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 109, printed page 102, printed question 17, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Low activity of citrate lyase

## explanation_a
Incorrect. ATP-citrate lyase splits cytosolic citrate back into oxaloacetate and acetyl-CoA. It is a lyase, it adds no CO₂, and it needs no biotin — so a biotin deficiency leaves it working normally.

## answer_b
Reduced activity of malic enzyme

## explanation_b
Incorrect. Malic enzyme oxidatively decarboxylates malate to pyruvate and generates NADPH. It **removes** CO₂ rather than adding it and does not use biotin. Students who know malic enzyme belongs to lipogenesis but not what it does chemically pick this.

## answer_c
Defective acyl carrier protein

## explanation_c
Incorrect. Acyl carrier protein is the swinging arm within fatty acid synthase, and its prosthetic group is 4′-phosphopantetheine — derived from **pantothenic acid**, not biotin. This is the sharpest distractor on the item, because it is a genuine vitamin-derived cofactor of fatty acid synthesis; it is simply the wrong vitamin.

## answer_d
Reduced ability to form malonyl-CoA

## explanation_d
Correct. Biotin is the CO₂-carrying prosthetic group of **acetyl-CoA carboxylase**, the enzyme that converts acetyl-CoA to malonyl-CoA. Malonyl-CoA is the two-carbon donor that fatty acid synthase uses for every elongation step — synthesis of palmitate needs seven malonyl-CoA and one acetyl-CoA — so if malonyl-CoA cannot be made, the pathway has no building block and stops at its first committed step. Because acetyl-CoA carboxylase is also the rate-limiting enzyme of lipogenesis, a biotin deficiency shows up as reduced fatty acid production before it shows up anywhere else in this pathway.

## topic
Lipid metabolism

## subtopic
Synthesis of fatty acids

## main_concept
CON-FND-2F3A652B8E3104

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.6

## setting
Academic

## reasoning_level
3

## inferred_difficulty
55

## exam_relevance
7

## clinical_relevance
0.45

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## question_only_for

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids

## learning_objective
Trace a biotin deficiency to the specific reaction of lipogenesis it blocks, and separate biotin from the pantothenate-derived cofactor in the same pathway.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 102 (file page 109), question 17; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
80

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p109-q17, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 17 is D, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-0937FC2890D4

## title
Which of the following is required as a reductant in fatty acid synthesis?

## question
Which of the following is required as a reductant in fatty acid synthesis?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 109, printed page 102, printed question 18, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
NADH

## explanation_a
Incorrect, and one letter is the whole difference. NADH is the product of catabolic dehydrogenations and its destination is the respiratory chain, where it is reoxidised to make ATP. The cell keeps NADH mostly oxidised and NADPH mostly reduced precisely so that a single cell can run oxidation and synthesis at once without them cancelling out.

## answer_b
NADPH

## explanation_b
Correct. Fatty acid synthase reduces its growing chain twice per elongation cycle and both reductions use **NADPH**. Building palmitate takes **14 NADPH**, and the department book names the two sources: the hexose monophosphate (pentose phosphate) pathway, and malic enzyme, which decarboxylates malate to pyruvate as the citrate shuttle returns carbon to the mitochondrion. That is also why lipogenesis and the HMP pathway are both stimulated by insulin — the cell turns on the supply and the demand together.

## answer_c
Glutathione

## explanation_c
Incorrect. Glutathione is a reducing agent, but its job is antioxidant defence: glutathione peroxidase uses it to destroy hydrogen peroxide, and glutathione reductase regenerates it using NADPH. It is a consumer of NADPH, not a substitute for it in biosynthesis.

## answer_d
Vitamin C

## explanation_d
Incorrect. Vitamin C is a water-soluble antioxidant and a cofactor for hydroxylases — collagen prolyl hydroxylase, and 7α-hydroxylase in bile acid synthesis. It plays no part in reducing the fatty acid chain.

## topic
Lipid metabolism

## subtopic
Synthesis of fatty acids

## main_concept
CON-FND-4C05D459E80AEF

## concept_ids
CON-FND-2F3A652B8E3104

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
2

## inferred_difficulty
73

## exam_relevance
8

## clinical_relevance
0.3

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## question_only_for

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids

## learning_objective
Name the reductant of fatty acid synthesis and state where the cell obtains it.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 102 (file page 109), question 18; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p109-q18, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 18 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-D2CECA36A170

## title
What is the key enzyme of fatty acid synthesis?

## question
What is the key enzyme of fatty acid synthesis?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 109, printed page 102, printed question 19, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Citrate synthase

## explanation_a
Incorrect. Citrate synthase condenses acetyl-CoA with oxaloacetate inside the mitochondrion. It does contribute to lipogenesis indirectly, because the citrate it makes is what carries acetyl units to the cytosol — but it is the key enzyme of the **citric acid cycle**, and its regulation answers a different question.

## answer_b
Fatty acid synthase

## explanation_b
Incorrect, and it is the near-miss that makes this item worth setting. Fatty acid synthase does most of the chemistry — it is a multienzyme complex of two identical chains carrying seven activities, and it turns out palmitate. But doing the most work is not the same as setting the rate. FAS is not the regulated step; it is the machine downstream of the regulated step.

## answer_c
Acetyl CoA carboxylase

## explanation_c
Correct. **Acetyl-CoA carboxylase** catalyses the first committed, rate-limiting reaction of lipogenesis, making malonyl-CoA from acetyl-CoA, and it is where every control signal converges. It is activated by dephosphorylation and inactivated by phosphorylation; insulin activates it in the fed state while glucagon and adrenaline inactivate it in fasting; and it is allosterically inhibited by its own downstream products, malonyl-CoA and palmitoyl-CoA. The general rule this illustrates — that the key enzyme is the first committed and most heavily regulated step, not the busiest one — is worth carrying to every pathway in the course.

## answer_d
HMG CoA reductase

## explanation_d
Incorrect. HMG-CoA reductase is the rate-limiting enzyme of **cholesterol** synthesis. It is regulated in a strikingly similar way, which is exactly why it gets offered here; but cholesterol and fatty acids are different products of the same starting material.

## topic
Lipid metabolism

## subtopic
Synthesis of fatty acids

## main_concept
CON-FND-2F3A652B8E3104

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
2

## inferred_difficulty
68

## exam_relevance
9

## clinical_relevance
0.3

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## question_only_for

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids

## learning_objective
Identify the rate-limiting enzyme of lipogenesis and explain why it, rather than fatty acid synthase, is the regulated step.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 102 (file page 109), question 19; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p109-q19, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 19 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-8D6A58E75768

## title
Adipose tissue can synthesise triacylglycerol only when glucose is available, because it is deficient in which enzyme?

## question
Adipose tissue can synthesise triacylglycerol only when glucose is available, because it is deficient in which enzyme?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 110, printed page 103, printed question 20, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Hormone-sensitive lipase

## explanation_a
Incorrect, and it is the opposite of the truth. Hormone-sensitive lipase is abundant in adipose tissue — it is the enzyme that defines the tissue's catabolic function, releasing fatty acids from stored triacylglycerol under the control of the anti-insulin hormones. Adipose tissue is the one place it matters most.

## answer_b
Glycerol kinase

## explanation_b
Correct. Esterifying a fatty acid requires **glycerol-3-phosphate**, and there are only two ways to get it. Liver, kidney and intestinal mucosa phosphorylate free glycerol directly using **glycerol kinase**; adipose tissue lacks that enzyme, so its only route is to reduce dihydroxyacetone phosphate, an intermediate of glycolysis. That makes adipose triacylglycerol synthesis strictly dependent on a supply of glucose and on the insulin that lets glucose in through GLUT-4. The same missing enzyme explains a second fact worth pairing with it: when adipose triacylglycerol is broken down the glycerol released cannot be reused locally, so it leaves the fat cell and travels to the liver — which is why plasma glycerol is a marker of lipolysis.

## answer_c
Glycerol-3-phosphate dehydrogenase

## explanation_c
Incorrect. Glycerol-3-phosphate dehydrogenase is the enzyme adipose tissue actually **uses**, reducing dihydroxyacetone phosphate to glycerol-3-phosphate. If it were missing the tissue could not make triacylglycerol from glucose either, and the dependence described in the stem would not exist.

## answer_d
Phosphofructokinase-1

## explanation_d
Incorrect. PFK-1 is the key regulatory enzyme of glycolysis and is present in adipose tissue. Removing it would block glycolysis altogether rather than producing the specific dependence the stem describes.

## topic
Lipid metabolism

## subtopic
Synthesis of triacylglycerol

## main_concept
CON-FND-6B469645AE7DBC

## concept_ids
CON-FND-69437CF1F5CCC0

## contextual_concept_ids

## difficulty
Moderate

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
56

## exam_relevance
8

## clinical_relevance
0.4

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## question_only_for

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids

## learning_objective
Explain why adipose triacylglycerol synthesis depends on glucose, from the enzyme the tissue lacks.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 103 (file page 110), question 20; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p110-q20, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 20 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-8BDE6D5B2B8A

## title
NADPH is generated by the action of which one of the following enzymes?

## question
NADPH is generated by the action of which one of the following enzymes?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 110, printed page 103, printed question 21, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Pyruvate dehydrogenase

## explanation_a
Incorrect. Pyruvate dehydrogenase decarboxylates pyruvate to acetyl-CoA and reduces **NAD⁺**, not NADP⁺. It is an irreversible mitochondrial step and its product feeds the citric acid cycle.

## answer_b
Malic enzyme

## explanation_b
Correct. Malic enzyme oxidatively decarboxylates malate to pyruvate in the cytosol and reduces **NADP⁺ to NADPH**. Its place in the story matters as much as the reaction: as the citrate shuttle delivers acetyl units to the cytosol, the oxaloacetate left behind is reduced to malate and then run through malic enzyme on its way back to the mitochondrion — so the same shuttle that supplies the carbon for lipogenesis also supplies part of the reducing power. The department book names two sources of NADPH for fatty acid synthesis: the HMP pathway, and this enzyme.

## answer_c
Succinate dehydrogenase

## explanation_c
Incorrect. Succinate dehydrogenase is the only citric acid cycle enzyme embedded in the inner mitochondrial membrane, and it reduces **FAD**. It is Complex II of the respiratory chain and is nowhere near NADP⁺.

## answer_d
Malate dehydrogenase

## explanation_d
Incorrect, and the one-word difference from the right answer is the trap. Malate **dehydrogenase** interconverts malate and oxaloacetate using NAD⁺/NADH; malic **enzyme** decarboxylates malate to pyruvate using NADP⁺/NADPH. Both act on malate, both appear on the citrate shuttle diagram, and only one makes NADPH.

## topic
Lipid metabolism

## subtopic
Synthesis of fatty acids

## main_concept
CON-FND-4C05D459E80AEF

## concept_ids
CON-FND-FCFC1B5A95695E

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
2

## inferred_difficulty
54

## exam_relevance
7

## clinical_relevance
0.25

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## question_only_for

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids

## learning_objective
Name a cytosolic enzyme that generates NADPH for lipogenesis and distinguish it from malate dehydrogenase.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 103 (file page 110), question 21; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p110-q21, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 21 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-45CD72C26A4A

## title
The acetyl-CoA required for cytosolic fatty acid synthesis is produced by:

## question
The acetyl-CoA required for cytosolic fatty acid synthesis is produced by:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 110, printed page 103, printed question 22, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Thiokinase

## explanation_a
Incorrect. Thiokinase is another name for acyl-CoA synthetase, the enzyme that activates a **free fatty acid** to acyl-CoA. It produces acyl-CoA, not acetyl-CoA, and it belongs to the catabolic side of the pathway.

## answer_b
Citrate lyase

## explanation_b
Correct. Acetyl-CoA is made in the mitochondrial matrix by pyruvate dehydrogenase, but the inner mitochondrial membrane will not let it out. The cell solves this with the **citrate shuttle**: acetyl-CoA condenses with oxaloacetate to form citrate, citrate is carried to the cytosol on a specific transporter, and **ATP-citrate lyase** splits it there back into acetyl-CoA and oxaloacetate. The oxaloacetate is reduced to malate and returned, generating NADPH through malic enzyme on the way. Two things follow that are worth holding: the acetyl group never crosses the membrane as acetyl-CoA, and the shuttle is one of the insulin-activated steps of lipogenesis.

## answer_c
Thiolase

## explanation_c
Incorrect. Thiolase (β-ketothiolase) is the fourth enzyme of each β-oxidation turn, cleaving 3-ketoacyl-CoA to release acetyl-CoA. It does generate acetyl-CoA — but in the **mitochondrion**, from fatty acid breakdown, which is the reverse of what the stem asks about. This is the sharpest distractor for a student who has read only the product and not the compartment.

## answer_d
Citrate synthase

## explanation_d
Incorrect, and it is the other half of the shuttle. Citrate **synthase** makes citrate inside the mitochondrion; citrate **lyase** breaks it apart in the cytosol. Choosing the synthase names the step that loads the shuttle rather than the one that unloads it, and the acetyl-CoA is only released by the second.

## topic
Lipid metabolism

## subtopic
Synthesis of fatty acids

## main_concept
CON-FND-FCFC1B5A95695E

## concept_ids
CON-FND-2F3A652B8E3104

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
8

## clinical_relevance
0.25

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## question_only_for

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids

## learning_objective
Describe how acetyl-CoA reaches the cytosol for lipogenesis and name the enzyme that releases it there.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 103 (file page 110), question 22; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p110-q22, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 22 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-399A9B580D4F

## title
Depot fat of mammalian cells is composed mostly of:

## question
Depot fat of mammalian cells is composed mostly of:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 110, printed page 103, printed question 23, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Phospholipids

## explanation_a
Incorrect, and it is the intended contrast. Phospholipids are the main component of **tissue fat** — the structural lipid present in every cell, built into membranes and organelles, constant in amount and not drawn on for energy. Depot fat is the other column of that comparison entirely.

## answer_b
Triacylglycerol

## explanation_b
Correct. Depot fat is the storage lipid of adipose tissue and it is almost entirely **triacylglycerol**, rich in saturated fatty acids, variable in amount, increasing with overfeeding and falling with fasting. Triacylglycerol is the right molecule for storage because it is anhydrous and highly reduced: one gram yields about 9.3 kcal, more than twice what a gram of carbohydrate or protein gives. Learn depot fat and tissue fat as a four-row comparison — site, function, composition, and response to diet — because the examiner sets them against each other.

## answer_c
Sphingolipids

## explanation_c
Incorrect. Sphingolipids are membrane and nervous-tissue lipids, structural rather than stored, and they are a minor component even of tissue fat.

## answer_d
Cholesterol

## explanation_d
Incorrect. Cholesterol is a membrane constituent and the precursor of steroid hormones, vitamin D and bile acids. It is stored to some extent as cholesteryl ester, but it is not what fills an adipocyte.

## topic
Lipid metabolism

## subtopic
Tissue fat and depot fat

## main_concept
CON-FND-69437CF1F5CCC0

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
82

## exam_relevance
7

## clinical_relevance
0.3

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Introduction to Lipid Metabolism

## question_only_for

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids

## learning_objective
State the dominant lipid of depot fat and contrast depot fat with tissue fat on site, function and composition.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 103 (file page 110), question 23; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p110-q23, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 23 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-6508ABC43C89

## title
The primary site of triacylglycerol synthesis is the:

## question
The primary site of triacylglycerol synthesis is the:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 110, printed page 103, printed question 24, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Liver

## explanation_a
Correct. The **liver** is the principal site of triacylglycerol synthesis, and the arrangement makes sense once the export route is included: the liver esterifies fatty acids into triacylglycerol, packages it into VLDL, and ships it to extrahepatic tissues. Adipose tissue also esterifies fatty acids, but it does so for local storage and only when glucose is available, because it lacks glycerol kinase. The clinical corollary is the one examined most often — if VLDL cannot be made or exported, the triacylglycerol the liver has synthesised stays where it is, and the result is a fatty liver.

## answer_b
Kidney

## explanation_b
Incorrect. The kidney does possess glycerol kinase and can esterify fatty acids, and in prolonged starvation it becomes an important site of gluconeogenesis. But it is not a major exporter of triacylglycerol and is not the primary synthetic site.

## answer_c
Muscles

## explanation_c
Incorrect. Skeletal muscle oxidises fatty acids for energy and holds only small intramuscular lipid droplets. It is a consumer of triacylglycerol, not a manufacturer of it.

## answer_d
Brain

## explanation_d
Incorrect, and it is the option that should be discarded fastest. Fatty acids travel bound to albumin and cannot cross the blood–brain barrier, so the brain neither takes up plasma fatty acids for energy nor builds depot fat. That is precisely why the brain must fall back on ketone bodies in starvation.

## topic
Lipid metabolism

## subtopic
Synthesis of triacylglycerol

## main_concept
CON-FND-69437CF1F5CCC0

## concept_ids
CON-GIT-33EAF87333AAD5

## contextual_concept_ids

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

## exam_relevance
7

## clinical_relevance
0.45

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## question_only_for

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids

## learning_objective
Name the primary site of triacylglycerol synthesis and connect it to the lipoprotein that exports the product.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 103 (file page 110), question 24; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p110-q24, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 24 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-1533B9841ABF

## title
Lipolysis is inhibited by which of the following?

## question
Lipolysis is inhibited by which of the following?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 110, printed page 103, printed question 25, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Starvation

## explanation_a
Incorrect. Starvation is the state lipolysis exists for. Insulin falls, glucagon and the other anti-insulin hormones rise, protein kinase A phosphorylates hormone-sensitive lipase into its active form, and fatty acids pour out of adipose tissue to fuel the rest of the body.

## answer_b
High carbohydrate feeding

## explanation_b
Correct. A carbohydrate meal raises blood glucose, which raises **insulin**, and insulin is the only hormone that switches lipolysis off. It does so by two named mechanisms in the department book: it stimulates phosphodiesterase, which destroys cAMP so that protein kinase A is never activated; and it activates lipase phosphatase, which dephosphorylates hormone-sensitive lipase into its inactive form. In the same fed state insulin is simultaneously turning lipogenesis on. The single idea to carry is that insulin and the anti-insulin hormones pull the identical switch in opposite directions, and that switch is the phosphorylation state of hormone-sensitive lipase.

## answer_c
Stress

## explanation_c
Incorrect. Stress releases adrenaline from the adrenal medulla, which activates adenylyl cyclase, raises cAMP and therefore **stimulates** lipolysis. Cortisol, also released in stress, increases synthesis of hormone-sensitive lipase and works the same way.

## answer_d
Severe muscular exercise

## explanation_d
Incorrect. Severe exercise demands fuel and mobilises it: adrenaline rises, insulin falls, and lipolysis accelerates. A student who picks this has read "exercise burns fat" as "exercise stops fat release", which is backwards.

## topic
Lipid metabolism

## subtopic
Regulation of lipolysis

## main_concept
CON-FND-1C668119B3C0BB

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
76

## exam_relevance
8

## clinical_relevance
0.45

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## question_only_for

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids

## learning_objective
Name the only hormone that inhibits lipolysis and state the two mechanisms by which it does so.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 103 (file page 110), question 25; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p110-q25, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 25 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-0E65E45E33B3

## title
Hepatic lipogenesis is stimulated by:

## question
Hepatic lipogenesis is stimulated by:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 110, printed page 103, printed question 26, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
AMP

## explanation_a
Incorrect. A high AMP level is the cell's signal that it is short of energy, and it does the opposite of what the stem asks: AMP-activated protein kinase phosphorylates and thereby inactivates acetyl-CoA carboxylase, while high AMP stimulates fatty acid oxidation. Building fat when the cell is running out of ATP would be self-defeating.

## answer_b
Epinephrine

## explanation_b
Incorrect. Adrenaline is an anti-insulin hormone of the fasting and stress response. It raises cAMP, activates protein kinase A, inactivates acetyl-CoA carboxylase and switches on lipolysis. It empties fat stores rather than filling them.

## answer_c
Glucagon

## explanation_c
Incorrect, and it is the mirror image of the right answer. Glucagon inactivates acetyl-CoA carboxylase and represses the HMG-CoA reductase gene; it is the hormone of the fasted liver, and no anabolic lipid pathway runs under it.

## answer_d
Insulin

## explanation_d
Correct. **Insulin** is the hormone of the fed state and it turns on lipogenesis at every step at once — the department book marks five of them on its own citrate-shuttle diagram. Insulin stimulates glycolysis so that pyruvate is made; pyruvate dehydrogenase so that pyruvate becomes acetyl-CoA; ATP-citrate lyase so that citrate is split in the cytosol; acetyl-CoA carboxylase, by activating the phosphatase that dephosphorylates it, so that malonyl-CoA is formed; and the expression of fatty acid synthase itself. It also stimulates the HMP dehydrogenases, supplying the NADPH the pathway spends. Turning on substrate supply, the rate-limiting enzyme and the reducing power together is what makes insulin the single answer to almost every "what stimulates this anabolic pathway" question in this chapter.

## topic
Lipid metabolism

## subtopic
Regulation of lipogenesis

## main_concept
CON-FND-1C668119B3C0BB

## concept_ids
CON-FND-2F3A652B8E3104

## contextual_concept_ids

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
78

## exam_relevance
8

## clinical_relevance
0.4

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## question_only_for

## library_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## resource_ids

## learning_objective
Identify the hormone that stimulates hepatic lipogenesis and list the steps of the pathway it acts on.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 103 (file page 110), question 26; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p110-q26, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
The extraction recorded correct: null with correctSource "printed key (p114) read differently by different OCR passes (a/d)". The printed answer key on file page 114 (printed 107) was opened with the Read tool and read visually: item 26 is D. Recovered, not inferred.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-0079E108BA88

## title
Insulin enhances the uptake of triacylglycerol into adipose tissue. Which enzyme does it activate to make that uptake possible?

## question
Insulin enhances the uptake of triacylglycerol into adipose tissue. Which enzyme does it activate to make that uptake possible?

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 111, printed page 104, printed question 27, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Hormone-sensitive lipase

## explanation_a
Incorrect, and it is exactly the wrong direction. Hormone-sensitive lipase acts **inside** the adipocyte to break stored triacylglycerol down, and insulin **inhibits** it. Confusing the two lipases is the single commonest error in this chapter; the discriminator is where each one works — lipoprotein lipase faces the blood on the capillary endothelium, hormone-sensitive lipase works within the fat cell.

## answer_b
Lipoprotein lipase

## explanation_b
Correct. Triacylglycerol cannot be taken up whole. **Lipoprotein lipase**, anchored to the endothelium of capillaries in adipose tissue and other extrahepatic tissues, hydrolyses the triacylglycerol carried in chylomicrons and VLDL into free fatty acids and glycerol; only then can the fatty acids enter the adipocyte and be re-esterified for storage. Insulin induces the enzyme, which is why a meal both fills fat stores and clears the plasma of triacylglycerol-rich lipoproteins. Its activator is **apo C-II**, donated to the particle by HDL. The clinical mirror image is worth pairing with it: in insulin deficiency lipoprotein lipase activity falls, clearance fails, and plasma triacylglycerol rises.

## answer_c
LCAT

## explanation_c
Incorrect. LCAT esterifies free cholesterol on HDL to cholesteryl ester, converting discoidal HDL into the spherical form. It is part of reverse cholesterol transport, works on cholesterol rather than triacylglycerol, and has nothing to do with adipose uptake.

## answer_d
Apo C-I

## explanation_d
Incorrect on two counts: apo C-**II**, not C-I, is the relevant apolipoprotein, and it is a cofactor rather than an enzyme. The stem asks which *enzyme* is activated, and an apolipoprotein cannot be the answer to that.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## main_concept
CON-GIT-6CB618DBA50596

## concept_ids
CON-FND-1C668119B3C0BB

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
60

## exam_relevance
9

## clinical_relevance
0.6

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## question_only_for

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids

## learning_objective
Name the enzyme that allows lipoprotein triacylglycerol to be taken up by adipose tissue, and distinguish it from hormone-sensitive lipase.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 104 (file page 111), question 27; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p111-q27, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 27 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-8EDDA8B52780

## title
One of the following is an inhibitor of the cyclooxygenase enzyme:

## question
One of the following is an inhibitor of the cyclooxygenase enzyme:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 111, printed page 104, printed question 28, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Aspirin

## explanation_a
Correct. Arachidonic acid, a 20-carbon polyunsaturated fatty acid released from membrane phospholipid, is the precursor of the eicosanoids, and it can go down two routes. The **cyclooxygenase** route makes prostaglandins and thromboxanes; the lipoxygenase route makes leukotrienes. **Aspirin** inhibits cyclooxygenase, so it blocks prostaglandin and thromboxane synthesis while leaving the leukotriene arm untouched — which is why it relieves pain, fever and platelet aggregation but can worsen asthma, by leaving arachidonic acid to be shunted down the lipoxygenase side.

## answer_b
Singulair

## explanation_b
Incorrect, and it is the useful distractor because it acts on the same precursor. Montelukast (Singulair) is a **leukotriene receptor antagonist**, so it works on the lipoxygenase arm and downstream of synthesis altogether. It blocks the receptor, not the enzyme.

## answer_c
Statins

## explanation_c
Incorrect. Statins are competitive inhibitors of **HMG-CoA reductase**, the rate-limiting enzyme of cholesterol synthesis. They are structural analogues of HMG-CoA and are used for hypercholesterolaemia; cholesterol and eicosanoids are separate branches of lipid metabolism.

## answer_d
Steroids

## explanation_d
Incorrect, though the reasoning behind it is nearly right. Glucocorticoids do suppress eicosanoid production, but they act **upstream** by inhibiting phospholipase A₂, so arachidonic acid is never released in the first place and both arms are shut down. The stem asks specifically for a cyclooxygenase inhibitor.

## topic
Lipid metabolism

## subtopic
Eicosanoids

## main_concept
CON-FND-90496D64322904

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Pharmacology

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
74

## exam_relevance
6

## clinical_relevance
0.75

## academic_relevance
0.7

## exam_weight_by_year
KAU_Y1=0.45

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism

## question_only_for

## library_ids
ART-103-BIO-EICOSANOIDS

## resource_ids

## learning_objective
Name the enzyme aspirin inhibits and place it on the branch of eicosanoid synthesis it controls.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 104 (file page 111), question 28; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p111-q28, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 28 is A, agreeing with the extraction.
OCR repair: Option b was extracted as "Singular"; the drug is Singulair (montelukast) and the option is written that way here. This is a spelling repair of an OCR result, not a change of meaning.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
The 103 department biochemistry book contains no eicosanoid, prostaglandin, thromboxane or cyclooxygenase material anywhere in its 160 pages — searched for all four terms in the cached page text. This question is evidenced from the question book only, and the concept it tests is flagged for the faculty reviewer as material the question book examines and the department textbook does not carry. module_subject therefore stops at "Lipid Metabolism" rather than naming a chapter section that does not exist. The stem's option "Singular" is repaired to "Singulair".

---

# Item

## id
QM-103-AA59561792E3

## title
Eicosanoids include which of the following compounds?

## question
Eicosanoids include which of the following compounds?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 111, printed page 104, printed question 29, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Ganglioside

## explanation_a
Incorrect. A ganglioside is a glycosphingolipid — a ceramide backbone carrying an oligosaccharide chain with sialic acid — and it is a membrane component concentrated in nervous tissue. It is a structural lipid, not a signalling derivative of arachidonic acid.

## answer_b
Choline

## explanation_b
Incorrect. Choline is a nitrogenous base and the head group of phosphatidylcholine (lecithin). It is a component of a phospholipid, and phospholipid is the reservoir arachidonic acid is released *from* — but choline itself is not an eicosanoid.

## answer_c
Thromboxane

## explanation_c
Correct. The eicosanoids are the twenty-carbon signalling lipids derived from arachidonic acid: **prostaglandins, thromboxanes and prostacyclin** from the cyclooxygenase pathway, and **leukotrienes** from the lipoxygenase pathway. Thromboxane, made by platelets, promotes platelet aggregation and vasoconstriction — which is the reason a cyclooxygenase inhibitor such as aspirin has an antiplatelet effect. The word itself is the mnemonic: *eicosa* is Greek for twenty, so any answer that is not a twenty-carbon fatty acid derivative can be discarded at once.

## answer_d
Ceramide

## explanation_d
Incorrect. Ceramide is sphingosine with a fatty acid attached, and it is the core of every sphingolipid. Like the ganglioside above it belongs to the membrane lipids, and it is offered here to catch a student sorting by "sounds like a lipid" rather than by carbon skeleton.

## topic
Lipid metabolism

## subtopic
Eicosanoids

## main_concept
CON-FND-90496D64322904

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
70

## exam_relevance
6

## clinical_relevance
0.5

## academic_relevance
0.75

## exam_weight_by_year
KAU_Y1=0.45

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism

## question_only_for

## library_ids
ART-103-BIO-EICOSANOIDS

## resource_ids

## learning_objective
Recognise the members of the eicosanoid family and separate them from the sphingolipids and phospholipid head groups.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 104 (file page 111), question 29; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p111-q29, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 29 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
As with the previous item, no eicosanoid material appears in the 103 department biochemistry book; the source is the question book alone. Flagged for the faculty reviewer.

---

# Item

## id
QM-103-66D1EC8C4723

## title
One of the following is NOT a ketone body:

## question
One of the following is NOT a ketone body:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 111, printed page 104, printed question 30, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Acetoacetate

## explanation_a
This is a ketone body, so it is not the answer. Acetoacetate is the first one formed, released when HMG-CoA lyase cleaves HMG-CoA, and it is the ketone body that extrahepatic tissues actually activate and burn.

## answer_b
3-Hydroxybutyrate

## explanation_b
This is a ketone body, so it is not the answer. 3(β)-hydroxybutyrate is made by reducing acetoacetate, a reaction driven by the NADH that heavy β-oxidation generates. It is quantitatively the most abundant of the three in blood, and oxidising it yields one NADH more than acetoacetate does — 21.5 ATP against 19.

## answer_c
Acetyl CoA

## explanation_c
Correct: acetyl-CoA is **not** a ketone body, it is the raw material they are built from. Two acetyl-CoA condense to acetoacetyl-CoA, a third is added by HMG-CoA synthase to give HMG-CoA, and HMG-CoA lyase then releases acetoacetate and returns one acetyl-CoA. Acetyl-CoA is also far too large and too polar to serve the purpose ketone bodies serve: they are small, water-soluble molecules that travel in plasma without albumin or a lipoprotein, which is precisely why peripheral tissues can use them more easily than fatty acids. The three ketone bodies are acetoacetate, 3-hydroxybutyrate and acetone — and only the first two carry useful energy.

## answer_d
Acetone

## explanation_d
This is a ketone body, so it is not the answer, although it is the odd one out among the three. Acetone forms by spontaneous, non-enzymatic decarboxylation of acetoacetate, cannot be metabolised for energy, and is lost in the breath and urine — which is where the fruity smell of severe ketosis comes from.

## topic
Lipid metabolism

## subtopic
Metabolism of ketone bodies

## main_concept
CON-END-2E748A37DA660A

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
76

## exam_relevance
8

## clinical_relevance
0.55

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)

## question_only_for

## library_ids
ART-103-BIO-KETONE-BODY-METABOLISM

## resource_ids

## learning_objective
Name the three ketone bodies and distinguish them from the acetyl-CoA they are synthesised from.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 104 (file page 111), question 30; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p111-q30, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 30 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-8971CF17D4C8

## title
Which one of the following is an anti-ketogenic substance?

## question
Which one of the following is an anti-ketogenic substance?

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 111, printed page 104, printed question 31, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Glycerol

## explanation_a
Correct. The department book divides substances into two lists, and the logic behind the division is worth more than the lists themselves. **Ketogenic** substances are those that raise the ratio of anti-insulin hormones to insulin, or that deliver acetyl-CoA the liver cannot burn: fatty acids, ketogenic amino acids and anti-insulin hormones. **Anti-ketogenic** substances are those that do the reverse — carbohydrates, glucogenic amino acids, insulin, and **glycerol**. Glycerol is anti-ketogenic because it is a gluconeogenic substrate: it enters the liver, is phosphorylated by glycerol kinase, and becomes glucose. That restores oxaloacetate for citrate synthase, so acetyl-CoA can enter the citric acid cycle instead of being diverted into ketone bodies. The trap the question sets is that glycerol arrives at the liver from lipolysis at the same time as the fatty acids do, so it looks like it should be ketogenic by association; its carbon skeleton says otherwise.

## answer_b
Ketogenic amino acids

## explanation_b
Incorrect — these are ketogenic by definition. Ketogenic amino acids are degraded to acetyl-CoA or acetoacetyl-CoA, which cannot be turned into glucose and can be turned into ketone bodies.

## answer_c
Fatty acids

## explanation_c
Incorrect. Fatty acids are the principal ketogenic substance. β-oxidation of the fatty acids arriving at the liver is what supplies the acetyl-CoA that ketogenesis is built from.

## answer_d
Corticosteroid injection

## explanation_d
Incorrect. Corticosteroids are anti-insulin hormones. They stimulate lipolysis and increase the synthesis of hormone-sensitive lipase, raising the anti-insulin to insulin ratio, which is the single condition every cause of ketosis has in common.

## topic
Lipid metabolism

## subtopic
Ketosis

## main_concept
CON-END-CC450A236ABF50

## concept_ids
CON-END-2E748A37DA660A

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
3

## inferred_difficulty
52

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)

## question_only_for

## library_ids
ART-103-BIO-KETOSIS

## resource_ids

## learning_objective
Classify a substance as ketogenic or anti-ketogenic and justify the classification from its effect on hepatic oxaloacetate and on the insulin ratio.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 104 (file page 111), question 31; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p111-q31, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 31 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
main_concept points at the existing 103 concept CON-END-CC450A236ABF50 rather than a new one. The department book prints the ketogenic and anti-ketogenic lists as an N.B. immediately under the KETOSIS heading on file page 72, which is the section that concept was authored from.

---

# Item

## id
QM-103-55F90DD7B64D

## title
Ketogenesis occurs in the mitochondria of the liver because of the presence of:

## question
Ketogenesis occurs in the mitochondria of the liver because of the presence of:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 111, printed page 104, printed question 32, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
HMG-CoA synthase and HMG-CoA lyase

## explanation_a
Correct, and this pair of enzymes is what makes the liver the only organ that can make ketone bodies. **HMG-CoA synthase** adds a third acetyl-CoA to acetoacetyl-CoA to form HMG-CoA, and **HMG-CoA lyase** then cleaves HMG-CoA to release acetoacetate. Both are present chiefly in liver mitochondria. Two comparisons are worth holding alongside this. Cholesterol synthesis also passes through HMG-CoA but does so in the **cytosol** and then uses HMG-CoA reductase, so the compartment is what decides whether HMG-CoA becomes a ketone body or a sterol. And the liver conspicuously **lacks** thiophorase, the enzyme extrahepatic tissues need to activate acetoacetate — which is why the liver makes ketone bodies it cannot itself use.

## answer_b
Thiophorase and ketothiolase

## explanation_b
Incorrect, and it names the utilisation pathway instead of the synthetic one. **Thiophorase** (succinyl-CoA acetoacetate CoA-transferase) is the enzyme of **ketolysis**, and it is precisely the enzyme the liver is deficient in. Ketothiolase does appear in ketogenesis, condensing two acetyl-CoA, but pairing it with thiophorase describes an extrahepatic tissue, not the liver.

## answer_c
HMG-CoA reductase and HMG-CoA lyase

## explanation_c
Incorrect because of the reductase. HMG-CoA **reductase** converts HMG-CoA to mevalonate and is the rate-limiting step of **cholesterol** synthesis, in the cytosol. Putting it in the mitochondrial ketogenesis pathway merges the two fates of HMG-CoA, which is exactly the confusion this option exists to expose.

## answer_d
HMG-CoA synthase and HMG-CoA reductase

## explanation_d
Incorrect for the same reason, and it also drops the lyase — without HMG-CoA lyase no acetoacetate is ever released, so no ketone body is produced at all.

## topic
Lipid metabolism

## subtopic
Ketogenesis

## main_concept
CON-END-2E748A37DA660A

## concept_ids
CON-GIT-3A348EEAF118BD

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.6

## setting
Academic

## reasoning_level
3

## inferred_difficulty
55

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)

## question_only_for

## library_ids
ART-103-BIO-KETONE-BODY-METABOLISM

## resource_ids

## learning_objective
Name the two enzymes that confine ketogenesis to the liver, and explain why HMG-CoA has a different fate in the cytosol.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 104 (file page 111), question 32; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p111-q32, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 32 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-DB06BEE32691

## title
Ketone bodies are of great importance because:

## question
Ketone bodies are of great importance because:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 111, printed page 104, printed question 33, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
They are hydrophobic substances

## explanation_a
Incorrect, and it is the reverse of the property that matters. Ketone bodies are **water-soluble**, and that is the whole point: they dissolve in plasma and need neither albumin nor a lipoprotein to travel, so tissues take them up more easily than fatty acids. Calling them hydrophobic removes the advantage the question is asking about.

## answer_b
They supply more energy than fatty acids

## explanation_b
Incorrect. Gram for gram fatty acids yield considerably more energy — complete oxidation of palmitate gives a net 106 ATP, against 19 for acetoacetate and 21.5 for 3-hydroxybutyrate. Ketone bodies are not a richer fuel; they are a more *accessible* one for tissues that cannot use fatty acids.

## answer_c
They are the only source of energy for erythrocytes during the fed state

## explanation_c
Incorrect on both halves, and it is worth taking apart. Erythrocytes cannot use ketone bodies at all, because ketolysis is mitochondrial and the red cell has no mitochondria — glycolysis is its only source of ATP, in every nutritional state. And "the fed state" is wrong regardless: ketone bodies are a fasting fuel.

## answer_d
They provide energy for extrahepatic tissues including the brain during fasting

## explanation_d
Correct. During fasting and starvation the liver exports ketone bodies to **extrahepatic tissues**, which oxidise them through thiophorase, ketothiolase and the citric acid cycle. The brain is the case that matters most: fatty acids travel bound to albumin and cannot cross the blood–brain barrier, so the brain cannot burn fat directly. After about five to six days of starvation it adapts to take about a third of its energy from ketone bodies, and after several weeks they become its major fuel. The consequence is the reason this is examined so often — by sparing glucose the brain would otherwise consume, ketone bodies reduce the need for gluconeogenesis and therefore slow the breakdown of muscle protein, which is what determines how long a starving person survives.

## topic
Lipid metabolism

## subtopic
Importance of ketone bodies

## main_concept
CON-END-2E748A37DA660A

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
64

## exam_relevance
9

## clinical_relevance
0.6

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)

## question_only_for

## library_ids
ART-103-BIO-KETONE-BODY-METABOLISM

## resource_ids

## learning_objective
State why ketone bodies matter during fasting, and connect their water solubility to the tissues that can use them.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 104 (file page 111), question 33; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p111-q33, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 33 is D, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-510806E5AB42

## title
One of the following conditions leads to ketosis:

## question
One of the following conditions leads to ketosis:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 112, printed page 105, printed question 34, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Severe uncontrolled diabetes mellitus

## explanation_a
Correct, and it is the most severe member of a list whose members all share one mechanism. Ketosis occurs whenever the rate of ketogenesis exceeds the rate of ketolysis, and the department book's causes are starvation, a low-carbohydrate high-fat diet, **severe uncontrolled diabetes mellitus**, prolonged administration of anti-insulin hormones, and prolonged severe muscular exercise. Every one of them is a state of raised **anti-insulin to insulin ratio**. In uncontrolled diabetes the ratio is extreme: lipolysis floods the liver with fatty acids, β-oxidation generates acetyl-CoA faster than the citric acid cycle can take it, and gluconeogenesis drains the oxaloacetate that citrate synthase would need — so acetyl-CoA is diverted into ketone bodies. Because acetoacetate and 3-hydroxybutyrate are acids, the result is a metabolic acidosis that can end in coma and death.

## answer_b
Prolonged administration of insulin hormone

## explanation_b
Incorrect, and it is the exact opposite. Insulin is anti-ketogenic. It suppresses lipolysis, so fewer fatty acids reach the liver, and it promotes glucose oxidation and glycogen storage. Giving insulin is how diabetic ketoacidosis is reversed.

## answer_c
High carbohydrate diet

## explanation_c
Incorrect. Carbohydrates are anti-ketogenic. A high-carbohydrate diet raises insulin, supplies oxaloacetate through pyruvate carboxylase, and keeps acetyl-CoA moving into the citric acid cycle rather than into ketogenesis.

## answer_d
Low fat diet

## explanation_d
Incorrect, and the trap is that it sounds like the low-carbohydrate diet that *does* cause ketosis. What matters is not the absolute amount of fat but the ratio: ketosis is driven by carbohydrate scarcity, and a low-fat diet with adequate carbohydrate keeps insulin high and ketogenesis off.

## topic
Lipid metabolism

## subtopic
Ketosis

## main_concept
CON-END-CC450A236ABF50

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Pathophysiology

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Academic

## reasoning_level
2

## inferred_difficulty
78

## exam_relevance
9

## clinical_relevance
0.75

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)

## question_only_for

## library_ids
ART-103-BIO-KETOSIS

## resource_ids

## learning_objective
Recognise the causes of ketosis and state the single hormonal condition they share.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 105 (file page 112), question 34; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p112-q34, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 34 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
main_concept is the existing 103 concept CON-END-CC450A236ABF50, authored from the 2025 end-of-year paper; this MCQ is a second occurrence of the same idea and is blueprint evidence for it rather than a reason to mint a new concept.

---

# Item

## id
QM-103-B8493FC90DAF

## title
Familial hypercholesterolaemia is a genetic disorder of cholesterol metabolism. The defect lies in the:

## question
Familial hypercholesterolaemia is a genetic disorder of cholesterol metabolism. The defect lies in the:

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 112, printed page 105, printed question 35, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Impairment of uptake of LDL by the liver

## explanation_a
Correct. Familial hypercholesterolaemia is a defect of the **LDL receptor** in the liver and other tissues. Normally about 70% of circulating LDL is cleared by hepatic apo B-100 receptors and 30% by extrahepatic ones; when those receptors are defective, LDL cannot be endocytosed and accumulates in plasma. Two things follow. The plasma cholesterol rises specifically in the LDL fraction, so this is hypercholesterolaemia of the "bad cholesterol" kind, with premature atherosclerosis as the consequence. And the liver, which senses cholesterol through what it takes up, reads its own supply as low and does not switch off HMG-CoA reductase — so endogenous synthesis continues unchecked, which is why the plasma level climbs so high.

## answer_b
Impairment of the cholesterol degradative pathway

## explanation_b
Incorrect, and it rests on a false premise. There is no pathway that degrades the cholesterol ring in humans. Cholesterol is eliminated only by conversion to bile acids and by excretion in bile, so a "degradative pathway" cannot be impaired because it does not exist.

## answer_c
Impairment of uptake of cholesterol by tissues

## explanation_c
Incorrect in emphasis rather than entirely, and it is the closest distractor. Extrahepatic uptake is reduced too, since the same receptor is defective — but the dominant lesion, and the reason plasma LDL rises so steeply, is failure of hepatic clearance, which normally accounts for the large majority of LDL removal.

## answer_d
Impairment of HDL metabolism due to deficiency of Apo-A

## explanation_d
Incorrect. Apo A-I mediates HDL binding to its hepatic receptor and is central to reverse cholesterol transport; a deficiency of it produces a low-HDL disorder, not familial hypercholesterolaemia. This option catches a student who knows apolipoproteins matter in dyslipidaemia but has not attached each one to its particle.

## topic
Lipid metabolism

## subtopic
Disorders of plasma lipoproteins

## main_concept
CON-GIT-8C5125A491B189

## concept_ids
CON-GIT-99EF5E989B0C65

## contextual_concept_ids

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
66

## exam_relevance
9

## clinical_relevance
0.8

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.85

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## question_only_for

## library_ids
ART-103-BIO-PLASMA-LIPOPROTEINS

## resource_ids

## learning_objective
State the molecular defect in familial hypercholesterolaemia and explain why plasma LDL rises rather than another fraction.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 105 (file page 112), question 35; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p112-q35, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 35 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
main_concept is the existing 103 concept CON-GIT-8C5125A491B189, authored from the 2025 end-of-year paper. Nothing new was minted for this item.

---

# Item

## id
QM-103-B757AA6C53B6

## title
Acetyl-CoA is the precursor for cholesterol synthesis, and the pathway is tightly regulated. Which of the following steps is the regulatory step of cholesterol biosynthesis?

## question
Acetyl-CoA is the precursor for cholesterol synthesis, and the pathway is tightly regulated. Which of the following steps is the regulatory step of cholesterol biosynthesis?

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 112, printed page 105, printed question 36, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Formation of HMG-CoA

## explanation_a
Incorrect, and it is the sharpest distractor because the step is real and immediately upstream. HMG-CoA is formed by HMG-CoA synthase from three acetyl-CoA — but this is not the committed step, because HMG-CoA is also the intermediate of ketogenesis. A molecule at a branch point cannot be the commitment; the commitment is the reaction that takes it down one branch and not the other.

## answer_b
Formation of mevalonate by HMG-CoA reductase

## explanation_b
Correct. Reduction of HMG-CoA to **mevalonate by HMG-CoA reductase** is the rate-limiting and first committed step of cholesterol synthesis; it consumes two NADPH and it is irreversible in practical terms. Everything that regulates cholesterol synthesis converges here. The enzyme is active when dephosphorylated and inactive when phosphorylated, with AMP-activated protein kinase doing the phosphorylating; insulin induces the gene and activates the phosphatase, glucagon represses the gene; and cholesterol itself both allosterically inhibits and represses it — a clean example of end-product feedback. It is also the target of the statins, which are structural analogues of HMG-CoA and inhibit it competitively.

## answer_c
Formation of the isoprenoid unit

## explanation_c
Incorrect. Isoprenoid units are formed after mevalonate, on the way to squalene. They are downstream of the regulated step, and regulating a pathway after its committed step would waste everything already invested.

## answer_d
Formation of lanosterol

## explanation_d
Incorrect. Lanosterol is the first sterol formed, produced by cyclisation of squalene late in the sequence and only a few steps from cholesterol itself. It is the last place a cell would choose to exert control.

## topic
Lipid metabolism

## subtopic
Cholesterol metabolism

## main_concept
CON-GIT-3A348EEAF118BD

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
70

## exam_relevance
9

## clinical_relevance
0.55

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Cholesterol Metabolism

## question_only_for

## library_ids
ART-103-BIO-CHOLESTEROL-METABOLISM

## resource_ids

## learning_objective
Identify the rate-limiting step of cholesterol synthesis and explain why the step before it cannot be the committed one.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 105 (file page 112), question 36; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p112-q36, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 36 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-1EBFA2D2FA1A

## title
Identify the correct statement from the following:

## question
Identify the correct statement from the following:

## vignette
Insulin and glucagon regulate HMG-CoA reductase by phosphorylation and dephosphorylation. Phosphorylation of HMG-CoA reductase decreases the activity of the enzyme.

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 112, printed page 105, printed question 37, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Insulin inhibits phosphodiesterase that dephosphorylates HMG CoA reductase

## explanation_a
Incorrect on two separate points, which is what makes it a useful distractor. A **phosphodiesterase** hydrolyses cAMP; it does not remove phosphate from a protein, so it cannot dephosphorylate the reductase. And insulin *stimulates* phosphodiesterase rather than inhibiting it — that is one of the two ways it shuts off lipolysis. The enzyme that dephosphorylates a protein is a phosphatase.

## answer_b
Insulin activates the kinase that phosphorylates HMG CoA reductase

## explanation_b
Incorrect, and it points insulin the wrong way. Phosphorylation inactivates the reductase, as the stem states, so if insulin activated the kinase it would be switching cholesterol synthesis **off** — the opposite of what the fed-state hormone does. Insulin is anabolic throughout this chapter: it turns lipogenesis on, cholesterol synthesis on, and lipolysis off.

## answer_c
Insulin activates the phosphatase that dephosphorylates HMG CoA reductase

## explanation_c
Correct, and it follows directly from the stem if the logic is taken one step at a time. The active form of HMG-CoA reductase is the **dephosphorylated** one. Insulin activates **protein phosphatase**, which removes the phosphate, so the enzyme becomes active and cholesterol synthesis runs — appropriate in the fed state, when substrate is plentiful. Insulin also acts as an inducer of the HMG-CoA reductase gene, while glucagon represses it, so the hormone works at both the covalent and the transcriptional level. The counterpart is AMP-activated protein kinase, which phosphorylates and inactivates the enzyme when the cell is short of energy. The pattern is the same one that governs hormone-sensitive lipase and acetyl-CoA carboxylase, with the practical consequence that "insulin activates the phosphatase" answers a whole family of exam questions.

## answer_d
Glucagon inhibits the kinase that phosphorylates HMG CoA reductase

## explanation_d
Incorrect, and it makes glucagon behave like insulin. Glucagon is the fasting hormone: it represses the reductase gene and, through raised cAMP and protein kinase A, promotes the phosphorylated inactive state. Inhibiting the kinase would leave the enzyme active, which is not what a fasting signal should do.

## topic
Lipid metabolism

## subtopic
Cholesterol metabolism

## main_concept
CON-GIT-3A348EEAF118BD

## concept_ids
CON-FND-1C668119B3C0BB

## contextual_concept_ids

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
4

## inferred_difficulty
45

## exam_relevance
8

## clinical_relevance
0.45

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Cholesterol Metabolism

## question_only_for

## library_ids
ART-103-BIO-CHOLESTEROL-METABOLISM

## resource_ids

## learning_objective
Predict the effect of insulin on HMG-CoA reductase from the enzyme's phosphorylation state, and name the enzyme class insulin acts through.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 105 (file page 112), question 37; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
90

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p112-q37, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 37 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-A3C93FB27711

## title
One of the following is a cause of hypocholesterolaemia:

## question
One of the following is a cause of hypocholesterolaemia:

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 112, printed page 105, printed question 38, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Diabetes mellitus

## explanation_a
Incorrect — diabetes raises cholesterol rather than lowering it, and the department book gives three reasons at once. Increased lipolysis and fatty acid oxidation leave excess acetyl-CoA for cholesterol synthesis; the flood of plasma fatty acids drives hepatic triacylglycerol synthesis and therefore VLDL output; and lipoprotein lipase, which insulin induces, becomes less active, so lipoprotein clearance falls.

## answer_b
Obstructive jaundice

## explanation_b
Incorrect, and it is the option that shows the mechanism most clearly if reasoned through. Cholesterol is eliminated only in bile — as bile salts and as cholesterol itself. Obstruct the biliary tree and the sole exit is blocked, so plasma cholesterol **rises**.

## answer_c
Hyperthyroidism

## explanation_c
Correct. Thyroid hormone stimulates the oxidation of cholesterol and its conversion to bile acids, so it increases the rate at which cholesterol leaves the body. In **hyperthyroidism** that disposal runs fast and the plasma cholesterol falls; in hypothyroidism it runs slowly and the plasma cholesterol rises. The pairing is worth memorising as a single fact with two directions, because examiners set it both ways round, and because the same physiology explains why 7α-hydroxylase — the rate-limiting enzyme of bile acid synthesis, which also requires vitamin C — is described as activated by thyroid hormones.

## answer_d
Obesity

## explanation_d
Incorrect. Obesity is listed among the causes of hypercholesterolaemia, together with a diet rich in saturated fat, carbohydrate and cholesterol.

## topic
Lipid metabolism

## subtopic
Plasma cholesterol

## main_concept
CON-GIT-E6AEB25F31B529

## concept_ids
CON-GIT-3A348EEAF118BD

## contextual_concept_ids

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
7

## clinical_relevance
0.7

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Cholesterol Metabolism

## question_only_for

## library_ids
ART-103-BIO-CHOLESTEROL-METABOLISM

## resource_ids

## learning_objective
Distinguish causes of raised from causes of lowered plasma cholesterol, and explain the thyroid effect through bile acid conversion.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 105 (file page 112), question 38; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p112-q38, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 38 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-C3F9F26E6068

## title
The cofactor apo C-II is needed for the action of which enzyme?

## question
The cofactor apo C-II is needed for the action of which enzyme?

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 113, printed page 106, printed question 39, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Lipoprotein lipase

## explanation_a
Correct. **Apo C-II is the activator of lipoprotein lipase** — the department book gives it as its example of an apolipoprotein acting as an enzyme activator. The arrangement is elegant and examinable: nascent chylomicrons and nascent VLDL leave their tissue of origin without apo C, receive apo C and apo E from HDL in the circulation to become mature particles, and only then can lipoprotein lipase on the capillary endothelium unload their triacylglycerol. HDL is therefore not just a scavenger of cholesterol but the reservoir that makes triacylglycerol clearance possible. As the particle is emptied, apo C is handed back to HDL, and it is that loss which converts VLDL into IDL.

## answer_b
Hormone sensitive lipase

## explanation_b
Incorrect, and it is the intended confusion between the two lipases. Hormone-sensitive lipase works inside the adipocyte and is controlled by phosphorylation through protein kinase A, not by an apolipoprotein — it never meets a lipoprotein particle at all.

## answer_c
Fatty acid synthase

## explanation_c
Incorrect. Fatty acid synthase is a cytosolic multienzyme complex; its own carrier arm is acyl carrier protein with a phosphopantetheine group, and it has no apolipoprotein cofactor.

## answer_d
HMG-CoA reductase

## explanation_d
Incorrect. HMG-CoA reductase is regulated by phosphorylation, by insulin and glucagon, and by cholesterol feedback. No apolipoprotein activates it.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## main_concept
CON-GIT-6CB618DBA50596

## concept_ids
CON-GIT-99EF5E989B0C65

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
2

## inferred_difficulty
70

## exam_relevance
9

## clinical_relevance
0.5

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## question_only_for

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids

## learning_objective
Name the apolipoprotein that activates lipoprotein lipase and describe how the particle acquires it.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 106 (file page 113), question 39; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p113-q39, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 39 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-EB17E8FBF957

## title
Apo B-48 is present in the lipoprotein structure of:

## question
Apo B-48 is present in the lipoprotein structure of:

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 113, printed page 106, printed question 40, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Low density lipoproteins

## explanation_a
Incorrect. LDL carries **apo B-100**, and that is the ligand its receptor recognises. The number is not decoration: B-48 is the intestinal form and B-100 the hepatic one, and reading "apo B" without the suffix is what makes this question hard.

## answer_b
Chylomicrons

## explanation_b
Correct. **Apo B-48 marks a chylomicron**, and therefore marks dietary lipid of intestinal origin. Nascent chylomicrons are assembled in the enterocyte with apo B-48 and apo A, pass into the lacteals and then the blood, and there acquire apo C and apo E to become mature. Because apo B-48 is added in the gut and never leaves the particle, it is the single most reliable label of the chylomicron lineage — and the contrast with apo B-100 on VLDL, IDL and LDL is the tidiest way to remember which particles come from the gut and which from the liver.

## answer_c
High density lipoproteins

## explanation_c
Incorrect. HDL carries apo A (chiefly A-I), together with C, D and E, and it carries no apo B at all. Apo A-I is what binds HDL to its hepatic receptor.

## answer_d
Very low-density lipoproteins

## explanation_d
Incorrect, and it is the closest distractor because VLDL resembles a chylomicron in being triacylglycerol-rich. But VLDL is made by the **liver** and carries **apo B-100**, which is why VLDL can mature into LDL and a chylomicron cannot.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## main_concept
CON-GIT-ECB3C2F56DC72D

## concept_ids
CON-GIT-99EF5E989B0C65 | CON-GIT-33EAF87333AAD5

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
72

## exam_relevance
9

## clinical_relevance
0.45

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## question_only_for

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids

## learning_objective
Match apo B-48 to the chylomicron and contrast it with apo B-100 on the hepatic lipoproteins.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 106 (file page 113), question 40; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p113-q40, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 40 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-6DB0AD635A8D

## title
The main lipid component of chylomicrons is:

## question
The main lipid component of chylomicrons is:

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 113, printed page 106, printed question 41, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Cholesterol

## explanation_a
Incorrect. Cholesteryl ester is the dominant lipid of **LDL**, which is 80% lipid and mainly cholesteryl ester. A chylomicron does carry cholesterol and cholesteryl ester in its core, but only as a minor fraction.

## answer_b
FFA albumin

## explanation_b
Incorrect, and it is not a lipoprotein at all. Free fatty acids bound to albumin are a separate transport form, listed alongside the lipoproteins because they are separated in the same ultracentrifugation run. They are not a component of chylomicrons.

## answer_c
TAG

## explanation_c
Correct. A chylomicron is about **98% lipid and 2% protein**, and that lipid is mainly **triacylglycerol** — which is what it is for, since triacylglycerol is about 99% of dietary lipid. The high fat content is also what makes it the least dense and largest particle, so it floats to the top on ultracentrifugation. Its fate follows from its cargo: lipoprotein lipase strips about 90% of that triacylglycerol at the capillary endothelium, and what remains is the chylomicron remnant, taken up by the liver through apo E receptors.

## answer_d
Phospholipid

## explanation_d
Incorrect. Phospholipid and cholesterol form the amphipathic surface monolayer of every lipoprotein, and phospholipid is the dominant lipid of **HDL** — but in a chylomicron it is only the wrapping around a triacylglycerol core.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## main_concept
CON-GIT-ECB3C2F56DC72D

## concept_ids
CON-GIT-33EAF87333AAD5

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
80

## exam_relevance
8

## clinical_relevance
0.4

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## question_only_for

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids

## learning_objective
State the dominant lipid of the chylomicron and relate it to the particle's density and fate.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 106 (file page 113), question 41; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p113-q41, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 41 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-A17AFC3E7BD8

## title
Degradation of lipoprotein triacylglycerol by lipoprotein lipase occurs in which of the following tissues?

## question
Degradation of lipoprotein triacylglycerol by lipoprotein lipase occurs in which of the following tissues?

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 113, printed page 106, printed question 42, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Nervous system

## explanation_a
Incorrect, and it is the option that should be eliminated on principle. Lipoprotein lipase is described as present in the vascular endothelium of **extrahepatic** tissues, but the nervous system is the standing exception in lipid metabolism: fatty acids bound to albumin cannot cross the blood–brain barrier, so there would be nothing for the brain to do with them. This is the same fact that forces the brain onto ketone bodies in starvation.

## answer_b
Kidney

## explanation_b
Incorrect. The kidney has a real role in lipid metabolism — it possesses glycerol kinase and becomes an important site of gluconeogenesis in starvation — but it is not the tissue the book names for lipoprotein lipase.

## answer_c
Adipose tissue

## explanation_c
Correct. Lipoprotein lipase is anchored to the **capillary endothelium of adipose tissue** (and of other extrahepatic tissues such as skeletal and cardiac muscle and the lactating mammary gland), where it hydrolyses the triacylglycerol carried in chylomicrons and VLDL into free fatty acids and glycerol. Adipose tissue is the classic site because it is where the released fatty acids are re-esterified and stored, and because the enzyme there is induced by insulin — so a meal both raises insulin and clears the triacylglycerol-rich lipoproteins from plasma. Note the division of labour: the enzyme is on the outside of the cell facing the blood, because the particle can never enter.

## answer_d
Smooth muscles

## explanation_d
Incorrect. Smooth muscle is not among the tissues the book names, and it is not a significant site of dietary fat storage or of fatty acid oxidation on this scale.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## main_concept
CON-GIT-6CB618DBA50596

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
74

## exam_relevance
8

## clinical_relevance
0.45

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## question_only_for

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids

## learning_objective
Locate lipoprotein lipase anatomically and explain why nervous tissue is excluded.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 106 (file page 113), question 42; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p113-q42, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 42 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-97BB56A74AB7

## title
Cholesteryl ester transfer protein catalyses the transfer of triacylglycerol to HDL in exchange for:

## question
Cholesteryl ester transfer protein catalyses the transfer of triacylglycerol to HDL in exchange for:

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 113, printed page 106, printed question 43, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
FFA

## explanation_a
Incorrect. Free fatty acids are not carried inside a lipoprotein core at all — they travel through plasma bound to albumin. There is nothing for a lipid transfer protein to exchange them for.

## answer_b
Cholesterol

## explanation_b
Incorrect, and the difference between this option and the right one is precisely the point. **Free** cholesterol is amphipathic and sits in the surface monolayer of the particle, where it can move between particles and be picked up by HDL directly. **Esterified** cholesterol is hydrophobic, sits in the core, and can only be moved by a transfer protein. It is core cargo that gets exchanged, and only the ester is core cargo.

## answer_c
Cholesterol esters

## explanation_c
Correct. This is the lipid-transfer function of the lipoprotein protein machinery — the department book's fourth listed function of the apolipoproteins, which it illustrates with apo D transferring triacylglycerol in exchange for cholesteryl esters between different lipoproteins. The exchange is a one-for-one swap of core lipids: HDL, which has accumulated cholesteryl ester through the action of LCAT, gives it to the triacylglycerol-rich particles and receives their triacylglycerol in return. It matters clinically because when triacylglycerol-rich lipoproteins are abundant — as in uncontrolled diabetes — the exchange runs harder, HDL is loaded with triacylglycerol, and the HDL level falls.

## answer_d
Apo E

## explanation_d
Incorrect. Apo E is a surface apolipoprotein and a receptor ligand for remnant uptake; it is transferred between particles, but by direct exchange with HDL as a reservoir, not as the counterpart of a core lipid swap.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## main_concept
CON-GIT-99EF5E989B0C65

## concept_ids
CON-GIT-ECB3C2F56DC72D

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
48

## exam_relevance
6

## clinical_relevance
0.6

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## question_only_for

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids

## learning_objective
Explain which cholesterol species is exchanged for triacylglycerol between lipoproteins, and why the free form is not.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 106 (file page 113), question 43; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p113-q43, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 43 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
The 103 department biochemistry book does not use the term CETP anywhere; it states the same exchange on file page 77 as a function of apo D — "Apo D transfers TAG in exchange with cholesterol esters between different lipoproteins". The exchange the question tests is in the book; the protein name is not. Flagged for the faculty reviewer.

---

# Item

## id
QM-103-406BE26EF15D

## title
Which of the following is true of lipoprotein (a), Lp(a)?

## question
Which of the following is true of lipoprotein (a), Lp(a)?

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 113, printed page 106, printed question 44, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
It has an atheroprotective role

## explanation_a
Incorrect, and it is the opposite of the truth. Lp(a) is athero**genic**: it is a recognised independent risk marker for coronary disease, and its prothrombotic effect compounds the risk carried by the LDL particle it is built on. The only atheroprotective lipoprotein on the syllabus is HDL, through reverse cholesterol transport.

## answer_b
It is a subfraction of the VLDL particle

## explanation_b
Incorrect. Lp(a) is a modified **LDL** particle — an LDL with apolipoprotein(a) linked to its apo B-100 — not a subfraction of VLDL. VLDL is the triacylglycerol-rich hepatic export particle from which LDL is eventually derived, but Lp(a) sits at the LDL end of that sequence.

## answer_c
Its concentration decreases in coronary disease

## explanation_c
Incorrect. Its concentration is **raised**, not lowered, in coronary disease. This option catches a student who has read "Lp(a) is measured in cardiovascular risk assessment" without registering which direction the abnormal result goes in.

## answer_d
Its function is to slow down fibrinolysis

## explanation_d
Correct. Apolipoprotein(a) is structurally similar to **plasminogen**, and that resemblance is the whole mechanism. It competes with plasminogen without being convertible to plasmin, so it interferes with the generation of plasmin and therefore **slows fibrinolysis**. A clot that is not dissolved persists, which is why Lp(a) links the lipid and coagulation halves of atherosclerosis: it delivers cholesterol like an LDL particle and impairs clot breakdown like a plasminogen decoy.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## main_concept
CON-GIT-ECB3C2F56DC72D

## concept_ids

## contextual_concept_ids

## difficulty
Hard

## question_type
Pathophysiology

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
5

## clinical_relevance
0.7

## academic_relevance
0.7

## exam_weight_by_year
KAU_Y1=0.4

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## question_only_for

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids

## learning_objective
State what Lp(a) is built from and explain how its similarity to plasminogen slows fibrinolysis.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 106 (file page 113), question 44; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
80

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p113-q44, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 44 is D, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
Lp(a) does not appear anywhere in the 103 department biochemistry book — searched the cached page text for "Lp(a)" and "lipoprotein a". The question book examines it and the department textbook does not carry it. Flagged for the faculty reviewer.

---

# Item

## id
QM-103-76E1715F8EAA

## title
The highest amount of protein is present in:

## question
The highest amount of protein is present in:

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 113, printed page 106, printed question 45, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Chylomicron

## explanation_a
Incorrect, and it is the extreme opposite end of the series. A chylomicron is about **2% protein and 98% lipid**, the lowest protein content of any lipoprotein, which is exactly why it is the least dense and the largest particle.

## answer_b
VLDL

## explanation_b
Incorrect. VLDL is about 10% protein and 90% lipid, mostly triacylglycerol. It sits second from the bottom of the density series, just above chylomicrons.

## answer_c
LDL

## explanation_c
Incorrect, and it is the nearest miss. LDL is about 20% protein and 80% lipid, mainly cholesteryl ester — denser than VLDL but still well short of HDL.

## answer_d
HDL

## explanation_d
Correct. **HDL is about 45% protein and 55% lipid**, the highest protein content of the four, and carrying apo A, C, D and E. This is not a detached fact but the definition of the naming system: the lipoproteins are separated by ultracentrifugation according to density, protein is the densest component and lipid the least dense, so **the more protein a particle carries the denser it is**. Running the series in order — chylomicron 2%, VLDL 10%, IDL 10%, LDL 20%, HDL 45% — lets a student answer any question about relative density, size or protein content from one remembered sequence rather than four separate facts.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## main_concept
CON-GIT-ECB3C2F56DC72D

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
72

## exam_relevance
9

## clinical_relevance
0.4

## academic_relevance
0.95

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## question_only_for

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids

## learning_objective
Order the plasma lipoproteins by protein content and explain why that order is the same as the order of density.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 106 (file page 113), question 45; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p113-q45, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
The extraction recorded correct: null with correctSource "printed key (p114) names option d, which this question does not have". The printed answer key on file page 114 (printed 107) was opened with the Read tool and read visually: item 45 is D. Recovered, not inferred.
OCR repair: The extraction flagged this item suspect for "option count": options b, c and d had collapsed into one line reading "VLDL ce) LDL d) HDL", leaving three options where the printed key names a fourth, d. File page 113 (printed 106) was opened with the Read tool and read visually. The four printed options are a) Chylomicron  b) VLDL  c) LDL  d) HDL, restored here as printed, and the key's option d is HDL. The apparent contradiction in correctSource was an artefact of the lost option, not a fault in the key.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-64E3A064706A

## title
The binding of HDL to its receptor is mediated by:

## question
The binding of HDL to its receptor is mediated by:

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 113, printed page 106, printed question 46, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Apo B100

## explanation_a
Incorrect. Apo B-100 is the ligand for the **LDL receptor**, and it is the apolipoprotein of VLDL, IDL and LDL. HDL carries no apo B of any kind, so this option can be eliminated on composition alone.

## answer_b
Apo D

## explanation_b
Incorrect. Apo D is present on HDL, but the book gives its function as **lipid transfer** — moving triacylglycerol between particles in exchange for cholesteryl esters — not as a receptor ligand.

## answer_c
Apo E

## explanation_c
Incorrect, and it is the sharpest distractor. Apo E is genuinely present on HDL, and it *is* a receptor ligand — but the receptor it binds is the hepatic **apo E receptor** that clears chylomicron remnants and IDL. Being on the particle is not the same as being the ligand for that particle's own uptake.

## answer_d
Apo A-I

## explanation_d
Correct. **Apo A-I** mediates the endocytosis of HDL by liver cells through apo A-I receptors, which is the final step of reverse cholesterol transport: HDL collects free cholesterol from extrahepatic tissues, LCAT esterifies it into a hydrophobic core that converts the discoidal particle into a spherical one, and the liver then takes the loaded particle up and disposes of the cholesterol as bile acids or in bile. Learning the ligands as a set of three answers most of this chapter — **apo A-I for the HDL receptor, apo B-100 for the LDL receptor, apo E for remnant uptake** — with apo C-II as the odd one out that activates an enzyme rather than binding a receptor.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## main_concept
CON-GIT-99EF5E989B0C65

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
62

## exam_relevance
8

## clinical_relevance
0.45

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## question_only_for

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids

## learning_objective
Match each apolipoprotein to the receptor or enzyme it acts on, and place apo A-I in reverse cholesterol transport.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 106 (file page 113), question 46; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p113-q46, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 46 is D, agreeing with the extraction.
OCR repair: Option d was extracted as "Apo Al" — a lowercase L read as a one, or the reverse. The printed option is Apo A1 (apo A-I) and it is written that way here.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-A76090F6FE68

## title
Uptake of LDL particles is mediated by:

## question
Uptake of LDL particles is mediated by:

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 114, printed page 107, printed question 47, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Apo B100

## explanation_a
Correct. LDL is 20% protein and that protein is essentially all **apo B-100**, which is the ligand recognised by the LDL receptor. About 70% of LDL is cleared this way by the liver and 30% by extrahepatic tissues; once endocytosed, the cholesterol is released for the cell's own use and feeds back to suppress HMG-CoA reductase. The same fact read from the other side gives familial hypercholesterolaemia: the receptor is defective, apo B-100 has nothing to bind, LDL is not cleared, and plasma cholesterol rises. Apo B-100 is present from the start of the hepatic lineage — nascent VLDL carries it, and it stays on the particle through IDL to LDL, while apo C and apo E are progressively lost.

## answer_b
Apo C

## explanation_b
Incorrect. Apo C is the peripheral apolipoprotein that HDL lends to nascent chylomicrons and VLDL; its C-II component activates lipoprotein lipase. Its **removal** is part of what converts VLDL into IDL, so a mature LDL particle has none left to be taken up by.

## answer_c
Apo B48

## explanation_c
Incorrect. Apo B-48 is the intestinal form and marks chylomicrons, not LDL. It also lacks the receptor-binding domain that B-100 has, which is why chylomicron remnants are cleared through apo E instead.

## answer_d
LCAT

## explanation_d
Incorrect. LCAT is an enzyme, not an apolipoprotein, and it acts on HDL — esterifying free cholesterol into cholesteryl ester. It plays no part in LDL uptake, and choosing it usually means the student is reaching for any familiar name in the lipoprotein chapter.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## main_concept
CON-GIT-99EF5E989B0C65

## concept_ids
CON-GIT-8C5125A491B189

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
2

## inferred_difficulty
72

## exam_relevance
9

## clinical_relevance
0.55

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## question_only_for

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids

## learning_objective
Name the ligand for the LDL receptor and connect it to the defect in familial hypercholesterolaemia.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 107 (file page 114), question 47; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p114-q47, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 47 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-F171FB82711B

## title
Hypercholesterolaemia means a high level of:

## question
Hypercholesterolaemia means a high level of:

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 114, printed page 107, printed question 48, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
HDL

## explanation_a
Incorrect, and it inverts the clinical meaning. HDL carries cholesterol **away** from the tissues to the liver for excretion — reverse cholesterol transport — which is why it is called the good cholesterol and why a high HDL is protective rather than a disease state.

## answer_b
VLDL

## explanation_b
Incorrect. VLDL is 90% lipid and that lipid is mainly **triacylglycerol**, so a raised VLDL shows up as hypertriglyceridaemia. It contributes to the total cholesterol indirectly, since VLDL is the precursor of LDL, but a rise in VLDL alone is not what the term describes.

## answer_c
Chylomicrons

## explanation_c
Incorrect. Chylomicrons are 98% lipid and almost entirely triacylglycerol of dietary origin, and they are cleared within hours of a meal. A raised chylomicron level is a fasting hypertriglyceridaemia, not hypercholesterolaemia.

## answer_d
LDL

## explanation_d
Correct. Total plasma cholesterol normally runs 120–200 mg/dL, with about two thirds as cholesteryl ester, and hypercholesterolaemia means a level above 200 mg/dL. The fraction that carries it is **LDL**, which is 80% lipid and mainly cholesteryl ester, and whose job is to deliver cholesterol from the liver to the tissues. LDL is the "bad cholesterol" because at high levels it deposits in arterial walls and forms plaques, raising the risk of coronary disease and stroke. The named causes are worth holding as a list, since the examiner asks for them directly: diet rich in saturated fat, carbohydrate and cholesterol; obesity; diabetes mellitus; hypothyroidism; obstructive jaundice; and the familial hyperlipoproteinaemias.

## topic
Lipid metabolism

## subtopic
Plasma cholesterol

## main_concept
CON-GIT-E6AEB25F31B529

## concept_ids
CON-GIT-ECB3C2F56DC72D

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
78

## exam_relevance
8

## clinical_relevance
0.7

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Cholesterol Metabolism

## question_only_for

## library_ids
ART-103-BIO-CHOLESTEROL-METABOLISM

## resource_ids

## learning_objective
Identify the lipoprotein fraction that rises in hypercholesterolaemia and separate it from the triacylglycerol-rich particles.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 107 (file page 114), question 48; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p114-q48, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 48 is D, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.

---

# Item

## id
QM-103-8ABF1FCCF426

## title
Lecithin cholesterol acyl transferase (LCAT):

## question
Lecithin cholesterol acyl transferase (LCAT):

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 114, printed page 107, printed question 49, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Transfers TAG from chylomicrons to HDL

## explanation_a
Incorrect, and it names a different activity that happens on the same particle. Transferring core lipid between lipoproteins is the job of a lipid **transfer** protein — the book's example is apo D swapping triacylglycerol for cholesteryl esters. LCAT is an acyl transferase: it modifies a molecule chemically rather than ferrying it between particles.

## answer_b
Converts cholesterol to cholesterol esters

## explanation_b
Correct, and the name gives the reaction away if it is read as a sentence: *lecithin cholesterol acyl transferase* moves an acyl group from lecithin (phosphatidylcholine) onto **cholesterol**, producing a **cholesteryl ester**. That single change is what drives reverse cholesterol transport forward. Free cholesterol is amphipathic and sits in the surface monolayer, where it could drift back out; esterifying it makes it hydrophobic, so it sinks into the core and is trapped. The particle changes shape as a result — discoidal HDL becomes spherical HDL — and a concentration gradient is maintained that keeps pulling more free cholesterol off the tissues. Without LCAT the HDL surface would saturate and cholesterol collection would stop.

## answer_c
Hydrolyses TAG in HDL

## explanation_c
Incorrect. Hydrolysing triacylglycerol is what a lipase does — lipoprotein lipase on the endothelium, or hepatic lipase. LCAT forms an ester bond rather than breaking one, and its substrate is cholesterol, not triacylglycerol.

## answer_d
Is inhibited by insulin

## explanation_d
Incorrect. Insulin does not inhibit LCAT; the enzyme in this chapter that insulin acts on is lipoprotein lipase, which it **induces**. This option catches a student pattern-matching on "insulin regulates lipid enzymes" without checking which enzyme or which direction.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## main_concept
CON-GIT-99EF5E989B0C65

## concept_ids
CON-GIT-ECB3C2F56DC72D

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
2

## inferred_difficulty
58

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## question_only_for

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids

## learning_objective
State the reaction LCAT catalyses and explain why esterification is what keeps reverse cholesterol transport running.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 107 (file page 114), question 49; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p114-q49, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 49 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
The 103 department biochemistry book does not use the name LCAT — searched the cached page text for "LCAT" and "lecithin". It does state the reaction on file page 81: "Cholesterol taken is esterified to form cholesterol ester which forms a central hydrophobic core converting the discoidal HDL into the spherical HDL." The chemistry is in the book; the enzyme name is not. Flagged for the faculty reviewer.

---

# Item

## id
QM-103-30D9F269DBC0

## title
Heparin is important for lipoprotein clearance because:

## question
Heparin is important for lipoprotein clearance because:

## vignette

## subject
gi

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 114, printed page 107, printed question 50, chapter "Lipid Metabolism". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
It inhibits hepatic lipase

## explanation_a
Incorrect, and it points the wrong way. Heparin releases hepatic lipase into the circulation along with lipoprotein lipase rather than inhibiting it; inhibiting a lipase would impair lipoprotein clearance, which is the opposite of what the stem describes.

## answer_b
It induces synthesis of lipoprotein lipase

## explanation_b
Incorrect, and it is the closest distractor because it confuses a rapid physical effect with a slow transcriptional one. Inducing synthesis means making more enzyme, which takes hours and is what **insulin** does to lipoprotein lipase. Heparin acts within minutes because it does not make any new enzyme at all.

## answer_c
It releases LPL from endothelium

## explanation_c
Correct. Lipoprotein lipase is not free in plasma; it is **anchored to the luminal surface of the capillary endothelium by heparan sulphate proteoglycans**, positioned to meet passing chylomicrons and VLDL. Heparin competes for that binding and displaces the enzyme into the bloodstream — which is the basis of the classical post-heparin lipolytic activity used to demonstrate the enzyme. The point worth taking from this is where the enzyme sits: on the outside of the cell facing the blood, because a lipoprotein particle is far too large to be taken into the cell whole, so its triacylglycerol must be digested where it floats.

## answer_d
It activates CETP

## explanation_d
Incorrect. Cholesteryl ester transfer between lipoproteins is not a heparin-sensitive process, and it concerns core cholesteryl ester and triacylglycerol exchange rather than the endothelial anchoring of an enzyme.

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## main_concept
CON-GIT-6CB618DBA50596

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## clinical_relevance
0.5

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## question_only_for

## library_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## resource_ids

## learning_objective
Explain how heparin displaces lipoprotein lipase and what that reveals about where the enzyme normally sits.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Lipid Metabolism", printed page 107 (file page 114), question 50; printed answer key on printed page 107. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p114-q50, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p114)". The key page (file page 114, printed 107) was re-read visually and item 50 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
The department book states that lipoprotein lipase "is present in the vascular endothelial cells of extrahepatic tissues" (file page 58) but does not mention heparin or the heparan sulphate anchor. The heparin fact comes from the question book only. Flagged for the faculty reviewer.

---

# Item

## id
QM-103-80CA36B077C8

## title
Insulin is a protein hormone formed of:

## question
Insulin is a protein hormone formed of:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 116, printed page 109, printed question 1, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
One chain: 51 amino acids

## explanation_a
Incorrect. The amino acid count is right but the chain count is not, and the single-chain form has a different name and a different meaning. **Proinsulin** is a single chain; it becomes insulin only when the connecting peptide is excised. Calling mature insulin a single chain erases the processing step that produces C-peptide, which is the marker used clinically to tell endogenous insulin from injected.

## answer_b
Two chains: 51 amino acids

## explanation_b
Correct. Insulin is **two chains totalling 51 amino acids** — an A chain of 21 and a B chain of 30 — held together by **two interchain disulphide bridges**, with a third, intrachain, bridge inside the A chain. The two-chain structure is the product of processing rather than of translation: the β cell makes preproinsulin, cleaves the signal sequence to give proinsulin, and then excises the C-peptide from the middle, leaving the A and B chains joined only by their disulphide bonds. C-peptide is secreted in equimolar amounts and, because it is not cleared as fast as insulin, is what allows endogenous secretion to be measured.

## answer_c
One chain: 31 amino acids

## explanation_c
Incorrect on both halves. 31 is the length of C-peptide, not of insulin, and this option catches a student who has memorised a number from the processing diagram and attached it to the wrong molecule.

## answer_d
Two chains: 31 amino acids

## explanation_d
Incorrect. Two chains is right, 31 amino acids is not — it is neither the total nor the length of either chain.

## topic
Insulin and diabetes mellitus

## subtopic
Structure of insulin

## main_concept
CON-END-73242F18F11E58

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Clinical

## reasoning_level
1

## inferred_difficulty
76

## exam_relevance
7

## clinical_relevance
0.5

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-END-TOP-8B80E93DAE

## resource_ids

## learning_objective
State the chain structure and amino acid count of insulin, and relate them to proinsulin processing.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 109 (file page 116), question 1; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p116-q1, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 1 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
main_concept is the live concept CON-END-73242F18F11E58, whose definition already states 51 amino acids in A and B chains with two interchain and one intrachain disulphide bond. Nothing new was minted. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-346ACE4EBC2D

## title
Secretion of insulin in response to a glucose load occurs in:

## question
Secretion of insulin in response to a glucose load occurs in:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 116, printed page 109, printed question 2, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
One phase

## explanation_a
Incorrect, and it misses what the biphasic pattern is for. A single smooth release could not both blunt the immediate post-meal glucose peak and cover the hours of digestion that follow. The β cell needs a fast component and a sustained one, and it achieves them with two different pools of hormone.

## answer_b
Two phases

## explanation_b
Correct. Insulin secretion is **biphasic**. The first phase is a sharp, brief spike within minutes, released from insulin already made and stored in granules docked at the membrane; it is what limits the immediate rise in blood glucose after a meal. The second phase is slower, smaller and sustained, drawing on the reserve pool and on newly synthesised hormone, and it lasts as long as the glucose stimulus does. The distinction is clinically load-bearing: **loss of the first phase is one of the earliest detectable abnormalities in type 2 diabetes**, appearing before the fasting glucose is abnormal, which is why a person can have a normal fasting sugar and a clearly abnormal response to a glucose load.

## answer_c
Three phases

## explanation_c
Incorrect. Three phases would suit a description of a different secretory system; the insulin response to glucose has a rapid first phase and a sustained second phase and no third.

## answer_d
Four phases

## explanation_d
Incorrect. Four phases matches nothing in insulin physiology and is offered to complete the numerical series.

## topic
Insulin and diabetes mellitus

## subtopic
Secretion of insulin

## main_concept
CON-END-83E98BC1F9E93E

## concept_ids
CON-END-2ED4BD533EA0E3

## contextual_concept_ids

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
68

## exam_relevance
7

## clinical_relevance
0.6

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.55

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
State that insulin secretion is biphasic and explain what each phase contributes and which is lost first in type 2 diabetes.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 109 (file page 116), question 2; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p116-q2, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 2 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
No live or pending concept covers the biphasic secretory pattern; the nearest, CON-END-2ED4BD533EA0E3, names the secretagogues but not the phases, and is tagged as an also-assessed concept instead. The 103 department biochemistry book has no diabetes chapter and does not describe biphasic secretion; the source is the question book. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-6350D3A944A5

## title
The half-life of insulin in the circulation is approximately:

## question
The half-life of insulin in the circulation is approximately:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 116, printed page 109, printed question 3, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
3-5 seconds

## explanation_a
Incorrect. Seconds is the timescale of a neurotransmitter acting across a synaptic cleft, or of a locally released mediator such as nitric oxide. A hormone that had to survive transit from the pancreas through the portal circulation to its target tissues could not work on that scale.

## answer_b
3-5 minutes

## explanation_b
Correct — roughly **3 to 5 minutes**. Insulin is degraded by the liver, kidney and placenta, by reduction of its disulphide bonds followed by proteolysis, and the liver removes a large share of it on first pass from the portal vein. The short half-life is functionally the point: it lets the plasma insulin level track the blood glucose almost in real time, rising and falling with each meal, which is what makes minute-to-minute glucose control possible. Two consequences follow. Because the clearance is hepatic and renal, insulin persists longer in renal failure, and a diabetic patient whose kidneys fail may need less insulin, not more. And because injected insulin bypasses the portal first pass, its kinetics differ from those of the hormone the pancreas secretes.

## answer_c
3-5 hours

## explanation_c
Incorrect. Hours is the timescale of the thyroid hormones and of the steroid hormones, which act by changing gene transcription and are carried on binding proteins. Insulin is a peptide acting through a membrane receptor and is cleared far faster.

## answer_d
3-5 days

## explanation_d
Incorrect. Days would make moment-to-moment glucose regulation impossible; a hormone with that half-life could not be switched off between meals.

## topic
Insulin and diabetes mellitus

## subtopic
Catabolism of insulin

## main_concept
CON-END-8E70A34402E8B7

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
66

## exam_relevance
6

## clinical_relevance
0.6

## academic_relevance
0.75

## exam_weight_by_year
KAU_Y1=0.5

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-END-TOP-8B80E93DAE

## resource_ids

## learning_objective
State the plasma half-life of insulin, name the organs that clear it, and explain why a short half-life is necessary.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 109 (file page 116), question 3; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p116-q3, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 3 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
main_concept is the live concept CON-END-8E70A34402E8B7 — "Liver, kidney, and placenta catabolize short-lived circulating insulin through disulfide reduction and proteolysis". It names the short half-life and the clearing organs; the numeric value 3-5 minutes comes from the question book. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-E425122ADE84

## title
The insulin receptor is composed of:

## question
The insulin receptor is composed of:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 116, printed page 109, printed question 4, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
1α and 1β subunit

## explanation_a
Incorrect. A single αβ pair is only half of the receptor. Two of them must be disulphide-linked into a tetramer, and that pairing is not decorative — the tyrosine kinase in each β subunit phosphorylates its partner across the dimer, so a receptor with only one β subunit could never trans-autophosphorylate and would transmit no signal at all.

## answer_b
1α and 2β subunits

## explanation_b
Incorrect. The stoichiometry is symmetrical: the subunits come in equal numbers because the receptor is a dimer of identical αβ halves. An unequal count describes no real receptor.

## answer_c
2α and 2β subunits

## explanation_c
Correct. The insulin receptor is a **heterotetramer, α₂β₂**, held together by disulphide bonds. The two **α subunits are entirely extracellular** and carry the insulin-binding site; the two **β subunits span the membrane** and carry tyrosine kinase activity on their cytoplasmic tails. Insulin binding to the α subunits produces a conformational change that activates the β-subunit kinase, which trans-autophosphorylates and then phosphorylates the insulin receptor substrate proteins, launching the metabolic and growth pathways downstream. The division of labour is the thing to hold — the α subunit binds and never crosses the membrane, the β subunit signals and does — because it explains why insulin never needs to enter the cell to act.

## answer_d
2α and 1β subunit

## explanation_d
Incorrect for the same reason as B, mirrored. The receptor contains two of each subunit.

## topic
Insulin and diabetes mellitus

## subtopic
Insulin receptor and signalling

## main_concept
CON-END-2A7BECE1524359

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
7

## clinical_relevance
0.4

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-END-TOP-8B80E93DAE

## resource_ids

## learning_objective
State the subunit composition of the insulin receptor and assign binding and kinase activity to the correct subunit.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 109 (file page 116), question 4; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p116-q4, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 4 is C, agreeing with the extraction.
OCR repair: The four options were extracted as "la and 1p", "la and 2B", "2a and 2p" and "20 and 1B" — the OCR read the Greek α as "a" or "0" and β as "p" or "B". They are written here as 1α/1β, 1α/2β, 2α/2β and 2α/1β. The pattern is unambiguous from the four together and from the printed key naming c.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
main_concept is the live concept CON-END-2A7BECE1524359, which covers insulin receptor activation and beta-subunit tyrosine kinase. Its stored definition does not state the α₂β₂ stoichiometry explicitly; a reviewer may wish to add it to that concept rather than mint a second receptor concept, which is why none was minted here. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-FC0730157F56

## title
Insulin resistance is associated with:

## question
Insulin resistance is associated with:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 116, printed page 109, printed question 5, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Inhibited lipolysis

## explanation_a
Incorrect, and it is the trap for a student who remembers the action but not the direction. Insulin normally **inhibits** lipolysis, so when tissues resist insulin that brake is released and lipolysis **increases** — which is why insulin resistance is accompanied by raised plasma free fatty acids. Each option here names a genuine insulin action; the question is which one survives when insulin stops working.

## answer_b
Decreased gluconeogenesis

## explanation_b
Incorrect for the same reason. Insulin normally suppresses hepatic gluconeogenesis; resistance removes that suppression, so gluconeogenesis **rises** and contributes to the fasting hyperglycaemia.

## answer_c
Increased glucose uptake by skeletal muscles

## explanation_c
Incorrect. Insulin normally drives glucose into skeletal muscle and adipose tissue through GLUT-4; resistance means less GLUT-4 at the membrane, so muscle glucose uptake **falls**. This is the largest single contributor to post-meal hyperglycaemia, because skeletal muscle is the biggest disposal site for a glucose load.

## answer_d
Inhibited glycogenesis

## explanation_d
Correct. Insulin normally stimulates glycogen synthesis, so in insulin resistance **glycogenesis is inhibited** — the one option that states an insulin action correctly reversed. The general rule is worth more than the item: in insulin resistance every anabolic action of insulin is blunted and every process insulin normally restrains is released. Glycogenesis and lipogenesis fall; lipolysis, gluconeogenesis, glycogenolysis, proteolysis and ketogenesis rise. Working from that one principle answers this whole cluster of questions without memorising four separate lists, and it also explains why the same patient shows hyperglycaemia, a raised triacylglycerol and a low HDL together.

## topic
Insulin and diabetes mellitus

## subtopic
Insulin resistance

## main_concept
CON-END-FB7FB91A0697C0

## concept_ids
CON-END-BCCD5E0C1920B1

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
3

## inferred_difficulty
55

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-END-TOP-8B80E93DAE

## resource_ids

## learning_objective
Predict the direction each insulin-sensitive process moves in insulin resistance, from insulin's normal action on it.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 109 (file page 116), question 5; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p116-q5, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 5 is D, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
main_concept is the live concept CON-END-FB7FB91A0697C0 — "Insulin resistance reduces adipose antilipolysis, muscle glucose uptake, and hepatic suppression of gluconeogenesis" — which covers three of the four options directly. Glycogenesis is not named in that concept's stored definition; a reviewer may wish to extend it rather than mint a second insulin-resistance concept. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-E21D167F8D5B

## title
Type 1 diabetes mellitus is characterised by:

## question
Type 1 diabetes mellitus is characterised by:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 116, printed page 109, printed question 6, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Middle age onset of diagnosis

## explanation_a
Incorrect. Middle-aged onset is typical of **type 2**. Type 1 characteristically presents in childhood or adolescence, though it can appear at any age — which is why onset is a useful pointer and never a diagnostic criterion on its own.

## answer_b
Exercise and low-calorie diet can help

## explanation_b
Incorrect, and it describes the first-line management of **type 2**, where weight loss and exercise improve insulin sensitivity and can restore glycaemic control on their own. A person with type 1 has no insulin to become more sensitive to; diet and exercise matter for them, but as adjuncts to insulin, never as a substitute.

## answer_c
High incidence of diabetic ketoacidosis

## explanation_c
Correct, and the reason is mechanical. Type 1 diabetes is an **absolute** deficiency of insulin following β-cell destruction, so there is nothing left to restrain lipolysis. Fatty acids flood the liver, β-oxidation outruns the citric acid cycle, and — with gluconeogenesis draining oxaloacetate — acetyl-CoA is diverted into ketone bodies. Ketogenesis outstrips ketolysis, ketone bodies accumulate, and because acetoacetate and 3-hydroxybutyrate are acids the result is a metabolic acidosis. In type 2 there is usually enough residual insulin to hold lipolysis partly in check, which is why ketoacidosis is far less common there and hyperosmolar coma is the characteristic acute crisis instead.

## answer_d
Insulin resistance

## explanation_d
Incorrect, and it is the defining feature of **type 2**, not type 1. The distinction is the axis the whole comparison turns on: type 1 is a problem of insulin *supply*, type 2 a problem of insulin *action*.

## topic
Insulin and diabetes mellitus

## subtopic
Classification of diabetes mellitus

## main_concept
CON-END-85750744126501

## concept_ids
CON-END-CC450A236ABF50

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
74

## exam_relevance
9

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
Distinguish type 1 from type 2 diabetes on onset, mechanism, treatment and susceptibility to ketoacidosis.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 109 (file page 116), question 6; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p116-q6, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 6 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
The live concept CON-END-3DCCBF7739DD59 defines diabetes mellitus but does not separate the two types; the department orientation lists "Compare: Type 1 and type 2 DM" among its written questions, so the comparison is examined in its own right and is minted as a concept here. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-B1556AD0013E

## title
Diabetic dyslipidaemia is caused by:

## question
Diabetic dyslipidaemia is caused by:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 116, printed page 109, printed question 7, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Low activity of hormone sensitive lipase

## explanation_a
Incorrect, and it is the wrong lipase pointed the wrong way. Hormone-sensitive lipase is **more** active in diabetes, not less: insulin normally inhibits it, so insulin deficiency releases the brake and lipolysis accelerates. That is what floods the liver with fatty acids in the first place.

## answer_b
Low activity of lipoprotein lipase

## explanation_b
Correct. **Lipoprotein lipase is induced by insulin**, so in insulin deficiency its activity falls and the triacylglycerol-rich lipoproteins — chylomicrons and VLDL — are not cleared from plasma. The department book gives this as one of three reasons diabetes causes hypercholesterolaemia, and the other two compound it: increased lipolysis and fatty acid oxidation leave excess acetyl-CoA for cholesterol synthesis, and the flood of plasma fatty acids drives hepatic triacylglycerol synthesis and therefore VLDL output. So production rises and clearance falls at the same time, which is why the characteristic picture is a high triacylglycerol with a low HDL.

## answer_c
Low activity of fatty acid oxidase

## explanation_c
Incorrect. Fatty acid oxidation is **increased** in insulin deficiency, not decreased — it is what supplies the acetyl-CoA for both ketogenesis and cholesterol synthesis. A student who assumes "diabetes means fat is not handled properly, so fat oxidation must be low" has the direction inverted.

## answer_d
Low activity of HMG-CoA synthase

## explanation_d
Incorrect. HMG-CoA synthase is the ketogenic enzyme of liver mitochondria, and its activity is if anything raised in insulin deficiency — that is what produces ketosis. Lowering it would reduce ketone bodies, which is the opposite of what happens.

## topic
Insulin and diabetes mellitus

## subtopic
Diabetic dyslipidaemia

## main_concept
CON-END-B41C6D0DFACFE4

## concept_ids
CON-GIT-6CB618DBA50596

## contextual_concept_ids

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.6

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
55

## exam_relevance
8

## clinical_relevance
0.8

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
Explain why plasma triacylglycerol rises in insulin deficiency, naming the enzyme insulin normally induces.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 109 (file page 116), question 7; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p116-q7, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 7 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
Evidenced from the department book, file page 75, which lists under the causes of hypercholesterolaemia: "There is decrease in the activity of plasma lipoprotein lipase (induced by insulin), leading to decreased clearance of plasma lipoproteins." module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-C4580EB7F8DB

## title
Macrovascular complications of diabetes mellitus include:

## question
Macrovascular complications of diabetes mellitus include:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 117, printed page 110, printed question 8, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Retinopathy

## explanation_a
Incorrect — retinopathy is **micro**vascular. It is disease of the retinal capillaries, and it belongs with nephropathy and neuropathy in the group whose severity tracks how long and how badly the glucose has been raised.

## answer_b
Nephropathy

## explanation_b
Incorrect — nephropathy is **micro**vascular, beginning in the glomerular capillaries and detected first as microalbuminuria. It is the commonest cause of end-stage renal failure in diabetic populations, but it is not a large-vessel complication.

## answer_c
Coronary heart disease

## explanation_c
Correct. The chronic complications of diabetes divide cleanly by the calibre of the vessel involved, and the division is worth learning as the organising principle rather than as two lists. **Macrovascular** disease is accelerated atherosclerosis of the large arteries — **coronary heart disease**, cerebrovascular disease and peripheral arterial disease — driven by the diabetic dyslipidaemia, the raised LDL and low HDL, and by glycation of vessel wall proteins. **Microvascular** disease affects capillaries and small vessels — retinopathy, nephropathy and neuropathy — and is more tightly linked to glycaemic control. The practical consequence is that tightening glucose control does most for the microvascular complications, while the macrovascular ones also require the blood pressure and the lipids to be treated.

## answer_d
Peripheral neuritis

## explanation_d
Incorrect — peripheral neuritis is the neuropathy of the **micro**vascular group. Its mechanism is partly ischaemia of the vasa nervorum and partly direct metabolic injury through the polyol pathway, and either way the vessels concerned are small.

## topic
Insulin and diabetes mellitus

## subtopic
Complications of diabetes mellitus

## main_concept
CON-END-F0182CA8A56EA7

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Clinical

## reasoning_level
1

## inferred_difficulty
76

## exam_relevance
8

## clinical_relevance
0.9

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
Sort the chronic complications of diabetes into macrovascular and microvascular by the calibre of vessel involved.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 110 (file page 117), question 8; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p117-q8, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 8 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-6E844E76FDF0

## title
Hypoglycaemic coma is characterised by:

## question
Hypoglycaemic coma is characterised by:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 117, printed page 110, printed question 9, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Bradycardia

## explanation_a
Incorrect, and it is the reverse of the sign. Falling glucose triggers a sympathetic and adrenal response, so the pulse is **fast**, not slow. Tachycardia, tremor and sweating are one physiological package, and they arrive together.

## answer_b
Hyperventilation

## explanation_b
Incorrect, and it belongs to the other diagnosis. Deep sighing hyperventilation is **Kussmaul breathing**, the respiratory compensation for the metabolic acidosis of diabetic ketoacidosis. A hypoglycaemic patient has no acidosis and no reason to blow off carbon dioxide.

## answer_c
Wet skin

## explanation_c
Correct, and the sign is diagnostic at the bedside precisely because it is the opposite of what the hyperglycaemic comas show. Hypoglycaemia provokes a **sympatho-adrenal discharge** — adrenaline released to mobilise glucose — and sweating is part of it, along with tremor, tachycardia, hunger and anxiety. So the skin is **wet and often cool**. In diabetic ketoacidosis and in hyperosmolar coma the patient has lost litres of water through an osmotic diuresis, so the skin is **dry** and the tongue and mucous membranes are dry with it. The department's own orientation sets "Compare: Hypoglycemic and hyperglycemic coma" and asks students to "explain on biochemical basis" that diabetic ketoacidosis is manifested by dry skin, so the wet/dry distinction is examined directly. Onset separates them too: hypoglycaemia develops over minutes, the hyperglycaemic comas over hours to days.

## answer_d
Blood glucose around 70 mg/dL

## explanation_d
Incorrect, and the number is the point. 70 mg/dL is the **lower end of normal** — the department book gives the normal fasting range as 70 to under 100 mg/dL. Hypoglycaemia means a fall below the normal fasting level, and the book notes that a marked drop, below about 45-50 mg/dL, may be fatal. A patient in coma from hypoglycaemia is far below 70.

## topic
Insulin and diabetes mellitus

## subtopic
Acute complications of diabetes mellitus

## main_concept
CON-END-68CC8CA610DF37

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
62

## exam_relevance
8

## clinical_relevance
0.95

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
Distinguish hypoglycaemic from hyperglycaemic coma at the bedside, and justify the skin sign from the underlying physiology.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 110 (file page 117), question 9; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p117-q9, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 9 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
The normal fasting range and the fatal threshold are from the department book, file pages 53 and 56. The coma comparison itself is not in the textbook — it has no diabetes chapter — but the department orientation lists it among the written questions to be studied, so it is examined. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-4C91DC115923

## title
Which of the following statements about HbA1c is correct?

## question
Which of the following statements about HbA1c is correct?

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 117, printed page 110, printed question 10, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
It is glycated haemoglobin that binds enzymatically when blood glucose is high

## explanation_a
Incorrect, and the single wrong word is "enzymatically". Glycation is **non-enzymatic**: glucose attaches to the N-terminal valine of the haemoglobin β chain spontaneously, at a rate that depends only on how much glucose is there and for how long. That is exactly why the measurement works as a record of average exposure — no enzyme regulates it, so nothing can compensate for or modulate it.

## answer_b
Its normal value should be around 9%

## explanation_b
Incorrect, and dangerously so if believed. Around 9% is the value of a person with poorly controlled diabetes. Normal is below about 5.7%, and 6.5% or above is diagnostic of diabetes.

## answer_c
It reflects the mean blood glucose level over the preceding 4 weeks

## explanation_c
Incorrect, and it is the closest distractor because the idea is right and the number is wrong. HbA1c reflects average glucose over roughly the **preceding 8 to 12 weeks**, not four. The period is set by the lifespan of the red cell, about 120 days, because glycation is irreversible once it has happened and the label is only lost when the cell is destroyed. The corollary is worth holding: anything that shortens red cell survival — haemolysis, recent blood loss — falsely lowers the HbA1c.

## answer_d
It is used for the diagnosis and follow-up of diabetes mellitus

## explanation_d
Correct. HbA1c is used **both to diagnose and to follow up** diabetes, and the two uses draw on the same property. Because it is a slow, cumulative, non-enzymatic record of glucose exposure over the life of the circulating red cells, it is unaffected by whether the patient has just eaten, by an acute illness on the day, or by a single good or bad week — which is what a fasting glucose cannot escape. A threshold of 6.5% or above establishes the diagnosis, and serial values then show whether treatment is working.

## topic
Insulin and diabetes mellitus

## subtopic
Glycated haemoglobin

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
64

## exam_relevance
9

## clinical_relevance
0.9

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
State what HbA1c measures, over what period, and why it serves for both diagnosis and follow-up.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 110 (file page 117), question 10; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p117-q10, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 10 is D, agreeing with the extraction.
OCR repair: The stem was extracted as "HbAle:" — an OCR misread of HbA1c. It is written here as a full question about HbA1c so that the item reads as a question rather than as a bare label.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
HbA1c appears nowhere in the 103 department biochemistry book — the cached page text was searched for "HbA1c", "A1c", "glycated" and "glycosylated". The department orientation nonetheless sets "explain on biochemical basis: HbA1c is used to diagnose and follow up diabetic cases", so it is examined. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-EBBBB9680A12

## title
Glucagon-like peptide-1 agonists are used in the treatment of diabetes mellitus. Which of the following describes their action?

## question
Glucagon-like peptide-1 agonists are used in the treatment of diabetes mellitus. Which of the following describes their action?

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 117, printed page 110, printed question 11, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
It increases insulin secretion

## explanation_a
Correct. GLP-1 is an **incretin** — a hormone released by the intestinal mucosa when it meets nutrients, which stimulates the β cell to secrete insulin. The department book describes the underlying phenomenon without naming the hormone: "upon contact with glucose, the intestinal mucosa secretes gastro-intestinal hormones that stimulate the secretion of insulin by the pancreatic β-cells. Insulin is secreted to the portal blood before absorption of glucose, which explains why oral glucose produces more insulin than intravenous glucose." A GLP-1 agonist exploits that pathway. Its most useful property is that the effect is **glucose-dependent** — it augments insulin release when glucose is high and not when it is low — so, unlike a sulphonylurea, it carries little risk of hypoglycaemia on its own.

## answer_b
It increases glucagon secretion

## explanation_b
Incorrect, and it is the option produced by reading the name rather than the class. GLP-1 is glucagon-*like* only in that it is cleaved from the same precursor, proglucagon; its actions oppose glucagon's. It **suppresses** glucagon secretion from the α cell, which lowers hepatic glucose output and is a second way it reduces blood glucose.

## answer_c
It decreases intestinal absorption of glucose

## explanation_c
Incorrect, and this is the mechanism of a different drug class. **Acarbose**, an α-glucosidase inhibitor, slows the digestion of complex carbohydrate in the gut lumen and so blunts the post-meal rise. GLP-1 agonists act on the islet, not on absorption — although they do slow gastric emptying, which is a related but distinct effect.

## answer_d
It increases appetite

## explanation_d
Incorrect, and it is the reverse. GLP-1 agonists **reduce** appetite through central satiety pathways and delayed gastric emptying, which is why they cause weight loss — a considerable advantage in type 2 diabetes, where obesity drives the insulin resistance.

## topic
Insulin and diabetes mellitus

## subtopic
Treatment of diabetes mellitus

## main_concept
CON-END-2ED4BD533EA0E3

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Treatment

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
70

## exam_relevance
7

## clinical_relevance
0.9

## academic_relevance
0.7

## exam_weight_by_year
KAU_Y1=0.6

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-END-TOP-8B80E93DAE

## resource_ids

## learning_objective
State how a GLP-1 agonist lowers blood glucose, and separate it from an α-glucosidase inhibitor.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 110 (file page 117), question 11; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p117-q11, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 11 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
main_concept is the live concept CON-END-2ED4BD533EA0E3 — "Amino acids, acetylcholine, sulfonylureas, cholecystokinin, and GLP-1 stimulate insulin release" — which names GLP-1 directly. Nothing new was minted. This item is about a drug class and is Draft; no dose is stated anywhere, because no source in this corpus states one. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-1164998F8CBD

## title
A fasting blood glucose of 117 mg/dL is diagnostic of:

## question
A fasting blood glucose of 117 mg/dL is diagnostic of:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 117, printed page 110, printed question 12, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Diabetes mellitus

## explanation_a
Incorrect. Diabetes requires a fasting glucose of **126 mg/dL or above**, confirmed. 117 is high but short of that threshold, and calling it diabetes would label a patient with a lifelong diagnosis on a value that does not reach the definition.

## answer_b
A normal subject

## explanation_b
Incorrect. The department book gives the normal fasting plasma glucose, after 8 to 12 hours of fasting, as **70 to under 100 mg/dL**. 117 is clearly above that, so the result is abnormal even though it is not diabetic.

## answer_c
Pre-diabetes

## explanation_c
Correct. A fasting glucose of **100 to 125 mg/dL** is impaired fasting glucose — pre-diabetes — and 117 sits inside it. The category exists because the risk is continuous while the diagnosis is binary: a person in this band is not diabetic but has a substantially raised chance of becoming so, and is already at increased cardiovascular risk. It is also the point at which the damage is most reversible, since weight loss and exercise can return the value to normal. The three fasting bands are worth memorising as one line — under 100 normal, 100 to 125 pre-diabetes, 126 and over diabetes — because every question in this cluster is answered by placing a number on it.

## answer_d
Gestational diabetes

## explanation_d
Incorrect. Gestational diabetes is glucose intolerance first recognised **during pregnancy**, and it is diagnosed by its own thresholds on an oral glucose tolerance test. Nothing in the stem mentions pregnancy, so the category cannot apply.

## topic
Insulin and diabetes mellitus

## subtopic
Diagnosis of diabetes mellitus

## main_concept
CON-END-AC5B11BA2F2BCA

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Investigation

## cognitive_effort
Low

## cognitive_effort_score
0.35

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
72

## exam_relevance
9

## clinical_relevance
0.9

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
Place a fasting glucose value in the normal, pre-diabetic or diabetic band.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 110 (file page 117), question 12; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p117-q12, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 12 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
The normal fasting range 70 to <100 mg/dL is the department book's own, file page 53. The 100-125 pre-diabetes band and the 126 threshold are from the question book; the textbook has no diabetes chapter and states neither. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-B10ECCF35C0F

## title
Which fasting blood glucose range accurately characterises pre-diabetes?

## question
Which fasting blood glucose range accurately characterises pre-diabetes?

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 117, printed page 110, printed question 13, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
From 120-180 mg/dL

## explanation_a
Incorrect. This range straddles the diabetic threshold — its lower half is pre-diabetic and its upper half is frankly diabetic — so it cannot define a category. Note also that 180 mg/dL is a number from a different context entirely: it is the **renal threshold**, the plasma level above which the tubules can no longer reabsorb all the filtered glucose and glucosuria appears.

## answer_b
From 126-140 mg/dL

## explanation_b
Incorrect, and it starts one unit above where pre-diabetes ends. **126 mg/dL is the diagnostic threshold for diabetes**, so a range beginning at 126 describes diabetes, not the state before it. This option catches a student who has learnt the number 126 but not which side of it each category lies on.

## answer_c
From 100-125 mg/dL

## explanation_c
Correct. **Impaired fasting glucose runs from 100 to 125 mg/dL**, sitting between the normal upper limit of under 100 and the diabetic threshold of 126. The band identifies people in whom insulin resistance is already established and β-cell compensation is beginning to fail, but before the glucose has risen enough to satisfy the definition of diabetes — the stage at which lifestyle intervention has most to offer.

## answer_d
Above 160 mg/dL

## explanation_d
Incorrect. Above 160 mg/dL is well into the diabetic range on any criterion, and it approaches the renal threshold at which glucose starts to appear in the urine.

## topic
Insulin and diabetes mellitus

## subtopic
Diagnosis of diabetes mellitus

## main_concept
CON-END-AC5B11BA2F2BCA

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Investigation

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Clinical

## reasoning_level
1

## inferred_difficulty
74

## exam_relevance
8

## clinical_relevance
0.85

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.75

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
State the fasting glucose range that defines pre-diabetes and distinguish it from the diabetic threshold and the renal threshold.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 110 (file page 117), question 13; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p117-q13, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 13 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
The renal threshold of 180 mg/dL used in the explanation of option A is the department book's own figure, file pages 54 and 57. The pre-diabetes band is from the question book. This item and item 12 test the same concept from opposite directions and are two occurrences of it, which is blueprint evidence rather than grounds for a second concept. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-A049D3188F55

## title
Which oral hypoglycaemic drug acts by increasing insulin secretion?

## question
Which oral hypoglycaemic drug acts by increasing insulin secretion?

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 117, printed page 110, printed question 14, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Metformin

## explanation_a
Incorrect, and the distinction between these first two options is the one the department's own orientation asks students to compare directly. **Metformin does not stimulate the β cell at all.** It is an insulin sensitiser: it reduces hepatic glucose output, chiefly by restraining gluconeogenesis, and improves peripheral glucose uptake. Because it does not force insulin release, it does not by itself cause hypoglycaemia — which is the practical consequence of the mechanism and the reason the comparison is set.

## answer_b
Sulphonylureas

## explanation_b
Correct. **Sulphonylureas act on the β cell** to increase insulin secretion, and the live concept for insulin secretagogues names them alongside amino acids, acetylcholine, cholecystokinin and GLP-1. Two things follow from the mechanism. They only work where functioning β cells remain, so they are useless in type 1 diabetes and lose effect in long-standing type 2 as β-cell mass declines. And because they release insulin whether or not the glucose is high, they **can cause hypoglycaemia** — unlike metformin, and unlike the GLP-1 agonists whose effect is glucose-dependent.

## answer_c
Thiazolidinediones

## explanation_c
Incorrect. Thiazolidinediones are insulin sensitisers acting on adipose tissue and muscle through PPAR-γ. They improve insulin *action*; like metformin they do not stimulate secretion.

## answer_d
Insulin

## explanation_d
Incorrect on a definition rather than on pharmacology. Insulin raises the circulating level of the hormone directly by replacing it, so it does not increase *secretion*; and it is injected rather than taken by mouth, so it fails the stem's requirement for an **oral** hypoglycaemic drug.

## topic
Insulin and diabetes mellitus

## subtopic
Treatment of diabetes mellitus

## main_concept
CON-END-2ED4BD533EA0E3

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Treatment

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
74

## exam_relevance
8

## clinical_relevance
0.9

## academic_relevance
0.7

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-END-TOP-8B80E93DAE

## resource_ids

## learning_objective
Assign each oral antidiabetic class to secretagogue or sensitiser, and explain which can cause hypoglycaemia.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 110 (file page 117), question 14; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p117-q14, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 14 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
main_concept is the live concept CON-END-2ED4BD533EA0E3, which names sulfonylureas among the insulin secretagogues. The department orientation sets "Compare: Mode of action of sulfonylureas and metformin" as a written question. Draft status; no dose appears anywhere in this item because no source in this corpus states one. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-BB1CF8D99E01

## title
Type 1 diabetes mellitus is characterised by which of the following?

## question
Type 1 diabetes mellitus is characterised by which of the following?

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 118, printed page 111, printed question 15, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
It is caused by an absolute deficiency of insulin

## explanation_a
Correct, and the word carrying the weight is **absolute**. Type 1 diabetes follows destruction of the pancreatic β cells, so insulin production ceases altogether rather than merely falling short of demand. Everything characteristic of the disease follows from that totality: there is no insulin to restrain lipolysis, so ketoacidosis is a constant risk; there is nothing to make more sensitive, so diet and exercise cannot substitute for treatment; and replacement with injected insulin is not one option among several but the only one.

## answer_b
Impaired insulin secretion

## explanation_b
Incorrect as the *best* answer, and this is a question about precision rather than about right and wrong. Insulin secretion is certainly impaired — but "impaired" describes the **partial, progressive** β-cell failure of type 2 diabetes, where secretion is inadequate for the demand created by resistance while never ceasing. A statement true of both types cannot characterise one of them.

## answer_c
Increased insulin resistance

## explanation_c
Incorrect. Increased insulin resistance is the defining feature of **type 2** diabetes. Type 1 patients have normal insulin sensitivity; their tissues would respond perfectly well to insulin if any were present.

## answer_d
Excessive hepatic glucose production

## explanation_d
Incorrect as a characterisation, though the phenomenon is real. Excessive hepatic glucose production occurs in both types, because it is the consequence of a low insulin-to-glucagon ratio wherever that arises. It is a shared downstream effect, not the lesion that distinguishes type 1.

## topic
Insulin and diabetes mellitus

## subtopic
Classification of diabetes mellitus

## main_concept
CON-END-85750744126501

## concept_ids
CON-END-3DCCBF7739DD59

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
58

## exam_relevance
8

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
Identify absolute insulin deficiency as the defining lesion of type 1 diabetes, and reject features shared with type 2.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 111 (file page 118), question 15; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p118-q15, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 15 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
This item and item 6 test the same type 1 versus type 2 concept from different angles and are two occurrences of it. The live concept CON-END-3DCCBF7739DD59 defines diabetes as impaired secretion, action or both, and is tagged as also-assessed. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-C122F5B8C680

## title
Which of the following is a criterion for the diagnosis of diabetes?

## question
Which of the following is a criterion for the diagnosis of diabetes?

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 118, printed page 111, printed question 16, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Fasting blood glucose from 100-125 mg/dl

## explanation_a
Incorrect, and it is the band immediately below the threshold. 100 to 125 mg/dL fasting is **pre-diabetes**, not diabetes; the diagnostic fasting value is 126 mg/dL or above. Choosing this is the commonest way to over-diagnose on paper.

## answer_b
2-hour postprandial glucose >100 mg/dl

## explanation_b
Incorrect, and the number is far too low. A 2-hour post-prandial glucose is expected to return to **under 140 mg/dL** in a normal person — the department book states exactly that. The diagnostic threshold on a 2-hour value is 200 mg/dL, so ">100" would classify most healthy people as diabetic.

## answer_c
HbA1c > 6.5%

## explanation_c
Correct. An **HbA1c of 6.5% or above** is one of the accepted diagnostic criteria, alongside a fasting plasma glucose of 126 mg/dL or above, a 2-hour value of 200 mg/dL or above on an oral glucose tolerance test, and a random glucose of 200 mg/dL or above in a patient with the classical symptoms of polyuria, polydipsia and weight loss. HbA1c earns its place among them because it is independent of the last meal and of a single day's illness, reflecting average glucose over the preceding two to three months. The rule that keeps these four straight is that every threshold is a **cut-off with a direction**: three of them are 126, 200 and 200 mg/dL, and the fourth is 6.5%.

## answer_d
Random blood glucose about 100 mg/dl with classical symptoms

## explanation_d
Incorrect on the number, not on the principle. A random glucose *does* diagnose diabetes when the classical symptoms are present — but the threshold is **200 mg/dL or above**, and a random value of about 100 mg/dL is entirely normal.

## topic
Insulin and diabetes mellitus

## subtopic
Diagnosis of diabetes mellitus

## main_concept
CON-END-AC5B11BA2F2BCA

## concept_ids
CON-END-839E4F7D92FBEF

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
62

## exam_relevance
9

## clinical_relevance
0.9

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
List the diagnostic criteria for diabetes mellitus with their thresholds, and reject values that describe normality or pre-diabetes.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 111 (file page 118), question 16; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p118-q16, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 16 is C, agreeing with the extraction.
OCR repair: The stem was extracted as "The criteria for the diagnosis of diabetes are:" with option c as "HBAIC > 6.5%". The option is written as HbA1c; the stem is rephrased in the singular to match a single-best-answer item.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
The normal 2-hour post-prandial value of <140 mg/dL used in explanation B is the department book's own, file page 53. The diagnostic thresholds themselves are from the question book. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-0FF9BDDC0C71

## title
Insulin deficiency is associated with:

## question
Insulin deficiency is associated with:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 118, printed page 111, printed question 17, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Reduced lipolysis

## explanation_a
Incorrect, and it is the inverse. Insulin is the only hormone that inhibits lipolysis, doing so by stimulating phosphodiesterase to destroy cAMP and by activating lipase phosphatase. Remove insulin and hormone-sensitive lipase stays phosphorylated and active, so lipolysis **increases** and free fatty acids pour into the plasma.

## answer_b
Increased ketogenesis

## explanation_b
Correct, and it is the end of the chain the other three options each get backwards. Insulin deficiency raises the **anti-insulin to insulin ratio**, which is the single condition every cause of ketosis shares. Three things then happen in the liver at once. Lipolysis floods it with free fatty acids. β-oxidation accelerates, generating acetyl-CoA, NADH and ATP faster than the citric acid cycle can absorb them. And gluconeogenesis, running hard, drains the oxaloacetate that citrate synthase would need to condense with acetyl-CoA — so the acetyl-CoA has nowhere to go but into HMG-CoA and out as ketone bodies. Ketogenesis outstrips ketolysis, ketone bodies accumulate in blood and urine, and because they are acids the result is acidosis. This is exactly why severe uncontrolled diabetes appears on the department book's list of causes of ketosis alongside starvation.

## answer_c
Reduced gluconeogenesis

## explanation_c
Incorrect. Gluconeogenesis is **increased**, not reduced. Insulin normally suppresses it, and glucagon in its absence stimulates it — which is why the hyperglycaemia of insulin deficiency is driven as much by hepatic glucose output as by failed peripheral uptake.

## answer_d
Reduced proteolysis

## explanation_d
Incorrect. Proteolysis is **increased**. Insulin is anabolic for protein as well as for fat and carbohydrate, so its absence releases muscle protein breakdown, supplying amino acids for gluconeogenesis and contributing to the weight loss that is a classical presenting symptom.

## topic
Insulin and diabetes mellitus

## subtopic
Metabolic consequences of insulin deficiency

## main_concept
CON-END-CC450A236ABF50

## concept_ids
CON-END-3EA6071BAE8130

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
3

## inferred_difficulty
62

## exam_relevance
9

## clinical_relevance
0.85

## academic_relevance
0.9

## exam_weight_by_year
KAU_Y1=0.8

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-KETOSIS

## resource_ids

## learning_objective
Predict the direction of lipolysis, gluconeogenesis, proteolysis and ketogenesis in insulin deficiency, from insulin's normal action on each.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 111 (file page 118), question 17; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p118-q17, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 17 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
main_concept is the existing 103 concept CON-END-CC450A236ABF50, "Ketosis is what happens when ketogenesis outruns ketolysis, and every cause is a state of high anti-insulin to insulin ratio", taught by ART-103-BIO-KETOSIS. The live concept CON-END-3EA6071BAE8130 covers the carbohydrate half and is tagged as also-assessed. Nothing new was minted. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-99559E79D230

## title
The test for checking the mean plasma glucose concentration over the previous 8-10 weeks is:

## question
The test for checking the mean plasma glucose concentration over the previous 8-10 weeks is:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 118, printed page 111, printed question 18, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Haemoglobin A1C

## explanation_a
Correct. **HbA1c** is the long-window test, and the window is set by biology rather than by convention. Glucose attaches non-enzymatically to the N-terminal valine of the haemoglobin β chain, the reaction is irreversible, and the label is therefore carried for the remaining life of that red cell — about 120 days. The measured value is a weighted average of glucose exposure over roughly the preceding 8 to 12 weeks, weighted towards the more recent weeks because younger cells outnumber older ones. Because it cannot be manipulated by fasting on the morning of the test, it is the standard measure of long-term control.

## answer_b
Oral glucose tolerance test

## explanation_b
Incorrect. An oral glucose tolerance test measures the response to a **single** standardised glucose load over two hours. It is a snapshot of how the body handles one challenge on one day — informative about β-cell reserve and about gestational diabetes, and useless as a record of the previous two months.

## answer_c
Fasting plasma glucose level

## explanation_c
Incorrect. A fasting plasma glucose is a **single point in time**, reflecting the last several hours only. Two patients with identical fasting values can have very different average control, which is precisely the gap HbA1c fills.

## answer_d
Plasma fructosamine

## explanation_d
Incorrect, and it is the sharpest distractor because it is a genuine glycation marker. Fructosamine is glycated **serum protein**, chiefly albumin, and albumin turns over in about two to three weeks — so fructosamine reports on roughly the preceding **2 to 3 weeks**, not 8 to 10. It is the test used when HbA1c is unreliable, as in haemolytic anaemia or recent blood loss, where a shortened red cell lifespan falsely lowers the HbA1c. The window each marker reports is set by the lifespan of the protein carrying it, and that single idea distinguishes the two.

## topic
Insulin and diabetes mellitus

## subtopic
Glycated haemoglobin

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
66

## exam_relevance
8

## clinical_relevance
0.9

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
Match a glycation marker to the period it reports, and explain why the red cell and albumin lifespans set those periods.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 111 (file page 118), question 18; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p118-q18, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 18 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
This item and item 10 test the same HbA1c concept and are two occurrences of it. Note the internal inconsistency in the question book itself: item 10 offers "4 weeks" as a wrong option while this item's stem says 8-10 weeks. Neither figure is in the department textbook, which has no diabetes chapter. Flagged for the faculty reviewer. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-8525AE601CA4

## title
Type 1 diabetes is primarily treated by:

## question
Type 1 diabetes is primarily treated by:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 118, printed page 111, printed question 19, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Diet and exercise

## explanation_a
Incorrect as the *primary* treatment, though diet and exercise matter for every diabetic patient. They are first-line in **type 2** diabetes, where they reduce insulin resistance and can restore control on their own. In type 1 there is no endogenous insulin for improved sensitivity to act on, so they adjust the dose required and never replace it.

## answer_b
Oral hypoglycaemic drugs

## explanation_b
Incorrect, and the reason is mechanical rather than a matter of preference. The sulphonylureas work by stimulating the β cell to release stored insulin — and in type 1 diabetes the β cells have been destroyed, so there is nothing to stimulate. A drug that acts on an absent cell cannot work, whatever the dose.

## answer_c
Insulin injection

## explanation_c
Correct. Type 1 diabetes is an **absolute** deficiency of insulin, so the treatment is replacement of the missing hormone. Insulin must be injected because it is a 51-amino-acid protein and would be digested by gastric and pancreatic proteases if swallowed — the same reason no peptide hormone is given by mouth. This is also the one form of diabetes in which stopping treatment is rapidly dangerous: without insulin, lipolysis is unrestrained, ketogenesis outruns ketolysis, and ketoacidosis develops within a day or two.

## answer_d
Acarbose

## explanation_d
Incorrect. Acarbose is an α-glucosidase inhibitor that slows the digestion of complex carbohydrate in the gut and blunts the post-meal glucose rise. It modifies absorption and does nothing about the absent hormone, so it can be at most an adjunct.

## topic
Insulin and diabetes mellitus

## subtopic
Treatment of diabetes mellitus

## main_concept
CON-END-85750744126501

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Treatment

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
82

## exam_relevance
8

## clinical_relevance
0.95

## academic_relevance
0.75

## exam_weight_by_year
KAU_Y1=0.65

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
State the primary treatment of type 1 diabetes and explain from the mechanism why oral secretagogues cannot substitute for it.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 111 (file page 118), question 19; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p118-q19, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
The extraction recorded correct: null with correctSource "none". The printed answer key on file page 119 (printed 112) was opened with the Read tool and read visually: item 19 is C. Recovered, not inferred.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
Draft status and no dose or regimen appears anywhere in this item, because no source in this corpus states one. This is treatment content and must not auto-publish. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-AE21D14D1295

## title
Which of the following enzymes is involved in the conversion of glucose to sorbitol?

## question
Which of the following enzymes is involved in the conversion of glucose to sorbitol?

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 118, printed page 111, printed question 20, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Galactokinase

## explanation_a
Incorrect. Galactokinase phosphorylates galactose to galactose-1-phosphate, the first step of the Leloir pathway, and its deficiency causes a form of galactosaemia in which cataract is the main feature. The cataract connection is what makes this option tempting — but that cataract arises through galactitol, formed by the same aldose reductase named in option C, not through galactokinase itself.

## answer_b
Glucokinase

## explanation_b
Incorrect. Glucokinase is the hepatic hexokinase isoform, phosphorylating glucose to glucose-6-phosphate with a high Km so that the liver takes up glucose in proportion to how much arrives. It commits glucose to glycolysis and glycogen synthesis, not to the polyol pathway.

## answer_c
Aldose reductase

## explanation_c
Correct. **Aldose reductase** reduces glucose to **sorbitol**, using NADPH; sorbitol dehydrogenase then oxidises sorbitol to fructose. This is the **polyol pathway**, and it matters in diabetes because of which tissues run it and how. Aldose reductase has a high Km, so it only handles significant amounts of glucose when glucose is high — and it operates in tissues whose glucose uptake is **insulin-independent**: the lens, retina, kidney, Schwann cells and peripheral nerve. Those tissues cannot protect themselves by reducing uptake, so intracellular glucose rises with the plasma level. Sorbitol is polar and crosses membranes poorly, so it is trapped; it accumulates, draws water in osmotically, and the pathway also consumes NADPH, weakening glutathione-dependent antioxidant defence. The result is the classic triad of cataract, retinopathy and peripheral neuropathy in poorly controlled diabetes, and it is why the department orientation asks students to explain on a biochemical basis how uncontrolled diabetes causes cataract.

## answer_d
Aldolase B

## explanation_d
Incorrect. Aldolase B splits fructose-1-phosphate in fructose metabolism, and its deficiency causes hereditary fructose intolerance. It appears here because sorbitol is converted onward to fructose, so the name sits near the pathway without being part of this step.

## topic
Insulin and diabetes mellitus

## subtopic
Polyol pathway

## main_concept
CON-END-5D8DA0351D0C94

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.6

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
56

## exam_relevance
8

## clinical_relevance
0.85

## academic_relevance
0.85

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
Name the enzyme of the polyol pathway and explain why sorbitol accumulation damages the lens and peripheral nerve specifically.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 111 (file page 118), question 20; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
75

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p118-q20, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 20 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
Neither "sorbitol" nor "aldose reductase" appears anywhere in the 103 department biochemistry book — the cached page text was searched for both. The department orientation nonetheless sets "explain on biochemical basis: uncontrolled diabetes can cause cataract", which is this pathway. Source is the question book plus that orientation. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-ECB443DD84B9

## title
Which of the following is a long-term complication of diabetes mellitus?

## question
Which of the following is a long-term complication of diabetes mellitus?

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 118, printed page 111, printed question 21, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Acute renal failure

## explanation_a
Incorrect, and the disqualifying word is in the option itself. **Acute** renal failure develops over hours to days and is not a long-term complication of anything. Diabetes damages the kidney chronically and progressively, through the glomerular capillaries, and the name for that is nephropathy.

## answer_b
Bronchial asthma

## explanation_b
Incorrect. Bronchial asthma is a chronic inflammatory airway disease with its own causes; it is not caused by diabetes and has no place on this list.

## answer_c
Liver cell failure

## explanation_c
Incorrect, and it is a plausible-sounding trap because the liver is so central to the metabolic disturbance of diabetes. Diabetes is associated with fatty liver, and severe liver disease can in turn impair glucose homeostasis — the department book lists severe liver disease among the causes of fasting hypoglycaemia. But liver cell failure is not one of the recognised chronic complications, which are defined by damage to blood vessels.

## answer_d
Nephropathy

## explanation_d
Correct. **Diabetic nephropathy** is a microvascular complication, beginning with damage to the glomerular capillaries and detected first as microalbuminuria, progressing through proteinuria to declining filtration and eventually end-stage renal disease. It belongs with retinopathy and neuropathy in the microvascular group, whose severity tracks the duration and degree of hyperglycaemia most closely; the macrovascular group — coronary, cerebrovascular and peripheral arterial disease — is the other half of the picture. The unifying idea is that the chronic complications of diabetes are **vascular** complications, sorted by the size of the vessel involved, which is why the correct answer to any question of this shape is always an organ whose damage runs through its blood supply.

## topic
Insulin and diabetes mellitus

## subtopic
Complications of diabetes mellitus

## main_concept
CON-END-F0182CA8A56EA7

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
80

## exam_relevance
8

## clinical_relevance
0.9

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
Recognise nephropathy as a chronic microvascular complication and reject acute or unrelated conditions.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 111 (file page 118), question 21; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p118-q21, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 21 is D, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
This item and item 8 test the same complications concept from opposite sides of the micro/macro division and are two occurrences of it. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-3CCBEAE6AD1D

## title
Hyperglycaemic hyperosmolar coma is characterised by:

## question
Hyperglycaemic hyperosmolar coma is characterised by:

## vignette

## subject
endo

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 119, printed page 112, printed question 22, chapter "Biochemistry Of Diabetes Mellitus". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Blood glucose level is high, around 300 mg/dL

## explanation_a
Incorrect on the number, and the number is what defines the syndrome. 300 mg/dL is a high glucose, but it is the sort of value seen in diabetic ketoacidosis or in any poorly controlled diabetic. Hyperosmolar coma is characterised by **extreme** hyperglycaemia, typically 600 mg/dL or higher, and that extremity is exactly why the osmolarity rises far enough to cause coma.

## answer_b
Increased loss of ketones in urine

## explanation_b
Incorrect, and it names the feature of the **other** hyperglycaemic emergency. Ketonuria and ketonaemia belong to diabetic ketoacidosis. Hyperosmolar coma is by definition non-ketotic: enough residual insulin remains — this is characteristically a complication of type 2 diabetes — to restrain lipolysis and keep ketogenesis from outrunning ketolysis, even though it is nowhere near enough to control the blood glucose.

## answer_c
Moist skin

## explanation_c
Incorrect, and it is the opposite sign. Extreme hyperglycaemia exceeds the renal threshold of about 180 mg/dL by a wide margin, so glucose is lost in the urine and drags water with it in an osmotic diuresis. The patient becomes profoundly dehydrated and the skin and mucous membranes are **dry**. Moist or wet skin points instead to hypoglycaemia, where the sympatho-adrenal discharge causes sweating.

## answer_d
Coma is due to hyperosmolarity

## explanation_d
Correct, and it is the mechanism the name records. Very high plasma glucose raises the plasma osmolarity directly; the osmotic diuresis that follows removes water faster than solute and concentrates it further. Water is then drawn out of cells, including neurons, and the resulting cellular dehydration is what depresses consciousness. The contrast with diabetic ketoacidosis is the point of the question and the department orientation sets it as a written comparison: **DKA impairs consciousness through acidosis, hyperosmolar coma through dehydration and hyperosmolarity**. That difference dictates the emphasis of treatment, and it explains why the two look different at the bedside — Kussmaul breathing and a fruity breath in one, profound dehydration without acidosis in the other.

## topic
Insulin and diabetes mellitus

## subtopic
Acute complications of diabetes mellitus

## main_concept
CON-END-68CC8CA610DF37

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.6

## setting
Clinical

## reasoning_level
3

## inferred_difficulty
58

## exam_relevance
8

## clinical_relevance
0.95

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.7

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry

## question_only_for

## library_ids
ART-103-BIO-DIABETES-MELLITUS

## resource_ids

## learning_objective
Explain the mechanism of coma in the hyperosmolar state and distinguish it from diabetic ketoacidosis.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Biochemistry Of Diabetes Mellitus", printed page 112 (file page 119), question 22; printed answer key on printed page 112. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p119-q22, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p119)". The key page (file page 119, printed 112) was re-read visually and item 22 is D, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
The renal threshold of 180 mg/dL is the department book's own figure, file page 57. The hyperosmolar syndrome itself is not in the textbook, which has no diabetes chapter; the department orientation sets "Compare: DKA and hyperosmolar coma" as a written question. module_subject stops at "103 BMS > Biochemistry". The question book has a "Biochemistry Of Diabetes Mellitus" chapter; the subject tree, built from the department TEXTBOOK's contents page, has no node for it, because that textbook has no diabetes chapter. No node was invented and this item was not filed under Carbohydrate Metabolism to make it fit. Decision owed to a faculty reviewer.

---

# Item

## id
QM-103-D23A103860C2

## title
After digestion of a high-carbohydrate meal, which one of the following is most likely to occur?

## question
After digestion of a high-carbohydrate meal, which one of the following is most likely to occur?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 135, printed page 128, printed question 1, chapter "Metabolic Integration In Feed-Starve Cycle". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Glucagon is released from the pancreas

## explanation_a
Incorrect, and it is the wrong half of the reciprocal pair. A carbohydrate meal raises blood glucose, which raises **insulin** and **lowers** glucagon. Glucagon is secreted by the α cells in response to a fall in glucose, and the insulin-to-glucagon ratio is the main regulator of blood glucose — so in the well-fed state that ratio is high, not low.

## answer_b
Insulin stimulates the transport of glucose into the brain

## explanation_b
Incorrect, and the error is about which tissues need insulin at all. Glucose enters the brain on **insulin-independent** transporters, and the department book states plainly that in early fasting the brain is "not affected by ↓ insulin" and continues to use glucose. That independence is deliberate physiology: the brain must be supplied whatever the hormonal state, so its uptake is never gated by a hormone. The insulin-dependent transporter, **GLUT-4**, serves skeletal muscle, cardiac muscle and adipose tissue — the tissues that can afford to wait.

## answer_c
Liver and skeletal muscle use glucose as their major fuel

## explanation_c
Correct. In the well-fed state, 0 to 4 hours after a meal, the main fuel is **glucose** supplied by ingested carbohydrate and the predominant hormone is **insulin**. Insulin raises glucose uptake through GLUT-4 in muscle and adipose tissue, and the liver takes glucose up through GLUT-2 in proportion to how much arrives in the portal blood. Each tissue then does its own version of the same thing: the liver increases glycolysis, glycogenesis, lipogenesis and cholesterol synthesis; muscle increases glycolysis, glycogenesis and the incorporation of amino acids into protein; adipose tissue increases glycolysis and lipogenesis and decreases lipolysis. So liver and skeletal muscle are both burning glucose, and both are storing the surplus.

## answer_d
Skeletal muscles convert glucose to fatty acids

## explanation_d
Incorrect, and it puts the right pathway in the wrong tissue. Lipogenesis from glucose occurs in the **liver, adipose tissue and lactating mammary gland**, not in skeletal muscle. Muscle stores its surplus glucose as glycogen and uses incoming amino acids for protein synthesis; it is not a site of fat manufacture.

## topic
Metabolic integration

## subtopic
Well-fed state

## main_concept
CON-FND-85583A59349A47

## concept_ids
CON-FND-1C668119B3C0BB

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
60

## exam_relevance
2

## clinical_relevance
0.4

## academic_relevance
0.7

## exam_weight_by_year
KAU_Y1=0.1

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolic Integrations

## question_only_for

## library_ids
ART-103-BIO-FEED-STARVE-CYCLE

## resource_ids

## learning_objective
State the main fuel and predominant hormone of the well-fed state, and assign each tissue its metabolic response.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Metabolic Integration In Feed-Starve Cycle", printed page 128 (file page 135), question 1; printed answer key on printed page 129. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p135-q1, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p136)". The key page (file page 136, printed 129) was re-read visually and item 1 is C, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
EXAM STATUS. The Biochemistry department's orientation for 2025-2026 (src_90b75d63a73cfc7649b9) cancels row 10 of its own table, "Metabolic integration — 109-114", from BOTH the end-of-module and the final exam; those printed pages are exactly this chapter of the department book. The item is kept because a cancelled topic still appears in the question book and a student may still meet it, but exam_relevance and exam_weight_by_year are written low and do not claim it is examined. Any concept minted from it carries a low weight_confidence for the same reason.

---

# Item

## id
QM-103-DD3FF16C4ABE

## title
The body's main fuel during late fasting is:

## question
The body's main fuel during late fasting is:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 135, printed page 128, printed question 2, chapter "Metabolic Integration In Feed-Starve Cycle". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Amino acids

## explanation_a
Incorrect for this stage, though amino acids do matter here. In late fasting, 18 to 48 hours, muscle protein is broken down and alanine is exported to the liver for gluconeogenesis — but amino acids are being used as a **substrate for making glucose**, not burned as the body's main fuel. They become the fuel of last resort only after the triacylglycerol stores are exhausted in prolonged starvation, and by then death is close.

## answer_b
Fatty acids

## explanation_b
Correct. The department book states it directly for this stage: the main fuel source is **fatty acids supplied mainly by adipose tissue lipolysis**, and the predominant hormones are the anti-insulin ones, chiefly glucagon and the catecholamines. By 18 hours the glycogen stores are significantly depleted, so the body switches "from glucose-burning into fat-burning mode" — lipolysis, β-oxidation, ketogenesis and ketolysis. Blood glucose is now maintained by gluconeogenesis, and it is preserved for the tissues that have no alternative. Reading the four stages as a sequence of fuels makes the whole chapter one idea: dietary glucose, then hepatic glycogen, then fatty acids, then ketone bodies.

## answer_c
Ketone bodies

## explanation_c
Incorrect for this stage, and it is the nearest miss because ketogenesis has genuinely begun. In late fasting the book says only that "some ketone bodies can also be used as fuel" by the brain; they are a growing contributor rather than the main one. Ketone bodies do not become the major fuel of the brain until several weeks of starvation, which is the **next** stage.

## answer_d
Lactate

## explanation_d
Incorrect. Lactate is a gluconeogenic substrate recycled from muscle and red cells through the Cori cycle, and the book associates it particularly with severe muscular exercise. It carries carbon back to the liver to be rebuilt into glucose; it is not a bulk fuel for the body.

## topic
Metabolic integration

## subtopic
Late fasting state

## main_concept
CON-FND-85583A59349A47

## concept_ids
CON-END-2E748A37DA660A

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
58

## exam_relevance
2

## clinical_relevance
0.4

## academic_relevance
0.7

## exam_weight_by_year
KAU_Y1=0.1

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolic Integrations

## question_only_for

## library_ids
ART-103-BIO-FEED-STARVE-CYCLE

## resource_ids

## learning_objective
Name the main fuel of the late fasting state and distinguish it from the fuel of prolonged starvation.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Metabolic Integration In Feed-Starve Cycle", printed page 128 (file page 135), question 2; printed answer key on printed page 129. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p135-q2, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
The extraction recorded correct: null with correctSource "none". The printed answer key on file page 136 (printed 129) was opened with the Read tool and read visually: item 2 is B. Recovered, not inferred.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
EXAM STATUS. The Biochemistry department's orientation for 2025-2026 (src_90b75d63a73cfc7649b9) cancels row 10 of its own table, "Metabolic integration — 109-114", from BOTH the end-of-module and the final exam; those printed pages are exactly this chapter of the department book. The item is kept because a cancelled topic still appears in the question book and a student may still meet it, but exam_relevance and exam_weight_by_year are written low and do not claim it is examined. Any concept minted from it carries a low weight_confidence for the same reason.

---

# Item

## id
QM-103-D9C151C8AEFE

## title
During starvation, the major fuel of the brain is:

## question
During starvation, the major fuel of the brain is:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 135, printed page 128, printed question 3, chapter "Metabolic Integration In Feed-Starve Cycle". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
B

## answer_a
Glucose

## explanation_a
Incorrect for starvation, though glucose is the brain's fuel at every earlier stage — well-fed, early fasting and late fasting alike. What changes in starvation is that the brain deliberately **reduces** its glucose use to spare it for the red cells, which have no mitochondria and can use nothing else. The book puts the priority explicitly: the first is to provide sufficient glucose for the brain and the tissues that depend on it, the second is to preserve protein.

## answer_b
Ketone bodies

## explanation_b
Correct, and the adaptation is the single most important idea in this chapter. After about 2 to 5 days of starvation the liver makes large amounts of ketone bodies and the brain begins to take roughly a third of its energy from them; the heart does the same. **After several weeks, ketone bodies become the major fuel of the brain.** The reason this matters is not the fuel switch itself but what it prevents. Every gram of glucose the brain does not consume is a gram the liver does not have to make from muscle protein — so the shift reduces gluconeogenesis and spares body protein. Survival time is then set by the size of the triacylglycerol depot, and once that is gone protein degradation accelerates and death follows from failure of respiratory, cardiac, hepatic or renal function.

## answer_c
Fatty acids

## explanation_c
Incorrect, and it is the option that should be eliminated first because a physical barrier makes it impossible. Plasma fatty acids travel bound to **albumin**, and the albumin–fatty acid complex cannot cross the blood–brain barrier. The brain cannot use fatty acids at any stage, in any nutritional state — which is precisely why ketone bodies exist as a water-soluble alternative that needs no carrier.

## answer_d
Amino acids

## explanation_d
Incorrect. Amino acids released from muscle go to the liver as gluconeogenic substrate; the brain does not burn them as a fuel. Confusing "the body is breaking down protein" with "the brain is running on protein" misses the intermediate step, which is that the protein becomes glucose first.

## topic
Metabolic integration

## subtopic
Starvation state

## main_concept
CON-FND-85583A59349A47

## concept_ids
CON-END-2E748A37DA660A

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
2

## inferred_difficulty
74

## exam_relevance
2

## clinical_relevance
0.45

## academic_relevance
0.75

## exam_weight_by_year
KAU_Y1=0.1

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolic Integrations

## question_only_for

## library_ids
ART-103-BIO-FEED-STARVE-CYCLE

## resource_ids

## learning_objective
State the brain's major fuel in prolonged starvation, explain why it cannot use fatty acids, and say what the switch spares.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Metabolic Integration In Feed-Starve Cycle", printed page 128 (file page 135), question 3; printed answer key on printed page 129. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p135-q3, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p136)". The key page (file page 136, printed 129) was re-read visually and item 3 is B, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
EXAM STATUS. The Biochemistry department's orientation for 2025-2026 (src_90b75d63a73cfc7649b9) cancels row 10 of its own table, "Metabolic integration — 109-114", from BOTH the end-of-module and the final exam; those printed pages are exactly this chapter of the department book. The item is kept because a cancelled topic still appears in the question book and a student may still meet it, but exam_relevance and exam_weight_by_year are written low and do not claim it is examined. Any concept minted from it carries a low weight_confidence for the same reason.

---

# Item

## id
QM-103-76C0226B278A

## title
By 24 hours after a meal:

## question
By 24 hours after a meal:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 135, printed page 128, printed question 4, chapter "Metabolic Integration In Feed-Starve Cycle". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Gluconeogenesis in the liver is the major source of blood glucose

## explanation_a
Correct. Twenty-four hours places the body in the **late fasting state**, 18 to 48 hours, and by then hepatic glycogen is significantly depleted — glycogenolysis carried the early fasting period, 4 to 18 hours, and cannot carry this one. The book is explicit that at this stage blood glucose is maintained by **gluconeogenesis**, with the liver as the dominant site. Its substrates are the glycerol released by lipolysis, lactate returning through the Cori cycle, and amino acids from muscle protein, especially alanine.

## answer_b
Muscles convert amino acids to blood glucose

## explanation_b
Incorrect, and it is the trap the department book flags in its own margin: "muscle glycogenolysis cannot contribute directly to plasma glucose". Muscle lacks glucose-6-phosphatase, so it cannot release free glucose into the blood at all. What muscle does is transaminate pyruvate to **alanine** and export that to the liver, where gluconeogenesis converts it to glucose. The conversion happens in the liver, not in the muscle.

## answer_c
Fatty acids released from adipose tissue provide carbon for the synthesis of glucose

## explanation_c
Incorrect, and it is the classic misconception in this whole topic. Fatty acids are oxidised to **acetyl-CoA**, and acetyl-CoA can never be converted to glucose, because the pyruvate dehydrogenase reaction that produced it is irreversible. Fatty acids support gluconeogenesis energetically — their oxidation supplies the ATP the liver spends on it — but they contribute no carbon. The only parts of a triacylglycerol molecule that can become glucose are the **glycerol** backbone and, for an odd-chain fatty acid, the terminal three carbons that leave as propionyl-CoA.

## answer_d
Ketone bodies provide carbon for gluconeogenesis

## explanation_d
Incorrect, and it inverts the flow. Ketone bodies are made **from** acetyl-CoA, downstream of fatty acid oxidation, and they carry the same limitation: extrahepatic tissues oxidise them back to acetyl-CoA and into the citric acid cycle. They are an output of the fasting liver, never an input to gluconeogenesis.

## topic
Metabolic integration

## subtopic
Late fasting state

## main_concept
CON-FND-85583A59349A47

## concept_ids
CON-FND-1B027502822320

## contextual_concept_ids

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
4

## inferred_difficulty
48

## exam_relevance
2

## clinical_relevance
0.4

## academic_relevance
0.8

## exam_weight_by_year
KAU_Y1=0.1

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolic Integrations

## question_only_for

## library_ids
ART-103-BIO-FEED-STARVE-CYCLE

## resource_ids

## learning_objective
Identify hepatic gluconeogenesis as the source of blood glucose at 24 hours, and explain why fatty acid carbon cannot become glucose.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Metabolic Integration In Feed-Starve Cycle", printed page 128 (file page 135), question 4; printed answer key on printed page 129. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
85

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p135-q4, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p136)". The key page (file page 136, printed 129) was re-read visually and item 4 is A, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
EXAM STATUS. The Biochemistry department's orientation for 2025-2026 (src_90b75d63a73cfc7649b9) cancels row 10 of its own table, "Metabolic integration — 109-114", from BOTH the end-of-module and the final exam; those printed pages are exactly this chapter of the department book. The item is kept because a cancelled topic still appears in the question book and a student may still meet it, but exam_relevance and exam_weight_by_year are written low and do not claim it is examined. Any concept minted from it carries a low weight_confidence for the same reason.

---

# Item

## id
QM-103-4DE2B5E3DAAB

## title
Which type of metabolic fuel is used to generate glucose after several weeks of starvation?

## question
Which type of metabolic fuel is used to generate glucose after several weeks of starvation?

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 135, printed page 128, printed question 5, chapter "Metabolic Integration In Feed-Starve Cycle". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
D

## answer_a
Glycogen

## explanation_a
Incorrect. Glycogen is the glucose source of **early** fasting, 4 to 18 hours, and the stores are significantly depleted by 18 to 48 hours. After several weeks there is none left to draw on, so it cannot be the answer whatever else is true.

## answer_b
Fat

## explanation_b
Incorrect, and it is the option that catches the largest number of students because fat genuinely is the dominant *fuel* at this stage. But the stem asks specifically what glucose is **generated from**, and the bulk of a fat molecule cannot become glucose: the fatty acids are oxidised to acetyl-CoA, and the step that makes acetyl-CoA from pyruvate is irreversible. Only the glycerol backbone is gluconeogenic, and it is a small fraction of the molecule. Distinguishing "the main fuel" from "the source of glucose" is exactly what this question is for.

## answer_c
Starch

## explanation_c
Incorrect, and it can be eliminated on definition. Starch is a **dietary** plant polysaccharide. A person who has been starving for several weeks is by definition taking none in.

## answer_d
Amino acids

## explanation_d
Correct. Once the triacylglycerol stores are exhausted, the department book states, "the only source of fuel remains is proteins" — protein degradation accelerates and **amino acids** are the substrate from which the remaining glucose is made. The sequence tells the whole story of survival: gluconeogenesis from protein is deliberately suppressed during the earlier weeks, because the brain's switch to ketone bodies reduces the demand for glucose and therefore spares muscle. That protein-sparing is what makes prolonged starvation survivable at all, and its failure is what ends it — death follows from loss of respiratory, cardiac, hepatic or renal function as the proteins of those organs are consumed.

## topic
Metabolic integration

## subtopic
Starvation state

## main_concept
CON-FND-1B027502822320

## concept_ids
CON-FND-85583A59349A47

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.6

## setting
Academic

## reasoning_level
3

## inferred_difficulty
56

## exam_relevance
2

## clinical_relevance
0.45

## academic_relevance
0.75

## exam_weight_by_year
KAU_Y1=0.1

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolic Integrations

## question_only_for

## library_ids
ART-103-BIO-FEED-STARVE-CYCLE

## resource_ids

## learning_objective
Separate the main fuel of prolonged starvation from the substrate glucose is made from, and explain why fat cannot serve as the latter.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Metabolic Integration In Feed-Starve Cycle", printed page 128 (file page 135), question 5; printed answer key on printed page 129. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p135-q5, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p136)". The key page (file page 136, printed 129) was re-read visually and item 5 is D, agreeing with the extraction.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
EXAM STATUS. The Biochemistry department's orientation for 2025-2026 (src_90b75d63a73cfc7649b9) cancels row 10 of its own table, "Metabolic integration — 109-114", from BOTH the end-of-module and the final exam; those printed pages are exactly this chapter of the department book. The item is kept because a cancelled topic still appears in the question book and a student may still meet it, but exam_relevance and exam_weight_by_year are written low and do not claim it is examined. Any concept minted from it carries a low weight_confidence for the same reason.

---

# Item

## id
QM-103-B11C0C275153

## title
During early fasting, glucose is derived from:

## question
During early fasting, glucose is derived from:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 135, printed page 128, printed question 6, chapter "Metabolic Integration In Feed-Starve Cycle". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
A

## answer_a
Glycogen

## explanation_a
Correct. The early fasting state runs from **4 to 18 hours** after a meal. Plasma glucose falls, insulin secretion drops and glucagon rises, and the book states that in this phase the main fuel is glucose supplied mainly by **hepatic glycogenolysis**, with glucagon as the predominant hormone. Glycogen is used first for a simple reason: it is already glucose, stored ready-made, so releasing it is fast and costs almost nothing. Gluconeogenesis is slower and expensive in ATP, so the body defers it until the cheap store runs out — which is why the stages are ordered as they are.

## answer_b
Amino acids

## explanation_b
Incorrect for this stage. Amino acids become an important gluconeogenic substrate in **late** fasting, once glycogen is depleted, and the dominant one is alanine arriving from muscle. Using them at 4 to 18 hours would mean breaking down muscle while a ready supply of glucose was still sitting in the liver.

## answer_c
Fatty acids

## explanation_c
Incorrect at any stage, and it is the same misconception the earlier items catch. Fatty acids are oxidised to acetyl-CoA, which cannot be converted to glucose because pyruvate dehydrogenase is irreversible. β-oxidation does rise in early fasting — in liver and muscle both — but it supplies energy, not glucose carbon.

## answer_d
Ketone bodies

## explanation_d
Incorrect. Ketone bodies are made from acetyl-CoA and are burned back to acetyl-CoA; they are a product of the fasting liver, not a precursor of glucose. In early fasting they are barely being made yet, since ketogenesis becomes prominent only in the late fasting and starvation states.

## topic
Metabolic integration

## subtopic
Early fasting state

## main_concept
CON-FND-85583A59349A47

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
76

## exam_relevance
2

## clinical_relevance
0.4

## academic_relevance
0.75

## exam_weight_by_year
KAU_Y1=0.1

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolic Integrations

## question_only_for

## library_ids
ART-103-BIO-FEED-STARVE-CYCLE

## resource_ids

## learning_objective
Name the source of blood glucose in early fasting and explain why glycogen is used before gluconeogenesis.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Metabolic Integration In Feed-Starve Cycle", printed page 128 (file page 135), question 6; printed answer key on printed page 129. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p135-q6, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
correctSource, verbatim: "printed key (p136)". The key page (file page 136, printed 129) was re-read visually and item 6 is A, agreeing with the extraction.
OCR repair: The extraction rendered option a as "Glycogen :" with a trailing colon picked up from the printed layout. Written here as "Glycogen".
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
EXAM STATUS. The Biochemistry department's orientation for 2025-2026 (src_90b75d63a73cfc7649b9) cancels row 10 of its own table, "Metabolic integration — 109-114", from BOTH the end-of-module and the final exam; those printed pages are exactly this chapter of the department book. The item is kept because a cancelled topic still appears in the question book and a student may still meet it, but exam_relevance and exam_weight_by_year are written low and do not claim it is examined. Any concept minted from it carries a low weight_confidence for the same reason.

---

# Item

## id
QM-103-33BFA27554FC

## title
During starvation, the major glucogenic amino acid is:

## question
During starvation, the major glucogenic amino acid is:

## vignette

## subject
fnd

## status
Draft

## owner
Claude

## format
single best answer

## derived_from
Transcribed from the Kasr Al Ainy Biochemistry department MCQ book (src_07f0a0ff41addf826c7f), file page 136, printed page 129, printed question 7, chapter "Metabolic Integration In Feed-Starve Cycle". Extracted by the 102 INT lane and tagged as taught by 103 BMS.

## correct_answer
C

## answer_a
Threonine

## explanation_a
Incorrect. Threonine is glucogenic and ketogenic, and it is a minor contributor. It is also one of the eight individual amino acids the department cancels from both exams, so it is not material a student is expected to hold in this much detail.

## answer_b
Lysine

## explanation_b
Incorrect, and it is wrong by category rather than by degree. **Lysine is purely ketogenic** — together with leucine it is one of the only two amino acids that cannot yield glucose at all, because its carbon skeleton is degraded to acetyl-CoA and acetoacetyl-CoA. Offering it here catches a student who is guessing among amino acid names without having sorted them into glucogenic and ketogenic.

## answer_c
Alanine

## explanation_c
Correct. **Alanine** is the major glucogenic amino acid of fasting, and the reason is the **glucose–alanine cycle** the department book sets out. In muscle, glycolysis produces pyruvate; when muscle protein is broken down, the amino group from other amino acids is transferred onto that pyruvate by transamination, producing alanine. Alanine travels to the liver, where it is transaminated back to pyruvate and rebuilt into glucose, and the nitrogen it carried enters the urea cycle. The cycle solves two problems with one carrier: it moves gluconeogenic carbon out of muscle, and it exports waste nitrogen safely, without releasing free ammonia into the blood. That dual function is why alanine, rather than any other amino acid, dominates.

## answer_d
Glycine

## explanation_d
Incorrect. Glycine is glucogenic — it can be converted to serine and then to pyruvate — but it is a minor contributor and it has no dedicated inter-organ transport role. Alanine is the one with a named cycle built around it.

## topic
Metabolic integration

## subtopic
Glucose-alanine cycle

## main_concept
CON-FND-1B027502822320

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

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
58

## exam_relevance
2

## clinical_relevance
0.35

## academic_relevance
0.75

## exam_weight_by_year
KAU_Y1=0.1

## years
KAU_Y1

## universities
kau

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolic Integrations

## question_only_for

## library_ids
ART-103-BIO-FEED-STARVE-CYCLE

## resource_ids

## learning_objective
Name the major glucogenic amino acid of fasting and describe the two jobs the glucose-alanine cycle performs at once.

## source_citation
Kasr Al Ainy, Department of Biochemistry MCQ book for modules 102 and 103, chapter "Metabolic Integration In Feed-Starve Cycle", printed page 129 (file page 136), question 7; printed answer key on printed page 129. Manifest src_07f0a0ff41addf826c7f.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
65

## randomise_answers
yes

## author_notes
Extraction id MCQ-102-07f0a0ff-p136-q7, produced by the 102 INT lane from src_07f0a0ff41addf826c7f and tagged as taught by 103 BMS; this lane did not re-read the PDF except for the pages named below.
The extraction recorded correct: null with correctSource "none". The printed answer key on file page 136 (printed 129) was opened with the Read tool and read visually: item 7 is C. Recovered, not inferred.
No OCR repair was needed; the stem and all options came through the extraction intact.
resource_ids is deliberately empty: it resolves against the catalogue store, not the evidence store the manifest feeds, so naming src_07f0a0ff41addf826c7f there would error. The source is carried in source_citation and derived_from instead.
The glucose-alanine cycle is stated in the department book at file page 54 and again at 115. EXAM STATUS. The Biochemistry department's orientation for 2025-2026 (src_90b75d63a73cfc7649b9) cancels row 10 of its own table, "Metabolic integration — 109-114", from BOTH the end-of-module and the final exam; those printed pages are exactly this chapter of the department book. The item is kept because a cancelled topic still appears in the question book and a student may still meet it, but exam_relevance and exam_weight_by_year are written low and do not claim it is examined. Any concept minted from it carries a low weight_confidence for the same reason.
