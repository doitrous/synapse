import { useRef } from 'react'
import { useT } from '@/lib/i18n'
import type { Point } from '@/lib/reader/annotations'

/**
 * A straight edge to draw against.
 *
 * One ruler for the reader rather than one per page: a ruler is a thing you
 * put on the book, not a thing the book has. It is never stored — it is where
 * you are holding it right now, not a mark you made.
 *
 * The body drags it; the two ends turn and lengthen it. Strokes that begin
 * close to it are projected onto it — see `RULER_CAPTURE` in `InkSurface`.
 */

export function RulerLayer({
  ruler,
  divisor,
  onChange,
}: {
  ruler: { a: Point; b: Point }
  /** Page-space units to pixels at the current scale. */
  divisor: number
  onChange: (next: { a: Point; b: Point }) => void
}) {
  const t = useT()
  const drag = useRef<{ x: number; y: number } | null>(null)

  const ax = ruler.a.x * divisor
  const ay = ruler.a.y * divisor
  const bx = ruler.b.x * divisor
  const by = ruler.b.y * divisor
  const length = Math.hypot(bx - ax, by - ay)
  const angle = (Math.atan2(by - ay, bx - ax) * 180) / Math.PI

  const endHandle = (which: 'a' | 'b') => ({
    onPointerDown: (event: React.PointerEvent) => {
      event.stopPropagation()
      ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
      drag.current = { x: event.clientX, y: event.clientY }
    },
    onPointerMove: (event: React.PointerEvent) => {
      if (!drag.current) return
      const box = (event.currentTarget as HTMLElement).offsetParent?.getBoundingClientRect()
      if (!box) return
      const point = { x: (event.clientX - box.left) / divisor, y: (event.clientY - box.top) / divisor }
      onChange(which === 'a' ? { a: point, b: ruler.b } : { a: ruler.a, b: point })
    },
    onPointerUp: (event: React.PointerEvent) => {
      drag.current = null
      ;(event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId)
    },
  })

  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        role="group"
        aria-label={t('Ruler')}
        className="pointer-events-auto absolute cursor-move rounded-[2px] border border-primary bg-[color-mix(in_srgb,var(--color-primary)_14%,var(--color-surface))]/85"
        style={{
          left: ax,
          top: ay - 11,
          width: length,
          height: 22,
          transform: `rotate(${angle}deg)`,
          transformOrigin: '0 50%',
        }}
        onPointerDown={(event) => {
          event.stopPropagation()
          ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
          drag.current = { x: event.clientX, y: event.clientY }
        }}
        onPointerMove={(event) => {
          if (!drag.current) return
          const dx = (event.clientX - drag.current.x) / divisor
          const dy = (event.clientY - drag.current.y) / divisor
          drag.current = { x: event.clientX, y: event.clientY }
          onChange({
            a: { x: ruler.a.x + dx, y: ruler.a.y + dy },
            b: { x: ruler.b.x + dx, y: ruler.b.y + dy },
          })
        }}
        onPointerUp={(event) => {
          drag.current = null
          ;(event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId)
        }}
      >
        {/* The drawing edge, marked so it is obvious which side to draw along. */}
        <span className="absolute inset-x-0 bottom-0 h-px bg-primary" aria-hidden />
      </div>

      {(['a', 'b'] as const).map((which) => (
        <button
          key={which}
          type="button"
          aria-label={which === 'a' ? t('Turn the ruler from this end') : t('Turn the ruler from the other end')}
          className="pointer-events-auto absolute size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border border-primary bg-surface shadow-panel active:cursor-grabbing"
          style={{ left: which === 'a' ? ax : bx, top: which === 'a' ? ay : by }}
          {...endHandle(which)}
        />
      ))}
    </div>
  )
}
