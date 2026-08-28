/**
 * What to study now: due cards before new ones, under the day's caps.
 *
 * Due comes first for the reason `decks.ts` already gives — a pile of overdue
 * reviews buried under fresh material is how a deck gets abandoned. The caps are
 * per deck (Anki's model), and "how many have I already seen today" is read
 * straight off the review log rather than kept in a second counter that could
 * drift from it: a grade whose `localDay` is today counts, split into new versus
 * review by the state the card was in when it was answered. One source of truth.
 */

import type { CardMeta, ReviewEvent } from './model.ts'
import { isDue } from '../srs.ts'
import { isStudyEligible } from './status.ts'
import { localDay } from './time.ts'

export interface QueueConfig {
  newPerDay: number
  maxReviewsPerDay: number
}

export interface SeenToday {
  newSeen: number
  reviewsSeen: number
}

export interface QueueEntry {
  id: string
  meta: CardMeta
}

/** Count today's grades for a deck, split into new-card and review answers. */
export function seenTodayFromEvents(events: ReviewEvent[], deckId: string, now: Date): SeenToday {
  const today = localDay(now)
  let newSeen = 0
  let reviewsSeen = 0
  for (const event of events) {
    if (event.kind !== 'grade' || event.deckId !== deckId || event.localDay !== today) continue
    if (event.stateBefore === 'new') newSeen++
    else reviewsSeen++
  }
  return { newSeen, reviewsSeen }
}

/**
 * The ordered card ids to study, due first then new, each bounded by what the
 * day's cap leaves after what has already been seen. Suspended and buried cards
 * are excluded by `isStudyEligible`, so a queue never offers a card study would
 * refuse to show.
 */
export function buildQueue(entries: QueueEntry[], now: Date, config: QueueConfig, seen: SeenToday): string[] {
  const eligible = entries.filter((entry) => isStudyEligible(entry.meta, now))
  const due = eligible.filter((entry) => entry.meta.schedule.state !== 'new' && isDue(entry.meta.schedule, now))
  const fresh = eligible.filter((entry) => entry.meta.schedule.state === 'new')

  const reviewRoom = Math.max(0, config.maxReviewsPerDay - seen.reviewsSeen)
  const newRoom = Math.max(0, config.newPerDay - seen.newSeen)

  return [...due.slice(0, reviewRoom).map((e) => e.id), ...fresh.slice(0, newRoom).map((e) => e.id)]
}

/** How large this session will be, for the deck dashboard's estimate. */
export function estimatedSessionSize(entries: QueueEntry[], now: Date, config: QueueConfig, seen: SeenToday): number {
  return buildQueue(entries, now, config, seen).length
}
