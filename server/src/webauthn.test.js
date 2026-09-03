import test from 'node:test'
import assert from 'node:assert/strict'
import { pool } from './db.js'
import {
  authenticationOptions, finalizeAuthentication, listPasskeys, removePasskey, verifyAuthentication, verifyRegistration,
} from './webauthn.js'

/**
 * The real WebAuthn crypto (`verifyRegistrationResponse` /
 * `verifyAuthenticationResponse`, from @simplewebauthn/server) is not
 * exercised here — fabricating a genuinely signed assertion is the library's
 * own test suite's job, not ours. What is ours: the credential storage, and
 * everything this module does before and after that crypto call. So "a bad
 * assertion is rejected" is covered by the paths that reject *before* ever
 * reaching the crypto (no challenge on file, no matching credential row —
 * exactly what a forged or stale assertion hits), and "a good one triggers
 * session minting" is covered by calling `finalizeAuthentication` directly
 * with a canned successful verification, which is the half of the flow that
 * actually mints the Supabase session.
 */

async function withMockPool(query, run) {
  const original = pool.query
  pool.query = query
  try {
    await run()
  } finally {
    pool.query = original
  }
}

function withMockFetch(impl, run) {
  const original = globalThis.fetch
  globalThis.fetch = impl
  return Promise.resolve(run()).finally(() => { globalThis.fetch = original })
}

test('verifyRegistration rejects once the challenge has already been consumed or never existed', async () => {
  const result = await verifyRegistration('user-with-no-pending-challenge', { response: {} })
  assert.deepEqual(result, { error: 'challenge_expired' })
})

test('verifyAuthentication rejects a request with no completed ceremony (stale/forged, no challenge on file)', async () => {
  const result = await verifyAuthentication({ email: 'nobody-pending@example.com', response: { id: 'cred-1' } })
  assert.deepEqual(result, { error: 'challenge_expired' })
})

test('verifyAuthentication rejects a bad assertion: credential id does not match anything on file', async () => {
  await withMockPool(
    // authenticationOptions() reads existing credentials (there are none) to
    // build allowCredentials, then stashes a real challenge for the email.
    async (sql) => {
      if (sql.includes('FROM webauthn_credentials wc')) return [[]]
      throw new Error(`unexpected query: ${sql}`)
    },
    async () => {
      await authenticationOptions('someone@example.com')
      // Same lookup, still empty: whatever credential id the forged assertion
      // names, it will not be found — the ceremony is genuine, the credential isn't.
      const result = await verifyAuthentication({ email: 'someone@example.com', response: { id: 'cred-never-registered' } })
      assert.deepEqual(result, { error: 'unknown_credential' })
    },
  )
})

test('verifyAuthentication rejects a request with no email', async () => {
  const result = await verifyAuthentication({ response: { id: 'cred-1' } })
  assert.deepEqual(result, { error: 'email_required' })
})

test('finalizeAuthentication bumps the counter and mints a Supabase session on a good assertion', async () => {
  const updates = []
  await withMockPool(
    async (sql, params) => {
      if (sql.includes('UPDATE webauthn_credentials')) { updates.push(params); return [{ affectedRows: 1 }] }
      throw new Error(`unexpected query: ${sql}`)
    },
    () => withMockFetch(
      async () => ({
        ok: true,
        json: async () => ({ properties: { hashed_token: 'th_abc123' } }),
      }),
      async () => {
        const previousUrl = process.env.SUPABASE_URL
        const previousKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        process.env.SUPABASE_URL = 'https://project.supabase.co'
        process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-key'
        try {
          const result = await finalizeAuthentication(
            'student@example.com',
            { id: 'row-1' },
            { authenticationInfo: { newCounter: 7 } },
          )
          assert.deepEqual(result, { ok: true, token_hash: 'th_abc123', email: 'student@example.com' })
          assert.equal(updates.length, 1)
          assert.deepEqual(updates[0], [7, 'row-1'])
        } finally {
          process.env.SUPABASE_URL = previousUrl
          process.env.SUPABASE_SERVICE_ROLE_KEY = previousKey
        }
      },
    ),
  )
})

test('mintSupabaseSession (via finalizeAuthentication) refuses without service-role config', async () => {
  await withMockPool(
    async (sql) => { if (sql.includes('UPDATE webauthn_credentials')) return [{ affectedRows: 1 }]; throw new Error(sql) },
    async () => {
      const previousUrl = process.env.SUPABASE_URL
      const previousKey = process.env.SUPABASE_SERVICE_ROLE_KEY
      delete process.env.SUPABASE_URL
      delete process.env.SUPABASE_SERVICE_ROLE_KEY
      try {
        const result = await finalizeAuthentication('student@example.com', { id: 'row-1' }, { authenticationInfo: { newCounter: 1 } })
        assert.deepEqual(result, { error: 'supabase_not_configured' })
      } finally {
        process.env.SUPABASE_URL = previousUrl
        process.env.SUPABASE_SERVICE_ROLE_KEY = previousKey
      }
    },
  )
})

test('listPasskeys returns the caller\'s own credentials only, via the WHERE clause', async () => {
  await withMockPool(
    async (sql, params) => {
      assert.match(sql, /WHERE user_id = \?/)
      assert.deepEqual(params, ['user-1'])
      return [[{ id: 'cred-row-1', deviceLabel: 'iPhone', transports: 'internal', createdAt: '2026-01-01', lastUsedAt: null }]]
    },
    async () => {
      const rows = await listPasskeys('user-1')
      assert.equal(rows.length, 1)
      assert.equal(rows[0].deviceLabel, 'iPhone')
    },
  )
})

test('removePasskey scopes the delete to the owning user, and reports not_found if it deleted nothing', async () => {
  await withMockPool(
    async (sql, params) => {
      assert.match(sql, /DELETE FROM webauthn_credentials WHERE id = \? AND user_id = \?/)
      assert.deepEqual(params, ['cred-row-1', 'user-1'])
      return [{ affectedRows: 0 }]
    },
    async () => {
      const result = await removePasskey('user-1', 'cred-row-1')
      assert.deepEqual(result, { error: 'not_found' })
    },
  )
})
