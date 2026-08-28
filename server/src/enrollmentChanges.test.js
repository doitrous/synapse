import test from 'node:test'
import assert from 'node:assert/strict'
import { requestProblem, cohortAggregates, applyDirectEnrollmentChange } from './enrollmentChanges.js'

test('enrollment change requests require a target field, target value and clear reason', () => {
  assert.equal(requestProblem({ field: 'group', requestedValue: 'ASU', reason: 'moving schools soon' }), 'invalid_field')
  assert.equal(requestProblem({ field: 'university', reason: 'moving schools soon' }), 'requested_value_required')
  assert.equal(requestProblem({ field: 'year', requestedValue: 'Y3', reason: 'typo' }), 'reason_required')
  assert.equal(requestProblem({ field: 'universityId', requestedValue: 'ain-shams', reason: 'Transferred to Ain Shams this term' }), null)
})

// A minimal conn stub: records queries and returns canned rows for the SELECT.
function connStub(attemptRows) {
  const queries = []
  return {
    queries,
    async query(sql, params) {
      queries.push({ sql, params })
      if (/FROM qbank_attempts/.test(sql)) return [attemptRows]
      return [[]]
    },
  }
}

test('a cohort with no attempts is a clean slate; one with attempts recomputes exactly', async () => {
  const empty = await cohortAggregates(connStub([{ answered: 0, acc: 0 }]), { userId: 'u1', universityId: 'asu', year: 'Year 2' })
  assert.deepEqual(empty, { questionsAnswered: 0, accuracy: 0 })

  const returning = await cohortAggregates(connStub([{ answered: 40, acc: 0.75 }]), { userId: 'u1', universityId: 'asu', year: 'Year 1' })
  assert.deepEqual(returning, { questionsAnswered: 40, accuracy: 75 })

  // No user id (roster never signed in) means nothing to count, not an error.
  const noUser = await cohortAggregates(connStub([{ answered: 99, acc: 1 }]), { userId: null, universityId: 'asu', year: 'Year 1' })
  assert.deepEqual(noUser, { questionsAnswered: 0, accuracy: 0 })
})

test('a direct change persists the cohort, resets aggregates and writes one audit row', async () => {
  const conn = connStub([{ answered: 0, acc: 0 }])
  const result = await applyDirectEnrollmentChange(conn, {
    studentId: 's1', userId: 'u1', universityId: 'cairo', year: 'Year 3',
    oldUniversityId: 'asu', oldYear: 'Year 2', oldYearId: 'ASU_Y2', actorId: 'admin1', reason: 'transferred faculties',
  })
  // year_id re-derived from the destination.
  assert.equal(result.to.yearId, 'CAIRO_Y3')
  assert.deepEqual(result.from, { universityId: 'asu', year: 'Year 2', yearId: 'ASU_Y2' })
  assert.deepEqual(result.aggregates, { questionsAnswered: 0, accuracy: 0 })
  // The students UPDATE carries the reset aggregates and readiness = 0.
  const update = conn.queries.find((q) => /UPDATE students SET university_id/.test(q.sql))
  assert.ok(update, 'expected a students cohort update')
  assert.deepEqual(update.params, ['cairo', 'Year 3', 'CAIRO_Y3', 0, 0, 's1'])
  // Exactly one audit row, naming the move.
  const audit = conn.queries.find((q) => /account_action_audit/.test(q.sql))
  assert.ok(audit, 'expected an audit insert')
  assert.equal(audit.params[2], 'enrollment.change')
  assert.match(audit.params[3], /asu Year 2 → cairo Year 3/)
})
