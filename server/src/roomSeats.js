/**
 * Where a member sits in a study room, and whether they are working.
 *
 * Pure, so the rules that decide a seat can be tested without a database — the
 * same split `partyRules.js` makes for who may walk into a party. `parties.js`
 * sources the inputs and writes the rows; nothing here touches a pool.
 *
 * The vocabulary is deliberately the client's: `src/lib/rooms/roomPresence.ts`
 * lists the same three desks, five devices and two chairs, because a seat the
 * server accepts and the browser cannot draw is a seat nobody sees. If a
 * variant is ever added, it is added in both files or in neither.
 */

export const SEAT_DESKS = ['plain', 'drawer', 'corner']
export const SEAT_DEVICES = ['laptop', 'desktop', 'tablet', 'iphone', 'android']
export const SEAT_CHAIRS = ['stool', 'office', 'ergonomic', 'executive', 'lounge', 'gaming']

/** Twenty desks to a room — four rows of five, as the hall is drawn. */
export const ROOM_CAPACITY = 20

/** The two things a member can be. Anything else is a lie about a person. */
export const ACTIVITIES = ['studying', 'idle']

/**
 * How long a member's last heartbeat counts for.
 *
 * Two minutes: the client beats every thirty seconds, so a member survives
 * three missed beats before the room shows them idle. Shorter would flicker
 * somebody off over one dropped request; longer would show a room full of
 * people who closed the tab.
 */
export const ACTIVE_WINDOW_MS = 120_000

function oneOf(list, value) {
  return typeof value === 'string' && list.includes(value) ? value : undefined
}

/**
 * Make a seat request safe to store, or say why it is not.
 *
 * Every piece is optional and every omitted piece is stored NULL rather than
 * defaulted: a null desk means "this member has not chosen", which the browser
 * draws with the default furniture. Filling it in here would make a choice on
 * a student's behalf and then be indistinguishable from one they made.
 *
 * A piece that is *present but unknown* is refused rather than dropped. A
 * client sending `desk: 'hammock'` has a bug, and silently storing NULL would
 * hide it behind a seat that merely looks wrong.
 */
export function normalizeSeatInput(body,capacity=ROOM_CAPACITY) {
  const raw = body && typeof body === 'object' ? body : {}
  const given = (key) => Object.prototype.hasOwnProperty.call(raw, key)

  const piece = (list, key, name) => {
    // Absent means "leave it alone" — the same rule the desk number follows,
    // and for the same reason. A caller that PATCHes only `{ seatIndex: 7 }` —
    // the obvious shape of a "move me to desk 7" control — must not have their
    // desk, device and chair wiped to NULL as a side effect, redrawing them
    // with default furniture in everybody else's hall while their own browser,
    // reading the local preference, is the one place it does not show.
    if (!given(key)) return { ok: true, value: undefined }
    const value = raw[key]
    // Present and empty is a real choice: "I have not picked one."
    if (value === null || value === '') return { ok: true, value: null }
    const found = oneOf(list, value)
    return found ? { ok: true, value: found } : { ok: false, reason: `invalid_${name}` }
  }

  const desk = piece(SEAT_DESKS, 'desk', 'desk')
  if (!desk.ok) return desk
  const device = piece(SEAT_DEVICES, 'device', 'device')
  if (!device.ok) return device
  const chair = piece(SEAT_CHAIRS, 'chair', 'chair')
  if (!chair.ok) return chair

  // Likewise for the desk number: saving new furniture is a different act from
  // standing up, and a PATCH of `{ desk }` that also unseated the member would
  // move somebody across the room every time they changed their chair.
  let index
  if (given('seatIndex')) {
    index = normalizeSeatIndex(raw.seatIndex,capacity)
    if (index === undefined) return { ok: false, reason: 'invalid_seat_index' }
  }

  return { ok: true, seat: { desk: desk.value, device: device.value, chair: chair.value, seatIndex: index } }
}

/**
 * A desk number, or null for "not seated anywhere in particular".
 *
 * Returns `undefined` — distinct from null — for a value that was sent and is
 * not a desk in this room, so the caller can refuse rather than quietly
 * unseating somebody who asked for desk 41.
 */
export function normalizeSeatIndex(value,capacity=ROOM_CAPACITY) {
  if (value === undefined || value === null || value === '') return null
  const index = Number(value)
  if (!Number.isInteger(index)) return undefined
  if (index < 0 || index >= capacity) return undefined
  return index
}

/** `'studying'` or `'idle'`. Anything else — including nothing — is idle. */
export function normalizeActivity(value) {
  return oneOf(ACTIVITIES, value) ?? 'idle'
}

/**
 * Whether `seatIndex` is already somebody else's desk.
 *
 * Your own desk never conflicts with itself: saving new furniture without
 * moving is the common case, and it must not be refused.
 */
export function seatIndexTaken(members, seatIndex, userId) {
  if (seatIndex === null || seatIndex === undefined) return false
  return members.some(
    (member) => member.userId !== userId && Number(member.seatIndex) === Number(seatIndex),
  )
}

/**
 * The lowest desk nobody is sitting at, or null when the room is full.
 *
 * Used to seat a member who arrives without a desk. Lowest-first rather than
 * random so a room of three people is three desks at the front, not three
 * desks scattered through an empty hall.
 */
export function firstFreeSeatIndex(members, userId, capacity = ROOM_CAPACITY) {
  const taken = new Set()
  for (const member of members) {
    if (member.userId === userId) continue
    const index = Number(member.seatIndex)
    if (Number.isInteger(index)) taken.add(index)
  }
  for (let index = 0; index < capacity; index++) {
    if (!taken.has(index)) return index
  }
  return null
}

/**
 * The seat a member row carries, or null when they have never chosen one.
 *
 * A row with a desk number but no furniture is still a seat — the member has a
 * place in the room and default furniture — so this only returns null when
 * every column is empty.
 */
export function seatFromRow(row) {
  const seatIndex = row?.seatIndex === null || row?.seatIndex === undefined ? null : Number(row.seatIndex)
  const desk = oneOf(SEAT_DESKS, row?.seatDesk) ?? null
  const device = oneOf(SEAT_DEVICES, row?.seatDevice) ?? null
  const chair = oneOf(SEAT_CHAIRS, row?.seatChair) ?? null
  if (seatIndex === null && !desk && !device && !chair) return null
  return { desk, device, chair, seatIndex: Number.isInteger(seatIndex) ? seatIndex : null }
}

/**
 * What a member's stored activity means right now.
 *
 * Takes the *age* of the heartbeat in seconds rather than its timestamp, and
 * that is the whole point: a DATETIME column, the driver that parses it and
 * this process may disagree about what timezone they are in, and a room where
 * everybody reads idle because the database is three hours ahead is a bug
 * nobody would look for here. The age is measured by the database against its
 * own clock — `TIMESTAMPDIFF(SECOND, last_active_at, NOW())` — so there is only
 * one clock in the comparison.
 *
 * A member who said "studying" ten minutes ago and has not been heard from
 * since is idle: the heartbeat is the claim, and the claim expires. This is the
 * server's half of the judgement `isStudying` makes in the browser.
 *
 * A negative age (a heartbeat from the future, i.e. clock skew of a second or
 * two inside the database itself) counts as fresh rather than as nonsense.
 */
export function activityAfter(activity, ageSeconds) {
  if (ageSeconds === null || ageSeconds === undefined) return 'idle'
  const age = Number(ageSeconds)
  if (!Number.isFinite(age)) return 'idle'
  if (age * 1000 > ACTIVE_WINDOW_MS) return 'idle'
  return normalizeActivity(activity)
}
