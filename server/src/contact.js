import { randomUUID } from 'node:crypto'
import { pool } from './db.js'
import { sendMail } from './mail.js'
import { supportInboxAddress } from './mailFrom.js'

const NAME_MAX = 200
const TOPIC_MAX = 120
const MESSAGE_MIN = 10
const MESSAGE_MAX = 5000
const EMAIL_MAX = 320
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validate a contact submission. Pure and separate from the route handler so
 * it can be unit-tested without a database.
 */
export function validateContactMessage(body) {
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const topic = typeof body?.topic === 'string' ? body.topic.trim().slice(0, TOPIC_MAX) : ''
  const message = typeof body?.message === 'string' ? body.message.trim() : ''

  if (!name || name.length > NAME_MAX) return { error: 'invalid_name' }
  if (!email || email.length > EMAIL_MAX || !EMAIL_RE.test(email)) return { error: 'invalid_email' }
  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) return { error: 'invalid_message' }

  return { name, email, topic: topic || null, message }
}

/**
 * File a support message, store it, and tell the support inbox.
 *
 * The row is the record — the send is best-effort on top of it, so a mail
 * outage loses nothing and is reported honestly as `emailed: false`. Only a
 * genuine 'Sent' counts: with no Resend key configured `sendMail` records a
 * 'Queued' row and posts nothing, which is not an email anybody received.
 */
export async function submitContactMessage(body, { ip } = {}) {
  const validated = validateContactMessage(body)
  if (validated.error) return validated

  const id = `support-${randomUUID()}`
  let emailed = false
  try {
    const sent = await sendMail({
      to: supportInboxAddress(),
      subject: `[Contact] ${validated.topic ?? 'General'} — ${validated.name}`,
      text: [
        `From: ${validated.name} <${validated.email}>`,
        `Topic: ${validated.topic ?? '—'}`,
        `IP: ${ip || 'unknown'}`,
        '',
        validated.message,
      ].join('\n'),
      category: 'contact',
    })
    emailed = sent.status === 'Sent'
  } catch (error) {
    console.error('[contact] support email failed', error?.message ?? error)
  }
  await pool.query(
    'INSERT INTO support_messages (id, name, email, topic, message, emailed, ip) VALUES (?,?,?,?,?,?,?)',
    [id, validated.name, validated.email, validated.topic, validated.message, emailed ? 1 : 0, ip || null],
  )
  return { ok: true, id, emailed }
}
