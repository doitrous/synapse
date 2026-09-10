import { Link, Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'
import { ShieldAlert } from 'lucide-react'
import { useIdentity } from '@/lib/useIdentity'
import { RouteLoading } from '@/components/shell/RouteLoading'
import { Icon } from '@/components/ui/Icon'
import { hasConsoleAccess, mfaEnforced } from '@/data/adminRoles'
import { useNoIndex } from '@/lib/pageMeta'

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
export function RequireAuth({ console: needsConsole, tab, anyTab, student, validator, children }: {
  console?: boolean
  tab?: string
  /** Reachable by holding any one of these tabs. For the Inbox, which gathers
   * three separately-held moderation queues under one route. */
  anyTab?: readonly string[]
  student?: boolean
  validator?: boolean
  children: ReactElement
}) {
  const identity = useIdentity()
  const location = useLocation()
  // A gated route asks for console access and MFA whether it names one tab or a
  // set; treat "any of these" the same as "this one" for those checks.
  const gatedTab = tab ?? (anyTab && anyTab.length ? anyTab[0] : undefined)
  // Every route this guard covers is private — search has no business
  // indexing it, on top of robots.txt already disallowing /app and /admin.
  useNoIndex()

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

  if (needsConsole || gatedTab) {
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
  //
  // Nor is a tab an involuntary code screen any more. `/auth/mfa` is where a
  // factor is enrolled, and sending somebody there the moment they open a tab
  // — before they have chosen to set one up — is what made a correct sign-in
  // feel like a refusal, and what looped when enrolment itself failed. The tab
  // is still closed; it now says so, and points at the page where the lock is
  // added, rather than dropping them into it.
  // An account that has *enrolled* an authenticator owes its code on every new
  // session, whatever the role: the lock a student chose to add is not
  // optional at sign-in. `/auth/mfa` is outside this guard, so this cannot loop.
  if (identity.status === 'authenticated' && identity.mfaPending && identity.aal !== 'aal2') {
    return <Navigate to={`/auth/mfa?next=${encodeURIComponent(`${location.pathname}${location.search}`)}`} replace />
  }
  const needsMfaSetup = (needsConsole || gatedTab) && identity.status !== 'demo' && mfaEnforced(identity.role ?? '') && identity.aal !== 'aal2'
  if (needsMfaSetup && gatedTab) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center gap-3 px-6 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-xl bg-warning-tint text-warning"><Icon icon={ShieldAlert} size={22} /></span>
        <h1 className="text-[20px] font-semibold text-ink">Set up two-factor to continue</h1>
        <p className="text-[13px] leading-relaxed text-ink-2">Your role can change who else has console access, so this part of the console asks for an authenticator app first. It takes a minute and only has to be done once.</p>
        <p>
          <Link to="/app/account?tab=security" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 text-[13px] font-semibold text-on-primary hover:bg-primary-hover">Open Account → Security</Link>
        </p>
      </div>
    )
  }
  // A tab this role does not hold is not a 404 — the console exists, this part
  // of it is simply not theirs. `/admin` sends them to a page that is.
  if (tab && !identity.tabs.includes(tab)) return <Navigate to="/admin" replace />
  if (anyTab && !anyTab.some((id) => identity.tabs.includes(id))) return <Navigate to="/admin" replace />

  if (validator && identity.role !== 'mcq_validator') {
    return <Navigate to={hasConsoleAccess(identity.role ?? '') ? '/admin' : '/app'} replace />
  }

  // The student application is closed to reviewers. `/admin` re-resolves through
  // AdminHome to the first surface they hold, i.e. Media Requests — but only if
  // they hold one. A reviewer with no tabs would be pushed to a console that has
  // nothing for them and pushed straight back here, forever.
  if (student && identity.role === 'mcq_validator') return <Navigate to="/validator" replace />
  if (student && identity.role === 'reviewer' && identity.tabs.length > 0) return <Navigate to="/admin" replace />

  // A social sign-up never saw the phone form password sign-up collects
  // (Signup.tsx): Google/Facebook OAuth hands back a name and an email and
  // nothing else, so `identity.profileComplete` stays false until
  // CompleteProfile.tsx runs. Gated on `!audienceUnknown` so this fires only
  // after the onboarding overlay (AppShell → StudentOnboarding) has already
  // settled where the student studies — that overlay is where university and
  // year actually get collected, and asking here first would fight it for the
  // same screen. `role === 'student'` keeps an admin or reviewer previewing
  // the student app out of this: they hold no roster row to complete.
  if (student && identity.role === 'student' && !identity.audienceUnknown && !identity.profileComplete) {
    const next = `${location.pathname}${location.search}`
    return <Navigate to={`/auth/complete-profile?next=${encodeURIComponent(next)}`} replace />
  }

  if (needsMfaSetup) {
    return (
      <>
        <div role="status" className="flex flex-wrap items-center gap-2 border-b border-warning/30 bg-warning-tint px-4 py-2.5 text-[12.5px] text-ink-2">
          <Icon icon={ShieldAlert} size={15} className="shrink-0 text-warning" />
          Set up two-factor to continue: your role requires it before you can open any console tab.
          <Link to="/app/account?tab=security" className="font-semibold text-primary-strong hover:text-primary">Set it up in Account → Security</Link>
        </div>
        {children}
      </>
    )
  }

  return children
}
