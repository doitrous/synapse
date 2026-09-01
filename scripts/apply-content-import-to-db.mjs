/**
 * Apply authored batches to the live database.
 *
 *   node --experimental-strip-types scripts/apply-content-import-to-db.mjs [--commit] <batch.md> ...
 *
 * This is the only script in the repository that writes to production. It exists
 * because the alternative was 40 passes through the import wizard by hand.
 *
 * It does NOT re-implement the importer. It pulls the live states out of
 * `app_state`, hands them to `simulate-content-import.mjs` as a source bundle,
 * and writes back what that produces — so the code path that decides what a
 * record becomes is the same one the wizard uses and the same one the
 * verification runs against. If the simulation reports a single row error,
 * nothing is written.
 *
 * Safety:
 *   - Dry run by default. `--commit` is required to write anything.
 *   - Every affected key is written to a timestamped backup file BEFORE the
 *     first UPDATE, and the path is printed. Restoring is a manual, deliberate
 *     act with that file.
 *   - Each write inserts an `app_state_versions` row holding the value it is
 *     about to store, inside the same transaction, exactly as the server's own
 *     PUT does — so the newest version row equals app_state and the next client
 *     edit merges against the current document rather than a stale one.
 *   - Merge, never replace: the live state is the base. A record the batches do
 *     not mention is untouched.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const run = promisify(execFile)
const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')

// The driver is a server dependency, not a root one. Resolving it from the
// server package is preferable to adding mysql2 to the front-end's tree just so
// one operational script can run.
const { createConnection } = createRequire(join(root, 'server', 'package.json'))('mysql2/promise')

const args = process.argv.slice(2)
const commit = args.includes('--commit')
const files = args.filter((a) => !a.startsWith('--'))
if (!files.length) throw new Error('Give at least one batch file')

const KEYS = ['nishany-admin-content-ledger-v4', 'nishany-concept-graph-v2', 'nishany-medical-evidence-v1', 'nishany-minigame-packs-v1']
const LEDGER_KEY = KEYS[0]
const GRAPH_KEY = KEYS[1]
const MINIGAME_PACKS_KEY = KEYS[3]

/** The connection string the server itself uses. Never printed. */
async function databaseUrl() {
  const env = await readFile(join(root, '.env.local'), 'utf8')
  const match = env.match(/^DATABASE_URL=(.+)$/m)
  if (!match) throw new Error('No DATABASE_URL in .env.local')
  return match[1].trim()
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const backupFile = join(root, `.import-backup-${stamp}.json`)
const beforeFile = join(root, `.import-source-${stamp}.json`)
const afterFile = join(root, `.import-result-${stamp}.json`)

// NOTE: this needs a route to the database. The public port is firewalled, which
// is correct, so this script only runs from somewhere on the internal network.
const connection = await createConnection(await databaseUrl())

try {
  /* ---- read the live state ------------------------------------------------ */

  const [rows] = await connection.query('SELECT k, v FROM app_state WHERE k IN (?)', [KEYS])
  const live = {}
  for (const row of rows) live[row.k] = typeof row.v === 'string' ? JSON.parse(row.v) : row.v
  for (const key of KEYS) if (!(key in live)) console.warn(`! ${key} is absent from app_state; it will be created`)

  const countsOf = (states) => ({
    articles: (states[LEDGER_KEY] ?? []).filter((i) => i.kind === 'article').length,
    questions: (states[LEDGER_KEY] ?? []).filter((i) => i.kind === 'question').length,
    practicals: (states[LEDGER_KEY] ?? []).filter((i) => i.kind === 'practical').length,
    concepts: (states[GRAPH_KEY]?.concepts ?? []).length,
    minigamePacks: (states[MINIGAME_PACKS_KEY]?.packs ?? []).length,
  })

  console.log('live before:', JSON.stringify(countsOf(live)))

  // The backup is written before anything else, so a crash between here and the
  // write still leaves the operator holding the original.
  await writeFile(backupFile, `${JSON.stringify({ takenAt: stamp, states: live }, null, 1)}\n`)
  console.log('backup:', backupFile)

  /* ---- apply, through the verified path ------------------------------------ */

  await writeFile(beforeFile, `${JSON.stringify({ states: live })}\n`)
  const { stdout } = await run('node', [
    '--experimental-strip-types', join(here, 'simulate-content-import.mjs'),
    '--source', beforeFile, '--emit', afterFile, ...files,
  ], { cwd: root, maxBuffer: 512 * 1024 * 1024 })

  const report = JSON.parse(stdout.slice(stdout.indexOf('{')))
  const applied = report.batches.reduce((sum, b) => sum + b.created + b.updated, 0)
  const rejected = report.batches.reduce((sum, b) => sum + b.rejected, 0)
  console.log(`batches: ${report.batches.length}  applied: ${applied}  rejected: ${rejected}`)

  if (report.errors.length || rejected || report.skipped?.length) {
    console.error('REFUSING TO WRITE — the simulation did not come back clean:')
    for (const e of report.errors.slice(0, 20)) console.error('  error:', e)
    for (const s of report.skipped ?? []) console.error('  skipped:', s)
    if (rejected) console.error(`  ${rejected} row(s) rejected`)
    process.exitCode = 1
  } else {
    const after = JSON.parse(await readFile(afterFile, 'utf8')).states
    const writeKeys = KEYS.filter((key) => key in after)
    console.log('would write:', JSON.stringify(countsOf(after)))

    if (!commit) {
      console.log('\nDRY RUN. Nothing was written. Re-run with --commit to apply.')
    } else {
      /* ---- write ---------------------------------------------------------- */
      await connection.beginTransaction()
      try {
        for (const key of writeKeys) {
          const value = JSON.stringify(after[key])
          // Record the value being WRITTEN as the newest version — exactly what
          // PUT /api/state/:key does (index.js). The server reconstructs every
          // client's optimistic-merge base from the newest app_state_versions
          // row, so it must hold the same document app_state now holds. Recording
          // the prior value here (as this once did) left the newest version row
          // one generation behind app_state: every client then merged its next
          // edit against a document that predated the import, and the edit —
          // publishing an imported item, most visibly — came back a phantom
          // conflict and was silently reverted. See stateMerge.test.js.
          await connection.query(
            'INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)',
            [key, value, null],
          )
          await connection.query(
            'INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)',
            [key, value],
          )
        }
        await connection.commit()
      } catch (error) {
        await connection.rollback()
        throw error
      }

      /* ---- verify against the database, not against intent ----------------- */
      const [check] = await connection.query('SELECT k, v FROM app_state WHERE k IN (?)', [writeKeys])
      const written = {}
      for (const row of check) written[row.k] = typeof row.v === 'string' ? JSON.parse(row.v) : row.v
      console.log('live after: ', JSON.stringify(countsOf(written)))
    }
  }
} finally {
  await connection.end()
}
