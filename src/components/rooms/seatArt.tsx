import type { SeatChair, SeatDesk, SeatDevice } from '@/lib/rooms/roomPresence'

/**
 * The furniture and the person, drawn as one continuous hairline sketch.
 *
 * Everything here is pen work: `--color-ink` at 1.6, `--color-surface` where a
 * shape has to sit in front of another one, and nothing else. No fills that
 * carry meaning, no shading, no second weight — the scene has to survive being
 * scaled from 1000 units down to a 340px phone, and a sketch does that where a
 * drawing with rendered detail does not.
 *
 * One seat occupies a 180 × 200 box (`SEAT_WIDTH` × `SEAT_HEIGHT` in
 * `roomPresence`), origin top-left, with the desk surface at y = 128 and the
 * name plate at y = 186. Every variant is drawn to those two lines so a corner
 * desk and a plain one seat the same character at the same height.
 */

const STROKE = 1.6

/** The desk surface every device stands on and every hand rests on. */
const DESK_TOP = 128

interface Pen {
  /** `--color-ink` for someone who is here, `--color-ink-3` for an empty desk. */
  ink: string
}

function pen(ink: string) {
  return {
    stroke: ink,
    strokeWidth: STROKE,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  }
}

/* ---- Desks ------------------------------------------------------------- */

export function DeskArt({ variant, ink }: Pen & { variant: SeatDesk }) {
  const p = pen(ink)
  return (
    <g>
      {/* The corner desk's return goes behind the main surface, so it is drawn first. */}
      {variant === 'corner' && (
        <path {...p} fill="var(--color-surface)" d="M20 128 L20 112 L58 112 L58 128 Z" />
      )}
      <rect {...p} fill="var(--color-surface)" x={20} y={DESK_TOP} width={140} height={9} rx={2} />
      <line {...p} x1={30} y1={137} x2={30} y2={176} />
      <line {...p} x1={150} y1={137} x2={150} y2={176} />
      {variant === 'plain' && <line {...p} x1={30} y1={150} x2={150} y2={150} />}
      {variant === 'drawer' && (
        <>
          <rect {...p} fill="var(--color-surface)" x={108} y={139} width={44} height={30} rx={2} />
          <line {...p} x1={120} y1={154} x2={140} y2={154} />
        </>
      )}
      {variant === 'corner' && <line {...p} x1={30} y1={152} x2={150} y2={152} />}
    </g>
  )
}

/* ---- Chairs ------------------------------------------------------------ */

/**
 * The chair, with the cushion as the one place colour is allowed: your own
 * seat's cushion is crimson so you can find yourself in a hall of twenty
 * without reading a single name.
 */
export function ChairArt({ variant, ink, cushion }: Pen & { variant: SeatChair; cushion: string }) {
  const p = pen(ink)
  return (
    <g>
      {variant === 'office' && (
        <rect {...p} fill="var(--color-surface)" x={64} y={40} width={52} height={74} rx={12} />
      )}
      <ellipse {...p} fill={cushion} cx={90} cy={116} rx={30} ry={9} />
      {variant === 'stool' ? (
        <>
          <line {...p} x1={90} y1={124} x2={90} y2={150} />
          <line {...p} x1={76} y1={162} x2={104} y2={162} />
          <line {...p} x1={90} y1={150} x2={76} y2={162} />
          <line {...p} x1={90} y1={150} x2={104} y2={162} />
        </>
      ) : (
        <>
          <line {...p} x1={90} y1={124} x2={90} y2={152} />
          <line {...p} x1={72} y1={166} x2={108} y2={166} />
          <line {...p} x1={90} y1={152} x2={72} y2={166} />
          <line {...p} x1={90} y1={152} x2={108} y2={166} />
        </>
      )}
    </g>
  )
}

/* ---- Devices ----------------------------------------------------------- */

