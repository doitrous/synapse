import { test } from 'node:test'
import assert from 'node:assert/strict'
import { bothFinished, canFinish, headToHead, sideOf } from './challengeResult.js'

test('a challenge is only finished when both sides are', () => {
  assert.equal(bothFinished({ challengerFinishedAt: null, opponentFinishedAt: null }), false)
  assert.equal(bothFinished({ challengerFinishedAt: 'x', opponentFinishedAt: null }), false)
  assert.equal(bothFinished({ challengerFinishedAt: 'x', opponentFinishedAt: 'y' }), true)
})

test('the head-to-head counts each side and names who lost which question', () => {
  const challenge = { challengerId: 'a', opponentId: 'b', questionIds: ['q1', 'q2', 'q3'] }
  const answers = [
    { userId: 'a', questionId: 'q1', correct: true, seconds: 10 },
    { userId: 'a', questionId: 'q2', correct: false, seconds: 20 },
    { userId: 'b', questionId: 'q1', correct: true, seconds: 5 },
    { userId: 'b', questionId: 'q2', correct: true, seconds: 30 },
  ]
  const result = headToHead(challenge, answers)
  assert.equal(result.challenger.correct, 1)
  assert.equal(result.opponent.correct, 2)
  assert.equal(result.challenger.seconds, 30)
  assert.deepEqual(
    result.questions.find((q) => q.questionId === 'q2'),
    { questionId: 'q2', challengerCorrect: false, opponentCorrect: true },
  )
})

test('a question neither answered is reported as missed by both', () => {
  const challenge = { challengerId: 'a', opponentId: 'b', questionIds: ['q1'] }
  const result = headToHead(challenge, [])
  assert.deepEqual(result.questions, [{ questionId: 'q1', challengerCorrect: false, opponentCorrect: false }])
})

test('each side is timed separately', () => {
  const challenge = { challengerId: 'a', opponentId: 'b', questionIds: ['q1'] }
  const answers = [
    { userId: 'a', questionId: 'q1', correct: true, seconds: 10 },
    { userId: 'b', questionId: 'q1', correct: true, seconds: 45 },
  ]
  const result = headToHead(challenge, answers)
  assert.equal(result.challenger.seconds, 10)
  assert.equal(result.opponent.seconds, 45)
})

test('an untimed answer counts as no time rather than breaking the total', () => {
  const challenge = { challengerId: 'a', opponentId: 'b', questionIds: ['q1', 'q2'] }
  const answers = [
    { userId: 'a', questionId: 'q1', correct: true, seconds: null },
    { userId: 'a', questionId: 'q2', correct: true, seconds: 12 },
  ]
  const result = headToHead(challenge, answers)
  assert.equal(result.challenger.seconds, 12)
  assert.equal(result.challenger.answered, 2)
})

test('each participant is told which side they are on', () => {
  const row = { challengerId: 'a', opponentId: 'b' }
  assert.equal(sideOf(row, 'a'), 'challenger')
  assert.equal(sideOf(row, 'b'), 'opponent')
})

test('a stranger cannot tell a challenge apart from one that does not exist', () => {
  assert.equal(sideOf({ challengerId: 'a', opponentId: 'b' }, 'c'), null)
  assert.equal(sideOf(null, 'c'), null)
})

test('a challenge that was never accepted cannot be finished', () => {
  const sent = { status: 'sent', challengerFinishedAt: null, opponentFinishedAt: null }
  assert.equal(canFinish(sent, 'challenger'), false)
})

test('a declined challenge cannot be finished', () => {
  const declined = { status: 'declined', challengerFinishedAt: null, opponentFinishedAt: null }
  assert.equal(canFinish(declined, 'opponent'), false)
})

test('an already-complete challenge cannot be finished again', () => {
  const complete = { status: 'complete', challengerFinishedAt: 'x', opponentFinishedAt: 'y' }
  assert.equal(canFinish(complete, 'challenger'), false)
})

test('a side that has already finished cannot finish twice', () => {
  const row = { status: 'running', challengerFinishedAt: 'x', opponentFinishedAt: null }
  assert.equal(canFinish(row, 'challenger'), false)
})

test('a running challenge can be finished by a side that has not finished yet', () => {
  const row = { status: 'running', challengerFinishedAt: null, opponentFinishedAt: null }
  assert.equal(canFinish(row, 'opponent'), true)
  assert.equal(canFinish(row, 'challenger'), true)
})
