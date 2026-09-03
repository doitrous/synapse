import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import { API_MODE, apiDelete, apiGet, apiPost, apiPut } from './api'
import { usePersistentState } from './usePersistentState'

/**
 * Notes and whiteboards published behind a link.
 *
 * A share begins as a copy when it is published. The student's private source
 * remains independent, while the shared copy gains server-checked revisions so
 * classmates can collaborate without silently overwriting newer work. Sharing
 * again republishes to the same link.
 *
 * The permission is the server's decision, always — `canEdit` on a read is what
 * the server says this viewer may do, not something worked out here.
 */

export type ShareKind = 'note' | 'whiteboard'
/** private: only the owner. View/edit links stay inside the owner's cohort. */
export type ShareAccess = 'private' | 'view' | 'edit'

export interface SharedDocument<T = unknown> {
  id: string
  kind: ShareKind
  title: string
  access: ShareAccess
  payload: T
  revision: number
  updatedAt: string
  createdAt: string
  isOwner: boolean
  canEdit: boolean
}

export interface ShareSummary {
  id: string
  kind: ShareKind
  title: string
  access: ShareAccess
  permission?: ShareAccess
  ownerName?: string
  collaborators?: string[]
  subjectId?: string
  topics?: string[]
  starCount?: number
  starred?: boolean
  following?: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Which of this student's own documents have been published, and as what.
 *
 * Keyed by a local handle — `note:<id>`, or `board` for the whiteboard — so
 * pressing Share on something already shared updates the existing link instead
 * of minting a second one nobody has.
 */
export const SHARE_INDEX_STORAGE_KEY = 'nishany.account.shares.v1'

export type ShareIndex = Record<string, string>

export function shareUrl(id: string): string {
  return `${window.location.origin}/s/${id}`
}

export function useShareIndex() {
  return usePersistentState<ShareIndex>(SHARE_INDEX_STORAGE_KEY, {})
}

/**
 * `createShare`, `updateShare` and `deleteShare` stay request-then-render.
 *
 * `createShare` hands the dialog a server-minted share id, which is the link
 * it shows — there is nothing honest to render before that id exists.
 * `updateShare` is revision-checked (`expectedRevision`): a conflict from a
 * classmate editing the same document at once is an expected outcome here,
 * not a rare fault, so flashing "saved" ahead of the server would misreport
 * whether the edit actually landed. `deleteShare`'s own optimistic UI would
 * live in `ShareDialog`'s local state (the `index`/`shareId` it owns), which
 * is a component file outside this hook's scope. None of the three are safe
 * or reachable candidates for this pass — see DO point 5 in the brief.
 */
export async function createShare(input: { kind: ShareKind; title: string; access: ShareAccess; payload: unknown }): Promise<string> {
  const created = await apiPost<{ id: string }>('/shares', input)
  return created.id
}

export async function updateShare(id: string, patch: { title?: string; access?: ShareAccess; payload?: unknown; expectedRevision?: number; topics?: unknown[] }): Promise<SharedDocument> {
  return apiPut<SharedDocument>(`/shares/${encodeURIComponent(id)}`, patch)
}

export async function deleteShare(id: string): Promise<void> {
  await apiDelete(`/shares/${encodeURIComponent(id)}`)
}

export async function fetchShare<T>(id: string): Promise<SharedDocument<T>> {
  return apiGet<SharedDocument<T>>(`/shares/${encodeURIComponent(id)}`)
}

export async function listSharedDocuments(kind: ShareKind): Promise<ShareSummary[]> {
  return apiGet<ShareSummary[]>(`/shares?kind=${encodeURIComponent(kind)}`)
}

export type Updater<T> = T | ((previous: T) => T)

/**
 * One small broadcast cache, keyed by `ShareKind`, shared by every mounted
 * `useSharedDocuments(kind)`.
 *
 * `setShareStar`/`setShareFollow` are called as plain functions from wherever
 * a star or follow button lives — they only ever get an `id`, never a handle
 * to the component's own `items`/`setItems`. Routing the list through this
 * cache instead of per-instance `useState` is what lets a mutation apply
 * instantly to whatever is on screen, and roll back into the same place if
 * the request fails.
 */
function createKeyedStore<T>() {
  const values = new Map<string, T>()
  const listeners = new Map<string, Set<() => void>>()
  return {
    ensure(key: string, initial: T): T {
      if (!values.has(key)) values.set(key, initial)
      return values.get(key) as T
    },
    set(key: string, value: T): void {
      values.set(key, value)
      for (const listener of listeners.get(key) ?? []) listener()
    },
    subscribe(key: string, listener: () => void): () => void {
      let bucket = listeners.get(key)
      if (!bucket) { bucket = new Set(); listeners.set(key, bucket) }
      bucket.add(listener)
      return () => bucket!.delete(listener)
    },
    entries(): [string, T][] {
      return [...values.entries()]
    },
  }
}

const shareListStore = createKeyedStore<ShareSummary[]>()

/** Find which kind's list currently holds `id` — star/follow only know the id, not the kind. */
function findShareEntry(id: string): { kind: string; item: ShareSummary } | null {
  for (const [kind, list] of shareListStore.entries()) {
    const item = list.find((entry) => entry.id === id)
    if (item) return { kind, item }
  }
  return null
}

function patchShare(id: string, patch: (item: ShareSummary) => ShareSummary): ShareSummary | null {
  const found = findShareEntry(id)
  if (!found) return null
  const list = shareListStore.ensure(found.kind, [])
  shareListStore.set(found.kind, list.map((entry) => (entry.id === id ? patch(entry) : entry)))
  return found.item
}

export async function setShareStar(id: string, starred: boolean): Promise<ShareSummary> {
  const before = patchShare(id, (item) => ({
    ...item,
    starred,
    // Guard against double-counting: if something else already landed this
    // same target value, don't nudge the count again.
    starCount: item.starred === starred ? item.starCount : Math.max(0, (item.starCount ?? 0) + (starred ? 1 : -1)),
  }))
  try {
    const updated = await apiPut<ShareSummary>(`/shares/${encodeURIComponent(id)}/star`, { starred })
    patchShare(id, () => updated)
    return updated
  } catch (error) {
    // Only undo if `starred` still reads as what we optimistically set — a
    // second toggle that raced ahead of this failure must not be clobbered.
    // ponytail: field-level compare-and-restore, not a full op queue; fine for
    // one boolean plus its counter, revisit if more fields join this record.
    if (before) {
      patchShare(id, (item) => (item.starred === starred ? { ...item, starred: before.starred, starCount: before.starCount } : item))
    }
    throw error
  }
}

export async function setShareFollow(id: string, following: boolean): Promise<ShareSummary> {
  const before = patchShare(id, (item) => ({ ...item, following }))
  try {
    const updated = await apiPut<ShareSummary>(`/shares/${encodeURIComponent(id)}/follow`, { following })
    patchShare(id, () => updated)
    return updated
  } catch (error) {
    if (before) {
      patchShare(id, (item) => (item.following === following ? { ...item, following: before.following } : item))
    }
    throw error
  }
}

export function useSharedDocuments(kind: ShareKind) {
  const getSnapshot = useCallback(() => shareListStore.ensure(kind, []), [kind])
  const subscribe = useCallback((listener: () => void) => shareListStore.subscribe(kind, listener), [kind])
  const items = useSyncExternalStore(subscribe, getSnapshot)
  const setItems = useCallback((next: Updater<ShareSummary[]>) => {
    const current = shareListStore.ensure(kind, [])
    shareListStore.set(kind, typeof next === 'function' ? (next as (previous: ShareSummary[]) => ShareSummary[])(current) : next)
  }, [kind])
  const [loading, setLoading] = useState(API_MODE)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    if (!API_MODE) return
    setLoading(true)
    try {
      shareListStore.set(kind, await listSharedDocuments(kind))
      setError('')
    } catch {
      setError('Shared items could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [kind])

  useEffect(() => {
    if (!API_MODE) { setLoading(false); return }
    void reload()
  }, [reload])

  return { items, setItems, loading, error, reload }
}

/** One shared document, for the public viewer. */
export function useSharedDocument<T>(id: string | undefined) {
  const [share, setShare] = useState<SharedDocument<T> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    if (!id) return
    setLoading(true)
    try {
      setShare(await fetchShare<T>(id))
      setError('')
    } catch {
      // The server answers 404 for a link that never existed and for one that
      // has been revoked alike, which is the same thing from here.
      setError('missing')
      setShare(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (!API_MODE) { setLoading(false); setError('offline'); return }
    void reload()
  }, [reload])

  return { share, loading, error, reload, setShare }
}
