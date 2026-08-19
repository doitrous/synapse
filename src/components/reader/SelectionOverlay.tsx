import { useRef } from 'react'
import { boundsOfObjects, type AnnotationObject, type PageMetrics } from '@/lib/reader/annotations'
import { useT } from '@/lib/i18n'

/**
 * What the lasso caught, on one page.
 *
 * A single box around the whole selection rather than an outline per object:
 * the student selected a region, and a region is what they should see. Dragging
 * it moves everything inside, ink and widgets together — which is the only
 * reason to have selected several things at once.
 */

export function SelectionOverlay({
  objects,
  metrics,
  scale,
  onMove,
  onMoveEnd,
}: {
  /** The selected objects that live on this page. */
  objects: AnnotationObject[]
  metrics: PageMetrics
  scale: number
  onMove: (dx: number, dy: number) => void
  onMoveEnd: () => void
}) {
  const t = useT()
  const drag = useRef<{ x: number; y: number } | null>(null)
  const divisor = metrics.width * scale
  if (!objects.length) return null

  const box = boundsOfObjects(objects)
  const pad = 4

  return (
    <div
      role="group"
      aria-label={t('Selected marks')}
      className="absolute cursor-move rounded-[3px] border-2 border-dashed border-primary bg-primary-tint/20"
      style={{
        left: box[0] * divisor - pad,
        top: box[1] * divisor - pad,
        width: (box[2] - box[0]) * divisor + pad * 2,
        height: (box[3] - box[1]) * divisor + pad * 2,
        pointerEvents: 'auto',
      }}
      onPointerDown={(event) => {
        event.stopPropagation()
        drag.current = { x: event.clientX, y: event.clientY }
        ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        if (!drag.current) return
        onMove((event.clientX - drag.current.x) / divisor, (event.clientY - drag.current.y) / divisor)
        drag.current = { x: event.clientX, y: event.clientY }
      }}
      onPointerUp={(event) => {
        if (!drag.current) return
        drag.current = null
        ;(event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId)
        onMoveEnd()
      }}
    />
  )
}
