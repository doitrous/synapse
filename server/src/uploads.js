import { createHash, randomUUID } from 'node:crypto'
import { basename, dirname, join, resolve, sep } from 'node:path'
import { createReadStream, createWriteStream, existsSync } from 'node:fs'
import { mkdir, rename, rm, stat, unlink } from 'node:fs/promises'
import { once } from 'node:events'
import { Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'

/**
 * Receiving a file, safely, once.
 *
 * The medical library's own ingestion had all of this right — a size meter that
 * stops mid-stream, a temporary file opened with `wx` so two uploads cannot
 * collide, an atomic rename so a reader never sees a half-written book, a
 * path-traversal guard, and cleanup on every failure path. What it also had was
 * `requireAdmin` and a pre-qualified hash from the catalogue, neither of which a
 * student's own lecture handout can have.
 *
 * Rather than loosen the library's gates to let students through them, the
 * mechanism lives here and both families call it. The student path inherits what
 * the admin path already got right; the admin path keeps its hash check, which
 * is expressed as a caller-supplied `expectedSha256` rather than being wired in.
 */

/** A leading `%PDF-` — sniffed, because `Content-Type` is whatever was claimed. */
const PDF_MAGIC = Buffer.from('%PDF-')

export function resolveWithin(root, key) {
  if (!key || typeof key !== 'string' || key.includes('\0')) return null
  const fullPath = resolve(root, key)
  return fullPath.startsWith(`${root}${sep}`) ? fullPath : null
}

export function resolveUploadWorkspace(root, ownerKey, uploadId) {
  if (!/^[a-zA-Z0-9_-]{8,80}$/.test(uploadId)) return null
  const safeOwner = String(ownerKey).replace(/[^a-zA-Z0-9_-]/g, '_')
  return resolveWithin(root, join('.__uploads', safeOwner, uploadId))
}

/** Stream a request body to `fullPath`, measuring and hashing as it goes. */
export async function receiveStream(source, fullPath, { maxBytes, expectedSha256 = null }) {
  await mkdir(dirname(fullPath), { recursive: true })
  const temporaryPath = `${fullPath}.upload-${randomUUID()}`
  const hash = createHash('sha256')
  let sizeBytes = 0
  const meter = new Transform({
    transform(chunk, _encoding, callback) {
      sizeBytes += chunk.length
      if (sizeBytes > maxBytes) return callback(new Error(`file exceeds ${maxBytes} byte limit`))
      hash.update(chunk)
      callback(null, chunk)
    },
  })
  try {
    await pipeline(source, meter, createWriteStream(temporaryPath, { flags: 'wx' }))
    const sha256 = hash.digest('hex')
    if (expectedSha256 && expectedSha256 !== sha256) throw new Error('uploaded file hash does not match the qualified source')
    await rename(temporaryPath, fullPath)
    return { sizeBytes, sha256 }
  } catch (error) {
    await unlink(temporaryPath).catch(() => {})
    throw error
  }
}

/** Store one bounded chunk of a larger upload. */
export async function receiveChunk(source, workspace, index, maxBytes) {
  await mkdir(workspace, { recursive: true })
  const chunkPath = join(workspace, `${String(index).padStart(4, '0')}.part`)
  const temporaryPath = `${chunkPath}.upload-${randomUUID()}`
  let sizeBytes = 0
  const meter = new Transform({
    transform(chunk, _encoding, callback) {
      sizeBytes += chunk.length
      if (sizeBytes > maxBytes) return callback(new Error('chunk exceeds configured limit'))
      callback(null, chunk)
    },
  })
  try {
    await pipeline(source, meter, createWriteStream(temporaryPath, { flags: 'wx' }))
    await rename(temporaryPath, chunkPath)
    return { sizeBytes }
  } catch (error) {
    await unlink(temporaryPath).catch(() => {})
    throw error
  }
}

/**
 * Join stored chunks into the finished file.
 *
 * Throws an `Error` carrying a `status` so a route can answer honestly without
 * repeating the reason: the caller turns it into a response, and every failure
 * leaves the destination untouched.
 */
export async function assembleChunks(workspace, fullPath, {
  totalChunks,
  declaredSize,
  maxBytes,
  chunkMaxBytes,
  expectedSha256 = null,
  requirePdf = false,
}) {
  const chunkPaths = Array.from({ length: totalChunks }, (_, index) => join(workspace, `${String(index).padStart(4, '0')}.part`))
  for (const chunkPath of chunkPaths) {
    if (!existsSync(chunkPath)) throw failure(409, `chunk ${basename(chunkPath, '.part')} is missing`)
  }
  const measured = await Promise.all(chunkPaths.map((chunkPath) => stat(chunkPath)))
  if (measured.some((chunk) => chunk.size > chunkMaxBytes)) throw failure(413, 'stored chunk exceeds configured limit')
  if (measured.reduce((sum, chunk) => sum + chunk.size, 0) !== declaredSize) {
    throw failure(409, 'chunk sizes do not match the declared size')
  }

  await mkdir(dirname(fullPath), { recursive: true })
  const temporaryPath = `${fullPath}.assemble-${randomUUID()}`
  const hash = createHash('sha256')
  let sizeBytes = 0
  let head = Buffer.alloc(0)
  const output = createWriteStream(temporaryPath, { flags: 'wx' })
  try {
    for (const chunkPath of chunkPaths) {
      for await (const chunk of createReadStream(chunkPath)) {
        if (head.length < PDF_MAGIC.length) head = Buffer.concat([head, chunk.subarray(0, PDF_MAGIC.length)])
        sizeBytes += chunk.length
        if (sizeBytes > maxBytes) throw failure(413, 'file exceeds configured limit')
        hash.update(chunk)
        if (!output.write(chunk)) await once(output, 'drain')
      }
    }
    const closed = once(output, 'close')
    output.end()
    await closed
    const sha256 = hash.digest('hex')
    if (sizeBytes !== declaredSize) throw failure(409, 'assembled size does not match the declaration')
    if (expectedSha256 && expectedSha256 !== sha256) throw failure(409, 'assembled file hash does not match the qualified source')
    // Sniffed from the bytes rather than believed from a header, so a renamed
    // executable is refused at the point it would otherwise become a document.
    if (requirePdf && !head.subarray(0, PDF_MAGIC.length).equals(PDF_MAGIC)) {
      throw failure(415, 'that file is not a PDF')
    }
    await rename(temporaryPath, fullPath)
    await rm(workspace, { recursive: true, force: true })
    return { sizeBytes, sha256, chunks: totalChunks }
  } catch (error) {
    output.destroy()
    await unlink(temporaryPath).catch(() => {})
    throw error
  }
}

export function failure(status, message) {
  const error = new Error(message)
  error.status = status
  return error
}
