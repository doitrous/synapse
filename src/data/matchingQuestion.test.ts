import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  markMatching, matchingComplete, matchingErrors, parseMatching,
  parseMatchingOptions, parseMatchingPrompts,
} from './matchingQuestion.ts'

/** Shaped after the EPE paper that is twenty matching items out of thirty-two. */
const OPTIONS = `A | Open-ended question
B | Showing empathy
C | Closed question
D | Summarising`

const PROMPTS = `When the physician says "tell me more about that" = A
The best way to deal with the feelings of pain of a patient = B
"Have you taken this medicine before?" = C`

describe('Reading a matching block', () => {
  test('options keep their letter and text', () => {
    const options = parseMatchingOptions(OPTIONS)
    assert.equal(options.length, 4)
    assert.deepEqual(options[0], { id: 'A', text: 'Open-ended question' })
    assert.equal(options[3].text, 'Summarising')
  })

  test('the three separators the corpus uses all work', () => {
    const options = parseMatchingOptions('A | One\nB. Two\nC) Three')
    assert.deepEqual(options.map((option) => option.text), ['One', 'Two', 'Three'])
  })

  test('prompts keep their text and the option they take', () => {
    const prompts = parseMatchingPrompts(PROMPTS)
    assert.equal(prompts.length, 3)
    assert.equal(prompts[0].text, 'When the physician says "tell me more about that"')
    assert.equal(prompts[0].answerId, 'A')
    assert.equal(prompts[2].answerId, 'C')
  })

  test('a numbered prompt loses its number, not its question', () => {
    const prompts = parseMatchingPrompts('1. First prompt = A\n2) Second prompt = B')
    assert.deepEqual(prompts.map((prompt) => prompt.text), ['First prompt', 'Second prompt'])
  })

  test('an option may answer more than one prompt, and some answer none', () => {
    // Exactly how a real paper works — the unused options are the distractors.
    const { options, prompts } = parseMatching(OPTIONS, `First = A\nSecond = A\nThird = B`)
    assert.deepEqual(matchingErrors({ options, prompts }, OPTIONS, 'First = A\nSecond = A\nThird = B'), [])
    assert.equal(prompts.filter((prompt) => prompt.answerId === 'A').length, 2)
  })

  test('letters read case-insensitively', () => {
    const { options, prompts } = parseMatching('a | One\nb | Two', 'Something = b')
    assert.deepEqual(options.map((option) => option.id), ['A', 'B'])
    assert.equal(prompts[0].answerId, 'B')
    assert.deepEqual(matchingErrors({ options, prompts }), [])
  })

  test('an empty block reads as empty rather than throwing', () => {
    assert.deepEqual(parseMatching(undefined, undefined), { options: [], prompts: [] })
  })
})

describe('Refusing a matching block that would not work', () => {
  test('a prompt answered by an option that does not exist', () => {
    const payload = parseMatching(OPTIONS, 'Something = Z')
    const errors = matchingErrors(payload)
    assert.equal(errors.length, 1)
    assert.match(errors[0], /answered by Z, which is not one of the options/)
  })

  test('a line that could not be read is reported, not dropped in silence', () => {
    // The failure this exists to prevent: half a block vanishing at import and
    // nobody ever learning it did.
    const raw = 'A | One\nthis line has no letter\nB | Two'
    const payload = parseMatching(raw, 'Something = A')
    const errors = matchingErrors(payload, raw, 'Something = A')
    assert.ok(errors.some((error) => /1 option line could not be read/.test(error)))
  })

  test('an unreadable prompt line is reported too', () => {
    const raw = 'First = A\nthis prompt names no option'
    const errors = matchingErrors(parseMatching(OPTIONS, raw), OPTIONS, raw)
    assert.ok(errors.some((error) => /1 prompt line could not be read/.test(error)))
  })

  test('a duplicate option letter is refused rather than silently shadowing', () => {
    const raw = 'A | One\nA | Two\nB | Three'
    const payload = parseMatching(raw, 'Something = A')
    assert.equal(payload.options.length, 2, 'the repeat is dropped')
    const errors = matchingErrors(payload, raw, 'Something = A')
    assert.ok(errors.some((error) => /Option A is written more than once/.test(error)),
      'and the message must name the repeat, not send them hunting for a typo')
    assert.ok(!errors.some((error) => /could not be read/.test(error)),
      'a duplicate reads perfectly well — it is not an unreadable line')
  })

  test('too few options, or no prompts', () => {
    assert.ok(matchingErrors(parseMatching('A | Only one', 'X = A')).some((e) => /at least two options/.test(e)))
    assert.ok(matchingErrors(parseMatching(OPTIONS, '')).some((e) => /at least one prompt/.test(e)))
  })

  test('a well-formed block has nothing wrong with it', () => {
    assert.deepEqual(matchingErrors(parseMatching(OPTIONS, PROMPTS), OPTIONS, PROMPTS), [])
  })
})

describe('Marking a matching attempt', () => {
  const { prompts } = parseMatching(OPTIONS, PROMPTS)

  test('scored per prompt, because a paper marks it that way', () => {
    const result = markMatching({ [prompts[0].id]: 'A', [prompts[1].id]: 'C', [prompts[2].id]: 'C' }, prompts)
    assert.equal(result.correct, 2)
    assert.equal(result.total, 3)
    assert.equal(result.allCorrect, false)
    assert.equal(result.byPrompt[prompts[1].id], false)
  })

  test('every prompt right is all correct', () => {
    const result = markMatching({ [prompts[0].id]: 'A', [prompts[1].id]: 'B', [prompts[2].id]: 'C' }, prompts)
    assert.equal(result.correct, 3)
    assert.equal(result.allCorrect, true)
  })

  test('an untouched attempt scores nothing and is not all correct', () => {
    const result = markMatching({}, prompts)
    assert.equal(result.correct, 0)
    assert.equal(result.allCorrect, false)
  })

  test('completeness is separate from correctness', () => {
    assert.equal(matchingComplete({ [prompts[0].id]: 'A' }, prompts), false)
    const all = { [prompts[0].id]: 'D', [prompts[1].id]: 'D', [prompts[2].id]: 'D' }
    assert.equal(matchingComplete(all, prompts), true, 'answered everything')
    assert.equal(markMatching(all, prompts).correct, 0, 'and got all of it wrong')
  })
})
