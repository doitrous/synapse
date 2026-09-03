import { useCallback, useState } from 'react'
import { apiPost, ApiError } from '@/lib/api'
import type { EssayQuestion } from '@/data/essay'

/**
 * The "Analyze with AI" side of a written answer — advisory only.
 *
 * Mirrors useAssistant.ts's shape (status/pending/failure), scaled down to one
 * request instead of a conversation: there is no transcript, and a result is
 * either the last one asked for or nothing.
 */

export interface EssayFeedback {
  coveredKeyPoints: number[]
  missedKeyPoints: number[]
  score: number
  strengths: string[]
  improvements: string[]
  summary: string
}

interface GradeResponse {
  feedback: EssayFeedback
  remaining: number
}

/** Failures worth phrasing differently, because the student's next move differs. */
export type EssayGradeFailure = 'quota' | 'not_on_plan' | 'unavailable' | 'error' | null

export function useEssayGrade() {
  const [feedback, setFeedback] = useState<EssayFeedback | null>(null)
  const [pending, setPending] = useState(false)
  const [failure, setFailure] = useState<EssayGradeFailure>(null)

  const analyze = useCallback(async (essay: EssayQuestion, studentText: string) => {
    const text = studentText.trim()
    if (!text || pending) return
    setPending(true)
    setFailure(null)

    try {
      const result = await apiPost<GradeResponse>('/essay/grade', {
        prompt: essay.prompt,
        keyPoints: essay.keyPoints.map((point) => point.text),
        modelAnswer: essay.modelAnswer,
        examinerNote: essay.examinerNote,
        studentText: text,
      })
      setFeedback(result.feedback)
    } catch (cause) {
      const code = cause instanceof ApiError ? cause.message : ''
      setFailure(
        code === 'quota_exhausted' ? 'quota'
        : code === 'not_on_plan' ? 'not_on_plan'
        : code === 'unconfigured' || code === 'disabled' ? 'unavailable'
        : 'error',
      )
    } finally {
      setPending(false)
    }
  }, [pending])

  const reset = useCallback(() => {
    setFeedback(null)
    setFailure(null)
  }, [])

  return { feedback, pending, failure, analyze, reset }
}
