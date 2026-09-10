import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { useStudentSchedule } from './useStudentSchedule'
import { mergeUpcoming, type UpcomingItem } from './upcoming'
import { STUDY_BLOCKS_STORAGE_KEY, type StudyBlock } from '@/data/studyBlocks'

/**
 * Both of the student's calendars, read as one.
 *
 * The rules live in `upcoming.ts`, where they are tested; this only supplies
 * them with the two stored documents. `hasYear` and `hasBlocks` are reported
 * separately so an empty day can say which calendar is empty — "your university
 * has not published a timetable" and "you have not planned anything" are
 * different problems with different answers, and one message for both told half
 * the students the wrong thing.
 */
export function useUpcoming(): {
  items: UpcomingItem[]
  hasYear: boolean
  hasBlocks: boolean
  loading: boolean
  error: import('./apiErrors').StateErrorKind | null
} {
  const { sessions, hasYear, loading, error } = useStudentSchedule()
  const [blocks, , blocksStatus] = usePersistentState<StudyBlock[]>(STUDY_BLOCKS_STORAGE_KEY, [])

  return useMemo(() => ({
    items: mergeUpcoming(sessions, blocks),
    hasYear,
    loading: !error && !blocksStatus.error && (loading || !blocksStatus.hydrated),
    error: error ?? blocksStatus.error,
    hasBlocks: blocks.length > 0,
  }), [blocks, hasYear, sessions, loading, error, blocksStatus])
}

/** Tick a personal block off, or back on, in the record the calendar reads. */
export function useToggleBlock(): (blockId: string) => void {
  const [, setBlocks] = usePersistentState<StudyBlock[]>(STUDY_BLOCKS_STORAGE_KEY, [])
  return (blockId: string) => {
    setBlocks((current) => current.map((block) => block.id === blockId ? { ...block, done: !block.done } : block))
  }
}
