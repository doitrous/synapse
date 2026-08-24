import test from 'node:test'
import assert from 'node:assert/strict'
import { requestProblem } from './enrollmentChanges.js'

test('enrollment change requests require a target field, target value and clear reason', () => {
  assert.equal(requestProblem({ field: 'group', requestedValue: 'ASU', reason: 'moving schools soon' }), 'invalid_field')
  assert.equal(requestProblem({ field: 'university', reason: 'moving schools soon' }), 'requested_value_required')
  assert.equal(requestProblem({ field: 'year', requestedValue: 'Y3', reason: 'typo' }), 'reason_required')
  assert.equal(requestProblem({ field: 'universityId', requestedValue: 'ain-shams', reason: 'Transferred to Ain Shams this term' }), null)
})
