import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pool } from './db.js'
import {
  invalidateStudentContent,
  itemHandler,
  itemsHandler,
  questionsHandler,
  summaryHandler,
} from './studentContent.js'

const LEDGER_KEY = 'nishany-admin-content-ledger-v4'
const MEDIA_KEY = 'nishany-media-library-v1'
const CATALOGUE_KEY = 'nishany-academic-universities-v1'

/** Two universities, two kinds each — the smallest ledger that can leak across a cohort. */
function question(id, universityId, yearId, libraryIds = []) {
  return {
    id,
    kind: 'question',
    status: 'Published',
    title: `Stem ${id}`,
    subjectId: 'cvs',
    fields: { Topic: 'Heart', Difficulty: 'Hard', Vignette: 'A 68-year-old man', Explanation: 'the worked answer' },
    questionData: {
      correctAnswer: 'A',
      answers: [
        { label: 'A', text: 'Right', explanation: 'because of the key' },
        { label: 'B', text: 'Wrong', explanation: 'distractor rationale' },
      ],
      attachedImage: '',
      attachments: [{ id: 'att-1', url: 'blob:big' }],
      libraryIds,
      resourceIds: [],
      tags: {
        universityIds: [universityId],
        years: [yearId],
        moduleIds: ['CVS 01'],
        topic: 'Heart',
        intendedDifficulty: 'Hard',
        sourceCategory: 'faculty',
        conceptIds: ['c-1'],
        mainConceptIds: ['c-0'],
      },
    },
  }
}

function article(id, universityId, yearId) {
  return {
    id,
    kind: 'article',
    status: 'Published',
    title: `Article ${id}`,
    subjectId: 'cvs',
    updatedAt: '2026-01-01T00:00:00.000Z',
    fields: { Topic: 'Heart', 'Reading time': '9', Summary: 'ignored' },
    articleData: {
      universityIds: [universityId],
      yearIds: [yearId],
      moduleIds: ['CVS 01'],
      summary: 'what the card prints',
      primaryNodeId: 'node-1',
      secondaryNodeIds: ['node-2'],
      body: 'the ten-megabyte half of the ledger',
      sections: [{ heading: 'One', body: 'text' }],
    },
  }
}

function resource(id, universityId, yearId) {
  return {
    id,
    kind: 'resource',
    status: 'Published',
    title: `Resource ${id}`,
    subjectId: 'cvs',
    fields: {},
    resourceData: {
      universityIds: [universityId], yearIds: [yearId], moduleIds: ['CVS 01'], storageKey: 'k', chapters: [],
    },
  }
}

// Essays carry no curriculum placement (see `contentScope.js`'s `tagsOf`), so
// one is enough — it reaches every audience regardless of university/year.
function essay(id) {
  return {
    id,
    kind: 'essay',
    status: 'Published',
    title: `Essay ${id}`,
    subjectId: 'cvs',
    fields: {},
    essayData: {
      prompt: 'Discuss the mechanism of heart failure in detail.',
      keyPoints: [
        { id: 'kp-1', text: 'Reduced ejection fraction' },
        { id: 'kp-2', text: 'Neurohormonal activation', legible: true },
      ],
      examinerNote: 'Look for the exact phrase "neurohormonal activation".',
      modelAnswer: 'A model answer spanning several paragraphs of reasoning.',
    },
  }
}

function practical(id, universityId, yearId) {
  return {
    id,
    kind: 'practical',
    status: 'Published',
    title: `Practical ${id}`,
    subjectId: 'cvs',
    fields: { Type: 'Clinical case', Duration: '12' },
    practicalData: {
      universityIds: [universityId],
      yearIds: [yearId],
      format: 'case',
      references: [],
      conceptTags: { mainConceptIds: [], conceptIds: [], contextualConceptIds: [] },
      mediaRequests: [],
      decisions: [{ id: 'd-1', title: 'Step 1', context: 'the whole clinical vignette', question: 'q', answers: [], rationale: 'because of the mechanism' }],
      debrief: 'the whole debrief text',
    },
  }
}

