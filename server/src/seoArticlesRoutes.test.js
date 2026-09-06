import test from 'node:test'
import assert from 'node:assert/strict'
import { pool } from './db.js'
import { registerSeoArticleRoutes } from './routes/seoArticles.js'

// registerSeoArticleRoutes(app) only calls app.post/app.get to register
// handlers — capture them instead of standing up a real Express app.
function registeredHandlers() {
  const handlers = {}
  registerSeoArticleRoutes({
    post: (path, h) => { handlers[`POST ${path}`] = h },
    get: (path, h) => { handlers[`GET ${path}`] = h },
  })
  return handlers
}
function fakeRes() {
  const res = {}
  res.status = (c) => { res.statusCode = c; return res }
  res.type = () => res
  res.set = () => res
  res.json = (b) => { res.body = b; return res }
  res.send = (b) => { res.body = b; return res }
  return res
}
function authedReq(body) {
  return { header: (name) => (name.toLowerCase() === 'authorization' ? 'Bearer test-secret' : undefined), body }
}

/**
 * An in-memory seo_articles table that enforces the same two unique keys as
 * the real schema (external_id, lang) and (lang, slug), and honours
 * beginTransaction/commit/rollback the way mysql2 does: writes land in a
 * working copy that only replaces the committed rows on commit.
 */
function fakeSeoArticlesDb(initialRows) {
  let committed = initialRows.map((r) => ({ ...r }))
  let working = null
  const rows = () => working ?? committed
  const conn = {
    async beginTransaction() { working = committed.map((r) => ({ ...r })) },
    async commit() { committed = working; working = null },
    async rollback() { working = null },
    release() {},
    async query(sql, params) {
      if (/^\s*INSERT INTO seo_articles/.test(sql)) {
        const [external_id, lang, slug] = params
        const byJob = rows().find((r) => r.external_id === external_id && r.lang === lang)
        if (byJob) { byJob.slug = slug; return [{}] }
        if (rows().some((r) => r.lang === lang && r.slug === slug)) {
          const err = new Error(`Duplicate entry '${lang}-${slug}' for key 'seo_articles.seo_articles_lang_slug'`)
          err.code = 'ER_DUP_ENTRY'
          throw err
        }
        rows().push({ id: rows().length + 1, external_id, lang, slug })
        return [{}]
      }
      if (/^SELECT id FROM seo_articles WHERE external_id=\? AND lang=\?/.test(sql)) {
        const [external_id, lang] = params
        const row = rows().find((r) => r.external_id === external_id && r.lang === lang)
        return [[row ? { id: row.id } : undefined]]
      }
      throw new Error(`fakeSeoArticlesDb: unexpected query ${sql}`)
    },
  }
  return { conn, getCommitted: () => committed }
}

test('POST /api/articles commits every row when nothing conflicts', async (t) => {
  process.env.SEO_HUB_SECRET = 'test-secret'
  const { conn, getCommitted } = fakeSeoArticlesDb([])
  t.mock.method(pool, 'getConnection', async () => conn)

  const res = fakeRes()
  let nextError
  await registeredHandlers()['POST /api/articles'](authedReq({
    externalId: 9,
    articles: [
      { lang: 'en', title: 'T', slug: 'anatomy-study-plan', bodyMd: 'body' },
      { lang: 'ar', title: 'ت', slug: 'anatomy-study-plan', bodyMd: 'body' },
    ],
  }), res, (e) => { nextError = e })

  assert.equal(nextError, undefined)
  assert.equal(res.body.results.length, 2)
  assert.equal(getCommitted().length, 2)
})

test('a later row violating the (lang, slug) unique key rolls back the whole batch — no row for the new external_id', async (t) => {
  process.env.SEO_HUB_SECRET = 'test-secret'
  // A different job already owns ar/anatomy-study-plan.
  const { conn, getCommitted } = fakeSeoArticlesDb([{ id: 1, external_id: 1, lang: 'ar', slug: 'anatomy-study-plan' }])
  t.mock.method(pool, 'getConnection', async () => conn)

  const res = fakeRes()
  let nextError
  await registeredHandlers()['POST /api/articles'](authedReq({
    externalId: 9,
    articles: [
      { lang: 'en', title: 'T', slug: 'anatomy-study-plan', bodyMd: 'body' }, // would insert fine on its own
      { lang: 'ar', title: 'ت', slug: 'anatomy-study-plan', bodyMd: 'body' }, // collides with external_id 1's row
    ],
  }), res, (e) => { nextError = e })

  assert.ok(nextError, 'the error is forwarded to next(), not swallowed')
  assert.equal(res.body, undefined, 'no success response was ever sent')
  assert.equal(getCommitted().some((r) => r.external_id === 9), false, 'no row for the new external_id was left behind')
  assert.deepEqual(getCommitted(), [{ id: 1, external_id: 1, lang: 'ar', slug: 'anatomy-study-plan' }], 'the pre-existing row is untouched and nothing else was committed')
})
