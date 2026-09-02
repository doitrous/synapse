/**
 * The week, and — when an exam is close enough — the compressed programme.
 *
 * Written against the planner failure everyone has met: every free minute
 * filled, the hardest work stacked, and a missed day answered with an impossible
 * catch-up. So the buffer is shown rather than hidden, unplaced work is named,
 * and the statement that finishing the plan is not readiness sits inside the
 * plan rather than in a settings page nobody opens.
 */

import { useMemo, useState } from 'react'
import { CalendarRange, Clock3, Gauge, Layers, ListChecks } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Field, TextInput } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { Caveat, ShareRow, SubHeading, percent } from './parts'
import { buildWeeklyPlan, PLAN_CAVEAT, type DayCapacity, type PlanTask, type TaskTier } from '@/data/adaptive/schedule'
import { buildCrashProgramme, CRASH_CAVEAT, emptyStudyDays, type CrashDay } from '@/data/adaptive/crashCourse'
import { NEED_LABEL, ALLOCATION_NEEDS } from '@/data/adaptive/config'
import type { AdaptiveStudy } from '@/lib/adaptive/useAdaptiveStudy'
import { useConceptLabels, usePrerequisites } from '@/lib/adaptive/useAdaptiveConfig'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** The Monday of the week containing `from`. */
function weekStart(from = new Date()): string {
  const date = new Date(from)
  const offset = (date.getDay() + 6) % 7
  date.setDate(date.getDate() - offset)
  return date.toISOString().slice(0, 10)
}

const TIER_TONE = { minimum: 'primary', recommended: 'neutral', stretch: 'outline' } as const
const TIER_LABEL: Record<TaskTier, string> = { minimum: 'Minimum', recommended: 'Recommended', stretch: 'Stretch' }
// `Review` alone is already the Dashboard's imperative verb, so the day kind
// carries its own key rather than overriding that translation.
const DAY_KIND_LABEL: Record<CrashDay['kind'], string> = {
  study: 'Study', mock: 'Mock', review: 'Review day', 'catch-up': 'Catch-up', rest: 'Rest',
}

function TaskRow({ task }: { task: PlanTask }) {
  const t = useT()
  if (task.kind === 'rest') {
    return (
      <div className="rounded-lg border border-dashed border-line px-3 py-2.5">
        <p className="text-[12.5px] font-medium text-ink-3">{t('Rest')}</p>
        <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-3">{t(task.reason)}</p>
      </div>
    )
  }
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <p className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">{t(task.title)}</p>
        <span className="tnum shrink-0 font-mono text-[11px] text-ink-2">{task.expectedMinutes}m</span>
        <Badge tone={TIER_TONE[task.tier]}>{t(TIER_LABEL[task.tier])}</Badge>
      </div>
      <p className="mt-1 text-[11.5px] leading-relaxed text-ink-3">{t(task.reason)}</p>
    </div>
  )
}

