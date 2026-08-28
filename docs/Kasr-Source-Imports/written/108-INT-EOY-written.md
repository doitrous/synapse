<!--
  Written questions for 108 INT — Pathology and Pharmacology, Year 1, Kasr Al
  Ainy (kau).

  Transcribed from the module's two end-of-year papers, both held twice in the
  manifest as a solved and an unsolved copy of the same sitting:

    2025, batch 199 — `EOY 108 exam 199 [solved] (2).pdf`, manifest source ID
      src_bd1595e59d116b78436a; unsolved twin src_26907f7ae5f2763e89f0.
    2024, batch 198 — `EOY Exam {INT-108} 198 (Solved) (3).pdf`, manifest source
      ID src_3deab75f7f81cc5f5260; unsolved twin src_a2e82550c5fffe1b8bfd.

  Extraction of record is ../../../scripts/kasr/extract/108-INT/eoy.json, which
  reads the two papers page by page and marks one copy of each question
  `isCanonicalCopy`. Every prompt, every printed number, every mark figure and
  every page number below is that file's, and the examiner's own wording is kept
  verbatim in `author_notes` beside each rewrite.

  ==================================================================
  1 · WHAT IS HERE
  ==================================================================

  The two papers carry 27 written-format questions between them — 16
  `multipart_written`, 6 `structured_written`, 4 `short_answer` and 1
  `matching`. **All 27 are authored**, as 28 records. Nothing from either paper
  is left out.

  28 rather than 27 because one source item carries two formats. The 2024
  paper's practical item 2 is a matching block worth 1 mark with a written
  0.5-mark demand printed underneath it, and `written_parts` is refused on a
  non-written format — so a matching record has nowhere to hold a marked written
  subpart. It is authored as QW-108-2024-S3Q2-MATCH and
  QW-108-2024-S3Q2-EMERGENCY, and both say so. That is a split forced by the
  schema, not a judgement about what the question tests; count it as one
  question and two records.

  56 marks: 28 from the 2025 sitting and 28 from the 2024 sitting; 28 marks in
  Pathology and 28 in Pharmacology. 55 of those sit on written parts and 1 is
  the matching block, which has parts of a different kind.

  ==================================================================
  2 · THE ANSWERS ARE IN THE PAPERS, AND NOT IN THEIR TEXT LAYER
  ==================================================================

  This is the fact the batch turns on, and an earlier pass of it got wrong.

  Both solved copies are complete answer keys for their practical sections. The
  answers are **pasted graphics and handwriting** — images of text laid over the
  page — so `pdftotext` returns nothing for them and a solved copy extracts to
  the same characters as its unsolved twin. `eoy.json` says as much for the
  multiple-choice half of these papers, where the key is a pink highlight with no
  text and had to be rasterised. The written half fails the same way, for the
  same reason, and nothing had looked for it there.

  An earlier pass of this file therefore held seven practical pathology items and
  the matching item unauthored, on the ground that the plate's subject could not
  be known and so no concept could be named. The reasoning was right and the
  evidence was incomplete. Every one of those eight is authored here, off the
  page.

  **Pages read.** Each was rendered with `pdftoppm -r 85 -png -singlefile` and
  looked at, then re-rendered at 300-400 dpi and cropped wherever a block of
  answer text needed to be read word by word rather than recognised:

    2025 solved, src_bd1595e59d116b78436a — p11, p12, p13, p14, p15. That is
      Section 3 entire, from its heading to "End of exam". All five carry
      answers.
    2024 solved, src_3deab75f7f81cc5f5260 — p8, p9, p10, p11. That is Section 3
      entire, from "I) Pathology" to "Best of wishes". All four carry answers.

  No practical page of either solved copy was found without an answer, so no
  item is left unauthored for want of one.

  **Whose answers these are.** Not the registrar's. The 2024 solved copy prints
  "Solved by Nour and Menna" beneath its closing line on p11, which makes it a
  student solution; the 2025 solved copy carries no signature, and who wrote it
  is not recorded. Every mark scheme below built from a recovered answer says so
  in `author_notes` and quotes the answer verbatim, so a reviewer can re-render
  the page and check it. This is exactly why `status` is Draft: a student's
  answer is strong evidence of what the department wanted and is not the same
  thing as the department's mark scheme.

  Where a recovered answer is thinner than the department book, the book's own
  words are added as further expected points through the concept the part is
  tagged with, and `author_notes` separates the two.

  ==================================================================
  3 · WHAT THE RECOVERY CHANGED, BEYOND ADDING EIGHT QUESTIONS
  ==================================================================

  Three things a reviewer should look at first.

  **The matching item's option bank was recovered, not reconstructed.** What the
  2024 paper prints is a diagram of four needles entering skin, subcutaneous
  tissue and muscle at different angles, lettered A to D on the picture itself —
  there is no text bank anywhere, which is why `eoy.json` records
  `matchingOptions: null`. The four printed characters would let anyone guess a
  bank, and guessing it was refused. The solver had written the route beside each
  character in blue ink: "D – IV", "A – intramuscular", "C – intradermal", "B –
  subcutaneous". That is the bank and the key together, off the document. The
  option text in the record expands those abbreviations and changes nothing else.
  A faculty reviewer holding the original plate should still confirm that needle
  A is the intramuscular one, and the record says so.

  **Two questions were tagged on the wrong concept, and the answers corrected
  them.** The 2025 practical item 6 and the 2024 practical item 4 both ask for
  the advantages and disadvantages of a route shown in a photograph. With the
  picture unread, both had been put on CON-FND-3CC8853A7D6DA8, the enteral-routes
  concept, on the assumption that the preparation was an oral one. The recovered
  answer to the 2024 item is headed "5. Inhalation route", and the 2025 item is a
  photograph of an inhaler with the same answer block. Both now carry
  CON-FND-6A60CE8D2E7C5C as their main concept, with the enteral concept moved to
  `concept_ids`. Had the recovery not happened, two questions would have awarded
  mastery in the oral route to students demonstrating nothing of the kind.

  Worth a reviewer's attention on its own: the department's subject tree, taken
  from its own book in ../academic/108-int-structure.md, has **no node for
  inhalation**. The Routes chapter names oral, sublingual/buccal, rectal, the
  parenteral routes, intra-arterial, intra-cardiac, intra-thecal, intra-articular
  and topical, and stops. Both papers examine a route the book does not list, so
  those two questions' `module_subject` stops at the chapter rather than naming a
  node that does not exist.

  **A defect in the department's own material is reproduced, not repaired.** The
  2024 answer to practical item 3, the tabby-cat heart, says in its gross
  description that the LEFT ventricle is hypertrophied and dilated and in its own
  numbered diagnosis two lines later that the RIGHT is. That is the same
  contradiction ../practical/108-INT-practical.md records for the atlas specimen
  C19-1, whose plate label reads "L.V." — so it is the department's, appearing
  twice, and not the student's. No side is picked here: the expected point records
  ventricular hypertrophy and dilatation without naming a ventricle, so an
  examiner can mark either once a pathologist rules.

  ==================================================================
  4 · MARKS, AND WHAT IS NOT INVENTED
  ==================================================================

  Every mark below is printed on the paper. Where the examiner printed one figure
  for a group and named the elements — "Define: (1 mark each = 2 marks)",
  "Enumerate: [2 Mark each]", "Write Description and Diagnosis of the following:
  [1.5 Mark each]" — the group figure is divided as the paper's own "each"
  divides it, and that is the examiner's arithmetic and not this file's. Where
  the paper printed a single total over several named elements and no "each" —
  the four receptor types for 4 marks, and each 1.5-mark practical description in
  2024 — the question carries one part worth the paper's own total with the
  elements as its `Expects:` points, which is the 101 ISK precedent and avoids
  inventing a per-element split the examiner never printed. `markWritten`
  apportions.

  The 2025 practical pathology run prints its own check: 0.5 + 0.5 + 1 for
  question 1, 1 + 1 for question 2, 1 + 1 for question 3, and then "Total = 6
  marks" beneath them. It agrees.

  The pharmacology orientation sheet (src_b4f736e3bd809dbee187) prints "EOY: 8
  marks, 2 SAQs, 4 marks each", and both papers do set exactly two 4-mark
  pharmacology written questions in their end-of-year section. The paper and the
  sheet agree, so no weighting here rests on inference.

  `Expects:` lines are a mark scheme, not a model answer, and none is invented.
  Each comes either from the solved copy's own answer — quoted verbatim in
  `author_notes` — or from the definition of the concept the part is tagged with,
  which is the department's own two books read chapter by chapter.

  ==================================================================
  5 · IMAGES
  ==================================================================

  14 of the 28 records show the candidate something and ask a question about it:
  seven practical plates and specimens, six route photographs, and the matching
  diagram. The repository holds zero medical images, so each carries a
  `media_recommendations` block with `Priority: required` and a `Purpose:` line
  saying why prose cannot stand in — for every one of them, describing the
  picture is the answer to the question.

  Recovering the answers did not make these questions publishable. It made them
  markable. A candidate must still read the organ off the section and the route
  off the photograph, so the media requests stand exactly as they did, and the
  briefs are now much more specific because the answers say what each picture
  shows. No URL is invented and no image is described as though the repository
  held it.

  ==================================================================
  6 · SOURCE FAULTS, PRESERVED
  ==================================================================

  The 2025 paper prints two different questions numbered 9 and never prints a 10.
  Both are multiple-choice and neither is in this batch; it is recorded here
  because it is why `questionId` is positional and why no citation below joins on
  a printed number alone.

  The 2025 practical section changes enumerator style mid-way with no heading: it
  runs "QUESTION 1", "QUESTION 2", "QUESTION 3" on pages 11-12, then restarts at
  "1)" on page 13 and runs to "6)". Nine questions in this batch come from that
  section, and each `source_citation` says which run its printed number belongs
  to, because "question 1" alone is ambiguous there.

  The four 2024 practical pathology items print no prompt of their own at all.
  `stemSource` records that they inherit the standing subsection instruction
  "Write Description and Diagnosis of the following: [1.5 Mark each]", and that
  instruction is their prompt here rather than one written for them.

  The 2024 paper prints "(The questions might not be the most accurate)" on its
  own title page, so its wording is a student transcription and not certainly the
  registrar's. That caveat is carried into `author_notes` on every 2024 question.
  It also prints "parental" for parenteral, which is corrected in the question
  line and kept in `author_notes`. The 2025 paper's text layer drops fi and fl
  ligatures, so "Diﬀerentiate" survives as the file's own byte sequence.

  The manifest labels all four exam files subject "Pathology". That is wrong for
  about half of each paper; `subject` here follows `eoy.json`'s per-question
  inference, which for the 2024 practical section is the paper's own printed
  headings "I) Pathology" and "II) Pharmacology:".

  ==================================================================
  7 · DERIVATION, AND THE COLUMNS LEFT DELIBERATELY EMPTY
  ==================================================================

  `derived_from` is blank on every question. A written question may only be
  derived from another written question, and these were not derived from anything
  — they were transcribed off real papers, so there is nothing to name. The
  column is written and left empty rather than omitted, so a reviewer can see the
  decision was made.

  The same is true of the payload columns of the formats a given question is not:
  `correct_answer`, `correct_answers`, `labeling_image`, `labeling_alt`,
  `labeling_points` and `completion_text` are present and empty throughout, and
  `written_parts` is empty on the one matching record while `matching_options`
  and `matching_prompts` are empty on the 27 written ones.

  `resource_ids` is empty for the reason the concept batches give: the Kasr
  `src_…` sources are real and checksummed but absent from the corpus source
  index, so a citation naming one would fail the corpus check. The provenance
  lives in `source_citation` and `author_notes` instead, and the student ledger
  strips both — a student is never told which paper a question came off, nor who
  solved it.

  `attachments` and `attached_image` are empty because no rights-cleared asset
  exists. What is needed is requested in `media_recommendations`.

  `question_only_for` is KAU_Y1 throughout: these are one faculty's papers and
  should not be served to another university's students on a subject match.

  Import: Admin › Bulk import → question. The concepts in
  ../concept/108-INT-concepts-pathology.md,
  ../concept/108-INT-concepts-pharmacology.md and
  ../concept/108-INT-concepts-pharmacology-updates.md, and the articles in
  ../article/108-INT-pathology.md and ../article/108-INT-pharmacology.md, must be
  imported first.
-->

