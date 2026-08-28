import { test } from 'node:test'
import assert from 'node:assert/strict'

import type { CardSchedule } from '../../srs.ts'
import type { CardMeta, ReviewEvent } from '../model.ts'
import { DEFAULT_RHYTHM_SETTINGS, type RhythmSettings } from './rhythmSettings.ts'
import type { RhythmCard, RhythmDataInput } from './rhythmTypes.ts'
import { buildRhythmDataset, effectiveRhythmStart, levelFromCount, projectedNewByDay } from './rhythmData.ts'

const NOW = new Date('2026-06-15T12:00:00')
const TODAY = '2026-06-15'

// ---- fixtures ---------------------------------------------------------

/** ISO instant at local noon on y-m-d, so `localDay(new Date(...))` is stable
 *  regardless of the host machine's timezone offset (±12h never rolls the day). */
function dueAt(y: number, m: number, d: number): string {
  return new Date(y, m - 1, d, 12, 0, 0, 0).toISOString()
}

function mkSchedule(overrides: Partial<CardSchedule> = {}): CardSchedule {
  return {
    state: 'new',
    step: 0,
    interval: 0,
    ease: 2.5,
    lapses: 0,
    reps: 0,
    due: dueAt(2026, 6, 15),
    ...overrides,
  }
}

type MetaOverrides = Omit<Partial<CardMeta>, 'schedule'> & { schedule?: Partial<CardSchedule> }

function mkMeta(overrides: MetaOverrides = {}): CardMeta {
  const { schedule, ...rest } = overrides
  return {
    schedule: mkSchedule(schedule),
    flag: null,
    suspended: false,
    buriedUntil: null,
    reviewCount: 0,
    resetSinceReview: false,
    firstReviewedAt: null,
    lastReviewedAt: null,
    ...rest,
  }
}

function mkCard(cardId: string, deckId: string, metaOverrides: MetaOverrides = {}): RhythmCard {
  return { cardId, deckId, meta: mkMeta(metaOverrides) }
}

let eventSeq = 0
function mkEvent(overrides: Partial<ReviewEvent> = {}): ReviewEvent {
  eventSeq++
  return {
    id: `e${eventSeq}`,
    at: '2026-06-01T10:00:00.000Z',
    cardId: 'c1',
    noteId: 'n1',
    deckId: 'd1',
    kind: 'grade',
    grade: 'good',
    stateBefore: 'review',
    stateAfter: 'review',
    intervalBefore: 1,
    intervalAfter: 2,
    timeSpentMs: 1000,
    scheduler: 'fsrs',
    localDay: '2026-06-01',
    ...overrides,
  }
}

function mkSettings(overrides: Partial<RhythmSettings> = {}): RhythmSettings {
  return { ...DEFAULT_RHYTHM_SETTINGS, ...overrides }
}

function mkInput(overrides: Partial<RhythmDataInput> = {}): RhythmDataInput {
  return {
    events: [],
    cards: [],
    deckNewPerDay: {},
    settings: mkSettings(),
    now: NOW,
    scope: { kind: 'all' },
    ...overrides,
  }
}

// ---- levelFromCount -----------------------------------------------------

test('levelFromCount: boundary thresholds', () => {
  assert.equal(levelFromCount(-1), 0)
  assert.equal(levelFromCount(0), 0)
  assert.equal(levelFromCount(4), 1)
  assert.equal(levelFromCount(5), 2)
  assert.equal(levelFromCount(9), 2)
  assert.equal(levelFromCount(10), 3)
  assert.equal(levelFromCount(19), 3)
  assert.equal(levelFromCount(20), 4)
  assert.equal(levelFromCount(34), 4)
  assert.equal(levelFromCount(35), 5)
  assert.equal(levelFromCount(1000), 5)
})

// ---- effectiveRhythmStart -------------------------------------------------

test('effectiveRhythmStart: historyLimit window is exactly N days ending today', () => {
  const settings = mkSettings({ historyLimit: '4w', ignoreBefore: null })
  assert.equal(effectiveRhythmStart(settings, [], TODAY), '2026-05-19') // 28-day window incl. today
})

