/**
 * Running and storing readiness assessments.
 *
 * Kept apart from `useAdaptiveSession` deliberately. A readiness assessment is
 * not a block with different settings — it is a different instrument, with a
 * protocol that cannot be relaxed: timed, blueprint-balanced, drawn from
 * held-out items, no adaptive substitution once it starts, and no route to
 * Tutor mode at all. Sharing a session type with practice would eventually let
 * one of those slip.
 */

import { useCallback, useMemo } from 'react'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  assembleReadiness, READINESS_RESULTS_STORAGE_KEY, scoreReadiness,
  type ReadinessAnswer, type ReadinessAssembly, type ReadinessResult,
} from '@/data/adaptive/readiness'
import type { AdaptiveStudy } from './useAdaptiveStudy'

/** Dotted, so `isUserOwnedState` routes it to the student's own record. */
export const READINESS_SESSION_STORAGE_KEY = 'nishany.progress.adaptive.readinessSession.v1'

export interface ReadinessSession {
  id: string
  /** Item ids in the order assembled, with the group each represents. */
  items: Array<{ itemId: string; groupId: string }>
  answers: Record<string, { chosenIndex: number | null; seconds: number | null }>
  cursor: number
  startedAt: string
  /** Wall-clock seconds allowed for the whole assessment. */
  totalSeconds: number
  /** Groups the pool could not fill, carried so the result can say so. */
  underRepresented: ReadinessAssembly['underRepresented']
}

export function useReadinessResults() {
  return usePersistentState<ReadinessResult[]>(READINESS_RESULTS_STORAGE_KEY, [])
}

/** The most recent result, or null. The dashboard's readiness reading. */
export function useLatestReadiness(): ReadinessResult | null {
  const [results] = useReadinessResults()
  return useMemo(
    () => [...results].sort((a, b) => b.at.localeCompare(a.at))[0] ?? null,
    [results],
  )
}

export function useReadinessSession(study: AdaptiveStudy) {
  const [session, setSession] = usePersistentState<ReadinessSession | null>(READINESS_SESSION_STORAGE_KEY, null)
  const [, setResults] = useReadinessResults()

  const start = useCallback(() => {
    const id = `ra-${Date.now().toString(36)}`
    const assembly = assembleReadiness({
      items: study.items,
      heldOut: study.heldOut,
      nodes: study.blueprint.nodes,
      nodeByConcept: study.blueprint.nodeByConcept,
      scope: study.scope,
      lastPracticedAt: study.lastPracticed,
      config: study.config,
      assessmentId: id,
      now: new Date(),
    })

    setSession({
      id,
      items: assembly.items.map((entry) => ({ itemId: entry.item.id, groupId: entry.groupId })),
      answers: {},
      cursor: 0,
      startedAt: new Date().toISOString(),
      totalSeconds: assembly.items.length * study.config.readiness.secondsPerItem,
      underRepresented: assembly.underRepresented,
    })

    return assembly
  }, [study, setSession])

  const answer = useCallback((itemId: string, chosenIndex: number | null, seconds: number | null) => {
    setSession((current) => {
      if (!current) return current
      return { ...current, answers: { ...current.answers, [itemId]: { chosenIndex, seconds } } }
    })
  }, [setSession])

  const goTo = useCallback((cursor: number) => {
    setSession((current) => (current ? { ...current, cursor } : current))
  }, [setSession])

  /**
   * Score and file the assessment.
   *
   * `correctFor` is passed in rather than read here so this hook never needs the
   * answer key. Everything unanswered is an omission — kept out of the accuracy
   * denominator and reported separately, because a blank is a pacing fact and
   * not a knowledge one.
   */
  const finish = useCallback((correctFor: (itemId: string, chosenIndex: number) => boolean) => {
    if (!session) return null

    const answers: ReadinessAnswer[] = session.items.map(({ itemId, groupId }) => {
      const given = session.answers[itemId]
      const omitted = !given || given.chosenIndex === null
      return {
        questionId: itemId,
        groupId,
        correct: omitted ? false : correctFor(itemId, given.chosenIndex as number),
        seconds: given?.seconds ?? null,
        omitted,
      }
    })

    const assembly: ReadinessAssembly = {
      id: session.id,
      items: [],
      underRepresented: session.underRepresented,
      seed: 0,
      createdAt: session.startedAt,
    }

    const groupLabels = new Map(study.blueprint.nodes.map((node) => [node.groupId, node.groupLabel]))
    const result = scoreReadiness(
      assembly, answers, groupLabels, study.config, study.blueprint.stored?.version ?? null,
    )

    setResults((current) => [result, ...current])
    setSession(null)
    return result
  }, [session, study, setResults, setSession])

  const discard = useCallback(() => setSession(null), [setSession])

  return { session, start, answer, goTo, finish, discard }
}

/** Seconds left, or null when the assessment is untimed. */
export function secondsRemaining(session: ReadinessSession | null, now = Date.now()): number | null {
  if (!session) return null
  const elapsed = (now - new Date(session.startedAt).getTime()) / 1000
  return Math.max(0, Math.round(session.totalSeconds - elapsed))
}
