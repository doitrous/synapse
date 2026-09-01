<!--
  Mansoura University Faculty of Medicine Year 1 academic structure.
  Semester 1 codes/weeks/hours/marks are quoted from the official 2021-2022 Student
  Guide (00 Faculty and Program/Official Guides/), the only local evidence for Year 1
  marks — cited by page below. Semester 2 module codes/names are quoted from the dated
  2023-2024 official schedule (Year 1/Semester 2/00 Administration/Schedules/), which
  supersedes the 2021-2022 guide's Semester 2 table for the current cohort per
  _Catalog/Curriculum Map.md. Folder-name -> module-id mapping is derived from the
  locally organized Year 1/ tree and docs/Mansoura-Source-Imports/manifest/y1-sources.json.
  Import target: Academic Setup > Import. Module ids are Mansoura-local (MANS-<CODE>).
-->

# Year 1 — integrated basic-sciences program

Mansoura runs an integrated, module-block curriculum (not credit-point like FOMSCU) —
each semester is a run of 4-week system/discipline "modules" (`Modules (الحزم الدراسية)`
in the guide) sharing one combined semester exam, plus one or two longitudinal
university/college-requirement courses assessed separately. **Two dated pictures of
Semester 2 exist and do not agree** — see the version warning below; this lane follows
the dated 2023-2024 schedule for the current (64th) cohort's Semester 2, per
`_Catalog/Curriculum Map.md`'s own rule ("dated timetable evidence wins").

## Curriculum-version warning

- **Semester 1**: only one local dated picture exists — the 2021-2022 Official Student
  Guide. No dated Semester 1 timetable for the current cohort was found locally
  (`_Catalog/Missing High-Priority Downloads.md` confirms the faculty timetable page did
  not expose one). This lane uses the 2021-2022 guide's Semester 1 table as the working
  set (`HR`, `MT`, `PAEHC`, `PBBG`, `PPMIP`, `PPP`) **unconfirmed against a dated
  timetable for the 64th cohort** — flagged needs Omar below.
- **Semester 2**: the 2021-2022 guide places CVS, Respiratory, Immune/Blood/Lymphatic and
  Renal/Urinary in Year 1 Semester 2 (`CVS`, `RESP`, `IBL`, `RAU`, `+ ELE1` elective).
  The dated 2023-2024 Level 1 Semester 2 official schedule instead names `PPPM-201`,
  `MSS-202`, `HIS-203`, `ECE-204`, `UNI-204` — confirmed directly on the schedule's own
  title page ("PPPM-201: (Principles of Pathology, Microbiology, Parasitology &
  Pharmacology)." etc., p1) and its subject color-code legend (Anatomy, Pathology,
  Biochemistry, Pharmacology, Physiology, Histology, Microbiology, Parasitology). **The
  table below follows the 2023-2024 schedule** for Semester 2, because it is dated and
  matches the locally organized `Modules - 2023-2024 Schedule/` folder names. The
  2021-2022 baseline is kept for reference only, further down.

## Semester 1 (2021-2022 Official Student Guide, p.25 — no dated timetable available)

| Module folder (observed) | Module name (guide) | Module id | Weeks | Credit hours | Marks |
|---|---|---|--:|--:|--:|
| *(no matching folder)* | Preparatory week | — | 1 | — | — |
| `PAEHC - Principles of Anatomy, Embryology, General Histology and Cell Biology` | Principles of Anatomy, Embryology, General Histology and Cell Biology | `MANS-PAEHC` | 4 | 4 | *(combined, see below)* |
| `PPP - Principles of Physiology and Pharmacology` | Principles of Physiology and Pharmacology | `MANS-PPP` | 4 | 4 | *(combined, see below)* |
| `PBBG - Principles of Biochemistry and Basis of Genetics` | Principles of Biochemistry and Basis of Genetics | `MANS-PBBG` | 4 | 4 | *(combined, see below)* |
| `PPMIP - Principles of Pathology, Microbiology, Immunology and Parasitology` | Principles of Pathology, Microbiology, Immunology and Parasitology | `MANS-PPMIP` | 4 | 4 | *(combined, see below)* |
| `MT - Medical Terminology` | Medical Terminology (university requirement, longitudinal) | `MANS-MT` | 1 | not legible (see note) | 100 |
| `HR - Human Rights` | Human Rights (university requirement, longitudinal) | `MANS-HR` | 1 | not legible (see note) | 100 |
| | **Printed grand total** | | **18** | **17** | **400** |

