import assert from 'node:assert/strict'
import test from 'node:test'
import { robotsTxt, sitemapEntries, sitemapXml } from '@omary98/seo-runtime-core'
import { ARTICLE_PATH, CRAWLER_POLICY_LINES, FALLBACK_SETTINGS, localPages, mysqlDriver } from './seo.js'

test('the driver reports the mysql dialect and passes parameters through', async () => {
  const seen = []
  const pool = { query: async (sql, params) => { seen.push([sql, params]); return [[{ ok: 1 }]] } }
  const driver = mysqlDriver(pool)
  assert.equal(driver.dialect, 'mysql')
  const rows = await driver.query('SELECT ?', [1])
  assert.deepEqual(rows, [{ ok: 1 }])
  assert.deepEqual(seen, [['SELECT ?', [1]]])
})

test('a write returns an empty row list rather than the mysql result header', async () => {
  const pool = { query: async () => [{ affectedRows: 1 }] }
  assert.deepEqual(await mysqlDriver(pool).query('UPDATE x SET y = 1', []), [])
})

// The sitemap/robots fallback (registered in registerSeo, ahead of the hub-managed runtime
// routes) leans entirely on the runtime's own `sitemapEntries`/`sitemapXml`/`robotsTxt` — these
// two tests are what actually pin its output, since exercising the Express routes themselves
// needs a live MySQL-backed store.
test('the fallback sitemap has at least one absolute URL and pairs /en with /ar as hreflang alternates', () => {
  const pages = localPages().map((p) => ({ ...p, seo: { index: true, includeInSitemap: true } }))
  const xml = sitemapXml(sitemapEntries({ settings: FALLBACK_SETTINGS, pages }, [], ARTICLE_PATH))
  assert.match(xml, /<loc>https:\/\/nishany\.com\/en<\/loc>/)
  const home = sitemapEntries({ settings: FALLBACK_SETTINGS, pages }, [], ARTICLE_PATH).find((e) => e.loc.endsWith('/en'))
  assert.deepEqual(home.alternates.ar, 'https://nishany.com/ar')
})

test('the fallback robots.txt disallows the training scrapers, allows the named crawlers, and links the sitemap', () => {
  const txt = robotsTxt({ settings: { ...FALLBACK_SETTINGS, robotsExtra: CRAWLER_POLICY_LINES } })
  assert.match(txt, /User-agent: CCBot\nDisallow: \//)
  assert.match(txt, /User-agent: GPTBot\nAllow: \//)
  assert.match(txt, /Sitemap: https:\/\/nishany\.com\/sitemap\.xml/)
})
