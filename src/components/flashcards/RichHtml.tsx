import { useEffect, useMemo, useRef } from 'react'
import { cn } from '@/lib/cn'
import { sanitizeRich } from '@/data/flashcards/richText'
import { resolveMediaSource } from '@/lib/mediaStorage'

/** `<img>` tags `sanitizeRich` kept — their `src` is a reference, not a URL yet. */
const MEDIA_IMG_SELECTOR = 'img[src^="synapse-"], img[src^="/media/"]'

/**
 * Render a stored rich-text field.
 *
 * Fields are sanitized on the way *in* (`sanitizeRich` in the authoring path),
 * but this re-sanitizes on the way *out* too — defence in depth, so a field that
 * somehow reached storage unsanitized (an old import, a hand-edited document)
 * still cannot inject anything when it is shown. Only after that pass is the
 * result handed to `dangerouslySetInnerHTML`, and by then it is a string built
 * from a fixed allowlist of tags and attributes, nothing executable.
 *
 * Any surviving `<img>` carries a *reference* (`synapse-media:…`, `/media/…`,
 * `synapse-doc:…`), never a browser-loadable URL, so after the sanitized markup
 * lands in the DOM each such image is resolved through `resolveMediaSource` —
 * the same resolve-then-revoke pattern as `OcclusionCardFace` — and its `src`
 * swapped for the short-lived object URL, revoked again on unmount or update.
 */
export function RichHtml({ html, className }: { html: string; className?: string }) {
  const safe = useMemo(() => sanitizeRich(html), [html])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let alive = true
    const revokeUrls: string[] = []
    const images = container.querySelectorAll<HTMLImageElement>(MEDIA_IMG_SELECTOR)
    images.forEach((img) => {
      const reference = img.getAttribute('src')
      if (!reference) return
      resolveMediaSource(reference)
        .then(({ url, revoke }) => {
          if (!alive) { if (revoke) URL.revokeObjectURL(url); return }
          if (revoke) revokeUrls.push(url)
          img.setAttribute('src', url)
        })
        .catch(() => { /* leave the reference src; the browser shows a broken image */ })
    })
    return () => { alive = false; revokeUrls.forEach((url) => URL.revokeObjectURL(url)) }
  }, [safe])

  return (
    <div
      ref={containerRef}
      className={cn('fc-rich leading-relaxed', className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  )
}
