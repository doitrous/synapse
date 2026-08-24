import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  StickyNote, ZoomIn, ZoomOut, Maximize, Trash2, Undo2, Redo2, PanelsTopLeft, Map, GripVertical,
  Search, ChevronUp, ChevronDown, X, ImagePlus, Paperclip, Pencil, Eraser, MousePointer2,
  FileText, Download, Link2,
} from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { clamp } from '@/lib/format'
import { usePersistentState } from '@/lib/usePersistentState'
import { imageFileToBoundedDataUrl } from '@/lib/mediaStorage'
import { useMyDocuments } from '@/lib/useMyDocuments'
import { apiDownload, API_MODE } from '@/lib/api'
import { uploadRouteId } from '@/lib/useReaderSource'
import { ShareDialog } from '@/components/share/ShareDialog'
import { useT } from '@/lib/i18n'
import {
  BOARD, anchorOf, clampToBoard, clampView, defaultControls,
  linkPath, matchNotes, noteAt, sidesBetween, toBoard, viewCentredOn,
  type Point, type Side,
} from '@/lib/whiteboardGeometry'
import {
  FILE_H, FILE_W, IMAGE_W, INITIAL_BOARD, INK_COLOURS, INK_WIDTHS, NOTE_H, NOTE_W,
  TONES, TONE_LABEL, TONE_ORDER, filesOf, imagesOf, inkOf, inkPath,
  type BoardFile, type BoardImage, type BoardState, type Frame, type InkStroke, type LinkLine,
  type Tool,
} from '@/data/whiteboard'


type NoteOffset = { id: string; ox: number; oy: number }
type Drag =
  | { type: 'pan'; sx: number; sy: number; ox: number; oy: number }
  | { type: 'note'; id: string; sx: number; sy: number; ox: number; oy: number }
  | { type: 'frame'; id: string; sx: number; sy: number; ox: number; oy: number; notes: NoteOffset[] }
  | { type: 'frame-resize'; id: string; sx: number; sy: number; ow: number; oh: number }
  | { type: 'image'; id: string; sx: number; sy: number; ox: number; oy: number }
  | { type: 'image-resize'; id: string; sx: number; sy: number; ow: number; oh: number; ratio: number }
  | { type: 'file'; id: string; sx: number; sy: number; ox: number; oy: number }
  /** Drawing a freehand line. The points are collected on the ref below. */
  | { type: 'ink' }
  /** Pulling a connector out of a note's edge towards wherever it lands. */
  | { type: 'link'; from: string; side: Side }
  /** Bending an existing connector by one of its two control points. */
  | { type: 'bend'; id: string; which: 0 | 1 }
  | null

