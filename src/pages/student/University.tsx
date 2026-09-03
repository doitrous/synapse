import { useCallback, useMemo } from 'react'
import {
  ArrowLeft, BookOpen, CalendarDays, Compass, FileQuestion, GraduationCap, History,
  Link2, ListChecks, MapPinned, Microscope, RotateCw, Scale, Stethoscope,
  TriangleAlert,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Icon } from '@/components/ui/Icon'
import { Skeleton, SkeletonCard } from '@/components/ui/Skeleton'
import { Meter } from '@/components/ui/Meter'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { SystemMark } from '@/components/ui/SystemMark'
import { API_MODE } from '@/lib/api'
import { formatClock, formatLongDate } from '@/lib/format'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import {
  normalizeStudentUniversityProjection,
  type StudentAssessmentMap,
  type StudentCurriculumMap,
  type StudentModuleMap,
  type StudentScheduleMap,
  type StudentSubjectMap,
} from './universityModel'
import { useDemoUniversityProjection, useLiveUniversityProjection } from './useStudentCurriculum'

function n(value: number | null, t: (en: string) => string = (en) => en): string {
  if (value === null) return t('unavailable')
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
  const t = useT()
  const resolved = labels.map(friendlyState).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)).slice(0, limit)
  if (resolved.length === 0) return null
  return (
    <>
      {resolved.map((entry) => <Badge key={entry.text} tone={entry.tone}>{t(entry.text)}</Badge>)}
    </>
  )
}

