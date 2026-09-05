/**
 * Outbound and unsubscribed mail.
 *
 * `sendMail` used to live inside index.js, which is why `contact.js` and the
 * assistant's spend-cap alert could only log instead of send. It is a module
 * now, so every caller shares one suppression / one-click-unsubscribe /
 * logging path.
 */
import { randomUUID } from 'node:crypto'
import { Resend } from 'resend'
import { pool } from './db.js'
import { fromForCategory, unsubscribeMailtoAddress, replyToForCategory } from './mailFrom.js'
import { PUBLIC_ORIGIN } from './http.js'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const resendReceivingKey = process.env.RESEND_ADMIN_API_KEY || process.env.RESEND_API_KEY
const resendReceiving = resendReceivingKey ? new Resend(resendReceivingKey) : null

/**
 * Mail nobody asked to stop receiving.
 *
 * Transactional categories are never suppressed — a password reset is sent
 * because something happened to that account, and withholding it would harm the
 * reader rather than respect them. Everything else is checked against the
 * suppression list before it is sent, and a suppressed address is reported as
 * suppressed rather than quietly dropped.
 */
const TRANSACTIONAL_CATEGORIES = new Set(['Onboarding', 'Billing & subscription', 'Security & account', 'Privacy & data'])

async function isSuppressed(address, category) {
  if (!address || !category || TRANSACTIONAL_CATEGORIES.has(category)) return false
  const [rows] = await pool.query(
    'SELECT 1 FROM email_suppressions WHERE address = ? AND (category IS NULL OR category = ?) LIMIT 1',
    [String(address).toLowerCase(), category],
  )
  return rows.length > 0
}

/** Mint the opaque token an unsubscribe link carries, so no address rides in a URL. */
async function unsubscribeTokenFor(address, category) {
  const token = randomUUID().replace(/-/g, '') + randomUUID().replace(/-/g, '').slice(0, 16)
  await pool.query(
    'INSERT INTO email_unsubscribe_tokens (token, address, category) VALUES (?,?,?)',
    [token, String(address).toLowerCase(), category || null],
  )
  return token
}


/**
 * Unsubscribe.
 *
 * Deliberately public and deliberately before the admin guard: the reader is a
 * signed-out student clicking a link in their inbox, or Gmail's own one-click
 * control POSTing on their behalf. Requiring a session here would mean the
 * unsubscribe silently failed, which is exactly what "report spam" is for.
 *
 * The token is opaque and single-purpose, so no address travels in a URL and a
 * leaked link reveals nothing about who else is subscribed.
 */
export async function applyUnsubscribe(token) {
  const [rows] = await pool.query('SELECT address, category FROM email_unsubscribe_tokens WHERE token = ? LIMIT 1', [token])
  if (!rows.length) return null
  const { address, category } = rows[0]
  await pool.query(
    'INSERT INTO email_suppressions (id, address, category, reason) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE created_at = created_at',
    [`sup-${randomUUID().slice(0, 12)}`, address, category, 'unsubscribed'],
  )
  return { address, category }
}

/**
 * Send one email through Resend, applying suppression and one-click
 * unsubscribe, and log it. Extracted from the `/api/mail/send` handler so the
 * QotD reminder dispatch (and any future caller) shares the exact same
 * suppression/unsubscribe/logging path rather than forking it.
 *
 * Returns `{ id, status, resendId, suppressed? }` on success (`status` is
 * one of 'Suppressed' | 'Queued' | 'Sent'), or `{ error, status }` — a
 * message plus the HTTP status the caller should respond with — for the two
 * failure cases the old route handled inline (missing to/subject, Resend
 * error). Callers that are not an HTTP route (the reminder dispatch) just
 * check `result.status === 'Sent' || result.status === 'Queued'`.
 */
export async function sendMail({ from, to, cc, bcc, subject, html, text, category, headers = {}, attachments = [] }) {
  if (!to || !subject) return { error: 'to and subject required', status: 400 }
  const fromAddr = fromForCategory(category, from)
  const id = `mail-${randomUUID().slice(0, 12)}`
  const recipients = Array.isArray(to) ? to : [to]

  // Asked not to receive this? Then it is not sent, and the caller is told so
  // rather than being handed a success it can misread as delivery.
  const allowed = []
  for (const address of recipients) {
    if (await isSuppressed(address, category)) continue
    allowed.push(address)
  }
  if (recipients.length && !allowed.length) {
    return { id, status: 'Suppressed', resendId: null, suppressed: recipients.length }
  }

  // One-click unsubscribe. Gmail and Outlook surface their own control when these
  // headers are present, which is a far better outcome than the reader reaching
  // for "report spam" — the single strongest negative signal there is.
  const outHeaders = { ...headers }
  if (category && !TRANSACTIONAL_CATEGORIES.has(category) && allowed.length === 1) {
    const token = await unsubscribeTokenFor(allowed[0], category)
    const url = `${PUBLIC_ORIGIN}/unsubscribe?token=${token}`
    outHeaders['List-Unsubscribe'] = `<${url}>, <mailto:${unsubscribeMailtoAddress(category)}?subject=unsubscribe>`
    outHeaders['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click'
  }
  // Transactional mail goes out from a no-reply@ address on the mail
  // subdomain — Reply-To keeps a reply reaching the support inbox instead of
  // bouncing.
  const replyTo = replyToForCategory(category)

  let status = 'Queued', resendId = null
  if (resend) {
    const { data, error } = await resend.emails.send({
      from: fromAddr, to: allowed, cc, bcc, subject, html: html || undefined, text: text || undefined,
      headers: Object.keys(outHeaders).length ? outHeaders : undefined,
      replyTo: replyTo || undefined,
      attachments: attachments.map((a) => ({ filename: a.filename, content: a.content_b64 })),
    })
    if (error) return { error: error.message, status: 502 }
    status = 'Sent'; resendId = data?.id ?? null
  }
  await pool.query(
    'INSERT INTO emails (id, direction, mailbox, from_addr, to_addr, cc, bcc, subject, html, text, status, resend_id, at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW())',
    [id, 'outbound', fromAddr, fromAddr, allowed.join(', '), cc || null, bcc || null, subject, html || null, text || null, status, resendId],
  )
  for (const a of attachments) {
    await pool.query('INSERT INTO attachments (id, email_id, filename, content_type, size_bytes, content_b64) VALUES (?,?,?,?,?,?)',
      [`att-${randomUUID().slice(0, 12)}`, id, a.filename, a.contentType || 'application/octet-stream', a.size || 0, a.content_b64 || null])
  }
  return { id, status, resendId }
}

export { resendReceiving }
