import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

/**
 * Light, Warm and Dark.
 *
 * Deliberately backed by plain localStorage rather than `usePersistentState`:
 * that hook round-trips to the server and hydrates asynchronously, so the app
 * would paint in the wrong theme and then correct itself on every load. The
 * preference is also read by an inline script in the HTML head before React
 * exists — see THEME_BOOT_SCRIPT — which is what makes the first paint correct.
 */

export const THEMES = ['light', 'warm', 'dark'] as const
export type Theme = (typeof THEMES)[number]

/**
 * The storage key still reads `synapse-`: it is the address of a preference
 * every existing reader already has on disk, not a piece of branding. Renaming
 * it at the rebrand would silently reset everyone's chosen appearance.
 */
export const THEME_STORAGE_KEY = 'synapse-theme'

/** Light is the reference ground the Maristana palette is built around. */
const DEFAULT_THEME: Theme = 'light'

/** The address bar / task switcher colour, so browser chrome matches the page. */
const THEME_COLOR: Record<Theme, string> = {
  light: '#f5f7fb',
  warm: '#f7f2ea',
  dark: '#0d1117',
}

function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && (THEMES as readonly string[]).includes(value)
}

function storedTheme(): Theme {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    if (isTheme(raw)) return raw
  } catch {
    // Private browsing: the app still works, it just cannot remember.
  }
  return DEFAULT_THEME
}

/**
 * Applied by both the boot script and the provider, so there is exactly one
 * description of what "being in a theme" means to the document.
 */
function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
}

interface ThemeApi {
  theme: Theme
  setTheme: (next: Theme) => void
}

const ThemeContext = createContext<ThemeApi>({ theme: DEFAULT_THEME, setTheme: () => undefined })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(storedTheme)

  // The boot script has already stamped the attribute; this keeps it true after
  // a change, and repairs the case where storage was unreadable at boot.
  useEffect(() => { applyTheme(theme) }, [theme])

  // A second tab is the same person. Follow their choice rather than fighting it.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY && isTheme(event.newValue)) setThemeState(event.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try { localStorage.setItem(THEME_STORAGE_KEY, next) } catch { /* nothing to remember with */ }
  }, [])

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeApi {
  return useContext(ThemeContext)
}
