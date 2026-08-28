import assert from 'node:assert/strict'
import test from 'node:test'
import type { ManagedContentItem } from './contentControl.ts'
import { resetPublishedContentVisibility } from './contentVisibilityReset.ts'

const at = '2026-08-25T10:00:00.000Z'

test('withdraws only published articles and questions and clears every audience allow-list', () => {
  const records = [
    {
      id: 'article-live', kind: 'article', title: 'Article', subjectId: 'cvs', status: 'Published', owner: 'A', updatedAt: 'old', fields: {},
      source: { universityId: 'asu', institution: 'Ain Shams' },
      articleData: { universityIds: ['asu'], yearIds: ['1'], universityNotes: { asu: 'Local wording' }, blocks: [] },
    },
    {
      id: 'question-live', kind: 'question', title: 'Question', subjectId: 'cvs', status: 'Published', owner: 'A', updatedAt: 'old', fields: {},
      questionData: {
        stem: 'Stem', options: [], correctIndex: 0, explanation: '',
        tags: { universityIds: ['asu'], years: ['1'], questionOnlyFor: ['asu:1'], examWeightByYear: { '1': 4 } },
      },
    },
    { id: 'article-draft', kind: 'article', title: 'Draft', subjectId: 'cvs', status: 'Draft', owner: 'A', updatedAt: 'old', fields: {}, articleData: { universityIds: ['asu'], yearIds: ['1'], blocks: [] } },
    { id: 'practical-live', kind: 'practical', title: 'Practical', subjectId: 'cvs', status: 'Published', owner: 'A', updatedAt: 'old', fields: {} },
  ] as ManagedContentItem[]

  const result = resetPublishedContentVisibility(records, at)

  assert.deepEqual(result.targetIds, ['article-live', 'question-live'])
  assert.deepEqual(result.stats, {
    publishedArticles: 1,
    publishedQuestions: 1,
    articleUniversityLists: 1,
    articleYearLists: 1,
    questionUniversityLists: 1,
    questionYearLists: 1,
    questionOnlyForLists: 1,
    preservedUniversityNotes: 1,
  })
  assert.equal(result.items[0].status, 'In review')
  assert.equal(result.items[0].updatedAt, at)
  assert.deepEqual(result.items[0].articleData?.universityIds, [])
  assert.deepEqual(result.items[0].articleData?.yearIds, [])
  assert.deepEqual(result.items[0].articleData?.universityNotes, { asu: 'Local wording' })
  assert.deepEqual(result.items[0].source, records[0].source)

  assert.equal(result.items[1].status, 'In review')
  assert.deepEqual(result.items[1].questionData?.tags?.universityIds, [])
  assert.deepEqual(result.items[1].questionData?.tags?.years, [])
  assert.deepEqual(result.items[1].questionData?.tags?.questionOnlyFor, [])
  assert.deepEqual(result.items[1].questionData?.tags?.examWeightByYear, { '1': 4 })

  assert.strictEqual(result.items[2], records[2])
  assert.strictEqual(result.items[3], records[3])
})

test('is a no-op after the target records are withdrawn', () => {
  const records = [{ id: 'a', kind: 'article', title: 'A', subjectId: 'cvs', status: 'In review', owner: 'A', updatedAt: 'old', fields: {}, articleData: { universityIds: [], yearIds: [], blocks: [] } }] as ManagedContentItem[]
  const result = resetPublishedContentVisibility(records, at)
  assert.deepEqual(result.targetIds, [])
  assert.strictEqual(result.items[0], records[0])
})
