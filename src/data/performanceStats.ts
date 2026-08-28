import type { AttemptRecord } from './attempts.ts'
import { bySession } from './attemptStats.ts'

/**
 * The metrics `attemptStats` deliberately leaves out: anything that needs a
 * peer to compare against, or a clock that runs outside the attempt log.
 *
 * `attemptStats` was written when the app had no cohort aggregate anywhere —
 * true at the time, no longer true. `/api/leaderboards` now publishes real
 * peer accuracy for students with enough server-verified evidence, and the
 * Build Maristanas heartbeat now records real active-study minutes across
 * every study surface. This file is where those two feeds turn into figures a
 * student can read, kept apart from `attemptStats` so a page that only wants
 * the attempt log never has to know either feed exists.
 *
 * Every function here stays pure: given the same inputs it returns the same
 * output, and nothing reaches into storage, the clock, or the network itself.
 * The caller supplies the peer distribution and the heartbeat total; this file
 * only computes with them.
 */

/** Median of a numeric distribution, or null when it is empty. */
export function medianOf(values: number[]): number | null {
  if (!values.length) return null
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

export interface PercentileStanding {
  /**
   * 0-100. The share of the peer distribution at or below the student's own
   * value. A tie counts as half a step, so a value exactly at the peer median
   * lands near the 50th percentile rather than being pushed to one side of it.
   */
  percentile: number
  /** Median of the peer distribution, in the same units as `value`. */
  peerMedian: number
  /** How many peer scores the standing was computed from. */
  peerCount: number
}

/**
 * Where one value sits inside a peer distribution.
 *
 * Returns null rather than a percentile of 0 or 100 when there is no peer
 * evidence at all — an empty distribution says nothing about standing, and a
 * number here would be read as "you beat everyone" or "you beat no one" when
 * the true answer is "nobody comparable has been measured yet".
 */
export function percentileStanding(value: number, peers: number[]): PercentileStanding | null {
  if (!peers.length) return null
  const below = peers.filter((peer) => peer < value).length
  const tied = peers.filter((peer) => peer === value).length
  const percentile = Math.round(((below + tied / 2) / peers.length) * 100)
  return { percentile, peerMedian: medianOf(peers)!, peerCount: peers.length }
}

/**
 * Mean seconds per timed answer, or null when nothing was timed.
 *
 * Distinct from `attemptStats.medianSeconds`: a median resists one very slow
 * or very fast outlier, which is exactly why the existing "pace" tile uses it.
 * An average is asked for here on its own terms, as the more familiar "how
 * long does a question take me" figure — the two are shown side by side, not
 * as substitutes for each other.
 */
export function averageSecondsPerQuestion(records: AttemptRecord[]): number | null {
  const timed = records
    .map((record) => record.seconds)
    .filter((seconds): seconds is number => typeof seconds === 'number' && seconds >= 0)
  if (!timed.length) return null
  return Math.round(timed.reduce((sum, seconds) => sum + seconds, 0) / timed.length)
}

/**
 * Records whose timestamp falls in the last `days` days, ending `now`.
 *
 * A plain age filter, kept here rather than inlined so the window a study
 * breakdown reports on and the window it is labelled with can never drift.
 */
export function withinLastDays(records: AttemptRecord[], days: number, now = new Date()): AttemptRecord[] {
  const cutoff = now.getTime() - days * 86_400_000
  return records.filter((record) => new Date(record.at).getTime() >= cutoff)
}

/**
 * Total seconds actually spent solving, across every sitting in `records`.
 *
 * Delegates to `attemptStats.bySession`, which already picks the recorded
 * whole-sitting duration over a sum of per-question timings when both exist —
 * the same rule a session's own detail page reports against. Recomputing that
 * rule here would only let the two drift apart.
 */
export function solvingSecondsTotal(records: AttemptRecord[]): number {
  return bySession(records).reduce((sum, session) => sum + session.seconds, 0)
}

export interface StudyTimeBreakdown {
  /** The window these averages are computed over. */
  windowDays: number
  /** Average minutes per day spent solving Question Bank items, from the attempt log. Never null. */
  solvingMinutesPerDay: number
  /**
   * Average minutes per day of active study across every surface — reading,
   * flashcards, cases, notebook work and solving alike — from the Build
   * Maristanas heartbeat. Null when that feed has not loaded or is unreachable.
   */
  studyingMinutesPerDay: number | null
  /**
   * Average minutes per day spent on everything that is not solving a
   * Question Bank item: reading, and every other active-study surface the
   * heartbeat tracks. An estimate — `studyingMinutesPerDay` minus
   * `solvingMinutesPerDay`, floored at zero — because no signal in this
   * product isolates reading time on its own. Null under the same condition
   * as `studyingMinutesPerDay`.
   */
  readingMinutesPerDay: number | null
}

/**
 * Split average daily study time into solving and everything else.
 *
 * `windowRecords` must already be filtered to the same window
 * `totalStudyMinutesInWindow` covers (see `withinLastDays`), or the
 * subtraction compares two different periods and the reading estimate means
 * nothing. `totalStudyMinutesInWindow` is the Build Maristanas heartbeat total
 * for that window — pass null when it is not available, which leaves the
 * reading and studying averages null rather than guessed at.
 */
export function studyTimeBreakdown(
  windowRecords: AttemptRecord[],
  windowDays: number,
  totalStudyMinutesInWindow: number | null,
): StudyTimeBreakdown {
  const solvingMinutesPerDay = solvingSecondsTotal(windowRecords) / 60 / windowDays
  const studyingMinutesPerDay = totalStudyMinutesInWindow == null ? null : totalStudyMinutesInWindow / windowDays
  const readingMinutesPerDay = totalStudyMinutesInWindow == null
    ? null
    : Math.max(0, totalStudyMinutesInWindow / windowDays - solvingMinutesPerDay)
  return { windowDays, solvingMinutesPerDay, studyingMinutesPerDay, readingMinutesPerDay }
}
