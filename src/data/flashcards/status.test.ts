import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newCardMeta, type CardMeta } from './model.ts'
import {
  MATURE_THRESHOLD_DAYS,
  deckCounts,
  exclusiveCounts,
  exclusiveStatus,
  isBuried,
  isLearned,
  isMature,
  isReviewDue,
  isStudyEligible,
  isUnseen,
  isYoung,
  statusFlags,
} from './status.ts'
import type { CardSchedule } from '../srs.ts'

const now = new Date('2026-08-20T09:00:00.000Z')
const sched = (over: Partial<CardSchedule> = {}): CardSchedule => ({
  state: 'new', step: 0, interval: 0, ease: 2.5, lapses: 0, reps: 0, due: now.toISOString(), ...over,
})
const meta = (over: Partial<CardMeta> = {}): CardMeta => ({ ...newCardMeta(sched()), ...over })

test('the mature boundary is 21 days', () => {
  assert.equal(MATURE_THRESHOLD_DAYS, 21)
})

test('a review card is young at 20 days and mature at 21', () => {
  assert.equal(isYoung(meta({ schedule: sched({ state: 'review', interval: 20 }) })), true)
  assert.equal(isMature(meta({ schedule: sched({ state: 'review', interval: 20 }) })), false)
  assert.equal(isYoung(meta({ schedule: sched({ state: 'review', interval: 21 }) })), false)
  assert.equal(isMature(meta({ schedule: sched({ state: 'review', interval: 21 }) })), true)
})

test('unseen is exactly "never answered"', () => {
  assert.equal(isUnseen(meta({ reviewCount: 0 })), true)
  assert.equal(isUnseen(meta({ reviewCount: 1 })), false)
})

test('learned needs a review and no reset since', () => {
  assert.equal(isLearned(meta({ reviewCount: 0 })), false)
  assert.equal(isLearned(meta({ reviewCount: 3, resetSinceReview: false })), true)
  assert.equal(isLearned(meta({ reviewCount: 3, resetSinceReview: true })), false)
})

test('a suspended review card is never counted review-due', () => {
  const due = sched({ state: 'review', interval: 5, due: new Date(now.getTime() - 1000).toISOString() })
  assert.equal(isReviewDue(meta({ schedule: due }), now), true)
  assert.equal(isReviewDue(meta({ schedule: due, suspended: true }), now), false)
})

test('bury rolls over on the local day, not the instant', () => {
  const buried = meta({ buriedUntil: '2026-08-21' })
  assert.equal(isBuried(buried, now), true) // 08-20 < 08-21
  const next = new Date('2026-08-21T00:05:00.000Z')
  assert.equal(isBuried(buried, next), false) // 08-21 is not < 08-21
})

test('a buried or suspended card is not study-eligible', () => {
  const dueReview = sched({ state: 'review', interval: 5, due: new Date(now.getTime() - 1).toISOString() })
  assert.equal(isStudyEligible(meta({ schedule: dueReview }), now), true)
  assert.equal(isStudyEligible(meta({ schedule: dueReview, suspended: true }), now), false)
  assert.equal(isStudyEligible(meta({ schedule: dueReview, buriedUntil: '2026-08-25' }), now), false)
})

test('deck counts use total as the denominator and let measures overlap', () => {
  const metas = [
    meta({ schedule: sched(), reviewCount: 0 }), // new + unseen
    meta({ schedule: sched({ state: 'review', interval: 30, due: '2026-09-15T09:00:00.000Z' }), reviewCount: 5 }), // mature + learned, not yet due
    meta({ schedule: sched({ state: 'review', interval: 5, due: new Date(now.getTime() - 1).toISOString() }), reviewCount: 2 }), // young + due + learned
    meta({ schedule: sched({ state: 'learning', step: 0 }), reviewCount: 1, suspended: true }), // learning + suspended
  ]
  const c = deckCounts(metas, now)
  assert.equal(c.total, 4)
  assert.equal(c.new, 1)
  assert.equal(c.unseen, 1)
  assert.equal(c.mature, 1)
  assert.equal(c.young, 1)
  assert.equal(c.reviewDue, 1)
  assert.equal(c.learned, 3)
  assert.equal(c.learning, 1)
  assert.equal(c.suspended, 1)
  // Overlaps mean the measures do NOT sum to total — that is expected.
  assert.ok(c.new + c.mature + c.young + c.learning + c.learned > c.total)
})

test('exclusive status partitions the deck exactly once', () => {
  const metas = [
    meta({ schedule: sched() }),
    meta({ schedule: sched({ state: 'learning' }) }),
    meta({ schedule: sched({ state: 'relearning' }) }),
    meta({ schedule: sched({ state: 'review', interval: 10 }) }),
    meta({ schedule: sched({ state: 'review', interval: 40 }) }),
    meta({ schedule: sched({ state: 'review', interval: 40 }), suspended: true }),
    meta({ schedule: sched({ state: 'review', interval: 40 }), buriedUntil: '2026-09-01' }),
  ]
  const c = exclusiveCounts(metas, now)
  const sum = c.new + c.learning + c.relearning + c.young + c.mature + c.suspended + c.buried
  assert.equal(sum, metas.length)
  assert.equal(c.new, 1)
  assert.equal(c.suspended, 1)
  assert.equal(c.buried, 1)
})

test('suspended and buried win over the scheduling state in the exclusive cut', () => {
  const matureButSuspended = meta({ schedule: sched({ state: 'review', interval: 40 }), suspended: true })
  assert.equal(exclusiveStatus(matureButSuspended, now), 'suspended')
})

test('statusFlags agrees with the individual predicates', () => {
  const m = meta({ schedule: sched({ state: 'review', interval: 25 }), reviewCount: 4 })
  const f = statusFlags(m, now)
  assert.equal(f.mature, true)
  assert.equal(f.learned, true)
  assert.equal(f.young, false)
  assert.equal(f.unseen, false)
})
