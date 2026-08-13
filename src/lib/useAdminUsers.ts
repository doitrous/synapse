import { useCallback, useEffect, useState } from 'react'
import { API_MODE, apiGet, apiPost, apiSend } from '@/lib/api'
import type { AdminUser, AdminUserDetail } from '@/data/adminUsers'

export interface UserActivity {
  families: Array<{ family: string; documents: number; bytes: number; lastUpdated: string | null }>
  totalDocuments: number
  totalBytes: number
  lastActivity: string | null
}

/**
 * The users list and the actions on one user.
 *
 * Every mutating call re-reads the affected user from the server rather than
 * patching local state, because the server computes things the client cannot:
 * whether a subscription has lapsed, what an extension actually resolved to, and
 * whether the roster row was created on the fly. Guessing any of that in the
 * browser would show an admin a number the database does not hold.
 */

export interface UserFilters {
  query?: string
  status?: string
  plan?: string
  universityId?: string
  accessStatus?: string
}

function toQuery(filters: UserFilters): string {
  const params = new URLSearchParams()
  if (filters.query) params.set('q', filters.query)
  if (filters.status) params.set('status', filters.status)
  if (filters.plan) params.set('plan', filters.plan)
  if (filters.universityId) params.set('universityId', filters.universityId)
  if (filters.accessStatus) params.set('accessStatus', filters.accessStatus)
  const q = params.toString()
  return q ? `?${q}` : ''
}

/** The server's own error text, which is written to be shown to a person. */
async function readError(error: unknown): Promise<string> {
  const message = error instanceof Error ? error.message : String(error)
  const match = message.match(/→ (\d{3})/)
  if (match) return `Request failed (${match[1]}).`
  return message || 'Something went wrong.'
}

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [passwordResetAvailable, setPasswordResetAvailable] = useState(false)

  const load = useCallback(async (filters: UserFilters = {}) => {
    if (!API_MODE) {
      setLoading(false)
      setError('User management needs the live backend. Set VITE_API_BASE to connect it.')
      return
    }
    setLoading(true)
    try {
      setUsers(await apiGet<AdminUser[]>(`/admin/users${toQuery(filters)}`))
      setError('')
    } catch (e) {
      setError(await readError(e))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
    if (!API_MODE) return
    apiGet<{ passwordReset: boolean }>('/admin/users/capabilities')
      .then((c) => setPasswordResetAvailable(c.passwordReset))
      .catch(() => setPasswordResetAvailable(false))
  }, [load])

  return { users, loading, error, load, passwordResetAvailable, setError }
}

export async function fetchUser(id: string): Promise<AdminUserDetail> {
  return apiGet<AdminUserDetail>(`/admin/users/${encodeURIComponent(id)}`)
}

export async function grantSubscription(id: string, body: { plan: string; days: number | null; note?: string; source?: string; reason: string }) {
  return apiPost(`/admin/users/${encodeURIComponent(id)}/subscription`, body)
}

export async function cancelSubscription(id: string, body: { immediate: boolean; reason: string }) {
  return apiPost(`/admin/users/${encodeURIComponent(id)}/subscription/cancel`, body)
}

export async function setAccess(id: string, body: { status: 'active' | 'suspended'; reason: string }) {
  return apiPost(`/admin/users/${encodeURIComponent(id)}/access`, body)
}

export async function sendPasswordReset(id: string, body: { reason: string }) {
  return apiPost<{ ok: boolean; actionLink: string | null }>(`/admin/users/${encodeURIComponent(id)}/password-reset`, body)
}

export async function updateProfile(id: string, body: Record<string, unknown>) {
  return apiSend(`/admin/users/${encodeURIComponent(id)}`, 'PATCH', body)
}

export async function setUserRole(id: string, body: { role: 'student' | 'admin'; reason: string }) {
  return apiPost(`/admin/users/${encodeURIComponent(id)}/role`, body)
}

/**
 * What this person has actually stored, by area.
 *
 * Separate from `fetchUser` and loaded on demand: it reads every `user_state`
 * row for the account, which is the one query here whose cost grows with how
 * much somebody has used the product. The detail panel opens without it.
 */
export async function fetchUserActivity(id: string): Promise<UserActivity> {
  return apiGet<UserActivity>(`/admin/users/${encodeURIComponent(id)}/activity`)
}
