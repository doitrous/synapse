import { Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'
import { ShieldAlert } from 'lucide-react'
import { useIdentity } from '@/lib/useIdentity'
import { RouteLoading } from '@/components/shell/RouteLoading'
import { Wordmark } from '@/components/brand/Wordmark'
import { Icon } from '@/components/ui/Icon'
import { STUDENT_ORIGIN, isAdminHost } from '@/lib/portalHost'

/**
 * Signed in, but not as an administrator.
 *
 * The answer used to be `<Navigate to="/app" replace />`, written when `/app`
 * was a route on the same site. On the admin domain it is a hand-over to the
 * student origin, so the redirect stopped meaning "the dashboard is not for
 * you" and started meaning "you are put back on synapse.doitrous.com" — no
 * page, no reason, and a `location.replace` that leaves nothing to go back to.
 * Worse, `/admin` on the student domain hands over the other way, so the two
 * rules bounce a non-admin between domains.
 *
 * Roles live in `user_access` and default to student for every new account, so
 * the usual cause is an account nobody has promoted yet — including the very
 * first one, which can only be promoted from the database
 * (`npm --prefix server run promote-admin -- <email> --commit`). That is worth
 * saying out loud rather than hiding behind a redirect.
 */
function NotAnAdmin({ email }: { email: string | null }) {
  return (
    <div className="grid min-h-dvh place-items-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-10 text-center shadow-panel">
        <div className="mb-6 flex justify-center"><Wordmark /></div>
        <span className="mx-auto grid size-14 place-items-center rounded-xl bg-warning-tint text-warning">
          <Icon icon={ShieldAlert} size={26} />
        </span>
        <h1 className="mt-5 font-serif text-[24px] font-semibold tracking-[-0.02em] text-ink">
          This account is not an administrator
        </h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
          You are signed in{email ? <> as <span className="font-medium text-ink">{email}</span></> : null}, but the
          dashboard is only open to accounts with the admin role. Ask an existing administrator to promote it, then
          reload this page.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <a
            href={STUDENT_ORIGIN}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-[13px] font-semibold text-on-primary hover:bg-primary-hover"
          >
            Go to the study app
          </a>
          <a
            href="/logout"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line px-5 text-[13px] font-semibold text-ink-2 hover:bg-inset"
          >
            Sign in as someone else
          </a>
        </div>
      </div>
    </div>
  )
}

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
  if (role === 'admin' && identity.role !== 'admin') {
    // Off the admin domain — localhost, a preview — `/app` is mounted here and
    // the redirect stays within the site, so it keeps its old behaviour.
    return isAdminHost() ? <NotAnAdmin email={identity.email} /> : <Navigate to="/app" replace />
  }
  return children
}
