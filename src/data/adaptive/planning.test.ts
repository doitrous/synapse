import test from 'node:test'
import assert from 'node:assert/strict'
import { defaultAdaptiveConfig, crashHorizonFor, sharesForHorizon } from './config.ts'
import {
  buildWeeklyPlan, carryForward, minutesByDay, mockDate, schedulableMinutes,
  type DayCapacity,
} from './schedule.ts'
import { buildCrashProgramme, claimFor, emptyStudyDays, orderByPrerequisite } from './crashCourse.ts'
import { coverageState } from './coverage.ts'
import type { BlueprintNode } from './blueprint.ts'
import { AT } from './fixtures.ts'

const config = defaultAdaptiveConfig()

const WEEK_START = '2026-08-17'

function week(minutesPerDay = 120, overrides: Partial<Record<number, Partial<DayCapacity>>> = {}): DayCapacity[] {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(WEEK_START)
    date.setDate(date.getDate() + index)
    return {
      date: date.toISOString().slice(0, 10),
      statedMinutes: minutesPerDay,
      reservedMinutes: 0,
      unavailable: false,
      ...overrides[index],
    }
  })
}

function planInput(overrides: Partial<Parameters<typeof buildWeeklyPlan>[0]> = {}) {
  return {
    weekStart: WEEK_START,
    days: week(),
    shares: sharesForHorizon(config, null),
    needs: [
      { need: 'weakness' as const, conceptIds: ['CON-0', 'CON-1', 'CON-2', 'CON-3'], label: 'Weak concept repair' },
      { need: 'coverage' as const, conceptIds: ['CON-4', 'CON-5'], label: 'Blueprint coverage' },
      { need: 'review' as const, conceptIds: ['CON-6'], label: 'Spaced review' },
      { need: 'uncertainty' as const, conceptIds: ['CON-7'], label: 'Measurement' },
    ],
    practicalConceptIds: [],
    config,
    blueprintWeights: new Map(Array.from({ length: 8 }, (_, index) => [`CON-${index}`, 0.125])),
    daysToExam: null,
    generatedAt: AT,
    ...overrides,
  }
}

// ---- exam horizon ----------------------------------------------------------

/** Shares are renormalised, so they carry float noise; compare at display precision. */
function assertShares(actual: Record<string, number>, expected: Record<string, number>) {
  for (const [need, value] of Object.entries(expected)) {
    assert.ok(Math.abs(actual[need] - value) < 1e-9, `${need}: ${actual[need]} vs ${value}`)
  }
}

test('the horizon bands match the published table', () => {
  assertShares(sharesForHorizon(config, 7), { weakness: 0.25, coverage: 0.50, review: 0.15, uncertainty: 0.10 })
  assertShares(sharesForHorizon(config, 30), { weakness: 0.40, coverage: 0.35, review: 0.15, uncertainty: 0.10 })
  assertShares(sharesForHorizon(config, 90), { weakness: 0.45, coverage: 0.25, review: 0.20, uncertainty: 0.10 })
})

test('every published allocation sums to one', () => {
  for (const band of config.horizonBands) {
    const total = Object.values(band.shares).reduce((sum, value) => sum + value, 0)
    assert.ok(Math.abs(total - 1) < 1e-9, `${band.label} sums to ${total}`)
  }
  const fallback = Object.values(config.defaultShares).reduce((sum, value) => sum + value, 0)
  assert.ok(Math.abs(fallback - 1) < 1e-9)
})

test('no exam on the timetable is not treated as an imminent one', () => {
  assert.deepEqual(sharesForHorizon(config, null), sharesForHorizon(config, 90))
})

test('the narrowest matching band wins at a boundary', () => {
  assert.equal(sharesForHorizon(config, 14).coverage, 0.50, '14 days falls in the imminent band, not the wider one')
  assert.equal(sharesForHorizon(config, 15).coverage, 0.35)
})

test('blueprint coverage is a floor that rises as the exam approaches', () => {
  const far = sharesForHorizon(config, 90).coverage
  const near = sharesForHorizon(config, 30).coverage
  const imminent = sharesForHorizon(config, 7).coverage
  assert.ok(far < near && near < imminent)
})

// ---- weekly schedule -------------------------------------------------------

