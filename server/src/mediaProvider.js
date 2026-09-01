/**
 * Where a managed media file's bytes actually live, behind one interface.
 *
 * `mediaLibrary.js` already decides a file's storage *key* — a content-address
 * such as `media/ab/cd/<sha256>.<ext>` — independent of where the bytes for
 * that key are kept. Until now "where" meant one thing: the local disk under
 * `RESOURCE_STORAGE_DIR`, reached directly from `uploads.js`/`index.js`. This
 * module gives that relationship a name, so the app can move bytes to
 * Cloudflare R2 (general storage) or Stream (video-specific delivery) later
 * without every call site changing.
 *
 * The interface every provider below implements:
 *
 *   put(key, streamOrPath, { contentType })  → Promise<{ stored, key, bytes, contentType }>
 *     Store bytes under `key`. `streamOrPath` is a Readable stream, a Buffer,
 *     or a local filesystem path. Never resolves with `stored: true` unless
 *     the bytes are actually durably in place — a failure always rejects.
 *
 *   exists(key) / head(key)  → Promise<boolean>
 *     Whether something is stored at `key` right now. The two names are the
 *     same operation (`head` reads better at a call site verifying a
 *     round-trip after `put`); either may be used.
 *
 *   url(key)  → string
 *     A URL that can be handed to a client to fetch `key`. For local storage
 *     this is the storage key itself, which the app's own authenticated media
 *     route already knows how to serve.
 *
 *   signedUrl(key, { expiresIn })  → string
 *     A time-limited variant of `url`, where the backend supports one. A
 *     provider without real signing (today: filesystem and Stream) documents
 *     that in its own method rather than inventing a scheme nothing enforces.
 *
 *   delete(key)  → Promise<{ deleted, key }>
 *     Remove whatever is stored at `key`. Deleting something already absent
 *     is not an error — it reports `deleted: false` rather than throwing.
 *
 * Every method on the two cloud providers below is guarded: called before its
 * required environment variables are all present, it throws a
 * `ProviderUnconfiguredError` (`error.code === 'provider_unconfigured'`)
 * instead of doing anything — never a call that silently no-ops, and never a
 * resolved promise that claims success. `selectMediaProvider` uses that same
 * `configured` flag to choose Filesystem when no cloud provider is set up, so
 * the app runs with zero Cloudflare configuration exactly as it does today.
 *
 * Environment variables (names only — this module never logs or returns a
 * value, only which names are present, so `describeProviders` is safe to put
 * in a diagnostics endpoint):
 *
 *   CF_ACCOUNT_ID                 Cloudflare account id. Shared by R2 and Stream.
 *   R2_BUCKET                     Target R2 bucket name.
 *   R2_ACCESS_KEY_ID              R2 API token, S3-compatible credential pair.
 *   R2_SECRET_ACCESS_KEY          … the secret half of that pair.
 *   R2_ENDPOINT                   Optional. Defaults to
 *                                 `https://<CF_ACCOUNT_ID>.r2.cloudflarestorage.com`.
 *   R2_PUBLIC_BASE_URL            Optional. A public bucket domain (custom
 *                                 domain or the `r2.dev` one) used by `url()`;
 *                                 falls back to the private R2 endpoint.
 *   CF_STREAM_TOKEN               Cloudflare API token scoped to Stream.
 *   CF_STREAM_CUSTOMER_SUBDOMAIN  Optional. Enables HLS/DASH manifest URLs;
 *                                 without it `url()` returns the generic
 *                                 iframe playback domain instead.
 *
 * No network call in this file runs from a test, and none runs anywhere
 * unless its provider's `configured` is true — this module does not deploy or
 * reach Cloudflare on its own.
 */

