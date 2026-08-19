# Module subjects, allocated marks, and exam weighting

Date: 2026-08-19
Status: approved design, not yet planned
Scope: admin console only

## Problem

A module in Academic Setup is a name, a block, a term, and two dialogs
(Curriculum, Schedule). Nothing records what is *examined* inside it, so the
console cannot answer the question an administrator actually asks when building
a year: **how much does this module carry, and how is that split?**

Two consequences follow.

1. There is no place to record a faculty mark scheme — the disciplines inside a
   module (Anatomy, Physiology, Pathology) and the marks each carries across the
   written and practical sittings.
2. Curriculum content is chosen at module level, so a module's library topics,
   questions and practicals form one undifferentiated pile with no relationship
   to the disciplines that are examined.

Separately, the module row's inline editor is not usable: module ID, name and
block are three independent click-to-edit modes, the ID form offers a tick but
no cancel and no Escape, and the row wraps badly. A module's term is fixed at
creation and cannot be changed at all.

## Decisions taken

These were settled during brainstorming and are not open in planning.

| Decision | Choice |
|---|---|
| Relationship to the existing `Subject` | A new entity. The existing organ-system `Subject` (`cvs`, `resp`, `pharm`, …) is untouched; no `subjectId` anywhere changes. The new entity is a **module subject**. |
| What you type | **Marks.** Every percentage in the product is derived. There are no stored percentages and no stored totals. |
| Rollup denominators | **Pure mark share.** No explicit year or module weights. |
| Audience | **Admin only.** No student-facing surface in this spec. |
| University-level surface | A **read-only overview at its own route**. Editing happens in one place: the module's dialog. |
| Existing curriculum selections | **Auto-migrated** into one subject per module named `General`. |
| Internship years | **Excluded** from the programme denominator, reported separately. |

## Model

New file `src/data/moduleSubjects.ts`.

```ts
/** The four examined buckets a module subject carries marks in. */
export interface ExamMarks {
  writtenEndOfModule: number
  writtenEndOfYear: number
  practicalEndOfModule: number
  practicalEndOfYear: number
}

/** One examined discipline inside a module — Anatomy, Physiology, Pathology. */
export interface ModuleSubject {
  id: string
  name: string
  marks: ExamMarks
  /** The library content this subject covers. Moved off the module. */
  curriculum: CourseCurriculumSelection
}

/** Keyed `${universityId}:${year.id}:${courseId}`. */
export type ModuleSubjectStore = Record<string, ModuleSubject[]>

export const MODULE_SUBJECTS_STORAGE_KEY = 'synapse-module-subjects-v1'
```

A module subject owns **both** its marks and its content. That is the load-bearing
choice: the module's subject list is a single list serving two dialogs. Adding
`Histology` while allocating marks makes it immediately available to pick library
topics under, and vice versa. Marks always belong to a subject — a module has no
unattributed marks.

`CourseCurriculumSelection` and `COURSE_CURRICULA_STORAGE_KEY` are currently
exported from `CourseCurriculumDialog.tsx`. `moduleSubjects.ts` cannot import from
a component without inverting the data/component layering the rest of `src/data`
observes, so both move to `src/data/courseCurriculum.ts` and the dialog re-exports
them, leaving every existing import site working.

`ExamMarks` is a flat record of four named fields rather than a nested
written/practical tree. The four buckets are fixed by the faculty scheme and will
not grow; a flat record keeps every consumer (inputs, totals, the overview's
columns) a direct field read with no traversal.

### Derived figures

Nothing below is stored. All live in `moduleSubjects.ts` as pure functions.

| Figure | Definition |
|---|---|
| `subjectTotal(subject)` | sum of the four buckets |
| `moduleTotal(subjects)` | Σ `subjectTotal` |
| `termTotal(year, term)` | Σ `moduleTotal` over modules whose `term` matches |
| `yearTotal(year)` | Σ `moduleTotal` over every module in the year |
| `programmeTotal(university)` | Σ `yearTotal` over non-internship years |
| subject weight in module | `subjectTotal ÷ moduleTotal` |
| module weight in term / year / programme | `moduleTotal ÷` that denominator |
| bucket weight | bucket ÷ `subjectTotal`, and bucket ÷ `moduleTotal` |

Marks are integers; inputs reject non-integers and negatives. Percentages display
to one decimal place.

### Internship years

