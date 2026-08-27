import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, List, Maximize, Minus, Plus, Search, X,
} from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { SearchInput } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { useReaderSource } from '@/lib/useReaderSource'
import { useRecentResources } from '@/lib/useRecentResources'
import type { Resource } from '@/data/resources'
import { useLocalChoice } from '@/lib/useLocalPreference'
import { apiOpenFile, API_MODE } from '@/lib/api'
import {
  anchorAfterRelayout, buildLayout, fitScale, offsetForPage, pageAtOffset, visibleRange,
} from '@/lib/reader/pageLayout'
import { clampScale, stepScale, zoomAnchored } from '@/lib/reader/zoomAnchor'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import {
  isInk, newObjectId, nextZ, translateObject, NOTE_TONES,
  type AnnotationObject, type Rect,
} from '@/lib/reader/annotations'
import { translatePoints } from '@/lib/reader/strokeCodec'
import { PdfPageView } from './PdfPageView'
import { InkLayer } from './InkLayer'
import { InkSurface, type Tool, type ToolSettings } from './InkSurface'
import { WidgetLayer } from './WidgetLayer'
import { SelectionOverlay } from './SelectionOverlay'
import { RulerLayer } from './RulerLayer'
import { StudyTimer } from './StudyTimer'
import { ReaderToolbar, INK_COLORS, TONE_SWATCH } from './ReaderToolbar'
import { useAnnotations } from './useAnnotations'
import { usePdfDocument } from './usePdfDocument'
import { useScrollAnimation } from './useScrollAnimation'
import { useUrlPageSync } from './useUrlPageSync'
import { usePanAndZoom } from './usePanAndZoom'
import { useDocumentSearch } from './useDocumentSearch'
import '@/styles/reader.css'

/**
 * Reading a source inside the app.
 *
 * The rewrite this replaces measured its own layout from the DOM and fed the
 * measurements back into the state that produced them. See
 * `@/lib/reader/pageLayout` for what that cost and why the layout is now
 * computed; the short version is that scrolling used to lock up and then
 * oscillate, because four things were arguing about where the document was.
 */

/** How far past the viewport to keep pages mounted, in CSS pixels. */
const OVERSCAN = 1200
/** Fit-to-width, then a little closer — reading, not surveying. */
const CLOSER_FACTOR = 1.15
const FIT_MODES = ['closer', 'width', 'page'] as const
type FitMode = (typeof FIT_MODES)[number]

