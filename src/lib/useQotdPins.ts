import { useCallback } from 'react'
import { usePersistentState } from './usePersistentState'
import { QOTD_PINS_KEY } from '@/data/qotdTypes'
import type { QotdPins } from '@/data/qotdSelection'

export type { QotdPins } from '@/data/qotdSelection'

/**
 * Admin overrides for the Question of the Day selector.
 *
 * Backed by the shared `synapse-qotd-pins-v1` app_state document — the same
 * key `GET /api/qotd/today` reads on the server — so a pin set here is what a
 * student's cohort sees, live or demo. `cohortKey → isoDate → questionId`.
 */
export function useQotdPins() {
  const [pins, setPins] = usePersistentState<QotdPins>(QOTD_PINS_KEY, {})

  const setPin = useCallback((cohort: string, isoDate: string, questionId: string) => {
    setPins((current) => ({
      ...current,
      [cohort]: { ...current[cohort], [isoDate]: questionId },
    }))
  }, [setPins])

  const clearPin = useCallback((cohort: string, isoDate: string) => {
    setPins((current) => {
      if (!current[cohort]?.[isoDate]) return current
      const { [isoDate]: _removed, ...restDates } = current[cohort]
      const next = { ...current, [cohort]: restDates }
      if (Object.keys(restDates).length === 0) delete next[cohort]
      return next
    })
  }, [setPins])

  return { pins, setPin, clearPin }
}
