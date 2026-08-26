import assert from 'node:assert/strict'
import test from 'node:test'
import {
  DEFAULT_MARISTANA_CONFIG, MARISTANA_MILESTONES, MARISTANA_STEPS, maristanaCredits, maristanaHospitals,
  normaliseMaristanaConfig, projectedModuleHospitals,
} from './maristanas.ts'

test('architectural achievements end exactly with the twenty-fifth stage', () => {
  assert.equal(MARISTANA_MILESTONES.at(-1)?.stage, MARISTANA_STEPS)
  assert.deepEqual(MARISTANA_MILESTONES.map((milestone) => milestone.stage), [1, 5, 10, 15, 20, 25])
})

test('the default module target builds roughly three hospitals', () => {
  const projected = projectedModuleHospitals()
  assert.ok(projected >= 2.8 && projected <= 3.3, `projected ${projected}`)
})

test('construction always advances in 25 fixed steps', () => {
  const oneHospital = DEFAULT_MARISTANA_CONFIG.creditsPerStep * MARISTANA_STEPS
  const hospitals = maristanaHospitals(oneHospital + 450)
  assert.equal(hospitals[0].stage, 25)
  assert.equal(hospitals[0].completed, true)
  assert.equal(hospitals[1].stage, 4)
  assert.equal(hospitals[1].stepProgress, 0.5)
})

test('credit sources remain separately explainable', () => {
  const result = maristanaCredits({ studyMinutes: 10, questionsAnswered: 5, correctAnswers: 4, assessmentScores: [80] })
  assert.deepEqual(result.breakdown, { study: 20, questions: 10, accuracy: 40, assessments: 120 })
  assert.equal(result.total, 190)
})

test('admin values are bounded before they affect progression', () => {
  const safe = normaliseMaristanaConfig({ creditsPerStep: -5, creditsPerStudyMinute: 9999, assessmentMinimumQuestions: 2 })
  assert.equal(safe.creditsPerStep, 20)
  assert.equal(safe.creditsPerStudyMinute, 100)
  assert.equal(safe.assessmentMinimumQuestions, 5)
})
