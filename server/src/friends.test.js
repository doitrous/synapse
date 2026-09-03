import test from 'node:test'
import assert from 'node:assert/strict'
import { displayNameFrom, myFriends } from './friends.js'
import { pool } from './db.js'

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

test('a friend profile carries their status_message through as statusMessage', async (t) => {
  t.mock.method(pool, 'query', async (sql) => {
    if (/FROM friendships/.test(sql)) return [[{ user_a: 'me', user_b: 'friend-1' }]]
    if (/FROM user_access a LEFT JOIN students/.test(sql)) {
      return [[{
        user_id: 'friend-1', name: 'Nour', email: 'nour@x.com', username: 'nour',
        university_id: 'cairo', year: 'Year 2', status_message: 'studying anatomy',
      }]]
    }
    return [[]]
  })
  const friends = await myFriends('me')
  assert.equal(friends.length, 1)
  assert.equal(friends[0].statusMessage, 'studying anatomy')
})

test('a friend with no status_message on record reads as null, not undefined', async (t) => {
  t.mock.method(pool, 'query', async (sql) => {
    if (/FROM friendships/.test(sql)) return [[{ user_a: 'me', user_b: 'friend-1' }]]
    if (/FROM user_access a LEFT JOIN students/.test(sql)) {
      return [[{ user_id: 'friend-1', name: 'Nour', email: 'nour@x.com', username: 'nour', university_id: 'cairo', year: 'Year 2', status_message: null }]]
    }
    return [[]]
  })
  const friends = await myFriends('me')
  assert.equal(friends[0].statusMessage, null)
})
