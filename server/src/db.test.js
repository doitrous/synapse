import test from 'node:test'
import assert from 'node:assert/strict'
import { poolConfig } from './db.js'

// Save/restore so this doesn't leak into other tests in the same process —
// `pool` itself was already created from whatever env was present at import,
// so these calls only exercise `poolConfig`'s own logic, never rebuild `pool`.
function withEnv(vars, fn) {
  const saved = {}
  for (const key of Object.keys(vars)) saved[key] = process.env[key]
  Object.assign(process.env, vars)
  try { return fn() } finally { Object.assign(process.env, saved) }
}

test('the discrete DB_* vars branch honours DB_POOL_SIZE instead of a hardcoded 10', () => {
  withEnv({ DATABASE_URL: '', DB_HOST: 'db.local', DB_PORT: '3306', DB_USER: 'u', DB_PASSWORD: 'p', DB_NAME: 'n', DB_POOL_SIZE: '25' }, () => {
    const config = poolConfig()
    assert.equal(config.host, 'db.local')
    assert.equal(config.connectionLimit, 25)
    assert.equal(config.waitForConnections, true)
    assert.equal(config.queueLimit, 100)
    assert.equal(config.charset, 'utf8mb4')
  })
})

test('DATABASE_URL is parsed into the same object shape, not handed to mysql2 as a raw string', () => {
  withEnv({ DATABASE_URL: 'mysql://synapsedb:s3cr%40t@10.0.1.11:3306/synapsedb', DB_POOL_SIZE: '40' }, () => {
    const config = poolConfig()
    assert.equal(config.host, '10.0.1.11')
    assert.equal(config.port, 3306)
    assert.equal(config.user, 'synapsedb')
    assert.equal(config.password, 's3cr@t')
    assert.equal(config.database, 'synapsedb')
    // The whole point of parsing the URL: DB_POOL_SIZE now reaches this path too.
    assert.equal(config.connectionLimit, 40)
    assert.equal(config.waitForConnections, true)
    assert.equal(config.queueLimit, 100)
  })
})

test('an unset DB_POOL_SIZE falls back to 10 on both branches', () => {
  withEnv({ DATABASE_URL: '', DB_HOST: 'h', DB_USER: 'u', DB_PASSWORD: 'p', DB_NAME: 'n', DB_POOL_SIZE: '' }, () => {
    assert.equal(poolConfig().connectionLimit, 10)
  })
})
