import {
  isStudying,
  type SeatOccupant,
  type SeatPreference,
} from './roomPresence'

/**
 * The room the demo build sits you in.
 *
 * With no backend configured there are no parties to read, so the study hall
 * would otherwise be an empty floor — the one thing this whole surface exists
 * to show. This seeds a single, obviously-named room so the scene, the seat
 * customiser and the voice controls can all be exercised without an account.
 *
 * Nothing here is written anywhere and nothing pretends to be live: the demo
 * room's occupants never change, and no seeded member is ever reported as
 * audible. Only their study state and the speaking *ring* are seeded, and the
 * room's own note says voice is not connected.
 */

export const DEMO_ROOM_ID = 'demo-room'
export const DEMO_ROOM_CODE = 'KTP0R2'
export const DEMO_ROOM_NAME = 'Cardiology evening sprint'
export const DEMO_ROOM_CAPACITY = 20

interface DemoMember {
  id: string
  name: string
  seat: SeatPreference
  /** How long ago they last did something, in milliseconds. */
  lastActiveAgoMs: number
  speaking: boolean
}

/**
 * Five seeded classmates, plus you.
 *
 * One is mid-sentence and one has been working for the last few seconds; the
 * rest have gone quiet, which is what a real room looks like at nine in the
 * evening. The stamps are relative so the scene reads the same whenever the
 * demo is opened.
 */
const DEMO_MEMBERS: readonly DemoMember[] = [
  {
    id: 'demo-nour',
    name: 'Nour Hassan',
    seat: { desk: 'drawer', device: 'laptop', chair: 'office' },
    lastActiveAgoMs: 8_000,
    speaking: false,
  },
  {
    id: 'demo-salma',
    name: 'Salma Adel',
    seat: { desk: 'plain', device: 'tablet', chair: 'stool' },
    lastActiveAgoMs: 6 * 60_000,
    speaking: true,
  },
  {
    id: 'demo-youssef',
    name: 'Youssef Fahmy',
    seat: { desk: 'corner', device: 'desktop', chair: 'office' },
    lastActiveAgoMs: 4 * 60_000,
    speaking: false,
  },
  {
    id: 'demo-kareem',
    name: 'Kareem Saad',
    seat: { desk: 'plain', device: 'iphone', chair: 'stool' },
    lastActiveAgoMs: 11 * 60_000,
    speaking: false,
  },
  {
    id: 'demo-mariam',
    name: 'Mariam Zaki',
    seat: { desk: 'drawer', device: 'android', chair: 'office' },
    lastActiveAgoMs: 25 * 60_000,
    speaking: false,
  },
]

/**
 * The demo room's occupants, with you in the second seat.
 *
 * Your own study state is not seeded — it is passed in from the same activity
 * the rest of the app measures, so sitting still in the demo really does dim
 * your own desk.
 */
export function demoRoomSeats(
  self: { id: string; name: string; seat: SeatPreference; lastActiveAt: number },
  now: number,
  speakingIds: ReadonlySet<string> = new Set<string>(),
): SeatOccupant[] {
  const seeded = DEMO_MEMBERS.map((member) => ({
    id: member.id,
    name: member.name,
    seat: member.seat,
    studying: isStudying(now - member.lastActiveAgoMs, now),
    speaking: member.speaking,
  }))
  const you: SeatOccupant = {
    id: self.id,
    name: self.name,
    seat: self.seat,
    studying: isStudying(self.lastActiveAt, now),
    speaking: speakingIds.has(self.id),
  }
  return [seeded[0], you, ...seeded.slice(1)]
}

export interface DemoRoomSummary {
  id: string
  code: string
  name: string
  members: number
  capacity: number
  speaking: number
  /** True for the room the demo student is already standing in. */
  mine: boolean
}

export const DEMO_ROOM_SUMMARY: DemoRoomSummary = {
  id: DEMO_ROOM_ID,
  code: DEMO_ROOM_CODE,
  name: DEMO_ROOM_NAME,
  members: DEMO_MEMBERS.length + 1,
  capacity: DEMO_ROOM_CAPACITY,
  speaking: DEMO_MEMBERS.filter((member) => member.speaking).length,
  mine: true,
}

/** Other rooms the demo cohort has open, so the lobby's second list is not empty. */
export const DEMO_OPEN_ROOMS: readonly DemoRoomSummary[] = [
  { id: 'demo-room-anatomy', code: 'M4XB19', name: 'Anatomy spot test drill', members: 11, capacity: 20, speaking: 2, mine: false },
  { id: 'demo-room-pharma', code: 'Q7WD53', name: 'Pharmacology quiet hall', members: 4, capacity: 12, speaking: 0, mine: false },
  { id: 'demo-room-finals', code: 'ZR2K84', name: 'Finals all-nighter', members: 19, capacity: 20, speaking: 3, mine: false },
]

/** Every room the demo build knows about, yours first. */
export const DEMO_ROOMS: readonly DemoRoomSummary[] = [DEMO_ROOM_SUMMARY, ...DEMO_OPEN_ROOMS]

/**
 * Look a demo room up by id or by the code in the address bar.
 *
 * The lookups are what make `?room=M4XB19` mean the Anatomy hall rather than
 * silently showing the Cardiology one: the seeded occupants are shared, but the
 * name, code and capacity on the header are the room you actually asked for.
 */
export function demoRoomById(id: string): DemoRoomSummary | null {
  return DEMO_ROOMS.find((room) => room.id === id) ?? null
}

export function demoRoomByCode(code: string): DemoRoomSummary | null {
  const wanted = code.trim().toUpperCase()
  return DEMO_ROOMS.find((room) => room.code === wanted) ?? null
}
