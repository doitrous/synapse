import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  advanceMixed,
  balancedSplit,
  buildMixedQueue,
  clampSplit,
  currentMixedItem,
  finishMixed,
  markMixed,
  mixedClosed,
  mixedFinished,
  splitTotal,
  startMixedSession,
  summariseMixed,
  type MixedPools,
  type MixedSplit,
} from './mixedSession.ts'

const POOLS: MixedPools = {
  mcq: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'],
  practical: ['p1', 'p2', 'p3'],
  essay: ['e1', 'e2'],
}

const split = (mcq: number, practical: number, essay: number): MixedSplit => ({ mcq, practical, essay })

test('the queue holds exactly the share each bank was asked for', () => {
  const items = buildMixedQueue(POOLS, split(3, 2, 1), 7)
  assert.equal(items.length, 6)
  assert.equal(items.filter((i) => i.kind === 'mcq').length, 3)
  assert.equal(items.filter((i) => i.kind === 'practical').length, 2)
  assert.equal(items.filter((i) => i.kind === 'essay').length, 1)
  // Every id came from its own bank, and none was drawn twice.
  for (const item of items) assert.ok(POOLS[item.kind].includes(item.id))
  assert.equal(new Set(items.map((i) => `${i.kind}:${i.id}`)).size, items.length)
})

test('a seed names a queue', () => {
  const a = buildMixedQueue(POOLS, split(3, 2, 1), 42)
  const b = buildMixedQueue(POOLS, split(3, 2, 1), 42)
  assert.deepEqual(a, b)
})

test('a different seed draws a different queue', () => {
  // Not a guarantee for any one pair of seeds, but across a spread of seeds a
  // shuffle that ignored its seed would produce one distinct queue, not many.
  const queues = new Set([1, 2, 3, 4, 5, 6, 7, 8].map((seed) => JSON.stringify(buildMixedQueue(POOLS, split(3, 2, 1), seed))))
  assert.ok(queues.size > 1, 'the seed must reach the shuffle')
})

test('the banks are shuffled together, not concatenated', () => {
  // Blocked output would put every mcq before every practical for every seed.
  const blocked = [1, 2, 3, 4, 5, 6, 7, 8].every((seed) => {
    const items = buildMixedQueue(POOLS, split(3, 2, 1), seed)
    const lastMcq = items.map((i) => i.kind).lastIndexOf('mcq')
    const firstOther = items.findIndex((i) => i.kind !== 'mcq')
    return lastMcq < firstOther
  })
  assert.equal(blocked, false)
})

test('a bank is never asked for more than it holds', () => {
  const items = buildMixedQueue(POOLS, split(10, 10, 10), 3)
  assert.equal(items.filter((i) => i.kind === 'mcq').length, 6)
  assert.equal(items.filter((i) => i.kind === 'practical').length, 3)
  assert.equal(items.filter((i) => i.kind === 'essay').length, 2)
})

test('balance splits evenly and spends the remainder in bank order', () => {
  assert.deepEqual(balancedSplit(9, split(99, 99, 99)), split(3, 3, 3))
  assert.deepEqual(balancedSplit(10, split(99, 99, 99)), split(4, 3, 3))
  assert.deepEqual(balancedSplit(11, split(99, 99, 99)), split(4, 4, 3))
})

test('balance moves a dry bank\'s share to the banks that can fill it', () => {
  // Twelve items with only two essays: the essay share stops at two and the
  // rest is dealt on, rather than the builder offering a split it cannot fill.
  const balanced = balancedSplit(12, split(6, 3, 2))
  assert.equal(balanced.essay, 2)
  assert.equal(balanced.practical, 3)
  assert.equal(balanced.mcq, 6)
  assert.equal(splitTotal(balanced), 11, 'it deals what exists, never a phantom item')
})

test('a split is clamped to what each bank holds', () => {
  assert.deepEqual(clampSplit(split(99, -4, 1), split(6, 3, 2)), split(6, 0, 1))
})

test('the cursor advances one item at a time and then stops', () => {
  let session = startMixedSession(buildMixedQueue(POOLS, split(1, 1, 0), 5), 5, 0)
  assert.equal(session.items.length, 2)
  assert.ok(currentMixedItem(session))
  assert.equal(mixedFinished(session), false)
  session = advanceMixed(session)
  assert.equal(session.cursor, 1)
  session = advanceMixed(session)
  assert.equal(mixedFinished(session), true)
  assert.equal(currentMixedItem(session), null)
  // Past the end nothing moves, so a double-click on "next" cannot run the
  // cursor off into a queue position that never existed.
  assert.equal(advanceMixed(session).cursor, 2)
})

