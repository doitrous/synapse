import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import {
  Stethoscope,
  ClipboardList,
  ScanLine,
  Clock,
  ArrowRight,
  FlaskConical,
  ChevronRight,
} from 'lucide-react'
import { useCatalogueAvailability } from '@/lib/useCatalogueAvailability'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import type { Difficulty } from '@/data/qbank'
import { useLivePracticals } from '@/lib/useLivePracticals'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { subjects } from '@/data/subjects'
import { cn } from '@/lib/cn'
import { useSubjectName } from '@/lib/useSubjectName'
import { FeatureCard, FeatureGrid } from '@/components/hub'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SystemMark } from '@/components/ui/SystemMark'
import { Meter } from '@/components/ui/Meter'
import { Tabs } from '@/components/ui/Tabs'
import { PracticalRunner } from '@/components/practical/PracticalRunner'
import type { RunnerTarget } from '@/components/practical/PracticalRunner'
import { useT } from '@/lib/i18n'

type Open = (target: RunnerTarget) => void

function diffTone(d: Difficulty): 'success' | 'warning' | 'danger' {
  return d === 'Easy' ? 'success' : d === 'Moderate' ? 'warning' : 'danger'
}

/** Row that opens the runner on click or Enter. */
function clickable(onOpen: () => void) {
  return {
    role: 'button' as const,
    tabIndex: 0,
    onClick: onOpen,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onOpen()
      }
    },
    className:
      'flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3.5 transition-colors hover:bg-inset/60 focus-visible:bg-inset focus-visible:outline-none',
  }
}

/**
 * Any practical list, divided by system.
 *
 * Oral questions were grouped by subject and the other four tabs were flat, so
 * the same catalogue was organised one way on one tab and not at all on the
 * next. Catalogue order first, then any system the catalogue does not list —
 * nothing is dropped for being unrecognised.
 */
function SystemSections<T extends { id: string; subjectId: string }>({
  items,
  children,
}: {
  items: T[]
  children: (item: T, indexInSystem: number) => ReactNode
}) {
  const subjectName = useSubjectName()
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const groups = useMemo(() => {
    const buckets = new Map<string, T[]>()
    for (const item of items) {
      const key = item.subjectId || 'unfiled'
      const bucket = buckets.get(key)
      if (bucket) bucket.push(item)
      else buckets.set(key, [item])
    }
    const known = subjects.map((subject) => subject.id).filter((id) => buckets.has(id))
    const rest = [...buckets.keys()].filter((key) => !known.includes(key)).sort()
    return [...known, ...rest].map((key) => ({ key, items: buckets.get(key)! }))
  }, [items])

  return (
    <div className="space-y-3">
      {groups.map((group) => {
        const isCollapsed = collapsed.has(group.key)
        return (
          <Panel key={group.key} className="overflow-hidden">
            <button
              type="button"
              aria-expanded={!isCollapsed}
              onClick={() => setCollapsed((current) => {
                const next = new Set(current)
                if (!next.delete(group.key)) next.add(group.key)
                return next
              })}
              className="flex w-full items-center gap-2.5 border-b border-line bg-surface-2/50 px-4 py-2.5 text-start transition-colors hover:bg-inset/60"
            >
              <Icon icon={ChevronRight} size={15} className={cn('text-ink-3 chevron-turn')} open={!isCollapsed} />
              <SystemMark subjectId={group.key} />
              <h2 className="font-serif text-[15.5px] font-semibold text-ink">{subjectName(group.key)}</h2>
              <span className="tnum ms-auto font-mono text-[11px] text-ink-3">{group.items.length}</span>
            </button>
            {!isCollapsed && (
              <ul className="divide-y divide-line">
                {group.items.map((item, index) => <li key={item.id}>{children(item, index)}</li>)}
              </ul>
            )}
          </Panel>
        )
      })}
    </div>
  )
}

/* ---- OSCE -------------------------------------------------------------- */

