<!--
  MUST Year 5 academic structure.
  Derived from the faculty's own registration/plan documents found in the local
  source tree under /Users/doitrous/Desktop/Universities/MUST/Year 5/, plus the
  semester-wide midterm/final exam syllabi filed under each semester's
  "Semester-wide Resources/00 Module-wide" folder. No medical topics, facts, or
  marks were inferred beyond what these documents state.
  Import target: Academic Setup > Import (not yet applied -- MUST is local-only
  Draft, see LANE-CARD.md). Module IDs are MUST-local, prefix MUST-<CODE>, taken
  verbatim from the faculty's own module codes (CRN table / registration screen).
-->

# MUST Year 5 (`MUST_Y5`)

Two semesters, 22 required hours each, confirmed by two independent faculty sources:
Semester 501's own plan PDF (page 1, CRN table, native text) and Semester 502's own
registration-app screenshot ("22 Required Hours"). Both hour totals sum exactly to 22,
cross-confirming the module list against the hour list.

## Semester 501 — 22h (20h core + 2h electives)

Source: `Semester 501/00 Administration/Plans and Mark Distribution/◽️501 Plan -
Registration, Schedule & Mark distribution.pdf`, page 1 (native text, clean Latin
script) for codes/hours/CRN; page 2 (Arabic, right-to-left, extracted with the RTL
character order visibly reversed by `pdftotext`) for the informal per-module mark
breakdown — treated as lower-confidence and flagged per row below. Corroborated by
`Semester-wide Resources/00 Module-wide/08 Midterm Exams/⬜️ 501 Midterm syllabus.pdf`
and `.../06 EOM Exams/EOM - ⬜️ 501 Final Exam Syllabus.pdf`, both native text, which
give per-module midterm/final marks directly (no RTL ambiguity) and topic-level
syllabus content.

| Module ID | Faculty code | Name | Hours | Midterm marks (syllabus PDF) | Full-term marks (plan p.2, Arabic, lower confidence) |
|---|---|---|---:|---:|---|
| `MUST-MED501` | MED501 | Rheumatology & Immunology | 3 | 22 | plan p.2 says "15 mid" — **conflicts with the 22 the midterm syllabus states outright; held, not reconciled** — + ~7 quiz + 30 final + 23 clinical ≈ 75 |
| `MUST-SUR501` | SUR501 | Vascular Surgery (taught with general-surgery Onc/Transplant/Trauma at midterm) | 3 | 15 | matches plan p.2 "15 mid"; + 7 + 30 final + 23 clinical ≈ 75 |
| `MUST-PED501` | PED501 | Pediatrics | 5 | 25 | matches plan p.2 "25 mid"; 12 attendance + 18 slideshow + 50 final + 20 clinical ≈ 125 |
| `MUST-GYN501` | GYN501 | Gynecology & Obstetrics | 5 | 25 | matches plan p.2 "25 mid"; + 12 + 50 final + 38 practical MCQ ≈ 125 |
| `MUST-ORTH501` | ORTH501 | Orthopedic & Traumatology | 2 | not in midterm syllabus PDF (assessed by 3 quizzes instead, per plan p.2: quiz1 written 10, quiz2 online 10, quiz3 MCQ 5, final 50-Q ≈ 25) | 50 total |
| `MUST-GEN501` | GEN501 | Genetics | 1 | not in midterm syllabus (final-only module) | plan p.2: "GEN/REH/SPN/SPI/HEC are all final-only, 25 marks per credit-hour" |
| `MUST-REH501` | REH501 | Physical Medicine & Rehabilitation | 1 | not in midterm syllabus (final-only) | 25 (same rule) |
| `MUST-HECE` | HECE | Health Economics (elective) | 1 (of 2 elective h, pick 2 of 4) | — | 25 (same rule) |
| `MUST-QMHCE` | QMHCE | Quality Management (elective) | 1 | — | 25 |
| `MUST-SPIE` | SPIE | Sports Injuries (elective) | 1 | — | 25 |
| `MUST-SPNE` | SPNE | Sports Nutrition (elective) | 1 | — | 25 |

**Unrostered elective folder — flagged, not guessed:** the source tree also holds
`Electives 501/Law and Human Rights/` (11 files: BLHR/ETH-301-labelled MCQs and notes)
even though the 501 plan's own "select two" elective list names only the four rows
above. No module id was minted for it (`moduleId: null` in the manifest). Possibly a
prior cohort's elective option kept as historical backup — needs an Omar ruling before
any code is assigned.

**Total 501 (core + all four rostered electives, plan p.1 CRN table):** 20h core + 2h
electives (student picks 2 of the 4 elective rows) = 22h, matching the plan title.

## Semester 502 — 22h

Source: `Semester 502/00 Administration/Plans and Mark Distribution/MUST Plan 502 - 22
Required Hours.jpg` — a screenshot of the university's own registration app (image
only, no PDF text layer; read visually with the Read tool rather than OCR'd, since
`pagetext.mjs` is PDF-only and the screenshot's text is small/clean enough to transcribe
directly). Corroborated by `Semester-wide Resources/00 Module-wide/06 EOM Exams/EOM -
⬜️ 502 Final Exam Syllabus.pdf` (4 pages, native text), which gives exact final marks
and exam dates per module and is the stronger source for the marks column below.

