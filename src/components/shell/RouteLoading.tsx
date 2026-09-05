import { useEffect, useState, type ReactElement } from 'react'
import { PageContainer } from '@/components/shell/Page'
import { Skeleton, SkeletonCard } from '@/components/ui/Skeleton'

/**
 * The set of page shapes a route can wear while its chunk is still arriving.
 *
 * A skeleton is honest only when it matches the shape that replaces it, so
 * rather than one generic placeholder for every page, each route names the
 * archetype its first painted view actually is. `page` is the default and fits
 * the majority (header + a grid of cards); the rest exist because those pages
 * open on a genuinely different shape — a two-pane workspace, a full canvas, a
 * chart-led report, a form.
 *
 * New pages: pick the closest variant in the route table (router.tsx). Leaving
 * it unset gets `page`, which is the right answer for most.
 */
export type RouteSkeleton = 'page' | 'dashboard' | 'stats' | 'list' | 'form' | 'split' | 'canvas'

/** Header bar every PageContainer page opens with: a title and (usually) an action. */
function HeaderBar({ action = true }: { action?: boolean }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-4 sm:mb-6">
      <div className="min-w-0">
        <Skeleton className="h-7 w-52 sm:h-8" />
        <Skeleton className="mt-2 h-3.5 w-72 max-w-full" />
      </div>
      {action && <Skeleton className="h-9 w-28" />}
    </div>
  )
}

/** A row of filter chips / a search box, as most list and catalogue pages carry. */
function Toolbar() {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <Skeleton className="h-9 w-full max-w-xs" />
      <Skeleton className="h-9 w-20" />
      <Skeleton className="h-9 w-20" />
    </div>
  )
}

function CardsBody() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}

function ListBody() {
  return (
    <div className="flex flex-col gap-2.5">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3.5">
          <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
          <div className="min-w-0 flex-1">
            <Skeleton className="h-3.5 w-1/3" />
            <Skeleton className="mt-1.5 h-3 w-2/3" />
          </div>
          <Skeleton className="h-8 w-16 shrink-0" />
        </div>
      ))}
    </div>
  )
}

function StatTiles() {
  return (
    <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="rounded-xl border border-line bg-surface p-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-3 h-7 w-16" />
        </div>
      ))}
    </div>
  )
}

/** A panel with a titled header and a tall chart body, like the report pages. */
function ChartPanel() {
  return (
    <div className="rounded-xl border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line p-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="flex h-52 items-end gap-1.5 p-5">
        {Array.from({ length: 24 }, (_, i) => (
          <Skeleton key={i} className="flex-1 rounded-t-sm" style={{ height: `${25 + ((i * 37) % 70)}%` }} />
        ))}
      </div>
    </div>
  )
}

const VARIANTS: Record<RouteSkeleton, () => ReactElement> = {
  page: () => (
    <PageContainer>
      <HeaderBar />
      <CardsBody />
    </PageContainer>
  ),
  list: () => (
    <PageContainer>
      <HeaderBar />
      <Toolbar />
      <ListBody />
    </PageContainer>
  ),
  stats: () => (
    <PageContainer>
      <HeaderBar />
      <StatTiles />
      <ChartPanel />
    </PageContainer>
  ),
  dashboard: () => (
    <PageContainer>
      <div className="mx-auto flex max-w-[60rem] flex-col items-center gap-6 py-4 sm:py-8">
        <Skeleton className="h-52 w-full rounded-2xl" />
        <div className="grid w-full gap-4 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    </PageContainer>
  ),
  form: () => (
    <PageContainer>
      <HeaderBar action={false} />
      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-2 h-10 w-full" />
          </div>
        ))}
        <Skeleton className="h-10 w-32 self-end" />
      </div>
    </PageContainer>
  ),
  // Full-bleed two-pane workspace: a navigator rail beside the main surface.
  split: () => (
    <div className="flex h-[calc(100dvh-3.5rem)] min-h-0">
      <div className="hidden w-72 shrink-0 flex-col gap-2 border-e border-line p-4 sm:flex">
        <Skeleton className="h-9 w-full" />
        {Array.from({ length: 10 }, (_, i) => <Skeleton key={i} className="h-7 w-full" />)}
      </div>
      <div className="min-w-0 flex-1 p-5 sm:p-8">
        <Skeleton className="h-6 w-1/3" />
        <div className="mt-4 flex flex-col gap-3">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} className={i % 4 === 3 ? 'h-3.5 w-2/3' : 'h-3.5 w-full'} />
          ))}
        </div>
      </div>
    </div>
  ),
  // A full-screen stage with a thin tool strip — boards and canvases.
  canvas: () => (
    <div className="flex h-[calc(100dvh-3.5rem)] min-h-0 flex-col">
      <div className="flex items-center gap-2 border-b border-line p-3">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="ms-auto h-8 w-24" />
      </div>
      <div className="grid flex-1 place-items-center p-6">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    </div>
  ),
}

/**
 * What a surface looks like while its chunk is still arriving.
 *
 * The 120 ms gate stays: with route chunks prefetched on hover, most loads
 * finish before it fires and show nothing at all, which is better than a
 * skeleton that blinks.
 */
export function RouteLoading({ variant = 'page' }: { variant?: RouteSkeleton }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 120)
    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div role="status" aria-busy="true">
      {VARIANTS[variant]()}
    </div>
  )
}
