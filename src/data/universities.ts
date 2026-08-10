export interface CurriculumCourse {
  id: string
  name: string
  block: string
  /** Visible, editable, university-unique module ID (chip style, e.g. "CVS 01"). */
  moduleId?: string
  /** The term this module sits in (a year has one or more terms). */
  term?: string
}

/** Derive a default module ID like "CVS 01" from a system short + sequence. */
export function defaultModuleId(systemShort: string, index: number): string {
  const code = systemShort.replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase() || 'MOD'
  return `${code} ${String(index).padStart(2, '0')}`
}

export interface UniYear {
  /** Stable university-scoped ID, e.g. KAU_Y1 or KAU_INT2. */
  id: string
  year: string
  students: number
  courses: CurriculumCourse[]
  /** Explicit term names for this year (a year has one or more terms). */
  terms?: string[]
}

export interface University {
  id: string
  name: string
  short: string
  region: string
  years: UniYear[]
}

export const UNIVERSITY_CATALOGUE_STORAGE_KEY = 'synapse-academic-universities-v1'

function buildYears(short: string): UniYear[] {
  const code = short.toUpperCase()
  return [1, 2, 3, 4, 5].map((number) => ({
    id: `${code}_Y${number}`,
    year: `Year ${number}`,
    students: 0,
    courses: [],
    terms: [],
  })).concat([
    { id: `${code}_INT1`, year: 'Internship Year 1', students: 0, courses: [], terms: [] },
    { id: `${code}_INT2`, year: 'Internship Year 2', students: 0, courses: [], terms: [] },
  ])
}

/** Build a readable, university-scoped year ID from a year label. */
export function universityYearId(universityShort: string, label: string): string {
  const code = universityShort.replace(/[^A-Za-z0-9]/g, '').toUpperCase() || 'UNI'
  const normalized = label.trim().toLowerCase()
  const yearNumber = normalized.match(/^year\s*(\d+)$/)?.[1]
  if (yearNumber) return `${code}_Y${yearNumber}`
  const internshipNumber = normalized.match(/^internship(?:\s+year)?\s*(\d+)$/)?.[1]
  if (internshipNumber) return `${code}_INT${internshipNumber}`
  const suffix = label.replace(/[^A-Za-z0-9]+/g, '_').replace(/^_+|_+$/g, '').toUpperCase() || 'YEAR'
  return `${code}_${suffix}`
}

export const universities: University[] = [
  { id: 'kau', name: 'Kasr Alainy - Cairo University', short: 'KAU', region: 'Cairo', years: buildYears('KAU') },
  { id: 'asu', name: 'Ain Shams University', short: 'ASU', region: 'Cairo', years: buildYears('ASU') },
  { id: 'au', name: 'Alexandria University', short: 'AU', region: 'Alexandria', years: buildYears('AU') },
  { id: 'hu', name: 'Helwan University', short: 'HU', region: 'Helwan, Cairo', years: buildYears('HU') },
  { id: 'bu', name: 'Beni Suef University', short: 'BU', region: 'Beni Suef', years: buildYears('BU') },
  { id: 'fu', name: 'Fayoum University', short: 'FU', region: 'Fayoum', years: buildYears('FU') },
  { id: 'mu', name: 'Menoufia University', short: 'MU', region: 'Menoufia', years: buildYears('MU') },
  { id: 'tu', name: 'Tanta University', short: 'TU', region: 'Tanta', years: buildYears('TU') },
  { id: 'zu', name: 'Zagazig University', short: 'ZU', region: 'Zagazig', years: buildYears('ZU') },
  { id: 'mti', name: 'MTI University', short: 'MTI', region: 'Cairo', years: buildYears('MTI') },
  { id: 'must', name: 'MUST University', short: 'MUST', region: 'October City, Cairo', years: buildYears('MUST') },
  { id: 'ksu', name: 'Kafr Elsheikh University', short: 'KSU', region: 'Kafr El Sheikh', years: buildYears('KSU') },
]

/** A fresh set of years (default curriculum) for a newly added university. */
export function newUniversityYears(uniId: string): UniYear[] {
  return buildYears(uniId.replace(/[^A-Za-z0-9]/g, '').slice(0, 6) || 'UNI')
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

export const YEARS = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Internship Year 1', 'Internship Year 2']

/* ---- Deterministic content scoping ------------------------------------- */

function hash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

/** Legacy deterministic scope helper. New live content must use explicit scope. */
export function scopeUniversities(key: string): string[] {
  const h = hash(key)
  const ids = ['kau']
  if (h % 2 === 0) ids.push('asu')
  if (h % 3 === 0) ids.push('au')
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
