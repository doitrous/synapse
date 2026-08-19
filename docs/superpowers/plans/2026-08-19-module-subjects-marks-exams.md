# Module Subjects, Marks & Exams Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Record what each module examines — its subjects, their allocated marks across four exam buckets — and report the resulting weights across term, year, and programme, while making modules genuinely manageable (rename, move between terms and years, manage terms).

**Architecture:** A new `ModuleSubject` entity owns both its marks and its library content, stored per module and keyed by stable year ID. Every percentage and total is a pure derived function — nothing is stored twice. Admin surfaces: a repaired module row with an Edit dialog, a Marks & Exams dialog, a subject-scoped Curriculum dialog, and a read-only Marks & Weights overview.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind v4, `react-router-dom`, `lucide-react`. Tests run with `node --test --experimental-strip-types "src/**/*.test.ts"` — pure logic only, no component tests (this repo has zero `.test.tsx`).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-19-module-subjects-marks-exams-design.md`. It governs; this plan implements it.
- Admin console only. No student-facing surface.
- Marks are the only typed numbers. No stored percentages, no stored totals.
- Marks are non-negative integers. Percentages display to one decimal place.
- A zero denominator renders "not set", never `0%`.
- Internship years (year id matching `/_INT\d+$/`) are excluded from programme totals.
- Storage keys use `year.id`, never `year.year`.
- The existing organ-system `Subject` and every `subjectId` are untouched.
- Existing tests must keep passing: `npm test`. Lint: `npm run lint`. Types: `npx tsc -b`.
- Commit after every task.

---

### Task 1: Move the curriculum selection type into the data layer

**Files:**
- Create: `src/data/courseCurriculum.ts`
- Modify: `src/components/admin/CourseCurriculumDialog.tsx`

**Interfaces:**
- Produces: `CourseCurriculumSelection`, `COURSE_CURRICULA_STORAGE_KEY`, `EMPTY_CURRICULUM_SELECTION` from `@/data/courseCurriculum`.

- [ ] **Step 1: Create the data module**

```ts
// src/data/courseCurriculum.ts
/** Where a module's chosen content lives, keyed `${universityId}:${yearId}:${courseId}`. */
export const COURSE_CURRICULA_STORAGE_KEY = 'synapse-course-curricula-v1'

export interface CourseCurriculumSelection {
  articleIds: string[]
  questionIds: string[]
  practicalIds: string[]
  topicNodeIds?: string[]
  conceptIds?: string[]
  resourceIds?: string[]
}

export const EMPTY_CURRICULUM_SELECTION: CourseCurriculumSelection = {
  articleIds: [], questionIds: [], practicalIds: [], topicNodeIds: [], conceptIds: [], resourceIds: [],
}

/** Total items chosen, across every list. */
export function curriculumCount(selection: CourseCurriculumSelection | undefined): number {
  if (!selection) return 0
  return (selection.topicNodeIds?.length ?? 0) + selection.articleIds.length + selection.questionIds.length
    + selection.practicalIds.length + (selection.conceptIds?.length ?? 0) + (selection.resourceIds?.length ?? 0)
}
```

- [ ] **Step 2: Re-export from the dialog so no import site breaks**

In `CourseCurriculumDialog.tsx`, delete the local `COURSE_CURRICULA_STORAGE_KEY`, `CourseCurriculumSelection` and `EMPTY` definitions and replace with:

```ts
import { COURSE_CURRICULA_STORAGE_KEY, EMPTY_CURRICULUM_SELECTION as EMPTY, type CourseCurriculumSelection } from '@/data/courseCurriculum'
export { COURSE_CURRICULA_STORAGE_KEY }
export type { CourseCurriculumSelection }
```

- [ ] **Step 3: Typecheck and commit**

Run: `npx tsc -b` — Expected: no errors.

```bash
git add -A && git commit -m "Keep the curriculum selection type in the data layer"
```

---

### Task 2: The module subject model and its derived figures

**Files:**
- Create: `src/data/moduleSubjects.ts`
- Test: `src/data/moduleSubjects.test.ts`

**Interfaces:**
- Consumes: `CourseCurriculumSelection` (Task 1), `University`, `UniYear`, `CurriculumCourse` from `@/data/universities`.
- Produces: `ExamMarks`, `ModuleSubject`, `ModuleSubjectStore`, `MODULE_SUBJECTS_STORAGE_KEY`, `EXAM_BUCKETS`, `emptyExamMarks()`, `newModuleSubject(name)`, `subjectTotal()`, `subjectsTotal()`, `moduleTotal()`, `termTotal()`, `yearTotal()`, `programmeTotal()`, `isInternshipYear()`, `share()`, `bucketTotals()`, `modulesWithoutMarks()`.

- [ ] **Step 1: Write the failing tests**

```ts
// src/data/moduleSubjects.test.ts
import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  EXAM_BUCKETS, bucketTotals, emptyExamMarks, isInternshipYear, modulesWithoutMarks,
  moduleTotal, newModuleSubject, programmeTotal, share, subjectTotal, termTotal, yearTotal,
} from './moduleSubjects.ts'
import type { ModuleSubject, ModuleSubjectStore } from './moduleSubjects.ts'
import type { University } from './universities.ts'

