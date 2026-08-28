<!--
  103 BMS · Section 1 of the 2025 end-of-year paper as sittable written questions.

  Source of the questions: EOY (BMS - 103) 199 (2).pdf, manifest
  src_37f6c0daf3436096af19 — Kasr Al Ainy module 103 BMS, end of year, sat 2025
  by batch 199. Section 1: Biochemistry, pages 1-8. Seven written questions here,
  covering groups I (Enumerate), II (Diagrams) and III (Cases). Group IV, the
  ten-vitamin matching block on page 8, is a matching question and not a written
  one, so it lives in its own file:
  docs/Kasr-Source-Imports/question/103-BMS-EOY-2025-biochemistry-matching.md

  Source of the mark schemes: the solved twin, EOY (BMS - 103) 199 [Solved] (3).pdf,
  manifest src_a2e23ffc50b6b2e24897.

  ── HOW THE SOLVED COPY WAS READ, AND WHY IT MATTERS ──────────────────────────

  The solved copy carries its model answers two different ways, and only one of
  them extracts. Comparing extracted character counts page by page against the
  blank paper:

      pages 1-4, 7    ratio 1.7-1.9   the answers ARE in the text layer
      pages 5, 6, 8   ratio 1.02-1.06 the answers are NOT in the text layer

  On pages 5, 6 and 8 the model answers exist only as highlighted image overlays.
  Extracting those pages returns the printed question and rows of dotted answer
  lines and nothing else — which reads like a paper whose answers were never
  written rather than like a failed extraction, and is exactly how a whole case
  gets imported with an empty mark scheme. Pages 5, 6 and 8 were therefore opened
  and read off the page render. Pages 1-4 and 7 extract properly and were read
  from the text layer, then checked against the render.

  Every page 1-8 of both copies was looked at, solved and unsolved.

  ── THE fi/fl LIGATURES ───────────────────────────────────────────────────────

  The unsolved copy's text layer drops fi and fl throughout and strands them at
  the foot of the page: "de ciency" for deficiency, "in ammation" for
  inflammation, "a topi-crystals" for tophi-crystals, "CO2 xation" for CO2
  fixation. Each was repaired against the page render, not guessed. The solved
  copy renders them correctly where its text is native, which is a second check
  on the same words.

  ── WHAT THE PAPER PRINTS AND WHAT IS AUTHORED HERE ───────────────────────────

  Group I is one question with five parts at {2 Marks} each, because that is one
  question on the page: the examiner heads it "Enumerate two of the following"
  and a candidate answers two of the five for four marks. Splitting it into five
  questions would tell a student to answer all five and would put ten marks on a
  four-mark item.

  Groups II and III are one question per diagram and one per case, each with the
  paper's own lettered parts and the paper's own marks. Nothing is apportioned
  and nothing is invented: every mark below is printed on the page in braces.

  Transcribed, not derived. `derived_from` is blank throughout — these are the
  paper's own questions, and a written question may only be derived from another
  written question, so there is nothing to name.

  ── THE DOUBLED "b" ON PAGE 5 ─────────────────────────────────────────────────

  Case (1) is lettered a, b, b, c, d on the paper — "b" twice and no "e". Page 5
  was read visually to confirm this is the paper and not the extractor. It is the
  paper. `written_parts` uses correct sequential letters a-e, because two parts
  sharing an id would collide in `markWritten` and the second would shadow the
  first. The examiner's own lettering is recorded in `author_notes`, which is the
  only place it belongs.

  ── THE DRUG QUESTION ─────────────────────────────────────────────────────────

  Case (2)(d) asks which drugs lower blood urate. The department book names
  allopurinol and gives its mechanism, then prints a bare heading for the
  uricosuric class and names no member of it. The examiner's own model answer
  does the same — page 6 was read visually and the uricosuric paragraph carries
  only the advice to take them with plenty of fluid and to alkalinise the urine.
  The mark scheme below therefore names allopurinol and says that a uricosuric
  class exists, and names no uricosuric drug, because no source available here
  does. No brand names and no doses appear anywhere in this file.

  ── A PART WHOSE MARK SCHEME THE PAPER NEVER PRINTED ──────────────────────────

  Case (3)(c) is a three-by-three table. Eight of its nine cells are filled on
  the examiner's key. One is blank: haemolytic jaundice against "enzymatic
  changes in blood". That blank is not an oversight of this transcription and it
  is not filled in by inference — the department book records no enzyme change
  for haemolytic jaundice either, which is consistent with a deliberately empty
  cell. It is carried as an explicit `Expects:` line saying no enzyme change is
  recorded, so a student who leaves it blank is not marked down and a student who
  writes "LDH" is not credited against a source that does not say it.

  ── STATUS ────────────────────────────────────────────────────────────────────

  Draft throughout. These need a faculty reviewer to confirm the mark schemes
  before students sit them.

  Provenance lives in `source_citation` and `author_notes`, which the student
  ledger strips. A student is never told which paper a question came off.

  Validate with the concept and article files named:

    npm run medical:batch -- docs/Kasr-Source-Imports/written/103-BMS-EOY-2025-biochemistry-written.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-biochemistry.md

  Import: Admin › Bulk import → question, after the concept and article files.
-->

# Item

## id
QW-103-4F4789D93B9D

## title
Enumerate: ROS defences, Krebs key enzymes, negative protein balance, folate antagonists and causes of ketosis

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## question
Enumerate two of the following five.

## format
multipart_written

## written_parts
### (a) 2 marks
Name substances that protect against reactive oxygen species — one enzyme and one metabolic end product.
Expects: An enzyme — superoxide dismutase, which scavenges superoxide and is widely distributed in tissues
Expects: A metabolic end product — uric acid, which acts as an antioxidant and is oxidised to allantoin; or bilirubin, which is oxidised to biliverdin
Concept: CON-FND-5F0DC4407DEC51

### (b) 2 marks
Name the key enzymes of the Krebs cycle.
Expects: Citrate synthase
Expects: Isocitrate dehydrogenase
Expects: α-ketoglutarate dehydrogenase
Concept: CON-FND-037BF052DDFC0D

### (c) 2 marks
Give the reasons for negative protein balance.
Expects: Inadequate protein intake — starvation, malnutrition, deficiency of an essential amino acid, gastrointestinal disease
Expects: Loss of protein — chronic haemorrhage, albuminuria, lactation on an inadequate diet
Expects: Increased protein catabolism — diabetes mellitus, Cushing's syndrome, hyperthyroidism, infectious fevers
Concept: CON-FND-B320D24EC35D30

