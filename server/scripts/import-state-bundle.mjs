/**
 * Write a reviewed state bundle back into `app_state`.
 *
 *   node --env-file-if-exists=.env scripts/import-state-bundle.mjs <after.json> --migration <id>
 *   node --env-file-if-exists=.env scripts/import-state-bundle.mjs <after.json> --migration <id> --commit
 *
 * The other half of `export-state-bundle.mjs`. Between the two sits the offline
 * pipeline: simulate the batches against exported production state, audit the
 * result, and only then write it back. What lands in the database is the exact
 * document that was audited, not a re-derivation of it.
 *
 * Three properties, each learned from something going wrong earlier:
 *
 * - Only keys that actually changed are written. Rewriting an unchanged
 *   document would create a misleading version entry and make the history
 *   useless for working out when something really moved.
 * - Every key it replaces is versioned into `app_state_versions` first, so a
 *   bad import is undone by restoring a row rather than a database.
 * - It refuses to shrink a collection unless `--allow-shrink` is given. An
 *   import that removes articles is either a mistake or a deliberate deletion,
 *   and those should not look the same at the command line.
 */
import { readFile } from 'node:fs/promises'
import { pool } from '../src/db.js'

const args = process.argv.slice(2)
const file = args.find((a) => !a.startsWith('--'))
const commit = args.includes('--commit')
const allowShrink = args.includes('--allow-shrink')
const migrationId = args[args.indexOf('--migration') + 1]

if (!file) throw new Error('Usage: import-state-bundle.mjs <bundle.json> --migration <id> [--commit]')
if (!migrationId || migrationId.startsWith('--')) throw new Error('--migration <id> is required, so the write is traceable')

const bundle = JSON.parse(await readFile(file, 'utf8'))
const states = bundle.states ?? {}

const [rows] = await pool.query('SELECT k, v FROM app_state')
const current = new Map(rows.map((row) => [row.k, row.v]))

/** How many records a state document holds, for the shrink guard. */
function countOf(value) {
  if (Array.isArray(value)) return value.length
  if (value && typeof value === 'object') {
    return Object.values(value).reduce((sum, v) => sum + (Array.isArray(v) ? v.length : 0), 0)
  }
  return 0
}

const planned = []
const shrinking = []
for (const [key, value] of Object.entries(states)) {
  const next = JSON.stringify(value)
  const previous = current.get(key)
  if (previous === next) continue

  const before = previous ? countOf(JSON.parse(previous)) : 0
  const after = countOf(value)
  planned.push({ key, before, after, delta: after - before, isNew: previous === undefined })
  if (after < before) shrinking.push({ key, before, after })
}

console.log(JSON.stringify({
  migrationId,
  mode: commit ? 'COMMIT' : 'dry run — nothing written',
  keysInBundle: Object.keys(states).length,
  keysChanged: planned.length,
  changes: planned,
}, null, 1))

if (shrinking.length && !allowShrink) {
  console.error('\nRefusing to write: these keys would lose records.')
  for (const s of shrinking) console.error(`  ${s.key}: ${s.before} → ${s.after}`)
  console.error('If that is intended, re-run with --allow-shrink.')
  await pool.end()
  process.exit(1)
}

if (!planned.length) {
  console.log('\nNothing to write — live state already matches the bundle.')
  await pool.end()
  process.exit(0)
}

if (!commit) {
  console.log('\nDry run. Re-run with --commit to apply.')
  await pool.end()
  process.exit(0)
}

const conn = await pool.getConnection()
try {
  await conn.beginTransaction()
  for (const change of planned) {
    const previous = current.get(change.key)
    if (previous !== undefined) {
      await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [change.key, previous, `migration:${migrationId}`])
    }
    const next = JSON.stringify(states[change.key])
    await conn.query(
      'INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)',
      [change.key, next],
    )
  }
  const [applied] = await conn.query('SELECT id FROM schema_migrations WHERE id = ?', [migrationId])
  if (!applied.length) await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [migrationId])
  await conn.commit()
  console.log(`\napplied ${planned.length} keys, ${planned.length} rollback snapshots written`)
} catch (error) {
  await conn.rollback()
  throw error
} finally {
  conn.release()
  await pool.end()
}
