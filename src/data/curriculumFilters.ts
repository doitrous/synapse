import { defaultModuleId, type University } from './universities.ts'

/**
 * Shared, deduplicated option derivation for the University → Year → Module
 * cascade used by `src/components/filters/CascadingScopeFilter.tsx`.
 *
 * This is deliberately independent of `src/data/mediaRequestCurriculum.ts`
 * (which resolves the curriculum an *existing content item* was authored
 * against). This module only turns the live catalogue into stable,
 * deduplicated filter options — the same shape any admin/reviewer list page
 * needs, regardless of what it is filtering.
 */

export interface CurriculumOption {
  /** Stable, catalogue-derived id. Safe to use as a React key or a URL value. */
  id: string
  label: string
}

export interface CurriculumModuleOption extends CurriculumOption {
  universityId: string
  yearId: string
  /** The year label a module belongs under, e.g. "Year 2" — for grouping (`<optgroup>`) when a module list spans more than one year. */
  groupLabel: string
}

export interface CurriculumScope {
  universityId?: string
  yearId?: string
  moduleId?: string
}

export type CurriculumScopePart = 'universityId' | 'yearId' | 'moduleId'

export interface CurriculumScopeChip {
  part: CurriculumScopePart
  label: string
}

/** Every university in the catalogue, deduplicated by id, alphabetised by name. */
export function curriculumUniversityOptions(catalogue: University[]): CurriculumOption[] {
  const seen = new Map<string, CurriculumOption>()
  for (const university of catalogue) {
    if (!seen.has(university.id)) seen.set(university.id, { id: university.id, label: university.name })
  }
  return [...seen.values()].sort((a, b) => a.label.localeCompare(b.label))
}

/**
 * A university's years, deduplicated by id, in catalogue order (Year 1..5,
 * then internship years) rather than alphabetised — the order a student's
 * timetable actually runs in.
 *
 * Returns nothing until a university is chosen: a year id is only meaningful
 * scoped to a university (`KAU_Y1` vs `ASU_Y1` are different years), so an
 * unscoped year list would either collide or mean nothing.
 */
export function curriculumYearOptions(catalogue: University[], universityId?: string): CurriculumOption[] {
  if (!universityId) return []
  const university = catalogue.find((candidate) => candidate.id === universityId)
  if (!university) return []
  const seen = new Map<string, CurriculumOption>()
  for (const year of university.years) {
    if (!seen.has(year.id)) seen.set(year.id, { id: year.id, label: year.year })
  }
  return [...seen.values()]
}

/**
 * A university's modules, deduplicated by `university␟year␟moduleId`,
 * scoped to one year when given, otherwise every year (each option carries a
 * `groupLabel` so the caller can render `<optgroup>`s instead of one unwieldy
 * flat list — this is the fix for the flattened module dropdown in
 * MediaRequests.tsx).
 *
 * Requires a university: an unscoped module list is the exact anti-pattern
 * this module replaces.
 */
export function curriculumModuleOptions(
  catalogue: University[],
  universityId?: string,
  yearId?: string,
): CurriculumModuleOption[] {
  if (!universityId) return []
  const university = catalogue.find((candidate) => candidate.id === universityId)
  if (!university) return []
  const years = yearId ? university.years.filter((year) => year.id === yearId) : university.years

  const seen = new Map<string, CurriculumModuleOption>()
  for (const year of years) {
    year.courses.forEach((course, index) => {
      const moduleId = course.moduleId?.trim() || defaultModuleId(course.name, index + 1)
      const key = `${university.id}␟${year.id}␟${moduleId}`
      if (seen.has(key)) return
      seen.set(key, {
        id: key,
        label: course.moduleId?.trim() ? `${course.moduleId.trim()} — ${course.name}` : course.name,
        universityId: university.id,
        yearId: year.id,
        groupLabel: year.year,
      })
    })
  }
  return [...seen.values()]
}

/**
 * Drop any part of a scope that no longer resolves against the catalogue —
 * a year that does not belong to the chosen university, or a module that
 * does not belong to the chosen university/year.
 *
 * Call this whenever the university or year changes (see
 * `CascadingScopeFilter`), so a stale year/module never lingers as an
 * invisible filter after its parent is cleared or switched.
 */
export function resolveCurriculumScope(scope: CurriculumScope, catalogue: University[]): CurriculumScope {
  const universityId = scope.universityId && catalogue.some((u) => u.id === scope.universityId)
    ? scope.universityId
    : undefined
  if (!universityId) return {}

  const years = curriculumYearOptions(catalogue, universityId)
  const yearId = scope.yearId && years.some((year) => year.id === scope.yearId) ? scope.yearId : undefined
  if (!yearId) return { universityId }

  const modules = curriculumModuleOptions(catalogue, universityId, yearId)
  const moduleId = scope.moduleId && modules.some((mod) => mod.id === scope.moduleId) ? scope.moduleId : undefined
  return moduleId ? { universityId, yearId, moduleId } : { universityId, yearId }
}

/** Remove one part of a scope, and everything that depends on it. */
export function clearCurriculumScopePart(scope: CurriculumScope, part: CurriculumScopePart): CurriculumScope {
  if (part === 'universityId') return {}
  if (part === 'yearId') return { universityId: scope.universityId }
  return { universityId: scope.universityId, yearId: scope.yearId }
}

/**
 * Human-readable chips for the active parts of a scope, each independently
 * removable via `clearCurriculumScopePart`. A part with no resolvable label
 * (stale catalogue, id from a different university) is silently omitted
 * rather than shown as a broken chip.
 */
export function curriculumScopeChips(scope: CurriculumScope, catalogue: University[]): CurriculumScopeChip[] {
  const chips: CurriculumScopeChip[] = []
  if (!scope.universityId) return chips

  const university = catalogue.find((candidate) => candidate.id === scope.universityId)
  if (!university) return chips
  chips.push({ part: 'universityId', label: university.name })

  if (scope.yearId) {
    const year = curriculumYearOptions(catalogue, scope.universityId).find((option) => option.id === scope.yearId)
    if (year) chips.push({ part: 'yearId', label: year.label })
  }

  if (scope.moduleId) {
    const mod = curriculumModuleOptions(catalogue, scope.universityId, scope.yearId)
      .find((option) => option.id === scope.moduleId)
    if (mod) chips.push({ part: 'moduleId', label: mod.label })
  }

  return chips
}

export function isCurriculumScopeEmpty(scope: CurriculumScope): boolean {
  return !scope.universityId && !scope.yearId && !scope.moduleId
}
