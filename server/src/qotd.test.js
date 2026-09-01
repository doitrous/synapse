import { test } from 'node:test'
import assert from 'node:assert/strict'
import { hashText, cohortKey, cairoDate, dayNumber, selectQotdId, candidatesFromLedger } from './qotd.js'

const cohort = { universityId: 'kau', year: 'Year 2', yearId: 'KAU_Y2' }

test('hashText matches the client FNV-1a (unsigned, stable)', () => {
  assert.equal(hashText('kau|Year 2'), hashText('kau|Year 2'))
  assert.ok(hashText('kau|Year 2') >= 0)
  assert.equal(cohortKey(cohort), 'kau|Year 2')
})

test('cairoDate rolls over at Cairo midnight', () => {
  assert.equal(cairoDate(new Date('2026-08-29T23:30:00Z')), '2026-08-30')
  assert.equal(cairoDate(new Date('2026-08-29T12:00:00Z')), '2026-08-29')
  assert.equal(dayNumber('2026-08-30') - dayNumber('2026-08-29'), 1)
})

test('selectQotdId is cohort+date stable and honours a valid pin', () => {
  const pool = Array.from({ length: 20 }, (_, i) => ({ id: `q${i}`, universityIds: [], yearIds: [] }))
  const a = selectQotdId(pool, cohort, '2026-08-29')
  assert.equal(a, selectQotdId(pool, cohort, '2026-08-29'))
  assert.notEqual(a, selectQotdId(pool, cohort, '2026-08-30'))
  assert.equal(selectQotdId(pool, cohort, '2026-08-29', { 'kau|Year 2': { '2026-08-29': 'q3' } }), 'q3')
})

test('candidatesFromLedger keeps published questions with their scope tags', () => {
  const ledger = [
    { id: 'p1', kind: 'question', status: 'Published',
      questionData: { answers: [{ label: 'A', text: 'x' }, { label: 'B', text: 'y' }], correctAnswer: 'A',
                      tags: { universityIds: ['kau'], years: ['KAU_Y2'] } } },
    { id: 'd1', kind: 'question', status: 'Draft', questionData: { tags: {} } },
    { id: 'a1', kind: 'article', status: 'Published' },
  ]
  const cands = candidatesFromLedger(ledger)
  assert.deepEqual(cands, [{ id: 'p1', universityIds: ['kau'], yearIds: ['KAU_Y2'] }])
})
