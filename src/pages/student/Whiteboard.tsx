import { useEffect, useMemo, useRef, useState } from 'react'
import { StickyNote, Spline, ZoomIn, ZoomOut, Maximize, Trash2, MousePointer2, Undo2, Redo2, PanelsTopLeft, Map, GripVertical } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { clamp } from '@/lib/format'
import { usePersistentState } from '@/lib/usePersistentState'
import { useT } from '@/lib/i18n'

interface Note { id: string; x: number; y: number; text: string; tone: keyof typeof TONES }
interface LinkLine { id: string; from: string; to: string }
interface Frame { id: string; x: number; y: number; width: number; height: number; title: string }
interface BoardState { notes: Note[]; links: LinkLine[]; frames: Frame[] }

const TONES = { paper: 'bg-surface border-line', teal: 'bg-accent-tint border-accent-line', amber: 'bg-warning-tint border-warning/30', rose: 'bg-danger-tint border-danger/25' } as const
const TONE_CYCLE = ['paper', 'teal', 'amber', 'rose'] as const
const NOTE_W = 176
const NOTE_H = 74
const INITIAL_BOARD: BoardState = {
  notes: [
    { id: 'n1', x: 360, y: 210, text: 'Heart failure', tone: 'teal' },
    { id: 'n2', x: 120, y: 90, text: '↓ Cardiac output', tone: 'paper' },
    { id: 'n3', x: 120, y: 330, text: 'Congestion → oedema & breathlessness', tone: 'paper' },
    { id: 'n4', x: 640, y: 90, text: 'RAAS activation', tone: 'amber' },
    { id: 'n5', x: 640, y: 220, text: 'Sympathetic drive', tone: 'amber' },
    { id: 'n6', x: 640, y: 350, text: 'Ventricular remodelling', tone: 'amber' },
    { id: 'n7', x: 900, y: 220, text: 'Four pillars block these pathways', tone: 'teal' },
  ],
  links: [
    { id: 'l1', from: 'n2', to: 'n1' }, { id: 'l2', from: 'n1', to: 'n3' }, { id: 'l3', from: 'n1', to: 'n4' },
    { id: 'l4', from: 'n1', to: 'n5' }, { id: 'l5', from: 'n1', to: 'n6' }, { id: 'l6', from: 'n4', to: 'n7' },
    { id: 'l7', from: 'n5', to: 'n7' }, { id: 'l8', from: 'n6', to: 'n7' },
  ],
  frames: [{ id: 'f1', x: 80, y: 48, width: 1080, height: 430, title: 'Heart failure · mechanism to treatment' }],
}

type NoteOffset = { id: string; ox: number; oy: number }
type Drag =
  | { type: 'pan'; sx: number; sy: number; ox: number; oy: number }
  | { type: 'note'; id: string; sx: number; sy: number; ox: number; oy: number }
  | { type: 'frame'; id: string; sx: number; sy: number; ox: number; oy: number; notes: NoteOffset[] }
  | { type: 'frame-resize'; id: string; sx: number; sy: number; ow: number; oh: number }
  | null

