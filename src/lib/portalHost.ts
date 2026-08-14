/**
 * Which portal an origin serves.
 *
 * The admin dashboard answers on adminsynapse.doitrous.com and the student app on
 * synapse.doitrous.com, but both are the same build in the same container behind
 * the same /api — Coolify simply points two domains at it. So the split is decided
 * here at runtime rather than by a second deploy or a second bundle.
 *
 * Matching is on the leading label only, so plain `localhost`, an IP, or a preview
 * URL belongs to neither portal and keeps every route mounted — `npm run dev` behaves
 * exactly as it did before, with no redirect to production mid-session. The flip side
 * is deliberate: `adminsynapse.localhost:5173` and `synapse.localhost:5173` resolve to
 * loopback and *do* match, which is how the split is exercised locally.
 */

export const ADMIN_ORIGIN = 'https://adminsynapse.doitrous.com'
export const STUDENT_ORIGIN = 'https://synapse.doitrous.com'

// Anchored, so "adminsynapse." can never satisfy the student pattern.
const ADMIN_HOST = /^(?:www\.)?adminsynapse\./i
const STUDENT_HOST = /^(?:www\.)?synapse\./i

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
