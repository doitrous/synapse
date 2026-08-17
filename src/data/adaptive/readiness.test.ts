import test from 'node:test'
import assert from 'node:assert/strict'
import { defaultAdaptiveConfig } from './config.ts'
import {
  assembleReadiness, calibrationError, EMPTY_HELD_OUT, heldOutIds, isHeldOut,
  readinessSentence, scoreReadiness, wilsonInterval, type ReadinessAnswer,
} from './readiness.ts'
import type { BlueprintNode } from './blueprint.ts'
import { AT, daysAfter, item, pool } from './fixtures.ts'

const config = defaultAdaptiveConfig()

const nodes: BlueprintNode[] = ['CON-0', 'CON-1', 'CON-2', 'CON-3'].map((conceptId, index) => ({
  conceptId,
  label: conceptId,
  groupId: `GRP-${index % 2}`,
  groupLabel: `Group ${index % 2}`,
  weight: 0.25,
  overridden: false,
}))

const nodeByConcept = new Map(nodes.map((node) => [node.conceptId, node]))

function readinessPool(count: number) {
  return Array.from({ length: count }, (_, index) =>
    item({
      id: `r-${index}`,
      topic: `Topic ${index % 4}`,
      mainConceptIds: [`CON-${index % 4}`],
    }))
}

// ---- reservation -----------------------------------------------------------

test('an admin flag reserves an item outright', () => {
  const registry = { ...EMPTY_HELD_OUT, itemIds: ['r-1'], autoReserveEnabled: false }
  assert.ok(isHeldOut(item({ id: 'r-1' }), registry, 100, config))
  assert.ok(!isHeldOut(item({ id: 'r-2' }), registry, 100, config))
})

test('auto-reserve is deterministic — the same item is reserved on every rebuild', () => {
  const items = readinessPool(200)
  const first = heldOutIds(items, EMPTY_HELD_OUT, config)
  const second = heldOutIds(items, EMPTY_HELD_OUT, config)
  assert.deepEqual([...first].sort(), [...second].sort(), 'an item drifting in and out of the held-out set is worse than none')
})

test('auto-reserve leaves small pools alone', () => {
  // Reserving from a concept with three questions would leave a blueprint node
  // with nothing left to practise.
  const tiny = Array.from({ length: 3 }, (_, index) => item({ id: `t-${index}`, mainConceptIds: ['CON-0'] }))
  assert.equal(heldOutIds(tiny, EMPTY_HELD_OUT, config).size, 0)
})

test('auto-reserve can be turned off entirely', () => {
  const items = readinessPool(200)
  const off = { ...EMPTY_HELD_OUT, autoReserveEnabled: false }
  assert.equal(heldOutIds(items, off, config).size, 0)
})

test('auto-reserve holds back roughly the configured share', () => {
  const items = readinessPool(400)
  const share = heldOutIds(items, EMPTY_HELD_OUT, config).size / items.length
  assert.ok(Math.abs(share - config.readiness.autoReserveShare) < 0.08, `reserved ${share}`)
})

// ---- assembly --------------------------------------------------------------

function assemble(overrides: Partial<Parameters<typeof assembleReadiness>[0]> = {}) {
  const items = overrides.items ?? readinessPool(400)
  return assembleReadiness({
    items,
    heldOut: overrides.heldOut ?? new Set(items.map((entry) => entry.id)),
    nodes,
    nodeByConcept,
    scope: { universityId: 'UNI-1', yearId: 'OMS_Y3' },
    lastPracticedAt: new Map(),
    config,
    assessmentId: 'ra-1',
    now: new Date(AT),
    ...overrides,
  })
}

test('an assessment draws only from held-out items', () => {
  const items = readinessPool(400)
  const heldOut = new Set(items.slice(0, 100).map((entry) => entry.id))
  const assembly = assemble({ items, heldOut })
  for (const entry of assembly.items) assert.ok(heldOut.has(entry.item.id))
})

