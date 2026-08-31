/**
 * Turning priorities into a week a person can actually live.
 *
 * The failure mode this file is written against is the familiar one: a planner
 * that fills every free minute, stacks the hardest work back to back, and
 * responds to a missed day by demanding double tomorrow. Students abandon those
 * within a fortnight, and the abandonment looks like laziness in the metrics
 * when it was arithmetic.
 *
 * So: capacity carries a buffer, high-effort sessions are separated, a missed
 * day is partially forgiven rather than fully carried, and every task states
 * why it exists so it can be argued with. Nothing here promises that completing
 * the plan produces readiness — readiness is measured, not planned.
 */

import type { AdaptiveConfig } from './config.ts'
import type { AllocationNeed } from './config.ts'
import { ALLOCATION_NEEDS } from './config.ts'

/** Dotted, so `isUserOwnedState` routes it to the student's own record. */
export const STUDY_PLAN_STORAGE_KEY = 'synapse.progress.adaptive.plan.v1'

export type TaskTier = 'minimum' | 'recommended' | 'stretch'

export type TaskKind =
  | 'practice'
  | 'review'
  | 'calibration'
  | 'resource'
  | 'practical'
  | 'rest'

export interface PlanTask {
  id: string
  /** ISO date, `YYYY-MM-DD`. */
  date: string
  kind: TaskKind
  tier: TaskTier
  title: string
  /** Why this task exists, in words the student can disagree with. */
  reason: string
  expectedMinutes: number
  /** Concepts this is meant to move. Empty for rest. */
  conceptIds: string[]
  /** Blueprint weight this task would contribute to covering, 0–1. */
  blueprintContribution: number
  /** The need it serves, for the weekly balance readout. */
  need: AllocationNeed | null
  /** Suggested item ids, when the task is tied to specific content. */
  questionIds: string[]
  resourceIds: string[]
  /** Locked tasks survive every recalculation untouched. */
  locked: boolean
  completedAt: string | null
  skippedAt: string | null
  /** Every move this task has made, kept rather than overwritten. */
  history: Array<{ at: string; from: string; to: string; reason: string }>
}

export interface DayCapacity {
  /** ISO date. */
  date: string
  /** Minutes the student says they have. */
  statedMinutes: number
  /** Minutes reserved by fixed university events. Not schedulable. */
  reservedMinutes: number
  /** True when the student marked the day unavailable. */
  unavailable: boolean
}

/** Work the week had no room for, named rather than quietly discarded. */
export interface UnplacedTask {
  title: string
  kind: TaskKind
  expectedMinutes: number
  reason: string
}

export interface WeeklyPlan {
  /** ISO date of the Monday this plan starts. */
  weekStart: string
  tasks: PlanTask[]
  /**
   * What did not fit.
   *
   * A planner that drops work silently lets a student believe their week is
   * complete when the most important session in it was discarded for want of
   * ten minutes. The shortfall is surfaced so they can decide what to do.
   */
  unplaced: UnplacedTask[]
  /** Minutes available after buffer and reservations. */
  plannedMinutes: number
  /** Minutes the student stated, before any deduction. */
  statedMinutes: number
  /** Minutes deliberately left unscheduled. */
  bufferMinutes: number
  /** Target minutes per need, before rounding into tasks. */
  needMinutes: Record<AllocationNeed, number>
  generatedAt: string
  configVersion: number
}

/**
 * How much of a day may actually be scheduled.
 *
 * Reserved university events come off first because they are not optional, then
 * the buffer comes off what remains. Taking the buffer from the stated total
 * before reservations would produce days that look free but are not.
 */
export function schedulableMinutes(day: DayCapacity, config: AdaptiveConfig): number {
  if (day.unavailable) return 0
  const free = Math.max(0, day.statedMinutes - day.reservedMinutes)
  return Math.floor(free * (1 - config.schedule.capacityBufferShare))
}

export interface PlanNeedInput {
  need: AllocationNeed
  /** Concepts this need is about, most urgent first. */
  conceptIds: string[]
  /** Human label for the tasks generated. */
  label: string
}

