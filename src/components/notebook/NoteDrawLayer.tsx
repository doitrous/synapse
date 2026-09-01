import { useRef, useState } from 'react'
import type { NoteDrawing, NoteDrawStroke } from '@/data/notebook'
import { cn } from '@/lib/cn'

export type DrawTool = 'pen' | 'eraser'

/**
 * A freehand ink overlay for a note. It sits absolutely over (or under) the
 * editor's text — the parent decides the stacking order — and only captures
 * pointer events while the Draw tab is active, so typing is untouched the rest
 * of the time. Strokes are stored on the note as flat `[x, y, …]` point lists
 * in surface pixels.
 */
export function NoteDrawLayer({
  drawing,
  onChange,
  active,
  tool,
  color,
  width,
}: {
  drawing?: NoteDrawing
  onChange: (next: NoteDrawing) => void
  active: boolean
  tool: DrawTool
  color: string
  width: number
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [live, setLive] = useState<number[] | null>(null)
  const strokes = drawing?.strokes ?? []
  const placement = drawing?.placement ?? 'over'
  const latest = useRef(drawing)
  latest.current = drawing

  function pointFrom(event: React.PointerEvent): [number, number] {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return [0, 0]
    return [event.clientX - rect.left, event.clientY - rect.top]
  }

  function eraseAt(x: number, y: number) {
    const radius = Math.max(10, width * 2.5)
    const remaining = strokes.filter((stroke) => !strokeNear(stroke, x, y, radius))
    if (remaining.length !== strokes.length) onChange({ strokes: remaining, placement })
  }

  function onPointerDown(event: React.PointerEvent) {
    if (!active) return
    event.preventDefault()
    svgRef.current?.setPointerCapture(event.pointerId)
    const [x, y] = pointFrom(event)
    if (tool === 'eraser') { eraseAt(x, y); return }
    setLive([x, y])
  }

  function onPointerMove(event: React.PointerEvent) {
    if (!active || event.buttons === 0) return
    const [x, y] = pointFrom(event)
    if (tool === 'eraser') { eraseAt(x, y); return }
    setLive((current) => (current ? [...current, x, y] : current))
  }

  function onPointerUp() {
    if (!active) return
    setLive((current) => {
      if (current && current.length >= 4) {
        const previous = latest.current
        onChange({
          strokes: [...(previous?.strokes ?? []), { points: current, color, width }],
          placement: previous?.placement ?? 'over',
        })
      }
      return null
    })
  }

  return (
    <svg
      ref={svgRef}
      aria-hidden={!active}
      className={cn(
        'absolute inset-0 h-full w-full',
        placement === 'over' ? 'z-20' : 'z-0',
        active ? 'cursor-crosshair touch-none' : 'pointer-events-none',
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {strokes.map((stroke, index) => (
        <polyline
          key={index}
          points={toPoints(stroke.points)}
          fill="none"
          stroke={stroke.color}
          strokeWidth={stroke.width}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {live && live.length >= 2 && (
        <polyline points={toPoints(live)} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function toPoints(points: number[]): string {
  let out = ''
  for (let i = 0; i + 1 < points.length; i += 2) out += `${points[i]},${points[i + 1]} `
  return out.trim()
}

function strokeNear(stroke: NoteDrawStroke, x: number, y: number, radius: number): boolean {
  const r2 = radius * radius
  for (let i = 0; i + 1 < stroke.points.length; i += 2) {
    const dx = stroke.points[i] - x
    const dy = stroke.points[i + 1] - y
    if (dx * dx + dy * dy <= r2) return true
  }
  return false
}
