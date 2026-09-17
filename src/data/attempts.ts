import type { Difficulty } from './qbank'
import type { QuestionSource } from './questionSource.ts'

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
export type AttemptSurface = 'qbank' | 'case' | 'lab' | 'station' | 'room' | 'card' | 'essay'

export interface AttemptRecord {
  id: string
  /** ISO timestamp of when the answer was committed (this device's clock). */
  at: string
  /**
   * The server's receipt time (epoch ms), stamped once the verified POST is
   * acknowledged. The attempt log is synced across a student's devices, so
   * ordering by the per-device `at` misorders when two devices' clocks disagree
   * (a wrong answer on one device can look "later" than a right one on another).
   * The server is a single clock, so ordering by `serverAt` — see `attemptOrder`
   * — is device-independent. Absent until confirmed, and on legacy records.
   */
  serverAt?: number
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
   *
   * A flashcard grade is the same kind of self-report, not a mark: the student
   * is saying how well they knew the card, not confirming a keyed answer. Good
   * and Again are recorded here as `null` for the same reason a station is —
   * `true` for Good and `false` for Again would look reasonable and quietly
   * corrupt every accuracy figure in the app with self-graded data.
   *
   * An essay answer is marked the same way, by the student who wrote it, so it
   * is recorded the same way: `null`, not a verdict.
   */
  correct: boolean | null
  /** Null when the item was untimed. */
  seconds: number | null
  /**
   * The option the student chose and the keyed option at the time of marking.
   *
   * Optional for backward compatibility with the existing local attempt
   * shards. Keeping both lets a previous test explain the student's reasoning
   * without trying to reconstruct a wrong choice from a boolean verdict.
   */
  selectedIndex?: number
  correctIndex?: number
  /** The most specific authored curriculum label available for this item. */
  subtopic?: string
  /**
   * The question's MCQ source, snapshotted at attempt time so per-source stats
   * stay stable even if the question is later re-tagged — the same reason
   * `subjectId` and `difficulty` are snapshotted here rather than looked up.
   */
  source?: QuestionSource
  /**
   * Whole-sitting timing, repeated on the records written at submission.
   * Legacy records have neither field and continue to use their per-question
   * timings. The report takes the maximum rather than summing duplicates.
   */
  sessionDurationSeconds?: number
  sessionOvertimeSeconds?: number
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

export const ATTEMPT_INDEX_KEY = 'nishany.progress.attemptIndex.v1'

/**
 * Device-independent ordering key for an attempt: the server's receipt time
 * once acknowledged (one clock for every device), falling back to this device's
 * commit time for attempts not yet confirmed or written before `serverAt`
 * existed. Order by this — never by raw `at` — wherever "which attempt came
 * last" decides a verdict or a transition, so a synced log can't be misordered
 * by two devices' clocks disagreeing.
 */
export function attemptOrder(record: AttemptRecord): number {
  return record.serverAt ?? Date.parse(record.at)
}

/** `YYYY-MM` — the shard a timestamp belongs to. */
export function attemptMonth(at: string | Date): string {
  const date = typeof at === 'string' ? new Date(at) : at
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function attemptMonthKey(month: string): string {
  return `nishany.progress.attempts.${month}`
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

/**
 * How long an answer took, as `seconds` wants it.
 *
 * `seconds` is null when the item was untimed, and a runner that files a
 * duration anyway does not merely add noise: `medianSeconds` reads the log as
 * "how fast under a clock", so an untimed answer mixed in is a number about
 * something else. Whether a sitting was timed is the runner's to say — a room
 * carries a `timed` flag, the Question Bank carries a mode — so it is asked for
 * rather than guessed at from the interval.
 *
 * Wall clocks are not monotonic: a device correcting its time mid-question can
 * hand back an end before the start, which would file a negative duration
 * against the question. Floored at zero, and whole seconds because that is the
 * resolution every other writer records at.
 */
export function attemptSeconds(timed: boolean, startedAtMs: number, endedAtMs: number): number | null {
  if (!timed) return null
  return Math.max(0, Math.round((endedAtMs - startedAtMs) / 1000))
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

/**
 * Drop every record from one sitting.
 *
 * A student could rename a previous test but never remove one, so a session
 * started by accident sat in their history and in their accuracy for good.
 * Returns the month unchanged when it holds nothing from that sitting, so a
 * delete writes only the shards it actually touches.
 */
export function removeSession(month: AttemptMonth, sessionId: string): AttemptMonth {
  const records = month.records.filter((record) => record.sessionId !== sessionId)
  return records.length === month.records.length ? month : { ...month, records }
}

/**
 * Take removed records back out of the headline totals.
 *
 * `lastAt` is deliberately left alone: it exists to refuse a duplicate write at
 * the same instant, and a value pointing at a deleted record can only ever fail
 * to match a fresh timestamp. Recomputing it would mean reading every shard.
 */
export function unindexAttempts(index: AttemptIndex, removed: AttemptRecord[]): AttemptIndex {
  if (!removed.length) return index
  return {
    ...index,
    totals: {
      ...index.totals,
      attempts: Math.max(0, index.totals.attempts - removed.length),
      marked: Math.max(0, index.totals.marked - removed.filter((record) => record.correct !== null).length),
      correct: Math.max(0, index.totals.correct - removed.filter((record) => record.correct === true).length),
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
