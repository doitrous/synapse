import type { DocumentStatus } from './catalogueAvailability'

/** Initial reads only: saving and refreshing must not replace usable content. */
export function initialLoadState(...statuses: readonly DocumentStatus[]) {
  // A read blocked only by "no session" must not gate the page. An anonymous
  // visitor on a public surface — the landing's pricing catalogue, say — can
  // never satisfy it, and a session that lapsed mid-use is already being
  // redirected to sign-in, so the surface renders from its seed instead of
  // being replaced by "This could not be loaded". Signed-in surfaces never
  // reach this state: their session is present before the read fires.
  const gating = statuses.filter(status => status.error !== 'unauthorized')
  const error = gating.find(status => status.error)?.error ?? null
  return { loading: !error && gating.some(status => !status.hydrated), error }
}