const LEDGER = [
  question('q-oms', 'OMS', 'OMS_Y1', ['a-oms']),
  question('q-alx', 'ALX', 'ALX_Y1'),
  { ...question('q-draft', 'OMS', 'OMS_Y1'), status: 'Draft' },
  article('a-oms', 'OMS', 'OMS_Y1'),
  article('a-alx', 'ALX', 'ALX_Y1'),
  resource('r-oms', 'OMS', 'OMS_Y1'),
  resource('r-alx', 'ALX', 'ALX_Y1'),
  essay('e-1'),
  practical('p-oms', 'OMS', 'OMS_Y1'),
  practical('p-alx', 'ALX', 'ALX_Y1'),
]

function rowsAt(version) {
  return [
    { k: LEDGER_KEY, v: JSON.stringify(LEDGER), version },
    { k: MEDIA_KEY, v: JSON.stringify({ records: [] }), version: 1 },
    { k: CATALOGUE_KEY, v: JSON.stringify([]), version: 1 },
  ]
}

/**
 * The queries these handlers make: the version snapshot, the caller's cohort,
 * and — since content is subscription-gated — the caller's subscription. The
 * subscription query joins `subscriptions`, which is how it is told apart from
 * the plain cohort read. Defaults to a live subscription so a test that is about
 * audience or redaction is not also forced to spell one out.
 */
function stubPool(version, profile, subscription) {
  pool.query = async (sql) => {
    if (/JOIN subscriptions/.test(sql)) return [subscription ? [subscription] : []]
    if (/FROM students/.test(sql)) return [profile ? [profile] : []]
    return [rowsAt(version)]
  }
}

function fakeRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: undefined,
    set(name, value) { res.headers[name.toLowerCase()] = value; return res },
    status(code) { res.statusCode = code; return res },
    json(value) { res.body = value; return res },
    end() { return res },
  }
  return res
}

async function call(handler, { query = {}, params = {}, role = 'student', headers = {} } = {}) {
  const res = fakeRes()
  await handler({
    identity: { id: 'user-1', role },
    query,
    params,
    get: (name) => headers[name.toLowerCase()],
  }, res)
  return res
}

const OMS_STUDENT = { universityId: 'OMS', year: '1', yearId: 'OMS_Y1' }

async function withLedger(fn, { version = 1, profile = OMS_STUDENT, subscription = { plan: 'QBank', status: 'active', expires_at: null } } = {}) {
  const original = pool.query
  stubPool(version, profile, subscription)
  invalidateStudentContent(LEDGER_KEY)
  try { await fn() } finally {
    pool.query = original
    invalidateStudentContent(LEDGER_KEY)
  }
}

test('a slice carries only the caller\'s own cohort, and a draft never leaves', async () => {
  await withLedger(async () => {
    const res = await call(itemsHandler, { query: { kind: 'resource' } })
    assert.deepEqual(res.body.items.map((item) => item.id), ['r-oms'])

    const questions = await call(questionsHandler)
    assert.equal(questions.body.items.some((item) => item.id === 'q-alx'), false)
    assert.equal(questions.body.items.some((item) => item.id === 'q-draft'), false)
    assert.equal(questions.body.items.some((item) => item.id === 'q-oms'), true)
  })
})

test('a student cannot widen their audience through the query string', async () => {
  await withLedger(async () => {
    const res = await call(questionsHandler, { query: { university: 'ALX', year: 'ALX_Y1' } })
    assert.deepEqual(res.body.items.filter((item) => item.kind === 'question').map((item) => item.id), ['q-oms'])
  })
})

test('a console caller is unscoped, and may preview another cohort', async () => {
  await withLedger(async () => {
    const all = await call(itemsHandler, { query: { kind: 'resource' }, role: 'admin' })
    assert.deepEqual(all.body.items.map((item) => item.id).sort(), ['r-alx', 'r-oms'])

    const preview = await call(itemsHandler, { query: { kind: 'resource', university: 'ALX' }, role: 'admin' })
    assert.deepEqual(preview.body.items.map((item) => item.id), ['r-alx'])
  })
})

test('the summary counts the caller\'s audience, by kind, module and subject', async () => {
  await withLedger(async () => {
    const res = await call(summaryHandler)
    assert.deepEqual(res.body.counts.byKind, { question: 1, article: 1, resource: 1, essay: 1, practical: 1 })
    assert.deepEqual(res.body.counts.byModule['CVS 01'], { question: 1, article: 1, resource: 1 })
    assert.deepEqual(res.body.counts.bySubject.cvs, { question: 1, article: 1, resource: 1, essay: 1, practical: 1 })
  })
})

