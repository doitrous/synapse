import { useEffect, useState } from 'react'

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

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // The UI remains functional for the current session when storage is unavailable.
    }
  }, [key, value])

  return [value, setValue] as const
}
