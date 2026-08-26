import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft, BookOpen, CalendarDays, Compass, FileQuestion, GraduationCap, History,
  Link2, ListChecks, MapPinned, Microscope, RotateCw, Scale, Stethoscope,
  TriangleAlert,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
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

/**
 * Every internal state word this page might see, translated into something a
 * student would actually want to read — and nothing else. States that come
 * from a live server projection are a free string at the type level, so an
 * unrecognised value here is dropped rather than printed: a badge that says
 * nothing is safer than one that quotes an internal workflow term verbatim.
 */
const FRIENDLY_STATE: Record<string, { text: string; tone: 'neutral' | 'success' | 'warning' | 'accent' | 'outline' }> = {
  verified: { text: 'Confirmed', tone: 'success' },
  exact: { text: 'Confirmed', tone: 'success' },
  derived: { text: 'Estimated from your marks', tone: 'accent' },
  inferred: { text: 'Estimated', tone: 'accent' },
  'carried-forward': { text: 'From last year', tone: 'neutral' },
  partial: { text: 'Still being finalised', tone: 'warning' },
  ambiguous: { text: 'Being confirmed', tone: 'warning' },
  being_verified: { text: 'Being confirmed', tone: 'warning' },
  'being-verified': { text: 'Being confirmed', tone: 'warning' },
}

function friendlyState(label: string) {
  return FRIENDLY_STATE[label] ?? null
}

function FriendlyBadges({ labels, limit = 2 }: { labels: string[]; limit?: number }) {
  const resolved = labels.map(friendlyState).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)).slice(0, limit)
  if (resolved.length === 0) return null
  return (
    <>
      {resolved.map((entry) => <Badge key={entry.text} tone={entry.tone}>{entry.text}</Badge>)}
    </>
  )
}

