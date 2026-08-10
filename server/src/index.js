import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { existsSync } from 'node:fs'
import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import { pool, migrate } from './db.js'
import { apiAuthGate, bypassEnabled, requireAdmin } from './auth.js'
import { toMariaDbDate } from './datetime.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
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

app.get('/api/health', (_req, res) => res.json({ ok: true, authBypass: bypassEnabled }))

app.get('/api/session', (req, res) => res.json({
  user: req.identity ? {
    id: req.identity.id,
    email: req.identity.email,
    role: req.identity.role,
    aal: req.identity.aal,
    bypass: req.identity.bypass,
  } : null,
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
  'synapse-taxonomy-tree-v3',
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
    if (!req.identity.bypass && req.identity.aal !== 'aal2') return res.status(403).json({ error: 'mfa_required' })
  }
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [req.params.key])
  if (!rows.length) return res.json({ value: null })
  try { res.json({ value: JSON.parse(rows[0].v) }) } catch { res.json({ value: null }) }
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
  res.json({ ok: true })
}))

/* ── Private, per-user state ─────────────────────────────────────────────── */

app.get('/api/user-state/:key', wrap(async (req, res) => {
  const [rows] = await pool.query(
    'SELECT v FROM user_state WHERE user_id = ? AND k = ?',
    [req.identity.id, req.params.key],
  )
  if (!rows.length) return res.json({ value: null })
  try { res.json({ value: JSON.parse(rows[0].v) }) } catch { res.json({ value: null }) }
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
  const tables = ['schema_migrations', 'app_state', 'app_state_versions', 'user_state', 'user_state_versions', 'students', 'mailboxes', 'emails', 'attachments', 'user_access', 'role_promotion_audit']
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
    const [recent] = await pool.query(
      "SELECT id FROM data_snapshots WHERE created_at >= NOW() - INTERVAL 24 HOUR AND created_by = 'system:daily' LIMIT 1",
    )
    if (!recent.length) await createDataSnapshot(`Daily recovery point ${new Date().toISOString()}`, 'system:daily')
    app.listen(port, () => console.log(`Synapse on :${port}`))
  })
  .catch((e) => { console.error('startup failed (DB unreachable?):', e.message); process.exit(1) })
