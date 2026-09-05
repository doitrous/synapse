/**
 * Unsubscribe (public, before the mailbox guard) and the console mailbox. The
 * sending itself lives in ../mail.js, which every other caller shares.
 */
import { toMariaDbDate } from '../datetime.js'
import { pool } from '../db.js'
import { wrap } from '../http.js'
import { applyUnsubscribe, resendReceiving, sendMail } from '../mail.js'

export function registerUnsubscribeRoutes(app) {
  // RFC 8058 one-click: the mail client POSTs this itself, with no human present.
  app.post('/api/unsubscribe', wrap(async (req, res) => {
    const token = req.query.token || (req.body && req.body.token)
    if (!token) return res.status(400).json({ error: 'token required' })
    const result = await applyUnsubscribe(String(token))
    if (!result) return res.status(404).json({ error: 'unknown token' })
    res.json({ ok: true, category: result.category })
  }))

  // The link a person clicks. The SPA renders the confirmation at /unsubscribe.
  app.get('/api/unsubscribe', wrap(async (req, res) => {
    const token = req.query.token
    if (!token) return res.status(400).json({ error: 'token required' })
    const result = await applyUnsubscribe(String(token))
    if (!result) return res.status(404).json({ error: 'unknown token' })
    res.json({ ok: true, category: result.category })
  }))
}

export function registerMailRoutes(app) {
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
    const result = await sendMail(req.body || {})
    if (result.error) return res.status(result.status ?? 400).json({ error: result.error })
    res.json(result)
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
}
