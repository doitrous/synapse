import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  analyzeHighlightBehavior, classifyAnswerChanges, classifyHighlightBlock, DEFAULT_STUDY_TRACKING_SETTINGS,
  enabledTransitionKinds, flattenHighlightStore, isConceptLinkedHighlight,
  type StudyTrackingSettings,
} from './studyTracking.ts'
import type { AttemptRecord } from './attempts.ts'
import type { QuestionHighlight, QuestionHighlightStore } from './questionHighlights.ts'

function attempt(patch: Partial<AttemptRecord> = {}): AttemptRecord {
  return {
    id: patch.id ?? `a${Math.random()}`,
    at: '2026-08-20T10:00:00.000Z',
    surface: 'qbank',
    itemId: 'q1',
    subjectId: 'cvs',
    topic: 'Heart failure',
    difficulty: 'Moderate',
    conceptIds: [],
    correct: true,
    seconds: 30,
    sessionId: 's1',
    ...patch,
  }
}

function highlight(patch: Partial<QuestionHighlight> = {}): QuestionHighlight {
  return {
    id: patch.id ?? `h${Math.random()}`,
    questionId: 'q1',
    anchor: { block: 'stem', exact: 'left ventricle', prefix: '', suffix: '' },
    createdAt: '2026-08-20T10:00:00.000Z',
    ...patch,
  }
}

/* ------------------------------- classifyAnswerChanges ------------------------------- */

test('classifyAnswerChanges returns zeros for an empty log', () => {
  const summary = classifyAnswerChanges([])
  assert.equal(summary.itemsWithRepeatedAttempts, 0)
  assert.equal(summary.totalTransitions, 0)
  assert.deepEqual(summary.counts, {
    correctToIncorrect: 0, incorrectToCorrect: 0, incorrectToIncorrect: 0, correctToCorrect: 0,
  })
})

test('classifyAnswerChanges ignores items attempted only once', () => {
  const summary = classifyAnswerChanges([attempt({ itemId: 'q1', correct: true })])
  assert.equal(summary.itemsWithRepeatedAttempts, 0)
  assert.equal(summary.totalTransitions, 0)
})

test('classifyAnswerChanges orders by timestamp regardless of input order', () => {
  const records = [
    attempt({ id: 'a2', itemId: 'q1', correct: false, at: '2026-08-20T12:00:00.000Z' }),
    attempt({ id: 'a1', itemId: 'q1', correct: true, at: '2026-08-20T10:00:00.000Z' }),
  ]
  const summary = classifyAnswerChanges(records)
  assert.equal(summary.itemsWithRepeatedAttempts, 1)
  assert.equal(summary.counts.correctToIncorrect, 1)
  assert.equal(summary.totalTransitions, 1)
})

test('classifyAnswerChanges counts every transition kind, including correct-to-correct', () => {
  const records = [
    attempt({ id: 'a1', itemId: 'q1', correct: true, at: '2026-08-20T10:00:00.000Z' }),
    attempt({ id: 'a2', itemId: 'q1', correct: false, at: '2026-08-20T11:00:00.000Z' }),
    attempt({ id: 'a3', itemId: 'q1', correct: true, at: '2026-08-20T12:00:00.000Z' }),
    attempt({ id: 'a4', itemId: 'q1', correct: true, at: '2026-08-20T13:00:00.000Z' }),
    attempt({ id: 'b1', itemId: 'q2', correct: false, at: '2026-08-20T10:00:00.000Z' }),
    attempt({ id: 'b2', itemId: 'q2', correct: false, at: '2026-08-20T11:00:00.000Z' }),
  ]
  const summary = classifyAnswerChanges(records)
  assert.equal(summary.itemsWithRepeatedAttempts, 2)
  assert.equal(summary.totalTransitions, 4)
  assert.deepEqual(summary.counts, {
    correctToIncorrect: 1, incorrectToCorrect: 1, incorrectToIncorrect: 1, correctToCorrect: 1,
  })
  assert.deepEqual(summary.byItem.q1, {
    correctToIncorrect: 1, incorrectToCorrect: 1, incorrectToIncorrect: 0, correctToCorrect: 1,
  })
  assert.deepEqual(summary.byItem.q2, {
    correctToIncorrect: 0, incorrectToCorrect: 0, incorrectToIncorrect: 1, correctToCorrect: 0,
  })
})

test('classifyAnswerChanges drops unmarked attempts (correct: null) before pairing', () => {
  const records = [
    attempt({ id: 'a1', itemId: 'q1', correct: null, at: '2026-08-20T09:00:00.000Z' }),
    attempt({ id: 'a2', itemId: 'q1', correct: true, at: '2026-08-20T10:00:00.000Z' }),
    attempt({ id: 'a3', itemId: 'q1', correct: false, at: '2026-08-20T11:00:00.000Z' }),
  ]
  const summary = classifyAnswerChanges(records)
  assert.equal(summary.totalTransitions, 1)
  assert.equal(summary.counts.correctToIncorrect, 1)
})

test('enabledTransitionKinds respects the master switch and per-kind toggles', () => {
  const allOff: StudyTrackingSettings = { ...DEFAULT_STUDY_TRACKING_SETTINGS, answerChanges: false }
  assert.deepEqual(enabledTransitionKinds(allOff), [])

  const onlyOne: StudyTrackingSettings = {
    ...DEFAULT_STUDY_TRACKING_SETTINGS,
    trackIncorrectToCorrect: false,
    trackIncorrectToIncorrect: false,
  }
  assert.deepEqual(enabledTransitionKinds(onlyOne), ['correctToIncorrect'])

  assert.deepEqual(
    enabledTransitionKinds(DEFAULT_STUDY_TRACKING_SETTINGS),
    ['correctToIncorrect', 'incorrectToCorrect', 'incorrectToIncorrect'],
  )
})

