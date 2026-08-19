import { ChevronRight, Menu } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * Three lines: show or hide the menu beside them.
 *
 * One control for every menu in the app, not just the main one. The sidebar had
 * this and the panels that need it most — the library's topic tree, the resource
 * filters — had nothing, so a student could not reclaim the width they were
 * reading in. Same glyph, same behaviour, whichever menu it belongs to.
 *
 * `direction` exists because sameness stops being a virtue when two of them sit
 * in one header. The library has both: one opens a horizontal strip of views,
 * one opens a vertical tree of topics, and as identical three-line buttons
 * nothing said which was which. The chevron points the way the menu will open —
 * right for a strip, down for a tree — and turns back on itself when the menu is
 * already open, which is the direction pressing it again will send that menu.
 */
export function MenuToggle({
  open,
  onToggle,
  label,
  showLabel = false,
  direction,
  className,
}: {
  /** Whether the menu it controls is currently shown. */
  open: boolean
  onToggle: () => void
  /** What it opens, for the accessible name: "topics" → "Hide topics". */
  label: string
  showLabel?: boolean
  /** Which way the menu it controls unfolds. Omitted where it is the only one. */
  direction?: 'horizontal' | 'vertical'
  className?: string
}) {
  const t = useT()
  const text = open ? `${t('Hide')} ${t(label)}` : `${t('Show')} ${t(label)}`

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-label={text}
      title={text}
      className={cn(
        'inline-flex items-center rounded-md text-ink-2 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
        showLabel ? 'h-11 gap-2 px-2.5 text-[13px] lg:h-9' : direction ? 'h-11 gap-0.5 px-1.5 lg:h-9' : 'size-11 justify-center gap-2 lg:size-9',
        className,
      )}
    >
      <Icon icon={Menu} size={18} />
      {direction && (
        <Icon
          icon={ChevronRight}
          size={14}
          className={cn(
            'text-ink-3 transition-transform duration-[280ms] ease-[var(--ease-out-quint)] ease-out motion-reduce:transition-none',
            // A strip unfolds to the right; a tree unfolds downward. Open, each
            // points back the way it came — which is what pressing it does.
            direction === 'horizontal'
              ? open ? 'rotate-180' : 'rtl:rotate-180'
              : open ? '-rotate-90' : 'rotate-90',
          )}
        />
      )}
      {showLabel && <span className="truncate">{t(label)}</span>}
    </button>
  )
}