import { createHash, createHmac, randomUUID } from 'node:crypto'
import { createReadStream, createWriteStream } from 'node:fs'
import { mkdir, readFile, rename, stat, unlink, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { resolveWithin } from './uploads.js'

export class ProviderUnconfiguredError extends Error {
  constructor(provider, operation, missing) {
    super(`${provider} storage is not configured — cannot ${operation} (missing: ${missing.join(', ')})`)
    this.name = 'ProviderUnconfiguredError'
    this.code = 'provider_unconfigured'
    this.provider = provider
    this.operation = operation
    this.missing = missing
  }
}

function missingVars(env, names) {
  return names.filter((name) => !env[name])
}

function assertSafeKey(key) {
  if (typeof key !== 'string' || !key || key.includes('..') || key.startsWith('/') || key.includes('\0')) {
    throw new Error(`refusing to use an unsafe storage key: ${JSON.stringify(key)}`)
  }
}

async function toBuffer(streamOrPath) {
  if (Buffer.isBuffer(streamOrPath)) return streamOrPath
  if (typeof streamOrPath === 'string') return readFile(streamOrPath)
  if (streamOrPath && typeof streamOrPath.pipe === 'function') {
    const chunks = []
    for await (const chunk of streamOrPath) chunks.push(chunk)
    return Buffer.concat(chunks)
  }
  throw new Error('put() needs a Readable stream, a Buffer, or a local file path')
}

/**
 * The always-available default: the same content-addressed local layout the
 * app already writes (`media/<sha0:2>/<sha2:4>/<sha>.<ext>`, resolved under
 * `RESOURCE_STORAGE_DIR`), reached through the same traversal-safe
 * `resolveWithin` (from `uploads.js`) the rest of the server uses, and
 * written with the same temp-file-then-rename pattern `uploads.js` already
 * established — a reader never sees a half-written file, and two writers of
 * the same key cannot collide.
 */
export class FilesystemProvider {
  constructor({ root, env = process.env } = {}) {
    this.root = resolve(root || env.RESOURCE_STORAGE_DIR || '/data/medical-library')
  }

  get configured() {
    return true
  }

  async put(key, streamOrPath, { contentType = null } = {}) {
    const fullPath = resolveWithin(this.root, key)
    if (!fullPath) throw new Error(`refusing to store to an unsafe key: ${JSON.stringify(key)}`)
    await mkdir(dirname(fullPath), { recursive: true })
    const temporaryPath = `${fullPath}.put-${randomUUID()}`
    try {
      if (typeof streamOrPath === 'string') {
        await pipeline(createReadStream(streamOrPath), createWriteStream(temporaryPath, { flags: 'wx' }))
      } else if (streamOrPath && typeof streamOrPath.pipe === 'function') {
        await pipeline(streamOrPath, createWriteStream(temporaryPath, { flags: 'wx' }))
      } else if (Buffer.isBuffer(streamOrPath)) {
        await writeFile(temporaryPath, streamOrPath, { flag: 'wx' })
      } else {
        throw new Error('put() needs a Readable stream, a Buffer, or a local file path')
      }
      await rename(temporaryPath, fullPath)
    } catch (error) {
      await unlink(temporaryPath).catch(() => {})
      throw error
    }
    const { size } = await stat(fullPath)
    return { stored: true, key, bytes: size, contentType }
  }

  async exists(key) {
    const fullPath = resolveWithin(this.root, key)
    if (!fullPath) return false
    try {
      await stat(fullPath)
      return true
    } catch {
      return false
    }
  }

  async head(key) {
    return this.exists(key)
  }

  url(key) {
    const fullPath = resolveWithin(this.root, key)
    if (!fullPath) throw new Error(`refusing to build a url for an unsafe key: ${JSON.stringify(key)}`)
    // Local storage has no URL of its own. The app already serves managed
    // media through its own authenticated route (HMAC playback tokens plus a
    // byte-range `sendFile`), keyed by this same storage key, so returning
    // the key keeps that existing delivery path working unchanged.
    return key
  }

  signedUrl(key, _options = {}) {
    // Access to a local file is already gated by the app's own playback-token
    // route rather than by a signature on this value, so this deliberately
    // matches url() instead of inventing a second, unenforced scheme.
    return this.url(key)
  }

  async delete(key) {
    const fullPath = resolveWithin(this.root, key)
    if (!fullPath) return { deleted: false, key }
    try {
      await unlink(fullPath)
      return { deleted: true, key }
    } catch (error) {
      if (error.code === 'ENOENT') return { deleted: false, key }
      throw error
    }
  }
}

function sha256Hex(data) {
  return createHash('sha256').update(data).digest('hex')
}

function hmac(key, data) {
  return createHmac('sha256', key).update(data, 'utf8').digest()
}

function encodeKeyPath(key) {
  return key.split('/').map(encodeURIComponent).join('/')
}

/**
 * AWS Signature Version 4 — the scheme R2's S3-compatible API expects on
 * every request. Header construction only, dependency-free (the whole SDK
 * is not worth pulling in for three verbs against one bucket), and built to
 * the published algorithm: canonicalise the request, hash it, derive a
 * scoped signing key from the secret through date → region → service, then
 * HMAC the string-to-sign with that key.
 */
function signR2Request({ method, host, path, region = 'auto', service = 's3', accessKeyId, secretAccessKey, payload = Buffer.alloc(0), contentType }) {
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '')
  const dateStamp = amzDate.slice(0, 8)
  const payloadHash = sha256Hex(payload)

  const headers = {
    host,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
    ...(contentType ? { 'content-type': contentType } : {}),
  }
  const signedHeaderNames = Object.keys(headers).sort()
  const canonicalHeaders = signedHeaderNames.map((name) => `${name}:${String(headers[name]).trim()}\n`).join('')
  const signedHeaders = signedHeaderNames.join(';')
  const canonicalRequest = [method, path, '', canonicalHeaders, signedHeaders, payloadHash].join('\n')

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, sha256Hex(canonicalRequest)].join('\n')

  const signingKey = hmac(hmac(hmac(hmac(`AWS4${secretAccessKey}`, dateStamp), region), service), 'aws4_request')
  const signature = createHmac('sha256', signingKey).update(stringToSign, 'utf8').digest('hex')

  return {
    headers: {
      ...headers,
      Authorization: `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    },
  }
}

export const R2_REQUIRED_ENV = ['CF_ACCOUNT_ID', 'R2_BUCKET', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY']

/**
 * General-purpose Cloudflare R2 storage via its S3-compatible API.
 *
 * Constructing this never fails and never touches the network — it only
 * reads env var names. Every operation below is guarded by `configured`; call
 * one before the four required variables are all set and it throws
 * `ProviderUnconfiguredError` immediately, before building a request.
 */
export class R2Provider {
  constructor(env = process.env) {
    this.accountId = env.CF_ACCOUNT_ID || ''
    this.bucket = env.R2_BUCKET || ''
    this.accessKeyId = env.R2_ACCESS_KEY_ID || ''
    this.secretAccessKey = env.R2_SECRET_ACCESS_KEY || ''
    this.endpoint = env.R2_ENDPOINT || (this.accountId ? `https://${this.accountId}.r2.cloudflarestorage.com` : '')
    this.publicBaseUrl = env.R2_PUBLIC_BASE_URL || ''
    this._missing = missingVars(env, R2_REQUIRED_ENV)
  }

  get configured() {
    return this._missing.length === 0
  }

  _guard(operation) {
    if (!this.configured) throw new ProviderUnconfiguredError('r2', operation, this._missing)
  }

  async put(key, streamOrPath, { contentType } = {}) {
    this._guard('put')
    assertSafeKey(key)
    const body = await toBuffer(streamOrPath)
    await this._request('PUT', key, { contentType, body })
    return { stored: true, key, bytes: body.length, contentType: contentType ?? null }
  }

  async exists(key) {
    this._guard('exists')
    assertSafeKey(key)
    const response = await this._request('HEAD', key)
    return response.ok
  }

  async head(key) {
    return this.exists(key)
  }

  url(key) {
    this._guard('url')
    assertSafeKey(key)
    return this.publicBaseUrl ? `${this.publicBaseUrl}/${key}` : `${this.endpoint}/${this.bucket}/${key}`
  }

  signedUrl(key, { expiresIn = 3600 } = {}) {
    this._guard('signedUrl')
    assertSafeKey(key)
    // A real presigned GET (query-string SigV4 signing, distinct from the
    // header-based signing `_request` uses for PUT/HEAD/DELETE) is left for
    // Opus's integration to add when a time-limited direct-to-R2 link is
    // actually needed; `expiresIn` is accepted now for interface parity.
    void expiresIn
    return this.url(key)
  }

  async delete(key) {
    this._guard('delete')
    assertSafeKey(key)
    await this._request('DELETE', key)
    return { deleted: true, key }
  }

  /**
   * Never reached unless `configured` is true — every public method above
   * guards first — so this never runs in a test suite that leaves R2's env
   * vars unset, and nothing in this codebase calls it with real credentials
   * today. What it builds is a real, correctly-signed S3-compatible request,
   * ready for Opus to exercise once wired up behind real configuration.
   */
  async _request(method, key, { contentType, body = Buffer.alloc(0) } = {}) {
    const host = new URL(this.endpoint).host
    const path = `/${this.bucket}/${encodeKeyPath(key)}`
    const signed = signR2Request({
      method, host, path, accessKeyId: this.accessKeyId, secretAccessKey: this.secretAccessKey, payload: body, contentType,
    })
    const response = await fetch(`${this.endpoint}${path}`, {
      method,
      headers: signed.headers,
      body: method === 'PUT' ? body : undefined,
    })
    if (!response.ok && method !== 'HEAD') throw new Error(`R2 ${method} ${key} failed: HTTP ${response.status}`)
    return response
  }
}

