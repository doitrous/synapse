import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import mysql from 'mysql2/promise'
import { findCatalogueYear, parseCatalogue, UNIVERSITY_KEY } from './academic.js'

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

    // The console grew from two roles to four. The lookup is on the column type
    // rather than a marker, so a database restored from a dump that already has
    // the wider enum boots without repeating the ALTER, and one that does not
    // gets it. It never narrows, so an existing row keeps its value.
    const [roleColumn] = await conn.query(
      `SELECT COLUMN_TYPE AS type FROM information_schema.columns
        WHERE table_schema = DATABASE() AND table_name = 'user_access' AND column_name = 'role'`,
    )
    if (roleColumn.length && !roleColumn[0].type.includes("'editor'")) {
      await conn.query(
        `ALTER TABLE user_access MODIFY COLUMN role
           ENUM('student','reviewer','admin','editor') NOT NULL DEFAULT 'student'`,
      )
    }

    // Which modules and years a reviewer may write. Added by lookup, like every
    // column above, so a database that already has it still boots.
    const [scopeColumn] = await conn.query(
      `SELECT 1 FROM information_schema.columns
        WHERE table_schema = DATABASE() AND table_name = 'user_access' AND column_name = 'content_scope'`,
    )
    if (!scopeColumn.length) {
      await conn.query('ALTER TABLE user_access ADD COLUMN content_scope JSON NULL AFTER mfa_required')
    }

    // Sign-up now asks for a phone number and a nationality, and the number has
    // to be unique or the same person can register twice under two emails.
    // Added by lookup rather than a marker, so a database restored from a dump
    // that already has them still boots.
    for (const [column, definition] of [
      ['phone', 'VARCHAR(32) NULL AFTER email'],
      ['nationality', 'VARCHAR(64) NULL AFTER phone'],
      ['year_id', 'VARCHAR(64) NULL AFTER year'],
    ]) {
      const [found] = await conn.query(
        `SELECT 1 FROM information_schema.columns
          WHERE table_schema = DATABASE() AND table_name = 'students' AND column_name = ?`,
        [column],
      )
      if (!found.length) await conn.query(`ALTER TABLE students ADD COLUMN ${column} ${definition}`)
    }

    // A student's own uploads were PDFs only — the storage key ended `.pdf` and
    // the download was served as one. A whiteboard can now carry any file, so
    // what it was called and what it is have to be stored rather than assumed.
    for (const [column, definition] of [
      ['file_name', 'VARCHAR(255) NULL AFTER media_type'],
      ['mime_type', 'VARCHAR(128) NULL AFTER file_name'],
    ]) {
      const [found] = await conn.query(
        `SELECT 1 FROM information_schema.columns
          WHERE table_schema = DATABASE() AND table_name = 'user_documents' AND column_name = ?`,
        [column],
      )
      if (!found.length) await conn.query(`ALTER TABLE user_documents ADD COLUMN ${column} ${definition}`)
    }

    // The unique index is separate from the column: adding it can fail on a
    // database that already holds duplicates, and that has to be a loud failure
    // an operator resolves rather than a column quietly left unconstrained.
    const [phoneIndex] = await conn.query(
      `SELECT 1 FROM information_schema.statistics
        WHERE table_schema = DATABASE() AND table_name = 'students' AND index_name = 'students_phone_unique'`,
    )
    if (!phoneIndex.length) {
      await conn.query('CREATE UNIQUE INDEX students_phone_unique ON students (phone)')
    }

    const [yearIdIndex] = await conn.query(
      `SELECT 1 FROM information_schema.statistics
        WHERE table_schema = DATABASE() AND table_name = 'students' AND index_name = 'idx_students_university_year_id'`,
    )
    if (!yearIdIndex.length) {
      await conn.query('CREATE INDEX idx_students_university_year_id ON students (university_id, year_id)')
    }

    await conn.query(
      `CREATE TABLE IF NOT EXISTS academic_publish_requests (
        idempotency_key VARCHAR(128) PRIMARY KEY,
        actor_id        VARCHAR(64) NOT NULL,
        response_json   LONGTEXT NOT NULL,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_academic_publish_actor (actor_id, created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
    )

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

    // QotD reminders: device_tokens gains web-push subscription columns and a
    // wider platform enum. Guarded by lookups so a DB that already has them boots.
    const [platformCol] = await conn.query(
      `SELECT COLUMN_TYPE AS type FROM information_schema.columns
        WHERE table_schema = DATABASE() AND table_name = 'device_tokens' AND column_name = 'platform'`,
    )
    if (platformCol.length && !platformCol[0].type.includes("'web'")) {
      await conn.query(
        "ALTER TABLE device_tokens MODIFY COLUMN platform ENUM('ios','android','web') NOT NULL DEFAULT 'ios'",
      )
    }
    for (const [column, definition] of [
      ['web_endpoint', 'TEXT NULL'],
      ['web_p256dh', 'VARCHAR(255) NULL'],
      ['web_auth', 'VARCHAR(255) NULL'],
    ]) {
      const [found] = await conn.query(
        `SELECT 1 FROM information_schema.columns
          WHERE table_schema = DATABASE() AND table_name = 'device_tokens' AND column_name = ?`,
        [column],
      )
      if (!found.length) await conn.query(`ALTER TABLE device_tokens ADD COLUMN ${column} ${definition}`)
    }

    // A study room shows the room, not just you: where each member sits, what
    // their desk looks like, and whether they are working right now. Added by
    // lookup like every column above, so a database restored from a dump that
    // already has them still boots.
    for (const [column, definition] of [
      ['seat_desk', 'VARCHAR(16) NULL'],
      ['seat_device', 'VARCHAR(16) NULL'],
      ['seat_chair', 'VARCHAR(16) NULL'],
      ['seat_index', 'TINYINT NULL'],
      ['last_active_at', 'DATETIME NULL'],
      ['activity', 'VARCHAR(16) NULL'],
    ]) {
      const [found] = await conn.query(
        `SELECT 1 FROM information_schema.columns
          WHERE table_schema = DATABASE() AND table_name = 'study_party_members' AND column_name = ?`,
        [column],
      )
      if (!found.length) await conn.query(`ALTER TABLE study_party_members ADD COLUMN ${column} ${definition}`)
    }

    // Two people cannot sit at one desk, and a read-then-write cannot promise
    // that — the index can. MariaDB allows any number of NULLs in a unique
    // index, so "in the room, nowhere in particular" stays available to
    // everyone while a genuine race for desk 3 fails loudly as ER_DUP_ENTRY.
    // Separate from the columns, as the `students_phone_unique` note explains:
    // creating it can fail on data that already holds duplicates, and that has
    // to be an operator's problem rather than a column quietly unconstrained.
    const [seatIndexUnique] = await conn.query(
      `SELECT 1 FROM information_schema.statistics
        WHERE table_schema = DATABASE() AND table_name = 'study_party_members'
          AND index_name = 'study_party_members_seat_unique'`,
    )
    if (!seatIndexUnique.length) {
      await conn.query(
        'CREATE UNIQUE INDEX study_party_members_seat_unique ON study_party_members (party_id, seat_index)',
      )
    }
  } finally {
    conn.release()
  }
}
