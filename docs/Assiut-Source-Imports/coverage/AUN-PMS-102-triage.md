# AUN-PMS-102 -- S3 triage

Module: Principles of Microscopic and Macroscopic Structures (`AUN-PMS-102`,
histology + embryology + genetics), Year 1 Semester 1. Per
`coverage/AUN-Y1-priority-sources.md`'s recommended triage order for this
module: (a) `GD1 Histology - Answered.pdf` (5p, small, fast); (b) `All
quizzes PMS.pdf` (217p, 81 garbled); (c) `Formative - PMS Week 1.pdf` (9p,
fully garbled, OCR).

## Source (a): `03 Questions and QBank/GD1 Histology - Answered.pdf`

5 pages, 487 words (`pagetext.mjs status`: pp.1-4 text-native, p.5 no text
layer, garbled). `pagetext.mjs keys` on pp.1-4 found 0 keyed / 0 ambiguous
/ 11 unmarked across 3 histology case vignettes (11 questions total).
`ocr` on p.5 returned 0 words; `render` on p.5 (`pagetext.mjs render`,
after confirming it was blank rather than corrupt) showed a genuinely
**blank page** -- no printed answer key exists anywhere in this file.

**This file's "Answered" name is misleading.** Its stem/option text on
pp.1-4 is byte-for-byte identical in word count to the sibling
`GD1 Histology - Not Answered.pdf` (142/139/125/81 words per page, exact
match), and the one extra page in the "Answered" copy is blank. **0/11
questions keyed.** Not authored this pass.

## Source (b): `_Telegram 64 Newer/All quizzes PMS.pdf`

217 pages, 17,209 words native. `pagetext.mjs status` confirms two garbled
blocks -- pp.1-33 (33p) and pp.170-217 (48p), 81 pages total, matching the
readability index -- and a fully clean, text-native middle range, pp.34-169
(136p).

**Extraction method:** plain text on the clean range, no OCR needed there.
This is confirmed to be a **Moodle "attempt review" export**, exactly the
LMS-export pattern flagged in `LANE-CARD.md` S1(b): every question prints
`Question N` / `Correct` or `Incorrect` / `Your answer is correct.` (or
`incorrect.`) / **`The correct answer is: <text>`**. Read pp.54, 108-110
and 140-142 to confirm by eye (LANE-CARD's <=3-render check, done here as
a text read since these pages are clean, not garbled) that the "correct
answer" line prints the objectively correct choice even when the
respondent's own answer was wrong (e.g. p.54 Q12, "Your answer is
incorrect. The correct answer is: 2 umbilical veins") -- this is a real
answer key, not one respondent's own marks.

## Structure and keys (source b)

314 `Question N` instances across pp.34-169 (`pagetext.mjs grep`), 310
carrying a printed `The correct answer is:` line (**98.7% keyed**), 4
"Label the diagram" items that are image-dependent and unusable without
the image (0 hits on a stray-count check -- 314 - 310 = 4, matching
exactly). This comfortably clears the >=60% conditional-approval bar on
a single source (LANE-CARD S1).

The compilation is a sequence of per-lecture Moodle quizzes (Quiz21
through Quiz60+), spanning histology, embryology, urinary/genital
systems and chromosome theory. **Heavy internal duplication**: several
quizzes repeat their own questions verbatim later in the same quiz
(e.g. Quiz53's Q7-11 restate Q2-6; Quiz54-57's Q20-27 restate Q10-17),
and `Quiz29` appears three times (pp.96, 100, 104). A minority of items
are fill-in-the-blank (no options, e.g. Quiz30 Q1-8) rather than SBA.

## Cluster authored this pass: pp.34-64 (embryology)

Six quizzes -- Quiz51 (germ layer derivatives), Quiz52 (external
appearance, 2nd month), Quiz53 (3rd month to birth), Quiz54-57 (chorion
and placenta), Quiz55 (connecting stalk/twinning) and Quiz58-60 (birth
defects/prenatal diagnosis) -- a coherent embryology arc, chosen as the
first authoring cluster. After deduplicating exact repeated stems and
excluding image-dependent, True/False-only and held items:

| Quiz | Raw Qs | Distinct usable | Held | T/F (log only) | Image-dependent |
|---|--:|--:|--:|--:|--:|
| 51 (germ layers) | 12 | 8 | 0 | 0 | 4 |
| 52 (2nd month) | 7 | 4 | 0 | 0 | 0 |
| 53 (fetal period) | 11 | 6 | 0 | 0 | 0 |
| 54-57 (placenta) | 27 | 12 | 3 | 2 | 0 |
| 55 (twinning) | 1 | 1 | 0 | 0 | 0 |
| 58-60 (birth defects) | 10 | 3 | 2 | 0 | 0 |
| **Total** | **68** | **34** | **5** | **2** | **4** |

