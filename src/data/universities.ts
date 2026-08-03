export interface CurriculumCourse {
  id: string
  name: string
  block: string
}

export interface UniYear {
  year: string
  students: number
  courses: CurriculumCourse[]
}

export interface University {
  id: string
  name: string
  short: string
  region: string
  years: UniYear[]
}

export const UNIVERSITY_CATALOGUE_STORAGE_KEY = 'synapse-academic-universities-v1'

const YEAR_COURSES: Record<string, string[]> = {
  'Year 1': ['Foundations of Medicine', 'Anatomy & Physiology', 'Cell & Molecular Biology'],
  'Year 2': ['Cardiovascular System', 'Respiratory System', 'Renal & Urinary'],
  'Year 3': ['Clinical Pharmacology', 'Neurology', 'Clinical Skills'],
  'Year 4': ['Clinical Rotations', 'Specialties in Practice'],
  'Year 5': ['Preparation for Practice', 'Electives'],
}

function buildYears(uni: string, base: number): UniYear[] {
  return Object.entries(YEAR_COURSES).map(([year, names], i) => ({
    year,
    students: base - i * 22,
    courses: names.map((name, j) => ({ id: `${uni}-${i}-${j}`, name, block: `Block ${j + 1}` })),
  }))
}

export const universities: University[] = [
  { id: 'oms', name: 'Osler School of Medicine', short: 'OMS', region: 'United Kingdom', years: buildYears('oms', 312) },
  { id: 'meridian', name: 'Meridian Medical School', short: 'MMS', region: 'United Kingdom', years: buildYears('meridian', 268) },
  { id: 'northgate', name: 'Northgate University Medicine', short: 'NUM', region: 'Ireland', years: buildYears('northgate', 224) },
]

/** A fresh set of years (default curriculum) for a newly added university. */
export function newUniversityYears(uniId: string): UniYear[] {
  return buildYears(uniId, 200)
}

export const universitiesById: Record<string, University> = Object.fromEntries(
  universities.map((u) => [u.id, u]),
)

export function getUniversity(id: string): University | undefined {
  if (typeof window !== 'undefined') {
    try {
      const saved = window.localStorage.getItem(UNIVERSITY_CATALOGUE_STORAGE_KEY)
      if (saved) {
        const configured = JSON.parse(saved) as University[]
        const match = configured.find((university) => university.id === id)
        if (match) return match
      }
    } catch {
      // Fall back to the seeded catalogue if saved data is unavailable or malformed.
    }
  }
  return universitiesById[id]
}

export const YEARS = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']

/* ---- Deterministic content scoping ------------------------------------- */

function hash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

/** Which universities a content item is tagged for (always includes OMS). */
export function scopeUniversities(key: string): string[] {
  const h = hash(key)
  const ids = ['oms']
  if (h % 2 === 0) ids.push('meridian')
  if (h % 3 === 0) ids.push('northgate')
  return ids
}

const SUBJECT_YEAR: Record<string, string> = {
  msk: 'Year 1',
  cvs: 'Year 2',
  resp: 'Year 2',
  renal: 'Year 2',
  gi: 'Year 2',
  pharm: 'Year 3',
  neuro: 'Year 3',
  endo: 'Year 3',
}

/** The curriculum year a subject typically sits in. */
export function scopeYear(subjectId: string): string {
  return SUBJECT_YEAR[subjectId] ?? 'Year 2'
}
