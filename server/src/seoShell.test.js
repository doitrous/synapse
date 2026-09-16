import assert from 'node:assert/strict'
import test from 'node:test'
import { footerExtrasHtml, injectBodyExtras, rawTitleOverride, shellBodyExtras, shellHead, withShellFallback } from './seoShell.js'

const SHELL_HTML = '<html><head><title>Nishany — Medical Education</title>' +
  '<meta name="description" content="Nishany own description"></head><body></body></html>'

const ROOT_SHELL_HTML = '<html><head></head><body><div id="root"><main><h1>x</h1></main></div>'
  + '<script type="module" src="/src/main.tsx"></script></body></html>'

// Regression case: a hub page synced with an empty/whitespace-only seoTitle must NOT replace the
// shell's own <title> with composeSeo's templated fallback (page.title, or organization.name).
test('rawTitleOverride resolves to null for an empty or whitespace-only seoTitle', async () => {
  const store = { getPage: async () => ({ seo: { seoTitle: '   ' } }) }
  assert.equal(await rawTitleOverride(store, '/en', 'en'), null)
})

test('withShellFallback keeps the shell\'s own title when there is no raw override', () => {
  const shell = shellHead(SHELL_HTML)
  // seo.title stands in for composeSeo's templated/org-name fallback — never really empty.
  const seo = { title: 'Home', description: '' }
  const result = withShellFallback(seo, shell, null)
  assert.equal(result.title, 'Nishany — Medical Education')
})

// A real, non-empty seoTitle must win over the shell's baked-in title.
test('rawTitleOverride returns the trimmed seoTitle when one is actually set', async () => {
  const store = { getPage: async () => ({ seo: { seoTitle: '  Custom Hub Title  ' } }) }
  assert.equal(await rawTitleOverride(store, '/en', 'en'), 'Custom Hub Title')
})

test('withShellFallback lets a real raw override win over the shell title', () => {
  const shell = shellHead(SHELL_HTML)
  const seo = { title: 'Home', description: '' }
  const result = withShellFallback(seo, shell, 'Custom Hub Title')
  assert.equal(result.title, 'Custom Hub Title')
})

// A store failure must never throw through to the route — falls back to null, same as no override.
test('rawTitleOverride resolves to null when the store throws', async () => {
  const store = { getPage: async () => { throw new Error('db down') } }
  assert.equal(await rawTitleOverride(store, '/en', 'en'), null)
})

// Locks in the already-shipped description fix while it now lives in withShellFallback: an empty
// resolved description falls back to the shell's own, a non-empty one still wins.
test('withShellFallback keeps the shell description when composeSeo resolved none, but a real one still wins', () => {
  const shell = shellHead(SHELL_HTML)
  assert.equal(withShellFallback({ title: 'x', description: '' }, shell, null).description, 'Nishany own description')
  assert.equal(withShellFallback({ title: 'x', description: 'Hub description' }, shell, null).description, 'Hub description')
})

// footerExtrasHtml: the footer's Popular searches + Help center + Editorial guidelines links must
// be real, always-resolving routes — never an invented course/category URL (see the comment above
// POPULAR_SEARCHES) — and the Help/Editorial links must always be present regardless of language.
test('footerExtrasHtml links only to real routes and always carries Help/Editorial', () => {
  for (const lang of ['en', 'ar']) {
    const html = footerExtrasHtml(lang)
    assert.match(html, /href="\/en"/)
    assert.match(html, /href="\/ar"/)
    assert.match(html, /href="\/blog\/en"/)
    assert.match(html, /href="\/blog\/ar"/)
    assert.match(html, /href="\/pricing"/)
    assert.match(html, /href="\/ar\/pricing"/)
    assert.match(html, /href="\/help"/)
    assert.match(html, /href="\/editorial-guidelines"/)
  }
})

test('footerExtrasHtml localizes its headings for Arabic', () => {
  assert.match(footerExtrasHtml('ar'), /مركز المساعدة/)
  assert.match(footerExtrasHtml('en'), />Help center</)
})

// shellBodyExtras: the share block must point at the page's own resolved canonical/title, not the
// shell's static baked-in copy — that is the whole point of computing it per-request.
test('shellBodyExtras builds a share block from the resolved canonical and title', () => {
  const html = shellBodyExtras({ canonical: 'https://nishany.com/ar', title: 'نيشاني' }, 'ar')
  assert.match(html, /data-url="https:\/\/nishany\.com\/ar"/)
  assert.match(html, /data-title="نيشاني"/)
  assert.match(html, /<footer>/)
})

// injectBodyExtras: splices right after </main> and before the #root-closing </div>, matching the
// real en/index.html and ar/index.html shells, and never throws on a document that lacks that pair.
test('injectBodyExtras splices extras between </main> and the closing #root </div>', () => {
  const result = injectBodyExtras(ROOT_SHELL_HTML, '<footer>EXTRA</footer>')
  assert.match(result, /<\/main><footer>EXTRA<\/footer><\/div>/)
})

test('injectBodyExtras returns the document unchanged when there is no </main></div> pair', () => {
  const html = '<html><body><p>no main here</p></body></html>'
  assert.equal(injectBodyExtras(html, '<footer>EXTRA</footer>'), html)
})
