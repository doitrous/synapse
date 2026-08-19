import { pool } from './db.js'

/**
 * Which of a student's Facebook friends are here.
 *
 * `user_friends` only ever returns friends who have also signed into this app
 * and granted the same permission, so this intersection is the whole of the
 * matching — there is nothing to look up at Facebook beyond the list it gives.
 */
export function matchFriends(fbFriendIds, linkedRows) {
  const wanted = new Set(fbFriendIds ?? [])
  return (linkedRows ?? []).filter((row) => wanted.has(row.fbUserId)).map((row) => row.userId)
}

export async function linkAccount(userId, fbUserId) {
  if (!fbUserId) return { ok: false, reason: 'invalid_target' }
  await pool.query(
    `INSERT INTO facebook_links (user_id, fb_user_id) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE fb_user_id = VALUES(fb_user_id), unlinked_at = NULL`,
    [userId, String(fbUserId)],
  )
  return { ok: true }
}

export async function unlinkAccount(userId) {
  await pool.query('DELETE FROM facebook_links WHERE user_id = ?', [userId])
  return { ok: true }
}

/**
 * Meta's data-deletion callback.
 *
 * Required for App Review, and built with the link rather than after it: an
 * integration that can be connected but not disconnected is not one we should
 * ship.
 */
export async function deletionCallback(fbUserId) {
  await pool.query('DELETE FROM facebook_links WHERE fb_user_id = ?', [String(fbUserId)])
  return { ok: true }
}
