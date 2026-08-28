<!--
  103 BMS · group IV of Section 1 of the 2025 end-of-year paper — the vitamin
  matching block, on its own.

  Source: EOY (BMS - 103) 199 (2).pdf, manifest src_37f6c0daf3436096af19 — Kasr
  Al Ainy module 103 BMS, end of year, sat 2025 by batch 199. Section 1:
  Biochemistry, group IV "Match: {1 Mark each}", page 8. Solved twin
  src_a2e23ffc50b6b2e24897.

  ── WHY THIS IS A SEPARATE FILE ───────────────────────────────────────────────

  `docs/Kasr-Source-Imports/INDEX.md` splits these folders by content type:
  `written/` holds the written formats and `question/` holds everything else.
  The other seven questions of Section 1 are written questions and live in
  docs/Kasr-Source-Imports/written/103-BMS-EOY-2025-biochemistry-written.md.
  This one is `format: matching`, so it belongs here. Both import at
  Admin › Bulk import → question.

  ── ONE QUESTION, NOT TEN ─────────────────────────────────────────────────────

  The block is one matching question with ten prompts, not ten single-best-answer
  questions. A matching block asks a student to tell twelve near neighbours apart
  *against each other*; splitting it into ten items would hand them a fresh set
  of distractors each time and would quietly turn a hard discrimination task into
  ten easy ones. It would also destroy the two distractors, which are the point
  of the twelfth and sixth rows.

  `written_parts` is absent, and must stay absent: the importer refuses a written
  block on a non-written format.

  ── THE ANSWER KEY, AND HOW IT WAS READ ───────────────────────────────────────

  The paper prints two columns: ten vitamins, numbered 1-10, against twelve
  functions/diseases, unnumbered. The candidate writes a vitamin's number beside
  the function it belongs to. So the twelve functions are the option bank and the
  ten vitamins are the prompts — which is exactly the shape the importer wants,
  and it is why two options answer no prompt.

  Page 8 of the solved copy carries its key as a handwritten overlay that is NOT
  in the text layer — extracting the page returns the blank table and nothing
  else. The page was opened and the key read off the render. Reading down the
  twelve function rows in printed order, the numbers written beside them are:

      1  Subacute degeneration of spinal cord ......... 3   Vitamin B12
      2  Needed in CO2 fixation reactions ............. 5   Biotin
      3  Pellagra ..................................... 10  Niacin
      4  Increased dark adaptation time ............... 1   Vitamin A
      5  Carboxylation of glutamate ................... 2   Vitamin K
      6  Water soluble antioxidant .................... (blank)
      7  Muscle glycogen phosphorylase ................ (blank)
      8  Lipid soluble antioxidant .................... 8   Vitamin E
      9  Neural tube defects .......................... 9   Folic acid
      10 Synthesis of CoA-SH .......................... 6   Pantothenic acid
      11 Oxidative decarboxylation of α-keto acids .... 4   Thiamine
      12 Active form produced by 1-hydroxylase ........ 7   Vitamin D

  ── THE TWO BLANKS ────────────────────────────────────────────────────────────

  Exactly two option rows carry no number on the examiner's own key: "Water
  soluble antioxidant" and "Muscle glycogen phosphorylase". They are vitamin C
  and pyridoxine, and neither is among the ten vitamin stems, so there is nothing
  on the left of the table to write beside them. They were **observed blank on
  the key**, not inferred from the arithmetic.

  They are the block's two distractors and both must survive import. They are
  written as options F and G below and no prompt answers them, which is what the
  format is for: "an option may answer several prompts, and some options answer
  none — the unused ones are the distractors, and they must survive import."

  ── THE fi LIGATURE, AND ONE MISSPELLING ──────────────────────────────────────

  The unsolved copy's text layer drops fi: row 2 extracts as "Needed in CO₂
  xation reactions". It is "fixation", confirmed on the p8 render. Row 3 is
  printed "Pallagra" on the paper itself, in both copies — the examiner's
  misspelling of pellagra, not an extraction artefact. The option below is
  written "Pellagra" so the question is sittable; the paper's spelling is
  recorded in `author_notes`, which is the only place it belongs.

  ── STATUS ────────────────────────────────────────────────────────────────────

  Draft. A faculty reviewer should confirm the key, and in particular should
  confirm that the two blank rows are intended as distractors rather than as
  rows the examiner meant to fill.

  Validate with the concept and article files named:

    npm run medical:batch -- docs/Kasr-Source-Imports/question/103-BMS-EOY-2025-biochemistry-matching.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-biochemistry.md

  Import: Admin › Bulk import → question, after the concept and article files.
  A student meets it at Essay questions → Matching questions.
-->

# Item

## id
QW-103-252F4EAE6F23

## title
Match each vitamin to its correlated function or deficiency disease

## subject
fnd

## status
Draft

## owner
Claude

## vignette
Ten vitamins are listed against twelve functions and deficiency diseases. Two of the twelve belong to vitamins that are not on the list.

## question
Match each vitamin to its correlated function or disease.

## format
matching


## matching_options
A | Subacute degeneration of the spinal cord
B | Needed in CO₂ fixation reactions
C | Pellagra
D | Increased dark adaptation time
E | Carboxylation of glutamate (formation of γ-carboxy-glutamate)
F | Water soluble antioxidant
G | Muscle glycogen phosphorylase
H | Lipid soluble antioxidant
I | Neural tube defects
J | Synthesis of CoA-SH
K | Needed in oxidative decarboxylation of α-keto acids
L | Active form produced by 1-hydroxylase

## matching_prompts
Vitamin A = D
Vitamin K = E
Vitamin B12 = A
Thiamine = K
Biotin = B
Pantothenic acid = J
Vitamin D = L
Vitamin E = H
Folic acid = I
Niacin = C