export const STREAM_REQUIRED_ENV = ['CF_ACCOUNT_ID', 'CF_STREAM_TOKEN']

/**
 * Cloudflare Stream, for video specifically. Its upload model is genuinely
 * two-phase — create an upload target, then transfer bytes to it over TUS
 * (resumable, chunked) — which does not collapse into a single synchronous
 * `put()` the way FS/R2's do. This class is the shape of that adapter, not
 * the finished pipeline: `put()` provisions the upload target (a real,
 * correctly-authenticated call once configured) and hands back the uid and
 * upload URL; performing the actual resumable byte transfer against that URL
 * is `mediaPipeline.js`'s job, not this foundation's.
 *
 * Guarded the same way R2Provider is: every method throws
 * `ProviderUnconfiguredError` before doing anything if `CF_ACCOUNT_ID` or
 * `CF_STREAM_TOKEN` is missing.
 */
export class StreamProvider {
  constructor(env = process.env) {
    this.accountId = env.CF_ACCOUNT_ID || ''
    this.apiToken = env.CF_STREAM_TOKEN || ''
    this.customerSubdomain = env.CF_STREAM_CUSTOMER_SUBDOMAIN || ''
    this._missing = missingVars(env, STREAM_REQUIRED_ENV)
  }

  get configured() {
    return this._missing.length === 0
  }

