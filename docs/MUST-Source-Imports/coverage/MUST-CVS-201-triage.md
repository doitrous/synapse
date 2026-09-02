# MUST-CVS-201 — S3 first-module triage (first tranche)

`MUST-CVS-201` was selected as the first module (13-orchestration.md §5) — it
is the exam-richest module in the MUST Year 2 corpus: 87 MCQ-bank files + 23
official exam papers = 110 exam-signal sources across 6 subjects (Anatomy,
Histology, Microbiology, Pathology, Pharmacology, Physiology), ahead of
`MUST-DHB-202-2` (102) and `MUST-RES-201` (100) — see
`../manifest/y2-sources.md`.

## Scope of this pass

CVS-201's exam surface is large (110 tier-1/tier-2 sources; the two tier-1
"EOM Final" written-question compilations alone total 19 questions across 2
files, and the remaining 9 per-subject EOM Final papers total ~191 more pages
before the ~12 Midterm papers and 87 MCQ-bank files are even counted). Unlike
FOMSCU's Foundation 1 (pre-extracted JSON, trivial to triage in full), every
CVS-201 source here is a raw PDF read at ≤3 pages/call — full-module triage
in one pass is not honest work. This first tranche triages the **two
shortest, fully-keyed, tier-1 sources** to completion (source, question,
concept and find-existing granularity) and inventories the rest by source
count / page count / method for the next triage pass. **No concept has been
minted; this is triage only.**

## Sources triaged in full

| Source | Tier | Pages | Format | Questions | Keys recovered | Method |
|---|--:|--:|---|--:|--:|---|
| `00 Module-wide/06 EOM Exams/EOM MCQs - CVS201 Written Questions (Final) Fall 2024.pdf` | 1 | 3 | written (short-answer), module-wide, all 6 subjects | 11 | 11/11 | printed answers, page 2-3 |
| `Pathology/06 EOM Exams/EOM MCQs - written pathology final by dr.maria.pdf` | 1 | 2 | written (short-answer), Pathology only | 8 | 8/8 | printed answers inline per question |
| **Total** | | **5** | | **19** | **19/19** | |

Both are native-text PDFs (`pagetext.mjs status`: no garbled pages, no OCR
needed). Despite the "MCQs" folder label, neither is multiple-choice — both
are short-answer/essay compilations with the answer printed directly under
each question, which is why 100% of keys recovered here (contrast the
MCQ-bank folders below, not yet read, where printed-key presence is
unverified).

## Concept-candidate triage (find-existing.mjs)

