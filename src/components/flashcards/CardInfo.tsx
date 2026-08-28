import { useT } from '@/lib/i18n'
import { formatDateTime } from '@/lib/format'
import { Badge } from '@/components/ui/Badge'
import type { CardWithMeta } from '@/lib/useFlashcards'
import type { ReviewEvent } from '@/data/flashcards/model'
import { FLAG_META } from '@/data/flashcards/flag'
import { isBuried } from '@/data/flashcards/status'

/**
 * Scheduling data and the full review history for one card.
 *
 * Everything shown is read straight off the card's meta and the review log —
 * the same records the scheduler and stats use — so the panel is a window onto
 * the truth, not a second copy that could drift. The history lists manual
 * actions (reset, suspend, set-due) alongside grades, so "why is this card
 * new again" always has an answer on the screen.
 */
export function CardInfoBody({ entry, events }: { entry: CardWithMeta; events: ReviewEvent[] }) {
  const t = useT()
  const now = new Date()
  const { meta } = entry
  const s = meta.schedule
  const ordered = [...events].sort((a, b) => b.at.localeCompare(a.at))

  const rows: { label: string; value: string }[] = [
    { label: t('State'), value: t(stateLabel(s.state)) },
    { label: t('Due'), value: formatDateTime(new Date(s.due)) },
    { label: t('Interval'), value: s.state === 'review' ? `${s.interval} ${t('days')}` : '—' },
    { label: t('Ease'), value: `${Math.round(s.ease * 100)}%` },
    { label: t('Reviews'), value: String(meta.reviewCount) },
    { label: t('Lapses'), value: String(s.lapses) },
    { label: t('First reviewed'), value: meta.firstReviewedAt ? formatDateTime(new Date(meta.firstReviewedAt)) : t('never') },
    { label: t('Last reviewed'), value: meta.lastReviewedAt ? formatDateTime(new Date(meta.lastReviewedAt)) : t('never') },
  ]

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {meta.flag && <Badge tone="outline"><span className="me-1 inline-block size-2 rounded-full align-middle" style={{ backgroundColor: FLAG_META[meta.flag].token }} />{t(FLAG_META[meta.flag].label)}</Badge>}
        {meta.suspended && <Badge tone="warning">{t('Suspended')}</Badge>}
        {isBuried(meta, now) && <Badge tone="neutral">{t('Buried')}</Badge>}
        {meta.resetSinceReview && <Badge tone="neutral">{t('Reset')}</Badge>}
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] sm:grid-cols-4">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">{row.label}</dt>
            <dd className="tnum mt-0.5 font-mono text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Review history')}</p>
        {ordered.length === 0 ? (
          <p className="text-[12.5px] text-ink-3">{t('No reviews recorded yet.')}</p>
        ) : (
          <ul className="divide-y divide-line rounded-lg border border-line">
            {ordered.slice(0, 100).map((event) => (
              <li key={event.id} className="flex items-center justify-between gap-3 px-3 py-2 text-[12.5px]">
                <span className="flex items-center gap-2">
                  <span className="font-medium text-ink-2">{t(eventLabel(event))}</span>
                  {event.kind === 'grade' && event.grade && <Badge tone="outline">{t(gradeLabel(event.grade))}</Badge>}
                </span>
                <span className="flex items-center gap-3 text-ink-3">
                  {event.kind === 'grade' && (
                    <span className="tnum font-mono">{event.intervalBefore}d → {event.intervalAfter}d</span>
                  )}
                  <span className="tnum">{formatDateTime(new Date(event.at))}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function stateLabel(state: string): string {
  return { new: 'New', learning: 'Learning', relearning: 'Relearning', review: 'Review' }[state] ?? state
}
function eventLabel(event: ReviewEvent): string {
  return {
    grade: 'Graded', reset: 'Reset', 'set-due': 'Set due date', suspend: 'Suspended',
    unsuspend: 'Unsuspended', bury: 'Buried', unbury: 'Unburied',
  }[event.kind] ?? event.kind
}
function gradeLabel(grade: string): string {
  return { again: 'Again', hard: 'Hard', good: 'Good', easy: 'Easy' }[grade] ?? grade
}
