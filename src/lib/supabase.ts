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
