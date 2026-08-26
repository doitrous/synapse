import { useEffect, useMemo, useState } from 'react'
import {
  BookOpen, CalendarDays, FileQuestion, GraduationCap, History,
  Layers3, Link2, MapPinned, Microscope, Scale, ShieldCheck, Stethoscope,
  TriangleAlert,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { AssessmentScheme } from '@/data/assessmentScheme'
import { MODULE_SUBJECTS_STORAGE_KEY, type ModuleSubjectStore } from '@/data/moduleSubjects'
import type { ModuleScheduleStore } from '@/data/moduleSchedule'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Icon } from '@/components/ui/Icon'
import { Meter } from '@/components/ui/Meter'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { SystemMark } from '@/components/ui/SystemMark'
import { API_MODE, apiGet } from '@/lib/api'
import { formatClock, formatLongDate } from '@/lib/format'
import { useIdentity } from '@/lib/useIdentity'
import { usePersistentState } from '@/lib/usePersistentState'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { cn } from '@/lib/cn'
import {
  buildDemoStudentUniversityProjection,
  normalizeStudentUniversityProjection,
  type StudentAssessmentMap,
  type StudentCurriculumMap,
  type StudentModuleMap,
  type StudentScheduleMap,
  type StudentSubjectMap,
  type StudentUniversityProjection,
} from './universityModel'

const MODULE_SCHEDULE_STORAGE_KEY = 'synapse-module-schedules-v1'
const ASSESSMENT_SCHEMES_STORAGE_KEY = 'synapse-assessment-schemes-v1'

function stateError(...errors: Array<string | null | undefined>): string {
  return errors.find(Boolean) ?? ''
}

function n(value: number | null): string {
  if (value === null) return 'unavailable'
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value)
}

function labelTone(label: string): 'neutral' | 'success' | 'warning' | 'accent' | 'outline' {
  if (label === 'verified' || label === 'exact') return 'success'
  if (label === 'carried-forward') return 'neutral'
  if (label === 'inferred') return 'accent'
  if (label === 'being-verified' || label === 'partial' || label === 'needs-marks' || label === 'needs-schedule') return 'warning'
  return 'outline'
}

function labelText(label: string): string {
  return label.replace(/[_-]+/g, ' ')
}

