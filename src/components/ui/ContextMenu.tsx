import { useEffect, useState, type ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Icon } from './Icon'
import { Popover } from './Popover'
import { cn } from '@/lib/cn'

export interface ContextMenuItem {
  id: string
  label: string
  icon?: LucideIcon
  onSelect: () => void
  /** Draws a rule above this item, grouping what follows. */
  separated?: boolean
  disabled?: boolean
  /** For a destructive action, so it does not read like the rest of the list. */
  tone?: 'default' | 'danger'
}

/**
 * A menu positioned at the pointer.
 *
 * Placement and dismissal come from `Popover`; what is left here is the part
 * that is actually a menu — roving arrow-key focus and the item rows.
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
  const [activeIndex, setActiveIndex] = useState(-1)
  const enabled = items.filter((item) => !item.disabled)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
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
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, enabled, activeIndex])

  if (!items.length) return null

  return (
    <Popover
      point={{ x, y }}
      onClose={onClose}
      role="menu"
      className="min-w-[13rem] max-w-[min(20rem,calc(100vw-1rem))] py-1"
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
                item.disabled
                  ? 'cursor-not-allowed text-ink-3 opacity-60'
                  : item.tone === 'danger'
                    ? 'text-danger hover:bg-danger-tint'
                    : 'text-ink-2 hover:bg-inset hover:text-ink',
                !item.disabled && index === activeIndex && (item.tone === 'danger' ? 'bg-danger-tint' : 'bg-inset text-ink'),
              )}
            >
              {item.icon && (
                <Icon
                  icon={item.icon}
                  size={15}
                  className={cn('shrink-0', item.tone === 'danger' ? 'text-danger' : 'text-ink-3')}
                />
              )}
              <span className="truncate">{item.label}</span>
            </button>
          </div>
        )
      })}
    </Popover>
  )
}
