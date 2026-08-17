/**
 * Reading and writing the evidence ledger.
 *
 * Sharded by month for the same reason `useAttemptLog` is: `usePersistentState`
 * rewrites a whole document per change, so one flat log would re-upload a
 * student's entire history on every answer.
 *
 * The write path is the interesting part. One submitted response produces one
 * immutable event **per assessed concept**, plus independent updates to boosts
 * and the attempt log. Each consumer is idempotent, so a retry — a flaky
 * connection, a double-click, a re-render — adds nothing the first pass did not.
 */

import { useCallback, useMemo } from 'react'
import { usePersistentState } from '@/lib/usePersistentState'
import { useRecordAttempt } from '@/lib/useAttemptLog'
import {
  adaptiveEvidenceMonthKey, ADAPTIVE_EVIDENCE_INDEX_KEY, appendEvidence, emptyEvidenceMonth,
  EMPTY_EVIDENCE_INDEX, evidenceId, evidenceMonth, indexEvidence, recentEvidenceMonths,
  type AdaptiveEvidenceEvent, type AdaptiveEvidenceIndex, type AdaptiveEvidenceMonth,
  type AttemptOutcome, type Confidence, type ExposureState, type PresentationMode,
} from '@/data/adaptive/evidenceLedger'
import { ADAPTIVE_BOOSTS_STORAGE_KEY, recordError, recordRepair, type BoostLedger } from '@/data/adaptive/boosts'
import { misconceptionId } from '@/data/adaptive/misconceptions'
import { conceptRole, type AdaptiveItem } from '@/data/adaptive/item'
import type { AdaptiveConfig } from '@/data/adaptive/config'

/** Months of evidence the hooks load. Fixed, because it decides the hook count. */
export const EVIDENCE_MONTHS = 12

/* eslint-disable react-hooks/rules-of-hooks -- the month count is a module
   constant, so this loop runs a fixed number of hooks on every render. */
/**
 * A year of evidence, oldest first.
 *
 * Longer than the attempt log's six months because the decay half-life is sixty
 * days: an estimate rebuilt from six months of evidence would silently discard
 * the tail that the model is still meant to be forgetting gradually.
 */
