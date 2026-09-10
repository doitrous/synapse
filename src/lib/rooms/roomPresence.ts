/**
 * The two questions a study hall has to answer before it can be drawn: who is
 * actually studying right now, and where each person sits.
 *
 * Deliberately free of React and of the DOM so it can be tested on Node the way
 * the rest of `src/lib` is. Everything the scene needs that is *not* a
 * judgement — the SVG geometry constants — lives here too, so the hall, the
 * seat art and the tests all measure from one ruler.
 */

/* ---- Seat preferences ------------------------------------------------- */

/**
 * A student's own furniture. Kept here rather than beside the hook that
 * persists it so this module stays the leaf: the hook, the scene and the
 * customiser all import the vocabulary from one place, and none of them drags
 * React into a file the unit tests load directly.
 */
export type SeatDesk = 'plain' | 'drawer' | 'corner'
export type SeatDevice = 'laptop' | 'desktop' | 'tablet' | 'iphone' | 'android'
export type SeatChair = 'stool' | 'office' | 'ergonomic' | 'executive' | 'lounge' | 'gaming'

export interface SeatPreference {
  desk: SeatDesk
  device: SeatDevice
  chair: SeatChair
}

export const SEAT_DESKS: readonly SeatDesk[] = ['plain', 'drawer', 'corner']
export const SEAT_DEVICES: readonly SeatDevice[] = ['laptop', 'desktop', 'tablet', 'iphone', 'android']
export const SEAT_CHAIRS: readonly SeatChair[] = ['stool', 'office', 'ergonomic', 'executive', 'lounge', 'gaming']

export const DEFAULT_SEAT: SeatPreference = { desk: 'plain', device: 'laptop', chair: 'office' }

/**
 * Make a stored (or server-sent) seat safe to draw.
 *
 * The preference is persisted per student and, in live mode, may come back from
 * a server that predates a variant being added or removed. Anything unknown
 * falls back to the default piece rather than leaving the scene with a hole in
 * it — a seat that fails to render is worse than a seat with a plain desk.
 */
export function normalizeSeat(value: unknown): SeatPreference {
  const raw = (value ?? {}) as Partial<Record<keyof SeatPreference, unknown>>
  return {
    desk: SEAT_DESKS.includes(raw.desk as SeatDesk) ? (raw.desk as SeatDesk) : DEFAULT_SEAT.desk,
    device: SEAT_DEVICES.includes(raw.device as SeatDevice) ? (raw.device as SeatDevice) : DEFAULT_SEAT.device,
    chair: SEAT_CHAIRS.includes(raw.chair as SeatChair) ? (raw.chair as SeatChair) : DEFAULT_SEAT.chair,
  }
}

/** One person in the hall, as the scene needs them. */
export interface SeatOccupant {
  id: string
  name: string
  seat: SeatPreference
  studying: boolean
  speaking: boolean
  /**
   * Which desk they sit at, when the room knows.
   *
   * Optional because the demo hall seats people in the order it lists them and
   * has no server to remember a desk. In a live room this is the server's
   * `seat_index`, and it is what makes a classmate keep the same desk between
   * one look at the hall and the next.
   */
  seatIndex?: number | null
}

/* ---- Studying ---------------------------------------------------------- */

/**
 * How recently someone must have done something to count as studying.
 *
 * Ninety seconds because the party read polls every four seconds and the study
 * heartbeat is per minute: anything shorter would flicker a present student off
 * between two heartbeats, and anything much longer would show a room full of
 * people who have closed the tab.
 */
export const STUDYING_WINDOW_MS = 90_000

/**
 * How long another member's heartbeat counts for.
 *
 * Longer than your own window because it is measured across two clocks and a
 * network: the room beats every thirty seconds, so a member survives three
 * missed beats before their desk dims. Matches `ACTIVE_WINDOW_MS` in
 * `server/src/roomSeats.js`, which makes the same judgement server-side.
 */
export const MEMBER_ACTIVE_WINDOW_MS = 120_000

/**
 * Whether a member counts as studying at `now`.
 *
 * Accepts what the server actually sends — an ISO string — as well as a
 * millisecond stamp for the locally tracked self. A missing, empty or
 * unparseable value is *not* studying: the honest answer to "we have never
 * heard from this person" is no, not a guess.
 *
 * A timestamp in the future counts as studying. Clocks disagree by seconds all
 * the time, and a student whose machine runs slightly fast should not read as
 * idle to everyone else.
 */
