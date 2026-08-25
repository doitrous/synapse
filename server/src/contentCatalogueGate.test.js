import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pool } from './db.js'
import { withContentCatalogueGate } from './contentCatalogueGate.js'

test('same-process advisory-lock waiters do not occupy the shared connection pool', async () => {
  const originalGetConnection = pool.getConnection
  let connectionCount = 0
  let releaseFirst
  const firstMayFinish = new Promise((resolve) => { releaseFirst = resolve })
  pool.getConnection = async () => {
    connectionCount += 1
    return {
      query: async (sql) => [sql.includes('GET_LOCK') ? [{ acquired: 1 }] : [{ released: 1 }]],
      release() {},
    }
  }
  try {
    const first = withContentCatalogueGate(() => firstMayFinish)
    await new Promise((resolve) => setImmediate(resolve))
    const second = withContentCatalogueGate(async () => 'second')
    await new Promise((resolve) => setImmediate(resolve))
    assert.equal(connectionCount, 1, 'the local waiter must not check out a second pool connection')
    releaseFirst('first')
    assert.deepEqual(await Promise.all([first, second]), ['first', 'second'])
    assert.equal(connectionCount, 2)
  } finally {
    pool.getConnection = originalGetConnection
  }
})
