import { Segmented } from '@/components/ui/Tabs'
import { SystemMark } from '@/components/ui/SystemMark'
import { useSubjectName } from '@/lib/useSubjectName'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * The two controls the practical and essay banks both need.
 *
 * The MCQ builder has `TopicChooser` for scope and a length row for the
 * sitting; neither fits a bank of twelve stations, and writing them twice is
 * how the practical bank and the essay bank would come to disagree about what
 * "everything" means. They are here once instead.
 */

/** A row of system chips. Nothing selected means the whole bank. */
export function SystemPicker({
  ids,
  value,
  onChange,
  countOf,
}: {
  /** The systems present in this bank, in catalogue order. */
  ids: string[]
  value: Set<string>
  onChange: (next: Set<string>) => void
  /** How many items this bank holds for one system. */
  countOf: (id: string) => number
}) {
  const t = useT()
  const subjectName = useSubjectName()
  if (!ids.length) return <p className="text-[12.5px] text-ink-3">{t('Nothing has been published for this bank yet.')}</p>

  return (
    <div className="flex flex-wrap gap-2">
      {ids.map((id) => {
        const on = value.has(id)
        return (
          <button
            key={id}
            type="button"
            aria-pressed={on}
            onClick={() => {
              const next = new Set(value)
              if (on) next.delete(id)
              else next.add(id)
              onChange(next)
            }}
            className={cn(
              'inline-flex min-h-11 items-center gap-2 rounded-md border px-3 text-[13px] font-medium transition-colors sm:min-h-9',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
              on ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line bg-surface text-ink-2 hover:bg-inset hover:text-ink',
            )}
          >
            <SystemMark subjectId={id} size="sm" />
            {subjectName(id)}
            <span className={cn('tnum rounded-full px-1.5 text-[11px]', on ? 'bg-primary-line/60 text-primary-strong' : 'bg-inset text-ink-2')}>
              {countOf(id)}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/** How many items this sitting serves, capped at what the selection yields. */
export function CountPicker({
  value,
  onChange,
  max,
  lengths = [3, 5, 10],
  label,
}: {
  value: number
  onChange: (next: number) => void
  /** The most the selection can serve — the free-entry field never exceeds it. */
  max: number
  lengths?: number[]
  label: string
}) {
  const t = useT()
  const offered = lengths.filter((length) => length <= Math.max(max, 1))
  const choice = offered.includes(value) ? String(value) : 'custom'

  return (
    <div>
      <p className="mb-2 text-[12.5px] font-medium text-ink-2">{label}</p>
      <div className="flex flex-wrap items-center gap-2">
        {offered.length > 0 && (
          <Segmented
            value={choice}
            onChange={(next) => { if (next !== 'custom') onChange(Number(next)) }}
            items={[...offered.map((length) => ({ value: String(length), label: String(length) })), { value: 'custom', label: t('Custom') }]}
          />
        )}
        <input
          type="number"
          min={1}
          max={Math.max(max, 1)}
          value={value}
          onChange={(event) => onChange(Math.min(Math.max(max, 1), Math.max(1, Number(event.target.value) || 1)))}
          className="h-9 w-20 rounded-md border border-line bg-surface px-2.5 text-[13.5px] text-ink focus:border-primary focus:outline-none"
          aria-label={label}
        />
      </div>
    </div>
  )
}

/** One "Draw from" source: what it is called, and how many items it holds. */
export interface DrawChip {
  value: string
  label: string
  count: number
}

/**
 * Which of the student's own lists this test comes out of.
 *
 * A counted chip row rather than a plain segmented control, because the count
 * is the whole decision: "Flagged" means nothing until it says how many are in
 * it, and a student who has flagged nothing should be able to see that without
 * selecting it first. Written here rather than by extending the shared
 * `Segmented`, so the four banks can carry counts without changing a control
 * every other surface in the app also uses.
 *
 * The selected chip is never marked by colour alone: it carries the tint, the
 * hairline, the text step and `aria-pressed`.
 */
export function DrawFromChips({
  value,
  onChange,
  items,
  label,
}: {
  value: string
  onChange: (next: string) => void
  items: DrawChip[]
  /** What the row is, for anyone who reaches it without seeing the step heading. */
  label: string
}) {
  return (
    <div role="group" aria-label={label} className="flex max-w-full flex-wrap items-center gap-1.5">
      {items.map((item) => {
        const on = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(item.value)}
            className={cn(
              'inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-md border px-3 text-[13px] font-semibold whitespace-nowrap transition-colors sm:min-h-9',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
              on ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line bg-surface text-ink-2 hover:bg-inset hover:text-ink',
            )}
          >
            {item.label}
            <span className={cn('tnum rounded-full px-1.5 text-[11px] font-medium', on ? 'bg-primary-line/60 text-primary-strong' : 'bg-inset text-ink-2')}>
              {item.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
