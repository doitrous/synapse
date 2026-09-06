import test from 'node:test'
import assert from 'node:assert/strict'
import { articlePage, esc, indexPage, renderBody, sitemapXml, toRows, validatePayload } from './seoArticles.js'

const article = { lang: 'en', title: 'Study plan for anatomy', slug: 'anatomy-study-plan', metaDescription: 'md', bodyMd: '# Study plan for anatomy\n\nIntro with [link](/blog/en/other).\n\n## Week 1\n\n<script>alert(1)</script>\n\nSee [WHO](https://who.int).', faq: [{ q: 'Q?', a: 'A.' }], schemaJsonld: [{ '@type': 'BlogPosting' }] }
const payload = { externalId: 9, author: { name: 'Dr. A', credentials: 'MD' }, image: { url: 'https://hub/api/images/job/9', alt: 'alt' }, articles: [article, { ...article, lang: 'ar', title: 'خطة' }, { ...article, lang: 'de' }] }

test('validatePayload names the first bad field', () => {
  assert.deepEqual(validatePayload({}), { error: 'invalid externalId' })
  assert.deepEqual(validatePayload({ externalId: 1, articles: [{ lang: 'en', title: 'T' }] }), { error: 'invalid articles[0].slug' })
  assert.ok(validatePayload(payload).payload)
})
test('validatePayload rejects a slug outside [a-z0-9-]', () => {
  const bad = { externalId: 1, articles: [{ lang: 'en', title: 'T', slug: 'Not Valid!', bodyMd: 'body' }] }
  assert.deepEqual(validatePayload(bad), { error: 'invalid articles[0].slug' })
  assert.deepEqual(validatePayload({ ...bad, articles: [{ ...bad.articles[0], slug: 'x'.repeat(192) }] }), { error: 'invalid articles[0].slug' })
  assert.ok(validatePayload({ ...bad, articles: [{ ...bad.articles[0], slug: 'ok-slug-123' }] }).payload)
})
test('validatePayload rejects an over-long title or metaDescription', () => {
  const base = { externalId: 1, articles: [{ lang: 'en', title: 'T', slug: 'ok', bodyMd: 'body' }] }
  assert.deepEqual(validatePayload({ ...base, articles: [{ ...base.articles[0], title: 'x'.repeat(501) }] }), { error: 'invalid articles[0].title' })
  assert.deepEqual(validatePayload({ ...base, articles: [{ ...base.articles[0], metaDescription: 'x'.repeat(1001) }] }), { error: 'invalid articles[0].metaDescription' })
  assert.ok(validatePayload({ ...base, articles: [{ ...base.articles[0], title: 'x'.repeat(500), metaDescription: 'x'.repeat(1000) }] }).payload)
})
test('renderBody escapes raw html, drops h1, marks external links', () => {
  const html = renderBody(article.bodyMd)
  assert.equal(html.includes('<script'), false)
  assert.equal(html.includes('<h1'), false)
  assert.ok(html.includes('<h2'))
  assert.match(html, /<a href="https:\/\/who\.int"[^>]*rel="noopener"/)
})
test('renderBody escapes raw html instead of trying to strip it, closing the nested-tag bypass', () => {
  const html = renderBody('<scr<script>ipt>alert(1)</script>')
  assert.equal(/<script/i.test(html), false)
  assert.equal(/<\/script>/i.test(html), false)
  assert.ok(html.includes('&lt;script&gt;'))
  assert.ok(html.includes('&lt;/script&gt;'))
})
test('renderBody escapes a raw anchor tag (e.g. a javascript: href) as inert text, not markup', () => {
  const html = renderBody('<a href="javascript:alert(1)">click</a>')
  assert.equal(html.includes('<a href="javascript:'), false)
  assert.ok(html.includes('&lt;a href=&quot;javascript:alert(1)&quot;&gt;click&lt;/a&gt;'))
})
test('renderBody only strips a leading H1, not one appearing later in the body', () => {
  const html = renderBody('# Title\n\nIntro paragraph.\n\n# Another H1 later')
  assert.equal(html.includes('<h1>Title</h1>'), false)
  assert.ok(html.includes('<h1>Another H1 later</h1>'))
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
test('renderBody escapes a quote-breakout attempt in a link href', () => {
  const html = renderBody('[x](https://a/b"onclick="alert(1))')
  assert.equal(html.includes('"onclick='), false)
  assert.ok(html.includes('href="https://a/b&quot;onclick=&quot;alert(1)"'))
})
test('renderBody escapes an image alt attribute so it cannot break out', () => {
  const html = renderBody('![" onerror="alert(1)](https://example.com/pic.png)')
  assert.equal(html.includes('" onerror='), false)
  assert.ok(html.includes('alt="&quot; onerror=&quot;alert(1)"'))
})
test('toRows keeps en/ar, skips de', () => {
  const { skipped, rows } = toRows(payload)
  assert.deepEqual(skipped, ['de'])
  assert.deepEqual(rows.map((r) => r.lang), ['en', 'ar'])
  assert.equal(rows[0].external_id, 9)
  assert.equal(rows[0].author_credentials, 'MD')
})
test('articlePage carries seo essentials, and hreflang uses each sibling\'s own slug', () => {
  const { rows } = toRows(payload)
  const arRow = { ...rows[1], slug: 'khota-al-tashrih' }
  const siblings = [{ lang: 'en', slug: 'anatomy-study-plan' }, { lang: 'ar', slug: 'khota-al-tashrih' }]
  const html = articlePage(arRow, siblings, 'https://nishany.com')
  assert.ok(html.startsWith('<!doctype html>'))
  assert.ok(html.includes('<html lang="ar" dir="rtl">'))
  assert.ok(html.includes('<link rel="canonical" href="https://nishany.com/blog/ar/khota-al-tashrih">'))
  assert.ok(html.includes('hreflang="ar" href="https://nishany.com/blog/ar/khota-al-tashrih"'))
  assert.ok(html.includes('hreflang="en" href="https://nishany.com/blog/en/anatomy-study-plan"'))
  assert.ok(html.includes('hreflang="x-default" href="https://nishany.com/blog/en/anatomy-study-plan"'))
  assert.ok(html.includes('application/ld+json'))
  assert.ok(html.includes('<h1>خطة</h1>'))
  assert.ok(html.includes('Q?'))
})
test('articlePage falls back to the first sibling for x-default when there is no en sibling', () => {
  const { rows } = toRows(payload)
  const siblings = [{ lang: 'ar', slug: 'ar-only-slug' }]
  const html = articlePage({ ...rows[1], slug: 'ar-only-slug' }, siblings, 'https://nishany.com')
  assert.ok(html.includes('hreflang="x-default" href="https://nishany.com/blog/ar/ar-only-slug"'))
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
test('indexPage renders a lazy-loaded, escaped cover image when image_url is set', () => {
  const { rows } = toRows(payload)
  const html = indexPage('en', rows.filter((r) => r.lang === 'en'), 'https://nishany.com')
  assert.ok(html.includes(`<img src="${rows[0].image_url}" alt="${rows[0].image_alt}" loading="lazy">`))
})
test('indexPage omits the cover image markup when image_url is absent', () => {
  const html = indexPage('en', [{ slug: 'x', title: 'T', meta_description: 'd', image_url: null }], 'https://nishany.com')
  assert.equal(html.includes('<img'), false)
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
  const articleHtml = articlePage(row, [{ lang: 'en', slug: dangerousSlug }], 'https://nishany.com')
  const indexHtml = indexPage('en', [row], 'https://nishany.com')
  const xml = sitemapXml([{ external_id: 99, lang: 'en', slug: dangerousSlug, updated_at: null }], 'https://nishany.com')
  for (const output of [articleHtml, indexHtml, xml]) {
    assert.equal(output.includes(dangerousSlug), false)
    assert.ok(output.includes(esc(dangerousSlug)))
  }
})
