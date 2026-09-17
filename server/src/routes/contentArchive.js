/**
 * Superadmin operations over the content ledger and the academic catalogue:
 * activity tracking, the archive preflight and apply, and academic publishing.
 */
import { randomUUID } from 'node:crypto'
import { ACADEMIC_STATE_KEYS, academicPreview } from '../academic.js'
import { requireSuperAdmin, requireTab } from '../auth.js'
import { CONTENT_ARCHIVE_SELECTION, CONTENT_ARCHIVE_TTL_MINUTES, activeArchiveBlockers, applyContentArchive, archiveActivityAllowed, archiveConfirmation, contentArchiveManifest, contentDigest } from '../contentArchive.js'
import { affectedSessionIds, affectedSessionSetsMatch } from '../contentArchiveActivity.js'
import { withContentCatalogueGate } from '../contentCatalogueGate.js'
import { toMariaDbDate } from '../datetime.js'
import { pool } from '../db.js'
import { CONTENT_LEDGER_STATE_KEY, wrap } from '../http.js'
import { invalidateSnapshots } from '../mediaStore.js'
import { activityTrackingSummary } from '../studyTrackingAdmin.js'

/** Student activity that contains one of the questions this archive withdraws. */
async function contentVisibilityResetSnapshot(db = pool, targetQuestionIds = null) {
  const [[roomRows], [challengeRows], [partyRows]] = await Promise.all([
    db.query("SELECT id, question_ids AS questionIds FROM study_rooms WHERE status IN ('lobby','running')"),
    db.query("SELECT id, question_ids AS questionIds FROM challenges WHERE status IN ('sent','running')"),
    db.query("SELECT id, item_refs AS itemRefs FROM study_party_sessions WHERE status IN ('open','scheduled')"),
  ])
  const sessionIds = {
    studyRooms: affectedSessionIds(roomRows, 'questionIds', targetQuestionIds),
    challenges: affectedSessionIds(challengeRows, 'questionIds', targetQuestionIds),
    partyQuestionSessions: affectedSessionIds(partyRows, 'itemRefs', targetQuestionIds, { party: true }),
  }
  return {
    active: Object.fromEntries(Object.entries(sessionIds).map(([kind, ids]) => [kind, ids.length])),
    sessionIds,
  }
}

async function contentVisibilityResetActivity(db = pool, targetQuestionIds = null) {
  return (await contentVisibilityResetSnapshot(db, targetQuestionIds)).active
}

