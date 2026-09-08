import { useEffect, useState } from 'react'
import { UserPlus, Users, Check, X, Swords, Play, Link2, Copy } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { EmptyState } from '@/components/ui/EmptyState'
import { TextInput, SearchInput } from '@/components/ui/Field'
import { FRIEND_REFUSALS, type FriendProfile } from '@/lib/useFriends'
import { ROOM_REFUSALS } from '@/lib/useStudyRooms'
import { useIdentity } from '@/lib/useIdentity'
import { useT } from '@/lib/i18n'

/** Shown in place of a server reason this map does not know, or a network failure. */
function fallbackRefusal(t: (s: string) => string): string {
  return t('That did not work. Try again.')
}

/* ── Connect Facebook ────────────────────────────────────────────────────
   Facebook's own JS SDK, loaded on demand: `FB.login` is what a student
   actually consents through, and `/me/friends` — Meta's own endpoint, called
   from the browser with the token that login just returned — is the only
   place a real friend list for this feature can come from. The server never
   sees Facebook directly; it only links the id this flow verified through
   Facebook's own login dialog, and intersects the friend list this flow read
   back from Facebook's own API. */

interface FacebookAuthResponse {
  accessToken: string
  userID: string
}

interface FacebookLoginResponse {
  authResponse: FacebookAuthResponse | null
  status?: string
}

interface FacebookFriendsResponse {
  data?: Array<{ id: string }>
  error?: unknown
}

interface FacebookSdk {
  init: (options: { appId: string; version: string; xfbml: boolean; cookie: boolean }) => void
  login: (callback: (response: FacebookLoginResponse) => void, options: { scope: string }) => void
  api: (path: string, params: Record<string, unknown>, callback: (response: FacebookFriendsResponse) => void) => void
}

declare global {
  interface Window {
    FB?: FacebookSdk
    fbAsyncInit?: () => void
  }
}

let facebookSdkPromise: Promise<FacebookSdk> | null = null

/**
 * Loads and initializes Facebook's JS SDK exactly once per page.
 *
 * A second call while the script is still loading gets the same promise
 * rather than a second `<script>` tag — `fbAsyncInit` only ever fires once,
 * so a duplicate tag would leave the second caller waiting forever.
 */
function loadFacebookSdk(appId: string): Promise<FacebookSdk> {
  if (window.FB) return Promise.resolve(window.FB)
  if (facebookSdkPromise) return facebookSdkPromise
  facebookSdkPromise = new Promise((resolve, reject) => {
    window.fbAsyncInit = () => {
      if (!window.FB) { reject(new Error('facebook_sdk_missing')); return }
      window.FB.init({ appId, version: 'v19.0', xfbml: false, cookie: true })
      resolve(window.FB)
    }
    const script = document.createElement('script')
    script.src = 'https://connect.facebook.net/en_US/sdk.js'
    script.async = true
    script.defer = true
    script.crossOrigin = 'anonymous'
    script.onerror = () => reject(new Error('facebook_sdk_failed'))
    document.body.appendChild(script)
  })
  return facebookSdkPromise
}

/**
 * Connect, find matches, add them.
 *
 * Hidden rather than a dead button when the build has no app id or the
 * feature flag is off — a control that cannot do anything yet is worse than
 * no control. Once connected, the result reuses the exact list-with-Add UI
 * `DirectorySearch` already renders, because a match found through Facebook
 * is not a different kind of person to add, just a different way of finding
 * one.
 */