function OsceTab({ onOpen }: { onOpen: Open }) {
  const t = useT()
  const { osceStations } = useLivePracticals()
  const availability = useCatalogueAvailability(osceStations.length)
  const { progress } = usePracticalProgress()

  if (availability.kind !== 'ready') {
    return (
      <Panel className="p-8">
        <CatalogueUnavailable
          availability={availability}
          empty={{ title: t('No stations published yet'), description: t('OSCE stations and skills checklists appear here once they are published in Practical Setup.') }}
        />
      </Panel>
    )
  }

  return (
    <SystemSections items={osceStations}>
      {(s) => {
        // The student's own record, not a property of the station.
        const run = progress.stations[s.id]
        const bestPct = run && run.outOf ? Math.round((run.bestMarks / run.outOf) * 100) : null
        const open = () =>
          onOpen({ kind: 'osce', id: s.id, title: s.title, subjectId: s.subjectId, minutes: s.minutes })
        return (
          <div {...clickable(open)}>
            <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
              <Icon icon={Stethoscope} size={18} />
            </span>
            <div className="min-w-0 flex-1">
              {/* The system header already names the system, and the number
                  beside it was only the row's position in a flat list. */}
              <p className="text-[14px] font-medium text-ink">{s.title}</p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[12px] text-ink-3">
                <span>{s.minutes} min</span>
                <span>·</span>
                <span>{s.marks} marks</span>
              </p>
            </div>
            {s.kind === 'checklist' && <Badge tone="outline">{t('Checklist')}</Badge>}
            <Badge tone={diffTone(s.difficulty)}>{s.difficulty}</Badge>
            <div className="w-24 text-end">
              {run ? (
                <>
                  <p className="tnum font-mono text-[13px] font-medium text-ink">{bestPct}%</p>
                  <p className="text-[11px] text-ink-3">
                    {t('best')} · {run.attempts} {run.attempts === 1 ? t('try') : t('tries')}
                  </p>
                </>
              ) : (
                <p className="text-[11.5px] text-ink-3">{t('Not attempted')}</p>
              )}
            </div>
            <Button
              variant={run ? 'secondary' : 'primary'}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                open()
              }}
            >
              {run ? t('Retry') : t('Start')}
            </Button>
          </div>
        )
      }}
    </SystemSections>
  )
}

/* ---- Cases ------------------------------------------------------------- */

function caseStatus(status: string) {
  if (status === 'completed') return { tone: 'success' as const, label: 'Completed', cta: 'Review' }
  if (status === 'in-progress') return { tone: 'primary' as const, label: 'In progress', cta: 'Continue' }
  return { tone: 'neutral' as const, label: 'Not started', cta: 'Start' }
}

function CasesTab({ onOpen }: { onOpen: Open }) {
  const t = useT()
  const { clinicalCases } = useLivePracticals()
  const availability = useCatalogueAvailability(clinicalCases.length)
  const { progress } = usePracticalProgress()

  if (availability.kind !== 'ready') {
    return (
      <Panel className="p-8">
        <CatalogueUnavailable
          availability={availability}
          empty={{ title: t('No cases published yet'), description: t('Clinical cases appear here once they are published in Practical Setup.') }}
        />
      </Panel>
    )
  }

  return (
    <SystemSections items={clinicalCases}>
      {(c) => {
        const record = progress.cases[c.id]
        const st = caseStatus(record?.status ?? 'not-started')
        const open = () => onOpen({ kind: 'case', id: c.id, title: c.title, subjectId: c.subjectId })
        return (
          <div {...clickable(open)}>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-medium text-ink">{c.title}</p>
                <Badge tone={st.tone}>{t(st.label)}</Badge>
              </div>
              <p className="mt-0.5 text-[13px] text-ink-2">{c.presentation}</p>
              <p className="mt-1 flex items-center gap-x-2 text-[12px] text-ink-3">
                <span className="inline-flex items-center gap-1">
                  <Icon icon={Clock} size={12} />
                  {c.minutes} {t('min')}
                </span>
                <span>·</span>
                <span>{c.steps} {t('steps')}</span>
              </p>
            </div>
            <Button
              variant={record?.status === 'in-progress' ? 'primary' : 'secondary'}
              size="sm"
              iconRight={ArrowRight}
              onClick={(e) => {
                e.stopPropagation()
                open()
              }}
            >
              {t(st.cta)}
            </Button>
          </div>
        )
      }}
    </SystemSections>
  )
}

