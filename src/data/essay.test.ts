import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseKeyPoints, coveredCount, managedEssayToStudentEssay } from './essay.ts'
import type { ManagedContentItem } from './contentControl.ts'

test('key points parse one per line', () => {
  const points = parseKeyPoints('Raised JVP\nPulsatile liver\n')
  assert.deepEqual(points.map((point) => point.text), ['Raised JVP', 'Pulsatile liver'])
  assert.equal(points.every((point) => !point.legible), true)
})

test('a leading ! marks a point to write legibly, and is not part of the text', () => {
  const points = parseKeyPoints('!Tricuspid regurgitation\nRaised JVP')
  assert.equal(points[0].legible, true)
  assert.equal(points[0].text, 'Tricuspid regurgitation')
  assert.equal(points[1].legible, undefined)
})

test('blank lines are not key points', () => {
  assert.equal(parseKeyPoints('One\n\n   \nTwo').length, 2)
})

test('every key point gets its own id', () => {
  const points = parseKeyPoints('One\nTwo')
  assert.notEqual(points[0].id, points[1].id)
})

test('covered is what was ticked over what there was', () => {
  assert.deepEqual(coveredCount(['a', 'c'], ['a', 'b', 'c']), { covered: 2, total: 3 })
})

test('a tick for a point that no longer exists is not counted', () => {
  assert.deepEqual(coveredCount(['a', 'gone'], ['a', 'b']), { covered: 1, total: 2 })
})

test('an unmarked answer has no count rather than a zero', () => {
  assert.equal(coveredCount(null, ['a', 'b']), null)
})

test('an unpublished essay is not offered to students', () => {
  const item = {
    id: 'e1', kind: 'essay', title: 'Right heart failure', subjectId: 'cvs', status: 'Draft',
    owner: '', updatedAt: '', fields: {},
    essayData: { prompt: 'Discuss.', keyPoints: [{ id: 'k1', text: 'Raised JVP' }], examinerNote: '', modelAnswer: '' },
  } as unknown as ManagedContentItem
  assert.equal(managedEssayToStudentEssay(item), null)
})

test('an essay with no key points is not offered either', () => {
  const item = {
    id: 'e1', kind: 'essay', title: 'Right heart failure', subjectId: 'cvs', status: 'Published',
    owner: '', updatedAt: '', fields: {},
    essayData: { prompt: 'Discuss.', keyPoints: [], examinerNote: '', modelAnswer: '' },
  } as unknown as ManagedContentItem
  assert.equal(managedEssayToStudentEssay(item), null)
})

test('a published essay projects into the student shape', () => {
  const item = {
    id: 'e1', kind: 'essay', title: 'Right heart failure', subjectId: 'cvs', status: 'Published',
    owner: '', updatedAt: '', fields: {},
    essayData: {
      prompt: 'Discuss the causes.', examinerNote: 'Looks for the word cor pulmonale.',
      modelAnswer: 'Right heart failure follows…',
      keyPoints: [{ id: 'k1', text: 'Raised JVP' }, { id: 'k2', text: 'Cor pulmonale', legible: true }],
    },
  } as unknown as ManagedContentItem
  const essay = managedEssayToStudentEssay(item)
  assert.equal(essay?.prompt, 'Discuss the causes.')
  assert.equal(essay?.keyPoints.length, 2)
  assert.equal(essay?.keyPoints[1].legible, true)
})
