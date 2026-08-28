import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { assembleChunks } from './uploads.js'

test('managed-media assembly can retain chunks until durable registration finishes', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'synapse-media-assembly-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const workspace = join(root, 'chunks')
  const staging = join(root, 'staging', 'asset')
  await mkdir(workspace, { recursive: true })
  await writeFile(join(workspace, '0000.part'), 'large ')
  await writeFile(join(workspace, '0001.part'), 'teaching media')

  const result = await assembleChunks(workspace, staging, {
    totalChunks: 2,
    declaredSize: 20,
    maxBytes: 100,
    chunkMaxBytes: 100,
    removeWorkspace: false,
  })

  assert.equal(result.sizeBytes, 20)
  assert.equal((await readFile(staging, 'utf8')), 'large teaching media')
  assert.equal(existsSync(workspace), true, 'a transient registration failure remains retryable')
})

test('chunk assembly keeps its existing cleanup behaviour by default', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'synapse-resource-assembly-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const workspace = join(root, 'chunks')
  const staging = join(root, 'staging', 'asset')
  await mkdir(workspace, { recursive: true })
  await writeFile(join(workspace, '0000.part'), 'document')

  await assembleChunks(workspace, staging, {
    totalChunks: 1,
    declaredSize: 8,
    maxBytes: 100,
    chunkMaxBytes: 100,
  })

  assert.equal(existsSync(workspace), false)
})
