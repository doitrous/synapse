import { API_MODE, apiPost } from './api'
import { adminStudents } from '@/data/students'
import { findIdentityConflict, type IdentityConflict } from '@/data/accountIdentity'

/**
 * Whether this person already has an account, asked before one is created.
 *
 * Sign-up runs this first so that somebody re-registering is sent to sign in
 * rather than being handed an error after Supabase has already made an auth
 * user with no roster row behind it.
 *
 * The server is the authority — it holds the UNIQUE index — and this is the
 * question, not the enforcement. In demo mode, with no server, the same
 * question is put to the local roster so the flow is exercisable without a
 * backend.
 */
export async function identityConflict(candidate: { email?: string; phone?: string }): Promise<IdentityConflict | null> {
  if (!API_MODE) return findIdentityConflict(adminStudents, candidate)

  const taken = await apiPost<{ email: boolean; phone: boolean }>('/accounts/exists', {
    email: candidate.email ?? '',
    phone: candidate.phone ?? '',
  })
  if (taken.email && candidate.email) return { field: 'email', value: candidate.email.trim() }
  if (taken.phone && candidate.phone) return { field: 'phone', value: candidate.phone.trim() }
  return null
}
