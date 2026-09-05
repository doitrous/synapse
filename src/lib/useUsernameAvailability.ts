import { useEffect, useRef, useState } from 'react'
import { API_MODE, apiGet } from './api'
import { usernameProblem } from '@/data/profileIcons'

export type UsernameAvailability = 'idle' | 'checking' | 'available' | 'taken' | 'invalid'

/**
 * Debounced server-side uniqueness check for a username being typed.
 *
 * Format is checked locally first (`usernameProblem`) — a candidate too short
 * to ever be valid is not worth a round trip, and the server would only send
 * the same answer back slower. `currentUsername` is the account's own
 * username on record: typing it back unchanged (any case) reads as `idle`,
 * not `checking`, since it costs nothing to keep.
 */
export function useUsernameAvailability(value: string, currentUsername: string): UsernameAvailability {
  const [state, setState] = useState<UsernameAvailability>('idle')
  // Guards against a slow earlier request landing after a faster later one.
  const requestId = useRef(0)

  useEffect(() => {
    const candidate = value.trim()
    if (!candidate || candidate.toLowerCase() === currentUsername.trim().toLowerCase()) {
      setState('idle')
      return
    }
    if (usernameProblem(candidate)) {
      setState('invalid')
      return
    }
    if (!API_MODE) {
      setState('available')
      return
    }
    setState('checking')
    const id = ++requestId.current
    const timer = window.setTimeout(() => {
      apiGet<{ available: boolean; reason?: 'taken' | 'invalid' }>(`/accounts/username-available?u=${encodeURIComponent(candidate)}`)
        .then((result) => {
          if (id !== requestId.current) return
          setState(result.available ? 'available' : (result.reason ?? 'taken'))
        })
        .catch(() => { if (id === requestId.current) setState('idle') })
    }, 400)
    return () => window.clearTimeout(timer)
  }, [value, currentUsername])

  return state
}