test('an assessment is balanced across blueprint groups', () => {
  const assembly = assemble()
  const counts = new Map<string, number>()
  for (const entry of assembly.items) counts.set(entry.groupId, (counts.get(entry.groupId) ?? 0) + 1)

  const expected = config.readiness.assessmentSize / 2
  for (const [groupId, count] of counts) {
    assert.ok(Math.abs(count - expected) <= 1, `${groupId} got ${count} of an expected ${expected}`)
  }
})

test('consecutive items come from different blueprint groups where possible', () => {
  const assembly = assemble()
  let runs = 0
  for (let i = 1; i < assembly.items.length; i++) {
    if (assembly.items[i].groupId === assembly.items[i - 1].groupId) runs += 1
  }
  assert.ok(runs <= 2, `blocked topics let a student settle into one mode of thinking (${runs} adjacencies)`)
})

test('recently practised items are excluded from measurement', () => {
  const items = readinessPool(400)
  const lastPracticedAt = new Map(items.map((entry) => [entry.id, AT]))
  const assembly = assemble({ items, lastPracticedAt })
  assert.equal(assembly.items.length, 0, 'a recently seen item measures recall of that session')

  const old = new Map(items.map((entry) => [entry.id, daysAfter(-90)]))
  assert.ok(assemble({ items, lastPracticedAt: old }).items.length > 0)
})

test('an assessment reports what it could not represent rather than backfilling', () => {
  // Every item sits in one blueprint group; the other has nothing to offer.
  const lopsided = Array.from({ length: 60 }, (_, index) =>
    item({ id: `l-${index}`, mainConceptIds: ['CON-0'] }))
  const assembly = assemble({ items: lopsided, heldOut: new Set(lopsided.map((entry) => entry.id)) })

  const missing = assembly.underRepresented.find((entry) => entry.groupId === 'GRP-1')
  assert.ok(missing, 'the shortfall is named')
  assert.equal(missing?.supplied, 0)
  assert.ok(missing.wanted > 0)

  // The critical part: the empty group's slots are NOT quietly handed to the
  // group that had plenty. A 40-item assessment that became 20 cardiology items
  // is not blueprint-balanced, and a range computed from it would mislead.
  assert.ok(
    assembly.items.length < config.readiness.assessmentSize,
    'an assessment must come up short rather than pretend to be balanced',
  )
  assert.ok(assembly.items.every((entry) => entry.groupId === 'GRP-0'))
})

test('assembly is reproducible from its id', () => {
  assert.deepEqual(
    assemble().items.map((entry) => entry.item.id),
    assemble().items.map((entry) => entry.item.id),
  )
})

test('an out-of-scope item never enters an assessment', () => {
  const items = [
    item({ id: 'r-wrong', years: ['OMS_Y1'], mainConceptIds: ['CON-0'] }),
    ...readinessPool(100),
  ]
  const assembly = assemble({ items, heldOut: new Set(items.map((entry) => entry.id)) })
  assert.ok(!assembly.items.some((entry) => entry.item.id === 'r-wrong'))
})

// ---- scoring ---------------------------------------------------------------

test('the Wilson interval stays inside the unit interval at the extremes', () => {
  const perfect = wilsonInterval(20, 20, 0.9)
  assert.ok(perfect.upper <= 1, 'nobody scores above 100%')
  assert.ok(perfect.lower < 1, 'twenty questions cannot prove certainty')

  const none = wilsonInterval(0, 20, 0.9)
  assert.ok(none.lower >= 0)
  assert.ok(none.upper > 0, 'zero of twenty does not prove zero knowledge')
})

test('the interval narrows as more questions are answered', () => {
  const few = wilsonInterval(8, 10, 0.9)
  const many = wilsonInterval(80, 100, 0.9)
  assert.ok(many.upper - many.lower < few.upper - few.lower)
})

test('no answers at all yields the widest possible range, not a score of zero', () => {
  const interval = wilsonInterval(0, 0, 0.9)
  assert.deepEqual(interval, { lower: 0, upper: 1 })
})

