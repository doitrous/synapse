import assert from 'node:assert/strict'
import test from 'node:test'
import { calculateMaristanaCredits, buildHospitalSlots, DEFAULT_MARISTANA_CONFIG, MARISTANA_STEPS } from './maristanas.js'

test('default construction economy is explainable and sequential', () => {
  const result = calculateMaristanaCredits({ studyMinutes: 10, questionsAnswered: 5, correctAnswers: 4, assessmentScores: [80] })
  assert.deepEqual(result.breakdown, { study: 20, questions: 10, accuracy: 40, assessments: 120 })
  assert.equal(result.total, 190)
})

test('one hospital completes at exactly 25 configured steps', () => {
  const full = DEFAULT_MARISTANA_CONFIG.creditsPerStep * MARISTANA_STEPS
  const hospitals = buildHospitalSlots(full)
  assert.equal(hospitals[0].stage, 25)
  assert.equal(hospitals[0].completed, true)
  assert.equal(hospitals[1].stage, 0)
})
