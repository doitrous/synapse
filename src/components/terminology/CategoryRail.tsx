import type { MedTermCategory, MedicalTerm } from '@/data/glossary'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * The category chips, each carrying how much of it is already known.
 *
 * A plain chip row says what a category is called; this one says whether it
 * is worth opening — a `13/13` is done, a `2/13` is where the afternoon goes.
 */
export function CategoryRail({
  categories,
  terms,
  known,
  value,
  onChange,
}: {
  categories: { key: MedTermCategory; ar: string }[]
  terms: MedicalTerm[]
  known: Set<string>
  value: MedTermCategory | 'all'
  onChange: (next: MedTermCategory | 'all') => void
}) {
  const t = useT()
  const total = terms.length
  const knownTotal = terms.filter((term) => known.has(term.id)).length

  const chip = (key: MedTermCategory | 'all', label: string, done: number, count: number) => {
    const active = value === key
    const complete = count > 0 && done === count
    return (
      <button
        key={key}
        type="button"
        onClick={() => onChange(key)}
        aria-pressed={active}
        className={cn(
          'inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[12.5px] font-medium transition-colors sm:h-9 sm:px-3',
          active ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink',
        )}
      >
        <span>{label}</span>
        <span className={cn('tnum font-mono text-[10.5px]', complete ? 'text-success' : active ? 'text-primary-strong/70' : 'text-ink-3')}>
          {done}/{count}
        </span>
      </button>
    )
  }

  return (
    <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label={t('Categories')}>
      {chip('all', t('All'), knownTotal, total)}
      {categories.map((category) => {
        const inCategory = terms.filter((term) => term.category === category.key)
        return chip(category.key, t(category.key), inCategory.filter((term) => known.has(term.id)).length, inCategory.length)
      })}
    </div>
  )
}
