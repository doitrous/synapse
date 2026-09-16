import { Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TargetRing } from '@/components/ui/TargetRing'
import { useT } from '@/lib/i18n'

export interface BuilderSummaryProps {
  /** How many questions the current selection yields. */
  matching: number
  /** The whole pool it is drawn out of — the ring's denominator. */
  pool: number
  /** How many of the matching questions this sitting will actually serve. */
  count: number
  /** One line naming what has been chosen: the pool, the scope, the mode. */
  summary: string
  onStart: () => void
  /**
   * Blocks Start for a reason other than an empty pool — e.g. a mixed sitting
   * whose banks don't yet add up to the requested length. Defaults to
   * `matching === 0`, the original behaviour every other caller still gets.
   */
  disabled?: boolean
  /**
   * Renders the counter and Start button without their own panel chrome, so
   * they read as the tail of the section that hosts them rather than a second
   * card beneath it. The MCQ composer folds the count into the "Session" step
   * this way; every other caller keeps the standalone card.
   */
  embedded?: boolean
}

/**
 * What the composer adds up to, and the button that starts it.
 *
 * Every control on the left changes one number — how many questions this test
 * will contain — and that number was previously readable only at the very
 * bottom of a long panel. Here it stays on screen: a ring against the whole
 * bank on a wide screen, a fixed bar above the thumb on a narrow one, so a
 * student never has to scroll back to find out what they just built.
 */
export function BuilderSummary({ matching, pool, count, summary, onStart, disabled, embedded }: BuilderSummaryProps) {
  const t = useT()
  const serving = Math.min(count, matching)
  const empty = matching === 0
  const blocked = disabled ?? empty

  return (
    <>
      {/* Embedded: no card of its own — a rule sets it off from the controls
          above it inside the shared panel. Standalone: its own mist card. */}
      <div
        className={
          embedded
            ? 'mt-5 border-t border-line pt-5'
            : 'rounded-xl border border-mist-line bg-mist p-5 shadow-panel'
        }
      >
        <p className="text-[14px] font-semibold text-ink">{t('This test')}</p>
        <div className="mt-4 flex items-center gap-4">
          <TargetRing
            size={88}
            thickness={7}
            value={matching}
            max={Math.max(pool, 1)}
            aria-label={t('share of the bank this test can draw from')}
          />
          <div className="min-w-0">
            <p className="tnum font-mono text-[20px] font-semibold leading-none text-on-mist">
              {serving}
              <span className="text-[13px] font-medium text-ink-2"> / {matching}</span>
            </p>
            <p className="mt-1.5 text-[11.5px] leading-snug text-ink-2">
              {empty ? t('Nothing matches yet') : t('questions ready to serve')}
            </p>
          </div>
        </div>
        <p className="mt-4 border-t border-mist-line pt-4 text-[12.5px] leading-relaxed text-ink-2">{summary}</p>
        {/* Hidden on the wrapper, not the button: `Button` already carries
            `inline-flex`, and a `hidden` alongside it is a coin toss on which
            display utility the stylesheet emits last. */}
        <div className="mt-4 hidden lg:block">
          <Button variant="primary" size="md" iconLeft={Play} onClick={onStart} disabled={blocked} className="w-full">
            {t('Start test')}
          </Button>
        </div>
      </div>

      {/* Below `lg` the summary card scrolls away with the rest of the page, so
          the decision it carries is pinned above the thumb instead. */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3">
          <p className="min-w-0 text-[12.5px] text-ink-2">
            <span className="tnum font-mono text-[15px] font-semibold text-ink">{serving}</span>{' '}
            {empty ? t('questions match') : t('questions ready')}
          </p>
          <Button variant="primary" size="md" iconLeft={Play} onClick={onStart} disabled={blocked}>
            {t('Start test')}
          </Button>
        </div>
      </div>
    </>
  )
}
