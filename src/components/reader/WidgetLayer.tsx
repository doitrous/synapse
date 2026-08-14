import { useEffect, useRef, useState } from 'react'
import { Eye } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { isBoxed, type AnnotationObject, type NoteTone, type PageMetrics, type Rect } from '@/lib/reader/annotations'

/**
 * Sticky notes, text boxes and tape — the parts that are text, not geometry.
 *
 * These live in the DOM rather than on the ink canvas because they need what
 * only the DOM has: a caret, IME, spellcheck, focus, screen-reader semantics,
 * and right-to-left layout. This app ships Arabic, so that last one is not
 * optional.
 *
 * Tones are theme tokens, not literal colour: a note has to stay readable on
 * porcelain and on charcoal alike. Ink goes the other way — see the toolbar.
 */

const TONE_CLASS: Record<NoteTone, string> = {
  paper: 'bg-surface-2 border-line-2',
  teal: 'bg-[color-mix(in_srgb,#2f7d6b_16%,var(--color-surface))] border-[color-mix(in_srgb,#2f7d6b_34%,var(--color-line))]',
  amber: 'bg-[color-mix(in_srgb,#c2691c_16%,var(--color-surface))] border-[color-mix(in_srgb,#c2691c_34%,var(--color-line))]',
  rose: 'bg-[color-mix(in_srgb,#b03a76_14%,var(--color-surface))] border-[color-mix(in_srgb,#b03a76_32%,var(--color-line))]',
  sage: 'bg-[color-mix(in_srgb,#4f8f3a_15%,var(--color-surface))] border-[color-mix(in_srgb,#4f8f3a_32%,var(--color-line))]',
  slate: 'bg-[color-mix(in_srgb,#5b6570_15%,var(--color-surface))] border-[color-mix(in_srgb,#5b6570_34%,var(--color-line))]',
  sand: 'bg-[color-mix(in_srgb,#8a6d3b_15%,var(--color-surface))] border-[color-mix(in_srgb,#8a6d3b_32%,var(--color-line))]',
  clay: 'bg-accent-tint border-accent-line',
}

/** Tape is opaque by design: it has to actually hide what is under it. */
const TAPE_CLASS: Record<NoteTone, string> = {
  paper: 'bg-inset',
  teal: 'bg-[#2f7d6b]',
  amber: 'bg-[#c2691c]',
  rose: 'bg-[#b03a76]',
  sage: 'bg-[#4f8f3a]',
  slate: 'bg-[#5b6570]',
  sand: 'bg-[#8a6d3b]',
  clay: 'bg-accent',
}

export function WidgetLayer({
  objects,
  metrics,
  scale,
  interactive,
  selected,
  onChangeText,
  onSelect,
  onMove,
  onGestureEnd,
}: {
  objects: AnnotationObject[]
  metrics: PageMetrics
  scale: number
  /** False while an ink tool owns the pointer. */
  interactive: boolean
  selected: ReadonlySet<string>
  onChangeText: (id: string, text: string) => void
  onSelect: (id: string, additive: boolean) => void
  onMove: (id: string, dx: number, dy: number) => void
  /** A drag or an edit finished — the next one is a separate Undo step. */
  onGestureEnd: () => void
}) {
  const divisor = metrics.width * scale
  const px = (value: number) => value * divisor

  return (
    // The layer itself never takes the pointer; each widget claims it, and only
    // when a tool is not already holding it.
    <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
      {objects.filter(isBoxed).map((object) => (
        <Widget
          key={object.id}
          object={object}
          px={px}
          divisor={divisor}
          interactive={interactive}
          selected={selected.has(object.id)}
          onChangeText={onChangeText}
          onSelect={onSelect}
          onMove={onMove}
          onGestureEnd={onGestureEnd}
        />
      ))}
    </div>
  )
}

function Widget({
  object,
  px,
  divisor,
  interactive,
  selected,
  onChangeText,
  onSelect,
  onMove,
  onGestureEnd,
}: {
  object: Extract<AnnotationObject, { r: Rect }>
  px: (value: number) => number
  divisor: number
  interactive: boolean
  selected: boolean
  onChangeText: (id: string, text: string) => void
  onSelect: (id: string, additive: boolean) => void
  onMove: (id: string, dx: number, dy: number) => void
  onGestureEnd: () => void
}) {
  const t = useT()
  const [peeled, setPeeled] = useState(false)
  const [editing, setEditing] = useState(false)
  const drag = useRef<{ x: number; y: number } | null>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { if (editing) textRef.current?.focus() }, [editing])

  const style = {
    left: px(object.r[0]),
    top: px(object.r[1]),
    width: px(object.r[2] - object.r[0]),
    height: px(object.r[3] - object.r[1]),
    pointerEvents: interactive ? ('auto' as const) : ('none' as const),
  }

  const onPointerDown = (event: React.PointerEvent) => {
    if (!interactive || editing) return
    event.stopPropagation()
    onSelect(object.id, event.shiftKey)
    drag.current = { x: event.clientX, y: event.clientY }
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: React.PointerEvent) => {
    if (!drag.current) return
    const dx = (event.clientX - drag.current.x) / divisor
    const dy = (event.clientY - drag.current.y) / divisor
    drag.current = { x: event.clientX, y: event.clientY }
    onMove(object.id, dx, dy)
  }

  const endDrag = (event: React.PointerEvent) => {
    if (!drag.current) return
    drag.current = null
    ;(event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId)
    onGestureEnd()
  }

  if (object.kind === 'tape') {
    return (
      <button
        type="button"
        aria-pressed={peeled}
        aria-label={peeled ? t('Cover this again') : t('Reveal what is under the tape')}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClick={() => setPeeled((current) => !current)}
        className={cn(
          'absolute rounded-[3px] transition-opacity duration-200 motion-reduce:transition-none',
          TAPE_CLASS[object.tone],
          peeled ? 'opacity-15' : 'opacity-100',
          selected && 'ring-2 ring-accent ring-offset-1',
        )}
        style={style}
      >
        {peeled && <Icon icon={Eye} size={12} className="absolute end-1 top-1 text-paper/70" />}
      </button>
    )
  }

  const isNote = object.kind === 'note'
  return (
    <div
      className={cn(
        'absolute overflow-hidden rounded-lg border text-start shadow-panel',
        isNote ? TONE_CLASS[object.tone] : 'border-transparent bg-transparent shadow-none',
        selected && 'ring-2 ring-accent',
        interactive && !editing && 'cursor-move',
      )}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onDoubleClick={() => interactive && setEditing(true)}
    >
      {editing ? (
        <textarea
          ref={textRef}
          value={object.text}
          onChange={(event) => onChangeText(object.id, event.target.value)}
          onBlur={() => { setEditing(false); onGestureEnd() }}
          className="size-full resize-none bg-transparent p-2 text-[12px] leading-snug text-ink outline-none"
          style={object.kind === 'textbox' ? { color: object.color, fontSize: Math.max(9, px(object.size)) } : undefined}
        />
      ) : (
        <p
          className="size-full overflow-hidden whitespace-pre-wrap p-2 text-[12px] leading-snug text-ink"
          style={object.kind === 'textbox' ? { color: object.color, fontSize: Math.max(9, px(object.size)) } : undefined}
        >
          {object.text || <span className="text-ink-3">{t('Double-click to write')}</span>}
        </p>
      )}
    </div>
  )
}
