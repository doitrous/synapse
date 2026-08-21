import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  QUESTION_FORMATS, RUNNABLE_FORMATS, WRITTEN_FORMATS, derivationRefusal,
  isRunnableFormat, isWrittenFormat, mayDerive,
  parseDerivedFrom, parseQuestionFormat, parseWrittenParts, writtenTotalMarks,
} from './questionFormat.ts'

describe('Reading a format from a cell', () => {
  test('every canonical slug reads as itself', () => {
    for (const format of QUESTION_FORMATS) {
      assert.equal(parseQuestionFormat(format), format)
    }
  })

  test('the ways a person actually writes it are accepted', () => {
    const cases: [string, string][] = [
      ['MCQ', 'mcq_single_best'],
      ['Single best answer', 'mcq_single_best'],
      ['SBA', 'mcq_single_best'],
      ['true/false', 'true_false'],
      ['True or False', 'true_false'],
      ['matching', 'matching'],
      ['EMQ', 'matching'],
      ['SAQ', 'short_answer'],
      ['short answer', 'short_answer'],
      ['labelling', 'labeling'],
      ['Comparison Table', 'comparison_table'],
      ['multipart written', 'multipart_written'],
    ]
    for (const [written, expected] of cases) {
      assert.equal(parseQuestionFormat(written), expected, written)
    }
  })

  test('an unrecognised format reads as nothing rather than a guess', () => {
    assert.equal(parseQuestionFormat('viva voce'), null)
    assert.equal(parseQuestionFormat(''), null)
    assert.equal(parseQuestionFormat(undefined), null)
  })
})

describe('The two derivation restrictions', () => {
  test('a written question may only come from another written question', () => {
    for (const target of WRITTEN_FORMATS) {
      for (const source of WRITTEN_FORMATS) {
        assert.equal(mayDerive(source, target), true, `${source} -> ${target}`)
      }
      assert.equal(mayDerive('mcq_single_best', target), false, `mcq -> ${target}`)
      assert.equal(mayDerive('true_false', target), false, `true/false -> ${target}`)
      assert.equal(mayDerive('matching', target), false, `matching -> ${target}`)
      assert.equal(mayDerive('concept', target), false, `concept -> ${target}`)
      assert.equal(mayDerive('practical', target), false, `practical -> ${target}`)
    }
  })

  test('a non-written question may come from anything', () => {
    const targets = QUESTION_FORMATS.filter((format) => !isWrittenFormat(format))
    for (const target of targets) {
      for (const source of [...QUESTION_FORMATS, 'concept', 'practical'] as const) {
        assert.equal(mayDerive(source, target), true, `${source} -> ${target}`)
      }
    }
  })

  test('a refusal says what was tried and why', () => {
    const message = derivationRefusal('mcq_single_best', 'essay')
    assert.ok(message)
    assert.match(message, /essay/)
    assert.match(message, /only be derived from an existing written question/)
    assert.match(message, /single best answer/)
    assert.equal(derivationRefusal('essay', 'short_answer'), null)
  })
})