/* ---- Lab & imaging ----------------------------------------------------- */

function LabTab({ onOpen }: { onOpen: Open }) {
  const t = useT()
  const { labImaging } = useLivePracticals()
  const availability = useCatalogueAvailability(labImaging.length)
  const { progress } = usePracticalProgress()

  if (availability.kind !== 'ready') {
    return (
      <Panel className="p-8">
        <CatalogueUnavailable
          availability={availability}
          empty={{ title: t('No lab or imaging sets yet'), description: t('Interpretation sets appear here once they are published in Practical Setup.') }}
        />
      </Panel>
    )
  }

  return (
    <SystemSections items={labImaging}>
      {(l) => {
        const done = progress.labs[l.id]?.done ?? 0
        const pct = l.items ? Math.round((done / l.items) * 100) : 0
        const open = () => onOpen({ kind: 'lab', id: l.id, title: l.title, subjectId: l.subjectId })
        return (
          <div {...clickable(open)}>
            <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
              <Icon icon={l.type === 'Lab' ? FlaskConical : ScanLine} size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-medium text-ink">{l.title}</p>
                <Badge tone="neutral">{l.type}</Badge>
              </div>
              <p className="mt-0.5 flex items-center gap-x-2 text-[12px] text-ink-3">
                <span className="tnum">
                  {done}/{l.items} done
                </span>
              </p>
            </div>
            <Meter value={pct} tone="primary" target className="w-28" />
            <Button
              variant="secondary"
              size="sm"
              iconRight={ArrowRight}
              onClick={(e) => {
                e.stopPropagation()
                open()
              }}
            >
              {done === 0 ? t('Start') : t('Continue')}
            </Button>
          </div>
        )
      }}
    </SystemSections>
  )
}

/* ---- Page -------------------------------------------------------------- */

/** The three sections, in the order the tab strip lists them. */
const PRACTICAL_TABS = ['osce', 'cases', 'lab'] as const
type PracticalTab = (typeof PRACTICAL_TABS)[number]

function isPracticalTab(value: string | null): value is PracticalTab {
  return value !== null && (PRACTICAL_TABS as readonly string[]).includes(value)
}

/**
 * The three sections that left this page, and where they went.
 *
 * Oral questions, Skills and Histology are their own destinations off the
 * Practice hub now — each is something a student sits down to do rather than a
 * tab they land on beside five others. `?tab=oral` is still a link somebody was
 * sent, or a bookmark, so it lands on the new page instead of silently on OSCE.
 * The `tab` parameter is dropped on the way, since it names a tab that no
 * longer exists; anything else on the query rides across.
 */
const MOVED_TABS = new Map<string, string>([
  ['oral', '/app/oral'],
  ['skills', '/app/skills'],
  ['histology', '/app/histology'],
])

