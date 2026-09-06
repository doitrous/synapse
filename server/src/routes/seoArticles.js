import { timingSafeEqual } from 'node:crypto'
import { pool } from '../db.js'
import { PUBLIC_ORIGIN } from '../http.js'
import { SUPPORTED, articlePage, indexPage, sitemapXml, toRows, validatePayload } from '../seoArticles.js'

function authorized(req) {
  const secret = process.env.SEO_HUB_SECRET || ''
  if (!secret) return false
  const given = (req.header('authorization') || '').replace(/^Bearer\s+/i, '')
  // Compare Buffer byte lengths, not the JS string .length — a mismatch in
  // multi-byte characters can make the two differ, and timingSafeEqual
  // throws (rather than returning false) when its two buffers aren't the
  // same byte length.
  const givenBuf = Buffer.from(given)
  const secretBuf = Buffer.from(secret)
  return givenBuf.length === secretBuf.length && timingSafeEqual(givenBuf, secretBuf)
}
const parseRow = (r) => ({ ...r, faq: typeof r.faq === 'string' ? JSON.parse(r.faq) : r.faq ?? [], schema_jsonld: typeof r.schema_jsonld === 'string' ? JSON.parse(r.schema_jsonld) : r.schema_jsonld ?? [] })

export function registerSeoArticleRoutes(app) {
  app.post('/api/articles', async (req, res, next) => {
    try {
      if (!authorized(req)) return res.status(401).json({ error: 'unauthorized' })
      const v = validatePayload(req.body)
      if (v.error) return res.status(400).json({ error: v.error })
      const { skipped, rows } = toRows(v.payload)
      if (!rows.length) return res.status(400).json({ error: 'no supported languages' })
      const results = []
      const conn = await pool.getConnection()
      try {
        await conn.beginTransaction()
        for (const r of rows) {
          // ON DUPLICATE KEY UPDATE matches on EITHER unique key — a slug
          // collision with a different job's external_id would silently
          // overwrite that other job's row instead of failing. Look the row
          // up by (external_id, lang) ourselves and update by id, so the
          // only way a write touches another job's row is the (lang, slug)
          // key rejecting the INSERT outright.
          const [[existing]] = await conn.query('SELECT id FROM seo_articles WHERE external_id=? AND lang=? FOR UPDATE', [r.external_id, r.lang])
          let id
          if (existing) {
            id = existing.id
            await conn.query(
              `UPDATE seo_articles SET slug=?, title=?, meta_title=?, meta_description=?, body_md=?, body_html=?, faq=?, schema_jsonld=?, image_url=?, image_alt=?, author_name=?, author_credentials=? WHERE id=?`,
              [r.slug, r.title, r.meta_title, r.meta_description, r.body_md, r.body_html, JSON.stringify(r.faq), JSON.stringify(r.schema_jsonld), r.image_url, r.image_alt, r.author_name, r.author_credentials, id])
          } else {
            const [insertResult] = await conn.query(
              `INSERT INTO seo_articles (external_id, lang, slug, title, meta_title, meta_description, body_md, body_html, faq, schema_jsonld, image_url, image_alt, author_name, author_credentials)
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
              [r.external_id, r.lang, r.slug, r.title, r.meta_title, r.meta_description, r.body_md, r.body_html, JSON.stringify(r.faq), JSON.stringify(r.schema_jsonld), r.image_url, r.image_alt, r.author_name, r.author_credentials])
            id = insertResult.insertId
          }
          results.push({ lang: r.lang, remoteId: String(id), remoteUrl: `${PUBLIC_ORIGIN}/blog/${r.lang}/${r.slug}` })
        }
        await conn.commit()
      } catch (error) {
        await conn.rollback()
        if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'slug_taken' })
        throw error
      } finally {
        conn.release()
      }
      res.json({ results, skipped })
    } catch (e) { next(e) }
  })

  app.get('/blog', (_req, res) => res.redirect(302, '/blog/en'))
  app.get('/blog/:lang', async (req, res, next) => {
    try {
      if (!SUPPORTED.includes(req.params.lang)) return res.status(404).type('text').send('Not found')
      const [rows] = await pool.query('SELECT slug, title, meta_description, image_url, image_alt, published_at FROM seo_articles WHERE lang=? ORDER BY published_at DESC LIMIT 100', [req.params.lang])
      res.type('html').set('Cache-Control', 'public, max-age=300').send(indexPage(req.params.lang, rows, PUBLIC_ORIGIN))
    } catch (e) { next(e) }
  })
  app.get('/blog/:lang/:slug', async (req, res, next) => {
    try {
      if (!SUPPORTED.includes(req.params.lang)) return res.status(404).type('text').send('Not found')
      const [rows] = await pool.query('SELECT * FROM seo_articles WHERE slug=? AND lang=?', [req.params.slug, req.params.lang])
      const row = rows[0]
      if (!row) return res.status(404).type('html').send('<!doctype html><title>Not found</title><h1>404</h1>')
      // Siblings are the other languages of the SAME job, keyed by external_id
      // — not just anything sharing this slug, which two different jobs can
      // (see seoArticles.js sitemapXml for the matching grouping) — and each
      // carries its OWN slug: translations of the same job aren't required to
      // share one.
      const [siblings] = await pool.query('SELECT lang, slug FROM seo_articles WHERE external_id=?', [row.external_id])
      res.type('html').set('Cache-Control', 'public, max-age=300').send(articlePage(parseRow(row), siblings, PUBLIC_ORIGIN))
    } catch (e) { next(e) }
  })
  app.get('/sitemap.xml', async (_req, res, next) => {
    try {
      const [rows] = await pool.query('SELECT external_id, lang, slug, updated_at FROM seo_articles ORDER BY updated_at DESC')
      res.type('application/xml').set('Cache-Control', 'public, max-age=3600').send(sitemapXml(rows, PUBLIC_ORIGIN))
    } catch (e) { next(e) }
  })
}
