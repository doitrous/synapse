/**
 * Deleting an account, at the student's own request.
 *
 * App Store guideline 5.1.1(v) requires that an app which creates accounts lets
 * a person delete one from inside the app — and that it actually deletes,
 * rather than deactivating and keeping everything.
 *
 * So this is a real deletion with no grace period and no soft-delete flag. It
 * is worth being plain about the consequence: a student who does this loses
 * their notes, their annotations, their whiteboards and their whole answer
 * history, and none of it can be recovered by support afterwards. The interface
 * says exactly that before it calls this, because the promise made here is the
 * one thing a mistake cannot be walked back.
 *
 * Order is the whole safety story. Owned rows go first inside one transaction,
 * so a failure part-way leaves the account intact and re-runnable rather than
 * half-erased. The auth user goes last, because deleting it first would leave
 * an authenticated caller unable to prove who they were if a later step failed.
 */

import { pool } from './db.js'

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, '')
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

/**
 * Every table holding something a student owns, keyed by how it names them.
 *
 * Written out rather than discovered at runtime. A schema scan would quietly
 * start deleting from any new table with a `user_id` column, including one
 * added for something that must outlive the account — and the failure mode of
 * being wrong here is silent, permanent, and only noticed by the person it
 * happened to.
 */
export const OWNED_BY_USER_ID = [
  'user_state',
  'user_state_versions',
  'user_documents',
  'device_tokens',
  'assistant_usage',
  'voucher_redemptions',
  'study_room_members',
  'study_room_answers',
  'friend_invites',
  'challenge_answers',
  'facebook_links',
  'study_party_members',
  'study_party_answers',
  'study_party_game_participants',
  'study_party_game_answers',
  'enrollment_change_requests',
  'qbank_attempts',
  'qotd_answers',
  'maristana_study_minutes',
  'maristana_hospitals',
  'shared_document_stars',
  'shared_document_follows',
  'shared_document_notifications',
  'role_promotion_audit',
  // Last of the user_id tables by convention only: nothing here has a foreign
  // key, so the order inside the transaction does not matter. What matters is
  // that it is on the list, where the coverage test can see it.
  'user_access',
]

export const OWNED_BY_OWNER_ID = ['shared_documents']
export const OWNED_BY_STUDENT_ID = ['subscriptions']

// Collaboration history owned by somebody else may outlive this account, but
// it must no longer identify the deleted person. Nullable attribution becomes
// NULL. Required server-authoritative history uses one non-identifying marker.
export const DELETED_IDENTITY = 'deleted-account'
export const ANONYMISE_USER_REFERENCES = [
  { table: 'shared_documents', column: 'updated_by', replacement: null },
  { table: 'shared_document_revisions', column: 'actor_id', replacement: null },
  { table: 'shared_document_events', column: 'actor_id', replacement: null },
  { table: 'shared_document_notifications', column: 'actor_id', replacement: null },
  { table: 'study_party_games', column: 'host_user_id', replacement: DELETED_IDENTITY },
  { table: 'study_party_games', column: 'created_by', replacement: DELETED_IDENTITY },
  { table: 'study_party_game_events', column: 'actor_id', replacement: DELETED_IDENTITY },
]

/**
 * Kept deliberately, and each for a reason that is not convenience.
 *
 * `account_action_audit` records what administrators did to an account —
 * suspensions, plan grants, the deletion itself. Erasing it would destroy the
 * record of actions taken by *other* people, which is not the deleting
 * student's to erase.
 *
 * `attachments` is keyed by email and holds files a student sent to support.
 * Those belong to the conversation they were part of.
 */
export const DELIBERATELY_KEPT = ['account_action_audit', 'attachments']

/** Delete the Supabase auth user. Without this the login still works. */
async function deleteAuthUser(userId, fetchImpl = fetch) {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return { ok: false, reason: 'supabase_not_configured' }
  let response
  try {
    response = await fetchImpl(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      method: 'DELETE',
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
    })
  } catch (cause) {
    return { ok: false, reason: 'unreachable', detail: String(cause?.message ?? cause).slice(0, 200) }
  }
  // 404 means it is already gone, which is the state we wanted.
  if (response.status === 404) return { ok: true, alreadyGone: true }
  if (!response.ok) return { ok: false, reason: 'rejected', status: response.status }
  return { ok: true }
}

/**
 * Erase one account and everything it owns.
 *
 * Returns what was removed rather than a bare ok, so the caller can log a count
 * and a support request months later can be answered with something better than
 * "it should have worked".
 */
export async function deleteAccount(identity, { fetchImpl = fetch } = {}) {
  const userId = identity?.id
  if (!userId) return { error: 'no_identity', status: 401 }

  const removed = {}
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    for (const policy of ANONYMISE_USER_REFERENCES) {
      const [result] = await conn.query(
        `UPDATE ${policy.table} SET ${policy.column} = ? WHERE ${policy.column} = ?`,
        [policy.replacement, userId],
      )
      if (result.affectedRows) removed[`${policy.table}.${policy.column}`] = result.affectedRows
    }

    for (const table of OWNED_BY_USER_ID) {
      const [result] = await conn.query(`DELETE FROM ${table} WHERE user_id = ?`, [userId])
      if (result.affectedRows) removed[table] = result.affectedRows
    }
    for (const table of OWNED_BY_OWNER_ID) {
      const [result] = await conn.query(`DELETE FROM ${table} WHERE owner_id = ?`, [userId])
      if (result.affectedRows) removed[table] = result.affectedRows
    }

    // The student row is found by user_id through user_access, or by the email
    // on the identity. Both are tried: an account created before user_access
    // existed has only the second.
    const [students] = await conn.query(
      `SELECT s.id FROM students s
        WHERE s.id = ? OR (? IS NOT NULL AND s.email = ?)`,
      [userId, identity.email ?? null, identity.email ?? null],
    )
    for (const { id } of students) {
      for (const table of OWNED_BY_STUDENT_ID) {
        const [result] = await conn.query(`DELETE FROM ${table} WHERE student_id = ?`, [id])
        if (result.affectedRows) removed[table] = (removed[table] ?? 0) + result.affectedRows
      }
      const [result] = await conn.query('DELETE FROM students WHERE id = ?', [id])
      if (result.affectedRows) removed.students = (removed.students ?? 0) + result.affectedRows
    }

    await conn.commit()
  } catch (cause) {
    await conn.rollback()
    // Nothing was deleted, so the account is exactly as it was and the student
    // can try again. That is the only reason this is one transaction.
    return { error: 'database', status: 500, detail: String(cause?.message ?? cause).slice(0, 200) }
  } finally {
    conn.release()
  }

  // Last, and outside the transaction because it is not ours to roll back.
  const auth = await deleteAuthUser(userId, fetchImpl)
  if (!auth.ok) {
    // The data is gone and the login is not. Say so precisely rather than
    // reporting success: this is the one outcome that needs a human.
    return {
      error: 'auth_user_remains',
      status: 502,
      removed,
      detail: auth.reason,
    }
  }

  return { ok: true, removed }
}
