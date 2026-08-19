/**
 * What a failed request means, kept apart from the client that makes them.
 *
 * This module deliberately imports nothing: the decision "is this worth trying
 * again" is the one that decides whether a surface retries forever or tells the
 * student the truth, and it should be testable without a browser, a Supabase
 * client, or build-time environment variables.
 */

/** A failed request that still knows what went wrong. */
export class ApiError extends Error {
  status: number
  path: string
  constructor(status: number, path: string, message?: string) {
    super(message ?? `${path} → ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.path = path
  }
}

/** Why a read or write failed, in the terms the caller has to act on. */
export type StateErrorKind = 'unauthorized' | 'forbidden' | 'notfound' | 'toolarge' | 'network' | 'server'

/**
 * A thrown value classified.
 *
 * Anything that is not an `ApiError` never reached the server — a DNS failure,
 * an offline tab, an aborted fetch — so it is treated as a network fault and
 * therefore worth retrying.
 */
export function errorKind(error: unknown): StateErrorKind {
  if (!(error instanceof ApiError)) return 'network'
  if (error.status === 401) return 'unauthorized'
  if (error.status === 403) return 'forbidden'
  if (error.status === 404) return 'notfound'
  if (error.status === 413) return 'toolarge'
  if (error.status >= 500) return 'server'
  return 'forbidden'
}

/**
 * Whether trying the same request again could plausibly succeed *on a timer*.
 *
 * A refusal is a decision about this request: the credentials, the permission,
 * or the size will be identical next time, so repeating it produces the same
 * answer every two seconds forever. Only a fault that might pass is retried.
 *
 * A 401 is the one refusal with a second life, because it can also mean "the
 * session had not been restored yet". It stays false here — nothing should
 * retry it on an endless timer — and `stateRetry` gives it a small bounded
 * backoff and then waits for a sign-in instead. The two must be read together.
 */
export function isRetryable(kind: StateErrorKind): boolean {
  return kind === 'network' || kind === 'server'
}
