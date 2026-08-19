import { Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useIdentity } from '@/lib/useIdentity'
import { RouteLoading } from '@/components/shell/RouteLoading'

/**
 * A portal only renders for someone entitled to see it.
 *
 * The server already refuses every admin route, so this is not what keeps data
 * safe. What it fixes is that until now `/app` and `/admin` rendered fully for
 * a signed-out visitor: the student app showed a dashboard belonging to nobody,
 * and the admin console loaded twenty-five pages that each failed on their own.
 * Sending someone to sign in — and back to where they were going — is both more
 * honest and less work than twenty-five separate error states.
 */
export function RequireAuth({ role, children }: { role?: 'admin'; children: ReactElement }) {
  const identity = useIdentity()
  const location = useLocation()

  if (identity.status === 'loading') return <RouteLoading />
  // The self-contained demo build has no account system to enforce.
  if (identity.status === 'demo') return children
  if (identity.status === 'anonymous') {
    const next = `${location.pathname}${location.search}`
    return <Navigate to={`/login?next=${encodeURIComponent(next)}`} replace />
  }
  // An address that has not been confirmed is an account that is not finished.
  // Nothing used to stop one reaching the app, so the verification step read as
  // an optional detour and a student could arrive at a dashboard without ever
  // being told an email was waiting for them. On a project that does not
  // require confirmation this is already true for everybody and never fires.
  if (!identity.emailVerified) {
    const address = identity.email ? `?email=${encodeURIComponent(identity.email)}` : ''
    return <Navigate to={`/auth/verify-email${address}`} replace />
  }
  if (role === 'admin' && identity.role !== 'admin') return <Navigate to="/app" replace />
  return children
}
