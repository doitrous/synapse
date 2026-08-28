import test from 'node:test'
import assert from 'node:assert/strict'
import {
  MAX_PAYLOAD_BYTES, mayChangeAccess, mayRead, mayWrite, readPayload, readTitle, readTopics,
  revisionVerdict, sameCohort, viewerRights,
} from './sharePolicy.js'
import { assetsWithinAllowlist, payloadDocumentIds, payloadReferencesDocument } from './shares.js'

const OWNER = 'user-owner'
const OTHER = 'user-other'
const share = (access) => ({ owner_id: OWNER, access })

test('a private share is visible only to its owner', () => {
  assert.equal(mayRead(share('private'), OWNER), true)
  assert.equal(mayRead(share('private'), OTHER), false)
  // Signed out is the case a leaked link actually arrives in.
  assert.equal(mayRead(share('private'), null), false)
})

test('a read-only share opens for a signed-in link holder, never anonymously', () => {
  assert.equal(mayRead(share('view'), null), false)
  assert.equal(mayRead(share('view'), OTHER), true)
  assert.equal(mayRead(share('edit'), null), false)
})

test('revoking a link stops it opening, not merely stops it being offered', () => {
  const revoked = share('private')
  assert.equal(mayRead(revoked, OTHER), false)
  assert.equal(mayWrite(revoked, OTHER), false)
})

test('reading a share is never enough to write to it', () => {
  assert.equal(mayWrite(share('view'), OTHER), false)
  assert.equal(mayWrite(share('edit'), OTHER), true)
  assert.equal(mayWrite(share('private'), OTHER), false)
})

test('an edit has to be attributable, so nobody signed out may make one', () => {
  assert.equal(mayWrite(share('edit'), null), false)
  assert.equal(mayWrite(share('edit'), undefined), false)
})

test('the owner may always read and write their own share', () => {
  for (const access of ['private', 'view', 'edit']) {
    assert.equal(mayRead(share(access), OWNER), true)
    assert.equal(mayWrite(share(access), OWNER), true)
  }
})

test('holding an editable link does not carry the power to widen it', () => {
  assert.equal(mayChangeAccess(share('edit'), OTHER), false)
  assert.equal(mayChangeAccess(share('edit'), OWNER), true)
  assert.equal(mayChangeAccess(share('view'), null), false)
})

test('what a viewer is told they may do matches what they may do', () => {
  assert.deepEqual(viewerRights(share('edit'), OTHER), { isOwner: false, canEdit: true })
  assert.deepEqual(viewerRights(share('view'), OTHER), { isOwner: false, canEdit: false })
  assert.deepEqual(viewerRights(share('view'), null), { isOwner: false, canEdit: false })
  assert.deepEqual(viewerRights(share('private'), OWNER), { isOwner: true, canEdit: true })
})

test('a missing row grants nothing', () => {
  assert.equal(mayRead(null, OWNER), false)
  assert.equal(mayWrite(undefined, OWNER), false)
  assert.equal(mayChangeAccess(null, OWNER), false)
})

test('a title is always something, and never a control character', () => {
  assert.equal(readTitle('  Heart failure \n notes '), 'Heart failure   notes')
  assert.equal(readTitle(''), 'Untitled')
  assert.equal(readTitle(null), 'Untitled')
  assert.equal(readTitle('x'.repeat(400)).length, 200)
})

test('a payload has to be storable JSON, and bounded', () => {
  assert.equal(readPayload({ body: 'hello' }).serialised, '{"body":"hello"}')
  assert.equal(readPayload(null).error, 'payload_required')
  assert.equal(readPayload(undefined).error, 'payload_required')

  const cycle = {}
  cycle.self = cycle
  assert.equal(readPayload(cycle).error, 'payload_not_serialisable')

  assert.equal(readPayload({ body: 'x'.repeat(MAX_PAYLOAD_BYTES) }).error, 'payload_too_large')
})

test('share topics are bounded, deduplicated, and normalised without trusting arbitrary fields', () => {
  assert.deepEqual(
    readTopics({
      topics: [
        { subjectId: ' SYS ', topic: '  Cardiology\n', subtopic: ' Heart failure ' },
        { subject_id: 'sys', topic: 'Cardiology', subtopic: 'Heart failure' },
        'Respiratory',
        { ignored: true },
      ],
    }),
    [
      { subjectId: 'SYS', topic: 'Cardiology', subtopic: 'Heart failure' },
      { subjectId: null, topic: 'Respiratory', subtopic: null },
    ],
  )
  assert.deepEqual(
    readTopics({ subjectId: 'CVS', topic: 'Valves', subtopic: 'Aortic stenosis' }),
    [{ subjectId: 'CVS', topic: 'Valves', subtopic: 'Aortic stenosis' }],
  )
})

test('live document edits require the current revision and refuse stale writes', () => {
  assert.deepEqual(revisionVerdict({ revision: 3 }, { baseRevision: 3 }), {
    ok: true,
    currentRevision: 3,
    nextRevision: 4,
  })
  assert.deepEqual(revisionVerdict({ revision: 3 }, { payload: { revision: 4 } }), {
    ok: true,
    currentRevision: 3,
    nextRevision: 4,
  })
  assert.deepEqual(revisionVerdict({ revision: 4 }, { payload: { revision: 4 } }), {
    ok: false,
    reason: 'stale_revision',
    currentRevision: 4,
  })
  assert.deepEqual(revisionVerdict({ revision: 3 }, { title: 'new' }), {
    ok: false,
    reason: 'revision_required',
    currentRevision: 3,
  })
})

test('cohort discovery only matches the exact same university and year', () => {
  assert.equal(sameCohort({ university_id: 'ain-shams', year: 'year-2' }, { university_id: 'ain-shams', year: 'year-2' }), true)
  assert.equal(sameCohort({ university_id: 'ain-shams', year: 'year-2' }, { university_id: 'cairo', year: 'year-2' }), false)
  assert.equal(sameCohort({ university_id: 'ain-shams', year: 'year-2' }, { university_id: 'ain-shams', year: 'year-3' }), false)
  assert.equal(sameCohort({ university_id: null, year: 'year-2' }, { university_id: 'ain-shams', year: 'year-2' }), false)
})

test('share assets must be explicitly referenced by a managed-media field', () => {
  const payload = {
    imageDocumentId: 'note-image',
    board: { images: [{ documentId: 'board-image' }], files: [{ documentId: 'board-file' }] },
    prose: 'mentioning secret-file here must not expose it',
  }
  assert.equal(payloadReferencesDocument(payload, 'note-image'), true)
  assert.equal(payloadReferencesDocument(payload, 'board-image'), true)
  assert.equal(payloadReferencesDocument(payload, 'board-file'), true)
  assert.equal(payloadReferencesDocument(payload, 'secret-file'), false)
  assert.deepEqual(payloadDocumentIds(payload).sort(), ['board-file', 'board-image', 'note-image'])
  assert.equal(assetsWithinAllowlist(payloadDocumentIds(payload), new Set(['note-image', 'board-image', 'board-file'])), true)
  assert.equal(assetsWithinAllowlist([...payloadDocumentIds(payload), 'guessed-owner-file'], new Set(['note-image', 'board-image', 'board-file'])), false)
})
