import { API_MODE, ApiError, errorKind, getState, getUserState, isRetryable, putState, putStateDelta, putUserState, stateOwnerId, type StateErrorKind } from './api'
import { diffStateForDelta, isDeltaKey } from './stateDelta'
import { isUserOwnedState } from './stateOwnership'
import { recoveryCopyWins } from './statePrecedence'
import { awaitsSession, hydrationRetryDelay, RETRY_MS } from './stateRetry'

/**
 * One document per key, shared by every component that asks for it.
 *
 * The hook this backs used to hold all of its state per instance, which meant a
 * key was fetched once per mounted component and again on every remount. A
 * single Question Bank mount re-read the content ledger three times over and the
 * concept graph once per <ConceptText> — several per question — and moving
 * between two sections re-fetched everything both surfaces touched. Nothing was
 * wrong with any one of those requests; there were simply no fewer of them.
 *
 * So the document lives here instead:
 *   - concurrent readers of a key share one in-flight request,
 *   - the value survives unmount, so returning to a surface is immediate,
 *   - writes coalesce, so a textarea sends one request rather than one a keystroke.
 *
 * The delicate parts are unchanged and deliberately so: a refusal is terminal, a
 * fault is retried, the crash-recovery copy may only win when it is genuinely
 * newer (recoveryCopyWins), and a document is never written before it is read.
 */

/** How a surface's stored document is currently doing. */
export interface PersistentStateStatus {
  /** True once the stored document has been read (or in demo mode, always). */
  hydrated: boolean
  /** Set when a read or write failed in a way that will not fix itself. */
  error: StateErrorKind | null
  /** True while a change is still on its way to the server. */
  pending: boolean
  /**
   * Why this save was refused, in a sentence for the person who made it.
   *
   * A status code cannot say which item somebody else edited, or which change
   * was not this reviewer's to make. Cleared on the next successful read.
   */
  conflict: string | null
}

/**
 * Long enough that typing a sentence is one request, short enough that a pause
 * to think has already saved. Every path that could lose the buffer — unmount,
 * page hide, going offline and back — flushes it early, so this delays a write
 * but never risks one.
 */
const WRITE_DEBOUNCE_MS = 400

export type Updater<T> = T | ((previous: T) => T)

interface Entry {
  key: string
  userOwned: boolean
  value: unknown
  status: PersistentStateStatus
  /**
   * The setter handed to callers, created once per key.
   *
   * This must be referentially stable: a fresh closure on every notification
   * makes any effect that lists the setter in its dependencies re-run on every
   * store change, and if that effect also writes, it never stops.
   */
  setter: (next: Updater<unknown>) => void
  /** The tuple handed to useSyncExternalStore; replaced only when something changed. */
  snapshot: readonly [unknown, (next: Updater<unknown>) => void, PersistentStateStatus]
  subscribers: Set<() => void>
  hydrated: boolean
  hydrating: boolean
  lastWritten: string | null
  queued: { serialized: string; value: unknown } | null
  writing: boolean
  retryTimer: number | null
  debounceTimer: number | null
  recoveryKey: string | null
  /**
   * The version this document was read at, sent with every save.
   *
   * Without it the server can only take a whole document on trust, which is how
   * two people editing at once used to end with one of them losing everything.
   */
  version: number | null
  /**
   * The value as the server last confirmed it — the base a delta save diffs
   * against to find what this client changed. `baseKnown` guards it: until a
   * read has set it, saves go whole-document rather than diffing against a seed.
   */
  baseValue: unknown
  baseKnown: boolean
  /**
   * Whether the server that answered the last read said it can apply a delta for
   * this key. Off until proven on, so a change-only save is never sent to a
   * server old enough to misread the absent whole document as a deletion.
   */
  deltaCapable: boolean
  /** Consecutive 401s on this document, which decide when to stop asking. */
  unauthorizedAttempts: number
  /**
   * True when a 401 has run out of retries.
   *
   * The document is not abandoned — it is waiting for the one event that could
   * change the answer. `retryAfterSignIn` clears this.
   */
  awaitingSession: boolean
}

const entries = new Map<string, Entry>()