test('a plan never schedules every free minute', () => {
  const plan = buildWeeklyPlan(planInput())
  assert.ok(plan.bufferMinutes > 0, 'a plan with no slack breaks the first time a day goes wrong')
  assert.ok(plan.plannedMinutes < plan.statedMinutes)

  const scheduled = plan.tasks.reduce((sum, task) => sum + task.expectedMinutes, 0)
  assert.ok(scheduled <= plan.plannedMinutes, 'scheduled work fits inside the buffered capacity')
})

test('the buffer is taken after fixed university events, not before', () => {
  const busy: DayCapacity = { date: WEEK_START, statedMinutes: 240, reservedMinutes: 120, unavailable: false }
  assert.equal(schedulableMinutes(busy, config), Math.floor(120 * (1 - config.schedule.capacityBufferShare)))
})

test('an unavailable day is scheduled with nothing at all', () => {
  const days = week(120, { 2: { unavailable: true } })
  const plan = buildWeeklyPlan(planInput({ days }))
  const blocked = days[2].date
  assert.ok(!plan.tasks.some((task) => task.date === blocked && task.expectedMinutes > 0))
})

test('no single day is loaded past its own buffered capacity', () => {
  const plan = buildWeeklyPlan(planInput())
  const capacity = Math.floor(120 * (1 - config.schedule.capacityBufferShare))
  for (const [date, minutes] of minutesByDay(plan)) {
    assert.ok(minutes <= capacity, `${date} was loaded with ${minutes} against a capacity of ${capacity}`)
  }
})

test('assessments and practical stations never sit back to back within a day', () => {
  const heavyKinds = new Set(['calibration', 'practical'])
  // Checked in the order the student works through, not merely in daily totals —
  // a day whose totals look balanced can still be front-loaded with every hard
  // session, which is the stacking the rule exists to prevent.
  for (const minutes of [120, 240, 300]) {
    const plan = buildWeeklyPlan(planInput({ days: week(minutes) }))
    const byDate = new Map<string, string[]>()
    for (const task of plan.tasks) {
      byDate.set(task.date, [...(byDate.get(task.date) ?? []), task.kind])
    }
    for (const [date, kinds] of byDate) {
      let run = 0
      for (const kind of kinds) {
        run = heavyKinds.has(kind) ? run + 1 : 0
        assert.ok(
          run <= config.schedule.maxConsecutiveHighEffort,
          `${date} at ${minutes} min/day stacks ${run} demanding sessions in a row`,
        )
      }
    }
  }
})

test('a longer day earns more work rather than being capped at one session', () => {
  const short = buildWeeklyPlan(planInput({ days: week(120) }))
  const long = buildWeeklyPlan(planInput({ days: week(300) }))
  const minutes = (plan: typeof short) => plan.tasks.reduce((sum, task) => sum + task.expectedMinutes, 0)
  assert.ok(minutes(long) > minutes(short), 'capacity the student actually has must be usable')
})

test('every task states why it exists', () => {
  const plan = buildWeeklyPlan(planInput())
  assert.ok(plan.tasks.length > 0)
  for (const task of plan.tasks) {
    assert.ok(task.reason.length > 0, `${task.title} has no reason`)
    assert.ok(['minimum', 'recommended', 'stretch'].includes(task.tier))
  }
})

test('a plan offers a minimum tier, so a bad day still has a defined win', () => {
  const plan = buildWeeklyPlan(planInput())
  assert.ok(plan.tasks.some((task) => task.tier === 'minimum'))
})

test('locked tasks survive a recalculation untouched', () => {
  const first = buildWeeklyPlan(planInput())
  const locked = { ...first.tasks.find((task) => task.expectedMinutes > 0)!, locked: true }
  const second = buildWeeklyPlan(planInput({ locked: [locked] }))

  const kept = second.tasks.find((task) => task.id === locked.id)
  assert.ok(kept, 'a locked task must not be regenerated away')
  assert.equal(kept?.date, locked.date)
  assert.equal(kept?.expectedMinutes, locked.expectedMinutes)
})

test('a missed day is partly forgiven rather than fully carried', () => {
  const plan = buildWeeklyPlan(planInput())
  const result = carryForward(plan, '2026-08-20', config)

  assert.ok(result.missedMinutes > 0)
  assert.ok(result.carriedMinutes < result.missedMinutes, 'carrying everything is how a planner becomes unusable')
  assert.ok(result.forgivenMinutes > 0)
})