### (d) 2 marks
Name the folate antagonists.
Expects: Sulfonamides, which competitively inhibit the bacterial enzyme that incorporates PABA into folic acid
Expects: Methotrexate, which competitively inhibits dihydrofolate reductase
Concept: CON-FND-1A4A49607783A9

### (e) 2 marks
Give the causes of ketosis.
Expects: Starvation
Expects: A low-carbohydrate, high-fat diet
Expects: Severe uncontrolled diabetes mellitus
Expects: Prolonged administration of anti-insulin hormones
Expects: Prolonged, severe muscular exercise
Concept: CON-END-CC450A236ABF50

## derived_from

## topic
Biochemistry

## subtopic
Bioenergetics, the citric acid cycle, protein metabolism, vitamins and ketone bodies

## difficulty
Easy

## question_type
Classification

## main_concept
CON-FND-5F0DC4407DEC51 | CON-FND-037BF052DDFC0D | CON-FND-B320D24EC35D30 | CON-FND-1A4A49607783A9 | CON-END-CC450A236ABF50

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Reactive Oxygen Species (ROS)
103 BMS > Biochemistry > Citric acid cycle
103 BMS > Biochemistry > General protein Metabolism
103 BMS > Biochemistry > Vitamins > Vitamin B9 (Folic acid, Pteroyl glutamate)
103 BMS > Biochemistry > Lipid Metabolism > Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)

## clinical_relevance
0.4

## academic_relevance
0.95

## cognitive_effort_score
0.3

## exam_weight_by_year
KAU_Y1=0.9

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
9

## contextual_concept_ids

## library_ids
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE | ART-103-BIO-TCA-KEY-ENZYMES | ART-103-BIO-NITROGEN-BALANCE | ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS | ART-103-BIO-KETOSIS

## resource_ids

## learning_objective
Recall, as a list and without a stem to reason from, the antioxidant defences against ROS, the three rate-controlling enzymes of the Krebs cycle, the three routes to negative nitrogen balance, the two folate antagonists and the five causes of ketosis.

## media_recommendations

## source_citation
EOY (BMS - 103) 199 (2).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025, Section 1: Biochemistry, group I "Enumerate two of the following", p1, five items at {2 Marks} each. Manifest src_37f6c0daf3436096af19. Mark scheme from the solved twin, src_a2e23ffc50b6b2e24897, p1. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "I) Enumerate two of the following:" then "1) Substance that can protect against ROS (one enzyme & one metabolic end product). {2 Marks}", "2) Key enzymes for Krebs Cycle. {2 Marks}", "3) Reasons for negative protein balance. {2 Marks}", "4) Folate antagonists. {2 Marks}", "5) Causes for Ketosis. {2 Marks}".
One question with five parts, not five questions. The candidate answers two of the five, so the item is worth four marks on the day even though the parts total ten. Splitting it would tell a student to answer all five and would silently treble the weight of group I.
The paper numbers the parts 1-5; `written_parts` letters them a-e, which is the heading form `parseWrittenParts` reads. Nothing about the questions changed.
The examiner's model answers as printed on p1, which extracts natively: "enzymes as: superoxide dismutase"; "metabolic end product as: uric acid, bilirubin"; "citrate synthase", "isocitrate DH / αKG DH"; "loss of proteins", "inadequate protein intake / increased protein catabolism"; "Sulfonamides", "Methotrexate"; "Starvation / uncontrolled DM", "low CHO, high fat diet / prolonged severe muscular exercise", "prolonged administration of anti-insulin hormons". The page render was checked against that text, and "untrolled DM" in the extraction is "uncontrolled DM" on the page.
The mark schemes above are longer than the examiner's own answers in two places, both deliberately. Part (b): the examiner abbreviates to "isocitrate DH / αKG DH"; the scheme writes the enzymes out so a student who writes them out is not penalised for saying more. Part (c): the examiner gives the three headings only; the scheme adds the book's own examples under each, which a student may or may not give, because `markWritten` apportions across the lines and a student who names all three routes still earns the marks.
Easy, and it is the only Easy item in this section: five bare recall lists with no stem to reason from, and the candidate picks the two they know.
concept_ids and contextual_concept_ids are empty: the five parts are each covered completely by one concept, all five are co-primary in `main_concept`, and the question needs no background idea it does not test.
resource_ids is left present-but-empty on purpose. It resolves against the catalogue resource store, not the evidence store the Kasr manifest feeds, so naming src_37f6c0daf3436096af19 or src_a2e23ffc50b6b2e24897 there fails with "is not a resource that exists". Both manifests are named in source_citation instead.
media_recommendations is empty: this question is five lists of words and every one of them is in the answer. An image would decorate it.

## estimated_seconds
300

## randomise_answers
no

---

# Item

## id
QW-103-6199F8DC76FB

## title
Diagram: the fate of hydrogen peroxide, and what G6PD deficiency does to the red cell

## subject
haem

## status
Draft

## owner
Claude

## vignette
The diagram shows the fate of hydrogen peroxide. H₂O₂ is converted to two molecules of water by the enzyme labelled (1), which at the same time oxidises two reduced glutathione (2 G–SH) to the disulphide G-S–S-G. The disulphide is reduced back to 2 G–SH by the enzyme labelled (2), which oxidises NADPH+H⁺ to NADP⁺.

## question
Label the two enzymes on the diagram, then answer parts (a) to (d).

## format
multipart_written

## written_parts
### (1) 0.5 marks
Name the enzyme at label (1) — the one that converts H₂O₂ to two molecules of water while oxidising reduced glutathione.
Expects: Glutathione peroxidase, a selenium enzyme
Concept: CON-FND-D8A41B5C23B148

### (2) 0.5 marks
Name the enzyme at label (2) — the one that reduces G-S–S-G back to 2 G–SH using NADPH+H⁺.
Expects: Glutathione reductase, an FAD enzyme
Concept: CON-FND-D8A41B5C23B148

### (a) 1 mark
Mention the main source of NADPH+H⁺.
Expects: The hexose monophosphate pathway, also called the pentose phosphate pathway
Expects: NADPH+H⁺ is yielded at two steps of its irreversible oxidative phase
Concept: CON-FND-B928DE79E08882

### (b) 0.5 marks
Mention the key enzyme of that pathway.
Expects: Glucose 6-phosphate dehydrogenase (G6PD), which catalyses the first and rate-limiting step
Concept: CON-HEM-A1EF4D20C85878
Depends on: a

