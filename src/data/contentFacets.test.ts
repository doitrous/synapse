import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { ManagedContentItem } from './contentControl.ts'
import type { University } from './universities.ts'
import { availableFacets, facetToken, itemFacetTokens, itemMatchesFacets } from './contentFacets.ts'

// The facet functions only read a handful of fields; a partial cast keeps the
// fixtures legible without asserting the full ManagedContentItem shape.
function question(over: Record<string, unknown>): ManagedContentItem {
  return {
    id: 'q', kind: 'question', title: 'T', owner: 'x', status: 'Draft', updatedAt: '2026-01-01', fields: {},
    subjectId: '', editorialTags: [], questionData: { tags: { moduleIds: [] } },
    ...over,
  } as unknown as ManagedContentItem
}

// No catalogue needed: an authored module id that the catalogue does not know
// still resolves to a label (its own id), which is exactly what an admin sees.
const NO_CATALOGUE: University[] = []

test('an item carries a token for its module, subject, and each editorial tag', () => {
  const item = question({
    subjectId: 'cardio',
    editorialTags: ['High yield', 'Exam 2025'],
    questionData: { tags: { moduleIds: ['MOD_CVS'] } },
  })
  const tokens = itemFacetTokens(item, NO_CATALOGUE)
  assert.ok(tokens.has(facetToken('module', 'MOD_CVS')))
  assert.ok(tokens.has(facetToken('subject', 'cardio')))
  assert.ok(tokens.has(facetToken('tag', 'High yield')))
  assert.ok(tokens.has(facetToken('tag', 'Exam 2025')))
  assert.ok(!tokens.has('flag:no-module'))
})

test('a module-less item is flagged so "Needs module" can find it', () => {
  const tokens = itemFacetTokens(question({ subjectId: 'cardio' }), NO_CATALOGUE)
  assert.ok(tokens.has('flag:no-module'))
})

test('selecting multiple tags matches ANY of them, not all', () => {
  const cvs = itemFacetTokens(question({ questionData: { tags: { moduleIds: ['MOD_CVS'] } } }), NO_CATALOGUE)
  const resp = itemFacetTokens(question({ questionData: { tags: { moduleIds: ['MOD_RESP'] } } }), NO_CATALOGUE)
  const chosen = new Set([facetToken('module', 'MOD_CVS'), facetToken('module', 'MOD_RESP')])
  assert.equal(itemMatchesFacets(cvs, chosen), true)
  assert.equal(itemMatchesFacets(resp, chosen), true)
  // An item in neither module is excluded.
  const other = itemFacetTokens(question({ questionData: { tags: { moduleIds: ['MOD_GIT'] } } }), NO_CATALOGUE)
  assert.equal(itemMatchesFacets(other, chosen), false)
})

test('no selection matches everything', () => {
  assert.equal(itemMatchesFacets(new Set(['tag:x']), new Set()), true)
})

test('availableFacets offers only facets some item actually has, grouped', () => {
  const items = [
    question({ id: 'a', subjectId: 'cardio', editorialTags: ['High yield'], questionData: { tags: { moduleIds: ['MOD_CVS'] } } }),
    question({ id: 'b', subjectId: 'cardio', editorialTags: ['High yield', 'Rare'], questionData: { tags: { moduleIds: ['MOD_RESP'] } } }),
  ]
  const groups = availableFacets(items, NO_CATALOGUE)
  assert.deepEqual(groups.modules.map((facet) => facet.value), ['MOD_CVS', 'MOD_RESP'])
  assert.deepEqual(groups.subjects.map((facet) => facet.value), ['cardio']) // deduped
  assert.deepEqual(groups.tags.map((facet) => facet.label), ['High yield', 'Rare']) // deduped + sorted
})
