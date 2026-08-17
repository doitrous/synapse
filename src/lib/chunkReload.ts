/**
 * Recovering a tab that was open across a deployment.
 *
 * Every screen in this app is a lazily-imported chunk, and a deployment
 * replaces the files those chunks live in. A tab that loaded build N therefore
 * holds a router that will ask for build N's chunk the moment the student opens
 * a new screen — and by then the server only has build N+1's. The import
 * rejects, and because the route sits inside a `Suspense` with nothing to catch
 * it, React renders empty: a blank page, no message, no console error the
 * student could report. It looks exactly like the app dying.
 *
 * The fix is a reload, because the new `index.html` names the new chunks. The
 * danger is reloading forever when something else is wrong, so the decision is
 * made here, out of the component, where both halves can be tested.
 */

/** How long a reload has to fix things before we stop trying and say so. */
const RETRY_WINDOW_MS = 15_000

/**
 * Whether this error is a chunk that could not be fetched.
 *
 * Matched on the message because that is all the browsers agree on: each words
 * it differently, and none of them use a distinguishable error type. Matching
 * loosely is the safe direction — a false positive costs one reload, while a
 * miss leaves the student on a blank screen.
 */
export function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error ?? '')
  return [
    'failed to fetch dynamically imported module', // Chrome, Edge
    'error loading dynamically imported module', // Firefox
    'importing a module script failed', // Safari
    'unable to preload css',
    'chunkloaderror',
    'loading chunk',
  ].some((needle) => message.toLowerCase().includes(needle))
}

/**
 * Whether to reload now, given when this tab last tried.
 *
 * One reload is the whole remedy: if the student comes back inside the retry
 * window with the same failure, the reload did not help and doing it again
 * would only spin. After the window has passed, a fresh failure is a fresh
 * deployment rather than the same one, so it earns its own reload.
 */
export function shouldReloadForChunk(lastAttemptAt: number | null, now: number): boolean {
  if (lastAttemptAt == null) return true
  return now - lastAttemptAt > RETRY_WINDOW_MS
}
