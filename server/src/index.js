import { createHash, randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { basename, dirname, join, resolve, sep } from 'node:path'
import { createReadStream, createWriteStream, existsSync } from 'node:fs'
import { mkdir, readFile, rename, rm, stat, unlink } from 'node:fs/promises'
import { once } from 'node:events'
import { Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import { pool, migrate } from './db.js'
import { apiAuthGate, mfaSatisfied, requireAdmin, requireAuthenticated } from './auth.js'
import {
  listUsers, getUser, getUserByIdentity, grantSubscription, cancelSubscription,
  setAccessStatus, requestPasswordReset, recordAction, readReason,
  passwordResetConfigured, getUserActivity, setRole,
} from './accounts.js'
import { redeemVoucher, releaseVoucher, myVoucher } from './vouchers.js'
import {
  createRoom, joinRoom, roomFor, startRoom, submitAnswer, finishRoom, myRooms,
  invalidateStudyRoomSnapshot,
} from './studyRooms.js'
import { toMariaDbDate } from './datetime.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LAUNCH_DATA_PATH = join(__dirname, '..', 'data', 'medical-library-v1.json')
const RESOURCE_STORAGE_DIR = resolve(process.env.RESOURCE_STORAGE_DIR || '/data/medical-library')
const RESOURCE_MAX_BYTES = Number(process.env.RESOURCE_MAX_BYTES) || 250 * 1024 * 1024
const RESOURCE_CHUNK_MAX_BYTES = Number(process.env.RESOURCE_CHUNK_MAX_BYTES) || 64 * 1024 * 1024
const RESOURCE_CHUNKED_MAX_BYTES = Number(process.env.RESOURCE_CHUNKED_MAX_BYTES) || 2 * 1024 * 1024 * 1024
const MEDICAL_EVIDENCE_STATE_KEY = 'synapse-medical-evidence-v1'
let medicalResourceSnapshot = null
let medicalResourceLoad = null

/**
 * Drop any server-side cache a state write has just made stale.
 *
 * Two caches now read from `app_state` — the medical-resource snapshot and the
 * published-question set behind study rooms — so invalidation is one call
 * rather than a growing list at every write site.
 */
function invalidateSnapshots(key) {
  if (key === MEDICAL_EVIDENCE_STATE_KEY) {
    medicalResourceSnapshot = null
    medicalResourceLoad = null
  }
  invalidateStudyRoomSnapshot(key)
}
const app = express()
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? true }))
app.use(express.json({
  limit: '25mb',
  verify: (req, _res, buffer) => {
    if (req.originalUrl === '/api/webhooks/resend/inbound') req.rawBody = buffer.toString('utf8')
  },
}))

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const resendReceivingKey = process.env.RESEND_ADMIN_API_KEY || process.env.RESEND_API_KEY
const resendReceiving = resendReceivingKey ? new Resend(resendReceivingKey) : null
const MAIL_FROM = process.env.MAIL_FROM || 'synapse@mail.doitrous.com'

app.use(apiAuthGate)

