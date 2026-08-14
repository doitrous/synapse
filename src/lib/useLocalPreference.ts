import { useCallback, useEffect, useState } from 'react'

/**
 * A small preference that belongs to this device, not to the account.
 *
 * Sidebar collapse and focus mode are about the screen someone is sitting at —
 * a wide monitor and a laptop want different answers — so they are deliberately
 * not `usePersistentState`, which would sync them to the server, share them
 * across devices, and hydrate asynchronously (the chrome would visibly settle
 * after paint). Same reasoning as the theme.
 */
export function useLocalPreference(key: string, fallback: boolean) {
  const [value, setValue] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw === 'true') return true
      if (raw === 'false') return false
    } catch { /* private browsing — the default stands */ }
    return fallback
  })

  useEffect(() => {
    try { localStorage.setItem(key, String(value)) } catch { /* nothing to remember with */ }
  }, [key, value])

  const toggle = useCallback(() => setValue((current) => !current), [])
  return [value, setValue, toggle] as const
}
