import { useEffect, useState } from 'react'
import { PageContainer } from '@/components/shell/Page'
import { Skeleton, SkeletonCard } from '@/components/ui/Skeleton'

/**
 * What a surface looks like while its chunk is still arriving.
 *
 * A blank page reads as broken; a spinner floating alone reads as not much
 * better once it has been on screen a moment. This shows the one shape every
 * page shares — a header bar and a few cards, in the same padded container
 * every page renders into — rather than promising a specific layout it might
 * not have. It is a placeholder for "a page is arriving here", not a preview
 * of the destination.
 *
 * The 120 ms gate stays: with route chunks prefetched on hover, most loads
 * finish before it fires and show nothing at all, which is better than a
 * skeleton that blinks.
 */
export function RouteLoading() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 120)
    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div role="status" aria-busy="true">
      <PageContainer>
        <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </PageContainer>
    </div>
  )
}