function FacebookConnect({
  onConnect,
  onMatch,
  onRequest,
}: {
  onConnect: (fbUserId: string) => Promise<{ ok: boolean; reason?: string }>
  onMatch: (fbFriendIds: string[]) => Promise<{ people: FriendProfile[] }>
  onRequest: (userId: string) => Promise<{ ok: boolean; reason?: string }>
}) {
  const t = useT()
  const appId = import.meta.env.VITE_FACEBOOK_APP_ID as string | undefined
  const enabled = import.meta.env.VITE_FEATURE_FACEBOOK_FRIENDS === 'true' && Boolean(appId)

  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle')
  const [matches, setMatches] = useState<FriendProfile[] | null>(null)
  const [error, setError] = useState('')
  const [addingId, setAddingId] = useState<string | null>(null)

  if (!enabled) {
    return (
      <p className="text-[12.5px] leading-relaxed text-ink-3">
        {t('Finding friends through Facebook is waiting on Facebook’s own review. Use your invite link in the meantime.')}
      </p>
    )
  }

  async function connect() {
    setStatus('connecting')
    setError('')
    try {
      const FB = await loadFacebookSdk(appId!)
      const login = await new Promise<FacebookLoginResponse>((resolve) => {
        FB.login((response) => resolve(response), { scope: 'public_profile,user_friends' })
      })
      if (!login.authResponse) {
        // The student closed the dialog or declined — not an error, just
        // nothing to do, so the button goes back to inviting a first try.
        setStatus('idle')
        return
      }
      const linkResult = await onConnect(login.authResponse.userID)
      if (!linkResult.ok) {
        setStatus('error')
        setError(FRIEND_REFUSALS[linkResult.reason ?? ''] ?? fallbackRefusal(t))
        return
      }
      const friendsResponse = await new Promise<FacebookFriendsResponse>((resolve) => {
        FB.api('/me/friends', { fields: 'id' }, (response) => resolve(response ?? {}))
      })
      const fbFriendIds = (friendsResponse.data ?? []).map((entry) => entry.id)
      const matchResult = await onMatch(fbFriendIds)
      setMatches(matchResult?.people ?? [])
      setStatus('connected')
    } catch {
      setStatus('error')
      setError(fallbackRefusal(t))
    }
  }

  async function add(userId: string) {
    setAddingId(userId)
    try {
      const result = await onRequest(userId)
      if (result.ok) setMatches((prev) => (prev ?? []).filter((person) => person.userId !== userId))
    } catch {
      // Left in the list: a dropped request should read as "try again", not
      // as a friend that silently vanished.
    } finally {
      setAddingId(null)
    }
  }

  if (status === 'connected' && matches) {
    if (matches.length === 0) {
      return (
        <p className="text-[12.5px] leading-relaxed text-ink-3">
          {t('None of your Facebook friends are here yet. Share your invite link to bring them in.')}
        </p>
      )
    }
    return (
      <div className="space-y-2">
        <p className="text-[12.5px] text-ink-3">
          {matches.length === 1
            ? t('1 Facebook friend is already here')
            : `${matches.length} ${t('Facebook friends are already here')}`}
        </p>
        <ul className="divide-y divide-line rounded-md border border-line">
          {matches.map((person) => (
            <li key={person.userId} className="flex items-center gap-3 px-3 py-2">
              <Avatar name={person.displayName} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] text-ink">{person.displayName}</span>
                {person.statusMessage && <span className="block truncate text-[11px] text-ink-3">{person.statusMessage}</span>}
              </span>
              <Button
                variant="secondary"
                size="sm"
                iconLeft={UserPlus}
                loading={addingId === person.userId}
                onClick={() => void add(person.userId)}
              >
                {t('Add')}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Button variant="secondary" size="md" loading={status === 'connecting'} onClick={() => void connect()}>
        <span className="grid size-5 place-items-center rounded-full border border-line bg-surface font-mono text-[12px] font-bold text-ink-2" aria-hidden>
          f
        </span>
        {t('Connect Facebook')}
      </Button>
      {status === 'error' && error && <p role="status" className="text-[12.5px] text-danger">{error}</p>}
    </div>
  )
}

/**
 * Your own year, searched by name.
 *
 * The cohort is decided by the server from the caller's own roster row —
 * nothing here ever tells it which university or year to search. When that
 * row has neither set, the search cannot run at all, and says so instead of
 * silently returning nothing.
 */
function DirectorySearch({
  onSearch,
  onRequest,
}: {
  onSearch: (query: string) => Promise<{ people: FriendProfile[] }>
  onRequest: (userId: string) => Promise<{ ok: boolean; reason?: string }>
}) {
  const t = useT()
  const { profile } = useIdentity()
  const hasCohort = Boolean(profile.universityId && profile.year)
  const [query, setQuery] = useState('')
  const [privacyRevision,setPrivacyRevision]=useState(0)
  useEffect(()=>{const refresh=()=>setPrivacyRevision(value=>value+1);window.addEventListener('nishany:discoverability-changed',refresh);return()=>window.removeEventListener('nishany:discoverability-changed',refresh)},[])
  const [results, setResults] = useState<FriendProfile[]>([])
  const [addingId, setAddingId] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!hasCohort) return
    let cancelled = false
    const timer = window.setTimeout(() => {
      void onSearch(query)
        .then((data) => { if (!cancelled) setResults(data?.people ?? []) })
        .catch(() => { if (!cancelled) setResults([]) })
    }, 300)
    return () => { cancelled = true; window.clearTimeout(timer) }
  }, [query, hasCohort, onSearch, privacyRevision])

  if (!hasCohort) {
    return (
      <p className="text-[12.5px] leading-relaxed text-ink-3">
        {t('Set your university and year in Account to search for classmates.')}
      </p>
    )
  }

  async function add(userId: string) {
    setAddingId(userId)
    setMessage('')
    try {
      const result = await onRequest(userId)
      if (result.ok) {
        // Sent: the same person can no longer be added twice, so it drops out
        // of these results exactly as it would from a fresh search.
        setResults((prev) => prev.filter((person) => person.userId !== userId))
      } else {
        setMessage(FRIEND_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t))
      }
    } catch {
      setMessage(fallbackRefusal(t))
    } finally {
      setAddingId(null)
    }
  }

  return (
    <div className="space-y-2">
      <SearchInput
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('Search your year by name')}
        aria-label={t('Search your year by name')}
      />
      {results.length > 0 && (
        <ul className="divide-y divide-line rounded-md border border-line">
          {results.map((person) => (
            <li key={person.userId} className="flex items-center gap-3 px-3 py-2">
              <Avatar name={person.displayName} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] text-ink">{person.displayName}</span>
                {person.statusMessage && <span className="block truncate text-[11px] text-ink-3">{person.statusMessage}</span>}
              </span>
              <Button
                variant="secondary"
                size="sm"
                iconLeft={UserPlus}
                loading={addingId === person.userId}
                onClick={() => void add(person.userId)}
              >
                {t('Add')}
              </Button>
            </li>
          ))}
        </ul>
      )}
      {message && <p role="status" className="text-[12.5px] text-danger">{message}</p>}
    </div>
  )
}

