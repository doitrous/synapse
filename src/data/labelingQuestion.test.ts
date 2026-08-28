import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  isLabelCorrect, labelingComplete, labelingErrors, markLabeling,
  parseLabeling, parseLabelingPoints,
} from './labelingQuestion.ts'
import { normaliseAnswer } from './answerMatching.ts'

/** Shaped after a Kasr practical plate: identify the structure at each arrow. */
const POINTS = `1 @ 34,58 = Biceps brachii | Biceps | Biceps m.
2 @ 61,42 = Brachialis
3 @ 22,77 = Median nerve | Median n. | N. medianus`

describe('Reading a labelled plate', () => {
  test('each point keeps its marker, position and answer', () => {
    const points = parseLabelingPoints(POINTS)
    assert.equal(points.length, 3)
    assert.equal(points[0].marker, '1')
    assert.equal(points[0].x, 34)
    assert.equal(points[0].y, 58)
    assert.equal(points[0].answer, 'Biceps brachii')
  })

  test('the other wordings that count are kept', () => {
    const points = parseLabelingPoints(POINTS)
    assert.deepEqual(points[0].accepts, ['Biceps', 'Biceps m.'])
    assert.deepEqual(points[1].accepts, [], 'a point may accept only its own wording')
    assert.deepEqual(points[2].accepts, ['Median n.', 'N. medianus'])
  })

  test('fractional coordinates survive', () => {
    const points = parseLabelingPoints('A @ 12.5,88.25 = Something')
    assert.equal(points[0].x, 12.5)
    assert.equal(points[0].y, 88.25)
  })

  test('an empty cell yields no points', () => {
    assert.deepEqual(parseLabelingPoints(''), [])
    assert.deepEqual(parseLabelingPoints(undefined), [])
  })
})

describe('Refusing a plate that would not work', () => {
  const ok = parseLabeling('https://example.test/arm.png', 'Anterior compartment of the arm', POINTS)

  test('a well-formed plate has nothing wrong with it', () => {
    assert.deepEqual(labelingErrors(ok, POINTS), [])
  })

  test('an image is required — there is nothing to label without one', () => {
    const errors = labelingErrors(parseLabeling('', 'Alt', POINTS), POINTS)
    assert.ok(errors.some((error) => /needs an image/.test(error)))
  })

  test('alt text is required, not encouraged', () => {
    // The image *is* the question, so a student using a screen reader is told
    // nothing at all without it.
    const errors = labelingErrors(parseLabeling('https://example.test/a.png', '', POINTS), POINTS)
    assert.ok(errors.some((error) => /needs alt text/.test(error)))
  })

  test('a coordinate outside the image is refused', () => {
    const raw = '1 @ 140,58 = Somewhere off the picture'
    const errors = labelingErrors(parseLabeling('https://x.test/a.png', 'Alt', raw), raw)
    assert.ok(errors.some((error) => /coordinates are percentages/.test(error)))
  })

  test('a line that could not be read is reported, not dropped', () => {
    const raw = '1 @ 34,58 = Biceps\nthis line is not a point\n2 @ 61,42 = Brachialis'
    const errors = labelingErrors(parseLabeling('https://x.test/a.png', 'Alt', raw), raw)
    assert.ok(errors.some((error) => /1 point line could not be read/.test(error)))
  })

  test('a repeated marker is named as the repeat it is', () => {
    const raw = '1 @ 10,10 = One\n1 @ 20,20 = Two\n2 @ 30,30 = Three'
    const payload = parseLabeling('https://x.test/a.png', 'Alt', raw)
    assert.equal(payload.points.length, 2)
    const errors = labelingErrors(payload, raw)
    assert.ok(errors.some((error) => /Point 1 is written more than once/.test(error)))
    assert.ok(!errors.some((error) => /could not be read/.test(error)))
  })
})

describe('Marking what a student wrote', () => {
  const points = parseLabelingPoints(POINTS)

  test('the mark scheme wording is right', () => {
    assert.equal(isLabelCorrect('Biceps brachii', points[0]), true)
  })

  test('so is every wording the author said also counts', () => {
    assert.equal(isLabelCorrect('Biceps', points[0]), true)
    assert.equal(isLabelCorrect('Biceps m.', points[0]), true)
    assert.equal(isLabelCorrect('N. medianus', points[2]), true)
  })

  test('case, spacing and punctuation do not decide anatomy', () => {
    assert.equal(isLabelCorrect('  BICEPS BRACHII  ', points[0]), true)
    assert.equal(isLabelCorrect('biceps, brachii', points[0]), true)
    assert.equal(isLabelCorrect('the biceps brachii muscle', points[0]), true,
      'a marker that fails this teaches a student to distrust it')
  })

  test('"median nerve" and "median n." are the same answer', () => {
    assert.equal(isLabelCorrect('median nerve', points[2]), true)
    assert.equal(isLabelCorrect('Median N', points[2]), true)
  })

  test('a genuinely wrong answer is still wrong', () => {
    assert.equal(isLabelCorrect('Triceps brachii', points[0]), false)
    assert.equal(isLabelCorrect('Brachialis', points[0]), false)
    assert.equal(isLabelCorrect('', points[0]), false)
  })

  test('two structures sharing a stem are not the same answer', () => {
    // The trap in being lenient: "median nerve" and "median artery" differ only
    // by the class word, and treating that as noise credits a student for
    // naming the wrong structure entirely.
    const medianNerve = parseLabelingPoints('1 @ 1,1 = Median nerve')[0]
    assert.equal(isLabelCorrect('median artery', medianNerve), false)
    assert.equal(isLabelCorrect('median vein', medianNerve), false)
    assert.equal(isLabelCorrect('median', medianNerve), true, 'naming no kind at all is accepted')
    assert.notEqual(normaliseAnswer('median nerve'), normaliseAnswer('median artery'))
  })

  test('a plate is scored point by point', () => {
    const result = markLabeling({
      'lp-1': 'Biceps', 'lp-2': 'Triceps', 'lp-3': 'median nerve',
    }, points)
    assert.equal(result.correct, 2)
    assert.equal(result.total, 3)
    assert.equal(result.allCorrect, false)
    assert.equal(result.byPoint['lp-2'], false)
  })

  test('every point right is all correct', () => {
    const result = markLabeling({
      'lp-1': 'Biceps brachii', 'lp-2': 'Brachialis', 'lp-3': 'Median n.',
    }, points)
    assert.equal(result.allCorrect, true)
  })

  test('completeness is separate from correctness', () => {
    assert.equal(labelingComplete({ 'lp-1': 'Biceps' }, points), false)
    const all = { 'lp-1': 'x', 'lp-2': 'y', 'lp-3': 'z' }
    assert.equal(labelingComplete(all, points), true)
    assert.equal(markLabeling(all, points).correct, 0)
  })
})
