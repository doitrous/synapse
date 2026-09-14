import test from 'node:test'
import assert from 'node:assert/strict'
import { accuracyBand, rankAccuracy, rankMastery, recordVerifiedAttempts, viewerStanding } from './qbankAttempts.js'
import { pool } from './db.js'

test('pace bands follow the requested timing thresholds', () => {
  assert.equal(accuracyBand(45), 'good')
  assert.equal(accuracyBand(46), 'target')
  assert.equal(accuracyBand(60), 'target')
  assert.equal(accuracyBand(61), 'slower')
  assert.equal(accuracyBand(90), 'slower')
  assert.equal(accuracyBand(91), 'overtime')
})

test('accuracy leaderboard requires 100 verified answers and ranks by accuracy, evidence, recency', () => {
  const rows = rankAccuracy([
    { userId: 'too-small', username: 'small', verifiedAnswers: 99, correctAnswers: 99, lastVerifiedAt: '2026-08-24T10:00:00Z' },
    { userId: 'a', username: 'alpha', verifiedAnswers: 120, correctAnswers: 96, lastVerifiedAt: '2026-08-22T10:00:00Z' },
    { userId: 'b', username: 'bravo', verifiedAnswers: 140, correctAnswers: 112, lastVerifiedAt: '2026-08-20T10:00:00Z' },
    { userId: 'c', username: 'charlie', verifiedAnswers: 140, correctAnswers: 112, lastVerifiedAt: '2026-08-24T10:00:00Z' },
  ])
  assert.deepEqual(rows.map((row) => row.username), ['charlie', 'bravo', 'alpha'])
  assert.equal(rows[0].rank, 1)
  assert.equal(rows[0].accuracy, 0.8)

  const rankedViewer = viewerStanding(rows, 'a')
  assert.equal(rankedViewer.eligible, true)
  assert.equal(rankedViewer.rank, 3)
  assert.equal(rankedViewer.total, 3)
  assert.equal(rankedViewer.row.verifiedAnswers, 120)

  const unrankedViewer = viewerStanding(rows, 'too-small')
  assert.equal(unrankedViewer.eligible, false)
  assert.equal(unrankedViewer.rank, null)
  assert.equal(unrankedViewer.total, 3)
  assert.equal(unrankedViewer.row, null)
})

test('mastery ranks secured concepts with at least three attempts and eighty percent accuracy', () => {
  const rows = rankMastery([
    { userId: 'a', username: 'alpha', conceptIds: JSON.stringify(['c1']), correct: 1, verifiedAt: '2026-08-20T10:00:00Z' },
    { userId: 'a', username: 'alpha', conceptIds: JSON.stringify(['c1']), correct: 1, verifiedAt: '2026-08-21T10:00:00Z' },
    { userId: 'a', username: 'alpha', conceptIds: JSON.stringify(['c1']), correct: 1, verifiedAt: '2026-08-22T10:00:00Z' },
    { userId: 'b', username: 'bravo', conceptIds: JSON.stringify(['c1']), correct: 1, verifiedAt: '2026-08-20T10:00:00Z' },
    { userId: 'b', username: 'bravo', conceptIds: JSON.stringify(['c1']), correct: 0, verifiedAt: '2026-08-21T10:00:00Z' },
    { userId: 'b', username: 'bravo', conceptIds: JSON.stringify(['c1']), correct: 1, verifiedAt: '2026-08-22T10:00:00Z' },
    { userId: 'b', username: 'bravo', conceptIds: JSON.stringify(['c1']), correct: 1, verifiedAt: '2026-08-23T10:00:00Z' },
    { userId: 'b', username: 'bravo', conceptIds: JSON.stringify(['c1']), correct: 1, verifiedAt: '2026-08-24T10:00:00Z' },
    { userId: 'b', username: 'bravo', conceptIds: JSON.stringify(['c2']), correct: 1, verifiedAt: '2026-08-24T10:00:00Z' },
    { userId: 'b', username: 'bravo', conceptIds: JSON.stringify(['c2']), correct: 1, verifiedAt: '2026-08-24T10:01:00Z' },
    { userId: 'b', username: 'bravo', conceptIds: JSON.stringify(['c2']), correct: 1, verifiedAt: '2026-08-24T10:02:00Z' },
  ])
  assert.deepEqual(rows.map((row) => [row.username, row.securedConcepts]), [['bravo', 2], ['alpha', 1]])

  const rankedViewer = viewerStanding(rows, 'b')
  assert.equal(rankedViewer.eligible, true)
  assert.equal(rankedViewer.rank, 1)
  assert.equal(rankedViewer.total, 2)
  assert.equal(rankedViewer.row.securedConcepts, 2)

  const unrankedViewer = viewerStanding(rows, 'nobody')
  assert.equal(unrankedViewer.eligible, false)
  assert.equal(unrankedViewer.rank, null)
  assert.equal(unrankedViewer.total, 2)
})

test('recordVerifiedAttempts writes a whole batch in one query, not one per attempt', async (t) => {
  // A minimal published, markable question: one ledger item is enough to
  // score every attempt in the batch against the same key.
  const ledger = [{
    id: 'q1',
    kind: 'question',
    status: 'Published',
    title: 'Q1',
    subjectId: 'anatomy',
    fields: { subtopic: 'General' },
    questionData: {
      tags: { topic: 'Topic', mainConceptIds: ['c1'], conceptIds: [] },
      correctAnswer: 'A',
      answers: [{ label: 'A', text: 'Correct' }, { label: 'B', text: 'Wrong' }],
    },
  }]

  const connSql = []
  const conn = {
    beginTransaction: async () => {},
    commit: async () => {},
    rollback: async () => {},
    release: () => {},
    query: async (sql) => { connSql.push(sql); return [{ affectedRows: 3 }] },
  }
  t.mock.method(pool, 'getConnection', async () => conn)
  t.mock.method(pool, 'query', async (sql) => {
    if (/FROM students WHERE user_id/.test(sql)) {
      return [[{ id: 'stu-1', universityId: 'cairo', year: 'Year 1', username: 'omary98', profileIcon: null }]]
    }
    if (/FROM app_state s WHERE s\.k IN/.test(sql)) {
      return [[{ k: 'nishany-admin-content-ledger-v4', v: JSON.stringify(ledger), version: '1' }]]
    }
    return [[]]
  })

  const result = await recordVerifiedAttempts('user-1', {
    attempts: [
      { attemptId: 'a1', questionId: 'q1', answerIndex: 0 },
      { attemptId: 'a2', questionId: 'q1', answerIndex: 1 },
      { attemptId: 'a3', questionId: 'q1', answerIndex: 0 },
    ],
  })

  assert.equal(result.ok, true)
  assert.equal(result.recorded, 3)
  const inserts = connSql.filter((sql) => /INSERT INTO qbank_attempts/.test(sql))
  assert.equal(inserts.length, 1, 'three attempts should reach the database as a single multi-row INSERT')
  assert.equal((inserts[0].match(/\(\?, \?/g) || []).length, 3, 'the one INSERT carries all three rows')
  // last_active is stamped on the same connection so it commits with the batch.
  assert.ok(connSql.some((sql) => /UPDATE students SET last_active/.test(sql)), 'last_active is updated in the same transaction')
})
