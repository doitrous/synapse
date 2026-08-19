/**
 * Compressed programmes, for the horizons students actually arrive with.
 *
 * A crash course compresses the same blueprint and the same evidence model. It
 * does **not** swap them for "high-yield only" — which is the standard offer and
 * a dishonest one, because "high yield" in a compressed programme almost always
 * means "the topics we happen to have the most questions about".
 *
 * What compression legitimately changes: the emphasis between repair and
 * coverage, how often measurement happens, and how far a prerequisite gap is
 * chased. What it must never change: the blueprint itself, or the claim made
 * about the result.
 */

import type { AdaptiveConfig, AllocationShares, CrashHorizonBand } from './config.ts'
import { crashHorizonFor } from './config.ts'
import type { BlueprintNode } from './blueprint.ts'
import type { CoverageState } from './coverage.ts'
import type { ConceptState } from './masteryModel.ts'

export interface CrashDay {
  /** ISO date. */
  date: string
  /** 1-based, so the interface can say "day 6 of 30". */
  dayNumber: number
  /** Concepts clustered for this day, prerequisites before dependents. */
  conceptIds: string[]
  labels: string[]
  /** Blueprint weight this day would touch, 0–1. */
  blueprintWeight: number
  /** Sum of the day's cognitive demand, used to keep two heavy days apart. */
  load: number
  kind: 'study' | 'mock' | 'review' | 'catch-up' | 'rest'
  reason: string
}

export interface CrashProgramme {
  /** The horizon band this programme was generated under. */
  band: CrashHorizonBand
  daysToExam: number
  days: CrashDay[]
  shares: AllocationShares
  /**
   * Blueprint weight the programme cannot reach with the questions available.
   *
   * Reported prominently rather than hidden. A programme that silently omits
   * 20% of the blueprint and calls itself complete is the single most damaging
   * thing a crash course can do.
   */
  unreachableWeight: number
  unreachableGroups: Array<{ groupId: string; groupLabel: string; weight: number }>
  /** Narrowed claim when coverage is insufficient. */
  claim: string
  generatedAt: string
  configVersion: number
}

export interface BuildCrashInput {
  daysToExam: number
  /** ISO date the programme starts. */
  startDate: string
  nodes: BlueprintNode[]
  coverage: CoverageState
  states: Map<string, ConceptState>
  /** Concept id → how many approved questions exist for it. */
  poolByConcept: Map<string, number>
  /** Concept id → concepts that must come first. */
  prerequisites: Map<string, string[]>
  config: AdaptiveConfig
  generatedAt: string
}

/** Days reserved for measurement, review and slack, by horizon. */
function reservedDays(band: CrashHorizonBand): { mocks: number; review: number; catchUp: number } {
  if (band.days <= 14) return { mocks: 2, review: 1, catchUp: 1 }
  if (band.days <= 30) return { mocks: 4, review: 2, catchUp: 3 }
  if (band.days <= 60) return { mocks: 4, review: 4, catchUp: 5 }
  return { mocks: 5, review: 6, catchUp: 7 }
}

/**
 * Order concepts so prerequisites land before what depends on them.
 *
 * A depth-first walk with cycle protection. Teaching a dependent concept before
 * its prerequisite does not merely waste a day — it produces a wrong answer that
 * the mastery model then records as a weakness in the *dependent* concept, and
 * the student is sent to repair the wrong thing.
 */
export function orderByPrerequisite(
  conceptIds: string[],
  prerequisites: Map<string, string[]>,
): string[] {
  const wanted = new Set(conceptIds)
  const ordered: string[] = []
  const placed = new Set<string>()
  const visiting = new Set<string>()

  const visit = (conceptId: string) => {
    if (placed.has(conceptId) || !wanted.has(conceptId)) return
    // A cycle in the graph is a content error, not a reason to hang. Break it
    // and keep the ordering stable — the concept still gets scheduled.
    if (visiting.has(conceptId)) return
    visiting.add(conceptId)
    for (const dependency of prerequisites.get(conceptId) ?? []) visit(dependency)
    visiting.delete(conceptId)
    placed.add(conceptId)
    ordered.push(conceptId)
  }

  for (const conceptId of conceptIds) visit(conceptId)
  return ordered
}

/**
 * Build a compressed programme.
 *
 * Concepts are ranked by what the horizon emphasises — repair first when there
 * is time, blueprint weight first when there is not — then ordered by
 * prerequisite, then dealt across the study days that remain after mocks,
 * review and catch-up are reserved.
 */
