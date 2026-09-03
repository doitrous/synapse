/**
 * The marketing subscriber count: a synthetic baseline that grows a little
 * every day, plus real signups added on top. Never reads or writes
 * `students`/`subscriptions` except through `activeSubscriptionCount()`
 * (server/src/platformReports.js), and never writes either table.
 */

const DAY_MS = 86_400_000

function dayIndex(ms) {
  return Math.floor(ms / DAY_MS)
}

/**
 * A deterministic multiplier in [minPct, maxPct] for one calendar day.
 *
 * Deterministic from (day, daySeed) alone — no Math.random — so re-computing
 * it later (a second request, a redeploy) always gives the same number for
 * the same day. A plain xorshift mix of the two integers, not a hash library:
 * the only property this needs is "looks unpredictable, is actually a pure
 * function of its inputs."
 */
export function dailyMultiplierPercent(day, minPct, maxPct, daySeed = 0) {
  let x = (day * 2654435761 + daySeed * 2246822519) >>> 0
  x ^= x << 13; x >>>= 0
  x ^= x >>> 17
  x ^= x << 5; x >>>= 0
  const unit = x / 4294967296 // → [0, 1)
  return minPct + unit * (maxPct - minPct)
}
