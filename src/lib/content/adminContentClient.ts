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
import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { API_MODE, apiGetIfChanged, apiPost } from '../api'
import { errorKind, type StateErrorKind } from '../apiErrors'
import { CONTENT_LEDGER_STORAGE_KEY, mediaRequestsOf, type ManagedContentItem } from '@/data/contentControl'
import { CONCEPT_STORAGE_KEY } from '@/data/conceptGraph'
import { adaptiveItemsFrom } from '@/data/adaptive/itemProjection'
import type { AdaptivePoolItem } from '@/data/adaptive/item'
import { queryContentIndex, type ContentListParams, type ContentListResponse } from '@/data/contentQuery'
import type { ContentScope } from '@/data/contentScope'
import type { University } from '@/data/universities'
import { isStoredMediaReference } from '@/lib/mediaStorage'

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

/** One article's id and taxonomy placement — never its body. Mirrors the server projection. */
export interface AdminArticleIndexRow {
  id: string
  subtopicId?: string
  microtopicId?: string
  nanotopicId?: string
  primaryNodeId?: string
  moduleIds: string[]
}
export interface AdminArticleIndexResponse { version: string; articles: AdminArticleIndexRow[] }

const listOf = (value: unknown): string[] => (Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string' && Boolean(v.trim())) : [])

export function fetchAdminArticleIndex(force = false): Promise<AdminArticleIndexResponse> {
  if (!API_MODE) {
    const articles = demoLedger()
      .filter((item) => item.kind === 'article')
      .map((item) => {
        const data = item.articleData
        return { id: item.id, subtopicId: data?.subtopicId, microtopicId: data?.microtopicId, nanotopicId: data?.nanotopicId, primaryNodeId: data?.primaryNodeId, moduleIds: listOf(data?.moduleIds) }
      })
    return Promise.resolve({ version: 'demo', articles })
  }
  return load<AdminArticleIndexResponse>('admin:article-index', '/admin/content/article-index', force)
}

/**
 * One concept's slim navigator fields — label, short definition/aliases, full
 * taxonomy placement and curriculum scope — never its heavy prose. Mirrors the
 * server projection (`server/src/adminConcept.js` `conceptIndexRow`).
 */
export interface AdminConceptIndexRow {
  id: string
  label?: string
  definition?: string
  aliases?: string[]
  articleIds?: string[]
  subjectId?: string
  systemId?: string
  topicTagId?: string
  subtopicId?: string
  microtopicId?: string
  nanotopicId?: string
  primaryNodeId?: string
  secondaryNodeIds: string[]
  moduleIds?: string[]
  learnerYears?: number[]
  universityIds?: string[]
}
export interface AdminConceptIndexResponse { version: string; items: AdminConceptIndexRow[] }

/** The demo build's concept graph: whatever `demoPreview` seeded into localStorage. */
function demoConcepts(): Array<Record<string, unknown>> {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = JSON.parse(localStorage.getItem(CONCEPT_STORAGE_KEY) ?? '{}')
    return Array.isArray(raw?.concepts) ? raw.concepts : []
  } catch { return [] }
}

export function fetchAdminConceptIndex(force = false): Promise<AdminConceptIndexResponse> {
  if (!API_MODE) {
    const items: AdminConceptIndexRow[] = demoConcepts()
      .filter((concept) => concept && typeof concept.id === 'string')
      .map((concept) => ({
        id: concept.id as string,
        label: concept.label as string | undefined,
        definition: typeof concept.definition === 'string' ? concept.definition : '',
        aliases: listOf(concept.aliases),
        articleIds: listOf(concept.articleIds),
        subjectId: concept.subjectId as string | undefined,
        systemId: concept.systemId as string | undefined,
        topicTagId: concept.topicTagId as string | undefined,
        subtopicId: concept.subtopicId as string | undefined,
        microtopicId: concept.microtopicId as string | undefined,
        nanotopicId: concept.nanotopicId as string | undefined,
        primaryNodeId: concept.primaryNodeId as string | undefined,
        secondaryNodeIds: listOf(concept.secondaryNodeIds),
        moduleIds: listOf(concept.moduleIds),
        learnerYears: Array.isArray(concept.learnerYears) ? (concept.learnerYears as number[]).filter((year) => Number.isFinite(year)) : [],
        universityIds: listOf(concept.universityIds),
      }))
    return Promise.resolve({ version: 'demo', items })
  }
  return load<AdminConceptIndexResponse>('admin:concept-index', '/admin/concept/index', force)
}

