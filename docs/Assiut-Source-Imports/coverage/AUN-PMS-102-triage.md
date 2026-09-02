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

## Checkpoint table

| Module | Questions triaged | Keys recovered | Held (conflict/corrupted) | Distinct concepts identified | Live-hit | Pending-hit | New |
|---|--:|--:|--:|--:|--:|--:|--:|
| AUN-PMS-102 (source b, pp.34-64 cluster) | 68 raw / 34 distinct usable | 34/34 (100% of the authored batch; 310/314 of the whole clean range) | 5 | 27 | 0 direct reuse (2 checked-not-merged) | 5 checked-not-merged | 27 |
| AUN-PMS-102 (source b, pp.65-107 cluster) | 71 raw / 38 distinct usable | 38/38 (100% of the authored batch) | 2 | 34 (14 reused + 20 new) | 0 direct reuse | 14 reused (101-ISK, overlay) | 20 |

Concept search across both passes now covers pp.34-107 of source (b) in
full. pp.108-169 (chromosome theory, Quiz30 -- a single 62-page quiz
bank) are triaged as part of source (b)'s overall key-recovery rate
(98.7%) but not yet concept-searched or authored -- queued for the next
lane, along with the garbled pp.1-33/170-217 (needs OCR first).

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
- pp.108-169 of `All quizzes PMS.pdf` (chromosome theory, Quiz30 -- a
  single 62-page quiz bank, the largest undivided section of this
  source) are keyed as part of the 98.7% clean-range rate and
  page-mapped but not yet concept-searched or authored -- queued for
  the next AUN-PMS-102 lane, a clean topic boundary immediately after
  Quiz29's second occurrence ends at p107. The garbled pp.1-33/170-217
  still need OCR before triage.
