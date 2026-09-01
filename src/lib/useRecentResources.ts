import { useCallback } from 'react'
import { usePersistentState } from './usePersistentState'

/**
 * The resources this student opened, most recent first.
 *
 * The dashboard's "Last used resources" was a hardcoded list — Kumar & Clark
 * "2h ago", an Osmosis video "5h ago" — shown to a student who had opened
 * nothing. This is the record that replaces it: written when a resource is
 * actually opened, and empty until then.
 */

export const RECENT_RESOURCES_STORAGE_KEY = 'nishany.progress.recentResources.v1'

/** Enough to fill the panel and show a little history, without unbounded growth. */
const LIMIT = 10

export interface RecentResource {
  id: string
  title: string
  type: string
  subjectId: string
  /** Chapter, page, slide or timestamp — whatever the resource records. */
  meta: string
  openedAt: string
}

export function useRecentResources() {
  const [recent, setRecent] = usePersistentState<RecentResource[]>(RECENT_RESOURCES_STORAGE_KEY, [])

  const noteOpened = useCallback((resource: Omit<RecentResource, 'openedAt'>) => {
    const openedAt = new Date().toISOString()
    setRecent((current) => [
      { ...resource, openedAt },
      // Re-opening moves it to the front rather than appearing twice.
      ...current.filter((item) => item.id !== resource.id),
    ].slice(0, LIMIT))
  }, [setRecent])

  return { recent, noteOpened }
}
