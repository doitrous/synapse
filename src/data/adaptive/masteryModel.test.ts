import test from 'node:test'
import assert from 'node:assert/strict'
import { defaultAdaptiveConfig } from './config.ts'
import {
  betaHalfWidth, conceptStatus, difficultyCredit, evidenceWeight, isAbnormallyFast,
  rebuildConcept, reviewUrgencyDays,
} from './masteryModel.ts'
import { rawWrongAttempts } from './evidenceLedger.ts'
import { AT, daysAfter, evidence, hoursAfter, wrongRun } from './fixtures.ts'

const config = defaultAdaptiveConfig()

test('three wrong answers on one concept are three attempts and one weak concept', () => {
  // The rule the whole product hangs on. Three questions, all mainly assessing
  // CON-A, must not become three weaknesses.
  const events = wrongRun('CON-A', 3)
  const state = rebuildConcept('CON-A', events, config, new Date(daysAfter(1)))

  assert.equal(rawWrongAttempts(events), 3, 'all three mistakes are kept')
  assert.equal(state.rawWrong, 3)
  assert.equal(state.distinctItems, 3)
  assert.equal(state.status, 'weak')

  const weakConcepts = new Set(
    [state].filter((entry) => entry.status === 'weak').map((entry) => entry.conceptId),
  )
  assert.equal(weakConcepts.size, 1, 'three wrong attempts produce exactly one weak concept')
})

test('one ordinary error reaches attention, never weak', () => {
  const state = rebuildConcept('CON-A', wrongRun('CON-A', 1), config, new Date(daysAfter(1)))
  assert.equal(state.status, 'attention', 'a single error triggers follow-up, not a permanent label')
})

test('two high-confidence errors are enough for weak on their own', () => {
  const events = wrongRun('CON-A', 2).map((event) => ({ ...event, confidence: 'sure' as const }))
  const state = rebuildConcept('CON-A', events, config, new Date(daysAfter(1)))
  assert.equal(state.highConfidenceErrors, 2)
  assert.equal(state.status, 'weak')
})

test('one lucky correct answer is unmeasured, not secure', () => {
  const state = rebuildConcept('CON-A', [evidence({ conceptId: 'CON-A' })], config)
  assert.equal(state.distinctItems, 1)
  assert.equal(state.status, 'unmeasured', 'below the distinct-item floor nothing may be asserted')
})

test('secure needs the threshold, four distinct items and a spaced success', () => {
  const sameSitting = Array.from({ length: 4 }, (_, index) =>
    evidence({
      conceptId: 'CON-A', questionId: `q-${index}`, attemptId: `a-${index}`, at: hoursAfter(index),
    }),
  )
  const crammed = rebuildConcept('CON-A', sameSitting, config, new Date(daysAfter(1)))
  assert.notEqual(crammed.status, 'secure', 'four correct answers in one sitting is not retention')

  const spaced = [
    ...sameSitting,
    evidence({ conceptId: 'CON-A', questionId: 'q-later', attemptId: 'a-later', at: hoursAfter(72) }),
  ]
  const state = rebuildConcept('CON-A', spaced, config, new Date(hoursAfter(73)))
  assert.equal(state.spacedSuccesses, 1)
  assert.equal(state.status, 'secure')
})

test('difficulty credit is clamped to the configured band', () => {
  for (const difficulty of ['Easy', 'Moderate', 'Hard', 'Challenging']) {
    const credit = difficultyCredit(difficulty, config)
    assert.ok(credit >= config.mastery.minDifficultyCredit, `${difficulty} above floor`)
    assert.ok(credit <= config.mastery.maxDifficultyCredit, `${difficulty} below ceiling`)
  }
  assert.ok(difficultyCredit('Challenging', config) > difficultyCredit('Easy', config))
  // An unrecognised band sits at neutral rather than guessing in either direction.
  const neutral = (config.mastery.minDifficultyCredit + config.mastery.maxDifficultyCredit) / 2
  assert.equal(difficultyCredit('Unknown band', config), neutral)
})

