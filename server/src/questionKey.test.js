import { test } from 'node:test'
import assert from 'node:assert/strict'
import { questionKey, questionKeysFromLedger } from './questionKey.js'

/** A ledger question in the shape the admin editor actually writes. */
const ledgerQuestion = (over = {}) => ({
  id: 'q1',
  kind: 'question',
  status: 'Published',
  title: 'Which artery is occluded?',
  questionData: {
    correctAnswer: 'C',
    answers: [
      { label: 'A', text: 'Left anterior descending', explanation: '' },
      { label: 'B', text: 'Right coronary', explanation: '' },
      { label: 'C', text: 'Left circumflex', explanation: '' },
      { label: 'D', text: 'Posterior descending', explanation: '' },
    ],
  },
  ...over,
})

test('the key points at the answer named by correctAnswer, not at a per-answer flag', () => {
  // The ledger's answers carry no `correct` property at all. Reading one would
  // key every question to -1 and mark every student answer wrong.
  const key = questionKey(ledgerQuestion())
  assert.equal(key.correctIndex, 2)
  assert.equal(key.optionCount, 4)
})

test('each label keys to its own position', () => {
  for (const [correctAnswer, expected] of [['A', 0], ['B', 1], ['C', 2], ['D', 3]]) {
    const key = questionKey(ledgerQuestion({ questionData: { ...ledgerQuestion().questionData, correctAnswer } }))
    assert.equal(key.correctIndex, expected, `answer ${correctAnswer}`)
  }
})

test('blank answers are not counted, because the student is never shown them', () => {
  // The student's options are the filled-in answers, so the index they press
  // counts those. A blank left above the correct answer must not shift the key.
  const key = questionKey(ledgerQuestion({
    questionData: {
      correctAnswer: 'C',
      answers: [
        { label: 'A', text: 'Left anterior descending', explanation: '' },
        { label: 'B', text: '   ', explanation: '' },
        { label: 'C', text: 'Left circumflex', explanation: '' },
      ],
    },
  }))
  assert.equal(key.correctIndex, 1)
  assert.equal(key.optionCount, 2)
})

test('labels out of order key by label rather than by position', () => {
  const key = questionKey(ledgerQuestion({
    questionData: {
      correctAnswer: 'A',
      answers: [
        { label: 'C', text: 'Left circumflex', explanation: '' },
        { label: 'A', text: 'Left anterior descending', explanation: '' },
      ],
    },
  }))
  assert.equal(key.correctIndex, 1)
})

test('a question whose key names no answer is marked as having none', () => {
  const key = questionKey(ledgerQuestion({
    questionData: { correctAnswer: 'F', answers: [{ label: 'A', text: 'Only option', explanation: '' }] },
  }))
  assert.equal(key.correctIndex, -1)
})

test('a question with no authoring data at all yields no key rather than throwing', () => {
  const key = questionKey({ id: 'q9', kind: 'question', status: 'Published', title: 'Orphan' })
  assert.equal(key.correctIndex, -1)
  assert.equal(key.optionCount, 0)
})

test('the snapshot carries only published questions, each with a usable key', () => {
  const snapshot = questionKeysFromLedger([
    ledgerQuestion(),
    ledgerQuestion({ id: 'q2', status: 'Draft' }),
    { id: 'p1', kind: 'practical', status: 'Published', title: 'Blood film' },
  ])
  assert.deepEqual([...snapshot.keys()], ['q1'])
  assert.equal(snapshot.get('q1').correctIndex, 2)
  assert.equal(snapshot.get('q1').title, 'Which artery is occluded?')
})

test('a ledger that is not a list yields an empty snapshot', () => {
  assert.equal(questionKeysFromLedger(null).size, 0)
  assert.equal(questionKeysFromLedger({ kind: 'question' }).size, 0)
})

test('the index a correctly-answering student sends is scored correct', () => {
  // This is the exact comparison parties.js, challenges.js and studyRooms.js make.
  const key = questionKey(ledgerQuestion())
  const chosenIndex = 2 // the student pressed "Left circumflex"
  assert.equal(key.correctIndex >= 0 && Number(chosenIndex) === key.correctIndex, true)
})
