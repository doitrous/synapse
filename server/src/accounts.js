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
import { STORED_ROLES, canSetRole, effectiveRole, hasConsoleAccess, parseSuperAdminEmails, rank } from './roles.js'

const superAdminEmails = parseSuperAdminEmails(process.env.SUPER_ADMIN_EMAILS)
import { normaliseEmail, normalisePhone } from './identity.js'

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, '')
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function derivedYearId(universityId, year) {
  const uni = String(universityId ?? '').replace(/[^A-Za-z0-9]/g, '').toUpperCase()
  const label = String(year ?? '').trim()
  const number = label.match(/\d+/)?.[0] ?? ''
  if (!uni || !number) return null
  return /internship/i.test(label) ? `${uni}_INT${number}` : `${uni}_Y${number}`
}

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
  s.phone, s.nationality,
  s.university_id AS universityId, s.year, s.year_id AS yearId, s.study_group AS studyGroup, s.plan, s.status,
  s.username, s.username_normalized AS usernameNormalized, s.profile_icon AS profileIcon,
  s.status_message AS statusMessage, s.timezone AS timezone,
  s.avatar_media_id AS avatarMediaId,
  s.discoverable, s.social_provider AS socialProvider, s.social_subject AS socialSubject,
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

/**
 * Whether this account has the details a social sign-up never collects.
 *
 * Password sign-up gathers phone and nationality on the form itself
 * (Signup.tsx); Google/Facebook OAuth hands back a name and an email only, so
 * those two columns stay null forever unless something asks again — this is
 * the flag CompleteProfile.tsx and RequireAuth read to decide whether to.
 * Nationality is left out on purpose: Signup.tsx marks it optional, and a
 * password-signup student who left it blank must not suddenly be judged
 * "incomplete" by a rule stricter than the form they filled in.
 */
export function isProfileComplete({ phone, universityId }) {
  return Boolean(phone && universityId)
}

function shape(row) {
  const entitlement = entitlementOf(
    row.subId ? { plan: row.subPlan, status: row.subStatus, expires_at: row.subExpiresAt } : null,
  )
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    nationality: row.nationality,
    profileComplete: isProfileComplete({ phone: row.phone, universityId: row.universityId }),
    universityId: row.universityId,
    year: row.year,
    yearId: row.yearId,
    group: row.studyGroup,
    status: row.status,
    username: row.username,
    usernameNormalized: row.usernameNormalized,
    profileIcon: row.profileIcon,
    statusMessage: row.statusMessage ?? null,
    timezone: row.timezone ?? null,
    // Raw id, not a URL: the client already has a convention for turning a
    // managed-media id into a fetchable path (`mediaUrl` in data/mediaLibrary.ts,
    // which the browser prepends its own API base to) and this reuses it rather
    // than hand back a second, differently-rooted path format.
    avatarMediaId: row.avatarMediaId || null,
    discoverable: Boolean(row.discoverable),
    socialProvider: row.socialProvider,
    socialSubject: row.socialSubject,
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
export async function ensureStudentRow(conn, id) {
  const [existing] = await conn.query('SELECT id, user_id FROM students WHERE id = ? FOR UPDATE', [id])
  if (existing.length) return existing[0]

  const [identity] = await conn.query('SELECT user_id, email FROM user_access WHERE user_id = ?', [id])
  if (!identity.length) return null

  await conn.query(
    `INSERT INTO students (id, name, email, user_id, status, joined, questions_answered, accuracy, readiness, discoverable)
     VALUES (?, ?, ?, ?, 'Active', CURDATE(), 0, 0, 0, 0)`,
    [id, identity[0].email ?? null, identity[0].email ?? null, id],
  )
  return { id, user_id: id }
}

/**
 * Whether classmates can find this student in the directory, as the student's
 * own session sees it.
 *
 * Read directly by `user_id` rather than through `ensureStudentRow`, so
 * checking the setting is never what creates the roster row — a student who
 * has changed nothing still gets an honest answer. An absent row and a row
 * nobody has touched mean the same thing here, because the column's own
 * default is `0`: both read as private until the student opts in.
 */
export async function getDiscoverable(userId) {
  const [rows] = await pool.query('SELECT discoverable FROM students WHERE user_id = ? LIMIT 1', [userId])
  return rows.length ? Boolean(rows[0].discoverable) : false
}

/**
 * Write the choice for the caller's own row.
 *
 * Writing is where the row has to exist, so this is the one place that calls
 * `ensureStudentRow` on behalf of a student rather than an admin — with the
 * caller's own verified id, which is exactly how that helper is keyed
 * everywhere else it is used.
 */
export async function setDiscoverable(userId, value) {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, userId)
    if (!student) { await conn.rollback(); return { error: 'not_found' } }
    await conn.query('UPDATE students SET discoverable = ? WHERE user_id = ?', [value ? 1 : 0, userId])
    await conn.commit()
    return { ok: true, discoverable: Boolean(value) }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
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
 * Set a user's password directly, on behalf of an editor or super admin.
 *
 * A password is only ever set for an account below editor — a student, a reviewer
 * or an admin — so an editor can never reach a peer's or a super admin's
 * credentials; the target's *effective* role is checked, so an allowlisted super
 * admin whose row says otherwise is still out of reach. The new password is passed
 * straight to Supabase and is never stored, logged or returned; only the fact that
 * it was changed — by whom, for whom, and why — is written to the audit trail.
 */
export async function setUserPassword(studentId, { password, reason, actorId }) {
  const pass = String(password ?? '')
  if (pass.length < 8) return { error: 'weak_password' }

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
  if (!userId) return { error: 'no_identity' }

  // Authoritative role, by user id — so a lookup by roster id can't understate it.
  const [accessRows] = await pool.query('SELECT role, email FROM user_access WHERE user_id = ?', [userId])
  const targetRole = effectiveRole(accessRows[0]?.email ?? email, accessRows[0]?.role ?? null, superAdminEmails)
  if (rank(targetRole) >= 2) return { error: 'forbidden_target' }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return { error: 'supabase_not_configured' }
  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${encodeURIComponent(userId)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ password: pass }),
  })
  if (!response.ok) return { error: 'supabase_rejected', status: response.status }

  const conn = await pool.getConnection()
  try {
    await recordAction(conn, {
      studentId, userId, action: 'password.set',
      detail: `password set for ${email}`, reason, actorId,
    })
  } finally {
    conn.release()
  }
  return { ok: true }
}