# Item
## id
QW-108-2025-S2Q1
## title
Necrosis and pathological calcification, defined
## subject
fnd
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
Two terms from general pathology, to be defined in turn. One mark each.
## question
Define necrosis, and define pathological calcification.
## written_parts
### (a) 1 mark
Define necrosis.
Expects: Necrosis is the death of a group of cells within a living body
Expects: The injured cell loses membrane integrity and lysosomal enzymes are released into the cytosol, destroying the cellular constituents
Expects: Cell contents leak into the surrounding tissue and provoke an inflammatory response
Expects: Two processes underlie the morphology — denaturation of proteins, and enzymatic digestion of organelles and other cytosolic components
Concept: CON-FND-4CD77608FB35DF
### (b) 1 mark
Define pathological calcification.
Expects: Abnormal deposition of calcium salts in tissue other than bone or teeth
Expects: It is either dystrophic or metastatic
Expects: Dystrophic calcification occurs in tissue already affected by disease, with a normal serum calcium
Expects: Metastatic calcification occurs in viable tissue, and follows hypercalcaemia
Concept: CON-FND-33466CEBFC4EBA
Concept: CON-FND-87392C49DB246C
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-4CD77608FB35DF | CON-FND-33466CEBFC4EBA | CON-FND-87392C49DB246C
## concept_ids
CON-FND-718662116D90C4
## contextual_concept_ids
[clear]

## topic
General pathology
## subtopic
Necrosis and pathological calcification
## module
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Necrosis
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate
## question_type
Definition
## cognitive_effort
Medium
## cognitive_effort_score
0.4
## setting
Academic
## reasoning_level
1
## inferred_difficulty
62
## exam_relevance
9.0
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
240
## randomise_answers
no
## library_ids
ART-108-PAT-NECROSIS | ART-108-PAT-PATHOLOGICAL-CALCIFICATION
## resource_ids
[clear]

## learning_objective
Define necrosis in the department's own terms, and define pathological calcification well enough to name both of the forms it takes.
## source_citation
EOY 108 exam 199 [solved] (2).pdf — Kasr Al Ainy end of year 2025, batch 199, Section 2: End of year, printed question 1, p7. Manifest src_bd1595e59d116b78436a.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “1.Define: (1 mark each = 2 marks) a. Necrosis b. Pathological calcification”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
The per-part figure is the examiner's own: the paper prints “1 mark each = 2 marks”. Nothing is apportioned by this file.
Part (b) is co-primary on the two forms of pathological calcification, because the department book defines the parent term by dividing it into them and a definition that names neither is not the answer the paper wants.
The mark scheme is taken from the department pathology book (src_e294bafc730fe7111b06, pp6 and 15) through the concepts tagged on each part; the solved copy leaves this question's ruled answer space blank, so the book is the only source for what earns a mark.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2025-S2Q2
## title
Two causes each of generalised haemosiderosis, of cell injury, and two examples of localised amyloidosis
## subject
fnd
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
Three short enumerations from general pathology. Two marks each.
## question
Enumerate two causes of generalised haemosiderosis, two causes of cell injury, and two examples of localised amyloidosis.
## written_parts
### (a) 2 marks
Enumerate two causes of generalised haemosiderosis.
Expects: Increased absorption of dietary iron
Expects: Haemolytic anaemias, in which abnormal quantities of iron are released from erythrocytes
Expects: Repeated blood transfusion, the transfused red cells being an exogenous load of iron
Concept: CON-FND-5DBC795B58DC74
### (b) 2 marks
Enumerate two causes of cell injury.
Expects: Oxygen deprivation (hypoxia), which the book names the extremely important and common cause
Expects: Physical agents
Expects: Chemical agents and drugs
Expects: Infectious agents
Expects: Immunological reactions
Expects: Genetic derangements
Expects: Nutritional imbalance
Concept: CON-FND-8989A49BEBCF14
### (c) 2 marks
Enumerate two examples of localised amyloidosis.
Expects: Medullary carcinoma of the thyroid, where amyloid made of calcitonin precursor lies in the stroma around the tumour cells
Expects: Cerebral amyloid in Alzheimer disease, in neuritic plaques and in vessel walls
Expects: The islets of Langerhans in type 2 diabetes mellitus
Expects: Occasional deposits without obvious cause in skin, laryngeal wall, lung, ureter and urinary system
Concept: CON-FND-42A1BD1A1DAAE6
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-5DBC795B58DC74 | CON-FND-8989A49BEBCF14 | CON-FND-42A1BD1A1DAAE6
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pathology
## subtopic
Pigments, causes of cell injury, and amyloidosis
## module
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments
108 INT > Pathology > Cellular Response to Injury > Causes of cell injury
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Localized amyloidosis
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate
## question_type
Enumeration
## cognitive_effort
Medium
## cognitive_effort_score
0.45
## setting
Academic
## reasoning_level
1
## inferred_difficulty
58
## exam_relevance
8.0
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
360
## randomise_answers
no
## library_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS | ART-108-PAT-CELL-INJURY-AND-ADAPTATION | ART-108-PAT-AMYLOIDOSIS
## resource_ids
[clear]

## learning_objective
Give causes of generalised haemosiderosis, causes of cell injury, and examples of localised amyloidosis, from three separate chapters of the department's pathology book.
## source_citation
EOY 108 exam 199 [solved] (2).pdf — Kasr Al Ainy end of year 2025, batch 199, Section 2: End of year, printed question 2, p8. Manifest src_bd1595e59d116b78436a.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “2.Enumerate: (2 marks each = 6 marks) a.Two causes of generalised haemosiderosis b.Two causes of cell injury c.Two examples of localised amyloidosis”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
The per-part figure is the examiner's own: the paper prints “2 marks each = 6 marks”. Nothing is apportioned by this file.
Each part asks for two and the scheme lists more than two, because the book lists more than two and any two of them earn the marks. The list is the book's, not a selection made here: three causes of generalised haemosiderosis (p14), seven causes of cell injury (p4), four localised amyloid deposits (p18).
This question is co-primary on 3 concepts: its three parts test things a student can know separately, and forcing one would leave two of them earning no mastery evidence.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2025-S2Q3
## title
Bioavailability, plasma half-life, super-sensitivity and mutagenicity, defined
## subject
pharm
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
Four terms from general pharmacology, to be defined in turn. One mark each.
## question
Define bioavailability, plasma half life (t1/2), super-sensitivity, and mutagenicity.
## written_parts
### (a) 1 mark
Define bioavailability.
Expects: The fraction of an administered dose that reaches the systemic circulation unchanged
Expects: An intravenous dose is by definition completely bioavailable
Expects: An oral dose is not, because it must survive the gut lumen, the gut wall and then the liver — the first-pass effect
Concept: CON-FND-CF40F32A8A74A0
### (b) 1 mark
Define plasma half life (t1/2).
Expects: The time in which the plasma concentration of a drug falls to half its value
Expects: It follows from the volume of distribution and the clearance together, not from either alone
Expects: It is a constant only while elimination is first-order; once the eliminating enzyme saturates the half-life lengthens as the concentration rises
Concept: CON-FND-955AD7B6FE6F03
### (c) 1 mark
Define super-sensitivity.
Expects: The normal action of the drug, exaggerated, after a small therapeutic dose
Expects: It is quantitatively abnormal rather than qualitatively abnormal, which is what separates it from idiosyncrasy
Expects: It is not immune-mediated, which is what separates it from drug allergy
Concept: CON-FND-7FFD028F1C7B58
### (d) 1 mark
Define mutagenicity.
Expects: A heritable change produced in the genetic material
Expects: It is a Type D — delayed — adverse drug reaction, appearing long after the exposure that caused it
Expects: Teratogenicity and carcinogenicity are the other two delayed effects, and are not the same thing
Concept: CON-FND-2A5DE8657047E4
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-CF40F32A8A74A0 | CON-FND-955AD7B6FE6F03 | CON-FND-7FFD028F1C7B58 | CON-FND-2A5DE8657047E4
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Pharmacokinetic and adverse-reaction definitions
## module
108 INT
## module_subject
108 INT > Pharmacology > Pharmacokinetics > Absorption > Bioavailability
108 INT > Pharmacology > Fundamental Principles of Pharmacokinetics > Plasma Half Life
108 INT > Pharmacology > Adverse Drug Reactions > Type B (Bizarre or unpredictable adverse effects)
108 INT > Pharmacology > Adverse Drug Reactions > Type D (Delayed effects)
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate
## question_type
Definition
## cognitive_effort
Medium
## cognitive_effort_score
0.45
## setting
Academic
## reasoning_level
1
## inferred_difficulty
60
## exam_relevance
10.0
## clinical_relevance
0.4
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
300
## randomise_answers
no
## library_ids
ART-108-PHA-PHARMACOKINETICS-ADME | ART-108-PHA-KINETIC-PRINCIPLES | ART-108-PHA-ADVERSE-DRUG-REACTIONS
## resource_ids
[clear]

## learning_objective
Define bioavailability, plasma half-life, super-sensitivity and mutagenicity, and say for each what it is being distinguished from.
## source_citation
EOY 108 exam 199 [solved] (2).pdf — Kasr Al Ainy end of year 2025, batch 199, Section 2: End of year, printed question 3, p9. Manifest src_bd1595e59d116b78436a.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “3)Define: 1 marks each = 4 marks a)Bioavailability b)Plasma half life (t1/2) c)Super-sensitivity d)Mutagenicity”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite. The paper's own “1 marks each” is reproduced as it stands, singular noun and all.
The per-part figure is the examiner's own. Nothing is apportioned by this file.
This is one of the two 4-mark pharmacology written questions the orientation sheet (src_b4f736e3bd809dbee187) says the end-of-year paper carries: “EOY: 8 marks, 2 SAQs, 4 marks each”. The paper and the sheet agree.
Bioavailability is asked again in the 2024 sitting as question III(c), which is why exam_relevance is at the top of the range.
This question is co-primary on 4 concepts: four unrelated definitions, each of which a student can hold without the others.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2025-S2Q4
## title
The four receptor types, and how each transduces its signal
## subject
pharm
## status
Draft
## owner
Claude
## format
structured_written
## derived_from

## vignette
One question on receptor signalling, worth four marks.
## question
Mention the four types of receptors and briefly describe how each type transduces signals.
## written_parts
### (a) 4 marks
Mention the four types of receptors and briefly describe how each type transduces signals.
Expects: Ligand-gated ion channels open a pore directly, and act in milliseconds
Expects: G-protein-coupled receptors act through a G protein and a second messenger, in seconds
Expects: Enzyme-linked receptors, such as the tyrosine kinases, phosphorylate intracellular targets over minutes to hours
Expects: Intracellular nuclear receptors bind a lipid-soluble ligand and alter gene transcription
Expects: The nuclear receptor's effect appears over hours to days and outlasts the drug
Concept: CON-FND-42F34977A8DF23
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-42F34977A8DF23
## concept_ids
CON-FND-38CD8C0BD5B4DE
## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Types of receptors and signal transduction mechanism
## module
108 INT
## module_subject
108 INT > Pharmacology > Pharmacodynamics > Types of receptors and signal transduction mechanism
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
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
2
## inferred_difficulty
42
## exam_relevance
10.0
## clinical_relevance
0.4
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
360
## randomise_answers
no
## library_ids
ART-108-PHA-PHARMACODYNAMICS
## resource_ids
[clear]

## learning_objective
Name the four receptor types, describe how each transduces its signal, and give the timescale of the response each produces.
## source_citation
EOY 108 exam 199 [solved] (2).pdf — Kasr Al Ainy end of year 2025, batch 199, Section 2: End of year, printed question 4, p10. Manifest src_bd1595e59d116b78436a.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “4) Mention the FOUR (4) types of receptors and briefly describe how each type transduces signals (4 marks)”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
Per-element marks are not the examiner's — the paper gave 4 for the whole question and named four elements without dividing the figure between them. This question therefore carries one part worth the paper's own total, and the scheme apportions, exactly as the 101 ISK batch does.
The 2024 sitting sets the same question almost word for word as its question IV: “The 4 types of drug receptors and briefly describe how each type transduces signals.” Both are authored, because they are two sittings of the same paper and a student revising 2024 should meet 2024's.
This is the second of the two 4-mark pharmacology written questions the orientation sheet says the end-of-year paper carries.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2025-S3Q1
## title
Name the route of administration shown, and give two uses of it
## subject
pharm
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
A photograph shows a needle being inserted almost flat into the skin, raising a small bleb.

## question
Name the route of administration shown, and mention two uses of that route.
## written_parts
### (a) 0.5 marks
What is the route of administration?
Expects: Intra-dermal
Concept: CON-FND-6A60CE8D2E7C5C
### (b) 0.5 marks
Mention two uses of this route.
Expects: Vaccination, for example the BCG vaccine
Expects: Sensitivity testing
Concept: CON-FND-6A60CE8D2E7C5C

## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6A60CE8D2E7C5C
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Routes of Drug Administration and Dosage Forms
## module
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Easy

## question_type
Pharmacology
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
68

## exam_relevance
8.0
## clinical_relevance
0.6
## academic_relevance
0.8
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
120
## randomise_answers
no
## library_ids
ART-108-PHA-ROUTES
## resource_ids
[clear]

## learning_objective
Recognise the intra-dermal route from how the needle enters the skin, and give the two things it is used for.

## source_citation
EOY 108 exam 199 [solved] (2).pdf — Kasr Al Ainy end of year 2025, batch 199, Section 3: Practical, printed question 1 of the second, arabic-numbered run, p13. Manifest src_bd1595e59d116b78436a.
## attached_image

## attachments

## media_recommendations
### photograph · Question stem
Brief: An intra-dermal injection in progress — the needle almost parallel to the skin, bevel up, raising a visible wheal at the site
Purpose: The question asks the candidate to name the route from the picture, and it is the angle of the needle and the wheal that identify it. Describing that in prose would give the answer away, so the item needs the photograph itself.
Priority: required
Status: needed
Source direction: the department's own practical photographs, or an openly licensed clinical-skills image library
Rights: must be cleared by the department, or CC-BY or public domain
Section: Question stem

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “1) Mention [1 mark] a. What’s the route of administration? [0.5 marks] b. Mention two uses of this route [0.5 marks]”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
The per-part figure is the examiner's own: the paper prints 0.5 beside each part and 1 mark over the pair.
The answers are recovered from the solved copy and are not in the text layer. Page 13 was rendered with `pdftoppm -r 400` and read; part (a) carries the handwritten word “Intra dermal” over the ruled line, and part (b) a pasted answer graphic reading “5-Used in 1)Vaccination: e.g. BCG vaccine 2)Sensitivity test.” Both expected points are that graphic's own words.
This question still depends on its picture. The answer tells us the route, but a student meeting the item must read it off the photograph, so the media request stands at Priority: required.
The solved copy is signed “Solved by Nour and Menna” on its last page — see the batch preamble. These answers are a student's work, not the department's mark scheme, which is why the question is Draft and needs faculty confirmation.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2025-S3Q2
## title
Differentiate IV bolus, slow intravenous injection and intravenous infusion
## subject
pharm
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
The same drug may be put into a vein three different ways. Differentiate them.
## question
Differentiate between the three types of intravenous injection: IV bolus (shot or push), slow intravenous injection, and intravenous infusion.
## written_parts
### (a) 0.5 marks
IV bolus (shot or push)
Expects: Using a syringe, a few millilitres are injected rapidly
Expects: A cannula could be used if repeated administration is required
Expects: It gives the fastest onset and complete bioavailability, and cannot be stopped once given
Concept: CON-FND-6235934A8DD0FE
### (b) 0.5 marks
Slow intravenous injection
Expects: As an IV shot, but given over a few minutes — for example IV calcium
Expects: Spreading the same dose over minutes avoids a dangerous peak concentration
Concept: CON-FND-6235934A8DD0FE
### (c) 0.5 marks
Intravenous infusion
Expects: Using an intravenous catheter (tube) and a cannula
Expects: A large volume of IV fluids can be administered
Expects: The drug arrives continuously at a controlled rate, which is how a steady state is held and how an irritant drug is diluted
Concept: CON-FND-6235934A8DD0FE

## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6235934A8DD0FE
## concept_ids
CON-FND-7A66C16BA5029C
## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Types of intravenous administration
## module
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Parenteral routes > Types of intravenous administration
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate
## question_type
Pharmacology
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Both
## reasoning_level
2
## inferred_difficulty
57
## exam_relevance
8.5
## clinical_relevance
0.7
## academic_relevance
0.85
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
180
## randomise_answers
no
## library_ids
ART-108-PHA-ROUTES
## resource_ids
[clear]

## learning_objective
Differentiate intravenous bolus, slow intravenous injection and infusion by speed, by controllability, and by what each can safely deliver.
## source_citation
EOY 108 exam 199 [solved] (2).pdf — Kasr Al Ainy end of year 2025, batch 199, Section 3: Practical, printed question 2 of the second, arabic-numbered run, p13. Manifest src_bd1595e59d116b78436a.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “2) Diﬀerentiate between the three types of intravenous injection (IV) [1.5 marks] a. IV bolus (shot or push) [0.5 marks] b. Slow intravenous injection [0.5 marks] c. Intravenous infusion [0.5 marks]”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite. The examiner's own subpart labels are reproduced as the prompts, because here the label is the whole question.
The per-part figure is the examiner's own: the paper prints 0.5 beside each of the three and 1.5 over the group.
The paper's text layer drops the fi and fl ligatures, so “Diﬀerentiate” above is the file's own byte sequence and not a typing error introduced here.
The first expected point of each part is the solved copy's own answer, recovered by rendering page 13 at 400 dpi because the answers are pasted graphics invisible to the text layer. Verbatim: (a) “Using a syringe, few milliliters are injected rapidly. A cannula could be used if repeated administration is required.” (b) “- as IV shot but given over few minutes (e.g. IV calcium).” (c) “3- Intravenous infusion: - Using an intravenous catheter (tube) and a cannula, large volume of I.V. fluids can be administered.” The remaining points come from the concept, which is the department book.
The solved copy is signed “Solved by Nour and Menna”, so these answers are a student's work rather than the department's mark scheme.
This question needs no picture: it is the one item in the 2025 practical run whose text stands on its own.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2025-S3Q3
## title
What happens when a drug meant for a vein goes into an artery
## subject
pharm
## status
Draft
## owner
Claude
## format
short_answer
## derived_from

## vignette
A drug intended for intravenous injection is given into an artery by mistake.
## question
What can happen with inadvertent injection of drugs in arteries instead of veins?
## written_parts
### (a) 0.5 marks
What can happen with inadvertent injection of drugs in arteries instead of veins?
Expects: Arterial thrombosis
Expects: Gangrene in the affected limb
Expects: The drug reaches the tissue the artery supplies at full concentration instead of being diluted in the venous return
Concept: CON-FND-6235934A8DD0FE

## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6235934A8DD0FE
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Intra-arterial
## module
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Intra-arterial
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate

## question_type
Pharmacology
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
8.5
## clinical_relevance
0.8
## academic_relevance
0.7
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
90
## randomise_answers
no
## library_ids
ART-108-PHA-ROUTES
## resource_ids
[clear]

## learning_objective
State the hazard of inadvertent intra-arterial injection, and explain it from where the drug goes instead of the venous return.
## source_citation
EOY 108 exam 199 [solved] (2).pdf — Kasr Al Ainy end of year 2025, batch 199, Section 3: Practical, printed question 3 of the second, arabic-numbered run, p14. Manifest src_bd1595e59d116b78436a.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “3) What can happen with inadvertent injection of drugs in arteries instead of veins? [0.5 marks]”.
The prompt above is the examiner's own sentence, unchanged.
The mark is the examiner's own, printed beside the question.
The first two expected points are the solved copy's own answer, recovered by rendering page 14 at 400 dpi: a pasted banner reading “This can lead to arterial thrombosis and gangrene in the affected limb.” It is invisible to the text layer. The third point is the concept's, and explains why.
The solved copy is signed “Solved by Nour and Menna”, so this is a student's answer rather than the department's mark scheme.
The 2024 sitting asks the same route from the other side — two deliberate applications of intra-arterial injection — and that question is authored separately below with its own recovered answer.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2025-S3Q4
## title
Two indications for intra-thecal injection
## subject
pharm
## status
Draft
## owner
Claude
## format
short_answer
## derived_from

## vignette
Some drugs are injected directly into the theca. Say when that is done.
## question
Give two indications of intra-thecal injection.
## written_parts
### (a) 0.5 marks
Give two indications of intra-thecal injection.
Expects: Spinal anaesthesia
Expects: Antibiotic administration
Expects: Both are drugs that must reach the central nervous system directly, which is what the route is reserved for
Concept: CON-FND-6235934A8DD0FE

## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6235934A8DD0FE
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Intra-thecal
## module
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Intra-thecal
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate

## question_type
Pharmacology
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Clinical
## reasoning_level
2
## inferred_difficulty
58

## exam_relevance
6.5
## clinical_relevance
0.8
## academic_relevance
0.7
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
90
## randomise_answers
no
## library_ids
ART-108-PHA-ROUTES
## resource_ids
[clear]

## learning_objective
Give two indications for intra-thecal injection, and say what makes a drug a candidate for the route.
## source_citation
EOY 108 exam 199 [solved] (2).pdf — Kasr Al Ainy end of year 2025, batch 199, Section 3: Practical, printed question 4 of the second, arabic-numbered run, p14. Manifest src_bd1595e59d116b78436a.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “4) Give two indications of intra-thecal injection [0.5 marks]”.
The prompt above is the examiner's own sentence, unchanged.
The mark is the examiner's own, printed beside the question.
The two indications are the solved copy's own answer, recovered by rendering page 14 at 400 dpi: a pasted answer graphic reading “1- Spinal anesthesia: 2- Antibiotic administration”. It is invisible to the text layer, which is why an earlier pass of this batch left the scheme naming only the criterion.
The solved copy is signed “Solved by Nour and Menna”, so these are a student's answers rather than the department's mark scheme, and a faculty reviewer should confirm them.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2025-S3Q5
## title
Name the route shown, and give its advantages — sublingual

## subject
pharm
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
A drawing shows an open mouth with the tongue raised and a small tablet placed under it.

## question
Name the route of administration shown, and give the advantages of that route.
## written_parts
### (a) 0.5 marks
What is the route of administration?
Expects: Sublingual
Concept: CON-FND-6A60CE8D2E7C5C
### (b) 0.5 marks
Give advantages of this route.
Expects: Easy administration
Expects: Rapid onset of action, due to rapid absorption
Expects: Good bioavailability, bypassing the gut and the hepatic first pass effect
Expects: Proper control of dose — if adverse effects develop, the rest of the drug can be spat out or swallowed
Concept: CON-FND-3CC8853A7D6DA8

## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6A60CE8D2E7C5C | CON-FND-3CC8853A7D6DA8
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Routes of Drug Administration and Dosage Forms
## module
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Oral route
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate
## question_type
Pharmacology
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
55
## exam_relevance
8.0
## clinical_relevance
0.6
## academic_relevance
0.8
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
120
## randomise_answers
no
## library_ids
ART-108-PHA-ROUTES
## resource_ids
[clear]

## learning_objective
Recognise the sublingual route from where the tablet is placed, and explain why it acts fast and escapes the first pass.

## source_citation
EOY 108 exam 199 [solved] (2).pdf — Kasr Al Ainy end of year 2025, batch 199, Section 3: Practical, printed question 5 of the second, arabic-numbered run, p14. Manifest src_bd1595e59d116b78436a.
## attached_image

## attachments

## media_recommendations
### diagram · Question stem
Brief: A sagittal or open-mouth view of a tablet placed under the raised tongue, in the sublingual position
Purpose: The candidate is to name the route from where the tablet sits. Saying "under the tongue" in prose is the answer to part (a), so the item needs the picture rather than a description of it.
Priority: required
Status: needed
Source direction: openly licensed medical illustration, or the department's own practical images
Rights: must be CC-BY or public domain, or cleared by the department
Section: Question stem

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “5) Mention: [1 mark] a. What is the route of administration? [0.5 marks] b. Give advantages of this route. [0.5 marks]”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
The per-part figure is the examiner's own: 0.5 beside each part, 1 mark over the pair.
The answers are recovered from the solved copy by rendering page 14 at 400 dpi; they are pasted graphics and handwriting, invisible to the text layer. Part (a) carries the handwritten word “Sublingual”. Part (b) carries a pasted block reading “Advantages: 1- Easy administration. 2- Rapid onset of action (due to rapid absorption) 3- Good bioavailability: bypassing the gut and hepatic first pass effect. 4- Proper control of dose: if adverse effects developed by either spitting or swallowing the rest of the drug.” The four expected points are that block's own words.
The recovered route confirms the concept this part was already tagged with: CON-FND-3CC8853A7D6DA8 covers the sublingual and buccal routes alongside the oral one, and the recovered advantages are the ones its definition gives.
The solved copy is signed “Solved by Nour and Menna”, so these are a student's answers rather than the department's mark scheme.
Printed number 5 belongs to the second, arabic-numbered run of Section 3, which restarts at 1 on page 13 with no heading marking the join.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2025-S3Q6
## title
Name the route shown, and give its advantages and two disadvantages — inhalation