export function Whiteboard() {
  const t = useT()
  const canvasRef = useRef<HTMLDivElement>(null)
  const [view, setView] = useState({ x: 40, y: 40, scale: 1 })
  const [board, setBoard] = usePersistentState<BoardState>('synapse.whiteboard.board', INITIAL_BOARD)
  const [selected, setSelected] = useState<string | null>(null)
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null)
  const [editing, setEditing] = useState<string | null>(null)
  const [editingFrame, setEditingFrame] = useState<string | null>(null)
  const [connectMode, setConnectMode] = useState(false)
  const [connectFrom, setConnectFrom] = useState<string | null>(null)
  const drag = useRef<Drag>(null)
  const viewRef = useRef(view)
  const history = useRef<BoardState[]>([])
  const future = useRef<BoardState[]>([])
  viewRef.current = view

  const snapshot = () => structuredClone(board)
  function remember() { history.current.push(snapshot()); if (history.current.length > 50) history.current.shift(); future.current = [] }
  function undo() { const previous = history.current.pop(); if (!previous) return; future.current.push(snapshot()); setBoard(previous); setSelected(null) }
  function redo() { const next = future.current.pop(); if (!next) return; history.current.push(snapshot()); setBoard(next); setSelected(null) }

  useEffect(() => {
    function onMove(event: PointerEvent) {
      const active = drag.current
      if (!active) return
      const dx = event.clientX - active.sx
      const dy = event.clientY - active.sy
      const scale = viewRef.current.scale
      if (active.type === 'pan') {
        setView((current) => ({ ...current, x: active.ox + dx, y: active.oy + dy }))
      } else if (active.type === 'note') {
        setBoard((current) => ({ ...current, notes: current.notes.map((note) => note.id === active.id ? { ...note, x: active.ox + dx / scale, y: active.oy + dy / scale } : note) }))
      } else if (active.type === 'frame') {
        // Move the section and every note that was inside it together.
        const wdx = dx / scale
        const wdy = dy / scale
        setBoard((current) => ({
          ...current,
          frames: current.frames.map((frame) => frame.id === active.id ? { ...frame, x: active.ox + wdx, y: active.oy + wdy } : frame),
          notes: current.notes.map((note) => {
            const offset = active.notes.find((o) => o.id === note.id)
            return offset ? { ...note, x: offset.ox + wdx, y: offset.oy + wdy } : note
          }),
        }))
      } else if (active.type === 'frame-resize') {
        const wdx = dx / scale
        const wdy = dy / scale
        setBoard((current) => ({
          ...current,
          frames: current.frames.map((frame) => frame.id === active.id ? { ...frame, width: Math.max(180, active.ow + wdx), height: Math.max(120, active.oh + wdy) } : frame),
        }))
      }
    }
    function onUp() { drag.current = null }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
  }, [setBoard])

  function zoomBy(factor: number, cx?: number, cy?: number) {
    const rect = canvasRef.current?.getBoundingClientRect()
    const px = cx ?? (rect ? rect.width / 2 : 0)
    const py = cy ?? (rect ? rect.height / 2 : 0)
    setView((current) => {
      const scale = clamp(current.scale * factor, 0.25, 2.5)
      const wx = (px - current.x) / current.scale
      const wy = (py - current.y) / current.scale
      return { x: px - wx * scale, y: py - wy * scale, scale }
    })
  }

  function onWheel(event: React.WheelEvent) {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    // Exponential response — snappy for both mouse wheels and trackpad pinch,
    // and framerate-independent. Trackpad pinch arrives as ctrl+wheel.
    const intensity = event.ctrlKey ? 0.012 : 0.0055
    const factor = Math.exp(-event.deltaY * intensity)
    zoomBy(factor, event.clientX - rect.left, event.clientY - rect.top)
  }

  function backgroundDown(event: React.PointerEvent) {
    setSelected(null)
    setSelectedFrame(null)
    if (connectMode) { setConnectFrom(null); return }
    drag.current = { type: 'pan', sx: event.clientX, sy: event.clientY, ox: view.x, oy: view.y }
  }

  /** Notes whose centre sits inside a frame — they travel with it when moved. */
  function notesInFrame(frame: Frame): NoteOffset[] {
    return board.notes
      .filter((note) => {
        const cx = note.x + NOTE_W / 2
        const cy = note.y + NOTE_H / 2
        return cx >= frame.x && cx <= frame.x + frame.width && cy >= frame.y && cy <= frame.y + frame.height
      })
      .map((note) => ({ id: note.id, ox: note.x, oy: note.y }))
  }

  function frameDown(event: React.PointerEvent, frame: Frame) {
    event.stopPropagation()
    if (connectMode) return
    setSelectedFrame(frame.id)
    setSelected(null)
    remember()
    drag.current = { type: 'frame', id: frame.id, sx: event.clientX, sy: event.clientY, ox: frame.x, oy: frame.y, notes: notesInFrame(frame) }
  }

  function frameResizeDown(event: React.PointerEvent, frame: Frame) {
    event.stopPropagation()
    setSelectedFrame(frame.id)
    setSelected(null)
    remember()
    drag.current = { type: 'frame-resize', id: frame.id, sx: event.clientX, sy: event.clientY, ow: frame.width, oh: frame.height }
  }

  function removeFrame() {
    if (!selectedFrame) return
    remember()
    setBoard((current) => ({ ...current, frames: current.frames.filter((frame) => frame.id !== selectedFrame) }))
    setSelectedFrame(null)
  }

  function noteDown(event: React.PointerEvent, id: string) {
    event.stopPropagation()
    if (connectMode) {
      if (!connectFrom) setConnectFrom(id)
      else if (connectFrom !== id) { remember(); setBoard((current) => current.links.some((line) => line.from === connectFrom && line.to === id) ? current : { ...current, links: [...current.links, { id: `l${Date.now()}`, from: connectFrom, to: id }] }); setConnectFrom(null) }
      return
    }
    setSelected(id)
    const note = board.notes.find((item) => item.id === id)!
    remember()
    drag.current = { type: 'note', id, sx: event.clientX, sy: event.clientY, ox: note.x, oy: note.y }
  }

  function centerPoint() {
    const rect = canvasRef.current?.getBoundingClientRect()
    const cx = rect ? rect.width / 2 : 300
    const cy = rect ? rect.height / 2 : 200
    return { x: (cx - view.x) / view.scale, y: (cy - view.y) / view.scale }
  }

  function addNote() {
    remember()
    const center = centerPoint()
    const id = `n${Date.now()}`
    setBoard((current) => ({ ...current, notes: [...current.notes, { id, x: center.x - NOTE_W / 2, y: center.y - 30, text: '', tone: 'paper' }] }))
    setSelected(id); setSelectedFrame(null); setEditing(id)
  }

  function addFrame() {
    remember()
    const center = centerPoint()
    const id = `f${Date.now()}`
    setBoard((current) => ({ ...current, frames: [...current.frames, { id, x: center.x - 260, y: center.y - 150, width: 520, height: 300, title: t('New study section') }] }))
    setSelectedFrame(id)
    setSelected(null)
    setEditingFrame(id)
  }

  function removeSelected() {
    if (!selected) return
    remember()
    setBoard((current) => ({ ...current, notes: current.notes.filter((note) => note.id !== selected), links: current.links.filter((line) => line.from !== selected && line.to !== selected) }))
    setSelected(null)
  }

  function cycleTone(id: string) {
    remember()
    setBoard((current) => ({ ...current, notes: current.notes.map((note) => note.id === id ? { ...note, tone: TONE_CYCLE[(TONE_CYCLE.indexOf(note.tone) + 1) % TONE_CYCLE.length] } : note) }))
  }

  const bounds = useMemo(() => {
    const xs = [...board.notes.flatMap((note) => [note.x, note.x + NOTE_W]), ...board.frames.flatMap((frame) => [frame.x, frame.x + frame.width])]
    const ys = [...board.notes.flatMap((note) => [note.y, note.y + NOTE_H]), ...board.frames.flatMap((frame) => [frame.y, frame.y + frame.height])]
    return { minX: Math.min(...xs, 0) - 80, minY: Math.min(...ys, 0) - 80, maxX: Math.max(...xs, 800) + 80, maxY: Math.max(...ys, 500) + 80 }
  }, [board])

  function fitContent() {
    const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return
    const width = bounds.maxX - bounds.minX; const height = bounds.maxY - bounds.minY
    const scale = clamp(Math.min((rect.width - 80) / width, (rect.height - 80) / height), 0.25, 1.5)
    setView({ x: (rect.width - width * scale) / 2 - bounds.minX * scale, y: (rect.height - height * scale) / 2 - bounds.minY * scale, scale })
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (editing || editingFrame) return
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault()
        if (event.shiftKey) redo()
        else undo()
        return
      }
      if (event.key === 'Delete' || event.key === 'Backspace') {
        if (selected) { event.preventDefault(); removeSelected() }
        else if (selectedFrame) { event.preventDefault(); removeFrame() }
      }
      if (event.key === 'Escape') { setConnectFrom(null); setSelected(null); setSelectedFrame(null) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const byId = (id: string) => board.notes.find((note) => note.id === id)
  const miniWidth = 190; const miniHeight = 112; const worldWidth = bounds.maxX - bounds.minX; const worldHeight = bounds.maxY - bounds.minY
  const miniScale = Math.min(miniWidth / worldWidth, miniHeight / worldHeight)
  const canvasRect = canvasRef.current?.getBoundingClientRect()
  const visible = { x: (-view.x / view.scale - bounds.minX) * miniScale, y: (-view.y / view.scale - bounds.minY) * miniScale, width: ((canvasRect?.width ?? 0) / view.scale) * miniScale, height: ((canvasRect?.height ?? 0) / view.scale) * miniScale }

  return <div ref={canvasRef} onPointerDown={backgroundDown} onWheel={onWheel} className="relative h-[calc(100dvh-3.5rem-env(safe-area-inset-top))] touch-none overflow-hidden bg-paper" style={{ backgroundImage: 'radial-gradient(var(--color-grid-major) 1.2px, transparent 1.2px)', backgroundSize: `${24 * view.scale}px ${24 * view.scale}px`, backgroundPosition: `${view.x}px ${view.y}px` }}>
    <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}>
      {board.frames.map((frame) => (
        <div
          key={frame.id}
          className={cn(
            'pointer-events-none absolute rounded-xl border border-dashed bg-surface/25',
            selectedFrame === frame.id ? 'border-accent' : 'border-line-2',
          )}
          style={{ left: frame.x, top: frame.y, width: frame.width, height: frame.height }}
        >
          {/* Header: grip drags the whole section, the title is click-to-rename */}
          <div className="pointer-events-auto absolute -top-7 left-0 flex max-w-full items-center gap-1 rounded-md text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">
            <span
              onPointerDown={(event) => frameDown(event, frame)}
              title={t('Drag to move section')}
              className="grid size-6 shrink-0 cursor-grab place-items-center rounded hover:bg-surface active:cursor-grabbing"
            >
              <Icon icon={GripVertical} size={14} className="text-ink-3" />
            </span>
            {editingFrame === frame.id ? (
              <input
                autoFocus
                defaultValue={frame.title}
                onPointerDown={(event) => event.stopPropagation()}
                onBlur={(event) => { remember(); setBoard((current) => ({ ...current, frames: current.frames.map((f) => f.id === frame.id ? { ...f, title: event.target.value } : f) })); setEditingFrame(null) }}
                onKeyDown={(event) => { if (event.key === 'Enter') (event.target as HTMLInputElement).blur() }}
                className="w-56 rounded border border-line bg-surface px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.07em] text-ink outline-none"
              />
            ) : (
              <button
                type="button"
                onPointerDown={(event) => { event.stopPropagation(); setSelectedFrame(frame.id); setSelected(null) }}
                onClick={(event) => { event.stopPropagation(); setEditingFrame(frame.id) }}
                title={t('Click to rename')}
                className="truncate rounded px-1 py-0.5 hover:bg-surface hover:text-ink"
              >
                {frame.title || t('Untitled section')}
              </button>
            )}
          </div>
          {/* Resize handle */}
          <div
            onPointerDown={(event) => frameResizeDown(event, frame)}
            className="pointer-events-auto absolute -bottom-1.5 -right-1.5 size-4 cursor-nwse-resize rounded-sm border border-line-2 bg-surface shadow-panel rtl:-left-1.5 rtl:right-auto rtl:cursor-nesw-resize"
            aria-label={t('Resize section')}
          />
        </div>
      ))}
      <svg className="absolute overflow-visible" width={1} height={1}>{board.links.map((line) => { const a = byId(line.from); const b = byId(line.to); if (!a || !b) return null; const x1 = a.x + NOTE_W / 2; const y1 = a.y + 27; const x2 = b.x + NOTE_W / 2; const y2 = b.y + 27; const mx = (x1 + x2) / 2; return <path key={line.id} d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`} fill="none" stroke="var(--color-line-2)" strokeWidth={1.5} /> })}</svg>
      {board.notes.map((note) => <div key={note.id} onPointerDown={(event) => noteDown(event, note.id)} onDoubleClick={(event) => { event.stopPropagation(); setEditing(note.id) }} className={cn('absolute cursor-grab select-none rounded-lg border p-3 shadow-panel active:cursor-grabbing', TONES[note.tone], selected === note.id && 'ring-2 ring-accent ring-offset-1 ring-offset-paper', connectFrom === note.id && 'ring-2 ring-accent')} style={{ left: note.x, top: note.y, width: NOTE_W }}>
        {editing === note.id ? <textarea autoFocus defaultValue={note.text} onBlur={(event) => { remember(); setBoard((current) => ({ ...current, notes: current.notes.map((item) => item.id === note.id ? { ...item, text: event.target.value } : item) })); setEditing(null) }} onPointerDown={(event) => event.stopPropagation()} className="h-16 w-full resize-none bg-transparent text-[13px] leading-snug text-ink outline-none" /> : <p className="min-h-[1.5rem] whitespace-pre-wrap break-words text-[13px] leading-snug text-ink">{note.text || <span className="text-ink-3">{t('Double-click to edit…')}</span>}</p>}
        {selected === note.id && !connectMode && <button onPointerDown={(event) => { event.stopPropagation(); cycleTone(note.id) }} className="absolute -right-2 -top-2 size-5 rounded-full border border-line bg-surface shadow-panel" title={t('Change colour')}><span className={cn('m-auto block size-2.5 rounded-full', TONES[note.tone].split(' ')[0])} /></button>}
      </div>)}
    </div>

    <div className="absolute left-2 right-2 top-2 flex items-center gap-1 overflow-x-auto overscroll-x-contain rounded-xl border border-line bg-surface p-1 shadow-raised [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:left-4 sm:right-auto sm:top-4" onPointerDown={(event) => event.stopPropagation()}>
      <IconButton icon={StickyNote} label={t('Add note')} onClick={addNote} /><IconButton icon={PanelsTopLeft} label={t('Add section')} onClick={addFrame} /><IconButton icon={connectMode ? Spline : MousePointer2} label={connectMode ? t('Connecting — click two notes') : t('Connect notes')} active={connectMode} onClick={() => { setConnectMode((mode) => !mode); setConnectFrom(null) }} />
      <span className="mx-1 h-5 w-px bg-line" /><IconButton icon={Undo2} label={t('Undo')} onClick={undo} /><IconButton icon={Redo2} label={t('Redo')} onClick={redo} /><span className="mx-1 h-5 w-px bg-line" />
      <IconButton icon={ZoomOut} label={t('Zoom out')} onClick={() => zoomBy(0.8)} /><span className="tnum w-11 text-center font-mono text-[12px] text-ink-2">{Math.round(view.scale * 100)}%</span><IconButton icon={ZoomIn} label={t('Zoom in')} onClick={() => zoomBy(1.25)} /><IconButton icon={Maximize} label={t('Fit board to screen')} onClick={fitContent} />
      {selected && !connectMode && <><span className="mx-1 h-5 w-px bg-line" /><IconButton icon={Trash2} label={t('Delete note')} onClick={removeSelected} /></>}
      {selectedFrame && !connectMode && <><span className="mx-1 h-5 w-px bg-line" /><IconButton icon={Trash2} label={t('Delete section')} onClick={removeFrame} /></>}
    </div>

    <div className="absolute bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 overflow-hidden rounded-xl border border-line bg-surface/95 p-2 shadow-raised sm:bottom-4 sm:right-4" onPointerDown={(event) => event.stopPropagation()} aria-label={t('Board minimap')}>
      <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.06em] text-ink-3"><Icon icon={Map} size={12} />{t('World view')}</div>
      <div className="relative overflow-hidden rounded-md bg-inset" style={{ width: miniWidth, height: miniHeight }}>
        {board.frames.map((frame) => <span key={frame.id} className="absolute rounded border border-line-2" style={{ left: (frame.x - bounds.minX) * miniScale, top: (frame.y - bounds.minY) * miniScale, width: frame.width * miniScale, height: frame.height * miniScale }} />)}
        {board.notes.map((note) => <span key={note.id} className="absolute rounded-sm bg-accent" style={{ left: (note.x - bounds.minX) * miniScale, top: (note.y - bounds.minY) * miniScale, width: Math.max(4, NOTE_W * miniScale), height: Math.max(3, NOTE_H * miniScale) }} />)}
        <span className="absolute border border-danger bg-danger/5" style={{ left: visible.x, top: visible.y, width: visible.width, height: visible.height }} />
      </div>
    </div>
    <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full border border-line bg-surface/90 px-3 py-1.5 text-[12px] text-ink-3 sm:block">{connectMode ? connectFrom ? t('Now click the note to connect to') : t('Click a note to start a connection') : t('Drag to pan · scroll to zoom · double-click to edit · drag a section by its title')}</div>
  </div>
}