test('effectiveRhythmStart: "all" uses the earliest activity day', () => {
  const settings = mkSettings({ historyLimit: 'all', ignoreBefore: null })
  assert.equal(
    effectiveRhythmStart(settings, ['2026-03-10', '2026-01-05', '2026-04-01'], TODAY),
    '2026-01-05',
  )
})

test('effectiveRhythmStart: "all" with no activity falls back to today', () => {
  const settings = mkSettings({ historyLimit: 'all', ignoreBefore: null })
  assert.equal(effectiveRhythmStart(settings, [], TODAY), TODAY)
})

test('effectiveRhythmStart: ignoreBefore wins when later than the history-limit window', () => {
  const settings = mkSettings({ historyLimit: '4w', ignoreBefore: '2026-06-01' })
  assert.equal(effectiveRhythmStart(settings, [], TODAY), '2026-06-01')
})

test('effectiveRhythmStart: history-limit window wins when later than ignoreBefore', () => {
  const settings = mkSettings({ historyLimit: '4w', ignoreBefore: '2026-01-01' })
  assert.equal(effectiveRhythmStart(settings, [], TODAY), '2026-05-19')
})

test('effectiveRhythmStart: clamps to today when ignoreBefore is in the future', () => {
  const settings = mkSettings({ historyLimit: '4w', ignoreBefore: '2026-12-25' })
  assert.equal(effectiveRhythmStart(settings, [], TODAY), TODAY)
})

// ---- ignore-before moves cells/streaks/totals/averages together ----------

test('ignoreBefore drops earlier events from cells, totals and averages together', () => {
  const events = [
    mkEvent({ localDay: '2026-06-10', at: '2026-06-10T10:00:00.000Z' }),
    mkEvent({ localDay: '2026-06-11', at: '2026-06-11T10:00:00.000Z' }),
    mkEvent({ localDay: '2026-06-12', at: '2026-06-12T10:00:00.000Z' }),
    mkEvent({ localDay: '2026-06-13', at: '2026-06-13T10:00:00.000Z' }),
    mkEvent({ localDay: TODAY, at: '2026-06-15T10:00:00.000Z' }),
  ]
  const cards = [mkCard('c1', 'd1')]

  const withoutIgnore = buildRhythmDataset(
    mkInput({ events, cards, settings: mkSettings({ historyLimit: 'all', ignoreBefore: null }) }),
  )
  assert.equal(withoutIgnore.effectiveStart, '2026-06-10')
  assert.equal(withoutIgnore.historyDays.length, 6) // 10..15 inclusive
  assert.equal(withoutIgnore.stats.totalReviews, 5)
  assert.equal(withoutIgnore.stats.activeDays, 5) // 14 has no event
  assert.equal(withoutIgnore.stats.dailyAverage, 1)

  const withIgnore = buildRhythmDataset(
    mkInput({ events, cards, settings: mkSettings({ historyLimit: 'all', ignoreBefore: '2026-06-12' }) }),
  )
  assert.equal(withIgnore.effectiveStart, '2026-06-12')
  assert.equal(withIgnore.historyDays.length, 4) // 12..15 inclusive
  assert.equal(withIgnore.stats.totalReviews, 3) // drops the 10th and 11th
  assert.equal(withIgnore.stats.activeDays, 3)
  assert.equal(withIgnore.stats.dailyAverage, 1)
  // The dropped days must not appear in the cells at all.
  assert.ok(!withIgnore.days.some((c) => c.day === '2026-06-10' || c.day === '2026-06-11'))
})

// ---- exclude-deleted-cards -------------------------------------------------

test('excludeDeletedCards drops events for cards absent from the full card list', () => {
  const events = [
    mkEvent({ cardId: 'live', localDay: TODAY }),
    mkEvent({ cardId: 'gone', localDay: TODAY }),
  ]
  const cards = [mkCard('live', 'd1')] // 'gone' does not exist

  const excluding = buildRhythmDataset(
    mkInput({ events, cards, settings: mkSettings({ excludeDeletedCards: true, historyLimit: '4w' }) }),
  )
  assert.equal(excluding.stats.totalReviews, 1)

  const including = buildRhythmDataset(
    mkInput({ events, cards, settings: mkSettings({ excludeDeletedCards: false, historyLimit: '4w' }) }),
  )
  assert.equal(including.stats.totalReviews, 2)
})

