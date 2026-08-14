import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import type { LucideIcon } from 'lucide-react'
import { Icon } from './Icon'
import { cn } from '@/lib/cn'

export interface ContextMenuItem {
  id: string
  label: string
  icon?: LucideIcon
  onSelect: () => void
  /** Draws a rule above this item, grouping what follows. */
  separated?: boolean
  disabled?: boolean
}

const MARGIN = 8

/**
 * A menu positioned at the pointer.
 *
 * Rendered in a portal so it is never clipped by a panel's overflow, and
 * measured after mount so it can flip rather than run off the viewport — a menu
 * opened near the bottom-right of the window is the normal case, not the edge
 * case. Escape, scroll, resize and any outside press close it.
 */
export function ContextMenu({
  x,
  y,
  items,
  onClose,
  header,
}: {
  x: number
  y: number
  items: ContextMenuItem[]
  onClose: () => void
  header?: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ left: x, top: y, ready: false })
  const [activeIndex, setActiveIndex] = useState(-1)

  const enabled = items.filter((item) => !item.disabled)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const { width, height } = element.getBoundingClientRect()
    // Flip toward the pointer rather than merely clamping: a menu pinned to the
    // edge covers what was right-clicked, which is the thing being acted on.
    const left = x + width + MARGIN > window.innerWidth ? Math.max(MARGIN, x - width) : x
    const top = y + height + MARGIN > window.innerHeight ? Math.max(MARGIN, y - height) : y
    setPosition({ left, top, ready: true })
  }, [x, y, items.length])

  useEffect(() => {
    const close = () => onClose()
    // Capture-phase, so a press anywhere closes this before it does anything
    // else — but a press *inside* the menu has to be allowed to become a click,
    // and stopPropagation on the menu cannot help during capture.
    const closeIfOutside = (event: Event) => {
      if (ref.current?.contains(event.target as Node)) return
      onClose()
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((current) => {
          const step = event.key === 'ArrowDown' ? 1 : -1
          const next = current + step
          if (next < 0) return enabled.length - 1
          if (next >= enabled.length) return 0
          return next
        })
        return
      }
      if (event.key === 'Enter' && activeIndex >= 0) {
        event.preventDefault()
        const item = enabled[activeIndex]
        if (item) { onClose(); item.onSelect() }
      }
    }
    // `scroll` in the capture phase so scrolling inside a panel counts too.
    document.addEventListener('pointerdown', closeIfOutside, true)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    window.addEventListener('blur', close)
    return () => {
      document.removeEventListener('pointerdown', closeIfOutside, true)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
      window.removeEventListener('blur', close)
    }
  }, [onClose, enabled, activeIndex])

  if (!items.length) return null

  return createPortal(
    <div
      ref={ref}
      role="menu"
      aria-orientation="vertical"
      // Stop the browser's own menu from opening on top of this one.
      onContextMenu={(event) => event.preventDefault()}
      onPointerDown={(event) => event.stopPropagation()}
      style={{ left: position.left, top: position.top }}
      className={cn(
        'fixed z-[80] min-w-[13rem] max-w-[min(20rem,calc(100vw-1rem))] overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-pop',
        position.ready ? 'animate-pop' : 'invisible',
      )}
    >
      {header && (
        <div className="truncate border-b border-line px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
          {header}
        </div>
      )}
      {items.map((item) => {
        const index = enabled.indexOf(item)
        return (
          <div key={item.id} className={item.separated ? 'mt-1 border-t border-line pt-1' : undefined}>
            <button
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => { onClose(); item.onSelect() }}
              className={cn(
                'flex w-full items-center gap-2.5 px-3 py-2 text-start text-[13px] transition-colors',
                item.disabled ? 'cursor-not-allowed text-ink-3 opacity-60' : 'text-ink-2 hover:bg-inset hover:text-ink',
                !item.disabled && index === activeIndex && 'bg-inset text-ink',
              )}
            >
              {item.icon && <Icon icon={item.icon} size={15} className="shrink-0 text-ink-3" />}
              <span className="truncate">{item.label}</span>
            </button>
          </div>
        )
      })}
    </div>,
    document.body,
  )
}
