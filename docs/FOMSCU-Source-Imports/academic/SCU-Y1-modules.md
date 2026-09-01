<!--
  Suez Canal University Faculty of Medicine (FOMSCU) Year 1 academic structure.
  Module codes, weeks, points, hours and marks are quoted verbatim from the faculty's
  own bylaw PDFs (00 Administration/Plans and Mark Distribution/), cited by page below.
  Folder-name -> module-id mapping is derived from the locally organized
  Faculty of Medicine/Year 1/ tree (docs/FOMSCU-Source-Imports/manifest/y1-sources.json).
  Import target: Academic Setup > Import. Module ids are FOMSCU-local (SCU-<code>).
-->

# Year 1 (Phase I, Pre-Clerkship)

FOMSCU runs a credit-point, semester-based curriculum (not Kasr's ISK/INT/BMS block
system) — modules here are literally called "Foundation for basic sciences I/II/III" and
"The Musculoskeletal System" in the bylaw, and the locally organized source tree names
its module folders "Foundation 1", "Foundation 2", "Foundation 3", "Musculoskeletal"
accordingly (not by department subject). Within each module, files are further split by
department subject (Anatomy, Histology, Physiology, Biochemistry, Genetics, Microbiology,
Parasitology, Pathology, Pharmacology, Embryology, Ethics, Community) — that subject split
is a corpus-organization choice for this lane, not an FOMSCU curricular unit; the bylaw
awards points/marks per **module**, not per subject.

**Two conflicting official pictures of Year 1 exist** (see
`_Catalog/Official Curriculum Completeness Check.md`, a Desktop source note, not part of
this manifest — restated here against the primary PDFs directly). The table below follows
the **2023 bylaw**, because it is the one that matches the locally organized folder names
(Foundation 1/2/3 + Musculoskeletal, no separate Respiratory/Cardiovascular folder for
Year 1). The older 2018 bylaw is recorded underneath for reference only — do not import
it as the live map.

## Semester 1

| Module folder (observed) | Module name (bylaw) | Module id | Weeks | Points | Hours | Marks |
|---|---|---|--:|--:|--:|--:|
| *(no matching folder)* | How to learn (Introduction to Medicine) | `SCU-HTL101` | 2 | 3 | 90 | 45 |
| Foundation 1 | Foundation for basic sciences I | `SCU-FBS102` | 7 | 10.5 | 315 | 157.5 |
| Foundation 2 | Foundation for basic sciences II | `SCU-FBS103` | 7 | 10.5 | 315 | 157.5 |
| *(no matching folder)* | Computer science* | `SCU-UNI101` | 2 h/wk × 15 | 1 | 30 | 20* |
| *(no matching folder)* | English course* | `SCU-UNI102` | 2 h/wk × 15 | 1 | 30 | 20* |
| | **Total, Semester 1** | | 16+1 | 26 | 780 | 360 |

## Semester 2

| Module folder (observed) | Module name (bylaw) | Module id | Weeks | Points | Hours | Marks |
|---|---|---|--:|--:|--:|--:|
| Foundation 3 | Foundation for basic sciences III | `SCU-FBS104` | 9 | 13.5 | 405 | 203 |
| Musculoskeletal | The Musculoskeletal System | `SCU-MS105` | 6 | 9 | 270 | 135 |
| *(no matching folder)* | Field Training I | `SCU-FT1` | 4 h/wk × 15 (inside modules) | 2 | 60 | 40 |
| *(no matching folder)* | Human rights* | `SCU-UNI103` | 2 h/wk × 15 | 1 | 30 | 15* |
| *(no matching folder)* | Quality course* | `SCU-UNI104` | 2 h/wk × 15 | 1 | 30 | 15* |
| *(no matching folder)* | Elective Study I* | `SCU-E01` | 2 h/wk × 15 | 1 | 30 | 15* |
| | **Total, Semester 2** | | 15 | 27.5 | 825 | 378 |

## Year-long (taught inside the semester modules, not a folder of their own)

| Module name (bylaw) | Module id | Points | Marks |
|---|---|--:|--:|
| Research Project I | `SCU-RPI` | 2 | 40 |
| Professional and Communication Skills I | `SCU-PCSI` | 4 | 80 |

**Printed Year 1 total (2023 bylaw): 31+1 weeks, 59.5 points, 1785 hours, 835 marks.**
`*` = must be passed (≥50%) but not added to the aggregate total (asterisked
university/elective modules, Art. 23 marks rule).

