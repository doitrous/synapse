import { browserSupportsWebAuthn, startAuthentication, startRegistration } from '@simplewebauthn/browser'
import { apiDelete, apiGet, apiPost, ApiError } from './api'
import { supabase } from './supabase'

/** Whether this browser can even attempt a passkey ceremony. */
export const passkeysSupported = typeof window !== 'undefined' && browserSupportsWebAuthn()

export interface PasskeyCredential {
  id: string
  deviceLabel: string | null
  transports: string | null
  createdAt: string
  lastUsedAt: string | null
}

type PasskeyResult = { ok: true } | { ok: false; error: PasskeyErrorReason }

/**
 * A cancelled prompt and "your fingerprint didn't match" are not failures the
 * caller needs to explain differently from a network hiccup — the browser
 * already showed its own UI for those — but "there is nothing to try this
 * with" and "the server refused it" are, so those get their own reasons.
 */
export type PasskeyErrorReason = 'not_supported' | 'not_configured' | 'cancelled' | 'already_registered' | 'server_refused' | 'failed'

function reasonFor(error: unknown): PasskeyErrorReason {
  if (error instanceof ApiError) return 'server_refused'
  const name = error && typeof error === 'object' && 'name' in error ? String((error as { name?: unknown }).name) : ''
  // WebAuthn's own vocabulary: the user dismissed the prompt or it timed out,
  // or this authenticator already holds a credential for this account.
  if (name === 'NotAllowedError') return 'cancelled'
  if (name === 'InvalidStateError') return 'already_registered'
  return 'failed'
}

/** Registered passkeys for the signed-in account — for Account.tsx's list. */
export async function listMyPasskeys(): Promise<PasskeyCredential[]> {
  const { credentials } = await apiGet<{ credentials: PasskeyCredential[] }>('/auth/passkey/credentials')
  return credentials
}

export async function removeMyPasskey(id: string): Promise<void> {
  await apiDelete(`/auth/passkey/credentials/${encodeURIComponent(id)}`)
}

/**
 * Register this device's authenticator as a passkey for the signed-in account.
 *
 * Requires an existing Supabase session (the Bearer token `apiPost` attaches
 * automatically) — enrolling a passkey is something an already-authenticated
 * student does from their Account page, never a way to create an account.
 */
export async function enrollPasskey(deviceLabel?: string): Promise<PasskeyResult> {
  if (!passkeysSupported) return { ok: false, error: 'not_supported' }
  try {
    const optionsJSON = await apiPost('/auth/passkey/register/options')
    const response = await startRegistration({ optionsJSON: optionsJSON as never })
    const verified = await apiPost<{ ok?: boolean; error?: string }>('/auth/passkey/register/verify', { response, deviceLabel })
    if (!verified.ok) return { ok: false, error: 'server_refused' }
    return { ok: true }
  } catch (error) {
    return { ok: false, error: reasonFor(error) }
  }
}

/**
 * Sign in with a passkey — no password, no existing session required.
 *
 * The server only ever hands back a `token_hash` (never a Supabase session
 * directly): `verifyOtp` is what actually establishes the session in this
 * browser's own storage, the same way any other magic-link redemption does.
 */
export async function loginWithPasskey(email: string): Promise<PasskeyResult> {
  if (!supabase) return { ok: false, error: 'not_configured' }
  if (!passkeysSupported) return { ok: false, error: 'not_supported' }
  try {
    const optionsJSON = await apiPost('/auth/passkey/authenticate/options', { email })
    const response = await startAuthentication({ optionsJSON: optionsJSON as never })
    const verified = await apiPost<{ token_hash?: string; error?: string }>('/auth/passkey/authenticate/verify', { email, response })
    if (!verified.token_hash) return { ok: false, error: 'server_refused' }
    const { error } = await supabase.auth.verifyOtp({ type: 'email', token_hash: verified.token_hash, email })
    if (error) return { ok: false, error: 'server_refused' }
    return { ok: true }
  } catch (error) {
    return { ok: false, error: reasonFor(error) }
  }
}
