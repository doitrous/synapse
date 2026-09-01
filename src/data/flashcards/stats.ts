/**
 * Every statistics dataset, computed from real records — never invented.
 *
 * The charts on the Stats screen are thin: they draw what these pure functions
 * return, and when there is no history a function returns an empty dataset that
 * the screen renders as an honest empty state rather than a populated-looking
 * graph of zeros. The subtle rules the spec is strict about live here so they
 * can be pinned by tests: true retention counts only the *first* review of a
 * card per local day; daily load is derived from card intervals, not guessed;
 * every day-bounded figure turns on the student's local day, not UTC.
 *
 * Nothing here reads a clock or storage: `now`, the events and the cards are all
 * passed in, the same discipline the scheduler and status modules keep.
 */

import type { CardMeta, Note, ReviewEvent } from './model.ts'
import type { Grade } from '../srs.ts'
import { retrievability } from './fsrs.ts'
import { exclusiveStatus, MATURE_THRESHOLD_DAYS } from './status.ts'
import { addLocalDays, localDay } from './time.ts'

/** A time window for the filtered charts. `null` days means "all history". */
export type Horizon = number | null
export const HORIZON_MONTH = 30
export const HORIZON_QUARTER = 90
export const HORIZON_YEAR = 365

const DAY_MS = 86_400_000

function gradeEvents(events: ReviewEvent[]): ReviewEvent[] {
  return events.filter((e) => e.kind === 'grade' && e.grade)
}

/** Keep events on or after `now - days`; all events when `days` is null. */
export function withinHorizon(events: ReviewEvent[], now: Date, days: Horizon): ReviewEvent[] {
  if (days === null) return events
  const cutoff = now.getTime() - days * DAY_MS
  return events.filter((e) => Date.parse(e.at) >= cutoff)
}

// ---- Summary --------------------------------------------------------------

export interface StudySummary {
  studiedToday: number
  againToday: number
  passRateToday: number | null
  reviewTimeTodayMs: number
  newAnswersToday: number
  learningAnswersToday: number
  reviewAnswersToday: number
  relearningAnswersToday: number
  currentStreakDays: number
  activeDays: number
}

/** Today's counts plus the streak, all off the grade log. */
export function studySummary(events: ReviewEvent[], now: Date): StudySummary {
  const today = localDay(now)
  const grades = gradeEvents(events)
  let studiedToday = 0
  let againToday = 0
  let reviewTimeTodayMs = 0
  let newAnswersToday = 0
  let learningAnswersToday = 0
  let reviewAnswersToday = 0
  let relearningAnswersToday = 0

  for (const e of grades) {
    if (e.localDay !== today) continue
    studiedToday++
    if (e.grade === 'again') againToday++
    reviewTimeTodayMs += e.timeSpentMs ?? 0
    switch (e.stateBefore) {
      case 'new': newAnswersToday++; break
      case 'learning': learningAnswersToday++; break
      case 'relearning': relearningAnswersToday++; break
      case 'review': reviewAnswersToday++; break
    }
  }

  return {
    studiedToday,
    againToday,
    passRateToday: studiedToday === 0 ? null : (studiedToday - againToday) / studiedToday,
    reviewTimeTodayMs,
    newAnswersToday,
    learningAnswersToday,
    reviewAnswersToday,
    relearningAnswersToday,
    currentStreakDays: currentStreak(grades, now),
    activeDays: activeDayCount(grades),
  }
}

/** Distinct local days on which any card was graded. */
export function activeDayCount(events: ReviewEvent[]): number {
  const days = new Set<string>()
  for (const e of gradeEvents(events)) days.add(e.localDay)
  return days.size
}

/** Consecutive local days with a review, counting back from today (or yesterday). */
export function currentStreak(events: ReviewEvent[], now: Date): number {
  const days = new Set(gradeEvents(events).map((e) => e.localDay))
  if (days.size === 0) return 0
  const today = localDay(now)
  // A streak still stands if the student hasn't studied yet *today* but did
  // yesterday; it only breaks once a whole day is missed.
  let cursor = days.has(today) ? today : addLocalDays(today, -1)
  if (!days.has(cursor)) return 0
  let streak = 0
  while (days.has(cursor)) {
    streak++
    cursor = addLocalDays(cursor, -1)
  }
  return streak
}

// ---- Future due forecast --------------------------------------------------

