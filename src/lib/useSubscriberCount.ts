import { useEffect, useState } from 'react'
import { API_MODE, apiGet } from './api'

interface SubscriberCountResponse {
  enabled: boolean
  value?: number
  ratePerSecond?: number
}

/**
 * The live subscriber count, read-only. `{ enabled: false, value: null }`
 * until the fetch resolves, in demo mode (no backend), or when the
 * superadmin has the feature turned off — three states a caller need not
 * tell apart, since all three mean "do not show a number."
 */
export function useSubscriberCount(): { enabled: boolean; value: number | null } {
  const [state, setState] = useState<{ enabled: boolean; value: number | null }>({ enabled: false, value: null })

  useEffect(() => {
    if (!API_MODE) return
    let active = true
    apiGet<SubscriberCountResponse>('/public/subscriber-count')
      .then((data) => {
        if (!active) return
        setState(data.enabled && typeof data.value === 'number' ? { enabled: true, value: data.value } : { enabled: false, value: null })
      })
      .catch(() => { if (active) setState({ enabled: false, value: null }) })
    return () => { active = false }
  }, [])

  return state
}
