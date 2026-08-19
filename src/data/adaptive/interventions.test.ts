import test from 'node:test'
import assert from 'node:assert/strict'
import { defaultAdaptiveConfig } from './config.ts'
import { ageBoosts, multiplierFor, owedTransferChecks, recordError, recordRepair, usedRepairQuestions } from './boosts.ts'
import { checksMisconception, escalatedMisconceptions, misconceptionId, misconceptionsFrom } from './misconceptions.ts'
import { blueprintDeficit, coverageState, debtAfterBlock, EMPTY_COVERAGE_DEBT, groupGap, maxDebtRepayment } from './coverage.ts'
import type { BlueprintNode } from './blueprint.ts'
import { AT, daysAfter, evidence, hoursAfter, item } from './fixtures.ts'

const config = defaultAdaptiveConfig()

// ---- temporary boosts ------------------------------------------------------

test('a wrong answer creates a small, expiring boost — not a permanent label', () => {
  const ledger = recordError({}, {
    conceptId: 'CON-A', questionId: 'q-1', highConfidence: false, repeated: false, at: AT,
  }, config)

  const boost = ledger['CON-A']
  assert.equal(boost.multiplier, config.interventions.boostMultiplier)
  assert.equal(boost.remainingEligibleBlocks, config.interventions.remainingEligibleBlocks)
  assert.equal(boost.transferCheckWithinBlocks, null, 'one ordinary error owes no transfer check')
  assert.equal(boost.reason, 'Included because this concept needs reinforcement.')
})

test('stacked boosts are capped however many errors accumulate', () => {
  let ledger = {}
  for (let index = 0; index < 20; index++) {
    ledger = recordError(ledger, {
      conceptId: 'CON-A', questionId: `q-${index}`, highConfidence: true, repeated: true, at: AT,
    }, config)
  }
  assert.equal(
    (ledger as Record<string, { multiplier: number }>)['CON-A'].multiplier,
    config.interventions.stackedMultiplierCap,
    'a bad session must not turn the next block into a single-concept drill',
  )
})

test('a boost does not fire inside its spacing window', () => {
  const ledger = recordError({}, {
    conceptId: 'CON-A', questionId: 'q-1', highConfidence: false, repeated: false, at: AT,
  }, config)

  assert.equal(multiplierFor(ledger, ['CON-A'], new Date(AT)), 1, 'not re-asked in the same sitting')
  assert.equal(multiplierFor(ledger, ['CON-A'], new Date(hoursAfter(49))), config.interventions.boostMultiplier)
})

test('a high-confidence error also creates a transfer-check obligation', () => {
  // The 1.05x multiplier may not reorder a short block at all, so the obligation
  // is the guarantee and the multiplier is only the preference.
  const ledger = recordError({}, {
    conceptId: 'CON-A', questionId: 'q-1', highConfidence: true, repeated: false, at: AT,
  }, config)
  assert.equal(ledger['CON-A'].transferCheckWithinBlocks, config.interventions.transferCheckWithinBlocks)
  assert.equal(owedTransferChecks(ledger).length, 1)
})

test('a repeated error creates a transfer-check obligation even at normal confidence', () => {
  const ledger = recordError({}, {
    conceptId: 'CON-A', questionId: 'q-1', highConfidence: false, repeated: true, at: AT,
  }, config)
  assert.notEqual(ledger['CON-A'].transferCheckWithinBlocks, null)
})

test('a boost is cancelled by two distinct repairs including one spaced success', () => {
  let ledger = recordError({}, {
    conceptId: 'CON-A', questionId: 'q-1', highConfidence: false, repeated: false, at: AT,
  }, config)

  ledger = recordRepair(ledger, { conceptId: 'CON-A', questionId: 'q-2', at: hoursAfter(1) }, config)
  assert.ok(ledger['CON-A'], 'one immediate repair is not enough')

  ledger = recordRepair(ledger, { conceptId: 'CON-A', questionId: 'q-3', at: hoursAfter(72) }, config)
  assert.equal(ledger['CON-A'], undefined, 'two distinct repairs, one of them spaced, resolves it')
})

