import { useMemo } from 'react'
import { initialLoadState } from './loadingState'
import { usePersistentState } from './usePersistentState'
import { useUniversityCatalogue } from './useUniversityCatalogue'
import { useIdentity } from './useIdentity'
import type { ModuleScheduleStore } from '@/data/moduleSchedule'
import { flattenSchedule } from './studentSchedule'

export const MODULE_SCHEDULE_STORAGE_KEY = 'nishany-module-schedules-v1'

/** The same timetable for the signed-in student, from their stored audience. */
export function useStudentSchedule() {
  const { audience } = useIdentity()
  const [catalogue, , catalogueStatus] = useUniversityCatalogue()
  const [schedules, , scheduleStatus] = usePersistentState<ModuleScheduleStore>(MODULE_SCHEDULE_STORAGE_KEY, {})

  const { loading, error } = initialLoadState(catalogueStatus, scheduleStatus)
  return useMemo(() => {
    const university = catalogue.find((item) => item.id === audience.universityId)
    const year = university?.years.find((item) => item.id === audience.yearId || item.year === audience.year)
    if (!university || !year) return { sessions: [], hasYear: false, loading, error }
    return { sessions: flattenSchedule(university, year, schedules), hasYear: true, loading, error }
  }, [audience.universityId, audience.year, audience.yearId, catalogue, schedules, loading, error])
}
