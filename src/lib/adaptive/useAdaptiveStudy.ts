/**
 * Everything the Adaptive Study surface reads, assembled once.
 *
 * The page is built from many small panels that all need the same derived
 * picture — concept states, coverage, the exam horizon, the item pool. Deriving
 * that per panel would replay the evidence ledger a dozen times per render and,
 * worse, let two panels disagree about what the student's state is.
 */

import { useMemo } from 'react'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { useStudentSchedule } from '@/lib/useStudentSchedule'
import { nextExam } from '@/lib/studentSchedule'
import { useScopedQuestions } from '@/lib/content'
import { adaptiveItemsFrom } from '@/data/adaptive/itemProjection'
import { itemInScope, type AdaptiveItem } from '@/data/adaptive/item'
import { rebuildAll, type ConceptState } from '@/data/adaptive/masteryModel'
import { coverageState, COVERAGE_DEBT_STORAGE_KEY, EMPTY_COVERAGE_DEBT, type CoverageDebt } from '@/data/adaptive/coverage'
import { normaliseNodes } from '@/data/adaptive/blueprint'
import { outOfScopeConcepts, snoozedConcepts, useConceptOverrides } from './useConceptOverrides'
import { sharesForHorizon, type AdaptiveConfig, type AllocationShares } from '@/data/adaptive/config'
import { misconceptionsFrom, type MisconceptionRecord } from '@/data/adaptive/misconceptions'
import { EMPTY_HELD_OUT, heldOutIds, HELD_OUT_STORAGE_KEY, type HeldOutRegistry } from '@/data/adaptive/readiness'
import type { ScoringContext } from '@/data/adaptive/priority'
import { useAdaptiveConfig, useResolvedBlueprint, type ResolvedBlueprint } from './useAdaptiveConfig'
import {
  useAdaptiveEvidence, useBoosts, useDistinctItemsByConcept, useExposure, useLastPracticed,
} from './useAdaptiveEvidence'
import type { AdaptiveEvidenceEvent } from '@/data/adaptive/evidenceLedger'
import type { BoostLedger } from '@/data/adaptive/boosts'
import type { CoverageState } from '@/data/adaptive/coverage'

/** Blocks whose concepts and topics count as "recently seen". */
const RECENT_BLOCKS = 3

/**
 * Questions in a day beyond which fatigue is treated as total.
 *
 * Fatigue is measured across the day rather than within one block, because the
 * block is built once, up front — rebuilding it as the student tires would move
 * questions under their feet. Two full blocks is the point at which a demanding
 * item stops producing evidence about knowledge and starts producing evidence
 * about stamina.
 */
const FATIGUE_SATURATION = 80

export interface AdaptiveStudy {
  config: AdaptiveConfig
  blueprint: ResolvedBlueprint
  /** Every approved, in-scope item this student may be asked. */
  items: AdaptiveItem[]
  /** Items reserved for readiness measurement, excluded from practice. */
  heldOut: Set<string>
  events: AdaptiveEvidenceEvent[]
  states: Map<string, ConceptState>
  coverage: CoverageState
  misconceptions: MisconceptionRecord[]
  boosts: BoostLedger
  debt: CoverageDebt
  exposure: Map<string, number>
  lastPracticed: Map<string, string>
  distinctItemsByConcept: Map<string, number>
  /** Days until the next exam on the timetable, or null when none is published. */
  daysToExam: number | null
  examTitle: string | null
  shares: AllocationShares
  /** How much work today has already taken out of the student, 0–1. */
  fatigue: number
  scope: { universityId: string; yearId: string }
  /** True while any stored document is still being read. */
  loading: boolean
  /** True when the student's university and year are not known yet. */
  scopeUnknown: boolean
  /** A scoring context, ready for the builder. `fatigue` is per-session. */
  context: (fatigue: number, now?: Date) => ScoringContext
}

