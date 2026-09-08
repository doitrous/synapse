import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { InitialReadContext } from '@/lib/initialReadContext'
import { initialLoadState } from '@/lib/loadingState'
import type { DocumentStatus } from '@/lib/catalogueAvailability'
import { PageSkeleton } from './PageSkeleton'
import { LoadingError } from './LoadingError'
import type { LoadingLayout } from './routeSkeletons'

/**
 * Keep the page mounted so its hooks can finish reading. Its real controls are
 * inert until the initial documents arrive; saving and later revalidation never
 * hide the page. Shared hooks report here even when a page doesn't read status.
 */
export function InitialReadBoundary({ children, layout, tab }: { children: ReactNode; layout: LoadingLayout; tab?: string }) {
  const reads = useRef(new Map<string, DocumentStatus>())
  const settled = useRef(false)
  const [load, setLoad] = useState({ loading: false, error: null as DocumentStatus['error'] })
  const report = useCallback((id: string, status: DocumentStatus | null) => {
    if (settled.current) return
    if (status) reads.current.set(id, status)
    else reads.current.delete(id)
    const next = initialLoadState(...reads.current.values())
    setLoad(previous => previous.loading === next.loading && previous.error === next.error ? previous : next)
  }, [])
  useEffect(() => {
    if (load.loading || load.error) return
    // Let dependent children mount and register their reads before declaring
    // the page ready. No artificial delay is added to the visible content.
    const frame = requestAnimationFrame(() => {
      const current = initialLoadState(...reads.current.values())
      if (!current.loading && !current.error) settled.current = true
    })
    return () => cancelAnimationFrame(frame)
  }, [load.loading, load.error])
  const waiting = load.loading || Boolean(load.error)
  return <InitialReadContext.Provider value={report}>
    <div className="relative min-w-0">
      {waiting && (load.error ? <div className="p-4 sm:p-6"><LoadingError /></div> : <PageSkeleton layout={layout} tab={tab} />)}
      <div className={waiting ? 'invisible absolute inset-x-0 top-0 pointer-events-none' : undefined} inert={waiting || undefined} aria-hidden={waiting || undefined}>{children}</div>
    </div>
  </InitialReadContext.Provider>
}
