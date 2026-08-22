import test from 'node:test'
import assert from 'node:assert/strict'
import {
  OWNED_BY_USER_ID, OWNED_BY_OWNER_ID, OWNED_BY_STUDENT_ID, DELIBERATELY_KEPT,
} from './accountDeletion.js'

/**
 * What deletion covers.
 *
 * These read the schema and compare it against the list, because the failure
 * mode being guarded is a table added later that nobody remembers to add here —
 * a student would delete their account, be told it worked, and leave their
 * data behind in a table no one looks at.
 */
import { readFileSync } from 'node:fs'

const schema = readFileSync(new URL('../schema.sql', import.meta.url), 'utf8')

/** Every table in the schema, with the owner-ish columns it declares. */
function tablesWithColumn(column) {
  const found = []
  const pattern = /CREATE TABLE IF NOT EXISTS ([a-z_]+) \(([\s\S]*?)\n\) ENGINE/g
  for (const [, name, body] of schema.matchAll(pattern)) {
    if (new RegExp(`^\\s{2}${column}\\s`, 'm').test(body)) found.push(name)
  }
  return found
}

test('every table keyed by user_id is either deleted or deliberately kept', () => {
  const covered = new Set([...OWNED_BY_USER_ID, ...DELIBERATELY_KEPT])
  const missing = tablesWithColumn('user_id').filter((t) => !covered.has(t))
  assert.deepEqual(
    missing, [],
    `these tables hold a user_id and neither deletion nor the kept-list mentions them: ${missing.join(', ')}`,
  )
})

test('every table keyed by owner_id is accounted for', () => {
  const covered = new Set([...OWNED_BY_OWNER_ID, ...DELIBERATELY_KEPT])
  const missing = tablesWithColumn('owner_id').filter((t) => !covered.has(t))
  assert.deepEqual(missing, [], `unaccounted owner_id tables: ${missing.join(', ')}`)
})

test('every table listed for deletion actually exists', () => {
  // A renamed table would otherwise make deletion throw, roll back, and leave
  // the student unable to delete their account at all.
  for (const table of [...OWNED_BY_USER_ID, ...OWNED_BY_OWNER_ID, ...OWNED_BY_STUDENT_ID]) {
    assert.ok(
      schema.includes(`CREATE TABLE IF NOT EXISTS ${table} `),
      `${table} is on the deletion list but not in the schema`,
    )
  }
})

test('nothing is on both the delete list and the keep list', () => {
  const deleting = new Set([...OWNED_BY_USER_ID, ...OWNED_BY_OWNER_ID, ...OWNED_BY_STUDENT_ID])
  for (const kept of DELIBERATELY_KEPT) {
    assert.equal(deleting.has(kept), false, `${kept} is both deleted and kept`)
  }
})

test('the records kept are the ones that are not the student\'s to erase', () => {
  // An administrator's actions on an account, and files sent into a support
  // conversation. Both belong to someone other than the person deleting.
  assert.ok(DELIBERATELY_KEPT.includes('account_action_audit'))
  assert.ok(DELIBERATELY_KEPT.includes('attachments'))
})

test('the student\'s own work is all on the delete list', () => {
  // The four a student would name if asked what they had made.
  for (const table of ['user_state', 'user_documents', 'shared_documents', 'user_state_versions']) {
    assert.ok(
      [...OWNED_BY_USER_ID, ...OWNED_BY_OWNER_ID].includes(table),
      `${table} holds a student's own work and must be deleted`,
    )
  }
})

test('the device stops being sent notifications', () => {
  // Otherwise the next person to sign in on that phone inherits them.
  assert.ok(OWNED_BY_USER_ID.includes('device_tokens'))
})
