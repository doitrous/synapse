import { cn } from '@/lib/cn'

/**
 * A module identifier chip in the "CVS 01" style: an accent bar, the system
 * code, and a zero-padded number. Splits a moduleId like "CVS 01" into code +
 * number; anything without a trailing number is shown whole.
 */
export function ModuleIdChip({ moduleId, tone = 'accent', className }: {
  moduleId: string
  tone?: 'accent' | 'neutral'
  className?: string
}) {
  const match = moduleId.trim().match(/^(.*?)[\s·-]*(\d+)$/)
  const code = (match ? match[1] : moduleId).trim() || moduleId
  const num = match ? match[2] : ''
  return (
    <span
      className={cn(
        'inline-grid h-7 shrink-0 grid-cols-[3px_1fr] overflow-hidden rounded-[5px] border border-line-2 bg-surface font-mono text-[10px] text-ink-2 shadow-[0_1px_0_var(--color-line)]',
        className,
      )}
      title={`Module ${moduleId}`}
      aria-label={`Module ${moduleId}`}
    >
      <span className={tone === 'accent' ? 'bg-accent' : 'bg-ink-3'} aria-hidden />
      <span className="flex items-center justify-center gap-1 px-1.5">
        <span className="font-semibold tracking-[0.04em] text-ink">{code}</span>
        {num && <span className="text-ink-3">{num.padStart(2, '0')}</span>}
      </span>
    </span>
  )
}