### (c) 0.5 marks
Name the disease that results from deficiency of that enzyme.
Expects: Favism, that is, G6PD deficiency
Expects: It presents as a haemolytic anaemia
Concept: CON-HEM-4F64967BBFBB6F
Depends on: b

### (d) 2 marks
Explain how the disease named above affects red blood cells.
Expects: The red cell's capacity to protect itself from oxidative damage is markedly decreased
Expects: Because NADPH is low, glutathione reductase cannot regenerate reduced glutathione (GSH)
Expects: Without GSH, glutathione peroxidase cannot remove H₂O₂
Expects: Hydrogen peroxide peroxidises the membrane lipids and raises membrane fragility
Expects: Exposure to an oxidant — primaquine, aspirin, sulfonamides or fava beans — then lyses the fragile red cells
Expects: The result is haemolytic anaemia with jaundice
Concept: CON-HEM-4F64967BBFBB6F
Depends on: c

## derived_from

## topic
Biochemistry

## subtopic
Reactive oxygen species and the hexose monophosphate pathway

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-FND-D8A41B5C23B148 | CON-FND-B928DE79E08882 | CON-HEM-A1EF4D20C85878 | CON-HEM-4F64967BBFBB6F

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Reactive Oxygen Species (ROS)
103 BMS > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway (HMP) / Pentose Phosphate Pathway (PPP)

## clinical_relevance
0.85

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.9

## question_only_for
KAU_Y1

## concept_ids
CON-FND-5F0DC4407DEC51

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Both

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
9

## contextual_concept_ids

## library_ids
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE | ART-103-BIO-HMP-PATHWAY-AND-G6PD

## learning_objective
Read the glutathione cycle off a diagram, name both of its enzymes, trace the NADPH it consumes back to the HMP pathway and its key enzyme, and explain in sequence why a deficiency of that enzyme lyses red cells on exposure to an oxidant.

## resource_ids

## media_recommendations
### diagram · Question stem
Brief: The paper's own "Fate of H₂O₂" diagram — H₂O₂ converted to 2 H₂O across the top, the 2 G–SH / G-S–S-G couple turning between the two arrows, NADPH+H⁺ oxidised to NADP⁺ across the bottom, with the two enzymes replaced by the blanks (1) and (2)
Purpose: Parts (1) and (2) ask the candidate to name an enzyme by its position on a cycle, which is the whole point of setting it as a diagram. Without the picture those two parts have no question in them, and the vignette here can only describe the arrows in words, which is a harder and different task.
Priority: required
Status: needed
Source direction: the paper itself, EOY (BMS - 103) 199 (2).pdf p2, or an openly licensed redraw of the glutathione peroxidase / reductase cycle
Rights: must be CC-BY or public domain if redrawn from another source

## source_citation
EOY (BMS - 103) 199 (2).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025, Section 1: Biochemistry, group II, Diagram (1) "Fate of H₂O₂", p2. Two labels at {0.5 Mark} each and parts (a) {1 Mark}, (b) {0.5 Mark}, (c) {0.5 Mark}, (d) {2 Marks}. Manifest src_37f6c0daf3436096af19. Mark scheme from the solved twin, src_a2e23ffc50b6b2e24897, p2. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "II) Diagrmas:" — the examiner's own misspelling of "Diagrams" — then "- Diagram (1) {Fate of H₂O₂}", "1) ... {0.5 Mark}", "2) ... {0.5 Mark}", "a) Mention the main source of NADPH+H⁺. {1 Mark}", "b) Mention the key enzyme of this pathway. {0.5 Mark}", "c) Name the disease in case of de ciency of this enzyme. {0.5 Mark}", "d) Explain how this disease named above can affect RBCs. {2 Marks}". "de ciency" is the unsolved copy's dropped fi ligature; the solved copy prints "deficiency" and the page render confirms it.
The examiner's model answers, read off the p2 render and confirmed against the native text layer: (1) "GSH peroxidase", (2) "GSH reductase", (a) "HMP", (b) "G6PD", (c) "favism [Hemolytic anemia]", (d) "The red cell capacity to protect itself from oxidative damage is markedly decreased due to decreased concentration of NADPH which is required by glutathione reductase for the regeneration of reduced glutathione (GSH) for removal of H2O2 (by glutathione peroxidase). Exposure of red cells to oxidizing agents produces lysis of red cells and development of hemolytic anemia and jaundice."
Part (d)'s scheme adds one line the examiner leaves implicit — that peroxide raises membrane fragility, which is why the cells lyse rather than merely being stressed — and names the oxidants the book lists. Both come from the department book, not from elsewhere, and a student who gives only the examiner's own answer still earns the marks because `markWritten` apportions across the lines.
The parts depend on one another in a chain: the pathway names the enzyme, the enzyme names the disease, and the disease is what (d) explains. That is recorded with `Depends on:` so a student who fails (a) is not scored as though (b) to (d) were independent.
The vignette describes the diagram in words because the diagram itself does not exist as a rights-cleared asset yet. It is requested at Priority: required, and the question should not publish without it — with the picture, parts (1) and (2) are label questions; without it they are a description-reading exercise.
concept_ids names the general ROS-defence concept: a complete answer to (d) demonstrates it, but the question's own subject is the peroxide route and the pathway that feeds it.
resource_ids is left present-but-empty. It resolves against the catalogue resource store, not the evidence store the Kasr manifest feeds, so naming a src_ ID there errors. Both manifests are in source_citation.
British spelling throughout the scheme: haemolytic, anaemia, disulphide. The examiner writes "hemolytic anemia".

## estimated_seconds
420

## randomise_answers
no

---

# Item

## id
QW-103-95C32C24488F

## title
Diagram: the BPG shunt in red blood cells, and why it yields no net ATP

## subject
haem

## status
Draft

## owner
Claude

## vignette
The diagram shows the BPG shunt in red blood cells. The substrate labelled (1) enters glycolysis and is converted to 1,3-bisphosphoglycerate. From there, one route runs straight down to 3-phosphoglycerate through the enzyme labelled (2), consuming ADP and Mg²⁺ and producing ATP; 3-phosphoglycerate then goes on to pyruvate. The other route runs sideways: bisphosphoglycerate mutase converts 1,3-bisphosphoglycerate to 2,3-bisphosphoglycerate, and 2,3-bisphosphoglycerate phosphatase then hydrolyses that to 3-phosphoglycerate, releasing Pi.

