import { useCallback, useEffect, useState } from 'react'

function isFullscreenActive(): boolean {
  if (typeof document === 'undefined') return false
  return document.fullscreenElement != null
}

/**
 * Tracks and toggles browser fullscreen for the whole document, using the
 * standard Fullscreen API (equivalent to pressing F11). SSR-safe: every
 * `document` access is guarded, so this is inert on the server.
 */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(isFullscreenActive)

  useEffect(() => {
    if (typeof document === 'undefined') return
    function onChange() {
      setIsFullscreen(isFullscreenActive())
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggle = useCallback(() => {
    if (typeof document === 'undefined') return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void document.documentElement.requestFullscreen()
    }
  }, [])

  return { isFullscreen, toggle }
}
