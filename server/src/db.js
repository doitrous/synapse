import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import mysql from 'mysql2/promise'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * A single shared connection pool. Prefers DATABASE_URL; otherwise assembles the
 * connection from the discrete DB_* vars (matches .env.local).
 */
export const pool = mysql.createPool(
  process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        charset: 'utf8mb4',
      },
)

/** Run schema.sql once at boot so a fresh database is ready with no manual step. */
export async function migrate() {
  const sql = await readFile(join(__dirname, '..', 'schema.sql'), 'utf8')
  const statements = sql.split(/;\s*[\r\n]/).map((s) => s.trim()).filter(Boolean)
  const conn = await pool.getConnection()
  try {
    for (const statement of statements) await conn.query(statement)

    // schema.sql only creates tables that do not exist yet, so a column added
    // to an existing table needs its own statement. Guarded by a lookup rather
    // than a migration marker: the check is exact, and a database restored from
    // a dump that already has the column must not fail to boot.
    const [mfaColumn] = await conn.query(
      `SELECT 1 FROM information_schema.columns
        WHERE table_schema = DATABASE() AND table_name = 'user_access' AND column_name = 'mfa_required'`,
    )
    if (!mfaColumn.length) {
      await conn.query(
        'ALTER TABLE user_access ADD COLUMN mfa_required BOOLEAN NOT NULL DEFAULT 0 AFTER status',
      )
    }

    // The owner authorised a clean academic slate before any real university
    // data exists. Archive and clear these documents exactly once; the marker
    // prevents later restarts from touching real records added afterward.
    const migrationId = '2026-08-10-clear-academic-catalogue'
    const [applied] = await conn.query('SELECT id FROM schema_migrations WHERE id = ?', [migrationId])
    if (!applied.length) {
      const cleanDocuments = new Map([
        ['synapse-academic-universities-v1', '[]'],
        ['synapse-course-curricula-v1', '{}'],
        ['synapse-module-schedules-v1', '{}'],
      ])
      await conn.beginTransaction()
      try {
        for (const [key, cleanValue] of cleanDocuments) {
          const [rows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [key])
          if (rows.length) {
            await conn.query(
              'INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)',
              [key, rows[0].v, `migration:${migrationId}`],
            )
            await conn.query('UPDATE app_state SET v = ? WHERE k = ?', [cleanValue, key])
          }
        }
        await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [migrationId])
        await conn.commit()
      } catch (error) {
        await conn.rollback()
        throw error
      }
    }

    // Two student documents were stored under hyphenated keys that matched no
    // user-owned pattern, so they were routed to this shared admin store and
    // refused for every student. Nothing here is anyone's record — only what an
    // administrator's session happened to write — and the keys are now dotted.
    const orphanId = '2026-08-13-drop-misrouted-student-keys'
    const [orphanApplied] = await conn.query('SELECT id FROM schema_migrations WHERE id = ?', [orphanId])
    if (!orphanApplied.length) {
      await conn.beginTransaction()
      try {
        await conn.query(
          'DELETE FROM app_state WHERE k IN (?, ?)',
          ['synapse-concept-mastery-v1', 'synapse-qbank-question-notes-v1'],
        )
        await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [orphanId])
        await conn.commit()
      } catch (error) {
        await conn.rollback()
        throw error
      }
    }
  } finally {
    conn.release()
  }
}
