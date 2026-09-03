/**
 * The one room a student is currently in, remembered across pages and reloads.
 *
 * The study room used to live and die with the Study Rooms page: navigating
 * anywhere tore down the socket and the call. This is the small piece of state
 * that lets the room outlive the page — it is read once at app start and
 * written whenever the student joins or leaves — while the live objects (the
 * socket, the SFU call) are held by `RoomSessionProvider`.
 *
 * Only *live* rooms are remembered. A demo room is a scene on one page, not a
 * membership, and re-opening the app into a demo room nobody is in would be a
 * puzzle, not a convenience.
 */

export interface ActiveRoom {
  /** The party id — the database key the hall and the heartbeat address. */
  roomId: string
  /** The code in the address bar: shareable, and what the socket dials. */
  roomCode: string
  /** Remembered so the dock can name the room before the party has re-fetched. */
  roomName?: string
  /** A seeded demo room: never persisted, never given a socket. */
  demo?: boolean
}

/** Bumped only if the stored shape changes in a way older readers cannot parse. */
export const ACTIVE_ROOM_KEY = 'nishany.rooms.active.v1'

/**
 * Whether two rooms name the same membership.
 *
 * The code is the address a student can change (a normalised `?party=`), so the
 * id is the identity: same id is the same room even if the code arrived in a
 * different case or under the old param.
 */
export function sameRoom(a: ActiveRoom | null, b: ActiveRoom | null): boolean {
  if (!a || !b) return a === b
  return a.roomId === b.roomId
}

/** Read the remembered room, or null. A malformed or partial value reads as null. */
export function loadActiveRoom(storage: Pick<Storage, 'getItem'> | undefined = safeStorage()): ActiveRoom | null {
  if (!storage) return null
  let raw: string | null
  try {
    raw = storage.getItem(ACTIVE_ROOM_KEY)
  } catch {
    return null
  }
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return null
    const { roomId, roomCode, roomName } = parsed as Record<string, unknown>
    if (typeof roomId !== 'string' || !roomId) return null
    if (typeof roomCode !== 'string' || !roomCode) return null
    return {
      roomId,
      roomCode,
      ...(typeof roomName === 'string' && roomName ? { roomName } : {}),
    }
  } catch {
    return null
  }
}

/**
 * Remember a live room, or forget the current one with `null`.
 *
 * A demo room is never written: it is neither a membership nor rejoinable, so
 * persisting it would reopen the app into a room the student was never in.
 */
export function saveActiveRoom(
  room: ActiveRoom | null,
  storage: Pick<Storage, 'setItem' | 'removeItem'> | undefined = safeStorage(),
): void {
  if (!storage) return
  try {
    if (!room || room.demo) {
      storage.removeItem(ACTIVE_ROOM_KEY)
      return
    }
    storage.setItem(
      ACTIVE_ROOM_KEY,
      JSON.stringify({ roomId: room.roomId, roomCode: room.roomCode, ...(room.roomName ? { roomName: room.roomName } : {}) }),
    )
  } catch {
    /* private browsing, or a full quota — the room simply is not remembered */
  }
}

function safeStorage(): Storage | undefined {
  try {
    return typeof window === 'undefined' ? undefined : window.localStorage
  } catch {
    return undefined
  }
}
