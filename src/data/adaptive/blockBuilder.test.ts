import test from 'node:test'
import assert from 'node:assert/strict'
import { ALLOCATION_NEEDS, defaultAdaptiveConfig, sharesForHorizon } from './config.ts'
import { apportion, clampBlockSize, planAllocation } from './allocation.ts'
import { EMPTY_COVERAGE_DEBT, coverageState, debtAfterBlock } from './coverage.ts'
import { buildBlock, mulberry32, quotaDeviations, seedFrom, type BuildInput } from './blockBuilder.ts'
import { explainBlock } from './explain.ts'
import type { BlueprintNode } from './blueprint.ts'
import type { ScoringContext } from './priority.ts'
import type { ConceptState } from './masteryModel.ts'
import { AT, item, pool } from './fixtures.ts'

const config = defaultAdaptiveConfig()

function nodes(conceptIds: string[]): BlueprintNode[] {
  return conceptIds.map((conceptId, index) => ({
    conceptId,
    label: conceptId,
    groupId: `GRP-${index % 4}`,
    groupLabel: `Group ${index % 4}`,
    weight: 1 / conceptIds.length,
    overridden: false,
  }))
}

function context(conceptIds: string[], overrides: Partial<ScoringContext> = {}): ScoringContext {
  const blueprint = nodes(conceptIds)
  const distinct = new Map<string, number>()
  return {
    config,
    states: new Map(),
    blueprintWeights: new Map(blueprint.map((node) => [node.conceptId, node.weight])),
    nodeByConcept: new Map(blueprint.map((node) => [node.conceptId, node])),
    coverage: coverageState(blueprint, distinct),
    distinctItemsByConcept: distinct,
    boosts: {},
    exposureByQuestion: new Map(),
    recentConceptIds: new Set(),
    recentTopics: new Set(),
    fatigue: 0,
    now: new Date(AT),
    ...overrides,
  }
}

/**
 * A student partway through: some concepts weak, some due, some secure, some
 * untouched. Needed wherever a test is about quota filling rather than about
 * what happens when a need cannot be served at all.
 */
function mixedStates(conceptIds: string[]): Map<string, ConceptState> {
  const states = new Map<string, ConceptState>()
  conceptIds.forEach((conceptId, index) => {
    const base = {
      conceptId, attempts: 6, rawWrong: 2, highConfidenceErrors: 0, spacedSuccesses: 1,
      responseTimeRatio: 1, lastSeen: AT, modelVersion: config.version,
    }
    if (index % 4 === 0) {
      states.set(conceptId, {
        ...base, alpha: 2, beta: 8, mean: 0.2, uncertainty: 0.24, distinctItems: 4,
        nextReviewAt: null, status: 'weak',
      })
    } else if (index % 4 === 1) {
      states.set(conceptId, {
        ...base, alpha: 8, beta: 2, mean: 0.8, uncertainty: 0.22, distinctItems: 5,
        // Dated in the past, so these are the concepts due for review.
        nextReviewAt: new Date(new Date(AT).getTime() - 86_400_000).toISOString(), status: 'review-due',
      })
    } else if (index % 4 === 2) {
      states.set(conceptId, {
        ...base, alpha: 9, beta: 2, mean: 0.82, uncertainty: 0.2, distinctItems: 6,
        nextReviewAt: new Date(new Date(AT).getTime() + 14 * 86_400_000).toISOString(), status: 'secure',
      })
    }
    // Every fourth concept is left with no state at all — genuinely unmeasured,
    // which is what the uncertainty and coverage needs are there to buy.
  })
  return states
}

function buildInput(overrides: Partial<BuildInput> = {}): BuildInput {
  const items = overrides.items ?? pool(200)
  const conceptIds = [...new Set(items.flatMap((entry) => entry.conceptIds))]
  const size = overrides.size ?? 20
  const ctx = overrides.context ?? context(conceptIds)
  const shares = sharesForHorizon(config, null)
  return {
    blockId: 'block-test-1',
    items,
    context: ctx,
    targets: planAllocation(size, shares, EMPTY_COVERAGE_DEBT, config).targets,
    size,
    mode: 'tutor',
    scope: { universityId: 'UNI-1', yearId: 'OMS_Y3' },
    heldOutIds: new Set(),
    excludedQuestionIds: new Set(),
    debtBefore: 0,
    debtAfter: 0,
    blueprintVersion: 1,
    createdAt: AT,
    ...overrides,
  }
}

// ---- allocation ------------------------------------------------------------

