import { useMemo } from 'react'
import { dueReviewItems } from '@/data/reviewQueue'
import { useMastery } from '@/lib/useMastery'

/** How many concepts one review session covers. */
const REVIEW_BATCH = 12

/**
 * How many concepts are waiting in the review queue, and where "start review"
 * on them goes — the number `TodaysTarget`'s "Reviews due today" fact quotes,
 * kept here so it reads from the exact same query the review queue is built
 * from.
 */
export function useDueReviewSummary() {
  const { ledger, loading, status } = useMastery()
  return useMemo(() => {
    const items = dueReviewItems(ledger)
    const batch = items.slice(0, REVIEW_BATCH).map((item) => item.conceptId).join(',')
    return {
      loading,
      error: status.error,
      count: items.length,
      startHref: batch ? `/app/qbank?concepts=${encodeURIComponent(batch)}` : '/app/qbank',
    }
  }, [ledger, loading, status.error])
}
