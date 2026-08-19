import { useCallback, useEffect, useRef, useState } from 'react'
import { API_MODE, apiGet, apiPost } from '@/lib/api'
import type { Lang } from '@/lib/i18n'

/**
 * The student's side of the study assistant.
 *
 * Two rules shape this hook. The server owns the quota, so the count shown here
 * is always the one the server just returned rather than one the client has
 * decremented — a client that guesses will eventually disagree with the thing
 * doing the enforcing. And a failed turn puts the student's text back in the
 * composer instead of leaving it stranded in a transcript that never got an
 * answer.
 *
 * The transcript lives in this hook and nowhere else. It is not persisted, and
 * the server does not store it — see `docs/assistant-design.md`.
 */

export interface AssistantStatus {
  available: boolean
  reason: 'disabled' | 'unconfigured' | 'not_on_plan' | null
  plan: string
  dailyMessages: number
  used: number
  remaining: number
}

export interface AssistantTurn {
  id: string
  role: 'user' | 'assistant'
  content: string
}

/** What the assistant is told about where the student is and what is due. */
export interface AssistantContext {
  year?: string
  dueToday?: string[]
  weakest?: string[]
  surface?: string
}

interface ChatResponse {
  reply: string | null
  plan: string
  dailyMessages: number
  used: number
  remaining: number
}

/** Failures worth phrasing differently, because the student's next move differs. */
export type AssistantFailure = 'quota' | 'not_on_plan' | 'unavailable' | 'error' | null

let turnId = 0
const nextId = () => `turn-${(turnId += 1)}`

export function useAssistant({ lang, context }: { lang: Lang; context?: AssistantContext }) {
  const [status, setStatus] = useState<AssistantStatus | null>(null)
  const [turns, setTurns] = useState<AssistantTurn[]>([])
  const [pending, setPending] = useState(false)
  const [failure, setFailure] = useState<AssistantFailure>(null)
  /** Text handed back after a failed send, so the composer can restore it. */
  const [returned, setReturned] = useState('')

  // Held in a ref so `send` does not have to be rebuilt — and invalidate the
  // composer's callback — every time a message lands.
  const turnsRef = useRef<AssistantTurn[]>([])
  turnsRef.current = turns

  useEffect(() => {
    if (!API_MODE) return
    let cancelled = false
    apiGet<AssistantStatus>('/assistant/status')
      .then((next) => { if (!cancelled) setStatus(next) })
      // A status that will not load is indistinguishable, from the student's
      // side, from an assistant that is switched off. Both mean: no launcher.
      .catch(() => { if (!cancelled) setStatus(null) })
    return () => { cancelled = true }
  }, [])

  const send = useCallback(async (text: string) => {
    const message = text.trim()
    if (!message || pending) return

    const outgoing: AssistantTurn = { id: nextId(), role: 'user', content: message }
    const history = [...turnsRef.current, outgoing]
    setTurns(history)
    setPending(true)
    setFailure(null)
    setReturned('')

    try {
      const result = await apiPost<ChatResponse>('/assistant/chat', {
        messages: history.map(({ role, content }) => ({ role, content })),
        lang,
        context,
      })
      setStatus((current) => current && {
        ...current,
        plan: result.plan, dailyMessages: result.dailyMessages,
        used: result.used, remaining: result.remaining,
      })
      if (result.reply) {
        setTurns((current) => [...current, { id: nextId(), role: 'assistant', content: result.reply as string }])
      } else {
        setTurns((current) => current.filter((turn) => turn.id !== outgoing.id))
        setFailure('error')
        setReturned(message)
      }
    } catch (cause) {
      // Roll the student's message back out of the transcript and hand it back:
      // a question sitting under a failed send reads as asked-and-ignored.
      setTurns((current) => current.filter((turn) => turn.id !== outgoing.id))
      setReturned(message)
      const text = cause instanceof Error ? cause.message : String(cause)
      setFailure(
        text.includes('429') ? 'quota'
        : text.includes('403') ? 'not_on_plan'
        : text.includes('503') ? 'unavailable'
        : 'error',
      )
      if (text.includes('429')) {
        setStatus((current) => current && { ...current, remaining: 0, used: current.dailyMessages })
      }
    } finally {
      setPending(false)
    }
  }, [lang, context, pending])

  const reset = useCallback(() => {
    setTurns([])
    setFailure(null)
    setReturned('')
  }, [])

  return {
    /** Null until the status loads, and whenever the assistant is unusable. */
    status,
    available: Boolean(status?.available) && API_MODE,
    turns,
    pending,
    failure,
    returned,
    send,
    reset,
    clearFailure: () => setFailure(null),
  }
}