const subject = (name: string, w1: number, w2: number, p1: number, p2: number): ModuleSubject => ({
  ...newModuleSubject(name),
  marks: { writtenEndOfModule: w1, writtenEndOfYear: w2, practicalEndOfModule: p1, practicalEndOfYear: p2 },
})

test('subjectTotal sums the four buckets', () => {
  assert.equal(subjectTotal(subject('Anatomy', 30, 20, 15, 5)), 70)
  assert.equal(subjectTotal(subject('Empty', 0, 0, 0, 0)), 0)
})

test('EXAM_BUCKETS lists all four keys of ExamMarks', () => {
  assert.deepEqual(EXAM_BUCKETS.map((b) => b.key).sort(), Object.keys(emptyExamMarks()).sort())
})

test('moduleTotal sums its subjects', () => {
  assert.equal(moduleTotal([subject('A', 10, 0, 0, 0), subject('B', 5, 5, 0, 0)]), 20)
  assert.equal(moduleTotal([]), 0)
})

test('share returns null for a zero denominator, never NaN or zero', () => {
  assert.equal(share(0, 0), null)
  assert.equal(share(10, 0), null)
  assert.equal(share(25, 100), 25)
  assert.equal(share(1, 3)?.toFixed(1), '33.3')
})

test('isInternshipYear matches the ids universityYearId mints', () => {
  assert.equal(isInternshipYear({ id: 'KAU_INT1' }), true)
  assert.equal(isInternshipYear({ id: 'KAU_INT2' }), true)
  assert.equal(isInternshipYear({ id: 'KAU_Y1' }), false)
  assert.equal(isInternshipYear({ id: 'KAU_INTRO' }), false)
})

function fixture(): { uni: University; store: ModuleSubjectStore } {
  const uni: University = {
    id: 'u', name: 'U', short: 'U', region: 'R',
    years: [
      { id: 'U_Y1', year: 'Year 1', students: 0, terms: ['Term 1', 'Term 2'], courses: [
        { id: 'c1', name: 'M1', block: 'B1', term: 'Term 1' },
        { id: 'c2', name: 'M2', block: 'B2', term: 'Term 2' },
      ] },
      { id: 'U_Y2', year: 'Year 2', students: 0, terms: ['Term 1'], courses: [
        { id: 'c3', name: 'M3', block: 'B3', term: 'Term 1' },
      ] },
      { id: 'U_INT1', year: 'Internship Year 1', students: 0, terms: ['Term 1'], courses: [
        { id: 'c4', name: 'M4', block: 'B4', term: 'Term 1' },
      ] },
    ],
  }
  const store: ModuleSubjectStore = {
    'u:U_Y1:c1': [subject('Anatomy', 30, 20, 15, 5), subject('Physiology', 20, 10, 0, 0)],
    'u:U_Y1:c2': [subject('Pathology', 25, 25, 0, 0)],
    'u:U_Y2:c3': [subject('Medicine', 100, 0, 0, 0)],
    'u:U_INT1:c4': [subject('Rotation', 40, 0, 0, 0)],
  }
  return { uni, store }
}

test('termTotal sums only the modules in that term', () => {
  const { uni, store } = fixture()
  assert.equal(termTotal(uni, uni.years[0], 'Term 1', store), 100)
  assert.equal(termTotal(uni, uni.years[0], 'Term 2', store), 50)
})

test('yearTotal sums every module in the year', () => {
  const { uni, store } = fixture()
  assert.equal(yearTotal(uni, uni.years[0], store), 150)
})

test('programmeTotal excludes internship years', () => {
  const { uni, store } = fixture()
  assert.equal(programmeTotal(uni, store), 250)
})

test('a module with no subjects contributes zero and is reported as a gap', () => {
  const { uni, store } = fixture()
  delete store['u:U_Y1:c2']
  assert.equal(moduleTotal(store['u:U_Y1:c2'] ?? []), 0)
  assert.equal(yearTotal(uni, uni.years[0], store), 100)
  const gaps = modulesWithoutMarks(uni, store)
  assert.deepEqual(gaps.map((g) => g.course.id), ['c2'])
})

test('modulesWithoutMarks reports a module whose subjects all carry zero', () => {
  const { uni, store } = fixture()
  store['u:U_Y2:c3'] = [subject('Medicine', 0, 0, 0, 0)]
  assert.ok(modulesWithoutMarks(uni, store).some((g) => g.course.id === 'c3'))
})

