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
  } finally {
    conn.release()
  }
}
