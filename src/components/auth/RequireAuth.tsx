import { Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useIdentity } from '@/lib/useIdentity'
import { RouteLoading } from '@/components/shell/RouteLoading'
import { hasConsoleAccess, mfaEnforced } from '@/data/adminRoles'

/**
 * A portal only renders for someone entitled to see it.
 *
 * The server already refuses every admin route, so this is not what keeps data
 * safe. What it fixes is that until now `/app` and `/admin` rendered fully for
 * a signed-out visitor: the student app showed a dashboard belonging to nobody,
 * and the admin console loaded twenty-five pages that each failed on their own.
 * Sending someone to sign in — and back to where they were going — is both more
 * honest and less work than twenty-five separate error states.
 *
 * `tab` narrows it further: a route belongs to a tab, and a role that does not
 * hold that tab never renders it. The same registry decides what the sidebar
 * offers, so a visible link and a rendering page cannot disagree.
 *
 * `student` guards the other direction: the student application is not a review
 * surface. A reviewer's whole console is Media Requests and Content Reports, so
 * a reviewer who reaches `/app` — by link, bookmark or typed URL — is sent back
 * to their console rather than shown a student dashboard belonging to nobody.
 * Editors, admins and super admins keep student-app access, because previewing
 * what a student sees is part of their work.
 */
export function RequireAuth({ console: needsConsole, tab, student, children }: {
  console?: boolean
  tab?: string
  student?: boolean
  children: ReactElement
}) {
  const identity = useIdentity()
  const location = useLocation()

  if (identity.status === 'loading') return <RouteLoading />
  if (identity.status === 'anonymous') {
    const next = `${location.pathname}${location.search}`
    return <Navigate to={`/login?next=${encodeURIComponent(next)}`} replace />
  }
  // An address that has not been confirmed is an account that is not finished.
  // Nothing used to stop one reaching the app, so the verification step read as
  // an optional detour and a student could arrive at a dashboard without ever
  // being told an email was waiting for them. On a project that does not
  // require confirmation this is already true for everybody and never fires.
  //
  // Ahead of the console checks below, because an unfinished account has no
  // business in the console either.
  if (identity.status !== 'demo' && !identity.emailVerified) {
    const address = identity.email ? `?email=${encodeURIComponent(identity.email)}` : ''
    return <Navigate to={`/auth/verify-email${address}`} replace />
  }

  if (needsConsole || tab) {
    if (!hasConsoleAccess(identity.role ?? '')) return <Navigate to="/app" replace />
    // Admin and above require a second factor, because they decide who else
    // gets console access. Somebody promoted an hour ago has not enrolled yet;
    // send them to enrol rather than to twenty-five pages that each answer
    // mfa_required on their own. Reviewers are exempt — they hold no such power
    // — so a reviewer without aal2 reaches their console directly.
    if (identity.status !== 'demo' && mfaEnforced(identity.role ?? '') && identity.aal !== 'aal2') {
      const next = `${location.pathname}${location.search}`
      return <Navigate to={`/auth/mfa?next=${encodeURIComponent(next)}`} replace />
    }
  }
  // A tab this role does not hold is not a 404 — the console exists, this part
  // of it is simply not theirs. `/admin` sends them to a page that is.
  if (tab && !identity.tabs.includes(tab)) return <Navigate to="/admin" replace />

  // The student application is closed to reviewers. `/admin` re-resolves through
  // AdminHome to the first surface they hold, i.e. Media Requests.
  if (student && identity.role === 'reviewer') return <Navigate to="/admin" replace />

  return children
}
