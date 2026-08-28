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
  /**
   * Offered to students. Absent means true, so every record that predates the
   * flag stays live rather than being switched off by its addition.
   */
  active?: boolean
}

export interface University {
  id: string
  name: string
  short: string
  region: string
  years: UniYear[]
  /**
   * Offered to students. Absent means true. Switched off, none of its years is
   * available whatever their own flag says — read both through `isYearLive`.
   */
  active?: boolean
}

/**
 * Whether students may be offered this year.
 *
 * Both facts are read through one predicate so that no caller can check the
 * year and forget the university it belongs to. Absent means live, so nothing
 * that predates the flag is switched off by its arrival.
 */
export function isYearLive(university: Pick<University, 'active'>, year: Pick<UniYear, 'active'>): boolean {
  return university.active !== false && year.active !== false
}

/** The student's year in a university, by the label their profile carries. */
export function findYearByLabel(university: University, label: string): UniYear | undefined {
  return university.years.find((year) => year.year === label)
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

/**
 * Kasr Al Ainy's modules, as the faculty lists them.
 *
 * `[name, moduleId]`, and the name is the label the faculty uses rather than an
 * expansion of it: "104 CPS" is what a student sees on their own timetable, and
 * guessing at what the letters stand for would put a title on their screen that
 * nobody at the school wrote. An admin can rename any of them in Academic Setup
 * once the full titles are to hand.
 *
 * Module IDs carry a year suffix in years 4 and 5 because those years repeat
 * SURG, IM and FM between them, and a module ID is unique across the whole
 * university — without the suffix the importer would silently make the second
 * one "SURG-2", which is an ID no student would recognise.
 *
 * This seeds demo mode only. A live deployment reads its catalogue from the
 * server, so the same list ships as `docs/import-ready/academic/kau-modules.md`
 * for an admin to apply through Academic Import.
 */
const KAU_MODULES: Record<string, [name: string, moduleId: string][]> = {
  'Year 1': [
    ['101 ISK', '101 ISK'],
    ['102 INT', '102 INT'],
    ['103 BMS', '103 BMS'],
    ['104 CPS', '104 CPS'],
    ['108 INT', '108 INT'],
  ],
  'Year 2': [
    ['205 NEU', '205 NEU'],
    ['206 DIG', '206 DIG'],
    ['207 END', '207 END'],
    ['208 INT', '208 INT'],
    ['210 PAT', '210 PAT'],
    ['213 PSY', '213 PSY'],
  ],
  'Year 3': [
    ['309 INF', '309 INF'],
    ['310 PAT', '310 PAT'],
    ['Community Medicine', '314'],
    ['Forensic Medicine', '319'],
    ['327 MPE', '327 MPE'],
    ['Clinical', 'CLIN 3'],
    ['Community Issues', 'COMM 3'],
    ['Electives', 'ELEC 3'],
  ],
  'Year 4': [
    ['PEDS', 'PEDS 4'],
    ['OBGYN', 'OBGYN 4'],
    ['SURG', 'SURG 4'],
    ['IM', 'IM 4'],
    ['PSY', 'PSY 4'],
    ['FM', 'FM 4'],
    ['CM', 'CM 4'],
    ['Palliative Medicine & Oncology', 'PALL 4'],
    ['Research', 'RSCH 4'],
  ],
  'Year 5': [
    ['SURG', 'SURG 5'],
    ['IM', 'IM 5'],
    ['FM', 'FM 5'],
  ],
}

/**
 * Alexandria University's Years 1–3 modules, as the corpus folder names carry them
 * (`/Users/doitrous/Desktop/Alexandria University/y1|y2|y3/<CODE> - <name>`).
 *
 * `[name, moduleId]`, same shape as `KAU_MODULES`. IDs renamed 2026-08-22 (chief of
 * staff ruling): `withModules` below copies `moduleId` through unprefixed, and
 * nothing downstream (`bulkImport.ts`, `contentControl.ts`, `blueprint.ts`)
 * cross-checks a module id against which university it belongs to — ids are global
 * bare strings, so a bare `MED 102` would collide with any other university that
 * also prints one. Every id here is therefore `AU-<CODE>` (uppercase, hyphens, no
 * spaces); the faculty-printed code stays visible in the name instead, as `"<CODE>
 * — <title>"`. See `docs/Alexandria-Source-Imports/academic/au-modules.md` for the
 * full rationale and the reconciliation against the bylaws.
 *
 * The bylaws (`docs/Alexandria-Source-Imports/academic/bylaws-2023-extract.md`)
 * state a real semester per module, but `withModules` below has no per-module term
 * slot — like `KAU_MODULES`, every course lands on the year's single `Term 1`
 * here. The actual per-module term (Term 1/Term 2, mapped from the bylaws' own
 * semester) lives only in the import batch, `docs/import-ready/academic/au-modules.md`
 * / `docs/Alexandria-Source-Imports/academic/au-modules.md`, which is what a live
 * deployment applies through Academic Import; this table seeds demo mode only.
 *
 * Years 4 and 5 are out of scope for this table — they were not part of the
 * Years 1–3 extraction and are left empty, same as any other unlisted year.
 */
const AU_MODULES: Record<string, [name: string, moduleId: string][]> = {
  'Year 1': [
    ['MED 101 — Medical School Orientation', 'AU-MED-101'],
    ['MED 102 — Foundation of Basic Medical Sciences & Medical Terminology', 'AU-MED-102'],
    ['MED 103 — Blood and Immune System & Medical Terminology', 'AU-MED-103'],
    ['UNI 104 — English', 'AU-UNI-104'],
    ['MED 105 — Musculoskeletal System & Communication and Basic Clinical Skills (1)', 'AU-MED-105'],
    ['MED 106 — Cardiorespiratory System & Communication and Basic Clinical Skills (2)', 'AU-MED-106'],
    ['UNI 107 — Social Issues', 'AU-UNI-107'],
  ],
  'Year 2': [
    ['MED 201 — Endocrine and Genitourinary Systems & Communication and Basic Clinical Skills (3)', 'AU-MED-201'],
    ['MED 202 — Gastrointestinal System and Nutrition & Communication and Basic Clinical Skills (4)', 'AU-MED-202'],
    ['MED 203 — Nervous System & Professionalism, Medical Law and Ethics', 'AU-MED-203'],
    ['MED 204 — Concept of Health and Disease (1) & Professionalism, Medical Law and Ethics', 'AU-MED-204'],
    ['MED 205 — Concept of Health and Disease (2) & Professionalism, Medical Law and Ethics', 'AU-MED-205'],
  ],
  'Year 3': [
    ['MED 301 — Infection 1', 'AU-MED-301'],
    ['MED 302 — Infection 2', 'AU-MED-302'],
    ['MED 303 — Concept of Health and Disease (3)', 'AU-MED-303'],
    ['E 304 — Elective 1', 'AU-E-304'],
    ['MED 305 — Medicine', 'AU-MED-305'],
    ['E 306 — Elective 2', 'AU-E-306'],
    ['MED 307 — Investigative Medicine', 'AU-MED-307'],
    ['MED 308 — Research', 'AU-MED-308'],
    ['MED 309 — Surgery', 'AU-MED-309'],
    ['UNI 310 — Entrepreneurship', 'AU-UNI-310'],
    ['UNI 311 — Critical Thinking', 'AU-UNI-311'],
  ],
}

/**
 * Fill a university's years with a named set of modules.
 *
 * Years the set says nothing about are left exactly as they were, empty — an
 * internship year with no modules recorded is a year with no modules recorded.
 */
function withModules(years: UniYear[], modules: Record<string, [string, string][]>): UniYear[] {
  return years.map((year) => {
    const list = modules[year.year]
    if (!list) return year
    return {
      ...year,
      terms: ['Term 1'],
      courses: list.map(([name, moduleId], index) => ({
        id: `${year.id.toLowerCase()}-m${index + 1}`,
        name,
        block: 'Term 1',
        moduleId,
        term: 'Term 1',
      })),
    }
  })
}

export const universities: University[] = [
  { id: 'kau', name: 'Kasr Alainy - Cairo University', short: 'KAU', region: 'Cairo', years: withModules(buildYears('KAU'), KAU_MODULES) },
  { id: 'asu', name: 'Ain Shams University', short: 'ASU', region: 'Cairo', years: buildYears('ASU') },
  { id: 'au', name: 'Alexandria University', short: 'AU', region: 'Alexandria', years: withModules(buildYears('AU'), AU_MODULES) },
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

/**
 * The last catalogue string seen, and what it parsed to.
 *
 * This is a plain function called from render paths — every SubjectDot, every
 * row — and it used to JSON.parse the entire catalogue on every call. Reading
 * the string stays (getItem is cheap, and it is what makes a write in this tab
 * or any other visible immediately); only the parse is skipped when the stored
 * text has not changed.
 */
let parsedFrom: string | null = null
let parsedCatalogue: University[] = []

export function getUniversity(id: string): University | undefined {
  if (typeof window !== 'undefined') {
    try {
      const saved = window.localStorage.getItem(UNIVERSITY_CATALOGUE_STORAGE_KEY)
      if (saved !== parsedFrom) {
        parsedFrom = saved
        parsedCatalogue = saved ? (JSON.parse(saved) as University[]) : []
      }
      const match = parsedCatalogue.find((university) => university.id === id)
      if (match) return match
    } catch {
      // Fall back to the seeded catalogue if saved data is unavailable or malformed.
      parsedCatalogue = []
    }
  }
  return universitiesById[id]
}

export const YEARS = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Internship Year 1', 'Internship Year 2']

/* ---- Content scoping ---------------------------------------------------- */

/**
 * Which universities and years a piece of content applies to.
 *
 * Read from what the author recorded on the item, with an empty list meaning
 * "everyone". This replaced two functions that invented the answer:
 * `scopeUniversities` hashed the item's id and used `h % 2` and `h % 3` to
 * decide which universities it belonged to, and `scopeYear` mapped a subject to
 * a year from an eight-entry table. Both produced confident, real-looking chips
 * on the student's screen that described nothing.
 */
export interface AuthoredScope {
  universityIds?: string[]
  yearIds?: string[]
}

export function scopeMatches(scope: AuthoredScope | undefined, universityId?: string, yearId?: string): boolean {
  if (universityId && (scope?.universityIds?.length ?? 0) > 0 && !scope!.universityIds!.includes(universityId)) return false
  if (yearId && (scope?.yearIds?.length ?? 0) > 0 && !scope!.yearIds!.includes(yearId)) return false
  return true
}
