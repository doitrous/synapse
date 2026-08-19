/**
 * Notes and whiteboards published behind a link.
 *
 * The rules live here so they can be reasoned about in one place, because they
 * are the only thing standing between "a student shared a note with their
 * study group" and "a student's private notebook is on the open web".
 *
 * Three states, and the server decides all three:
 *
 *   private — only the owner may read it. A link that has been revoked back to
 *             private answers 404 to everybody else, so a link that has already
 *             been passed around stops working rather than staying live.
 *   view    — anybody holding the link may read it, signed in or not. Classmates
 *             should not have to have an account to read a revision sheet.
 *   edit    — anybody holding the link *who is signed in* may also write to it.
 *             Editing is attributed (`updated_by`), which anonymous editing
 *             could not be.
 *
 * Nothing here reads or writes `user_state`. A share is a copy taken at the
 * moment it was published: the student's own document is unaffected by anything
 * that happens to the share, and a collaborator's edit cannot reach back into a
 * private notebook.
 */
import { randomBytes } from 'node:crypto'
import { pool } from './db.js'
import {
  SHARE_ACCESS, SHARE_KINDS, mayChangeAccess, mayRead, mayWrite, readPayload, readTitle, viewerRights,
} from './sharePolicy.js'

/** Big enough that guessing one is not a strategy. */
export function newShareId() {
  return randomBytes(18).toString('base64url')
}

function shape(row, viewerId) {
  let payload = null
  try { payload = JSON.parse(row.payload) } catch { payload = null }
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    access: row.access,
    payload,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
    // Says what this viewer may actually do, so a client never has to work the
    // permission out for itself and never has to be believed about it.
    ...viewerRights(row, viewerId),
  }
}

export async function createShare(ownerId, { kind, title, access, payload }) {
  if (!SHARE_KINDS.has(kind)) return { error: 'unknown_kind' }
  const wanted = SHARE_ACCESS.has(access) ? access : 'view'
  const body = readPayload(payload)
  if (body.error) return { error: body.error }

  const id = newShareId()
  await pool.query(
    'INSERT INTO shared_documents (id, owner_id, kind, title, access, payload, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, ownerId, kind, readTitle(title), wanted, body.serialised, ownerId],
  )
  return { ok: true, id, access: wanted }
}

/**
 * Read a share, if this viewer is allowed to.
 *
 * `not_found` rather than `forbidden` for a private share held by somebody
 * else: whether a given token exists is itself worth not disclosing.
 */
export async function readShare(id, viewerId) {
  const [rows] = await pool.query('SELECT * FROM shared_documents WHERE id = ? LIMIT 1', [String(id ?? '')])
  if (!rows.length) return { error: 'not_found' }
  const row = rows[0]
  if (!mayRead(row, viewerId)) return { error: 'not_found' }
  return { ok: true, share: shape(row, viewerId) }
}

/**
 * Change a share.
 *
 * The owner may change anything, including the access level. Somebody holding
 * an editable link may change the title and the contents, and deliberately not
 * the access: handing out a link should never hand out the ability to widen it.
 */
export async function updateShare(id, viewerId, { title, access, payload }) {
  if (!viewerId) return { error: 'unauthorized' }
  const [rows] = await pool.query('SELECT * FROM shared_documents WHERE id = ? LIMIT 1', [String(id ?? '')])
  if (!rows.length) return { error: 'not_found' }
  const row = rows[0]
  if (!mayWrite(row, viewerId)) return { error: 'not_found' }

  const sets = []
  const params = []
  if (title !== undefined) { sets.push('title = ?'); params.push(readTitle(title)) }
  if (payload !== undefined) {
    const body = readPayload(payload)
    if (body.error) return { error: body.error }
    sets.push('payload = ?')
    params.push(body.serialised)
  }
  if (access !== undefined) {
    if (!mayChangeAccess(row, viewerId)) return { error: 'only_the_owner_may_change_access' }
    if (!SHARE_ACCESS.has(access)) return { error: 'unknown_access' }
    sets.push('access = ?')
    params.push(access)
  }
  if (!sets.length) return { error: 'nothing_to_change' }

  sets.push('updated_by = ?')
  params.push(viewerId, row.id)
  await pool.query(`UPDATE shared_documents SET ${sets.join(', ')} WHERE id = ?`, params)
  return await readShare(row.id, viewerId)
}

export async function deleteShare(id, viewerId) {
  const [result] = await pool.query('DELETE FROM shared_documents WHERE id = ? AND owner_id = ?', [String(id ?? ''), viewerId])
  return result.affectedRows ? { ok: true } : { error: 'not_found' }
}

/** Everything this account has published, newest first. Payloads left out. */
export async function listShares(ownerId) {
  const [rows] = await pool.query(
    `SELECT id, kind, title, access, created_at AS createdAt, updated_at AS updatedAt
       FROM shared_documents WHERE owner_id = ? ORDER BY updated_at DESC LIMIT 200`,
    [ownerId],
  )
  return rows
}
