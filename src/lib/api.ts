import { ApiError, errorKind, type StateErrorKind } from './apiErrors'

// The two strings the detached "opening source" popup shows, inline. This is an
// eager module (imported on boot), so importing the full ~320KB dictionary here
// would put all of it on the English boot path; I18nProvider now loads that
// lazily instead. See apiOpenFile.
const POPUP_AR: Record<string, string> = {
  'Opening source…': 'جارٍ فتح المصدر…',
  'Opening the cited source…': 'جارٍ فتح المصدر المُستشهد به…',
}

export { ApiError, errorKind, isRetryable } from './apiErrors'
export type { StateErrorKind } from './apiErrors'

/**
 * Thin API client. When VITE_API_BASE is set the app runs in "live" mode: state
 * persists to the backend (MariaDB) instead of localStorage, and demo data is
 * suppressed. When it is unset the app is the self-contained demo (localStorage).
 */
const BASE = import.meta.env.VITE_API_BASE as string | undefined

let ownerId: string | null = null
let ownerAsked: Promise<string | null> | null = null

/** Told by the identity provider the moment `/api/me` answers. */
export function setStateOwnerId(id: string | null): void {
  ownerId = id
  // "Nobody" is an answer, not an unknown: the store must not ask `/me` again
  // until a sign-in says otherwise (which comes through here with an id).
  ownerAsked = id ? null : Promise.resolve(null)
}

/**
 * Scope browser crash-recovery data to the same verified owner as MariaDB.
 *
 * The account id used to be read out of the Supabase session in localStorage.
 * There is no session here any more, so it comes from `/api/me` — normally
 * already known, because `IdentityProvider` hands it over as soon as it has it.
 * The fetch below is only for the race where a document hydrates first; it is
 * shared by every caller and re-armed on failure so a hiccup is not cached.
 */
export async function stateOwnerId(): Promise<string | null> {
  if (ownerId) return ownerId
  ownerAsked ??= adoptOwnerLookup(loadMe())
  return ownerAsked
}

let meInflight: Promise<unknown> | null = null
/**
 * `GET /api/me`, shared while in flight. The identity provider and any
 * document hydrating before it both ask on boot; whichever asks first pays the
 * round trip and the other joins it. Only concurrent calls are merged — a later
 * reload (after sign-in, after onboarding) is a fresh request.
 */
export function loadMe<T = { user: { id: string } | null }>(): Promise<T> {
  meInflight ??= apiGet<T>('/me').finally(() => { meInflight = null })
  return meInflight as Promise<T>
}

/**
 * Share one `/api/me` between the identity provider and the state store, so a
 * boot costs a single round trip rather than two racing ones. A 401 is the
 * signed-out answer and is kept (nobody is signed in until `setStateOwnerId`
 * says otherwise); any other failure is dropped so the next asker retries.
 */
export function adoptOwnerLookup(request: Promise<{ user: { id: string } | null } | null>): Promise<string | null> {
  const lookup = request
    .then((me) => {
      ownerId = me?.user?.id ?? null
      return ownerId
    })
    .catch((error: unknown) => {
      if (!(error instanceof ApiError && error.status === 401)) ownerAsked = null
      return null
    })
  ownerAsked ??= lookup
  return lookup
}

/**
 * A 401 on a request that used to succeed means the session ended elsewhere —
 * it expired, a password change evicted it, or somebody signed out in another
 * tab. `IdentityProvider` listens for this and re-reads `/api/me` once, so the
 * app settles on "anonymous" and the guards send the person to sign in. Fired
 * unconditionally: only the provider knows whether anyone was signed in, and
 * only it decides whether to act.
 */
export const SESSION_EXPIRED_EVENT = 'nishany:session-expired'

function noteUnauthorized(status: number): void {
  if (status === 401 && typeof window !== 'undefined') window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT))
}

/** True when a backend is configured — the switch between live and demo modes. */
export const API_MODE = Boolean(BASE)

