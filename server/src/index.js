import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { existsSync } from 'node:fs'
import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import { pool, migrate } from './db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? true }))
app.use(express.json({ limit: '25mb' }))

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const MAIL_FROM = process.env.MAIL_FROM || 'synapse@mail.doitrous.com'

/** Shared bearer-token gate (until real auth). Only /api is gated; the served
 *  website, health, and the inbound webhook are exempt. */
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) return next()
  if (req.path === '/api/health' || req.path === '/api/webhooks/resend/inbound') return next()
  const token = process.env.API_BEARER
  if (!token) return next() // no token configured → open (dev only)
  const auth = req.header('authorization') || ''
  if (auth === `Bearer ${token}`) return next()
  return res.status(401).json({ error: 'unauthorized' })
})

const wrap = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((e) => {
  console.error(e); res.status(500).json({ error: e.message || 'server error' })
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

/* ── State store (mirrors localStorage keys) ─────────────────────────────── */

// Bulk hydrate on app boot.
app.get('/api/state', wrap(async (_req, res) => {
  const [rows] = await pool.query('SELECT k, v FROM app_state')
  const out = {}
  for (const r of rows) { try { out[r.k] = JSON.parse(r.v) } catch { out[r.k] = null } }
  res.json(out)
}))

app.get('/api/state/:key', wrap(async (req, res) => {
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [req.params.key])
  if (!rows.length) return res.json({ value: null })
  try { res.json({ value: JSON.parse(rows[0].v) }) } catch { res.json({ value: null }) }
}))

app.put('/api/state/:key', wrap(async (req, res) => {
  const v = JSON.stringify(req.body?.value ?? null)
  await pool.query(
    'INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)',
    [req.params.key, v],
  )
  res.json({ ok: true })
}))

app.delete('/api/state/:key', wrap(async (req, res) => {
  await pool.query('DELETE FROM app_state WHERE k = ?', [req.params.key])
  res.json({ ok: true })
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

// Resend inbound webhook → store received mail + attachments.
app.post('/api/webhooks/resend/inbound', wrap(async (req, res) => {
  const p = req.body?.data || req.body || {}
  const id = `mail-${randomUUID().slice(0, 12)}`
  const toAddr = Array.isArray(p.to) ? p.to.join(', ') : (p.to || '')
  const mailbox = (toAddr.split(',')[0] || '').trim()
  await pool.query(
    'INSERT INTO emails (id, direction, mailbox, from_addr, to_addr, subject, html, text, status, at) VALUES (?,?,?,?,?,?,?,?,?,NOW())',
    [id, 'inbound', mailbox, p.from || '', toAddr, p.subject || '', p.html || null, p.text || null, 'Received'],
  )
  for (const a of p.attachments || []) {
    await pool.query('INSERT INTO attachments (id, email_id, filename, content_type, size_bytes, content_b64) VALUES (?,?,?,?,?,?)',
      [`att-${randomUUID().slice(0, 12)}`, id, a.filename, a.content_type || a.contentType || 'application/octet-stream', a.size || 0, a.content || a.content_b64 || null])
  }
  res.json({ ok: true })
}))

/* ── Serve the built SPA (single-origin deploy) ──────────────────────────────
 * If a ../public folder exists (the Vite build, copied in by the Dockerfile),
 * serve it and fall back to index.html for client-side routes. When it's absent
 * (API-only deploy), these are no-ops. */
const PUBLIC_DIR = process.env.PUBLIC_DIR || join(__dirname, '..', 'public')
if (existsSync(join(PUBLIC_DIR, 'index.html'))) {
  app.use(express.static(PUBLIC_DIR, { index: false, maxAge: '1h' }))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(join(PUBLIC_DIR, 'index.html'))
  })
  console.log('Serving SPA from', PUBLIC_DIR)
}

const port = Number(process.env.PORT) || 8080
migrate()
  .then(() => app.listen(port, () => console.log(`Synapse on :${port}`)))
  .catch((e) => { console.error('startup failed (DB unreachable?):', e.message); process.exit(1) })
