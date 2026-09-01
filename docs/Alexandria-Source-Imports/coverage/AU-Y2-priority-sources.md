# Alexandria University Year 2 — priority source set (S2)

Per module: real exam papers (tier 1) first, then question banks (tier 2), then department
lecture material (tier 3), then notes/textbooks/module-wide (tier 4-5), administrative last
(tier 9) — the priority order from the law of priority (00 §0): papers+keys > department
files > notes/academy (tier ≤5) > textbooks (cited). Counts below come from
`manifest/au-y2-sources.json`, re-verified 2026-09-02 (see `manifest/au-y2-index.md`).

**A four-digit number in a filename is a graduating cohort, not a sitting year** — the
sitting year comes only from the paper's own printed header (LANE-CARD §7). Every module
below carries مصريين/وافدين (Egyptian/international) filename pairs — these are two
streams of the same sitting, not two years; record the stream, never mint a second year.

## Categorizer gap found during this pass — read before trusting the manifest's `category` field

The manifest's automatic categorizer only recognizes a literal `EOM -` filename prefix as
`category: "End of Module paper"`. **Every module's real End-of-Module papers that are
prefixed `EOM MCQs -` instead were filed under `category: "Department Questions"`** — same
bug independently found and worked around in Year 1's AU-MED-105/106 triage (see that
file's "Judgement on the one file with an EOM filename"). This is not one file's quirk; it
recurs identically in all five Year 2 modules (list below). A lane that trusts the
category column alone to find "the exam papers" will miss most of them. The tables below
were built by reading every `Department Questions`-category row's filename for `EOM`/
`Mock`/`Final`/stream tokens, not by trusting `category` alone.

## Summary — papers and banks by module

| Module | Real EOM/Mock papers found (any category) | Papers explicitly "with answers"/paired q+a | Banks (`Department Questions`, excluding the papers counted at left) | Bank pages (approx, `General`+largest depts) | Own-triaged keyed questions this pass |
|---|--:|--:|--:|--:|--:|
| `AU-MED-203` (Nervous System & Professionalism) | **13** (2 stream-specific finals + Mock q/a pair + 5 weekly EOM finals + 87pg "Previous Years…with answers" compilation + 4 workshop quizzes counted separately below) | 6 | 138 total, ~120 after papers pulled out | General 2165 + Physiology 1577 | **134** (4 Workshop Quizzes, fully keyed) |
| `AU-MED-202` (GIT & Clinical Skills 4) | 10 (2029 final ×2 copies, 23-24 مصريين/wafdeen finals, Formative 24-25, formative-with-answers, Mock-with-answers, Dr Agha-with-answers, GIT Final, Exam Model Workshop, Mock & Previous years) | 3 | 109 total, ~99 after papers pulled out | General 1259 + Anatomy 884 | 0 (not yet read this pass) |
| `AU-MED-201` (EGU & Clinical Skills 3) | 6 (وافدين/مصريين -27- finals, Mock exam 2023-24 q/a pair, plus 2 more in "End of Module paper" category) | 2 | 133 total, ~127 after papers pulled out | Physiology 2158 | 0 |
| `AU-MED-204` (Concept of Health & Disease 1) | 6 (2023 مصريين/وافدين final q/a — 4 files, 2 Mocks) | 2 | 40 total, ~34 after papers pulled out | General 861 | 0 |
| `AU-MED-205` (Concept of Health & Disease 2) | 4 (End of concept 2-2028, Mock 28 answered/without-answers pair, Final C.2) | 1 | 26 total, ~22 after papers pulled out | Pharmacology 709 | 0 |

**AU-MED-203 ranks first on every axis that matters for S1**: most real sitting papers
(13, vs. 4-10 for the others), the only module with a *dedicated 87-page "Previous Years…
with answers" compilation*, the only module with a full q+a pair PLUS 5 separately-keyed
weekly finals PLUS 4 fully-keyed workshop quizzes, the largest total file count (634) and
largest bank-page footprint of any Year 2 module. Selected as the S3 first-module triage
target (see `AU-MED-203-triage.md`).

## `AU-MED-203` — Nervous System & Professionalism, Medical Law and Ethics

**Tier 1 — papers** (`Nervous System/Exams/` unless noted)

| File | Pages | Keyed? |
|---|--:|---|
| `EOM - Final CNS مصريين 2027.pdf` | 16 | not yet checked |
| `EOM - Final CS وافدين 2027.pdf` | 19 | not yet checked |
| `EOM - Mock 2027 questions.pdf` + `EOM - Mock 2027 answers.pdf` | 43 + 43 | yes — separate answer file |
| `EOM MCQs - Previous Years CNS MCQ with answers.pdf` (`Nervous System/General/Questions`) | 87 | yes (filename + spot-checked format matches the Quiz files) |
| `EOM MCQs - CNS- week 1/2/3/4+5 Final.pdf` ×4 (`General/Questions`) | 37+27+35+48 | yes — each ends in an answer table, same house style as the Quizzes (spot-checked on Quiz 1-4, not yet on these four) |
| `EOM MCQs - CNS mock.pdf` / `MOCK 1 CNS.pdf` / `cns mock exam.pdf` / `Mock CNS answers.pdf` / `mock CNS with answers.pdf` / `mock with answers.pdf` | 15/21/48/46/10/15 | mixed — some explicitly "with answers", `Mock CNS answers.pdf` is a separate 46pg key file |

