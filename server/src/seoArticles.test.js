import test from 'node:test'
import assert from 'node:assert/strict'
import { articlePage, esc, indexPage, renderBody, sitemapXml, toRows, validatePayload } from './seoArticles.js'

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
test('renderBody neutralises javascript:/data:/vbscript: markdown link and image targets', () => {
  const md = 'Click [here]( JavaScript:alert(1) ) or view ![pic](data:text/html,evil) or [x](VBScript:msgbox(1)).'
  const html = renderBody(md)
  assert.equal(/javascript:/i.test(html), false)
  assert.equal(/data:/i.test(html), false)
  assert.equal(/vbscript:/i.test(html), false)
  assert.ok(html.includes('here'))
  assert.equal(html.includes('<img'), false)
})
test('renderBody neutralises the same schemes via CommonMark angle-bracket destinations', () => {
  const md = '[x](<javascript:alert(1)>) [y](<vbscript:msgbox(1)>) ![p](<data:text/html,evil>)'
  const html = renderBody(md)
  assert.equal(/javascript:/i.test(html), false)
  assert.equal(/data:/i.test(html), false)
  assert.equal(/vbscript:/i.test(html), false)
  assert.equal(html.includes('<img'), false)
  assert.ok(html.includes('x'))
  assert.ok(html.includes('y'))
})
test('renderBody still renders safe http(s) and root-relative link targets', () => {
  const html = renderBody('[ext](https://example.com/x) and [rel](/blog/en/x)')
  assert.match(html, /<a href="https:\/\/example\.com\/x"/)
  assert.match(html, /<a href="\/blog\/en\/x">/)
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
test('indexPage hreflang block carries x-default pointing at the en index', () => {
  const html = indexPage('ar', [], 'https://nishany.com')
  assert.ok(html.includes('<link rel="alternate" hreflang="x-default" href="https://nishany.com/blog/en">'))
})
test('sitemapXml groups hreflang alternates by external_id, not by slug', () => {
  // Two unrelated jobs whose slugs happen to collide across languages (each
  // (lang, slug) pair is unique only within its own language) must not be
  // wired together as translations of each other.
  const rows = [
    { external_id: 1, lang: 'en', slug: 'shared-slug', updated_at: '2026-01-01' },
    { external_id: 2, lang: 'ar', slug: 'shared-slug', updated_at: '2026-01-02' },
  ]
  const xml = sitemapXml(rows, 'https://nishany.com')
  const enUrl = xml.match(/<url><loc>https:\/\/nishany\.com\/blog\/en\/shared-slug<\/loc>[\s\S]*?<\/url>/)[0]
  const arUrl = xml.match(/<url><loc>https:\/\/nishany\.com\/blog\/ar\/shared-slug<\/loc>[\s\S]*?<\/url>/)[0]
  assert.equal(enUrl.includes('hreflang="ar"'), false)
  assert.equal(arUrl.includes('hreflang="en"'), false)
})
test('esc(slug) escapes " and < everywhere the slug reaches href/loc output', () => {
  const dangerousSlug = 'x"><b>y'
  const row = { ...toRows(payload).rows[0], slug: dangerousSlug }
  const articleHtml = articlePage(row, ['en'], 'https://nishany.com')
  const indexHtml = indexPage('en', [row], 'https://nishany.com')
  const xml = sitemapXml([{ external_id: 99, lang: 'en', slug: dangerousSlug, updated_at: null }], 'https://nishany.com')
  for (const output of [articleHtml, indexHtml, xml]) {
    assert.equal(output.includes(dangerousSlug), false)
    assert.ok(output.includes(esc(dangerousSlug)))
  }
})