/** What is open on the desk. Five silhouettes, each recognisable at 40px wide. */
export function DeviceArt({ variant, ink }: Pen & { variant: SeatDevice }) {
  const p = pen(ink)
  switch (variant) {
    case 'laptop':
      return (
        <g>
          <path {...p} fill="var(--color-surface)" d="M72 128 L78 102 L106 102 L112 128 Z" />
          <line {...p} x1={80} y1={110} x2={104} y2={110} />
          <line {...p} x1={81} y1={118} x2={103} y2={118} />
        </g>
      )
    case 'desktop':
      return (
        <g>
          <rect {...p} fill="var(--color-surface)" x={66} y={92} width={48} height={30} rx={2} />
          <line {...p} x1={90} y1={122} x2={90} y2={128} />
          <line {...p} x1={78} y1={128} x2={102} y2={128} />
          <line {...p} x1={74} y1={100} x2={96} y2={100} />
        </g>
      )
    case 'tablet':
      return (
        <g>
          <rect {...p} fill="var(--color-surface)" x={72} y={98} width={36} height={30} rx={3} />
          <line {...p} x1={78} y1={106} x2={102} y2={106} />
          <line {...p} x1={78} y1={114} x2={96} y2={114} />
        </g>
      )
    case 'iphone':
      return (
        <g>
          <rect {...p} fill="var(--color-surface)" x={80} y={100} width={20} height={28} rx={4} />
          {/* The notch: the one line that tells the two phones apart. */}
          <line {...p} x1={85} y1={104} x2={95} y2={104} />
        </g>
      )
    case 'android':
      return (
        <g>
          <rect {...p} fill="var(--color-surface)" x={80} y={100} width={20} height={28} rx={3} />
          <circle {...p} cx={90} cy={105} r={1.6} />
        </g>
      )
  }
}

/* ---- The person -------------------------------------------------------- */

/**
 * Twelve strokes: head, neck, two shoulders into a torso, two upper arms, two
 * forearms and two hands. The forearms are one group so they move together —
 * an arm that types on its own reads as a twitch, not as work.
 */
export function CharacterArt({ ink, typing }: Pen & { typing: boolean }) {
  const p = pen(ink)
  return (
    <g>
      <circle {...p} fill="var(--color-surface)" cx={90} cy={44} r={15} />
      <line {...p} x1={90} y1={59} x2={90} y2={68} />
      <path {...p} fill="var(--color-surface)" d="M66 112 C66 84 74 68 90 68 C106 68 114 84 114 112 Z" />
      <line {...p} x1={70} y1={82} x2={58} y2={104} />
      <line {...p} x1={110} y1={82} x2={122} y2={104} />
      <g className={typing ? 'seat-arm' : undefined}>
        <line {...p} x1={58} y1={104} x2={76} y2={124} />
        <line {...p} x1={122} y1={104} x2={104} y2={124} />
        <circle {...p} fill="var(--color-surface)" cx={76} cy={125} r={3.4} />
        <circle {...p} fill="var(--color-surface)" cx={104} cy={125} r={3.4} />
      </g>
    </g>
  )
}

/**
 * The ring that says someone has the floor.
 *
 * Never the only signal: the room's "Speaking now" list names the same people
 * in text, because a pulse in accent blue is exactly the kind of state a
 * colour-blind or reduced-motion reader would otherwise miss entirely.
 */
export function SpeakingRing() {
  return (
    <circle
      className="seat-speak"
      cx={90}
      cy={44}
      r={23}
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth={2}
    />
  )
}

/* ---- Pickers ----------------------------------------------------------- */

/**
 * One piece of furniture on its own, for the customiser's rows of choices.
 *
 * The same paths as the hall, framed tightly on the piece being chosen, so
 * what a student picks in the dialog is literally what appears at their desk.
 */
export function SeatPiecePreview({
  kind,
  variant,
  className,
}: {
  kind: 'desk' | 'device' | 'chair'
  variant: SeatDesk | SeatDevice | SeatChair
  className?: string
}) {
  const ink = 'var(--color-ink)'
  const box =
    kind === 'desk' ? '10 100 160 86'
      : kind === 'device' ? '58 88 64 46'
        : '56 32 68 142'
  return (
    <svg viewBox={box} className={className} aria-hidden="true" focusable="false">
      {kind === 'desk' && <DeskArt ink={ink} variant={variant as SeatDesk} />}
      {kind === 'device' && <DeviceArt ink={ink} variant={variant as SeatDevice} />}
      {kind === 'chair' && (
        <ChairArt ink={ink} variant={variant as SeatChair} cushion="var(--color-surface)" />
      )}
    </svg>
  )
}
