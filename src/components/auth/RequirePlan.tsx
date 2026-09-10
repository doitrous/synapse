import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useIdentity } from '@/lib/useIdentity'
import { RouteLoading } from '@/components/shell/RouteLoading'
import { hasActiveAccess } from '@/lib/entitlement'

/**
 * A subscription-gated student page renders only with an active subscription.
 *
 * Sits inside `RequireAuth` (so the visitor is already a signed-in, verified
 * student here) and gates on the entitlement `/api/me` returned: a trial or paid
 * plan renders the page, an expired, cancelled or absent one is sent to the
 * paywall. Two exemptions, both matching `RequireAuth`'s own carve-outs: the
 * signed-out demo showcase carries no subscription, and staff (admins, editors)
 * preview the student app without one — neither is a paying student, so neither
 * is gated. The router decides which paths are wrapped (see FREE_STUDENT_PATHS);
 * this only enforces the decision.
 */
export function RequirePlan({ children }: { children: ReactElement }) {
  const identity = useIdentity()
  if (identity.status === 'loading') return <RouteLoading />
  const gated = identity.status === 'authenticated' && identity.role === 'student'
  if (gated && !hasActiveAccess(identity.entitlement)) {
    return <Navigate to="/app/upgrade" replace />
  }
  return children
}
