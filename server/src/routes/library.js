/**
 * Recoverable snapshots, the launch preflight, and medical-library coverage review.
 */
import { randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { requireTab } from '../auth.js'
import { pool } from '../db.js'
import { LAUNCH_DATA_PATH, wrap } from '../http.js'

export async function createDataSnapshot(label, createdBy) {
  // Snapshot current recoverable state, not the append-only version ledgers.
  // Including those ledgers duplicates large historical JSON documents inside
  // one packet and can exceed MariaDB's max_allowed_packet as the library grows.
  const tables = ['schema_migrations', 'app_state', 'user_state', 'students', 'mailboxes', 'emails', 'attachments', 'user_access', 'role_promotion_audit']
  const snapshot = { schemaVersion: 1, createdAt: new Date().toISOString(), tables: {} }
  for (const table of tables) {
    const [rows] = await pool.query(`SELECT * FROM ${table}`)
    snapshot.tables[table] = rows
  }
  const id = `snapshot-${randomUUID()}`
  await pool.query(
    'INSERT INTO data_snapshots (id, label, snapshot_json, created_by) VALUES (?, ?, ?, ?)',
    [id, String(label).slice(0, 255), JSON.stringify(snapshot), createdBy],
  )
  return { id, label }
}

async function readMedicalLibraryLaunchData() {
  return JSON.parse(await readFile(LAUNCH_DATA_PATH, 'utf8'))
}

export function registerLibraryRoutes(app) {
  app.get('/api/backups', requireTab('audit'), wrap(async (_req, res) => {
    const [rows] = await pool.query(
      'SELECT id, label, created_by AS createdBy, created_at AS createdAt, OCTET_LENGTH(snapshot_json) AS sizeBytes FROM data_snapshots ORDER BY created_at DESC LIMIT 50',
    )
    res.json(rows)
  }))

  /** Read-only launch preflight. It never changes production data. */
  app.get('/api/launch/medical-library-v1/preview', requireTab('audit'), wrap(async (_req, res) => {
    const launch = await readMedicalLibraryLaunchData()
    const [migration] = await pool.query('SELECT id, applied_at AS appliedAt FROM schema_migrations WHERE id = ?', [launch.migrationId])
    const keys = Object.keys(launch.states)
    const [stateRows] = await pool.query('SELECT k, OCTET_LENGTH(v) AS sizeBytes, updated_at AS updatedAt FROM app_state WHERE k IN (?)', [keys])
    res.json({
      migrationId: launch.migrationId,
      alreadyApplied: Boolean(migration.length),
      appliedAt: migration[0]?.appliedAt || null,
      report: launch.report,
      statesToReplace: keys,
      existingStates: stateRows,
    })
  }))

  /* ── Medical library coverage review (admin-only) ───────────────────────── */

  app.get('/api/medical-library/coverage/summary', requireTab('content'), wrap(async (_req, res) => {
    const [[totals], destinations, systems, sourceStates, collections] = await Promise.all([
      pool.query('SELECT COUNT(*) AS candidates, COUNT(DISTINCT source_id) AS candidateSources FROM medical_library_candidate_coverage').then(([rows]) => rows),
      pool.query('SELECT destination, COUNT(*) AS count FROM medical_library_candidate_coverage GROUP BY destination ORDER BY count DESC').then(([rows]) => rows),
      pool.query('SELECT system_id AS systemId, COUNT(*) AS count FROM medical_library_candidate_coverage GROUP BY system_id ORDER BY count DESC').then(([rows]) => rows),
      pool.query('SELECT availability_status AS status, COUNT(*) AS count FROM medical_library_source_availability GROUP BY availability_status ORDER BY count DESC').then(([rows]) => rows),
      pool.query('SELECT collection_id AS collectionId, COUNT(*) AS count FROM medical_library_source_availability GROUP BY collection_id ORDER BY count DESC').then(([rows]) => rows),
    ])
    res.json({
      candidates: Number(totals?.candidates || 0),
      candidateSources: Number(totals?.candidateSources || 0),
      destinations: destinations.map((row) => ({ ...row, count: Number(row.count) })),
      systems: systems.map((row) => ({ ...row, count: Number(row.count) })),
      sourceStates: sourceStates.map((row) => ({ ...row, count: Number(row.count) })),
      collections: collections.map((row) => ({ ...row, count: Number(row.count) })),
    })
  }))

  app.get('/api/medical-library/coverage/candidates', requireTab('content'), wrap(async (req, res) => {
    const page = Math.max(1, Number.parseInt(String(req.query.page || '1'), 10) || 1)
    const pageSize = Math.min(100, Math.max(10, Number.parseInt(String(req.query.pageSize || '50'), 10) || 50))
    const destination = String(req.query.destination || '').trim()
    const systemId = String(req.query.systemId || '').trim()
    const sourceId = String(req.query.sourceId || '').trim()
    const search = String(req.query.search || '').trim().slice(0, 160)
    const where = []
    const params = []
    if (destination) { where.push('destination = ?'); params.push(destination) }
    if (systemId) { where.push('system_id = ?'); params.push(systemId) }
    if (sourceId) { where.push('source_id = ?'); params.push(sourceId) }
    if (search) {
      where.push('(label LIKE ? OR statement LIKE ? OR candidate_id LIKE ? OR source_id LIKE ?)')
      const like = `%${search}%`
      params.push(like, like, like, like)
    }
    const clause = where.length ? `WHERE ${where.join(' AND ')}` : ''
    const [[countRow]] = await pool.query(`SELECT COUNT(*) AS total FROM medical_library_candidate_coverage ${clause}`, params)
    const [rows] = await pool.query(
      `SELECT candidate_id AS candidateId, source_id AS sourceId, system_id AS systemId,
         subject, topic, subtopic, microtopic, label, statement, concept_type AS conceptType,
         risk_class AS riskClass, confidence, destination, reason_code AS reasonCode, reason,
         target_concept_id AS targetConceptId, resource_relative_path AS resourceRelativePath,
         locator_page AS locatorPage, locator_printed_page AS locatorPrintedPage,
         locator_section AS locatorSection, locator_start AS locatorStart, locator_end AS locatorEnd,
         coverage_unit_id AS coverageUnitId, support_span AS supportSpan
       FROM medical_library_candidate_coverage ${clause}
       ORDER BY system_id, source_id, candidate_id LIMIT ? OFFSET ?`,
      [...params, pageSize, (page - 1) * pageSize],
    )
    res.json({
      page,
      pageSize,
      total: Number(countRow.total || 0),
      items: rows.map((row) => ({ ...row, confidence: row.confidence == null ? null : Number(row.confidence) })),
    })
  }))

  app.get('/api/medical-library/coverage/sources', requireTab('content'), wrap(async (req, res) => {
    const collectionId = String(req.query.collectionId || '').trim()
    const status = String(req.query.status || '').trim()
    const where = []
    const params = []
    if (collectionId) { where.push('collection_id = ?'); params.push(collectionId) }
    if (status) { where.push('availability_status = ?'); params.push(status) }
    const clause = where.length ? `WHERE ${where.join(' AND ')}` : ''
    const [rows] = await pool.query(
      `SELECT source_id AS sourceId, collection_id AS collectionId, relative_path AS relativePath,
         availability_status AS status FROM medical_library_source_availability ${clause}
       ORDER BY collection_id, relative_path, source_id`,
      params,
    )
    res.json({ items: rows })
  }))
}

export function registerBackupWriteRoutes(app) {
  app.post('/api/backups', requireTab('audit'), wrap(async (req, res) => {
    const label = req.body?.label || `Manual snapshot ${new Date().toISOString()}`
    res.json(await createDataSnapshot(label, req.identity.id))
  }))

  app.get('/api/backups/:id/download', requireTab('audit'), wrap(async (req, res) => {
    const [rows] = await pool.query(
      'SELECT label, snapshot_json AS snapshotJson FROM data_snapshots WHERE id = ?',
      [req.params.id],
    )
    if (!rows.length) return res.status(404).json({ error: 'snapshot not found' })
    const filename = `${req.params.id.replace(/[^a-zA-Z0-9_-]/g, '')}.json`
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.send(rows[0].snapshotJson)
  }))
}