**Combined exam, the 4 core modules (PAEHC + PPP + PBBG + PPMIP):** one shared exam,
max 400 marks — year work 120 (30%) + practical/OSPE 120 (30%) + written 160 (40%). `MT`
and `HR` are marked separately (100 each) as university-requirement courses, not folded
into the 400.

**Credit-hour note (unresolved, RTL extraction):** the guide's table is right-to-left
with columns in an order the text layer does not preserve faithfully (a known Mansoura
PDF-extraction trap — Arabic table layouts do not reflow column-major in the text
stream). The four core modules read unambiguously as 4 weeks / 4 credit hours each (16
credit hours total). `MT` and `HR` each show a `1` against "Weeks" and a dash against
credit hours in the extracted text, which would leave the printed grand total of 17
credit hours one short of 16 — this lane could not reconcile that extra credit hour from
the text layer alone. **Needs Omar**: visually check p.25 of the 2021-2022 guide (or a
dated Semester 1 timetable, if one turns up) for whether `MT` or `HR` carries 1 credit
hour, or the prep week does.

Source: `Official Student Guide - Basic Program - 2021-2022.pdf`, p.25, verified via
`node scripts/content/pagetext.mjs show "<guide path>" --pages 25-26` (table transcribed
from the shown page, not inferred).

## Semester 2 (dated 2023-2024 Official Schedule — current cohort)

| Module folder (observed) | Module name (schedule) | Module id | Component subjects (color-code legend, p1) | Weeks / marks |
|---|---|---|---|---|
| `PPPM-201 - Principles of Pathology, Microbiology, Parasitology and Pharmacology` | Principles of Pathology, Microbiology, Parasitology & Pharmacology | `MANS-PPPM-201` | Pathology, Microbiology, Parasitology, Pharmacology (+ Histology labs, per schedule day-content) | not found locally (see gap below) |
| `MSS-202 - Musculoskeletal System` | Musculoskeletal System | `MANS-MSS-202` | Anatomy, Physiology, Pharmacology (per Priority-4 file naming: Anatomy/Pharma/Patho content observed) | not found locally |
| `HIS-203 - Hematopoietic and Immune System` | Hematopoietic and Immune System | `MANS-HIS-203` | Histology, Pathology, Physiology, Microbiology, Biochemistry, Pharmacology (observed directly in staging filenames — see triage) | not found locally |
| `ECE-204 - Early Clinical Experience` | Early Clinical Experience | `MANS-ECE-204` | Cross-module practical skills (microscope use, IV/fluid administration, lab safety — observed on schedule day-content) | not found locally |
| `UNI-204 - Community Issues` (`القضايا المجتمعية`) | Community Issues | `MANS-UNI-204` | not observed in this pass | not found locally |

**Gap — no marks/credit-hour distribution found locally for Semester 2's current
modules.** The `00 Administration/Plans and Mark Distribution/` folder exists under both
semesters in the organized tree but is **empty** in both — no bylaw-equivalent document
carrying Semester-2 marks percentages was found for the current cohort. The schedule PDF
itself is a day-by-day timetable, not a marks table. **Needs Omar**: a Semester-2 marks
distribution document (bylaw, student guide revision, or similar) was not located in the
bounded local Desktop scan.