test('the article index ships no article body, and carries the question back-links', async () => {
  await withLedger(async () => {
    const res = await call(itemsHandler, { query: { kind: 'article', view: 'index' } })
    assert.deepEqual(res.body.items.map((item) => item.id), ['a-oms'])
    const row = res.body.items[0]
    assert.equal(row.articleData, undefined)
    assert.equal(JSON.stringify(row).includes('ten-megabyte'), false)
    assert.equal(row.fields.Topic, 'Heart')
    assert.equal(row.fields['Reading time'], '9')
    assert.equal(row.summary, 'what the card prints')
    assert.equal(row.primaryNodeId, 'node-1')
    assert.deepEqual(row.secondaryNodeIds, ['node-2'])
    assert.deepEqual(row.yearIds, ['OMS_Y1'])
    assert.deepEqual(res.body.questionLinks['a-oms'], [{ id: 'q-oms', stem: 'Stem q-oms' }])
  })
})

test('articles without view=index are refused rather than served whole', async () => {
  await withLedger(async () => {
    const res = await call(itemsHandler, { query: { kind: 'article' } })
    assert.equal(res.statusCode, 400)
  })
})

test('questions carry a title stub for every id they reference', async () => {
  await withLedger(async () => {
    const res = await call(questionsHandler)
    assert.deepEqual(
      res.body.items.find((item) => item.id === 'a-oms'),
      { id: 'a-oms', title: 'Article a-oms' },
    )
  })
})

test('the summary view carries what the hub groups by and nothing a student could answer from', async () => {
  await withLedger(async () => {
    const res = await call(questionsHandler, { query: { view: 'summary' } })
    assert.deepEqual(res.body.items.map((item) => item.id), ['q-oms'])
    const row = res.body.items[0]
    assert.equal(row.kind, 'question')
    assert.equal(row.title, 'Stem q-oms')
    assert.equal(row.subjectId, 'cvs')
    assert.equal(row.status, 'Published')
    assert.deepEqual(row.fields, { Topic: 'Heart', Difficulty: 'Hard', Vignette: 'A 68-year-old man' })
    assert.deepEqual(row.questionData.libraryIds, ['a-oms'])
    assert.deepEqual(row.questionData.tags.mainConceptIds, ['c-0'])
    assert.equal(row.questionData.tags.sourceCategory, 'faculty')
    assert.deepEqual(row.questionData.tags.universityIds, ['OMS'])

    // The whole point: no key, no options, no rationale, no explanation.
    const wire = JSON.stringify(row)
    for (const leak of ['answers', 'correctAnswer', 'attachments', 'Right', 'distractor rationale', 'the worked answer']) {
      assert.equal(wire.includes(leak), false, `summary leaked ${leak}`)
    }
  })
})

test('an essay\'s summary view keeps its key-point ids and drops the prompt, note and model answer', async () => {
  await withLedger(async () => {
    const res = await call(itemsHandler, { query: { kind: 'essay', view: 'summary' } })
    assert.deepEqual(res.body.items.map((item) => item.id), ['e-1'])
    const row = res.body.items[0]
    // Only the ids survive — `usePracticeProgress` marks an essay covered by
    // intersecting ticked ids against exactly these.
    assert.deepEqual(row.essayData.keyPoints.map((point) => point.id), ['kp-1', 'kp-2'])
    // The prompt-present check a full essay is filtered by must still pass.
    assert.ok(row.essayData.prompt.trim())

    const wire = JSON.stringify(row)
    for (const leak of ['heart failure', 'neurohormonal activation', 'model answer spanning', 'Reduced ejection fraction']) {
      assert.equal(wire.includes(leak), false, `essay summary leaked ${leak}`)
    }
  })
})

test('a practical\'s summary view keeps its type and drops every decision, question and script', async () => {
  await withLedger(async () => {
    const res = await call(itemsHandler, { query: { kind: 'practical', view: 'summary' } })
    assert.deepEqual(res.body.items.map((item) => item.id), ['p-oms'])
    const row = res.body.items[0]
    assert.equal(row.fields.Type, 'Clinical case')
    assert.equal(row.practicalData.format, 'case')
    assert.equal(row.practicalData.decisions, undefined)

    const wire = JSON.stringify(row)
    for (const leak of ['clinical vignette', 'because of the mechanism', 'the whole debrief text']) {
      assert.equal(wire.includes(leak), false, `practical summary leaked ${leak}`)
    }
  })
})