## derived_from

## topic
Biochemistry

## subtopic
Vitamins

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-FND-46B9F239340ED9 | CON-FND-C9E5128193029E

## module
103 BMS

## module_subject
103 BMS > Biochemistry > Vitamins > Summary Table for Vitamins

## clinical_relevance
0.7

## academic_relevance
0.95

## cognitive_effort_score
0.5

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
Academic

## reasoning_level
1

## inferred_difficulty
52

## exam_relevance
9

## contextual_concept_ids

## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_300847a5fa64809d6c07

## learning_objective
Assign each of ten vitamins, fat-soluble and water-soluble together, to the one reaction or deficiency disease that identifies it, and recognise the two functions on the list that belong to vitamins the list does not name.

## media_recommendations

## source_citation
EOY (BMS - 103) 199 (2).pdf — Kasr Al Ainy, module 103 BMS, end of year 2025, Section 1: Biochemistry, group IV "Match", p8, {1 Mark each} across ten vitamins. Manifest src_37f6c0daf3436096af19. Answer key from the solved twin, src_a2e23ffc50b6b2e24897, p8, read off the page render because that page's key is a handwritten overlay and is not in the text layer. Medical content from Dpt book Biochemistry 103.pdf, src_300847a5fa64809d6c07.

## attachments

## attached_image

## author_notes
Verbatim from the paper: "IV) Match: {1 Mark each}", then a two-column table headed "Vitamin" and "Correlated function/disease". The left column numbers ten vitamins 1-10: Vitamin A, Vitamin K, Vitamin B12, Thiamine, Biotin, Pantothenic acid, Vitamin D, Vitamin E, Folic acid, Niacin. The right column prints twelve functions, unnumbered, in this order: subacute degeneration of spinal cord; needed in CO₂ fixation reactions; Pallagra; increased dark adaptation time; carboxylation of glutamate (formation of γ-carboxy-glutamate); water soluble antioxidant; muscle glycogen phosphorylase; lipid soluble antioxidant; neural tube defects; synthesis of CoA-SH; needed in oxidative decarboxylation of α-keto acids; active form produced by 1-hydroxylase.
The candidate writes a vitamin's number beside the function, so the twelve functions are the option bank and the ten vitamins are the prompts. That is why there are two more options than prompts.
THE KEY, as read off the p8 render of the solved copy, function row by function row in printed order: subacute degeneration → 3 (Vitamin B12); CO₂ fixation → 5 (Biotin); Pallagra → 10 (Niacin); dark adaptation → 1 (Vitamin A); carboxylation of glutamate → 2 (Vitamin K); water soluble antioxidant → blank; muscle glycogen phosphorylase → blank; lipid soluble antioxidant → 8 (Vitamin E); neural tube defects → 9 (Folic acid); synthesis of CoA-SH → 6 (Pantothenic acid); oxidative decarboxylation of α-keto acids → 4 (Thiamine); active form produced by 1-hydroxylase → 7 (Vitamin D). Ten numbers written, two rows left empty, and every one of the ten vitamins used exactly once.
THE TWO DISTRACTORS. Options F and G answer no prompt, and that is the examiner's design, not an omission in this transcription. "Water soluble antioxidant" is vitamin C and "muscle glycogen phosphorylase" is pyridoxine — pyridoxal phosphate sits at each catalytic site of the enzyme — and neither vitamin appears among the ten stems, so no number could be written beside either row. Both rows were observed blank on the examiner's own key rather than deduced by elimination. They must survive import: they are what makes the block a discrimination task rather than a list.
The department book covers both distractors, which is what makes them fair: CON-FND-C9E5128193029E states that vitamin C is the water-soluble antioxidant and that pyridoxal phosphate sits at each catalytic site of muscle glycogen phosphorylase. A student who picks F for vitamin E is confusing the two antioxidants, and a student who picks G for thiamine or niacin is confusing a coenzyme that carries a phosphate with one that carries hydrogen.
Not split into ten single-best-answer questions. Splitting changes what is tested — twelve near neighbours told apart against each other becomes ten separate recognitions with a fresh distractor set each time — and the two unused options, which carry the whole discrimination, would have nowhere to go.
"Pallagra" is the paper's own spelling in both the solved and the unsolved copy; option C is written "Pellagra". "CO₂ xation" in the unsolved copy's text layer is the dropped fi ligature and is CO₂ fixation, confirmed on the render.
Two main concepts, both co-primary: the block runs across the fat-soluble vitamins and the water-soluble ones, and a student who gets the four fat-soluble stems right and the six water-soluble ones wrong has demonstrated one and not the other. Naming a single main concept would leave half of what this question tests earning no mastery evidence.
concept_ids and contextual_concept_ids are empty: the two summary concepts cover all twelve options and both distractors between them, and nothing in the question is needed as background without being assessed.
Marks: the paper prints {1 Mark each} against the block and lists ten vitamins, so it is worth ten. There is no marks column on a matching question — the runner marks it prompt by prompt, which is the same thing.
resource_ids now names src_300847a5fa64809d6c07, the catalogue record for the department's Biochemistry (BMS 103) book, once docs/import-ready/resource/KASR-Y1-department-books.md is imported. The EOY paper manifests, src_37f6c0daf3436096af19 and src_a2e23ffc50b6b2e24897, live only in the evidence store and stay named in source_citation instead.
media_recommendations is empty: the paper's table is words, and it is reproduced as words. An image of it would add nothing and would make the options unsearchable.
A single-question file cannot hit the bank-wide difficulty mix, and `medical:batch` says so as a note. It is judged across the whole 103 BMS batch, where this sits alongside the seven written questions in the sibling file.

## estimated_seconds
300

## randomise_answers
yes