// ---- exclude-manual-reschedules --------------------------------------------

test('excludeManualReschedules keeps only grade events when true', () => {
  const events = [
    mkEvent({ kind: 'grade', grade: 'good', localDay: '2026-06-14' }),
    mkEvent({ kind: 'set-due', grade: null, localDay: TODAY }),
  ]
  const cards = [mkCard('c1', 'd1')]

  const excluding = buildRhythmDataset(
    mkInput({ events, cards, settings: mkSettings({ excludeManualReschedules: true, historyLimit: '4w' }) }),
  )
  assert.equal(excluding.stats.totalReviews, 1)
  assert.equal(excluding.stats.activeDays, 1)

  const including = buildRhythmDataset(
    mkInput({ events, cards, settings: mkSettings({ excludeManualReschedules: false, historyLimit: '4w' }) }),
  )
  assert.equal(including.stats.totalReviews, 2)
  assert.equal(including.stats.activeDays, 2) // the manual event's day is now active too
})

test('every grade (again/hard/good/easy) is always counted regardless of excludeManualReschedules', () => {
  const events = (['again', 'hard', 'good', 'easy'] as const).map((grade, i) =>
    mkEvent({ id: `g${i}`, kind: 'grade', grade, cardId: `c${i}`, localDay: TODAY }),
  )
  const cards = events.map((e) => mkCard(e.cardId, 'd1'))

  const ds = buildRhythmDataset(
    mkInput({ events, cards, settings: mkSettings({ excludeManualReschedules: true, historyLimit: '4w' }) }),
  )
  assert.equal(ds.stats.totalReviews, 4)
})

// ---- excluded decks ---------------------------------------------------------

test('all-scope removes an excluded deck from cells, stats and forecast', () => {
  const events = [
    mkEvent({ deckId: 'd1', cardId: 'c1', localDay: TODAY }),
    mkEvent({ deckId: 'd2', cardId: 'c2', localDay: TODAY }),
  ]
  const cards = [
    mkCard('c1', 'd1'),
    mkCard('c2', 'd2', { schedule: { state: 'review', interval: 5, due: dueAt(2026, 6, 20) } }),
  ]
  const settings = mkSettings({ excludedDeckIds: ['d2'], historyLimit: '4w', forecastLimit: '30d' })

  const ds = buildRhythmDataset(mkInput({ events, cards, settings, scope: { kind: 'all' } }))
  assert.equal(ds.stats.totalReviews, 1) // d2's grade event is gone
  assert.equal(ds.stats.dueInForecast, 0) // d2's future-due card is gone too
})

test('deck scope ignores excludedDeckIds entirely', () => {
  const events = [mkEvent({ deckId: 'd2', cardId: 'c2', localDay: TODAY })]
  const cards = [mkCard('c2', 'd2')]
  const settings = mkSettings({ excludedDeckIds: ['d2'], historyLimit: '4w' })

  const ds = buildRhythmDataset(mkInput({ events, cards, settings, scope: { kind: 'deck', deckId: 'd2' } }))
  assert.equal(ds.stats.totalReviews, 1) // still present: excludedDeckIds only applies to 'all' scope
})

test('deck scope keeps only that deck\'s events and cards', () => {
  const events = [
    mkEvent({ deckId: 'd1', cardId: 'c1', localDay: TODAY }),
    mkEvent({ deckId: 'd2', cardId: 'c2', localDay: TODAY }),
  ]
  const cards = [mkCard('c1', 'd1'), mkCard('c2', 'd2')]
  const ds = buildRhythmDataset(
    mkInput({ events, cards, settings: mkSettings({ historyLimit: '4w' }), scope: { kind: 'deck', deckId: 'd1' } }),
  )
  assert.equal(ds.stats.totalReviews, 1)
})

// ---- streaks ---------------------------------------------------------------

