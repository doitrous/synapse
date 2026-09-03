import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pool } from './db.js'

// avatar.js reads RESOURCE_STORAGE_DIR at import time, so it has to be set
// before the (dynamic) import below — a static import is hoisted ahead of
// any code in this file and would run against the real /data path.
const storageDir = mkdtempSync(join(tmpdir(), 'avatar-test-'))
process.env.RESOURCE_STORAGE_DIR = storageDir
test.after(() => rmSync(storageDir, { recursive: true, force: true }))

const { decodeImageBase64, sniffAvatarImage, setAvatarFromUpload, setAvatarFromUrl, AVATAR_MAX_BYTES } = await import('./avatar.js')

/** The smallest possible PNG: a single 1×1 pixel. */
const TINY_PNG_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='

/** A working `pool.getConnection()` connection whose queries are inspectable. */
function fakeConnection(studentRow) {
  const calls = []
  return {
    calls,
    beginTransaction: async () => {},
    commit: async () => {},
    rollback: async () => {},
    release: () => {},
    query: async (sql, params) => {
      calls.push([String(sql), params])
      if (/FOR UPDATE/.test(sql)) return [[studentRow]]
      return [{ affectedRows: 1 }]
    },
  }
}

test('oversized base64 is refused before it is ever decoded', () => {
  const huge = 'A'.repeat(Math.ceil((AVATAR_MAX_BYTES * 4) / 3) + 2000)
  const result = decodeImageBase64(huge)
  assert.match(result.error, /2 MB/)
})

test('a valid image data URL decodes and sniffs as the image it is', () => {
  const decoded = decodeImageBase64(`data:image/png;base64,${TINY_PNG_BASE64}`)
  assert.ok(decoded.buffer, 'expected a decoded buffer, not an error')
  const sniffed = sniffAvatarImage(decoded.buffer)
  assert.equal(sniffed.error, undefined)
  assert.equal(sniffed.meta.mimeType, 'image/png')
})

test('bytes that are not a recognised image format are rejected, whatever they claim to be', () => {
  const notAnImage = Buffer.from('this is plain text, not a picture')
  const result = sniffAvatarImage(notAnImage)
  assert.match(result.error, /not a supported image/)
})

test('an import refuses a non-https URL without ever fetching it', async (t) => {
  const fetchSpy = t.mock.method(globalThis, 'fetch', async () => { throw new Error('fetch must not be called for a rejected scheme') })
  const result = await setAvatarFromUrl('user-1', 'http://example.com/photo.png')
  assert.match(result.error, /https/)
  assert.equal(fetchSpy.mock.callCount(), 0)
})

test('an import refuses a URL whose response is not an image', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => ({
    ok: true,
    type: 'basic',
    headers: new Map([['content-type', 'text/html; charset=utf-8']]),
    body: null,
  }))
  const result = await setAvatarFromUrl('user-1', 'https://example.com/page.html')
  assert.match(result.error, /not an image/)
})

test('an import refuses a photo declared larger than the cap, without reading its body', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => ({
    ok: true,
    type: 'basic',
    headers: new Map([['content-type', 'image/png'], ['content-length', String(AVATAR_MAX_BYTES + 1)]]),
    body: null,
  }))
  const result = await setAvatarFromUrl('user-1', 'https://example.com/huge.png')
  assert.match(result.error, /2 MB/)
})

test('an import does not follow a redirect', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: false, type: 'opaqueredirect', headers: new Map(), body: null }))
  const result = await setAvatarFromUrl('user-1', 'https://example.com/redirects-elsewhere.png')
  assert.match(result.error, /could not be fetched/)
})

test('a successful upload stores the image and points the roster row at it', async (t) => {
  const conn = fakeConnection({ id: 'stu-1', user_id: 'user-1' })
  t.mock.method(pool, 'getConnection', async () => conn)
  const mediaInserts = []
  t.mock.method(pool, 'query', async (sql, params) => { mediaInserts.push([String(sql), params]); return [{ affectedRows: 1 }] })

  const result = await setAvatarFromUpload('user-1', `data:image/png;base64,${TINY_PNG_BASE64}`)

  assert.equal(result.ok, true)
  assert.ok(result.avatarMediaId?.startsWith('avt-'))
  const insert = mediaInserts.find(([sql]) => /INSERT INTO managed_media/.test(sql))
  assert.ok(insert, 'expected a managed_media row to be inserted')
  assert.match(insert[0], /'ready'/) // status is hardcoded ready — this store never goes through the chunked-upload pending states
  assert.equal(insert[1][0], result.avatarMediaId) // id is the first placeholder
  const update = conn.calls.find(([sql]) => /UPDATE students SET avatar_media_id/.test(sql))
  assert.deepEqual(update[1], [result.avatarMediaId, 'stu-1'])
})

test('an upload with no image data is rejected before touching the database', async (t) => {
  const dbSpy = t.mock.method(pool, 'getConnection', async () => { throw new Error('must not reach the database') })
  const result = await setAvatarFromUpload('user-1', '')
  assert.match(result.error, /required/)
  assert.equal(dbSpy.mock.callCount(), 0)
})
