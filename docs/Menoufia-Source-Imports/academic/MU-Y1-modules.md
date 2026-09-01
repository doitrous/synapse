<!--
  Menoufia University modules — academic setup import batch, Year 1 (MU_Y1).
  Target university: `mu` (Menoufia University). university id `mu` already exists as an
  empty shell in `src/data/universities.ts` (not edited by this lane).

  Import target: Academic Setup → Import (`src/pages/admin/AcademicImportPage.tsx` FIELDS,
  parsed by `src/components/admin/ImportWizard.tsx`'s `parseMarkdown`). Columns: `year`
  (required), `term` (optional, defaults "Term 1"), `module` (required — the module name),
  `module_id` (optional, auto-generated if omitted). There is no credits/marks/subject
  column in this importer (see the Alexandria precedent, `docs/Alexandria-Source-Imports/
  academic/au-modules.md`, same note) — credits, weeks and marks are documented below for
  provenance and for the S2/S3 tiering work, not written into the Item blocks.

  IDs and names — per the Phase-0 brief: module id is the bare `MU-<CODE>` form (e.g.
  `MU-MED101`, no hyphen inside the code, unlike Alexandria's `AU-MED-102`). `<CODE>` is the
  faculty's own code exactly as printed in the Desktop corpus folder name
  (`/Users/doitrous/Desktop/Universities/Menoufia University/Faculty of Medicine/Current
  Basic 5-Year M.B.B.Ch/Year 1/Semester <1|2>/<CODE> - <title>`), letters+digits only,
  uppercased, spaces removed (`MED 101` → `MED101`, `E 101` → `E101`, `UNI 101` → `UNI101`).
  The module name is `"<CODE (spaced)> — <title>"`, title taken verbatim from the corpus
  folder name (which matches the official Student Guide row, S1 below) — not translated,
  not corrected against the brochure (S3) where the two disagree (see conflicts below).

  Eleven Year-1 shells, all confirmed against two independent official Menoufia Faculty of
  Medicine sources (full source register: `docs/Menoufia-Source-Imports/academic/
  official-curriculum-sources.md`, copied from the faculty's own
  `00 Administration/Plans and Mark Distribution/Official Sources.md`):

    S1 — Student Guide 2025-2026 (regulation effective for entrants from 2023/2024).
         https://mu.menofia.edu.eg/med/View/111192/ar
         `Faculty of Medicine/00 Administration/Plans and Mark Distribution/
         Official Curriculum Map.csv`, rows program="Basic 5-year M.B.B.Ch credit-hour
         program", version_label="Student Guide 2025-2026...", level="Year 1".
    S3 — Basic program brochure 2024-2025, subject/department contribution tables.
         https://mu.menofia.edu.eg/med/View/168214/ar
         Same CSV, row_type="subject_component", level="Year 1".

  Marks/credits/weeks table (S1 rows; source column cites the CSV row's own `source_id`).
  `subject_component` rows (S3) are the department split inside each module's mark total —
  read them from the same CSV (`row_type=subject_component`), not reproduced in full here.

  | Code | Title (S1 / corpus) | Semester | Credits | Weeks | Marks (S1) | Marks (S3 sum) |
  |---|---|---|---:|---|---:|---:|
  | MED101 | Foundation 1 | Semester 1 | 12 | 8 | 180 | 180 (Anatomy 60, Histology 30, Physiology 30, Biochemistry 60) |
  | MED102 | Foundation 2 | Semester 1 | 10.5 | 7 | 157.5 | 157.5 (Pathology 31.5, Pharmacology 39, Microbiology 51, Parasitology 36) |
  | MED103 | Communication Skills (Vertical Integration 1) | Semester 1 | 1.5 | longitudinal | 22.5 | 22.5 (Family Medicine 22.5) |
  | E101 | Faculty elective 1 | Semester 1 | 2 | longitudinal | 30 | not broken out in S3 |
  | UNI101 | Introduction to quality and accreditation in higher education institutions | Semester 1 | 1 | longitudinal | 20 (medium confidence — Arabic title translated) | not broken out in S3 |
  | MED104 | Musculoskeletal | Semester 2 | 12 | 8 | 180 | 180 (Anatomy 90, Histology 30, Physiology 15, Biochemistry 30, Pathology 15) |
  | MED105 | Cardiovascular system | Semester 2 | 12 | 8 | 180 | 180 (Anatomy 39, Histology 16.5, Physiology 61.5, Pathology 31.5, Pharmacology 31.5) |
  | MED106 | Medical Professionalism and communication skills | Semester 2 | 2 | longitudinal | 30 | **45** (Family Medicine 45) — S3/S1 conflict, see below |
  | MED107 | vertical integration 2 | Semester 2 | 1 | longitudinal | 15 | not broken out in S3 |
  | UNI102 | Community issues | Semester 2 | 1 | longitudinal | 20 (medium confidence — Arabic title translated) | not broken out in S3 |
  | E102 | Faculty elective 2 | Semester 2 | 2 | longitudinal | 30 | not broken out in S3 |

  Semester totals per S1: Semester 1 = 27 credits / 16 weeks / 360 marks; Semester 2 = 30
  credits / 16 weeks / 405 marks.

  **One unresolved conflict, printed as found, not resolved by inference:** MED106's S1
  semester-map row gives 30 marks; the same CSV's S3 subject-component row for MED106
  (Family Medicine) gives 45 marks on its own, with no other department listed for MED106.
  Both numbers are the faculty's own published figures from two different official
  documents (Student Guide vs. basic-program brochure) — this batch does not choose between
  them. Needs Omar / a later pass to resolve against a third source or the live 2025-2026
  mark sheet.

  Five modules have **no local source files** (confirmed by direct scan of the Desktop
  corpus, `docs/Menoufia-Source-Imports/manifest/y1-sources.md`, "Five empty shells"):
  E101, UNI101, MED107, UNI102, E102. They are listed below with their official marks
  (S1) because that much *is* documented, but no medical/academic content exists for them
  yet and none is invented.

  No medical topics, facts, or citations beyond the module map itself were inferred from
  unread source content. Review module IDs before applying.
-->

# Item
## year
Year 1
## term
Semester 1
## module
MED101 — Foundation 1
## module_id
MU-MED101

---

# Item
## year
Year 1
## term
Semester 1
## module
MED102 — Foundation 2
## module_id
MU-MED102

---

# Item
## year
Year 1
## term
Semester 1
## module
MED103 — Communication Skills (Vertical Integration 1)
## module_id
MU-MED103

---

# Item
## year
Year 1
## term
Semester 1
## module
E101 — Faculty elective 1
## module_id
MU-E101

---

# Item
## year
Year 1
## term
Semester 1
## module
UNI101 — Introduction to quality and accreditation in higher education institutions
## module_id
MU-UNI101

---

# Item
## year
Year 1
## term
Semester 2
## module
MED104 — Musculoskeletal
## module_id
MU-MED104

---

# Item
## year
Year 1
## term
Semester 2
## module
MED105 — Cardiovascular system
## module_id
MU-MED105

---

# Item
## year
Year 1
## term
Semester 2
## module
MED106 — Medical Professionalism and communication skills
## module_id
MU-MED106

---

# Item
## year
Year 1
## term
Semester 2
## module
MED107 — vertical integration 2
## module_id
MU-MED107

---

# Item
## year
Year 1
## term
Semester 2
## module
UNI102 — Community issues
## module_id
MU-UNI102

---

# Item
## year
Year 1
## term
Semester 2
## module
E102 — Faculty elective 2
## module_id
MU-E102
