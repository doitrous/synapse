/**
 * Account administration: the merged view of a user, and the actions an admin
 * can take on one.
 *
 * A "user" here is two records that were never joined. `user_access` is the
 * sign-in identity mirrored from Supabase — it knows the role and whether the
 * account is suspended, and nothing about the person. `students` is the profile
 * and performance record — it knows the name, university and accuracy, and
 * nothing about whether they can log in. Neither is complete on its own, and an
 * admin needs both on one screen, so this module reads them together and keys
 * the join on `students.user_id` rather than on a matching email.
 *
 * Passwords are deliberately absent. Authentication is Supabase, so no password
 * hash exists in this database and none can be reset here. What an admin can do
 * is ask Supabase to issue a recovery link, which needs a service-role key. When
 * that key is not configured the endpoint says so plainly and changes nothing —
 * a button that silently fails is worse than one that explains itself.
 */
import { randomUUID } from 'node:crypto'
import { pool } from './db.js'
import { hasConsoleAccess } from './roles.js'
import { normaliseEmail, normalisePhone } from './identity.js'

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, '')
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

/** Reasons are required on every action, so an audit row is never bare. */
export function readReason(body) {
  const reason = String(body?.reason ?? '').trim()
  return reason.length >= 8 ? reason : null
}

/**
 * Whether a subscription row currently grants access.
 *
 * Derived rather than stored. A row written as `active` with a past `expires_at`
 * is expired, and computing that at read time means no scheduled job stands
 * between reality and what the screen says.
 */
export function entitlementOf(row, now = new Date()) {
  if (!row) return { state: 'none', plan: 'Free', expiresAt: null, daysLeft: null }
  if (row.status === 'cancelled') {
    return { state: 'cancelled', plan: row.plan, expiresAt: row.expires_at, daysLeft: null }
  }
  if (row.expires_at && new Date(row.expires_at) <= now) {
    return { state: 'expired', plan: row.plan, expiresAt: row.expires_at, daysLeft: 0 }
  }
  const daysLeft = row.expires_at
    ? Math.max(0, Math.ceil((new Date(row.expires_at) - now) / 86_400_000))
    : null
  return { state: row.status === 'trialing' ? 'trialing' : 'active', plan: row.plan, expiresAt: row.expires_at, daysLeft }
}

/**
 * Where an extension starts from.
 *
 * Extending a live subscription adds to the time remaining rather than
 * restarting it, so an admin granting 30 days to someone with 10 left gives 40
 * and not 30. Extending a lapsed one starts from today, because the days between
 * expiry and now were not paid for and should not be credited.
 */
export function extensionBase(current, now = new Date()) {
  if (!current?.expires_at) return now
  const expiry = new Date(current.expires_at)
  return expiry > now ? expiry : now
}

export function addDays(from, days) {
  const out = new Date(from)
  out.setUTCDate(out.getUTCDate() + Number(days))
  return out
}

/**
 * The columns, written once and used by both halves of the union below.
 *
 * `id` is the roster row where one exists and the Supabase user id otherwise, so
 * every user has a stable handle whether or not a profile has been created yet.
 */
const USER_COLUMNS = `
  COALESCE(s.id, a.user_id) AS id,
  s.name, COALESCE(s.email, a.email) AS email,
  s.university_id AS universityId, s.year, s.study_group AS studyGroup, s.plan, s.status,
  s.joined, s.last_active AS lastActive, s.questions_answered AS questionsAnswered,
  s.accuracy, s.readiness, COALESCE(s.user_id, a.user_id) AS userId, s.notes,
  a.role, a.status AS accessStatus, a.created_at AS identityCreatedAt,
  sub.id AS subId, sub.plan AS subPlan, sub.status AS subStatus,
  sub.started_at AS subStartedAt, sub.expires_at AS subExpiresAt,
  sub.source AS subSource, sub.note AS subNote
`

const LATEST_SUB = `
  LEFT JOIN subscriptions sub
    ON sub.id = (
      SELECT id FROM subscriptions
       WHERE student_id = s.id AND status <> 'cancelled'
       ORDER BY started_at DESC, created_at DESC LIMIT 1
    )
`

/**
 * Every user, from both directions.
 *
 * Authentication is Supabase, so the authoritative list of people who can sign
 * in is `user_access` — and a query that started at `students` would hide anyone
 * who registered but has no profile row yet, which is exactly the person an
 * admin most needs to find. MariaDB has no FULL OUTER JOIN, so the two
 * directions are unioned: identities with or without a profile, then profiles
 * that have never been linked to an identity.
 */