function SubjectTree({ subjects, depth = 0 }: { subjects: StudentSubjectMap[]; depth?: number }) {
  if (subjects.length === 0) return <p className="text-[12.5px] text-ink-3">No subject tree has been published for this module yet.</p>
  return (
    <ul className={cn(depth === 0 && 'space-y-1.5')}>
      {subjects.map((subject) => (
        <li key={subject.id} className="min-w-0">
          <div className="flex min-w-0 items-center gap-2 py-0.5" style={{ paddingInlineStart: `${depth * 0.8}rem` }}>
            <span className={cn('size-1.5 shrink-0 rounded-full', depth === 0 ? 'bg-primary/55' : 'bg-accent/45')} />
            <span className="truncate text-[12.5px] text-ink-2">{subject.name}</span>
            {subject.labels.slice(0, 2).map((label) => (
              <Badge key={label} tone={labelTone(label)} className="hidden shrink-0 sm:inline-flex">{labelText(label)}</Badge>
            ))}
          </div>
          {subject.children.length > 0 && <SubjectTree subjects={subject.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  )
}

function ModuleBadge({ badge }: { badge: StudentModuleMap['badges'][number] }) {
  if (badge === 'verified') return <Badge tone="success" dot>verified marks</Badge>
  if (badge === 'carried-forward') return <Badge tone="neutral" dot>carried forward</Badge>
  if (badge === 'inferred') return <Badge tone="accent" dot>inferred</Badge>
  if (badge === 'being-verified') return <Badge tone="warning" dot>being verified</Badge>
  if (badge === 'needs-marks') return <Badge tone="warning" dot>marks unavailable</Badge>
  return <Badge tone="warning" dot>schedule pending</Badge>
}

function AssessmentPanel({ assessment }: { assessment: StudentAssessmentMap }) {
  const visibleComponents = assessment.components.filter((component) => component.marks !== null)
  const maxComponent = Math.max(1, ...visibleComponents.map((component) => component.marks ?? 0))
  return (
    <div className="rounded-lg border border-line bg-surface-2 p-3">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">Assessment total</p>
          <p className="tnum mt-1 font-serif text-[26px] font-semibold leading-none text-ink">{assessment.displayTotal}</p>
        </div>
        <Icon icon={Scale} size={18} className="text-ink-3" />
      </div>
      <div className="mb-3 flex flex-wrap gap-1.5">
        <Badge tone={labelTone(assessment.status)} dot>{labelText(assessment.status)}</Badge>
        {assessment.credits !== null && <Badge tone="outline">{assessment.credits} credits</Badge>}
        {assessment.passRule && <Badge tone="outline">{assessment.passRule}</Badge>}
      </div>
      {visibleComponents.length === 0 ? (
        <p className="text-[12.5px] leading-relaxed text-ink-3">Assessment components are unavailable, not zero.</p>
      ) : (
        <div className="space-y-2">
          {visibleComponents.map((component) => (
            <div key={component.id}>
              <div className="mb-1 flex justify-between gap-2 text-[11.5px] text-ink-3">
                <span className="truncate">{component.label}</span>
                <span className="tnum font-mono">{component.displayMarks}</span>
              </div>
              <Meter value={component.marks ?? 0} max={maxComponent} size="sm" tone="primary" />
              {component.allocations.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {component.allocations.slice(0, 3).map((allocation) => (
                    <span key={`${component.id}-${allocation.subjectId}-${allocation.label}`} className="rounded-full bg-inset px-2 py-0.5 text-[10.5px] text-ink-3">
                      {allocation.label}: {allocation.displayMarks}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ScheduleList({ rows, compact = false }: { rows: StudentScheduleMap[]; compact?: boolean }) {
  if (rows.length === 0) {
    return <p className="text-[12.5px] leading-relaxed text-ink-3">No timetable blocks are published for this module yet.</p>
  }
  const visible = compact ? rows.slice(0, 3) : rows
  return (
    <ul className="space-y-2">
      {visible.map((row) => (
        <li key={row.id} className="rounded-lg border border-line bg-surface px-3 py-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-semibold text-ink">{row.title}</p>
              <p className="mt-0.5 text-[11.5px] text-ink-3">
                {row.start ? `${formatLongDate(row.start)} · ${formatClock(row.start)}` : row.date ?? 'date unavailable'}
                {row.location ? ` · ${row.location}` : ''}
              </p>
            </div>
            <Badge tone={row.isExam ? 'warning' : 'outline'}>{row.label}</Badge>
          </div>
          {(row.labels.length > 0 || row.linkCount > 0) && (
            <div className="mt-2 flex flex-wrap gap-1">
              {row.labels.map((label) => <Badge key={label} tone={labelTone(label)}>{labelText(label)}</Badge>)}
              {row.linkCount > 0 && <Badge tone="accent"><Icon icon={Link2} size={11} /> {row.linkCount} links</Badge>}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

function ModuleCard({ module }: { module: StudentModuleMap }) {
  return (
    <Panel className="relative overflow-hidden">
      <div className="absolute start-[-1px] top-0 h-full w-1 bg-primary/45" aria-hidden />
      <div className="p-4 ps-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <SystemMark moduleId={module.moduleId} />
            <div className="min-w-0">
              <h3 className="truncate font-serif text-[19px] font-semibold tracking-[-0.02em] text-ink">{module.name}</h3>
              <p className="mt-0.5 text-[12.5px] text-ink-3">
                {module.moduleId} · {module.subjectCount} subject nodes · {module.schedule.length} timetable blocks
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-1.5">
            {module.badges.map((badge) => <ModuleBadge key={badge} badge={badge} />)}
          </div>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="min-w-0 space-y-3">
            <div className="rounded-lg border border-line bg-surface-2 p-3">
              <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                <Icon icon={Microscope} size={14} />
                Subject tree
              </div>
              <SubjectTree subjects={module.subjects} />
            </div>
            <div className="rounded-lg border border-line bg-surface-2 p-3">
              <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                <Icon icon={CalendarDays} size={14} />
                Scoped schedule
              </div>
              <ScheduleList rows={module.schedule} compact />
            </div>
          </div>

          <AssessmentPanel assessment={module.assessment} />
        </div>
      </div>
    </Panel>
  )
}

function useLiveUniversityProjection() {
  const [projection, setProjection] = useState<StudentUniversityProjection | null>(null)
  const [loading, setLoading] = useState(API_MODE)
  const [error, setError] = useState('')

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
        setError(err instanceof Error ? err.message : 'Unable to read your university projection.')
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => { alive = false }
  }, [])

  return { projection, loading, error }
}

function CurriculumView({
  map,
  loading,
  error,
  demo = false,
}: {
  map: StudentCurriculumMap | null
  loading: boolean
  error: string
  demo?: boolean
}) {
  const totalMarks = map?.totals.marks ?? null
  return (
    <PageContainer>
      <PageHeader
        title="Your University"
        description="A quiet map of your own year: terms, modules, subjects, assessments, and the timetable your faculty has published."
        actions={
          <>
            <ButtonLink to="/app/library" variant="secondary" iconLeft={BookOpen}>Library</ButtonLink>
            <ButtonLink to="/app/qbank" variant="secondary" iconLeft={FileQuestion}>Qbank</ButtonLink>
            <ButtonLink to="/app/practical" variant="secondary" iconLeft={Stethoscope}>Practical</ButtonLink>
            <ButtonLink to="/app/calendar" variant="primary" iconLeft={CalendarDays}>Calendar</ButtonLink>
          </>
        }
      />

      {error && (
        <Panel className="mb-4 border-danger/35 bg-danger-tint p-4 text-[13px] text-ink-2">
          Your curriculum could not be read safely ({error}). Try again once the connection settles.
        </Panel>
      )}

      {loading ? (
        <Panel>
          <EmptyState icon={GraduationCap} title="Loading your curriculum" description="We are reading only the university and year on your account." />
        </Panel>
      ) : !map || map.status === 'missing_profile' ? (
        <Panel>
          <EmptyState
            icon={MapPinned}
            title="Tell Synapse where you study"
            description="Your university map stays empty until your account has a university and year."
            action={<ButtonLink to="/app/account" variant="primary">Open account settings</ButtonLink>}
          />
        </Panel>
      ) : map.status === 'being_verified' || !map.university || !map.year ? (
        <Panel>
          <EmptyState
            icon={TriangleAlert}
            title="This year is being verified"
            description="Your account is enrolled, but the live academic projection has not published that year yet."
          />
        </Panel>
      ) : (
        <>
          <section className="mb-4 overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
            <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
              <div className="p-5">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                  <Icon icon={GraduationCap} size={13} />
                  {map.university.short} · {map.year.year}
                  {demo && <span className="ms-1 rounded-full bg-primary-tint px-2 text-primary-strong">demo</span>}
                </div>
                <h2 className="text-balance font-serif text-[30px] font-semibold tracking-[-0.03em] text-ink">{map.university.name}</h2>
                <p className="mt-2 max-w-2xl text-pretty text-[14px] leading-relaxed text-ink-2">
                  {demo
                    ? 'Demo mode mirrors the local academic catalogue. Live deployments use the authenticated projection only.'
                    : 'This live view is server-scoped to your own university and year. No other university or year can be requested from here.'}
                </p>
              </div>
              <div className="grid grid-cols-3 border-t border-line bg-surface-2 md:border-s md:border-t-0">
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">Terms</p>
                  <p className="tnum mt-2 font-serif text-[26px] font-semibold text-ink">{map.totals.terms}</p>
                </div>
                <div className="border-s border-line p-4">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">Modules</p>
                  <p className="tnum mt-2 font-serif text-[26px] font-semibold text-ink">{map.totals.modules}</p>
                </div>
                <div className="border-s border-line p-4">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">Marks</p>
                  <p className="tnum mt-2 font-serif text-[26px] font-semibold text-ink">{n(totalMarks)}</p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="min-w-0 space-y-5">
              {map.terms.length === 0 || map.totals.modules === 0 ? (
                <Panel>
                  <EmptyState icon={History} title="No modules in your year yet" description="An admin can publish terms and modules from Academic Setup. Until then, Library and Qbank still work where content is available." />
                </Panel>
              ) : map.terms.map((term, index) => (
                <section key={term.term} className="relative ps-7">
                  <span className="absolute start-2 top-8 bottom-[-1.25rem] w-px bg-line" aria-hidden />
                  <span className="absolute start-0 top-2 grid size-4 place-items-center rounded-full border border-primary-line bg-primary-tint">
                    <span className="size-1.5 rounded-full bg-primary" />
                  </span>
                  <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">Term {index + 1}</p>
                      <h2 className="font-serif text-[23px] font-semibold tracking-[-0.025em] text-ink">{term.term}</h2>
                    </div>
                    <Badge tone="outline">{term.modules.length} modules · {n(term.marks)} marks</Badge>
                  </div>
                  <div className="space-y-3">
                    {term.modules.map((module) => <ModuleCard key={module.id} module={module} />)}
                  </div>
                </section>
              ))}
            </div>

            <aside className="space-y-4 xl:sticky xl:top-4 xl:self-start">
              <Panel className="overflow-hidden">
                <PanelHeader title="Upcoming schedule" icon={CalendarDays} hint={`${Math.min(map.upcoming.length, 4)} next`} />
                {map.upcoming.length === 0 ? (
                  <div className="p-4 text-[13px] leading-relaxed text-ink-2">
                    No future timetable blocks are published for this year. Older rows may still appear as carried-forward badges on modules.
                  </div>
                ) : (
                  <ul className="divide-y divide-line">
                    {map.upcoming.slice(0, 4).map((session) => (
                      <li key={`${session.moduleId}-${session.id}`} className="p-4">
                        <div className="flex items-start gap-3">
                          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary-strong">
                            <Icon icon={session.isExam ? Scale : CalendarDays} size={16} />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-semibold text-ink">{session.title}</p>
                            <p className="mt-0.5 text-[12px] text-ink-3">{session.moduleName}</p>
                            <p className="mt-1 text-[12px] text-ink-2">{session.start ? `${formatLongDate(session.start)} · ${formatClock(session.start)}` : session.date ?? 'date unavailable'}</p>
                            {session.labels.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {session.labels.map((label) => <Badge key={label} tone={labelTone(label)}>{labelText(label)}</Badge>)}
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>

              <Panel className="p-4">
                <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                  <Icon icon={ShieldCheck} size={14} />
                  Scope protection
                </div>
                <p className="text-[13px] leading-relaxed text-ink-2">
                  {demo ? 'Demo mode can browse local seed data.' : 'Live mode reads the server projection for your authenticated cohort only:'}{' '}
                  <span className="font-semibold text-ink">{map.profile?.yearId ?? map.year.id}</span>.
                </p>
                <Link to="/app/account" className="mt-3 inline-flex text-[13px] font-semibold text-primary-strong hover:text-primary">Review enrolment</Link>
              </Panel>

              <Panel className="p-4">
                <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                  <Icon icon={Layers3} size={14} />
                  Evidence summary
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">Subjects</p>
                    <p className="tnum mt-1 font-serif text-[22px] font-semibold text-ink">{map.totals.subjects}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">Schedule</p>
                    <p className="tnum mt-1 font-serif text-[22px] font-semibold text-ink">{map.totals.scheduleRows}</p>
                  </div>
                </div>
                {map.totals.marksUnavailable && (
                  <p className="mt-3 text-[12.5px] leading-relaxed text-ink-3">Some assessment totals are unavailable while source evidence is still being reconciled.</p>
                )}
              </Panel>
            </aside>
          </div>
        </>
      )}
    </PageContainer>
  )
}

function LiveUniversity() {
  const { projection, loading, error } = useLiveUniversityProjection()
  const now = useMemo(() => new Date(), [])
  const map = useMemo(() => projection ? normalizeStudentUniversityProjection(projection, now) : null, [now, projection])
  return <CurriculumView map={map} loading={loading} error={error} />
}

function DemoUniversity() {
  const identity = useIdentity()
  const [catalogue, , catalogueStatus] = useUniversityCatalogue()
  const [subjects, , subjectStatus] = usePersistentState<ModuleSubjectStore>(MODULE_SUBJECTS_STORAGE_KEY, {})
  const [schedules, , scheduleStatus] = usePersistentState<ModuleScheduleStore>(MODULE_SCHEDULE_STORAGE_KEY, {})
  const [assessmentSchemes, , assessmentStatus] = usePersistentState<Record<string, AssessmentScheme>>(ASSESSMENT_SCHEMES_STORAGE_KEY, {})
  const loading = identity.loading || !identity.audienceSettled || !catalogueStatus.hydrated || !subjectStatus.hydrated || !scheduleStatus.hydrated || !assessmentStatus.hydrated
  const error = stateError(catalogueStatus.error, subjectStatus.error, scheduleStatus.error, assessmentStatus.error)
  const university = catalogue.find((item) => item.id === identity.audience.universityId) ?? null
  const year = university?.years.find((item) => item.id === identity.audience.yearId || item.year === identity.audience.year) ?? null
  const now = useMemo(() => new Date(), [])
  const projection = useMemo(() => (
    university && year
      ? buildDemoStudentUniversityProjection(university, year, subjects, schedules, assessmentSchemes)
      : identity.audienceUnknown
        ? { profile: null, university: null, year: null, terms: [], modules: [], status: 'missing_profile' as const }
        : { profile: { studentId: null, universityId: identity.audience.universityId ?? null, year: identity.audience.year ?? null, yearId: identity.audience.yearId ?? null, group: null }, university: university ? { id: university.id, name: university.name, short: university.short, region: university.region } : null, year: null, terms: [], modules: [], status: 'being_verified' as const }
  ), [assessmentSchemes, identity.audience.universityId, identity.audience.year, identity.audience.yearId, identity.audienceUnknown, schedules, subjects, university, year])
  const map = useMemo(() => normalizeStudentUniversityProjection(projection, now), [now, projection])
  return <CurriculumView map={map} loading={loading} error={error} demo />
}

export function University() {
  return API_MODE ? <LiveUniversity /> : <DemoUniversity />
}
