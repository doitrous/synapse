import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * A checkbox for selecting rows.
 *
 * `indeterminate` is the header state when only some rows beneath it are
 * selected — clicking then selects the rest rather than clearing, which is what
 * people expect from a partially-filled group.
 */
export function Checkbox({
  checked,
  indeterminate = false,
  onChange,
  label,
  disabled,
  className,
}: {
  checked: boolean
  indeterminate?: boolean
  onChange: (next: boolean) => void
  label: string
  disabled?: boolean
  className?: string
}) {
  const on = checked || indeterminate
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-label={label}
      disabled={disabled}
      onClick={(event) => {
        // Rows sit inside clickable containers; selecting must not also open one.
        event.stopPropagation()
        onChange(indeterminate ? true : !checked)
      }}
      className={cn(
        'grid size-[1.15rem] shrink-0 place-items-center rounded-[5px] border transition-[background-color,border-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        on ? 'border-accent-strong bg-accent text-on-accent' : 'border-line-2 bg-surface hover:border-ink-3',
        disabled && 'cursor-not-allowed opacity-40',
        className,
      )}
    >
      {indeterminate ? <Minus size={12} strokeWidth={3} /> : checked ? <Check size={12} strokeWidth={3} /> : null}
    </button>
  )
}
