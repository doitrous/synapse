import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { X } from 'lucide-react'
import { objectivesOf, openingObjective, structuresAt, type HistologySlide, type Objective } from '@/data/histology'
import { resolveMediaSource } from '@/lib/mediaStorage'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import { IconButton } from '@/components/ui/IconButton'
import { Badge } from '@/components/ui/Badge'
import { Toggle } from '@/components/ui/Toggle'

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

/**
 * The eyepiece: a circular field of view showing one objective of a slide,
 * with the slide's structures hidden behind pins until a student asks for
 * them. This is deliberately not a diagram — a slide that named everything up
 * front would test nothing.
 */
export function SlideViewer({ slide, onClose }: { slide: HistologySlide; onClose: () => void }) {
  const t = useT()
  const objectives = objectivesOf(slide)
  const [objective, setObjective] = useState<Objective | null>(() => openingObjective(slide))
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set())
  const [imageUrl, setImageUrl] = useState('')
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState('')

  // Undefined until the image has actually loaded once, so nothing is drawn
  // at a guessed size before its real proportions are known.
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | undefined>(undefined)
  // The field is a square, but it is also `w-full` up to a max width, so its
  // pixel size depends on the viewport — tracked live rather than assumed.
  const [fieldSize, setFieldSize] = useState(0)

  const fieldRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<Drag | null>(null)

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
        const scale = fieldSize / Math.min(naturalSize.w, naturalSize.h)
        return { width: naturalSize.w * scale, height: naturalSize.h * scale }
      })()
    : { width: fieldSize, height: fieldSize }

  // A different slide is a different instrument session — start it fresh,
  // opening where the student is meant to orient themselves.
  useEffect(() => {
    setObjective(openingObjective(slide))
    setRevealed(new Set())
  }, [slide])

  // Panning belongs to one field of view; switching power should not carry a
  // pan offset that no longer means anything on the new image.
  useEffect(() => {
    setPan({ x: 0, y: 0 })
  }, [objective])

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
    const limitX = Math.max(0, (display.width - fieldSize) / 2)
    const limitY = Math.max(0, (display.height - fieldSize) / 2)
    setPan({
      x: clamp(drag.originX + (event.clientX - drag.startX), limitX),
      y: clamp(drag.originY + (event.clientY - drag.startY), limitY),
    })
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    fieldRef.current?.releasePointerCapture(event.pointerId)
    dragRef.current = null
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-4 p-4">
      <div className="flex w-full items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate font-serif text-[19px] font-semibold text-ink">{slide.title}</h1>
          <p className="truncate text-[12.5px] text-ink-2">
            {slide.tissue} · {slide.stain}
          </p>
        </div>
        <IconButton icon={X} label={t('Close the slide viewer')} variant="surface" onClick={onClose} />
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
          'relative aspect-square w-full max-w-sm touch-none select-none overflow-hidden rounded-full border-[10px] border-ink bg-white shadow-panel',
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

      {objectives.length > 1 ? (
        <div className="flex items-center justify-center gap-2">
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

      {structures.length > 0 && (
        <div className="flex items-center gap-2">
          <Toggle checked={allRevealed} onChange={setAllRevealed} label={t('Reveal all structures')} />
          <span className="text-[12.5px] font-medium text-ink-2">{t('Reveal all')}</span>
        </div>
      )}

      {slide.description && <p className="text-center text-[13.5px] leading-relaxed text-ink-2">{slide.description}</p>}
    </div>
  )
}