## question
Label the substrate and the enzyme on the diagram, then answer parts (a) to (c).

## format
multipart_written

## written_parts
### (1) 0.5 marks
Name the substrate at label (1) — the substrate from glycolysis.
Expects: Glyceraldehyde 3-phosphate
Concept: CON-HEM-095C9C97B56CCA

### (2) 0.5 marks
Name the enzyme at label (2) — the enzyme that produces ATP.
Expects: Phosphoglycerate kinase
Concept: CON-HEM-7FBB4829A4A4EC

### (a) 2 marks
Using the diagram, explain why red blood cells produce no net ATP from this shunt.
Expects: 2,3-bisphosphoglycerate mutase converts 1,3-bisphosphoglycerate into 2,3-bisphosphoglycerate (2,3-BPG)
Expects: 2,3-bisphosphoglycerate phosphatase then hydrolyses 2,3-BPG to 3-phosphoglycerate
Expects: The shunt therefore rejoins glycolysis below the phosphoglycerate kinase step, bypassing it
Expects: Phosphoglycerate kinase is the site of ATP yield, so any molecule taking the shunt skips it and the cell gains no net ATP
Concept: CON-HEM-7FBB4829A4A4EC
Depends on: 2

### (b) 1 mark
Mention the importance of glycolysis for red blood cells.
Expects: Red cells have no mitochondria, so they cannot use the electron transport chain
Expects: Glycolysis is therefore their only source of ATP, produced by substrate-level phosphorylation
Expects: The NADH+H⁺ made at the glyceraldehyde 3-phosphate dehydrogenase step also keeps haemoglobin iron in the ferrous state, since ferric haem gives methaemoglobin, which cannot carry oxygen
Concept: CON-HEM-095C9C97B56CCA

### (c) 1 mark
Mention the importance of the product the shunt produces.
Expects: 2,3-BPG binds to haemoglobin and decreases its affinity for oxygen
Expects: Haemoglobin therefore gives oxygen up more readily, favouring delivery of oxygen to the tissues
Concept: CON-HEM-6B557A065A8D90
Depends on: a

## derived_from

## topic
Biochemistry

## subtopic
Glycolysis in the red cell

## difficulty
Hard

## question_type
Mechanism

## main_concept
CON-HEM-095C9C97B56CCA | CON-HEM-7FBB4829A4A4EC | CON-HEM-6B557A065A8D90

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## clinical_relevance
0.7

## academic_relevance
0.95

## cognitive_effort_score
0.7

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
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
9

## contextual_concept_ids

## library_ids
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT

## learning_objective
Read the BPG shunt off a diagram, identify the step it bypasses and say why that step is the one that matters, explain why glycolysis is the red cell's only source of ATP, and state what the cell gets in return for a shunt that yields it none.

## resource_ids

## media_recommendations
### diagram · Question stem
Brief: The paper's own "BPG Shunt in Red Blood Cells" diagram — the blank (1) above 1,3-bisphosphoglycerate, the ADP/Mg²⁺/ATP side reaction against the blank (2), the branch through bisphosphoglycerate mutase to 2,3-bisphosphoglycerate and back through 2,3-bisphosphoglycerate phosphatase to 3-phosphoglycerate, and 3-phosphoglycerate continuing to pyruvate
Purpose: Part (a) says "using the diagram" in the examiner's own words. The answer is that the two routes rejoin below the ATP-yielding step, and that is a spatial fact about the branch: seen on the diagram it is obvious, and read as a list of reactions it is not. The two label parts are also unanswerable without it.
Priority: required
Status: needed
Source direction: the paper itself, EOY (BMS - 103) 199 (2).pdf p3, or an openly licensed redraw of the Rapoport-Luebering shunt
Rights: must be CC-BY or public domain if redrawn from another source

## source_citation
EOY (BMS - 103) 199 (2).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025, Section 1: Biochemistry, group II, Diagram (2) "BPG Shunt in Red Blood Cells", p3. Two labels at {0.5 Mark} each and parts (a) {2 Marks}, (b) {1 Mark}, (c) {1 Mark}. Manifest src_37f6c0daf3436096af19. Mark scheme from the solved twin, src_a2e23ffc50b6b2e24897, p3. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "- Diagram (2) [BPG Shunt in Red Blood Cells]", "1) ... (Substrate from glycolysis) {0.5 Mark}", "2) ... (Enzyme produces ATP) {0.5 Mark}", "a) Using the diagram, explain why RBCs don't produce any net ATP from this shunt. {2 Marks}", "b) Mention importance of glycolysis for RBCs. {1 Mark}", "c) Mention the importance of the product produced. {1 Marks}". The "{1 Marks}" on (c) is the examiner's; it is one mark.
The examiner's model answers, read off the p3 render and confirmed against the native text layer: (1) "Glyceraldehyde 3-P", (2) "phosphoglycerate kinase", (a) "2,3-bisphosphoglycerate mutase catalyzes the conversion of 1,3-bisphosphoglycerate into 2,3-bisphosphoglycerate (2,3-BPG) bypassing the reaction catalyzed by phosphoglycerate kinase (site of ATP yield).", (b) "As RBCs lack mitochondria, glycolysis is the only source of ATP through substrate level phosphorylation.", (c) "2,3-BPG binds to hemoglobin and decreases its affinity to oxygen, favoring delivery of oxygen to tissues."
Part (b)'s scheme carries one line beyond the examiner's answer — that glycolytic NADH keeps haemoglobin iron ferrous — because the book gives glycolysis two jobs in the red cell and the question asks for the importance of glycolysis, not only for its ATP. A student who gives the examiner's answer alone still earns the marks.
Hard rather than Moderate. Parts (b) and (c) are recall, but (a) is not: the candidate has to notice that the two routes rejoin below the kinase and that the kinase is where the ATP was going to come from. Students who lose this mark lose it by describing the shunt correctly and never saying what it bypasses.
The two labels are separate parts because the paper prices them separately at {0.5 Mark} each. `parseWrittenParts` reads a numeric label as happily as a letter, so the paper's own numbering survives here.
resource_ids is left present-but-empty: it resolves against the catalogue resource store, not the evidence store the Kasr manifest feeds. Both manifests are in source_citation.

## estimated_seconds
420

## randomise_answers
no

---

# Item

## id
QW-103-7536D5CBCDAA

## title
Diagram: metabolism of VLDL, IDL and LDL, and what fails when the carrier fails

## subject
gi

## status
Draft

## owner
Claude