export function ReaderShell() {
  const t = useT()
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const { noteOpened } = useRecentResources()
  const source = useReaderSource(id)
  // The previous screen when this tab has one to go back to — a fresh tab, a
  // bookmark, or a deep link into a specific resource does not, so those land
  // on the catalogue this reader is drilled into from instead.
  const goBack = useCallback(() => {
    const historyIndex = (window.history.state as { idx?: number } | null)?.idx
    if (typeof historyIndex === 'number' && historyIndex > 0) navigate(-1)
    else navigate('/app/resources')
  }, [navigate])

  const scrollerRef = useRef<HTMLDivElement>(null)
  const { doc, sizes, outline, loading, error } = usePdfDocument(
    source,
    source.hasFile,
    t('This file could not be opened here.'),
  )

  const [fit, setFit] = useLocalChoice<FitMode>('synapse.reader.fit', 'closer', FIT_MODES)
  const [scale, setScale] = useState(1)
  const [viewport, setViewport] = useState({ width: 0, height: 0 })
  const [current, setCurrent] = useState(1)
  const [panel, setPanel] = useState<'none' | 'outline' | 'search'>('none')
  const [query, setQuery] = useState('')
  const scaleChosen = useRef(false)

  const search = useDocumentSearch(doc)
  const animation = useScrollAnimation(scrollerRef)
  const url = useUrlPageSync(Boolean(doc))

  const [tool, setTool] = useState<Tool>('pan')
  const [settings, setSettings] = useState<ToolSettings>({
    color: INK_COLORS[0],
    width: 0.003,
    pen: 'ball',
    stabilization: 0.35,
    eraserRadius: 0.012,
    eraserMode: 'stroke',
    eraserHighlighterOnly: false,
    tone: 'amber',
    snapShapes: false,
    lasso: 'free',
    ruler: null,
  })
  const [selection, setSelection] = useState<Set<string>>(new Set())
  const [timerOn, setTimerOn] = useState(false)
  const dpr = typeof window === 'undefined' ? 1 : Math.min(window.devicePixelRatio || 1, 2)
  const annotations = useAnnotations(source.scope, current)
  // Held in a ref so the shortcut handler and the widget constructors are
  // registered once, rather than re-registered on every change to the marks.
  const annotationsRef = useRef(annotations)
  annotationsRef.current = annotations

  const patchSettings = useCallback((patch: Partial<ToolSettings>) => {
    setSettings((currentSettings) => ({ ...currentSettings, ...patch }))
  }, [])

  // Read by callbacks that must not be rebuilt whenever the reader scrolls.
  const sizesRef = useRef(sizes)
  sizesRef.current = sizes
  const currentRef = useRef(current)
  currentRef.current = current

  /**
   * The ruler is a line across the middle of the page in view, and strokes
   * that start near it snap onto it. Placing it per page would mean placing it
   * again on every page; one line, moved with the reader, is what a real ruler
   * on a real book does.
   */
  const toggleRuler = useCallback(() => {
    // Halfway down means half the page's *height*, and page space measures both
    // axes in page widths — so on A4 the middle is y ≈ 0.71, not 0.5.
    const size = sizesRef.current[currentRef.current - 1]
    const middle = size ? size.height / size.width / 2 : 0.7
    setSettings((currentSettings) => ({
      ...currentSettings,
      ruler: currentSettings.ruler ? null : { a: { x: 0.06, y: middle }, b: { x: 0.94, y: middle } },
    }))
  }, [])

  const placeWidget = useCallback((kind: 'note' | 'text' | 'tape', page: number, rect: Rect) => {
    const onPage = annotationsRef.current.objects.filter((object) => object.page === page)
    const base = { id: newObjectId(), page, z: nextZ(onPage), t: Date.now(), bbox: rect }
    if (kind === 'tape') annotationsRef.current.add({ ...base, kind: 'tape', r: rect, tone: settings.tone })
    else if (kind === 'note') annotationsRef.current.add({ ...base, kind: 'note', r: rect, tone: settings.tone, text: '' })
    else annotationsRef.current.add({ ...base, kind: 'textbox', r: rect, text: '', color: settings.color, size: 0.022 })
    // Placing one is a single act, not a mode to stay in.
    setTool('pan')
  }, [settings.color, settings.tone])

  /* ---- Selection ------------------------------------------------------- */

  const selected = useMemo(
    () => annotations.objects.filter((object) => selection.has(object.id)),
    [annotations.objects, selection],
  )

  /**
   * Which gesture is in progress.
   *
   * The undo stack folds changes that share a tag, so a drag of forty pointer
   * moves is one step. Bumping this on release is what stops the *next* drag
   * folding into the same one.
   */
  const gesture = useRef(0)
  const endGesture = useCallback(() => { gesture.current += 1 }, [])

  const moveSelection = useCallback((dx: number, dy: number) => {
    annotationsRef.current.update(
      [...selection],
      (object) => translateObject(object, dx, dy, translatePoints),
      `move-selection-${gesture.current}`,
    )
  }, [selection])

  const recolourSelection = useCallback((color: string) => {
    annotationsRef.current.update([...selection], (object) => {
      if (object.kind === 'ink' || object.kind === 'highlighter' || object.kind === 'textbox') return { ...object, color }
      return object
    })
  }, [selection])

  const retoneSelection = useCallback((tone: (typeof NOTE_TONES)[number]) => {
    annotationsRef.current.update([...selection], (object) => (
      object.kind === 'note' || object.kind === 'tape' ? { ...object, tone } : object
    ))
  }, [selection])

  const setWidgetText = useCallback((id: string, text: string) => {
    annotationsRef.current.update([id], (object) => (
      object.kind === 'note' || object.kind === 'textbox' ? { ...object, text } : object
    ), `text-${id}-${gesture.current}`)
  }, [])

  const moveWidget = useCallback((id: string, dx: number, dy: number) => {
    annotationsRef.current.update(
      [id],
      (object) => translateObject(object, dx, dy, translatePoints),
      `move-${id}-${gesture.current}`,
    )
  }, [])

  const layout = useMemo(
    () => buildLayout(sizes, { scale, containerWidth: viewport.width }),
    [sizes, scale, viewport.width],
  )
  const layoutRef = useRef(layout)
  /** The page the reader was sent to, until they scroll away from it. */
  const anchorPage = useRef<number | null>(null)
  const zoomApplied = useRef(false)

  useEffect(() => {
    if (source.found) noteOpened({ id, title: source.title, type: source.type as Resource['type'], subjectId: source.subjectId, meta: source.meta })
    // Recorded once per document, not once per render of it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, source.found])

  /* ---- Size ------------------------------------------------------------ */

  useLayoutEffect(() => {
    const node = scrollerRef.current
    if (!node) return
    const measure = () => setViewport({ width: node.clientWidth, height: node.clientHeight })
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [loading])

  // The opening scale, chosen once the document and the container are both
  // known. `closer` is the default because 100% of a PDF point is small on a
  // modern screen, which is what "open it more zoomed in" was asking for.
  useEffect(() => {
    if (scaleChosen.current || !sizes.length || !viewport.width) return
    scaleChosen.current = true
    setScale(scaleFor(fit, sizes, viewport))
  }, [fit, sizes, viewport])

  /* ---- Relayout without moving the reader ------------------------------ */

  /**
   * The layout changes under the reader constantly — the opening scale is
   * chosen after the first render, and page sizes are corrected for a while
   * after that. Two different things have to be held still.
   */
  useLayoutEffect(() => {
    const node = scrollerRef.current
    const before = layoutRef.current
    layoutRef.current = layout
    if (!node || before === layout || !layout.pages.length) return

    // A zoom already computed the exact offset that keeps its anchor point
    // still; recomputing one here would fight it.
    if (zoomApplied.current) { zoomApplied.current = false; return }

    // Sent to a page and not yet moved from it: that page is the anchor, not
    // the pixel offset. Anchoring on pixels is why a deep link to page 200
    // used to land on page 116 — the offset was computed at scale 1, before
    // the opening scale had been chosen.
    if (anchorPage.current !== null) {
      node.scrollTop = offsetForPage(layout, anchorPage.current)
      return
    }

    // Reading: keep the same point of the same page under their eyes.
    if (!before.pages.length) return
    const next = anchorAfterRelayout(before, layout, node.scrollTop)
    if (Math.abs(next - node.scrollTop) > 1) node.scrollTop = next
  }, [layout])

  /* ---- Which page is showing ------------------------------------------- */

  const publish = useRef({ current: 1 })
  publish.current.current = current

  useEffect(() => {
    const node = scrollerRef.current
    if (!node || !layout.pages.length) return
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const page = pageAtOffset(layoutRef.current, node.scrollTop, node.clientHeight, publish.current.current)
        setScrollTop(node.scrollTop)
        // Their own scroll releases the anchor: from here the pixel offset is
        // what should be preserved, not the page they were sent to.
        if (!animation.isAnimating()) anchorPage.current = null
        if (page === publish.current.current) return
        setCurrent(page)
        // A page the reader arrived at by scrolling is worth putting in the
        // address bar. One this hook scrolled to is not — that is our own move
        // coming back, and writing it is how the loop used to close.
        if (!animation.isAnimating()) url.report(page)
      })
    }
    node.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { if (frame) cancelAnimationFrame(frame); node.removeEventListener('scroll', onScroll) }
  }, [layout.pages.length, animation, url])

  const [scrollTop, setScrollTop] = useState(0)

  /* ---- Navigation ------------------------------------------------------ */

  const goToPage = useCallback(async (page: number, options?: { instant?: boolean }) => {
    if (!doc) return
    const clamped = Math.max(1, Math.min(doc.numPages, page))
    setCurrent(clamped)
    anchorPage.current = clamped
    url.report(clamped)
    await animation.scrollTo(offsetForPage(layoutRef.current, clamped), options)
  }, [animation, doc, url])

  // A page asked for by the URL — a citation, a shared link, the back button.
  // Consumed once per navigation, never re-derived from a render.
  useEffect(() => {
    const asked = url.pending()
    if (!asked || !doc || !layout.pages.length) return
    url.consume()
    void goToPage(asked, { instant: true })
  }, [doc, goToPage, layout.pages.length, url])

  /* ---- Zoom ------------------------------------------------------------ */

  const zoomBy = useCallback((factor: number, pointer: { x: number; y: number }) => {
    const node = scrollerRef.current
    if (!node || !sizes.length) return
    const result = zoomAnchored({
      sizes,
      from: layoutRef.current.scale,
      to: clampScale(layoutRef.current.scale * factor),
      scroll: { top: node.scrollTop, left: node.scrollLeft },
      pointer,
      containerWidth: node.clientWidth,
      containerHeight: node.clientHeight,
    })
    zoomApplied.current = true
    setScale(result.scale)
    // Applied after the layout commits, or the scroller clamps to the old height.
    requestAnimationFrame(() => {
      node.scrollTop = result.scroll.top
      node.scrollLeft = result.scroll.left
    })
  }, [sizes])

  const zoomStep = useCallback((direction: 1 | -1) => {
    const node = scrollerRef.current
    if (!node) return
    const next = stepScale(layoutRef.current.scale, direction)
    zoomBy(next / layoutRef.current.scale, { x: node.clientWidth / 2, y: node.clientHeight / 2 })
  }, [zoomBy])

  const applyFit = useCallback((mode: FitMode) => {
    setFit(mode)
    const node = scrollerRef.current
    if (!node || !sizes.length) return
    const next = scaleFor(mode, sizes, { width: node.clientWidth, height: node.clientHeight })
    zoomBy(next / layoutRef.current.scale, { x: node.clientWidth / 2, y: 0 })
  }, [setFit, sizes, zoomBy])

  // Drag-to-pan belongs to the pointer only when no tool has claimed it.
  usePanAndZoom({ scroller: scrollerRef, enabled: tool === 'pan', onZoom: zoomBy })

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      // Never while someone is typing — a search box or a note is not a canvas.
      const target = event.target as HTMLElement | null
      if (target?.closest('input,textarea,[contenteditable="true"]')) return

      if (event.metaKey || event.ctrlKey) {
        if (event.key === '=' || event.key === '+') { event.preventDefault(); zoomStep(1) }
        else if (event.key === '-') { event.preventDefault(); zoomStep(-1) }
        else if (event.key === '0') { event.preventDefault(); applyFit('width') }
        else if (event.key === 'f') { event.preventDefault(); setPanel('search') }
        else if (event.key.toLowerCase() === 'z') {
          event.preventDefault()
          if (event.shiftKey) annotationsRef.current.redo()
          else annotationsRef.current.undo()
        }
        return
      }

      const shortcut: Record<string, Tool> = {
        v: 'pan', a: 'lasso', p: 'pen', h: 'highlighter', s: 'shape',
        e: 'eraser', n: 'note', t: 'text', k: 'tape', l: 'laser',
      }
      const key = event.key.toLowerCase()
      if (key === 'r') { event.preventDefault(); toggleRuler(); return }
      if (event.key === 'Delete' || event.key === 'Backspace') {
        const ids = [...selectionRef.current]
        if (!ids.length) return
        event.preventDefault()
        annotationsRef.current.remove(ids)
        setSelection(new Set())
        return
      }
      const next = shortcut[key]
      if (next) { event.preventDefault(); setTool(next) }
      else if (event.key === 'Escape') { setTool('pan'); setSelection(new Set()) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [applyFit, toggleRuler, zoomStep])

  const selectionRef = useRef(selection)
  selectionRef.current = selection

  /* ---- Search ---------------------------------------------------------- */

  // Notes are matched here rather than in `useDocumentSearch`: the index is a
  // few kilobytes already in memory, so it needs no scan, no worker and no
  // cancellation — it answers as the student types.
  const noteHits = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (needle.length < 2) return []
    return annotations.noteIndex.filter((entry) => entry.text.toLowerCase().includes(needle)).slice(0, 40)
  }, [annotations.noteIndex, query])

  const currentMatch = search.currentIndex >= 0 ? search.matches[search.currentIndex] : undefined
  useEffect(() => {
    if (currentMatch) void goToPage(currentMatch.page)
    // Only when the hit itself changes; `goToPage` is stable per document.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMatch?.page, currentMatch?.start])

  /* ---- Render ---------------------------------------------------------- */

  if (!source.found) {
    if (source.loading) return <p className="py-16 text-center text-[13px] text-ink-3">{t('Opening…')}</p>
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <p className="text-[15px] font-semibold text-ink">{t('That resource is not here')}</p>
        <p className="mt-1.5 text-[13px] text-ink-3">{t('It may have been removed, or the link may be out of date.')}</p>
        <Link to="/app/resources" className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-primary-strong">
          <Icon icon={ArrowLeft} size={15} />{t('Back to resources')}
        </Link>
      </div>
    )
  }

  const [firstPage, lastPage] = layout.pages.length
    ? visibleRange(layout, scrollTop, viewport.height || 800, OVERSCAN)
    : [1, 0]
  // Text is built only for what is actually on screen: a dense page is a
  // thousand spans, and the overscan is there to paint ahead, not to type ahead.
  const [firstVisible, lastVisible] = layout.pages.length
    ? visibleRange(layout, scrollTop, viewport.height || 800, 0)
    : [1, 0]

  const mounted: number[] = []
  for (let page = firstPage; page <= lastPage; page++) mounted.push(page)

  const markers = annotations.markers

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] min-h-0 flex-col bg-paper">
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-line bg-surface px-3 sm:px-4">
        <button type="button" onClick={goBack} className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 text-[12.5px] font-medium text-ink-2 hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]">
          <Icon icon={ArrowLeft} size={15} />
          <span className="hidden sm:inline">{t('Back')}</span>
        </button>
        <span className="hidden h-5 w-px bg-line sm:block" />
        <h1 className="min-w-0 flex-1 truncate text-[13.5px] font-semibold text-ink">{source.title}</h1>

        {doc && (
          <>
            <div className="hidden items-center gap-1 md:flex">
              <button type="button" onClick={() => void goToPage(current - 1)} disabled={current <= 1} className="grid size-10 place-items-center rounded-md text-ink-2 hover:bg-inset disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]" aria-label={t('Previous page')}>
                <Icon icon={ChevronLeft} size={16} className="rtl:-scale-x-100" />
              </button>
              <span className="tnum font-mono text-[12px] text-ink-2">{current} / {doc.numPages}</span>
              <button type="button" onClick={() => void goToPage(current + 1)} disabled={current >= doc.numPages} className="grid size-10 place-items-center rounded-md text-ink-2 hover:bg-inset disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]" aria-label={t('Next page')}>
                <Icon icon={ChevronRight} size={16} className="rtl:-scale-x-100" />
              </button>
            </div>
            <div className="hidden items-center gap-1 lg:flex">
              <button type="button" onClick={() => zoomStep(-1)} className="grid size-10 place-items-center rounded-md text-ink-2 hover:bg-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]" aria-label={t('Zoom out')}>
                <Icon icon={Minus} size={15} />
              </button>
              <span className="tnum w-11 text-center font-mono text-[12px] text-ink-2">{Math.round(scale * 100)}%</span>
              <button type="button" onClick={() => zoomStep(1)} className="grid size-10 place-items-center rounded-md text-ink-2 hover:bg-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]" aria-label={t('Zoom in')}>
                <Icon icon={Plus} size={15} />
              </button>
              <button type="button" onClick={() => applyFit('width')} className="grid size-10 place-items-center rounded-md text-ink-2 hover:bg-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]" aria-label={t('Fit to width')} title={t('Fit to width')}>
                <Icon icon={Maximize} size={15} />
              </button>
            </div>
            <button type="button" onClick={() => setPanel((p) => (p === 'search' ? 'none' : 'search'))} className={cn('grid size-11 place-items-center rounded-md hover:bg-inset sm:size-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]', panel === 'search' ? 'bg-primary-tint text-primary-strong' : 'text-ink-2')} aria-label={t('Search this document')}>
              <Icon icon={Search} size={16} />
            </button>
            <button type="button" onClick={() => setPanel((p) => (p === 'outline' ? 'none' : 'outline'))} className={cn('grid size-11 place-items-center rounded-md hover:bg-inset sm:size-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]', panel === 'outline' ? 'bg-primary-tint text-primary-strong' : 'text-ink-2')} aria-label={t('Contents')}>
              <Icon icon={List} size={16} />
            </button>
          </>
        )}
      </header>

      {/* A real column rather than an overlay: the panel used to sit on top of
          the page it was helping the reader search. */}
      <div className={cn('grid min-h-0 flex-1', panel === 'none' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem]')}>
        {/* The scroller is wrapped rather than positioned itself: anything
            `absolute` inside a scrolling box is placed against its *content*,
            so a toolbar at "35% from the top" of a 400 000-pixel document is
            nowhere near the screen. */}
        <div className="relative min-h-0">
        {doc && (
          <ReaderToolbar
            tool={tool}
            onTool={(next) => { setTool(next); if (next !== 'lasso') setSelection(new Set()) }}
            settings={settings}
            onSettings={patchSettings}
            onUndo={annotations.undo}
            onRedo={annotations.redo}
            canUndo={annotations.canUndo}
            canRedo={annotations.canRedo}
            rulerOn={settings.ruler !== null}
            onToggleRuler={toggleRuler}
            timerOn={timerOn}
            onToggleTimer={() => setTimerOn((on) => !on)}
          />
        )}

        {timerOn && <StudyTimer onClose={() => setTimerOn(false)} />}

        {selected.length > 0 && (
          <SelectionBar
            count={selected.length}
            onColor={recolourSelection}
            onTone={retoneSelection}
            onDelete={() => { annotations.remove([...selection]); setSelection(new Set()) }}
            onDone={() => setSelection(new Set())}
          />
        )}

        {/* A refused save has to be visible. `stateStore` drops a
            non-retryable write and only sets a status flag, so silence here
            would mean losing work without ever saying so. */}
        {annotations.error && (
          <div role="alert" className="absolute inset-x-0 top-3 z-40 mx-auto w-fit rounded-lg border border-danger/30 bg-danger-tint px-3 py-2 text-[12.5px] text-ink">
            {t(annotations.error)}
          </div>
        )}

        <div
          ref={scrollerRef}
          className="size-full overflow-auto overscroll-contain"
          style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
        >
          {loading && <p className="py-16 text-center text-[13px] text-ink-3">{t('Opening…')}</p>}

          {!loading && !source.hasFile && (
            <div className="mx-auto max-w-md py-16 text-center">
              <p className="text-[14px] font-semibold text-ink">{t('Source file not uploaded yet')}</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-3">
                {API_MODE
                  ? t('This resource is catalogued, but its file has not been added.')
                  : t('Files are available once this deployment is connected to its library.')}
              </p>
              {source.meta && <p className="mt-3 font-mono text-[11.5px] text-ink-3">{source.meta}</p>}
            </div>
          )}

          {!loading && error && (
            <div className="mx-auto max-w-md py-16 text-center">
              <p className="text-[14px] font-semibold text-ink">{error}</p>
              <Button className="mt-4" variant="secondary" size="sm" iconLeft={ExternalLink} onClick={() => source.filePath && void apiOpenFile(source.filePath)}>
                {t('Open it in a new tab instead')}
              </Button>
            </div>
          )}

          {doc && (
            <div className="relative" style={{ height: layout.totalHeight, width: Math.max(layout.contentWidth, viewport.width) }}>
              {mounted.map((page) => {
                const metrics = sizes[page - 1]
                const onPage = annotations.objects.filter((object) => object.page === page)
                return (
                  <PdfPageView
                    key={page}
                    doc={doc}
                    page={page}
                    box={layout.pages[page - 1]}
                    scale={scale}
                    withText={page >= firstVisible && page <= lastVisible}
                    // Text stops being selectable while a tool is out, or a pen
                    // stroke turns into a text selection.
                    selectable={tool === 'pan'}
                  >
                    {metrics && (
                      <>
                        <InkLayer objects={onPage} metrics={metrics} scale={scale} dpr={dpr} />
                        <WidgetLayer
                          objects={onPage}
                          metrics={metrics}
                          scale={scale}
                          interactive={tool === 'pan'}
                          selected={selection}
                          onChangeText={setWidgetText}
                          onSelect={(objectId, additive) => setSelection((currentSet) => {
                            const next = additive ? new Set(currentSet) : new Set<string>()
                            next.add(objectId)
                            return next
                          })}
                          onMove={moveWidget}
                          onGestureEnd={endGesture}
                        />
                        <InkSurface
                          tool={tool}
                          settings={settings}
                          page={page}
                          metrics={metrics}
                          scale={scale}
                          dpr={dpr}
                          objects={onPage}
                          handlers={{
                            onCommit: annotations.add,
                            onErase: annotations.remove,
                            onSelect: (ids) => setSelection(new Set(ids)),
                            onDrawnRect: (kind, rect) => placeWidget(kind, page, rect),
                          }}
                        />
                        {/* One ruler, on the page being read — not one per page. */}
                        {settings.ruler && page === current && (
                          <RulerLayer
                            ruler={settings.ruler}
                            divisor={metrics.width * scale}
                            onChange={(ruler) => patchSettings({ ruler })}
                          />
                        )}

                        {/* A single widget is its own handle — it already
                            drags, and a box over it would swallow the
                            double-click that opens it for writing. The box is
                            for what has no handle of its own: ink, and several
                            things at once. */}
                        {needsSelectionBox(selected.filter((object) => object.page === page)) && (
                          <SelectionOverlay
                            objects={selected.filter((object) => object.page === page)}
                            metrics={metrics}
                            scale={scale}
                            onMove={moveSelection}
                            onMoveEnd={endGesture}
                          />
                        )}
                      </>
                    )}
                  </PdfPageView>
                )
              })}
            </div>
          )}
        </div>
        </div>

        {panel !== 'none' && (
          <aside className="min-h-0 overflow-y-auto border-s border-line bg-surface max-lg:absolute max-lg:inset-y-0 max-lg:end-0 max-lg:z-20 max-lg:mt-12 max-lg:w-[min(22rem,100vw)] max-lg:shadow-pop">
            <div className="sticky top-0 flex items-center gap-2 border-b border-line bg-surface px-3 py-2.5">
              <h2 className="flex-1 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">
                {panel === 'outline' ? t('Contents') : t('Search this document')}
              </h2>
              {panel === 'outline' && (
                <button
                  type="button"
                  onClick={() => {
                    const title = window.prompt(t('Name this section'), `${t('Page')} ${current}`)
                    if (title?.trim()) annotations.addMarker(title.trim(), current)
                  }}
                  className="inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-[11.5px] font-medium text-primary-strong hover:bg-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                >
                  <Icon icon={Plus} size={13} />{t('Section here')}
                </button>
              )}
              <button type="button" onClick={() => setPanel('none')} className="grid size-10 place-items-center rounded-md text-ink-3 hover:bg-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]" aria-label={t('Close')}>
                <Icon icon={X} size={15} />
              </button>
            </div>

            {panel === 'outline' ? (
              outline.length || markers.length ? (
                <ul className="p-2">
                  {markers.length > 0 && (
                    <li className="mb-1 border-b border-line pb-1">
                      <p className="px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Your sections')}</p>
                      {markers.map((marker) => (
                        <button
                          key={marker.id}
                          type="button"
                          onClick={() => void goToPage(marker.page)}
                            className="flex min-h-10 w-full items-center gap-2 rounded-md px-2 py-2 text-start text-[12.5px] text-ink-2 hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                        >
                          <span className="h-3.5 w-0.5 shrink-0 rounded-full bg-primary" aria-hidden />
                          <span className="min-w-0 flex-1 truncate">{marker.title}</span>
                          <span className="tnum shrink-0 font-mono text-[11px] text-ink-3">{marker.page}</span>
                        </button>
                      ))}
                    </li>
                  )}
                  {outline.map((entry, index) => (
                    <li key={`${entry.title}-${index}`}>
                      <button
                        type="button"
                        disabled={entry.page == null}
                        onClick={() => entry.page && void goToPage(entry.page)}
                        style={{ paddingInlineStart: `${0.5 + entry.depth * 0.85}rem` }}
                        className="flex min-h-10 w-full items-center gap-2 rounded-md py-2 pe-2 text-start text-[12.5px] text-ink-2 hover:bg-inset hover:text-ink disabled:text-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                      >
                        <span className="min-w-0 flex-1 truncate">{entry.title}</span>
                        {entry.page != null && <span className="tnum shrink-0 font-mono text-[11px] text-ink-3">{entry.page}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-3 py-8 text-center text-[12.5px] text-ink-3">{t('This document has no contents list. Add your own sections, or search it instead.')}</p>
              )
            ) : (
              <div className="p-3">
                <form onSubmit={(event) => { event.preventDefault(); void search.search(query) }}>
                  <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('Find in this document…')} />
                </form>

                {/* The student's own words, found from any page — see
                    `noteIndex` for why they are not searched shard by shard. */}
                {noteHits.length > 0 && (
                  <div className="mt-3">
                    <p className="px-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('In your notes')}</p>
                    <ul className="mt-1 divide-y divide-line">
                      {noteHits.map((hit) => (
                        <li key={hit.id}>
                          <button type="button" onClick={() => void goToPage(hit.page)} className="min-h-10 w-full py-2.5 text-start hover:bg-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]">
                            <span className="tnum font-mono text-[11px] text-primary-strong">{t('Page')} {hit.page}</span>
                            <span className="mt-0.5 block px-2 text-[12px] leading-relaxed text-ink-2">{hit.text}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Only when there is something under it — the notes above are
                    found as you type, while the document is scanned on Enter. */}
                {search.matches.length > 0 && noteHits.length > 0 && (
                  <p className="mt-3 px-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('In this document')}</p>
                )}

                {search.matches.length > 0 && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="tnum flex-1 font-mono text-[11.5px] text-ink-3">
                      {search.currentIndex + 1} / {search.matches.length}{search.truncated ? '+' : ''}
                    </span>
                    <button type="button" onClick={() => search.step(-1)} className="grid size-9 place-items-center rounded-md text-ink-2 hover:bg-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]" aria-label={t('Previous match')}>
                      <Icon icon={ChevronLeft} size={14} className="rtl:-scale-x-100" />
                    </button>
                    <button type="button" onClick={() => search.step(1)} className="grid size-9 place-items-center rounded-md text-ink-2 hover:bg-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]" aria-label={t('Next match')}>
                      <Icon icon={ChevronRight} size={14} className="rtl:-scale-x-100" />
                    </button>
                  </div>
                )}

                {search.running && (
                  <p className="tnum mt-3 font-mono text-[11.5px] text-ink-3">
                    {t('Searching…')} {search.scanned} / {search.total}
                  </p>
                )}
                {!search.running && search.query && !search.matches.length && !noteHits.length && (
                  <p className="mt-3 text-[12.5px] text-ink-3">{t('No match in this document, or in your notes.')}</p>
                )}

                <ul className="mt-3 divide-y divide-line">
                  {search.matches.map((match, index) => (
                    <li key={`${match.page}-${match.start}`}>
                      <button
                        type="button"
                        onClick={() => search.goTo(index)}
                        className={cn('min-h-10 w-full py-2.5 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]', index === search.currentIndex ? 'bg-primary-tint/40' : 'hover:bg-inset')}
                      >
                        <span className="tnum font-mono text-[11px] text-primary-strong">{t('Page')} {match.page}</span>
                        <span className="mt-0.5 block px-2 text-[12px] leading-relaxed text-ink-2">{match.snippet}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  )
}

/**
 * What can be done to what the lasso caught.
 *
 * It offers ink colours and note tones side by side rather than working out
 * which apply: a selection can hold both, and each control simply passes over
 * the objects it does not fit.
 */
function SelectionBar({
  count,
  onColor,
  onTone,
  onDelete,
  onDone,
}: {
  count: number
  onColor: (color: string) => void
  onTone: (tone: (typeof NOTE_TONES)[number]) => void
  onDelete: () => void
  onDone: () => void
}) {
  const t = useT()
  return (
    <div
      role="toolbar"
      aria-label={t('Selected marks')}
      className="absolute inset-x-0 bottom-4 z-30 mx-auto flex w-fit max-w-[calc(100%-1.5rem)] flex-wrap items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 shadow-raised"
    >
      <span className="tnum text-[12px] font-semibold text-ink">{count} {t('selected')}</span>
      <span className="h-5 w-px bg-line" aria-hidden />
      {INK_COLORS.slice(0, 6).map((swatch) => (
        <button
          key={swatch}
          type="button"
          onClick={() => onColor(swatch)}
          aria-label={`${t('Recolour')} ${swatch}`}
          className="size-8 rounded-full border border-line-2 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          style={{ backgroundColor: swatch }}
        />
      ))}
      <span className="h-5 w-px bg-line" aria-hidden />
      {NOTE_TONES.slice(1, 6).map((tone) => (
        <button
          key={tone}
          type="button"
          onClick={() => onTone(tone)}
          aria-label={`${t('Recolour')} ${t(tone)}`}
          className={cn('size-8 rounded-md border border-line-2 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]', TONE_SWATCH[tone])}
        />
      ))}
      <span className="h-5 w-px bg-line" aria-hidden />
      <Button variant="ghost" size="sm" onClick={onDelete}>{t('Delete')}</Button>
      <Button variant="ghost" size="sm" onClick={onDone}>{t('Done')}</Button>
    </div>
  )
}

function needsSelectionBox(onPage: readonly AnnotationObject[]): boolean {
  return onPage.length > 1 || onPage.some(isInk)
}

function scaleFor(mode: FitMode, sizes: { width: number; height: number }[], viewport: { width: number; height: number }): number {
  const width = fitScale(sizes, viewport.width)
  if (mode === 'width') return clampScale(width)
  if (mode === 'closer') return clampScale(width * CLOSER_FACTOR)
  const tallest = sizes.reduce((max, size) => Math.max(max, size.height), 0)
  const page = tallest && viewport.height ? (viewport.height - 48) / tallest : width
  return clampScale(Math.min(width, page))
}