export interface ForecastPoint {
  day: string
  count: number
  cumulative: number
}
export interface FutureDue {
  points: ForecastPoint[]
  totalForecast: number
  averagePerDay: number
  dueTomorrow: number
  dailyLoad: number
}

/**
 * How many review cards fall due on each of the next `horizon` days.
 *
 * Only review-state, non-suspended, non-buried cards have a forecastable due
 * date. `dailyLoad` is the long-run average this deck will generate — the sum of
 * `1/interval` over review cards — which is the honest "reviews per day" figure
 * the spec asks be derived from intervals, not guessed.
 */
export function futureDue(metas: CardMeta[], now: Date, horizon: Horizon): FutureDue {
  const today = localDay(now)
  const span = horizon ?? 365
  const perDay = new Map<string, number>()
  let dailyLoad = 0

  for (const meta of metas) {
    if (meta.suspended || meta.buriedUntil) continue
    if (meta.schedule.state !== 'review') continue
    if (meta.schedule.interval > 0) dailyLoad += 1 / meta.schedule.interval
    const dueDay = localDay(new Date(meta.schedule.due))
    // Overdue cards land on today; future cards on their day.
    const day = dueDay < today ? today : dueDay
    perDay.set(day, (perDay.get(day) ?? 0) + 1)
  }

  const points: ForecastPoint[] = []
  let cumulative = 0
  let dueTomorrow = 0
  const tomorrow = addLocalDays(today, 1)
  for (let i = 0; i <= span; i++) {
    const day = addLocalDays(today, i)
    const count = perDay.get(day) ?? 0
    cumulative += count
    if (day === tomorrow) dueTomorrow = count
    if (horizon === null && count === 0 && i > 0) continue
    points.push({ day, count, cumulative })
  }

  const totalForecast = cumulative
  return {
    points,
    totalForecast,
    averagePerDay: points.length === 0 ? 0 : totalForecast / points.length,
    dueTomorrow,
    dailyLoad,
  }
}

// ---- Heatmap --------------------------------------------------------------

export interface HeatmapDay {
  day: string
  reviews: number
  timeMs: number
}

/** Reviews and time studied per local day, for the calendar heatmap. */
export function heatmap(events: ReviewEvent[]): HeatmapDay[] {
  const byDay = new Map<string, { reviews: number; timeMs: number }>()
  for (const e of gradeEvents(events)) {
    const entry = byDay.get(e.localDay) ?? { reviews: 0, timeMs: 0 }
    entry.reviews++
    entry.timeMs += e.timeSpentMs ?? 0
    byDay.set(e.localDay, entry)
  }
  return [...byDay.entries()]
    .map(([day, v]) => ({ day, ...v }))
    .sort((a, b) => a.day.localeCompare(b.day))
}

// ---- Reviews over time ----------------------------------------------------

export interface ReviewsOverTime {
  points: { day: string; count: number; cumulative: number }[]
  totalReviews: number
  daysStudied: number
  daysSinceJoined: number
  pctDaysStudied: number | null
  averagePerActiveDay: number
  stateBreakdown: { newOrLearning: number; relearning: number; young: number; mature: number }
}

/**
 * Review volume over the window, plus the state breakdown of those answers.
 * "young/mature" is judged by the interval the card had *before* the answer, so
 * the breakdown describes what was actually reviewed.
 */
