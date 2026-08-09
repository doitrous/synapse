/**
 * Thin API client. When VITE_API_BASE is set the app runs in "live" mode: state
 * persists to the backend (MariaDB) instead of localStorage, and demo data is
 * suppressed. When it is unset the app is the self-contained demo (localStorage).
 */
const BASE = import.meta.env.VITE_API_BASE as string | undefined
const TOKEN = import.meta.env.VITE_API_TOKEN as string | undefined

/** True when a backend is configured — the switch between live and demo modes. */
export const API_MODE = Boolean(BASE)

function headers(json = false): HeadersInit {
  const h: Record<string, string> = {}
  if (json) h['Content-Type'] = 'application/json'
  if (TOKEN) h['Authorization'] = `Bearer ${TOKEN}`
  return h
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: headers() })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

export async function apiSend<T>(path: string, method: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { method, headers: headers(true), body: body == null ? undefined : JSON.stringify(body) })
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

export const apiPut = <T>(path: string, body: unknown) => apiSend<T>(path, 'PUT', body)
export const apiPost = <T>(path: string, body?: unknown) => apiSend<T>(path, 'POST', body)
export const apiDelete = <T>(path: string) => apiSend<T>(path, 'DELETE')

/** Fetch a binary path (with auth) and trigger a browser download. */
export async function apiDownload(path: string, filename: string): Promise<void> {
  const res = await fetch(`${BASE}${path}`, { headers: headers() })
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

/** Read a state document by key. Returns null when unset. */
export async function getState<T>(key: string): Promise<T | null> {
  try { const r = await apiGet<{ value: T | null }>(`/state/${encodeURIComponent(key)}`); return r.value }
  catch { return null }
}
/** Write a state document by key. */
export function putState(key: string, value: unknown): Promise<unknown> {
  return apiPut(`/state/${encodeURIComponent(key)}`, { value }).catch(() => undefined)
}

/**
 * Pick the live (empty) seed vs the demo seed. In live mode surfaces start empty
 * so no demo data appears; in demo mode they keep the rich sample content.
 */
export function seedOr<T>(demo: T | (() => T), empty: T | (() => T)): T {
  const pick = API_MODE ? empty : demo
  return typeof pick === 'function' ? (pick as () => T)() : pick
}
