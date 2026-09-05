import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { runMigrations } from './migrations.js'

// In-memory stand-in for the mysql2 pool: one connection, a fake
// `schema_migration_files` table, and a log of every statement run.
function fakePool() {
  const versions = []
  const executed = []
  const conn = {
    async query(sql, params) {
      executed.push(sql)
      if (/CREATE TABLE IF NOT EXISTS schema_migration_files/i.test(sql)) return [[], []]
      if (/^SELECT version FROM schema_migration_files/i.test(sql)) {
        return [versions.map((version) => ({ version })), []]
      }
      if (/^INSERT INTO schema_migration_files/i.test(sql)) {
        versions.push(params[0])
        return [{}]
      }
      return [[], []]
    },
    release() {},
  }
  return { pool: { getConnection: async () => conn }, versions, executed }
}

async function withTempDir(files, run) {
  const dir = await mkdtemp(join(tmpdir(), 'migrations-test-'))
  try {
    for (const [name, contents] of Object.entries(files)) {
      await writeFile(join(dir, name), contents, 'utf8')
    }
    await run(dir)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}

test('applies migrations in filename order', async () => {
  await withTempDir(
    { '0002_b.sql': "SELECT 'b';\n", '0001_a.sql': "SELECT 'a';\n" },
    async (dir) => {
      const { pool, versions, executed } = fakePool()
      await runMigrations(pool, { dir })
      assert.deepEqual(versions, ['0001_a.sql', '0002_b.sql'])
      const indexA = executed.findIndex((s) => s.includes("SELECT 'a'"))
      const indexB = executed.findIndex((s) => s.includes("SELECT 'b'"))
      assert.ok(indexA >= 0 && indexB >= 0 && indexA < indexB)
    },
  )
})

test('skips a migration already recorded as applied', async () => {
  await withTempDir(
    { '0001_a.sql': "SELECT 'a';\n", '0002_b.sql': "SELECT 'b';\n" },
    async (dir) => {
      const { pool, versions, executed } = fakePool()
      versions.push('0001_a.sql') // pretend it already ran
      await runMigrations(pool, { dir })
      assert.deepEqual(versions, ['0001_a.sql', '0002_b.sql'])
      assert.ok(!executed.some((s) => s.includes("SELECT 'a'")))
    },
  )
})

test('refuses a plain .sql file containing DROP', async () => {
  await withTempDir({ '0001_bad.sql': 'DROP TABLE foo;\n' }, async (dir) => {
    const { pool, versions } = fakePool()
    await assert.rejects(() => runMigrations(pool, { dir }), /refusing 0001_bad\.sql/)
    assert.deepEqual(versions, [])
  })
})

test('refuses a plain .sql file containing MODIFY COLUMN or CHANGE COLUMN', async () => {
  await withTempDir(
    { '0001_modify.sql': "ALTER TABLE foo MODIFY COLUMN bar INT;\n" },
    async (dir) => {
      const { pool } = fakePool()
      await assert.rejects(() => runMigrations(pool, { dir }), /refusing 0001_modify\.sql/)
    },
  )
  await withTempDir(
    { '0001_change.sql': "ALTER TABLE foo CHANGE COLUMN bar baz INT;\n" },
    async (dir) => {
      const { pool } = fakePool()
      await assert.rejects(() => runMigrations(pool, { dir }), /refusing 0001_change\.sql/)
    },
  )
})

test('.dangerous.sql filename bypasses the safety lint', async () => {
  await withTempDir({ '0001_bad.dangerous.sql': 'DROP TABLE foo;\n' }, async (dir) => {
    const { pool, versions, executed } = fakePool()
    await runMigrations(pool, { dir })
    assert.deepEqual(versions, ['0001_bad.dangerous.sql'])
    assert.ok(executed.some((s) => s.includes('DROP TABLE foo')))
  })
})

test('a missing migrations directory is treated as no migrations', async () => {
  const { pool, versions } = fakePool()
  await runMigrations(pool, { dir: join(tmpdir(), 'migrations-test-does-not-exist') })
  assert.deepEqual(versions, [])
})

test('every shipped migration file passes the runner unchanged (fresh-install path)', async () => {
  // The guard that refuses DROP/MODIFY COLUMN runs before the applied check, so
  // a dangerous statement in any file would refuse to boot a fresh install —
  // and production's first deploy of the runner, whose file table starts empty.
  const { pool, versions } = fakePool()
  await runMigrations(pool)
  assert.ok(versions.includes('0001_baseline.sql'))
  assert.ok(versions.length >= 5, `expected the shipped files to apply, got ${versions.join(', ')}`)
})

test('never issues CREATE TABLE when the tracking table already exists (DML-only runtime user)', async () => {
  const { pool, executed } = fakePool()
  await runMigrations(pool, { dir: join(tmpdir(), 'migrations-test-does-not-exist') })
  assert.ok(!executed.some((s) => /CREATE TABLE/i.test(s)), 'a runtime user without DDL rights must boot')
})

test('creates the tracking table on a fresh database', async () => {
  const { pool, executed, versions } = fakePool()
  const inner = await pool.getConnection()
  let created = false
  const realQuery = inner.query.bind(inner)
  inner.query = async (sql, params) => {
    if (!created && /^SELECT version FROM schema_migration_files/i.test(sql)) {
      throw Object.assign(new Error('no such table'), { code: 'ER_NO_SUCH_TABLE' })
    }
    if (/CREATE TABLE IF NOT EXISTS schema_migration_files/i.test(sql)) created = true
    return realQuery(sql, params)
  }
  await withTempDir({ '0001_a.sql': 'CREATE TABLE a (id INT);' }, async (dir) => {
    await runMigrations(pool, { dir })
  })
  assert.ok(created)
  assert.deepEqual(versions, ['0001_a.sql'])
  assert.ok(executed.some((s) => s.includes('CREATE TABLE a')))
})
