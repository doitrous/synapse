import test from 'node:test'
import assert from 'node:assert/strict'
import { articlePage, indexPage, renderBody, sitemapXml, toRows, validatePayload } from './seoArticles.js'

const article = { lang: 'en', title: 'Study plan for anatomy', slug: 'anatomy-study-plan', metaDescription: 'md', bodyMd: '# Study plan for anatomy\n\nIntro with [link](/blog/en/other).\n\n## Week 1\n\n<script>alert(1)</script>See [WHO](https://who.int).', faq: [{ q: 'Q?', a: 'A.' }], schemaJsonld: [{ '@type': 'BlogPosting' }] }
const payload = { externalId: 9, author: { name: 'Dr. A', credentials: 'MD' }, image: { url: 'https://hub/api/images/job/9', alt: 'alt' }, articles: [article, { ...article, lang: 'ar', title: 'خطة' }, { ...article, lang: 'de' }] }

test('validatePayload names the first bad field', () => {
  assert.deepEqual(validatePayload({}), { error: 'invalid externalId' })
  assert.deepEqual(validatePayload({ externalId: 1, articles: [{ lang: 'en', title: 'T' }] }), { error: 'invalid articles[0].slug' })
  assert.ok(validatePayload(payload).payload)
})
test('renderBody strips raw html, drops h1, marks external links', () => {
  const html = renderBody(article.bodyMd)
  assert.equal(html.includes('<script'), false)
  assert.equal(html.includes('<h1'), false)
  assert.ok(html.includes('<h2'))
  assert.match(html, /<a href="https:\/\/who\.int"[^>]*rel="noopener"/)
})
test('toRows keeps en/ar, skips de', () => {
  const { skipped, rows } = toRows(payload)
  assert.deepEqual(skipped, ['de'])
  assert.deepEqual(rows.map((r) => r.lang), ['en', 'ar'])
  assert.equal(rows[0].external_id, 9)
  assert.equal(rows[0].author_credentials, 'MD')
})
test('articlePage carries seo essentials', () => {
  const { rows } = toRows(payload)
  const html = articlePage(rows[1], ['en', 'ar'], 'https://nishany.com')
  assert.ok(html.startsWith('<!doctype html>'))
  assert.ok(html.includes('<html lang="ar" dir="rtl">'))
  assert.ok(html.includes('<link rel="canonical" href="https://nishany.com/blog/ar/anatomy-study-plan">'))
  assert.ok(html.includes('hreflang="en" href="https://nishany.com/blog/en/anatomy-study-plan"'))
  assert.ok(html.includes('hreflang="x-default" href="https://nishany.com/blog/en/anatomy-study-plan"'))
  assert.ok(html.includes('application/ld+json'))
  assert.ok(html.includes('<h1>خطة</h1>'))
  assert.ok(html.includes('Q?'))
})
test('indexPage and sitemap list articles', () => {
  const { rows } = toRows(payload)
  assert.ok(indexPage('en', rows.filter((r) => r.lang === 'en'), 'https://nishany.com').includes('/blog/en/anatomy-study-plan'))
  const xml = sitemapXml(rows, 'https://nishany.com')
  assert.ok(xml.includes('<loc>https://nishany.com/</loc>'))
  assert.ok(xml.includes('<loc>https://nishany.com/blog/ar/anatomy-study-plan</loc>'))
  assert.ok(xml.includes('<loc>https://nishany.com/blog/en</loc>'))
})