/** The concept index (ids + label + taxonomy placement), fetched once on mount. */
export function useAdminConceptIndex(): { concepts: AdminConceptIndexRow[]; loading: boolean; error: StateErrorKind | null } {
  const [state, setState] = useState<{ concepts: AdminConceptIndexRow[]; loading: boolean; error: StateErrorKind | null }>(
    { concepts: [], loading: true, error: null },
  )
  useEffect(() => {
    let live = true
    fetchAdminConceptIndex()
      .then((response) => { if (live) setState({ concepts: response.items, loading: false, error: null }) })
      .catch((error) => { if (live) setState({ concepts: [], loading: false, error: errorKind(error) }) })
    return () => { live = false }
  }, [])
  return state
}

/**
 * One relationship's slim fields — endpoints, type, verification badge — never
 * its evidence arrays. Mirrors `server/src/adminConcept.js` `relationIndexRow`.
 */
export interface AdminRelationIndexRow {
  id: string
  sourceId: string
  targetId: string
  type: string
  verificationStatus?: string
}
export interface AdminRelationIndexResponse { version: string; items: AdminRelationIndexRow[] }

/** The demo build's relations: whatever `demoPreview` seeded into localStorage. */
function demoRelations(): Array<Record<string, unknown>> {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = JSON.parse(localStorage.getItem(CONCEPT_STORAGE_KEY) ?? '{}')
    return Array.isArray(raw?.relations) ? raw.relations : []
  } catch { return [] }
}

export function fetchAdminRelationIndex(force = false): Promise<AdminRelationIndexResponse> {
  if (!API_MODE) {
    const items: AdminRelationIndexRow[] = demoRelations()
      .filter((relation) => relation && typeof relation.id === 'string')
      .map((relation) => ({
        id: relation.id as string,
        sourceId: relation.sourceId as string,
        targetId: relation.targetId as string,
        type: relation.type as string,
        verificationStatus: relation.verificationStatus as string | undefined,
      }))
    return Promise.resolve({ version: 'demo', items })
  }
  return load<AdminRelationIndexResponse>('admin:relation-index', '/admin/concept/relation-index', force)
}

/** The relation index (slim edges), fetched once on mount. */
export function useAdminRelationIndex(): { relations: AdminRelationIndexRow[]; loading: boolean; error: StateErrorKind | null } {
  const [state, setState] = useState<{ relations: AdminRelationIndexRow[]; loading: boolean; error: StateErrorKind | null }>(
    { relations: [], loading: true, error: null },
  )
  useEffect(() => {
    let live = true
    fetchAdminRelationIndex()
      .then((response) => { if (live) setState({ relations: response.items, loading: false, error: null }) })
      .catch((error) => { if (live) setState({ relations: [], loading: false, error: errorKind(error) }) })
    return () => { live = false }
  }, [])
  return state
}

/** The article index (ids + taxonomy placement), fetched once on mount. */
export function useAdminArticleIndex(): { articles: AdminArticleIndexRow[]; loading: boolean; error: StateErrorKind | null } {
  const [state, setState] = useState<{ articles: AdminArticleIndexRow[]; loading: boolean; error: StateErrorKind | null }>(
    { articles: [], loading: true, error: null },
  )
  useEffect(() => {
    let live = true
    fetchAdminArticleIndex()
      .then((response) => { if (live) setState({ articles: response.articles, loading: false, error: null }) })
      .catch((error) => { if (live) setState({ articles: [], loading: false, error: errorKind(error) }) })
    return () => { live = false }
  }, [])
  return state
}

