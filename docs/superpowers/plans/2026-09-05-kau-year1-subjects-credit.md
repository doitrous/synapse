# KAU Year-1 Subjects + Credit Hours — Implementation Plan

**Goal:** Give every Kasr (KAU) Year-1 module its examined **departments as subjects**, add a
**credit-points** field to the module model and populate it, and (Stage 2) allocate each
subject's articles + questions so students can filter a module's bank by department.

**Source of truth:** `First_Year_Study_Guide_2026` PDF, pages 14–15 (departments per module +
credit points / weeks / total marks). Decision (Omar 2026-09-05): **author fresh from the PDF**;
Omar reconciles/overwrites on the live site. Read-on-site was blocked (needs his super-admin MFA
token for `GET /api/state`).

**Architecture:** The live catalogue lives in server `app_state`, not the repo seed. Subjects are a
first-class entity — `ModuleSubject` (`src/data/moduleSubjects.ts`), a per-module tree, each subject
owning `marks: ExamMarks` and a `curriculum` selection (`articleIds`/`questionIds`/…). The **outline
importer** (`src/data/academicImport.ts` → `AcademicImportDialog`) is the path that creates modules
**and** their subjects in one paste: `onImport(years, subjects)` persists both. Credit hours have **no
home today** (module `CurriculumCourse` carries none; subjects carry only exam marks) → add
`creditPoints?: number` to the module and thread it through seed, importer and display.

**Key distinction (do not conflate):** a question's `## subject` tag is a **body system**
(`cvs`,`resp`,`gi`… from `curriculumCatalog.ts`), NOT a department. Department = `ModuleSubject`.
So department allocation is not already on questions — Stage 2 derives it from each authoring batch's
source (e.g. `103-BMS-histology-department-written.md` → Histology).

## Year-1 data (from PDF p14–15)

Departments (subjects) per module:
- **101 ISK** — Normal Structure of the Human Body: Anatomy & Embryology · Histology
- **102 INT** — Introduction to Biomedical Sciences: Biochemistry & Molecular Biology · Medical Physiology
- **103 BMS** — Biomedical Sciences & Musculoskeletal System: Biochemistry & Molecular Biology · Histology · Anatomy & Embryology · Medical Physiology
- **104 CPS** — Cardiopulmonary System: Medical Physiology · Histology · Anatomy & Embryology
- **108 INT** — Principles of Disease Mechanism & Pharmacological Basis of Drug Therapy-1: Pathology · Pharmacology
- **126 MPC** — Medical Professionalism & Communication Skills: Public Health · Incision Academy
- **130 EPE** — Early Patient Encounter 1: Family Medicine · Incision Academy
- **100 CRT** — (vertical skills, no departments listed)
- **127 TER** — (vertical skills, no departments listed)

Credit points / weeks / total marks:
| Module | Credit | Weeks | Total marks |
|---|---|---|---|
| 101 ISK | 12 | 8 | 240 |
| 102 INT | 10.5 | 7 | 210 |
| 103 BMS | 15 | 10 | 300 |
| 104 CPS | 15 | 10 | 300 |
| 108 INT | 2 | – | 40 |
| 130 EPE | 2 | – | 40 |
| 126 MPC | 1.5 | – | 30 |
| 100 CRT | 1.5 | – | – |
| 127 TER | 0.5 | – | – |

**Marks caveat:** the PDF gives only module *totals*. The model stores marks per-subject, split
written/practical × EOM/EOY. Without the per-subject exam blueprint I will **not** fabricate a split —
subject marks stay 0 and the module totals are recorded here for later. (Ask Omar for the blueprint, or
pull from the exam papers, to fill subject marks.)

---

## Stage 1 — subjects + credit field + populate (DO NOW)

