import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, Grid3x3, Layers, Shuffle } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

interface Way {
  icon: LucideIcon
  title: string
  description: string
  meta: string
  disabled?: boolean
  onClick: () => void
}

function WayCard({ way, index }: { way: Way; index: number }) {
  const t = useT()
  return (
    <button
      type="button"
      onClick={way.onClick}
      disabled={way.disabled}
      className={cn(
        'group/way flex min-w-0 items-start gap-3 rounded-xl border border-line bg-surface p-4 text-start shadow-panel',
        'transition-[transform,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-out-quint)]',
        'enabled:hover:-translate-y-0.5 enabled:hover:shadow-raised motion-reduce:transform-none',
        'disabled:cursor-not-allowed disabled:opacity-60',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-mist-line bg-mist text-primary-strong">
        <Icon icon={way.icon} size={18} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="font-mono text-[10.5px] text-ink-3">0{index + 1}</span>
          <span className="text-[14px] font-semibold text-ink">{way.title}</span>
          <Icon icon={ArrowUpRight} size={14} className="ms-auto shrink-0 text-ink-3 transition-transform group-hover/way:translate-x-0.5 group-hover/way:-translate-y-0.5 rtl:-scale-x-100" />
        </span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-2">{t(way.description)}</span>
        <span className="tnum mt-1.5 block font-mono text-[11px] text-ink-3">{way.meta}</span>
      </span>
    </button>
  )
}

/**
 * The three practice routes out of the dictionary, in the order they escalate:
 * flashcards (recall), the crossword (spelling from a clue), the match game
 * (speed). Each says how many terms it would take right now.
 */
export function WaysToLearn({
  flashcards,
  grid,
  match,
}: {
  flashcards: { count: number; onStart: () => void }
  grid: { count: number; enabled: boolean; hint: string; onStart: () => void }
  match: { count: number; enabled: boolean; onStart: () => void }
}) {
  const t = useT()
  const ways: Way[] = [
    {
      icon: Layers,
      title: t('Flashcards'),
      description: 'Recall the meaning before you turn the card — spaced so the ones you miss come back sooner.',
      meta: `${flashcards.count} ${t('cards')}`,
      disabled: flashcards.count === 0,
      onClick: flashcards.onStart,
    },
    {
      icon: Grid3x3,
      title: t('Term Grid'),
      description: 'A crossword built from one category: the clue is the meaning, the answer is the term.',
      meta: grid.enabled ? `${grid.count} ${t('terms in the puzzle')}` : grid.hint,
      disabled: !grid.enabled,
      onClick: grid.onStart,
    },
    {
      icon: Shuffle,
      title: t('Term Match'),
      description: 'Pair each term with its meaning against the clock.',
      meta: match.enabled ? `${match.count} ${t('terms')}` : t('Needs a few more terms'),
      disabled: !match.enabled,
      onClick: match.onStart,
    },
  ]
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {ways.map((way, index) => <WayCard key={way.title} way={way} index={index} />)}
    </div>
  )
}
