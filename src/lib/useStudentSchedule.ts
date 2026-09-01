import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { useUniversityCatalogue } from './useUniversityCatalogue'
import { useIdentity } from './useIdentity'
import type { ModuleScheduleStore } from '@/data/moduleSchedule'
import { flattenSchedule, type ScheduledSession } from './studentSchedule'

export const MODULE_SCHEDULE_STORAGE_KEY = 'nishany-module-schedules-v1'

/** The same timetable for the signed-in student, from their stored audience. */
export function useStudentSchedule(): { sessions: ScheduledSession[]; hasYear: boolean } {
  const { audience } = useIdentity()
  const [catalogue] = useUniversityCatalogue()
  const [schedules] = usePersistentState<ModuleScheduleStore>(MODULE_SCHEDULE_STORAGE_KEY, {})

  return useMemo(() => {
    const university = catalogue.find((item) => item.id === audience.universityId)
    const year = university?.years.find((item) => item.id === audience.yearId || item.year === audience.year)
    if (!university || !year) return { sessions: [], hasYear: false }
    return { sessions: flattenSchedule(university, year, schedules), hasYear: true }
  }, [audience.universityId, audience.year, audience.yearId, catalogue, schedules])
}
