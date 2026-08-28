import type { ManagedContentItem } from './contentControl.ts'
import { defaultModuleId, type University } from './universities.ts'

export interface MediaRequestCurriculumScope {
  /** Whether an assignment was authored, even if its ID no longer resolves. */
  hasUniversityAssignment: boolean
  hasYearAssignment: boolean
  hasModuleAssignment: boolean
  /** Canonical university IDs from the live catalogue. */
  universityIds: string[]
  /** Canonical, university-scoped year IDs from the live catalogue. */
  yearIds: string[]
  /** Authored module IDs or module names, normalised for comparison. */
  moduleKeys: string[]
  /** Authored module values which do not resolve in the live catalogue. */
  unresolvedModules: string[]
}

export interface MediaRequestModuleOption {
  key: string
  universityId: string
  yearId: string
  moduleId: string
  moduleName: string
}

export type MediaRequestCurriculumSort = 'priority' | 'university' | 'year' | 'module'

interface SortableMediaRequestRow {
  id: string
  ownerTitle: string
  priority: string
  status: string
  curriculum: MediaRequestCurriculumScope
}

function list(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((entry) => String(entry).trim()).filter(Boolean)
    : []
}

function normalise(value: string): string {
  return value.trim().toLocaleLowerCase()
}

function moduleOfPath(path: string): string {
  return path.split('>')[0]?.trim() ?? ''
}

function authoringRecord(item: ManagedContentItem): Record<string, unknown> {
  if (item.kind === 'question') return (item.questionData?.tags ?? {}) as unknown as Record<string, unknown>

  const data = item.kind === 'article' ? item.articleData
    : item.kind === 'practical' ? item.practicalData
      : item.kind === 'resource' ? item.resourceData
        : item.kind === 'deck' ? item.deckData
          : item.kind === 'essay' ? item.essayData
            : item.histologyData
  if (!data || typeof data !== 'object') return {}

  // Deck, essay and histology do not yet declare curriculum fields in their
  // TypeScript contracts. Reading a nested `tags` record as well keeps the
  // backlog accurate when those editors gain them, without inventing an
  // assignment for today's untagged records.
  const record = data as unknown as Record<string, unknown>
  const tags = record.tags
  return tags && typeof tags === 'object'
    ? { ...record, ...(tags as Record<string, unknown>) }
    : record
}

export function mediaRequestModuleOptions(catalogue: University[]): MediaRequestModuleOption[] {
  return catalogue.flatMap((university) => university.years.flatMap((year) => year.courses.map((course, index) => {
    const moduleId = course.moduleId?.trim() || defaultModuleId(course.name, index + 1)
    return {
      key: `${university.id}\u241f${year.id}\u241f${moduleId}`,
      universityId: university.id,
      yearId: year.id,
      moduleId,
      moduleName: course.name,
    }
  })))
}

/**
 * Resolve the curriculum written on a media request's owning item.
 *
 * A request deliberately carries no duplicate audience fields: it inherits the
 * university, year and module of the question/article/practical that needs it.
 * This resolver therefore reads the owner and reconciles its legacy labels,
 * university-scoped IDs and module path heads against the current catalogue.
 */
export function mediaRequestCurriculumScope(
  item: ManagedContentItem,
  catalogue: University[],
): MediaRequestCurriculumScope {
  const record = authoringRecord(item)
  const authoredUniversities = list(record.universityIds)
  const authoredYears = [
    ...list(record.yearIds),
    ...list(record.years),
  ]
  const onlyFor = item.kind === 'question' ? list(record.questionOnlyFor) : []
  const authoredModules = [
    ...list(record.moduleIds),
    ...list(record.moduleSubjectPaths).map(moduleOfPath).filter(Boolean),
  ]

  const universitiesByKey = new Map<string, string>()
  const yearsByKey = new Map<string, Array<{ universityId: string; yearId: string }>>()
  for (const university of catalogue) {
    universitiesByKey.set(normalise(university.id), university.id)
    universitiesByKey.set(normalise(university.short), university.id)
    for (const year of university.years) {
      const placement = { universityId: university.id, yearId: year.id }
      for (const key of [year.id, year.year]) {
        const normalised = normalise(key)
        yearsByKey.set(normalised, [...(yearsByKey.get(normalised) ?? []), placement])
      }
    }
  }

  // questionOnlyFor is an allow-list of either university or year IDs. It is
  // part of the real student audience and must therefore be visible here too.
  for (const value of onlyFor) {
    if (universitiesByKey.has(normalise(value))) authoredUniversities.push(value)
    if (yearsByKey.has(normalise(value))) authoredYears.push(value)
  }

  const explicitUniversityIds = new Set(
    authoredUniversities
      .map((value) => universitiesByKey.get(normalise(value)))
      .filter((value): value is string => Boolean(value)),
  )
  const resolvedYearIds = new Set<string>()
  let yearImpliesUniversity = false
  for (const value of authoredYears) {
    const placements = yearsByKey.get(normalise(value)) ?? []
    const scoped = explicitUniversityIds.size
      ? placements.filter((placement) => explicitUniversityIds.has(placement.universityId))
      : placements
    for (const placement of scoped) resolvedYearIds.add(placement.yearId)

    // An exact, university-scoped year ID is also reliable evidence of the
    // university. A loose "Year 2" label is not.
    const exact = placements.find((placement) => normalise(placement.yearId) === normalise(value))
    if (exact) {
      explicitUniversityIds.add(exact.universityId)
      yearImpliesUniversity = true
    }
  }

  const options = mediaRequestModuleOptions(catalogue)
  const knownModuleKeys = new Set(options.flatMap((option) => [normalise(option.moduleId), normalise(option.moduleName)]))
  const moduleKeys = [...new Set(authoredModules.map(normalise))]

  return {
    hasUniversityAssignment: authoredUniversities.length > 0 || yearImpliesUniversity,
    hasYearAssignment: authoredYears.length > 0,
    hasModuleAssignment: authoredModules.length > 0,
    universityIds: [...explicitUniversityIds],
    yearIds: [...resolvedYearIds],
    moduleKeys,
    unresolvedModules: authoredModules.filter((value, index) => (
      !knownModuleKeys.has(normalise(value))
      && authoredModules.findIndex((candidate) => normalise(candidate) === normalise(value)) === index
    )),
  }
}

