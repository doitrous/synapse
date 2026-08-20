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

## Year-code conflicts

12 filenames carry a batch code and a calendar year that disagree. Both are kept; neither is overwritten.

| Batch | Implies | Calendar label | Δ | File |
|--:|--:|--:|--:|---|
| 196 | 2022 | 2021 | -1 | `EOM 196 2021 EOM solved (1).pdf` |
| 196 | 2022 | 2021 | -1 | `EOM 196 2021 End of Module 102 (1).pdf` |
| 197 | 2023 | 2024 | +1 | `EOY BAQOON 197 101 FINAL - BAKOON 2024 الدور الثالث  (1).p` |
| 195 | 2021 | 2022 | +1 | `EOY 195 first 2022  101 ISK  final module (1).pdf` |
| 195 | 2021 | 2022 | +1 | `EOY 195 first 2022 101 ISK final (1).pdf` |
| 196 | 2022 | 2023 | +1 | `EOY 196 ISK 101 - WRITTEN 2023 (3) (1).pdf` |
| 198 | 2024 | 2025 | +1 | `EOY 198 BAQOON 10) Answers - Final Written 102 - 198 - 202` |
| 195 | 2021 | 2022 | +1 | `EOY 102 MERGED 195, 196, 197, 198 Final 2022-1_merged (2) ` |
| 196 | 2022 | 2023 | +1 | `EOM 196 104 - 2023 (1).pdf` |
| 196 | 2022 | 2023 | +1 | `EOM 196 104 2023 No answers  (1).pdf` |
| 198 | 2024 | 2025 | +1 | `EOY final 198 104 - دور مايو 2025 (2).pdf` |
| 197 | 2023 | 2024 | +1 | `Communication Exam 197 - 2024 (1).pdf` |

10 of 12 differ by **+1 year**. That is the pattern you would see if the batch code named the year a cohort *entered* and the calendar label the year they *sat* the paper. Until an owner settles which is authoritative, nothing here collapses them — see §8 of [the plan](../../medical-library-program/KASR-SOURCE-EXTRACTION-PLAN.md).
