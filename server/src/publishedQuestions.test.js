import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pool } from './db.js'
import { invalidatePublishedQuestions, publishedQuestions } from './publishedQuestions.js'

const LEDGER_KEY = 'nishany-admin-content-ledger-v4'
const MEDIA_KEY = 'nishany-media-library-v1'
const CATALOGUE_KEY = 'nishany-academic-universities-v1'

function question(status = 'Published') {
  return {
    id: 'q-cache', kind: 'question', status, title: 'Cache safety', subjectId: 'cvs', fields: {},
    questionData: {
      correctAnswer: 'A',
      answers: [{ label: 'A', text: 'Correct' }, { label: 'B', text: 'Wrong' }],
      tags: {},
    },
  }
}

function snapshotRows(version, status) {
  return [
    { k: LEDGER_KEY, v: JSON.stringify([question(status)]), version },
    { k: MEDIA_KEY, v: JSON.stringify({ records: [] }), version: 1 },
    { k: CATALOGUE_KEY, v: JSON.stringify([]), version: 1 },
  ]
}

test('a version change refreshes a cache warmed in another server process', async () => {
  const originalQuery = pool.query
  let rows = snapshotRows(1, 'Published')
  pool.query = async () => [rows]
  invalidatePublishedQuestions(LEDGER_KEY)
  try {
    assert.equal((await publishedQuestions()).has('q-cache'), true)
    rows = snapshotRows(2, 'Archived')
    assert.equal((await publishedQuestions()).has('q-cache'), false)
  } finally {
    pool.query = originalQuery
    invalidatePublishedQuestions(LEDGER_KEY)
  }
})
