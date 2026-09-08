import assert from 'node:assert/strict'
import test from 'node:test'
import { mysqlDriver } from './seo.js'

test('the driver reports the mysql dialect and passes parameters through', async () => {
  const seen = []
  const pool = { query: async (sql, params) => { seen.push([sql, params]); return [[{ ok: 1 }]] } }
  const driver = mysqlDriver(pool)
  assert.equal(driver.dialect, 'mysql')
  const rows = await driver.query('SELECT ?', [1])
  assert.deepEqual(rows, [{ ok: 1 }])
  assert.deepEqual(seen, [['SELECT ?', [1]]])
})

test('a write returns an empty row list rather than the mysql result header', async () => {
  const pool = { query: async () => [{ affectedRows: 1 }] }
  assert.deepEqual(await mysqlDriver(pool).query('UPDATE x SET y = 1', []), [])
})
