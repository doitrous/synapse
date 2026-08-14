import { useCallback, useEffect, useRef } from 'react'
import {
  boundsOf, newObjectId, nextZ, widthInPixels,
  type AnnotationObject, type InkObject, type NoteTone, type PageMetrics, type PenTool, type Point, type Rect,
} from '@/lib/reader/annotations'
import { encodePoints, simplify } from '@/lib/reader/strokeCodec'
import { strokesAlongPath } from '@/lib/reader/hitTest'
import { Stabilizer } from '@/lib/reader/stabilize'
import { recogniseShape, shapePath } from '@/lib/reader/shapeRecognition'
import { rectanglePolygon, selectInLasso } from '@/lib/reader/lasso'
import { paintStroke } from './InkLayer'

/**
 * Where every mark is made.
 *
 * The gesture in progress is drawn on its own canvas and nowhere else.
 * Committing each sample to the stored marks would repaint every stroke on the
 * page on every pointer move — the difference between ink that follows the hand
 * and ink that trails it.
 */

export type Tool = 'pan' | 'pen' | 'highlighter' | 'eraser' | 'lasso' | 'shape' | 'note' | 'text' | 'tape' | 'laser'

export type EraserMode = 'stroke' | 'area'

export type LassoMode = 'free' | 'rect'

export interface ToolSettings {
  color: string
  /** Page-space units — the same on every document and at every zoom. */
  width: number
  pen: PenTool
  /** 0..1. */
  stabilization: number
  eraserRadius: number
  eraserMode: EraserMode
  /** When true the eraser leaves handwriting alone. */
  eraserHighlighterOnly: boolean
  tone: NoteTone
  /** Snap a drawn shape to the primitive it resembles. */
  snapShapes: boolean
  /** How the lasso encloses: a drawn loop, or a dragged rectangle. */
  lasso: LassoMode
  /** Constrain a stroke to the ruler's line, when one is placed. */
  ruler: { a: Point; b: Point } | null
}

export interface SurfaceHandlers {
  onCommit: (object: AnnotationObject) => void
  onErase: (ids: string[]) => void
  onSelect: (ids: string[]) => void
  onDrawnRect: (tool: 'note' | 'text' | 'tape', rect: Rect) => void
}

/** How close a stroke has to start to the ruler before it snaps to it. */
const RULER_CAPTURE = 0.03
/** A drawn shape below this is left as ink rather than straightened. */
const SNAP_CONFIDENCE = 0.55

