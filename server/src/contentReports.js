/**
 * Content reports, as the server understands them.
 *
 * A report is raised by anyone — a student who hit a wrong answer, a reviewer
 * who found a broken image — and worked by the people who can fix it. Who may do
 * what to a report is not a property of holding the Content Reports tab; it is a
 * property of rank, and this module is where that ladder lives:
 *
 *   - create / add a follow-up note   → anyone with console access (reviewer+)
 *   - resolve, dismiss, put in review → editor and above
 *   - archive / unarchive             → super admin only
 *   - permanently delete              → super admin only, and never on the
 *                                        shared-document write path — only the
 *                                        dedicated delete endpoint, which writes
 *                                        a tombstone.
 *
 * `stateMerge.js` calls `authoriseReportChange` for every changed report, so the
 * reports document merges item-by-item like the ledger does and two people
 * working different reports never overwrite each other. The identity fields a
 * reporter is stamped with are set once and can never be edited afterward, and
 * the audit trail can only grow — a resolved report can be reopened, but the
 * record of who resolved it cannot be rewritten.
 */

import { rank } from './roles.js'

export const CONTENT_REPORTS_STATE_KEY = 'nishany-content-reports-v1'
export const CONTENT_REPORT_TOMBSTONES_KEY = 'nishany-content-report-tombstones-v1'

export const REPORT_STATUSES = ['Open', 'In review', 'Resolved', 'Dismissed', 'Archived']

/** The reporter/actor label stamped from an effective role. */
export function reporterRoleLabel(role) {
  return ({
    student: 'Student',
    reviewer: 'Reviewer',
    admin: 'Admin',
    editor: 'Editor',
    super_admin: 'Superadmin',
  })[role] ?? 'Student'
}

/**
 * Fields fixed at creation. Attribution and provenance are evidence; a later
 * editor may resolve a report but may not change who raised it, what it points
 * at, or the snapshot taken when it was raised.
 */
const IMMUTABLE_FIELDS = [
  'id', 'contentKind', 'contentId', 'reporterRole', 'reporterName',
  'reporterUserId', 'category', 'createdAt', 'snapshot', 'field', 'anchor',
]

function stable(value) {
  return JSON.stringify(value ?? null)
}

/**
 * Whether an actor of `role` may turn `before` into `after` for one report.
 *
 * Returns `{ ok }` or `{ ok:false, reason }`. Deletion is never allowed here —
 * removing a report is a super-admin action on its own endpoint, so that it can
 * demand typed confirmation and leave a tombstone. A change that arrives on the
 * shared-document path asking to drop a report is refused, not silently applied.
 */
export function authoriseReportChange({ before, after, role }) {
  const rankValue = rank(role)

  // Removal on the shared write path is refused for everyone. The delete
  // endpoint is the only way a report leaves the record, and it tombstones.
  if (before && !after) {
    return { ok: false, reason: 'a report is removed only by a super admin through the delete action' }
  }

  // Creation. Console access is the floor; students file through the create
  // endpoint, which stamps the identity itself rather than trusting the caller.
  if (!before && after) {
    if (rankValue < 1) return { ok: false, reason: 'creating a report needs console access' }
    return { ok: true }
  }

  // Update. Nothing about who raised it or what it points at may change.
  for (const field of IMMUTABLE_FIELDS) {
    if (stable(before[field]) !== stable(after[field])) {
      return { ok: false, reason: `a report's ${field} cannot be changed after it is filed` }
    }
  }

  // The audit trail is append-only: it may grow, and every event already on it
  // must survive byte-for-byte.
  const beforeEvents = Array.isArray(before.events) ? before.events : []
  const afterEvents = Array.isArray(after.events) ? after.events : []
  if (afterEvents.length < beforeEvents.length) {
    return { ok: false, reason: "a report's history cannot be shortened" }
  }
  for (let i = 0; i < beforeEvents.length; i += 1) {
    if (stable(beforeEvents[i]) !== stable(afterEvents[i])) {
      return { ok: false, reason: "a report's history cannot be rewritten" }
    }
  }

  // A status change is a decision, and decisions are ranked.
  if (before.status !== after.status) {
    const touchesArchive = after.status === 'Archived' || before.status === 'Archived'
    if (touchesArchive) {
      if (role !== 'super_admin') {
        return { ok: false, reason: 'only a super admin may archive or unarchive a report' }
      }
      return { ok: true }
    }
    if (rankValue < 2) {
      return { ok: false, reason: 'only an editor or super admin may review, resolve or dismiss a report' }
    }
    return { ok: true }
  }

  // No status change: a follow-up note or metadata touch. A reviewer may add
  // context to a report they cannot decide.
  if (rankValue < 1) return { ok: false, reason: 'adding to a report needs console access' }
  return { ok: true }
}

/**
 * A fresh report, with every server-authoritative field stamped here rather than
 * taken from the caller. The caller supplies only what it is describing.
 */
export function buildContentReport(input, { id, reporterUserId, reporterRole, reporterName, createdAt }) {
  const clean = (value) => (typeof value === 'string' ? value.trim() : '')
  return {
    id,
    contentKind: clean(input?.contentKind) || 'question',
    contentId: clean(input?.contentId),
    contentTitle: clean(input?.contentTitle),
    field: clean(input?.field) || undefined,
    anchor: clean(input?.anchor) || undefined,
    snapshot: typeof input?.snapshot === 'string' ? input.snapshot.slice(0, 20_000) : undefined,
    category: clean(input?.category) || 'Other',
    note: clean(input?.note),
    reporterRole,
    reporterName,
    reporterUserId: reporterUserId ?? null,
    status: 'Open',
    createdAt,
    events: [{ at: createdAt, actorId: reporterUserId ?? null, actorName: reporterName, actorRole: reporterRole, action: 'created', note: clean(input?.note) || undefined }],
  }
}

/** A durable record that a report once existed, written when one is deleted. */
export function buildTombstone(report, { deletedBy, deletedByName, deletedAt, reason }) {
  return {
    reportId: report?.id ?? null,
    contentKind: report?.contentKind ?? null,
    contentId: report?.contentId ?? null,
    contentTitle: report?.contentTitle ?? null,
    reporterUserId: report?.reporterUserId ?? null,
    createdAt: report?.createdAt ?? null,
    deletedBy: deletedBy ?? null,
    deletedByName: deletedByName ?? null,
    deletedAt,
    reason: typeof reason === 'string' && reason.trim() ? reason.trim() : undefined,
  }
}

/** Whether typed confirmation matches — the id, or the exact title. */
export function deletionConfirmed(report, confirmation) {
  const typed = String(confirmation ?? '').trim()
  if (!typed) return false
  return typed === String(report?.id ?? '').trim()
    || typed === String(report?.contentTitle ?? '').trim()
}
