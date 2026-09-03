/**
 * Content reports, the public contact form, and the media-escalation badge count.
 */
import { randomUUID } from 'node:crypto'
import { open } from 'node:fs/promises'
import { getUserByIdentity } from '../accounts.js'
import { requireAuthenticated, requireSuperAdmin, requireTab } from '../auth.js'
import { submitContactMessage } from '../contact.js'
import { CONTENT_REPORTS_STATE_KEY, CONTENT_REPORT_TOMBSTONES_KEY, buildContentReport, buildTombstone, deletionConfirmed, reporterRoleLabel } from '../contentReports.js'
import { pool } from '../db.js'
import { CONTENT_LEDGER_STATE_KEY, byUser, wrap } from '../http.js'
import { collectMediaRequests } from '../mediaRequestPolicy.js'
import { invalidateSnapshots } from '../mediaStore.js'
import { clientIp, rateLimited } from '../rateLimit.js'
import { requireTurnstile } from '../turnstile.js'

export function registerContentReportRoutes(app) {
  /**
   * File a content report.
   *
   * Open to any signed-in account, because the people who hit a wrong answer or a
   * broken image are students, who hold no console tab and so cannot reach the
   * shared write path. The server stamps the reporter's identity, role and time
   * itself — never the caller's word for them — and appends under the same row
   * lock the console write path uses, so a report filed here and a review saved
   * there cannot lose one another.
   */
  app.post('/api/content-reports', requireAuthenticated, rateLimited('content_reports', byUser, 10, 60 * 60_000), requireTurnstile, wrap(async (req, res) => {
    const body = req.body ?? {}
    const contentId = typeof body.contentId === 'string' ? body.contentId.trim() : ''
    const note = typeof body.note === 'string' ? body.note.trim() : ''
    if (!contentId) return res.status(400).json({ error: 'contentId is required' })
    if (!note) return res.status(400).json({ error: 'a description is required' })

    const actor = await getUserByIdentity(req.identity.id)
    const reporterName = actor?.name || String(req.identity.email ?? '').split('@')[0] || 'Someone'
    const report = buildContentReport(body, {
      id: `report-${randomUUID()}`,
      reporterUserId: req.identity.id,
      reporterRole: reporterRoleLabel(req.identity.role),
      reporterName,
      createdAt: new Date().toISOString(),
    })

    const conn = await pool.getConnection()
    try {
      await conn.beginTransaction()
      const [rows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [CONTENT_REPORTS_STATE_KEY])
      let current = []
      if (rows.length) { try { current = JSON.parse(rows[0].v) } catch { current = [] } }
      if (!Array.isArray(current)) current = []
      const next = [report, ...current]
      const v = JSON.stringify(next)
      await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [CONTENT_REPORTS_STATE_KEY, v, req.identity.id])
      await conn.query('INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)', [CONTENT_REPORTS_STATE_KEY, v])
      await conn.commit()
      invalidateSnapshots(CONTENT_REPORTS_STATE_KEY)
      res.json({ ok: true, id: report.id })
    } catch (error) {
      await conn.rollback()
      throw error
    } finally {
      conn.release()
    }
  }))

  /**
   * The contact page, actually sending somewhere.
   *
   * Public — a visitor deciding whether to sign up has no account yet — so it is
   * both rate-limited and behind the same bot check as sign-up and content
   * reports. See contact.js for validation and storage.
   */
  app.post('/api/contact', rateLimited('contact', clientIp, 5, 60 * 60_000), requireTurnstile, wrap(async (req, res) => {
    const result = await submitContactMessage(req.body, { ip: clientIp(req) })
    if (result.error) return res.status(400).json(result)
    res.json(result)
  }))

  /**
   * Permanently delete one report. Super admin only, never a one-click action: the
   * caller must type the report's id or its exact title back, and what is removed
   * leaves a tombstone — who deleted it, when, and which report — so the deletion
   * is itself on the record. The reports document and the tombstone log are written
   * under one transaction, so a report never disappears without its marker.
   */
  app.post('/api/content-reports/:id/delete', requireSuperAdmin, wrap(async (req, res) => {
    const reportId = req.params.id
    const actor = await getUserByIdentity(req.identity.id)
    const deletedByName = actor?.name || String(req.identity.email ?? '').split('@')[0] || 'Super admin'

    const conn = await pool.getConnection()
    try {
      await conn.beginTransaction()
      const [rows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [CONTENT_REPORTS_STATE_KEY])
      let current = []
      if (rows.length) { try { current = JSON.parse(rows[0].v) } catch { current = [] } }
      if (!Array.isArray(current)) current = []
      const report = current.find((item) => item?.id === reportId)
      if (!report) { await conn.rollback(); return res.status(404).json({ error: 'no such report' }) }
      if (!deletionConfirmed(report, req.body?.confirmation)) {
        await conn.rollback()
        return res.status(400).json({ error: 'confirmation_mismatch', reason: 'type the report id or its exact title to confirm deletion' })
      }
      const next = current.filter((item) => item?.id !== reportId)
      const v = JSON.stringify(next)
      await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [CONTENT_REPORTS_STATE_KEY, v, req.identity.id])
      await conn.query('INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)', [CONTENT_REPORTS_STATE_KEY, v])

      const [tombRows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [CONTENT_REPORT_TOMBSTONES_KEY])
      let tombstones = []
      if (tombRows.length) { try { tombstones = JSON.parse(tombRows[0].v) } catch { tombstones = [] } }
      if (!Array.isArray(tombstones)) tombstones = []
      const tombstone = buildTombstone(report, {
        deletedBy: req.identity.id, deletedByName, deletedAt: new Date().toISOString(), reason: req.body?.reason,
      })
      const tv = JSON.stringify([tombstone, ...tombstones])
      await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [CONTENT_REPORT_TOMBSTONES_KEY, tv, req.identity.id])
      await conn.query('INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)', [CONTENT_REPORT_TOMBSTONES_KEY, tv])

      await conn.commit()
      invalidateSnapshots(CONTENT_REPORTS_STATE_KEY)
      invalidateSnapshots(CONTENT_REPORT_TOMBSTONES_KEY)
      res.json({ ok: true, tombstone })
    } catch (error) {
      await conn.rollback()
      throw error
    } finally {
      conn.release()
    }
  }))

  /* ── Media escalations ───────────────────────────────────────────────────── */

  /**
   * How many media requests are escalated and still open, for the nav badge on the
   * Escalations queue. Editor-and-above only (the tab is theirs). Counts from the
   * ledger; escalations are rare, so a scan on an occasional nav fetch is cheap
   * enough, and it never ships the whole ledger to the browser to do it.
   */
  app.get('/api/admin/escalations/count', requireTab('escalations'), wrap(async (req, res) => {
    const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [CONTENT_LEDGER_STATE_KEY])
    let ledger = []
    if (rows.length) { try { ledger = JSON.parse(rows[0].v) } catch { ledger = [] } }
    let open = 0
    for (const request of collectMediaRequests(ledger).values()) {
      if (request?.escalation?.status === 'open') open += 1
    }
    res.json({ open })
  }))
}