function readLocal(key: string): { found: boolean; value: unknown } {
  try {
    const stored = localStorage.getItem(key)
    if (stored != null) return { found: true, value: JSON.parse(stored) }
  } catch {
    // Private browsing / malformed data should not break a surface.
  }
  return { found: false, value: undefined }
}

/**
 * Get or create the entry for a key.
 *
 * `initial` is only consulted the first time a key is seen. Two components
 * asking for the same key with different seeds is already a contradiction —
 * previously the last one to hydrate won it — and one document cannot hold both.
 */
export function ensureEntry<T>(key: string, initial: T | (() => T)): Entry {
  const existing = entries.get(key)
  if (existing) return existing

  const seed = () => (typeof initial === 'function' ? (initial as () => T)() : initial)
  const local = API_MODE ? { found: false, value: undefined } : readLocal(key)

  const entry: Entry = {
    key,
    userOwned: isUserOwnedState(key),
    value: local.found ? local.value : seed(),
    status: { hydrated: !API_MODE, error: null, pending: false, conflict: null },
    setter: (next) => setEntryValue(key, next),
    snapshot: [undefined, () => undefined, { hydrated: false, error: null, pending: false, conflict: null }],
    subscribers: new Set(),
    hydrated: !API_MODE,
    hydrating: false,
    version: null,
    baseValue: undefined,
    baseKnown: false,
    deltaCapable: false,
    // What was just read is by definition already stored, so an unchanged
    // document does not rewrite itself on the first render that touches it.
    lastWritten: local.found ? JSON.stringify(local.value) : null,
    queued: null,
    writing: false,
    retryTimer: null,
    debounceTimer: null,
    // A shared document's recovery key is known immediately; a user-owned one
    // has to wait for the account id, so that one account's unsent work can
    // never be adopted by the next account to sign in on this browser.
    recoveryKey: isUserOwnedState(key) ? null : `nishany.pending.v1:shared:${key}`,
    unauthorizedAttempts: 0,
    awaitingSession: false,
  }
  refreshSnapshot(entry)
  entries.set(key, entry)
  return entry
}

function refreshSnapshot(entry: Entry): void {
  entry.snapshot = [entry.value, entry.setter, entry.status]
}

function notify(entry: Entry): void {
  refreshSnapshot(entry)
  for (const subscriber of entry.subscribers) subscriber()
}

function setStatus(entry: Entry, patch: Partial<PersistentStateStatus>): void {
  const next = { ...entry.status, ...patch }
  if (next.hydrated === entry.status.hydrated && next.error === entry.status.error && next.pending === entry.status.pending) return
  entry.status = next
  notify(entry)
}

export function subscribe(key: string, callback: () => void): () => void {
  const entry = entries.get(key)
  if (!entry) return () => undefined
  entry.subscribers.add(callback)
  return () => { entry.subscribers.delete(callback) }
}

export function getSnapshot(key: string) {
  return entries.get(key)!.snapshot
}

function dropRecoveryCopy(entry: Entry): void {
  try { if (entry.recoveryKey) localStorage.removeItem(entry.recoveryKey) } catch { /* ignore */ }
}

async function writeRemote(entry: Entry, value: unknown, keepalive = false): Promise<void> {
  if (entry.userOwned) {
    // A private document has one writer, so there is nothing to merge against.
    await putUserState(entry.key, value, keepalive)
    return
  }
  // Prefer a delta: send only the items changed since the loaded version. Falls
  // back to the whole document when the key is not a delta key, the base has not
  // been read yet, or the change is broad enough that whole is smaller
  // (diffStateForDelta returns null). `keepalive` bodies are tiny by definition.
  if (!keepalive && entry.deltaCapable && isDeltaKey(entry.key) && entry.baseKnown) {
    const changes = diffStateForDelta(entry.key, entry.baseValue, value)
    if (changes) {
      const result = await putStateDelta(entry.key, changes, entry.version)
      if (result && typeof result.version === 'number') entry.version = result.version
      // What we just sent is now the base the next diff measures from.
      entry.baseValue = value
      return
    }
  }
  const result = await putState(entry.key, value, entry.version)
  // Move to the version the server just wrote, or the next save would send a
  // base it has already superseded and collide with itself.
  if (result && typeof result.version === 'number') entry.version = result.version
  entry.baseValue = value
  entry.baseKnown = true
}

