/**
 * `buildRhythmDataset`: the one place Study Rhythm settings are interpreted
 * into the dataset the heatmap and its stats both render.
 *
 * Pure only: `now`, the events and the cards all come in through
 * `RhythmDataInput`, nothing here reads a clock or storage. See
 * `rhythmTypes.ts` for why this exists as a single function rather than one
 * derivation per component.
 */

import type { ReviewEvent } from '../model.ts'
import { exclusiveStatus } from '../status.ts'
import { addLocalDays, daysBetweenDays, localDay } from '../time.ts'
import { FORECAST_LIMIT_DAYS, HISTORY_LIMIT_DAYS, type RhythmSettings } from './rhythmSettings.ts'
import type {
  RhythmCard,
  RhythmDataInput,
  RhythmDataset,
  RhythmDayCell,
  RhythmStats,
} from './rhythmTypes.ts'

/** 0..5 display intensity from a same-day count. Matches the current heatmap. */
export function levelFromCount(n: number): number {
  if (n <= 0) return 0
  if (n < 5) return 1
  if (n < 10) return 2
  if (n < 20) return 3
  if (n < 35) return 4
  return 5
}

/** `a` if it is the same day or earlier than `b`, else `b`. */
function earlierDay(a: string, b: string): string {
  return daysBetweenDays(a, b) >= 0 ? a : b
}

/** `b` if it is the same day or later than `a`, else `a`. */
function laterDay(a: string, b: string): string {
  return daysBetweenDays(a, b) >= 0 ? b : a
}

/**
 * The effective reporting start: the later of the history-limit window and
 * `ignoreBefore`, clamped so it is never later than `today`.
 *
 * `activityDays` is every counted-activity local day (unbounded by any range)
 * — only consulted when `historyLimit === 'all'`, to find the earliest day
 * with activity (or `today` when there is none).
 */
export function effectiveRhythmStart(settings: RhythmSettings, activityDays: string[], today: string): string {
  const limitDays = HISTORY_LIMIT_DAYS[settings.historyLimit]
  const historyStart =
    limitDays === null
      ? activityDays.length > 0
        ? activityDays.reduce((min, day) => earlierDay(min, day))
        : today
      : addLocalDays(today, -(limitDays - 1))
  const withIgnoreBefore = settings.ignoreBefore ? laterDay(historyStart, settings.ignoreBefore) : historyStart
  return earlierDay(withIgnoreBefore, today)
}

/**
 * The §7 projected-new distribution: per scoped deck, up to that deck's
 * daily cap is introduced each forecast day until its eligible-new count is
 * exhausted or the forecast window ends. Returns one entry per forecast day
 * (index 0 = today+1), summed across decks.
 */
export function projectedNewByDay(
  cards: RhythmCard[],
  deckNewPerDay: Record<string, number>,
  now: Date,
  forecastLength: number,
): number[] {
  const result = new Array<number>(Math.max(0, forecastLength)).fill(0)
  if (forecastLength <= 0) return result

  const eligibleByDeck = new Map<string, number>()
  for (const card of cards) {
    if (exclusiveStatus(card.meta, now) === 'new') {
      eligibleByDeck.set(card.deckId, (eligibleByDeck.get(card.deckId) ?? 0) + 1)
    }
  }

  for (const [deckId, eligibleNew] of eligibleByDeck) {
    const cap = deckNewPerDay[deckId] ?? 20
    if (cap <= 0) continue
    let remaining = eligibleNew
    for (let i = 0; i < forecastLength && remaining > 0; i++) {
      const amount = Math.min(cap, remaining)
      result[i] += amount
      remaining -= amount
    }
  }

  return result
}

/** Scope the raw input events/cards per §1. */
function scopeInput(input: RhythmDataInput): { events: ReviewEvent[]; cards: RhythmCard[] } {
  const { scope, settings } = input
  if (scope.kind === 'deck') {
    return {
      events: input.events.filter((e) => e.deckId === scope.deckId),
      cards: input.cards.filter((c) => c.deckId === scope.deckId),
    }
  }
  return {
    events: input.events.filter((e) => !settings.excludedDeckIds.includes(e.deckId)),
    cards: input.cards.filter((c) => !settings.excludedDeckIds.includes(c.deckId)),
  }
}

/** The counted study-activity events per §2. */
function filterActivity(scopedEvents: ReviewEvent[], allCards: RhythmCard[], settings: RhythmSettings): ReviewEvent[] {
  const liveCardIds = settings.excludeDeletedCards ? new Set(allCards.map((c) => c.cardId)) : null
  return scopedEvents.filter((e) => {
    const isStudyActivity = e.kind === 'grade' || !settings.excludeManualReschedules
    if (!isStudyActivity) return false
    if (liveCardIds && !liveCardIds.has(e.cardId)) return false
    return true
  })
}

/** History cells for every contiguous day in `[effectiveStart, today]`, per §5. */
function buildHistoryCells(rangeActivity: ReviewEvent[], effectiveStart: string, today: string): RhythmDayCell[] {
  const byDay = new Map<string, { reviews: number; timeMs: number }>()
  for (const e of rangeActivity) {
    const entry = byDay.get(e.localDay) ?? { reviews: 0, timeMs: 0 }
    entry.reviews++
    entry.timeMs += e.timeSpentMs ?? 0
    byDay.set(e.localDay, entry)
  }

  const span = daysBetweenDays(effectiveStart, today)
  const cells: RhythmDayCell[] = []
  for (let i = 0; i <= span; i++) {
    const day = addLocalDays(effectiveStart, i)
    const entry = byDay.get(day) ?? { reviews: 0, timeMs: 0 }
    cells.push({
      day,
      reviews: entry.reviews,
      timeMs: entry.timeMs,
      dueReviews: 0,
      projectedNew: 0,
      kind: day === today ? 'today' : 'history',
      level: levelFromCount(entry.reviews),
    })
  }
  return cells
}

