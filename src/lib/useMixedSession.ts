import { useCallback } from 'react'
import { usePersistentState } from './usePersistentState'
import {
  advanceMixed,
  buildMixedQueue,
  finishMixed,
  markMixed,
  mixedFinished,
  startMixedSession,
  type MixedPools,
  type MixedSession,
  type MixedSplit,
} from '@/data/mixedSession'

/**
 * The mixed sitting's own document.
 *
 * Only the queue, the cursor and what each item produced. Every answer still
 * goes to the bank that owns it — the MCQ attempt to the attempt log, the essay
 * to `useEssayAnswers`, the station to `usePracticalProgress` — so nothing here
 * is a second copy of a student's work, and clearing it loses no record.
 */
export const MIXED_SESSION_STORAGE_KEY = 'nishany.qbank.mixedSession.v1'

export interface MixedSessionApi {
  session: MixedSession | null
  /** Draw a queue and put it on screen. Returns nothing if nothing was drawn. */
  start: (pools: MixedPools, split: MixedSplit) => void
  /** Record the item on screen without leaving it. */
  mark: (correct: boolean) => void
  /** Move to the next item, or to the summary. */
  next: () => void
  /** Stop early and go straight to the summary, keeping what was done. */
  finish: () => void
  /** Throw the sitting away — after the summary, or when the student stops. */
  end: () => void
}

export function useMixedSession(): MixedSessionApi {
  const [session, setSession] = usePersistentState<MixedSession | null>(MIXED_SESSION_STORAGE_KEY, null)

  const start = useCallback((pools: MixedPools, split: MixedSplit) => {
    // The clock, not a counter: a seed has to differ between two sittings
    // built from the same selection, or the second would repeat the first.
    const seed = Date.now() >>> 0
    const items = buildMixedQueue(pools, split, seed)
    if (!items.length) return
    setSession(startMixedSession(items, seed, Date.now()))
  }, [setSession])

  const mark = useCallback((correct: boolean) => {
    setSession((current) => (current ? markMixed(current, { correct }) : current))
  }, [setSession])

  const next = useCallback(() => {
    setSession((current) => {
      if (!current) return current
      const advanced = advanceMixed(current)
      // Walking off the last item ends the sitting exactly as pressing End
      // does, so both ways out leave a document that says it is over. Without
      // this, a queue completed item by item stayed "finished but never
      // stopped" in storage and greeted the next visit with its own report.
      return mixedFinished(advanced) && !advanced.finishedAt
        ? { ...advanced, finishedAt: Date.now() }
        : advanced
    })
  }, [setSession])

  // Ending early is not discarding: every item already worked through was
  // recorded by its own bank, and the report is the only place a student can
  // see the three banks side by side. So this moves the cursor to the end
  // rather than dropping the sitting on the floor.
  const finish = useCallback(() => {
    setSession((current) => (current ? finishMixed(current, Date.now()) : current))
  }, [setSession])

  /**
   * Throw the document away.
   *
   * `null` goes through the same persisted setter as every other change, so the
   * key is cleared on the next persisted write. If the page never lives long
   * enough for that write to flush, the hub's sweep clears it on the next visit
   * — which is what makes a leftover document self-healing rather than
   * something a student has to delete by hand.
   */
  const end = useCallback(() => { setSession(null) }, [setSession])

  return { session, start, mark, next, finish, end }
}