test('currentStreak counts back from today, longestStreak finds the best run, both bounded by effectiveStart', () => {
  // Active days ascending: 07,08,09,10 (a 4-day run), gap at 11-12, then 13,14,15(today) (a 3-day run).
  const activeDays = ['2026-06-07', '2026-06-08', '2026-06-09', '2026-06-10', '2026-06-13', '2026-06-14', TODAY]
  const events = activeDays.map((day, i) => mkEvent({ id: `s${i}`, localDay: day }))
  const cards = [mkCard('c1', 'd1')]

  const ds = buildRhythmDataset(
    mkInput({ events, cards, settings: mkSettings({ historyLimit: 'all', ignoreBefore: null }) }),
  )
  assert.equal(ds.stats.currentStreak, 3) // 15,14,13 then gap at 12
  assert.equal(ds.stats.longestStreak, 4) // 07..10

  // Bounding: cut the window so the earlier 4-day run is out of range, and the
  // streak cannot reach back into it even where the underlying data would allow it.
  const bounded = buildRhythmDataset(
    mkInput({ events, cards, settings: mkSettings({ historyLimit: 'all', ignoreBefore: '2026-06-14' }) }),
  )
  assert.equal(bounded.effectiveStart, '2026-06-14')
  assert.equal(bounded.stats.currentStreak, 2) // 15,14 — cannot extend to 13, let alone the 07..10 run
  assert.equal(bounded.stats.longestStreak, 2)
})

test('currentStreak counts from yesterday when nothing happened yet today', () => {
  const events = [
    mkEvent({ localDay: '2026-06-13' }),
    mkEvent({ localDay: '2026-06-14' }), // yesterday
  ]
  const cards = [mkCard('c1', 'd1')]
  const ds = buildRhythmDataset(
    mkInput({ events, cards, settings: mkSettings({ historyLimit: 'all', ignoreBefore: null }) }),
  )
  assert.equal(ds.stats.currentStreak, 2)
})

test('currentStreak is 0 when the gap includes both today and yesterday', () => {
  const events = [mkEvent({ localDay: '2026-06-10' })]
  const cards = [mkCard('c1', 'd1')]
  const ds = buildRhythmDataset(
    mkInput({ events, cards, settings: mkSettings({ historyLimit: 'all', ignoreBefore: null }) }),
  )
  assert.equal(ds.stats.currentStreak, 0)
})

// ---- forecast: review due-dates --------------------------------------------

test('forecast: a future review due-date lands on its own future day', () => {
  const cards = [
    mkCard('c1', 'd1', { schedule: { state: 'review', interval: 10, due: dueAt(2026, 6, 20) } }),
  ]
  const ds = buildRhythmDataset(
    mkInput({ cards, settings: mkSettings({ forecastLimit: '30d', showReviewForecast: true }) }),
  )
  const cell = ds.forecastDays.find((c) => c.day === '2026-06-20')
  assert.ok(cell)
  assert.equal(cell?.dueReviews, 1)
  assert.equal(ds.stats.dueInForecast, 1)
})

test('forecast: overdue (due <= today) reviews are excluded, not folded onto today', () => {
  const cards = [
    mkCard('c1', 'd1', { schedule: { state: 'review', interval: 10, due: dueAt(2026, 6, 10) } }), // overdue
    mkCard('c2', 'd1', { schedule: { state: 'review', interval: 10, due: dueAt(2026, 6, 15) } }), // due today
  ]
  const ds = buildRhythmDataset(
    mkInput({ cards, settings: mkSettings({ forecastLimit: '30d', showReviewForecast: true }) }),
  )
  assert.equal(ds.stats.dueInForecast, 0)
  assert.ok(ds.forecastDays.every((c) => c.dueReviews === 0))
})

test('forecast: suspended and buried review cards never contribute due-reviews', () => {
  const cards = [
    mkCard('c1', 'd1', {
      schedule: { state: 'review', interval: 10, due: dueAt(2026, 6, 20) },
      suspended: true,
    }),
    mkCard('c2', 'd1', {
      schedule: { state: 'review', interval: 10, due: dueAt(2026, 6, 20) },
      buriedUntil: '2026-06-16',
    }),
  ]
  const ds = buildRhythmDataset(
    mkInput({ cards, settings: mkSettings({ forecastLimit: '30d', showReviewForecast: true }) }),
  )
  assert.equal(ds.stats.dueInForecast, 0)
})

test('forecastLimit "off" produces no forecast cells and a null forecastEnd', () => {
  const cards = [
    mkCard('c1', 'd1', { schedule: { state: 'review', interval: 10, due: dueAt(2026, 6, 20) } }),
  ]
  const ds = buildRhythmDataset(mkInput({ cards, settings: mkSettings({ forecastLimit: 'off' }) }))
  assert.equal(ds.forecastEnd, null)
  assert.deepEqual(ds.forecastDays, [])
  assert.equal(ds.stats.dueInForecast, 0)
})

