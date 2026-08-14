import { authAccessToken, authUserId } from './supabase'
import { ApiError, errorKind, type StateErrorKind } from './apiErrors'

export { ApiError, errorKind, isRetryable } from './apiErrors'
export type { StateErrorKind } from './apiErrors'

/**
 * Thin API client. When VITE_API_BASE is set the app runs in "live" mode: state
 * persists to the backend (MariaDB) instead of localStorage, and demo data is
 * suppressed. When it is unset the app is the self-contained demo (localStorage).
 */
const BASE = import.meta.env.VITE_API_BASE as string | undefined

/** Scope browser crash-recovery data to the same verified owner as MariaDB. */
export async function stateOwnerId(): Promise<string | null> {
  return authUserId()
}

/** True when a backend is configured — the switch between live and demo modes. */
export const API_MODE = Boolean(BASE)

async function headers(json = false): Promise<HeadersInit> {
  const h: Record<string, string> = {}
  if (json) h['Content-Type'] = 'application/json'
  const token = await authAccessToken()
  if (token) h['Authorization'] = `Bearer ${token}`
  return h
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: await headers() })
  if (!res.ok) throw new ApiError(res.status, `GET ${path}`)
  return res.json() as Promise<T>
}

export async function apiSend<T>(path: string, method: string, body?: unknown, keepalive = false): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { method, headers: await headers(true), body: body == null ? undefined : JSON.stringify(body), keepalive })
  if (!res.ok) throw new ApiError(res.status, `${method} ${path}`)
  return res.json() as Promise<T>
}

export const apiPut = <T>(path: string, body: unknown) => apiSend<T>(path, 'PUT', body)
export const apiPost = <T>(path: string, body?: unknown) => apiSend<T>(path, 'POST', body)
export const apiDelete = <T>(path: string) => apiSend<T>(path, 'DELETE')

/** Fetch a binary path (with auth) and trigger a browser download. */
export async function apiDownload(path: string, filename: string): Promise<void> {
  const res = await fetch(`${BASE}${path}`, { headers: await headers() })
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
  const res = await fetch(`${BASE}${path}`, { headers: await headers() })
  if (!res.ok) throw new ApiError(res.status, `GET ${path}`)
  return res.arrayBuffer()
}

/** Open an authenticated file in a new tab, optionally at an exact PDF page. */
export async function apiOpenFile(path: string, fragment = ''): Promise<void> {
  // Open synchronously so browsers treat this as the user's click, then sever
  // the opener before the authenticated file replaces the placeholder.
  const popup = window.open('about:blank', '_blank')
  if (popup) {
    popup.opener = null
    popup.document.title = 'Opening source…'
    popup.document.body.textContent = 'Opening the cited source…'
  }
  try {
    const res = await fetch(`${BASE}${path}`, { headers: await headers() })
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
   * Why the read failed, or null when it succeeded. A missing key is a success
   * with a null value; this field means the document could not be read at all.
   * Without it a 403 is indistinguishable from "nothing stored yet", and the
   * surface silently renders its seed as though it were the student's data.
   */
  error: StateErrorKind | null
}

export async function getState<T>(key: string): Promise<RemoteState<T>> {
  try {
    const r = await apiGet<{ value: T | null; updatedAt?: string | null }>(`/state/${encodeURIComponent(key)}`)
    return { value: r.value, updatedAt: r.updatedAt ?? null, error: null }
  } catch (error) { return { value: null, updatedAt: null, error: errorKind(error) } }
}
/** Write a state document by key. */
export function putState(key: string, value: unknown): Promise<unknown> {
  return apiPut(`/state/${encodeURIComponent(key)}`, { value })
}

export async function getUserState<T>(key: string): Promise<RemoteState<T>> {
  try {
    const r = await apiGet<{ value: T | null; updatedAt?: string | null }>(`/user-state/${encodeURIComponent(key)}`)
    return { value: r.value, updatedAt: r.updatedAt ?? null, error: null }
  } catch (error) { return { value: null, updatedAt: null, error: errorKind(error) } }
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
