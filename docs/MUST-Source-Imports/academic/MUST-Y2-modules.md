# MUST Year 2 — modules, subjects, marks

Source: `/Users/doitrous/Desktop/Universities/MUST/00 Modules and Marks
Reference.md`, itself a transcription of the PentaGram bot's MUST plan sheets
(the per-semester "Plan and Mark Distribution" PDFs). Both Year 2 plan PDFs
are scanned/garbled — `pagetext.mjs status` on
`Semester 201/00 Administration/Plans and Mark Distribution/MUST 201 Plan and
Marks Distribution.pdf` and the Semester 202 equivalent both return
`words=0 garbled=yes` on every page — so this doc cites the existing
transcription rather than re-OCRing an already-solved source. The reference
doc itself flags OCR-uncertain discipline-split rows; that caveat carries
over here unchanged.

## Semester 201

| Module id | Faculty code | Subjects | Total marks | Assessment allocation |
|---|---|---|---:|---|
| `MUST-CVS-201` | CVS 201 | Anatomy, Histology, Physiology, Pathology, Pharmacology, Microbiology | 150 | Assignments 5; Midterm 40; Final written 60; OSPE 45 |
| `MUST-HIM-201` | HIM 201 | Histology, Microbiology/Immunology, Pharmacology, Pathology, Parasitology | 150 | Midterm 40; Final written 60; OSPE 45; coursework shown in source |
| `MUST-RES-201` | RES 201 | Anatomy, Histology, Physiology, Pathology, Pharmacology, Microbiology, Parasitology | 100 | Assignments 4; Midterm 26; Final written 40; OSPE 30 |
| `MUST-METABOLISM-I` | Metabolism I | Biochemistry | 75 | Assignment 3; Midterm 20; Final written 30; OSPE 22 |
| `MUST-INCISION-201` | Incision 201 | Incision (clinical/procedural skills) | unknown — needs Omar | unknown — needs Omar |

## Semester 202

| Module id | Faculty code | Subjects | Total marks | Assessment allocation |
|---|---|---|---:|---|
| `MUST-DHB-202-1` | DHB 202-1 | Anatomy, Histology, Physiology | 150 | Midterm 40; Final written 60; OSPE 45; coursework shown in source |
| `MUST-DHB-202-2` | DHB 202-2 | Pathology, Microbiology, Parasitology, Pharmacology | 125 | Midterm 33; Final written 50; OSPE 37; coursework shown in source |
| `MUST-END-202` | END 202 | Histology, Physiology, Pathology, Pharmacology | 75 | Assignment 3; Midterm 20; Final written 30; OSPE 22 |
| `MUST-METABOLISM-II` | Metabolism II | Biochemistry | 75 | Assignment 3; Midterm 20; Final written 30; OSPE 22 |
| `MUST-RESEARCH-METHODOLOGY` | Research Methodology | Research Methodology (incl. Medical Ethics per the faculty folder) | 25 | Final written 25 |
| `MUST-PCD-200` | PCD 200 | Professional and Clinical Development | 25 | End-year OSCE/final 25 |

Semester total: 500 marks (201) + 500 marks (202, excluding Incision 201) =
matches the pattern of Year 1's two 500-mark semesters (`MUST-Source-Imports/
LANE-CARD.md`, Year 1 §1).

## Not a gradable module

`MUST-SEMESTER-WIDE-RESOURCES` — 99 files organized by subject (Anatomy,
Biochemistry, Histology, Microbiology, Parasitology, Pathology,
Pharmacology), present under both `Semester 201/` and `Semester 202/`. No
module id maps to it in the marks reference; it is a shared-material pool,
not a module. Kept in the manifest as its own bucket rather than folded into
either semester's "wide" administration bucket.

## Needs Omar

- **`Incision 201`** — 14 lecture-kind sources (all "01 University Material"
  under a single `Incision` subject folder covering clinical/procedural
  skills, e.g. capillary blood sampling) do not appear in the Semester 201
  marks table at all. Confirm: does this module carry its own marks/exam, or
  is it ungraded skills training whose assessment is folded into another
  module's OSPE line (most likely CVS 201 or HIM 201, both of which already
  carry a 45-mark OSPE component)?
- **`Research Methodology`**'s Desktop folder holds two subject subfolders,
  "Medical Ethics" and "Research Methodology" — the marks reference lists
  only one row ("Research Methodology | Research Methodology | 25"). Confirm
  whether Medical Ethics content is graded under this module's 25 marks or is
  itself ungraded/administrative (Medical Ethics also appears as its own
  25-mark module in Semester 102 of Year 1, per the Year 1 lane card).
- Both semesters' official Plan-and-Marks PDFs remain scanned/garbled in this
  corpus; if a native-text or higher-resolution copy ever surfaces, re-verify
  the discipline-split figures the reference doc marks OCR-uncertain.
