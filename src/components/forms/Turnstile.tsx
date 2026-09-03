import { useEffect, useId, useRef, type ReactElement } from 'react'
import { useTheme } from '@/lib/useTheme'

/**
 * Cloudflare Turnstile bot check.
 *
 * Renders nothing when `VITE_TURNSTILE_SITE_KEY` is unset — the server-side
 * half (`requireTurnstile` in server/src/turnstile.js) is the same kind of
 * no-op without `TURNSTILE_SECRET_KEY`, so an unconfigured deployment behaves
 * exactly as it did before Turnstile existed.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      remove: (widgetId: string) => void
    }
  }
}

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

// Loaded once per page, however many widgets are mounted.
let scriptPromise: Promise<void> | null = null
function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  scriptPromise ??= new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('turnstile script failed to load')))
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('turnstile script failed to load'))
    document.head.append(script)
  })
  return scriptPromise
}

export function Turnstile({ onToken }: { onToken: (token: string) => void }): ReactElement | null {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const { theme } = useTheme()
  const id = useId()

  useEffect(() => {
    if (!SITE_KEY || !containerRef.current) return
    let cancelled = false
    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return
        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          size: 'flexible',
          theme: theme === 'dark' || theme === 'oled' ? 'dark' : 'light',
          callback: onToken,
        })
      })
      .catch(() => { /* offline or blocked — the server-side check simply fails closed */ })
    return () => {
      cancelled = true
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current)
    }
    // Rebuilding the widget on every keystroke elsewhere in the form is not
    // wanted; it renders once per mount and reads the latest `onToken` via
    // the ref-stable callback identity React already gives closures here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!SITE_KEY) return null
  return <div ref={containerRef} id={`turnstile-${id}`} />
}
