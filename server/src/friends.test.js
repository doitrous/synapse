import test from 'node:test'
import assert from 'node:assert/strict'
import { displayNameFrom } from './friends.js'

test('a real name is shown as-is', () => {
  assert.equal(displayNameFrom({ name: 'Omar Elbasat', email: 'omar@x.com', username: 'omary98' }), 'Omar Elbasat')
})

test('a name that is just the placeholder email falls back to the username, not the local-part', () => {
  assert.equal(displayNameFrom({ name: 'omar@x.com', email: 'omar@x.com', username: 'omary98' }), 'omary98')
})

test('no name and no username reads as "Student", never the email', () => {
  assert.equal(displayNameFrom({ name: null, email: 'omar@x.com', username: null }), 'Student')
})

test('a missing email still refuses to show a null name as a real one', () => {
  assert.equal(displayNameFrom({ name: null, email: null, username: 'omary98' }), 'omary98')
})
