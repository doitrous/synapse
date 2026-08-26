import test from 'node:test'
import assert from 'node:assert/strict'
import {
  activeArchiveBlockers,
  archiveActivityAllowed,
  applyContentArchive,
  archiveConfirmation,
  contentArchiveManifest,
  contentDigest,
  hasContentModuleAssignment,
  originalScopeFor,
} from './contentArchive.js'

const AT = '2026-08-25T20:00:00.000Z'

function question(overrides = {}) {
  return {
    id: 'q-1', kind: 'question', title: 'Question', subjectId: 'cvs', status: 'Published', owner: 'Admin', updatedAt: '2026-01-01T00:00:00.000Z', fields: {},
    questionData: { tags: { module: 'cvs', moduleIds: ['KAU-CVS-1'], moduleSubjectPaths: ['KAU-CVS-1 > Anatomy'], universityIds: ['KAU'], years: ['KAU_Y1'], questionOnlyFor: ['KAU_Y1'], examWeightByYear: { KAU_Y1: 0.8 } }, answers: [] },
    ...overrides,
  }
}

function article(overrides = {}) {
  return {
    id: 'a-1', kind: 'article', title: 'Article', subjectId: 'cvs', status: 'In review', owner: 'Admin', updatedAt: '2026-01-01T00:00:00.000Z', fields: {},
    articleData: { moduleIds: ['KAU-CVS-1'], moduleSubjectPaths: ['KAU-CVS-1 > Anatomy'], universityIds: ['KAU'], yearIds: ['KAU_Y1'], universityNotes: [{ universityId: 'KAU', text: 'Keep this authored note' }] },
    ...overrides,
  }
}

function unassignedQuestion(overrides = {}) {
  return question({
    questionData: {
      tags: {
        module: 'cvs', moduleIds: [], moduleSubjectPaths: [], universityIds: ['KAU'], years: ['KAU_Y1'],
        questionOnlyFor: ['KAU_Y1'], examWeightByYear: { KAU_Y1: 0.8 },
      },
      answers: [],
    },
    ...overrides,
  })
}

function unassignedArticle(overrides = {}) {
  return article({
    articleData: {
      moduleIds: [], moduleSubjectPaths: [], universityIds: ['KAU'], yearIds: ['KAU_Y1'],
      universityNotes: [{ universityId: 'KAU', text: 'Keep this authored note' }],
    },
    ...overrides,
  })
}

test('manifest freezes only module-unassigned articles and questions', () => {
  const ledger = [
    question(), article(),
    unassignedQuestion({ id: 'q-2' }), unassignedArticle({ id: 'a-2' }),
    { ...article({ id: 'r-1', kind: 'resource' }) },
  ]
  const manifest = contentArchiveManifest(ledger)
  assert.equal(manifest.selection, 'unassigned-modules-v2')
  assert.deepEqual(manifest.counts, { articles: 1, questions: 1, total: 2 })
  assert.deepEqual(manifest.targets.map(({ id }) => id), ['a-2', 'q-2'])
  assert.equal(manifest.targets[0].fingerprint, contentDigest(unassignedArticle({ id: 'a-2' })))
  assert.equal(archiveConfirmation(manifest.counts), 'ARCHIVE 1 ARTICLES AND 1 QUESTIONS')
})

test('archive detaches curriculum targeting while preserving content and provenance', () => {
  const source = { origin: 'university', universityId: 'KAU', reference: 'Paper 1' }
  const ledger = [unassignedQuestion({ source, editorialTags: ['Legacy', 'legacy', ''] }), unassignedArticle({ source, editorialTags: ['Faculty reviewed'] }), { id: 'later', kind: 'resource', status: 'Published' }]
  const manifest = contentArchiveManifest(ledger)
  const archived = applyContentArchive(ledger, manifest, {
    operationId: 'op-1', actorId: 'admin-1', reason: 'Legacy generated catalogue', archivedAt: AT,
  }).value

  const q = archived.find((item) => item.id === 'q-1')
  assert.equal(q.status, 'Archived')
  assert.deepEqual(q.source, source)
  assert.deepEqual(q.questionData.tags.moduleIds, [])
  assert.deepEqual(q.questionData.tags.moduleSubjectPaths, [])
  assert.deepEqual(q.questionData.tags.universityIds, [])
  assert.deepEqual(q.questionData.tags.years, [])
  assert.deepEqual(q.questionData.tags.questionOnlyFor, [])
  assert.deepEqual(q.questionData.tags.examWeightByYear, {})
  assert.equal(q.questionData.tags.module, '')
  assert.deepEqual(q.editorialTags, ['Legacy', 'Generated - No Module'])

  const a = archived.find((item) => item.id === 'a-1')
  assert.equal(a.status, 'Archived')
  assert.deepEqual(a.articleData.moduleIds, [])
  assert.deepEqual(a.articleData.moduleSubjectPaths, [])
  assert.deepEqual(a.articleData.universityIds, [])
  assert.deepEqual(a.articleData.yearIds, [])
  assert.deepEqual(a.articleData.universityNotes, [{ universityId: 'KAU', text: 'Keep this authored note' }])
  assert.deepEqual(a.editorialTags, ['Faculty reviewed', 'Generated - No Module'])
  assert.equal(archived[2], ledger[2])
  assert.deepEqual(originalScopeFor(manifest.targets.find((target) => target.id === 'q-1')), {
    module: 'cvs', moduleIds: [], moduleSubjectPaths: [], universityIds: ['KAU'], years: ['KAU_Y1'], questionOnlyFor: ['KAU_Y1'], examWeightByYear: { KAU_Y1: 0.8 },
  })
})

