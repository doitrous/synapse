import { randomUUID } from 'node:crypto'
import { pool } from './db.js'
import { usernameConflict } from './accounts.js'

function cleanField(value) {
  const field = String(value ?? '').trim().toLowerCase()
  if (['university', 'university_id', 'universityid'].includes(field)) return 'university'
  if (field === 'year') return 'year'
  return null
}

function cleanText(value, max) {
  const text = String(value ?? '').trim()
  return text ? text.slice(0, max) : null
}

function derivedYearId(universityId, year) {
  const uni = String(universityId ?? '').replace(/[^A-Za-z0-9]/g, '').toUpperCase()
  const label = String(year ?? '').trim()
  const number = label.match(/\d+/)?.[0] ?? ''
  if (!uni || !number) return null
  return /internship/i.test(label) ? `${uni}_INT${number}` : `${uni}_Y${number}`
}

export function requestProblem(input) {
  const field = cleanField(input?.field)
  const requestedValue = cleanText(input?.requestedValue ?? input?.targetValue, 128)
  const reason = cleanText(input?.reason, 500)
  if (!field) return 'invalid_field'
  if (!requestedValue) return 'requested_value_required'
  if (!reason || reason.length < 12) return 'reason_required'
  return null
}

async function profileForUpdate(conn, userId) {
  const [rows] = await conn.query(
    `SELECT id, user_id AS userId, university_id AS universityId, year,
            username_normalized AS usernameNormalized
       FROM students WHERE user_id = ? FOR UPDATE`,
    [userId],
  )
  return rows[0] ?? null
}

export async function createEnrollmentChangeRequest(userId, input) {
  const problem = requestProblem(input)
  if (problem) return { error: problem }
  const field = cleanField(input.field)
  const requestedValue = cleanText(input.requestedValue ?? input.targetValue, 128)
  const reason = cleanText(input.reason, 500)
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const profile = await profileForUpdate(conn, userId)
    if (!profile?.universityId || !profile?.year) {
      await conn.rollback()
      return { error: 'profile_incomplete' }
    }
    const currentValue = field === 'university' ? profile.universityId : profile.year
    if (currentValue === requestedValue) {
      await conn.rollback()
      return { error: 'unchanged' }
    }
    const [pending] = await conn.query(
      `SELECT id FROM enrollment_change_requests
        WHERE user_id = ? AND field = ? AND status = 'pending'
        LIMIT 1`,
      [userId, field],
    )
    if (pending.length) {
      await conn.rollback()
      return { error: 'pending_exists', id: pending[0].id }
    }
    const id = randomUUID()
    await conn.query(
      `INSERT INTO enrollment_change_requests
       (id, user_id, student_id, field, current_value, requested_value, reason)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, userId, profile.id, field, currentValue, requestedValue, reason],
    )
    await conn.commit()
    return { ok: true, request: { id, field, currentValue, requestedValue, reason, status: 'pending' } }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

function shape(row) {
  return {
    id: row.id,
    userId: row.userId ?? row.user_id,
    studentId: row.studentId ?? row.student_id,
    field: row.field,
    currentValue: row.currentValue ?? row.current_value,
    requestedValue: row.requestedValue ?? row.requested_value,
    reason: row.reason,
    status: row.status,
    adminNote: row.adminNote ?? row.admin_note ?? null,
    reviewedBy: row.reviewedBy ?? row.reviewed_by ?? null,
    reviewedAt: row.reviewedAt ?? row.reviewed_at ?? null,
    createdAt: row.createdAt ?? row.created_at,
    updatedAt: row.updatedAt ?? row.updated_at,
  }
}

export async function myEnrollmentChangeRequests(userId) {
  const [rows] = await pool.query(
    `SELECT id, user_id AS userId, student_id AS studentId, field,
            current_value AS currentValue, requested_value AS requestedValue,
            reason, status, admin_note AS adminNote, reviewed_by AS reviewedBy,
            reviewed_at AS reviewedAt, created_at AS createdAt, updated_at AS updatedAt
       FROM enrollment_change_requests
      WHERE user_id = ?
      ORDER BY created_at DESC LIMIT 20`,
    [userId],
  )
  return rows.map(shape)
}

export async function listEnrollmentChangeRequests({ status = 'pending', limit = 100 } = {}) {
  const params = []
  const where = []
  if (status && status !== 'all') { where.push('r.status = ?'); params.push(status) }
  const [rows] = await pool.query(
    `SELECT r.id, r.user_id AS userId, r.student_id AS studentId, r.field,
            r.current_value AS currentValue, r.requested_value AS requestedValue,
            r.reason, r.status, r.admin_note AS adminNote, r.reviewed_by AS reviewedBy,
            r.reviewed_at AS reviewedAt, r.created_at AS createdAt, r.updated_at AS updatedAt,
            s.name, s.email, s.username, s.profile_icon AS profileIcon
       FROM enrollment_change_requests r
       LEFT JOIN students s ON s.id = r.student_id
       ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
       ORDER BY r.created_at DESC LIMIT ?`,
    [...params, Math.min(Number(limit) || 100, 500)],
  )
  return rows.map((row) => ({
    ...shape(row),
    student: { name: row.name, email: row.email, username: row.username, profileIcon: row.profileIcon },
  }))
}

export async function decideEnrollmentChangeRequest(id, { approve, note, actorId }) {
  const adminNote = cleanText(note, 500)
  if (!adminNote || adminNote.length < 8) return { error: 'note_required' }
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [rows] = await conn.query(
      `SELECT r.*, s.username_normalized AS usernameNormalized, s.university_id AS liveUniversityId,
              s.year AS liveYear
         FROM enrollment_change_requests r
         JOIN students s ON s.id = r.student_id
        WHERE r.id = ? FOR UPDATE`,
      [id],
    )
    const request = rows[0]
    if (!request) { await conn.rollback(); return { error: 'not_found' } }
    if (request.status !== 'pending') { await conn.rollback(); return { error: 'already_decided' } }
    if (approve) {
      if (request.field === 'university' && request.usernameNormalized) {
        const taken = await usernameConflict(conn, {
          universityId: request.requested_value,
          usernameNormalized: request.usernameNormalized,
          studentId: request.student_id,
        })
        if (taken) { await conn.rollback(); return { error: 'username_conflict' } }
      }
      if (request.field === 'university') {
        await conn.query(
          'UPDATE students SET university_id = ?, year_id = ? WHERE id = ?',
          [request.requested_value, derivedYearId(request.requested_value, request.liveYear), request.student_id],
        )
      } else {
        await conn.query(
          'UPDATE students SET year = ?, year_id = ? WHERE id = ?',
          [request.requested_value, derivedYearId(request.liveUniversityId, request.requested_value), request.student_id],
        )
      }
    }
    await conn.query(
      `UPDATE enrollment_change_requests
          SET status = ?, admin_note = ?, reviewed_by = ?, reviewed_at = NOW()
        WHERE id = ?`,
      [approve ? 'approved' : 'rejected', adminNote, actorId, id],
    )
    await conn.query(
      `INSERT INTO account_action_audit (student_id, user_id, action, detail, reason, actor_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        request.student_id,
        request.user_id,
        approve ? 'enrollment.approve' : 'enrollment.reject',
        `${request.field}: ${request.current_value ?? 'unset'} → ${request.requested_value}`,
        adminNote,
        actorId,
      ],
    )
    await conn.commit()
    return { ok: true, status: approve ? 'approved' : 'rejected' }
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}
