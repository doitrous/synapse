import test from 'node:test'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import {
  readConfig, isConfigured, buildProviderToken, buildPayload, isTokenDead, resetNudgeWindow,
  buildAlertPayload, sendApnsAlert,
} from './push.js'

/** A throwaway P-256 key, so the signing path is exercised for real. */
function testKey() {
  const { privateKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' })
  return privateKey.export({ type: 'pkcs8', format: 'pem' })
}

const config = () => ({ keyId: 'ABC1234567', teamId: 'TEAM123456', bundleId: 'com.synapse.app', key: testKey() })

test('an unconfigured server does not pretend it can send', () => {
  assert.equal(isConfigured(readConfig({})), false)
  assert.equal(isConfigured({ keyId: 'A', teamId: 'B', bundleId: 'c', key: '' }), false)
  assert.equal(isConfigured(config()), true)
})

test('a key survives being carried as base64, which is how it usually arrives', () => {
  // A PEM has newlines in it, and newlines survive very few deployment forms.
  const pem = testKey()
  const encoded = Buffer.from(pem).toString('base64')
  assert.equal(readConfig({ APNS_KEY_P8: encoded }).key.includes('BEGIN'), true)
  assert.equal(readConfig({ APNS_KEY_P8: pem }).key.includes('BEGIN'), true)
})

test('something that is not a key does not become one', () => {
  assert.equal(readConfig({ APNS_KEY_P8: 'not a key' }).key, '')
  assert.equal(readConfig({ APNS_KEY_P8: '' }).key, '')
})

test('the bundle id has a default, because only one app sends these', () => {
  assert.equal(readConfig({}).bundleId, 'com.synapse.app')
  assert.equal(readConfig({ APNS_BUNDLE_ID: 'com.other.app' }).bundleId, 'com.other.app')
})

test('the provider token is signed the way Apple reads it, not the way Node writes it', () => {
  const settings = config()
  const token = buildProviderToken(settings, 1_700_000_000_000)
  const [header, claims, signature] = token.split('.')

  assert.deepEqual(JSON.parse(Buffer.from(header, 'base64url')), { alg: 'ES256', kid: settings.keyId })
  assert.deepEqual(JSON.parse(Buffer.from(claims, 'base64url')), { iss: settings.teamId, iat: 1_700_000_000 })

  // Sixty-four bytes: the raw r‖s pair. A DER signature is longer, variable,
  // and accepted by every shape-checking test right up until the gateway
  // answers 403 with nothing in the body.
  assert.equal(Buffer.from(signature, 'base64url').length, 64)

  assert.equal(
    crypto.verify('SHA256', Buffer.from(`${header}.${claims}`), {
      key: crypto.createPublicKey(settings.key),
      dsaEncoding: 'ieee-p1363',
    }, Buffer.from(signature, 'base64url')),
    true,
  )
})

test('the payload wakes the app and does nothing else', () => {
  const payload = JSON.parse(buildPayload('synapse.progress.attempts.v1'))
  assert.equal(payload.aps['content-available'], 1)
  // Nothing a student would see or hear. This is a sync signal, not a message.
  assert.equal('alert' in payload.aps, false)
  assert.equal('badge' in payload.aps, false)
  assert.equal('sound' in payload.aps, false)
})

test('the payload carries no student content, only which record moved', () => {
  const payload = JSON.parse(buildPayload('synapse.progress.attempts.v1'))
  assert.equal(payload.k, 'synapse.progress.attempts.v1')
  assert.deepEqual(Object.keys(payload).sort(), ['aps', 'k'])
})

test('only Apple saying the device is gone unregisters it', () => {
  assert.equal(isTokenDead(410, 'Unregistered'), true)
  assert.equal(isTokenDead(400, 'BadDeviceToken'), true)
  assert.equal(isTokenDead(400, 'DeviceTokenNotForTopic'), true)
})

test('a bad minute does not cost a student their registration', () => {
  // Nobody reports the notification they stopped receiving, so this is the
  // kind of mistake that is never found once made.
  assert.equal(isTokenDead(0, 'timeout'), false)
  assert.equal(isTokenDead(429, 'TooManyRequests'), false)
  assert.equal(isTokenDead(500, 'InternalServerError'), false)
  assert.equal(isTokenDead(503, 'ServiceUnavailable'), false)
  assert.equal(isTokenDead(403, 'ExpiredProviderToken'), false)
})

test('an unconfigured server skips rather than throwing at the write that triggered it', async () => {
  resetNudgeWindow()
  const { sendSilentNudge } = await import('./push.js')
  const result = await sendSilentNudge({ userId: 'user-1' })
  assert.equal(result.sent, 0)
  assert.equal(result.skipped, 'unconfigured')
})

test('a nudge with nobody to nudge is not an error', async () => {
  resetNudgeWindow()
  const { sendSilentNudge } = await import('./push.js')
  assert.equal((await sendSilentNudge({ userId: '' })).sent, 0)
})

test('one sitting does not spend a hundred pushes saying the same thing', async () => {
  const { claimNudgeSlot } = await import('./push.js')
  resetNudgeWindow()
  const at = 1_700_000_000_000

  assert.equal(claimNudgeSlot('user-1', at), true)
  // A student answering questions writes progress every few seconds. iOS
  // answers a flood by delivering fewer — including the one that mattered.
  assert.equal(claimNudgeSlot('user-1', at + 1_000), false)
  assert.equal(claimNudgeSlot('user-1', at + 9_999), false)
  assert.equal(claimNudgeSlot('user-1', at + 10_000), true)
})

test('one student being busy does not silence another', async () => {
  const { claimNudgeSlot } = await import('./push.js')
  resetNudgeWindow()
  const at = 1_700_000_000_000
  assert.equal(claimNudgeSlot('user-1', at), true)
  assert.equal(claimNudgeSlot('user-2', at), true)
})

test('the first nudge of a process is never swallowed', async () => {
  // A zero default would make "now - 0" enormous and pass, but only because
  // the epoch is far away; at time 0 in a test it would silently fail.
  const { claimNudgeSlot } = await import('./push.js')
  resetNudgeWindow()
  assert.equal(claimNudgeSlot('user-fresh', 0), true)
})

/* ── Visible reminders ───────────────────────────────────────────────────── */

test('the alert payload carries what a student is meant to see, and where the tap should go', () => {
  const payload = JSON.parse(buildAlertPayload({
    title: 'Question of the Day', body: 'Yours is waiting.', path: '/app/qotd',
  }))
  assert.deepEqual(payload.aps.alert, { title: 'Question of the Day', body: 'Yours is waiting.' })
  // Unlike the silent nudge, this one is meant to be heard.
  assert.equal(payload.aps.sound, 'default')
  assert.equal(payload.path, '/app/qotd')
})

test('a visible reminder does not pretend to send from an unconfigured server either', async () => {
  const result = await sendApnsAlert(
    { token: 'abc', environment: 'sandbox' },
    { title: 'Question of the Day', body: 'Yours is waiting.', path: '/app/qotd' },
  )
  assert.equal(result, false)
})

test('a visible reminder with no device to reach is not an error', async () => {
  assert.equal(await sendApnsAlert({}, { title: 'x', body: 'y', path: '/app/qotd' }), false)
  assert.equal(await sendApnsAlert(null, { title: 'x', body: 'y', path: '/app/qotd' }), false)
})