/**
 * Demo mode's commit. localStorage.setItem is synchronous and serialises the
 * whole document, so doing it per keystroke janks the very surface being typed
 * into — the same amplification the live path debounces away.
 */
function commitLocal(entry: Entry): void {
  const pending = entry.queued
  if (!pending) return
  try {
    localStorage.setItem(entry.key, pending.serialized)
    entry.lastWritten = pending.serialized
  } catch { /* private browsing — the change stays in memory for this session */ }
  entry.queued = null
}

async function flush(entry: Entry): Promise<void> {
  if (!API_MODE) return commitLocal(entry)
  if (entry.writing || !entry.hydrated) return
  entry.writing = true
  try {
    while (entry.queued) {
      const pending = entry.queued
      try {
        await writeRemote(entry, pending.value)
      } catch (error) {
        const kind = errorKind(error)
        if (kind === 'conflict' || kind === 'forbidden') {
          // Neither is a transport failure and neither may be retried: the
          // document moved, or this change was never this person's to make, so
          // re-sending the same body would fail identically forever.
          //
          // The queued edit is dropped and the document re-read. That does lose
          // the unsaved change — but keeping it would be worse: the next save
          // would carry a base the server has already superseded, and applying
          // it would revert whatever the other person just wrote. What must not
          // happen, and no longer does, is losing it *silently*: `conflict`
          // carries a sentence naming what collided.
          entry.queued = null
          dropRecoveryCopy(entry)
          setStatus(entry, { error: kind, pending: false, conflict: refusalText(error, kind) })
          entry.hydrated = false
          hydrate(entry.key)
          break
        }
        if (!isRetryable(kind)) {
          if (awaitsSession(kind)) {
            // Not a decision about this document — a request that went out
            // without a usable token. Abandoning the write here would throw
            // away work the student has already done, so the queued value and
            // its crash-recovery copy are both kept and `retryAfterSignIn`
            // sends them the moment a session arrives.
            entry.awaitingSession = true
            setStatus(entry, { error: kind, pending: true })
            break
          }
          // The server has decided about this document. Retrying would ask the
          // same question every two seconds and get the same answer, so the
          // change is abandoned and the surface is told why.
          entry.queued = null
          dropRecoveryCopy(entry)
          setStatus(entry, { error: kind, pending: false })
          break
        }
        if (entry.retryTimer == null) {
          entry.retryTimer = window.setTimeout(() => {
            entry.retryTimer = null
            void flush(entry)
          }, RETRY_MS)
        }
        break
      }
      entry.lastWritten = pending.serialized
      entry.unauthorizedAttempts = 0
      entry.awaitingSession = false
      if (entry.queued?.serialized === pending.serialized) {
        entry.queued = null
        dropRecoveryCopy(entry)
        setStatus(entry, { error: null, pending: false })
      }
    }
  } finally {
    entry.writing = false
  }
}

/**
 * What the server said, as a sentence rather than a status code.
 *
 * The two refusals carry different detail: a conflict names the items somebody
 * else changed, a refusal names the changes that were not this person's to
 * make. Both fall back to something true rather than something vague.
 */
function refusalText(error: unknown, kind: StateErrorKind): string {
  const body = (error instanceof ApiError ? error.body : null) as {
    reason?: string
    conflicts?: string[]
    refusals?: Array<{ reason?: string }>
  } | null
  if (body?.refusals?.length) {
    return body.refusals.map((refusal) => refusal.reason).filter(Boolean).join('; ')
  }
  if (body?.conflicts?.length) {
    return `Somebody else changed ${body.conflicts.join(', ')} while you were editing.`
        + ' Their version has been loaded and your unsaved change to it was not applied.'
  }
  if (body?.reason) return body.reason
  return kind === 'conflict'
    ? 'Somebody else changed this while you were editing. Their version has been loaded and your unsaved change was not applied.'
    : 'That change is not part of your role, so nothing was saved.'
}