### Task 1: add `creditPoints` to the module model + demo seed
**Files:** `src/data/universities.ts`
- `CurriculumCourse`: add `/** Credit points/hours the module carries. */ creditPoints?: number`.
- `KAU_MODULES`/`AU_MODULES` value type `[name, moduleId]` → `[name, moduleId, creditPoints?]`;
  `withModules` reads index `[2]` onto `course.creditPoints`.
- KAU `Year 1`: expand from 5 to the **9** modules above, each with its credit points.
- Check: `npm run build` (tsc -b, the real gate) is green; AU rows still parse (credit omitted).

### Task 2: teach the outline importer a credit token
**Files:** `src/data/academicImport.ts` (+ its `.test.ts`)
- On a module line (`- <name> [ID]`), also accept a trailing `(credit <n>)`; strip it before the
  `[ID]` match, set `curCourse.creditPoints`. Decimal-safe (`10.5`, `1.5`, `0.5`).
- Test: `- 101 ISK [101 ISK] (credit 12)` → course.creditPoints === 12; subjects still parse.
- `AcademicImportDialog.onImport(years, …)` already persists `years`, so the field flows to live.

### Task 3: surface credit (store is useless if invisible)
**Files:** `src/components/admin/ModuleEditDialog.tsx` (admin edit), `src/pages/student/University.tsx`
+ `src/pages/student/universityModel.ts` (student read)
- ModuleEditDialog: add a Credit-points field to `ModuleEditDraft` + input; thread through `onSave`.
- Student University page: show each module's credit points next to its name/marks.
- Check: build green; credit renders for a seeded module.

### Task 4: author the delivery artifact (fresh from PDF)
**Files:** `docs/import-ready/academic/kau-year1-modules-subjects.md`
- Outline format the importer reads: `# Year 1` / `## Term 1` / `- <name> [ID] (credit N)` /
  indented `- <Department>` per module (subjects). No marks tokens yet (see caveat).
- This is what Omar pastes into Academic Import to create the 9 modules + their subjects + credit on
  the live site. Replaces the minimal `kau-modules.md` (5 bare modules) for Year 1.

---

## Stage 2 — per-subject content allocation (LATER; needs live IDs)

**Goal:** populate each `ModuleSubject.curriculum.articleIds` + `questionIds` so a student filtering a
module by department sees exactly that department's bank.

**Blocked on:** the live snapshot (real article/question IDs) — `npm run medical:snapshot-live` with
Omar's token, or a DB read when the tunnel is reachable. Author-fresh does not give real IDs.

**Approach (when unblocked), can run in parallel per module:**
1. For each Year-1 module, list its authored article + question IDs from the content batches
   (`docs/import-ready/{article,question}/<MODULE>-*.md`) and the live snapshot.
2. Derive each item's **department** from its batch source: filename/section already encodes it
   (`…-histology-…` → Histology, `…-anatomy…` → Anatomy & Embryology, `…-physiology…` → Medical
   Physiology, `…-biochem…` → Biochemistry, etc.). Ambiguous items → report, don't guess.
3. Emit the allocation into each subject's `curriculum` and deliver as an `AcademicIntakePackage`
   (`moduleSubjects` + `curricula`) — the full-fidelity path that carries per-subject content — or via
   the admin CourseCurriculum dialog.
4. Verify: student University → module → each department shows the right question/article counts.

**Stage 3 (future, already modeled):** lecture-level split. `ModuleScheduleStore`
(`nishany-module-schedules-v1`) already exists; once Omar supplies the lecture schedule, assign each
subject's questions to lectures so a student can solve one lecture's content.

## Global constraints
- Reviewer `Medical team, Admin team`; final publisher `Admin team`; STATUS `Draft` (content lanes) —
  not relevant to Stage 1 (structure only), applies to any Stage 2 content authored.
- Typecheck gate is `npm run build` / `tsc -b`, never `tsc --noEmit` (solution-style tsconfig).
- Don't run any Kasr `scripts/kasr` registry/removeOrphans step (unrelated; destroys `written/` batches).