const wrap = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((e) => {
  console.error(e); res.status(500).json({ error: e.message || 'server error' })
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.get('/api/session', (req, res) => res.json({
  user: req.identity ? {
    id: req.identity.id,
    email: req.identity.email,
    role: req.identity.role,
    aal: req.identity.aal,
    mfaRequired: Boolean(req.identity.mfaRequired),
  } : null,
}))

/**
 * The caller's own profile and entitlement.
 *
 * A student surface needs to know who it is showing and what they have paid
 * for. Both answers already exist for admins; this exposes exactly the caller's
 * own row and nothing else. A missing roster row is a 200 with nulls rather
 * than a 404: "your university has not set up your profile yet" is a state the
 * app should render, not an error it should treat as a broken request.
 */
app.get('/api/me', requireAuthenticated, wrap(async (req, res) => {
  const user = await getUserByIdentity(req.identity.id)
  res.json({
    user: { id: req.identity.id, email: req.identity.email, role: req.identity.role, aal: req.identity.aal, mfaRequired: Boolean(req.identity.mfaRequired) },
    profile: user
      ? { studentId: user.id, name: user.name, email: user.email, universityId: user.universityId, year: user.year, group: user.group, status: user.status }
      : null,
    subscription: user?.subscription ?? null,
    entitlement: user?.entitlement ?? { state: 'none', plan: 'Free', expiresAt: null, daysLeft: null },
  })
}))

/**
 * Everything this account has stored, as the account's own data.
 *
 * The Account page has always offered a download. It exported the settings blob
 * the page happened to hold, while promising notes, highlights and progress —
 * this returns what the promise says: every `user_state` document owned by the
 * caller.
 */
app.get('/api/me/export', requireAuthenticated, wrap(async (req, res) => {
  const [rows] = await pool.query(
    'SELECT k, v, updated_at AS updatedAt FROM user_state WHERE user_id = ? ORDER BY k',
    [req.identity.id],
  )
  const documents = {}
  for (const row of rows) {
    try { documents[row.k] = { value: JSON.parse(row.v), updatedAt: row.updatedAt } }
    catch { documents[row.k] = { value: null, updatedAt: row.updatedAt } }
  }
  const profile = await getUserByIdentity(req.identity.id)
  res.json({
    exportedAt: new Date().toISOString(),
    account: { id: req.identity.id, email: req.identity.email },
    profile,
    documents,
  })
}))

/* ── Vouchers ────────────────────────────────────────────────────────────── */

app.post('/api/vouchers/redeem', requireAuthenticated, wrap(async (req, res) => {
  const result = await redeemVoucher(req.identity.id, req.body?.code)
  // A refused voucher is a 200 with a typed reason, not an error status: the
  // client has to render the reason, and a 4xx would put the persistence layer
  // into its terminal-error path for something that is a normal answer.
  res.json(result)
}))

app.delete('/api/vouchers/redemption', requireAuthenticated, wrap(async (req, res) => {
  res.json(await releaseVoucher(req.identity.id))
}))

app.get('/api/vouchers/mine', requireAuthenticated, wrap(async (req, res) => {
  res.json({ redemption: await myVoucher(req.identity.id) })
}))

/* ── Study Together ──────────────────────────────────────────────────────── */

app.post('/api/study-rooms', requireAuthenticated, wrap(async (req, res) => {
  res.json(await createRoom(req.identity.id, req.body ?? {}))
}))

app.post('/api/study-rooms/join', requireAuthenticated, wrap(async (req, res) => {
  res.json(await joinRoom(req.identity.id, req.body?.code))
}))

app.get('/api/study-rooms/mine', requireAuthenticated, wrap(async (req, res) => {
  res.json({ rooms: await myRooms(req.identity.id) })
}))

app.get('/api/study-rooms/:id', requireAuthenticated, wrap(async (req, res) => {
  const room = await roomFor(req.identity.id, req.params.id)
  // A non-member gets the same answer as a non-existent room: whether a room
  // exists is not something a stranger should be able to probe.
  if (!room) return res.status(404).json({ error: 'room not found' })
  res.json({ room })
}))

app.post('/api/study-rooms/:id/start', requireAuthenticated, wrap(async (req, res) => {
  res.json(await startRoom(req.identity.id, req.params.id))
}))

app.post('/api/study-rooms/:id/answers', requireAuthenticated, wrap(async (req, res) => {
  res.json(await submitAnswer(req.identity.id, req.params.id, req.body ?? {}))
}))

app.post('/api/study-rooms/:id/finish', requireAuthenticated, wrap(async (req, res) => {
  res.json(await finishRoom(req.identity.id, req.params.id))
}))

/* ── State store (mirrors localStorage keys) ─────────────────────────────── */

// Shared catalogue documents that students need in order to use the learning
// product. All other shared documents (reports, imports, email logs, settings)
// remain admin-only even when a key is guessed.
const STUDENT_READABLE_STATE = new Set([
  'synapse-academic-universities-v1',
  'synapse-course-curricula-v1',
  'synapse-module-schedules-v1',
  'synapse-admin-content-ledger-v4',
  'synapse-concept-graph-v2',
  'synapse-relation-types-v1',
  'synapse-taxonomy-tree-v4',
  'synapse-medical-library-taxonomy-v1',
  // The bilingual glossary behind /app/taxonomy. Admin-written, student-read.
  'synapse-medical-glossary-v1',
  'synapse-medical-evidence-published-v1',
  'synapse-plans-v1',
  'synapse-notification-campaigns-v1',
  'synapse-vouchers-v1',
  'synapse-system-colors-v1',
])

// Bulk hydrate on app boot.
app.get('/api/state', requireAdmin, wrap(async (_req, res) => {
  const [rows] = await pool.query('SELECT k, v FROM app_state')
  const out = {}
  for (const r of rows) { try { out[r.k] = JSON.parse(r.v) } catch { out[r.k] = null } }
  res.json(out)
}))

app.get('/api/state/:key', wrap(async (req, res) => {
  if (!STUDENT_READABLE_STATE.has(req.params.key)) {
    if (req.identity?.role !== 'admin') return res.status(403).json({ error: 'admin role required' })
    if (!mfaSatisfied(req.identity)) return res.status(403).json({ error: 'mfa_required' })
  }
  // `updatedAt` lets the client decide whether its crash-recovery copy is newer
  // than the stored document. Without it a stale browser silently wins and
  // re-uploads old data over a newer server-side write.
  const [rows] = await pool.query('SELECT v, updated_at AS updatedAt FROM app_state WHERE k = ?', [req.params.key])
  if (!rows.length) return res.json({ value: null, updatedAt: null })
  try { res.json({ value: JSON.parse(rows[0].v), updatedAt: rows[0].updatedAt }) } catch { res.json({ value: null, updatedAt: rows[0].updatedAt }) }
}))

app.put('/api/state/:key', requireAdmin, wrap(async (req, res) => {
  const v = JSON.stringify(req.body?.value ?? null)
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [current] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [req.params.key])
    if (!current.length || current[0].v !== v) {
      await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [req.params.key, v, req.identity.id])
      await conn.query(
        'INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)',
        [req.params.key, v],
      )
    }
    await conn.commit()
    invalidateSnapshots(req.params.key)
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
  res.json({ ok: true })
}))

app.delete('/api/state/:key', requireAdmin, wrap(async (req, res) => {
  await pool.query('DELETE FROM app_state WHERE k = ?', [req.params.key])
  invalidateSnapshots(req.params.key)
  res.json({ ok: true })
}))

/* ── Private, per-user state ─────────────────────────────────────────────── */

app.get('/api/user-state/:key', wrap(async (req, res) => {
  const [rows] = await pool.query(
    'SELECT v, updated_at AS updatedAt FROM user_state WHERE user_id = ? AND k = ?',
    [req.identity.id, req.params.key],
  )
  if (!rows.length) return res.json({ value: null, updatedAt: null })
  try { res.json({ value: JSON.parse(rows[0].v), updatedAt: rows[0].updatedAt }) } catch { res.json({ value: null, updatedAt: rows[0].updatedAt }) }
}))

app.put('/api/user-state/:key', wrap(async (req, res) => {
  const v = JSON.stringify(req.body?.value ?? null)
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [current] = await conn.query(
      'SELECT v FROM user_state WHERE user_id = ? AND k = ? FOR UPDATE',
      [req.identity.id, req.params.key],
    )
    if (!current.length || current[0].v !== v) {
      await conn.query(
        'INSERT INTO user_state_versions (user_id, k, v) VALUES (?, ?, ?)',
        [req.identity.id, req.params.key, v],
      )
      await conn.query(
        `INSERT INTO user_state (user_id, k, v) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE v = VALUES(v)`,
        [req.identity.id, req.params.key, v],
      )
    }
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
  res.json({ ok: true })
}))

app.delete('/api/user-state/:key', wrap(async (req, res) => {
  await pool.query('DELETE FROM user_state WHERE user_id = ? AND k = ?', [req.identity.id, req.params.key])
  res.json({ ok: true })
}))

// Student accounts can read shared catalogue state, but operational records and
// mailbox contents remain admin-only even if a route is guessed manually.
app.use(['/api/students', '/api/mailboxes', '/api/mail'], requireAdmin)

/* ── Roles and recoverable snapshots ───────────────────────────────────── */

