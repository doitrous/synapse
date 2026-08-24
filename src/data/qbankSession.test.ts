import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  clearsStoredSitting, finishedManifests, liveSittingId, pendingAttempts, persistsSitting,
  paceBand, restorableQuestions, selectClearsStrike, timedClock, type StoredSitting,
} from './qbankSession.ts'
import type { Question } from './qbank.ts'

function question(id: string): Question {
  return {
    id, subjectId: 'cvs', topic: 'Heart failure', difficulty: 'Moderate', vignette: '', stem: id,
    options: [], explanation: '', libraryRefs: [], resourceRefs: [],
  } as unknown as Question
}

function sitting(sessionId: string, questionIds: string[], submitted = false): StoredSitting {
  return { sessionId, questionIds, submitted }
}

const POOL = [question('q1'), question('q2'), question('q3')]

test('a stored sitting comes back in the order it was sat, not pool order', () => {
  const rebuilt = restorableQuestions(sitting('s1', ['q3', 'q1']), POOL)
  assert.deepEqual(rebuilt?.map((q) => q.id), ['q3', 'q1'])
})

test('a sitting holding a question that is no longer published is dropped, not shortened', () => {
  assert.equal(restorableQuestions(sitting('s1', ['q1', 'gone']), POOL), null)
})

test('a sitting that stored no questions is empty, not unrestorable', () => {
  // The guard answers "can this be sat again", and an empty paper technically
  // can — so both the mount restore and Continue let it through, and the runner
  // still needs its own no-questions fallback. Worth pinning: reading `[]` as a
  // drop would make the two disagree.
  assert.deepEqual(restorableQuestions(sitting('s1', []), POOL), [])
})

test('the stored sitting is cleared when it is the one on screen', () => {
  assert.equal(clearsStoredSitting(sitting('s1', ['q1']), 's1'), true)
})

test('leaving a past test does not clear a different paused sitting', () => {
  // Finding #2: this was unconditional, so stepping out of a past test's
  // results threw away whatever sitting the student still had paused.
  assert.equal(clearsStoredSitting(sitting('s1', ['q1']), 's2'), false)
})

test('nothing stored is nothing to clear', () => {
  assert.equal(clearsStoredSitting(null, 's1'), false)
})

test('the hub is not a sitting to persist', () => {
  assert.equal(persistsSitting('setup', false), false)
})

test('a review is not work in progress and must not overwrite a paused sitting', () => {
  // Finding #3.
  assert.equal(persistsSitting('running', true), false)
  assert.equal(persistsSitting('results', true), false)
})

test('a sitting being sat, and its results, are persisted', () => {
  assert.equal(persistsSitting('running', false), true)
  assert.equal(persistsSitting('results', false), true)
})

test('an open sitting is the live one', () => {
  assert.equal(liveSittingId(sitting('s1', ['q1'])), 's1')
})

test('a submitted sitting is no longer live', () => {
  // Finding #4: a handed-in test kept showing as the sitting still open.
  assert.equal(liveSittingId(sitting('s1', ['q1'], true)), null)
})

test('nothing stored means no live sitting', () => {
  assert.equal(liveSittingId(null), null)
})

test('the sitting still open contributes no omissions', () => {
  // Finding #5: a manifest is filed when a sitting starts, so an open one had
  // every question not reached yet counted as omitted.
  const manifests = { s1: ['q1', 'q2'], s2: ['q3'] }
  assert.deepEqual(finishedManifests(manifests, sitting('s2', ['q3'])), { s1: ['q1', 'q2'] })
})

test('once handed in, a sitting counts towards omissions like any other', () => {
  const manifests = { s1: ['q1', 'q2'], s2: ['q3'] }
  assert.deepEqual(finishedManifests(manifests, sitting('s2', ['q3'], true)), manifests)
})

test('with no sitting open the manifest map is left alone', () => {
  const manifests = { s1: ['q1'] }
  assert.equal(finishedManifests(manifests, null), manifests)
})

test('choosing an option you had crossed off uncrosses it', () => {
  // Finding #6: it rendered selected and struck through at once.
  assert.deepEqual(selectClearsStrike({ q1: [0, 2] }, 'q1', 2), { q1: [0] })
})

test('choosing an option that was never crossed off writes nothing', () => {
  // Returned by identity, so React skips the render the write would cost.
  const struck = { q1: [0] }
  assert.equal(selectClearsStrike(struck, 'q1', 1), struck)
  const none: Record<string, number[]> = {}
  assert.equal(selectClearsStrike(none, 'q1', 1), none)
})

test('uncrossing one question leaves the others crossed', () => {
  assert.deepEqual(selectClearsStrike({ q1: [1], q2: [0] }, 'q1', 1), { q1: [], q2: [0] })
})

test('a timed sitting commits every answer that has no record yet', () => {
  const pending = pendingAttempts(POOL, { q1: 0, q3: 1 }, { q1: true })
  assert.deepEqual(pending.map((q) => q.id), ['q3'])
})

test('a sitting whose answers are all recorded commits nothing again', () => {
  assert.deepEqual(pendingAttempts(POOL, { q1: 0, q2: 1 }, { q1: true, q2: true }), [])
})

test('a question left unanswered is not committed', () => {
  assert.deepEqual(pendingAttempts(POOL, {}, {}), [])
})

test('a timed sitting counts down from ninety seconds per question', () => {
  assert.deepEqual(timedClock(3, 1), { remaining: 269, overtime: 0 })
  assert.deepEqual(timedClock(3, 270), { remaining: 0, overtime: 0 })
})

test('a timed sitting continues upward as explicit overtime', () => {
  assert.deepEqual(timedClock(2, 193), { remaining: 0, overtime: 13 })
})

test('question pace uses the agreed inclusive boundaries', () => {
  assert.equal(paceBand(45), 'good')
  assert.equal(paceBand(46), 'target')
  assert.equal(paceBand(60), 'target')
  assert.equal(paceBand(61), 'slower')
  assert.equal(paceBand(90), 'slower')
  assert.equal(paceBand(91), 'overtime')
})
