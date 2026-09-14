/**
 * Targeted backup + restore for the admin content ledger — the one document the
 * ControlDashboard rewrite touches. A recovery point that is scoped to the
 * ledger (not the whole snapshot bundle) so restoring it can never clobber
 * unrelated concurrent state, and small enough to dump and re-apply reliably.
 *
 *   node scripts/backup-content-ledger.mjs dump    <out.json>
 *   node scripts/backup-content-ledger.mjs restore <in.json>   [--yes]
 *
 * Needs DATABASE_URL (or DB_* vars) pointing at the target database, same as the
 * server. `dump` is a read-only SELECT. `restore` overwrites the ledger row and
 * APPENDS a matching app_state_versions row in one transaction — without that
 * version row the content silently reverts (publish-revert baseline), so the
 * restore is version-aware by construction.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { pool } from '../src/db.js'

const LEDGER_KEY = 'nishany-admin-content-ledger-v4'

const itemCount = (raw) => { try { const v = JSON.parse(raw); return Array.isArray(v) ? v.length : null } catch { return null } }

async function dump(out) {
  if (!out) throw new Error('Usage: backup-content-ledger.mjs dump <out.json>')
  const [[stateRow]] = [await pool.query('SELECT v, updated_at AS updatedAt FROM app_state WHERE k = ?', [LEDGER_KEY])]
  if (!stateRow.length) throw new Error(`no ${LEDGER_KEY} row in app_state — nothing to back up`)
  const [[verRow]] = [await pool.query('SELECT MAX(id) AS version FROM app_state_versions WHERE k = ?', [LEDGER_KEY])]
  const value = stateRow[0].v
  const count = itemCount(value)
  if (count === null) throw new Error('the stored ledger is not a JSON array — refusing to back up a corrupt value')
  const backup = {
    key: LEDGER_KEY,
    capturedAt: new Date().toISOString(),
    sourceVersion: verRow[0]?.version ?? null,
    sourceUpdatedAt: stateRow[0].updatedAt,
    itemCount: count,
    value: JSON.parse(value),
  }
  await writeFile(out, JSON.stringify(backup))
  console.log(`backed up ${count} items (${(value.length / 1e6).toFixed(1)} MB) from version ${backup.sourceVersion} → ${out}`)
}

async function restore(inFile, confirmed) {
  if (!inFile) throw new Error('Usage: backup-content-ledger.mjs restore <in.json> [--yes]')
  const backup = JSON.parse(await readFile(inFile, 'utf8'))
  if (backup.key !== LEDGER_KEY) throw new Error(`backup is for ${backup.key}, not ${LEDGER_KEY}`)
  if (!Array.isArray(backup.value)) throw new Error('backup value is not an array — refusing to restore')
  const json = JSON.stringify(backup.value)

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [[current]] = [await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [LEDGER_KEY])]
    const currentCount = current.length ? itemCount(current[0].v) : 0
    console.log(`current ledger: ${currentCount} items → restoring ${backup.value.length} items (captured ${backup.capturedAt})`)
    if (!confirmed) {
      await conn.rollback()
      console.log('DRY RUN — re-run with --yes to apply. Nothing was written.')
      return
    }
    await conn.query(
      'INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)',
      [LEDGER_KEY, json],
    )
    // The matching version row: without it the newest app_state_versions id no
    // longer names app_state, and the content reads as reverted on next load.
    await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [LEDGER_KEY, json, 'restore:backup-content-ledger'])
    await conn.commit()
    console.log(`restored ${backup.value.length} items and appended a version row.`)
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}

const [cmd, file] = process.argv.slice(2)
const confirmed = process.argv.includes('--yes')
const run = cmd === 'dump' ? dump(file) : cmd === 'restore' ? restore(file, confirmed)
  : Promise.reject(new Error('Usage: backup-content-ledger.mjs <dump|restore> <file> [--yes]'))
run.then(() => pool.end()).catch((error) => { console.error(error.message); pool.end(); process.exit(1) })