test('a lapsed student is refused the essay/practical summary view exactly like the full one', async () => {
  await withLedger(async () => {
    assert.equal((await call(itemsHandler, { query: { kind: 'essay', view: 'summary' } })).statusCode, 402)
    assert.equal((await call(itemsHandler, { query: { kind: 'practical', view: 'summary' } })).statusCode, 402)
  }, { subscription: null })
})

test('a manifest answers about named ids only, within the caller\'s audience', async () => {
  await withLedger(async () => {
    const res = await call(itemsHandler, { query: { ids: 'q-oms,q-alx,a-oms,q-draft,nope' } })
    assert.deepEqual(res.body.items, [
      { id: 'q-oms', kind: 'question' },
      { id: 'a-oms', kind: 'article' },
    ])

    const tooMany = await call(itemsHandler, { query: { ids: Array.from({ length: 201 }, (_, i) => `q${i}`).join(',') } })
    assert.equal(tooMany.statusCode, 400)
  })
})

test('one item comes back whole, and another cohort\'s is a 404', async () => {
  await withLedger(async () => {
    const mine = await call(itemHandler, { params: { id: 'a-oms' } })
    assert.equal(mine.body.item.articleData.body, 'the ten-megabyte half of the ledger')

    const theirs = await call(itemHandler, { params: { id: 'a-alx' } })
    assert.equal(theirs.statusCode, 404)
  })
})

test('the ETag is stable across calls, 304s a matching request, and moves with the version', async () => {
  const original = pool.query
  try {
    stubPool(1, OMS_STUDENT)
    invalidateStudentContent(LEDGER_KEY)
    const first = await call(summaryHandler)
    const etag = first.headers.etag
    assert.match(etag, /^W\/"[\w.]+"$/)
    assert.equal((await call(summaryHandler)).headers.etag, etag)

    const cached = await call(summaryHandler, { headers: { 'if-none-match': etag } })
    assert.equal(cached.statusCode, 304)
    assert.equal(cached.body, undefined)

    stubPool(2, OMS_STUDENT)
    invalidateStudentContent(LEDGER_KEY)
    const next = await call(summaryHandler)
    assert.notEqual(next.headers.etag, etag)
    assert.equal(next.body.version, '2.1.1')
  } finally {
    pool.query = original
    invalidateStudentContent(LEDGER_KEY)
  }
})

test('a student with no enrolment on record still sees the catalogue', async () => {
  await withLedger(async () => {
    const res = await call(itemsHandler, { query: { kind: 'resource' } })
    assert.deepEqual(res.body.items.map((item) => item.id).sort(), ['r-alx', 'r-oms'])
  }, { profile: null })
})

test('a student without a subscription is refused answerable content but keeps the free views', async () => {
  await withLedger(async () => {
    // Full questions, full slices and a single item all carry the paid product.
    assert.equal((await call(questionsHandler)).statusCode, 402)
    assert.equal((await call(itemsHandler, { query: { kind: 'resource' } })).statusCode, 402)
    assert.equal((await call(itemHandler, { params: { id: 'r-oms' } })).statusCode, 402)
    // The dashboard's views carry no answers, so they stay open.
    assert.equal((await call(summaryHandler)).statusCode, 200)
    assert.equal((await call(questionsHandler, { query: { view: 'summary' } })).statusCode, 200)
    assert.equal((await call(itemsHandler, { query: { kind: 'article', view: 'index' } })).statusCode, 200)
  }, { subscription: null })
})

test('a lapsed student cannot use a single-item read to probe which ids exist', async () => {
  await withLedger(async () => {
    // Gated before the id is even looked up: a real id and a nonexistent one
    // both return 402, so the read is never an existence oracle for a cohort.
    assert.equal((await call(itemHandler, { params: { id: 'does-not-exist' } })).statusCode, 402)
    assert.equal((await call(itemHandler, { params: { id: 'r-oms' } })).statusCode, 402)
  }, { subscription: null })
})

test('a subscribed student still gets 404 for a nonexistent single item', async () => {
  await withLedger(async () => {
    assert.equal((await call(itemHandler, { params: { id: 'does-not-exist' } })).statusCode, 404)
    assert.equal((await call(itemHandler, { params: { id: 'r-oms' } })).statusCode, 200)
  })
})
