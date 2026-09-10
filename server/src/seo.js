import { SqlStore } from '@omary98/seo-runtime-core'
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

export function registerSeo(app) {
  seoRuntime({
    store,
    supported: SUPPORTED,
    version: '0.1.0',
    // Nishany serves /blog/{lang}/{slug}, not the package default /{lang}/blog/{slug}.
    // With this set, the package lists each article ONCE, at the real path — the `pages` callback
    // below must therefore NOT list them again, or the hub registry gets every article twice,
    // one of the two at a 404.
    articlePath: (lang, slug) => `/blog/${lang}/${slug}`,
    pages: async () => {
      return [
        ...SUPPORTED.map((lang) => ({ key: `page:home:${lang}`, type: 'page', lang, path: `/${lang}`, title: 'Nishany', updatedAt: new Date().toISOString() })),
        ...SUPPORTED.map((lang) => ({ key: `page:blog:${lang}`, type: 'page', lang, path: `/blog/${lang}`, title: 'Blog', updatedAt: new Date().toISOString() })),
        ...['/pricing', '/terms', '/privacy', '/refund-policy', '/contact', '/accessibility']
          .map((path) => ({ key: `page:${path}`, type: 'page', lang: 'en', path, title: path.slice(1), updatedAt: new Date().toISOString() })),
        // No article entries here: the articles live in the runtime's own store, so the package
        // appends them itself at `articlePath`. Listing them here as well is the duplicate.
      ]
    },
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