const SELECT_USERS = `
  SELECT ${USER_COLUMNS}
    FROM user_access a
    LEFT JOIN students s ON s.user_id = a.user_id
    ${LATEST_SUB}
  UNION ALL
  SELECT ${USER_COLUMNS}
    FROM students s
    LEFT JOIN user_access a ON 1 = 0
    ${LATEST_SUB}
   WHERE s.user_id IS NULL
`

function shape(row) {
  const entitlement = entitlementOf(
    row.subId ? { plan: row.subPlan, status: row.subStatus, expires_at: row.subExpiresAt } : null,
  )
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    universityId: row.universityId,
    year: row.year,
    group: row.studyGroup,
    status: row.status,
    joined: row.joined,
    lastActive: row.lastActive,
    notes: row.notes,
    performance: {
      questionsAnswered: row.questionsAnswered ?? 0,
      accuracy: row.accuracy ?? 0,
      readiness: row.readiness ?? 0,
    },
    identity: row.userId
      ? { userId: row.userId, role: row.role, accessStatus: row.accessStatus, createdAt: row.identityCreatedAt }
      // A roster row with no identity has never signed in. Saying so is more
      // useful than showing an empty role, which reads as a data fault.
      : null,
    subscription: row.subId
      ? {
          id: row.subId, plan: row.subPlan, status: row.subStatus, source: row.subSource,
          startedAt: row.subStartedAt, expiresAt: row.subExpiresAt, note: row.subNote,
        }
      : null,
    entitlement,
  }
}

export async function listUsers({ query, status, plan, universityId, accessStatus, limit = 200 }) {
  // Filters apply to the unioned result, not to either half, so a term matches
  // an identity-only row as readily as a full profile.
  const where = []
  const params = []
  if (query) {
    where.push('(u.name LIKE ? OR u.email LIKE ? OR u.userId LIKE ?)')
    params.push(`%${query}%`, `%${query}%`, `%${query}%`)
  }
  if (status) { where.push('u.status = ?'); params.push(status) }
  if (plan) { where.push('u.plan = ?'); params.push(plan) }
  if (universityId) { where.push('u.universityId = ?'); params.push(universityId) }
  if (accessStatus) { where.push('u.accessStatus = ?'); params.push(accessStatus) }
  const sql = `SELECT * FROM (${SELECT_USERS}) u${where.length ? ` WHERE ${where.join(' AND ')}` : ''}
               ORDER BY COALESCE(u.name, u.email) LIMIT ?`
  const [rows] = await pool.query(sql, [...params, Number(limit)])
  return rows.map(shape)
}

/**
 * The caller's own record, for the caller.
 *
 * Deliberately built from the same union and the same `shape()` as the admin
 * view, so a student's screen and an admin's screen can never disagree about
 * their plan or their year. Returns null when nobody has created a roster row
 * yet — which is the normal state of a freshly registered account, not a fault.
 */
export async function getUserByIdentity(userId) {
  const [rows] = await pool.query(
    `SELECT * FROM (${SELECT_USERS}) u WHERE u.userId = ? LIMIT 1`,
    [userId],
  )
  return rows.length ? shape(rows[0]) : null
}

export async function getUser(id) {
  const [rows] = await pool.query(`SELECT * FROM (${SELECT_USERS}) u WHERE u.id = ?`, [id])
  if (!rows.length) return null
  const user = shape(rows[0])
  const [history] = await pool.query(
    `SELECT id, plan, status, started_at AS startedAt, expires_at AS expiresAt, source,
            granted_by AS grantedBy, note, cancelled_at AS cancelledAt, created_at AS createdAt
       FROM subscriptions WHERE student_id = ? ORDER BY started_at DESC, created_at DESC LIMIT 50`,
    [id],
  )
  const [audit] = await pool.query(
    `SELECT id, action, detail, reason, actor_id AS actorId, created_at AS createdAt
       FROM account_action_audit WHERE student_id = ? ORDER BY created_at DESC LIMIT 100`,
    [id],
  )
  return { ...user, subscriptionHistory: history, audit }
}

/**
 * Resolve an id from the users list to a roster row, creating one if needed.
 *
 * Because the list is unioned from identities as well as profiles, an admin can
 * legitimately act on someone who has signed in and has no `students` row —
 * granting them a subscription is often the very first thing done to a new
 * account. Subscriptions and audit entries are keyed to a roster row, so one is
 * created from the identity rather than refusing the action. It carries the
 * Supabase user id as its own id, which keeps the two permanently aligned.
 */
