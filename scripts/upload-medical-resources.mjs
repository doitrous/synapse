#!/usr/bin/env node

import { createReadStream, existsSync, openSync, closeSync, readFileSync, readSync, statSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { randomUUID } from 'node:crypto'

const EDGE_SAFE_CHUNK_BYTES = 48 * 1024 * 1024

function argument(name) {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : undefined
}

async function readToken() {
  let value = ''
  for await (const chunk of process.stdin) value += chunk
  return value.trim()
}

const catalogPath = argument('--catalog')
const apiBase = (argument('--api') || 'https://synapse.doitrous.com/api').replace(/\/$/, '')
const dryRun = process.argv.includes('--dry-run')
const token = await readToken()

if (!catalogPath) throw new Error('Pass --catalog /absolute/path/to/full-catalog.json')
if (!token) throw new Error('Pass the server owner key through standard input.')

const catalog = JSON.parse(readFileSync(resolve(catalogPath), 'utf8'))
const localResources = catalog.resources.filter((resource) => resource.source_path && existsSync(resource.source_path))
const result = { uploaded: 0, alreadyAvailable: 0, skippedOversize: 0, failed: 0, uploadedBytes: 0 }

async function status(resource) {
  const response = await fetch(`${apiBase}/medical-resources/${encodeURIComponent(resource.id)}/status`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error(`status ${response.status}`)
  return response.json()
}

async function upload(resource, size) {
  if (size > 90 * 1024 * 1024) return uploadInChunks(resource, size)
  const response = await fetch(`${apiBase}/medical-resources/${encodeURIComponent(resource.id)}/file`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': resource.media_type === 'pdf' ? 'application/pdf' : 'application/octet-stream',
      'Content-Length': String(size),
    },
    body: createReadStream(resource.source_path),
    duplex: 'half',
    signal: AbortSignal.timeout(30 * 60 * 1000),
  })
  if (response.status === 409) return { alreadyAvailable: true }
  if (!response.ok) throw new Error(`upload ${response.status}: ${(await response.text()).slice(0, 180)}`)
  return response.json()
}

async function uploadInChunks(resource, size) {
  const uploadId = `local-${randomUUID()}`
  const totalChunks = Math.ceil(size / EDGE_SAFE_CHUNK_BYTES)
  const handle = openSync(resource.source_path, 'r')
  try {
    for (let index = 0; index < totalChunks; index += 1) {
      const offset = index * EDGE_SAFE_CHUNK_BYTES
      const length = Math.min(EDGE_SAFE_CHUNK_BYTES, size - offset)
      const buffer = Buffer.allocUnsafe(length)
      let read = 0
      while (read < length) read += readSync(handle, buffer, read, length - read, offset + read)
      const response = await fetch(`${apiBase}/medical-resources/${encodeURIComponent(resource.id)}/chunks/${uploadId}/${index}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/octet-stream',
          'Content-Length': String(length),
        },
        body: buffer,
        signal: AbortSignal.timeout(30 * 60 * 1000),
      })
      if (response.status === 409) return { alreadyAvailable: true }
      if (!response.ok) throw new Error(`chunk ${index + 1}/${totalChunks} failed with ${response.status}: ${(await response.text()).slice(0, 180)}`)
    }
  } finally {
    closeSync(handle)
  }
  const response = await fetch(`${apiBase}/medical-resources/${encodeURIComponent(resource.id)}/chunks/${uploadId}/complete`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ totalChunks, sizeBytes: size }),
    signal: AbortSignal.timeout(30 * 60 * 1000),
  })
  if (response.status === 409) {
    const current = await status(resource)
    if (current.available) return { alreadyAvailable: true }
  }
  if (!response.ok) throw new Error(`chunk assembly ${response.status}: ${(await response.text()).slice(0, 180)}`)
  return response.json()
}

console.log(`Qualified local resources: ${localResources.length}`)
for (let index = 0; index < localResources.length; index += 1) {
  const resource = localResources[index]
  const size = statSync(resource.source_path).size
  const label = basename(resource.source_path)
  const prefix = `[${index + 1}/${localResources.length}]`
  if (size > 2 * 1024 * 1024 * 1024) {
    result.skippedOversize += 1
    console.log(`${prefix} SKIP ${label} (${(size / 1024 / 1024).toFixed(1)} MiB; server limit is 2 GiB)`)
    continue
  }
  try {
    const current = await status(resource)
    if (current.available) {
      result.alreadyAvailable += 1
      console.log(`${prefix} EXISTS ${label}`)
      continue
    }
    if (dryRun) {
      console.log(`${prefix} READY ${label} (${(size / 1024 / 1024).toFixed(1)} MiB)`)
      continue
    }
    await upload(resource, size)
    result.uploaded += 1
    result.uploadedBytes += size
    console.log(`${prefix} UPLOADED ${label} (${(size / 1024 / 1024).toFixed(1)} MiB)`)
  } catch (error) {
    // The connection may close after the server has safely moved the file.
    // Recheck once before declaring failure so reruns remain idempotent.
    try {
      const current = await status(resource)
      if (current.available) {
        result.uploaded += 1
        result.uploadedBytes += size
        console.log(`${prefix} UPLOADED ${label} (confirmed after response loss)`)
        continue
      }
    } catch {
      // Report the original operation error below.
    }
    result.failed += 1
    console.error(`${prefix} FAILED ${label}: ${error instanceof Error ? error.message : String(error)}`)
  }
}

console.log(JSON.stringify({ ...result, uploadedGiB: Number((result.uploadedBytes / 1024 / 1024 / 1024).toFixed(3)) }, null, 2))
if (result.failed) process.exitCode = 1
