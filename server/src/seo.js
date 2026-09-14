import { SqlStore, robotsTxt, sitemapEntries, sitemapXml } from '@omary98/seo-runtime-core'
import { seoRuntime } from '@omary98/seo-runtime-express'
import { pool } from './db.js'
import { PUBLIC_ORIGIN } from './http.js'
import { SUPPORTED, articlePage, indexPage } from './seoArticles.js'

/** mysql2 returns [rows, fields]; a write returns a result header, which is not a row list. */
export function mysqlDriver(p) {
  return {
    dialect: 'mysql',
    async query(sql, params) {
      const [rows] = await p.query(sql, params)
      return Array.isArray(rows) ? rows : []
    },
  }
}

export const store = new SqlStore(mysqlDriver(pool))

// Nishany serves /blog/{lang}/{slug}, not the package default /{lang}/blog/{slug}. Shared by the
// `pages()` provider below and by the local sitemap fallback, so the two paths can't drift apart.
export const ARTICLE_PATH = (lang, slug) => `/blog/${lang}/${slug}`

const STATIC_PAGE_PATHS = ['/pricing', '/terms', '/privacy', '/refund-policy', '/contact', '/accessibility']

/**
 * The site's own list of public pages — what `/api/seo/pages` hands the hub, and (until the hub
 * has pushed a snapshot back via `/api/seo/sync`) also the source for the sitemap/robots fallback
 * below. `group` pairs each language's home/blog-index page with its siblings so the fallback
 * sitemap can list them as hreflang alternates of each other, same as the hub-managed one would.
 */
export function localPages() {
  const updatedAt = new Date().toISOString()
  return [
    ...SUPPORTED.map((lang) => ({ key: `page:home:${lang}`, type: 'page', lang, path: `/${lang}`, group: 'home', title: 'Nishany', updatedAt })),
    ...SUPPORTED.map((lang) => ({ key: `page:blog:${lang}`, type: 'page', lang, path: `/blog/${lang}`, group: 'blog-index', title: 'Blog', updatedAt })),
    ...STATIC_PAGE_PATHS.map((path) => ({ key: `page:${path}`, type: 'page', lang: 'en', path, title: path.slice(1), updatedAt })),
    // No article entries here: the articles live in the runtime's own store, so the package
    // appends them itself at `articlePath`. Listing them here as well is the duplicate.
  ]
}

// Single-domain site — /en and /ar are paths, not subdomains — so every language shares one origin.
export const FALLBACK_SETTINGS = { baseUrls: Object.fromEntries(SUPPORTED.map((lang) => [lang, PUBLIC_ORIGIN])), indexingEnabled: true, pageDefaults: {} }

/**
 * Bots that identify a genuine search/answer engine crawler get an explicit `Allow`; the
 * AI-training scrapers that ignore a bare `Disallow: /` under `User-agent: *` get their own block.
 * Appended to `robotsTxt`'s own output as `robotsExtra` rather than reimplemented, so the file
 * still gets the wildcard rule, the `Sitemap:` line and the indexing kill-switch for free.
 */
export const CRAWLER_POLICY_LINES = [
  ...['Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'GPTBot', 'ClaudeBot', 'Google-Extended']
    .flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /']),
  ...['CCBot', 'Bytespider', 'meta-externalagent', 'Amazonbot'].flatMap((bot) => [`User-agent: ${bot}`, 'Disallow: /']),
]

export function registerSeo(app) {
  /**
   * Fallback sitemap/robots, registered ahead of the runtime's own routes below.
   *
   * `/sitemap.xml` and `/robots.txt` are unauthenticated in the runtime package (CONTRACT.md), so
   * intercepting them here is safe — but only until the hub has actually synced: once
   * `getSnapshot()` shows pages or a crawler policy pushed from the hub, this steps aside with
   * `next()` and lets the runtime's hub-managed routes answer instead. Without this, a site whose
   * hub sync has never run (no `SEO_HUB_*` env yet, or the hub simply hasn't pushed) serves an
   * empty sitemap and a bare `Allow: /` robots.txt forever — which is exactly the state this was
   * found in.
   */
  app.get('/sitemap.xml', async (req, res, next) => {
    const snapshot = await store.getSnapshot().catch(() => null)
    if (snapshot?.pages?.length) return next()
    const pages = localPages().map((p) => ({ ...p, seo: { index: true, includeInSitemap: true } }))
    const articles = await store.listArticles().catch(() => [])
    res.type('application/xml').send(sitemapXml(sitemapEntries({ settings: FALLBACK_SETTINGS, pages }, articles, ARTICLE_PATH)))
  })
  app.get('/robots.txt', async (req, res, next) => {
    const snapshot = await store.getSnapshot().catch(() => null)
    if (snapshot?.settings?.robotsExtra?.length) return next()
    res.type('text/plain').send(robotsTxt({ settings: { ...FALLBACK_SETTINGS, robotsExtra: CRAWLER_POLICY_LINES } }))
  })

  seoRuntime({
    store,
    supported: SUPPORTED,
    articlePath: ARTICLE_PATH,
    pages: async () => localPages(),
  })(app)

  // The site's own blog renderer, unchanged, now reading the runtime's article table.
  app.get('/blog', (_req, res) => res.redirect(302, '/blog/en'))
  app.get('/blog/:lang', async (req, res, next) => {
    try {
      if (!SUPPORTED.includes(req.params.lang)) return res.status(404).type('text').send('Not found')
      const rows = await store.listArticles(req.params.lang)
      res.type('html').set('Cache-Control', 'public, max-age=300').send(indexPage(req.params.lang, rows.map(toLegacyRow), PUBLIC_ORIGIN))
    } catch (e) { next(e) }
  })
  app.get('/blog/:lang/:slug', async (req, res, next) => {
    try {
      if (!SUPPORTED.includes(req.params.lang)) return res.status(404).type('text').send('Not found')
      const rows = await store.listArticles()
      const row = rows.find((a) => a.lang === req.params.lang && a.slug === req.params.slug)
      if (!row) return res.status(404).type('html').send('<!doctype html><title>Not found</title><h1>404</h1>')
      const siblings = rows.filter((a) => a.externalId === row.externalId).map((a) => ({ lang: a.lang, slug: a.slug }))
      res.type('html').set('Cache-Control', 'public, max-age=300').send(articlePage(toLegacyRow(row), siblings, PUBLIC_ORIGIN))
    } catch (e) { next(e) }
  })
}

/**
 * articlePage/indexPage were written against the old snake_case row; map once rather than
 * rewriting them. og/references_json are pulled out of StoredArticle's `og`/`references` here —
 * omitting them would mean the Step-4 backfill's carried-over OG copy and reference list never
 * actually render, just silently fall back to the title/meta description with no references section.
 */
const toLegacyRow = (a) => ({
  lang: a.lang, slug: a.slug, title: a.title, meta_title: a.metaTitle, meta_description: a.metaDescription,
  body_html: a.bodyHtml, faq: a.faq, schema_jsonld: a.schemaJsonld, image_url: a.imageUrl, image_alt: a.imageAlt,
  author_name: a.authorName, author_credentials: a.authorCredentials, published_at: a.publishedAt, external_id: a.externalId,
  og_title: a.og?.title || null, og_description: a.og?.description || null, references_json: a.references ?? [],
})