/* ── Account administration ────────────────────────────────────────────────
   Every route here is admin-only and every mutating one requires a written
   reason, which is stored beside the change. These actions decide whether a
   person can sign in and what they have paid for; an audit trail that says who
   and why is the difference between an administrative record and a mystery. */

app.get('/api/admin/users', requireAdmin, wrap(async (req, res) => {
  res.json(await listUsers({
    query: req.query.q ? String(req.query.q) : undefined,
    status: req.query.status ? String(req.query.status) : undefined,
    plan: req.query.plan ? String(req.query.plan) : undefined,
    universityId: req.query.universityId ? String(req.query.universityId) : undefined,
    accessStatus: req.query.accessStatus ? String(req.query.accessStatus) : undefined,
    limit: Math.min(Number(req.query.limit) || 200, 1000),
  }))
}))

app.get('/api/admin/users/capabilities', requireAdmin, (_req, res) => {
  // The UI asks before it offers. A reset button that cannot work should be
  // explained on the screen, not discovered when someone presses it.
  res.json({ passwordReset: passwordResetConfigured })
})

app.get('/api/admin/users/:id', requireAdmin, wrap(async (req, res) => {
  const user = await getUser(req.params.id)
  if (!user) return res.status(404).json({ error: 'user not found' })
  res.json(user)
}))

app.patch('/api/admin/users/:id', requireAdmin, wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const fields = ['name', 'email', 'university_id', 'year', 'study_group', 'notes']
  const updates = []
  const params = []
  for (const [key, column] of [['name', 'name'], ['email', 'email'], ['universityId', 'university_id'], ['year', 'year'], ['group', 'study_group'], ['notes', 'notes']]) {
    if (req.body?.[key] !== undefined && fields.includes(column)) { updates.push(`${column} = ?`); params.push(req.body[key] || null) }
  }
  if (!updates.length) return res.status(400).json({ error: 'nothing to update' })
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [rows] = await conn.query('SELECT id FROM students WHERE id = ? FOR UPDATE', [req.params.id])
    if (!rows.length) { await conn.rollback(); return res.status(404).json({ error: 'no profile to update' }) }
    await conn.query(`UPDATE students SET ${updates.join(', ')} WHERE id = ?`, [...params, req.params.id])
    await recordAction(conn, { studentId: req.params.id, action: 'profile.update', detail: updates.join(', '), reason, actorId: req.identity.id })
    await conn.commit()
    res.json({ ok: true })
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}))

app.post('/api/admin/users/:id/subscription', requireAdmin, wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const plan = String(req.body?.plan || '').trim()
  if (!plan) return res.status(400).json({ error: 'plan is required' })
  const days = req.body?.days === null || req.body?.days === undefined ? null : Number(req.body.days)
  if (days !== null && (!Number.isFinite(days) || days <= 0 || days > 3650)) {
    return res.status(400).json({ error: 'days must be between 1 and 3650, or null for open-ended' })
  }
  const result = await grantSubscription(req.params.id, {
    plan, days, source: req.body?.source, note: req.body?.note, reason, actorId: req.identity.id,
  })
  if (result.error) return res.status(404).json({ error: result.error })
  res.json(result)
}))

app.post('/api/admin/users/:id/subscription/cancel', requireAdmin, wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const result = await cancelSubscription(req.params.id, {
    reason, actorId: req.identity.id, immediate: Boolean(req.body?.immediate),
  })
  if (result.error) return res.status(result.error === 'no_subscription' ? 409 : 404).json({ error: result.error })
  res.json(result)
}))

app.post('/api/admin/users/:id/access', requireAdmin, wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const status = req.body?.status
  if (!['active', 'suspended'].includes(status)) return res.status(400).json({ error: 'status must be active or suspended' })
  const result = await setAccessStatus(req.params.id, { status, reason, actorId: req.identity.id })
  if (result.error === 'no_identity') return res.status(409).json({ error: 'this person has never signed in, so there is no account to suspend' })
  if (result.error === 'cannot_suspend_admin') return res.status(409).json({ error: 'demote this admin before suspending the account' })
  if (result.error) return res.status(404).json({ error: result.error })
  res.json(result)
}))

app.post('/api/admin/users/:id/password-reset', requireAdmin, wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  const result = await requestPasswordReset(req.params.id, { reason, actorId: req.identity.id })
  if (result.error === 'supabase_not_configured') {
    return res.status(503).json({ error: 'password resets need SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server' })
  }
  if (result.error === 'no_email') return res.status(409).json({ error: 'this account has no email address to send a reset to' })
  if (result.error === 'supabase_rejected') return res.status(502).json({ error: `Supabase refused the request (${result.status})` })
  if (result.error) return res.status(404).json({ error: result.error })
  res.json(result)
}))

app.get('/api/admin/users/:id/activity', requireAdmin, wrap(async (req, res) => {
  // Keyed on the Supabase user id, because `user_state` is written by the app
  // under the signed-in identity. A roster row that has never signed in owns no
  // state, and reports none rather than erroring.
  const user = await getUser(req.params.id)
  if (!user) return res.status(404).json({ error: 'user not found' })
  res.json(await getUserActivity(user.identity?.userId ?? null))
}))

app.post('/api/admin/users/:id/role', requireAdmin, wrap(async (req, res) => {
  const reason = readReason(req.body)
  if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
  if (req.params.id === req.identity.id) return res.status(409).json({ error: 'you cannot change your own role' })
  const result = await setRole(req.params.id, { role: req.body?.role, reason, actorId: req.identity.id })
  const REFUSALS = {
    invalid_role: [400, 'role must be student or admin'],
    no_identity: [409, 'this person has never signed in, so there is no role to change'],
    suspended: [409, 'reactivate this account before changing its role'],
    unchanged: [409, 'that is already their role'],
    last_admin: [409, 'this is the last active admin — promote someone else first'],
    not_found: [404, 'user not found'],
  }
  if (result.error) {
    const [status, message] = REFUSALS[result.error] ?? [400, result.error]
    return res.status(status).json({ error: message })
  }
  res.json(result)
}))

app.get('/api/access/users', requireAdmin, wrap(async (_req, res) => {
  const [rows] = await pool.query(
    'SELECT user_id AS userId, email, role, status, promoted_by AS promotedBy, promoted_at AS promotedAt, created_at AS createdAt FROM user_access ORDER BY created_at DESC',
  )
  res.json(rows)
}))

