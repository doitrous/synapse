import test from 'node:test'
import assert from 'node:assert/strict'
import { PRIORITY_BANDS, bandOf, weightForBand } from './conceptPriority.ts'

test('every weight lands in exactly one band', () => {
  for (let step = 0; step <= 20; step += 1) {
    const weight = step / 20
    const bands = PRIORITY_BANDS.filter((band) => weight >= band.min && weight < band.max)
    assert.equal(bands.length, 1, `weight ${weight.toFixed(2)} matched ${bands.length} bands`)
  }
})

test('a band round-trips through its own weight', () => {
  for (const band of PRIORITY_BANDS) {
    assert.equal(bandOf(weightForBand(band.id)).id, band.id, band.id)
  }
})

test('the bands read in exam language, strongest first', () => {
  assert.deepEqual(PRIORITY_BANDS.map((band) => band.id), ['critical', 'high', 'standard', 'background'])
  assert.equal(bandOf(1).id, 'critical')
  assert.equal(bandOf(0).id, 'background')
})

test('an unset weight is background rather than an error', () => {
  assert.equal(bandOf(undefined).id, 'background')
  assert.equal(bandOf(Number.NaN).id, 'background')
  assert.equal(bandOf(null).id, 'background')
})

test('every band says what it means for an exam', () => {
  for (const band of PRIORITY_BANDS) {
    assert.ok(band.label, band.id)
    assert.ok(band.hint.length > 20, `${band.id} needs a hint that explains it`)
  }
})
