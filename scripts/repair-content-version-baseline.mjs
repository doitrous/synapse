/**
 * Repair the version baseline of shared content documents.
 *
 *   node --experimental-strip-types scripts/repair-content-version-baseline.mjs [--commit]
 *
 * WHY THIS EXISTS
 *
 * The server keeps one invariant per shared state key: the newest
 * `app_state_versions` row holds the same document as `app_state`. Every client
 * reads `version = MAX(app_state_versions.id)` and, on save, the server rebuilds
 * that client's merge base from that row. If the newest version row is a
 * generation behind `app_state`, the base is stale, and the next edit — most
 * visibly, publishing a question — is detected as a conflict and silently
 * reverted in the browser.
 *
 * A previous build of `apply-content-import-to-db.mjs` broke exactly this: it
 * recorded the PRE-import ledger in the newest version row while `app_state`
 * received the POST-import ledger. This script heals a database left in that
 * state by appending a fresh version row that equals the current `app_state`
 * for any key whose newest version row disagrees with it.
 *
 * It is safe to run repeatedly: a key already healthy is left untouched, and a
 * corrective row is only ever a copy of what `app_state` already serves.
 *
 * Safety:
 *   - Dry run by default. `--commit` is required to write anything.
 *   - Only appends `app_state_versions` rows. It never edits `app_state`, so it
 *     cannot change a single character of what students or admins see; it only
 *     restores the baseline the next save will merge against.
 *   - Reads DATABASE_URL from the environment first (like the server's db.js),
 *     falling back to server/.env.local, so it runs both inside the deployed
 *     container and from a dev box reaching the database over the tunnel.
 *
 * NOTE: production heals itself automatically. The same repair ships as a
 * marker-guarded migration in server/src/db.js and runs once at the boot that
 * deploys it. This standalone script is for other databases or a manual re-run.
 */
import { readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const { createConnection } = createRequire(join(root, 'server', 'package.json'))('mysql2/promise')

const commit = process.argv.slice(2).includes('--commit')

/** The shared, mergeable documents whose baseline the server depends on. */
const KEYS = [
  'synapse-admin-content-ledger-v4',
  'synapse-concept-graph-v2',
  'synapse-medical-evidence-v1',
  'synapse-minigame-packs-v1',
  'synapse-library-trees-v1',
  'synapse-academic-universities-v1',
  'synapse-media-library-v1',
]

async function databaseUrl() {
  // Prefer the environment, exactly like the server's own db.js — so this runs
  // unchanged inside the deployed container (DATABASE_URL is injected there) or
  // from any box with it exported. Fall back to server/.env.local for a dev
  // machine reaching the database over the tunnel.
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL.trim()
  const env = await readFile(join(root, 'server', '.env.local'), 'utf8').catch(() => readFile(join(root, '.env.local'), 'utf8')).catch(() => '')
  const match = env.match(/^DATABASE_URL=(.+)$/m)
  if (!match) throw new Error('No DATABASE_URL in the environment or server/.env.local')
  return match[1].trim()
}

/** Compare by structure, not by byte, so serialisation differences are not "drift". */
function normalise(raw) {
  if (raw == null) return null
  try { return JSON.stringify(JSON.parse(raw)) } catch { return raw }
}

const connection = await createConnection(await databaseUrl())
let repaired = 0
try {
  for (const key of KEYS) {
    const [stateRows] = await connection.query('SELECT v FROM app_state WHERE k = ?', [key])
    if (!stateRows.length) { console.log(`- ${key}: absent from app_state; nothing to serve, skipping`); continue }
    const current = stateRows[0].v

    const [versionRows] = await connection.query(
      'SELECT id, v FROM app_state_versions WHERE k = ? ORDER BY id DESC LIMIT 1', [key],
    )
    const newest = versionRows.length ? versionRows[0] : null

    if (newest && normalise(newest.v) === normalise(current)) {
      console.log(`  ${key}: healthy (newest version #${newest.id} matches app_state)`)
      continue
    }

    repaired += 1
    const was = newest ? `newest version #${newest.id} predates app_state` : 'no version row exists'
    console.log(`! ${key}: ${was} — will append a version row equal to app_state`)
    if (commit) {
      await connection.query(
        'INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [key, current, null],
      )
    }
  }

  if (!repaired) {
    console.log('\nAll keys healthy. Nothing to do.')
  } else if (!commit) {
    console.log(`\nDRY RUN. ${repaired} key(s) would be repaired. Re-run with --commit to apply.`)
  } else {
    console.log(`\nRepaired ${repaired} key(s). Publishing should register from the next page load.`)
  }
} finally {
  await connection.end()
}
