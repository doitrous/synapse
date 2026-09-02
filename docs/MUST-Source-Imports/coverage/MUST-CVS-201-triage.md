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