## subject
pharm
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
A photograph shows a pressurised metered-dose inhaler.

## question
Name the route of administration shown, give the advantages of that route, and give two disadvantages of it.
## written_parts
### (a) 0.5 marks
What is this route of administration?
Expects: Inhalation
Concept: CON-FND-6A60CE8D2E7C5C
### (b) 0.5 marks
Give advantages of this route.
Expects: Excellent and rapid absorption
Expects: Because of the large surface area
Expects: Because of the thin porous membrane
Expects: Because of the rich blood supply of the alveoli
Concept: CON-FND-6A60CE8D2E7C5C
### (c) 0.5 marks
Give two disadvantages of this route.
Expects: Inaccurate dosing — administration needs patient education and training
Expects: If the drug is irritant, cough and bronchospasm might occur
Concept: CON-FND-6A60CE8D2E7C5C

## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6A60CE8D2E7C5C

## concept_ids
CON-FND-3CC8853A7D6DA8

## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Routes of Drug Administration and Dosage Forms
## module
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms

## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate
## question_type
Pharmacology
## cognitive_effort
Medium
## cognitive_effort_score
0.55
## setting
Academic
## reasoning_level
2
## inferred_difficulty
52
## exam_relevance
8.0
## clinical_relevance
0.6
## academic_relevance
0.8
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
180
## randomise_answers
no
## library_ids
ART-108-PHA-ROUTES
## resource_ids
[clear]

## learning_objective
Recognise the inhalation route from its device, and give the alveolar features that make its absorption fast and the two things that go wrong with it.

## source_citation
EOY 108 exam 199 [solved] (2).pdf — Kasr Al Ainy end of year 2025, batch 199, Section 3: Practical, printed question 6 of the second, arabic-numbered run, p15. Manifest src_bd1595e59d116b78436a.
## attached_image

## attachments

## media_recommendations
### photograph · Question stem
Brief: A pressurised metered-dose inhaler, the whole device visible
Purpose: The candidate is to name the route from the device. Naming the device in prose is the answer to part (a), so the item needs the photograph rather than a description of it.
Priority: required
Status: needed
Source direction: the department's own practical photographs, or an openly licensed pharmacy image library
Rights: must be cleared by the department, or CC-BY or public domain
Section: Question stem

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “6) Mention [1.5 marks] a.What is this route of administration? [0.5 marks] b. Give advantages of this route. [0.5 marks] c. Give two disadvantages of this route.[0.5 marks]”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
The per-part figure is the examiner's own: 0.5 beside each of the three, 1.5 over the group.
The answers are recovered from the solved copy by rendering page 15 at 400 dpi; they are handwriting and pasted graphics, invisible to the text layer. Part (a) carries the handwritten word “Inhalation”. Part (b): “Advantages: Excellent & Rapid absorptions due to 1- Large surface area, 2- Thin porous membrane and 3- Rich blood supply of the alveoli.” Part (c): “Disadvantages: 1- Inaccurate dosing (administration needs patient education and training). 2- If irritant: cough and bronchospasm might occur.” The expected points are those blocks' own words.
The recovered route corrects this question's tagging. An earlier pass of this batch put it on CON-FND-3CC8853A7D6DA8, the enteral-routes concept, on the assumption that the picture showed an oral preparation. It does not: the route is inhalation, so the main concept is now the routes-classification record and the enteral concept has moved to concept_ids, where it is genuinely assessed by contrast without taking mastery it did not earn.
The department book's subject tree has no node for inhalation — its Routes chapter names oral, sublingual/buccal, rectal, the parenteral routes, intra-arterial, intra-cardiac, intra-thecal, intra-articular and topical, and nothing else. So module_subject stops at the chapter rather than naming a node that does not exist. That gap is worth a reviewer's attention: the department examines a route its own book does not list.
The solved copy is signed “Solved by Nour and Menna”, so these are a student's answers rather than the department's mark scheme.
This is the last item of the 2025 paper; the page ends “End of exam”.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2024-S2Q1
## title
Amyloidosis and brown atrophy of the heart, defined
## subject
fnd
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
Two terms from general pathology, to be defined in turn. One mark each.
## question
Define amyloidosis, and define brown atrophy of the heart.
## written_parts
### (1) 1 mark
Define amyloidosis.
Expects: Extracellular deposition of an abnormal protein in a beta-pleated configuration, together with a glycoprotein, amyloid P protein
Expects: Deposited on basement membranes, reticulin fibres, and the walls of small blood vessels
Expects: The affected tissue becomes hard and waxy
Expects: It arises from abnormal protein folding: the protein becomes insoluble, aggregates, and deposits as fibrils
Concept: CON-FND-D955408D228002
### (2) 1 mark
Define brown atrophy of the heart.
Expects: A senile atrophy of the heart with an excess of lipofuscin pigment
Expects: The heart is reduced in size and brown in colour
Expects: The coronaries appear more tortuous, because arteries of normal length now run over a smaller heart
Expects: Microscopically the muscle fibres are thin and atrophic, with excess fine yellow-brown lipofuscin granules on both sides of the nucleus
Concept: CON-FND-063F60318B4D20
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-D955408D228002 | CON-FND-063F60318B4D20
## concept_ids
CON-FND-2A370D3EF3EDCF
## contextual_concept_ids
[clear]

## topic
General pathology
## subtopic
Amyloidosis and endogenous pigments
## module
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Amyloidosis > Pathogenesis of amyloidosis
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Pigments > Endogenous Pigments
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate
## question_type
Definition
## cognitive_effort
Medium
## cognitive_effort_score
0.45
## setting
Academic
## reasoning_level
1
## inferred_difficulty
55
## exam_relevance
8.5
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
240
## randomise_answers
no
## library_ids
ART-108-PAT-AMYLOIDOSIS | ART-108-PAT-PATHOLOGICAL-PIGMENTS
## resource_ids
[clear]

## learning_objective
Define amyloidosis by what is deposited and where, and define brown atrophy of the heart by the pigment that colours it and the change in size that explains its gross appearance.
## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 2: EOY, printed question I, p5. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “I. Define: [1 Mark each] 1) Amyloidosis: 2) Brown Atrophy of the heart:”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
The per-part figure is the examiner's own: the paper prints “[1 Mark each]”.
The subpart labels are the paper's own arabic 1 and 2 under a roman-numbered question, and they are reproduced rather than relettered to (a) and (b), so a student comparing this with the paper sees the same labels.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's. A reviewer should treat the phrasing, though not the topics, as provisional.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2024-S2Q2
## title
Four causes of metastatic calcification, four of fatty liver, and the four types of necrosis
## subject
fnd
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
Three enumerations from general pathology, four items wanted in each. Two marks each.
## question
Enumerate four causes of metastatic calcification, four causes of fatty liver, and four types of necrosis.
## written_parts
### (1) 2 marks
Enumerate four causes of metastatic calcification.
Expects: Elevated parathyroid hormone, from a parathyroid tumour or ectopic secretion by another neoplasm
Expects: Secondary hyperparathyroidism in chronic renal failure
Expects: Bone destruction — multiple myeloma, diffuse skeletal metastasis, Paget's disease, or immobilisation
Expects: Hypervitaminosis D
Expects: The milk-alkali syndrome, from excessive ingestion of calcium and absorbable antacids
Concept: CON-FND-87392C49DB246C
### (2) 2 marks
Enumerate four causes of fatty liver.
Expects: Alcohol abuse, which the book names the commonest cause in the USA
Expects: Protein malnutrition
Expects: Diabetes mellitus
Expects: Obesity
Expects: Hypoxia
Expects: Toxins
Concept: CON-FND-3B89025E2FB4E0
### (3) 2 marks
Enumerate four types of necrosis.
Expects: Coagulative necrosis
Expects: Liquefactive or colliquative necrosis
Expects: Caseation necrosis
Expects: Fat necrosis
Expects: Fibrinoid necrosis
Concept: CON-FND-5285A9707E61CA
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-87392C49DB246C | CON-FND-3B89025E2FB4E0 | CON-FND-5285A9707E61CA
## concept_ids
CON-FND-88508ABAB84A67 | CON-FND-5B3B6BA12670C7 | CON-FND-6626C19B61A23B | CON-FND-BA0739479AD0FC
## contextual_concept_ids
[clear]

## topic
General pathology
## subtopic
Calcification, steatosis and the types of necrosis
## module
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification > Metastatic calcification
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate
## question_type
Enumeration
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
1
## inferred_difficulty
55
## exam_relevance
9.0
## clinical_relevance
0.3
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
360
## randomise_answers
no
## library_ids
ART-108-PAT-PATHOLOGICAL-CALCIFICATION | ART-108-PAT-INTRACELLULAR-ACCUMULATIONS | ART-108-PAT-NECROSIS
## resource_ids
[clear]

## learning_objective
Give four causes of metastatic calcification, four causes of a fatty liver, and four types of necrosis, from three separate chapters of the department's pathology book.
## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 2: EOY, printed question II, p5. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “II. Enumerate: [2 Mark each] 1) 4 Causes of metastatic calcification: 2) 4 Causes of fatty liver: 3) 4 types of necrosis:”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
The per-part figure is the examiner's own: the paper prints “[2 Mark each]”.
Each part asks for four and the scheme lists five or six, because the book lists five or six and any four earn the marks. The lists are the book's: metastatic calcification p16, hepatic steatosis p11, the types of necrosis pp6-7.
Part (3) is tagged on coagulative necrosis as its main concept, following the concept batch's own reading of this subpart, and the four other named types sit in concept_ids — they are genuinely assessed on the way and earn mastery there, without any one of them being what the part is for.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2024-S2Q3
## title
Physiological antagonism, the loading dose, bioavailability and Phase I hepatic metabolism
## subject
pharm
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
Four ideas from general pharmacology, to be described in turn. One mark each.
## question
Describe physiological antagonism, the loading dose, bioavailability, and Phase I hepatic metabolism of drugs.
## written_parts
### (a) 1 mark
Describe physiological antagonism.
Expects: Two drugs act at different receptors, on different systems
Expects: They produce opposite effects on the same measurement, so each cancels the other
Expects: Neither binds the other's receptor, which is what separates it from receptor antagonism
Concept: CON-FND-A1E2092A49359C
### (b) 1 mark
Describe the loading dose.
Expects: An initial dose given to reach the target plasma concentration promptly
Expects: It is larger than the usual maintenance dose
Expects: It is worked out from the desired concentration and the apparent volume of distribution
Expects: An incorrect loading dose can therefore cause toxicity
Concept: CON-FND-3CC86CC26BF549
### (c) 1 mark
Describe bioavailability.
Expects: The fraction of an administered dose that reaches the systemic circulation unchanged
Expects: An intravenous dose is by definition completely bioavailable
Expects: An oral dose is not, because it must survive the gut lumen, the gut wall and then the liver — the first-pass effect
Concept: CON-FND-CF40F32A8A74A0
### (d) 1 mark
Describe Phase I hepatic metabolism of drugs.
Expects: Phase I is non-synthetic: oxidation, reduction or hydrolysis
Expects: It unmasks or introduces a functional group on the drug
Expects: The metabolite may be less active, equally active, or more active than the parent drug
Expects: The product usually still needs Phase II conjugation before the kidney can excrete it
Concept: CON-FND-44B6AE3E7DDA55
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-A1E2092A49359C | CON-FND-3CC86CC26BF549 | CON-FND-CF40F32A8A74A0 | CON-FND-44B6AE3E7DDA55
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Antagonism, dosing, absorption and metabolism
## module
108 INT
## module_subject
108 INT > Pharmacology > Drug Interactions > Pharmacodynamic drug interactions
108 INT > Pharmacology > Fundamental Principles of Pharmacokinetics > Loading dose
108 INT > Pharmacology > Pharmacokinetics > Absorption > Bioavailability
108 INT > Pharmacology > Pharmacokinetics > Metabolism (Biotransformation) > Types of Metabolic reactions
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate
## question_type
Definition
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
55
## exam_relevance
10.0
## clinical_relevance
0.4
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
300
## randomise_answers
no
## library_ids
ART-108-PHA-DRUG-INTERACTIONS | ART-108-PHA-KINETIC-PRINCIPLES | ART-108-PHA-PHARMACOKINETICS-ADME
## resource_ids
[clear]

