import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  ACTIVE_WINDOW_MS,
  ROOM_CAPACITY,
  activityAfter,
  firstFreeSeatIndex,
  normalizeActivity,
  normalizeSeatIndex,
  normalizeSeatInput,
  seatFromRow,
  seatIndexTaken,
} from './roomSeats.js'

test('a complete seat survives unchanged', () => {
  const result = normalizeSeatInput({ desk: 'corner', device: 'android', chair: 'stool', seatIndex: 7 })
  assert.deepEqual(result, { ok: true, seat: { desk: 'corner', device: 'android', chair: 'stool', seatIndex: 7 } })
})

test('a piece that is present and empty is a real choice: nothing picked', () => {
  const result = normalizeSeatInput({ desk: null, device: '', chair: null, seatIndex: 0 })
  assert.deepEqual(result.seat, { desk: null, device: null, chair: null, seatIndex: 0 })
})

test('a partial patch leaves every piece it did not name alone', () => {
  // The failure this prevents: a "move me to desk 7" control PATCHes only a
  // seat index and wipes the member's desk, device and chair to NULL.
  const result = normalizeSeatInput({ seatIndex: 7 })
  assert.deepEqual(result.seat, { desk: undefined, device: undefined, chair: undefined, seatIndex: 7 })
})

test('naming furniture without a desk number leaves the desk where it is', () => {
  const result = normalizeSeatInput({ desk: 'corner' })
  assert.deepEqual(result.seat, { desk: 'corner', device: undefined, chair: undefined, seatIndex: undefined })
})

test('an absent desk number leaves the desk alone; an explicit null stands the member up', () => {
  assert.equal(normalizeSeatInput({ desk: 'plain' }).seat.seatIndex, undefined)
  assert.equal(normalizeSeatInput({ desk: 'plain', seatIndex: null }).seat.seatIndex, null)
})

test('a full save from the customiser still writes all three pieces', () => {
  const result = normalizeSeatInput({ desk: 'plain', device: 'laptop', chair: 'office' })
  assert.deepEqual(result.seat, { desk: 'plain', device: 'laptop', chair: 'office', seatIndex: undefined })
})

test('an unknown piece is refused rather than dropped', () => {
  assert.deepEqual(normalizeSeatInput({ desk: 'hammock' }), { ok: false, reason: 'invalid_desk' })
  assert.deepEqual(normalizeSeatInput({ device: 'abacus' }), { ok: false, reason: 'invalid_device' })
  assert.deepEqual(normalizeSeatInput({ chair: 'beanbag' }), { ok: false, reason: 'invalid_chair' })
})

test('a desk number outside the room is refused, not clamped', () => {
  assert.deepEqual(normalizeSeatInput({ seatIndex: ROOM_CAPACITY }), { ok: false, reason: 'invalid_seat_index' })
  assert.deepEqual(normalizeSeatInput({ seatIndex: -1 }), { ok: false, reason: 'invalid_seat_index' })
  assert.deepEqual(normalizeSeatInput({ seatIndex: 2.5 }), { ok: false, reason: 'invalid_seat_index' })
  assert.deepEqual(normalizeSeatInput({ seatIndex: 'front row' }), { ok: false, reason: 'invalid_seat_index' })
})

test('no desk number at all means standing, which is allowed', () => {
  assert.equal(normalizeSeatIndex(null), null)
  assert.equal(normalizeSeatIndex(undefined), null)
  assert.equal(normalizeSeatIndex(''), null)
  assert.equal(normalizeSeatIndex(0), 0)
})

test('a body that is not an object names nothing rather than throwing', () => {
  assert.deepEqual(
    normalizeSeatInput(undefined).seat,
    { desk: undefined, device: undefined, chair: undefined, seatIndex: undefined },
  )
  assert.equal(normalizeSeatInput('desk').seat.desk, undefined)
})

test('anything that is not studying is idle', () => {
  assert.equal(normalizeActivity('studying'), 'studying')
  assert.equal(normalizeActivity('idle'), 'idle')
  assert.equal(normalizeActivity('afk'), 'idle')
  assert.equal(normalizeActivity(undefined), 'idle')
})

const seated = (userId, seatIndex) => ({ userId, seatIndex })

test('a desk somebody else is at is taken', () => {
  const members = [seated('a', 3), seated('b', 4)]
  assert.equal(seatIndexTaken(members, 3, 'c'), true)
  assert.equal(seatIndexTaken(members, 5, 'c'), false)
})

test('your own desk never conflicts with itself', () => {
  assert.equal(seatIndexTaken([seated('a', 3)], 3, 'a'), false)
})

test('nowhere in particular conflicts with nobody', () => {
  assert.equal(seatIndexTaken([seated('a', 3)], null, 'b'), false)
})

test('an arriving member takes the lowest free desk', () => {
  assert.equal(firstFreeSeatIndex([seated('a', 0), seated('b', 2)], 'c'), 1)
  assert.equal(firstFreeSeatIndex([], 'c'), 0)
})

test('your own desk is not counted against you when looking for a free one', () => {
  assert.equal(firstFreeSeatIndex([seated('a', 0)], 'a'), 0)
})

test('a full room offers no desk rather than an invented one', () => {
  const full = Array.from({ length: ROOM_CAPACITY }, (_, index) => seated(`u${index}`, index))
  assert.equal(firstFreeSeatIndex(full, 'late'), null)
})

test('a member who has chosen nothing has no seat', () => {
  assert.equal(seatFromRow({ seatDesk: null, seatDevice: null, seatChair: null, seatIndex: null }), null)
  assert.equal(seatFromRow(undefined), null)
})

test('a member with a desk number but no furniture still has a seat', () => {
  assert.deepEqual(seatFromRow({ seatIndex: 4 }), { desk: null, device: null, chair: null, seatIndex: 4 })
})

test('a stored piece the server no longer recognises is dropped, not drawn', () => {
  assert.deepEqual(
    seatFromRow({ seatDesk: 'hammock', seatDevice: 'laptop', seatChair: 'office', seatIndex: 1 }),
    { desk: null, device: 'laptop', chair: 'office', seatIndex: 1 },
  )
})

test('a fresh heartbeat is taken at its word', () => {
  assert.equal(activityAfter('studying', 10), 'studying')
})

test('a stale heartbeat expires to idle however loudly it claimed otherwise', () => {
  assert.equal(activityAfter('studying', ACTIVE_WINDOW_MS / 1000 + 1), 'idle')
})

test('a member never heard from is idle, not unknown', () => {
  assert.equal(activityAfter('studying', null), 'idle')
  assert.equal(activityAfter('studying', undefined), 'idle')
  assert.equal(activityAfter('studying', 'soon'), 'idle')
})

test('a heartbeat from a second in the future is fresh, not nonsense', () => {
  assert.equal(activityAfter('studying', -2), 'studying')
})
