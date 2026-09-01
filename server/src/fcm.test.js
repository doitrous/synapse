import test from 'node:test'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import {
  readServiceAccount, isConfigured, buildAssertion, buildFcmMessage, isTokenDead,
} from './fcm.js'

/** A throwaway RSA key, so the signing path is exercised for real. */
function testKey() {
  const { privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 })
  return privateKey.export({ type: 'pkcs8', format: 'pem' })
}

const account = () => ({
  project_id: 'nishany-qotd',
  client_email: 'fcm@nishany-qotd.iam.gserviceaccount.com',
  private_key: testKey(),
  token_uri: 'https://oauth2.googleapis.com/token',
})

test('an unconfigured server does not pretend it can send', () => {
  assert.equal(readServiceAccount({}), null)
  assert.equal(isConfigured(null), false)
  assert.equal(isConfigured(account()), true)
})

test('a service account survives being carried as raw JSON or base64', () => {
  const json = JSON.stringify(account())
  const fromRaw = readServiceAccount({ FCM_SERVICE_ACCOUNT: json })
  assert.equal(fromRaw.project_id, 'nishany-qotd')

  const encoded = Buffer.from(json).toString('base64')
  const fromBase64 = readServiceAccount({ FCM_SERVICE_ACCOUNT: encoded })
  assert.equal(fromBase64.project_id, 'nishany-qotd')
})

test('something that is not a usable service account does not become one', () => {
  assert.equal(readServiceAccount({ FCM_SERVICE_ACCOUNT: 'not json' }), null)
  assert.equal(readServiceAccount({ FCM_SERVICE_ACCOUNT: JSON.stringify({ project_id: 'x' }) }), null)
  assert.equal(readServiceAccount({ FCM_SERVICE_ACCOUNT: '' }), null)
})

test('the FCM message envelope carries token, notification, and a stringified path', () => {
  const device = { token: 'device-token-123' }
  const notification = { title: 'Question of the Day', body: 'Waiting for you.', path: '/app/qotd' }
  assert.deepEqual(buildFcmMessage(device, notification), {
    message: {
      token: 'device-token-123',
      notification: { title: 'Question of the Day', body: 'Waiting for you.' },
      data: { path: '/app/qotd' },
    },
  })
})

test('a missing path becomes an empty string, never undefined, in the data payload', () => {
  const msg = buildFcmMessage({ token: 't' }, { title: 'T', body: 'B' })
  assert.equal(msg.message.data.path, '')
})

test('the token-exchange assertion is signed the way Google reads it', () => {
  const settings = account()
  const jwt = buildAssertion(settings, 1_700_000_000_000)
  const [header, claims, signature] = jwt.split('.')

  assert.deepEqual(JSON.parse(Buffer.from(header, 'base64url')), { alg: 'RS256', typ: 'JWT' })
  assert.deepEqual(JSON.parse(Buffer.from(claims, 'base64url')), {
    iss: settings.client_email,
    scope: 'https://www.googleapis.com/auth/firebase.messaging',
    aud: settings.token_uri,
    iat: 1_700_000_000,
    exp: 1_700_003_600,
  })

  assert.equal(
    crypto.verify(
      'RSA-SHA256',
      Buffer.from(`${header}.${claims}`),
      crypto.createPublicKey(settings.private_key),
      Buffer.from(signature, 'base64url'),
    ),
    true,
  )
})

test('isTokenDead recognises both shapes FCM reports a gone registration in', () => {
  assert.equal(isTokenDead(404, null), true)
  assert.equal(isTokenDead(200, 'UNREGISTERED'), true)
  assert.equal(isTokenDead(400, 'NOT_FOUND'), true)
  assert.equal(isTokenDead(500, 'INTERNAL'), false)
  assert.equal(isTokenDead(400, 'INVALID_ARGUMENT'), false)
})