## learning_objective
Describe physiological antagonism, the loading dose, bioavailability and Phase I metabolism, and for each say what it is being distinguished from.
## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 2: EOY, printed question III, p6. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “III. Describe each of the following: [1 Mark each] a) Physiological antagonism. b) The loading dose. c) Bioavailability. d) Phase 1 hepatic metabolism of drugs.”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
The per-part figure is the examiner's own: the paper prints “[1 Mark each]”.
Part (b) is tagged on CON-FND-3CC86CC26BF549, which is a concept that is already live rather than one this programme authored; ../concept/108-INT-concepts-pharmacology-updates.md attaches it to this module and to the book's own subject path, and ../article/108-INT-pharmacology.md lists it on ART-108-PHA-KINETIC-PRINCIPLES. Nothing was minted for it, because a second “Loading dose” would be a duplicate.
Bioavailability is asked again in the 2025 sitting as question 3(a), which is why exam_relevance is at the top of the range.
This is one of the two 4-mark pharmacology written questions the orientation sheet says the end-of-year paper carries.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2024-S2Q4
## title
The four types of drug receptor, and how each transduces its signal
## subject
pharm
## status
Draft
## owner
Claude
## format
structured_written
## derived_from

## vignette
One question on receptor signalling, worth four marks.
## question
Mention the four types of drug receptors, and briefly describe how each type transduces signals.
## written_parts
### (1) 4 marks
Mention the four types of drug receptors and briefly describe how each type transduces signals.
Expects: Ligand-gated ion channels open a pore directly, and act in milliseconds
Expects: G-protein-coupled receptors act through a G protein and a second messenger, in seconds
Expects: Enzyme-linked receptors, such as the tyrosine kinases, phosphorylate intracellular targets over minutes to hours
Expects: Intracellular nuclear receptors bind a lipid-soluble ligand and alter gene transcription
Expects: The nuclear receptor's effect appears over hours to days and outlasts the drug
Concept: CON-FND-42F34977A8DF23
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-42F34977A8DF23
## concept_ids
CON-FND-38CD8C0BD5B4DE
## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Types of receptors and signal transduction mechanism
## module
108 INT
## module_subject
108 INT > Pharmacology > Pharmacodynamics > Types of receptors and signal transduction mechanism
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
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
2
## inferred_difficulty
42
## exam_relevance
10.0
## clinical_relevance
0.4
## academic_relevance
0.95
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
360
## randomise_answers
no
## library_ids
ART-108-PHA-PHARMACODYNAMICS
## resource_ids
[clear]

## learning_objective
Name the four receptor types, describe how each transduces its signal, and give the timescale of the response each produces.
## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 2: EOY, printed question IV, p7. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “IV. Mention: [4 Marks] 1) The 4 types of drug receptors and briefly describe how each type transduces signals.”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite. The subpart label is the paper's own arabic 1 under a roman-numbered question, and it is kept.
Per-element marks are not the examiner's — the paper gave 4 for the whole question and named four elements without dividing the figure between them. This question therefore carries one part worth the paper's own total, and the scheme apportions.
The 2025 sitting sets the same question as its question 4. Both are authored, because they are two sittings of the same paper and a student revising 2024 should meet 2024's wording.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2024-S3Q1
## title
Delaying the onset of the route shown, and the sites it is given at
## subject
pharm
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
A diagram shows a needle entering at 45 degrees, through skin into the subcutaneous tissue above muscle.

## question
How can the onset of action of the route of administration shown be delayed, and what are the common sites used for that route?
## written_parts
### (a) 0.5 marks
How can the onset of action of this route of administration be delayed?
Expects: Vasoconstrictors
Expects: Shock
Expects: Cold application
Concept: CON-FND-6A60CE8D2E7C5C
### (b) 0.5 marks
What are the common sites used for this route?
Expects: Outer arm
Expects: Abdomen
Expects: Thigh
Expects: Buttocks
Concept: CON-FND-6A60CE8D2E7C5C

## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6A60CE8D2E7C5C
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Parenteral routes
## module
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Parenteral routes
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate

## question_type
Pharmacology
## cognitive_effort
Medium
## cognitive_effort_score
0.55
## setting
Clinical
## reasoning_level
2
## inferred_difficulty
55

## exam_relevance
7.0
## clinical_relevance
0.7
## academic_relevance
0.75
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
120
## randomise_answers
no
## library_ids
ART-108-PHA-ROUTES
## resource_ids
[clear]

## learning_objective
Give three things that slow the onset of an injected route, and name the sites at which it is given.

## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 3: Practical, subsection II) Pharmacology, printed question 1, p10. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations
### diagram · Question stem
Brief: A cross-section of skin, subcutaneous tissue and muscle with a needle entering at 45 degrees, the layers labelled
Purpose: Both parts say "this route" and only the diagram says which one. The candidate has to read the depth the needle reaches off the picture, so a prose description would settle the question the picture is there to ask.
Priority: required
Status: needed
Source direction: openly licensed medical illustration, or the department's own practical images
Rights: must be CC-BY or public domain, or cleared by the department
Section: Question stem

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “1) Mention: a) How can the onset of action of this route of administration be delayed? [0.5 Mark] b) What are the common sites used for this route? [0.5 Mark]”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
The per-part figure is the examiner's own: 0.5 beside each part. The paper prints no total over the pair, so none is written here.
The answers are recovered from the solved copy by rendering page 10 at 400 dpi; they are pasted graphics, invisible to the text layer. Part (a): “1- Vasoconstrictors. 2- Shock. 3- Cold application.” Part (b): “Common sites: 1- Outer arm. 2- Abdomen 3- Thigh. 4- Buttocks.” The expected points are those blocks' own words.
The route itself is deliberately not named here. The solver answered both parts without naming it, and the paper never prints it — the diagram beside the item shows a needle at 45 degrees reaching the subcutaneous tissue, which is what the reader is meant to identify. Writing the name into the scheme would be reading it off the picture on the candidate's behalf, so the question stays tagged on the routes-classification concept and a reviewer with the plate can add the name.
The solved copy is signed “Solved by Nour and Menna”, so these are a student's answers rather than the department's mark scheme.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2024-S3Q3
## title
Precautions when an irritant drug is given intravenously
## subject
pharm
## status
Draft
## owner
Claude
## format
short_answer
## derived_from

## vignette
A drug that irritates tissue has to be given into a vein.
## question
Mention the precautions taken for administration of irritant drugs by the intravenous route.
## written_parts
### (a) 0.5 marks
Mention the precautions done for administration of irritant drugs by the intravenous route?
Expects: Using large veins
Expects: Diluting the drug and administering it by infusion
Concept: CON-FND-6235934A8DD0FE

## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6235934A8DD0FE
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Types of intravenous administration
## module
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Parenteral routes > Types of intravenous administration
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate
## question_type
Pharmacology
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
7.5
## clinical_relevance
0.8
## academic_relevance
0.7
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
90
## randomise_answers
no
## library_ids
ART-108-PHA-ROUTES
## resource_ids
[clear]

## learning_objective
Say how an irritant drug is given safely into a vein, and explain the precaution from what dilution does to the concentration reaching the vein wall.
## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 3: Practical, subsection II) Pharmacology, printed question 3, p11. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “3) Mention the precautions done for administration of irritant drugs by the intravenous route? [0.5 Mark]”.
The question line above tidies the examiner's sentence, which prints a question mark after an imperative. The part prompt keeps the paper's own punctuation, question mark and all, because a source fault is preserved rather than corrected.
The mark is the examiner's own, printed beside the question.
Both expected points are the solved copy's own answer, recovered by rendering page 11 at 400 dpi: a pasted block reading “Irritant drugs: Very irritant drugs can be given if: > Using large veins. > Diluting the drug and administering it by infusion.” It is invisible to the text layer, which is why an earlier pass of this batch had to build the scheme from the concept alone. The recovered answer agrees with the concept and adds the large vein, which the book's routes pages do not survive extraction well enough to have supplied.
The solved copy is signed “Solved by Nour and Menna”, so these are a student's answers rather than the department's mark scheme.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2024-S3Q4
## title
Advantages and disadvantages of the route shown — inhalation

## subject
pharm
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
A photograph shows an inhaler device with its mouthpiece and cap.

## question
Mention the advantages of the route of administration shown, and the disadvantages of it.
## written_parts
### (a) 0.5 marks
Mention the advantages of this route of administration.
Expects: Excellent and rapid absorption
Expects: Because of the large surface area
Expects: Because of the thin porous membrane
Expects: Because of the rich blood supply of the alveoli
Concept: CON-FND-6A60CE8D2E7C5C
### (b) 0.5 marks
Mention the disadvantages of this route of administration.
Expects: Inaccurate dosing — administration needs patient education and training
Expects: If the drug is irritant, cough and bronchospasm might occur
Concept: CON-FND-6A60CE8D2E7C5C

## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6A60CE8D2E7C5C

## concept_ids
CON-FND-3CC8853A7D6DA8

## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Routes of Drug Administration and Dosage Forms
## module
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms

## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate
## question_type
Pharmacology
## cognitive_effort
Medium
## cognitive_effort_score
0.5
## setting
Academic
## reasoning_level
2
## inferred_difficulty
55
## exam_relevance
8.0
## clinical_relevance
0.6
## academic_relevance
0.8
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
120
## randomise_answers
no
## library_ids
ART-108-PHA-ROUTES
## resource_ids
[clear]

## learning_objective
Give the alveolar features that make inhaled absorption fast, and the two things that go wrong with the route.

## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 3: Practical, subsection II) Pharmacology, printed question 4, p11. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations
### photograph · Question stem
Brief: An inhaler device, mouthpiece and cap visible, of the kind used to deliver a drug to the lungs
Purpose: Both parts say "this route" and only the picture says which one. Naming the device in prose would identify the route the candidate is meant to recognise, so the item needs the photograph itself.
Priority: required
Status: needed
Source direction: the department's own practical photographs, or an openly licensed pharmacy image library
Rights: must be cleared by the department, or CC-BY or public domain
Section: Question stem

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “4) Mention the advantages of this route of administration. [0.5 Mark] - Mention the disadvantages of this route of administration. [0.5 Mark]”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
The paper letters neither demand: it prints the first beside the item number and the second on a dash below it. The (a) and (b) labels above are this file's, added because a written part needs a label, and the marks against them are the examiner's own 0.5 and 0.5.
The answers are recovered from the solved copy by rendering page 11 at 400 dpi; they are pasted graphics, invisible to the text layer. The block is headed “5. Inhalation route” and reads “Advantages: Excellent & Rapid absorptions due to 1- Large surface area, 2- Thin porous membrane and 3- Rich blood supply of the alveoli.” and “Disadvantages: 1- Inaccurate dosing (administration needs patient education and training). 2- If irritant: cough and bronchospasm might occur.”
That heading is what corrects this question's tagging. An earlier pass of this batch put it on CON-FND-3CC8853A7D6DA8, the enteral-routes concept, on the assumption that the picture showed an oral preparation. The solver's own heading names the route as inhalation, so the main concept is now the routes-classification record. The 2025 paper sets the identical question as its question 6 and its solved copy carries the same answer block.
The department book's subject tree has no node for inhalation, so module_subject stops at the chapter — see the note on the 2025 twin.
The solved copy is signed “Solved by Nour and Menna”, so these are a student's answers rather than the department's mark scheme.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2024-S3Q5
## title
Two applications for intra-arterial injection
## subject
pharm
## status
Draft
## owner
Claude
## format
short_answer
## derived_from

## vignette
Injecting into an artery is usually an accident. Sometimes it is the point.
## question
Mention two possible applications for intra-arterial injection.
## written_parts
### (a) 0.5 marks
Mention 2 possible applications for intra-arterial injection.
Expects: Diagnostic — coronary angiography
Expects: Therapeutic — a fibrinolytic drug, to dissolve a coronary thrombosis
Concept: CON-FND-6235934A8DD0FE

## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6235934A8DD0FE
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Intra-arterial
## module
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Intra-arterial
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate

## question_type
Pharmacology
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
8.5
## clinical_relevance
0.8
## academic_relevance
0.7
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
90
## randomise_answers
no
## library_ids
ART-108-PHA-ROUTES
## resource_ids
[clear]

## learning_objective
Give two deliberate applications of intra-arterial injection, and say what they have in common with the hazard of giving the route by accident.
## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 3: Practical, subsection II) Pharmacology, printed question 5, p11. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “5) Mention 2 possible applications for intra-arterial injection [0.5 Mark]”.
The prompt above is the examiner's own sentence, unchanged.
The mark is the examiner's own, printed beside the question.
Both expected points are the solved copy's own answer, recovered by rendering page 11 at 400 dpi: a pasted block reading “5- Intra- arterial: 1- Diagnostic: the coronary angiography. 2- Therapeutic: fibrinolytic drug to dissolve coronary thrombosis.” It is invisible to the text layer, which is why an earlier pass of this batch left the scheme naming only the criterion.
The department examines this route from both sides: the 2025 paper asks what happens when it is used by accident, and this paper asks when it is used on purpose. Both questions are authored, and both answers are recovered from their own solved copy.
The solved copy is signed “Solved by Nour and Menna”, so these are a student's answers rather than the department's mark scheme.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.

