<!--
  Al-Azhar University Damietta, Faculty of Medicine (Boys) -- Year 1 academic
  structure. Derived from the faculty's own official document (Student Guide -
  Year 1 - 2025-2026.pdf, p.21, "MBBCh PROGRAM MAP") plus the Desktop folder
  hierarchy under /Users/doitrous/Desktop/Universities/Al-Azhar University
  Damietta/Year 1. No mark, code, or semester fact below was inferred -- every
  figure cites the page it was read from (pagetext.mjs show, not restated from
  a prior note). Silent items are marked "unknown -- needs Omar".
  Import target: Academic Setup > Import. Module IDs below are this lane's own
  working assignments (AZD-<CODE>) -- no university id or module ids are
  registered yet for Al-Azhar Damietta; confirm with the chief of staff before
  minting against them.
-->

# Year 1 (AZD_Y1)

Source: `Year 1/00 Administration/Program Guides/Student Guide - Year 1 -
2025-2026.pdf`, p.21 ("MBBCh PROGRAM MAP", 1st YEAR). Read directly via
`pagetext.mjs show --pages 19-21`; p.19-20 (Arabic) establish the program is a
credit-hour system, 10 semesters over 5 "levels" (phases), 15 teaching weeks per
semester in levels 1-3, 1 credit hour = 25 marks. P.21 is the only page carrying
the Year 1 course table.

## Semester 1 (Phase 1) -- 15 weeks / 20+2 credit hours / 475+50 marks

| Module | Name | Weeks | Credit hours | Marks | Desktop folder |
|---|---|--:|--:|--:|---|
| `AZD-NHB` | Normal Human Body | 7 | 7 | 175 | `Semester 1/01 Normal Human Body` |
| `AZD-PDDT` | Principles of Disease Mechanism and Drug Therapy | 4 | 4 | 100 | `Semester 1/02 Principles of Diseases and Drug Therapy` |
| `AZD-BMS` | Biomedical Science | 3 | 4 | 100 | `Semester 1/03 Biomedical Science` |
| `AZD-CMBG` | Cellular and Molecular Biology and Genetics | 2 | 2 | 50 | `Semester 1/04 Cell Biology Molecular and Genetics` |
| `AZD-ENG` | English Language and Medical Terminology | 14 | 1 | 25 | `Semester 1/99 Ancillary Courses/English` |
| `AZD-PRF2` | Professionalism 2 (Soft Skills) | 14 | 1 | 25 | `Semester 1/99 Ancillary Courses/Professionalism 1 Soft Skills` (folder name mismatched, see below) |
| `AZD-FEKH` | Religious requirements (Fekh) | 14 | 1 | 25 | `Semester 1/99 Ancillary Courses/Fiqh` |
| `AZD-CSIT` | Computer Science and Information Technology | 14 | 1 | 25 | `Semester 1/99 Ancillary Courses/Computer Science and Information Technology` |
| `AZD-ELE1` | Elective 1 | 14 | 1 | -- (pass/fail) | `Semester 1/99 Ancillary Courses/Elective` |

Printed total: 15 weeks, 20+2 credit hours, 475+50 marks. The "+2"/"+50" is not
itemised anywhere on the table as a separate row -- it is not reconciled against
the nine listed rows in this pass (same open-arithmetic pattern the 6 October
lane flagged on its own bylaw; not independently resolved here either).

## Semester 2 -- 15 weeks / 21+1 credit hours / 500+25 marks

| Module | Name | Weeks | Credit hours | Marks | Desktop folder |
|---|---|--:|--:|--:|---|
| `AZD-HBI` | Haemopoietic system and Basic Immunology | 3 | 4 | 100 | `Semester 2/01 Hematopoietic System and Basic Immunology` |
| `AZD-MSK` | Musculoskeletal and skin | 7 | 8 | 200 | `Semester 2/03 Musculoskeletal and Skin` |
| `AZD-RMB` | Research Methodology & Biostatistics | 14 | 2 | 50 | `Semester 2/99 Ancillary Courses/Research Methodology and Biostatistics` |
| `AZD-RESP` | Respiratory system | 5 | 4 | 100 | `Semester 2/02 Respiratory System` |
| `AZD-QURAN2` | Religious requirements (Quran Kareem) | 14 | 1 | 25 | `Semester 2/99 Ancillary Courses/Quran` |
| `AZD-PRF1` | Professionalism 1 (Medical Ethics) | 14 | 1 | 25 | `Semester 2/99 Ancillary Courses/Medical Ethics` |
| `AZD-AQEEDA` | Religious requirements (Aqeeda) | 14 | 1 | 25 | `Semester 2/99 Ancillary Courses/Aqeedah` |
| `AZD-ELE2` | Elective 2 | 14 | 1 | -- (pass/fail) | `Semester 2/99 Ancillary Courses/Elective` |

