import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  appearanceCount, bestTier, derivedExamWeight, explainExamWeight, frequencyFactor,
  mostRecentYear, recencyFactor, RECENCY_FLOOR,
  type ExamAppearance, type ExamSignal,
} from './examSignal.ts'

const NOW = 2026

function appearance(overrides: Partial<ExamAppearance> = {}): ExamAppearance {
  return { sourceId: 'src_a', tier: 'end_of_year', sittingYear: 2025, ...overrides }
}

const signal = (appearances: ExamAppearance[], confidence?: number): ExamSignal =>
  ({ appearances, ...(confidence === undefined ? {} : { confidence }) })

describe('Reading the parts of a signal', () => {
  test('the strongest tier wins, whatever order the appearances are in', () => {
    const s = signal([
      appearance({ sourceId: 'a', tier: 'department_questions' }),
      appearance({ sourceId: 'b', tier: 'orientation' }),
      appearance({ sourceId: 'c', tier: 'end_of_module' }),
    ])
    assert.equal(bestTier(s), 'orientation')
  })

  test('the most recent year wins', () => {
    const s = signal([
      appearance({ sourceId: 'a', sittingYear: 2021 }),
      appearance({ sourceId: 'b', sittingYear: 2025 }),
      appearance({ sourceId: 'c' , sittingYear: undefined }),
    ])
    assert.equal(mostRecentYear(s), 2025)
  })

  test('appearances are counted by paper, not by mention', () => {
    // The same paper naming a concept on three pages is one paper.
    const s = signal([
      appearance({ sourceId: 'a', page: 1 }),
      appearance({ sourceId: 'a', page: 4 }),
      appearance({ sourceId: 'b', page: 2 }),
    ])
    assert.equal(appearanceCount(s), 2)
  })

  test('a signal with no appearances says so rather than guessing', () => {
    assert.equal(bestTier(signal([])), null)
    assert.equal(mostRecentYear(signal([])), null)
    assert.equal(derivedExamWeight(signal([]), { currentYear: NOW }), 0)
  })
})

describe('What the weight responds to', () => {
  test('orientation outranks a department quiz on the same evidence', () => {
    const orientation = derivedExamWeight(signal([appearance({ tier: 'orientation' })]), { currentYear: NOW })
    const quiz = derivedExamWeight(signal([appearance({ tier: 'department_questions' })]), { currentYear: NOW })
    assert.ok(orientation > quiz, `${orientation} should beat ${quiz}`)
  })

  test('a resit ranks just below the main sitting, not far below', () => {
    const main = derivedExamWeight(signal([appearance({ tier: 'end_of_year' })]), { currentYear: NOW })
    const resit = derivedExamWeight(signal([appearance({ tier: 'baqoon' })]), { currentYear: NOW })
    assert.ok(resit < main)
    assert.ok(resit > main * 0.8, 'a resit is real evidence, not a footnote')
  })

  test('end of year and end of module rank together', () => {
    // They differ in which exam they predict, not in how much they are worth.
    const eoy = derivedExamWeight(signal([appearance({ tier: 'end_of_year' })]), { currentYear: NOW })
    const eom = derivedExamWeight(signal([appearance({ tier: 'end_of_module' })]), { currentYear: NOW })
    assert.equal(eoy, eom)
  })

  test('recent beats old on otherwise equal evidence', () => {
    const recent = derivedExamWeight(signal([appearance({ sittingYear: 2025 })]), { currentYear: NOW })
    const old = derivedExamWeight(signal([appearance({ sittingYear: 2019 })]), { currentYear: NOW })
    assert.ok(recent > old)
  })

  test('old material does not vanish', () => {
    // Anatomy did not change. A concept last examined a decade ago should rank
    // below one examined last year and should still be worth something.
    assert.equal(recencyFactor(2005, NOW), RECENCY_FLOOR)
    assert.ok(derivedExamWeight(signal([appearance({ sittingYear: 2005 })]), { currentYear: NOW }) > 0)
  })

  test('repetition raises the weight, with diminishing returns', () => {
    // Diminishing returns means each *further* appearance adds less than the
    // one before it, so the steps compared have to be the same size.
    const step = (n: number) => frequencyFactor(n + 1) - frequencyFactor(n)
    assert.ok(frequencyFactor(2) > frequencyFactor(1))
    assert.ok(step(2) < step(1), 'the third appearance is worth less than the second')
    assert.ok(step(4) < step(2), 'and the fifth less than the third')
    assert.ok(frequencyFactor(200) <= 1, 'and a concept on every paper cannot crowd out a block')
  })

  test('low confidence lowers the weight without erasing the evidence', () => {
    const sure = signal([appearance()], 1)
    const unsure = signal([appearance()], 0.4)
    assert.ok(derivedExamWeight(unsure, { currentYear: NOW }) < derivedExamWeight(sure, { currentYear: NOW }))
    assert.equal(unsure.appearances.length, 1, 'the appearance is still on the record')
  })

  test('the weight stays inside 0 and 1', () => {
    const many = signal(Array.from({ length: 40 }, (_, i) =>
      appearance({ sourceId: `s${i}`, tier: 'orientation', sittingYear: NOW })))
    const weight = derivedExamWeight(many, { currentYear: NOW })
    assert.ok(weight > 0 && weight <= 1, String(weight))
  })
})

describe('A weight can account for itself', () => {
  test('every input that produced it is reported alongside it', () => {
    // The point of keeping the parts: an admin looking at a surprising weight
    // can see which papers put it there without reading the code.
    const s = signal([
      appearance({ sourceId: 'src_eoy_2025', tier: 'end_of_year', sittingYear: 2025, page: 4 }),
      appearance({ sourceId: 'src_orient', tier: 'orientation', sittingYear: 2024 }),
    ], 0.9)
    const shown = explainExamWeight(s, { currentYear: NOW })

    assert.equal(shown.strongestTier, 'orientation')
    assert.equal(shown.mostRecentYear, 2025)
    assert.equal(shown.appearanceCount, 2)
    assert.equal(shown.confidence, 0.9)
    assert.equal(shown.appearances.length, 2)
    assert.equal(shown.appearances[0].page, 4, 'and a reviewer can go to the page')
    assert.equal(shown.weight, derivedExamWeight(s, { currentYear: NOW }))
  })
})
