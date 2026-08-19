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

/**
 * One examined discipline inside a module — Anatomy, Physiology, Pathology —
 * and, beneath it, however the faculty divides it.
 *
 * A subject may hold subjects: `Anatomy` splits into `Basis of Anatomy`, which
 * may split again, as deep as the curriculum goes. Only a module's *direct*
 * subjects carry marks; everything deeper exists so that library topics and
 * questions can be chosen at the level they belong to rather than piled at the
 * top of a discipline that covers a year.
 */
export interface ModuleSubject {
  id: string
  name: string
  /** Meaningful only on a module's direct subjects. Deeper ones carry none. */
  marks: ExamMarks
  curriculum: CourseCurriculumSelection
  /** Subjects beneath this one. Absent and empty mean the same thing. */
  children?: ModuleSubject[]
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

/**
 * A module's share of the degree, or null when it has none.
 *
 * Internship years sit outside the programme and are excluded from its total,
 * so a module in one has no share of the degree — not a small one. Both the
 * Marks & Exams dialog and the Marks & Weights report used to divide by the
 * programme total themselves, and that duplication is exactly how they came to
 * disagree: the report excluded an internship module while the dialog told the
 * reader it was worth 40% of the degree.
 */
export function programmeShareOf(
  university: University,
  year: Pick<UniYear, 'id'>,
  marks: number,
  store: ModuleSubjectStore,
): number | null {
  if (isInternshipYear(year)) return null
  return share(marks, programmeTotal(university, store))
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

/**
 * Everything a module covers, gathered from its subjects.
 *
 * Content is chosen per subject now, but the schedule still asks "what does
 * this module cover?" — and so does the read-only whole-module view. Merging on
 * read keeps one source of truth: no union is stored, so it cannot fall behind
 * the subjects it came from.
 */
export function mergeCurricula(subjects: readonly ModuleSubject[]): CourseCurriculumSelection {
  const merged = structuredClone(EMPTY_CURRICULUM_SELECTION)
  const keys = ['articleIds', 'questionIds', 'practicalIds', 'topicNodeIds', 'conceptIds', 'resourceIds'] as const
  // The whole tree, not just the list handed in: content chosen three levels
  // down is still content the module covers, and the schedule asks the module.
  walkSubjects(subjects).forEach((subject) => {
    keys.forEach((key) => {
      merged[key] = [...new Set([...(merged[key] ?? []), ...(subject.curriculum[key] ?? [])])]
    })
  })
  return merged
}

/* ---- The subject tree ---------------------------------------------------- */

/**
 * Every subject in the tree, parents before their children.
 *
 * The one traversal. Counting, merging, searching and validating all read it,
 * so a subject cannot be visible to one of them and invisible to another.
 */
export function walkSubjects(subjects: readonly ModuleSubject[]): ModuleSubject[] {
  const out: ModuleSubject[] = []
  const visit = (list: readonly ModuleSubject[]) => list.forEach((subject) => {
    out.push(subject)
    visit(subject.children ?? [])
  })
  visit(subjects)
  return out
}

export function findSubject(subjects: readonly ModuleSubject[], id: string): ModuleSubject | undefined {
  return walkSubjects(subjects).find((subject) => subject.id === id)
}

/** How many subjects sit beneath this one, at any depth. */
export function descendantCount(subject: ModuleSubject): number {
  return walkSubjects(subject.children ?? []).length
}

/**
 * Replace one subject wherever it sits, leaving the rest of the tree alone.
 *
 * Every edit goes through here, so no caller has to know how deep the subject
 * it is changing happens to be.
 */
export function updateSubject(
  subjects: readonly ModuleSubject[],
  id: string,
  patch: (subject: ModuleSubject) => ModuleSubject,
): ModuleSubject[] {
  return subjects.map((subject) => {
    if (subject.id === id) return patch(subject)
    if (!subject.children?.length) return subject
    return { ...subject, children: updateSubject(subject.children, id, patch) }
  })
}

/** Remove a subject and everything under it. */
export function removeSubject(subjects: readonly ModuleSubject[], id: string): ModuleSubject[] {
  return subjects
    .filter((subject) => subject.id !== id)
    .map((subject) => (subject.children?.length ? { ...subject, children: removeSubject(subject.children, id) } : subject))
}

/**
 * Add a subject beneath `parentId`, or at the top of the module when null.
 *
 * Always a new, empty subject — nothing existing is ever re-parented here.
 * Marks live only on a module's direct subjects, so moving a marked subject
 * under another would quietly drop its marks out of every total.
 */
export function addSubject(
  subjects: readonly ModuleSubject[],
  parentId: string | null,
  child: ModuleSubject,
): ModuleSubject[] {
  if (!parentId) return [...subjects, child]
  return updateSubject(subjects, parentId, (parent) => ({
    ...parent,
    children: [...(parent.children ?? []), child],
  }))
}

/** The subjects from the top of the module down to this one, inclusive. */
export function subjectPath(subjects: readonly ModuleSubject[], id: string): ModuleSubject[] {
  const search = (list: readonly ModuleSubject[], trail: ModuleSubject[]): ModuleSubject[] | null => {
    for (const subject of list) {
      const here = [...trail, subject]
      if (subject.id === id) return here
      const deeper = search(subject.children ?? [], here)
      if (deeper) return deeper
    }
    return null
  }
  return search(subjects, []) ?? []
}

/**
 * Everything a subject covers, including everything beneath it.
 *
 * A parent that has been split usually carries nothing of its own, but this is
 * still the honest answer to "what does Anatomy cover?" — read downwards rather
 * than asking the author to repeat themselves at the top.
 */
export function curriculumOfTree(subject: ModuleSubject): CourseCurriculumSelection {
  return mergeCurricula([subject])
}

/* ---- Rearranging the tree ------------------------------------------------ */

/**
 * Where a subject is being put down.
 *
 * `before` and `after` place it among the target's siblings; `inside` makes it
 * the target's last child, and a null target means the top of the module. The
 * three together are everything a drag onto a row can mean, so the rail decides
 * which one the pointer is asking for and every mover below speaks only this.
 */
export type SubjectDrop =
  | { kind: 'inside'; targetId: string | null }
  | { kind: 'before'; targetId: string }
  | { kind: 'after'; targetId: string }

/** The subject one level up, or null when this one sits at the top. */
export function parentOf(subjects: readonly ModuleSubject[], id: string): ModuleSubject | null {
  const path = subjectPath(subjects, id)
  return path.length > 1 ? path[path.length - 2] : null
}

/** The list this subject is ordered within — its parent's children, or the top. */
export function siblingsOf(subjects: readonly ModuleSubject[], id: string): ModuleSubject[] {
  const parent = parentOf(subjects, id)
  return parent ? (parent.children ?? []) : [...subjects]
}

/** True when `id` sits anywhere beneath `ancestorId`, at any depth. */
export function isDescendantOf(subjects: readonly ModuleSubject[], ancestorId: string, id: string): boolean {
  const ancestor = findSubject(subjects, ancestorId)
  if (!ancestor) return false
  return walkSubjects(ancestor.children ?? []).some((subject) => subject.id === id)
}

/**
 * Whether a move is one the tree can survive.
 *
 * The only truly impossible move is a branch into its own descendant, which
 * would cut that branch off from the module entirely. Refusing it here rather
 * than at each call site is what lets the rail light up a drop target only when
 * releasing there would actually work.
 */
export function canMoveSubject(subjects: readonly ModuleSubject[], id: string, drop: SubjectDrop): boolean {
  if (!findSubject(subjects, id)) return false
  if (drop.targetId === null) return true
  if (drop.targetId === id) return false
  if (!findSubject(subjects, drop.targetId)) return false
  return !isDescendantOf(subjects, id, drop.targetId)
}

/** Slide a subject in beside the target, wherever in the tree the target sits. */
function insertBeside(
  list: readonly ModuleSubject[],
  targetId: string,
  node: ModuleSubject,
  offset: 0 | 1,
): ModuleSubject[] | null {
  const index = list.findIndex((subject) => subject.id === targetId)
  if (index >= 0) {
    const next = [...list]
    next.splice(index + offset, 0, node)
    return next
  }
  for (let i = 0; i < list.length; i += 1) {
    const children = list[i].children
    if (!children?.length) continue
    const placed = insertBeside(children, targetId, node, offset)
    if (!placed) continue
    const next = [...list]
    next[i] = { ...list[i], children: placed }
    return next
  }
  return null
}

/**
 * Move a subject — with everything beneath it — somewhere else in the tree.
 *
 * `addSubject` deliberately never re-parents, because a new branch is always a
 * new one. Rearranging an existing list is the other job, and the difference
 * that matters is marks: only a module's direct subjects carry them, so a move
 * can change what the module is worth. `marksLostByMove` is how a caller finds
 * that out before asking for it; this function performs what it is told.
 *
 * A move that cannot be made leaves the tree exactly as it was.
 */
export function moveSubject(subjects: readonly ModuleSubject[], id: string, drop: SubjectDrop): ModuleSubject[] {
  if (!canMoveSubject(subjects, id, drop)) return [...subjects]
  const taken = findSubject(subjects, id)!
  const without = removeSubject(subjects, id)
  if (drop.kind === 'inside') {
    if (!drop.targetId) return [...without, taken]
    return updateSubject(without, drop.targetId, (parent) => ({
      ...parent,
      children: [...(parent.children ?? []), taken],
    }))
  }
  return insertBeside(without, drop.targetId, taken, drop.kind === 'before' ? 0 : 1) ?? [...subjects]
}

/** One step up or down among its own siblings. The ends of a list hold. */
export function nudgeSubject(subjects: readonly ModuleSubject[], id: string, direction: -1 | 1): ModuleSubject[] {
  const siblings = siblingsOf(subjects, id)
  const index = siblings.findIndex((subject) => subject.id === id)
  const neighbour = index + direction
  if (index < 0 || neighbour < 0 || neighbour >= siblings.length) return [...subjects]
  return moveSubject(subjects, id, { kind: direction < 0 ? 'before' : 'after', targetId: siblings[neighbour].id })
}

/** Tuck a subject under the sibling above it. The first of a list has none. */
export function indentSubject(subjects: readonly ModuleSubject[], id: string): ModuleSubject[] {
  const siblings = siblingsOf(subjects, id)
  const index = siblings.findIndex((subject) => subject.id === id)
  if (index <= 0) return [...subjects]
  return moveSubject(subjects, id, { kind: 'inside', targetId: siblings[index - 1].id })
}

/** Lift a subject out to sit just after its parent. A top subject has nowhere. */
export function outdentSubject(subjects: readonly ModuleSubject[], id: string): ModuleSubject[] {
  const parent = parentOf(subjects, id)
  if (!parent) return [...subjects]
  return moveSubject(subjects, id, { kind: 'after', targetId: parent.id })
}

/** Whether the subject would land as a direct subject of the module. */
function landsAtTop(subjects: readonly ModuleSubject[], drop: SubjectDrop): boolean {
  if (drop.kind === 'inside') return drop.targetId === null
  return subjects.some((subject) => subject.id === drop.targetId)
}

/**
 * The marks a move would stop counting towards the module.
 *
 * Only a module's direct subjects carry marks, so tucking a marked one under
 * another costs the module exactly that much — silently, because the number
 * stays written on the subject and simply stops being added up. An
 * administrator dragging `Anatomy` to tidy a list is not offering to make the
 * module worth 30 instead of 100, so the rail asks first, and this is the
 * figure it asks with. Promoting or reordering costs nothing and returns zero.
 */
export function marksLostByMove(subjects: readonly ModuleSubject[], id: string, drop: SubjectDrop): number {
  if (!canMoveSubject(subjects, id, drop)) return 0
  if (landsAtTop(subjects, drop)) return 0
  const direct = subjects.find((subject) => subject.id === id)
  return direct ? subjectTotal(direct) : 0
}
