import { useEffect, useRef, useState } from 'react'
import { API_MODE, getState, putState } from './api'

/**
 * Small persistence boundary. Two modes:
 *  - Demo (no VITE_API_BASE): backed by localStorage, seeded from demo data.
 *  - Live (VITE_API_BASE set): hydrated from and persisted to the backend
 *    (MariaDB) via /api/state/:key; localStorage is not used.
 */
export function usePersistentState<T>(key: string, initial: T | (() => T)) {
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

  // Live mode: hydrate from the backend once on mount.
  useEffect(() => {
    if (!API_MODE) return
    let cancelled = false
    getState<T>(key).then((remote) => {
      if (cancelled) return
      if (remote != null) { lastWritten.current = JSON.stringify(remote); setValue(remote) }
      hydrated.current = true
    })
    return () => { cancelled = true }
  }, [key])

  // Persist changes.
  useEffect(() => {
    let serialized: string
    try { serialized = JSON.stringify(value) } catch { return }
    if (serialized === lastWritten.current) return
    if (API_MODE) {
      if (!hydrated.current) return // don't overwrite the server with the pre-hydration empty value
      lastWritten.current = serialized
      void putState(key, value)
    } else {
      try { lastWritten.current = serialized; localStorage.setItem(key, serialized) } catch { /* ignore */ }
    }
  }, [key, value])

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
