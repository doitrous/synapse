# MUST Year 2 — priority source set

Derived from `../manifest/y2-sources.json` (1,583 rows). Tier follows the
manifest's kind→tier mapping (`manifest/y2-sources.md`): 1 = EOM/EOY exam
papers, 2 = MCQ banks + Midterm papers, 3 = department books, 4 =
lecture/practical material, 5 = summaries/unclassified module-wide, 9 =
administration.

## By tier (1,583 rows)

| Tier | Count | What |
|--:|--:|---|
| 1 | 87 | EOM/EOY exam-paper folders — the highest-authority, printed-key source |
| 2 | 539 | MCQ-bank folders + Midterm-exam-paper folders |
| 3 | 24 | Department books (`DPT BOOK`, `DPT BOOK MCQs`) |
| 4 | 887 | Lecture material (`01 University Material`) + Practical/OSPE |
| 5 | 31 | Summaries and Revision, or unclassified module-wide files |
| 9 | 15 | Administration (plans, schedules) |

Tiers 1-3 (650 rows) are the priority set for triage/authoring — printed
exams, MCQ banks and department books carry the strongest exam signal.
Tiers 4-5 (918 rows) are teaching material, read for article coverage once a
concept is minted, not triaged question-by-question.

## Tier 1 (EOM/EOY exam papers) by module

| Module | Tier-1 files |
|---|--:|
| `MUST-DHB-202-2` | 21 |
| `MUST-END-202` | 17 |
| `MUST-RES-201` | 12 |
| `MUST-CVS-201` | 11 |
| `MUST-HIM-201` | 9 |
| `MUST-METABOLISM-I` | 5 |
| `MUST-DHB-202-1` | 5 |
| `MUST-SEMESTER-WIDE-RESOURCES` | 2 |
| `MUST-METABOLISM-II` | 2 |
| `MUST-PCD-200` | 2 |
| `MUST-RESEARCH-METHODOLOGY` | 1 |

`MUST-DHB-202-2` actually carries the most tier-1 files (21, vs CVS-201's
11) — CVS-201 was chosen as the first module on **tier-1 + tier-2 combined**
exam signal (110 vs DHB-202-2's 102, `../manifest/y2-sources.md`), not tier-1
alone. `MUST-DHB-202-2` is the natural second-module candidate.

## Tier 2 (MCQ banks + Midterm papers) by module

| Module | Tier-2 files |
|---|--:|
| `MUST-CVS-201` | 99 |
| `MUST-RES-201` | 88 |
| `MUST-DHB-202-2` | 81 |
| `MUST-HIM-201` | 59 |
| `MUST-END-202` | 55 |
| `MUST-DHB-202-1` | 51 |
| `MUST-SEMESTER-WIDE-RESOURCES` | 36 |
| `MUST-METABOLISM-I` | 34 |
| `MUST-METABOLISM-II` | 23 |
| `MUST-RESEARCH-METHODOLOGY` | 8 |
| `MUST-PCD-200` | 5 |

## Readability (S1b, `../coverage/MUST-Y2-readability-index.md`)

`pagetext.mjs index` over all 1,334 PDFs: **34,491 pages, 6,241 garbled
(~18%)**, **236 files fully garbled** (every page 0-word, `ocr=no`). MCQ-bank
folders (tier 2) are disproportionately hit — in `MUST-CVS-201` alone, 19 of
its 87 `05 MCQs` files are fully garbled (5 Anatomy, 6 Histology, 5
Microbiology, 3 Pathology — see the readability index for the full list),
plus 2 of its 5 department books (both CVS Histology book/MCQ files) and 3
Pathology "01 University Material" lecture files. None of these have been
OCR'd yet — flagged as the priority OCR queue for whoever continues
`MUST-CVS-201`'s triage, since a fully-garbled MCQ file cannot contribute a
single question until `pagetext.mjs ocr` runs on it. The two files this
lane's first-tranche triage actually used (`../coverage/MUST-CVS-201-
triage.md`) were both native-text, chosen deliberately to avoid the OCR
queue for this Phase-0 pass.

## Tier 3 (department books, 24 files)

Present for `MUST-CVS-201` (5: Anatomy MCQ book, 2× Histology book/MCQ,
Pathology MCQ), `MUST-HIM-201` (4), `MUST-RES-201` (4), `MUST-DHB-202-1` (4),
`MUST-END-202` (2), `MUST-SEMESTER-WIDE-RESOURCES` (1, a Thorax anatomy
atlas). `MUST-METABOLISM-I/II`, `MUST-INCISION-201`, `MUST-PCD-200`,
`MUST-RESEARCH-METHODOLOGY` carry no department book in this corpus — a real
gap (matches Year 1's FHB-102-2 pattern of thin Biochemistry/Ethics book
coverage), not a classification miss.

## Recommended triage order after MUST-CVS-201

1. **`MUST-DHB-202-2`** (Semester 202) — 102 combined tier-1+2 sources, 21
   tier-1 papers (the most of any module), 4 subjects (Pathology,
   Microbiology, Parasitology, Pharmacology).
2. **`MUST-RES-201`** (Semester 201) — 100 combined, 12 tier-1, 7 subjects
   (broadest subject spread of any Year 2 module).
3. **`MUST-HIM-201`** — 68 combined, 9 tier-1, includes Parasitology (a
   subject with thin Year 1 concept coverage per the MUST Y1 lane card, so
   likely to skew toward "new" rather than "pending/live").

## Duplicate/twin note

37 exact-duplicate (sha256) groups / 80 files were collapsed in the manifest
— mostly the same MCQ file re-filed under two subject folders within one
module (e.g. `MCQs - CVS (real exam) 201 (2).pdf` appears identically in
Anatomy, Histology, Microbiology, Pathology and Pharmacology's own `05 MCQs`
folders) or shared across modules (`CVS 201` ↔ `RES 201` Anatomy MCQs — both
modules teach Anatomy from an overlapping thorax/back syllabus). No
near-duplicate (different-sha256 re-export) pass has run yet — flagged for a
later pass, same as FOMSCU's and Ain Shams' manifests note for their own
corpora.
