/**
 * The student's read path into the content catalogue.
 *
 * Every student surface used to reach the catalogue through
 * `usePersistentState(CONTENT_LEDGER_STORAGE_KEY)`, which downloads and parses
 * the whole admin ledger — ~60 MB in production — so that a student could read
 * one article. `server/src/studentContent.js` slices that document; this is the
 * browser half of it.
 *
 * Three rules hold the whole thing together:
 *
 *   1. One request per cache key per session. A remount reads the map, not the
 *      network, and concurrent mounts of the same key share one promise.
 *   2. A forced reload revalidates with `If-None-Match`, so the common case —
 *      nothing published since — costs a 304 and no body.
 *   3. Demo mode (no `VITE_API_BASE`) has no server at all, so the same
 *      functions slice the ledger `demoPreview` writes into localStorage.
 *      Everything above this file is then identical in both modes.
 */
import { API_MODE, apiGetIfChanged } from '../api'
import { CONTENT_LEDGER_STORAGE_KEY, type ManagedContentItem } from '@/data/contentControl'
import type { QuestionFormat } from '@/data/questionFormat'
import { manifestKey, questionLinksFrom, questionsKey, type QuestionLink, type QuestionScope } from './contentKeys'

export { manifestKey, questionLinksFrom, questionsKey }
export type { QuestionLink, QuestionScope }

/** Kinds `/api/content/items` serves whole. Articles and questions have their own shapes. */
export type ContentSliceKind = 'resource' | 'practical' | 'essay' | 'histology' | 'deck'

export interface ContentCounts {
  byKind: Record<string, number>
  byModule: Record<string, Record<string, number>>
  bySubject: Record<string, Record<string, number>>
}

export interface SummaryResponse { version: string; counts: ContentCounts }
export interface ItemsResponse { version: string; items: ManagedContentItem[] }
export interface ArticleIndexResponse extends ItemsResponse { questionLinks: Record<string, QuestionLink[]> }
export interface ItemResponse { version: string; item: ManagedContentItem | null }

interface CacheEntry { etag: string | null; data: unknown }

const cache = new Map<string, CacheEntry>()
const inflight = new Map<string, Promise<unknown>>()
const listeners = new Set<() => void>()

/**
 * Drop everything and let the next read revalidate.
 *
 * The ETags survive deliberately: after an invalidation the next request still
 * carries `If-None-Match`, so "nothing actually changed" costs a 304.
 */
export function invalidateContent(): void {
  for (const [key, entry] of cache) cache.set(key, { etag: entry.etag, data: undefined })
  notify()
}

/** What is already in hand for this key, or undefined when nothing is. */
export function peekContent<T>(key: string): T | undefined {
  const entry = cache.get(key)
  return entry?.data as T | undefined
}

/** True while any content request is outstanding — see `useContentBusy`. */
export function contentBusy(): boolean {
  return inflight.size > 0
}

export function subscribeContent(listener: () => void): () => void {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

function notify(): void {
  for (const listener of [...listeners]) listener()
}

/** The demo build's catalogue: whatever `demoPreview` seeded into localStorage. */
function demoLedger(): ManagedContentItem[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = JSON.parse(localStorage.getItem(CONTENT_LEDGER_STORAGE_KEY) ?? '[]')
    return Array.isArray(raw) ? (raw as ManagedContentItem[]) : []
  } catch { return [] }
}

async function load<T>(key: string, path: string, force: boolean): Promise<T> {
  const held = cache.get(key)
  if (!force && held?.data !== undefined) return held.data as T
  const pending = inflight.get(key)
  if (pending) return pending as Promise<T>

  const run = apiGetIfChanged<T>(path, held?.etag ?? null)
    .then((fresh) => {
      // A 304 with nothing held cannot happen — the header is only sent when
      // something is — but falling back to a fresh unconditional read is the
      // honest answer if it ever does.
      if (!fresh) {
        if (held?.data !== undefined) return held.data as T
        cache.delete(key)
        return load<T>(key, path, true)
      }
      cache.set(key, { etag: fresh.etag ?? held?.etag ?? null, data: fresh.data })
      return fresh.data
    })
    .finally(() => {
      inflight.delete(key)
      notify()
    })
  inflight.set(key, run)
  notify()
  return run as Promise<T>
}

