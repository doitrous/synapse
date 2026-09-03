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

/**
 * The synthetic total's {dayStart, dayEnd, fraction} bounds for `nowMs`.
 *
 * `dayStart` is the value at the most recent UTC midnight, computed by
 * compounding one full calendar day at a time from `epoch`. `dayEnd` is what
 * today grows it to. `fraction` is how far through today `nowMs` is, so the
 * caller eases linearly between the two — "increases across the day" rather
 * than jumping at midnight.
 *
 * ponytail: one loop iteration per calendar day since `epoch`. `epoch` resets
 * whenever a superadmin changes `base` (see `nextSubscriberDisplayDoc`), so in
 * practice this stays small; if it is ever left running for years without a
 * base change, replace the loop with closed-form compounding.
 */
function syntheticDayBounds(nowMs, { base, epoch, minPct, maxPct, daySeed = 0 }) {
  const epochDay = dayIndex(epoch)
  const nowDay = dayIndex(nowMs)
  let value = base
  for (let day = epochDay; day < nowDay; day++) {
    const m = dailyMultiplierPercent(day, minPct, maxPct, daySeed)
    value += Math.round(value * (m / 100))
  }
  const mToday = dailyMultiplierPercent(nowDay, minPct, maxPct, daySeed)
  const dayStart = value
  const dayEnd = dayStart + Math.round(dayStart * (mToday / 100))
  const dayStartMs = nowDay * DAY_MS
  const fraction = Math.min(1, Math.max(0, (nowMs - dayStartMs) / DAY_MS))
  return { dayStart, dayEnd, fraction }
}

/** The synthetic component alone, at a point in time. Whole number. */
export function syntheticValueAt(nowMs, doc) {
  const { dayStart, dayEnd, fraction } = syntheticDayBounds(nowMs, doc)
  return Math.round(dayStart + (dayEnd - dayStart) * fraction)
}

/**
 * The full displayed figure: synthetic growth plus real signups since epoch.
 *
 * `ratePerSecond` is today's synthetic growth spread evenly across 86,400
 * seconds — what the client ticks the number up by between page loads. The
 * real-subscriber delta does not get its own rate: real signups are discrete
 * events, not something that should visibly tick every second.
 */
export function computeSubscriberCount(doc, { realCountNow, now = Date.now() }) {
  const { dayStart, dayEnd, fraction } = syntheticDayBounds(now, doc)
  const syntheticNow = dayStart + (dayEnd - dayStart) * fraction
  const ratePerSecond = (dayEnd - dayStart) / 86_400
  const realDelta = Math.max(0, realCountNow - doc.realCountAtEpoch)
  return { value: Math.round(syntheticNow + realDelta), ratePerSecond }
}

export const SUBSCRIBER_DISPLAY_STATE_KEY = 'nishany-subscriber-display-v1'

/**
 * `epoch: 0` and `realCountAtEpoch: 0` are placeholders for a key that has
 * never been written — harmless because `enabled` is also `false`, and
 * `nextSubscriberDisplayDoc` (Task 4) always re-captures both the first time
 * anyone actually saves this document, base unchanged or not.
 */
export const DEFAULT_SUBSCRIBER_DISPLAY = {
  enabled: false,
  base: 790,
  epoch: 0,
  realCountAtEpoch: 0,
  minPct: 0.3,
  maxPct: 2.5,
}

/** What `GET /api/public/subscriber-count` sends. Hides everything when off. */
export function publicSubscriberCountPayload(doc, { realCountNow, now = Date.now() }) {
  if (!doc?.enabled) return { enabled: false }
  const { value, ratePerSecond } = computeSubscriberCount(doc, { realCountNow, now })
  return { enabled: true, value, ratePerSecond }
}
