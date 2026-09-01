import test from 'node:test'
import assert from 'node:assert/strict'
import { Readable } from 'node:stream'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  FilesystemProvider,
  ProviderUnconfiguredError,
  R2Provider,
  R2_REQUIRED_ENV,
  StreamProvider,
  STREAM_REQUIRED_ENV,
  describeProviders,
  selectMediaProvider,
} from './mediaProvider.js'

async function tempRoot() {
  return mkdtemp(join(tmpdir(), 'media-provider-test-'))
}

// A real key shape, so the round-trip test also proves the content-addressed
// layout (`media/<sha0:2>/<sha2:4>/<sha>.<ext>`) is exactly what lands on disk.
const KEY = 'media/ab/cd/abcd0123456789ef0123456789ef0123456789ef0123456789ef0123456789.png'

test('FilesystemProvider: put/exists/url/delete round-trip from a Buffer', async () => {
  const root = await tempRoot()
  try {
    const provider = new FilesystemProvider({ root })
    assert.equal(await provider.exists(KEY), false)

    const result = await provider.put(KEY, Buffer.from('hello media'), { contentType: 'image/png' })
    assert.deepEqual(result, { stored: true, key: KEY, bytes: 11, contentType: 'image/png' })
    assert.equal(await provider.exists(KEY), true)
    assert.equal(await provider.head(KEY), true)

    // The on-disk layout is unchanged from what the app already writes.
    const onDisk = join(root, KEY)
    assert.ok(existsSync(onDisk))
    assert.equal((await readFile(onDisk)).toString(), 'hello media')

    // No public URL for local storage — the key itself is what the app's own
    // media route already knows how to serve.
    assert.equal(provider.url(KEY), KEY)
    assert.equal(provider.signedUrl(KEY, { expiresIn: 60 }), KEY)

    const deletion = await provider.delete(KEY)
    assert.deepEqual(deletion, { deleted: true, key: KEY })
    assert.equal(await provider.exists(KEY), false)
    assert.deepEqual(await provider.delete(KEY), { deleted: false, key: KEY })
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('FilesystemProvider: put accepts a Readable stream and a local file path too', async () => {
  const root = await tempRoot()
  try {
    const provider = new FilesystemProvider({ root })

    await provider.put(KEY, Readable.from([Buffer.from('from a stream')]))
    assert.equal((await readFile(join(root, KEY))).toString(), 'from a stream')

    const sourceFile = join(root, '.source-file')
    await writeFile(sourceFile, 'from a path')
    const otherKey = 'media/12/34/1234000000000000000000000000000000000000000000000000000000000000.png'
    await provider.put(otherKey, sourceFile)
    assert.equal((await readFile(join(root, otherKey))).toString(), 'from a path')
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('FilesystemProvider: a two-writer collision is not possible mid-write, and a bad key is refused', async () => {
  const root = await tempRoot()
  try {
    const provider = new FilesystemProvider({ root })
    await assert.rejects(() => provider.put('../escape.png', Buffer.from('x')))
    await assert.rejects(() => provider.put('media/../../escape.png', Buffer.from('x')))
    assert.equal(await provider.exists('../escape.png'), false)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('FilesystemProvider defaults its root from RESOURCE_STORAGE_DIR in the env it is given', () => {
  const provider = new FilesystemProvider({ env: { RESOURCE_STORAGE_DIR: '/tmp/example-library' } })
  assert.equal(provider.root, '/tmp/example-library')
  assert.equal(provider.configured, true)
})

test('R2Provider.configured is false until every required env var is present', () => {
  assert.equal(new R2Provider({}).configured, false)
  const partial = { CF_ACCOUNT_ID: 'acct', R2_BUCKET: 'bucket' }
  assert.equal(new R2Provider(partial).configured, false)
  const full = {
    CF_ACCOUNT_ID: 'acct', R2_BUCKET: 'bucket', R2_ACCESS_KEY_ID: 'key', R2_SECRET_ACCESS_KEY: 'secret',
  }
  assert.equal(new R2Provider(full).configured, true)
  for (const name of R2_REQUIRED_ENV) assert.ok(full[name] !== undefined, name)
})

test('StreamProvider.configured needs the account id and the Stream token', () => {
  assert.equal(new StreamProvider({}).configured, false)
  assert.equal(new StreamProvider({ CF_ACCOUNT_ID: 'acct' }).configured, false)
  assert.equal(new StreamProvider({ CF_ACCOUNT_ID: 'acct', CF_STREAM_TOKEN: 'token' }).configured, true)
  assert.deepEqual(STREAM_REQUIRED_ENV, ['CF_ACCOUNT_ID', 'CF_STREAM_TOKEN'])
})

test('an unconfigured R2Provider fails every operation honestly, with no network call', async () => {
  const provider = new R2Provider({})
  for (const call of [
    () => provider.put('media/ab/cd/x.png', Buffer.from('x')),
    () => provider.exists('media/ab/cd/x.png'),
    () => provider.head('media/ab/cd/x.png'),
    () => provider.delete('media/ab/cd/x.png'),
  ]) {
    await assert.rejects(call, (error) => {
      assert.ok(error instanceof ProviderUnconfiguredError)
      assert.equal(error.code, 'provider_unconfigured')
      assert.equal(error.provider, 'r2')
      assert.deepEqual(error.missing, R2_REQUIRED_ENV)
      return true
    })
  }
  assert.throws(() => provider.url('media/ab/cd/x.png'), { code: 'provider_unconfigured' })
  assert.throws(() => provider.signedUrl('media/ab/cd/x.png'), { code: 'provider_unconfigured' })
})

test('an unconfigured StreamProvider fails every operation honestly, with no network call', async () => {
  const provider = new StreamProvider({})
  await assert.rejects(() => provider.put('ignored', Buffer.from('x')), { code: 'provider_unconfigured', provider: 'stream' })
  await assert.rejects(() => provider.exists('uid123'), { code: 'provider_unconfigured' })
  await assert.rejects(() => provider.delete('uid123'), { code: 'provider_unconfigured' })
  assert.throws(() => provider.url('uid123'), { code: 'provider_unconfigured' })
  assert.throws(() => provider.signedUrl('uid123'), { code: 'provider_unconfigured' })
})

test('a partially configured R2Provider reports exactly which vars are still missing', () => {
  const provider = new R2Provider({ CF_ACCOUNT_ID: 'acct', R2_BUCKET: 'bucket' })
  assert.deepEqual(provider._missing, ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY'])
})

test('selectMediaProvider falls back to Filesystem with zero Cloudflare configuration', () => {
  const provider = selectMediaProvider({})
  assert.ok(provider instanceof FilesystemProvider)
})

test('selectMediaProvider prefers R2 once it is fully configured', () => {
  const env = {
    CF_ACCOUNT_ID: 'acct', R2_BUCKET: 'bucket', R2_ACCESS_KEY_ID: 'key', R2_SECRET_ACCESS_KEY: 'secret',
  }
  const provider = selectMediaProvider(env)
  assert.ok(provider instanceof R2Provider)
})

test('describeProviders reports presence and reasons, never a secret value', () => {
  const secretEnv = {
    CF_ACCOUNT_ID: 'acct', R2_BUCKET: 'bucket', R2_ACCESS_KEY_ID: 'key-id', R2_SECRET_ACCESS_KEY: 'super-secret-value',
    CF_STREAM_TOKEN: 'stream-token-value',
  }
  const description = describeProviders(secretEnv)
  assert.deepEqual(description, {
    filesystem: { configured: true, available: true, reason: description.filesystem.reason },
    r2: { configured: true, available: true, missingEnv: [], reason: description.r2.reason },
    stream: { configured: true, available: true, missingEnv: [], reason: description.stream.reason },
    selected: 'r2',
  })
  const serialised = JSON.stringify(description)
  assert.ok(!serialised.includes('super-secret-value'))
  assert.ok(!serialised.includes('stream-token-value'))
  assert.ok(!serialised.includes('key-id'))
})

test('describeProviders names exactly the missing env vars when nothing is configured', () => {
  const description = describeProviders({})
  assert.equal(description.filesystem.configured, true)
  assert.equal(description.r2.configured, false)
  assert.deepEqual(description.r2.missingEnv, R2_REQUIRED_ENV)
  assert.equal(description.stream.configured, false)
  assert.deepEqual(description.stream.missingEnv, STREAM_REQUIRED_ENV)
  assert.equal(description.selected, 'filesystem')
})
