import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  answerButtons,
  cardDifficulty,
  cardRetrievability,
  cardStability,
  currentStreak,
  futureDue,
  heatmap,
  hourlyBreakdown,
  reviewIntervals,
  reviewsOverTime,
  studySummary,
  trueRetention,
} from './stats.ts'
import { newCardMeta, type CardMeta, type ReviewEvent } from './model.ts'
import type { CardSchedule } from '../srs.ts'

const now = new Date('2026-08-20T09:00:00.000Z')
const DAY_MS = 86_400_000

let seq = 0
function ev(over: Partial<ReviewEvent>): ReviewEvent {
  return {
    id: `e${seq++}`, at: '2026-08-20T09:00:00.000Z', cardId: 'c1', noteId: 'n1', deckId: 'd1',
    kind: 'grade', grade: 'good', stateBefore: 'review', stateAfter: 'review',
    intervalBefore: 5, intervalAfter: 12, timeSpentMs: 3000, scheduler: 'sm2', localDay: '2026-08-20', ...over,
  }
}
const sched = (over: Partial<CardSchedule> = {}): CardSchedule => ({
  state: 'review', step: 0, interval: 10, ease: 2.5, lapses: 0, reps: 3, due: now.toISOString(), ...over,
})
const meta = (over: Partial<CardMeta> = {}): CardMeta => ({ ...newCardMeta(sched()), ...over })

test('summary counts today’s grades and splits by state answered', () => {
  const events = [
    ev({ stateBefore: 'new', grade: 'good', timeSpentMs: 1000 }),
    ev({ stateBefore: 'review', grade: 'again', timeSpentMs: 2000 }),
    ev({ stateBefore: 'learning', grade: 'good' }),
    ev({ localDay: '2026-08-19', grade: 'good' }), // yesterday
  ]
  const s = studySummary(events, now)
  assert.equal(s.studiedToday, 3)
  assert.equal(s.againToday, 1)
  assert.equal(s.newAnswersToday, 1)
  assert.equal(s.reviewAnswersToday, 1)
  assert.equal(s.learningAnswersToday, 1)
  assert.equal(Math.round((s.passRateToday ?? 0) * 100), 67)
  assert.equal(s.reviewTimeTodayMs, 6000) // 1000 + 2000 + 3000 (default)
})

test('streak counts back over consecutive days and breaks on a gap', () => {
  const days = ['2026-08-20', '2026-08-19', '2026-08-18', '2026-08-16'] // gap at 17th
  const events = days.map((d) => ev({ localDay: d }))
  assert.equal(currentStreak(events, now), 3)
})

test('a streak survives a not-yet-studied today if yesterday counts', () => {
  const events = [ev({ localDay: '2026-08-19' }), ev({ localDay: '2026-08-18' })]
  assert.equal(currentStreak(events, now), 2)
})

test('future due forecasts per day and derives daily load from intervals', () => {
  const metas = [
    meta({ schedule: sched({ interval: 1, due: '2026-08-21T09:00:00.000Z' }) }), // tomorrow, load 1
    meta({ schedule: sched({ interval: 10, due: '2026-08-30T09:00:00.000Z' }) }), // load 0.1
    meta({ schedule: sched({ interval: 5, due: '2026-08-10T09:00:00.000Z' }) }), // overdue → today
    meta({ schedule: sched({ interval: 5 }), suspended: true }), // excluded
  ]
  const f = futureDue(metas, now, 30)
  assert.equal(f.dueTomorrow, 1)
  assert.equal(f.totalForecast, 3)
  assert.ok(Math.abs(f.dailyLoad - (1 + 0.1 + 0.2)) < 1e-9)
  assert.equal(f.points[0].day, '2026-08-20') // overdue lands today
  assert.equal(f.points[0].count, 1)
})

test('true retention counts only the first review of a card per day', () => {
  // Same card: failed first, passed on the retry the same day → counts as a fail.
  const events = [
    ev({ cardId: 'a', at: '2026-08-20T09:00:00.000Z', grade: 'again', intervalBefore: 30 }),
    ev({ cardId: 'a', at: '2026-08-20T09:05:00.000Z', grade: 'good', intervalBefore: 1 }),
    ev({ cardId: 'b', at: '2026-08-20T10:00:00.000Z', grade: 'good', intervalBefore: 5 }),
  ]
  const r = trueRetention(events, 'today', now)
  // card a: mature (interval 30 before), failed. card b: young, passed.
  assert.equal(r.mature, 0) // 0/1
  assert.equal(r.young, 1) // 1/1
  assert.equal(r.total, 0.5) // 1 of 2 first-reviews passed
})

