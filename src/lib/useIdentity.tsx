import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { API_MODE, apiGet } from './api'
import { usePersistentState } from './usePersistentState'
import { retryAfterSignIn } from './stateStore'
import { supabase } from './supabase'
import { yearId as deriveYearId } from '@/data/taxonomy'
import { STORED_ROLES, rank as rankOf, type EffectiveRole } from '@/data/adminRoles'
import { TAB_IDS } from '@/data/adminTabs'

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

/** The modules and years a reviewer may write. Null means unscoped. */
export interface ContentScope {
  moduleIds: string[]
  yearIds: string[]
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
  role: EffectiveRole | null
  /** 0 student, 1 reviewer/admin, 2 editor, 3 super admin. */
  rank: number
  /** The admin tabs this account holds, resolved by the server. */
  tabs: string[]
  /** A reviewer's assigned modules and years; null for everyone else. */
  contentScope: ContentScope | null
  aal: 'aal1' | 'aal2' | null
  /** Never a fabricated person: the real name, else the email, else "Student". */
  displayName: string
  /** True when nobody has created a roster row for this account yet. */
  profileMissing: boolean
  /** True when neither the roster nor the student has said where they study. */
  audienceUnknown: boolean
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
  status: 'loading', userId: null, email: null, role: null, rank: 0, tabs: [], contentScope: null, aal: null,
  displayName: 'Student', profileMissing: true, audienceUnknown: true, profile: EMPTY_PROFILE, audience: EMPTY_AUDIENCE,
  entitlement: NO_ENTITLEMENT, subscription: null, reload: () => undefined,
}

interface MeResponse {
  user: {
    id: string
    email: string | null
    role: string | null
    rank?: number
    tabs?: string[]
    contentScope?: ContentScope | null
    aal: string | null
  } | null
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

/**
 * Where the student says they study.
 *
 * This used to be a fallback the roster overrode, which produced two problems.
 * An account with no roster row had no university and no year at all, so
 * curriculum scoping matched nothing and the app could only apologise. And a
 * student filed under the wrong year could not correct it: the account page
 * offered no field, and had it offered one the roster would have won anyway.
 *
 * So the student's own answer is authoritative. The roster value is still read
 * and still shown — the account page names it wherever it differs, so an
 * override is visible rather than silent — but it no longer overrules the
 * person it describes. User-owned state (`synapse.account.*`), so it follows
 * them between devices.
 */
export const SELF_AUDIENCE_STORAGE_KEY = 'synapse.account.audience.v1'

export interface SelfDeclaredAudience {
  universityId: string
  year: string
  group: string
}

function readRole(value: string | null | undefined): EffectiveRole | null {
  if (value === 'super_admin') return 'super_admin'
  return STORED_ROLES.includes(value as never) ? (value as EffectiveRole) : 'student'
}

function readScope(value: ContentScope | null | undefined): ContentScope | null {
  if (!value || typeof value !== 'object') return null
  const list = (entries: unknown) => (Array.isArray(entries) ? entries.filter((entry) => typeof entry === 'string' && entry.trim()) : [])
  const moduleIds = list(value.moduleIds)
  const yearIds = list(value.yearIds)
  return moduleIds.length || yearIds.length ? { moduleIds, yearIds } : null
}

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    status: IdentityStatus
    userId: string | null
    email: string | null
    metadataName: string | null
    role: EffectiveRole | null
    tabs: string[]
    contentScope: ContentScope | null
    aal: 'aal1' | 'aal2' | null
    profile: IdentityProfile | null
    subscription: Subscription | null
    entitlement: Entitlement
  }>(() => ({
    // Without a backend there is no account system to consult, so the app is
    // usable immediately and simply knows nothing about who is using it.
    status: API_MODE ? 'loading' : 'demo',
    userId: null, email: null, metadataName: null,
    // The demo build has no account system to consult, so nothing is hidden:
    // the offline prototype resolves to a super admin holding every tab.
    role: API_MODE ? null : 'super_admin',
    tabs: API_MODE ? [] : TAB_IDS,
    contentScope: null,
    aal: null,
    profile: null, subscription: null, entitlement: NO_ENTITLEMENT,
  }))
  const [selfAudience] = usePersistentState<SelfDeclaredAudience | null>(SELF_AUDIENCE_STORAGE_KEY, null)
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
        setState((s) => ({ ...s, status: 'anonymous', userId: null, email: null, metadataName: null, role: null, tabs: [], contentScope: null, aal: null, profile: null, subscription: null, entitlement: NO_ENTITLEMENT }))
        return
      }
      // Documents read before the session was restored were refused with a 401
      // and are sitting unread; a signed-in identity is what makes them
      // readable. Without this the app boots empty and stays that way until the
      // student reloads the page themselves.
      retryAfterSignIn()
      setState({
        status: 'authenticated',
        userId: me.user.id,
        email: me.profile?.email ?? me.user.email ?? session?.user.email ?? null,
        metadataName,
        // The server resolves the role, including the super admin it derives
        // from the email. An unrecognised value reads as a student rather than
        // being trusted: this is the browser's copy, not the authority.
        role: readRole(me.user.role),
        tabs: Array.isArray(me.user.tabs) ? me.user.tabs : [],
        contentScope: readScope(me.user.contentScope),
        aal: me.user.aal === 'aal2' ? 'aal2' : 'aal1',
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
    // What the student said, then the roster. A person correcting their own
    // year is the best source there is for it.
    const universityId = selfAudience?.universityId || profile.universityId || ''
    const year = selfAudience?.year || profile.year || ''
    return {
      status: state.status,
      userId: state.userId,
      email: state.email,
      role: state.role,
      rank: rankOf(state.role ?? ''),
      tabs: state.tabs,
      contentScope: state.contentScope,
      aal: state.aal,
      displayName: nameFor(state.profile, state.metadataName, state.email),
      profileMissing: state.status === 'authenticated' && !state.profile,
      /** True when neither the roster nor the student has said where they study. */
      audienceUnknown: !universityId || !year,
      profile,
      audience: {
        universityId,
        year,
        // An empty university or year must not produce a plausible-looking id;
        // a filter comparing against "_Y3" would match the wrong content.
        yearId: universityId && year ? deriveYearId(universityId, year) : '',
        group: selfAudience?.group || profile.group || '',
      },
      entitlement: state.entitlement,
      subscription: state.subscription,
      reload,
    }
  }, [state, selfAudience, reload])

  return <IdentityContext.Provider value={value}>{children}</IdentityContext.Provider>
}

export function useIdentity(): Identity {
  return useContext(IdentityContext)
}
