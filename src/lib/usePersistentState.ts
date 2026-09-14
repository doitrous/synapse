import { useInitialRead } from './initialReadContext'
import { useCallback, useEffect, useSyncExternalStore } from 'react'
import { API_MODE } from './api'
import {
  ensureEntry,
  getSnapshot,
  hydrate,
  subscribe,
  type PersistentStateStatus,
  type Updater,
} from './stateStore'

export type { PersistentStateStatus } from './stateStore'
export { preloadState } from './stateStore'

/** A deferred read never gates first paint — see the call site below. */
const DEFERRED_READ = { hydrated: true, error: null } as const

/**
 * Small persistence boundary. Two modes:
 *  - Demo (no VITE_API_BASE): backed by localStorage.
 *  - Live (VITE_API_BASE set): hydrated from and persisted to the backend
 *    (MariaDB) via /api/state/:key or /api/user-state/:key.
 *
 * The document itself lives in stateStore, shared by every caller of the same
 * key, so mounting a second reader costs nothing and leaving a surface does not
 * discard what it read. See that file for how reads, retries and the
 * crash-recovery copy are handled.
 */
export function usePersistentState<T>(
  key: string,
  initial: T | (() => T),
  // `defer` registers the document (so the snapshot is correct) but holds the
  // network hydrate until something calls `preloadState(key)`. Used when a large
  // document is only needed on demand — e.g. the concept graph, which the content
  // catalogue reads only once an editor opens, not to render the list.
  options?: { defer?: boolean },
) {
  const defer = options?.defer ?? false
  // Registering during render keeps the first snapshot correct: subscribing in
  // an effect would hand this render an entry that does not exist yet.
  ensureEntry(key, initial)

  const subscribeToKey = useCallback((onChange: () => void) => subscribe(key, onChange), [key])
  const read = useCallback(() => getSnapshot(key), [key])

  const snapshot = useSyncExternalStore(subscribeToKey, read, read)

  useEffect(() => {
    ensureEntry(key, initial)
    if (!defer) hydrate(key)
    // `initial` is intentionally not a dependency: it is frequently an inline
    // literal, and it is only ever read when a key is first seen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, defer])

  // A deferred document is by definition not part of first paint: it stays
  // unhydrated until something calls `preloadState(key)` (e.g. an editor opens),
  // so reporting its raw `hydrated: false` would gate the InitialReadBoundary
  // forever in live mode (demo mode seeds hydrated, which is why this only bit
  // production). Report it as satisfied; the on-demand consumer owns its own load.
  useInitialRead(defer ? DEFERRED_READ : snapshot[2])

  return snapshot as unknown as readonly [T, (next: Updater<T>) => void, PersistentStateStatus]
}

/**
 * Carry a demo-mode document over to a renamed key, once.
 *
 * Only localStorage needs this: the keys being renamed were unreachable in live
 * mode, so no student ever had one stored on the server.
 */
export function migrateLegacyLocalKey(oldKey: string, newKey: string): void {
  if (API_MODE || typeof window === 'undefined') return
  try {
    const legacy = localStorage.getItem(oldKey)
    if (legacy == null) return
    if (localStorage.getItem(newKey) == null) localStorage.setItem(newKey, legacy)
    localStorage.removeItem(oldKey)
  } catch { /* private browsing — the student simply starts fresh */ }
}
