import mysql from 'mysql2/promise'
import { findCatalogueYear, parseCatalogue, UNIVERSITY_KEY } from './academic.js'
import { runMigrations } from './migrations.js'

/**
 * A single shared connection pool. Prefers DATABASE_URL; otherwise assembles the
 * connection from the discrete DB_* vars (matches .env.local).
 *
 * DATABASE_URL used to be handed to mysql2 as a raw string. mysql2 parses a
 * string connection the same way either way, but passing it as a string
 * meant the pool-sizing options below silently never applied to it — the
 * live tunnel (DATABASE_URL) got mysql2's own hardcoded default forever,
 * with no way to tune it short of a code change. Parsed into the same object
 * shape as the discrete-var branch instead, so both take the same knobs.
 */
// Exported only for the test below — reads process.env fresh on every call,
// so a test can flip env vars and re-call it without re-importing the module
// (which would create a second real pool as a side effect).
export function poolConfig() {
  const shared = {
    waitForConnections: true,
    // Ops-tunable without a redeploy: how many connections this process may
    // hold open against the database at once.
    connectionLimit: Number(process.env.DB_POOL_SIZE) || 10,
    // Requests beyond the pool queue rather than erroring immediately, up to
    // this many waiting — past it, mysql2 fails fast instead of piling up an
    // unbounded queue behind a stalled database.
    queueLimit: 100,
    charset: 'utf8mb4',
    timezone: process.env.DB_TIMEZONE || 'local',
  }
  if (!process.env.DATABASE_URL) {
    return {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ...shared,
    }
  }
  const url = new URL(process.env.DATABASE_URL)
  return {
    host: url.hostname,
    port: Number(url.port) || 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ''),
    // Anything the URL carries as a query string (?ssl=..., etc.) still
    // reaches mysql2 — just as object keys instead of a query string.
    ...Object.fromEntries(url.searchParams),
    ...shared,
  }
}

const dbPoolConfig = poolConfig()
console.log(`[db] pool ready: connectionLimit=${dbPoolConfig.connectionLimit} queueLimit=${dbPoolConfig.queueLimit}`)
export const pool = mysql.createPool(dbPoolConfig)

/**
 * Applies every not-yet-applied file in server/migrations (see migrations.js:
 * runMigrations), which is now the fresh-install path too (0001_baseline.sql
 * is today's schema.sql plus the back-compat ALTERs formerly run ad hoc
 * below). Then runs the handful of one-time steps that cannot be expressed as
 * plain, idempotent SQL: two ENUM widenings (MODIFY COLUMN has no "IF" form)
 * and several one-off data repairs, each guarded by a marker row in the
 * legacy `schema_migrations` table (id VARCHAR PRIMARY KEY — distinct from
 * the file-tracking `schema_migration_files` table runMigrations uses).
 */