export function curriculumScopeHasModule(
  scope: MediaRequestCurriculumScope,
  option: MediaRequestModuleOption,
): boolean {
  if (!scope.moduleKeys.includes(normalise(option.moduleId))
      && !scope.moduleKeys.includes(normalise(option.moduleName))) return false
  if (scope.universityIds.length && !scope.universityIds.includes(option.universityId)) return false
  if (scope.yearIds.length && !scope.yearIds.includes(option.yearId)) return false
  return true
}

const PRIORITY_ORDER = new Map([['required', 0], ['strongly helpful', 1], ['optional', 2]])
const STATUS_ORDER = new Map([['needed', 0], ['planned', 1], ['supplied', 2], ['declined', 3]])

function comparisonKey(
  row: SortableMediaRequestRow,
  sort: MediaRequestCurriculumSort,
  catalogue: University[],
  modules: MediaRequestModuleOption[],
): string {
  if (sort === 'university') {
    if (!row.curriculum.hasUniversityAssignment) return '\uffff unassigned'
    const names = row.curriculum.universityIds.map((id) => (
      catalogue.find((candidate) => candidate.id === id)?.name ?? id
    ))
    return names.length ? names.sort()[0] : '\ufffe unresolved'
  }
  if (sort === 'year') {
    if (!row.curriculum.hasYearAssignment) return '\uffff unassigned'
    const placements = catalogue.flatMap((university) => university.years.map((year, index) => ({
      id: year.id,
      key: `${String(index).padStart(3, '0')} ${year.year} ${university.name}`,
    })))
    const keys = row.curriculum.yearIds
      .map((id) => placements.find((placement) => placement.id === id)?.key)
      .filter((value): value is string => Boolean(value))
    return keys.length ? keys.sort()[0] : '\ufffe unresolved'
  }
  if (sort === 'module') {
    if (!row.curriculum.hasModuleAssignment) return '\uffff unassigned'
    const keys = modules.filter((option) => curriculumScopeHasModule(row.curriculum, option))
      .map((option) => `${option.moduleName} ${option.moduleId} ${option.universityId} ${option.yearId}`)
    return keys.length ? keys.sort()[0] : `\ufffe ${row.curriculum.unresolvedModules[0] ?? row.curriculum.moduleKeys[0] ?? ''}`
  }
  return String(PRIORITY_ORDER.get(row.priority) ?? 99).padStart(2, '0')
}

/** Sort the reviewer backlog predictably while retaining every request row. */
export function sortMediaRequestRows<T extends SortableMediaRequestRow>(
  rows: T[],
  sort: MediaRequestCurriculumSort,
  catalogue: University[],
  modules: MediaRequestModuleOption[] = mediaRequestModuleOptions(catalogue),
): T[] {
  return rows.map((row, index) => ({ row, index })).sort((left, right) => {
    const primary = comparisonKey(left.row, sort, catalogue, modules)
      .localeCompare(comparisonKey(right.row, sort, catalogue, modules), undefined, { numeric: true })
    if (primary) return primary
    const priority = (PRIORITY_ORDER.get(left.row.priority) ?? 99) - (PRIORITY_ORDER.get(right.row.priority) ?? 99)
    if (priority) return priority
    const status = (STATUS_ORDER.get(left.row.status) ?? 99) - (STATUS_ORDER.get(right.row.status) ?? 99)
    if (status) return status
    const owner = left.row.ownerTitle.localeCompare(right.row.ownerTitle, undefined, { numeric: true })
    if (owner) return owner
    const id = left.row.id.localeCompare(right.row.id, undefined, { numeric: true })
    return id || left.index - right.index
  }).map(({ row }) => row)
}
