import { Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'

/**
 * A redirect that does not throw away the query string.
 *
 * `/app/study-together?party=abc` is a link somebody was *sent*. A plain
 * `<Navigate to="/app/study-rooms" />` drops the `?party=`, so the invite
 * lands on an empty lobby and the student has no idea what they were invited
 * to. The parameters are the message; only the path is being renamed.
 *
 * When the destination carries its own query (`/app/account?tab=billing`) the
 * two are merged, with the destination's own values winning — a redirect that
 * exists to select a tab must still select that tab, whatever the incoming
 * link happened to carry.
 */
export function RedirectWithSearch({ to }: { to: string }): ReactElement {
  const location = useLocation()
  const [pathname, ownSearch = ''] = to.split('?')
  const params = new URLSearchParams(location.search)
  for (const [key, value] of new URLSearchParams(ownSearch)) params.set(key, value)
  const search = params.toString()
  return <Navigate to={{ pathname, search: search ? `?${search}` : '' }} replace />
}
