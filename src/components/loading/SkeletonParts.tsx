import type { ReactNode } from 'react'
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/** All loading shapes are decorative; announce the region once, never every bar. */
export function LoadingRegion({ children, label = 'Loading', className, name }: { children: ReactNode; label?: string; className?: string; name?: string }) {
  const t = useT()
  return <div role="status" aria-busy="true" aria-label={t(label)} className={cn('min-w-0', className)} data-skeleton={name}>
    <span className="sr-only">{t(label)}</span><div aria-hidden="true" className="h-full">{children}</div>
  </div>
}

export function SkeletonHeader({ back = false, description = false, actions = 0 }: { back?: boolean; description?: boolean; actions?: number }) {
  return <div className="mb-5 space-y-3 sm:mb-6">
    {back && <Skeleton className="h-4 w-16" />}
    <div className="flex flex-wrap items-center justify-between gap-3"><div className="min-w-0 space-y-2"><Skeleton className="h-8 w-48 max-w-full" />{description && <Skeleton className="h-3 w-72 max-w-full" />}</div><div className="flex gap-2">{Array.from({ length: actions }, (_, i) => <Skeleton key={i} className="h-11 w-24 sm:h-9" />)}</div></div>
  </div>
}
export function SkeletonTabs({ count = 4 }: { count?: number }) {
  return <div className="mb-4 flex flex-wrap gap-2">{Array.from({ length: count }, (_, i) => <Skeleton key={i} className="h-11 w-24 sm:h-9" />)}</div>
}
export function SkeletonToolbar({ filters = 2 }: { filters?: number }) {
  return <div className="mb-4 flex flex-wrap gap-2"><Skeleton className="h-11 w-full max-w-xs sm:h-9" />{Array.from({ length: filters }, (_, i) => <Skeleton key={i} className="h-11 w-24 sm:h-9" />)}</div>
}
export function SkeletonPanel({ children, title = true, className }: { children: ReactNode; title?: boolean; className?: string }) {
  return <div className={cn('min-w-0 rounded-xl border border-line bg-surface', className)}>{title && <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3"><Skeleton className="h-4 w-36" /><Skeleton className="h-8 w-20" /></div>}{children}</div>
}
export function SkeletonRows({ rows = 5, icon = true, action = true }: { rows?: number; icon?: boolean; action?: boolean }) {
  return <div className="divide-y divide-line">{Array.from({ length: rows }, (_, i) => <div key={i} className="flex items-center gap-3 px-4 py-3.5">{icon && <Skeleton className="size-9 shrink-0" />}<div className="min-w-0 flex-1 space-y-2"><Skeleton className={i % 2 ? 'h-3.5 w-3/4' : 'h-3.5 w-2/3'} /><Skeleton className="h-3 w-1/2" /></div>{action && <Skeleton className="h-8 w-16 shrink-0" />}</div>)}</div>
}
export function SkeletonFields({ fields = 4, columns = 1 }: { fields?: number; columns?: 1 | 2 }) {
  return <div className={cn('grid gap-4 p-5', columns === 2 && 'sm:grid-cols-2')}>{Array.from({ length: fields }, (_, i) => <div key={i} className="min-w-0 space-y-2"><Skeleton className="h-3 w-24" /><Skeleton className="h-11 w-full sm:h-9" /></div>)}<Skeleton className="h-11 w-28 sm:h-9" /></div>
}
export function SkeletonMetrics({ count = 4 }: { count?: number }) {
  return <div className={cn('mb-4 grid grid-cols-2 gap-3', count === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4')}>{Array.from({ length: count }, (_, i) => <SkeletonPanel key={i} title={false} className="space-y-3 p-4"><Skeleton className="h-3 w-24 max-w-full" /><Skeleton className="h-7 w-16" /><Skeleton className="h-3 w-3/4" /></SkeletonPanel>)}</div>
}
export function SkeletonTable({ rows = 7, columns = 4 }: { rows?: number; columns?: number }) {
  return <SkeletonPanel title={false}><div className="grid gap-4 border-b border-line bg-surface-2 p-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` }}>{Array.from({ length: columns }, (_, i) => <Skeleton key={i} className="h-3 w-2/3" />)}</div>{Array.from({ length: rows }, (_, i) => <div key={i} className="grid gap-4 border-b border-line p-4 last:border-0" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` }}>{Array.from({ length: columns }, (_, j) => <Skeleton key={j} className={j === 0 ? 'h-4 w-full' : 'h-4 w-2/3'} />)}</div>)}</SkeletonPanel>
}
export function SkeletonFeatureCards({ count = 6, columns = 2, media = false }: { count?: number; columns?: 2 | 3; media?: boolean }) {
  return <div className={cn('grid gap-4 sm:grid-cols-2', columns === 3 && 'xl:grid-cols-3')}>{Array.from({ length: count }, (_, i) => <SkeletonPanel key={i} title={false} className="space-y-4 p-5">{media ? <><Skeleton className="aspect-[16/9] w-full" /><Skeleton className="h-5 w-2/3" /><SkeletonText lines={2} /></> : <div className="flex items-start gap-3"><Skeleton className="size-10 shrink-0" /><div className="min-w-0 flex-1 space-y-2"><Skeleton className="h-5 w-3/4" /><SkeletonText lines={2} /></div><Skeleton className="size-4 shrink-0" /></div>}<div className="flex items-center justify-between gap-4 border-t border-line pt-3"><Skeleton className="size-12 shrink-0 rounded-full" /><div className="flex min-w-0 flex-1 justify-end gap-4"><Skeleton className="h-8 w-16" /><Skeleton className="h-8 w-16" /></div></div></SkeletonPanel>)}</div>
}
export function SkeletonChart() {
  return <SkeletonPanel><div className="flex h-52 items-end gap-3 p-5"><div className="flex h-full flex-col justify-between"><Skeleton className="h-3 w-6" /><Skeleton className="h-3 w-6" /><Skeleton className="h-3 w-6" /></div><Skeleton className="h-full min-w-0 flex-1 rounded-none" /></div></SkeletonPanel>
}
