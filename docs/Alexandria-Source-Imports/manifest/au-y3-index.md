# Alexandria University — Year 3 source index

Generated 2026-08-22 from `/Users/doitrous/Desktop/Alexandria University/y3`. **537 distinct sources** (by sha256; see manifest/README.md "Deduplication reality" for why this is not one row per file).

Machine-readable copy: [`au-y3-sources.json`](./au-y3-sources.json)

## By module

| Module | Module name | Files | Distinct depts |
|---|---|--:|--:|
| `AU-MED-301` | Infection 1 | 298 | 4 |
| `AU-MED-302` | Infection 2 | 2 | 1 |
| `AU-MED-303` | Concept of Health and Disease (3) | 150 | 3 |
| `AU-MED-305` | Medicine | 23 | 1 |
| `AU-MED-307` | Investigative Medicine | 8 | 2 |
| `AU-MED-308` | Research | 19 | 1 |
| `AU-MED-309` | Surgery | 35 | 1 |

Non-module containers (`containerKind` set, `moduleId: null` — material spans modules, so it is never assigned to one): 2 files, `additional-curriculum` (1), `year-eoy` (1).

## By department (across all modules in this file)

| Department | Files |
|---|--:|
| Microbiology | 142 |
| Pharmacology | 113 |
| Pathology | 108 |
| Parasitology | 75 |
| Surgery | 35 |
| Internal Medicine | 23 |
| Research | 19 |
| General | 13 |
| Radiology | 6 |
| Clinical Pathology | 2 |
| Community Medicine | 1 |

## By category

| Category | Files |
|---|--:|
| Department Book | 20 |
| Lecture Slides | 179 |
| Department Questions | 65 |
| End of Module paper | 16 |
| End of Module answers | 0 |
| End of Year paper | 1 |
| Practical | 40 |
| Orientation/Schedule | 0 |
| Administrative | 0 |
| Atlas/Reference | 0 |
| Unknown | 216 |

## Module x category

| Module | Department Book | Lecture Slides | Department Questions | End of Module paper | End of Module answers | End of Year paper | Practical | Orientation/Schedule | Administrative | Atlas/Reference | Unknown |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| `AU-MED-301` | 6 | 74 | 38 | 8 | 0 | 0 | 18 | 0 | 0 | 0 | 154 |
| `AU-MED-302` | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 |
| `AU-MED-303` | 5 | 68 | 26 | 2 | 0 | 0 | 2 | 0 | 0 | 0 | 47 |
| `AU-MED-305` | 3 | 13 | 0 | 0 | 0 | 0 | 4 | 0 | 0 | 0 | 3 |
| `AU-MED-307` | 0 | 1 | 0 | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 3 |
| `AU-MED-308` | 3 | 9 | 1 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 4 |
| `AU-MED-309` | 2 | 14 | 0 | 0 | 0 | 0 | 16 | 0 | 0 | 0 | 3 |

## Text layer

| textLayer | Files |
|---|--:|
| native | 424 |
| none | 113 |

## Probe status (top values)

| probeStatus (bucketed) | Files |
|---|--:|
| native-text-extracted | 386 |
| ocr-ran | 112 |
| pptx-extracted | 33 |
| ppt-soffice-extracted | 4 |
| ocr-ran-negligible-text | 1 |
| xlsx-extracted | 1 |

## File type (by magic bytes, not extension)

| fileType | Files |
|---|--:|
| pdf | 499 |
| pptx | 33 |
| ppt-ole | 4 |
| xlsx | 1 |

## Module mismatches (folder vs header text)

None in this file.

## Exam signals

- **5** files carry a graduating-cohort number in the filename (2027-2030, or a two-digit academic year like 23-24/24-25) — recorded as `cohortSignal`, never treated as a sitting year.
- **0** files are stream-specific ().
- **2** files had a sitting year read from the document's own printed date (never from a filename number).

## Duplicates and name-twins

- **0** sources are byte-identical copies filed under more than one path.
- **348** sources have a `nameTwinOf` link — a same-folder sibling with the same normalised name (bracket suffix and punctuation stripped) whose bytes differ. **174** of those are the `twinPreferred` one (more extracted text; ties go to the '[from Alexandria University Updated]' copy). See manifest/README.md 'Deduplication reality' — these are never merged, only cross-referenced.
- **18** sources have a `contentTwinOf` link — same extracted text (≥95% shingle/Jaccard, or an exact normalised-text hash match) on an *unrelated* filename, restricted to exam-paper/question-bank categories. **9** are `contentTwinPreferred`. See manifest/README.md 'Content twins'.
