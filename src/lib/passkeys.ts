import { browserSupportsWebAuthn, startAuthentication, startRegistration } from '@simplewebauthn/browser'
import { API_MODE, apiDelete, apiGet, apiPost, ApiError } from './api'
import { AuthError, passkeyVerify } from './auth/client'

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
  if (error instanceof ApiError || error instanceof AuthError) return 'server_refused'
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
 * Requires an existing session (the cookie `apiPost` sends automatically) —
 * enrolling a passkey is something an already-authenticated student does from
 * their Account page, never a way to create an account.
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
 * The server used to hand back a magic-link `token_hash` for the page to
 * redeem against Supabase. There is no Supabase client here any more, so
 * `mode: 'cookie'` tells the server to redeem it itself and answer with the
 * session cookie: the hash never reaches this page at all.
 */
export async function loginWithPasskey(email: string): Promise<PasskeyResult> {
  if (!API_MODE) return { ok: false, error: 'not_configured' }
  if (!passkeysSupported) return { ok: false, error: 'not_supported' }
  try {
    const optionsJSON = await apiPost('/auth/passkey/authenticate/options', { email })
    const response = await startAuthentication({ optionsJSON: optionsJSON as never })
    const verified = await passkeyVerify(email, response)
    if (!verified.ok) return { ok: false, error: 'server_refused' }
    return { ok: true }
  } catch (error) {
    return { ok: false, error: reasonFor(error) }
  }
}