export function Plan({ study }: { study: AdaptiveStudy }) {
  const t = useT()
  const [minutesPerDay, setMinutesPerDay] = useState(90)
  const labels = useConceptLabels()
  const prerequisites = usePrerequisites()

  const start = useMemo(() => weekStart(), [])

  const days: DayCapacity[] = useMemo(() => Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(date.getDate() + index)
    return {
      date: date.toISOString().slice(0, 10),
      statedMinutes: minutesPerDay,
      reservedMinutes: 0,
      unavailable: false,
    }
  }), [start, minutesPerDay])

  const needs = useMemo(() => {
    const byStatus = (wanted: string[]) => [...study.states.entries()]
      .filter(([, state]) => wanted.includes(state.status))
      .map(([conceptId]) => conceptId)

    return [
      { need: 'weakness' as const, conceptIds: byStatus(['weak', 'attention']), label: 'Weak concept repair' },
      {
        need: 'coverage' as const,
        conceptIds: study.coverage.uncoveredConcepts.map((entry) => entry.conceptId),
        label: 'Blueprint coverage',
      },
      { need: 'review' as const, conceptIds: byStatus(['review-due']), label: 'Spaced review' },
      {
        need: 'uncertainty' as const,
        conceptIds: study.blueprint.nodes
          .filter((node) => !study.states.has(node.conceptId))
          .map((node) => node.conceptId),
        label: 'Measuring what is unknown',
      },
    ]
  }, [study.states, study.coverage.uncoveredConcepts, study.blueprint.nodes])

  const plan = useMemo(() => buildWeeklyPlan({
    weekStart: start,
    days,
    shares: study.shares,
    needs,
    practicalConceptIds: [],
    config: study.config,
    blueprintWeights: study.blueprint.weights,
    daysToExam: study.daysToExam,
    generatedAt: new Date().toISOString(),
  }), [start, days, study.shares, needs, study.config, study.blueprint.weights, study.daysToExam])

  const programme = useMemo(() => {
    if (study.daysToExam === null || study.blueprint.empty) return null
    const poolByConcept = new Map<string, number>()
    for (const item of study.items) {
      for (const conceptId of item.mainConceptIds) {
        poolByConcept.set(conceptId, (poolByConcept.get(conceptId) ?? 0) + 1)
      }
    }
    return buildCrashProgramme({
      daysToExam: study.daysToExam,
      startDate: new Date().toISOString().slice(0, 10),
      nodes: study.blueprint.nodes,
      coverage: study.coverage,
      states: study.states,
      poolByConcept,
      prerequisites,
      config: study.config,
      generatedAt: new Date().toISOString(),
    })
  }, [study, prerequisites])

  const byDate = useMemo(() => {
    const grouped = new Map<string, PlanTask[]>()
    for (const task of plan.tasks) {
      const bucket = grouped.get(task.date)
      if (bucket) bucket.push(task)
      else grouped.set(task.date, [task])
    }
    return grouped
  }, [plan.tasks])

  return (
    <div className="space-y-5">
      <Panel>
        <PanelHeader
          title={t('This week')}
          icon={CalendarRange}
          hint={t('{hours}h planned').replace('{hours}', String(Math.round(plan.plannedMinutes / 60)))}
          action={
            <div className="w-40">
              <Field label={t('Minutes per day')}>
                <TextInput
                  type="number"
                  min={0}
                  max={600}
                  value={minutesPerDay}
                  onChange={(event) => setMinutesPerDay(Math.max(0, Number(event.target.value) || 0))}
                />
              </Field>
            </div>
          }
        />
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...byDate.entries()].map(([date, tasks]) => (
            <div key={date} className="min-w-0 space-y-2">
              <div className="flex items-baseline justify-between">
                <p className="text-[12px] font-semibold text-ink">
                  {t(DAY_NAMES[new Date(date).getDay()])}
                </p>
                <span className="tnum font-mono text-[11px] text-ink-3">
                  {tasks.reduce((sum, task) => sum + task.expectedMinutes, 0)}m
                </span>
              </div>
              {tasks.map((task) => <TaskRow key={task.id} task={task} />)}
            </div>
          ))}
        </div>
        <div className="space-y-3 border-t border-line p-5">
          <div className="flex flex-wrap gap-2">
            <Badge tone="outline">
              <span className="tnum font-mono">{Math.round(plan.bufferMinutes / 60)}h</span> {t('left unscheduled')}
            </Badge>
            <Badge tone="outline">{t('Config v{version}').replace('{version}', String(plan.configVersion))}</Badge>
          </div>
          {plan.unplaced.length > 0 && (
            <Caveat>
              {plan.unplaced.length}{' '}
              {plan.unplaced.length === 1
                ? t('session could not be placed in this week:')
                : t('sessions could not be placed in this week:')}{' '}
              {plan.unplaced.map((task) => t(task.title)).join(', ')}
              {t('. Your stated hours cannot hold everything the plan wanted, and the shortfall is shown rather than dropped.')}
            </Caveat>
          )}
          <Caveat>{t(PLAN_CAVEAT)}</Caveat>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title={t("Where the week's time goes")} icon={Gauge} />
        <div className="space-y-3.5 p-5">
          {ALLOCATION_NEEDS.map((need) => (
            <ShareRow
              key={need}
              label={t(NEED_LABEL[need])}
              value={plan.needMinutes[need]}
              max={Math.max(1, plan.plannedMinutes)}
              right={`${plan.needMinutes[need]}m`}
              tone={need === 'weakness' ? 'primary' : 'neutral'}
            />
          ))}
        </div>
      </Panel>

      {programme ? (
        <Panel>
          <PanelHeader
            title={t('{days}-day programme').replace('{days}', String(programme.band.days))}
            icon={Layers}
            hint={t(programme.band.emphasis)}
            action={<Badge tone="outline">{t(programme.band.assessmentCadence)}</Badge>}
          />
          <div className="space-y-4 p-5">
            <p className="text-[13.5px] leading-relaxed text-ink-2">{t(programme.claim)}</p>

            {programme.unreachableGroups.length > 0 && (
              <Caveat>
                {t('No approved questions exist for')}{' '}
                <span className="tnum font-mono">{percent(programme.unreachableWeight)}</span>{' '}
                {t('of your blueprint by weight:')}{' '}
                {programme.unreachableGroups.slice(0, 4).map((group) => group.groupLabel).join(', ')}
                {t('. These are listed rather than left out silently.')}
              </Caveat>
            )}

            {emptyStudyDays(programme) > 0 && (
              <Caveat>
                <span className="tnum font-mono">{emptyStudyDays(programme)}</span>{' '}
                {t('study days have nothing to schedule — the question bank ran out before the programme did.')}
              </Caveat>
            )}

            <div>
              <SubHeading>{t('First two weeks')}</SubHeading>
              <div className="mt-3 space-y-1.5">
                {programme.days.slice(0, 14).map((day) => (
                  <div
                    key={day.date}
                    className={cn(
                      'flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg border px-3 py-2',
                      day.kind === 'study' ? 'border-line bg-surface' : 'border-dashed border-line bg-surface-2',
                    )}
                  >
                    <span className="tnum w-10 shrink-0 font-mono text-[11px] text-ink-3">{t('Day')} {day.dayNumber}</span>
                    <Badge tone={day.kind === 'mock' ? 'primary' : 'outline'}>{t(DAY_KIND_LABEL[day.kind])}</Badge>
                    <p className="min-w-0 flex-1 text-[12.5px] text-ink-2">
                      {day.labels.length
                        ? day.labels.map((label, index) => labels.get(day.conceptIds[index]) ?? label).join(' · ')
                        : t(day.reason)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Caveat>{t(CRASH_CAVEAT)}</Caveat>
          </div>
        </Panel>
      ) : (
        <Panel>
          <PanelHeader title={t('Crash programme')} icon={Layers} />
          <EmptyState
            icon={ListChecks}
            title={t('No exam close enough for a compressed programme')}
            description={
              study.daysToExam === null
                ? t('No exam is published on your timetable, so nothing here is going to invent a countdown.')
                : t('Your exam is far enough away that an ordinary weekly plan serves you better.')
            }
          />
        </Panel>
      )}

      <Panel>
        <PanelHeader title={t('Capacity')} icon={Clock3} />
        <Table>
          <thead>
            <tr>
              <Th>{t('Capacity reading')}</Th>
              <Th align="end">{t('Minutes')}</Th>
            </tr>
          </thead>
          <tbody>
            <Tr><Td>{t('You said you have')}</Td><Td align="end" className="tnum font-mono">{plan.statedMinutes}</Td></Tr>
            <Tr><Td>{t('Planned')}</Td><Td align="end" className="tnum font-mono">{plan.plannedMinutes}</Td></Tr>
            <Tr>
              <Td>{t('Deliberately left free')}</Td>
              <Td align="end" className="tnum font-mono text-primary-strong">{plan.bufferMinutes}</Td>
            </Tr>
          </tbody>
        </Table>
      </Panel>
    </div>
  )
}