/**
 * Which family a per-user state key belongs to.
 *
 * `user_state` is a key-value store whose keys encode what they are —
 * `nishany.qbank.attempts`, `nishany.notebook.<id>`. An admin looking at one
 * person wants "how much have they written, answered, saved", not a list of
 * ninety opaque keys, so the keys are folded into the families a person would
 * recognise. Anything unrecognised is reported as `other` rather than dropped,
 * because a key nobody has classified yet is still evidence of activity.
 */
export function stateFamily(key) {
  if (/^nishany\.qbank\./.test(key)) return 'Question bank'
  if (/^nishany\.practical\./.test(key)) return 'Practicals'
  if (/^nishany\.progress\./.test(key)) return 'Progress'
  if (/^nishany\.maristanas\./.test(key)) return 'Maristanas'
  if (/^nishany\.notebook\./.test(key)) return 'Notebook'
  if (/^nishany\.whiteboard\./.test(key)) return 'Whiteboards'
  if (/^nishany\.highlights\./.test(key)) return 'Highlights'
  if (/^nishany\.bookmarks\./.test(key)) return 'Bookmarks'
  if (/^nishany\.library\./.test(key)) return 'Library'
  if (/^nishany\.calendar\./.test(key)) return 'Calendar'
  if (/^nishany\.account\./.test(key)) return 'Account settings'
  if (/^nishany-notification-read/.test(key)) return 'Notifications'
  if (/^nishany-applied-voucher/.test(key)) return 'Vouchers'
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
export async function setRole(studentId, { role, reason, actorId, actorRole }) {
  if (!STORED_ROLES.includes(role)) return { error: 'invalid_role' }
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, studentId)
    if (!student) { await conn.rollback(); return { error: 'not_found' } }
    const userId = student.user_id
    if (!userId) { await conn.rollback(); return { error: 'no_identity' } }

    const [access] = await conn.query(
      'SELECT role, status, email FROM user_access WHERE user_id = ? FOR UPDATE', [userId],
    )
    if (!access.length) { await conn.rollback(); return { error: 'no_identity' } }
    if (access[0].status !== 'active') { await conn.rollback(); return { error: 'suspended' } }

    // The target's rank is their *effective* one, so an allowlisted super admin
    // cannot be demoted by writing to their row.
    const targetRole = effectiveRole(access[0].email, access[0].role, superAdminEmails)
    if (!canSetRole(actorRole, targetRole, role)) { await conn.rollback(); return { error: 'forbidden' } }
    if (access[0].role === role) { await conn.rollback(); return { error: 'unchanged' } }

    // Somebody must be able to open the console tomorrow. The allowlist makes
    // this near-impossible to trip, but an allowlisted account that has never
    // signed in owns no row, so the net stays.
    if (rank(targetRole) >= 1 && rank(role) < 1) {
      const [[{ consoles }]] = await conn.query(
        "SELECT COUNT(*) AS consoles FROM user_access WHERE role IN ('reviewer','admin','editor') AND status = 'active'",
      )
      if (consoles <= 1) { await conn.rollback(); return { error: 'last_console' } }
    }

    await conn.query(
      `UPDATE user_access
          SET role = ?, content_scope = IF(? = 'reviewer', content_scope, NULL),
              promoted_by = ?, promoted_at = NOW()
        WHERE user_id = ?`,
      [role, role, actorId, userId],
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
 * Which modules and years a reviewer may write.
 *
 * Audited exactly like a role change, because it is one: widening somebody's
 * scope is widening their access, and "who gave them Year 4" is the same class
 * of question as "who made them a reviewer".
 */
export async function setContentScope(studentId, { moduleIds, yearIds, reason, actorId, actorRole }) {
  const clean = (value) => [...new Set((Array.isArray(value) ? value : [])
    .map((entry) => String(entry ?? '').trim())
    .filter(Boolean))]
  const scope = { moduleIds: clean(moduleIds), yearIds: clean(yearIds) }
  const stored = scope.moduleIds.length || scope.yearIds.length ? JSON.stringify(scope) : null

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, studentId)
    if (!student) { await conn.rollback(); return { error: 'not_found' } }
    const userId = student.user_id
    if (!userId) { await conn.rollback(); return { error: 'no_identity' } }

    const [access] = await conn.query(
      'SELECT role, status, email FROM user_access WHERE user_id = ? FOR UPDATE', [userId],
    )
    if (!access.length) { await conn.rollback(); return { error: 'no_identity' } }
    const targetRole = effectiveRole(access[0].email, access[0].role, superAdminEmails)
    // Scope only means anything for a reviewer, and you must outrank them.
    if (rank(actorRole) <= rank(targetRole)) { await conn.rollback(); return { error: 'forbidden' } }
    if (targetRole !== 'reviewer') { await conn.rollback(); return { error: 'not_scoped' } }

    await conn.query('UPDATE user_access SET content_scope = ? WHERE user_id = ?', [stored, userId])
    await recordAction(conn, {
      studentId, userId, action: 'access.scope', detail: stored ?? 'none', reason, actorId,
    })
    await conn.commit()
    return { ok: true, scope: stored ? scope : null }
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

/* ── The student's own enrolment ─────────────────────────────────────────── */

/** Full access for a new account, for this many days, however they arrive. */
export const TRIAL_DAYS = 3

function trimmed(value, max) {
  const text = String(value ?? '').trim()
  return text ? text.slice(0, max) : null
}

export function normaliseUsername(value) {
  return normalisedUsernameText(value).slice(0, 32)
}

function normalisedUsernameText(value) {
  return String(value ?? '')
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
}

export function usernameProblem(value) {
  const raw = String(value ?? '').trim()
  if (!raw) return 'username_required'
  const normalized = normalisedUsernameText(raw)
  if (normalized.length < 3) return 'username_too_short'
  if (normalized.length > 32) return 'username_too_long'
  if (!/^[a-z0-9][a-z0-9_-]*[a-z0-9]$/.test(normalized)) return 'username_format'
  return null
}

export function normaliseProfileIcon(value) {
  const icon = String(value ?? '').trim().slice(0, 64)
  if (!icon) return null
  return /^[a-z][a-z0-9_-]{1,63}$/i.test(icon) ? icon : null
}

export async function usernameConflict(conn, { universityId, usernameNormalized, studentId }) {
  if (!universityId || !usernameNormalized) return false
  const [rows] = await conn.query(
    `SELECT id FROM students
      WHERE university_id = ? AND username_normalized = ? AND id <> ?
      LIMIT 1`,
    [universityId, usernameNormalized, studentId ?? ''],
  )
  return rows.length > 0
}

/** Trimmed, line-breaks folded to spaces, capped at 120 — a status line, not a note. */
export function normaliseStatusMessage(value) {
  if (value === undefined) return undefined
  const text = String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, 120)
  return text || null
}

const FALLBACK_TIMEZONE = 'Africa/Cairo'
// Node 22 ships Intl.supportedValuesOf; a name outside this list is rejected
// rather than trusted, since it is handed straight to Intl.DateTimeFormat
// wherever the day boundary or a reminder hour is computed from it.
const SUPPORTED_TIMEZONES = new Set(Intl.supportedValuesOf('timeZone'))

export function normaliseTimezone(value) {
  const text = String(value ?? '').trim()
  return SUPPORTED_TIMEZONES.has(text) ? text : FALLBACK_TIMEZONE
}

/**
 * Whether a candidate username is free to take, for this caller.
 *
 * Same rule `saveOwnProfile` enforces at write time — unique per university,
 * compared case-insensitively — so the field can say so before Save is even
 * pressed. Read-only: a race with another save is still caught by the write
 * path's own check inside its transaction.
 */
export async function usernameAvailability(userId, rawUsername) {
  const problem = usernameProblem(rawUsername)
  if (problem) return { available: false, reason: 'invalid' }
  const normalized = normaliseUsername(rawUsername)
  const [rows] = await pool.query(
    'SELECT id, university_id AS universityId, username_normalized AS usernameNormalized FROM students WHERE user_id = ? LIMIT 1',
    [userId],
  )
  const me = rows[0] ?? null
  if (me?.usernameNormalized === normalized) return { available: true }
  const taken = await usernameConflict(pool, { universityId: me?.universityId, usernameNormalized: normalized, studentId: me?.id })
  return taken ? { available: false, reason: 'taken' } : { available: true }
}

/**
 * The caller's own editable profile — username, icon, status message and
 * timezone. Split from `saveOwnEnrolment` because none of these fields are
 * ever locked the way university/year are: a student may change any of them
 * at will, and this never touches the enrolment-locked columns or the trial
 * grant.
 */
export async function saveOwnProfile(userId, input) {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, userId)
    if (!student) { await conn.rollback(); return { error: 'no_identity' } }

    const [[stored]] = await conn.query(
      'SELECT university_id AS universityId, username_normalized AS usernameNormalized FROM students WHERE id = ?',
      [student.id],
    )

    const sets = []
    const params = []

    if (input?.username !== undefined) {
      const username = trimmed(input.username, 32)
      const usernameError = username ? usernameProblem(username) : null
      if (usernameError) { await conn.rollback(); return { error: usernameError } }
      const usernameNormalized = username ? normaliseUsername(username) : null
      if (usernameNormalized && usernameNormalized !== stored?.usernameNormalized
        && await usernameConflict(conn, { universityId: stored?.universityId, usernameNormalized, studentId: student.id })) {
        await conn.rollback()
        return { error: 'username_taken' }
      }
      sets.push('username = ?', 'username_normalized = ?')
      params.push(username, usernameNormalized)
    }
    if (input?.profileIcon !== undefined) {
      sets.push('profile_icon = ?')
      params.push(normaliseProfileIcon(input.profileIcon))
    }
    if (input?.statusMessage !== undefined) {
      sets.push('status_message = ?')
      params.push(normaliseStatusMessage(input.statusMessage))
    }
    if (input?.timezone !== undefined) {
      sets.push('timezone = ?')
      params.push(normaliseTimezone(input.timezone))
    }

    if (sets.length) {
      await conn.query(`UPDATE students SET ${sets.join(', ')} WHERE id = ?`, [...params, student.id])
    }
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
  return { ok: true, profile: await getUserByIdentity(userId) }
}

