import { useEffect, useRef } from 'react'
import { decodePoints } from '@/lib/reader/strokeCodec'
import { widthInPixels, type AnnotationObject, type InkObject, type PageMetrics, type Point } from '@/lib/reader/annotations'

/**
 * The marks on one page, painted.
 *
 * Two canvases, not one: the highlighter multiplies and has to sit *under* the
 * handwriting, exactly as it does on paper — highlighting a sentence after
 * annotating it must not cover the note. Each repaints only when its own marks
 * change.
 *
 * Canvas rather than SVG because ink is geometry, not documents: a page can
 * carry hundreds of strokes, and each would otherwise be a DOM node with a
 * layout box the browser has to reason about. Text widgets go the other way —
 * they need IME, selection and RTL, so they belong in the DOM.
 */

export function InkLayer({
  objects,
  metrics,
  scale,
  dpr,
}: {
  objects: AnnotationObject[]
  metrics: PageMetrics
  scale: number
  dpr: number
}) {
  const under = useRef<HTMLCanvasElement>(null)
  const over = useRef<HTMLCanvasElement>(null)

  // The signature, not the array: a new array of the same marks should not
  // repaint, and a page of four hundred strokes repaints on none of them.
  // `t` is what makes a *changed* mark repaint — recolouring or moving a stroke
  // leaves its id and its z exactly as they were.
  const signature = objects.map((object) => `${object.id}:${object.z}:${object.t}`).join(',')

  useEffect(() => {
    const width = metrics.width * scale
    const height = metrics.height * scale
    for (const [ref, kind] of [[under, 'highlighter'], [over, 'ink']] as const) {
      const canvas = ref.current
      const context = canvas?.getContext('2d')
      if (!canvas || !context) continue
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = kind === 'highlighter' ? 'multiply' : 'source-over'
      for (const object of objects) {
        if (object.kind !== kind) continue
        paintStroke(context, object as InkObject, metrics, scale)
      }
    }
    // `signature` stands in for `objects`; see above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, metrics.width, metrics.height, scale, dpr])

  const style = { width: '100%', height: '100%' } as const
  return (
    <>
      <canvas ref={under} className="pointer-events-none absolute inset-0" style={style} />
      <canvas ref={over} className="pointer-events-none absolute inset-0" style={style} />
    </>
  )
}

/** One stroke, in page-space units converted to pixels at paint time. */
export function paintStroke(
  context: CanvasRenderingContext2D,
  object: InkObject,
  metrics: PageMetrics,
  scale: number,
  override?: Point[],
) {
  const points = override ?? decodePoints(object.p)
  if (!points.length) return
  const divisor = metrics.width * scale
  const width = Math.max(0.5, widthInPixels(object.w, metrics, scale))

  context.save()
  context.strokeStyle = object.color
  context.globalAlpha = object.a ?? 1
  context.lineWidth = width
  context.lineJoin = 'round'
  context.lineCap = object.kind === 'highlighter' ? 'butt' : 'round'

  if (points.length === 1) {
    context.fillStyle = object.color
    context.beginPath()
    context.arc(points[0].x * divisor, points[0].y * divisor, width / 2, 0, Math.PI * 2)
    context.fill()
    context.restore()
    return
  }

  context.beginPath()
  context.moveTo(points[0].x * divisor, points[0].y * divisor)
  // Quadratic through the midpoints: a polyline of raw samples shows every
  // corner the hand made, which reads as a shaky line rather than a drawn one.
  for (let index = 1; index < points.length - 1; index++) {
    const current = points[index]
    const next = points[index + 1]
    context.quadraticCurveTo(
      current.x * divisor,
      current.y * divisor,
      ((current.x + next.x) / 2) * divisor,
      ((current.y + next.y) / 2) * divisor,
    )
  }
  const last = points[points.length - 1]
  context.lineTo(last.x * divisor, last.y * divisor)
  context.stroke()
  context.restore()
}
