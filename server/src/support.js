/**
 * Contact-us / support messages: a student writes to admin, an admin reads
 * and closes it. Mirrors enrollmentChanges.js — a plain request/response
 * table with a caller-facing read and an admin-facing list + decision.
 */
import { randomUUID } from 'node:crypto'
import { pool } from './db.js'
import { ensureStudentRow } from './accounts.js'

const MESSAGE_MAX = 4000
const SUBJECT_MAX = 160

function cleanText(value, max) {
  const text = String(value ?? '').trim()
  return text ? text.slice(0, max) : null
}

function shape(row) {
  return {
    id: row.id,
    userId: row.userId ?? row.user_id,
    studentId: row.studentId ?? row.student_id,
    subject: row.subject,
    message: row.message,
    status: row.status,
    adminNote: row.adminNote ?? row.admin_note ?? null,
    createdAt: row.createdAt ?? row.created_at,
    updatedAt: row.updatedAt ?? row.updated_at,
  }
}

/**
 * File a support message for the caller. Scoped to `req.identity` — the
 * roster row is created if this is the account's first write of any kind,
 * the same fallback `saveOwnEnrolment` relies on, so a student can reach
 * support before they have finished onboarding.
 */
export async function createSupportMessage(userId, input) {
  const message = cleanText(input?.message, MESSAGE_MAX)
  if (!message) return { error: 'message_required' }
  const subject = cleanText(input?.subject, SUBJECT_MAX)
  const conn = await pool.getConnection()
  let studentId = null
  try {
    await conn.beginTransaction()
    const student = await ensureStudentRow(conn, userId)
    studentId = student?.id ?? null
    const id = randomUUID()
    await conn.query(
      `INSERT INTO support_messages (id, user_id, student_id, subject, message)
       VALUES (?, ?, ?, ?, ?)`,
      [id, userId, studentId, subject, message],
    )
    await conn.commit()
    const [[row]] = await pool.query(
      `SELECT id, user_id AS userId, student_id AS studentId, subject, message, status,
              admin_note AS adminNote, created_at AS createdAt, updated_at AS updatedAt
         FROM support_messages WHERE id = ?`,
      [id],
    )
    return { ok: true, message: shape(row) }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

export async function mySupportMessages(userId) {
  const [rows] = await pool.query(
    `SELECT id, user_id AS userId, student_id AS studentId, subject, message, status,
            admin_note AS adminNote, created_at AS createdAt, updated_at AS updatedAt
       FROM support_messages WHERE user_id = ? ORDER BY created_at DESC LIMIT 50`,
    [userId],
  )
  return rows.map(shape)
}

export async function listSupportMessages({ status = 'open', limit = 100 } = {}) {
  const params = []
  const where = []
  if (status && status !== 'all') { where.push('m.status = ?'); params.push(status) }
  const [rows] = await pool.query(
    `SELECT m.id, m.user_id AS userId, m.student_id AS studentId, m.subject, m.message, m.status,
            m.admin_note AS adminNote, m.created_at AS createdAt, m.updated_at AS updatedAt,
            s.name, s.email, s.university_id AS universityId, s.year
       FROM support_messages m
       LEFT JOIN students s ON s.id = m.student_id
       ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
       ORDER BY m.created_at DESC LIMIT ?`,
    [...params, Math.min(Number(limit) || 100, 500)],
  )
  return rows.map((row) => ({
    ...shape(row),
    student: { name: row.name, email: row.email, universityId: row.universityId, year: row.year },
  }))
}

export async function closeSupportMessage(id, { note } = {}) {
  const adminNote = note ? cleanText(note, 500) : null
  const [result] = await pool.query(
    `UPDATE support_messages SET status = 'closed', admin_note = COALESCE(?, admin_note)
      WHERE id = ? AND status <> 'closed'`,
    [adminNote, id],
  )
  if (!result.affectedRows) return { error: 'not_found' }
  return { ok: true }
}