test('every supported block size apportions exactly, losing and inventing nothing', () => {
  for (let size = config.constraints.minBlockSize; size <= config.constraints.maxBlockSize; size++) {
    const { targets } = apportion(size, config.defaultShares)
    const total = ALLOCATION_NEEDS.reduce((sum, need) => sum + targets[need], 0)
    assert.equal(total, size, `size ${size} must apportion to exactly ${size} slots`)
    for (const need of ALLOCATION_NEEDS) {
      assert.ok(targets[need] >= 0, `size ${size}: ${need} cannot be negative`)
    }
  }
})

test('apportionment stays within one slot of the exact share at every size', () => {
  for (let size = config.constraints.minBlockSize; size <= config.constraints.maxBlockSize; size++) {
    const { targets } = apportion(size, config.defaultShares)
    for (const need of ALLOCATION_NEEDS) {
      const exact = size * config.defaultShares[need]
      assert.ok(
        Math.abs(targets[need] - exact) < 1,
        `size ${size}: ${need} got ${targets[need]} against an exact ${exact.toFixed(2)}`,
      )
    }
  }
})

test('apportionment is deterministic — the same size always yields the same targets', () => {
  for (let size = 20; size <= 40; size++) {
    assert.deepEqual(apportion(size, config.defaultShares), apportion(size, config.defaultShares))
  }
})

test('coverage debt is repaid gradually, never all in one block', () => {
  const debt = { slots: 12, blocks: 3, updatedAt: AT }
  const plan = planAllocation(20, config.defaultShares, debt, config)
  assert.ok(plan.debtRepaid > 0, 'some debt is repaid')
  assert.ok(plan.debtRepaid <= 5, 'a large debt cannot consume a whole block')
  const total = ALLOCATION_NEEDS.reduce((sum, need) => sum + plan.targets[need], 0)
  assert.equal(total, 20, 'repayment moves slots between needs, it does not create them')
})

test('debt repayment never comes out of spaced review', () => {
  const debt = { slots: 20, blocks: 4, updatedAt: AT }
  const baseline = planAllocation(30, config.defaultShares, EMPTY_COVERAGE_DEBT, config)
  const repaying = planAllocation(30, config.defaultShares, debt, config)
  assert.equal(repaying.targets.review, baseline.targets.review, 'a review that slips is a review that decays')
})

test('a block that under-serves coverage accrues debt, and repaying it clears the debt', () => {
  const accrued = debtAfterBlock(EMPTY_COVERAGE_DEBT, 7, 3, config, AT)
  assert.ok(accrued.slots > 0, 'the shortfall is carried forward, not rounded away')
  const repaid = debtAfterBlock(accrued, 7, 9, config, AT)
  assert.ok(repaid.slots < accrued.slots, 'over-serving coverage pays the debt down')
})

test('block size is clamped to the supported range', () => {
  assert.equal(clampBlockSize(5, config), 20)
  assert.equal(clampBlockSize(200, config), 40)
  assert.equal(clampBlockSize(27, config), 27)
})

// ---- hard gates ------------------------------------------------------------

test('an out-of-scope item can never enter a block, however well it would score', () => {
  const wrongYear = item({ id: 'q-other-year', years: ['OMS_Y1'], mainConceptIds: ['CON-0'] })
  const input = buildInput({ items: [wrongYear, ...pool(60)], size: 20 })
  const block = buildBlock(input)
  assert.ok(!block.slots.some((slot) => slot.item.id === 'q-other-year'))
})

test('an item restricted with questionOnlyFor is excluded unless the student matches', () => {
  const restricted = item({ id: 'q-restricted', onlyFor: ['OMS_Y6'], mainConceptIds: ['CON-0'] })
  const excluded = buildBlock(buildInput({ items: [restricted, ...pool(60)] }))
  assert.ok(!excluded.slots.some((slot) => slot.item.id === 'q-restricted'))

  const included = buildBlock(buildInput({
    items: [restricted, ...pool(60)],
    scope: { universityId: 'UNI-1', yearId: 'OMS_Y6' },
  }))
  assert.ok(included.slots.length > 0)
})

test('held-out readiness items never appear in an adaptive block', () => {
  const items = pool(80)
  const heldOutIds = new Set(items.slice(0, 30).map((entry) => entry.id))
  const block = buildBlock(buildInput({ items, heldOutIds, size: 20 }))
  for (const slot of block.slots) {
    assert.ok(!heldOutIds.has(slot.item.id), `${slot.item.id} was reserved for measurement`)
  }
})