test('a changed manifest target aborts without a partial transform', () => {
  const ledger = [unassignedQuestion(), unassignedArticle()]
  const manifest = contentArchiveManifest(ledger)
  assert.throws(() => applyContentArchive([{ ...unassignedQuestion(), title: 'Edited later' }, unassignedArticle()], manifest, {
    operationId: 'op-1', actorId: 'admin-1', reason: 'Legacy', archivedAt: AT,
  }), /content changed after preflight/)
})

test('a completed archive is idempotent and retains its first receipt metadata', () => {
  const ledger = [unassignedQuestion(), unassignedArticle()]
  const firstManifest = contentArchiveManifest(ledger)
  const first = applyContentArchive(ledger, firstManifest, {
    operationId: 'op-1', actorId: 'admin-1', reason: 'Legacy', archivedAt: AT,
  }).value
  assert.deepEqual(contentArchiveManifest(first).counts, { articles: 0, questions: 0, total: 0 })
  assert.equal(first[0].archive.operationId, 'op-1')
  assert.equal(first[0].archive.originalStatus, 'Published')
  assert.deepEqual(first[0].editorialTags, ['Generated - No Module'])
})

test('older Archived records are cleaned only when targeting remains', () => {
  const targeted = unassignedQuestion({ status: 'Archived', archive: undefined })
  const detached = question({
    id: 'q-2',
    status: 'Archived',
    archive: undefined,
    editorialTags: ['Generated - No Module'],
    questionData: { tags: { module: '', moduleIds: [], moduleSubjectPaths: [], universityIds: [], years: [], questionOnlyFor: [], examWeightByYear: {} }, answers: [] },
  })
  const manifest = contentArchiveManifest([targeted, detached])
  assert.deepEqual(manifest.targets.map((target) => target.id), ['q-1'])
})

test('malformed target IDs are rejected before a destructive manifest exists', () => {
  assert.throws(() => contentArchiveManifest([question({ id: '' })]), /without an ID/)
  assert.throws(() => contentArchiveManifest([question(), article({ id: 'q-1' })]), /duplicate ID/)
  assert.throws(() => contentArchiveManifest([question(), { id: 'q-1', kind: 'resource', status: 'Published' }]), /duplicate ID/)
})

test('collaborative activity is counted conservatively', () => {
  assert.equal(activeArchiveBlockers({ studyRooms: 2, challenges: 3, partyQuestionSessions: 4 }), 9)
  assert.equal(archiveActivityAllowed({ studyRooms: 2, challenges: 3, partyQuestionSessions: 4 }, false), false)
  assert.equal(archiveActivityAllowed({ studyRooms: 2, challenges: 3, partyQuestionSessions: 4 }, true), true)
  assert.equal(archiveActivityAllowed({ studyRooms: 0, challenges: 0, partyQuestionSessions: 0 }, false), true)
})

test('an older detached archive missing the retirement tag is repaired once', () => {
  const detached = question({
    status: 'Archived',
    archive: { operationId: 'old', actorId: 'admin', reason: 'Old archive', archivedAt: AT, detached: true, originalStatus: 'Published' },
    editorialTags: [],
    questionData: { tags: { module: '', moduleIds: [], moduleSubjectPaths: [], universityIds: [], years: [], questionOnlyFor: [], examWeightByYear: {} }, answers: [] },
  })
  const manifest = contentArchiveManifest([detached])
  assert.equal(manifest.counts.questions, 1)
  const repaired = applyContentArchive([detached], manifest, {
    operationId: 'repair', actorId: 'admin', reason: 'Add retirement tag', archivedAt: AT,
  }).value[0]
  assert.deepEqual(repaired.editorialTags, ['Generated - No Module'])
  assert.equal(repaired.archive.operationId, 'old')
  assert.equal(contentArchiveManifest([repaired]).counts.total, 0)
})

test('any authored module id or path protects content from this archive', () => {
  assert.equal(hasContentModuleAssignment(question()), true)
  assert.equal(hasContentModuleAssignment(article()), true)
  assert.equal(hasContentModuleAssignment(unassignedQuestion()), false)
  assert.equal(hasContentModuleAssignment(unassignedArticle()), false)
  assert.equal(hasContentModuleAssignment(unassignedQuestion({
    questionData: { tags: { moduleIds: ['UNKNOWN-MODULE'], moduleSubjectPaths: [] }, answers: [] },
  })), true)
})

test('an obsolete all-content manifest cannot be applied after the selection narrows', () => {
  const ledger = [unassignedQuestion()]
  const manifest = contentArchiveManifest(ledger)
  delete manifest.selection
  assert.throws(() => applyContentArchive(ledger, manifest, {
    operationId: 'old-op', actorId: 'admin', reason: 'Old broad preflight', archivedAt: AT,
  }), /obsolete selection/)
})
