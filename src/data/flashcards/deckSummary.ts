/**
 * The handful of live numbers a deck dashboard shows beyond the status counts:
 * what's due now, what's overdue, what's been studied today, today's pass rate,
 * and when the deck was last touched. All derived from the same review log and
 * card meta the rest of the feature reads, so nothing here is invented.
 */

import { isDue } from '../srs.ts'
import type { CardMeta, ReviewEvent } from './model.ts'
import { isStudyEligible } from './status.ts'
import { localDay } from './time.ts'

export interface DeckDashboardStats {
  /** Eligible, non-new cards due right now (learning + relearning + review). */
  dueToday: number
  /** Review-state cards whose due day is before today — the overdue backlog. */
  overdue: number
  /** Grade answers committed today. */
  studiedToday: number
  /** Of today's grades, how many were "Again". */
  againToday: number
  /** Pass rate over today's grades (Again is a fail); null when none yet. */
  passRateToday: number | null
  /** ISO timestamp of the most recent event for this deck, or null. */
  lastStudied: string | null
}

export function deckDashboardStats(metas: CardMeta[], events: ReviewEvent[], now: Date): DeckDashboardStats {
  const today = localDay(now)

  let dueToday = 0
  let overdue = 0
  for (const meta of metas) {
    if (!isStudyEligible(meta, now)) continue
    if (meta.schedule.state !== 'new' && isDue(meta.schedule, now)) dueToday++
    if (meta.schedule.state === 'review' && localDay(new Date(meta.schedule.due)) < today) overdue++
  }

  let studiedToday = 0
  let againToday = 0
  let lastStudied: string | null = null
  for (const event of events) {
    if (lastStudied === null || event.at > lastStudied) lastStudied = event.at
    if (event.kind !== 'grade' || event.localDay !== today) continue
    studiedToday++
    if (event.grade === 'again') againToday++
  }

  const passRateToday = studiedToday === 0 ? null : (studiedToday - againToday) / studiedToday

  return { dueToday, overdue, studiedToday, againToday, passRateToday, lastStudied }
}
