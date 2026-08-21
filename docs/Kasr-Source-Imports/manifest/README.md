# Kasr Alainy — Year 1 source manifest

Generated 2026-08-21 from `/Users/doitrous/Desktop/Kasr Alainy`. **415 files.** Machine-readable copy: [`kasr-y1-sources.json`](kasr-y1-sources.json).

Every file in the corpus has a row. A row is the only place a later stage should
learn a file's module, exam type, priority or year — so that two stages cannot
quietly disagree about the same paper.

## The owner's declarations

`NOTE … NOTE` text on a folder is an instruction, not a filename. Empty
subject folders say the same thing implicitly.

| Module | How it is stated | What it says |
|---|---|---|
| `101 ISK` | explicit NOTE instruction | 2 SUBJECTS ARE ANATOMY AND HISTOLOGY |
| `102 INT` | explicit NOTE instruction | 2 SUBJECTS ARE BIOCHEMISTRY AND PHYSIOLOGY |
| `103 BMS` | empty subject folder | module has subject Anatomy |
| `103 BMS` | empty subject folder | module has subject Biochemistry |
| `103 BMS` | empty subject folder | module has subject Histology |
| `103 BMS` | empty subject folder | module has subject Physiology |
| `104 CPS` | empty subject folder | module has subject Anatomy |
| `104 CPS` | empty subject folder | module has subject Histology |
| `104 CPS` | empty subject folder | module has subject Physiology |
| `108 INT` | empty subject folder | module has subject Pathology |
| `108 INT` | empty subject folder | module has subject Pharmacology |

## By module

| Module | Files | Orientation | EOM | EOY | Baqoon | Dept book | Dept questions | Practical |
|---|--:|--:|--:|--:|--:|--:|--:|--:|
| `101 ISK` | 76 | 1 | 6 | 16 | 4 | 1 | 0 | 0 |
| `102 INT` | 71 | 2 | 7 | 12 | 3 | 4 | 5 | 1 |
| `103 BMS` | 51 | 3 | 0 | 16 | 3 | 4 | 0 | 0 |
| `104 CPS` | 47 | 1 | 5 | 9 | 2 | 3 | 10 | 4 |
| `108 INT` | 14 | 1 | 0 | 4 | 0 | 4 | 2 | 2 |

Secondary modules: 55 files across `CRITICAL THINKING` (11), `Communication Skills (MPC 126, formerly CMS 129)` (15), `EPE 130 Family Medicine` (16), `MEDICAL TERMINOLOGY` (13).

Cross-module practical folder: 130 files.

## Processing state

- **174** files have no text layer and must be read by OCR or vision. A scanned paper that extracts to nothing is not an empty paper.
- **241** files have a native text layer.
- **28** files share their bytes with another path.

## Excluded

| File | Reason |
|---|---|
| `photo_2026-08-19 01.46.51.jpeg` | `administrative_not_medical_source` |
| `photo_2026-08-19 01.46.52.jpeg` | `administrative_not_medical_source` |
| `photo_2026-08-19 01.46.53.jpeg` | `administrative_not_medical_source` |
| `photo_2026-08-19 01.46.54.jpeg` | `administrative_not_medical_source` |
| `photo_2026-08-19 01.46.56.jpeg` | `administrative_not_medical_source` |
| `2022 102  قديم EOY 2022 PHYSIO OLD SYSTEM.pdf` | `superseded_curriculum_old_system` |

## Which year a paper was sat

12 filenames carry both a batch code and a calendar year and disagree. Five of
those print an exam date in their own header, and in **all five** the calendar label
matches the document while the batch code does not:

| Batch code | Label on the file | What the document itself says |
|--:|--:|---|
| 197 | 2024 | 14 July 2024 |
| 196 | 2021 | 26/12/2021 |
| 195 | 2022 | 22/09/2022 and 24/9/2022 |

So **the batch code names the cohort, not a year**, and the calendar label is the
sitting. `examSittingYear` carries that decision and `examSittingYearSource` says how it
was reached, so a later reader can disagree with the call without re-deriving it. The
batch code is kept — which cohort sat a paper is a real question — and is used to derive
a year only when nothing better is on the file.

| Sitting year | Exam papers | How the year was known |
|--:|--:|---|
| 2026 | 1 | 1 calendar label on the file |
| 2025 | 20 | 14 derived from batch code, 6 calendar label on the file |
| 2024 | 18 | 5 calendar label on the file, 13 derived from batch code |
| 2023 | 13 | 7 derived from batch code, 6 calendar label on the file |
| 2022 | 11 | 2 derived from batch code, 9 calendar label on the file |
| 2021 | 8 | 1 derived from batch code, 7 calendar label on the file |
| 2019 | 1 | 1 calendar label on the file |
| — | 23 | no year on the file |

**The latest three years** are 2026, 2025, 2024 — 39 exam papers.
