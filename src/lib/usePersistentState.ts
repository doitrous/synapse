import { useCallback, useEffect, useRef, useState } from 'react'
import { API_MODE, getState, getUserState, putState, putUserState } from './api'
import { isUserOwnedState } from './stateOwnership'

/**
 * Small persistence boundary. Two modes:
 *  - Demo (no VITE_API_BASE): backed by localStorage, seeded from demo data.
 *  - Live (VITE_API_BASE set): hydrated from and persisted to the backend
 *    (MariaDB) via /api/state/:key; localStorage is not used.
 */
export function usePersistentState<T>(key: string, initial: T | (() => T)) {
  const userOwned = isUserOwnedState(key)
  const recoveryKey = `synapse.pending.v1:${userOwned ? 'user' : 'shared'}:${key}`
  const [value, setValue] = useState<T>(() => {
    if (!API_MODE) {
      try {
        const stored = localStorage.getItem(key)
        if (stored != null) return JSON.parse(stored) as T
      } catch {
        // Private browsing / malformed data should not break a surface.
      }
    }
    return typeof initial === 'function' ? (initial as () => T)() : initial
  })

  const lastWritten = useRef<string | null>(null)
  const hydrated = useRef(!API_MODE) // in demo mode we are "hydrated" immediately
  const queued = useRef<{ serialized: string; value: T } | null>(null)
  const writing = useRef(false)
  const retryTimer = useRef<number | null>(null)
  const flushRef = useRef<() => Promise<void>>(async () => undefined)

  const writeRemote = useCallback((next: T, keepalive = false) => userOwned
    ? putUserState(key, next, keepalive)
    : putState(key, next), [key, userOwned])

  flushRef.current = async () => {
    if (!API_MODE || writing.current || !hydrated.current) return
    writing.current = true
    try {
      while (queued.current) {
        const pending = queued.current
        try {
          await writeRemote(pending.value)
        } catch {
          if (retryTimer.current == null) {
            retryTimer.current = window.setTimeout(() => {
              retryTimer.current = null
              void flushRef.current()
            }, 2_000)
          }
          break
        }
        lastWritten.current = pending.serialized
        if (queued.current?.serialized === pending.serialized) {
          queued.current = null
          try { localStorage.removeItem(recoveryKey) } catch { /* ignore */ }
        }
      }
    } finally {
      writing.current = false
    }
  }

  // Live mode: hydrate from the backend once on mount.
  useEffect(() => {
    if (!API_MODE) return
    let cancelled = false
    const readRemote = userOwned ? getUserState<T>(key) : getState<T>(key)
    readRemote.then((remote) => {
      if (cancelled) return
      let recovered: { value: T; savedAt: string } | null = null
      try {
        const pending = localStorage.getItem(recoveryKey)
        if (pending) recovered = JSON.parse(pending) as { value: T; savedAt: string }
      } catch { /* ignore malformed recovery data */ }

      if (recovered) {
        const serialized = JSON.stringify(recovered.value)
        queued.current = { serialized, value: recovered.value }
        setValue(recovered.value)
      } else if (remote != null) {
        lastWritten.current = JSON.stringify(remote)
        setValue(remote)
      }
      hydrated.current = true
      void flushRef.current()
    })
    return () => { cancelled = true }
  }, [key, recoveryKey, userOwned, writeRemote])

  // Persist changes.
  useEffect(() => {
    let serialized: string
    try { serialized = JSON.stringify(value) } catch { return }
    if (serialized === lastWritten.current) return
    if (API_MODE) {
      if (!hydrated.current) return // don't overwrite the server with the pre-hydration empty value
      queued.current = { serialized, value }
      try {
        localStorage.setItem(recoveryKey, JSON.stringify({ value, savedAt: new Date().toISOString() }))
      } catch { /* the remote queue still continues */ }
      void flushRef.current()
    } else {
      try { lastWritten.current = serialized; localStorage.setItem(key, serialized) } catch { /* ignore */ }
    }
  }, [key, recoveryKey, value])

  // Recover failed writes when connectivity returns. During page exit the
  // browser gets one best-effort keepalive request; the local recovery copy is
  // retained until the server confirms it.
  useEffect(() => {
    if (!API_MODE) return
    const online = () => void flushRef.current()
    const pagehide = () => {
      const pending = queued.current
      if (pending) void writeRemote(pending.value, true)
    }
    window.addEventListener('online', online)
    window.addEventListener('pagehide', pagehide)
    return () => {
      window.removeEventListener('online', online)
      window.removeEventListener('pagehide', pagehide)
      if (retryTimer.current != null) window.clearTimeout(retryTimer.current)
    }
  }, [key, userOwned, writeRemote])

  // Demo mode: adopt cross-tab writes via the storage event (live push).
  useEffect(() => {
    if (API_MODE) return
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key || event.storageArea !== localStorage) return
      if (event.newValue == null || event.newValue === lastWritten.current) return
      try { lastWritten.current = event.newValue; setValue(JSON.parse(event.newValue) as T) } catch { /* ignore */ }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  return [value, setValue] as const
}
