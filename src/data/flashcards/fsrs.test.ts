import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  FSRS5_DEFAULT_WEIGHTS,
  fsrsScheduler,
  initialDifficulty,
  initialStability,
  intervalFromStability,
  nextDifficulty,
  nextStabilityOnForget,
  nextStabilityOnRecall,
  retrievability,
} from './fsrs.ts'
import { sm2Scheduler } from './scheduler.ts'
import type { Grade } from '../srs.ts'

const w = FSRS5_DEFAULT_WEIGHTS

const approx = (a: number, b: number, eps = 1e-6): void => {
  assert.ok(Math.abs(a - b) < eps, `expected ${a} within ${eps} of ${b}`)
}

// --- retrievability ---------------------------------------------------

test('retrievability(0, S) === 1 for any stability', () => {
  approx(retrievability(0, 5), 1)
  approx(retrievability(0, 0.4), 1)
  approx(retrievability(0, 100), 1)
})

test('retrievability(S, S) === 0.9 for any stability (definition of stability)', () => {
  for (const s of [2, 3.173, 100]) {
    approx(retrievability(s, s), 0.9, 1e-9)
  }
})

test('retrievability strictly decreases as elapsed days grow, at fixed stability', () => {
  const s = 10
  const days = [0, 1, 2, 5, 10, 30, 100]
  const values = days.map((d) => retrievability(d, s))
  for (let i = 1; i < values.length; i++) {
    assert.ok(values[i] < values[i - 1], `retrievability should drop from day ${days[i - 1]} to ${days[i]}`)
  }
})

// --- intervalFromStability ---------------------------------------------

test('intervalFromStability(S, 0.9) === S (FACTOR is defined so 0.9 round-trips exactly)', () => {
  for (const s of [1, 3.173, 15.69105, 50]) {
    approx(intervalFromStability(s, 0.9), s, 1e-9)
  }
})

// --- initialStability ---------------------------------------------------

test('initialStability maps rating directly to w0..w3', () => {
  approx(initialStability(1), 0.40255) // again
  approx(initialStability(2), 1.18385) // hard
  approx(initialStability(3), 3.173) // good
  approx(initialStability(4), 15.69105) // easy
})

// --- initialDifficulty ---------------------------------------------------

test('initialDifficulty matches the FSRS-5 D0 formula and stays in [1,10]', () => {
  approx(initialDifficulty(3), 5.2827, 1e-3) // good
  approx(initialDifficulty(1), 7.1949, 1e-6) // again: w4 - e^0 + 1 = w4
  approx(initialDifficulty(4), 3.225, 1e-3) // easy
  for (const g of [1, 2, 3, 4]) {
    const d = initialDifficulty(g)
    assert.ok(d >= 1 && d <= 10, `initialDifficulty(${g}) = ${d} out of [1,10]`)
  }
})

// --- nextDifficulty ---------------------------------------------------

test('nextDifficulty stays within [1,10] across all ratings from extreme starting difficulties', () => {
  for (const d0 of [1, 3, 5.28, 8, 10]) {
    for (const g of [1, 2, 3, 4]) {
      const d = nextDifficulty(d0, g)
      assert.ok(d >= 1 && d <= 10, `nextDifficulty(${d0}, ${g}) = ${d} out of [1,10]`)
    }
  }
})

test("nextDifficulty: 'again' increases difficulty, 'easy' decreases it, from the same starting D", () => {
  const d0 = 5
  const dAgain = nextDifficulty(d0, 1)
  const dEasy = nextDifficulty(d0, 4)
  assert.ok(dAgain > d0, `again should raise difficulty: ${dAgain} vs ${d0}`)
  assert.ok(dEasy < d0, `easy should lower difficulty: ${dEasy} vs ${d0}`)
  assert.ok(dAgain > dEasy)
})

// --- scheduler: NEW card transitions ---------------------------------------------------

const NOW = new Date('2026-01-01T00:00:00Z')

test('fsrsScheduler.grade on a NEW card, answer good', () => {
  const scheduler = fsrsScheduler()
  const card = scheduler.newCard(NOW)
  const before = JSON.stringify(card)

  const next = scheduler.grade(card, 'good', NOW)

  approx(next.stability!, 3.173)
  approx(next.difficulty!, 5.2827, 1e-3)
  assert.equal(next.interval, 3) // round(3.173)
  assert.equal(next.state, 'review')
  assert.equal(next.due, new Date(NOW.getTime() + 3 * 86_400_000).toISOString())
  assert.equal(next.reps, 1)
  assert.equal(next.lapses, 0)
  assert.equal(JSON.stringify(card), before, 'grade() must not mutate its input')
})

