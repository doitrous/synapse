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
 *
 * But `busy` is *global* — it is true while any content request anywhere is in
 * flight, so an unrelated fetch (the topic chooser's article index, another
 * tab's slice) would hold this surface on its skeleton even though the data it
 * counts has already landed. The count itself is the tell: a count above zero
 * can only have come from a slice that is already in hand, so there is nothing
 * left to wait for — paint it. Only a *zero* count still needs `busy`, because
 * that is the one case the caller's own data cannot yet distinguish
 * ("nothing published" vs "not here yet").
 */
export function useCatalogueAvailability(itemCount: number): CatalogueAvailability {
  const [, status] = useContentSummary()
  const busy = useContentBusy()
  return useMemo(
    () => catalogueAvailability({
      statuses: [{ hydrated: status.hydrated && (itemCount > 0 || !busy), error: status.error }],
      itemCount,
    }),
    [itemCount, status, busy],
  )
}