test('true retention windows to the period', () => {
  const events = [
    ev({ cardId: 'a', localDay: '2026-08-20', grade: 'good' }),
    ev({ cardId: 'b', localDay: '2026-08-01', grade: 'again' }), // outside "today"
  ]
  assert.equal(trueRetention(events, 'today', now).total, 1)
  assert.equal(trueRetention(events, 'all', now).total, 0.5)
})

test('answer buttons split grades by category with pass rates', () => {
  const events = [
    ev({ stateBefore: 'review', intervalBefore: 30, grade: 'again' }), // mature fail
    ev({ stateBefore: 'review', intervalBefore: 30, grade: 'good' }), // mature pass
    ev({ stateBefore: 'new', grade: 'good' }), // learning
  ]
  const rows = answerButtons(events, now, null)
  const mature = rows.find((r) => r.category === 'mature')!
  assert.equal(mature.again, 1)
  assert.equal(mature.good, 1)
  assert.equal(mature.passRate, 0.5)
  const learning = rows.find((r) => r.category === 'learning')!
  assert.equal(learning.good, 1)
})

test('review interval distribution buckets and averages', () => {
  const metas = [
    meta({ schedule: sched({ interval: 1 }) }),
    meta({ schedule: sched({ interval: 3 }) }),
    meta({ schedule: sched({ interval: 20 }) }),
  ]
  const { buckets, averageDays } = reviewIntervals(metas, 'month')
  assert.ok(buckets.length > 0)
  assert.equal(buckets[buckets.length - 1].cumulativePct, 1)
  assert.equal(Math.round(averageDays), 8)
})

test('hourly breakdown attributes reviews to the local hour', () => {
  const events = [
    ev({ at: '2026-08-20T09:00:00.000Z', grade: 'good' }),
    ev({ at: '2026-08-20T09:30:00.000Z', grade: 'again' }),
  ]
  const hours = hourlyBreakdown(events, now, null)
  const localHour = new Date('2026-08-20T09:00:00.000Z').getHours()
  assert.equal(hours[localHour].reviews, 2)
  assert.equal(hours[localHour].passRate, 0.5)
})

test('reviews over time accumulates and reports days studied', () => {
  const events = [
    ev({ localDay: '2026-08-18', at: '2026-08-18T09:00:00.000Z' }),
    ev({ localDay: '2026-08-20', at: '2026-08-20T09:00:00.000Z' }),
    ev({ localDay: '2026-08-20', at: '2026-08-20T10:00:00.000Z' }),
  ]
  const r = reviewsOverTime(events, now, null, new Date('2026-08-18T00:00:00.000Z'))
  assert.equal(r.totalReviews, 3)
  assert.equal(r.daysStudied, 2)
  assert.equal(r.points[r.points.length - 1].cumulative, 3)
})

test('heatmap aggregates reviews and time per day', () => {
  const events = [ev({ localDay: '2026-08-20', timeSpentMs: 1000 }), ev({ localDay: '2026-08-20', timeSpentMs: 2000 })]
  const h = heatmap(events)
  assert.equal(h.length, 1)
  assert.equal(h[0].reviews, 2)
  assert.equal(h[0].timeMs, 3000)
})

test('empty inputs yield honest empty datasets, not zeros pretending to be data', () => {
  assert.equal(studySummary([], now).studiedToday, 0)
  assert.equal(studySummary([], now).passRateToday, null)
  assert.deepEqual(heatmap([]), [])
  assert.equal(trueRetention([], 'all', now).total, null)
  assert.equal(reviewIntervals([], 'all').buckets.length, 0)
})

// ---- FSRS analytics ---------------------------------------------------

test('card stability buckets by days, one card per fixed bucket, and averages the counted cards', () => {
  const stabilities = [0.5, 3, 20, 60, 200, 500]
  const metas = stabilities.map((stability) => meta({ schedule: sched({ stability }) }))
  const s = cardStability(metas)
  assert.deepEqual(s.buckets.map((b) => b.label), ['<1d', '1–7d', '7–30d', '1–3mo', '3–12mo', '>1y'])
  assert.deepEqual(s.buckets.map((b) => b.count), [1, 1, 1, 1, 1, 1])
  assert.equal(s.count, 6)
  const expectedAverage = stabilities.reduce((a, b) => a + b, 0) / stabilities.length
  assert.ok(Math.abs(s.averageDays - expectedAverage) < 1e-9)
})

