import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { API_MODE, adoptOwnerLookup, apiPut, errorKind, isRetryable, loadMe, setStateConsole, setStateOwnerId, SESSION_EXPIRED_EVENT } from './api'
import { usePersistentState } from './usePersistentState'
import { retryAfterSignIn } from './stateStore'
import { yearId as deriveYearId } from '@/data/taxonomy'
import { STORED_ROLES, rank as rankOf, type EffectiveRole } from '@/data/adminRoles'
import { TAB_IDS } from '@/data/adminTabs'

/**
 * Who is using the app, from the sources that actually know.
 *
 * Two records answer two different questions and neither answers both. The
 * server owns the sign-in identity, the role, the assurance level and whether
 * the address is confirmed — all of it read from the session cookie it holds,
 * because a role read from Supabase user metadata would be a claim the browser
 * could edit. The `students` roster owns the profile — name, university, year,
 * cohort — and the subscription that follows from it.
 *
 * One request answers both: `GET /api/me`.
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
  phone: string | null
  nationality: string | null
  universityId: string | null
  year: string | null
  yearId?: string | null
  group: string | null
  status: string | null
  /** Server-computed: phone and enrolment both on record. See `isProfileComplete` in accounts.js. */
  profileComplete?: boolean
  /** A `managed_media` id, or null to show the profile_icon glyph instead. See useAvatar.ts. */
  avatarMediaId?: string | null
  username?: string | null
  profileIcon?: string | null
  /** Shown next to this student's name in the friends directory and party member lists. */
  statusMessage?: string | null
  /** IANA zone name, auto-detected by the browser and written by `PUT /me/profile`. */
  timezone?: string | null
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
  /** 0 student/MCQ validator, 1 reviewer/admin, 2 editor, 3 super admin. */
  rank: number
  /** The admin tabs this account holds, resolved by the server. */
  tabs: string[]
  /** A reviewer's assigned modules and years; null for everyone else. */
  contentScope: ContentScope | null
  aal: 'aal1' | 'aal2' | null
  /**
   * Whether Supabase has seen this address confirmed.
   *
   * A project with email confirmation switched off sets it at sign-up, so this
   * is true for everyone there — it only ever holds back an account that really
   * does have an unopened verification email waiting for it.
   */
  emailVerified: boolean
  /** A verified authenticator is enrolled but this session has not presented it yet (aal1). */
  mfaPending: boolean
  /**
   * The name and photo an OAuth provider handed back at sign-up, straight from
   * Supabase's own `user_metadata` — only ever populated on a fresh `/api/me`
   * read (a session under an hour old, or `?fresh=1`), null otherwise. For
   * CompleteProfile.tsx to prefill from, never a substitute for `profile.name`.
   */
  metadataName: string | null
  avatarUrl: string | null
  /** Never a fabricated person: the real name, else the email, else "Student". */
  displayName: string
  /** True when nobody has created a roster row for this account yet. */
  profileMissing: boolean
  /** True when neither the roster nor the student has said where they study. */
  audienceUnknown: boolean
  /**
   * Phone and enrolment are both on record — the server's `isProfileComplete`.
   *
   * False for a social sign-up until CompleteProfile.tsx runs: Google/Facebook
   * OAuth hands back a name and an email and never a phone, so this stays
   * false even after the onboarding overlay has settled `audienceUnknown`.
   * Nationality is deliberately not part of this — see the server-side note.
   */
  profileComplete: boolean
  profile: IdentityProfile
  audience: StudentAudience
  entitlement: Entitlement
  subscription: Subscription | null
  reload: () => void
  /**
   * Record where this account studies.
   *
   * Resolves once the server has stored it and the identity has been reread, so
   * a caller can navigate on the result and know the app already agrees.
   */
  saveEnrolment: (next: EnrolmentInput) => Promise<{ phoneConflict: boolean }>
  /** True until `/api/me` has answered — nothing about the account is known yet. */
  loading: boolean
  /**
   * True once it is settled whether this account has an enrolment.
   *
   * `audienceUnknown` is false the moment identity resolves and stays false
   * while the answer is still arriving, so anything that acts on "this student
   * has not told us where they study" — the onboarding screen above all — has
   * to wait for this instead. Asking a student who has already answered is not
   * recoverable: they answer again, possibly differently.
   */
  audienceSettled: boolean
}

/** What a student says about themselves, in the one place it is written. */
export interface EnrolmentInput {
  universityId: string
  year: string
  yearId?: string
  group?: string
  /** Carried from sign-up metadata on the first enrolment; ignored afterwards. */
  name?: string
  phone?: string
  nationality?: string
  plan?: string
}

