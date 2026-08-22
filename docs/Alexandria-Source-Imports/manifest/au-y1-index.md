# Alexandria University — Year 1 source index

Generated 2026-08-22 from `/Users/doitrous/Desktop/Alexandria University/y1`. **685 distinct sources** (by sha256; see manifest/README.md "Deduplication reality" for why this is not one row per file).

Machine-readable copy: [`au-y1-sources.json`](./au-y1-sources.json)

## By module

| Module | Module name | Files | Distinct depts |
|---|---|--:|--:|
| `AU-MED-102` | Foundation of Basic Medical Sciences & Medical Terminology | 161 | 7 |
| `AU-MED-103` | Blood and Immune System & Medical Terminology | 55 | 5 |
| `AU-MED-105` | Musculoskeletal System & Communication and Basic Clinical Skills (1) | 237 | 5 |
| `AU-MED-106` | Cardiorespiratory System & Communication and Basic Clinical Skills (2) | 229 | 6 |
| `AU-UNI-104` | English | 3 | 1 |

## By department (across all modules in this file)

| Department | Files |
|---|--:|
| Anatomy | 192 |
| Physiology | 159 |
| Biochemistry | 142 |
| Histology | 71 |
| Anatomy and Embryology | 43 |
| Embryology | 24 |
| Clinical Skills | 22 |
| Terminology | 12 |
| General | 9 |
| Exams | 8 |
| English | 3 |

## By category

| Category | Files |
|---|--:|
| Department Book | 49 |
| Lecture Slides | 269 |
| Department Questions | 73 |
| End of Module paper | 5 |
| End of Module answers | 0 |
| End of Year paper | 0 |
| Practical | 105 |
| Orientation/Schedule | 0 |
| Administrative | 0 |
| Atlas/Reference | 0 |
| Unknown | 184 |

## Module x category

| Module | Department Book | Lecture Slides | Department Questions | End of Module paper | End of Module answers | End of Year paper | Practical | Orientation/Schedule | Administrative | Atlas/Reference | Unknown |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| `AU-MED-102` | 2 | 56 | 34 | 2 | 0 | 0 | 2 | 0 | 0 | 0 | 65 |
| `AU-MED-103` | 0 | 24 | 9 | 3 | 0 | 0 | 9 | 0 | 0 | 0 | 10 |
| `AU-MED-105` | 13 | 108 | 21 | 0 | 0 | 0 | 43 | 0 | 0 | 0 | 52 |
| `AU-MED-106` | 32 | 81 | 8 | 0 | 0 | 0 | 51 | 0 | 0 | 0 | 57 |
| `AU-UNI-104` | 2 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## Text layer

| textLayer | Files |
|---|--:|
| native | 435 |
| none | 247 |
| unprobed | 3 |

## Probe status (top values)

| probeStatus (bucketed) | Files |
|---|--:|
| native-text-extracted | 393 |
| ocr-ran | 232 |
| pptx-extracted | 40 |
| ocr-queued-not-yet-run | 11 |
| ocr-ran-negligible-text | 4 |
| docx-extracted | 2 |
| ppt-unprobed | 2 |
| pptx-unprobed | 1 |

## File type (by magic bytes, not extension)

| fileType | Files |
|---|--:|
| pdf | 640 |
| pptx | 41 |
| docx | 2 |
| ppt-ole | 2 |

## Module mismatches (folder vs header text)

None in this file.

## Exam signals

- **2** files carry a graduating-cohort number in the filename (2027-2030) — recorded as `cohortSignal`, never treated as a sitting year.
- **1** files are stream-specific (1 egyptian).
- **0** files had a sitting year read from the document's own printed date (never from a filename number).

## Duplicates and name-twins

- **55** sources are byte-identical copies filed under more than one path.
- **599** sources have a `nameTwinOf` link — a same-folder sibling with the same normalised name (bracket suffix and punctuation stripped) whose bytes differ. **299** of those are the `twinPreferred` one (more extracted text; ties go to the '[from Alexandria University Updated]' copy). See manifest/README.md 'Deduplication reality' — these are never merged, only cross-referenced.
