/**
 * Display layer for the Card Breakdown chart — centralized order, labels,
 * colours and tooltip definitions for the mutually exclusive card
 * classification in `status.ts`, plus the largest-remainder percentage
 * rounding that keeps a chart's segments summing to exactly 100%.
 */

import type { ExclusiveCounts, ExclusiveStatus } from './status.ts'

/** Display order (spec): New, Learning, Relearning, Young, Mature, Suspended, Buried. */
export const CARD_BREAKDOWN_ORDER: ExclusiveStatus[] = [
  'new',
  'learning',
  'relearning',
  'young',
  'mature',
  'suspended',
  'buried',
]

export interface CardCategoryMeta {
  status: ExclusiveStatus
  label: string
  colorVar: string
  tip: string
}

/** Centralized theme-safe colours + labels + tooltip definitions (one source of truth). */
export const CARD_BREAKDOWN_META: Record<ExclusiveStatus, CardCategoryMeta> = {
  new: {
    status: 'new',
    label: 'New',
    colorVar: 'var(--color-accent)',
    tip: 'Never studied yet.',
  },
  learning: {
    status: 'learning',
    label: 'Learning',
    colorVar: 'var(--color-warning)',
    tip: 'In its initial learning steps.',
  },
  relearning: {
    status: 'relearning',
    label: 'Relearning',
    colorVar: 'var(--color-primary-soft)',
    tip: 'Lapsed and being relearned.',
  },
  young: {
    status: 'young',
    label: 'Young',
    colorVar: 'var(--color-primary)',
    tip: 'Active review card with an interval under 21 days.',
  },
  mature: {
    status: 'mature',
    label: 'Mature',
    colorVar: 'var(--color-primary-strong)',
    tip: 'Active review card with an interval of at least 21 days.',
  },
  suspended: {
    status: 'suspended',
    label: 'Suspended',
    colorVar: 'var(--color-ink-3)',
    tip: 'Excluded from study until unsuspended.',
  },
  buried: {
    status: 'buried',
    label: 'Buried',
    colorVar: 'var(--color-line-2)',
    tip: 'Hidden until the next study day.',
  },
}

export interface CardBreakdownRow {
  status: ExclusiveStatus
  label: string
  colorVar: string
  count: number
  pct: number
}

export interface CardBreakdown {
  rows: CardBreakdownRow[]
  total: number
}

/** Rows in CARD_BREAKDOWN_ORDER with integer percentages that sum to exactly 100 (total>0). */
export function cardBreakdownRows(counts: ExclusiveCounts): CardBreakdown {
  const total = CARD_BREAKDOWN_ORDER.reduce((sum, status) => sum + counts[status], 0)

  const pcts = largestRemainderPercentages(
    CARD_BREAKDOWN_ORDER.map((status) => counts[status]),
    total,
  )

  const rows: CardBreakdownRow[] = CARD_BREAKDOWN_ORDER.map((status, i) => {
    const meta = CARD_BREAKDOWN_META[status]
    return {
      status,
      label: meta.label,
      colorVar: meta.colorVar,
      count: counts[status],
      pct: pcts[i]!,
    }
  })

  return { rows, total }
}

/**
 * Largest-remainder rounding: floor every share, then hand the leftover
 * points (100 minus the sum of floors) one at a time to the entries with the
 * largest fractional remainder, breaking ties by input order. A zero count
 * always floors to 0 and can only gain a point if every other remainder tie
 * is exhausted first, so it never receives a misleading non-zero share ahead
 * of a category that actually has cards — with distinct counts this cannot
 * happen because a 0-count entry's remainder is 0, the minimum possible.
 */
function largestRemainderPercentages(counts: number[], total: number): number[] {
  if (total === 0) return counts.map(() => 0)

  const raw = counts.map((count) => (count / total) * 100)
  const floors = raw.map((value) => Math.floor(value))
  const remainders = raw.map((value, i) => value - floors[i]!)

  let leftover = 100 - floors.reduce((sum, value) => sum + value, 0)

  const order = counts
    .map((_, i) => i)
    .sort((a, b) => remainders[b]! - remainders[a]! || a - b)

  const pcts = [...floors]
  for (const i of order) {
    if (leftover <= 0) break
    pcts[i]! += 1
    leftover -= 1
  }

  return pcts
}
