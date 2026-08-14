import { useMemo } from 'react'
import { UNIVERSITY_CATALOGUE_STORAGE_KEY, defaultModuleId, universities, type University } from '@/data/universities'
import { usePersistentState } from './usePersistentState'
import { API_MODE } from './api'

export { UNIVERSITY_CATALOGUE_STORAGE_KEY }

export function cloneUniversityCatalogue(list: University[] = universities): University[] {
  return list.map((university) => ({
    ...university,
    years: university.years.map((year) => ({
      ...year,
      courses: year.courses.map((course) => ({ ...course })),
    })),
  }))
}

/** The single persistent source used by Academic Setup and every university selector. */
export function useUniversityCatalogue() {
  return usePersistentState<University[]>(UNIVERSITY_CATALOGUE_STORAGE_KEY, () => (API_MODE ? [] : cloneUniversityCatalogue()))
}

export function universityFrom(catalogue: University[], id: string) {
  return catalogue.find((university) => university.id === id)
}

/**
 * A university's name for the interface, never its raw id.
 *
 * `identity.profile.universityId` is a key like `"kau"`, and more than one
 * surface was printing that key at a student who has only ever seen "Kasr
 * Alainy". An id that is not in the catalogue resolves to nothing rather than
 * to a guess: the caller then shows one less fact instead of a wrong one.
 */
export interface StudentModule {
  /** The visible identifier, e.g. `"CVS 01"`. */
  id: string
  name: string
}

/**
 * The modules on the student's own year.
 *
 * Modules existed only on the admin side — a timetable the student could read
 * but never file their own work against. This is the same list, in the form a
 * student needs it: an id they will recognise from their timetable, and the
 * name beside it. An unknown university or year yields nothing rather than
 * every module in the catalogue.
 */
export function useStudentModules(universityId: string, yearId: string): StudentModule[] {
  const [catalogue] = useUniversityCatalogue()
  return useMemo(() => {
    if (!universityId || !yearId) return []
    const year = catalogue.find((university) => university.id === universityId)?.years
      .find((candidate) => candidate.id === yearId)
    return (year?.courses ?? []).map((course, index) => ({
      id: course.moduleId?.trim() || defaultModuleId(course.name, index + 1),
      name: course.name,
    }))
  }, [catalogue, universityId, yearId])
}

export function useUniversityName(id: string | null | undefined, form: 'short' | 'full' = 'full'): string {
  const [catalogue] = useUniversityCatalogue()
  if (!id) return ''
  const found = universityFrom(catalogue, id)
  if (!found) return ''
  return form === 'short' ? found.short : found.name
}
