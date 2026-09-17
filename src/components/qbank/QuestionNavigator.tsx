import { type ReactNode, useEffect, useRef, useState } from 'react'
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
  answered: 'border-primary-line bg-primary-tint text-primary-strong',
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
  headerRight,
}: {
  count: number
  current: number
  stateFor: (index: number) => QuestionState
  isFlagged: (index: number) => boolean
  onJump: (index: number) => void
  /** After checking or in review, the strip reports right and wrong rather than merely answered. */
  graded?: boolean
  className?: string
  /** Controls parked at the top-right of the count box — the timer and the split toggle. */
  headerRight?: ReactNode
}) {
  const t = useT()
  // Open everywhere. It used to start closed on a phone, on the argument that
  // a grid of numbers above the question is a screenful of chrome — but the
  // grid is how a student moves around a block and reaches the questions they
  // marked, and a collapsed strip reads as a heading rather than a control.
  // It still collapses on request; it simply no longer hides itself.
  const [open, setOpen] = useState(true)
  // Keep the question you are on in view: on a phone the strip is one
  // horizontally-scrolling row, so without this the current number scrolls off
  // the end as you move through a long block.
  const activeRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [current, open])
  const indexes = Array.from({ length: count }, (_, i) => i)
  const answered = indexes.filter((i) => stateFor(i) !== 'unseen' && stateFor(i) !== 'omitted').length
  const flagged = indexes.filter(isFlagged).length

  return (
    <section className={cn('rounded-xl border border-line bg-surface', className)} aria-label={t('Question navigator')}>
      {/* The toggle and the parked controls (timer, split) are siblings, not
          nested — a button inside a button is invalid, and the controls must
          stay clickable without also collapsing the strip. */}
      <div className="flex min-h-11 w-full items-center gap-2 px-3">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex flex-1 items-center gap-2 text-start"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Jump to question')}</span>
          {/* Sits right next to the label — it is the affordance for the label,
              and pinned to the far right it read as unrelated to it. */}
          <Icon
            icon={ChevronDown}
            size={15}
            className={cn('text-ink-3 transition-transform duration-[280ms] ease-[var(--ease-out-quint)]', !open && '-rotate-90 rtl:rotate-90')}
          />
          <span className="tnum ms-auto font-mono text-[11.5px] text-ink-2">
            {answered}/{count}
          </span>
          {flagged > 0 && (
            <span className="inline-flex items-center gap-1 text-[11.5px] text-ink-3">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              <span className="tnum font-mono">{flagged}</span> {t('marked')}
            </span>
          )}
        </button>
        {headerRight && <div className="flex shrink-0 items-center gap-2">{headerRight}</div>}
      </div>

      {open && (
        // The number grid and the legend share one row: the grid wraps on the
        // left, the legend is pinned top-right and wraps within its own column.
        // Parking the key here instead of on a row of its own keeps it off the
        // page's vertical budget — it costs height only when the grid is a
        // single row, and then only the height the grid already spends.
        <div className="flex flex-col gap-x-4 gap-y-2.5 border-t border-line px-3 pb-3 pt-2.5 sm:flex-row sm:items-start">
          {/* One scrolling row on a phone so a long block costs one line, not a
              screenful of wrapped rows; the familiar wrapping grid returns once
              there is room (sm+). Scrollbar hidden — the row snaps and the
              current number scrolls itself into view. */}
          <ol className="flex flex-1 gap-1.5 overflow-x-auto snap-x [-ms-overflow-style:none] [scrollbar-width:none] sm:min-w-0 sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {indexes.map((i) => {
              const state = stateFor(i)
              const here = i === current
              return (
                <li key={i} className="relative shrink-0 snap-center">
                  <button
                    ref={here ? activeRef : undefined}
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

          {/* Two swatches per line, three lines at most — a tidy block that
              reads the same on a phone as on a wide screen. Columns size to
              their labels (not an even split) so the key stays narrow and the
              number grid keeps room to wrap. */}
          <ul className="grid shrink-0 grid-cols-[auto_auto] gap-x-2.5 gap-y-1">
            {(graded ? GRADED_LEGEND : LEGEND).map(({ state, label }) => (
              <li key={state} className="inline-flex items-center gap-1.5 text-[10.5px] text-ink-2">
                <span className={cn('size-2 rounded-[3px] border', SWATCH[state])} aria-hidden />
                {t(label)}
              </li>
            ))}
            <li className="col-span-2 inline-flex items-center gap-1.5 text-[10.5px] text-ink-2">
              {/* Round like the flag badge on the pills, boxed to the swatch
                  width so the labels stay left-aligned with the squares above. */}
              <span className="grid size-2 place-items-center" aria-hidden>
                <span className="size-1.5 rounded-full bg-primary" />
              </span>
              {t('Marked for review')}
            </li>
          </ul>
        </div>
      )}
    </section>
  )
}