A year is an internship year when its `id` matches `/_INT\d+$/`, which is what
`universityYearId` mints for labels like `Internship Year 1`. Internship years are
excluded from `programmeTotal` and from every "% of programme" figure. They still
get their own year and term totals, and the overview reports them in a separate
section below the programme so their content is not hidden.

### Zero denominators

A module with no marks entered contributes zero. That is arithmetically correct
but it silently inflates every other module's share until the gap is filled, so:

- A total of zero renders as **"not set"**, never as `0%`. Percentages are only
  shown against a non-zero denominator.
- Any surface showing weights carries a gap banner naming the modules with no
  mark scheme, each linking to its dialog: *"4 modules have no mark scheme —
  weights below exclude them."*

This follows the honest-signals principle in `PRODUCT.md`: progress and readiness
reflect real state and are never presented as a calibrated measurement when they
are not one.

## Key migration

`curricula` and `schedules` are keyed `${uni.id}:${year.year}:${courseId}` — the
year **label**. Renaming a year therefore detaches every module's curriculum
selection and timetable, silently and irreversibly. `AcademicSetup.saveYearLabel`
offers that rename with no warning.

This spec adds a third store that would inherit the same defect, and the data it
holds is the mark scheme this feature exists to record. So the key moves to the
stable `year.id` for all three stores.

New file `src/data/curriculumKeys.ts`:

- `moduleKey(universityId, yearId, courseId): string` — the one place a key is built.
- `migrateModuleKeys(store, university)` — for each stored key whose middle
  segment matches a year *label* in this university, rewrite it to that year's
  `id`. Keys already using a year `id` are left alone, which makes the migration
  idempotent. A key whose middle segment matches neither is left untouched rather
  than dropped, so nothing is destroyed by a partially-recognised catalogue.

Migration runs once per store on Academic Setup mount and writes back only if
something changed.

`year.id` is itself derived from the university abbreviation
(`universityYearId(short, label)`), so changing a university's abbreviation
re-mints year IDs and would re-orphan the data. `saveIdentity` therefore keeps the
existing `year.id` values when only the abbreviation changes: IDs are stable
identifiers, not display strings, and nothing renders them as the abbreviation.

## Curriculum migration

On first read of a module's subjects, if `ModuleSubjectStore` has no entry for the
module but `curricula` does, a single subject is created:

```
{ id: <generated>, name: 'General', marks: {0,0,0,0}, curriculum: <the existing selection> }
```

Nothing is discarded and nothing needs re-ticking; the administrator splits
`General` into real subjects at their own pace. The module-level `curricula`
record is left in place, unread, so the migration can be re-run and so a rollback
loses nothing. `General` carries zero marks, so it appears in the gap banner
until marks are entered — which is the correct signal.

## Surfaces

### 1. Module row and the Edit module dialog

`src/pages/admin/AcademicSetup.tsx`, new `src/components/admin/ModuleEditDialog.tsx`.

The row becomes read-only display:

```
[CPS 104]  Clinical Pathology            Block 3 · Term 2   [Curriculum 12] [Marks & Exams] [Schedule 8]  [⋯]
```

All three inline edit modes (`editingModuleId`, `editingModule`, and their five
draft state variables) are deleted from `AcademicSetup` and replaced by one
dialog. Four editable fields — now including a term dropdown — cannot share a row
with three action buttons at any viewport width; that crowding is the cause of
the broken layout.

Dialog fields:

- **Module ID** — monospace. Uniqueness is checked against the university as the
  user types, showing an inline message rather than silently appending `-2` on
  save as `uniqueModuleId` does today. Save is disabled while the ID collides.
- **Name** — required; save disabled when empty.
- **Block** — free text, may be empty.
- **Year** — a `Select` of every year in the university. Changing it moves the
  module to that year.
- **Term** — a `Select` listing the terms of the *selected* year, re-populating
  when the year changes, plus a final `＋ New term…` option that reveals a name
  input. Choosing an existing term moves the module into it on save; naming a new
  one appends it to that year's `terms` and moves the module there. A new term
  name that duplicates an existing one selects the existing term rather than
  creating a second.

Escape cancels, Enter saves, and nothing is applied until save — so a cancelled
edit leaves no partial change, which the current tick-only ID form cannot promise.

The `⋯` menu holds Delete, which asks for confirmation naming the module and
stating what else is removed with it (its subjects, marks, curriculum, schedule).

