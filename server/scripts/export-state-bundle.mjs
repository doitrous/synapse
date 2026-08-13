/**
 * Dump `app_state` into the bundle shape the offline tooling already reads.
 *
 *   node --env-file-if-exists=.env scripts/export-state-bundle.mjs /tmp/live.json
 *
 * The simulator, the field audit and the batch validator all take a bundle. This
 * lets them run against production state without any of them learning about the
 * database, and it means what gets audited is byte-for-byte what is live.
 */
import { writeFile } from 'node:fs/promises'
import { pool } from '../src/db.js'

const out = process.argv[2]
if (!out) throw new Error('Usage: export-state-bundle.mjs <output.json>')

const [rows] = await pool.query('SELECT k, v FROM app_state')
const states = {}
for (const row of rows) {
  try { states[row.k] = JSON.parse(row.v) }
  catch { states[row.k] = row.v }
}
await writeFile(out, JSON.stringify({ exportedAt: new Date().toISOString(), states }, null, 1))
console.log(`exported ${rows.length} state keys to ${out}`)
for (const k of Object.keys(states)) {
  const v = states[k]
  const size = Array.isArray(v) ? `${v.length} items` : v && typeof v === 'object' ? `${Object.keys(v).length} keys` : typeof v
  console.log(`  ${k.padEnd(42)} ${size}`)
}
await pool.end()
