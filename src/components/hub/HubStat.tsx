import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * One figure in a hub header: a quiet pill, the number first.
 *
 * Tabular so a value that ticks does not shift its label; the label is plain
 * sentence case beside it ("2 open tasks"), not a caption above it — the pill
 * should read as a sentence fragment, the way the rest of the header does.
 */
export function HubStat({
  label,
  value,
  sub,
  className,
}: {
  label: string
  /** Already formatted — this renders it, it does not compute it. */
  value: string
  /** Optional trailing qualifier, e.g. "days away". */
  sub?: string
  className?: string
}) {
  const t = useT()
  return (
    <span
      className={cn(
        'inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-[13px] text-ink-2 shadow-control',
        className,
      )}
    >
      <span className="tnum font-mono font-semibold text-ink">{value}</span>
      <span>{sub ? t(sub) : t(label).toLowerCase()}</span>
    </span>
  )
}
