import { useCallback } from 'react'
import { migrateLegacyLocalKey, usePersistentState } from './usePersistentState'
import {
  LEGACY_MASTERY_STORAGE_KEY, MASTERY_STORAGE_KEY, recordEvidence,
  type EvidenceInput, type MasteryLedger,
} from '@/data/mastery'

migrateLegacyLocalKey(LEGACY_MASTERY_STORAGE_KEY, MASTERY_STORAGE_KEY)

/**
 * Read and add to the concept mastery ledger.
 *
 * `record` stamps the time here rather than in `recordEvidence`, which stays
 * pure and therefore testable. Call it once per answered item, from the handler
 * that reveals the answer — calling it during render would record an attempt
 * every time React re-ran the component.
 */
export function useMastery() {
  const [ledger, setLedger] = usePersistentState<MasteryLedger>(MASTERY_STORAGE_KEY, {})

  const record = useCallback((input: Omit<EvidenceInput, 'at'>) => {
    setLedger((current) => recordEvidence(current, { ...input, at: new Date().toISOString() }))
  }, [setLedger])

  return { ledger, record }
}
