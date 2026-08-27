import type { ManagedContentItem } from './contentControl.ts'
import type { University } from './universities.ts'
import { contentModuleLabels } from './contentModules.ts'
import { getSubject } from './subjects.ts'
import { contentTagsOf } from './contentTags.ts'

/**
 * The filterable "tags" a content item carries, unified across three sources
 * the catalogue already knows: its curriculum module, its subject, and its
 * free-form editorial tags. This is what "filter by tags (by module etc)"
 * means in the admin — one picker over all of them, no data migration, because
 * modules and subjects are derived from the item, not stored as labels.
 */
export type FacetType = 'module' | 'subject' | 'tag' | 'flag'

export interface Facet {
  type: FacetType
  /** Stable identity within its type (module label, subject id, tag text). */
  value: string
  /** What the picker and chips show. */
  label: string
  /** Optional swatch (subjects). */
  color?: string
}

/** One opaque key that identifies a facet across types without collisions. */
export function facetToken(type: FacetType, value: string): string {
  return `${type}:${value.trim().toLowerCase()}`
}

export function facetKey(facet: Facet): string {
  return facetToken(facet.type, facet.value)
}

/**
 * Every facet token an item matches, for ANY-of selection: an item is kept
 * when it shares at least one token with the chosen set. A module-less item
 * carries the `flag:no-module` token so "Needs module" can surface it.
 */
export function itemFacetTokens(item: ManagedContentItem, catalogue: University[]): Set<string> {
  const tokens = new Set<string>()
  const modules = contentModuleLabels(item, catalogue)
  for (const module of modules) tokens.add(facetToken('module', module.label))
  if (modules.length === 0) tokens.add(facetToken('flag', 'no-module'))
  if (item.subjectId) tokens.add(facetToken('subject', item.subjectId))
  for (const tag of contentTagsOf(item)) tokens.add(facetToken('tag', tag))
  return tokens
}

export interface FacetGroups {
  modules: Facet[]
  subjects: Facet[]
  tags: Facet[]
}

/**
 * The distinct facets present across the given items, grouped and ordered for
 * a picker. Only facets something actually has are offered, so the list can
 * never suggest a filter that returns nothing.
 */
export function availableFacets(items: readonly ManagedContentItem[], catalogue: University[]): FacetGroups {
  const modules = new Map<string, Facet>()
  const subjects = new Map<string, Facet>()
  const tags = new Map<string, Facet>()

  for (const item of items) {
    for (const module of contentModuleLabels(item, catalogue)) {
      modules.set(facetToken('module', module.label), { type: 'module', value: module.label, label: module.label })
    }
    if (item.subjectId) {
      const subject = getSubject(item.subjectId)
      subjects.set(facetToken('subject', subject.id), { type: 'subject', value: subject.id, label: subject.name, color: subject.color })
    }
    for (const tag of contentTagsOf(item)) {
      tags.set(facetToken('tag', tag), { type: 'tag', value: tag, label: tag })
    }
  }

  const byLabel = (left: Facet, right: Facet) => left.label.localeCompare(right.label, undefined, { sensitivity: 'base' })
  return {
    modules: [...modules.values()].sort(byLabel),
    subjects: [...subjects.values()].sort(byLabel),
    tags: [...tags.values()].sort(byLabel),
  }
}

/** True when the item matches at least one selected facet (ANY-of). */
export function itemMatchesFacets(tokens: Set<string>, selected: ReadonlySet<string>): boolean {
  if (selected.size === 0) return true
  for (const token of selected) if (tokens.has(token)) return true
  return false
}
