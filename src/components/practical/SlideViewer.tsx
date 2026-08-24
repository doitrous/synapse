import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { Info, Maximize2, Minimize2, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react'
import { objectivesOf, openingObjective, spriteCell, structuresAt, type HistologySlide, type Objective } from '@/data/histology'
import { resolveMediaSource } from '@/lib/mediaStorage'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import { IconButton } from '@/components/ui/IconButton'
import { Badge } from '@/components/ui/Badge'
import { Toggle } from '@/components/ui/Toggle'
import { Panel } from '@/components/ui/Panel'
import { microscopeTransitionStart, type MicroscopeTransitionRect } from './microscopeTransition'

const FOCUS_GRID = '/microscope/focus-grid-alpha.webp'
const FOCUS_COLUMNS = 12
const FOCUS_ROWS = 10
const FOCUS_FRAMES = FOCUS_COLUMNS * FOCUS_ROWS
const FOCUS_MS = 2000
const FOCUS_FADE_MS = 180

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
 * The eyepiece: a circular field of view showing one objective of a slide,
 * with the slide's structures hidden behind pins until a student asks for
 * them. This is deliberately not a diagram — a slide that named everything up
 * front would test nothing.
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

  // Undefined until the image has actually loaded once, so nothing is drawn
  // at a guessed size before its real proportions are known.
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | undefined>(undefined)
  // The field is a square, but it is also `w-full` up to a max width, so its
  // pixel size depends on the viewport — tracked live rather than assumed.
  const [fieldSize, setFieldSize] = useState(0)

  const fieldRef = useRef<HTMLDivElement>(null)
  const focusRef = useRef<HTMLDivElement>(null)
  const thumbnailRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<Drag | null>(null)
  const thumbnailDragRef = useRef<number | null>(null)

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
      setFocusVisible(false)
      return
    }

    const destination = field.getBoundingClientRect()
    if (destination.width <= 0 || destination.height <= 0) {
      setFocusVisible(false)
      return
    }

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (reduced || typeof layer.animate !== 'function') {
      setFocusVisible(false)
      return
    }

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
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / FOCUS_MS)
      showFrame(Math.round(progress * (FOCUS_FRAMES - 1)))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const movement = layer.animate(
      [{ transform: startTransform }, { transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)' }],
      { duration: FOCUS_MS, easing: 'cubic-bezier(0.2, 0, 0, 1)', fill: 'forwards' },
    )
    const iris = layer.animate(
      [{ borderRadius: '0.75rem' }, { borderRadius: '50%' }],
      { delay: FOCUS_MS * 0.72, duration: FOCUS_MS * 0.28, easing: 'ease-out', fill: 'forwards' },
    )
    const fade = layer.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { delay: FOCUS_MS - FOCUS_FADE_MS, duration: FOCUS_FADE_MS, easing: 'ease-out', fill: 'forwards' },
    )

    const finish = () => {
      if (!active) return
      showFrame(FOCUS_FRAMES - 1)
      setFocusVisible(false)
    }
    Promise.all([movement.finished, iris.finished, fade.finished]).then(finish).catch(() => undefined)
    // Browsers can throttle animation promises in a background tab. The
    // viewer still becomes usable when the elapsed time has passed.
    const fallback = window.setTimeout(finish, FOCUS_MS + 250)

    return () => {
      active = false
      cancelAnimationFrame(raf)
      window.clearTimeout(fallback)
      movement.cancel()
      iris.cancel()
      fade.cancel()
    }
  }, [transitionOrigin])

  useEffect(() => {
    const node = fieldRef.current
    if (!node) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setFieldSize(width)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // The image scaled to *cover* the field, computed directly from its real
  // pixel dimensions rather than via `object-fit: cover` on a fixed box.
  // `object-fit` would show the same crop but by clipping it inside a
  // same-sized box — a pin near that clipped edge would have no box left to
  // pan into. Sizing the box itself to the true covering dimensions keeps
  // every pin fraction (0 to 1 across "the image") reachable.
  const display = naturalSize
    ? (() => {
        const scale = fieldSize / Math.min(naturalSize.w, naturalSize.h) * zoom
        return { width: naturalSize.w * scale, height: naturalSize.h * scale }
      })()
    : { width: fieldSize, height: fieldSize }

  const limits = useMemo(
    () => ({
      x: Math.max(0, (display.width - fieldSize) / 2),
      y: Math.max(0, (display.height - fieldSize) / 2),
    }),
    [display.height, display.width, fieldSize],
  )

  const viewport = useMemo(() => {
    if (!fieldSize || !display.width || !display.height) return { left: 0, top: 0, width: 1, height: 1 }
    const width = Math.min(1, fieldSize / display.width)
    const height = Math.min(1, fieldSize / display.height)
    return {
      left: clamp01(0.5 - width / 2 - pan.x / display.width),
      top: clamp01(0.5 - height / 2 - pan.y / display.height),
      width,
      height,
    }
  }, [display.height, display.width, fieldSize, pan.x, pan.y])

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
    setPan({ x: 0, y: 0 })
    setZoom(1)
  }

  function stepZoom(next: number) {
    setZoom(Math.min(2.5, Math.max(0.75, next)))
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

  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-4xl flex-col items-center gap-4 p-4',
        maximized && 'fixed inset-0 z-50 overflow-auto bg-canvas px-4 py-5 sm:px-6',
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
            willChange: 'transform, opacity',
          }}
        />
      )}
      <div className="flex w-full flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate font-serif text-[19px] font-semibold text-ink">{slide.title}</h1>
          <p className="truncate text-[12.5px] text-ink-2">
            {slide.tissue} · {slide.stain}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <IconButton
            icon={Info}
            label={aboutOpen ? t('Hide slide details') : t('About this tissue')}
            variant={aboutOpen ? 'primary' : 'surface'}
            onClick={() => setAboutOpen((open) => !open)}
          />
          <IconButton
            icon={maximized ? Minimize2 : Maximize2}
            label={maximized ? t('Restore the slide viewer') : t('Maximize the slide viewer')}
            variant="surface"
            onClick={() => setMaximized((next) => !next)}
          />
          <IconButton icon={X} label={t('Close the slide viewer')} variant="surface" onClick={onClose} />
        </div>
      </div>

      <div
        ref={fieldRef}
        role="group"
        aria-label={t('Field of view')}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          // A white ground and a dark rim in CSS, not an image, so the field
          // scales with its container and the rim can take the theme. The
          // white stays literal rather than following the surface token — it
          // is the same eyepiece the push-in animation ends on, and that frame
          // does not change with light or dark mode.
          'relative aspect-square w-full touch-none select-none overflow-hidden rounded-full border-[10px] border-ink bg-white shadow-panel',
          maximized ? 'max-w-[min(80vh,42rem)]' : 'max-w-sm',
          !imageLoading && !imageError && currentView && 'cursor-grab active:cursor-grabbing',
        )}
      >
        {imageLoading && <p className="absolute inset-0 grid place-items-center px-8 text-center text-[12px] text-ink-3">{t('Loading…')}</p>}
        {!imageLoading && imageError && (
          <p role="alert" className="absolute inset-0 grid place-items-center px-8 text-center text-[12px] text-danger">
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
                          // circular field is a fact about the image, not
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

      <Panel className="w-full max-w-xl p-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {objectives.length > 1 ? (
            <div className="flex items-center gap-1.5" role="group" aria-label={t('Objectives')}>
              {objectives.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setObjective(entry)}
                  aria-pressed={entry === objective}
                  className={cn(
                    'inline-flex h-10 min-w-11 items-center justify-center rounded-full border px-3 text-[13px] font-semibold tabular-nums transition-colors sm:h-8',
                    entry === objective
                      ? 'border-primary-line bg-primary-tint text-primary-strong'
                      : 'border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink',
                  )}
                >
                  {entry}×
                </button>
              ))}
            </div>
          ) : (
            // One objective is not a choice, so it is shown as a fact about the
            // slide rather than a lone button that looks like it should do
            // something when pressed.
            objective !== null && <Badge tone="outline">{objective}×</Badge>
          )}

          <div className="flex items-center gap-1.5" role="group" aria-label={t('Zoom controls')}>
            <IconButton icon={ZoomOut} label={t('Zoom out')} size="sm" variant="surface" disabled={zoom <= 0.75} onClick={() => stepZoom(zoom - 0.25)} />
            <span className="tnum min-w-12 text-center font-mono text-[12px] font-semibold text-ink-2">{zoomLabel}</span>
            <IconButton icon={ZoomIn} label={t('Zoom in')} size="sm" variant="surface" disabled={zoom >= 2.5} onClick={() => stepZoom(zoom + 0.25)} />
            <IconButton icon={RotateCcw} label={t('Reset view')} size="sm" variant="surface" onClick={resetView} />
          </div>
        </div>
      </Panel>

      {!imageLoading && !imageError && currentView && (
        <div className="w-full max-w-xl">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">{t('Full-slide thumbnail')}</p>
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
            className="relative mx-auto h-24 w-full max-w-[12rem] touch-none overflow-hidden rounded-xl border border-line bg-surface-2 shadow-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            <img src={imageUrl} alt="" draggable={false} className="size-full object-cover opacity-90" />
            <span
              aria-hidden
              className="absolute rounded-md border-2 border-primary bg-primary/15 shadow-[0_0_0_999px_rgba(0,0,0,0.2)]"
              style={{
                left: `${viewport.left * 100}%`,
                top: `${viewport.top * 100}%`,
                width: `${viewport.width * 100}%`,
                height: `${viewport.height * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {structures.length > 0 && (
        <div className="flex items-center gap-2">
          <Toggle checked={allRevealed} onChange={setAllRevealed} label={t('Reveal all structures')} />
          <span className="text-[12.5px] font-medium text-ink-2">{t('Reveal all')}</span>
        </div>
      )}

      {aboutOpen && (
        <Panel className="w-full max-w-xl p-4">
          <h2 className="font-serif text-[16px] font-semibold text-ink">{t('About this tissue')}</h2>
          <dl className="mt-3 grid gap-2 text-[13px] sm:grid-cols-2">
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
          {slide.description && <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">{slide.description}</p>}
        </Panel>
      )}

      {!aboutOpen && slide.description && <p className="text-center text-[13.5px] leading-relaxed text-ink-2">{slide.description}</p>}
    </div>
  )
}