test('subject shares of a module sum to 100', () => {
  const { store } = fixture()
  const subjects = store['u:U_Y1:c1']
  const total = moduleTotal(subjects)
  const sum = subjects.reduce((acc, s) => acc + (share(subjectTotal(s), total) ?? 0), 0)
  assert.equal(Number(sum.toFixed(1)), 100)
})

test('bucketTotals splits a set of subjects across the four buckets', () => {
  const { store } = fixture()
  assert.deepEqual(bucketTotals(store['u:U_Y1:c1']), {
    writtenEndOfModule: 50, writtenEndOfYear: 30, practicalEndOfModule: 15, practicalEndOfYear: 5,
  })
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test --experimental-strip-types src/data/moduleSubjects.test.ts`
Expected: FAIL — cannot find module `./moduleSubjects.ts`.

- [ ] **Step 3: Implement the model**

```ts
// src/data/moduleSubjects.ts
import type { CourseCurriculumSelection } from './courseCurriculum'
import { EMPTY_CURRICULUM_SELECTION } from './courseCurriculum'
import type { CurriculumCourse, UniYear, University } from './universities'

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
  curriculum: CourseCurriculumSelection
}

/** Keyed `${universityId}:${year.id}:${courseId}`. */
export type ModuleSubjectStore = Record<string, ModuleSubject[]>

export const MODULE_SUBJECTS_STORAGE_KEY = 'synapse-module-subjects-v1'

export const DEFAULT_TERM = 'Term 1'

/**
 * The four buckets, in the order they are read and entered: written before
 * practical, end-of-module before end-of-year. Every surface that lays out mark
 * inputs or reports a split walks this list, so the order is declared once.
 */
export const EXAM_BUCKETS = [
  { key: 'writtenEndOfModule', exam: 'Written', when: 'End of module', label: 'Written · end of module' },
  { key: 'writtenEndOfYear', exam: 'Written', when: 'End of year', label: 'Written · end of year' },
  { key: 'practicalEndOfModule', exam: 'Practical', when: 'End of module', label: 'Practical · end of module' },
  { key: 'practicalEndOfYear', exam: 'Practical', when: 'End of year', label: 'Practical · end of year' },
] as const satisfies ReadonlyArray<{ key: keyof ExamMarks; exam: string; when: string; label: string }>

export function emptyExamMarks(): ExamMarks {
  return { writtenEndOfModule: 0, writtenEndOfYear: 0, practicalEndOfModule: 0, practicalEndOfYear: 0 }
}

export function newModuleSubject(name = ''): ModuleSubject {
  return {
    id: `msub-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    marks: emptyExamMarks(),
    curriculum: structuredClone(EMPTY_CURRICULUM_SELECTION),
  }
}

export function subjectTotal(subject: ModuleSubject): number {
  return EXAM_BUCKETS.reduce((sum, bucket) => sum + (subject.marks[bucket.key] || 0), 0)
}

export function subjectsTotal(subjects: readonly ModuleSubject[]): number {
  return subjects.reduce((sum, subject) => sum + subjectTotal(subject), 0)
}

/** A module's marks are the sum of its subjects'; it holds none of its own. */
export const moduleTotal = subjectsTotal

export function bucketTotals(subjects: readonly ModuleSubject[]): ExamMarks {
  const totals = emptyExamMarks()
  subjects.forEach((subject) => {
    EXAM_BUCKETS.forEach((bucket) => { totals[bucket.key] += subject.marks[bucket.key] || 0 })
  })
  return totals
}

/**
 * A percentage, or null when there is nothing to divide by.
 *
 * Returning null rather than 0 is what lets every caller print "not set"
 * instead of a confident "0%" for a module whose mark scheme has not been
 * entered — the difference between an honest gap and a wrong measurement.
 */
export function share(part: number, whole: number): number | null {
  if (!whole) return null
  return (part / whole) * 100
}

/** `universityYearId` mints `<CODE>_INT<n>` for internship years, and only for those. */
export function isInternshipYear(year: { id: string }): boolean {
  return /_INT\d+$/.test(year.id)
}

export function moduleKeyOf(universityId: string, yearId: string, courseId: string): string {
  return `${universityId}:${yearId}:${courseId}`
}

export function subjectsOf(store: ModuleSubjectStore, universityId: string, yearId: string, courseId: string): ModuleSubject[] {
  return store[moduleKeyOf(universityId, yearId, courseId)] ?? []
}

function courseTotal(university: University, year: UniYear, course: CurriculumCourse, store: ModuleSubjectStore): number {
  return moduleTotal(subjectsOf(store, university.id, year.id, course.id))
}

export function termTotal(university: University, year: UniYear, term: string, store: ModuleSubjectStore): number {
  return year.courses
    .filter((course) => (course.term || DEFAULT_TERM) === term)
    .reduce((sum, course) => sum + courseTotal(university, year, course, store), 0)
}

export function yearTotal(university: University, year: UniYear, store: ModuleSubjectStore): number {
  return year.courses.reduce((sum, course) => sum + courseTotal(university, year, course, store), 0)
}

/** Every year except internship, which sits outside the degree. */
export function programmeYears(university: University): UniYear[] {
  return university.years.filter((year) => !isInternshipYear(year))
}

export function programmeTotal(university: University, store: ModuleSubjectStore): number {
  return programmeYears(university).reduce((sum, year) => sum + yearTotal(university, year, store), 0)
}

export interface MarkGap { year: UniYear; course: CurriculumCourse }

/** Modules carrying no marks at all — the ones silently inflating everyone else's share. */
export function modulesWithoutMarks(university: University, store: ModuleSubjectStore): MarkGap[] {
  const gaps: MarkGap[] = []
  university.years.forEach((year) => {
    year.courses.forEach((course) => {
      if (courseTotal(university, year, course, store) === 0) gaps.push({ year, course })
    })
  })
  return gaps
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test --experimental-strip-types src/data/moduleSubjects.test.ts`
Expected: PASS, all tests.

- [ ] **Step 5: Commit**

```bash
git add src/data/moduleSubjects.ts src/data/moduleSubjects.test.ts
git commit -m "Count what a module examines"
```

---

### Task 3: Stable keys, migration, moving modules, managing terms

**Files:**
- Create: `src/data/curriculumKeys.ts`
- Test: `src/data/curriculumKeys.test.ts`
- Modify: `src/data/universities.ts` (add `active` to `University` and `UniYear`)

**Interfaces:**
- Produces: `moduleKey()`, `migrateModuleKeys()`, `migrateModuleCurricula()`, `moveModule()`, `renameTerm()`, `deleteTerm()`, `isYearLive()`, `type KeyedStores`.

- [ ] **Step 1: Add the availability flags**

In `src/data/universities.ts`, add to `UniYear`:

```ts
  /** Available to students. Absent means true, so existing records stay live. */
  active?: boolean
```

and to `University`:

```ts
  /** Available to students. Absent means true. Off hides every year regardless of its own flag. */
  active?: boolean
```

- [ ] **Step 2: Write the failing tests**

```ts
// src/data/curriculumKeys.test.ts
import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  deleteTerm, isYearLive, migrateModuleCurricula, migrateModuleKeys, moduleKey, moveModule, renameTerm,
} from './curriculumKeys.ts'
import type { University } from './universities.ts'
import type { ModuleSubjectStore } from './moduleSubjects.ts'
import { moduleTotal, newModuleSubject } from './moduleSubjects.ts'
import type { CourseCurriculumSelection } from './courseCurriculum.ts'

function uni(): University {
  return {
    id: 'u', name: 'U', short: 'U', region: 'R',
    years: [
      { id: 'U_Y1', year: 'Year 1', students: 0, terms: ['Term 1', 'Term 2'], courses: [
        { id: 'c1', name: 'M1', block: 'B1', term: 'Term 1' },
        { id: 'c2', name: 'M2', block: 'B2', term: 'Term 2' },
      ] },
      { id: 'U_Y2', year: 'Year 2', students: 0, terms: ['Term 1'], courses: [] },
    ],
  }
}

test('moduleKey composes the three segments', () => {
  assert.equal(moduleKey('u', 'U_Y1', 'c1'), 'u:U_Y1:c1')
})

test('migrateModuleKeys rewrites year-label keys to year-id keys', () => {
  const store = { 'u:Year 1:c1': ['a'], 'u:Year 2:c9': ['b'] }
  assert.deepEqual(migrateModuleKeys(store, [uni()]), { 'u:U_Y1:c1': ['a'], 'u:U_Y2:c9': ['b'] })
})

test('migrateModuleKeys is idempotent', () => {
  const once = migrateModuleKeys({ 'u:Year 1:c1': ['a'] }, [uni()])
  assert.deepEqual(migrateModuleKeys(once, [uni()]), once)
})

test('migrateModuleKeys leaves an unrecognised key untouched rather than dropping it', () => {
  const store = { 'zz:Nowhere:c1': ['a'] }
  assert.deepEqual(migrateModuleKeys(store, [uni()]), store)
})

test('migrateModuleCurricula moves a module selection into one General subject', () => {
  const curricula: Record<string, CourseCurriculumSelection> = {
    'u:U_Y1:c1': { articleIds: ['a1'], questionIds: ['q1'], practicalIds: ['p1'], topicNodeIds: ['t1'], conceptIds: ['k1'], resourceIds: ['r1'] },
  }
  const migrated = migrateModuleCurricula({}, curricula)
  const subjects = migrated['u:U_Y1:c1']
  assert.equal(subjects.length, 1)
  assert.equal(subjects[0].name, 'General')
  assert.equal(moduleTotal(subjects), 0)
  assert.deepEqual(subjects[0].curriculum.articleIds, ['a1'])
  assert.deepEqual(subjects[0].curriculum.topicNodeIds, ['t1'])
  assert.deepEqual(subjects[0].curriculum.resourceIds, ['r1'])
})

test('migrateModuleCurricula does not give a module a second General', () => {
  const curricula: Record<string, CourseCurriculumSelection> = {
    'u:U_Y1:c1': { articleIds: ['a1'], questionIds: [], practicalIds: [] },
  }
  const store: ModuleSubjectStore = { 'u:U_Y1:c1': [newModuleSubject('Anatomy')] }
  assert.deepEqual(migrateModuleCurricula(store, curricula), store)
})

test('moveModule between terms in one year keeps every key', () => {
  const stores = { subjects: { 'u:U_Y1:c1': [newModuleSubject('A')] } as ModuleSubjectStore, curricula: {}, schedules: {} }
  const result = moveModule({ university: uni(), courseId: 'c1', fromYearId: 'U_Y1', toYearId: 'U_Y1', toTerm: 'Term 2' }, stores)
  const year1 = result.university.years[0]
  assert.equal(year1.courses.find((c) => c.id === 'c1')?.term, 'Term 2')
  assert.ok(result.stores.subjects['u:U_Y1:c1'])
})

test('moveModule between years moves the course and re-keys every store', () => {
  const stores = {
    subjects: { 'u:U_Y1:c1': [newModuleSubject('A')] } as ModuleSubjectStore,
    curricula: { 'u:U_Y1:c1': { articleIds: ['a1'], questionIds: [], practicalIds: [] } },
    schedules: { 'u:U_Y1:c1': [{ id: 'b1' }] },
  }
  const result = moveModule({ university: uni(), courseId: 'c1', fromYearId: 'U_Y1', toYearId: 'U_Y2', toTerm: 'Term 1' }, stores)
  assert.equal(result.university.years[0].courses.some((c) => c.id === 'c1'), false)
  assert.equal(result.university.years[1].courses.some((c) => c.id === 'c1'), true)
  assert.equal(result.stores.subjects['u:U_Y1:c1'], undefined)
  assert.ok(result.stores.subjects['u:U_Y2:c1'])
  assert.ok(result.stores.curricula['u:U_Y2:c1'])
  assert.ok(result.stores.schedules['u:U_Y2:c1'])
})

test('moveModule into a newly named term appends it to the target year', () => {
  const stores = { subjects: {} as ModuleSubjectStore, curricula: {}, schedules: {} }
  const result = moveModule({ university: uni(), courseId: 'c1', fromYearId: 'U_Y1', toYearId: 'U_Y2', toTerm: 'Term 3' }, stores)
  assert.deepEqual(result.university.years[1].terms, ['Term 1', 'Term 3'])
})

test('renameTerm rewrites the term list and every course on it', () => {
  const result = renameTerm(uni(), 'U_Y1', 'Term 2', 'Spring')
  assert.deepEqual(result.years[0].terms, ['Term 1', 'Spring'])
  assert.equal(result.years[0].courses.find((c) => c.id === 'c2')?.term, 'Spring')
  assert.equal(result.years[0].courses.find((c) => c.id === 'c1')?.term, 'Term 1')
})

test('deleteTerm reassigns its modules rather than losing them', () => {
  const result = deleteTerm(uni(), 'U_Y1', 'Term 2', 'Term 1')
  assert.deepEqual(result.years[0].terms, ['Term 1'])
  assert.equal(result.years[0].courses.length, 2)
  assert.equal(result.years[0].courses.find((c) => c.id === 'c2')?.term, 'Term 1')
})

test('isYearLive is false when either the university or the year is switched off', () => {
  const u = uni()
  assert.equal(isYearLive(u, u.years[0]), true)
  assert.equal(isYearLive({ ...u, active: false }, u.years[0]), false)
  assert.equal(isYearLive(u, { ...u.years[0], active: false }), false)
  assert.equal(isYearLive({ ...u, active: true }, { ...u.years[0], active: true }), true)
})
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `node --test --experimental-strip-types src/data/curriculumKeys.test.ts`
Expected: FAIL — cannot find module `./curriculumKeys.ts`.

- [ ] **Step 4: Implement**

```ts
// src/data/curriculumKeys.ts
import type { CourseCurriculumSelection } from './courseCurriculum'
import { EMPTY_CURRICULUM_SELECTION } from './courseCurriculum'
import { DEFAULT_TERM, newModuleSubject, type ModuleSubject, type ModuleSubjectStore } from './moduleSubjects'
import type { UniYear, University } from './universities'

/** The one place a per-module storage key is built. */
export function moduleKey(universityId: string, yearId: string, courseId: string): string {
  return `${universityId}:${yearId}:${courseId}`
}

/**
 * Rewrite keys that name a year by its label to keys that name it by its id.
 *
 * Curricula and schedules were keyed `${uni}:${year.year}:${courseId}` — the
 * label — so renaming a year detached every module's content and timetable,
 * silently. A key already naming a year id is left alone, which makes this safe
 * to run on every mount, and a key matching neither is kept rather than dropped:
 * a half-loaded catalogue must not be able to delete data.
 */
export function migrateModuleKeys<T>(store: Record<string, T>, universities: University[]): Record<string, T> {
  const byLabel = new Map<string, string>()
  const knownIds = new Set<string>()
  universities.forEach((university) => {
    university.years.forEach((year) => {
      byLabel.set(`${university.id}:${year.year}`, year.id)
      knownIds.add(`${university.id}:${year.id}`)
    })
  })

  let changed = false
  const next: Record<string, T> = {}
  Object.entries(store).forEach(([key, value]) => {
    const first = key.indexOf(':')
    const last = key.lastIndexOf(':')
    if (first <= 0 || last <= first) { next[key] = value; return }
    const prefix = key.slice(0, last)
    if (knownIds.has(prefix)) { next[key] = value; return }
    const yearId = byLabel.get(prefix)
    if (!yearId) { next[key] = value; return }
    next[`${key.slice(0, first)}:${yearId}:${key.slice(last + 1)}`] = value
    changed = true
  })
  return changed ? next : store
}

/**
 * Carry a module-level curriculum selection into a subject named `General`.
 *
 * Content was chosen per module and is now chosen per subject. Rather than ask
 * for it to be re-ticked, everything already picked becomes one subject the
 * administrator can rename and split at their own pace. It carries no marks, so
 * it shows up in the gap banner until a mark scheme is entered — which is the
 * correct signal, not a defect.
 */
export function migrateModuleCurricula(
  store: ModuleSubjectStore,
  curricula: Record<string, CourseCurriculumSelection>,
): ModuleSubjectStore {
  let changed = false
  const next: ModuleSubjectStore = { ...store }
  Object.entries(curricula).forEach(([key, selection]) => {
    if (next[key]?.length) return
    const subject: ModuleSubject = {
      ...newModuleSubject('General'),
      curriculum: { ...structuredClone(EMPTY_CURRICULUM_SELECTION), ...structuredClone(selection) },
    }
    next[key] = [subject]
    changed = true
  })
  return changed ? next : store
}

/** The three per-module stores, moved together or not at all. */
export interface KeyedStores {
  subjects: ModuleSubjectStore
  curricula: Record<string, CourseCurriculumSelection>
  schedules: Record<string, unknown>
}

export interface MoveModuleRequest {
  university: University
  courseId: string
  fromYearId: string
  toYearId: string
  toTerm: string
}

/**
 * Move a module to another term, another year, or both.
 *
 * The catalogue and all three stores move in one operation. Re-keying them
 * separately invites a move that half-lands — a mark scheme left under a year
 * the module no longer sits in, reachable by nothing.
 */
export function moveModule(
  { university, courseId, fromYearId, toYearId, toTerm }: MoveModuleRequest,
  stores: KeyedStores,
): { university: University; stores: KeyedStores } {
  const from = university.years.find((year) => year.id === fromYearId)
  const course = from?.courses.find((candidate) => candidate.id === courseId)
  if (!from || !course) return { university, stores }

  const term = toTerm.trim() || DEFAULT_TERM
  const moved = { ...course, term }

  const years = university.years.map((year) => {
    if (year.id === fromYearId && fromYearId === toYearId) {
      const terms = year.terms?.includes(term) ? year.terms : [...(year.terms ?? []), term]
      return { ...year, terms, courses: year.courses.map((c) => (c.id === courseId ? moved : c)) }
    }
    if (year.id === fromYearId) return { ...year, courses: year.courses.filter((c) => c.id !== courseId) }
    if (year.id === toYearId) {
      const terms = year.terms?.includes(term) ? year.terms : [...(year.terms ?? []), term]
      return { ...year, terms, courses: [...year.courses, moved] }
    }
    return year
  })

  if (fromYearId === toYearId) return { university: { ...university, years }, stores }

  const rekey = <T,>(store: Record<string, T>): Record<string, T> => {
    const oldKey = moduleKey(university.id, fromYearId, courseId)
    if (!(oldKey in store)) return store
    const next = { ...store }
    next[moduleKey(university.id, toYearId, courseId)] = next[oldKey]
    delete next[oldKey]
    return next
  }

  return {
    university: { ...university, years },
    stores: { subjects: rekey(stores.subjects), curricula: rekey(stores.curricula), schedules: rekey(stores.schedules) },
  }
}

function patchYear(university: University, yearId: string, fn: (year: UniYear) => UniYear): University {
  return { ...university, years: university.years.map((year) => (year.id === yearId ? fn(year) : year)) }
}

/** Rename a term and every course sitting on it, so nothing is stranded. */
export function renameTerm(university: University, yearId: string, from: string, to: string): University {
  const next = to.trim()
  if (!next || next === from) return university
  return patchYear(university, yearId, (year) => ({
    ...year,
    terms: (year.terms ?? []).map((term) => (term === from ? next : term)),
    courses: year.courses.map((course) => ((course.term || DEFAULT_TERM) === from ? { ...course, term: next } : course)),
  }))
}

/**
 * Remove a term, moving anything on it to `reassignTo`.
 *
 * Deleting a term must never be a way to delete modules, so the caller supplies
 * the term its modules land on and the move happens here rather than being left
 * to a second call that might not come.
 */
export function deleteTerm(university: University, yearId: string, term: string, reassignTo: string): University {
  return patchYear(university, yearId, (year) => ({
    ...year,
    terms: (year.terms ?? []).filter((candidate) => candidate !== term),
    courses: year.courses.map((course) => ((course.term || DEFAULT_TERM) === term ? { ...course, term: reassignTo } : course)),
  }))
}

/**
 * Whether students may be offered this year.
 *
 * Both facts are read through one predicate so no caller can check the year and
 * forget the university it belongs to. Absent means live, so nothing that
 * predates the flag is switched off by adding it.
 */
export function isYearLive(university: Pick<University, 'active'>, year: Pick<UniYear, 'active'>): boolean {
  return university.active !== false && year.active !== false
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `node --test --experimental-strip-types src/data/curriculumKeys.test.ts`
Expected: PASS, all tests.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "Move a module without losing what belongs to it"
```

---

### Task 4: The Edit module dialog

**Files:**
- Create: `src/components/admin/ModuleEditDialog.tsx`

**Interfaces:**
- Consumes: `moveModule`, `renameTerm` from `@/data/curriculumKeys`; `University`, `CurriculumCourse` from `@/data/universities`.
- Produces: `<ModuleEditDialog university course yearId onClose onSave />` where `onSave(draft: ModuleEditDraft)` and `ModuleEditDraft = { moduleId: string; name: string; block: string; yearId: string; term: string }`.

- [ ] **Step 1: Build the dialog**

Follow the existing dialog shape in `src/components/admin/ModuleScheduleDialog.tsx` for the overlay, header, and footer, and use `Field`, `TextInput`, `Select`, `Button`, `Icon` from `@/components/ui`. Requirements:

- Fields: Module ID (mono), Name, Block, Year (`Select` of `university.years`), Term (`Select` of the selected year's terms plus a final `__new__` option labelled `＋ New term…` which reveals a `TextInput`).
- Module ID uniqueness is checked live against every other module in the university; on collision show an inline message and disable Save.
- Name is required; Save disabled when empty.
- Escape closes without saving. Enter in any field submits.
- Nothing is applied until Save — the dialog owns a draft and calls `onSave` once.

- [ ] **Step 2: Verify types and commit**

Run: `npx tsc -b` — Expected: no errors.

```bash
git add -A && git commit -m "Give a module one place to be edited"
```

---

### Task 5: Repair the module row and wire Academic Setup

**Files:**
- Modify: `src/pages/admin/AcademicSetup.tsx`

- [ ] **Step 1: Replace the inline edit modes**

Delete `editingModuleId`, `moduleIdDraft`, `editingModule`, `moduleNameDraft`, `moduleBlockDraft`, `saveModuleId`, `saveModuleDetails`. The row renders read-only: `SystemMark` chip, name + `block · term`, then `[Curriculum]` `[Marks & Exams]` `[Schedule]`, then an edit (pencil) button opening `ModuleEditDialog` and a delete button.

- [ ] **Step 2: Wire the dialog's save through `moveModule`**

`onSave` applies name/block/moduleId in place, then calls `moveModule` when `yearId` or `term` changed, writing back the catalogue and all three stores together.

- [ ] **Step 3: Term header gains rename and delete**

Inline rename in the term header calls `renameTerm`. Delete calls `deleteTerm`, and when the term holds modules it first asks which term they move to (a `Select` of the year's other terms). A year's last term cannot be deleted.

- [ ] **Step 4: Active toggles**

Add an on/off control to the university header panel and to each year header, writing `active` on the record. Show inactive records with a muted "Not live" badge.

- [ ] **Step 5: Run the key migration on mount**

In an effect, run `migrateModuleKeys` over `curricula`, `schedules` and `subjects`, then `migrateModuleCurricula`, writing back only when the returned reference differs. Also stop `saveIdentity` re-minting year IDs: keep each existing `year.id`.

- [ ] **Step 6: Verify and commit**

Run: `npx tsc -b && npm run lint && npm test` — Expected: all pass.

```bash
git add -A && git commit -m "Make the module row readable, and the module movable"
```

---

### Task 6: The Marks & Exams dialog

**Files:**
- Create: `src/components/admin/ModuleSubjectsDialog.tsx`
- Modify: `src/pages/admin/AcademicSetup.tsx` (open it from the new button)

- [ ] **Step 1: Build the dialog**

Props: `{ university, year, course, store, onClose, onChange(subjects: ModuleSubject[]) }`.

Per subject: name input; a 2×2 grid of integer inputs laid out from `EXAM_BUCKETS` (rows Written/Practical, columns End of module/End of year); subject total; `share(subjectTotal, moduleTotal)` rendered to one decimal, or "not set"; a remove button that confirms when `curriculumCount(subject.curriculum) > 0`, naming how many items detach.

Footer: **Add subject**; a stacked bar dividing the module by subject; a live strip reading `X% of <term> · Y% of <year> · Z% of the programme` computed with `termTotal`, `yearTotal`, `programmeTotal` against the draft; and the module's own four-bucket split from `bucketTotals`.

Mark inputs accept non-negative integers only; a blank field reads as 0.

- [ ] **Step 2: Verify and commit**

Run: `npx tsc -b && npm run lint` — Expected: no errors.

```bash
git add -A && git commit -m "Say what each part of a module is worth"
```

---

### Task 7: Scope the Curriculum dialog to subjects

**Files:**
- Modify: `src/components/admin/CourseCurriculumDialog.tsx`

- [ ] **Step 1: Add the subject rail**

A left rail lists the module's subjects and creates/renames them. Selecting one scopes the existing five tabs to that subject's `curriculum`; every read of `draft` and every write becomes a read/write of `subjects[selectedIndex].curriculum`. Tab bodies, filters, search, `buildCurriculumMembership` and `LibraryTopicPicker` are unchanged.

A read-only **Whole module** entry at the top shows the union across subjects with per-subject attribution.

`onSave` now emits `ModuleSubject[]`.

- [ ] **Step 2: Verify and commit**

Run: `npx tsc -b && npm run lint && npm test` — Expected: all pass.

```bash
git add -A && git commit -m "Choose the library topics one subject at a time"
```

---

### Task 8: The Marks & Weights overview

**Files:**
- Create: `src/pages/admin/MarksWeights.tsx`
- Modify: `src/router.tsx`, `src/components/shell/nav.ts`, `src/pages/admin/AcademicSetup.tsx`

- [ ] **Step 1: Build the page**

University picker, gap banner from `modulesWithoutMarks`, then an expandable Year → Term → Module → Subject table with columns Marks, % of module, % of term, % of year, % of programme. Totals at every level. A programme-wide `bucketTotals` panel. Internship years in a separate section, labelled as excluded. Every module row links to Academic Setup with that module's dialog open.

- [ ] **Step 2: Route and nav**

`{ path: 'academic/marks', element: render(MarksWeights) }` in the admin children, and a `Marks & Weights` entry after `Academic Setup` in `nav.ts`. Relabel `Subjects & Topics` to `Systems & Topics`.

- [ ] **Step 3: Verify and commit**

Run: `npx tsc -b && npm run lint && npm test` — Expected: all pass.

```bash
git add -A && git commit -m "Show what every module is worth, against its term, its year, and the degree"
```

---

### Task 9: Verify in the browser

- [ ] **Step 1:** Start the dev server via `preview_start` and open Academic Setup.
- [ ] **Step 2:** Add a university, a year, two terms, two modules.
- [ ] **Step 3:** Edit a module — change its ID, name, block; confirm a duplicate ID is refused; move it to the other term, then to another year; confirm Cancel leaves nothing changed.
- [ ] **Step 4:** Open Marks & Exams, add two subjects, enter marks, confirm totals, the stacked bar, and the live term/year/programme strip.
- [ ] **Step 5:** Open Curriculum, confirm the subject rail, pick a library topic under one subject, confirm it is scoped to that subject.
- [ ] **Step 6:** Rename a term and confirm its modules follow; delete a term and confirm its modules are reassigned, not lost.
- [ ] **Step 7:** Open Marks & Weights and confirm every percentage, the gap banner, and internship exclusion.
- [ ] **Step 8:** Check `read_console_messages` for errors. Commit any fixes.
