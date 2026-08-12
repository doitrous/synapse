/**
 * Is the database reachable, and does it hold what we expect?
 *
 *   npm --prefix server run conncheck
 *
 * Written because "it doesn't work" has several very different causes, and the
 * error a driver returns rarely says which. This separates them: a timeout is a
 * firewall or a closed tunnel, a refusal is nothing listening on that port, an
 * access-denied is credentials, and an unknown-database is the name. Each gets
 * a sentence saying what to do about it.
 *
 * It reads only. Nothing here writes, and it prints no credential — the host and
 * port are echoed to confirm which endpoint was tried, never the user or password.
 */
import { pool } from '../src/db.js'

const host = process.env.DB_HOST ?? '(unset)'
const port = process.env.DB_PORT ?? '3306'
const name = process.env.DB_NAME ?? '(unset)'

const ADVICE = {
  ETIMEDOUT: 'Timed out. Nothing is accepting connections on that port — the SSH tunnel is probably not open, or a firewall is dropping the packets.',
  ECONNREFUSED: 'Refused. The host answered but nothing is listening on that port. If you are tunnelling, check the local port matches DB_PORT.',
  ER_ACCESS_DENIED_ERROR: 'The database rejected the username or password in server/.env.',
  ER_BAD_DB_ERROR: `The database named "${name}" does not exist on that server. Check DB_NAME in server/.env.`,
  ENOTFOUND: 'The hostname could not be resolved. Check DB_HOST in server/.env.',
}

console.log(`trying ${host}:${port}, database "${name}"`)

try {
  const [[version]] = await pool.query('SELECT VERSION() AS version, DATABASE() AS db')
  console.log(`connected — ${version.version}, database "${version.db}"`)

  const [tables] = await pool.query('SHOW TABLES')
  console.log(`tables: ${tables.length}`)

  // The tables this project actually depends on. A missing one means the schema
  // has not been applied, which is a different problem from a bad connection.
  for (const table of ['app_state', 'app_state_versions', 'schema_migrations', 'user_access', 'students']) {
    try {
      const [[row]] = await pool.query(`SELECT COUNT(*) AS n FROM \`${table}\``)
      console.log(`  ${table.padEnd(20)} ${row.n} rows`)
    } catch {
      console.log(`  ${table.padEnd(20)} MISSING — run: npm --prefix server run migrate`)
    }
  }
} catch (error) {
  const code = error.code ?? ''
  console.error(`could not connect (${code || error.message})`)
  if (ADVICE[code]) console.error(ADVICE[code])
  process.exitCode = 1
} finally {
  await pool.end()
}
