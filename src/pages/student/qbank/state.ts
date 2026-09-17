/**
 * Question Bank: the constants, small pure helpers and stored shapes the page
 * and its panels share. Split out of `QuestionBank.tsx` verbatim.
 */
import type { Question } from '@/data/qbank'
import type { Phase } from '@/data/qbankSession'
import type { QbankBank, QbankHubTab } from '@/components/qbank/hub/QbankHub'
import { newId } from '@/data/userLibrary'

export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']
export type Mode = 'tutor' | 'timed'
export type Source = 'all' | 'unsolved' | 'flagged' | 'incorrect' | 'omitted'

export function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

export function clock(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function diffTone(d: Question['difficulty']): 'success' | 'warning' | 'danger' {
  return d === 'Easy' ? 'success' : d === 'Moderate' ? 'warning' : 'danger'
}

export type PresetKind = 'weak' | 'emergency' | 'demanding' | 'everything'

/** How many marked answers a subject needs before it can be called a weakness. */
export const WEAKNESS_EVIDENCE = 3

/** A review opened from a link is a short set, not a full sitting. */
export const REVIEW_SESSION_SIZE = 5

/** Dotted, so `isUserOwnedState` routes these marks to the student's own record. */
export const QBANK_MARKED_STORAGE_KEY = 'nishany.qbank.marked.v1'

export function newSessionId(): string {
  return newId('qb')
}

/** Everything needed to put a half-finished sitting back on screen. */
export interface LiveSession {
  questionIds: string[]
  idx: number
  answers: Record<string, number>
  checked: Record<string, boolean>
  mode: Mode
  sessionId: string
  elapsed: number
  /** Closed question-clock segments, preserved when the sitting is paused. */
  questionSeconds?: Record<string, number>
  visited: number[]
  /** Options the student has ruled out, per question. Scratch marks, not a record. */
  struck: Record<string, number[]>
  reviewing: boolean
  name: string
  phase: Exclude<Phase, 'setup'>
  /** A submitted sitting is finished with — it is never offered to resume. */
  submitted: boolean
  startedAt: string
}

/** Dotted, so `isUserOwnedState` routes it to the student's own record. */
export const ACTIVE_SESSION_STORAGE_KEY = 'nishany.qbank.activeSession.v1'
export const SESSION_NAMES_STORAGE_KEY = 'nishany.qbank.sessionNames.v1'

/**
 * The bank and tab named in the URL, or the defaults.
 *
 * Read through a guard rather than cast: `?bank=osce` is a link someone will
 * eventually write, and it must land on the MCQ bank rather than on a hub with
 * no content under any branch.
 */
export function readBank(value: string | null): QbankBank {
  return value === 'practical' || value === 'essay' || value === 'mixed' ? value : 'mcq'
}

export function readTab(value: string | null): QbankHubTab {
  return value === 'previous' ? 'previous' : 'new'
}

/**
 * Which questions each sitting contained.
 *
 * The attempt log only receives a question once its answer is checked, so a
 * skipped one left no trace anywhere the moment its sitting ended. This is the
 * other half of the pair: with both, "served but never attempted" is a fact
 * rather than a guess.
 */
export const SESSION_QUESTIONS_STORAGE_KEY = 'nishany.qbank.sessionQuestions.v1'
