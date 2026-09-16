export interface CurriculumCourse {
  id: string
  name: string
  block: string
  /** Visible, editable, university-unique module ID (chip style, e.g. "CVS 01"). */
  moduleId?: string
  /** The term this module sits in (a year has one or more terms). */
  term?: string
  /** Credit points/hours the module carries in the faculty bylaws. Absent = not recorded. */
  creditPoints?: number
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

export const UNIVERSITY_CATALOGUE_STORAGE_KEY = 'nishany-academic-universities-v1'

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
 * Whether an item's authored year list admits a student whose year resolves to
 * `scopeYearId`.
 *
 * Year tags come in two shapes that mean the same thing: the bare label the bulk
 * question importer stores verbatim ("Year 1", "Internship Year 2") and the
 * university-scoped id everything else uses ("KAU_Y1", "KAU_INT2"). The student
 * audience always carries the composite id, so a question tagged with the bare
 * label — which is how `## years` is recorded for questions — never matched and
 * was silently hidden. Compare by year ordinal so the two shapes agree. Two
 * composites still must match literally: a composite already names its
 * university, and matching those by ordinal would leak content across
 * universities. A bare label carries no university, so the separate university
 * tag is what gates it. Empty list means unrestricted, as everywhere else.
 */
export function yearScopeMatches(
  itemYears: string[] | undefined,
  scopeYearId?: string,
  universityGated = false,
): boolean {
  if (!scopeYearId || !itemYears || itemYears.length === 0) return true
  return itemYears.some((token) => yearTokensMatch(token, scopeYearId, universityGated))
}

/**
 * The university a composite year id like "KAU_Y1"/"OMS_INT2" names, lowercased
 * to match how the client stores university ids, or null for a bare label.
 *
 * The server hard gate (`server/src/contentScope.js`) reads the university out
 * of a composite year the same way, so a question whose only university signal
 * is its year id is gated identically on both sides.
 */
export function universityOfYear(token: string | undefined): string | null {
  const match = String(token ?? '').trim().match(/^([A-Za-z]+)_(?:Y|INT)\d+$/i)
  return match ? match[1].toLowerCase() : null
}

/**
 * Every university an item belongs to: its explicit `universityIds` plus any a
 * composite year id names, all lowercased.
 *
 * This mirrors `itemUniversities` in the server hard gate: an item cloned into a
 * new university keeps its source university's composite year ids, and both
 * universities legitimately own it. The client used to fold that isolation into
 * the *year* compare (two composites had to match literally), which made the
 * browser stricter than the server and silently dropped questions the server
 * had already approved.
 */
export function scopeUniversities(
  universityIds: string[] | undefined,
  yearIds: string[] | undefined,
): Set<string> {
  const set = new Set<string>()
  for (const id of universityIds ?? []) if (id) set.add(String(id).toLowerCase())
  for (const year of yearIds ?? []) {
    const uni = universityOfYear(year)
    if (uni) set.add(uni)
  }
  return set
}

function yearOrdinal(token: string): string | null {
  const t = token.trim()
  const label = t.match(/^year\s*(\d+)$/i)?.[1]
  if (label) return `Y${label}`
  const intern = t.match(/^internship(?:\s+year)?\s*(\d+)$/i)?.[1]
  if (intern) return `INT${intern}`
  const compY = t.match(/_Y(\d+)$/i)?.[1]
  if (compY) return `Y${compY}`
  const compInt = t.match(/_INT(\d+)$/i)?.[1]
  if (compInt) return `INT${compInt}`
  return null
}

function isCompositeYear(token: string): boolean {
  return /_(?:Y|INT)\d+$/i.test(token.trim())
}

function yearTokensMatch(itemYear: string, scopeYearId: string, universityGated = false): boolean {
  if (itemYear === scopeYearId) return true
  // Two composite ids normally must match literally: a composite names its
  // university, and matching them by ordinal alone would leak content across
  // universities. When the caller has *already* gated the university (an
  // explicit tag or a year id's own prefix put the student's university in
  // scope), that isolation is done, so the year need only agree on the ordinal —
  // this is what lets an "ASU"-tagged question whose year kept a cloned "KAU_Y1"
  // prefix reach an ASU Year 1 student, matching the server hard gate.
  if (!universityGated && isCompositeYear(itemYear) && isCompositeYear(scopeYearId)) return false
  const a = yearOrdinal(itemYear)
  return a !== null && a === yearOrdinal(scopeYearId)
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
const KAU_MODULES: Record<string, [name: string, moduleId: string, creditPoints?: number][]> = {
  // Year 1 is the full 9-module bylaws list (study guide 2025-2026, p14-15): five
  // horizontal modules plus four vertical skills modules, each with its credit points.
  'Year 1': [
    ['101 ISK', '101 ISK', 12],
    ['102 INT', '102 INT', 10.5],
    ['103 BMS', '103 BMS', 15],
    ['104 CPS', '104 CPS', 15],
    ['108 INT', '108 INT', 2],
    ['130 EPE', '130 EPE', 2],
    ['126 MPC', '126 MPC', 1.5],
    ['100 CRT', '100 CRT', 1.5],
    ['127 TER', '127 TER', 0.5],
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
function withModules(years: UniYear[], modules: Record<string, [string, string, number?][]>): UniYear[] {
  return years.map((year) => {
    const list = modules[year.year]
    if (!list) return year
    return {
      ...year,
      terms: ['Term 1'],
      courses: list.map(([name, moduleId, creditPoints], index) => ({
        id: `${year.id.toLowerCase()}-m${index + 1}`,
        name,
        block: 'Term 1',
        moduleId,
        term: 'Term 1',
        ...(creditPoints !== undefined ? { creditPoints } : {}),
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
  { id: 'scu', name: 'Suez Canal University (FOMSCU)', short: 'SCU', region: 'Ismailia', years: buildYears('SCU') },
  { id: 'aun', name: 'Assiut University', short: 'AUN', region: 'Assiut', years: buildYears('AUN') },
  { id: 'o6u', name: '6 October University', short: 'O6U', region: '6th of October City', years: buildYears('O6U') },
  { id: 'mans', name: 'Mansoura University', short: 'MANS', region: 'Mansoura', years: buildYears('MANS') },
  { id: 'svu', name: 'South Valley University (Qena)', short: 'SVU', region: 'Qena', years: buildYears('SVU') },
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