export interface BuildPlanInput {
  weekStart: string
  days: DayCapacity[]
  /** Allocation shares for the student's current exam horizon. */
  shares: Record<AllocationNeed, number>
  needs: PlanNeedInput[]
  /** Concepts requiring a practical station, if the programme has them. */
  practicalConceptIds: string[]
  config: AdaptiveConfig
  /** Blueprint weight per concept, for the contribution figure. */
  blueprintWeights: Map<string, number>
  /** Days before the next exam, or null when nothing is scheduled. */
  daysToExam: number | null
  generatedAt: string
  /** Tasks the student locked, carried through untouched. */
  locked?: PlanTask[]
}

/**
 * The kinds that genuinely tax a student differently.
 *
 * A timed assessment and a hands-on station are not more of the same work —
 * they carry stakes and demand a different kind of attention, and two of them in
 * a row is the stacking the guardrail is about. Ordinary question practice is
 * not on this list: treating every block as high-effort would cap a week at one
 * session per day however many free hours the student actually has, which is a
 * planner refusing to use capacity the student told it about.
 */
const HIGH_EFFORT: ReadonlySet<TaskKind> = new Set<TaskKind>(['calibration', 'practical'])

/**
 * Build a week.
 *
 * Needs are converted to minutes by share, then to tasks of a sane length, then
 * placed across the available days alternating cognitive load. Placement is
 * deliberately simple and readable: a cleverer packer would be harder to explain
 * to the student whose week it is, and the constraint that actually matters —
 * never scheduling every minute — is enforced by the capacity function, not by
 * the packing.
 */
export function buildWeeklyPlan(input: BuildPlanInput): WeeklyPlan {
  const { config, days, shares, generatedAt } = input

  const locked = input.locked?.filter((task) => task.locked) ?? []
  const lockedByDate = new Map<string, number>()
  for (const task of locked) {
    lockedByDate.set(task.date, (lockedByDate.get(task.date) ?? 0) + task.expectedMinutes)
  }

  const statedMinutes = days.reduce((sum, day) => sum + (day.unavailable ? 0 : day.statedMinutes), 0)
  const capacity = days.map((day) => ({
    date: day.date,
    minutes: Math.max(0, schedulableMinutes(day, config) - (lockedByDate.get(day.date) ?? 0)),
  }))
  const plannedMinutes = capacity.reduce((sum, day) => sum + day.minutes, 0)

  const needMinutes = ALLOCATION_NEEDS.reduce((out, need) => {
    out[need] = Math.round(plannedMinutes * (shares[need] ?? 0))
    return out
  }, {} as Record<AllocationNeed, number>)

  const drafts: Array<Omit<PlanTask, 'id' | 'date' | 'tier' | 'history'>> = []

  // Placed before anything else, deliberately. A mock belongs in the week that
  // contains its lead window and nowhere else, and it is the one task that must
  // not be squeezed out when the week is tight — a plan that drops the
  // measurement and keeps the practice has its priorities exactly backwards.
  if (input.daysToExam !== null && input.daysToExam <= config.schedule.mockLeadDays + 7) {
    drafts.push({
      kind: 'calibration',
      title: 'Readiness assessment',
      reason: 'Far enough before your exam that a poor result can still be repaired. This measures where you stand; it is not practice.',
      expectedMinutes: Math.min(
        config.schedule.maxTaskMinutes,
        Math.round((config.readiness.assessmentSize * config.readiness.secondsPerItem) / 60),
      ),
      conceptIds: [],
      blueprintContribution: 0,
      need: null,
      questionIds: [],
      resourceIds: [],
      locked: false,
      completedAt: null,
      skippedAt: null,
    })
  }

  for (const entry of input.needs) {
    let remaining = needMinutes[entry.need] ?? 0
    let index = 0
    while (remaining >= config.schedule.minTaskMinutes) {
      const minutes = Math.min(config.schedule.maxTaskMinutes, remaining)
      // Slice the need's concept queue so consecutive tasks on the same need do
      // not all target the same concept — that is a drill, not a week.
      const conceptIds = entry.conceptIds.slice(index * 3, index * 3 + 3)
      drafts.push({
        kind: taskKindFor(entry.need),
        title: entry.label,
        reason: reasonFor(entry.need, conceptIds.length),
        expectedMinutes: minutes,
        conceptIds,
        blueprintContribution: conceptIds.reduce((sum, id) => sum + (input.blueprintWeights.get(id) ?? 0), 0),
        need: entry.need,
        questionIds: [],
        resourceIds: [],
        locked: false,
        completedAt: null,
        skippedAt: null,
      })
      remaining -= minutes
      index += 1
    }
  }

  if (input.practicalConceptIds.length) {
    drafts.push({
      kind: 'practical',
      title: 'Practical station preparation',
      reason: 'Your programme assesses these concepts at a practical station, which needs separate preparation from written questions.',
      expectedMinutes: config.schedule.maxTaskMinutes,
      conceptIds: input.practicalConceptIds.slice(0, 3),
      blueprintContribution: 0,
      need: null,
      questionIds: [],
      resourceIds: [],
      locked: false,
      completedAt: null,
      skippedAt: null,
    })
  }

  const { placed, unplaced } = placeTasks(drafts, capacity, config, input.weekStart)
  const withRest = addRestDays(placed, days, input.weekStart, config)

  return {
    weekStart: input.weekStart,
    tasks: [...locked, ...withRest].sort((a, b) => a.date.localeCompare(b.date)),
    unplaced,
    plannedMinutes,
    statedMinutes,
    bufferMinutes: Math.max(0, statedMinutes - plannedMinutes),
    needMinutes,
    generatedAt,
    configVersion: config.version,
  }
}

