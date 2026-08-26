import { itemModules } from './contentScope.ts'
import type { ManagedContentItem } from './contentControl.ts'
import { defaultModuleId, type University } from './universities.ts'

export interface ContentModuleLabel {
  id: string
  label: string
  context: string
  known: boolean
}

interface ModuleOption {
  id: string
  label: string
  group: string
  universityId: string
  yearId: string
  yearLabel: string
}

/**
 * Where each module id sits in the catalogue: universities in declared order,
 * each one's years in declared order, each year's courses in declared order.
 * A module taught in more than one place keeps the position of its first
 * appearance, so it does not compete with itself for a rank.
 *
 * This is "the module registry" as far as ordering goes — the same walk
 * `contentModuleLabels` does to resolve a single item's modules, but reduced
 * to the one fact a sort needs: which module comes before which.
 */
export function moduleCatalogueOrder(catalogue: University[]): Map<string, number> {
  const rank = new Map<string, number>()
  catalogue.forEach((university) => university.years.forEach((year) => year.courses.forEach((course, index) => {
    const id = course.moduleId?.trim() || defaultModuleId(course.name, index + 1)
    if (!rank.has(id)) rank.set(id, rank.size)
  })))
  return rank
}

function values(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((entry) => String(entry).trim()).filter(Boolean)
    : []
}

function normalized(value: string): string {
  return value.trim().toLowerCase()
}

function numericYear(value: string): number | null {
  if (/int/i.test(value)) return null
  const match = value.trim().match(/(?:^|[_\s])(?:y(?:ear)?\s*)?(\d{1,2})$/i)
  return match ? Number(match[1]) : null
}

function authoredScope(item: ManagedContentItem, options: ModuleOption[]) {
  const data = item.kind === 'question'
    ? item.questionData?.tags
    : item.kind === 'article'
      ? item.articleData
      : item.kind === 'practical'
        ? item.practicalData
        : item.kind === 'resource'
          ? item.resourceData
          : undefined
  const record = (data ?? {}) as Record<string, unknown>
  const rawUniversities = values(record.universityIds)
  const rawYears = values(item.kind === 'question' ? record.years : record.yearIds)
  const onlyFor = item.kind === 'question' ? values(record.questionOnlyFor) : []
  const universityIds = new Set(rawUniversities.map(normalized))
  const yearKeys = new Set(rawYears.map(normalized))
  const yearNumbers = new Set(rawYears.map(numericYear).filter((year): year is number => year !== null))
  const universityKeys = new Set(options.map((option) => normalized(option.universityId)))
  const yearIdToUniversity = new Map(options.map((option) => [normalized(option.yearId), normalized(option.universityId)]))

  for (const value of onlyFor) {
    const key = normalized(value)
    if (universityKeys.has(key)) universityIds.add(key)
    if (yearIdToUniversity.has(key)) {
      yearKeys.add(key)
      universityIds.add(yearIdToUniversity.get(key)!)
    }
  }
  // A university-scoped year ID is stronger evidence than a loose label such as
  // "Year 1". Use it to resolve the university without pretending that every
  // university's first year is the same curriculum.
  for (const key of yearKeys) {
    const universityId = yearIdToUniversity.get(key)
    if (universityId) universityIds.add(universityId)
  }

  return { universityIds, yearKeys, yearNumbers }
}

function optionInScope(option: ModuleOption, scope: ReturnType<typeof authoredScope>): boolean {
  if (scope.universityIds.size && !scope.universityIds.has(normalized(option.universityId))) return false
  if (!scope.yearKeys.size && !scope.yearNumbers.size) return true
  return scope.yearKeys.has(normalized(option.yearId))
    || scope.yearKeys.has(normalized(option.yearLabel))
    || (numericYear(option.yearLabel) !== null && scope.yearNumbers.has(numericYear(option.yearLabel)!))
}

/** Resolve authored module IDs and path heads into the faculty's visible names. */
export function contentModuleLabels(item: ManagedContentItem, catalogue: University[]): ContentModuleLabel[] {
  const options: ModuleOption[] = catalogue.flatMap((university) => university.years.flatMap((year) => year.courses.map((course, index) => ({
    id: course.moduleId ?? defaultModuleId(course.name, index + 1),
    label: course.name,
    group: `${university.short} › ${year.year}`,
    universityId: university.id,
    yearId: year.id,
    yearLabel: year.year,
  }))))
  const byId = new Map<string, typeof options>()
  const byLabel = new Map<string, typeof options>()
  for (const option of options) {
    byId.set(option.id, [...(byId.get(option.id) ?? []), option])
    const labelKey = option.label.trim().toLowerCase()
    byLabel.set(labelKey, [...(byLabel.get(labelKey) ?? []), option])
  }
  const scope = authoredScope(item, options)

  const seen = new Set<string>()
  const labels: ContentModuleLabel[] = []
  for (const raw of itemModules(item.kind, item)) {
    const id = raw.trim()
    if (!id) continue
    const matches = byId.get(id) ?? byLabel.get(id.toLowerCase()) ?? []
    const scoped = matches.filter((option) => optionInScope(option, scope))
    const chosen = scoped.length === 1 ? scoped[0] : undefined
    const key = chosen ? `${chosen.id}::${chosen.label}` : id.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    if (chosen) {
      labels.push({ id: chosen.id, label: chosen.label, context: chosen.group, known: true })
      continue
    }
    if (!matches.length) {
      labels.push({ id, label: id, context: 'This module is not present in the current university catalogue.', known: false })
      continue
    }
    if (!scoped.length && (scope.universityIds.size || scope.yearKeys.size || scope.yearNumbers.size)) {
      labels.push({
        id,
        label: id,
        context: `This module exists in ${[...new Set(matches.map((option) => option.group))].join(' · ')}, but not in the item's selected university/year.`,
        known: false,
      })
      continue
    }
    labels.push({
      id,
      label: id,
      context: `This module matches multiple catalogue entries (${[...new Set(scoped.map((option) => option.group))].join(' · ')}). Add or correct the item's university and year scope.`,
      known: false,
    })
  }
  return labels
}
