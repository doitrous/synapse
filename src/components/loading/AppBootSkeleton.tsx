import { Skeleton } from '@/components/ui/Skeleton'

/**
 * The whole-app placeholder an Arabic session sees on its first load, while the
 * ~320KB Arabic dictionary is being fetched.
 *
 * It stands in for what used to be a flash of English source strings before the
 * translations arrived: a skeleton reads as "loading" in any language, and
 * `dir="rtl"` lays it out the way an Arabic reader expects, so the very first
 * paint already belongs to the right language rather than snapping from English
 * to Arabic a beat later. English (the default) never loads the dictionary and
 * never sees this. Once the dictionary is cached, the wait is imperceptible.
 *
 * Deliberately generic — a top bar, a side rail and a card grid — because this
 * renders above the router and so cannot know which screen is coming. The
 * router's own per-route skeleton takes over the moment the app mounts.
 */
export function AppBootSkeleton() {
  return (
    <div dir="rtl" className="min-h-[100dvh] bg-paper text-ink" role="status" aria-busy="true">
      <div className="flex h-14 items-center justify-between border-b border-line px-4">
        <Skeleton className="h-7 w-32" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      <div className="flex">
        <aside className="hidden w-60 shrink-0 flex-col gap-2 border-s border-line p-4 md:flex">
          {Array.from({ length: 7 }, (_, i) => (
            <Skeleton key={i} className="h-9 w-full" />
          ))}
        </aside>
        <main className="flex-1 p-4 sm:p-6">
          <Skeleton className="mb-6 h-9 w-1/3" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="rounded-xl border border-line bg-surface p-4">
                <Skeleton className="mb-3 h-4 w-1/2" />
                <Skeleton className="mb-2 h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
