import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import type { ManagedContentItem } from './contentControl.ts'
import { parseWrittenParts } from './questionFormat.ts'
import {
  managedWrittenToStudentWritten, markWritten, writtenFullyMarked, writtenPartsInOrder,
} from './writtenQuestion.ts'

const PARTS = parseWrittenParts(`### (a) 5 marks
Enumerate the contents of the femoral triangle.
Expects: Femoral nerve
Expects: Femoral artery
Expects: Femoral vein
Expects: Deep inguinal lymph nodes
Expects: Femoral canal

### (b) 4 marks
Summarise the ligaments of the hip joint.
Expects: Iliofemoral
Expects: Pubofemoral
Expects: Ischiofemoral
Expects: Ligamentum teres`)

function written(overrides: Partial<ManagedContentItem> = {}): ManagedContentItem {
  return {
    id: 'Q-W1',
    kind: 'question',
    title: 'Femoral triangle and hip joint',
    subjectId: 'msk',
    status: 'Published',
    owner: 'omar',
    updatedAt: '2026-08-21T00:00:00.000Z',
    fields: { Topic: 'Lower limb' },
    questionData: {
      format: 'structured_written',
      writtenParts: PARTS,
      attachments: [], correctAnswer: 'A', answers: [], attachedImage: '',
      libraryIds: [], resourceIds: [],
      tags: {
        topic: 'Lower limb', mainConceptIds: ['CON-MSK-1', 'CON-MSK-2'],
        conceptIds: [], contextualConceptIds: ['CON-MSK-9'],
      } as never,
      learningObjective: 'Name the femoral triangle contents and hip ligaments.',
      authorNotes: '', sourceCitation: '', estimatedSeconds: 600, randomiseAnswers: false,
    },
    ...overrides,
  } as ManagedContentItem
}

describe('Projecting a written question for a student', () => {
  test('the parts, their marks and the total come through', () => {
    const question = managedWrittenToStudentWritten(written())!
    assert.equal(question.parts.length, 2)
    assert.equal(question.totalMarks, 9)
    assert.equal(question.topic, 'Lower limb')
    assert.equal(question.parts[0].expectedPoints.length, 5)
  })

  test('contextual concepts are left out, as they are for an MCQ', () => {
    const question = managedWrittenToStudentWritten(written())!
    assert.deepEqual(question.conceptIds, ['CON-MSK-1', 'CON-MSK-2'])
    assert.ok(!question.conceptIds!.includes('CON-MSK-9'),
      'a concept the question mentions but never tests must not be offered as revision')
  })

  test('an unpublished written question is not shown', () => {
    assert.equal(managedWrittenToStudentWritten(written({ status: 'Draft' })), null)
  })

  test('an MCQ is not a written question', () => {
    const mcq = written()
    mcq.questionData!.format = 'mcq_single_best'
    assert.equal(managedWrittenToStudentWritten(mcq), null)
  })

  test('a written question with no parts is refused', () => {
    const empty = written()
    empty.questionData!.writtenParts = []
    assert.equal(managedWrittenToStudentWritten(empty), null,
      'there would be nothing to mark against, which is the whole of the practice')
  })
})

describe('Marking a written answer', () => {
  test('an unmarked answer scores null, not zero', () => {
    assert.equal(markWritten(null, PARTS), null,
      'a student who has written an answer and not marked it has not scored nothing')
  })

  test('marks are apportioned across a part\'s expected points', () => {
    const score = markWritten({
      'part-a': ['Femoral nerve', 'Femoral artery', 'Femoral vein', 'Femoral canal', 'Deep inguinal lymph nodes'],
      'part-b': ['Iliofemoral', 'Pubofemoral'],
    }, PARTS)!
    assert.equal(score.parts[0].marks, 5, 'all five of five points on a 5-mark part')
    assert.equal(score.parts[1].marks, 2, 'two of four points on a 4-mark part')
    assert.equal(score.marks, 7)
    assert.equal(score.outOf, 9)
  })

  test('a tick for a point that no longer exists does not count', () => {
    // Editing a question must not leave an old tick earning marks for a point
    // that was removed.
    const score = markWritten({ 'part-a': ['Femoral nerve', 'A point since deleted'] }, PARTS)!
    assert.equal(score.parts[0].covered, 1)
    assert.equal(score.parts[0].marks, 1)
  })

  test('a part with no published mark scheme scores nothing rather than everything', () => {
    const unmarkable = parseWrittenParts('### (a) 6 marks\nDiscuss the coronary circulation.')
    const score = markWritten({ 'part-a': [] }, unmarkable)!
    assert.equal(score.parts[0].marks, 0)
    assert.equal(score.parts[0].total, 0)
    assert.equal(score.outOf, 6, 'the paper still says six marks were available')
  })

  test('the parts total exactly what the paper carries', () => {
    // Rounding each part and then totalling drifts from the mark on the page.
    const score = markWritten({ 'part-a': ['Femoral nerve'], 'part-b': ['Iliofemoral'] }, PARTS)!
    assert.equal(score.parts[0].marks + score.parts[1].marks, score.marks)
    assert.equal(score.marks, 1 + 1)
  })
})

describe('Knowing when marking is finished', () => {
  test('every part with a scheme must be marked', () => {
    assert.equal(writtenFullyMarked({ 'part-a': [] }, PARTS), false)
    assert.equal(writtenFullyMarked({ 'part-a': [], 'part-b': [] }, PARTS), true)
    assert.equal(writtenFullyMarked(null, PARTS), false)
  })

  test('a part with nothing to tick does not strand the student', () => {
    const mixed = parseWrittenParts(`### (a) 2 marks
Answerable.
Expects: Something

### (b) 3 marks
No scheme was ever published for this.`)
    assert.equal(writtenFullyMarked({ 'part-a': ['Something'] }, mixed), true)
  })
})

describe('The order parts are answered in', () => {
  test('a part comes after the one it depends on', () => {
    const parts = parseWrittenParts(`### (b) 3 marks
Second.
Depends on: a

### (a) 2 marks
First.`)
    assert.deepEqual(writtenPartsInOrder(parts).map((part) => part.label), ['a', 'b'])
  })

  test('independent parts keep the order the paper printed them in', () => {
    assert.deepEqual(writtenPartsInOrder(PARTS).map((part) => part.label), ['a', 'b'])
  })

  test('a dependency cycle falls back to the printed order rather than hanging', () => {
    const parts = parseWrittenParts(`### (a) 1 marks
One.
Depends on: b

### (b) 1 marks
Two.
Depends on: a`)
    const ordered = writtenPartsInOrder(parts)
    assert.equal(ordered.length, 2)
    assert.deepEqual(new Set(ordered.map((part) => part.label)), new Set(['a', 'b']))
  })
})
