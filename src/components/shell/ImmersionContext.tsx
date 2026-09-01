import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

/**
 * A surface asking for the chrome to get out of the way, for as long as it is
 * running.
 *
 * Deliberately not the stored `nishany.shell.sidebarCollapsed` preference: that
 * belongs to the student, and sitting one test should not quietly change how
 * their app looks afterwards. This is a request that lasts as long as the
 * surface making it, and the preference is what the shell falls back to the
 * moment it stops.
 *
 * A context rather than a route check because a running test is a phase inside
 * the Question Bank route, not a route of its own.
 */
interface Immersion {
  immersive: boolean
  setImmersive: (on: boolean) => void
}

const ImmersionCtx = createContext<Immersion>({ immersive: false, setImmersive: () => undefined })

export function ImmersionProvider({ children }: { children: ReactNode }) {
  const [immersive, setImmersive] = useState(false)
  const value = useMemo(() => ({ immersive, setImmersive }), [immersive])
  return <ImmersionCtx.Provider value={value}>{children}</ImmersionCtx.Provider>
}

export function useImmersion(): Immersion {
  return useContext(ImmersionCtx)
}
