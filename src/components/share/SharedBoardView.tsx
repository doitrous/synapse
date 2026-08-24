import { useMemo, useRef, useState } from 'react'
import { Download, FileText, Maximize, ZoomIn, ZoomOut } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { clamp } from '@/lib/format'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { BOARD, anchorOf, clampView, linkPath, sidesBetween } from '@/lib/whiteboardGeometry'
import {
  FILE_H, FILE_W, NOTE_H, NOTE_W, TONES, filesOf, imagesOf, inkOf, inkPath, type BoardState,
} from '@/data/whiteboard'

/**
 * A shared board, to look at.
 *
 * Deliberately not the editor with its controls hidden. Everything the editor
 * does — dragging, connecting, drawing, uploading — needs the student's own
 * account behind it, and half of it needs their document store; a viewer that
 * reached for any of that would be one missing guard away from writing to
 * somebody else's record. This draws the shapes and nothing else, from the same
 * description of a board the editor writes, so what is published is what is
 * seen. Panning and zooming are the only interactions.
 *
 * Files are named rather than linked: the bytes live in the owner's own
 * document store, which is theirs and only theirs, so offering a reader here
 * would be offering something the server would rightly refuse.
 */
export function SharedBoardView({ board }: { board: BoardState }) {
  const t = useT()
  const canvasRef = useRef<HTMLDivElement>(null)
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 })
  const pan = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null)

  const byId = (id: string) => board.notes.find((note) => note.id === id)

  const bounds = useMemo(() => {
    const xs = [
      ...board.notes.flatMap((note) => [note.x, note.x + NOTE_W]),
      ...board.frames.flatMap((frame) => [frame.x, frame.x + frame.width]),
      ...imagesOf(board).flatMap((image) => [image.x, image.x + image.width]),
      ...filesOf(board).flatMap((file) => [file.x, file.x + FILE_W]),
    ]
    const ys = [
      ...board.notes.flatMap((note) => [note.y, note.y + NOTE_H]),
      ...board.frames.flatMap((frame) => [frame.y, frame.y + frame.height]),
      ...imagesOf(board).flatMap((image) => [image.y, image.y + image.height]),
      ...filesOf(board).flatMap((file) => [file.y, file.y + FILE_H]),
    ]
    return { minX: Math.min(...xs, 0) - 60, minY: Math.min(...ys, 0) - 60, maxX: Math.max(...xs, 800) + 60, maxY: Math.max(...ys, 500) + 60 }
  }, [board])

  function fit() {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const width = bounds.maxX - bounds.minX
    const height = bounds.maxY - bounds.minY
    const scale = clamp(Math.min((rect.width - 60) / width, (rect.height - 60) / height), 0.2, 1.5)
    setView(clampView(
      { x: (rect.width - width * scale) / 2 - bounds.minX * scale, y: (rect.height - height * scale) / 2 - bounds.minY * scale, scale },
      { width: rect.width, height: rect.height },
    ))
  }

  function zoomBy(factor: number, cx?: number, cy?: number) {
    const rect = canvasRef.current?.getBoundingClientRect()
    const px = cx ?? (rect ? rect.width / 2 : 0)
    const py = cy ?? (rect ? rect.height / 2 : 0)
    setView((current) => {
      const scale = clamp(current.scale * factor, 0.2, 2.5)
      const wx = (px - current.x) / current.scale
      const wy = (py - current.y) / current.scale
      return clampView({ x: px - wx * scale, y: py - wy * scale, scale }, { width: rect?.width ?? 0, height: rect?.height ?? 0 })
    })
  }

  return (
    <div
      ref={canvasRef}
      onPointerDown={(event) => { pan.current = { sx: event.clientX, sy: event.clientY, ox: view.x, oy: view.y } }}
      onPointerMove={(event) => {
        const active = pan.current
        if (!active) return
        const rect = canvasRef.current?.getBoundingClientRect()
        setView((current) => clampView(
          { ...current, x: active.ox + (event.clientX - active.sx), y: active.oy + (event.clientY - active.sy) },
          { width: rect?.width ?? 0, height: rect?.height ?? 0 },
        ))
      }}
      onPointerUp={() => { pan.current = null }}
      onPointerLeave={() => { pan.current = null }}
      onWheel={(event) => {
        const rect = canvasRef.current?.getBoundingClientRect()
        if (!rect) return
        zoomBy(Math.exp(-event.deltaY * (event.ctrlKey ? 0.012 : 0.0055)), event.clientX - rect.left, event.clientY - rect.top)
      }}
      className="relative h-[70vh] min-h-[24rem] cursor-grab touch-none overflow-hidden rounded-xl border border-line bg-paper active:cursor-grabbing"
      style={{
        backgroundImage: 'radial-gradient(var(--color-grid-major) 1.2px, transparent 1.2px)',
        backgroundSize: `${24 * view.scale}px ${24 * view.scale}px`,
        backgroundPosition: `${view.x}px ${view.y}px`,
      }}
    >
      <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}>
        {board.frames.map((frame) => (
          <div
            key={frame.id}
            className="pointer-events-none absolute rounded-xl border border-dashed border-line-2 bg-surface/25"
            style={{ left: frame.x, top: frame.y, width: frame.width, height: frame.height }}
          >
            <span className="absolute -top-6 left-0 truncate text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">{frame.title}</span>
          </div>
        ))}

        <svg className="pointer-events-none absolute left-0 top-0" width={BOARD.width} height={BOARD.height}>
          {board.links.map((line) => {
            const a = byId(line.from)
            const b = byId(line.to)
            if (!a || !b) return null
            const sides = sidesBetween(a, b)
            const { d } = linkPath(anchorOf(a, sides.from), anchorOf(b, sides.to), line.c1 && line.c2 ? [line.c1, line.c2] : null)
            return <path key={line.id} d={d} fill="none" stroke="var(--color-line-2)" strokeWidth={1.5} />
          })}
          {inkOf(board).map((stroke) => (
            <path
              key={stroke.id}
              d={inkPath(stroke.points)}
              fill="none"
              stroke={stroke.color}
              strokeWidth={stroke.width}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>

        {imagesOf(board).map((image) => (
          <div
            key={image.id}
            className="pointer-events-none absolute overflow-hidden rounded-lg border border-line bg-surface shadow-panel"
            style={{ left: image.x, top: image.y, width: image.width, height: image.height }}
          >
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} className="size-full object-contain" />
          </div>
        ))}

        {filesOf(board).map((file) => (
          <div
            key={file.id}
            className="pointer-events-none absolute flex items-center gap-2.5 rounded-lg border border-line bg-surface p-3 shadow-panel"
            style={{ left: file.x, top: file.y, width: FILE_W, height: FILE_H }}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-inset text-ink-2">
              <Icon icon={file.kind === 'pdf' ? FileText : Download} size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-medium text-ink">{file.name}</span>
              <span className="mt-0.5 block text-[10.5px] text-ink-3">{t('Attached to this board')}</span>
            </span>
          </div>
        ))}

        {board.notes.map((note) => (
          <div
            key={note.id}
            className={cn('pointer-events-none absolute rounded-lg border p-3 shadow-panel', TONES[note.tone])}
            style={{ left: note.x, top: note.y, width: NOTE_W, height: NOTE_H }}
          >
            <p className="size-full overflow-hidden whitespace-pre-wrap break-words text-[13px] leading-snug text-ink">{note.text}</p>
          </div>
        ))}
      </div>

      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-xl border border-line bg-surface p-1 shadow-raised" onPointerDown={(event) => event.stopPropagation()}>
        <IconButton icon={ZoomOut} label={t('Zoom out')} onClick={() => zoomBy(0.8)} />
        <span className="tnum w-11 text-center font-mono text-[12px] text-ink-2">{Math.round(view.scale * 100)}%</span>
        <IconButton icon={ZoomIn} label={t('Zoom in')} onClick={() => zoomBy(1.25)} />
        <IconButton icon={Maximize} label={t('Fit board to screen')} onClick={fit} />
      </div>
    </div>
  )
}
