import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AssessmentScheme } from '@/data/assessmentScheme'
import { MODULE_SUBJECTS_STORAGE_KEY, type ModuleSubjectStore } from '@/data/moduleSubjects'
import type { ModuleScheduleStore } from '@/data/moduleSchedule'
import { API_MODE, apiGet } from '@/lib/api'
import { useIdentity } from '@/lib/useIdentity'
import { usePersistentState } from '@/lib/usePersistentState'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { buildDemoStudentUniversityProjection, type StudentUniversityProjection } from './universityModel'

/**
 * Where the viewer's own curriculum projection comes from.
 *
 * `University.tsx` used to build this inline, once per rendering path (live
 * fetch, demo assembly). Both the University page and anything else that needs
 * "this student's modules and their coverage" — the Library module view, the
 * qbank module chooser — need the same projection, so it lives here instead of
 * being duplicated a second time.
 */

const MODULE_SCHEDULE_STORAGE_KEY = 'synapse-module-schedules-v1'
const ASSESSMENT_SCHEMES_STORAGE_KEY = 'synapse-assessment-schemes-v1'

export interface StudentCurriculumProjectionState {
  projection: StudentUniversityProjection | null
  loading: boolean
  error: string
  /** Live mode only — a demo projection is assembled synchronously from local stores and never fails in a way retrying could fix. */
  retry?: () => void
}

export interface DemoCurriculumProjectionState {
  /** Always a real object in demo mode — `status` says whether it is usable, but there is nothing to await. */
  projection: StudentUniversityProjection
  loading: boolean
  error: string
}

/** Live mode: the server's own projection for whoever is signed in. */
export function useLiveUniversityProjection(): StudentCurriculumProjectionState {
  const [projection, setProjection] = useState<StudentUniversityProjection | null>(null)
  const [loading, setLoading] = useState(API_MODE)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!API_MODE) return
    let alive = true
    setLoading(true)
    apiGet<StudentUniversityProjection>('/me/university')
      .then((result) => {
        if (!alive) return
        setProjection(result)
        setError('')
      })
      .catch((err: unknown) => {
        if (!alive) return
        // The reason is logged for debugging, never shown to the student —
        // a raw fetch/server error can carry endpoint names or stack detail.
        console.error('Unable to load the student university projection.', err)
        setError('Something went wrong loading your university page.')
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => { alive = false }
  }, [attempt])

  const retry = useCallback(() => setAttempt((value) => value + 1), [])
  return { projection, loading, error, retry }
}

/**
 * Demo mode: assembled from the local stores Academic Setup writes to,
 * scoped to the account's self-declared university and year.
 */
export function useDemoUniversityProjection(): DemoCurriculumProjectionState {
  const identity = useIdentity()
  const [catalogue, , catalogueStatus] = useUniversityCatalogue()
  const [subjects, , subjectStatus] = usePersistentState<ModuleSubjectStore>(MODULE_SUBJECTS_STORAGE_KEY, {})
  const [schedules, , scheduleStatus] = usePersistentState<ModuleScheduleStore>(MODULE_SCHEDULE_STORAGE_KEY, {})
  const [assessmentSchemes, , assessmentStatus] = usePersistentState<Record<string, AssessmentScheme>>(ASSESSMENT_SCHEMES_STORAGE_KEY, {})
  const loading = identity.loading || !identity.audienceSettled || !catalogueStatus.hydrated || !subjectStatus.hydrated || !scheduleStatus.hydrated || !assessmentStatus.hydrated
  const error = [catalogueStatus.error, subjectStatus.error, scheduleStatus.error, assessmentStatus.error].find(Boolean) ?? ''
  const university = catalogue.find((item) => item.id === identity.audience.universityId) ?? null
  const year = university?.years.find((item) => item.id === identity.audience.yearId || item.year === identity.audience.year) ?? null
  const projection = useMemo(() => (
    university && year
      ? buildDemoStudentUniversityProjection(university, year, subjects, schedules, assessmentSchemes)
      : identity.audienceUnknown
        ? { profile: null, university: null, year: null, terms: [], modules: [], status: 'missing_profile' as const }
        : { profile: { studentId: null, universityId: identity.audience.universityId ?? null, year: identity.audience.year ?? null, yearId: identity.audience.yearId ?? null, group: null }, university: university ? { id: university.id, name: university.name, short: university.short, region: university.region } : null, year: null, terms: [], modules: [], status: 'being_verified' as const }
  ), [assessmentSchemes, identity.audience.universityId, identity.audience.year, identity.audience.yearId, identity.audienceUnknown, schedules, subjects, university, year])
  return { projection, loading, error }
}

/**
 * The signed-in viewer's own curriculum projection, live or demo.
 *
 * Both hooks are called unconditionally — hooks are never conditional — and
 * only the branch matching `API_MODE` is handed back; the other's network
 * fetch or local-store reads either never run (demo path in live mode does no
 * fetching) or cost nothing extra (the local stores are shared documents other
 * readers already mounted).
 */
export function useStudentCurriculum(): StudentCurriculumProjectionState {
  const live = useLiveUniversityProjection()
  const demo = useDemoUniversityProjection()
  return API_MODE ? live : demo
}
