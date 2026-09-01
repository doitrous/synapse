// src/data/qotdSelection.test.ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scopeCandidates, selectQotdId, type QotdCandidate, type QotdCohort } from './qotdSelection.ts'

const cohort: QotdCohort = { universityId: 'kau', year: 'Year 2', yearId: 'KAU_Y2' }
const other: QotdCohort = { universityId: 'asu', year: 'Year 2', yearId: 'ASU_Y2' }

function pool(n: number): QotdCandidate[] {
  return Array.from({ length: n }, (_, i) => ({ id: `q${i}`, universityIds: [], yearIds: [] }))
}

test('scopeCandidates keeps untagged and matching, drops mismatched', () => {
  const cands: QotdCandidate[] = [
    { id: 'untagged', universityIds: [], yearIds: [] },
    { id: 'matchUni', universityIds: ['kau'], yearIds: [] },
    { id: 'matchYear', universityIds: [], yearIds: ['KAU_Y2'] },
    { id: 'wrongUni', universityIds: ['asu'], yearIds: [] },
    { id: 'wrongYear', universityIds: ['kau'], yearIds: ['KAU_Y3'] },
  ]
  // Pad so the scoped set clears MIN_POOL and no fallback triggers.
  const padded = [...cands, ...pool(8).map((c) => ({ ...c, universityIds: ['kau'] }))]
  const ids = scopeCandidates(padded, cohort).map((c) => c.id)
  assert.ok(ids.includes('untagged') && ids.includes('matchUni') && ids.includes('matchYear'))
  assert.ok(!ids.includes('wrongUni') && !ids.includes('wrongYear'))
})

test('scopeCandidates falls back to full pool when the scoped set is too small', () => {
  const cands: QotdCandidate[] = [
    { id: 'only', universityIds: ['kau'], yearIds: ['KAU_Y2'] },
    ...pool(20).map((c) => ({ ...c, universityIds: ['asu'] })), // all wrong cohort
  ]
  // Scoped set = 1 (< MIN_POOL) → fallback returns everything.
  assert.equal(scopeCandidates(cands, cohort).length, cands.length)
})

test('selectQotdId is stable per cohort+date and differs across cohorts', () => {
  const cands = pool(30)
  const a = selectQotdId(cands, cohort, '2026-08-29')
  assert.equal(a, selectQotdId(cands, cohort, '2026-08-29')) // stable
  assert.notEqual(a, selectQotdId(cands, cohort, '2026-08-30')) // day advances the pick
  assert.notEqual(a, selectQotdId(cands, other, '2026-08-29')) // cohort changes the deck
})

test('selectQotdId cycles the whole deck before repeating', () => {
  const cands = pool(10)
  const seen = new Set<string>()
  for (let i = 0; i < 10; i++) seen.add(selectQotdId(cands, cohort, dayIso(i))!)
  assert.equal(seen.size, 10) // no repeat within one deck length
  function dayIso(offset: number): string {
    const d = new Date(Date.UTC(2026, 7, 29) + offset * 86_400_000)
    return d.toISOString().slice(0, 10)
  }
})

test('an admin pin overrides the seeded pick', () => {
  const cands = pool(30)
  const pins = { 'kau|Year 2': { '2026-08-29': 'q7' } }
  assert.equal(selectQotdId(cands, cohort, '2026-08-29', pins), 'q7')
})

test('a pin to a question absent from the pool is ignored', () => {
  const cands = pool(30)
  const pins = { 'kau|Year 2': { '2026-08-29': 'nonexistent' } }
  assert.equal(selectQotdId(cands, cohort, '2026-08-29', pins), selectQotdId(cands, cohort, '2026-08-29'))
})

test('an empty pool yields null', () => {
  assert.equal(selectQotdId([], cohort, '2026-08-29'), null)
})
