import { randomUUID } from 'node:crypto'
import { pool } from './db.js'

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
 * File a support message and store it.
 *
 * `sendMail` lives inside index.js and is not importable from here (see the
 * same note in assistant.js) — so this only ever saves the row and reports
 * `emailed: false`. Wiring an actual send back in is a follow-up once
 * `sendMail` is factored out of index.js for every caller that needs it.
 */
export async function submitContactMessage(body, { ip } = {}) {
  const validated = validateContactMessage(body)
  if (validated.error) return validated

  const id = `support-${randomUUID()}`
  const emailed = false
  await pool.query(
    'INSERT INTO support_messages (id, name, email, topic, message, emailed, ip) VALUES (?,?,?,?,?,?,?)',
    [id, validated.name, validated.email, validated.topic, validated.message, emailed ? 1 : 0, ip || null],
  )
  return { ok: true, id, emailed }
}
