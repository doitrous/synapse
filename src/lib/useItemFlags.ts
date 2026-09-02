import { useCallback } from 'react'
import { usePersistentState } from './usePersistentState'
import {
  EMPTY_ITEM_FLAGS,
  ITEM_FLAGS_STORAGE_KEY,
  flaggedIds,
  isFlagged,
  toggleFlag,
  type FlagKind,
  type ItemFlagsDoc,
} from '@/data/itemFlags'

/**
 * The student's flags on practical items and written questions.
 *
 * The timestamp is stamped here rather than in the fold, so `itemFlags.ts`
 * stays pure and testable — the same split `usePracticalProgress` uses.
 */
export function useItemFlags() {
  const [flags, setFlags] = usePersistentState<ItemFlagsDoc>(ITEM_FLAGS_STORAGE_KEY, EMPTY_ITEM_FLAGS)

  const toggle = useCallback((kind: FlagKind, id: string) => {
    setFlags((current) => toggleFlag(current, kind, id, new Date().toISOString()))
  }, [setFlags])

  const flagged = useCallback((kind: FlagKind, id: string) => isFlagged(flags, kind, id), [flags])
  const ids = useCallback((kind: FlagKind) => flaggedIds(flags, kind), [flags])

  return { flags, toggle, flagged, ids }
}
