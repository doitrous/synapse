import { useCallback, useEffect, useRef, useState } from 'react'
import { type Question } from '@/data/qbank'
import { useScopedPublishedQuestions, useScopedPublishedQuestionSummaries } from '@/lib/usePublishedQuestions'
import type { QuestionScope } from '@/lib/content'
/**
 * "Every question this student may sit." One shared object, so setting the
 * scope back to it is a no-op React can skip rather than a new render.
 */
export const WHOLE_BANK: QuestionScope = {}

/**
 * What the page reads out of the published bank: the cheap summaries the hub
 * renders from, and the heavy fully-built questions a sitting needs — fetched
 * only once a start or resume asks for them. Moved out of `QuestionBank.tsx`
 * unchanged.
 */
export function useQbankQuestions() {
  /**
   * The hub mount is cheap on purpose: counts, source cards and presets only
   * need id/subject/topic/difficulty/vignette/stem/source/concept-and-library
   * ids, which this lightweight projection gives without the per-question
   * options/explanation/attachments build (`managedQuestionToSummary` in
   * usePublishedQuestions.ts). `fullQuestions` is the same data, fully built —
   * it stays empty until `needsFullQuestions` flips on, which only happens
   * once a test is actually starting or resuming (`runWhenHydrated` below).
   */
  const questions = useScopedPublishedQuestionSummaries()
  const [needsFullQuestions, setNeedsFullQuestions] = useState(false)
  /**
   * How much of the bank the full fetch asks for.
   *
   * A test almost always sits inside one subject, and asking for that subject
   * is a fraction of the request asking for everything is. `WHOLE_BANK` is the
   * honest answer when a start spans several subjects, and when the surfaces
   * that read arbitrary past questions are on screen.
   */
  const [fullScope, setFullScope] = useState<QuestionScope>(WHOLE_BANK)
  const fullQuestions = useScopedPublishedQuestions(needsFullQuestions, fullScope)
  /** A start or resume waiting on `fullQuestions` to land — see `runWhenHydrated`. */
  const pendingHydrated = useRef<{ ids: string[]; run: (real: Question[]) => void } | null>(null)
  useEffect(() => {
    const pending = pendingHydrated.current
    if (!pending || !fullQuestions.length) return
    pendingHydrated.current = null
    const byId = new Map(fullQuestions.map((question) => [question.id, question]))
    pending.run(pending.ids.map((id) => byId.get(id)).filter((question): question is Question => Boolean(question)))
  }, [fullQuestions])
  /** The narrowest scope that still covers every one of `ids`, read off the summaries. */
  const scopeForIds = useCallback((ids: readonly string[]): QuestionScope => {
    const subjectById = new Map(questions.map((question) => [question.id, question.subjectId]))
    const subjects = new Set(ids.map((id) => subjectById.get(id)).filter(Boolean))
    return subjects.size === 1 ? { subject: [...subjects][0] as string } : WHOLE_BANK
  }, [questions])
  /**
   * Resolve `ids` against the real, fully-built questions before `run` sees
   * them — immediately if the slice already in hand covers them (every start
   * after the first within the same subject), otherwise queued for the effect
   * above once the fetch and build land. This is the one place
   * `useScopedPublishedQuestions`'s heavy path is actually triggered.
   * ponytail: a second start/resume racing the first overwrites the pending
   * one — fine today, since the runner only ever offers one start action at a
   * time; queue an array instead if that stops being true.
   */
  const runWhenHydrated = useCallback((ids: string[], run: (real: Question[]) => void) => {
    const next = scopeForIds(ids)
    // What is held covers the request when it is the same slice, or a wider one.
    if (needsFullQuestions && fullQuestions.length && (!fullScope.subject || fullScope.subject === next.subject)) {
      const byId = new Map(fullQuestions.map((question) => [question.id, question]))
      run(ids.map((id) => byId.get(id)).filter((question): question is Question => Boolean(question)))
      return
    }
    pendingHydrated.current = { ids, run }
    setFullScope(next)
    setNeedsFullQuestions(true)
  }, [needsFullQuestions, fullQuestions, fullScope, scopeForIds])
  /**
   * For the couple of spots that read a question's real content (options,
   * mainly) straight off a prop instead of going through `runWhenHydrated` —
   * the Previous-tests answer review and the active mixed runner. Falls back
   * to the lightweight summaries for the one render between `needsFullQuestions`
   * flipping on and `fullQuestions` landing.
   */
  const realQuestions = needsFullQuestions && fullQuestions.length ? fullQuestions : questions
  return { questions, realQuestions, setNeedsFullQuestions, setFullScope, runWhenHydrated }
}
