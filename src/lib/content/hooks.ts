/**
 * React bindings for `contentClient`.
 *
 * Each hook returns `[data, status]`, and `status` is the same
 * `PersistentStateStatus` shape `usePersistentState` hands out — so
 * `catalogueAvailability` and every caller that reads `{ hydrated, error }`
 * keeps working without knowing the catalogue moved off the ledger.
 *
 * Sharing happens in the client, not here: two components asking for the same
 * key share one in-flight promise and, afterwards, one cached response.
 */
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { errorKind, type StateErrorKind } from '../api'
import type { PersistentStateStatus } from '../stateStore'
import type { ManagedContentItem } from '@/data/contentControl'
import {
  ARTICLE_INDEX_KEY,
  SUMMARY_KEY,
  contentBusy,
  fetchArticleIndex,
  fetchItem,
  fetchItemManifest,
  fetchQuestions,
  fetchSlice,
  fetchSummary,
  itemKey,
  manifestKey,
  peekContent,
  questionsKey,
  sliceKey,
  subscribeContent,
  type ArticleIndexResponse,
  type ContentCounts,
  type ContentSliceKind,
  type ItemsResponse,
  type ManifestRow,
  type QuestionScope,
  type SummaryResponse,
} from './contentClient'

const READY: PersistentStateStatus = { hydrated: true, error: null, pending: false, conflict: null }
const LOADING: PersistentStateStatus = { hydrated: false, error: null, pending: false, conflict: null }
const failed = (error: StateErrorKind): PersistentStateStatus => ({ hydrated: false, error, pending: false, conflict: null })

const EMPTY_ITEMS: ManagedContentItem[] = []
const EMPTY_COUNTS: ContentCounts = { byKind: {}, byModule: {}, bySubject: {} }

interface Held<T> { data: T | undefined; status: PersistentStateStatus }

/**
 * One cached document, fetched once and revalidated when the network returns.
 *
 * `key` alone drives the effect: `fetcher` is an inline closure at every call
 * site and would restart the fetch on every render if it were a dependency.
 */
function useContentResource<T>(key: string | null, fetcher: (force: boolean) => Promise<T>): Held<T> {
  const fetchRef = useRef(fetcher)
  fetchRef.current = fetcher
  /** Whether what we are holding is good — an `online` event only retries what failed. */
  const heldOk = useRef(true)
  const [held, setHeld] = useState<Held<T>>(() => (
    key === null ? { data: undefined, status: READY } : { data: peekContent<T>(key), status: peekContent<T>(key) === undefined ? LOADING : READY }
  ))

  useEffect(() => {
    if (key === null) {
      setHeld({ data: undefined, status: READY })
      return
    }
    let live = true
    const run = (force: boolean) => {
      const cached = peekContent<T>(key)
      if (!force && cached !== undefined) {
        setHeld({ data: cached, status: READY })
        return
      }
      // Nothing cached under this key, so nothing to show: what is held came
      // from the *previous* key and is a different document. A revalidation
      // (`force`) is the exception — same key, so what is held is still right
      // until the fresh copy lands.
      setHeld((current) => ({ data: force ? current.data : undefined, status: LOADING }))
      fetchRef.current(force).then(
        (data) => { if (live) setHeld({ data, status: READY }) },
        (error) => { if (live) setHeld((current) => ({ data: current.data, status: failed(errorKind(error)) })) },
      )
    }
    run(false)
    // Coming back online is the one moment a failed read is worth repeating
    // unprompted; a successful one is left alone, since publishing is rare and
    // the next mount revalidates anyway.
    const onOnline = () => { if (!heldOk.current) run(true) }
    window.addEventListener('online', onOnline)
    return () => {
      live = false
      window.removeEventListener('online', onOnline)
    }
  }, [key])

  heldOk.current = held.status.error === null && held.status.hydrated
  return held
}

/** True while any content request is outstanding, so a surface can say "loading" rather than "empty". */
export function useContentBusy(): boolean {
  return useSyncExternalStore(subscribeContent, contentBusy, () => false)
}

export function useContentSummary(): readonly [ContentCounts, PersistentStateStatus] {
  const held = useContentResource<SummaryResponse>(SUMMARY_KEY, useCallback((force) => fetchSummary(force), []))
  return [held.data?.counts ?? EMPTY_COUNTS, held.status] as const
}

export function useContentSlice(
  kind: ContentSliceKind,
  { enabled = true }: { enabled?: boolean } = {},
): readonly [ManagedContentItem[], PersistentStateStatus] {
  const held = useContentResource<ItemsResponse>(
    enabled ? sliceKey(kind) : null,
    useCallback((force) => fetchSlice(kind, force), [kind]),
  )
  return [held.data?.items ?? EMPTY_ITEMS, held.status] as const
}

const EMPTY_INDEX: ArticleIndexResponse = { version: '', items: [], questionLinks: {} }

export function useArticleIndex(
  { enabled = true }: { enabled?: boolean } = {},
): readonly [ArticleIndexResponse, PersistentStateStatus] {
  const held = useContentResource<ArticleIndexResponse>(
    enabled ? ARTICLE_INDEX_KEY : null,
    useCallback((force) => fetchArticleIndex(force), []),
  )
  return [held.data ?? EMPTY_INDEX, held.status] as const
}

export function useScopedQuestions(
  scope: QuestionScope = {},
  { enabled = true }: { enabled?: boolean } = {},
): readonly [ManagedContentItem[], PersistentStateStatus] {
  const key = questionsKey(scope)
  // The scope is nearly always an inline literal; the key is its identity.
  const stable = useMemo(() => scope, [key]) // eslint-disable-line react-hooks/exhaustive-deps
  const held = useContentResource<ItemsResponse>(
    enabled ? key : null,
    useCallback((force) => fetchQuestions(stable, force), [stable]),
  )
  return [held.data?.items ?? EMPTY_ITEMS, held.status] as const
}

const EMPTY_MANIFEST = new Map<string, ManifestRow>()

/**
 * What is still published among a known list of ids, keyed by id.
 *
 * For the surfaces that hold ids chosen elsewhere — an exam's content list —
 * and need only to know which still resolve and what kind they are. Asking
 * about fifty ids costs a few hundred bytes; the alternative was the whole
 * ledger, which is how the dashboard came to download 60 MB.
 */
export function useContentManifest(
  ids: readonly string[],
): readonly [ReadonlyMap<string, ManifestRow>, PersistentStateStatus] {
  const key = manifestKey(ids)
  const stable = useMemo(() => ids, [key]) // eslint-disable-line react-hooks/exhaustive-deps
  const held = useContentResource<ManifestRow[]>(key, useCallback((force) => fetchItemManifest(stable, force), [stable]))
  const rows = held.data
  return [
    useMemo(() => (rows ? new Map(rows.map((row) => [row.id, row])) : EMPTY_MANIFEST), [rows]),
    held.status,
  ] as const
}

export function useContentItem(id: string | null): readonly [ManagedContentItem | null, PersistentStateStatus] {
  const held = useContentResource(
    id ? itemKey(id) : null,
    useCallback((force: boolean) => (id ? fetchItem(id, force) : Promise.resolve({ version: '', item: null })), [id]),
  )
  return [held.data?.item ?? null, held.status] as const
}
