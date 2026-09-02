/**
 * The guard around an asynchronous microphone open.
 *
 * `getUserMedia` resolves whenever the student answers the permission prompt —
 * which may be after they have left the room, switched rooms, or closed the
 * page. Without a token per attempt, that late stream is adopted by a component
 * nobody is looking at: the capture indicator stays lit, an `AudioContext` and
 * a 50 ms interval run for the life of the tab, and the teardown that was
 * supposed to stop it already ran against an empty ref.
 *
 * This is that token, kept apart from React so it can be tested for exactly the
 * race it exists to lose gracefully. It owns one rule: a stream is adopted only
 * by the attempt that is still current, and any other stream is stopped on the
 * spot rather than left running.
 */

/** The part of a `MediaStream` this file needs — narrowed so a test can stand in for one. */
export interface MicStream {
  getTracks(): { stop(): void }[]
}

export interface MicGuard {
  /**
   * Start an attempt, abandoning any earlier one. Returns the token that
   * identifies it; hand that token back to `adopt`.
   */
  begin(): number
  /** Whether the attempt holding this token is still the one being waited on. */
  isCurrent(token: number): boolean
  /**
   * Offer the guard the stream that just resolved.
   *
   * Returns true when the attempt is still current and the caller may wire the
   * stream up. Returns false when it is not — and stops every track first, so
   * the refusal is not merely advisory.
   */
  adopt(token: number, stream: MicStream): boolean
  /** Abandon whatever is in flight. Anything that resolves later is stopped. */
  release(): void
}

/** Stop every track on a stream, tolerating a stream that never arrived. */
export function stopStream(stream: MicStream | null | undefined): void {
  if (!stream) return
  for (const track of stream.getTracks()) track.stop()
}

export function createMicGuard(): MicGuard {
  // Starts at 0 and is bumped before every attempt, so token 0 is never live
  // and a stale `adopt(0, …)` from a caller that skipped `begin` is refused.
  let generation = 0
  return {
    begin() {
      generation += 1
      return generation
    },
    isCurrent(token) {
      return token === generation
    },
    adopt(token, stream) {
      if (token !== generation) {
        stopStream(stream)
        return false
      }
      return true
    },
    release() {
      generation += 1
    },
  }
}
