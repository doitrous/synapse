/**
 * Whether students see, on a revealed question, how their peers answered it.
 *
 * When on, a solved multiple-choice question shows the share of students who
 * picked each option — "40% chose C" — computed on the server from the same
 * verified attempt ledger the leaderboards already read. This is the one
 * switch a super-administrator uses to show or hide that everywhere at once.
 *
 * On by default: the peer breakdown is the feature, and this exists to hide
 * it, not to opt into it. Held in the shared, platform-wide state document
 * `nishany-answer-stats-v1` (an unprefixed key, so one admin's change reaches
 * every student's session), the same mechanism the Maristana economy and the
 * student-ID discount use.
 */

export interface AnswerStatsConfig {
  /** Whether the peer answer breakdown is shown to students on reveal. */
  enabled: boolean
}

export const ANSWER_STATS_CONFIG_KEY = 'nishany-answer-stats-v1'

export const DEFAULT_ANSWER_STATS_CONFIG: AnswerStatsConfig = { enabled: true }

/**
 * A stored document may be older than this shape, absent, or hand-edited.
 * Anything that is not an explicit `false` leaves the breakdown on, so a
 * malformed record never silently hides a feature that is on by default.
 */
export function normaliseAnswerStatsConfig(raw: unknown): AnswerStatsConfig {
  if (raw && typeof raw === 'object' && (raw as { enabled?: unknown }).enabled === false) {
    return { enabled: false }
  }
  return { enabled: true }
}