async function ensureStudentRow(conn, id) {
  const [existing] = await conn.query('SELECT id, user_id FROM students WHERE id = ? FOR UPDATE', [id])
  if (existing.length) return existing[0]

  const [identity] = await conn.query('SELECT user_id, email FROM user_access WHERE user_id = ?', [id])
  if (!identity.length) return null

  await conn.query(
    `INSERT INTO students (id, name, email, user_id, status, joined, questions_answered, accuracy, readiness)
     VALUES (?, ?, ?, ?, 'Active', CURDATE(), 0, 0, 0)`,
    [id, identity[0].email ?? null, identity[0].email ?? null, id],
  )
  return { id, user_id: id }
}

export async function recordAction(conn, { studentId, userId, action, detail, reason, actorId }) {
  await conn.query(
    'INSERT INTO account_action_audit (student_id, user_id, action, detail, reason, actor_id) VALUES (?, ?, ?, ?, ?, ?)',
    [studentId ?? null, userId ?? null, action, detail ?? null, reason, actorId],
  )
}

/**
 * Grant or extend a subscription.
 *
 * One row per granted period rather than a mutated column, so the history of
 * what was given and by whom survives the next change.
 */
export async function grantSubscription(studentId, { plan, days, source, note, reason, actorId }) {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, studentId)
    if (!student) { await conn.rollback(); return { error: 'not_found' } }

    const [current] = await conn.query(
      `SELECT id, plan, status, expires_at FROM subscriptions
        WHERE student_id = ? AND status <> 'cancelled'
        ORDER BY started_at DESC, created_at DESC LIMIT 1`,
      [studentId],
    )
    const now = new Date()
    const base = extensionBase(current[0], now)
    const expiresAt = days == null ? null : addDays(base, days)
    const id = randomUUID()

    // Superseding rather than editing: the previous period stays readable, and
    // the new row records exactly what this admin granted.
    if (current[0]) {
      await conn.query(
        "UPDATE subscriptions SET status = 'cancelled', cancelled_at = NOW(), cancelled_by = ? WHERE id = ?",
        [actorId, current[0].id],
      )
    }
    await conn.query(
      `INSERT INTO subscriptions (id, student_id, plan, status, started_at, expires_at, source, granted_by, note)
       VALUES (?, ?, ?, 'active', ?, ?, ?, ?, ?)`,
      [id, studentId, plan, current[0] ? current[0].expires_at ?? now : now, expiresAt, source ?? 'manual', actorId, note ?? null],
    )
    await conn.query('UPDATE students SET plan = ?, status = ? WHERE id = ?', [plan, 'Active', studentId])
    await recordAction(conn, {
      studentId, userId: student.user_id, action: 'subscription.grant',
      detail: `${plan} · ${days == null ? 'open-ended' : `${days} days`} → ${expiresAt ? expiresAt.toISOString().slice(0, 10) : 'no expiry'}`,
      reason, actorId,
    })
    await conn.commit()
    return { ok: true, id, expiresAt }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export async function cancelSubscription(studentId, { reason, actorId, immediate }) {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, studentId)
    if (!student) { await conn.rollback(); return { error: 'not_found' } }
    const [current] = await conn.query(
      `SELECT id, plan, expires_at FROM subscriptions
        WHERE student_id = ? AND status <> 'cancelled'
        ORDER BY started_at DESC, created_at DESC LIMIT 1`,
      [studentId],
    )
    if (!current.length) { await conn.rollback(); return { error: 'no_subscription' } }

    // Two different things an admin might mean by "terminate". Ending it now
    // removes access today; letting it lapse honours the period already paid
    // for and simply stops it renewing. Both are recorded as what they were.
    if (immediate) {
      await conn.query(
        "UPDATE subscriptions SET status = 'cancelled', cancelled_at = NOW(), cancelled_by = ?, expires_at = NOW() WHERE id = ?",
        [actorId, current[0].id],
      )
      await conn.query("UPDATE students SET plan = 'Free', status = 'Lapsed' WHERE id = ?", [studentId])
    } else {
      await conn.query(
        "UPDATE subscriptions SET status = 'cancelled', cancelled_at = NOW(), cancelled_by = ? WHERE id = ?",
        [actorId, current[0].id],
      )
    }
    await recordAction(conn, {
      studentId, userId: student.user_id, action: 'subscription.cancel',
      detail: `${current[0].plan} · ${immediate ? 'ended immediately' : 'left to lapse'}`,
      reason, actorId,
    })
    await conn.commit()
    return { ok: true }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

/**
 * Suspend or reactivate sign-in.
 *
 * This is the only action that actually stops someone using the product, and it
 * acts on `user_access`, not on the roster row — so it requires a linked
 * identity. A roster row with no identity has no sign-in to suspend, and saying
 * that is better than appearing to succeed.
 */