test('showReviewForecast=false suppresses dueReviews even with a future due card', () => {
  const cards = [
    mkCard('c1', 'd1', { schedule: { state: 'review', interval: 10, due: dueAt(2026, 6, 20) } }),
  ]
  const ds = buildRhythmDataset(
    mkInput({ cards, settings: mkSettings({ forecastLimit: '30d', showReviewForecast: false }) }),
  )
  assert.equal(ds.stats.dueInForecast, 0)
})

// ---- forecast: projected-new -----------------------------------------------

test('projectedNewByDay: distributes up to the per-deck cap per day and stops when exhausted', () => {
  const cards = [
    mkCard('n1', 'd1'),
    mkCard('n2', 'd1'),
    mkCard('n3', 'd1'),
    mkCard('n4', 'd1'),
    mkCard('n5', 'd1'), // 5 eligible new in d1
  ]
  const result = projectedNewByDay(cards, { d1: 2 }, NOW, 4)
  assert.deepEqual(result, [2, 2, 1, 0])
})

test('projectedNewByDay: missing deckNewPerDay entry defaults to a cap of 20', () => {
  const cards = Array.from({ length: 3 }, (_, i) => mkCard(`n${i}`, 'd1'))
  const result = projectedNewByDay(cards, {}, NOW, 2)
  assert.deepEqual(result, [3, 0])
})

test('projectedNewByDay: a cap <= 0 makes that deck contribute nothing', () => {
  const cards = [mkCard('n1', 'd1')]
  const result = projectedNewByDay(cards, { d1: 0 }, NOW, 3)
  assert.deepEqual(result, [0, 0, 0])
})

test('projectedNewByDay: suspended, buried and non-new cards are not eligible', () => {
  const cards = [
    mkCard('n1', 'd1'), // eligible: state new, not suspended/buried
    mkCard('n2', 'd1', { suspended: true }),
    mkCard('n3', 'd1', { buriedUntil: '2026-06-16' }),
    mkCard('n4', 'd1', { schedule: { state: 'review', interval: 5, due: dueAt(2026, 6, 20) } }),
  ]
  const result = projectedNewByDay(cards, { d1: 20 }, NOW, 2)
  assert.deepEqual(result, [1, 0])
})

test('projectedNewByDay: multiple decks distribute independently and sum per day', () => {
  const cards = [
    mkCard('a1', 'd1'),
    mkCard('a2', 'd1'),
    mkCard('b1', 'd2'),
  ]
  const result = projectedNewByDay(cards, { d1: 1, d2: 1 }, NOW, 2)
  assert.deepEqual(result, [2, 1]) // day0: 1(d1)+1(d2)=2, day1: 1(d1 remaining)+0(d2 exhausted)=1
})

test('forecast: showNewForecast wires projectedNewByDay into the dataset', () => {
  const cards = [mkCard('n1', 'd1'), mkCard('n2', 'd1')]
  const ds = buildRhythmDataset(
    mkInput({
      cards,
      deckNewPerDay: { d1: 1 },
      settings: mkSettings({ forecastLimit: '30d', showNewForecast: true, showReviewForecast: false }),
    }),
  )
  const day1 = ds.forecastDays.find((c) => c.day === '2026-06-16')
  const day2 = ds.forecastDays.find((c) => c.day === '2026-06-17')
  assert.equal(day1?.projectedNew, 1)
  assert.equal(day2?.projectedNew, 1)
  assert.equal(ds.stats.projectedNewInForecast, 2)

  const off = buildRhythmDataset(
    mkInput({
      cards,
      deckNewPerDay: { d1: 1 },
      settings: mkSettings({ forecastLimit: '30d', showNewForecast: false }),
    }),
  )
  assert.equal(off.stats.projectedNewInForecast, 0)
})

// ---- averages / totals / empty state ---------------------------------------