app.post('/api/access/users/:userId/promote', requireAdmin, wrap(async (req, res) => {
  const role = req.body?.role
  const reason = String(req.body?.reason || '').trim()
  if (!['student', 'admin'].includes(role)) return res.status(400).json({ error: 'invalid role' })
  if (reason.length < 8) return res.status(400).json({ error: 'promotion reason must be explicit' })

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [rows] = await conn.query('SELECT role, status FROM user_access WHERE user_id = ? FOR UPDATE', [req.params.userId])
    if (!rows.length) {
      await conn.rollback()
      return res.status(404).json({ error: 'user not found' })
    }
    if (rows[0].status !== 'active') {
      await conn.rollback()
      return res.status(409).json({ error: 'suspended account must be reactivated before role changes' })
    }
    const previousRole = rows[0].role
    await conn.query(
      'UPDATE user_access SET role = ?, promoted_by = ?, promoted_at = NOW() WHERE user_id = ?',
      [role, req.identity.id, req.params.userId],
    )
    await conn.query(
      'INSERT INTO role_promotion_audit (user_id, previous_role, next_role, promoted_by, reason) VALUES (?, ?, ?, ?, ?)',
      [req.params.userId, previousRole, role, req.identity.id, reason],
    )
    await conn.commit()
    res.json({ ok: true })
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}))

app.get('/api/backups', requireAdmin, wrap(async (_req, res) => {
  const [rows] = await pool.query(
    'SELECT id, label, created_by AS createdBy, created_at AS createdAt, OCTET_LENGTH(snapshot_json) AS sizeBytes FROM data_snapshots ORDER BY created_at DESC LIMIT 50',
  )
  res.json(rows)
}))

async function createDataSnapshot(label, createdBy) {
  // Snapshot current recoverable state, not the append-only version ledgers.
  // Including those ledgers duplicates large historical JSON documents inside
  // one packet and can exceed MariaDB's max_allowed_packet as the library grows.
  const tables = ['schema_migrations', 'app_state', 'user_state', 'students', 'mailboxes', 'emails', 'attachments', 'user_access', 'role_promotion_audit']
  const snapshot = { schemaVersion: 1, createdAt: new Date().toISOString(), tables: {} }
  for (const table of tables) {
    const [rows] = await pool.query(`SELECT * FROM ${table}`)
    snapshot.tables[table] = rows
  }
  const id = `snapshot-${randomUUID()}`
  await pool.query(
    'INSERT INTO data_snapshots (id, label, snapshot_json, created_by) VALUES (?, ?, ?, ?)',
    [id, String(label).slice(0, 255), JSON.stringify(snapshot), createdBy],
  )
  return { id, label }
}

async function readMedicalLibraryLaunchData() {
  return JSON.parse(await readFile(LAUNCH_DATA_PATH, 'utf8'))
}

/** Read-only launch preflight. It never changes production data. */
app.get('/api/launch/medical-library-v1/preview', requireAdmin, wrap(async (_req, res) => {
  const launch = await readMedicalLibraryLaunchData()
  const [migration] = await pool.query('SELECT id, applied_at AS appliedAt FROM schema_migrations WHERE id = ?', [launch.migrationId])
  const keys = Object.keys(launch.states)
  const [stateRows] = await pool.query('SELECT k, OCTET_LENGTH(v) AS sizeBytes, updated_at AS updatedAt FROM app_state WHERE k IN (?)', [keys])
  res.json({
    migrationId: launch.migrationId,
    alreadyApplied: Boolean(migration.length),
    appliedAt: migration[0]?.appliedAt || null,
    report: launch.report,
    statesToReplace: keys,
    existingStates: stateRows,
  })
}))

/* ── Medical library coverage review (admin-only) ───────────────────────── */

app.get('/api/medical-library/coverage/summary', requireAdmin, wrap(async (_req, res) => {
  const [[totals], destinations, systems, sourceStates, collections] = await Promise.all([
    pool.query('SELECT COUNT(*) AS candidates, COUNT(DISTINCT source_id) AS candidateSources FROM medical_library_candidate_coverage').then(([rows]) => rows),
    pool.query('SELECT destination, COUNT(*) AS count FROM medical_library_candidate_coverage GROUP BY destination ORDER BY count DESC').then(([rows]) => rows),
    pool.query('SELECT system_id AS systemId, COUNT(*) AS count FROM medical_library_candidate_coverage GROUP BY system_id ORDER BY count DESC').then(([rows]) => rows),
    pool.query('SELECT availability_status AS status, COUNT(*) AS count FROM medical_library_source_availability GROUP BY availability_status ORDER BY count DESC').then(([rows]) => rows),
    pool.query('SELECT collection_id AS collectionId, COUNT(*) AS count FROM medical_library_source_availability GROUP BY collection_id ORDER BY count DESC').then(([rows]) => rows),
  ])
  res.json({
    candidates: Number(totals?.candidates || 0),
    candidateSources: Number(totals?.candidateSources || 0),
    destinations: destinations.map((row) => ({ ...row, count: Number(row.count) })),
    systems: systems.map((row) => ({ ...row, count: Number(row.count) })),
    sourceStates: sourceStates.map((row) => ({ ...row, count: Number(row.count) })),
    collections: collections.map((row) => ({ ...row, count: Number(row.count) })),
  })
}))

