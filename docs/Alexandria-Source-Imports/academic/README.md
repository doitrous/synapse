# `academic/` — Alexandria University, Years 1–3

This folder holds the academic-structure import batch for Alexandria University (`au`) and
the source material behind it.

**Module id scheme, ruled 2026-08-22 (chief of staff, evening):** module ids are global bare
strings in this codebase — `withModules()` (`src/data/universities.ts`) copies `moduleId`
through unprefixed, and `bulkImport.ts` never checks a module id against which university it
belongs to. A bare faculty code (`MED 102`) would therefore collide with any other
university that prints the same code. Every Alexandria module id is now `AU-<CODE>`
(uppercase, hyphens, no spaces — `AU-MED-102`, `AU-UNI-104`, `AU-E-304`); the
faculty-printed code stays visible in the module *name* instead, as `"<CODE> — <title>"`
(e.g. `"MED 102 — Foundation of Basic Medical Sciences & Medical Terminology"`). Everywhere
below that shows a bare code (`MED 101`, `UNI 104`, `E 304`, …) is naming the faculty's own
label — for cross-referencing the corpus and the bylaws — not the technical `module_id`.

| File | What it is |
|---|---|
| `bylaws-2023-extract.md` | Page-cited extract of the Years 1–3 programme structure (module codes, titles, credit points, weeks, marks, sharing departments, assessment split) from the faculty's 2023 bylaws PDF. Evidence, not the batch. |
| `au-modules.md` | The Academic setup import batch — 23 modules across `AU_Y1`–`AU_Y3`, in the same `# Item` / `## year` / `## term` / `## module` / `## module_id` shape as `docs/import-ready/academic/kau-modules.md`. `module_id` is `AU-<CODE>` per the ruling above. |
| `README.md` | This file. |

The identical batch also ships at `docs/import-ready/academic/au-modules.md` (import-ready
copies of `au-modules.md`) and is indexed in `docs/import-ready/INDEX.md`, alongside the
Kasr Al Ainy modules entry — that is the copy Omar applies from.

## How to apply it

**Academic setup › Import**, with **AU** selected as the target university (the import
wizard's "Target university" selector on step 1). The importer (`AcademicImportPage.tsx`
`commit()`) reads the university's *current* structure and merges the batch's rows into it
— it does not replace anything. **Applying the file twice creates a second copy of every
module** (a new `imp-<timestamp>-<row>` course record for each row, since nothing in the
importer deduplicates by module ID within the wizard itself — the calling page's own
`uniqueId()` helper only prevents a *new* row from colliding with an ID already on the
university, it does not skip a row whose ID is already present). Import once; if a mistake
needs correcting, fix it in Academic Setup afterward rather than re-running the file.

## Validation

This importer is **not** covered by `medical:batch`, `medical:simulate`, or `medical:audit`
— those three gates read medical content batches (concepts, articles, questions, practical,
relations); an academic-structure file has none of those record types. `kau-modules.md`
documents the same exception. Instead:

- The file's shape was checked against the parser directly: `parseMarkdown()` in
  `src/components/admin/ImportWizard.tsx` (splits on `---`, reads `## key` blocks, lower-
  cases and underscores the key) and the field list in
  `src/pages/admin/AcademicImportPage.tsx` (`year`, `term`, `module`, `module_id`,
  `students`, with `course`/`module_name` → `module` and `moduleid` → `module_id` aliases).
  Both were ported into a throwaway Node script and run against `au-modules.md` in the
  scratchpad — every one of the 23 records parsed into a well-formed row with a non-empty
  `year`, `term`, `module`, and `module_id`, no row hit the `course`/`module_name` alias path
  (the file already uses the canonical header), and none of the 23 `AU-<CODE>` `module_id`
  values collided with each other or with any Kasr Al Ainy id in `kau-modules.md` (a
  collision was already impossible against `kau-modules.md`'s bare codes once the `AU-`
  prefix was added, but the check was rerun after the rename anyway).
  See the report at the end of this task for the exact command and output.
