import { Menu } from 'lucide-react'
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
 */
export function MenuToggle({
  open,
  onToggle,
  label,
  showLabel = false,
  className,
}: {
  /** Whether the menu it controls is currently shown. */
  open: boolean
  onToggle: () => void
  /** What it opens, for the accessible name: "topics" → "Hide topics". */
  label: string
  showLabel?: boolean
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
        'inline-flex items-center gap-2 rounded-md text-ink-2 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
        showLabel ? 'h-11 px-2.5 text-[13px] lg:h-9' : 'size-11 justify-center lg:size-9',
        className,
      )}
    >
      <Icon icon={Menu} size={18} />
      {showLabel && <span className="truncate">{t(label)}</span>}
    </button>
  )
}
