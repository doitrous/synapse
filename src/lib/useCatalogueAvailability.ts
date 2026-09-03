import { useMemo } from 'react'
import { useContentBusy, useContentSummary } from './content'
import { catalogueAvailability, type CatalogueAvailability } from './catalogueAvailability'

/**
 * Whether a student surface built from the published catalogue has nothing to
 * show, has not loaded yet, or failed.
 *
 * Every student catalogue — library, question bank, practical — comes out of the
 * same content service, and each hook that reads it dropped the load status on
 * the floor and returned a bare array. This re-reads the status for callers that
 * only have the count. Re-subscribing costs nothing: the summary is one small,
 * shared, cached response.
 *
 * `useContentBusy` is the part that is not obvious. The summary is far smaller
 * than the slice a caller is counting, so it lands first — and a count of zero
 * taken at that moment reads as "nothing published" when the answer is simply
 * still in flight. Holding "not hydrated" until nothing is outstanding is what
 * keeps a loaded-but-empty surface from flashing its empty state.
 */
export function useCatalogueAvailability(itemCount: number): CatalogueAvailability {
  const [, status] = useContentSummary()
  const busy = useContentBusy()
  return useMemo(
    () => catalogueAvailability({
      statuses: [{ hydrated: status.hydrated && !busy, error: status.error }],
      itemCount,
    }),
    [itemCount, status, busy],
  )
}