test('carrying forward records history rather than deleting it', () => {
  const plan = buildWeeklyPlan(planInput())
  const result = carryForward(plan, '2026-08-20', config)
  const moved = result.tasks.filter((task) => task.history.length > 0)
  assert.ok(moved.length > 0)
  for (const task of moved) {
    assert.ok(task.skippedAt, 'the task is marked, not removed')
    assert.ok(task.history[0].reason.length > 0)
  }
})

test('a completed task is never treated as missed', () => {
  const plan = buildWeeklyPlan(planInput())
  const done = plan.tasks.map((task) => ({ ...task, completedAt: AT }))
  const result = carryForward({ ...plan, tasks: done }, '2026-08-24', config)
  assert.equal(result.missedMinutes, 0)
})

test('a mock is placed far enough ahead to act on what it finds', () => {
  const placed = mockDate('2026-09-01', config)
  const gap = (new Date('2026-09-01').getTime() - new Date(placed).getTime()) / 86_400_000
  assert.equal(gap, config.schedule.mockLeadDays)
  assert.ok(gap >= 7, 'a mock two days out measures anxiety and leaves no time to repair')
})

test('a readiness assessment is scheduled only when an exam is actually near', () => {
  const far = buildWeeklyPlan(planInput({ daysToExam: null }))
  assert.ok(!far.tasks.some((task) => task.kind === 'calibration'), 'measurement is not weekly furniture')

  const near = buildWeeklyPlan(planInput({ daysToExam: 10 }))
  assert.ok(near.tasks.some((task) => task.kind === 'calibration'))
})

test('a tight week places the measurement first, or says it could not', () => {
  // The mock is the one task a squeezed week must not lose quietly.
  const cramped = buildWeeklyPlan(planInput({ days: week(60), daysToExam: 10 }))
  const scheduled = cramped.tasks.some((task) => task.kind === 'calibration')
  const reported = cramped.unplaced.some((task) => task.kind === 'calibration')
  assert.ok(scheduled || reported, 'the assessment is either placed or named as unplaceable')
})

test('work that does not fit the week is reported, never silently discarded', () => {
  const cramped = buildWeeklyPlan(planInput({ days: week(30) }))
  const asked = cramped.tasks.filter((task) => task.expectedMinutes > 0).length + cramped.unplaced.length
  assert.ok(asked > 0)
  for (const task of cramped.unplaced) {
    assert.ok(task.reason.includes('minutes'), 'the reason says concretely what was missing')
  }
})

test('a week with room for everything reports nothing unplaced', () => {
  const roomy = buildWeeklyPlan(planInput({ days: week(300) }))
  assert.equal(roomy.unplaced.length, 0)
})

test('a week with no capacity produces no work rather than an impossible plan', () => {
  const plan = buildWeeklyPlan(planInput({ days: week(0) }))
  assert.equal(plan.plannedMinutes, 0)
  assert.equal(plan.tasks.filter((task) => task.expectedMinutes > 0).length, 0)
})

// ---- crash courses ---------------------------------------------------------

const crashNodes: BlueprintNode[] = Array.from({ length: 40 }, (_, index) => ({
  conceptId: `CON-${index}`,
  label: `Concept ${index}`,
  groupId: `GRP-${index % 5}`,
  groupLabel: `Group ${index % 5}`,
  weight: 1 / 40,
  overridden: false,
}))

function crashInput(overrides: Partial<Parameters<typeof buildCrashProgramme>[0]> = {}) {
  return {
    daysToExam: 30,
    startDate: WEEK_START,
    nodes: crashNodes,
    coverage: coverageState(crashNodes, new Map()),
    states: new Map(),
    poolByConcept: new Map(crashNodes.map((node) => [node.conceptId, 5])),
    prerequisites: new Map<string, string[]>(),
    config,
    generatedAt: AT,
    ...overrides,
  }
}

