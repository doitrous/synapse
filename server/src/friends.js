/**
 * The friend graph.
 *
 * Every read and write goes through `orderedPair`, so the table holds one row
 * per friendship and the primary key is what makes that true. Nothing here
 * takes a user id from a request body — the actor is always the verified
 * session, and the target is checked to be a real account.
 */
import { pool } from './db.js'
import { orderedPair, isSelf, canSendRequest, resolveResponse } from './friendship.js'

/** The row for a pair, in the shape the pure rules expect, or null. */
async function pairRow(a, b) {
  const { userA, userB } = orderedPair(a, b)
  const [rows] = await pool.query(
    'SELECT user_a, user_b, requested_by, status FROM friendships WHERE user_a = ? AND user_b = ?',
    [userA, userB],
  )
  if (!rows.length) return null
  return { userA: rows[0].user_a, userB: rows[0].user_b, requestedBy: rows[0].requested_by, status: rows[0].status }
}

async function accountExists(userId) {
  const [rows] = await pool.query('SELECT 1 FROM user_access WHERE user_id = ? LIMIT 1', [userId])
  return rows.length > 0
}

/**
 * A name to show a classmate, never the account's own email or its local-part
 * (`name` falls back to the email as a *placeholder* when nobody has set one —
 * see accounts.js `saveOwnEnrolment` — so it has to be checked against the
 * real email, not just truthiness, before it is trusted as a name).
 */
export function displayNameFrom({ name, email, username }) {
  if (name && name !== email) return String(name)
  return username || 'Student'
}

/** Name and cohort for a set of ids, for rendering a row. */
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

export async function sendRequest(userId, targetId) {
  if (!targetId || isSelf(userId, targetId)) return { ok: false, reason: 'invalid_target' }
  if (!(await accountExists(targetId))) return { ok: false, reason: 'invalid_target' }
  const existing = await pairRow(userId, targetId)
  const verdict = canSendRequest(existing)
  if (!verdict.ok) return { ok: false, reason: verdict.reason }
  const { userA, userB } = orderedPair(userId, targetId)
  // A re-request after a decline overwrites the old row rather than adding one.
  await pool.query(
    `INSERT INTO friendships (user_a, user_b, requested_by, status)
     VALUES (?, ?, ?, 'pending')
     ON DUPLICATE KEY UPDATE requested_by = VALUES(requested_by), status = 'pending', responded_at = NULL`,
    [userA, userB, userId],
  )
  return { ok: true }
}

export async function respondToRequest(userId, otherId, accept) {
  const row = await pairRow(userId, otherId)
  const outcome = resolveResponse(row, userId, accept)
  if (!outcome) return { ok: false, reason: 'not_pending' }
  const { userA, userB } = orderedPair(userId, otherId)
  await pool.query(
    'UPDATE friendships SET status = ?, responded_at = NOW() WHERE user_a = ? AND user_b = ?',
    [outcome.status, userA, userB],
  )
  return { ok: true, status: outcome.status }
}

export async function removeFriend(userId, otherId) {
  const { userA, userB } = orderedPair(userId, otherId)
  await pool.query('DELETE FROM friendships WHERE user_a = ? AND user_b = ?', [userA, userB])
  return { ok: true }
}

export async function myFriends(userId) {
  const [rows] = await pool.query(
    `SELECT user_a, user_b FROM friendships
      WHERE status = 'accepted' AND (user_a = ? OR user_b = ?)`,
    [userId, userId],
  )
  const ids = rows.map((row) => (row.user_a === userId ? row.user_b : row.user_a))
  const profiles = await profilesFor(ids)
  return ids.map((id) => profiles.get(id)).filter(Boolean)
}

export async function myRequests(userId) {
  const [rows] = await pool.query(
    `SELECT user_a, user_b, requested_by FROM friendships
      WHERE status = 'pending' AND (user_a = ? OR user_b = ?)`,
    [userId, userId],
  )
  const ids = rows.map((row) => (row.user_a === userId ? row.user_b : row.user_a))
  const profiles = await profilesFor(ids)
  const incoming = []
  const outgoing = []
  for (const row of rows) {
    const otherId = row.user_a === userId ? row.user_b : row.user_a
    const profile = profiles.get(otherId)
    if (!profile) continue
    if (row.requested_by === userId) outgoing.push(profile)
    else incoming.push(profile)
  }
  return { incoming, outgoing }
}

/**
 * Students this one is allowed to find.
 *
 * Bounded to the caller's own university and year, read from their own row
 * rather than from anything the client sent — a client that asks for another
 * cohort is not refused so much as never consulted. Existing friends and
 * anyone with a request already in flight are left out, because the only
 * action offered on a result is "add".
 */
export async function directorySearch(userId, query) {
  const [me] = await pool.query('SELECT university_id, year, discoverable FROM students WHERE user_id = ? LIMIT 1', [userId])
  const cohort = me[0]
  if (!cohort?.university_id || !cohort?.year || !Number(cohort.discoverable)) return []
  const term = `%${String(query ?? '').trim().slice(0, 60)}%`
  const [rows] = await pool.query(
    // The LIKE still matches against name-or-email — a search box that only
    // works once a display name exists would be a worse search, and matching
    // is not the same as displaying. `sortKey` keeps that same ordering.
    `SELECT s.user_id, s.name, s.email, s.username, s.university_id, s.year, s.status_message,
            COALESCE(s.name, s.email) AS sortKey
       FROM students s
      WHERE s.university_id = ? AND s.year = ?
        AND s.discoverable = 1
        AND s.user_id IS NOT NULL
        AND s.user_id <> ?
        AND COALESCE(s.name, s.email) LIKE ?
        AND NOT EXISTS (
          SELECT 1 FROM friendships f
           WHERE (f.user_a = LEAST(s.user_id, ?) AND f.user_b = GREATEST(s.user_id, ?))
             AND f.status IN ('pending','accepted')
        )
        -- Mutual invisibility: a block hides the blocker from the blocked and
        -- the blocked from the blocker, whichever way the row was written.
        AND NOT EXISTS (
          SELECT 1 FROM blocks b WHERE b.blocker_id = s.user_id AND b.blocked_id = ?
        )
        AND NOT EXISTS (
          SELECT 1 FROM blocks b WHERE b.blocker_id = ? AND b.blocked_id = s.user_id
        )
      ORDER BY sortKey LIMIT 20`,
    [cohort.university_id, cohort.year, userId, term, userId, userId, userId, userId],
  )
  return rows.map((row) => ({
    userId: row.user_id,
    displayName: displayNameFrom(row),
    universityId: row.university_id ?? null,
    year: row.year ?? null,
    statusMessage: row.status_message ?? null,
  }))
}
