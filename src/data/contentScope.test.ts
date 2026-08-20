import test from 'node:test'
import assert from 'node:assert/strict'
import { changeWritableBy, itemWritableBy, yearNumber, type ScopedItem } from './contentScope.ts'
import * as server from '../../server/src/contentScope.js'

const scope = { moduleIds: ['MOD_CVS'], yearIds: ['OMS_Y2'] }
const question = (moduleIds: string[], years: string[] = []) =>
  ({ id: 'q', kind: 'question', questionData: { tags: { moduleIds, years } } })

test('the client reads a year exactly as the server does', () => {
  const values = ['Year 2', 'OMS_Y2', 2, 'HU_Y10', 'OMS_INT1', 'Internship Year 1', '', null, 'nonsense']
  for (const value of values) {
    assert.equal(
      yearNumber(value as string | number | null),
      server.yearNumber(value),
      `yearNumber(${JSON.stringify(value)})`,
    )
  }
})

test('the client and the server agree on every writability question', () => {
  const items = [
    question(['MOD_CVS']), question(['MOD_RES']), question([], ['Year 2']), question([], ['Year 4']), question([]),
  ]
  for (const item of items) {
    assert.equal(
      itemWritableBy(scope, 'question', item as unknown as ScopedItem),
      server.itemWritableBy(scope, 'question', item),
    )
    assert.equal(
      itemWritableBy(null, 'question', item as unknown as ScopedItem),
      server.itemWritableBy(null, 'question', item),
    )
    for (const other of items) {
      assert.equal(
        changeWritableBy(scope, 'question', item as unknown as ScopedItem, other as unknown as ScopedItem),
        server.changeWritableBy(scope, 'question', item, other),
      )
    }
  }
})

test('the two agree across all four content kinds and concepts', () => {
  const cases: Array<[string, unknown]> = [
    ['article', { articleData: { yearIds: ['OMS_Y2'] } }],
    ['article', { articleData: {} }],
    ['practical', { practicalData: { moduleIds: ['MOD_CVS'] } }],
    ['practical', { practicalData: { yearIds: ['Year 4'] } }],
    ['resource', { resourceData: { yearIds: ['Year 2'] } }],
    ['concept', { learnerYears: [2] }],
    ['concept', { moduleIds: ['MOD_RES'] }],
    ['question', { questionData: { tags: { moduleSubjectPaths: ['MOD_CVS > Anatomy > Upper Limb'] } } }],
    ['article', { articleData: { moduleSubjectPaths: ['MOD_RES > Physiology'] } }],
    ['deck', { id: 'd', kind: 'deck' }],
    ['essay', { id: 'e', kind: 'essay' }],
    ['histology', { id: 'h', kind: 'histology' }],
  ]
  for (const [kind, item] of cases) {
    assert.equal(
      itemWritableBy(scope, kind as never, item as ScopedItem),
      server.itemWritableBy(scope, kind, item),
      `${kind} ${JSON.stringify(item)}`,
    )
  }
})

test('an unscoped viewer sees everything, and an unassigned reviewer sees nothing', () => {
  assert.equal(itemWritableBy(null, 'question', question([]) as unknown as ScopedItem), true)
  assert.equal(itemWritableBy(scope, 'question', question([]) as unknown as ScopedItem), false)
})
