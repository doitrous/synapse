// src/data/qotdSelection.ts
import { hash32, cohortKey, dayNumber } from './qotdCohort.ts'
import { seededRandom, shuffle } from './seededRandom.ts'

export interface QotdCohort {
  universityId: string
  /** Year LABEL, e.g. "Year 2". */
  year: string
  /** Year ID content is tagged with, e.g. "KAU_Y2". */
  yearId: string
}

export interface QotdCandidate {
  id: string
  /** Ledger tag `questionData.tags.universityIds`. Empty = un-scoped (any university). */
  universityIds: string[]
  /** Ledger tag `questionData.tags.years` (year IDs). Empty = un-scoped (any year). */
  yearIds: string[]
}

/** cohortKey → isoDate → questionId. */
export type QotdPins = Record<string, Record<string, string>>

/** Below this many scoped candidates, relevance loses to having a question at all. */
export const MIN_POOL = 8

function matchesCohort(candidate: QotdCandidate, cohort: QotdCohort): boolean {
  const uniOk = candidate.universityIds.length === 0 || candidate.universityIds.includes(cohort.universityId)
  const yearOk = candidate.yearIds.length === 0 || candidate.yearIds.includes(cohort.yearId)
  return uniOk && yearOk
}

/**
 * Narrow the pool to this cohort by curriculum tags, but never below MIN_POOL:
 * a thin cohort is better served a slightly off-target question than none.
 */
export function scopeCandidates(candidates: QotdCandidate[], cohort: QotdCohort): QotdCandidate[] {
  const scoped = candidates.filter((c) => matchesCohort(c, cohort))
  return scoped.length >= MIN_POOL ? scoped : candidates
}

/**
 * Today's question id for a cohort: an admin pin wins; otherwise a cohort-seeded
 * shuffle indexed by day-number, so the cohort cycles its whole pool before any
 * repeat. Returns null only when the pool is empty.
 */
export function selectQotdId(
  candidates: QotdCandidate[],
  cohort: QotdCohort,
  isoDate: string,
  pins?: QotdPins,
): string | null {
  const pool = scopeCandidates(candidates, cohort)
  if (pool.length === 0) return null

  const pinned = pins?.[cohortKey(cohort)]?.[isoDate]
  if (pinned && pool.some((c) => c.id === pinned)) return pinned

  const deck = shuffle(pool, seededRandom(hash32(cohortKey(cohort))))
  const index = ((dayNumber(isoDate) % deck.length) + deck.length) % deck.length
  return deck[index].id
}
