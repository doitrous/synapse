import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  completionComplete, completionErrors, markCompletion, parseCompletion,
} from './completionQuestion.ts'

/** Shaped after a department-book completion item. */
const SENTENCE =
  'The sinoatrial node is supplied by the [[right coronary artery|RCA]] in about 60% of hearts, and lies in the [[right atrium]].'

describe('Reading a sentence with blanks', () => {
  test('the prose and the blanks come out in reading order', () => {
    const { segments } = parseCompletion(SENTENCE)
    assert.deepEqual(segments.map((segment) => segment.kind),
      ['text', 'blank', 'text', 'blank', 'text'])
    assert.equal(segments[0].kind === 'text' && segments[0].text,
      'The sinoatrial node is supplied by the ')
  })

  test('each blank keeps its answer and the wordings that also count', () => {
    const { blanks } = parseCompletion(SENTENCE)
    assert.equal(blanks.length, 2)
    assert.equal(blanks[0].answer, 'right coronary artery')
    assert.deepEqual(blanks[0].accepts, ['RCA'])
    assert.deepEqual(blanks[1].accepts, [])
  })

  test('a sentence ending in a blank does not invent trailing prose', () => {
    const { segments } = parseCompletion('The largest artery is the [[aorta]]')
    assert.deepEqual(segments.map((segment) => segment.kind), ['text', 'blank'])
  })

  test('a sentence with no blanks is all prose', () => {
    const { segments, blanks } = parseCompletion('Nothing is missing here.')
    assert.equal(blanks.length, 0)
    assert.equal(segments.length, 1)
  })

  test('an empty cell reads as empty rather than throwing', () => {
    assert.deepEqual(parseCompletion(undefined), { segments: [], blanks: [] })
  })
})

describe('Refusing a completion that would not work', () => {
  test('a well-formed sentence has nothing wrong with it', () => {
    assert.deepEqual(completionErrors(parseCompletion(SENTENCE), SENTENCE), [])
  })

  test('no blanks at all', () => {
    const raw = 'This sentence asks nothing.'
    assert.ok(completionErrors(parseCompletion(raw), raw).some((e) => /at least one blank/.test(e)))
  })

  test('a blank with no sentence around it asks nothing', () => {
    const raw = '[[aorta]]'
    assert.ok(completionErrors(parseCompletion(raw), raw).some((e) => /needs a sentence around/.test(e)))
  })

  test('an unclosed bracket is caught, not silently swallowed', () => {
    // Without this, everything after the stray bracket is read as prose and
    // every blank in it disappears without a word.
    const raw = 'The [[aorta arises from the [[left ventricle]].'
    const errors = completionErrors(parseCompletion(raw), raw)
    assert.ok(errors.some((e) => /every blank needs both/.test(e)))
  })

  test('an empty blank is caught', () => {
    const raw = 'The largest artery is the [[]].'
    assert.ok(completionErrors(parseCompletion(raw), raw).some((e) => /no answer inside the brackets/.test(e)))
  })
})

describe('Marking a completion', () => {
  const { blanks } = parseCompletion(SENTENCE)

  test('the mark scheme wording is right', () => {
    const result = markCompletion({ 'cb-0': 'right coronary artery', 'cb-1': 'right atrium' }, blanks)
    assert.equal(result.correct, 2)
    assert.equal(result.allCorrect, true)
  })

  test('an accepted alternative is right', () => {
    assert.equal(markCompletion({ 'cb-0': 'RCA' }, blanks).byBlank['cb-0'], true)
  })

  test('it is as lenient about wording as a labelled plate', () => {
    // Same matcher, so the same rules: case, articles and abbreviations do not
    // decide whether a student knew the answer.
    assert.equal(markCompletion({ 'cb-0': 'the Right Coronary A.' }, blanks).byBlank['cb-0'], true)
  })

  test('and as strict about structure', () => {
    // "right coronary artery" and "right coronary vein" are different vessels.
    assert.equal(markCompletion({ 'cb-0': 'right coronary vein' }, blanks).byBlank['cb-0'], false)
  })

  test('a wrong answer is wrong', () => {
    const result = markCompletion({ 'cb-0': 'left circumflex', 'cb-1': 'left atrium' }, blanks)
    assert.equal(result.correct, 0)
    assert.equal(result.allCorrect, false)
  })

  test('an unanswered blank scores nothing', () => {
    const result = markCompletion({ 'cb-0': 'RCA' }, blanks)
    assert.equal(result.correct, 1)
    assert.equal(result.byBlank['cb-1'], false)
    assert.equal(result.allCorrect, false)
  })

  test('completeness is separate from correctness', () => {
    assert.equal(completionComplete({ 'cb-0': 'x' }, blanks), false)
    assert.equal(completionComplete({ 'cb-0': 'x', 'cb-1': 'y' }, blanks), true)
    assert.equal(markCompletion({ 'cb-0': 'x', 'cb-1': 'y' }, blanks).correct, 0)
  })
})
