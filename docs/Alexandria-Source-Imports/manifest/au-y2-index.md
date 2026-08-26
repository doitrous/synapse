# Alexandria University — Year 2 source index

Generated 2026-08-22 from `/Users/doitrous/Desktop/Alexandria University/y2`. **2279 distinct sources** (by sha256; see manifest/README.md "Deduplication reality" for why this is not one row per file).

Machine-readable copy: [`au-y2-sources.json`](./au-y2-sources.json)

## By module

| Module | Module name | Files | Distinct depts |
|---|---|--:|--:|
| `AU-MED-201` | Endocrine and Genitourinary Systems & Communication and Basic Clinical Skills (3) | 582 | 8 |
| `AU-MED-202` | Gastrointestinal System and Nutrition & Communication and Basic Clinical Skills (4) | 563 | 7 |
| `AU-MED-203` | Nervous System & Professionalism, Medical Law and Ethics | 634 | 8 |
| `AU-MED-204` | Concept of Health and Disease (1) & Professionalism, Medical Law and Ethics | 323 | 5 |
| `AU-MED-205` | Concept of Health and Disease (2) & Professionalism, Medical Law and Ethics | 175 | 5 |

Non-module containers (`containerKind` set, `moduleId: null` — material spans modules, so it is never assigned to one): 2 files, `year-eoy` (2).

## By department (across all modules in this file)

| Department | Files |
|---|--:|
| Physiology | 696 |
| Anatomy and Embryology | 541 |
| Pathology | 242 |
| Histology | 202 |
| Pharmacology | 170 |
| General | 132 |
| Biochemistry | 104 |
| Genetics | 56 |
| Professionalism | 41 |
| Anatomy | 37 |
| Exams | 30 |
| Clinical Skills | 28 |

## By category

| Category | Files |
|---|--:|
| Department Book | 77 |
| Lecture Slides | 837 |
| Department Questions | 446 |
| End of Module paper | 10 |
| End of Module answers | 4 |
| End of Year paper | 2 |
| Practical | 234 |
| Orientation/Schedule | 0 |
| Administrative | 1 |
| Atlas/Reference | 0 |
| Unknown | 668 |

## Module x category

| Module | Department Book | Lecture Slides | Department Questions | End of Module paper | End of Module answers | End of Year paper | Practical | Orientation/Schedule | Administrative | Atlas/Reference | Unknown |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| `AU-MED-201` | 19 | 147 | 133 | 3 | 0 | 0 | 69 | 0 | 0 | 0 | 211 |
| `AU-MED-202` | 23 | 200 | 109 | 6 | 4 | 0 | 33 | 0 | 1 | 0 | 187 |
| `AU-MED-203` | 33 | 259 | 138 | 1 | 0 | 0 | 62 | 0 | 0 | 0 | 141 |
| `AU-MED-204` | 0 | 172 | 40 | 0 | 0 | 0 | 45 | 0 | 0 | 0 | 66 |
| `AU-MED-205` | 2 | 59 | 26 | 0 | 0 | 0 | 25 | 0 | 0 | 0 | 63 |

## Text layer

| textLayer | Files |
|---|--:|
| native | 1586 |
| none | 683 |
| unprobed | 3 |
| n/a | 7 |

## Probe status (top values)

| probeStatus (bucketed) | Files |
|---|--:|
| native-text-extracted | 1452 |
| ocr-ran | 661 |
| pptx-extracted | 115 |
| ocr-ran-negligible-text | 22 |
| ppt-soffice-extracted | 16 |
| apkg-deck-metadata-read | 7 |
| docx-extracted | 2 |
| pptx-unprobed | 2 |
| doc-textutil-extracted | 1 |
| zip-unknown-unprobed | 1 |

## File type (by magic bytes, not extension)

| fileType | Files |
|---|--:|
| pdf | 2135 |
| pptx | 117 |
| ppt-ole | 16 |
| apkg | 7 |
| docx | 2 |
| doc-ole | 1 |
| zip-unknown | 1 |

121 files have a misleading extension (magic bytes disagree with the filename's claimed type) — see each row's `extensionNote`.

## Module mismatches (folder vs header text)

None in this file.

## Exam signals

- **28** files carry a graduating-cohort number in the filename (2027-2030, or a two-digit academic year like 23-24/24-25) — recorded as `cohortSignal`, never treated as a sitting year.
- **33** files are stream-specific (9 international, 24 egyptian); matched tokens: Egyptian, wafdeen, مصريين, وافدين.
- **16** files had a sitting year read from the document's own printed date (never from a filename number).

## Duplicates and name-twins

- **53** sources are byte-identical copies filed under more than one path.
- **1823** sources have a `nameTwinOf` link — a same-folder sibling with the same normalised name (bracket suffix and punctuation stripped) whose bytes differ. **875** of those are the `twinPreferred` one (more extracted text; ties go to the '[from Alexandria University Updated]' copy). See manifest/README.md 'Deduplication reality' — these are never merged, only cross-referenced.
- **63** sources have a `contentTwinOf` link — same extracted text (≥95% shingle/Jaccard, or an exact normalised-text hash match) on an *unrelated* filename, restricted to exam-paper/question-bank categories. **29** are `contentTwinPreferred`. See manifest/README.md 'Content twins'.