**34 questions authored** (`coverage/seeds/AUN-PMS-102/quiz-embryology.json`
-> `question/AUN-PMS-102-quiz-embryology-new-mcq.md`), against 27
newly-minted concepts (`concept/AUN-PMS-102-concepts.md`) and 4 articles
(`article/AUN-PMS-102-articles.md`).

## Held items (key conflict / corrupted / illogical / duplicate options)

- **Quiz54-57 Q3** ("4 cellular layers separating maternal and fetal
  blood, in sequence"): printed key marks option D (syncytiotrophoblast,
  cytotrophoblast, fetal capillary endothelium -- 3 named layers) correct,
  but option B (fetal capillary endothelium, villi connective tissue,
  cytotrophoblast, syncytiotrophoblast -- all 4 real layers) matches the
  standard teaching fact exactly, confirmed against the **live** concept
  `CON-OBS-7C3A7E3650A747` ("Placental barrier includes
  syncytiotrophoblast, mesenchyme, cytotrophoblast, and fetal-capillary
  wall"). Printed key omits connective tissue/mesenchyme. Held per the
  standing rule that a key conflicting with the expected fact is held,
  not resolved by inference (MPT Q47 precedent).
- **Quiz54-57 Q16/Q26** ("placental barrier layers EXCEPT"): the option
  list has a duplicated distractor -- options A and C are both printed as
  "endothelial lining of the fetal vessels" -- collapsing 4 printed
  options to 3 distinct ones. Fewer than 4 distinct options -> held per
  LANE-CARD S2's floor rule. (The marked "except" answer is also the same
  structure that is genuinely part of the real 4-layer barrier per
  `CON-OBS-7C3A7E3650A747`, a second reason to hold rather than author.)
