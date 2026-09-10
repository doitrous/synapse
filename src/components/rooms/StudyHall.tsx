import { useEffect, useMemo, useState } from 'react'
import {
  HALL_WIDTH,
  ROW_HEIGHT,
  SEAT_WIDTH,
  hallHeight,
  seatLayout,
  type SeatOccupant,
} from '@/lib/rooms/roomPresence'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import { Seat } from './Seat'
import './rooms.css'

export type { SeatOccupant } from '@/lib/rooms/roomPresence'

/** Below `md` a row of five leaves each desk too narrow to read. */
const WIDE_QUERY = '(min-width: 768px)'

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * The room itself: desks on an mist floor, one person to a desk.
 *
 * The scene is a single SVG scaled by its `viewBox`, and the names and the hit
 * areas are HTML laid over it at the same coordinates. That split is the whole
 * trick: SVG text would shrink to five pixels on a phone, and an SVG `<g>` with
 * a `tabindex` is a weaker button than a button. Because the SVG scales
 * uniformly, a seat's percentage box in the overlay lands exactly on its
 * drawing at every width.
 *
 * The overlay is positioned with physical `left`/`top` on purpose. The hall is
 * a picture of a room, not a directional layout — mirroring the overlay under
 * RTL without mirroring the drawing would put every name over the wrong desk,
 * and mirroring the drawing too would leave a room of left-handed people
 * sitting at reversed desks. The room stays put; only the text inside the
 * plates flows with the language.
 */
export function StudyHall({
  seats,
  columns,
  selfId,
  capacity,
  onSeatClick,
  className,
}: {
  /**
   * The room, desk by desk. A `null` is an empty desk *in the middle* of the
   * hall, which a live room needs and a list of occupants cannot express: a
   * member who sits at desk 11 must be drawn at desk 11 whoever else is here.
   */
  seats: (SeatOccupant | null)[]
  /** Forced row width. Left out, the hall uses five desks a row and four below `md`. */
  columns?: 4 | 5
  selfId: string
  /** How many desks the room holds. Anything past the occupants is drawn empty. */
  capacity?: number
  /**
   * Opening a desk: your own opens the seat customiser, anyone else's opens
   * their member menu. Only an occupied desk is rendered as a control, so this
   * is never called with an empty one.
   */
  onSeatClick?: (occupant: SeatOccupant | null, index: number) => void
  className?: string
}) {
  const t = useT()
  const [wide, setWide] = useState(
    () => typeof window === 'undefined' || window.matchMedia(WIDE_QUERY).matches,
  )

  useEffect(() => {
    if (columns) return
    const query = window.matchMedia(WIDE_QUERY)
    const onChange = () => setWide(query.matches)
    onChange()
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [columns])

  const cols: 4 | 5 = columns ?? (wide ? 5 : 4)
  const total = Math.max(seats.length, capacity ?? seats.length, 1)
  const positions = useMemo(() => seatLayout(total, cols), [total, cols])
  const height = hallHeight(total, cols)

  const seated = seats.filter((seat): seat is SeatOccupant => Boolean(seat))
  const studyingCount = seated.filter((seat) => seat.studying).length
  const speakingCount = seated.filter((seat) => seat.speaking).length

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-mist-line bg-mist', className)}>
      <svg
        viewBox={`0 0 ${HALL_WIDTH} ${height}`}
        className="block h-auto w-full"
        aria-hidden="true"
        focusable="false"
      >
        {positions.map((position) => (
          <Seat
            key={position.index}
            occupant={seats[position.index] ?? null}
            isSelf={seats[position.index]?.id === selfId}
            x={position.x}
            y={position.y}
          />
        ))}
      </svg>

      {/*
        One plate a desk. It is the name, and — for a seat that is doing
        something — the word for what that is, because the typing arm and the
        speaking ring are motion and colour, and neither survives reduced
        motion or a colour-blind reader on its own.
      */}
      <div className="absolute inset-0">
        {positions.map((position) => {
          const occupant = seats[position.index] ?? null
          const isSelf = occupant?.id === selfId
          const label = occupant
            ? `${occupant.name}${isSelf ? ` — ${t('you')}` : ''}${occupant.studying ? ` — ${t('studying')}` : ''}${occupant.speaking ? ` — ${t('speaking')}` : ''}`
            : t('Empty desk')
          const style = {
            left: `${(position.x / HALL_WIDTH) * 100}%`,
            top: `${(position.y / height) * 100}%`,
            width: `${(SEAT_WIDTH / HALL_WIDTH) * 100}%`,
            // A whole row, not just the drawing: the art stops at the desk
            // legs, and the extra 44 units below them is the floor the name
            // plate stands on. Sized to the drawing, the plate would sit on
            // the desk instead — which on a phone means on top of the person.
            height: `${(ROW_HEIGHT / height) * 100}%`,
          }
          const plate = (
            // Hidden from assistive technology: the `sr-only` line above says
            // the same thing in one sentence, and reading the plate as well
            // would announce every name twice.
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-0.5">
              {occupant ? (
                <>
                  <span
                    className={cn(
                      'max-w-full truncate rounded-md border px-1 py-0 text-[10px] font-medium leading-tight sm:px-1.5 sm:py-0.5 sm:text-[11px]',
                      isSelf
                        ? 'border-primary-line bg-surface text-primary-strong'
                        : 'border-mist-line bg-surface text-ink',
                    )}
                  >
                    <span className="hidden sm:inline">{occupant.name}</span>
                    <span className="sm:hidden">{initials(occupant.name)}</span>
                  </span>
                  {/* On a phone the desks are too small for a second line under
                      them; the roster beside the hall carries the same words at
                      every width, so nothing is lost by dropping it here. */}
                  {(occupant.studying || occupant.speaking) && (
                    <span className="hidden max-w-full truncate text-[10.5px] text-ink-2 sm:block">
                      {occupant.speaking ? t('Speaking') : t('Studying')}
                    </span>
                  )}
                </>
              ) : null}
            </span>
          )

          /*
           * Only the seat that does something is a control.
           *
           * Every cell used to be a button, which put twenty tab stops in front
           * of the room controls — fourteen announcing "Empty desk" and five
           * announcing a classmate's name — and all but one of them did
           * nothing when pressed. A keyboard user was made to walk past the
           * whole room to reach Join voice. An empty desk is still a picture,
           * not a button; every occupied one is now a control — your own opens
           * the customiser, anyone else's opens their member menu (message
           * them privately today, mute or block in a later task).
           */
          if (!onSeatClick || !occupant) {
            return (
              <span key={position.index} className="absolute" style={style}>
                <span className="sr-only">{label}</span>
                {plate}
              </span>
            )
          }

          return (
            <button
              key={position.index}
              type="button"
              // 44px on touch is the whole cell: even four to a row on a 390px
              // phone leaves each desk well above the minimum.
              className="seat-hit absolute rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              style={style}
              onClick={() => onSeatClick(occupant, position.index)}
            >
              <span className="sr-only">{isSelf ? t('Customise your seat') : t('Open member options')}</span>
              {plate}
            </button>
          )
        })}
      </div>

      {/* The scene in words, for anyone who is not looking at it. Not a live
          region: the "In the room" roster beside the hall is the same fact, and
          two of them announcing on mount reads the room out twice. */}
      <p className="sr-only">
        {seated.length} {seated.length === 1 ? t('person in the room') : t('people in the room')} ·{' '}
        {studyingCount} {t('studying')} · {speakingCount} {t('speaking')}
      </p>
    </div>
  )
}