### 1a. Moving a module, and managing terms

A module's term was fixed at creation and a module could not leave its year at
all. Both are now editable, and moving must carry everything attached to the
module with it — its subjects and marks, its curriculum selection, and its
schedule are all keyed by year.

`moveModule` in `src/data/curriculumKeys.ts` performs the whole move as one
operation over the catalogue and all three stores:

- remove the course from the source year's `courses`, append it to the target
  year's;
- set `course.term` to the target term, creating it on the target year if named;
- re-key `ModuleSubjectStore`, `curricula`, and `schedules` from
  `${uni}:${fromYearId}:${courseId}` to `${uni}:${toYearId}:${courseId}`.

Doing this in one function is the point: three separate re-keys invite a move
that half-lands and leaves a mark scheme orphaned under a year the module no
longer sits in. Module IDs are unique per university, not per year, so a move
never introduces a collision.

Terms are managed from the term header in Academic Setup:

- **Rename** — inline, in place. Renaming updates `year.terms` and every
  `course.term` in that year that matched the old name, in one write, so no
  module is stranded under a term name that no longer exists.
- **Delete** — an empty term is removed outright. A term holding modules asks
  which term to move them to first and performs the move; it is never possible to
  delete modules by deleting a term.

### 1b. University and year availability

`University` and `UniYear` each gain `active?: boolean`, absent meaning `true` so
every existing record stays live without migration.

`active` means *available to students*: a university or year that is switched off
is still fully editable in the admin console but is not offered to students, and —
the reason it is being added now — a voucher targeted at it will not redeem.

Toggles sit in the university header panel and in each year header, alongside the
existing controls. Switching off a university implies its years are unavailable
regardless of their own flag; `isYearLive(university, year)` is the single
predicate both facts are read through, so no caller can check one and forget the
other.

Nothing else in this spec reads `active`. Its consumer is the voucher work, which
is specified separately.

### 2. Marks & Exams dialog

New `src/components/admin/ModuleSubjectsDialog.tsx`, opened by a new button
between Curriculum and Schedule on the module row.

Header: module name and ID, module total marks, subject count.

Per subject, one block:

- Subject name, editable in place.
- A 2×2 grid of integer inputs: rows **Written** / **Practical**, columns
  **End of module** / **End of year**.
- Subject total and its share of the module total.
- Remove, which confirms when the subject has curriculum content attached and
  states how many items would be detached.

Below the list:

- **Add subject**, appending an empty subject with the name field focused.
- A stacked horizontal bar dividing the module by subject, labelled with each
  subject's share — this is the requirement that the weight of each subject
  "under the module" is visible and seen to change.
- A live strip: *this module is X% of Term 2 · Y% of Year 3 · Z% of the
  programme*, recomputed as marks are typed, so the consequence of a number is
  visible where it is entered.
- A four-way split of the module's own total across the exam buckets.

All figures recompute from the draft, not from saved state.

### 3. Curriculum dialog restructure

`src/components/admin/CourseCurriculumDialog.tsx`.

A left rail of the module's subjects replaces the module-level scope. Selecting a
subject scopes the existing five tabs (Topics, Questions, Practicals, Concepts,
Resources) to that subject's `curriculum`. The tab bodies, filters, search,
`buildCurriculumMembership` use and `LibraryTopicPicker` integration are unchanged
— only what they read from and write to moves down one level.

The rail also creates and renames subjects, so the flow reads in the order
requested: name the subjects first, then choose each one's library topics,
questions and practicals.

A read-only **Whole module** entry sits at the top of the rail showing the union
across subjects with per-subject attribution, so the previous module-level view of
"everything this module covers" is not lost.

Because a subject owns its content, choosing a library topic under `Anatomy` is
what connects that topic to the marks `Anatomy` carries. That link is the reason
the two dialogs share one subject list.

### 4. Marks & Weights overview

New `src/pages/admin/MarksWeights.tsx` at `/admin/academic/marks`.

Reached from the university header in Academic Setup and from the admin nav
beneath Academic Setup. University picker at the top, matching Academic Setup's.

An expandable table: **Year → Term → Module → Subject**, with columns

| Marks | % of module | % of term | % of year | % of programme |

Totals render at every level. Below the table, a programme-wide split across the
four exam buckets. Internship years appear in their own section, excluded from
the programme figures and labelled as such.

