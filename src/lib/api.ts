import { authAccessToken, authUserId } from './supabase'

/**
 * Thin API client. When VITE_API_BASE is set the app runs in "live" mode: state
 * persists to the backend (MariaDB) instead of localStorage, and demo data is
 * suppressed. When it is unset the app is the self-contained demo (localStorage).
 */
const BASE = import.meta.env.VITE_API_BASE as string | undefined
const OWNER_ACCESS_KEY = 'synapse-owner-access'

function ownerAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.sessionStorage.getItem(OWNER_ACCESS_KEY)
}

export function setOwnerAccessToken(token: string): void {
  if (typeof window === 'undefined') return
  const clean = token.trim()
  if (clean) window.sessionStorage.setItem(OWNER_ACCESS_KEY, clean)
  else window.sessionStorage.removeItem(OWNER_ACCESS_KEY)
}

export function clearOwnerAccessToken(): void {
  if (typeof window !== 'undefined') window.sessionStorage.removeItem(OWNER_ACCESS_KEY)
}

/** Scope browser crash-recovery data to the same verified owner as MariaDB. */
export async function stateOwnerId(): Promise<string | null> {
  if (ownerAccessToken()) return 'preview-owner'
  return authUserId()
}

/** True when a backend is configured — the switch between live and demo modes. */
export const API_MODE = Boolean(BASE)

async function headers(json = false): Promise<HeadersInit> {
  const h: Record<string, string> = {}
  if (json) h['Content-Type'] = 'application/json'
  // The temporary owner key is typed at runtime and lives only in this tab. It
  // is never a Vite build variable, so production JavaScript cannot disclose it.
  const token = ownerAccessToken() || await authAccessToken()
  if (token) h['Authorization'] = `Bearer ${token}`
  return h
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: await headers() })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

export async function apiSend<T>(path: string, method: string, body?: unknown, keepalive = false): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { method, headers: await headers(true), body: body == null ? undefined : JSON.stringify(body), keepalive })
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}`)
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

/** Read a state document by key. Returns null when unset. */
export async function getState<T>(key: string): Promise<T | null> {
  try { const r = await apiGet<{ value: T | null }>(`/state/${encodeURIComponent(key)}`); return r.value }
  catch { return null }
}
/** Write a state document by key. */
export function putState(key: string, value: unknown): Promise<unknown> {
  return apiPut(`/state/${encodeURIComponent(key)}`, { value })
}

export async function getUserState<T>(key: string): Promise<T | null> {
  try { const r = await apiGet<{ value: T | null }>(`/user-state/${encodeURIComponent(key)}`); return r.value }
  catch { return null }
}

export function putUserState(key: string, value: unknown, keepalive = false): Promise<unknown> {
  return apiSend(`/user-state/${encodeURIComponent(key)}`, 'PUT', { value }, keepalive)
}

/**
 * Pick the live (empty) seed vs the demo seed. In live mode surfaces start empty
 * so no demo data appears; in demo mode they keep the rich sample content.
 */
export function seedOr<T>(demo: T | (() => T), empty: T | (() => T)): T {
  const pick = API_MODE ? empty : demo
  return typeof pick === 'function' ? (pick as () => T)() : pick
}