const EMPTY_PROFILE: IdentityProfile = {
  studentId: null, name: null, email: null, phone: null, nationality: null,
  universityId: null, year: null, yearId: null, group: null, status: null, profileComplete: false,
  avatarMediaId: null,
}

const EMPTY_AUDIENCE: StudentAudience = { universityId: '', year: '', yearId: '', group: '' }

const NO_ENTITLEMENT: Entitlement = { state: 'none', plan: 'Free', expiresAt: null, daysLeft: null }

const ANONYMOUS: Identity = {
  status: 'loading', userId: null, email: null, role: null, rank: 0, tabs: [], contentScope: null,
  aal: null, emailVerified: false, mfaPending: false, metadataName: null, avatarUrl: null,
  displayName: 'Student', profileMissing: true, audienceUnknown: true, profile: EMPTY_PROFILE, audience: EMPTY_AUDIENCE,
  entitlement: NO_ENTITLEMENT, subscription: null, reload: () => undefined,
  saveEnrolment: async () => ({ phoneConflict: false }), loading: true, audienceSettled: false,
  profileComplete: false,
}

interface MeResponse {
  user: {
    id: string
    /** Only present on a fresh read; see the note on `Identity.metadataName`. */
    metadataName?: string | null
    avatarUrl?: string | null
    email: string | null
    role: string | null
    rank?: number
    tabs?: string[]
    contentScope?: ContentScope | null
    aal: string | null
    /** Null means "not asked" — see the note on the /api/me handler. */
    emailVerified?: boolean | null
    mfaPending?: boolean
  } | null
  profile: IdentityProfile | null
  subscription: Subscription | null
  entitlement: Entitlement
}

const IdentityContext = createContext<Identity>(ANONYMOUS)

/** The name to greet someone by, never invented. */
function nameFor(profile: IdentityProfile | null, email: string | null): string {
  // The username the student chose at sign-up is how they are identified across
  // the app now — in the sidebar, the greeting and anywhere else `displayName`
  // is shown. Full name (kept for the account record) and the email local part
  // remain the fallbacks for an account that predates a username.
  const username = profile?.username?.trim()
  if (username) return username
  const real = profile?.name?.trim()
  if (real) return real
  const local = email?.split('@')[0]?.trim()
  return local || 'Student'
}

/**
 * Where the student studies, in demo mode only.
 *
 * With a backend, this fact lives in one place: the `students` row keyed to the
 * account, written by `PUT /api/me/enrolment` and read back by `/api/me`. It
 * used to live in a browser document that took precedence over the server —
 * which meant every browser held its own copy and two of them signed into one
 * account could show different enrolled years, with no way to tell which was
 * right. There is now exactly one writer and exactly one reader.
 *
 * The self-contained demo build has no server to hold it, so it keeps the
 * answer here. That path is unreachable whenever `API_MODE` is true.
 */