The page is read-only. Every module row links to that module's Marks & Exams
dialog, so a number has exactly one place it can be changed. The gap banner sits
above the table.

### 5. Nav relabel

`src/components/shell/nav.ts:95`: `Subjects & Topics` becomes
**`Systems & Topics`**, so "subject" denotes one thing on screen. This is a label
change only — no route, no ID, no data changes. The page's own headings are
updated to match.

## Testing

This repository has no component tests: all 40-odd test files are pure logic run
by `node --test --experimental-strip-types "src/**/*.test.ts"`. This work follows
that convention rather than introducing a component test runner.

`src/data/moduleSubjects.test.ts`

- `subjectTotal` sums the four buckets; an all-zero subject totals zero.
- `moduleTotal`, `termTotal`, `yearTotal` sum their children.
- `programmeTotal` excludes internship years and includes every other year.
- Weight functions return `null` (rendered "not set") for a zero denominator
  rather than `NaN` or `0`.
- A module with no subjects contributes zero and is reported by the gap detector.
- The gap detector names every module whose total is zero, and no others.
- Percentages of a module's subjects sum to 100 within one decimal place.

`src/data/curriculumKeys.test.ts`

- `moduleKey` composes the three segments.
- `migrateModuleKeys` rewrites label keys to ID keys for a known university.
- It is idempotent: running it on already-migrated data changes nothing.
- It leaves unrecognised keys untouched rather than dropping them.
- The module-curriculum → `General` subject migration carries every list across
  (topics, articles, questions, practicals, concepts, resources) and produces a
  subject with zero marks.
- That migration is idempotent: a module that already has subjects is not given a
  second `General`.
- `moveModule` between terms in one year sets `course.term` and leaves every key
  unchanged.
- `moveModule` between years moves the course between `courses` arrays and re-keys
  all three stores together; nothing remains under the old key.
- `moveModule` into a newly named term appends it to the target year's `terms`.
- Renaming a term rewrites `year.terms` and every matching `course.term`.
- Deleting a term with modules reassigns them to the named target; no course is
  lost.
- `isYearLive` is false when the university is inactive, when the year is
  inactive, and true when both are absent (the default) or true.

The three dialogs (Edit module, Marks & Exams, Curriculum) and the overview page
are verified in the browser against the dev server, including the term move, the
uniqueness message, cancel-leaves-no-change, and the live weight strip updating as
marks are typed.

## Files

New

- `src/data/moduleSubjects.ts`
- `src/data/moduleSubjects.test.ts`
- `src/data/courseCurriculum.ts` — `CourseCurriculumSelection` and its storage key,
  moved out of the component layer
- `src/data/curriculumKeys.ts`
- `src/data/curriculumKeys.test.ts`
- `src/components/admin/ModuleEditDialog.tsx`
- `src/components/admin/ModuleSubjectsDialog.tsx`
- `src/pages/admin/MarksWeights.tsx`

Modified

- `src/pages/admin/AcademicSetup.tsx` — row becomes read-only, three inline edit
  modes removed, Edit module and Marks & Exams wired up, key migration on mount,
  link to the overview, `saveIdentity` no longer re-mints year IDs.
- `src/components/admin/CourseCurriculumDialog.tsx` — subject rail, selections
  read and written per subject; the selection type and storage key move to
  `src/data/courseCurriculum.ts` and are re-exported from here.
- `src/components/admin/ModuleScheduleDialog.tsx` — key change only.
- `src/router.tsx` — `/admin/academic/marks`.
- `src/components/shell/nav.ts` — relabel, plus the overview entry.

## Out of scope

Named here so they are not silently assumed.

- **Any student-facing surface.** No student sees marks or weights from this work.
- **Explicit year or module weight overrides.** Weight is mark share, always.
- **Marks anywhere but a module subject.** A module has no unattributed marks.
- **Import or export of mark schemes.** Entry is manual through the dialog.
- **The voucher rules themselves** were specified as a separate piece and have
  since been built on top of the `active` flag this spec adds: a voucher can
  grant a full-access trial (three days by default) instead of a discount, and
  `voucherEligibility` now takes the catalogue and refuses a code while the
  student's university or year is switched off. `isYearLive` lives in
  `src/data/universities.ts`; `src/data/vouchers.test.ts` covers both rules.
- **The other sub-projects** identified during brainstorming: student onboarding
  and plans/pricing, resource storage limits and offline downloads, and an Android
  app. Each needs its own spec.