---

# Item
## id
QW-108-2024-S3Q6
## title
Name the route of the dosage form shown, and give its advantages and disadvantages — oral

## subject
pharm
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
A photograph shows a pile of two-tone gelatin capsules.

## question
What is the route of administration of the dosage form shown? Give the advantages of that route, and its disadvantages.
## written_parts
### (a) 0.5 marks
What is the route of administration of this dosage form?
Expects: The oral route
Concept: CON-FND-6A60CE8D2E7C5C
### (b) 0.5 marks
Mention the advantages of this route of administration.
Expects: Easy
Expects: Safe
Expects: Economic
Expects: Convenient
Concept: CON-FND-3CC8853A7D6DA8
### (c) 0.5 marks
Mention the disadvantages of this route of administration.
Expects: Not suitable in emergency situations, because the onset is delayed
Expects: Not suitable for uncooperative patients — comatose, psychotic, infants and children
Expects: Not in vomiting or severe diarrhoea
Expects: Not suitable for highly irritant drugs, as emetine hydrochloride
Expects: Not suitable for poorly absorbable drugs when a systemic effect is needed, as in the aminoglycosides
Expects: Some drugs undergo extensive first pass metabolism — by digestive enzymes, as insulin, or by hepatic microsomal enzymes, as nitroglycerin
Concept: CON-FND-3CC8853A7D6DA8

## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6A60CE8D2E7C5C | CON-FND-3CC8853A7D6DA8
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Routes of Drug Administration and Dosage Forms
## module
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Oral route
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate
## question_type
Pharmacology
## cognitive_effort
Medium
## cognitive_effort_score
0.55
## setting
Academic
## reasoning_level
2
## inferred_difficulty
52
## exam_relevance
8.5
## clinical_relevance
0.6
## academic_relevance
0.8
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
180
## randomise_answers
no
## library_ids
ART-108-PHA-ROUTES
## resource_ids
[clear]

## learning_objective
Read the oral route off the dosage form, and give both what it buys and the six situations the department says it does not suit.

## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 3: Practical, subsection II) Pharmacology, printed question 6, p11. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations
### photograph · Question stem
Brief: A group of hard gelatin capsules, clearly a swallowed oral dosage form
Purpose: The candidate is to name the route from the dosage form. Saying "capsules" in prose answers part (a) outright, so the item needs the photograph rather than a description of it.
Priority: required
Status: needed
Source direction: the department's own practical photographs, or an openly licensed pharmacy image library
Rights: must be cleared by the department, or CC-BY or public domain
Section: Question stem

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “6) What is the route of administration of this dosage form? [0.5 Mark] - Mention the advantages of this route of administration: [0.5 Mark] - Mention the disadvantages of this route of administration. [0.5 Mark]”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
The paper letters none of the three demands: it prints the first beside the item number and the other two on dashes below it. The (a), (b) and (c) labels above are this file's, added because a written part needs a label, and the three 0.5 figures are the examiner's own.
The answers are recovered from the solved copy by rendering page 11 at 400 dpi; they are handwriting and pasted graphics, invisible to the text layer. Part (a) carries the handwritten words “oral route”. Part (b): “Advantages: 1- Easy. 2- Safe. 3- Economic. 4- Convenient”. Part (c): “Disadvantages: NOT Suitable for 1- Emergency situations (delayed onset). 2- Uncooperative patients: comatose, psychotic, infants & children. 3- Not in vomiting or severe diarrhea. 4- Not suitable for highly irritant drugs (as emetine HCl). 5- Not suitable for poorly absorbable drugs: when systemic effect is needed as in aminoglycosides. 6- Some drugs undergo extensive first pass metabolism: a- by digestive enzymes: as insulin. b- by hepatic microsomal enzymes as Nitroglycerin.”
The recovered route confirms the concept this question was already tagged with. British spelling is used in the expected points where the answer graphic used American — “diarrhoea” for “diarrhea” — and nothing else is changed; the graphic's own spelling is above.
The solved copy is signed “Solved by Nour and Menna”, so these are a student's answers rather than the department's mark scheme.
This is the last item of the 2024 paper; the page ends “Best of wishes”.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.

---
# Item
## id
QW-108-2025-S3PATH1
## title
Identify the organ, the structure the arrows mark, and the diagnosis — hyaline degeneration of the spleen
## subject
fnd
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
A stained histology section is displayed, with red arrows marking two structures near the edge of the field.
## question
Identify the organ in the section shown, say what the red arrows are pointing at, and give the diagnosis.
## written_parts
### (a) 0.5 marks
Identify the organ.
Expects: Spleen
Concept: CON-FND-5CB8B822A9A6AF
### (b) 0.5 marks
The red arrows are pointing at ……
Expects: Hyalinosis of the central arteriole
Concept: CON-FND-5CB8B822A9A6AF
### (c) 1 mark
Diagnose.
Expects: Hyaline degeneration, spleen
Expects: The splenic capsule and fibrous trabeculae show hyalinosis — thickened, structureless and homogeneously pink
Expects: The arteriolar wall is thickened and its lumen narrowed
Concept: CON-FND-5CB8B822A9A6AF
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-5CB8B822A9A6AF
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pathology
## subtopic
Hyaline Change
## module
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Hyaline Change
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Hard
## question_type
Diagnosis
## cognitive_effort
Medium
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
9.0
## clinical_relevance
0.4
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
240
## randomise_answers
no
## library_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## resource_ids
[clear]

## learning_objective
Recognise hyaline degeneration of the spleen on a stained section, name the structure the arrows mark, and give the diagnosis.
## source_citation
EOY 108 exam 199 [solved] (2).pdf — Kasr Al Ainy end of year 2025, batch 199, Section 3: Practical, printed "QUESTION 1" of the first run, p11. Manifest src_bd1595e59d116b78436a.
## attached_image

## attachments

## media_recommendations
### photograph · Question stem
Brief: The stained splenic section this item displays: capsule and fibrous trabeculae showing hyalinosis, with red arrows on the hyalinised central arterioles of two lymphoid follicles
Purpose: Every part of this question is read off the plate — the organ, the arrowed structure and the diagnosis. Naming any of them in prose is the answer, so the item cannot be sat without the section itself.
Priority: required
Status: needed
Source direction: the department's own practical plates, or the atlas this module already catalogues in ../practical/108-INT-practical.md
Rights: must be cleared by the department
Section: Question stem
## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “QUESTION 1: a.Identify the organ. [0.5 mark] b.The red arrows are pointing at …… [0.5 mark] c.Diagnose [1 mark]”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite, and the three lettered parts are kept as three parts because that is how the paper marks them.
The per-part figures are the examiner's own: 0.5, 0.5 and 1.
The answers are recovered from the solved copy and are not in the text layer — they are pasted answer graphics, the same failure that hid this paper's multiple-choice key until the highlights were rasterised. Page 11 was rendered with `pdftoppm -r 400` and read. Verbatim: (a) “spleen”; (b) “Hyalinosis of central arteriole”; (c) “Diagnosis : Hyaline degeneration, spleen”.
The last two expected points of part (c) are not on this paper. They come from the concept, whose original_wording quotes the department's own practical atlas on SLIDE (7) — “The splenic capsule and fibrous trabeculae show hyalinosis (thickened, structureless, homogenous pink)”. The 2024 paper sets the same slide and prints that description in full, which is authored below.
An earlier pass of this batch left this question unauthored, on the ground that the plate's subject could not be known and so no concept could be named. That was wrong: the answer was in the document, only not in its text layer.
The solved copy carries no signature on the 2025 paper, unlike the 2024 one; who solved it is not recorded, so the answers are Draft and need faculty confirmation.
No derived_from: transcribed rather than derived, so there is nothing to name.
---
# Item
## id
QW-108-2025-S3PATH2
## title
Describe the section microscopically and diagnose it — traumatic fat necrosis
## subject
fnd
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
A stained histology section of a fatty tissue is displayed, with an arrow on one cell.
## question
Describe the section shown microscopically, and give the diagnosis.
## written_parts
### (a) 1 mark
Describe the following picture microscopically.
Expects: Section from adipose tissue
Expects: Ghosts of fat cells, surrounded by foamy macrophages, which engulf the fat
Expects: Multinucleated giant cells, arrowed
Concept: CON-FND-6626C19B61A23B
### (b) 1 mark
Diagnose.
Expects: Traumatic fat necrosis
Expects: It follows trauma to adipose tissue, which releases intracellular fat and provokes an inflammatory response
Expects: A common site is the breast, where it produces a palpable mass
Concept: CON-FND-6626C19B61A23B
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6626C19B61A23B
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pathology
## subtopic
Fat necrosis
## module
108 INT
## module_subject
108 INT > Pathology > Cellular Response to Injury > Necrosis > Types of necrosis > Fat necrosis
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Hard
## question_type
Diagnosis
## cognitive_effort
Medium
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
3
## inferred_difficulty
42
## exam_relevance
9.0
## clinical_relevance
0.5
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
240
## randomise_answers
no
## library_ids
ART-108-PAT-NECROSIS
## resource_ids
[clear]

## learning_objective
Describe traumatic fat necrosis microscopically — ghosts of fat cells, foamy macrophages and giant cells — and give the diagnosis.
## source_citation
EOY 108 exam 199 [solved] (2).pdf — Kasr Al Ainy end of year 2025, batch 199, Section 3: Practical, printed "QUESTION 2" of the first run, p11. Manifest src_bd1595e59d116b78436a.
## attached_image

## attachments

## media_recommendations
### photograph · Question stem
Brief: The stained section this item displays: adipose tissue showing ghosts of fat cells surrounded by foamy macrophages, with an arrow on a multinucleated giant cell
Purpose: The candidate is asked to describe what is on the slide and then diagnose from it. Writing the description into the stem would be handing over both marks, so the item cannot be sat without the section itself.
Priority: required
Status: needed
Source direction: the department's own practical plates, or the atlas this module already catalogues in ../practical/108-INT-practical.md
Rights: must be cleared by the department
Section: Question stem
## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “QUESTION 2: a. Describe the following picture microscopically? [1 mark] b.Diagnose [1 mark]”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
The per-part figures are the examiner's own: 1 and 1.
The answers are recovered from the solved copy by rendering page 11 at 400 dpi; they are pasted answer graphics and are invisible to the text layer. Verbatim: (a) “Description : Section from adipose tissue : Ghosts of fat cells surrounded by foamy macrophages (engulf the fat) and Multinucleated giant cells (arrow).”; (b) “Diagnosis : Traumatic fat necrosis”.
The three expected points of part (a) are that graphic's own words. The second and third points of part (b) are not on the paper; they come from the concept, which is the department book on p7.
An earlier pass of this batch left this question unauthored on the ground that the plate's subject could not be known. The answer was in the document all along, only not in its text layer.
No derived_from: transcribed rather than derived, so there is nothing to name.
---
# Item
## id
QW-108-2025-S3PATH3
## title
Describe the specimen grossly and diagnose it — subcutaneous fibroma with dystrophic calcification
## subject
fnd
## status
Draft
## owner
Claude
## format
multipart_written
## derived_from

## vignette
A gross specimen is displayed, cut across to show its interior.
## question
Describe the specimen shown grossly, and give the diagnosis.
## written_parts
### (a) 1 mark
Describe this following picture grossly.
Expects: The mass is round and capsulated
Expects: On cut section it is greyish white
Expects: The cut surface shows granular chalky white foci of calcification
Concept: CON-FND-718662116D90C4
### (b) 1 mark
Diagnose.
Expects: Subcutaneous fibroma with dystrophic calcification
Expects: The calcification is dystrophic because it sits in tissue already altered by disease, at a normal serum calcium
Concept: CON-FND-33466CEBFC4EBA
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-718662116D90C4 | CON-FND-33466CEBFC4EBA
## concept_ids
CON-FND-87392C49DB246C
## contextual_concept_ids
[clear]

## topic
General pathology
## subtopic
Dystrophic calcification
## module
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification > Dystrophic calcification
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Hard
## question_type
Diagnosis
## cognitive_effort
Medium
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
9.0
## clinical_relevance
0.4
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
240
## randomise_answers
no
## library_ids
ART-108-PAT-PATHOLOGICAL-CALCIFICATION
## resource_ids
[clear]

