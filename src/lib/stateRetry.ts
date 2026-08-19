import type { StateErrorKind } from './apiErrors'

/**
 * When a failed state request is worth making again.
 *
 * `isRetryable` answers a narrower question — "will the same request, sent
 * again in two seconds, plausibly succeed" — and for a 401 the honest answer is
 * usually no. But a 401 is not always a refusal of the account. Two of them are
 * ordinary and temporary:
 *
 *   - the app boots and reads its documents before the Supabase client has
 *     finished restoring the persisted session, so the request goes out with no
 *     Authorization header at all;
 *   - the access token expires while the tab is open and a read overlaps the
 *     refresh that is already in flight.
 *
 * Both used to be terminal. `hydrate` marked the document failed, nothing ever
 * re-read it, and every catalogue document is read exactly once per boot — so
 * the library, the question bank and the taxonomy stayed empty until the student
 * reloaded the page by hand. That is the whole of the "my library is empty"
 * report: not missing content, a read that was never retried.
 *
 * So a 401 gets a small, bounded number of quick retries, and after those it
 * waits for the event that could actually change the answer — a session
 * arriving. A browser that is genuinely signed out therefore asks three times
 * and stops, rather than asking every two seconds forever.
 *
 * `forbidden` is deliberately not here. A student asking for an admin-only
 * document is refused for a reason no session change will alter.
 */

/** Backoff for the bounded 401 retries, in milliseconds. */
const UNAUTHORIZED_BACKOFF_MS = [400, 1_200, 3_500]

/** The ordinary retry pause for a fault that is expected to pass. */
export const RETRY_MS = 2_000

/**
 * How long to wait before trying this read again, or null to stop trying.
 *
 * `attempt` counts failures so far, so the first failure is `attempt` 1.
 */
export function hydrationRetryDelay(kind: StateErrorKind, attempt: number): number | null {
  if (kind === 'network' || kind === 'server') return RETRY_MS
  if (kind !== 'unauthorized') return null
  return UNAUTHORIZED_BACKOFF_MS[attempt - 1] ?? null
}

/**
 * Whether this failure is one a later sign-in could reverse.
 *
 * Used to decide what to hold on to: a document that failed this way is
 * re-read, and a write that failed this way keeps its queued value and its
 * crash-recovery copy instead of being abandoned. Losing a student's unsent
 * work to a token that was mid-refresh is the same bug as the empty library,
 * one direction over.
 */
export function awaitsSession(kind: StateErrorKind): boolean {
  return kind === 'unauthorized'
}