test('a repeat after the answer was revealed contributes at most a quarter of normal weight', () => {
  const fresh = evidenceWeight(evidence({ conceptId: 'CON-A' }), config)
  const exposed = evidenceWeight(evidence({ conceptId: 'CON-A', exposure: 'repeat-after-reveal' }), config)
  assert.ok(exposed <= fresh * 0.25 + 1e-9, 'exposed repeats are capped at 25% of normal evidence')
})

test('a blank is not a wrong answer', () => {
  const blank = evidence({ conceptId: 'CON-A', outcome: 'blank', correct: null })
  const wrong = evidence({ conceptId: 'CON-A', correct: false })
  assert.ok(evidenceWeight(blank, config) < evidenceWeight(wrong, config))

  const state = rebuildConcept('CON-A', [blank], config)
  assert.equal(state.rawWrong, 0, 'a blank is a separate outcome, not a selected wrong answer')
  assert.equal(state.attempts, 0, 'nothing was marked against a key')
})

test('an abnormally fast correct answer is downweighted as a possible guess', () => {
  const fast = evidence({ conceptId: 'CON-A', seconds: 5, expectedSeconds: 60 })
  const normal = evidence({ conceptId: 'CON-A', seconds: 55, expectedSeconds: 60 })
  assert.ok(isAbnormallyFast(fast, config))
  assert.ok(!isAbnormallyFast(normal, config))
  assert.ok(evidenceWeight(fast, config) < evidenceWeight(normal, config))
})

test('an abnormally fast wrong answer keeps the raw error but moves the estimate less', () => {
  const fast = evidence({ conceptId: 'CON-A', correct: false, seconds: 5, expectedSeconds: 60 })
  const state = rebuildConcept('CON-A', [fast], config)
  assert.equal(state.rawWrong, 1, 'the mistake is still recorded in full')
  const careful = evidence({ conceptId: 'CON-A', correct: false, seconds: 55, expectedSeconds: 60 })
  assert.ok(evidenceWeight(fast, config) < evidenceWeight(careful, config))
})

test('a wrong answer the student was sure of carries the most weight', () => {
  const sure = evidenceWeight(evidence({ conceptId: 'CON-A', correct: false, confidence: 'sure' }), config)
  const unsure = evidenceWeight(evidence({ conceptId: 'CON-A', correct: false, confidence: 'unsure' }), config)
  assert.ok(sure > unsure, 'high-confidence errors are the strongest misconception evidence')
})

test('a secondary concept moves less than the concept the item is for', () => {
  const main = evidenceWeight(evidence({ conceptId: 'CON-A', role: 'main' }), config)
  const secondary = evidenceWeight(evidence({ conceptId: 'CON-A', role: 'secondary' }), config)
  assert.ok(secondary < main)
})

test('evidence decays toward the prior as time passes', () => {
  const strong = Array.from({ length: 6 }, (_, index) =>
    evidence({ conceptId: 'CON-A', questionId: `q-${index}`, attemptId: `a-${index}`, at: hoursAfter(index * 24) }),
  )
  const fresh = rebuildConcept('CON-A', strong, config, new Date(daysAfter(6)))

  const stale = [
    ...strong,
    // One more correct answer a long time later: the decay pulls the earlier
    // evidence back toward the prior, so certainty must fall, not rise.
    evidence({ conceptId: 'CON-A', questionId: 'q-late', attemptId: 'a-late', at: daysAfter(400) }),
  ]
  const aged = rebuildConcept('CON-A', stale, config, new Date(daysAfter(401)))
  assert.ok(aged.uncertainty > fresh.uncertainty, 'a year later, the same concept is less certain')
})