## vignette
The diagram shows the metabolism of VLDL, IDL and LDL. The liver secretes nascent VLDL; it acquires apo C and apo E to become mature VLDL, and the apoprotein labelled (1) is the one it carried from the start. The enzyme labelled (2) then hydrolyses its triacylglycerol, releasing free fatty acids and glycerol and leaving IDL; further hydrolysis leaves LDL. LDL is cleared through apo B-100 receptors, 70 per cent of them on the liver and 30 per cent on extrahepatic tissues.

## question
Label the apoprotein and the enzyme on the diagram, then answer parts (a) to (c).

## format
multipart_written

## written_parts
### (1) 0.5 marks
Name the apoprotein at label (1) — the one carried by nascent VLDL and recognised by the LDL receptor.
Expects: Apo B-100
Concept: CON-GIT-33EAF87333AAD5

### (2) 0.5 marks
Name the enzyme at label (2) — the one that hydrolyses the triacylglycerol of mature VLDL.
Expects: Lipoprotein lipase
Concept: CON-GIT-33EAF87333AAD5

### (a) 2 marks
Mention the function of VLDL and of chylomicrons.
Expects: VLDL is formed by liver cells and transports triacylglycerol from the liver to extrahepatic tissues
Expects: Chylomicrons are formed by intestinal cells and transport absorbed dietary lipids to the lymphatics and then to the systemic circulation
Concept: CON-GIT-33EAF87333AAD5

### (b) 0.5 marks
Mention the disease resulting from a defect in LDL uptake.
Expects: Familial hypercholesterolaemia, a hyperlipoproteinaemia caused by a defect in the LDL (apo B-100) receptors
Concept: CON-GIT-8C5125A491B189
Depends on: 1

### (c) 1.5 marks
What is the effect of a low plasma VLDL?
Expects: Fatty liver
Expects: Because VLDL is the only vehicle the liver has for exporting the triacylglycerol it makes, a low plasma VLDL means transport of triacylglycerol from liver to extrahepatic tissues is decreased
Expects: The triacylglycerol therefore accumulates in the hepatocytes
Concept: CON-GIT-38CC5CC7716DB7
Depends on: a

## derived_from

## topic
Biochemistry

## subtopic
Plasma lipids and lipoproteins

## difficulty
Moderate

## question_type
Pathophysiology

## main_concept
CON-GIT-33EAF87333AAD5 | CON-GIT-8C5125A491B189 | CON-GIT-38CC5CC7716DB7

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## clinical_relevance
0.85

## academic_relevance
0.9

## cognitive_effort_score
0.5

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
Both

## reasoning_level
2

## inferred_difficulty
57

## exam_relevance
8

## contextual_concept_ids

## library_ids
ART-103-BIO-PLASMA-LIPOPROTEINS

## learning_objective
Identify apo B-100 and lipoprotein lipase on the VLDL cascade, state which triacylglycerol each of VLDL and chylomicrons carries and where to, and reason from a failed LDL receptor to familial hypercholesterolaemia and from a low VLDL to a fatty liver.

## resource_ids

## media_recommendations
### diagram · Question stem
Brief: The paper's own "Metabolism of VLDL, IDL and LDL" diagram — liver secreting nascent VLDL, acquisition of C and E to mature VLDL with the blank (1) on its apoprotein, the blank (2) on the lipase releasing FFA and glycerol, IDL then LDL, and LDL returning 70 per cent to hepatic and 30 per cent to extrahepatic apo B-100 receptors
Purpose: Both label parts ask the candidate to name a molecule by where it sits in the cascade, and part (b) asks about a receptor whose two destinations the diagram draws. Prose can list the steps; only the diagram shows that the same apoprotein put on at the liver is the one the receptor later reads.
Priority: required
Status: needed
Source direction: the paper itself, EOY (BMS - 103) 199 (2).pdf p4, or an openly licensed lipoprotein metabolism schematic
Rights: must be CC-BY or public domain if redrawn from another source

## source_citation
EOY (BMS - 103) 199 (2).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025, Section 1: Biochemistry, group II, Diagram (3) "Metabolism of VLDL, IDL and LDL", p4. Two labels at {0.5 Mark} each and parts (a) {2 Marks}, (b) {0.5 Mark}, (c) {1.5 Marks}. Manifest src_37f6c0daf3436096af19. Mark scheme from the solved twin, src_a2e23ffc50b6b2e24897, p4. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "- Diagram (3) [Metabolism of VLDL, IDL and LDL]", "1) ... {0.5 Mark}", "2) ... {0.5 Mark}", "a) Mention the Function of VLDL and Chylomicrons. {2 Marks}", "b) Mention the Disease resulting from defect in LDL uptake. {0.5 Mark}", "c) What is the effect of low VLDL in plasma. {1.5 Marks}".
The examiner's model answers, read off the p4 render and confirmed against the native text layer: (1) "apo B-100", (2) "Lipoprotein lipase", (a) "VLDL → transport TAG from liver to extrahepatic tissues. Chylomicrons → absorbed dietry lipids to lymphatics then to systemic circulation.", (b) "Hyperlipoproteinmia or Familial hypercholesterolemia", (c) "Fatty liver [due to decreased transport of TAG from Liver to extrahepatic tissues]." The spellings "dietry", "Hyperlipoproteinmia" and "hypercholesterolemia" are the overlay's handwriting; the scheme writes them out in British spelling.
Part (b) is scored on "familial hypercholesterolaemia". The examiner accepts "hyperlipoproteinaemia" as an alternative, and the scheme's single line says both — familial hypercholesterolaemia *is* a hyperlipoproteinaemia, which is why the examiner wrote them as alternatives rather than as two components.
resource_ids is left present-but-empty: it resolves against the catalogue resource store, not the evidence store the Kasr manifest feeds. Both manifests are in source_citation.

## estimated_seconds
360

## randomise_answers
no

---

# Item

## id
QW-103-918C503B6BF2

## title
Case: an infant with pale skin, mousy urine and mental retardation

## subject
fnd

## status
Draft

## owner
Claude

## vignette
An infant presents with hypopigmented skin compared with the siblings, with a mousy urine odour, elevated phenylpyruvate and phenylacetate, and mental retardation.

## question
Answer the five parts below about this infant: the diagnosis, the deficient enzyme, the cause of the neurological manifestations, the cause of the hypopigmentation, and the treatment.

## format
multipart_written

## written_parts
### (a) 1 mark
Diagnosis?
Expects: Phenylketonuria (PKU)
Concept: CON-FND-D7BB8C3AFB54CC