Printed total: 15 weeks, 21+1 credit hours, 500+25 marks -- same unreconciled "+1"/
"+25" pattern as Semester 1.

**Professionalism numbering is reversed between the table and common naming**: the
table's "Professionalism 2" (Semester 1) is Soft Skills, and "Professionalism 1"
(Semester 2) is Medical Ethics -- i.e. Professionalism *2* is taught *before*
Professionalism *1*. Printed as read, not corrected.

## Desktop folder correspondence, subjects taught per module

Every `NN <Module Name>` folder under each semester further splits into
department/subject subfolders (each with the same eight `01 University
Material` ... `08 Resit and Baqoon` resource-kind subfolders, all empty except
where noted in `manifest/y1-sources.md`):

| Module | Subjects (Desktop subfolders) |
|---|---|
| `AZD-NHB` | Anatomy, Biochemistry, Histology, Physiology |
| `AZD-PDDT` | Internal Medicine, Microbiology, Parasitology, Pathology, Pharmacology |
| `AZD-BMS` | Microbiology, Parasitology |
| `AZD-CMBG` | Biochemistry, Histology |
| `AZD-HBI` | Anatomy, Biochemistry, Clinical Pathology, Histology, Immunology, Microbiology, Parasitology, Pathology, Pharmacology, Physiology |
| `AZD-RESP` | Anatomy, Biochemistry, Chest, Histology, Microbiology, Parasitology, Pathology, Pharmacology, Physiology |
| `AZD-MSK` | Anatomy, Biochemistry, Dermatology, Histology, Microbiology, Orthopedics, Parasitology, Pathology, Pharmacology, Physiology |

## Scaffolding-vs-bylaw mismatch -- needs Omar

`Semester 1/99 Ancillary Courses` has **nine** subfolders on Desktop, but the
Student Guide's Semester 1 table names only **five** ancillary components
(English, Professionalism 2/Soft Skills, Fekh, Computer Science & IT, Elective
1). The four extra folders -- `Clinical Nutrition`, `Hospital Administration`,
`Quality in Health Facilities`, `Quran` -- are not on the Semester 1 table at
all. `Quran` in particular is confirmed to belong to *Semester 2* by the same
table (and Semester 2's own folder tree correctly has a `Quran` subfolder, not
a duplicate). `Hospital Administration` and `Quality in Health Facilities` echo
course names more typical of later years in this kind of program (the
`Library Coverage Summary.md` catalog note lists a Year 3 "Professionalism 5 /
Quality of Health Care", a plausible near-match) but neither was confirmed
against a Year 2 or Year 3 table in this pass -- that would be out of scope for
a Y1 lane. Read as unverified scaffolding a prior curator built ahead of
confirming placement, not as Year 1 content. **Do not mint or author against
`Clinical Nutrition`, `Hospital Administration`, or `Quality in Health
Facilities` as Year 1 Semester 1 modules without an Omar ruling**, and treat
the Semester-1-folder `Quran` subfolder as a duplicate of Semester 2's, not a
second Year 1 Quran component.

## Where the only real content sits

Of the seven Semester 1 + Semester 2 modules above, only three have any actual
downloaded material anywhere in this corpus, and it sits **outside** this
official tree entirely -- under `Faculty of Medicine/Year 1/<nickname>/
_Telegram Year 1 Archive/` (see `manifest/y1-sources.md` for why two separate
trees exist):

| Module | Telegram-archive nickname | Files |
|---|---|--:|
| `AZD-HBI` | `Blood` | 4 |
| `AZD-MSK` | `Musculoskeletal` | 4 |
| `AZD-RESP` | `Respiratory` | 4 |

`AZD-NHB`, `AZD-PDDT`, `AZD-BMS`, `AZD-CMBG`, `AZD-RMB`, and every
ancillary/pass-fail component (English, Fekh, Computer Science & IT,
Professionalism 1/2, Aqeeda, Quran, both Electives) have **no source material
at all** in this corpus -- needs Omar sources. Telegram fetching is retired, so
this is not a gap this lane can close by fetching further.

## Source Evidence Used

- Manifest: `docs/AlAzharDamietta-Source-Imports/manifest/y1-sources.json`
- Primary source: `Student Guide - Year 1 - 2025-2026.pdf`, pp.19-21 (read
  directly via `pagetext.mjs show`, not restated from a prior note)
- Secondary source (folder correspondence cross-check only, not a marks
  source): `_Catalog/Library Coverage Summary.md`,
  `Faculty of Medicine/Year 1/_Catalog/Year 1 Priority 4.md`
- Desktop folder walk: `Year 1/Semester 1`, `Year 1/Semester 2` (full recursive
  listing, all leaf folders confirmed empty except where the manifest records a
  file)
