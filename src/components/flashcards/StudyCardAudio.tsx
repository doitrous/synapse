import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useT } from '@/lib/i18n'
import { resolveMediaSource } from '@/lib/mediaStorage'

/** Imperative controls the study shortcuts (R / P) drive. */
export interface CardAudioHandle {
  /** Restart from the beginning and play. */
  replay: () => void
  /** Pause if playing, resume if paused. */
  toggle: () => void
}

/**
 * The audio attached to a card, played during study.
 *
 * The blob lives in `mediaStorage`; we resolve it to a short-lived object URL
 * and revoke it when the card turns or the component unmounts (the same pattern
 * the occlusion renderer uses). A visible `<audio controls>` keeps it usable
 * with a mouse, while `replay`/`toggle` let the keyboard shortcuts drive it.
 */
export const StudyCardAudio = forwardRef<CardAudioHandle, { src: string; autoPlay?: boolean }>(
  function StudyCardAudio({ src, autoPlay = false }, ref) {
    const t = useT()
    const audioRef = useRef<HTMLAudioElement>(null)
    const [url, setUrl] = useState<string | null>(null)
    const [failed, setFailed] = useState(false)

    useEffect(() => {
      let alive = true
      let revokeUrl: string | null = null
      setUrl(null)
      setFailed(false)
      resolveMediaSource(src)
        .then(({ url, revoke }) => {
          if (!alive) { if (revoke) URL.revokeObjectURL(url); return }
          if (revoke) revokeUrl = url
          setUrl(url)
        })
        .catch(() => { if (alive) setFailed(true) })
      return () => { alive = false; if (revokeUrl) URL.revokeObjectURL(revokeUrl) }
    }, [src])

    useImperativeHandle(ref, () => ({
      replay() {
        const el = audioRef.current
        if (!el) return
        el.currentTime = 0
        void el.play().catch(() => undefined)
      },
      toggle() {
        const el = audioRef.current
        if (!el) return
        if (el.paused) void el.play().catch(() => undefined)
        else el.pause()
      },
    }), [])

    if (failed) {
      return <p className="mt-3 text-center text-[12px] text-danger" role="status">{t('The audio for this card could not be loaded.')}</p>
    }
    if (!url) return null
    return (
      <div className="mt-4 flex justify-center">
        <audio
          ref={audioRef}
          src={url}
          controls
          preload="metadata"
          autoPlay={autoPlay}
          className="h-9 w-full max-w-sm"
          aria-label={t('Card audio')}
          onError={() => setFailed(true)}
        />
      </div>
    )
  },
)
