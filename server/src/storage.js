/**
 * How much room a student gets for their own documents.
 *
 * The rules only, with no database behind them, so they can be tested — the
 * same split `identity.js` makes. This is the mirror of
 * `src/data/storageLimits.ts`, and the two are held to the same expectations by
 * their own suites.
 */

export const MEGABYTE = 1024 * 1024
export const GIGABYTE = 1024 * MEGABYTE

export const DEFAULT_STORAGE_LIMITS = { defaultBytes: GIGABYTE, byPlan: {} }

export function normaliseBytes(value) {
  const parsed = typeof value === 'number' ? value : Number(String(value ?? '').trim())
  if (!Number.isFinite(parsed) || parsed <= 0) return 0
  return Math.floor(parsed)
}

/**
 * Whatever was stored, made safe to read.
 *
 * An administrator's document arrives as free-form JSON out of `app_state`. A
 * missing or malformed one falls back to the default rather than throwing:
 * a broken settings document must not stop students uploading, and it must
 * certainly not silently give them unlimited room.
 */
export function readStorageLimits(raw) {
  if (!raw || typeof raw !== 'object') return DEFAULT_STORAGE_LIMITS
  const defaultBytes = normaliseBytes(raw.defaultBytes) || DEFAULT_STORAGE_LIMITS.defaultBytes
  const byPlan = {}
  if (raw.byPlan && typeof raw.byPlan === 'object') {
    for (const [plan, bytes] of Object.entries(raw.byPlan)) {
      if (typeof plan === 'string' && plan.trim()) byPlan[plan] = normaliseBytes(bytes)
    }
  }
  return { defaultBytes, byPlan }
}

/**
 * The limit for a student on this plan.
 *
 * Matched case-insensitively on the plan's id or name, because a subscription
 * stores whichever was current when it was taken out. A plan named with zero
 * means no self-uploads, which is not the same as naming no limit at all.
 */
export function limitFor(limits, plan) {
  const wanted = String(plan ?? '').trim().toLowerCase()
  if (wanted) {
    const named = Object.entries(limits.byPlan ?? {}).find(([key]) => key.trim().toLowerCase() === wanted)
    if (named) return normaliseBytes(named[1])
  }
  return normaliseBytes(limits.defaultBytes)
}

export function fitsWithinLimit(limits, plan, usedBytes, incomingBytes) {
  const limit = limitFor(limits, plan)
  if (limit <= 0) return false
  return Number(usedBytes) + Math.max(0, Number(incomingBytes)) <= limit
}

/**
 * The plan a student's storage is actually judged against.
 *
 * A lapsed or cancelled subscription still names the plan it was for, and
 * reading the limit off that would leave somebody who stopped paying with the
 * room they stopped paying for. Only a live entitlement — active or trialing —
 * carries its plan; everything else falls to Free.
 *
 * Nothing is deleted when this drops: going over the limit stops new uploads,
 * it does not remove what is already there. Reclaiming a student's own files
 * because their subscription lapsed is not a storage limit, it is data loss.
 */
export function effectivePlan(entitlement) {
  if (!entitlement) return 'Free'
  return entitlement.state === 'active' || entitlement.state === 'trialing' ? entitlement.plan : 'Free'
}