/** Send anything buffered now, rather than when the debounce would have fired. */
function flushNow(entry: Entry): void {
  if (entry.debounceTimer != null) {
    window.clearTimeout(entry.debounceTimer)
    entry.debounceTimer = null
  }
  void flush(entry)
}

export function flushAllPending(): void {
  for (const entry of entries.values()) if (entry.queued) flushNow(entry)
}

function persist(entry: Entry): void {
  let serialized: string
  try { serialized = JSON.stringify(entry.value) } catch { return }
  if (serialized === entry.lastWritten) return

  // Never overwrite the server with a value read before the document arrived.
  if (API_MODE && !entry.hydrated) return

  entry.queued = { serialized, value: entry.value }

  if (API_MODE) {
    setStatus(entry, { pending: true })
    // The recovery copy is written every change rather than on the debounce, so
    // a tab killed mid-buffer still has the newest value to replay.
    try {
      if (entry.recoveryKey) {
        localStorage.setItem(entry.recoveryKey, JSON.stringify({ value: entry.value, savedAt: new Date().toISOString() }))
      }
    } catch { /* the remote queue still continues */ }
  }

  if (entry.debounceTimer != null) window.clearTimeout(entry.debounceTimer)
  entry.debounceTimer = window.setTimeout(() => {
    entry.debounceTimer = null
    void flush(entry)
  }, WRITE_DEBOUNCE_MS)
}

export function setEntryValue(key: string, next: Updater<unknown>): void {
  const entry = entries.get(key)
  if (!entry) return
  const value = typeof next === 'function' ? (next as (previous: unknown) => unknown)(entry.value) : next
  if (Object.is(value, entry.value)) return
  entry.value = value
  notify(entry)
  persist(entry)
}

/**
 * Read the document once. Concurrent callers join the read in progress rather
 * than starting their own, which is the whole point of the shared entry.
 */
export function hydrate(key: string): void {
  const entry = entries.get(key)
  if (!entry || !API_MODE || entry.hydrated || entry.hydrating) return
  entry.hydrating = true

  const attempt = async () => {
    const remote = await (entry.userOwned ? getUserState(entry.key) : getState(entry.key))
    if (remote.error) {
      // Never mark this hydrated: writing now would push the local seed over a
      // stored document we were simply unable to read.
      setStatus(entry, { error: remote.error })
      if (remote.error === 'unauthorized') entry.unauthorizedAttempts += 1
      const delay = hydrationRetryDelay(remote.error, entry.unauthorizedAttempts)
      if (delay != null) {
        window.setTimeout(() => { void attempt() }, delay)
      } else {
        // Out of tries. A 401 waits for a session rather than being written off:
        // this document is read once per boot, and giving up on it silently is
        // what left the library empty until the student reloaded by hand.
        entry.hydrating = false
        entry.awaitingSession = awaitsSession(remote.error)
      }
      return
    }

    if (entry.userOwned) {
      const ownerId = await stateOwnerId()
      entry.recoveryKey = ownerId ? `nishany.pending.v2:user:${ownerId}:${entry.key}` : null
      // The former unscoped recovery key is deliberately retired so data from
      // one account can never be adopted by another account.
      try { localStorage.removeItem(`nishany.pending.v1:user:${entry.key}`) } catch { /* ignore */ }
    }

    // The version this document was read at. Every later save quotes it, so the
    // server can tell this client's own changes from somebody else's.
    entry.version = remote.version
    // The server's value is the base a delta measures against — even when a
    // recovery copy wins below and becomes the value to save, what it is diffed
    // against is what the server holds.
    entry.baseValue = remote.value ?? null
    entry.baseKnown = true
    entry.deltaCapable = remote.deltaSupported === true

    let recovered: { value: unknown; savedAt: string } | null = null
    try {
      const pending = entry.recoveryKey ? localStorage.getItem(entry.recoveryKey) : null
      if (pending) recovered = JSON.parse(pending) as { value: unknown; savedAt: string }
    } catch { /* ignore malformed recovery data */ }

    if (recovered && recoveryCopyWins(recovered.savedAt, remote.updatedAt)) {
      entry.queued = { serialized: JSON.stringify(recovered.value), value: recovered.value }
      entry.value = recovered.value
    } else {
      // The server is authoritative: drop the superseded recovery copy so it
      // cannot be replayed on a later load.
      if (recovered) {
        entry.queued = null
        dropRecoveryCopy(entry)
      }
      if (remote.value != null) {
        entry.lastWritten = JSON.stringify(remote.value)
        entry.value = remote.value
      }
    }

    entry.hydrated = true
    entry.hydrating = false
    entry.unauthorizedAttempts = 0
    entry.awaitingSession = false
    setStatus(entry, { hydrated: true, error: null, conflict: null })
    notify(entry)
    void flush(entry)
  }

  void attempt()
}