export function reviewsOverTime(events: ReviewEvent[], now: Date, horizon: Horizon, joinedAt: Date): ReviewsOverTime {
  const windowed = gradeEvents(withinHorizon(events, now, horizon))
  const byDay = new Map<string, number>()
  const breakdown = { newOrLearning: 0, relearning: 0, young: 0, mature: 0 }

  for (const e of windowed) {
    byDay.set(e.localDay, (byDay.get(e.localDay) ?? 0) + 1)
    if (e.stateBefore === 'new' || e.stateBefore === 'learning') breakdown.newOrLearning++
    else if (e.stateBefore === 'relearning') breakdown.relearning++
    else if (e.intervalBefore >= MATURE_THRESHOLD_DAYS) breakdown.mature++
    else breakdown.young++
  }

  const points: { day: string; count: number; cumulative: number }[] = []
  let cumulative = 0
  for (const [day, count] of [...byDay.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    cumulative += count
    points.push({ day, count, cumulative })
  }

  const daysStudied = byDay.size
  const daysSinceJoined = Math.max(1, Math.floor((now.getTime() - joinedAt.getTime()) / DAY_MS) + 1)
  return {
    points,
    totalReviews: cumulative,
    daysStudied,
    daysSinceJoined,
    pctDaysStudied: daysSinceJoined === 0 ? null : daysStudied / daysSinceJoined,
    averagePerActiveDay: daysStudied === 0 ? 0 : cumulative / daysStudied,
    stateBreakdown: breakdown,
  }
}

// ---- Review interval distribution ----------------------------------------

export interface IntervalBucket {
  label: string
  minDays: number
  maxDays: number
  count: number
  cumulativePct: number
}
export type IntervalRange = 'month' | 'p50' | 'p95' | 'all'

/**
 * Distribution of the delays review cards will wait before coming due again.
 * Buckets grow with the range so the shape stays readable from days to years.
 */
export function reviewIntervals(metas: CardMeta[], range: IntervalRange): { buckets: IntervalBucket[]; averageDays: number } {
  const intervals = metas
    .filter((m) => m.schedule.state === 'review' && !m.suspended)
    .map((m) => m.schedule.interval)
    .sort((a, b) => a - b)

  if (intervals.length === 0) return { buckets: [], averageDays: 0 }

  const cap = range === 'month' ? 31
    : range === 'p50' ? intervals[Math.floor(intervals.length * 0.5)]
      : range === 'p95' ? intervals[Math.floor(intervals.length * 0.95)]
        : intervals[intervals.length - 1]

  const edges = bucketEdges(Math.max(1, cap))
  const counts = new Array(edges.length - 1).fill(0)
  for (const iv of intervals) {
    if (iv > cap && range !== 'all') continue
    let placed = false
    for (let i = 0; i < edges.length - 1; i++) {
      if (iv >= edges[i] && iv < edges[i + 1]) { counts[i]++; placed = true; break }
    }
    if (!placed) counts[counts.length - 1]++
  }

  const total = counts.reduce((a, b) => a + b, 0) || 1
  let running = 0
  const buckets: IntervalBucket[] = counts.map((count, i) => {
    running += count
    return {
      label: bucketLabel(edges[i], edges[i + 1]),
      minDays: edges[i],
      maxDays: edges[i + 1],
      count,
      cumulativePct: running / total,
    }
  })

  const averageDays = intervals.reduce((a, b) => a + b, 0) / intervals.length
  return { buckets, averageDays }
}

function bucketEdges(cap: number): number[] {
  if (cap <= 31) return [1, 2, 3, 4, 7, 14, 21, 31]
  if (cap <= 180) return [1, 7, 14, 21, 31, 60, 90, 180]
  if (cap <= 365) return [1, 21, 31, 60, 90, 180, 365]
  return [1, 31, 90, 180, 365, 730, 1825, 36500]
}
function bucketLabel(min: number, max: number): string {
  const fmt = (d: number) => (d >= 365 ? `${Math.round(d / 365)}y` : d >= 31 ? `${Math.round(d / 30)}mo` : `${d}d`)
  return `${fmt(min)}–${fmt(max)}`
}

// ---- Hourly breakdown -----------------------------------------------------

export interface HourStat {
  hour: number
  reviews: number
  passRate: number | null
  sample: number
}

/** Reviews and pass rate by local hour of day (0–23). */
export function hourlyBreakdown(events: ReviewEvent[], now: Date, horizon: Horizon): HourStat[] {
  const windowed = gradeEvents(withinHorizon(events, now, horizon))
  const hours = Array.from({ length: 24 }, (_, hour) => ({ hour, reviews: 0, pass: 0 }))
  for (const e of windowed) {
    const hour = new Date(e.at).getHours()
    hours[hour].reviews++
    if (e.grade !== 'again') hours[hour].pass++
  }
  return hours.map((h) => ({
    hour: h.hour,
    reviews: h.reviews,
    sample: h.reviews,
    passRate: h.reviews === 0 ? null : h.pass / h.reviews,
  }))
}

// ---- Answer buttons -------------------------------------------------------

export type AnswerCategory = 'learning' | 'relearning' | 'young' | 'mature'
export interface AnswerButtonRow {
  category: AnswerCategory
  again: number
  hard: number
  good: number
  easy: number
  passRate: number | null
}

/** Grade counts split by the state answered, with a pass rate per category. */
export function answerButtons(events: ReviewEvent[], now: Date, horizon: Horizon): AnswerButtonRow[] {
  const windowed = gradeEvents(withinHorizon(events, now, horizon))
  const rows: Record<AnswerCategory, { again: number; hard: number; good: number; easy: number }> = {
    learning: { again: 0, hard: 0, good: 0, easy: 0 },
    relearning: { again: 0, hard: 0, good: 0, easy: 0 },
    young: { again: 0, hard: 0, good: 0, easy: 0 },
    mature: { again: 0, hard: 0, good: 0, easy: 0 },
  }
  for (const e of windowed) {
    const cat = answerCategory(e)
    rows[cat][e.grade as Grade]++
  }
  return (Object.keys(rows) as AnswerCategory[]).map((category) => {
    const r = rows[category]
    const total = r.again + r.hard + r.good + r.easy
    return { category, ...r, passRate: total === 0 ? null : (total - r.again) / total }
  })
}

function answerCategory(e: ReviewEvent): AnswerCategory {
  if (e.stateBefore === 'new' || e.stateBefore === 'learning') return 'learning'
  if (e.stateBefore === 'relearning') return 'relearning'
  return e.intervalBefore >= MATURE_THRESHOLD_DAYS ? 'mature' : 'young'
}

// ---- Added over time ------------------------------------------------------

/** New cards added per local day, from note creation dates. */
export function addedOverTime(notes: Note[], generatedPerNote: (note: Note) => number, now: Date, horizon: Horizon): { day: string; count: number; cumulative: number }[] {
  const cutoff = horizon === null ? -Infinity : now.getTime() - horizon * DAY_MS
  const byDay = new Map<string, number>()
  for (const note of notes) {
    if (!note.createdAt) continue
    const t = Date.parse(note.createdAt)
    if (Number.isNaN(t) || t < cutoff) continue
    const day = localDay(new Date(note.createdAt))
    byDay.set(day, (byDay.get(day) ?? 0) + generatedPerNote(note))
  }
  const points: { day: string; count: number; cumulative: number }[] = []
  let cumulative = 0
  for (const [day, count] of [...byDay.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    cumulative += count
    points.push({ day, count, cumulative })
  }
  return points
}

// ---- True retention -------------------------------------------------------

export interface RetentionCell {
  young: number | null
  mature: number | null
  total: number | null
}
export type RetentionPeriod = 'today' | 'yesterday' | 'week' | 'month' | 'all'

/**
 * True retention: of the cards reviewed in the period, what share passed.
 *
 * Only the *first* review of a card on each local day counts — a card failed and
 * retried the same day must not be counted twice, and its pass on the retry must
 * not paper over the initial lapse. Again is a fail; Hard, Good and Easy pass.
 * Split by the maturity the card had going in.
 */
export function trueRetention(events: ReviewEvent[], period: RetentionPeriod, now: Date): RetentionCell {
  const today = localDay(now)
  const from = period === 'today' ? today
    : period === 'yesterday' ? addLocalDays(today, -1)
      : period === 'week' ? addLocalDays(today, -6)
        : period === 'month' ? addLocalDays(today, -29)
          : null
  const to = period === 'yesterday' ? addLocalDays(today, -1) : today

  // First grade per (card, local day), in chronological order.
  const firstOfDay = new Map<string, ReviewEvent>()
  for (const e of gradeEvents(events).slice().sort((a, b) => a.at.localeCompare(b.at))) {
    if (from !== null && (e.localDay < from || e.localDay > to)) continue
    const key = `${e.cardId}|${e.localDay}`
    if (!firstOfDay.has(key)) firstOfDay.set(key, e)
  }

  let youngPass = 0, youngTotal = 0, maturePass = 0, matureTotal = 0
  for (const e of firstOfDay.values()) {
    const mature = e.stateBefore === 'review' && e.intervalBefore >= MATURE_THRESHOLD_DAYS
    const passed = e.grade !== 'again'
    if (mature) { matureTotal++; if (passed) maturePass++ }
    else { youngTotal++; if (passed) youngPass++ }
  }
  const total = youngTotal + matureTotal
  return {
    young: youngTotal === 0 ? null : youngPass / youngTotal,
    mature: matureTotal === 0 ? null : maturePass / matureTotal,
    total: total === 0 ? null : (youngPass + maturePass) / total,
  }
}

// ---- FSRS analytics --------------------------------------------------------
//
// These three datasets summarize REAL per-card FSRS state — stability,
// difficulty, retrievability — never anything derived from SM-2's ease or
// interval. A card the scheduler has not touched with FSRS (no `stability`)
// carries none of this and is excluded from every one of these functions
// rather than papered over with a fabricated value: a deck with no FSRS
// history returns `count: 0` and empty/zero stats, an honest empty state.

export interface DistributionBucket { label: string; count: number }

export interface StabilityStats { buckets: DistributionBucket[]; averageDays: number; count: number }

const STABILITY_BUCKET_LABELS = ['<1d', '1–7d', '7–30d', '1–3mo', '3–12mo', '>1y']

/** Which of the six fixed stability-in-days buckets a value falls into. */
function stabilityBucketIndex(days: number): number {
  if (days < 1) return 0
  if (days < 7) return 1
  if (days < 30) return 2
  if (days < 90) return 3
  if (days < 365) return 4
  return 5
}

/** Distribution of FSRS memory stability (in days) across cards that carry it. */
export function cardStability(metas: CardMeta[]): StabilityStats {
  const counts = new Array(STABILITY_BUCKET_LABELS.length).fill(0)
  let sum = 0
  let count = 0
  for (const meta of metas) {
    const stability = meta.schedule.stability
    if (stability == null) continue
    counts[stabilityBucketIndex(stability)]++
    sum += stability
    count++
  }
  return {
    buckets: STABILITY_BUCKET_LABELS.map((label, i) => ({ label, count: counts[i] })),
    averageDays: count === 0 ? 0 : sum / count,
    count,
  }
}

export interface DifficultyStats { buckets: DistributionBucket[]; average: number; count: number }

/** Distribution of FSRS difficulty (1–10) across cards that carry it, in ten integer buckets. */
export function cardDifficulty(metas: CardMeta[]): DifficultyStats {
  const counts = new Array(10).fill(0)
  let sum = 0
  let count = 0
  for (const meta of metas) {
    const difficulty = meta.schedule.difficulty
    if (difficulty == null) continue
    const bucket = Math.min(10, Math.max(1, Math.floor(difficulty)))
    counts[bucket - 1]++
    sum += difficulty
    count++
  }
  return {
    buckets: counts.map((c, i) => ({ label: String(i + 1), count: c })),
    average: count === 0 ? 0 : sum / count,
    count,
  }
}

export interface RetrievabilityStats {
  buckets: DistributionBucket[]
  average: number
  count: number
  estimatedRemembered: number
}

const RETRIEVABILITY_BUCKET_LABELS = [
  '0–10%', '10–20%', '20–30%', '30–40%', '40–50%', '50–60%', '60–70%', '70–80%', '80–90%', '90–100%',
]

/**
 * Distribution of each FSRS card's current recall probability, computed from
 * its stability and the time elapsed since its last review. Only reviewed
 * FSRS cards are considered: a card with no `lastReviewedAt` has no elapsed
 * time to decay from, so it is excluded rather than assumed fully retained.
 * `estimatedRemembered` is the raw sum of R across counted cards — the
 * expected number of them a student could recall right now — left unrounded
 * so a caller can format it however the screen wants.
 */
export function cardRetrievability(metas: CardMeta[], now: Date): RetrievabilityStats {
  const counts = new Array(RETRIEVABILITY_BUCKET_LABELS.length).fill(0)
  let sum = 0
  let count = 0
  for (const meta of metas) {
    const stability = meta.schedule.stability
    if (stability == null || meta.lastReviewedAt == null) continue
    const elapsedDays = Math.max(0, (now.getTime() - Date.parse(meta.lastReviewedAt)) / DAY_MS)
    const r = Math.min(1, Math.max(0, retrievability(elapsedDays, stability)))
    counts[Math.min(9, Math.floor(r * 10))]++
    sum += r
    count++
  }
  return {
    buckets: RETRIEVABILITY_BUCKET_LABELS.map((label, i) => ({ label, count: counts[i] })),
    average: count === 0 ? 0 : sum / count,
    count,
    estimatedRemembered: sum,
  }
}

// ---- Card counts (exclusive) ---------------------------------------------

export { exclusiveStatus }
