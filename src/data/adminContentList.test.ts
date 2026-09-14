import test from 'node:test'
import assert from 'node:assert/strict'
import {
  itemInScope, matchesMediaRequestFilter, isUniversitySourced,
  type ManagedContentItem,
} from './contentControl.ts'
import { availableContentTags } from './contentTags.ts'
import { itemFacetTokens, availableFacets, itemMatchesFacets, facetKey, type Facet } from './contentFacets.ts'
import { publishReadiness } from './publishReadiness.ts'
import { itemWritableBy, type ContentScope, type ScopedKind } from './contentScope.ts'
import { queryContentIndex } from './contentQuery.ts'
import { CURRICULUM_SUBJECTS } from './curriculumCatalog.ts'
import type { University } from './universities.ts'
import { toIndexItem } from '../../server/src/adminContentProject.js'
import { runContentQuery, CURRICULUM_SUBJECTS as serverSubjects } from '../../server/src/adminContentList.js'

/**
 * Parity gate for the server-side Content dashboard query. The server module is a
 * hand-transliteration of the client `src/data/*.ts` list pipeline; this proves the
 * two agree, the same way `mediaLibrary.test.ts` holds the media rules together.
 */

const catalogue: University[] = [{
  id: 'kau', name: 'Kasr Alainy', short: 'KAU', region: 'Cairo', years: [
    { id: 'KAU_Y1', year: 'Year 1', students: 0, courses: [
      { id: 'c1', name: '101 ISK', block: 'T1', moduleId: '101 ISK' },
      { id: 'c2', name: '102 INT', block: 'T1', moduleId: '102 INT' },
    ] },
    { id: 'KAU_Y2', year: 'Year 2', students: 0, courses: [
      { id: 'c3', name: '205 NEU', block: 'T1', moduleId: '205 NEU' },
    ] },
  ],
}] as unknown as University[]

const item = (over: Partial<ManagedContentItem>): ManagedContentItem => ({
  id: 'x', kind: 'question', title: 'T', subjectId: '', status: 'Draft', owner: 'omar',
  updatedAt: '2026-01-01T00:00:00Z', fields: {}, ...over,
} as ManagedContentItem)

const fixture: ManagedContentItem[] = [
  item({ id: 'q1', kind: 'question', title: 'Alpha heart', subjectId: 'cvs', status: 'Published', updatedAt: '2026-01-08T00:00:00Z',
    editorialTags: ['High yield'], fields: { Topic: 'Cardio', Difficulty: 'Hard', Vignette: 'v', Explanation: 'e' },
    questionData: { tags: { moduleIds: ['101 ISK'], universityIds: ['kau'], years: ['KAU_Y1'] } } as ManagedContentItem['questionData'] }),
  item({ id: 'q2', kind: 'question', title: 'Beta lung', subjectId: 'resp', status: 'In review', updatedAt: '2026-01-07T00:00:00Z',
    owner: 'sara', source: { origin: 'university', universityId: 'kau' }, fields: { Topic: 'Resp', Difficulty: 'Moderate' },
    questionData: { tags: { moduleIds: ['101 ISK'], universityIds: ['kau'], years: ['KAU_Y1'] },
      mediaRequests: [{ id: 'm1', priority: 'required', status: 'needed' }] } as unknown as ManagedContentItem['questionData'] }),
  item({ id: 'q3', kind: 'question', title: 'Gamma nerve', subjectId: 'neuro', status: 'Draft', updatedAt: '2026-01-06T00:00:00Z',
    fields: { Topic: 'Neuro' },
    questionData: { tags: { moduleIds: ['205 NEU'], universityIds: ['kau'], years: ['KAU_Y2'] } } as ManagedContentItem['questionData'] }),
  item({ id: 'q4', kind: 'question', title: 'Delta gut', subjectId: 'gi', status: 'Draft', updatedAt: '2026-01-05T00:00:00Z',
    fields: { Topic: 'GI' }, questionData: { tags: {} } as ManagedContentItem['questionData'] }),
  item({ id: 'a1', kind: 'article', title: 'Epsilon article', subjectId: 'cvs', status: 'Published', updatedAt: '2026-01-04T00:00:00Z',
    editorialTags: ['High yield'], fields: { Topic: 'Cardio', Summary: 's' },
    articleData: { moduleIds: ['101 ISK'], universityIds: ['kau'], yearIds: ['KAU_Y1'],
      sections: [{ kind: 'body', body: 'real body' }] } as unknown as ManagedContentItem['articleData'] }),
  item({ id: 'a2', kind: 'article', title: 'Zeta article', status: 'In review', updatedAt: '2026-01-03T00:00:00Z',
    fields: { Topic: 'Misc' }, articleData: { sections: [] } as unknown as ManagedContentItem['articleData'] }),
  item({ id: 'p1', kind: 'practical', title: 'Eta osce', subjectId: 'cvs', status: 'Published', updatedAt: '2026-01-02T00:00:00Z',
    source: { origin: 'university', universityId: 'kau' }, fields: { Type: 'osce' },
    practicalData: { moduleIds: ['101 ISK'], universityIds: ['kau'], yearIds: ['KAU_Y1'] } as unknown as ManagedContentItem['practicalData'] }),
  item({ id: 'r1', kind: 'resource', title: 'Theta resource', status: 'Archived', updatedAt: '2026-01-01T00:00:00Z',
    fields: { Type: 'pdf' }, resourceData: { moduleIds: ['101 ISK'], universityIds: ['kau'], yearIds: ['KAU_Y1'] } as unknown as ManagedContentItem['resourceData'] }),
]

