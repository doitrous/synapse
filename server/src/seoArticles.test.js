import test from 'node:test'
import assert from 'node:assert/strict'
import { articlePage, esc, indexPage } from './seoArticles.js'

// Payload validation, markdown rendering, toRows and sitemapXml moved to
// @omary98/seo-runtime-express / @omary98/seo-runtime-core — see seo.js.
// articlePage/indexPage stay here as the site's own blog renderer, so these
// rows are built by hand instead of via the deleted toRows().
const baseRow = {
  lang: 'en', slug: 'anatomy-study-plan', title: 'Study plan for anatomy',
  meta_title: 'Study plan for anatomy', meta_description: 'md', body_html: '<p>Intro.</p><h2>Week 1</h2>',
  faq: [{ q: 'Q?', a: 'A.' }], schema_jsonld: [{ '@type': 'BlogPosting' }],
  image_url: 'https://hub/api/images/job/9', image_alt: 'alt',
  author_name: 'Dr. A', author_credentials: 'MD', published_at: '2026-01-01',
  og_title: null, og_description: null, references_json: [], external_id: 9,
}

test('articlePage carries seo essentials, and hreflang uses each sibling\'s own slug', () => {
  const arRow = { ...baseRow, lang: 'ar', title: 'خطة', slug: 'khota-al-tashrih' }
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
  const arRow = { ...baseRow, lang: 'ar', title: 'خطة', slug: 'ar-only-slug' }
  const siblings = [{ lang: 'ar', slug: 'ar-only-slug' }]
  const html = articlePage(arRow, siblings, 'https://nishany.com')
  assert.ok(html.includes('hreflang="x-default" href="https://nishany.com/blog/ar/ar-only-slug"'))
})
test('indexPage lists articles', () => {
  const html = indexPage('en', [baseRow], 'https://nishany.com')
  assert.ok(html.includes('/blog/en/anatomy-study-plan'))
})
test('indexPage hreflang block carries x-default pointing at the en index', () => {
  const html = indexPage('ar', [], 'https://nishany.com')
  assert.ok(html.includes('<link rel="alternate" hreflang="x-default" href="https://nishany.com/blog/en">'))
})
test('indexPage renders a lazy-loaded, escaped cover image when image_url is set', () => {
  const html = indexPage('en', [baseRow], 'https://nishany.com')
  assert.ok(html.includes(`<img src="${baseRow.image_url}" alt="${baseRow.image_alt}" loading="lazy">`))
})
test('indexPage omits the cover image markup when image_url is absent', () => {
  const html = indexPage('en', [{ slug: 'x', title: 'T', meta_description: 'd', image_url: null }], 'https://nishany.com')
  assert.equal(html.includes('<img'), false)
})
test('esc(slug) escapes " and < everywhere the slug reaches href output', () => {
  const dangerousSlug = 'x"><b>y'
  const row = { ...baseRow, slug: dangerousSlug }
  const articleHtml = articlePage(row, [{ lang: 'en', slug: dangerousSlug }], 'https://nishany.com')
  const indexHtml = indexPage('en', [row], 'https://nishany.com')
  for (const output of [articleHtml, indexHtml]) {
    assert.equal(output.includes(dangerousSlug), false)
    assert.ok(output.includes(esc(dangerousSlug)))
  }
})
test('articlePage renders a references list after the faq and escapes it', () => {
  const row = { lang: 'en', slug: 'anatomy-study-plan', title: 'Study plan', meta_title: 'Study plan', meta_description: 'md', body_html: '<p>x</p>', faq: [{ q: 'Q?', a: 'A.' }], schema_jsonld: [], image_url: null, published_at: '2026-09-01', og_title: 'OG title', og_description: 'OG description', references_json: [{ title: 'Gray <anatomy>', url: 'https://who.int/anatomy', publisher: 'W"HO', date: '2025-04-01' }] }
  const html = articlePage(row, [{ lang: 'en', slug: 'anatomy-study-plan' }], 'https://nishany.com')
  assert.ok(html.indexOf('References') > html.indexOf('Frequently asked questions'))
  assert.ok(html.includes('<a href="https://who.int/anatomy" rel="nofollow noopener" target="_blank">Gray &lt;anatomy&gt;</a>'))
  assert.ok(html.includes('W&quot;HO'))
  assert.ok(html.includes('<meta property="og:title" content="OG title">'))
  assert.ok(html.includes('<meta property="og:description" content="OG description">'))
})
test('articlePage falls back to the title and meta description when og is absent', () => {
  const row = { lang: 'en', slug: 's', title: 'Study plan', meta_title: 'Study plan', meta_description: 'md', body_html: '', faq: [], schema_jsonld: [], image_url: null, published_at: '2026-09-01', og_title: null, og_description: null, references_json: [] }
  const html = articlePage(row, [{ lang: 'en', slug: 's' }], 'https://nishany.com')
  assert.ok(html.includes('<meta property="og:title" content="Study plan">'))
  assert.ok(html.includes('<meta property="og:description" content="md">'))
  assert.equal(html.includes('References'), false)
})

// 01-site-setup.md §5: every content page carries the share block — blog posts included, even
// though they're this site's own template rather than one the seo-runtime package renders itself.
test('articlePage carries a share block pointed at its own canonical URL and title', () => {
  const html = articlePage(baseRow, [{ lang: 'en', slug: baseRow.slug }], 'https://nishany.com')
  assert.ok(html.includes('data-url="https://nishany.com/blog/en/anatomy-study-plan"'))
  assert.ok(html.includes('data-title="Study plan for anatomy"'))
  assert.ok(html.includes('wa.me'))
  assert.ok(html.includes('twitter.com/intent/tweet'))
  assert.ok(html.includes('facebook.com/sharer'))
  assert.ok(html.includes('linkedin.com/sharing'))
  assert.ok(html.includes('data-share-copy='))
})

test('indexPage carries a share block pointed at the blog index URL', () => {
  const html = indexPage('ar', [], 'https://nishany.com')
  assert.ok(html.includes('data-url="https://nishany.com/blog/ar"'))
  assert.ok(html.includes('data-title="المدونة"'))
})

// 10-internal-linking-menu-footer.md: the footer that appears on every page (blog posts included)
// carries Popular searches plus Help center / Editorial guidelines — same links seoShell.js
// server-renders into the /en and /ar shell, reused here via footerExtrasHtml.
test('articlePage and indexPage footers carry Popular searches, Help center and Editorial guidelines', () => {
  const articleHtml = articlePage(baseRow, [{ lang: 'en', slug: baseRow.slug }], 'https://nishany.com')
  const indexHtml = indexPage('en', [baseRow], 'https://nishany.com')
  for (const html of [articleHtml, indexHtml]) {
    assert.ok(html.includes('>Popular searches<'))
    assert.ok(html.includes('href="/help">Help center<'))
    assert.ok(html.includes('href="/editorial-guidelines">Editorial guidelines<'))
    assert.ok(html.includes('href="/blog/en">'))
    assert.ok(html.includes('href="/pricing">'))
  }
})

test('articlePage and indexPage footers localize Popular searches/Help/Editorial for Arabic', () => {
  const html = indexPage('ar', [], 'https://nishany.com')
  assert.ok(html.includes('عمليات بحث شائعة'))
  assert.ok(html.includes('مركز المساعدة'))
  assert.ok(html.includes('المبادئ التحريرية'))
})
