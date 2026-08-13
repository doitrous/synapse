import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { API_MODE, apiGet } from './api'
import { supabase } from './supabase'
import { yearId as deriveYearId } from '@/data/taxonomy'

/**
 * Who is using the app, from the sources that actually know.
 *
 * Three records answer three different questions and none of them answers all
 * three. Supabase owns the sign-in identity — the email and whether there is a
 * session at all. The server owns the role and assurance level, and it must:
 * a role read from Supabase user metadata is a claim the browser could edit.
 * The `students` roster owns the profile — name, university, year, cohort — and
 * the subscription that follows from it.
 *
 * Everything that used to read a hardcoded person reads this instead. When a
 * source has nothing to say the field is empty and the surface says so; there
 * is deliberately no fallback to an invented student.
 */

export type IdentityStatus = 'loading' | 'authenticated' | 'anonymous' | 'demo'

/** The three fields that content scope, vouchers and campaigns filter on. */
export interface StudentAudience {
  universityId: string
  /** The year label as an admin types it, e.g. "Year 3". */
  year: string
  /** The scoped year identifier content is tagged with, e.g. "OMS_Y3". */
  yearId: string
  group: string
}

export interface IdentityProfile {
  studentId: string | null
  name: string | null
  email: string | null
  universityId: string | null
  year: string | null
  group: string | null
  status: string | null
}

export interface Entitlement {
  state: 'none' | 'trialing' | 'active' | 'expired' | 'cancelled'
  plan: string
  expiresAt: string | null
  daysLeft: number | null
}

export interface Subscription {
  id: string
  plan: string
  status: string
  source: string
  startedAt: string | null
  expiresAt: string | null
  note: string | null
}

export interface Identity {
  status: IdentityStatus
  userId: string | null
  email: string | null
  role: 'student' | 'admin' | null
  aal: 'aal1' | 'aal2' | null
  /** True when this session is the temporary owner preview, not a real account. */
  bypass: boolean
  /** Never a fabricated person: the real name, else the email, else "Student". */
  displayName: string
  /** True when nobody has created a roster row for this account yet. */
  profileMissing: boolean
  profile: IdentityProfile
  audience: StudentAudience
  entitlement: Entitlement
  subscription: Subscription | null
  reload: () => void
}

const EMPTY_PROFILE: IdentityProfile = {
  studentId: null, name: null, email: null, universityId: null, year: null, group: null, status: null,
}

const EMPTY_AUDIENCE: StudentAudience = { universityId: '', year: '', yearId: '', group: '' }

const NO_ENTITLEMENT: Entitlement = { state: 'none', plan: 'Free', expiresAt: null, daysLeft: null }

const ANONYMOUS: Identity = {
  status: 'loading', userId: null, email: null, role: null, aal: null, bypass: false,
  displayName: 'Student', profileMissing: true, profile: EMPTY_PROFILE, audience: EMPTY_AUDIENCE,
  entitlement: NO_ENTITLEMENT, subscription: null, reload: () => undefined,
}

interface MeResponse {
  user: { id: string; email: string | null; role: string | null; aal: string | null; bypass: boolean } | null
  profile: IdentityProfile | null
  subscription: Subscription | null
  entitlement: Entitlement
}

const IdentityContext = createContext<Identity>(ANONYMOUS)

/** The name to greet someone by, never invented. */
function nameFor(profile: IdentityProfile | null, metadataName: string | null, email: string | null): string {
  const real = profile?.name?.trim() || metadataName?.trim()
  if (real) return real
  const local = email?.split('@')[0]?.trim()
  return local || 'Student'
}

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    status: IdentityStatus
    userId: string | null
    email: string | null
    metadataName: string | null
    role: 'student' | 'admin' | null
    aal: 'aal1' | 'aal2' | null
    bypass: boolean
    profile: IdentityProfile | null
    subscription: Subscription | null
    entitlement: Entitlement
  }>(() => ({
    // Without a backend there is no account system to consult, so the app is
    // usable immediately and simply knows nothing about who is using it.
    status: API_MODE ? 'loading' : 'demo',
    userId: null, email: null, metadataName: null, role: null, aal: null, bypass: false,
    profile: null, subscription: null, entitlement: NO_ENTITLEMENT,
  }))
  const [nonce, setNonce] = useState(0)
  const reload = useCallback(() => setNonce((n) => n + 1), [])

  useEffect(() => {
    if (!API_MODE) return
    let cancelled = false

    const load = async () => {
      const session = supabase ? (await supabase.auth.getSession()).data.session : null
      if (cancelled) return
      const metadata = session?.user.user_metadata as { full_name?: string; name?: string } | undefined
      const metadataName = metadata?.full_name || metadata?.name || null

      let me: MeResponse | null = null
      try {
        me = await apiGet<MeResponse>('/me')
      } catch {
        // A 401 here is the ordinary signed-out case, not a fault. Anything
        // else leaves the app unauthenticated too, which is the safe reading.
      }
      if (cancelled) return

      if (!me?.user) {
        setState((s) => ({ ...s, status: 'anonymous', userId: null, email: null, metadataName: null, role: null, aal: null, bypass: false, profile: null, subscription: null, entitlement: NO_ENTITLEMENT }))
        return
      }
      setState({
        status: 'authenticated',
        userId: me.user.id,
        email: me.profile?.email ?? me.user.email ?? session?.user.email ?? null,
        metadataName,
        role: me.user.role === 'admin' ? 'admin' : 'student',
        aal: me.user.aal === 'aal2' ? 'aal2' : 'aal1',
        bypass: Boolean(me.user.bypass),
        profile: me.profile,
        subscription: me.subscription,
        entitlement: me.entitlement ?? NO_ENTITLEMENT,
      })
    }

    void load()
    // Signing in or out has to move the whole app, not just the page that did it.
    const subscription = supabase?.auth.onAuthStateChange(() => { void load() })
    return () => {
      cancelled = true
      subscription?.data.subscription.unsubscribe()
    }
  }, [nonce])

  const value = useMemo<Identity>(() => {
    const profile = state.profile ?? EMPTY_PROFILE
    const universityId = profile.universityId ?? ''
    const year = profile.year ?? ''
    return {
      status: state.status,
      userId: state.userId,
      email: state.email,
      role: state.role,
      aal: state.aal,
      bypass: state.bypass,
      displayName: nameFor(state.profile, state.metadataName, state.email),
      profileMissing: state.status === 'authenticated' && !state.profile,
      profile,
      audience: {
        universityId,
        year,
        // An empty university or year must not produce a plausible-looking id;
        // a filter comparing against "_Y3" would match the wrong content.
        yearId: universityId && year ? deriveYearId(universityId, year) : '',
        group: profile.group ?? '',
      },
      entitlement: state.entitlement,
      subscription: state.subscription,
      reload,
    }
  }, [state, reload])

  return <IdentityContext.Provider value={value}>{children}</IdentityContext.Provider>
}

export function useIdentity(): Identity {
  return useContext(IdentityContext)
}
