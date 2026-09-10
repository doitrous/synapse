/**
 * Account administration and the console tab guards in front of it. Every
 * mutating route requires a written reason, stored beside the change.
 */
import { randomUUID } from 'node:crypto'
import { open } from 'node:fs/promises'
import { cancelSubscription, getUser, getUserActivity, grantSubscription, listUsers, passwordResetConfigured, readReason, recordAction, requestPasswordReset, setAccessStatus, setContentScope, setRole, setUserPassword } from '../accounts.js'
import { requireTab } from '../auth.js'
import { pool } from '../db.js'
import { applyDirectEnrollmentChange, decideEnrollmentChangeRequest, listEnrollmentChangeRequests } from '../enrollmentChanges.js'
import { wrap } from '../http.js'
import { acknowledgeStorageThreshold, platformReport } from '../platformReports.js'
import { studentAnalytics } from '../studentAnalytics.js'
import { createPricingVoucher, createPromotion, listPricingDiscounts } from '../pricing.js'

export function registerAdminRoutes(app) {
  // Student accounts can read shared catalogue state, but operational records and
  // mailbox contents remain admin-only even if a route is guessed manually.

  app.use('/api/students', requireTab('students'))
  app.use(['/api/mailboxes', '/api/mail'], requireTab('mailbox'))

  /* ── Roles and recoverable snapshots ───────────────────────────────────── */

  /* ── Account administration ────────────────────────────────────────────────
     Every route here is admin-only and every mutating one requires a written
     reason, which is stored beside the change. These actions decide whether a
     person can sign in and what they have paid for; an audit trail that says who
     and why is the difference between an administrative record and a mystery. */

  app.get('/api/admin/users', requireTab('users'), wrap(async (req, res) => {
    res.json(await listUsers({
      query: req.query.q ? String(req.query.q) : undefined,
      status: req.query.status ? String(req.query.status) : undefined,
      plan: req.query.plan ? String(req.query.plan) : undefined,
      universityId: req.query.universityId ? String(req.query.universityId) : undefined,
      accessStatus: req.query.accessStatus ? String(req.query.accessStatus) : undefined,
      limit: Math.min(Number(req.query.limit) || 200, 1000),
    }))
  }))

  app.get('/api/admin/users/capabilities', requireTab('users'), (_req, res) => {
    // The UI asks before it offers. A reset button that cannot work should be
    // explained on the screen, not discovered when someone presses it.
    res.json({ passwordReset: passwordResetConfigured })
  })

  app.get('/api/admin/users/:id', requireTab('users'), wrap(async (req, res) => {
    const user = await getUser(req.params.id)
    if (!user) return res.status(404).json({ error: 'user not found' })
    res.json(user)
  }))

  app.patch('/api/admin/users/:id', requireTab('users'), wrap(async (req, res) => {
    const reason = readReason(req.body)
    if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
    const fields = ['name', 'email', 'study_group', 'notes']
    const updates = []
    const params = []
    for (const [key, column] of [['name', 'name'], ['email', 'email'], ['group', 'study_group'], ['notes', 'notes']]) {
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

  /**
   * Move a student to a new university and year.
   *
   * The Users tab holds admins too, but changing a cohort is an editor-and-above
   * action — it resets what progress the student sees — so rank is checked past the
   * tab. The change is one transaction: persist the cohort, re-derive year_id, reset
   * the cached aggregates to the destination cohort (a clean slate on a new one,
   * the old numbers exactly on a return), and write the audit row. The response
   * carries the before and after so the confirmation screen can state both.
   */
  app.post('/api/admin/users/:id/enrollment', requireTab('users'), wrap(async (req, res) => {
    if (req.identity.rank < 2) {
      return res.status(403).json({ error: 'only an editor or super admin may change a student’s university and year' })
    }
    const reason = readReason(req.body)
    if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
    const universityId = String(req.body?.universityId || '').trim()
    const year = String(req.body?.year || '').trim()
    if (!universityId || !year) return res.status(400).json({ error: 'universityId and year are required' })

    const conn = await pool.getConnection()
    try {
      await conn.beginTransaction()
      const [rows] = await conn.query(
        'SELECT id, university_id AS universityId, year, year_id AS yearId, user_id AS userId FROM students WHERE id = ? FOR UPDATE',
        [req.params.id],
      )
      if (!rows.length) { await conn.rollback(); return res.status(404).json({ error: 'no profile to update' }) }
      const current = rows[0]
      if (String(current.universityId ?? '') === universityId && String(current.year ?? '') === year) {
        await conn.rollback()
        return res.status(409).json({ error: 'that is already their university and year' })
      }
      const result = await applyDirectEnrollmentChange(conn, {
        studentId: req.params.id, userId: current.userId, universityId, year,
        oldUniversityId: current.universityId, oldYear: current.year, oldYearId: current.yearId,
        actorId: req.identity.id, reason,
      })
      await conn.commit()
      res.json({ ok: true, ...result })
    } catch (error) {
      await conn.rollback()
      throw error
    } finally {
      conn.release()
    }
  }))

  app.post('/api/admin/users/:id/subscription', requireTab('users'), wrap(async (req, res) => {
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

  app.post('/api/admin/users/:id/subscription/cancel', requireTab('users'), wrap(async (req, res) => {
    const reason = readReason(req.body)
    if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
    const result = await cancelSubscription(req.params.id, {
      reason, actorId: req.identity.id, immediate: Boolean(req.body?.immediate),
    })
    if (result.error) return res.status(result.error === 'no_subscription' ? 409 : 404).json({ error: result.error })
    res.json(result)
  }))

  app.post('/api/admin/users/:id/access', requireTab('users'), wrap(async (req, res) => {
    const reason = readReason(req.body)
    if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
    const status = req.body?.status
    if (!['active', 'suspended'].includes(status)) return res.status(400).json({ error: 'status must be active or suspended' })
    const result = await setAccessStatus(req.params.id, { status, reason, actorId: req.identity.id })
    if (result.error === 'no_identity') return res.status(409).json({ error: 'this person has never signed in, so there is no account to suspend' })
    if (result.error === 'cannot_suspend_console') return res.status(409).json({ error: 'demote this account to student before suspending it' })
    if (result.error) return res.status(404).json({ error: result.error })
    res.json(result)
  }))

  app.post('/api/admin/users/:id/password-reset', requireTab('users'), wrap(async (req, res) => {
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

  /**
   * Set a user's password directly.
   *
   * Editor-and-above only — an admin holds the Users tab but is rank 1, so the tab
   * is not enough. The account whose password is being set must itself be below
   * editor (student, reviewer or admin); accounts.setUserPassword enforces that, so
   * an editor can never reach a peer's or a super admin's credentials. The password
   * is never stored or logged here.
   */
  app.post('/api/admin/users/:id/password', requireTab('users'), wrap(async (req, res) => {
    if (req.identity.rank < 2) {
      return res.status(403).json({ error: 'only an editor or super admin may set a user’s password' })
    }
    const reason = readReason(req.body)
    if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
    const result = await setUserPassword(req.params.id, { password: req.body?.password, reason, actorId: req.identity.id })
    const REFUSALS = {
      weak_password: [400, 'password must be at least 8 characters'],
      not_found: [404, 'user not found'],
      no_identity: [409, 'this person has never signed in, so there is no account to set a password for'],
      forbidden_target: [403, 'passwords can only be set for students, reviewers and admins'],
      supabase_not_configured: [503, 'setting passwords needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server'],
      supabase_rejected: [502, `Supabase refused the request${result?.status ? ` (${result.status})` : ''}`],
    }
    if (result.error) {
      const [status, message] = REFUSALS[result.error] ?? [400, result.error]
      return res.status(status).json({ error: message })
    }
    res.json({ ok: true })
  }))

  app.get('/api/admin/users/:id/activity', requireTab('users'), wrap(async (req, res) => {
    // Keyed on the Supabase user id, because `user_state` is written by the app
    // under the signed-in identity. A roster row that has never signed in owns no
    // state, and reports none rather than erroring.
    const user = await getUser(req.params.id)
    if (!user) return res.status(404).json({ error: 'user not found' })
    res.json(await getUserActivity(user.identity?.userId ?? null))
  }))

  app.post('/api/admin/users/:id/role', requireTab('users'), wrap(async (req, res) => {
    const reason = readReason(req.body)
    if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
    if (req.params.id === req.identity.id) return res.status(409).json({ error: 'you cannot change your own role' })
    const result = await setRole(req.params.id, {
      role: req.body?.role, reason, actorId: req.identity.id, actorRole: req.identity.role,
    })
    const REFUSALS = {
      invalid_role: [400, 'role must be student, mcq_validator, reviewer, admin or editor'],
      forbidden: [403, 'that change is above your level'],
      no_identity: [409, 'this person has never signed in, so there is no role to change'],
      suspended: [409, 'reactivate this account before changing its role'],
      unchanged: [409, 'that is already their role'],
      last_console: [409, 'this is the last account with console access — promote someone else first'],
      not_found: [404, 'user not found'],
    }
    if (result.error) {
      const [status, message] = REFUSALS[result.error] ?? [400, result.error]
      return res.status(status).json({ error: message })
    }
    res.json(result)
  }))

  app.post('/api/admin/users/:id/scope', requireTab('users'), wrap(async (req, res) => {
    const reason = readReason(req.body)
    if (!reason) return res.status(400).json({ error: 'reason must be explicit (8 characters or more)' })
    const result = await setContentScope(req.params.id, {
      moduleIds: req.body?.moduleIds, yearIds: req.body?.yearIds,
      reason, actorId: req.identity.id, actorRole: req.identity.role,
    })
    const REFUSALS = {
      forbidden: [403, 'that change is above your level'],
      not_scoped: [409, 'only a reviewer is assigned modules and years'],
      no_identity: [409, 'this person has never signed in, so there is nothing to scope'],
      not_found: [404, 'user not found'],
    }
    if (result.error) {
      const [status, message] = REFUSALS[result.error] ?? [400, result.error]
      return res.status(status).json({ error: message })
    }
    res.json(result)
  }))

  app.get('/api/admin/enrollment-change-requests', requireTab('users'), wrap(async (req, res) => {
    res.json({ requests: await listEnrollmentChangeRequests({ status: req.query?.status ? String(req.query.status) : 'pending' }) })
  }))

  app.post('/api/admin/enrollment-change-requests/:id/approve', requireTab('users'), wrap(async (req, res) => {
    const result = await decideEnrollmentChangeRequest(req.params.id, {
      approve: true, note: req.body?.note ?? req.body?.reason, actorId: req.identity.id,
    })
    if (result.error) {
      const status = result.error === 'username_conflict' || result.error === 'already_decided' ? 409 : (result.error === 'not_found' ? 404 : 400)
      return res.status(status).json(result)
    }
    res.json(result)
  }))

  app.post('/api/admin/enrollment-change-requests/:id/reject', requireTab('users'), wrap(async (req, res) => {
    const result = await decideEnrollmentChangeRequest(req.params.id, {
      approve: false, note: req.body?.note ?? req.body?.reason, actorId: req.identity.id,
    })
    if (result.error) {
      const status = result.error === 'already_decided' ? 409 : (result.error === 'not_found' ? 404 : 400)
      return res.status(status).json(result)
    }
    res.json(result)
  }))

  app.get('/api/admin/platform/reports', requireTab('dashboard'), wrap(async (_req, res) => {
    res.json(await platformReport())
  }))

  app.get('/api/admin/analytics', requireTab('analytics'), wrap(async (_req, res) => {
    res.json(await studentAnalytics())
  }))

  app.post('/api/admin/platform/storage-thresholds/:thresholdGb/ack', requireTab('dashboard'), wrap(async (req, res) => {
    const result = await acknowledgeStorageThreshold(req.params.thresholdGb, req.identity.id)
    if (result.error) return res.status(400).json(result)
    res.json(result)
  }))

  app.get('/api/admin/pricing', requireTab('payments'), wrap(async (_req, res) => {
    res.json(await listPricingDiscounts())
  }))

  app.post('/api/admin/pricing/promotions', requireTab('payments'), wrap(async (req, res) => {
    const result = await createPromotion(req.body ?? {}, req.identity.id)
    if (result.error) return res.status(400).json(result)
    res.json(result)
  }))

  app.post('/api/admin/pricing/vouchers', requireTab('payments'), wrap(async (req, res) => {
    const result = await createPricingVoucher(req.body ?? {}, req.identity.id)
    if (result.error) return res.status(400).json(result)
    res.json(result)
  }))

  /* `GET /api/access/users` and `POST /api/access/users/:userId/promote` used to
     live here, behind the Students tab's own panel. The promote route wrote the
     same `user_access.role` column as `/api/admin/users/:id/role` while checking
     neither the actor's rank nor a self-edit, which under a hierarchy is an
     escalation route rather than a duplication. Both are gone with that panel:
     roles are changed in Users, one door with one lock. */
}

export function registerStudentRoutes(app) {
  /* ── Students ────────────────────────────────────────────────────────────── */

  const STUDENT_COLS = 'id, name, email, university_id AS universityId, year, year_id AS yearId, plan, status, joined, last_active AS lastActive, questions_answered AS questionsAnswered, accuracy, readiness'

  app.get('/api/students', wrap(async (_req, res) => {
    const [rows] = await pool.query(`SELECT ${STUDENT_COLS} FROM students ORDER BY name`)
    res.json(rows)
  }))

  app.post('/api/students', wrap(async (req, res) => {
    const s = req.body || {}
    const id = s.id || `stu-${randomUUID().slice(0, 8)}`
    await pool.query(
      `INSERT INTO students (id, name, email, university_id, year, year_id, plan, status, joined, last_active, questions_answered, accuracy, readiness)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [id, s.name, s.email, s.universityId, s.year, s.yearId || null, s.plan, s.status, s.joined || null, s.lastActive || null, s.questionsAnswered || 0, s.accuracy || 0, s.readiness || 0],
    )
    res.json({ id })
  }))

  app.patch('/api/students/:id', wrap(async (req, res) => {
    // University, year and year_id are deliberately NOT editable here: a cohort
    // change resets what progress the student sees, so it must go through
    // POST /api/admin/users/:id/enrollment, which is editor-and-above, audited,
    // and resets the aggregates. Persisting them here silently — as the profile
    // dialog once did — is exactly the bug that let a cohort look changed while the
    // record still said otherwise.
    const allowed = { name: 'name', email: 'email', plan: 'plan', status: 'status', lastActive: 'last_active', questionsAnswered: 'questions_answered', accuracy: 'accuracy', readiness: 'readiness' }
    const sets = [], vals = []
    for (const [k, col] of Object.entries(allowed)) if (k in (req.body || {})) { sets.push(`${col} = ?`); vals.push(req.body[k]) }
    if (sets.length) { vals.push(req.params.id); await pool.query(`UPDATE students SET ${sets.join(', ')} WHERE id = ?`, vals) }
    res.json({ ok: true })
  }))

  app.delete('/api/students/:id', wrap(async (req, res) => {
    await pool.query('DELETE FROM students WHERE id = ?', [req.params.id])
    res.json({ ok: true })
  }))
}
