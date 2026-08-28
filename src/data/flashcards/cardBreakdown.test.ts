import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { ExclusiveCounts } from './status.ts'
import {
  CARD_BREAKDOWN_META,
  CARD_BREAKDOWN_ORDER,
  cardBreakdownRows,
} from './cardBreakdown.ts'

const zeroCounts = (): ExclusiveCounts => ({
  new: 0,
  learning: 0,
  relearning: 0,
  young: 0,
  mature: 0,
  suspended: 0,
  buried: 0,
})

const counts = (over: Partial<ExclusiveCounts>): ExclusiveCounts => ({ ...zeroCounts(), ...over })

test('rows are emitted in CARD_BREAKDOWN_ORDER with matching label/colour metadata', () => {
  const { rows } = cardBreakdownRows(counts({ new: 3, mature: 2 }))
  assert.deepEqual(
    rows.map((r) => r.status),
    CARD_BREAKDOWN_ORDER,
  )
  for (const row of rows) {
    const meta = CARD_BREAKDOWN_META[row.status]
    assert.equal(row.label, meta.label)
    assert.equal(row.colorVar, meta.colorVar)
  }
})

test('total is the sum of all category counts', () => {
  const c = counts({ new: 3, learning: 2, relearning: 1, young: 4, mature: 5, suspended: 1, buried: 1 })
  const { total } = cardBreakdownRows(c)
  assert.equal(total, 17)
})

test('largest-remainder rounding: three equal-thirds categories split 34/33/33, tie broken by CARD_BREAKDOWN_ORDER', () => {
  const { rows, total } = cardBreakdownRows(counts({ new: 1, learning: 1, mature: 1 }))
  const byStatus = Object.fromEntries(rows.map((r) => [r.status, r.pct]))
  // new precedes learning precedes mature in CARD_BREAKDOWN_ORDER, so the
  // leftover point (100 - 99) goes to new first among the tied remainders.
  assert.equal(byStatus.new, 34)
  assert.equal(byStatus.learning, 33)
  assert.equal(byStatus.mature, 33)
  assert.equal(byStatus.relearning, 0)
  assert.equal(byStatus.young, 0)
  assert.equal(byStatus.suspended, 0)
  assert.equal(byStatus.buried, 0)
  assert.equal(total, 3)
  assert.equal(
    rows.reduce((sum, r) => sum + r.pct, 0),
    100,
  )
})

test('largest-remainder rounding: an uneven split rounds without a tie', () => {
  const { rows } = cardBreakdownRows(counts({ young: 1, mature: 2 }))
  const byStatus = Object.fromEntries(rows.map((r) => [r.status, r.pct]))
  assert.equal(byStatus.young, 33)
  assert.equal(byStatus.mature, 67)
  assert.equal(
    rows.reduce((sum, r) => sum + r.pct, 0),
    100,
  )
})

test('pct always sums to exactly 100 when total>0, across several distributions', () => {
  const cases: Partial<ExclusiveCounts>[] = [
    { new: 1 },
    { new: 1, learning: 1 },
    { new: 7, learning: 3, mature: 3 },
    { new: 1, learning: 1, relearning: 1, young: 1, mature: 1, suspended: 1, buried: 1 },
    { new: 100, learning: 1 },
    { young: 2, mature: 3, suspended: 5, buried: 1 },
  ]
  for (const c of cases) {
    const { rows, total } = cardBreakdownRows(counts(c))
    assert.ok(total > 0)
    assert.equal(
      rows.reduce((sum, r) => sum + r.pct, 0),
      100,
      `expected pcts to sum to 100 for ${JSON.stringify(c)}`,
    )
    for (const row of rows) {
      assert.ok(Number.isInteger(row.pct))
      assert.ok(row.pct >= 0 && row.pct <= 100)
    }
  }
})

test('total 0 yields all counts 0, all pct 0, and a 0 sum with no crash', () => {
  const { rows, total } = cardBreakdownRows(zeroCounts())
  assert.equal(total, 0)
  for (const row of rows) {
    assert.equal(row.count, 0)
    assert.equal(row.pct, 0)
  }
  assert.equal(
    rows.reduce((sum, r) => sum + r.pct, 0),
    0,
  )
})

test('a single non-zero category takes 100% and every other category stays at 0%', () => {
  const { rows, total } = cardBreakdownRows(counts({ mature: 5 }))
  assert.equal(total, 5)
  for (const row of rows) {
    if (row.status === 'mature') {
      assert.equal(row.pct, 100)
      assert.equal(row.count, 5)
    } else {
      assert.equal(row.pct, 0)
      assert.equal(row.count, 0)
    }
  }
})

test('a zero count never receives a misleading non-zero percentage when another category has cards', () => {
  const { rows } = cardBreakdownRows(counts({ new: 1, learning: 0 }))
  const learningRow = rows.find((r) => r.status === 'learning')!
  assert.equal(learningRow.count, 0)
  assert.equal(learningRow.pct, 0)
})

test('cardBreakdownRows does not mutate its input and is deterministic across calls', () => {
  const c = counts({ new: 1, learning: 1, mature: 1 })
  const snapshot = { ...c }
  const first = cardBreakdownRows(c)
  assert.deepEqual(c, snapshot)
  const second = cardBreakdownRows(c)
  assert.deepEqual(c, snapshot)
  assert.deepEqual(first, second)
})
