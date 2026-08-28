import { useMemo } from 'react'
import { useIdentity } from './useIdentity'
import { itemWritableBy, type ScopedKind } from '@/data/contentScope'
import type { ManagedContentItem } from '@/data/contentControl'
import type { Concept } from '@/data/conceptGraph'

/**
 * The content this person may actually work on.
 *
 * A reviewer scoped to one module should not scroll a catalogue they cannot
 * edit and discover the boundary only when a save is refused. The server is
 * still what enforces this; the filter is what makes the console usable.
 *
 * Everyone unscoped — editors, super admins, and the demo build — gets the list
 * back untouched, by identity rather than by a new copy, so this costs nothing
 * for every other role.
 */
export function useScopedItems(items: ManagedContentItem[]): ManagedContentItem[] {
  const { contentScope } = useIdentity()
  return useMemo(
    () => (contentScope ? items.filter((item) => itemWritableBy(contentScope, item.kind as ScopedKind, item)) : items),
    [contentScope, items],
  )
}

export function useScopedConcepts(concepts: Concept[]): Concept[] {
  const { contentScope } = useIdentity()
  return useMemo(
    () => (contentScope ? concepts.filter((concept) => itemWritableBy(contentScope, 'concept', concept)) : concepts),
    [concepts, contentScope],
  )
}