test('the crash horizons match the published table', () => {
  assert.equal(crashHorizonFor(config, 10)?.days, 14)
  assert.equal(crashHorizonFor(config, 30)?.days, 30)
  assert.equal(crashHorizonFor(config, 45)?.days, 60)
  assert.equal(crashHorizonFor(config, 70)?.days, 75)
  assert.equal(crashHorizonFor(config, 200), null, 'a distant exam needs a normal plan, not a crash course')
})

test('a crash programme reserves mocks, review and catch-up days', () => {
  const programme = buildCrashProgramme(crashInput())
  const kinds = new Set(programme.days.map((day) => day.kind))
  assert.ok(kinds.has('mock'))
  assert.ok(kinds.has('review'))
  assert.ok(kinds.has('catch-up'), 'something will slip; a programme with no slack breaks when it does')
})

test('prerequisites are scheduled before the concepts that depend on them', () => {
  const prerequisites = new Map([['CON-5', ['CON-1']], ['CON-1', ['CON-0']]])
  const ordered = orderByPrerequisite(['CON-5', 'CON-1', 'CON-0'], prerequisites)
  assert.ok(ordered.indexOf('CON-0') < ordered.indexOf('CON-1'))
  assert.ok(ordered.indexOf('CON-1') < ordered.indexOf('CON-5'))
})

test('a cycle in the prerequisite graph does not hang the generator', () => {
  const cyclic = new Map([['CON-0', ['CON-1']], ['CON-1', ['CON-0']]])
  const ordered = orderByPrerequisite(['CON-0', 'CON-1'], cyclic)
  assert.equal(ordered.length, 2, 'a content error must not cost the student their programme')
})

test('a prerequisite outside the selected set is skipped, not invented', () => {
  const ordered = orderByPrerequisite(['CON-5'], new Map([['CON-5', ['CON-999']]]))
  assert.deepEqual(ordered, ['CON-5'])
})

test('a concept with no approved questions is reported, never silently dropped', () => {
  const poolByConcept = new Map(crashNodes.map((node, index) => [node.conceptId, index < 30 ? 5 : 0]))
  const programme = buildCrashProgramme(crashInput({ poolByConcept }))

  assert.ok(programme.unreachableWeight > 0)
  assert.ok(programme.unreachableGroups.length > 0)
  assert.ok(programme.claim.includes('%'), 'the claim names the gap in figures')

  const scheduled = new Set(programme.days.flatMap((day) => day.conceptIds))
  for (const node of crashNodes.slice(30)) {
    assert.ok(!scheduled.has(node.conceptId), 'a concept with no questions cannot be studied')
  }
})

test('the claim narrows as coverage falls, rather than staying a fixed promise', () => {
  const band = config.crashHorizons.find((entry) => entry.days === 30)!
  assert.ok(claimFor(0, band).includes('full exam blueprint'))
  assert.ok(claimFor(0.08, band).includes('most of your exam blueprint'))

  const partial = claimFor(0.4, band)
  assert.ok(partial.includes('cannot claim to cover your exam'))
  assert.ok(partial.includes('targeted practice'))
})

test('a compressed horizon still covers the blueprint, not just "high yield"', () => {
  const short = buildCrashProgramme(crashInput({ daysToExam: 14 }))
  const scheduled = new Set(short.days.flatMap((day) => day.conceptIds))
  assert.equal(scheduled.size, crashNodes.length, 'compression changes emphasis, not the syllabus')
})

test('a 14-day programme emphasises coverage over repair, and a 75-day one the reverse', () => {
  const imminent = buildCrashProgramme(crashInput({ daysToExam: 14 })).shares
  const distant = buildCrashProgramme(crashInput({ daysToExam: 70 })).shares
  assert.ok(imminent.coverage > imminent.weakness)
  assert.ok(distant.weakness > distant.coverage)
})

test('a programme reports study days it could not fill', () => {
  const sparse = new Map(crashNodes.map((node, index) => [node.conceptId, index < 2 ? 5 : 0]))
  const programme = buildCrashProgramme(crashInput({ poolByConcept: sparse, daysToExam: 60 }))
  assert.ok(emptyStudyDays(programme) > 0, 'an empty day is the honest signal that the bank ran out')
})

test('a programme never runs past the exam', () => {
  const programme = buildCrashProgramme(crashInput({ daysToExam: 10 }))
  assert.ok(programme.days.length <= 10)
  assert.equal(programme.days[0].dayNumber, 1)
})
