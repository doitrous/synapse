import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { API_MODE, apiGet } from '@/lib/api'
import { useIdentity } from '@/lib/useIdentity'

/**
 * The open-escalation count for the Escalations nav badge.
 *
 * Fetched only for the editors and super admins who hold the tab — nobody else
 * has the route or the endpoint — and re-fetched on navigation, so acting on an
 * escalation and returning updates the badge without a reload. Silent on any
 * failure and zero in demo mode: a badge is a hint, never a blocker, and it never
 * ships the whole content ledger to the browser to compute a number.
 */
export function useOpenEscalationCount(): number {
  const identity = useIdentity()
  const holdsTab = identity.tabs.includes('escalations')
  const { pathname } = useLocation()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!holdsTab || !API_MODE) { setCount(0); return }
    let alive = true
    apiGet<{ open: number }>('/admin/escalations/count')
      .then((data) => { if (alive) setCount(Number(data?.open) || 0) })
      .catch(() => { if (alive) setCount(0) })
    return () => { alive = false }
  }, [holdsTab, pathname])

  return count
}