export interface AdminItemsResponse { version: string; items: ManagedContentItem[] }

/** True when any media request anywhere in the item has been escalated. */
const hasEscalatedRequest = (item: ManagedContentItem): boolean =>
  mediaRequestsOf(item).some((request) => Boolean(request?.escalation))

/**
 * The full items carrying an escalated media request — the Escalations queue's
 * whole working set, fetched once instead of downloading the ledger to find a
 * handful of items. Full items because the queue previews the owner and needs
 * the exact stored item as the delta `before` when it acts.
 */
export function fetchAdminEscalations(force = false): Promise<AdminItemsResponse> {
  if (!API_MODE) {
    return Promise.resolve({ version: 'demo', items: demoLedger().filter(hasEscalatedRequest) })
  }
  return load<AdminItemsResponse>('admin:escalations', '/admin/content/escalations', force)
}

/**
 * Escalation-bearing items as local, optimistically-mutable state. `setItems`
 * lets the queue reflect an acted-on escalation immediately; the durable write
 * goes through `saveLedgerChanges`, and the item it wrote becomes the next
 * conflict base.
 */
export function useAdminEscalations(): {
  items: ManagedContentItem[]
  setItems: Dispatch<SetStateAction<ManagedContentItem[]>>
  loading: boolean
  error: StateErrorKind | null
} {
  const [state, setState] = useState<{ items: ManagedContentItem[]; loading: boolean; error: StateErrorKind | null }>(
    { items: [], loading: true, error: null },
  )
  useEffect(() => {
    let live = true
    fetchAdminEscalations()
      .then((response) => { if (live) setState({ items: response.items, loading: false, error: null }) })
      .catch((error) => { if (live) setState({ items: [], loading: false, error: errorKind(error) }) })
    return () => { live = false }
  }, [])
  const setItems = useCallback<Dispatch<SetStateAction<ManagedContentItem[]>>>(
    (update) => setState((prev) => ({ ...prev, items: typeof update === 'function' ? (update as (p: ManagedContentItem[]) => ManagedContentItem[])(prev.items) : update })),
    [],
  )
  return { items: state.items, setItems, loading: state.loading, error: state.error }
}

/**
 * The full items carrying any media request — the Media Requests queue's working
 * set, fetched once instead of the whole ledger. Full items because the queue
 * previews the owner, writes media placements into it, and needs the exact stored
 * item as each write's `before`.
 */
export function fetchAdminMediaRequestItems(force = false): Promise<AdminItemsResponse> {
  if (!API_MODE) {
    return Promise.resolve({ version: 'demo', items: demoLedger().filter((item) => mediaRequestsOf(item).length > 0) })
  }
  return load<AdminItemsResponse>('admin:media-request-items', '/admin/content/media-request-items', force)
}

/** Media-request-bearing items as local, optimistically-mutable state. */
export function useAdminMediaRequestItems(): {
  items: ManagedContentItem[]
  setItems: Dispatch<SetStateAction<ManagedContentItem[]>>
  loading: boolean
  error: StateErrorKind | null
} {
  const [state, setState] = useState<{ items: ManagedContentItem[]; loading: boolean; error: StateErrorKind | null }>(
    { items: [], loading: true, error: null },
  )
  useEffect(() => {
    let live = true
    fetchAdminMediaRequestItems()
      .then((response) => { if (live) setState({ items: response.items, loading: false, error: null }) })
      .catch((error) => { if (live) setState({ items: [], loading: false, error: errorKind(error) }) })
    return () => { live = false }
  }, [])
  const setItems = useCallback<Dispatch<SetStateAction<ManagedContentItem[]>>>(
    (update) => setState((prev) => ({ ...prev, items: typeof update === 'function' ? (update as (p: ManagedContentItem[]) => ManagedContentItem[])(prev.items) : update })),
    [],
  )
  return { items: state.items, setItems, loading: state.loading, error: state.error }
}