test('fsrsScheduler.grade on a NEW card, answer easy', () => {
  const scheduler = fsrsScheduler()
  const card = scheduler.newCard(NOW)
  const next = scheduler.grade(card, 'easy', NOW)

  approx(next.stability!, 15.69105)
  assert.equal(next.interval, 16) // round(15.69105)
  assert.equal(next.due, new Date(NOW.getTime() + 16 * 86_400_000).toISOString())
})

test('fsrsScheduler.grade on a NEW card, answer again', () => {
  const scheduler = fsrsScheduler()
  const card = scheduler.newCard(NOW)
  const next = scheduler.grade(card, 'again', NOW)

  approx(next.stability!, 0.40255)
  assert.equal(next.interval, 1) // round(0.40255) = 0, clamped up to the 1-day floor
  assert.equal(next.lapses, 0, "failing a NEW card is not a lapse of an existing memory")
  assert.equal(next.state, 'review')
})

// --- scheduler: REVIEW card transitions ---------------------------------------------------

/** Grade a fresh card 'good' once, producing a REVIEW-state card with real stability/difficulty. */
function firstReviewCard() {
  const scheduler = fsrsScheduler()
  const card = scheduler.newCard(NOW)
  return { scheduler, reviewCard: scheduler.grade(card, 'good', NOW) }
}

test('grading a REVIEW card good grows stability past the last review', () => {
  const { scheduler, reviewCard } = firstReviewCard()
  const laterNow = new Date(NOW.getTime() + reviewCard.interval * 86_400_000)

  const next = scheduler.grade(reviewCard, 'good', laterNow)

  assert.ok(next.stability! > reviewCard.stability!, `${next.stability} should exceed ${reviewCard.stability}`)
  assert.equal(next.reps, 2)
})

test('at the same review state, easy grows stability more than good, good more than hard', () => {
  const { scheduler, reviewCard } = firstReviewCard()
  const laterNow = new Date(NOW.getTime() + reviewCard.interval * 86_400_000)

  const hard = scheduler.grade(reviewCard, 'hard', laterNow)
  const good = scheduler.grade(reviewCard, 'good', laterNow)
  const easy = scheduler.grade(reviewCard, 'easy', laterNow)

  assert.ok(easy.stability! > good.stability!, `easy (${easy.stability}) should exceed good (${good.stability})`)
  assert.ok(good.stability! > hard.stability!, `good (${good.stability}) should exceed hard (${hard.stability})`)
})

test("grading a REVIEW card 'again' shrinks stability below the recall path and increments lapses", () => {
  const { scheduler, reviewCard } = firstReviewCard()
  const laterNow = new Date(NOW.getTime() + reviewCard.interval * 86_400_000)

  const hard = scheduler.grade(reviewCard, 'hard', laterNow)
  const again = scheduler.grade(reviewCard, 'again', laterNow)

  assert.ok(again.stability! < hard.stability!, `again (${again.stability}) should be below hard's recall (${hard.stability})`)
  assert.equal(again.lapses, reviewCard.lapses + 1)
  assert.equal(reviewCard.lapses, 0, 'sanity: the first good review was not itself a lapse')
})

test('nextStabilityOnRecall and nextStabilityOnForget agree with the scheduler at a known elapsed time', () => {
  const { reviewCard } = firstReviewCard()
  const elapsedDays = reviewCard.interval
  const r = retrievability(elapsedDays, reviewCard.stability!)

  const expectedGood = nextStabilityOnRecall(reviewCard.difficulty!, reviewCard.stability!, r, 3)
  const expectedAgain = nextStabilityOnForget(reviewCard.difficulty!, reviewCard.stability!, r)

  const scheduler = fsrsScheduler()
  const laterNow = new Date(NOW.getTime() + elapsedDays * 86_400_000)
  const good = scheduler.grade(reviewCard, 'good', laterNow)
  const again = scheduler.grade(reviewCard, 'again', laterNow)

  approx(good.stability!, expectedGood, 1e-9)
  approx(again.stability!, expectedAgain, 1e-9)
})

// --- preview ---------------------------------------------------

test('preview returns the same four schedules as calling grade individually', () => {
  const { scheduler, reviewCard } = firstReviewCard()
  const laterNow = new Date(NOW.getTime() + reviewCard.interval * 86_400_000)

  const preview = scheduler.preview(reviewCard, laterNow)

  for (const answer of ['again', 'hard', 'good', 'easy'] as Grade[]) {
    const direct = scheduler.grade(reviewCard, answer, laterNow)
    assert.deepEqual(preview[answer], direct)
  }
})

// --- FSRS never leaks onto an SM-2 card ---------------------------------------------------

test('a fresh SM-2 card has no stability field', () => {
  const card = sm2Scheduler().newCard(NOW)
  assert.equal(card.stability, undefined)
  assert.equal(card.difficulty, undefined)
})