19 raw questions collapse to **17 distinct concept candidates** (2 exact
duplicates: "atherosclerosis risk factors" and "malignant hypertension" each
asked once in the module-wide paper and once in Dr. Maria's paper, same
fact both times). Each candidate was queried against
`Instruction Manual for Content Creation/tools/find-existing.mjs`, per
00-START-HERE.md §4 — a short, distinctive query first, broadened only when
the first attempt plausibly under-matched (checked for "atherosclerosis",
"smooth muscle", "coronary artery origin", "arterial blood pressure
regulation" — see the raw output referenced from `-triage-keys.txt`).

| # | Concept candidate | Source Q | Status | Hit |
|---|---|---|---|---|
| 1 | Anterior interventricular artery supplies anterior 2/3 of IV septum | MW-Q1 | pending | `docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md`, `docs/import-ready/question/SYS-CVS-QUESTION-003.md` |
| 2 | Rheumatic fever pathogenesis (molecular mimicry, post-streptococcal) | MW-Q2 | pending | `docs/import-ready/concept/SYS-CVS-CONCEPT-T08.md` |
| 3 | Edema — definition and causes | MW-Q3 | pending | `docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md` (aliases only — same word, not confirmed same specific fact; re-check at S2) |
| 4 | Amiodarone — mechanism and adverse effects | MW-Q4 | **new** | no hit |
| 5 | Posterior interventricular artery origin (from RCA) | MW-Q5 | pending | `docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md` |
| 6 | Atherosclerosis risk factors | MW-Q6, Maria-Q4 | **new** | no hit (checked both the full phrase and bare "atherosclerosis") |
| 7 | Autoregulation (intrinsic blood-flow regulation) | MW-Q7 | pending | `docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md` (coronary/local-flow autoregulation concepts) |
| 8 | Malignant hypertension — causes of death / features | MW-Q8, Maria-Q8 | pending | `docs/import-ready/article/SYS-CVS-ARTICLE-T07.md` |
| 9 | Smooth muscle — distinguishing histological features | MW-Q9 | pending (borderline) | `docs/Kasr-Source-Imports/written/103-BMS-histology-department-written.md` ("Skeletal, cardiac and smooth muscle: the comparison table") — same topic, not confirmed identical scope; verify at S2 |
| 10 | Left coronary artery — origin (left posterior aortic sinus) | MW-Q10 | **new** | no hit (checked "coronary artery origin" too) |
| 11 | Long-term regulation of arterial blood pressure (RAS, ANP, vasopressin) | MW-Q11 | **new** | no hit |
| 12 | Dilated cardiomyopathy | Maria-Q1 | pending | `docs/import-ready/article/SYS-CVS-ARTICLE-T04.md`, `docs/import-ready/concept/SYS-CVS-CONCEPT-T04.md` |
| 13 | Cardiac tamponade | Maria-Q2 | pending | `docs/import-ready/article/SYS-CVS-ARTICLE-T06.md`, `docs/import-ready/concept/SYS-CVS-CONCEPT-T06.md` |
| 14 | Fibrinous pericarditis | Maria-Q3 | **new** | no hit |
| 15 | Fatty streak (earliest atherosclerotic lesion) | Maria-Q5 | **new** | no hit |
| 16 | Hypertension — definition (BP thresholds) | Maria-Q6 | pending | `docs/Alexandria-Source-Imports/concept/AU-MED-106-physiology-concepts.md`, `docs/import-ready/question/SYS-CVS-QUESTION-009.md` |
| 17 | Secondary hypertension — causes | Maria-Q7 | pending | `docs/import-ready/article/SYS-CVS-ARTICLE-T07.md`, `docs/import-ready/concept/SYS-CVS-CONCEPT-T07.md` |

**Every hit found so far is `pending`** (an unimported batch under
`docs/import-ready/` or another lane's `docs/*-Source-Imports/`) — **zero
live-state hits**. This first tranche happens to sit almost entirely on
ground the CVS pending-import batch (`SYS-CVS-CONCEPT-T04` .. `T08`) and
Kasr 104-CPS's cardiology concepts already cover; that is a directional
signal for the rest of the module, not a proven rate — the sample is 17
concepts out of an eventual much larger set.

## Checkpoint table

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| MUST-CVS-201 (first tranche) | 19 | 19/19 | 17 | 0 | 11 | 6 | see below |

**Placement for the 6 new candidates** (not minted — S2 decision):
amiodarone MOA/adverse-effects, atherosclerosis risk factors, left coronary
artery origin, long-term arterial-BP regulation, fibrinous pericarditis, and
fatty streak are all `cvs` by subject (cardiovascular system) per
`00-START-HERE.md` §3's subject list — no placement ambiguity for this
tranche.

## Not yet triaged (queued, next pass)

| Source group | Files | Approx. pages | Notes |
|---|--:|--:|---|
| Per-subject EOM Final papers (tier 1) | 9 | ~191 | Anatomy (32p), Histology (14p), Microbiology ×2 (8p+10p), Pathology ×2 remaining (23p+19p; Dr. Maria's already triaged above), Pharmacology ×2 (8p garbled/needs OCR + 31p), Physiology (46p) |
| Midterm papers (tier 2) | ~12 | not yet paged | one per subject, plus Pathology has 5 Midterm-folder files (some duplicate/near-duplicate titles — not yet twin-checked) |
| MCQ-bank folders (tier 2, crowd-sourced) | 87 | not yet paged | 6 subject subfolders; printed-key presence unverified — historically MCQ community banks vary widely in whether an answer key is present at all |

One tier-1 source, `Pharmacology/06 EOM Exams/EOM - Pharma Final Summary (By
Alhoda).pdf`, is scanned/garbled on every page (`pagetext.mjs status`:
`words=0`) — will need `pagetext.mjs ocr`, not a plain `show`, when its turn
comes.

## S2 — tranche 1 authored (2026-09-02)

TRIAGE APPROVED WITH CONDITIONS reached this module (chief-of-staff dispatch,
branch `must-cvs201-author1`). Both conditions ran before minting: (1) the 11
"pending" hits were re-searched against Kasr 104-CPS, the Year-3 SYS-CVS
catalogue and Alexandria AU-MED-106 per the dispatch's named targets; (2) a
second, mechanism/synonym search ran on the 6 "new" candidates before minting
— using `find-existing.mjs` fresh rather than trusting this file's original
query log, which had moved on since (Kasr 104-CPS's CVS clusters landed on
`main` this week, at `ce09de10`).

Two reclassifications came out of that second pass, both **narrowing** what
needs new minting, not widening it:

- **Rheumatic fever (row 2) is LIVE**, not pending — `CON-INF-311E67B2C55A90`
  (`teaching.microv3.arf.pathogenesis`, subject `pharm` as filed, despite the
  placement rule's own `inf` steer for Microbiology/Parasitology — not a field
  this sparse update touches) states the exact molecular-mimicry mechanism
  MW-Q2 asks for. `find-existing.mjs "rheumatic fever"` returned it directly;
  this file's original query log ran a narrower phrase and missed it.
- **Left coronary artery origin (row 10) folds into row 1's own concept** —
  `CON-CVS-1F1AB4B70AB06D`'s definition already states the aortic-sinus
  origin MW-Q10 asks for, so it is one concept serving two source questions,
  not two. Likewise **secondary hypertension (row 17) folds into row 16's own
  concept** — Alexandria's `CON-CVS-F4BBA78E076D30` already names endocrine
  and kidney disease as its two secondary-cause categories.
- **Malignant hypertension (row 8) is confirmed new**, not the pending hit
  this file originally recorded — that hit was an article alias only
  (`SYS-CVS-ARTICLE-T07.md`'s "Malignant hypertension" alias points at the
  *hypertensive-emergency* concept, a different, coarser clinical idea; a
  fresh search on "fibrinoid necrosis" / "onion skin" for the specific kidney
  lesion and mortality-order fact returned no better hit).

Net: of the 17 candidates, **1 live sparse update, 7 pending sparse updates
(9 rows collapsed to 7 distinct concepts), 7 new mints** (the original "new"
6 minus LCA-origin, which folded in, plus malignant hypertension and
long-term-ABP-regulation, both re-confirmed new on the second pass — this
file's original tally undercounted the "new" set at 6 for the same reason
the rheumatic-fever/LCA-origin/secondary-HTN misses ran the other way).

All 19 tranche-1 questions are now authored: 10 in
`question/MUST-CVS-201-eom-written.md` (concepts live or minted this same
batch) + 9 in `pending-live/MUST-CVS-201-questions.md` (concepts pending in
another lane, per `pending-live/INDEX.md`'s apply order). 7 new concepts, 7
articles, 7 claims, 9 citations (2 concepts are dual-sourced across both
papers), 7 evidence spans, 2 resource records (catalogue + evidence-source)
for the two EOM written papers, all in `concept/`, `article/`, `evidence/`
and `resource/MUST-CVS-201-*`. 0 questions held — both sources printed a key
for every question.

## Files

- `MUST-CVS-201-triage-keys.txt` — one line per triaged question (source,
  question number, key-recovery method, one-line answer excerpt) plus the
  raw `find-existing.mjs` query log for the 17 concept candidates.

## S3 — tranche 2 (2026-09-02, lane 2, branch `must-cvs201-author2`)

Second authoring pass, the 9 remaining tier-1 EOM papers named in
`LANE-CARD-Y2.md`'s cluster order (Anatomy → Histology → Microbiology ×2 →
Pathology ×2 → Pharmacology → Physiology). Triaged all 9 for page count,
format and key-recovery method; authored the Histology paper (the shortest,
cleanest single-subject MCQ source, 50/50 printed key) to completion, per the
~50-question target.

### Full triage — Histology CVS201 Questions (Final) — AUTHORED

`Histology/06 EOM Exams/EOM MCQs - Histology CVS201 Questions (Final).pdf`,
14 pages, single author (Absalam101), native-text (`pagetext.mjs status`: no
garbled pages, no OCR needed). 50 genuine MCQs, one subject (blood-vessel-wall
histology), no essay tail — the cleanest source in this cluster. Printed
answer key on p.14, 50/50 recovered. `src_0511bc2ebb43a689a4c6`.

50 raw questions collapse to 12 distinct concept candidates via
`find-existing.mjs` plus a direct check against
`server/data/medical-library-v1.json` (not just the tool, per the standing
practice this file's S2 addendum set): 8 are sparse updates onto concepts
that exist only in Kasr 104-CPS's own unimported batch (three-tunic plan,
artery classification, metarteriole, vein classification, medium-artery-vs-
vein, fenestrated capillary, arteriovenous anastomosis, continuous-vs-
sinusoidal capillary — none in the live snapshot), 1 is a direct reference to
a genuinely live cross-university concept (pericyte function,
`CON-CVS-CC810A201244F0`, confirmed in the live snapshot — no local overlay
row because no local file carries its verbatim label), and 3 are new MUST
mints (varicose veins, DVT/thrombophlebitis, elastic-lamina Orcein stain —
`find-existing.mjs` returned no hit and neither did a check of the Year-3
SYS-CVS clinical catalogue's own "chronic venous insufficiency"/"deep vein
thrombosis" articles, judged a different, coarser clinical-depth concept
rather than reused, same call this file's S2 addendum made for malignant
hypertension).

All 50 questions authored as MCQ seed → `emit-mcq.mjs`, not hand-authored —
the paper is genuine multiple-choice with a full printed key, exactly the
case the lane brief reserves for the emitter. 45 (main_concept pending) are
in `pending-live/MUST-CVS-201-histology-questions.md` alongside an 8-record
sparse concept overlay (`pending-live/MUST-CVS-201-histology-concepts-
overlay.md`); 5 (main_concept live or minted this batch) are in
`question/MUST-CVS-201-histology-mcq.md`. Full apply order and simulate log
in `pending-live/INDEX.md`. 0 questions held — the source printed a key for
every item. 0 literal duplicates found within this single-source paper.

### Inventory — remaining 8 papers (not authored this pass)

| Paper | Pages | Format | Questions | Key | Notes |
|---|--:|---|--:|---|---|
| Anatomy CVS201 Questions (Final) | 32 | MCQ + essay | 105 (100 MCQ across 5 topics + 5 essay) | printed (page-1 stated; not opened past p.1 this pass) | Largest remaining source; next in cluster order |
| Microbiology CVS Final (Mucize Doctors) | 8 | MCQ + essay | 35 (30 MCQ + 5 essay) | printed, 30/30 MCQ + 5/5 essay, verified in full | Endocarditis/myocarditis/pericarditis/rheumatic fever; same subject spread as the sibling paper below |
| Microbiology CVS201 Questions (Final) | 10 | MCQ + essay | 35 (30 MCQ + 5 essay) | printed, 30/30 MCQ + 5/5 essay, verified in full | Same 4 topics as Mucize's paper, different authors (Absalam101 & Rehab) and largely different stems — not spot-checked for literal duplicates against the sibling paper; treat as a probable-overlap pair for the next pass |
| Pathology CVS201 Questions (Final) | 23 | MCQ + essay | 70 (60 MCQ + 10 essay) | printed (page-1 stated; p.19's essay-answer tail verified) | Cardiomyopathy/atherosclerosis-heavy; not opened past p.1 and p.19 this pass |
| EOM - CVS 2 Dr Nafessa (Final) | 19 | **not a question source** | 0 | n/a | Confirmed by reading pp.1-4: a lecture/revision slide deck (Cardiomyopathy, Pericardial Effusion, Cardiac Tamponade, Pericarditis, Atherosclerosis, Risk Factors, …), despite sitting in the "06 EOM Exams" folder — the LANE-CARD-Y2.md §5 trap, confirmed on a second file. No Q&A to extract; skip for authoring, keep as a possible study-reference asset only |
| Pharmacology CVS201 Questions (Final) | 31 | MCQ | 110 (50 + 30 + 30 across 3 topics) | printed (page-1 stated; not opened past p.1 this pass) | Heart Failure & Hypertension / Arrhythmia / Hyperlipidaemia |
| EOM - Pharma Final Summary (By Alhoda) | 8 | **unrecoverable** | — | — | LANE-CARD-Y2.md §5's flagged OCR case: `pagetext.mjs status` shows p1-5 garbled (words=0), p6-8 native (32/8/17 words, drug-therapy tables). Ran `pagetext.mjs ocr --pages 1-5` per the lane brief's explicit instruction — output is unreadable (handwritten hand-drawn tables, OCR text is garbage strings, not real words; the Kasr-lane trap "a text layer can be present and undecodable" applies here at the OCR layer itself). Held: no usable content recovered; needs a better scan or Omar, not a re-OCR |
| Physiology CVS201 Questions (Final) | 46 | MCQ | 150 (30+40+20+30+30 across 5 topics) | printed (page-1 stated; not opened past p.1 this pass) | Blood Flow / Arterial BP / Capillary Circulation & Oedema / Shock / Coronary & Pulmonary Circulation; largest remaining source in the module |

Total remaining tier-1 question volume in this cluster once Anatomy,
Microbiology ×2, Pathology, Pharmacology and Physiology are triaged in full:
approximately 490 MCQs + ~15 essay prompts (105+35+35+70+110+150 minus the
Pharma-summary deck's unrecoverable content and the Dr Nafessa non-source),
before the ~12 Midterm papers and 87 MCQ-bank folders inventoried in the
first-tranche pass are even started.

## Checkpoint table (tranche 2)

| Module | Questions triaged this pass | Keys recovered | Concepts tested | Pending-hit (sparse overlay) | Live-hit (direct) | New mints | Authored |
|---|--:|--:|--:|--:|--:|--:|--:|
| MUST-CVS-201 Histology (full) | 50 | 50/50 | 12 | 8 | 1 | 3 | 50 |
| Remaining 8 papers (inventory only) | 0 opened in full | n/a | n/a | n/a | n/a | n/a | 0 |

## S3 — tranche 3 (2026-09-02, lane 3, branch `must-cvs201-author3`)

Third authoring pass, the next paper in the cluster order named by tranche
2's own inventory table: Anatomy CVS201 Questions (Final), the largest
remaining source in this cluster (32 pages). Triaged in full and authored
against the ~40-50 question target.

### Full triage — Anatomy CVS201 Questions (Final) — AUTHORED

`Anatomy/06 EOM Exams/EOM MCQs - Anatomy CVS201 Questions (Final).pdf`, 32
pages, by Absalam101 & Shahd, native-text (`pagetext.mjs status`: no
garbled pages, no OCR needed). `src_ac0704bd16ff99889463`.

The intro page (p.1) states "105 Questions" across five MCQ topics plus "5
Essay Questions"; the actual page count is 106 (100 MCQ + **6** essay
questions on p.31, not 5 — a minor discrepancy in the source's own count,
noted rather than silently corrected). Every section carries its own
printed answer key, immediately following that section's last question and
before the next section begins — not one combined key at the end:

| Section | Qs | Pages | Key page | Keyed |
|---|--:|---|--:|--:|
| Blood Supply of the Heart | 20 | p1-6 | p7 | 20/20 |
| Conducting System of the Heart | 10 | p8-10 | p10 | 10/10 |
| Arch of Aorta & Descending Thoracic Aorta | 30 | p11-18 | p18 | 30/30 |
| Esophagus | 20 | p19-23 | p24 | 20/20 |
| Heart Development & Fetal Circulation (Embryology) | 20 | p25-29 | p30 | 20/20 |
| Essay (6, not 5 as the intro page states) | 6 | p31 | p32 (model answers) | 6/6 |

100/100 MCQ keyed + 6/6 essay keyed = **106/106, 100% keyed**. All keys
read directly off each section's own printed answer table; no garbled or
missing key anywhere in this source. Full question-by-question triage is
in `-triage-keys.txt`.

100 raw MCQs collapse to a much smaller set of distinct concept candidates
— this paper is unusually concentrated, because MUST's CVS-201 Anatomy
teaching (coronary arteries, cardiac veins, the conducting system, the
aortic arch and its branches, the descending thoracic aorta, the
oesophagus and its relations, the thoracic duct, and heart
embryology/fetal circulation) sits almost exactly on ground Kasr's own
104-CPS anatomy concepts already cover in comparable depth — the same
directional signal tranche 1 first noted for this module's Pathology
content, now confirmed for Anatomy too. A direct grep of
`docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md` by label,
cross-checked against `server/data/medical-library-v1.json` (none of the
matches live) and against `find-existing.mjs` for a sample of terms
("conducting system", "descending thoracic aorta", "tetralogy of fallot"),
found:

- **20 concepts pending in `104-CPS-anatomy-concepts.md` itself** — the
  same file tranche 1 and tranche 2 already overlaid other rows onto, this
  tranche's 20 ids are all different records from either earlier tranche.
- **1 concept pending in the Year-3 SYS-CVS congenital heart disease
  catalogue** (`docs/import-ready/concept/SYS-CVS-CONCEPT-T08.md`) —
  Tetralogy of Fallot, `CON-CVS-AF9212C18AAF03`, matching the Heart
  Development section's own TOF question exactly (right ventricular
  outflow obstruction, VSD, overriding aorta, right ventricular
  hypertrophy — all four already the concept's own stated components).
- **0 live hits, 0 new mints.** Every concept this tranche's authored
  questions test was already pending somewhere in the corpus.

49 questions were selected for authoring — roughly half the paper,
proportioned across all five MCQ sections (10 Blood Supply, 6 Conducting
System, 12 Arch/Descending Aorta, 10 Esophagus, 11 Heart Development),
chosen to spread across the 21 distinct pending concepts above rather than
repeatedly re-testing the same fact; the remaining ~51 MCQs and all 6 essay
questions are triaged (keys recorded in `-triage-keys.txt`) but not
authored this pass. All 49 authored as MCQ seed → `emit-mcq.mjs`, the
paper being genuine multiple-choice with a full printed key per section.
All 49 are `pending-live` (main_concept pending, none live) — in
`pending-live/MUST-CVS-201-anatomy-questions.md` alongside a 21-record
sparse concept overlay (`pending-live/MUST-CVS-201-anatomy-concepts-
overlay.md`). Full apply order and simulate log in `pending-live/INDEX.md`.
0 questions held — every source printed a key for every selected item. 0
new mints.

### Not authored this pass (queued, next pass)

~51 remaining MCQs across the five sections (roughly half of each
section's items, the half not selected above) plus all 6 essay questions
(congenital interatrial-septum abnormalities, fetal-circulation changes
after birth, aortic-arch branches/relations, oesophagus relations, coronary
artery branches — all keyed with printed model answers on p.32, none
authored). A handful of once-only facts within already-covered sections
(e.g. Blood Supply Q11 oblique vein of left atrium as a left common
cardinal vein remnant, Q16 venae cordis minimi) were left for the next pass
rather than pushed past the ~40-50 target.

## Checkpoint table (tranche 3)

| Module | Questions triaged this pass | Keys recovered | Concepts tested (authored subset) | Pending-hit (sparse overlay) | Live-hit (direct) | New mints | Authored |
|---|--:|--:|--:|--:|--:|--:|--:|
| MUST-CVS-201 Anatomy (full) | 106 (100 MCQ + 6 essay) | 106/106 | 21 | 21 | 0 | 0 | 49 |

## S3 — tranche 4 (2026-09-02, lane 4, branch `must-cvs201-author4`)

Fourth authoring pass, closing out the Anatomy CVS201 EOM Final paper's
remaining half: the 51 MCQs (across all five sections) tranche 3 left
un-authored, plus the specific items its own S3 note flagged as "not
searched/not mapped to a concept" (azygos vein AO-Q16, abdominal oesophagus
/ left gastric artery ESO-Q15, Eisenmenger HD-Q19, situs inversus HD-Q17,
patent-ductus-arteriosus-as-diagnosis HD-Q16). Worked directly from
`-triage-keys.txt`'s `[A]`-tag record rather than trusting
`MUST-CVS-201-anatomy-LEDGER.md`'s own "Remaining" list, which turned out to
be a cosmetic artifact of tranche 3's two-segment key naming colliding with
`ledger.mjs`'s cluster-split regex (see that file's own new "Superseded"
note) — every source question's own [A]-tag in the triage-keys file was
re-checked page-by-page against the actual PDF (native text,
`pagetext.mjs status`: no garbled pages) rather than trusted from the gloss
alone, and one gloss (ESO-Q04) turned out to describe the wrong option
letter, caught and corrected against the printed key.

50 of the 51 remaining MCQs authored (10 Blood Supply, 4 Conducting System,
18 Arch/Descending Aorta, 10 Esophagus, 9 Heart Development), single-segment
seed keys (`anatomy2-qNN`, cluster `anatomy2`) precisely to avoid tranche 3's
key-collision bug. 48 of the 50 reuse the same 21 concepts tranche 3 already
sparse-overlaid onto Kasr 104-CPS's own unimported anatomy batch and the
Year-3 SYS-CVS catalogue (no new overlay rows needed for those); 1
(Eisenmenger, HD-Q19) reuses a second, different pending concept from the
same SYS-CVS-CONCEPT-T08.md file tranche 3 already overlaid for Tetralogy of
Fallot; 1 (situs inversus, HD-Q17) extends a pending Kasr concept
(dextrocardia/cardiac looping) whose own definition covers the mechanism but
not the whole-body term, confirmed via `find-existing.mjs` before extending
rather than minting; 1 (abdominal oesophagus / left gastric artery, ESO-Q15)
is a genuine new mint — no existing concept anywhere in the corpus covers
the abdominal segment's blood supply, confirmed by both `find-existing.mjs`
and a direct read of the Kasr thoracic-oesophagus concept's own scope.

1 question held: BS-Q15 ("Which artery supplies the conus arteriosus from
the left side?", key B) — neither the LCA nor RCA concept's own definition
mentions conus-artery branches, `find-existing.mjs` returned no hit for
"conus artery" or "left conus branch" either, and minting a whole new
concept (plus article/claims/citations) for this one narrow fact was judged
not worth it this pass. 6 essay questions still un-authored (skipped per the
tranche-4 dispatch scope; printed model answers on p.32 whenever a later
pass wants them).

**The Anatomy CVS201 EOM Final paper is now closed: 99/100 MCQs authored, 1
held, 0 remaining** (6 essays outstanding, separately). New files: seed
`coverage/seeds/MUST-CVS-201/anatomy2-pending.json`,
`pending-live/MUST-CVS-201-anatomy2-questions.md` (50),
`pending-live/MUST-CVS-201-anatomy2-concepts-overlay.md` (2 new overlay
rows), `coverage/MUST-CVS-201-anatomy2-LEDGER.md`. Extended:
`concept/`, `article/`, `evidence/{claims,citations,spans,sources}.md`
(the ESO-Q15 new mint) and `evidence/corpus-source-index.json` (this
lane's first citation against the Anatomy paper's own resource id,
`src_ac0704bd16ff99889463` — not previously registered there since
tranches 1-3 authored 0 new mints against it).

## Checkpoint table (tranche 4)

| Module | Questions triaged this pass | Keys recovered | Concepts tested (authored subset) | Pending-hit (sparse overlay, reused) | Pending-hit (new overlay row) | Live-hit | New mints | Authored | Held |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| MUST-CVS-201 Anatomy (remaining 51) | 51 (all MCQ) | 51/51 | 24 | 20 | 2 | 0 | 1 | 50 | 1 |

## S3 -- tranche 5 (2026-09-02, lane 5, branch `must-cvs201-author5`) -- Microbiology

Fifth authoring pass, the Microbiology cluster tranche 2's own inventory
table named as a "probable-overlap pair": the two sibling Microbiology
CVS201 EOM Final papers, each 30 MCQ + 5 essay, both fully verified in full
by tranche 2 (30/30 MCQ + 5/5 essay keyed). This tranche re-triaged both to
completion (single-segment `micro1-qNN` / `micro2-qNN` keys, per the
dispatch) and authored every keyed MCQ not held as a duplicate.

### Full triage -- both Microbiology CVS201 papers -- AUTHORED

`Microbiology/06 EOM Exams/EOM MCQs - CVS Final Microbiology Questions_Mucize
Doctors.pdf` (8 pages, by Youssef BenAhmed & Hamza Elmeadawy,
`src_89011691408ee232b5ff`, "micro1"/"m1") and `Microbiology/06 EOM
Exams/EOM MCQs - Microbiology CVS201 Questions (Final).pdf` (10 pages, by
Absalam101 & Rehab, `src_79f275c14b581a4187c2`, "micro2"/"m2"). Both
native-text (`pagetext.mjs status`: no garbled pages, no OCR needed). Both
cover the same four disease groups -- infective endocarditis, myocarditis,
pericarditis, rheumatic fever -- with a full printed key: 30/30 MCQ +
5/5 essay per paper, 60/60 MCQ + 10/10 essay total, all read in full
(`pagetext.mjs show`, <=3 pages/call).

**Cross-paper duplicates, held.** Because both papers drill the identical
four-topic syllabus, a systematic pass matched every raw question to the
single fact it tests and grouped questions testing the *same* fact (not
merely the same topic) into one cluster, authoring one representative MCQ
per cluster and holding the rest as `duplicate-of <key>` -- per the lane
dispatch's explicit rule for this cluster (contrast tranche 1's own
concept-level dual-sourcing of a genuine duplicate pair, which authored
both questions against one shared concept; this dispatch calls for holding
the redundant *question* instead). 15 of the 60 raw MCQs were held this way:
3 intra-paper (micro1 asks the same fact twice under a different vignette --
ASO specificity, novobiocin/epidermidis, and the optochin/bile-insolubility
lab test each appear twice in micro1 alone) and 12 cross-paper (the sibling
paper restates a micro1 fact, almost always as a shorter direct-recall stem
against micro1's own fuller clinical vignette). Every hold names its
duplicate-of key and a one-line reason in `-triage-keys.txt`.

45 of the 60 raw MCQs were authored (27 of micro1's 30, 18 of micro2's 30).
38 concepts serve the 45 authored questions:

- **32 new MUST mints** -- `find-existing.mjs` returned no hit for any of
  these specific facts (Coxsackievirus biology and disease associations,
  Janeway lesions, empiric endocarditis-therapy scope, amoxicillin dental
  prophylaxis, S. epidermidis glycocalyx pathogenesis, ASO-titer specificity,
  penicillin-timing-and-carditis, optochin/bile-insolubility lab
  differentiation, pericarditis transmission routes/etiology, diphtheria
  myocarditis, Candida myocarditis, and the acute-vs-subacute IE
  discriminator facts) -- all in `concept/`, `article/`,
  `evidence/{claims,citations,spans}.md` (own lane files, not pending-live).
- **4 live reuses, all in the CON-INF-* rheumatic-fever family** --
  `CON-INF-311E67B2C55A90` (molecular mimicry) was **already
  MUST-CVS-201-tagged by tranche 1**, so micro1-q16 cites it directly with
  no new overlay row; `CON-INF-2B28DE9528D471` (S. pyogenes as the RF
  pathogen) and `CON-INF-C8230A1A39D4A9` (RF's own clinical-feature list)
  needed a first MUST-CVS-201 sparse LIVE update, written directly into
  `concept/MUST-CVS-201-concepts.md` (same pattern as tranche 1's own row 1,
  not pending-live, since the target is already live) -- checked directly
  against `server/data/medical-library-v1.json` (`universityIds: ['kau']`,
  `learnerYears: [1,2,3]`, `moduleIds: []` for all three) before writing.
- **3 pending sparse-overlay reuses**, in `pending-live/MUST-CVS-201-
  microbiology-concepts-overlay.md`: `CON-INF-2E4D9F498F4B12` (Viridans
  streptococci = normal oral flora / classic subacute-IE cause, from
  `docs/import-ready/concept/ASU-INF-microbiology-concepts.md`, identical
  record also in Ain Shams's own tree) serves four questions (micro1-q02,
  micro1-q17, micro2-q03, micro2-q29 -- dental-procedure risk,
  congenital-heart-disease risk, and normal-flora framing are three facets
  of the one concept, not three); `CON-INF-C0123F8DDE0DAA` (S. saprophyticus
  differentiated from other coagulase-negative staphylococci, including S.
  epidermidis, by novobiocin) already names S. epidermidis by contrast in
  its own definition, so micro1-q04's inverse fact (epidermidis is
  novobiocin-*sensitive*) **extends rather than duplicates** it, the same
  call tranche 4 made for situs inversus; `CON-INF-D5C29272FC4BC9`
  (benzathine penicillin prevents recurrent RF, from MUST's own
  `FHB-102-2-microbiology-introduction-concepts.md`, a different Year-1
  lane's unimported file within this same university) serves micro1-q20 and
  micro1-q30 (standard regimen and the penicillin-allergic alternative,
  erythromycin, extending rather than duplicating the standard-regimen
  fact).

All 45 authored as MCQ seed -> `emit-mcq.mjs`, both papers being genuine
multiple-choice with a full printed key. 38 (main_concept live-tagged or
new-minted this batch) are in
`question/MUST-CVS-201-microbiology-mcq.md`; 7 (main_concept pending
elsewhere) are in `pending-live/MUST-CVS-201-microbiology-questions.md`
alongside the 3-record sparse concept overlay above. Full apply order in
`pending-live/INDEX.md`. 0 questions held for want of a key -- both sources
printed a key for every item; the 15 holds are all duplicate-of, not
unrecoverable. The 10 essay questions (5 per paper) are triaged and keyed in
`-triage-keys.txt` but not authored -- out of scope for this lane.

### Checkpoint table (tranche 5)

| Module | Questions triaged this pass | Keys recovered | Concepts tested (authored subset) | Pending-hit (sparse overlay, reused) | Live-hit (sparse update, reused) | Live-hit (already tagged) | New mints | Authored | Held (duplicate-of) |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| MUST-CVS-201 Microbiology (both papers, full) | 60 MCQ + 10 essay | 70/70 | 38 | 3 | 2 | 1 | 32 | 45 | 15 |

## S3 -- tranche 6 (2026-09-02, lane 6, branch `must-cvs201-author6`) -- Pathology

Sixth authoring pass, the Pathology CVS201 EOM Final paper tranche 2's own
inventory table named as the module's other remaining Pathology source (Dr.
Maria's written paper is the sibling tranche 1 already closed). The
inventory line estimated 23 pages / 70 questions; the actual PDF is 19 pages
(`pagetext.mjs status` and `mdls` agree) -- a source page-count
discrepancy, noted rather than corrected. The paper's own intro page states
"70 Questions (60 MCQs + 10 Essay Questions)", confirmed exact.

### Full triage -- Pathology CVS201 Questions (Final) -- AUTHORED

`Pathology/06 EOM Exams/EOM MCQs - Pathology CVS201 Questions (Final).pdf`,
by Absalam101 & Shahd, `src_67efbd148b42c6593611`. Native-text
(`pagetext.mjs status`: no garbled pages, no OCR needed). All 60 MCQs sit on
pp.1-16, with a single combined answer key printed on p.16 itself
(unusually, not on its own separate key page) -- 60/60 keyed. 10 essay
questions follow on p.17 with model answers on pp.18-19 -- 10/10 keyed, not
authored (out of scope). One source typo: Q23 prints "180 mmHg" for both
options C and D, a duplication rather than a genuine fourth distractor; the
printed key (C) stands per LANE-CARD.md rule 2, flagged in that question's
author_notes rather than silently corrected.

All 60 keyed MCQs authored, 0 held. This is the module's only Pathology MCQ
source -- the sibling written paper (Dr. Maria's, tranche 1) tests several
of the same facts (cardiomyopathies, tamponade, fibrinous pericarditis,
fatty streak, malignant hypertension, hypertension definition), and per
tranche 5's own precedent for an already-MUST-CVS-201-tagged concept
(contrast the duplicate-*question*-holding rule that dispatch set for the
sibling Microbiology papers, a different call for a genuinely redundant
question within one syllabus), those questions are dual-sourced against the
same shared concept rather than held as duplicate-of.

24 concepts serve the 60 authored questions:

- **14 new MUST mints** -- pericardial effusion classification (transudate
  from lymphatic obstruction), tuberculous pericarditis exudate character,
  suppurative pericarditis (penetrating-wound cause, purulent exudate),
  atheroma plaque structure (basic lesion, three zones, tunica intima),
  atherosclerosis complications (claudication, dystrophic calcification,
  renal artery stenosis; not hypertrophic cardiomyopathy), benign
  hypertension (BP range, hyaline arteriolosclerosis, death-order,
  abnormal-protein deposition), pre-eclampsia risk, sleep-apnoea
  cardiovascular risk, aneurysm classification/site/complications (true vs
  false wall, fusiform vs saccular, abdominal-aortic site), dissecting
  aortic aneurysm (Marfan association, tearing-pain vignette, bone
  erosion), Rasmussen aneurysm (TB-cavity pulmonary artery), mycotic
  aneurysm (infective-endocarditis association), Takayasu arteritis (young
  women, aorta and branches), polyarteritis nodosa (GIT arteries) -- all in
  `concept/`, `article/`, `evidence/{claims,citations,spans}.md` (own lane
  files, not pending-live).
- **3 pending sparse-overlay reuses**, in `pending-live/MUST-CVS-201-
  pathology-concepts-overlay.md`: `CON-CVS-D65416DBAEAA0E` (hypertrophic
  cardiomyopathy definition) and `CON-CVS-4A41D59159ED61` (restrictive
  cardiomyopathy definition), both from `docs/import-ready/concept/
  SYS-CVS-CONCEPT-T04.md`, the Year-3 SYS-CVS catalogue; `CON-CVS-
  E1FE73100F1688` (tuberculosis as a leading cause of constrictive
  pericarditis, aliased "Constrictive pericarditis aetiology"), from
  `SYS-CVS-CONCEPT-T06.md`, extended (not duplicated) to also cover the
  Pick's-disease naming, the suppurative-pericarditis complication route
  and the small-quiet-heart/no-hypertrophy physiology -- the same "extend
  rather than duplicate" call tranche 4 made for situs inversus.
- **3 already-MUST-CVS-201-tagged reuses**, no new overlay row needed:
  `CON-CVS-C531A645354244` (dilated cardiomyopathy), `CON-CVS-
  ABE9CE4B64FEF8` (cardiac tamponade) and `CON-CVS-F4BBA78E076D30`
  (hypertension definition and secondary causes) were all already sparse-
  overlaid onto `MUST-CVS-201` by tranche 1's own `pending-live/
  MUST-CVS-201-concepts-overlay.md`; this tranche's questions citing them
  need no new overlay row, only the new question records in `pending-live/
  MUST-CVS-201-pathology-questions.md`.
- **4 already-live-in-lane direct reuses**, no pending-live dependency at
  all -- `CON-CVS-D7459E7855802A` (fibrinous pericarditis), `CON-CVS-
  E87E4CDC5DE594` (fatty streak), `CON-CVS-F44EBF69D14F3B` (atherosclerosis
  risk factors) and `CON-CVS-8BFFDE83CC4617` (malignant hypertension) were
  all committed directly into `concept/MUST-CVS-201-concepts.md` by
  tranche 1 (from Dr. Maria's written paper), no overlay involved.

All 60 authored as MCQ seed -> `emit-mcq.mjs`, the paper being genuine
multiple-choice with a full printed combined key. 46 (main_concept
already-tagged, live-in-lane or new-minted this batch) are in `question/
MUST-CVS-201-pathology-mcq.md`; 14 (main_concept pending in SYS-CVS-
CONCEPT-T04.md/T06.md, or already-tagged-but-still-pending-dependency) are
in `pending-live/MUST-CVS-201-pathology-questions.md` alongside the 3-record
sparse concept overlay above. Full apply order and simulate log in
`pending-live/INDEX.md`. 0 questions held for want of a key -- the source
printed a combined key for every item. The 10 essay questions are triaged
and keyed in `-triage-keys.txt` but not authored -- out of scope for this
lane.

### Checkpoint table (tranche 6)

| Module | Questions triaged this pass | Keys recovered | Concepts tested (authored subset) | Pending-hit (new overlay row) | Pending-hit (already tagged, no new row) | Live-hit (already live-in-lane) | New mints | Authored | Held |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| MUST-CVS-201 Pathology (full, second paper) | 60 MCQ + 10 essay | 70/70 | 24 | 3 | 3 | 4 | 14 | 60 | 0 |

## S3 -- tranche 7 (2026-09-02, lane 7, branch `must-cvs201-author7`) -- Physiology

Seventh authoring pass, the module's last remaining tier-1 EOM source per
tranche 2's own inventory table: Physiology CVS201 Questions (Final), 46
pages, 150 MCQs across five topics (Blood Flow 30, Arterial Blood Pressure
40, Capillary Circulation & Oedema 20, Shock 30, Coronary & Pulmonary
Circulation 30), by Absalam101, Shahd & Rehab, `src_165188e079f0f475e54d`.
Native-text (`pagetext.mjs status`: no garbled pages, no OCR needed). Full
triage this pass covers only the first two topics named in this module's own
dispatch scope (Blood Flow and Arterial Blood Pressure, 70 questions
combined); Capillary Circulation & Oedema, Shock and Coronary & Pulmonary
Circulation were not opened this pass.

### Full triage -- Blood Flow (30) and Arterial Blood Pressure (40) -- AUTHORED

Blood Flow (Q1-30, printed key p.9) and Arterial Blood Pressure (Q1-40,
printed key p.20) each carry their own separate printed answer key,
immediately following that section. 30/30 Blood Flow keyed, 40/40 Arterial
Blood Pressure keyed -- 70/70, 100% keyed. One source defect noted, not
corrected: Arterial BP Q2 prints identical text ("60-90 mmHg") for both
options A and D, a duplication rather than a genuine fourth distractor; the
printed key (C, 90-150 mmHg) stands per LANE-CARD.md rule 2, same call
tranche 6 made for its own Pathology Q23 duplicate-option typo. One item
held for a different defect: Arterial BP Q7 (location of peripheral
chemoreceptors) prints a self-referential option D ("C & D"), not a
resolvable combination -- held rather than silently repaired.

30/30 Blood Flow questions authored in full. 26/40 Arterial Blood Pressure
questions selected and authored (1 held for the garbled option above; 13 of
the remaining 39 not selected this pass, queued for the next tranche
alongside the three untouched topics) -- 56 authored this pass, near the
`LANE-CARD-Y2.md` cluster's ~50-60 question target.

70 raw questions collapse to 24 distinct concept candidates via
`find-existing.mjs` plus grep across `docs/*-Source-Imports/concept`,
`docs/*-Source-Imports/pending-live` and `docs/import-ready/concept`, read in
full where a hit looked plausible (not just the tool's own truncated
snippet):

- **9 new MUST mints** -- basal sympathetic vasomotor tone, epinephrine's
  dual alpha/beta2 vascular action, kinins' pain-stimulation and
  capillary-permeability actions (paired), the skin flare reaction's axon-
  reflex mechanism, endothelin as the stretch-triggered vasoconstrictor,
  the resistance/exchange/capacitance functional classification of vessel
  segments, prostacyclin's local vasodilator action (distinct from its
  anti-platelet-aggregation role, confirmed by a fresh search that found
  only the hemostasis-facet concept elsewhere), left ventricular
  mechano/chemoreceptors and the Bezold-Jarisch reflex (paired), and the
  medullary pressor/depressor/cardiac-inhibitory centre anatomy (paired) --
  all in `concept/`, `article/`, `evidence/{claims,citations,spans}.md` (own
  lane files, not pending-live).
- **1 live-in-lane reuse, no overlay needed** -- `CON-CVS-A531FD56A171D7`
  ("long-term arterial blood pressure regulation acts through the
  renin-angiotensin system, ANP and vasopressin"), already committed to
  `concept/MUST-CVS-201-concepts.md` by tranche 1, serves 8 questions this
  tranche (RAS activation trigger, ANP secretion trigger and its opposition
  to angiotensin II, the renal mechanism as the most important long-term
  regulator, pressure natriuresis, angiotensin II's own action list, ANP's
  trigger restated, and vasopressin's water-retention mechanism).
- **15 pending sparse-overlay reuses**, in `pending-live/MUST-CVS-201-
  physiology-concepts-overlay.md`: 12 in Kasr's own unimported
  `104-CPS-mcq-concepts.md` (arterioles/Poiseuille's law/TPR, laminar-vs-
  turbulent flow, nitric oxide, the circulating vasoconstrictor/vasodilator
  hormone classification, the renin-angiotensin system, systolic/diastolic/
  MAP/pulse-pressure determinants -- extended to cover the haemodynamic
  determinants of those pressures, same "extend rather than duplicate" call
  earlier tranches made for situs inversus -- the arterial baroreceptor
  reflex, carotid sinus syndrome, local blood-flow autoregulation, the
  peripheral chemoreceptor reflex, the Cushing reflex, and the flow =
  pressure-gradient/resistance identity) and 3 in Alexandria's own
  unimported physiology-concepts files (AU-MED-106's blood-flow-velocity-
  by-vessel-type concept; AU-MED-102's sacral-parasympathetic-erection
  concept, extended to the general parasympathetic-vasodilator-fibres fact
  its own definition already states; AU-MED-203's hypothalamic-osmoreceptor
  concept, for the ADH-osmolality-trigger fact, a distinct mechanism from
  CON-CVS-A531FD56A171D7's own volume/atrial-receptor account of
  vasopressin).

All 56 authored questions are MCQ seed -> `emit-mcq.mjs`, the paper being
genuine multiple-choice with separate printed keys per topic. 21 (main_concept
a new mint this batch or the already-live-in-lane long-term-ABP-regulation
concept) are in `question/MUST-CVS-201-physiology-mcq.md`; 37 (main_concept
pending in Kasr or Alexandria's own unimported files) are in `pending-live/
MUST-CVS-201-physiology-questions.md` alongside the 15-record sparse concept
overlay above. Full apply order and simulate log in `pending-live/INDEX.md`.
1 question held for a garbled printed option (not a missing key -- the
source printed a key for every item, including the held one).

### Not authored this pass (queued, next pass)

11 of the 40 Arterial Blood Pressure questions not selected this pass
(physiological variation with age/sex, exercise pressure changes, the
per-centimetre hydrostatic effect, atrial-receptor/Bainbridge-style reflex,
cutaneous-pain-receptor pressor reflex, the Alam-Smirk reflex, the capillary
fluid-shift mechanism, and the baroreceptor-vs-chemoreceptor
excitatory/inhibitory classification) plus the 1 held item (garbled option
list). All three remaining topics are entirely untouched: Capillary
Circulation & Oedema (20 MCQs), Shock (30 MCQs) and Coronary & Pulmonary
Circulation (30 MCQs) -- not opened this pass. Total remaining question
volume in this source once all three topics and the 12 un-selected Arterial
BP items are triaged: approximately 93 MCQs (20+30+30+12+1 held), before the
~12 Midterm papers and 87 MCQ-bank folders inventoried in the first-tranche
pass are even started.

### Checkpoint table (tranche 7)

| Module | Questions triaged this pass | Keys recovered | Concepts tested (authored subset) | Pending-hit (new overlay row) | Live-hit (already live-in-lane) | New mints | Authored | Held |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| MUST-CVS-201 Physiology (Blood Flow + Arterial BP) | 70 (30 Blood Flow + 40 Arterial BP) | 70/70 | 24 | 15 | 1 | 9 | 56 | 1 |

## S3 -- tranche 8 (2026-09-02, lane 8, branch `must-cvs201-author8`) -- Physiology continued

Eighth authoring pass, per this module's own dispatch order: (1) the 11
Arterial Blood Pressure items tranche 7 left un-selected (Q8-Q12, Q26, Q28-30,
Q32, Q38 -- physiological variation, exercise, hydrostatic effect, atrial
reflex, cutaneous-pain pressor reflex, Alam-Smirk, capillary fluid shift and
the excitatory/inhibitory receptor classification), (2) the Capillary
Circulation & Oedema topic in full (20 questions), untouched before this
pass. Q7 (garbled "C & D" option) stays held, unchanged from tranche 7's own
determination -- re-checked against the printed page this pass and still not
resolvable to a clean option set. Shock (30) and Coronary & Pulmonary
Circulation (30) remain entirely untouched.

### Arterial Blood Pressure -- 11 remaining items -- AUTHORED

All 11 read directly off `src_165188e079f0f475e54d` pp.11-19 (own printed
key, p.20; sha re-verified against the manifest before reading). 70 raw
questions collapse to 9 distinct concept candidates via `find-existing.mjs`
plus grep across `docs/*-Source-Imports/concept`, `docs/*-Source-Imports/
pending-live` and `docs/import-ready/concept`:

- **8 new MUST mints** -- physiological variations in ABP by age/sex/emotion
  (one concept serving Q8, Q9 and Q10, the paediatric-BP, post-45-hormonal
  and emotional-pressor facts, all grouped under the source's own
  "physiological variations" heading), exercise's systolic-up/diastolic-down
  pattern (Q11), the ~0.77 mmHg/cm hydrostatic column effect (Q12), the
  cutaneous pain pressor reflex (Q28), the Alam-Smirk (proprioceptor) reflex
  (Q29), the hypothalamic ABP control centre for emotion/temperature (Q30),
  the capillary-fluid-shift compensatory mechanism (Q32), and the
  chemoreceptor-excitatory/baroreceptor-inhibitory classification (Q38) --
  all in `concept/MUST-CVS-201-physiology-2-concepts.md`,
  `article/MUST-CVS-201-physiology-2-articles.md`,
  `evidence/MUST-CVS-201-physiology-2-{claims,citations,spans}.md` (a new,
  separate own-lane file set for this tranche, not appended to the tranche
  1-7 files).
- **1 pending reuse, first MUST-CVS-201 tag** -- Q26 (atrial receptor
  stimulation by high central venous pressure, key C, vasodilation and
  tachycardia) matches `CON-CVS-5419DA4CEFDBB6`, the Bainbridge reflex, in
  `docs/Menoufia-Source-Imports/concept/MU-MED105-concepts.md` -- the first
  time this lane has reused a Menoufia concept. New sparse overlay row in
  `pending-live/MUST-CVS-201-physiology-concepts-overlay.md`, `##
  module_subject` intentionally omitted (see that file's own new field_notes
  on this row for why).

10 of the 11 are in `question/MUST-CVS-201-physiology-2-mcq.md`
(main_concept new-minted this batch); Q26 is in `pending-live/MUST-CVS-201-
physiology-2-questions.md` (main_concept pending). 0 held for want of a key
this pass -- the source printed a key for every item selected (Q7 stays held
from tranche 7, unchanged).

### Capillary Circulation & Oedema (20) -- AUTHORED IN FULL

`src_165188e079f0f475e54d` pp.21-26, own printed key p.26. 20/20 keyed, no
garbled options, no defects noted. 20 raw questions collapse to 9 distinct
concepts:

- **4 new MUST mints** -- the capillary fragility test (scurvy / purpura /
  allergy, serving Q2 and Q20), the law-of-Laplace capillary-wall-tension
  fact (Q5), the white-line reaction / precapillary-sphincter-constriction
  mechanism (Q12), and normal lymphatic return of unabsorbed capillary
  filtrate (Q15) -- all in this tranche's own `concept/article/evidence`
  `-physiology-2-` file set.
- **2 pending reuses, first MUST-CVS-201 tag, new overlay rows** -- Q7, Q9,
  Q10 and Q17 (four Starling-forces facts: venous-end absorption force,
  arterial-end filtration force, factors decreasing filtration rate, and the
  force falling from 35 to 15 mmHg along the capillary) reuse
  `CON-CVS-98657F1E7D300D`; Q11 and Q14 (electrolyte diffusion, vesicular
  transport of large molecules) reuse `CON-CVS-D3D1AF25EFA406` -- both full
  records in `docs/Kasr-Source-Imports/concept/104-CPS-physiology-
  concepts.md`, both new sparse overlay rows in `pending-live/MUST-CVS-201-
  physiology-concepts-overlay.md` (no `module_subject`, same pattern as the
  Bainbridge row above).
- **1 pending reuse, extends an existing MUST-CVS-201 overlay row** -- Q3
  (precapillary sphincters relax in response to accumulated metabolites)
  reuses `CON-CVS-56A68328FD03C7` (local blood-flow autoregulation), already
  sparse-overlaid onto this lane by tranche 7 for five Blood-Flow questions
  -- extended with one more field_notes line, not a new row, per the
  standing "extend, never twin" rule.
- **1 pending reuse, extends a tranche-1 overlay row** -- Q1, Q4, Q8, Q13,
  Q16 and Q19 (six oedema-mechanism facts: hypoalbuminaemic oedema, the
  general four-mechanism classification, DVT-driven venous-hydrostatic
  oedema, nephrotic-syndrome oedema, elephantiasis, and right-heart-failure
  oedema) all reuse `CON-CVS-6D8E2D62A9F51E`, already sparse-overlaid onto
  this lane by tranche 1 -- extended with one more field_notes line, not a
  new row.
- **2 own-lane live reuses, no overlay needed** -- Q6 (the spreading flare,
  axon reflex) and Q18 (the wheal, histamine) both reuse
  `CON-CVS-7F05227FE0970F`, tranche 7's own "skin flare reaction" concept in
  `concept/MUST-CVS-201-concepts.md` -- its definition, aliases, article and
  `hold_these`/`callout_evidence` were extended directly (own-lane record,
  not a foreign one) to state the wheal's separate histamine mechanism
  alongside the flare's axon-reflex mechanism it already covered, plus one
  new claim/citation/span pair
  (`CLM-CVS-TRIPLE-RESPONSE-HISTAMINE-WHEAL-01`) in the tranche 1-7 shared
  evidence files.

7 of the 20 are in `question/MUST-CVS-201-physiology-2-mcq.md` (main_concept
new-minted this batch or the extended live CON-CVS-7F05227FE0970F); 13 are in
`pending-live/MUST-CVS-201-physiology-2-questions.md` (main_concept
pending). 0 held.

### Not authored this pass (queued, next pass)

Shock (30 MCQs, triaged in full this pass -- see below) and Coronary &
Pulmonary Circulation (30 MCQs, not opened this pass) remain. Total
remaining question volume in this source: 60 MCQs, before the ~12 Midterm
papers and 87 MCQ-bank folders inventoried in the first-tranche pass are even
started.

**Shock section triaged in full but not authored** (own scope note: this
tranche's dispatch named it as in-scope "as far as ~55 authored"; 31
questions were authored across Arterial BP + Capillary Circulation, near
enough to that target that Shock's own 30 questions were read and keyed for
the next pass rather than partially authored this one). `src_165188e079f0f475e54d`
pp.27-35, own printed key p.35. 30/30 keyed, no garbled options, no defects
noted. Topics: hypovolaemic/cardiogenic/anaphylactic/neurogenic/septic/
obstructive shock classification, compensatory mechanisms (baroreceptor,
renin-angiotensin, ADH, aldosterone, tissue fluid shift), and irreversible
(refractory) shock's positive-feedback mechanisms. Full question-by-question
triage recorded in `-triage-keys.txt`.

### Checkpoint table (tranche 8)

| Module | Questions triaged this pass | Keys recovered | Concepts tested (authored subset) | New mints | Pending-hit (new overlay row) | Pending-hit (extended existing row) | Live-hit (own-lane, extended) | Authored | Held |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| MUST-CVS-201 Physiology (Arterial BP remainder + Capillary Circulation, Shock triaged only) | 61 authored-scope + 30 Shock triage-only | 91/91 | 18 | 12 | 3 | 2 | 1 | 31 | 0 |
