/**
 * Home-shell SEO override logic for the `/en`/`/ar` static shell route in `index.js`, split out
 * so it can be unit-tested on its own: `index.js` starts the DB migration and the HTTP server as
 * a side effect of being imported, so nothing in it can be exercised by importing the module
 * directly.
 */
import { shareBlockHtml } from '@omary98/seo-runtime-core'

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

/**
 * The site's real home → category → item hierarchy (04-supporting-pages.md's "Courses" row),
 * limited to routes that actually exist and always resolve — `/blog/{lang}` is the category-level
 * index, `/{lang}` and `/pricing` the trunk and the product/plan page. No per-article link: blog
 * posts are hub-synced (seoArticles.js) and may not exist yet, so a hardcoded slug here could 404.
 * Shown on both the `/en` and `/ar` shells (see `footerExtrasHtml`) rather than split per language,
 * since splitting would drop below the 6-link floor 01-site-setup.md §3 asks for.
 */
const POPULAR_SEARCHES = [
  ['/en', 'Medical exam prep platform for Egyptian medical students'],
  ['/blog/en', 'Clinical study guides and exam-prep articles'],
  ['/pricing', 'Nishany study plans and pricing'],
  ['/ar', 'منصة التحضير لامتحانات كليات الطب المصرية'],
  ['/blog/ar', 'أدلة المذاكرة السريرية ومقالات التحضير للامتحانات'],
  ['/ar/pricing', 'خطط واشتراكات نيشاني'],
]

/** Footer's "Popular searches" block plus the Help center / Editorial guidelines trust-page
 *  links (10-internal-linking-menu-footer.md), rendered as plain anchors — no client router
 *  needed to see real href text. Static content, so no escaping is needed. */
export function footerExtrasHtml(lang) {
  const t = lang === 'ar'
    ? { popular: 'عمليات بحث شائعة', help: 'مركز المساعدة', editorial: 'المبادئ التحريرية' }
    : { popular: 'Popular searches', help: 'Help center', editorial: 'Editorial guidelines' }
  const items = POPULAR_SEARCHES.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')
  return `<footer><nav aria-label="${t.popular}"><h2>${t.popular}</h2><ul>${items}</ul></nav>`
    + `<p><a href="/help">${t.help}</a> · <a href="/editorial-guidelines">${t.editorial}</a></p></footer>`
}

/**
 * The share block (01-site-setup.md §5) plus the footer extras above, as one string ready to
 * splice into the shell's prerendered body via `injectBodyExtras`. `seo` is the same resolved
 * object handed to `injectHead` (see index.js), so the share links always target the page's own
 * canonical URL and title, not the shell's static baked-in copy.
 */
export function shellBodyExtras(seo, lang) {
  return `<div>${shareBlockHtml({ url: seo.canonical, title: seo.title })}</div>${footerExtrasHtml(lang)}`
}

/**
 * Splices `extraHtml` into the shell's prerendered body, right after `<main>...</main>` and before
 * the closing `</div>` of `#root`. Everything inside `#root` is replaced the instant
 * `createRoot(...).render()` runs (see the comment above `#root` in en/index.html and
 * ar/index.html) — a crawler or `curl` is the only reader that ever sees it, exactly like the
 * prerendered marketing copy already there. A shell missing the expected `</main></div>` pair is
 * returned unchanged rather than silently dropping the extras into the wrong place.
 */
export function injectBodyExtras(html, extraHtml) {
  return /<\/main>\s*<\/div>/.test(html) ? html.replace(/<\/main>(\s*)<\/div>/, `</main>$1${extraHtml}</div>`) : html
}