## learning_objective
Describe a calcified soft-tissue mass grossly, and say why the calcification in it is dystrophic rather than metastatic.
## source_citation
EOY 108 exam 199 [solved] (2).pdf — Kasr Al Ainy end of year 2025, batch 199, Section 3: Practical, printed "QUESTION 3" of the first run, p12. Manifest src_bd1595e59d116b78436a.
## attached_image

## attachments

## media_recommendations
### photograph · Question stem
Brief: The gross specimen this item displays: a round capsulated subcutaneous mass, cut across to show a greyish white surface with granular chalky white foci of calcification
Purpose: The candidate is asked to describe the specimen and then diagnose from it. Writing the description into the stem would be handing over both marks, so the item cannot be sat without the specimen photograph.
Priority: required
Status: needed
Source direction: the department's own practical plates, or the atlas this module already catalogues in ../practical/108-INT-practical.md
Rights: must be cleared by the department
Section: Question stem
## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “QUESTION 3: a. Describe this following picture grossly. [1 mark] b.Diagnose. [1 mark]”.
The prompt above rewrites that into a sittable question without changing what is asked; the original is kept here so a reviewer can check the rewrite.
The per-part figures are the examiner's own: 1 and 1. The page then prints “Total = 6 marks” over the three practical pathology items, which is 2 + 2 + 2 and agrees.
The answers are recovered from the solved copy by rendering page 12 at 400 dpi; they are pasted answer graphics and are invisible to the text layer. Verbatim: (a) “Gross Pathology : 1.The mass is round and capsulated. 2.Cut section : Grayish white and shows granular chalky white foci of calcification.”; (b) “Diagnosis : Subcutaneous Fibroma with dystrophic calcification.”
The three expected points of part (a) are that graphic's own words, with the department book's British spelling of grey. The second point of part (b) is the concept's, and is what makes the word “dystrophic” in the diagnosis earn its mark.
The question is co-primary on two concepts: the morphology concept, which is what part (a) is marked against — the book's “chalky white granular material” — and the dystrophic concept, which is what part (b) turns on. Metastatic calcification sits in concept_ids because telling the two apart is the reasoning the diagnosis requires without being what the item asks for.
An earlier pass of this batch left this question unauthored on the ground that the specimen could not be known. The answer was in the document all along, only not in its text layer.
No derived_from: transcribed rather than derived, so there is nothing to name.
---
# Item
## id
QW-108-2024-S3PATH1
## title
Describe and diagnose the slide shown — hyaline degeneration of the spleen
## subject
fnd
## status
Draft
## owner
Claude
## format
structured_written
## derived_from

## vignette
A stained histology section is displayed. Write its description and its diagnosis.
## question
Write the description and the diagnosis of the section shown.
## written_parts
### (1) 1.5 marks
Write the description and diagnosis of the section shown.
Expects: Section from the spleen
Expects: The splenic capsule and fibrous trabeculae show hyalinosis — thickened, structureless, homogeneous pink
Expects: Hyaline degeneration (hyalinosis) of the central arterioles of the lymphoid follicles
Expects: The arteriolar wall is thickened, and the lumen is narrowed
Expects: Diagnosis: hyaline degeneration, spleen
Concept: CON-FND-5CB8B822A9A6AF
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-5CB8B822A9A6AF
## concept_ids
[clear]

## contextual_concept_ids
[clear]

## topic
General pathology
## subtopic
Hyaline Change
## module
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Hyaline Change
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Hard
## question_type
Diagnosis
## cognitive_effort
Medium
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
9.0
## clinical_relevance
0.4
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
270
## randomise_answers
no
## library_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## resource_ids
[clear]

## learning_objective
Describe hyaline degeneration of the spleen on a stained section, naming what the capsule, the trabeculae and the central arterioles show, and give the diagnosis.
## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 3: Practical, subsection I) Pathology, printed item 1, p8. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations
### photograph · Question stem
Brief: The stained splenic section this item displays — the department atlas indexes it as SLIDE (7): capsule and fibrous trabeculae showing hyalinosis, and hyalinised central arterioles in the lymphoid follicles
Purpose: The candidate is asked to describe the slide and diagnose from it. Writing the description into the stem hands over the whole 1.5 marks, so the item cannot be sat without the section.
Priority: required
Status: needed
Source direction: the department's own practical plates, or the atlas this module already catalogues in ../practical/108-INT-practical.md
Rights: must be cleared by the department
Section: Question stem
## author_notes
Transcribed from the paper, not derived. The answer is recovered from the solved copy by rendering page 8 at 400 dpi; it is a pasted answer graphic and is invisible to the text layer. Verbatim: “SLIDE (7): HYALINE DEGENERATION, SPLEEN. Section from the spleen showing: The splenic capsule and fibrous trabeculae show hyalinosis (thickened, structureless, homogenous pink). Hyaline degeneration (hyalinosis) of the central arterioles of lymphoid follicles. The arteriolar wall is thickened, and their lumen is narrowed.” The five expected points are that graphic's own words, with British spellings.
The answer names the department's own slide number, SLIDE (7), which is the same item the practical batch catalogues at ../practical/108-INT-practical.md and the same slide the 2025 paper sets as its practical QUESTION 1. That is a direct join between the exam and the atlas, and it is what fixes the concept.
The paper prints no prompt of its own beside this item — only the number and ruled answer space. eoy.json records that in stemSource: “the standing instruction for this subsection; the paper prints nothing beside the item number itself”. The prompt above is that standing instruction, “Write Description and Diagnosis of the following: [1.5 Mark each]”, which is the only thing the examiner asks.
The mark is the examiner's own “[1.5 Mark each]”, printed once over the four items. The question carries one part worth that whole figure, with description and diagnosis as its expected points, because the paper never divides the 1.5 between them — the 101 ISK precedent, and markWritten apportions.
An earlier pass of this batch left this question unauthored on the ground that the plate's subject could not be known and so no concept could be named. That was wrong: the answer was in the document, only not in its text layer.
The solved copy is signed “Solved by Nour and Menna” on its last page, so these are a student's answers rather than the department's mark scheme, and a faculty reviewer should confirm them.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.
---
# Item
## id
QW-108-2024-S3PATH2
## title
Describe and diagnose the slide shown — dystrophic calcification in fibrotic tissue
## subject
fnd
## status
Draft
## owner
Claude
## format
structured_written
## derived_from

## vignette
A stained histology section is displayed. Write its description and its diagnosis.
## question
Write the description and the diagnosis of the section shown.
## written_parts
### (1) 1.5 marks
Write the description and diagnosis of the section shown.
Expects: Section in fibrotic tissue
Expects: It shows dystrophic calcification and some inflammatory cells
Expects: Calcification is seen as blue basophilic deposition
Expects: Ragged and torn foci are noted, because the calcified tissue is difficult for the microtome knife to cut
Expects: Diagnosis: dystrophic calcification
Concept: CON-FND-718662116D90C4
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-718662116D90C4
## concept_ids
CON-FND-33466CEBFC4EBA
## contextual_concept_ids
[clear]

## topic
General pathology
## subtopic
Pathological Calcification
## module
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Pathological Calcification > Dystrophic calcification
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Hard
## question_type
Diagnosis
## cognitive_effort
Medium
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
9.0
## clinical_relevance
0.4
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
270
## randomise_answers
no
## library_ids
ART-108-PAT-PATHOLOGICAL-CALCIFICATION
## resource_ids
[clear]

## learning_objective
Recognise calcification on a stained section by its blue basophilic deposition and the tearing it causes at the knife, and diagnose it as dystrophic.
## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 3: Practical, subsection I) Pathology, printed item 2, p9. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations
### photograph · Question stem
Brief: The stained section this item displays — the department atlas indexes it under DATA SHOW: fibrotic tissue with blue basophilic calcific deposition and ragged, torn foci
Purpose: The candidate is asked to describe the slide and diagnose from it. Writing the description into the stem hands over the whole 1.5 marks, so the item cannot be sat without the section.
Priority: required
Status: needed
Source direction: the department's own practical plates, or the atlas this module already catalogues in ../practical/108-INT-practical.md
Rights: must be cleared by the department
Section: Question stem
## author_notes
Transcribed from the paper, not derived. The answer is recovered from the solved copy by rendering page 8 at 400 dpi; it is a pasted answer graphic and is invisible to the text layer. Verbatim: “DATA SHOW: Dystrophic Calcification. Section in fibrotic tissue: It showed dystrophic calcification and some inflammatory cells. Calcification is seen as blue basophilic deposition. Ragged and torn foci are noted due to difficult cutting by microtome knife.” The five expected points are that graphic's own words.
The last two sentences are word for word the original_wording the morphology concept already quotes from the department's practical atlas under DATA SHOW, which is why that concept rather than the dystrophic one is the main concept here: the marks are for reading the deposit, not for reasoning about the serum calcium. The dystrophic concept sits in concept_ids, where the word in the diagnosis earns its mastery without displacing what the item is for.
The paper prints no prompt of its own beside this item — only the number and ruled answer space. eoy.json records that in stemSource: “the standing instruction for this subsection; the paper prints nothing beside the item number itself”. The prompt above is that standing instruction, “Write Description and Diagnosis of the following: [1.5 Mark each]”, which is the only thing the examiner asks.
The mark is the examiner's own “[1.5 Mark each]”, printed once over the four items. The question carries one part worth that whole figure, with description and diagnosis as its expected points, because the paper never divides the 1.5 between them — the 101 ISK precedent, and markWritten apportions.
An earlier pass of this batch left this question unauthored on the ground that the plate's subject could not be known and so no concept could be named. That was wrong: the answer was in the document, only not in its text layer.
The solved copy is signed “Solved by Nour and Menna” on its last page, so these are a student's answers rather than the department's mark scheme, and a faculty reviewer should confirm them.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.
---
# Item
## id
QW-108-2024-S3PATH3
## title
Describe and diagnose the specimen shown — fatty change of the heart, the tabby cat appearance
## subject
fnd
## status
Draft
## owner
Claude
## format
structured_written
## derived_from

## vignette
A gross specimen of a heart with its chambers opened is displayed. Write its description and its diagnosis.
## question
Write the description and the diagnosis of the specimen shown.
## written_parts
### (1) 1.5 marks
Write the description and diagnosis of the specimen shown.
Expects: Specimen: heart with open chambers
Expects: The myocardium is yellow in colour, and the columnae carneae show brown dots alternating with yellow ones — the tabby cat appearance
Expects: A ventricle shows hypertrophy and dilatation
Expects: The aorta and mitral valve show yellow atherosclerotic patches
Expects: Diagnosis: fatty change of the heart (tabby cat)
Expects: Diagnosis: hypertrophy and dilatation of a ventricle
Expects: Diagnosis: atherosclerosis of the aorta and mitral valve
Concept: CON-FND-4354823564BAB3
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-4354823564BAB3
## concept_ids
CON-FND-3BB4FF8F2223FF | CON-FND-DF726F864C8BC3
## contextual_concept_ids
[clear]

## topic
General pathology
## subtopic
Steatosis (Fatty Change)
## module
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Hard
## question_type
Diagnosis
## cognitive_effort
Medium
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
9.0
## clinical_relevance
0.4
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
270
## randomise_answers
no
## library_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS | ART-108-PAT-CELL-INJURY-AND-ADAPTATION
## resource_ids
[clear]