/** Future (`> today`) due-review counts by day, from scoped cards, per §6. */
function dueReviewsByDay(scopedCards: RhythmCard[], today: string): Map<string, number> {
  const byDay = new Map<string, number>()
  for (const card of scopedCards) {
    const meta = card.meta
    if (meta.schedule.state !== 'review') continue
    if (meta.suspended) continue
    if (meta.buriedUntil) continue
    const dueDay = localDay(new Date(meta.schedule.due))
    if (dueDay <= today) continue // overdue/today due is not a future forecast entry
    byDay.set(dueDay, (byDay.get(dueDay) ?? 0) + 1)
  }
  return byDay
}

/** Forecast cells for `today+1 … forecastEnd` (forecastLength days), per §6. */
function buildForecastCells(
  scopedCards: RhythmCard[],
  input: RhythmDataInput,
  today: string,
  forecastLength: number,
): RhythmDayCell[] {
  const s = input.settings
  const dueByDay = s.showReviewForecast ? dueReviewsByDay(scopedCards, today) : null
  const projectedByDay = s.showNewForecast
    ? projectedNewByDay(scopedCards, input.deckNewPerDay, input.now, forecastLength)
    : null

  const cells: RhythmDayCell[] = []
  for (let i = 1; i <= forecastLength; i++) {
    const day = addLocalDays(today, i)
    const dueReviews = dueByDay?.get(day) ?? 0
    const projectedNew = projectedByDay?.[i - 1] ?? 0
    cells.push({
      day,
      reviews: 0,
      timeMs: 0,
      dueReviews,
      projectedNew,
      kind: 'forecast',
      level: levelFromCount(dueReviews + projectedNew),
    })
  }
  return cells
}

/** Consecutive active days counting back from today (or yesterday), bounded below by effectiveStart. */
function currentStreak(activeDays: Set<string>, today: string, effectiveStart: string): number {
  let cursor = activeDays.has(today) ? today : addLocalDays(today, -1)
  let streak = 0
  while (daysBetweenDays(effectiveStart, cursor) >= 0 && activeDays.has(cursor)) {
    streak++
    cursor = addLocalDays(cursor, -1)
  }
  return streak
}

/** Longest run of consecutive active days across the (already contiguous) history cells. */
function longestStreak(historyCells: RhythmDayCell[]): number {
  let longest = 0
  let current = 0
  for (const cell of historyCells) {
    if (cell.reviews > 0) {
      current++
      if (current > longest) longest = current
    } else {
      current = 0
    }
  }
  return longest
}

export function buildRhythmDataset(input: RhythmDataInput): RhythmDataset {
  const today = localDay(input.now)
  const s = input.settings

  // §1 scope
  const scoped = scopeInput(input)

  // §2 counted study-activity events (liveness always checked against the
  // FULL unscoped card list, per the contract).
  const activity = filterActivity(scoped.events, input.cards, s)

  // §3 effective start
  const effectiveStart = effectiveRhythmStart(
    s,
    activity.map((e) => e.localDay),
    today,
  )

  // §4 forecast window
  const forecastDayCount = FORECAST_LIMIT_DAYS[s.forecastLimit]
  const forecastEnd = forecastDayCount === 0 ? null : addLocalDays(today, forecastDayCount)

  // Activity restricted to the reporting range, feeding both §5 and §8.
  const rangeActivity = activity.filter((e) => e.localDay >= effectiveStart && e.localDay <= today)

  // §5 history cells
  const historyCells = buildHistoryCells(rangeActivity, effectiveStart, today)

  // §6/§7 forecast cells
  const forecastCells =
    forecastEnd !== null ? buildForecastCells(scoped.cards, input, today, forecastDayCount) : []

  // §8 stats
  const activeDaySet = new Set(historyCells.filter((c) => c.reviews > 0).map((c) => c.day))
  const activeDays = activeDaySet.size
  const totalReviews = rangeActivity.length
  const dailyAverage = activeDays === 0 ? 0 : totalReviews / activeDays
  const dueInForecast = forecastCells.reduce((sum, c) => sum + c.dueReviews, 0)
  const projectedNewInForecast = forecastCells.reduce((sum, c) => sum + c.projectedNew, 0)
  const reviewTimeMs = rangeActivity.reduce((sum, e) => sum + (e.timeSpentMs ?? 0), 0)
  const hasReviewTime = rangeActivity.some((e) => e.timeSpentMs != null && e.timeSpentMs > 0)

  const stats: RhythmStats = {
    currentStreak: currentStreak(activeDaySet, today, effectiveStart),
    longestStreak: longestStreak(historyCells),
    activeDays,
    totalReviews,
    dailyAverage,
    dueInForecast,
    projectedNewInForecast,
    reviewTimeMs,
    hasReviewTime,
  }

  // §9 assemble
  const days = [...historyCells, ...forecastCells]
  const historyDays = days.filter((c) => c.kind === 'history' || c.kind === 'today')
  const forecastDays = days.filter((c) => c.kind === 'forecast')
  const hasHistory = totalReviews > 0
  const isEmpty = !hasHistory && (forecastEnd === null || (dueInForecast === 0 && projectedNewInForecast === 0))

  return {
    effectiveStart,
    rangeEnd: today,
    forecastEnd,
    todayDay: today,
    days,
    historyDays,
    forecastDays,
    stats,
    hasHistory,
    isEmpty,
  }
}