function SubjectTree({ subjects, depth = 0 }: { subjects: StudentSubjectMap[]; depth?: number }) {
  const t = useT()
  if (subjects.length === 0) return <p className="text-[12.5px] text-ink-3">{t("Your faculty hasn't published a topic breakdown for this module yet.")}</p>
  return (
    <ul className={cn(depth === 0 && 'space-y-1.5')}>
      {subjects.map((subject) => (
        <li key={subject.id} className="min-w-0">
          <div className="flex min-w-0 items-center gap-2 py-0.5" style={{ paddingInlineStart: `${depth * 0.8}rem` }}>
            <span className={cn('size-1.5 shrink-0 rounded-full', depth === 0 ? 'bg-primary/55' : 'bg-accent/45')} />
            <span className="truncate text-[12.5px] text-ink-2">{subject.name}</span>
            {subject.coverageCount > 0 && (
              <span className="hidden shrink-0 text-[11px] text-ink-3 sm:inline">{subject.coverageCount} {t('resources')}</span>
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
  const t = useT()
  if (badge === 'verified') return <Badge tone="success" dot>{t('Marks confirmed')}</Badge>
  if (badge === 'carried-forward') return <Badge tone="neutral" dot>{t('Continued from last year')}</Badge>
  if (badge === 'inferred') return <Badge tone="accent" dot>{t('Estimated')}</Badge>
  if (badge === 'being-verified') return <Badge tone="warning" dot>{t('Being confirmed')}</Badge>
  if (badge === 'needs-marks') return <Badge tone="warning" dot>{t('Marks coming soon')}</Badge>
  return <Badge tone="warning" dot>{t('Schedule coming soon')}</Badge>
}

function AssessmentPanel({ assessment }: { assessment: StudentAssessmentMap }) {
  const t = useT()
  const visibleComponents = assessment.components.filter((component) => component.marks !== null)
  const maxComponent = Math.max(1, ...visibleComponents.map((component) => component.marks ?? 0))
  const status = friendlyState(assessment.status)
  return (
    <div className="rounded-lg border border-line bg-surface-2 p-3">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Total marks')}</p>
          <p className="tnum mt-1 font-serif text-[26px] font-semibold leading-none text-ink">{assessment.displayTotal === 'unavailable' ? t('Not published yet') : assessment.displayTotal}</p>
        </div>
        <Icon icon={Scale} size={18} className="text-ink-3" />
      </div>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {status && <Badge tone={status.tone} dot>{t(status.text)}</Badge>}
        {assessment.credits !== null && <Badge tone="outline">{assessment.credits} {t('credit hours')}</Badge>}
        {assessment.passRule && <Badge tone="outline">{assessment.passRule}</Badge>}
      </div>
      {visibleComponents.length === 0 ? (
        <p className="text-[12.5px] leading-relaxed text-ink-3">{t("Your faculty hasn't published how this module's marks break down yet.")}</p>
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
  const t = useT()
  if (rows.length === 0) {
    return <p className="text-[12.5px] leading-relaxed text-ink-3">{t("Schedule coming soon — your faculty hasn't published this module's timetable yet.")}</p>
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
                {row.start ? `${formatLongDate(row.start)} · ${formatClock(row.start)}` : row.date ?? t('Date to be announced')}
                {row.location ? ` · ${row.location}` : ''}
              </p>
            </div>
            <Badge tone={row.isExam ? 'warning' : 'outline'}>{row.label}</Badge>
          </div>
          {(row.labels.some((label) => friendlyState(label)) || row.linkCount > 0) && (
            <div className="mt-2 flex flex-wrap gap-1">
              <FriendlyBadges labels={row.labels} limit={row.labels.length} />
              {row.linkCount > 0 && <Badge tone="accent"><Icon icon={Link2} size={11} /> {row.linkCount} {t('resources linked')}</Badge>}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

function ModuleCard({ module }: { module: StudentModuleMap }) {
  const t = useT()
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
                {module.moduleId} · {module.subjectCount} {module.subjectCount === 1 ? t('topic') : t('topics')} · {module.schedule.length} {module.schedule.length === 1 ? t('session') : t('sessions')}
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
                {t('Topics covered')}
              </div>
              <SubjectTree subjects={module.subjects} />
            </div>
            <div className="rounded-lg border border-line bg-surface-2 p-3">
              <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                <Icon icon={CalendarDays} size={14} />
                {t('Timetable')}
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

/** ArrowLeft to the previous screen, falling back to the dashboard when this
 * is the first entry in the tab's history (a fresh tab, a bookmark, a deep link). */
function BackButton() {
  const t = useT()
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
      className="mb-3 inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 -ms-2 sm:min-h-9 text-[12.5px] font-medium text-ink-2 hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
    >
      <Icon icon={ArrowLeft} size={15} className="rtl:-scale-x-100" />
      {t('Back')}
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
  const t = useT()
  const totalMarks = map?.totals.marks ?? null
  const yearLabel = map?.year?.year ?? t('your year')
  return (
    <PageContainer>
      <BackButton />
      <PageHeader
        title={t('Your University')}
        actions={
          <>
            <ButtonLink to="/app/library" variant="secondary" iconLeft={BookOpen}>{t('Library')}</ButtonLink>
            <ButtonLink to="/app/qbank" variant="secondary" iconLeft={FileQuestion}>{t('Qbank')}</ButtonLink>
            <ButtonLink to="/app/practical" variant="secondary" iconLeft={Stethoscope}>{t('Practical')}</ButtonLink>
            <ButtonLink to="/app/calendar" variant="primary" iconLeft={CalendarDays}>{t('Calendar')}</ButtonLink>
          </>
        }
      />

      {error && (
        <Panel className="mb-4 flex flex-wrap items-center justify-between gap-3 border-danger/35 bg-danger-tint p-4 text-[13px] text-ink-2">
          {/* The specific reason is intentionally not shown here — only ever
              logged to the console — so nothing technical reaches the page. */}
          <span>{t('Something went wrong loading your university page. Please try again in a moment.')}</span>
          {onRetry && (
            <button type="button" onClick={onRetry} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-[12.5px] font-semibold text-ink hover:bg-surface-2">
              <Icon icon={RotateCw} size={13} /> {t('Try again')}
            </button>
          )}
        </Panel>
      )}

      {loading ? (
        <div className="space-y-4" aria-label={t('Loading your university page')}>
          <SkeletonCard className="h-40" />
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="min-w-0 space-y-3">
              <SkeletonCard className="h-32" />
              <SkeletonCard className="h-32" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-40" />
              <Skeleton className="h-20" />
            </div>
          </div>
        </div>
      ) : !map || map.status === 'missing_profile' ? (
        <Panel>
          <EmptyState
            icon={MapPinned}
            title={t('Tell Nishany where you study')}
            description={t('Add your university and year to your account, and this page will fill in with your own modules and timetable.')}
            action={<ButtonLink to="/app/account" variant="primary">{t('Open account settings')}</ButtonLink>}
          />
        </Panel>
      ) : map.status === 'being_verified' || !map.university || !map.year ? (
        <Panel>
          <EmptyState
            icon={TriangleAlert}
            title={t('This year is being set up')}
            description={t("You're enrolled, but your faculty's curriculum for this year hasn't been published yet. Check back soon.")}
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
                  {demo && <span className="ms-1 rounded-full bg-primary-tint px-2 text-primary-strong">{t('preview data')}</span>}
                </div>
                <h2 className="text-balance font-serif text-[30px] font-semibold tracking-[-0.03em] text-ink">{map.university.name}</h2>
                <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-ink-3">
                  <Icon icon={Compass} size={13} />
                  {map.university.region}
                </p>
                <p className="mt-2 max-w-2xl text-pretty text-[14px] leading-relaxed text-ink-2">
                  {demo
                    ? t('This is sample data so you can see how your university page will look and feel.')
                    : t("This page shows only what's yours — {year} at {university}, nothing from any other university or year.").replace('{year}', yearLabel).replace('{university}', map.university.name)}
                </p>
              </div>
              <div className="grid grid-cols-3 border-t border-line bg-surface-2 md:border-s md:border-t-0">
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">{t('Academic terms')}</p>
                  <p className="tnum mt-2 font-serif text-[26px] font-semibold text-ink">{map.totals.terms}</p>
                </div>
                <div className="border-s border-line p-4">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">{t('Modules')}</p>
                  <p className="tnum mt-2 font-serif text-[26px] font-semibold text-ink">{map.totals.modules}</p>
                </div>
                <div className="border-s border-line p-4">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">{t('Total marks')}</p>
                  <p className="tnum mt-2 font-serif text-[26px] font-semibold text-ink">{n(totalMarks, t)}</p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="min-w-0 space-y-5">
              {map.terms.length === 0 || map.totals.modules === 0 ? (
                <Panel>
                  <EmptyState icon={History} title={t('No modules published for your year yet')} description={t("Once your faculty's modules are published, they'll appear here, organised by term. Library and Qbank still work in the meantime.")} />
                </Panel>
              ) : map.terms.map((term, index) => (
                <section key={term.term} className="relative ps-7">
                  <span className="absolute start-2 top-8 bottom-[-1.25rem] w-px bg-line" aria-hidden />
                  <span className="absolute start-0 top-2 grid size-4 place-items-center rounded-full border border-primary-line bg-primary-tint">
                    <span className="size-1.5 rounded-full bg-primary" />
                  </span>
                  <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">{t('Term {n}').replace('{n}', String(index + 1))}</p>
                      <h2 className="font-serif text-[23px] font-semibold tracking-[-0.025em] text-ink">{term.term}</h2>
                    </div>
                    <Badge tone="outline">{t('{modules} modules · {marks} marks').replace('{modules}', String(term.modules.length)).replace('{marks}', n(term.marks, t))}</Badge>
                  </div>
                  <div className="space-y-3">
                    {term.modules.map((module) => <ModuleCard key={module.id} module={module} />)}
                  </div>
                </section>
              ))}
            </div>

            <aside className="space-y-4 xl:sticky xl:top-4 xl:self-start">
              <Panel className="overflow-hidden">
                <PanelHeader title={t('Coming up')} icon={CalendarDays} hint={map.upcoming.length > 0 ? t('next {n}').replace('{n}', String(Math.min(map.upcoming.length, 4))) : undefined} />
                {map.upcoming.length === 0 ? (
                  <div className="p-4 text-[13px] leading-relaxed text-ink-2">
                    {t('Nothing upcoming yet — your faculty hasn\'t published future timetable dates for this year. Past sessions may still show on a module as "from last year".')}
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
                            <p className="mt-1 text-[12px] text-ink-2">{session.start ? `${formatLongDate(session.start)} · ${formatClock(session.start)}` : session.date ?? t('Date to be announced')}</p>
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
                  {t('Your enrolment')}
                </div>
                <p className="text-[13px] leading-relaxed text-ink-2">
                  {t("You're set up as a")} <span className="font-semibold text-ink">{map.year.year}</span> {t('student at')} <span className="font-semibold text-ink">{map.university.name}</span>{t('. Wrong university or year?')}
                </p>
                <Link to="/app/account" className="mt-3 inline-flex min-h-11 items-center text-[13px] font-semibold text-primary-strong hover:text-primary sm:min-h-0">{t('Update in account settings')}</Link>
              </Panel>

              <Panel className="p-4">
                <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.07em] text-ink-3">
                  <Icon icon={ListChecks} size={14} />
                  {t('This year at a glance')}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">{t('Topics')}</p>
                    <p className="tnum mt-1 font-serif text-[22px] font-semibold text-ink">{map.totals.subjects}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.08em] text-ink-3">{t('Timetable sessions')}</p>
                    <p className="tnum mt-1 font-serif text-[22px] font-semibold text-ink">{map.totals.scheduleRows}</p>
                  </div>
                </div>
                {map.totals.marksUnavailable && (
                  <p className="mt-3 text-[12.5px] leading-relaxed text-ink-3">{t("Some modules' marks haven't been published yet — check back closer to exams.")}</p>
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
  const { projection, loading, error } = useDemoUniversityProjection()
  const now = useMemo(() => new Date(), [])
  const map = useMemo(() => normalizeStudentUniversityProjection(projection, now), [now, projection])
  return <CurriculumView map={map} loading={loading} error={error} demo />
}

export function University() {
  return API_MODE ? <LiveUniversity /> : <DemoUniversity />
}