/** Cache under `key` without a request — the demo path, and the questions fan-out. */
function remember<T>(key: string, data: T): T {
  cache.set(key, { etag: null, data })
  return data
}

export const SUMMARY_KEY = 'content:summary'
export const sliceKey = (kind: ContentSliceKind) => `content:items:${kind}`
export const ARTICLE_INDEX_KEY = 'content:articles'
export const itemKey = (id: string) => `content:item:${id}`

function questionsPath(scope: QuestionScope): string {
  const query = new URLSearchParams()
  if (scope.subject) query.set('subject', scope.subject)
  if (scope.module) query.set('module', scope.module)
  if (scope.topic) query.set('topic', scope.topic)
  if (scope.format) query.set('format', scope.format)
  if (scope.view) query.set('view', scope.view)
  const search = query.toString()
  return `/content/questions${search ? `?${search}` : ''}`
}

export function fetchSummary(force = false): Promise<SummaryResponse> {
  if (!API_MODE) {
    const counts: ContentCounts = { byKind: {}, byModule: {}, bySubject: {} }
    for (const item of demoLedger()) counts.byKind[item.kind] = (counts.byKind[item.kind] ?? 0) + 1
    return Promise.resolve(remember(SUMMARY_KEY, { version: 'demo', counts }))
  }
  return load<SummaryResponse>(SUMMARY_KEY, '/content/summary', force)
}

export function fetchSlice(kind: ContentSliceKind, force = false): Promise<ItemsResponse> {
  const key = sliceKey(kind)
  if (!API_MODE) {
    return Promise.resolve(remember(key, { version: 'demo', items: demoLedger().filter((item) => item.kind === kind) }))
  }
  return load<ItemsResponse>(key, `/content/items?kind=${kind}`, force)
}

/**
 * Every article a student may open, without a single article body.
 *
 * Bodies are ~45% of the ledger by bytes and a list needs none of them; the
 * reader fetches the one it is showing through `fetchItem`. Demo mode has no
 * such split — its ledger is small and already local — so it hands back whole
 * articles, which the same projections read unchanged.
 */
/**
 * An index row, made to read as the `ManagedContentItem` every projection here
 * expects.
 *
 * The wire shape is flat — `moduleIds` and friends sit at the top level and
 * there is no `kind` — because it is not an article, it is a row about one.
 * `itemScope`, `articleToSubtopic` and `buildCurriculumMembership` all look
 * inside `articleData`, so the row is folded back into that shape once, here,
 * rather than each of them learning a second layout.
 */
interface ArticleIndexRow extends ManagedContentItem {
  moduleIds?: string[]
  universityIds?: string[]
  yearIds?: string[]
  summary?: string
  primaryNodeId?: string
  secondaryNodeIds?: string[]
}

function indexRowToItem(row: ArticleIndexRow): ManagedContentItem {
  if (row.articleData) return row
  const { moduleIds, universityIds, yearIds, summary, primaryNodeId, secondaryNodeIds, ...rest } = row
  return {
    ...rest,
    kind: 'article',
    articleData: { moduleIds, universityIds, yearIds, summary, primaryNodeId, secondaryNodeIds },
  } as ManagedContentItem
}

export function fetchArticleIndex(force = false): Promise<ArticleIndexResponse> {
  if (!API_MODE) {
    const ledger = demoLedger()
    return Promise.resolve(remember(ARTICLE_INDEX_KEY, {
      version: 'demo',
      items: ledger.filter((item) => item.kind === 'article'),
      questionLinks: questionLinksFrom(ledger),
    }))
  }
  return load<ArticleIndexResponse>(ARTICLE_INDEX_KEY, '/content/items?kind=article&view=index', force)
    .then((response) => (response.items[0]?.kind === 'article' ? response : remember(ARTICLE_INDEX_KEY, {
      ...response,
      items: (response.items as ArticleIndexRow[]).map(indexRowToItem),
    })))
}

