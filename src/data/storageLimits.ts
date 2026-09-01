/**
 * How much room a student gets for the documents they upload themselves.
 *
 * There was one number, `MY_DOCUMENT_QUOTA_BYTES`, set by an environment
 * variable and the same for everybody. Changing it meant a redeploy, and there
 * was no way to give a paying student more room than a free one — which is the
 * whole reason a storage limit exists on a product with plans.
 *
 * A plan may name its own limit; anything not named falls back to the default.
 * The limit is a fact about the plan, so it is resolved from the plan the
 * student is actually on rather than being written onto their record, where it
 * would go stale the moment they upgraded.
 */

export interface StorageLimits {
  /** Bytes a student gets when their plan does not say otherwise. */
  defaultBytes: number
  /** Plan id or name → bytes. Overrides the default for students on that plan. */
  byPlan: Record<string, number>
}

export const STORAGE_LIMITS_STORAGE_KEY = 'nishany-storage-limits-v1'

export const MEGABYTE = 1024 * 1024
export const GIGABYTE = 1024 * MEGABYTE

/** What every student got before this was configurable, kept as the starting point. */
export const DEFAULT_STORAGE_LIMITS: StorageLimits = { defaultBytes: GIGABYTE, byPlan: {} }

/** A limit that is actually a limit: whole bytes, never negative. */
export function normaliseBytes(value: number | string): number {
  const parsed = typeof value === 'number' ? value : Number(String(value).trim())
  if (!Number.isFinite(parsed) || parsed <= 0) return 0
  return Math.floor(parsed)
}

/**
 * The limit for a student on this plan.
 *
 * Matched case-insensitively on the plan's id or its name, because a
 * subscription stores whichever was current when it was taken out. A plan named
 * with a limit of zero means exactly that — no self-uploads — and is not the
 * same as a plan that names no limit at all, which takes the default.
 */
export function limitFor(limits: StorageLimits, plan: string | null | undefined): number {
  const wanted = (plan ?? '').trim().toLowerCase()
  if (wanted) {
    const named = Object.entries(limits.byPlan).find(([key]) => key.trim().toLowerCase() === wanted)
    if (named) return normaliseBytes(named[1])
  }
  return normaliseBytes(limits.defaultBytes)
}

/** Whether one more file of this size still fits. */
export function fitsWithinLimit(limits: StorageLimits, plan: string | null | undefined, usedBytes: number, incomingBytes: number): boolean {
  const limit = limitFor(limits, plan)
  if (limit <= 0) return false
  return usedBytes + Math.max(0, incomingBytes) <= limit
}

/** What is left, never below zero. */
export function remainingBytes(limits: StorageLimits, plan: string | null | undefined, usedBytes: number): number {
  return Math.max(0, limitFor(limits, plan) - Math.max(0, usedBytes))
}

/**
 * A size a person can read.
 *
 * Whole megabytes up to a gigabyte, then one decimal — "1.5 GB" says more than
 * "1536 MB", and "0.1 MB" says less than "102 KB".
 */
export function formatBytes(bytes: number): string {
  const value = Math.max(0, bytes)
  if (value >= GIGABYTE) return `${(value / GIGABYTE).toFixed(1)} GB`
  if (value >= MEGABYTE) return `${Math.round(value / MEGABYTE)} MB`
  if (value >= 1024) return `${Math.round(value / 1024)} KB`
  return `${Math.round(value)} B`
}