test('card stability excludes SM-2 cards (no stability) and reports an honest zero when empty', () => {
  assert.equal(cardStability([]).count, 0)
  assert.equal(cardStability([]).averageDays, 0)
  const s = cardStability([meta(), meta()]) // plain SM-2 metas, no stability
  assert.equal(s.count, 0)
  assert.equal(s.averageDays, 0)
  assert.ok(s.buckets.every((b) => b.count === 0))
})

test('card difficulty buckets by integer floor and averages the counted cards', () => {
  const difficulties = [1, 5.4, 10]
  const metas = difficulties.map((difficulty) => meta({ schedule: sched({ difficulty }) }))
  metas.push(meta()) // no difficulty — excluded
  const d = cardDifficulty(metas)
  assert.equal(d.buckets.length, 10)
  assert.equal(d.buckets.find((b) => b.label === '1')?.count, 1)
  assert.equal(d.buckets.find((b) => b.label === '5')?.count, 1)
  assert.equal(d.buckets.find((b) => b.label === '10')?.count, 1)
  assert.equal(d.count, 3)
  const expectedAverage = difficulties.reduce((a, b) => a + b, 0) / difficulties.length
  assert.ok(Math.abs(d.average - expectedAverage) < 1e-9)
})

test('card difficulty reports an honest zero when no card carries difficulty', () => {
  const d = cardDifficulty([meta(), meta()])
  assert.equal(d.count, 0)
  assert.equal(d.average, 0)
  assert.ok(d.buckets.every((b) => b.count === 0))
})

test('card retrievability is 1 right after review, landing in the top bucket', () => {
  const card = meta({ schedule: sched({ stability: 10 }), lastReviewedAt: now.toISOString() })
  const r = cardRetrievability([card], now)
  assert.equal(r.count, 1)
  assert.equal(r.average, 1)
  assert.equal(r.estimatedRemembered, 1)
  assert.equal(r.buckets.find((b) => b.label === '90–100%')?.count, 1)
})

test('card retrievability decays to ≈0.9 after one stability’s worth of elapsed days', () => {
  const stability = 10
  const card = meta({
    schedule: sched({ stability }),
    lastReviewedAt: new Date(now.getTime() - stability * DAY_MS).toISOString(),
  })
  const r = cardRetrievability([card], now)
  assert.equal(r.count, 1)
  assert.ok(Math.abs(r.average - 0.9) < 1e-6)
  assert.ok(Math.abs(r.estimatedRemembered - 0.9) < 1e-6)
})

test('card retrievability excludes cards without stability or without a last review', () => {
  const noStability = meta({ lastReviewedAt: now.toISOString() })
  const neverReviewed = meta({ schedule: sched({ stability: 10 }) }) // lastReviewedAt stays null
  const r = cardRetrievability([noStability, neverReviewed], now)
  assert.equal(r.count, 0)
  assert.equal(r.average, 0)
  assert.equal(r.estimatedRemembered, 0)
  assert.ok(r.buckets.every((b) => b.count === 0))
})

test('card retrievability estimatedRemembered sums R across cards and average stays in [0,1]', () => {
  const fresh = meta({ schedule: sched({ stability: 10 }), lastReviewedAt: now.toISOString() })
  const decayed = meta({
    schedule: sched({ stability: 10 }),
    lastReviewedAt: new Date(now.getTime() - 10 * DAY_MS).toISOString(),
  })
  const r = cardRetrievability([fresh, decayed], now)
  assert.equal(r.count, 2)
  assert.ok(r.average >= 0 && r.average <= 1)
  assert.ok(Math.abs(r.average - 0.95) < 1e-6)
  assert.ok(Math.abs(r.estimatedRemembered - 1.9) < 1e-6)
})

test('FSRS analytics are deterministic and never mutate their inputs', () => {
  const metas = [
    meta({ schedule: sched({ stability: 20, difficulty: 5.4 }), lastReviewedAt: now.toISOString() }),
    meta(), // SM-2 card, excluded everywhere
  ]
  const snapshot = JSON.stringify(metas)
  const first = { s: cardStability(metas), d: cardDifficulty(metas), r: cardRetrievability(metas, now) }
  const second = { s: cardStability(metas), d: cardDifficulty(metas), r: cardRetrievability(metas, now) }
  assert.deepEqual(first, second)
  assert.equal(JSON.stringify(metas), snapshot)
})