test('a question already used to repair a concept is not offered again', () => {
  const items = pool(80)
  const excludedQuestionIds = new Set([items[0].id, items[1].id])
  const block = buildBlock(buildInput({ items, excludedQuestionIds }))
  for (const slot of block.slots) assert.ok(!excludedQuestionIds.has(slot.item.id))
})

test('an item at its exposure cap is not selected while fresh items remain', () => {
  const items = pool(80)
  const exposureByQuestion = new Map(items.slice(0, 10).map((entry) => [entry.id, 3]))
  const conceptIds = [...new Set(items.flatMap((entry) => entry.conceptIds))]
  const block = buildBlock(buildInput({
    items,
    context: context(conceptIds, { exposureByQuestion }),
  }))
  for (const slot of block.slots) {
    assert.ok((exposureByQuestion.get(slot.item.id) ?? 0) === 0, 'over-exposed items are excluded')
  }
})

// ---- block constraints -----------------------------------------------------

test('every supported block size builds a full block from an adequate pool', () => {
  for (let size = 20; size <= 40; size++) {
    const block = buildBlock(buildInput({ blockId: `block-${size}`, size, items: pool(300) }))
    assert.equal(block.slots.length, size, `size ${size} produced ${block.slots.length} slots`)
    assert.equal(new Set(block.slots.map((slot) => slot.item.id)).size, size, `size ${size} repeated an item`)
  }
})

test('no more than two items in a block are dominated by one concept', () => {
  for (let size = 20; size <= 40; size += 4) {
    const block = buildBlock(buildInput({ blockId: `cap-${size}`, size, items: pool(300) }))
    const counts = new Map<string, number>()
    for (const slot of block.slots) {
      const primary = slot.item.mainConceptIds[0]
      if (primary) counts.set(primary, (counts.get(primary) ?? 0) + 1)
    }
    for (const [conceptId, count] of counts) {
      assert.ok(count <= config.constraints.maxItemsPerPrimaryConcept, `${conceptId} appeared ${count} times at size ${size}`)
    }
  }
})

test('no more than three consecutive items come from one topic', () => {
  for (let size = 20; size <= 40; size += 5) {
    const block = buildBlock(buildInput({ blockId: `run-${size}`, size, items: pool(300) }))
    let run = 1
    for (let i = 1; i < block.slots.length; i++) {
      run = block.slots[i].item.topic === block.slots[i - 1].item.topic ? run + 1 : 1
      assert.ok(run <= config.constraints.maxConsecutiveSameTopic, `a run of ${run} at size ${size}`)
    }
  }
})

test('the unseen floor is met when the pool can supply it', () => {
  const items = pool(300)
  const exposureByQuestion = new Map(items.slice(0, 100).map((entry) => [entry.id, 1]))
  const conceptIds = [...new Set(items.flatMap((entry) => entry.conceptIds))]
  const block = buildBlock(buildInput({
    items, size: 30, context: context(conceptIds, { exposureByQuestion }),
  }))
  assert.ok(block.unseenShare >= config.constraints.minUnseenShare, `unseen share was ${block.unseenShare}`)
})

test('quotas are met within tolerance when the pool can serve every need', () => {
  const items = pool(300)
  const conceptIds = [...new Set(items.flatMap((entry) => entry.conceptIds))]
  const block = buildBlock(buildInput({
    size: 30, items, context: context(conceptIds, { states: mixedStates(conceptIds) }),
  }))
  assert.equal(block.redistributions.length, 0, 'every need was servable, so nothing was redistributed')
  for (const deviation of quotaDeviations(block, config)) {
    assert.ok(deviation.within, `${deviation.need}: wanted ${deviation.target}, served ${deviation.served}`)
  }
})

test('a need nothing can serve hands its slots to the needs that can', () => {
  // A student with no weak concepts and nothing due: two of the four needs have
  // no candidates at all. The block must still be full, and must say what it did.
  const items = pool(300)
  const block = buildBlock(buildInput({ size: 30, items }))

  assert.equal(block.slots.length, 30, 'an unservable need must not leave the block short')

  const unservable = block.shortages.filter((shortage) => shortage.kind === 'need-unservable')
  assert.ok(unservable.length > 0, 'the shortage is recorded, not hidden')
  assert.ok(unservable.some((shortage) => shortage.need === 'weakness'))

  const moved = block.redistributions.reduce((sum, entry) => sum + entry.slots, 0)
  assert.ok(moved > 0, 'the freed slots went somewhere explicit')
  assert.equal(
    ALLOCATION_NEEDS.reduce((sum, need) => sum + block.targets[need], 0),
    30,
    'redistribution moves slots between needs; it never creates or loses them',
  )
  for (const deviation of quotaDeviations(block, config)) {
    assert.ok(deviation.within, `${deviation.need}: wanted ${deviation.target}, served ${deviation.served}`)
  }
})

