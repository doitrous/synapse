/**
 * What state a card is in, and how a deck's cards divide across those states.
 *
 * The dashboard shows ten measures — New, Learning, Review due, Mature, Young,
 * Learned, Unseen, Buried, Suspended, Total — and several of them deliberately
 * overlap: a card can be both New and Unseen, both Review-due and Young. Those
 * are analytical cuts of the same deck, so their percentages are all taken over
 * `total` and are never implied to sum to 100. The Card Counts chart needs the
 * opposite — a mutually exclusive partition — so `exclusiveStatus` is a separate
 * function with an explicit precedence, and the two never share a code path.
 *
 * The 21-day young/mature boundary, the due test, and the definitions of
 * Learned and Unseen all live here as pure functions so they can be pinned by
 * tests and can't drift between the dashboard, the browser and the stats.
 */

import { isDue } from '../srs.ts'
import type { CardMeta } from './model.ts'
import { localDay } from './time.ts'

/** Anki's own boundary: a review card is mature once its interval reaches 21 days. */
export const MATURE_THRESHOLD_DAYS = 21

/** True while the card is hidden by a bury that today has not yet rolled past. */
export function isBuried(meta: CardMeta, now: Date): boolean {
  return meta.buriedUntil !== null && localDay(now) < meta.buriedUntil
}

/** Never answered, no history at all. Overlaps New but is not the same thing. */
export function isUnseen(meta: CardMeta): boolean {
  return meta.reviewCount === 0
}

/** At least one completed review and not reset since. Overlaps every live state. */
export function isLearned(meta: CardMeta): boolean {
  return meta.reviewCount >= 1 && !meta.resetSinceReview
}

/** A review-state card whose interval has not yet reached the mature boundary. */
export function isYoung(meta: CardMeta): boolean {
  return meta.schedule.state === 'review' && meta.schedule.interval < MATURE_THRESHOLD_DAYS
}

export function isMature(meta: CardMeta): boolean {
  return meta.schedule.state === 'review' && meta.schedule.interval >= MATURE_THRESHOLD_DAYS
}

/**
 * A review-state card that is due or overdue and actually showable — a
 * suspended or buried card is not "review due" however overdue its schedule is,
 * because it will not be shown. The dashboard's "Review due" count is a promise
 * about what study will offer, so it excludes what study will skip.
 */
export function isReviewDue(meta: CardMeta, now: Date): boolean {
  return (
    meta.schedule.state === 'review' &&
    isDue(meta.schedule, now) &&
    !meta.suspended &&
    !isBuried(meta, now)
  )
}

/**
 * Whether study would offer this card at all right now (before the daily caps).
 * Suspended and buried cards are out; everything new or due is in.
 */
export function isStudyEligible(meta: CardMeta, now: Date): boolean {
  if (meta.suspended || isBuried(meta, now)) return false
  if (meta.schedule.state === 'new') return true
  return isDue(meta.schedule, now)
}

/** The ten overlapping dashboard measures for a single card. */
export interface StatusFlags {
  isNew: boolean
  learning: boolean
  reviewDue: boolean
  young: boolean
  mature: boolean
  learned: boolean
  unseen: boolean
  buried: boolean
  suspended: boolean
}

export function statusFlags(meta: CardMeta, now: Date): StatusFlags {
  const state = meta.schedule.state
  return {
    isNew: state === 'new',
    learning: state === 'learning' || state === 'relearning',
    reviewDue: isReviewDue(meta, now),
    young: isYoung(meta),
    mature: isMature(meta),
    learned: isLearned(meta),
    unseen: isUnseen(meta),
    buried: isBuried(meta, now),
    suspended: meta.suspended,
  }
}

/** Every dashboard count, plus the total that is their shared denominator. */
export interface DeckCounts {
  total: number
  new: number
  learning: number
  reviewDue: number
  young: number
  mature: number
  learned: number
  unseen: number
  buried: number
  suspended: number
}

export function deckCounts(metas: CardMeta[], now: Date): DeckCounts {
  const counts: DeckCounts = {
    total: metas.length,
    new: 0,
    learning: 0,
    reviewDue: 0,
    young: 0,
    mature: 0,
    learned: 0,
    unseen: 0,
    buried: 0,
    suspended: 0,
  }
  for (const meta of metas) {
    const f = statusFlags(meta, now)
    if (f.isNew) counts.new++
    if (f.learning) counts.learning++
    if (f.reviewDue) counts.reviewDue++
    if (f.young) counts.young++
    if (f.mature) counts.mature++
    if (f.learned) counts.learned++
    if (f.unseen) counts.unseen++
    if (f.buried) counts.buried++
    if (f.suspended) counts.suspended++
  }
  return counts
}

/**
 * The mutually exclusive bucket for the Card Counts chart. Suspended and buried
 * win over the scheduling state, because a suspended-yet-mature card must not be
 * drawn in both the Mature and Suspended segments of a chart whose segments are
 * supposed to partition the deck exactly once.
 */
export type ExclusiveStatus =
  | 'new'
  | 'learning'
  | 'relearning'
  | 'young'
  | 'mature'
  | 'suspended'
  | 'buried'

export function exclusiveStatus(meta: CardMeta, now: Date): ExclusiveStatus {
  if (meta.suspended) return 'suspended'
  if (isBuried(meta, now)) return 'buried'
  switch (meta.schedule.state) {
    case 'new':
      return 'new'
    case 'learning':
      return 'learning'
    case 'relearning':
      return 'relearning'
    case 'review':
      return meta.schedule.interval >= MATURE_THRESHOLD_DAYS ? 'mature' : 'young'
  }
}

export type ExclusiveCounts = Record<ExclusiveStatus, number>

export function exclusiveCounts(metas: CardMeta[], now: Date): ExclusiveCounts {
  const counts: ExclusiveCounts = {
    new: 0,
    learning: 0,
    relearning: 0,
    young: 0,
    mature: 0,
    suspended: 0,
    buried: 0,
  }
  for (const meta of metas) counts[exclusiveStatus(meta, now)]++
  return counts
}