test('an item left without a mark is still counted as visited', () => {
  let session = startMixedSession(buildMixedQueue(POOLS, split(0, 1, 0), 5), 5, 0)
  session = advanceMixed(session)
  const tally = summariseMixed(session)
  assert.equal(tally.visited, 1)
  assert.equal(tally.marked, 0, 'a station makes no accuracy claim')
})

test('the summary counts each bank separately and only marks MCQs', () => {
  let session = startMixedSession(
    [
      { kind: 'mcq', id: 'q1' },
      { kind: 'mcq', id: 'q2' },
      { kind: 'practical', id: 'p1' },
      { kind: 'essay', id: 'e1' },
    ],
    1,
    0,
  )
  session = advanceMixed(markMixed(session, { correct: true }))
  session = advanceMixed(markMixed(session, { correct: false }))
  session = advanceMixed(session)
  // The essay is left unreached: the student stopped after the station.
  const tally = summariseMixed(session)
  assert.equal(tally.total, 4)
  assert.equal(tally.visited, 3)
  assert.equal(tally.marked, 2)
  assert.equal(tally.correct, 1)

  const mcq = tally.banks.find((bank) => bank.kind === 'mcq')!
  assert.deepEqual({ total: mcq.total, visited: mcq.visited, marked: mcq.marked, correct: mcq.correct }, { total: 2, visited: 2, marked: 2, correct: 1 })
  const essay = tally.banks.find((bank) => bank.kind === 'essay')!
  assert.deepEqual({ total: essay.total, visited: essay.visited }, { total: 1, visited: 0 })
})

test('ending a sitting stops it, stamps when, and files the item on screen', () => {
  let session = startMixedSession(
    [{ kind: 'mcq', id: 'q1' }, { kind: 'practical', id: 'p1' }, { kind: 'essay', id: 'e1' }],
    3,
    0,
  )
  session = advanceMixed(markMixed(session, { correct: true }))
  // Stopped standing on item two of three.
  session = finishMixed(session, 1_700_000_000_000)

  assert.equal(mixedFinished(session), true)
  assert.equal(session.finishedAt, 1_700_000_000_000)
  assert.equal(session.cursor, 3)
  // The station that was on screen counts — a sitting of three stopped on item
  // two is two items reached, not one.
  assert.equal(summariseMixed(session).visited, 2)
})

test('a sitting is closed only once it has been stopped', () => {
  const fresh = startMixedSession([{ kind: 'mcq', id: 'q1' }], 1, 0)
  assert.equal(mixedClosed(fresh), false, 'a sitting in progress is not closed')

  // Out of items but never stopped: this is what a queue looks like the instant
  // its last item is left, before anything stamps it.
  const runOut = advanceMixed(fresh)
  assert.equal(mixedFinished(runOut), true)
  assert.equal(mixedClosed(runOut), false, 'finished is not the same as closed')

  assert.equal(mixedClosed(finishMixed(fresh, 1_700_000_000_000)), true)
  // The hub asks this of whatever came out of storage, which may be nothing.
  assert.equal(mixedClosed(null), false)
  assert.equal(mixedClosed(undefined), false)
})

test('a closed sitting read back from storage is still closed', () => {
  // The exact round trip the hub's sweep depends on: a document written by a
  // visit that ended must be recognisable as over, or it renders its own report
  // for ever and the hub becomes unreachable.
  const stopped = finishMixed(startMixedSession([{ kind: 'mcq', id: 'q1' }], 1, 0), 1_700_000_000_000)
  const restored = JSON.parse(JSON.stringify(stopped))
  assert.equal(mixedClosed(restored), true)
  assert.equal(mixedFinished(restored), true)
})

test('marking twice replaces the mark rather than adding a second one', () => {
  let session = startMixedSession([{ kind: 'mcq', id: 'q1' }], 1, 0)
  session = markMixed(session, { correct: false })
  session = markMixed(session, { correct: true })
  const tally = summariseMixed(advanceMixed(session))
  assert.equal(tally.marked, 1)
  assert.equal(tally.correct, 1)
})
