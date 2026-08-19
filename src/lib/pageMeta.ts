import { useEffect } from 'react'

/**
 * Page-level head tags for a client-rendered route.
 *
 * `index.html` carries the head for the site as a whole, which is the right
 * default for a single-page app and the wrong one for a page that has its own
 * search intent. Somebody searching "Synapse pricing" should land on a result
 * whose title and snippet are about pricing, and an answer engine asked "does
 * Synapse refund?" should find the answer as structured data rather than infer
 * it from a paragraph.
 *
 * Everything set here is reverted on unmount, so navigating away restores the
 * document-level head instead of leaving one route's title on another's page.
 *
 * Known limit: this runs in JavaScript. Crawlers that execute JS (Google,
 * Bing, and the major answer engines) see it; a plain curl does not. Making
 * these tags visible without JS needs prerendering at build time — see
 * `docs/pricing-page.md`.
 */

export const SITE_ORIGIN = 'https://synapse.doitrous.com'

export interface PageMeta {
  title: string
  description: string
  /** Path only, e.g. `/pricing`. Resolved against SITE_ORIGIN. */
  canonical?: string
  /** `hreflang` → path, for the same page in the other language. */
  alternates?: Record<string, string>
  /** JSON-LD objects injected as `application/ld+json`. */
  jsonLd?: unknown[]
}

/** Set an element's attribute, remembering whether we were the ones who made it. */
function upsert(selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void): () => void {
  const existing = document.head.querySelector<HTMLElement>(selector)
  if (existing) {
    const before = existing.cloneNode(true) as HTMLElement
    apply(existing)
    return () => existing.replaceWith(before)
  }
  const created = create()
  apply(created)
  document.head.append(created)
  return () => created.remove()
}

export function usePageMeta({ title, description, canonical, alternates, jsonLd }: PageMeta): void {
  // Serialised so the effect re-runs on content change rather than on every
  // render — the objects here are literals rebuilt by their parent each time.
  const key = JSON.stringify({ title, description, canonical, alternates, jsonLd })

  useEffect(() => {
    const undo: (() => void)[] = []

    const previousTitle = document.title
    document.title = title
    undo.push(() => { document.title = previousTitle })

    undo.push(upsert(
      'meta[name="description"]',
      () => document.createElement('meta'),
      (el) => { el.setAttribute('name', 'description'); el.setAttribute('content', description) },
    ))

    // Open Graph title and description travel with the link when it is shared,
    // so a pricing link pasted into a chat should preview as pricing.
    undo.push(upsert(
      'meta[property="og:title"]',
      () => document.createElement('meta'),
      (el) => { el.setAttribute('property', 'og:title'); el.setAttribute('content', title) },
    ))
    undo.push(upsert(
      'meta[property="og:description"]',
      () => document.createElement('meta'),
      (el) => { el.setAttribute('property', 'og:description'); el.setAttribute('content', description) },
    ))

    if (canonical) {
      const href = `${SITE_ORIGIN}${canonical}`
      undo.push(upsert(
        'link[rel="canonical"]',
        () => document.createElement('link'),
        (el) => { el.setAttribute('rel', 'canonical'); el.setAttribute('href', href) },
      ))
      undo.push(upsert(
        'meta[property="og:url"]',
        () => document.createElement('meta'),
        (el) => { el.setAttribute('property', 'og:url'); el.setAttribute('content', href) },
      ))
    }

    // The document-level alternates point at the home pages. A sub-page needs
    // its own set, or the Arabic pricing page is advertised as the Arabic home
    // page and the two compete for the same query.
    if (alternates) {
      const previous = [...document.head.querySelectorAll('link[rel="alternate"][hreflang]')]
      previous.forEach((el) => el.remove())
      const added = Object.entries(alternates).map(([hreflang, path]) => {
        const el = document.createElement('link')
        el.setAttribute('rel', 'alternate')
        el.setAttribute('hreflang', hreflang)
        el.setAttribute('href', `${SITE_ORIGIN}${path}`)
        document.head.append(el)
        return el
      })
      undo.push(() => {
        added.forEach((el) => el.remove())
        previous.forEach((el) => document.head.append(el))
      })
    }

    if (jsonLd?.length) {
      const added = jsonLd.map((block) => {
        const el = document.createElement('script')
        el.type = 'application/ld+json'
        el.dataset.pageMeta = 'true'
        el.textContent = JSON.stringify(block)
        document.head.append(el)
        return el
      })
      undo.push(() => added.forEach((el) => el.remove()))
    }

    return () => undo.reverse().forEach((fn) => fn())
    // `key` is the serialised form of every dependency below it. Listing them
    // individually would re-run this on each render, because the caller builds
    // `alternates` and `jsonLd` as fresh literals every time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}