/**
 * The link a student sends when there is no directory to search.
 *
 * A university does not have to share a channel for two of its students to
 * become study partners: this works over text, WhatsApp, anything — the link
 * itself carries the invitation.
 */
function InviteLinkPanel({
  onCreateInvite,
  onSearchDirectory,
  onRequest,
  onConnectFacebook,
  onMatchFacebook,
}: {
  onCreateInvite: () => Promise<{ token: string }>
  onSearchDirectory: (query: string) => Promise<{ people: FriendProfile[] }>
  onRequest: (userId: string) => Promise<{ ok: boolean; reason?: string }>
  onConnectFacebook: (fbUserId: string) => Promise<{ ok: boolean; reason?: string }>
  onMatchFacebook: (fbFriendIds: string[]) => Promise<{ people: FriendProfile[] }>
}) {
  const t = useT()
  const [link, setLink] = useState<string | null>(null)
  const [minting, setMinting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  async function createInvite() {
    setMinting(true)
    setFailed(false)
    try {
      const result = await onCreateInvite()
      if (result?.token) setLink(`${window.location.origin}/app/study-together?invite=${result.token}`)
    } catch {
      // A dropped request should not leave the button spinning forever —
      // the student needs to know it is safe to try again.
      setFailed(true)
    } finally {
      setMinting(false)
    }
  }

  return (
    <Panel>
      <PanelHeader title={t('Find friends')} icon={Link2} />
      <div className="space-y-4 p-5">
        <DirectorySearch onSearch={onSearchDirectory} onRequest={onRequest} />

        <div className="space-y-3 border-t border-line pt-4">
          <p className="text-[12.5px] leading-relaxed text-ink-3">
            {t('No shared university, no directory, no problem. Send this link on any channel — opening it asks to be your friend.')}
          </p>
          {link ? (
            <div className="flex flex-wrap items-center gap-2">
              <TextInput readOnly value={link} onFocus={(event) => event.currentTarget.select()} className="min-w-0 flex-1 font-mono text-[12px]" />
              <Button
                variant="secondary"
                iconLeft={copied ? Check : Copy}
                onClick={() => { void navigator.clipboard?.writeText(link); setCopied(true); window.setTimeout(() => setCopied(false), 1600) }}
              >
                {copied ? t('Copied') : t('Copy')}
              </Button>
            </div>
          ) : (
            <>
              <Button variant="primary" iconLeft={Link2} loading={minting} onClick={() => void createInvite()}>
                {t('Create invite link')}
              </Button>
              {failed && <p role="status" className="text-[12.5px] text-danger">{t('That link could not be created. Try again.')}</p>}
            </>
          )}
        </div>

        <div className="space-y-3 border-t border-line pt-4">
          <FacebookConnect onConnect={onConnectFacebook} onMatch={onMatchFacebook} onRequest={onRequest} />
        </div>
      </div>
    </Panel>
  )
}

/**
 * Who you study with.
 *
 * A section that has nothing to show is absent rather than empty: three
 * headings over three "nothing here yet" lines is noise on the screen a
 * student sees most often.
 */
export function FriendsPanel({
  friends,
  incoming,
  outgoing,
  onRespond,
  onRemove,
  onStudyTogether,
  onChallenge,
  onCreateInvite,
  onRequest,
  onSearchDirectory,
  onConnectFacebook,
  onMatchFacebook,
}: {
  friends: FriendProfile[]
  incoming: FriendProfile[]
  outgoing: FriendProfile[]
  onRespond: (userId: string, accept: boolean) => Promise<{ ok: boolean; reason?: string }>
  onRemove: (userId: string) => Promise<{ ok: boolean; reason?: string }>
  // Creates the room and opens it; resolves once that is known so this panel
  // can show its own loading state and, on failure, the reason.
  onStudyTogether: (friend: FriendProfile) => Promise<{ ok: boolean; reason?: string }>
  onChallenge: (friend: FriendProfile) => void
  onCreateInvite: () => Promise<{ token: string }>
  // Threaded down rather than taken from a second `useFriends()` here. Two
  // instances meant two copies of the same server state, so a request sent
  // from the search did not appear in "Waiting for an answer" until the
  // page's own copy happened to reload.
  onRequest: (userId: string) => Promise<{ ok: boolean; reason?: string }>
  onSearchDirectory: (query: string) => Promise<{ people: FriendProfile[] }>
  onConnectFacebook: (fbUserId: string) => Promise<{ ok: boolean; reason?: string }>
  onMatchFacebook: (fbFriendIds: string[]) => Promise<{ people: FriendProfile[] }>
}) {
  const t = useT()

  // One in-flight row at a time is disabled by its own id, so a double-click
  // cannot start a second mutation (and the reload it triggers) before the
  // first has resolved.
  const [actingIds, setActingIds] = useState<Set<string>>(new Set())
  const [requestsMessage, setRequestsMessage] = useState('')
  const [friendsMessage, setFriendsMessage] = useState('')

  function markActing(userId: string, acting: boolean) {
    setActingIds((prev) => {
      const next = new Set(prev)
      if (acting) next.add(userId)
      else next.delete(userId)
      return next
    })
  }

  async function handleRespond(userId: string, accept: boolean) {
    markActing(userId, true)
    try {
      const result = await onRespond(userId, accept)
      setRequestsMessage(result.ok ? '' : (FRIEND_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t)))
    } catch {
      setRequestsMessage(fallbackRefusal(t))
    } finally {
      markActing(userId, false)
    }
  }

  async function handleRemove(userId: string) {
    markActing(userId, true)
    try {
      const result = await onRemove(userId)
      setFriendsMessage(result.ok ? '' : (FRIEND_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t)))
    } catch {
      setFriendsMessage(fallbackRefusal(t))
    } finally {
      markActing(userId, false)
    }
  }

  async function handleStudyTogether(friend: FriendProfile) {
    markActing(friend.userId, true)
    try {
      const result = await onStudyTogether(friend)
      // On success the page navigates straight into the room, so there is
      // nothing left here to show; only a refusal needs a message.
      if (!result.ok) setFriendsMessage(ROOM_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t))
    } catch {
      setFriendsMessage(fallbackRefusal(t))
    } finally {
      markActing(friend.userId, false)
    }
  }

  return (
    <div className="space-y-4">
      <InviteLinkPanel
        onCreateInvite={onCreateInvite}
        onSearchDirectory={onSearchDirectory}
        onRequest={onRequest}
        onConnectFacebook={onConnectFacebook}
        onMatchFacebook={onMatchFacebook}
      />

      {incoming.length > 0 && (
        <Panel>
          <PanelHeader title={t('Asked to be friends')} icon={UserPlus} hint={String(incoming.length)} />
          <ul className="divide-y divide-line">
            {incoming.map((person) => (
              <li key={person.userId} className="flex items-center gap-3 px-4 py-3">
                <Avatar name={person.displayName} size="sm" />
                <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink">{person.displayName}</span>
                <Button
                  variant="primary"
                  size="sm"
                  iconLeft={Check}
                  disabled={actingIds.has(person.userId)}
                  onClick={() => void handleRespond(person.userId, true)}
                >
                  {t('Accept')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconLeft={X}
                  disabled={actingIds.has(person.userId)}
                  onClick={() => void handleRespond(person.userId, false)}
                >
                  {t('Decline')}
                </Button>
              </li>
            ))}
          </ul>
          {requestsMessage && <p role="status" className="border-t border-line px-4 py-2.5 text-[12.5px] text-danger">{requestsMessage}</p>}
        </Panel>
      )}

      <Panel>
        <PanelHeader title={t('Your friends')} icon={Users} hint={friends.length ? String(friends.length) : undefined} />
        {friends.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={Users}
              title={t('No friends yet')}
              description={t('Share your invite link, or find someone from your year below.')}
            />
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {friends.map((person) => (
              <li key={person.userId} className="flex flex-wrap items-center gap-2 px-4 py-3">
                <Avatar name={person.displayName} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] text-ink">{person.displayName}</span>
                  {person.statusMessage && <span className="block truncate text-[11px] text-ink-3">{person.statusMessage}</span>}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  iconLeft={Play}
                  loading={actingIds.has(person.userId)}
                  disabled={actingIds.has(person.userId)}
                  onClick={() => void handleStudyTogether(person)}
                >
                  {t('Study together')}
                </Button>
                <Button variant="secondary" size="sm" iconLeft={Swords} onClick={() => onChallenge(person)}>
                  {t('Challenge')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={actingIds.has(person.userId)}
                  onClick={() => void handleRemove(person.userId)}
                >
                  {t('Remove')}
                </Button>
              </li>
            ))}
          </ul>
        )}
        {friendsMessage && <p role="status" className="border-t border-line px-4 py-2.5 text-[12.5px] text-danger">{friendsMessage}</p>}
      </Panel>

      {outgoing.length > 0 && (
        <Panel>
          <PanelHeader title={t('Waiting for an answer')} icon={UserPlus} />
          <ul className="divide-y divide-line">
            {outgoing.map((person) => (
              <li key={person.userId} className="flex items-center gap-3 px-4 py-3">
                <Avatar name={person.displayName} size="sm" />
                <span className="min-w-0 flex-1 truncate text-[13.5px] text-ink-2">{person.displayName}</span>
                <span className="text-[12px] text-ink-3">{t('Asked')}</span>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  )
}