app.get('/api/medical-library/coverage/candidates', requireAdmin, wrap(async (req, res) => {
  const page = Math.max(1, Number.parseInt(String(req.query.page || '1'), 10) || 1)
  const pageSize = Math.min(100, Math.max(10, Number.parseInt(String(req.query.pageSize || '50'), 10) || 50))
  const destination = String(req.query.destination || '').trim()
  const systemId = String(req.query.systemId || '').trim()
  const sourceId = String(req.query.sourceId || '').trim()
  const search = String(req.query.search || '').trim().slice(0, 160)
  const where = []
  const params = []
  if (destination) { where.push('destination = ?'); params.push(destination) }
  if (systemId) { where.push('system_id = ?'); params.push(systemId) }
  if (sourceId) { where.push('source_id = ?'); params.push(sourceId) }
  if (search) {
    where.push('(label LIKE ? OR statement LIKE ? OR candidate_id LIKE ? OR source_id LIKE ?)')
    const like = `%${search}%`
    params.push(like, like, like, like)
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : ''
  const [[countRow]] = await pool.query(`SELECT COUNT(*) AS total FROM medical_library_candidate_coverage ${clause}`, params)
  const [rows] = await pool.query(
    `SELECT candidate_id AS candidateId, source_id AS sourceId, system_id AS systemId,
       subject, topic, subtopic, microtopic, label, statement, concept_type AS conceptType,
       risk_class AS riskClass, confidence, destination, reason_code AS reasonCode, reason,
       target_concept_id AS targetConceptId, resource_relative_path AS resourceRelativePath,
       locator_page AS locatorPage, locator_printed_page AS locatorPrintedPage,
       locator_section AS locatorSection, locator_start AS locatorStart, locator_end AS locatorEnd,
       coverage_unit_id AS coverageUnitId, support_span AS supportSpan
     FROM medical_library_candidate_coverage ${clause}
     ORDER BY system_id, source_id, candidate_id LIMIT ? OFFSET ?`,
    [...params, pageSize, (page - 1) * pageSize],
  )
  res.json({
    page,
    pageSize,
    total: Number(countRow.total || 0),
    items: rows.map((row) => ({ ...row, confidence: row.confidence == null ? null : Number(row.confidence) })),
  })
}))

app.get('/api/medical-library/coverage/sources', requireAdmin, wrap(async (req, res) => {
  const collectionId = String(req.query.collectionId || '').trim()
  const status = String(req.query.status || '').trim()
  const where = []
  const params = []
  if (collectionId) { where.push('collection_id = ?'); params.push(collectionId) }
  if (status) { where.push('availability_status = ?'); params.push(status) }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : ''
  const [rows] = await pool.query(
    `SELECT source_id AS sourceId, collection_id AS collectionId, relative_path AS relativePath,
       availability_status AS status FROM medical_library_source_availability ${clause}
     ORDER BY collection_id, relative_path, source_id`,
    params,
  )
  res.json({ items: rows })
}))

async function medicalResourceRecords() {
  if (medicalResourceSnapshot) return medicalResourceSnapshot.resources
  if (!medicalResourceLoad) {
    medicalResourceLoad = (async () => {
      const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [MEDICAL_EVIDENCE_STATE_KEY])
      const resources = rows.length ? JSON.parse(rows[0].v).resources ?? [] : []
      medicalResourceSnapshot = {
        resources,
        byId: new Map(resources.map((resource) => [resource.id, resource])),
      }
      return medicalResourceSnapshot
    })().finally(() => { medicalResourceLoad = null })
  }
  return (await medicalResourceLoad).resources
}

async function resourceRecord(resourceId) {
  await medicalResourceRecords()
  return medicalResourceSnapshot?.byId.get(resourceId) || null
}

function resolvedResourcePath(storageKey) {
  if (!storageKey || typeof storageKey !== 'string' || storageKey.includes('\0')) return null
  const fullPath = resolve(RESOURCE_STORAGE_DIR, storageKey)
  return fullPath.startsWith(`${RESOURCE_STORAGE_DIR}${sep}`) ? fullPath : null
}

function resolvedChunkUploadPath(resourceId, uploadId) {
  if (!/^[a-zA-Z0-9_-]{8,80}$/.test(uploadId)) return null
  const safeResourceId = String(resourceId).replace(/[^a-zA-Z0-9_-]/g, '_')
  const uploadPath = resolve(RESOURCE_STORAGE_DIR, '.__uploads', safeResourceId, uploadId)
  return uploadPath.startsWith(`${RESOURCE_STORAGE_DIR}${sep}`) ? uploadPath : null
}

/** Remove interrupted upload work only after every stored resource is live. */
app.post('/api/medical-resources/cleanup-uploads', requireAdmin, wrap(async (_req, res) => {
  const storedResources = (await medicalResourceRecords()).filter((resource) => resource.storageKey)
  if (!storedResources.length) return res.status(409).json({ error: 'no qualified stored resources are registered' })
  const missingResourceIds = storedResources
    .filter((resource) => {
      const fullPath = resolvedResourcePath(resource.storageKey)
      return !fullPath || !existsSync(fullPath)
    })
    .map((resource) => resource.id)
  if (missingResourceIds.length) return res.status(409).json({ error: 'qualified resources are still pending upload', missingResourceIds })
  await rm(resolve(RESOURCE_STORAGE_DIR, '.__uploads'), { recursive: true, force: true })
  res.json({ ok: true, storedResources: storedResources.length })
}))

app.get('/api/medical-resources/:resourceId/status', requireAuthenticated, wrap(async (req, res) => {
  const resource = await resourceRecord(req.params.resourceId)
  if (!resource) return res.status(404).json({ error: 'resource not found' })
  const fullPath = resolvedResourcePath(resource.storageKey)
  res.json({
    id: resource.id,
    available: Boolean(fullPath && existsSync(fullPath)),
    externalUrl: resource.sourceUri || null,
    storageKey: req.identity.role === 'admin' ? resource.storageKey || null : undefined,
  })
}))

app.get('/api/medical-resources/:resourceId', requireAuthenticated, wrap(async (req, res) => {
  const resource = await resourceRecord(req.params.resourceId)
  if (!resource) return res.status(404).json({ error: 'resource not found' })
  if (resource.sourceUri) return res.redirect(302, resource.sourceUri)
  const fullPath = resolvedResourcePath(resource.storageKey)
  if (!fullPath || !existsSync(fullPath)) return res.status(404).json({ error: 'resource file is pending secure upload' })
  res.setHeader('Content-Type', resource.mediaType === 'pdf' ? 'application/pdf' : 'application/octet-stream')
  res.setHeader('Content-Disposition', `inline; filename="${basename(resource.title).replace(/["\r\n]/g, '')}"`)
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.sendFile(fullPath)
}))

