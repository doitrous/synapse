import { API_MODE, errorKind, getState, getUserState, isRetryable, putState, putUserState, stateOwnerId, type StateErrorKind } from './api'
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
    status: { hydrated: !API_MODE, error: null, pending: false },
    setter: (next) => setEntryValue(key, next),
    snapshot: [undefined, () => undefined, { hydrated: false, error: null, pending: false }],
    subscribers: new Set(),
    hydrated: !API_MODE,
    hydrating: false,
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
    recoveryKey: isUserOwnedState(key) ? null : `synapse.pending.v1:shared:${key}`,
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

function writeRemote(entry: Entry, value: unknown, keepalive = false): Promise<unknown> {
  return entry.userOwned ? putUserState(entry.key, value, keepalive) : putState(entry.key, value)
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
      entry.recoveryKey = ownerId ? `synapse.pending.v2:user:${ownerId}:${entry.key}` : null
      // The former unscoped recovery key is deliberately retired so data from
      // one account can never be adopted by another account.
      try { localStorage.removeItem(`synapse.pending.v1:user:${entry.key}`) } catch { /* ignore */ }
    }

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
    setStatus(entry, { hydrated: true, error: null })
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
