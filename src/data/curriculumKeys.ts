import { EMPTY_CURRICULUM_SELECTION, type CourseCurriculumSelection } from './courseCurriculum.ts'
import { DEFAULT_TERM, moduleKey, newModuleSubject, type ModuleSubject, type ModuleSubjectStore } from './moduleSubjects.ts'
import { isYearLive } from './universities.ts'
import type { UniYear, University } from './universities.ts'

export { isYearLive }

/**
 * Where a module's documents live, and how a module moves without losing them.
 *
 * Curricula and schedules were keyed `${uni}:${year.year}:${courseId}` — the
 * year's *label*. Renaming a year therefore detached every module's content and
 * timetable, silently and with no way back, from a rename button that gave no
 * warning. Marks would have inherited the same defect, so the key moved to the
 * year's stable id and the old ones are rewritten on sight.
 */

export { moduleKey }

/**
 * Rewrite keys that name a year by its label into keys that name it by its id.
 *
 * A key already naming a year id is left alone, which makes this safe to run on
 * every mount. A key matching neither is kept rather than dropped: a catalogue
 * that has not finished loading must not be able to delete anything.
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
    const prefix = key.slice(0, last)
    if (first <= 0 || last <= first || knownIds.has(prefix)) { next[key] = value; return }
    const yearId = byLabel.get(prefix)
    if (!yearId) { next[key] = value; return }
    next[moduleKey(key.slice(0, first), yearId, key.slice(last + 1))] = value
    changed = true
  })
  return changed ? next : store
}

/**
 * Carry a module-level curriculum selection into a subject named `General`.
 *
 * Content used to be chosen per module and is now chosen per subject. Rather
 * than ask for a year's work to be re-ticked, everything already picked becomes
 * one subject that can be renamed and split at leisure. It carries no marks, so
 * it appears in the gap banner until a mark scheme is entered — which is the
 * correct signal, not a defect. The module-level record is left in place,
 * unread, so this can be re-run and so nothing is lost by rolling back.
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

/** The three per-module documents. They move together, or not at all. */
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
 * The catalogue and all three documents move in one operation. Re-keying them
 * from three separate call sites invites a move that half-lands — a mark scheme
 * left under a year the module no longer sits in, reachable by nothing and
 * visible to no one. Module IDs are unique per university rather than per year,
 * so a move can never introduce a collision.
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
  const withTerm = (year: UniYear): string[] => (year.terms?.includes(term) ? year.terms : [...(year.terms ?? []), term])

  const years = university.years.map((year) => {
    if (year.id === fromYearId && fromYearId === toYearId) {
      return { ...year, terms: withTerm(year), courses: year.courses.map((c) => (c.id === courseId ? moved : c)) }
    }
    if (year.id === fromYearId) return { ...year, courses: year.courses.filter((c) => c.id !== courseId) }
    if (year.id === toYearId) return { ...year, terms: withTerm(year), courses: [...year.courses, moved] }
    return year
  })

  const next = { ...university, years }
  if (fromYearId === toYearId) return { university: next, stores }

  const oldKey = moduleKey(university.id, fromYearId, courseId)
  const newKey = moduleKey(university.id, toYearId, courseId)
  const rekey = <T,>(store: Record<string, T>): Record<string, T> => {
    if (!(oldKey in store)) return store
    const moved = { ...store }
    moved[newKey] = moved[oldKey]
    delete moved[oldKey]
    return moved
  }

  return {
    university: next,
    stores: { subjects: rekey(stores.subjects), curricula: rekey(stores.curricula), schedules: rekey(stores.schedules) },
  }
}

function patchYear(university: University, yearId: string, fn: (year: UniYear) => UniYear): University {
  return { ...university, years: university.years.map((year) => (year.id === yearId ? fn(year) : year)) }
}

/** Rename a term and every course sitting on it, so no module is stranded. */
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
 * Remove a term, moving whatever sits on it to `reassignTo`.
 *
 * Deleting a term must never become a way to delete modules, so the caller
 * names the term they land on and the move happens here — not in a second call
 * that might not come.
 */
export function deleteTerm(university: University, yearId: string, term: string, reassignTo: string): University {
  return patchYear(university, yearId, (year) => ({
    ...year,
    terms: (year.terms ?? []).filter((candidate) => candidate !== term),
    courses: year.courses.map((course) => ((course.term || DEFAULT_TERM) === term ? { ...course, term: reassignTo } : course)),
  }))
}

