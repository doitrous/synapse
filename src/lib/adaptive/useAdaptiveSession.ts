/**
 * The block a student is part-way through.
 *
 * Persisted, so closing a tab mid-block does not throw the work away. Only the
 * answers and the item ids are stored — the block is rebuilt from its seed, which
 * is both smaller and the thing that makes a session reproducible.
 *
 * Tutor and Exam are a **presentation** difference and nothing else. Both use
 * the same approved stem, options, key, tags and blueprint contribution; what
 * changes is when feedback appears. A readiness assessment is a different flow
 * entirely and cannot be turned into Tutor mode at all.
 */

import { useCallback, useMemo } from 'react'
import { usePersistentState } from '@/lib/usePersistentState'
import type { Confidence, PresentationMode } from '@/data/adaptive/evidenceLedger'

/** Dotted, so `isUserOwnedState` routes it to the student's own record. */
export const ADAPTIVE_SESSION_STORAGE_KEY = 'synapse.progress.adaptive.session.v1'

export interface RecordedAnswer {
  itemId: string
  /** Option index chosen, or null when left blank. */
  chosenIndex: number | null
  confidence: Confidence
  seconds: number | null
  /** True once this answer has been committed to the evidence ledger. */
  committed: boolean
}

/**
 * What the builder decided, kept with the session.
 *
 * Stored rather than held in component state, because "every selection stores a
 * student-facing reason and internal score breakdown" means stored. A reason
 * that vanishes when the tab is reloaded is a reason the student cannot check
 * at the moment they most want to — halfway through a block that surprised them.
 *
 * Deliberately not the whole `AdaptiveBlock`: that carries the full question
 * objects, and re-persisting them on every answer would rewrite a large document
 * twenty times a block for no gain.
 */
export interface StoredDiagnostics {
  /** Item id → the sentence shown beside that question. */
  reasons: Record<string, string>
  summary: string
  /** Named shortage, when the bank could not satisfy the rules. */
  notice: string | null
  /** Relaxation labels, in the order they were applied. */
  relaxed: string[]
  /** Needs nothing could serve, and how many slots each gave up. */
  redistributed: Array<{ need: string; slots: number }>
  targets: Record<string, number>
  served: Record<string, number>
  unseenShare: number
  demandingShare: number
  seed: number
  configVersion: number
}

export interface AdaptiveSession {
  blockId: string
  /** Item ids in order, so the block can be rebuilt without re-running selection. */
  itemIds: string[]
  mode: PresentationMode
  answers: Record<string, RecordedAnswer>
  cursor: number
  startedAt: string
  /** Set when the student submits. Until then the block is still open. */
  submittedAt: string | null
  diagnostics: StoredDiagnostics
}

export const NO_SESSION: AdaptiveSession | null = null

export function useAdaptiveSession() {
  const [session, setSession] = usePersistentState<AdaptiveSession | null>(
    ADAPTIVE_SESSION_STORAGE_KEY, NO_SESSION,
  )

  const start = useCallback((next: Omit<AdaptiveSession, 'answers' | 'cursor' | 'startedAt' | 'submittedAt'>) => {
    setSession({
      ...next,
      answers: {},
      cursor: 0,
      startedAt: new Date().toISOString(),
      submittedAt: null,
    })
  }, [setSession])

  const answer = useCallback((itemId: string, input: Omit<RecordedAnswer, 'itemId' | 'committed'>) => {
    setSession((current) => {
      if (!current) return current
      // An answer already committed to the ledger is not editable. Evidence is
      // immutable, so letting the interface revise it would put the two out of
      // step with no way to tell which was right.
      if (current.answers[itemId]?.committed) return current
      return { ...current, answers: { ...current.answers, [itemId]: { itemId, ...input, committed: false } } }
    })
  }, [setSession])

  const markCommitted = useCallback((itemIds: string[]) => {
    setSession((current) => {
      if (!current) return current
      const answers = { ...current.answers }
      for (const itemId of itemIds) {
        const existing = answers[itemId]
        if (existing) answers[itemId] = { ...existing, committed: true }
      }
      return { ...current, answers }
    })
  }, [setSession])

  const goTo = useCallback((cursor: number) => {
    setSession((current) => (current ? { ...current, cursor } : current))
  }, [setSession])

  const submit = useCallback(() => {
    setSession((current) => (current ? { ...current, submittedAt: new Date().toISOString() } : current))
  }, [setSession])

  const discard = useCallback(() => setSession(NO_SESSION), [setSession])

  return { session, start, answer, markCommitted, goTo, submit, discard }
}

/**
 * Whether the answer to this item may be revealed yet.
 *
 * The whole Tutor/Exam distinction, in one function. Tutor reveals as soon as
 * the answer is given; Exam and readiness withhold everything until the block is
 * submitted. Keeping this in one place is what stops a single component leaking
 * the key in exam mode by rendering a rationale it should not have.
 */
export function feedbackVisible(session: AdaptiveSession | null, itemId: string): boolean {
  if (!session) return false
  if (session.submittedAt) return true
  if (session.mode !== 'tutor') return false
  return Boolean(session.answers[itemId])
}

/** How far through the block the student is, 0–1 — the fatigue input. */
export function sessionFatigue(session: AdaptiveSession | null): number {
  if (!session || !session.itemIds.length) return 0
  return Object.keys(session.answers).length / session.itemIds.length
}

/** Answers still to be committed to the ledger. */
export function uncommitted(session: AdaptiveSession | null): RecordedAnswer[] {
  if (!session) return []
  return Object.values(session.answers).filter((entry) => !entry.committed)
}

export function useSessionSummary(session: AdaptiveSession | null) {
  return useMemo(() => {
    if (!session) return null
    const answered = Object.values(session.answers)
    return {
      total: session.itemIds.length,
      answered: answered.length,
      blank: session.itemIds.length - answered.length,
      remaining: session.itemIds.length - answered.length,
      complete: answered.length === session.itemIds.length,
    }
  }, [session])
}
