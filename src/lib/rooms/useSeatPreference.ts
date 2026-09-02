import { useCallback, useEffect, useMemo, useRef } from 'react'
import { API_MODE, apiPost, apiSend } from '@/lib/api'
import { usePersistentState } from '@/lib/usePersistentState'
import { DEFAULT_SEAT, normalizeSeat, type SeatPreference } from './roomPresence'

export type { SeatChair, SeatDesk, SeatDevice, SeatOccupant, SeatPreference } from './roomPresence'
export { DEFAULT_SEAT, SEAT_CHAIRS, SEAT_DESKS, SEAT_DEVICES, normalizeSeat } from './roomPresence'

/** One key, one document: the furniture a student picked for their own seat. */
export const SEAT_STORAGE_KEY = 'nishany.studyRooms.seat.v1'

/**
 * The student's own desk, chair and device.
 *
 * Persisted through the ordinary state boundary, so it follows the account in
 * live mode and stays in localStorage in the demo — the same treatment every
 * other small preference gets. The value is normalised on the way out rather
 * than on the way in: a document written by an older build (or by a server that
 * has since dropped a variant) is still drawable, and correcting it silently is
 * kinder than showing an empty seat.
 *
 * Given a `roomCode`, and only in live mode, the seat is also the room's
 * business: the student is seated at a free desk on arrival and their furniture
 * is sent up, so everyone else's hall draws them as themselves rather than as
 * one more default desk. That write is deliberately fire-and-forget. A failed
 * PATCH means other people see the old furniture for a while, which is not
 * worth an error message in front of somebody who came here to study — and the
 * local preference, the one that decides what *they* see, has already been
 * saved.
 */
export function useSeatPreference(roomCode?: string | null): [SeatPreference, (next: SeatPreference) => void] {
  const [stored, setStored] = usePersistentState<SeatPreference>(SEAT_STORAGE_KEY, DEFAULT_SEAT)
  const seat = useMemo(() => normalizeSeat(stored), [stored])

  const live = Boolean(API_MODE && roomCode)
  const path = roomCode ? `/parties/${encodeURIComponent(roomCode)}` : null

  // Read by the arrival effect without making the seat a dependency of it:
  // changing a chair must not re-run "claim me a desk".
  const seatRef = useRef(seat)
  seatRef.current = seat

  /** Arriving: take a desk if we have none, then say what it looks like. */
  useEffect(() => {
    if (!live || !path) return undefined
    let cancelled = false
    void (async () => {
      try {
        await apiPost(`${path}/seat/claim`)
        if (cancelled) return
        await apiSend(`${path}/seat`, 'PATCH', seatRef.current)
      } catch {
        // The room still renders; this member simply appears at a default desk
        // to everyone else until the next save succeeds.
      }
    })()
    return () => { cancelled = true }
  }, [live, path])

  const set = useCallback(
    (next: SeatPreference) => {
      const normalized = normalizeSeat(next)
      setStored(normalized)
      // No `seatIndex` in the body on purpose: the server reads an absent desk
      // number as "leave the desk where it is", so changing a chair does not
      // stand the student up and walk them across the room.
      if (live && path) void apiSend(`${path}/seat`, 'PATCH', normalized).catch(() => undefined)
    },
    [setStored, live, path],
  )

  return [seat, set]
}
