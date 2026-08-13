import { getSubject } from '@/data/subjects'
import { cn } from '@/lib/cn'

/** A meaningful article identifier: subject abbreviation + chapter sequence. */
export function ChapterMark({
  subjectId,
  index,
  compact = false,
  className,
}: {
  subjectId: string
  index: number
  compact?: boolean
  className?: string
}) {
  const subject = getSubject(subjectId)
  const code = subject.short.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase()
  return (
    <span
      className={cn(
        'inline-grid shrink-0 grid-cols-[3px_1fr] overflow-hidden rounded-[5px] border border-line-2 bg-surface font-mono text-ink-2 shadow-[0_1px_0_var(--color-line)]',
        compact ? 'h-7 min-w-[3.35rem] text-[9.5px]' : 'h-8 min-w-[3.75rem] text-[10px]',
        className,
      )}
      title={`${subject.name}, chapter ${index}`}
      aria-label={`${subject.name}, chapter ${index}`}
    >
      <span style={{ backgroundColor: subject.color }} aria-hidden />
      <span className="flex items-center justify-center gap-1 px-1.5">
        <span className="font-semibold tracking-[0.04em]">{code}</span>
        <span className="text-ink-3">{String(index).padStart(2, '0')}</span>
      </span>
    </span>
  )
}