### (b) 1 mark
Name the deficient enzyme.
Expects: Phenylalanine hydroxylase (PAH)
Expects: In about 1-2 per cent of cases the deficiency is of its cofactor tetrahydrobiopterin (BH4) rather than of the enzyme itself
Concept: CON-FND-D7BB8C3AFB54CC
Depends on: a

### (c) 1 mark
Give the causes of the neurological manifestations.
Expects: The elevated phenylalanine and its metabolites interfere with the transport of tyrosine and tryptophan into the brain, so the brain is deficient in both
Expects: Tyrosine is low to begin with, because phenylalanine cannot be hydroxylated to it
Expects: Low tyrosine impairs synthesis of the neurotransmitters made from it — DOPA and the catecholamines
Expects: This is why an untreated patient shows mental retardation, manifest by the age of one year
Concept: CON-FND-587B0A39D3C0BD
Depends on: a

### (d) 1 mark
Give the causes of the hypopigmentation.
Expects: Deficiency of tyrosine, which is the substrate melanin is made from
Expects: High levels of phenylalanine also competitively inhibit tyrosinase, the enzyme that makes melanin from DOPA
Expects: Hair, skin and the iris of the eye are therefore hypopigmented
Concept: CON-FND-1DF6B985CB77A1
Depends on: a

### (e) 1 mark
Treatment?
Expects: Early diagnosis, which is what avoids the mental retardation, since the disease is treatable by dietary means
Expects: Dietary restriction of phenylalanine, using a phenylalanine-free milk formula
Expects: Tyrosine supplementation, because tyrosine has become an essential amino acid for this patient
Expects: In the rare cases due to BH4 deficiency, treatment is both dietary and supplementation of BH4
Concept: CON-FND-81A4F3A9C51B7B
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
CON-FND-D7BB8C3AFB54CC | CON-FND-587B0A39D3C0BD | CON-FND-1DF6B985CB77A1 | CON-FND-81A4F3A9C51B7B

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Aromatic Amino Acids (Phenylalanine and Tyrosine)

## clinical_relevance
0.9

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.9

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
54

## exam_relevance
9

## contextual_concept_ids

## library_ids
ART-103-BIO-PHENYLKETONURIA

## learning_objective
Recognise phenylketonuria from a hypopigmented infant with a mousy urine odour and raised phenylpyruvate, name the deficient enzyme, and explain the neurological and pigmentary features as two separate consequences of the same blocked hydroxylation before naming the dietary treatment.

## resource_ids

## media_recommendations

## source_citation
EOY (BMS - 103) 199 (2).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025, Section 1: Biochemistry, group III, Case (1), p5, five parts at {1 Mark} each. Manifest src_37f6c0daf3436096af19. Model answers from the solved twin, src_a2e23ffc50b6b2e24897, p5, read off the page render because that page's overlays are not in the text layer. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
THE PAPER'S LETTERING, reproduced here and not in `written_parts`. Page 5 letters its five parts **a, b, b, c, d** — "b" twice, and no "e". Verbatim: "a) Diagnosis: {1 Mark}", "b) Name of the de cient enzyme: {1 Mark}", "b) Causes for neurological manifestation: {1 Mark}", "c) Causes for hypopigmentation: {1 Marks}", "d) Treatment: {1 Marks}". The page was opened and read to confirm this is the examiner's typesetting and not an extraction artefact. It is the examiner's. `written_parts` letters them a-e instead, because `parseWrittenParts` keys a part on its label — two parts both called "b" would collide, `Depends on: b` could only ever reach the first, and the second part's mark scheme would be silently unreachable. Nothing about the questions or the marks has changed; only the letters.
"de ciency"/"de cient" in the unsolved copy is the dropped fi ligature; the solved copy prints "deficient" and the render confirms it.
The examiner's model answers, read off the p5 render: (a) "(PKU) phenylketonuria", (b) "(PAH) phenylalanin hyroxylase", then the highlighted overlays — "CNS manifestations: The elevated phenylalanine and its metabolites will interfere with the transport of tyrosine and tryptophan to the brain leading to their deficiency. Also decreased tyrosine leads to impaired neurotransmitters synthesis in the brain; and this may explain why untreated patient shows mental retardation that manifest by the age of one year."; "Hypopigmentation of hair, skin, and iris of the eye due to deficiency of tyrosine. High levels of phenylalanine also competitively inhibit tyrosinase enzyme."; "Treatment: Early diagnosis of PKU is important to avoid mental retardation as the disease is treatable by dietary means. The treatment of classic PKU consists of dietary restriction of phenylalanine (phenylalanine-free milk formula) with tyrosine supplementation. In the rare cases due to BH4 deficiency, the treatment is both dietary and supplementation of BH4." The handwritten "phenylalanin hyroxylase" is phenylalanine hydroxylase.
Part (b) carries the BH4 variant because the examiner's own answer sheet raises it under treatment, and a student who names BH4 deficiency as the alternative enzyme defect is answering the book. It is one line of several, so a student who names PAH alone is not penalised.
No dose, no brand and no product name appears in part (e). "Phenylalanine-free milk formula" is the book's own words for a class of feed, not a product.
Every part depends on (a): none of the enzyme, the mechanism or the treatment can be given without having named the disease.
resource_ids is left present-but-empty: it resolves against the catalogue resource store, not the evidence store the Kasr manifest feeds. Both manifests are in source_citation.
media_recommendations is empty — the case is a text vignette and the paper prints no image with it.

## estimated_seconds
360

## randomise_answers
no

---

# Item

## id
QW-103-AE93E377A218

## title
Case: joint inflammation at the big toe with a high blood urate

## subject
renal

## status
Draft

## owner
Claude

## vignette
A patient presents with inflammation around the joints, especially the big toe. Laboratory tests were done and proved a high uric acid concentration in blood and tophi-crystals in urine.

## question
Answer the four parts below about this patient: the diagnosis, how alcohol intake affects the hyperuricaemia, how a raised blood lactate affects the blood uric acid, and which drugs lower blood urate and by what mechanism.

## format
multipart_written

## written_parts
### (a) 1 mark
Diagnosis?
Expects: Gout, on a background of hyperuricaemia
Expects: The nodular masses of uric acid crystals deposited in soft tissue are tophi, found around the fingers, at the tips of the elbows and around the big toe, where they cause arthritis
Expects: Precipitation of urates in the urinary tract may produce renal stones
Concept: CON-REN-31708150F8B722

