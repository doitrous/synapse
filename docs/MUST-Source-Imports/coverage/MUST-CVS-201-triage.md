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

## Files

- `MUST-CVS-201-triage-keys.txt` — one line per triaged question (source,
  question number, key-recovery method, one-line answer excerpt) plus the
  raw `find-existing.mjs` query log for the 17 concept candidates.