const indexItems = fixture.map(toIndexItem) as ManagedContentItem[]
const byId = new Map(indexItems.map((it) => [String(it.id), fixture.find((f) => f.id === it.id)]))

const QUESTION_KINDS = new Set(['question', 'resource', 'practical', 'deck', 'essay', 'histology'])
const updatedDesc = (a: ManagedContentItem, b: ManagedContentItem) =>
  new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()

interface Params {
  kind?: string; universityId?: string; year?: string; status?: string; mediaFilter?: string
  facets?: string[]; query?: string; sourceTab?: string; pageSize?: number; page?: number
}

/** The client-side pipeline (ControlDashboard.tsx ~340–446), for comparison. */
function clientPipeline(p: Params) {
  const activeKind = p.kind ?? 'question'
  const universityId = p.universityId || undefined
  const year = p.year || undefined
  const status = p.status ?? 'All'
  const mediaFilter = (p.mediaFilter ?? 'all') as Parameters<typeof matchesMediaRequestFilter>[1]
  const selected = new Set(p.facets ?? [])
  const q = (p.query ?? '').trim().toLowerCase()
  const sourceTab = p.sourceTab ?? 'all'
  const pageSize = p.pageSize ?? 50
  const page = p.page ?? 1
  const items = indexItems

  const summaryItems = items.filter((it) => {
    if (!universityId && !year) return true
    if (!QUESTION_KINDS.has(activeKind)) return true
    return itemInScope(it, universityId, year)
  })
  const counts = {
    total: summaryItems.length,
    published: summaryItems.filter((it) => it.status === 'Published').length,
    review: summaryItems.filter((it) => it.status === 'In review').length,
    drafts: summaryItems.filter((it) => it.status === 'Draft').length,
  }

  const kindItems = items.filter((it) => it.kind === activeKind)
  const facetIndex = new Map(kindItems.map((it) => [it.id, itemFacetTokens(it, catalogue)]))
  const facetGroups = availableFacets(kindItems, catalogue)

  const matching = items
    .filter((it) => it.kind === activeKind)
    .filter((it) => status === 'All' || it.status === status)
    .filter((it) => matchesMediaRequestFilter(it, mediaFilter))
    .filter((it) => itemMatchesFacets(facetIndex.get(it.id) ?? new Set(), selected))
    .filter((it) => {
      if ((!universityId && !year) || !QUESTION_KINDS.has(activeKind)) return true
      return itemInScope(it, universityId, year)
    })
    .filter((it) => !q || `${it.title} ${it.owner} ${Object.values(it.fields).join(' ')} ${[...(facetIndex.get(it.id) ?? [])].join(' ')}`.toLowerCase().includes(q))
    .sort(updatedDesc)

  const sourceCounts = {
    all: matching.length,
    university: matching.filter(isUniversitySourced).length,
    internal: matching.filter((it) => !isUniversitySourced(it)).length,
  }
  const showsSourceTabs = activeKind === 'question' || activeKind === 'practical'
  const rows = (!showsSourceTabs || sourceTab === 'all')
    ? matching
    : matching.filter((it) => (sourceTab === 'university' ? isUniversitySourced(it) : !isUniversitySourced(it)))
  const pageRowIds = rows.slice((page - 1) * pageSize, page * pageSize).map((it) => it.id)

  return {
    pageIds: pageRowIds,
    total: rows.length,
    counts,
    facetGroups,
    sourceCounts,
    existingContentTags: availableContentTags(items),
    matching: matching.map((it) => {
      const v = publishReadiness(it)
      const topic = it.kind === 'resource'
        ? (it.fields.Chapter?.trim() || it.resourceData?.chapters?.[0] || 'General')
        : (it.fields.Topic?.trim() || 'Other')
      return { id: it.id, status: it.status, kind: it.kind, title: it.title, subjectId: it.subjectId ?? '', topic, ready: v.ready, hardBlocked: v.hardBlocked === true, reason: v.reason ?? '' }
    }),
  }
}

