import { useCallback, useEffect, useState } from 'react'
import { API_MODE, apiDelete, apiGet, apiPost, apiSend, apiUploadChunk } from './api'
import { removeStoredMedia, storeMediaFile } from './mediaStorage'
import { usePersistentState } from './usePersistentState'
import { useIdentity } from './useIdentity'
import {
  DEFAULT_STORAGE_LIMITS, STORAGE_LIMITS_STORAGE_KEY, limitFor, type StorageLimits,
} from '@/data/storageLimits'

/**
 * The documents a student brought themselves.
 *
 * Shaped like `useLiveResources`: one hook, two backings. Connected to a
 * server, the bytes go there and come back on any device the student signs in
 * on — which matters because their annotations already do. Leaving the file in
 * IndexedDB while the notes about it sync produces the worst possible state:
 * the same document on a phone is an empty reader with the student's own marks
 * stranded behind it. In demo mode there is no server to hold anything, so the
 * bytes stay local and the page says so rather than implying they travelled.
 *
 * The upload is chunked because a lecture handout can be tens of megabytes and
 * a delivery network will not take that in one request. The server generates
 * the storage path; this only ever says what the file is called.
 */

export interface MyDocument {
  id: string
  title: string
  mediaType: string
  sizeBytes: number
  pageCount: number | null
  createdAt: string
  /** Demo mode only: the IndexedDB reference standing in for a server file. */
  ref?: string
}

export interface MyDocumentsState {
  items: MyDocument[]
  usedBytes: number
  quotaBytes: number
  /** False when the file never leaves this browser — the page has to say so. */
  synced: boolean
  loading: boolean
  error: string | null
  upload: (file: File, onProgress?: (fraction: number) => void) => Promise<string>
  rename: (id: string, title: string) => Promise<void>
  remove: (id: string) => Promise<void>
}

/** What a single request carries, well under the server's chunk ceiling. */
const CHUNK_BYTES = 8 * 1024 * 1024
const DEMO_KEY = 'synapse.myDocuments.v1'

const NO_DOCUMENTS: MyDocument[] = []

export function useMyDocuments(): MyDocumentsState {
  // Both backings are wired up on every render — `API_MODE` is fixed for the
  // life of the build, and branching on it around a hook call would not be.
  const [local, setLocal] = usePersistentState<MyDocument[]>(DEMO_KEY, NO_DOCUMENTS)
  // Demo mode has no server to resolve a limit, so it reads the same settings
  // document an administrator edits. Without this the limit they set would
  // appear to do nothing on the only build they can try it on.
  const [limits] = usePersistentState<StorageLimits>(STORAGE_LIMITS_STORAGE_KEY, DEFAULT_STORAGE_LIMITS)
  const { entitlement } = useIdentity()
  const [remote, setRemote] = useState<MyDocument[]>(NO_DOCUMENTS)
  const [usage, setUsage] = useState({ usedBytes: 0, quotaBytes: 0 })
  const [loading, setLoading] = useState(API_MODE)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!API_MODE) return
    try {
      const data = await apiGet<{ items: MyDocument[]; usedBytes: number; quotaBytes: number }>('/my-documents')
      setRemote(data.items)
      setUsage({ usedBytes: data.usedBytes, quotaBytes: data.quotaBytes })
      setError(null)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Your documents could not be listed.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void refresh() }, [refresh])

  const upload = useCallback(async (file: File, onProgress?: (fraction: number) => void) => {
    if (!API_MODE) {
      const id = `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
      const ref = await storeMediaFile(id, file)
      onProgress?.(1)
      setLocal((current) => [newRecord(id, file, ref), ...current])
      return id
    }
    const created = await apiPost<{ id: string; uploadId: string }>('/my-documents', { title: fileTitle(file) })
    const total = Math.max(1, Math.ceil(file.size / CHUNK_BYTES))
    for (let index = 0; index < total; index++) {
      await apiUploadChunk(
        `/my-documents/${created.id}/chunks/${created.uploadId}/${index}`,
        file.slice(index * CHUNK_BYTES, (index + 1) * CHUNK_BYTES),
      )
      onProgress?.((index + 1) / total)
    }
    await apiPost(`/my-documents/${created.id}/chunks/${created.uploadId}/complete`, {
      totalChunks: total,
      sizeBytes: file.size,
    })
    await refresh()
    return created.id
  }, [refresh, setLocal])

  const rename = useCallback(async (id: string, title: string) => {
    if (!API_MODE) {
      setLocal((current) => current.map((item) => (item.id === id ? { ...item, title } : item)))
      return
    }
    await apiSend(`/my-documents/${id}`, 'PATCH', { title })
    await refresh()
  }, [refresh, setLocal])

  const remove = useCallback(async (id: string) => {
    if (!API_MODE) {
      const going = local.find((item) => item.id === id)
      if (going?.ref) await removeStoredMedia(going.ref)
      setLocal((current) => current.filter((item) => item.id !== id))
      return
    }
    await apiDelete(`/my-documents/${id}`)
    await refresh()
  }, [local, refresh, setLocal])

  const items = API_MODE ? remote : local
  return {
    items,
    usedBytes: API_MODE ? usage.usedBytes : items.reduce((sum, item) => sum + item.sizeBytes, 0),
    quotaBytes: API_MODE ? usage.quotaBytes : limitFor(limits, entitlement.plan),
    synced: API_MODE,
    loading,
    error,
    upload,
    rename,
    remove,
  }
}

function newRecord(id: string, file: File, ref: string): MyDocument {
  return {
    id,
    title: fileTitle(file),
    mediaType: 'pdf',
    sizeBytes: file.size,
    pageCount: null,
    createdAt: new Date().toISOString(),
    ref,
  }
}

function fileTitle(file: File): string {
  return file.name.replace(/\.pdf$/i, '').trim() || 'Untitled document'
}