Source: `Official Schedule - Semester 2 - Level 1 - Group 1 - 2023-2024.pdf`, p.1,
verified via
`node scripts/content/pagetext.mjs show "<schedule path>" --pages 1-1` and
`node scripts/content/pagetext.mjs grep "<schedule path>" "PPPM|MSS|HIS|ECE|UNI-204"`.

## For reference only — 2021-2022 baseline's older Semester 2 (superseded)

Source: `Official Student Guide - Basic Program - 2021-2022.pdf`, p.26.

| Module folder (observed) | Module name (guide) | Module id | Weeks | Credit hours |
|---|---|---|---|--:|
| `CVS - Cardiovascular System` | Cardiovascular system | `MANS-CVS` | 4 | 5 |
| `RESP - Respiratory System` | Respiratory system | `MANS-RESP` | 4 | 5 |
| `IBL - Immune, Blood and Lymphatic Systems` | Immune, blood & lymphatic systems | `MANS-IBL` | 4 | 5 |
| `RAU - Renal and Urinary System` | Renal and urinary system | `MANS-RAU` | 4 | 5 |
| `ELE1 - Elective I` | Elective (I) (college requirement) | `MANS-ELE1` | — | 2 |
| | **Printed grand total** | | **16** | **22** |

Combined exam, the 4 core modules: max 500 marks — year work 150 (30%) + practical/OSPE
150 (30%) + written 200 (40%). `ELE1` marked separately, 100 marks, college requirement.

**Under this superseded baseline, IBL's content (Immune, Blood and Lymphatic Systems)
is the closest historical analog to the current `HIS-203` (Hematopoietic and Immune
System)** — same core systems, different credit-hour/marks structure. Do not import
against `MANS-IBL`; it is not the current cohort's module.

## Archive-group crosswalk (Telegram staging -> module)

See `docs/Mansoura-Source-Imports/manifest/y1-sources.md` for the full table and the
`PPPM` Telegram-label false-friend warning (Telegram `PPPM` = old-baseline S1
`PPP`+`PPMIP`, not the current-cohort S2 `PPPM-201`). Summary:

| Telegram archive group | Files | Resolved module | Evidence |
|---|--:|---|---|
| `AEP` | 315 | unresolved — spans `MANS-PAEHC` + `MANS-PPP` | `_Catalog/Curriculum Map.md` |
| `HBG` | 231 | unresolved — spans `MANS-PAEHC` + `MANS-PBBG` | `_Catalog/Curriculum Map.md` |
| `PPPM` (Telegram) | 422 | unresolved — spans `MANS-PPP` + `MANS-PPMIP` (S1, **not** `MANS-PPPM-201`) | `_Catalog/Curriculum Map.md` |
| `MSS` | 263 | `MANS-MSS-202` | direct match, task brief + folder/schedule naming |
| `HIS` | 113 | `MANS-HIS-203` | direct match, task brief + folder/schedule naming; corroborated by staging filenames naming Histology/Pathology/Physiology/Microbiology/Biochemistry content matching HIS-203's Hematopoietic & Immune scope |

`AEP`, `HBG`, and Telegram-`PPPM` cannot be split into their component modules without
per-file evidence (filename, in-document heading, or message context) — that per-file
pass is S1 triage work for those three modules, not part of this Phase-0 survey.

## Needs Omar

1. No dated Semester 1 timetable for the current (64th) cohort — confirm the
   2021-2022 baseline (`HR`/`MT`/`PAEHC`/`PBBG`/`PPMIP`/`PPP`) is still the live S1 set,
   or supply a dated Semester 1 schedule.
2. No Semester 2 marks/credit-hour distribution document for the current cohort's
   `PPPM-201`/`MSS-202`/`HIS-203`/`ECE-204`/`UNI-204` — the "Plans and Mark Distribution"
   folders are locally empty for both semesters.
3. The Semester 1 grand-total credit-hour reconciliation (17 printed vs. 16 legible
   from the 4 core modules) — likely an `MT`/`HR` credit hour lost to RTL extraction,
   needs a visual check of p.25.
