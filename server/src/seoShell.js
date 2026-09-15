/**
 * Home-shell SEO override logic for the `/en`/`/ar` static shell route in `index.js`, split out
 * so it can be unit-tested on its own: `index.js` starts the DB migration and the HTTP server as
 * a side effect of being imported, so nothing in it can be exercised by importing the module
 * directly.
 */

/**
 * Raw hub title override, bypassing `composeSeo`'s templating. Unlike `description`,
 * `composeSeo`'s `title` is (almost) never empty: with no `seo.seoTitle` it templates
 * `page.title` (default `titleTemplate` is `%s`), and falls back further to `organization.name`
 * when the path isn't in the snapshot at all — `SeoStore.getPage`'s own doc comment is "the one
 * page lookup `resolveSeo` makes" (store.d.ts), i.e. the raw record `resolveSeo` itself reads
 * before composing. So `seo.title` can't be trusted as "is there really an override" — read the
 * page record directly and only take a real, trimmed `seoTitle`. Anything else (no page, no
 * override, a store failure) resolves to `null` so the caller keeps the shell's own baked-in title.
 */
export async function rawTitleOverride(store, path, lang) {
  try {
    const page = await store.getPage(path, lang)
    return page?.seo?.seoTitle?.trim() || null
  } catch {
    return null
  }
}

/** Pulls the shell's own baked-in `<title>` text and `<meta name="description">` content out of
 *  the static HTML, before `injectHead` strips both unconditionally. */
export function shellHead(html) {
  return {
    title: html.match(/<title>([\s\S]*?)<\/title>/i)?.[1],
    description: html.match(/<meta\b[^>]*\bname\s*=\s*"description"[^>]*>/i)?.[0]
      ?.match(/\bcontent\s*=\s*"([^"]*)"/i)?.[1],
  }
}

/**
 * The object actually passed to `injectHead`. Never feed `composeSeo`'s composed `title` through
 * as-is (see `rawTitleOverride` above for why) — only a real raw title override may replace the
 * shell's own baked-in title. `description` has no template fallback in `composeSeo`, so an empty
 * resolved description alone is enough to know there's no override.
 */
export function withShellFallback(seo, shell, rawTitle) {
  return {
    ...seo,
    title: rawTitle || shell.title || seo.title,
    description: seo.description ? seo.description : (shell.description ?? ''),
  }
}
