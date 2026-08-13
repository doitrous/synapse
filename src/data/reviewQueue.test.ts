import { test } from 'node:test'
import assert from 'node:assert/strict'
import { dueReviewItems, upcomingReviewItems, REVIEW_INTERVAL_DAYS } from './reviewQueue.ts'
import type { ConceptMastery, MasteryLedger } from './mastery.ts'

const NOW = new Date(2026, 7, 13, 9, 0)

function daysAgo(days: number): string {
  return new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() - days, 12, 0).toISOString()
}

function ledgerOf(...entries: Array<Partial<ConceptMastery> & { conceptId: string }>): MasteryLedger {
  const out: MasteryLedger = {}
  for (const entry of entries) {
    out[entry.conceptId] = {
      conceptId: entry.conceptId,
      attempts: entry.attempts ?? 0,
      correct: entry.correct ?? 0,
      encounters: entry.encounters ?? 0,
      lastSeen: entry.lastSeen ?? daysAgo(0),
    }
  }
  return out
}

test('a concept never encountered is not in the queue', () => {
  // An empty ledger entry would tell a student to "review" something they have
  // never met, which is a different instruction entirely.
  const ledger = ledgerOf({ conceptId: 'c1', attempts: 0, encounters: 0, lastSeen: daysAgo(30) })
  assert.deepEqual(dueReviewItems(ledger, NOW), [])
})

test('a shaky concept comes back the next day', () => {
  const fresh = ledgerOf({ conceptId: 'c1', attempts: 4, correct: 1, lastSeen: daysAgo(0) })
  assert.equal(dueReviewItems(fresh, NOW).length, 0)
  const yesterday = ledgerOf({ conceptId: 'c1', attempts: 4, correct: 1, lastSeen: daysAgo(1) })
  assert.equal(dueReviewItems(yesterday, NOW).length, 1)
  assert.equal(dueReviewItems(yesterday, NOW)[0].band, 'shaky')
})

test('a secure concept waits a fortnight', () => {
  const secure = { conceptId: 'c1', attempts: 5, correct: 5 }
  assert.equal(dueReviewItems(ledgerOf({ ...secure, lastSeen: daysAgo(10) }), NOW).length, 0)
  assert.equal(dueReviewItems(ledgerOf({ ...secure, lastSeen: daysAgo(14) }), NOW).length, 1)
  assert.equal(REVIEW_INTERVAL_DAYS.secure, 14)
})

test('a concept only practised on a station has no accuracy to report', () => {
  const ledger = ledgerOf({ conceptId: 'c1', attempts: 0, encounters: 2, lastSeen: daysAgo(3) })
  const [item] = dueReviewItems(ledger, NOW)
  assert.equal(item.band, 'practised')
  assert.equal(item.accuracyPct, null)
  assert.equal(item.attempts, 0)
})

test('the most overdue comes first', () => {
  const ledger = ledgerOf(
    { conceptId: 'a', attempts: 4, correct: 1, lastSeen: daysAgo(2) },
    { conceptId: 'b', attempts: 4, correct: 1, lastSeen: daysAgo(9) },
  )
  assert.deepEqual(dueReviewItems(ledger, NOW).map((item) => item.conceptId), ['b', 'a'])
})

test('an equal due date puts the weaker evidence first', () => {
  const ledger = ledgerOf(
    { conceptId: 'strong', attempts: 4, correct: 3, lastSeen: daysAgo(3) },
    { conceptId: 'weak', attempts: 4, correct: 2, lastSeen: daysAgo(3) },
  )
  // Both are developing, so both are due after three days.
  assert.deepEqual(dueReviewItems(ledger, NOW).map((item) => item.conceptId), ['weak', 'strong'])
})

test('due today is zero, not overdue', () => {
  const ledger = ledgerOf({ conceptId: 'c1', attempts: 4, correct: 3, lastSeen: daysAgo(3) })
  assert.equal(dueReviewItems(ledger, NOW)[0].dueInDays, 0)
})

test('an unreadable timestamp is skipped rather than crashing the queue', () => {
  const ledger = ledgerOf({ conceptId: 'c1', attempts: 4, correct: 1, lastSeen: 'not a date' })
  assert.deepEqual(dueReviewItems(ledger, NOW), [])
})

test('upcoming shows what is due soon but not yet', () => {
  const ledger = ledgerOf(
    { conceptId: 'due', attempts: 4, correct: 1, lastSeen: daysAgo(2) },
    { conceptId: 'tomorrow', attempts: 4, correct: 3, lastSeen: daysAgo(2) },
    { conceptId: 'later', attempts: 5, correct: 5, lastSeen: daysAgo(1) },
  )
  assert.deepEqual(upcomingReviewItems(ledger, 3, NOW).map((item) => item.conceptId), ['tomorrow'])
})