app.put('/api/medical-resources/:resourceId/file', requireAdmin, wrap(async (req, res) => {
  const resource = await resourceRecord(req.params.resourceId)
  if (!resource) return res.status(404).json({ error: 'resource not found' })
  const fullPath = resolvedResourcePath(resource.storageKey)
  if (!fullPath) return res.status(400).json({ error: 'resource has no valid authenticated storage key' })
  if (existsSync(fullPath)) return res.status(409).json({ error: 'resource is already uploaded; replacement requires a separate reviewed operation' })
  await mkdir(dirname(fullPath), { recursive: true })
  const temporaryPath = `${fullPath}.upload-${randomUUID()}`
  const hash = createHash('sha256')
  let sizeBytes = 0
  const meter = new Transform({
    transform(chunk, _encoding, callback) {
      sizeBytes += chunk.length
      if (sizeBytes > RESOURCE_MAX_BYTES) return callback(new Error(`resource exceeds ${RESOURCE_MAX_BYTES} byte limit`))
      hash.update(chunk)
      callback(null, chunk)
    },
  })
  try {
    await pipeline(req, meter, createWriteStream(temporaryPath, { flags: 'wx' }))
    const sha256 = hash.digest('hex')
    if (resource.sha256 && resource.sha256 !== sha256) throw new Error('uploaded file hash does not match the qualified source')
    await rename(temporaryPath, fullPath)
    res.json({ ok: true, id: resource.id, sizeBytes, sha256 })
  } catch (error) {
    await unlink(temporaryPath).catch(() => {})
    throw error
  }
}))

/**
 * Cloud delivery networks commonly cap a single request below textbook size.
 * These endpoints accept bounded chunks, then verify the reconstructed file
 * against the qualified source hash before it becomes visible to readers.
 */
app.put('/api/medical-resources/:resourceId/chunks/:uploadId/:index', requireAdmin, wrap(async (req, res) => {
  const resource = await resourceRecord(req.params.resourceId)
  if (!resource) return res.status(404).json({ error: 'resource not found' })
  const fullPath = resolvedResourcePath(resource.storageKey)
  if (!fullPath) return res.status(400).json({ error: 'resource has no valid authenticated storage key' })
  if (existsSync(fullPath)) return res.status(409).json({ error: 'resource is already uploaded' })
  const uploadPath = resolvedChunkUploadPath(resource.id, req.params.uploadId)
  const index = Number(req.params.index)
  if (!uploadPath || !Number.isInteger(index) || index < 0 || index > 1023) return res.status(400).json({ error: 'invalid chunk upload path' })
  const declaredLength = Number(req.header('content-length'))
  if (Number.isFinite(declaredLength) && declaredLength > RESOURCE_CHUNK_MAX_BYTES) return res.status(413).json({ error: 'chunk exceeds configured limit' })

  await mkdir(uploadPath, { recursive: true })
  const chunkPath = join(uploadPath, `${String(index).padStart(4, '0')}.part`)
  const temporaryPath = `${chunkPath}.upload-${randomUUID()}`
  let sizeBytes = 0
  const meter = new Transform({
    transform(chunk, _encoding, callback) {
      sizeBytes += chunk.length
      if (sizeBytes > RESOURCE_CHUNK_MAX_BYTES) return callback(new Error('chunk exceeds configured limit'))
      callback(null, chunk)
    },
  })
  try {
    await pipeline(req, meter, createWriteStream(temporaryPath, { flags: 'wx' }))
    await rename(temporaryPath, chunkPath)
    res.json({ ok: true, index, sizeBytes })
  } catch (error) {
    await unlink(temporaryPath).catch(() => {})
    throw error
  }
}))

app.post('/api/medical-resources/:resourceId/chunks/:uploadId/complete', requireAdmin, wrap(async (req, res) => {
  const resource = await resourceRecord(req.params.resourceId)
  if (!resource) return res.status(404).json({ error: 'resource not found' })
  const fullPath = resolvedResourcePath(resource.storageKey)
  if (!fullPath) return res.status(400).json({ error: 'resource has no valid authenticated storage key' })
  if (existsSync(fullPath)) return res.status(409).json({ error: 'resource is already uploaded' })
  const uploadPath = resolvedChunkUploadPath(resource.id, req.params.uploadId)
  const totalChunks = Number(req.body?.totalChunks)
  const declaredSize = Number(req.body?.sizeBytes)
  if (!uploadPath || !Number.isInteger(totalChunks) || totalChunks < 1 || totalChunks > 1024) return res.status(400).json({ error: 'invalid chunk count' })
  if (!Number.isFinite(declaredSize) || declaredSize < 1 || declaredSize > RESOURCE_CHUNKED_MAX_BYTES) return res.status(413).json({ error: 'resource exceeds configured chunked-upload limit' })

  const chunkPaths = Array.from({ length: totalChunks }, (_, index) => join(uploadPath, `${String(index).padStart(4, '0')}.part`))
  for (const chunkPath of chunkPaths) if (!existsSync(chunkPath)) return res.status(409).json({ error: `chunk ${basename(chunkPath, '.part')} is missing` })
  const measuredChunks = await Promise.all(chunkPaths.map((chunkPath) => stat(chunkPath)))
  if (measuredChunks.some((chunk) => chunk.size > RESOURCE_CHUNK_MAX_BYTES)) return res.status(413).json({ error: 'stored chunk exceeds configured limit' })
  if (measuredChunks.reduce((sum, chunk) => sum + chunk.size, 0) !== declaredSize) return res.status(409).json({ error: 'chunk sizes do not match the declared resource size' })

  await mkdir(dirname(fullPath), { recursive: true })
  const temporaryPath = `${fullPath}.assemble-${randomUUID()}`
  const hash = createHash('sha256')
  let sizeBytes = 0
  const output = createWriteStream(temporaryPath, { flags: 'wx' })
  try {
    for (const chunkPath of chunkPaths) {
      for await (const chunk of createReadStream(chunkPath)) {
        sizeBytes += chunk.length
        if (sizeBytes > RESOURCE_CHUNKED_MAX_BYTES) throw new Error('resource exceeds configured chunked-upload limit')
        hash.update(chunk)
        if (!output.write(chunk)) await once(output, 'drain')
      }
    }
    const closed = once(output, 'close')
    output.end()
    await closed
    const sha256 = hash.digest('hex')
    if (sizeBytes !== declaredSize) throw new Error('assembled resource size does not match the declaration')
    if (resource.sha256 && resource.sha256 !== sha256) throw new Error('assembled file hash does not match the qualified source')
    await rename(temporaryPath, fullPath)
    // A successful, hash-verified assembly makes every partial attempt for
    // this resource obsolete. Remove the resource's entire upload workspace
    // so interrupted retry profiles do not consume persistent-volume space.
    await rm(dirname(uploadPath), { recursive: true, force: true })
    res.json({ ok: true, id: resource.id, sizeBytes, sha256, chunks: totalChunks })
  } catch (error) {
    output.destroy()
    await unlink(temporaryPath).catch(() => {})
    throw error
  }
}))

