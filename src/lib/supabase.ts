import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const publishableKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
  || import.meta.env.VITE_SUPABASE_ANON_KEY
) as string | undefined

export const isSupabaseConfigured = Boolean(url && publishableKey)

/**
 * An email confirmation link reports its outcome in the URL it lands on, and a
 * failed one — expired, already used — carries `error_code` instead of tokens.
 * The client below reads those parameters during start-up and then wipes them
 * with `history.replaceState`, long before a lazy-loaded page has rendered. So
 * the entry URL is copied here first: without it the verification page has no
 * way to tell a student why their link did nothing.
 */
export const authLandingSearch = typeof window === 'undefined' ? '' : window.location.search
export const authLandingHash = typeof window === 'undefined' ? '' : window.location.hash

export const supabase = isSupabaseConfigured
  ? createClient(url!, publishableKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

export async function authAccessToken(): Promise<string | null> {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token ?? null
}

export async function authUserId(): Promise<string | null> {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session?.user.id ?? null
}

// Duplicated from api.ts rather than imported: api.ts imports authAccessToken
// from this module, so importing back from it would be circular.
const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? ''

/**
 * Hand this origin's session to another origin, without a second sign-in.
 *
 * The admin and student portals are one build split by hostname at runtime
 * (portalHost.ts), but a Supabase session lives in per-origin localStorage —
 * so a visitor bounced from one host to the other by `HandOver` (router.tsx)
 * lands on an origin with no session at all. This exchanges the current
 * session's refresh_token for an opaque, single-use code good for 30 seconds
 * (server/src/authHandoff.js). Only that code travels in the URL the browser
 * is sent to; the token itself never leaves the server. Resolves to null on
 * any failure — the caller falls back to the plain, session-less handover.
 */
export async function mintSessionHandoff(): Promise<string | null> {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  const session = data.session
  if (!session?.refresh_token) return null
  try {
    const res = await fetch(`${API_BASE}/api/auth/handoff`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ refreshToken: session.refresh_token }),
    })
    if (!res.ok) return null
    const body = (await res.json()) as { code?: string }
    return body.code ?? null
  } catch {
    return null
  }
}

/**
 * Redeem a handoff code (from `?authHandoff=`) into a session on this origin.
 *
 * Resolves true only once Supabase has actually accepted the refresh_token,
 * so the caller knows a session now exists rather than merely that the code
 * was valid.
 */
export async function redeemSessionHandoff(code: string): Promise<boolean> {
  if (!supabase) return false
  try {
    const res = await fetch(`${API_BASE}/api/auth/handoff/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
    if (!res.ok) return false
    const body = (await res.json()) as { refreshToken?: string }
    if (!body.refreshToken) return false
    // A refresh_token alone is enough: Supabase mints a fresh session (both
    // tokens) from it rather than requiring the access_token too.
    const { error } = await supabase.auth.refreshSession({ refresh_token: body.refreshToken })
    return !error
  } catch {
    return false
  }
}
