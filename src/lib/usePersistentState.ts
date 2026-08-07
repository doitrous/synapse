import { useEffect, useRef, useState } from 'react'

/** Small local persistence boundary used by the prototype's writable flows. */
export function usePersistentState<T>(key: string, initial: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored != null) return JSON.parse(stored) as T
    } catch {
      // Private browsing and malformed old data should not make a surface unusable.
    }
    return typeof initial === 'function' ? (initial as () => T)() : initial
  })

  // Track the last JSON we wrote so the storage listener can skip our own writes.
  const lastWritten = useRef<string | null>(null)

  useEffect(() => {
    try {
      const serialized = JSON.stringify(value)
      lastWritten.current = serialized
      localStorage.setItem(key, serialized)
    } catch {
      // The UI remains functional for the current session when storage is unavailable.
    }
  }, [key, value])

  // Live push: when another tab (e.g. the admin console) writes the same key,
  // the browser fires a `storage` event here and we adopt the new value.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key || event.storageArea !== localStorage) return
      if (event.newValue == null || event.newValue === lastWritten.current) return
      try {
        lastWritten.current = event.newValue
        setValue(JSON.parse(event.newValue) as T)
      } catch {
        // Ignore malformed cross-tab payloads.
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  return [value, setValue] as const
}
