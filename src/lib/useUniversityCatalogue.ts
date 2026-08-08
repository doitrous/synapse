import { UNIVERSITY_CATALOGUE_STORAGE_KEY, universities, type University } from '@/data/universities'
import { usePersistentState } from './usePersistentState'
import { seedOr } from './api'

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
  return usePersistentState<University[]>(UNIVERSITY_CATALOGUE_STORAGE_KEY, () => seedOr(() => cloneUniversityCatalogue(), () => []))
}

export function universityFrom(catalogue: University[], id: string) {
  return catalogue.find((university) => university.id === id)
}