function SubjectTree({ subjects, depth = 0 }: { subjects: StudentSubjectMap[]; depth?: number }) {
  if (subjects.length === 0) return <p className="text-[12.5px] text-ink-3">Your faculty hasn&apos;t published a topic breakdown for this module yet.</p>
  return (
    <ul className={cn(depth === 0 && 'space-y-1.5')}>
      {subjects.map((subject) => (
        <li key={subject.id} className="min-w-0">
          <div className="flex min-w-0 items-center gap-2 py-0.5" style={{ paddingInlineStart: `${depth * 0.8}rem` }}>
            <span className={cn('size-1.5 shrink-0 rounded-full', depth === 0 ? 'bg-primary/55' : 'bg-accent/45')} />
            <span className="truncate text-[12.5px] text-ink-2">{subject.name}</span>
            {subject.coverageCount > 0 && (
              <span className="hidden shrink-0 text-[11px] text-ink-3 sm:inline">{subject.coverageCount} resources</span>
            )}
            <span className="hidden shrink-0 gap-1 sm:inline-flex">
              <FriendlyBadges labels={subject.labels} />
            </span>
          </div>
          {subject.children.length > 0 && <SubjectTree subjects={subject.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  )
}

function ModuleBadge({ badge }: { badge: StudentModuleMap['badges'][number] }) {
  if (badge === 'verified') return <Badge tone="success" dot>Marks confirmed</Badge>
  if (badge === 'carried-forward') return <Badge tone="neutral" dot>Continued from last year</Badge>
  if (badge === 'inferred') return <Badge tone="accent" dot>Estimated</Badge>
  if (badge === 'being-verified') return <Badge tone="warning" dot>Being confirmed</Badge>
  if (badge === 'needs-marks') return <Badge tone="warning" dot>Marks coming soon</Badge>
  return <Badge tone="warning" dot>Schedule coming soon</Badge>
}

function AssessmentPanel({ assessment }: { assessment: StudentAssessmentMap }) {
  const visibleComponents = assessment.components.filter((component) => component.marks !== null)
  const maxComponent = Math.max(1, ...visibleComponents.map((component) => component.marks ?? 0))
  const status = friendlyState(assessment.status)
  return (
    <div className="rounded-lg border border-line bg-surface-2 p-3">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">Total marks</p>
          <p className="tnum mt-1 font-serif text-[26px] font-semibold leading-none text-ink">{assessment.displayTotal === 'unavailable' ? 'Not published yet' : assessment.displayTotal}</p>
        </div>
        <Icon icon={Scale} size={18} className="text-ink-3" />
      </div>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {status && <Badge tone={status.tone} dot>{status.text}</Badge>}
        {assessment.credits !== null && <Badge tone="outline">{assessment.credits} credits</Badge>}
        {assessment.passRule && <Badge tone="outline">{assessment.passRule}</Badge>}
      </div>
      {visibleComponents.length === 0 ? (
        <p className="text-[12.5px] leading-relaxed text-ink-3">Your faculty hasn&apos;t published how this module&apos;s marks break down yet.</p>
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
    return <p className="text-[12.5px] leading-relaxed text-ink-3">Schedule coming soon — your faculty hasn&apos;t published this module&apos;s timetable yet.</p>
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
                {row.start ? `${formatLongDate(row.start)} · ${formatClock(row.start)}` : row.date ?? 'Date to be announced'}
                {row.location ? ` · ${row.location}` : ''}
              </p>
            </div>
            <Badge tone={row.isExam ? 'warning' : 'outline'}>{row.label}</Badge>
          </div>
          {(row.labels.some((label) => friendlyState(label)) || row.linkCount > 0) && (
            <div className="mt-2 flex flex-wrap gap-1">
              <FriendlyBadges labels={row.labels} limit={row.labels.length} />
              {row.linkCount > 0 && <Badge tone="accent"><Icon icon={Link2} size={11} /> {row.linkCount} resources linked</Badge>}
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
                {module.moduleId} · {module.subjectCount} {module.subjectCount === 1 ? 'topic' : 'topics'} · {module.schedule.length} {module.schedule.length === 1 ? 'session' : 'sessions'}
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
                Topics covered
              </div>
              <SubjectTree subjects={module.subjects} />
            </div>
            <div className="rounded-lg border border-line bg-surface-2 p-3">
              <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                <Icon icon={CalendarDays} size={14} />
                Timetable
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

/** ArrowLeft to the previous screen, falling back to the dashboard when this
 * is the first entry in the tab's history (a fresh tab, a bookmark, a deep link). */
function BackButton() {
  const navigate = useNavigate()
  const handleBack = useCallback(() => {
    const historyIndex = (window.history.state as { idx?: number } | null)?.idx
    if (typeof historyIndex === 'number' && historyIndex > 0) navigate(-1)
    else navigate('/app')
  }, [navigate])
  return (
    <button
      type="button"
      onClick={handleBack}
      className="mb-3 inline-flex min-h-9 items-center gap-1.5 rounded-md px-2 -ms-2 text-[12.5px] font-medium text-ink-2 hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
    >
      <Icon icon={ArrowLeft} size={15} className="rtl:-scale-x-100" />
      Back
    </button>
  )
}

function CurriculumView({
  map,
  loading,
  error,
  demo = false,
  onRetry,
}: {
  map: StudentCurriculumMap | null
  loading: boolean
  error: string
  demo?: boolean
  onRetry?: () => void
}) {
  const totalMarks = map?.totals.marks ?? null
  const yearLabel = map?.year?.year ?? 'your year'
  return (
    <PageContainer>
      <BackButton />
      <PageHeader
        title="Your University"
        description="Your own year, laid out clearly: modules and terms, how each is marked, and the timetable your faculty has published so far."
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
        <Panel className="mb-4 flex flex-wrap items-center justify-between gap-3 border-danger/35 bg-danger-tint p-4 text-[13px] text-ink-2">
          {/* The specific reason is intentionally not shown here — only ever
              logged to the console — so nothing technical reaches the page. */}
          <span>Something went wrong loading your university page. Please try again in a moment.</span>
          {onRetry && (
            <button type="button" onClick={onRetry} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-[12.5px] font-semibold text-ink hover:bg-surface-2">
              <Icon icon={RotateCw} size={13} /> Try again
            </button>
          )}
        </Panel>
      )}

      {loading ? (
        <Panel>
          <EmptyState icon={GraduationCap} title="Loading your university page" description="Just a moment while we bring in your modules, timetable and marks." />
        </Panel>
      ) : !map || map.status === 'missing_profile' ? (
        <Panel>
          <EmptyState
            icon={MapPinned}
            title="Tell Synapse where you study"
            description="Add your university and year to your account, and this page will fill in with your own modules and timetable."
            action={<ButtonLink to="/app/account" variant="primary">Open account settings</ButtonLink>}
          />
        </Panel>
      ) : map.status === 'being_verified' || !map.university || !map.year ? (
        <Panel>
          <EmptyState
            icon={TriangleAlert}
            title="This year is being set up"
            description="You're enrolled, but your faculty's curriculum for this year hasn't been published yet. Check back soon."
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
                  {demo && <span className="ms-1 rounded-full bg-primary-tint px-2 text-primary-strong">preview data</span>}
                </div>
                <h2 className="text-balance font-serif text-[30px] font-semibold tracking-[-0.03em] text-ink">{map.university.name}</h2>
                <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-ink-3">
                  <Icon icon={Compass} size={13} />
                  {map.university.region}
                </p>
                <p className="mt-2 max-w-2xl text-pretty text-[14px] leading-relaxed text-ink-2">
                  {demo
                    ? 'This is sample data so you can see how your university page will look and feel.'
                    : `This page shows only what's yours — ${yearLabel} at ${map.university.name}, nothing from any other university or year.`}
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
                  <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">Total marks</p>
                  <p className="tnum mt-2 font-serif text-[26px] font-semibold text-ink">{n(totalMarks)}</p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="min-w-0 space-y-5">
              {map.terms.length === 0 || map.totals.modules === 0 ? (
                <Panel>
                  <EmptyState icon={History} title="No modules published for your year yet" description="Once your faculty's modules are published, they'll appear here, organised by term. Library and Qbank still work in the meantime." />
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
                <PanelHeader title="Coming up" icon={CalendarDays} hint={map.upcoming.length > 0 ? `next ${Math.min(map.upcoming.length, 4)}` : undefined} />
                {map.upcoming.length === 0 ? (
                  <div className="p-4 text-[13px] leading-relaxed text-ink-2">
                    Nothing upcoming yet — your faculty hasn&apos;t published future timetable dates for this year. Past sessions may still show on a module as "from last year".
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
                            <p className="mt-1 text-[12px] text-ink-2">{session.start ? `${formatLongDate(session.start)} · ${formatClock(session.start)}` : session.date ?? 'Date to be announced'}</p>
                            {session.labels.some((label) => friendlyState(label)) && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                <FriendlyBadges labels={session.labels} limit={session.labels.length} />
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
                  <Icon icon={GraduationCap} size={14} />
                  Your enrolment
                </div>
                <p className="text-[13px] leading-relaxed text-ink-2">
                  You&apos;re set up as a <span className="font-semibold text-ink">{map.year.year}</span> student at <span className="font-semibold text-ink">{map.university.name}</span>. Wrong university or year?
                </p>
                <Link to="/app/account" className="mt-3 inline-flex text-[13px] font-semibold text-primary-strong hover:text-primary">Update in account settings</Link>
              </Panel>

              <Panel className="p-4">
                <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                  <Icon icon={ListChecks} size={14} />
                  This year at a glance
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">Topics</p>
                    <p className="tnum mt-1 font-serif text-[22px] font-semibold text-ink">{map.totals.subjects}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">Timetable sessions</p>
                    <p className="tnum mt-1 font-serif text-[22px] font-semibold text-ink">{map.totals.scheduleRows}</p>
                  </div>
                </div>
                {map.totals.marksUnavailable && (
                  <p className="mt-3 text-[12.5px] leading-relaxed text-ink-3">Some modules&apos; marks haven&apos;t been published yet — check back closer to exams.</p>
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
  const { projection, loading, error, retry } = useLiveUniversityProjection()
  const now = useMemo(() => new Date(), [])
  const map = useMemo(() => projection ? normalizeStudentUniversityProjection(projection, now) : null, [now, projection])
  return <CurriculumView map={map} loading={loading} error={error} onRetry={retry} />
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
