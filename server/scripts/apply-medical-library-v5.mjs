import { randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from '../src/db.js'

const here = dirname(fileURLToPath(import.meta.url))
const launch = JSON.parse(await readFile(join(here, '..', 'data', 'medical-library-v1.json'), 'utf8'))
const requiredMigrationId = '2026-08-11-medical-library-release-quality-v5'
const approval = process.env.MEDICAL_LIBRARY_APPLY

if (launch.migrationId !== requiredMigrationId) {
  throw new Error(`Expected ${requiredMigrationId}; launch package contains ${launch.migrationId}`)
}
if (approval !== requiredMigrationId) {
  throw new Error(`Refusing to mutate MariaDB. Set MEDICAL_LIBRARY_APPLY=${requiredMigrationId} after explicit owner approval.`)
}

const stateEntries = Object.entries(launch.states)
const expectedStateKeys = new Set([
  'nishany-academic-universities-v1',
  'nishany-course-curricula-v1',
  'nishany-module-schedules-v1',
  'nishany-taxonomy-tree-v4',
  'nishany-medical-library-taxonomy-v1',
  'nishany-admin-content-ledger-v4',
  'nishany-concept-graph-v2',
  'nishany-medical-evidence-v1',
  'nishany-medical-evidence-published-v1',
  'nishany-relation-types-v1',
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
  publishedArticles: 15,
  publishedSpans: 54,
  concepts: 1718,
  activeConcepts: 51,
  claims: 1741,
  verifiedClaims: 55,
  citations: 1814,
  relations: 47,
  resources: 47,
}
for (const [field, expected] of Object.entries(expectedCounts)) {
  if (report[field] !== expected) throw new Error(`Launch package ${field} count is ${report[field]}; expected ${expected}`)
}

const ledger = launch.states['nishany-admin-content-ledger-v4'] || []
const articles = ledger.filter((item) => item.kind === 'article')
const conceptGraph = launch.states['nishany-concept-graph-v2'] || { concepts: [], relations: [] }
const evidence = launch.states['nishany-medical-evidence-v1'] || { claims: [], citations: [], resources: [], articleSpans: [] }
const publishedEvidence = launch.states['nishany-medical-evidence-published-v1'] || { claims: [], citations: [], resources: [], articleSpans: [] }
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

const snapshotTables = [
  'schema_migrations', 'app_state', 'app_state_versions', 'user_state',
  'user_state_versions', 'students', 'mailboxes', 'emails', 'attachments',
  'user_access', 'role_promotion_audit',
]
const jsonSafe = (value) => JSON.stringify(value, (_key, item) => typeof item === 'bigint' ? item.toString() : item)
const actor = `migration:${requiredMigrationId}`
const conn = await pool.getConnection()

try {
  await conn.beginTransaction()
  const [applied] = await conn.query('SELECT id, applied_at AS appliedAt FROM schema_migrations WHERE id = ? FOR UPDATE', [requiredMigrationId])
  if (applied.length) {
    await conn.rollback()
    console.log(JSON.stringify({ applied: false, alreadyApplied: true, migration: applied[0] }, null, 2))
    process.exitCode = 0
  } else {
    const snapshot = { schemaVersion: 1, createdAt: new Date().toISOString(), tables: {} }
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

    console.log(JSON.stringify({
      applied: true,
      migration: migration[0],
      snapshotId,
      replacements,
      deletedDemoStudents,
      remainingDemoStudentIds: remainingDemoStudents.map((student) => student.id),
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
