import { authErrorMessage } from '@/pages/auth/authMessages'

/**
 * Signing in, without a token in this page's reach.
 *
 * The browser used to hold a Supabase session in localStorage and talk to
 * GoTrue itself. It now holds one opaque `HttpOnly` cookie and talks to us:
 * every function here is a plain `fetch` at `/api/auth/*` (server/src/authRoutes.js),
 * sent `same-origin` so the cookie rides along and nothing else has to.
 *
 * Native clients are unaffected — they keep their own Supabase session and a
 * bearer token, and every route below accepts either caller.
 */
const BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? ''

/** One failure shape for every route: the status, the server's code, a sentence. */
export class AuthError extends Error {
  status: number
  code: string
  constructor(status: number, code: string, message: string) {
    super(message)
    this.name = 'AuthError'
    this.status = status
    this.code = code
  }
}

/**
 * What to show a person when one of these fails.
 *
 * A rate-limited answer already carries the only thing worth saying — how long
 * the wait is — so it is passed through verbatim; `authErrorMessage` would
 * flatten it back to "wait a few minutes". Everything else goes through the
 * shared mapping, which is what turns GoTrue's wording into ours.
 */
export function authMessage(error: unknown, fallback: string): string {
  if (error instanceof AuthError && error.status === 429) return error.message
  return authErrorMessage(error, fallback)
}

interface Failure { error?: string; message?: string; retryAfter?: number }

async function call<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const payload = res.status === 204 ? null : ((await res.json().catch(() => null)) as Failure | null)
  if (res.ok) return (payload ?? {}) as T
  if (res.status === 429) {
    const seconds = Math.max(1, Math.ceil(Number(payload?.retryAfter ?? res.headers.get('Retry-After') ?? 60)))
    throw new AuthError(429, payload?.error ?? 'too_many_attempts', `Too many attempts. Try again in ${seconds} s.`)
  }
  // An empty message lets `authErrorMessage` fall through to the caller's own
  // fallback rather than showing a bare status code.
  throw new AuthError(res.status, payload?.error ?? 'request_failed', payload?.message ?? '')
}

/** `mfaPending` means the password was right and a second factor is still owed. */
export const login = (email: string, password: string) =>
  call<{ ok: boolean; mfaPending: boolean }>('/auth/login', 'POST', { email, password })

export const logout = () => call<void>('/auth/logout', 'POST')

/**
 * `alreadyRegistered` is Supabase's own enumeration guard, preserved end to end:
 * a sign-up for an existing address succeeds with a user carrying no identities,
 * and Signup.tsx reads that to send the person to sign in rather than leaving
 * them waiting for an email about a password they never set.
 */
export const signup = (email: string, password: string, data?: Record<string, string>, turnstileToken?: string) =>
  call<{ ok: boolean; alreadyRegistered: boolean; session: boolean }>('/auth/signup', 'POST', {
    email, password, data, turnstileToken: turnstileToken || undefined,
  })

export const recover = (email: string) => call<{ ok: boolean }>('/auth/recover', 'POST', { email })

export const updatePassword = (password: string) => call<{ ok: boolean }>('/auth/password', 'PUT', { password })

export const resend = (email: string) => call<{ ok: boolean }>('/auth/resend', 'POST', { email })

export interface MfaFactor {
  id: string
  friendlyName: string | null
  factorType: string
  status: string
}

export const mfa = {
  factors: () => call<{ factors: MfaFactor[] }>('/auth/mfa/factors'),
  enroll: (friendlyName?: string) =>
    call<{ id: string; type: string; totp: { qr_code?: string; secret?: string; uri?: string } | null }>('/auth/mfa/enroll', 'POST', { friendlyName }),
  challenge: (factorId: string) => call<{ id: string }>('/auth/mfa/challenge', 'POST', { factorId }),
  verify: (factorId: string, challengeId: string, code: string) =>
    call<{ ok: boolean; aal: string }>('/auth/mfa/verify', 'POST', { factorId, challengeId, code }),
  unenroll: (factorId: string) => call<{ ok: boolean }>(`/auth/mfa/factors/${encodeURIComponent(factorId)}`, 'DELETE'),
}

/**
 * Where to send the browser to start a provider sign-in.
 *
 * A full navigation rather than a fetch: the server mints the PKCE verifier,
 * keeps it in a cookie of its own and redirects to GoTrue, so the page never
 * holds any part of the exchange.
 */
export function oauthUrl(provider: string, next: string): string {
  return `${BASE}/auth/oauth/${encodeURIComponent(provider)}?next=${encodeURIComponent(next)}`
}

/**
 * Finish a passkey ceremony as a cookie session.
 *
 * `mode: 'cookie'` tells the server to redeem the magic-link `token_hash`
 * itself (webauthn.js) instead of handing it back — the web client has no
 * Supabase client left to redeem it with, and the hash never reaches the page.
 */
export const passkeyVerify = (email: string, response: unknown) =>
  call<{ ok: boolean }>('/auth/passkey/authenticate/verify', 'POST', { email, response, mode: 'cookie' })

/**
 * What sign-up collected, kept until onboarding can store it.
 *
 * The sign-up form asks for a name, a phone and a nationality, but there is no
 * `students` row to write them to until the account picks a university — so
 * they used to be parked in Supabase user metadata and read back with
 * `supabase.auth.getUser()`. The browser cannot read that any more, and the
 * server does not project it, so the same three values wait here instead.
 * Read once, by StudentOnboarding, on the save that creates the roster row.
 */
const SIGNUP_DETAILS_KEY = 'nishany.signup.details.v1'

export interface SignupDetails { name?: string; phone?: string; nationality?: string }

export function rememberSignupDetails(details: SignupDetails): void {
  try { localStorage.setItem(SIGNUP_DETAILS_KEY, JSON.stringify(details)) } catch { /* private browsing */ }
}

export function takeSignupDetails(): SignupDetails {
  try {
    const stored = localStorage.getItem(SIGNUP_DETAILS_KEY)
    localStorage.removeItem(SIGNUP_DETAILS_KEY)
    return stored ? (JSON.parse(stored) as SignupDetails) : {}
  } catch {
    return {}
  }
}

/**
 * The same values without consuming them — for deciding *whether* to ask again.
 * A password sign-up parks a phone here; a Google/Facebook one never does, so an
 * empty phone is how onboarding knows a social account still owes those details
 * and must collect them itself. Read-only: the real, clearing read stays
 * `takeSignupDetails`, on the save that writes the row.
 */
export function peekSignupDetails(): SignupDetails {
  try {
    const stored = localStorage.getItem(SIGNUP_DETAILS_KEY)
    return stored ? (JSON.parse(stored) as SignupDetails) : {}
  } catch {
    return {}
  }
}
