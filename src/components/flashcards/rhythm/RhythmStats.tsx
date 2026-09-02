import type { ReactNode } from 'react'
import { Tooltip } from '@/components/ui/Tooltip'
import { useT } from '@/lib/i18n'
import { formatMinutes } from '@/lib/format'
import { cn } from '@/lib/cn'
import type { RhythmStats as RhythmStatsData } from '@/data/flashcards/rhythm/rhythmTypes'
import type { RhythmSettings } from '@/data/flashcards/rhythm/rhythmSettings'

/**
 * The statistics strip along the bottom of the Study Rhythm panel.
 *
 * Every number here comes from the same filtered `RhythmDataset.stats` the
 * heatmap itself renders — nothing is recomputed, so a boundary change (scope,
 * exclusions, history/forecast window) updates the calendar and these figures
 * together by construction.
 *
 * It is one hairline row, not a grid of cards: these are a footer to the
 * heatmap, not seven objects competing with it. So there is no colour bar, no
 * mono, no uppercase and no per-group tint — a figure, a sentence-case label,
 * and a hairline between neighbours. The one cell that looks different is a
 * *forecast* one, which carries a faint tint and a leading `◌` on its label so
 * "estimated" still reads with the colour taken away.
 *
 * Below `lg` the same cells reflow into a grid (four columns, two below `sm`).
 * The hairlines follow: each cell decides, per breakpoint, whether it opens a
 * row (no inline-start rule) or starts a new one (a top rule). Each breakpoint
 * contributes exactly one class per edge, so the media-query cascade resolves
 * them and no two same-specificity rules ever fight over one property.
 */

interface StatSpec {
  key: string
  label: string
  value: ReactNode
  /** A small trailing qualifier on the figure: "d", "est.". */
  unit?: string
  tip: string
  /** Forecast figures: tinted and marked `◌`, so they read in monochrome too. */
  forecast?: boolean
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

  const specs: StatSpec[] = [
    {
      key: 'totalReviews',
      label: t('Total reviews'),
      value: stats.totalReviews,
      tip: t('Reviews completed in the visible range.'),
    },
    {
      key: 'activeDays',
      label: t('Active study days'),
      value: stats.activeDays,
      tip: t('Distinct days with a review in range.'),
    },
  ]

  if (stats.hasReviewTime) {
    specs.push({
      key: 'reviewTime',
      label: t('Review time'),
      value: formatMinutes(Math.round(stats.reviewTimeMs / 60_000)),
      tip: t('Total time spent reviewing in the visible range.'),
    })
  }

  specs.push(
    {
      key: 'currentStreak',
      label: t('Current streak'),
      value: stats.currentStreak,
      unit: t('d'),
      tip: t('Consecutive days studied, up to today.'),
    },
    {
      key: 'longestStreak',
      label: t('Longest streak'),
      value: stats.longestStreak,
      unit: t('d'),
      tip: t('Longest run of consecutive study days in range.'),
    },
    {
      key: 'dailyAverage',
      label: t('Daily average'),
      value: stats.dailyAverage.toFixed(1),
      tip: t('Reviews per active day.'),
    },
  )

  if (showForecast) {
    specs.push(
      {
        key: 'dueInForecast',
        label: t('Due in forecast'),
        value: stats.dueInForecast,
        forecast: true,
        tip: t('Review cards due within the forecast window.'),
      },
      {
        key: 'projectedNew',
        label: t('Projected new'),
        value: stats.projectedNewInForecast,
        unit: t('est.'),
        forecast: true,
        tip: t('Estimated new cards introduced in the forecast window — an estimate, not scheduled.'),
      },
    )
  }

  return (
    <div className={cn('grid grid-cols-2 border-t border-line sm:grid-cols-4 lg:flex lg:items-stretch', className)}>
      {specs.map((spec, index) => (
        <Stat key={spec.key} spec={spec} edges={edgeClasses(index)} />
      ))}
    </div>
  )
}

/** The hairlines around one cell: 2 columns below `sm`, 4 up to `lg`, then one row. */
function edgeClasses(index: number): string {
  return cn(
    index % 2 === 0 ? 'border-s-0' : 'border-s',
    index < 2 ? 'border-t-0' : 'border-t',
    index % 4 === 0 ? 'sm:border-s-0' : 'sm:border-s',
    index < 4 ? 'sm:border-t-0' : 'sm:border-t',
    index === 0 ? 'lg:border-s-0' : 'lg:border-s',
    'lg:border-t-0',
  )
}

function Stat({ spec, edges }: { spec: StatSpec; edges: string }) {
  return (
    <Tooltip
      label={spec.tip}
      className={cn('min-w-0 flex-1 border-line/60', spec.forecast && 'bg-mist/60', edges)}
    >
      <div
        tabIndex={0}
        className="flex w-full min-w-0 flex-col justify-center px-4 py-3 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
      >
        <p className="tnum flex items-baseline gap-1 text-[18px] font-semibold leading-tight tracking-[-0.02em] text-ink">
          {spec.value}
          {spec.unit && <span className="text-[11.5px] font-medium tracking-normal text-ink-3">{spec.unit}</span>}
        </p>
        <p className="truncate text-[11.5px] text-ink-3">
          {spec.forecast && <span aria-hidden>◌ </span>}
          {spec.label}
        </p>
      </div>
    </Tooltip>
  )
}