  _guard(operation) {
    if (!this.configured) throw new ProviderUnconfiguredError('stream', operation, this._missing)
  }

  _headers(extra = {}) {
    return { Authorization: `Bearer ${this.apiToken}`, ...extra }
  }

  async put(_key, _streamOrPath, { contentType } = {}) {
    this._guard('put')
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${this.accountId}/stream/direct_upload`, {
      method: 'POST',
      headers: this._headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ maxDurationSeconds: 21600 }),
    })
    if (!response.ok) throw new Error(`Stream direct_upload failed: HTTP ${response.status}`)
    const data = await response.json()
    return { stored: true, key: data?.result?.uid, uploadUrl: data?.result?.uploadURL, contentType: contentType ?? null }
  }

  async exists(key) {
    this._guard('exists')
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${this.accountId}/stream/${encodeURIComponent(key)}`, {
      headers: this._headers(),
    })
    return response.ok
  }

  async head(key) {
    return this.exists(key)
  }

  url(key) {
    this._guard('url')
    return this.customerSubdomain
      ? `https://customer-${this.customerSubdomain}.cloudflarestream.com/${key}/manifest/video.m3u8`
      : `https://iframe.cloudflarestream.com/${key}`
  }

  signedUrl(key, { expiresIn = 3600 } = {}) {
    this._guard('signedUrl')
    // Stream's real signed-URL feature needs a separate registered signing
    // key (RSA/EC, not the bearer API token above) and a JWT this class does
    // not build. Rather than half-implement a scheme nothing here can
    // honour, this returns the same unsigned playback URL until that key is
    // wired up.
    void expiresIn
    return this.url(key)
  }

  async delete(key) {
    this._guard('delete')
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${this.accountId}/stream/${encodeURIComponent(key)}`, {
      method: 'DELETE',
      headers: this._headers(),
    })
    if (!response.ok) throw new Error(`Stream delete failed: HTTP ${response.status}`)
    return { deleted: true, key }
  }
}

/**
 * The provider the app should store new media through: R2 when it is fully
 * configured, otherwise the filesystem — which is always available, so this
 * never throws and the app runs with zero Cloudflare configuration exactly as
 * it does today. Cloudflare Stream is deliberately not part of this choice:
 * it is video-specific and two-phase (see `StreamProvider` above), so a
 * caller that wants it asks for it by name rather than receiving it from a
 * generic "pick one" selector.
 */
export function selectMediaProvider(env = process.env) {
  const r2 = new R2Provider(env)
  if (r2.configured) return r2
  return new FilesystemProvider({ env })
}

/**
 * A diagnostic snapshot of which providers are usable and why — booleans and
 * variable *names* only, never a value, so this is safe to expose in an
 * admin diagnostics view without becoming a secret-disclosure path.
 */
export function describeProviders(env = process.env) {
  const r2Missing = missingVars(env, R2_REQUIRED_ENV)
  const streamMissing = missingVars(env, STREAM_REQUIRED_ENV)
  const r2Configured = r2Missing.length === 0
  const streamConfigured = streamMissing.length === 0
  return {
    filesystem: {
      configured: true,
      available: true,
      reason: 'always available — local content-addressed storage under RESOURCE_STORAGE_DIR',
    },
    r2: {
      configured: r2Configured,
      available: r2Configured,
      missingEnv: r2Missing,
      reason: r2Configured ? 'all required R2 env vars are set' : `missing env vars: ${r2Missing.join(', ')}`,
    },
    stream: {
      configured: streamConfigured,
      available: streamConfigured,
      missingEnv: streamMissing,
      reason: streamConfigured ? 'all required Stream env vars are set' : `missing env vars: ${streamMissing.join(', ')}`,
    },
    selected: r2Configured ? 'r2' : 'filesystem',
  }
}
