import { cn } from '@/lib/cn'
import { pct } from '@/lib/format'
import { useT } from '@/lib/i18n'
import { Tooltip } from '@/components/ui/Tooltip'
import { CARD_BREAKDOWN_META, cardBreakdownRows } from '@/data/flashcards/cardBreakdown'
import type { ExclusiveCounts } from '@/data/flashcards/status'

/**
 * The mutually-exclusive card distribution (`exclusiveCounts`) rendered as a
 * compact segmented bar with an aligned legend/table underneath. The table is
 * not decorative — it is the accessible text equivalent of the bar, so a
 * screen-reader user reaches the same seven-way split a sighted user reads
 * off the colour segments, and colour is never the only signal (every row
 * carries its label and count regardless of the marker).
 *
 * Percentages are taken verbatim from `cardBreakdownRows` (largest-remainder
 * rounding, already sums to 100 for a non-empty deck) and never recomputed
 * here.
 */
export function CardBreakdown({ counts, className }: { counts: ExclusiveCounts; className?: string }) {
  const t = useT()
  const { rows, total } = cardBreakdownRows(counts)

  if (total === 0) {
    return (
      <div className={cn('py-1 text-[12.5px] text-ink-3', className)}>{t('No cards in this deck yet.')}</div>
    )
  }

  // A category only earns a bar segment once it rounds to a visible share —
  // a zero (or rounded-to-zero) count would otherwise draw a zero-width
  // sliver. The legend below still lists every category, zeros included.
  const segments = rows.filter((row) => row.pct > 0)
  const barLabel = `${t('Card breakdown')}: ${segments
    .map((row) => `${t(row.label)} ${row.count} (${pct(row.pct)})`)
    .join(', ')}`

  return (
    <div className={cn('space-y-3', className)}>
      <div role="img" aria-label={barLabel} className="flex h-3.5 w-full overflow-hidden rounded-full bg-inset">
        {segments.map((row, i) => (
          <div
            key={row.status}
            style={{ width: `${row.pct}%`, backgroundColor: row.colorVar }}
            className={cn(i > 0 && 'border-s border-line')}
          />
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[15rem] border-collapse text-[12.5px]">
          <caption className="sr-only">{t('Card breakdown by state')}</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">{t('Category')}</th>
              <th scope="col">{t('Count')}</th>
              <th scope="col">{t('Share')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => {
              const meta = CARD_BREAKDOWN_META[row.status]
              return (
                <tr key={row.status} className="h-8">
                  <th scope="row" className="py-1 pe-3 text-start font-normal text-ink">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="size-2.5 shrink-0 rounded-sm"
                        style={{ backgroundColor: row.colorVar }}
                        aria-hidden
                      />
                      <Tooltip label={meta.tip}>
                        <span
                          tabIndex={0}
                          className="whitespace-nowrap rounded-sm underline decoration-dotted decoration-ink-3/60 underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        >
                          {t(row.label)}
                        </span>
                      </Tooltip>
                    </span>
                  </th>
                  <td className="tnum w-12 whitespace-nowrap py-1 ps-2 text-end font-mono text-ink">
                    {row.count}
                  </td>
                  <td className="tnum w-14 whitespace-nowrap py-1 ps-2 text-end text-ink-3">{pct(row.pct)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="tnum text-[12px] text-ink-3">
        {t('Total')}: <span className="font-mono text-ink">{total}</span>
      </p>
    </div>
  )
}