/**
 * Try again everything a missing session stopped.
 *
 * Called when identity resolves to authenticated — the arrival of a session is
 * the only event that can turn a 401 into an answer. Documents that were never
 * read are read now, and writes that were held rather than abandoned are sent.
 *
 * Documents refused for any other reason are left alone: a student who is not
 * an admin will be refused an admin-only document just as firmly after signing
 * in as before, and retrying it on every auth change is a request that can only
 * ever fail.
 */
export function retryAfterSignIn(): void {
  if (!API_MODE) return
  for (const entry of entries.values()) {
    if (!entry.awaitingSession) continue
    entry.awaitingSession = false
    entry.unauthorizedAttempts = 0
    setStatus(entry, { error: null })
    if (!entry.hydrated) hydrate(entry.key)
    else if (entry.queued) void flush(entry)
  }
}

/**
 * Force a document to be re-read from the server, for a write that reached it
 * through a dedicated endpoint rather than this store's own setter — content
 * report creation, for one, goes through `POST /api/content-reports` so a
 * student without the shared write path can still file one — and so left the
 * cache every reader of that key shares showing a stale copy.
 *
 * Reuses `flush`'s own "the document moved, re-read it" path (see the
 * `kind === 'conflict'` branch above): dropping `hydrated` and calling the
 * already-exported `hydrate` is exactly what that path does mid-write, so
 * this is safe even against a save still in flight — a queued local edit's
 * recovery copy is what `hydrate` consults to decide whether to keep it, not
 * this flag. A no-op for a key nobody has asked for yet, and in demo mode,
 * where there is no server copy to be behind.
 */
export function invalidateEntry(key: string): void {
  const entry = entries.get(key)
  if (!entry || !API_MODE) return
  entry.hydrated = false
  hydrate(key)
}

/**
 * Warm a document before anything renders that needs it — used to prefetch a
 * route's data while the student is still moving toward it.
 */
export function preloadState<T>(key: string, initial: T | (() => T)): void {
  ensureEntry(key, initial)
  hydrate(key)
}

if (typeof window !== 'undefined') {
  // Connectivity returning is the moment a queued write can finally land.
  window.addEventListener('online', flushAllPending)

  // One best-effort request per queued document on the way out. The local
  // recovery copy is kept until the server confirms, so nothing is lost if the
  // browser cuts this short.
  window.addEventListener('pagehide', () => {
    for (const entry of entries.values()) {
      if (!entry.queued) continue
      if (entry.debounceTimer != null) window.clearTimeout(entry.debounceTimer)
      if (!API_MODE) { commitLocal(entry); continue }
      void writeRemote(entry, entry.queued.value, true).catch(() => undefined)
    }
  })

  // A hidden tab may never fire pagehide on mobile, so this is the reliable
  // point at which to stop holding unsent work.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushAllPending()
  })

  // Demo mode: adopt cross-tab writes, so two open tabs agree.
  window.addEventListener('storage', (event) => {
    if (API_MODE || event.storageArea !== localStorage || event.key == null) return
    const entry = entries.get(event.key)
    if (!entry || event.newValue == null || event.newValue === entry.lastWritten) return
    try {
      entry.lastWritten = event.newValue
      entry.value = JSON.parse(event.newValue)
      notify(entry)
    } catch { /* ignore */ }
  })
}
