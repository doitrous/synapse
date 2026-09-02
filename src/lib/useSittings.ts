import { useCallback } from 'react'
import { usePersistentState } from './usePersistentState'
import {
  EMPTY_SITTINGS,
  SITTINGS_STORAGE_KEY,
  forgetSitting,
  recordSitting,
  type Sitting,
  type SittingsDoc,
} from '@/data/sittings'

/**
 * The student's ledger of tests sat, of every kind.
 *
 * Only the filing lives here; the shape of a sitting and the rules for keeping
 * them are in `src/data/sittings.ts` and are pure.
 */
export function useSittings() {
  const [doc, setDoc] = usePersistentState<SittingsDoc>(SITTINGS_STORAGE_KEY, EMPTY_SITTINGS)

  const record = useCallback((sitting: Sitting) => {
    setDoc((current) => recordSitting(current, sitting))
  }, [setDoc])

  const forget = useCallback((id: string) => {
    setDoc((current) => forgetSitting(current, id))
  }, [setDoc])

  return { sittings: doc.sittings ?? [], record, forget }
}