/** The API origin prefix, or `''` when requests go to the app's own origin. */
export const API_BASE = BASE ?? ''

/** Resolve a public API path for browser-native media elements. */
export function apiPublicUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  if (!BASE || !/^https?:\/\//i.test(BASE)) return path
  return new URL(path, BASE).toString()
}

/**
 * No Authorization header any more.
 *
 * The session is an `HttpOnly` cookie the server sets and reads; `credentials`
 * below is what sends it, and nothing on this page can see it. Native clients
 * still present a bearer token, which the same server routes still accept.
 */
function headers(json = false): HeadersInit {
  const h: Record<string, string> = {}
  if (json) h['Content-Type'] = 'application/json'
  return h
}

/** The session cookie travels with every call; it is same-origin in dev and prod alike. */
const CREDENTIALS: RequestCredentials = 'same-origin'

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: await headers(), credentials: CREDENTIALS })
  if (!res.ok) {
    noteUnauthorized(res.status)
    throw new ApiError(res.status, `GET ${path}`)
  }
  return res.json() as Promise<T>
}

/**
 * A conditional GET: send the ETag we already hold and let the server say
 * "unchanged".
 *
 * Returns null on 304, so the caller keeps what it cached. `apiGet` cannot do
 * this — it neither sends a request header nor exposes a response one — and the
 * alternative was a second copy of the fetch/auth/error code in the content
 * client. See src/lib/content/contentClient.ts, the only caller.
 */
export async function apiGetIfChanged<T>(path: string, etag: string | null): Promise<{ etag: string | null; data: T } | null> {
  const outgoing = { ...(await headers()) } as Record<string, string>
  if (etag) outgoing['If-None-Match'] = etag
  const res = await fetch(`${BASE}${path}`, { headers: outgoing, credentials: CREDENTIALS })
  if (res.status === 304) return null
  if (!res.ok) {
    noteUnauthorized(res.status)
    throw new ApiError(res.status, `GET ${path}`)
  }
  return { etag: res.headers.get('ETag'), data: (await res.json()) as T }
}

/**
 * Above this many characters, a JSON body is worth gzipping before upload.
 *
 * The shared content documents are tens of megabytes (the question ledger alone
 * is ~23 MB), and a save re-sends the whole document. Raw, that upload is the
 * dominant cost of publishing — tens of seconds on an asymmetric connection,
 * long enough that a reload before it finished dropped the write and the change
 * looked like it reverted. Gzip shrinks it ~6× on the wire; body-parser inflates
 * it server-side automatically. Small bodies are left alone: the compression
 * would cost more than it saves.
 */
const GZIP_MIN_CHARS = 256 * 1024

async function gzipBody(text: string): Promise<Blob> {
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'))
  return await new Response(stream).blob()
}

export async function apiSend<T>(path: string, method: string, body?: unknown, keepalive = false): Promise<T> {
  // A file is sent as itself. Stringifying a Blob yields "{}", which is how an
  // upload silently becomes two bytes of nothing.
  const isBinary = typeof Blob !== 'undefined' && body instanceof Blob
  const outgoing = await headers(!isBinary)
  let payload: BodyInit | undefined = body == null ? undefined : isBinary ? (body as Blob) : JSON.stringify(body)
  // Compress large JSON documents on the wire. `keepalive` requests are capped
  // at 64 KB by the browser, so they never reach the threshold and are left as
  // strings. Any failure falls back to the uncompressed body rather than losing
  // the save.
  if (typeof payload === 'string' && !keepalive && payload.length >= GZIP_MIN_CHARS && typeof CompressionStream !== 'undefined') {
    try {
      payload = await gzipBody(payload)
      ;(outgoing as Record<string, string>)['Content-Type'] = 'application/json'
      ;(outgoing as Record<string, string>)['Content-Encoding'] = 'gzip'
    } catch { /* leave payload as the original JSON string */ }
  }
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: outgoing,
    body: payload,
    keepalive,
    credentials: CREDENTIALS,
  })
  if (!res.ok) {
    noteUnauthorized(res.status)
    // The refusal body is where the server says which item was refused and why.
    // Reading it costs one parse on a path that has already failed, and it is
    // the difference between "that did not save" and a sentence somebody can act on.
    const detail = await res.json().catch(() => null)
    const stated = detail && typeof detail === 'object' && typeof (detail as { error?: unknown }).error === 'string'
      ? (detail as { error: string }).error
      : undefined
    throw new ApiError(res.status, `${method} ${path}`, stated, detail)
  }
  return res.json() as Promise<T>
}