export function registerContentArchiveRoutes(app) {
  // Cross-student activity tracking for the Settings console: answer-change
  // transitions from the verified attempt ledger and highlighting behaviour from
  // every student's highlight document. Optional ?university=&year=&term= scope.
  app.get('/api/admin/activity-tracking', requireSuperAdmin, wrap(async (req, res) => {
    res.json(await activityTrackingSummary({
      universityId: typeof req.query.university === 'string' ? req.query.university : undefined,
      year: typeof req.query.year === 'string' ? req.query.year : undefined,
      term: typeof req.query.term === 'string' ? req.query.term : undefined,
    }))
  }))

  // A mass withdrawal is intentionally not a normal editor action. The
  // operational script reads this immediately before its versioned ledger write
  // and refuses to interrupt live question sessions without an explicit flag.
  app.get('/api/admin/content-visibility-reset-preflight', requireSuperAdmin, wrap(async (_req, res) => {
    res.json({ active: await contentVisibilityResetActivity() })
  }))

  /**
   * Prepare an exact, expiring retirement manifest.
   *
   * The response contains compact target summaries, never mutable item bodies.
   * Originals stay server-side in `content_archive_operations`, where they are a
   * manual-recovery record and cannot be swapped by a browser before apply.
   */
  app.post('/api/admin/content-archive/preview', requireSuperAdmin, wrap(async (req, res) => {
    const [[ledgerRows], [versionRows]] = await Promise.all([
      pool.query('SELECT v FROM app_state WHERE k = ?', [CONTENT_LEDGER_STATE_KEY]),
      pool.query('SELECT MAX(id) AS version FROM app_state_versions WHERE k = ?', [CONTENT_LEDGER_STATE_KEY]),
    ])
    const raw = ledgerRows[0]?.v ?? '[]'
    let ledger
    try { ledger = JSON.parse(raw) } catch { return res.status(409).json({ error: 'content ledger is malformed' }) }
    if (!Array.isArray(ledger)) return res.status(409).json({ error: 'content ledger is not a list' })

    let manifest
    try { manifest = contentArchiveManifest(ledger) } catch (error) {
      return res.status(409).json({ error: error?.message ?? 'content ledger cannot be archived safely' })
    }
    const targetQuestionIds = new Set(manifest.targets.filter((target) => target.kind === 'question').map((target) => target.id))
    const activity = await contentVisibilityResetSnapshot(pool, targetQuestionIds)
    manifest.affectedSessions = activity.sessionIds
    const active = activity.active
    const operationId = `archive-${randomUUID()}`
    const confirmationPhrase = archiveConfirmation(manifest.counts)
    const expiresAt = new Date(Date.now() + CONTENT_ARCHIVE_TTL_MINUTES * 60_000)
    const ledgerVersion = versionRows[0]?.version ?? null
    const ledgerDigest = contentDigest(raw)
    // A refresh replaces the caller's unused preflight rather than multiplying
    // ledger-sized manifests. Applied receipts remain immutable.
    await pool.query(
      `DELETE FROM content_archive_operations
        WHERE status = 'prepared' AND (created_by = ? OR expires_at <= CURRENT_TIMESTAMP)`,
      [req.identity.id],
    )
    await pool.query(
      `INSERT INTO content_archive_operations
         (id, created_by, ledger_version, ledger_digest, manifest_json, confirmation_phrase, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [operationId, req.identity.id, ledgerVersion, ledgerDigest, JSON.stringify(manifest), confirmationPhrase, toMariaDbDate(expiresAt)],
    )
    res.json({
      operationId,
      selection: manifest.selection,
      expiresAt: expiresAt.toISOString(),
      ledgerVersion,
      ledgerDigest,
      counts: manifest.counts,
      statusCounts: manifest.statusCounts,
      sourceCounts: manifest.sourceCounts,
      targets: manifest.targets.map((target) => ({
        id: target.id,
        title: target.before?.title ?? target.id,
        kind: target.kind,
        status: target.before?.status ?? 'Unknown',
        source: target.before?.source ?? target.before?.owner ?? null,
      })),
      confirmationPhrase,
      active,
      blocked: activeArchiveBlockers(active) > 0,
    })
  }))

  /** Apply only the server-held manifest prepared above. */
  app.post('/api/admin/content-archive/apply', requireSuperAdmin, wrap(async (req, res) => withContentCatalogueGate(async () => {
    const operationId = String(req.body?.operationId ?? '').trim()
    const confirmation = String(req.body?.confirmation ?? '').trim()
    const reason = String(req.body?.reason ?? '').trim().slice(0, 500)
    const allowAffectedSessions = req.body?.allowAffectedSessions === true
    if (!operationId) return res.status(400).json({ error: 'operationId is required' })
    if (reason.length < 10) return res.status(400).json({ error: 'a clear reason of at least 10 characters is required' })

    const conn = await pool.getConnection()
    try {
      await conn.beginTransaction()
      const [operationRows] = await conn.query(
        `SELECT id, created_by AS createdBy, status, ledger_version AS ledgerVersion,
                ledger_digest AS ledgerDigest, manifest_json AS manifestJson,
                confirmation_phrase AS confirmationPhrase, result_json AS resultJson,
                expires_at AS expiresAt
           FROM content_archive_operations WHERE id = ? FOR UPDATE`,
        [operationId],
      )
      const operation = operationRows[0]
      if (!operation || operation.createdBy !== req.identity.id) {
        await conn.rollback()
        return res.status(404).json({ error: 'archive preflight not found' })
      }
      if (operation.status === 'applied') {
        await conn.commit()
        return res.json(JSON.parse(operation.resultJson))
      }
      if (operation.status !== 'prepared' || new Date(operation.expiresAt).getTime() <= Date.now()) {
        await conn.query("UPDATE content_archive_operations SET status = 'expired' WHERE id = ? AND status = 'prepared'", [operationId])
        await conn.commit()
        return res.status(409).json({ error: 'archive preflight expired; run it again' })
      }
      if (confirmation !== operation.confirmationPhrase) {
        await conn.rollback()
        return res.status(400).json({ error: 'the confirmation phrase does not match this preflight' })
      }

      let manifest
      try {
        manifest = JSON.parse(operation.manifestJson)
      } catch {
        await conn.rollback()
        return res.status(409).json({ error: 'the stored archive manifest is malformed' })
      }
      if (manifest?.selection !== CONTENT_ARCHIVE_SELECTION) {
        await conn.rollback()
        return res.status(409).json({ error: 'archive preflight uses an obsolete selection; run it again' })
      }
      const targetQuestionIds = new Set((manifest.targets ?? []).filter((target) => target?.kind === 'question').map((target) => target.id))
      const activity = await contentVisibilityResetSnapshot(conn, targetQuestionIds)
      const active = activity.active
      if (!affectedSessionSetsMatch(manifest.affectedSessions, activity.sessionIds)) {
        await conn.rollback()
        return res.status(409).json({ error: 'affected question sessions changed after preflight; refresh and review again', active })
      }
      if (!archiveActivityAllowed(active, allowAffectedSessions)) {
        await conn.rollback()
        return res.status(409).json({ error: 'affected question sessions require explicit acknowledgement', active })
      }

      const [ledgerRows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [CONTENT_LEDGER_STATE_KEY])
      const raw = ledgerRows[0]?.v ?? '[]'
      const [versionRows] = await conn.query('SELECT MAX(id) AS version FROM app_state_versions WHERE k = ?', [CONTENT_LEDGER_STATE_KEY])
      const currentVersion = versionRows[0]?.version ?? null
      const expectedVersion = operation.ledgerVersion ?? null
      if (String(currentVersion ?? '') !== String(expectedVersion ?? '') || contentDigest(raw) !== operation.ledgerDigest) {
        await conn.rollback()
        return res.status(409).json({ error: 'content changed after preflight; review the refreshed counts before trying again' })
      }

      let ledger
      try {
        ledger = JSON.parse(raw)
      } catch {
        await conn.rollback()
        return res.status(409).json({ error: 'the content ledger is malformed' })
      }
      const archivedAt = new Date()
      let archived
      try {
        archived = applyContentArchive(ledger, manifest, {
          operationId,
          actorId: req.identity.id,
          reason,
          archivedAt: archivedAt.toISOString(),
        })
      } catch (error) {
        await conn.rollback()
        if (error?.code === 'stale_manifest' || error?.code === 'invalid_manifest') return res.status(409).json({ error: error.message })
        throw error
      }

      const value = JSON.stringify(archived.value)
      const [inserted] = await conn.query(
        'INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)',
        [CONTENT_LEDGER_STATE_KEY, value, req.identity.id],
      )
      await conn.query('UPDATE app_state SET v = ? WHERE k = ?', [value, CONTENT_LEDGER_STATE_KEY])
      const result = {
        ok: true,
        operationId,
        counts: archived.counts,
        affectedSessionsAcknowledged: active,
        affectedSessionOverrideUsed: allowAffectedSessions && activeArchiveBlockers(active) > 0,
        archivedAt: archivedAt.toISOString(),
        version: inserted.insertId,
      }
      await conn.query(
        `UPDATE content_archive_operations
            SET status = 'applied', reason = ?, result_json = ?, applied_at = ?
          WHERE id = ?`,
        [reason, JSON.stringify(result), toMariaDbDate(archivedAt), operationId],
      )
      await conn.commit()
      invalidateSnapshots(CONTENT_LEDGER_STATE_KEY)
      res.json(result)
    } catch (error) {
      await conn.rollback()
      throw error
    } finally {
      conn.release()
    }
  })))

  function cleanAcademicDocuments(input) {
    const documents = input && typeof input === 'object' ? input : {}
    const out = {}
    for (const key of ACADEMIC_STATE_KEYS) {
      if (Object.hasOwn(documents, key)) out[key] = documents[key]
    }
    return out
  }

  async function readAcademicState(conn, lock = false) {
    const [rows] = await conn.query(
      `SELECT s.k, s.v, (SELECT MAX(id) FROM app_state_versions WHERE k = s.k) AS version
         FROM app_state s
        WHERE s.k IN (${ACADEMIC_STATE_KEYS.map(() => '?').join(',')})
        ${lock ? 'FOR UPDATE' : ''}`,
      ACADEMIC_STATE_KEYS,
    )
    const found = new Map(rows.map((row) => [row.k, row]))
    const documents = {}
    const versions = {}
    for (const key of ACADEMIC_STATE_KEYS) {
      const row = found.get(key)
      documents[key] = row ? JSON.parse(row.v) : null
      versions[key] = row?.version ?? null
    }
    return { documents, versions }
  }

  function academicVersionMismatch(expectedVersions, versions) {
    if (!expectedVersions || typeof expectedVersions !== 'object') return [{ key: '*', expected: undefined, actual: null }]
    const mismatches = []
    for (const key of ACADEMIC_STATE_KEYS) {
      if (!Object.hasOwn(expectedVersions, key)) {
        mismatches.push({ key, expected: undefined, actual: versions[key] ?? null })
        continue
      }
      const expected = expectedVersions[key] ?? null
      const actual = versions[key] ?? null
      if (String(expected) !== String(actual)) mismatches.push({ key, expected, actual })
    }
    return mismatches
  }

  app.post('/api/admin/academic/preview', requireTab('academic', 'marks'), wrap(async (req, res) => {
    const incoming = cleanAcademicDocuments(req.body?.documents)
    if (!Object.keys(incoming).length) return res.status(400).json({ error: 'documents are required' })
    const conn = await pool.getConnection()
    try {
      const { documents, versions } = await readAcademicState(conn)
      const next = { ...documents, ...incoming }
      res.json({ ...academicPreview(documents, next), versions })
    } finally {
      conn.release()
    }
  }))

  app.post('/api/admin/academic/publish', requireSuperAdmin, wrap(async (req, res) => {
    const idempotencyKey = String(req.body?.idempotencyKey ?? '').trim().slice(0, 128)
    if (!idempotencyKey) return res.status(400).json({ error: 'idempotencyKey is required' })
    const incoming = cleanAcademicDocuments(req.body?.documents)
    if (!Object.keys(incoming).length) return res.status(400).json({ error: 'documents are required' })

    const conn = await pool.getConnection()
    try {
      await conn.beginTransaction()
      try {
        await conn.query(
          'INSERT INTO academic_publish_requests (idempotency_key, actor_id, response_json) VALUES (?, ?, ?)',
          [idempotencyKey, req.identity.id, '{}'],
        )
      } catch {
        const [previous] = await conn.query(
          'SELECT actor_id AS actorId, response_json AS responseJson FROM academic_publish_requests WHERE idempotency_key = ?',
          [idempotencyKey],
        )
        await conn.rollback()
        if (!previous.length) return res.status(409).json({ error: 'idempotency_conflict' })
        if (previous[0].actorId !== req.identity.id) return res.status(409).json({ error: 'idempotency_key_used' })
        return res.json(JSON.parse(previous[0].responseJson))
      }

      const { documents, versions } = await readAcademicState(conn, true)
      const mismatches = academicVersionMismatch(req.body?.expectedVersions, versions)
      if (mismatches.length) {
        await conn.rollback()
        return res.status(409).json({ error: 'stale', mismatches })
      }

      const next = { ...documents, ...incoming }
      const preview = academicPreview(documents, next)
      if (!preview.ok) {
        await conn.rollback()
        return res.status(400).json({ error: 'academic_batch_refused', preview })
      }

      const changedVersions = {}
      for (const key of preview.changedKeys) {
        const value = JSON.stringify(next[key] ?? null)
        const [inserted] = await conn.query(
          'INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)',
          [key, value, req.identity.id],
        )
        changedVersions[key] = inserted.insertId
        await conn.query(
          'INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)',
          [key, value],
        )
      }

      const response = {
        ok: true,
        changedKeys: preview.changedKeys,
        versions: { ...versions, ...changedVersions },
        fingerprints: preview.fingerprints,
      }
      await conn.query(
        'UPDATE academic_publish_requests SET response_json = ? WHERE idempotency_key = ?',
        [JSON.stringify(response), idempotencyKey],
      )
      await conn.commit()
      for (const key of preview.changedKeys) invalidateSnapshots(key)
      res.json(response)
    } catch (error) {
      await conn.rollback()
      throw error
    } finally {
      conn.release()
    }
  }))
}
