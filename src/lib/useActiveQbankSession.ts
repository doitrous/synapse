import { usePersistentState } from '@/lib/usePersistentState'

/**
 * The slice of QuestionBank's paused sitting the dashboard needs: what it's
 * called and how far through it the student got. The key and shape must
 * mirror `ACTIVE_SESSION_STORAGE_KEY` / `LiveSession` in
 * `src/pages/student/QuestionBank.tsx` — this only ever reads that document,
 * never writes it, so a mismatch here can misread a sitting but never corrupt
 * one.
 */
interface StoredSession {
  questionIds: string[]
  idx: number
  name: string
  submitted?: boolean
}

const ACTIVE_SESSION_STORAGE_KEY = 'nishany.qbank.activeSession.v1'

export interface ActiveQbankSession {
  name: string
  position: number
  total: number
}

/** Null once the sitting is submitted (finished with) or there is none. */
export function useActiveQbankSession(): ActiveQbankSession | null {
  const [saved] = usePersistentState<StoredSession | null>(ACTIVE_SESSION_STORAGE_KEY, null)
  if (!saved || saved.submitted || !saved.questionIds?.length) return null
  return {
    name: saved.name || 'Question bank',
    position: Math.min(saved.idx, saved.questionIds.length - 1) + 1,
    total: saved.questionIds.length,
  }
}
