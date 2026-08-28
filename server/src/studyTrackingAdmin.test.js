import assert from 'node:assert/strict'
import test from 'node:test'
import {
  classifyTransition,
  summariseAnswerChanges,
  classifyHighlightBlock,
  summariseHighlightBehaviour,
} from './studyTrackingAdmin.js'

test('classifyTransition names each of the four directions', () => {
  assert.equal(classifyTransition(true, false), 'correctToIncorrect')
  assert.equal(classifyTransition(false, true), 'incorrectToCorrect')
  assert.equal(classifyTransition(false, false), 'incorrectToIncorrect')
  assert.equal(classifyTransition(true, true), 'correctToCorrect')
})

test('summariseAnswerChanges pairs consecutive attempts within a student+question run', () => {
  // Student u1 on q1: wrong -> right -> wrong  (2 transitions: i→c, c→i)
  // Student u1 on q2: right (single, no transition)
  // Student u2 on q1: wrong -> wrong           (1 transition: i→i)
  const rows = [
    { userId: 'u1', questionId: 'q1', correct: 0 },
    { userId: 'u1', questionId: 'q1', correct: 1 },
    { userId: 'u1', questionId: 'q1', correct: 0 },
    { userId: 'u1', questionId: 'q2', correct: 1 },
    { userId: 'u2', questionId: 'q1', correct: 0 },
    { userId: 'u2', questionId: 'q1', correct: 0 },
  ]
  const summary = summariseAnswerChanges(rows)
  assert.equal(summary.incorrectToCorrect, 1)
  assert.equal(summary.correctToIncorrect, 1)
  assert.equal(summary.incorrectToIncorrect, 1)
  assert.equal(summary.correctToCorrect, 0)
  assert.equal(summary.totalTransitions, 3)
  assert.equal(summary.studentsWithChanges, 2)
  assert.equal(summary.questionsWithChanges, 1)
})

test('a fresh question boundary does not pair across students or questions', () => {
  const rows = [
    { userId: 'u1', questionId: 'q1', correct: 1 },
    { userId: 'u2', questionId: 'q1', correct: 0 }, // different student — no transition
  ]
  assert.equal(summariseAnswerChanges(rows).totalTransitions, 0)
})

test('classifyHighlightBlock maps reasoning blocks to key kinds', () => {
  assert.equal(classifyHighlightBlock('rationale-2'), 'rationale')
  assert.equal(classifyHighlightBlock('explanation'), 'explanation')
  assert.equal(classifyHighlightBlock('option-0'), 'option')
  assert.equal(classifyHighlightBlock('stem'), 'stem')
  assert.equal(classifyHighlightBlock('vignette'), 'vignette')
  assert.equal(classifyHighlightBlock('whatever'), 'other')
})

test('summariseHighlightBehaviour aggregates key-block share and focus labels', () => {
  const focused = { q1: [{ anchor: { block: 'rationale-1' } }, { anchor: { block: 'explanation' } }, { anchor: { block: 'rationale-2' } }] }
  const sporadic = { q1: [{ anchor: { block: 'stem' } }, { anchor: { block: 'vignette' } }, { anchor: { block: 'option-1' } }] }
  const empty = {}
  const summary = summariseHighlightBehaviour([focused, sporadic, empty])
  assert.equal(summary.students, 2) // the empty store has no highlights
  assert.equal(summary.totalHighlights, 6)
  assert.equal(summary.keyBlockShare, 0.5) // 3 of 6 on rationale/explanation
  assert.equal(summary.focusDistribution.focused, 1)
  assert.equal(summary.focusDistribution.sporadic, 1)
})
