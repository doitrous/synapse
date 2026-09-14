/**
 * The admin read path into the content catalogue.
 *
 * Every admin surface used to reach the catalogue through
 * `usePersistentState(CONTENT_LEDGER_STORAGE_KEY)`, which downloads and parses
 * the whole authoring ledger — ~60 MB in production — so that a tab could show
 * one item or a count. `server/src/adminContent.js` slices that document; this
 * is the browser half.
 *
 * Reads are sliced here; WRITES are unchanged. A tab still saves through the
 * delta path (`putStateDelta`), which needs no base document — the `before` each
 * change carries is the per-item conflict guard — so a tab holds a slice, edits
 * it, and saves exactly the items it touched. Never save a filtered array as the
 * whole document: an id absent from a whole-document save reads as a deletion.
 *
 * Demo mode (no `VITE_API_BASE`) has no server, so the same functions read the
 * ledger `demoPreview` seeded into localStorage.
 */
import { useEffect, useState } from 'react'
import { API_MODE, apiGetIfChanged } from '../api'
import { errorKind, type StateErrorKind } from '../apiErrors'
import { CONTENT_LEDGER_STORAGE_KEY, type ManagedContentItem } from '@/data/contentControl'

interface CacheEntry { etag: string | null; data: unknown }
const cache = new Map<string, CacheEntry>()
const inflight = new Map<string, Promise<unknown>>()

/** Drop everything; the next read revalidates (ETags survive, so a no-op is a 304). */
export function invalidateAdminContent(): void {
  for (const [key, entry] of cache) cache.set(key, { etag: entry.etag, data: undefined })
}

/** Test seam: forget both the data and the ETags. */
export function resetAdminContentCache(): void {
  cache.clear()
  inflight.clear()
}

async function load<T>(key: string, path: string, force: boolean): Promise<T> {
  const held = cache.get(key)
  if (!force && held?.data !== undefined) return held.data as T
  const pending = inflight.get(key)
  if (pending) return pending as Promise<T>

  const run = apiGetIfChanged<T>(path, held?.etag ?? null)
    .then((fresh) => {
      if (!fresh) {
        if (held?.data !== undefined) return held.data as T
        cache.delete(key)
        return load<T>(key, path, true)
      }
      cache.set(key, { etag: fresh.etag ?? held?.etag ?? null, data: fresh.data })
      return fresh.data
    })
    .finally(() => { inflight.delete(key) })
  inflight.set(key, run)
  return run as Promise<T>
}

/** The demo build's catalogue: whatever `demoPreview` seeded into localStorage. */
function demoLedger(): ManagedContentItem[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = JSON.parse(localStorage.getItem(CONTENT_LEDGER_STORAGE_KEY) ?? '[]')
    return Array.isArray(raw) ? (raw as ManagedContentItem[]) : []
  } catch { return [] }
}

export interface AdminItemResponse { version: string; item: ManagedContentItem | null }

export function fetchAdminItem(id: string, force = false): Promise<AdminItemResponse> {
  if (!API_MODE) {
    return Promise.resolve({ version: 'demo', item: demoLedger().find((item) => item.id === id) ?? null })
  }
  return load<AdminItemResponse>(`admin:item:${id}`, `/admin/content/item/${encodeURIComponent(id)}`, force)
}

/**
 * One full catalogue item by id, fetched when `id` changes — the reader/preview
 * path, without loading the whole ledger. `null` id (nothing selected) resolves
 * to no item and no request.
 */
export function useAdminItem(id: string | null | undefined): { item: ManagedContentItem | null; loading: boolean; error: StateErrorKind | null } {
  const [state, setState] = useState<{ item: ManagedContentItem | null; loading: boolean; error: StateErrorKind | null }>(
    { item: null, loading: Boolean(id), error: null },
  )
  useEffect(() => {
    if (!id) { setState({ item: null, loading: false, error: null }); return }
    let live = true
    setState({ item: null, loading: true, error: null })
    fetchAdminItem(id)
      .then((response) => { if (live) setState({ item: response.item, loading: false, error: null }) })
      .catch((error) => { if (live) setState({ item: null, loading: false, error: errorKind(error) }) })
    return () => { live = false }
  }, [id])
  return state
}