/**
 * `calibration` is reserved for readiness assessments.
 *
 * Measuring unmeasured concepts is done through an ordinary question block, so
 * it is practice. Labelling it calibration would put two different things — a
 * timed measurement the student cannot get feedback during, and a normal block
 * that happens to explore — under one word in the interface.
 */
function taskKindFor(need: AllocationNeed): TaskKind {
  return need === 'review' ? 'review' : 'practice'
}

function reasonFor(need: AllocationNeed, concepts: number): string {
  const scope = concepts ? ` Focused on ${concepts} concept${concepts === 1 ? '' : 's'}.` : ''
  switch (need) {
    case 'weakness': return `Repeated evidence points to gaps here.${scope}`
    case 'coverage': return `These blueprint areas have had little or no practice.${scope}`
    case 'review': return `Scheduled before this is likely to fade.${scope}`
    case 'uncertainty': return `Nothing yet measures these, so a short check tells Nishany where you stand.${scope}`
  }
}

/**
 * Place tasks across the week, alternating cognitive load.
 *
 * Round-robin across days rather than filling each day in turn: filling days
 * sequentially produces three exhausting days and four empty ones, which is
 * both worse for retention and the first thing a student notices and dislikes.
 */
function placeTasks(
  drafts: Array<Omit<PlanTask, 'id' | 'date' | 'tier' | 'history'>>,
  capacity: Array<{ date: string; minutes: number }>,
  config: AdaptiveConfig,
  weekStart: string,
): { placed: PlanTask[]; unplaced: UnplacedTask[] } {
  const remaining = new Map(capacity.map((day) => [day.date, day.minutes]))
  const heavyOnDay = new Map<string, number>()
  const lightOnDay = new Map<string, number>()
  const placed: PlanTask[] = []
  const unplaced: UnplacedTask[] = []

  // Rotate across needs before placing, so consecutive sessions change subject
  // rather than grinding through one need for three days. This is the
  // "alternate cognitive load and modules" rule; the high-effort check below is
  // the separate, stricter guard on assessments and practical stations.
  const ordered = interleaveByNeed(drafts)

  let cursor = 0
  for (const task of ordered) {
    // Whole-hour tasks rarely tile a buffered day exactly, so a session that
    // fits nowhere at full length is shortened to the largest room left rather
    // than dropped. A 45-minute block is worth far more than a perfect 60-minute
    // one that never happens.
    const largestSlot = Math.max(0, ...capacity.map((day) => remaining.get(day.date) ?? 0))
    const draft = largestSlot >= config.schedule.minTaskMinutes && largestSlot < task.expectedMinutes
      ? { ...task, expectedMinutes: largestSlot }
      : task

    let target: string | null = null
    for (let step = 0; step < capacity.length; step++) {
      const day = capacity[(cursor + step) % capacity.length]
      const left = remaining.get(day.date) ?? 0
      if (left < draft.expectedMinutes) continue
      // A day may hold several demanding sessions, but never two in a row: it
      // needs a lighter task between them. A flat per-day cap would limit any
      // week to seven demanding sessions however many free hours the student has.
      if (HIGH_EFFORT.has(draft.kind)) {
        const heavy = heavyOnDay.get(day.date) ?? 0
        const light = lightOnDay.get(day.date) ?? 0
        if (heavy - light >= config.schedule.maxConsecutiveHighEffort) continue
      }
      target = day.date
      cursor = (cursor + step + 1) % capacity.length
      break
    }
    // No day can take it. It is not scheduled — overrunning capacity is the one
    // thing this function exists to prevent — but it is reported, so the student
    // sees that their stated hours cannot hold everything the week wanted.
    if (!target) {
      unplaced.push({
        title: draft.title,
        kind: draft.kind,
        expectedMinutes: draft.expectedMinutes,
        reason: `Needs ${draft.expectedMinutes} uninterrupted minutes, and no day this week has that much left after your other commitments.`,
      })
      continue
    }

    remaining.set(target, (remaining.get(target) ?? 0) - draft.expectedMinutes)
    if (HIGH_EFFORT.has(draft.kind)) heavyOnDay.set(target, (heavyOnDay.get(target) ?? 0) + 1)
    else lightOnDay.set(target, (lightOnDay.get(target) ?? 0) + 1)

    placed.push({
      ...draft,
      id: `task-${weekStart}-${placed.length}`,
      date: target,
      tier: tierFor(placed.length, ordered.length, config),
      history: [],
    })
  }

  return { placed: alternateWithinDays(placed), unplaced }
}

