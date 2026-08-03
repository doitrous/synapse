import { cn } from '@/lib/cn'

/** A switch. `tint` overrides the on-state colour (used for calendar layers). */
export function Toggle({
  checked,
  onChange,
  label,
  tint,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  label?: string
  tint?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-6 w-11 shrink-0 overflow-hidden rounded-full border transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        !checked && 'border-line-2 bg-surface-2',
        checked && !tint && 'border-accent-strong bg-accent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]',
      )}
      style={checked && tint ? { backgroundColor: tint, borderColor: tint } : undefined}
    >
      <span
        className="absolute top-1/2 size-4 -translate-y-1/2 rounded-full border border-black/5 bg-white shadow-[0_1px_2px_rgba(36,29,22,0.24)] transition-[left] duration-200 ease-[var(--ease-out-quint)]"
        style={{ left: checked ? 'calc(100% - 1.25rem)' : '0.2rem' }}
      />
    </button>
  )
}