export async function setAccessStatus(studentId, { status, reason, actorId }) {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, studentId)
    if (!student) { await conn.rollback(); return { error: 'not_found' } }
    const userId = student.user_id
    if (!userId) { await conn.rollback(); return { error: 'no_identity' } }

    const [access] = await conn.query('SELECT role FROM user_access WHERE user_id = ? FOR UPDATE', [userId])
    if (!access.length) { await conn.rollback(); return { error: 'no_identity' } }
    // Suspending somebody who holds the console would remove the ability to
    // undo it if they were the last one. Refusing here is cheaper than
    // recovering from that. This reads console access rather than the single
    // role 'admin', or widening the console to four roles would have quietly
    // made editors and reviewers suspendable.
    if (hasConsoleAccess(access[0].role) && status === 'suspended') {
      await conn.rollback()
      return { error: 'cannot_suspend_console' }
    }

    await conn.query('UPDATE user_access SET status = ? WHERE user_id = ?', [status, userId])
    await conn.query('UPDATE students SET status = ? WHERE id = ?', [status === 'suspended' ? 'Suspended' : 'Active', studentId])
    await recordAction(conn, {
      studentId, userId, action: status === 'suspended' ? 'access.suspend' : 'access.reactivate',
      detail: null, reason, actorId,
    })
    await conn.commit()
    return { ok: true }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

/**
 * Ask Supabase to issue a password recovery link.
 *
 * Nothing about the password is read, written or seen here. Supabase generates
 * the link; the admin either has it emailed by Supabase or copies it to the
 * student over a channel they trust. The link is returned to the caller once and
 * not stored, because a stored recovery link is a stored credential.
 */
export async function requestPasswordReset(studentId, { reason, actorId }) {
  // Read the address from whichever record has one. A user who signed in but has
  // no profile row still has an email on their identity, and they are precisely
  // the account most likely to need a reset link.
  const [rows] = await pool.query(
    `SELECT COALESCE(s.email, a.email) AS email, COALESCE(s.user_id, a.user_id) AS userId
       FROM user_access a LEFT JOIN students s ON s.user_id = a.user_id
      WHERE a.user_id = ?
      UNION ALL
     SELECT s.email, s.user_id FROM students s WHERE s.id = ? LIMIT 1`,
    [studentId, studentId],
  )
  if (!rows.length) return { error: 'not_found' }
  const { email, userId } = rows[0]
  if (!email) return { error: 'no_email' }
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return { error: 'supabase_not_configured' }

  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/generate_link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ type: 'recovery', email }),
  })
  if (!response.ok) return { error: 'supabase_rejected', status: response.status }
  const payload = await response.json()

  const conn = await pool.getConnection()
  try {
    await recordAction(conn, {
      studentId, userId, action: 'password.reset_link',
      detail: `recovery link issued for ${email}`, reason, actorId,
    })
  } finally {
    conn.release()
  }
  return { ok: true, actionLink: payload.action_link ?? payload.properties?.action_link ?? null }
}

export const passwordResetConfigured = Boolean(SUPABASE_URL && SERVICE_ROLE_KEY)

/**
 * Which family a per-user state key belongs to.
 *
 * `user_state` is a key-value store whose keys encode what they are —
 * `synapse.qbank.attempts`, `synapse.notebook.<id>`. An admin looking at one
 * person wants "how much have they written, answered, saved", not a list of
 * ninety opaque keys, so the keys are folded into the families a person would
 * recognise. Anything unrecognised is reported as `other` rather than dropped,
 * because a key nobody has classified yet is still evidence of activity.
 */
export function stateFamily(key) {
  if (/^synapse\.qbank\./.test(key)) return 'Question bank'
  if (/^synapse\.practical\./.test(key)) return 'Practicals'
  if (/^synapse\.progress\./.test(key)) return 'Progress'
  if (/^synapse\.notebook\./.test(key)) return 'Notebook'
  if (/^synapse\.whiteboard\./.test(key)) return 'Whiteboards'
  if (/^synapse\.highlights\./.test(key)) return 'Highlights'
  if (/^synapse\.bookmarks\./.test(key)) return 'Bookmarks'
  if (/^synapse\.library\./.test(key)) return 'Library'
  if (/^synapse\.calendar\./.test(key)) return 'Calendar'
  if (/^synapse\.account\./.test(key)) return 'Account settings'
  if (/^synapse-notification-read/.test(key)) return 'Notifications'
  if (/^synapse-applied-voucher/.test(key)) return 'Vouchers'
  return 'Other'
}

