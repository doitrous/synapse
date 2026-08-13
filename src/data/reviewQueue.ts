// Explicit extension so `node --test` can resolve this module directly, which
// is the convention every tested module here follows.
import { accuracy, masteryBand, type MasteryBand, type MasteryLedger } from './mastery.ts'

/**
 * What is worth revisiting, and when.
 *
 * The dashboard used to show five fixed rows — "Acute coronary syndromes · 24
 * questions · retention 44%" — identical for every student and unrelated to
 * anything they had done. This derives the queue from the only record of what
 * a student has actually demonstrated: the concept mastery ledger.
 *
 * The word "retention" is deliberately not used here. Nothing measures decay;
 * what the ledger holds is accuracy on marked answers, and calling that
 * retention would be dressing one measurement as a different one.
 */

/**
 * How long a concept stays settled before it is worth seeing again.
 *
 * Wider intervals for stronger evidence, which is the whole point of spacing.
 * A concept only met on a station has no accuracy behind it, so it comes back
 * sooner than one answered correctly three times.
 */
export const REVIEW_INTERVAL_DAYS: Record<Exclude<MasteryBand, 'unseen'>, number> = {
  shaky: 1,
  practised: 2,
  developing: 3,
  secure: 14,
}

export interface ReviewItem {
  conceptId: string
  band: Exclude<MasteryBand, 'unseen'>
  /** Accuracy on marked answers, 0–100, or null when only practised. */
  accuracyPct: number | null
  attempts: number
  /** Negative when overdue, 0 when due today. */
  dueInDays: number
  lastSeen: string
}

const DAY = 86_400_000

/**
 * Every concept that is due or overdue, most urgent first.
 *
 * Concepts never encountered are absent by construction: a review queue is for
 * revisiting, and telling a student to "review" something they have never seen
 * is how a queue becomes noise.
 */
export function dueReviewItems(ledger: MasteryLedger, now = new Date()): ReviewItem[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const items: ReviewItem[] = []

  for (const entry of Object.values(ledger)) {
    const band = masteryBand(entry)
    if (band === 'unseen') continue
    const seen = new Date(entry.lastSeen)
    if (Number.isNaN(seen.getTime())) continue
    const seenDay = new Date(seen.getFullYear(), seen.getMonth(), seen.getDate()).getTime()
    const dueDay = seenDay + REVIEW_INTERVAL_DAYS[band] * DAY
    const dueInDays = Math.round((dueDay - today) / DAY)
    if (dueInDays > 0) continue
    const rate = accuracy(entry)
    items.push({
      conceptId: entry.conceptId,
      band,
      accuracyPct: rate === null ? null : Math.round(rate * 100),
      attempts: entry.attempts,
      dueInDays,
      lastSeen: entry.lastSeen,
    })
  }

  // Most overdue first; within the same day, the weakest evidence first, since
  // that is where a review session is worth the most.
  return items.sort((a, b) => (a.dueInDays - b.dueInDays) || ((a.accuracyPct ?? 0) - (b.accuracyPct ?? 0)))
}

/** Concepts due soon but not yet — what tomorrow looks like. */
export function upcomingReviewItems(ledger: MasteryLedger, withinDays: number, now = new Date()): ReviewItem[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const items: ReviewItem[] = []
  for (const entry of Object.values(ledger)) {
    const band = masteryBand(entry)
    if (band === 'unseen') continue
    const seen = new Date(entry.lastSeen)
    if (Number.isNaN(seen.getTime())) continue
    const seenDay = new Date(seen.getFullYear(), seen.getMonth(), seen.getDate()).getTime()
    const dueInDays = Math.round((seenDay + REVIEW_INTERVAL_DAYS[band] * DAY - today) / DAY)
    if (dueInDays <= 0 || dueInDays > withinDays) continue
    const rate = accuracy(entry)
    items.push({
      conceptId: entry.conceptId,
      band,
      accuracyPct: rate === null ? null : Math.round(rate * 100),
      attempts: entry.attempts,
      dueInDays,
      lastSeen: entry.lastSeen,
    })
  }
  return items.sort((a, b) => a.dueInDays - b.dueInDays)
}