function answers(correct: number, total: number, groupId = 'GRP-0'): ReadinessAnswer[] {
  return Array.from({ length: total }, (_, index) => ({
    questionId: `r-${index}`,
    groupId,
    correct: index < correct,
    seconds: 60,
    omitted: false,
  }))
}

test('a result is reported as a range, never a point score', () => {
  const assembly = assemble()
  const result = scoreReadiness(assembly, answers(30, 40), new Map(), config, 1)
  assert.ok(result.upper > result.lower, 'forty questions cannot support a point estimate')
  assert.ok(readinessSentence(result).includes('between'))
})

test('an omission is excluded from accuracy but reported separately', () => {
  const assembly = assemble()
  const withBlanks: ReadinessAnswer[] = [
    ...answers(10, 20),
    ...Array.from({ length: 10 }, (_, index) => ({
      questionId: `blank-${index}`, groupId: 'GRP-0', correct: false, seconds: null, omitted: true,
    })),
  ]
  const result = scoreReadiness(assembly, withBlanks, new Map(), config, 1)
  assert.equal(result.answered, 20, 'blanks are not folded into the denominator')
  assert.equal(result.omitted, 10, 'nor are they hidden')

  const asWrong = scoreReadiness(assembly, answers(10, 30), new Map(), config, 1)
  assert.ok(result.lower > asWrong.lower, 'counting blanks as wrong would fold pacing into knowledge')
})

test('a topic with too few answers reports no interval rather than a meaningless one', () => {
  const assembly = assemble()
  const sparse: ReadinessAnswer[] = [
    ...answers(15, 20, 'GRP-0'),
    ...answers(1, 2, 'GRP-1'),
  ]
  const result = scoreReadiness(assembly, sparse, new Map([['GRP-1', 'Group 1']]), config, 1)
  const thin = result.groups.find((group) => group.groupId === 'GRP-1')
  assert.equal(thin?.lower, null)
  assert.ok(thin?.insufficient)

  const solid = result.groups.find((group) => group.groupId === 'GRP-0')
  assert.ok(solid?.lower !== null && solid?.upper !== null)
})

test('a result carries the config and blueprint versions it was produced under', () => {
  const result = scoreReadiness(assemble(), answers(30, 40), new Map(), config, 7)
  assert.equal(result.configVersion, config.version)
  assert.equal(result.blueprintVersion, 7)
})

test('with no assessment, the sentence refuses to substitute practice accuracy', () => {
  const sentence = readinessSentence(null)
  assert.ok(sentence.includes('not a substitute'))
  assert.ok(sentence.toLowerCase().includes('oversample'))
})

test('calibration needs both confident and unconfident answers to mean anything', () => {
  assert.equal(calibrationError([]), null)
  assert.equal(calibrationError([{ correct: true, confident: true, omitted: false }]), null, 'no contrast, no calibration')

  const wellCalibrated = calibrationError([
    { correct: true, confident: true, omitted: false },
    { correct: true, confident: true, omitted: false },
    { correct: false, confident: false, omitted: false },
    { correct: false, confident: false, omitted: false },
  ])
  const confidentlyWrong = calibrationError([
    { correct: false, confident: true, omitted: false },
    { correct: false, confident: true, omitted: false },
    { correct: true, confident: false, omitted: false },
    { correct: true, confident: false, omitted: false },
  ])
  assert.ok((wellCalibrated ?? 1) < (confidentlyWrong ?? 0), 'being sure and wrong is the worse calibration')
})

test('a readiness assembly and an adaptive pool never overlap', () => {
  // The separation the whole product rests on, stated as a test.
  const items = [...readinessPool(200), ...pool(100)]
  const held = heldOutIds(items, EMPTY_HELD_OUT, config)
  const assembly = assemble({ items, heldOut: held })
  for (const entry of assembly.items) {
    assert.ok(held.has(entry.item.id), 'every assessed item is reserved, so practice can never have used it')
  }
})