app.post('/api/backups', requireAdmin, wrap(async (req, res) => {
  const label = req.body?.label || `Manual snapshot ${new Date().toISOString()}`
  res.json(await createDataSnapshot(label, req.identity.id))
}))

app.get('/api/backups/:id/download', requireAdmin, wrap(async (req, res) => {
  const [rows] = await pool.query(
    'SELECT label, snapshot_json AS snapshotJson FROM data_snapshots WHERE id = ?',
    [req.params.id],
  )
  if (!rows.length) return res.status(404).json({ error: 'snapshot not found' })
  const filename = `${req.params.id.replace(/[^a-zA-Z0-9_-]/g, '')}.json`
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
  res.send(rows[0].snapshotJson)
}))

/* ── Students ────────────────────────────────────────────────────────────── */

const STUDENT_COLS = 'id, name, email, university_id AS universityId, year, plan, status, joined, last_active AS lastActive, questions_answered AS questionsAnswered, accuracy, readiness'

app.get('/api/students', wrap(async (_req, res) => {
  const [rows] = await pool.query(`SELECT ${STUDENT_COLS} FROM students ORDER BY name`)
  res.json(rows)
}))

app.post('/api/students', wrap(async (req, res) => {
  const s = req.body || {}
  const id = s.id || `stu-${randomUUID().slice(0, 8)}`
  await pool.query(
    `INSERT INTO students (id, name, email, university_id, year, plan, status, joined, last_active, questions_answered, accuracy, readiness)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [id, s.name, s.email, s.universityId, s.year, s.plan, s.status, s.joined || null, s.lastActive || null, s.questionsAnswered || 0, s.accuracy || 0, s.readiness || 0],
  )
  res.json({ id })
}))

app.patch('/api/students/:id', wrap(async (req, res) => {
  const allowed = { name: 'name', email: 'email', universityId: 'university_id', year: 'year', plan: 'plan', status: 'status', lastActive: 'last_active', questionsAnswered: 'questions_answered', accuracy: 'accuracy', readiness: 'readiness' }
  const sets = [], vals = []
  for (const [k, col] of Object.entries(allowed)) if (k in (req.body || {})) { sets.push(`${col} = ?`); vals.push(req.body[k]) }
  if (sets.length) { vals.push(req.params.id); await pool.query(`UPDATE students SET ${sets.join(', ')} WHERE id = ?`, vals) }
  res.json({ ok: true })
}))

app.delete('/api/students/:id', wrap(async (req, res) => {
  await pool.query('DELETE FROM students WHERE id = ?', [req.params.id])
  res.json({ ok: true })
}))

/* ── Mail ────────────────────────────────────────────────────────────────── */

app.get('/api/mailboxes', wrap(async (_req, res) => {
  const [rows] = await pool.query('SELECT address, label, created_at AS createdAt FROM mailboxes ORDER BY created_at')
  res.json(rows)
}))
app.post('/api/mailboxes', wrap(async (req, res) => {
  const { address, label } = req.body || {}
  if (!address) return res.status(400).json({ error: 'address required' })
  await pool.query('INSERT IGNORE INTO mailboxes (address, label) VALUES (?, ?)', [address, label || address])
  res.json({ ok: true })
}))

app.get('/api/mail', wrap(async (req, res) => {
  const { box, dir } = req.query
  const where = [], vals = []
  if (box) { where.push('mailbox = ?'); vals.push(box) }
  if (dir === 'inbox') where.push("direction = 'inbound'")
  if (dir === 'outbox') where.push("direction = 'outbound'")
  const sql = `SELECT id, direction, mailbox, from_addr AS fromAddr, to_addr AS toAddr, subject, status, at,
    (SELECT COUNT(*) FROM attachments a WHERE a.email_id = e.id) AS attachmentCount
    FROM emails e ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY COALESCE(at, created_at) DESC LIMIT 500`
  const [rows] = await pool.query(sql, vals)
  res.json(rows)
}))

app.get('/api/mail/:id', wrap(async (req, res) => {
  const [rows] = await pool.query('SELECT id, direction, mailbox, from_addr AS fromAddr, to_addr AS toAddr, cc, bcc, subject, html, text, status, at FROM emails WHERE id = ?', [req.params.id])
  if (!rows.length) return res.status(404).json({ error: 'not found' })
  const [atts] = await pool.query('SELECT id, filename, content_type AS contentType, size_bytes AS sizeBytes FROM attachments WHERE email_id = ?', [req.params.id])
  res.json({ ...rows[0], attachments: atts })
}))

app.get('/api/mail/attachment/:id', wrap(async (req, res) => {
  const [rows] = await pool.query('SELECT filename, content_type AS contentType, content_b64 AS b64, storage_url AS url FROM attachments WHERE id = ?', [req.params.id])
  if (!rows.length) return res.status(404).json({ error: 'not found' })
  const a = rows[0]
  if (a.url) return res.redirect(a.url)
  res.setHeader('Content-Type', a.contentType || 'application/octet-stream')
  res.setHeader('Content-Disposition', `attachment; filename="${a.filename || 'file'}"`)
  res.send(Buffer.from(a.b64 || '', 'base64'))
}))

// Send + record. attachments: [{ filename, contentType, content_b64 }]
app.post('/api/mail/send', wrap(async (req, res) => {
  const { from, to, cc, bcc, subject, html, text, attachments = [] } = req.body || {}
  if (!to || !subject) return res.status(400).json({ error: 'to and subject required' })
  const fromAddr = from || MAIL_FROM
  const id = `mail-${randomUUID().slice(0, 12)}`
  let status = 'Queued', resendId = null
  if (resend) {
    const { data, error } = await resend.emails.send({
      from: fromAddr, to: Array.isArray(to) ? to : [to], cc, bcc, subject, html: html || undefined, text: text || undefined,
      attachments: attachments.map((a) => ({ filename: a.filename, content: a.content_b64 })),
    })
    if (error) return res.status(502).json({ error: error.message })
    status = 'Sent'; resendId = data?.id ?? null
  }
  await pool.query(
    'INSERT INTO emails (id, direction, mailbox, from_addr, to_addr, cc, bcc, subject, html, text, status, resend_id, at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW())',
    [id, 'outbound', fromAddr, fromAddr, Array.isArray(to) ? to.join(', ') : to, cc || null, bcc || null, subject, html || null, text || null, status, resendId],
  )
  for (const a of attachments) {
    await pool.query('INSERT INTO attachments (id, email_id, filename, content_type, size_bytes, content_b64) VALUES (?,?,?,?,?,?)',
      [`att-${randomUUID().slice(0, 12)}`, id, a.filename, a.contentType || 'application/octet-stream', a.size || 0, a.content_b64 || null])
  }
  res.json({ id, status, resendId })
}))

// Verified Resend email.received webhook → retrieve and store the complete
// message. Webhook events contain metadata only, so the Receiving API is used
// for the body and signed attachment downloads.
app.post('/api/webhooks/resend/inbound', wrap(async (req, res) => {
  if (!resendReceiving) return res.status(503).json({ error: 'Resend receiving is not configured' })
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET
  if (!webhookSecret) return res.status(503).json({ error: 'Resend webhook verification is not configured' })

  let event
  try {
    event = resendReceiving.webhooks.verify({
      payload: req.rawBody || JSON.stringify(req.body || {}),
      headers: {
        id: req.header('svix-id') || '',
        timestamp: req.header('svix-timestamp') || '',
        signature: req.header('svix-signature') || '',
      },
      webhookSecret,
    })
  } catch {
    return res.status(401).json({ error: 'invalid webhook signature' })
  }

  if (event.type !== 'email.received') return res.json({ ok: true, ignored: true })
  const p = event.data
  const { data: received, error } = await resendReceiving.emails.receiving.get(p.email_id)
  if (error || !received) throw new Error(error?.message || 'Could not retrieve received email')

  const id = `mail-in-${p.email_id}`
  const to = received.to?.length ? received.to : p.to
  const toAddr = to.join(', ')
  const mailbox = (toAddr.split(',')[0] || '').trim()
  await pool.query(
    `INSERT INTO emails (id, direction, mailbox, from_addr, to_addr, cc, bcc, subject, html, text, status, resend_id, at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE from_addr=VALUES(from_addr), to_addr=VALUES(to_addr), cc=VALUES(cc), bcc=VALUES(bcc),
       subject=VALUES(subject), html=VALUES(html), text=VALUES(text), status=VALUES(status), at=VALUES(at)`,
    [id, 'inbound', mailbox, received.from || p.from || '', toAddr, received.cc?.join(', ') || null,
      received.bcc?.join(', ') || null, received.subject || p.subject || '', received.html || null,
      received.text || null, 'Received', p.email_id, toMariaDbDate(received.created_at || p.created_at)],
  )

  for (const a of received.attachments || []) {
    const { data: attachment, error: attachmentError } = await resendReceiving.emails.receiving.attachments.get({
      emailId: p.email_id,
      id: a.id,
    })
    if (attachmentError || !attachment?.download_url) throw new Error(attachmentError?.message || `Could not retrieve attachment ${a.id}`)
    const download = await fetch(attachment.download_url)
    if (!download.ok) throw new Error(`Could not download attachment ${a.id}: ${download.status}`)
    const b64 = Buffer.from(await download.arrayBuffer()).toString('base64')
    await pool.query(
      `INSERT INTO attachments (id, email_id, filename, content_type, size_bytes, content_b64) VALUES (?,?,?,?,?,?)
       ON DUPLICATE KEY UPDATE filename=VALUES(filename), content_type=VALUES(content_type), size_bytes=VALUES(size_bytes), content_b64=VALUES(content_b64)`,
      [`att-in-${a.id}`, id, a.filename || 'attachment', a.content_type || 'application/octet-stream', a.size || 0, b64],
    )
  }
  res.json({ ok: true })
}))

/* ── Serve the built SPA (single-origin deploy) ──────────────────────────────
 * If a ../public folder exists (the Vite build, copied in by the Dockerfile),
 * serve it and fall back to index.html for client-side routes. When it's absent
 * (API-only deploy), these are no-ops. */
const PUBLIC_DIR = process.env.PUBLIC_DIR || join(__dirname, '..', 'public')
if (existsSync(join(PUBLIC_DIR, 'index.html'))) {
  app.use('/assets', express.static(join(PUBLIC_DIR, 'assets'), { index: false, maxAge: '1y', immutable: true }))
  app.use(express.static(PUBLIC_DIR, {
    index: false,
    maxAge: '1h',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache')
    },
  }))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(join(PUBLIC_DIR, 'index.html'))
  })
  console.log('Serving SPA from', PUBLIC_DIR)
}

const port = Number(process.env.PORT) || 8080
migrate()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Synapse on :${port}`)
      void medicalResourceRecords()
        .then((resources) => console.log(`Medical resource index ready (${resources.length} records)`))
        .catch((error) => console.error('Medical resource index warm-up failed:', error.message))
    })
    // Recovery-point creation must never prevent the HTTP server from coming
    // online. A backup failure is reported for operators but is non-fatal.
    try {
      const [recent] = await pool.query(
        "SELECT id FROM data_snapshots WHERE created_at >= NOW() - INTERVAL 24 HOUR AND created_by = 'system:daily' LIMIT 1",
      )
      if (!recent.length) await createDataSnapshot(`Daily recovery point ${new Date().toISOString()}`, 'system:daily')
    } catch (error) {
      console.error('Daily recovery snapshot skipped:', error.message)
    }
  })
  .catch((e) => { console.error('startup failed (DB unreachable?):', e.message); process.exit(1) })
