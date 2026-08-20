import test from 'node:test'
import assert from 'node:assert/strict'
import {
  CONSOLE_ROLES, STORED_ROLES, assignableRoles, canSetRole, effectiveRole,
  hasConsoleAccess, parseSuperAdminEmails, rank,
} from './roles.js'

const ALLOW = ['doitrous@hotmail.com', 'info@doitrous.com']

test('an allowlisted email is a super admin whatever the row says', () => {
  assert.equal(effectiveRole('doitrous@hotmail.com', 'student', ALLOW), 'super_admin')
  assert.equal(effectiveRole('INFO@DOITROUS.COM', 'admin', ALLOW), 'super_admin')
  assert.equal(effectiveRole(' info@doitrous.com ', null, ALLOW), 'super_admin')
})

test('everyone else is whatever their row says, and an unknown role is a student', () => {
  assert.equal(effectiveRole('someone@example.com', 'editor', ALLOW), 'editor')
  assert.equal(effectiveRole('someone@example.com', 'nonsense', ALLOW), 'student')
  assert.equal(effectiveRole(null, 'admin', ALLOW), 'admin')
})

test('an empty allowlist mints no super admins', () => {
  assert.equal(effectiveRole('doitrous@hotmail.com', 'admin', []), 'admin')
  assert.deepEqual(parseSuperAdminEmails(''), [])
  assert.deepEqual(parseSuperAdminEmails('  '), [])
  assert.deepEqual(parseSuperAdminEmails('A@b.com, c@d.com ,'), ['a@b.com', 'c@d.com'])
})

test('reviewer and admin are peers, and neither can touch the other', () => {
  assert.equal(rank('reviewer'), rank('admin'))
  assert.equal(canSetRole('admin', 'reviewer', 'student'), false)
  assert.equal(canSetRole('reviewer', 'admin', 'student'), false)
})

test('an editor may promote and demote below itself', () => {
  assert.equal(canSetRole('editor', 'student', 'reviewer'), true)
  assert.equal(canSetRole('editor', 'student', 'admin'), true)
  assert.equal(canSetRole('editor', 'reviewer', 'admin'), true)
  assert.equal(canSetRole('editor', 'admin', 'student'), true)
})

test('an editor can neither create nor remove another editor', () => {
  assert.equal(canSetRole('editor', 'student', 'editor'), false)
  assert.equal(canSetRole('editor', 'editor', 'student'), false)
  assert.equal(canSetRole('editor', 'editor', 'admin'), false)
})

test('nobody may reach past their own rank', () => {
  assert.equal(canSetRole('editor', 'student', 'super_admin'), false)
  assert.equal(canSetRole('student', 'student', 'student'), false)
})

test('role management starts at editor, so a peer role has none of it', () => {
  // Admin and Reviewer were given no promotion power. Outranking a student is
  // therefore not enough — otherwise either could "set" one to student, which
  // is a change the console should not offer at all.
  assert.equal(canSetRole('admin', 'student', 'reviewer'), false)
  assert.equal(canSetRole('admin', 'student', 'student'), false)
  assert.equal(canSetRole('reviewer', 'student', 'student'), false)
})

test('a super admin may set any stored role on anyone below', () => {
  for (const target of ['student', 'reviewer', 'admin', 'editor']) {
    for (const next of STORED_ROLES) {
      assert.equal(canSetRole('super_admin', target, next), true, `${target} → ${next}`)
    }
  }
})

test('super admin is not a stored role, so it can never be assigned or removed', () => {
  assert.equal(STORED_ROLES.includes('super_admin'), false)
  assert.equal(canSetRole('super_admin', 'super_admin', 'student'), false)
  assert.equal(canSetRole('super_admin', 'admin', 'super_admin'), false)
})

test('the roles offered are exactly the roles that would be accepted', () => {
  const roles = ['student', 'reviewer', 'admin', 'editor', 'super_admin']
  for (const actor of roles) {
    for (const target of roles) {
      for (const next of STORED_ROLES) {
        assert.equal(
          assignableRoles(actor, target).includes(next),
          canSetRole(actor, target, next),
          `${actor} offering ${next} to ${target}`,
        )
      }
    }
  }
})

test('an actor is offered nothing for somebody they do not outrank', () => {
  assert.deepEqual(assignableRoles('editor', 'student'), ['student', 'reviewer', 'admin'])
  assert.deepEqual(assignableRoles('editor', 'editor'), [])
  assert.deepEqual(assignableRoles('admin', 'reviewer'), [])
  assert.deepEqual(assignableRoles('reviewer', 'student'), [])
  // Neither peer role manages roles at all, however far below them the target.
  assert.deepEqual(assignableRoles('admin', 'student'), [])
})

test('console access starts at reviewer', () => {
  assert.deepEqual(CONSOLE_ROLES, ['reviewer', 'admin', 'editor', 'super_admin'])
  assert.equal(hasConsoleAccess('student'), false)
  assert.equal(hasConsoleAccess('reviewer'), true)
  assert.equal(hasConsoleAccess('super_admin'), true)
})
