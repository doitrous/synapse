import { getSubject } from '@/data/subjects'
import { useSystemColor } from '@/data/systemColors'
import { cn } from '@/lib/cn'

/**
 * The one marker for a curriculum System, everywhere.
 *
 * A chip with a coloured spine, the system's short code, and optionally a
 * sequence number: `▌CVS` or `▌CVS 07`. This replaced three near-identical
 * components — a tinted monogram tile, a chapter chip, and a module chip — that
 * each drew the same idea differently, so the same system looked like three
 * things depending on which screen you were on.
 *
 * The spine colour always comes from `useSystemColor`, so an admin's edit in
 * Subjects & Topics reaches every marker. The chapter chip used to read
 * `subject.color` directly and silently ignored those overrides.
 */
export function SystemMark({
  subjectId,
  short,
  color,
  index,
  moduleId,
  size = 'md',
  title,
  className,
}: {
  /** The system to mark. Its code and colour are resolved from the catalogue. */
  subjectId?: string
  /** Override the code — for a system outside the catalogue. */
  short?: string
  /** Override the colour — for a live preview while a colour is being picked. */
  color?: string
  /** A sequence number, rendered zero-padded: `▌CVS 07`. */
  index?: number
  /** A module identifier like `"CVS 01"`, split into code and number. */
  moduleId?: string
  size?: 'sm' | 'md' | 'lg'
  title?: string
  className?: string
}) {
  const subject = getSubject(subjectId ?? '')
  const resolved = useSystemColor(subjectId ?? '')

  const parsed = moduleId ? moduleId.trim().match(/^(.*?)[\s·-]*(\d+)$/) : null
  const rawCode = moduleId
    ? ((parsed ? parsed[1] : moduleId).trim() || moduleId)
    : (short ?? subject.short)
  const code = rawCode.replace(/[^A-Za-z0-9]/g, '').slice(0, 3).toUpperCase() || '—'

  const number = moduleId
    ? (parsed ? parsed[2].padStart(2, '0') : '')
    : (index === undefined ? '' : String(index).padStart(2, '0'))

  const dims = size === 'lg'
    ? 'h-8 text-[11px]'
    : size === 'sm'
      ? 'h-6 text-[9.5px]'
      : 'h-7 text-[10px]'
  // Two widths so a column of code-only chips and a column of numbered chips
  // each line up with themselves, rather than one padding serving both badly.
  const width = number
    ? (size === 'lg' ? 'min-w-[3.75rem]' : size === 'sm' ? 'min-w-[3.1rem]' : 'min-w-[3.35rem]')
    : (size === 'lg' ? 'min-w-[2.9rem]' : size === 'sm' ? 'min-w-[2.4rem]' : 'min-w-[2.6rem]')

  return (
    <span
      className={cn(
        'inline-grid shrink-0 grid-cols-[3px_1fr] overflow-hidden rounded-[5px] border border-line-2 bg-surface font-mono text-ink-2 shadow-[0_1px_0_var(--color-line)]',
        dims,
        width,
        className,
      )}
      title={title ?? (number ? `${subject.name} ${number}` : subject.name)}
      aria-hidden
    >
      <span style={{ backgroundColor: color ?? resolved }} aria-hidden />
      <span className="flex items-center justify-center gap-1 px-1.5">
        <span className="font-semibold tracking-[0.04em] text-ink">{code}</span>
        {number && <span className="text-ink-3">{number}</span>}
      </span>
    </span>
  )
}