### (b) 1 mark
Explain how alcohol intake affects the hyperuricaemia.
Expects: Oxidation of ethanol to acetaldehyde generates a large amount of NADH
Expects: The raised NADH/NAD⁺ ratio shifts the lactate dehydrogenase reaction towards lactate formation, so blood lactate rises
Expects: Alcohol also causes dehydration
Concept: CON-REN-0460ED67059E66
Depends on: a

### (c) 1.5 marks
Explain how an increased blood lactate can affect the blood uric acid concentration.
Expects: A raised blood lactate decreases the excretion of uric acid by the kidneys
Expects: Lactic acid and uric acid occupy the same transporter in the renal tubules
Expects: Lactate, present at higher concentration and more soluble, takes the transporter in preference to uric acid
Expects: Uric acid is therefore retained, and gout follows — this is decreased excretion, that is, renal gout, rather than overproduction
Concept: CON-REN-0460ED67059E66
Depends on: b

### (d) 1.5 marks
Which drugs are used to decrease blood uric acid levels, and what are their mechanisms?
Expects: Drugs that decrease the production of uric acid, of which allopurinol is the drug of choice
Expects: Allopurinol resembles hypoxanthine closely enough that xanthine oxidase oxidises it to oxypurinol
Expects: Oxypurinol then binds tightly to xanthine oxidase, so the enzyme can no longer oxidise hypoxanthine and xanthine, and less uric acid is formed
Expects: Allopurinol also reacts with PRPP, lowering the PRPP pool and reducing de-novo purine synthesis, so it acts at both the last step of catabolism and the first step of synthesis
Expects: Drugs that increase the excretion of uric acid — the uricosuric class. The department book and the examiner's model answer name this class without naming a member of it, and no member is named here either
Expects: Uricosurics must be taken with plenty of fluid and with alkalinisation of the urine, to prevent the formation of renal stones
Concept: CON-REN-38B4BED80BC671 | CON-REN-E5BAEF03791C8F
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
CON-REN-31708150F8B722 | CON-REN-0460ED67059E66 | CON-REN-38B4BED80BC671 | CON-REN-E5BAEF03791C8F

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolism of purines and pyrimidines > Disorders of Purine Metabolism

## clinical_relevance
0.9

## academic_relevance
0.9

## cognitive_effort_score
0.8

## exam_weight_by_year
KAU_Y1=0.9

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
4

## inferred_difficulty
35

## exam_relevance
9

## contextual_concept_ids

## library_ids
ART-103-BIO-GOUT-AND-HYPERURICAEMIA

## learning_objective
Diagnose gout from tophi and a raised urate, then follow one two-step chain — ethanol raises NADH, NADH raises lactate, lactate takes the shared renal transporter and urate is retained — and give the mechanism by which allopurinol lowers urate at two separate points.

## resource_ids

## media_recommendations

## source_citation
EOY (BMS - 103) 199 (2).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025, Section 1: Biochemistry, group III, Case (2), p6. Parts (a) {1 Mark}, (b) {1 Mark}, (c) {1.5 Marks}, (d) {1.5 Marks}. Manifest src_37f6c0daf3436096af19. Model answers from the solved twin, src_a2e23ffc50b6b2e24897, p6, read off the page render because that page's overlays are not in the text layer. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## author_notes
Verbatim from the paper: "- Case (2): A patient presents with in ammation around joints, especially big toe, lab tests were done and proved a high uric acid concentration in blood and a topi-crystals in urine." then "a) Diagnosis: {1 Mark}", "b) Explain how does alcohol intake affect hyperuriciemia: {1 Mark}", "c) Explain how increased blood lactate levels can have an effect on uric acid blood concentration: {1.5 Marks}", "d) What drugs are used to decrease uric acid levels in blood, and explain their mechanisms: {1.5 Marks}". "in ammation" is the dropped fl ligature and is inflammation; "a topi-crystals" is the dropped ph and reads tophi-crystals — both confirmed against the p6 render. "hyperuriciemia" is the examiner's spelling of hyperuricaemia.
THE DRUG QUESTION. Part (d) is the one part of this section where it would be easy to write something no source says. The department book divides the drug treatment of gout into three — anti-inflammatory agents, which do not lower urate; drugs decreasing production, where allopurinol is the drug of choice and the mechanism is given in full; and drugs increasing excretion, the uricosurics, printed as a bare class heading with no member named under it. The examiner's model answer on p6 reproduces exactly that: a full paragraph on allopurinol and oxypurinol, then "3) Drugs increasing the excretion of uric acid (Uricosuric drugs): These medications should be taken with plenty of fluid accompanied by alkalization of urine to prevent the formation of renal stones." No uricosuric drug is named. The scheme above therefore names allopurinol, states that the uricosuric class exists and what must accompany it, and names no uricosuric drug. Naming one would be inventing a fact the paper, the book and the examiner all declined to state, and drug availability and naming in Egypt cannot be verified from these sources. No brand name and no dose appears.
The examiner's model answers on the other parts, read off the p6 render: (a) "Hyperuricemia (Gout)"; (b) "Alcohol intake: Oxidation of alcohol (ethanol) to acetaldehyde generates significant amount of NADH. The increase of NADH/NAD+ ratio shifts lactate dehydrogenase reaction toward lactate formation."; (c) "The elevation of blood lactate decreases the excretion of uric acid from the kidneys, as both lactic acid and uric acid occupy the same transporter in renal tubules. Lactate, being higher in concentration and more soluble, succeeds to bind the transporter in favor of uric acid, which is retained causing gout. Also, alcohol intake causes dehydration."
The examiner files "alcohol intake causes dehydration" under (c). It sits under (b) here, because dehydration is a way alcohol raises urate and not a way lactate does, and (b) is the part that asks about alcohol. A student who writes it under either earns the mark; the placement only affects which part it is apportioned to.
Part (a)'s scheme accepts "hyperuricaemia" and "gout" as the examiner wrote them, and adds the tophi and the renal stones because the vignette names tophi-crystals in urine and the diagnosis should account for them.
Challenging rather than Hard: (b) and (c) are one causal chain of four steps that the candidate has to hold together — ethanol to NADH to lactate to a shared transporter to retained urate — and (d) then asks for a second, independent two-point mechanism. The paper splits the chain across two parts, which makes it easy to answer (c) by repeating (b).
resource_ids is left present-but-empty: it resolves against the catalogue resource store, not the evidence store the Kasr manifest feeds. Both manifests are in source_citation.
media_recommendations is empty — the case is a text vignette and the paper prints no image with it.
attachments and attached_image are empty: no rights-cleared asset exists and none is needed.