export function InkSurface({
  tool,
  settings,
  page,
  metrics,
  scale,
  dpr,
  objects,
  handlers,
}: {
  tool: Tool
  settings: ToolSettings
  page: number
  metrics: PageMetrics
  scale: number
  dpr: number
  objects: AnnotationObject[]
  handlers: SurfaceHandlers
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<Point[]>([])
  const start = useRef<Point | null>(null)
  const stabilizer = useRef<Stabilizer | null>(null)
  const drawing = useRef(false)
  /** Shift was held when the lasso began: select by rectangle, not by loop. */
  const boxSelect = useRef(false)
  const live = useRef({ objects, settings, tool, handlers })
  live.current = { objects, settings, tool, handlers }

  const size = useCallback(() => ({ width: metrics.width * scale, height: metrics.height * scale }), [metrics, scale])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { width, height } = size()
    canvas.width = Math.max(1, Math.floor(width * dpr))
    canvas.height = Math.max(1, Math.floor(height * dpr))
    canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
  }, [dpr, size])

  const toPage = (event: PointerEvent | React.PointerEvent, canvas: HTMLCanvasElement): Point => {
    const box = canvas.getBoundingClientRect()
    const divisor = metrics.width * scale
    return {
      x: (event.clientX - box.left) / divisor,
      y: (event.clientY - box.top) / divisor,
      pressure: event.pressure > 0 ? event.pressure : 0.5,
    }
  }

  const draft = (activeTool: Tool, current: ToolSettings): InkObject => ({
    id: 'draft',
    kind: activeTool === 'highlighter' ? 'highlighter' : 'ink',
    page,
    z: 0,
    t: 0,
    tool: activeTool === 'highlighter' ? 'highlighter' : current.pen,
    color: activeTool === 'laser' ? '#e5484d' : current.color,
    w: activeTool === 'highlighter' ? current.width * 4 : current.width,
    a: activeTool === 'highlighter' ? 0.35 : 1,
    bbox: [0, 0, 0, 0],
    p: [],
  })

  /** Repaint the gesture in progress. Never touches the committed marks. */
  const wet = () => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const { width, height } = size()
    const divisor = metrics.width * scale
    context.clearRect(0, 0, width, height)
    const path = points.current
    if (!path.length) return
    const { settings: current, tool: activeTool } = live.current

    if (activeTool === 'eraser') {
      context.save()
      context.strokeStyle = 'rgba(120,120,120,0.35)'
      context.lineWidth = Math.max(2, widthInPixels(current.eraserRadius * 2, metrics, scale))
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.beginPath()
      context.moveTo(path[0].x * divisor, path[0].y * divisor)
      for (const point of path) context.lineTo(point.x * divisor, point.y * divisor)
      context.stroke()
      context.restore()
      return
    }

    if (activeTool === 'lasso') {
      context.save()
      context.strokeStyle = 'var(--color-accent)'
      context.setLineDash([5, 4])
      context.lineWidth = 1.5
      // Shift turns the free loop into a marquee — the same gesture, straightened.
      const marquee = boxSelect.current ? dragRect() : null
      if (marquee) {
        context.strokeRect(marquee[0] * divisor, marquee[1] * divisor, (marquee[2] - marquee[0]) * divisor, (marquee[3] - marquee[1]) * divisor)
        context.restore()
        return
      }
      context.beginPath()
      context.moveTo(path[0].x * divisor, path[0].y * divisor)
      for (const point of path) context.lineTo(point.x * divisor, point.y * divisor)
      context.closePath()
      context.stroke()
      context.restore()
      return
    }

    if (activeTool === 'note' || activeTool === 'text' || activeTool === 'tape') {
      const rect = dragRect()
      if (!rect) return
      context.save()
      context.strokeStyle = 'var(--color-accent)'
      context.setLineDash([4, 3])
      context.lineWidth = 1.5
      context.strokeRect(rect[0] * divisor, rect[1] * divisor, (rect[2] - rect[0]) * divisor, (rect[3] - rect[1]) * divisor)
      context.restore()
      return
    }

    paintStroke(context, draft(activeTool, current), metrics, scale, path)
  }

  const dragRect = (): Rect | null => {
    const from = start.current
    const to = points.current[points.current.length - 1]
    if (!from || !to) return null
    return [Math.min(from.x, to.x), Math.min(from.y, to.y), Math.max(from.x, to.x), Math.max(from.y, to.y)]
  }

  /** Project onto the ruler when the stroke began close enough to it. */
  const applyRuler = (point: Point): Point => {
    const ruler = live.current.settings.ruler
    if (!ruler) return point
    const dx = ruler.b.x - ruler.a.x
    const dy = ruler.b.y - ruler.a.y
    const lengthSquared = dx * dx + dy * dy
    if (lengthSquared === 0) return point
    const t = Math.max(0, Math.min(1, ((point.x - ruler.a.x) * dx + (point.y - ruler.a.y) * dy) / lengthSquared))
    const projected = { x: ruler.a.x + t * dx, y: ruler.a.y + t * dy, pressure: point.pressure }
    return Math.hypot(projected.x - point.x, projected.y - point.y) <= RULER_CAPTURE ? projected : point
  }

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (tool === 'pan' || event.button !== 0) return
    const canvas = canvasRef.current
    if (!canvas) return
    event.preventDefault()
    event.stopPropagation()
    drawing.current = true
    // Shift is the shortcut for the rectangle; the settings popover is where it
    // can be found without being told.
    boxSelect.current = tool === 'lasso' && (event.shiftKey || settings.lasso === 'rect')
    const point = applyRuler(toPage(event, canvas))
    start.current = point
    stabilizer.current = new Stabilizer(settings.stabilization)
    points.current = [stabilizer.current.push(point)]
    canvas.setPointerCapture(event.pointerId)
    wet()
  }

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    // Coalesced events are what make fast ink look drawn rather than
    // polygonal: on a 120 Hz pen this is thirty samples a frame, not eight.
    const batch = typeof event.nativeEvent.getCoalescedEvents === 'function'
      ? event.nativeEvent.getCoalescedEvents()
      : [event.nativeEvent]
    for (const sample of batch) {
      const raw = applyRuler(toPage(sample, canvas))
      points.current.push(stabilizer.current ? stabilizer.current.push(raw) : raw)
    }
    wet()
  }

  const finish = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    drawing.current = false
    canvasRef.current?.releasePointerCapture?.(event.pointerId)

    const raw = points.current[points.current.length - 1]
    if (raw && stabilizer.current) points.current.push(...stabilizer.current.finish(raw))
    const path = points.current
    const rect = dragRect()
    points.current = []
    start.current = null
    stabilizer.current = null
    wet()
    if (!path.length) return

    const { settings: current, tool: activeTool, objects: onPage, handlers: hooks } = live.current

    if (activeTool === 'laser') return // ephemeral by design: never stored

    if (activeTool === 'eraser') {
      const candidates = current.eraserHighlighterOnly
        ? onPage.filter((object) => object.kind === 'highlighter')
        : onPage
      hooks.onErase(strokesAlongPath(candidates, path, current.eraserRadius))
      return
    }

    if (activeTool === 'lasso') {
      const polygon = boxSelect.current && rect
        ? rectanglePolygon({ x: rect[0], y: rect[1] }, { x: rect[2], y: rect[3] })
        : path
      boxSelect.current = false
      hooks.onSelect(selectInLasso(onPage, polygon, new Set(['ink', 'highlighter', 'tape', 'note', 'textbox'])))
      return
    }

    if (activeTool === 'note' || activeTool === 'text' || activeTool === 'tape') {
      if (!rect) return
      // A click rather than a drag still means "put one here".
      const wide = rect[2] - rect[0] > 0.02 && rect[3] - rect[1] > 0.01
      const placed: Rect = wide ? rect : [rect[0], rect[1], rect[0] + 0.28, rect[1] + 0.16]
      hooks.onDrawnRect(activeTool, placed)
      return
    }

    let committed = simplify(path)
    if (activeTool === 'shape' || (activeTool === 'pen' && current.snapShapes)) {
      const shape = recogniseShape(path)
      if (shape && shape.confidence >= SNAP_CONFIDENCE) committed = shapePath(shape)
      else if (activeTool === 'shape') committed = simplify(path)
    }

    const base = draft(activeTool, current)
    hooks.onCommit({
      ...base,
      id: newObjectId(),
      z: nextZ(onPage),
      t: Date.now(),
      bbox: boundsOf(committed, base.w / 2),
      p: encodePoints(committed),
    })
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{
        width: '100%',
        height: '100%',
        // The page scrolls and pinches under a finger unless a tool owns it.
        touchAction: tool === 'pan' ? 'auto' : 'none',
        cursor: tool === 'pan' ? 'auto' : 'crosshair',
        pointerEvents: tool === 'pan' ? 'none' : 'auto',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finish}
      onPointerCancel={finish}
    />
  )
}
