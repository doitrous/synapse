import test from 'node:test'
import assert from 'node:assert/strict'
import { managedQuestionToStudentQuestion, publishedQuestionsFromCatalogue } from './questionProjection.ts'
import type { ManagedContentItem } from './contentControl.ts'

function item(id: string): ManagedContentItem {
  return { id, kind: 'question', status: 'Published', title: id, subjectId: 'cvs', fields: {},
    questionData: { tags: { topic: 'Heart', conceptIds: ['secondary'], mainConceptIds: ['main', 'secondary'] },
      answers: [{ label: 'A', text: 'Yes', explanation: 'Why yes' }, { label: 'B', text: 'No', explanation: 'Why no' }],
      correctAnswer: 'B', libraryIds: ['article', 'missing'], resourceIds: ['resource'], attachedImage: '/question.webp',
      learningObjective: 'Objective', attachments: [{ id: 'image', type: 'image', name: 'Scan', url: '/scan.webp' }],
    },
  } as ManagedContentItem
}

test('projection preserves answer keys, explanations, links, media and assessed concepts', () => {
  const q = item('q')
  const catalogue = [q, { id: 'article', title: 'Reading' }, { id: 'resource', title: 'Reference' }] as ManagedContentItem[]
  const result = managedQuestionToStudentQuestion(q, catalogue)!
  assert.deepEqual(result.options, [{ text: 'Yes', correct: false, rationale: 'Why yes' }, { text: 'No', correct: true, rationale: 'Why no' }])
  assert.equal(result.explanation, 'Why no')
  assert.deepEqual(result.libraryRefs, [{ id: 'article', title: 'Reading' }, { id: 'missing', title: 'missing' }])
  assert.deepEqual(result.resourceRefs, ['Reference'])
  assert.deepEqual(result.conceptIds, ['main', 'secondary'])
  assert.equal(result.attachedImage, '/question.webp')
  assert.deepEqual(result.attachments, q.questionData!.attachments)
  assert.equal(result.learningObjective, 'Objective')
})

test('unpublished, blocked and unanswerable questions remain excluded', () => {
  const draft = { ...item('draft'), status: 'Draft' } as ManagedContentItem
  const blocked = item('blocked')
  blocked.questionData!.mediaRequests = [{ priority: 'required', status: 'requested' }] as never
  const invalid = item('invalid')
  invalid.questionData!.answers[1].text = ' '
  assert.deepEqual(publishedQuestionsFromCatalogue([draft, blocked, invalid, item('ok')]).map(q => q.id), ['ok'])
})

test('catalogue lookup work grows linearly with the number of questions', () => {
  let titleReads = 0
  const catalogue = Array.from({ length: 100 }, (_, i) => {
    const q = item(`q${i}`)
    Object.defineProperty(q, 'title', { enumerable: true, get() { titleReads++; return `q${i}` } })
    return q
  })
  assert.equal(publishedQuestionsFromCatalogue(catalogue).length, 100)
  // Allows the publication gate, lookup and projection, but not 100 full scans.
  assert.ok(titleReads < 1000, `Read ${titleReads} titles for 100 questions`)
})

test('readers share a projection and a new catalogue snapshot refreshes it', () => {
  const catalogue = [item('q')]
  const first = publishedQuestionsFromCatalogue(catalogue)
  assert.strictEqual(publishedQuestionsFromCatalogue(catalogue), first)
  const updated = publishedQuestionsFromCatalogue([{ ...catalogue[0], title: 'Edited' }])
  assert.equal(updated[0].stem, 'Edited')
  assert.equal(first[0].stem, 'q')
  assert.deepEqual(publishedQuestionsFromCatalogue([{ ...catalogue[0], status: 'Archived' }]), [])
})

test('the current source and module-path metadata survives the optimized projection', () => {
  const q = item('q')
  Object.assign(q.questionData!.tags, { sourceCategory: 'university', moduleIds: ['M1'], moduleSubjectPaths: ['M2 > CVS > Heart', 'M1 > CVS'] })
  const result = publishedQuestionsFromCatalogue([q])[0]
  assert.equal(result.source, 'university')
  assert.deepEqual(result.moduleIds, ['M1', 'M2'])
})

test('audience filtering is preserved for full questions and room summaries', async () => {
  const { publishedQuestionsForAudience, publishedQuestionSummariesForAudience } = await import('./questionProjection.ts')
  const a = item('a'), b = item('b')
  a.questionData!.tags.questionOnlyFor = ['university-a']
  b.questionData!.tags.questionOnlyFor = ['university-b']
  const catalogue = [a, b]
  assert.deepEqual(publishedQuestionsForAudience(catalogue, { universityId: 'university-a' }).map(q => q.id), ['a'])
  assert.deepEqual(publishedQuestionsForAudience(catalogue, { universityId: 'university-b' }).map(q => q.id), ['b'])
  assert.deepEqual(publishedQuestionSummariesForAudience(catalogue, { universityId: 'university-a' }).map(q => q.id), ['a'])
})

test('server summary rows work without answer bodies and preserve selection ids', async () => {
  const { publishedQuestionSummariesForAudience } = await import('./questionProjection.ts')
  const q = item('q')
  delete (q.questionData as Partial<typeof q.questionData>)!.answers
  const result = publishedQuestionSummariesForAudience([q], {})[0]
  assert.equal(result.id, 'q')
  assert.equal(result.topic, 'Heart')
  assert.deepEqual(result.libraryRefs.map(r => r.id), ['article', 'missing'])
  assert.deepEqual(result.options, [])
})

test('room summaries keep the exact eligible ids of the already server-scoped full bank', async () => {
  const { publishedQuestionSummariesFromCatalogue } = await import('./questionProjection.ts')
  const q = item('university-only')
  q.questionData!.tags.questionOnlyFor = ['university-a']
  const catalogue = [q, item('general')]
  assert.deepEqual(publishedQuestionSummariesFromCatalogue(catalogue).map(q => q.id), publishedQuestionsFromCatalogue(catalogue).map(q => q.id))
})
