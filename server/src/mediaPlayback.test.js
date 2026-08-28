import test from 'node:test'
import assert from 'node:assert/strict'
import { createMediaPlaybackToken, readMediaPlaybackToken } from './mediaPlayback.js'

test('media playback tokens carry one id and expire', () => {
  const token = createMediaPlaybackToken('med-123', 1_000, 5_000)
  assert.deepEqual(readMediaPlaybackToken(token, 2_000), { mediaId: 'med-123', expiresAt: 6_000, allowDraft: false })
  assert.equal(readMediaPlaybackToken(token, 6_000), null)
})

test('draft playback permission is signed into the token', () => {
  const token = createMediaPlaybackToken('med-draft', 1_000, 5_000, true)
  assert.equal(readMediaPlaybackToken(token, 2_000)?.allowDraft, true)
})

test('media playback tokens reject tampering and malformed input', () => {
  const token = createMediaPlaybackToken('med-123', 1_000, 5_000)
  assert.equal(readMediaPlaybackToken(`${token}x`, 2_000), null)
  assert.equal(readMediaPlaybackToken('not-a-token', 2_000), null)
})