export function useAdaptiveEvidence(): { events: AdaptiveEvidenceEvent[]; loading: boolean } {
  const months = useMemo(() => recentEvidenceMonths(EVIDENCE_MONTHS), [])

  const shards: AdaptiveEvidenceMonth[] = []
  let hydrated = true
  for (const month of months) {
    const [value, , status] = usePersistentState<AdaptiveEvidenceMonth>(
      adaptiveEvidenceMonthKey(month), () => emptyEvidenceMonth(month),
    )
    shards.push(value)
    if (!status.hydrated) hydrated = false
  }

  // The loop builds a new array each render, so the merge is keyed on what
  // actually changed: how many events each month now holds.
  const signature = shards.map((shard) => `${shard.month}:${shard.events.length}`).join('|')
  const flat = shards.flatMap((shard) => shard.events)
  const events = useMemo(
    () => [...flat].sort((a, b) => a.at.localeCompare(b.at)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [signature],
  )

  return { events, loading: !hydrated }
}
/* eslint-enable react-hooks/rules-of-hooks */

export function useEvidenceIndex(): AdaptiveEvidenceIndex {
  const [index] = usePersistentState<AdaptiveEvidenceIndex>(ADAPTIVE_EVIDENCE_INDEX_KEY, EMPTY_EVIDENCE_INDEX)
  return index
}

export function useBoosts() {
  return usePersistentState<BoostLedger>(ADAPTIVE_BOOSTS_STORAGE_KEY, {})
}

/** One submitted response, before it is split across consumers. */
export interface SubmittedAnswer {
  item: AdaptiveItem
  blockId: string
  /** Index of the option chosen, or null for a blank or timeout. */
  chosenIndex: number | null
  correct: boolean | null
  outcome: AttemptOutcome
  confidence: Confidence
  seconds: number | null
  mode: PresentationMode
  exposure: ExposureState
}

/**
 * Commit one answer.
 *
 * The consumers below run in a fixed order but do not depend on each other:
 * each is keyed so that running it twice changes nothing. The ordering exists
 * only so a reader can follow it, not because a later step needs an earlier
 * one to have finished.
 */
export function useRecordAdaptiveAnswer(config: AdaptiveConfig) {
  const month = evidenceMonth(new Date())
  const [, setMonth] = usePersistentState<AdaptiveEvidenceMonth>(
    adaptiveEvidenceMonthKey(month), () => emptyEvidenceMonth(month),
  )
  const [, setIndex] = usePersistentState<AdaptiveEvidenceIndex>(ADAPTIVE_EVIDENCE_INDEX_KEY, EMPTY_EVIDENCE_INDEX)
  const [, setBoosts] = useBoosts()
  const recordAttempt = useRecordAttempt()

  return useCallback((answer: SubmittedAnswer) => {
    const at = new Date().toISOString()
    const { item } = answer
    const attemptId = `${answer.blockId}:${item.id}`

    // A distractor the student chose, when the author wrote a rationale for it.
    // Without that rationale there is nothing teachable to target, so no
    // misconception is recorded rather than one being invented from an index.
    const wrongIndex = answer.correct === false && answer.chosenIndex !== null ? answer.chosenIndex : null
    const misconception = wrongIndex !== null && item.optionRationales[wrongIndex]?.trim()
      ? misconceptionId(item.id, wrongIndex)
      : undefined

    // 1. Attempt ledger — the student's own record of what they did.
    recordAttempt({
      surface: 'qbank',
      itemId: item.id,
      subjectId: item.subjectId,
      topic: item.topic,
      difficulty: item.difficulty,
      conceptIds: item.conceptIds,
      correct: answer.correct,
      seconds: answer.seconds,
      sessionId: answer.blockId,
    })

    // 2. Evidence — one immutable event per assessed concept. This is what makes
    //    three wrong answers on one concept three attempts and one weak concept.
    const events: AdaptiveEvidenceEvent[] = item.conceptIds.flatMap((conceptId) => {
      const role = conceptRole(item, conceptId)
      if (!role) return []
      return [{
        id: evidenceId(attemptId, conceptId),
        at,
        attemptId,
        blockId: answer.blockId,
        questionId: item.id,
        questionVersion: item.version,
        conceptId,
        role,
        correct: answer.correct,
        outcome: answer.outcome,
        confidence: answer.confidence,
        seconds: answer.seconds,
        expectedSeconds: item.estimatedSeconds,
        mode: answer.mode,
        exposure: answer.exposure,
        difficulty: item.difficulty,
        misconceptionId: misconception,
        configVersion: config.version,
      }]
    })

    setMonth((current) => events.reduce(appendEvidence, current))
    setIndex((current) => {
      // `appendEvidence` refuses a duplicate id, so the index has to refuse the
      // same event too, or a retry inflates the totals it feeds.
      const seen = new Set(current.questionIds)
      const fresh = events.filter((event) => current.lastAt !== event.at || !seen.has(event.questionId))
      return fresh.reduce(indexEvidence, current)
    })

    // 3. Boosts — a wrong answer buys a small, expiring nudge; a right one on a
    //    boosted concept counts toward cancelling it.
    setBoosts((current) => {
      let next = current
      for (const conceptId of item.mainConceptIds) {
        if (answer.correct === false) {
          const previous = current[conceptId]
          next = recordError(next, {
            conceptId,
            questionId: item.id,
            highConfidence: answer.confidence === 'sure',
            // Repeated means this concept has gone wrong before, which is what
            // separates "check again" from "there is a real gap here".
            repeated: Boolean(previous),
            at,
          }, config)
        } else if (answer.correct === true && current[conceptId]) {
          next = recordRepair(next, { conceptId, questionId: item.id, at }, config)
        }
      }
      return next
    })

    return events
  }, [config, recordAttempt, setBoosts, setIndex, setMonth])
}

/** Questions this student has already been shown, with how many times. */
export function useExposure(events: AdaptiveEvidenceEvent[]): Map<string, number> {
  return useMemo(() => {
    const counts = new Map<string, number>()
    // Counted per attempt, not per event: an item tagged to four concepts emits
    // four events from one showing, and counting those would report an item as
    // four times more worn out than it is.
    const seen = new Set<string>()
    for (const event of events) {
      if (seen.has(event.attemptId)) continue
      seen.add(event.attemptId)
      counts.set(event.questionId, (counts.get(event.questionId) ?? 0) + 1)
    }
    return counts
  }, [events])
}

/** When each question was last shown in practice, for readiness exclusion. */
export function useLastPracticed(events: AdaptiveEvidenceEvent[]): Map<string, string> {
  return useMemo(() => {
    const last = new Map<string, string>()
    for (const event of events) {
      if (event.mode === 'readiness') continue
      const current = last.get(event.questionId)
      if (!current || event.at > current) last.set(event.questionId, event.at)
    }
    return last
  }, [events])
}

/** Distinct questions answered per concept — the coverage denominator. */
export function useDistinctItemsByConcept(events: AdaptiveEvidenceEvent[]): Map<string, number> {
  return useMemo(() => {
    const byConcept = new Map<string, Set<string>>()
    for (const event of events) {
      const bucket = byConcept.get(event.conceptId)
      if (bucket) bucket.add(event.questionId)
      else byConcept.set(event.conceptId, new Set([event.questionId]))
    }
    return new Map([...byConcept].map(([conceptId, items]) => [conceptId, items.size]))
  }, [events])
}
