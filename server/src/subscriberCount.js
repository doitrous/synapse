/**
 * The marketing subscriber count: a synthetic baseline that grows a little
 * every day, plus real signups added on top. Never reads or writes
 * `students`/`subscriptions` except through `activeSubscriptionCount()`
 * (server/src/platformReports.js), and never writes either table.
 */

import { pool } from './db.js'

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

/**
 * Validates a superadmin's patch and decides the document to store.
 *
 * `epoch`/`realCountAtEpoch` are re-captured — set to `now`/`realCountNow` —
 * whenever `base` changes, or whenever the document has never been given an
 * epoch (`current.epoch` falsy: the very first save). Left untouched
 * otherwise, so toggling `enabled` or retuning `minPct`/`maxPct` does not
 * reset the growth clock.
 */
export function nextSubscriberDisplayDoc(current, patch, { realCountNow, now = Date.now() }) {
  if (patch?.enabled !== undefined && typeof patch.enabled !== 'boolean') {
    return { ok: false, error: 'enabled must be a boolean' }
  }
  const enabled = patch?.enabled === undefined ? Boolean(current.enabled) : patch.enabled
  const base = Number(patch?.base)
  const minPct = Number(patch?.minPct)
  const maxPct = Number(patch?.maxPct)
  if (!Number.isFinite(base) || base < 0) {
    return { ok: false, error: 'base must be a non-negative number' }
  }
  if (!Number.isFinite(minPct) || !Number.isFinite(maxPct) || minPct < 0 || maxPct < minPct) {
    return { ok: false, error: 'minPct/maxPct must be numbers with minPct <= maxPct' }
  }
  const needsEpoch = base !== current.base || !current.epoch
  return {
    ok: true,
    doc: {
      enabled,
      base,
      minPct,
      maxPct,
      epoch: needsEpoch ? now : current.epoch,
      realCountAtEpoch: needsEpoch ? realCountNow : current.realCountAtEpoch,
    },
  }
}

/** The stored document, or the defaults if the key has never been written. */
export async function readSubscriberDisplay() {
  const [rows] = await pool.query('SELECT v FROM app_state WHERE k = ?', [SUBSCRIBER_DISPLAY_STATE_KEY])
  if (!rows.length) return { ...DEFAULT_SUBSCRIBER_DISPLAY }
  try {
    return { ...DEFAULT_SUBSCRIBER_DISPLAY, ...JSON.parse(rows[0].v) }
  } catch {
    return { ...DEFAULT_SUBSCRIBER_DISPLAY }
  }
}

/**
 * Writes the document, versioned. Same shape as every other admin-owned
 * app_state write in this codebase (see `POST /api/content-reports/:id/delete`
 * in index.js): a version row first, then the live row, in one transaction.
 */
export async function writeSubscriberDisplay(doc, actorId) {
  const v = JSON.stringify(doc)
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    await conn.query('INSERT INTO app_state_versions (k, v, actor_id) VALUES (?, ?, ?)', [SUBSCRIBER_DISPLAY_STATE_KEY, v, actorId])
    await conn.query('INSERT INTO app_state (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)', [SUBSCRIBER_DISPLAY_STATE_KEY, v])
    await conn.commit()
  } catch (error) {
    await conn.rollback()
    throw error
  } finally {
    conn.release()
  }
}
