import { useCallback, useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import {
  addAttempt, attemptId, attemptMonth, attemptMonthKey, ATTEMPT_INDEX_KEY, emptyMonth,
  EMPTY_INDEX, indexAttempt, recentMonths, removeSession, unindexAttempts,
  type AttemptIndex, type AttemptMonth, type AttemptRecord,
} from '@/data/attempts'

/**
 * How much history the reading hooks load.
 *
 * Fixed rather than a parameter: each month is one stored document, so the
 * number of months decides the number of `usePersistentState` calls, and that
 * has to be the same on every render. Six months covers every window the app
 * shows — the longest is the seventeen-week heatmap.
 */
export const HISTORY_MONTHS = 6

/**
 * Add to the log.
 *
 * Called from the same handler that records mastery evidence, once per item,
 * when the answer is committed. `at` is stamped here so the pure record
 * builders stay testable.
 */
export function useRecordAttempt() {
  const month = attemptMonth(new Date())
  const [, setMonth] = usePersistentState<AttemptMonth>(attemptMonthKey(month), () => emptyMonth(month))
  const [, setIndex] = usePersistentState<AttemptIndex>(ATTEMPT_INDEX_KEY, EMPTY_INDEX)

  return useCallback((input: Omit<AttemptRecord, 'id' | 'at'>) => {
    const at = new Date().toISOString()
    const record: AttemptRecord = { ...input, id: attemptId(input), at }
    // A tab left open across the turn of a month files that answer in the
    // month it was opened. Everything downstream groups by `record.at`, so the
    // figures stay right; only which document holds it differs.
    setMonth((current) => addAttempt(current, record))
    setIndex((current) => {
      // The shard refuses duplicates; the index has to refuse them too, or a
      // re-checked answer inflates the totals it feeds.
      if (current.totals.lastAt === at) return current
      return indexAttempt(current, record)
    })
  }, [setIndex, setMonth])
}

/** Headline totals, without reading a single month document. */
export function useAttemptTotals(): AttemptIndex {
  const [index] = usePersistentState<AttemptIndex>(ATTEMPT_INDEX_KEY, EMPTY_INDEX)
  return index
}

export interface AttemptHistory {
  records: AttemptRecord[]
  totals: AttemptIndex['totals']
  /** True until every month document has been read, in live mode. */
  loading: boolean
}

/* eslint-disable react-hooks/rules-of-hooks -- the month count is a module
   constant, so this loop runs a fixed number of hooks on every render. */
/**
 * The last six months of records, oldest first.
 *
 * Reading the shards separately rather than as one document is what keeps a
 * heavy student's log from being re-uploaded on every answer.
 */
export function useAttemptHistory(): AttemptHistory {
  const [index] = usePersistentState<AttemptIndex>(ATTEMPT_INDEX_KEY, EMPTY_INDEX)
  const months = useMemo(() => recentMonths(HISTORY_MONTHS), [])

  const shards: AttemptMonth[] = []
  let hydrated = true
  for (const month of months) {
    const [value, , status] = usePersistentState<AttemptMonth>(attemptMonthKey(month), () => emptyMonth(month))
    shards.push(value)
    if (!status.hydrated) hydrated = false
  }

  // The loop builds a new array every render, so the merge is keyed on what
  // actually changed: how many records each month now holds.
  const signature = shards.map((shard) => `${shard.month}:${shard.records.length}`).join('|')
  const flat = shards.flatMap((shard) => shard.records)
  const records = useMemo(
    () => [...flat].sort((a, b) => a.at.localeCompare(b.at)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [signature],
  )

  return { records, totals: index.totals, loading: !hydrated }
}

/**
 * Remove one sitting from the log.
 *
 * Opens the same fixed set of month shards as the reader, for the same reason:
 * a hook count that changes between renders is not allowed. A shard holding
 * nothing from that sitting is returned unchanged and so is never written.
 */
export function useDeleteAttemptSession() {
  const months = useMemo(() => recentMonths(HISTORY_MONTHS), [])
  const shards: AttemptMonth[] = []
  const writers: Array<(update: (current: AttemptMonth) => AttemptMonth) => void> = []
  for (const month of months) {
    const [value, setValue] = usePersistentState<AttemptMonth>(attemptMonthKey(month), () => emptyMonth(month))
    shards.push(value)
    writers.push(setValue)
  }
  const [, setIndex] = usePersistentState<AttemptIndex>(ATTEMPT_INDEX_KEY, EMPTY_INDEX)

  const signature = shards.map((shard) => `${shard.month}:${shard.records.length}`).join('|')
  const flat = shards.flatMap((shard) => shard.records)

  return useCallback((sessionId: string) => {
    const removed = flat.filter((record) => record.sessionId === sessionId)
    if (!removed.length) return
    writers.forEach((write) => write((current) => removeSession(current, sessionId)))
    setIndex((current) => unindexAttempts(current, removed))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, setIndex])
}
/* eslint-enable react-hooks/rules-of-hooks */
