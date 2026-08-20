import test from 'node:test'
import assert from 'node:assert/strict'
import { ROLE_LABEL, ROLE_RANK, STORED_ROLES, assignableRoles, canSetRole, rank } from './adminRoles.ts'
import * as server from '../../server/src/roles.js'

const ROLES = ['student', 'reviewer', 'admin', 'editor', 'super_admin']

test('the client agrees with the server about rank', () => {
  assert.deepEqual(ROLE_RANK, server.ROLE_RANK)
  assert.deepEqual(STORED_ROLES, server.STORED_ROLES)
})

test('the client agrees with the server about every possible role change', () => {
  for (const actor of ROLES) {
    for (const target of ROLES) {
      for (const next of ROLES) {
        assert.equal(
          canSetRole(actor, target, next),
          server.canSetRole(actor, target, next),
          `${actor} changing ${target} to ${next}`,
        )
      }
      assert.deepEqual(
        assignableRoles(actor, target),
        server.assignableRoles(actor, target),
        `${actor} offering roles to ${target}`,
      )
    }
  }
})

test('every role a control can offer has a label to offer it under', () => {
  for (const role of Object.keys(ROLE_RANK)) assert.ok(ROLE_LABEL[role as keyof typeof ROLE_LABEL])
  assert.equal(rank('nonsense'), 0)
})
