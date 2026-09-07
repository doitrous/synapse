/**
 * The admin view of a user.
 *
 * Deliberately two nested records rather than one flat one, because they can
 * each be absent and the difference matters on screen. `identity` is the
 * Supabase sign-in — absent means this person has never signed in, so there is
 * nothing to suspend and no password to reset. `subscription` is the current
 * granted period — absent means they have never had one, which is different
 * from having one that expired.
 */

export type AccessStatus = 'active' | 'suspended'
/** Mirrors `STORED_ROLES` plus the super admin the server derives from an email. */
export type UserRole = 'student' | 'mcq_validator' | 'reviewer' | 'admin' | 'editor' | 'super_admin'
export type EntitlementState = 'none' | 'trialing' | 'active' | 'expired' | 'cancelled'

export interface AdminUserIdentity {
  userId: string
  role: UserRole | null
  accessStatus: AccessStatus | null
  createdAt: string | null
  /** A reviewer's assigned modules and years. Null for every other role. */
  contentScope?: { moduleIds: string[]; yearIds: string[] } | null
}

export interface AdminUserSubscription {
  id: string
  plan: string
  status: 'trialing' | 'active' | 'cancelled'
  source: 'manual' | 'voucher' | 'payment' | 'trial'
  startedAt: string
  expiresAt: string | null
  note: string | null
}

/** What the entitlement actually is right now, computed on the server. */
export interface Entitlement {
  state: EntitlementState
  plan: string
  expiresAt: string | null
  /** `null` when the grant is open-ended, `0` when it has already lapsed. */
  daysLeft: number | null
}

export interface AdminUser {
  id: string
  name: string | null
  email: string | null
  universityId: string | null
  year: string | null
  status: string | null
  joined: string | null
  lastActive: string | null
  notes: string | null
  performance: { questionsAnswered: number; accuracy: number; readiness: number }
  identity: AdminUserIdentity | null
  subscription: AdminUserSubscription | null
  entitlement: Entitlement
}

export interface SubscriptionHistoryRow {
  id: string
  plan: string
  status: string
  startedAt: string
  expiresAt: string | null
  source: string
  grantedBy: string
  note: string | null
  cancelledAt: string | null
  createdAt: string
}

export interface AccountAuditRow {
  id: number
  action: string
  detail: string | null
  reason: string
  actorId: string
  createdAt: string
}

export interface AdminUserDetail extends AdminUser {
  subscriptionHistory: SubscriptionHistoryRow[]
  audit: AccountAuditRow[]
}

/** Preset extension lengths, matching how the plans are actually sold. */
export const EXTENSION_PRESETS = [
  { label: '30 days', days: 30 },
  { label: '90 days', days: 90 },
  { label: '180 days', days: 180 },
  { label: '1 year', days: 365 },
  { label: 'Open-ended', days: null },
] as const

export function entitlementTone(state: EntitlementState): 'success' | 'primary' | 'warning' | 'danger' | 'neutral' {
  if (state === 'active') return 'success'
  if (state === 'trialing') return 'primary'
  if (state === 'expired') return 'warning'
  if (state === 'cancelled') return 'danger'
  return 'neutral'
}

export function entitlementLabel(entitlement: Entitlement): string {
  if (entitlement.state === 'none') return 'No subscription'
  if (entitlement.state === 'expired') return `${entitlement.plan} · expired`
  if (entitlement.state === 'cancelled') return `${entitlement.plan} · cancelled`
  if (entitlement.daysLeft == null) return `${entitlement.plan} · open-ended`
  return `${entitlement.plan} · ${entitlement.daysLeft}d left`
}

/** A short, human date. The API returns ISO or MySQL datetimes. */
export function shortDate(value: string | null): string {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? String(value).slice(0, 10) : date.toISOString().slice(0, 10)
}
