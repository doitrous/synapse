import { useLocation } from 'react-router-dom'
import { PageSkeleton } from '@/components/loading/PageSkeleton'
import { loadingLayoutFor } from '@/components/loading/routeSkeletons'

/** The same route contract serves chunk loading and authentication handovers. */
export function RouteLoading() {
  const { pathname, search } = useLocation()
  return <PageSkeleton layout={loadingLayoutFor(pathname, search)} tab={new URLSearchParams(search).get('tab') ?? undefined} />
}