/**
 * Alternate demanding and light work inside each day.
 *
 * Placement decides *which* day; this decides the order within it. Without it a
 * day can end up front-loaded with every demanding session, which is the stacking
 * the capacity rules are there to prevent — the constraint has to hold in the
 * order the student actually works through, not merely in the daily totals.
 */
function alternateWithinDays(tasks: PlanTask[]): PlanTask[] {
  const byDate = new Map<string, PlanTask[]>()
  for (const task of tasks) {
    const bucket = byDate.get(task.date)
    if (bucket) bucket.push(task)
    else byDate.set(task.date, [task])
  }

  const out: PlanTask[] = []
  for (const day of [...byDate.keys()].sort()) {
    const dayTasks = byDate.get(day) ?? []
    const heavy = dayTasks.filter((task) => HIGH_EFFORT.has(task.kind))
    const light = dayTasks.filter((task) => !HIGH_EFFORT.has(task.kind))
    while (heavy.length || light.length) {
      const next = heavy.shift()
      if (next) out.push(next)
      const filler = light.shift()
      if (filler) out.push(filler)
    }
  }
  return out
}

/**
 * Round-robin across needs, preserving the order they were drafted in.
 *
 * High-effort tasks stay at the front of their own queue, because the readiness
 * assessment is drafted first precisely so a tight week places it before
 * anything else competes for the room.
 */
function interleaveByNeed(
  drafts: Array<Omit<PlanTask, 'id' | 'date' | 'tier' | 'history'>>,
): Array<Omit<PlanTask, 'id' | 'date' | 'tier' | 'history'>> {
  const queues = new Map<string, typeof drafts>()
  for (const draft of drafts) {
    const key = draft.need ?? draft.kind
    const bucket = queues.get(key)
    if (bucket) bucket.push(draft)
    else queues.set(key, [draft])
  }

  const out: typeof drafts = []
  const lanes = [...queues.values()]
  while (out.length < drafts.length) {
    for (const lane of lanes) {
      const next = lane.shift()
      if (next) out.push(next)
    }
  }
  return out
}