**Tier 1b — the four Workshop Quizzes (fully triaged this pass, see `AU-MED-203-triage.md`)**

`General/Questions/Workshop/MCQs - 1st/2nd/3rd/4th Quiz.pdf` — 10, 10, 9, 10 pages;
34+35+31+34 = **134 questions**, every one keyed by a native-text answer table on the
final page. Read in full; this is the triage core for S3.

**Tier 1c — a visual-key trap, found and NOT counted as keyed**

`General/Questions/Mocks/MCQs - MCQ CNS with answers.pdf` (6pg) — filename claims answers,
extracted text carries a `•` bullet glyph before one option per question, but the bullet
does **not** reliably mark the correct answer: Q1 ("trochlear nerve supplies which
muscle?") has the bullet on option B (medial rectus) while the textbook-correct answer is
C (superior oblique). Text-layer extraction does not survive whatever visual marking
(highlight/bold/color) the source used to indicate the true key. **Not usable via
`pagetext.mjs show` alone** — needs the visual-key extractor (dispatched per Menoufia's
2026-08-27 finding, not yet on `main` as of this pass) or a rendered-page read. Flagged,
not triaged.

**Tier 2 — banks** (`General/Questions/`, `Professionalism/Questions/`, `Anatomy/Questions/`
unless noted)

| File | Pages |
|---|--:|
| `MCQs - CNS bank by MCQs team.pdf` | 280 |
| `MCQs - CNS MCQs.pdf` | 182 |
| `MCQs - Workshop MCQs 1st/2nd/3rd/4th/5th Week.pdf` ×5 | 29/40/37/42/49 |
| `MCQs - Practical مصريين 2027.pdf` | 32 |
| `MCQs - Workshop Practical MCQ CNS.pdf` + `MCQs - Workshop practical Answers CNS.pdf` | 38 + 38 (paired q+a) |
| `MCQs - Prof Mcq Ch 1-20.pdf` (Professionalism) | not probed |
| 26 further Professionalism-department bank files | — |
| 14 further Anatomy-department bank files | — |

Physiology department (34 bank files, 1577 pages) and Histology (6 files, 298 pages) and
Biochemistry (4 files, 24 pages) not enumerated here — see manifest for the per-file list.

**Tier 3 — 259 lecture-slide files, 62 practical files** across Physiology, Anatomy and
Embryology, Histology, Biochemistry, Professionalism — see manifest, not enumerated.

**Tier 4-5 — Department Book: 33 files.**

## `AU-MED-202` — Gastrointestinal System and Nutrition & Clinical Skills (4)

**Tier 1 — papers**

| File | Pages | Keyed? |
|---|--:|---|
| `EOM - END GIT EXAM 2029.pdf` (+twin) | 12 | not yet checked |
| `EOM - GIT FINAL 23-24 (wafdeen).pdf` | 14 | not yet checked |
| `EOM - GIT final 23-24 (مصريين).pdf` | 16 | not yet checked |
| `EOM - GIT Formative Exam (24-25).pdf` | 49 | not yet checked |
| `EOM - GIT formative alex with answers.pdf` | 23 | yes (filename) |
| `EOM - Mock with answers.pdf` | 19 | yes (filename) |
| `EOM MCQs - Dr_ Agha GIT Exam With Answers.pdf` | 22 | yes (filename) |
| `EOM MCQs - GIT Final.pdf` | 23 | not yet checked |
| `EOM MCQs - GIT Exam Model Workshop.pdf` | 33 | not yet checked |
| `EOM MCQs - Mock & Previos years.pdf` | 25 | not yet checked |

**Tier 2 — banks (selected)**

| File | Pages |
|---|--:|
| `MCQs - GIT Question bank by MCQs.pdf` (+ variant 2, same 266pg) | 266 |
| `GIT Booklet ASM.pdf` (+twin) | 130 |
| `MCQs - Workshop 1st/2nd/3rd/4th Week MCQs.pdf` ×4 | 26/23/19/23 |
| `MCQs - GIT Practical nebras mcq.pdf` | 23 |
| `MCQs - Workshop Answers.pdf` (+twin) | 22 (paired with `Workshop practical mcq questions.pdf`) |

Remaining 33 Anatomy/Embryology, 21 Physiology, 12 Histology, 10 Biochemistry, 4 Clinical
Skills bank files — see manifest.

**Tier 3 — 200 lecture-slide files, 33 practical files.** **Tier 4-5 — 23 Department Book
files.**

## `AU-MED-201` — Endocrine and Genitourinary Systems & Clinical Skills (3)

**Tier 1 — papers**

| File | Pages |
|---|--:|
| `EOM - EGU Practical -27-(مصريين).pdf` (`End of Module paper` category) | 13 |
| `EOM - EGU End 2028 (مصريين).pdf` | 1 |
| `EOM - EGU END 2028 (وافدين).pdf` | 7 |
| `EOM MCQs - EGU FINAL -27- (wafdeen).pdf` | 20 |
| `EOM MCQs - EGU FINAl -27-(مصريين).pdf` | 15 |
| `EOM MCQs - Mock exam EGU 2023-2024.pdf` + `...answers.pdf` | 24 + 27 (paired q+a) |

**Tier 2 — banks (selected, largest by page count)**

| File | Pages |
|---|--:|
| `MCQs - All Endocrine MCQ.pdf` (+twin) | 74 |
| `MCQs - All Urinary MCQs.pdf` | 73 |
| `MCQs - All genital MCQ.pdf` (+twin) | 57 |
| `MCQs - امتحان_عملي_تجريبي_د_ابراهيم_عمرو.pdf` (+twin) | 25 |
| `MCQs - Previous year EGU.pdf` (+twin) | 21 |
| `MCQs - .practical EGU 1ST.pdf` (+twin) | 20 |

66 Physiology, 21 Anatomy and Embryology bank files remain — richest single department
(Physiology, 2158 pages) of any Year 2 module — see manifest.

**Tier 3 — 147 lecture-slide files, 69 practical.** **Tier 4-5 — 19 Department Book.**

## `AU-MED-204` — Concept of Health and Disease (1) & Professionalism

**Tier 1 — papers**

| File | Pages |
|---|--:|
| `EOM - Concept 1 final 2023 questions مصريين.pdf` / `...وافدين.pdf` | 9 / 14 |
| `EOM - Concept 1 final 2023 Answers وافدين.pdf` / `...answers مصريين.pdf` | 14 / 2 |
| `EOM MCQs - Afm 2028 Mock Concept 1.pdf` | 16 |
| `EOM MCQs - Mock of Concept Health and Diseases.pdf` | 18 |

**Tier 2 — banks (selected)**

| File | Pages |
|---|--:|
| `MCQs - Practical pharma by MCQs.pdf` (+twin) | 157 |
| `MCQs - Practical concept 1 first day by MCQs.pdf` (+twin) | 89 |
| `MCQs - All pedigrees.pdf` (+twin) | 86 |
| `MCQs - Concept Previous year Exams.pdf` | 46 |
| `MCQs - Concept Practical question Workshop.pdf` | 37 |
| `MCQs - Dr Hassan Genetics Question- pedigree.pdf` (+twin) | 23 |

No module-wide EOY container; smallest Year 2 module (323 files). **Tier 3 — 172 lecture
slides, 45 practical.** No Department Book files recorded.

## `AU-MED-205` — Concept of Health and Disease (2) & Professionalism

**Tier 1 — papers**

| File | Pages |
|---|--:|
| `EOM - End of concept 2- 2028.pdf` | 6 |
| `EOM - Mock 28 Concept 2 answered.pdf` (+twin) | 22 |
| `EOM - Mock 28 Concept 2 without answers.pdf` (+twin) | 22 |
| `EOM MCQs - Final C.2.pdf` | 9 |

**Tier 2 — banks**

| File | Pages |
|---|--:|
| `MCQs - Practical Q concept 2 by mcqs..pdf` | 47 |
| 12 Pharmacology-department bank files | 709 total |
| 6 Pathology-department bank files | 92 total |

Smallest Year 2 module (175 files). **Tier 3 — 59 lecture slides, 25 practical.**

## Cross-module / administrative (tier 9, not prioritized for triage)

`EOY Exams/General/EOY - 2nd Year Exams.docx` and `EOY Exams/General/EOY - Histology
practical Exams 1st & 2nd years.docx` — `containerKind: year-eoy`, `moduleId: null`,
material spans modules and is never assigned to one; read when a module's coverage needs
an EOY-level cross-check, not triaged per-module.

## What was NOT triaged this pass

Only `AU-MED-203`'s four Workshop Quizzes (134 questions) were read question-by-question
and checked against live/pending state — see `AU-MED-203-triage.md`. Every other paper and
bank listed above is **identified and page-counted, not yet read**. The "Keyed?" column
records only what the filename claims or a light spot-check confirmed; it is not a
per-question verification. Next S1 continuation should read `AU-MED-203`'s remaining
tier-1 papers (weekly EOM finals, Mock 2027 pair, 87pg Previous-Years compilation) before
moving to `AU-MED-202`.
