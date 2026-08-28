import { randomBytes } from 'node:crypto'
import { pool } from './db.js'
import { sendRequest } from './friends.js'

/** Long enough that guessing one is not a strategy. */
const TOKEN_BYTES = 16
const VALID_DAYS = 14

/**
 * Why an invite can or cannot be used.
 *
 * Separated from the database so every refusal is testable, and so a missing
 * row and a spent row give the same answer — whether a token ever existed is
 * not something a stranger should be able to probe.
 */
export function inviteState(row, now, viewerId) {
  if (!row || row.usedBy) return 'used'
  if (row.userId === viewerId) return 'self'
  if (new Date(row.expiresAt).getTime() <= new Date(now).getTime()) return 'expired'
  return 'ok'
}

export async function mintInvite(userId) {
  const token = randomBytes(TOKEN_BYTES).toString('hex')
  await pool.query(
    'INSERT INTO friend_invites (token, user_id, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? DAY))',
    [token, userId, VALID_DAYS],
  )
  return { token }
}

export async function redeemInvite(userId, token) {
  if (!token) return { ok: false, reason: 'used' }
  const [rows] = await pool.query(
    'SELECT user_id, expires_at, used_by FROM friend_invites WHERE token = ? LIMIT 1',
    [String(token)],
  )
  const row = rows.length ? { userId: rows[0].user_id, expiresAt: rows[0].expires_at, usedBy: rows[0].used_by } : null
  const state = inviteState(row, new Date(), userId)
  if (state !== 'ok') return { ok: false, reason: state }
  const sent = await sendRequest(userId, row.userId)
  // Marked used even when the request is refused as already-pending: the link
  // did its job, and leaving it live would let it be replayed.
  await pool.query('UPDATE friend_invites SET used_by = ? WHERE token = ? AND used_by IS NULL', [userId, String(token)])
  return sent.ok ? { ok: true, userId: row.userId } : sent
}
