/**
 * Blocking, as its own directional table.
 *
 * Unlike `friendships`, a block is not symmetric to store — only to enforce.
 * `areBlocked` is the one function everything else (directory search, private
 * chat) actually cares about, and it is true whichever direction the row is in.
 */
import { pool } from './db.js'
import { orderedPair } from './friendship.js'
import { displayNameFrom } from './friends.js'

/** Name and cohort for a set of ids, for rendering a blocked row. Mirrors `profilesFor` in friends.js. */
async function profilesFor(ids) {
  if (!ids.length) return new Map()
  const [rows] = await pool.query(
    `SELECT a.user_id, s.name, a.email, s.username, s.university_id, s.year, s.status_message
       FROM user_access a LEFT JOIN students s ON s.user_id = a.user_id
      WHERE a.user_id IN (?)`,
    [ids],
  )
  const byId = new Map()
  for (const row of rows) {
    byId.set(row.user_id, {
      userId: row.user_id,
      displayName: displayNameFrom(row),
      universityId: row.university_id ?? null,
      year: row.year ?? null,
      statusMessage: row.status_message ?? null,
    })
  }
  return byId
}

/**
 * Block `targetId`. Also removes any friendship between the two — a block is
 * a stronger relationship than "not friends", so it must win over whatever
 * that row said, pending request or standing friendship alike.
 */
export async function blockUser(userId, targetId) {
  if (!targetId || targetId === userId) return { ok: false, reason: 'invalid_target' }
  await pool.query('INSERT IGNORE INTO blocks (blocker_id, blocked_id) VALUES (?, ?)', [userId, targetId])
  const { userA, userB } = orderedPair(userId, targetId)
  await pool.query('DELETE FROM friendships WHERE user_a = ? AND user_b = ?', [userA, userB])
  return { ok: true }
}

export async function unblockUser(userId, targetId) {
  await pool.query('DELETE FROM blocks WHERE blocker_id = ? AND blocked_id = ?', [userId, targetId])
  return { ok: true }
}

/** Profiles of everyone this user has blocked. */
export async function blockedList(userId) {
  const [rows] = await pool.query('SELECT blocked_id FROM blocks WHERE blocker_id = ?', [userId])
  const ids = rows.map((row) => row.blocked_id)
  const profiles = await profilesFor(ids)
  return ids.map((id) => profiles.get(id)).filter(Boolean)
}

/** True if either has blocked the other — the only question private chat and the directory ask. */
export async function areBlocked(a, b) {
  const [rows] = await pool.query(
    'SELECT 1 FROM blocks WHERE (blocker_id = ? AND blocked_id = ?) OR (blocker_id = ? AND blocked_id = ?) LIMIT 1',
    [a, b, b, a],
  )
  return rows.length > 0
}
