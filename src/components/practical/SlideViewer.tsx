import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { Info, Maximize2, Minimize2, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react'
import { objectivesOf, openingObjective, spriteCell, structuresAt, type HistologySlide, type Objective } from '@/data/histology'
import { resolveMediaSource } from '@/lib/mediaStorage'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import { IconButton } from '@/components/ui/IconButton'
import { Badge } from '@/components/ui/Badge'
import { Toggle } from '@/components/ui/Toggle'
import { Panel } from '@/components/ui/Panel'
import { centeredSquareTransitionRect, microscopeTransitionStart, type MicroscopeTransitionRect } from './microscopeTransition'

const FOCUS_GRID = '/microscope/focus-grid-alpha.webp'
const FOCUS_COLUMNS = 12
const FOCUS_ROWS = 10
const FOCUS_FRAMES = FOCUS_COLUMNS * FOCUS_ROWS
const FOCUS_MS = 2000
const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.25

interface Drag {
  pointerId: number
  startX: number
  startY: number
  originX: number
  originY: number
}

function clamp(value: number, limit: number): number {
  return Math.min(limit, Math.max(-limit, value))
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

/**
 * A rectangular virtual-microscope stage showing one objective of a slide,
 * with structures hidden behind pins until a student asks for them. This is
 * deliberately not a diagram — a slide that named everything up front would
 * test nothing.
 */
export function SlideViewer({
  slide,
  onClose,
  transitionOrigin,
}: {
  slide: HistologySlide
  onClose: () => void
  transitionOrigin?: MicroscopeTransitionRect
}) {
  const t = useT()
  const objectives = objectivesOf(slide)
  const [objective, setObjective] = useState<Objective | null>(() => openingObjective(slide))
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set())
  const [imageUrl, setImageUrl] = useState('')
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState('')
  const [zoom, setZoom] = useState(1)
  const [maximized, setMaximized] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [focusVisible, setFocusVisible] = useState(Boolean(transitionOrigin))
  const [slideVisible, setSlideVisible] = useState(!transitionOrigin)

  // Undefined until the image has actually loaded once, so nothing is drawn
  // at a guessed size before its real proportions are known.
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | undefined>(undefined)
  // The optical stage is responsive and rectangular, so both axes are measured
  // rather than inferring height from a square width.
  const [fieldSize, setFieldSize] = useState({ width: 0, height: 0 })

  const fieldRef = useRef<HTMLDivElement>(null)
  const focusRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const thumbnailRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<Drag | null>(null)
  const thumbnailDragRef = useRef<number | null>(null)
  const viewRef = useRef({
    zoom: 1,
    pan: { x: 0, y: 0 },
    fieldSize: { width: 0, height: 0 },
    naturalSize: undefined as { w: number; h: number } | undefined,
  })
  const wheelReadyRef = useRef(false)
  const zoomAtRef = useRef<(nextValue: number, anchor?: { x: number; y: number }) => void>(() => undefined)

  // Native wheel bursts can arrive faster than React commits a render. Keep
  // the latest optical state synchronously as well as in React state so every
  // trackpad delta builds on the one immediately before it.
  viewRef.current = { zoom, pan, fieldSize, naturalSize }

  /**
   * The destination is measured from the real field after layout. The moving
   * layer is then laid out at that exact rectangle and transformed back over
   * the bench microscope. Returning to `transform: none` therefore cannot
   * finish above, below, or beside the field it reveals.
   *
   * The transition sprite has a real alpha channel keyed from its white studio
   * ground, so only the instrument moves across the page — never its source
   * video's rectangular backdrop.
   */
  useLayoutEffect(() => {
    const layer = focusRef.current
    const field = fieldRef.current
    if (!transitionOrigin || !layer || !field) {
      setSlideVisible(true)
      setFocusVisible(false)
      return
    }

    const fieldRect = field.getBoundingClientRect()
    if (fieldRect.width <= 0 || fieldRect.height <= 0) {
      setSlideVisible(true)
      setFocusVisible(false)
      return
    }

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (reduced || typeof layer.animate !== 'function') {
      setSlideVisible(true)
      setFocusVisible(false)
      return
    }

    // Sprite cells are square. Centre a square transition target over the
    // rectangular stage so the microscope never stretches as it arrives.
    const destination = centeredSquareTransitionRect(fieldRect)
    const start = microscopeTransitionStart(transitionOrigin, destination)
    const startTransform = `translate3d(${start.x}px, ${start.y}px, 0) scale3d(${start.scaleX}, ${start.scaleY}, 1)`

    Object.assign(layer.style, {
      left: `${destination.left}px`,
      top: `${destination.top}px`,
      width: `${destination.width}px`,
      height: `${destination.height}px`,
      transform: startTransform,
      visibility: 'visible',
    })

    const showFrame = (index: number) => {
      const cell = spriteCell(index, FOCUS_COLUMNS, FOCUS_ROWS)
      layer.style.backgroundPosition = `${cell.x}% ${cell.y}%`
    }

    showFrame(0)
    const started = performance.now()
    let raf = 0
    let active = true
    let revealed = false
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / FOCUS_MS)
      const frame = Math.round(progress * (FOCUS_FRAMES - 1))
      showFrame(frame)
      if (!revealed && frame === FOCUS_FRAMES - 1) {
        // Mount the tissue in the same paint as the final keyed frame. The
        // alpha-keyed instrument remains above it until the movement finishes,
        // so there is no blank frame or circular intermediary.
        revealed = true
        setSlideVisible(true)
      }
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const movement = layer.animate(
      [{ transform: startTransform }, { transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)' }],
      { duration: FOCUS_MS, easing: 'cubic-bezier(0.2, 0, 0, 1)', fill: 'forwards' },
    )
    const finish = () => {
      if (!active) return
      showFrame(FOCUS_FRAMES - 1)
      setSlideVisible(true)
      setFocusVisible(false)
    }
    movement.finished.then(finish).catch(() => undefined)
    // Browsers can throttle animation promises in a background tab. The
    // viewer still becomes usable when the elapsed time has passed.
    const fallback = window.setTimeout(finish, FOCUS_MS + 250)

    return () => {
      active = false
      cancelAnimationFrame(raf)
      window.clearTimeout(fallback)
      movement.cancel()
    }
  }, [transitionOrigin])

  useEffect(() => {
    const node = fieldRef.current
    if (!node) return
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect
      if (rect?.width && rect.height) setFieldSize({ width: rect.width, height: rect.height })
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [maximized])

  useEffect(() => {
    const node = fieldRef.current
    if (!node) return
    const onNativeWheel = (event: globalThis.WheelEvent) => {
      if (!wheelReadyRef.current) return
      event.preventDefault()
      const rect = node.getBoundingClientRect()
      const anchor = {
        x: event.clientX - rect.left - rect.width / 2,
        y: event.clientY - rect.top - rect.height / 2,
      }
      const pixels = event.deltaMode === 1
        ? event.deltaY * 16
        : event.deltaMode === 2
          ? event.deltaY * rect.height
          : event.deltaY
      zoomAtRef.current(viewRef.current.zoom * Math.exp(-pixels * 0.0015), anchor)
    }
    // React delegates wheel events passively. A native non-passive listener is
    // required so zooming over the stage never scrolls the surrounding page.
    node.addEventListener('wheel', onNativeWheel, { passive: false })
    return () => node.removeEventListener('wheel', onNativeWheel)
  }, [maximized])

  useEffect(() => {
    if (!maximized) return
    const previousOverflow = document.body.style.overflow
    const viewer = viewerRef.current
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMaximized(false)
        return
      }
      if (event.key !== 'Tab' || !viewer) return
      const focusable = [...viewer.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )].filter((node) => !node.hasAttribute('hidden'))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    viewer?.querySelector<HTMLElement>('[data-slide-maximize]')?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>('[data-slide-maximize]')?.focus()
      })
    }
  }, [maximized])

  // The image scaled to *cover* the field, computed directly from its real
  // pixel dimensions rather than via `object-fit: cover` on a fixed box.
  // `object-fit` would show the same crop but by clipping it inside a
  // same-sized box — a pin near that clipped edge would have no box left to
  // pan into. Sizing the box itself to the true covering dimensions keeps
  // every pin fraction (0 to 1 across "the image") reachable.
  const display = naturalSize && fieldSize.width && fieldSize.height
    ? (() => {
        const scale = Math.max(fieldSize.width / naturalSize.w, fieldSize.height / naturalSize.h) * zoom
        return { width: naturalSize.w * scale, height: naturalSize.h * scale }
      })()
    : { width: fieldSize.width, height: fieldSize.height }

  const limits = useMemo(
    () => ({
      x: Math.max(0, (display.width - fieldSize.width) / 2),
      y: Math.max(0, (display.height - fieldSize.height) / 2),
    }),
    [display.height, display.width, fieldSize.height, fieldSize.width],
  )

  const viewport = useMemo(() => {
    if (!fieldSize.width || !fieldSize.height || !display.width || !display.height) return { left: 0, top: 0, width: 1, height: 1 }
    const width = Math.min(1, fieldSize.width / display.width)
    const height = Math.min(1, fieldSize.height / display.height)
    return {
      left: clamp01(0.5 - width / 2 - pan.x / display.width),
      top: clamp01(0.5 - height / 2 - pan.y / display.height),
      width,
      height,
    }
  }, [display.height, display.width, fieldSize.height, fieldSize.width, pan.x, pan.y])

  // A different slide is a different instrument session — start it fresh,
  // opening where the student is meant to orient themselves.
  useEffect(() => {
    setObjective(openingObjective(slide))
    setRevealed(new Set())
    setZoom(1)
    setAboutOpen(false)
  }, [slide])

  // Panning belongs to one field of view; switching power should not carry a
  // pan offset that no longer means anything on the new image.
  useEffect(() => {
    setPan({ x: 0, y: 0 })
    setZoom(1)
  }, [objective])

  useEffect(() => {
    setPan((current) => ({ x: clamp(current.x, limits.x), y: clamp(current.y, limits.y) }))
  }, [limits.x, limits.y])

  const currentView = objective === null ? undefined : slide.views.find((view) => view.objective === objective)
  wheelReadyRef.current = Boolean(currentView && !imageLoading && !imageError)

  useEffect(() => {
    setNaturalSize(undefined)
    if (!currentView) {
      setImageUrl('')
      setImageLoading(false)
      return
    }
    let active = true
    let resolvedUrl = ''
    let shouldRevoke = false
    setImageLoading(true)
    setImageError('')
    resolveMediaSource(currentView.image)
      .then((resolved) => {
        // The objective may have moved on while this was in flight. Applying a
        // stale URL here would show the wrong field; skipping the revoke would
        // leak the blob it just created.
        if (!active) {
          if (resolved.revoke) URL.revokeObjectURL(resolved.url)
          return
        }
        resolvedUrl = resolved.url
        shouldRevoke = resolved.revoke
        setImageUrl(resolved.url)
        setImageLoading(false)
      })
      .catch((reason: unknown) => {
        if (!active) return
        setImageLoading(false)
        setImageError(reason instanceof Error ? reason.message : t('This image could not be loaded.'))
      })
    return () => {
      active = false
      if (shouldRevoke && resolvedUrl) URL.revokeObjectURL(resolvedUrl)
    }
    // `currentView.image` is the only thing that should re-trigger a fetch —
    // depending on the view object itself would refetch on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentView?.image, t])

  const structures = objective === null ? [] : structuresAt(slide, objective)
  const allRevealed = structures.length > 0 && structures.every((structure) => revealed.has(structure.id))

  function togglePin(id: string) {
    setRevealed((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function setAllRevealed(next: boolean) {
    setRevealed((current) => {
      const updated = new Set(current)
      for (const structure of structures) {
        if (next) updated.add(structure.id)
        else updated.delete(structure.id)
      }
      return updated
    })
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return
    // A tap on a pin must reach the pin's own click handler, not start a drag
    // that steals the pointer out from under it.
    if ((event.target as HTMLElement).closest('button')) return
    const field = fieldRef.current
    if (!field) return
    field.setPointerCapture(event.pointerId)
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, originX: pan.x, originY: pan.y }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    // Half of however much the covering image overflows the field on each
    // axis — zero when it happens to fit exactly, so there is nothing to
    // drag toward.
    setPan({
      x: clamp(drag.originX + (event.clientX - drag.startX), limits.x),
      y: clamp(drag.originY + (event.clientY - drag.startY), limits.y),
    })
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    fieldRef.current?.releasePointerCapture(event.pointerId)
    dragRef.current = null
  }

  function updatePanFromThumbnail(clientX: number, clientY: number) {
    const thumbnail = thumbnailRef.current
    if (!thumbnail || display.width <= 0 || display.height <= 0) return
    const rect = thumbnail.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return
    const x = clamp01((clientX - rect.left) / rect.width)
    const y = clamp01((clientY - rect.top) / rect.height)
    setPan({
      x: clamp((0.5 - x) * display.width, limits.x),
      y: clamp((0.5 - y) * display.height, limits.y),
    })
  }

  function onThumbnailPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return
    thumbnailDragRef.current = event.pointerId
    event.currentTarget.setPointerCapture(event.pointerId)
    updatePanFromThumbnail(event.clientX, event.clientY)
  }

  function onThumbnailPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (thumbnailDragRef.current !== event.pointerId) return
    updatePanFromThumbnail(event.clientX, event.clientY)
  }

  function endThumbnailDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (thumbnailDragRef.current !== event.pointerId) return
    event.currentTarget.releasePointerCapture(event.pointerId)
    thumbnailDragRef.current = null
  }

  function resetView() {
    viewRef.current = { ...viewRef.current, zoom: 1, pan: { x: 0, y: 0 } }
    setPan({ x: 0, y: 0 })
    setZoom(1)
  }

  function setZoomAt(nextValue: number, anchor = { x: 0, y: 0 }) {
    const current = viewRef.current
    const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextValue))
    if (next === current.zoom) return
    const ratio = next / current.zoom
    const baseScale = current.naturalSize && current.fieldSize.width && current.fieldSize.height
      ? Math.max(current.fieldSize.width / current.naturalSize.w, current.fieldSize.height / current.naturalSize.h)
      : 1
    const currentDisplay = current.naturalSize
      ? { width: current.naturalSize.w * baseScale * current.zoom, height: current.naturalSize.h * baseScale * current.zoom }
      : { width: current.fieldSize.width, height: current.fieldSize.height }
    const nextDisplay = { width: currentDisplay.width * ratio, height: currentDisplay.height * ratio }
    const nextLimits = {
      x: Math.max(0, (nextDisplay.width - current.fieldSize.width) / 2),
      y: Math.max(0, (nextDisplay.height - current.fieldSize.height) / 2),
    }
    const nextPan = {
      x: clamp(anchor.x - (anchor.x - current.pan.x) * ratio, nextLimits.x),
      y: clamp(anchor.y - (anchor.y - current.pan.y) * ratio, nextLimits.y),
    }
    viewRef.current = { ...current, zoom: next, pan: nextPan }
    setPan(nextPan)
    setZoom(next)
  }
  zoomAtRef.current = setZoomAt

  function onFieldKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return
    const moves: Record<string, [number, number]> = {
      ArrowUp: [0, 32],
      ArrowDown: [0, -32],
      ArrowLeft: [32, 0],
      ArrowRight: [-32, 0],
    }
    const move = moves[event.key]
    if (move) {
      event.preventDefault()
      setPan((current) => ({ x: clamp(current.x + move[0], limits.x), y: clamp(current.y + move[1], limits.y) }))
      return
    }
    if (event.key === '+' || event.key === '=') {
      event.preventDefault()
      setZoomAt(zoom + ZOOM_STEP)
    } else if (event.key === '-') {
      event.preventDefault()
      setZoomAt(zoom - ZOOM_STEP)
    } else if (event.key === '0') {
      event.preventDefault()
      resetView()
    }
  }

  function onThumbnailKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, [number, number]> = {
      ArrowUp: [0, 24],
      ArrowDown: [0, -24],
      ArrowLeft: [24, 0],
      ArrowRight: [-24, 0],
    }
    const move = moves[event.key]
    if (!move) return
    event.preventDefault()
    setPan((current) => ({ x: clamp(current.x + move[0], limits.x), y: clamp(current.y + move[1], limits.y) }))
  }

  const zoomLabel = `${Math.round(zoom * 100)}%`
  const thumbnailAspect = naturalSize ? `${naturalSize.w} / ${naturalSize.h}` : '8 / 5'

  const viewer = (
    <div
      ref={viewerRef}
      role={maximized ? 'dialog' : undefined}
      aria-modal={maximized || undefined}
      aria-label={maximized ? t('Maximized slide viewer') : undefined}
      className={cn(
        'mx-auto flex w-full flex-col items-center gap-3 p-4',
        maximized
          ? 'fixed inset-0 z-[100] m-0 h-dvh max-w-none overflow-y-auto bg-paper px-3 py-3 sm:px-5'
          : 'max-w-6xl',
      )}
    >
      {focusVisible && (
        <div
          ref={focusRef}
          role="img"
          aria-label={t('Focusing on the slide')}
          className="pointer-events-none fixed z-40 invisible bg-no-repeat"
          style={{
            backgroundImage: `url(${FOCUS_GRID})`,
            backgroundSize: `${FOCUS_COLUMNS * 100}% ${FOCUS_ROWS * 100}%`,
            transformOrigin: 'center',
            willChange: 'transform',
          }}
        />
      )}
      <div
        aria-hidden={!slideVisible || undefined}
        inert={!slideVisible ? true : undefined}
        className={cn(
          'w-full',
          slideVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className={cn('grid w-full gap-3', maximized ? 'xl:grid-cols-[minmax(0,1fr)_17rem]' : 'lg:grid-cols-[minmax(0,1fr)_15rem]')}>
          <section className="min-w-0 overflow-hidden rounded-xl border border-[#303845] bg-[#11151c] shadow-pop" aria-label={t('Virtual microscope')}>
            <header className="flex min-h-16 flex-wrap items-center gap-3 border-b border-white/10 px-3 py-2.5 sm:px-4">
              <span className="hidden size-8 shrink-0 place-items-center rounded-md border border-white/10 bg-white/5 text-white/70 sm:grid" aria-hidden>
                <span className="size-2 rounded-full bg-primary" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-serif text-[17px] font-semibold text-white sm:text-[19px]">{slide.title}</h2>
                <p className="truncate text-[11.5px] text-white/55 sm:text-[12px]">{slide.tissue} · {slide.stain || t('Stain not specified')}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <IconButton
                  icon={Info}
                  label={aboutOpen ? t('Hide slide details') : t('About this tissue')}
                  className={cn('border-white/15 bg-white/5 text-white/75 hover:border-white/25 hover:bg-white/10 hover:text-white', aboutOpen && 'border-primary/60 bg-primary text-white')}
                  onClick={() => setAboutOpen((open) => !open)}
                />
                <IconButton
                  icon={maximized ? Minimize2 : Maximize2}
                  label={maximized ? t('Restore the slide viewer') : t('Maximize the slide viewer')}
                  className="border-white/15 bg-white/5 text-white/75 hover:border-white/25 hover:bg-white/10 hover:text-white"
                  data-slide-maximize
                  onClick={() => setMaximized((next) => !next)}
                />
                <IconButton icon={X} label={t('Close the slide viewer')} className="border-white/15 bg-white/5 text-white/75 hover:border-white/25 hover:bg-white/10 hover:text-white" onClick={onClose} />
              </div>
            </header>

            <div
              ref={fieldRef}
              role="group"
              tabIndex={0}
              aria-label={t('Interactive rectangular slide field. Drag or use arrow keys to pan. Use the mouse wheel, plus, or minus to zoom.')}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onKeyDown={onFieldKeyDown}
              className={cn(
                'relative aspect-[8/5] w-full touch-none select-none overflow-hidden bg-[#07090c] outline-none',
                'focus-visible:shadow-[inset_0_0_0_2px_var(--color-primary)]',
                maximized && 'mx-auto max-h-[calc(100dvh-9.5rem)] max-w-[calc((100dvh-9.5rem)*1.6)]',
                !imageLoading && !imageError && currentView && 'cursor-grab active:cursor-grabbing',
              )}
            >
              <div className="pointer-events-none absolute end-3 top-3 z-20 flex items-center gap-2" aria-hidden>
                <span className="rounded-md border border-white/15 bg-black/60 px-2 py-1 font-mono text-[10px] font-semibold tracking-[0.08em] text-white/85 shadow-control">
                  {objective === null ? '—' : `${objective}×`} OBJECTIVE
                </span>
                <span className="hidden rounded-md border border-white/15 bg-black/60 px-2 py-1 font-mono text-[10px] text-white/60 sm:inline">{zoomLabel}</span>
              </div>
              <div className="pointer-events-none absolute bottom-3 start-3 z-20 hidden items-center gap-2 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-[10.5px] text-white/60 sm:flex" aria-hidden>
                <span>{t('Drag to pan')}</span><span className="text-white/25">·</span><span>{t('Scroll to zoom')}</span>
              </div>
        {imageLoading && <p className="absolute inset-0 grid place-items-center px-8 text-center text-[12px] text-ink-3">{t('Loading…')}</p>}
        {!imageLoading && imageError && (
          <p role="alert" className="absolute inset-0 grid place-items-center px-8 text-center text-[12px] text-[#ffb4b9]">
            {imageError}
          </p>
        )}
        {!imageLoading && !imageError && !currentView && (
          <p className="absolute inset-0 grid place-items-center px-8 text-center text-[12px] text-ink-3">{t('This slide has no image yet.')}</p>
        )}
        {!imageLoading && !imageError && currentView && objective !== null && (
          <div className="absolute inset-0 grid place-items-center">
            <div
              className="relative shrink-0"
              style={{ width: display.width, height: display.height, transform: `translate(${pan.x}px, ${pan.y}px)` }}
            >
              <img
                src={imageUrl}
                alt=""
                draggable={false}
                onLoad={(event) => setNaturalSize({ w: event.currentTarget.naturalWidth, h: event.currentTarget.naturalHeight })}
                className="size-full object-cover"
              />
              {structures.map((structure) => {
                const point = structure.at[objective]
                // structuresAt already filtered to structures pinned at this
                // objective; this is just satisfying the optional-record type.
                if (!point) return null
                const isRevealed = revealed.has(structure.id)
                const onRight = point.x > 0.5
                const onBottom = point.y > 0.5
                return (
                  <div
                    key={structure.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={
                      {
                        // A pin marks a point on the image itself, not a side
                        // of the page — the image is never mirrored under
                        // `dir="rtl"`, so `insetInlineStart` would flip the
                        // pin to the wrong side of an unflipped picture.
                        // Checked against the RTL toggle before choosing
                        // `left` here.
                        left: `${point.x * 100}%`,
                        top: `${point.y * 100}%`,
                      } satisfies CSSProperties
                    }
                  >
                    <button
                      type="button"
                      onClick={() => togglePin(structure.id)}
                      aria-pressed={isRevealed}
                      aria-label={isRevealed ? structure.label : t('What is this?')}
                      className={cn(
                        'block size-3.5 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.35)] transition-transform',
                        isRevealed ? 'scale-110 bg-primary' : 'bg-ink/70 hover:scale-110',
                      )}
                    />
                    {isRevealed && (
                      <div
                        role="status"
                        className="absolute z-10 w-max max-w-[11rem] rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[11px] leading-snug text-ink shadow-panel"
                        style={{
                          // Same reasoning as the pin: which side has room to
                          // show the callout without it being clipped by the
                          // slide field is a fact about the image, not
                          // about reading direction, so this stays physical
                          // too.
                          ...(onRight ? { right: '100%', marginRight: '0.4rem' } : { left: '100%', marginLeft: '0.4rem' }),
                          ...(onBottom ? { bottom: 0 } : { top: 0 }),
                        }}
                      >
                        <p className="font-semibold text-ink">{structure.label}</p>
                        {structure.note && <p className="mt-0.5 text-ink-2">{structure.note}</p>}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-3 py-2.5 sm:px-4">
              <div className="flex min-w-0 items-center gap-1.5" role="group" aria-label={t('Objectives')}>
          {objectives.length > 1 ? (
                objectives.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setObjective(entry)}
                  aria-pressed={entry === objective}
                  className={cn(
                    'inline-flex h-11 min-w-11 items-center justify-center rounded-md border px-2.5 font-mono text-[12px] font-semibold tabular-nums transition-colors sm:h-9',
                    entry === objective
                      ? 'border-primary bg-primary text-white'
                      : 'border-white/15 bg-white/5 text-white/65 hover:border-white/25 hover:bg-white/10 hover:text-white',
                  )}
                >
                  {entry}×
                </button>
                ))
          ) : (
            // One objective is not a choice, so it is shown as a fact about the
            // slide rather than a lone button that looks like it should do
            // something when pressed.
                objective !== null && <span className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 font-mono text-[12px] font-semibold text-white/75">{objective}×</span>
          )}
              </div>

              <div className="flex items-center gap-1" role="group" aria-label={t('Zoom controls')}>
                <IconButton icon={ZoomOut} label={t('Zoom out')} size="sm" className="border-white/15 bg-white/5 text-white/70 hover:border-white/25 hover:bg-white/10 hover:text-white disabled:opacity-35" disabled={zoom <= MIN_ZOOM} onClick={() => setZoomAt(zoom - ZOOM_STEP)} />
                <span role="status" aria-live="polite" aria-atomic="true" className="tnum min-w-12 text-center font-mono text-[11px] font-semibold text-white/65">{zoomLabel}</span>
                <IconButton icon={ZoomIn} label={t('Zoom in')} size="sm" className="border-white/15 bg-white/5 text-white/70 hover:border-white/25 hover:bg-white/10 hover:text-white disabled:opacity-35" disabled={zoom >= MAX_ZOOM} onClick={() => setZoomAt(zoom + ZOOM_STEP)} />
                <IconButton icon={RotateCcw} label={t('Reset view')} size="sm" className="border-white/15 bg-white/5 text-white/70 hover:border-white/25 hover:bg-white/10 hover:text-white" onClick={resetView} />
              </div>
            </footer>
          </section>

          <aside className="grid min-w-0 content-start gap-3 sm:grid-cols-2 lg:grid-cols-1" aria-label={t('Slide tools and information')}>
            {!imageLoading && !imageError && currentView && (
              <Panel className="p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">{t('Slide navigator')}</p>
                  <span className="font-mono text-[10px] text-ink-3">{zoomLabel}</span>
                </div>
                <div
                  ref={thumbnailRef}
                  role="group"
                  tabIndex={0}
                  aria-label={t('Move the field of view on the full-slide thumbnail')}
                  onPointerDown={onThumbnailPointerDown}
                  onPointerMove={onThumbnailPointerMove}
                  onPointerUp={endThumbnailDrag}
                  onPointerCancel={endThumbnailDrag}
                  onKeyDown={onThumbnailKeyDown}
                  className="relative mx-auto w-full touch-none overflow-hidden rounded-lg border border-line-2 bg-inset shadow-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                  style={{ aspectRatio: thumbnailAspect }}
                >
                  <img src={imageUrl} alt="" draggable={false} className="size-full object-contain" />
                  <span
                    aria-hidden
                    className="absolute rounded-sm border-2 border-primary bg-primary/15 shadow-[0_0_0_999px_rgba(0,0,0,0.24)]"
                    style={{
                      left: `${viewport.left * 100}%`,
                      top: `${viewport.top * 100}%`,
                      width: `${viewport.width * 100}%`,
                      height: `${viewport.height * 100}%`,
                    }}
                  />
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-ink-3">{t('Click or drag the frame to move around the tissue.')}</p>
              </Panel>
            )}

            <Panel className="p-3.5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">{t('Tissue')}</p>
                  <h2 className="mt-0.5 font-serif text-[16px] font-semibold text-ink">{slide.tissue}</h2>
                </div>
                <Badge tone="outline">{slide.stain || t('No stain')}</Badge>
              </div>
              {aboutOpen && (
                <dl className="mt-3 grid gap-2 border-t border-line pt-3 text-[12.5px]">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">{t('Tissue')}</dt>
              <dd className="mt-0.5 text-ink">{slide.tissue}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">{t('Stain')}</dt>
              <dd className="mt-0.5 text-ink">{slide.stain || t('Not specified')}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">{t('Objectives')}</dt>
              <dd className="mt-0.5 text-ink">{objectives.map((entry) => `${entry}×`).join(' · ') || t('No image objectives')}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">{t('Pinned structures')}</dt>
              <dd className="mt-0.5 text-ink">{slide.structures.length}</dd>
            </div>
                </dl>
              )}
              {slide.description && <p className={cn('text-[12.5px] leading-relaxed text-ink-2', aboutOpen ? 'mt-3' : 'mt-2')}>{slide.description}</p>}
              {!aboutOpen && (
                <button type="button" className="mt-3 text-[12px] font-semibold text-primary-strong hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]" onClick={() => setAboutOpen(true)}>
                  {t('About this tissue')}
                </button>
              )}
            </Panel>

            {structures.length > 0 && (
              <Panel className="flex items-center gap-2 p-3.5 sm:col-span-2 lg:col-span-1">
                <Toggle checked={allRevealed} onChange={setAllRevealed} label={t('Reveal all structures')} />
                <div className="min-w-0">
                  <p className="text-[12.5px] font-medium text-ink">{t('Reveal all structures')}</p>
                  <p className="text-[10.5px] text-ink-3">{structures.length} {t('pins at this objective')}</p>
                </div>
              </Panel>
            )}
          </aside>
        </div>
      </div>
    </div>
  )

  return maximized && typeof document !== 'undefined' ? createPortal(viewer, document.body) : viewer
}