export function Whiteboard() {
  const t = useT()
  const navigate = useNavigate()
  const documents = useMyDocuments()
  const canvasRef = useRef<HTMLDivElement>(null)
  // The board starts at its own corner: there is nothing before (0, 0) to show.
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 })
  const [board, setBoard] = usePersistentState<BoardState>('synapse.whiteboard.board', INITIAL_BOARD)
  const [selected, setSelected] = useState<string | null>(null)
  /** Which note has its colour picker open, if any. */
  const [palette, setPalette] = useState<string | null>(null)
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null)
  /**
   * A connector can be selected and deleted.
   *
   * Previously a link could only be created; the sole way to remove a
   * mis-drawn arrow was to delete one of the notes it joined.
   */
  const [selectedLink, setSelectedLink] = useState<string | null>(null)
  const [editing, setEditing] = useState<string | null>(null)
  const [editingFrame, setEditingFrame] = useState<string | null>(null)
  /** Where a connector being pulled currently ends, in board coordinates. */
  const [pulling, setPulling] = useState<Point | null>(null)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [hitIndex, setHitIndex] = useState(0)
  /**
   * What the pointer does on empty space.
   *
   * `select` pans and selects, which is what the board has always done. `pen`
   * draws, and `eraser` removes a line by touching it. Deliberately a mode
   * rather than a modifier: a freehand line is a sustained gesture, and holding
   * a key for the length of a diagram is not drawing.
   */
  const [tool, setTool] = useState<Tool>('select')
  const [inkColour, setInkColour] = useState<string>(INK_COLOURS[0].value)
  const [inkWidth, setInkWidth] = useState<number>(INK_WIDTHS[1])
  /** The picture or file that is selected, if either is. */
  const [selectedItem, setSelectedItem] = useState<{ kind: 'image' | 'file'; id: string } | null>(null)
  /** The line being drawn, before it is committed to the board. */
  const [drawing, setDrawing] = useState<number[] | null>(null)
  const drawingRef = useRef<number[] | null>(null)
  const [attaching, setAttaching] = useState<'image' | 'file' | null>(null)
  const [attachError, setAttachError] = useState('')
  const pictureInput = useRef<HTMLInputElement>(null)
  const fileInput = useRef<HTMLInputElement>(null)
  const [sharing, setSharing] = useState(false)
  const drag = useRef<Drag>(null)
  const viewRef = useRef(view)
  const boardRef = useRef(board)
  const history = useRef<BoardState[]>([])
  const future = useRef<BoardState[]>([])
  viewRef.current = view
  boardRef.current = board

  const snapshot = () => structuredClone(boardRef.current)
  function remember() { history.current.push(snapshot()); if (history.current.length > 50) history.current.shift(); future.current = [] }
  // The window listeners are registered once, so anything they call has to be
  // reached through a ref rather than captured from the first render.
  const rememberRef = useRef(remember)
  rememberRef.current = remember
  // The window listeners are registered once, so the pen's current colour and
  // width have to be reachable through a ref rather than captured at mount.
  const inkColourRef = useRef(inkColour)
  inkColourRef.current = inkColour
  const inkWidthRef = useRef(inkWidth)
  inkWidthRef.current = inkWidth
  function undo() { const previous = history.current.pop(); if (!previous) return; future.current.push(snapshot()); setBoard(previous); setSelected(null) }
  function redo() { const next = future.current.pop(); if (!next) return; history.current.push(snapshot()); setBoard(next); setSelected(null) }

  const viewportSize = () => {
    const rect = canvasRef.current?.getBoundingClientRect()
    return { width: rect?.width ?? 0, height: rect?.height ?? 0 }
  }

  useEffect(() => {
    function onMove(event: PointerEvent) {
      const active = drag.current
      // The board-space gestures — pulling a connector, bending one, drawing —
      // follow the cursor rather than a delta, and are handled below.
      if (!active || active.type === 'link' || active.type === 'bend' || active.type === 'ink') return
      const dx = event.clientX - active.sx
      const dy = event.clientY - active.sy
      const scale = viewRef.current.scale
      if (active.type === 'pan') {
        const rect = canvasRef.current?.getBoundingClientRect()
        setView((current) => clampView(
          { ...current, x: active.ox + dx, y: active.oy + dy },
          { width: rect?.width ?? 0, height: rect?.height ?? 0 },
        ))
      } else if (active.type === 'note') {
        const placed = clampToBoard(
          { x: active.ox + dx / scale, y: active.oy + dy / scale },
          { width: NOTE_W, height: NOTE_H },
        )
        setBoard((current) => ({ ...current, notes: current.notes.map((note) => note.id === active.id ? { ...note, ...placed } : note) }))
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
      } else if (active.type === 'image') {
        setBoard((current) => ({
          ...current,
          images: imagesOf(current).map((image) => image.id === active.id
            ? { ...image, ...clampToBoard({ x: active.ox + dx / scale, y: active.oy + dy / scale }, { width: image.width, height: image.height }) }
            : image),
        }))
      } else if (active.type === 'image-resize') {
        // Width drives height, so a picture cannot be squashed out of shape.
        const width = Math.max(80, active.ow + dx / scale)
        setBoard((current) => ({
          ...current,
          images: imagesOf(current).map((image) => image.id === active.id
            ? { ...image, width, height: Math.max(60, width / active.ratio) }
            : image),
        }))
      } else if (active.type === 'file') {
        setBoard((current) => ({
          ...current,
          files: filesOf(current).map((file) => file.id === active.id
            ? { ...file, ...clampToBoard({ x: active.ox + dx / scale, y: active.oy + dy / scale }, { width: FILE_W, height: FILE_H }) }
            : file),
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

    /** The gestures that follow the cursor in board space rather than by delta. */
    function onPointerBoard(event: PointerEvent) {
      const active = drag.current
      if (!active || (active.type !== 'link' && active.type !== 'bend' && active.type !== 'ink')) return
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      const point = toBoard({ x: event.clientX - rect.left, y: event.clientY - rect.top }, viewRef.current)
      if (active.type === 'ink') {
        const points = drawingRef.current
        if (!points) return
        // Points closer together than this add nothing a hand can see and a
        // great deal to the stored document.
        const lastX = points[points.length - 2]
        const lastY = points[points.length - 1]
        if (Math.hypot(point.x - lastX, point.y - lastY) < 1.5) return
        points.push(point.x, point.y)
        setDrawing([...points])
        return
      }
      if (active.type === 'link') { setPulling(point); return }
      setBoard((current) => ({
        ...current,
        links: current.links.map((line) => {
          if (line.id !== active.id) return line
          const fallback = controlsFor(current, line)
          return active.which === 0
            ? { ...line, c1: point, c2: line.c2 ?? fallback[1] }
            : { ...line, c1: line.c1 ?? fallback[0], c2: point }
        }),
      }))
    }

    function onUp(event: PointerEvent) {
      const active = drag.current
      drag.current = null
      if (active?.type === 'ink') {
        const points = drawingRef.current
        drawingRef.current = null
        setDrawing(null)
        // A tap is not a line. Two points is the minimum that draws anything.
        if (points && points.length >= 4) {
          rememberRef.current()
          const stroke: InkStroke = { id: `i${Date.now()}`, points, color: inkColourRef.current, width: inkWidthRef.current }
          setBoard((current) => ({ ...current, ink: [...inkOf(current), stroke] }))
        }
        return
      }
      if (active?.type !== 'link') { setPulling(null); return }
      setPulling(null)
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      const point = toBoard({ x: event.clientX - rect.left, y: event.clientY - rect.top }, viewRef.current)
      const target = noteAt(boardRef.current.notes, point)
      if (!target || target.id === active.from) return
      rememberRef.current()
      setBoard((current) => (
        current.links.some((line) => line.from === active.from && line.to === target.id)
          ? current
          : { ...current, links: [...current.links, { id: `l${Date.now()}`, from: active.from, to: target.id }] }
      ))
      // The relationship is made; nothing stays armed waiting for another one.
      setSelected(null)
      setSelectedLink(null)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointermove', onPointerBoard)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointermove', onPointerBoard)
      window.removeEventListener('pointerup', onUp)
    }
    // `remember` closes over the current board by design — a snapshot taken at
    // the moment a link lands is the state to return to.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBoard])

  function zoomBy(factor: number, cx?: number, cy?: number) {
    const rect = canvasRef.current?.getBoundingClientRect()
    const px = cx ?? (rect ? rect.width / 2 : 0)
    const py = cy ?? (rect ? rect.height / 2 : 0)
    setView((current) => {
      const scale = clamp(current.scale * factor, 0.25, 2.5)
      const wx = (px - current.x) / current.scale
      const wy = (py - current.y) / current.scale
      return clampView(
        { x: px - wx * scale, y: py - wy * scale, scale },
        { width: rect?.width ?? 0, height: rect?.height ?? 0 },
      )
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

  function clearSelection() {
    setSelected(null)
    setSelectedFrame(null)
    setSelectedLink(null)
    setSelectedItem(null)
    setPalette(null)
  }

  function backgroundDown(event: React.PointerEvent) {
    clearSelection()
    if (tool === 'pen') {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      const point = toBoard({ x: event.clientX - rect.left, y: event.clientY - rect.top }, view)
      drawingRef.current = [point.x, point.y]
      setDrawing([point.x, point.y])
      drag.current = { type: 'ink' }
      return
    }
    // The eraser removes lines by touching them; a press on bare board with it
    // selected is still a pan, because otherwise there is no way to move around.
    drag.current = { type: 'pan', sx: event.clientX, sy: event.clientY, ox: view.x, oy: view.y }
  }

  /** Empty space, double-clicked, is where a note goes. */
  function backgroundDoubleClick(event: React.MouseEvent) {
    // With the pen down, a double-click is two strokes, not a new note.
    if (tool !== 'select') return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    const point = toBoard({ x: event.clientX - rect.left, y: event.clientY - rect.top }, view)
    if (noteAt(board.notes, point)) return
    addNoteAt({ x: point.x - NOTE_W / 2, y: point.y - NOTE_H / 2 })
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
    setSelected(id)
    setSelectedLink(null)
    const note = board.notes.find((item) => item.id === id)!
    remember()
    drag.current = { type: 'note', id, sx: event.clientX, sy: event.clientY, ox: note.x, oy: note.y }
  }

  function connectorDown(event: React.PointerEvent, id: string, side: Side) {
    event.stopPropagation()
    drag.current = { type: 'link', from: id, side }
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) setPulling(toBoard({ x: event.clientX - rect.left, y: event.clientY - rect.top }, view))
  }

  function centerPoint() {
    const rect = canvasRef.current?.getBoundingClientRect()
    const cx = rect ? rect.width / 2 : 300
    const cy = rect ? rect.height / 2 : 200
    return { x: (cx - view.x) / view.scale, y: (cy - view.y) / view.scale }
  }

  function addNoteAt(corner: Point) {
    remember()
    const placed = clampToBoard(corner, { width: NOTE_W, height: NOTE_H })
    const id = `n${Date.now()}`
    setBoard((current) => ({ ...current, notes: [...current.notes, { id, x: placed.x, y: placed.y, text: '', tone: 'paper' }] }))
    setSelected(id); setSelectedFrame(null); setEditing(id)
  }

  function addNote() {
    const center = centerPoint()
    addNoteAt({ x: center.x - NOTE_W / 2, y: center.y - 30 })
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

  function removeSelectedLink() {
    if (!selectedLink) return
    remember()
    setBoard((current) => ({ ...current, links: current.links.filter((line) => line.id !== selectedLink) }))
    setSelectedLink(null)
  }

  /** Put a bent connector back on its automatic curve. */
  function straightenSelectedLink() {
    if (!selectedLink) return
    remember()
    setBoard((current) => ({
      ...current,
      links: current.links.map((line) => (line.id === selectedLink ? { id: line.id, from: line.from, to: line.to } : line)),
    }))
  }

  function removeSelected() {
    if (!selected) return
    remember()
    setBoard((current) => ({ ...current, notes: current.notes.filter((note) => note.id !== selected), links: current.links.filter((line) => line.from !== selected && line.to !== selected) }))
    setSelected(null)
  }

  /* ---- Pictures, files and ink ----------------------------------------- */

  function imageDown(event: React.PointerEvent, image: BoardImage) {
    if (tool !== 'select') return
    event.stopPropagation()
    clearSelection()
    setSelectedItem({ kind: 'image', id: image.id })
    remember()
    drag.current = { type: 'image', id: image.id, sx: event.clientX, sy: event.clientY, ox: image.x, oy: image.y }
  }

  function imageResizeDown(event: React.PointerEvent, image: BoardImage) {
    event.stopPropagation()
    setSelectedItem({ kind: 'image', id: image.id })
    remember()
    drag.current = {
      type: 'image-resize', id: image.id, sx: event.clientX, sy: event.clientY,
      ow: image.width, oh: image.height, ratio: image.width / Math.max(1, image.height),
    }
  }

  function fileDown(event: React.PointerEvent, file: BoardFile) {
    if (tool !== 'select') return
    event.stopPropagation()
    clearSelection()
    setSelectedItem({ kind: 'file', id: file.id })
    remember()
    drag.current = { type: 'file', id: file.id, sx: event.clientX, sy: event.clientY, ox: file.x, oy: file.y }
  }

  /** Remove whichever picture or file is selected. */
  function removeSelectedItem() {
    if (!selectedItem) return
    remember()
    setBoard((current) => selectedItem.kind === 'image'
      ? { ...current, images: imagesOf(current).filter((image) => image.id !== selectedItem.id) }
      : { ...current, files: filesOf(current).filter((file) => file.id !== selectedItem.id) })
    setSelectedItem(null)
  }

  /** Touching a line with the eraser removes it. */
  function eraseStroke(id: string) {
    remember()
    setBoard((current) => ({ ...current, ink: inkOf(current).filter((stroke) => stroke.id !== id) }))
  }

  /**
   * Put a picture on the board.
   *
   * Bounded before it is stored, for the reason on `BoardImage`. The placed
   * height comes from the image's own proportions, so nothing arrives stretched.
   */
  async function addPicture(file: File) {
    setAttachError('')
    setAttaching('image')
    try {
      const src = await imageFileToBoundedDataUrl(file)
      const shape = await new Promise<{ width: number; height: number }>((resolve) => {
        const probe = new Image()
        probe.onload = () => resolve({ width: probe.naturalWidth, height: probe.naturalHeight })
        probe.onerror = () => resolve({ width: 4, height: 3 })
        probe.src = src
      })
      const centre = centerPoint()
      const height = Math.round(IMAGE_W * (shape.height / Math.max(1, shape.width)))
      const placed = clampToBoard({ x: centre.x - IMAGE_W / 2, y: centre.y - height / 2 }, { width: IMAGE_W, height })
      remember()
      const id = `p${Date.now()}`
      setBoard((current) => ({
        ...current,
        images: [...imagesOf(current), { id, x: placed.x, y: placed.y, width: IMAGE_W, height, src, alt: file.name }],
      }))
      clearSelection()
      setSelectedItem({ kind: 'image', id })
    } catch (error) {
      setAttachError(error instanceof Error ? error.message : t('That picture could not be added.'))
    } finally {
      setAttaching(null)
    }
  }

  /**
   * Pin a file to the board.
   *
   * The bytes go to the student's own document store, so the board document
   * stays small, the file counts against the account's own space, and it opens
   * on any device they sign in on. Only the reference is kept here.
   */
  async function addFile(file: File) {
    setAttachError('')
    setAttaching('file')
    try {
      const documentId = await documents.upload(file)
      const centre = centerPoint()
      const placed = clampToBoard({ x: centre.x - FILE_W / 2, y: centre.y - FILE_H / 2 }, { width: FILE_W, height: FILE_H })
      remember()
      const id = `d${Date.now()}`
      const kind: BoardFile['kind'] = file.type === 'application/pdf' || /\.pdf$/i.test(file.name) ? 'pdf' : 'file'
      setBoard((current) => ({
        ...current,
        files: [...filesOf(current), { id, x: placed.x, y: placed.y, documentId, name: file.name, sizeBytes: file.size, kind }],
      }))
      clearSelection()
      setSelectedItem({ kind: 'file', id })
    } catch (error) {
      setAttachError(error instanceof Error ? error.message : t('That file could not be added.'))
    } finally {
      setAttaching(null)
    }
  }

  /** Open a pinned file: a PDF in the reader, anything else as a download. */
  function openFile(file: BoardFile) {
    if (file.kind === 'pdf') { navigate(`/app/resources/${uploadRouteId(file.documentId)}`); return }
    if (!API_MODE) { setAttachError(t('This preview keeps files in the browser, so they cannot be downloaded from here.')); return }
    void apiDownload(`/my-documents/${encodeURIComponent(file.documentId)}/file`, file.name)
      .catch(() => setAttachError(t('That file could not be opened.')))
  }

  function setTone(id: string, tone: keyof typeof TONES) {
    remember()
    setBoard((current) => ({ ...current, notes: current.notes.map((note) => note.id === id ? { ...note, tone } : note) }))
  }

  /* ---- Search ---------------------------------------------------------- */

  const hits = useMemo(() => matchNotes(board.notes, query), [board.notes, query])

  function goToHit(index: number) {
    if (!hits.length) return
    const wrapped = (index + hits.length) % hits.length
    setHitIndex(wrapped)
    const note = hits[wrapped]
    setView((current) => viewCentredOn(
      { x: note.x + NOTE_W / 2, y: note.y + NOTE_H / 2 },
      viewportSize(),
      current.scale,
    ))
    setSelected(note.id)
  }

  // A changed query starts again from the first hit rather than from wherever
  // the last one happened to leave the index.
  useEffect(() => { setHitIndex(0) }, [query])

  // Focused when the field opens. `autoFocus` is applied on mount only, and
  // this field mounts inside a surface that is itself claiming the pointer.
  const searchRef = useRef<HTMLInputElement>(null)
  useEffect(() => { if (searchOpen) searchRef.current?.focus() }, [searchOpen])

  const hitIds = useMemo(() => new Set(hits.map((note) => note.id)), [hits])

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
    return { minX: Math.min(...xs, 0) - 80, minY: Math.min(...ys, 0) - 80, maxX: Math.max(...xs, 800) + 80, maxY: Math.max(...ys, 500) + 80 }
  }, [board])

  function fitContent() {
    const rect = canvasRef.current?.getBoundingClientRect(); if (!rect) return
    const width = bounds.maxX - bounds.minX; const height = bounds.maxY - bounds.minY
    const scale = clamp(Math.min((rect.width - 80) / width, (rect.height - 80) / height), 0.25, 1.5)
    setView(clampView(
      { x: (rect.width - width * scale) / 2 - bounds.minX * scale, y: (rect.height - height * scale) / 2 - bounds.minY * scale, scale },
      { width: rect.width, height: rect.height },
    ))
  }

  /**
   * The current key handler, held in a ref.
   *
   * The listener itself is registered once. Previously the effect had no
   * dependency array at all, so every render — including every frame of a
   * drag — removed and re-added a window listener.
   */
  const onKeyRef = useRef<(event: KeyboardEvent) => void>(() => undefined)
  onKeyRef.current = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null
    if (editing || editingFrame || target?.closest('input,textarea')) return
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
      event.preventDefault()
      if (event.shiftKey) redo()
      else undo()
      return
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'f') {
      event.preventDefault()
      setSearchOpen(true)
      return
    }
    if (event.key === 'Delete' || event.key === 'Backspace') {
      if (selected) { event.preventDefault(); removeSelected() }
      else if (selectedItem) { event.preventDefault(); removeSelectedItem() }
      else if (selectedFrame) { event.preventDefault(); removeFrame() }
      else if (selectedLink) { event.preventDefault(); removeSelectedLink() }
    }
    // The tools have single-key shortcuts, as every drawing surface does.
    if (event.key === 'v') setTool('select')
    if (event.key === 'p' || event.key === 'd') setTool('pen')
    if (event.key === 'e') setTool('eraser')
    if (event.key === 'Escape') { clearSelection(); setTool('select') }
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => onKeyRef.current(event)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // The viewport can change without anyone panning — a rotated phone, a resized
  // window — and the board has to stay under it.
  useEffect(() => {
    const node = canvasRef.current
    if (!node || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      setView((current) => clampView(current, { width: node.clientWidth, height: node.clientHeight }))
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const byId = (id: string) => board.notes.find((note) => note.id === id)
  const miniWidth = 190; const miniHeight = 112
  const miniScale = Math.min(miniWidth / BOARD.width, miniHeight / BOARD.height)
  const canvasRect = canvasRef.current?.getBoundingClientRect()
  const visible = {
    x: (-view.x / view.scale) * miniScale,
    y: (-view.y / view.scale) * miniScale,
    width: ((canvasRect?.width ?? 0) / view.scale) * miniScale,
    height: ((canvasRect?.height ?? 0) / view.scale) * miniScale,
  }

  const pulled = (() => {
    const active = drag.current
    if (!pulling || active?.type !== 'link') return null
    const note = byId(active.from)
    if (!note) return null
    return linkPath(anchorOf(note, active.side), pulling).d
  })()

  return <div ref={canvasRef} onPointerDown={backgroundDown} onDoubleClick={backgroundDoubleClick} onWheel={onWheel} className="relative h-[calc(100dvh-3.5rem-env(safe-area-inset-top))] touch-none overflow-hidden bg-paper" style={{ backgroundImage: 'radial-gradient(var(--color-grid-major) 1.2px, transparent 1.2px)', backgroundSize: `${24 * view.scale}px ${24 * view.scale}px`, backgroundPosition: `${view.x}px ${view.y}px` }}>
    <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}>
      {/* The board's own edge. Drawn, because a limit you cannot see is
          indistinguishable from scrolling that has stopped working. */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-2xl border-2 border-dashed border-line-2"
        style={{ left: 0, top: 0, width: BOARD.width, height: BOARD.height }}
      />
      {board.frames.map((frame) => (
        <div
          key={frame.id}
          className={cn(
            'pointer-events-none absolute rounded-xl border border-dashed bg-surface/25',
            selectedFrame === frame.id ? 'border-primary' : 'border-line-2',
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

      {/* Sized to the board, not to nothing. A 1×1 SVG with `overflow:visible`
          paints its connectors but hit-tests none of them — which is why a
          connector could be drawn and never selected. `pointer-events-none`
          here keeps it out of the way of everything except the paths that ask
          for the pointer themselves. */}
      <svg className="pointer-events-none absolute left-0 top-0" width={BOARD.width} height={BOARD.height}>
        {board.links.map((line) => {
          const a = byId(line.from)
          const b = byId(line.to)
          if (!a || !b) return null
          const sides = sidesBetween(a, b)
          const start = anchorOf(a, sides.from)
          const end = anchorOf(b, sides.to)
          const { d, controls } = linkPath(start, end, line.c1 && line.c2 ? [line.c1, line.c2] : null)
          const isSelected = selectedLink === line.id
          return (
            <g key={line.id}>
              <path d={d} fill="none" stroke={isSelected ? 'var(--color-primary)' : 'var(--color-line-2)'} strokeWidth={isSelected ? 2.5 : 1.5} />
              {/* A 1.5px curve is far too thin to click; this invisible stroke is
                  what a pointer actually has to hit. */}
              <path d={d} fill="none" stroke="transparent" strokeWidth={14} className="pointer-events-auto cursor-pointer" onPointerDown={(event) => { event.stopPropagation(); setSelectedLink(line.id); setSelected(null); setSelectedFrame(null) }} />
              {isSelected && controls.map((control, index) => (
                <g key={index}>
                  <line
                    x1={index === 0 ? start.x : end.x}
                    y1={index === 0 ? start.y : end.y}
                    x2={control.x}
                    y2={control.y}
                    stroke="var(--color-primary)"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    opacity={0.5}
                  />
                  <circle
                    cx={control.x}
                    cy={control.y}
                    r={6}
                    fill="var(--color-surface)"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    className="pointer-events-auto cursor-grab"
                    onPointerDown={(event) => {
                      event.stopPropagation()
                      remember()
                      drag.current = { type: 'bend', id: line.id, which: index as 0 | 1 }
                    }}
                  />
                </g>
              ))}
            </g>
          )
        })}
        {/* The connector currently being pulled, following the cursor. */}
        {pulled && <path d={pulled} fill="none" stroke="var(--color-primary)" strokeWidth={2} strokeDasharray="5 4" />}

        {/* Freehand lines, in the same layer as the connectors so they sit
            behind the notes — a diagram is annotated around what is on the
            board, not over the top of it. */}
        {inkOf(board).map((stroke) => (
          <g key={stroke.id}>
            <path
              d={inkPath(stroke.points)}
              fill="none"
              stroke={stroke.color}
              strokeWidth={stroke.width}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* A thin line is not something a pointer can reliably hit, so the
                eraser aims at this instead. It only takes the pointer while the
                eraser is the active tool. */}
            {tool === 'eraser' && (
              <path
                d={inkPath(stroke.points)}
                fill="none"
                stroke="transparent"
                strokeWidth={Math.max(16, stroke.width + 12)}
                strokeLinecap="round"
                className="pointer-events-auto cursor-pointer"
                onPointerDown={(event) => { event.stopPropagation(); eraseStroke(stroke.id) }}
              />
            )}
          </g>
        ))}

        {/* The line under the pen right now. */}
        {drawing && drawing.length >= 2 && (
          <path d={inkPath(drawing)} fill="none" stroke={inkColour} strokeWidth={inkWidth} strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>

      {/* Pictures, under the notes: a sticky note annotating a diagram has to
          sit on top of it. */}
      {imagesOf(board).map((image) => {
        const isSelected = selectedItem?.kind === 'image' && selectedItem.id === image.id
        return (
          <div
            key={image.id}
            onPointerDown={(event) => imageDown(event, image)}
            onDoubleClick={(event) => event.stopPropagation()}
            className={cn(
              'group absolute overflow-hidden rounded-lg border bg-surface shadow-panel',
              tool === 'select' ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none',
              isSelected ? 'border-primary ring-2 ring-primary ring-offset-1 ring-offset-paper' : 'border-line',
            )}
            style={{ left: image.x, top: image.y, width: image.width, height: image.height }}
          >
            <img src={image.src} alt={image.alt} draggable={false} className="size-full select-none object-contain" />
            {tool === 'select' && (
              <span
                onPointerDown={(event) => imageResizeDown(event, image)}
                role="presentation"
                aria-label={t('Resize picture')}
                className="absolute -bottom-1.5 -right-1.5 size-4 cursor-nwse-resize rounded-sm border border-line-2 bg-surface opacity-0 shadow-panel transition-opacity group-hover:opacity-100 rtl:-left-1.5 rtl:right-auto rtl:cursor-nesw-resize"
              />
            )}
          </div>
        )
      })}

      {/* Files, as cards that open what they point at. */}
      {filesOf(board).map((file) => {
        const isSelected = selectedItem?.kind === 'file' && selectedItem.id === file.id
        return (
          <div
            key={file.id}
            onPointerDown={(event) => fileDown(event, file)}
            onDoubleClick={(event) => { event.stopPropagation(); openFile(file) }}
            className={cn(
              'absolute flex items-center gap-2.5 rounded-lg border bg-surface p-3 shadow-panel',
              tool === 'select' ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none',
              isSelected ? 'border-primary ring-2 ring-primary ring-offset-1 ring-offset-paper' : 'border-line',
            )}
            style={{ left: file.x, top: file.y, width: FILE_W, height: FILE_H }}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-inset text-primary-strong">
              <Icon icon={file.kind === 'pdf' ? FileText : Download} size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-medium text-ink">{file.name}</span>
              <span className="tnum mt-0.5 block font-mono text-[10.5px] text-ink-3">
                {(file.sizeBytes / (1024 * 1024)).toFixed(file.sizeBytes < 10 * 1024 * 1024 ? 1 : 0)} MB
              </span>
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => { event.stopPropagation(); openFile(file) }}
                className="mt-0.5 text-[11px] font-semibold text-primary-strong hover:text-primary"
              >
                {file.kind === 'pdf' ? t('Open in the reader') : t('Download')}
              </button>
            </span>
          </div>
        )
      })}

      {board.notes.map((note) => (
        <div
          key={note.id}
          onPointerDown={(event) => noteDown(event, note.id)}
          onDoubleClick={(event) => { event.stopPropagation(); setEditing(note.id) }}
          className={cn(
            'group absolute cursor-grab select-none rounded-lg border p-3 shadow-panel active:cursor-grabbing',
            TONES[note.tone],
            selected === note.id && 'ring-2 ring-primary ring-offset-1 ring-offset-paper',
            query && hitIds.has(note.id) && selected !== note.id && 'ring-2 ring-warning ring-offset-1 ring-offset-paper',
          )}
          style={{
            // A note is exactly the size the board says it is. Letting it grow
            // with its text would make every anchor, every hit test and the
            // minimap depend on measuring the DOM — which is the loop the PDF
            // reader was rewritten to escape.
            left: note.x, top: note.y, width: NOTE_W, height: NOTE_H,
          }}
        >
          {editing === note.id
            ? <textarea autoFocus defaultValue={note.text} onBlur={(event) => { remember(); setBoard((current) => ({ ...current, notes: current.notes.map((item) => item.id === note.id ? { ...item, text: event.target.value } : item) })); setEditing(null) }} onPointerDown={(event) => event.stopPropagation()} className="size-full resize-none bg-transparent text-[13px] leading-snug text-ink outline-none" />
            : <p className="size-full overflow-hidden whitespace-pre-wrap break-words text-[13px] leading-snug text-ink">{note.text || <span className="text-ink-3">{t('Double-click to edit…')}</span>}</p>}

          {/* Always there, showing what colour this note is. It used to appear
              only once the note was selected, so its own colour was invisible
              until you clicked it. */}
          <div className="absolute -end-2 -top-2" onPointerDown={(event) => event.stopPropagation()}>
            <button
              onPointerDown={(event) => { event.stopPropagation(); setPalette((open) => (open === note.id ? null : note.id)) }}
              className="grid size-5 place-items-center rounded-full border border-line bg-surface shadow-panel"
              title={t('Change colour')}
              aria-haspopup="true"
              aria-expanded={palette === note.id}
              aria-label={t('Change colour')}
            >
              <span className={cn('block size-2.5 rounded-full border', TONES[note.tone])} />
            </button>
            {palette === note.id && (
              <div role="menu" aria-label={t('Note colour')} className="absolute end-0 top-6 z-10 grid w-max grid-cols-4 gap-1 rounded-lg border border-line bg-surface p-1.5 shadow-pop">
                {TONE_ORDER.map((tone) => (
                  <button
                    key={tone}
                    role="menuitemradio"
                    aria-checked={note.tone === tone}
                    title={t(TONE_LABEL[tone])}
                    aria-label={t(TONE_LABEL[tone])}
                    onPointerDown={(event) => { event.stopPropagation(); setTone(note.id, tone); setPalette(null) }}
                    className={cn('size-6 rounded-md border transition-transform hover:scale-110', TONES[tone], note.tone === tone && 'ring-2 ring-primary ring-offset-1 ring-offset-surface')}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pull a line out of either side to relate this note to another.
              Direct manipulation rather than a mode: there is nothing to turn
              on, and nothing left armed once the line lands. */}
          {(['start', 'end'] as Side[]).map((side) => (
            <button
              key={side}
              type="button"
              aria-label={side === 'start' ? t('Draw a connection from this side') : t('Draw a connection from the other side')}
              title={t('Drag to connect')}
              onPointerDown={(event) => connectorDown(event, note.id, side)}
              onDoubleClick={(event) => event.stopPropagation()}
              className={cn(
                'absolute top-1/2 size-3.5 -translate-y-1/2 cursor-crosshair rounded-full border-2 border-primary bg-surface opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100',
                selected === note.id && 'opacity-100',
                side === 'start' ? '-start-2' : '-end-2',
              )}
            />
          ))}
        </div>
      ))}
    </div>

    <div className="absolute left-2 right-2 top-2 flex items-center gap-1 overflow-x-auto overscroll-x-contain rounded-xl border border-line bg-surface p-1 shadow-raised [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:left-4 sm:right-auto sm:top-4" onPointerDown={(event) => event.stopPropagation()} onDoubleClick={(event) => event.stopPropagation()}>
      <IconButton icon={MousePointer2} label={t('Move and select')} active={tool === 'select'} onClick={() => setTool('select')} />
      <IconButton icon={Pencil} label={t('Draw freehand')} active={tool === 'pen'} onClick={() => setTool('pen')} />
      <IconButton icon={Eraser} label={t('Erase a line')} active={tool === 'eraser'} onClick={() => setTool('eraser')} />
      {tool === 'pen' && (
        <>
          {INK_COLOURS.map((colour) => (
            <button
              key={colour.id}
              type="button"
              onClick={() => setInkColour(colour.value)}
              aria-label={t(colour.id)}
              aria-pressed={inkColour === colour.value}
              className={cn('size-6 shrink-0 rounded-full border transition-transform hover:scale-110', inkColour === colour.value ? 'border-primary ring-2 ring-primary/40' : 'border-line')}
              style={{ backgroundColor: colour.value }}
            />
          ))}
          {INK_WIDTHS.map((width) => (
            <button
              key={width}
              type="button"
              onClick={() => setInkWidth(width)}
              aria-label={`${t('Line width')} ${width}`}
              aria-pressed={inkWidth === width}
              className={cn('grid size-7 shrink-0 place-items-center rounded-md transition-colors', inkWidth === width ? 'bg-primary-tint' : 'hover:bg-inset')}
            >
              <span className="rounded-full bg-ink" style={{ width: width + 4, height: width }} />
            </button>
          ))}
        </>
      )}
      <span className="mx-1 h-5 w-px bg-line" />
      <IconButton icon={StickyNote} label={t('Add note')} onClick={addNote} />
      <IconButton icon={PanelsTopLeft} label={t('Add section')} onClick={addFrame} />
      <IconButton icon={ImagePlus} label={attaching === 'image' ? t('Adding the picture…') : t('Add a picture')} disabled={attaching !== null} onClick={() => pictureInput.current?.click()} />
      <IconButton icon={Paperclip} label={attaching === 'file' ? t('Adding the file…') : t('Attach a file')} disabled={attaching !== null} onClick={() => fileInput.current?.click()} />
      <IconButton icon={Search} label={t('Search the board')} active={searchOpen} onClick={() => setSearchOpen((open) => !open)} />
      <IconButton icon={Link2} label={t('Share this board')} onClick={() => setSharing(true)} />
      <span className="mx-1 h-5 w-px bg-line" /><IconButton icon={Undo2} label={t('Undo')} onClick={undo} /><IconButton icon={Redo2} label={t('Redo')} onClick={redo} /><span className="mx-1 h-5 w-px bg-line" />
      <IconButton icon={ZoomOut} label={t('Zoom out')} onClick={() => zoomBy(0.8)} /><span className="tnum w-11 text-center font-mono text-[12px] text-ink-2">{Math.round(view.scale * 100)}%</span><IconButton icon={ZoomIn} label={t('Zoom in')} onClick={() => zoomBy(1.25)} /><IconButton icon={Maximize} label={t('Fit board to screen')} onClick={fitContent} />
      {selected && <><span className="mx-1 h-5 w-px bg-line" /><IconButton icon={Trash2} label={t('Delete note')} onClick={removeSelected} /></>}
      {selectedItem && <><span className="mx-1 h-5 w-px bg-line" /><IconButton icon={Trash2} label={selectedItem.kind === 'image' ? t('Delete picture') : t('Remove this file from the board')} onClick={removeSelectedItem} /></>}
      {selectedFrame && <><span className="mx-1 h-5 w-px bg-line" /><IconButton icon={Trash2} label={t('Delete section')} onClick={removeFrame} /></>}
      {selectedLink && (
        <>
          <span className="mx-1 h-5 w-px bg-line" />
          <button type="button" onClick={straightenSelectedLink} className="whitespace-nowrap rounded-md px-2 py-1.5 text-[12px] font-medium text-ink-2 hover:bg-inset hover:text-ink">{t('Straighten')}</button>
          <IconButton icon={Trash2} label={t('Delete connection')} onClick={removeSelectedLink} />
        </>
      )}
    </div>

    {searchOpen && (
      <div
        className="absolute inset-x-2 top-[3.75rem] flex items-center gap-1.5 rounded-xl border border-line bg-surface p-1.5 shadow-raised sm:inset-x-auto sm:start-4 sm:top-[4.25rem] sm:w-80"
        onPointerDown={(event) => event.stopPropagation()}
        onDoubleClick={(event) => event.stopPropagation()}
      >
        <Icon icon={Search} size={14} className="ms-1 shrink-0 text-ink-3" />
        <input
          ref={searchRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') { event.preventDefault(); goToHit(event.shiftKey ? hitIndex - 1 : hitIndex + 1) }
            if (event.key === 'Escape') { setSearchOpen(false); setQuery('') }
          }}
          placeholder={t('Find a note…')}
          className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"
        />
        <span className="tnum shrink-0 font-mono text-[11px] text-ink-3">
          {query ? `${hits.length ? hitIndex + 1 : 0}/${hits.length}` : ''}
        </span>
        <IconButton icon={ChevronUp} label={t('Previous match')} size="sm" onClick={() => goToHit(hitIndex - 1)} />
        <IconButton icon={ChevronDown} label={t('Next match')} size="sm" onClick={() => goToHit(hitIndex + 1)} />
        <IconButton icon={X} label={t('Close')} size="sm" onClick={() => { setSearchOpen(false); setQuery('') }} />
      </div>
    )}

    {/* A copy of the board, published under its own link. Read when the dialog
        publishes, so what goes out is the board as it stands. */}
    <ShareDialog
      open={sharing}
      onClose={() => setSharing(false)}
      handle="board"
      kind="whiteboard"
      title={t('Whiteboard')}
      payload={() => boardRef.current}
    />

    {/* Off-screen, driven by the toolbar buttons above. */}
    <input
      ref={pictureInput}
      type="file"
      accept="image/*"
      aria-label={t('Add a picture')}
      className="sr-only"
      onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ''; if (file) void addPicture(file) }}
    />
    <input
      ref={fileInput}
      type="file"
      aria-label={t('Attach a file')}
      className="sr-only"
      onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ''; if (file) void addFile(file) }}
    />

    {attachError && (
      <p
        role="alert"
        onPointerDown={(event) => event.stopPropagation()}
        className="absolute inset-x-2 top-[3.75rem] rounded-lg border border-danger/30 bg-danger-tint px-3 py-2 text-[12.5px] text-danger sm:inset-x-auto sm:start-4 sm:top-[4.25rem] sm:max-w-sm"
      >
        {attachError}
        <button type="button" onClick={() => setAttachError('')} className="ms-2 font-semibold underline">{t('Dismiss')}</button>
      </p>
    )}

    <div className="absolute bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 overflow-hidden rounded-xl border border-line bg-surface/95 p-2 shadow-raised sm:bottom-4 sm:right-4" onPointerDown={(event) => event.stopPropagation()} onDoubleClick={(event) => event.stopPropagation()} aria-label={t('Board minimap')}>
      <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.06em] text-ink-3"><Icon icon={Map} size={12} />{t('World view')}</div>
      {/* The minimap shows the whole board, not just what is on it — which is
          what makes it a map of somewhere rather than a map of your notes. */}
      <div className="relative overflow-hidden rounded-md bg-inset" style={{ width: BOARD.width * miniScale, height: BOARD.height * miniScale }}>
        {board.frames.map((frame) => <span key={frame.id} className="absolute rounded border border-line-2" style={{ left: frame.x * miniScale, top: frame.y * miniScale, width: frame.width * miniScale, height: frame.height * miniScale }} />)}
        {board.notes.map((note) => <span key={note.id} className="absolute rounded-sm bg-primary" style={{ left: note.x * miniScale, top: note.y * miniScale, width: Math.max(3, NOTE_W * miniScale), height: Math.max(2, NOTE_H * miniScale) }} />)}
        <span className="absolute border border-danger bg-danger/5" style={{ left: visible.x, top: visible.y, width: visible.width, height: visible.height }} />
      </div>
    </div>
    <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full border border-line bg-surface/90 px-3 py-1.5 text-[12px] text-ink-3 sm:block">{t('Double-click to add a note · drag a dot on a note to connect it · scroll to zoom')}</div>
  </div>
}

/** The control points a link is drawn with when it has not been bent. */
function controlsFor(board: BoardState, line: LinkLine): [Point, Point] {
  const a = board.notes.find((note) => note.id === line.from)
  const b = board.notes.find((note) => note.id === line.to)
  if (!a || !b) return [{ x: 0, y: 0 }, { x: 0, y: 0 }]
  const sides = sidesBetween(a, b)
  return defaultControls(anchorOf(a, sides.from), anchorOf(b, sides.to))
}