- The in-app preview (`ImportWizard`'s "Full preview" and "Skipped rows" steps) is the
  remaining check and happens when Omar runs the import; nothing here substitutes for it.

## Provisional department list (by module)

Taken from the corpus's own subfolder names, two levels under each module folder (component
folder, then department folder), under `/Users/doitrous/Desktop/Alexandria University/y1`,
`y2`, `y3`. **Provisional** — these are folder names the department used to sort its own
files, not a department-book-sourced module-subject tree. The real subject trees (the
`104-cps-structure.md` shape) come later, one per department book, once those books are
read.

| Module | Component(s) | Departments seen in the corpus |
|---|---|---|
| MED 101 | — | (no department subfolder; `General` only) |
| MED 102 | Foundation of Basic Medical Sciences | Anatomy, Physiology, Biochemistry, Pathology (Genetics), Embryology, Histology, Exams, General |
| | Medical Terminology | Terminology |
| MED 103 | Blood and Immune System | Anatomy, Physiology, Biochemistry, Histology, Exams, General |
| | Medical Terminology | (no further subfolder) |
| UNI 104 | English | English, General |
| MED 105 | Musculoskeletal System | Anatomy, Physiology, Biochemistry, Histology, General |
| | Communication and Basic Clinical Skills (1) | Communication |
| MED 106 | Cardiorespiratory System | Anatomy, Anatomy and Embryology, Physiology, Biochemistry, Histology, General |
| | Communication and Basic Clinical Skills (2) | Clinical Skills |
| UNI 107 | — | (no further subfolder) |
| MED 201 | Endocrine and Genitourinary Systems | Anatomy, Anatomy and Embryology, Physiology, Biochemistry, Histology, Exams, General |
| | Communication and Basic Clinical Skills (3) | Communication |
| MED 202 | Gastrointestinal System and Nutrition | Anatomy, Anatomy and Embryology, Physiology, Biochemistry, Histology, Exams, General |
| | Communication and Basic Clinical Skills (4) | Clinical Skills |
| MED 203 | Nervous System | Anatomy, Anatomy and Embryology, Physiology, Biochemistry, Histology, Forensics and Toxicology, Exams, General |
| | Professionalism, Medical Law and Ethics | Professionalism |
| MED 204 | Concept of Health and Disease (1) | Pathology, Pharmacology, Genetics, Forensic and Toxicology, Exams, General |
| | Professionalism, Medical Law and Ethics | (no further subfolder) |
| MED 205 | Concept of Health and Disease (2) | Pathology, Pharmacology, Genetics, Forensics and Toxicology, Exams, General |
| | Professionalism, Medical Law and Ethics | (no further subfolder) |
| MED 301 | Infection 1 | Microbiology, Parasitology, Pathology, Pharmacology, Community Medicine, General |
| MED 302 | Infection 2 | Microbiology, Parasitology, Pathology, Pharmacology, Tropical Medicine, Community Medicine, General |
| MED 303 | Concept of Health and Disease (3) | Pathology, Pharmacology, General |
| E 304 | Elective 1 | (no department subfolder; `General` only) |
| MED 305 | Medicine | Internal Medicine, General |
| E 306 | Elective 2 | (no department subfolder; `General` only) |
| MED 307 | Investigative Medicine | Clinical Pathology, Radiology, General |
| MED 308 | Research | Research, General |
| MED 309 | Surgery | Surgery, General |
| UNI 310 | Entrepreneurship | (no further subfolder) |
| UNI 311 | Critical Thinking | (no further subfolder) |

Spelling note: the corpus is inconsistent between "Forensics and Toxicology" (MED 203,
MED 205) and "Forensic and Toxicology" (MED 204) and between "Anatomy" alone vs. "Anatomy
and Embryology" as a combined subfolder (MED 106, MED 201, MED 202, MED 203) vs. "Anatomy"
and a separate implied Embryology content inside MED 102's "Embryology" subfolder. These are
recorded as seen — the table above is a corpus listing, not a normalised taxonomy, and no
subfolder name here has been merged, renamed, or corrected.

Two corpus top-level folders are **not** modules and are out of this table: `EOY Exams` (a
cross-module end-of-year exam archive, seen under `y2/` and `y3/`) and `Additional
Curriculum` (`y3/`, contains a `Community Medicine` folder that is not one of the 23 module
IDs in `au-modules.md`). Both are noted for whichever lane picks up Year 3 department books
and end-of-year resources; they carry no module ID of their own in the bylaws or the module
list in `LANE-BRIEF.md` §1.
