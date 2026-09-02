import { useEffect, useRef, type KeyboardEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Icon } from './Icon'
import { cn } from '@/lib/cn'

export interface BoxTabItem {
  value: string
  label: string
  icon?: LucideIcon
  /** A quiet trailing number — how many things sit behind this tab. */
  count?: number
}

/**
 * The id of one tab, so its panel can point back with `aria-labelledby`.
 * Derived rather than passed, so the two sides cannot drift apart.
 */
export function boxTabId(listId: string, value: string): string {
  return `${listId}-tab-${value}`
}

/**
 * The Question Bank's bank selector, as a row that survives a phone.
 *
 * Same shape and the same lit state as `Tabs` — a bordered box each, the
 * selected one carrying the crimson tint, hairline and text step — because Omar
 * asked for one selector shape across the app and this is the one he picked.
 * Two things are different, and they are why this is not `Tabs`:
 *
 *  - it scrolls sideways below `sm` instead of wrapping, so a seven-way row
 *    stays one row and reads as one control rather than three ragged lines;
 *  - the arrow keys walk it, which is what a `tablist` promises and what makes
 *    a scrolling row reachable without a pointer. Focus follows selection, so
 *    arrowing along it also switches what is below.
 *
 * `Tabs` is untouched: half the app is drawn with it, and giving every one of
 * those rows a keyboard contract they do not have today is not this package's
 * change to make.
 *
 * `value` may be `null`, meaning *nothing here is selected* — the Tutorial
 * page's search mode, where the row still counts matches per section but the
 * list below belongs to no single section. No tab is `aria-selected` then, and
 * the first box keeps the tab stop so the row stays reachable.
 */
export function BoxTabs({
  id,
  items,
  value,
  onChange,
  label,
  controls,
  countUnit,
  className,
}: {
  /** Base id for the row; each tab gets `boxTabId(id, value)`. */
  id: string
  items: BoxTabItem[]
  value: string | null
  onChange: (value: string) => void
  /** Names the row for a screen reader — "Sections", "Which bank?". */
  label: string
  /**
   * id of the `role="tabpanel"` this row switches. Pass `undefined` whenever
   * that panel is not on screen: `aria-controls` naming an element that is not
   * in the document is worse than no `aria-controls` at all.
   */
  controls?: string
  /** What the trailing number counts ("topics", "matches"), for the label. */
  countUnit?: string
  className?: string
}) {
  const listRef = useRef<HTMLDivElement>(null)

  // On a phone the row is wider than the screen, and the lit box is regularly
  // the fourth of seven: a deep link would otherwise open on a row scrolled to
  // its start, with nothing on screen looking selected. `nearest` on both axes
  // so bringing it into view never scrolls the page itself.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [value])

  const selectedIndex = items.findIndex((item) => item.value === value)
  // With nothing selected the tab stop sits on the first box, or the row would
  // drop out of the Tab order entirely.
  const rovingIndex = selectedIndex >= 0 ? selectedIndex : 0

  function focusTab(index: number) {
    const tabs = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    tabs?.[index]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // The row is mirrored in Arabic, so "next" is whichever arrow points along
    // the reading direction rather than whichever one points right.
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl'
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight'
    const backward = rtl ? 'ArrowRight' : 'ArrowLeft'
    if (event.key !== forward && event.key !== backward && event.key !== 'Home' && event.key !== 'End') return

    let next: number
    if (selectedIndex < 0) next = 0 // nothing selected: the first key picks the first box
    else if (event.key === forward) next = (selectedIndex + 1) % items.length
    else if (event.key === backward) next = (selectedIndex - 1 + items.length) % items.length
    else if (event.key === 'Home') next = 0
    else next = items.length - 1

    event.preventDefault()
    onChange(items[next].value)
    focusTab(next)
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={cn(
        // The padding is what the focus ring is drawn into: `overflow-x: auto`
        // computes `overflow-y` to `auto` as well, so the scroller clips at its
        // padding box on both axes and a ring with `outline-offset-2` would be
        // sheared off flat along the top. The negative margins hand the padding
        // back, so the row's outer spacing is unchanged.
        '-mx-1 -mt-1 flex max-w-full items-center gap-2 overflow-x-auto overscroll-x-contain px-1 pt-1 pb-1',
        'sm:mx-0 sm:mt-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pt-0 sm:pb-0',
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {items.map((item, index) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            id={boxTabId(id, item.value)}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={controls}
            tabIndex={index === rovingIndex ? 0 : -1}
            onClick={() => onChange(item.value)}
            className={cn(
              'inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border px-3.5 text-[13px] font-semibold whitespace-nowrap transition-colors sm:h-10',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
              active
                ? 'border-primary-line bg-primary-tint text-primary-strong'
                : 'border-line bg-surface text-ink-2 hover:bg-inset hover:text-ink',
            )}
          >
            {item.icon && (
              <Icon icon={item.icon} size={15} className={active ? 'text-primary' : 'text-ink-3'} />
            )}
            {item.label}
            {item.count != null && (
              <span className={cn('tnum text-[11.5px] font-medium', active ? 'text-primary-strong' : 'text-ink-3')}>
                <span aria-hidden="true">{item.count}</span>
                {/* "Practice 6" does not say what six is. */}
                <span className="sr-only">{countUnit ? `${item.count} ${countUnit}` : item.count}</span>
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
