/**
 * The Content dashboard list query — the request/response contract, plus a
 * client implementation for the demo build.
 *
 * `ControlDashboard.tsx` used to hold the whole ~77–251 MB list-projected ledger
 * in the browser and filter/search/facet/count it. In the live build that work
 * now runs on the server (`server/src/adminContentList.js`) and the browser fetches
 * one page at a time. This module is the browser twin: the same pipeline over an
 * in-memory item array, used by the demo build (no server) and by the parity
 * story. `runContentQuery` in the server module is a transliteration of this, and
 * `adminContentList.test.ts` proves them equal.
 */
import {
  itemInScope, isUniversitySourced, matchesMediaRequestFilter,
  type ManagedContentItem, type MediaRequestFilter,
} from './contentControl.ts'
import { availableContentTags } from './contentTags.ts'
import { itemFacetTokens, availableFacets, itemMatchesFacets, facetKey, type Facet, type FacetGroups } from './contentFacets.ts'
import { contentModuleLabels } from './contentModules.ts'
import { publishReadiness } from './publishReadiness.ts'
import { itemWritableBy, type ContentScope, type ScopedKind } from './contentScope.ts'
import type { University } from './universities.ts'

export interface ContentListParams {
  kind?: string
  universityId?: string
  year?: string
  status?: string
  mediaFilter?: string
  facets?: string[]
  query?: string
  sourceTab?: string
  archiveSplit?: boolean
  archiveView?: boolean
  page?: number
  pageSize?: number
  includeMatchingIds?: boolean
}

/** One matching item across all pages — enough to drive cross-page bulk actions and topic rename. */
export interface MatchingEntry {
  id: string
  status: string
  kind: string
  title: string
  subjectId: string
  topic: string
  ready: boolean
  hardBlocked: boolean
  reason: string
}

export interface ContentCounts { total: number; published: number; review: number; drafts: number }
export interface KindCounts { question: number; article: number; practical: number; resource: number; deck: number; essay: number; histology: number }
export interface ArchiveStats { previouslyPublished: number; noModule: number; operations: number }

export interface ContentListResponse {
  version?: string
  page: ManagedContentItem[]
  total: number
  pageCount: number
  counts: ContentCounts
  kindCounts: KindCounts
  facetGroups: FacetGroups
  facetFlags: Facet[]
  facetLabels: Record<string, string>
  sourceCounts: { all: number; university: number; internal: number }
  resourceCounts: { Files: number; Videos: number }
  existingContentTags: string[]
  reviewQueue: ManagedContentItem[]
  kindArchivedCount: number
  kindCurrentCount: number
  archiveStats: ArchiveStats
  scopeHidden: number
  matching?: MatchingEntry[]
  matchingIds?: string[]
}

const QUESTION_KINDS = new Set(['question', 'resource', 'practical', 'deck', 'essay', 'histology'])
const updatedDesc = (a: ManagedContentItem, b: ManagedContentItem) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()

/** The topic/chapter label an item groups under — twin of `currentTopicLabel`. */
function topicLabelOf(item: ManagedContentItem): string {
  if (item.kind === 'resource') return item.fields.Chapter?.trim() || item.resourceData?.chapters?.[0] || 'General'
  return item.fields.Topic?.trim() || 'Other'
}

/**
 * Run the whole list pipeline over an in-memory item array. Pure; the demo build
 * feeds it the local ledger, and it returns exactly the shape the server sends.
 */