/** id + title of questions whose image lives only in one browser — the stranded banner's rows. */
export interface AdminStrandedRow { id: string; title: string }
export interface AdminStrandedResponse { version: string; items: AdminStrandedRow[] }

const strandedRow = (item: ManagedContentItem): AdminStrandedRow => ({ id: item.id, title: item.title })

/**
 * Questions holding a browser-local (`nishany-media:`) image, fetched once
 * instead of scanning the whole ledger for the banner. Demo mode reuses the
 * client predicate over the local ledger.
 */
export function fetchAdminStrandedMedia(force = false): Promise<AdminStrandedResponse> {
  if (!API_MODE) {
    const items = demoLedger().filter((item) => {
      const data = item.questionData
      if (!data) return false
      return isStoredMediaReference(data.attachedImage ?? '') || (data.attachments ?? []).some((a) => isStoredMediaReference(a.url))
    }).map(strandedRow)
    return Promise.resolve({ version: 'demo', items })
  }
  return load<AdminStrandedResponse>('admin:stranded-media', '/admin/content/stranded-media', force)
}

/** The stranded-image banner's rows (id + title), fetched once on mount. */
export function useAdminStrandedMedia(): { items: AdminStrandedRow[]; loading: boolean; error: StateErrorKind | null } {
  const [state, setState] = useState<{ items: AdminStrandedRow[]; loading: boolean; error: StateErrorKind | null }>(
    { items: [], loading: true, error: null },
  )
  useEffect(() => {
    let live = true
    fetchAdminStrandedMedia()
      .then((response) => { if (live) setState({ items: response.items, loading: false, error: null }) })
      .catch((error) => { if (live) setState({ items: [], loading: false, error: errorKind(error) }) })
    return () => { live = false }
  }, [])
  return state
}

/**
 * Every item, list-projected (heavy bodies dropped) — the Content dashboard's
 * catalogue for lists, counts, facets and editor pickers. Demo mode returns the
 * full local ledger: no server to slice, no perf concern.
 */
export function fetchAdminContentIndex(force = false): Promise<AdminItemsResponse> {
  if (!API_MODE) return Promise.resolve({ version: 'demo', items: demoLedger() })
  return load<AdminItemsResponse>('admin:content-index', '/admin/content/index', force)
}

export interface AdaptivePoolResponse { version: string; items: AdaptivePoolItem[] }

/**
 * The approved question bank projected to the fields Adaptive Setup counts by —
 * concept ids and scope, never the question body — so the console never pulls the
 * 239 MB ledger. Demo mode derives the same slim shape from the local ledger
 * through the client projection, which is what the server projection is proven
 * (`server/src/adaptivePool.test.js`) to match.
 */
export function fetchAdaptivePool(force = false): Promise<AdaptivePoolResponse> {
  if (!API_MODE) {
    const items: AdaptivePoolItem[] = adaptiveItemsFrom(demoLedger()).map((item) => ({
      id: item.id,
      mainConceptIds: item.mainConceptIds,
      secondaryConceptIds: item.secondaryConceptIds,
      conceptIds: item.conceptIds,
      universityIds: item.universityIds,
      years: item.years,
      onlyFor: item.onlyFor,
      moduleIds: item.moduleIds,
    }))
    return Promise.resolve({ version: 'demo', items })
  }
  return load<AdaptivePoolResponse>('admin:adaptive-pool', '/admin/adaptive/pool', force)
}

/** The adaptive pool as loading-aware state — Adaptive Setup's whole read. */
export function useAdaptivePool(): { items: AdaptivePoolItem[]; loading: boolean; error: StateErrorKind | null } {
  const [state, setState] = useState<{ items: AdaptivePoolItem[]; loading: boolean; error: StateErrorKind | null }>(
    { items: [], loading: true, error: null },
  )
  useEffect(() => {
    let live = true
    fetchAdaptivePool()
      .then((response) => { if (live) setState({ items: response.items, loading: false, error: null }) })
      .catch((error) => { if (live) setState({ items: [], loading: false, error: errorKind(error) }) })
    return () => { live = false }
  }, [])
  return state
}