- **Quiz54-57 Q9/Q19**: same stem ("all of the following share in
  formation of the amniotic fluid except"), same four options, printed on
  two different pages of the same compilation with **two different
  correct answers** (`Amnioblasts` on p.53, `The wall of the yolk sac` on
  p.57) -- a direct printed-key conflict within one source. Held.
- **Quiz54-57 Q18**: stem reads only "contains pale watery fluid" (no
  subject named -- looks like a truncated/merged export of two different
  questions), 3 options only, and the marked "correct answer" ("derived
  from the endoderm") does not logically answer the printed stem. Held as
  corrupted/incoherent.
- **Quiz58-60 Q1/Q6** ("causes of birth defects include all of the
  following EXCEPT"): both printed instances mark **"all of the above"**
  (or an equivalent "all of X and Y and Z") as the *exception* to a list
  of genuine causes -- internally illogical for an EXCEPT question (if all
  listed items are causes, none of them, let alone "all of the above",
  can coherently be the one exception). Held as a source-logic defect
  rather than authored as printed.
- **Quiz58-60 Q3/Q8** (Klinefelter syndrome chromosomal pattern): printed
  options use "44"/"45" prefixes (`44 - XXY` marked correct, plus
  `44 - XYY`, `45 - XY`, `45 - X0`) where standard karyotype notation uses
  46/47 (e.g. 47,XXY for Klinefelter; 46,XY normal male; 45,X for Turner).
  Every option is off by the same non-uniform 2-3, suggesting a
  systematic printing/extraction quirk (this same file shows a
  clearly-visible ordinal-suffix layout defect elsewhere, e.g. "the 7
  month" with an orphaned superscript "th") rather than a genuine
  alternate convention. Rather than assert a numerically wrong karyotype
  as fact, held for Omar to check against a second copy of this quiz.

## True/False items (logged, not authored)

- Quiz54-57 Q6: "The maternal endometrium response to trophoblast
  invasion is called the decidual reaction" -- True.
- Quiz54-57 Q7: "Stem villi -- or terminal villi, are the region of main
  exchange, surrounded by maternal blood in intervillous spaces" -- False
  (this describes terminal/tertiary villi function, not "stem villi",
  which are the villi anchoring the placenta rather than the main
  exchange site).

## Concept search notes (`find-existing.mjs` against live state + every
`docs/*-Source-Imports` root + `docs/import-ready`)

Representative searches run before minting (full list of 19 queries run;
key results below):

- **"cloacal membrane"**: live hits `CON-DEV-77FBF011B2220F` /
  `CON-DEV-A2A9DF57D71034` (allantois/connecting-stalk *position relative
  to* the cloacal membrane after folding) -- a related landmark, not a
  match for this bank's own claim (the membrane's *germ-layer origin*);
  no merge.
- **"vitelline duct"**: 7 pending hits (101-ISK, AU-MED-102, Kasr mirror,
  Helwan GIT Meckel's diverticulum) -- all either Heuser's-membrane/yolk-
  sac-staging context or the *clinical remnant* (Meckel's), neither
  stating this bank's own claim (vitelline duct = midgut-yolk sac
  connector); no merge, new concept minted, related-concept link left
  for a future cross-lane pass toward the Helwan GIT record.
- **"placental barrier"**: 4 live hits, including
  `CON-OBS-7C3A7E3650A747` (the four real placental-barrier layers) --
  used directly to *hold* two questions (see above) rather than to
  reuse, since neither held item's own claim matches that record's
  stated fact.
- **"chorion frondosum"** / **"placenta accreta"** / **"tertiary villi"**:
  pending alias-only hits in 101-ISK concept/article files (term named in
  an alias list, no stated definition to compare or reuse); no merge,
  new concepts minted.
- **"cri du chat"**: a pending Ain Shams *question*
  (`ASU-MBG-chromosomal-aberrations-mcq.md`, "Cri du chat syndrome
  results from which structural aberration?") tests the identical fact
  from a different university, but no live/pending *concept* record
  backs it yet -- minted new here (university-blind id law), flagged for
  a future cross-lane check once that ASU question's own concept linkage
  is known.
- 13 further queries (endoderm derivatives, primordial germ cell, crown
  rump length, hCG/corpus luteum, craniopagus, amniocentesis, teratogenic
  virus, head folding/notochord, somites/pharyngeal arches, allantois/
  bladder, yolk sac disappearance, haemochorial placenta, umbilical cord
  contents) returned 0 hits -- safe to create, all minted new.

## Placement

All 27 minted concepts: `subject: dev` (Human development), `topic:
Embryology`, split across four `subtopic`/module_subject groups matching
the four authored articles (Germ Layers and Folding; Fetal Dating and
Milestones; Placenta and Fetal Membranes; Twinning, Teratogens and
Prenatal Diagnosis) -- following 00-START-HERE.md's placement rule and
this lane's own system-code precedent (`DEV`, confirmed live via the
cloacal-membrane search hit above).

## Cluster authored this pass (lane 2): pp.65-107

Nervous system, general histology, cardiovascular/lymphatic and urinary/
genital -- the next span of source (b)'s clean pp.34-169 range, read in
page order per LANE-CARD's dispatch: QUIZ21&22 (nervous system, p65-66),
Quiz23/Quiz24 (general histology: basement membrane, intercellular
junctions, p68-79), QUIZ 25 (cardiovascular/lymphatic, p81-83),
Quiz26/Quiz27 (general histology: covering/lining and glandular
epithelium, p85-91), Quiz28 (urinary system, p93-94), a mixed-topic
"Quiz for organ systems" interlude (p100-102, mislabeled under "Lecture
29: Genital system" but actually spanning GI/urinary/skeletal/
respiratory topics -- only its one on-topic urinary item is authored),
and Quiz29's second occurrence (genital system, p104-106; its first
occurrence at p96-98 is entirely image-dependent/matching/fill-in-the-
blank and unusable).

| Quiz | Raw Qs | Distinct usable | Held | Fill-in/matching/image (log only) | Out-of-cluster |
|---|--:|--:|--:|--:|--:|
| QUIZ21&22 (nervous system) | 5 | 5 | 0 | 0 | 0 |
| Quiz23 (basement membrane) | 17 | 5 | 0 | 12 | 0 |
| Quiz24 (junctions) | 5 | 3 | 1 | 10 (Q6-15) + 1 dup (Q4) | 0 |
| QUIZ 25 (CVS/lymphatic) | 6 | 5 | 0 | 1 dup (Q5) | 0 |
| Quiz26 (covering epithelium) | 8 | 4 | 0 | 3 (Q6-8) + 1 dup (Q3) | 0 |
| Quiz27 (glandular epithelium) | 9 | 6 | 0 | 3 (Q7-9, incl. 1 dup) | 0 |
| Quiz28 (urinary) | 5 | 5 | 0 | 0 | 0 |
| Quiz29 [1st, p96-98] (genital) | 5 | 0 | 0 | 5 | 0 |
| "Quiz for organ systems" [p100-102] | 6 | 1 | 0 | 0 | 5 |
| Quiz29 [2nd, p104-107] (genital) | 5 | 4 | 1 | 0 | 0 |
| **Total** | **71** | **38** | **2** | **35** (incl. 3 dup) | **5** |

**38 questions authored** (`coverage/seeds/AUN-PMS-102/quiz-nervous-
histology-urogenital.json` -> `question/AUN-PMS-102-quiz-nervous-
histology-urogenital-mcq.md`). **20 newly-minted concepts** (nervous
system 5, cardiovascular/lymphatic 5, urinary 6, genital 4 --
`concept/AUN-PMS-102-concepts.md`) with **5 new articles**
(`article/AUN-PMS-102-articles.md`). **18 questions reuse 14 existing
concepts** from `docs/Kasr-Source-Imports/concept/101-ISK-mcq-
concepts.md` (general histology is saturated per LANE-CARD.md's search-
before-mint rule) via a sparse overlay,
`pending-live/AUN-PMS-102-histology-overlay.md` (`+aun`, `+1`,
`+AUN-PMS-102` tag additions only), reusing that concept's own existing
article (`ART-101-HIS-*`, in `docs/Kasr-Source-Imports/article/101-ISK-
histology.md`, `-2.md`, `-3.md` and `101-ISK-identification.md`) rather
than minting a duplicate one.

### Held items (this pass)

- **Quiz24 Q5** (p76, "Intercellular ionic exchange is achieved by"):
  printed key marks "Tight junction" correct, directly contradicting
  Q2's and Q4's own printed key ("Gap junction" / "Nexus") for the
  **identical stem** within the same quiz, and contradicting the real
  fact (gap junctions, not tight junctions, mediate ionic exchange).
  Held per the standing rule that a printed-key conflict is held, not
  resolved by inference (MPT Q47 / embryology-cluster Quiz54-57 Q9/Q19
  precedent).
- **Quiz29 [2nd occurrence] Q1** (p104, "The widest part of the uterine
  tube"): options A and D are both printed as "The infundibulum" --
  collapsing 4 printed options to 3 distinct ones. Held per LANE-CARD
  S2's floor rule (Quiz54-57 Q16/Q26 precedent), independent of the
  underlying fact being correct (the ampulla genuinely is the widest
  part).

### Excluded, not authored (this pass)

Quiz23 Q6-17 (12 fill-in-the-blank items), Quiz24 Q6-15 (10 fill-in-the-
blank items, Q13 duplicates Q12), Quiz26 Q6-8 (3 fill-in-the-blank
items), Quiz27 Q7-9 (3 fill-in-the-blank items, Q8=Q9 duplicate), and
Quiz29's first occurrence (p96-98: one image-dependent drag-drop match,
one text match with no discrete options, three fill-in-the-blank items)
are all format-dependent or content-free without their source image/
interaction and are logged only, matching the "Label the diagram"
exclusion precedent from the embryology cluster. Three items are exact
or near-exact duplicates of an authored item within this same pass
(Quiz24 Q4 of q046, QUIZ 25 Q5 of q051, Quiz26 Q3 of q054) and are
logged as `duplicate-of`, not authored twice. The "Quiz for organ
systems" interlude's five non-urinary items (oesophagus x2, bone
ossification, trachea x2) fall outside this dispatch's nervous/
histology/urogenital/chromosome cluster and are flagged for whichever
future lane covers GI/skeletal/respiratory anatomy.

### Concept search notes (this pass)

`find-existing.mjs` run for every distinct tested idea before minting
(24 queries; key results below):

- **General histology (Quiz23/24/26/27) is saturated**, confirming
  LANE-CARD S7's warning: a broad "basement membrane" search alone
  returned 65 existing records, dominated by
  `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`. Reading
  that file directly (not just find-existing's substring matches) found
  a same-fact concept for all 14 distinct general-histology ideas
  tested in this pass's Quiz23/24/26/27 cluster -- every one reused via
  overlay rather than minted (see table above). None of these 101-ISK
  concepts are live yet (they sit in a pending Kasr batch), so the
  overlay carries `+aun`/`+1`/`+AUN-PMS-102` tag additions against a
  pending id per 00-START-HERE.md S3's "pending-live" pattern, following
  the exact precedent of `docs/Alexandria-Source-Imports/pending-live/
  AU-MED-102-histology.md`.
- **Nervous system, cardiovascular/lymphatic, urinary and genital
  facts had zero find-existing.mjs hits** across all 20 tested ideas
  (spinal nerve count, neuron as functional unit, CNS subdivision, gray
  matter, efferent nerves; heart base, arterioles, pulmonary end
  artery, artery/vein differences, lymph vessel appearance; kidney
  vertebral level, urethral parts x2, kidney anterior relation, ureter
  continuity, renal pyramid location; ovarian suspension, testicular
  coats, uterine position, vas deferens length) -- safe to create, all
  minted new.
- **"gap junction nexus"** (combined query) returned 0 hits, but
  **"gap junction"** alone returned 43 records including the exact-fact
  101-ISK concept -- a reminder that find-existing.mjs is a literal
  substring search and a short, single-term query surfaces more than a
  compound phrase.

## Placement (this pass)

The 20 newly-minted concepts split by subject: `neuro` (5, topic
Neuroanatomy), `cvs` (5, topic Cardiovascular Anatomy), `renal` (6,
topic Urinary System Anatomy), `gyn` (2, topic Genital System Anatomy /
Female) and `androl` (2, topic Genital System Anatomy / Male) -- per
00-START-HERE.md's 20-subject list and `mint-concept-id.mjs`'s
per-subject `CON-` system codes. The 14 reused general-histology
concepts keep their original `fnd` subject and `CON-FND-` ids from
101-ISK, unchanged by the overlay (only `universities`/`learner_years`/
`modules` are appended).

## Source (c): `06 EOM/Formative - PMS Week 1.pdf`

9 pages, fully garbled (0-word native, `pagetext.mjs status`). OCR'd in
full (`pagetext.mjs ocr --pages 1-9`, foreground, psm 4/6, 4-82 words/page
recovered). This is a **live quiz-taking export** (not an attempt-review
export) -- every page shows the question stem, "Select one:", and empty
`©` radio-button glyphs for every option, with no "correct answer"
line and no distinguishable filled/selected marker anywhere in the OCR
text (checked across all 9 pages, including both "Answer saved" and "Not
yet answered" states). **0/9 questions keyed.** Not authored this pass.

## Cluster authored this pass (lane 3): pp.108-169

**Corrected page map -- this is NOT one undivided "Quiz 30" bank.** The
dispatch briefed pp.108-169 as "Quiz 30, Chromosome Theory of
Inheritance", carried forward from this triage doc's own earlier
"queued for the next lane" notes (S1 pass, above), which assumed the
98.7%-keyed clean range continued as a single quiz. Reading the actual
pages shows it is a run of **ten** separate per-lecture Moodle quizzes:

| Quiz | Pages | Topic |
|---|---|---|
| Quiz 30 | 108-112 | Chromosome Theory of Inheritance (only 13 items) |
| Quiz 41-42 | 114-125 | Implantation and 2nd week of development |
| Quiz 43 | 126-129 | Cartilage (general histology) |
| Quiz 44-45 | 130-137 | Bone (general histology) |
| Quiz 46 | 138-143 | Gastrulation and notochord formation |
| Quiz 47 | 144-147 | Further trophoblast development (wholly duplicate of Quiz 46) |
| Quiz 48 | 148-154 | 3rd-8th week (embryonic period), neurulation |
| Quiz 49 | 155-160 | Ectodermal derivatives, neurulation continued (neural crest) |
| Quiz 50 | 161-169 | Mesodermal derivatives |

`pagetext.mjs status` on pp.108-169 confirms the whole range clean
text-native (0 garbled, matching the S1 pass's key-recovery figure),
p170 onward reverting to 0-word garbled, confirming the page-108-169
scope boundary itself is correct even though the "single Quiz 30" label
was not. The seed cluster key `pmsquiz30` is kept as briefed for
continuity with the ledger/triage-keys.txt naming, spanning the whole
corrected range in one authoring pass -- the same approach lane 2 used
for its own multi-quiz pp.65-107 dispatch.

After deduplicating exact repeated stems, excluding fill-in-the-blank,
True/False, image-dependent and out-of-source-conflict items, and
holding printed-key defects:

| Quiz | Raw Qs | Distinct usable | Held | Fill-in/T-F/image (log only) | Exact duplicate |
|---|--:|--:|--:|--:|--:|
| Quiz 30 (chromosome theory) | 13 | 4 | 1 | 8 | 0 |
| Quiz 41-42 (implantation) | 30 | 8 | 2 (1 conflict pair) | 12 | 5 |
| Quiz 43 (cartilage) | 12 | 7 | 0 | 5 | 0 |
| Quiz 44-45 (bone) | 24 | 8 | 0 | 13 | 3 |
| Quiz 46 (gastrulation/notochord) | 16 | 6 | 1 | 4 | 5 |
| Quiz 47 (trophoblast, dup) | 11 | 0 | 0 | 11 | 0 |
| Quiz 48 (embryonic period) | 18 | 7 (+1 shared with reuse) | 0 | 3 | 5 |
| Quiz 49 (ectoderm/neural crest) | 16 | 7 | 0 | 4 | 5 |
| Quiz 50 (mesoderm) | 25 | 12 (+2 reused own-module) | 1 | 3 | 4 |
| **Total** | **165** | **65 usable (50 authored)** | **5** | **63** | **27** |

**50 questions authored** this pass, a deliberate subset of the 65
distinct usable items (target 40-50 per dispatch):
`coverage/seeds/AUN-PMS-102/pmsquiz30.json` ->
`question/AUN-PMS-102-quiz30-mcq.md`. 21 newly-minted concepts
(`concept/AUN-PMS-102-quiz30-concepts.md`) with 6 new articles
(`article/AUN-PMS-102-quiz30-articles.md`). 27 questions reuse 13
existing concepts from `docs/Kasr-Source-Imports/concept/103-BMS-
histology-concepts.md` (8 cartilage/bone concepts) and
`docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` (5
gastrulation/neurulation/neural-crest/somite concepts) via a sparse
overlay, `pending-live/AUN-PMS-102-quiz30-overlay.md` (`+aun`, `+1`,
`+AUN-PMS-102` tag additions only). 2 questions (the ectopic-pregnancy
and placenta-previa clinical vignettes) reuse existing **live**
concepts directly (`CON-OBS-F3B46C8C137FA1`, `CON-OBS-359BB7C45CB7F8`).
2 questions (folding-4th-week, vitelline-duct) reuse this same
AUN-PMS-102 module's own lane-1 concepts, since Quiz 50's final items
(Q21/Q22) restate exactly the same facts lane 1 already minted from
pp.34-64.

### Held items (this pass)

- **Quiz 30 Q11** (p111, "Chromosomal pattern of Down syndrome"):
  printed key marks "45 - XY" correct, which is neither a real
  Down-syndrome karyotype (the correct fact, trisomy 21 / 47,XY or
  47,XX, does not appear among the printed options at all) nor a
  coherent answer to the stem. Same numeral-corruption pattern as the
  MPT-104 Q47 and lane-1 embryology-cluster Klinefelter "44-XXY"
  precedents (options print 44/45 where standard karyotype notation
  uses 46/47) -- held rather than asserted as fact, pending a second
  source copy.
- **Quiz 41-42 Q9 / Q29** (p118, p125, "regarding uteroplacental
  circulation is CORRECT"): identical stem and options printed twice
  in the same source, with two different marked correct answers
  ("established during the second week of development" vs "hydrolytic
  enzymes produced by the trophoblast degrade the endothelium of
  embryonic capillaries"). A direct printed-key conflict within one
  source -- held per the standing rule (MPT Q47 / lane-1 Quiz54-57
  Q9-Q19 precedent), neither instance authored.
- **Quiz 46 Q14** (p143, "At gastrulation, the embryo is bilaminar
  at: ... Both B & C" = buccopharyngeal membrane and neural folds):
  conflicts with the same quiz's own Q9 (buccopharyngeal membrane and
  cloacal membrane) on which second site the embryo stays bilaminar
  at -- neural folds is not a standard bilaminar-persistence site in
  undergraduate teaching, and the two printed answers to structurally
  the same question disagree. Held per the standing printed-key-
  conflict rule; Q9's answer (matching the live-corpus-confirmed
  gastrulation fact, see concept search notes below) is authored
  instead.
- **Quiz 50 Q12** (p164, "Vertebral column is derived from"): options
  B and C are both printed as "dermomyotomes" -- collapsing 4 printed
  options to 3 distinct ones. Held per LANE-CARD S2's floor rule
  (lane-1 Quiz54-57 Q16/Q26 precedent). The identical fact is authored
  instead from Q17's later, non-defective 4-distinct-option
  restatement of the same question (`pmsquiz30-q48`).

### Excluded, not authored (this pass)

Fill-in-the-blank items (Quiz 30 Q1-8, Quiz 41-42 Q16-21, Quiz 43
Q6-10, Quiz 44-45 Q7-9/Q11/Q13-17/Q22/Q24, Quiz 46 Q3-4, Quiz 48 Q7-8,
Quiz 49 Q2-4, Quiz 50 Q4-6 -- 41 items total), True/False items (Quiz
41-42 Q11-15, Quiz 46 Q5, Quiz 48 Q1-3, Quiz 49 Q1, Quiz 50 Q1-3 -- 12
items), one "Label the diagram" image-dependent item each in Quiz
41-42 (Q22) and Quiz 46 (Q6), and 27 exact/near-exact duplicate items
(same stem and key repeated later in the same quiz or the wholly
duplicate Quiz 47) are logged only in
`coverage/AUN-PMS-102-triage-keys.txt`, not authored -- matching the
"Label the diagram" and duplicate-stem exclusion precedents from
passes 1-2. Quiz 50's final three items (Q23-25: PGC formation in the
yolk sac, endoderm-derivatives-except-mammary-gland, endoderm-
derivatives-includes-thyroid-parenchyma) restate concepts already
minted and authored in lane 1's pp.34-64 pass verbatim; rather than
mint a third near-identical concept record, they are logged as
duplicate-of-lane-1 and not re-authored (Quiz 50's other two
lane-1-overlapping items, Q21/Q22, are instead authored as direct
concept reuse -- see above).

### Concept search notes (this pass)

`find-existing.mjs` run for every distinct tested idea before minting
(24+ queries; key results below, full log also visible in this
lane's session commands):

- **General histology (Quiz 43 cartilage, Quiz 44-45 bone) is
  saturated**, extending LANE-CARD S7's warning beyond the epithelium/
  junction facts lane 2 already found in `101-ISK-mcq-concepts.md`:
  `docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md`
  turns out to hold a full connective-tissue histology set (cartilage
  types/cells, bone cells/structure) despite that file's own header
  comment stating "no cartilage concept is authored here" -- that
  comment describes only the file's original five records; 60 more
  were appended later by another lane. Reading the file directly (not
  just find-existing's truncated hits) found a same-fact concept for
  all 13 distinct cartilage/bone ideas tested in this pass -- every
  one reused via overlay rather than minted.
- **Gastrulation, neurulation, and neural-crest-derivative facts are
  also saturated** in `docs/Kasr-Source-Imports/concept/
  101-ISK-mcq-concepts.md`'s "Third Week of Development" section:
  "gastrulation-primitive-streak-and-the-three-layers-from-epiblast"
  (`CON-DEV-215BD7E9E58872`) states this pass's own gastrulation
  facts (primitive streak start, trilaminar-except-two-membranes,
  bilaminar-at-buccopharyngeal-and-cloacal) verbatim; "neural-plate-
  and-the-ectodermal-origin-of-the-nervous-system"
  (`CON-DEV-4BC4233153C3DC`) and "neural-tube-and-neural-crest-
  derivatives" (`CON-DEV-785CE84F7C03DB`) likewise cover this pass's
  neurulation and neural-crest-derivative facts -- all reused via
  overlay.
- **"notochord"**: pending 101-ISK hit `CON-DEV-1BCF37C48AF307`
  ("notochord forms in four steps, guides the embryo, ends as the
  nucleus pulposus") read in full -- covers formation and fate, not
  this pass's own structural-relations claim (mesodermal, beneath the
  neural tube, flanked by the somites); no merge, new concept minted
  and cross-linked as related.
- **"organogenesis"**: pending 101-ISK hit `CON-DEV-E273F775E9CB77`
  ("the fetal period... is maturation and growth rather than organ
  formation") read in full -- states the complementary fetal-period
  side of this pass's own organogenesis-timing question; reused
  directly rather than minting a duplicate inverse-framed concept.
- **"ectopic pregnancy"** / **"placenta previa"**: both **live**,
  well-established OB/GYN concepts (`CON-OBS-F3B46C8C137FA1`,
  `CON-OBS-359BB7C45CB7F8`) -- reused directly for the two clinical
  vignettes in Quiz 41-42, the first direct live-concept reuse in this
  AUN-PMS-102 lane (prior passes only found live hits that didn't
  match closely enough to merge).
- **"intermediate mesoderm"**, **"urogenital ridge"**, **"outer
  cytotrophoblastic shell"**, **"secondary chorionic villi"**,
  **"spina bifida"**, **"hCG pregnancy test"**, **"inner cell mass"**,
  **"blastocyst implantation"**: 0 hits each -- safe to create, all
  minted new.
- **"suprarenal medulla mesoderm"**: the 101-ISK neural-crest concept
  names the suprarenal medulla among the crest's own derivatives
  (consistent with, but not stating, this pass's own mesoderm-
  derivatives-EXCEPT framing) -- no merge, new concept minted and
  cross-linked.

## Placement (this pass)

The 21 newly-minted concepts split by subject: `dev` for all 21
(genetics is placed under `dev` per this same module's lane-1
cri-du-chat precedent, since AUN-PMS-102 tests histology, embryology
and genetics as one module). Topic/subtopic split: `Genetics >
Chromosome Theory of Inheritance` (4), `Embryology > Implantation and
the Second Week` (6), `Embryology > Gastrulation and the Notochord`
(3), `Embryology > Neurulation and the Embryonic Period` (3),
`Embryology > Ectodermal Derivatives` (2), `Embryology > Mesodermal
Derivatives` (3) -- one new article per subtopic (6 total). The 13
reused cartilage/bone/embryology concepts keep their original
`msk`/`dev` subjects and `CON-MSK-`/`CON-DEV-` ids from 103-BMS/101-ISK,
unchanged by the overlay (only `universities`/`learner_years`/
`modules` are appended).

## Checkpoint table

| Module | Questions triaged | Keys recovered | Held (conflict/corrupted) | Distinct concepts identified | Live-hit | Pending-hit | New |
|---|--:|--:|--:|--:|--:|--:|--:|
| AUN-PMS-102 (source b, pp.34-64 cluster) | 68 raw / 34 distinct usable | 34/34 (100% of the authored batch; 310/314 of the whole clean range) | 5 | 27 | 0 direct reuse (2 checked-not-merged) | 5 checked-not-merged | 27 |
| AUN-PMS-102 (source b, pp.65-107 cluster) | 71 raw / 38 distinct usable | 38/38 (100% of the authored batch) | 2 | 34 (14 reused + 20 new) | 0 direct reuse | 14 reused (101-ISK, overlay) | 20 |
| AUN-PMS-102 (source b, pp.108-169 cluster) | 165 raw / 65 distinct usable, 50 authored | 50/50 (100% of the authored batch) | 5 | 36 (15 reused + 21 new) | 2 direct reuse (ectopic pregnancy, placenta previa) | 13 reused (103-BMS + 101-ISK, overlay) | 21 |

Concept search across all three passes now covers the full clean
pp.34-169 range of source (b). The garbled pp.1-33/170-217 still need
OCR before triage; no further clean pages remain in source (b) for a
future AUN-PMS-102 lane to author from without OCR work first.

## Needs Omar / open items

- Source (a) (`GD1 Histology - Answered.pdf`) and source (c) (`Formative
  - PMS Week 1.pdf`) are both effectively unkeyed despite their names/
  listing as candidate sources -- worth flagging in case Omar has a true
  answer-key copy of either.
- The 6 held items from the pp.34-64 pass (4-layer placental-barrier
  conflict, duplicate-option placental-barrier-except, amniotic-fluid
  Q9/Q19 conflict, corrupted Q18, illogical-except Q1/Q6, Klinefelter
  numeral ambiguity) plus the 2 held items from this pp.65-107 pass
  (Quiz24 Q5 ionic-exchange key conflict, Quiz29 [2nd] Q1 duplicate
  options) are candidates for a second-copy check.
- The mixed-topic "Quiz for organ systems" interlude (p100-102) has 5
  items outside this lane's cluster (oesophagus x2, bone ossification,
  trachea x2) -- flagged for whichever future lane covers GI/skeletal/
  respiratory anatomy for Assiut Year 1.
- The 4 held items from this pp.108-169 pass (Quiz 30 Q11 Down-syndrome
  karyotype numeral corruption, Quiz 41-42 Q9/Q29 uteroplacental-
  circulation key conflict, Quiz 46 Q14 bilaminar-site key conflict,
  Quiz 50 Q12 duplicate-option vertebral-column-origin defect) are
  candidates for a second-copy check, alongside the 8 held items from
  passes 1-2 already listed above.
- pp.108-169 of `All quizzes PMS.pdf` is **not** one undivided "Quiz
  30" bank as earlier assumed -- it is ten separate per-lecture
  quizzes (see "Cluster authored this pass (lane 3)" above for the
  corrected page map). This pass authored 50 of the range's 65 usable
  items; the remaining 15 usable-but-unauthored items (Quiz 44-45's
  bone-histology tail beyond the 8 authored here, plus a handful of
  minor mesoderm/embryonic-period facts trimmed to hit the 40-50
  dispatch target) are logged in `coverage/AUN-PMS-102-triage-keys.txt`
  as candidates for a future top-up pass if AUN-PMS-102 needs more
  depth in these topics. The garbled pp.1-33/170-217 still need OCR
  before any further triage of source (b).
