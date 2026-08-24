import test from 'node:test'
import assert from 'node:assert/strict'
import { partitionByReadiness, publishReadiness } from './publishReadiness.ts'
import type { ManagedContentItem } from './contentControl.ts'

const base = {
  kind: 'article',
  status: 'In review',
  title: 'A',
  subjectId: 'cvs',
  owner: 'o',
  updatedAt: '2026-08-12T00:00:00.000Z',
  fields: {},
} as unknown as ManagedContentItem

const article = (articleData: unknown, status = 'In review') =>
  ({ ...base, id: 'x', status, articleData }) as ManagedContentItem

test('an evidence-gated article with no visible sections cannot publish', () => {
  // The live case: all 128 in-review articles look like this.
  const verdict = publishReadiness(article({ publishedSections: [], publicationGate: 'needs_evidence' }))
  assert.equal(verdict.ready, false)
  assert.equal(verdict.reason, 'Needs evidence')
})

test('the blocking reason follows the publication gate', () => {
  assert.equal(publishReadiness(article({ publishedSections: [], publicationGate: 'faculty_review' })).reason, 'Faculty review')
  assert.equal(publishReadiness(article({ publishedSections: [], publicationGate: 'conflicted' })).reason, 'Conflicting sources')
})

test('an article with a visible section can publish', () => {
  const verdict = publishReadiness(article({ publishedSections: [{ id: 's', heading: 'H', body: '', kind: 'content' }] }))
  assert.equal(verdict.ready, true)
})

test('a components-only projection is not student-visible content', () => {
  // Components sections are a machine listing, never reading material.
  const verdict = publishReadiness(article({ publishedSections: [{ id: 's', heading: 'Components and relations', body: '', kind: 'components' }], publicationGate: 'needs_evidence' }))
  assert.equal(verdict.ready, false)
})

test('an ungated article falls back to whether it has any body', () => {
  assert.equal(publishReadiness(article({ sections: [{ id: 's', heading: 'H', body: 'Real prose.' }] })).ready, true)
  assert.equal(publishReadiness(article({ sections: [{ id: 's', heading: 'H', body: '' }] })).ready, false)
})

test('narrative prose counts as body for an ungated article', () => {
  assert.equal(publishReadiness(article({ sections: [{ id: 's', heading: 'H', body: '', narrative: 'Prose.' }] })).ready, true)
})

test('non-article kinds carry no evidence gate', () => {
  const resource = { ...base, id: 'r', kind: 'resource' } as ManagedContentItem
  assert.equal(publishReadiness(resource).ready, true)
})

test('an already-published item is not offered again', () => {
  assert.equal(publishReadiness(article({ publishedSections: [{ id: 's', heading: 'H', body: '', kind: 'content' }] }, 'Published')).ready, false)
})

test('partitioning reports both sides of a mixed selection', () => {
  const ok = article({ publishedSections: [{ id: 's', heading: 'H', body: '', kind: 'content' }] })
  const no = article({ publishedSections: [], publicationGate: 'needs_evidence' })
  const { ready, blocked } = partitionByReadiness([ok, no, no])
  assert.equal(ready.length, 1)
  assert.equal(blocked.length, 2)
  assert.equal(blocked[0].reason, 'Needs evidence')
})

test('required media hard-blocks every owner type and cannot be declined past', () => {
  for (const kind of ['question', 'article', 'practical'] as const) {
    const item = {
      ...base, id: kind, kind,
      [`${kind}Data`]: {
        mediaRequests: [{
          id: 'mr-1', ownerId: kind, ownerKind: kind, medium: 'image', kind: 'diagram',
          brief: 'Required figure', teachingPurpose: 'Carries the tested relationship',
          priority: 'required', status: 'declined',
        }],
      },
    } as unknown as ManagedContentItem
    const verdict = publishReadiness(item)
    assert.equal(verdict.ready, false)
    assert.equal(verdict.hardBlocked, true)
  }
})

test('required media is resolved only by a supplied managed asset', () => {
  const item = {
    ...base, id: 'q', kind: 'question',
    questionData: { mediaRequests: [{
      id: 'mr-1', ownerId: 'q', ownerKind: 'question', medium: 'image', kind: 'diagram',
      brief: 'Required figure', teachingPurpose: 'Carries the tested relationship',
      priority: 'required', status: 'supplied', mediaId: 'media-1',
    }] },
  } as unknown as ManagedContentItem
  assert.equal(publishReadiness(item).ready, true)
})