/**
 * Everything this person has actually done, gathered from their own state.
 *
 * The `students` row carries three summary numbers that something else has to
 * compute. This reads what the product itself stored: how many documents they
 * own in each area, how large they are, and when each was last touched. It is
 * the difference between "accuracy 62%" and knowing whether anyone has opened
 * the app since March.
 *
 * Values are deliberately not returned. An admin needs to know that a student
 * has 41 notebook entries and when they last wrote one; reading the notes
 * themselves is a different question with a different justification.
 */
export async function getUserActivity(userId) {
  if (!userId) return { families: [], totalDocuments: 0, lastActivity: null }
  const [rows] = await pool.query(
    `SELECT k, OCTET_LENGTH(v) AS bytes, updated_at AS updatedAt
       FROM user_state WHERE user_id = ? ORDER BY updated_at DESC`,
    [userId],
  )
  const byFamily = new Map()
  for (const row of rows) {
    const family = stateFamily(row.k)
    const entry = byFamily.get(family) ?? { family, documents: 0, bytes: 0, lastUpdated: null }
    entry.documents += 1
    entry.bytes += Number(row.bytes ?? 0)
    if (!entry.lastUpdated || new Date(row.updatedAt) > new Date(entry.lastUpdated)) entry.lastUpdated = row.updatedAt
    byFamily.set(family, entry)
  }
  const families = [...byFamily.values()].sort((a, b) => b.documents - a.documents)
  return {
    families,
    totalDocuments: rows.length,
    totalBytes: families.reduce((sum, f) => sum + f.bytes, 0),
    lastActivity: rows.length ? rows[0].updatedAt : null,
  }
}

/**
 * Change someone's role.
 *
 * This already existed on the access panel, keyed by Supabase user id. It is
 * repeated here keyed by the users-list id because an admin managing a person
 * should not have to find them again on a second screen to change one field.
 * Both write `role_promotion_audit`, so the two paths share one history.
 *
 * Demoting the last admin is refused. There is no way back from an estate with
 * no administrator that does not involve editing the database by hand.
 */
export async function setRole(studentId, { role, reason, actorId }) {
  if (!['student', 'admin'].includes(role)) return { error: 'invalid_role' }
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, studentId)
    if (!student) { await conn.rollback(); return { error: 'not_found' } }
    const userId = student.user_id
    if (!userId) { await conn.rollback(); return { error: 'no_identity' } }

    const [access] = await conn.query('SELECT role, status FROM user_access WHERE user_id = ? FOR UPDATE', [userId])
    if (!access.length) { await conn.rollback(); return { error: 'no_identity' } }
    if (access[0].status !== 'active') { await conn.rollback(); return { error: 'suspended' } }
    if (access[0].role === role) { await conn.rollback(); return { error: 'unchanged' } }

    if (access[0].role === 'admin' && role === 'student') {
      const [[{ admins }]] = await conn.query(
        "SELECT COUNT(*) AS admins FROM user_access WHERE role = 'admin' AND status = 'active'",
      )
      if (admins <= 1) { await conn.rollback(); return { error: 'last_admin' } }
    }

    await conn.query(
      'UPDATE user_access SET role = ?, promoted_by = ?, promoted_at = NOW() WHERE user_id = ?',
      [role, actorId, userId],
    )
    await conn.query(
      'INSERT INTO role_promotion_audit (user_id, previous_role, next_role, promoted_by, reason) VALUES (?, ?, ?, ?, ?)',
      [userId, access[0].role, role, actorId, reason],
    )
    await recordAction(conn, {
      studentId, userId, action: 'access.role',
      detail: `${access[0].role} → ${role}`, reason, actorId,
    })
    await conn.commit()
    return { ok: true, role }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

/**
 * Whether an email or a phone already belongs to somebody.
 *
 * It answers taken or not taken and nothing else — no name, no id, no hint at
 * which account. A public endpoint that confirms an address exists is already
 * the most one should say, and anything past that is an enumeration tool.
 */
export async function identifierTaken({ email, phone }) {
  const cleanEmail = normaliseEmail(email)
  const cleanPhone = normalisePhone(phone)
  if (!cleanEmail && !cleanPhone) return { email: false, phone: false }

  const [rows] = await pool.query(
    `SELECT
       SUM(LOWER(TRIM(email)) = ?) AS emailTaken,
       SUM(phone = ?) AS phoneTaken
     FROM students`,
    [cleanEmail ?? '\u0000', cleanPhone ?? '\u0000'],
  )
  return {
    email: Boolean(cleanEmail && Number(rows?.[0]?.emailTaken ?? 0) > 0),
    phone: Boolean(cleanPhone && Number(rows?.[0]?.phoneTaken ?? 0) > 0),
  }
}
