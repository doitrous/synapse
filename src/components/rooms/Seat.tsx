import type { SeatOccupant, SeatPreference } from '@/lib/rooms/roomPresence'
import { CharacterArt, ChairArt, DeskArt, DeviceArt, SpeakingRing } from './seatArt'

/**
 * What an unclaimed desk looks like: the plainest of everything.
 *
 * Not `DEFAULT_SEAT` — that has the office chair, and fourteen empty high-
 * backed chairs in a room of twenty read as a row of headstones rather than as
 * space to sit in. An empty desk should be the quietest thing in the hall.
 */
const EMPTY_SEAT: SeatPreference = { desk: 'plain', device: 'laptop', chair: 'stool' }

/**
 * One desk in the hall, drawn inside its own 180 × 200 box.
 *
 * Pure art: no text, no hit area, no interactivity. The name under the desk
 * and the button that opens it are HTML laid over the scene by `StudyHall`,
 * because SVG text shrinks with the viewBox and a name at five pixels is not a
 * name — it is a smudge.
 *
 * Order matters and is the order a pen would take it: chair first (the back
 * goes behind the shoulders), then the person, then the desk, which occludes
 * the lower body the way a real desk does, then whatever is on it.
 */
export function Seat({
  occupant,
  isSelf,
  x,
  y,
}: {
  occupant: SeatOccupant | null
  isSelf: boolean
  x: number
  y: number
}) {
  const seat = occupant?.seat ?? EMPTY_SEAT
  // An empty desk is drawn in the faint ink rather than hidden: a room of
  // twenty with six people in it should look like a room with room in it.
  const ink = occupant ? 'var(--color-ink)' : 'var(--color-ink-3)'
  const cushion = isSelf ? 'var(--color-primary)' : 'var(--color-surface)'

  return (
    <g transform={`translate(${x} ${y})`}>
      <ChairArt ink={ink} variant={seat.chair} cushion={occupant ? cushion : 'var(--color-surface)'} />
      {occupant && <CharacterArt ink={ink} typing={occupant.studying} />}
      {occupant?.speaking && <SpeakingRing />}
      <DeskArt ink={ink} variant={seat.desk} />
      {occupant && <DeviceArt ink={ink} variant={seat.device} />}
    </g>
  )
}
