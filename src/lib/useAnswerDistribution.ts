import { useEffect, useState } from 'react'
import { API_MODE, apiPost } from './api'
import { usePersistentState } from './usePersistentState'
import { ANSWER_STATS_CONFIG_KEY, DEFAULT_ANSWER_STATS_CONFIG, normaliseAnswerStatsConfig, type AnswerStatsConfig } from '@/data/answerStats'
import type { AnswerDistribution, AnswerDistributionResponse } from '@/data/answerDistribution'

/**
 * One question's breakdown, fetched at most once per page load.
 *
 * Keyed by questionId rather than scoped to a component instance: the same
 * question can be on screen in more than one surface (a runner and its own
 * navigator preview), and re-revealing a question already answered this
 * session — paging back and forth in a review pass — must not re-hit the
 * server for the same numbers. A miss (server said not eligible, or the
 * request failed) is cached as `null` too, so a low-cohort question is not
 * retried on every reveal.
 */
const cache = new Map<string, AnswerDistribution | null>()
const inflight = new Map<string, Promise<AnswerDistribution | null>>()

function fetchOne(questionId: string): Promise<AnswerDistribution | null> {
  const cached = cache.get(questionId)
  if (cached !== undefined) return Promise.resolve(cached)
  const pending = inflight.get(questionId)
  if (pending) return pending

  const request = apiPost<AnswerDistributionResponse>('/qbank/answer-distribution', { questionIds: [questionId] })
    .then((response) => {
      const found = response.distributions.find((entry) => entry.questionId === questionId) ?? null
      cache.set(questionId, found)
      return found
    })
    // A stats fetch must never disrupt the question itself — a missing peer
    // breakdown is silent, not an error state anyone sees.
    .catch(() => {
      cache.set(questionId, null)
      return null
    })
    .finally(() => { inflight.delete(questionId) })

  inflight.set(questionId, request)
  return request
}

/**
 * The peer answer breakdown for a revealed question, or null when there is
 * none to show — the toggle is off, nothing has been revealed yet, the app is
 * running in demo mode, or the server has not returned one (below the
 * eligibility floor, or the fetch simply failed).
 */
export function useAnswerDistribution(questionId: string | null, revealed: boolean): AnswerDistribution | null {
  const [cfg] = usePersistentState<AnswerStatsConfig>(ANSWER_STATS_CONFIG_KEY, DEFAULT_ANSWER_STATS_CONFIG)
  const enabled = normaliseAnswerStatsConfig(cfg).enabled
  const shouldFetch = Boolean(API_MODE && enabled && revealed && questionId)

  const [distribution, setDistribution] = useState<AnswerDistribution | null>(
    shouldFetch && questionId ? cache.get(questionId) ?? null : null,
  )

  useEffect(() => {
    if (!shouldFetch || !questionId) {
      setDistribution(null)
      return
    }
    const cached = cache.get(questionId)
    if (cached !== undefined) {
      setDistribution(cached)
      return
    }
    let cancelled = false
    setDistribution(null)
    void fetchOne(questionId).then((result) => { if (!cancelled) setDistribution(result) })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetch, questionId])

  return shouldFetch ? distribution : null
}