## attachments

## attached_image

## estimated_seconds
480

## randomise_answers
no

---

# Item

## id
QW-103-15304393721E

## title
Case: gallstones with dark urine and clay stool, and the three jaundices told apart

## subject
gi

## status
Draft

## owner
Claude

## vignette
An old woman ate a fatty meal, then presented with abdominal pain — the cause was proven to be gallstones — with a yellowish skin colour and sclera, dark brown coloured urine and a clay coloured stool.

## question
Answer the three parts below: the diagnosis, why the stool is clay coloured and the urine dark, and a completed table telling the three types of jaundice apart.

## format
multipart_written

## written_parts
### (a) 1 mark
Diagnosis?
Expects: Obstructive jaundice, from obstruction of the biliary passages by the gallstones
Concept: CON-GIT-A265DD7A7CC8EF

### (b) 1 mark
Explain why the stool is clay coloured and the urine is dark.
Expects: The obstruction stops conjugated bilirubin reaching the intestine and forces it back into the blood
Expects: Stercobilin, which is what makes stool brown, disappears from the faeces, so the stool is clay coloured
Expects: Conjugated bilirubin is water-soluble and not bound to albumin, so the kidney excretes it and the urine becomes dark brown
Concept: CON-GIT-A265DD7A7CC8EF
Depends on: a

### (c) 3 marks
Complete the table: for each of haemolytic, obstructive and hepatocellular jaundice, give the type of bilirubin elevated and the enzymatic changes in blood.
Expects: Haemolytic jaundice — bilirubin elevated: unconjugated (indirect), with the conjugated fraction normal
Expects: Haemolytic jaundice — enzymatic changes: none recorded. The examiner's own key leaves this cell blank and the department book records no enzyme change for haemolytic jaundice, so a blank earns the mark and no enzyme is credited against it
Expects: Obstructive jaundice — bilirubin elevated: conjugated (direct)
Expects: Obstructive jaundice — enzymatic changes: alkaline phosphatase (ALP) raised
Expects: Hepatocellular jaundice — bilirubin elevated: both fractions, unconjugated and conjugated
Expects: Hepatocellular jaundice — enzymatic changes: ALT and AST raised, because liver cells are being destroyed
Concept: CON-GIT-4A2A86832F1FF2 | CON-HEM-F2B664C215C912
Depends on: a

## derived_from

## topic
Biochemistry

## subtopic
Bilirubin and jaundice

## difficulty
Moderate

## question_type
Diagnosis

## main_concept
CON-GIT-A265DD7A7CC8EF | CON-GIT-4A2A86832F1FF2 | CON-HEM-F2B664C215C912

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Jaundice (Icterus or Hyperbilirubinemia)
103 BMS > Biochemistry > Heme Metabolism > Blood Bilirubin

## clinical_relevance
0.95

## academic_relevance
0.9

## cognitive_effort_score
0.55

## exam_weight_by_year
KAU_Y1=0.9

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
56

## exam_relevance
9

## contextual_concept_ids

## library_ids
ART-103-BIO-JAUNDICE-AND-BILIRUBIN

## learning_objective
Diagnose obstructive jaundice from a clay stool and dark urine, explain both signs from the single fact that conjugated bilirubin no longer reaches the gut, and complete the three-by-three table that separates haemolytic, obstructive and hepatocellular jaundice by bilirubin fraction and by enzyme.

## resource_ids

## media_recommendations

## source_citation
EOY (BMS - 103) 199 (2).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025, Section 1: Biochemistry, group III, Case (3), p7. Parts (a) {1 Mark}, (b) {1 Mark}, (c) a three-by-three table {3 Marks}. Manifest src_37f6c0daf3436096af19. Mark scheme from the solved twin, src_a2e23ffc50b6b2e24897, p7. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "- Case (3): An old woman ate a fatty meal, then presented with a abdominal pain (Cause was proven to be gall stones), yellowish skin color and sclera, a dark brown colored urine and a clay colored stool" then "a) Diagnosis: {1 Mark}", "b) Explain why stool is clay colored and the urine is dark: {1 Marks}", "c) Complete the table: {3 Marks}". The table's row labels are printed "Hemolytic jaundice", "Obstructive juandice", "Hepatocelluler juandice" — "juandice" twice and "Hepatocelluler" — and its two columns are "Type of bilirubin elevated" and "Enzymatic changes in blood". The vignette above fixes "a abdominal pain" only.
A PART WHOSE MARK SCHEME THE PAPER NEVER PRINTED. The table has nine cells and the examiner's key fills eight. Haemolytic jaundice against "enzymatic changes in blood" is left blank. Page 7 was read visually to be sure this is a blank cell and not an overlay that failed to extract: the cell is empty on the render. The department book independently records no enzyme change for haemolytic jaundice, which is consistent with the blank being deliberate. It is carried above as an explicit `Expects:` line saying no enzyme change is recorded, rather than dropped or filled by inference — a student who leaves it blank earns the mark and one who writes an enzyme is not credited against a source that never names one. A reviewer should confirm whether the department intends the cell to be empty or intends LDH there.
The examiner's model answers, read off the p7 render and confirmed against the native text layer: (a) "Obstructive jaundice"; (b) "Stercobilin disappears from the feces leading to clay colored stool. Conjugated bilirubin becomes excreted in the urine, which becomes dark brown in color."; (c) haemolytic — "unconjugated / indirect", enzymatic cell blank; obstructive — "Conjugated / direct", "Alkaline phosphatase (ALP)"; hepatocellular — "unconjugated + conjugated", "ALT AST".
The whole case is one `multipart_written` question rather than a `comparison_table` one, because the table is only the third of three parts and the first two are not comparisons. Setting the format to `comparison_table` would describe part (c) and misdescribe (a) and (b).
Part (c) names two main concepts, and both are co-primary for that part: the three-way table is one concept, and the haemolytic row's unconjugated bilirubin is the other. A student who fills the obstructive and hepatocellular rows and not the haemolytic one has demonstrated one and not the other.
resource_ids is left present-but-empty: it resolves against the catalogue resource store, not the evidence store the Kasr manifest feeds. Both manifests are in source_citation.
media_recommendations is empty — the paper prints the table as text, and it is reproduced as text in part (c)'s prompt and mark scheme.

## estimated_seconds
420

## randomise_answers
no
