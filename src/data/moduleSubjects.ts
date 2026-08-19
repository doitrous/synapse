import { EMPTY_CURRICULUM_SELECTION, type CourseCurriculumSelection } from './courseCurriculum.ts'
import type { CurriculumCourse, UniYear, University } from './universities.ts'

/**
 * What a module examines, and what each part of it is worth.
 *
 * A module used to be a name, a block and a term. Nothing recorded the
 * disciplines examined inside it or the marks they carry, so the console could
 * not answer the question an administrator actually asks when building a year:
 * how much does this module carry, and how is that split?
 *
 * A module subject owns both its marks and its library content. That is the
 * load-bearing choice: one list serves the Marks & Exams dialog and the
 * Curriculum dialog, so naming `Histology` while allocating marks immediately
 * makes it something library topics can be chosen under. Marks always belong to
 * a subject — a module has no unattributed marks.
 */

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

/** Keyed `${universityId}:${year.id}:${courseId}` — a stable id, never a label. */
export type ModuleSubjectStore = Record<string, ModuleSubject[]>

export const MODULE_SUBJECTS_STORAGE_KEY = 'synapse-module-subjects-v1'

/** The term a module sits in when it has never been told one. */
export const DEFAULT_TERM = 'Term 1'

/**
 * The four buckets in the order they are read and entered — written before
 * practical, end of module before end of year.
 *
 * Every surface that lays out mark inputs, totals a split, or names a column
 * walks this list, so the order and the labels are declared once and cannot
 * drift apart between the dialog and the report.
 */
export const EXAM_BUCKETS = [
  { key: 'writtenEndOfModule', exam: 'Written', when: 'End of module', label: 'Written · end of module' },
  { key: 'writtenEndOfYear', exam: 'Written', when: 'End of year', label: 'Written · end of year' },
  { key: 'practicalEndOfModule', exam: 'Practical', when: 'End of module', label: 'Practical · end of module' },
  { key: 'practicalEndOfYear', exam: 'Practical', when: 'End of year', label: 'Practical · end of year' },
] as const satisfies ReadonlyArray<{ key: keyof ExamMarks; exam: string; when: string; label: string }>

export const EXAM_KINDS = ['Written', 'Practical'] as const
export const EXAM_SITTINGS = ['End of module', 'End of year'] as const

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

/** Marks are whole and never negative; a blank field reads as none. */
export function normaliseMark(value: number | string): number {
  const parsed = typeof value === 'number' ? value : Number(value.trim())
  if (!Number.isFinite(parsed) || parsed <= 0) return 0
  return Math.floor(parsed)
}

export function subjectTotal(subject: ModuleSubject): number {
  return EXAM_BUCKETS.reduce((sum, bucket) => sum + (subject.marks[bucket.key] || 0), 0)
}

export function subjectsTotal(subjects: readonly ModuleSubject[]): number {
  return subjects.reduce((sum, subject) => sum + subjectTotal(subject), 0)
}

/** A module's marks are its subjects' marks. It carries none of its own. */
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
 * Null rather than zero is what lets every caller print "not set" instead of a
 * confident "0%" for a module whose mark scheme has not been entered yet. The
 * difference is between an honest gap and a wrong measurement, and this product
 * does not show the second.
 */
export function share(part: number, whole: number): number | null {
  if (!whole) return null
  return (part / whole) * 100
}

/** One decimal, or the honest blank. */
export function formatShare(value: number | null): string {
  return value === null ? 'not set' : `${value.toFixed(1)}%`
}

/** `universityYearId` mints `<CODE>_INT<n>` for internship years, and only for those. */
export function isInternshipYear(year: { id: string }): boolean {
  return /_INT\d+$/.test(year.id)
}

/** The one place a per-module storage key is built. */
export function moduleKey(universityId: string, yearId: string, courseId: string): string {
  return `${universityId}:${yearId}:${courseId}`
}

export function subjectsOf(store: ModuleSubjectStore, universityId: string, yearId: string, courseId: string): ModuleSubject[] {
  return store[moduleKey(universityId, yearId, courseId)] ?? []
}

function courseTotal(university: University, year: UniYear, course: CurriculumCourse, store: ModuleSubjectStore): number {
  return moduleTotal(subjectsOf(store, university.id, year.id, course.id))
}

export function courseMarks(university: University, year: UniYear, course: CurriculumCourse, store: ModuleSubjectStore): number {
  return courseTotal(university, year, course, store)
}

export function termCourses(year: UniYear, term: string): CurriculumCourse[] {
  return year.courses.filter((course) => (course.term || DEFAULT_TERM) === term)
}

export function termTotal(university: University, year: UniYear, term: string, store: ModuleSubjectStore): number {
  return termCourses(year, term).reduce((sum, course) => sum + courseTotal(university, year, course, store), 0)
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

/**
 * The modules carrying no marks at all.
 *
 * Their zero is arithmetically correct but it quietly inflates every other
 * module's share, so any surface reporting a weight names them rather than
 * letting the reader assume the picture is complete.
 */
export function modulesWithoutMarks(university: University, store: ModuleSubjectStore): MarkGap[] {
  const gaps: MarkGap[] = []
  university.years.forEach((year) => {
    year.courses.forEach((course) => {
      if (courseTotal(university, year, course, store) === 0) gaps.push({ year, course })
    })
  })
  return gaps
}

/** All terms in a year: the ones declared, plus any a module still names. */
export function termsOf(year: Pick<UniYear, 'terms' | 'courses'>): string[] {
  const set = new Set<string>(year.terms ?? [])
  year.courses.forEach((course) => set.add(course.term || DEFAULT_TERM))
  if (set.size === 0) set.add(DEFAULT_TERM)
  return [...set]
}
