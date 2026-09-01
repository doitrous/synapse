/**
 * BLK-09 — give every record a subject the student library can group by.
 *
 *   node --env-file-if-exists=.env scripts/repair-orphaned-subject-ids.mjs
 *   node --env-file-if-exists=.env scripts/repair-orphaned-subject-ids.mjs --commit
 *
 * 76 ledger items and 736 concepts carry `subjectId: "medical"`, which is not
 * one of the twenty valid subjects. The student library groups by subject, so
 * these records exist and cannot be reached.
 *
 * The subject is inferred, not guessed. Every one of these records carries a
 * canonical `SYS-*` placement — 94 concepts as their primary node and the rest
 * among their secondaries — and `CURRICULUM_SYSTEM_CROSSWALK` already maps each
 * system root to its subject. So the repair reads a placement a human reviewed
 * and translates it, rather than inventing one from a title.
 *
 * Two things it will not do. A record with no `SYS-*` placement anywhere is left
 * alone and reported, because there is nothing to infer from and a wrong subject
 * is worse than a missing one. And nothing is written without `--commit`; the
 * default run prints the whole mapping so it can be read before it is applied.
 */
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from '../src/db.js'

const here = dirname(fileURLToPath(import.meta.url))
const commit = process.argv.includes('--commit')
const MIGRATION_ID = '2026-08-13-repair-orphaned-subject-ids'
const LEDGER_KEY = 'nishany-admin-content-ledger-v4'
const GRAPH_KEY = 'nishany-concept-graph-v2'

/**
 * System root → subject, read from the crosswalk the app itself uses.
 *
 * Parsed from the TypeScript source rather than imported, because this script
 * runs under plain Node in the server package and must not depend on the
 * frontend's build. The shape is a stable one-line-per-subject literal, and a
 * parse that finds nothing fails loudly below rather than silently mapping none.
 */
async function subjectBySystemRoot() {
  const source = await readFile(join(here, '..', '..', 'src', 'data', 'taxonomyCrosswalk.ts'), 'utf8')
  const block = source.match(/CURRICULUM_SYSTEM_CROSSWALK[^{]*\{([\s\S]*?)\n\}/)
  if (!block) throw new Error('could not read CURRICULUM_SYSTEM_CROSSWALK')
  const map = new Map()
  for (const line of block[1].split('\n')) {
    const entry = line.match(/^\s*'?([a-z]+)'?:\s*at\('([A-Z-]+)'/)
    if (entry) map.set(entry[2], entry[1])
  }
  if (map.size < 15) throw new Error(`crosswalk parse looks wrong: ${map.size} subjects`)
  return map
}

/** The `SYS-*` root a record sits under, from whichever placement carries one. */
function systemRootOf(record, articleData) {
  const primary = articleData?.primaryNodeId ?? record.primaryNodeId
  const secondary = articleData?.secondaryNodeIds ?? record.secondaryNodeIds ?? []
  const candidates = [primary, ...secondary].filter(Boolean)
  const sys = candidates.find((id) => String(id).startsWith('SYS-'))
  return sys ? String(sys).split('-').slice(0, 2).join('-') : null
}

const bySystem = await subjectBySystemRoot()
console.log(`crosswalk: ${bySystem.size} system roots → subjects`)

const [[ledgerRow]] = await pool.query('SELECT v FROM app_state WHERE k = ?', [LEDGER_KEY])
const [[graphRow]] = await pool.query('SELECT v FROM app_state WHERE k = ?', [GRAPH_KEY])
if (!ledgerRow || !graphRow) throw new Error('ledger or concept graph missing from app_state')

const ledger = JSON.parse(ledgerRow.v)
const graph = JSON.parse(graphRow.v)

const plan = { ledger: [], concepts: [], unresolvedLedger: [], unresolvedConcepts: [] }

for (const item of ledger) {
  if (item.subjectId !== 'medical') continue
  const root = systemRootOf(item, item.articleData)
  const subject = root ? bySystem.get(root) : null
  if (subject) plan.ledger.push({ id: item.id, title: item.title, root, subject })
  else plan.unresolvedLedger.push({ id: item.id, title: item.title })
}

for (const concept of graph.concepts ?? []) {
  if (concept.subjectId !== 'medical') continue
  const root = systemRootOf(concept)
  const subject = root ? bySystem.get(root) : null
  if (subject) plan.concepts.push({ id: concept.id, label: concept.label, root, subject })
  else plan.unresolvedConcepts.push({ id: concept.id, label: concept.label })
}

const tally = (rows) => rows.reduce((acc, row) => { acc[row.subject] = (acc[row.subject] ?? 0) + 1; return acc }, {})

console.log(JSON.stringify({
  migrationId: MIGRATION_ID,
  mode: commit ? 'COMMIT' : 'dry run — nothing written',
  ledger: { resolved: plan.ledger.length, unresolved: plan.unresolvedLedger.length, bySubject: tally(plan.ledger) },
  concepts: { resolved: plan.concepts.length, unresolved: plan.unresolvedConcepts.length, bySubject: tally(plan.concepts) },
  sampleLedger: plan.ledger.slice(0, 8),
  sampleConcepts: plan.concepts.slice(0, 8),
  unresolvedLedger: plan.unresolvedLedger.slice(0, 20),
  unresolvedConcepts: plan.unresolvedConcepts.slice(0, 20),
}, null, 1))

if (!commit) {
  console.log('\nDry run. Re-run with --commit to apply.')
  await pool.end()
  process.exit(0)
}

const conn = await pool.getConnection()
try {
  const [applied] = await conn.query('SELECT id FROM schema_migrations WHERE id = ?', [MIGRATION_ID])
  if (applied.length) {
    console.log('already applied; nothing to do')
  } else {
    await conn.beginTransaction()
    // The previous documents are versioned before being replaced, so this is
    // reversible from `app_state_versions` without a database restore.
    await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [LEDGER_KEY, ledgerRow.v, `migration:${MIGRATION_ID}`])
    await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [GRAPH_KEY, graphRow.v, `migration:${MIGRATION_ID}`])

    const ledgerSubject = new Map(plan.ledger.map((row) => [row.id, row.subject]))
    const conceptSubject = new Map(plan.concepts.map((row) => [row.id, row.subject]))
    for (const item of ledger) if (ledgerSubject.has(item.id)) item.subjectId = ledgerSubject.get(item.id)
    for (const concept of graph.concepts ?? []) if (conceptSubject.has(concept.id)) concept.subjectId = conceptSubject.get(concept.id)

    await conn.query('UPDATE app_state SET v = ? WHERE k = ?', [JSON.stringify(ledger), LEDGER_KEY])
    await conn.query('UPDATE app_state SET v = ? WHERE k = ?', [JSON.stringify(graph), GRAPH_KEY])
    await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [MIGRATION_ID])
    await conn.commit()
    console.log(`applied: ${plan.ledger.length} ledger items, ${plan.concepts.length} concepts`)
  }
} catch (error) {
  await conn.rollback()
  throw error
} finally {
  conn.release()
  await pool.end()
}
