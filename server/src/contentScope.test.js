import test from 'node:test'
import assert from 'node:assert/strict'
import { changeWritableBy, itemWritableBy, itemYears, yearNumber } from './contentScope.js'

const scope = { moduleIds: ['MOD_CVS'], yearIds: ['OMS_Y2'] }

const question = (tags) => ({ kind: 'question', questionData: { tags } })
const article = (data) => ({ kind: 'article', articleData: data })
const practical = (data) => ({ kind: 'practical', practicalData: data })

test('a year is read from all three forms it is stored in', () => {
  assert.equal(yearNumber('Year 2'), 2)
  assert.equal(yearNumber('OMS_Y2'), 2)
  assert.equal(yearNumber(2), 2)
  assert.equal(yearNumber('HU_Y10'), 10)
  assert.equal(yearNumber('OMS_INT1'), null, 'an internship year is not year 1')
  assert.equal(yearNumber('Internship Year 1'), null)
  assert.equal(yearNumber(''), null)
  assert.equal(yearNumber(null), null)
  assert.equal(yearNumber('nonsense'), null)
})

test('a field named yearIds may hold either form, and both are read', () => {
  // ResourceEditorDialog.tsx:231 writes YEARS labels into `yearIds`, while the
  // article editor writes scoped ids into the same field. Reconciling that is
  // this function's whole reason for existing.
  assert.equal(itemWritableBy(scope, 'resource', { resourceData: { yearIds: ['Year 2'] } }), true)
  assert.equal(itemWritableBy(scope, 'resource', { resourceData: { yearIds: ['OMS_Y2'] } }), true)
  assert.equal(itemWritableBy(scope, 'resource', { resourceData: { yearIds: ['Year 4'] } }), false)
})

test('an item is writable when its module matches', () => {
  assert.equal(itemWritableBy(scope, 'question', question({ moduleIds: ['MOD_CVS'], years: [] })), true)
  assert.equal(itemWritableBy(scope, 'question', question({ moduleIds: ['MOD_RES'], years: [] })), false)
})

test('an item is writable when its year matches, whatever form it is stored in', () => {
  assert.equal(itemWritableBy(scope, 'question', question({ moduleIds: [], years: ['Year 2'] })), true)
  assert.equal(itemWritableBy(scope, 'article', article({ yearIds: ['OMS_Y2'] })), true)
  assert.equal(itemWritableBy(scope, 'concept', { learnerYears: [2] }), true)
  assert.equal(itemWritableBy(scope, 'question', question({ moduleIds: [], years: ['Year 4'] })), false)
})

test('a university named on both sides must agree', () => {
  const other = { moduleIds: [], yearIds: ['HU_Y2'] }
  assert.equal(itemWritableBy(other, 'article', article({ yearIds: ['OMS_Y2'] })), false)
  // The item names no university, so a Year 2 reviewer owns it.
  assert.equal(itemWritableBy(other, 'question', question({ moduleIds: [], years: ['Year 2'] })), true)
})

test('an untagged item belongs to no reviewer', () => {
  assert.equal(itemWritableBy(scope, 'question', question({ moduleIds: [], years: [] })), false)
  assert.equal(itemWritableBy(scope, 'article', article({})), false)
  assert.equal(itemWritableBy(scope, 'practical', practical({})), false)
  assert.equal(itemWritableBy(scope, 'resource', { resourceData: {} }), false)
})

test('an unscoped caller writes anything, including untagged items', () => {
  assert.equal(itemWritableBy(null, 'question', question({ moduleIds: [], years: [] })), true)
  assert.equal(itemWritableBy(null, 'article', article({ yearIds: ['OMS_Y4'] })), true)
})

test('a practical is scoped once it is tagged', () => {
  assert.equal(itemWritableBy(scope, 'practical', practical({ moduleIds: ['MOD_CVS'] })), true)
  assert.equal(itemWritableBy(scope, 'practical', practical({ yearIds: ['OMS_Y2'] })), true)
  assert.equal(itemWritableBy(scope, 'practical', practical({ yearIds: ['OMS_Y4'] })), false)
})

test('a module-subject path places content as surely as a module id', () => {
  // `101 ISK > Anatomy > Upper Limb` is the finer tagging main introduced; the
  // module is its first segment, and a reviewer for that module owns the item.
  const byPath = { kind: 'question', questionData: { tags: { moduleSubjectPaths: ['MOD_CVS > Anatomy > Upper Limb'] } } }
  assert.equal(itemWritableBy(scope, 'question', byPath), true)
  const elsewhere = { kind: 'article', articleData: { moduleSubjectPaths: ['MOD_RES > Physiology'] } }
  assert.equal(itemWritableBy(scope, 'article', elsewhere), false)
  assert.equal(itemWritableBy({ moduleIds: ['MOD_RES'], yearIds: [] }, 'article', elsewhere), true)
})

test('a kind that cannot yet be placed belongs to no reviewer', () => {
  // Decks, written answers and histology slides carry no placement at all, so
  // they stay with the editors until they can say where they belong.
  for (const kind of ['deck', 'essay', 'histology']) {
    assert.equal(itemWritableBy(scope, kind, { id: 'x', kind }), false, kind)
    assert.equal(itemWritableBy(null, kind, { id: 'x', kind }), true, kind)
  }
})

test('a change is refused when either side of it is out of scope', () => {
  const mine = question({ moduleIds: ['MOD_CVS'], years: [] })
  const theirs = question({ moduleIds: ['MOD_RES'], years: [] })
  assert.equal(changeWritableBy(scope, 'question', mine, mine), true)
  // Retagging somebody else's question into my scope.
  assert.equal(changeWritableBy(scope, 'question', theirs, mine), false)
  // Retagging my question out of my scope.
  assert.equal(changeWritableBy(scope, 'question', mine, theirs), false)
  // Creating and deleting are one-sided, and the side that exists must pass.
  assert.equal(changeWritableBy(scope, 'question', null, mine), true)
  assert.equal(changeWritableBy(scope, 'question', null, theirs), false)
  assert.equal(changeWritableBy(scope, 'question', mine, null), true)
  assert.equal(changeWritableBy(scope, 'question', theirs, null), false)
})

test('years are read from the block each kind actually keeps them in', () => {
  assert.deepEqual(itemYears('question', question({ years: ['Year 1', 'Year 3'] })), [1, 3])
  assert.deepEqual(itemYears('article', article({ yearIds: ['OMS_Y5'] })), [5])
  assert.deepEqual(itemYears('concept', { learnerYears: [1, 2] }), [1, 2])
  assert.deepEqual(itemYears('question', question({ years: ['nonsense'] })), [])
})
