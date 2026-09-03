import test from 'node:test'
import assert from 'node:assert/strict'
import {
  buildGradingPrompt, extractJson, normalizeFeedback, callGradingModel,
} from './essayGrade.js'

// This suite follows assistant.test.js's own convention: the DB-coupled
// entry point (`gradeEssay`, like `chat` in assistant.js) is left untested —
// there is no pool/DB mock in this codebase — and coverage lands on the pure
// prompt-building and response-parsing pieces, plus the model call itself
// with `fetch` mocked (no database involved in reaching it).

test('the grading prompt names the question, indexes the key points, and carries the JSON contract', () => {
  const prompt = buildGradingPrompt({
    prompt: 'Explain the pathophysiology of DKA.',
    keyPoints: ['Insulin deficiency', 'Ketogenesis', 'Osmotic diuresis'],
    modelAnswer: 'A full worked answer.',
    studentText: "The student's own answer.",
    examinerNote: 'Look for the trigger.',
  })
  assert.match(prompt, /Explain the pathophysiology of DKA\./)
  assert.match(prompt, /0\. Insulin deficiency/)
  assert.match(prompt, /1\. Ketogenesis/)
  assert.match(prompt, /2\. Osmotic diuresis/)
  assert.match(prompt, /Look for the trigger\./)
  assert.match(prompt, /"coveredKeyPoints"/)
  assert.match(prompt, /ONLY a single JSON object/)
})

test('an absent examiner note is simply omitted, not printed as "undefined"', () => {
  const prompt = buildGradingPrompt({
    prompt: 'Q', keyPoints: ['a'], modelAnswer: 'm', studentText: 's', examinerNote: '',
  })
  assert.ok(!prompt.includes('undefined'))
  assert.ok(!prompt.includes('WHAT THE EXAMINER SCANS FOR'))
})

test('extractJson parses a bare JSON reply', () => {
  const parsed = extractJson('{"score": 80, "summary": "Good."}')
  assert.deepEqual(parsed, { score: 80, summary: 'Good.' })
})

test('extractJson pulls the object out of prose and a markdown fence', () => {
  const withProse = extractJson('Sure, here is my assessment:\n{"score": 60}\nHope that helps!')
  assert.deepEqual(withProse, { score: 60 })

  const fenced = extractJson('```json\n{"score": 42, "strengths": ["clear structure"]}\n```')
  assert.deepEqual(fenced, { score: 42, strengths: ['clear structure'] })
})

test('extractJson returns null instead of throwing on unparseable output', () => {
  assert.equal(extractJson('The student covered most of the key points.'), null)
  assert.equal(extractJson('{"score": 80, "summary": "unterminated'), null)
  assert.equal(extractJson(''), null)
  assert.equal(extractJson(null), null)
})

test('normalizeFeedback clamps the score and drops out-of-range key point indices', () => {
  const feedback = normalizeFeedback({
    coveredKeyPoints: [0, 2, 99, -1, 1.5],
    missedKeyPoints: [1],
    score: 140,
    strengths: ['ok'],
    improvements: ['add more detail'],
    summary: 'Solid attempt.',
  }, 3)
  assert.deepEqual(feedback.coveredKeyPoints, [0, 2])
  assert.deepEqual(feedback.missedKeyPoints, [1])
  assert.equal(feedback.score, 100)
  assert.deepEqual(feedback.strengths, ['ok'])
  assert.equal(feedback.summary, 'Solid attempt.')
})

test('normalizeFeedback never throws on a completely malformed or empty parse', () => {
  assert.doesNotThrow(() => normalizeFeedback(null, 3))
  assert.doesNotThrow(() => normalizeFeedback({}, 3))
  assert.doesNotThrow(() => normalizeFeedback({ coveredKeyPoints: 'nope', score: 'A+' }, 3))
  const feedback = normalizeFeedback({ coveredKeyPoints: 'nope', score: 'A+', strengths: 'not an array' }, 3)
  assert.deepEqual(feedback.coveredKeyPoints, [])
  assert.equal(feedback.score, 0)
  assert.deepEqual(feedback.strengths, [])
})

test('callGradingModel calls the configured provider and returns parsed reply text', async (t) => {
  const originalFetch = globalThis.fetch
  t.after(() => { globalThis.fetch = originalFetch })

  let calledUrl = null
  globalThis.fetch = async (url, init) => {
    calledUrl = url
    assert.equal(init.method, 'POST')
    return {
      ok: true,
      json: async () => ({
        content: [{ type: 'text', text: '{"score": 70}' }],
        usage: { input_tokens: 10, output_tokens: 5 },
      }),
    }
  }

  const result = await callGradingModel(
    { provider: 'anthropic', model: 'claude-sonnet-5', baseUrl: '', apiKey: 'sk-test', maxTokens: 500, temperature: 0.2 },
    'grade this',
  )
  assert.equal(result.ok, true)
  assert.equal(result.text, '{"score": 70}')
  assert.match(calledUrl, /\/messages$/)
})

test('callGradingModel surfaces a non-ok upstream response without throwing', async (t) => {
  const originalFetch = globalThis.fetch
  t.after(() => { globalThis.fetch = originalFetch })
  globalThis.fetch = async () => ({ ok: false, status: 401, text: async () => 'bad key' })

  const result = await callGradingModel(
    { provider: 'anthropic', model: 'claude-sonnet-5', baseUrl: '', apiKey: 'sk-bad', maxTokens: 500, temperature: 0.2 },
    'grade this',
  )
  assert.equal(result.ok, false)
  assert.equal(result.status, 401)
})