const combos: Array<[string, Params]> = [
  ['question, no filter', { kind: 'question' }],
  ['question, search "lung"', { kind: 'question', query: 'lung' }],
  ['article, Published', { kind: 'article', status: 'Published' }],
  ['question, module facet', { kind: 'question', facets: [facetKey({ type: 'module', value: '101 ISK', label: '101 ISK' } as Facet)] }],
  ['question, subject facet', { kind: 'question', facets: [facetKey({ type: 'subject', value: 'cvs', label: 'x' } as Facet)] }],
  ['question, tag facet', { kind: 'question', facets: [facetKey({ type: 'tag', value: 'High yield', label: 'x' } as Facet)] }],
  ['question, no-module flag', { kind: 'question', facets: ['flag:no-module'] }],
  ['question, blocking media', { kind: 'question', mediaFilter: 'blocking' }],
  ['question, sourceTab university', { kind: 'question', sourceTab: 'university' }],
  ['question, scope KAU Y2', { kind: 'question', universityId: 'kau', year: 'KAU_Y2' }],
  ['practical, sourceTab internal', { kind: 'practical', sourceTab: 'internal' }],
  ['question, pageSize 2 page 2', { kind: 'question', pageSize: 2, page: 2 }],
]

for (const [name, params] of combos) {
  test(`server query matches client pipeline: ${name}`, () => {
    const expected = clientPipeline(params)
    const got = runContentQuery({ indexItems, byId, catalogue }, { ...params, includeMatchingIds: true })
    assert.deepEqual(got.page.map((it: ManagedContentItem) => it.id), expected.pageIds, 'page ids')
    assert.equal(got.total, expected.total, 'total')
    assert.deepEqual(got.counts, expected.counts, 'counts')
    assert.deepEqual(got.facetGroups, expected.facetGroups, 'facetGroups')
    assert.deepEqual(got.sourceCounts, expected.sourceCounts, 'sourceCounts')
    assert.deepEqual(got.existingContentTags, expected.existingContentTags, 'tags')
    assert.deepEqual(got.matching, expected.matching, 'matching bulk-selection projection')
  })
}

/**
 * A scoped reviewer sees only content their modules/years may write — the server
 * twin of the client's `useScopedItems(ledger)`, which filters through the same
 * `itemWritableBy`. Prove the server's `contentScope` pre-filter narrows counts,
 * matching, and the page exactly as the client filter would.
 */
const scopeCases: Array<[string, ContentScope]> = [
  ['module 205 NEU', { moduleIds: ['205 NEU'], yearIds: [] }],
  ['year KAU_Y2', { moduleIds: [], yearIds: ['KAU_Y2'] }],
  ['module 101 ISK', { moduleIds: ['101 ISK'], yearIds: [] }],
]
for (const [name, scope] of scopeCases) {
  test(`server scope filter matches client itemWritableBy: ${name}`, () => {
    const visible = indexItems.filter((it) => itemWritableBy(scope, it.kind as ScopedKind, it))
    const expectedQuestionIds = visible.filter((it) => it.kind === 'question').map((it) => it.id).sort()
    const got = runContentQuery({ indexItems, byId, catalogue, contentScope: scope }, { kind: 'question', includeMatchingIds: true })
    assert.deepEqual([...got.matchingIds].sort(), expectedQuestionIds, 'scoped matching ids')
    // The unscoped run must see at least as much — scope only ever narrows.
    const unscoped = runContentQuery({ indexItems, byId, catalogue }, { kind: 'question', includeMatchingIds: true })
    assert.ok(got.matchingIds.length <= unscoped.matchingIds.length, 'scope never widens')
  })
}

/**
 * The demo path (`queryContentIndex`, over full items) and the server path
 * (`runContentQuery`, over the projected index + byId) must return the identical
 * response — the dashboard consumes one shape either way.
 */
for (const [name, params] of combos) {
  test(`demo queryContentIndex matches server runContentQuery: ${name}`, () => {
    const demo = queryContentIndex(fixture, { ...params, includeMatchingIds: true }, catalogue)
    const server = runContentQuery({ indexItems, byId, catalogue }, { ...params, includeMatchingIds: true })
    assert.deepEqual(demo, server)
  })
}

test('server subject table has not drifted from the client', () => {
  assert.deepEqual(serverSubjects, CURRICULUM_SUBJECTS)
})

test('returned page items are FULL items, not the projected index rows', () => {
  const got = runContentQuery({ indexItems, byId, catalogue }, { kind: 'article', status: 'Published' })
  const article = got.page.find((it: ManagedContentItem) => it.id === 'a1')
  assert.ok(article?.articleData?.sections?.length, 'full item keeps article sections dropped by the index projection')
})
