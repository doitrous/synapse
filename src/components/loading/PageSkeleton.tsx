import { PageContainer } from '@/components/shell/Page'
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import { DashboardSkeleton } from './DashboardSkeletons'
import { LoadingRegion, SkeletonChart, SkeletonFeatureCards, SkeletonFields, SkeletonHeader, SkeletonMetrics, SkeletonPanel, SkeletonRows, SkeletonTable, SkeletonTabs, SkeletonToolbar } from './SkeletonParts'
import type { LoadingLayout, PageShape } from './routeSkeletons'

export function TasksSkeleton() {
  return <SkeletonPanel><div className="space-y-4 p-3 sm:p-4"><div className="flex gap-2"><Skeleton className="h-11 flex-1 sm:h-9" /><Skeleton className="h-11 w-20 sm:h-9" /></div><div className="flex gap-2"><Skeleton className="h-11 flex-1 sm:h-8" /><Skeleton className="h-11 w-20 sm:h-8" /></div><Skeleton className="h-4 w-28" />{[0, 1, 2, 3].map(i => <div key={i} className="flex items-start gap-3 border-t border-line py-3"><Skeleton className="size-5 shrink-0" /><div className="min-w-0 flex-1 space-y-2"><Skeleton className="h-3.5 w-full" /><Skeleton className="h-3 w-20" /></div><Skeleton className="size-5 shrink-0" /></div>)}</div></SkeletonPanel>
}
export function CalendarSkeleton({ toolbar = true, pane = 'calendar', view = 'month' }: { toolbar?: boolean; pane?: string; view?: string }) {
  return <>{toolbar && <SkeletonPanel title={false} className="mb-4 p-3"><div className="flex flex-wrap gap-2"><Skeleton className="h-9 min-w-0 basis-full md:flex-1 md:basis-auto" /><Skeleton className="h-9 w-28" /><Skeleton className="h-9 w-20" /><Skeleton className="h-9 w-24" /></div><div className="mt-2 flex gap-2 border-t border-line pt-2 xl:hidden"><Skeleton className="h-11 w-36" /><Skeleton className="ms-auto h-11 w-28" /></div></SkeletonPanel>}<div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_21rem]"><SkeletonPanel title={false} className={cn('overflow-hidden', pane === 'tasks' && 'hidden xl:block')}><div className="grid grid-cols-7 border-b border-line bg-surface-2 p-3">{Array.from({ length: 7 }, (_, i) => <Skeleton key={i} className="h-3 w-2/3" />)}</div><div className="grid grid-cols-7">{Array.from({ length: view === 'week' ? 7 : 42 }, (_, i) => <div key={i} className={cn('min-w-0 border-b border-e border-line p-2', view === 'week' ? 'h-[34rem]' : 'h-16 sm:h-28')}><Skeleton className="ms-auto size-3" />{i % 4 === 1 && <Skeleton className="mt-3 h-4 w-full" />}</div>)}</div></SkeletonPanel><div className={cn(pane !== 'tasks' && 'hidden xl:block')}><TasksSkeleton /></div></div></>
}
export function QbankSkeleton({ header = true }: { header?: boolean }) {
  return <>{header && <SkeletonHeader />}<Skeleton className="mb-2 h-4 w-28" /><SkeletonTabs /><Skeleton className="mb-5 h-3 w-72 max-w-full" /><SkeletonTabs count={2} /><div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
    <div className="space-y-4">
      <SkeletonPanel title={false} className="p-5"><Skeleton className="mb-4 h-4 w-28" /><SkeletonTabs /><Skeleton className="h-3 w-2/3" /></SkeletonPanel>
      <SkeletonPanel title={false} className="flex items-center justify-between p-5"><Skeleton className="h-5 w-36" /><Skeleton className="size-4" /></SkeletonPanel>
      <SkeletonPanel title={false} className="p-5"><Skeleton className="mb-4 h-4 w-24" /><div className="overflow-hidden rounded-lg border border-line"><div className="flex flex-wrap gap-2 p-3"><Skeleton className="h-9 min-w-0 flex-1" /><Skeleton className="h-9 w-36" /></div><div className="flex items-center gap-3 border-y border-line p-3"><Skeleton className="size-5" /><Skeleton className="h-3 w-32" /><Skeleton className="ms-auto h-6 w-24" /></div><SkeletonRows rows={3} action={false} /><div className="border-t border-line bg-surface-2 p-3"><Skeleton className="h-3 w-3/4" /></div></div><Skeleton className="mt-3 h-3 w-2/3" /></SkeletonPanel>
      <SkeletonPanel title={false} className="space-y-4 p-5"><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-28" /><Skeleton className="h-9 w-full" /><Skeleton className="h-3 w-1/2" /><div className="grid gap-5 pt-3 sm:grid-cols-2">{[0, 1].map(i => <div key={i} className="space-y-3"><Skeleton className="h-3 w-28" /><Skeleton className="h-9 w-3/4" /><Skeleton className="h-3 w-full" /></div>)}</div></SkeletonPanel>
    </div>
    <div className="space-y-4">
      <SkeletonPanel title={false} className="space-y-5 p-5"><Skeleton className="h-4 w-24" /><div className="flex items-center gap-4"><Skeleton className="size-[88px] shrink-0 rounded-full" /><div className="min-w-0 flex-1 space-y-3"><Skeleton className="h-6 w-20" /><Skeleton className="h-3 w-full" /></div></div><div className="border-t border-line pt-4"><Skeleton className="h-3 w-full" /><Skeleton className="mt-5 h-11 w-full sm:h-9" /></div></SkeletonPanel>
      <SkeletonPanel><div className="space-y-5 p-5"><Skeleton className="h-9 w-full" /><div className="flex items-center gap-4"><Skeleton className="size-[76px] shrink-0 rounded-full" /><div className="min-w-0 flex-1 space-y-2"><Skeleton className="h-3 w-24" /><Skeleton className="h-5 w-20" /><Skeleton className="h-3 w-16" /></div></div><div className="grid grid-cols-3 gap-2 border-t border-line pt-4">{[0, 1, 2].map(i => <Skeleton key={i} className="h-16 w-full" />)}</div><div className="space-y-3 border-t border-line pt-4"><Skeleton className="h-3 w-24" /><div className="grid grid-cols-7 gap-1">{Array.from({ length: 7 }, (_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div></div><div className="border-t border-line pt-4"><Skeleton className="h-3 w-36" /><SkeletonRows rows={5} icon={false} action={false} /></div></div></SkeletonPanel>
    </div>
  </div></>
}
export function QuestionSkeleton() {
  return <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]"><SkeletonPanel><div className="space-y-4 p-5"><SkeletonText lines={4} />{[0, 1, 2, 3].map(i => <div key={i} className="flex items-center gap-3 rounded-lg border border-line p-3"><Skeleton className="size-6 shrink-0 rounded-full" /><Skeleton className="h-4 flex-1" /></div>)}<Skeleton className="h-11 w-32" /></div></SkeletonPanel><SkeletonPanel><SkeletonRows rows={4} /></SkeletonPanel></div>
}
export function FlashcardRhythmSkeleton() {
  return <SkeletonPanel><div className="space-y-5 p-4"><div className="flex justify-between"><Skeleton className="h-3 w-36" /><Skeleton className="h-3 w-10" /></div><div className="overflow-hidden py-1"><div className="mx-auto flex w-max gap-[3px]">{Array.from({ length: 18 }, (_, i) => <div key={i} className="space-y-[3px]">{Array.from({ length: 7 }, (_, j) => <Skeleton key={j} className="size-[13px] rounded-[2px]" />)}</div>)}</div></div><Skeleton className="mx-auto h-3 w-44" /><div className="flex justify-between"><Skeleton className="h-3 w-36" /><Skeleton className="h-3 w-28" /></div></div><div className="grid grid-cols-2 border-t border-line sm:grid-cols-4 lg:grid-cols-7">{Array.from({ length: 7 }, (_, i) => <div key={i} className="space-y-2 border-e border-line px-4 py-3"><Skeleton className="h-5 w-10" /><Skeleton className="h-3 w-full" /></div>)}</div></SkeletonPanel>
}
export function DecksSkeleton() {
  return <div className="space-y-5"><SkeletonPanel><SkeletonRows rows={1} /></SkeletonPanel><SkeletonPanel><SkeletonRows rows={2} /></SkeletonPanel><FlashcardRhythmSkeleton /></div>
}
export function RoomCardsSkeleton({ count = 2 }: { count?: number }) {
  return <div className="grid gap-3 sm:grid-cols-2">{Array.from({ length: count }, (_, i) => <SkeletonPanel key={i} title={false} className="space-y-3 p-4"><Skeleton className="h-5 w-2/3" /><Skeleton className="h-3 w-1/2" /><div className="flex justify-between"><Skeleton className="h-3 w-20" /><Skeleton className="h-3 w-10" /></div><Skeleton className="h-2 w-full" /><Skeleton className="h-9 w-full" /></SkeletonPanel>)}</div>
}
function RoomSkeleton() {
  return <div className="space-y-4"><SkeletonToolbar /><SkeletonPanel title={false} className="relative grid min-h-[60dvh] place-items-center p-8"><div className="grid w-full max-w-xl grid-cols-3 gap-6">{Array.from({ length: 9 }, (_, i) => <Skeleton key={i} className="aspect-square w-full rounded-full" />)}</div><div className="absolute inset-x-4 bottom-4 flex justify-center gap-2">{[0, 1, 2, 3].map(i => <Skeleton key={i} className="h-11 w-20" />)}</div></SkeletonPanel></div>
}
export function AtlasSkeleton({ stageOnly = false }: { stageOnly?: boolean }) {
  if (stageOnly) return <div className="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden><div className="flex h-3/5 w-1/4 max-w-40 flex-col items-center gap-2"><Skeleton className="aspect-square w-1/3 rounded-full" /><Skeleton className="w-full flex-1 rounded-[35%]" /><div className="flex h-2/5 w-2/3 gap-3"><Skeleton className="h-full flex-1 rounded-full" /><Skeleton className="h-full flex-1 rounded-full" /></div></div></div>
  return <div className="px-2 py-2 sm:px-3"><SkeletonHeader /><SkeletonPanel title={false} className="relative min-h-[680px] h-[calc(100dvh-122px)] overflow-hidden"><div className="absolute inset-x-3 top-3 flex flex-wrap justify-end gap-2"><Skeleton className="h-10 w-36" /><Skeleton className="h-10 w-72 max-w-full" /><Skeleton className="h-10 w-20" /></div><div className="absolute start-3 top-16 hidden w-56 md:block"><SkeletonPanel><SkeletonRows rows={10} action={false} /></SkeletonPanel></div><AtlasSkeleton stageOnly /><div className="absolute inset-x-3 bottom-9 mx-auto max-w-[620px]"><Skeleton className="h-14 w-full" /></div></SkeletonPanel></div>
}
function WorkspaceSkeleton({ kind }: { kind: 'reader' | 'notebook' | 'whiteboard' }) {
  if (kind === 'whiteboard') return <div className="flex h-[calc(100dvh-3.5rem)] flex-col"><div className="flex gap-2 border-b border-line p-3"><Skeleton className="h-9 w-40" /><Skeleton className="ms-auto h-9 w-28" /></div><div className="relative flex-1 bg-surface-2 p-4"><div className="flex w-fit gap-2 rounded-lg border border-line bg-surface p-2">{[0, 1, 2, 3, 4].map(i => <Skeleton key={i} className="size-9" />)}</div><Skeleton className="absolute inset-y-28 start-1/4 w-1/2" /></div></div>
  return <div className="flex min-h-[calc(100dvh-3.5rem)]"><aside className={cn("hidden shrink-0 space-y-4 border-e border-line bg-surface p-4", kind === 'notebook' ? 'w-72 lg:block' : 'w-64 md:block')}><Skeleton className="h-9 w-full" /><SkeletonTabs count={2} /><SkeletonRows rows={7} icon={false} action={false} /></aside><div className="min-w-0 flex-1 p-4 sm:p-6"><SkeletonToolbar filters={1} /><div className="mx-auto max-w-3xl space-y-6"><Skeleton className="h-8 w-2/3" />{kind === 'notebook' ? <><SkeletonTabs count={3} /><Skeleton className="h-9 w-full" /></> : <Skeleton className="h-4 w-1/3" />}<SkeletonText lines={7} /><Skeleton className="h-48 w-full" /><SkeletonText lines={6} /></div></div></div>
}
function AccountSkeleton({ tab }: { tab?: string }) {
  if (tab && tab !== 'profile') return <div className="grid items-start gap-4 lg:grid-cols-2">{[0, 1].map(i => <SkeletonPanel key={i}><SkeletonFields fields={4} /></SkeletonPanel>)}</div>
  return <SkeletonPanel><div className="flex items-center gap-4 border-b border-line p-5"><Skeleton className="size-20 rounded-full" /><div className="space-y-3"><Skeleton className="h-4 w-40" /><Skeleton className="h-9 w-32" /></div></div><SkeletonFields fields={6} columns={2} /></SkeletonPanel>
}
function TutorialSkeleton() {
  return <><SkeletonTabs count={6} /><div className="grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]"><SkeletonPanel><SkeletonRows rows={6} icon={false} action={false} /></SkeletonPanel><SkeletonPanel title={false} className="space-y-5 p-5"><Skeleton className="h-6 w-2/3" /><Skeleton className="aspect-video w-full" /><SkeletonText lines={4} /><Skeleton className="h-10 w-32" /></SkeletonPanel></div></>
}
function ReportSkeleton({ metrics = 4 }: { metrics?: number }) {
  return <><SkeletonMetrics count={metrics} /><div className="mb-4 grid gap-4 lg:grid-cols-2"><SkeletonChart /><SkeletonChart /></div><SkeletonTable rows={5} /></>
}
function ContentBody({ layout, tab }: { layout: LoadingLayout; tab?: string }) {
  const shape = layout.shape
  switch (shape) {
    case 'reader': case 'notebook': case 'whiteboard': return <WorkspaceSkeleton kind={shape} />
    case 'atlas': return <AtlasSkeleton />
    case 'dashboard': return <DashboardSkeleton />
    case 'calendar': return <CalendarSkeleton />
    case 'qbank': return <QbankSkeleton header={false} />
    case 'tools': return <SkeletonFeatureCards count={6} columns={3} />
    case 'practice': return <SkeletonFeatureCards count={5} columns={3} />
    case 'minigames': return <SkeletonFeatureCards count={7} />
    case 'game-library': return <><SkeletonToolbar filters={1} /><div className="grid gap-x-7 sm:grid-cols-2">{[0, 1].map(i => <SkeletonRows key={i} rows={5} />)}</div></>
    case 'game-round': return <><SkeletonToolbar filters={1} /><SkeletonPanel><SkeletonRows rows={6} /></SkeletonPanel></>
    case 'flashcards': return <><SkeletonTabs /><DecksSkeleton /></>
    case 'flashcard-editor': return <><SkeletonTabs /><SkeletonPanel><SkeletonFields fields={2} /><div className="space-y-3 p-5"><Skeleton className="h-40 w-full" /><Skeleton className="h-40 w-full" /></div></SkeletonPanel></>
    case 'flashcard-study': return <SkeletonPanel><div className="mx-auto max-w-xl space-y-5 p-10"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-72 w-full" /><Skeleton className="h-11 w-full" /></div></SkeletonPanel>
    case 'terminology': return <><SkeletonFeatureCards count={3} columns={3} /><div className="mt-5"><SkeletonToolbar /><SkeletonTabs count={5} /><SkeletonTable columns={3} rows={7} /></div></>
    case 'resources': return <><SkeletonTabs count={3} /><SkeletonToolbar filters={3} /><SkeletonPanel><SkeletonRows rows={6} /></SkeletonPanel></>
    case 'question': return <QuestionSkeleton />
    case 'practical': return <><SkeletonTabs count={3} /><SkeletonToolbar /><SkeletonFeatureCards count={6} columns={3} /></>
    case 'oral': return <div className="space-y-3"><Skeleton className="h-6 w-64 max-w-full" /><div className="grid gap-4 lg:grid-cols-[1fr_300px]"><SkeletonPanel title={false} className="flex flex-col items-center gap-4 p-6"><Skeleton className="h-3 w-32" /><Skeleton className="h-6 w-full" /><Skeleton className="h-6 w-2/3" /><Skeleton className="h-5 w-24" /><div className="flex gap-2"><Skeleton className="h-11 w-28 sm:h-9" /><Skeleton className="h-11 w-36 sm:h-9" /></div><Skeleton className="h-3 w-full" /></SkeletonPanel><SkeletonPanel><SkeletonRows rows={7} icon={false} action={false} /></SkeletonPanel></div></div>
    case 'skills': return <div className="space-y-4"><Skeleton className="h-3 w-80 max-w-full" /><SkeletonPanel title={false} className="flex flex-wrap items-center gap-5 p-4"><Skeleton className="size-[76px] rounded-full" /><div className="min-w-0 flex-1 space-y-3"><Skeleton className="h-5 w-2/3" /><Skeleton className="h-3 w-full" /><Skeleton className="h-2 w-full" /></div><Skeleton className="h-16 w-64 max-w-full" /></SkeletonPanel><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map(i => <SkeletonPanel key={i}><SkeletonRows rows={4} action={false} /><div className="border-t border-line p-4"><SkeletonText lines={2} /></div></SkeletonPanel>)}</div></div>
    case 'essays': return <><SkeletonTabs count={2} /><SkeletonToolbar /><SkeletonPanel><SkeletonRows rows={6} /></SkeletonPanel></>
    case 'histology': return <><SkeletonToolbar /><SkeletonFeatureCards count={6} media /></>
    case 'adaptive': return <><SkeletonMetrics count={4} /><SkeletonPanel><SkeletonRows rows={5} /></SkeletonPanel></>
    case 'hospital': return <><SkeletonMetrics count={4} /><div className="grid gap-4 lg:grid-cols-[1.6fr_0.8fr]"><Skeleton className="h-[520px] w-full" /><SkeletonPanel><SkeletonRows rows={6} /></SkeletonPanel></div></>
    case 'rooms': return <div className="space-y-6"><div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.6fr)]"><div className="space-y-4">{[0, 1].map(i => <SkeletonPanel key={i}><div className="p-4"><RoomCardsSkeleton /></div></SkeletonPanel>)}</div><div className="space-y-4">{[0, 1].map(i => <SkeletonPanel key={i}><SkeletonFields fields={1} /><div className="px-5 pb-5"><Skeleton className="h-9 w-full" /></div></SkeletonPanel>)}</div></div><SkeletonPanel><SkeletonRows rows={1} /></SkeletonPanel><SkeletonPanel><SkeletonRows rows={1} /></SkeletonPanel></div>
    case 'room': return <RoomSkeleton />
    case 'tutorial': return <TutorialSkeleton />
    case 'account': return <><SkeletonTabs count={5} /><AccountSkeleton tab={tab} /></>
    case 'performance': return <ReportSkeleton metrics={5} />
    case 'university': return <><SkeletonTabs count={3} /><div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]"><SkeletonPanel><SkeletonRows rows={6} /></SkeletonPanel><SkeletonPanel><SkeletonRows rows={3} /></SkeletonPanel></div></>
    case 'table': return <><SkeletonToolbar /><SkeletonTable columns={layout.columns ?? 4} /></>
    case 'editor': return <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]"><div><SkeletonToolbar /><SkeletonTable columns={3} /></div><SkeletonPanel><SkeletonFields fields={5} /></SkeletonPanel></div>
    case 'settings': return <div className={cn('grid gap-4', layout.columns === 2 && 'lg:grid-cols-2')}>{Array.from({ length: layout.columns ?? 1 }, (_, i) => <SkeletonPanel key={i}><SkeletonFields fields={layout.fields ?? 4} columns={2} /></SkeletonPanel>)}</div>
    case 'report': return <ReportSkeleton metrics={layout.metrics} />
    case 'import': return <><SkeletonTabs count={4} /><SkeletonPanel title={false} className="grid min-h-72 place-items-center p-8"><div className="flex w-full max-w-sm flex-col items-center gap-4"><Skeleton className="size-12" /><Skeleton className="h-5 w-3/4" /><Skeleton className="h-3 w-full" /><Skeleton className="h-9 w-28" /></div></SkeletonPanel></>
    case 'mail': return <><SkeletonTabs count={3} /><div className="grid gap-4 lg:grid-cols-[16rem_minmax(0,1fr)]"><SkeletonPanel><SkeletonRows rows={5} icon={false} /></SkeletonPanel><SkeletonPanel><SkeletonRows rows={7} /></SkeletonPanel></div></>
    case 'academic': return <div className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]"><SkeletonPanel><SkeletonRows rows={7} icon={false} action={false} /></SkeletonPanel><SkeletonPanel><SkeletonFields fields={4} columns={2} /><SkeletonRows rows={4} /></SkeletonPanel></div>
    case 'validator': return <><SkeletonMetrics count={4} /><QuestionSkeleton /></>
    default: return <SkeletonText lines={5} />
  }
}
/** Reuse the exact body when data, rather than the route module, is pending. */
export function ContentSkeleton({ shape, className }: { shape: PageShape; className?: string }) {
  return <LoadingRegion name={`content-${shape}`} className={className}><ContentBody layout={{ shape }} /></LoadingRegion>
}
export function PageSkeleton({ layout, tab }: { layout: LoadingLayout; tab?: string }) {
  const { shape } = layout
  if (shape === 'atlas') return <LoadingRegion name={shape}><AtlasSkeleton /></LoadingRegion>
  if (shape === 'reader' || shape === 'notebook' || shape === 'whiteboard') return <LoadingRegion name={shape}><WorkspaceSkeleton kind={shape} /></LoadingRegion>
  if (shape === 'auth') return <LoadingRegion name={shape}><div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-6 py-12"><Skeleton className="mx-auto h-9 w-40" /><Skeleton className="h-8 w-2/3" /><SkeletonPanel title={false}><SkeletonFields fields={layout.fields ?? 2} /></SkeletonPanel><Skeleton className="mx-auto h-3 w-48" /></div></LoadingRegion>
  if (shape === 'landing' || shape === 'pricing') return <LoadingRegion name={shape}><div className="mx-auto max-w-7xl px-6 py-5"><div className="mb-16 flex justify-between"><Skeleton className="h-9 w-36" /><Skeleton className="h-9 w-28" /></div><div className="mx-auto mb-12 max-w-3xl space-y-5"><Skeleton className="h-12 w-full" /><Skeleton className="mx-auto h-12 w-3/4" /><SkeletonText lines={2} /><Skeleton className="mx-auto h-11 w-40" /></div>{shape === 'pricing' ? <SkeletonFeatureCards count={3} columns={3} /> : <Skeleton className="h-[28rem] w-full" />}</div></LoadingRegion>
  if (shape === 'legal' || shape === 'contact') return <LoadingRegion name={shape}><div className="mx-auto max-w-3xl space-y-8 px-6 py-10"><SkeletonHeader back description />{shape === 'contact' ? <SkeletonPanel><SkeletonRows rows={3} /></SkeletonPanel> : [0, 1, 2, 3].map(i => <div key={i} className="space-y-4"><Skeleton className="h-6 w-1/2" /><SkeletonText lines={5} /></div>)}</div></LoadingRegion>
  if (shape === 'message') return <LoadingRegion name={shape}><div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 p-6"><Skeleton className="size-12" /><Skeleton className="h-7 w-2/3" /><SkeletonText lines={2} className="w-full" /><Skeleton className="h-11 w-28" /></div></LoadingRegion>
  return <LoadingRegion name={shape}><PageContainer>{shape !== 'dashboard' && shape !== 'calendar' && <SkeletonHeader back={['oral', 'skills', 'essays', 'tutorial', 'account', 'game-library', 'game-round', 'minigames', 'terminology'].includes(shape)} description={layout.description} actions={layout.actions} />}{layout.tabs && <SkeletonTabs count={layout.tabs} />}{layout.metrics && shape !== 'report' && <SkeletonMetrics count={layout.metrics} />}<ContentBody layout={layout} tab={tab} /></PageContainer></LoadingRegion>
}
