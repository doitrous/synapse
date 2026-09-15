import assert from 'node:assert/strict'
import test from 'node:test'
import { rawTitleOverride, shellHead, withShellFallback } from './seoShell.js'

const SHELL_HTML = '<html><head><title>Nishany — Medical Education</title>' +
  '<meta name="description" content="Nishany own description"></head><body></body></html>'

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
