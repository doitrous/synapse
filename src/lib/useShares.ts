import { useCallback, useEffect, useState } from 'react'
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
export const SHARE_INDEX_STORAGE_KEY = 'synapse.account.shares.v1'

export type ShareIndex = Record<string, string>

export function shareUrl(id: string): string {
  return `${window.location.origin}/s/${id}`
}

export function useShareIndex() {
  return usePersistentState<ShareIndex>(SHARE_INDEX_STORAGE_KEY, {})
}

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

export async function setShareStar(id: string, starred: boolean): Promise<ShareSummary> {
  return apiPut<ShareSummary>(`/shares/${encodeURIComponent(id)}/star`, { starred })
}

export async function setShareFollow(id: string, following: boolean): Promise<ShareSummary> {
  return apiPut<ShareSummary>(`/shares/${encodeURIComponent(id)}/follow`, { following })
}

export function useSharedDocuments(kind: ShareKind) {
  const [items, setItems] = useState<ShareSummary[]>([])
  const [loading, setLoading] = useState(API_MODE)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    if (!API_MODE) return
    setLoading(true)
    try {
      setItems(await listSharedDocuments(kind))
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
