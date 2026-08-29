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
 *
 * `dangerouslySetInnerHTML` diffs its `__html` string as one opaque value: any
 * edit anywhere in the field (e.g. `AddView`'s live preview, which re-renders
 * on every keystroke) changes that whole string, so the DOM is rebuilt and
 * every `<img>` reappears showing its raw, unresolved reference — even when
 * the image itself didn't change. A resolve-cache (keyed by reference, kept
 * across renders in `mediaCacheRef`) means a reference already resolved is
 * reapplied to the freshly-rebuilt node instantly and synchronously; only a
 * reference seen for the first time pays for an actual `resolveMediaSource`
 * call. `mediaPendingRef` also prevents two overlapping renders (e.g. two
 * keystrokes before the first fetch lands) from starting a duplicate fetch —
 * and therefore leaking a duplicate object URL — for the same reference.
 */
export function RichHtml({ html, className }: { html: string; className?: string }) {
  const safe = useMemo(() => sanitizeRich(html), [html])
  const containerRef = useRef<HTMLDivElement>(null)
  const mediaCacheRef = useRef(new Map<string, { url: string; revoke: boolean }>())
  const mediaPendingRef = useRef(new Set<string>())

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const cache = mediaCacheRef.current
    const pending = mediaPendingRef.current
    const liveRefs = new Set<string>()

    container.querySelectorAll<HTMLImageElement>(MEDIA_IMG_SELECTOR).forEach((img) => {
      const reference = img.getAttribute('src')
      if (!reference) return
      liveRefs.add(reference)

      const cached = cache.get(reference)
      if (cached) { img.setAttribute('src', cached.url); return }
      if (pending.has(reference)) return // already resolving; its own .then reapplies below

      pending.add(reference)
      resolveMediaSource(reference)
        .then((resolved) => {
          // The DOM may have been rebuilt again since this fetch started (a
          // later edit, unrelated to this image) — re-query for whichever
          // node currently shows this reference rather than the possibly
          // stale/detached node captured above.
          if (!containerRef.current) { if (resolved.revoke) URL.revokeObjectURL(resolved.url); return }
          cache.set(reference, resolved)
          containerRef.current.querySelectorAll<HTMLImageElement>(MEDIA_IMG_SELECTOR).forEach((node) => {
            if (node.getAttribute('src') === reference) node.setAttribute('src', resolved.url)
          })
        })
        .catch(() => { /* leave the reference src; the browser shows a broken image */ })
        .finally(() => { pending.delete(reference) })
    })

    // A reference no longer present in this field's sanitized HTML (the image
    // was removed) is dropped from the cache and its object URL released,
    // rather than held for the life of the component.
    for (const [reference, resolved] of cache) {
      if (liveRefs.has(reference)) continue
      if (resolved.revoke) URL.revokeObjectURL(resolved.url)
      cache.delete(reference)
    }
  }, [safe])

  // Release everything still cached when this instance goes away for good —
  // the per-render effect above only prunes references no longer in use, it
  // never tears the whole cache down (that would revoke URLs still on screen).
  useEffect(() => {
    const cache = mediaCacheRef.current
    return () => {
      for (const resolved of cache.values()) {
        if (resolved.revoke) URL.revokeObjectURL(resolved.url)
      }
      cache.clear()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('fc-rich leading-relaxed', className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  )
}
