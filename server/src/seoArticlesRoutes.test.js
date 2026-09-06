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
  res.redirect = (c, url) => { res.statusCode = c; res.redirectUrl = url; return res }
  return res
}
function authedReq(body) {
  return { header: (name) => (name.toLowerCase() === 'authorization' ? 'Bearer test-secret' : undefined), body }
}

/**
 * An in-memory seo_articles table that enforces the same two unique keys as
 * the real schema (external_id, lang) and (lang, slug) the way real MariaDB
 * does: an INSERT that would violate either throws ER_DUP_ENTRY (there is no
 * ON DUPLICATE KEY UPDATE here any more — the route looks the row up itself
 * and either UPDATEs it by id or INSERTs a new one), and an UPDATE by id
 * changes only that row. Honours beginTransaction/commit/rollback the way
 * mysql2 does: writes land in a working copy that only replaces the
 * committed rows on commit.
 */
function fakeSeoArticlesDb(initialRows) {
  let committed = initialRows.map((r) => ({ ...r }))
  let working = null
  const rows = () => working ?? committed
  const dupEntry = (key) => { const err = new Error(`Duplicate entry for key 'seo_articles.${key}'`); err.code = 'ER_DUP_ENTRY'; return err }
  const conn = {
    async beginTransaction() { working = committed.map((r) => ({ ...r })) },
    async commit() { committed = working; working = null },
    async rollback() { working = null },
    release() {},
    async query(sql, params) {
      if (/^SELECT id FROM seo_articles WHERE external_id=\? AND lang=\?/.test(sql)) {
        const [external_id, lang] = params
        const row = rows().find((r) => r.external_id === external_id && r.lang === lang)
        return [[row ? { id: row.id } : undefined]]
      }
      if (/^\s*INSERT INTO seo_articles/.test(sql)) {
        const [external_id, lang, slug] = params
        if (rows().some((r) => r.external_id === external_id && r.lang === lang)) throw dupEntry('seo_articles_external_lang')
        if (rows().some((r) => r.lang === lang && r.slug === slug)) throw dupEntry('seo_articles_lang_slug')
        const id = rows().reduce((max, r) => Math.max(max, r.id), 0) + 1
        rows().push({ id, external_id, lang, slug })
        return [{ insertId: id }]
      }
      if (/^\s*UPDATE seo_articles SET/.test(sql)) {
        const slug = params[0], id = params[params.length - 1]
        const row = rows().find((r) => r.id === id)
        if (row) row.slug = slug
        return [{}]
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
  const commit = t.mock.method(conn, 'commit')
  const rollback = t.mock.method(conn, 'rollback')
  const release = t.mock.method(conn, 'release')

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
  assert.equal(commit.mock.callCount(), 1, 'commit is called exactly once on the happy path')
  assert.equal(rollback.mock.callCount(), 0, 'rollback is never called on the happy path')
  assert.equal(release.mock.callCount(), 1, 'the connection is released exactly once')
})

test('a later row violating the (lang, slug) unique key rolls back the whole batch and answers 409, leaving the other job\'s row unchanged', async (t) => {
  process.env.SEO_HUB_SECRET = 'test-secret'
  // A different job already owns ar/anatomy-study-plan.
  const { conn, getCommitted } = fakeSeoArticlesDb([{ id: 1, external_id: 1, lang: 'ar', slug: 'anatomy-study-plan' }])
  t.mock.method(pool, 'getConnection', async () => conn)
  const commit = t.mock.method(conn, 'commit')
  const rollback = t.mock.method(conn, 'rollback')
  const release = t.mock.method(conn, 'release')

  const res = fakeRes()
  let nextError
  await registeredHandlers()['POST /api/articles'](authedReq({
    externalId: 9,
    articles: [
      { lang: 'en', title: 'T', slug: 'anatomy-study-plan', bodyMd: 'body' }, // would insert fine on its own
      { lang: 'ar', title: 'ت', slug: 'anatomy-study-plan', bodyMd: 'body' }, // collides with external_id 1's row
    ],
  }), res, (e) => { nextError = e })

  assert.equal(nextError, undefined, 'a slug collision is answered directly, not forwarded to next()')
  assert.deepEqual(res.body, { error: 'slug_taken' })
  assert.equal(res.statusCode, 409)
  assert.equal(getCommitted().some((r) => r.external_id === 9), false, 'no row for the new external_id was left behind')
  assert.deepEqual(getCommitted(), [{ id: 1, external_id: 1, lang: 'ar', slug: 'anatomy-study-plan' }], 'the pre-existing row is untouched and nothing else was committed')
  assert.equal(commit.mock.callCount(), 0, 'commit is never called on the failing batch')
  assert.equal(rollback.mock.callCount(), 1, 'rollback is called exactly once on the failing batch')
  assert.equal(release.mock.callCount(), 1, 'the connection is released exactly once on the failing batch')
})

test('updating an existing (external_id, lang) row changes only that row, by id, not by ON DUPLICATE KEY UPDATE', async (t) => {
  process.env.SEO_HUB_SECRET = 'test-secret'
  const { conn, getCommitted } = fakeSeoArticlesDb([{ id: 1, external_id: 9, lang: 'en', slug: 'old-slug' }])
  t.mock.method(pool, 'getConnection', async () => conn)
  const commit = t.mock.method(conn, 'commit')

  const res = fakeRes()
  let nextError
  await registeredHandlers()['POST /api/articles'](authedReq({
    externalId: 9,
    articles: [{ lang: 'en', title: 'T', slug: 'new-slug', bodyMd: 'body' }],
  }), res, (e) => { nextError = e })

  assert.equal(nextError, undefined)
  assert.equal(res.body.results[0].remoteId, '1')
  assert.deepEqual(getCommitted(), [{ id: 1, external_id: 9, lang: 'en', slug: 'new-slug' }])
  assert.equal(commit.mock.callCount(), 1)
})

test('GET /blog redirects to /blog/en', () => {
  const res = fakeRes()
  registeredHandlers()['GET /blog']({}, res)
  assert.equal(res.statusCode, 302)
  assert.equal(res.redirectUrl, '/blog/en')
})
test('GET /blog/:lang with an unsupported lang answers a plain 404, not the SPA catch-all', async () => {
  const res = fakeRes()
  let nextCalled = false
  await registeredHandlers()['GET /blog/:lang']({ params: { lang: 'fr' } }, res, () => { nextCalled = true })
  assert.equal(nextCalled, false)
  assert.equal(res.statusCode, 404)
  assert.equal(res.body, 'Not found')
})
test('GET /blog/:lang/:slug with an unsupported lang answers a plain 404, not the SPA catch-all', async () => {
  const res = fakeRes()
  let nextCalled = false
  await registeredHandlers()['GET /blog/:lang/:slug']({ params: { lang: 'fr', slug: 'x' } }, res, () => { nextCalled = true })
  assert.equal(nextCalled, false)
  assert.equal(res.statusCode, 404)
  assert.equal(res.body, 'Not found')
})