export function buildCrashProgramme(input: BuildCrashInput): CrashProgramme {
  const { config, nodes, coverage, states, poolByConcept, daysToExam } = input
  const band = crashHorizonFor(config, daysToExam) ?? config.crashHorizons[0]
  const reserved = reservedDays(band)

  // Anything with no approved questions cannot be studied here, however heavily
  // the blueprint weights it. Saying so is the point; quietly dropping it is the
  // failure mode.
  const reachable = nodes.filter((node) => (poolByConcept.get(node.conceptId) ?? 0) > 0)
  const unreachable = nodes.filter((node) => (poolByConcept.get(node.conceptId) ?? 0) === 0)

  const unreachableWeight = unreachable.reduce((sum, node) => sum + node.weight, 0)
  const unreachableGroups = groupWeights(unreachable)

  const urgencyOf = (node: BlueprintNode): number => {
    const state = states.get(node.conceptId)
    const untouched = !coverage.concepts.find((entry) => entry.conceptId === node.conceptId)?.touched
    const repair = state && state.mean < config.statuses.weakBelow ? config.statuses.weakBelow - state.mean : 0
    // The horizon's own shares decide the balance, rather than a second set of
    // constants: a 14-day programme weights coverage at 0.50 and repair at 0.25,
    // and this ranking should say exactly the same thing.
    return band.shares.coverage * node.weight * (untouched ? 1 : 0.3)
      + band.shares.weakness * repair
  }

  const ranked = [...reachable].sort((a, b) => urgencyOf(b) - urgencyOf(a) || a.conceptId.localeCompare(b.conceptId))
  const ordered = orderByPrerequisite(ranked.map((node) => node.conceptId), input.prerequisites)
  const nodeById = new Map(nodes.map((node) => [node.conceptId, node]))

  const total = Math.max(1, Math.min(daysToExam, band.days))
  const studyDays = Math.max(1, total - reserved.mocks - reserved.review - reserved.catchUp)
  const perDay = Math.max(1, Math.ceil(ordered.length / studyDays))

  const days: CrashDay[] = []
  const start = new Date(input.startDate)
  let cursor = 0

  for (let dayNumber = 1; dayNumber <= total; dayNumber++) {
    const date = new Date(start)
    date.setDate(date.getDate() + dayNumber - 1)
    const iso = date.toISOString().slice(0, 10)

    const kind = dayKind(dayNumber, total, reserved)
    if (kind !== 'study') {
      days.push({
        date: iso,
        dayNumber,
        conceptIds: [],
        labels: [],
        blueprintWeight: 0,
        load: 0,
        kind,
        reason: REASON_BY_KIND[kind],
      })
      continue
    }

    const cluster = ordered.slice(cursor, cursor + perDay)
    cursor += cluster.length
    const clusterNodes = cluster.map((id) => nodeById.get(id)).filter((node): node is BlueprintNode => Boolean(node))

    days.push({
      date: iso,
      dayNumber,
      conceptIds: cluster,
      labels: clusterNodes.map((node) => node.label),
      blueprintWeight: clusterNodes.reduce((sum, node) => sum + node.weight, 0),
      load: cluster.length,
      kind: 'study',
      reason: cluster.length
        ? 'Selected by blueprint weight and current evidence, with prerequisites placed before the concepts that depend on them.'
        : 'Nothing outstanding for this day — use it for consolidation.',
    })
  }

  return {
    band,
    daysToExam,
    days,
    shares: band.shares,
    unreachableWeight,
    unreachableGroups,
    claim: claimFor(unreachableWeight, band),
    generatedAt: input.generatedAt,
    configVersion: config.version,
  }
}

const REASON_BY_KIND: Record<CrashDay['kind'], string> = {
  study: '',
  mock: 'A timed, blueprint-balanced assessment. Placed with enough time left to act on what it finds.',
  review: 'Revisiting earlier days. Spacing is what makes compressed study hold.',
  'catch-up': 'Deliberately empty. Something will slip, and a programme with no slack breaks the first time it does.',
  rest: 'Rest. Consolidation happens in the gaps.',
}

/**
 * Which kind of day this is.
 *
 * Mocks are spread rather than clustered at the end, so each one still leaves
 * room to repair what it exposes. Catch-up days sit late, where the accumulated
 * slippage actually is.
 */
function dayKind(dayNumber: number, total: number, reserved: ReturnType<typeof reservedDays>): CrashDay['kind'] {
  if (dayNumber === total) return 'rest'
  if (dayNumber === 1) return 'mock'

  const mockInterval = Math.max(2, Math.floor(total / Math.max(1, reserved.mocks)))
  if (dayNumber % mockInterval === 0 && dayNumber < total - 1) return 'mock'

  const catchUpStart = total - reserved.catchUp
  if (dayNumber > catchUpStart) return 'catch-up'

  const reviewInterval = Math.max(3, Math.floor(total / Math.max(1, reserved.review)))
  if (dayNumber % reviewInterval === 0) return 'review'

  return 'study'
}

function groupWeights(nodes: BlueprintNode[]): Array<{ groupId: string; groupLabel: string; weight: number }> {
  const groups = new Map<string, { groupId: string; groupLabel: string; weight: number }>()
  for (const node of nodes) {
    const current = groups.get(node.groupId)
    if (current) current.weight += node.weight
    else groups.set(node.groupId, { groupId: node.groupId, groupLabel: node.groupLabel, weight: node.weight })
  }
  return [...groups.values()].sort((a, b) => b.weight - a.weight)
}

/**
 * What the programme is allowed to claim.
 *
 * Narrowed automatically as coverage falls. The alternative — one fixed
 * marketing sentence regardless of what the bank can actually support — is how
 * a student ends up believing they have covered a syllabus they have not seen.
 */
export function claimFor(unreachableWeight: number, band: CrashHorizonBand): string {
  const missing = Math.round(unreachableWeight * 100)
  if (missing <= 0) {
    return `A ${band.days}-day programme covering your full exam blueprint, emphasising ${band.emphasis.toLowerCase()}.`
  }
  if (missing < 15) {
    return `A ${band.days}-day programme covering most of your exam blueprint. About ${missing}% by weight has no approved questions yet and is not included.`
  }
  return `A partial ${band.days}-day programme. About ${missing}% of your blueprint by weight has no approved questions yet, so this cannot claim to cover your exam. Treat it as targeted practice, not a complete course.`
}

/** Study days that carry no concepts — the honest signal that the pool ran out. */
export function emptyStudyDays(programme: CrashProgramme): number {
  return programme.days.filter((day) => day.kind === 'study' && day.conceptIds.length === 0).length
}

/** The statement that must accompany every crash programme. */
export const CRASH_CAVEAT =
  'This programme compresses your blueprint; it does not shorten it. Completing it is not a score prediction, and no part of it is a guarantee. Anything your question bank cannot yet cover is listed above rather than left out silently.'