export function isStudying(
  lastActiveAt: string | number | Date | null | undefined,
  now: number,
  windowMs: number = STUDYING_WINDOW_MS,
): boolean {
  if (lastActiveAt === null || lastActiveAt === undefined || lastActiveAt === '') return false
  const at =
    typeof lastActiveAt === 'number'
      ? lastActiveAt
      : lastActiveAt instanceof Date
        ? lastActiveAt.getTime()
        : Date.parse(lastActiveAt)
  if (!Number.isFinite(at)) return false
  const elapsed = now - at
  if (elapsed < 0) return true
  return elapsed <= windowMs
}

/* ---- Layout ------------------------------------------------------------ */

/**
 * How many desks a room holds: four rows of five, as §12 draws it.
 *
 * Here rather than beside the lobby that shows it, because it is data the hall,
 * the room and the page all measure against — a constant living in a component
 * file is a component file that everything ends up importing.
 */
export const ROOM_CAPACITY = 20

/** The hall is drawn once at this width and scaled by the SVG viewBox. */
export const HALL_WIDTH = 1000
/** One row of desks, including the walkway behind it. */
export const ROW_HEIGHT = 220
/** The box one seat's art is drawn inside, in hall coordinates. */
export const SEAT_WIDTH = 180
export const SEAT_HEIGHT = 200
/** Breathing room above the first row so the mist floor is visible. */
export const ROW_PADDING_TOP = 10

export interface SeatPosition {
  index: number
  row: number
  column: number
  /** Top-left of this seat's `SEAT_WIDTH × SEAT_HEIGHT` art box, in hall coordinates. */
  x: number
  y: number
}

/**
 * Where each of `count` seats sits, in rows of `columns`.
 *
 * Rows fill left to right, top to bottom, and the last row is left-aligned
 * rather than centred: a hall of 20 with 18 people should still read as a room
 * with two empty desks at the back, not as a lopsided huddle.
 *
 * RTL is handled by the scene, not here — mirroring the whole SVG would mirror
 * the characters too, so the hall keeps one geometry and the labels flip.
 */
export function seatLayout(count: number, columns: number): SeatPosition[] {
  const cols = Math.max(1, Math.floor(columns))
  const total = Math.max(0, Math.floor(count))
  const cellWidth = HALL_WIDTH / cols
  const inset = (cellWidth - SEAT_WIDTH) / 2
  const positions: SeatPosition[] = []
  for (let index = 0; index < total; index++) {
    const row = Math.floor(index / cols)
    const column = index % cols
    positions.push({
      index,
      row,
      column,
      x: Math.round(column * cellWidth + inset),
      y: row * ROW_HEIGHT + ROW_PADDING_TOP,
    })
  }
  return positions
}

/** How many rows `count` seats need — at least one, so an empty hall still has a floor. */
export function seatRows(count: number, columns: number): number {
  const cols = Math.max(1, Math.floor(columns))
  return Math.max(1, Math.ceil(Math.max(0, Math.floor(count)) / cols))
}

/** The `viewBox` height that matches `seatLayout(count, columns)`. */
export function hallHeight(count: number, columns: number): number {
  return seatRows(count, columns) * ROW_HEIGHT
}

/**
 * Every desk in the room, with the person at it or nothing.
 *
 * A live room hands out desk numbers, so the hall cannot simply draw its
 * occupants in list order: a member who sits at desk 11 must be at desk 11
 * whoever else is in the room, or the room rearranges itself under people
 * every time somebody joins.
 *
 * Two passes, and the order matters. Everyone with a desk of their own is
 * seated first, so nobody without one can take it; then whoever is left fills
 * the lowest free desks in the order they were given. A desk number outside the
 * room, or one two members somehow both claim, is treated as no desk at all
 * rather than as a reason to draw nothing — the unique index on the table makes
 * the second case impossible, and a hall with a hole in it would be a worse
 * answer than a member sitting one desk over.
 */
export function placeSeats(occupants: SeatOccupant[], capacity: number): (SeatOccupant | null)[] {
  const desks: (SeatOccupant | null)[] = Array.from({ length: Math.max(0, Math.floor(capacity)) }, () => null)
  const unplaced: SeatOccupant[] = []

  for (const occupant of occupants) {
    const index = occupant.seatIndex
    if (typeof index === 'number' && Number.isInteger(index) && index >= 0 && index < desks.length && !desks[index]) {
      desks[index] = occupant
    } else {
      unplaced.push(occupant)
    }
  }

  let next = 0
  for (const occupant of unplaced) {
    while (next < desks.length && desks[next]) next++
    if (next >= desks.length) break
    desks[next] = occupant
  }
  return desks
}