export function Practical() {
  const t = useT()
  const { osceStations, clinicalCases, labImaging } = useLivePracticals()
  const { progress } = usePracticalProgress()
  const [params, setParams] = useSearchParams()
  const urlTab = params.get('tab')
  // The URL is the source of truth for which section is open, so a link into
  // `?tab=cases` lands on the cases tab rather than on OSCE with the deep link
  // silently dropped. The state is seeded from it and follows it afterwards.
  const [tab, setTab] = useState<PracticalTab>(() => (isPracticalTab(urlTab) ? urlTab : 'osce'))
  const [active, setActive] = useState<RunnerTarget | null>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isPracticalTab(urlTab)) setTab(urlTab)
  }, [urlTab])

  const selectTab = useCallback((next: string) => {
    const value = isPracticalTab(next) ? next : 'osce'
    setTab(value)
    // `replace`, because moving between three tabs is not three steps back.
    setParams((current) => {
      const search = new URLSearchParams(current)
      search.set('tab', value)
      return search
    }, { replace: true })
  }, [setParams])

  /** Overview card → the section, with the tab strip brought into view. */
  const openSection = useCallback((next: PracticalTab) => {
    selectTab(next)
    const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    tabsRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }, [selectTab])

  // What the student has actually done, against what has been published. The
  // catalogue totals are the denominators so a ring never reads over 100%
  // because of a record left behind by an item that has since been archived.
  const stationsDone = Math.min(Object.keys(progress.stations).length, osceStations.length)
  const casesStarted = Math.min(
    Object.values(progress.cases).filter((entry) => entry.status !== 'not-started').length,
    clinicalCases.length,
  )
  const labsStarted = Math.min(Object.values(progress.labs).filter((entry) => entry.done > 0).length, labImaging.length)

  // A `Map`, not an object literal: `?tab=toString` on a record would return a
  // function from the prototype, and `<Navigate>` would stringify it into a
  // path that lands on NotFound. An unknown tab has to fall through to OSCE.
  const movedTo = urlTab ? MOVED_TABS.get(urlTab) : undefined
  if (movedTo) {
    const rest = new URLSearchParams(params)
    rest.delete('tab')
    const search = rest.toString()
    return <Navigate to={{ pathname: movedTo, search: search ? `?${search}` : '' }} replace />
  }

  if (active) {
    return <PracticalRunner target={active} onExit={() => setActive(null)} />
  }

  return (
    <PageContainer>
      <PageHeader
        title={t('Practical')}
        back={{ fallback: '/app/practice' }}
      />

      {/* The overview: three sections, each saying how far into it you are, so
          the page opens on a decision rather than on whichever tab was first. */}
      <FeatureGrid className="mb-6">
        <FeatureCard
          to="/app/practical?tab=osce"
          onClick={() => openSection('osce')}
          icon={Stethoscope}
          title={t('OSCE Stations')}
          description={t('Timed station rehearsals with the examiner’s checklist marked as you go.')}
          progress={osceStations.length ? { kind: 'ring', value: stationsDone, max: osceStations.length, label: t('stations attempted') } : undefined}
          stats={[
            { label: t('Stations'), value: String(osceStations.length) },
            { label: t('Attempted'), value: String(stationsDone) },
          ]}
        />
        <FeatureCard
          to="/app/practical?tab=cases"
          onClick={() => openSection('cases')}
          icon={ClipboardList}
          title={t('Clinical Cases')}
          description={t('Work a patient forward one decision at a time and see where the reasoning turns.')}
          progress={clinicalCases.length ? { kind: 'ring', value: casesStarted, max: clinicalCases.length, label: t('cases started') } : undefined}
          stats={[
            { label: t('Cases'), value: String(clinicalCases.length) },
            { label: t('Started'), value: String(casesStarted) },
          ]}
        />
        <FeatureCard
          to="/app/practical?tab=lab"
          onClick={() => openSection('lab')}
          icon={ScanLine}
          title={t('Lab & Imaging')}
          description={t('Read the film and the panel: interpretation sets with the findings explained.')}
          progress={labImaging.length ? { kind: 'ring', value: labsStarted, max: labImaging.length, label: t('sets started') } : undefined}
          stats={[
            { label: t('Sets'), value: String(labImaging.length) },
            { label: t('Started'), value: String(labsStarted) },
          ]}
        />
      </FeatureGrid>

      <div ref={tabsRef} className="scroll-mt-20">
        <Tabs
          value={tab}
          onChange={selectTab}
          className="mb-5"
          items={[
            { value: 'osce', label: t('OSCE stations'), icon: Stethoscope, count: osceStations.length },
            { value: 'cases', label: t('Clinical cases'), icon: ClipboardList, count: clinicalCases.length },
            { value: 'lab', label: t('Lab & imaging'), icon: ScanLine, count: labImaging.length },
          ]}
        />
      </div>

      {tab === 'osce' && <OsceTab onOpen={setActive} />}
      {tab === 'cases' && <CasesTab onOpen={setActive} />}
      {tab === 'lab' && <LabTab onOpen={setActive} />}
    </PageContainer>
  )
}
