import type { ReactNode } from 'react'
import { Tooltip } from '@/components/ui/Tooltip'
import { useT } from '@/lib/i18n'
import { formatMinutes } from '@/lib/format'
import { cn } from '@/lib/cn'
import type { RhythmStats as RhythmStatsData } from '@/data/flashcards/rhythm/rhythmTypes'
import type { RhythmSettings } from '@/data/flashcards/rhythm/rhythmSettings'

/**
 * The balanced statistics grid shown beneath the Study Rhythm heatmap.
 *
 * Every number here comes from the same filtered `RhythmDataset.stats` the
 * heatmap itself renders — nothing is recomputed, so a boundary change (scope,
 * exclusions, history/forecast window) updates the calendar and these cards
 * together by construction.
 *
 * Cards are grouped by MEANING with a restrained tint (a thin colour
 * indicator + a tinted label, never a saturated fill) so the grouping reads
 * even in monochrome — the label text and the group's spatial adjacency
 * already carry the meaning; colour is a bonus cue, not the only one.
 */

type StatGroup = 'history' | 'streak' | 'average' | 'future'

/** Theme-safe tokens per the design brief; read as CSS custom properties so
 *  they resolve correctly in light, dark and warm palettes without a rebuild. */
const GROUP_TINT: Record<StatGroup, string> = {
  history: 'var(--color-accent)',
  streak: 'var(--color-primary)',
  average: 'var(--color-primary-soft)',
  future: 'var(--color-warning)',
}

interface CardSpec {
  key: string
  group: StatGroup
  label: string
  value: ReactNode
  tip: string
  sub?: ReactNode
}

export function RhythmStats({
  stats,
  settings,
  className,
}: {
  stats: RhythmStatsData
  settings: RhythmSettings
  className?: string
}) {
  const t = useT()
  const showForecast = settings.forecastLimit !== 'off'

  const cards: CardSpec[] = [
    {
      key: 'totalReviews',
      group: 'history',
      label: t('Total reviews'),
      value: stats.totalReviews,
      tip: t('Reviews completed in the visible range.'),
    },
    {
      key: 'activeDays',
      group: 'history',
      label: t('Active study days'),
      value: stats.activeDays,
      tip: t('Distinct days with a review in range.'),
    },
  ]

  if (stats.hasReviewTime) {
    cards.push({
      key: 'reviewTime',
      group: 'history',
      label: t('Review time'),
      value: formatMinutes(Math.round(stats.reviewTimeMs / 60_000)),
      tip: t('Total time spent reviewing in the visible range.'),
    })
  }

  cards.push(
    {
      key: 'currentStreak',
      group: 'streak',
      label: t('Current streak'),
      value: `${stats.currentStreak} ${t('d')}`,
      tip: t('Consecutive days studied, up to today.'),
    },
    {
      key: 'longestStreak',
      group: 'streak',
      label: t('Longest streak'),
      value: `${stats.longestStreak} ${t('d')}`,
      tip: t('Longest run of consecutive study days in range.'),
    },
    {
      key: 'dailyAverage',
      group: 'average',
      label: t('Daily average'),
      value: stats.dailyAverage.toFixed(1),
      tip: t('Reviews per active day.'),
    },
  )

  if (showForecast) {
    cards.push(
      {
        key: 'dueInForecast',
        group: 'future',
        label: t('Due in forecast'),
        value: stats.dueInForecast,
        tip: t('Review cards due within the forecast window.'),
      },
      {
        key: 'projectedNew',
        group: 'future',
        label: t('Projected new'),
        value: stats.projectedNewInForecast,
        sub: t('est.'),
        tip: t('Estimated new cards introduced in the forecast window — an estimate, not scheduled.'),
      },
    )
  }

  return (
    <div className={cn('grid auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6', className)}>
      {cards.map((card) => (
        <StatCard key={card.key} tint={GROUP_TINT[card.group]} label={card.label} value={card.value} sub={card.sub} tip={card.tip} />
      ))}
    </div>
  )
}

function StatCard({
  label,
  value,
  sub,
  tip,
  tint,
}: {
  label: string
  value: ReactNode
  sub?: ReactNode
  tip: string
  tint: string
}) {
  return (
    <Tooltip label={tip}>
      <div
        tabIndex={0}
        className="relative flex h-full flex-col rounded-lg border border-line bg-surface py-3 pe-3.5 ps-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span aria-hidden className="absolute inset-y-2.5 start-1.5 w-[3px] rounded-full" style={{ backgroundColor: tint }} />
        <p className="text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ color: tint }}>
          {label}
        </p>
        <p className="tnum mt-1 font-mono text-[19px] font-semibold text-ink">{value}</p>
        {sub !== undefined && <p className="tnum mt-0.5 text-[11px] font-medium uppercase tracking-[0.04em] text-ink-3">{sub}</p>}
      </div>
    </Tooltip>
  )
}
