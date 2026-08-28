import type { CurriculumScope } from '@/data/curriculumFilters'

/** One quick-status tab. `count` is optional — omit it while a page is still loading. */
export interface StatusTabOption {
  id: string
  label: string
  count?: number
}

export interface SecondaryFilterOption {
  id: string
  label: string
}

/**
 * One secondary facet, rendered inside the "More filters" sheet.
 *
 * `type: 'single'` behaves like a radio group (an implicit "All" clears it —
 * pick medium, priority, that kind of thing). `type: 'multi'` (the default)
 * lets any number of options be active at once (content type, tags).
 */
export interface SecondaryFilterDef {
  id: string
  label: string
  type?: 'single' | 'multi'
  options: SecondaryFilterOption[]
}

/** `{ [facetId]: selectedOptionIds[] }`. A 'single' facet holds at most one id. */
export type SecondaryFilterValue = Record<string, string[]>

export type { CurriculumScope as CascadingScopeValue }

export interface ActiveFilterChip {
  /** Stable, unique-within-the-bar key (used as the React key). */
  key: string
  label: string
  onRemove: () => void
}

/**
 * Toggle one option of one secondary facet on/off, returning a new value.
 * `'single'` facets behave as a radio group (selecting the active option
 * again clears it); `'multi'` facets (the default) toggle independently.
 * A facet with no selected options is dropped from the record entirely
 * rather than left as `[]`, so callers only ever see facets that are
 * actually active.
 */
export function toggleSecondaryFilterOption(
  value: SecondaryFilterValue,
  def: SecondaryFilterDef,
  optionId: string,
): SecondaryFilterValue {
  const current = value[def.id] ?? []
  const single = (def.type ?? 'multi') === 'single'
  const next = single
    ? (current[0] === optionId ? [] : [optionId])
    : (current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId])

  const nextValue = { ...value }
  if (next.length === 0) delete nextValue[def.id]
  else nextValue[def.id] = next
  return nextValue
}
