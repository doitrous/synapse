import test from 'node:test'
import assert from 'node:assert/strict'
import { pool } from './db.js'
import { invalidatePublishedQuestions } from './publishedQuestions.js'
import { ANSWER_STATS_MIN_STUDENTS, answerDistributionFor } from './answerDistribution.js'

const LEDGER_KEY = 'synapse-admin-content-ledger-v4'
const MEDIA_KEY = 'synapse-media-library-v1'
const CATALOGUE_KEY = 'synapse-academic-universities-v1'

function question(id, optionCount = 4) {
  const answers = Array.from({ length: optionCount }, (_, index) => ({
    label: String.fromCharCode(65 + index),
    text: `Option ${index}`,
  }))
  return {
    id,
    kind: 'question',
    status: 'Published',
    title: id,
    subjectId: 'cvs',
    fields: {},
    questionData: { correctAnswer: 'A', answers, tags: {} },
  }
}

function ledgerSnapshot(version, questions) {
  return [
    { k: LEDGER_KEY, v: JSON.stringify(questions), version },
    { k: MEDIA_KEY, v: JSON.stringify({ records: [] }), version: 1 },
    { k: CATALOGUE_KEY, v: JSON.stringify([]), version: 1 },
  ]
}

/** Routes pool.query calls to canned results based on which table the SQL touches. */
function routedQuery({ profile, ledger, attempts }) {
  return async (sql) => {
    if (sql.includes('FROM students')) return [profile ? [profile] : []]
    if (sql.includes('FROM app_state')) return [ledger]
    if (sql.includes('FROM qbank_attempts')) return [attempts]
    throw new Error(`unexpected query: ${sql}`)
  }
}

async function withMockPool(mocks, run) {
  const originalQuery = pool.query
  pool.query = routedQuery(mocks)
  invalidatePublishedQuestions(LEDGER_KEY)
  try {
    await run()
  } finally {
    pool.query = originalQuery
    invalidatePublishedQuestions(LEDGER_KEY)
  }
}

const profile = { id: 'student-1', universityId: 'uni-a', year: 2 }

test('profile_incomplete when the caller has no university/year on file', async () => {
  await withMockPool(
    { profile: null, ledger: ledgerSnapshot(1, [question('q1')]), attempts: [] },
    async () => {
      const result = await answerDistributionFor('user-nobody', ['q1'])
      assert.deepEqual(result, { error: 'profile_incomplete' })
    },
  )
})

test('a student who re-answers in a later session is counted once, by their latest answer', async () => {
  // u1 answers option 0 first, then retakes in a new session and picks option 1.
  // Nine other distinct students all pick option 2. Only u1's latest answer
  // (option 1) should be tallied — never both of their rows.
  const attempts = [
    { userId: 'u1', questionId: 'q1', answerIndex: 0, answeredAt: '2026-08-01T10:00:00Z' },
    { userId: 'u1', questionId: 'q1', answerIndex: 1, answeredAt: '2026-08-02T10:00:00Z' },
    ...Array.from({ length: 9 }, (_, i) => ({
      userId: `u${i + 2}`,
      questionId: 'q1',
      answerIndex: 2,
      answeredAt: '2026-08-01T10:00:00Z',
    })),
  ]
  await withMockPool(
    { profile, ledger: ledgerSnapshot(1, [question('q1', 4)]), attempts },
    async () => {
      const result = await answerDistributionFor(profile.id, ['q1'])
      assert.equal(result.distributions.length, 1)
      const entry = result.distributions[0]
      assert.equal(entry.questionId, 'q1')
      assert.equal(entry.eligible, true)
      assert.equal(entry.total, 10)
      assert.deepEqual(entry.counts, [0, 1, 9, 0])
    },
  )
})

test('fewer than the minimum distinct students yields eligible:false with no counts', async () => {
  const attempts = Array.from({ length: ANSWER_STATS_MIN_STUDENTS - 1 }, (_, i) => ({
    userId: `u${i + 1}`,
    questionId: 'q1',
    answerIndex: 0,
    answeredAt: '2026-08-01T10:00:00Z',
  }))
  await withMockPool(
    { profile, ledger: ledgerSnapshot(1, [question('q1', 4)]), attempts },
    async () => {
      const result = await answerDistributionFor(profile.id, ['q1'])
      const entry = result.distributions[0]
      assert.equal(entry.eligible, false)
      assert.equal(entry.total, ANSWER_STATS_MIN_STUDENTS - 1)
      assert.equal('counts' in entry, false)
    },
  )
})

test('a healthy sample returns counts aligned to option indices, summing to total', async () => {
  const attempts = [
    ...Array.from({ length: 5 }, (_, i) => ({ userId: `a${i}`, questionId: 'q1', answerIndex: 0, answeredAt: '2026-08-01T10:00:00Z' })),
    ...Array.from({ length: 3 }, (_, i) => ({ userId: `b${i}`, questionId: 'q1', answerIndex: 1, answeredAt: '2026-08-01T10:00:00Z' })),
    ...Array.from({ length: 2 }, (_, i) => ({ userId: `c${i}`, questionId: 'q1', answerIndex: 2, answeredAt: '2026-08-01T10:00:00Z' })),
    ...Array.from({ length: 2 }, (_, i) => ({ userId: `d${i}`, questionId: 'q1', answerIndex: 3, answeredAt: '2026-08-01T10:00:00Z' })),
  ]
  await withMockPool(
    { profile, ledger: ledgerSnapshot(1, [question('q1', 4)]), attempts },
    async () => {
      const result = await answerDistributionFor(profile.id, ['q1'])
      const entry = result.distributions[0]
      assert.equal(entry.eligible, true)
      assert.equal(entry.total, 12)
      assert.deepEqual(entry.counts, [5, 3, 2, 2])
      assert.equal(entry.counts.reduce((sum, n) => sum + n, 0), entry.total)
    },
  )
})

test('an unknown question id yields eligible:false while known ids in the same request still resolve, in request order', async () => {
  const attempts = Array.from({ length: ANSWER_STATS_MIN_STUDENTS }, (_, i) => ({
    userId: `u${i}`,
    questionId: 'q1',
    answerIndex: 0,
    answeredAt: '2026-08-01T10:00:00Z',
  }))
  await withMockPool(
    { profile, ledger: ledgerSnapshot(1, [question('q1', 4)]), attempts },
    async () => {
      const result = await answerDistributionFor(profile.id, ['q-unknown', 'q1'])
      assert.equal(result.distributions.length, 2)
      assert.equal(result.distributions[0].questionId, 'q-unknown')
      assert.equal(result.distributions[0].eligible, false)
      assert.equal(result.distributions[0].total, 0)
      assert.equal('counts' in result.distributions[0], false)
      assert.equal(result.distributions[1].questionId, 'q1')
      assert.equal(result.distributions[1].eligible, true)
    },
  )
})

test('sanitizes the requested question ids: dedupes, drops empties, caps at 200', async () => {
  await withMockPool(
    { profile, ledger: ledgerSnapshot(1, [question('q1')]), attempts: [] },
    async () => {
      const manyIds = Array.from({ length: 250 }, (_, i) => `q-extra-${i}`)
      const result = await answerDistributionFor(profile.id, ['q1', 'q1', '', '  ', ...manyIds])
      assert.ok(result.distributions.length <= 200)
      assert.equal(result.distributions.filter((entry) => entry.questionId === 'q1').length, 1)
    },
  )
})
