import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newDb } from './sqljs.ts'

test('newDb creates a usable in-memory sqlite database', async () => {
  const db = await newDb()
  db.run('CREATE TABLE t (a INTEGER, b TEXT)')
  db.run("INSERT INTO t VALUES (1, 'x')")
  const rows = db.exec('SELECT a, b FROM t')
  assert.equal(rows[0].values[0][0], 1)
  assert.equal(rows[0].values[0][1], 'x')
  db.close()
})