export async function fetchQuestions(scope: QuestionScope = {}, force = false): Promise<ItemsResponse> {
  const key = questionsKey(scope)
  if (!API_MODE) {
    // The whole ledger, not just its questions: the student projection resolves
    // `libraryIds`/`resourceIds` to titles against what it is given, which is
    // what the server's title stubs stand in for in live mode.
    return remember(key, { version: 'demo', items: demoLedger() })
  }
  const formats = scope.formats
  if (formats?.length) {
    const held = cache.get(key)
    if (!force && held?.data !== undefined) return held.data as ItemsResponse
    const parts = await Promise.all(formats.map((format) => fetchQuestions({ ...scope, formats: undefined, format }, force)))
    return remember(key, { version: parts[0]?.version ?? '', items: parts.flatMap((part) => part.items) })
  }
  return load<ItemsResponse>(key, questionsPath(scope), force)
}

/** What a manifest says about one id: that it is still published, and what it is. */
export interface ManifestRow { id: string; kind: string; format?: QuestionFormat }

/** How many ids one request may name — `MAX_MANIFEST_IDS` on the server. */
const MANIFEST_CHUNK = 200

/**
 * "Which of these ids still resolve, and what are they?"
 *
 * The exam programme holds ids an administrator picked and needs two fields per
 * id — published, and whether it is a written question. Shipping an id→kind
 * manifest of the whole catalogue with `/summary` would be ~700 KB on every
 * dashboard load; asking about the fifty ids one exam names is a few hundred
 * bytes. Ids absent from the answer are the ones that no longer resolve.
 */
export async function fetchItemManifest(ids: readonly string[], force = false): Promise<ManifestRow[]> {
  const wanted = [...new Set(ids)].filter(Boolean).sort()
  const key = manifestKey(wanted)
  if (!wanted.length) return remember(key, [])
  if (!API_MODE) {
    const byId = new Map(demoLedger().map((item) => [item.id, item]))
    return remember(key, wanted.flatMap((id) => {
      const item = byId.get(id)
      if (!item || item.status !== 'Published') return []
      return [{ id, kind: item.kind, ...(item.questionData?.format ? { format: item.questionData.format } : {}) }]
    }))
  }
  const held = cache.get(key)
  if (!force && held?.data !== undefined) return held.data as ManifestRow[]
  // Chunked rather than truncated: the server refuses more than it caps at, so
  // a long exam must be asked about in several requests, not quietly clipped.
  const chunks: string[][] = []
  for (let at = 0; at < wanted.length; at += MANIFEST_CHUNK) chunks.push(wanted.slice(at, at + MANIFEST_CHUNK))
  // `:page` keeps a chunk's `{version, items}` response apart from the flattened
  // rows cached under `key`, which a one-chunk request would otherwise collide with.
  const parts = await Promise.all(chunks.map((chunk) => load<{ items: ManifestRow[] }>(
    `${manifestKey(chunk)}:page`, `/content/items?ids=${chunk.map(encodeURIComponent).join(',')}`, force,
  )))
  return remember(key, parts.flatMap((part) => part.items))
}

/** One item in full — an article's body, a practical's authoring data. */
export function fetchItem(id: string, force = false): Promise<ItemResponse> {
  const key = itemKey(id)
  if (!API_MODE) {
    return Promise.resolve(remember(key, { version: 'demo', item: demoLedger().find((item) => item.id === id) ?? null }))
  }
  return load<ItemResponse>(key, `/content/item/${encodeURIComponent(id)}`, force)
}

/** Test seam: forget both the data and the ETags. */
export function resetContentCache(): void {
  cache.clear()
  inflight.clear()
}