| Module ID | Faculty code | Name | Hours (registration screen) | Final/OSCE marks (syllabus PDF, exact) |
|---|---|---|---:|---|
| `MUST-CLC502` | CLC502 | Clinical Longitudinal Cases | 5 | 75 total (SAT 17/2) |
| `MUST-DER502` | DER502 | Dermatology | 3 | 30 final + 20 clinical (WED 21/2) |
| `MUST-FAM502` | FAM502 | Family Medicine | 1 | 25 total (WED 20/3) |
| `MUST-GRP502` | GRP502 | Graduation Research Project | 4 | not in the exam syllabus (project-assessed, no exam date found) |
| `MUST-MED502` | MED502 | Nephrology Medicine | 3 | 30 final (WED 6/3) + 22 clinical OSCE (SAT 9/3) |
| `MUST-PAL502` | PAL502 | Palliative Care & Pain Management | 1 | 15 total (WED 13/3) |
| `MUST-RAD502` | RAD502 | Radiology | 1 | 25 total (SUN 17/3) |
| `MUST-SUR502-1` | SUR502-1 | General Surgery | 3 | 30 total (TUE 27/2) + 23 clinical OSCE (THUR 29/2) |
| `MUST-SUR502-2` | SUR502-2 | Urosurgery | 1 | 25 total (TUE 12/3) |

Total: 5+3+1+4+3+1+1+3+1 = **22h**, matching the registration screen's own "22 Required
Hours" header — this is the cross-check that confirms the module-code-to-subject-folder
mapping below.

**Module-code-to-folder confirmation:** the registration screen gives codes and hours
only, not subject names. Each code was matched to its source-tree folder by (a) file-name
prefixes inside the folder (e.g. `MED Nephro summary midterm.pdf` inside "Nephrology
Medicine 502" confirms `MED502` = Nephrology, not e.g. Family Medicine) and (b) the exam
syllabus PDF's own module-name headers next to matching mark totals and topic lists. All
nine 502 mappings above were confirmed this way; none are a guess from folder name alone.

## Folder → module-id map used to build the manifest

| Source folder | Module id(s) |
|---|---|
| `Semester 501/Rheumatology and Immunology 501/*` | `MUST-MED501` |
| `Semester 501/Vascular Surgery 501/*` | `MUST-SUR501` |
| `Semester 501/Pediatrics 501/*` | `MUST-PED501` |
| `Semester 501/GYN 501/*` | `MUST-GYN501` |
| `Semester 501/Orthopedics and Traumatology 501/*` | `MUST-ORTH501` |
| `Semester 501/Genetics 501/*` | `MUST-GEN501` |
| `Semester 501/Physical Medicine and Rehabilitation 501/*` | `MUST-REH501` |
| `Semester 501/Electives 501/Health Economics` | `MUST-HECE` |
| `Semester 501/Electives 501/Quality Management` | `MUST-QMHCE` |
| `Semester 501/Electives 501/Sports Injuries` | `MUST-SPIE` |
| `Semester 501/Electives 501/Sports Nutrition` | `MUST-SPNE` |
| `Semester 501/Electives 501/Law and Human Rights` | none minted — flagged, needs Omar ruling |
| `Semester 502/Clinical Longitudinal Cases 502/*` | `MUST-CLC502` |
| `Semester 502/Dermatology 502/*` | `MUST-DER502` |
| `Semester 502/Family Medicine 502/*` | `MUST-FAM502` |
| `Semester 502/Graduation Research Project 502/*` | `MUST-GRP502` |
| `Semester 502/Nephrology Medicine 502/*` | `MUST-MED502` |
| `Semester 502/Palliative Care and Pain Management 502/*` | `MUST-PAL502` |
| `Semester 502/Radiology 502/*` | `MUST-RAD502` |
| `Semester 502/General Surgery 502/*` | `MUST-SUR502-1` |
| `Semester 502/Urosurgery 502/*` | `MUST-SUR502-2` |
| `Semester 501|502/00 Administration/*`, `Semester-wide Resources/*` | none — cross-module resources |

## Source evidence used

- Manifest: `docs/MUST-Source-Imports/manifest/y5-sources.json` (772 files, sha256+size+ext+module/kind/tier guess per row)
- Summary: `docs/MUST-Source-Imports/manifest/y5-sources.md`
- Registration/marks sources read: `501 Plan - Registration, Schedule & Mark distribution.pdf` (p.1-2), `MUST Plan 502 - 22 Required Hours.jpg`, `501 Midterm syllabus.pdf` (p.1-2), `EOM - 501 Final Exam Syllabus.pdf` (p.1-5), `502 Midterm Exam Syllabus.pdf` (p.1), `EOM - 502 Final Exam Syllabus.pdf` (p.1-4)
- Not found in the tree at all: a Year-5-specific "modules and marks" reference sheet like the one that exists for Years 1-4 (`00 Modules and Marks Reference.md` stops at Semester 401, explicitly marked historical). The table above is assembled from primary faculty documents instead, since no such summary sheet exists for Year 5.
- No OCR was performed except the one screenshot read visually (see Semester 502 note above); no priority source in this module's syllabus set was a scan (see `coverage/MUST-Y5-readability-index.md`).