test('re-answering the same question correctly does not count as a repair', () => {
  let ledger = recordError({}, {
    conceptId: 'CON-A', questionId: 'q-1', highConfidence: false, repeated: false, at: AT,
  }, config)

  for (let index = 0; index < 5; index++) {
    ledger = recordRepair(ledger, { conceptId: 'CON-A', questionId: 'q-1', at: hoursAfter(72 + index) }, config)
  }
  assert.ok(ledger['CON-A'], 'repeating the question the answer was revealed for proves nothing')
  assert.equal(ledger['CON-A'].repairs, 0)
})

test('the question that exposed a weakness is never reused as its repair', () => {
  const ledger = recordError({}, {
    conceptId: 'CON-A', questionId: 'q-1', highConfidence: false, repeated: false, at: AT,
  }, config)
  assert.ok(usedRepairQuestions(ledger, ['CON-A']).has('q-1'))
})

test('a boost expires only across blocks that could actually have used it', () => {
  const ledger = recordError({}, {
    conceptId: 'CON-A', questionId: 'q-1', highConfidence: false, repeated: false, at: AT,
  }, config)

  let untouched = ledger
  for (let index = 0; index < 10; index++) {
    untouched = ageBoosts(untouched, new Set(['CON-OTHER']))
  }
  assert.ok(untouched['CON-A'], 'blocks outside the concept scope must not spend the boost')
  assert.equal(untouched['CON-A'].remainingEligibleBlocks, config.interventions.remainingEligibleBlocks)

  let aged = ledger
  for (let index = 0; index < config.interventions.remainingEligibleBlocks; index++) {
    aged = ageBoosts(aged, new Set(['CON-A']))
  }
  assert.equal(aged['CON-A'], undefined, 'three eligible blocks spend it')
})

test('a boost never multiplies a concept the item does not assess', () => {
  const ledger = recordError({}, {
    conceptId: 'CON-A', questionId: 'q-1', highConfidence: false, repeated: false, at: AT,
  }, config)
  assert.equal(multiplierFor(ledger, ['CON-B'], new Date(hoursAfter(72))), 1)
})

// ---- misconceptions --------------------------------------------------------

test('one wrong answer tagged to several concepts is one misconception, not several', () => {
  const attemptId = 'attempt-1'
  const events = [
    evidence({ conceptId: 'CON-A', attemptId, correct: false, misconceptionId: misconceptionId('q-1', 1) }),
    evidence({ conceptId: 'CON-B', attemptId, correct: false, misconceptionId: misconceptionId('q-1', 1) }),
  ]
  const records = misconceptionsFrom(events, () => 'Confuses preload with afterload.')
  assert.equal(records.length, 1)
  assert.equal(records[0].count, 1, 'one wrong click is one misconception however many concepts were tagged')
  assert.deepEqual(records[0].conceptIds.sort(), ['CON-A', 'CON-B'])
})

test('choosing the same distractor twice escalates it', () => {
  const events = [0, 1].map((index) =>
    evidence({
      conceptId: 'CON-A', attemptId: `attempt-${index}`, correct: false,
      at: hoursAfter(index * 24), misconceptionId: misconceptionId('q-1', 1),
    }))
  const records = misconceptionsFrom(events, () => 'Confuses preload with afterload.')
  assert.equal(records[0].count, 2)
  assert.equal(escalatedMisconceptions(records, config).length, 1)
})

test('a single confident wrong answer escalates on its own', () => {
  const records = misconceptionsFrom([
    evidence({ conceptId: 'CON-A', correct: false, confidence: 'sure', misconceptionId: misconceptionId('q-1', 1) }),
  ], () => 'Rationale.')
  assert.equal(records[0].confidentCount, 1)
  assert.equal(escalatedMisconceptions(records, config).length, 1)
})

test('correct answers never create misconception records', () => {
  const records = misconceptionsFrom([evidence({ conceptId: 'CON-A', correct: true })], () => '')
  assert.equal(records.length, 0)
})

test('a misconception check must be a different question on the same concept', () => {
  const record = misconceptionsFrom([
    evidence({ conceptId: 'CON-A', correct: false, misconceptionId: misconceptionId('q-1', 1) }),
  ], () => '')[0]

  assert.ok(!checksMisconception(item({ id: 'q-1', mainConceptIds: ['CON-A'] }), record), 'the same item tests recall of the correction')
  assert.ok(checksMisconception(item({ id: 'q-2', mainConceptIds: ['CON-A'] }), record))
  assert.ok(!checksMisconception(item({ id: 'q-3', mainConceptIds: ['CON-Z'] }), record))
})

