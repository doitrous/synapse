import { readFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DEFAULT_DIR = join(__dirname, '..', 'migrations')

// Refuses to run a file containing these unless its name ends `.dangerous.sql`
// — a DROP or a column-type change is the one class of migration that can lose
// data or fail halfway through a multi-statement file (MariaDB DDL auto-commits
// per statement, so there is no transaction to roll a partial file back; fix
// forward with a new migration rather than editing an applied one).
const DANGEROUS_PATTERN = /\bDROP\s|\bMODIFY\s+COLUMN\b|\bCHANGE\s+COLUMN\b/i

// Same splitter that used to live in db.js's schema.sql runner: split on `;`
// followed by a newline. Not a real SQL parser — it only has to survive this
// repo's migration files, which don't put semicolons inside string literals.
function splitStatements(sql) {
  return sql
    .split(/;\s*[\r\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function assertSafe(filename, sql) {
  if (filename.endsWith('.dangerous.sql')) return
  if (DANGEROUS_PATTERN.test(sql)) {
    throw new Error(
      `[migrate] refusing ${filename}: contains DROP/MODIFY COLUMN/CHANGE COLUMN. ` +
        'If this is intentional, rename the file to end in ".dangerous.sql".',
    )
  }
}

/**
 * Applies every server/migrations/*.sql file not yet recorded in
 * `schema_migration_files`, in filename order. Each file's statements run
 * outside an explicit transaction — MariaDB DDL auto-commits per statement
 * regardless, so a multi-statement file that fails partway must be fixed
 * forward with a new migration, never edited in place.
 *
 * Named `schema_migration_files` rather than `schema_migrations`: that name is
 * already a legacy marker table (id VARCHAR PRIMARY KEY) used throughout
 * db.js and scripts/ for one-off data migrations, unrelated to this file
 * registry.
 */
export async function runMigrations(pool, { dir = DEFAULT_DIR } = {}) {
  const conn = await pool.getConnection()
  try {
    // Read first, create only when missing: the runtime user may hold DML
    // rights only (DDL runs from the pre-deploy step as another user), and
    // CREATE TABLE IF NOT EXISTS is refused for it even when the table exists.
    let rows
    try {
      ;[rows] = await conn.query('SELECT version FROM schema_migration_files')
    } catch (err) {
      if (err?.code !== 'ER_NO_SUCH_TABLE') throw err
      await conn.query(
        `CREATE TABLE IF NOT EXISTS schema_migration_files (
          version    VARCHAR(64) PRIMARY KEY,
          applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
      )
      ;[rows] = await conn.query('SELECT version FROM schema_migration_files')
    }
    const applied = new Set(rows.map((row) => row.version))

    let files
    try {
      files = (await readdir(dir)).filter((f) => f.endsWith('.sql')).sort()
    } catch (err) {
      if (err.code !== 'ENOENT') throw err
      files = []
    }

    let ranAny = false
    for (const file of files) {
      if (applied.has(file)) continue
      const sql = await readFile(join(dir, file), 'utf8')
      assertSafe(file, sql)
      const started = Date.now()
      for (const statement of splitStatements(sql)) await conn.query(statement)
      await conn.query('INSERT INTO schema_migration_files (version) VALUES (?)', [file])
      console.log(`[migrate] applied ${file} (${Date.now() - started}ms)`)
      ranAny = true
    }
    if (!ranAny) console.log('[migrate] up to date')
  } finally {
    conn.release()
  }
}
