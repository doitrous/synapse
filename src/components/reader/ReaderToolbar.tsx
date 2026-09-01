import { useEffect, useRef, useState } from 'react'
import {
  Eraser, GripVertical, Hand, Highlighter, Lasso, PenLine, Pointer, Redo2, Ruler,
  Shapes, SquareDashed, StickyNote, Timer, Type, Undo2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { useLocalChoice } from '@/lib/useLocalPreference'
import { NOTE_TONES, type NoteTone, type PenTool } from '@/lib/reader/annotations'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import type { EraserMode, LassoMode, Tool, ToolSettings } from './InkSurface'

/**
 * The tools, in a bar the student can put where they want.
 *
 * Collapsible and draggable, because a fixed bar covers the page on exactly the
 * document where it matters. Its position is stored as an edge and a ratio
 * rather than a pixel offset — a stored `x, y` puts the bar off-screen the
 * first time the window shrinks or the phone rotates.
 *
 * Ink colours are literal sRGB, not theme tokens: a red pen has to be red in
 * light, warm and dark alike. The bar around them is all tokens, so it belongs
 * to whichever theme the student is in.
 */

/**
 * Literal hex rather than tokens: a stroke's colour is written into the saved
 * annotation, so it has to survive a theme change and mean the same thing on
 * every device. Only the swatches offered here change with the rebrand —
 * strokes already on the page keep the colour they were drawn in.
 */
export const INK_COLORS = [
  '#161920', // the near-black this app uses for ink, never pure black
  '#5d636f',
  '#d13a63', // cortex crimson
  '#1553b3', // cortex blue
  '#c14a2e',
  '#9a6a1f',
  '#1f8a5a',
  '#1f6f8b',
  '#5145a8',
  '#8d4a72',
  '#a8121e',
  '#6d7688',
] as const

const PENS: { id: PenTool; label: string; hint: string }[] = [
  { id: 'ball', label: 'Ball pen', hint: 'An even line, whatever the speed.' },
  { id: 'fountain', label: 'Fountain pen', hint: 'Thins as the hand moves faster.' },
  { id: 'brush', label: 'Brush pen', hint: 'Follows pressure, where the device reports it.' },
  { id: 'pencil', label: 'Pencil', hint: 'Softer and lighter, for working notes.' },
]

const TOOLS: { id: Tool; icon: LucideIcon; label: string; key: string }[] = [
  { id: 'pan', icon: Hand, label: 'Move the page', key: 'V' },
  { id: 'lasso', icon: Lasso, label: 'Select', key: 'A' },
  { id: 'pen', icon: PenLine, label: 'Pen', key: 'P' },
  { id: 'highlighter', icon: Highlighter, label: 'Highlighter', key: 'H' },
  { id: 'shape', icon: Shapes, label: 'Shape', key: 'S' },
  { id: 'eraser', icon: Eraser, label: 'Eraser', key: 'E' },
  { id: 'note', icon: StickyNote, label: 'Sticky note', key: 'N' },
  { id: 'text', icon: Type, label: 'Text box', key: 'T' },
  { id: 'tape', icon: SquareDashed, label: 'Tape', key: 'K' },
  { id: 'laser', icon: Pointer, label: 'Laser pointer', key: 'L' },
]

const EDGES = ['left', 'right'] as const
type Edge = (typeof EDGES)[number]

export function ReaderToolbar({
  tool,
  onTool,
  settings,
  onSettings,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  rulerOn,
  onToggleRuler,
  timerOn,
  onToggleTimer,
}: {
  tool: Tool
  onTool: (next: Tool) => void
  settings: ToolSettings
  onSettings: (patch: Partial<ToolSettings>) => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  rulerOn: boolean
  onToggleRuler: () => void
  timerOn: boolean
  onToggleTimer: () => void
}) {
  const t = useT()
  const [edge, setEdge] = useLocalChoice<Edge>('nishany.reader.toolbarEdge', 'left', EDGES)
  const [offset, setOffset] = useState(0.18)
  const [open, setOpen] = useState(true)
  const dragging = useRef(false)
  const panel = usePopoverTrigger()

  useEffect(() => {
    const stored = Number(localStorage.getItem('nishany.reader.toolbarOffset'))
    if (Number.isFinite(stored) && stored > 0 && stored < 1) setOffset(stored)
  }, [])

  const onGripDown = (event: React.PointerEvent) => {
    dragging.current = true
    ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  }
  const onGripMove = (event: React.PointerEvent) => {
    if (!dragging.current) return
    setOffset(Math.min(0.75, Math.max(0.02, event.clientY / window.innerHeight)))
    setEdge(event.clientX < window.innerWidth / 2 ? 'left' : 'right')
  }
  const onGripUp = (event: React.PointerEvent) => {
    if (!dragging.current) return
    dragging.current = false
    ;(event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId)
    try { localStorage.setItem('nishany.reader.toolbarOffset', String(offset)) } catch { /* nothing to remember with */ }
  }

  const hasSettings = tool !== 'pan' && tool !== 'laser'

  return (
    <div
      className={cn(
        'absolute z-30 flex select-none flex-col items-center gap-0.5 rounded-xl border border-line bg-surface p-1 shadow-raised',
        edge === 'left' ? 'start-3' : 'end-3',
      )}
      style={{ top: `${offset * 100}%` }}
    >
      <button
        type="button"
        onPointerDown={onGripDown}
        onPointerMove={onGripMove}
        onPointerUp={onGripUp}
        onPointerCancel={onGripUp}
        onDoubleClick={() => setOpen((current) => !current)}
        aria-label={t('Move the toolbar')}
        title={t('Drag to move · double-click to collapse')}
        className="grid size-10 cursor-grab place-items-center rounded-md text-ink-3 hover:bg-inset active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
      >
        <Icon icon={GripVertical} size={14} />
      </button>

      {(open ? TOOLS : TOOLS.filter((entry) => entry.id === tool)).map((entry) => (
        <button
          key={entry.id}
          type="button"
          onClick={() => onTool(entry.id)}
          aria-pressed={tool === entry.id}
          aria-label={t(entry.label)}
          title={`${t(entry.label)} · ${entry.key}`}
          className={cn(
            'grid size-10 place-items-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
            tool === entry.id ? 'bg-primary-tint text-primary-strong' : 'text-ink-2 hover:bg-inset hover:text-ink',
          )}
        >
          <Icon icon={entry.icon} size={17} />
        </button>
      ))}

      {open && (
        <>
          <span className="my-0.5 h-px w-6 bg-line" aria-hidden />
          <button
            type="button"
            ref={panel.setAnchor}
            onClick={panel.toggle}
            disabled={!hasSettings}
            aria-haspopup="dialog"
            aria-expanded={panel.open}
            aria-label={t('Tool settings')}
            title={t('Tool settings')}
            className="grid size-10 place-items-center rounded-md text-ink-2 transition-colors hover:bg-inset hover:text-ink disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            <span className="size-4 rounded-full border border-line-2" style={{ backgroundColor: settings.color }} />
          </button>
          <button
            type="button"
            onClick={onToggleRuler}
            aria-pressed={rulerOn}
            aria-label={t('Ruler')}
            title={`${t('Ruler')} · R`}
            className={cn('grid size-10 place-items-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]', rulerOn ? 'bg-primary-tint text-primary-strong' : 'text-ink-2 hover:bg-inset hover:text-ink')}
          >
            <Icon icon={Ruler} size={16} />
          </button>
          <button
            type="button"
            onClick={onToggleTimer}
            aria-pressed={timerOn}
            aria-label={t('Study timer')}
            title={t('Study timer')}
            className={cn('grid size-10 place-items-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]', timerOn ? 'bg-primary-tint text-primary-strong' : 'text-ink-2 hover:bg-inset hover:text-ink')}
          >
            <Icon icon={Timer} size={16} />
          </button>

          <span className="my-0.5 h-px w-6 bg-line" aria-hidden />
          <button type="button" onClick={onUndo} disabled={!canUndo} aria-label={t('Undo')} title={`${t('Undo')} · ⌘Z`} className="grid size-10 place-items-center rounded-md text-ink-2 transition-colors hover:bg-inset hover:text-ink disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]">
            <Icon icon={Undo2} size={16} />
          </button>
          <button type="button" onClick={onRedo} disabled={!canRedo} aria-label={t('Redo')} title={`${t('Redo')} · ⌘⇧Z`} className="grid size-10 place-items-center rounded-md text-ink-2 transition-colors hover:bg-inset hover:text-ink disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]">
            <Icon icon={Redo2} size={16} />
          </button>
        </>
      )}

      {panel.open && hasSettings && (
        <Popover
          anchor={panel.anchor}
          onClose={panel.close}
          placement="bottom-start"
          label={t('Tool settings')}
          className="w-64 p-3"
        >
          <ToolSettingsPanel tool={tool} settings={settings} onSettings={onSettings} />
        </Popover>
      )}
    </div>
  )
}

function ToolSettingsPanel({
  tool,
  settings,
  onSettings,
}: {
  tool: Tool
  settings: ToolSettings
  onSettings: (patch: Partial<ToolSettings>) => void
}) {
  const t = useT()
  const widget = tool === 'note' || tool === 'tape'

  if (tool === 'lasso') {
    return (
      <section>
        <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Select by')}</p>
        <div className="grid grid-cols-2 gap-1">
          {(['free', 'rect'] as LassoMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onSettings({ lasso: mode })}
              aria-pressed={settings.lasso === mode}
              className={cn(
                'min-h-9 rounded-md border px-2 py-1.5 text-[11.5px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                settings.lasso === mode ? 'border-primary bg-primary-tint text-primary-strong' : 'border-line text-ink-2 hover:bg-inset',
              )}
            >
              {t(mode === 'free' ? 'Drawing a loop' : 'Dragging a box')}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-ink-3">
          {t('Hold Shift while drawing to drag a box without changing this.')}
        </p>
      </section>
    )
  }

  return (
    <div className="space-y-3">
      {tool === 'pen' && (
        <section>
          <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Pen')}</p>
          <div className="grid grid-cols-2 gap-1">
            {PENS.map((pen) => (
              <button
                key={pen.id}
                type="button"
                onClick={() => onSettings({ pen: pen.id })}
                aria-pressed={settings.pen === pen.id}
                title={t(pen.hint)}
                className={cn(
                  'min-h-9 rounded-md border px-2 py-1.5 text-[11.5px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                  settings.pen === pen.id ? 'border-primary bg-primary-tint text-primary-strong' : 'border-line text-ink-2 hover:bg-inset',
                )}
              >
                {t(pen.label)}
              </button>
            ))}
          </div>
        </section>
      )}

      {widget ? (
        <section>
          <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Colour')}</p>
          <div className="flex flex-wrap gap-1.5">
            {NOTE_TONES.map((tone) => (
              <button
                key={tone}
                type="button"
                onClick={() => onSettings({ tone })}
                aria-pressed={settings.tone === tone}
                aria-label={t(tone)}
                className={cn('size-8 rounded-md border transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]', settings.tone === tone ? 'scale-110 border-ink' : 'border-line-2 hover:scale-105', TONE_SWATCH[tone])}
              />
            ))}
          </div>
        </section>
      ) : tool !== 'eraser' && (
        <section>
          <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Ink colour')}</p>
          <div className="flex flex-wrap gap-1.5">
            {INK_COLORS.map((swatch) => (
              <button
                key={swatch}
                type="button"
                onClick={() => onSettings({ color: swatch })}
                aria-pressed={settings.color === swatch}
                aria-label={swatch}
                className={cn('size-8 rounded-full border transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]', settings.color === swatch ? 'scale-110 border-ink' : 'border-line-2 hover:scale-105')}
                style={{ backgroundColor: swatch }}
              />
            ))}
            <label className="grid size-8 cursor-pointer place-items-center rounded-full border border-dashed border-line-2 text-[11px] text-ink-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--color-primary)]" title={t('Any colour')}>
              +
              <input type="color" value={settings.color} onChange={(event) => onSettings({ color: event.target.value })} className="sr-only" />
            </label>
          </div>
        </section>
      )}

      {tool === 'eraser' ? (
        <>
          <section>
            <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Eraser')}</p>
            <div className="grid grid-cols-2 gap-1">
              {(['stroke', 'area'] as EraserMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onSettings({ eraserMode: mode })}
                  aria-pressed={settings.eraserMode === mode}
                  className={cn(
                    'min-h-9 rounded-md border px-2 py-1.5 text-[11.5px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                    settings.eraserMode === mode ? 'border-primary bg-primary-tint text-primary-strong' : 'border-line text-ink-2 hover:bg-inset',
                  )}
                >
                  {t(mode === 'stroke' ? 'Whole stroke' : 'Area')}
                </button>
              ))}
            </div>
          </section>
          <Slider label={t('Size')} min={4} max={60} value={Math.round(settings.eraserRadius * 1000)} onChange={(value) => onSettings({ eraserRadius: value / 1000 })} />
          <label className="flex items-center gap-2 text-[12px] text-ink-2">
            <input
              type="checkbox"
              checked={settings.eraserHighlighterOnly}
              onChange={(event) => onSettings({ eraserHighlighterOnly: event.target.checked })}
              className="accent-[var(--color-primary)]"
            />
            {t('Highlighter only')}
          </label>
        </>
      ) : !widget && (
        <>
          <Slider label={t('Stroke width')} min={1} max={14} value={Math.round(settings.width * 1000)} onChange={(value) => onSettings({ width: value / 1000 })} />
          <Slider label={t('Stabilization')} min={0} max={100} value={Math.round(settings.stabilization * 100)} onChange={(value) => onSettings({ stabilization: value / 100 })} suffix="%" />
          {tool === 'pen' && (
            <label className="flex items-center gap-2 text-[12px] text-ink-2">
              <input
                type="checkbox"
                checked={settings.snapShapes}
                onChange={(event) => onSettings({ snapShapes: event.target.checked })}
                className="accent-[var(--color-primary)]"
              />
              {t('Snap shapes as I draw')}
            </label>
          )}
        </>
      )}
    </div>
  )
}

function Slider({
  label, min, max, value, onChange, suffix = '',
}: {
  label: string; min: number; max: number; value: number; onChange: (next: number) => void; suffix?: string
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center justify-between text-[11.5px] text-ink-2">
        {label}
        <span className="tnum font-mono text-[10.5px] text-ink-3">{value}{suffix}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1 w-full accent-[var(--color-primary)]"
      />
    </label>
  )
}

export const TONE_SWATCH: Record<NoteTone, string> = {
  paper: 'bg-surface-2',
  teal: 'bg-[#2f7d6b]',
  amber: 'bg-[#c2691c]',
  rose: 'bg-[#b03a76]',
  sage: 'bg-[#4f8f3a]',
  slate: 'bg-[#5b6570]',
  sand: 'bg-[#8a6d3b]',
  clay: 'bg-primary',
}
