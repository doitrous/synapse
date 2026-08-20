import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newCard, grade, isDue, ANKI_DEFAULTS, type CardSchedule } from './srs.ts'

const at = new Date('2026-08-20T09:00:00.000Z')
const minutes = (n: number) => new Date(at.getTime() + n * 60_000).toISOString()
const days = (n: number) => new Date(at.getTime() + n * 86_400_000).toISOString()

const review = (over: Partial<CardSchedule> = {}): CardSchedule => ({
  state: 'review', step: 0, interval: 10, ease: 2.5, lapses: 0, reps: 5, due: at.toISOString(), ...over,
})

test('a new card starts due, with the starting ease', () => {
  const card = newCard(at)
  assert.equal(card.state, 'new')
  assert.equal(card.ease, 2.5)
  assert.equal(card.interval, 0)
  assert.equal(isDue(card, at), true)
})

test('Good on a new card enters learning at the second step, ten minutes out', () => {
  const card = grade(newCard(at), 'good', at, ANKI_DEFAULTS)
  assert.equal(card.state, 'learning')
  assert.equal(card.step, 1)
  assert.equal(card.due, minutes(10))
})

test('Again on a new card stays on the first step, one minute out', () => {
  const card = grade(newCard(at), 'again', at, ANKI_DEFAULTS)
  assert.equal(card.state, 'learning')
  assert.equal(card.step, 0)
  assert.equal(card.due, minutes(1))
})

test('Easy on a new card graduates straight to four days', () => {
  const card = grade(newCard(at), 'easy', at, ANKI_DEFAULTS)
  assert.equal(card.state, 'review')
  assert.equal(card.interval, 4)
  assert.equal(card.due, days(4))
})

test('Hard on a learning card repeats the step it is on', () => {
  const learning: CardSchedule = { ...newCard(at), state: 'learning', step: 1 }
  const card = grade(learning, 'hard', at, ANKI_DEFAULTS)
  assert.equal(card.step, 1)
  assert.equal(card.due, minutes(10))
})

test('Good on the last learning step graduates to one day', () => {
  const learning: CardSchedule = { ...newCard(at), state: 'learning', step: 1 }
  const card = grade(learning, 'good', at, ANKI_DEFAULTS)
  assert.equal(card.state, 'review')
  assert.equal(card.interval, 1)
})

test('Good on a review card multiplies the interval by its ease', () => {
  const card = grade(review({ interval: 10, ease: 2.5 }), 'good', at, ANKI_DEFAULTS)
  assert.equal(card.interval, 25)
  assert.equal(card.ease, 2.5)
})

test('Hard on a review card uses the hard multiplier and drops ease by fifteen', () => {
  const card = grade(review({ interval: 10, ease: 2.5 }), 'hard', at, ANKI_DEFAULTS)
  assert.equal(card.interval, 12)
  assert.equal(card.ease, 2.35)
})

test('Easy on a review card adds the easy bonus and raises ease by fifteen', () => {
  const card = grade(review({ interval: 10, ease: 2.5 }), 'easy', at, ANKI_DEFAULTS)
  assert.equal(card.interval, 33)
  assert.equal(card.ease, 2.65)
})

test('Again on a review card lapses it into relearning', () => {
  const card = grade(review({ interval: 10, ease: 2.5 }), 'again', at, ANKI_DEFAULTS)
  assert.equal(card.state, 'relearning')
  assert.equal(card.lapses, 1)
  assert.equal(card.ease, 2.3)
  // New interval after a lapse is 0% of the old one, floored at the minimum.
  assert.equal(card.interval, 1)
  assert.equal(card.due, minutes(10))
})

test('ease never falls below its floor however often a card lapses', () => {
  let card = review({ ease: 1.35 })
  for (let i = 0; i < 5; i++) card = grade({ ...card, state: 'review' }, 'again', at, ANKI_DEFAULTS)
  assert.equal(card.ease, 1.3)
})

test('an interval never exceeds the maximum', () => {
  const card = grade(review({ interval: 30000, ease: 2.5 }), 'easy', at, ANKI_DEFAULTS)
  assert.equal(card.interval, ANKI_DEFAULTS.maximumInterval)
})

test('graduating from relearning returns the card to review', () => {
  const relearning: CardSchedule = { ...review(), state: 'relearning', step: 0, interval: 1 }
  const card = grade(relearning, 'good', at, ANKI_DEFAULTS)
  assert.equal(card.state, 'review')
})

test('a card is not due before its time', () => {
  assert.equal(isDue(review({ due: days(1) }), at), false)
  assert.equal(isDue(review({ due: minutes(-1) }), at), true)
})