/**
 * Which tier a task falls into.
 *
 * Three tiers exist so a bad day still has a defined win. A student who manages
 * only the minimum has done the plan, not failed it — and a plan with a single
 * all-or-nothing target is one a busy week destroys.
 */
function tierFor(index: number, total: number, config: AdaptiveConfig): TaskTier {
  if (!total) return 'minimum'
  const position = index / total
  if (position < config.schedule.minimumTierShare) return 'minimum'
  if (position < config.schedule.minimumTierShare + config.schedule.recommendedTierShare) return 'recommended'
  return 'stretch'
}

/** A day with nothing scheduled is named as rest rather than left blank. */
function addRestDays(tasks: PlanTask[], days: DayCapacity[], weekStart: string, config: AdaptiveConfig): PlanTask[] {
  const busy = new Set(tasks.map((task) => task.date))
  const rest = days
    .filter((day) => !busy.has(day.date) && !day.unavailable)
    .map((day, index): PlanTask => ({
      id: `task-${weekStart}-rest-${index}`,
      date: day.date,
      kind: 'rest',
      tier: 'minimum',
      title: 'Rest',
      reason: 'Deliberately unscheduled. Consolidation needs gaps, and a plan with no slack is one a single bad day destroys.',
      expectedMinutes: 0,
      conceptIds: [],
      blueprintContribution: 0,
      need: null,
      questionIds: [],
      resourceIds: [],
      locked: false,
      completedAt: null,
      skippedAt: null,
      history: [],
    }))
  return config.schedule.capacityBufferShare > 0 ? [...tasks, ...rest] : tasks
}

/**
 * Recalculate after missed work, without deleting history.
 *
 * Only a **share** of missed minutes is carried forward. Carrying all of it is
 * how a planner turns one missed day into a week the student cannot face, and
 * the resulting abandonment is far more costly than the work that was missed.
 */
export function carryForward(
  plan: WeeklyPlan,
  today: string,
  config: AdaptiveConfig,
): { missedMinutes: number; carriedMinutes: number; forgivenMinutes: number; tasks: PlanTask[] } {
  const missed = plan.tasks.filter(
    (task) => task.date < today && !task.completedAt && !task.skippedAt && task.kind !== 'rest',
  )
  const missedMinutes = missed.reduce((sum, task) => sum + task.expectedMinutes, 0)
  const carriedMinutes = Math.round(missedMinutes * config.schedule.catchUpShare)

  const tasks = plan.tasks.map((task) =>
    missed.includes(task)
      ? {
          ...task,
          skippedAt: today,
          history: [...task.history, { at: today, from: task.date, to: today, reason: 'Missed; part of this work carries into the next plan.' }],
        }
      : task,
  )

  return { missedMinutes, carriedMinutes, forgivenMinutes: missedMinutes - carriedMinutes, tasks }
}

/**
 * Where a mock belongs.
 *
 * Far enough before the exam that a poor result can still be repaired. A mock
 * two days out measures anxiety and leaves no time to act on what it found.
 */
export function mockDate(examDate: string, config: AdaptiveConfig): string {
  const exam = new Date(examDate)
  exam.setDate(exam.getDate() - config.schedule.mockLeadDays)
  return exam.toISOString().slice(0, 10)
}

/** Minutes planned per day, for the week bar. */
export function minutesByDay(plan: WeeklyPlan): Map<string, number> {
  const totals = new Map<string, number>()
  for (const task of plan.tasks) {
    totals.set(task.date, (totals.get(task.date) ?? 0) + task.expectedMinutes)
  }
  return totals
}

/**
 * The statement that must accompany every plan.
 *
 * Completing a plan is not readiness. Saying so in the plan itself — rather than
 * only in a settings page nobody opens — is the difference between a caveat and
 * a disclaimer.
 */
export const PLAN_CAVEAT =
  'Completing this plan does not by itself mean you are ready. Readiness is measured separately, on blueprint-balanced questions held back from your practice.'