## learning_objective
Recognise fatty change of the myocardium from the tabby cat appearance of the columnae carneae, and read the other two lesions the same specimen carries.
## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 3: Practical, subsection I) Pathology, printed item 3, p9. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations
### photograph · Question stem
Brief: The gross heart specimen this item displays — the department atlas indexes it as C19-1: chambers opened, yellow myocardium, columnae carneae showing brown dots alternating with yellow, and atherosclerotic patches on the aorta and mitral valve
Purpose: The candidate is asked to describe the specimen and diagnose from it. Writing the description into the stem hands over the whole 1.5 marks, so the item cannot be sat without the specimen photograph.
Priority: required
Status: needed
Source direction: the department's own practical plates, or the atlas this module already catalogues in ../practical/108-INT-practical.md
Rights: must be cleared by the department
Section: Question stem
## author_notes
Transcribed from the paper, not derived. The answer is recovered from the solved copy by rendering page 9 at 400 dpi; it is a pasted answer graphic and is invisible to the text layer. Verbatim: “Specimen: Heart with open chambers. Gross Pathology : 1. The myocardium is yellow in color. The Columnae Carnae show brown dots alternating with yellow ones (Tabby cat appearance). 2. The left ventricle shows hypertrophy and dilatation. 3. The aorta and mitral valve shows yellow atherosclerotic patches. Diagnosis: 1. Fatty change of the heart (Tabby cat) 2. Hypertrophy and dilatation of right ventricle. 3. Atherosclerosis of aorta and mitral valve.”
The answer contradicts itself on which ventricle, and no side is picked here. Its gross description says the LEFT ventricle is hypertrophied and dilated; its own numbered diagnosis two lines later says the RIGHT. The expected points therefore record ventricular hypertrophy and dilatation without naming a ventricle, so an examiner can mark either once a pathologist rules. This is the same contradiction the practical batch records for specimen C19-1 in ../practical/108-INT-practical.md, where the atlas's own plate label reads “L.V.” — so the defect is in the department's material and is reproduced twice, not introduced by this transcription or by the student who solved the paper.
The specimen is the atlas's C19-1, which joins this exam item to the practical batch directly.
The paper prints no prompt of its own beside this item — only the number and ruled answer space. eoy.json records that in stemSource: “the standing instruction for this subsection; the paper prints nothing beside the item number itself”. The prompt above is that standing instruction, “Write Description and Diagnosis of the following: [1.5 Mark each]”, which is the only thing the examiner asks.
The mark is the examiner's own “[1.5 Mark each]”, printed once over the four items. The question carries one part worth that whole figure, with description and diagnosis as its expected points, because the paper never divides the 1.5 between them — the 101 ISK precedent, and markWritten apportions.
An earlier pass of this batch left this question unauthored on the ground that the plate's subject could not be known and so no concept could be named. That was wrong: the answer was in the document, only not in its text layer.
The solved copy is signed “Solved by Nour and Menna” on its last page, so these are a student's answers rather than the department's mark scheme, and a faculty reviewer should confirm them.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.
---
# Item
## id
QW-108-2024-S3PATH4
## title
Describe and diagnose the specimen shown — liver steatosis
## subject
fnd
## status
Draft
## owner
Claude
## format
structured_written
## derived_from

## vignette
A gross specimen, a slice of an organ, is displayed. Write its description and its diagnosis.
## question
Write the description and the diagnosis of the specimen shown.
## written_parts
### (1) 1.5 marks
Write the description and diagnosis of the specimen shown.
Expects: Specimen: slice of liver
Expects: The cut surface of the liver slice shows diffuse yellow coloration
Expects: The borders are rounded, indicating a soft consistency
Expects: Diagnosis: liver steatosis (fatty change)
Concept: CON-FND-70554B38361679
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-70554B38361679
## concept_ids
CON-FND-3B89025E2FB4E0
## contextual_concept_ids
[clear]

## topic
General pathology
## subtopic
Steatosis (Fatty Change)
## module
108 INT
## module_subject
108 INT > Pathology > Intracellular Accumulation and Extracellular Depositions > Intracellular Accumulations > Lipids intracellular accumulations > Steatosis (Fatty Change)
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Hard
## question_type
Diagnosis
## cognitive_effort
Medium
## cognitive_effort_score
0.6
## setting
Academic
## reasoning_level
3
## inferred_difficulty
40
## exam_relevance
9.0
## clinical_relevance
0.4
## academic_relevance
0.9
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
270
## randomise_answers
no
## library_ids
ART-108-PAT-INTRACELLULAR-ACCUMULATIONS
## resource_ids
[clear]

## learning_objective
Recognise a fatty liver from its diffuse yellow cut surface and rounded borders, and give the diagnosis.
## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 3: Practical, subsection I) Pathology, printed item 4, p9. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations
### photograph · Question stem
Brief: The gross specimen this item displays: a slice of liver whose cut surface is diffusely yellow, with rounded borders
Purpose: The candidate is asked to describe the specimen and diagnose from it. Writing the description into the stem hands over the whole 1.5 marks, so the item cannot be sat without the specimen photograph.
Priority: required
Status: needed
Source direction: the department's own practical plates, or the atlas this module already catalogues in ../practical/108-INT-practical.md
Rights: must be cleared by the department
Section: Question stem
## author_notes
Transcribed from the paper, not derived. The answer is recovered from the solved copy by rendering page 9 at 400 dpi; it is a pasted answer graphic and is invisible to the text layer. Verbatim: “Specimen: Slice of liver. Gross Pathology : 1. Cut surface of the liver slice shows diffuse yellow coloration. 2. The borders are rounded indicating soft consistency. Diagnosis: Liver steatosis (fatty change).” The four expected points are that graphic's own words.
The main concept is the gross-morphology record rather than the definition of steatosis, because the marks here are for reading a specimen; the definition sits in concept_ids, where it is genuinely assessed by the diagnosis without being what the item is for.
The paper prints no prompt of its own beside this item — only the number and ruled answer space. eoy.json records that in stemSource: “the standing instruction for this subsection; the paper prints nothing beside the item number itself”. The prompt above is that standing instruction, “Write Description and Diagnosis of the following: [1.5 Mark each]”, which is the only thing the examiner asks.
The mark is the examiner's own “[1.5 Mark each]”, printed once over the four items. The question carries one part worth that whole figure, with description and diagnosis as its expected points, because the paper never divides the 1.5 between them — the 101 ISK precedent, and markWritten apportions.
An earlier pass of this batch left this question unauthored on the ground that the plate's subject could not be known and so no concept could be named. That was wrong: the answer was in the document, only not in its text layer.
The solved copy is signed “Solved by Nour and Menna” on its last page, so these are a student's answers rather than the department's mark scheme, and a faculty reviewer should confirm them.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.
---
# Item
## id
QW-108-2024-S3Q2-MATCH
## title
Match the parenteral injection to its character
## subject
pharm
## status
Draft
## owner
Claude
## format
matching
## derived_from

## vignette
A diagram shows four needles labelled A to D entering the same block of tissue at different angles and depths, through skin, subcutaneous fat and muscle.
## question
Match the possible parenteral injection with its character.
## written_parts

## correct_answer

## correct_answers

## matching_options
A | Intramuscular injection
B | Subcutaneous injection
C | Intradermal injection
D | Intravenous injection
## matching_prompts
Used for administration of large volume of fluids, blood transfusion. = D
Oily drugs, depot preparation could be administered. = A
Used for sensitivity test or Vaccine. = C
Do not use irritant drugs. = B
## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6A60CE8D2E7C5C
## concept_ids
CON-FND-6235934A8DD0FE
## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Parenteral routes
## module
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Parenteral routes
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Hard
## question_type
Pharmacology
## cognitive_effort
Medium
## cognitive_effort_score
0.55
## setting
Clinical
## reasoning_level
2
## inferred_difficulty
45
## exam_relevance
8.0
## clinical_relevance
0.8
## academic_relevance
0.8
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
180
## randomise_answers
no
## library_ids
ART-108-PHA-ROUTES
## resource_ids
[clear]

## learning_objective
Tell the four parenteral injection routes apart by what each is used for and what each cannot take.
## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 3: Practical, subsection II) Pharmacology, printed item 2, p10, worth 1 mark. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations
### diagram · Question stem
Brief: A cross-section of skin, subcutaneous tissue and muscle with four needles entering at different angles and depths, labelled A, B, C and D in that order
Purpose: The option bank is this diagram. The four options are the four needles, and the paper prints no words for them at all — the letters sit on the picture. The option text in this record names what each needle is, which is what makes the item markable, but a candidate meeting it should still see the diagram, because reading a route off a needle's angle is what the item is for.
Priority: required
Status: needed
Source direction: the department's own practical images, or an openly licensed injection-technique illustration
Rights: must be cleared by the department, or CC-BY or public domain
Section: Question stem
## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “2) Match the possible parental injection with its character? [1 Mark]”, followed by four bulleted characters. The paper's spelling of “parental” for parenteral is the paper's own and is corrected in the question line above; the original is here.
The mark is the examiner's own, printed beside the item.
The option bank is not text. What the paper prints is a diagram of four needles entering skin, subcutaneous tissue and muscle at different angles, with A, B, C and D drawn on the picture in yellow circles. That is why eoy.json records matchingOptions as null with the reason “the list to match against is printed as an image and is absent from the text layer; it is not reconstructed”, and why an earlier pass of this batch left this question unauthored.
The bank is recovered from the solved copy, not inferred from the four characters. Page 10 was rendered with `pdftoppm -r 400` and read; the solver has written the route beside each character in blue ink. Verbatim, in the paper's order: “D – IV”, “A – intramuscular”, “C – intradermal”, “B – subcutaneous”. Those four lines give both the option text and the key, and they are the only reason this item is authorable. The option text above expands the solver's abbreviations to full route names and changes nothing else.
Read the provenance carefully before trusting the key: the four route names are a student's reading of the diagram, not the examiner's printed bank. The solved copy is signed “Solved by Nour and Menna” on its last page. A faculty reviewer with the original plate should confirm that needle A is the intramuscular one and so on before this is published, which is what Draft is for.
The paper prints a further demand under the same item number — “Which of the previous routes is used in emergency? And mention 2 possible reasons. [0.5 Mark]” — and it cannot ride on this record: written_parts is refused on a non-written format, so a matching question has nowhere to carry a marked written subpart. It is authored as its own short_answer question, QW-108-2024-S3Q2-EMERGENCY, and the two together are the paper's item 2. This is a split forced by the schema and recorded here so the ledger can count one source question as two records rather than two questions.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.
---
# Item
## id
QW-108-2024-S3Q2-EMERGENCY
## title
Which parenteral route is used in an emergency, and why
## subject
pharm
## status
Draft
## owner
Claude
## format
short_answer
## derived_from

## vignette
Of the four parenteral injection routes, one is the one reached for when there is no time.
## question
Which of the parenteral routes is used in emergency? Mention two possible reasons.
## written_parts
### (a) 0.5 marks
Which of the previous routes is used in emergency? And mention 2 possible reasons.
Expects: The intravenous route
Expects: Immediate onset, which is useful in emergencies
Expects: 100% bioavailability, which is useful in emergencies
Concept: CON-FND-6235934A8DD0FE
## correct_answer

## correct_answers

## matching_options

## matching_prompts

## labeling_image

## labeling_alt

## labeling_points

## completion_text

## main_concept
CON-FND-6235934A8DD0FE
## concept_ids
CON-FND-6A60CE8D2E7C5C
## contextual_concept_ids
[clear]

## topic
General pharmacology
## subtopic
Types of intravenous administration
## module
108 INT
## module_subject
108 INT > Pharmacology > Routes of Drug Administration and Dosage Forms > Parenteral routes > Types of intravenous administration
## universities
kau
## years
Year 1
## question_only_for
KAU_Y1
## difficulty
Moderate
## question_type
Pharmacology
## cognitive_effort
Medium
## cognitive_effort_score
0.55
## setting
Clinical
## reasoning_level
2
## inferred_difficulty
62
## exam_relevance
8.0
## clinical_relevance
0.8
## academic_relevance
0.8
## exam_weight_by_year
KAU_Y1=1
## estimated_seconds
90
## randomise_answers
no
## library_ids
ART-108-PHA-ROUTES
## resource_ids
[clear]

## learning_objective
Name the route used in an emergency and give the two kinetic properties that make it the one reached for.
## source_citation
EOY Exam {INT-108} 198 (Solved) (3).pdf — Kasr Al Ainy end of year 2024, batch 198, Section 3: Practical, subsection II) Pharmacology, printed under item 2, p10, worth 0.5 marks. Manifest src_3deab75f7f81cc5f5260.
## attached_image

## attachments

## media_recommendations

## author_notes
Transcribed from the paper, not derived. The examiner's wording was: “- Which of the previous routes is used in emergency? And mention 2 possible reasons. [0.5 Mark]”. The part prompt keeps that wording; the question line above replaces “the previous routes” with “the parenteral routes”, because this record is separated from the matching diagram those words point at.
The mark is the examiner's own, printed beside the demand.
This demand is printed under the paper's item 2, whose first half is the matching block authored as QW-108-2024-S3Q2-MATCH. It is a separate record because written_parts is refused on a matching format, so there is nowhere on that record to carry a marked written subpart. One source question, two records — the batch preamble counts it that way.
The answer is recovered from the solved copy by rendering page 10 at 400 dpi; it is handwriting plus a pasted graphic, invisible to the text layer. Verbatim: “D– intravenous”, then “1- Immediate onset (useful in emergencies). 2- 100% bioavailability (useful in emergencies).” The three expected points are those words.
The solved copy is signed “Solved by Nour and Menna”, so these are a student's answers rather than the department's mark scheme.
The 2024 paper prints “(The questions might not be the most accurate)” on its own title page, so its wording is a student transcription and not certainly the registrar's.
No derived_from: transcribed rather than derived, so there is nothing to name.