export const SELF_AUDIENCE_STORAGE_KEY = 'nishany.account.audience.v1'

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
    role: EffectiveRole | null
    tabs: string[]
    contentScope: ContentScope | null
    aal: 'aal1' | 'aal2' | null
    emailVerified: boolean
  /** A verified authenticator is enrolled but this session has not presented it yet (aal1). */
  mfaPending: boolean
    metadataName: string | null
    avatarUrl: string | null
    profile: IdentityProfile | null
    subscription: Subscription | null
    entitlement: Entitlement
  }>(() => ({
    // Without a backend there is no account system to consult, so the app is
    // usable immediately and simply knows nothing about who is using it.
    status: API_MODE ? 'loading' : 'demo',
    userId: null, email: null,
    // The demo build has no account system to consult, so nothing is hidden:
    // the offline prototype resolves to a super admin holding every tab.
    role: API_MODE ? null : 'super_admin',
    tabs: API_MODE ? [] : TAB_IDS,
    contentScope: null,
    aal: null,
    mfaPending: false,
    // Nothing to verify without an account system.
    emailVerified: !API_MODE,
    metadataName: null, avatarUrl: null,
    profile: null, subscription: null, entitlement: NO_ENTITLEMENT,
  }))
  // Demo mode only — see the note on the key. In live mode this hook is still
  // called (hooks are not conditional) but its value is never consulted.
  const [storedAudience, setStoredAudience, audienceStatus] = usePersistentState<SelfDeclaredAudience | null>(SELF_AUDIENCE_STORAGE_KEY, null)
  const [nonce, setNonce] = useState(0)
  /**
   * Re-read `/api/me`.
   *
   * A reload that follows a sign-in has to move the whole app, not just the
   * page that did it — and the gap before the answer arrives used to be read
   * as whatever was true before, i.e. "anonymous", which sent somebody who had
   * just typed their password correctly back to /login for a second try. So an
   * anonymous identity is reset to "loading" first: the guards hold instead of
   * concluding anonymous from a session that has, in fact, just been created.
   */
  const reload = useCallback(() => {
    setState((s) => (s.status === 'anonymous' ? { ...s, status: 'loading' } : s))
    setNonce((n) => n + 1)
  }, [])

  useEffect(() => {
    if (!API_MODE) return
    let cancelled = false
    // Whether this app currently believes somebody is signed in. Only used by
    // the expiry listener below, and kept here rather than read back out of
    // state so the listener cannot act on a stale render's answer.
    let authed = false

    // One round trip, and the session it reads is a cookie this page cannot
    // see. Everything the handoff apparatus used to do — minting a code on one
    // origin, redeeming it on the other — is gone: both portal hostnames share
    // the one cookie, so arriving on either is arriving signed in.
    const load = async () => {
      let me: MeResponse | null = null
      // A 401 is the ordinary signed-out case — conclude anonymous at once. But
      // a network blip or a 5xx (a redeploy caught mid-refresh) is transient:
      // retrying a few times stops a valid cookie session from being read as
      // signed-out and bounced to /login. Out of retries, anonymous is still
      // the safe reading.
      const backoff = [0, 400, 1200]
      for (let attempt = 0; attempt < backoff.length; attempt++) {
        if (backoff[attempt]) await new Promise((resolve) => setTimeout(resolve, backoff[attempt]))
        if (cancelled) return
        try {
          const request = loadMe<MeResponse>()
          // The state store asks the same question for its recovery keys; hand
          // it this request so a boot makes one `/me` call, not two.
          if (attempt === 0) void adoptOwnerLookup(request)
          me = await request
          break
        } catch (error) {
          if (!isRetryable(errorKind(error)) || attempt === backoff.length - 1) break
        }
      }
      if (cancelled) return

      if (!me?.user) {
        authed = false
        setStateOwnerId(null)
        setStateConsole(false)
        setState((s) => ({ ...s, status: 'anonymous', userId: null, email: null, role: null, tabs: [], contentScope: null, aal: null, emailVerified: false, mfaPending: false, metadataName: null, avatarUrl: null, profile: null, subscription: null, entitlement: NO_ENTITLEMENT }))
        return
      }
      // Null means the server did not ask Supabase this time, which is not
      // evidence of anything. Only an explicit `false` holds an account back;
      // reading silence as "unverified" would send a signed-in student to a
      // verification page they have already been through and cannot get past.
      const emailVerified = me.user.emailVerified !== false
      authed = true
      // Crash-recovery copies are keyed to the account that wrote them, and
      // this is the first moment that account is known.
      setStateOwnerId(me.user.id)
      // A console caller (rank ≥ 1) batches its shared-document reads; set the
      // flag here too so a retry attempt (which does not call adoptOwnerLookup)
      // still enables it.
      setStateConsole(rankOf(readRole(me.user.role) ?? '') >= 1)
      // Documents read before the session was restored were refused with a 401
      // and are sitting unread; a signed-in identity is what makes them
      // readable. Without this the app boots empty and stays that way until the
      // student reloads the page themselves.
      retryAfterSignIn()
      setState({
        status: 'authenticated',
        userId: me.user.id,
        email: me.profile?.email ?? me.user.email ?? null,
        // The server resolves the role, including the super admin it derives
        // from the email. An unrecognised value reads as a student rather than
        // being trusted: this is the browser's copy, not the authority.
        role: readRole(me.user.role),
        tabs: Array.isArray(me.user.tabs) ? me.user.tabs : [],
        contentScope: readScope(me.user.contentScope),
        aal: me.user.aal === 'aal2' ? 'aal2' : 'aal1',
        emailVerified,
        mfaPending: me.user.mfaPending === true,
        metadataName: me.user.metadataName ?? null,
        avatarUrl: me.user.avatarUrl ?? null,
        profile: me.profile,
        subscription: me.subscription,
        entitlement: me.entitlement ?? NO_ENTITLEMENT,
      })
    }

    void load()

    /**
     * A session that ended somewhere else.
     *
     * `api.ts` fires this on any 401. It is only acted on while this app still
     * believes somebody is signed in, which is the whole loop guard: the
     * re-read settles on "anonymous", the guards send the person to /login
     * once, and every later 401 — including the ones /login's own page makes —
     * finds an identity that already agrees and does nothing.
     */
    const onExpired = () => {
      if (!authed) return
      authed = false
      setState((s) => ({ ...s, status: 'loading' }))
      void load()
    }
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired)
    return () => {
      cancelled = true
      window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired)
    }
  }, [nonce])

  /**
   * Record where this account studies, and wait until the app agrees.
   *
   * Live: the server stores it and answers with the stored profile, which is
   * written straight into state so nothing renders against a value the server
   * has not confirmed. Demo: there is no server, so the browser holds it.
   */
  const saveEnrolment = useCallback(async (next: EnrolmentInput) => {
    if (!API_MODE) {
      setStoredAudience({ universityId: next.universityId, year: next.year, group: next.group?.trim() ?? '' })
      return { phoneConflict: false }
    }
    const answer = await apiPut<{ profile: IdentityProfile | null; phoneConflict?: boolean }>('/me/enrolment', next)
    setState((s) => ({ ...s, profile: answer.profile ?? s.profile }))
    // The trial the server may have just granted lives on the same record, so
    // the entitlement has to be reread rather than assumed unchanged.
    reload()
    // A phone that belongs to somebody else is dropped rather than refused
    // (see the comment on `saveOwnEnrolment` in accounts.js) — reported here so
    // CompleteProfile.tsx can say so, rather than claiming success over a
    // number that was silently not stored.
    return { phoneConflict: Boolean(answer.phoneConflict) }
  }, [reload, setStoredAudience])

  /**
   * Carry an enrolment forward from where it used to be kept.
   *
   * Before the server held this, onboarding wrote the university and year to
   * `nishany.account.audience.v1` — a per-account document, so it is genuinely
   * this student's answer and not a guess. Every student who signed up before
   * the change has one and has no roster row, and without this they would be
   * shown the onboarding screen again and asked to answer a question they
   * already answered.
   *
   * Runs once per session, only when the server has no answer and the old
   * document does. If it fails, the flag is released so a later render can try
   * again rather than leaving the student stranded.
   */
  const adopting = useRef(false)
  useEffect(() => {
    if (!API_MODE || adopting.current) return
    if (state.status !== 'authenticated') return
    if (state.profile?.universityId && state.profile?.year) return
    if (!audienceStatus.hydrated) return
    if (!storedAudience?.universityId || !storedAudience?.year) return
    adopting.current = true
    void saveEnrolment({
      universityId: storedAudience.universityId,
      year: storedAudience.year,
      group: storedAudience.group,
    }).catch(() => { adopting.current = false })
  }, [audienceStatus.hydrated, saveEnrolment, state.profile, state.status, storedAudience])

  const value = useMemo<Identity>(() => {
    const profile = state.profile ?? EMPTY_PROFILE
    // One source. In live mode it is the roster row the student themselves
    // wrote through `/api/me/enrolment`; in demo mode there is no server to
    // hold it, so the browser's copy stands in.
    const stored = API_MODE ? null : storedAudience
    const universityId = profile.universityId || stored?.universityId || ''
    const year = profile.year || stored?.year || ''
    return {
      status: state.status,
      userId: state.userId,
      email: state.email,
      role: state.role,
      rank: rankOf(state.role ?? ''),
      tabs: state.tabs,
      contentScope: state.contentScope,
      aal: state.aal,
      mfaPending: state.mfaPending,
      emailVerified: state.emailVerified,
      metadataName: state.metadataName,
      avatarUrl: state.avatarUrl,
      displayName: nameFor(state.profile, state.email),
      profileMissing: state.status === 'authenticated' && !state.profile,
      /** True when nobody has said where this account studies. */
      audienceUnknown: !universityId || !year,
      profileComplete: Boolean(profile.profileComplete),
      profile,
      audience: {
        universityId,
        year,
        // An empty university or year must not produce a plausible-looking id;
        // a filter comparing against "_Y3" would match the wrong content.
        yearId: profile.yearId || (universityId && year ? deriveYearId(universityId, year) : ''),
        group: profile.group || stored?.group || '',
      },
      entitlement: state.entitlement,
      subscription: state.subscription,
      reload,
      saveEnrolment,
      loading: state.status === 'loading',
      audienceSettled: state.status !== 'loading'
        // In live mode the account's own answer may still be on its way from
        // the document a previous build wrote it to; see the adoption effect.
        && (!API_MODE || Boolean(profile.universityId && profile.year) || audienceStatus.hydrated || Boolean(audienceStatus.error)),
    }
  }, [state, storedAudience, audienceStatus, reload, saveEnrolment])

  return <IdentityContext.Provider value={value}>{children}</IdentityContext.Provider>
}

export function useIdentity(): Identity {
  return useContext(IdentityContext)
}