export const apiPut = <T>(path: string, body: unknown) => apiSend<T>(path, 'PUT', body)
export const apiPost = <T>(path: string, body?: unknown) => apiSend<T>(path, 'POST', body)
export const apiDelete = <T>(path: string) => apiSend<T>(path, 'DELETE')

/** Fetch a binary path (with auth) and trigger a browser download. */
export async function apiDownload(path: string, filename: string): Promise<void> {
  const res = await fetch(`${BASE}${path}`, { headers: await headers(), credentials: CREDENTIALS })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

/**
 * Fetch an authenticated file as bytes.
 *
 * The in-app reader needs the data, not a tab: it hands the buffer to pdf.js.
 * Factored out of apiOpenFile so both paths authenticate identically.
 */
export async function apiFetchFile(path: string): Promise<ArrayBuffer> {
  const res = await fetch(`${BASE}${path}`, { headers: await headers(), credentials: CREDENTIALS })
  if (!res.ok) throw new ApiError(res.status, `GET ${path}`)
  return res.arrayBuffer()
}

/** Fetch authenticated media while preserving its server-verified MIME type. */
export async function apiFetchBlob(path: string): Promise<Blob> {
  const res = await fetch(`${BASE}${path}`, { headers: await headers(), credentials: CREDENTIALS })
  if (!res.ok) throw new ApiError(res.status, `GET ${path}`)
  return res.blob()
}

/** Open an authenticated file in a new tab, optionally at an exact PDF page. */
export async function apiOpenFile(path: string, fragment = ''): Promise<void> {
  // Open synchronously so browsers treat this as the user's click, then sever
  // the opener before the authenticated file replaces the placeholder.
  const popup = window.open('about:blank', '_blank')
  if (popup) {
    popup.opener = null
    // The popup is a detached document with no React tree, so it reads the
    // language `I18nProvider` stamps onto `<html lang>` rather than `useT()`.
    const lang = document.documentElement.lang
    const say = (en: string) => (lang === 'ar' ? POPUP_AR[en] ?? en : en)
    popup.document.title = say('Opening source…')
    popup.document.body.textContent = say('Opening the cited source…')
  }
  try {
    const res = await fetch(`${BASE}${path}`, { headers: await headers(), credentials: CREDENTIALS })
    if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    if (popup) popup.location.replace(`${url}${fragment}`)
    else window.open(`${url}${fragment}`, '_blank', 'noopener,noreferrer')
    window.setTimeout(() => URL.revokeObjectURL(url), 10 * 60 * 1000)
  } catch (error) {
    popup?.close()
    throw error
  }
}

/** Stream an admin-selected source file to its pre-qualified resource record. */
export async function apiUploadMedicalResource(resourceId: string, file: File): Promise<{ ok: boolean; sizeBytes: number; sha256: string }> {
  const res = await fetch(`${BASE}/medical-resources/${encodeURIComponent(resourceId)}/file`, {
    method: 'PUT',
    headers: { ...(await headers()), 'Content-Type': file.type || 'application/octet-stream' },
    body: file,
    credentials: CREDENTIALS,
  })
  if (!res.ok) throw new Error(`PUT medical resource → ${res.status}`)
  return res.json()
}

/**
 * Send one bounded slice of a larger upload.
 *
 * The body is raw bytes rather than a form: nothing about a chunk needs a
 * field name, and a multipart wrapper would only add a copy of it in memory.
 */
export async function apiUploadChunk(path: string, body: Blob): Promise<void> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'PUT',
    headers: { ...(await headers()), 'Content-Type': 'application/octet-stream' },
    body,
    credentials: CREDENTIALS,
  })
  if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? `PUT ${path} → ${res.status}`)
}

