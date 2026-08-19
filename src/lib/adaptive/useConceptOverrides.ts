/**
 * The student's say over their own scope.
 *
 * Autonomy is a stated principle of the product, and a principle that only
 * exists in a settings page nobody can act on is decoration. A student who knows
 * a concept is not on their exam can take it out of scope; one who wants to
 * defer something can snooze it.
 *
 * Neither deletes evidence. Overrides change **what selection may offer**, and
 * nothing else — so setting a concept back to normal restores its state exactly,
 * because the state was never touched.
 */

import { useCallback } from 'react'
import { usePersistentState } from '@/lib/usePersistentState'

/** Dotted, so `isUserOwnedState` routes it to the student's own record. */
export const CONCEPT_OVERRIDE_STORAGE_KEY = 'synapse.progress.adaptive.overrides.v1'

export type OverrideMode = 'normal' | 'snoozed' | 'out-of-scope'

export interface ConceptOverride {
  mode: OverrideMode
  at: string
  /** When a snooze expires. Null for the other modes. */
  until: string | null
}

export type OverrideLedger = Record<string, ConceptOverride>

/** How long a snooze lasts before the concept returns on its own. */
export const SNOOZE_DAYS = 14

export function useConceptOverrides(): [
  OverrideLedger,
  (conceptId: string, mode: OverrideMode) => void,
] {
  const [overrides, setOverrides] = usePersistentState<OverrideLedger>(CONCEPT_OVERRIDE_STORAGE_KEY, {})

  const set = useCallback((conceptId: string, mode: OverrideMode) => {
    setOverrides((current) => {
      if (mode === 'normal') {
        const next = { ...current }
        delete next[conceptId]
        return next
      }
      const at = new Date().toISOString()
      return {
        ...current,
        [conceptId]: {
          mode,
          at,
          // A snooze expires by itself. An indefinite one becomes a concept the
          // student quietly never sees again, which is the opposite of a
          // considered decision to defer something.
          until: mode === 'snoozed'
            ? new Date(Date.now() + SNOOZE_DAYS * 86_400_000).toISOString()
            : null,
        },
      }
    })
  }, [setOverrides])

  return [overrides, set]
}

/** Concepts the student has taken off their blueprint entirely. */
export function outOfScopeConcepts(overrides: OverrideLedger): Set<string> {
  return new Set(
    Object.entries(overrides)
      .filter(([, override]) => override.mode === 'out-of-scope')
      .map(([conceptId]) => conceptId),
  )
}

/**
 * Concepts currently deferred.
 *
 * An expired snooze is simply not returned, rather than being cleaned up on
 * read: a read that writes is a read that fights with every other tab the
 * student has open.
 */
export function snoozedConcepts(overrides: OverrideLedger, now = new Date()): Set<string> {
  return new Set(
    Object.entries(overrides)
      .filter(([, override]) =>
        override.mode === 'snoozed' && (!override.until || new Date(override.until).getTime() > now.getTime()))
      .map(([conceptId]) => conceptId),
  )
}
