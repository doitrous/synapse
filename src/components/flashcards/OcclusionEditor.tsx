import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from 'react'
import {
  MousePointer2, Square, Circle, PenTool, Hand, Maximize2, Group, Ungroup, Copy, Trash2,
  Undo2, Redo2, ImagePlus, Save, X,
} from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Field, TextInput } from '@/components/ui/Field'
import { Segmented } from '@/components/ui/Tabs'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { storeMediaFile, mediaReference } from '@/lib/mediaStorage'
import { useCommands, useScope } from '@/lib/shortcuts/useShortcuts'
import type { Command } from '@/lib/shortcuts/registry'
import type { FlashcardsApi } from '@/lib/useFlashcards'
import type { ImageOcclusionNote, Occluder, OccluderGroup, OccluderShape, OcclusionMode } from '@/data/flashcards/model'
import { occlusionCardCount, occlusionSignature, isDuplicateOcclusion, pointInShape, shapeBounds } from '@/data/flashcards/occlusion'
import { escapeHtml } from '@/data/flashcards/richText'
import { clampRect, clientToImage, isDrawable, nudgeShape, rectFromPoints, resizeRect, resizeHandlePoints, zoomViewBox, type ResizeHandle, type ViewBox } from '@/data/flashcards/occlusionEditor'

type Tool = 'select' | 'rect' | 'ellipse' | 'polygon' | 'pan'

interface Snapshot { occluders: Occluder[]; groups: OccluderGroup[] }

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

/** CSS resize cursor per handle, so the pointer signals which way it will grow. */
const HANDLE_CURSOR: Record<ResizeHandle, string> = {
  nw: 'nwse-resize', se: 'nwse-resize',
  ne: 'nesw-resize', sw: 'nesw-resize',
  n: 'ns-resize', s: 'ns-resize',
  e: 'ew-resize', w: 'ew-resize',
}

/**
 * Draw occluders over an image, one card per occluder or grouped set.
 *
 * Shapes live in image-space (source pixels), so a mask lands in the same place
 * whatever the zoom; the SVG viewBox does the mapping. Every mutation snapshots
 * onto an undo stack, the card count is shown before saving, and a deterministic
 * signature (not a UI flag) blocks saving the same set twice. The canvas has a
 * keyboard twin — an accessible occluder list — so nothing here needs a mouse.
 */
