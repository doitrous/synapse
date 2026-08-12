import test from 'node:test'
import assert from 'node:assert/strict'
import {
  recordEvidence, masteryBand, summarise, weakest, accuracy, isMarkedSource,
  CONFIDENT_ATTEMPTS, type MasteryLedger,
} from './mastery.ts'

const AT = '2026-08-12T10:00:00.000Z'
const LATER = '2026-08-12T11:00:00.000Z'

test('a marked answer records an attempt against every concept the item assesses', () => {
  const ledger = recordEvidence({}, { conceptIds: ['CON-A', 'CON-B'], source: 'case', correct: true, at: AT })
  assert.deepEqual(ledger['CON-A'], { conceptId: 'CON-A', attempts: 1, correct: 1, encounters: 0, lastSeen: AT })
  assert.deepEqual(ledger['CON-B'], { conceptId: 'CON-B', attempts: 1, correct: 1, encounters: 0, lastSeen: AT })
})

test('a wrong answer is still evidence — it counts as an attempt and not a correct', () => {
  const ledger = recordEvidence({}, { conceptIds: ['CON-A'], source: 'interpretation', correct: false, at: AT })
  assert.equal(ledger['CON-A'].attempts, 1)
  assert.equal(ledger['CON-A'].correct, 0)
})

test('a station is an encounter, not an attempt, because the student ticked it themselves', () => {
  const ledger = recordEvidence({}, { conceptIds: ['CON-A'], source: 'station', correct: true, at: AT })
  assert.equal(ledger['CON-A'].attempts, 0, 'a self-scored station must not claim a marked attempt')
  assert.equal(ledger['CON-A'].correct, 0)
  assert.equal(ledger['CON-A'].encounters, 1)
})

test('recording is pure — the ledger passed in is not mutated', () => {
  const before: MasteryLedger = {}
  const after = recordEvidence(before, { conceptIds: ['CON-A'], source: 'question', correct: true, at: AT })
  assert.deepEqual(before, {}, 'the original ledger must be untouched')
  assert.notEqual(before, after)
})

test('an item naming the same concept twice is one piece of evidence', () => {
  const ledger = recordEvidence({}, { conceptIds: ['CON-A', 'CON-A', ' CON-A '], source: 'case', correct: true, at: AT })
  assert.equal(ledger['CON-A'].attempts, 1)
})

test('an item with no assessed concept records nothing at all', () => {
  const ledger = recordEvidence({}, { conceptIds: ['', '  '], source: 'case', correct: true, at: AT })
  assert.deepEqual(ledger, {})
})

test('evidence accumulates and the timestamp follows the most recent', () => {
  let ledger = recordEvidence({}, { conceptIds: ['CON-A'], source: 'case', correct: true, at: AT })
  ledger = recordEvidence(ledger, { conceptIds: ['CON-A'], source: 'question', correct: false, at: LATER })
  assert.equal(ledger['CON-A'].attempts, 2)
  assert.equal(ledger['CON-A'].correct, 1)
  assert.equal(ledger['CON-A'].lastSeen, LATER)
})

test('marked sources are the ones with a key; a station is not', () => {
  assert.ok(isMarkedSource('question') && isMarkedSource('case') && isMarkedSource('interpretation'))
  assert.equal(isMarkedSource('station'), false)
})

test('accuracy is null until something has been marked', () => {
  const ledger = recordEvidence({}, { conceptIds: ['CON-A'], source: 'station', at: AT })
  assert.equal(accuracy(ledger['CON-A']), null)
})

test('a concept met only on a station is practised, not measured', () => {
  const ledger = recordEvidence({}, { conceptIds: ['CON-A'], source: 'station', at: AT })
  assert.equal(masteryBand(ledger['CON-A']), 'practised')
})

test('a concept with no evidence at all is unseen', () => {
  assert.equal(masteryBand(undefined), 'unseen')
})

test('one right answer is not mastery', () => {
  const ledger = recordEvidence({}, { conceptIds: ['CON-A'], source: 'case', correct: true, at: AT })
  assert.equal(masteryBand(ledger['CON-A']), 'developing', 'a single attempt cannot reach secure')
})

test('a concept becomes secure only on repeated correct answers', () => {
  let ledger: MasteryLedger = {}
  for (let i = 0; i < CONFIDENT_ATTEMPTS; i++) {
    ledger = recordEvidence(ledger, { conceptIds: ['CON-A'], source: 'case', correct: true, at: AT })
  }
  assert.equal(masteryBand(ledger['CON-A']), 'secure')
})

test('under half right is shaky', () => {
  let ledger = recordEvidence({}, { conceptIds: ['CON-A'], source: 'case', correct: true, at: AT })
  ledger = recordEvidence(ledger, { conceptIds: ['CON-A'], source: 'case', correct: false, at: AT })
  ledger = recordEvidence(ledger, { conceptIds: ['CON-A'], source: 'case', correct: false, at: AT })
  assert.equal(masteryBand(ledger['CON-A']), 'shaky')
})

test('the summary separates what was measured from what was only practised', () => {
  let ledger = recordEvidence({}, { conceptIds: ['CON-A'], source: 'case', correct: true, at: AT })
  ledger = recordEvidence(ledger, { conceptIds: ['CON-A'], source: 'case', correct: false, at: AT })
  ledger = recordEvidence(ledger, { conceptIds: ['CON-B'], source: 'station', at: AT })
  assert.deepEqual(summarise(ledger), { measured: 1, practisedOnly: 1, attempts: 2, correct: 1, accuracy: 0.5 })
})

test('an empty ledger reports no accuracy rather than zero', () => {
  assert.equal(summarise({}).accuracy, null, 'zero accuracy would read as "you got everything wrong"')
})

test('the weakest list ranks by accuracy and excludes what was never marked', () => {
  let ledger = recordEvidence({}, { conceptIds: ['CON-GOOD'], source: 'case', correct: true, at: AT })
  ledger = recordEvidence(ledger, { conceptIds: ['CON-BAD'], source: 'case', correct: false, at: AT })
  ledger = recordEvidence(ledger, { conceptIds: ['CON-STATION'], source: 'station', at: AT })
  const ranked = weakest(ledger)
  assert.deepEqual(ranked.map((entry) => entry.conceptId), ['CON-BAD', 'CON-GOOD'])
})

test('a tie on accuracy is broken by the concept with more evidence behind it', () => {
  let ledger = recordEvidence({}, { conceptIds: ['CON-THIN'], source: 'case', correct: false, at: AT })
  ledger = recordEvidence(ledger, { conceptIds: ['CON-THICK'], source: 'case', correct: false, at: AT })
  ledger = recordEvidence(ledger, { conceptIds: ['CON-THICK'], source: 'case', correct: false, at: AT })
  assert.equal(weakest(ledger)[0].conceptId, 'CON-THICK')
})