/**
 * The FULL items for a set of ids — the editor's open source and the per-item
 * `before` a bulk or rename write needs. Deduped; missing ids are dropped.
 */
export async function fetchAdminItems(ids: string[]): Promise<ManagedContentItem[]> {
  const unique = [...new Set(ids)].filter(Boolean)
  if (!unique.length) return []
  if (!API_MODE) {
    const byId = new Map(demoLedger().map((item) => [item.id, item]))
    return unique.map((id) => byId.get(id)).filter((item): item is ManagedContentItem => Boolean(item))
  }
  const response = await apiPost<{ version: string; items: ManagedContentItem[] }>('/admin/content/items', { ids: unique })
  return response.items ?? []
}

/**
 * The list-projected catalogue as local, optimistically-mutable state — the
 * Content dashboard's read. Writes go through `saveLedgerChanges` (with a full
 * `before` fetched per item); `setItems` reflects them in the list at once.
 */
export function useAdminContentIndex(): {
  items: ManagedContentItem[]
  setItems: Dispatch<SetStateAction<ManagedContentItem[]>>
  loading: boolean
  error: StateErrorKind | null
} {
  const [state, setState] = useState<{ items: ManagedContentItem[]; loading: boolean; error: StateErrorKind | null }>(
    { items: [], loading: true, error: null },
  )
  useEffect(() => {
    let live = true
    fetchAdminContentIndex()
      .then((response) => { if (live) setState({ items: response.items, loading: false, error: null }) })
      .catch((error) => { if (live) setState({ items: [], loading: false, error: errorKind(error) }) })
    return () => { live = false }
  }, [])
  const setItems = useCallback<Dispatch<SetStateAction<ManagedContentItem[]>>>(
    (update) => setState((prev) => ({ ...prev, items: typeof update === 'function' ? (update as (p: ManagedContentItem[]) => ManagedContentItem[])(prev.items) : update })),
    [],
  )
  return { items: state.items, setItems, loading: state.loading, error: state.error }
}

/**
 * One page of the Content dashboard — filtered/searched/faceted/paged server-side
 * (`POST /admin/content/list`) so the browser never downloads the whole ledger.
 * Demo mode runs the identical pipeline (`queryContentIndex`) over the local
 * ledger, so the dashboard consumes one response shape either way. The catalogue
 * and scope are only read on the demo path; the server loads its own and derives
 * scope from the authenticated identity.
 */
export function fetchContentList(
  params: ContentListParams,
  catalogue: University[],
  contentScope: ContentScope | null,
): Promise<ContentListResponse> {
  if (!API_MODE) return Promise.resolve(queryContentIndex(demoLedger(), params, catalogue, contentScope))
  return apiPost<ContentListResponse>('/admin/content/list', params)
}

/**
 * Which of these ids are still referenced by any content item or concept — the
 * taxonomy delete-guard, answered by the server (`POST /admin/content/references`)
 * so the tab never downloads the 239 MB ledger + 72 MB concept graph just to
 * substring-check. Demo mode runs the identical `"id"` check over the seeded
 * localStorage ledger + concept graph.
 */
export function fetchContentReferences(ids: string[]): Promise<{ referenced: string[] }> {
  if (!API_MODE) {
    let concepts: unknown[] = []
    try {
      const graph = JSON.parse(localStorage.getItem(CONCEPT_STORAGE_KEY) ?? '{"concepts":[]}')
      concepts = Array.isArray(graph?.concepts) ? graph.concepts : []
    } catch { concepts = [] }
    const haystack = `${JSON.stringify(demoLedger())} ${JSON.stringify(concepts)}`
    return Promise.resolve({ referenced: ids.filter((id) => haystack.includes(`"${id}"`)) })
  }
  return apiPost<{ referenced: string[] }>('/admin/content/references', { ids })
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