export function queryContentIndex(
  allItems: ManagedContentItem[],
  params: ContentListParams,
  catalogue: University[],
  contentScope: ContentScope | null = null,
): ContentListResponse {
  const activeKind = params.kind ?? 'question'
  const universityId = params.universityId || undefined
  const year = params.year || undefined
  const status = params.status ?? 'All'
  const mediaFilter = (params.mediaFilter ?? 'all') as MediaRequestFilter
  const selectedFacets = new Set(params.facets ?? [])
  const query = (params.query ?? '').trim().toLowerCase()
  const sourceTab = params.sourceTab ?? 'all'
  const archiveSplit = params.archiveSplit === true
  const archiveView = params.archiveView === true
  const page = Number.isFinite(params.page) && (params.page as number) > 0 ? Math.floor(params.page as number) : 1
  const pageSize = Number.isFinite(params.pageSize) && (params.pageSize as number) > 0 ? Math.floor(params.pageSize as number) : 50
  const isArchiveView = archiveSplit && archiveView

  const items = contentScope
    ? allItems.filter((item) => itemWritableBy(contentScope, item.kind as ScopedKind, item))
    : allItems

  const byKind = archiveSplit ? items.filter((item) => item.kind === activeKind) : items
  const scopedItems = !archiveSplit
    ? byKind
    : byKind.filter((item) => (isArchiveView ? item.status === 'Archived' : item.status !== 'Archived'))
  const summaryItems = scopedItems.filter((item) => {
    if (isArchiveView || (!universityId && !year)) return true
    if (!QUESTION_KINDS.has(activeKind)) return true
    return itemInScope(item, universityId, year)
  })
  const counts: ContentCounts = {
    total: summaryItems.length,
    published: summaryItems.filter((item) => item.status === 'Published').length,
    review: summaryItems.filter((item) => item.status === 'In review').length,
    drafts: summaryItems.filter((item) => item.status === 'Draft').length,
  }

  const kindCounts: KindCounts = { question: 0, article: 0, practical: 0, resource: 0, deck: 0, essay: 0, histology: 0 }
  for (const item of items) if (item.kind in kindCounts) kindCounts[item.kind as keyof KindCounts] += 1

  const existingContentTags = availableContentTags(items)

  const kindItems = items.filter((item) => item.kind === activeKind)
  const facetIndex = new Map(kindItems.map((item) => [item.id, itemFacetTokens(item, catalogue)] as const))
  const facetGroups = availableFacets(kindItems, catalogue)
  const facetFlags: Facet[] = kindItems.some((item) => facetIndex.get(item.id)?.has('flag:no-module'))
    ? [{ type: 'flag', value: 'no-module', label: 'Needs module' }]
    : []
  const facetLabels: Record<string, string> = {}
  for (const facet of [...facetGroups.modules, ...facetGroups.subjects, ...facetGroups.tags, ...facetFlags]) {
    facetLabels[facetKey(facet)] = facet.label
  }
  const kindArchivedCount = kindItems.filter((item) => item.status === 'Archived').length
  const kindCurrentCount = kindItems.length - kindArchivedCount

  const matching = items
    .filter((item) => item.kind === activeKind)
    .filter((item) => !archiveSplit || (isArchiveView ? item.status === 'Archived' : item.status !== 'Archived'))
    .filter((item) => status === 'All' || item.status === status)
    .filter((item) => matchesMediaRequestFilter(item, mediaFilter))
    .filter((item) => itemMatchesFacets(facetIndex.get(item.id) ?? new Set(), selectedFacets))
    .filter((item) => {
      if ((!universityId && !year) || isArchiveView || !QUESTION_KINDS.has(activeKind)) return true
      return itemInScope(item, universityId, year)
    })
    .filter((item) => !query
      || `${item.title} ${item.owner} ${Object.values(item.fields).join(' ')} ${[...(facetIndex.get(item.id) ?? [])].join(' ')}`.toLowerCase().includes(query))
    .sort(updatedDesc)

  const sourceCounts = {
    all: matching.length,
    university: matching.filter(isUniversitySourced).length,
    internal: matching.filter((item) => !isUniversitySourced(item)).length,
  }
  const showsSourceTabs = activeKind === 'question' || activeKind === 'practical'
  const rows = (!showsSourceTabs || sourceTab === 'all')
    ? matching
    : matching.filter((item) => (sourceTab === 'university' ? isUniversitySourced(item) : !isUniversitySourced(item)))
  const resourceCounts = {
    Files: rows.filter((item) => item.fields.Type !== 'Video').length,
    Videos: rows.filter((item) => item.fields.Type === 'Video').length,
  }

  const total = rows.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageItems = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const reviewQueue = summaryItems.filter((item) => item.status === 'In review').sort(updatedDesc).slice(0, 7)

  const archiveStats = isArchiveView
    ? {
        previouslyPublished: summaryItems.filter((item) => item.archive?.originalStatus === 'Published').length,
        noModule: summaryItems.filter((item) => contentModuleLabels(item, catalogue).length === 0).length,
        operations: new Set(summaryItems.map((item) => item.archive?.operationId).filter(Boolean)).size,
      }
    : { previouslyPublished: 0, noModule: 0, operations: 0 }

  const response: ContentListResponse = {
    page: pageItems,
    total,
    pageCount,
    counts,
    kindCounts,
    facetGroups,
    facetFlags,
    facetLabels,
    sourceCounts,
    resourceCounts,
    existingContentTags,
    reviewQueue,
    kindArchivedCount,
    kindCurrentCount,
    archiveStats,
    scopeHidden: contentScope ? allItems.length - items.length : 0,
  }
  if (params.includeMatchingIds) {
    response.matching = matching.map((item) => {
      const verdict = publishReadiness(item)
      return {
        id: item.id, status: item.status, kind: item.kind, title: item.title,
        subjectId: item.subjectId ?? '', topic: topicLabelOf(item),
        ready: verdict.ready, hardBlocked: verdict.hardBlocked === true, reason: verdict.reason ?? '',
      }
    })
    response.matchingIds = response.matching.map((m) => m.id)
  }
  return response
}
