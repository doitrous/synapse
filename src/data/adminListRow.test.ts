import test from 'node:test'
import assert from 'node:assert/strict'
import { toIndexItem } from '../../server/src/adminContentProject.js'
import { itemScope, blockingMediaRequests, matchesMediaRequestFilter, type ManagedContentItem } from './contentControl.ts'
import { publishReadiness } from './publishReadiness.ts'
import { itemFacetTokens } from './contentFacets.ts'
import { contentTagsOf } from './contentTags.ts'

/**
 * The list-index projection (server `toIndexItem`) must drop NOTHING the list
 * path reads. This asserts every list function returns the same thing on a
 * projected row as on the full item — the guard that stops a future field being
 * stripped out from under the Content dashboard. (Proven over the whole 251 MB
 * production ledger by hand; this is the CI fixture that keeps it true.)
 */
const question = (over: Record<string, unknown> = {}): ManagedContentItem => ({
  id: 'q1', kind: 'question', title: 'Cardiac cycle', subjectId: 'cvs', status: 'Draft',
  owner: 'a', updatedAt: '2026-09-14', editorialTags: ['high-yield'],
  fields: { Topic: 'Heart', Difficulty: 'Hard', Vignette: 'A 60yo…'.repeat(50), Explanation: 'Because…'.repeat(80) },
  questionData: {
    stem: 'What phase…'.repeat(30),
    answers: [{ label: 'A', text: 'Systole', explanation: 'x'.repeat(200), correct: true }],
    tags: { universityIds: ['kau'], years: ['KAU_Y1'], moduleIds: ['m1'], moduleSubjectPaths: ['m1/anat'] },
    mediaRequests: [{ id: 'r1', priority: 'required', status: 'needed', medium: 'image', kind: 'diagram', brief: 'x', teachingPurpose: 'y' }],
  },
  ...over,
}) as ManagedContentItem

const article = (over: Record<string, unknown> = {}): ManagedContentItem => ({
  id: 'a1', kind: 'article', title: 'Membrane', subjectId: 'cell', status: 'Draft',
  owner: 'a', updatedAt: '2026-09-14', editorialTags: [],
  fields: { Topic: 'Cell', 'Reading time': '4' },
  articleData: {
    summary: 's', body: 'b',
    universityIds: ['kau'], yearIds: ['KAU_Y1'], moduleIds: ['m1'], moduleSubjectPaths: [],
    sections: [{ id: 's1', kind: 'definition', body: 'FULL BODY '.repeat(200), narrative: '' }],
    publishedSections: [{ id: 's1', kind: 'definition', body: 'x' }, { id: 's2', kind: 'components', body: 'y' }],
    publicationGate: 'needs_evidence', holdThese: [], loseTheMark: [], questionIds: [], resourceIds: [], annotations: [],
  },
  ...over,
}) as ManagedContentItem

const CAT: never[] = []
const FILTERS = ['none', 'any', 'blocking', 'outstanding'] as const
const eq = (a: unknown, b: unknown) => assert.equal(JSON.stringify(a), JSON.stringify(b))

function assertParity(full: ManagedContentItem, label: string) {
  const proj = toIndexItem(full) as ManagedContentItem
  eq(itemScope(full), itemScope(proj))
  eq(publishReadiness(full), publishReadiness(proj))
  assert.equal(blockingMediaRequests(full).length, blockingMediaRequests(proj).length, `${label} blocking`)
  for (const f of FILTERS) assert.equal(matchesMediaRequestFilter(full, f), matchesMediaRequestFilter(proj, f), `${label} filter ${f}`)
  eq([...itemFacetTokens(full, CAT)].sort(), [...itemFacetTokens(proj, CAT)].sort())
  eq(contentTagsOf(full), contentTagsOf(proj))
}

test('projected question row behaves identically to the full question', () => {
  assertParity(question(), 'question')
  assertParity(question({ status: 'Published' }), 'published question')
  assertParity(question({ questionData: { tags: {}, mediaRequests: [] } } as never), 'question with no scope/requests')
})

test('projected article row behaves identically to the full article', () => {
  assertParity(article(), 'article')
  // Evidence-gated with only a components section → not ready; hasBody fallback path.
  assertParity(article({ articleData: { summary: 's', body: '', universityIds: ['kau'], yearIds: ['KAU_Y1'], moduleIds: ['m1'], moduleSubjectPaths: [], sections: [], publishedSections: undefined, holdThese: [], loseTheMark: [], questionIds: [], resourceIds: [], annotations: [] } } as never), 'article no body')
})

test('projection drops the heavy bodies but keeps the row fields', () => {
  const proj = toIndexItem(question()) as ManagedContentItem
  assert.equal(proj.questionData?.stem, undefined, 'stem dropped')
  assert.equal(proj.questionData?.answers, undefined, 'answers dropped')
  assert.equal(proj.fields.Vignette, undefined, 'vignette dropped')
  assert.equal(proj.fields.Explanation, undefined, 'explanation dropped')
  assert.equal(proj.fields.Topic, 'Heart', 'topic kept')
  assert.deepEqual(proj.questionData?.tags?.universityIds, ['kau'], 'scope tags kept')
  const art = toIndexItem(article()) as ManagedContentItem
  assert.equal(art.articleData?.sections, undefined, 'article sections dropped')
  assert.equal(art.articleData?.hasBody, true, 'hasBody computed')
  assert.deepEqual(art.articleData?.publishedSectionKinds, ['definition', 'components'], 'section kinds kept')
})

test('small kinds are kept whole (not projected)', () => {
  const deck = { id: 'd1', kind: 'deck', title: 'Deck', subjectId: 'cvs', status: 'Draft', owner: 'a', updatedAt: '2026-09-14', fields: {}, deckData: { cards: [{ id: 'c', front: 'f', back: 'b' }] } } as unknown as ManagedContentItem
  assert.deepEqual(toIndexItem(deck), deck, 'deck untouched')
})
