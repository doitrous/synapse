import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import type { AnswerLabel } from './contentControl.ts'
import { markMultiResponse, multiResponseErrors, parseCorrectAnswers } from './multiResponseQuestion.ts'

const OPTIONS = [
  { label: 'A' as AnswerLabel, text: 'Right coronary artery' },
  { label: 'B' as AnswerLabel, text: 'Left anterior descending' },
  { label: 'C' as AnswerLabel, text: 'Left circumflex' },
  { label: 'D' as AnswerLabel, text: 'Posterior interventricular' },
]

describe('Reading which answers are correct', () => {
  test('the four ways the corpus writes them all read', () => {
    for (const written of ['A | C', 'A, C', 'A C', 'AC']) {
      assert.deepEqual(parseCorrectAnswers(written), ['A', 'C'], written)
    }
  })

  test('order is kept as written, and repeats collapse', () => {
    assert.deepEqual(parseCorrectAnswers('C | A | C'), ['C', 'A'])
  })

  test('lower case reads the same', () => {
    assert.deepEqual(parseCorrectAnswers('a | d'), ['A', 'D'])
  })

  test('anything that is not a label is ignored rather than guessed at', () => {
    assert.deepEqual(parseCorrectAnswers('A | Z | 9'), ['A'])
    assert.deepEqual(parseCorrectAnswers(''), [])
    assert.deepEqual(parseCorrectAnswers(undefined), [])
  })
})

describe('Refusing a multiple response that would not work', () => {
  test('two or more correct answers, or it is a single best answer question', () => {
    const errors = multiResponseErrors(['A'], OPTIONS)
    assert.ok(errors.some((error) => /at least two correct answers/.test(error)))
  })

  test('a correct answer with no text', () => {
    const errors = multiResponseErrors(['A', 'F'], OPTIONS)
    assert.ok(errors.some((error) => /Answer F is marked correct but has no text/.test(error)))
  })

  test('every option correct leaves nothing to tell apart', () => {
    const errors = multiResponseErrors(['A', 'B', 'C', 'D'], OPTIONS)
    assert.ok(errors.some((error) => /nothing to tell apart/.test(error)))
  })

  test('a well-formed question has nothing wrong with it', () => {
    assert.deepEqual(multiResponseErrors(['A', 'C'], OPTIONS), [])
  })
})

describe('Marking a multiple response', () => {
  const correct: AnswerLabel[] = ['A', 'C']

  test('everything right and nothing wrong', () => {
    const result = markMultiResponse(['A', 'C'], correct)
    assert.deepEqual(result.hit, ['A', 'C'])
    assert.deepEqual(result.falsePositive, [])
    assert.deepEqual(result.missed, [])
    assert.equal(result.allCorrect, true)
  })

  test('the two ways it fails are reported apart', () => {
    // Choosing something wrong and leaving something out are different
    // mistakes, and a single fraction hides which one was made.
    const result = markMultiResponse(['A', 'B'], correct)
    assert.deepEqual(result.hit, ['A'])
    assert.deepEqual(result.falsePositive, ['B'], 'chose one that was wrong')
    assert.deepEqual(result.missed, ['C'], 'and left out one that was right')
    assert.equal(result.allCorrect, false)
  })

  test('choosing every option is not the same as being right', () => {
    // The obvious way to game an all-or-nothing marker.
    const result = markMultiResponse(['A', 'B', 'C', 'D'], correct)
    assert.deepEqual(result.hit, ['A', 'C'])
    assert.deepEqual(result.falsePositive, ['B', 'D'])
    assert.equal(result.allCorrect, false)
  })

  test('a subset of the right answers is not all correct', () => {
    const result = markMultiResponse(['A'], correct)
    assert.deepEqual(result.missed, ['C'])
    assert.equal(result.allCorrect, false)
  })

  test('answering nothing scores nothing', () => {
    const result = markMultiResponse([], correct)
    assert.deepEqual(result.hit, [])
    assert.deepEqual(result.missed, ['A', 'C'])
    assert.equal(result.allCorrect, false)
  })
})
