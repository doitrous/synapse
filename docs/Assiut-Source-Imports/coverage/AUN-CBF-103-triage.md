# AUN-CBF-103 -- S3 triage

Module: Cell Biology and Foundation (`AUN-CBF-103`), Year 1 Semester 1. Per
`coverage/AUN-Y1-priority-sources.md`, this module's one text-native tier-3
source is small (18p) and clean, chosen per the coverage doc's
"recommended next-triage order" #3.

## Source triaged

`Year 1/CBF/_Telegram 64 Newer/CBF question bank.pdf` -- a physiology MCQ
question bank by "M.Ashraf", 18 pages, 5,746 words, confirmed 0 garbled /
fully text-native (`pagetext.mjs status`). `All Gds.pdf` (89p, 5 garbled
pages), `All formatives CBF.pdf` (65p, 58/65 garbled) and `All quizzes CBF
.pdf` (259p, fully garbled) are left for a later lane, per this lane's
dispatch.

**Extraction method:** plain text, no OCR or render needed. `pagetext.mjs
keys` was run first, per the corpus-wide rule (LANE-CARD.md S3) to check for
highlight/circle-style visual keys before assuming a render is needed --
it returned almost nothing (3 keyed / 1 ambiguous / 134 unmarked across 18
pages, treating pp.1-17's numbered items as "questions"). Reading the actual
page text explained why: **page 18 is a plain-text printed answer key
table** for all 132 questions ("1- b   2- a   3- c ... 132- c"), not a
visually-marked-option format at all -- the sparse inline bold/red flags
`pagetext.mjs keys` did catch (Q20 bold-D, Q70 red-E, Q93 bold-E) are a
different, secondary annotation layer, not this bank's real key mechanism.
No render was needed anywhere in this file; the answer table on p.18 is
itself plain extracted text.

## Structure

132 genuine questions (numbered 1-132, mostly `(N)` or `N-` prefixed, 4-6
options each, mostly A-D with an E and occasionally F on the later,
denser items). `pagetext.mjs keys`'s reported total of 138/139 "questions"
double-counts: the p.18 answer-table rows (`1- b   2- a ...`) themselves
match the tool's `N-` question-start regex and get counted as a second,
spurious numbering restart -- the real question count is 132, confirmed by
the table's own last row (`132- c`) lining up exactly with the last question
stem on p.17 (Q132, "the internal body environment refers to ... ECF").

Five topic blocks, unlabelled by header except two ("Metabolism – Food
intake- temperature" p.9 before Q71; "Transport across the cell membrane"
p.14 before Q103; "Homeostasis" p.17 before Q126):

| Block | Qs | Count | Topic |
|---|--:|--:|---|
| 1 | Q1-14 | 14 | Body fluid compartments (TBW/ICF/ECF, oedema) |
| 2 | Q15-70 | 56 | Nerve/membrane excitability (RMP, action potential, refractory periods, chronaxie/rheobase, saltatory conduction, myelination) |
| 3 | Q71-102 | 32 | Metabolism, food intake, thermoregulation |
| 4 | Q103-125 | 23 | Transport across the cell membrane |
| 5 | Q126-132 | 7 | Homeostasis vocabulary |

## Keys

**132/132 questions carry a printed, recovered key (100%)** via the p.18
answer table -- read directly as plain text, no visual-marker reading or
OCR needed anywhere in this file. Letters in the table are lowercase
(`1- b`) and line up against the stem's own option lettering, which is
lowercase a-d/e for most of the file and switches to uppercase (A)-(F) for
Q71-102 (the metabolism/thermoregulation block) -- same table, same
letter-to-position mapping, just a different printed case in the stem.

**Two conflicts, held:** `pagetext.mjs keys`'s secondary bold/red-flag scan
caught 3 inline marks across the whole file (Q20 bold on option D, Q70
red-text on option E, Q93 bold on option E). Cross-checked against the p.18
table: Q93 agrees (table says `93- e`, matching the bold-E). **Q20 and Q70
disagree** -- table says `20- b` (threshold stimulus, textbook-consistent:
the question asks what is needed "at least" to excite a fibre, and "maximal
stimulus" (D) is not the minimum) and `70- c` (AP amplitude does not depend
on stimulus strength -- the all-or-none law, also textbook-consistent),
while the stray bold/red marks point at D and E respectively, both of which
read as textbook-wrong on their own stem logic. Per the standing rule that a
key conflict is a hold, not an inference, **Q20 and Q70 are held** rather
than resolved by picking a side -- both are physiologically well-motivated
either way is not the point; two printed sources disagree and neither
inference nor majority-vote (2 of 3 flagged items agree with the table)
licenses picking one. 130/132 remain usable.

**Duplicates:** none found -- 132 distinct stems, no repeated question text
or repeated `(N)` numbering.

**Stem-absent items:** none. Every one of the 132 rows has a complete stem
and 4-6 options; nothing needs an "Omar" stem-recovery flag.

## Checkpoint table

| Module | Questions triaged | Keys recovered | Held (key conflict) | Distinct concepts identified (Q1-30 batch) | Live-hit | Pending-hit | New |
|---|--:|--:|--:|--:|--:|--:|--:|
| AUN-CBF-103 | 132 | 130 usable / 132 recovered | 2 | 13 | 0 | 4 | 9 |

Concept search this pass covered the Q1-30 authoring batch only (per the
conditional-approval scope, ~30-question increments); Q31-132 are
keyed and page-mapped but not yet concept-searched or authored -- queued
for the next lane/batch (see "Remaining" below).

## Concept search notes (Q1-30 batch, `find-existing.mjs` against live state + every `docs/*-Source-Imports` root + `docs/import-ready`)

- **"total body water" / TBW-ICF-ECF percentages (Q1,3,5,10-13):** pending
  hit, exact scope match -- `docs/import-ready/concept/102-INT-physiology-concepts.md`
  and its Kasr mirror `docs/Kasr-Source-Imports/concept/102-INT-physiology-concepts.md`,
  `CON-HEM-428F8B432AF540` ("Total body water divides into the
  intracellular and extracellular compartments in a fixed 2:1 ratio...").
  States adult-male 60%/ICF 40%/ECF 20% (matches Q1,3,5 exactly) and lower
  TBW% in females/obese/infants (matches Q10,12,13's direction; Q10's
  printed 80% for infants and Q11's printed 45% for old age are close-but-not-identical
  numbers to the existing record's "~75% infants" and unstated old-age
  figure -- same taught relationship, not a numeric conflict worth a hold,
  reused via overlay with a field_notes note rather than a body edit).
  Reused, not re-minted -- see `pending-live/AUN-CBF-103-q1-tbw-concept.md`.
- **"action potential" / "resting membrane potential nerve":** broad
  searches returned only unrelated live cardiac-electrophysiology concepts
  (`CON-CVS-*`, pacemaker/myocyte APs) and pending FOMSCU 103-BMS articles --
  no direct hit on the general nerve-fibre RMP/AP-phase mechanism this bank
  tests, confirmed new.
- **"threshold stimulus excitation nerve", "depolarization sodium influx
  repolarization potassium efflux", "ion channel resting permeability
  potassium", "chronaxie rheobase", "refractory period absolute relative
  nerve", "strength duration curve nerve":** all 0 hits, safe to create.
- **`docs/import-ready/concept/103-BMS-mcq-vitamins-nerve-concepts.md`**
  (FOMSCU Year-1, pending) turned out to be the richest overlap source once
  found via the broader "action potential" search's article hit -- a nerve/
  muscle physiology concept set covering several of this bank's exact
  ideas:
  - `CON-NEU-7E784A50D2BBAF` "The local response is graded, non-propagated
    and has no refractory period..." -- reused for Q22 (local response
    EXCEPT: does NOT propagate long distance) and Q26 (accompanied by
    increased excitability).
  - `CON-NEU-77596C8A899A7E` "Sodium permeability sets nerve excitability
    and extracellular potassium sets the resting potential... hypokalaemia
    paralyses a patient" -- reused for Q27 (excitability decreased by a
    decrease in ECF K+).
  - `CON-NEU-A0C8307D2825A6` "Saltatory conduction regenerates the impulse
    only at the nodes, which buys both speed and economy" -- reused for
    Q30 (myelinated fibres conduct faster than unmyelinated -- the direct
    corollary of saltatory conduction's speed advantage).
  - `CON-NEU-5664D7AB68AD8D` (myelinated vs unmyelinated fibre structure)
    checked against Q19 (neurilemmal sheath is the outermost axon covering)
    -- related but not a match (that record covers the myelin sheath/nodes
    of Ranvier distinction, not the neurilemma's specific
    outermost-layer/regeneration role); Q19 minted as its own concept,
    linked via `related_concept_ids`, not merged.
  These four reused ids are pending in `docs/import-ready/` (FOMSCU
  lane); overlaid with `+aun` / `+AUN_Y1` / `+AUN-CBF-103` tag additions
  only, per `pending-live/AUN-CBF-103-*-concept.md`.
- Q2,4,6-9 (70kg-adult compartment volumes: 42/28/14/10/3/0.5 L),
  Q14+Q17 (Starling forces / plasma vs interstitial protein), Q15-16
  (compartment barriers: cell membrane vs capillary wall), Q18 (lymphatic
  obstruction -> non-pitting oedema), Q21+Q24 (depolarization = rising Na+
  permeability), Q23+Q25 (resting K+>>Na+ permeability and its relation to
  excitability), Q28 (ECF Ca++ inversely sets excitability) and Q29
  (absolute refractory period = Na+ channel inactivation, stimulus-strength
  independent) all returned 0 hits on their own distinguishing terms --
  minted as 9 new concepts, see `concept/AUN-CBF-103-concepts.md`.

## Placement

All Q1-30 concepts are physiology fundamentals -- `subject: fnd` (body
fluid compartments, membrane transport basics) or `subject: neuro` (nerve
excitability/action potential), following 00-START-HERE.md's placement
rule for foundation-science subjects without a specific organ-system claim
yet. `module_subject`: `AUN-CBF-103 > Physiology > Body Fluids` and
`AUN-CBF-103 > Physiology > Nerve Excitability`.

## Needs Omar / open items

- Q20, Q70 -- printed answer-table key and a secondary inline visual flag
  disagree (see "Keys" above); held, not authored. Worth a look at a second
  copy of this bank if Omar has one, since the table itself is otherwise
  internally consistent across all 130 other rows checked against their
  stem logic.
- Q31-132 (102 questions) are keyed (100% via the p.18 table) and
  page-mapped but not concept-searched or authored this pass -- queued for
  the next AUN-CBF-103 lane, in `coverage/AUN-CBF-103-triage-keys.txt`
  (`cbf-bank-q031` onward).
- `All Gds.pdf` (89p, 5 garbled pages) and `All formatives CBF.pdf` (65p,
  58/65 garbled) are listed in `AUN-Y1-priority-sources.md` but explicitly
  out of scope for this pass per dispatch; `All quizzes CBF .pdf` (259p,
  fully garbled) needs OCR before any triage is possible.

## S3 lane 2 addendum -- `All quizzes CBF .pdf` (259p, OCR'd pp.1-30)

Lane 1 (`cbf question bank.pdf`) is CLOSED, 132/132, 2 held. This lane
(`aun-cbf103-author2`) authors a second, independent cluster from the
fallback source named in dispatch: `All quizzes CBF .pdf`
(`evidence/AUN-CBF-103-allquizzes-resources.md`, `src_f7e45bae9ce161e08d46`),
259 pages, 0-word native text on every page (`pagetext.mjs status` -- fully
garbled scan, matching the source-doc's own note). OCR'd pp.1-30 this pass
(`pagetext.mjs ocr --pages 1-30`); 81-207 words/page on content pages (a
handful of blank/footer pages read 0-31 words), well above the auto-flag
floor.

**Format.** Confirmed the LANE-CARD's predicted "Moodle attempt-review"
pattern on the first page read: this is a 259-page compilation of
completed-attempt exports from a Moodle "Lectures and quizzes CBF" course,
one quiz block per lecture pair, each item showing the student's selected
answer, a Correct/Incorrect flag and a printed **"The correct answer is:
..."** line -- the strongest key format available, read directly as plain
OCR text, no visual-marker reading needed anywhere in pp.1-30.

**Quiz blocks found in pp.1-30:**

| Block | Pages | Raw Qs | Topic |
|---|---|--:|---|
| Quiz3&6 | 1-7 | 10 | Biochemistry of amino acids and protein structure/function |
| Quiz4&5 | 8-10 | 4 | Functions of cell organelles and cell membrane |
| Quiz7&8 | 11-27 | 44 | Overview of vitamins and minerals I, II |
| Quiz9-10 | 28-30+ | 7+ (continues past p30) | Biochemistry of enzymes and clinical enzymology |

**Keys: 65/65 raw items read this pass carry a printed key (100%)** via the
"The correct answer is:" line. No conflicts found (unlike lane 1's Q20/Q70
table-vs-flag conflict -- this source has no secondary visual-marker layer
to disagree with the printed line).

**Junk/non-SBA items found, held out of the authored cluster:** Quiz4&5 Q3
("Phospholipids are the only type of lipids in the plasma membrane" --
True/False, 2 options) and Q4 ("Gated channels are opened or closed by
____" -- fill-in-the-blank, no option list) are not SBA-shape and are
excluded, not converted. Quiz9-10 Q2-7 (irreversible inhibition kinetics,
false-statement, active-site-vs-antibody, rate-factors, enzyme-concentration
effect) are keyed and legible but not authored this pass beyond Q1 (kept
the cluster to a manageable 40 rather than 44+).

**Internal near-duplicates identified and held out (not printed-key
conflicts -- same fact restated under a different stem, common in this
Moodle-pool-drawn source):** Quiz3&6 Q7 (amyloidosis / beta-pleated sheet)
restates Q6's same fact (Alzheimer's amyloid / beta-pleated sheet) under a
different clinical vignette -- Q6 kept, Q7 held. Quiz7&8 Q32 ("PLP is
central to ... Transamination") restates Q17 near-verbatim; Q33 ("Biotin is
required as a coenzyme by ... Carboxylases") restates Q20 near-verbatim;
Q34 ("Methylcobalamin is required for formation of ... Methionine from
homocysteine") restates Q27's B12-half near-verbatim. All three (Q32-34)
are held, not authored, in favour of their earlier-appearing twin. Quiz3&6
Q3 (only ketogenic amino acid -- Leucine) and Q4 (neutral amino acid with
aliphatic side chain -- also Leucine) test two genuinely different
classification axes (metabolic fate vs side-chain chemistry) that happen to
share an answer; both are legible and keyed but held out of this pass's
40-question cap rather than mint a combined concept under time pressure --
queued for a future batch. Quiz7&8 Q3 (scurvy -- Vitamin C) is likewise
legible/keyed, restates Q2's vitamin-C teaching point from the deficiency
side rather than the biosynthetic-function side, and is held out of this
pass's cap alongside Q3/Q4 above.

## Checkpoint table (S3 lane 2)

| Module | Raw Qs read (pp.1-30) | Keys recovered | Authored | Held (junk/near-dup/cap) | New concepts | Reused concepts |
|---|--:|--:|--:|--:|--:|--:|
| AUN-CBF-103 (lane 2) | 65 | 65 (100%) | 40 | 25 | 12 | 4 (21 question-links) |

## Concept search notes (lane 2, `find-existing.mjs` against live state + every `docs/*-Source-Imports` root + `docs/import-ready`)

- **Vitamins, water-soluble (thiamine/riboflavin/niacin/pantothenate/
  biotin(general)/folate(function)/B12(function)/vitamin C(general)):**
  `find-existing.mjs "thiamin"` and `"pellagra"` returned a Kasr 103-BMS
  pending concept file (`docs/Kasr-Source-Imports/concept/
  103-BMS-mcq-vitamins-nerve-concepts.md`) whose own header comment records
  that **all 44 water-soluble-and-fat-soluble vitamin MCQs in that lane's
  question file map onto just three concepts**, minted specifically to
  avoid "fragmenting a student's mastery across fourteen records where the
  examiner assesses one skill." `CON-FND-C9E5128193029E`
  ("water-soluble vitamins are coenzymes, and a matching question tests
  which reaction each one runs" -- `docs/Kasr-Source-Imports/concept/
  103-BMS-biochemistry-concepts.md`) covers thiamine/TPP/beriberi,
  riboflavin/niacin/pellagra, pantothenate/CoA, biotin/carboxylation,
  folate/one-carbon-transfer/megaloblastic anaemia, cobalamin/
  homocysteine-methionine and vitamin C as the water-soluble antioxidant --
  an exact match for 19 of this lane's 30 vitamin questions (Q4-16, 20, 22,
  27, 29-31). Reused via pending-live overlay, same consolidation
  philosophy as the Kasr precedent, rather than re-minting one concept per
  vitamin.
- **Biotin-dependent carboxylases (specific reactions):** `find-existing.mjs
  "biotin"` additionally returned `CON-FND-CA0F9E019BC5BA` ("Pyruvate
  carboxylase carboxylates pyruvate to oxaloacetate, needs biotin..." --
  `103-BMS-mcq-carbohydrate-concepts.md`) and `CON-FND-2F3A652B8E3104`
  ("Acetyl-CoA carboxylase is the key enzyme of lipogenesis: it needs
  biotin, it makes malonyl-CoA..." -- `103-BMS-mcq-lipid-concepts.md`) --
  literal matches for Q21 (pyruvate -> OAA) and Q23 (acetyl-CoA ->
  malonyl-CoA) respectively. Reused, not re-minted.
- **Enzyme active site:** `find-existing.mjs "enzyme active site"` returned
  `CON-FND-D17966222A3693` ("The enzyme active site binds substrate and
  supports catalysis" -- `docs/Ain-Shams-Source-Imports/concept/
  ASU-IBM-enzyme-concepts.md`), an exact match for Quiz9-10 Q1. Reused via
  pending-live overlay.
- **Amino acids/protein structure (essential-under-stress amino acid,
  alpha-helix H-bonding, sulphur-containing amino acid, beta-pleated
  sheet/amyloid, ubiquitin-proteasome degradation, acute-phase reactants,
  protein denaturation), cell organelles (ER/Golgi function):**
  `find-existing.mjs` run for each ("essential amino acid arginine",
  "alpha helix hydrogen bond protein", "sulphur containing amino acid
  methionine", "beta-pleated sheet amyloid", "proteasome ubiquitin
  degradation", "acute phase reactant albumin", "protein denaturation
  viscosity solubility", "rough endoplasmic reticulum protein synthesis",
  "endoplasmic reticulum golgi") -- 0 hits each, safe to create. Minted as
  8 new concepts (`concept/AUN-CBF-103-concepts-2.md`).
- **Vitamin facts not covered by the reused water-soluble-vitamins
  concept** (general definition of vitamins; vitamin C's collagen/
  hydroxyproline-synthesis function specifically, as opposed to its
  antioxidant role; pyridoxine/PLP's transamination coenzyme role and the
  B6-deficiency-convulsions/GABA mechanism; vitamin B12's corrin-ring/
  cobalt structure, the "pernicious anaemia" clinical name and
  methylmalonate as its urinary marker, plus folate's pteridine+PABA+
  glutamate structure): `find-existing.mjs` run for each ("vitamin b12
  cobalamin", "folate folic acid", "scurvy vitamin c", "pyridoxine
  convulsions gaba") -- 0 hits each, safe to create. Minted as 4 further
  new concepts.

## Needs Omar / open items (lane 2)

- Quiz3&6 Q3, Q4, Q7 and Quiz7&8 Q3, Q32-34 (6 items) are legible, keyed and
  concept-searchable but held out of this pass purely to keep the cluster
  at 40 rather than 46 -- no key conflict, no source defect. Queued for a
  future AUN-CBF-103 batch alongside Quiz4&5 Q3-Q4 (True/False and
  fill-in-blank, not SBA-shape) and Quiz7&8 Q35-44 / Quiz9-10 Q2-7+ (keyed,
  not yet authored).
- pp.31-259 of `All quizzes CBF .pdf` (229 pages, the great majority of the
  source) are not yet OCR'd or triaged -- queued for a future lane.

## S3 lane 3 addendum -- `All quizzes CBF .pdf`, completing pp.1-30 + OCR'd pp.31-90

Lane 3 (`aun-cbf103-author3`) had two jobs per dispatch: (1) author the 16
keyed-but-unauthored items lane 2 left on pp.1-30 (Quiz9-10 Q2-7, Quiz7&8
Q35-44 -- the 6 lane-2 holds, Quiz3&6 Q3/Q4/Q7 and Quiz7&8 Q3/Q32-34, are
untouched, per dispatch); (2) OCR and triage pp.31-90.

**OCR.** pp.31-90 were 0-word-native (`pagetext.mjs status`), already
correctly auto-flagged `garbled=yes` -- no `mark-garbled` needed (unlike the
CamScanner false-negative case elsewhere in this corpus). `pagetext.mjs ocr
--pages 31-60` then `--pages 61-90` produced 19-207 words/page throughout
(one low outlier, p36 at 31 words, still legible), no re-OCR needed anywhere.
One page-break truncation was found and could not be recovered by reading
alone (QuizCarb-Q8 / QuizMetRate-Q8, p64-65 boundary, see below).

**Format shift at p37.** The Moodle "Home > My courses" attempt-review
export format (matching lane 2's pp.1-30 reads) continues through p56, then
p57-59 (TCA quiz) still matches it, but p37-56 and p60-90 switch to a
**phone-screenshot export** of the same Moodle quiz UI (status-bar clock,
"Not Secure -- aunonline.aun.edu.eg" browser chrome, "Scanned with
CamScanner" footer) -- still the same printed **"The correct answer is:
..."** key format, still plain OCR text, no visual-marker reading needed,
just a different physical capture of the same underlying quiz platform.

**Quiz blocks found in pp.31-90:**

| Block | Pages | Raw Qs | Topic | Format |
|---|---|--:|---|---|
| Quiz9-10 (cont.) | 31-32 | 6 (Q8-13) | Enzyme kinetics, isoenzymes | Moodle export |
| Quiz11&12 | 34-35 | 4 (Q1-4) | Cell membrane transport, tonicity | Moodle export |
| (untitled, "QuizCarb") | 37-56 | 22 (Q1-22) | Carbohydrate metabolism/glycolysis | Screenshot |
| (untitled, "QuizTCA") | 57-59 | 5 (Q1-5) | Citric acid cycle | Moodle export |
| (untitled, "QuizMetRate") | 60-65 | 10 (Q1-10) | Respiratory quotient, metabolic rate | Screenshot, mostly fill-in |
| (untitled, "QuizDNARNA") | 66-71 | 6 (Q1-6) | Transcription, RNA processing | Screenshot |
| (untitled, "QuizObesity") | 72-78 | 10 (Q1-10) | Obesity, leptin | Screenshot, partly fill-in |
| Quiz21 | 79-86 | 12 (Q1-12) | Oxidative phosphorylation/RCH | Screenshot, multi-select |
| Quiz22 | 87-90 | 11 (Q1-11) | Oxygen toxicity, free radicals | Screenshot |

**Keys: every raw item read (86 across pp.31-90) carries a printed key**
via "The correct answer is:" (or the True/False variant), same as lane 2's
pp.1-30 pass -- **no key conflicts** anywhere in this range.

**Out-of-format items, logged not authored (not held for a key defect --
simply not SBA-shape):** Quiz11&12 Q1 (True/False), QuizCarb Q1-5 (True/
False, Cori-cycle related), QuizMetRate Q1-5 (fill-in-the-blank, RQ
definitions), QuizMetRate Q6 (a growth-hormone/fever/sleep/malnutrition
table-matrix answer, not a clean single letter), QuizObesity Q1-5
(fill-in-the-blank), Quiz21 Q1-12 (all 12 are "select all correct answers"
multi-select, not single-best-answer -- this entire quiz is out of format),
Quiz22 Q9-11 (True/False). 45 items total logged out-of-format.

**Unrecoverable OCR (1 item, held):** a "concerning respiratory quotient,
the following are true except" item's own options (c)-(e) and printed
answer fall exactly across the p64/p65 page-break in the screenshot capture
-- the OCR text on p64 ends mid-option and p65's OCR begins with the next
question's stem instead of finishing this one. Logged as `QuizCarb-Q8` /
`QuizMetRate-Q8` (page-adjacent, ambiguous which numbered quiz it belongs
to) in `coverage/AUN-CBF-103-triage-keys.txt`, key=UNRECOVERABLE, held per
the standing rule that unrecoverable OCR is a hold, not a guess.

**Authored this pass: 46 (16 completing pp.1-30 + 30 from pp.31-90),
against a target of 45-55.** Held for a future lane purely to stay in that
target band, no defect: QuizCarb Q15/16/18-22 (6, PFK-1
inhibitor/GLUT-1/hexokinase-glucokinase/GAPDH/PK-deficiency facts, all
keyed and concept-searched, reuse candidates identified but not authored),
QuizMetRate Q7/9/10 (3, BMR facts), QuizDNARNA Q1/4/5 (3, RNA-alkaline-
hydrolysis/mRNA-protein-colinearity/RNA-polymerase-promoter facts -- concept
search done, new mints identified but not authored), QuizObesity Q6-10 (5,
leptin/NPY/body-fat facts, likely reuse of this lane's own obesity concepts
from `cbf-bank-q099`-`q102`), Quiz22 Q5-8 (4, antioxidant-classification and
phagocyte-oxidative-killing facts, concept search done, two new-mint
concepts identified but not authored). All logged in
`coverage/AUN-CBF-103-triage-keys.txt` with their printed key and a `(cap,
keyed)` note -- no key conflict, no source defect, purely a budget cap.

## Concept search notes (lane 3, `find-existing.mjs` + broad `grep -ril` against live state + every `docs/*-Source-Imports` root + `docs/import-ready`)

- **Enzyme kinetics/inhibition/isoenzymes (Quiz9-10 Q2-13):** `find-existing.mjs`
  itself returned 0 hits for "enzyme rate of reaction temperature optimum"
  etc, but a broad `grep -ril "enzyme kinetics\|Km\|rate of reaction"`
  surfaced `docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-
  enzymology-overlays.md`, which pointed to a rich pending KAU 102-INT
  enzymology cluster (`docs/import-ready/concept/102-INT-mcq-concepts.md`,
  `102-INT-concepts.md`) -- four concepts reused: `CON-FND-F29934C070A94C`
  (factors affecting enzyme rate: [S], enzyme/cofactor conc, temperature,
  pH -- reused for Q5-Q11, Q17-Q20, ten questions off one concept, same
  consolidation philosophy as lane 2's water-soluble-vitamins precedent),
  `CON-FND-42EE1863F04920` (irreversible inhibition), `CON-FND-5846431203789F`
  (active site lowers activation energy), `CON-FND-DD3EE5EC8C07D1` (LDH/CK
  isoenzymes). Q3/Q4 reuse lane 2's own `CON-FND-D17966222A3693` (ASU-IBM
  active site), extending its existing `cbfquiz-pending-asuibm` overlay.
- **Cell membrane diffusion/tonicity (Quiz11&12 Q2-4):**
  `find-existing.mjs "hypertonic solution red blood cells NaCl"` -- 0 hits;
  Q2/Q3 (fat-soluble diffusion, protein-channel diffusion rate) matched the
  same pending Kasr 103-BMS-physiology diffusion/osmosis concept
  (`CON-NEU-1D5DC2D67A5291`) this lane's own `cbf-bank-q103`-`q125` block
  already reused, per that concept's own field_notes cross-reference. Q4
  (1.0% NaCl hypertonic) found no existing tonicity concept anywhere in the
  corpus (broad grep for "hypotonic/hypertonic/isotonic/tonicity" returned
  only unrelated CNS-tone hits) -- minted `CON-FND-08A3DBFA90D950`.
- **Carbohydrate metabolism / glycolysis / TCA cycle (QuizCarb Q6-14,
  QuizTCA Q1-5):** `find-existing.mjs` for GLUT-4/glucokinase/PET-tracer
  terms returned 0 hits each, but `grep -rl "glucokinase\|hexokinase"`
  surfaced `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-
  concepts.md` -- a 35-concept file covering this exact syllabus segment in
  depth. Eleven of its concepts reused across 23 questions (GLUT-4/GLUT-2
  transport, hexokinase/glucokinase kinetics, lactate/NAD+ regeneration,
  glycolysis's committed step, substrate-level phosphorylation, fluoride/
  enolase, TCA amphibolism, pyruvate carboxylase anaplerosis, PDH's five
  coenzymes, oxaloacetate regeneration, succinate dehydrogenase's flavoprotein
  exception) -- all extending lane 2's existing `cbfquiz-pending-103bms`
  overlay (which already carried three concepts from this same Kasr
  103-BMS lane), rather than opening a new overlay file, per that file's own
  precedent of grouping every reused Kasr-103-BMS concept together
  regardless of which specific sub-file mints it.
- **Transcription/RNA processing (QuizDNARNA Q2, Q3, Q6):**
  `find-existing.mjs` for alpha-amanitin/spliceosome/RNA-polymerase-
  promoter terms -- 0 hits each; broad `grep -ril "RNA polymerase|
  transcription"` surfaced `docs/Alexandria-Source-Imports/concept/AU-MED-
  102-biochem-molecular-concepts.md`, a 43-concept molecular-biology file.
  Three concepts reused: `CON-FND-412F3EDF118F44` (RNA polymerase
  gene-class specificity, matches the alpha-amanitin/Pol-II vignette
  exactly), `CON-FND-5FF8EB2DB4D662` (mRNA processing/splicing),
  `CON-FND-D717E6E7EEA466` (coding-strand-vs-mRNA, verified by hand-deriving
  the antiparallel complement of the given DNA template against the printed
  key -- matches exactly).
- **Free radicals / oxygen toxicity (Quiz22 Q1-4):** `find-existing.mjs`
  for free-radical/ROS/antioxidant/PUFA terms -- 0 hits each; broad
  `grep -ril "free radical|antioxidant|reactive oxygen species"` returned
  only passing mentions inside unrelated pathology/shock records across many
  other lanes' concept files, no dedicated concept anywhere in the corpus --
  safe to mint. Consolidated all four Quiz22 Q1-4 stems (ROS identity,
  radical-forming substrate classes, free-radical effects, PUFA
  vulnerability) into one new concept, `CON-FND-CB46E0408C4FF2`, rather than
  fragmenting, matching this lane's established consolidation pattern.

## Needs Omar / open items (lane 3)

- QuizCarb Q15/16/18-22, QuizMetRate Q7/9/10, QuizDNARNA Q1/4/5, QuizObesity
  Q6-10 and Quiz22 Q5-8 (23 items total) are legible, keyed and (for all but
  QuizDNARNA Q1/4/5 and Quiz22 Q5-8, where concept search only, not minting,
  was done) concept-searched, held purely to keep this pass's authored
  count in the 45-55 target band -- no key conflict, no source defect.
  Queued for a future AUN-CBF-103 lane, listed with their printed key and a
  `(cap, keyed)` note in `coverage/AUN-CBF-103-triage-keys.txt`.
- `QuizCarb-Q8` / `QuizMetRate-Q8` (p64-65) -- the one item this pass could
  not recover: its own options and printed key fall exactly across a
  page-break in the screenshot-format capture. A second copy of this quiz
  (if Omar has one) or a targeted re-render of pp.64-65 at higher DPI would
  be worth trying before writing it off entirely.
- pp.91-259 of `All quizzes CBF .pdf` (169 pages, most of the source) are
  not yet OCR'd or triaged -- queued for a future lane.