/** Read a state document by key. Returns null when unset. */
/**
 * A stored document plus when the server last changed it. The timestamp is what
 * lets a client tell whether its own crash-recovery copy is actually newer.
 * `updatedAt` is null when the key has never been written, or when an older
 * server has not been redeployed yet.
 */
export interface RemoteState<T> {
  value: T | null
  updatedAt: string | null
  /**
   * The version row this document was read at, sent back on save so the server
   * can work out what this client actually changed. Null when nothing is
   * stored, or when an older server has not been redeployed yet.
   */
  version: number | null
  /**
   * Why the read failed, or null when it succeeded. A missing key is a success
   * with a null value; this field means the document could not be read at all.
   * Without it a 403 is indistinguishable from "nothing stored yet", and the
   * surface silently renders its seed as though it were the student's data.
   */
  error: StateErrorKind | null
  /**
   * Whether the server that answered this read understands delta (change-only)
   * saves for this document. Absent on an older server, so a delta is withheld
   * until a server has explicitly said it can apply one — a client can never
   * send a change-only body to a server that would misread it as a whole one.
   */
  deltaSupported?: boolean
}

export async function getState<T>(key: string): Promise<RemoteState<T>> {
  try {
    const r = await apiGet<{ value: T | null; updatedAt?: string | null; version?: number | null; deltaSupported?: boolean }>(`/state/${encodeURIComponent(key)}`)
    return { value: r.value, updatedAt: r.updatedAt ?? null, version: r.version ?? null, error: null, deltaSupported: r.deltaSupported === true }
  } catch (error) { return { value: null, updatedAt: null, version: null, error: errorKind(error) } }
}

/**
 * Write a state document by key.
 *
 * `baseVersion` is the version this client started from. The server uses it to
 * reconstruct what changed rather than taking the whole document on trust, so
 * two people editing different items no longer overwrite one another.
 */
export function putState(key: string, value: unknown, baseVersion: number | null): Promise<{ ok: boolean; version: number | null }> {
  return apiPut(`/state/${encodeURIComponent(key)}`, { value, baseVersion })
}

/**
 * Write only the items that changed, not the whole document.
 *
 * `changes` is `{ collection, id, before, after }[]` — the server applies each
 * onto what is stored now with the same per-item conflict check a whole save
 * uses, so publishing one question no longer re-uploads a 23 MB ledger. The
 * server derives authorisation from the change itself; the client cannot assert
 * past it. Same response shape as putState.
 */
export function putStateDelta(key: string, changes: unknown[], baseVersion: number | null): Promise<{ ok: boolean; version: number | null }> {
  return apiPut(`/state/${encodeURIComponent(key)}`, { changes, baseVersion })
}

export async function getUserState<T>(key: string): Promise<RemoteState<T>> {
  try {
    const r = await apiGet<{ value: T | null; updatedAt?: string | null }>(`/user-state/${encodeURIComponent(key)}`)
    // Private per-user documents have one writer, so they need no version.
    return { value: r.value, updatedAt: r.updatedAt ?? null, version: null, error: null }
  } catch (error) { return { value: null, updatedAt: null, version: null, error: errorKind(error) } }
}

export function putUserState(key: string, value: unknown, keepalive = false): Promise<unknown> {
  return apiSend(`/user-state/${encodeURIComponent(key)}`, 'PUT', { value }, keepalive)
}

/*
 * `seedOr` used to live here. It was the intended switch between the demo seed
 * and an empty production surface, but it only ever had three call sites while
 * the rest of the app wrote `API_MODE ? [] : SEED` inline. Two idioms for one
 * decision is how the next seed leaks back into production, so the inline form
 * — the one already used everywhere that matters — is now the only one.
 */
