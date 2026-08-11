import { randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { gunzipSync } from 'node:zlib'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from '../src/db.js'

const here = dirname(fileURLToPath(import.meta.url))
const launch = JSON.parse(await readFile(join(here, '..', 'data', 'medical-library-v1.json'), 'utf8'))
const coveragePackage = JSON.parse(gunzipSync(await readFile(join(here, '..', 'data', 'medical-library-coverage-v6.json.gz'))))
const requiredMigrationId = '2026-08-11-medical-library-coverage-v6'
const approval = process.env.MEDICAL_LIBRARY_APPLY

if (launch.migrationId !== requiredMigrationId) {
  throw new Error(`Expected ${requiredMigrationId}; launch package contains ${launch.migrationId}`)
}
if (coveragePackage.migrationId !== requiredMigrationId) {
  throw new Error(`Expected ${requiredMigrationId}; coverage package contains ${coveragePackage.migrationId}`)
}
if (approval !== requiredMigrationId) {
  throw new Error(`Refusing to mutate MariaDB. Set MEDICAL_LIBRARY_APPLY=${requiredMigrationId} after explicit owner approval.`)
}

const stateEntries = Object.entries(launch.states)
const expectedStateKeys = new Set([
  'synapse-academic-universities-v1',
  'synapse-course-curricula-v1',
  'synapse-module-schedules-v1',
  'synapse-taxonomy-tree-v4',
  'synapse-medical-library-taxonomy-v1',
  'synapse-admin-content-ledger-v4',
  'synapse-concept-graph-v2',
  'synapse-medical-evidence-v1',
  'synapse-medical-evidence-published-v1',
  'synapse-relation-types-v1',
])
if (stateEntries.length !== expectedStateKeys.size || stateEntries.some(([key]) => !expectedStateKeys.has(key))) {
  throw new Error('Launch package state-key allowlist validation failed')
}

const report = launch.report || {}
const expectedCounts = {
  universities: 12,
  years: 84,
  systems: 19,
  topics: 127,
  medicalTaxonomyNodes: 1883,
  articles: 145,
  publishedArticles: 17,
  publishedSpans: 58,
  concepts: 1718,
  activeConcepts: 55,
  claims: 1741,
  verifiedClaims: 59,
  citations: 1818,
  relations: 47,
  resources: 47,
  reviewCandidates: 37059,
  sourceAvailabilityRecords: 563,
  sourceFilesAvailable: 52,
}
for (const [field, expected] of Object.entries(expectedCounts)) {
  if (report[field] !== expected) throw new Error(`Launch package ${field} count is ${report[field]}; expected ${expected}`)
}

const ledger = launch.states['synapse-admin-content-ledger-v4'] || []
const articles = ledger.filter((item) => item.kind === 'article')
const conceptGraph = launch.states['synapse-concept-graph-v2'] || { concepts: [], relations: [] }
const evidence = launch.states['synapse-medical-evidence-v1'] || { claims: [], citations: [], resources: [], articleSpans: [] }
const publishedEvidence = launch.states['synapse-medical-evidence-published-v1'] || { claims: [], citations: [], resources: [], articleSpans: [] }
const claimById = new Map(evidence.claims.map((claim) => [claim.id, claim]))
const publishedClaimById = new Map(publishedEvidence.claims.map((claim) => [claim.id, claim]))
const publishedResourceById = new Map(publishedEvidence.resources.map((resource) => [resource.id, resource]))

if (articles.some((article) => article.articleData?.sections?.at(-1)?.kind !== 'components')) {
  throw new Error('Every article must end with Components and relations')
}
if (articles.some((article) => article.status === 'Published' && (!article.articleData?.publishedSections?.length || article.articleData.publishedSections.at(-1)?.kind !== 'components'))) {
  throw new Error('Every student-visible article must have a publication-gated section projection')
}
if (!conceptGraph.concepts.length || conceptGraph.concepts.some((concept) => !concept.primaryNodeId || !(concept.resourceIds || []).length)) {
  throw new Error('Every reviewed concept must have canonical placement and at least one source resource')
}
if (conceptGraph.concepts.some((concept) => concept.publicationStatus === 'published' && (concept.atomicClaimIds || []).some((id) => claimById.get(id)?.verificationStatus !== 'verified'))) {
  throw new Error('A published concept contains an unverified claim')
}
if (evidence.citations.some((citation) => citation.countsAsClaimEvidence && !citation.locator)) {
  throw new Error('A claim-evidence citation has no exact locator')
}
if (publishedEvidence.articleSpans.some((span) => !span.claimIds?.length || span.claimIds.some((id) => {
  const claim = publishedClaimById.get(id)
  return !claim || claim.verificationStatus !== 'verified' || claim.riskClass === 'treatment_or_action' || claim.conflictStatus === 'conflicted'
}))) {
  throw new Error('A student-visible span bypassed the medical publication gate')
}
if (publishedEvidence.resources.some((resource) => /quarantin/i.test(resource.processingStatus || ''))) {
  throw new Error('A quarantined resource entered student-visible evidence')
}
if (publishedEvidence.citations.some((citation) => !publishedClaimById.has(citation.claimId) || !publishedResourceById.has(citation.resourceId))) {
  throw new Error('Published evidence contains a broken claim or resource reference')
}
if (report.absolutePathsExposed) throw new Error('Launch package contains an absolute authoring path')
if (coveragePackage.candidateCoverage?.length !== report.reviewCandidates) throw new Error('Coverage package candidate count mismatch')
if (coveragePackage.sourceAvailability?.length !== report.sourceAvailabilityRecords) throw new Error('Coverage package source count mismatch')
if (coveragePackage.candidateCoverage.some((record) => /^queued/.test(record.destination))) throw new Error('Coverage package still contains queued candidates')
if (new Set(coveragePackage.candidateCoverage.map((record) => record.candidateId)).size !== coveragePackage.candidateCoverage.length) throw new Error('Coverage package candidate IDs are not unique')
if (JSON.stringify(coveragePackage).includes('/Users/')) throw new Error('Coverage package contains an absolute authoring path')

const snapshotTables = [
  'schema_migrations', 'app_state', 'user_state', 'students', 'mailboxes', 'emails', 'attachments',
  'user_access', 'role_promotion_audit', 'medical_library_candidate_coverage',
  'medical_library_source_availability',
]
const jsonSafe = (value) => JSON.stringify(value, (_key, item) => typeof item === 'bigint' ? item.toString() : item)
const actor = `migration:${requiredMigrationId}`
const conn = await pool.getConnection()

async function insertCandidateCoverage(rows) {
  const columns = [
    'candidate_id', 'source_id', 'system_id', 'subject', 'topic', 'subtopic', 'microtopic',
    'label', 'statement', 'concept_type', 'risk_class', 'confidence', 'destination', 'reason_code',
    'reason', 'target_concept_id', 'resource_relative_path', 'locator_page', 'locator_printed_page',
    'locator_section', 'locator_start', 'locator_end', 'coverage_unit_id', 'support_span',
  ]
  for (let offset = 0; offset < rows.length; offset += 100) {
    const batch = rows.slice(offset, offset + 100)
    const placeholders = batch.map(() => `(${columns.map(() => '?').join(',')})`).join(',')
    const values = batch.flatMap((record) => [
      record.candidateId, record.sourceId, record.systemId ?? null, record.subject ?? null,
      record.topic ?? null, record.subtopic ?? null, record.microtopic ?? null, record.label ?? null,
      record.statement ?? null, record.conceptType ?? null, record.riskClass ?? null,
      record.confidence ?? null, record.destination, record.reasonCode, record.reason,
      record.targetConceptId ?? null, record.resourceRelativePath ?? null, record.locator?.page ?? null,
      record.locator?.printedPage ?? null, record.locator?.section ?? null, record.locator?.start ?? null,
      record.locator?.end ?? null, record.locator?.coverageUnitId ?? null, record.locator?.supportSpan ?? null,
    ])
    await conn.query(`INSERT INTO medical_library_candidate_coverage (${columns.join(',')}) VALUES ${placeholders}`, values)
  }
}

async function insertSourceAvailability(rows) {
  const columns = ['source_id', 'collection_id', 'relative_path', 'availability_status']
  for (let offset = 0; offset < rows.length; offset += 250) {
    const batch = rows.slice(offset, offset + 250)
    const placeholders = batch.map(() => '(?,?,?,?)').join(',')
    const values = batch.flatMap((record) => [record.sourceId, record.collectionId, record.relativePath ?? null, record.status])
    await conn.query(`INSERT INTO medical_library_source_availability (${columns.join(',')}) VALUES ${placeholders}`, values)
  }
}

try {
  await conn.beginTransaction()
  const [applied] = await conn.query('SELECT id, applied_at AS appliedAt FROM schema_migrations WHERE id = ? FOR UPDATE', [requiredMigrationId])
  if (applied.length) {
    await conn.rollback()
    console.log(JSON.stringify({ applied: false, alreadyApplied: true, migration: applied[0] }, null, 2))
    process.exitCode = 0
  } else {
    const snapshot = {
      schemaVersion: 1,
      createdAt: new Date().toISOString(),
      tables: {},
      historyTablesExcluded: ['app_state_versions', 'user_state_versions'],
      historyNote: 'This point-in-time migration snapshot contains current values. Existing version history remains unchanged in MariaDB.',
    }
    for (const table of snapshotTables) {
      const [rows] = await conn.query(`SELECT * FROM ${table}`)
      snapshot.tables[table] = rows
    }
    const snapshotId = `snapshot-${randomUUID()}`
    await conn.query(
      'INSERT INTO data_snapshots (id, label, snapshot_json, created_by) VALUES (?, ?, ?, ?)',
      [snapshotId, `Before ${requiredMigrationId}`, jsonSafe(snapshot), actor],
    )

    const replacements = []
    for (const [key, value] of stateEntries) {
      const serialized = JSON.stringify(value)
      const [current] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [key])
      if (current.length) {
        await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [key, current[0].v, actor])
        await conn.query('UPDATE app_state SET v = ? WHERE k = ?', [serialized, key])
      } else {
        await conn.query('INSERT INTO app_state (k, v) VALUES (?, ?)', [key, serialized])
      }
      replacements.push({ key, action: current.length ? 'replaced' : 'created', sizeBytes: Buffer.byteLength(serialized) })
    }

    await conn.query('DELETE FROM medical_library_candidate_coverage')
    await insertCandidateCoverage(coveragePackage.candidateCoverage)
    await conn.query('DELETE FROM medical_library_source_availability')
    await insertSourceAvailability(coveragePackage.sourceAvailability)

    const demoStudentIds = launch.demoStudentIds ?? []
    let deletedDemoStudents = 0
    if (demoStudentIds.length) {
      const [result] = await conn.query('DELETE FROM students WHERE id IN (?)', [demoStudentIds])
      deletedDemoStudents = result.affectedRows ?? 0
    }

    await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [requiredMigrationId])
    await conn.commit()

    const [migration] = await conn.query('SELECT id, applied_at AS appliedAt FROM schema_migrations WHERE id = ?', [requiredMigrationId])
    const [states] = await conn.query('SELECT k, OCTET_LENGTH(v) AS sizeBytes, updated_at AS updatedAt FROM app_state WHERE k IN (?) ORDER BY k', [[...expectedStateKeys]])
    const [remainingDemoStudents] = demoStudentIds.length
      ? await conn.query('SELECT id FROM students WHERE id IN (?)', [demoStudentIds])
      : [[]]
    const [[candidateCoverage]] = await conn.query('SELECT COUNT(*) AS total FROM medical_library_candidate_coverage')
    const [[sourceAvailability]] = await conn.query('SELECT COUNT(*) AS total FROM medical_library_source_availability')

    console.log(JSON.stringify({
      applied: true,
      migration: migration[0],
      snapshotId,
      replacements,
      deletedDemoStudents,
      remainingDemoStudentIds: remainingDemoStudents.map((student) => student.id),
      candidateCoverageRows: candidateCoverage.total,
      sourceAvailabilityRows: sourceAvailability.total,
      liveStates: states,
      report,
    }, null, 2))
  }
} catch (error) {
  await conn.rollback().catch(() => {})
  throw error
} finally {
  conn.release()
  await pool.end()
}
