/**
 * The top-level paths the client router (src/router.tsx) actually owns, so the SPA catch-all in
 * index.js can tell a real client route from a genuinely unknown one and answer 404 for the
 * latter instead of the 200 soft-404 every unmatched path used to get. Kept as the first path
 * segment only — everything nested under `/app`, `/admin` and `/auth` is a client-side sub-route
 * of one of these, matched by prefix rather than listed one by one.
 *
 * This list is not generated from router.tsx — it is the literal set of its top-level `path:`
 * entries (`/blog` included even though seo.js's own routes answer it first, so the catch-all
 * would still be correct if that changed). Keep it in sync by hand when a top-level route is
 * added or removed there.
 */
export const KNOWN_SPA_PREFIXES = [
  '/', '/en', '/ar', '/app', '/admin', '/auth', '/login', '/logout', '/signup',
  '/pricing', '/contact', '/privacy', '/terms', '/refund-policy', '/accessibility',
  '/validator', '/unsubscribe', '/s', '/blog',
]

export function isKnownSpaPath(path) {
  return path === '/' || KNOWN_SPA_PREFIXES.some((prefix) => prefix !== '/' && (path === prefix || path.startsWith(`${prefix}/`)))
}