export function OcclusionEditor({ api, deckId, onDone }: { api: FlashcardsApi; deckId: string; onDone: () => void }) {
  const t = useT()
  const svgRef = useRef<SVGSVGElement>(null)

  const [image, setImage] = useState<{ ref: string; url: string; width: number; height: number } | null>(null)
  const [occluders, setOccluders] = useState<Occluder[]>([])
  const [groups, setGroups] = useState<OccluderGroup[]>([])
  const [mode, setMode] = useState<OcclusionMode>('hide-all')
  const [tool, setTool] = useState<Tool>('rect')
  const [selection, setSelection] = useState<Set<string>>(new Set())
  const [view, setView] = useState<ViewBox>({ x: 0, y: 0, w: 1, h: 1 })
  const [header, setHeader] = useState('')
  const [back, setBack] = useState('')
  const [error, setError] = useState<string | null>(null)

  const past = useRef<Snapshot[]>([])
  const future = useRef<Snapshot[]>([])
  const drag = useRef<{ kind: 'draw' | 'move' | 'pan' | 'resize'; startImg: { x: number; y: number }; lastImg: { x: number; y: number }; startView: ViewBox; handle?: ResizeHandle; resizeId?: string; didSnapshot?: boolean } | null>(null)
  const [draft, setDraft] = useState<OccluderShape | null>(null)
  const [polygon, setPolygon] = useState<{ x: number; y: number }[] | null>(null)

  const dirty = occluders.length > 0 || header !== '' || back !== ''

  // Warn on browser navigation with unsaved work.
  useEffect(() => {
    if (!dirty) return
    const onBeforeUnload = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [dirty])

  const snapshot = useCallback(() => {
    past.current.push({ occluders, groups })
    if (past.current.length > 100) past.current.shift()
    future.current = []
  }, [occluders, groups])

  const restore = useCallback((snap: Snapshot) => { setOccluders(snap.occluders); setGroups(snap.groups) }, [])
  const undo = useCallback(() => {
    const prev = past.current.pop()
    if (!prev) return
    future.current.push({ occluders, groups })
    restore(prev)
  }, [occluders, groups, restore])
  const redo = useCallback(() => {
    const next = future.current.pop()
    if (!next) return
    past.current.push({ occluders, groups })
    restore(next)
  }, [occluders, groups, restore])

  // ---- image upload --------------------------------------------------------
  const onFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) { setError(t('That file is not an image.')); return }
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = async () => {
      const id = uid('occ-img')
      try { await storeMediaFile(id, file) } catch { /* demo/private mode may block; the data URL still previews */ }
      setImage({ ref: mediaReference(id), url, width: img.naturalWidth, height: img.naturalHeight })
      setView({ x: 0, y: 0, w: img.naturalWidth, h: img.naturalHeight })
      setError(null)
    }
    img.onerror = () => setError(t('That image could not be loaded.'))
    img.src = url
  }, [t])

  // ---- pointer handling ----------------------------------------------------
  const toImg = useCallback((clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    return clientToImage(clientX, clientY, rect, view)
  }, [view])

  const topAt = useCallback((p: { x: number; y: number }): Occluder | null => {
    for (let i = occluders.length - 1; i >= 0; i--) {
      if (pointInShape(occluders[i].shape, p.x, p.y)) return occluders[i]
    }
    return null
  }, [occluders])

  const onPointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!image) return
    const p = toImg(e.clientX, e.clientY)
    ;(e.target as Element).setPointerCapture?.(e.pointerId)

    if (tool === 'polygon') {
      setPolygon((cur) => [...(cur ?? []), p])
      return
    }
    if (tool === 'pan') {
      drag.current = { kind: 'pan', startImg: p, lastImg: p, startView: view }
      return
    }
    if (tool === 'rect' || tool === 'ellipse') {
      drag.current = { kind: 'draw', startImg: p, lastImg: p, startView: view }
      setDraft({ kind: tool, x: p.x, y: p.y, w: 0, h: 0 })
      return
    }
    // select
    const hit = topAt(p)
    if (hit) {
      setSelection((cur) => {
        const next = new Set(e.shiftKey ? cur : [])
        if (e.shiftKey && cur.has(hit.id)) next.delete(hit.id)
        else next.add(hit.id)
        return next
      })
      drag.current = { kind: 'move', startImg: p, lastImg: p, startView: view }
    } else if (!e.shiftKey) {
      setSelection(new Set())
    }
  }

  const onPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!drag.current || !image) return
    const p = toImg(e.clientX, e.clientY)
    const d = drag.current
    if (d.kind === 'draw') {
      const r = clampRect(rectFromPoints(d.startImg.x, d.startImg.y, p.x, p.y), image.width, image.height)
      setDraft({ kind: tool === 'ellipse' ? 'ellipse' : 'rect', ...r })
    } else if (d.kind === 'move') {
      const dx = p.x - d.lastImg.x
      const dy = p.y - d.lastImg.y
      setOccluders((cur) => cur.map((o) => (selection.has(o.id) ? { ...o, shape: nudgeShape(o.shape, dx, dy, image.width, image.height) } : o)))
      d.lastImg = p
    } else if (d.kind === 'pan') {
      const dx = d.startImg.x - p.x
      const dy = d.startImg.y - p.y
      setView((v) => ({
        ...v,
        x: Math.max(0, Math.min(image.width - v.w, d.startView.x + dx)),
        y: Math.max(0, Math.min(image.height - v.h, d.startView.y + dy)),
      }))
    } else if (d.kind === 'resize' && d.handle && d.resizeId) {
      // Snapshot on the first move only, so a click that never drags leaves no
      // empty undo step. Passing the shape's current box each frame is enough:
      // only the dragged edge moves, the fixed edges keep their own values.
      if (!d.didSnapshot) { snapshot(); d.didSnapshot = true }
      const id = d.resizeId
      const handle = d.handle
      setOccluders((cur) => cur.map((o) => {
        if (o.id !== id || o.shape.kind === 'polygon') return o
        const r = resizeRect({ x: o.shape.x, y: o.shape.y, w: o.shape.w, h: o.shape.h }, handle, p, image.width, image.height)
        return { ...o, shape: { ...o.shape, ...r } }
      }))
    }
  }

  const onPointerUp = () => {
    const d = drag.current
    drag.current = null
    // A resize is fully committed during onPointerMove (it snapshots on the
    // first move), so it needs nothing on pointer-up beyond clearing the drag.
    if (d?.kind === 'move') { snapshot(); return }
    if (d?.kind === 'draw' && draft) {
      const b = shapeBounds(draft)
      if (isDrawable({ x: b.x, y: b.y, w: b.w, h: b.h })) {
        snapshot()
        const occ: Occluder = { id: uid('occ'), shape: draft, label: '' }
        setOccluders((cur) => [...cur, occ])
        setSelection(new Set([occ.id]))
      }
      setDraft(null)
    }
  }

  // The one rect/ellipse eligible for resize handles: select tool, single
  // selection, not a polygon (polygon resize is out of scope).
  const resizable = useMemo(() => {
    if (tool !== 'select' || selection.size !== 1) return null
    const id = [...selection][0]
    const occ = occluders.find((o) => o.id === id)
    if (!occ || occ.shape.kind === 'polygon') return null
    return occ
  }, [tool, selection, occluders])

  const onHandleDown = (e: ReactPointerEvent<SVGRectElement>, handle: ResizeHandle) => {
    if (!image || !resizable) return
    e.stopPropagation() // don't let the canvas start a move/deselect
    e.preventDefault()
    svgRef.current?.setPointerCapture?.(e.pointerId)
    const p = toImg(e.clientX, e.clientY)
    drag.current = { kind: 'resize', startImg: p, lastImg: p, startView: view, handle, resizeId: resizable.id, didSnapshot: false }
  }

  const commitPolygon = useCallback(() => {
    if (polygon && polygon.length >= 3) {
      snapshot()
      const occ: Occluder = { id: uid('occ'), shape: { kind: 'polygon', points: polygon }, label: '' }
      setOccluders((cur) => [...cur, occ])
      setSelection(new Set([occ.id]))
    }
    setPolygon(null)
  }, [polygon, snapshot])

  // ---- actions -------------------------------------------------------------
  const deleteSelected = useCallback(() => {
    if (selection.size === 0) return
    snapshot()
    setOccluders((cur) => cur.filter((o) => !selection.has(o.id)))
    setSelection(new Set())
  }, [selection, snapshot])

  const duplicateSelected = useCallback(() => {
    if (selection.size === 0 || !image) return
    snapshot()
    const copies: Occluder[] = occluders.filter((o) => selection.has(o.id)).map((o) => ({
      id: uid('occ'), label: o.label, shape: nudgeShape(o.shape, image.width * 0.03, image.height * 0.03, image.width, image.height),
    }))
    setOccluders((cur) => [...cur, ...copies])
    setSelection(new Set(copies.map((c) => c.id)))
  }, [selection, occluders, image, snapshot])

  const groupSelected = useCallback(() => {
    if (selection.size < 2) return
    snapshot()
    const g: OccluderGroup = { id: uid('grp'), label: '' }
    setGroups((cur) => [...cur, g])
    setOccluders((cur) => cur.map((o) => (selection.has(o.id) ? { ...o, groupId: g.id } : o)))
  }, [selection, snapshot])

  const ungroupSelected = useCallback(() => {
    snapshot()
    const gids = new Set(occluders.filter((o) => selection.has(o.id) && o.groupId).map((o) => o.groupId!))
    // Clear the groupId on EVERY member of an affected group, not just the
    // selected ones — otherwise an unselected member is left pointing at a group
    // that no longer exists, and its card silently stops being generated.
    setOccluders((cur) => cur.map((o) => (o.groupId && gids.has(o.groupId) ? { ...o, groupId: undefined } : o)))
    setGroups((cur) => cur.filter((g) => !gids.has(g.id)))
  }, [occluders, selection, snapshot])

  // G toggles: if the current selection is already one intact group, ungroup it;
  // otherwise group it. Without this, pressing G on an already-grouped set kept
  // minting new groups (Group 2, 3, 4…) instead of undoing the grouping.
  const toggleGroup = useCallback(() => {
    if (selection.size < 2) return
    const selected = occluders.filter((o) => selection.has(o.id))
    const gid = selected[0]?.groupId
    const alreadyOneGroup = !!gid && selected.every((o) => o.groupId === gid)
    if (alreadyOneGroup) ungroupSelected()
    else groupSelected()
  }, [selection, occluders, groupSelected, ungroupSelected])

  const nudge = useCallback((dx: number, dy: number) => {
    if (selection.size === 0 || !image) return
    setOccluders((cur) => cur.map((o) => (selection.has(o.id) ? { ...o, shape: nudgeShape(o.shape, dx, dy, image.width, image.height) } : o)))
  }, [selection, image])

  const fit = useCallback(() => { if (image) setView({ x: 0, y: 0, w: image.width, h: image.height }) }, [image])

  const onWheel = useCallback((e: ReactWheelEvent<SVGSVGElement>) => {
    if (!image) return
    const focus = toImg(e.clientX, e.clientY)
    setView((v) => zoomViewBox(v, e.deltaY > 0 ? 1.1 : 0.9, focus, image.width, image.height))
  }, [image, toImg])

  const groupIds = useMemo(() => groups.map((g) => g.id), [groups])
  const cardCount = occlusionCardCount(occluders, groupIds)

  const save = useCallback(() => {
    if (!image || occluders.length === 0) { setError(t('Add at least one occluder first.')); return }
    const note: ImageOcclusionNote = {
      id: uid('note'), type: 'image-occlusion', deckId, tags: [],
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      image: image.ref, imageWidth: image.width, imageHeight: image.height,
      occluders, groups, mode,
      fields: { header: header ? escapeHtml(header) : '', back: back ? escapeHtml(back) : '' },
    }
    const existing = api.allNotes
      .filter((n): n is ImageOcclusionNote => n.type === 'image-occlusion')
      .map((n) => occlusionSignature(n))
    if (isDuplicateOcclusion(note, existing)) { setError(t('This exact occlusion set already exists in this deck.')); return }
    api.saveNote(note)
    onDone()
  }, [image, occluders, groups, mode, header, back, deckId, api, onDone, t])

  // ---- shortcuts -----------------------------------------------------------
  useScope('occlusion', { exclusive: true })
  const commands = useMemo<Command[]>(() => {
    const tk = (id: string, title: string, keys: string, run: () => void, extra: Partial<Command> = {}): Command =>
      ({ id: `occ.${id}`, title, group: 'Image occlusion', scopes: ['occlusion'], keys, run, ...extra })
    return [
      tk('select', 'Select tool', 'V', () => setTool('select')),
      tk('rect', 'Rectangle', 'R', () => setTool('rect')),
      tk('ellipse', 'Ellipse', 'E', () => setTool('ellipse')),
      tk('polygon', 'Polygon', 'P', () => setTool('polygon')),
      tk('pan', 'Pan', 'H', () => setTool('pan')),
      tk('fit', 'Fit to image', 'F', fit),
      tk('group', 'Group or ungroup', 'G', toggleGroup),
      tk('ungroup', 'Ungroup', 'Shift+G', ungroupSelected),
      tk('duplicate', 'Duplicate', 'Mod+D', duplicateSelected),
      tk('delete', 'Delete', 'Delete', deleteSelected, { destructive: true }),
      tk('delete2', 'Delete', 'Backspace', deleteSelected, { destructive: true, hidden: true }),
      tk('undo', 'Undo', 'Mod+Z', undo),
      tk('redo', 'Redo', 'Mod+Shift+Z', redo),
      tk('nudgeUp', 'Nudge up', 'arrowup', () => nudge(0, -1), { repeatable: true, hidden: true }),
      tk('nudgeDown', 'Nudge down', 'arrowdown', () => nudge(0, 1), { repeatable: true, hidden: true }),
      tk('nudgeLeft', 'Nudge left', 'arrowleft', () => nudge(-1, 0), { repeatable: true, hidden: true }),
      tk('nudgeRight', 'Nudge right', 'arrowright', () => nudge(1, 0), { repeatable: true, hidden: true }),
      tk('bigUp', 'Nudge up (large)', 'Shift+arrowup', () => nudge(0, -10), { repeatable: true, hidden: true }),
      tk('bigDown', 'Nudge down (large)', 'Shift+arrowdown', () => nudge(0, 10), { repeatable: true, hidden: true }),
      tk('bigLeft', 'Nudge left (large)', 'Shift+arrowleft', () => nudge(-10, 0), { repeatable: true, hidden: true }),
      tk('bigRight', 'Nudge right (large)', 'Shift+arrowright', () => nudge(10, 0), { repeatable: true, hidden: true }),
      tk('escape', 'Cancel', 'Escape', () => { if (polygon) setPolygon(null); else setSelection(new Set()) }, { hidden: true }),
      tk('closePoly', 'Finish polygon', 'Enter', () => { if (polygon) commitPolygon() }, { hidden: true }),
    ]
  }, [fit, toggleGroup, ungroupSelected, duplicateSelected, deleteSelected, undo, redo, nudge, polygon, commitPolygon])
  useCommands(commands)

  // ---- render --------------------------------------------------------------
  if (!image) {
    return (
      <Panel className="p-10">
        <EmptyState
          icon={ImagePlus}
          title={t('Image occlusion')}
          description={t('Choose an image, then draw over the parts to hide. Each occluder (or grouped set) becomes one card.')}
          action={
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-primary-strong/25 bg-primary px-3 py-2 text-[13px] font-medium text-on-primary shadow-action hover:bg-primary-hover">
              <Icon icon={ImagePlus} size={15} /> {t('Choose image')}
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
            </label>
          }
        />
        {error && <p className="mt-3 text-center text-[12.5px] text-danger" role="alert">{error}</p>}
        <div className="mt-4 flex justify-center">
          <Button variant="ghost" size="sm" onClick={onDone}>{t('Cancel')}</Button>
        </div>
      </Panel>
    )
  }

  const previewShape = draft
  // Image-space side length that renders at a near-constant screen size: the
  // viewBox width maps to the canvas width, so view.w / K is ~ canvasWidth / K px
  // whatever the zoom.
  const handleSize = view.w / 45
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="space-y-3">
        <Panel>
          <PanelHeader
            title={t('Image occlusion')}
            action={<Badge tone="outline"><span className="tnum">{cardCount}</span> {cardCount === 1 ? t('card') : t('cards')}</Badge>}
          />
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 border-b border-line p-2">
            <ToolBtn icon={MousePointer2} label={t('Select (V)')} active={tool === 'select'} onClick={() => setTool('select')} />
            <ToolBtn icon={Square} label={t('Rectangle (R)')} active={tool === 'rect'} onClick={() => setTool('rect')} />
            <ToolBtn icon={Circle} label={t('Ellipse (E)')} active={tool === 'ellipse'} onClick={() => setTool('ellipse')} />
            <ToolBtn icon={PenTool} label={t('Polygon (P)')} active={tool === 'polygon'} onClick={() => setTool('polygon')} />
            <ToolBtn icon={Hand} label={t('Pan (H)')} active={tool === 'pan'} onClick={() => setTool('pan')} />
            <span className="mx-1 h-5 w-px bg-line" aria-hidden />
            <ToolBtn icon={Maximize2} label={t('Fit (F)')} onClick={fit} />
            <ToolBtn icon={Group} label={t('Group or ungroup (G)')} onClick={toggleGroup} disabled={selection.size < 2} />
            <ToolBtn icon={Ungroup} label={t('Ungroup (⇧G)')} onClick={ungroupSelected} disabled={selection.size === 0} />
            <ToolBtn icon={Copy} label={t('Duplicate (⌘D)')} onClick={duplicateSelected} disabled={selection.size === 0} />
            <ToolBtn icon={Trash2} label={t('Delete')} onClick={deleteSelected} disabled={selection.size === 0} />
            <span className="mx-1 h-5 w-px bg-line" aria-hidden />
            <ToolBtn icon={Undo2} label={t('Undo (⌘Z)')} onClick={undo} disabled={past.current.length === 0} />
            <ToolBtn icon={Redo2} label={t('Redo')} onClick={redo} disabled={future.current.length === 0} />
            {polygon && <Button size="sm" variant="secondary" className="ms-1" onClick={commitPolygon}>{t('Finish polygon')}</Button>}
          </div>

          {/* Canvas */}
          <div className="bg-surface-2 p-3">
            <svg
              ref={svgRef}
              viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
              className={cn('mx-auto block max-h-[60dvh] w-full touch-none select-none rounded border border-line bg-surface', tool === 'pan' ? 'cursor-grab' : tool === 'select' ? 'cursor-default' : 'cursor-crosshair')}
              style={{ aspectRatio: `${image.width} / ${image.height}` }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onWheel={onWheel}
              onDoubleClick={() => { if (polygon) commitPolygon() }}
            >
              <image href={image.url} x={0} y={0} width={image.width} height={image.height} />
              {occluders.map((o) => (
                <ShapeMark key={o.id} shape={o.shape} selected={selection.has(o.id)} grouped={!!o.groupId} />
              ))}
              {resizable && resizable.shape.kind !== 'polygon' &&
                resizeHandlePoints({ x: resizable.shape.x, y: resizable.shape.y, w: resizable.shape.w, h: resizable.shape.h }).map((hp) => (
                  <rect
                    key={hp.handle}
                    x={hp.x - handleSize / 2}
                    y={hp.y - handleSize / 2}
                    width={handleSize}
                    height={handleSize}
                    rx={handleSize / 6}
                    fill="var(--color-primary-strong)"
                    stroke="var(--color-surface)"
                    strokeWidth={1.5}
                    vectorEffect="non-scaling-stroke"
                    style={{ cursor: HANDLE_CURSOR[hp.handle] }}
                    onPointerDown={(e) => onHandleDown(e, hp.handle)}
                    aria-hidden
                  />
                ))}
              {previewShape && <ShapeMark shape={previewShape} selected preview />}
              {polygon && polygon.length > 0 && (
                <polyline points={polygon.map((p) => `${p.x},${p.y}`).join(' ')} fill="var(--color-accent)" fillOpacity={0.2} stroke="var(--color-accent)" strokeWidth={view.w / 300} />
              )}
            </svg>
            <p className="mt-2 text-center text-[11.5px] text-ink-3">
              {tool === 'polygon' ? t('Click to add points; double-click or Enter to finish.') : t('Draw over what to hide. Select a shape to move or group it.')}
            </p>
          </div>
        </Panel>
      </div>

      {/* Side: mode, occluder list, fields, save */}
      <div className="space-y-4">
        <Panel className="p-4">
          <Field label={t('Reveal mode')}>
            <Segmented
              items={[{ value: 'hide-all', label: t('Hide all') }, { value: 'hide-one', label: t('Hide one') }]}
              value={mode}
              onChange={(v) => setMode(v as OcclusionMode)}
            />
          </Field>
          <p className="mt-1.5 text-[11.5px] text-ink-3">
            {mode === 'hide-all' ? t('Every region is hidden; one is asked at a time.') : t('Only the asked region is hidden; the rest stay visible.')}
          </p>
        </Panel>

        <Panel>
          <PanelHeader title={t('Occluders')} hint={String(occluders.length)} />
          <OccluderList
            occluders={occluders} groups={groups} selection={selection}
            onSelect={(id, additive) => setSelection((cur) => { const n = new Set(additive ? cur : []); n.add(id); return n })}
            onLabel={(id, label) => { setOccluders((cur) => cur.map((o) => (o.id === id ? { ...o, label } : o))) }}
            onDelete={(id) => { snapshot(); setOccluders((cur) => cur.filter((o) => o.id !== id)) }}
          />
        </Panel>

        <Panel className="space-y-3 p-4">
          <Field label={t('Header')} hint={t('Optional — shown above the image')} htmlFor="occ-header">
            <TextInput id="occ-header" value={header} onChange={(e) => setHeader(e.target.value)} placeholder={t('e.g. Label the cardiac chambers')} />
          </Field>
          <Field label={t('Back extra')} hint={t('Optional — shown with the answer')} htmlFor="occ-back">
            <TextInput id="occ-back" value={back} onChange={(e) => setBack(e.target.value)} />
          </Field>
        </Panel>

        {error && <p className="text-[12.5px] text-danger" role="alert">{error}</p>}
        <div className="flex items-center gap-2">
          <Button variant="primary" iconLeft={Save} onClick={save} disabled={occluders.length === 0}>
            {t('Save')} · <span className="tnum">{cardCount}</span>
          </Button>
          <Button variant="ghost" onClick={onDone}>{t('Cancel')}</Button>
        </div>
      </div>
    </div>
  )
}