// ---- determinism -----------------------------------------------------------

test('the same block id reproduces the identical block', () => {
  const first = buildBlock(buildInput({ blockId: 'block-repro', items: pool(300), size: 25 }))
  const second = buildBlock(buildInput({ blockId: 'block-repro', items: pool(300), size: 25 }))
  assert.deepEqual(
    first.slots.map((slot) => slot.item.id),
    second.slots.map((slot) => slot.item.id),
    'a stored seed must reproduce the exact block a student saw',
  )
  assert.equal(first.seed, second.seed)
})

test('different block ids produce different blocks from the same pool', () => {
  const a = buildBlock(buildInput({ blockId: 'block-a', items: pool(300), size: 25 }))
  const b = buildBlock(buildInput({ blockId: 'block-b', items: pool(300), size: 25 }))
  assert.notDeepEqual(a.slots.map((slot) => slot.item.id), b.slots.map((slot) => slot.item.id))
})

test('the seeded generator is stable and stays in range', () => {
  const draws = Array.from({ length: 200 }, mulberry32(seedFrom('block-x')))
  assert.deepEqual(draws, Array.from({ length: 200 }, mulberry32(seedFrom('block-x'))))
  for (const draw of draws) {
    assert.ok(draw >= 0 && draw < 1)
  }
})

// ---- shortage handling -----------------------------------------------------

test('a pool too small to satisfy the constraints relaxes them in the documented order', () => {
  // Eight items, one topic, one concept: no legal 20-item block exists.
  const cramped = Array.from({ length: 8 }, (_, index) =>
    item({ id: `q-tight-${index}`, topic: 'Heart failure', mainConceptIds: ['CON-0'] }))
  const block = buildBlock(buildInput({ items: cramped, size: 20, context: context(['CON-0']) }))

  assert.ok(block.shortages.length > 0, 'a shortage must be raised, never hidden')
  const order = config.relaxationOrder.filter((constraint) => block.relaxed.includes(constraint))
  assert.deepEqual(block.relaxed, order, 'relaxation follows the published order')
  assert.ok(block.slots.length <= cramped.length, 'the builder never invents items to look complete')
})

test('a shortage names the constraint and how many slots were outstanding', () => {
  const cramped = Array.from({ length: 5 }, (_, index) =>
    item({ id: `q-few-${index}`, topic: 'Heart failure', mainConceptIds: ['CON-0'] }))
  const block = buildBlock(buildInput({ items: cramped, size: 20, context: context(['CON-0']) }))
  for (const shortage of block.shortages) {
    assert.ok(config.relaxationOrder.includes(shortage.constraint))
    assert.ok(shortage.slotsOutstanding > 0)
  }
})

test('an empty pool produces an empty block rather than a crash', () => {
  const block = buildBlock(buildInput({ items: [], size: 20, context: context([]) }))
  assert.equal(block.slots.length, 0)
  assert.equal(block.unseenShare, 0)
})

// ---- credits and explanation ----------------------------------------------

test('one question serving several needs consumes one slot and is credited for each', () => {
  const block = buildBlock(buildInput({ size: 20, items: pool(300) }))
  const servedTotal = ALLOCATION_NEEDS.reduce((sum, need) => sum + block.served[need], 0)
  assert.equal(servedTotal, block.slots.length, 'slots consumed must equal items chosen')

  const creditedTotal = ALLOCATION_NEEDS.reduce((sum, need) => sum + block.credited[need], 0)
  assert.ok(creditedTotal >= servedTotal, 'credits may exceed slots — one item can serve several needs')
})

test('every slot carries a student-facing reason and a full score breakdown', () => {
  const block = explainBlock(buildBlock(buildInput({ size: 20, items: pool(300) })))
  for (const slot of block.slots) {
    assert.ok(slot.reason.length > 0, `slot ${slot.index} has no reason`)
    assert.ok(slot.reason.trim().endsWith('.'), 'reasons are sentences, not labels')
    for (const term of Object.keys(slot.score.terms)) {
      assert.equal(typeof slot.score.terms[term as keyof typeof slot.score.terms], 'number')
    }
  }
})

test('the block records the config and blueprint versions it was built under', () => {
  const block = buildBlock(buildInput())
  assert.equal(block.configVersion, config.version)
  assert.equal(block.blueprintVersion, 1)
})
