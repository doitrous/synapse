import test from 'node:test'
import assert from 'node:assert/strict'
import {
  authoriseReportChange, reporterRoleLabel, buildContentReport,
  buildTombstone, deletionConfirmed,
} from './contentReports.js'

const base = {
  id: 'report-1', contentKind: 'question', contentId: 'q3', contentTitle: 'Aortic stenosis',
  reporterRole: 'Student', reporterName: 'Maya', reporterUserId: 'u1', category: 'Unclear wording',
  note: 'ambiguous', status: 'Open', createdAt: '2026-08-01T00:00:00.000Z',
  events: [{ at: '2026-08-01T00:00:00.000Z', actorId: 'u1', actorName: 'Maya', actorRole: 'Student', action: 'created' }],
}
const withEvent = (report, event) => ({ ...report, events: [...(report.events ?? []), event] })

test('creating a report needs console access; a student cannot create on this path', () => {
  const after = { ...base }
  assert.equal(authoriseReportChange({ before: null, after, role: 'reviewer' }).ok, true)
  assert.equal(authoriseReportChange({ before: null, after, role: 'editor' }).ok, true)
  assert.equal(authoriseReportChange({ before: null, after, role: 'student' }).ok, false)
})

test('removal on the shared write path is refused for everyone, super admin included', () => {
  for (const role of ['reviewer', 'admin', 'editor', 'super_admin']) {
    assert.equal(authoriseReportChange({ before: base, after: null, role }).ok, false)
  }
})

test('a reviewer may add a note but may not resolve, dismiss or put in review', () => {
  const noted = withEvent({ ...base }, { at: 't', actorId: 'r1', actorName: 'Rev', actorRole: 'Reviewer', action: 'note', note: 'still wrong' })
  assert.equal(authoriseReportChange({ before: base, after: noted, role: 'reviewer' }).ok, true)

  for (const status of ['In review', 'Resolved', 'Dismissed']) {
    const decided = withEvent({ ...base, status }, { at: 't', actorId: 'r1', actorName: 'Rev', actorRole: 'Reviewer', action: 'resolved' })
    assert.equal(authoriseReportChange({ before: base, after: decided, role: 'reviewer' }).ok, false, status)
    assert.equal(authoriseReportChange({ before: base, after: decided, role: 'admin' }).ok, false, `admin ${status}`)
  }
})

test('an editor may resolve and dismiss but may not archive or unarchive', () => {
  const resolved = withEvent({ ...base, status: 'Resolved', reviewedBy: 'Ed' }, { at: 't', actorId: 'e1', actorName: 'Ed', actorRole: 'Editor', action: 'resolved' })
  assert.equal(authoriseReportChange({ before: base, after: resolved, role: 'editor' }).ok, true)

  const archived = withEvent({ ...base, status: 'Archived' }, { at: 't', actorId: 'e1', actorName: 'Ed', actorRole: 'Editor', action: 'archived' })
  assert.equal(authoriseReportChange({ before: base, after: archived, role: 'editor' }).ok, false)
  assert.equal(authoriseReportChange({ before: base, after: archived, role: 'super_admin' }).ok, true)

  const archivedBase = { ...base, status: 'Archived' }
  const reopened = withEvent({ ...archivedBase, status: 'Open' }, { at: 't', actorId: 'e1', actorName: 'Ed', actorRole: 'Editor', action: 'unarchived' })
  assert.equal(authoriseReportChange({ before: archivedBase, after: reopened, role: 'editor' }).ok, false)
  assert.equal(authoriseReportChange({ before: archivedBase, after: reopened, role: 'super_admin' }).ok, true)
})

test('a report identity and provenance cannot be edited after it is filed', () => {
  for (const field of ['reporterUserId', 'reporterRole', 'contentId', 'createdAt', 'snapshot', 'anchor']) {
    const tampered = withEvent({ ...base, [field]: 'HACKED' }, { at: 't', actorId: 'e1', actorName: 'Ed', actorRole: 'Editor', action: 'note' })
    assert.equal(authoriseReportChange({ before: base, after: tampered, role: 'super_admin' }).ok, false, field)
  }
})

test('the audit trail can only grow, and prior events cannot be rewritten', () => {
  const shortened = { ...base, status: 'Open', events: [] }
  assert.equal(authoriseReportChange({ before: base, after: shortened, role: 'super_admin' }).ok, false)

  const rewritten = { ...base, events: [{ ...base.events[0], actorName: 'Someone Else' }] }
  assert.equal(authoriseReportChange({ before: base, after: rewritten, role: 'super_admin' }).ok, false)
})

test('reporterRoleLabel maps every role, defaulting to Student', () => {
  assert.equal(reporterRoleLabel('reviewer'), 'Reviewer')
  assert.equal(reporterRoleLabel('super_admin'), 'Superadmin')
  assert.equal(reporterRoleLabel('nonsense'), 'Student')
})

test('buildContentReport stamps the server fields and a created event', () => {
  const report = buildContentReport(
    { contentKind: 'image', contentId: 'q9', contentTitle: 'X-ray', note: '  blank  ', category: 'Image does not load' },
    { id: 'report-x', reporterUserId: 'u2', reporterRole: 'Reviewer', reporterName: 'Rev', createdAt: '2026-08-10T00:00:00.000Z' },
  )
  assert.equal(report.id, 'report-x')
  assert.equal(report.reporterUserId, 'u2')
  assert.equal(report.reporterRole, 'Reviewer')
  assert.equal(report.status, 'Open')
  assert.equal(report.note, 'blank')
  assert.equal(report.events.length, 1)
  assert.equal(report.events[0].action, 'created')
})

test('deletion confirmation matches the id or the exact title, and rejects blanks', () => {
  assert.equal(deletionConfirmed(base, 'report-1'), true)
  assert.equal(deletionConfirmed(base, 'Aortic stenosis'), true)
  assert.equal(deletionConfirmed(base, '  Aortic stenosis  '), true)
  assert.equal(deletionConfirmed(base, 'wrong'), false)
  assert.equal(deletionConfirmed(base, ''), false)
  assert.equal(deletionConfirmed(base, null), false)
})

test('buildTombstone captures who and what, without the report body', () => {
  const tomb = buildTombstone(base, { deletedBy: 's1', deletedByName: 'Root', deletedAt: '2026-08-11T00:00:00.000Z', reason: 'spam' })
  assert.equal(tomb.reportId, 'report-1')
  assert.equal(tomb.contentTitle, 'Aortic stenosis')
  assert.equal(tomb.deletedBy, 's1')
  assert.equal(tomb.reason, 'spam')
  assert.equal('note' in tomb, false)
})