/**
 * Where this account studies, written where every device can read it.
 *
 * This is the single source of truth the app was missing. The answers to
 * onboarding used to live in a browser document, so two browsers signed into
 * one account could — and did — disagree about which year the student was in.
 * A row in `students`, keyed to the Supabase user id, cannot: the server is the
 * only writer, ownership is a `WHERE user_id = ?`, and `/api/me` reads it back
 * for everybody.
 *
 * The name, phone and nationality collected at sign-up live only in Supabase
 * user metadata until this runs, which is also why phone uniqueness had nothing
 * to check against. They are carried here on the first enrolment. A phone that
 * belongs to somebody else is dropped rather than refused: it is not worth
 * blocking a student out of their own account over, and the number is not a
 * credential.
 */
export async function saveOwnEnrolment(userId, input) {
  const universityId = trimmed(input?.universityId, 64)
  const year = trimmed(input?.year, 32)
  if (!universityId || !year) return { error: 'university_and_year_required' }
  const yearId = trimmed(input?.yearId, 64) ?? derivedYearId(universityId, year)
  const group = trimmed(input?.group, 120)
  const name = trimmed(input?.name, 255)
  const nationality = trimmed(input?.nationality, 64)
  const phone = normalisePhone(input?.phone)
  // `plan` is never taken from the caller — an onboarding request is a way to
  // register where you study, not a way to write your own entitlement. Every
  // trial seeded here starts on 'Free'; anything better than that is granted
  // by an admin action or a real subscription, elsewhere.
  const username = trimmed(input?.username, 32)
  const profileIcon = normaliseProfileIcon(input?.profileIcon)
  const usernameNormalized = username ? normaliseUsername(username) : null
  const usernameError = username ? usernameProblem(username) : null
  if (usernameError) return { error: usernameError }

  // Declared out here, not inside the try: the success return below runs after
  // the finally, outside the try block, and reads it.
  let phoneConflict = false
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, userId)
    if (!student) { await conn.rollback(); return { error: 'no_identity' } }

    // Only if it is free. The UNIQUE index would otherwise abort the whole
    // transaction and lose the enrolment along with it.
    //
    // `phoneConflict` is reported back rather than swallowed: the ordinary
    // caller here is the onboarding overlay, carrying a phone across from
    // sign-up metadata as a courtesy, and a collision there is not worth
    // blocking enrolment over. But CompleteProfile.tsx calls this same
    // function as the one screen whose entire purpose is capturing that
    // number, so it needs to know the save silently kept the old (null)
    // value rather than tell the student their number was saved when it
    // was not.
    let storedPhone = null
    if (phone) {
      const [held] = await conn.query('SELECT id FROM students WHERE phone = ? AND id <> ? LIMIT 1', [phone, student.id])
      if (held.length) phoneConflict = true
      else storedPhone = phone
    }

    /**
     * A roster row created from an identity alone has no name to put in it, so
     * `ensureStudentRow` fills the column with the email address. That is a
     * placeholder, not a name — and `COALESCE(name, ?)` treated it as one, so
     * the real name carried from sign-up was discarded and every student was
     * greeted by their own email address.
     *
     * A stored name that is anything other than the email was put there
     * deliberately, by an administrator, and is never overwritten from here.
     */
    const [[stored]] = await conn.query(
      'SELECT name, email, university_id AS universityId, year, year_id AS yearId, username_normalized AS usernameNormalized FROM students WHERE id = ?',
      [student.id],
    )
    const lockedUniversity = Boolean(stored?.universityId)
    const lockedYear = Boolean(stored?.year)
    const lockedChanges = []
    if (lockedUniversity && stored.universityId !== universityId) lockedChanges.push('university')
    if (lockedYear && stored.year !== year) lockedChanges.push('year')
    if (lockedChanges.length) {
      await conn.rollback()
      return { error: 'enrollment_locked', fields: lockedChanges }
    }
    if (usernameNormalized && await usernameConflict(conn, { universityId, usernameNormalized, studentId: student.id })) {
      await conn.rollback()
      return { error: 'username_taken' }
    }
    const placeholder = !stored?.name || stored.name === stored.email
    const finalName = placeholder ? (name ?? stored?.name ?? null) : stored.name

    await conn.query(
      `UPDATE students
          SET university_id = ?,
              year = ?,
              year_id = COALESCE(year_id, ?),
              study_group = ?,
              name = ?,
              nationality = COALESCE(nationality, ?),
              phone = COALESCE(phone, ?),
              username = COALESCE(?, username),
              username_normalized = COALESCE(?, username_normalized),
              profile_icon = COALESCE(?, profile_icon),
              discoverable = COALESCE(discoverable, 0),
              status = COALESCE(status, 'Active'),
              joined = COALESCE(joined, CURDATE())
        WHERE id = ?`,
      [universityId, year, yearId, group, finalName, nationality, storedPhone, username, usernameNormalized, profileIcon, student.id],
    )

    // The trial is granted once, by the server, so it starts when the account
    // was actually enrolled and expires at the same moment on every device.
    // An account that already has a subscription — a paid one, or a trial from
    // a previous sign-in — keeps it.
    const [current] = await conn.query(
      `SELECT id FROM subscriptions WHERE student_id = ? AND status <> 'cancelled' LIMIT 1`,
      [student.id],
    )
    if (!current.length) {
      const now = new Date()
      await conn.query(
        `INSERT INTO subscriptions (id, student_id, plan, status, started_at, expires_at, source, granted_by, note)
         VALUES (?, ?, 'Free', 'trialing', ?, ?, 'trial', ?, ?)`,
        [randomUUID(), student.id, now, addDays(now, TRIAL_DAYS), userId, `${TRIAL_DAYS}-day trial on enrolment`],
      )
      // Keeps `students.plan` (the denormalized column `listUsers`/`getUserByIdentity`
      // read) in step with the subscription just written above.
      await conn.query('UPDATE students SET plan = ? WHERE id = ?', ['Free', student.id])
    }

    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }

  return { ok: true, phoneConflict, profile: await getUserByIdentity(userId) }
}