test('dailyAverage, activeDays and totalReviews stay consistent', () => {
  const events = [
    mkEvent({ localDay: '2026-06-13' }),
    mkEvent({ id: 'x', localDay: '2026-06-13' }),
    mkEvent({ id: 'y', localDay: TODAY }),
  ]
  const cards = [mkCard('c1', 'd1')]
  const ds = buildRhythmDataset(
    mkInput({ events, cards, settings: mkSettings({ historyLimit: 'all', ignoreBefore: null }) }),
  )
  assert.equal(ds.stats.totalReviews, 3)
  assert.equal(ds.stats.activeDays, 2)
  assert.equal(ds.stats.dailyAverage, 1.5)
})

test('empty input: isEmpty is true and every stat is zero', () => {
  const ds = buildRhythmDataset(mkInput())
  assert.equal(ds.hasHistory, false)
  assert.equal(ds.isEmpty, true)
  assert.equal(ds.stats.totalReviews, 0)
  assert.equal(ds.stats.activeDays, 0)
  assert.equal(ds.stats.dailyAverage, 0)
  assert.equal(ds.stats.currentStreak, 0)
  assert.equal(ds.stats.longestStreak, 0)
  assert.equal(ds.stats.reviewTimeMs, 0)
  assert.equal(ds.stats.hasReviewTime, false)
  assert.equal(ds.stats.dueInForecast, 0)
  assert.equal(ds.stats.projectedNewInForecast, 0)
  // Default settings: historyLimit '3m' (90 days) and forecastLimit '30d'.
  assert.equal(ds.historyDays.length, 90)
  assert.equal(ds.forecastDays.length, 30)
})

test('isEmpty is false when there is no history but the forecast has something to show', () => {
  const cards = [
    mkCard('c1', 'd1', { schedule: { state: 'review', interval: 10, due: dueAt(2026, 6, 20) } }),
  ]
  const ds = buildRhythmDataset(mkInput({ cards, settings: mkSettings({ forecastLimit: '30d' }) }))
  assert.equal(ds.hasHistory, false)
  assert.equal(ds.isEmpty, false)
})

test('reviewTimeMs sums durations and hasReviewTime is true only with a positive recorded duration', () => {
  const events = [
    mkEvent({ localDay: TODAY, timeSpentMs: 1500 }),
    mkEvent({ id: 'y', localDay: TODAY, timeSpentMs: null }),
  ]
  const cards = [mkCard('c1', 'd1')]
  const ds = buildRhythmDataset(mkInput({ events, cards, settings: mkSettings({ historyLimit: '4w' }) }))
  assert.equal(ds.stats.reviewTimeMs, 1500)
  assert.equal(ds.stats.hasReviewTime, true)

  const zeroOnly = buildRhythmDataset(
    mkInput({
      events: [mkEvent({ localDay: TODAY, timeSpentMs: null })],
      cards,
      settings: mkSettings({ historyLimit: '4w' }),
    }),
  )
  assert.equal(zeroOnly.stats.reviewTimeMs, 0)
  assert.equal(zeroOnly.stats.hasReviewTime, false)
})

// ---- determinism + no mutation ----------------------------------------------

test('buildRhythmDataset is deterministic for the same input', () => {
  const events = [mkEvent({ localDay: TODAY })]
  const cards = [mkCard('c1', 'd1', { schedule: { state: 'review', interval: 5, due: dueAt(2026, 6, 20) } })]
  const input = mkInput({ events, cards, deckNewPerDay: { d1: 3 }, settings: mkSettings({ forecastLimit: '30d' }) })

  const first = buildRhythmDataset(input)
  const second = buildRhythmDataset(input)
  assert.deepEqual(first, second)
})

test('buildRhythmDataset does not mutate its input', () => {
  const events = [mkEvent({ localDay: TODAY })]
  const cards = [mkCard('c1', 'd1', { schedule: { state: 'review', interval: 5, due: dueAt(2026, 6, 20) } })]
  const settings = mkSettings({ forecastLimit: '30d', excludedDeckIds: ['zzz'] })
  const input = mkInput({ events, cards, deckNewPerDay: { d1: 3 }, settings })

  const before = JSON.stringify({ events, cards, settings, deckNewPerDay: input.deckNewPerDay })
  buildRhythmDataset(input)
  const after = JSON.stringify({ events, cards, settings, deckNewPerDay: input.deckNewPerDay })
  assert.equal(before, after)
})
