/**
 * Which portal an origin serves.
 *
 * The admin dashboard answers on connectadminacademy.nishany.com and the student app
 * on nishany.com, but both are the same build in the same container behind the same
 * /api — Coolify simply points the domains at it. So the split is decided here at
 * runtime rather than by a second deploy or a second bundle.
 *
 * The admin host is a subdomain of nishany.com, so the anchoring below is load-bearing:
 * the student pattern only matches a hostname that *begins* with `nishany.`, which
 * `connectadminacademy.nishany.com` does not — its leading label is the admin one.
 *
 * Matching is on the leading label only, so plain `localhost`, an IP, or a preview
 * URL belongs to neither portal and keeps every route mounted — `npm run dev` behaves
 * exactly as it did before, with no redirect to production mid-session. The flip side
 * is deliberate: `connectadminacademy.nishany.localhost:5173` and `nishany.localhost:5173`
 * resolve to loopback and *do* match, which is how the split is exercised locally.
 *
 * `synapse.` stays in the student pattern: the pre-rebrand domain still resolves
 * (the server 301s its pages, and the installed mobile apps keep it as their API
 * host), and any page that does render there must behave as the student site.
 */

export const ADMIN_ORIGIN = 'https://connectadminacademy.nishany.com'
export const STUDENT_ORIGIN = 'https://nishany.com'

// Anchored to the leading label, so the admin subdomain (connectadminacademy.nishany.com)
// can never satisfy the student pattern even though it contains "nishany.".
const ADMIN_HOST = /^(?:www\.)?connectadminacademy\.nishany\./i
const STUDENT_HOST = /^(?:www\.)?(?:nishany\.|synapse\.)/i

function currentHost(): string {
  return typeof window === 'undefined' ? '' : window.location.hostname
}

/** True on the admin domain, where only the dashboard is served. */
export function isAdminHost(): boolean {
  return ADMIN_HOST.test(currentHost())
}

/** True on the student domain, where the dashboard is handed to the admin domain. */
export function isStudentHost(): boolean {
  return STUDENT_HOST.test(currentHost())
}

/** The same path and query on the other portal's origin. */
export function samePathOn(origin: string): string {
  if (typeof window === 'undefined') return origin
  const { pathname, search, hash } = window.location
  return `${origin}${pathname}${search}${hash}`
}

/**
 * The path this origin treats as home.
 *
 * `/app` is not a page on the admin domain — it is a hand-over to the student
 * origin. So a fallback that names it does not send someone elsewhere in this
 * app, it sends them off the site, with `location.replace` leaving nothing to
 * go back to. Anything meaning "go where you belong" has to ask which door it
 * is standing in first.
 */
export function portalHome(): string {
  return isAdminHost() ? '/admin' : '/app'
}
