import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Icon } from './Icon'
import { cn } from '@/lib/cn'

export interface TabItem {
  value: string
  label: string
  icon?: LucideIcon
  count?: number
}

/** The rule is inset from each edge of its tab, so it reads as a mark under the
 *  label rather than a full-width divider. */
const RULE_INSET = 8

/**
 * Underline tabs for switching sections within a surface.
 *
 * One rule that *slides* between tabs, rather than one rule per tab appearing
 * and disappearing: the movement is what tells you where the selection went.
 * Its position is measured from the active button, so it stays correct at any
 * label length, in either writing direction, and while the strip is scrolled —
 * the indicator and the buttons share an offset parent, so scrolling moves both
 * together.
 */
export function Tabs({
  items,
  value,
  onChange,
  className,
}: {
  items: TabItem[]
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)
  const [rule, setRule] = useState<{ left: number; width: number } | null>(null)
  // The first measurement must not animate: on mount there is no previous
  // place to travel from, and sliding in from the left edge reads as a glitch.
  const measured = useRef(false)

  const measure = useCallback(() => {
    const button = activeRef.current
    if (!button) return
    setRule({ left: button.offsetLeft + RULE_INSET, width: Math.max(0, button.offsetWidth - RULE_INSET * 2) })
  }, [])

  useLayoutEffect(() => {
    measure()
    // Labels reflow when a webfont lands or the strip is resized, and the rule
    // has to follow. Observing the list covers both without a resize listener.
    const list = listRef.current
    if (!list || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    for (const child of Array.from(list.children)) observer.observe(child)
    return () => observer.disconnect()
  }, [measure, items, value])

  useLayoutEffect(() => {
    if (rule) {
      const id = requestAnimationFrame(() => { measured.current = true })
      return () => cancelAnimationFrame(id)
    }
  }, [rule])

  return (
    <div
      ref={listRef}
      role="tablist"
      className={cn('relative flex max-w-full items-center gap-1 overflow-x-auto overscroll-x-contain border-b border-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', className)}
    >
      {items.map((t) => {
        const active = t.value === value
        return (
          <button
            key={t.value}
            ref={active ? activeRef : undefined}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.value)}
            className={cn(
              'relative flex h-11 shrink-0 items-center gap-2 px-3 text-[13.5px] font-medium whitespace-nowrap transition-colors sm:h-9',
              active ? 'text-ink' : 'text-ink-2 hover:text-ink',
            )}
          >
            {t.icon && (
              <Icon icon={t.icon} size={16} className={active ? 'text-primary' : 'text-ink-3'} />
            )}
            {t.label}
            {t.count != null && (
              <span className="tnum rounded-full bg-inset px-1.5 text-[11px] font-medium text-ink-2">
                {t.count}
              </span>
            )}
          </button>
        )
      })}
      {rule && (
        <span
          aria-hidden
          className="nishany-tab-indicator left-0"
          style={{
            width: rule.width,
            transform: `translateX(${rule.left}px)`,
            transition: measured.current ? undefined : 'none',
          }}
        />
      )}
    </div>
  )
}

export interface SegItem {
  value: string
  label: string
}

/** Compact segmented control for view toggles (week/month, etc.). */
export function Segmented({
  items,
  value,
  onChange,
  className,
}: {
  items: SegItem[]
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 rounded-lg border border-line bg-surface-2 p-0.5',
        className,
      )}
    >
      {items.map((t) => {
        const active = t.value === value
        return (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            aria-pressed={active}
            className={cn(
              'h-10 rounded-md px-3 text-[12.5px] font-medium transition-colors sm:h-7',
              active ? 'bg-surface text-ink shadow-panel' : 'text-ink-2 hover:text-ink',
            )}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
