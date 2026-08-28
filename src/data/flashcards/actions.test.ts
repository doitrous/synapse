import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newCardMeta } from './model.ts'
import { sm2Scheduler } from './scheduler.ts'
import { buryCard, gradeCard, resetCard, setDueDate, suspendCard, unsuspendCard } from './actions.ts'
import { isBuried } from './status.ts'

const now = new Date('2026-08-20T09:00:00.000Z')
const scheduler = sm2Scheduler()
const ctx = { cardId: 'n1::card', noteId: 'n1', deckId: 'd1', scheduler: 'sm2' as const }
const fresh = () => newCardMeta(scheduler.newCard(now))

test('grading advances the schedule, counts the review, and logs a grade event', () => {
  const { meta, event } = gradeCard(fresh(), 'good', ctx, scheduler, now, 4200)
  assert.equal(meta.reviewCount, 1)
  assert.equal(meta.resetSinceReview, false)
  assert.equal(meta.firstReviewedAt, now.toISOString())
  assert.equal(meta.lastReviewedAt, now.toISOString())
  assert.equal(event.kind, 'grade')
  assert.equal(event.grade, 'good')
  assert.equal(event.timeSpentMs, 4200)
  assert.equal(event.intervalBefore, 0)
  assert.equal(event.localDay, '2026-08-20')
})

test('the transition never mutates the input meta', () => {
  const before = fresh()
  gradeCard(before, 'again', ctx, scheduler, now)
  assert.equal(before.reviewCount, 0)
})

test('reset returns to new, keeps reviewCount, and flips resetSinceReview', () => {
  const studied = gradeCard(gradeCard(fresh(), 'easy', ctx, scheduler, now).meta, 'good', ctx, scheduler, now).meta
  assert.equal(studied.reviewCount, 2)
  const { meta, event } = resetCard(studied, ctx, scheduler, now)
  assert.equal(meta.schedule.state, 'new')
  assert.equal(meta.reviewCount, 2, 'history is kept')
  assert.equal(meta.resetSinceReview, true)
  assert.equal(event.kind, 'reset')
})

test('reviewing after a reset makes the card learned again', () => {
  const reset = resetCard(gradeCard(fresh(), 'good', ctx, scheduler, now).meta, ctx, scheduler, now).meta
  assert.equal(reset.resetSinceReview, true)
  const relearned = gradeCard(reset, 'good', ctx, scheduler, now).meta
  assert.equal(relearned.resetSinceReview, false)
})

test('set due date makes the card a review due on that day', () => {
  const { meta, event } = setDueDate(fresh(), '2026-08-30', ctx, now)
  assert.equal(meta.schedule.state, 'review')
  assert.equal(meta.schedule.interval, 10)
  assert.equal(event.kind, 'set-due')
})

test('set due date in the past floors the interval at zero', () => {
  const { meta } = setDueDate(fresh(), '2026-08-10', ctx, now)
  assert.equal(meta.schedule.interval, 0)
})

test('bury hides until the next local day; unbury clears it', () => {
  const { meta, event } = buryCard(fresh(), ctx, now)
  assert.equal(meta.buriedUntil, '2026-08-21')
  assert.equal(isBuried(meta, now), true)
  assert.equal(event.kind, 'bury')
})

test('suspend and unsuspend toggle the flag and log both', () => {
  const s = suspendCard(fresh(), ctx, now)
  assert.equal(s.meta.suspended, true)
  assert.equal(s.event.kind, 'suspend')
  const u = unsuspendCard(s.meta, ctx, now)
  assert.equal(u.meta.suspended, false)
  assert.equal(u.event.kind, 'unsuspend')
})