test('uncertainty narrows as distinct evidence accumulates', () => {
  const one = rebuildConcept('CON-A', [evidence({ conceptId: 'CON-A' })], config)
  const many = rebuildConcept('CON-A', Array.from({ length: 8 }, (_, index) =>
    evidence({ conceptId: 'CON-A', questionId: `q-${index}`, attemptId: `a-${index}`, at: hoursAfter(index) }),
  ), config)
  assert.ok(many.uncertainty < one.uncertainty)
  assert.ok(betaHalfWidth(1, 1) > betaHalfWidth(50, 50))
})

test('rebuilding is pure and order-independent', () => {
  const events = wrongRun('CON-A', 3)
  const forwards = rebuildConcept('CON-A', events, config, new Date(daysAfter(1)))
  const backwards = rebuildConcept('CON-A', [...events].reverse(), config, new Date(daysAfter(1)))
  assert.deepEqual(forwards, backwards, 'a caller cannot corrupt decay by passing an unsorted array')
})

test('evidence for other concepts is ignored', () => {
  const mixed = [evidence({ conceptId: 'CON-A' }), evidence({ conceptId: 'CON-B', correct: false })]
  const state = rebuildConcept('CON-A', mixed, config)
  assert.equal(state.rawWrong, 0)
})

test('a previously secure concept becomes review-due once its date passes', () => {
  const events = [
    ...Array.from({ length: 4 }, (_, index) =>
      evidence({ conceptId: 'CON-A', questionId: `q-${index}`, attemptId: `a-${index}`, at: hoursAfter(index) })),
    evidence({ conceptId: 'CON-A', questionId: 'q-later', attemptId: 'a-later', at: hoursAfter(72) }),
  ]
  const secure = rebuildConcept('CON-A', events, config, new Date(hoursAfter(73)))
  assert.equal(secure.status, 'secure')

  const later = rebuildConcept('CON-A', events, config, new Date(daysAfter(60)))
  assert.equal(later.status, 'review-due')
  assert.ok((reviewUrgencyDays(later, new Date(daysAfter(60))) ?? 0) > 0)
})

test('status thresholds are read from config, not hardcoded', () => {
  const strict = defaultAdaptiveConfig()
  strict.statuses.secureDistinctItems = 3
  // Exactly three distinct items, one of them spaced: enough under the pilot
  // threshold, not enough under the safer operational default.
  const events = [
    ...Array.from({ length: 2 }, (_, index) =>
      evidence({ conceptId: 'CON-A', questionId: `q-${index}`, attemptId: `a-${index}`, at: hoursAfter(index) })),
    evidence({ conceptId: 'CON-A', questionId: 'q-later', attemptId: 'a-later', at: hoursAfter(72) }),
  ]
  // The pilot's three-distinct-item variant must be reachable by config alone.
  assert.equal(rebuildConcept('CON-A', events, strict, new Date(hoursAfter(73))).status, 'secure')
  assert.notEqual(rebuildConcept('CON-A', events, config, new Date(hoursAfter(73))).status, 'secure')
})

test('a concept with no evidence reports unmeasured with the widest interval', () => {
  const state = rebuildConcept('CON-NEW', [], config)
  assert.equal(state.status, 'unmeasured')
  assert.equal(state.distinctItems, 0)
  assert.equal(state.lastSeen, null)
  assert.ok(state.uncertainty > 0.4, 'no evidence must not read as a confident estimate')
})

test('conceptStatus never claims weak below the distinct-item floor', () => {
  const status = conceptStatus({
    conceptId: 'CON-A', alpha: 1, beta: 9, mean: 0.1, uncertainty: 0.3,
    distinctItems: 1, attempts: 1, rawWrong: 1, highConfidenceErrors: 0, spacedSuccesses: 0,
    responseTimeRatio: null, lastSeen: AT, nextReviewAt: null, modelVersion: 1,
  }, config)
  assert.equal(status, 'attention', 'one item cannot support a weakness claim however bad the mean')
})
