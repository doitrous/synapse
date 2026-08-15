import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { catalogueAvailability, type CatalogueAvailability } from './catalogueAvailability'

/**
 * Whether a student surface built from the content ledger has nothing to show,
 * has not loaded yet, or failed.
 *
 * Every student catalogue — library, question bank, practical — comes out of the
 * same document, and each hook that reads it dropped the load status on the
 * floor and returned a bare array. This re-reads the status for callers that
 * only have the count. Re-subscribing to a key already in the store is free:
 * entries are shared and hydration runs once.
 */
export function useCatalogueAvailability(itemCount: number): CatalogueAvailability {
  const [, , status] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  return useMemo(
    () => catalogueAvailability({ statuses: [status], itemCount }),
    [itemCount, status],
  )
}
