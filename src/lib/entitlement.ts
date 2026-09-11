import type { Entitlement } from '@/lib/useIdentity'

/**
 * Whether an entitlement currently grants access to gated content.
 *
 * A trial and a paid subscription both open the app; `expired`, `cancelled` and
 * `none` do not. This mirrors the server's `entitlementOf`
 * (server/src/accounts.js) exactly, so the page a student is allowed to open and
 * the state the server computed can never disagree.
 */
export function hasActiveAccess(entitlement: Entitlement): boolean {
  return entitlement.state === 'active' || entitlement.state === 'trialing'
}

/**
 * The student routes reachable without an active subscription.
 *
 * Everything else under `/app` is subscription-gated: a lapsed student who opens
 * it is sent to `/app/upgrade`. Keyed by the route `path` (`''` is the dashboard
 * index). The free set is the four surfaces the product keeps open — the
 * dashboard, the Question of the Day teaser, Account/Billing (which must stay
 * reachable so a student can actually subscribe), and study rooms & social —
 * plus the paywall itself.
 *
 * This is a route-level boundary, not a server one: study rooms and social both
 * fetch the whole published question/article catalogue client-side, so the
 * content endpoints that serve gated pages also serve free ones and cannot be
 * gated server-side without breaking the free set. See docs/subscription-gating.md.
 */
export const FREE_STUDENT_PATHS: ReadonlySet<string> = new Set([
  '', // dashboard (index)
  'account', // must stay reachable to subscribe or renew
  'upgrade', // the paywall screen itself
  'qotd', // the free daily teaser
  'study-rooms', // study rooms & social
  // Minigames are free — the hub and every game it links to. They run on
  // authored packs or the open glossary, not the paid bank; Spotter reads
  // histology through the gated content slice, so for a lapsed student it
  // shows its own "catalogue unavailable" state rather than the paywall.
  'minigames',
  'term-grid',
  'spotter',
  'term-match',
  'clinical-sequence',
  'mechanism-chain',
  'red-flag-sort',
])
