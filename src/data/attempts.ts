import type { Difficulty } from './qbank'

/**
 * What a student actually did, item by item.
 *
 * The mastery ledger answers "how well do they know this concept". It cannot
 * answer "how many questions this week", "at what hour do they study", or "is
 * their accuracy on hard items falling", because it folds every attempt into a
 * running total the moment it is recorded. Those questions need the individual
 * events, so this is the raw log and `attemptStats` is where it is read.
 *
 * Nothing here is a metric. A number shown to a student must be derivable from
 * these records, or it does not get shown.
 */

/** Which runner produced the record. */
export type AttemptSurface = 'qbank' | 'case' | 'lab' | 'station' | 'room'

export interface AttemptRecord {
  id: string
  /** ISO timestamp of when the answer was committed. */
  at: string
  surface: AttemptSurface
  itemId: string
  subjectId: string
  topic: string
  difficulty: Difficulty
  /** Concepts the item assessed — the same set the mastery ledger receives. */
  conceptIds: string[]
  /**
   * Null when nobody marked the work.
   *
   * A station is ticked by the student against a checklist, so it is evidence
   * of practice and says nothing about correctness. Storing `false` there would
   * quietly drag every accuracy figure down; storing `true` would inflate it.
   */
  correct: boolean | null
  /** Null when the item was untimed. */
  seconds: number | null
  /** Groups the records made in one sitting, so a session can be replayed. */
  sessionId: string
}

/**
 * One month of records.
 *
 * `usePersistentState` rewrites a whole document on every change, so a single
 * flat log would re-upload the entire history on every answer — about a
 * megabyte once a student passes five thousand questions. A month is small
 * enough to rewrite cheaply and large enough that the index rarely grows.
 */
export interface AttemptMonth {
  version: 1
  month: string
  records: AttemptRecord[]
}

export interface AttemptTotals {
  attempts: number
  /** Attempts that were marked against a key — the denominator for accuracy. */
  marked: number
  correct: number
  lastAt: string | null
}

/** The headline numbers, readable without loading a single month shard. */
export interface AttemptIndex {
  version: 1
  months: string[]
  totals: AttemptTotals
}

export const ATTEMPT_INDEX_KEY = 'synapse.progress.attemptIndex.v1'

/** `YYYY-MM` — the shard a timestamp belongs to. */
export function attemptMonth(at: string | Date): string {
  const date = typeof at === 'string' ? new Date(at) : at
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function attemptMonthKey(month: string): string {
  return `synapse.progress.attempts.${month}`
}

export const EMPTY_INDEX: AttemptIndex = {
  version: 1,
  months: [],
  totals: { attempts: 0, marked: 0, correct: 0, lastAt: null },
}

export function emptyMonth(month: string): AttemptMonth {
  return { version: 1, month, records: [] }
}

/**
 * Add a record to its month, refusing an exact duplicate.
 *
 * React may run an event handler's state updater more than once, and a runner
 * that re-checks an already-checked answer must not log it twice. The id is
 * built from the surface, the item and the session, so a genuine second attempt
 * at the same question in a later session is a different record.
 */
export function addAttempt(month: AttemptMonth, record: AttemptRecord): AttemptMonth {
  if (month.records.some((existing) => existing.id === record.id)) return month
  return { ...month, records: [...month.records, record] }
}

export function attemptId(record: Pick<AttemptRecord, 'surface' | 'itemId' | 'sessionId'>): string {
  return `${record.sessionId}:${record.surface}:${record.itemId}`
}

/** Fold a record into the index, so headline totals never need a shard read. */
export function indexAttempt(index: AttemptIndex, record: AttemptRecord): AttemptIndex {
  const month = attemptMonth(record.at)
  return {
    version: 1,
    months: index.months.includes(month) ? index.months : [...index.months, month].sort(),
    totals: {
      attempts: index.totals.attempts + 1,
      marked: index.totals.marked + (record.correct === null ? 0 : 1),
      correct: index.totals.correct + (record.correct === true ? 1 : 0),
      lastAt: !index.totals.lastAt || record.at > index.totals.lastAt ? record.at : index.totals.lastAt,
    },
  }
}

/** The last `count` months ending at `from`, newest last. */
export function recentMonths(count: number, from = new Date()): string[] {
  const months: string[] = []
  for (let back = count - 1; back >= 0; back--) {
    const date = new Date(from.getFullYear(), from.getMonth() - back, 1)
    months.push(attemptMonth(date))
  }
  return months
}
