import test from 'node:test'
import assert from 'node:assert/strict'
import { readPreferences, planChange, STUDENT_EMAIL_CATEGORIES } from './emailPreferences.js'

const KEYS = STUDENT_EMAIL_CATEGORIES.map((c) => c.key)
const [A, B] = KEYS // 'Question of the Day', 'announcement'

test('no rows means subscribed to everything', () => {
  const { allOff, categories } = readPreferences([])
  assert.equal(allOff, false)
  assert.deepEqual(categories.map((c) => c.subscribed), KEYS.map(() => true))
})

test('a category row turns off only that category', () => {
  const { allOff, categories } = readPreferences([A])
  assert.equal(allOff, false)
  assert.equal(categories.find((c) => c.key === A).subscribed, false)
  assert.equal(categories.find((c) => c.key === B).subscribed, true)
})

test('the blanket NULL row turns everything off', () => {
  const { allOff, categories } = readPreferences([null])
  assert.equal(allOff, true)
  assert.deepEqual(categories.map((c) => c.subscribed), KEYS.map(() => false))
})

test('turning a category off inserts just its row', () => {
  assert.deepEqual(planChange([], A, false), { inserts: [A], deletes: [] })
})

test('turning a category on deletes its row', () => {
  assert.deepEqual(planChange([A], A, true), { inserts: [], deletes: [A] })
})

test('turning one on when everything was blanket-off keeps the others off', () => {
  const { inserts, deletes } = planChange([null], A, true)
  // The blanket row is removed, A stays deleted (on), every other key becomes
  // its own suppression row so nothing else silently switches back on.
  assert.ok(deletes.includes(null))
  assert.ok(deletes.includes(A))
  assert.deepEqual(inserts.sort(), KEYS.filter((k) => k !== A).sort())

  // Applying the plan to the row set yields exactly "A on, rest off".
  const rows = new Set([null])
  for (const d of deletes) rows.delete(d)
  for (const i of inserts) rows.add(i)
  const after = readPreferences(rows)
  assert.equal(after.categories.find((c) => c.key === A).subscribed, true)
  for (const k of KEYS.filter((k) => k !== A)) {
    assert.equal(after.categories.find((c) => c.key === k).subscribed, false)
  }
})

test('an unknown category is rejected', () => {
  assert.throws(() => planChange([], 'not-a-category', false), /unknown email category/)
})