/* ------------------------------- highlight behaviour ------------------------------- */

test('classifyHighlightBlock maps known block ids and falls back to other', () => {
  assert.equal(classifyHighlightBlock('vignette'), 'vignette')
  assert.equal(classifyHighlightBlock('stem'), 'stem')
  assert.equal(classifyHighlightBlock('explanation'), 'explanation')
  assert.equal(classifyHighlightBlock('option-2'), 'option')
  assert.equal(classifyHighlightBlock('rationale-0'), 'rationale')
  assert.equal(classifyHighlightBlock('something-else'), 'other')
})

test('isConceptLinkedHighlight is a case-insensitive substring test, empty-safe', () => {
  assert.equal(isConceptLinkedHighlight('the Left Ventricle wall', ['left ventricle']), true)
  assert.equal(isConceptLinkedHighlight('the aorta', ['left ventricle']), false)
  assert.equal(isConceptLinkedHighlight('', ['left ventricle']), false)
  assert.equal(isConceptLinkedHighlight('the aorta', []), false)
})

test('analyzeHighlightBehavior returns a "none" label and zeros for no highlights', () => {
  const summary = analyzeHighlightBehavior([])
  assert.equal(summary.totalHighlights, 0)
  assert.equal(summary.questionsHighlighted, 0)
  assert.equal(summary.highlightsPerQuestion, 0)
  assert.equal(summary.conceptLinkedShare, null)
  assert.equal(summary.focusScore, 0)
  assert.equal(summary.focusLabel, 'none')
})

test('analyzeHighlightBehavior counts block kinds and computes keyBlockShare', () => {
  const highlights = [
    highlight({ id: 'h1', questionId: 'q1', anchor: { block: 'stem', exact: 'a', prefix: '', suffix: '' } }),
    highlight({ id: 'h2', questionId: 'q1', anchor: { block: 'explanation', exact: 'b', prefix: '', suffix: '' } }),
    highlight({ id: 'h3', questionId: 'q2', anchor: { block: 'rationale-1', exact: 'c', prefix: '', suffix: '' } }),
    highlight({ id: 'h4', questionId: 'q2', anchor: { block: 'option-0', exact: 'd', prefix: '', suffix: '' } }),
  ]
  const summary = analyzeHighlightBehavior(highlights)
  assert.equal(summary.totalHighlights, 4)
  assert.equal(summary.questionsHighlighted, 2)
  assert.equal(summary.highlightsPerQuestion, 2)
  assert.equal(summary.byBlockKind.stem, 1)
  assert.equal(summary.byBlockKind.explanation, 1)
  assert.equal(summary.byBlockKind.rationale, 1)
  assert.equal(summary.byBlockKind.option, 1)
  assert.equal(summary.keyBlockShare, 0.5)
  assert.equal(summary.conceptLinkedShare, null)
  assert.equal(summary.focusScore, 0.5)
  assert.equal(summary.focusLabel, 'mixed')
})

test('analyzeHighlightBehavior blends in conceptLinkedShare when terms are supplied, and labels "focused" high', () => {
  const highlights = [
    highlight({ id: 'h1', anchor: { block: 'explanation', exact: 'left ventricle failure', prefix: '', suffix: '' } }),
    highlight({ id: 'h2', anchor: { block: 'rationale-0', exact: 'left ventricle overload', prefix: '', suffix: '' } }),
  ]
  const summary = analyzeHighlightBehavior(highlights, { conceptTerms: ['left ventricle'] })
  assert.equal(summary.keyBlockShare, 1)
  assert.equal(summary.conceptLinkedShare, 1)
  assert.equal(summary.focusScore, 1)
  assert.equal(summary.focusLabel, 'focused')
})

test('analyzeHighlightBehavior labels "sporadic" when highlights skip the reasoning blocks', () => {
  const highlights = [
    highlight({ id: 'h1', anchor: { block: 'vignette', exact: 'a 45-year-old man', prefix: '', suffix: '' } }),
    highlight({ id: 'h2', anchor: { block: 'option-1', exact: 'diuretics', prefix: '', suffix: '' } }),
  ]
  const summary = analyzeHighlightBehavior(highlights)
  assert.equal(summary.keyBlockShare, 0)
  assert.equal(summary.focusLabel, 'sporadic')
})

test('flattenHighlightStore concatenates every question\'s highlights', () => {
  const store: QuestionHighlightStore = {
    q1: [highlight({ id: 'h1', questionId: 'q1' })],
    q2: [highlight({ id: 'h2', questionId: 'q2' }), highlight({ id: 'h3', questionId: 'q2' })],
  }
  const flat = flattenHighlightStore(store)
  assert.equal(flat.length, 3)
  assert.deepEqual(flat.map((h) => h.id).sort(), ['h1', 'h2', 'h3'])
})

test('DEFAULT_STUDY_TRACKING_SETTINGS has every signal on by default', () => {
  assert.deepEqual(DEFAULT_STUDY_TRACKING_SETTINGS, {
    answerChanges: true,
    trackCorrectToIncorrect: true,
    trackIncorrectToCorrect: true,
    trackIncorrectToIncorrect: true,
    highlightBehavior: true,
  })
})
