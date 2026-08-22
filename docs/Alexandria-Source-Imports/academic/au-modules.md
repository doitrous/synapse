<!--
  Alexandria University modules — academic setup import batch, Years 1–3
  (AU_Y1, AU_Y2, AU_Y3). Target university: `au` (Alexandria University, short `AU`).

  Columns, read from the importer (`src/pages/admin/AcademicImportPage.tsx` FIELDS,
  parsed by `src/components/admin/ImportWizard.tsx`'s `parseMarkdown` /
  `src/data/bulkImport.ts` conventions): `year` (required), `term` (optional, defaults to
  "Term 1" if blank), `module` (required — the module name), `module_id` (optional,
  auto-generated from the name if omitted), `students` (optional, per-year enrolment count,
  not used here). Aliases the importer recognises for these headers: `course`/`module_name`
  → `module`, `moduleid` → `module_id`. There is no credits, subject, or assessment-split
  column in this importer — those live in a separate module-subject-tree import (see
  `docs/Kasr-Source-Imports/academic/104-cps-structure.md` for that shape), not this one.

  IDs and names — the rule from `docs/Alexandria-Source-Imports/LANE-BRIEF.md` §1: the
  module ID is the faculty's own label exactly as the corpus folder carries it
  (`/Users/doitrous/Desktop/Alexandria University/y1|y2|y3/<CODE> - <name>`), and the module
  name is the words after the dash in that same folder name. Neither is expanded,
  translated, or corrected against the bylaws — the bylaws extract
  (`bylaws-2023-extract.md`) is evidence for what the faculty's regulations say the course
  is called, not a source to substitute into the batch.

  Reconciliation against the bylaws (`bylaws-2023-extract.md` §3) — every disagreement found,
  and which title the batch uses:

    * MED 102, 103, 105, 106, 202: bylaws print the joint course as two stacked rows joined
      by "+" (e.g. "Foundation of Basic Medical Sciences" + "Medical Terminology"); the
      corpus folder spells the same pairing with "&" in one line. No wording differs beyond
      the joiner. Batch uses the corpus form.
    * MED 106: bylaws "Cardio-respiratory Systems" (hyphenated, plural); corpus
      "Cardiorespiratory System" (unhyphenated, singular). Batch uses the corpus form.
    * MED 201: bylaws "Endocrines and Genitourinary Systems"; corpus "Endocrine and
      Genitourinary Systems" (singular "Endocrine"). Batch uses the corpus form.
    * MED 203, 204, 205, 303: bylaws pair the module with "Professionalism, Medical Law &
      Ethics" and spell "Health & Disease"; the corpus folder spells both joiners "and"
      ("Medical Law and Ethics", "Health and Disease"). Batch uses the corpus form.
    * UNI 107: bylaws "Social issues" (lower-case i); corpus "Social Issues". Batch uses the
      corpus form.
    * MED 307: bylaws "Investigative medicine" (lower-case m); corpus "Investigative
      Medicine". Batch uses the corpus form.
    * UNI 311: bylaws "Critical thinking" (lower-case t); corpus "Critical Thinking". Batch
      uses the corpus form.
    * MED 101, UNI 104, MED 301, MED 302, E 304, MED 305, E 306, MED 308, MED 309, UNI 310:
      bylaws and corpus titles agree exactly (module content, not necessarily
      capitalisation-for-capitalisation on every word — where they matched, no note is
      needed above).
    * No module in years 1–3 has a code that disagrees between the bylaws and the corpus —
      every corpus folder code (`MED 1xx`/`MED 2xx`/`MED 3xx`, `UNI 1xx`/`UNI 3xx`, `E 3xx`)
      matches a bylaws row with the space removed (bylaws print `MED101`; the corpus and
      the university-identity table in LANE-BRIEF §1 both carry the spaced form `MED 101`,
      which is what this batch uses, per the fixed identity value).

  Terms — the bylaws state a semester per module for the entire Years 1–3 span (§3 of the
  extract: "Level I Semester 1/2", "Level II Semester 3/4", "Level III Semester 5/6"), so
  unlike Kasr's `kau-modules.md` (which defaults every row to "Term 1" because its source
  never states a term), this batch uses the bylaws' own semester, folded onto the two-term
  year structure the importer expects: within each year, the first bylaws semester of that
  level → Term 1, the second → Term 2. Concretely: Year 1 Term 1 = Level I Semester 1, Year 1
  Term 2 = Level I Semester 2; Year 2 Term 1 = Level II Semester 3, Year 2 Term 2 = Level II
  Semester 4; Year 3 Term 1 = Level III Semester 5, Year 3 Term 2 = Level III Semester 6 (the
  bylaws also mark this exact boundary as where Phase II / Clerkship begins — see the extract
  §3 note on the Cr P → Marks rate change). No caveat-blank term is needed for any of the 23
  rows below because the source states one for every module.

  Import: Academic Setup › Import, with **AU** selected as the target university. The
  importer merges rows into whatever `au` already has (`AcademicImportPage.tsx` `commit()`
  starts from the university's current `years` and appends), so applying this file twice
  would create a second copy of every module — the same hazard `kau-modules.md` documents.

  This folder is not covered by `medical:batch`, `medical:simulate`, or `medical:audit` (they
  read medical content batches, not academic-structure ones) — see the validation note in
  `README.md` for how this file was dry-run instead.
-->

# Item
## year
Year 1
## term
Term 1
## module
Medical School Orientation
## module_id
MED 101

---

# Item
## year
Year 1
## term
Term 1
## module
Foundation of Basic Medical Sciences & Medical Terminology
## module_id
MED 102

---

# Item
## year
Year 1
## term
Term 1
## module
Blood and Immune System & Medical Terminology
## module_id
MED 103

---

# Item
## year
Year 1
## term
Term 1
## module
English
## module_id
UNI 104

---

# Item
## year
Year 1
## term
Term 2
## module
Musculoskeletal System & Communication and Basic Clinical Skills (1)
## module_id
MED 105

---

# Item
## year
Year 1
## term
Term 2
## module
Cardiorespiratory System & Communication and Basic Clinical Skills (2)
## module_id
MED 106

---

# Item
## year
Year 1
## term
Term 2
## module
Social Issues
## module_id
UNI 107

---

# Item
## year
Year 2
## term
Term 1
## module
Endocrine and Genitourinary Systems & Communication and Basic Clinical Skills (3)
## module_id
MED 201

---

# Item
## year
Year 2
## term
Term 1
## module
Gastrointestinal System and Nutrition & Communication and Basic Clinical Skills (4)
## module_id
MED 202

---

# Item
## year
Year 2
## term
Term 2
## module
Nervous System & Professionalism, Medical Law and Ethics
## module_id
MED 203

---

# Item
## year
Year 2
## term
Term 2
## module
Concept of Health and Disease (1) & Professionalism, Medical Law and Ethics
## module_id
MED 204

---

# Item
## year
Year 2
## term
Term 2
## module
Concept of Health and Disease (2) & Professionalism, Medical Law and Ethics
## module_id
MED 205

---

# Item
## year
Year 3
## term
Term 1
## module
Infection 1
## module_id
MED 301

---

# Item
## year
Year 3
## term
Term 1
## module
Infection 2
## module_id
MED 302

---

# Item
## year
Year 3
## term
Term 1
## module
Concept of Health and Disease (3)
## module_id
MED 303

---

# Item
## year
Year 3
## term
Term 1
## module
Elective 1
## module_id
E 304

---

# Item
## year
Year 3
## term
Term 2
## module
Medicine
## module_id
MED 305

---

# Item
## year
Year 3
## term
Term 2
## module
Elective 2
## module_id
E 306

---

# Item
## year
Year 3
## term
Term 2
## module
Investigative Medicine
## module_id
MED 307

---

# Item
## year
Year 3
## term
Term 2
## module
Research
## module_id
MED 308

---

# Item
## year
Year 3
## term
Term 2
## module
Surgery
## module_id
MED 309

---

# Item
## year
Year 3
## term
Term 2
## module
Entrepreneurship
## module_id
UNI 310

---

# Item
## year
Year 3
## term
Term 2
## module
Critical Thinking
## module_id
UNI 311
