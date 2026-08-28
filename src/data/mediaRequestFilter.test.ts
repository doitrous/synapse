import test from 'node:test'
import assert from 'node:assert/strict'
import {
  blockingMediaRequests,
  matchesMediaRequestFilter,
  mediaRequestsOf,
  type ManagedContentItem,
  type MediaRequest,
} from './contentControl.ts'

function request(id: string, overrides: Partial<MediaRequest> = {}): MediaRequest {
  return {
    id,
    ownerId: 'q-1',
    ownerKind: 'question',
    medium: 'image',
    kind: 'diagram',
    brief: 'Supply a diagram',
    teachingPurpose: 'Carries the tested relationship',
    priority: 'required',
    status: 'needed',
    ...overrides,
  }
}

function item(questionData: unknown): ManagedContentItem {
  return {
    id: 'q-1',
    kind: 'question',
    title: 'Question',
    subjectId: 'cvs',
    status: 'In review',
    owner: 'Reviewer',
    updatedAt: '2026-08-25T00:00:00.000Z',
    fields: {},
    questionData,
  } as ManagedContentItem
}

test('collects and de-duplicates owner and nested media requests', () => {
  const shared = request('shared')
  const nested = request('nested', { priority: 'optional', status: 'planned' })
  const content = item({
    mediaRequests: [shared],
    answers: [{ label: 'A', mediaRequests: [shared, nested] }],
  })

  assert.deepEqual(mediaRequestsOf(content).map((entry) => entry.id), ['shared', 'nested'])
})

test('required media remains blocking until a managed asset is supplied', () => {
  const missing = item({ mediaRequests: [request('required')] })
  const supplied = item({ mediaRequests: [request('required', { status: 'supplied', mediaId: 'med-1' })] })

  assert.equal(blockingMediaRequests(missing).length, 1)
  assert.equal(blockingMediaRequests(supplied).length, 0)
})

test('a legacy required request without an id cannot bypass the publish gate', () => {
  const legacy = request('legacy') as MediaRequest & { id?: string }
  delete legacy.id
  const content = item({ mediaRequests: [legacy] })

  assert.equal(mediaRequestsOf(content).length, 1)
  assert.equal(blockingMediaRequests(content).length, 1)
  assert.equal(matchesMediaRequestFilter(content, 'blocking'), true)
})

test('catalogue filters distinguish any, outstanding, blocking and no requests', () => {
  const none = item({ mediaRequests: [] })
  const optionalPlanned = item({ mediaRequests: [request('optional', { priority: 'optional', status: 'planned' })] })
  const blocked = item({ mediaRequests: [request('blocked')] })

  assert.equal(matchesMediaRequestFilter(none, 'none'), true)
  assert.equal(matchesMediaRequestFilter(optionalPlanned, 'any'), true)
  assert.equal(matchesMediaRequestFilter(optionalPlanned, 'outstanding'), true)
  assert.equal(matchesMediaRequestFilter(optionalPlanned, 'blocking'), false)
  assert.equal(matchesMediaRequestFilter(blocked, 'blocking'), true)
})
