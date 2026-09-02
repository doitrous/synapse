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

Concept search this pass covered the full pp.34-64 authoring cluster (not
a partial ~30-question slice, since this cluster's total usable count was
already 34). pp.65-169 (nervous system, general histology, urinary/
genital systems, chromosome theory) are triaged as part of source (b)'s
overall key-recovery rate (98.7%) but not yet concept-searched or
authored -- queued for the next lane.

## Needs Omar / open items

- Source (a) (`GD1 Histology - Answered.pdf`) and source (c) (`Formative
  - PMS Week 1.pdf`) are both effectively unkeyed despite their names/
  listing as candidate sources -- worth flagging in case Omar has a true
  answer-key copy of either.
- The 6 held items above (4-layer placental-barrier conflict, duplicate-
  option placental-barrier-except, amniotic-fluid Q9/Q19 conflict,
  corrupted Q18, illogical-except Q1/Q6, Klinefelter numeral ambiguity)
  are candidates for a second-copy check.
- pp.65-169 of `All quizzes PMS.pdf` (nervous system Quiz21&22, general
  histology Quiz23-27, urinary/genital Quiz28-29, chromosome theory
  Quiz30) are keyed (98.7% of the whole clean range) and page-mapped but
  not yet authored -- queued for the next AUN-PMS-102 lane, along with
  the garbled pp.1-33/170-217 (needs OCR first).
