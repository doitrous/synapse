/**
 * Who may read and who may write a shared note or board.
 *
 * Kept apart from `shares.js` because none of it touches the database — the
 * same split `identity.js` makes. These are the rules that stand between "I
 * shared this with my study group" and "this is on the open web", and rules
 * that need a MariaDB driver loaded to be tested do not get tested.
 */

export const SHARE_KINDS = new Set(['note', 'whiteboard'])
export const SHARE_ACCESS = new Set(['private', 'view', 'edit'])

/** A shared document is a whole board or a whole note; this is the ceiling. */
export const MAX_PAYLOAD_BYTES = 4 * 1024 * 1024

export function readTitle(raw) {
  const title = String(raw ?? '').trim().replace(/[\r\n\t]/g, ' ').slice(0, 200)
  return title || 'Untitled'
}

/**
 * What may be stored, or a reason it may not.
 *
 * Serialised here rather than taken as a string, so a client cannot store
 * something that is not JSON and make every later read of it throw.
 */
export function readPayload(value) {
  let serialised
  try { serialised = JSON.stringify(value ?? null) } catch { return { error: 'payload_not_serialisable' } }
  if (serialised === 'null') return { error: 'payload_required' }
  if (Buffer.byteLength(serialised, 'utf8') > MAX_PAYLOAD_BYTES) return { error: 'payload_too_large' }
  return { serialised }
}

/**
 * Whether this viewer may see it at all.
 *
 * A private share is invisible to everybody but its owner, which is what makes
 * revoking work: a link that has already been passed around stops opening
 * rather than merely stopping being advertised.
 */
export function mayRead(row, viewerId) {
  if (!row) return false
  if (row.owner_id === viewerId) return true
  return row.access !== 'private'
}

/**
 * Whether this viewer may change the contents.
 *
 * Signed out is never enough, whatever the link allows: an edit is recorded
 * against whoever made it, and an unattributable edit is not one anybody can
 * later account for.
 */
export function mayWrite(row, viewerId) {
  if (!row || !viewerId) return false
  if (row.owner_id === viewerId) return true
  return row.access === 'edit'
}

/**
 * Whether this viewer may widen or narrow the link.
 *
 * Only the owner. Handing somebody an editable link must never hand them the
 * ability to make it public, or to lock its owner out of it.
 */
export function mayChangeAccess(row, viewerId) {
  return Boolean(row && viewerId) && row.owner_id === viewerId
}

/** What to tell a client this viewer may do, so it never has to work it out. */
export function viewerRights(row, viewerId) {
  return { isOwner: Boolean(viewerId) && row.owner_id === viewerId, canEdit: mayWrite(row, viewerId) }
}