// ---- coverage and debt -----------------------------------------------------

const nodes: BlueprintNode[] = [
  { conceptId: 'CON-A', label: 'A', groupId: 'GRP-1', groupLabel: 'One', weight: 0.5, overridden: false },
  { conceptId: 'CON-B', label: 'B', groupId: 'GRP-1', groupLabel: 'One', weight: 0.3, overridden: false },
  { conceptId: 'CON-C', label: 'C', groupId: 'GRP-2', groupLabel: 'Two', weight: 0.2, overridden: false },
]

test('coverage is measured in blueprint weight, not questions answered', () => {
  // Two hundred questions on the smallest node still covers only its weight.
  const state = coverageState(nodes, new Map([['CON-C', 200]]))
  assert.ok(Math.abs(state.coveredWeight - 0.2) < 1e-9)
  assert.ok(Math.abs(state.uncoveredWeight - 0.8) < 1e-9)
  assert.equal(state.uncoveredConcepts.length, 2)
  assert.equal(state.uncoveredConcepts[0].conceptId, 'CON-A', 'heaviest uncovered node first')
})

test('a concept counts as covered on its first piece of evidence, not its first success', () => {
  const state = coverageState(nodes, new Map([['CON-A', 1]]))
  assert.ok(state.concepts.find((entry) => entry.conceptId === 'CON-A')?.touched)
})

test('blueprint deficit falls as a concept accumulates evidence', () => {
  const weights = new Map(nodes.map((node) => [node.conceptId, node.weight]))
  const untouched = blueprintDeficit(['CON-A'], weights, new Map())
  const practised = blueprintDeficit(['CON-A'], weights, new Map([['CON-A', 5]]))
  assert.ok(untouched > practised)
  assert.ok(untouched <= 1 && practised >= 0)
})

test('an off-blueprint concept contributes no deficit', () => {
  const weights = new Map(nodes.map((node) => [node.conceptId, node.weight]))
  assert.equal(blueprintDeficit(['CON-OFF'], weights, new Map()), 0)
})

test('the group gap excludes the concept itself, so weakness is never charged twice', () => {
  const nodeByConcept = new Map(nodes.map((node) => [node.conceptId, node]))

  // CON-A alone is untouched; the rest of its group (CON-B) is fully covered.
  // The breadth around CON-A is therefore closed, whatever CON-A's own state is.
  const covered = coverageState(nodes, new Map([['CON-B', 3]]))
  assert.ok(
    groupGap(['CON-A'], nodeByConcept, covered) < 1e-9,
    'a weak concept in a covered topic collects no second penalty',
  )

  const bare = coverageState(nodes, new Map())
  assert.ok(groupGap(['CON-A'], nodeByConcept, bare) > 0, 'genuine breadth gaps still score')
})

test('a group with a single concept has no breadth to report', () => {
  const nodeByConcept = new Map(nodes.map((node) => [node.conceptId, node]))
  assert.equal(groupGap(['CON-C'], nodeByConcept, coverageState(nodes, new Map())), 0)
})

test('debt decays across the rolling window rather than haunting a student', () => {
  let debt = debtAfterBlock(EMPTY_COVERAGE_DEBT, 10, 0, config, AT)
  const first = debt.slots
  for (let index = 0; index < 8; index++) {
    debt = debtAfterBlock(debt, 5, 5, config, daysAfter(index + 1))
  }
  assert.ok(debt.slots < first, 'a bad week does not distort a month')
})

test('debt never exceeds a full block', () => {
  let debt = EMPTY_COVERAGE_DEBT
  for (let index = 0; index < 50; index++) debt = debtAfterBlock(debt, 40, 0, config, AT)
  assert.ok(debt.slots <= config.constraints.maxBlockSize)
})

test('a single block repays at most its share of the rolling window', () => {
  assert.ok(maxDebtRepayment(20, config) <= Math.ceil(20 / config.constraints.rollingDebtWindowBlocks))
  assert.ok(maxDebtRepayment(20, config) >= 1, 'progress is always possible')
})