export async function migrate() {
  await runMigrations(pool)

  const conn = await pool.getConnection()
  try {
    // The console grew from two roles to five. The lookup is on the column type
    // rather than a marker, so a database restored from a dump that already has
    // the wider enum boots without repeating the ALTER, and one that does not
    // gets it. It never narrows, so an existing row keeps its value.
    const [roleColumn] = await conn.query(
      `SELECT COLUMN_TYPE AS type FROM information_schema.columns
        WHERE table_schema = DATABASE() AND table_name = 'user_access' AND column_name = 'role'`,
    )
    if (roleColumn.length && !roleColumn[0].type.includes("'mcq_validator'")) {
      await conn.query(
        `ALTER TABLE user_access MODIFY COLUMN role
           ENUM('student','mcq_validator','reviewer','admin','editor') NOT NULL DEFAULT 'student'`,
      )
    }

    const backfillYearIds = '2026-08-26-backfill-student-year-ids'
    const [yearBackfillApplied] = await conn.query('SELECT id FROM schema_migrations WHERE id = ?', [backfillYearIds])
    if (!yearBackfillApplied.length) {
      await conn.beginTransaction()
      try {
        const [catalogueRows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [UNIVERSITY_KEY])
        const catalogue = parseCatalogue(catalogueRows[0]?.v)
        const [students] = await conn.query(
          `SELECT id, university_id AS universityId, year
             FROM students
            WHERE year_id IS NULL AND university_id IS NOT NULL AND year IS NOT NULL
            FOR UPDATE`,
        )
        for (const student of students) {
          const year = findCatalogueYear(catalogue, student.universityId, student.year)
          if (!year?.id) continue
          await conn.query('UPDATE students SET year_id = ? WHERE id = ? AND year_id IS NULL', [year.id, student.id])
        }
        await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [backfillYearIds])
        await conn.commit()
      } catch (error) {
        await conn.rollback()
        throw error
      }
    }

    // The owner authorised a clean academic slate before any real university
    // data exists. Archive and clear these documents exactly once; the marker
    // prevents later restarts from touching real records added afterward.
    const migrationId = '2026-08-10-clear-academic-catalogue'
    const [applied] = await conn.query('SELECT id FROM schema_migrations WHERE id = ?', [migrationId])
    if (!applied.length) {
      const cleanDocuments = new Map([
        ['nishany-academic-universities-v1', '[]'],
        ['nishany-course-curricula-v1', '{}'],
        ['nishany-module-schedules-v1', '{}'],
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
          ['nishany-concept-mastery-v1', 'nishany-qbank-question-notes-v1'],
        )
        await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [orphanId])
        await conn.commit()
      } catch (error) {
        await conn.rollback()
        throw error
      }
    }

    // Onboarding answers and the personal document list were stored under keys
    // that matched no user-owned pattern, so both were routed to this shared
    // admin store. Nothing there is any student's record — a student was
    // refused every read and every write of them — only whatever an
    // administrator's own session happened to leave behind. Both keys are now
    // owned per account, and what is here is not worth keeping.
    const misroutedId = '2026-08-19-drop-misrouted-onboarding-keys'
    const [misroutedApplied] = await conn.query('SELECT id FROM schema_migrations WHERE id = ?', [misroutedId])
    if (!misroutedApplied.length) {
      await conn.beginTransaction()
      try {
        await conn.query(
          'DELETE FROM app_state WHERE k IN (?, ?)',
          ['nishany-onboarding-v1', 'nishany.myDocuments.v1'],
        )
        await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [misroutedId])
        await conn.commit()
      } catch (error) {
        await conn.rollback()
        throw error
      }
    }

    // A roster row created from an identity alone has no name, so it was filled
    // with the email address. That placeholder then looked like a real name to
    // everything downstream, and the app greeted people by their own email.
    //
    // Clearing it is a repair rather than a loss: with the column empty the app
    // falls back to the name given at sign-up, which is the real one. A name
    // that differs from the email was put there deliberately and is untouched.
    const placeholderNameId = '2026-08-19-clear-placeholder-student-names'
    const [placeholderApplied] = await conn.query('SELECT id FROM schema_migrations WHERE id = ?', [placeholderNameId])
    if (!placeholderApplied.length) {
      await conn.beginTransaction()
      try {
        await conn.query('UPDATE students SET name = NULL WHERE name IS NOT NULL AND name = email')
        await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [placeholderNameId])
        await conn.commit()
      } catch (error) {
        await conn.rollback()
        throw error
      }
    }

    // The platform rebranded to Nishany. Every persisted document used to be
    // addressed with a `synapse…` key; the app and server now use `nishany…`.
    // Rename the stored rows once so the row and the code agree — across
    // app_state and user_state AND both of their version histories, renamed
    // together so the merge-base invariant (app_state.k equals its newest
    // version row's k) is preserved and no client is handed a phantom conflict.
    // A browser still on the pre-rebrand bundle is handled separately, by
    // canonicalStateKey mapping its `synapse…` request forward to the renamed
    // row. Marker-guarded, so the (one-time, potentially large) rewrite runs at
    // exactly the boot that ships this build. IGNORE skips the impossible case
    // of a row already present under the new key, keeping the newer one.
    const stateKeyRebrandId = '2026-09-01-rename-state-keys-to-nishany'
    const [stateKeyRebrandApplied] = await conn.query('SELECT id FROM schema_migrations WHERE id = ?', [stateKeyRebrandId])
    if (!stateKeyRebrandApplied.length) {
      await conn.beginTransaction()
      try {
        for (const table of ['app_state', 'app_state_versions', 'user_state', 'user_state_versions']) {
          await conn.query(
            `UPDATE IGNORE ${table} SET k = CONCAT('nishany', SUBSTRING(k, 8))
               WHERE k LIKE 'synapse-%' OR k LIKE 'synapse.%' OR k LIKE 'synapse:%'`,
          )
        }
        await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [stateKeyRebrandId])
        await conn.commit()
      } catch (error) {
        await conn.rollback()
        throw error
      }
    }

    // The rebrand also reached INSIDE document values, not just their keys: the
    // media/document reference scheme embedded in saved content (`synapse-doc:` /
    // `synapse-media:`), and the sender addresses, brand words and links stored
    // in the email-automations document. Fix that data once. The reference
    // tokens are colon-suffixed and unambiguous, so a blunt REPLACE is safe even
    // across medical prose; the brand-word rewrite is scoped to the automations
    // document, which never holds clinical text, so "Synapse" there is only ever
    // the retired name. The read paths still accept the old prefixes, so this
    // pass is a purge, not a correctness dependency.
    const contentRebrandId = '2026-09-01-rebrand-content-refs-and-email-data'
    const [contentRebrandApplied] = await conn.query('SELECT id FROM schema_migrations WHERE id = ?', [contentRebrandId])
    if (!contentRebrandApplied.length) {
      await conn.beginTransaction()
      try {
        for (const table of ['app_state', 'user_state']) {
          await conn.query(
            `UPDATE ${table} SET v = REPLACE(REPLACE(v, 'synapse-doc:', 'nishany-doc:'), 'synapse-media:', 'nishany-media:')
               WHERE v LIKE '%synapse-doc:%' OR v LIKE '%synapse-media:%'`,
          )
        }
        await conn.query(
          `UPDATE app_state SET v = REPLACE(REPLACE(REPLACE(v,
               'synapse@mail.doitrous.com', 'info@nishany.com'),
               'no-reply@synapse.app', 'info@nishany.com'),
               '@mail.doitrous.com', '@nishany.com')
             WHERE v LIKE '%mail.doitrous.com%' OR v LIKE '%synapse.app%'`,
        )
        await conn.query(
          `UPDATE app_state SET v = REPLACE(REPLACE(REPLACE(v,
               'Connect Cortex', 'Nishany'),
               'synapse.doitrous.com', 'nishany.com'),
               'Synapse', 'Nishany')
             WHERE k = 'nishany-email-automations-v1'`,
        )
        await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [contentRebrandId])
        await conn.commit()
      } catch (error) {
        await conn.rollback()
        throw error
      }
    }

    // The mail addresses the platform sends from and receives at, on the new
    // domain. Seeded so a fresh or rebranded install has the standard set;
    // INSERT IGNORE leaves any address the admin already created untouched.
    const mailboxSeedId = '2026-09-01-seed-nishany-mailboxes'
    const [mailboxSeedApplied] = await conn.query('SELECT id FROM schema_migrations WHERE id = ?', [mailboxSeedId])
    if (!mailboxSeedApplied.length) {
      const defaultMailboxes = [
        ['info@nishany.com', 'Info'],
        ['admin@nishany.com', 'Admin'],
        ['help@nishany.com', 'Help'],
        ['reviewer@nishany.com', 'Reviewer'],
        ['editor@nishany.com', 'Editor'],
        ['superadmin@nishany.com', 'Super admin'],
      ]
      await conn.beginTransaction()
      try {
        for (const [address, label] of defaultMailboxes) {
          await conn.query('INSERT IGNORE INTO mailboxes (address, label) VALUES (?, ?)', [address, label])
        }
        await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [mailboxSeedId])
        await conn.commit()
      } catch (error) {
        await conn.rollback()
        throw error
      }
    }

    // Publishing an imported content item silently reverted to unpublished. The
    // server rebuilds every client's optimistic-merge base from the newest
    // app_state_versions row, which must equal app_state. An earlier import
    // script recorded the PRE-import ledger in that row while app_state received
    // the POST-import ledger, so each client merged its next edit against a
    // document that predated the import — and publishing an imported item came
    // back a phantom conflict and was reverted in the browser.
    //
    // Heal it once: for each shared, mergeable document whose newest version row
    // disagrees with app_state, append a version row equal to app_state. This is
    // append-only — app_state itself, what students and admins see, is never
    // touched — and marker-guarded so it runs exactly once, at the boot that
    // ships this build. See server/src/stateMerge.test.js and the standalone
    // scripts/repair-content-version-baseline.mjs (same logic, for other DBs).
    const versionBaselineId = '2026-08-27-repair-content-version-baseline'
    const [versionBaselineApplied] = await conn.query('SELECT id FROM schema_migrations WHERE id = ?', [versionBaselineId])
    if (!versionBaselineApplied.length) {
      const sharedKeys = [
        'nishany-admin-content-ledger-v4',
        'nishany-concept-graph-v2',
        'nishany-medical-evidence-v1',
        'nishany-minigame-packs-v1',
        'nishany-library-trees-v1',
        'nishany-academic-universities-v1',
        'nishany-media-library-v1',
      ]
      // Compare by structure, not by byte, so a re-serialisation is not "drift".
      const canonical = (raw) => {
        if (raw == null) return null
        try { return JSON.stringify(JSON.parse(raw)) } catch { return raw }
      }
      await conn.beginTransaction()
      try {
        for (const key of sharedKeys) {
          const [stateRows] = await conn.query('SELECT v FROM app_state WHERE k = ? FOR UPDATE', [key])
          if (!stateRows.length) continue
          const current = stateRows[0].v
          const [versionRows] = await conn.query(
            'SELECT v FROM app_state_versions WHERE k = ? ORDER BY id DESC LIMIT 1',
            [key],
          )
          if (versionRows.length && canonical(versionRows[0].v) === canonical(current)) continue
          await conn.query(
            'INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)',
            [key, current, `migration:${versionBaselineId}`],
          )
        }
        await conn.query('INSERT INTO schema_migrations (id) VALUES (?)', [versionBaselineId])
        await conn.commit()
      } catch (error) {
        await conn.rollback()
        throw error
      }
    }

    // QotD reminders widened device_tokens.platform to include 'web'. Not
    // expressible as idempotent SQL (MODIFY COLUMN has no "IF" form), so this
    // stays a guarded JS step like the role widening above; the new web_* columns
    // and the study-room seat columns/index it used to sit next to are now
    // plain ADD COLUMN IF NOT EXISTS / CREATE INDEX IF NOT EXISTS statements in
    // server/migrations/0001_baseline.sql.
    const [platformCol] = await conn.query(
      `SELECT COLUMN_TYPE AS type FROM information_schema.columns
        WHERE table_schema = DATABASE() AND table_name = 'device_tokens' AND column_name = 'platform'`,
    )
    if (platformCol.length && !platformCol[0].type.includes("'web'")) {
      await conn.query(
        "ALTER TABLE device_tokens MODIFY COLUMN platform ENUM('ios','android','web') NOT NULL DEFAULT 'ios'",
      )
    }
  } finally {
    conn.release()
  }
}