describe('Reading the parts of a written question', () => {
  const paper = `### (a) 5 marks
Enumerate the contents of the femoral triangle.
Expects: Femoral nerve
Expects: Femoral artery
Expects: Femoral vein
Concept: CON-MSK-0001

### (b) 5 marks
Summarise the ligaments of the hip joint.
Expects: Iliofemoral
Expects: Pubofemoral
Concept: CON-MSK-0002 | CON-MSK-0003
Depends on: a`

  test('each part keeps its label, marks, prompt and mark scheme', () => {
    const parts = parseWrittenParts(paper)
    assert.equal(parts.length, 2)
    assert.equal(parts[0].label, 'a')
    assert.equal(parts[0].marks, 5)
    assert.equal(parts[0].prompt, 'Enumerate the contents of the femoral triangle.')
    assert.deepEqual(parts[0].expectedPoints, ['Femoral nerve', 'Femoral artery', 'Femoral vein'])
    assert.deepEqual(parts[0].conceptIds, ['CON-MSK-0001'])
  })

  test('a part may name several concepts, and depend on another part', () => {
    const parts = parseWrittenParts(paper)
    assert.deepEqual(parts[1].conceptIds, ['CON-MSK-0002', 'CON-MSK-0003'])
    assert.equal(parts[1].dependsOnPartId, 'part-a')
    assert.equal(parts[0].dependsOnPartId, undefined)
  })

  test('the marks add up to what the paper carries', () => {
    assert.equal(writtenTotalMarks(parseWrittenParts(paper)), 10)
  })

  test('a part whose mark scheme was never published is kept, not dropped', () => {
    // Papers routinely print the question and not the answer. Losing the
    // question because its mark scheme is unknown is the wrong trade — the
    // validator reports it instead.
    const parts = parseWrittenParts('### (a) 5 marks\nDiscuss the coronary circulation.')
    assert.equal(parts.length, 1)
    assert.deepEqual(parts[0].expectedPoints, [])
    assert.equal(parts[0].prompt, 'Discuss the coronary circulation.')
  })

  test('a part with no printed marks reads as zero rather than failing', () => {
    const parts = parseWrittenParts('### (a)\nName the carpal bones.')
    assert.equal(parts.length, 1)
    assert.equal(parts[0].marks, 0)
  })

  test('roman and bare labels both work', () => {
    const parts = parseWrittenParts('### (i) 2 marks\nOne.\n### ii\nTwo.\n### 3 - 4 marks\nThree.')
    assert.deepEqual(parts.map((part) => part.label), ['i', 'ii', '3'])
    assert.equal(parts[2].marks, 4)
  })

  test('an empty cell yields no parts', () => {
    assert.deepEqual(parseWrittenParts(''), [])
    assert.deepEqual(parseWrittenParts(undefined), [])
  })

  test('text before the first heading is not silently swallowed into a part', () => {
    const parts = parseWrittenParts('Some preamble nobody labelled.\n### (a) 3 marks\nThe real question.')
    assert.equal(parts.length, 1)
    assert.equal(parts[0].prompt, 'The real question.')
  })
})

describe('Reading what a question was derived from', () => {
  test('a bare kind', () => {
    assert.deepEqual(parseDerivedFrom('concept'), { format: 'concept' })
    assert.deepEqual(parseDerivedFrom('practical'), { format: 'practical' })
    assert.deepEqual(parseDerivedFrom('essay'), { format: 'essay' })
  })

  test('a kind and an ID together', () => {
    assert.deepEqual(parseDerivedFrom('mcq_single_best · Q-CVS-014'), {
      format: 'mcq_single_best', id: 'Q-CVS-014',
    })
  })

  test('an ID alone', () => {
    assert.deepEqual(parseDerivedFrom('Q-CVS-014'), { id: 'Q-CVS-014' })
  })

  test('an empty cell says nothing', () => {
    assert.deepEqual(parseDerivedFrom(''), {})
    assert.deepEqual(parseDerivedFrom(undefined), {})
  })
})

describe('Formats that cannot yet be shown are refused', () => {
  test('every runnable format is a real format', () => {
    for (const format of RUNNABLE_FORMATS) {
      assert.ok((QUESTION_FORMATS as readonly string[]).includes(format), format)
    }
  })

  test('every format now has a runner', () => {
    for (const format of QUESTION_FORMATS) {
      assert.equal(isRunnableFormat(format), true, format)
    }
  })

  test('everything with a runner is runnable', () => {
    for (const format of ['mcq_single_best', 'true_false', 'image_based', 'matching',
      'mcq_multi', 'labeling', 'completion',
      'short_answer', 'structured_written', 'essay', 'comparison_table', 'multipart_written'] as const) {
      assert.equal(isRunnableFormat(format), true, format)
    }
  })
})
