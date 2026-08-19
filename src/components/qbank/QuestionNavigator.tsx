import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * Where a question stands in the session.
 *
 * `omitted` is the one worth naming carefully: it means the student reached the
 * question and moved past it without answering. It is not the same as `unseen`,
 * and conflating the two is what makes a progress strip useless — a student
 * scanning for unfinished work needs to know which gaps they already walked past.
 */
export type QuestionState = 'unseen' | 'answered' | 'omitted' | 'correct' | 'incorrect'

/**
 * "Answered" is cortex blue, not crimson. It is a record of what happened, not
 * something to act on — and crimson already means two other things in this
 * strip: the question you are on, and the ones you marked for review. Three
 * meanings in one colour is what made the legend need reading twice.
 */
const SWATCH: Record<QuestionState, string> = {
  unseen: 'border-line bg-surface text-ink-3',
  answered: 'border-accent-line bg-accent-tint text-accent-strong',
  omitted: 'border-warning/45 bg-warning-tint text-warning',
  correct: 'border-success/50 bg-success-tint text-success',
  incorrect: 'border-danger/50 bg-danger-tint text-danger',
}

const LEGEND: Array<{ state: QuestionState; label: string }> = [
  { state: 'answered', label: 'Answered' },
  { state: 'omitted', label: 'Omitted' },
  { state: 'unseen', label: 'Unseen' },
]

const GRADED_LEGEND: Array<{ state: QuestionState; label: string }> = [
  { state: 'correct', label: 'Correct' },
  { state: 'incorrect', label: 'Incorrect' },
  { state: 'omitted', label: 'Omitted' },
  { state: 'unseen', label: 'Unseen' },
]

export function QuestionNavigator({
  count,
  current,
  stateFor,
  isFlagged,
  onJump,
  graded = false,
  className,
}: {
  count: number
  current: number
  stateFor: (index: number) => QuestionState
  isFlagged: (index: number) => boolean
  onJump: (index: number) => void
  /** After checking or in review, the strip reports right and wrong rather than merely answered. */
  graded?: boolean
  className?: string
}) {
  const t = useT()
  // Open on a large screen, closed on a phone. The grid of numbers is a
  // convenience beside the question on a desktop; above it on a 375px screen it
  // is a screenful of chrome before the thing being read.
  const [open, setOpen] = useState(() => typeof window === 'undefined' || window.innerWidth >= 640)
  const indexes = Array.from({ length: count }, (_, i) => i)
  const answered = indexes.filter((i) => stateFor(i) !== 'unseen' && stateFor(i) !== 'omitted').length
  const flagged = indexes.filter(isFlagged).length

  return (
    <section className={cn('rounded-xl border border-line bg-surface', className)} aria-label={t('Question navigator')}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex min-h-11 w-full items-center gap-2 px-3 text-start"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Questions')}</span>
        <span className="tnum font-mono text-[11.5px] text-ink-2">
          {answered}/{count}
        </span>
        {flagged > 0 && (
          <span className="inline-flex items-center gap-1 text-[11.5px] text-ink-3">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            <span className="tnum font-mono">{flagged}</span> {t('marked')}
          </span>
        )}
        <Icon
          icon={ChevronDown}
          size={15}
          className={cn('ms-auto text-ink-3 transition-transform duration-[280ms] ease-[var(--ease-out-quint)]', !open && '-rotate-90 rtl:rotate-90')}
        />
      </button>

      {open && (
        <div className="border-t border-line px-3 pb-3 pt-2.5">
          <ol className="flex flex-wrap gap-1.5">
            {indexes.map((i) => {
              const state = stateFor(i)
              const here = i === current
              return (
                <li key={i} className="relative">
                  <button
                    type="button"
                    onClick={() => onJump(i)}
                    aria-current={here ? 'true' : undefined}
                    aria-label={`${t('Question')} ${i + 1}, ${t(state)}${isFlagged(i) ? `, ${t('marked for review')}` : ''}`}
                    className={cn(
                      // 44px on touch, tighter once there is a pointer.
                      'tnum grid size-11 place-items-center rounded-md border font-mono text-[12.5px] transition-colors sm:size-9',
                      SWATCH[state],
                      here
                        ? 'border-primary font-semibold text-primary-strong ring-2 ring-primary/30'
                        : 'hover:border-line-2',
                    )}
                  >
                    {i + 1}
                  </button>
                  {isFlagged(i) && (
                    <span
                      className="pointer-events-none absolute -end-0.5 -top-0.5 size-2 rounded-full border border-surface bg-primary"
                      aria-hidden
                    />
                  )}
                </li>
              )
            })}
          </ol>

          <ul className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 border-t border-line pt-2.5">
            {(graded ? GRADED_LEGEND : LEGEND).map(({ state, label }) => (
              <li key={state} className="inline-flex items-center gap-1.5 text-[11px] text-ink-2">
                <span className={cn('size-2.5 rounded-[3px] border', SWATCH[state])} aria-hidden />
                {t(label)}
              </li>
            ))}
            <li className="inline-flex items-center gap-1.5 text-[11px] text-ink-2">
              <span className="size-2 rounded-full bg-primary" aria-hidden />
              {t('Marked for review')}
            </li>
          </ul>
        </div>
      )}
    </section>
  )
}
