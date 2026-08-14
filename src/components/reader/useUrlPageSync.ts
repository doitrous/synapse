import { useEffect, useRef } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

/**
 * The address bar follows the reader. It must never push back.
 *
 * The loop this replaces: scrolling set the current page, the current page was
 * written into `?page=`, the new `?page=` was read back as a request to
 * navigate, and that navigation scrolled the document — which set the current
 * page again. Two guards, both needed:
 *
 * 1. **Echo guard.** The writer records what it wrote. A `?page=` equal to that
 *    is our own value coming back and is ignored. A different one is a genuine
 *    arrival — a citation, a shared link, the browser's back button — and is
 *    honoured.
 * 2. **Intent, not state.** The incoming page is read once per navigation, from
 *    `location.key`, rather than being recomputed on every render. The old code
 *    derived it inline, so every render looked like a fresh request.
 */

const IDLE_MS = 250

export interface UrlPageSync {
  /** A page to jump to, or null. Cleared by `consume`. */
  pending: () => number | null
  consume: () => void
  /** Record where the reader is, to be written when scrolling settles. */
  report: (page: number) => void
}

export function useUrlPageSync(enabled: boolean): UrlPageSync {
  const [params, setParams] = useSearchParams()
  const location = useLocation()

  const lastWritten = useRef<number | null>(null)
  const pendingPage = useRef<number | null>(null)
  const lastKey = useRef<string | null>(null)
  const reported = useRef<number | null>(null)
  const timer = useRef(0)

  // A navigation — including the first render — offers its page exactly once.
  if (lastKey.current !== location.key) {
    lastKey.current = location.key
    const asked = Number(params.get('page'))
    pendingPage.current = Number.isFinite(asked) && asked > 0 && asked !== lastWritten.current ? asked : null
  }

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current) }, [])

  const report = (page: number) => {
    if (!enabled) return
    reported.current = page
    if (timer.current) window.clearTimeout(timer.current)
    // Written once the reader stops, not once per scroll event: a flick used to
    // produce a URL write for every intermediate page.
    timer.current = window.setTimeout(() => {
      const next = reported.current
      if (next === null || Number(params.get('page')) === next) return
      lastWritten.current = next
      const search = new URLSearchParams(params)
      search.set('page', String(next))
      setParams(search, { replace: true })
    }, IDLE_MS)
  }

  return {
    pending: () => pendingPage.current,
    consume: () => { pendingPage.current = null },
    report,
  }
}
