import { Link, Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'
import { ShieldAlert } from 'lucide-react'
import { useIdentity } from '@/lib/useIdentity'
import { RouteLoading } from '@/components/shell/RouteLoading'
import { Icon } from '@/components/ui/Icon'
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
  }
  // Admin and above require a second factor, because they decide who else gets
  // console access. That used to be enforced the instant the console shell
  // itself was entered — an involuntary code-entry screen thrown up before an
  // admin who had just signed in correctly had done anything at all. It now
  // only blocks entry to a specific tab: that is where writes actually happen,
  // so it is what stays hard-gated. The bare console shell (the dashboard,
  // reached with no `tab`) renders regardless, with the banner below standing
  // in for the door that used to be locked. Reviewers are exempt from all of
  // this — they hold no role-management power — so one without aal2 reaches
  // their console directly.
  const needsMfaSetup = (needsConsole || tab) && identity.status !== 'demo' && mfaEnforced(identity.role ?? '') && identity.aal !== 'aal2'
  if (needsMfaSetup && tab) {
    const next = `${location.pathname}${location.search}`
    return <Navigate to={`/auth/mfa?next=${encodeURIComponent(next)}`} replace />
  }
  // A tab this role does not hold is not a 404 — the console exists, this part
  // of it is simply not theirs. `/admin` sends them to a page that is.
  if (tab && !identity.tabs.includes(tab)) return <Navigate to="/admin" replace />

  // The student application is closed to reviewers. `/admin` re-resolves through
  // AdminHome to the first surface they hold, i.e. Media Requests.
  if (student && identity.role === 'reviewer') return <Navigate to="/admin" replace />

  if (needsMfaSetup) {
    return (
      <>
        <div role="status" className="flex flex-wrap items-center gap-2 border-b border-warning/30 bg-warning-tint px-4 py-2.5 text-[12.5px] text-ink-2">
          <Icon icon={ShieldAlert} size={15} className="shrink-0 text-warning" />
          Your role requires a second factor before you can open any console tab.
          <Link to="/app/account?tab=security" className="font-semibold text-primary-strong hover:text-primary">Set it up in Account → Security</Link>
        </div>
        {children}
      </>
    )
  }

  return children
}