function ToolBtn({ icon, label, active, onClick, disabled }: { icon: typeof Square; label: string; active?: boolean; onClick: () => void; disabled?: boolean }) {
  return <IconButton icon={icon} label={label} size="sm" onClick={onClick} active={active} disabled={disabled} />
}

function ShapeMark({ shape, selected, grouped, preview }: { shape: OccluderShape; selected?: boolean; grouped?: boolean; preview?: boolean }) {
  const fill = grouped ? 'var(--color-primary)' : 'var(--color-accent)'
  const stroke = selected ? 'var(--color-primary-strong)' : 'transparent'
  const props = { fill, fillOpacity: preview ? 0.35 : 0.55, stroke, strokeWidth: 2, vectorEffect: 'non-scaling-stroke' as const }
  if (shape.kind === 'rect') return <rect x={shape.x} y={shape.y} width={shape.w} height={shape.h} rx={2} {...props} />
  if (shape.kind === 'ellipse') return <ellipse cx={shape.x + shape.w / 2} cy={shape.y + shape.h / 2} rx={shape.w / 2} ry={shape.h / 2} {...props} />
  return <polygon points={shape.points.map((p) => `${p.x},${p.y}`).join(' ')} {...props} />
}

function OccluderList({
  occluders, groups, selection, onSelect, onLabel, onDelete,
}: {
  occluders: Occluder[]
  groups: OccluderGroup[]
  selection: Set<string>
  onSelect: (id: string, additive: boolean) => void
  onLabel: (id: string, label: string) => void
  onDelete: (id: string) => void
}) {
  const t = useT()
  if (occluders.length === 0) {
    return <p className="px-4 py-6 text-center text-[12.5px] text-ink-3">{t('No occluders yet. Draw over the image to add one.')}</p>
  }
  const groupLabel = (id?: string) => (id ? `${t('Group')} ${groups.findIndex((g) => g.id === id) + 1}` : null)
  return (
    <ul className="max-h-[16rem] divide-y divide-line overflow-y-auto">
      {occluders.map((o, i) => (
        <li key={o.id} className={cn('flex items-center gap-2 px-3 py-2', selection.has(o.id) && 'bg-primary-tint')}>
          <button
            type="button"
            onClick={(e) => onSelect(o.id, e.shiftKey)}
            className="grid size-6 shrink-0 place-items-center rounded border border-line-2 bg-surface text-[11px] font-mono text-ink-2"
            aria-label={t('Select occluder') + ` ${i + 1}`}
          >
            {i + 1}
          </button>
          <input
            value={o.label}
            onChange={(e) => onLabel(o.id, e.target.value)}
            placeholder={groupLabel(o.groupId) ?? t('Label (optional)')}
            aria-label={t('Occluder label') + ` ${i + 1}`}
            className="min-w-0 flex-1 rounded border border-transparent bg-transparent px-1.5 py-1 text-[12.5px] text-ink outline-none focus:border-line-2 focus:bg-surface"
          />
          {o.groupId && <Badge tone="primary">{groupLabel(o.groupId)}</Badge>}
          <IconButton icon={X} label={t('Delete occluder')} size="sm" onClick={() => onDelete(o.id)} />
        </li>
      ))}
    </ul>
  )
}