export function useAdaptiveStudy(): AdaptiveStudy {
  const { audience, audienceUnknown } = useIdentity()
  const [config] = useAdaptiveConfig()
  /**
   * Questions only, already narrowed to this student's university and year by
   * the server. Adaptive Study asks nothing of an article or a resource, and
   * this used to be the whole admin ledger — every article body included —
   * read out of local storage.
   */
  const [catalogue, catalogueStatus] = useScopedQuestions()
  const [registry] = usePersistentState<HeldOutRegistry>(HELD_OUT_STORAGE_KEY, EMPTY_HELD_OUT)
  const [debt] = usePersistentState<CoverageDebt>(COVERAGE_DEBT_STORAGE_KEY, EMPTY_COVERAGE_DEBT)
  const [boosts] = useBoosts()

  const scope = useMemo(
    () => ({ universityId: audience.universityId, yearId: audience.yearId }),
    [audience.universityId, audience.yearId],
  )

  const rawBlueprint = useResolvedBlueprint(scope)
  const { events, loading: evidenceLoading } = useAdaptiveEvidence()
  const { sessions } = useStudentSchedule()
  const [overrides] = useConceptOverrides()

  const exam = useMemo(() => nextExam(sessions), [sessions])

  const excluded = useMemo(() => outOfScopeConcepts(overrides), [overrides])
  const deferred = useMemo(() => snoozedConcepts(overrides), [overrides])

  /**
   * The blueprint after the student's own decisions.
   *
   * A concept the student put out of scope is removed outright — it must stop
   * counting toward coverage, or they would carry permanent unpayable debt for
   * material they have correctly told us is not on their exam. Weights are
   * renormalised so the remaining blueprint still sums to one.
   */
  const blueprint = useMemo(() => {
    if (!excluded.size) return rawBlueprint
    const nodes = normaliseNodes(rawBlueprint.nodes.filter((node) => !excluded.has(node.conceptId)))
    return {
      ...rawBlueprint,
      nodes,
      weights: new Map(nodes.map((node) => [node.conceptId, node.weight])),
      nodeByConcept: new Map(nodes.map((node) => [node.conceptId, node])),
      empty: nodes.length === 0,
    }
  }, [rawBlueprint, excluded])

  const items = useMemo(() => {
    // The approval gate runs first and the scope gate second. Both are absolute:
    // no score computed later can readmit anything filtered out here.
    const approved = adaptiveItemsFrom(catalogue)
    return approved.filter((item) => {
      if (!itemInScope(item, scope)) return false
      // An item is withheld only when *every* concept it assesses is excluded or
      // deferred. Dropping it because one of four tagged concepts was snoozed
      // would quietly remove far more of the bank than the student asked to.
      const assessed = item.conceptIds
      if (!assessed.length) return true
      return assessed.some((conceptId) => !excluded.has(conceptId) && !deferred.has(conceptId))
    })
  }, [catalogue, scope, excluded, deferred])

  const heldOut = useMemo(() => heldOutIds(items, registry, config), [items, registry, config])

  const states = useMemo(() => rebuildAll(events, config), [events, config])
  const distinctItemsByConcept = useDistinctItemsByConcept(events)
  const exposure = useExposure(events)
  const lastPracticed = useLastPracticed(events)

  const coverage = useMemo(
    () => coverageState(blueprint.nodes, distinctItemsByConcept),
    [blueprint.nodes, distinctItemsByConcept],
  )

  const rationaleFor = useMemo(() => {
    const byId = new Map(items.map((item) => [item.id, item.optionRationales]))
    return (questionId: string, optionIndex: number) => byId.get(questionId)?.[optionIndex] ?? ''
  }, [items])

  const misconceptions = useMemo(
    () => misconceptionsFrom(events, rationaleFor),
    [events, rationaleFor],
  )

  const recent = useMemo(() => {
    const blockIds = [...new Set(events.map((event) => event.blockId))].slice(-RECENT_BLOCKS)
    const wanted = new Set(blockIds)
    const conceptIds = new Set<string>()
    const questionIds = new Set<string>()
    for (const event of events) {
      if (!wanted.has(event.blockId)) continue
      conceptIds.add(event.conceptId)
      questionIds.add(event.questionId)
    }
    const topics = new Set(
      items.filter((item) => questionIds.has(item.id)).map((item) => item.topic),
    )
    return { conceptIds, topics }
  }, [events, items])

  const shares = useMemo(
    () => sharesForHorizon(config, exam?.daysAway ?? null),
    [config, exam],
  )

  const fatigue = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    // Counted per attempt: one question tagged to four concepts is one question
    // answered, not four, and counting events would report a student as
    // exhausted after five items.
    const answeredToday = new Set(
      events.filter((event) => event.at.slice(0, 10) === today).map((event) => event.attemptId),
    ).size
    return Math.min(1, answeredToday / FATIGUE_SATURATION)
  }, [events])

  const context = useMemo(() => (fatigue: number, now = new Date()): ScoringContext => ({
    config,
    states,
    blueprintWeights: blueprint.weights,
    nodeByConcept: blueprint.nodeByConcept,
    coverage,
    distinctItemsByConcept,
    boosts,
    exposureByQuestion: exposure,
    recentConceptIds: recent.conceptIds,
    recentTopics: recent.topics,
    fatigue,
    now,
  }), [config, states, blueprint, coverage, distinctItemsByConcept, boosts, exposure, recent])

  return {
    config,
    blueprint,
    items,
    heldOut,
    events,
    states,
    coverage,
    misconceptions,
    boosts,
    debt,
    exposure,
    lastPracticed,
    distinctItemsByConcept,
    daysToExam: exam?.daysAway ?? null,
    examTitle: exam?.session.title ?? null,
    shares,
    fatigue,
    scope,
    loading: evidenceLoading || !catalogueStatus.hydrated,
    scopeUnknown: audienceUnknown,
    context,
  }
}

/** Concepts grouped by status, for the headline counts and the concept table. */
export function statusCounts(states: Map<string, ConceptState>, conceptIds: string[]) {
  const counts = { unmeasured: 0, attention: 0, weak: 0, developing: 0, secure: 0, 'review-due': 0 }
  for (const conceptId of conceptIds) {
    const state = states.get(conceptId)
    // A concept on the blueprint with no evidence is unmeasured, not absent.
    // Skipping it would let a student read "0 unmeasured" on their first day.
    counts[state?.status ?? 'unmeasured'] += 1
  }
  return counts
}

/**
 * Raw wrong attempts, as the student experienced them.
 *
 * Shown next to the weak-concept count, never instead of it. The two numbers
 * differ on purpose, and a student who sees only the smaller one concludes the
 * app has lost their mistakes.
 */
export function rawWrongTotal(events: AdaptiveEvidenceEvent[]): number {
  return new Set(events.filter((event) => event.correct === false).map((event) => event.attemptId)).size
}