Source: `Internal Bylaw 2023 - 5+2 Credit-Point Program.pdf`, p29 (verified via
`node scripts/content/pagetext.mjs grep "<bylaw path>" "FBS102|FBS103|FBS104|MS 105|MS105|HTL101"`
— table transcribed from the grepped rows, not inferred).

## Marks rule (2023 bylaw / Student Handbook 2024-2025, quoted, not reconciled)

Pass a module at 60% of its total and 40% of its written component; electives pass at
50% and are not added to the aggregate; 1 credit point = 15 marks (Art. 23);
continuous/portfolio assessment 30%, integrated OSPE 40%, end-of-semester written 30%
(15% MEQ + 15% MCQ); attendance ≥75% required to sit exams; up to 22 credit points may
carry into Year 2. Source: `_Catalog/Official Curriculum Completeness Check.md`
(Desktop source note quoting the handbook/bylaw; not independently re-grepped by this
lane against the handbook PDF — flag **needs Omar** if that note's transcription needs
re-verification against `Student Handbook 2024-2025.pdf` directly).

## For reference only — 2018 bylaw's older Year 1 (not the live map)

Source: `Internal Bylaw 2018 - Credit-Point Program.pdf`, p20 (verified via
`pagetext.mjs grep "FBS1|MS 1|RS 1|CS1|CS 1"`).

- Semester 1: Foundation for basic sciences `FBS1.1.1` — 16 w, 24 pts, 720 h, 480 marks
  (+ Quality course `QC`, English)
- Semester 2: The Musculoskeletal System `MS 1.1.2` — 7 w, 10.5 pts, 315 h, 210 marks;
  Respiratory System `RS 1.1.3` — 5 w, 7.5 pts, 225 h, marks not captured in this grep;
  Cardiovascular System `CS 1.1.4` — 6 w, 9 pts, 270 h, marks not captured in this grep
  (+ Human rights `HR`)
- Printed Year 1 total: 34 weeks, 1020 marks.

Under this older map, **Respiratory and Cardiovascular sit in Year 1**, not Year 3 — the
opposite of the 2023 bylaw. `_Catalog/Official Curriculum Completeness Check.md` also
records a third, live signal: FOMSCU's Moodle 2025/2026 first-year category
(`https://med-elearning.suez.edu.eg`, not independently re-fetched by this lane — a
Desktop source note, cited as-is) lists Foundation I/II/III, Musculoskeletal, **and**
Respiratory + Cardiovascular modules for "1st year" — closer to the 2018 map than the
2023 one. **This is an unresolved conflict, not a lane decision**: the locally organized
source tree only has folders for Foundation 1/2/3 + Musculoskeletal (no Respiratory or
Cardiovascular material has been placed under `Year 1/` at all — see manifest). Flagged
**needs Omar**: which map the 2025/2026 cohort actually sits under, and whether
Respiratory/Cardiovascular material should be sourced and placed under FOMSCU Year 1.

## Curriculum note

FOMSCU is a problem-based / integrated curriculum faculty (per the credit-point bylaw's
own module framing — "Foundation for basic sciences", not "Anatomy 101"). The
department-subject breakdown used inside each module folder here (Anatomy, Histology,
Physiology, Biochemistry, Genetics, Ethics for Foundation 1; + Embryology, Microbiology,
Parasitology, Pathology, Pharmacology for Foundation 2; Biochemistry, Microbiology,
Pharmacology, Physiology for Foundation 3; Anatomy, Community, Genetics, Histology,
Pathology for Musculoskeletal) reflects what department each lecture/exam file's own
folder or content names, observed directly from the tree — not an FOMSCU-published
subject list, since the bylaw does not itemize one.

## Source Evidence Used

- Manifest: `docs/FOMSCU-Source-Imports/manifest/y1-sources.json`
- Bylaws grepped: `Internal Bylaw 2023 - 5+2 Credit-Point Program.pdf` p29,
  `Internal Bylaw 2018 - Credit-Point Program.pdf` p20
- Desktop source note read for context only (not treated as primary): `_Catalog/Official
  Curriculum Completeness Check.md`
- Source files inventoried under `Year 1/`: 122 (+3 faculty-root bylaw/handbook, +395
  unsorted staging — see manifest summary)
