import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_SEAT,
  HALL_WIDTH,
  LEFT_WINDOW_MS,
  ROW_HEIGHT,
  SEAT_WIDTH,
  STUDYING_WINDOW_MS,
  hallHeight,
  isPresent,
  isStudying,
  normalizeSeat,
  placeSeats,
  seatLayout,
  seatRows,
  type SeatOccupant,
} from './roomPresence.ts'

const NOW = Date.UTC(2026, 8, 2, 12, 0, 0)

/* ---- isPresent (the hour-long "still in the room" window) -------------- */

test('someone idle five minutes is still present though not studying', () => {
  const fiveMinAgo = NOW - 300_000
  assert.equal(isStudying(fiveMinAgo, NOW), false)
  assert.equal(isPresent(fiveMinAgo, NOW), true)
})

test('the 60 minute boundary is inclusive, then they have left', () => {
  assert.equal(isPresent(NOW - LEFT_WINDOW_MS, NOW), true)
  assert.equal(isPresent(NOW - LEFT_WINDOW_MS - 1, NOW), false)
})

test('never having been seen is not present', () => {
  assert.equal(isPresent(null, NOW), false)
})

/* ---- isStudying -------------------------------------------------------- */

test('someone active a moment ago is studying', () => {
  assert.equal(isStudying(new Date(NOW - 5_000).toISOString(), NOW), true)
})

test('the 90 second boundary is inclusive', () => {
  // Exactly on the edge counts, so a heartbeat that lands on the second does
  // not flicker the seat off between two polls.
  assert.equal(isStudying(NOW - STUDYING_WINDOW_MS, NOW), true)
  assert.equal(isStudying(NOW - STUDYING_WINDOW_MS - 1, NOW), false)
})

test('someone last seen two minutes ago is not studying', () => {
  assert.equal(isStudying(new Date(NOW - 120_000).toISOString(), NOW), false)
})

test('never having been seen is not studying', () => {
  // The regression this guards: an absent timestamp reading as `now` and
  // lighting up every empty seat in the hall.
  assert.equal(isStudying(null, NOW), false)
  assert.equal(isStudying(undefined, NOW), false)
  assert.equal(isStudying('', NOW), false)
  assert.equal(isStudying('not a date', NOW), false)
})

test('a clock running slightly fast still counts as studying', () => {
  assert.equal(isStudying(NOW + 4_000, NOW), true)
})

test('a Date and a millisecond stamp are read the same way', () => {
  assert.equal(isStudying(new Date(NOW - 1_000), NOW), true)
  assert.equal(isStudying(NOW - 1_000, NOW), true)
})

/* ---- seatLayout -------------------------------------------------------- */

test('an empty hall has no seats but still has a floor', () => {
  assert.deepEqual(seatLayout(0, 5), [])
  assert.equal(seatRows(0, 5), 1)
  assert.equal(hallHeight(0, 5), ROW_HEIGHT)
})

test('seats fill left to right then wrap to the next row', () => {
  const seats = seatLayout(6, 5)
  assert.equal(seats.length, 6)
  assert.deepEqual(
    seats.map((seat) => [seat.row, seat.column]),
    [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 0]],
  )
})

test('rows of five are evenly spaced across the hall width', () => {
  const seats = seatLayout(5, 5)
  const inset = (HALL_WIDTH / 5 - SEAT_WIDTH) / 2
  assert.deepEqual(seats.map((seat) => seat.x), [10, 210, 410, 610, 810])
  assert.equal(inset, 10)
})

test('rows of four re-centre without changing the hall width', () => {
  const seats = seatLayout(4, 4)
  assert.deepEqual(seats.map((seat) => seat.x), [35, 285, 535, 785])
  const last = seats[seats.length - 1]
  assert.ok(last.x + SEAT_WIDTH <= HALL_WIDTH, 'the last seat stays inside the hall')
})

test('a full room of twenty is four rows of five', () => {
  const seats = seatLayout(20, 5)
  assert.equal(seatRows(20, 5), 4)
  assert.equal(hallHeight(20, 5), 4 * ROW_HEIGHT)
  assert.equal(seats[19].row, 3)
  assert.equal(seats[19].y, 3 * ROW_HEIGHT + 10)
})

test('the last row is left-aligned, not centred', () => {
  // Eighteen in a room of twenty should read as two empty desks at the back.
  const seats = seatLayout(18, 5)
  assert.equal(seats[15].column, 0)
  assert.equal(seats[15].x, seats[0].x)
})

test('a nonsense column count still produces a drawable hall', () => {
  const seats = seatLayout(3, 0)
  assert.deepEqual(seats.map((seat) => seat.row), [0, 1, 2])
  assert.deepEqual(seatLayout(-4, 5), [])
})

/* ---- normalizeSeat ----------------------------------------------------- */

test('an unknown seat piece falls back to the default rather than vanishing', () => {
  assert.deepEqual(normalizeSeat({ desk: 'hammock', device: 'laptop', chair: 'stool' }), {
    desk: DEFAULT_SEAT.desk,
    device: 'laptop',
    chair: 'stool',
  })
  assert.deepEqual(normalizeSeat(null), DEFAULT_SEAT)
  assert.deepEqual(normalizeSeat(undefined), DEFAULT_SEAT)
})

test('a complete seat is passed through unchanged', () => {
  const seat = { desk: 'corner' as const, device: 'iphone' as const, chair: 'stool' as const }
  assert.deepEqual(normalizeSeat(seat), seat)
})

/* ---- Placing people at desks ------------------------------------------- */

const person = (id: string, seatIndex?: number | null): SeatOccupant => ({
  id,
  name: id,
  seat: DEFAULT_SEAT,
  studying: false,
  speaking: false,
  seatIndex,
})

test('a room with nobody in it is still a room of empty desks', () => {
  assert.deepEqual(placeSeats([], 4), [null, null, null, null])
})

test('a member sits at the desk the server gave them, whoever else is in the room', () => {
  const desks = placeSeats([person('a', 3), person('b', 0)], 5)
  assert.deepEqual(desks.map((desk) => desk?.id ?? null), ['b', null, null, 'a', null])
})

test('a member with no desk fills the lowest free one', () => {
  const desks = placeSeats([person('a', 1), person('b'), person('c')], 4)
  assert.deepEqual(desks.map((desk) => desk?.id ?? null), ['b', 'a', 'c', null])
})

test('everyone with a desk is seated before anyone without, whatever the list order', () => {
  // `b` is listed first and has no desk; it must not be given desk 0 before
  // `a`, who was told desk 0 by the server, has had the chance to take it.
  const desks = placeSeats([person('b'), person('a', 0)], 3)
  assert.deepEqual(desks.map((desk) => desk?.id ?? null), ['a', 'b', null])
})

test('a desk number outside the room seats the member somewhere rather than nowhere', () => {
  const desks = placeSeats([person('a', 99), person('b', -1)], 3)
  assert.deepEqual(desks.map((desk) => desk?.id ?? null), ['a', 'b', null])
})

test('a room with more people than desks draws the desks it has', () => {
  const desks = placeSeats([person('a'), person('b'), person('c')], 2)
  assert.equal(desks.length, 2)
  assert.deepEqual(desks.map((desk) => desk?.id ?? null), ['a', 'b'])
})
