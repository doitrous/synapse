import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildQueue, seenTodayFromEvents, type QueueEntry } from './queue.ts'
import { newCardMeta, type CardMeta, type ReviewEvent } from './model.ts'
import type { CardSchedule } from '../srs.ts'

const now = new Date('2026-08-20T09:00:00.000Z')
const config = { newPerDay: 20, maxReviewsPerDay: 200 }
const sched = (over: Partial<CardSchedule> = {}): CardSchedule => ({
  state: 'new', step: 0, interval: 0, ease: 2.5, lapses: 0, reps: 0, due: now.toISOString(), ...over,
})
const entry = (id: string, over: Partial<CardMeta> = {}): QueueEntry => ({ id, meta: { ...newCardMeta(sched()), ...over } })
const dueReview = (id: string, extra: Partial<CardMeta> = {}) =>
  entry(id, { schedule: sched({ state: 'review', interval: 5, due: new Date(now.getTime() - 1000).toISOString() }), ...extra })

test('due cards come before new cards', () => {
  const q = buildQueue([entry('new1'), dueReview('due1')], now, config, { newSeen: 0, reviewsSeen: 0 })
  assert.deepEqual(q, ['due1', 'new1'])
})

test('suspended and buried cards are never queued', () => {
  const q = buildQueue(
    [dueReview('due1'), dueReview('sus', { suspended: true }), dueReview('bur', { buriedUntil: '2026-08-25' })],
    now, config, { newSeen: 0, reviewsSeen: 0 },
  )
  assert.deepEqual(q, ['due1'])
})

test('the daily caps bound new and review counts, minus what was seen today', () => {
  const news = Array.from({ length: 30 }, (_, i) => entry(`n${i}`))
  assert.equal(buildQueue(news, now, config, { newSeen: 0, reviewsSeen: 0 }).length, 20)
  assert.equal(buildQueue(news, now, config, { newSeen: 18, reviewsSeen: 0 }).length, 2)
})

test('seen-today is read off the log, split by the state answered', () => {
  const ev = (over: Partial<ReviewEvent>): ReviewEvent => ({
    id: 'e', at: '', cardId: 'c', noteId: 'n', deckId: 'd1', kind: 'grade', grade: 'good',
    stateBefore: 'review', stateAfter: 'review', intervalBefore: 1, intervalAfter: 2,
    timeSpentMs: null, scheduler: 'sm2', localDay: '2026-08-20', ...over,
  })
  const events = [
    ev({ stateBefore: 'new' }),
    ev({ stateBefore: 'new' }),
    ev({ stateBefore: 'review' }),
    ev({ localDay: '2026-08-19' }), // yesterday — ignored
    ev({ deckId: 'other' }), // another deck — ignored
    ev({ kind: 'suspend' }), // not a grade — ignored
  ]
  const seen = seenTodayFromEvents(events, 'd1', now)
  assert.deepEqual(seen, { newSeen: 2, reviewsSeen: 1 })
})
